// sw.js — v2 기반 공사(P2): 이미지는 캐시 우선, 코드는 네트워크 우선(+오프라인 대비).
// FCM 백그라운드 메시지는 firebase-messaging-sw.js (별도 SW) 가 처리한다.
const CODE_CACHE = 'haru-code-v2';   // HTML·JS·CSS — 항상 최신을 받고, 실패할 때만 캐시 사용
const IMG_CACHE  = 'haru-img-v2';    // 이미지·글꼴 — 한 번 받으면 다시 받지 않음
// ※ 같은 파일 이름으로 그림 내용을 바꿨다면 IMG_CACHE 의 숫자를 올린다.
const KEEP = [CODE_CACHE, IMG_CACHE];
const IMG_RE = /\.(webp|png|jpe?g|gif|svg|ico|woff2?)$/i;

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !KEEP.includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function cacheFirst(req) {
  return caches.open(IMG_CACHE).then((cache) =>
    cache.match(req).then((hit) =>
      hit || fetch(req).then((res) => {
        if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
        return res;
      })
    )
  );
}

function networkFirst(req) {
  return fetch(req)
    .then((res) => {
      if (res && res.ok) {
        const copy = res.clone();
        caches.open(CODE_CACHE).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    })
    .catch(() => caches.match(req, { ignoreSearch: req.mode === 'navigate' }).then((hit) => hit || Response.error()));
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;       // Firebase·글꼴 CDN 등은 브라우저에 맡김
  if (/\.(mp3|m4a|ogg)$/i.test(url.pathname)) return;    // 음성 파일은 브라우저에 맡김 (부분 요청 206 은 캐시에 넣을 수 없음)
  event.respondWith(IMG_RE.test(url.pathname) ? cacheFirst(req) : networkFirst(req));
});
