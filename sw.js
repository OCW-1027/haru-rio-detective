// sw.js — v2 기반 공사(P2): 이미지는 캐시 우선, 코드는 네트워크 우선(+오프라인 대비).
// FCM 백그라운드 메시지 처리 (firebase-messaging-sw.js) 도 이 SW 안에서 불러온다.
//   ※ 예전에는 sw.js 와 firebase-messaging-sw.js 를 같은 범위(/haru-rio-detective/)에 따로 등록해서
//     서로 덮어쓰는 문제가 있었다 (한 범위에는 SW 가 1개만 가능). 지금은 sw.js 하나로 통합.
try { importScripts('firebase-messaging-sw.js'); } catch (e) { /* 오프라인 등으로 실패해도 캐시 기능은 동작 */ }
const CODE_CACHE = 'haru-code-v3';   // HTML·JS·CSS — 항상 최신을 받고, 실패할 때만 캐시 사용
const IMG_CACHE  = 'haru-img-v3';    // 이미지·글꼴 — 한 번 받으면 다시 받지 않음
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
  // cache:'no-cache' — 브라우저 HTTP 캐시(GitHub Pages 는 max-age=600)를 쓰지 않고 매번 서버에 확인 (바뀌지 않았으면 304 로 가볍다).
  // 이렇게 하지 않으면 업데이트 후 최대 10분 동안 옛 JS 가 나와서 휴대폰에서 새 기능이 안 보일 수 있다.
  return fetch(req, { cache: 'no-cache' })
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
