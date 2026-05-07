# 하루게임 채팅 Phase 1 — 구현 명세서

## 0. 개요

부모(도쿄 PC) ↔ 자녀 하루(나가사키 안드로이드 태블릿) 간 1:1 카톡 스타일 채팅을 하루게임 안에 통합한다.

- 첫 페어링 예정일: 2026-05-15경 (자녀 방문 시)
- Phase 1 범위: **텍스트 메시지 송수신 + 페어링**
- 음성·푸시는 Phase 2~4에서 (지금 작업 안 함)
- Storage 사용 안 함 (Spark 무료 플랜 유지)

---

## 1. Firebase 사전 셋업 상태 (이미 콘솔에서 완료됨)

| 항목 | 값 |
|---|---|
| 프로젝트 ID | `haru-chat-5c535` |
| 요금제 | Spark (무료) |
| 리전 | `asia-northeast1` (Tokyo) |
| Authentication | Anonymous 활성화 |
| Firestore | 생성 완료 + 보안 규칙 적용 완료 |
| Storage | 사용 안 함 |

### 1-1. firebaseConfig

```javascript
{
  apiKey: "AIzaSyD0HYOjoioHbTSkeAcfL5zb5Xh7E1V_tew",
  authDomain: "haru-chat-5c535.firebaseapp.com",
  projectId: "haru-chat-5c535",
  storageBucket: "haru-chat-5c535.firebasestorage.app",
  messagingSenderId: "980653433626",
  appId: "1:980653433626:web:ec96deacb6abb6cd9e42a3"
}
```

### 1-2. 적용된 Firestore 보안 규칙 (참고용, 이미 게시됨)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /pairing_codes/{code} {
      allow read, write: if request.auth != null;
    }

    match /pairs/{pairId} {
      allow read, update: if request.auth != null
        && (request.auth.uid == resource.data.parentUid
            || request.auth.uid == resource.data.childUid);
      allow create: if request.auth != null
        && request.auth.uid == request.resource.data.parentUid;
    }

    match /pairs/{pairId}/messages/{msgId} {
      allow read, create, update: if request.auth != null
        && (request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.parentUid
            || request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.childUid);
    }
  }
}
```

---

## 2. 파일 구조

기존 모듈식 구조(engine/, data/, styles/) 유지. 모놀리식 index.html 재작성 금지.

### 신규 파일 (5개)

```
engine/chat-config.js        firebaseConfig를 export만 하는 단순 모듈
engine/chat-core.js          Firebase 초기화, 익명 인증, 페어링, 메시지 송수신
engine/chat-ui.js            채팅 모달 UI 렌더링, 입력창, 메시지 리스트
engine/chat-bindings.js      메인 메뉴 진입 버튼 + 안 읽은 뱃지 + 모달 열기/닫기
styles/chat.css              카톡 스타일 (말풍선, 진입 버튼, 모달, 입력창)
```

### 수정 파일 (1개)

```
index.html                   chat.css link 추가, chat-bindings.js를 type="module"로 import 추가
                             기존 게임 코드/모듈에는 영향 주지 않을 것
```

---

## 3. Firestore 데이터 모델

### 3-1. 페어링 코드 (TTL 5분)

```
/pairing_codes/{6자리숫자코드}
  parentUid: string
  parentName: string         (부모가 설정한 호칭, 기본 "아빠")
  expiresAt: Timestamp       (생성 + 5분)
```

### 3-2. 페어 (1쌍의 부모-자녀 관계)

```
/pairs/{auto-id}
  parentUid: string
  childUid: string
  parentName: string         (기본 "아빠")
  childName: string          (기본 "하루")
  createdAt: serverTimestamp
  lastActivityAt: serverTimestamp
```

### 3-3. 메시지

```
/pairs/{pairId}/messages/{auto-id}
  senderRole: "parent" | "child"
  type: "text"               (Phase 1만; Phase 2에서 "voice" 추가)
  text: string
  createdAt: serverTimestamp
  readByOther: boolean       (Phase 1은 필드만 false로 만들고, Phase 3에서 활용)
```

---

## 4. 인증 & 페어링 흐름

### 4-1. 인증

- Firebase **Anonymous Auth** 사용
- 앱 시작 시 `signInAnonymously` 자동 호출 (`onAuthStateChanged`로 user 획득)
- UID는 디바이스 종속 (브라우저 캐시 삭제 시 새 UID 발급 → 재페어링 필요)

### 4-2. 부모 측 페어링 흐름

1. 채팅 진입 → 역할 미선택 상태면 "역할 선택" 화면 → **"내가 부모"** 클릭
2. "페어링 코드 만들기" 버튼 → 6자리 랜덤 숫자 생성 (`100000~999999`)
3. `/pairing_codes/{code}` 문서 생성 (parentUid, parentName, expiresAt = now+5min)
4. 화면에 코드 큰 글씨로 표시 + "5분 안에 자녀 기기에서 입력하세요" 안내
5. 2초 간격으로 `pairs` 컬렉션에서 `where('parentUid', '==', myUid)` 폴링
6. 자녀가 페어링하면 새 pair 문서 감지 → `pairId` 저장 → 메시지 구독 시작 → 채팅 화면 전환
7. `/pairing_codes/{code}` 삭제 (정리)
8. 5분 후 자동 폴링 종료 (`setTimeout`으로 cleanup)

### 4-3. 자녀 측 페어링 흐름

1. 채팅 진입 → 역할 선택 → **"내가 자녀(하루)"** 클릭
2. 페어링 코드 입력칸 (6자리 숫자 입력) + "확인" 버튼
3. `/pairing_codes/{code}` 조회
   - 없으면 "코드를 찾을 수 없습니다" 에러
   - `expiresAt < now`이면 "코드가 만료되었습니다" 에러
4. `/pairs/{auto-id}` 새 문서 생성 (parentUid는 코드 doc에서, childUid는 본인, 호칭 포함)
5. `/pairing_codes/{code}` 삭제
6. `pairId`를 localStorage에 저장 → 메시지 구독 시작 → 채팅 화면 전환

### 4-4. 재실행 시

- localStorage에 `haruchat_pair_id`, `haruchat_role` 있으면 자동 복원
- pair 문서 로드해서 호칭(`parentName`, `childName`) 동기화
- 메시지 구독 자동 시작
- pair 문서가 사라진 경우(상대가 재페어링) → 페어링 초기화 후 역할 선택 화면

---

## 5. localStorage 키

```
haruchat_role         "parent" | "child"
haruchat_pair_id      pair 문서 ID
haruchat_parent_name  "아빠" (기본, 변경 가능)
haruchat_child_name   "하루" (기본, 변경 가능)
```

---

## 6. UI 사양

### 6-1. 진입점 (메인 메뉴)

- 기존 하루게임 메인 화면 우상단에 **"💬"** 채팅 버튼 추가
- 안 읽은 메시지 있으면 빨간 원형 뱃지 (숫자 표시, 99+ 처리)
- 버튼 크기: 자녀 안드로이드 태블릿 기준 충분히 크게 (44x44px 이상)
- chat-bindings.js가 메인 메뉴 영역에 자동 삽입 (index.html 구조에 큰 변경 없게)

### 6-2. 채팅 모달 (풀스크린)

레이아웃:
```
┌──────────────────────────────────┐
│ 상단 바: [← 닫기] [상대방 호칭] [⚙ 설정] │
├──────────────────────────────────┤
│                                  │
│   메시지 리스트 (스크롤)              │
│   - 본인 메시지: 우측 노란 말풍선        │
│   - 상대방 메시지: 좌측 흰 말풍선        │
│   - 시간 (HH:MM, 같은 분 연속이면 1회)  │
│                                  │
├──────────────────────────────────┤
│ [텍스트 입력창...........] [전송]    │
└──────────────────────────────────┘
```

- 새 메시지 도착 시 자동 스크롤 맨 아래로
- 모달 열 때 `markAllAsRead` 호출 (안 읽은 메시지 readByOther=true로)
- Enter 키 = 전송 (Shift+Enter는 줄바꿈)

### 6-3. 역할 선택 화면 (첫 실행 시)

- 큰 버튼 두 개: "내가 부모" / "내가 자녀(하루)"
- 한 번 선택하면 localStorage에 저장, 다음부터 안 나옴
- 변경하려면 설정에서 "페어링 초기화" 호출

### 6-4. 페어링 화면

부모:
- "페어링 코드 만들기" 버튼 → 클릭 시 6자리 코드 큼직하게 표시
- "5분 안에 자녀 기기에서 입력하세요" 안내
- 자녀가 입력하면 자동으로 채팅 화면 전환

자녀:
- 6자리 입력칸 (큰 폰트, 숫자 키패드 모드: `inputmode="numeric"`)
- 확인 버튼
- 에러 메시지 표시 영역

### 6-5. 설정 화면 (모달 안 ⚙ 메뉴)

- 호칭 변경 (parentName, childName) — 즉시 localStorage + Firestore pair 문서 동기화
- 페어링 초기화 버튼 (확인 다이얼로그 후 실행)

### 6-6. 터치 영역·가독성 강화

- 입력창 폰트 18px 이상
- 메시지 말풍선 폰트 16px 이상
- 전송 버튼 눈에 띄는 색상 + 충분한 크기
- 명확한 아이콘 + 한글 라벨 병기

---

## 7. Firebase SDK

- 버전: **10.14.0** (안정 LTS-class)
- 방식: ES Module CDN import
- import 베이스 URL: `https://www.gstatic.com/firebasejs/10.14.0/`
- 필요 모듈: `firebase-app.js`, `firebase-auth.js`, `firebase-firestore.js`

예시:
```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, collection, doc, ... } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
```

---

## 8. chat-core.js 주요 export (Public API)

UI 모듈이 사용할 함수/객체:

```
ChatState                상태 객체 (user, role, pairId, parentName, childName,
                                    messages, unreadCount, isReady, 콜백 등)
initChat()               앱 시작 시 1회 호출. 익명 로그인 + localStorage 복원
setRole(role)            "parent" | "child"
setNames({parentName, childName})  호칭 변경 (localStorage + pair doc 동기화)
generatePairingCode()    부모용. 6자리 코드 반환. 자녀 페어링 자동 감지 시작.
pairWithCode(code)       자녀용. 코드로 페어링 완료.
sendMessage(text)        텍스트 메시지 전송
markAllAsRead()          상대방 메시지 readByOther=true로 (모달 열 때 호출)
resetPairing()           페어링 정보 삭제 (재페어링용)
```

ChatState 콜백 (UI가 등록):
```
ChatState.onMessagesUpdate(messages)
ChatState.onUnreadUpdate(count)
ChatState.onPairingComplete()
```

디버그 (브라우저 콘솔용):
```
window.__chatDebug()     현재 상태 dump
window.__chatReset()     페어링 초기화
```

---

## 9. 작업 순서 (Claude Code 진행 가이드)

1. `engine/chat-config.js` 작성 — firebaseConfig export만
2. `engine/chat-core.js` 작성 — 위 8번 Public API 모두 구현
3. `styles/chat.css` 작성 — 진입 버튼, 뱃지, 모달, 말풍선, 입력창
4. `engine/chat-ui.js` 작성 — 모달 렌더링, 메시지 리스트, 입력창, 역할/페어링 화면, 설정
5. `engine/chat-bindings.js` 작성 — 메인 메뉴 진입 버튼 자동 삽입, 모달 열기/닫기, ChatState 콜백 등록
6. `index.html` 수정 — `<link rel="stylesheet" href="styles/chat.css">` 추가, `<script type="module" src="engine/chat-bindings.js"></script>` 추가
7. 브라우저 검증 (아래 10번 항목)
8. 한 번에 commit + push

---

## 10. 검증 방법

### 10-1. 콘솔 검증
브라우저 DevTools 콘솔에서:
```javascript
window.__chatDebug()
// → {uid, role, pairId, parentName, childName, messageCount, unreadCount, isReady}
```
- `isReady === true`이면 익명 로그인 OK
- `uid`가 채워져 있어야 함
- 콘솔 에러 0건

### 10-2. 페어링 테스트 (한 PC에서 두 브라우저로)

1. Chrome 일반 창 → 하루게임 → 채팅 → "내가 부모" → 코드 발급 (예: 482917)
2. Chrome 시크릿 창 → 하루게임 → 채팅 → "내가 자녀" → 482917 입력
3. 양쪽 화면 모두 채팅 화면으로 자동 전환되는지
4. 한쪽에서 "안녕" 입력 → 다른쪽에 즉시 표시되는지 (실시간)
5. 모달 닫고 게임 화면으로 복귀 → 새 메시지 받으면 진입 버튼 뱃지 카운트 증가 확인

### 10-3. 새로고침 테스트
- 페어링 후 페이지 새로고침 → 채팅 모달 다시 열면 메시지 그대로 보이는지 (localStorage 복원 OK)

---

## 11. Git 작업

모든 파일 완료 + 검증 통과 후 한 번에:

```bash
git add engine/chat-config.js engine/chat-core.js engine/chat-ui.js engine/chat-bindings.js styles/chat.css index.html
git commit -m "feat(chat): add Phase 1 parent-child chat (text + pairing, Firebase)"
git push origin main
```

GitHub Pages 자동 배포 후 실제 도메인에서 동작 확인.

---

## 12. Phase 1 범위 외 (작업하지 말 것)

- 음성 메시지 (녹음/재생/Storage 업로드) → Phase 2
- 30일 자동 삭제 → Phase 2 (음성 도입 시)
- 온라인 상태(presence), 타이핑 표시 → Phase 3
- 읽음 확인 시각적 표시 → Phase 3 (필드는 Phase 1에서 만들어둠)
- in-app 알림음/토스트 → Phase 3
- PWA 매니페스트, Service Worker, FCM 푸시 → Phase 4
- 사진/스티커 → Phase 5

---

## 13. 주의사항

- 보안 규칙은 이미 게시됨. 코드에서 보안 규칙 동작과 다른 행동 하면 거부됨.
  - 예: 자녀가 pair 문서를 `create`하려고 시도하면 거부됨 → 자녀는 본인이 멤버인 pair만 가능
  - 실제 흐름: 자녀가 페어링 시 새 pair 생성하는데, 보안 규칙은 `request.auth.uid == request.resource.data.parentUid`만 create 허용. **이거 충돌남.**
  - 해결: 보안 규칙의 `pairs/{pairId}` create 조건을 다음 중 하나로 완화 필요:
    - `request.resource.data.childUid == request.auth.uid` 도 허용
    - 또는 `request.auth != null && (request.auth.uid == request.resource.data.parentUid || request.auth.uid == request.resource.data.childUid)`
  - **Claude Code는 이 점을 명시적으로 사용자에게 알리고, 새 보안 규칙을 출력해서 사용자가 Firebase 콘솔에 게시하도록 안내할 것.**

- Firebase SDK는 ES Module CDN 사용. 기존 하루게임의 다른 모듈과 import 방식 일치.
- 채팅 모듈은 게임 코드와 완전히 독립. 기존 engine/* 파일을 수정하지 말 것.
- index.html은 최소 변경 (link 1줄 + script 1줄 추가).
