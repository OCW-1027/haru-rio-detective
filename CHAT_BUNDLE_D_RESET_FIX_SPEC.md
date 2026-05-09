# 하루게임 채팅 — 페어링 리셋 버그 fix (Bundle D)

## 0. 컨텍스트

| 단계 | 상태 | commit |
|---|---|---|
| Phase 1 (텍스트 + 페어링) | ✅ | `77458a2` |
| Bundle A (i18n + 이모지) | ✅ | `35b43aa` |
| 영어 학습 탭 + ASD 정정 | ✅ | `b4fe0d9` |
| Bundle B (presence·typing·읽음·in-app 알림) | ✅ | `d1b8599` |
| Bundle C (PWA + FCM 푸시) | ✅ | `4430c52` |
| **Bundle D (페어링 리셋 버그 fix)** | **이번** | — |

작업 폴더: `C:\Users\taise\Projects\harugame`

---

## 1. 문제 재현 시나리오 (실제 발생 사례)

검증 중 **두 번** 발생한 동일 버그:

**시나리오**:
1. PC에서 부모 페어링 + 휴대폰에서 자녀 페어링 완료 (정상)
2. 사용자가 양쪽 디바이스 리셋 시도 (예: `localStorage.clear()` 또는 채팅의 「ペアリングをリセット」)
3. PC에서 「私は親(パパ)」 선택 → 「ペアリングコードを作る」 클릭
4. 6자리 코드 표시되지만 **즉시 사라지고 자동으로 옛날 채팅 화면으로 넘어감**
5. 휴대폰은 깨끗한 상태라 「コード入力」 화면이 정상 표시되지만, **PC가 새 코드를 만들지 못해 입력할 코드가 없음**
6. 결과: 페어링 영구 불가능 (수동으로 Firestore 콘솔에서 옛날 pair 삭제하기 전까지)

---

## 2. 근본 원인 분석

### 2-1. 코드 위치
`engine/chat-core.js`의 `watchForPairing()` 함수 (Phase 1 코드)

### 2-2. 문제 로직

부모가 코드 발급하면 다음 로직이 실행됨:

```javascript
// watchForPairing() 내부
pairPollInterval = setInterval(async () => {
  try {
    // ⚠️ 문제: parentUid로 검색해서 어떤 pair든 찾으면 자동 복원
    const q = query(collection(db, 'pairs'), where('parentUid', '==', ChatState.user.uid));
    const snap = await getDocs(q);
    if (!snap.empty) {
      // 가장 최근 pair 자동 선택
      let pairDoc = snap.docs[0];
      for (const d2 of snap.docs) {
        const a = pairDoc.data().createdAt?.toMillis?.() || 0;
        const b = d2.data().createdAt?.toMillis?.() || 0;
        if (b > a) pairDoc = d2;
      }
      // 자동으로 옛날 pair에 복원 → 새 코드 무효
      ChatState.pairId = pairDoc.id;
      // ... 채팅 화면 진입
    }
  } catch (e) { ... }
}, 2000);
```

**의도된 동작**: 자녀가 코드 입력하고 페어링 완료되면 부모 측이 폴링으로 감지 → 자동으로 채팅 진입

**실제 문제**: 부모의 익명 UID는 브라우저 캐시가 살아있는 한 동일하게 유지됨. 그래서 어제 만든 옛날 pair에도 같은 `parentUid`가 박혀있고, 폴링이 그걸 찾아서 자동 복원함.

### 2-3. 왜 두 번 다 발생했나
어제 첫 발생 시 사용자가 Firestore 콘솔에서 pair 삭제 + localStorage 클리어로 복구. 그러나 그 후 새로 만든 pair (오늘 검증용)가 또 Firestore에 살아있음. 오늘 다시 리셋하니 그 오늘 만든 pair에 자동 복원되는 패턴 반복.

---

## 3. 수정 방향

### 3-1. 핵심 원칙
**「ペアリングをリセット」 버튼**을 누르거나 **새 코드 발급**을 시도할 때, **Firestore의 옛날 pair도 함께 삭제**해야 함. 단순히 localStorage만 비우면 안 됨.

### 3-2. 두 가지 수정 (둘 다 필요)

#### 수정 A: `resetPairing()` 함수 강화

**현재 동작**: localStorage만 클리어
**수정 후**: localStorage 클리어 + Firestore의 본인 관련 pair 문서 + 하위 컬렉션 모두 삭제

```javascript
// engine/chat-core.js

export async function resetPairing() {
  // 1. 본인이 멤버인 모든 pair 문서 찾기
  const role = ChatState.role;
  const uid = ChatState.user?.uid;
  
  if (uid) {
    try {
      const field = role === 'parent' ? 'parentUid' : 'childUid';
      const q = query(collection(db, 'pairs'), where(field, '==', uid));
      const snap = await getDocs(q);
      
      // 2. 각 pair의 하위 컬렉션 삭제 후 본 문서 삭제
      for (const pairDoc of snap.docs) {
        const pairId = pairDoc.id;
        
        // messages 서브컬렉션 삭제 (배치)
        const msgSnap = await getDocs(collection(db, 'pairs', pairId, 'messages'));
        const msgBatch = writeBatch(db);
        msgSnap.docs.forEach(d => msgBatch.delete(d.ref));
        if (msgSnap.size > 0) await msgBatch.commit();
        
        // presence 서브컬렉션 삭제
        const presenceSnap = await getDocs(collection(db, 'pairs', pairId, 'presence'));
        const presenceBatch = writeBatch(db);
        presenceSnap.docs.forEach(d => presenceBatch.delete(d.ref));
        if (presenceSnap.size > 0) await presenceBatch.commit();
        
        // pair 본 문서 삭제
        await deleteDoc(doc(db, 'pairs', pairId));
      }
      
      // 3. 본인의 만료 안 된 pairing_code도 삭제
      const codeQ = query(collection(db, 'pairing_codes'), where('parentUid', '==', uid));
      const codeSnap = await getDocs(codeQ);
      for (const codeDoc of codeSnap.docs) {
        await deleteDoc(codeDoc.ref);
      }
    } catch (e) {
      console.error('[chat] reset firestore cleanup', e);
      // Firestore 정리 실패해도 로컬 정리는 진행
    }
  }
  
  // 4. 기존 동작: localStorage 클리어 + 메모리 상태 초기화
  clearPairLocal();
  localStorage.removeItem(LS.ROLE);
  ChatState.role = null;
  ChatState.parentName = 'パパ';
  ChatState.childName = 'ハル';
  ChatState.muted = false;
  ChatState.pushEnabled = false;
  localStorage.removeItem(LS.PARENT_NAME);
  localStorage.removeItem(LS.CHILD_NAME);
  localStorage.removeItem(LS.MUTED);
  localStorage.removeItem(LS.PUSH_ENABLED);
}
```

⚠️ 보안 규칙상 본인이 멤버인 pair만 삭제 가능. 다른 사용자의 pair에는 영향 없음.

#### 수정 B: `generatePairingCode()` 진입 가드

**현재 동작**: 함수 호출 시 무조건 새 코드 만들고 watchForPairing 시작
**수정 후**: 시작 전 본인의 옛날 pair 자동 정리

```javascript
// engine/chat-core.js

export async function generatePairingCode() {
  // ⭐ 먼저 본인 관련 stale pair 정리 (있다면)
  await cleanupStalePairs();
  
  // ... 기존 코드 발급 로직 그대로 ...
}

async function cleanupStalePairs() {
  if (!ChatState.user?.uid || !ChatState.role) return;
  
  try {
    const field = ChatState.role === 'parent' ? 'parentUid' : 'childUid';
    const q = query(collection(db, 'pairs'), where(field, '==', ChatState.user.uid));
    const snap = await getDocs(q);
    
    if (snap.empty) return;
    
    // 옛날 pair 발견 → 모두 삭제 (resetPairing과 동일 로직 재사용 권장)
    for (const pairDoc of snap.docs) {
      // ... messages·presence·pair 삭제 (위와 동일)
    }
    console.log('[chat] cleaned up', snap.size, 'stale pairs before new pairing');
  } catch (e) {
    console.warn('[chat] stale cleanup failed', e);
  }
}
```

#### 수정 C: 자녀 측 코드 입력에도 동일 가드

`pairWithCode()` 함수 시작 시에도 자녀의 옛날 pair 자동 정리. 단, 자녀 측은 보통 옛날 pair가 없지만 안전을 위해 동일 처리.

```javascript
export async function pairWithCode(code) {
  // ⭐ 먼저 본인 관련 stale pair 정리
  await cleanupStalePairs();
  
  // ... 기존 로직 그대로 ...
}
```

### 3-3. 공통 헬퍼 함수 추출

`resetPairing()`, `generatePairingCode()`, `pairWithCode()` 모두에서 사용하는 「본인 관련 pair 정리」 로직을 별도 헬퍼로 추출:

```javascript
// engine/chat-core.js (private helper)
async function deleteOwnPairs() {
  if (!ChatState.user?.uid || !ChatState.role) return 0;
  
  const field = ChatState.role === 'parent' ? 'parentUid' : 'childUid';
  const q = query(collection(db, 'pairs'), where(field, '==', ChatState.user.uid));
  const snap = await getDocs(q);
  
  let deleted = 0;
  for (const pairDoc of snap.docs) {
    const pairId = pairDoc.id;
    try {
      // 하위 컬렉션 삭제
      for (const subName of ['messages', 'presence']) {
        const subSnap = await getDocs(collection(db, 'pairs', pairId, subName));
        if (subSnap.size > 0) {
          const batch = writeBatch(db);
          subSnap.docs.forEach(d => batch.delete(d.ref));
          await batch.commit();
        }
      }
      // 본 문서 삭제
      await deleteDoc(doc(db, 'pairs', pairId));
      deleted++;
    } catch (e) {
      console.warn('[chat] delete pair', pairId, e);
    }
  }
  
  // pairing_codes 정리 (부모만)
  if (ChatState.role === 'parent') {
    try {
      const codeQ = query(collection(db, 'pairing_codes'), where('parentUid', '==', ChatState.user.uid));
      const codeSnap = await getDocs(codeQ);
      for (const codeDoc of codeSnap.docs) {
        await deleteDoc(codeDoc.ref).catch(() => {});
      }
    } catch (e) {}
  }
  
  return deleted;
}
```

---

## 4. 보안 규칙 검토

기존 보안 규칙으로 위 동작이 가능한지 확인:

```javascript
// pairs (현재)
match /pairs/{pairId} {
  allow read, update: if request.auth != null
    && (request.auth.uid == resource.data.parentUid
        || request.auth.uid == resource.data.childUid);
  allow create: if request.auth != null
    && (request.auth.uid == request.resource.data.parentUid
        || request.auth.uid == request.resource.data.childUid);
  // ⚠️ delete가 명시 안 됨 → 기본 거부
}
```

**문제**: 보안 규칙에 `delete` 권한이 없음 → 클라이언트에서 `deleteDoc()` 호출 시 권한 거부.

**해결**: 보안 규칙에 `delete` 추가 (멤버 본인만):

```javascript
match /pairs/{pairId} {
  allow read, update, delete: if request.auth != null
    && (request.auth.uid == resource.data.parentUid
        || request.auth.uid == resource.data.childUid);
  allow create: if request.auth != null
    && (request.auth.uid == request.resource.data.parentUid
        || request.auth.uid == request.resource.data.childUid);
}

match /pairs/{pairId}/messages/{msgId} {
  allow read, create, update, delete: if request.auth != null
    && (request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.parentUid
        || request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.childUid);
}

match /pairs/{pairId}/presence/{role} {
  // 기존 read·write 그대로, delete는 본인 역할만
  allow delete: if request.auth != null
    && (
      (role == "parent" && request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.parentUid)
      || (role == "child" && request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.childUid)
    );
  // 기존 read·write 규칙 유지
  allow read, write: if request.auth != null
    && (request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.parentUid
        || request.auth.uid == get(/databases/$(database)/documents/pairs/$(pairId)).data.childUid);
}

match /pairing_codes/{code} {
  allow read, write, delete: if request.auth != null;
}
```

→ Claude Code가 작업 후 보안 규칙 코드 블록 출력 → 사용자가 콘솔에 게시.

⚠️ **주의**: messages/presence의 delete 규칙은 messages·presence 문서가 삭제될 때 평가됨. 그러나 pair 문서가 먼저 삭제되면 `get(/databases/.../pairs/$(pairId)).data` 자체가 실패 → 권한 거부 가능.

**해결 패턴**: 삭제 순서 — 하위 컬렉션부터 먼저 삭제 → pair 본 문서 마지막. 위 `deleteOwnPairs()` 함수가 이미 이 순서로 됨.

---

## 5. UX 개선 — 「ペアリングをリセット」 버튼 동작

### 5-1. 현재 동작
- 「ペアリングをリセット」 클릭 → confirm 다이얼로그 → 「OK」 → localStorage만 클리어 + 첫 화면 복귀
- ⚠️ Firestore의 옛날 pair는 그대로 → 다음 페어링 시 자동 복원되어 새 페어링 불가

### 5-2. 수정 후 동작
- 「ペアリングをリセット」 클릭
- confirm 다이얼로그: 「ペアリングをリセットすると、これまでのチャット履歴もすべて削除されます。本当によろしいですか？」 (이전보다 더 명시적 경고)
- 「OK」 클릭 → 「リセット中…」 표시
- Firestore 옛날 pair·메시지·presence 모두 삭제
- localStorage 클리어
- 첫 화면(역할 선택)으로 복귀
- 「リセットしました」 알림

### 5-3. 진행 표시 (사용자 피드백)

`resetPairing()` 비동기 처리 중 UI에 「リセット中…」 표시.

```javascript
// chat-ui.js
document.getElementById('chatResetPair').onclick = async () => {
  if (!confirm('ペアリングをリセットすると、これまでのチャット履歴もすべて削除されます。本当によろしいですか？')) return;
  
  const btn = document.getElementById('chatResetPair');
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'リセット中…';
  
  try {
    await resetPairing();
    // resetPairing 완료 후 자동으로 첫 화면 복귀 (chat-core가 처리)
  } catch (e) {
    alert('リセットに失敗しました: ' + (e.message || e));
    btn.disabled = false;
    btn.textContent = originalText;
  }
};
```

---

## 6. watchForPairing 자체에는 문제 없음 (수정 불필요)

`watchForPairing`은 의도대로 동작 중 — 부모가 코드 발급 후 자녀가 입력 완료될 때까지 폴링하다가, 자녀 입력 시점에 새 pair가 생성되면 그 pair를 발견. 

**문제는 watchForPairing이 아니라 그 전에 옛날 pair가 정리되지 않은 것**. 옛날 pair 정리만 제대로 되면 watchForPairing은 정상 동작.

→ watchForPairing은 그대로 두고, 정리만 사전 수행.

---

## 7. 변경 파일

```
engine/chat-core.js     deleteOwnPairs 헬퍼 + resetPairing/generatePairingCode/pairWithCode 보강
engine/chat-ui.js       「リセット中…」 진행 표시
engine/chat-bindings.js 변경 없음
styles/chat.css         변경 없음 (또는 disabled 스타일만 미세 추가)
```

신규 파일: 0개.

명세 문서:
```
CHAT_BUNDLE_D_RESET_FIX_SPEC.md   (이 문서, 신규 추가)
```

---

## 8. 검증 시나리오 (수정 후)

### 8-1. 기본 페어링 → 리셋 → 재페어링

1. PC에서 부모 페어링 코드 발급 → 휴대폰에서 자녀 코드 입력 → 페어링 완료
2. 메시지 몇 개 주고받기
3. PC에서 채팅 → 설정 → **「ペアリングをリセット」** 클릭
4. confirm → OK → 「リセット中…」 표시 (1~2초)
5. Firebase 콘솔에서 확인: `pairs` 컬렉션 비어있어야 함 (또는 본인 멤버 pair만 사라짐)
6. PC에서 첫 화면 → 부모 선택 → 새 코드 발급 → **이번엔 코드 안 사라짐** ✅
7. 휴대폰에서도 「ペアリングをリセット」 클릭 → 첫 화면 복귀
8. 휴대폰에서 자녀 선택 → 새 코드 입력 → 페어링 성공

### 8-2. localStorage만 클리어한 경우

1. 페어링 완료 상태에서 PC F12 → `localStorage.clear(); location.reload();`
2. PC에서 부모 선택 → 코드 발급 시도
3. **`generatePairingCode()` 시작 시 deleteOwnPairs 호출** → 옛날 pair 자동 정리
4. 새 코드 발급 성공 → 코드 안 사라짐 ✅

### 8-3. 휴대폰만 리셋

1. 페어링 완료 상태에서 휴대폰 PWA 앱 삭제 + 재설치
2. PC는 그대로 채팅 화면
3. 휴대폰에서 자녀 선택 → 코드 입력 시도
4. 이때 PC의 옛날 pair는 그대로 → 자녀 측 `pairWithCode()` 시작 시 deleteOwnPairs 호출
5. 자녀의 옛날 pair는 없으므로 (UID가 새것) skip → 코드 입력 정상 진행
6. 페어링 성공 → 그러나 PC 측은 옛날 pair에 묶여있음

⚠️ **시나리오 8-3는 부분 해결**:
- 한쪽만 리셋한 경우 다른 쪽은 영향 없음 (사용자가 직접 「ペアリングをリセット」 눌러야 정리됨)
- 또는 "어차피 페어링 끝났는데 한쪽만 리셋하는 건 비정상 상황"이므로 고려 대상 외

→ 수정 범위는 시나리오 8-1, 8-2만 보장. 시나리오 8-3는 사용자에게 「양쪽 모두 ペアリングをリセット 누르라」는 안내로 충분.

---

## 9. Git 작업

```bash
git add engine/chat-core.js engine/chat-ui.js \
        CHAT_BUNDLE_D_RESET_FIX_SPEC.md
git commit -m "fix(chat): pairing reset bug — clean stale Firestore pairs

Bug: resetPairing only cleared localStorage, leaving Firestore pair
documents intact. On next 'create code' attempt, watchForPairing
auto-restored the stale pair (parentUid match), making the new code
disappear immediately.

Fix:
- resetPairing now deletes all pairs where current user is a member,
  including messages and presence subcollections
- generatePairingCode and pairWithCode call deleteOwnPairs as a guard
  before starting (handles cases where user clears localStorage manually)
- New private helper deleteOwnPairs encapsulates the cleanup logic
- UI shows 'リセット中…' during async cleanup

Security rules updated:
- Added 'delete' permission for pairs/messages/presence/pairing_codes
  for member only (existing read/write rules preserved)
- Posted by user in Firebase Console after deploy"
git push origin main
```

---

## 10. 보안 규칙 콘솔 게시 (사용자가 직접)

Claude Code 작업 후 출력하는 보안 규칙 코드 블록을 Firebase 콘솔에 게시.

⚠️ **순서 주의**: 
1. 먼저 Claude Code가 push 완료
2. 사용자가 콘솔에 새 보안 규칙 게시
3. 본인 PC + 휴대폰 강제 새로고침
4. 검증 진행

게시 전에 reset 시도하면 권한 거부 (delete 미허용 상태). 게시 후 정상 동작.

---

## 11. 비용 영향

추가 Firestore 작업:
- 「ペアリングをリセット」 시: messages 삭제(평균 50회) + presence 삭제(2회) + pair 삭제(1회) = ~53 deletes
- 「コード発급/入力」 시 stale 정리: 보통 0건 (옛날 pair 없을 때), 있어도 위와 동일

→ 무료 한도(20,000 deletes/day) 대비 무시할 수준.

---

## 12. Phase E 예고

이번 수정으로 페어링 버그는 해결됨. 그 외 잠재 개선 항목 (필요 시 추후):
- 채팅 히스토리 30일 자동 삭제 (cron Functions)
- 토큰 만료 자동 정리
- 자동 재연결 (네트워크 일시 끊김 대비)

다만 Bundle D 검증 통과 후 5/15 자녀 페어링 진행. 그 후 실사용 1~2주 후 추가 개선 검토.
