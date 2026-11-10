# SERIES 4 — CASE 8 CONTENT SPEC
## 「見えない力の正体」 — ファラデー·電磁気誘導

**작성일**: 2026-06-24
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 사건**: 사건 1~7 완성

**핵심 (사건 4~7 패턴 그대로)**:
- ⭐ §7-3 SCIENTISTS_SPEAKER_MAP에 `faraday_coil` 등록 (데이터보다 먼저).
- ✅ NPC PNG 이미 준비됨 (`faraday_coil.png`, RGBA).

---

## 0. PRE-FLIGHT
- [ ] 사건 1~7 정상
- [ ] SCIENTISTS_STORY[7] (id=8)가 placeholder (comingSoon: true)
- [ ] SCIENTISTS_LEARN에 scientists_case01~07만 존재
- [ ] assets/characters/series04/faraday_coil.png 존재 (RGBA)
- [ ] git 깨끗

---

## 1. 사건 8 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 8 |
| 제목 | **見えない力の正体 (みえない ちからの しょうたい)** |
| 부제 | 磁石で 電気が 生まれる? |
| 학습 테마 | 電磁気誘導 / 磁場 / 電流 / コイル / 発電의 원리 |
| 학습 깊이 | 중학 理科(物理) + 比喩 중심 |
| NPC | ファラデー (faraday_coil) |
| 동행 | ハル + リオ + ヒナタ + ペンタ |
| 배경 | bg_ch08_electricity (전기 실험실) |
| 트릭 | 「磁石で 電気が 生まれる?」 — 자석을 코일 안에서 움직이면 전류 발생 (멈추면 안 생김) |
| 플레이타임 | 12~15분 |

---

## 2. ファラデー 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 19세기풍 의상 + 코일·자석 (자산 PNG faraday_coil.png 그대로) |
| 나이 | 40대 |
| 직업 | 실험 물리학자·화학자 |
| 성격 | 호기심 왕성, 손으로 직접 실험. 정규 교육은 적지만 끈질긴 탐구가 |
| 1인칭 | 「私 (わたし)」 |
| 말투 | 「~だよ」「やってみよう」「不思議だろう?」「実験で 確かめるんだ」 |
| 좋아하는 것 | 손으로 하는 실험, 자석과 전선, 어린이에게 보여주기 |
| 모티프 | 마이클 패러데이 (전자기 유도 발견 1831, 발전기·전동기 원리) |
| 핵심 대사 | 「目に 見えない 力 でも、 実験すれば ちゃんと 見えてくるんだよ」 |
| **표시명** | **ファラデー** |

**중요**: 「ファラデー」는 성씨로 호칭 가능. 풀네임·생몰년은 학습 자료에서만 (「マイケル·ファラデー, 1791-1867」).

---

## 3. 미스터리 트릭 「磁石で 電気が 生まれる?」

### 3-1. 핵심 미스터리

ファラデー의 실험실. 전선을 둘둘 감은 코일과 전류계(바늘 장치). 코일 옆에 자석. 전지(배터리)는 연결되어 있지 않은데, **어떤 순간에만 전류계 바늘이 움직인다**. 전기를 만드는 전지가 없는데 어떻게 전류가 생기는가?

「電池も ないのに、 針が 動く ことが あるんだ。 なぜだと 思う?」

### 3-2. 단서 시퀀스

| Step | 단서 | 발견자 | 의미 |
|---|---|---|---|
| 1 | 코일·자석·전류계 구성 확인 (전지 없음) | リオ | 전원이 없는데 전류계가 있음 |
| 2 | 자석을 가만히 둘 때 → 바늘 안 움직임 | ハル | 정지 상태에선 전류 없음 |
| 3 | 자석을 코일에 넣을 때 → 바늘 움직임 | ヒナタ | 움직일 때만 전류 발생 |
| 4 | 자석을 뺄 때 → 바늘 반대로 움직임 | ハル | 방향에 따라 전류 방향도 바뀜 |
| 5 | ファラデー 「변화가 핵심」 노트 | ヒナタ | 자석의 「움직임=변화」가 전류를 만듦 |
| 6 | 결론: 전자기 유도 | 3인 협력 | 자기장의 변화가 전류를 낳음 |

### 3-3. 진실 (ファラデー 자백)

「お見事だよ! まさに 私が 見つけた 「電磁誘導」 なんだ。」

- 코일 안의 자석이 **움직일 때(자기장이 변할 때)**만 전류 발생
- 가만히 있으면 자기장이 일정 → 전류 안 생김
- 넣을 때와 뺄 때 전류 방향이 반대 → 변화의 방향이 중요
- 「자석의 움직임(자기장의 변화)이 전기를 만든다」 = **電磁誘導 (でんじゆうどう)**
- 이것이 **発電機**의 원리 — 오늘날 모든 전기가 여기서 나옴
- 「目に 見えない 力 でも、 実験すれば 見えてくるんだよ」

### 3-4. 학습 포인트 연결

ファラデー: 「磁石と コイルから 電気が 生まれる。 この 発見が、 世界を 電気で 照らしたんだ」
→ 학습 자료 (전자기 유도·자기장·발전 원리).

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: '見えない力の正体',
  subtitle: '磁石で 電気が 生まれる?',
  bg: 'bg_ch08_electricity',
  lines: [
    { speaker: 'narrator',     text: 'ガリレオの 紹介で、 不思議な 装置だらけの 実験室を 訪ねた。' },
    { speaker: 'hinata',       text: 'こちらが ファラデーさんの 実験室 です。 コイルと 磁石が たくさん…' },
    { speaker: 'rio',          text: 'うわぁ、 グルグル 巻いた 電線! 何に 使うの?' },
    { speaker: 'haru',         text: '針の ついた 装置… 電流計 かな。 でも 電池が 見当たらない。' },
    { speaker: 'faraday_coil', text: 'よく 来たね! 私が ファラデーだ。 面白い 謎が あってね。' },
    { speaker: 'faraday_coil', text: 'この コイルと 電流計。 電池は 繋いで いない。 なのに…' },
    { speaker: 'narrator',     text: 'ファラデーが 磁石を 手に 取ると、 時々 電流計の 針が ピクッと 動いた。' },
    { speaker: 'rio',          text: 'あっ、 針が 動いた! 電池ないのに なんで!?' },
    { speaker: 'haru',         text: '電気を 作る 電池が ない のに、 電流が 流れてる…?' },
    { speaker: 'faraday_coil', text: 'そう、 それが 謎なんだ。 でも、 いつも 動く わけじゃ ない。' },
    { speaker: 'hinata',       text: '動く ときと 動かない とき が ある… 何が 違うんでしょう。' },
    { speaker: 'faraday_coil', text: 'よく 気づいた。 そこに 答えが 隠れて いるんだよ。' },
    { speaker: 'rio',          text: '魔法で 電気が 出てるの?' },
    { speaker: 'faraday_coil', text: 'ふふ、 魔法じゃ ない。 目に 見えない 力 でも、 実験すれば 見えてくるんだ。' },
    { speaker: 'faraday_coil', text: '電池なしで 電流が 流れる — その 秘密を 解いて くれるか?' },
    { speaker: 'haru',         text: 'はい! いつ 針が 動くのか、 調べて みます。' },
    { speaker: 'penta',        text: 'ペンッ! 見えない 電気、 探すペン!' },
  ],
  cta: '⚡ 実験を 始める',
},
```

### 4-2. steps

#### Step 1 — 구성 확인 (전지 없음)

```javascript
{
  id: 'step1',
  title: '🔌 STEP 1: 装置を 確認する',
  bg: 'bg_ch08_electricity',
  question: 'まず 装置を よく 見よう。 何が ある?',
  options: [
    {
      label: 'コイル(巻いた 電線)・電流計・磁石。 でも 電池は ない',
      isCorrect: true,
      response: [
        { speaker: 'rio',          text: 'グルグル 電線(コイル)と、 針の 装置(電流計)、 そして 磁石!' },
        { speaker: 'haru',         text: 'でも 電池は どこにも ない… 電源 なしで 電流?' },
        { speaker: 'hinata',       text: '電池が ない のに 電流が 流れる… ここが 謎の 核心 ですね。' },
        { speaker: 'faraday_coil', text: 'その通り。 電源なしで 電流を 生む — それが この 実験の 不思議さだ。' },
      ],
    },
    {
      label: '電池を 探して 繋ぐ',
      isCorrect: false,
      response: [
        { speaker: 'faraday_coil', text: '電池は 使わないんだ。 それでも 電流が 流れる 理由を 探そう。' },
      ],
    },
  ],
},
```

#### Step 2 — 정지 상태 (전류 없음)

```javascript
{
  id: 'step2',
  title: '🧲 STEP 2: 磁石を 止めて おく',
  bg: 'bg_ch08_electricity',
  question: '磁石を コイルの 中に 入れた まま、 動かさずに 置く。 針は?',
  options: [
    {
      label: '針は 動かない — 止まっている と 電流は 流れない',
      isCorrect: true,
      response: [
        { speaker: 'haru',         text: '磁石を 入れた まま 止めると… 針は ピクリとも しない。' },
        { speaker: 'rio',          text: '磁石が あるのに 電流ゼロ? じっとしてると ダメなんだ。' },
        { speaker: 'hinata',       text: '「磁石が ある」 だけでは 足りない… 何かが 必要 ですね。' },
        { speaker: 'faraday_coil', text: 'いい 観察だ。 「ある」 だけでは 電流は 生まれない。' },
      ],
    },
    {
      label: '針は ずっと 動き続ける',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '止めて おくと 針は 動かないよ。 もう一度 見てみよう。' },
      ],
    },
  ],
},
```

#### Step 3 — 자석을 넣을 때 (전류 발생)

```javascript
{
  id: 'step3',
  title: '➡️ STEP 3: 磁石を 動かして 入れる',
  bg: 'bg_ch08_electricity',
  question: '今度は 磁石を コイルに スッと 入れて みる。 針は?',
  options: [
    {
      label: '入れる 瞬間に 針が 動く — 動かす と 電流が 流れる',
      isCorrect: true,
      response: [
        { speaker: 'hinata',       text: '磁石を 入れる 瞬間、 針が グイッと 動きました!' },
        { speaker: 'rio',          text: '動かすと 出た! さっきと 全然 違う!' },
        { speaker: 'haru',         text: '「止まってる」 と ダメで、 「動かす」 と 電流… 動きが 鍵だ!' },
        { speaker: 'faraday_coil', text: 'そう! 磁石を 動かす — そこに 秘密が あるんだよ。' },
      ],
    },
    {
      label: '入れても 何も 起きない',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: 'いいえ、 入れる 瞬間に 針が 動きます。 よく 見て。' },
      ],
    },
  ],
},
```

#### Step 4 — 자석을 뺄 때 (반대 방향)

```javascript
{
  id: 'step4',
  title: '⬅️ STEP 4: 磁石を 抜いて みる',
  bg: 'bg_ch08_electricity',
  question: '磁石を コイルから 抜く とき、 針は どうなる?',
  options: [
    {
      label: '抜く ときは 針が 反対 方向に 動く',
      isCorrect: true,
      response: [
        { speaker: 'haru',         text: '抜く ときは… 針が さっきと 逆 方向に 振れた!' },
        { speaker: 'rio',          text: '入れると こっち、 抜くと あっち! 方向が 逆!' },
        { speaker: 'hinata',       text: '動かす 向きで、 電流の 向きも 変わるんですね。' },
        { speaker: 'faraday_coil', text: 'お見事。 「変化の 向き」 が 電流の 向きを 決めるんだ。' },
      ],
    },
    {
      label: '抜く ときも 同じ 方向',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '抜く ときは 逆 方向に 動くよ。 入れる ときと 比べてみて。' },
      ],
    },
  ],
},
```

#### Step 5 — ファラデー의 노트 (변화가 핵심)

```javascript
{
  id: 'step5',
  title: '📓 STEP 5: ファラデーの 実験ノート',
  bg: 'bg_ch08_electricity',
  question: 'ファラデーの ノートを 開いた。 何が 書いてある?',
  options: [
    {
      label: '「磁石が 動く=磁場が 変化する とき だけ 電流が 生まれる」',
      isCorrect: true,
      response: [
        { speaker: 'hinata',       text: '「磁場が 変化する とき だけ 電流が 生まれる」…!' },
        { speaker: 'haru',         text: '磁石が 動く = コイルを 通る 磁力(磁場)が 変わる… その 変化が 電流を 作る!' },
        { speaker: 'rio',          text: 'だから 止めてると ダメで、 動かすと 出るんだ!' },
        { speaker: 'faraday_coil', text: 'その通り。 「変化」 こそが 電気を 生む 源 なんだよ。' },
      ],
    },
    {
      label: 'ノートを 閉じる',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: 'ファラデーさんの 記録に ヒントが あります。 読みましょう。' },
      ],
    },
  ],
},
```

#### Step 6 — 결론 + ファラデー 자백

```javascript
{
  id: 'step6',
  title: '🧩 STEP 6: 推理を 組み立てる',
  bg: 'bg_ch08_electricity',
  question: '全ての 手がかりが 揃った。 ファラデーに どう 伝える?',
  options: [
    {
      label: '「磁石を 動かして 磁場が 変化する とき、 コイルに 電流が 生まれる」',
      isCorrect: true,
      response: [
        { speaker: 'faraday_coil', text: 'お見事だよ! まさに 私が 見つけた 「電磁誘導」 なんだ。' },
        { speaker: 'faraday_coil', text: '磁石が 動くと、 コイルを 通る 磁場が 変わる。 その 変化が 電流を 生むんだ。' },
        { speaker: 'faraday_coil', text: '止まって いると 磁場は 一定。 だから 電流は 流れない。 「変化」 が 鍵 なんだ。' },
        { speaker: 'faraday_coil', text: '入れる·抜く で 向きが 逆に なるのも、 変化の 向きが 違う から だよ。' },
        { speaker: 'hinata',       text: '目に 見えない 磁場の 変化が、 電気を 生んでいた んですね。' },
        { speaker: 'haru',         text: 'これって… 動かし続ければ、 電気を 作り続けられる?' },
        { speaker: 'faraday_coil', text: '鋭い! それが まさに 「発電機」 の 原理だ。 今の 世界の 電気は、 ほとんど これで 作られる。' },
        { speaker: 'rio',          text: 'すごい! 磁石を 動かすだけで 世界を 明るく できるんだ!' },
      ],
    },
    {
      label: '「磁石が ある だけで 電流が 流れる」',
      isCorrect: false,
      response: [
        { speaker: 'faraday_coil', text: '止めて おくと 流れないよ。 「動かす(変化)」 が 必要なんだ。' },
      ],
    },
    {
      label: '「コイルが 勝手に 電気を 作る」',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'コイルだけ じゃ ダメ。 磁石の 動き(磁場の 変化)が いるよ。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch08_electricity',
  lines: [
    { speaker: 'faraday_coil', text: '皆の おかげで、 電磁誘導を きちんと 説明 できた。 ありがとう。' },
    { speaker: 'faraday_coil', text: '目に 見えない 力 でも、 実験すれば 必ず 見えてくる。 それが 科学の 面白さだ。' },
    { speaker: 'rio',          text: '磁石を 動かすだけで 電気! 発電所も これなんだね!' },
    { speaker: 'haru',         text: '磁場の 変化が 電流を 生む… 見えない 力 だけど、 確かに ある。' },
    { speaker: 'hinata',       text: 'スマホも 電車も、 この 発見の おかげ ですね。' },
    { speaker: 'faraday_coil', text: 'その通り。 電気と 磁気の 話を、 もう 少し 学んで みよう。' },
    { speaker: 'penta',        text: 'ペンッ! 電気の 勉強、 ペン!' },
  ],
  cta: '📚 学習資料を 開く',
},
```

---

## 5. 학습 자료 6섹션

### 5-1. concept

```javascript
concept: {
  title: '電磁誘導と 発電の 原理',
  paragraphs: [
    '事件 8 で 電池も ないのに 流れた 電流 — その 正体は 「電磁誘導 (でんじゆうどう)」 でした。 ファラデー は 1831年、 コイルの 中で 磁石を 動かすと 電流が 生まれる ことを 発見 しました。',
    '磁石の まわりには、 目に 見えない 「磁場 (じば)」 が あります。 磁石を コイルに 近づけたり 遠ざけたり すると、 コイルを 通る 磁場が 「変化」 します。 この 変化が、 コイルに 電流を 生み出すのです。',
    '大切なのは 「変化」 です。 磁石を 止めて おくと 磁場は 一定で、 電流は 流れません。 動かす とき だけ 電流が 生まれ、 入れる·抜く で 向きが 逆に なります。 「変化の 速さ·大きさ」 が 電流の 強さを 決めます。',
    'この 発見が、 私たちの 暮らしを 一変させました。 磁石と コイルを 回し続けて 電気を 作る 装置が 「発電機」 です。 火力·水力·風力·原子力 — どんな 発電所も、 最後は この 電磁誘導で 電気を 作って います。 目に 見えない 力の 発見が、 世界を 電気で 照らしたのです。',
  ],
  highlight: '磁場の 「変化」 が 電流を 生む (電磁誘導)。 これが あらゆる 発電の 原理。',
},
```

### 5-2. diagrams (SVG 4개)

#### 도해 1: 코일·자석·전류계 (정지 vs 운동) (500×300)
- 좌: 자석 정지 → 바늘 0
- 우: 자석 운동(화살표) → 바늘 흔들림
- 캡션: 「止まると 0、 動かすと 電流」

#### 도해 2: 자기장과 그 변화 (500×280)
- 자석 주위 자기력선
- 코일에 가까워질 때/멀어질 때 통과 자기장 변화 화살표
- 캡션: 「磁場の 変化が 電流を 生む」

#### 도해 3: 넣을 때 vs 뺄 때 전류 방향 (450×300)
- 넣을 때: 전류 →
- 뺄 때: 전류 ←
- 캡션: 「変化の 向き ↔ 電流の 向き」

#### 도해 4: 발전기의 원리 (500×300)
- 자석(또는 코일) 회전 → 지속적 자기장 변화 → 지속적 전류
- 발전소→가정 전기 흐름 간략화
- 캡션: 「回し続ければ 電気が できる = 発電機」

### 5-3. formulas + unitsTable

```javascript
formulas: [
  {
    name: '電磁誘導의 조건',
    formula: '磁場의 変化 → コイル에 電流 発生',
    formulaSimple: '変化 = 電流',
    explanation: '코일을 통과하는 자기장이 변할 때만 전류 발생. 변하지 않으면(자석 정지) 전류 없음.',
    note: '「있다」가 아니라 「변한다」가 핵심. 패러데이의 전자기 유도.',
  },
  {
    name: '誘導電流의 성질',
    formula: '変化 빠를수록·클수록 → 電流 강함 / 変化 방향 ↔ 電流 방향',
    formulaSimple: '速い変化 = 強い電流',
    explanation: '자석을 빨리 움직이거나 강한 자석일수록 전류가 큼. 넣을 때와 뺄 때 전류 방향이 반대.',
    note: '발전기는 이 원리로 자석/코일을 계속 회전시켜 전기 생산.',
  },
],
unitsTable: {
  title: '電磁気 키워드 정리',
  rows: [
    ['용어', '의미', '예시·비고'],
    ['電磁誘導 (でんじゆうどう)', '자기장 변화로 전류가 생기는 현상',   '패러데이 발견(1831)'],
    ['磁場 (じば)',           '자석 주위의 눈에 안 보이는 힘의 영역',  '자기력선으로 표현'],
    ['コイル',               '전선을 여러 번 감은 것',               '감은 횟수 많을수록 전류 큼'],
    ['電流 (でんりゅう)',     '전기의 흐름',                         '전류계 바늘로 측정'],
    ['発電機 (はつでんき)',   '자기장 변화로 전기를 만드는 장치',     '발전소의 핵심'],
    ['変化 (へんか)',         '자기장이 달라지는 것 (전자기 유도의 조건)', '자석을 움직여 만듦'],
  ],
},
```

### 5-4. flashcards (10장)

```javascript
flashcards: [
  { front: '電磁誘導 (でんじゆうどう)', back: '자기장의 변화로 코일에 전류가 생기는 현상. 패러데이가 1831년 발견.' },
  { front: '磁場 (じば)',           back: '자석 주위의 눈에 안 보이는 힘의 영역. 변하면 전류를 만듦.' },
  { front: 'コイル',               back: '전선을 여러 번 감은 것. 감은 횟수가 많을수록 유도 전류가 큼.' },
  { front: '電流 (でんりゅう)',     back: '전기의 흐름. 자기장 변화로 전지 없이도 만들 수 있음.' },
  { front: '発電機 (はつでんき)',   back: '자석·코일을 계속 움직여(회전) 전기를 만드는 장치. 전자기 유도 응용.' },
  { front: '「変化」が 鍵',          back: '자석이 있는 것만으론 부족. 움직여서 자기장이 변해야 전류 발생.' },
  { front: '誘導電流의 방향',        back: '자석을 넣을 때와 뺄 때 전류 방향이 반대. 변화의 방향이 결정.' },
  { front: '発電所',                back: '화력·수력·풍력·원자력 모두 최종적으로 전자기 유도로 발전. 무언가를 돌려 자기장 변화 생성.' },
  { front: 'モーター',              back: '전자기 유도의 반대 응용. 전류로 회전력을 만듦(발전기와 짝).' },
  { front: 'マイケル·ファラデー',   back: '영국 물리학자·화학자(1791-1867). 전자기 유도 발견. 발전기·전동기 원리의 기초.' },
],
```

### 5-5. exercises (10문제)

```javascript
exercises: [
  {
    q: '事件 8 で 電池 없이 전류가 흐른 이유는?',
    options: ['코일이 스스로 만든다', '자석을 움직여 磁場이 変化해서', '전선이 특별해서', '우연'],
    correct: 1,
    explanation: '事件 8 핵심. 자석을 움직이면 자기장이 변하고, 그 변화가 전류를 만듦(전자기 유도).',
  },
  {
    q: '자석을 코일 안에 가만히 두면 전류는?',
    options: ['계속 흐른다', '흐르지 않는다', '점점 커진다', '반대로 흐른다'],
    correct: 1,
    explanation: '정지=자기장 불변=전류 없음. 「있다」가 아니라 「변한다」가 조건.',
  },
  {
    q: '자기장 변화로 전류가 생기는 현상은?',
    options: ['電磁誘導', '万有引力', '自然選択', '進化'],
    correct: 0,
    explanation: '電磁誘導(전자기 유도). 패러데이가 1831년 발견.',
  },
  {
    q: '전자기 유도를 발견한 사람은?',
    options: ['ニュートン', 'ファラデー', 'ガリレオ', 'メンデル'],
    correct: 1,
    explanation: '마이클 패러데이. 발전기·전동기의 기초 원리를 마련.',
  },
  {
    q: '자석을 넣을 때와 뺄 때 전류 방향은?',
    options: ['같다', '반대다', '둘 다 없다', '무작위'],
    correct: 1,
    explanation: '변화의 방향이 반대이므로 전류 방향도 반대.',
  },
  {
    q: '유도 전류를 더 크게 하려면?',
    options: ['자석을 천천히', '자석을 빨리 움직이거나 강한 자석 사용', '코일을 풀기', '전지를 더함'],
    correct: 1,
    explanation: '변화가 빠를수록·클수록(강한 자석, 많이 감은 코일) 전류가 큼.',
  },
  {
    q: '발전소가 전기를 만드는 최종 원리는?',
    options: ['연료를 태워 직접 전기로', '電磁誘導(자석·코일을 돌림)', '햇빛을 모아서만', '물을 끓여서만'],
    correct: 1,
    explanation: '화력·수력·풍력·원자력 모두 결국 무언가를 돌려 자기장 변화→전자기 유도로 발전.',
  },
  {
    q: '코일의 감은 횟수를 늘리면?',
    options: ['전류가 작아진다', '유도 전류가 커진다', '변화가 없다', '자석이 멈춘다'],
    correct: 1,
    explanation: '코일을 많이 감을수록 유도 전류가 커짐.',
  },
  {
    q: '「磁場」을 바르게 설명한 것은?',
    options: ['눈에 보이는 빛', '자석 주위의 눈에 안 보이는 힘의 영역', '소리의 일종', '전지 안의 액체'],
    correct: 1,
    explanation: '자석 주위에 형성되는 보이지 않는 힘의 영역. 자기력선으로 표현.',
  },
  {
    q: '전자기 유도가 우리 생활에 준 영향은?',
    options: ['영향 없음', '발전·전동기 등 전기 문명의 기초', '자석을 없앰', '전기를 줄임'],
    correct: 1,
    explanation: '발전기·전동기·변압기 등 현대 전기 문명 전체의 기초.',
  },
],
```

### 5-6. tips (8포인트)

```javascript
tips: [
  { title: '①  「있다」가 아니라 「변한다」',   body: '자석이 있는 것만으론 전류 없음. 자기장이 변할 때만 전류 발생. 전자기 유도의 핵심.' },
  { title: '②  電磁誘導 = 패러데이 발견',     body: '1831년. 코일 속 자석을 움직이면 전류 발생. 발전의 기초 원리.' },
  { title: '③  方向이 반대',                 body: '넣을 때와 뺄 때 전류 방향이 반대. 변화의 방향이 전류 방향을 결정.' },
  { title: '④  빠를수록·강할수록 큰 전류',    body: '변화가 빠르거나 자석이 강하거나 코일을 많이 감으면 전류가 큼.' },
  { title: '⑤  発電機의 원리',               body: '자석/코일을 계속 회전 → 끊임없는 자기장 변화 → 지속 전류. 모든 발전소의 핵심.' },
  { title: '⑥  모든 발전소가 같은 원리',      body: '화력·수력·풍력·원자력 모두 무언가를 돌려 발전. 에너지원만 다를 뿐 원리는 전자기 유도.' },
  { title: '⑦  눈에 안 보여도 실재',          body: '자기장은 안 보이지만 실험으로 그 효과를 확인 가능(사건 5·7과 통하는 과학 태도).' },
  { title: '⑧  실험으로 확인하라',           body: '패러데이는 정규 교육이 적었지만 끈질긴 실험으로 발견. 손으로 확인하는 자세.' },
],
```

---

## 6. caseQuiz (5문제)

```javascript
caseQuiz: [
  {
    q: '事件 8 で 電池 없이 전류가 흐른 이유는?',
    options: ['코일이 스스로', '자석을 움직여 磁場이 変化해서', '전선이 특별해서', '우연'],
    correct: 1,
  },
  {
    q: '자석을 가만히 두면 전류는?',
    options: ['흐른다', '흐르지 않는다', '커진다', '반대로'],
    correct: 1,
  },
  {
    q: '자기장 변화로 전류가 생기는 현상은?',
    options: ['電磁誘導', '万有引力', '自然選択', '放射能'],
    correct: 0,
  },
  {
    q: '전자기 유도 발견자는?',
    options: ['ニュートン', 'ファラデー', 'ガリレオ', 'メンデル'],
    correct: 1,
  },
  {
    q: '事件 8 의 핵심 메시지는?',
    options: ['자석만 있으면 된다', '자기장의 변화가 전류를 만든다', '전기는 전지에서만', '코일은 불필요'],
    correct: 1,
  },
],
```

---

## 7. 데이터·엔진 갱신

### 7-1. data/series4-scientists.js — SCIENTISTS_STORY[7] (id=8)

```javascript
{
  id: 8, icon: '⚡',
  title: '見えない力の正体',
  subtitle: '磁石で 電気が 生まれる?',
  theme: '電磁誘導·磁場·電流·発電',
  bgm: 'mystery',
  illustration: SCIENTISTS_CASE_IMAGES[8],
  charKey: 'faraday_coil',
  sceneKey: 'bg_ch08_electricity',
  comingSoon: false,
  learnRef: 'scientists_case08',
  intro: { /* §4-1 */ },
  steps: [ /* §4-2 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6 */ ],
  note: {
    title: '第8事件 見えない 力の 正体',
    desc: '電池 없이 흐른 전류 — 자석을 움직여 磁場이 変化할 때 코일에 전류가 생기는 電磁誘導. 모든 발전의 원리이자, 「있다」가 아닌 「변한다」가 핵심임을 배운 第八歩.'
  },
},
```

### 7-2. data/series4-scientists-learn.js — scientists_case08 추가 (case01~07 보존)

```javascript
scientists_case08: {
  title: '電磁誘導と 発電の 原理',
  subtitle: '事件 8 で 学んだ こと',
  examScope: '중학 理科(物理) + 比喩 중심',
  concept: { /* §5-1 */ },
  diagrams: [ /* §5-2 SVG 4개 */ ],
  formulas: [ /* §5-3 */ ],
  unitsTable: { /* §5-3 */ },
  flashcards: [ /* §5-4 */ ],
  exercises: [ /* §5-5 */ ],
  tips: [ /* §5-6 */ ],
},
```

### 7-3. ⭐ engine/detectives-B.js — SCIENTISTS_SPEAKER_MAP 등록 (먼저!)

기존 7개 NPC 뒤에 추가:
```javascript
faraday_coil: { cls: 'sensei', name: 'ファラデー', charKey: 'faraday_coil', pos: 'center' },
```

콘솔 검증:
```javascript
SCIENTISTS_SPEAKER_MAP.faraday_coil        // 객체
SCIENTISTS_SPEAKER_MAP.faraday_coil.name   // 'ファラデー'
```

---

## 8. 검증

### 8-1. 콘솔

```javascript
SCIENTISTS_STORY[7].id                                    // 8
SCIENTISTS_STORY[7].comingSoon                            // false
SCIENTISTS_STORY[7].learnRef                              // "scientists_case08"
SCIENTISTS_STORY[7].charKey                               // "faraday_coil"
SCIENTISTS_STORY[7].intro.lines.length                    // 17
SCIENTISTS_STORY[7].steps.length                          // 6
SCIENTISTS_STORY[7].steps[5].options[0].response.length   // 8
SCIENTISTS_STORY[7].ending.lines.length                   // 7
SCIENTISTS_STORY[7].caseQuiz.length                       // 5
SCIENTISTS_LEARN.scientists_case08                        // 객체
SCIENTISTS_LEARN.scientists_case08.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case08.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case08.diagrams.length        // 4
SCIENTISTS_SPEAKER_MAP.faraday_coil                       // 객체
SCIENTISTS_SPEAKER_MAP.faraday_coil.name                  // 'ファラデー'
// 회귀
SCIENTISTS_STORY[6].comingSoon  // false (case 7)
SCIENTISTS_STORY[8].comingSoon  // true (case 9 placeholder)
SCIENTISTS_SPEAKER_MAP.galileo_telescope  // 보존
```

### 8-2. 시각
- [ ] 사건 8 카드 잠금 풀림
- [ ] **ファラデー 등장 시 「ファラデー」 이름 + faraday_coil.png 초상화** (fallback 아님 ⭐)
- [ ] STEP 1~6 + step6 결론 8줄
- [ ] 학습 6탭 + SVG 4개
- [ ] caseQuiz 5문제 + 별점

### 8-3. 회귀
- [ ] 시리즈 1~3, 5~12 정상 / 사건 1~7 NPC 보존 / 사건 9·10 placeholder

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| SCIENTISTS_STORY[0]~[6] 수정 | 사건 1~7 완성 |
| SCIENTISTS_STORY[8]~[9] 수정 | 사건 9·10 별도 명세서 |
| SCIENTISTS_LEARN.scientists_case01~07 수정 | 보존 |
| SPEAKER_MAP 기존 7개 NPC 수정 | 사건 1~7 동작 보존 |
| engine/scientists-learn.js·시리즈3·자산 PNG | 보존 |
| 실명 풀네임을 ファラデー 대사로 강제 | 가상 캐릭터 (이름 ファラデー만) |

---

## 10. 작업 순서

```
Step 1: 사건 7 구조 + SPEAKER_MAP 정독
Step 2: ⭐ engine/detectives-B.js에 faraday_coil 등록 (먼저!) + 콘솔 검증
Step 3: SCIENTISTS_STORY[7] 교체 + 콘솔 검증
Step 4: scientists_case08 추가 (case01~07 보존) + 콘솔 검증
Step 5: 시각 검증 (§8-2)
Step 6: 회귀 테스트 (§8-3)
Step 7: commit + push
  - "feat(series04/case08): add Faraday/electromagnetism content + register faraday_coil in speaker map"
Step 8: 완료 보고
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE08_SPEC.md를 정독하고, 시리즈 4 사건 8 「見えない力の正体」 
본격 콘텐츠를 작성해줘. 사건 7과 동일 패턴.

[⭐ 가장 중요]
engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 faraday_coil 등록을 
가장 먼저 (Step 2). 기존 7개 NPC와 동일 형식:
  faraday_coil: { cls: 'sensei', name: 'ファラデー', charKey: 'faraday_coil', pos: 'center' }
누락 시 「ナレーター」 fallback. 등록 후 콘솔 검증.

[핵심 원칙]
- 사건 7 (SCIENTISTS_STORY[6], scientists_case07) 패턴 mirror.
- SCIENTISTS_STORY[7]만 교체, scientists_case08만 추가 (case01~07 보존).
- faraday_coil.png 이미 존재 — 신규 PNG 생성 X.

[전자기 유도 주제의 톤]
- 「있다」가 아니라 「변한다」가 핵심 (자석 정지 시 전류 없음)
- 눈에 안 보이는 자기장도 실험으로 확인 (사건 5·7과 통함)
- 발전소(화력·수력·풍력·원자력) 모두 같은 원리 — 친화적 연결
- 패러데이의 「손으로 실험하는」 탐구 자세

[금지] 사건 1~7·SPEAKER_MAP 기존 7개·사건 9~10 placeholder·시리즈3·engine/scientists-learn.js·자산 PNG 미수정.

[회귀] push 전 시리즈 1~3·5~12 + 사건 1~7 NPC + 영어학습 + 채팅 확인.

commit msg: "feat(series04/case08): add Faraday/electromagnetism content + register faraday_coil in speaker map"
```

---

**END OF SPEC**
