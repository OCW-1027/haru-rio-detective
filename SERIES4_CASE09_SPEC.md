# SERIES 4 — CASE 9 CONTENT SPEC
## 「原子の中の世界」 — ボーア·原子模型

**작성일**: 2026-06-24
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 사건**: 사건 1~8 완성

**핵심 (사건 4~8 패턴 그대로)**:
- ⭐ §7-3 SCIENTISTS_SPEAKER_MAP에 `bohr_atom` 등록 (데이터보다 먼저).
- ✅ NPC PNG 이미 준비됨 (`bohr_atom.png`, RGBA).

---

## 0. PRE-FLIGHT
- [ ] 사건 1~8 정상
- [ ] SCIENTISTS_STORY[8] (id=9)가 placeholder (comingSoon: true)
- [ ] SCIENTISTS_LEARN에 scientists_case01~08만 존재
- [ ] assets/characters/series04/bohr_atom.png 존재 (RGBA)
- [ ] git 깨끗

---

## 1. 사건 9 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 9 |
| 제목 | **原子の中の世界 (げんしの なかの せかい)** |
| 부제 | とびとびの 光の 謎 |
| 학습 테마 | 原子模型 / 電子의 궤도 / とびとび의 에너지 / 원소의 빛(스펙트럼) |
| 학습 깊이 | 중학~고1 理科(物理·化学 입문) + 比喩 중심 |
| NPC | ボーア (bohr_atom) |
| 동행 | ハル + リオ + ヒナタ + ペンタ |
| 배경 | bg_ch09_physics (물리 실험실) |
| 트릭 | 「とびとびの 光の 謎」 — 원소가 내는 빛이 무지개처럼 연속이 아니라 띄엄띄엄한 색 띠 → 전자가 정해진 궤도에만 있음 |
| 플레이타임 | 12~15분 |

---

## 2. ボーア 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 20세기 초 양복 + 원자 모형 (자산 PNG bohr_atom.png 그대로) |
| 나이 | 40대 |
| 직업 | 이론 물리학자 |
| 성격 | 사색적이고 신중, 눈에 안 보이는 원자 속을 상상력+논리로 그려냄 |
| 1인칭 | 「私 (わたし)」 |
| 말투 | 「~でしょう」「~と 考えられます」「不思議だと 思いませんか」 |
| 좋아하는 것 | 사고 실험, 빛의 관찰, 모형으로 설명하기 |
| 모티프 | 닐스 보어 (원자 모형, 전자 궤도, 양자 도약) |
| 핵심 대사 | 「目に 見えない 原子の 中にも、 美しい 規則が あるのです」 |
| **표시명** | **ボーア** |

**중요**: 「ボーア」는 성씨로 호칭 가능. 풀네임·생몰년은 학습 자료에서만 (「ニールス·ボーア, 1885-1962」). 양자역학의 깊은 내용은 다루지 않고 「전자는 정해진 궤도(층)에만 있다」 수준의 비유로 한정.

---

## 3. 미스터리 트릭 「とびとびの 光の 謎」

### 3-1. 핵심 미스터리

ボーア의 실험실. 여러 원소(수소·네온 등)를 빛나게 해서 그 빛을 프리즘에 통과시킴. 태양빛은 무지개처럼 연속된 색으로 펼쳐지는데, **원소의 빛은 띄엄띄엄한 몇 개의 색 띠(선)만 나타남**. 게다가 원소마다 그 색 띠의 위치가 다름. 왜 빛이 연속이 아니라 띄엄띄엄한가?

「太陽の 光は 虹に なるのに、 この 元素の 光は とびとび なのです。 なぜ でしょう?」

### 3-2. 단서 시퀀스

| Step | 단서 | 발견자 | 의미 |
|---|---|---|---|
| 1 | 태양빛 → 연속 무지개 확인 | リオ | 보통 빛은 연속 스펙트럼 |
| 2 | 원소 빛 → 띄엄띄엄 색 띠 | ハル | 몇 개의 선만 (연속 아님) |
| 3 | 원소마다 색 띠 위치 다름 | ヒナタ | 원소의 「지문」 같음 |
| 4 | 원자 구조 — 핵 + 전자 | ハル | 가운데 핵, 주위에 전자 |
| 5 | ボーア 「전자는 정해진 층에만」 노트 | ヒナタ | 전자가 정해진 궤도(층)에만 존재 |
| 6 | 결론: 층 사이 이동 → 정해진 빛 | 3인 협력 | 전자가 층을 옮길 때 정해진 색의 빛 방출 → 띄엄띄엄 |

### 3-3. 진실 (ボーア 자백)

「お見事です。 まさに 私が 考えた 原子の 模型 なのです。」

- 원자는 가운데 **핵**과 그 주위를 도는 **전자**로 이루어짐
- 전자는 아무 데나 있는 게 아니라 **정해진 「층(궤도)」에만** 있을 수 있음 (계단처럼)
- 전자가 높은 층에서 낮은 층으로 옮길 때, **그 차이만큼의 정해진 색의 빛**을 냄
- 층 간격이 정해져 있으니 빛도 띄엄띄엄한 몇 가지 색만
- 원소마다 층 구조가 달라서 → 색 띠 위치도 다름 (원소의 지문)
- 「目に 見えない 原子の 中にも、 美しい 規則が あるのです」

### 3-4. 학습 포인트 연결

ボーア: 「とびとびの 光は、 原子の 中の 規則を 教えてくれる。 見えない 世界にも、 法則が あるのです」
→ 학습 자료 (원자 모형·전자 궤도·스펙트럼).

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: '原子の中の世界',
  subtitle: 'とびとびの 光の 謎',
  bg: 'bg_ch09_physics',
  lines: [
    { speaker: 'narrator',  text: 'ファラデーの 紹介で、 光の 実験を する 物理学者を 訪ねた。' },
    { speaker: 'hinata',    text: 'こちらが ボーアさんの 実験室 です。 プリズムや 光る 管が…' },
    { speaker: 'rio',       text: 'うわぁ、 ガラス管が 色とりどりに 光ってる! きれい!' },
    { speaker: 'haru',      text: 'プリズムで 光を 分けて いるんだ… 何を 調べて いるんだろう。' },
    { speaker: 'bohr_atom', text: 'ようこそ。 私が ボーアです。 不思議な 光の 謎が あってね。' },
    { speaker: 'bohr_atom', text: 'まず これを 見て ください。 太陽の 光を プリズムに 通すと…' },
    { speaker: 'rio',       text: 'わぁ、 虹! 赤から 紫まで、 ぜんぶ つながってる!' },
    { speaker: 'bohr_atom', text: 'そう、 連続した 虹に なります。 では、 この 元素の 光は どうでしょう。' },
    { speaker: 'narrator',  text: '光る 管の 光を プリズムに 通すと — 虹では なく、 とびとびの 数本の 色の 線 だけが 現れた。' },
    { speaker: 'haru',      text: 'えっ、 連続して ない! 数本の 線 だけ…?' },
    { speaker: 'hinata',    text: '太陽は 虹なのに、 これは とびとび… 不思議です。' },
    { speaker: 'bohr_atom', text: 'しかも、 元素を 変えると 線の 位置も 変わるのです。 まるで 指紋の ように。' },
    { speaker: 'rio',       text: '光に 指紋? どういう こと?' },
    { speaker: 'bohr_atom', text: 'ふふ、 目に 見えない 原子の 中に、 答えが 隠れて いるのでしょう。' },
    { speaker: 'bohr_atom', text: 'なぜ 光は とびとび なのか — 皆さんで 解いて くれますか?' },
    { speaker: 'haru',      text: 'はい! 原子の 中を 想像して みます。' },
    { speaker: 'penta',     text: 'ペンッ! とびとびの 光、 調べるペン!' },
  ],
  cta: '🔬 調査を 始める',
},
```

### 4-2. steps

#### Step 1 — 태양빛 연속 스펙트럼

```javascript
{
  id: 'step1',
  title: '🌈 STEP 1: 太陽の 光を 調べる',
  bg: 'bg_ch09_physics',
  question: 'まず 太陽の 光を プリズムに 通す。 どう 見える?',
  options: [
    {
      label: '赤から 紫まで、 連続した 虹に なる',
      isCorrect: true,
      response: [
        { speaker: 'rio',       text: '赤・橙・黄・緑・青・藍・紫… 全部 つながった 虹!' },
        { speaker: 'haru',      text: '色と 色の 間に すき間が ない。 「連続」 している。' },
        { speaker: 'hinata',    text: '普通の 光は こうやって 連続の 虹に なるんですね。' },
        { speaker: 'bohr_atom', text: 'その通り。 これが 「連続スペクトル」 です。 比べる 基準に なります。' },
      ],
    },
    {
      label: '白い まま 変わらない',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'プリズムを 通すと 虹に 分かれるよ。 もう一度 見てみよう。' },
      ],
    },
  ],
},
```

#### Step 2 — 원소 빛 띄엄띄엄

```javascript
{
  id: 'step2',
  title: '📏 STEP 2: 元素の 光を 調べる',
  bg: 'bg_ch09_physics',
  question: '光る 管(元素)の 光を プリズムに 通す。 太陽と どう 違う?',
  options: [
    {
      label: '連続の 虹では なく、 とびとびの 数本の 線 だけ',
      isCorrect: true,
      response: [
        { speaker: 'haru',      text: '虹じゃ ない! 何もない 黒い 中に、 数本の 線 だけ 光ってる!' },
        { speaker: 'rio',       text: 'すき間 だらけ! とびとびだ!' },
        { speaker: 'hinata',    text: '同じ 光なのに、 こんなに 違う… なぜ とびとび なんでしょう。' },
        { speaker: 'bohr_atom', text: 'これが 「線スペクトル」。 連続では なく、 決まった 色 だけ なのです。' },
      ],
    },
    {
      label: '太陽と 同じ 連続の 虹',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'いや、 元素の 光は とびとびの 線 だけ だよ。' },
      ],
    },
  ],
},
```

#### Step 3 — 원소마다 다른 위치

```javascript
{
  id: 'step3',
  title: '🔖 STEP 3: 元素を 変えて 比べる',
  bg: 'bg_ch09_physics',
  question: '違う 元素の 光も 調べた。 線の 位置は?',
  options: [
    {
      label: '元素ごとに 線の 位置が 違う — 指紋の よう',
      isCorrect: true,
      response: [
        { speaker: 'hinata',    text: '水素は ここ、 別の 元素は 違う 場所に 線が… 元素ごとに 違います!' },
        { speaker: 'rio',       text: '光の 指紋だ! どの 元素か 見分けられる!' },
        { speaker: 'haru',      text: '位置が 決まってる… 原子の 種類で 決まる 何か が ある。' },
        { speaker: 'bohr_atom', text: 'お見事。 線の 位置は 元素の 「指紋」。 これで 星の 成分も わかるのです。' },
      ],
    },
    {
      label: 'どの 元素も 同じ 位置',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '元素を 変えると 線の 位置も 変わります。 比べてみて。' },
      ],
    },
  ],
},
```

#### Step 4 — 원자 구조 (핵 + 전자)

```javascript
{
  id: 'step4',
  title: '⚛️ STEP 4: 原子の 構造を 考える',
  bg: 'bg_ch09_physics',
  question: 'ボーアが 原子の 模型を 見せた。 原子は どんな 構造?',
  options: [
    {
      label: '中心に 核、 その まわりを 電子が まわっている',
      isCorrect: true,
      response: [
        { speaker: 'haru',      text: '真ん中に 「核」、 その まわりを 小さな 「電子」 が まわってる…' },
        { speaker: 'rio',       text: '太陽の まわりの 惑星 みたい! ガリレオの 話 とも 似てる!' },
        { speaker: 'hinata',    text: '光は きっと、 この 電子と 関係が あるんですね。' },
        { speaker: 'bohr_atom', text: 'その通り。 光の 秘密は、 電子の 動きに あるのです。' },
      ],
    },
    {
      label: '原子は 何もない 空っぽ',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '原子の 中には 核と 電子が あるよ。 模型を よく 見よう。' },
      ],
    },
  ],
},
```

#### Step 5 — ボーア의 노트 (정해진 층)

```javascript
{
  id: 'step5',
  title: '📓 STEP 5: ボーアの 仮説ノート',
  bg: 'bg_ch09_physics',
  question: 'ボーアの ノートを 開いた。 何が 書いてある?',
  options: [
    {
      label: '「電子は どこにでも いるのでは なく、 決まった 『層(軌道)』 にだけ いる」',
      isCorrect: true,
      response: [
        { speaker: 'hinata',    text: '「電子は 決まった 層 にだけ いる」… 階段の 段 みたいに!' },
        { speaker: 'haru',      text: '間の 中途半端な 場所には いない… だから 光も とびとび?' },
        { speaker: 'rio',       text: '電子の 階段! 段と 段の 間は ないんだ!' },
        { speaker: 'bohr_atom', text: 'その通り。 電子は とびとびの 「層」 に だけ いる。 ここが 鍵です。' },
      ],
    },
    {
      label: 'ノートを 閉じる',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: 'ボーアさんの 仮説に ヒントが あります。 読みましょう。' },
      ],
    },
  ],
},
```

#### Step 6 — 결론 + ボーア 자백

```javascript
{
  id: 'step6',
  title: '🧩 STEP 6: 推理を 組み立てる',
  bg: 'bg_ch09_physics',
  question: '全ての 手がかりが 揃った。 ボーアに どう 伝える?',
  options: [
    {
      label: '「電子が 決まった 層を 移る とき、 その 差の 分 だけ 決まった 色の 光を 出す。 だから とびとび」',
      isCorrect: true,
      response: [
        { speaker: 'bohr_atom', text: 'お見事です! まさに 私が 考えた 原子の 模型 なのです。' },
        { speaker: 'bohr_atom', text: '電子は 決まった 「層」 にだけ いる。 階段の 段の ように、 とびとび です。' },
        { speaker: 'bohr_atom', text: '電子が 高い 層から 低い 層へ 移る とき、 その 差の 分 だけ 光を 出します。' },
        { speaker: 'bohr_atom', text: '層の 間隔が 決まって いるから、 出る 光の 色も 決まった ものだけ — だから とびとび なのです。' },
        { speaker: 'hinata',    text: '段差が 決まってるから、 出る 光の 色も 決まってる… すっきりしました!' },
        { speaker: 'haru',      text: '元素ごとに 層の 構造が 違うから、 線の 位置も 違うんですね。' },
        { speaker: 'rio',       text: '目に 見えない 原子の 中に、 こんな 階段が あったなんて!' },
        { speaker: 'bohr_atom', text: 'その通り。 見えない 世界にも、 美しい 規則が ある。 さあ、 一緒に 学びましょう。' },
      ],
    },
    {
      label: '「光が とびとびなのは 偶然」',
      isCorrect: false,
      response: [
        { speaker: 'bohr_atom', text: '偶然 では ありません。 元素ごとに 決まって いる。 規則が あるのです。' },
      ],
    },
    {
      label: '「電子は どこにでも 自由に いる」',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'どこにでも いるなら 光は 連続に なるはず。 とびとびなのは 層が あるから だよ。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch09_physics',
  lines: [
    { speaker: 'bohr_atom', text: '皆の おかげで、 原子の 模型を きちんと 説明 できました。 ありがとう。' },
    { speaker: 'bohr_atom', text: '目に 見えない 原子の 中にも、 階段の ような 美しい 規則が ある。 不思議でしょう?' },
    { speaker: 'rio',       text: 'とびとびの 光が、 原子の 階段を 教えてくれたんだ!' },
    { speaker: 'haru',      text: '光の 線で 星の 成分まで わかる… 宇宙と 原子が つながってる。' },
    { speaker: 'hinata',    text: 'キューリィ夫人の 放射能とも、 どこか つながって ますね。' },
    { speaker: 'bohr_atom', text: 'その通り。 原子の 世界を、 もう 少し 学んで みましょう。' },
    { speaker: 'penta',     text: 'ペンッ! 原子の 勉強、 ペン!' },
  ],
  cta: '📚 学習資料を 開く',
},
```

---

## 5. 학습 자료 6섹션

### 5-1. concept

```javascript
concept: {
  title: '原子の 模型と とびとびの 光',
  paragraphs: [
    '事件 9 の とびとびの 光 — その 正体は、 原子の 中の 電子の 動き でした。 ボーア は 1913年、 原子の 中の 電子が 「決まった 層 (軌道)」 にだけ 存在する という 模型を 提案 しました。',
    '原子は、 中心の 「原子核」 と、 その まわりを まわる 「電子」 で できて います。 電子は どこにでも いられる わけでは なく、 階段の 段の ように、 とびとびの 決まった 層 にだけ います。',
    '電子が 高い 層から 低い 層へ 移る とき、 その エネルギーの 差の 分 だけ、 決まった 色の 光を 出します。 層の 間隔が 決まって いるので、 出る 光も とびとびの 決まった 色 だけ — これが 「線スペクトル」 の 正体です。',
    '元素ごとに 層の 構造が 違うので、 出る 光の 色 (線の 位置) も 違います。 これは 元素の 「指紋」 の ようなもので、 遠い 星の 光を 調べれば、 その 星が 何で できているか まで わかります。 目に 見えない 原子の 中にも、 美しい 規則が あるのです。',
  ],
  highlight: '電子は とびとびの 「層」 にだけ いる。 層を 移る とき 決まった 色の 光を 出す → とびとびの スペクトル。',
},
```

### 5-2. diagrams (SVG 4개)

#### 도해 1: 연속 vs 선 스펙트럼 (500×280)
- 위: 태양빛 → 연속 무지개 띠
- 아래: 원소빛 → 검은 배경에 띄엄띄엄 색 선 몇 개
- 캡션: 「連続スペクトル vs 線スペクトル」

#### 도해 2: 보어 원자 모형 (450×350)
- 중심 핵 + 동심원 층(궤도) 2~3개
- 각 층에 전자 점
- 캡션: 「電子は 決まった 「層」 にだけ いる」

#### 도해 3: 전자의 층 이동과 빛 방출 (500×320)
- 높은 층 → 낮은 층으로 전자 이동(화살표) → 빛(파동) 방출
- 「段差가 크면 다른 색」 표시
- 캡션: 「層を 移る とき、 差の 分 だけ 光が 出る」

#### 도해 4: 원소의 지문 (450×280)
- 수소·네온 등 2~3개 원소의 서로 다른 선 패턴
- 「별빛 분석 → 별의 성분」 작은 그림
- 캡션: 「線の 位置 = 元素の 指紋」

### 5-3. formulas + unitsTable

```javascript
formulas: [
  {
    name: '電子의 층(궤도)',
    formula: '電子는 とびとびの 決まった 層에만 존재',
    formulaSimple: '電子 = 階段の 段',
    explanation: '전자는 아무 위치에나 있지 않고, 계단의 단처럼 정해진 층(궤도)에만 존재. 보어 원자 모형의 핵심.',
    note: '중간 위치에는 없음. 「とびとび(불연속)」가 핵심.',
  },
  {
    name: '層 이동과 빛',
    formula: '높은 層 → 낮은 層 이동 시 「差의 分」만큼 정해진 색의 빛 방출',
    formulaSimple: '段差 = 光의 色',
    explanation: '전자가 층을 옮길 때 그 에너지 차이만큼의 정해진 색 빛을 냄. 층 간격이 정해져 있어 빛도 띄엄띄엄.',
    note: '원소마다 층 구조가 달라 빛의 색(선 위치)도 다름 = 원소의 지문.',
  },
],
unitsTable: {
  title: '原子 키워드 정리',
  rows: [
    ['용어', '의미', '예시·비고'],
    ['原子 (げんし)',       '물질을 이루는 작은 알갱이',           '핵 + 전자로 구성'],
    ['原子核 (げんしかく)',  '원자 중심의 무거운 부분',             '양성자·중성자'],
    ['電子 (でんし)',       '핵 주위를 도는 가벼운 알갱이',         '정해진 층에만 존재'],
    ['層·軌道',             '전자가 존재할 수 있는 정해진 위치',     '계단의 단 같은 것'],
    ['線スペクトル',         '원소가 내는 띄엄띄엄한 색 선',         '원소의 지문'],
    ['ボーア模型',          '전자가 정해진 층에 있다는 원자 모형',   '보어가 1913년 제안'],
  ],
},
```

### 5-4. flashcards (10장)

```javascript
flashcards: [
  { front: '原子 (げんし)',         back: '물질을 이루는 작은 알갱이. 중심의 핵과 주위를 도는 전자로 구성.' },
  { front: '原子核 (げんしかく)',    back: '원자 중심의 무겁고 작은 부분. 양성자·중성자로 이루어짐.' },
  { front: '電子 (でんし)',         back: '핵 주위를 도는 가벼운 알갱이. 정해진 층(궤도)에만 존재.' },
  { front: '層·軌道 (そう·きどう)',  back: '전자가 있을 수 있는 정해진 위치. 계단의 단처럼 띄엄띄엄.' },
  { front: '線スペクトル',          back: '원소가 내는 띄엄띄엄한 색 선. 연속 무지개와 달리 정해진 색만.' },
  { front: '連続スペクトル',        back: '태양빛처럼 빨강~보라까지 연속된 무지개 띠.' },
  { front: 'ボーア模型',           back: '전자가 정해진 층에만 있고, 층 이동 시 정해진 빛을 낸다는 원자 모형(1913).' },
  { front: '元素의 指紋',           back: '원소마다 다른 선 스펙트럼. 별빛 분석으로 별의 성분을 알 수 있음.' },
  { front: '光의 放出',             back: '전자가 높은 층→낮은 층 이동 시 에너지 차이만큼 빛을 냄.' },
  { front: 'ニールス·ボーア',       back: '덴마크 물리학자(1885-1962). 원자 모형 제안. 양자역학의 기초를 놓음.' },
],
```

### 5-5. exercises (10문제)

```javascript
exercises: [
  {
    q: '事件 9 で 원소의 빛이 띄엄띄엄한 이유는?',
    options: ['우연히', '전자가 정해진 층에만 있어 층 이동 시 정해진 빛만 냄', '프리즘이 고장나서', '빛이 약해서'],
    correct: 1,
    explanation: '事件 9 핵심. 전자가 정해진 층에만 존재 → 층 이동 시 정해진 색 빛만 → 띄엄띄엄.',
  },
  {
    q: '원자의 구조는?',
    options: ['텅 비어 있음', '중심에 핵, 주위에 전자', '전자만 있음', '핵만 있음'],
    correct: 1,
    explanation: '중심의 원자핵과 그 주위를 도는 전자로 구성.',
  },
  {
    q: '보어 모형에서 전자는?',
    options: ['아무 데나 있음', '정해진 층(궤도)에만 있음', '핵 안에 있음', '원자 밖에 있음'],
    correct: 1,
    explanation: '계단의 단처럼 정해진 층에만 존재. 중간 위치엔 없음.',
  },
  {
    q: '원자 모형을 제안한 사람은?',
    options: ['ファラデー', 'ボーア', 'ガリレオ', 'メンデル'],
    correct: 1,
    explanation: '닐스 보어. 1913년 전자가 정해진 층에 있다는 모형 제안.',
  },
  {
    q: '태양빛을 프리즘에 통과시키면?',
    options: ['띄엄띄엄한 선', '연속된 무지개', '검은색', '한 가지 색'],
    correct: 1,
    explanation: '연속 스펙트럼(무지개). 원소의 선 스펙트럼과 대조됨.',
  },
  {
    q: '원소마다 선 스펙트럼 위치가 다른 것을 무엇에 비유하나?',
    options: ['목소리', '지문', '키', '몸무게'],
    correct: 1,
    explanation: '원소의 「지문」. 별빛 분석으로 별의 성분 판별 가능.',
  },
  {
    q: '전자가 빛을 내는 때는?',
    options: ['가만히 있을 때', '높은 층에서 낮은 층으로 옮길 때', '핵에 들어갈 때', '원자를 떠날 때만'],
    correct: 1,
    explanation: '층 이동 시 에너지 차이만큼의 정해진 색 빛을 방출.',
  },
  {
    q: '선 스펙트럼으로 알 수 있는 것은?',
    options: ['아무것도 없음', '그 빛을 낸 원소의 종류', '온도만', '거리만'],
    correct: 1,
    explanation: '원소의 지문이므로 빛만 보고 어떤 원소인지 판별. 별의 성분도 알 수 있음.',
  },
  {
    q: '「電子가 정해진 층에만 있다」가 뜻하는 것은?',
    options: ['전자는 자유롭다', '전자 위치가 불연속(とびとび)이다', '전자는 멈춰 있다', '전자는 핵이다'],
    correct: 1,
    explanation: '계단의 단처럼 불연속. 중간 위치엔 없어서 빛도 띄엄띄엄.',
  },
  {
    q: '보어의 발견이 보여준 것은?',
    options: ['원자는 단순하다', '눈에 안 보이는 원자 속에도 규칙이 있다', '빛은 무의미하다', '원소는 모두 같다'],
    correct: 1,
    explanation: '보이지 않는 미시 세계에도 아름다운 법칙이 존재함을 보임.',
  },
],
```

### 5-6. tips (8포인트)

```javascript
tips: [
  { title: '①  電子는 「階段의 段」',          body: '전자는 아무 데나 아닌 정해진 층에만 존재. 중간 위치엔 없음(とびとび).' },
  { title: '②  とびとびの 光 = 線スペクトル',  body: '전자가 정해진 층을 옮길 때 정해진 색만 방출. 그래서 연속 아닌 띄엄띄엄.' },
  { title: '③  元素의 指紋',                  body: '원소마다 선 위치가 다름. 별빛을 분석해 별의 성분까지 알 수 있음.' },
  { title: '④  原子 = 核 + 電子',             body: '중심에 무거운 핵, 주위에 가벼운 전자. 태양·행성 비유와 닮음(사건 7과 연결).' },
  { title: '⑤  段差 = 光의 色',               body: '전자가 옮기는 층의 차이만큼 정해진 색 빛. 차이가 크면 다른 색.' },
  { title: '⑥  보어 모형(1913)',             body: '닐스 보어가 전자 층 모형 제안. 양자역학의 출발점(고1 이후 더 깊이 배움).' },
  { title: '⑦  보이지 않아도 규칙이 있다',     body: '원자 속은 안 보이지만 빛이라는 증거로 규칙을 알아냄(사건 5·8과 통함).' },
  { title: '⑧  과학자들은 연결된다',          body: '퀴리(방사능)·보어(원자)·아인(에너지) — 원자의 세계로 이어지는 과학의 흐름.' },
],
```

---

## 6. caseQuiz (5문제)

```javascript
caseQuiz: [
  {
    q: '事件 9 で 원소의 빛이 띄엄띄엄한 이유는?',
    options: ['우연', '전자가 정해진 층에만 있어서', '프리즘 고장', '빛이 약해서'],
    correct: 1,
  },
  {
    q: '원자의 구조는?',
    options: ['텅 빔', '핵 + 주위의 전자', '전자만', '핵만'],
    correct: 1,
  },
  {
    q: '보어 모형에서 전자는?',
    options: ['아무 데나', '정해진 층에만', '핵 안에', '원자 밖에'],
    correct: 1,
  },
  {
    q: '원자 모형 제안자는?',
    options: ['ファラデー', 'ボーア', 'ガリレオ', 'メンデル'],
    correct: 1,
  },
  {
    q: '事件 9 의 핵심 메시지는?',
    options: ['원자는 단순하다', '보이지 않는 원자 속에도 규칙이 있다', '빛은 무의미', '원소는 모두 같다'],
    correct: 1,
  },
],
```

---

## 7. 데이터·엔진 갱신

### 7-1. data/series4-scientists.js — SCIENTISTS_STORY[8] (id=9)

```javascript
{
  id: 9, icon: '⚛️',
  title: '原子の中の世界',
  subtitle: 'とびとびの 光の 謎',
  theme: '原子模型·電子軌道·スペクトル',
  bgm: 'mystery',
  illustration: SCIENTISTS_CASE_IMAGES[9],
  charKey: 'bohr_atom',
  sceneKey: 'bg_ch09_physics',
  comingSoon: false,
  learnRef: 'scientists_case09',
  intro: { /* §4-1 */ },
  steps: [ /* §4-2 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6 */ ],
  note: {
    title: '第9事件 原子の 中の 世界',
    desc: 'とびとびの 光 — 전자가 정해진 「층」에만 존재하고, 층을 옮길 때 정해진 색 빛을 냄. 눈에 보이지 않는 원자 속에도 아름다운 규칙이 있음을 보여준 보어의 原子模型을 배운 第九歩.'
  },
},
```

### 7-2. data/series4-scientists-learn.js — scientists_case09 추가 (case01~08 보존)

```javascript
scientists_case09: {
  title: '原子の 模型と とびとびの 光',
  subtitle: '事件 9 で 学んだ こと',
  examScope: '중학~고1 理科(物理·化学 입문) + 比喩 중심',
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

기존 8개 NPC 뒤에 추가:
```javascript
bohr_atom: { cls: 'sensei', name: 'ボーア', charKey: 'bohr_atom', pos: 'center' },
```

콘솔 검증:
```javascript
SCIENTISTS_SPEAKER_MAP.bohr_atom        // 객체
SCIENTISTS_SPEAKER_MAP.bohr_atom.name   // 'ボーア'
```

---

## 8. 검증

### 8-1. 콘솔

```javascript
SCIENTISTS_STORY[8].id                                    // 9
SCIENTISTS_STORY[8].comingSoon                            // false
SCIENTISTS_STORY[8].learnRef                              // "scientists_case09"
SCIENTISTS_STORY[8].charKey                               // "bohr_atom"
SCIENTISTS_STORY[8].intro.lines.length                    // 17
SCIENTISTS_STORY[8].steps.length                          // 6
SCIENTISTS_STORY[8].steps[5].options[0].response.length   // 8
SCIENTISTS_STORY[8].ending.lines.length                   // 7
SCIENTISTS_STORY[8].caseQuiz.length                       // 5
SCIENTISTS_LEARN.scientists_case09                        // 객체
SCIENTISTS_LEARN.scientists_case09.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case09.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case09.diagrams.length        // 4
SCIENTISTS_SPEAKER_MAP.bohr_atom                          // 객체
SCIENTISTS_SPEAKER_MAP.bohr_atom.name                     // 'ボーア'
// 회귀
SCIENTISTS_STORY[7].comingSoon  // false (case 8)
SCIENTISTS_STORY[9].comingSoon  // true (case 10 placeholder)
SCIENTISTS_SPEAKER_MAP.faraday_coil  // 보존
```

### 8-2. 시각
- [ ] 사건 9 카드 잠금 풀림
- [ ] **ボーア 등장 시 「ボーア」 이름 + bohr_atom.png 초상화** (fallback 아님 ⭐)
- [ ] STEP 1~6 + step6 결론 8줄
- [ ] 학습 6탭 + SVG 4개
- [ ] caseQuiz 5문제 + 별점

### 8-3. 회귀
- [ ] 시리즈 1~3, 5~12 정상 / 사건 1~8 NPC 보존 / 사건 10 placeholder

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| SCIENTISTS_STORY[0]~[7] 수정 | 사건 1~8 완성 |
| SCIENTISTS_STORY[9] 수정 | 사건 10 별도 명세서 |
| SCIENTISTS_LEARN.scientists_case01~08 수정 | 보존 |
| SPEAKER_MAP 기존 8개 NPC 수정 | 사건 1~8 동작 보존 |
| engine/scientists-learn.js·시리즈3·자산 PNG | 보존 |
| 양자역학 심화 내용 (불확정성·확률 등) | 어린이 대상 — 「정해진 층」 비유로 한정 |
| 실명 풀네임을 ボーア 대사로 강제 | 가상 캐릭터 (이름 ボーア만) |

---

## 10. 작업 순서

```
Step 1: 사건 8 구조 + SPEAKER_MAP 정독
Step 2: ⭐ engine/detectives-B.js에 bohr_atom 등록 (먼저!) + 콘솔 검증
Step 3: SCIENTISTS_STORY[8] 교체 + 콘솔 검증
Step 4: scientists_case09 추가 (case01~08 보존) + 콘솔 검증
Step 5: 시각 검증 (§8-2)
Step 6: 회귀 테스트 (§8-3)
Step 7: commit + push
  - "feat(series04/case09): add Bohr/atomic-model content + register bohr_atom in speaker map"
Step 8: 완료 보고
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE09_SPEC.md를 정독하고, 시리즈 4 사건 9 「原子の中の世界」 
본격 콘텐츠를 작성해줘. 사건 8과 동일 패턴.

[⭐ 가장 중요]
engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 bohr_atom 등록을 
가장 먼저 (Step 2). 기존 8개 NPC와 동일 형식:
  bohr_atom: { cls: 'sensei', name: 'ボーア', charKey: 'bohr_atom', pos: 'center' }
누락 시 「ナレーター」 fallback. 등록 후 콘솔 검증.

[핵심 원칙]
- 사건 8 (SCIENTISTS_STORY[7], scientists_case08) 패턴 mirror.
- SCIENTISTS_STORY[8]만 교체, scientists_case09만 추가 (case01~08 보존).
- bohr_atom.png 이미 존재 — 신규 PNG 생성 X.

[원자 모형 주제의 톤]
- 「전자는 정해진 층(계단의 단)에만 있다」 비유로 한정 — 양자역학 심화(불확정성·확률) 다루지 않음
- 「とびとび(불연속)」가 핵심 키워드
- 선 스펙트럼 = 원소의 지문 (별빛으로 별 성분 분석)
- 보이지 않는 원자 속에도 규칙 (사건 5·8과 통하는 과학 태도)
- 어린이 친화적, 어려운 수식 없음

[금지] 사건 1~8·SPEAKER_MAP 기존 8개·사건 10 placeholder·시리즈3·engine/scientists-learn.js·자산 PNG 미수정. 양자역학 심화 내용 금지.

[회귀] push 전 시리즈 1~3·5~12 + 사건 1~8 NPC + 영어학습 + 채팅 확인.

commit msg: "feat(series04/case09): add Bohr/atomic-model content + register bohr_atom in speaker map"
```

---

**END OF SPEC**
