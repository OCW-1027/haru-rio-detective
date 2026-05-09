// engine/chat-fcm.js — Bundle C (Phase 4): FCM client.
// Lazy-initialized: enablePush() is called only when the user opts in via the settings toggle.
import {
  getMessaging, getToken, onMessage, isSupported
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging.js";
import {
  doc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { firebaseConfig } from "./chat-config.js";

const SW_PATH = '/haru-rio-detective/firebase-messaging-sw.js';

let _messaging = null;
let _foregroundUnsub = null;
let _swReg = null;

function envSupported() {
  return typeof window !== 'undefined'
    && 'serviceWorker' in navigator
    && 'PushManager' in window
    && 'Notification' in window;
}

async function ensureSwRegistration() {
  if (_swReg) return _swReg;
  _swReg = await navigator.serviceWorker.register(SW_PATH);
  return _swReg;
}

async function getMessagingInstance(app) {
  if (_messaging) return _messaging;
  try {
    const ok = await isSupported();
    if (!ok) return null;
  } catch (_) { return null; }
  _messaging = getMessaging(app);
  return _messaging;
}

// Call once after auth + (optional) pair restore. Side-effect-free unless push was previously enabled.
export async function initFCM(app, db, ChatState) {
  if (!envSupported()) return;
  if (!ChatState.pushEnabled) return;
  // Permission may have been revoked from browser settings — bail silently.
  if (Notification.permission !== 'granted') return;
  try {
    await registerToken(app, db, ChatState);
    await attachForegroundHandler(app);
  } catch (e) {
    console.warn('[fcm] init failed:', e && e.message ? e.message : e);
  }
}

// User-initiated opt-in: requests permission, registers SW, fetches token, writes to pair doc.
// Returns: { ok: true } | { ok: false, reason: string }
export async function enablePush(app, db, ChatState) {
  if (!envSupported()) return { ok: false, reason: 'unsupported' };
  let permission = Notification.permission;
  if (permission === 'default') {
    try { permission = await Notification.requestPermission(); }
    catch (_) { return { ok: false, reason: 'permission-error' }; }
  }
  if (permission !== 'granted') return { ok: false, reason: 'permission-denied' };
  try {
    await registerToken(app, db, ChatState);
    await attachForegroundHandler(app);
    return { ok: true };
  } catch (e) {
    console.warn('[fcm] enable failed:', e && e.message ? e.message : e);
    return { ok: false, reason: 'token-error' };
  }
}

// Disable in-app: clears local flag. Token cleanup is handled lazily by FCM (expired tokens get pruned by send failures).
export async function disablePush() {
  if (_foregroundUnsub) { try { _foregroundUnsub(); } catch (_) {} _foregroundUnsub = null; }
}

async function registerToken(app, db, ChatState) {
  const messaging = await getMessagingInstance(app);
  if (!messaging) throw new Error('messaging not supported');
  const reg = await ensureSwRegistration();
  const token = await getToken(messaging, {
    vapidKey: firebaseConfig.vapidKey,
    serviceWorkerRegistration: reg
  });
  if (!token) throw new Error('empty token');
  if (ChatState.pairId && ChatState.role) {
    const tokenField = ChatState.role === 'parent' ? 'parentFcmToken' : 'childFcmToken';
    const updatedField = ChatState.role === 'parent' ? 'parentTokenUpdatedAt' : 'childTokenUpdatedAt';
    await updateDoc(doc(db, 'pairs', ChatState.pairId), {
      [tokenField]: token,
      [updatedField]: serverTimestamp(),
    });
  }
  return token;
}

async function attachForegroundHandler(app) {
  if (_foregroundUnsub) return;
  const messaging = await getMessagingInstance(app);
  if (!messaging) return;
  // Foreground: Bundle B's onIncomingMessage already handles toast+ding via onSnapshot,
  // so we only log here to avoid duplicate notifications.
  _foregroundUnsub = onMessage(messaging, (payload) => {
    console.log('[fcm] foreground:', payload && payload.data);
  });
}
