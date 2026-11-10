# SERIES 4 — CASE 5 CONTENT SPEC
## 「見えない敵の正体」 — パスト博士·細菌学

**작성일**: 2026-06-24
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 사건**: 사건 1·2·3·4 완성 (만유인력·상대성·방사능·진화론)

**핵심 (사건 4에서 확립된 패턴 그대로)**:
- ⭐ **§7-3 SCIENTISTS_SPEAKER_MAP 등록 단계** — 신규 NPC `pasteur_micro`를 반드시 등록. 사건 2·3 버그(「ナレーター」 fallback)의 근본 원인이었음. 데이터 작성보다 먼저 수행.
- ✅ NPC PNG는 이미 준비됨 (`pasteur_micro.png`, RGBA, alpha 처리 완료) — 신규 생성 불필요.

**범위**:
- ✅ 사건 5 본격 스토리 (intro + 6 steps + 결말)
- ✅ パスト博士 인격·말투 정립
- ✅ 학습 자료 6섹션 (세균·미생물·백신·멸균·위생)
- ✅ caseQuiz 5문제
- ✅ data/series4-scientists.js 사건 5 갱신
- ✅ data/series4-scientists-learn.js에 scientists_case05 키 추가
- ✅ engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 pasteur_micro 등록
- ❌ 사건 6~10 콘텐츠 (각각 별도 명세서)

---

## 0. PRE-FLIGHT CHECKLIST

- [ ] 사건 1·2·3·4 정상 동작
- [ ] SCIENTISTS_STORY[4] (id=5)가 placeholder (comingSoon: true) 상태
- [ ] SCIENTISTS_LEARN에 scientists_case01~04만 존재
- [ ] assets/characters/series04/pasteur_micro.png 존재 (RGBA) 확인
- [ ] git 상태 깨끗

---

## 1. 사건 5 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 5 |
| 사건 제목 | **見えない敵の正体 (みえない てきの しょうたい)** |
| 부제 | スープは なぜ 腐るのか? |
| 학습 테마 | 細菌·微生物 / 自然発生説の 否定 / ワクチン / 殺菌·消毒 / 衛生 |
| 학습 깊이 | 중학 生物 + 比喩 중심 (정성적 이해) |
| 등장 NPC | パスト博士 (pasteur_micro) |
| 동행자 | ハル + リオ + ヒナタ + ペンタ |
| 메인 배경 | bg_ch05_microbiology |
| 추리 트릭 | 「腐らないスープの謎」 — 백조목 플라스크 실험 (공기는 통하되 미생물 차단) |
| 예상 플레이타임 | 12~15분 |

---

## 2. パスト博士 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 단정한 콧수염 + 흰 실험복 + 플라스크 (자산 PNG pasteur_micro.png 그대로) |
| 나이 | 50대 |
| 직업 | 화학자·미생물학자 |
| 성격 | 꼼꼼하고 신중한 실험가, 「관찰과 실험으로 증명」을 신조로 함 |
| 1인칭 | 「私 (わたし)」 |
| 말투 | 「~です」「~なのです」「観察と 実験が すべてです」「証拠を 見ましょう」 |
| 좋아하는 것 | 현미경 관찰, 대조 실험, 깔끔한 실험 기록 |
| 모티프 | 루이 파스퇴르 (백조목 플라스크, 저온살균, 광견병·탄저병 백신) |
| 핵심 대사 (예) | 「目に 見えない から と いって、 存在しない わけでは ないのです」 |
| **표시명 (SPEAKER_MAP)** | **パスト博士** |

**중요**: 실명 「パスツール」은 사건 진행 중 미사용. 학습 자료에서 「ルイ·パスツール (1822-1895)」로 사실 정보 별도 제공.

---

## 3. 미스터리 트릭 「腐らないスープの謎」

### 3-1. 핵심 미스터리

パスト博士의 실험실. 똑같은 고기 스프가 든 플라스크 2개. **하나는 며칠 만에 썩어 탁해졌는데, 다른 하나는 몇 주가 지나도 맑고 깨끗함**. 두 스프 모두 같은 날 같은 냄비에서 끓였는데 왜 차이가 나는가?

「同じ スープ なのに、 なぜ 片方だけ 腐らないのか — それが 謎です」

### 3-2. 단서 시퀀스

| Step | 단서 | 발견자 | 의미 |
|---|---|---|---|
| 1 | 두 플라스크 스프 상태 비교 | リオ | A: 썩어 탁함 / B: 맑음. 내용물은 동일 |
| 2 | 플라스크 목 모양 차이 | ハル | A: 곧은 목 / B: S자로 굽은 목 (백조목) |
| 3 | 굽은 목에 물방울 고임 발견 | ヒナタ | 굽은 부분에 먼지·물방울이 갇혀 있음 |
| 4 | 博士 노트 「空気는 통하되…」 | ハル | 공기는 양쪽 다 통함 — 공기 자체는 원인 아님 |
| 5 | 현미경으로 썩은 스프 관찰 | ヒナタ | 썩은 스프에만 작은 생물(미생물) 가득 |
| 6 | 결론: 공기 속 미생물이 원인 | 3인 협력 | 굽은 목이 미생물을 가둬 B는 안 썩음 |

### 3-3. 진실 (パスト博士 자백)

「お見事です。 まさに 私の 実験の 結論です。」

- 옛날 사람들은 「썩음 = 스프에서 저절로 생명이 생긴다(自然発生説)」고 믿었음
- 실제로는 **공기 중에 떠다니는 눈에 보이지 않는 미생물(細菌)**이 스프에 들어가 번식한 것
- 백조목 플라스크는 **공기는 통과시키되, 미생물은 굽은 목에 갇혀** 스프까지 도달 못 함 → 안 썩음
- 「腐敗も 病気も、 目に 見えない 微生物が 原因なのです。 だから 清潔さ が 大切なのです」

### 3-4. 학습 포인트 연결

博士: 「微生物を 知れば、 病気を 防げます。 ワクチンも、 消毒も、 この 発見から 生まれたのです」

→ 학습 자료 모달로 유도 (백신·멸균·위생).

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: '見えない敵の正体',
  subtitle: 'スープは なぜ 腐るのか?',
  bg: 'bg_ch05_microbiology',
  lines: [
    { speaker: 'narrator',      text: 'ダーリン教授の 紹介で、 微生物を 研究する 化学者を 訪ねた。' },
    { speaker: 'hinata',        text: 'こちらが パスト博士の 実験室 です。 顕微鏡が たくさん…' },
    { speaker: 'rio',           text: 'うわぁ、 フラスコだらけ! 理科室 みたい!' },
    { speaker: 'haru',          text: '机の 上に、 同じ スープの フラスコが 二つ…?' },
    { speaker: 'pasteur_micro', text: 'ようこそ、 若き 探偵さん。 私が パスト です。 ちょうど 困った 事が あってね。' },
    { speaker: 'pasteur_micro', text: 'この 二つの フラスコを 見て ください。 中身は 同じ 肉の スープです。' },
    { speaker: 'narrator',      text: '一方は 濁って 腐り、 もう 一方は 透き通って 澄んで いた。' },
    { speaker: 'rio',           text: 'えっ、 片方だけ 腐ってる! こっちは ピカピカ!' },
    { speaker: 'haru',          text: '同じ 日に 同じ 鍋で 煮た のに… なぜ 違うんだろう。' },
    { speaker: 'pasteur_micro', text: 'そう、 それが 謎です。 何週間 経っても、 片方は 腐らないのです。' },
    { speaker: 'hinata',        text: '何か 違いが ある はず です…' },
    { speaker: 'pasteur_micro', text: '昔の 人は 「スープから 自然に 生命が 生まれて 腐る」 と 信じて いました。' },
    { speaker: 'pasteur_micro', text: 'でも 私は、 それは 違うと 思うのです。 観察と 実験が すべて です。' },
    { speaker: 'rio',           text: 'スープから 生命が…? 本当に?' },
    { speaker: 'pasteur_micro', text: '目に 見えない から と いって、 存在しない わけでは ないのです。' },
    { speaker: 'pasteur_micro', text: '皆さんの 力で、 この 謎を 解いて くれますか?' },
    { speaker: 'penta',         text: 'ペンッ! 見えない 敵、 探すペン!' },
  ],
  cta: '🔍 調査を 始める',
},
```

### 4-2. steps

#### Step 1 — 두 플라스크 비교

```javascript
{
  id: 'step1',
  title: '🧪 STEP 1: 二つの フラスコを 比べる',
  bg: 'bg_ch05_microbiology',
  question: 'まず、 二つの フラスコを よく 比べよう。 何を 確認する?',
  options: [
    {
      label: '中身·状態を 比べる — 同じ スープか、 どう 違うか',
      isCorrect: true,
      response: [
        { speaker: 'rio',           text: 'A は 濁って 茶色く なってる… うわ、 腐ってる!' },
        { speaker: 'haru',          text: 'B は 透明で 澄んでる。 でも 中身は 同じ 肉スープ。' },
        { speaker: 'hinata',        text: '同じ 中身 なのに、 片方だけ 腐った… 違いは どこに?' },
        { speaker: 'pasteur_micro', text: 'よく 観察 しました。 では、 次は どこを 見ますか?' },
      ],
    },
    {
      label: 'フラスコの 色を 比べる',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'ガラスの 色は 同じ だよ。 中身と 形を 見よう。' },
      ],
    },
    {
      label: 'すぐに 飲んで みる',
      isCorrect: false,
      response: [
        { speaker: 'pasteur_micro', text: '腐った ものを 飲んでは いけません! まずは 観察 です。' },
      ],
    },
  ],
},
```

#### Step 2 — 플라스크 목 모양 차이

```javascript
{
  id: 'step2',
  title: '🔍 STEP 2: フラスコの 首を 観察',
  bg: 'bg_ch05_microbiology',
  question: 'ハルが フラスコの 形に 注目した。 何が 違う?',
  options: [
    {
      label: 'A は 真っ直ぐな 首、 B は S字に 曲がった 首',
      isCorrect: true,
      response: [
        { speaker: 'haru',          text: 'A の 首は 真っ直ぐ。 でも B の 首は… S字に グニャッと 曲がってる!' },
        { speaker: 'rio',           text: '白鳥の 首 みたい! なんで こんな 形?' },
        { speaker: 'hinata',        text: '腐らない 方 だけ 首が 曲がってる… これが ヒント かも。' },
        { speaker: 'pasteur_micro', text: 'ふふ、 良い ところに 気づきました。' },
      ],
    },
    {
      label: 'フラスコの 大きさを 測る',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '大きさは 同じ。 首の 形の 違いが 大事そう。' },
      ],
    },
  ],
},
```

#### Step 3 — 굽은 목에 갇힌 먼지·물방울

```javascript
{
  id: 'step3',
  title: '💧 STEP 3: 曲がった 首を よく 見る',
  bg: 'bg_ch05_microbiology',
  question: 'ヒナタが S字の 首を じっくり 観察した。 何に 気づく?',
  options: [
    {
      label: '曲がった 部分に 水滴と 埃が たまっている',
      isCorrect: true,
      response: [
        { speaker: 'hinata',        text: '曲がった 谷の 部分に、 水滴と 埃が たまって います。' },
        { speaker: 'rio',           text: 'ホコリが 引っかかってる! 通れない んだ!' },
        { speaker: 'haru',          text: '空気は 通っても、 何か が この 谷で 止められてる…?' },
        { speaker: 'pasteur_micro', text: 'その 通り。 空気は 通り抜けます。 でも、 何か が 止まるのです。' },
      ],
    },
    {
      label: '首の 長さを 測る',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '長さ より、 谷に 何が 溜まって いるか が 大事です。' },
      ],
    },
  ],
},
```

#### Step 4 — 박사의 노트 (공기는 양쪽 다 통함)

```javascript
{
  id: 'step4',
  title: '📓 STEP 4: 博士の 実験ノート',
  bg: 'bg_ch05_microbiology',
  question: '博士の ノートを 開いた。 何が 書いてある?',
  options: [
    {
      label: '「空気は 両方 通る — 空気 自体は 原因では ない」',
      isCorrect: true,
      response: [
        { speaker: 'haru',          text: '「空気は 両方の フラスコに 通る」… 空気 自体は 犯人 じゃ ない?' },
        { speaker: 'hinata',        text: 'でも A は 腐って B は 腐らない。 空気 以外の 何か が 違う…' },
        { speaker: 'pasteur_micro', text: 'そうです。 空気は どちらにも 入ります。 では、 何が 違うのか。' },
        { speaker: 'rio',           text: '空気じゃ ない なら… 空気に 混じってる 何か?' },
      ],
    },
    {
      label: 'ノートを 閉じる',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '博士の 記録に ヒントが あります。 読みましょう。' },
      ],
    },
  ],
},
```

#### Step 5 — 현미경 관찰

```javascript
{
  id: 'step5',
  title: '🔬 STEP 5: 顕微鏡で 観察',
  bg: 'bg_ch05_microbiology',
  question: '腐った スープA を 顕微鏡で 見た。 何が 見える?',
  options: [
    {
      label: '小さな 生き物 (微生物) が たくさん 動いている',
      isCorrect: true,
      response: [
        { speaker: 'hinata',        text: 'うわっ… 小さな 生き物が、 たくさん 動いて います!' },
        { speaker: 'rio',           text: 'ちっちゃい のが ウヨウヨ してる! これ なに!?' },
        { speaker: 'haru',          text: '澄んだ スープB には いない… 腐った A だけに いる。' },
        { speaker: 'pasteur_micro', text: 'それが 微生物 — 細菌 です。 目には 見えない、 小さな 生き物 です。' },
      ],
    },
    {
      label: '澄んだ スープB だけ 見る',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '腐った 方と 比べないと 違いが わからないよ。 両方 見よう。' },
      ],
    },
  ],
},
```

#### Step 6 — 결론 + パスト博士 자백

```javascript
{
  id: 'step6',
  title: '🧩 STEP 6: 推理を 組み立てる',
  bg: 'bg_ch05_microbiology',
  question: '全ての 手がかりが 揃った。 博士に どう 伝える?',
  options: [
    {
      label: '「空気中の 微生物が スープに 入って 腐らせる。 曲がった 首が それを 防いだ」',
      isCorrect: true,
      response: [
        { speaker: 'pasteur_micro', text: 'お見事です! まさに 私の 実験の 結論 です。' },
        { speaker: 'pasteur_micro', text: '腐敗は スープから 自然に 生まれるのでは ありません。 空気中の 微生物が 入る から なのです。' },
        { speaker: 'pasteur_micro', text: 'S字の 首は、 空気は 通しても 微生物を 谷に 閉じ込めます。 だから B は 腐らなかった。' },
        { speaker: 'hinata',        text: '「自然に 生命が 生まれる」 のでは なく、 外から 入る んですね!' },
        { speaker: 'haru',          text: '目に 見えない 微生物が、 腐敗の 正体 だった…' },
        { speaker: 'rio',           text: 'じゃあ 病気も、 この 微生物の せい?' },
        { speaker: 'pasteur_micro', text: '鋭い 質問 です。 そう、 多くの 病気も 微生物が 原因。 だから 清潔さ が 命を 守るのです。' },
        { speaker: 'pasteur_micro', text: 'この 発見から、 ワクチンや 消毒が 生まれました。 さあ、 一緒に 学びましょう。' },
      ],
    },
    {
      label: '「スープが 古いから 腐った」',
      isCorrect: false,
      response: [
        { speaker: 'pasteur_micro', text: '同じ 日に 作りました。 古さ では 説明 できません。' },
      ],
    },
    {
      label: '「曲がった 首の ガラスが 特別な 物質を 出す」',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'ガラスは 同じ 材質 だよ。 谷に 溜まった ものが ヒント。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch05_microbiology',
  lines: [
    { speaker: 'pasteur_micro', text: '皆の おかげで、 私の 実験が 証明 できました。 ありがとう。' },
    { speaker: 'pasteur_micro', text: '見えない から と いって、 無い わけでは ない。 観察と 実験が、 真実を 教えて くれます。' },
    { speaker: 'rio',           text: '小さな 生き物が、 こんなに 大きな 謎の 答え だったなんて!' },
    { speaker: 'haru',          text: '清潔に する ことが、 病気を 防ぐ 第一歩 なんだね。' },
    { speaker: 'hinata',        text: 'ワクチンも、 この 発見から 生まれたんですね。' },
    { speaker: 'pasteur_micro', text: 'その 通り。 微生物の 世界を、 もう 少し 学んで みましょう。' },
    { speaker: 'penta',         text: 'ペンッ! 微生物の 勉強、 ペン!' },
  ],
  cta: '📚 学習資料を 開く',
},
```

---

## 5. 학습 자료 6섹션

### 5-1. concept

```javascript
concept: {
  title: '微生物と 細菌の 世界',
  paragraphs: [
    '事件 5 の 腐った スープ — その 原因は、 空気中に 漂う 目に 見えない 小さな 生き物 「微生物 (びせいぶつ)」 でした。 パスツール は 1861年 ごろ、 有名な 「白鳥の 首 フラスコ」 実験で これを 証明 しました。',
    'それまで 人々は 「腐敗や 生命は 物質から 自然に 生まれる (自然発生説)」 と 信じて いました。 パスツール は、 空気は 通すが 微生物は 通さない 曲がった 首の フラスコ を 使い、 微生物が 入らなければ スープは 腐らない ことを 示したのです。',
    '微生物には 細菌 (バクテリア)・ウイルス・カビ など が あります。 多くは 無害 または 有益 (発酵·分解) ですが、 一部は 病気を 引き起こします。 これを 「病原菌」 と 言います。',
    'パスツール の 発見は 医学を 大きく 変えました。 殺菌·消毒で 病気を 防ぎ、 弱めた 病原菌で 作る 「ワクチン」 で 免疫を つける — 今 私たちが 健康に 暮らせる のは、 この 「見えない 世界」 の 発見の おかげ なのです。',
  ],
  highlight: '腐敗も 病気も、 目に 見えない 微生物が 原因。 清潔·殺菌·ワクチン で 防げる。',
},
```

### 5-2. diagrams (SVG 4개)

사건 1~4 SVG 패턴 (viewBox + 색상 + 캡션) 그대로.

#### 도해 1: 백조목 플라스크 대조 실험 (500×300)
- 좌: 곧은 목 플라스크 → 미생물이 직행 → 스프 탁함(썩음)
- 우: S자 목 플라스크 → 미생물이 굽은 곳에 갇힘 → 스프 맑음
- 공기 흐름 화살표(양쪽 다 통과) + 미생물 점(좌만 스프 도달)
- 캡션: 「空気は 通る、 微生物は 曲がった 首で 止まる」

#### 도해 2: 미생물 3종류 (500×280)
- 細菌(バクテリア): 막대·구형 / ウイルス: 더 작은 입자 / カビ: 실 모양 + 포자
- 각 크기 비교 (세균 < 곰팡이, 바이러스 < 세균)
- 캡션: 「目に 見えない 小さな 生き物たち」

#### 도해 3: 백신의 원리 (500×300)
- 1.약하게 만든 병원균 주입 → 2.몸이 항체(면역) 만듦 → 3.진짜 병원균 와도 격퇴
- 화살표 3단계 흐름
- 캡션: 「弱めた 敵で 練習 → 本物が 来ても 勝てる」

#### 도해 4: 위생 3원칙 (450×280)
- 手洗い(손씻기) / 加熱·殺菌(가열·살균) / 消毒(소독)
- 각 아이콘 + 미생물 X 표시
- 캡션: 「清潔が 命を 守る — パスツールの 教え」

### 5-3. formulas + unitsTable

**미생물학은 수식 없음** — 개념 정리:

```javascript
formulas: [
  {
    name: '自然発生説의 否定',
    formula: '腐敗 = 外から 入った 微生物 (≠ 自然に 発生)',
    formulaSimple: '腐敗 = 外来 微生物',
    explanation: '생명·부패는 물질에서 저절로 생기지 않음. 반드시 기존 생명(미생물)에서 비롯됨. 백조목 플라스크가 이를 증명.',
    note: '「生命は 生命から (生物発生説)」 — 파스퇴르가 自然発生説을 뒤집음.',
  },
  {
    name: 'ワクチン의 원리',
    formula: '弱い 病原菌 → 免疫 獲得 → 本物 撃退',
    formulaSimple: '弱毒 → 免疫 → 防御',
    explanation: '약하게 만든 병원균을 미리 넣어 몸이 항체를 만들게 함. 진짜 병원균이 와도 면역이 막아냄.',
    note: '제너의 천연두 종두법을 파스퇴르가 광견병·탄저병으로 확장·이론화.',
  },
],
unitsTable: {
  title: '微生物 키워드 정리',
  rows: [
    ['용어', '의미', '예시·비고'],
    ['微生物 (びせいぶつ)', '눈에 보이지 않는 작은 생물',        '세균·바이러스·곰팡이'],
    ['細菌 (さいきん)',     '단세포 미생물 (バクテリア)',         '유산균·대장균·결핵균'],
    ['病原菌 (びょうげんきん)', '병을 일으키는 미생물',           '결핵균·콜레라균'],
    ['自然発生説',         '생명이 물질에서 저절로 생긴다는 옛 설', '파스퇴르가 부정'],
    ['殺菌·消毒',          '미생물을 죽이거나 줄이는 것',         '加熱·アルコール·煮沸'],
    ['ワクチン',           '약한 병원균으로 면역을 만드는 약',     '광견병·천연두 백신'],
  ],
},
```

### 5-4. flashcards (10장)

```javascript
flashcards: [
  { front: '微生物 (びせいぶつ)',   back: '눈에 보이지 않는 작은 생물. 細菌·ウイルス·カビ 등. 腐敗·発酵·病気의 원인.' },
  { front: '細菌 (さいきん)',       back: '단세포 미생물(バクテリア). 막대형·구형 등. 유익한 것(유산균)도 많음.' },
  { front: '自然発生説',           back: '생명·부패가 물질에서 저절로 생긴다는 옛 믿음. 파스퇴르가 백조목 플라스크로 부정.' },
  { front: '白鳥の 首 フラスコ',    back: '파스퇴르의 실험 장치. 공기는 통하되 미생물은 굽은 목에 갇혀 스프가 안 썩음.' },
  { front: 'ワクチン',             back: '약하게 만든 병원균으로 면역을 만드는 약. 파스퇴르가 광견병·탄저병 백신 개발.' },
  { front: '低温殺菌 (てい おん さっきん)', back: '파스퇴르가 개발. 우유 등을 적당한 온도로 데워 유해균만 죽임. 「パスチャライゼーション」.' },
  { front: '病原菌 (びょうげんきん)', back: '병을 일으키는 미생물. 결핵균·콜레라균 등. 위생·소독으로 차단.' },
  { front: '殺菌·消毒',            back: '미생물을 죽이거나 줄이는 것. 가열·끓임·알코올 등.' },
  { front: '免疫 (めんえき)',       back: '몸이 병원균과 싸우는 방어 시스템. 백신으로 미리 훈련시킬 수 있음.' },
  { front: 'ルイ·パスツール',       back: '프랑스 화학자·미생물학자(1822-1895). 자연발생설 부정, 저온살균, 백신 개발.' },
],
```

### 5-5. exercises (10문제)

```javascript
exercises: [
  {
    q: '事件 5 で スープA 만 썩은 이유는?',
    options: ['스프가 오래되어서', '공기 중 微生物이 들어가 번식해서', '플라스크 유리가 달라서', '온도가 높아서'],
    correct: 1,
    explanation: '事件 5 핵심. 공기 중 미생물이 스프에 들어가 번식 → 부패. 굽은 목 플라스크는 미생물 차단.',
  },
  {
    q: '백조목 플라스크 실험이 부정한 옛 학설은?',
    options: ['進化論', '自然発生説', '相対性理論', '万有引力'],
    correct: 1,
    explanation: '自然発生説(생명이 물질에서 저절로 생긴다는 설)을 파스퇴르가 부정.',
  },
  {
    q: '微生物에 해당하지 않는 것은?',
    options: ['細菌', 'ウイルス', 'カビ', '岩石'],
    correct: 3,
    explanation: '암석은 생물이 아님. 세균·바이러스·곰팡이는 모두 미생물.',
  },
  {
    q: 'ワクチン의 원리는?',
    options: ['강한 병원균을 주입', '약하게 만든 병원균으로 免疫을 만듦', '항생제를 미리 먹음', '미생물을 모두 죽임'],
    correct: 1,
    explanation: '약독화한 병원균으로 몸이 항체(면역)를 만들게 함. 진짜 병원균이 와도 격퇴.',
  },
  {
    q: '백조목 플라스크에서 공기는?',
    options: ['양쪽 다 통과한다', '굽은 쪽만 막힌다', '곧은 쪽만 막힌다', '양쪽 다 막힌다'],
    correct: 0,
    explanation: '공기는 양쪽 다 통과. 차이는 미생물 — 굽은 목이 미생물만 가둠.',
  },
  {
    q: '파스퇴르가 개발한 우유 살균법은?',
    options: ['冷凍法', '低温殺菌(パスチャライゼーション)', '乾燥法', '塩漬け'],
    correct: 1,
    explanation: '低温殺菌. 적당한 온도로 데워 유해균만 죽이고 맛은 보존. 그의 이름에서 유래.',
  },
  {
    q: '다음 중 微生物의 유익한 작용은?',
    options: ['発酵 (요구르트·빵)', '食中毒', '虫歯', '伝染病'],
    correct: 0,
    explanation: '발효(요구르트·빵·치즈·된장)는 미생물의 유익한 작용. 모든 미생물이 해로운 건 아님.',
  },
  {
    q: '病原菌을 차단하는 위생 습관이 아닌 것은?',
    options: ['手洗い', '加熱·殺菌', '消毒', '部屋を 暗くする'],
    correct: 3,
    explanation: '방을 어둡게 하는 것은 위생과 무관. 손씻기·가열·소독이 미생물 차단의 핵심.',
  },
  {
    q: '파스퇴르가 백신을 개발한 병은?',
    options: ['감기', '狂犬病·炭疽病', '骨折', '近視'],
    correct: 1,
    explanation: '광견병·탄저병 백신 개발. 제너의 천연두 종두법을 이론적으로 확장.',
  },
  {
    q: '「生命は 生命から」 라는 원리를 무엇이라 하는가?',
    options: ['自然発生説', '生物発生説', '進化論', '細胞説'],
    correct: 1,
    explanation: '生物発生説. 생명은 기존 생명에서만 나온다. 파스퇴르가 자연발생설을 뒤집고 확립.',
  },
],
```

### 5-6. tips (8포인트)

```javascript
tips: [
  { title: '①  腐敗 = 外来 微生物',            body: '스프가 썩는 건 저절로가 아니라 공기 중 미생물이 들어가 번식하기 때문. 「自然発生説」은 틀렸음.' },
  { title: '②  白鳥の 首 フラスコ',            body: '공기는 통하되 미생물은 굽은 목에 갇힘. 「공기 자체가 아니라 미생물이 원인」을 증명한 명실험.' },
  { title: '③  微生物 = 細菌·ウイルス·カビ',   body: '눈에 안 보이는 작은 생물들. 대부분 무해·유익(발효), 일부만 병원균.' },
  { title: '④  発酵 — 미생물의 선물',          body: '요구르트·빵·치즈·된장·술 모두 미생물의 발효. 미생물 = 「적」만은 아님.' },
  { title: '⑤  ワクチン = 弱い 敵으로 練習',   body: '약독화 병원균으로 면역을 미리 만듦. 진짜가 와도 격퇴. 파스퇴르가 이론화.' },
  { title: '⑥  低温殺菌 = 파스퇴르의 발명',    body: '우유 등을 적당히 데워 유해균만 죽임. 영어로 pasteurization — 그의 이름.' },
  { title: '⑦  清潔이 命을 지킨다',            body: '손씻기·소독·가열로 병원균 차단. 미생물 발견이 의학을 바꿈.' },
  { title: '⑧  「見えない=無い」가 아니다',     body: '눈에 안 보여도 존재함. 관찰(현미경)과 실험으로 증명하는 것이 과학의 태도.' },
],
```

---

## 6. caseQuiz (5문제)

```javascript
caseQuiz: [
  {
    q: '事件 5 で 片方の スープ만 썩은 이유는?',
    options: ['오래되어서', '공기 중 微生物이 들어가서', '유리가 달라서', '소금이 없어서'],
    correct: 1,
  },
  {
    q: '백조목 플라스크가 부정한 옛 학설은?',
    options: ['進化論', '自然発生説', '万有引力', '相対性理論'],
    correct: 1,
  },
  {
    q: 'ワクチン의 원리는?',
    options: ['강한 병원균 주입', '약한 병원균으로 免疫 형성', '미생물 전멸', '항생제 복용'],
    correct: 1,
  },
  {
    q: '微生物가 아닌 것은?',
    options: ['細菌', 'カビ', 'ウイルス', '石'],
    correct: 3,
  },
  {
    q: '細菌学의 아버지로 불리는 사람은?',
    options: ['ダーウィン', 'パスツール', 'ニュートン', 'キュリー'],
    correct: 1,
  },
],
```

---

## 7. 데이터·엔진 파일 갱신

### 7-1. data/series4-scientists.js

SCIENTISTS_STORY 배열의 id=5 entry (인덱스 [4])만 placeholder → 풀콘텐츠. 다른 entry는 건드리지 말 것.

```javascript
{
  id: 5, icon: '🦠',
  title: '見えない敵の正体',
  subtitle: 'スープは なぜ 腐るのか?',
  theme: '細菌·微生物·ワクチン·殺菌',
  bgm: 'mystery',
  illustration: SCIENTISTS_CASE_IMAGES[5],
  charKey: 'pasteur_micro',
  sceneKey: 'bg_ch05_microbiology',
  comingSoon: false,                       // true → false
  learnRef: 'scientists_case05',           // 신규 추가
  intro: { /* §4-1 */ },
  steps: [ /* §4-2 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6 */ ],
  note: {
    title: '第5事件 見えない 敵の 正体',
    desc: '白鳥の 首 フラスコ — 공기는 통하되 미생물은 차단. 부패와 병의 원인이 「自然発生」이 아닌 눈에 보이지 않는 微生物임을 증명한 파스퇴르의 細菌学. 위생·백신·살균의 출발점을 배운 第五歩.'
  },
},
```

### 7-2. data/series4-scientists-learn.js

SCIENTISTS_LEARN에 scientists_case05 키 **추가** (case01~04 보존). 기존 `// 사건 5~10 은 향후...` 주석 자리에 삽입:

```javascript
const SCIENTISTS_LEARN = {
  scientists_case01: { /* 보존 */ },
  scientists_case02: { /* 보존 */ },
  scientists_case03: { /* 보존 */ },
  scientists_case04: { /* 보존 */ },
  scientists_case05: {  // 신규
    title: '微生物と 細菌の 世界',
    subtitle: '事件 5 で 学んだ こと',
    examScope: '중학 生物 + 比喩 중심',
    concept: { /* §5-1 */ },
    diagrams: [ /* §5-2 SVG 4개 */ ],
    formulas: [ /* §5-3 */ ],
    unitsTable: { /* §5-3 */ },
    flashcards: [ /* §5-4 */ ],
    exercises: [ /* §5-5 */ ],
    tips: [ /* §5-6 */ ],
  },
  // 사건 6~10 은 향후 별도 명세서에서 추가 (scientists_case06 ...).
};
```

### 7-3. ⭐ engine/detectives-B.js — SCIENTISTS_SPEAKER_MAP 등록 (필수, 먼저!)

사건 4에서 확인된 형식 그대로. SCIENTISTS_SPEAKER_MAP(engine/detectives-B.js:~2835)에 기존 4개 NPC 뒤에 pasteur_micro 추가:

```javascript
const SCIENTISTS_SPEAKER_MAP = {
  // 기존 (보존):
  ringo_hakase:   { cls: 'sensei', name: '林檎博士', ... },
  shiraga_ein:    { cls: 'sensei', name: 'アイン教授', ... },
  hikari_curie:   { cls: 'sensei', name: 'キューリィ夫人', ... },
  darwin_voyager: { cls: 'sensei', name: 'ダーリン教授', ... },
  // 신규 추가:
  pasteur_micro:  { cls: 'sensei', name: 'パスト博士', ... 기존 형식 그대로 },
};
```

**중요**: 사건 4 등록 때 확인된 형식(`{cls:'sensei', name:'...', ...}`)을 그대로 따를 것. 누락 시 「ナレーター」 fallback.

등록 후 콘솔 검증:
```javascript
SCIENTISTS_SPEAKER_MAP.pasteur_micro          // 객체
SCIENTISTS_SPEAKER_MAP.pasteur_micro.name     // 'パスト博士'
```

### 7-4. 그 외 — 변경 없음

✅ engine/scientists-learn.js, index.html 그대로.

---

## 8. 검증 체크리스트

### 8-1. 콘솔 검증

```javascript
SCIENTISTS_STORY[4].id                                    // 5
SCIENTISTS_STORY[4].title                                 // "見えない敵の正体"
SCIENTISTS_STORY[4].comingSoon                            // false
SCIENTISTS_STORY[4].learnRef                              // "scientists_case05"
SCIENTISTS_STORY[4].charKey                               // "pasteur_micro"
SCIENTISTS_STORY[4].intro.lines.length                    // 17
SCIENTISTS_STORY[4].steps.length                          // 6
SCIENTISTS_STORY[4].steps[5].options[0].response.length   // 8
SCIENTISTS_STORY[4].ending.lines.length                   // 7
SCIENTISTS_STORY[4].caseQuiz.length                       // 5

SCIENTISTS_LEARN.scientists_case05                        // 객체 (신규)
SCIENTISTS_LEARN.scientists_case05.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case05.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case05.diagrams.length        // 4

// ⭐ SPEAKER_MAP
SCIENTISTS_SPEAKER_MAP.pasteur_micro                      // 객체
SCIENTISTS_SPEAKER_MAP.pasteur_micro.name                 // 'パスト博士'

// 회귀
SCIENTISTS_STORY[0].comingSoon  // false (case 1)
SCIENTISTS_STORY[3].comingSoon  // false (case 4)
SCIENTISTS_STORY[5].comingSoon  // true (case 6 placeholder)
SCIENTISTS_STORY[9].comingSoon  // true (보스)
SCIENTISTS_SPEAKER_MAP.darwin_voyager  // 보존
SCIENTISTS_SPEAKER_MAP.hikari_curie    // 보존
```

### 8-2. 시각 검증

- [ ] 사건 5 카드 잠금 풀림 + 클릭 가능
- [ ] **パスト博士 등장 시 「パスト博士」 이름 + pasteur_micro.png 초상화** (「ナレーター」 fallback 아님 ⭐)
- [ ] STEP 1~6 정상 + step6 결론 8줄
- [ ] 학습 모달 6탭 + SVG 4개 (백조목·미생물 3종·백신·위생)
- [ ] caseQuiz 5문제 + 별점
- [ ] 사건 5 클리어 마크 (scientistsCleared[4] = true)
- [ ] パスト博士 외곽 박스 없음 (drop-shadow 약화 상태)

### 8-3. 회귀 테스트

- [ ] 시리즈 1~3, 5~12 정상
- [ ] 시리즈 4 사건 1·2·3·4 정상 (NPC 이름·초상화 보존)
- [ ] 시리즈 4 사건 6~10 placeholder 그대로
- [ ] 영어학습·채팅 정상

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| SCIENTISTS_STORY[0]~[3] 수정 | 사건 1·2·3·4 완성 |
| SCIENTISTS_STORY[5]~[9] 수정 | 사건 6~10 별도 명세서 |
| SCIENTISTS_LEARN.scientists_case01~04 수정 | 보존 |
| SPEAKER_MAP 기존 4개 NPC 수정 | 사건 1~4 동작 보존 |
| engine/scientists-learn.js 수정 | 정착됨 |
| data/series3-science.js 수정 | 시리즈 3 사용 중 |
| 신규 PNG 생성 | pasteur_micro.png 이미 존재 (RGBA) |
| 실명 「パスツール」을 パスト博士 대사로 사용 | 가상 캐릭터 정체성 |

---

## 10. 작업 순서

```
Step 1: 사건 4 데이터 구조 + SCIENTISTS_SPEAKER_MAP 정독 (참조)
Step 2: ⭐ engine/detectives-B.js에 pasteur_micro 등록 (먼저!) + 콘솔 검증
Step 3: data/series4-scientists.js의 SCIENTISTS_STORY[4] 교체 + 콘솔 검증
Step 4: data/series4-scientists-learn.js에 scientists_case05 추가 (case01~04 보존) + 콘솔 검증
Step 5: 브라우저 시각 검증 (§8-2) — 특히 パスト博士 이름·초상화
Step 6: 회귀 테스트 (§8-3)
Step 7: git commit + push
  - commit msg: "feat(series04/case05): add Pasteur/microbiology content + register pasteur_micro in speaker map"
Step 8: 완료 보고
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE05_SPEC.md를 정독하고, 시리즈 4 사건 5 「見えない敵の正体」 
본격 콘텐츠를 작성해줘. 사건 4와 동일 패턴.

[⭐ 가장 중요 — 사건 2·3 버그 재발 방지]
engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 pasteur_micro 등록을 
가장 먼저 진행 (Step 2). 기존 4개 NPC와 정확히 동일한 형식으로:
  pasteur_micro: { cls: 'sensei', name: 'パスト博士', ... 기존 형식 그대로 }
이 등록이 빠지면 사건 5의 모든 パスト博士 대사가 「ナレーター」로 fallback됨.
등록 후 콘솔 검증: SCIENTISTS_SPEAKER_MAP.pasteur_micro 가 객체인지 확인.

[핵심 원칙]
- 사건 4 (SCIENTISTS_STORY[3], scientists_case04) 패턴 정확히 mirror.
- SCIENTISTS_STORY[4] entry만 placeholder에서 풀콘텐츠로 교체.
- SCIENTISTS_LEARN에 scientists_case05 키만 추가, case01~04 보존.
- pasteur_micro.png는 이미 존재 (RGBA) — 신규 PNG 생성 X.

[세균학 주제의 톤]
- 「自然発生説」은 틀렸음 — 미생물은 외부에서 들어온다
- 미생물 = 「적」만이 아님 (발효 등 유익한 것도 많음, 균형 잡힌 시각)
- 「見えない=無い」가 아니라 관찰·실험으로 증명하는 과학적 태도
- 위생·백신의 중요성 (어린이 친화적, 공포 조장 금지)

[작업 순서]
§10의 8단계 그대로. SPEAKER_MAP 등록(Step 2)을 데이터 작성보다 먼저.
각 step 후 §8-1 콘솔 검증.

[금지 사항]
- 사건 1·2·3·4 (SCIENTISTS_STORY[0~3], scientists_case01~04) 수정 X
- SPEAKER_MAP 기존 4개 NPC 수정 X
- 사건 6~10 placeholder 그대로
- 시리즈 3 untouched
- engine/scientists-learn.js·자산 PNG 미수정

[회귀 테스트]
push 전 시리즈 1~3, 5~12 + 사건 1·2·3·4 (NPC 이름·초상화 정상) + 영어학습 + 채팅 확인.

commit msg: "feat(series04/case05): add Pasteur/microbiology content + register pasteur_micro in speaker map"
```

---

**END OF SPEC**

사건 4와 동일 구조. 핵심은 §7-3 SPEAKER_MAP 등록(pasteur_micro)을 데이터 작성보다 먼저 수행하여 「ナレーター」 fallback 버그를 구조적으로 예방. NPC PNG는 이미 존재하므로 신규 생성 부담 없음.
