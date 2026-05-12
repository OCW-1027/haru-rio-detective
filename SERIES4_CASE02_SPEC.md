# SERIES 4 — CASE 2 CONTENT SPEC
## 「時間を操る秘密」 — アイン教授·相対性理論

**작성일**: 2026-05-12
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 명세**: `SERIES4_CONTENT_SPEC.md` (사건 1, commit `11a5f6a` + PNG 알파 `02dea28`)
**목적**: 시리즈 4 사건 2의 본격 콘텐츠를 데이터 파일에 채워 넣는다.

**범위 (이 명세서 한 장의 산출물)**:
- ✅ 사건 2 본격 스토리 (intro + steps + 미스터리 트릭 + 결말)
- ✅ アイン教授 인격·말투 정립
- ✅ 학습 자료 6섹션 (시간 지연·光速·E=mc² 등)
- ✅ 챕터 클리어 퀴즈 5문제
- ✅ `data/series4-scientists.js` 사건 2 부분만 갱신
- ✅ `data/series4-scientists-learn.js`에 `scientists_case02` 키 추가
- ❌ 엔진 코드 신규 작성 불필요 (사건 1에서 시스템 정착, `engine/scientists-learn.js` 그대로 활용)
- ❌ 사건 3~10 콘텐츠 (각각 별도 명세서)

**미러링 기준**:
- 사건 1 `SCIENTISTS_STORY[0]` 풀 구조 (이미 작성됨)
- 사건 1 `SCIENTISTS_LEARN.scientists_case01` 풀 구조 (이미 작성됨)
- → 사건 2는 같은 구조의 데이터만 추가

---

## 0. PRE-FLIGHT CHECKLIST

- [ ] 사건 1 commit `11a5f6a` + `02dea28` 정상 동작 확인 (시리즈 4 사건 1 플레이 가능)
- [ ] `SCIENTISTS_STORY[1]`이 현재 placeholder (`comingSoon: true`) 상태인지 확인
- [ ] `data/series4-scientists-learn.js`에 `scientists_case01`만 존재 확인
- [ ] git 상태 깨끗
- [ ] 신규 브랜치 권장: `feat/series04-case02-einstein`

---

## 1. 사건 2 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 2 |
| 사건 제목 | **時間を操る秘密 (じかんをあやつるひみつ)** |
| 부제 | 動く時計は ゆっくり 進む |
| 학습 테마 | 特殊相対性理論 / 時間の遅れ / 光速 c / E=mc² |
| 학습 깊이 | 중학 物理 + 비유 중심 (정성적 이해) |
| 등장 NPC | アイン教授 (`shiraga_ein`) |
| 동행자 | ハル + リオ + ヒナタ + ペンタ |
| 메인 배경 | `bg_ch02_blackboard` (칠판·연구실) |
| 추리 트릭 | 「止まった時計の謎」 — 같은 모델 시계 2개의 시간 흐름 차이 |
| 예상 플레이타임 | 12~15분 |

---

## 2. アイン教授 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 백발 + 흰 콧수염 + 헝클어진 머리, 다크 셔츠 + 멜빵 (자산 PNG 그대로) |
| 나이 | 70대 |
| 직업 | 이론물리학자 / 사색가 |
| 거주 | 칠판으로 가득한 연구실 |
| 성격 | 사색가, 사고실험을 좋아함, 친절하고 호기심 많음 |
| 1인칭 | 「わし」 |
| 말투 | 「~であるな」「~であろう」「ふむふむ」「興味深い」「相対的にだ」 |
| 좋아하는 것 | 사고실험, 칠판에 공식 쓰기, 어린이의 질문 |
| 모티프 | 아인슈타인의 사색가 이미지 (가상 캐릭터) |
| 핵심 대사 (예) | 「時間と空間は、相対的なのであるな」 |

**중요**: 실명 「アインシュタイン」는 사건 진행 중 사용하지 않음 (가상 인격 유지). 학습 자료 섹션에서는 「アルベルト·アインシュタイン (1879-1955)」로 사실 정보 별도 제공.

---

## 3. 미스터리 트릭 「止まった時計の謎」

### 3-1. 핵심 미스터리

アイン教授의 연구실 책상에 똑같은 모델의 회중시계 2개. 어제까지는 정확히 같은 시각을 가리켰는데, 오늘 보니 시계 B가 시계 A보다 약 30초 늦게 가고 있음. 아이들이 며칠 동안 두 시계를 비교 관찰하니, **시계 B가 매일 30~60초씩 늦어짐**.

「儂は何もしていない。じゃが時計が遅れるのじゃ」 라며 곤란해 함.

### 3-2. 단서 시퀀스

| Step | 단서 | 발견자 | 의미 |
|---|---|---|---|
| 1 | 시계 A·B 외관 비교 | リオ | 완전히 같은 모델, 같은 제조사 |
| 2 | 시계 B 위치 — 회전하는 원판 위 | ハル | 시계 B는 책상 가운데 둥근 원판 위에 놓임 |
| 3 | 원판이 천천히 회전 중 | ヒナタ | 원판 아래 작은 모터 (실험 장치) |
| 4 | アイン教授 노트 「時間と速度の実験」 | ハル | 시간 지연 실험 의도 확인 |
| 5 | 회전 속도 측정 — 매우 빠름 | リオ | 분당 1000회전 (RPM=1000) |
| 6 | 결론 추리: 빠르게 움직이는 시계는 천천히 간다 | ヒナタ | 시간 지연 = 특수 상대성 이론 |

### 3-3. 진실 (アイン教授 자백)

「ほっほ、見事に見抜いたな。実はあれは儂の実験じゃ。」

- 시계 B는 회전 원판 위에 놓여 있어 빠른 속도로 움직이는 상태
- 빠르게 움직이는 시계는 **천천히 간다** = 시간 지연 (タイム·ディレイ)
- 차이는 매우 미세하지만, 정밀한 시계로는 측정 가능
- 「時間というのは、絶対ではない。動く速度によって、時間の流れが変わるのじゃ」

### 3-4. 학습 포인트 연결

教授: 「これが特殊相対性理論じゃ。光の速度に近づくほど、時間はゆっくり進む。」

→ 학습 자료 모달로 자연스럽게 유도.

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: '時間を操る秘密',
  subtitle: '動く時計は ゆっくり 進む',
  bg: 'bg_ch02_blackboard',
  lines: [
    { speaker: 'narrator',     text: '林檎博士の紹介で、隣町の物理学者を訪ねた。' },
    { speaker: 'hinata',       text: 'こちらが アイン教授の 研究所です。' },
    { speaker: 'rio',          text: 'うわぁ、黒板だらけ!数字いっぱい〜!' },
    { speaker: 'haru',         text: 'これ全部、物理の 公式…?' },
    { speaker: 'shiraga_ein',  text: 'ほっほ、よう来たな、若き探偵たちよ。わしが アイン教授じゃ。' },
    { speaker: 'haru',         text: 'はじめまして。林檎博士から お話を 聞いて 来ました。' },
    { speaker: 'shiraga_ein',  text: 'ふむふむ、ちょうど 困った 事が あってのう…' },
    { speaker: 'shiraga_ein',  text: '見て おくれ、この 二つの 時計を。' },
    { speaker: 'narrator',     text: '机の上に、まったく 同じ モデルの 懐中時計が 二つ 並んでいた。' },
    { speaker: 'shiraga_ein',  text: '同じ時計じゃ。同じ日に 同じ工場で 作られた。じゃが…' },
    { speaker: 'hinata',       text: 'え… 時刻が ずれています!時計Bが 約30秒 遅れている。' },
    { speaker: 'rio',          text: 'ええっ、なんで!?' },
    { speaker: 'shiraga_ein',  text: 'そうなのじゃ。毎日 30秒から 60秒ずつ 遅れていく。' },
    { speaker: 'shiraga_ein',  text: 'わしは 何も していない。じゃが 時計が 遅れるのじゃ。' },
    { speaker: 'haru',         text: '不思議だ… 同じ時計なのに、なぜ?' },
    { speaker: 'shiraga_ein',  text: '皆で この謎を 解いて はくれぬか?ふむ、興味深い 問題で あろう。' },
    { speaker: 'penta',        text: 'ペンッ!時間の 謎、ペン!' },
  ],
  cta: '🔍 調査を 始める',
},
```

### 4-2. steps

#### Step 1 — 시계 A·B 외관 비교

```javascript
{
  id: 'step1',
  title: '⏰ STEP 1: 二つの 時計を 比べる',
  bg: 'bg_ch02_blackboard',
  question: 'まず、二つの時計を よく 比べてみよう。何を 確認する?',
  options: [
    {
      label: '外観·モデル·製造元が 同じか 確認する',
      isCorrect: true,
      response: [
        { speaker: 'rio',    text: 'うん、見た目は 完全に 同じだよ!' },
        { speaker: 'haru',   text: '同じ メーカー、同じ モデル、同じ 製造日…' },
        { speaker: 'hinata', text: '物理的な 違いは ありません。じゃあ、なぜ 時刻が ずれる?' },
      ],
    },
    {
      label: '時計の 重さを 測る',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '重さは 同じだよ。製造元も 同じだから。' },
      ],
    },
    {
      label: '時計を 分解する',
      isCorrect: false,
      response: [
        { speaker: 'shiraga_ein', text: 'ふむ、分解は 最後の 手段じゃ。まずは 観察を。' },
      ],
    },
  ],
},
```

#### Step 2 — 시계 B의 위치 발견

```javascript
{
  id: 'step2',
  title: '👀 STEP 2: 時計の 置き場所を 観察',
  bg: 'bg_ch02_blackboard',
  question: 'ハルが 二つの 時計の 置き場所に 注目した。何が 違う?',
  options: [
    {
      label: '時計Bは 円い 板の 上に 置かれている',
      isCorrect: true,
      response: [
        { speaker: 'haru',   text: '時計Aは 普通に 机の 上だけど、時計Bは 円い 板の 上に 置いてある。' },
        { speaker: 'rio',    text: '本当だ!回転 木馬みたいな 板!' },
        { speaker: 'hinata', text: 'これは… 何かの 装置かもしれません。' },
      ],
    },
    {
      label: '時計Aの 場所だけ 確認',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '両方を 比べないと 差が わからないよ。' },
      ],
    },
  ],
},
```

#### Step 3 — 원판이 회전 중

```javascript
{
  id: 'step3',
  title: '🌀 STEP 3: 円い 板を よく 見る',
  bg: 'bg_ch02_blackboard',
  question: 'ヒナタが 円い 板を じっくり 観察した。何に 気づく?',
  options: [
    {
      label: '板が ゆっくり 回転している',
      isCorrect: true,
      response: [
        { speaker: 'hinata', text: 'あれ… 板が ゆっくり 回っています!' },
        { speaker: 'rio',    text: 'ホント!見えない くらい ゆっくりだけど、回ってる!' },
        { speaker: 'haru',   text: '板の 下に… モーターが ある!' },
        { speaker: 'hinata', text: '時計Bは 動いている 板の 上に 乗っていることに なります。' },
      ],
    },
    {
      label: '板の 色を 確認する',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '色は 関係 ないと 思います… もっと 動きに 注目しましょう。' },
      ],
    },
  ],
},
```

#### Step 4 — アイン教授의 노트

```javascript
{
  id: 'step4',
  title: '📓 STEP 4: 教授の ノートを 読む',
  bg: 'bg_ch02_blackboard',
  question: '机の 上の ノートを 開いた。何が 書いてある?',
  options: [
    {
      label: '「時間と 速度の 実験」と 書かれている',
      isCorrect: true,
      response: [
        { speaker: 'haru',        text: '「時間と 速度の 実験」… 教授、これは?' },
        { speaker: 'hinata',      text: '時間と 速度… 速く 動く 時計の 時間が 変わる?' },
        { speaker: 'shiraga_ein', text: 'ほっほっ、もう ほとんど 見抜いておるな。続けるが よい。' },
      ],
    },
    {
      label: 'ノートを 閉じて おく',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '手がかりは ノートに ありそう。読んでみよう。' },
      ],
    },
  ],
},
```

#### Step 5 — 회전 속도 측정

```javascript
{
  id: 'step5',
  title: '📏 STEP 5: 板の 回転速度を 測る',
  bg: 'bg_ch02_blackboard',
  question: '板が どれくらいの 速さで 回っているか 測ろう。',
  options: [
    {
      label: '回転計で 測る — RPM=1000',
      isCorrect: true,
      response: [
        { speaker: 'rio',    text: '1分間に 1000回も 回ってる!めっちゃ 速い!' },
        { speaker: 'haru',   text: '時計Bは 物凄い 速さで 動いていた。これが 30秒の 遅れの 原因?' },
        { speaker: 'hinata', text: '速く 動く 物の 時間が 遅れる…?ものすごく 不思議な 現象です。' },
      ],
    },
    {
      label: '回転を 止めて 測る',
      isCorrect: false,
      response: [
        { speaker: 'shiraga_ein', text: '止めて しまっては 観察の 意味が なくなってしまうぞ。回したまま 測るのじゃ。' },
      ],
    },
  ],
},
```

#### Step 6 — 결론 + アイン教授 자백

```javascript
{
  id: 'step6',
  title: '🧩 STEP 6: 推理を 組み立てる',
  bg: 'bg_ch02_blackboard',
  question: '全ての 手がかりが 揃った。教授に どう 伝える?',
  options: [
    {
      label: '「速く 動く 時計は ゆっくり 進む。これが 時間の 遅れ」',
      isCorrect: true,
      response: [
        { speaker: 'shiraga_ein', text: 'ふむ、見事じゃ!まさに 正解で あろう。' },
        { speaker: 'shiraga_ein', text: 'これが わしの 研究 — 特殊相対性理論じゃ。物が 速く 動くほど、その 時間は ゆっくり 進む。' },
        { speaker: 'shiraga_ein', text: '時計Bは 板の 上で 高速で 回転していた。だから 時計Aより 時間が ゆっくり 進んだのじゃ。' },
        { speaker: 'hinata',      text: '時間は 絶対 ではなく、速度によって 変わる…!' },
        { speaker: 'haru',        text: 'まさに 時間を 操る 秘密だった。' },
        { speaker: 'rio',         text: 'すごい!じゃあ もし 光の 速さで 動けば?' },
        { speaker: 'shiraga_ein', text: 'ふむふむ、興味深い 質問じゃ。光の 速さに 近づくほど、時間は 限りなく ゆっくりに なる。それが 宇宙の 秘密じゃ。' },
      ],
    },
    {
      label: '「時計Bが 古いから」',
      isCorrect: false,
      response: [
        { speaker: 'shiraga_ein', text: 'ふむ、同じ 製造日であろう?それは 違うのう。' },
      ],
    },
    {
      label: '「板が 磁気を 出している」',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '磁気だったら 一定で ずれるはず。毎日 違うのは おかしい。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch02_blackboard',
  lines: [
    { speaker: 'shiraga_ein', text: '皆の おかげで、わしの 実験も 説明できた。ありがとう のう。' },
    { speaker: 'shiraga_ein', text: 'では、相対性理論について もう 少し 学んでみるかな?' },
    { speaker: 'hinata',      text: 'はい!E=mc² の 公式も 気に なります。' },
    { speaker: 'rio',         text: '光の 速さって どれくらい 速いの?' },
    { speaker: 'haru',        text: '時間が 変わるって 普段は 感じないけど、宇宙の 真実だね。' },
    { speaker: 'shiraga_ein', text: 'ふむふむ、興味深い 質問じゃ。さあ、一緒に 学ぼう。' },
    { speaker: 'penta',       text: 'ペンッ!時間の 勉強、ペン!' },
  ],
  cta: '📚 学習資料を 開く',
},
```

---

## 5. 학습 자료 6섹션

### 5-1. concept

```javascript
concept: {
  title: '時間の 遅れと 特殊相対性理論',
  paragraphs: [
    '「時間は 誰にも 同じように 流れる」 — 普通は そう思います。しかし、アインシュタインは 1905年、「速く 動く 物の 時間は ゆっくり 進む」 という 驚くべき 事実を 発見しました。これを 特殊相対性理論 (とくしゅそうたいせいりろん) と 言います。',
    '事件 2 の 時計Bは 高速で 回転する 板の 上に 置かれていたため、時計Aより わずかに 時間が ゆっくり 進みました。これが 「時間の 遅れ」 です。',
    '日常の 速さでは 違いは 全く 感じられませんが、光の 速さ (約 30万 km/秒) に 近づくほど、時間の 流れは 大きく 変わります。GPS 衛星も この 効果を 計算に 入れて 設計されています。',
    'アインシュタインは また、「物質と エネルギーは 同じもの」 という 関係を E = mc² の 式で 表しました。原子力 発電も この 原理を 使っています。',
  ],
  highlight: '時間は 絶対ではなく、相対的。動く 速度によって 流れ方が 変わる。',
},
```

### 5-2. diagrams (SVG 4개)

#### 도해 1: 정지한 시계 vs 빠른 우주선의 시계

```
[SVG 설명]
- 왼쪽: 지구 위의 시계 (시침 12, 분침 0)
- 오른쪽: 빠른 우주선 안의 시계 (시침 12, 분침 5분 늦음)
- 두 시계 사이에 화살표 + 라벨: 「同じ時間が 経ったのに ずれている」
- 캡션: 「動く 物の 時間は ゆっくり 進む」
크기: 400 × 300, viewBox 적절
색상: 지구 파랑(#3498db), 우주선 회색(#7f8c8d), 강조 빨강(#e74c3c)
```

#### 도해 2: 光速 c = 절대 한계

```
[SVG 설명]
- 수평 축: 속도 (0 → c)
- 수직 축: 시간의 흐름 (0 → 보통 시간)
- 곡선: 속도가 c에 가까워질수록 시간 흐름이 0에 수렴
- 점선으로 c 표시: 「光の 速さ c = 299,792 km/s」
- 캡션: 「速度が 光速に 近づくほど、時間は 限りなく ゆっくり」
크기: 400 × 300
```

#### 도해 3: 쌍둥이 역설 일러스트

```
[SVG 설명]
- 왼쪽: 지구에 남은 형 (60세)
- 오른쪽: 우주여행에서 돌아온 동생 (30세)
- 두 사람 사이에 우주선 일러스트
- 캡션: 「光に 近い 速さで 旅した 双子の 弟は、地球で 待つ 兄より 若いまま 帰ってくる」
크기: 500 × 300
```

#### 도해 4: E = mc²

```
[SVG 설명]
- 좌측: 작은 질량 (m, 회색 점 1g)
- 중앙: 등호 + 「× c²」
- 우측: 거대한 에너지 (밝은 노란 폭발 모양)
- 아래: 계산 예시 「1g × (300,000,000)² ≈ 9 × 10^13 J ≈ 도쿄都 1日分の 電力」
- 캡션: 「物質と エネルギーは 同じもの。少量の 物質が 巨大な エネルギーに 変わる」
크기: 500 × 250
```

### 5-3. formulas + unitsTable

```javascript
formulas: [
  {
    name: '時間の 遅れ (時間膨張)',
    formula: "t' = t / √(1 − v²/c²)",
    formulaSimple: "t' = t / √(1 − v²/c²)",
    explanation: '動いている 物の 時間 t´ は、止まっている 観測者の 時間 t に対して、速度 v と 光速 c の 関係で 決まる。',
    note: '中学では 公式 そのものより 「動く 物の 時間は ゆっくり」 という 概念を 覚えれば 十分。',
  },
  {
    name: '質量と エネルギーの 等価性',
    formula: 'E = m × c²',
    formulaSimple: 'E = mc²',
    explanation: '質量 m が 光速 c の 2乗倍の エネルギー E に 等しい。',
    note: 'ごく 少量の 質量が 莫大な エネルギーに 変わる事を 意味する。原子力·太陽の 核融合は この 原理。',
  },
],
unitsTable: {
  title: '単位の まとめ',
  rows: [
    ['量', '記号', '単位', '意味'],
    ['時間', 't', '秒 (s)', '時の 流れの 長さ'],
    ['速度', 'v', 'm/s', '位置の 変化の 速さ'],
    ['光速', 'c', 'm/s', '約 3 × 10⁸ m/s (299,792,458 m/s)'],
    ['質量', 'm', 'kg', '物の 量'],
    ['エネルギー', 'E', 'J (ジュール)', '仕事の 量'],
  ],
},
```

### 5-4. flashcards (10장)

```javascript
flashcards: [
  { front: '特殊相対性理論 (とくしゅそうたいせいりろん)', back: 'アインシュタインが 1905年に 発表した 理論。動く 物の 時間が 遅れる ことを 説明。' },
  { front: '時間の 遅れ (時間膨張)', back: '速く 動く 物ほど、その 時間は ゆっくり 進む 現象。' },
  { front: '光速 c', back: '光の 速さ。約 30万 km/秒 (299,792,458 m/s)。宇宙の 速度の 上限。' },
  { front: 'E = mc²', back: '質量と エネルギーは 等価。質量 m に c² を かけた 量の エネルギーが 取り出せる。' },
  { front: '相対的 (そうたいてき)', back: '見る 立場 (基準) によって 違って 見える こと。時間や 長さは 相対的。' },
  { front: '光速度 不変の 原理', back: 'どんな 観測者から 見ても、光の 速さは いつも 同じ c。' },
  { front: '長さの 収縮', back: '動く 物の 長さは、止まっている 観測者から 見ると 進行方向に 縮んで 見える。' },
  { front: '双子の パラドックス', back: '光に 近い 速さで 旅した 双子の 一方が、地球に 残った 方より 若くなる。' },
  { front: 'GPS', back: '人工衛星の 時計の 遅れを 相対性理論で 計算。これなしでは 位置が ずれる。' },
  { front: 'アルベルト·アインシュタイン', back: '20世紀 最大の 物理学者 (1879-1955)。相対性理論·光電効果·E=mc² で ノーベル賞。' },
],
```

### 5-5. exercises (10문제)

```javascript
exercises: [
  {
    q: '次のうち、特殊相対性理論の 説明として 正しいのは?',
    options: [
      '止まっている 物の 時間が 遅れる',
      '速く 動く 物の 時間は ゆっくり 進む',
      '全ての 物は 同じ 時間を 持つ',
      '時間は 質量に 反比例 する',
    ],
    correct: 1,
    explanation: '事件 2 の 核心。動く 速度が 光速に 近づくほど、時間は ゆっくり 進む。',
  },
  {
    q: '光速 c の 値に 最も 近いのは?',
    options: ['3千 km/秒', '3万 km/秒', '30万 km/秒', '300万 km/秒'],
    correct: 2,
    explanation: '光速 c ≈ 299,792 km/秒 ≈ 30万 km/秒。',
  },
  {
    q: 'E = mc² が 意味する ことは?',
    options: [
      'エネルギーは 質量に 比例 する',
      '質量と エネルギーは 同じ もの',
      '光速は 質量 × 2',
      '時間は 質量で 決まる',
    ],
    correct: 1,
    explanation: '質量 m に c² を かけた 量の エネルギーが 内包されている。物質 = エネルギー。',
  },
  {
    q: '事件 2 の 「止まった 時計」 トリックの 正体は?',
    options: [
      '時計が 壊れていた',
      '高速 回転する 円盤の 上に 置かれて 時間が 遅れた',
      '電池が 切れかけていた',
      'アイン教授が 針を 動かした',
    ],
    correct: 1,
    explanation: '事件 2 の 核心。速く 動く 物の 時間は ゆっくり 進む。',
  },
  {
    q: '光に 近い 速さで 5年 旅した 双子の 弟が 地球に 戻ったら、地球の 兄は 何年 過ぎている?',
    options: [
      '同じ 5年',
      '5年より ずっと 長い 時間',
      '5年より 短い 時間',
      '時間が 流れていない',
    ],
    correct: 1,
    explanation: '双子の パラドックス。動いていた 弟の 時間が 遅く 流れたため、兄の 時間が より 長く 経過。',
  },
  {
    q: '次のうち、相対性理論を 実用化している 技術は?',
    options: ['電子レンジ', 'GPS', 'テレビ', '冷蔵庫'],
    correct: 1,
    explanation: 'GPS 衛星は 高速で 動く + 重力が 地上と 異なる → 相対性理論で 補正 しないと 位置が ずれる。',
  },
  {
    q: '相対性理論を 発表 したのは 誰?',
    options: ['ニュートン', 'アインシュタイン', 'ガリレオ', 'マクスウェル'],
    correct: 1,
    explanation: 'アルベルト·アインシュタイン (1879-1955) が 1905年 (特殊) と 1915年 (一般) に 発表。',
  },
  {
    q: '光速度 不変の 原理 とは?',
    options: [
      '光は 必ず 直進する',
      'どんな 観測者から 見ても 光の 速さは 同じ',
      '光は 物体で 反射する',
      '光は 真空中で 最も 速い',
    ],
    correct: 1,
    explanation: '相対性理論の 出発点。どんな 速度で 動いていても、光は いつも c で 観測される。',
  },
  {
    q: '時計B が 1日 30秒 遅れるのは、何が 原因 だった?',
    options: [
      '時計B が 高速 回転 する 円盤の 上に いた',
      '時計B の 電池が 弱かった',
      '時計B が 古い モデル だった',
      '時計B が 磁石の 近くに あった',
    ],
    correct: 0,
    explanation: '高速で 動く 時計は、止まっている 時計より ゆっくり 進む。事件の 核心トリック。',
  },
  {
    q: 'アインシュタインが ノーベル賞を 受賞した 理由は?',
    options: [
      '特殊相対性理論',
      '一般相対性理論',
      '光電効果 の 説明',
      'E = mc²',
    ],
    correct: 2,
    explanation: '意外にも 相対性理論 そのものでは なく、光電効果 (光が 金属から 電子を 出す 現象) の 説明で 1921年に 受賞。',
  },
],
```

### 5-6. tips (8포인트)

```javascript
tips: [
  { title: '①「絶対」 ではなく 「相対」', body: '時間や 長さは、見る 立場によって 違って 見える。これが 相対性 の 本質。' },
  { title: '② 動くほど 時間は 遅れる', body: '速く 動くほど、その 物の 時間は ゆっくり 進む。日常では 感じないが、光速 近くで 顕著。' },
  { title: '③ 光速 c は 宇宙の 限界', body: '何も 光より 速くは なれない。c は 約 30万 km/秒。覚えておくと テストで 役立つ。' },
  { title: '④ E = mc² の 意味', body: 'ごく 少量の 質量が 莫大な エネルギーに 変わる。原子力·太陽の 核融合が 例。' },
  { title: '⑤ 双子の パラドックス', body: '光に 近い 速さで 旅した 双子の 一方は 若くなる。SF 映画で よく 出てくる。' },
  { title: '⑥ GPS は 相対性理論を 使う', body: 'GPS が 正確なのは 相対性理論で 衛星の 時計を 補正 しているから。' },
  { title: '⑦ 中学 レベルでは 「概念」 重視', body: '式 そのものより、「動くと 時間が 遅れる」 「質量=エネルギー」 を しっかり 覚える。' },
  { title: '⑧ アインシュタイン = 光電効果 で ノーベル賞', body: '意外な 豆知識。相対性理論 そのもの ではない。テストの 引っかけ問題に 注意。' },
],
```

---

## 6. caseQuiz (5문제)

```javascript
caseQuiz: [
  {
    q: '事件 2 で 時計B が 遅れていた 本当の 理由は?',
    options: [
      '時計B が 壊れていた',
      '高速 回転 する 円盤の 上に 置かれて 時間が 遅れた',
      'アイン教授 が 針を 動かした',
      '電池切れ',
    ],
    correct: 1,
  },
  {
    q: '速く 動く 物の 時間は どうなる?',
    options: ['速く 進む', 'ゆっくり 進む', '止まる', '逆に 戻る'],
    correct: 1,
  },
  {
    q: 'E = mc² の m は 何を 表す?',
    options: ['時間', '速度', '質量', '長さ'],
    correct: 2,
  },
  {
    q: '光の 速さ c は 約 何 km/秒?',
    options: ['3万', '30万', '300万', '3千万'],
    correct: 1,
  },
  {
    q: 'アインシュタインの 国籍は?',
    options: ['アメリカ', 'ドイツ', 'スイス', '全部 該当 (生涯で 移った)'],
    correct: 3,
  },
],
```

**별점 기준** (사건 1과 동일):
- 5/5 → ⭐⭐⭐
- 4/5 → ⭐⭐
- 3/5 → ⭐
- 2/5 이하 → 재도전 권장

---

## 7. 데이터 파일 갱신

### 7-1. data/series4-scientists.js

`SCIENTISTS_STORY` 배열의 **id=2 entry만** placeholder에서 풀콘텐츠로 교체. 다른 9개(id=1, id=3~10)는 절대 건드리지 말 것.

```javascript
// 사건 2 부분 교체 (현재 comingSoon: true → false)
SCIENTISTS_STORY[1] = {
  id: 2,
  title: '時間を操る秘密',
  subtitle: '動く時計は ゆっくり 進む',
  theme: '特殊相対性理論·時間の遅れ',
  illustration: SCIENTISTS_CASE_IMAGES[2],
  charKey: 'shiraga_ein',
  sceneKey: 'bg_ch02_blackboard',
  comingSoon: false,
  learnRef: 'scientists_case02',
  
  intro: { /* §4-1 그대로 */ },
  steps: [ /* §4-2의 step1~step6 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6의 5문제 */ ],
  note: { 
    title: '第2事件 時間を 操る 秘密', 
    desc: '高速 回転する 円盤の 上で 遅れた 時計。アインシュタインの 特殊相対性理論 — 動く 物の 時間は ゆっくり 進む — を 学んだ 第二歩。' 
  },
};
```

**중요**: 배열 인덱스 — 사건 2는 `SCIENTISTS_STORY[1]` (0-indexed). 사건 1과 같은 패턴.

### 7-2. data/series4-scientists-learn.js

기존 `SCIENTISTS_LEARN` 객체에 `scientists_case02` 키 **추가** (scientists_case01은 그대로 보존).

```javascript
const SCIENTISTS_LEARN = {
  scientists_case01: { /* 이미 작성됨, 그대로 보존 */ },
  scientists_case02: {  // 신규 추가
    title: '時間の 遅れと 特殊相対性理論',
    subtitle: '事件 2 で 学んだ こと',
    concept: { /* §5-1 */ },
    diagrams: [ /* §5-2의 SVG 4개 */ ],
    formulas: [ /* §5-3 */ ],
    unitsTable: { /* §5-3 */ },
    flashcards: [ /* §5-4 */ ],
    exercises: [ /* §5-5 */ ],
    tips: [ /* §5-6 */ ],
  },
};
```

### 7-3. 엔진 코드 — 변경 없음

✅ `engine/scientists-learn.js` — 사건 1에서 이미 정착, 그대로 활용
✅ `engine/detectives-B.js` — `startScientistsCase`도 사건 1에서 풀버전 완성, 그대로
✅ `index.html` — 스크립트 등록 그대로

---

## 8. 검증 체크리스트

### 8-1. 콘솔 검증

```javascript
SCIENTISTS_STORY[1].id                                    // 2
SCIENTISTS_STORY[1].title                                 // "時間を操る秘密"
SCIENTISTS_STORY[1].comingSoon                            // false
SCIENTISTS_STORY[1].learnRef                              // "scientists_case02"
SCIENTISTS_STORY[1].intro.lines.length                    // 17
SCIENTISTS_STORY[1].steps.length                          // 6
SCIENTISTS_STORY[1].steps[0].options.length               // 3
SCIENTISTS_STORY[1].steps[5].options[0].response.length   // 7
SCIENTISTS_STORY[1].ending.lines.length                   // 7
SCIENTISTS_STORY[1].caseQuiz.length                       // 5

SCIENTISTS_LEARN.scientists_case01                        // 객체 (보존 확인)
SCIENTISTS_LEARN.scientists_case02                        // 객체 (신규)
SCIENTISTS_LEARN.scientists_case02.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case02.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case02.diagrams.length        // 4

// 사건 1·3~10 회귀 확인
SCIENTISTS_STORY[0].comingSoon                            // false (사건 1 그대로)
SCIENTISTS_STORY[2].comingSoon                            // true (사건 3 placeholder)
SCIENTISTS_STORY[9].comingSoon                            // true (보스 placeholder)
```

### 8-2. 시각 검증 (브라우저)

- [ ] 시리즈 4 챕터 그리드 → 사건 2 카드 클릭 가능 (잠금 풀린 상태)
- [ ] intro 17줄 진행 자연스러움
- [ ] アイン教授 등장 시 자산 PNG (shiraga_ein.png) 정상 표시
  - ⚠ 12개 NPC PNG 알파 처리됐으니 shiraga_ein 외곽 깔끔 확인
- [ ] STEP 1~6 정상 진행 (정답 → 다음, 오답 → 재시도)
- [ ] ending 후 학습 모달 자동 호출
- [ ] 학습 6탭 모두 표시
- [ ] SVG 도해 4개 표시 (E=mc² 도해 특히 확인)
- [ ] 暗記 카드 10장 뒤집기
- [ ] 객관식 10문제 풀이
- [ ] caseQuiz 5문제 → 별점 → 챕터 그리드 복귀
- [ ] 사건 2 클리어 마크 (`scientistsCleared[1] = true`)

### 8-3. 회귀 테스트

- [ ] 시리즈 1~3 정상 (특히 시리즈 3, 자녀 사용 중)
- [ ] 시리즈 5~11 정상
- [ ] 시리즈 4 사건 1 정상 (caseQuiz 5문제 + 학습 6탭)
- [ ] 시리즈 4 사건 3~10 placeholder 그대로 (`comingSoon: true`)
- [ ] 영어학습 탭 정상
- [ ] 채팅 시스템 정상

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| `SCIENTISTS_STORY[0]` (사건 1) 수정 | 이미 완성 + push됨 |
| `SCIENTISTS_STORY[2]~[9]` (사건 3~10) 수정 | 각각 별도 명세서에서 진행 |
| `SCIENTISTS_LEARN.scientists_case01` 수정 | 이미 작성됨, 보존 |
| `engine/scientists-learn.js` 수정 | 사건 1에서 정착, 그대로 활용 |
| `data/series3-science.js` 수정 | 시리즈 3 자녀 사용 중, untouched |
| 자산 PNG 재처리 | 이미 알파 변환 완료 (commit 02dea28). hinata 추후 처리 별도 |
| 실명 「アインシュタイン」을 アイン教授 대사로 사용 | 가상 캐릭터 정체성 유지 |
| 채팅 시스템·PWA·영어학습 수정 | 무관 |

---

## 10. 작업 순서

```
Step 1: 사건 1 데이터 구조 정독 (참조)
  - data/series4-scientists.js의 SCIENTISTS_STORY[0]
  - data/series4-scientists-learn.js의 scientists_case01
  → 사건 2 동일 패턴 적용

Step 2: data/series4-scientists.js 사건 2만 갱신
  - SCIENTISTS_STORY[1] 교체
  - 사건 1·3~10 그대로
  - 콘솔 검증

Step 3: data/series4-scientists-learn.js에 scientists_case02 추가
  - 기존 scientists_case01 보존
  - scientists_case02 키 추가
  - 콘솔 검증

Step 4: 브라우저 시각 검증 (§8-2)
  - 사건 2 풀 플로우 (intro → STEP → ending → 학습 → caseQuiz)
  - 사건 1 회귀 확인

Step 5: 회귀 테스트 (§8-3)
  - 시리즈 1~3, 5~11 + 영어학습 + 채팅

Step 6: git commit + push
  - commit msg: "feat(series04/case02): add Einstein/relativity content"

Step 7: 완료 보고
  - 사건 2 활성화
  - 자녀 도쿄 방문 5/15 시 사건 1 + 사건 2 모두 플레이 가능
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE02_SPEC.md를 정독하고, 시리즈 4 사건 2 「時間を操る秘密」 
본격 콘텐츠를 작성해줘.

[핵심 원칙]
- 사건 1 (SCIENTISTS_STORY[0], SCIENTISTS_LEARN.scientists_case01) 패턴 정확히 mirror.
- 엔진 코드(engine/scientists-learn.js, engine/detectives-B.js) 신규 작성 불필요. 
  사건 1에서 정착된 시스템 그대로 활용.
- SCIENTISTS_STORY[1] entry만 placeholder에서 풀콘텐츠로 교체.
- SCIENTISTS_LEARN에 scientists_case02 키만 추가, scientists_case01은 보존.

[작업 순서]
§10의 7단계 그대로. 각 step 후 §8-1의 콘솔 검증으로 silent failure 방지.

[금지 사항]
- 사건 1 (SCIENTISTS_STORY[0]) 절대 수정 X
- 사건 3~10 (SCIENTISTS_STORY[2~9]) placeholder 그대로
- 시리즈 3 untouched (자녀 사용 중)
- engine 코드 수정 X (사건 1에서 정착)
- 자산 PNG 재처리 X (이미 commit 02dea28에 처리됨)

[회귀 테스트]
push 전 시리즈 1~3, 5~11 + 사건 1 + 영어학습 + 채팅 정상 동작 확인.

commit msg 예: "feat(series04/case02): add Einstein/relativity content"
```

---

**END OF SPEC**

이 명세서는 시리즈 4 사건 2의 본격 콘텐츠 산출물입니다. 사건 1과 동일한 시스템 위에 콘텐츠 데이터만 추가하므로, silent failure 위험이 낮고 작업 시간도 짧습니다 (예상 1~1.5시간).
