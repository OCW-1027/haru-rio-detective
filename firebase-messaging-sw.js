// firebase-messaging-sw.js — Bundle C (Phase 4): FCM background handler.
// Compat SDK is required for the messaging SW (modular SDK is not supported here).
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyD0HYOjoioHbTSkeAcfL5zb5Xh7E1V_tew",
  authDomain: "haru-chat-5c535.firebaseapp.com",
  projectId: "haru-chat-5c535",
  storageBucket: "haru-chat-5c535.firebasestorage.app",
  messagingSenderId: "980653433626",
  appId: "1:980653433626:web:ec96deacb6abb6cd9e42a3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'ハルゲーム';
  const body = (payload.notification && payload.notification.body) || '新着メッセージ';
  const options = {
    body,
    icon: '/haru-rio-detective/icons/icon-192.png',
    badge: '/haru-rio-detective/icons/icon-192.png',
    tag: 'haruchat-msg',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const client of wins) {
        if (client.url.includes('/haru-rio-detective/')) {
          return client.focus();
        }
      }
      return clients.openWindow('/haru-rio-detective/');
    })
  );
});
