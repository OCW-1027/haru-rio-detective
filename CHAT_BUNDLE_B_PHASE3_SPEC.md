# 하루게임 채팅 — Bundle B (Phase 3): presence·타이핑·읽음·in-app 알림

## 0. 컨텍스트

| 단계 | 상태 | commit |
|---|---|---|
| Phase 1 (텍스트 + 페어링) | ✅ | `77458a2` |
| Bundle A (i18n + 이모지) | ✅ | `35b43aa` |
| 영어 학습 탭 + ASD 정정 | ✅ | (직전 commit) |
| **Bundle B (Phase 3)** | **이번** | — |
| Bundle C (Phase 4: PWA + FCM) | 다음 | — |

이번 작업은 **Firestore만 사용** — Spark 무료 플랜 그대로, Blaze 업그레이드 불필요.

작업 폴더: `C:\Users\taise\Projects\harugame`  
브랜치: `main`

---

## 1. 작업 범위

4가지 기능 추가:

1. **Presence (온라인/오프라인 상태)** — 상대방이 지금 채팅 보고 있는지
2. **Typing indicator (입력 중 표시)** — 상대방이 메시지 작성 중
3. **읽음 표시 (Read receipt)** — 본인 메시지에 "1" 뱃지 (안 읽음 표시), 읽으면 사라짐
4. **In-app 알림 (소리 + 토스트)** — 새 메시지 도착 시 (Web Audio + 화면 토스트)

시스템 알림(Notification API)·푸시는 **Phase 4 (PWA + FCM)**에서. 이번에는 **앱 내 알림만**.

---

## 2. Firestore 데이터 추가

### 2-1. 신규 서브컬렉션: presence

```
/pairs/{pairId}/presence/{role}    role = "parent" | "child"

필드:
  online: boolean              현재 채팅 모달 열고 있는지
  lastSeen: serverTimestamp    마지막 활동 시각
  typing: boolean              메시지 입력 중
```

각 역할마다 1 문서. 본인 역할 문서만 쓰기 가능, 페어링 멤버는 양쪽 읽기.

### 2-2. 기존 필드 활용 (메시지)

`/pairs/{pairId}/messages/{msgId}.readByOther` (이미 Phase 1에서 필드 만들어둠)

`markAllAsRead()` 함수도 이미 구현됨 (모달 열 때 호출). 이번에는 **시각 표시(UI)만 추가**.

---

## 3. 보안 규칙 업데이트 (사용자가 콘솔에 게시)

presence 서브컬렉션 규칙 추가. 기존 규칙은 그대로 유지.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // 기존: pairing_codes (변경 없음)
    match /pairing_codes/{code} {
      allow read, write: if request.auth != null;
    }

    // 기존: pairs (변경 없음)
    match /pairs/{pairId} {
      allow read, update: if request.auth != null
        && (request.auth.uid == resource.data.parentUid
            || request.auth.uid == resource.data.childUid);
      allow create: if request.auth != null
        && (request.auth.uid == request.resource.data.parentUid
            || request.auth.uid == request.resource.data.childUid);
    }

    // 기존: messages (변경 없음)
    match /pairs/{pairId}/messages/{msgId} {
      allow read, create, update: if request.auth != null
        && (request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.parentUid
            || request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.childUid);
    }

    // 신규: presence
    match /pairs/{pairId}/presence/{role} {
      allow read: if request.auth != null
        && (request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.parentUid
            || request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.childUid);
      allow write: if request.auth != null
        && (
          (role == "parent" && request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.parentUid)
          || (role == "child" && request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.childUid)
        );
    }
  }
}
```

→ Claude Code가 작업 후 이 규칙을 코드 블록으로 다시 출력해주면, 사용자가 Firebase 콘솔에 게시.

---

## 4. Presence 사양

### 4-1. 본인 상태 갱신

| 트리거 | 동작 |
|---|---|
| 채팅 모달 열림 (chat 뷰 진입) | `online: true`, `lastSeen: serverTimestamp` |
| 채팅 모달 닫힘 | `online: false`, `lastSeen: serverTimestamp` |
| `visibilitychange → hidden` | `online: false` (모달 열려있을 때만) |
| `visibilitychange → visible` | `online: true` (모달 열려있을 때만) |
| `beforeunload` | `online: false` (best effort, 동기 try) |
| 30초마다 heartbeat (모달 열린 동안) | `lastSeen` 갱신 |

### 4-2. 상대방 상태 구독

- `onSnapshot` 으로 `/pairs/{pairId}/presence/{otherRole}` 구독
- 채팅 모달 열린 동안만 구독, 닫히면 unsubscribe

### 4-3. 표시 (채팅 화면 상단 바)

상대 이름 옆에:

| 상태 | 표시 |
|---|---|
| `online: true` | 🟢 オンライン |
| `online: false`, `lastSeen` 1분 이내 | ⚪ さっきまで オンライン |
| `lastSeen` 1시간 이내 | ⚪ {N}分前 |
| `lastSeen` 1일 이내 | ⚪ {N}時間前 |
| `lastSeen` 1일 초과 | ⚪ {YYYY-MM-DD} |
| presence 문서 없음 | (표시 안 함, 처음 사용자) |

폰트 14px, 회색 (#666). 상대 이름 아래 한 줄 작게.

---

## 5. Typing indicator 사양

### 5-1. 본인 상태 쓰기

입력창 `input` 이벤트에 디바운스:

- 입력창에 텍스트 있고 typing: false 상태면 → `typing: true` 쓰기
- 입력 후 3초간 추가 입력 없으면 → `typing: false` 쓰기
- 전송 버튼 클릭 또는 Enter → 즉시 `typing: false`
- 입력창이 비어있으면 → 즉시 `typing: false`
- 모달 닫힘 → `typing: false`

⚠️ Firestore 쓰기 비용 절약: typing 상태가 **변할 때만** 쓰기 (이미 true이면 추가 쓰기 안 함). 디바운스 + 상태 비교 필수.

### 5-2. 상대방 상태 표시

상대방 `typing: true` 일 때:

- 채팅 화면 하단 (입력창 위)에 작은 텍스트
- "**{상대 이름}が 入力中**…" + 점 3개 깜빡임 애니메이션
- 폰트 13px, 회색 (#888), 좌측 정렬, 상하 padding 4px
- `typing: false` 되면 즉시 사라짐

---

## 6. 읽음 표시 사양

### 6-1. 본인 메시지 옆 "1" 뱃지

- 본인이 보낸 메시지 (우측 노란 말풍선) 옆에:
  - `readByOther: false` → 작은 빨간 "1" 뱃지 표시
  - `readByOther: true` → 표시 안 함

### 6-2. 위치·스타일

- 말풍선 좌하단 (시간 옆) 또는 좌측에 작게
- 폰트 11px, bold
- 색상: #ff3b30 (빨강) 또는 #ff9500 (주황) — 둘 중 카톡과 비슷한 빨강
- 배경: 투명 (텍스트만)

```
                    [메시지 본문]   ← 노란 말풍선
                  1  20:17           ← "1" 빨강 + 시간 회색
```

### 6-3. 읽음 처리 (이미 구현됨)

- `markAllAsRead()` — Phase 1에서 이미 구현, 모달 열 때 자동 호출
- `onMessagesUpdate` 콜백 — Phase 1에서 이미 구현, 변경 시 자동 재렌더

이번 작업은 **렌더 함수에 "1" 표시 분기 추가**만.

---

## 7. In-app 알림 사양

### 7-1. 사운드 — Web Audio API "딩"

외부 파일 불필요. 코드로 합성:

```javascript
function playDing() {
  if (settings.muted) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime);          // 시작음
  osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.3);
}
```

부드러운 카톡 알림 비슷한 사운드 (880Hz → 660Hz, 300ms).

### 7-2. 토스트 (화면 우상단)

새 메시지 도착했고 **현재 사용자가 보지 않는 상태** 일 때:

```
┌─────────────────────────────┐
│ 💬 アバ                       │  ← 보낸 사람 이름
│ こんにちは！何してる？           │  ← 메시지 첫 50자
│                  3秒前        │
└─────────────────────────────┘
```

- 위치: 화면 우상단 (top: 80px, right: 16px)
- 너비: 320px
- 자동 닫힘: 4초 후 페이드아웃
- 클릭: 채팅 모달 자동 열기 (해당 메시지 위치로 스크롤)
- 좌상단 ✕ 버튼: 즉시 닫기
- 모바일 (~480px): 너비 92vw로 전체 화면 가까이

### 7-3. 알림 발화 조건

새 메시지가 도착했을 때 (`onSnapshot`에서 새 메시지 감지):

| 사용자 상태 | 사운드 | 토스트 |
|---|---|---|
| 채팅 모달 열려 있고 chat 뷰 활성 | ❌ | ❌ (이미 보고 있음) |
| 채팅 모달 열려 있지만 다른 뷰 (설정·페어링) | ✅ | ✅ |
| 채팅 모달 닫혀 있고 게임 화면 | ✅ | ✅ |
| `visibilitychange: hidden` (다른 탭) | ✅ | ❌ (보이지 않으니 의미 없음) |

본인이 보낸 메시지는 **항상 알림 안 함**.

### 7-4. 음소거 토글

설정 화면에 추가:
```
🔔 通知音
[오] [✓ ON]   [×]   [○ OFF]
```

- localStorage 키: `haruchat_muted` ("0" | "1")
- 기본값: "0" (사운드 ON)

---

## 8. UI 변경 (chat-ui.js)

### 8-1. 채팅 화면 상단 바 (presence 표시 추가)

기존:
```
[← 閉じる]    {상대 이름}    [⚙]
```

변경 후:
```
[← 閉じる]    {상대 이름}                [⚙]
              🟢 オンライン
```

### 8-2. 채팅 입력 영역 (typing 표시 추가)

기존 입력창 위에 새 영역:

```
┌──────────────────────────────────┐
│ パパが 入力中…                      │  ← 상대 typing 시만 표시
├──────────────────────────────────┤
│ [😀] [メッセージを入力…] [送信]      │
└──────────────────────────────────┘
```

### 8-3. 메시지 말풍선 (읽음 "1" 추가)

본인 메시지 (우측 노란):
```
                    [メッセージ本文]
                  1  20:17
```

상대방 메시지 (좌측 흰색): 변경 없음.

### 8-4. 설정 화면 (음소거 토글 추가)

기존:
- 親の呼び方 입력
- 子の呼び方 입력
- 呼び方を保存
- 戻る
- ペアリングをリセット

추가:
- 🔔 通知音 ON/OFF 토글

---

## 9. 변경 파일

신규: 0개

수정 (3개):
```
engine/chat-core.js     presence·typing·in-app 알림 로직
engine/chat-ui.js       presence·typing·읽음 표시·토스트 렌더, 설정 토글
styles/chat.css         새 클래스 (.chat-presence-/.chat-typing/.chat-read-badge/.chat-toast)
```

명세 문서:
```
CHAT_BUNDLE_B_PHASE3_SPEC.md   (이 문서, 신규 추가)
```

---

## 10. CSS 클래스 (chat.css 추가)

`.chat-` 프리픽스 유지:

```
.chat-presence-line       상단 바 상대 이름 아래 presence 표시
.chat-presence-online     🟢 색상
.chat-presence-offline    ⚪ 색상

.chat-typing-bar          입력창 위 typing 표시 컨테이너
.chat-typing-dots         점 3개 깜빡임 애니메이션 (@keyframes typing-dot)

.chat-read-badge          본인 메시지 옆 "1" 뱃지

.chat-toast               토스트 컨테이너 (fixed 우상단)
.chat-toast-header        보낸이 이름 영역
.chat-toast-body          메시지 미리보기
.chat-toast-time          시간
.chat-toast-close         ✕ 버튼

.chat-mute-toggle         설정 화면 음소거 토글
```

---

## 11. 검증

1. 보안 규칙 게시 후 (Firebase 콘솔)
2. 강제 새로고침 (Ctrl+Shift+R) 양쪽 창
3. 두 브라우저 창 (또는 PC + 폰)에서 페어링

### 11-1. Presence

- A창 채팅 모달 열기 → B창에서 "🟢 オンライン" 확인
- A창 모달 닫기 → B창에서 "さっきまで オンライン" 또는 "○分前"
- A창 다른 탭으로 이동 → B창 "オフライン" 또는 "○分前"

### 11-2. Typing

- A창 입력 시작 → B창 입력창 위에 "アバが 入力中…" 표시 (3초 내)
- A창 입력 멈춤 3초 → B창에서 표시 사라짐
- A창 전송 → B창에서 즉시 표시 사라짐 + 메시지 도착

### 11-3. 읽음

- A창에서 메시지 보냄 → A창 본인 말풍선 옆에 "1" 표시
- B창 모달 열기 → B창에 메시지 보임
- A창에서 자동으로 "1" 사라짐 (1~2초 내)

### 11-4. In-app 알림

- A창 모달 닫고 게임 화면
- B창에서 메시지 보냄
- A창에서 사운드 "딩" + 우상단 토스트 표시
- 토스트 클릭 → 모달 자동 열림 + 메시지 보임
- 토스트 4초 후 자동 사라짐
- 설정 → 通知音 OFF → B창에서 메시지 → A창 사운드 안 남 (토스트는 표시)

### 11-5. 회귀 확인

- 기존 채팅 송수신 정상
- 기존 영어 학습 탭·다른 시리즈 정상
- 콘솔 에러 0건
- Firestore 쓰기량 합리적 (입력 시 typing 폭주 없는지 — 디바운스 작동 확인)

---

## 12. Git 작업

```bash
git add engine/chat-core.js engine/chat-ui.js styles/chat.css \
        CHAT_BUNDLE_B_PHASE3_SPEC.md
git commit -m "feat(chat): Bundle B — presence + typing + read receipts + in-app notify

- New Firestore subcollection: /pairs/{pairId}/presence/{role}
  with online / lastSeen / typing fields
- Presence: 🟢 online / ⚪ N分前 in chat top bar
- Typing indicator: '相手が入力中…' below message list, debounced 3s
- Read receipt: red '1' badge on own messages until readByOther=true
- In-app notify: Web Audio 'ding' + corner toast (auto-dismiss 4s)
  - Sound off mute toggle in settings (haruchat_muted localStorage)
  - Skip when chat view already active
- No new files; chat-core.js/chat-ui.js/chat.css updated
- Firestore writes debounced (typing only on state change, presence
  with 30s heartbeat) to keep Spark plan well within free tier
- Firebase Security Rules updated for presence subcollection
  (printed separately for user to publish in Console)"
git push origin main
```

---

## 13. Firestore 비용 검토 (Spark 무료 플랜)

1쌍 가족 사용 가정:

| 동작 | 일일 쓰기 추정 |
|---|---|
| presence (모달 open/close 5회 × 2명 + 30s heartbeat) | ~120 |
| typing (메시지당 평균 2회 × 50메시지 × 2명) | ~200 |
| messages | ~50 |
| readByOther update | ~50 |
| **합계** | **~420 / day** |

Spark 무료 한도: **20,000 writes/day**. 사용량은 한도의 **2.1%**. 평생 무료 사용 가능.

읽기는 onSnapshot 실시간 구독이라 더 많지만, 50,000 reads/day 한도 대비 여전히 여유 충분.

---

## 14. Phase 4 예고 (다음 Bundle C)

Bundle B 완료 후 Bundle C는:
- PWA 설정 (manifest.json + Service Worker)
- 홈화면 아이콘 추가 (안드로이드 + iOS Safari 16.4+)
- FCM 푸시 알림 (백그라운드 알림)
- ⚠️ Blaze 업그레이드 필요 (Cloud Functions로 FCM 발송)

Bundle C 시작 시 별도 명세서 + Blaze 업그레이드 가이드 제공.
