// engine/chat-core.js — Phase 1 chat: anon auth + pairing + text messaging
// Public API consumed by chat-ui.js / chat-bindings.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import {
  getAuth, signInAnonymously, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import {
  getFirestore, collection, doc, addDoc, setDoc, getDoc, getDocs,
  updateDoc, deleteDoc, onSnapshot, query, where, orderBy,
  serverTimestamp, Timestamp
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { firebaseConfig } from "./chat-config.js";

const LS = {
  ROLE: 'haruchat_role',
  PAIR_ID: 'haruchat_pair_id',
  PARENT_NAME: 'haruchat_parent_name',
  CHILD_NAME: 'haruchat_child_name',
};

export const ChatState = {
  user: null,
  role: null,             // 'parent' | 'child' | null
  pairId: null,
  parentName: '아빠',
  childName: '하루',
  messages: [],
  unreadCount: 0,
  isReady: false,
  // Callbacks (UI/bindings register)
  onMessagesUpdate: null,
  onUnreadUpdate: null,
  onPairingComplete: null,
  onAuthReady: null,
  onPairLost: null,
};

let app, auth, db;
let messagesUnsub = null;
let pairUnsub = null;
let pairPollInterval = null;
let pairPollTimeout = null;

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
    // Pair vanished (other side reset). Clear local pair state.
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

  // Subscribe to pair doc (catch deletion / name updates)
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

  // Subscribe to messages (asc by createdAt)
  if (messagesUnsub) { messagesUnsub(); messagesUnsub = null; }
  const q = query(
    collection(db, 'pairs', ChatState.pairId, 'messages'),
    orderBy('createdAt', 'asc')
  );
  messagesUnsub = onSnapshot(q, (snap2) => {
    ChatState.messages = snap2.docs.map(d2 => ({ id: d2.id, ...d2.data() }));
    recomputeUnread();
    notify('onMessagesUpdate', ChatState.messages);
    notify('onUnreadUpdate', ChatState.unreadCount);
  });
}

function clearPairLocal() {
  if (messagesUnsub) { messagesUnsub(); messagesUnsub = null; }
  if (pairUnsub) { pairUnsub(); pairUnsub = null; }
  ChatState.pairId = null;
  ChatState.messages = [];
  ChatState.unreadCount = 0;
  localStorage.removeItem(LS.PAIR_ID);
  notify('onMessagesUpdate', []);
  notify('onUnreadUpdate', 0);
}

export async function initChat() {
  if (app) return;  // idempotent
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);

  // Restore from localStorage
  ChatState.role = localStorage.getItem(LS.ROLE) || null;
  ChatState.pairId = localStorage.getItem(LS.PAIR_ID) || null;
  ChatState.parentName = localStorage.getItem(LS.PARENT_NAME) || '아빠';
  ChatState.childName = localStorage.getItem(LS.CHILD_NAME) || '하루';

  return new Promise((resolve, reject) => {
    let resolved = false;
    onAuthStateChanged(auth, async (user) => {
      if (user && !resolved) {
        ChatState.user = user;
        ChatState.isReady = true;
        if (ChatState.pairId) {
          try { await loadPairAndSubscribe(); } catch (e) { console.error('[chat] auto-restore', e); }
        }
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
        // Pick the most recent pair (in case multiple — shouldn't happen but be defensive)
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
  // Auto cleanup after 5 minutes
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
  if (!/^\d{6}$/.test(code)) throw new Error('6자리 숫자를 입력하세요');
  const codeRef = doc(db, 'pairing_codes', code);
  let codeSnap;
  try {
    codeSnap = await getDoc(codeRef);
  } catch (e) {
    console.error('[chat] code read', e);
    throw new Error('코드 조회 실패');
  }
  if (!codeSnap.exists()) throw new Error('코드를 찾을 수 없습니다');
  const codeData = codeSnap.data();
  if (codeData.expiresAt && codeData.expiresAt.toMillis() < Date.now()) {
    throw new Error('코드가 만료되었습니다');
  }
  // Create pair
  const pairData = {
    parentUid: codeData.parentUid,
    childUid: ChatState.user.uid,
    parentName: codeData.parentName || '아빠',
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
  // Best-effort lastActivityAt update (non-blocking)
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

export function resetPairing() {
  stopPairPolling();
  clearPairLocal();
}

// Debug helpers (browser console)
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
    };
  };
  window.__chatReset = function() {
    resetPairing();
    localStorage.removeItem(LS.ROLE);
    ChatState.role = null;
    console.log('[chat] reset done — reload to re-init');
  };
}
