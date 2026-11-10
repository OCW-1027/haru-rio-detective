# SERIES 4 — CASE 10 (BOSS) CONTENT SPEC
## 「賢者の 最後の 試練」 — 6人의 科学者 종합·보스전

**작성일**: 2026-06-24
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 사건**: 사건 1~9 완성 (시리즈 4 보스 = 마지막 사건)

**핵심 (사건 4~9 패턴 기반, 단 보스전 특수성 반영)**:
- ⭐ §7-3 SCIENTISTS_SPEAKER_MAP에 `togo_kenja` 등록 (데이터보다 먼저).
- ✅ NPC PNG 이미 준비됨 (`togo_kenja.png`, RGBA).
- 🎯 **보스전 특수성**: 새 과학 개념 학습이 아니라 **사건 1~9 종합·복습**. 학습 자료는 「6과학자 총정리」 형태.

**범위**:
- ✅ 사건 10 보스 스토리 (intro + 6 steps + 결말)
- ✅ 賢者(togo_kenja) 인격
- ✅ 학습 자료 6섹션 (사건 1~9 종합 복습)
- ✅ caseQuiz 5문제 (전 사건 종합)
- ✅ 시리즈 4 전체 완료(클리어) 처리
- ✅ data/series4-scientists.js 사건 10 갱신 (SCIENTISTS_STORY[9])
- ✅ data/series4-scientists-learn.js에 scientists_case10 추가
- ✅ engine/detectives-B.js에 togo_kenja 등록

---

## 0. PRE-FLIGHT
- [ ] 사건 1~9 정상 (보스 해금 조건: 사건 1~9 클리어)
- [ ] SCIENTISTS_STORY[9] (id=10)가 placeholder (comingSoon: true)
- [ ] SCIENTISTS_LEARN에 scientists_case01~09만 존재
- [ ] assets/characters/series04/togo_kenja.png 존재 (RGBA)
- [ ] git 깨끗

---

## 1. 사건 10 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 10 (보스) |
| 제목 | **賢者の 最後の 試練 (けんじゃの さいごの しれん)** |
| 부제 | 6人の 科学者の 知恵を 集めて |
| 학습 테마 | 사건 1~9 종합 (만유인력·상대성·방사능·진화·세균·유전·천체·전자기·원자) |
| 학습 깊이 | 전 사건 복습 + 과학적 태도의 종합 |
| NPC | 賢者 (togo_kenja) |
| 동행 | ハル + リオ + ヒナタ + ペンタ |
| 배경 | bg_ch10_boss (현자의 서재/탑) |
| 구조 | 6개의 시련 = 사건 1~9의 핵심 개념을 묻는 종합 퀴즈형 추리 |
| 플레이타임 | 15~18분 |

---

## 2. 賢者 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 긴 로브 + 지팡이 + 책 (자산 PNG togo_kenja.png 그대로) |
| 나이 | 불명 (노현자) |
| 직업 | 지식의 수호자 |
| 성격 | 온화하고 깊이 있음, 시험하되 따뜻하게 이끔. 답을 주기보다 묻는 자 |
| 1인칭 | 「わし」 |
| 말투 | 「~じゃ」「~かのう」「よくぞ ここまで 来た」「知恵を 見せて もらおう」 |
| 좋아하는 것 | 배우려는 마음, 끈기, 호기심 |
| 모티프 | 가상의 현자 (특정 실존 인물 아님 — 시리즈 4의 종합 가이드) |
| 핵심 대사 | 「知識は 力では ない。 知ろうと する 心こそ、 真の 力 なのじゃ」 |
| **표시명** | **賢者** |

**중요**: 賢者는 실존 인물 모티프가 아닌 가상 캐릭터. 사건 1~9 과학자들의 지혜를 잇는 종합 가이드 역할.

---

## 3. 보스전 구조 「6人의 知恵」

### 3-1. 전체 흐름

賢者가 ハル 일행에게 「지금까지 만난 과학자들의 지혜를 진짜로 이해했는지」 시험. 6개의 시련(step)을 통과하면 시리즈 4 완료. 각 시련은 사건 1~9의 핵심 개념을 **새 상황에 적용**하는 형태 (단순 암기가 아닌 응용).

### 3-2. 6 시련 매핑

| Step | 시련 | 연결 사건 | 핵심 개념 |
|---|---|---|---|
| 1 | 떨어지는 두 물체 | 사건 1 (뉴턴) | 만유인력 — 무게 달라도 같이 떨어짐 |
| 2 | 빠른 우주선의 시간 | 사건 2 (아인) | 상대성 — 빠를수록 시간이 천천히 |
| 3 | 빛나는 미지의 돌 | 사건 3 (퀴리) | 방사능 — 스스로 빛/에너지를 냄 |
| 4 | 섬의 다른 생물 | 사건 4 (다윈) | 진화 — 환경에 適者가 살아남음 |
| 5 | 상한 음식의 원인 | 사건 5 (파스퇴르) | 세균 — 보이지 않는 미생물 |
| 6 | 종합 — 6과학자의 공통점 | 사건 6·7·8·9 종합 | 「관찰·증거·규칙」의 과학 태도 |

(사건 6 유전·7 천체·8 전자기·9 원자는 step6에서 통합적으로 다룸 — 6개 step에 9개 사건을 압축)

### 3-3. 최종 메시지 (賢者)

「見事じゃ。 ニュートン、 アイン、 キューリィ、 ダーリン、 パスト、 メンデル、 ガリレオ、 ファラデー、 ボーア — 皆の 知恵を、 お主たちは 確かに 受け継いだ。」

- 모든 과학자의 공통점: **눈에 보이지 않는 것을, 관찰·실험·증거로 밝혀냄**
- 「강함」이 아니라 「알려는 마음」이 진짜 힘
- ハル·リオ도 이제 작은 과학자
- 「知ろうと する 心が ある かぎり、 世界の 謎は いつか 解ける のじゃ」

### 3-4. 학습 포인트 연결

賢者: 「学んだ ことを、 もう一度 振り返って みよう。 9つの 物語が、 一つの 大きな 知恵に なる」
→ 학습 자료 (6과학자 종합 복습).

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: '賢者の 最後の 試練',
  subtitle: '6人の 科学者の 知恵を 集めて',
  bg: 'bg_ch10_boss',
  lines: [
    { speaker: 'narrator',   text: 'ボーアの 紹介で、 古い 塔の 最上階を 訪ねた。 壁一面に 本が 並ぶ。' },
    { speaker: 'hinata',     text: 'ここが 最後の 場所… 「知識の 守り手」 が いると 聞きました。' },
    { speaker: 'rio',        text: 'うわぁ、 本が 天井まで! すごい 数…' },
    { speaker: 'haru',       text: '誰か いる… 杖を 持った、 長い ローブの 人。' },
    { speaker: 'togo_kenja', text: 'よくぞ ここまで 来た、 若き 探偵たち。 わしは 知識の 守り手 — 賢者じゃ。' },
    { speaker: 'togo_kenja', text: 'お主たちは 9人の 偉大な 科学者に 会い、 多くを 学んだ そうじゃな。' },
    { speaker: 'rio',        text: 'はい! ニュートンさん、 アインさん、 キューリィさん…!' },
    { speaker: 'togo_kenja', text: 'ふむ。 だが、 本当に 「理解」 した かのう? 覚えた だけ では ないか?' },
    { speaker: 'haru',       text: '理解… ちゃんと できてるか、 試したい です。' },
    { speaker: 'togo_kenja', text: 'よい 心がけじゃ。 では、 6つの 試練を 用意した。 学んだ 知恵で 解いて みせよ。' },
    { speaker: 'hinata',     text: '今までの 事件で 学んだ ことが、 試されるんですね。' },
    { speaker: 'togo_kenja', text: 'そうじゃ。 ただ 覚えた こと では なく、 新しい 場面で 使えるか — それが 「理解」 じゃ。' },
    { speaker: 'rio',        text: 'ドキドキする… でも やってみる!' },
    { speaker: 'togo_kenja', text: '知識は 力では ない。 知ろうと する 心こそ、 真の 力 なのじゃ。' },
    { speaker: 'togo_kenja', text: 'さあ、 最初の 試練じゃ。 心を 落ち着けて、 よく 考えるのじゃ。' },
    { speaker: 'haru',       text: 'みんなで 力を 合わせよう。 きっと できる!' },
    { speaker: 'penta',      text: 'ペンッ! 最後の 試練、 がんばるペン!' },
  ],
  cta: '⚔️ 試練に 挑む',
},
```

### 4-2. steps (6개 시련)

#### Step 1 — 시련 1 (만유인력, 사건 1)

```javascript
{
  id: 'step1',
  title: '🍎 試練 1: 落ちる 二つの もの',
  bg: 'bg_ch10_boss',
  question: '賢者の 問い: 「重い 鉄球と 軽い 羽根、 空気が ない ところで 同時に 落とすと?」',
  options: [
    {
      label: '同時に 落ちる — 重さに 関係なく 同じ 速さ',
      isCorrect: true,
      response: [
        { speaker: 'haru',       text: '空気の 抵抗が なければ、 重さに 関係なく 同時に 落ちる!' },
        { speaker: 'rio',        text: 'ニュートンさんの 万有引力だ! 林檎博士の 事件!' },
        { speaker: 'togo_kenja', text: 'お見事。 重さが 違っても、 引力による 落ち方は 同じ。 よく 理解して おる。' },
      ],
    },
    {
      label: '重い 鉄球が 先に 落ちる',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '空気が なければ 同時 だよ。 事件 1 を 思い出して。' },
      ],
    },
    {
      label: '軽い 羽根が 先に 落ちる',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '空気が ない 場所では、 重さに 関係なく 同時 です。' },
      ],
    },
  ],
},
```

#### Step 2 — 시련 2 (상대성, 사건 2)

```javascript
{
  id: 'step2',
  title: '🚀 試練 2: 速い 宇宙船の 時間',
  bg: 'bg_ch10_boss',
  question: '賢者の 問い: 「光に 近い 速さで 飛ぶ 宇宙船の 時計は、 地球の 時計と 比べて?」',
  options: [
    {
      label: 'ゆっくり 進む — 速いほど 時間は 遅くなる',
      isCorrect: true,
      response: [
        { speaker: 'haru',       text: '速く 動くほど、 時間は ゆっくり 進む… アイン教授の 相対性理論!' },
        { speaker: 'rio',        text: '宇宙船の 中の 時間が 遅くなるんだ! 不思議だけど 本当!' },
        { speaker: 'togo_kenja', text: 'その通り。 時間さえ 一定では ない。 難しい 概念を よく つかんで おる。' },
      ],
    },
    {
      label: '速く 進む',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '逆だよ。 速いほど 時間は ゆっくり。 事件 2 を 思い出して。' },
      ],
    },
    {
      label: '全く 同じ',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '速さで 時間の 進み方が 変わります。 アイン教授の 話です。' },
      ],
    },
  ],
},
```

#### Step 3 — 시련 3 (방사능, 사건 3)

```javascript
{
  id: 'step3',
  title: '💎 試練 3: 光る 謎の 石',
  bg: 'bg_ch10_boss',
  question: '賢者の 問い: 「暗闇で ひとりでに 光り、 エネルギーを 出し続ける 石。 何の 力?」',
  options: [
    {
      label: '放射能 — 原子が ひとりでに エネルギーを 出す',
      isCorrect: true,
      response: [
        { speaker: 'haru',       text: '外から 何も しなくても エネルギーを 出す… キューリィ夫人の 放射能!' },
        { speaker: 'rio',        text: '石の 中の 原子が、 自分から 光を 出すんだ!' },
        { speaker: 'togo_kenja', text: 'お見事。 原子の 中に 秘められた 力。 よく 覚えて おる。' },
      ],
    },
    {
      label: '電気の 力',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '電池も ないのに 光る… これは 放射能だよ。 事件 3。' },
      ],
    },
    {
      label: '太陽の 光を ためた だけ',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '暗闇でも 出し続けます。 ためた 光では なく 放射能です。' },
      ],
    },
  ],
},
```

#### Step 4 — 시련 4 (진화, 사건 4)

```javascript
{
  id: 'step4',
  title: '🐦 試練 4: 島の 生き物',
  bg: 'bg_ch10_boss',
  question: '賢者の 問い: 「島で 生き残るのは、 どんな 生き物 じゃ?」',
  options: [
    {
      label: 'その 環境に 合った (適した) 生き物',
      isCorrect: true,
      response: [
        { speaker: 'haru',       text: '「強い」 生き物 では なく、 「環境に 合った」 生き物… ダーリン教授の 進化論!' },
        { speaker: 'rio',        text: '適者生存! 強さ じゃ なくて 環境に 合うか どうか!' },
        { speaker: 'togo_kenja', text: 'その通り。 「強者」 では なく 「適者」。 大切な ところを よく 理解して おる。' },
      ],
    },
    {
      label: '一番 強くて 大きい 生き物',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '「強い」 じゃ なくて 「環境に 合う」 だよ。 事件 4 の 大事な 点。' },
      ],
    },
    {
      label: '一番 速く 走る 生き物',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '速さ では なく、 その 環境への 適応 です。' },
      ],
    },
  ],
},
```

#### Step 5 — 시련 5 (세균, 사건 5)

```javascript
{
  id: 'step5',
  title: '🦠 試練 5: 腐った 食べ物',
  bg: 'bg_ch10_boss',
  question: '賢者の 問い: 「食べ物が 腐る 本当の 原因は?」',
  options: [
    {
      label: '空気中の 目に 見えない 微生物 (細菌)',
      isCorrect: true,
      response: [
        { speaker: 'haru',       text: '自然に 腐るんじゃ ない。 空気中の 微生物が 入る から… パスト博士の 細菌学!' },
        { speaker: 'rio',        text: '見えない 微生物の しわざ! だから 清潔が 大事!' },
        { speaker: 'togo_kenja', text: 'お見事。 見えない ものを 見抜く 目。 パストの 知恵を 受け継いで おる。' },
      ],
    },
    {
      label: '食べ物から 自然に 生命が 生まれる',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'それは 昔の 間違った 考え(自然発生説)だよ。 微生物が 原因。' },
      ],
    },
    {
      label: '時間が 経つと 勝手に 腐る',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '原因は 外から 入る 微生物 です。 事件 5 を 思い出して。' },
      ],
    },
  ],
},
```

#### Step 6 — 시련 6 (종합 — 6·7·8·9 + 과학 태도)

```javascript
{
  id: 'step6',
  title: '🧩 試練 6: 科学者たちの 共通点',
  bg: 'bg_ch10_boss',
  question: '賢者の 最後の 問い: 「メンデル·ガリレオ·ファラデー·ボーア — そして 全ての 科学者に 共通する ことは 何じゃ?」',
  options: [
    {
      label: '「目に 見えない ものを、 観察·実験·証拠で 明らかに した」 こと',
      isCorrect: true,
      response: [
        { speaker: 'haru',       text: 'メンデルは 見えない 「遺伝の 因子」 を、 数えて 見つけた…' },
        { speaker: 'hinata',     text: 'ガリレオは 望遠鏡で、 ファラデーは 実験で、 見えない ものを 確かめた…' },
        { speaker: 'rio',        text: 'ボーアは 見えない 原子の 中の 規則を 見つけた!' },
        { speaker: 'haru',       text: '皆 「目に 見えない もの」 を、 観察と 証拠で 明らかに したんだ!' },
        { speaker: 'togo_kenja', text: '…お見事じゃ。 まさに それが、 全ての 科学者に 共通する 知恵。' },
        { speaker: 'togo_kenja', text: '権威や 思い込み では なく、 自分の 目と 頭で 確かめる。 それが 科学なのじゃ。' },
        { speaker: 'hinata',     text: '9つの 事件が、 一つの 大きな 教えに つながりました。' },
        { speaker: 'togo_kenja', text: 'よくぞ たどり着いた。 お主たちは、 もう 立派な 小さき 科学者じゃ。' },
      ],
    },
    {
      label: '「皆 とても 頭が 良かった」 こと',
      isCorrect: false,
      response: [
        { speaker: 'togo_kenja', text: '頭の 良さ では ない。 もっと 大切な、 共通の 「姿勢」 が あるのじゃ。' },
      ],
    },
    {
      label: '「皆 有名に なった」 こと',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '有名さ じゃ なくて… 観察と 証拠を 大切に した ことだと 思う。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch10_boss',
  lines: [
    { speaker: 'togo_kenja', text: '見事じゃ。 6つの 試練、 全て 突破した。 お主たちの 知恵を 認めよう。' },
    { speaker: 'togo_kenja', text: 'ニュートン、 アイン、 キューリィ、 ダーリン、 パスト、 メンデル、 ガリレオ、 ファラデー、 ボーア…' },
    { speaker: 'togo_kenja', text: '9人の 偉大な 知恵を、 お主たちは 確かに 受け継いだ のじゃ。' },
    { speaker: 'rio',        text: 'やったー! 全部 クリア!' },
    { speaker: 'haru',       text: 'みんなで 力を 合わせたから… ヒナタも ペンタも、 ありがとう。' },
    { speaker: 'hinata',     text: '科学者たちの 「知ろうと する 心」、 私も 受け継ぎたい です。' },
    { speaker: 'togo_kenja', text: '知ろうと する 心が ある かぎり、 世界の 謎は いつか 解ける のじゃ。' },
    { speaker: 'togo_kenja', text: 'さあ、 学んだ 全てを、 もう一度 振り返って みよう。 9つの 物語の 総まとめじゃ。' },
    { speaker: 'penta',      text: 'ペンッ! 全部 クリア、 ペン! みんな すごいペン!' },
  ],
  cta: '📚 総まとめを 開く',
},
```

---

## 5. 학습 자료 6섹션 (사건 1~9 종합 복습)

**보스전 특수**: 새 개념이 아닌 **9개 사건 총정리**.

### 5-1. concept

```javascript
concept: {
  title: '9人の 科学者 — 知恵の 総まとめ',
  paragraphs: [
    'シリーズ 4 「偉人科学者ファイル」 で、 君は 9人の 偉大な 科学者に 出会い、 その 知恵を 学びました。 ニュートンの 万有引力、 アインシュタインの 相対性理論、 キュリーの 放射能、 ダーウィンの 進化論、 パスツールの 細菌学 — 物理から 生物まで、 世界の 仕組みを 探る 旅でした。',
    'さらに メンデルの 遺伝法則、 ガリレオの 天体観測、 ファラデーの 電磁誘導、 ボーアの 原子模型。 大きな 宇宙から、 目に 見えない ほど 小さな 原子まで — 科学は あらゆる スケールの 謎に 挑んで きました。',
    '9つの 物語に 共通する 大切な 教えが あります。 それは 「目に 見えない ものを、 観察·実験·証拠で 明らかに する」 という 姿勢です。 権威や 思い込みでは なく、 自分の 目と 頭で 確かめる — それが 科学の 心です。',
    'そして もう 一つ。 進化で 学んだ ように、 大切なのは 「強さ」 ではなく 「学ぼうと する 心」 です。 メンデルは 8年 数え続け、 ファラデーは 何度も 実験を 重ねました。 知ろうと する 心が ある かぎり、 世界の 謎は いつか 解ける のです。 君も、 もう 立派な 小さき 科学者です。',
  ],
  highlight: '9人の 共通点 = 「見えない ものを 観察·証拠で 明らかに する 心」。 強さ より 「知ろうと する 心」。',
},
```

### 5-2. diagrams (SVG 4개 — 종합 정리)

#### 도해 1: 9과학자 한눈에 (500×360)
- 9명 아이콘 + 한 줄 키워드 (뉴턴=引力, 아인=時間, 퀴리=放射能, 다윈=進化, 파스퇴르=細菌, 멘델=遺伝, 갈릴레오=天体, 패러데이=電気, 보어=原子)
- 캡션: 「9人の 科学者と その 発見」

#### 도해 2: 스케일의 과학 — 거대~극소 (500×280)
- 우주(천체·중력) → 지구(진화·세균) → 원자(전자·방사능) 스케일 축
- 각 영역에 해당 과학자 배치
- 캡션: 「宇宙から 原子まで — あらゆる スケールの 謎」

#### 도해 3: 과학의 공통 태도 (450×300)
- 「観察 → 実験 → 証拠 → 規則 발견」 순환 흐름
- 「권위·思い込み」에 X
- 캡션: 「全ての 科学者に 共通する 姿勢」

#### 도해 4: 분야별 분류 (450×300)
- 物理(뉴턴·아인·갈릴레오·패러데이·보어) / 化学·原子(퀴리·보어) / 生物(다윈·파스퇴르·멘델)
- 캡션: 「物理·化学·生物 — つながる 科学」

### 5-3. formulas + unitsTable

```javascript
formulas: [
  {
    name: '科学의 공통 태도',
    formula: '観察 + 実験 + 証拠 → 規則 발견',
    formulaSimple: '観察·実験·証拠',
    explanation: '9명 모두 눈에 보이지 않는 것을 관찰·실험·증거로 밝혀냄. 권위나 선입견이 아닌 직접 확인.',
    note: '시리즈 4 전체를 관통하는 핵심 메시지.',
  },
  {
    name: '배움의 자세',
    formula: '「強さ」 < 「知ろうと する 心」',
    formulaSimple: '호기심 > 힘',
    explanation: '진화의 適者처럼, 그리고 멘델의 8년 끈기처럼 — 알려는 마음과 꾸준함이 진짜 힘.',
    note: '어린이에게 전하는 시리즈 4의 메시지.',
  },
],
unitsTable: {
  title: '9事件 핵심 키워드 총정리',
  rows: [
    ['사건', '과학자', '핵심 개념'],
    ['1', 'ニュートン', '万有引力 — 무게 달라도 같이 떨어짐'],
    ['2', 'アインシュタイン', '相対性理論 — 빠를수록 시간 천천히'],
    ['3', 'キュリー', '放射能 — 원자가 스스로 에너지 방출'],
    ['4', 'ダーウィン', '進化論 — 適者(환경 적합)가 생존'],
    ['5', 'パスツール', '細菌学 — 보이지 않는 미생물이 원인'],
    ['6', 'メンデル', '遺伝法則 — 優性·劣性, 3:1'],
    ['7', 'ガリレオ', '天体観測 — 관측·증거가 상식 갱신'],
    ['8', 'ファラデー', '電磁誘導 — 자기장 변화가 전류 생성'],
    ['9', 'ボーア', '原子模型 — 전자는 정해진 층에만'],
  ],
},
```

### 5-4. flashcards (10장 — 종합)

```javascript
flashcards: [
  { front: '万有引力 (ニュートン)',     back: '모든 물체는 서로 끌어당김. 공기 없으면 무게 관계없이 같이 떨어짐. 사건 1.' },
  { front: '相対性理論 (アイン)',       back: '빠르게 움직일수록 시간이 천천히 흐름. 시간은 절대적이지 않음. 사건 2.' },
  { front: '放射能 (キュリー)',         back: '원자가 스스로 에너지(빛·방사선)를 냄. 외부 자극 불필요. 사건 3.' },
  { front: '進化論 (ダーウィン)',       back: '환경에 適者가 살아남아 자손을 남김. 「강자」 아닌 「적자」. 사건 4.' },
  { front: '細菌学 (パスツール)',       back: '부패·병의 원인은 보이지 않는 미생물. 자연발생설 부정. 사건 5.' },
  { front: '遺伝法則 (メンデル)',       back: '형질은 인자 쌍으로 전달. 優性·劣性, 孫세대 3:1. 사건 6.' },
  { front: '天体観測 (ガリレオ)',       back: '목성 위성 발견 → 천동설 반증. 권위보다 관측·증거. 사건 7.' },
  { front: '電磁誘導 (ファラデー)',     back: '자기장이 변할 때 전류 발생. 모든 발전의 원리. 사건 8.' },
  { front: '原子模型 (ボーア)',         back: '전자는 정해진 층에만 존재. 층 이동 시 정해진 빛 방출. 사건 9.' },
  { front: '9人의 공통점',              back: '눈에 보이지 않는 것을 관찰·실험·증거로 밝혀냄. 「알려는 마음」이 진짜 힘.' },
],
```

### 5-5. exercises (10문제 — 전 사건 종합)

```javascript
exercises: [
  {
    q: '공기가 없는 곳에서 무거운 공과 가벼운 깃털을 동시에 떨어뜨리면? (사건 1)',
    options: ['무거운 게 먼저', '동시에', '가벼운 게 먼저', '안 떨어짐'],
    correct: 1,
    explanation: '만유인력 — 무게에 관계없이 같은 속도로 떨어짐(공기 저항 없을 때).',
  },
  {
    q: '빛에 가까운 속도로 나는 우주선의 시간은? (사건 2)',
    options: ['빨라진다', '천천히 간다', '같다', '멈춘다'],
    correct: 1,
    explanation: '상대성이론 — 빠를수록 시간이 천천히 흐름.',
  },
  {
    q: '어둠 속에서 스스로 빛나는 돌의 힘은? (사건 3)',
    options: ['전기', '방사능', '태양광 저장', '자기'],
    correct: 1,
    explanation: '방사능 — 원자가 스스로 에너지를 방출.',
  },
  {
    q: '섬에서 살아남는 생물은? (사건 4)',
    options: ['가장 강한', '환경에 適者', '가장 큰', '가장 빠른'],
    correct: 1,
    explanation: '진화 — 「강자」가 아닌 「환경에 적응한 適者」.',
  },
  {
    q: '음식이 상하는 진짜 원인은? (사건 5)',
    options: ['저절로 생명 발생', '공기 중 미생물', '시간이 지나서', '온도만'],
    correct: 1,
    explanation: '세균학 — 보이지 않는 미생물이 외부에서 들어와 번식.',
  },
  {
    q: '흰꽃×보라꽃의 손자 세대 비율은? (사건 6)',
    options: ['1:1', '3:1', '2:1', '모두 보라'],
    correct: 1,
    explanation: '유전법칙 — 優性(보라):劣性(흰) = 약 3:1.',
  },
  {
    q: '갈릴레오가 천동설을 반증한 관측은? (사건 7)',
    options: ['태양 흑점', '목성의 위성', '달의 모양', '혜성'],
    correct: 1,
    explanation: '목성을 도는 위성 발견 → 「모든 게 지구를 돈다」 반증.',
  },
  {
    q: '코일에 전류가 생기는 때는? (사건 8)',
    options: ['자석 정지 시', '자석을 움직여 자기장이 변할 때', '전지 연결 시만', '항상'],
    correct: 1,
    explanation: '전자기 유도 — 자기장이 변할 때만 전류 발생.',
  },
  {
    q: '원소의 빛이 띄엄띄엄한 이유는? (사건 9)',
    options: ['우연', '전자가 정해진 층에만 있어서', '프리즘 때문', '빛이 약해서'],
    correct: 1,
    explanation: '원자 모형 — 전자가 정해진 층 사이를 이동하며 정해진 빛 방출.',
  },
  {
    q: '9명의 과학자에게 공통된 가장 중요한 태도는?',
    options: ['똑똑함', '관찰·실험·증거로 보이지 않는 것을 밝힘', '유명함', '운이 좋음'],
    correct: 1,
    explanation: '시리즈 4의 핵심 메시지 — 권위가 아닌 관찰·증거의 과학적 태도.',
  },
],
```

### 5-6. tips (8포인트 — 종합 메시지)

```javascript
tips: [
  { title: '①  9人의 旅를 돌아보며',         body: '뉴턴부터 보어까지 — 물리·화학·생물의 위대한 발견을 함께 탐험했습니다.' },
  { title: '②  공통점 = 観察·証拠',          body: '9명 모두 눈에 보이지 않는 것을 관찰·실험·증거로 밝혀냄. 이것이 과학의 핵심.' },
  { title: '③  「強さ」보다 「知る 心」',      body: '進化의 適者처럼, 멘델의 8년 끈기처럼 — 알려는 마음이 진짜 힘.' },
  { title: '④  거대부터 극소까지',            body: '천체(갈릴레오)부터 원자(보어)까지 — 과학은 모든 스케일의 수수께끼에 도전.' },
  { title: '⑤  과학자들은 이어진다',          body: '퀴리·아인·보어는 원자로, 다윈·파스퇴르·멘델은 생명으로 — 지식은 연결됨.' },
  { title: '⑥  의심하고 확인하라',            body: '갈릴레오처럼 상식도 의심하고, 패러데이처럼 직접 실험으로 확인.' },
  { title: '⑦  보이지 않아도 규칙이 있다',     body: '미생물·자기장·전자·유전자 — 보이지 않아도 증거로 그 규칙을 알 수 있음.' },
  { title: '⑧  너도 작은 과학자',             body: '궁금해하고 관찰하고 확인하는 마음이 있다면, 너도 이미 과학자입니다.' },
],
```

---

## 6. caseQuiz (5문제 — 종합)

```javascript
caseQuiz: [
  {
    q: '공기가 없을 때 무거운 것과 가벼운 것을 떨어뜨리면? (사건 1)',
    options: ['무거운 게 먼저', '동시에', '가벼운 게 먼저', '안 떨어짐'],
    correct: 1,
  },
  {
    q: '섬에서 살아남는 생물은? (사건 4)',
    options: ['가장 강한', '환경에 適者', '가장 큰', '가장 빠른'],
    correct: 1,
  },
  {
    q: '음식이 상하는 원인은? (사건 5)',
    options: ['저절로 발생', '보이지 않는 미생물', '시간', '온도만'],
    correct: 1,
  },
  {
    q: '코일에 전류가 생기는 때는? (사건 8)',
    options: ['자석 정지', '자기장이 변할 때', '전지만', '항상'],
    correct: 1,
  },
  {
    q: '9명의 과학자 공통 태도는?',
    options: ['똑똑함', '관찰·실험·증거로 보이지 않는 것을 밝힘', '유명함', '운'],
    correct: 1,
  },
],
```

---

## 7. 데이터·엔진 갱신

### 7-1. data/series4-scientists.js — SCIENTISTS_STORY[9] (id=10)

```javascript
{
  id: 10, icon: '🏆',
  title: '賢者の 最後の 試練',
  subtitle: '6人の 科学者の 知恵を 集めて',
  theme: '総合·復習 (사건 1~9)',
  bgm: 'boss',                              // 보스 BGM (있으면), 없으면 'mystery'
  illustration: SCIENTISTS_CASE_IMAGES[10],
  charKey: 'togo_kenja',
  sceneKey: 'bg_ch10_boss',
  comingSoon: false,
  isBoss: true,                             // 보스 플래그 (엔진에서 사용 중이면)
  learnRef: 'scientists_case10',
  intro: { /* §4-1 */ },
  steps: [ /* §4-2 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6 */ ],
  note: {
    title: '第10事件 賢者の 最後の 試練',
    desc: '9人의 科学者 — 뉴턴·아인·퀴리·다윈·파스퇴르·멘델·갈릴레오·패러데이·보어. 그들의 지혜를 종합하는 최종 시련. 공통점은 「보이지 않는 것을 관찰·증거로 밝히는 마음」. 시리즈 4의 마지막, 작은 과학자로 거듭나는 졸업 시험.'
  },
},
```

**isBoss 주의**: 엔진이 보스 플래그를 쓰는지 확인. 시리즈 5~11의 보스(10장째) 구현 방식을 참조하여 동일 패턴 적용. 만약 보스 특수 처리가 없으면 일반 사건과 동일하게 isBoss 생략 가능.

### 7-2. data/series4-scientists-learn.js — scientists_case10 추가 (case01~09 보존)

```javascript
scientists_case10: {
  title: '9人の 科学者 — 知恵の 総まとめ',
  subtitle: '事件 10 (보스) で 振り返る',
  examScope: '사건 1~9 종합 복습',
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

기존 9개 NPC 뒤에 추가:
```javascript
togo_kenja: { cls: 'sensei', name: '賢者', charKey: 'togo_kenja', pos: 'center' },
```

콘솔 검증:
```javascript
SCIENTISTS_SPEAKER_MAP.togo_kenja        // 객체
SCIENTISTS_SPEAKER_MAP.togo_kenja.name   // '賢者'
```

### 7-4. 시리즈 4 완료(클리어) 처리

사건 10 클리어 시 시리즈 4 전체 완료로 표시되는지 확인. 시리즈 5~11의 보스 클리어 → 시리즈 완료 처리 방식을 참조. 별도 완료 화면/배지가 있으면 동일 적용. (엔진에 이미 있으면 추가 작업 불필요.)

---

## 8. 검증

### 8-1. 콘솔

```javascript
SCIENTISTS_STORY[9].id                                    // 10
SCIENTISTS_STORY[9].comingSoon                            // false
SCIENTISTS_STORY[9].learnRef                              // "scientists_case10"
SCIENTISTS_STORY[9].charKey                               // "togo_kenja"
SCIENTISTS_STORY[9].intro.lines.length                    // 17
SCIENTISTS_STORY[9].steps.length                          // 6
SCIENTISTS_STORY[9].steps[5].options[0].response.length   // 8
SCIENTISTS_STORY[9].ending.lines.length                   // 9
SCIENTISTS_STORY[9].caseQuiz.length                       // 5
SCIENTISTS_LEARN.scientists_case10                        // 객체
SCIENTISTS_LEARN.scientists_case10.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case10.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case10.diagrams.length        // 4
SCIENTISTS_SPEAKER_MAP.togo_kenja                         // 객체
SCIENTISTS_SPEAKER_MAP.togo_kenja.name                    // '賢者'
// 회귀 (이제 사건 1~10 모두 false)
SCIENTISTS_STORY[0].comingSoon  // false
SCIENTISTS_STORY[8].comingSoon  // false (case 9)
SCIENTISTS_STORY.every(s => s.comingSoon === false)  // true (전 사건 완성!)
SCIENTISTS_SPEAKER_MAP.bohr_atom  // 보존
```

### 8-2. 시각
- [ ] 사건 10 카드 잠금 풀림 (사건 1~9 클리어 후)
- [ ] **賢者 등장 시 「賢者」 이름 + togo_kenja.png 초상화** (fallback 아님 ⭐)
- [ ] 6개 시련 STEP 정상 + step6 결론 8줄
- [ ] 학습 모달 6탭 + SVG 4개 (종합 정리)
- [ ] caseQuiz 5문제 + 별점
- [ ] 사건 10 클리어 → 시리즈 4 전체 완료 표시 (배지/화면 있으면)

### 8-3. 회귀
- [ ] 시리즈 1~3, 5~12 정상
- [ ] 사건 1~9 NPC (9명) 이름·초상화 보존
- [ ] 영어학습·채팅 정상

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| SCIENTISTS_STORY[0]~[8] 수정 | 사건 1~9 완성 |
| SCIENTISTS_LEARN.scientists_case01~09 수정 | 보존 |
| SPEAKER_MAP 기존 9개 NPC 수정 | 사건 1~9 동작 보존 |
| engine/scientists-learn.js·시리즈3·자산 PNG | 보존 |
| 賢者에 실존 인물 모티프 부여 | 가상 종합 가이드 캐릭터 |
| 보스 step에서 새 과학 개념 도입 | 보스는 사건 1~9 복습·응용 |

---

## 10. 작업 순서

```
Step 1: 사건 9 구조 + SPEAKER_MAP + 시리즈 5~11 보스 구현 방식 정독
Step 2: ⭐ engine/detectives-B.js에 togo_kenja 등록 (먼저!) + 콘솔 검증
Step 3: SCIENTISTS_STORY[9] 교체 (isBoss 패턴 확인) + 콘솔 검증
Step 4: scientists_case10 추가 (case01~09 보존) + 콘솔 검증
Step 5: 시각 검증 (§8-2) — 賢者 이름·초상화 + 시리즈 4 완료 처리
Step 6: 회귀 테스트 (§8-3)
Step 7: commit + push
  - "feat(series04/case10): add boss case (Sage's trial) + complete series 4"
Step 8: 완료 보고 — 시리즈 4 「偉人科学者ファイル」 전체 완성!
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE10_SPEC.md를 정독하고, 시리즈 4 사건 10 (보스) 「賢者の 最後の 試練」 
본격 콘텐츠를 작성해줘. 사건 9 패턴 기반 + 보스 특수성.

[⭐ 가장 중요]
engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 togo_kenja 등록을 
가장 먼저 (Step 2). 기존 9개 NPC와 동일 형식:
  togo_kenja: { cls: 'sensei', name: '賢者', charKey: 'togo_kenja', pos: 'center' }
누락 시 「ナレーター」 fallback. 등록 후 콘솔 검증.

[보스전 특수성]
- 새 과학 개념 학습이 아니라 사건 1~9 종합·복습.
- 6개 시련(step) = 사건 1·2·3·4·5의 핵심 + step6은 사건 6·7·8·9 + 과학 태도 통합.
- 학습 자료(scientists_case10)는 「9과학자 총정리」 형태 (새 개념 X).
- 賢者는 실존 인물 모티프 아닌 가상 종합 가이드.
- ending은 9줄 (전 과학자 호명 + 졸업 메시지).

[보스 구현 확인]
시리즈 5~11의 보스(10장째) 구현 방식 참조. isBoss 플래그·완료 처리 방식을 
동일하게 적용. 시리즈 4 보스만 다르게 만들지 말 것. 보스 특수 처리가 없으면 
일반 사건과 동일하게 진행.

[핵심 원칙]
- SCIENTISTS_STORY[9]만 교체, scientists_case10만 추가 (case01~09 보존).
- togo_kenja.png 이미 존재 — 신규 PNG 생성 X.
- 사건 10 클리어 → 시리즈 4 전체 완료 표시 확인.

[톤]
- 따뜻하게 시험하고 이끄는 노현자
- 메시지: 「9명의 공통점 = 보이지 않는 것을 관찰·증거로 밝히는 마음」, 「강함보다 알려는 마음」
- 어린이가 「졸업」하는 성취감

[금지] 사건 1~9·SPEAKER_MAP 기존 9개·시리즈3·engine/scientists-learn.js·자산 PNG 미수정. 보스 step에 새 과학 개념 도입 금지.

[회귀] push 전 시리즈 1~3·5~12 + 사건 1~9 NPC(9명) + 영어학습 + 채팅 확인.

commit msg: "feat(series04/case10): add boss case (Sage's trial) + complete series 4"
```

---

**END OF SPEC — 시리즈 4 「偉人科学者ファイル」 최종 사건**

이 사건을 끝으로 시리즈 4 전체(10사건)가 완성됩니다. 보스전은 새 개념이 아닌 사건 1~9 종합 복습이며, 9명 과학자의 공통점(「보이지 않는 것을 관찰·증거로 밝히는 마음」)과 「강함보다 알려는 마음」이라는 메시지로 어린이에게 졸업의 성취감을 줍니다.
