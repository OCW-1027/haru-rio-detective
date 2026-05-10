# 하루게임 채팅 — Bundle C (Phase 4): PWA + Service Worker + FCM 푸시

## 0. 컨텍스트

| 단계 | 상태 | commit |
|---|---|---|
| Phase 1 (텍스트 + 페어링) | ✅ | `77458a2` |
| Bundle A (i18n + 이모지) | ✅ | `35b43aa` |
| 영어 학습 탭 + ASD 정정 | ✅ | `b4fe0d9` |
| Bundle B (presence·typing·읽음·in-app 알림) | ✅ | `d1b8599` |
| **Bundle C (PWA + FCM 푸시)** | **이번** | — |

- 작업 폴더: `C:\Users\taise\Projects\harugame`
- 브랜치: `main`
- Firebase 프로젝트: `haru-chat-5c535`

---

## 1. 작업 범위

이번 작업은 채팅 시리즈 **마지막 단계**. 4가지 추가:

1. **PWA 설정** — manifest.json + 아이콘 → 안드로이드 홈화면에 「하루게임」 아이콘 추가 가능
2. **Service Worker** — 오프라인 캐시 + FCM 백그라운드 메시지 수신
3. **FCM (Firebase Cloud Messaging)** — 채팅 모달 닫혀있어도 시스템 알림 받기
4. **Cloud Functions** — 메시지 작성 트리거 → 상대방에게 푸시 발송

⚠️ **Blaze 요금제 업그레이드 필수** (Cloud Functions 사용 위해). 신용카드 등록 필요. 1쌍 가족 사용은 무료 한도 내 100% 무료.

---

## 2. 사용자가 직접 할 작업 (콘솔 + 등록)

Claude Code가 코드 만들기 **전에** 사용자가 먼저 해야 할 것들:

### 2-1. Blaze 요금제 업그레이드 (5분, 신용카드 등록)

1. https://console.firebase.google.com → **haru-chat** 프로젝트
2. 좌하단 **「Spark 무료」** 옆 **「업그레이드」** 클릭
3. **「Blaze - 종량제」** 선택 → **「플랜 선택」**
4. **결제 계정** 설정:
   - 「새 결제 계정 만들기」 클릭
   - 국가: **일본** 또는 한국 (사용자 거주지)
   - 신용카드 등록 (일본/한국 발행 카드 모두 가능)
5. **🔔 예산 알림 필수 설정** (실수로 폭탄 청구 방지):
   - 결제 계정 → **예산 및 알림**
   - 예산 만들기 → 월 **¥500** (또는 $5) 한도
   - 알림 임계값: **50%, 90%, 100%** 도달 시 메일
   - 1쌍 가족 사용은 평생 ¥0이지만 안전망

### 2-2. Cloud Messaging 활성화 + VAPID 키 생성

1. Firebase 콘솔 → **프로젝트 설정** (⚙ 톱니바퀴) → **Cloud Messaging** 탭
2. **「웹 푸시 인증서」** 영역까지 스크롤
3. **「키 쌍 생성」** 클릭 → VAPID 키 생성됨
4. 생성된 키 (예: `BKd...xyz`) 복사해서 메모장에 저장 → 나중에 `chat-config.js`에 추가

### 2-3. Cloud Functions 영역 확인

- Firebase 콘솔 → 좌측 **「Build」 → 「Functions」** 클릭
- 「시작하기」 화면이 나오면 그대로 두기 (Claude Code가 배포 시 자동 초기화)

---

## 3. 신규 파일 (Claude Code가 작성)

```
manifest.json                 PWA 매니페스트 (앱 이름·아이콘·테마색)
sw.js                         Service Worker (캐시 + FCM 백그라운드)
firebase-messaging-sw.js      FCM 전용 Service Worker
icons/                        PWA 아이콘 디렉토리
  icon-192.png                  안드로이드 홈화면용 (192x192)
  icon-512.png                  splash·고해상도용 (512x512)
  icon-maskable-192.png         maskable 아이콘 (안드로이드 adaptive)
  icon-maskable-512.png
engine/chat-fcm.js            FCM 클라이언트 로직 (토큰 등록·구독)
functions/                    Cloud Functions 디렉토리 (firebase init functions로 자동 생성)
  package.json
  index.js                    onCreate 트리거 → FCM 발송
.firebaserc                   Functions 배포 설정
firebase.json                 Functions 빌드·배포 설정
```

## 4. 수정 파일 (최소)

```
index.html                    manifest.json link + meta theme-color + sw.js 등록
engine/chat-config.js         vapidKey 추가
engine/chat-core.js           initFCM 호출 + 토큰 저장 (페어링 시)
engine/chat-bindings.js       PWA install prompt 핸들러 (선택)
```

## 5. Firestore 데이터 모델 추가

### 5-1. FCM 토큰 저장

기존 `pairs/{pairId}` 문서에 필드 추가:

```
/pairs/{pairId}
  ...기존 필드...
  parentFcmToken: string | null     부모의 FCM 토큰
  childFcmToken: string | null      자녀의 FCM 토큰
  parentTokenUpdatedAt: serverTimestamp
  childTokenUpdatedAt: serverTimestamp
```

각 디바이스가 자기 토큰을 자기 필드에 쓰기. 보안 규칙은 본인 역할만 본인 토큰 필드 쓰도록 제약.

### 5-2. 보안 규칙 업데이트

기존 `pairs/{pairId}` `update` 규칙에 토큰 필드 제약 추가:

```javascript
match /pairs/{pairId} {
  allow read, update: if request.auth != null
    && (request.auth.uid == resource.data.parentUid
        || request.auth.uid == resource.data.childUid);
  // ⚠️ 본인 역할만 본인 토큰 필드 갱신 가능 (다른 필드는 기존대로)
  // 단순화 위해 update 자체는 멤버 양쪽에 허용 (토큰 변조 위험 낮음, 1:1 신뢰 관계)
  allow create: if request.auth != null
    && (request.auth.uid == request.resource.data.parentUid
        || request.auth.uid == request.resource.data.childUid);
}
```

→ 사실상 기존 규칙 그대로 OK (1:1 가족 신뢰 관계).

---

## 6. PWA 사양

### 6-1. manifest.json

```json
{
  "name": "ハルゲーム",
  "short_name": "ハルゲーム",
  "description": "ハル専用の学習ゲーム",
  "start_url": "/haru-rio-detective/",
  "scope": "/haru-rio-detective/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#fef9c3",
  "theme_color": "#fee500",
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

### 6-2. 아이콘 디자인

- 모티브: 노란 배경 + 「ハル」 글자 또는 검정 모자(탐정 캐릭터 모티브)
- maskable: 중앙 80% 영역에 핵심 디자인, 가장자리 20%는 안드로이드가 잘라낼 수 있음
- Claude Code가 SVG로 디자인 후 PNG 변환 (또는 단순 색 배경 + 텍스트)

### 6-3. index.html에 추가

```html
<head>
  ... 기존 link/script ...
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#fee500">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="default">
  <link rel="apple-touch-icon" href="icons/icon-192.png">
</head>
```

### 6-4. sw.js (기본 캐시 + 오프라인)

```javascript
const CACHE_NAME = 'haruchat-v1';
const PRECACHE_URLS = ['/haru-rio-detective/', '/haru-rio-detective/index.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // 네트워크 우선, 실패 시 캐시 (stale-while-revalidate 방식 단순화)
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
```

### 6-5. 홈화면 추가 안내 (안드로이드)

- 자녀 안드로이드 Chrome에서 사이트 접속 → **메뉴 → "홈 화면에 추가"** 자동으로 가능 (manifest.json 인식 시)
- 또는 사용자가 PWA install prompt 이벤트 핸들러로 직접 안내 가능 (선택)

---

## 7. FCM 사양

### 7-1. firebase-messaging-sw.js (FCM 전용 Service Worker)

```javascript
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || '하루게임';
  const options = {
    body: payload.notification?.body || '새 메시지',
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
    clients.matchAll({ type: 'window' }).then(clients => {
      // 기존 창 있으면 포커스
      for (const client of clients) {
        if (client.url.includes('/haru-rio-detective/')) {
          return client.focus();
        }
      }
      // 없으면 새 창
      return clients.openWindow('/haru-rio-detective/');
    })
  );
});
```

### 7-2. engine/chat-fcm.js (클라이언트)

```javascript
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-messaging.js";
import { firebaseConfig } from './chat-config.js';

const VAPID_KEY = firebaseConfig.vapidKey;  // 사용자가 콘솔에서 받은 키

export async function initFCM(app, db, ChatState) {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.log('[fcm] Browser does not support push');
    return;
  }
  
  // Service Worker 등록
  const reg = await navigator.serviceWorker.register('/haru-rio-detective/firebase-messaging-sw.js');
  
  // 알림 권한 요청
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.log('[fcm] Permission denied');
    return;
  }
  
  // FCM 토큰 발급
  const messaging = getMessaging(app);
  const token = await getToken(messaging, { 
    vapidKey: VAPID_KEY,
    serviceWorkerRegistration: reg
  });
  
  if (!token) return;
  
  // pair 문서에 본인 역할의 토큰 저장
  if (ChatState.pairId && ChatState.role) {
    const field = ChatState.role === 'parent' ? 'parentFcmToken' : 'childFcmToken';
    const updatedField = ChatState.role === 'parent' ? 'parentTokenUpdatedAt' : 'childTokenUpdatedAt';
    await updateDoc(doc(db, 'pairs', ChatState.pairId), {
      [field]: token,
      [updatedField]: serverTimestamp()
    });
  }
  
  // 포그라운드 메시지 수신 (앱 켜져있을 때)
  onMessage(messaging, (payload) => {
    // 이미 Phase 3의 in-app 토스트가 처리하므로 별도 동작 불필요
    console.log('[fcm] foreground:', payload);
  });
}
```

### 7-3. 권한 요청 타이밍

- 모달 첫 진입 + 페어링 완료 직후 → 알림 권한 요청
- 또는 설정 화면에 「🔔 푸시 알림 활성화」 버튼 추가 (사용자 명시 동의)

추천: **명시 버튼 방식** — 자녀 첫 페어링 시 권한 팝업 폭주 방지.

---

## 8. Cloud Functions 사양

### 8-1. functions/index.js (FCM 발송 트리거)

```javascript
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { initializeApp } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();

exports.sendChatNotification = onDocumentCreated(
  "pairs/{pairId}/messages/{msgId}",
  async (event) => {
    const msg = event.data?.data();
    if (!msg) return;
    
    const pairId = event.params.pairId;
    const senderRole = msg.senderRole;
    const text = msg.text || '';
    
    // 받는 사람 토큰 조회
    const pairSnap = await getFirestore().doc(`pairs/${pairId}`).get();
    if (!pairSnap.exists) return;
    const pair = pairSnap.data();
    
    const recipientTokenField = senderRole === 'parent' ? 'childFcmToken' : 'parentFcmToken';
    const senderName = senderRole === 'parent' ? (pair.parentName || 'パパ') : (pair.childName || 'ハル');
    
    const token = pair[recipientTokenField];
    if (!token) return;  // 받는 사람이 푸시 등록 안 한 경우 skip
    
    // 50자 미리보기
    const preview = text.slice(0, 50) + (text.length > 50 ? '…' : '');
    
    try {
      await getMessaging().send({
        token,
        notification: {
          title: senderName,
          body: preview
        },
        data: {
          pairId,
          msgId: event.params.msgId,
          senderRole
        },
        webpush: {
          notification: {
            icon: '/haru-rio-detective/icons/icon-192.png',
            badge: '/haru-rio-detective/icons/icon-192.png',
            tag: 'haruchat-msg'
          }
        }
      });
    } catch (err) {
      // 토큰 만료 등은 무시 (다음 앱 실행 시 자동 갱신)
      console.warn('FCM send failed:', err.message);
    }
  }
);
```

### 8-2. firebase.json

```json
{
  "functions": [
    {
      "source": "functions",
      "codebase": "default",
      "ignore": ["node_modules", ".git", "firebase-debug.log", "firebase-debug.*.log"],
      "predeploy": ["npm --prefix \"$RESOURCE_DIR\" run lint"]
    }
  ]
}
```

### 8-3. functions/package.json

```json
{
  "name": "functions",
  "engines": { "node": "20" },
  "main": "index.js",
  "dependencies": {
    "firebase-admin": "^12.0.0",
    "firebase-functions": "^5.0.0"
  }
}
```

### 8-4. 배포 명령

Claude Code가 작업 폴더에서:
```bash
firebase deploy --only functions
```

→ 약 2~3분 소요. 배포 후 자동 활성화.

---

## 9. UI 변경 (chat-ui.js)

### 9-1. 설정 화면에 「푸시 알림」 토글 추가

기존 설정 항목 옆에:

```
🔔 通知音       [ON ▢ / OFF ▢]
🔔 プッシュ通知 [✓ 有効化]   ← 신규, 클릭 시 권한 요청 → 토큰 등록
```

- 권한 거부 상태면 「ブラウザ設定で許可」 안내
- 토큰 등록되면 「✓ 有効」 표시 + 「無効化」 버튼

---

## 10. 검증

### 10-1. PWA

1. 푸시 후 안드로이드 Chrome으로 사이트 접속
2. Chrome 메뉴 → **「ホーム画面に追加」** 옵션 보임
3. 추가 → 홈화면에 ハルゲーム 아이콘
4. 아이콘 클릭 → 풀스크린(주소바 없음)으로 앱 실행
5. 오프라인 상태에서도 메인 화면 로드 (캐시)

### 10-2. FCM 푸시

1. 양쪽 디바이스 권한 허용 + 토큰 등록
2. A창 모달 닫고 게임 메인 화면
3. B창에서 메시지 보냄
4. → A창에 시스템 알림 표시 (브라우저가 백그라운드여도)
5. 알림 클릭 → 사이트 자동 열림 + 채팅 모달 표시
6. iOS Safari (16.4+) 도 동일하게 동작 (PWA 설치 시)

### 10-3. 회귀

- 기존 채팅·in-app 알림·이모지·영어 학습 탭 모두 정상
- in-app 알림과 시스템 알림 중복 안 되도록 (모달 열려있으면 시스템 알림 skip)

---

## 11. Git 작업

```bash
git add manifest.json sw.js firebase-messaging-sw.js \
        icons/ engine/chat-fcm.js engine/chat-config.js \
        engine/chat-core.js engine/chat-bindings.js \
        index.html functions/ firebase.json .firebaserc \
        CHAT_BUNDLE_C_PHASE4_SPEC.md
git commit -m "feat(chat): Bundle C — PWA + Service Worker + FCM push (Phase 4)

- PWA manifest + maskable icons (192/512)
- Service Worker for offline cache + FCM background
- FCM client: VAPID token registration, foreground/background handlers
- Cloud Functions: onCreate trigger sends FCM to recipient
- Pair doc extended with parent/childFcmToken fields
- New 'プッシュ通知' opt-in toggle in settings (no aggressive prompt)
- Blaze plan upgrade required (functions usage well within free tier)
- iOS Safari 16.4+ supported via PWA install"

# Functions 별도 배포
firebase deploy --only functions

git push origin main
```

---

## 12. 비용 추정 (Blaze 무료 한도)

1쌍 가족 + 일 100메시지 가정:

| 리소스 | 일일 사용량 | 무료 한도 | 사용률 |
|---|---|---|---|
| Cloud Functions 호출 | 100 (메시지당 1) | 2,000,000 / 월 | < 0.005% |
| Functions 컴퓨트 | < 1초 / 호출 | 400,000 GB-초 / 월 | < 0.001% |
| FCM 발송 | 100 / 일 | 무제한 | 0% |
| Firestore (Bundle B에서 이미 추정) | ~420 쓰기 | 20,000 / 일 | 2.1% |

**예상 월 비용: ¥0** (1년에 0~1엔 정도). 예산 알림 ¥500은 사실상 안전망.

---

## 13. ⚠️ 주의사항

### 13-1. iOS 시스템 알림

- iOS 16.3 이전: PWA 푸시 안 됨
- iOS 16.4+: PWA 설치(홈화면 추가) 후 가능
- 자녀는 안드로이드라 무관, 사용자 본인이 iPhone이면 iOS 버전 확인

### 13-2. 권한 거부 시 폴백

- 알림 권한 거부 → in-app 토스트(Bundle B)는 그대로 동작
- 사용자가 추후 활성화 원하면 설정 → ブラウザ設定 안내

### 13-3. 토큰 갱신

- 브라우저 캐시 삭제 / 시크릿창 / 다른 디바이스 → 토큰 변경
- 매 앱 실행 시 토큰 재취득 → pair 문서 갱신
- 만료된 토큰으로 발송 시 Cloud Function이 catch만 (자동 정리는 Phase 5에서)

---

## 14. Phase 5 예고 (Bundle C 완료 후)

이후 추가 가능 (선택):
- 사진/스티커 전송 (Storage 사용 → Blaze에서 무료 한도 OK)
- 그림 그리기 (canvas → 이미지 변환 → Storage)
- 토큰 자동 정리 (만료 토큰 cleanup Function)

다만 5/15 자녀 페어링 후 1~2주 사용해보고 실제 필요하면 그때 진행.
