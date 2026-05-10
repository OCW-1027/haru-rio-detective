# SERIES 4 NEW CREATION SPEC
## 「偉人科学者ファイル」 — 시리즈 4 신규 생성 + 자산 통합

**작성일**: 2026-05-10
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**목적**: 시리즈 4 「偉人科学者ファイル」 신규 시리즈 골격 생성 + 24개 자산 통합
**범위**:
- ✅ 시리즈 4 신규 생성 (탭·페이지·State·그리드·스토리 진행)
- ✅ 자산 24개 게임 코드에 연결
- ✅ 학습 자료 시스템 placeholder
- ❌ 본격 콘텐츠 (스토리·트릭·학습자료 풍부화) → **별도 명세서에서 다룸**

**미러링 기준**: 시리즈 11 (数学 探偵団, 가장 최근·정제된 패턴) + 시리즈 3 (科学探偵, buildScienceGrid 패턴)

---

## 0. PRE-FLIGHT CHECKLIST

작업 시작 전 다음 확인:

- [ ] `assets/characters/`에 5개 PNG (haru, rio, hinata, penta, **penta_series04**)
- [ ] `assets/characters/series04/`에 10개 NPC PNG
- [ ] `assets/backgrounds/series04/`에 11개 배경 PNG
- [ ] 시리즈 11 (数学 探偵団) 정상 작동 — 회귀 테스트 기준선
- [ ] 시리즈 3 (科学探偵) 정상 작동 — 절대 건드리지 않을 시리즈
- [ ] git 상태 깨끗 (uncommitted 변경 없음)
- [ ] 신규 브랜치 생성 권장 (예: `feat/series04-scientists`)

---

## 1. 시리즈 정체성 (Identity)

| 항목 | 값 |
|---|---|
| 시리즈 번호 | **4** |
| 표시 이름 | **偉人科学者ファイル** |
| 컨셉 | 위인 과학자별 발견 추리 (인물 중심) |
| 챕터 수 | 10 (사건 9 + 보스 1) |
| 탭 ID | `tabScientists` (또는 시리즈 11 명명 패턴 따름) |
| 페이지 ID | `pageScientists` |
| State 키 | `scientistsCleared` |
| 데이터 변수명 | `SCIENTISTS_STORY` |
| 그리드 빌더 함수 | `buildScientistsGrid` |
| 스토리 시작 함수 | `startScientists` |
| 학습 모달 함수 | `openScientistsLearn` (선택, 학습자료 적용 시) |

**기존 시리즈 3과의 구분**:
- 시리즈 3 (科学探偵): 분야별 추리 사건 (化学·天文·物理 등)
- 시리즈 4 (偉人科学者ファイル): 위인별 발견 추리 (뉴턴·아인슈타인 등)
- 두 시리즈는 메뉴에 모두 표시됨, 자녀가 자유롭게 선택

---

## 2. 챕터 메타데이터 (Placeholder)

본격 콘텐츠는 별도 명세서에서 작성. 이번엔 10개 챕터 골격만:

| # | 사건명 (placeholder) | 주인공 NPC (charKey) | 배경 (sceneKey) | 테마 |
|---|---|---|---|---|
| 1 | 落ちる林檎の真実 | `ringo_hakase` | `bg_ch01_apple` | 万有引力·三法則 |
| 2 | 時間を操る秘密 | `shiraga_ein` | `bg_ch02_blackboard` | 相対性理論 |
| 3 | 光る石の秘密 | `hikari_curie` | `bg_ch03_radium` | 放射能 |
| 4 | 島々の鳥たち | `darwin_voyager` | `bg_ch04_beagle` | 進化論 |
| 5 | 見えない敵の正体 | `pasteur_micro` | `bg_ch05_microbiology` | 細菌学 |
| 6 | エンドウ豆の法則 | `mendel_pea` | `bg_ch06_monastery` | 遺伝法則 |
| 7 | 天空の真実 | `galileo_telescope` | `bg_ch07_observatory` | 天体観測 |
| 8 | 電気と磁気の関係 | `faraday_coil` | `bg_ch08_electricity` | 電磁気学 |
| 9 | 原子の中の世界 | `bohr_atom` | `bg_ch09_physics` | 原子模型 |
| 10 | 偉人たちの調和 (보스) | `togo_kenja` | `bg_ch10_boss` | 종합 |

챕터 그리드 화면 배경: `bg_main_study` (19세기 학자 서재)

---

## 3. 작업 단계 개요

```
Step 1: data/images.js — 자산 24개 키 등록
Step 2: data/series4-scientists.js — 시리즈 4 데이터 신규 작성
Step 3: 시리즈 11 패턴 정독 — 미러링 대상 분석
Step 4: index.html — 탭·페이지·스크립트 추가
Step 5: engine/ui-modal.js — switchTab·buildChapterGrid 분기 추가
Step 6: engine/core.js — State 동기화 (3곳)
Step 7: engine/detectives-B.js — buildScientistsGrid + startScientists 추가
Step 8: 학습 자료 시스템 placeholder (선택, 단순 구조만)
Step 9: 브라우저 검증 + 회귀 테스트
Step 10: git commit + push
```

각 단계마다 **콘솔 검증 후** 다음 단계 진행. silent failure 방지.

---

## 4. Step 1 — `data/images.js` 자산 키 등록

### 4-1. CHAR_IMAGES에 추가할 13개 키

기존 키 다음에 (또는 객체 내부 적절한 위치) 추가. **기존 키 절대 덮어쓰지 말 것**.

```javascript
// === 신규 메인 캐릭터 (모든 시리즈에서 사용 가능) ===
CHAR_IMAGES.hinata          = 'assets/characters/hinata.png';
CHAR_IMAGES.penta           = 'assets/characters/penta.png';

// === 시리즈 4 ペンタ 변종 (시리즈 4 안에서만) ===
CHAR_IMAGES.penta_series04  = 'assets/characters/penta_series04.png';

// === 시리즈 4 NPC (10명) ===
CHAR_IMAGES.ringo_hakase      = 'assets/characters/series04/ringo_hakase.png';
CHAR_IMAGES.shiraga_ein       = 'assets/characters/series04/shiraga_ein.png';
CHAR_IMAGES.hikari_curie      = 'assets/characters/series04/hikari_curie.png';
CHAR_IMAGES.darwin_voyager    = 'assets/characters/series04/darwin_voyager.png';
CHAR_IMAGES.pasteur_micro     = 'assets/characters/series04/pasteur_micro.png';
CHAR_IMAGES.mendel_pea        = 'assets/characters/series04/mendel_pea.png';
CHAR_IMAGES.galileo_telescope = 'assets/characters/series04/galileo_telescope.png';
CHAR_IMAGES.faraday_coil      = 'assets/characters/series04/faraday_coil.png';
CHAR_IMAGES.bohr_atom         = 'assets/characters/series04/bohr_atom.png';
CHAR_IMAGES.togo_kenja        = 'assets/characters/series04/togo_kenja.png';
```

### 4-2. SCENE_IMAGES에 추가할 11개 키

```javascript
// === 시리즈 4 배경 ===
SCENE_IMAGES.bg_main_study         = 'assets/backgrounds/series04/bg_main_study.png';
SCENE_IMAGES.bg_ch01_apple         = 'assets/backgrounds/series04/bg_ch01_apple.png';
SCENE_IMAGES.bg_ch02_blackboard    = 'assets/backgrounds/series04/bg_ch02_blackboard.png';
SCENE_IMAGES.bg_ch03_radium        = 'assets/backgrounds/series04/bg_ch03_radium.png';
SCENE_IMAGES.bg_ch04_beagle        = 'assets/backgrounds/series04/bg_ch04_beagle.png';
SCENE_IMAGES.bg_ch05_microbiology  = 'assets/backgrounds/series04/bg_ch05_microbiology.png';
SCENE_IMAGES.bg_ch06_monastery     = 'assets/backgrounds/series04/bg_ch06_monastery.png';
SCENE_IMAGES.bg_ch07_observatory   = 'assets/backgrounds/series04/bg_ch07_observatory.png';
SCENE_IMAGES.bg_ch08_electricity   = 'assets/backgrounds/series04/bg_ch08_electricity.png';
SCENE_IMAGES.bg_ch09_physics       = 'assets/backgrounds/series04/bg_ch09_physics.png';
SCENE_IMAGES.bg_ch10_boss          = 'assets/backgrounds/series04/bg_ch10_boss.png';
```

코멘트로 신규 영역 명시 (예: `// === Series 4 Assets (2026-05-10) ===`).

### 4-3. Step 1 콘솔 검증

```javascript
typeof CHAR_IMAGES.hinata           // "string"
typeof CHAR_IMAGES.ringo_hakase     // "string"
typeof CHAR_IMAGES.togo_kenja       // "string"
typeof CHAR_IMAGES.penta_series04   // "string"
typeof SCENE_IMAGES.bg_main_study   // "string"
typeof SCENE_IMAGES.bg_ch10_boss    // "string"

// 24개 모두 string 확인
['hinata', 'penta', 'penta_series04',
 'ringo_hakase', 'shiraga_ein', 'hikari_curie',
 'darwin_voyager', 'pasteur_micro', 'mendel_pea',
 'galileo_telescope', 'faraday_coil', 'bohr_atom',
 'togo_kenja'].every(k => typeof CHAR_IMAGES[k] === 'string')
// → true

['bg_main_study',
 'bg_ch01_apple', 'bg_ch02_blackboard', 'bg_ch03_radium',
 'bg_ch04_beagle', 'bg_ch05_microbiology', 'bg_ch06_monastery',
 'bg_ch07_observatory', 'bg_ch08_electricity', 'bg_ch09_physics',
 'bg_ch10_boss'].every(k => typeof SCENE_IMAGES[k] === 'string')
// → true
```

---

## 5. Step 2 — `data/series4-scientists.js` 신규 작성

### 5-1. 파일 위치
```
data/series4-scientists.js (신규)
```

### 5-2. 미러링 기준
**시리즈 11 (`data/series11-math.js`)의 `MATH_STORY` 구조를 정독하고 그대로 따른다.**

특히 다음 항목의 데이터 구조 완전 복제:
- 챕터 객체의 키 구성 (id·title·subtitle·icon·intro·steps·learn·note 등)
- 일러스트 매핑 방식 (`MATH_CASE_IMAGES`)
- 캐릭터 매핑 방식 (`MATH_CHARS = CHAR_IMAGES` 또는 별도 매핑)
- placeholder 패턴 (콘텐츠 작성 전의 챕터 구조)

### 5-3. 구조 가이드 (시리즈 11 패턴 미러링)

```javascript
// data/series4-scientists.js

// 시리즈 4 캐릭터 매핑 (시리즈 4 안에서는 ペンタ가 안경 모드)
const SCIENTISTS_CHARS = {
  ...CHAR_IMAGES,
  penta: CHAR_IMAGES.penta_series04  // 오버라이드
};

// 시리즈 4 배경 매핑 (그리드 화면용 메인 배경 + 사건별)
const SCIENTISTS_SCENES = {
  ...SCENE_IMAGES
  // 시리즈 4 배경은 이미 SCENE_IMAGES에 등록됨
};

// 챕터 일러스트 (시리즈 11의 MATH_CASE_IMAGES 패턴 미러링)
// 일단 NPC 이미지를 챕터 카드로 사용하거나, 또는 배경의 작은 썸네일 사용
const SCIENTISTS_CASE_IMAGES = {
  1: CHAR_IMAGES.ringo_hakase,
  2: CHAR_IMAGES.shiraga_ein,
  3: CHAR_IMAGES.hikari_curie,
  4: CHAR_IMAGES.darwin_voyager,
  5: CHAR_IMAGES.pasteur_micro,
  6: CHAR_IMAGES.mendel_pea,
  7: CHAR_IMAGES.galileo_telescope,
  8: CHAR_IMAGES.faraday_coil,
  9: CHAR_IMAGES.bohr_atom,
  10: CHAR_IMAGES.togo_kenja
};

// 시리즈 4 메인 데이터
const SCIENTISTS_STORY = [
  {
    id: 1,
    title: '落ちる林檎の真実',
    subtitle: '万有引力を発見した日',
    icon: '🍎',
    theme: '万有引力·三法則',
    charKey: 'ringo_hakase',
    sceneKey: 'bg_ch01_apple',
    // 본격 콘텐츠는 별도 명세서에서 추가
    intro: 'PLACEHOLDER — 본격 콘텐츠 추후 작성',
    steps: [],  // 시리즈 11 steps 구조 따라 placeholder
    learn: null,  // 학습 자료 별도 작성
    note: null
  },
  {
    id: 2,
    title: '時間を操る秘密',
    subtitle: '光と時間の関係',
    icon: '⏰',
    theme: '相対性理論',
    charKey: 'shiraga_ein',
    sceneKey: 'bg_ch02_blackboard',
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  },
  {
    id: 3,
    title: '光る石の秘密',
    subtitle: '見えない力の発見',
    icon: '✨',
    theme: '放射能',
    charKey: 'hikari_curie',
    sceneKey: 'bg_ch03_radium',
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  },
  {
    id: 4,
    title: '島々の鳥たち',
    subtitle: '進化を辿る航海',
    icon: '🐦',
    theme: '進化論',
    charKey: 'darwin_voyager',
    sceneKey: 'bg_ch04_beagle',
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  },
  {
    id: 5,
    title: '見えない敵の正体',
    subtitle: '微生物との戦い',
    icon: '🦠',
    theme: '細菌学',
    charKey: 'pasteur_micro',
    sceneKey: 'bg_ch05_microbiology',
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  },
  {
    id: 6,
    title: 'エンドウ豆の法則',
    subtitle: '受け継がれる特徴',
    icon: '🌱',
    theme: '遺伝法則',
    charKey: 'mendel_pea',
    sceneKey: 'bg_ch06_monastery',
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  },
  {
    id: 7,
    title: '天空の真実',
    subtitle: '望遠鏡が映した宇宙',
    icon: '🔭',
    theme: '天体観測',
    charKey: 'galileo_telescope',
    sceneKey: 'bg_ch07_observatory',
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  },
  {
    id: 8,
    title: '電気と磁気の関係',
    subtitle: '見えない力の正体',
    icon: '⚡',
    theme: '電磁気学',
    charKey: 'faraday_coil',
    sceneKey: 'bg_ch08_electricity',
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  },
  {
    id: 9,
    title: '原子の中の世界',
    subtitle: '電子の軌道',
    icon: '⚛️',
    theme: '原子模型',
    charKey: 'bohr_atom',
    sceneKey: 'bg_ch09_physics',
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  },
  {
    id: 10,
    title: '偉人たちの調和',
    subtitle: 'すべての発見を繋ぐ謎',
    icon: '🌌',
    theme: '종합 (보스)',
    charKey: 'togo_kenja',
    sceneKey: 'bg_ch10_boss',
    isBoss: true,
    intro: 'PLACEHOLDER',
    steps: [],
    learn: null,
    note: null
  }
];
```

### 5-4. 주의사항

- **시리즈 11의 정확한 키 이름 확인** — `id`, `title`, `subtitle`, `icon` 등이 실제로 시리즈 11에서 사용하는 이름인지 확인하고 일치시킬 것
- **placeholder 챕터로 인한 오류 방지** — 그리드는 표시되지만 챕터 진입 시 깨지지 않도록 빈 steps/null learn 처리 필요
- 시리즈 11이 어떻게 placeholder를 다루는지 정독해서 동일 패턴 적용

---

## 6. Step 3 — 시리즈 11 패턴 정독 (필수)

작업 진행 전 다음 파일들을 정독하여 정확한 미러링 대상 파악:

```
data/series11-math.js              ← 데이터 구조 완전 복제 대상
data/series11-math-learn.js        ← 학습 자료 구조 (선택)
engine/math-learn.js               ← 학습 모달 로직 (선택)
engine/detectives-B.js             ← buildMathGrid (line ~2249) 미러링
```

특히 detectives-B.js의 다음 함수들 정독:
- `buildMathGrid(grid)` — 그리드 빌더
- `startMath(caseId)` — 사건 시작
- `mathStep(...)` — 단계 진행
- `mathFinish(...)` — 사건 종료
- `MathState` 또는 관련 상태 객체

**시리즈 4의 함수들은 위 함수들을 단어 치환만으로 만든다고 생각하면 됨**:
- `Math` → `Scientists`
- `MATH_` → `SCIENTISTS_`
- `mathCleared` → `scientistsCleared`

---

## 7. Step 4 — `index.html` 수정

### 7-1. 추가할 위치 (시리즈 11 추가했던 패턴 그대로)

#### (1) 탭 버튼
시리즈 11의 `<button class="tab math" id="tabMath">` 다음 줄에 추가:

```html
<button class="tab scientists" id="tabScientists" onclick="switchTab('scientists')">👨‍🔬 偉人科学者</button>
```

> 아이콘은 자녀 친화적인 것으로 (👨‍🔬, 🧑‍🔬, 🔬, 🧪 등). 시리즈 3가 🔬 사용 중이면 다른 것 선택.

#### (2) 페이지 DOM
시리즈 11의 `<div class="page sci-story-page" id="pageMath">` 다음에 추가:

```html
<div class="page sci-story-page" id="pageScientists">
  <!-- 시리즈 11 pageMath 구조 정확히 복제 (sci-stage/sci-bottom 등) -->
</div>
```

#### (3) 데이터 스크립트 로드
시리즈 11의 `<script src="data/series11-math.js"></script>` 다음에 추가:

```html
<script src="data/series4-scientists.js"></script>
```

#### (4) 학습 모달 (선택)
학습 자료 시스템 적용 시 추가 (Step 8 참조).

### 7-2. 주의사항

- **시리즈 11 패턴을 한 줄씩 정독하고 정확히 미러링**
- 다른 시리즈의 탭 코드는 절대 건드리지 말 것
- 새 탭의 CSS 클래스명은 기존 패턴과 충돌 없도록 (예: `tab.scientists`)

---

## 8. Step 5 — `engine/ui-modal.js` 수정

### 8-1. switchTab 함수 (line 31 근처)

기존 시리즈 11 패턴 옆에 한 줄 추가:

```javascript
document.getElementById('tabScientists').classList.toggle('active', tab === 'scientists');
```

### 8-2. buildChapterGrid 함수 (line 193-195 근처)

기존 분기에 추가:

```javascript
} else if (State.currentTab === 'scientists') {
  buildScientistsGrid(grid);
}
```

---

## 9. Step 6 — `engine/core.js` State 동기화

### 9-1. 3곳 수정 (시리즈 11 패턴 따름)

`State.mathCleared` 관련 코드 옆에 동일 패턴으로:

```javascript
// line 210 근처 (initial state 정의)
State.scientistsCleared = new Array(SCIENTISTS_STORY.length).fill(false);

// line 341 근처 (저장/로드 시)
// State.mathCleared와 동일한 처리 패턴 적용

// line 452 근처 (리셋 시)
// State.mathCleared와 동일한 처리 패턴 적용
```

**시리즈 11이 `mathCleared`를 어떻게 다루는지 정확히 정독 후 미러링**.

---

## 10. Step 7 — `engine/detectives-B.js` (또는 신규 파일) 추가

### 10-1. 위치 결정

**옵션 A — `engine/detectives-B.js`에 추가** (권장)
- 시리즈 11의 buildMathGrid가 이미 있는 파일
- 같은 그룹이라 응집도 OK
- 별도 파일 생성 안 해도 됨

**옵션 B — 신규 파일 `engine/detectives-scientists.js`**
- 응집도 더 높음
- index.html에 `<script>` 한 줄 추가 필요
- 향후 시리즈 분리 명확

**Claude Code 재량으로 선택**. 기본은 옵션 A.

### 10-2. 추가할 함수들 (시리즈 11 mirror)

```javascript
// engine/detectives-B.js 또는 engine/detectives-scientists.js

function buildScientistsGrid(grid) {
  // buildMathGrid 정확히 미러링, MATH_STORY → SCIENTISTS_STORY
  SCIENTISTS_STORY.forEach((c, i) => {
    // ... 시리즈 11 패턴
  });
}

function startScientists(caseId) {
  // startMath 미러링
}

function scientistsStep(...) {
  // mathStep 미러링
}

function scientistsFinish(...) {
  // mathFinish 미러링
}

// 필요한 경우 ScientistsState 객체
```

**핵심 원칙**: 시리즈 11 함수 본문을 복사 → 단어 치환 (Math→Scientists) → 데이터 변수만 SCIENTISTS_STORY 등으로 교체.

---

## 11. Step 8 — 학습 자료 시스템 placeholder (선택)

### 11-1. 이번 명세서 범위
이번 명세서는 **placeholder만**. 본격 학습 자료 콘텐츠는 별도 명세서에서.

### 11-2. 시리즈 11 학습 자료 구조 분석 후 결정

`engine/math-learn.js`와 `data/series11-math-learn.js`를 정독한 뒤:

**옵션 A — placeholder도 만들지 않음**
- 시리즈 4 골격만 동작, 학습 모달은 다음 단계에서 추가
- 가장 단순

**옵션 B — placeholder 파일만 만들기**
```
data/series4-scientists-learn.js  (빈 SCIENTISTS_LEARN = []; 정도)
engine/scientists-learn.js        (빈 함수 골격)
```

**기본 권장: 옵션 A** — 학습 자료는 본격 콘텐츠 작업 시 한 번에 작성하는 게 깔끔.

---

## 12. Step 9 — 브라우저 검증 + 회귀 테스트

### 12-1. 시리즈 4 시각 검증

1. **메뉴 진입**: 새 탭 「偉人科学者」가 메뉴에 나타나는지
2. **탭 클릭**: 시리즈 4 챕터 그리드 화면 진입 가능한지
3. **그리드 배경**: `bg_main_study` (19세기 학자 서재)가 표시되는지
4. **챕터 카드 10개**: 각 챕터의 일러스트(NPC 얼굴) + 제목 표시 확인
5. **챕터 진입 시도**: 사건 1 클릭 시 placeholder라도 정상 화면 표시 (오류 없음)

### 12-2. 콘솔 검증

```javascript
// 데이터 로드 확인
typeof SCIENTISTS_STORY                    // "object"
SCIENTISTS_STORY.length                    // 10
typeof buildScientistsGrid                 // "function"
typeof startScientists                     // "function"
typeof State.scientistsCleared             // "object"
State.scientistsCleared.length             // 10

// 자산 로드 확인 (Step 1 검증과 동일)
typeof CHAR_IMAGES.ringo_hakase            // "string"
typeof SCENE_IMAGES.bg_main_study          // "string"
```

### 12-3. 네트워크 탭 검증

브라우저 개발자도구 Network 탭:
- 24개 PNG 모두 200 OK 로드
- 404 에러 0건

### 12-4. 회귀 테스트 (필수)

**다른 시리즈 모두 정상 작동 확인**:
- [ ] 시리즈 1 메인 스토리 진입 → 정상
- [ ] 시리즈 2 (世界遺産) 진입 → 정상
- [ ] 시리즈 3 (科学探偵) 진입 → **특히 중요**, 우리가 만든 NPC와 같은 분야라 영향 가능성 점검
- [ ] 시리즈 5 (文学·芸術) → 정상
- [ ] 시리즈 6 (ビジネス) → 정상
- [ ] 시리즈 7 (世界経済·貿易史) → 정상
- [ ] 시리즈 8 (社会科) → 정상
- [ ] 시리즈 9 (日常のお金) → 정상
- [ ] 시리즈 10 (気象予報士) → 정상
- [ ] 시리즈 11 (数学) → 정상
- [ ] 영어 학습 탭 → 정상
- [ ] 채팅 기능 → 정상

**한 시리즈라도 깨지면 즉시 롤백**.

---

## 13. Step 10 — git commit + push

### 13-1. commit 메시지 예시

```
feat(series04): create new series "偉人科学者ファイル"

- New series 4: scientist mystery (10 chapters, person-centric)
- Distinct from series 3 (subject-centric science detective)
- Add 24 new image assets (CHAR_IMAGES + SCENE_IMAGES)
  - 3 main characters (hinata, penta, penta_series04)
  - 10 scientist NPCs (ringo_hakase ~ togo_kenja)
  - 11 backgrounds (bg_main_study + bg_ch01-10)
- New file: data/series4-scientists.js (SCIENTISTS_STORY skeleton)
- Mirror series 11 (math) integration pattern
- buildScientistsGrid in detectives-B.js
- ハル·リオ base64 unchanged
- Other series untouched (regression tested)

Content (stories, learn materials, quizzes) to be added in
SERIES4_CONTENT_SPEC.md (next phase).
```

### 13-2. push 전 최종 체크

- [ ] 콘솔 에러 0건
- [ ] 시리즈 4 챕터 그리드 + 10개 챕터 카드 정상 표시
- [ ] 회귀 테스트 통과 (다른 시리즈 영향 없음)
- [ ] 새 PNG 24개가 git status에 추가됨
- [ ] 다른 시리즈 .js 파일은 git diff에 안 잡힘
- [ ] 신규 파일들 (`data/series4-scientists.js` 등) git에 staged

---

## 14. 작업 후 보고 사항

Claude Code가 작업 완료 후 다음을 보고:

1. 수정한 파일 목록 (예: `data/images.js`, `index.html`, `engine/ui-modal.js` 등)
2. 신규 생성한 파일 목록 (`data/series4-scientists.js` 등)
3. detectives-B.js에 추가했는지 / 신규 파일 만들었는지
4. 추가한 키 개수 (CHAR_IMAGES 13개 + SCENE_IMAGES 11개 = 24개)
5. 콘솔 검증 결과 (10개 모두 통과)
6. 시각 검증 결과 (그리드 + 10챕터 표시 OK)
7. 회귀 테스트 결과 (다른 시리즈 영향 없음)
8. commit hash + push 완료 여부

---

## 15. 절대 하지 말 것 (CRITICAL)

- ❌ `data/images.js`의 기존 base64 값(haru, rio 등) URL로 변경
- ❌ 시리즈 1, 2, **3**, 5~11의 .js 파일 수정 (특히 시리즈 3는 자녀가 사용 중)
- ❌ `engine/` 폴더 핵심 엔진 파일(core.js·story.js·ui-modal.js)을 시리즈 11 패턴 외 영역까지 수정
- ❌ `assets/` 폴더 안의 PNG 파일 이동·삭제·이름 변경
- ❌ 기존 채팅 기능(chat-*.js, manifest.json, sw.js, functions/, icons/) 수정
- ❌ 영어 학습 탭(vocab-learn.js) 수정

---

## 16. 자녀 영향 고려

자녀가 ハルゲーム를 사용 중이므로:
- main 브랜치 push 후 자녀 측 Service Worker 업데이트로 잠시 로딩 발생 가능
- 시리즈 4는 골격만 있어 자녀가 진입해도 placeholder 보임 → 자연스러움
- 본격 콘텐츠가 채워진 후 자녀에게 「깜짝 선물」로 도착

---

## 17. 다음 단계 (이 명세서 적용 후)

```
SERIES4_CONTENT_SPEC.md (별도 명세서, 본격 콘텐츠)
  ├─ 사건 1~10 본격 스토리 (intro·steps)
  ├─ 트릭·추리 로직
  ├─ NPC 대사
  ├─ 학습 자료 시스템 (시리즈 10·11 패턴: 概念·SVG도해·암기카드·과거문·コツ)
  ├─ 챕터별 퀴즈 (5문제씩 × 10챕터 = 50문제)
  └─ note·결말 텍스트

작성 우선순위: 사건 1 (린고박사·만유인력)부터 1개씩 작성
            → silent failure 방지하며 단계적 추가
```

---

## 18. 의사결정 기록

| 항목 | 결정 | 사유 |
|---|---|---|
| 시리즈 번호 | 4 | 가장 깨끗한 빈 슬롯, 시리즈 3 옆 배치 직관적 |
| 시리즈 이름 | 偉人科学者ファイル | 탐정 게임 다움 + 컨셉 명확 + 자녀 친숙 단어 |
| 자산 폴더 | series04 | 시리즈 번호와 일치, 유지보수 쉬움 |
| 미러링 기준 | 시리즈 11 (数学) | 가장 최근·정제된 패턴 |
| 자산 등록 위치 | data/images.js 직접 추가 | 단순함, 디버깅 쉬움 |
| ペンタ 시리즈 4 변종 | 시리즈 4 안에서만 안경 모드 | SCIENTISTS_CHARS에서 오버라이드 |
| 학습 자료 placeholder | 이번 명세서엔 미포함 | 본격 콘텐츠 작업 시 한 번에 |
| 그리드 빌더 위치 | detectives-B.js 우선 | 응집도, Claude Code 재량 |

---

## 19. 위탁 명령 (Claude Code에 입력)

```
SERIES4_NEW_CREATION_SPEC.md를 정독하고 시리즈 4 「偉人科学者ファイル」를 
시리즈 11(数学) 패턴 그대로 미러링하여 신규 생성해줘.

작업 순서는 명세서 §3 단계대로 진행하고, 각 단계마다 콘솔 검증 후 
다음 단계로 넘어가. 회귀 테스트(시리즈 1~3, 5~11 + 영어학습 + 채팅)를 
push 전에 반드시 수행해서 다른 기능에 영향 없는지 확인해줘.

특히 시리즈 3(科学探偵)는 자녀가 사용 중이므로 절대 건드리지 말 것.
```

---

**END OF SPEC**
