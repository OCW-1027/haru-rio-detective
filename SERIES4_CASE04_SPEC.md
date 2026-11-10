# SERIES 4 — CASE 4 CONTENT SPEC (최종본)
## 「島々の鳥たち」 — 航海者ダーリン教授·進化論

**작성일**: 2026-06-24 (개정)
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 commit**: `2b54475` (hikari_curie 복원 + drop-shadow 약화)
**선행 사건**: 사건 1·2·3 완성 (만유인력·상대성·방사능)

**이 명세서의 핵심 변경 (조사 결과 반영)**:
- ⭐ **§7-3 SCIENTISTS_SPEAKER_MAP 등록 단계 추가** — 사건 2·3에서 NPC가 「ナレーター」로 fallback된 버그의 근본 원인. 신규 NPC `darwin_voyager`를 반드시 등록.
- ✅ NPC PNG는 이미 준비됨 (`darwin_voyager.png`, RGBA, alpha 처리 완료) — 신규 생성 불필요.
- ✅ 신규 PNG 생성 부담 0. 기존 자원만 사용.

**범위**:
- ✅ 사건 4 본격 스토리 (intro + steps + 미스터리 트릭 + 결말)
- ✅ ダーリン教授 인격·말투 정립
- ✅ 학습 자료 6섹션 (진화론·자연선택·적응·변이·유전)
- ✅ 챕터 클리어 퀴즈 5문제
- ✅ data/series4-scientists.js 사건 4 갱신
- ✅ data/series4-scientists-learn.js에 scientists_case04 키 추가
- ✅ engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 darwin_voyager 등록
- ❌ 사건 5~10 콘텐츠 (각각 별도 명세서)
- ❌ 신규 PNG 생성 (이미 존재)

---

## 0. PRE-FLIGHT CHECKLIST

- [ ] commit 2b54475 정상 (사건 1·2·3 플레이 가능)
- [ ] SCIENTISTS_STORY[3]이 placeholder (comingSoon: true) 상태
- [ ] SCIENTISTS_LEARN에 scientists_case01~03만 존재
- [ ] assets/characters/series04/darwin_voyager.png 존재 (RGBA) 확인
- [ ] git 상태 깨끗
- [ ] 신규 브랜치 권장: feat/series04-case04-darwin

---

## 1. 사건 4 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 4 |
| 사건 제목 | **島々の鳥たち (しまじまの とりたち)** |
| 부제 | 似ているけれど 違う鳥たちの 謎 |
| 학습 테마 | 進化論 / 自然選択 / 適応 / 変異·遺伝 / 種의 다양성 |
| 학습 깊이 | 중학 生物 + 比喩 중심 (정성적 이해) |
| 등장 NPC | ダーリン教授 (darwin_voyager) |
| 동행자 | ハル + リオ + ヒナタ + ペンタ |
| 메인 배경 | bg_ch04_beagle (비글호 갑판) |
| 추리 트릭 | 「似ているのに 違う鳥」 — 5개 섬에서 발견된 5종 핀치새의 부리 차이 |
| 예상 플레이타임 | 12~15분 |

---

## 2. ダーリン教授 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 긴 흰 수염 + 항해복 + 망원경 + 표본 가방 (자산 PNG darwin_voyager.png 그대로) |
| 나이 | 50대 |
| 직업 | 자연주의자·항해 탐험가 |
| 거주 | 항해 중인 비글호 |
| 성격 | 호기심 많고 끈기 있는 자연 관찰자, 끊임없이 「왜?」를 묻는 학자 |
| 1인칭 | 「私 (わたし)」 |
| 말투 | 「~なんだよ」「~ですね」「観察してみよう」「自然は 嘘を つかない」 |
| 좋아하는 것 | 표본 수집, 항해, 어린이의 호기심 |
| 모티프 | 찰스 다윈 (비글호 항해 1831-1836, 갈라파고스 핀치, 自然選択説) |
| 핵심 대사 (예) | 「自然は 観察すれば 必ず 答えを 教えて くれるんだよ」 |
| **표시명 (SPEAKER_MAP)** | **ダーリン教授** |

**중요**: 실명 「ダーウィン」은 사건 진행 중 사용 안 함. 학습 자료에서는 「チャールズ·ダーウィン (1809-1882)」로 사실 정보 별도 제공.

---

## 3. 미스터리 트릭 「似ているのに 違う鳥」

### 3-1. 핵심 미스터리

ダーリン教授가 비글호 항해 중 5개의 섬 (가상의 「ガラ諸島」)에서 수집한 핀치새 5종 표본. **모두 같은 핀치 종류 같은데 부리 모양이 다 다름**. 왜 비슷한 새인데 부리가 이렇게 다른가?

「島ごとに 違うんだよ。同じ 鳥 みたいなのに、なぜ?」

### 3-2. 단서 시퀀스

| Step | 단서 | 발견자 | 의미 |
|---|---|---|---|
| 1 | 5종 핀치새 부리 모양 차이 비교 | リオ | 5종 모두 다른 부리 — A:큰 / B:가는 / C:뾰족한 / D:길쭉한 / E:중간 |
| 2 | 각 섬의 환경 조사 | ハル | 섬마다 다른 식생 (씨앗·곤충·꽃·과일·작은 동물) |
| 3 | 부리 ↔ 먹이 관계 | ヒナタ | A=큰 씨앗, B=가는 씨앗, C=곤충, D=꽃꿀, E=과일 |
| 4 | ダーリン교수 화석 기록 | ハル | 옛 지층 — 옛날엔 한 종, 시간이 흐르며 5종으로 분화 |
| 5 | 새끼·알 관찰 | ヒナタ | 부모와 같은 부리 모양 = 유전 |
| 6 | 결론: 자연선택·적응 | 3인 협력 | 같은 조상에서 환경에 맞게 변화 |

### 3-3. 진실 (ダーリン教授 자백)

「素晴らしいよ、君たち。まさに 私が 何年も 考えていた 答えだ。」

- 옛날, 5개 섬에는 같은 종의 핀치새 하나만 살았음
- 시간이 흐르며 각 섬의 다른 환경 (먹이)에 적응
- 자연스럽게 환경에 맞는 부리를 가진 개체가 더 잘 살아남고 자손을 남김 = **자연선택 (しぜんせんたく)**
- 세대를 거치며 5종으로 분화 = **進化 (しんか)**
- 「これが 自然選択 — つまり 「進化」 なんだ。生き残りの 物語 だよ」

### 3-4. 학습 포인트 연결

教授: 「進化は 過去の 物語 ではないんだ。今も 続いている、生命の 物語 なんだよ。」

→ 학습 자료 모달로 자연스럽게 유도.

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: '島々の鳥たち',
  subtitle: '似ているけれど 違う鳥たちの 謎',
  bg: 'bg_ch04_beagle',
  lines: [
    { speaker: 'narrator',       text: 'キューリィ夫人の 紹介で、博物館に 停泊する 古い 帆船を 訪ねた。' },
    { speaker: 'hinata',         text: 'こちらが 航海者 ダーリン教授の 「ビーグル号」 です。' },
    { speaker: 'rio',            text: 'うわぁ、本物の 船!甲板に 上がれるの!?' },
    { speaker: 'haru',           text: 'たくさんの 標本ケースが ある… 鳥、貝、化石…' },
    { speaker: 'darwin_voyager', text: 'やぁ、若き 探偵さんたち!私が ダーリン だよ。よく 来てくれた。' },
    { speaker: 'darwin_voyager', text: 'ちょうど 困った 事を 考えていてね — 観察 結果が、私の 頭を 悩ませて いるんだ。' },
    { speaker: 'narrator',       text: '教授が 机に 並べた 5つの 鳥の 標本を 指さした。' },
    { speaker: 'rio',            text: 'えっ?全部 同じ 鳥に 見えるよ。フィンチ?' },
    { speaker: 'darwin_voyager', text: 'そう、皆 フィンチだ。でも、よく 見て ごらん。' },
    { speaker: 'hinata',         text: 'あ… くちばし の 形が、全部 違います!' },
    { speaker: 'haru',           text: '一つは 太くて 大きい、 一つは 細い、 一つは 鋭く 尖ってる…' },
    { speaker: 'darwin_voyager', text: 'そう なんだよ。 ガラ諸島 という 5つの 島 で、それぞれ 違う フィンチを 見つけた。' },
    { speaker: 'darwin_voyager', text: '同じ 種類の 鳥なのに、なぜ こんなに 違うのか — それが 謎なんだ。' },
    { speaker: 'rio',            text: '魔法?それとも… 偶然?' },
    { speaker: 'darwin_voyager', text: 'ふふ、自然は 偶然 だけでは 説明 できないんだよ。 観察すれば 必ず 答えが あるはずだ。' },
    { speaker: 'darwin_voyager', text: '皆で この 謎を 解いて くれないかね?' },
    { speaker: 'penta',          text: 'ペンッ!鳥の 謎、ペン!' },
  ],
  cta: '🔍 調査を 始める',
},
```

### 4-2. steps

#### Step 1 — 5종 부리 모양 비교

```javascript
{
  id: 'step1',
  title: '🐦 STEP 1: 5つの くちばしを 比べる',
  bg: 'bg_ch04_beagle',
  question: 'まず、5つの フィンチの くちばしを 詳しく 比べよう。何を 確認する?',
  options: [
    {
      label: 'くちばしの 形·太さ·長さを 一つずつ 記録 する',
      isCorrect: true,
      response: [
        { speaker: 'rio',    text: 'A は すごく 太くて 大きい!ナッツ 割り みたいだね!' },
        { speaker: 'haru',   text: 'B は 細くて 真っ直ぐ、 C は 鋭く 尖って いる…' },
        { speaker: 'hinata', text: 'D は 長くて 細い、 E は 普通の 大きさ。 5種類 全部 違います。' },
        { speaker: 'darwin_voyager', text: 'よく 観察した ね。記録は 科学の 基本だよ。' },
      ],
    },
    {
      label: 'くちばしの 色を 比べる',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '色は 似て いるよ。形が 違うところ から 調べよう。' },
      ],
    },
    {
      label: '全部 同じ だと 結論 する',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: 'よく 見ると 形が 違います。 違いを 見つける ことから 始めましょう。' },
      ],
    },
  ],
},
```

#### Step 2 — 각 섬의 환경 조사

```javascript
{
  id: 'step2',
  title: '🏝️ STEP 2: 5つの 島の 環境を 調べる',
  bg: 'bg_ch04_beagle',
  question: '教授の 航海日誌を 開いた。各島の 環境は どう?',
  options: [
    {
      label: '島ごとの 主な 食べ物·植物を 確認 する',
      isCorrect: true,
      response: [
        { speaker: 'haru',           text: '島1: 大きく 硬い 種子の 木が 多い。' },
        { speaker: 'rio',            text: '島2: 細い 種子の 草原!' },
        { speaker: 'hinata',         text: '島3: 昆虫が たくさん いる 森。 島4: 花の 蜜が 豊富。 島5: 様々な 果物。' },
        { speaker: 'darwin_voyager', text: 'よく 整理した ね。 環境の 違い と 鳥の 違い … 何か 見えて こないかい?' },
      ],
    },
    {
      label: '島の 温度だけ 確認',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '温度より 食べ物の 違いの 方が ヒント に なりそう。' },
      ],
    },
  ],
},
```

#### Step 3 — 부리와 먹이의 관계

```javascript
{
  id: 'step3',
  title: '🔗 STEP 3: くちばし と 食べ物 を つなげる',
  bg: 'bg_ch04_beagle',
  question: 'ヒナタが くちばし と 食べ物 を 一つずつ 結びつけた。 何が 見える?',
  options: [
    {
      label: '太い くちばし=硬い 種子、 細い くちばし=細い 種子、 尖った くちばし=昆虫…',
      isCorrect: true,
      response: [
        { speaker: 'hinata',         text: 'A の 太い くちばし は 硬い 種子を 割る ため!' },
        { speaker: 'rio',            text: 'B は 細い 種子、 C は 昆虫を 捕まえる ため!' },
        { speaker: 'haru',           text: 'D の 長い くちばし は 花の 蜜を 吸う ため、 E は 果物を 食べる ため…' },
        { speaker: 'darwin_voyager', text: 'まさに!くちばし の 形は、その 鳥が 食べる 物に ぴったり 合って いるんだ。' },
      ],
    },
    {
      label: '全部 偶然 だと 思う',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '5つ 全部 食べ物と 形が 一致してる… 偶然 では ないと 思う。' },
      ],
    },
  ],
},
```

#### Step 4 — 화석 기록 발견

```javascript
{
  id: 'step4',
  title: '🦴 STEP 4: 古い 化石を 調べる',
  bg: 'bg_ch04_beagle',
  question: '教授が 古い 地層から 集めた 化石を 見せてくれた。 何が 分かる?',
  options: [
    {
      label: '昔は 1種類だった フィンチが、 時間と ともに 5種類に 分かれた',
      isCorrect: true,
      response: [
        { speaker: 'haru',           text: '化石は… 昔の フィンチ は 1種類 だった!' },
        { speaker: 'hinata',         text: '時間が 経つに つれて、 だんだん 分かれて いった …' },
        { speaker: 'rio',            text: 'すごい!一つの 種から 5種類に なったって こと?' },
        { speaker: 'darwin_voyager', text: 'その 通りだ。 何万年 何十万年 という 長い 時間を かけて、 ね。' },
      ],
    },
    {
      label: '化石は 今の 鳥と 関係 ない',
      isCorrect: false,
      response: [
        { speaker: 'darwin_voyager', text: '化石は 過去の 証拠なんだよ。 慎重に 観察 すると、 つながりが 見えるんだ。' },
      ],
    },
  ],
},
```

#### Step 5 — 새끼·알 관찰

```javascript
{
  id: 'step5',
  title: '🥚 STEP 5: ひなと 親鳥を 観察',
  bg: 'bg_ch04_beagle',
  question: 'ヒナと 親鳥を 比べた。 何が 分かる?',
  options: [
    {
      label: 'ひなの くちばし も 親と 似て いる — 形が 受け継がれる',
      isCorrect: true,
      response: [
        { speaker: 'hinata',         text: '太い くちばしの 親 から 生まれた ひなも、 太い くちばし!' },
        { speaker: 'rio',            text: 'えっ、ひなって 親に 似るの!?' },
        { speaker: 'haru',           text: '形が 親から 子に 受け継がれる … これは 「遺伝」 だ。' },
        { speaker: 'darwin_voyager', text: 'その 通り。 形質は 遺伝 する。 これが 進化の 鍵 なんだよ。' },
      ],
    },
    {
      label: 'ひなは 親と 全く 違う',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: 'よく 観察 すると、 ひなも 親と 似た くちばしを して います。' },
      ],
    },
  ],
},
```

#### Step 6 — 결론 + ダーリン教授 자백

```javascript
{
  id: 'step6',
  title: '🧩 STEP 6: 推理を 組み立てる',
  bg: 'bg_ch04_beagle',
  question: '全ての 手がかりが 揃った。 教授に どう 伝える?',
  options: [
    {
      label: '「同じ 祖先から、 環境に 合う 個体が 生き残り、 5種に 分かれた」',
      isCorrect: true,
      response: [
        { speaker: 'darwin_voyager', text: 'まさに!君たちは 答えに たどり着いた!' },
        { speaker: 'darwin_voyager', text: '昔、 1種の フィンチが 5つの 島に 渡った。 それぞれ 違う 食べ物の 環境で…' },
        { speaker: 'darwin_voyager', text: '偶然 食べ物に 合う くちばしを 持つ 個体が 生き残り、 次の 世代に 受け継ぐ。' },
        { speaker: 'darwin_voyager', text: '世代を 重ねる うちに、 だんだん 環境に 合う 形に 変わって いく。 これが 「自然選択」 だ。' },
        { speaker: 'hinata',         text: '生き残るのは 「強い」 個体 では なく 「環境に 合う」 個体 ですね。' },
        { speaker: 'haru',           text: '長い 時間の 中で、 種は ゆっくり 変化 する … それが 「進化」。' },
        { speaker: 'rio',            text: '私たち 人間も そう なの?' },
        { speaker: 'darwin_voyager', text: 'そう、すべての 生き物が 進化の 物語の 中に いる。 君たちも、 私も、 ね。' },
      ],
    },
    {
      label: '「5種類は 神様が 別々に 作った」',
      isCorrect: false,
      response: [
        { speaker: 'darwin_voyager', text: '化石は 1種から 始まった 事を 示しているよ。 観察に 基づいて 考えよう。' },
      ],
    },
    {
      label: '「環境に 関係なく 変わった」',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '食べ物と くちばしが ピッタリ 合って いる。 偶然 じゃ ないよ。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch04_beagle',
  lines: [
    { speaker: 'darwin_voyager', text: '皆の おかげで、 私の 観察が 説明 できた。 ありがとう。' },
    { speaker: 'darwin_voyager', text: '進化は 過去の 物語 では ない。 今も、 これからも 続く、 命の 物語 なんだ。' },
    { speaker: 'rio',            text: '生き物って すごい!' },
    { speaker: 'haru',           text: '長い 時間が、 こんな 多様な 命を 作って きたんだね。' },
    { speaker: 'hinata',         text: '私たち 人間も、 進化の 一部 ですね。' },
    { speaker: 'darwin_voyager', text: 'その 通り。 さあ、 進化の 仕組みを もう 少し 学んで みよう。' },
    { speaker: 'penta',          text: 'ペンッ!進化の 勉強、 ペン!' },
  ],
  cta: '📚 学習資料を 開く',
},
```

---

## 5. 학습 자료 6섹션

### 5-1. concept

```javascript
concept: {
  title: '進化論と 自然選択',
  paragraphs: [
    '事件 4 の 5種の フィンチ — 全部 同じ 祖先 から 分かれた 兄弟 たちです。 環境に 合った 個体が 生き残り、 子孫に その 形質を 残す ことで、 長い 時間を かけて 少しずつ 形が 変わって いきます。 これを 「進化 (しんか)」 と 言います。',
    '進化を 起こす 仕組みの 一つが 「自然選択 (しぜんせんたく)」 です。 ダーウィン が 1859年 に 発表した 『種の 起源』 で 詳しく 説明しました。',
    '生物は 親から 子へ、 形質を 「遺伝 (いでん)」 します。 たまに 少しだけ 違う 子 (変異, へんい) が 生まれます。 環境に 合う 変異を 持った 個体が より 多く 子孫を 残し、 世代を 重ねる うちに 集団 全体の 形が 変わって いきます。',
    'これは 「弱肉強食」 ではなく 「環境への 適応」 です。 大きい·速い·強い 個体だけが 生き残るのでは なく、 その 環境で 暮らす のに ぴったり な 個体が 生き残ります。 すべての 生物 (細菌から 人間まで) が、 この 進化の 物語の 一部です。',
  ],
  highlight: '進化 = 環境に 合う 個体が 生き残り、 形質が 子孫に 受け継がれる。 長い 時間が 多様な 生命を 作る。',
},
```

### 5-2. diagrams (SVG 4개)

사건 1·2·3의 SVG 패턴 (viewBox + 색상 + 캡션) 그대로 따름.

#### 도해 1: 5종 핀치새 부리 비교 (500×280)
- 5개 부리 가로 배열: A(큰·두꺼운, 큰씨앗) B(가늘고짧은, 작은씨앗) C(뾰족, 곤충) D(길고가는, 꽃꿀) E(중간, 과일)
- 각 부리 옆 작은 새 실루엣 + 먹이 라벨
- 캡션: 「環境に 合った くちばしの 形」
- 색상: 부리 brown(#8a5a2a), 강조 red(#e74c3c)

#### 도해 2: 자연선택 메커니즘 (500×300)
- 3단계 가로 흐름: 1.変異(다양한 개체) → 2.選択(환경이 큰부리만 생존) → 3.遺伝(자손에 전달)
- 단계 사이 화살표
- 캡션: 「変異 → 選択 → 遺伝 = 自然選択의 3단계」

#### 도해 3: 비글호 항해 경로 (500×280)
- 세계 지도 간략화, 영국→남미→갈라파고스(강조)→호주→영국 점선 경로
- 캡션: 「5년의 航海 (1831-1836) — 自然選択 発見의 旅」
- 색상: 바다 light blue, 경로 red dashed, 육지 sage

#### 도해 4: 종의 분화 트리/계통수 (450×350)
- 하단 공통조상 1종 → 위로 분기 → 5종
- 각 분기점 라벨 (섬 이동·환경 적응)
- 캡션: 「同じ祖先 → 環境 適応 → 多様な 種으로 分化」

### 5-3. formulas + unitsTable

**진화론은 수식 없음** — 개념 정리:

```javascript
formulas: [
  {
    name: '自然選択의 3원칙',
    formula: '変異 + 環境圧力 + 遺伝 = 進化',
    formulaSimple: '変異 + 選択 + 遺伝',
    explanation: '1) 個体ごとに 少し 違う 変異が ある, 2) 環境に 合う 個体が より 多く 生き残る, 3) 形質이 子に 受け継がれる. 이 3가지가 모두 갖춰지면 진화 발생.',
    note: '式이 아닌 「条件」. 모든 생물에 적용되는 보편 원리.',
  },
  {
    name: '適応의 결과',
    formula: '「環境에 ぴったり 合う 形質」が 集団의 多数가 됨',
    formulaSimple: '適應 = 環境 ↔ 形質 일치',
    explanation: '「強い」보다 「合う」가 중요. 환경이 변하면 어제 유리했던 형질이 오늘은 불리해질 수도 있음.',
    note: '진화에 「目的」은 없음. 단지 「結果」.',
  },
],
unitsTable: {
  title: '進化 키워드 정리',
  rows: [
    ['용어', '의미', '예시'],
    ['進化 (しんか)',       '世代를 거치며 種이 変化하는 과정',           '5종 핀치새의 분화'],
    ['自然選択',           '환경에 合う 個体가 살아남고 子孫을 남기는 것', '큰 부리 핀치 → 큰 씨앗 섬에서 우세'],
    ['変異 (へんい)',       '같은 種에서도 個体마다 미세하게 다른 형질',  '같은 핀치인데 부리 크기 차이'],
    ['遺伝 (いでん)',       '형질이 親에서 子로 受け継がれること',         '큰 부리 親 → 큰 부리 子'],
    ['適應 (てきおう)',     '환경에 맞게 形質이 변화하는 것',              '섬마다 다른 먹이에 맞는 부리'],
    ['共通祖先',           '여러 種이 공유하는 옛 조상',                 '5종 핀치 = 1종 핀치의 자손'],
  ],
},
```

### 5-4. flashcards (10장)

```javascript
flashcards: [
  { front: '進化 (しんか)',         back: '世代를 거쳐 生物의 형질이 변화하는 과정. 다윈이 1859년 『種의 起源』에서 체계화.' },
  { front: '自然選択 (しぜんせんたく)', back: '환경에 合う 個体가 더 많이 살아남고 자손을 남기는 메커니즘. 진화의 주요 원동력.' },
  { front: '変異 (へんい)',         back: '같은 種이라도 個体마다 형질이 조금씩 다른 것. 진화의 出発点.' },
  { front: '遺伝 (いでん)',         back: '親의 형질이 子에게 전달되는 것. 進化가 일어나기 위한 必須 조건.' },
  { front: '適應 (てきおう)',       back: '生物가 환경에 合う 형질을 갖게 되는 것. 자연선택의 결과.' },
  { front: '共通祖先 (きょうつうそせん)', back: '여러 種이 공유하는 옛 조상. 5종 핀치 = 1종 조상에서 분화.' },
  { front: 'フィンチ (Finch)',     back: '갈라파고스의 작은 새. 다윈 진화론의 핵심 증거. 13~14종 존재.' },
  { front: 'ガラパゴス 諸島',       back: '에콰도르 서쪽 태평양의 화산섬군. 다윈이 5주간 머물며 핀치새 관찰.' },
  { front: 'ビーグル号',            back: '다윈이 5년간(1831-1836) 세계일주한 영국 海軍 측량선.' },
  { front: 'チャールズ·ダーウィン',   back: '영국 자연주의자(1809-1882). 비글호 항해 후 自然選択說 발표. 『種의 起源』(1859) 저자.' },
],
```

### 5-5. exercises (10문제)

```javascript
exercises: [
  {
    q: '事件 4 の 5種의 フィンチ가 부리 모양이 다른 이유는?',
    options: ['神様가 다르게 만들었다', '각 섬의 먹이에 맞춰 自然選択으로 분화했다', '우연히 다른 종이 모였다', '人間이 인공적으로 바꿨다'],
    correct: 1,
    explanation: '事件 4 の 핵심. 1종에서 시작 → 각 섬의 먹이에 적응 → 5종으로 분화.',
  },
  {
    q: '自然選択의 3가지 조건이 아닌 것은?',
    options: ['変異', '環境圧力 (선택)', '遺伝', '目的'],
    correct: 3,
    explanation: '진화에는 「目的」이 없음. 단지 결과로 환경에 合う 形質이 살아남을 뿐.',
  },
  {
    q: '進化論을 체계화한 사람은?',
    options: ['ニュートン', 'アインシュタイン', 'ダーウィン', 'ガリレオ'],
    correct: 2,
    explanation: '찰스 다윈 (1809-1882). 비글호 5년 항해 후 1859년 『種의 起源』 발표.',
  },
  {
    q: '다윈이 핀치새를 관찰한 諸島의 이름은?',
    options: ['ハワイ', 'ガラパゴス', 'マダガスカル', 'カナリア'],
    correct: 1,
    explanation: 'ガラパゴス 諸島 (에콰도르 서쪽). 다윈이 1835년 약 5주간 체류.',
  },
  {
    q: '같은 種의 개체들이 조금씩 다른 形質을 보이는 것을 무엇이라 하는가?',
    options: ['遺伝', '変異', '進化', '適應'],
    correct: 1,
    explanation: '変異 (へんい). 진화의 출발점. 변이가 없으면 진화도 없음.',
  },
  {
    q: '큰 씨앗만 있는 섬에서 어떤 부리의 핀치가 가장 잘 살아남는가?',
    options: ['가는 부리', '큰 두꺼운 부리', '길고 가는 부리', '뾰족한 부리'],
    correct: 1,
    explanation: '큰 씨앗을 깨려면 강한 부리 필요. 자연선택의 직접 예시.',
  },
  {
    q: '다음 중 진화의 결과로 볼 수 없는 것은?',
    options: ['북극곰의 흰 털', '카멜레온의 색 변화 능력', '인공적으로 품종 개량한 강아지', '높이 자란 기린의 목'],
    correct: 2,
    explanation: '인공 품종 개량은 「人工選択」(品種 개량). 자연 진화와는 다른 메커니즘 (다만 원리는 유사).',
  },
  {
    q: '다윈이 비글호 항해를 한 기간은?',
    options: ['1년', '3년', '5년', '10년'],
    correct: 2,
    explanation: '1831-1836년, 약 5년간 세계일주. 갈라파고스는 그중 한 정거장.',
  },
  {
    q: '「自然選択」을 정확히 설명한 것은?',
    options: ['강한 個体만 살아남는다', '환경에 合う 個体가 더 많이 자손을 남긴다', '神様가 살아남을 個体를 정한다', '모든 個体가 평등하게 살아남는다'],
    correct: 1,
    explanation: '「適者生存」은 「強者生存」이 아님. 환경 적합도가 핵심.',
  },
  {
    q: '5종 핀치새가 모두 1종의 共通祖先에서 분화했다는 증거가 아닌 것은?',
    options: ['古い 化石이 1종만 보여줌', 'DNA 분석 결과 매우 유사', '5종 모두 같은 색의 깃털', '5종 모두 비슷한 노래 (鳴き声)'],
    correct: 2,
    explanation: '깃털 색은 環境 적응 결과이지 共通祖先의 증거가 아님. 다른 3개는 모두 유효 증거.',
  },
],
```

### 5-6. tips (8포인트)

```javascript
tips: [
  { title: '①  進化 = 「強者」 보다 「適者」',     body: '진화는 「強い 個体」가 아닌 「環境에 合う 個体」가 살아남는 과정. 「適者生存」.' },
  { title: '②  自然選択 = 変異 + 選択 + 遺伝',   body: '이 3가지가 모두 갖춰지면 진화 발생. 어느 하나라도 빠지면 안 됨.' },
  { title: '③  進化에 「目的」 없음',             body: '미래를 위해 진화하는 게 아니라, 환경 적합 個体가 살아남은 「結果」.' },
  { title: '④  時間이 핵심 — 何万年, 何百万年',   body: '단기간엔 진화 거의 관찰 불가. 化石 기록·DNA 분석으로 추적.' },
  { title: '⑤  共通祖先 — 모든 생물은 친척',     body: '人間·고릴라·물고기·식물 모두 거슬러 올라가면 共通祖先. 「生命의 木」.' },
  { title: '⑥  ガラパゴス 핀치 = 진화론의 상징', body: '5종 부리 차이 = 자연선택의 직접 증거. 다윈이 「種의 起源」 핵심 사례로 사용.' },
  { title: '⑦  人工選択도 진화의 일종',         body: '강아지 품종 개량·소맥 농작물 등. 人間이 환경 역할을 함. 원리는 자연선택과 동일.' },
  { title: '⑧  進化는 지금도 진행 중',           body: '항생제 내성균·도시 환경 적응 생물 등. 우리 눈앞에서도 진화 관찰 가능.' },
],
```

---

## 6. caseQuiz (5문제)

```javascript
caseQuiz: [
  {
    q: '事件 4 で 5種의 フィンチ의 부리가 다른 이유는?',
    options: ['우연', '각 섬의 먹이에 自然選択으로 적응', '人間이 만들었다', '신비한 힘'],
    correct: 1,
  },
  {
    q: '自然選択 발견자는?',
    options: ['ニュートン', 'ダーウィン', 'アインシュタイン', 'パスカル'],
    correct: 1,
  },
  {
    q: '진화의 3 조건이 아닌 것은?',
    options: ['変異', '遺伝', '環境圧力', '目的'],
    correct: 3,
  },
  {
    q: '다윈이 핀치새를 관찰한 諸島는?',
    options: ['ハワイ', 'ガラパゴス', 'カナリア', 'マダガスカル'],
    correct: 1,
  },
  {
    q: '進化論의 핵심 메시지는?',
    options: ['강자만 살아남는다', '환경에 合う 個体가 살아남고 자손을 남긴다', '진화에는 목적이 있다', '生物는 변하지 않는다'],
    correct: 1,
  },
],
```

---

## 7. 데이터·엔진 파일 갱신

### 7-1. data/series4-scientists.js

SCIENTISTS_STORY 배열의 id=4 entry (인덱스 [3])만 placeholder → 풀콘텐츠. 다른 entry는 절대 건드리지 말 것.

```javascript
{
  id: 4, icon: '🐦',
  title: '島々の鳥たち',
  subtitle: '似ているけれど 違う鳥たちの 謎',   // 기존 subtitle 교체
  theme: '進化論·自然選択·適應·変異·遺伝',       // 기존 theme 교체
  bgm: 'mystery',
  illustration: SCIENTISTS_CASE_IMAGES[4],
  charKey: 'darwin_voyager',
  sceneKey: 'bg_ch04_beagle',
  comingSoon: false,                            // true → false
  learnRef: 'scientists_case04',                // 신규 추가
  intro: { /* §4-1 */ },
  steps: [ /* §4-2 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6 */ ],
  note: {
    title: '第4事件 島々の 鳥たち',
    desc: 'ガラ諸島 5종의 핀치새 — 같은 조상에서 환경에 合う 부리로 진화. 다윈의 自然選択說 — 「強い 個体」가 아닌 「適応した 個体」가 살아남는 자연의 法則 — 을 배운 第四歩.'
  },
},
```

### 7-2. data/series4-scientists-learn.js

SCIENTISTS_LEARN에 scientists_case04 키 **추가** (case01~03 보존). 기존 `// 사건 4~10 은 향후...` 주석 자리에 삽입:

```javascript
const SCIENTISTS_LEARN = {
  scientists_case01: { /* 보존 */ },
  scientists_case02: { /* 보존 */ },
  scientists_case03: { /* 보존 */ },
  scientists_case04: {  // 신규
    title: '進化論と 自然選択',
    subtitle: '事件 4 で 学んだ こと',
    examScope: '중학 生物 + 比喩 중심',
    concept: { /* §5-1 */ },
    diagrams: [ /* §5-2 SVG 4개 */ ],
    formulas: [ /* §5-3 */ ],
    unitsTable: { /* §5-3 */ },
    flashcards: [ /* §5-4 */ ],
    exercises: [ /* §5-5 */ ],
    tips: [ /* §5-6 */ ],
  },
  // 사건 5~10 은 향후 별도 명세서에서 추가 (scientists_case05 ...).
};
```

### 7-3. ⭐ engine/detectives-B.js — SCIENTISTS_SPEAKER_MAP 등록 (필수)

**이 단계가 사건 4 작업의 가장 중요한 부분.** 사건 2·3에서 NPC가 「ナレーター」로 fallback된 버그의 근본 원인이 이 등록 누락이었음.

조사 결과 SCIENTISTS_SPEAKER_MAP은 engine/detectives-B.js:~2835 근처에 위치. 사건 1·2·3 NPC가 이미 등록되어 있고, 그 뒤에 darwin_voyager 추가:

```javascript
const SCIENTISTS_SPEAKER_MAP = {
  // 기존 (보존):
  ringo_hakase: { name: '林檎博士', ... },
  shiraga_ein:  { name: 'アイン教授', ... },
  hikari_curie: { name: 'キューリィ夫人', ... },
  // 신규 추가:
  darwin_voyager: { name: 'ダーリン教授', ... 기존 형식 그대로 },
};
```

**중요**: 기존 3개 NPC의 등록 형식(필드 이름·구조)을 그대로 따라서 darwin_voyager를 추가할 것. 형식이 다르면 또 fallback 발생.

등록 후 콘솔 검증:
```javascript
SCIENTISTS_SPEAKER_MAP.darwin_voyager           // 객체
SCIENTISTS_SPEAKER_MAP.darwin_voyager.name      // 'ダーリン教授'
```

### 7-4. 그 외 엔진 코드 — 변경 없음

✅ engine/scientists-learn.js — 사건 1에서 정착, 그대로
✅ index.html — 변경 없음

---

## 8. 검증 체크리스트

### 8-1. 콘솔 검증

```javascript
// 사건 4 스토리
SCIENTISTS_STORY[3].id                                    // 4
SCIENTISTS_STORY[3].title                                 // "島々の鳥たち"
SCIENTISTS_STORY[3].comingSoon                            // false
SCIENTISTS_STORY[3].learnRef                              // "scientists_case04"
SCIENTISTS_STORY[3].charKey                               // "darwin_voyager"
SCIENTISTS_STORY[3].intro.lines.length                    // 17
SCIENTISTS_STORY[3].steps.length                          // 6
SCIENTISTS_STORY[3].steps[0].options.length               // 3
SCIENTISTS_STORY[3].steps[5].options[0].response.length   // 8
SCIENTISTS_STORY[3].ending.lines.length                   // 7
SCIENTISTS_STORY[3].caseQuiz.length                       // 5

// 학습 자료
SCIENTISTS_LEARN.scientists_case04                        // 객체 (신규)
SCIENTISTS_LEARN.scientists_case04.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case04.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case04.diagrams.length        // 4

// ⭐ SPEAKER_MAP 등록 (가장 중요)
SCIENTISTS_SPEAKER_MAP.darwin_voyager                     // 객체 (null/undefined 아님!)
SCIENTISTS_SPEAKER_MAP.darwin_voyager.name                // 'ダーリン教授'

// 회귀 확인
SCIENTISTS_STORY[0].comingSoon  // false (case 1)
SCIENTISTS_STORY[1].comingSoon  // false (case 2)
SCIENTISTS_STORY[2].comingSoon  // false (case 3)
SCIENTISTS_STORY[4].comingSoon  // true (case 5 placeholder)
SCIENTISTS_STORY[9].comingSoon  // true (보스)
SCIENTISTS_SPEAKER_MAP.shiraga_ein   // 보존 확인
SCIENTISTS_SPEAKER_MAP.hikari_curie  // 보존 확인
```

### 8-2. 시각 검증 (브라우저, GitHub Pages + Ctrl+Shift+R)

- [ ] 시리즈 4 사건 4 카드 클릭 가능 (잠금 풀림)
- [ ] intro 17줄 자연스러움
- [ ] **ダーリン教授 등장 시 「ダーリン教授」 이름 + darwin_voyager.png 초상화 표시** (「ナレーター」 fallback 아님 ⭐)
- [ ] STEP 1~6 정상 진행
- [ ] ending 후 학습 모달 자동 호출
- [ ] 학습 6탭 + SVG 4개 (5종 부리·자연선택·비글호·계통수)
- [ ] caseQuiz 5문제 + 별점
- [ ] 사건 4 클리어 마크 (scientistsCleared[3] = true)
- [ ] darwin_voyager 캐릭터 외곽 깔끔 (drop-shadow 약화 적용 상태이므로 박스 없음)

### 8-3. 회귀 테스트

- [ ] 시리즈 1~3, 5~12 정상
- [ ] 시리즈 4 사건 1·2·3 정상 (특히 사건 2·3 NPC 이름·초상화 — SPEAKER_MAP 보존 확인)
- [ ] 시리즈 4 사건 5~10 placeholder 그대로
- [ ] 영어학습·채팅 정상

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| SCIENTISTS_STORY[0]~[2] 수정 | 사건 1·2·3 완성·push |
| SCIENTISTS_STORY[4]~[9] 수정 | 사건 5~10 별도 명세서 |
| SCIENTISTS_LEARN.scientists_case01~03 수정 | 보존 |
| SCIENTISTS_SPEAKER_MAP의 기존 3개 NPC 수정 | 사건 1·2·3 동작 보존 |
| engine/scientists-learn.js 수정 | 정착됨 |
| data/series3-science.js 수정 | 시리즈 3 사용 중 |
| 신규 PNG 생성 | darwin_voyager.png 이미 존재 (RGBA) |
| 자산 PNG 재처리 | 이미 처리 완료 |
| 실명 「ダーウィン」을 ダーリン教授 대사로 사용 | 가상 캐릭터 정체성 |

---

## 10. 작업 순서

```
Step 1: 사건 3 데이터 구조 + SCIENTISTS_SPEAKER_MAP 정독 (참조)
  - SCIENTISTS_STORY[2] + scientists_case03
  - engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP 기존 3개 등록 형식 확인

Step 2: ⭐ engine/detectives-B.js에 darwin_voyager 등록 (먼저!)
  - 기존 3개 NPC와 동일 형식
  - 콘솔 검증: SCIENTISTS_SPEAKER_MAP.darwin_voyager

Step 3: data/series4-scientists.js의 SCIENTISTS_STORY[3] 교체
  - 콘솔 검증

Step 4: data/series4-scientists-learn.js에 scientists_case04 추가
  - case01~03 보존
  - 콘솔 검증

Step 5: 브라우저 시각 검증 (§8-2) — 특히 ダーリン教授 이름·초상화 표시 확인

Step 6: 회귀 테스트 (§8-3) — 사건 2·3 NPC 정상 확인

Step 7: git commit + push
  - commit msg: "feat(series04/case04): add Darwin/evolution content + register darwin_voyager in speaker map"

Step 8: 완료 보고
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE04_SPEC.md를 정독하고, 시리즈 4 사건 4 「島々の鳥たち」 
본격 콘텐츠를 작성해줘. 사건 3와 동일 패턴.

[⭐ 가장 중요 — 사건 2·3 버그 재발 방지]
engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 darwin_voyager 등록을 
가장 먼저 진행 (Step 2). 기존 3개 NPC(ringo_hakase, shiraga_ein, hikari_curie)와 
정확히 동일한 형식으로:
  darwin_voyager: { name: 'ダーリン教授', ... 기존 형식 그대로 }
이 등록이 빠지면 사건 4의 모든 ダーリン教授 대사가 「ナレーター」로 fallback됨.
등록 후 콘솔 검증: SCIENTISTS_SPEAKER_MAP.darwin_voyager 가 객체인지 확인.

[핵심 원칙]
- 사건 3 (SCIENTISTS_STORY[2], scientists_case03) 패턴 정확히 mirror.
- SCIENTISTS_STORY[3] entry만 placeholder에서 풀콘텐츠로 교체.
- SCIENTISTS_LEARN에 scientists_case04 키만 추가, case01~03 보존.
- darwin_voyager.png는 이미 존재 (RGBA) — 신규 PNG 생성 X.

[진화론 주제의 톤]
어린이가 「진화」를 「강자가 살아남는다」로 오해 안 하도록:
- 「強者」가 아닌 「適者」가 살아남음
- 진화에 「목적」 없음 — 「결과」
- 모든 생물 (인간 포함) 이 진화의 일부

[작업 순서]
§10의 8단계 그대로. SPEAKER_MAP 등록(Step 2)을 데이터 작성보다 먼저.
각 step 후 §8-1 콘솔 검증.

[금지 사항]
- 사건 1·2·3 (SCIENTISTS_STORY[0~2], scientists_case01~03) 수정 X
- SPEAKER_MAP 기존 3개 NPC 수정 X
- 사건 5~10 placeholder 그대로
- 시리즈 3 untouched
- engine/scientists-learn.js·자산 PNG 미수정

[회귀 테스트]
push 전 시리즈 1~3, 5~12 + 사건 1·2·3 (NPC 이름·초상화 정상) + 영어학습 + 채팅 확인.

commit msg: "feat(series04/case04): add Darwin/evolution content + register darwin_voyager in speaker map"
```

---

**END OF SPEC (개정본)**

이전 명세서 대비 핵심 변경: **§7-3 SCIENTISTS_SPEAKER_MAP 등록 단계를 명시적으로 추가**하고, 작업 순서에서 이를 데이터 작성보다 **먼저** 수행하도록 배치. 사건 2·3에서 겪은 「ナレーター fallback」 버그를 구조적으로 예방. NPC PNG는 이미 존재하므로 신규 생성 부담 없음.
