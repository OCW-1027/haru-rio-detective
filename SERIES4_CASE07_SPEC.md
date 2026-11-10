# SERIES 4 — CASE 7 CONTENT SPEC
## 「天空の真実」 — ガリレオ·天体観測

**작성일**: 2026-06-24
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 사건**: 사건 1~6 완성

**핵심 (사건 4·5·6 패턴 그대로)**:
- ⭐ §7-3 SCIENTISTS_SPEAKER_MAP에 `galileo_telescope` 등록 (데이터보다 먼저).
- ✅ NPC PNG 이미 준비됨 (`galileo_telescope.png`, RGBA).

---

## 0. PRE-FLIGHT
- [ ] 사건 1~6 정상
- [ ] SCIENTISTS_STORY[6] (id=7)가 placeholder (comingSoon: true)
- [ ] SCIENTISTS_LEARN에 scientists_case01~06만 존재
- [ ] assets/characters/series04/galileo_telescope.png 존재 (RGBA)
- [ ] git 깨끗

---

## 1. 사건 7 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 7 |
| 제목 | **天空の真実 (てんくうの しんじつ)** |
| 부제 | 動いているのは どっち? |
| 학습 테마 | 天体観測 / 地動説·天動説 / 望遠鏡 / 木星의 衛星 / 観測과 증거 |
| 학습 깊이 | 중학 理科(地学) + 比喩 중심 |
| NPC | ガリレオ (galileo_telescope) |
| 동행 | ハル + リオ + ヒナタ + ペンタ |
| 배경 | bg_ch07_observatory (천문대) |
| 트릭 | 「動いているのは どっち?」 — 목성 주위를 도는 위성 발견 → 「모든 천체가 지구를 도는 게 아니다」 |
| 플레이타임 | 12~15분 |

---

## 2. ガリレオ 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 르네상스풍 의상 + 망원경 (자산 PNG galileo_telescope.png 그대로) |
| 나이 | 50대 |
| 직업 | 천문학자·물리학자 |
| 성격 | 열정적이고 대담함, 직접 본 것을 믿는 관측가. 권위보다 증거 |
| 1인칭 | 「私 (わたし)」 |
| 말투 | 「~なのだ」「自分の 目で 確かめるのだ」「望遠鏡で 見て ごらん」 |
| 좋아하는 것 | 밤하늘 관측, 망원경, 직접 확인하기 |
| 모티프 | 갈릴레오 갈릴레이 (망원경 천체관측, 목성의 4대 위성, 지동설 옹호) |
| 핵심 대사 | 「権威が どう 言おうと、 自分の 目で 見た ことが 真実なのだ」 |
| **표시명** | **ガリレオ** |

**중요**: 「ガリレオ」는 이름으로 사용 가능. 풀네임·생몰년은 학습 자료에서만 (「ガリレオ·ガリレイ, 1564-1642」).

---

## 3. 미스터리 트릭 「動いているのは どっち?」

### 3-1. 핵심 미스터리

ガリレオ의 천문대. 그가 보여준 관측 기록: 밤마다 木星 옆에 작은 별 4개가 보이는데, **매일 위치가 바뀐다**. 어떤 날은 목성 왼쪽, 어떤 날은 오른쪽, 어떤 날은 안 보임. 별이라면 고정돼 있어야 하는데 왜 움직이는가?

당시 사람들은 「모든 천체는 지구를 중심으로 돈다(天動説)」고 믿었음. 그런데 이 4개는 목성을 도는 것처럼 보인다.

### 3-2. 단서 시퀀스

| Step | 단서 | 발견자 | 의미 |
|---|---|---|---|
| 1 | 망원경으로 목성 옆 4개 점 관찰 | リオ | 맨눈엔 안 보이던 작은 별 4개 |
| 2 | 며칠간 위치 기록 비교 | ハル | 4개의 위치가 매일 변함 |
| 3 | 목성 기준으로 좌우 왕복 패턴 | ヒナタ | 목성을 중심으로 왔다 갔다 함 |
| 4 | 「별이라면 고정」 상식과 모순 | ハル | 고정된 별이 아니라 목성을 도는 중 |
| 5 | ガリレオ 「지구가 중심이 아닐 수도」 노트 | ヒナタ | 모든 게 지구를 도는 건 아님 |
| 6 | 결론: 목성도 「중심」을 가짐 | 3인 협력 | 천동설의 「모든 것이 지구 중심」이 흔들림 |

### 3-3. 진실 (ガリレオ 자백)

「お見事だ! まさに 私が 望遠鏡で 確かめた 真実なのだ。」

- 목성 옆 4개의 점은 별이 아니라 **목성을 도는 위성(달)**
- 모든 천체가 지구를 도는 것이라면, 이 4개는 설명 불가
- 「적어도 이 4개는 지구가 아닌 목성을 돈다」 → **「모든 것이 지구 중심」(天動説)은 틀렸을 수 있다**
- 직접 망원경으로 본 증거가, 오래된 믿음보다 강함
- 「権威が どう 言おうと、 自分の 目で 見た ことが 真実なのだ」

### 3-4. 학습 포인트 연결

ガリレオ: 「観測が、 真実を 教えてくれる。 望遠鏡は、 人類の 目を 宇宙へ 広げたのだ」
→ 학습 자료 (지동설·천동설·망원경·관측).

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: '天空の真実',
  subtitle: '動いているのは どっち?',
  bg: 'bg_ch07_observatory',
  lines: [
    { speaker: 'narrator',          text: 'メンデルの 紹介で、 丘の 上の 天文台を 訪ねた。 夜空が 一面に 広がる。' },
    { speaker: 'hinata',            text: 'こちらが ガリレオさんの 天文台 です。 大きな 望遠鏡が…' },
    { speaker: 'rio',               text: 'うわぁ、 星が こんなに! 望遠鏡 のぞいて みたい!' },
    { speaker: 'haru',              text: '観測ノートが 山ほど ある… 毎晩 記録 してるんだ。' },
    { speaker: 'galileo_telescope', text: 'よく 来た! 私が ガリレオだ。 ちょうど 不思議な ものを 見つけてな。' },
    { speaker: 'galileo_telescope', text: 'この 望遠鏡で 木星を 見ると — そばに 小さな 星が 4つ 見えるのだ。' },
    { speaker: 'rio',               text: '木星の そば? 見せて 見せて!' },
    { speaker: 'narrator',          text: '望遠鏡を のぞくと、 明るい 木星の 横に、 小さな 光の 点が 4つ 並んでいた。' },
    { speaker: 'haru',              text: 'ほんとだ、 4つ 並んでる… でも これが どうして 謎なの?' },
    { speaker: 'galileo_telescope', text: 'それがな、 毎晩 位置が 変わるのだ。 昨日は 左、 今日は 右…' },
    { speaker: 'hinata',            text: '星は 動かない はず なのに… 変なんですね。' },
    { speaker: 'galileo_telescope', text: '当時の 常識では 「すべての 天体は 地球を 中心に まわる」 と されていた。' },
    { speaker: 'galileo_telescope', text: 'だが この 4つは… どうも 地球を まわって いる ようには 見えないのだ。' },
    { speaker: 'rio',               text: 'えっ、 じゃあ 何を まわってるの?' },
    { speaker: 'galileo_telescope', text: 'ふふ。 権威が どう 言おうと、 自分の 目で 確かめる ことだ。' },
    { speaker: 'galileo_telescope', text: '皆の 力で、 この 謎を 解いて くれるか?' },
    { speaker: 'penta',             text: 'ペンッ! 動く 星の 謎、 見るペン!' },
  ],
  cta: '🔭 観測を 始める',
},
```

### 4-2. steps

#### Step 1 — 망원경 관찰

```javascript
{
  id: 'step1',
  title: '🔭 STEP 1: 望遠鏡で 木星を 見る',
  bg: 'bg_ch07_observatory',
  question: 'まず 望遠鏡で 木星を 観察しよう。 何が 見える?',
  options: [
    {
      label: '木星の そばに、 肉眼では 見えない 小さな 点が 4つ',
      isCorrect: true,
      response: [
        { speaker: 'rio',               text: 'わぁ! 木星の 横に 小さな 点が 4つ! 肉眼じゃ 見えなかった!' },
        { speaker: 'haru',              text: '望遠鏡が あるから 見える んだね。 道具が 新しい 発見を 生む。' },
        { speaker: 'hinata',            text: 'この 4つの 点が、 謎の 鍵 みたいですね。' },
        { speaker: 'galileo_telescope', text: 'そうだ。 望遠鏡は、 人の 目を 宇宙へ 広げる 道具なのだ。' },
      ],
    },
    {
      label: '月の クレーターを 数える',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '今は 木星の そばの 点に 注目しよう。' },
      ],
    },
  ],
},
```

#### Step 2 — 위치 변화 기록

```javascript
{
  id: 'step2',
  title: '📓 STEP 2: 数日間の 記録を 比べる',
  bg: 'bg_ch07_observatory',
  question: '何日分かの 観測記録を 並べた。 4つの 点は どうなってる?',
  options: [
    {
      label: '毎日 位置が 変わっている',
      isCorrect: true,
      response: [
        { speaker: 'haru',              text: '1日目は 左に 3つ・右に 1つ… 2日目は 配置が 違う!' },
        { speaker: 'rio',               text: 'ほんとだ、 毎日 並び方が 変わってる!' },
        { speaker: 'hinata',            text: '固定された 星 なら、 こんなに 動かない はず…' },
        { speaker: 'galileo_telescope', text: 'その通り。 動く という ことが、 何かを 物語って いるのだ。' },
      ],
    },
    {
      label: 'ずっと 同じ 位置',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '記録を 見ると、 毎日 位置が 変わってるよ。' },
      ],
    },
  ],
},
```

#### Step 3 — 좌우 왕복 패턴

```javascript
{
  id: 'step3',
  title: '↔️ STEP 3: 動きの パターンを 探る',
  bg: 'bg_ch07_observatory',
  question: 'ヒナタが 点の 動きを 図に した。 どんな パターン?',
  options: [
    {
      label: '木星を 中心に、 左右を 行ったり 来たり している',
      isCorrect: true,
      response: [
        { speaker: 'hinata',            text: '点は 木星の 左右を 往復 しています — まるで 木星を まわる みたいに。' },
        { speaker: 'rio',               text: '木星の まわりを グルグル! だから 左右に 見えるんだ!' },
        { speaker: 'haru',              text: '横から 見てるから、 円運動が 左右の 往復に 見える のか…' },
        { speaker: 'galileo_telescope', text: '鋭い! 円を 横から 見れば、 往復に 見える。 その通りなのだ。' },
      ],
    },
    {
      label: 'バラバラで 規則が ない',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: 'よく 見ると、 木星を 中心に 往復する 規則が あります。' },
      ],
    },
  ],
},
```

#### Step 4 — 상식과의 모순

```javascript
{
  id: 'step4',
  title: '🤔 STEP 4: 当時の 常識と 比べる',
  bg: 'bg_ch07_observatory',
  question: '「すべての 天体は 地球を まわる」 という 常識と 照らすと?',
  options: [
    {
      label: 'この 4つは 地球では なく 木星を まわっている — 常識と 矛盾する',
      isCorrect: true,
      response: [
        { speaker: 'haru',              text: '「すべてが 地球を まわる」 なら、 木星を まわる 星は 説明 できない…' },
        { speaker: 'hinata',            text: '少なくとも この 4つは 地球 中心 じゃ ない…!' },
        { speaker: 'rio',               text: '常識が 間違ってる かもって こと?' },
        { speaker: 'galileo_telescope', text: '観測が 常識と 合わない とき — 疑うべきは 観測か、 常識か。 私は 自分の 目を 信じる。' },
      ],
    },
    {
      label: '常識は 絶対 正しい',
      isCorrect: false,
      response: [
        { speaker: 'galileo_telescope', text: '常識でも、 観測と 合わなければ 疑う べきなのだ。' },
      ],
    },
  ],
},
```

#### Step 5 — ガリレオ의 노트

```javascript
{
  id: 'step5',
  title: '📖 STEP 5: ガリレオの 仮説ノート',
  bg: 'bg_ch07_observatory',
  question: 'ガリレオの ノートを 開いた。 何が 書いてある?',
  options: [
    {
      label: '「地球が 宇宙の 中心 では ないかも しれない」',
      isCorrect: true,
      response: [
        { speaker: 'hinata',            text: '「地球は 宇宙の 中心では ないかも」…! 大胆な 考えです。' },
        { speaker: 'haru',              text: '木星にも 「まわる 星」 が ある なら、 地球だけが 特別 じゃ ない…' },
        { speaker: 'rio',               text: 'みんなが 信じてた ことと 違う! 勇気 いるね。' },
        { speaker: 'galileo_telescope', text: '真実は、 多数決では 決まらぬ。 証拠が 決めるのだ。' },
      ],
    },
    {
      label: 'ノートを 閉じる',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: 'ガリレオさんの 仮説に ヒントが あります。 読みましょう。' },
      ],
    },
  ],
},
```

#### Step 6 — 결론 + ガリレオ 자백

```javascript
{
  id: 'step6',
  title: '🧩 STEP 6: 推理を 組み立てる',
  bg: 'bg_ch07_observatory',
  question: '全ての 手がかりが 揃った。 ガリレオに どう 伝える?',
  options: [
    {
      label: '「4つは 木星を まわる 衛星。 だから 『すべてが 地球を まわる』 は 誤り」',
      isCorrect: true,
      response: [
        { speaker: 'galileo_telescope', text: 'お見事だ! まさに 私が 望遠鏡で 確かめた 真実なのだ。' },
        { speaker: 'galileo_telescope', text: 'この 4つは 星では ない。 木星を まわる 「衛星」 — 木星の 月 なのだ。' },
        { speaker: 'galileo_telescope', text: 'もし すべてが 地球を まわる なら、 木星を まわる 星など あり得ない。' },
        { speaker: 'galileo_telescope', text: 'つまり 「すべてが 地球 中心」 という 常識は、 正しくない かも しれぬ。' },
        { speaker: 'hinata',            text: '自分の 目で 見た 証拠が、 古い 常識を 揺るがせた んですね。' },
        { speaker: 'haru',              text: '望遠鏡という 新しい 道具が、 新しい 真実を 見せてくれた…' },
        { speaker: 'rio',               text: 'みんなと 違っても、 ちゃんと 見て 確かめるのが 大事 なんだ!' },
        { speaker: 'galileo_telescope', text: 'その通り。 観測が 真実を 教える。 さあ、 宇宙の 話を もっと しよう。' },
      ],
    },
    {
      label: '「4つは ただの 偶然の 光」',
      isCorrect: false,
      response: [
        { speaker: 'galileo_telescope', text: '毎晩 規則的に 動く。 偶然 では 説明 できないのだ。' },
      ],
    },
    {
      label: '「やっぱり すべて 地球を まわっている」',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '木星を まわる 4つは、 それでは 説明 できないよ。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch07_observatory',
  lines: [
    { speaker: 'galileo_telescope', text: '皆の おかげで、 私の 観測を きちんと 説明 できた。 感謝するぞ。' },
    { speaker: 'galileo_telescope', text: '真実は 多数決では なく、 証拠が 決める。 自分の 目で 確かめる ことを 忘れるな。' },
    { speaker: 'rio',               text: '望遠鏡で 見た 4つの 星が、 宇宙の 見方を 変えたんだ!' },
    { speaker: 'haru',              text: '新しい 道具が、 新しい 発見を 生む… ニュートンや アインの 話 とも つながるね。' },
    { speaker: 'hinata',            text: '観測と 証拠を 大切に する — 科学の 基本 ですね。' },
    { speaker: 'galileo_telescope', text: 'その通り。 宇宙の 仕組みを、 もう 少し 学んで みよう。' },
    { speaker: 'penta',             text: 'ペンッ! 宇宙の 勉強、 ペン!' },
  ],
  cta: '📚 学習資料を 開く',
},
```

---

## 5. 학습 자료 6섹션

### 5-1. concept

```javascript
concept: {
  title: '天体観測と 地動説',
  paragraphs: [
    '事件 7 で 木星の そばに 見えた 4つの 点 — それは 木星を まわる 「衛星 (えいせい)」 でした。 ガリレオ は 1610年、 自作の 望遠鏡で これを 発見 しました。 木星の 4大 衛星は 今も 「ガリレオ 衛星」 と 呼ばれて います。',
    'それまで 多くの 人は 「地球が 宇宙の 中心で、 すべての 天体が 地球を まわる」 という 「天動説 (てんどうせつ)」 を 信じて いました。 ですが、 木星を まわる 衛星が ある なら、 「すべてが 地球を まわる」 とは 言えません。',
    'これは 「地球も 太陽の まわりを まわる 惑星の 一つだ」 という 「地動説 (ちどうせつ)」 を 支える 観測でした。 地動説は コペルニクス が 唱え、 ガリレオ の 観測が 力強い 証拠を 与えたのです。',
    'ガリレオ の 発見が 大切なのは、 「権威や 常識」 ではなく 「自分の 目で 見た 観測」 を 根拠に した ことです。 望遠鏡という 新しい 道具が、 人類の 宇宙観を 大きく 変えました。 観測と 証拠を 重んじる — これは 今の 科学の 土台です。',
  ],
  highlight: '木星の 衛星 = 「すべてが 地球を まわる」 の 反証。 観測と 証拠が、 古い 常識を 更新する。',
},
```

### 5-2. diagrams (SVG 4개)

#### 도해 1: 천동설 vs 지동설 (500×300)
- 좌: 天動説 — 지구 중심, 태양·행성이 지구를 돔
- 우: 地動説 — 태양 중심, 지구·행성이 태양을 돔
- 캡션: 「中心は 地球か、 太陽か」

#### 도해 2: 목성과 4대 위성 (500×280)
- 목성 + 주위를 도는 위성 4개 (궤도 원)
- 며칠간 위치 변화 → 좌우 왕복으로 보임 (작은 보조 그림)
- 캡션: 「木星を まわる 4つの 衛星 (ガリレオ衛星)」

#### 도해 3: 망원경의 원리 (450×260)
- 렌즈 2개 → 먼 물체를 크게
- 맨눈 vs 망원경 시야 비교 (작은 점 → 4개 위성 보임)
- 캡션: 「望遠鏡 — 人の 目を 宇宙へ 広げる」

#### 도해 4: 관측이 상식을 바꾸다 (450×280)
- 「常識(천동설)」 ↔ 「観測(목성 위성)」 충돌 → 「새 이해(지동설)」
- 캡션: 「証拠が、 古い 常識を 更新する」

### 5-3. formulas + unitsTable

```javascript
formulas: [
  {
    name: '観測 > 権威',
    formula: '自分の 目で 見た 証拠 > 古い 常識·権威',
    formulaSimple: '証拠 우선',
    explanation: '진실은 다수결이나 권위가 아니라 관측·증거로 정해짐. 갈릴레오의 태도이자 과학의 기본.',
    note: '木星 위성이라는 한 가지 관측이 「모든 것이 지구 중심」을 반증.',
  },
  {
    name: '地動説',
    formula: '地球 = 太陽을 도는 惑星의 하나',
    formulaSimple: '太陽 中心',
    explanation: '지구는 우주의 중심이 아니라 태양을 도는 행성. 코페르니쿠스 제창, 갈릴레오 관측이 뒷받침.',
    note: '천동설(지구 중심)에서 지동설(태양 중심)로의 전환.',
  },
],
unitsTable: {
  title: '天体観測 키워드 정리',
  rows: [
    ['용어', '의미', '예시·비고'],
    ['天動説 (てんどうせつ)', '지구가 중심, 모든 천체가 지구를 돈다는 옛 설', '갈릴레오 이전의 상식'],
    ['地動説 (ちどうせつ)',   '지구가 태양을 도는 행성이라는 설',     '코페르니쿠스·갈릴레오'],
    ['衛星 (えいせい)',       '행성 주위를 도는 천체',               '목성의 4대 위성·지구의 달'],
    ['望遠鏡 (ぼうえんきょう)', '먼 천체를 크게 보는 도구',          '갈릴레오가 천체관측에 사용'],
    ['観測 (かんそく)',       '직접 관찰·기록하는 것',               '매일 밤 위성 위치 기록'],
    ['証拠 (しょうこ)',       '주장을 뒷받침하는 사실',              '권위보다 우선하는 근거'],
  ],
},
```

### 5-4. flashcards (10장)

```javascript
flashcards: [
  { front: '天動説 (てんどうせつ)', back: '지구가 우주 중심이고 모든 천체가 지구를 돈다는 옛 설. 갈릴레오 관측으로 흔들림.' },
  { front: '地動説 (ちどうせつ)',   back: '지구가 태양을 도는 행성의 하나라는 설. 코페르니쿠스 제창, 갈릴레오가 증거 제공.' },
  { front: '衛星 (えいせい)',       back: '행성 주위를 도는 천체. 목성의 4대 위성, 지구의 달.' },
  { front: 'ガリレオ衛星',          back: '갈릴레오가 1610년 발견한 목성의 4대 위성. 이오·에우로파·가니메데·칼리스토.' },
  { front: '望遠鏡 (ぼうえんきょう)', back: '렌즈로 먼 천체를 크게 보는 도구. 갈릴레오가 천체관측에 처음 본격 사용.' },
  { front: '木星 (もくせい)',       back: '태양계 최대 행성. 갈릴레오가 그 주위 위성을 관측해 지동설 증거로 삼음.' },
  { front: 'コペルニクス',          back: '지동설을 처음 체계적으로 주장한 천문학자. 갈릴레오가 관측으로 뒷받침.' },
  { front: '観測 (かんそく)',       back: '직접 관찰하고 기록하는 것. 갈릴레오는 「권위보다 관측」을 중시.' },
  { front: '証拠 (しょうこ)',       back: '주장을 뒷받침하는 사실. 진실은 다수결이 아닌 증거로 정해짐.' },
  { front: 'ガリレオ·ガリレイ',     back: '이탈리아 천문학자·물리학자(1564-1642). 망원경 천체관측, 지동설 옹호. 「근대 과학의 아버지」.' },
],
```

### 5-5. exercises (10문제)

```javascript
exercises: [
  {
    q: '事件 7 で 木星 옆 4개의 점의 정체는?',
    options: ['먼 별', '목성을 도는 衛星', '혜성', '인공위성'],
    correct: 1,
    explanation: '事件 7 핵심. 목성을 도는 4대 위성. 「모든 것이 지구를 돈다」를 반증.',
  },
  {
    q: '「모든 천체가 지구를 돈다」는 옛 학설은?',
    options: ['地動説', '天動説', '進化論', '相対性理論'],
    correct: 1,
    explanation: '天動説(지구 중심설). 갈릴레오의 목성 위성 관측이 이를 흔듦.',
  },
  {
    q: '갈릴레오가 천체관측에 사용한 도구는?',
    options: ['顕微鏡', '望遠鏡', '温度計', '羅針盤'],
    correct: 1,
    explanation: '望遠鏡(망원경). 맨눈으로 안 보이던 목성 위성을 발견.',
  },
  {
    q: '지동설을 처음 체계적으로 주장한 사람은?',
    options: ['ガリレオ', 'コペルニクス', 'ニュートン', 'ケプラー'],
    correct: 1,
    explanation: '코페르니쿠스. 갈릴레오가 관측으로 강력한 증거 제공.',
  },
  {
    q: '행성 주위를 도는 천체를 무엇이라 하는가?',
    options: ['恒星', '衛星', '彗星', '流星'],
    correct: 1,
    explanation: '衛星. 목성의 4대 위성, 지구의 달이 그 예.',
  },
  {
    q: '목성 위성이 매일 위치가 달라 보이는 이유는?',
    options: ['별이 깜빡여서', '목성 주위를 돌기 때문', '지구가 흔들려서', '망원경 고장'],
    correct: 1,
    explanation: '목성을 도는 원운동을 옆에서 보면 좌우 왕복으로 보임.',
  },
  {
    q: '갈릴레오가 가장 중시한 과학적 태도는?',
    options: ['권위에 따른다', '자신의 눈으로 관측·확인한다', '다수결로 정한다', '전통을 지킨다'],
    correct: 1,
    explanation: '「권위가 뭐라 하든 자기 눈으로 확인」. 관측·증거 중시가 과학의 기본.',
  },
  {
    q: '지동설에서 지구는?',
    options: ['우주의 중심', '태양을 도는 행성', '움직이지 않음', '태양보다 큼'],
    correct: 1,
    explanation: '지구는 중심이 아니라 태양을 도는 행성의 하나.',
  },
  {
    q: '망원경이 천문학에 가져온 변화는?',
    options: ['아무 변화 없음', '맨눈으로 못 보던 천체를 관측 가능', '별을 더 작게 봄', '낮에만 관측 가능'],
    correct: 1,
    explanation: '망원경으로 목성 위성·달 표면 등 새 천체 관측 → 우주관 변화.',
  },
  {
    q: '갈릴레오가 「근대 과학의 아버지」로 불리는 이유는?',
    options: ['책을 많이 써서', '관측·실험·증거 중심의 과학 방법을 확립', '왕이어서', '망원경을 발명해서'],
    correct: 1,
    explanation: '권위가 아닌 관측·실험·증거에 기반한 과학 방법을 확립.',
  },
],
```

### 5-6. tips (8포인트)

```javascript
tips: [
  { title: '①  観測 > 権威',                 body: '진실은 권위·다수결이 아니라 관측·증거로 정해짐. 갈릴레오의 핵심 태도.' },
  { title: '②  木星의 4대 위성',             body: '갈릴레오가 1610년 발견. 「모든 것이 지구를 돈다」를 반증한 결정적 관측.' },
  { title: '③  天動説 → 地動説',             body: '지구 중심에서 태양 중심으로. 코페르니쿠스 제창, 갈릴레오 관측이 뒷받침.' },
  { title: '④  道具가 발견을 낳는다',         body: '망원경이라는 새 도구가 새 천체를 보여줌. 사건 5 현미경과 같은 원리.' },
  { title: '⑤  円을 옆에서 = 왕복',          body: '위성의 원운동을 옆에서 보면 좌우 왕복으로 보임. 관측의 기하학.' },
  { title: '⑥  常識도 의심할 수 있다',        body: '관측과 안 맞으면 상식을 의심. 과학은 끊임없이 검증·갱신.' },
  { title: '⑦  지구는 특별하지 않다',         body: '목성에도 위성이 있다 = 지구만 중심이 아님. 인간 중심 우주관의 전환.' },
  { title: '⑧  証拠를 기록하라',             body: '갈릴레오는 매일 밤 위치를 기록. 꾸준한 관측 기록이 법칙을 드러냄(멘델과 통함).' },
],
```

---

## 6. caseQuiz (5문제)

```javascript
caseQuiz: [
  {
    q: '事件 7 で 木星 옆 4개의 정체는?',
    options: ['먼 별', '목성을 도는 衛星', '혜성', '인공위성'],
    correct: 1,
  },
  {
    q: '「모든 천체가 지구를 돈다」는 옛 설은?',
    options: ['地動説', '天動説', '進化論', '万有引力'],
    correct: 1,
  },
  {
    q: '갈릴레오가 사용한 관측 도구는?',
    options: ['顕微鏡', '望遠鏡', '温度計', '羅針盤'],
    correct: 1,
  },
  {
    q: '갈릴레오가 중시한 것은?',
    options: ['권위', '자기 눈의 관측·증거', '다수결', '전통'],
    correct: 1,
  },
  {
    q: '事件 7 의 핵심 메시지는?',
    options: ['상식은 늘 옳다', '관측·증거가 상식을 갱신한다', '하늘은 변하지 않는다', '도구는 불필요하다'],
    correct: 1,
  },
],
```

---

## 7. 데이터·엔진 갱신

### 7-1. data/series4-scientists.js — SCIENTISTS_STORY[6] (id=7)

```javascript
{
  id: 7, icon: '🔭',
  title: '天空の真実',
  subtitle: '動いているのは どっち?',
  theme: '天体観測·地動説·望遠鏡·衛星',
  bgm: 'mystery',
  illustration: SCIENTISTS_CASE_IMAGES[7],
  charKey: 'galileo_telescope',
  sceneKey: 'bg_ch07_observatory',
  comingSoon: false,
  learnRef: 'scientists_case07',
  intro: { /* §4-1 */ },
  steps: [ /* §4-2 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6 */ ],
  note: {
    title: '第7事件 天空の 真実',
    desc: '木星 곁의 4개 점 — 목성을 도는 위성. 「모든 것이 지구를 돈다」를 반증하고 地動説을 뒷받침한 관측. 권위가 아닌 「자기 눈의 증거」를 중시한 갈릴레오의 과학 태도를 배운 第七歩.'
  },
},
```

### 7-2. data/series4-scientists-learn.js — scientists_case07 추가 (case01~06 보존)

```javascript
scientists_case07: {
  title: '天体観測と 地動説',
  subtitle: '事件 7 で 学んだ こと',
  examScope: '중학 理科(地学) + 比喩 중심',
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

기존 6개 NPC 뒤에 추가:
```javascript
galileo_telescope: { cls: 'sensei', name: 'ガリレオ', charKey: 'galileo_telescope', pos: 'center' },
```

콘솔 검증:
```javascript
SCIENTISTS_SPEAKER_MAP.galileo_telescope        // 객체
SCIENTISTS_SPEAKER_MAP.galileo_telescope.name   // 'ガリレオ'
```

---

## 8. 검증

### 8-1. 콘솔

```javascript
SCIENTISTS_STORY[6].id                                    // 7
SCIENTISTS_STORY[6].comingSoon                            // false
SCIENTISTS_STORY[6].learnRef                              // "scientists_case07"
SCIENTISTS_STORY[6].charKey                               // "galileo_telescope"
SCIENTISTS_STORY[6].intro.lines.length                    // 17
SCIENTISTS_STORY[6].steps.length                          // 6
SCIENTISTS_STORY[6].steps[5].options[0].response.length   // 8
SCIENTISTS_STORY[6].ending.lines.length                   // 7
SCIENTISTS_STORY[6].caseQuiz.length                       // 5
SCIENTISTS_LEARN.scientists_case07                        // 객체
SCIENTISTS_LEARN.scientists_case07.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case07.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case07.diagrams.length        // 4
SCIENTISTS_SPEAKER_MAP.galileo_telescope                  // 객체
SCIENTISTS_SPEAKER_MAP.galileo_telescope.name             // 'ガリレオ'
// 회귀
SCIENTISTS_STORY[5].comingSoon  // false (case 6)
SCIENTISTS_STORY[7].comingSoon  // true (case 8 placeholder)
SCIENTISTS_SPEAKER_MAP.mendel_pea  // 보존
```

### 8-2. 시각

- [ ] 사건 7 카드 잠금 풀림
- [ ] **ガリレオ 등장 시 「ガリレオ」 이름 + galileo_telescope.png 초상화** (fallback 아님 ⭐)
- [ ] STEP 1~6 + step6 결론 8줄
- [ ] 학습 6탭 + SVG 4개
- [ ] caseQuiz 5문제 + 별점
- [ ] 사건 7 클리어 마크

### 8-3. 회귀
- [ ] 시리즈 1~3, 5~12 정상
- [ ] 사건 1~6 NPC 보존
- [ ] 사건 8~10 placeholder 그대로

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| SCIENTISTS_STORY[0]~[5] 수정 | 사건 1~6 완성 |
| SCIENTISTS_STORY[7]~[9] 수정 | 사건 8~10 별도 명세서 |
| SCIENTISTS_LEARN.scientists_case01~06 수정 | 보존 |
| SPEAKER_MAP 기존 6개 NPC 수정 | 사건 1~6 동작 보존 |
| engine/scientists-learn.js·시리즈3·자산 PNG | 보존 |
| 실명 풀네임을 ガリレオ 대사로 강제 | 가상 캐릭터 (이름 ガリレオ만) |

---

## 10. 작업 순서

```
Step 1: 사건 6 구조 + SPEAKER_MAP 정독
Step 2: ⭐ engine/detectives-B.js에 galileo_telescope 등록 (먼저!) + 콘솔 검증
Step 3: SCIENTISTS_STORY[6] 교체 + 콘솔 검증
Step 4: scientists_case07 추가 (case01~06 보존) + 콘솔 검증
Step 5: 시각 검증 (§8-2)
Step 6: 회귀 테스트 (§8-3)
Step 7: commit + push
  - "feat(series04/case07): add Galileo/astronomy content + register galileo_telescope in speaker map"
Step 8: 완료 보고
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE07_SPEC.md를 정독하고, 시리즈 4 사건 7 「天空の真実」 
본격 콘텐츠를 작성해줘. 사건 6과 동일 패턴.

[⭐ 가장 중요]
engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 galileo_telescope 등록을 
가장 먼저 (Step 2). 기존 6개 NPC와 동일 형식:
  galileo_telescope: { cls: 'sensei', name: 'ガリレオ', charKey: 'galileo_telescope', pos: 'center' }
누락 시 「ナレーター」 fallback. 등록 후 콘솔 검증.

[핵심 원칙]
- 사건 6 (SCIENTISTS_STORY[5], scientists_case06) 패턴 mirror.
- SCIENTISTS_STORY[6]만 교체, SCIENTISTS_LEARN에 scientists_case07만 추가 (case01~06 보존).
- galileo_telescope.png 이미 존재 — 신규 PNG 생성 X.

[천체관측 주제의 톤]
- 권위·다수결이 아닌 「관측·증거」 우선 (갈릴레오 태도)
- 천동설→지동설은 「상식도 검증 대상」임을 보여줌
- 도구(망원경)가 새 발견을 낳음 (사건 5 현미경과 연결)
- 「지구가 특별한 중심이 아님」을 친화적으로

[금지] 사건 1~6·SPEAKER_MAP 기존 6개·사건 8~10 placeholder·시리즈3·engine/scientists-learn.js·자산 PNG 미수정.

[회귀] push 전 시리즈 1~3·5~12 + 사건 1~6 NPC + 영어학습 + 채팅 확인.

commit msg: "feat(series04/case07): add Galileo/astronomy content + register galileo_telescope in speaker map"
```

---

**END OF SPEC**
