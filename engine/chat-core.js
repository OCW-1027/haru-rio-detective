// engine/chat-core.js — Phase 1 chat + Bundle B (presence/typing/incoming-msg notify) + Bundle C (FCM hook)
// Public API consumed by chat-ui.js / chat-bindings.js / chat-fcm.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth, signInAnonymously, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
  getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc, onSnapshot, query, where, orderBy,
  serverTimestamp, Timestamp, writeBatch
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { firebaseConfig } from "./chat-config.js";
import { initFCM } from "./chat-fcm.js";

const LS = {
  ROLE: 'haruchat_role',
  PAIR_ID: 'haruchat_pair_id',
  PARENT_NAME: 'haruchat_parent_name',
  CHILD_NAME: 'haruchat_child_name',
  MUTED: 'haruchat_muted',
  PUSH_ENABLED: 'haruchat_push_enabled',
};

export const ChatState = {
  user: null,
  role: null,             // 'parent' | 'child' | null
  pairId: null,
  parentName: 'パパ',
  childName: 'ハル',
  messages: [],
  unreadCount: 0,
  isReady: false,
  // Bundle B additions
  otherPresence: { online: false, lastSeen: null, typing: false },
  muted: false,
  // Bundle C addition
  pushEnabled: false,
  // Callbacks (UI/bindings register)
  onMessagesUpdate: null,
  onUnreadUpdate: null,
  onPairingComplete: null,
  onAuthReady: null,
  onPairLost: null,
  onPresenceUpdate: null,    // Bundle B
  onIncomingMessage: null,   // Bundle B
};

let app, auth, db;
let messagesUnsub = null;
let pairUnsub = null;
let pairPollInterval = null;
let pairPollTimeout = null;

// Bundle B presence/typing state
let _modalOpen = false;
let _inChatView = false;
let _presenceLastWrittenOnline = null;  // null = never written, true/false = last value
let _presenceTypingState = false;
let _presenceHeartbeatTimer = null;
let _typingInputTimer = null;
let _otherPresenceUnsub = null;

function notify(cbName, ...args) {
  const cb = ChatState[cbName];
  if (typeof cb === 'function') {
    try { cb(...args); } catch (e) { console.error('[chat] callback', cbName, e); }
  }
}

function recomputeUnread() {
  if (!ChatState.role) { ChatState.unreadCount = 0; return; }
  const otherRole = ChatState.role === 'parent' ? 'child' : 'parent';
  ChatState.unreadCount = ChatState.messages.filter(
    m => m.senderRole === otherRole && m.readByOther === false
  ).length;
}

async function loadPairAndSubscribe() {
  if (!ChatState.pairId) return;
  const pairRef = doc(db, 'pairs', ChatState.pairId);
  let snap;
  try {
    snap = await getDoc(pairRef);
  } catch (e) {
    console.error('[chat] loadPair failed', e);
    return;
  }
  if (!snap.exists()) {
    console.warn('[chat] pair not found, clearing local pair');
    clearPairLocal();
    notify('onPairLost');
    return;
  }
  const d = snap.data();
  if (d.parentName) ChatState.parentName = d.parentName;
  if (d.childName) ChatState.childName = d.childName;
  localStorage.setItem(LS.PARENT_NAME, ChatState.parentName);
  localStorage.setItem(LS.CHILD_NAME, ChatState.childName);

  if (pairUnsub) { pairUnsub(); pairUnsub = null; }
  pairUnsub = onSnapshot(pairRef, (snap2) => {
    if (!snap2.exists()) {
      clearPairLocal();
      notify('onPairLost');
      return;
    }
    const dd = snap2.data();
    if (dd.parentName !== undefined) ChatState.parentName = dd.parentName;
    if (dd.childName !== undefined) ChatState.childName = dd.childName;
    localStorage.setItem(LS.PARENT_NAME, ChatState.parentName);
    localStorage.setItem(LS.CHILD_NAME, ChatState.childName);
  });

  if (messagesUnsub) { messagesUnsub(); messagesUnsub = null; }
  const q = query(
    collection(db, 'pairs', ChatState.pairId, 'messages'),
    orderBy('createdAt', 'asc')
  );
  // Bundle B: track new incoming messages for notification trigger
  const seenMsgIds = new Set();
  let initialLoadDone = false;
  messagesUnsub = onSnapshot(q, (snap2) => {
    const newIncoming = [];
    snap2.docs.forEach(d2 => {
      if (!seenMsgIds.has(d2.id)) {
        seenMsgIds.add(d2.id);
        if (initialLoadDone) {
          const data = d2.data();
          if (data.senderRole !== ChatState.role) {
            newIncoming.push({ id: d2.id, ...data });
          }
        }
      }
    });
    ChatState.messages = snap2.docs.map(d2 => ({ id: d2.id, ...d2.data() }));
    recomputeUnread();
    initialLoadDone = true;
    for (const m of newIncoming) notify('onIncomingMessage', m);
    notify('onMessagesUpdate', ChatState.messages);
    notify('onUnreadUpdate', ChatState.unreadCount);
  });
}

function clearPairLocal() {
  if (messagesUnsub) { messagesUnsub(); messagesUnsub = null; }
  if (pairUnsub) { pairUnsub(); pairUnsub = null; }
  unsubscribeOtherPresence();
  if (_presenceHeartbeatTimer) { clearInterval(_presenceHeartbeatTimer); _presenceHeartbeatTimer = null; }
  if (_typingInputTimer) { clearTimeout(_typingInputTimer); _typingInputTimer = null; }
  _presenceLastWrittenOnline = null;
  _presenceTypingState = false;
  ChatState.pairId = null;
  ChatState.messages = [];
  ChatState.unreadCount = 0;
  ChatState.otherPresence = { online: false, lastSeen: null, typing: false };
  localStorage.removeItem(LS.PAIR_ID);
  notify('onMessagesUpdate', []);
  notify('onUnreadUpdate', 0);
  notify('onPresenceUpdate', ChatState.otherPresence);
}

export async function initChat() {
  if (app) return;  // idempotent
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  ChatState.role = localStorage.getItem(LS.ROLE) || null;
  ChatState.pairId = localStorage.getItem(LS.PAIR_ID) || null;
  ChatState.parentName = localStorage.getItem(LS.PARENT_NAME) || 'パパ';
  ChatState.childName = localStorage.getItem(LS.CHILD_NAME) || 'ハル';
  ChatState.muted = localStorage.getItem(LS.MUTED) === '1';
  ChatState.pushEnabled = localStorage.getItem(LS.PUSH_ENABLED) === '1';

  // Bundle B: visibility/unload handlers (registered once)
  if (typeof document !== 'undefined' && !window._haruChatVisHooked) {
    window._haruChatVisHooked = true;
    document.addEventListener('visibilitychange', () => {
      updatePresenceInternal();
    });
    window.addEventListener('beforeunload', () => {
      // Best-effort offline write — Firestore SDK may queue but unload may interrupt
      if (_presenceLastWrittenOnline === true) {
        const ref = presenceRef();
        if (ref) {
          try {
            setDoc(ref, { online: false, typing: false, lastSeen: serverTimestamp() }, { merge: true })
              .catch(() => {});
          } catch (e) {}
        }
      }
    });
  }

  return new Promise((resolve, reject) => {
    let resolved = false;
    onAuthStateChanged(auth, async (user) => {
      if (user && !resolved) {
        ChatState.user = user;
        ChatState.isReady = true;
        if (ChatState.pairId) {
          try { await loadPairAndSubscribe(); } catch (e) { console.error('[chat] auto-restore', e); }
        }
        // Bundle C: re-register FCM token if user previously opted in (best-effort, silent on failure)
        try { await initFCM(app, db, ChatState); } catch (e) { console.warn('[chat] initFCM', e); }
        notify('onAuthReady');
        resolved = true;
        resolve();
      }
    });
    signInAnonymously(auth).catch(e => {
      console.error('[chat] sign-in failed', e);
      if (!resolved) { resolved = true; reject(e); }
    });
  });
}

export function setRole(role) {
  if (role !== 'parent' && role !== 'child') throw new Error('invalid role');
  ChatState.role = role;
  localStorage.setItem(LS.ROLE, role);
  recomputeUnread();
  notify('onUnreadUpdate', ChatState.unreadCount);
}

export async function setNames({ parentName, childName }) {
  if (parentName !== undefined) {
    ChatState.parentName = parentName;
    localStorage.setItem(LS.PARENT_NAME, parentName);
  }
  if (childName !== undefined) {
    ChatState.childName = childName;
    localStorage.setItem(LS.CHILD_NAME, childName);
  }
  if (ChatState.pairId) {
    const update = {};
    if (parentName !== undefined) update.parentName = parentName;
    if (childName !== undefined) update.childName = childName;
    if (Object.keys(update).length > 0) {
      try {
        await updateDoc(doc(db, 'pairs', ChatState.pairId), update);
      } catch (e) {
        console.error('[chat] setNames update', e);
      }
    }
  }
}

export async function generatePairingCode() {
  if (ChatState.role !== 'parent') throw new Error('parent role required');
  if (!ChatState.user) throw new Error('not authenticated');
  // Bundle D guard: clean stale pairs (e.g. user cleared only localStorage) so
  // watchForPairing doesn't auto-restore an old pair when the new code is issued.
  await deleteOwnPairs();
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Timestamp.fromMillis(Date.now() + 5 * 60 * 1000);
  await setDoc(doc(db, 'pairing_codes', code), {
    parentUid: ChatState.user.uid,
    parentName: ChatState.parentName,
    expiresAt,
  });
  startPairPolling(code);
  return code;
}

function startPairPolling(code) {
  stopPairPolling();
  pairPollInterval = setInterval(async () => {
    if (!ChatState.user) return;
    try {
      const q = query(collection(db, 'pairs'), where('parentUid', '==', ChatState.user.uid));
      const snap = await getDocs(q);
      if (!snap.empty) {
        let pairDoc = snap.docs[0];
        for (const d2 of snap.docs) {
          const a = pairDoc.data().createdAt?.toMillis?.() || 0;
          const b = d2.data().createdAt?.toMillis?.() || 0;
          if (b > a) pairDoc = d2;
        }
        ChatState.pairId = pairDoc.id;
        localStorage.setItem(LS.PAIR_ID, pairDoc.id);
        try { await deleteDoc(doc(db, 'pairing_codes', code)); } catch (e) {}
        stopPairPolling();
        await loadPairAndSubscribe();
        notify('onPairingComplete');
      }
    } catch (e) {
      console.error('[chat] pair polling', e);
    }
  }, 2000);
  pairPollTimeout = setTimeout(() => {
    stopPairPolling();
    deleteDoc(doc(db, 'pairing_codes', code)).catch(() => {});
  }, 5 * 60 * 1000);
}

function stopPairPolling() {
  if (pairPollInterval) { clearInterval(pairPollInterval); pairPollInterval = null; }
  if (pairPollTimeout) { clearTimeout(pairPollTimeout); pairPollTimeout = null; }
}

export async function pairWithCode(code) {
  if (ChatState.role !== 'child') throw new Error('child role required');
  if (!ChatState.user) throw new Error('not authenticated');
  if (!/^\d{6}$/.test(code)) throw new Error('6桁の数字を入力してください');
  // Bundle D guard: clean stale pairs before joining a new one.
  await deleteOwnPairs();
  const codeRef = doc(db, 'pairing_codes', code);
  let codeSnap;
  try {
    codeSnap = await getDoc(codeRef);
  } catch (e) {
    console.error('[chat] code read', e);
    throw new Error('コードの取得に失敗しました');
  }
  if (!codeSnap.exists()) throw new Error('コードが見つかりません');
  const codeData = codeSnap.data();
  if (codeData.expiresAt && codeData.expiresAt.toMillis() < Date.now()) {
    throw new Error('コードの有効期限が切れました(5分超過)');
  }
  const pairData = {
    parentUid: codeData.parentUid,
    childUid: ChatState.user.uid,
    parentName: codeData.parentName || 'パパ',
    childName: ChatState.childName,
    createdAt: serverTimestamp(),
    lastActivityAt: serverTimestamp(),
  };
  const pairDocRef = await addDoc(collection(db, 'pairs'), pairData);
  ChatState.pairId = pairDocRef.id;
  localStorage.setItem(LS.PAIR_ID, pairDocRef.id);
  try { await deleteDoc(codeRef); } catch (e) {}
  await loadPairAndSubscribe();
  notify('onPairingComplete');
}

export async function sendMessage(text) {
  if (!ChatState.pairId) throw new Error('not paired');
  if (!ChatState.role) throw new Error('role not set');
  const t = (text || '').trim();
  if (!t) return;
  await addDoc(collection(db, 'pairs', ChatState.pairId, 'messages'), {
    senderRole: ChatState.role,
    type: 'text',
    text: t,
    createdAt: serverTimestamp(),
    readByOther: false,
  });
  // Bundle B: send → typing off
  notifyTypingStop();
  updateDoc(doc(db, 'pairs', ChatState.pairId), {
    lastActivityAt: serverTimestamp(),
  }).catch(() => {});
}

export async function markAllAsRead() {
  if (!ChatState.pairId || !ChatState.role) return;
  const otherRole = ChatState.role === 'parent' ? 'child' : 'parent';
  const targets = ChatState.messages.filter(
    m => m.senderRole === otherRole && m.readByOther === false
  );
  await Promise.all(targets.map(m =>
    updateDoc(doc(db, 'pairs', ChatState.pairId, 'messages', m.id), { readByOther: true })
      .catch(e => console.error('[chat] markRead', m.id, e))
  ));
}

// =====================================================================
// Bundle D: stale pair cleanup (private helper)
// Deletes every /pairs/{id} where the current user is a member, plus its
// messages and presence subcollections. Subcollections are deleted FIRST
// because security rules on those use get(...pairs/$(pairId)) lookups —
// once the pair doc is gone, those rules fail (denied).
// Best-effort: per-pair errors are logged and skipped, never thrown.
// =====================================================================
async function deleteOwnPairs() {
  if (!ChatState.user || !ChatState.user.uid || !ChatState.role) return 0;

  const field = ChatState.role === 'parent' ? 'parentUid' : 'childUid';
  const q = query(collection(db, 'pairs'), where(field, '==', ChatState.user.uid));
  let snap;
  try {
    snap = await getDocs(q);
  } catch (e) {
    console.warn('[chat] deleteOwnPairs query', e);
    return 0;
  }

  let deleted = 0;
  for (const pairDoc of snap.docs) {
    const pairId = pairDoc.id;
    try {
      // Sub-collections first (messages, presence)
      for (const subName of ['messages', 'presence']) {
        const subSnap = await getDocs(collection(db, 'pairs', pairId, subName));
        if (subSnap.size > 0) {
          const batch = writeBatch(db);
          subSnap.docs.forEach(d => batch.delete(d.ref));
          await batch.commit();
        }
      }
      // Pair doc last
      await deleteDoc(doc(db, 'pairs', pairId));
      deleted++;
    } catch (e) {
      console.warn('[chat] delete pair', pairId, e);
    }
  }

  // Parent: also clean up own pairing_codes (if any are still lingering)
  if (ChatState.role === 'parent') {
    try {
      const codeQ = query(collection(db, 'pairing_codes'), where('parentUid', '==', ChatState.user.uid));
      const codeSnap = await getDocs(codeQ);
      for (const codeDoc of codeSnap.docs) {
        await deleteDoc(codeDoc.ref).catch(() => {});
      }
    } catch (e) {}
  }

  return deleted;
}

export async function resetPairing() {
  stopPairPolling();
  // 1. Firestore stale pairs (best-effort; rule denials are logged inside)
  await deleteOwnPairs();
  // 2. Local memory + persisted state — full reset back to first-launch defaults
  clearPairLocal();
  ChatState.role = null;
  ChatState.parentName = 'パパ';
  ChatState.childName = 'ハル';
  ChatState.muted = false;
  ChatState.pushEnabled = false;
  try {
    localStorage.removeItem(LS.ROLE);
    localStorage.removeItem(LS.PARENT_NAME);
    localStorage.removeItem(LS.CHILD_NAME);
    localStorage.removeItem(LS.MUTED);
    localStorage.removeItem(LS.PUSH_ENABLED);
  } catch (e) {}
}

// =====================================================================
// Bundle B: presence + typing
// =====================================================================

function presenceRef(role) {
  if (!ChatState.pairId) return null;
  const r = role || ChatState.role;
  if (!r) return null;
  return doc(db, 'pairs', ChatState.pairId, 'presence', r);
}

async function writePresenceOnline(online) {
  if (_presenceLastWrittenOnline === online) return;
  _presenceLastWrittenOnline = online;
  if (!online) _presenceTypingState = false;  // typing implicitly false when offline
  const ref = presenceRef();
  if (!ref) return;
  try {
    await setDoc(ref, {
      online,
      typing: online ? _presenceTypingState : false,
      lastSeen: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    if (e && e.code !== 'permission-denied') console.error('[chat] presence-online', e);
  }
}

async function writePresenceTyping(typing) {
  if (_presenceTypingState === typing) return;
  _presenceTypingState = typing;
  const ref = presenceRef();
  if (!ref) return;
  try {
    await setDoc(ref, { typing, lastSeen: serverTimestamp() }, { merge: true });
  } catch (e) {
    if (e && e.code !== 'permission-denied') console.error('[chat] presence-typing', e);
  }
}

async function writePresenceHeartbeat() {
  if (!_presenceLastWrittenOnline) return;
  const ref = presenceRef();
  if (!ref) return;
  try {
    await setDoc(ref, { lastSeen: serverTimestamp() }, { merge: true });
  } catch (e) {
    if (e && e.code !== 'permission-denied') console.error('[chat] presence-hb', e);
  }
}

function subscribeOtherPresence() {
  if (_otherPresenceUnsub) return;
  if (!ChatState.pairId || !ChatState.role) return;
  const otherRole = ChatState.role === 'parent' ? 'child' : 'parent';
  const ref = doc(db, 'pairs', ChatState.pairId, 'presence', otherRole);
  _otherPresenceUnsub = onSnapshot(ref, (snap) => {
    if (!snap.exists()) {
      ChatState.otherPresence = { online: false, lastSeen: null, typing: false };
    } else {
      const d = snap.data();
      ChatState.otherPresence = {
        online: !!d.online,
        lastSeen: d.lastSeen || null,
        typing: !!d.typing,
      };
    }
    notify('onPresenceUpdate', ChatState.otherPresence);
  }, (err) => {
    if (err && err.code !== 'permission-denied') console.error('[chat] presence-sub', err);
  });
}

function unsubscribeOtherPresence() {
  if (_otherPresenceUnsub) { _otherPresenceUnsub(); _otherPresenceUnsub = null; }
}

function updatePresenceInternal() {
  const tabVisible = (typeof document === 'undefined') || !document.hidden;
  const desiredOnline = _modalOpen && _inChatView && tabVisible;

  // Write own state if changed
  writePresenceOnline(desiredOnline).catch(() => {});

  // Heartbeat: only when online
  if (desiredOnline && !_presenceHeartbeatTimer) {
    _presenceHeartbeatTimer = setInterval(() => writePresenceHeartbeat(), 30000);
  } else if (!desiredOnline && _presenceHeartbeatTimer) {
    clearInterval(_presenceHeartbeatTimer);
    _presenceHeartbeatTimer = null;
  }

  // Subscription: while modal open
  if (_modalOpen) subscribeOtherPresence();
  else unsubscribeOtherPresence();
}

export function setPresenceModalOpen(open) {
  _modalOpen = !!open;
  if (!open) {
    notifyTypingStop();
    _inChatView = false;
  }
  updatePresenceInternal();
}

export function setPresenceChatView(active) {
  _inChatView = !!active;
  if (!active) notifyTypingStop();
  updatePresenceInternal();
}

export function notifyTyping() {
  if (_typingInputTimer) clearTimeout(_typingInputTimer);
  if (!_presenceTypingState) writePresenceTyping(true).catch(() => {});
  _typingInputTimer = setTimeout(() => {
    _typingInputTimer = null;
    writePresenceTyping(false).catch(() => {});
  }, 3000);
}

export function notifyTypingStop() {
  if (_typingInputTimer) { clearTimeout(_typingInputTimer); _typingInputTimer = null; }
  writePresenceTyping(false).catch(() => {});
}

export function setMuted(muted) {
  ChatState.muted = !!muted;
  try { localStorage.setItem(LS.MUTED, ChatState.muted ? '1' : '0'); } catch (e) {}
}

// =====================================================================
// Bundle C: FCM opt-in flag + Firebase getters (consumed by chat-fcm.js)
// =====================================================================

export function setPushEnabled(enabled) {
  ChatState.pushEnabled = !!enabled;
  try { localStorage.setItem(LS.PUSH_ENABLED, ChatState.pushEnabled ? '1' : '0'); } catch (e) {}
}

export function getFirebaseApp() { return app; }
export function getFirebaseDb() { return db; }

// Debug helpers
if (typeof window !== 'undefined') {
  window.__chatDebug = function() {
    return {
      uid: ChatState.user ? ChatState.user.uid : null,
      role: ChatState.role,
      pairId: ChatState.pairId,
      parentName: ChatState.parentName,
      childName: ChatState.childName,
      messageCount: ChatState.messages.length,
      unreadCount: ChatState.unreadCount,
      isReady: ChatState.isReady,
      otherPresence: ChatState.otherPresence,
      muted: ChatState.muted,
      pushEnabled: ChatState.pushEnabled,
      notificationPermission: typeof Notification !== 'undefined' ? Notification.permission : 'n/a',
      _modalOpen, _inChatView,
      _presenceLastWrittenOnline, _presenceTypingState,
    };
  };
  window.__chatReset = async function() {
    await resetPairing();
    console.log('[chat] reset done — reload to re-init');
  };
}
