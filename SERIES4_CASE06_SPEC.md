# SERIES 4 — CASE 6 CONTENT SPEC
## 「エンドウ豆の法則」 — メンデル·遺伝法則

**작성일**: 2026-06-24
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 사건**: 사건 1·2·3·4·5 완성 (만유인력·상대성·방사능·진화·세균학)

**핵심 (사건 4·5에서 확립된 패턴 그대로)**:
- ⭐ **§7-3 SCIENTISTS_SPEAKER_MAP 등록 단계** — 신규 NPC `mendel_pea`를 반드시 등록. 데이터 작성보다 먼저.
- ✅ NPC PNG 이미 준비됨 (`mendel_pea.png`, RGBA) — 신규 생성 불필요.

**범위**:
- ✅ 사건 6 본격 스토리 (intro + 6 steps + 결말)
- ✅ メンデル 인격·말투
- ✅ 학습 자료 6섹션 (우성·열성·분리·유전자·3:1)
- ✅ caseQuiz 5문제
- ✅ data/series4-scientists.js 사건 6 갱신 (SCIENTISTS_STORY[5])
- ✅ data/series4-scientists-learn.js에 scientists_case06 추가
- ✅ engine/detectives-B.js에 mendel_pea 등록
- ❌ 사건 7~10 (별도 명세서)

---

## 0. PRE-FLIGHT

- [ ] 사건 1~5 정상
- [ ] SCIENTISTS_STORY[5] (id=6)가 placeholder (comingSoon: true)
- [ ] SCIENTISTS_LEARN에 scientists_case01~05만 존재
- [ ] assets/characters/series04/mendel_pea.png 존재 (RGBA)
- [ ] git 깨끗

---

## 1. 사건 6 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 6 |
| 제목 | **エンドウ豆の法則 (えんどうまめの ほうそく)** |
| 부제 | 消えた 白い 花は どこへ? |
| 학습 테마 | 遺伝法則 / 優性·劣性 / 分離의 法則 / 遺伝子 / 3:1의 비 |
| 학습 깊이 | 중학 生物 + 比喩 중심 |
| NPC | メンデル (mendel_pea) |
| 동행 | ハル + リオ + ヒナタ + ペンタ |
| 배경 | bg_ch06_monastery (수도원 정원) |
| 트릭 | 「消えた 白い 花の 謎」 — 흰꽃×보라꽃 → 자식 전부 보라 → 손자에서 다시 3:1로 흰색 부활 |
| 플레이타임 | 12~15분 |

---

## 2. メンデル 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 수도복 + 안경 + 완두콩 화분 (자산 PNG mendel_pea.png 그대로) |
| 나이 | 40대 |
| 직업 | 수도원의 수사·정원사 (식물 연구) |
| 성격 | 차분하고 끈기 있음, 수천 그루를 세고 기록하는 꼼꼼함 |
| 1인칭 | 「私 (わたし)」 |
| 말투 | 「~のじゃ」「~なのじゃ」「数えてみると 分かるのじゃ」「記録が 大切じゃ」 |
| 좋아하는 것 | 완두콩 재배, 수 세기·기록, 규칙 찾기 |
| 모티프 | 그레고어 멘델 (완두콩 교배 실험, 유전법칙, 1865 발표) |
| 핵심 대사 | 「自然には 隠れた 法則が ある。 数えれば、 必ず 見えてくるのじゃ」 |
| **표시명** | **メンデル** |

**중요**: 「メンデル」은 성씨이므로 호칭으로 사용 가능. 단 실명 풀네임·생몰년 등 사실 정보는 학습 자료에서만 (「グレゴール·メンデル, 1822-1884」).

---

## 3. 미스터리 트릭 「消えた 白い 花の 謎」

### 3-1. 핵심 미스터리

メンデル의 수도원 정원. 그가 보여준 기록: **흰 꽃 완두 × 보라 꽃 완두를 교배했더니, 자식(子) 세대는 전부 보라색**. 흰색이 완전히 사라졌다! 그런데 그 보라색 자식끼리 다시 교배하니 **손자(孫) 세대에서 흰 꽃이 다시 나타남** — 그것도 보라:흰 = 약 3:1의 비율로.

흰색은 어디로 사라졌다가 어떻게 다시 나타난 걸까?

### 3-2. 단서 시퀀스

| Step | 단서 | 발견자 | 의미 |
|---|---|---|---|
| 1 | 부모 세대 확인 (흰꽃·보라꽃 순종) | リオ | 시작은 순수한 흰색 / 순수한 보라색 |
| 2 | 자식(子) 세대 전부 보라색 | ハル | 흰색이 안 보임 — 사라진 듯 |
| 3 | 손자(孫) 세대에 흰색 부활 | ヒナタ | 흰색이 다시 등장! 사라진 게 아니었음 |
| 4 | 손자 세대 수 세기 (보라:흰 ≈ 3:1) | ハル | 약 3:1의 일정한 비율 |
| 5 | メンデル 「숨은 인자」 노트 | ヒナタ | 각 형질에 「인자(요소)」가 2개씩 쌍으로 있음 |
| 6 | 결론: 우성·열성 + 분리 | 3인 협력 | 보라(우성)가 흰(열성)을 가리지만, 흰 인자는 숨어 전달됨 |

### 3-3. 진실 (メンデル 자백)

「お見事じゃ。 まさに 私が 8年 かけて 見つけた 法則 なのじゃ。」

- 꽃 색을 정하는 「인자(遺伝子)」는 한 그루에 **2개씩 쌍**으로 있음
- 보라 인자는 흰 인자보다 **강함 (優性)** — 둘이 만나면 보라색만 나타남
- 자식 세대는 보라+흰 인자를 하나씩 받음 → 겉은 보라지만 흰 인자를 **숨겨서 가지고 있음**
- 손자 세대에서 흰 인자끼리 만나면 → 다시 흰 꽃 (劣性 발현)
- 인자가 자손에게 하나씩 나뉘어 전달 = **分離의 法則** → 그래서 약 3:1
- 「白い 花は 消えたのでは ない。 隠れて、 また 現れたのじゃ」

### 3-4. 학습 포인트 연결

メンデル: 「目に 見える 形の 裏に、 見えない 法則が ある。 数えれば、 自然は 答えを 教えてくれる」

→ 학습 자료 모달 (우성·열성·분리·유전자·3:1).

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: 'エンドウ豆の法則',
  subtitle: '消えた 白い 花は どこへ?',
  bg: 'bg_ch06_monastery',
  lines: [
    { speaker: 'narrator',    text: 'パスト博士の 紹介で、 静かな 修道院の 庭を 訪ねた。' },
    { speaker: 'hinata',      text: 'こちらが メンデルさんの 庭 です。 エンドウ豆が ずらり…' },
    { speaker: 'rio',         text: 'うわぁ、 すごい 数の 鉢! 何千 個も ある!' },
    { speaker: 'haru',        text: '紫の 花、 白い 花… それぞれ 札に 記録が ついてる。' },
    { speaker: 'mendel_pea',  text: 'ようこそ。 私が メンデル じゃ。 ちょうど 不思議な 事が あってのう。' },
    { speaker: 'mendel_pea',  text: 'この 記録を 見て ほしい。 私を ずっと 悩ませて いる 謎なのじゃ。' },
    { speaker: 'narrator',    text: 'メンデルが 古い 観察ノートを 開いた。' },
    { speaker: 'mendel_pea',  text: '白い 花の 豆と、 紫の 花の 豆を かけ合わせた。 すると…' },
    { speaker: 'rio',         text: '子どもは… 全部 紫!? 白が 一つも ない!' },
    { speaker: 'haru',        text: '白い 花が 消えて しまった みたいだ…' },
    { speaker: 'mendel_pea',  text: 'そう。 だが、 もっと 不思議な ことが 起きたのじゃ。' },
    { speaker: 'mendel_pea',  text: 'その 紫の 子ども 同士を かけ合わせると — 孫の 代に、 白い 花が また 現れた!' },
    { speaker: 'hinata',      text: 'えっ、 消えた はずの 白が 戻ってきた…?' },
    { speaker: 'rio',         text: '魔法みたい! 白は どこに 隠れてたの?' },
    { speaker: 'mendel_pea',  text: 'ふむ。 自然には 隠れた 法則が ある。 数えれば、 必ず 見えてくるのじゃ。' },
    { speaker: 'mendel_pea',  text: '皆の 力で、 この 謎を 解いて くれるかのう?' },
    { speaker: 'penta',       text: 'ペンッ! 消えた 白い 花、 探すペン!' },
  ],
  cta: '🔍 調査を 始める',
},
```

### 4-2. steps

#### Step 1 — 부모 세대 확인

```javascript
{
  id: 'step1',
  title: '🌱 STEP 1: 親の 世代を 確認',
  bg: 'bg_ch06_monastery',
  question: 'まず、 最初の 親の 豆を 確認しよう。 何が わかる?',
  options: [
    {
      label: '純粋な 白い 花 と 純粋な 紫の 花 — 混じり気の ない 親',
      isCorrect: true,
      response: [
        { speaker: 'rio',        text: '親は きれいに 分かれてる! こっちは 真っ白、 こっちは 真っ紫!' },
        { speaker: 'haru',       text: '何代も 同じ 色 だった 純粋な 豆 だね。 混じってない。' },
        { speaker: 'hinata',     text: '出発点は 「純粋な 白」 と 「純粋な 紫」。 ここから 始まる…' },
        { speaker: 'mendel_pea', text: 'その通り。 純粋な 親から 始めるのが 大事 なのじゃ。' },
      ],
    },
    {
      label: '豆の 大きさを 測る',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '今は 大きさ より 「花の 色」 の 謎を 追おう。' },
      ],
    },
  ],
},
```

#### Step 2 — 자식 세대 전부 보라

```javascript
{
  id: 'step2',
  title: '🟣 STEP 2: 子の 世代を 見る',
  bg: 'bg_ch06_monastery',
  question: '白×紫 の 子ども(子世代)を 調べた。 何色?',
  options: [
    {
      label: '全部 紫 — 白が 一つも 出ない',
      isCorrect: true,
      response: [
        { speaker: 'haru',       text: '子どもは… 数えても 数えても、 全部 紫!' },
        { speaker: 'rio',        text: '白が ゼロ! ほんとに 消えちゃった の?' },
        { speaker: 'hinata',     text: '白い 花の 性質は どこへ いったんでしょう…?' },
        { speaker: 'mendel_pea', text: 'ふむ。 紫が 白を 「隠して」 いる のかも しれぬのう。' },
      ],
    },
    {
      label: '半分 紫、 半分 白',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'いや、 記録では 子世代は 全部 紫 だよ。' },
      ],
    },
  ],
},
```

#### Step 3 — 손자 세대에 흰색 부활

```javascript
{
  id: 'step3',
  title: '⚪ STEP 3: 孫の 世代を 見る',
  bg: 'bg_ch06_monastery',
  question: '紫の 子ども 同士を かけ合わせた 孫世代。 何が 起きた?',
  options: [
    {
      label: '白い 花が また 現れた — 消えて いなかった',
      isCorrect: true,
      response: [
        { speaker: 'hinata',     text: '見て! 孫の 代に、 白い 花が また 咲いて います!' },
        { speaker: 'rio',        text: '白が 復活した! やっぱり 消えてなかったんだ!' },
        { speaker: 'haru',       text: '紫の 子ども は、 白を 「隠して 持っていた」 という ことか…' },
        { speaker: 'mendel_pea', text: 'そう。 白は 消えたのでは ない。 隠れて いた のじゃ。' },
      ],
    },
    {
      label: '孫も 全部 紫の まま',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: 'いいえ、 孫の 代では 白い 花が 戻って きて います。' },
      ],
    },
  ],
},
```

#### Step 4 — 손자 세대 수 세기 (3:1)

```javascript
{
  id: 'step4',
  title: '🔢 STEP 4: 孫の 数を 数える',
  bg: 'bg_ch06_monastery',
  question: 'メンデルと 一緒に 孫世代の 花を 数えた。 紫と 白の 割合は?',
  options: [
    {
      label: '紫 : 白 = 約 3 : 1',
      isCorrect: true,
      response: [
        { speaker: 'haru',       text: '数えると… 紫が 約 3、 白が 約 1。 きれいに 3対1!' },
        { speaker: 'rio',        text: 'いつも 同じ 割合に なるの? すごい!' },
        { speaker: 'hinata',     text: '偶然 じゃ なくて、 何度 やっても 3:1… 法則が ある!' },
        { speaker: 'mendel_pea', text: 'その通り。 何千 個 数えても、 いつも 3:1 に 近づくのじゃ。' },
      ],
    },
    {
      label: '紫 : 白 = 1 : 1',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: 'もう一度 数えよう。 記録では 3対1 に 近い よ。' },
      ],
    },
    {
      label: '割合は バラバラ',
      isCorrect: false,
      response: [
        { speaker: 'mendel_pea', text: 'たくさん 数えると、 必ず 3:1 に 近づくのじゃ。 数が 鍵じゃ。' },
      ],
    },
  ],
},
```

#### Step 5 — メンデル의 「숨은 인자」 노트

```javascript
{
  id: 'step5',
  title: '📓 STEP 5: 「隠れた 因子」 の ノート',
  bg: 'bg_ch06_monastery',
  question: 'メンデルの 仮説ノートを 開いた。 何が 書いてある?',
  options: [
    {
      label: '花の 色を 決める 「因子」 が、 1つの 豆に 2個 ずつ ペアで ある',
      isCorrect: true,
      response: [
        { speaker: 'hinata',     text: '「色を 決める 因子は、 2個 ずつ ペアで ある」…!' },
        { speaker: 'haru',       text: '親から 1個 ずつ もらうから、 子は 2個 持つ — 紫と 白を 1個 ずつ!' },
        { speaker: 'rio',        text: 'だから 紫の 子も、 白の 因子を こっそり 持ってたんだ!' },
        { speaker: 'mendel_pea', text: 'その通りじゃ。 見えない 因子が、 親から 子へ 受け継がれるのじゃ。' },
      ],
    },
    {
      label: '因子は 1個 だけ',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '2個 ペアで ないと、 孫で 白が 戻る 説明が できないよ。' },
      ],
    },
  ],
},
```

#### Step 6 — 결론 + メンデル 자백

```javascript
{
  id: 'step6',
  title: '🧩 STEP 6: 推理を 組み立てる',
  bg: 'bg_ch06_monastery',
  question: '全ての 手がかりが 揃った。 メンデルに どう 伝える?',
  options: [
    {
      label: '「紫が 優性で 白を 隠すが、 白の 因子は 消えず 伝わり、 孫で また 出る — だから 3:1」',
      isCorrect: true,
      response: [
        { speaker: 'mendel_pea', text: 'お見事じゃ! まさに 私が 8年 かけて 見つけた 法則 なのじゃ。' },
        { speaker: 'mendel_pea', text: '色を 決める 因子は 2個 ペア。 紫の 因子は 強く (優性)、 白は 弱い (劣性)。' },
        { speaker: 'mendel_pea', text: '子は 紫と 白を 1個 ずつ 持つ。 紫が 強いから 見た目は 紫 — でも 白は 隠れて いる。' },
        { speaker: 'mendel_pea', text: '孫の 代で 白同士が 出会うと、 また 白い 花。 因子が 分かれて 伝わる — これが 「分離の 法則」 じゃ。' },
        { speaker: 'hinata',     text: '見える 形(紫)の 裏に、 見えない 因子(白)が 隠れていたんですね。' },
        { speaker: 'haru',       text: '3:1 は 偶然 じゃ なくて、 因子の 組み合わせの 結果 だった…' },
        { speaker: 'rio',        text: '白い 花は 消えてなかった! ずっと 隠れて 待ってたんだ!' },
        { speaker: 'mendel_pea', text: 'その通り。 数えれば、 自然の 隠れた 法則が 見えてくる。 さあ、 一緒に 学ぼうかのう。' },
      ],
    },
    {
      label: '「白は 魔法で 消えて、 魔法で 戻った」',
      isCorrect: false,
      response: [
        { speaker: 'mendel_pea', text: '魔法 では ない。 数を 数えれば、 ちゃんと 法則が あるのじゃ。' },
      ],
    },
    {
      label: '「紫と 白が 混ざって 薄紫に なった」',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '混ざってないよ。 孫は はっきり 紫か 白。 中間色は 出てない。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch06_monastery',
  lines: [
    { speaker: 'mendel_pea', text: '皆の おかげで、 私の 発見を きちんと 説明 できた。 礼を 言うぞ。' },
    { speaker: 'mendel_pea', text: '見える 形の 裏に、 見えない 法則が ある。 数えれば、 自然は 答えを 教えてくれるのじゃ。' },
    { speaker: 'rio',        text: '小さな 豆の 中に、 こんな 秘密が 隠れてたなんて!' },
    { speaker: 'haru',       text: '親から 子へ 伝わる 「因子」… 今で いう 遺伝子 だね。' },
    { speaker: 'hinata',     text: '私たちの 目の 色や 髪の 色も、 きっと 同じ 法則 ですね。' },
    { speaker: 'mendel_pea', text: 'その通り。 遺伝の 法則を、 もう 少し 学んで みようかのう。' },
    { speaker: 'penta',      text: 'ペンッ! 遺伝の 勉強、 ペン!' },
  ],
  cta: '📚 学習資料を 開く',
},
```

---

## 5. 학습 자료 6섹션

### 5-1. concept

```javascript
concept: {
  title: '遺伝の 法則',
  paragraphs: [
    '事件 6 の 消えた 白い 花 — その 正体は、 親から 子へ 受け継がれる 「遺伝子 (いでんし)」 の 組み合わせ でした。 メンデル は 8年間、 修道院の 庭で 何万 株もの エンドウ豆を 育てて 数え、 1865年に 「遺伝の 法則」 を 発表 しました。',
    '生物の 形質 (花の 色など) を 決める 因子 (遺伝子) は、 ふつう 2個 ずつ ペアで あります。 親から 1個 ずつ 受け継ぎます。 2個の 因子が 違う とき、 強く 現れる 方を 「優性 (顕性)」、 隠れる 方を 「劣性 (潜性)」 と 言います。',
    '紫×白 の 子が 全部 紫に なったのは、 紫が 優性 だから。 でも 白の 因子は 消えず、 子の 中に 隠れて います。 孫の 代で 白同士が 出会うと、 また 白い 花が 咲きます。 因子が ペアから 1個 ずつ 分かれて 伝わる — これが 「分離の 法則」 です。',
    'その 結果、 孫世代は 紫:白 = 約 3:1 に なります。 これは 偶然 ではなく、 因子の 組み合わせ (紫紫·紫白·白紫·白白 の 4通り) から 計算で 出る 数 なのです。 メンデル の 発見は、 後に 「遺伝子」 「DNA」 の 研究へと つながりました。',
  ],
  highlight: '形質は 2個 ペアの 遺伝子で 決まる。 優性が 劣性を 隠すが、 劣性も 消えず 伝わる → 孫で 約 3:1。',
},
```

### 5-2. diagrams (SVG 4개)

사건 1~5 SVG 패턴 그대로.

#### 도해 1: 3세대 교배 흐름 (500×320)
- 親: 보라(순종) × 흰(순종)
- 子: 전부 보라 (흰 인자 숨김 — 점선 흰 표시)
- 孫: 보라 3 : 흰 1
- 세대 사이 화살표
- 캡션: 「親 → 子(全部 紫) → 孫(3:1)」

#### 도해 2: 인자 쌍의 분리·조합 (퍼넷 사각형 간략화) (450×350)
- 子의 인자: 보라(B) + 흰(b)
- 2×2 격자: BB / Bb / bB / bb
- BB·Bb·bB = 보라(3), bb = 흰(1)
- 캡션: 「因子の 組み合わせ 4通り → 紫3 : 白1」

#### 도해 3: 優性·劣性 개념 (500×260)
- 보라 인자(강) + 흰 인자(약) → 보라색 발현
- 「강한 쪽이 보이고, 약한 쪽은 숨음」 시각화
- 캡션: 「優性が 見え、 劣性は 隠れる (でも 消えない)」

#### 도해 4: 메모리 — 우리 몸의 유전 (450×280)
- 부모 → 자녀로 형질 전달 (눈 색·귀 모양 등 친화적 예시)
- 「너의 형질도 부모에게서 하나씩 받은 것」
- 캡션: 「遺伝の 法則は、 私たちの 体にも」

### 5-3. formulas + unitsTable

```javascript
formulas: [
  {
    name: '分離의 法則',
    formula: 'ペアの 因子 → 子に 1個 ずつ 分かれて 伝わる',
    formulaSimple: '2個 → 1個씩 分離',
    explanation: '한 그루가 가진 2개의 인자(유전자)가, 자손에게 하나씩 나뉘어 전달됨. 그래서 숨었던 열성도 다시 나타날 수 있음.',
    note: '멘델 제1법칙. 분리의 법칙.',
  },
  {
    name: '優性·劣性 + 3:1',
    formula: '優性(紫) 3 : 劣性(白) 1',
    formulaSimple: '顕性 3 : 潜性 1',
    explanation: '子(Bb)끼리 교배 → 孫은 BB:Bb:bB:bb = 1:1:1:1. 겉모습은 보라(BB·Bb·bB) 3 : 흰(bb) 1.',
    note: '「優性=많다」가 아니라 「優性=강해서 우선 발현」. 비율 3:1은 조합 계산 결과.',
  },
],
unitsTable: {
  title: '遺伝 키워드 정리',
  rows: [
    ['용어', '의미', '예시·비고'],
    ['遺伝子 (いでんし)',   '형질을 정하는 因子',                 '꽃 색·눈 색을 결정'],
    ['優性 (顕性)',         '쌍에서 강하게 나타나는 형질',         '보라 꽃'],
    ['劣性 (潜性)',         '쌍에서 숨는 형질 (사라지지 않음)',    '흰 꽃'],
    ['分離의 法則',         '인자 쌍이 자손에 1개씩 나뉘어 전달',  '멘델 제1법칙'],
    ['3:1',                '孫세대 우성:열성 비율',               '보라 3 : 흰 1'],
    ['純系 (じゅんけい)',    '같은 형질만 계속 나오는 순종',        '순수한 흰꽃·보라꽃 親'],
  ],
},
```

### 5-4. flashcards (10장)

```javascript
flashcards: [
  { front: '遺伝 (いでん)',         back: '親의 형질이 子에게 전달되는 것. 멘델이 완두콩으로 법칙 발견.' },
  { front: '遺伝子 (いでんし)',     back: '형질을 정하는 因子. 보통 2개씩 쌍. 親에게서 1개씩 받음.' },
  { front: '優性 (顕性, ゆうせい)', back: '쌍에서 강하게 나타나는 형질. 보라 꽃처럼 겉으로 보임.' },
  { front: '劣性 (潜性, れっせい)', back: '쌍에서 숨는 형질. 흰 꽃처럼 안 보이지만 사라지지 않고 전달됨.' },
  { front: '分離의 法則',          back: '인자 쌍이 자손에게 1개씩 나뉘어 전달되는 법칙. 멘델 제1법칙.' },
  { front: '3:1 의 비',           back: '子(잡종)끼리 교배 시 孫세대의 우성:열성 비율. 조합 계산 결과.' },
  { front: '純系 (じゅんけい)',     back: '같은 형질만 계속 나오는 순종. 멘델 실험의 출발점(순수 흰·보라).' },
  { front: 'エンドウ豆',           back: '멘델이 실험에 쓴 완두콩. 형질이 뚜렷하고 재배·교배가 쉬워 적합.' },
  { front: 'メンデル',             back: '오스트리아 수도사(1822-1884). 8년간 완두콩 교배로 유전법칙 발견(1865).' },
  { front: 'DNA·染色体',          back: '훗날 밝혀진 유전자의 실체. 멘델의 「인자」가 DNA로 이어짐.' },
],
```

### 5-5. exercises (10문제)

```javascript
exercises: [
  {
    q: '事件 6 で 흰 꽃이 子세대에서 안 보이다가 孫세대에서 다시 나타난 이유는?',
    options: ['마법으로 돌아왔다', '흰 인자가 子에 숨어 전달되다 孫에서 발현', '새로 생겨났다', '보라가 흰색으로 변했다'],
    correct: 1,
    explanation: '事件 6 핵심. 흰(열성) 인자는 사라지지 않고 子에 숨었다가 孫에서 흰끼리 만나 발현.',
  },
  {
    q: '孫세대 보라:흰의 비율은?',
    options: ['1:1', '2:1', '3:1', '4:1'],
    correct: 2,
    explanation: '약 3:1. 인자 조합(BB·Bb·bB·bb)에서 보라 3 : 흰 1.',
  },
  {
    q: '쌍에서 강하게 나타나는 형질을 무엇이라 하는가?',
    options: ['劣性(潜性)', '優性(顕性)', '純系', '分離'],
    correct: 1,
    explanation: '優性(顕性). 보라 꽃처럼 겉으로 보이는 형질.',
  },
  {
    q: '유전법칙을 발견한 사람은?',
    options: ['ダーウィン', 'メンデル', 'パスツール', 'ニュートン'],
    correct: 1,
    explanation: '그레고어 멘델. 수도원에서 8년간 완두콩 교배 실험.',
  },
  {
    q: '인자 쌍이 자손에게 1개씩 나뉘어 전달되는 법칙은?',
    options: ['優性의 法則', '分離의 法則', '進化의 法則', '自然選択'],
    correct: 1,
    explanation: '分離의 法則(멘델 제1법칙). 그래서 숨은 열성도 다시 나타날 수 있음.',
  },
  {
    q: '멘델이 실험에 완두콩을 쓴 이유로 적절한 것은?',
    options: ['맛있어서', '형질이 뚜렷하고 교배가 쉬워서', '비싸서', '꽃이 예뻐서'],
    correct: 1,
    explanation: '완두콩은 형질 구분이 명확(보라/흰, 둥근/주름)하고 재배·교배가 쉬워 실험에 이상적.',
  },
  {
    q: '보라 꽃 子(Bb)가 흰 인자를 가지고 있는데도 보라색인 이유는?',
    options: ['흰 인자가 없어서', '보라가 優性이라 우선 발현', '흰색이 약해 사라져서', '햇빛 때문'],
    correct: 1,
    explanation: '보라가 優性. 보라+흰 인자를 가져도 강한 보라가 겉으로 나타남. 흰은 숨음.',
  },
  {
    q: '멘델이 「인자」라 부른 것의 현대 이름은?',
    options: ['세포', '遺伝子(DNA)', '단백질', '바이러스'],
    correct: 1,
    explanation: '멘델의 「인자」 = 오늘날의 遺伝子(DNA). 멘델 사후 그 실체가 밝혀짐.',
  },
  {
    q: '「優性」을 바르게 이해한 것은?',
    options: ['숫자가 많다', '강해서 우선 나타난다', '항상 좋은 형질이다', '더 빨리 자란다'],
    correct: 1,
    explanation: '優性=「강해서 우선 발현」. 「많다」나 「좋다」는 오해. 열성도 똑같이 전달됨.',
  },
  {
    q: '순수한 흰꽃끼리만 계속 교배하면 자손은?',
    options: ['전부 흰꽃', '전부 보라꽃', '3:1', '반반'],
    correct: 0,
    explanation: '純系(순종)는 같은 형질만 계속 나옴. 흰 인자(bb)만 있으면 자손도 모두 흰꽃.',
  },
],
```

### 5-6. tips (8포인트)

```javascript
tips: [
  { title: '①  消えた 形質은 「숨은 것」',     body: '흰 꽃은 사라진 게 아니라 子에 숨어 전달되다 孫에서 다시 발현. 열성은 소멸하지 않음.' },
  { title: '②  遺伝子는 2個 ペア',            body: '형질을 정하는 인자는 보통 쌍. 親에게서 1개씩 받아 자식은 2개를 가짐.' },
  { title: '③  優性 = 「강함」, 「많음」 아님',  body: '優性은 강해서 우선 나타나는 것. 숫자가 많거나 더 좋은 게 아님.' },
  { title: '④  分離의 法則',                  body: '쌍이 자손에게 1개씩 나뉘어 전달. 그래서 孫에서 열성이 다시 나타날 수 있음.' },
  { title: '⑤  3:1 은 계산의 결과',           body: 'Bb×Bb → BB·Bb·bB·bb. 보라 3 : 흰 1. 우연이 아닌 조합 확률.' },
  { title: '⑥  数えること의 힘',              body: '멘델은 수만 그루를 8년간 셌음. 큰 수를 세야 3:1 같은 법칙이 보임.' },
  { title: '⑦  엔도우 콩 = 좋은 실험 재료',    body: '형질이 뚜렷하고 교배가 쉬움. 좋은 실험은 좋은 재료 선택에서 시작.' },
  { title: '⑧  메모리 — 너의 형질도 유전',     body: '눈 색·귀 모양 등도 부모에게서 하나씩 받은 인자의 조합. 멘델 법칙은 우리 몸에도.' },
],
```

---

## 6. caseQuiz (5문제)

```javascript
caseQuiz: [
  {
    q: '事件 6 で 흰 꽃이 孫세대에서 다시 나타난 이유는?',
    options: ['새로 생겼다', '흰 인자가 숨어 전달되다 발현', '보라가 변했다', '마법'],
    correct: 1,
  },
  {
    q: '孫세대 보라:흰 비율은?',
    options: ['1:1', '2:1', '3:1', '1:3'],
    correct: 2,
  },
  {
    q: '강하게 나타나는 형질은?',
    options: ['劣性', '優性', '純系', '分離'],
    correct: 1,
  },
  {
    q: '유전법칙 발견자는?',
    options: ['ダーウィン', 'メンデル', 'パスツール', 'キュリー'],
    correct: 1,
  },
  {
    q: '事件 6 의 핵심 메시지는?',
    options: ['형질은 사라진다', '숨은 형질도 사라지지 않고 전달된다', '모든 자손은 같다', '색은 섞인다'],
    correct: 1,
  },
],
```

---

## 7. 데이터·엔진 갱신

### 7-1. data/series4-scientists.js — SCIENTISTS_STORY[5] (id=6)

```javascript
{
  id: 6, icon: '🌸',
  title: 'エンドウ豆の法則',
  subtitle: '消えた 白い 花は どこへ?',
  theme: '遺伝法則·優性劣性·分離의法則·遺伝子',
  bgm: 'mystery',
  illustration: SCIENTISTS_CASE_IMAGES[6],
  charKey: 'mendel_pea',
  sceneKey: 'bg_ch06_monastery',
  comingSoon: false,                       // true → false
  learnRef: 'scientists_case06',           // 신규
  intro: { /* §4-1 */ },
  steps: [ /* §4-2 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6 */ ],
  note: {
    title: '第6事件 エンドウ豆の 法則',
    desc: '消えた 白い 花の 謎 — 優性 뒤에 숨은 劣性 인자가 사라지지 않고 孫세대에서 3:1로 부활. 8년간 수만 그루를 세어 발견한 멘델의 遺伝法則을 배운 第六歩.'
  },
},
```

### 7-2. data/series4-scientists-learn.js — scientists_case06 추가 (case01~05 보존)

```javascript
const SCIENTISTS_LEARN = {
  scientists_case01: { /* 보존 */ },
  scientists_case02: { /* 보존 */ },
  scientists_case03: { /* 보존 */ },
  scientists_case04: { /* 보존 */ },
  scientists_case05: { /* 보존 */ },
  scientists_case06: {  // 신규
    title: '遺伝の 法則',
    subtitle: '事件 6 で 学んだ こと',
    examScope: '중학 生物 + 比喩 중심',
    concept: { /* §5-1 */ },
    diagrams: [ /* §5-2 SVG 4개 */ ],
    formulas: [ /* §5-3 */ ],
    unitsTable: { /* §5-3 */ },
    flashcards: [ /* §5-4 */ ],
    exercises: [ /* §5-5 */ ],
    tips: [ /* §5-6 */ ],
  },
  // 사건 7~10 은 향후 별도 명세서.
};
```

### 7-3. ⭐ engine/detectives-B.js — SCIENTISTS_SPEAKER_MAP 등록 (먼저!)

```javascript
const SCIENTISTS_SPEAKER_MAP = {
  // 기존 (보존):
  ringo_hakase:   { cls: 'sensei', name: '林檎博士', charKey: 'ringo_hakase', pos: 'center' },
  shiraga_ein:    { cls: 'sensei', name: 'アイン教授', charKey: 'shiraga_ein', pos: 'center' },
  hikari_curie:   { cls: 'sensei', name: 'キューリィ夫人', charKey: 'hikari_curie', pos: 'center' },
  darwin_voyager: { cls: 'sensei', name: 'ダーリン教授', charKey: 'darwin_voyager', pos: 'center' },
  pasteur_micro:  { cls: 'sensei', name: 'パスト博士', charKey: 'pasteur_micro', pos: 'center' },
  // 신규 추가:
  mendel_pea:     { cls: 'sensei', name: 'メンデル', charKey: 'mendel_pea', pos: 'center' },
};
```

등록 후 콘솔 검증:
```javascript
SCIENTISTS_SPEAKER_MAP.mendel_pea          // 객체
SCIENTISTS_SPEAKER_MAP.mendel_pea.name     // 'メンデル'
```

### 7-4. 그 외 — 변경 없음

---

## 8. 검증 체크리스트

### 8-1. 콘솔 검증

```javascript
SCIENTISTS_STORY[5].id                                    // 6
SCIENTISTS_STORY[5].title                                 // "エンドウ豆の法則"
SCIENTISTS_STORY[5].comingSoon                            // false
SCIENTISTS_STORY[5].learnRef                              // "scientists_case06"
SCIENTISTS_STORY[5].charKey                               // "mendel_pea"
SCIENTISTS_STORY[5].intro.lines.length                    // 17
SCIENTISTS_STORY[5].steps.length                          // 6
SCIENTISTS_STORY[5].steps[5].options[0].response.length   // 8
SCIENTISTS_STORY[5].ending.lines.length                   // 7
SCIENTISTS_STORY[5].caseQuiz.length                       // 5

SCIENTISTS_LEARN.scientists_case06                        // 객체
SCIENTISTS_LEARN.scientists_case06.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case06.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case06.diagrams.length        // 4

// ⭐ SPEAKER_MAP
SCIENTISTS_SPEAKER_MAP.mendel_pea                         // 객체
SCIENTISTS_SPEAKER_MAP.mendel_pea.name                    // 'メンデル'

// 회귀
SCIENTISTS_STORY[0].comingSoon  // false
SCIENTISTS_STORY[4].comingSoon  // false (case 5)
SCIENTISTS_STORY[6].comingSoon  // true (case 7 placeholder)
SCIENTISTS_STORY[9].comingSoon  // true
SCIENTISTS_SPEAKER_MAP.pasteur_micro  // 보존
SCIENTISTS_SPEAKER_MAP.darwin_voyager // 보존
```

### 8-2. 시각 검증

- [ ] 사건 6 카드 잠금 풀림 + 클릭 가능
- [ ] **メンデル 등장 시 「メンデル」 이름 + mendel_pea.png 초상화** (「ナレーター」 아님 ⭐)
- [ ] STEP 1~6 정상 + step6 결론 8줄
- [ ] 학습 모달 6탭 + SVG 4개 (3세대·퍼넷·우성열성·우리몸)
- [ ] caseQuiz 5문제 + 별점
- [ ] 사건 6 클리어 마크 (scientistsCleared[5] = true)
- [ ] メンデル 외곽 박스 없음

### 8-3. 회귀 테스트

- [ ] 시리즈 1~3, 5~12 정상
- [ ] 시리즈 4 사건 1~5 정상 (NPC 이름·초상화 보존)
- [ ] 시리즈 4 사건 7~10 placeholder 그대로
- [ ] 영어학습·채팅 정상

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| SCIENTISTS_STORY[0]~[4] 수정 | 사건 1~5 완성 |
| SCIENTISTS_STORY[6]~[9] 수정 | 사건 7~10 별도 명세서 |
| SCIENTISTS_LEARN.scientists_case01~05 수정 | 보존 |
| SPEAKER_MAP 기존 5개 NPC 수정 | 사건 1~5 동작 보존 |
| engine/scientists-learn.js 수정 | 정착됨 |
| data/series3-science.js 수정 | 시리즈 3 사용 중 |
| 신규 PNG 생성 | mendel_pea.png 이미 존재 (RGBA) |
| 실명 풀네임을 メンデル 대사로 강제 | 가상 캐릭터 정체성 (성씨 メンデル만 사용) |

---

## 10. 작업 순서

```
Step 1: 사건 5 데이터 구조 + SCIENTISTS_SPEAKER_MAP 정독 (참조)
Step 2: ⭐ engine/detectives-B.js에 mendel_pea 등록 (먼저!) + 콘솔 검증
Step 3: data/series4-scientists.js의 SCIENTISTS_STORY[5] 교체 + 콘솔 검증
Step 4: data/series4-scientists-learn.js에 scientists_case06 추가 (case01~05 보존) + 콘솔 검증
Step 5: 브라우저 시각 검증 (§8-2) — 특히 メンデル 이름·초상화
Step 6: 회귀 테스트 (§8-3)
Step 7: git commit + push
  - commit msg: "feat(series04/case06): add Mendel/genetics content + register mendel_pea in speaker map"
Step 8: 완료 보고
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE06_SPEC.md를 정독하고, 시리즈 4 사건 6 「エンドウ豆の法則」 
본격 콘텐츠를 작성해줘. 사건 5와 동일 패턴.

[⭐ 가장 중요 — 사건 2·3 버그 재발 방지]
engine/detectives-B.js의 SCIENTISTS_SPEAKER_MAP에 mendel_pea 등록을 
가장 먼저 진행 (Step 2). 기존 5개 NPC와 정확히 동일한 형식으로:
  mendel_pea: { cls: 'sensei', name: 'メンデル', charKey: 'mendel_pea', pos: 'center' }
이 등록이 빠지면 사건 6의 모든 メンデル 대사가 「ナレーター」로 fallback됨.
등록 후 콘솔 검증: SCIENTISTS_SPEAKER_MAP.mendel_pea 가 객체인지 확인.

[핵심 원칙]
- 사건 5 (SCIENTISTS_STORY[4], scientists_case05) 패턴 정확히 mirror.
- SCIENTISTS_STORY[5] entry만 placeholder에서 풀콘텐츠로 교체.
- SCIENTISTS_LEARN에 scientists_case06 키만 추가, case01~05 보존.
- mendel_pea.png는 이미 존재 (RGBA) — 신규 PNG 생성 X.

[유전 주제의 톤]
- 「優性」은 「강해서 우선 발현」이지 「많다·좋다」가 아님 (오해 방지)
- 열성 형질도 사라지지 않고 전달됨 (「消えた 白い 花」는 숨었던 것)
- 3:1은 우연이 아닌 조합 계산 결과
- 수를 세는 것의 중요성 (멘델 8년 노력)
- 우리 몸의 유전(눈 색 등)과 연결, 친화적

[작업 순서]
§10의 8단계 그대로. SPEAKER_MAP 등록(Step 2)을 데이터 작성보다 먼저.
각 step 후 §8-1 콘솔 검증.

[금지 사항]
- 사건 1~5 (SCIENTISTS_STORY[0~4], scientists_case01~05) 수정 X
- SPEAKER_MAP 기존 5개 NPC 수정 X
- 사건 7~10 placeholder 그대로
- 시리즈 3 untouched
- engine/scientists-learn.js·자산 PNG 미수정

[회귀 테스트]
push 전 시리즈 1~3, 5~12 + 사건 1~5 (NPC 이름·초상화 정상) + 영어학습 + 채팅 확인.

commit msg: "feat(series04/case06): add Mendel/genetics content + register mendel_pea in speaker map"
```

---

**END OF SPEC**

사건 4·5와 동일 구조. §7-3 SPEAKER_MAP 등록(mendel_pea)을 데이터 작성보다 먼저 수행하여 「ナレーター」 fallback 예방. NPC PNG 이미 존재. 유전 주제는 「優性=강함(≠많음/좋음)」, 「열성도 소멸하지 않음」, 「3:1은 조합 결과」를 어린이 친화적으로 전달.
