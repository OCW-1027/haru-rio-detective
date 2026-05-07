# 하루게임 — 英語 単語·熟語 学習 タブ 명세서

## 0. 컨텍스트

자녀 하루(英検2級 수준, 도전적 콘텐츠 선호)가 사용. 현재 영어 챕터에는 **퀴즈만** 존재해서 단어를 외우는 과정 없이 바로 시험만 보는 흐름. 학습 → 퀴즈로 자연스럽게 이어지도록 「単語·熟語 学習」 서브탭을 영어 챕터 안에 추가.

작업 폴더: `C:\Users\taise\Projects\harugame`  
브랜치: `main`  
관련 데이터: `data/vocab.js` (v76, +350 단어 추가됨, PLUS2/PLUS3/V3/N3/A3/p1~p5 카테고리)

기존 데이터 100% 재활용 — vocab.js는 무수정.

---

## 1. 작업 범위

### 1-1. 신규 파일

```
engine/vocab-learn.js     단어·숙어 학습 탭 로직 (카드/리스트 렌더, 학습 표시, 필터)
styles/vocab-learn.css    학습 탭 전용 스타일 (.vlearn- 프리픽스, 게임 css와 충돌 회피)
```

### 1-2. 수정 파일 (최소)

```
index.html                vocab-learn.js·css 로드 + 영어 챕터 내 서브탭 진입점 추가
engine/quiz.js            퀴즈 시작 시 카테고리·필터 파라미터 받도록 (옵션 인자 추가)
engine/bindings.js        서브탭 전환·학습→퀴즈 연결 이벤트 바인딩
```

### 1-3. 무수정

- `data/vocab.js` — 데이터 그대로 활용
- 기존 게임 코드, 채팅 모듈, 다른 시리즈 — 일체 영향 없음

---

## 2. UI 사양

### 2-1. 진입점 (영어 챕터 안)

영어 챕터에 보조 메뉴로 「単語·熟語 学習」 탭 추가. 기존 탭들 옆에 끼워넣기.

### 2-2. 학습 탭 전체 레이아웃

```
┌────────────────────────────────────────────────────────────┐
│ [2級] [準1級] [p1] [p2] [p3] [p4] [p5] [熟語]   [📑カード / 📋リスト] │
├────────────────────────────────────────────────────────────┤
│                                                              │
│              콘텐츠 영역 (모드에 따라)                         │
│                                                              │
├────────────────────────────────────────────────────────────┤
│ [☐ 覚えた語を 隠す]                  [▶ このカテゴリの クイズ]  │
└────────────────────────────────────────────────────────────┘
```

상단: 카테고리 탭(좌측) + 표시 모드 토글(우측, 카드/리스트)  
중앙: 콘텐츠  
하단: 외운 것 숨기기 토글 + 카테고리 퀴즈 시작 버튼

### 2-3. 카테고리 탭 매핑

| UI 라벨 | vocab.js 카테고리 키 |
|---|---|
| 2級 | V3, N3, A3 (2급 동사·명사·형용사) |
| 準1級 | PLUS2, PLUS3 (준1급) |
| p1~p5 | p1, p2, p3, p4, p5 (단어풀) |
| 熟語 | idioms (숙어 카테고리, vocab.js에 있다면) |

vocab.js에 숙어 카테고리가 따로 없거나 다른 키 이름이면, Claude Code가 vocab.js 구조 확인 후 적절한 매핑으로 조정.

### 2-4. 카드 모드 (📑)

한 화면에 한 단어를 큰 카드로:

```
┌──────────────────────────────────────┐
│  [← 前へ]                   [次へ →]   │
│                                       │
│          apple                        │
│        (リンゴ)                        │
│                                       │
│    🍎 a sweet round fruit             │
│                                       │
│    例: I eat an apple every day.      │
│        毎日リンゴを食べます。            │
│                                       │
│    [🔊 発音]                           │
│                                       │
│   [✓ 覚えた]  [⭕ 復習]  [─ 解除]     │
│                                       │
│              3 / 80                   │
└──────────────────────────────────────┘
```

- 좌우 화살표 또는 키보드 ← → 로 이전/다음
- 카드 영역 클릭 시 발음 자동 재생 안 함 (🔊 버튼 누를 때만)
- 「覚えた」 클릭 → 외움 표시 (✓), 자동으로 다음 카드로 이동
- 「復習」 클릭 → 다시 보기 표시 (⭕)
- 「解除」 클릭 → 표시 제거 (없음 상태로)
- 인덱스 표시 (현재/전체)

### 2-5. 리스트 모드 (📋)

한 화면에 여러 항목 (스크롤 가능):

```
┌────────────────────────────────────────────┐
│ ✓  apple        リンゴ            🔊        │
│ ⭕ banana       バナナ            🔊        │
│    orange      オレンジ           🔊        │
│    grape       ぶどう             🔊        │
│    ...                                      │
└────────────────────────────────────────────┘
```

- 항목 클릭 시 그 자리에서 아래로 펼쳐서 예문/정의 표시 (아코디언)
- 좌측 ✓/⭕ 영역 클릭 시 상태 토글 (✓ → ⭕ → 없음 → ✓ 순환)
- 🔊 버튼은 펼치지 않고 발음만 재생

### 2-6. 카드 ↔ 리스트 모드 전환

- 우상단 토글 버튼으로 즉시 전환
- localStorage에 마지막 모드 저장 (다음 진입 시 복원)
- 키: `haruvocab_view_mode` ("card" | "list")

---

## 3. 학습 표시 시스템

### 3-1. 상태

각 단어에 대해 3가지:
- (없음) — 아직 표시 안 함, 기본값
- `known` — ✓ 외움
- `review` — ⭕ 다시 보기

### 3-2. localStorage

```
키: haruvocab_status
값: JSON 문자열, 예시:
{
  "apple": "known",
  "banana": "review",
  "orange": "known"
  // 표시 안 한 것은 키 자체가 없음
}
```

식별자: 단어 자체 (영문 표기) 사용. vocab.js 데이터에 ID 필드가 있으면 그걸 우선 사용. 동음이의어 없음 가정 (영어 단어).

### 3-3. 「覚えた語を 隠す」 토글

- ON 시: status === "known" 인 단어 숨김 (표시되지 않음)
- OFF 시: 모두 표시
- 카드 모드에서 ON이면 known 단어 건너뜀
- 리스트 모드에서 ON이면 known 단어 항목 자체 안 보임
- 토글 상태도 localStorage에 저장: `haruvocab_hide_known` ("0" | "1")

### 3-4. 통계 표시 (선택, 권장)

탭 헤더 또는 푸터 영역에 작은 통계:
```
進捗: ✓42 ⭕15 / 80
```
현재 카테고리 기준. 전체 카테고리 통합 통계 옵션도 가능.

---

## 4. 발음 (TTS)

### 4-1. 사양

- 🔊 버튼 클릭 시 영어 단어 발음
- 자동 재생 OFF (사용자가 버튼 누를 때만)
- audio.js의 `speechSynthesis` 활용 (이미 일본어 voice 있음)
- 영어 voice 추가:
  - 우선순위: `en-US` > `en-GB` > 기타 영어 voice
  - 사용 가능한 영어 voice 없으면 기본 voice 사용
- 발음 중에는 🔊 버튼이 🔇 또는 회전 표시로 시각 피드백

### 4-2. 예문 발음 (옵션)

카드 모드에서 예문도 발음할 수 있게 [🔊 例文] 별도 버튼 (선택). 또는 단어와 같은 🔊 하나로 단어→예문 순차 재생.

추천: 단어 발음만 (예문 발음은 추후 추가 옵션). 단순함 유지.

---

## 5. 퀴즈 연결

### 5-1. 「このカテゴリの クイズ」 버튼

학습 탭 하단의 버튼 클릭 시:
1. 현재 선택된 카테고리 확인
2. 필터 옵션 모달 표시:
   - 全部 (default)
   - 覚えた語のみ (status === "known")
   - 覚えていない語のみ (status !== "known")
3. 옵션 선택 후 → 퀴즈 시작

### 5-2. quiz.js 수정

기존 `startVocabQuiz()` 함수가 어떤 형태인지 모르겠으니, Claude Code가 확인 후:
- 카테고리 파라미터 받기 (예: `startVocabQuiz({ category: 'PLUS3', filter: 'unknown' })`)
- 카테고리 미지정 시 기존 동작 (랜덤) 유지 — 기존 호출처 무수정
- 필터에 따라 단어 목록 사전 필터링

---

## 6. 스타일 (CSS)

### 6-1. 프리픽스

모든 클래스 `.vlearn-` 프리픽스. 기존 게임 스타일·채팅 스타일과 충돌 회피.

### 6-2. 주요 클래스

```
.vlearn-tab              학습 탭 컨테이너
.vlearn-toolbar          상단 (카테고리 탭 + 모드 토글)
.vlearn-cat-tab          카테고리 탭 버튼
.vlearn-cat-tab-active   활성 카테고리
.vlearn-mode-toggle      카드/리스트 토글
.vlearn-card             카드 모드 카드
.vlearn-card-word        단어 (큰 폰트)
.vlearn-card-kana        가나 표기
.vlearn-card-def         일본어 정의
.vlearn-card-example     예문
.vlearn-card-actions     외움/복습/해제 버튼 영역
.vlearn-card-nav         좌우 화살표
.vlearn-list             리스트 모드 컨테이너
.vlearn-list-item        리스트 항목
.vlearn-list-item-status 좌측 상태 표시
.vlearn-list-item-detail 펼친 상세 영역
.vlearn-footer           하단 (숨기기 토글 + 퀴즈 버튼)
.vlearn-tts-btn          🔊 버튼
.vlearn-stats            통계 표시
```

### 6-3. 가독성

- 카드 모드 단어 폰트: 28~32px (큰 폰트)
- 가나 표기: 18~20px
- 일본어 정의: 16px
- 리스트 모드 항목: 18px
- 모든 인터랙티브 요소 터치 영역 44x44px 이상

---

## 7. 데이터 처리 (vocab.js)

### 7-1. 구조 가정

vocab.js는 v76 기준 다음과 같은 구조로 가정 (Claude Code가 실제 확인 후 조정):

```javascript
// 추정 구조
const VOCAB_DATA = {
  V3: [...],     // 2급 동사
  N3: [...],     // 2급 명사
  A3: [...],     // 2급 형용사
  PLUS2: [...],  // 준1급 등
  PLUS3: [...],
  p1: [...],
  p2: [...],
  // ...
};

// 각 항목은 대략 다음 형태로 추정
{
  en: "apple",
  ja: "リンゴ",
  ex_en: "I eat an apple every day.",
  ex_ja: "毎日リンゴを食べます。"
}
```

실제 구조가 다르면 Claude Code가 vocab.js 읽고 학습 탭 코드를 거기에 맞게 작성.

### 7-2. 카테고리 통합 표시

- 「2級」 탭 → V3, N3, A3 모두 합침
- 「準1級」 탭 → PLUS2, PLUS3 합침
- 「p1」~「p5」 탭 → 각각 단독
- 「熟語」 탭 → vocab.js에 idioms 키가 있으면 활용, 없으면 이 탭 비활성화 (또는 숨김)

---

## 8. 검증

1. 강제 새로고침 (Ctrl+Shift+R)
2. 영어 챕터 → 「単語·熟語 学習」 서브탭 보임
3. 카테고리 탭(2級/準1級/p1~p5) 클릭 시 단어 목록 변경
4. 카드 모드:
   - 단어 표시 정상
   - 좌우 화살표로 이동
   - 외움/복습/해제 버튼 동작 + 자동 다음
   - 🔊 발음 재생
5. 리스트 모드:
   - 여러 항목 한 화면 표시
   - 클릭 시 상세 펼침
   - 좌측 상태 토글 (✓→⭕→없음 순환)
6. 카드/리스트 모드 토글 정상 + localStorage 저장
7. 「覚えた語を 隠す」 토글 ON 시 외운 단어 숨김
8. 「このカテゴリの クイズ」 클릭 → 필터 옵션 → 퀴즈 시작
9. 새로고침 후 학습 표시 + 모드 + 토글 모두 복원
10. 기존 영어 퀴즈 (랜덤) 정상 동작 (회귀 없음)
11. 다른 시리즈·채팅 기능 정상 (회귀 없음)
12. F12 콘솔 에러 0건

---

## 9. Git 작업

```bash
git add engine/vocab-learn.js styles/vocab-learn.css \
        index.html engine/quiz.js engine/bindings.js \
        VOCAB_LEARN_TAB_SPEC.md
git commit -m "feat(vocab): add 単語·熟語 学習 tab in English chapter

- New sub-tab in English chapter for browsing vocab/idioms
- Card mode + List mode (toggle, persisted)
- Category tabs: 2級 / 準1級 / p1~p5 / 熟語
- Learning status: 覚えた / 復習 / (none), persisted in localStorage
- Hide-known toggle to focus on unknowns
- TTS pronunciation 🔊 (manual play, no autoplay)
- Direct path to category quiz with all/known/unknown filter
- Reuses existing data/vocab.js (v76, no data changes)
- New vocab-learn.js + vocab-learn.css with .vlearn- prefix
- Minimal modifications to index.html / quiz.js / bindings.js"
git push origin main
```

---

## 10. ASD 표현 정정 (이번 작업과 함께)

이번 commit에 부수적으로 다음 두 명세서의 잘못된 표현 정정도 포함:

### 10-1. PHASE1_CHAT_SPEC.md (이미 GitHub에 commit됨)

검색·치환:
- "ASD 자녀 친화 UX" → "터치 영역·가독성 강화"
- "ASD 자녀에게는 음성이 더 좋을 수 있어 아쉬움" → 해당 문장 단순 표현으로 수정 또는 삭제
- 기타 "ASD" 언급 모두 제거 (이 앱 사용자는 ASD 무관)

### 10-2. CHAT_BUNDLE_A_I18N_EMOJI_SPEC.md (아직 commit 전)

검색·치환:
- "ASD 친화 UX" → "큰 폰트·터치 영역으로 가독성·조작성 확보"
- 기타 "ASD" 언급 모두 제거

이유: 이 앱의 타겟은 큰자녀(英検2級, 도전적 콘텐츠 선호)이며, 작은자녀(ASD)는 이 앱을 사용하지 않음. ASD 친화 표현이 들어가면 메모리 #3과 일치하지 않고 잘못된 정보가 영구 commit됨. 디자인 자체(큰 폰트·큰 터치 영역)는 그대로 유지 — 일반 사용성 측면에서 좋은 UX이므로.

이 정정은 단순 텍스트 검색·치환이라 1~2분 작업.
