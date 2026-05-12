# SERIES 4 — CASE 3 CONTENT SPEC
## 「光る石の秘密」 — キューリィ夫人·放射能

**작성일**: 2026-05-12
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 명세**: `SERIES4_CASE02_SPEC.md` (사건 2, commit `19910ae`)
**목적**: 시리즈 4 사건 3의 본격 콘텐츠를 데이터 파일에 채워 넣는다.

**범위**:
- ✅ 사건 3 본격 스토리 (intro + steps + 미스터리 트릭 + 결말)
- ✅ キューリィ夫人 인격·말투 정립
- ✅ 학습 자료 6섹션 (방사능·원자·반감기·안전 메시지)
- ✅ 챕터 클리어 퀴즈 5문제
- ✅ `data/series4-scientists.js` 사건 3 부분 갱신
- ✅ `data/series4-scientists-learn.js`에 `scientists_case03` 키 추가
- ❌ 엔진 코드 신규 작성 불필요
- ❌ 사건 4~10 콘텐츠 (각각 별도 명세서)

---

## 0. PRE-FLIGHT CHECKLIST

- [ ] 사건 1·2 commit `11a5f6a` + `02dea28` + `19910ae` 정상 동작 확인
- [ ] `SCIENTISTS_STORY[2]`가 placeholder (`comingSoon: true`) 상태
- [ ] `SCIENTISTS_LEARN`에 `scientists_case01`, `scientists_case02`만 존재
- [ ] git 상태 깨끗
- [ ] 신규 브랜치 권장: `feat/series04-case03-curie`

---

## 1. 사건 3 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 3 |
| 사건 제목 | **光る石の秘密 (ひかるいしのひみつ)** |
| 부제 | 暗闇に 浮かぶ 不思議な 光 |
| 학습 테마 | 放射能 / 原子核 / ラジウム·ポロニウム / 半減期 / 放射線の 種類 |
| 학습 깊이 | 중학 + 比喩 중심 (정성적 이해, 안전 메시지 포함) |
| 등장 NPC | キューリィ夫人 (`hikari_curie`) |
| 동행자 | ハル + リオ + ヒナタ + ペンタ |
| 메인 배경 | `bg_ch03_radium` (실험실, 어두운 방) |
| 추리 트릭 | 「光る箱の正体」 — 어두운 방에서 스스로 빛나는 광석 |
| 예상 플레이타임 | 12~15분 |

---

## 2. キューリィ夫人 캐릭터 인격

| 항목 | 설정 |
|---|---|
| 외모 | 어두운 머리·실험복, 진중한 표정 (자산 PNG 그대로) |
| 나이 | 40대 |
| 직업 | 화학자·물리학자 / 광석 연구자 |
| 거주 | 어두운 지하 실험실 |
| 성격 | 신중하고 끈기 있는 실험가, 진리 추구에 헌신적 |
| 1인칭 | 「わたくし」 |
| 말투 | 「~ですわ」「~ですの」「不思議でしょう?」「実験は 美しい」 |
| 좋아하는 것 | 광석 분리, 분광 분석, 어두운 실험실 |
| 모티프 | 마리 퀴리 (라듐·폴로늄 발견, 노벨상 2회 수상) — 가상 캐릭터 |
| 핵심 대사 (예) | 「この 光は… 自然そのものから 出ているのですわ」 |

**중요**: 실명 「マリー·キュリー」는 사건 진행 중 사용하지 않음. 학습 자료에서는 「マリー·キュリー (1867-1934)」로 사실 정보 별도 제공.

**안전 메시지 원칙**: 방사능은 어린이가 두려워할 수 있는 주제. 「위험한 것」으로만 다루지 않고, **자연에도 존재하는 현상 + 의료·발전 등 유용한 활용 + 다만 강한 방사선은 위험하니 안전 규제 중요** 균형 잡힌 시각 유지.

---

## 3. 미스터리 트릭 「光る箱の正体」

### 3-1. 핵심 미스터리

キューリィ夫人의 어두운 지하 실험실. 한 구석의 작은 나무 상자가 **24시간 부드러운 연두색 빛**으로 빛나고 있음. 전기가 연결되지 않은 상자에서 빛이 나는 이유 추리.

「この 光は 何日も 何ヶ月も 続いているのですわ。不思議でしょう?」

### 3-2. 단서 시퀀스

| Step | 단서 | 발견자 | 의미 |
|---|---|---|---|
| 1 | 빛은 24시간 계속됨, 전기 연결 없음 | リオ | 전기 발광 아님 |
| 2 | 상자 내부 — 작은 광석 (회색 결정) | ハル | 빛의 발원지 |
| 3 | 광석 주변의 사진 필름이 변색됨 | ヒナタ | 빛에서 미지의 작용 (필름을 까맣게 만드는 무언가) |
| 4 | 실험 노트 「ピッチブレンドからの 抽出」 | ハル | 광석 출처 — 우라늄 광석에서 분리 |
| 5 | 광석 무게 측정 — 1g 미만이지만 강한 발광 | ヒナタ | 극소량으로도 강한 에너지 방출 |
| 6 | 결론: 라듐의 자연 발광 = 방사능 | 3인 협력 | 원자 핵의 자연 붕괴 |

### 3-3. 진실 (キューリィ夫人 자백)

「皆さん、見事ですわ。これは わたくしが 何年も かけて ピッチブレンド (우라늄 광석) から 抽出した 新しい 元素 — ラジウム なのです。」

- 라듐은 **방사능 (ほうしゃのう)**을 가진 원소 — 원자핵이 스스로 붕괴하면서 에너지를 방출
- 이 에너지가 빛으로 나타나고, 또 보이지 않는 방사선(α선·β선·γ선)도 함께 방출
- 사진 필름이 변색된 것은 방사선이 필름의 화학물질을 변화시킨 것
- 「自然そのものが 持っている 力ですわ。でも 強すぎると 危険ですから、慎重に 扱わなければなりません」

### 3-4. 학습 포인트 연결

夫人: 「これが 放射能の 世界ですわ。原子は 私たちが 思っていた より、ずっと 不思議で 力強い 存在 だったのです。」

→ 학습 자료 모달로 자연스럽게 유도. 안전 메시지도 함께.

---

## 4. 스토리 본문

### 4-1. intro

```javascript
intro: {
  title: '光る石の秘密',
  subtitle: '暗闇に 浮かぶ 不思議な 光',
  bg: 'bg_ch03_radium',
  lines: [
    { speaker: 'narrator',     text: 'アイン教授の 紹介で、化学者の 研究所を 訪ねた。' },
    { speaker: 'hinata',       text: 'こちらが キューリィ夫人の 実験室です。地下に あるそうです。' },
    { speaker: 'rio',          text: 'うわぁ、暗い〜!ちょっと ドキドキする!' },
    { speaker: 'haru',         text: '光が ほとんど ない… 何の 実験を しているんだろう。' },
    { speaker: 'hikari_curie', text: 'ようこそ、若き 探偵さんたち。わたくしが キューリィですわ。' },
    { speaker: 'hikari_curie', text: '暗い 部屋で 驚かせて しまいましたわね。実は、ある 物を 見て いただきたいの。' },
    { speaker: 'narrator',     text: '夫人が 部屋の 隅の 小さな 木箱を 指さした。' },
    { speaker: 'rio',          text: 'えっ!? 箱が… 光ってる!?' },
    { speaker: 'haru',         text: '本当だ… 緑色っぽい、淡い 光…' },
    { speaker: 'hinata',       text: '電気は… 繋がっていません。ろうそくも、灯油も ない。' },
    { speaker: 'hikari_curie', text: 'そうなのですわ。この 光は 何日も 何ヶ月も 続いて おります。' },
    { speaker: 'hikari_curie', text: 'わたくしも、その 仕組みを 完全には 理解 できて いませんの。' },
    { speaker: 'rio',          text: '魔法…?' },
    { speaker: 'hikari_curie', text: 'ふふ、自然の 中には 魔法のように 不思議な 現象が ありますの。' },
    { speaker: 'hikari_curie', text: '皆さんの 力で、この 謎を 解き明かして いただけますか?' },
    { speaker: 'haru',         text: '挑戦します!' },
    { speaker: 'penta',        text: 'ペンッ!光の 謎、ペン!' },
  ],
  cta: '🔍 調査を 始める',
},
```

### 4-2. steps

#### Step 1 — 빛의 지속성 확인

```javascript
{
  id: 'step1',
  title: '💡 STEP 1: 光は 電気の せい?',
  bg: 'bg_ch03_radium',
  question: 'まず、光の 性質を 調べよう。何を 確認する?',
  options: [
    {
      label: '電気·火が ないか、光が いつから 続いているか 確認',
      isCorrect: true,
      response: [
        { speaker: 'rio',          text: '配線も ろうそくも ない!' },
        { speaker: 'haru',         text: '夫人、いつから 光って いますか?' },
        { speaker: 'hikari_curie', text: 'もう 半年以上 続いて いるのですわ。一度も 消えた ことが ありません。' },
        { speaker: 'hinata',       text: '電気でも 火でも ない… 不思議です。' },
      ],
    },
    {
      label: '光の 色だけ 確認',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '色 だけでは 原因が わからないよ。もっと 全体を 調べよう。' },
      ],
    },
    {
      label: '部屋の 温度を 測る',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '温度は 光と 直接 関係 ないかな。先に 光の 出所を 探そう。' },
      ],
    },
  ],
},
```

#### Step 2 — 상자 내부 발견

```javascript
{
  id: 'step2',
  title: '📦 STEP 2: 木箱の 中を 見る',
  bg: 'bg_ch03_radium',
  question: '木箱を 慎重に 開けて 中を 見る。何が ある?',
  options: [
    {
      label: '小さな 灰色の 結晶 (光石) が 入っている',
      isCorrect: true,
      response: [
        { speaker: 'rio',    text: 'うわっ、小さな 石!これが 光って るの!?' },
        { speaker: 'haru',   text: '灰色っぽい 結晶… 1グラムくらい?でも 強く 光ってる。' },
        { speaker: 'hinata', text: '石 そのものが 発光している…?こんな 鉱物 知らない。' },
      ],
    },
    {
      label: '空の 箱',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '何も なければ 光らないはず。 もっと よく 見ましょう。' },
      ],
    },
  ],
},
```

#### Step 3 — 변색된 사진 필름 발견

```javascript
{
  id: 'step3',
  title: '🎞️ STEP 3: 箱の 周りを 観察',
  bg: 'bg_ch03_radium',
  question: 'ヒナタが 箱の 周りを 詳しく 調べる。何に 気づく?',
  options: [
    {
      label: '近くの 写真 フィルムが 黒く 変色して いる',
      isCorrect: true,
      response: [
        { speaker: 'hinata',       text: 'あれ… この 写真 フィルム、黒く 変色 しています。' },
        { speaker: 'haru',         text: 'フィルムを 変色させる 何かが、光石から 出ている?' },
        { speaker: 'rio',          text: '光 だけじゃ なくて、見えない 何かも 出てるってこと?' },
        { speaker: 'hikari_curie', text: 'ふふ、よく 気づきました わ。それが ヒントですの。' },
      ],
    },
    {
      label: '周りの 温度を 測る',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '温度は 変わって いないみたい。 もっと 違うものを 探そう。' },
      ],
    },
  ],
},
```

#### Step 4 — 실험 노트

```javascript
{
  id: 'step4',
  title: '📓 STEP 4: 夫人の 実験ノート',
  bg: 'bg_ch03_radium',
  question: '実験台の ノートを 開いた。何が 書いてある?',
  options: [
    {
      label: '「ピッチブレンドからの 抽出 — 新元素 発見?」',
      isCorrect: true,
      response: [
        { speaker: 'haru',         text: 'ピッチブレンド… ウラン鉱石の 名前だ。そこから 新しい 元素を 取り出した?' },
        { speaker: 'hinata',       text: '「新元素 発見?」と 書かれています。夫人、これは…?' },
        { speaker: 'hikari_curie', text: 'ええ、わたくしが 数年 かけて、ピッチブレンドから 微量の 新元素を 分離したのですわ。' },
        { speaker: 'rio',          text: '新元素!?すごい!でも、それが この 光と どう 関係?' },
      ],
    },
    {
      label: 'ノートを 閉じて おく',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '夫人の 研究 ノートに ヒントが あります。 読みましょう。' },
      ],
    },
  ],
},
```

#### Step 5 — 광석 무게 측정

```javascript
{
  id: 'step5',
  title: '⚖️ STEP 5: 光石の 重さを 測る',
  bg: 'bg_ch03_radium',
  question: 'リオが 光石の 重さを 計った。どれくらい?',
  options: [
    {
      label: '0.5 グラム以下 — 1グラムにも 満たない',
      isCorrect: true,
      response: [
        { speaker: 'rio',    text: 'えっ、こんなに 軽いの!?でも 半年以上 光ってるよ!?' },
        { speaker: 'haru',   text: '極めて 微量で、極めて 強い エネルギー を 出し続けて いる…' },
        { speaker: 'hinata', text: 'これは… 何か 原子レベルで 起きている 現象 ですね。' },
      ],
    },
    {
      label: '重くて 測れない',
      isCorrect: false,
      response: [
        { speaker: 'haru', text: '小さな 結晶 だから、感度の 高い 天秤を 使おう。' },
      ],
    },
  ],
},
```

#### Step 6 — 결론 + キューリィ夫人 자백

```javascript
{
  id: 'step6',
  title: '🧩 STEP 6: 推理を 組み立てる',
  bg: 'bg_ch03_radium',
  question: '全ての 手がかりが 揃った。夫人に どう 伝える?',
  options: [
    {
      label: '「光石は 新元素で、原子から 自然に 光と 放射線が 出ている」',
      isCorrect: true,
      response: [
        { speaker: 'hikari_curie', text: 'まあ、見事 ですわ!まさに 正解 ですの。' },
        { speaker: 'hikari_curie', text: 'これは わたくしが 発見した 新元素 — ラジウム ですわ。' },
        { speaker: 'hikari_curie', text: 'ラジウムの 原子核が ゆっくりと 崩壊し、光や 目に 見えない 放射線を 出すのです。これを 「放射能」 と 言いますの。' },
        { speaker: 'haru',         text: 'だから フィルムが 変色 したり、暗闇でも 光って 見える…' },
        { speaker: 'hinata',       text: '原子は 私たちが 思っていた より、ずっと 不思議な 存在 だったんですね。' },
        { speaker: 'rio',          text: '原子の 中で 何かが 起きてる!?' },
        { speaker: 'hikari_curie', text: 'そうですわ。ただ、放射線は 強すぎると 人体にも 害が ありますの。だから 慎重に 扱う ことが 大切です。' },
        { speaker: 'hikari_curie', text: '医療や 発電など、上手に 使えば 人類の 役に 立ちますわ。皆さん、一緒に 学びましょう。' },
      ],
    },
    {
      label: '「光石は 蓄光 素材」',
      isCorrect: false,
      response: [
        { speaker: 'haru',         text: '蓄光は 光を 当てた 後しか 光らない けど、これは 半年以上 暗闇でも 光ってる。' },
        { speaker: 'hikari_curie', text: 'よく 違いを 見抜きましたわ。' },
      ],
    },
    {
      label: '「中に 小さな 電池が ある」',
      isCorrect: false,
      response: [
        { speaker: 'hinata', text: '0.5g 以下の 結晶 です。電池は 入りません。' },
      ],
    },
  ],
},
```

### 4-3. ending

```javascript
ending: {
  bg: 'bg_ch03_radium',
  lines: [
    { speaker: 'hikari_curie', text: '皆さんの おかげで、わたくしの 発見が 説明 できましたわ。' },
    { speaker: 'hikari_curie', text: '放射能の 世界は 不思議で、力強くて、そして 慎重に 扱うべき もの。' },
    { speaker: 'rio',          text: '原子の 中で、こんな ことが 起きて たんだね!' },
    { speaker: 'haru',         text: '見えない 力 — でも 確かに 存在する。' },
    { speaker: 'hinata',       text: '医療の レントゲンも、これと 同じ 原理 ですか?' },
    { speaker: 'hikari_curie', text: 'ええ、同じ 仲間 ですわ。原子の 世界を、これから 一緒に 学びましょう。' },
    { speaker: 'penta',        text: 'ペンッ!原子の 勉強、ペン!' },
  ],
  cta: '📚 学習資料を 開く',
},
```

---

## 5. 학습 자료 6섹션

### 5-1. concept

```javascript
concept: {
  title: '放射能と 原子の 世界',
  paragraphs: [
    '事件 3 の 光石 — ラジウム は、原子核が 自然に 崩壊しながら エネルギーを 放出 する 元素です。 この 「放射能 (ほうしゃのう)」 という 現象は、マリー·キュリー 夫妻が 1898年 に 発見しました。',
    'すべての 物は 原子 から できています。 原子の 中心には 「原子核 (げんしかく)」 があり、その 周りを 電子が 回って います。 原子核が 不安定だと、自然に 崩壊して 別の 元素に 変わり、その 過程で 放射線を 出します。',
    '放射線には α 線·β 線·γ 線 の 3種類が あります。 また、放射性 物質は 時間と ともに 半分に なる 周期 — 半減期 (はんげんき) — を 持っています。',
    '放射線は 強すぎると 人体に 害が ありますが、医療 (レントゲン·がん 治療)·発電 (原子力)·考古学 (年代測定) など、上手に 使えば 大いに 役立ちます。 安全規制を 守る ことが 大切です。',
  ],
  highlight: '原子は 不変では なく、自然に 変化して エネルギーを 放出 する ことが ある。 正しく 知って、慎重に 使う。',
},
```

### 5-2. diagrams (SVG 4개)

#### 도해 1: 원자 구조 (양성자·중성자·전자)

```
[SVG 설명]
- 중앙: 원자핵 (빨강 양성자 + 회색 중성자 클러스터)
- 주변: 전자 궤도 2개 (점선 원), 전자 (파랑 점) 회전
- 라벨: 「原子核 (げんしかく)」, 「電子 (でんし)」, 「陽子 (ようし)」, 「中性子 (ちゅうせいし)」
- 캡션: 「すべての 物は 原子で できている」
크기: 400 × 320, viewBox 적절
색상: 양성자 빨강(#e74c3c), 중성자 회색(#7f8c8d), 전자 파랑(#3498db)
```

#### 도해 2: 방사선의 3종류 (α, β, γ)

```
[SVG 설명]
- 좌측: 방사성 원자핵 (빨강 원)
- 우측 화살표 3개:
  - α선 (큰 입자, 종이 한 장에 막힘) — 라벨: 「紙 で 止まる」
  - β선 (작은 입자, 알루미늄에 막힘) — 라벨: 「アルミニウム で 止まる」
  - γ선 (파동, 납에 약화) — 라벨: 「鉛 で 弱まる」
- 각 선의 통과 능력 시각화 (장벽 그림)
- 캡션: 「放射線には 種類が あり、止め方も 違う」
크기: 500 × 300
```

#### 도해 3: 반감기 그래프

```
[SVG 설명]
- x축: 시간 (0, T, 2T, 3T, 4T)
- y축: 잔존 비율 (100%, 50%, 25%, 12.5%, 6.25%)
- 지수 감소 곡선
- 점선 라인 마다 라벨 (50%, 25%, 12.5%)
- 캡션: 「放射性物質は 一定の 期間 (半減期 T) で 半分に 減る」
- 예시: 「ラジウム の 半減期 ≈ 1,600 年」
크기: 450 × 320
```

#### 도해 4: 자연 방사선과 인공 방사선

```
[SVG 설명]
- 좌측 「自然 放射線」 (3가지 일러스트):
  - 우주선 (별·태양)
  - 大地 (땅·돌)
  - 食品 (바나나·미네랄)
- 우측 「人工 放射線」 (3가지 일러스트):
  - レントゲン (병원)
  - 原子力 発電
  - CT 検査
- 캡션: 「私たちの 周りに 常に 自然 放射線が ある。 量を 正しく 知る ことが 大切」
크기: 500 × 320
```

### 5-3. formulas + unitsTable

```javascript
formulas: [
  {
    name: '半減期の 式',
    formula: 'N(t) = N₀ × (1/2)^(t/T)',
    formulaSimple: 'N = N₀ × (1/2)^(t/T)',
    explanation: '時間 t が 経った 後の 放射性 物質の 残量 N。 N₀ は 最初の 量、 T は 半減期。',
    note: '中学では 「半減期 ごとに 半分に なる」 という 概念を 覚えれば 十分。',
  },
  {
    name: '放射能の 単位',
    formula: '1 Bq (ベクレル) = 1 回の 崩壊 / 秒',
    formulaSimple: '1 Bq = 1 崩壊/秒',
    explanation: '放射能の 強さを 表す 単位。 ベクレル は 発見者の 名前から 由来。',
    note: '人体への 影響を 表す 単位は シーベルト (Sv)。 別の 概念なので 注意。',
  },
],
unitsTable: {
  title: '単位の まとめ',
  rows: [
    ['量',        '記号', '単位',        '意味'],
    ['放射能',     'A',   'Bq (ベクレル)', '1秒あたりの 崩壊数'],
    ['吸収線量',   'D',   'Gy (グレイ)',   '物質が 吸収した エネルギー'],
    ['等価線量',   'H',   'Sv (シーベルト)', '人体への 影響'],
    ['半減期',     'T',   '時間 (秒·年)',  '放射性物質が 半分に なる 時間'],
    ['原子番号',   'Z',   '個',           '原子核の 陽子の 数'],
  ],
},
```

### 5-4. flashcards (10장)

```javascript
flashcards: [
  { front: '放射能 (ほうしゃのう)',     back: '原子核が 自然に 崩壊しながら 放射線を 出す 性質。 マリー·キュリー が 命名。' },
  { front: '放射線 (ほうしゃせん)',     back: '放射性物質から 出る 高エネルギーの 粒子や 電磁波。 α·β·γ 線が ある。' },
  { front: '原子核 (げんしかく)',       back: '原子の 中心。 陽子と 中性子から なる。 不安定だと 崩壊する。' },
  { front: '半減期 (はんげんき)',       back: '放射性物質の 量が 半分に なる 時間。 ラジウム は 約 1,600年。' },
  { front: 'ラジウム (Ra)',             back: 'キュリー 夫妻が 1898年に 発見した 元素。 強い 放射能を 持つ。 原子番号 88。' },
  { front: 'ポロニウム (Po)',          back: 'キュリー 夫妻が 発見した 元素。 マリーの 祖国 ポーランド から 命名。' },
  { front: 'α 線 (アルファせん)',      back: '原子核から 出る ヘリウム核。 紙 一枚で 止められる。 透過力 弱い。' },
  { front: 'γ 線 (ガンマせん)',        back: '高エネルギーの 電磁波。 透過力が 強く、鉛で 弱める。 医療 (放射線治療) にも 利用。' },
  { front: 'ベクレル (Bq)',            back: '放射能の 強さの 単位。 1秒間に 1回の 崩壊が 1 Bq。' },
  { front: 'マリー·キュリー',          back: 'ポーランド出身の 化学者·物理学者 (1867-1934)。 女性 初の ノーベル賞、2回 受賞 (物理·化学)。' },
],
```

### 5-5. exercises (10문제)

```javascript
exercises: [
  {
    q: '事件 3 の 「光る石」 の 正体は?',
    options: ['蓄光 素材', '小さな 電池', 'ラジウム (放射性 元素)', '化学反応'],
    correct: 2,
    explanation: '事件 3 の 核心。 キュリー 夫妻が 発見した ラジウム は 自然に 光と 放射線を 出す。',
  },
  {
    q: '放射性 物質が 半分に なる 時間を 何という?',
    options: ['周期', '半減期', '崩壊時間', '寿命'],
    correct: 1,
    explanation: '半減期 (はんげんき)。 ラジウム は 約 1,600年。',
  },
  {
    q: '原子の 中心に ある のは?',
    options: ['電子', '原子核', '分子', '光子'],
    correct: 1,
    explanation: '原子核 = 陽子 + 中性子。 周りを 電子が 回る。',
  },
  {
    q: '次のうち、紙 一枚で 止められる 放射線は?',
    options: ['α 線', 'β 線', 'γ 線', 'X 線'],
    correct: 0,
    explanation: 'α 線は ヘリウム核 (大きい) なので 紙 一枚で 止まる。 透過力 最弱。',
  },
  {
    q: '放射能の 強さの 単位は?',
    options: ['ボルト', 'アンペア', 'ベクレル', 'カロリー'],
    correct: 2,
    explanation: 'ベクレル (Bq)。 1秒間に 1回の 崩壊が 1 Bq。',
  },
  {
    q: 'マリー·キュリーが ノーベル賞を 受賞した 回数は?',
    options: ['1回', '2回', '3回', '受賞 していない'],
    correct: 1,
    explanation: '物理学賞 (1903年) と 化学賞 (1911年)。 女性 初の 2回 受賞者。',
  },
  {
    q: '次のうち、自然 放射線の 例 ではない のは?',
    options: ['宇宙から 来る 宇宙線', '土壌·岩石から 出る 放射線', '原子力 発電所から 出る 放射線', '食品 (バナナなど) の 微量 放射線'],
    correct: 2,
    explanation: '原子力 発電は 人工 放射線。 他は すべて 自然界 に 存在 する 放射線。',
  },
  {
    q: 'ラジウム の 半減期は 約 何年?',
    options: ['16 年', '160 年', '1,600 年', '16,000 年'],
    correct: 2,
    explanation: '約 1,600年。 長い 時間 かけて ゆっくり 崩壊する。',
  },
  {
    q: '放射線の 良い 利用 例は?',
    options: ['医療の レントゲン·がん 治療', '空気の 浄化', '食品の 冷蔵', '電球の 発光'],
    correct: 0,
    explanation: 'レントゲン (X線)·がん 放射線治療·CT 検査 など、医療に 広く 利用。',
  },
  {
    q: 'マリー·キュリーが 発見した 元素は?',
    options: ['鉄 と 銅', 'ラジウム と ポロニウム', '酸素 と 水素', 'ナトリウム と カリウム'],
    correct: 1,
    explanation: 'ラジウム (ラテン語 「光」) と ポロニウム (祖国 ポーランド から)。',
  },
],
```

### 5-6. tips (8포인트)

```javascript
tips: [
  { title: '①  原子は 不変 では ない',        body: '不安定な 原子核は 自然に 崩壊する。 これが 放射能の 正体。' },
  { title: '②  放射線 3種類 を 覚える',       body: 'α (紙で止まる)·β (アルミで止まる)·γ (鉛で弱まる)。 透過力の 順 = α < β < γ。' },
  { title: '③  半減期 = 半分に なる 時間',   body: '半減期 ごとに 量が 半分に なる。 ラジウム ≈ 1,600年、ヨウ素131 ≈ 8日 など 物質ごとに 違う。' },
  { title: '④  単位 Bq と Sv を 区別',        body: 'Bq は 「物質が 出す 放射能の 強さ」、 Sv は 「人体への 影響」。 全く 違う 概念。' },
  { title: '⑤  自然 放射線は 身近に 存在',   body: '宇宙線·地殻·食品 (バナナの カリウム) など。 適量は 安全。 「放射線=即危険」 ではない。' },
  { title: '⑥  医療·発電 で 広く 活用',       body: 'レントゲン·CT·がん 治療·原子力 発電·年代測定 など。 上手に 使えば 人類に 有益。' },
  { title: '⑦  キュリー 夫妻 = 元素 2つ 発見', body: 'ラジウム (光) + ポロニウム (ポーランド)。 マリーは 女性 初の ノーベル賞 2回 受賞。' },
  { title: '⑧  安全 第一 — 距離·遮蔽·時間',  body: '放射線 から 身を 守る 3原則: 離れる·遮る·短時間。 安全 規制が ある 理由。' },
],
```

---

## 6. caseQuiz (5문제)

```javascript
caseQuiz: [
  {
    q: '事件 3 の 「光る石」 の 正体は?',
    options: ['蓄光 素材', 'ラジウム (放射性 元素)', '小さな 電球', '化学発光 物質'],
    correct: 1,
  },
  {
    q: '放射性 物質が 半分に なる 時間を 何という?',
    options: ['崩壊時間', '半減期', '寿命', '周期'],
    correct: 1,
  },
  {
    q: '原子の 中心に ある のは?',
    options: ['電子', '原子核', '分子', '光子'],
    correct: 1,
  },
  {
    q: 'マリー·キュリーが 発見した 元素は?',
    options: ['鉄·銅', '酸素·水素', 'ラジウム·ポロニウム', 'ナトリウム·カリウム'],
    correct: 2,
  },
  {
    q: '放射線の 良い 利用 例は?',
    options: ['空気 浄化', '医療 (レントゲン·がん 治療)', '冷蔵', '電球の 発光'],
    correct: 1,
  },
],
```

---

## 7. 데이터 파일 갱신

### 7-1. data/series4-scientists.js

`SCIENTISTS_STORY[2]` (id=3) 만 placeholder → 풀콘텐츠 교체. 다른 entry(id=1, 2, 4~10)는 절대 건드리지 말 것.

```javascript
SCIENTISTS_STORY[2] = {
  id: 3,
  title: '光る石の秘密',
  subtitle: '暗闇に 浮かぶ 不思議な 光',
  theme: '放射能·原子核·半減期',
  illustration: SCIENTISTS_CASE_IMAGES[3],
  charKey: 'hikari_curie',
  sceneKey: 'bg_ch03_radium',
  comingSoon: false,
  learnRef: 'scientists_case03',
  intro: { /* §4-1 */ },
  steps: [ /* §4-2 */ ],
  ending: { /* §4-3 */ },
  caseQuiz: [ /* §6 */ ],
  note: { 
    title: '第3事件 光る 石', 
    desc: 'ラジウム の 放射能 — 原子核が 自然に 崩壊し 光と 放射線を 出す 現象。 キュリー 夫妻の 発見と、放射能の 正しい 理解·活用 を 学んだ 第三歩。' 
  },
};
```

### 7-2. data/series4-scientists-learn.js

`SCIENTISTS_LEARN` 객체에 `scientists_case03` 키 **추가** (기존 `scientists_case01`, `scientists_case02`는 그대로 보존).

```javascript
const SCIENTISTS_LEARN = {
  scientists_case01: { /* 이미 작성됨, 보존 */ },
  scientists_case02: { /* 이미 작성됨, 보존 */ },
  scientists_case03: {  // 신규 추가
    title: '放射能と 原子の 世界',
    subtitle: '事件 3 で 学んだ こと',
    examScope: '중학 + 比喩 중심 + 안전 메시지',
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

✅ `engine/scientists-learn.js` — 사건 1에서 정착, 그대로
✅ `engine/detectives-B.js` — `startScientistsCase`도 그대로
✅ `index.html` — 변경 없음

---

## 8. 검증 체크리스트

### 8-1. 콘솔 검증

```javascript
SCIENTISTS_STORY[2].id                                    // 3
SCIENTISTS_STORY[2].title                                 // "光る石の秘密"
SCIENTISTS_STORY[2].comingSoon                            // false
SCIENTISTS_STORY[2].learnRef                              // "scientists_case03"
SCIENTISTS_STORY[2].intro.lines.length                    // 17
SCIENTISTS_STORY[2].steps.length                          // 6
SCIENTISTS_STORY[2].steps[0].options.length               // 3
SCIENTISTS_STORY[2].steps[5].options[0].response.length   // 8
SCIENTISTS_STORY[2].ending.lines.length                   // 7
SCIENTISTS_STORY[2].caseQuiz.length                       // 5

SCIENTISTS_LEARN.scientists_case01                        // 객체 (보존)
SCIENTISTS_LEARN.scientists_case02                        // 객체 (보존)
SCIENTISTS_LEARN.scientists_case03                        // 객체 (신규)
SCIENTISTS_LEARN.scientists_case03.flashcards.length      // 10
SCIENTISTS_LEARN.scientists_case03.exercises.length       // 10
SCIENTISTS_LEARN.scientists_case03.diagrams.length        // 4

// 회귀 확인
SCIENTISTS_STORY[0].comingSoon                            // false (사건 1)
SCIENTISTS_STORY[1].comingSoon                            // false (사건 2)
SCIENTISTS_STORY[3].comingSoon                            // true (사건 4 placeholder)
SCIENTISTS_STORY[9].comingSoon                            // true (보스)
```

### 8-2. 시각 검증 (브라우저)

- [ ] 시리즈 4 챕터 그리드 → 사건 3 카드 클릭 가능
- [ ] intro 17줄 진행 자연스러움
- [ ] キューリィ夫人 등장 시 자산 PNG (hikari_curie.png) 정상 표시
  - ⚠ hikari_curie는 commit 02dea28 알파 처리 시 중간 알파 픽셀 33만 (21%)으로 가장 많이 나왔던 캐릭터 — 본체 반투명 우려 검증 필요
- [ ] STEP 1~6 정상 진행
- [ ] ending 후 학습 모달 자동 호출
- [ ] 학습 6탭 모두 표시
- [ ] SVG 도해 4개 (원자 구조·방사선 3종·반감기·자연/인공) 표시
- [ ] 暗記 카드 10장 / 객관식 10문제
- [ ] caseQuiz 5문제 → 별점 → 챕터 그리드 복귀
- [ ] 사건 3 클리어 마크 (`scientistsCleared[2] = true`)

### 8-3. 회귀 테스트

- [ ] 시리즈 1~3 정상 (시리즈 3, 자녀 사용 중)
- [ ] 시리즈 5~11 정상
- [ ] 시리즈 4 사건 1, 사건 2 정상
- [ ] 시리즈 4 사건 4~10 placeholder 그대로
- [ ] 영어학습·채팅 정상

---

## 9. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| `SCIENTISTS_STORY[0]` (사건 1) 수정 | 이미 완성 + push됨 |
| `SCIENTISTS_STORY[1]` (사건 2) 수정 | 이미 완성 + push됨 |
| `SCIENTISTS_STORY[3]~[9]` (사건 4~10) 수정 | 각각 별도 명세서 |
| `SCIENTISTS_LEARN.scientists_case01`, `case02` 수정 | 이미 작성, 보존 |
| `engine/scientists-learn.js` 수정 | 정착됨, 그대로 활용 |
| `data/series3-science.js` 수정 | 시리즈 3 자녀 사용 중 |
| 자산 PNG 재처리 | 이미 commit 02dea28에 처리됨 |
| 실명 「マリー·キュリー」을 キューリィ夫人 대사로 사용 | 가상 캐릭터 정체성 유지 |

---

## 10. 작업 순서

```
Step 1: 사건 2 데이터 구조 정독 (참조)
  - SCIENTISTS_STORY[1] + scientists_case02
  → 사건 3 동일 패턴 적용

Step 2: data/series4-scientists.js 사건 3만 갱신
  - SCIENTISTS_STORY[2] 교체
  - 다른 entry 보존
  - 콘솔 검증

Step 3: data/series4-scientists-learn.js에 scientists_case03 추가
  - case01, case02 보존
  - case03 키 추가
  - 콘솔 검증

Step 4: 브라우저 시각 검증 (§8-2)

Step 5: 회귀 테스트 (§8-3)

Step 6: git commit + push
  - commit msg: "feat(series04/case03): add Curie/radioactivity content"

Step 7: 완료 보고
```

---

## 11. Claude Code 위탁 명령

```
SERIES4_CASE03_SPEC.md를 정독하고, 시리즈 4 사건 3 「光る石の秘密」 
본격 콘텐츠를 작성해줘.

[핵심 원칙]
- 사건 2 (SCIENTISTS_STORY[1], SCIENTISTS_LEARN.scientists_case02) 패턴 정확히 mirror.
- 엔진 코드 신규 작성 불필요. 정착된 시스템 그대로 활용.
- SCIENTISTS_STORY[2] entry만 placeholder에서 풀콘텐츠로 교체.
- SCIENTISTS_LEARN에 scientists_case03 키만 추가, case01·case02 보존.

[방사능 주제의 안전 메시지]
방사능은 어린이가 두려워할 수 있는 주제. 학습 자료에 명확히:
- 자연 방사선은 우주·대지·식품 어디에나 존재 (적량 안전)
- 의료·발전 등 유용한 활용
- 다만 고선량은 위험 → 안전 규제 중요
균형 잡힌 시각 유지.

[작업 순서]
§10의 7단계 그대로. 각 step 후 §8-1의 콘솔 검증.

[금지 사항]
- 사건 1·2 (SCIENTISTS_STORY[0], [1]) 절대 수정 X
- 사건 4~10 placeholder 그대로
- 시리즈 3 untouched (자녀 사용 중)
- engine 코드 수정 X
- 자산 PNG 재처리 X

[회귀 테스트]
push 전 시리즈 1~3, 5~11 + 사건 1·2 + 영어학습 + 채팅 정상 확인.

commit msg: "feat(series04/case03): add Curie/radioactivity content"
```

---

**END OF SPEC**

이 명세서는 시리즈 4 사건 3의 본격 콘텐츠 산출물입니다. 사건 1·2 시스템 위에 데이터만 추가하므로 silent failure 위험 낮음, 작업 시간 약 1~1.5시간 예상.
