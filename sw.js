// sw.js — Bundle C (Phase 4): offline cache for hosted assets.
// FCM background messages are handled by firebase-messaging-sw.js (separate SW).
const CACHE_NAME = 'haruchat-v1';
const PRECACHE_URLS = [
  '/haru-rio-detective/',
  '/haru-rio-detective/index.html',
  '/haru-rio-detective/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => null)
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  // Network-first, cache fallback
  event.respondWith(
    fetch(req)
      .then((res) => {
        // Optionally update cache for navigations
        if (res && res.ok && req.mode === 'navigate') {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(req, copy)).catch(() => {});
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
