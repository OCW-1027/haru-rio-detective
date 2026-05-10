# 하루게임 채팅 — 자동 스크롤 fix (Bundle F)

## 0. 컨텍스트

| 단계 | 상태 |
|---|---|
| Bundle E (PWA Install 강화) | (작업 중 또는 보류) |
| **Bundle F (자동 스크롤 fix)** | **이번 — 우선순위 1** |

⚠️ **자녀 사용 전 반드시 fix 필요**. 채팅이 쌓이면 새 메시지가 안 보여서 사용 불가능.

작업 폴더: `C:\Users\taise\Projects\harugame`

---

## 1. 문제 재현

### 증상

- PWA로 ハルゲーム 채팅 사용 중
- 메시지 송수신 진행되며 메시지 누적
- **스크롤이 위로 올라간 채로 새 메시지가 와도 자동으로 맨 아래로 내려가지 않음**
- 사용자가 직접 손가락으로 스크롤 내려야 최신 메시지 확인 가능
- 휴대폰 검증에서 14:21 메시지가 맨 위에 보이고 14:25 메시지가 아래쪽에 있음 → 즉, 스크롤이 옛날 위치에 멈춰있음

### 영향

- **사용 불가 수준의 UX 문제**
- 자녀가 메시지 받아도 인지 못함 (시스템 알림은 보지만 앱 열면 옛날 메시지 위치)
- 카톡/라인 등 모든 채팅 앱의 기본 동작과 다름

---

## 2. 코드 분석

### 2-1. 현재 코드 (`engine/chat-ui.js`)

`renderMessages()` 함수 마지막에:

```javascript
requestAnimationFrame(() => { wrap.scrollTop = wrap.scrollHeight; });
```

**의도**: 메시지 렌더 후 다음 프레임에서 스크롤을 맨 아래로 이동

### 2-2. 동작 안 하는 원인 (가설)

#### 가설 A: scrollHeight 계산 시점 문제

`requestAnimationFrame` 한 번으로는 부족. 메시지 DOM이 layout되기 전에 scrollTop 설정되면 정확한 scrollHeight를 못 얻음.

**해결**: `requestAnimationFrame`을 두 번 중첩하거나, `setTimeout(0)` 사용.

#### 가설 B: 매번 무조건 스크롤 vs 사용자가 위로 올라간 상태 보존

현재 코드는 매번 무조건 맨 아래로 스크롤. 사용자가 옛날 메시지 보려고 위로 스크롤한 상태에서 새 메시지가 오면, 자동 스크롤이 사용자 의도를 무시하고 맨 아래로 끌고 감.

**올바른 동작 (카톡/라인 패턴)**:
- 사용자가 **이미 맨 아래 근처에 있을 때만** 자동 스크롤
- 위로 올라간 상태면 스크롤 위치 유지하고, 「↓ 새 메시지 N개」 버튼 표시
- 사용자가 그 버튼 누르거나 직접 내리면 최신으로

다만 이번 fix는 **항상 맨 아래로 스크롤**부터 먼저 보장. 「↓ 새 메시지」 버튼은 후속 개선.

#### 가설 C: 휴대폰 PWA 풀스크린의 viewport 차이

PC 브라우저와 달리 PWA standalone 모드는:
- 주소바·툴바 없음 → viewport 다름
- 안드로이드 키보드가 올라오면 viewport 동적 변화
- iOS Safari의 visual viewport와 다른 동작

→ 스크롤 컨테이너의 실제 높이가 동적으로 바뀜.

### 2-3. CSS 측면 가능성

`.chat-messages` 또는 `.chat-body`의 `overflow-y: scroll` / `auto` 설정이 정확한지, `flex` 레이아웃에서 스크롤 영역이 제대로 잡히는지 확인 필요.

---

## 3. 수정 방향

### 3-1. 핵심 수정 (다중 strategy)

`engine/chat-ui.js`의 `renderMessages()` 마지막 부분을 다음으로 교체:

```javascript
function scrollToBottom() {
  const wrap = document.getElementById('chatMessages');
  if (!wrap) return;
  
  // Strategy: requestAnimationFrame 중첩 + setTimeout fallback
  // 메시지 DOM이 layout된 후 정확한 scrollHeight를 얻기 위함
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wrap.scrollTop = wrap.scrollHeight;
      // Safety net: 일부 PWA에서 첫 RAF 후에도 layout 미완료 가능
      setTimeout(() => {
        wrap.scrollTop = wrap.scrollHeight;
      }, 50);
    });
  });
}
```

호출:
```javascript
function renderMessages() {
  // ... 기존 메시지 렌더 코드 ...
  scrollToBottom();
}
```

### 3-2. 새 메시지 도착 시 보장

`onMessagesUpdate` 콜백에서도 명시적 스크롤:

```javascript
ChatState.onMessagesUpdate = () => {
  if (currentView === 'chat') {
    renderMessages();
    // 새 메시지 도착 시 추가 스크롤 보장 (특히 PWA 풀스크린)
    scrollToBottom();
  }
};
```

### 3-3. 채팅 화면 진입 시 즉시 스크롤

`switchView('chat')` 직후에도 `scrollToBottom()` 호출.

채팅 모달 열고 채팅 화면 진입 시 → 이전 누적 메시지의 맨 아래로 즉시 이동.

### 3-4. 윈도우 리사이즈·키보드 대응 (선택, 보조)

키보드 올라올 때 viewport 변화에 대응:

```javascript
window.addEventListener('resize', () => {
  if (currentView === 'chat') scrollToBottom();
});

// Visual Viewport API (iOS Safari + 모던 안드로이드 Chrome)
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    if (currentView === 'chat') scrollToBottom();
  });
}
```

### 3-5. CSS 보강 (필요 시)

`styles/chat.css`의 `.chat-messages` 확인:

```css
.chat-messages {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;  /* iOS 부드러운 스크롤 */
  scroll-behavior: auto;  /* smooth 아닌 instant — 새 메시지 즉시 보이게 */
  min-height: 0;  /* flex 컨테이너에서 overflow 제대로 동작하기 위함 */
}
```

`flex` 컨테이너에서 `min-height: 0`은 자주 빠뜨리는 핵심. 이게 없으면 자식 요소의 overflow가 부모 크기를 무한 확장시킴.

---

## 4. 변경 파일

```
engine/chat-ui.js           scrollToBottom 헬퍼 + 호출 지점 보강
styles/chat.css             .chat-messages 보강 (필요 시)
```

신규 파일: 0개.

명세 문서:
```
CHAT_BUNDLE_F_AUTOSCROLL_FIX_SPEC.md   (이 문서, 신규 추가)
```

---

## 5. 검증

### 5-1. 새 메시지 자동 스크롤

1. 양쪽 디바이스 페어링 + 채팅 진입
2. **20개 이상 메시지 누적**시키기 (충분히 화면 넘기는 양)
3. **PC** 또는 **휴대폰** 한쪽에서 메시지 보내기
4. **다른 쪽**에서 자동으로 맨 아래로 스크롤되어 새 메시지 보이는지 확인 ✅

### 5-2. 채팅 진입 시 즉시 스크롤

1. 메시지 누적된 상태로 채팅 모달 닫기
2. 채팅 모달 다시 열기
3. **채팅 화면 진입 즉시 맨 아래 메시지가 보임** ✅

### 5-3. 휴대폰 키보드 대응

1. 휴대폰에서 입력창 클릭 → 키보드 올라옴
2. 키보드가 viewport를 잡아먹어도 **마지막 메시지가 입력창 바로 위에 보임** ✅
3. 키보드 내려도 스크롤 위치 자연스러움

### 5-4. 회귀

- 메시지 정렬 시간 순서 유지 (위→아래 오래된→최신)
- 이모지·멀티라인·긴 메시지 모두 정상 렌더
- 읽음 「1」 뱃지 정상
- typing indicator 정상
- presence 표시 정상

---

## 6. Git 작업

```bash
git add engine/chat-ui.js styles/chat.css \
        CHAT_BUNDLE_F_AUTOSCROLL_FIX_SPEC.md
git commit -m "fix(chat): auto-scroll to bottom on new messages

Bug: When messages accumulated beyond viewport height, new incoming
messages did not auto-scroll to bottom. User had to manually scroll
down each time. Critical UX issue making chat unusable in PWA mode.

Root cause: single requestAnimationFrame was insufficient — message
DOM layout was incomplete when scrollTop was set. PWA standalone mode
on Android exacerbates this due to dynamic viewport from keyboard.

Fix:
- Extracted scrollToBottom() helper with double-RAF + setTimeout fallback
- Called from renderMessages, onMessagesUpdate, and chat view entry
- Added window.resize and visualViewport.resize listeners for keyboard
- CSS: .chat-messages min-height:0 for proper flex overflow,
  -webkit-overflow-scrolling:touch for iOS smooth scroll

Verification: messages render in correct order (oldest top, newest
bottom), new messages auto-scroll into view, chat entry shows latest
message immediately."
git push origin main
```

---

## 7. 후속 개선 (Bundle G 후보, 5/15 이후)

이번 fix는 **항상 맨 아래로 스크롤**. 다만 카톡 스타일의 더 정교한 동작을 원하면:

1. 사용자가 위로 스크롤한 상태 감지 (`scrollTop + clientHeight < scrollHeight - 100`)
2. 위로 올라간 상태면 → 자동 스크롤 X, 「↓ 새 메시지 N개」 floating button 표시
3. button 클릭 시 맨 아래로 이동 + button 사라짐
4. 사용자가 직접 맨 아래로 스크롤하면 button 자동 사라짐

이번에는 **기본 동작 보장**이 우선 (Bundle F). 정교한 UX는 자녀 사용 1~2주 후 필요하면 Bundle G로.

---

## 8. 비고

### 8-1. 다른 버그 발견 시

검증 중 추가 버그 발견되면 별도 명세로 정리. 예:
- 키보드 올라올 때 입력창 가려짐
- 메시지 길이 너무 길 때 줄바꿈 이상
- 이모지 패널 열린 채로 메시지 송신 시 에러

### 8-2. Bundle E (PWA Install)와의 관계

Bundle E는 별개 작업. 둘 다 진행하면:
- Bundle F 먼저 (UX 버그, 우선순위 높음)
- Bundle E 나중 (PWA 설치 강화, 푸시 가능성 향상)

또는 동시 진행도 OK. 둘 다 commit 분리.
