# 하루게임 채팅 — 앱 시작 race condition fix (Bundle G)

## 0. 컨텍스트

| 단계 | 상태 | commit |
|---|---|---|
| Bundle A~D | ✅ | |
| Bundle F (자동 스크롤) | ✅ | `b8f748a` |
| Bundle E (PWA Install) | ✅ | `ddd31d4` |
| **Bundle G (앱 시작 race condition fix)** | **이번** | — |

작업 폴더: `C:\Users\taise\Projects\harugame`

---

## 1. 문제 재현

### 증상

1. PWA 또는 사이트를 새로 시작 (PC 재시작 후 또는 앱 새로 실행)
2. 채팅 버튼(💬)을 빨리 클릭
3. 채팅 모달에 **「読み込み中… Firebase에 接続中です。少々お待ちください。」** 표시
4. **그 화면에서 영원히 멈춤** (자동으로 다음 화면으로 안 넘어감)
5. 사용자가 모달 닫고 다시 채팅 버튼 누르면 → 정상 동작

### 영향

- 사용자가 「채팅 안 되네?」 라고 오해할 수 있음
- 자녀가 5/15 첫 페어링 시 이 버그 만나면 혼란
- 일상 사용에는 큰 지장 없음 (한 번 닫고 다시 열면 됨)

---

## 2. 원인 분석

### 2-1. 코드 위치

`engine/chat-ui.js`의 `openChatModal()` 함수:

```javascript
export function openChatModal() {
  ensureModal();
  modalEl.classList.remove('chat-hidden');
  setPresenceModalOpen(true);
  if (!ChatState.isReady) {
    switchView('loading');
    return;  // ⚠️ 여기서 끝나버림 — 이후 isReady가 true가 되어도 자동 전환 X
  }
  // ... 정상 진입 로직 (role-select / pairing / chat)
}
```

### 2-2. 동작 흐름 (현재)

1. 앱 시작 → `chat-bindings.js`의 `initChat()` 비동기 시작
2. Firebase 익명 인증 → Firestore 연결 → ~3~5초 소요
3. 사용자가 그 사이에 **빠르게** 💬 버튼 클릭
4. `openChatModal()` 호출 시 `ChatState.isReady = false`
5. → `switchView('loading')` 후 함수 종료
6. 약 1~2초 후 `isReady = true` 됨 + `onAuthReady` 콜백 호출
7. **하지만** 현재 코드는 `onAuthReady`에서 modal 상태를 체크하지 않음
8. → 사용자 화면은 그대로 「読み込み中…」 표시

### 2-3. 자연 회복 동작

사용자가 모달을 닫고 다시 열면:
- 두 번째 `openChatModal()` 호출 시 `ChatState.isReady = true`
- → `if (!ChatState.isReady)` 분기 통과
- → 정상 뷰로 진입

---

## 3. 수정 방향

### 3-1. 핵심 fix

`engine/chat-ui.js`에 `ChatState.onAuthReady` 콜백 추가:

```javascript
// chat-ui.js (파일 끝부분, 다른 콜백 등록 옆)
ChatState.onAuthReady = () => {
  // 모달이 열려있고 loading 뷰면 → 적절한 뷰로 자동 전환
  if (!modalEl) return;
  if (modalEl.classList.contains('chat-hidden')) return;
  if (currentView !== 'loading') return;
  
  // 다음 적절한 뷰 결정
  if (ChatState.pairId) {
    // 페어링 완료된 상태 → 채팅 뷰
    switchView('chat');
  } else if (ChatState.role === 'parent') {
    // 부모 역할 선택됨, 페어링 X → 부모 페어링 뷰
    switchView('pairing-parent');
  } else if (ChatState.role === 'child') {
    // 자녀 역할 선택됨, 페어링 X → 자녀 페어링 뷰
    switchView('pairing-child');
  } else {
    // 역할 선택 X → 역할 선택 뷰
    switchView('role-select');
  }
};
```

### 3-2. ⚠️ 주의 — 기존 다른 콜백과 충돌 방지

`chat-core.js` 또는 `chat-bindings.js`에서 이미 `ChatState.onAuthReady`를 사용하는 곳이 있는지 확인.

만약 이미 등록되어 있다면:
- 기존 콜백 보존
- 새 콜백을 합쳐서 등록

```javascript
// 안전 패턴 (기존 콜백 보존)
const _existingOnAuthReady = ChatState.onAuthReady;
ChatState.onAuthReady = () => {
  if (typeof _existingOnAuthReady === 'function') {
    try { _existingOnAuthReady(); } catch (e) {}
  }
  // 새 로직: loading 뷰면 자동 전환
  // ... (위 코드)
};
```

### 3-3. 추가 안전장치 — loading 뷰에 텍스트 개선 (선택)

현재 「読み込み中… Firebase에 接続中です」 메시지를 좀 더 명확하게:

```html
<div class="chat-role-select">
  <h2>読み込み中…</h2>
  <p>Firebase に接続中です。少々お待ちください。</p>
  <p style="font-size: 12px; color: #888; margin-top: 16px;">
    自動的に切り替わります
  </p>
</div>
```

「자동으로 전환됩니다」 안내 추가하면 사용자 안심.

### 3-4. (옵션) 채팅 버튼 비활성화

`isReady = false` 동안 💬 버튼 자체를 비활성화하는 방법도 있음. 하지만 다음 이유로 비추:
- 버튼 비활성화는 추가 코드 필요 (chat-bindings.js 수정)
- 위 fix만으로 충분
- 자녀가 「버튼이 회색이라 못 누르네?」 라고 더 혼란

---

## 4. 변경 파일

```
engine/chat-ui.js   ChatState.onAuthReady 콜백 추가 (loading 뷰 자동 전환)
```

신규 파일: 0개. 다른 파일 변경 X.

명세 문서:
```
CHAT_BUNDLE_G_RACECOND_FIX_SPEC.md   (이 문서, 신규 추가)
```

---

## 5. 검증

### 5-1. 기본 race condition 시나리오

1. PC 또는 휴대폰에서 ハルゲーム 완전 종료
2. 다시 시작 (PWA 아이콘 또는 사이트 접속)
3. **즉시** 💬 채팅 버튼 클릭 (1초 이내)
4. → 「読み込み中…」 잠시 표시
5. → **자동으로** 다음 적절한 뷰로 전환 ✅
   - 페어링 완료된 상태면 → 채팅 화면
   - 미페어링이고 부모면 → 부모 페어링 화면
   - 역할 미선택이면 → 역할 선택 화면

### 5-2. 정상 케이스 (회귀)

1. 앱 시작 후 충분히 기다림 (3~5초)
2. 💬 채팅 버튼 클릭
3. → 즉시 적절한 뷰 표시 (loading 화면 거의 안 보임)

### 5-3. 회귀 — 다른 기능 영향 없음

- 페어링·메시지·이모지·typing·읽음·푸시 모두 정상

---

## 6. Git 작업

```bash
git add engine/chat-ui.js CHAT_BUNDLE_G_RACECOND_FIX_SPEC.md
git commit -m "fix(chat): auto-transition from loading view when auth becomes ready

Bug: When users opened the chat modal immediately after app start
(before Firebase auth completed), they saw the '読み込み中…' loading
view but it never auto-transitioned. They had to close and reopen
the modal manually.

Root cause: openChatModal() handled the !isReady case by showing
loading view and returning. But the onAuthReady callback in chat-ui
never checked if the modal was still showing the loading view.

Fix: Added ChatState.onAuthReady callback in chat-ui that detects
'modal open + currentView === loading' state and auto-transitions
to the appropriate next view (chat / pairing-parent / pairing-child
/ role-select) based on current state.

Preserved any existing onAuthReady callback to prevent regression."
git push origin main
```

---

## 7. 우선순위 평가

이 fix는 **사용 가능 수준의 버그**이지만:

- 한 번 닫고 다시 열면 정상 → 일상 사용에 큰 지장 없음
- 5/15 자녀 첫 페어링 시 이 버그 만날 가능성 있음 → 자녀 혼란 방지 위해 fix 권장
- 작업 시간 짧음 (10~20분)

→ Bundle G로 분리해서 진행하되, 만약 다른 우선순위 작업 있으면 미뤄도 OK.

---

## 8. 후속 (Bundle H 후보, 5/15 이후)

이번 fix와는 별개로 향후 가능한 개선:

- 채팅 모달 OFF 상태에서 새 메시지 도착 시 메인 화면 채팅 아이콘 깜빡임 강화
- 자녀가 못 본 메시지 누적 카운트 표시
- 메시지 검색 기능
- 채팅 히스토리 30일 자동 정리

이번에는 race condition 1건만 fix.
