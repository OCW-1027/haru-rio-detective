// functions/index.js — Bundle C (Phase 4): Cloud Functions for FCM push.
// Triggered when a new chat message is created; sends an FCM notification to the recipient's token.
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

exports.sendChatNotification = onDocumentCreated(
  {
    document: "pairs/{pairId}/messages/{msgId}",
    region: "asia-northeast1",
  },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const msg = snap.data();
    if (!msg) return;

    const pairId = event.params.pairId;
    const msgId = event.params.msgId;
    const senderRole = msg.senderRole;
    const text = msg.text || '';

    const pairSnap = await getFirestore().doc(`pairs/${pairId}`).get();
    if (!pairSnap.exists) return;
    const pair = pairSnap.data() || {};

    const recipientTokenField = senderRole === 'parent' ? 'childFcmToken' : 'parentFcmToken';
    const senderName = senderRole === 'parent'
      ? (pair.parentName || 'パパ')
      : (pair.childName || 'ハル');

    const token = pair[recipientTokenField];
    if (!token) return;

    const preview = text.slice(0, 50) + (text.length > 50 ? '…' : '');

    try {
      await getMessaging().send({
        token,
        notification: {
          title: senderName,
          body: preview,
        },
        data: {
          pairId,
          msgId,
          senderRole: String(senderRole || ''),
        },
        webpush: {
          notification: {
            icon: '/haru-rio-detective/icons/icon-192.png',
            badge: '/haru-rio-detective/icons/icon-192.png',
            tag: 'haruchat-msg',
          },
        },
      });
    } catch (err) {
      // Expired/invalid token — Phase 5 will add cleanup. For now just log.
      console.warn('FCM send failed:', err && err.message ? err.message : err);
    }
  }
);
