# SERIES 4 — CASE 1 CONTENT SPEC
## 「落ちる林檎の真実」 — 林檎博士·万有引力

**작성일**: 2026-05-11
**대상**: Claude Code (작업 폴더 `C:\Users\taise\Projects\harugame`)
**선행 명세**: `SERIES4_NEW_CREATION_SPEC.md` (commit 7c5e2b4, 골격 완성)
**선행 인계**: `SERIES4_CONTENT_HANDOFF.md`
**목적**: 시리즈 4 사건 1의 본격 콘텐츠를 데이터 파일에 채워 넣고, 학습 자료 시스템을 시리즈 4에 처음 도입한다.

**범위 (이 명세서 한 장의 산출물)**:
- ✅ 사건 1 본격 스토리 (intro + steps + 미스터리 트릭 + 결말)
- ✅ NPC 대사·인격 정립 (ハル·リオ·ヒナタ·林檎博士·ペンタ)
- ✅ 학습 자료 6섹션 (概念 / SVG 도해 / 공식·표 / 暗記카드 / 객관식 / コツ)
- ✅ 챕터 클리어 퀴즈 5문제
- ✅ data/series4-scientists.js 사건 1 부분 갱신
- ✅ data/series4-scientists-learn.js 신규 파일 생성 (사건 1만)
- ✅ engine/scientists-learn.js 신규 함수 (시리즈 10·11 mirror)
- ✅ index.html에 학습 자료 스크립트 등록
- ❌ 사건 2~10 콘텐츠 (각각 별도 명세서)

**미러링 기준**:
- **스토리 데이터 구조**: `data/series11-math.js` (가장 최근 패턴)
- **학습 자료 데이터 구조**: `data/series11-math-learn.js`
- **학습 모달 엔진**: `engine/math-learn.js` 또는 `engine/weather-learn.js`
- **퀴즈 시스템**: 시리즈 11과 동일

작업 시작 전 위 4개 파일을 반드시 정독할 것.

---

## 0. PRE-FLIGHT CHECKLIST

작업 시작 전 다음 확인:

- [ ] commit 7c5e2b4 (시리즈 4 골격) 정상 동작 확인
- [ ] 챕터 그리드에서 사건 1 카드 클릭 시 placeholder 화면 진입 OK
- [ ] `data/series4-scientists.js`의 `SCIENTISTS_STORY[1]` 위치 확인
- [ ] 시리즈 11 학습 자료 시스템 정상 동작 확인 (회귀 기준선)
- [ ] 시리즈 3 (科学探偵) 정상 동작 확인 (절대 건드리지 않을 시리즈)
- [ ] git 상태 깨끗
- [ ] 신규 브랜치 권장: `feat/series04-case01-newton`

---

## 1. 사건 1 정체성

| 항목 | 값 |
|---|---|
| 사건 번호 | 1 (시리즈 4의 첫 사건) |
| 사건 제목 | **落ちる林檎の真実 (おちるりんごのしんじつ)** |
| 부제 | 万有引力を発見した日 |
| 학습 테마 | 万有引力 / 重力 / ニュートンの三法則 / 力の釣り合い |
| 학습 깊이 | **중학 物理 기초** (정성적 이해 중심, 공식은 개념적으로만) |
| 등장 NPC | 林檎博士 (`ringo_hakase`) |
| 동행자 | ハル + リオ + ヒナタ (3인 동행) + ペンタ (마스코트) |
| 메인 배경 | `bg_ch01_apple` (사과나무 정원, 벤치) |
| 사건 분위기 | 따뜻한 가을 정원, 호기심 가득한 미스터리 |
| 추리 트릭 | 「動かない林檎」— 한 사과만 공중에 떠 있는 수수께끼 |
| 예상 플레이타임 | 12~15분 (스토리 8분 + 학습 5분 + 퀴즈 2분) |

---

## 2. 캐릭터 인격 설정

### 2-1. 林檎博士(リンゴはかせ)

**시리즈 4 사건 1의 핵심 NPC**. 향후 사건에서 가끔 카메오로 등장 가능.

| 항목 | 설정 |
|---|---|
| 외모 | 백발 노학자, 둥근 안경, 정원사 앞치마, 항상 사과를 한 손에 들고 있음 |
| 나이 | 70대 추정 (가상 인물) |
| 직업 | 자연철학자 겸 정원사 |
| 거주 | 시골의 사과 정원 「林檎園(りんごえん)」 |
| 성격 | 따뜻하고 호기심 많음. 발견의 기쁨을 어린이에게 전하고 싶어함 |
| 말투 | 노년풍 — 「~じゃのう」「ほっほっ」「ふむふむ」「~なのじゃ」 |
| 좋아하는 것 | 사과, 정원 산책, 어린이와의 대화 |
| 모티프 | 아이작 뉴턴의 사과 일화, 단 가상의 인격 |
| 핵심 대사 (예) | 「林檎が落ちるのを見て、儂は宇宙の秘密に気づいたのじゃ」 |

**중요**: 실명 「ニュートン」은 사용하지 않음 (가상 인격 유지). 다만 학습 자료 섹션에서는 「アイザック·ニュートン (1642-1727)」로 사실 정보 별도 제공.

### 2-2. ハル (메인, 차분형)

- 사건 1에서의 역할: **단서 정리 담당** — 발견된 단서를 차분히 정리하고 가설 검증
- 대사 톤: 「~だね」「気づいたよ」「整理してみよう」
- 특기: 관찰력, 논리적 추론

### 2-3. リオ (메인, 활발형)

- 사건 1에서의 역할: **의문 제기 담당** — 「왜?」를 가장 먼저 던지는 역할
- 대사 톤: 「えっ!?」「ねえねえ、これ何?」「不思議〜!」
- 특기: 호기심, 행동력

### 2-4. ヒナタ (시리즈 4 신규 메인, 모범생형)

- 사건 1에서의 역할: **이론 지식 담당** — 학교에서 배운 지식으로 단서 해석
- 대사 톤: 「教科書で読んだことがあります」「~ということですね」
- 특기: 암기력, 정확성
- **첫 등장**: 사건 1 intro에서 자연스럽게 합류 (「林檎博士の助手として研究を手伝っていました」 등)

### 2-5. ペンタ (마스코트, 시리즈 4 안경 모드)

- 사건 1에서의 역할: **마스코트 + 분위기 환기**
- 시리즈 4 안에서는 안경 쓴 모드 (penta_series04)
- 대사 톤: 「ペンッ!」「コレなに〜?」 짧고 귀여운 추임새

---

## 3. 미스터리 트릭 구조 「動かない林檎」

### 3-1. 핵심 미스터리

林檎博士の정원에는 사과나무가 7그루 있다. 어느 가을날 박사가 정원을 돌보는데, **한 그루의 사과나무 끝에 매달린 사과 한 개만이 마치 시간이 멈춘 듯 공중에 정지해 있다**. 다른 사과들은 익으면 정상적으로 낙하하는데 그 사과만 절대 떨어지지 않는다.

박사는 「儂にも分からんのじゃ」 하며 어린이들에게 도움을 요청.

### 3-2. 단서 시퀀스

| Step | 단서 | 누가 발견? | 의미 |
|---|---|---|---|
| 1 | 정상 사과나무 6그루는 모두 사과가 정상 낙하 | リオ | 비교 대상 확보 |
| 2 | 「動かない林檎」주변 공기에 미세한 진동 | ハル | 무엇인가 작용 중 |
| 3 | 사과나무 위쪽 가지에 작은 검은 상자 | ヒナタ | 인공적 장치 의심 |
| 4 | 정원 한쪽 책상에 「磁石」「実験ノート」 발견 | ハル | 박사의 메모 단서 |
| 5 | 박사의 노트에 「重力に挑戦する実験」 메모 | ヒナタ | 박사의 의도 추정 |
| 6 | 떠 있는 사과를 가까이에서 보니 표면에 작은 금속 | リオ | 자석에 반응하는 사과? |

### 3-3. 진실 (해결 시 박사의 자백)

「ほっほっ、ばれてしまったかのう。実はあの林檎は儂の実験じゃ。」

- 박사는 사과 안에 작은 강력 자석을 심었음
- 나무 위쪽 가지에 같은 극의 더 큰 자석을 설치
- **자석의 반발력**과 **만유인력**이 정확히 균형을 이루어 사과가 공중에 정지
- 「떨어지지 않는다 ≠ 중력이 없다」 → **여러 힘이 釣り合い(균형)을 이루고 있을 뿐**

### 3-4. 학습 포인트로의 연결

박사: 「林檎が落ちるのは、地球が引っ張っているからじゃ。これを儂たちは『万有引力』と呼ぶのじゃ。」

→ 자연스럽게 학습 자료 모달로 유도:
- 만유인력 = 모든 물체 사이에 작용하는 끌어당기는 힘
- 사과가 떨어지는 이유 = 지구가 사과를 끌어당기기 때문
- 떠 있는 사과 = 자석의 반발력이 만유인력과 균형
- 뉴턴의 三법칙 (慣性·運動·作用反作用) 소개

---

## 4. 스토리 본문 (intro + steps)

### 4-1. intro (도입부)

```javascript
intro: {
  title: "落ちる林檎の真実",
  subtitle: "万有引力を発見した日",
  bg: "bg_ch01_apple",
  lines: [
    { speaker: "narrator", text: "秋の午後。林檎の香りが漂う、のどかな田舎の庭。" },
    { speaker: "haru", text: "ここが噂の『林檎園』だね。" },
    { speaker: "rio", text: "わぁ、林檎の木がいっぱい!甘い匂い〜!" },
    { speaker: "hinata", text: "林檎博士の研究所です。私、博士の助手として時々お手伝いをしているんです。" },
    { speaker: "rio", text: "えっ、ヒナタちゃん、博士のこと知ってるの!?" },
    { speaker: "hinata", text: "はい。今日は皆さんを紹介しようと思って、お呼びしました。" },
    { speaker: "ringo_hakase", text: "ほっほっ、よう来たのう。儂が林檎博士じゃ。" },
    { speaker: "haru", text: "はじめまして、ハルです。" },
    { speaker: "rio", text: "リオでーす!博士、その林檎、食べていい?" },
    { speaker: "ringo_hakase", text: "ふむふむ、元気な子じゃのう。じゃが、今日はちょっと困った事があってのう…" },
    { speaker: "ringo_hakase", text: "見ておくれ、あの一番奥の林檎の木を。" },
    { speaker: "narrator", text: "博士の指す方を見ると——一つの林檎が、空中で静止していた。" },
    { speaker: "rio", text: "ええっ!? 林檎が…浮いてる!?" },
    { speaker: "haru", text: "落ちない…どうして?" },
    { speaker: "hinata", text: "他の林檎は普通に落ちているのに、あの一つだけが…" },
    { speaker: "ringo_hakase", text: "儂にも分からんのじゃ。皆で、この謎を解いてはくれんかのう?" },
    { speaker: "penta", text: "ペンッ!謎、解くペン!" }
  ],
  cta: "調査を始める"
}
```

### 4-2. steps (사건 진행 — 단서 6개 시퀀스)

각 step은 단서 발견 → 자녀들의 추리 대화 → 다음 단계로 구성.

#### Step 1 — 다른 사과나무 비교 조사

```javascript
{
  id: "step1",
  title: "他の林檎の木を調べる",
  bg: "bg_ch01_apple",
  question: "まず、他の林檎の木はどうなっているか調べよう。何を確認する?",
  options: [
    {
      label: "他の林檎が普通に落ちるか確認する",
      isCorrect: true,
      response: [
        { speaker: "rio", text: "他の6本の木は、林檎がちゃんと落ちてるよ!" },
        { speaker: "haru", text: "つまり、あの一つの林檎だけが特別な状態にあるってことだね。" },
        { speaker: "hinata", text: "比較対象が確認できました。次に進みましょう。" }
      ]
    },
    {
      label: "林檎の木の高さを測る",
      isCorrect: false,
      response: [
        { speaker: "haru", text: "高さは関係ないかも。落ちる/落ちないの違いを先に調べよう。" }
      ]
    },
    {
      label: "林檎を食べてみる",
      isCorrect: false,
      response: [
        { speaker: "rio", text: "あ、それいいね!" },
        { speaker: "haru", text: "リオ、調査が先だよ…" },
        { speaker: "ringo_hakase", text: "ほっほっ、後でいくらでも食べてよいぞ。まずは謎を解こうかのう。" }
      ]
    }
  ]
}
```

#### Step 2 — 떠 있는 사과 주변 관찰 (ハル 발견)

```javascript
{
  id: "step2",
  title: "浮いている林檎に近づく",
  bg: "bg_ch01_apple",
  question: "浮いている林檎に近づいた。何に注目する?",
  options: [
    {
      label: "周囲の空気を観察する",
      isCorrect: true,
      response: [
        { speaker: "haru", text: "…林檎の周りの空気が、わずかに振動してる気がする。" },
        { speaker: "rio", text: "えっ、本当?" },
        { speaker: "haru", text: "目に見えない『何か』が働いてるかもしれない。" }
      ]
    },
    {
      label: "林檎を引っ張ってみる",
      isCorrect: false,
      response: [
        { speaker: "ringo_hakase", text: "ふむ、それは少し危ないのう。先に観察するのがよいぞ。" }
      ]
    },
    {
      label: "林檎の色を見る",
      isCorrect: false,
      response: [
        { speaker: "haru", text: "色は普通の赤い林檎だね。手がかりにはならないかな。" }
      ]
    }
  ]
}
```

#### Step 3 — 나무 위쪽 검은 상자 발견 (ヒナタ 발견)

```javascript
{
  id: "step3",
  title: "木の上の方を見上げる",
  bg: "bg_ch01_apple",
  question: "ヒナタが木の上を見上げた。何が見える?",
  options: [
    {
      label: "木の上の枝に小さな黒い箱がある",
      isCorrect: true,
      response: [
        { speaker: "hinata", text: "あれ…枝に小さな黒い箱がついています。" },
        { speaker: "haru", text: "人工的な装置だね。誰かが取り付けたのかな。" },
        { speaker: "rio", text: "博士が知ってるかも!" },
        { speaker: "ringo_hakase", text: "…ふむふむ、儂は何も言わんぞ。皆で調べてみるのじゃ。" }
      ]
    },
    {
      label: "葉っぱの色を確認する",
      isCorrect: false,
      response: [
        { speaker: "hinata", text: "葉っぱは普通の秋の色です…手がかりにはならなさそう。" }
      ]
    }
  ]
}
```

#### Step 4 — 박사의 책상에서 노트 발견

```javascript
{
  id: "step4",
  title: "庭の机を調べる",
  bg: "bg_ch01_apple",
  question: "庭の片隅にある博士の机を調べる。何を見る?",
  options: [
    {
      label: "実験ノートを開く",
      isCorrect: true,
      response: [
        { speaker: "haru", text: "博士のノートだ。…『重力に挑戦する実験』って書いてある。" },
        { speaker: "hinata", text: "重力に挑戦…つまり、林檎を落ちなくする実験ですね!" },
        { speaker: "rio", text: "博士、やっぱり何か仕掛けてたんだ!" },
        { speaker: "ringo_hakase", text: "ほっほっ、見つかってしまったのう…" }
      ]
    },
    {
      label: "ペンと紙だけ見る",
      isCorrect: false,
      response: [
        { speaker: "haru", text: "ペンと紙だけじゃ何も分からないね。もっと詳しく調べよう。" }
      ]
    },
    {
      label: "机の上の磁石を持ち上げる",
      isCorrect: true,
      response: [
        { speaker: "rio", text: "磁石!?なんで博士が磁石を持ってるの?" },
        { speaker: "haru", text: "これが手がかりかもしれない。覚えておこう。" }
      ]
    }
  ]
}
```

#### Step 5 — 사과 표면 자세히 관찰 (リオ 발견)

```javascript
{
  id: "step5",
  title: "浮いている林檎をもう一度よく見る",
  bg: "bg_ch01_apple",
  question: "リオがじっくり林檎を観察した。何に気づく?",
  options: [
    {
      label: "林檎の表面に小さな金属片がある",
      isCorrect: true,
      response: [
        { speaker: "rio", text: "あっ!林檎の中に何か金属みたいなのが見える!" },
        { speaker: "haru", text: "金属…さっきの磁石と関係があるかもしれない。" },
        { speaker: "hinata", text: "もしかして、林檎の中に磁石が入っていて、木の上の黒い箱も磁石だとしたら——" },
        { speaker: "haru", text: "同じ極同士の磁石が反発する力で、林檎を浮かせている?" }
      ]
    },
    {
      label: "林檎の重さを推測する",
      isCorrect: false,
      response: [
        { speaker: "rio", text: "うーん、見ただけじゃ重さは分からないなぁ。" }
      ]
    }
  ]
}
```

#### Step 6 — 추리 결합 + 박사에게 추궁

```javascript
{
  id: "step6",
  title: "推理を組み立てる",
  bg: "bg_ch01_apple",
  question: "全ての手がかりが揃った。博士にどう伝える?",
  options: [
    {
      label: "「林檎の中の磁石と、木の上の磁石の反発力で浮かせている」",
      isCorrect: true,
      response: [
        { speaker: "ringo_hakase", text: "ほっほっ、見事じゃのう!まさに正解じゃ!" },
        { speaker: "ringo_hakase", text: "あの林檎の中には小さな強力磁石が、木の上には同じ極の大きな磁石が仕掛けてある。" },
        { speaker: "ringo_hakase", text: "磁石の反発力と、地球の引力——つまり万有引力——が、ちょうど釣り合っておるのじゃ。" },
        { speaker: "haru", text: "落ちない=引力がない、じゃなくて、力が釣り合ってるってことか。" },
        { speaker: "hinata", text: "重力は確かに働いているけど、別の力で打ち消されているんですね。" },
        { speaker: "rio", text: "なるほど〜!すごい実験!" },
        { speaker: "ringo_hakase", text: "皆、林檎が落ちる理由——『万有引力』を、これから一緒に学ぼうかのう。" }
      ]
    },
    {
      label: "「林檎が軽いから浮いている」",
      isCorrect: false,
      response: [
        { speaker: "ringo_hakase", text: "ふむ、それは違うのう。重さに関係なく、物は地球に引っ張られておるのじゃ。" }
      ]
    },
    {
      label: "「風が下から吹いている」",
      isCorrect: false,
      response: [
        { speaker: "haru", text: "風だったら他の林檎も影響を受けるはず。違うかな。" }
      ]
    }
  ]
}
```

### 4-3. ending (사건 클리어 후)

```javascript
ending: {
  bg: "bg_ch01_apple",
  lines: [
    { speaker: "ringo_hakase", text: "皆のおかげで、儂の実験も無事に説明できたのう。" },
    { speaker: "ringo_hakase", text: "では、これから万有引力について、もう少し詳しく学んでみるかのう?" },
    { speaker: "haru", text: "うん、もっと知りたい!" },
    { speaker: "hinata", text: "私も、改めて整理したいです。" },
    { speaker: "rio", text: "学んだら、林檎食べていい?" },
    { speaker: "ringo_hakase", text: "ほっほっ、約束じゃ。" },
    { speaker: "penta", text: "ペンッ!勉強、ペン!" }
  ],
  cta: "学習資料を開く"
}
```

→ 「学習資料を開く」 버튼 클릭 시 학습 모달 열림 (다음 §5)

---

## 5. 학습 자료 6섹션

### 5-1. 섹션 1: 概念 (Concept)

```javascript
concept: {
  title: "万有引力ってなに?",
  paragraphs: [
    "宇宙にあるすべての物には、お互いに引きつけ合う力があります。これを『万有引力(ばんゆういんりょく)』といいます。",
    "私たちが地面に立っていられるのも、林檎が木から落ちるのも、月が地球の周りを回っているのも、すべて万有引力のおかげです。",
    "中でも、地球が物を引きつける力のことを特に『重力(じゅうりょく)』と呼びます。",
    "この力は、物の重さに関係なく、すべての物に同じように働きます。重い鉄の球も、軽い羽毛も、空気の抵抗がなければ同じ速さで落ちるのです。"
  ],
  highlight: "落ちない物体があるとしたら、それは重力に勝つ別の力が働いているということ。"
}
```

### 5-2. 섹션 2: SVG 도해 (4개)

#### 도해 1: 사과가 떨어지는 이유

```
[SVG 설명]
- 위: 사과나무에서 떨어지는 사과
- 사과에 아래 방향 화살표 (지구의 인력)
- 화살표 옆 라벨: "重力 (じゅうりょく)"
- 아래: 지구 (둥근 형태)
- 지구 중심에서 사과 쪽으로 점선 화살표 (서로 끌어당김)
- 라벨: "地球が林檎を引く"
크기: 400 × 300, viewBox 적절
색상: 사과 빨강(#e74c3c), 지구 파랑(#3498db), 화살표 진회색(#2c3e50)
```

#### 도해 2: 万有引力 — 모든 물체끼리 끌어당김

```
[SVG 설명]
- 왼쪽: 지구 (큰 원)
- 오른쪽: 달 (작은 원)
- 두 천체 사이 양쪽 화살표 (서로 끌어당김)
- 라벨: "地球も月もお互いに引き合っている"
- 아래 작은 도해: 두 사람이 서로 끌어당기는 그림 (만유인력은 사람 사이에도 작용 — 너무 약해서 못 느낄 뿐)
- 라벨: "実は人と人の間にも、ごくごく弱い万有引力が働いている!"
크기: 400 × 350
```

#### 도해 3: 力の釣り合い (사건 1의 핵심)

```
[SVG 설명]
- 중앙: 공중에 떠 있는 사과
- 사과 위쪽: 자석 반발력 화살표 (위 방향)
- 사과 아래쪽: 중력 화살표 (아래 방향)
- 두 화살표 길이가 정확히 같음
- 라벨 위: "磁石の反発力"
- 라벨 아래: "重力 (万有引力)"
- 등호 표시: "= 釣り合い"
- 캡션: "二つの力がつり合うと、物は動かない"
크기: 350 × 400
```

#### 도해 4: ニュートンの三法則 (간단 도해)

```
[SVG 설명 — 3컷 만화 스타일]
[1] 慣性の法則: 정지한 사과 → 그대로 정지 / 움직이는 사과 → 그대로 움직임
    캡션: "力が働かなければ、物の状態は変わらない"
[2] 運動の法則: 사과를 손가락으로 미는 그림, 화살표 표시
    캡션: "力 = 質量 × 加速度 (F = ma)"
[3] 作用·反作用: 두 사과가 서로 부딪히는 그림, 양쪽으로 화살표
    캡션: "力は必ず対(ペア)で働く"
크기: 600 × 200 (가로 긴 형태)
```

### 5-3. 섹션 3: 공식·표

```javascript
formulas: [
  {
    name: "重力 (じゅうりょく)",
    formula: "重さ = 質量 × 重力加速度",
    formulaSimple: "W = m × g",
    explanation: "物の『重さ』は、その物の『質量』に地球の『重力加速度(g ≈ 9.8 m/s²)』をかけたもの。",
    note: "質量(kg)と重さ(N: ニュートン)は別の概念。月では重力加速度が小さいので、同じ質量でも重さは軽くなる。"
  },
  {
    name: "ニュートンの運動方程式",
    formula: "力 = 質量 × 加速度",
    formulaSimple: "F = m × a",
    explanation: "物にどれだけの力が加わると、どれだけ速度が変わるかを表す式。",
    note: "中学では概念だけ覚えておけば十分。高校で詳しく扱う。"
  }
],
unitsTable: {
  title: "単位のまとめ",
  rows: [
    ["量", "記号", "単位", "意味"],
    ["質量", "m", "kg (キログラム)", "物の量そのもの"],
    ["重さ", "W", "N (ニュートン)", "重力による力"],
    ["加速度", "a", "m/s² (メートル毎秒毎秒)", "速度の変化の速さ"],
    ["力", "F", "N (ニュートン)", "物を動かそうとするはたらき"],
    ["重力加速度", "g", "m/s² (約9.8)", "地球上での重力の強さ"]
  ]
}
```

### 5-4. 섹션 4: 暗記カード (10장)

```javascript
flashcards: [
  {
    front: "万有引力 (ばんゆういんりょく)",
    back: "宇宙にあるすべての物がお互いに引きつけ合う力。英: gravity / universal gravitation"
  },
  {
    front: "重力 (じゅうりょく)",
    back: "地球が物を引きつける力。万有引力の一種。"
  },
  {
    front: "質量 (しつりょう)",
    back: "物の量そのもの。単位は kg。場所が変わっても変わらない。"
  },
  {
    front: "重さ (おもさ)",
    back: "重力によって物にかかる力。単位は N(ニュートン)。月では地球の約1/6になる。"
  },
  {
    front: "慣性 (かんせい)",
    back: "物が今の状態(静止 or 等速直線運動)を保とうとする性質。ニュートン第一法則。"
  },
  {
    front: "加速度 (かそくど)",
    back: "速度がどれだけ速く変化しているか。単位は m/s²。"
  },
  {
    front: "作用·反作用の法則 (さよう·はんさよう)",
    back: "力は必ず対で働く。AがBを押すと、BもAを同じ大きさで押し返す。ニュートン第三法則。"
  },
  {
    front: "力の釣り合い (ちからのつりあい)",
    back: "複数の力が打ち消し合って、合計がゼロになっている状態。物は静止または等速で動く。"
  },
  {
    front: "落体 (らくたい)",
    back: "重力によって落ちる物体。空気の抵抗がなければ、重さに関係なく同じ速さで落ちる。"
  },
  {
    front: "アイザック·ニュートン",
    back: "イギリスの科学者(1642-1727)。万有引力と運動の三法則を発見した。林檎が落ちるのを見たという逸話が有名。"
  }
]
```

### 5-5. 섹션 5: 객관식 10문제

```javascript
exercises: [
  {
    q: "次のうち、『万有引力』の説明として正しいものはどれ?",
    options: [
      "地球だけが持つ特別な力",
      "宇宙にあるすべての物がお互いに引き合う力",
      "磁石が他の物を引きつける力",
      "風が物を押す力"
    ],
    correct: 1,
    explanation: "万有引力は『万物が有する引力』。すべての物の間に働く。"
  },
  {
    q: "重さ60kgの人が月に行くと、月での『重さ』はどうなる?(月の重力は地球の約1/6)",
    options: [
      "60kgのまま",
      "約10kg分の重さになる",
      "0kgになる",
      "120kgになる"
    ],
    correct: 1,
    explanation: "質量(60kg)は変わらないが、月の重力が地球の1/6なので重さは1/6になる。"
  },
  {
    q: "落ちない林檎を見たら、まず何を疑うべき?",
    options: [
      "重力がなくなった",
      "林檎が魔法にかかった",
      "重力以外の何らかの力が働いている",
      "目の錯覚"
    ],
    correct: 2,
    explanation: "重力は地球上ではどこでも働いている。動かない=力が釣り合っているということ。"
  },
  {
    q: "F = ma という式の『a』は何を表している?",
    options: [
      "面積",
      "加速度",
      "質量",
      "角度"
    ],
    correct: 1,
    explanation: "a は加速度(acceleration)。F は力、m は質量。"
  },
  {
    q: "ニュートンの第三法則(作用·反作用)の例として最も適切なのは?",
    options: [
      "ボールを蹴ると足にも衝撃が返ってくる",
      "ボールが転がり続ける",
      "ボールの重さを測る",
      "ボールが落ちる"
    ],
    correct: 0,
    explanation: "蹴った力(作用)と同じ大きさの力が足に返る(反作用)。これが第三法則。"
  },
  {
    q: "空気の抵抗がない場所で、1kgの鉄球と100gの羽毛を同じ高さから同時に落とすと?",
    options: [
      "鉄球の方が早く落ちる",
      "羽毛の方が早く落ちる",
      "同時に落ちる",
      "羽毛は落ちない"
    ],
    correct: 2,
    explanation: "重力加速度はどんな物にも同じ。空気抵抗がなければ同時に落ちる。ガリレオが発見した。"
  },
  {
    q: "『慣性の法則』の説明として正しいのは?",
    options: [
      "重い物ほど早く落ちる",
      "力が働かない限り、物は今の運動を続ける",
      "物には必ず重力が働く",
      "力は必ず対で働く"
    ],
    correct: 1,
    explanation: "ニュートン第一法則 = 慣性の法則。電車で急ブレーキ時に体が前に倒れるのもこの法則。"
  },
  {
    q: "月が地球の周りを回り続けているのはなぜ?",
    options: [
      "月にエンジンがついているから",
      "地球と月の間に万有引力が働いているから",
      "風が月を押しているから",
      "宇宙が月を支えているから"
    ],
    correct: 1,
    explanation: "万有引力が月を地球に引きつけ、円運動を維持させている。"
  },
  {
    q: "『動かない林檎』のトリックの正体は?",
    options: [
      "重力がない場所だった",
      "林檎が特別な品種だった",
      "磁石の反発力が重力と釣り合っていた",
      "風が下から吹いていた"
    ],
    correct: 2,
    explanation: "事件の核心。林檎の中の磁石と木の上の磁石が反発力を生み、重力と釣り合って止まっていた。"
  },
  {
    q: "アイザック·ニュートンが万有引力を発見したきっかけは何だったといわれている?",
    options: [
      "星を観察していた時",
      "海を見ていた時",
      "林檎が木から落ちるのを見た時",
      "夢の中で"
    ],
    correct: 2,
    explanation: "有名な逸話。実際に林檎が頭に当たったかは諸説あるが、林檎の落下から着想を得たとされる。"
  }
]
```

### 5-6. 섹션 6: コツ・解き方 (8포인트)

```javascript
tips: [
  {
    title: "①『重さ』と『質量』を混同しない",
    body: "質量(kg)は物そのものの量。重さ(N)は重力によって生じる力。月や宇宙では重さは変わるが、質量は変わらない。"
  },
  {
    title: "② 落ちない物を見たら『力の釣り合い』を疑え",
    body: "重力は地球上では必ず働いている。動かない=もう一つの力が打ち消している。事件 1 の核心はここ。"
  },
  {
    title: "③ 重さに関係なく落下速度は同じ(空気抵抗無し時)",
    body: "ガリレオが発見した法則。中学テストでもよく出題される。羽毛が遅く落ちるのは空気の抵抗のせい。"
  },
  {
    title: "④『万物が引き合う』という壮大さを覚えておく",
    body: "君と隣の人の間にも万有引力は働いている(感じない位 弱いけど)。地球と月、太陽と地球も同じ仕組み。"
  },
  {
    title: "⑤ 三法則は順番で覚える",
    body: "第一: 慣性 / 第二: F=ma / 第三: 作用反作用。順番を覚えておけば問題で迷わない。"
  },
  {
    title: "⑥ 単位を必ずチェック",
    body: "kg(質量)と N(重さ·力)を取り違える失敗が多い。問題文の単位を最初に確認する習慣をつけよう。"
  },
  {
    title: "⑦ 重力加速度 g ≈ 9.8 m/s² を覚えておく",
    body: "中学では概数(約10)で計算することも多い。テストでは問題文に書かれることも多いが、暗記しておくと便利。"
  },
  {
    title: "⑧ ニュートンの林檎の話は『作り話』ではなく『着想のきっかけ』",
    body: "林檎が頭に当たって発見、というのは脚色だが、林檎の落下から万有引力の概念を考えたのは事実とされる。"
  }
]
```

---

## 6. 챕터 클리어 퀴즈 (5문제)

학습 자료를 본 후 도전하는 종합 확인 퀴즈. 정답률에 따라 별 1~3개 부여.

```javascript
caseQuiz: [
  {
    q: "事件 1 で林檎が浮いていた本当の理由は?",
    options: [
      "重力がなかった",
      "風が吹いていた",
      "磁石の反発力と重力が釣り合っていた",
      "林檎が軽すぎた"
    ],
    correct: 2
  },
  {
    q: "宇宙のすべての物がお互いに引き合う力を何という?",
    options: [
      "電磁力",
      "万有引力",
      "摩擦力",
      "弾性力"
    ],
    correct: 1
  },
  {
    q: "ニュートンの第一法則は何の法則?",
    options: [
      "慣性の法則",
      "運動の法則",
      "作用·反作用の法則",
      "万有引力の法則"
    ],
    correct: 0
  },
  {
    q: "1kgの物体の地球上での重さは約何 N?(g ≈ 9.8 m/s²)",
    options: [
      "1 N",
      "9.8 N",
      "98 N",
      "0.98 N"
    ],
    correct: 1
  },
  {
    q: "アイザック·ニュートンが生まれた国は?",
    options: [
      "ドイツ",
      "イタリア",
      "イギリス",
      "フランス"
    ],
    correct: 2
  }
]
```

**별점 기준**:
- 5/5 정답 → ⭐⭐⭐
- 4/5 정답 → ⭐⭐
- 3/5 정답 → ⭐
- 2/5 이하 → 재도전 권장

---

## 7. 데이터 파일 구조

### 7-1. data/series4-scientists.js — 사건 1 부분 갱신

기존 placeholder를 교체. **`SCIENTISTS_STORY[1]` 위치만 수정**, 다른 챕터(2~10)는 손대지 말 것.

```javascript
// data/series4-scientists.js (사건 1 부분만)

SCIENTISTS_STORY[1] = {
  id: 1,
  title: "落ちる林檎の真実",
  subtitle: "万有引力を発見した日",
  theme: "万有引力·三法則",
  charKey: "ringo_hakase",
  sceneKey: "bg_ch01_apple",
  
  intro: { /* §4-1 그대로 */ },
  steps: [ /* §4-2의 step1~step6 그대로 */ ],
  ending: { /* §4-3 그대로 */ },
  
  caseQuiz: [ /* §6의 5문제 */ ],
  
  // 학습 자료는 별도 파일에서 import
  learnRef: "scientists_case01"
};
```

### 7-2. data/series4-scientists-learn.js — 신규 파일

시리즈 11의 `data/series11-math-learn.js` 구조를 정확히 mirror.

```javascript
// data/series4-scientists-learn.js (신규)

const SCIENTISTS_LEARN = {
  scientists_case01: {
    title: "万有引力と運動の法則",
    subtitle: "事件 1 で学んだこと",
    
    concept: { /* §5-1 */ },
    
    diagrams: [ /* §5-2의 SVG 4개 */ ],
    
    formulas: [ /* §5-3의 공식 2개 */ ],
    unitsTable: { /* §5-3의 표 */ },
    
    flashcards: [ /* §5-4의 10장 */ ],
    
    exercises: [ /* §5-5의 10문제 */ ],
    
    tips: [ /* §5-6의 8포인트 */ ]
  }
  // 사건 2~10은 별도 명세서에서 추가 (scientists_case02 등)
};
```

### 7-3. engine/scientists-learn.js — 신규 또는 weather/math-learn 일반화

**옵션 A (권장)**: 시리즈 11의 `engine/math-learn.js`를 정확히 mirror해서 `engine/scientists-learn.js` 신규 작성. 함수명만 `openScientistsLearn`, `renderScientistsLearn` 등으로.

**옵션 B**: 기존 `engine/learn-features.js`를 일반화해서 시리즈 코드(`science`, `math`, `scientists`)를 인자로 받게 리팩터링. 단 회귀 위험 있음.

→ **A 강력 권장**. silent failure 방지. 시리즈 11이 검증된 패턴이므로 그대로 복제.

함수 시그니처:
```javascript
openScientistsLearn(caseId)   // 모달 열기
renderScientistsLearnTabs()   // 6탭 (概念/도해/공식/카드/연습/コツ) 렌더
renderConcept(data)
renderDiagrams(data)
renderFormulas(data)
renderFlashcards(data)
renderExercises(data)
renderTips(data)
```

### 7-4. index.html — 스크립트 등록

```html
<!-- data 영역 -->
<script src="data/series4-scientists.js"></script>
<script src="data/series4-scientists-learn.js"></script>  <!-- 신규 -->

<!-- engine 영역 -->
<script src="engine/scientists-learn.js"></script>  <!-- 신규 -->
```

위치는 시리즈 11의 `series11-math-learn.js` / `engine/math-learn.js` 등록 위치 바로 다음에 추가.

---

## 8. detectives-B.js (또는 시리즈 4 그리드 빌더 파일) 수정

`startScientists(caseId)` 함수에서 사건 1 클리어 후 학습 모달이 자동 열리도록.

```javascript
function startScientists(caseId) {
  const story = SCIENTISTS_STORY[caseId];
  if (!story) {
    console.error("[scientists] story not found:", caseId);
    return;
  }
  
  // 기존 스토리 진행 로직 ...
  
  // ending 후처리에서 학습 모달 자동 호출
  onEndingComplete: () => {
    if (story.learnRef) {
      openScientistsLearn(story.learnRef);  // 자동 학습 모달
    }
    // caseQuiz는 학습 모달 닫은 후 호출
  }
}
```

→ 정확한 구현은 시리즈 11의 `startMath()` 함수를 mirror.

---

## 9. 검증 체크리스트

각 단계 완료 후 콘솔에서 다음 확인:

### 9-1. 데이터 로드 검증
```javascript
typeof SCIENTISTS_STORY                   // "object"
SCIENTISTS_STORY[1].title                  // "落ちる林檎の真実"
SCIENTISTS_STORY[1].steps.length           // 6
SCIENTISTS_STORY[1].caseQuiz.length        // 5
SCIENTISTS_STORY[1].learnRef               // "scientists_case01"

typeof SCIENTISTS_LEARN                    // "object"
SCIENTISTS_LEARN.scientists_case01         // 객체
SCIENTISTS_LEARN.scientists_case01.flashcards.length  // 10
SCIENTISTS_LEARN.scientists_case01.exercises.length    // 10
SCIENTISTS_LEARN.scientists_case01.diagrams.length     // 4
```

### 9-2. 엔진 함수 검증
```javascript
typeof startScientists                     // "function"
typeof openScientistsLearn                 // "function"
typeof renderScientistsLearnTabs           // "function"
```

### 9-3. 시각 검증 (브라우저)

- [ ] 시리즈 4 챕터 그리드에서 사건 1 카드 클릭 → intro 화면
- [ ] intro에서 林檎博士 등장, ヒナタ 자연스럽게 합류
- [ ] 6단계 step 모두 정상 진행, 정답 선택 시 다음 단계 진행
- [ ] 오답 선택 시 힌트 표시 후 재선택 가능
- [ ] step6 정답 후 ending 표시
- [ ] ending 「学習資料を開く」 클릭 시 학습 모달 열림
- [ ] 학습 모달 6탭 모두 정상 렌더링
- [ ] SVG 도해 4개 모두 표시
- [ ] 暗記 카드 10장 뒤집기 동작
- [ ] 객관식 10문제 풀이 + 정답 표시
- [ ] 학습 모달 닫기 후 caseQuiz 5문제 진행
- [ ] caseQuiz 클리어 후 별점 표시 + 챕터 그리드 복귀
- [ ] 사건 1 클리어 마크 표시 (`scientistsCleared[1] = true`)

### 9-4. 회귀 테스트

- [ ] 시리즈 1~3 정상 (특히 시리즈 3, 자녀 사용 중)
- [ ] 시리즈 5~11 정상
- [ ] 영어 학습 탭 정상
- [ ] 채팅 기능 정상 (Bundle G까지)
- [ ] 시리즈 4 사건 2~10은 placeholder 그대로 (변경 없음)

---

## 10. 절대 하지 말 것

| 금지 | 이유 |
|---|---|
| `SCIENTISTS_STORY[2]~[10]` 수정 | 사건 1 작업이라 다른 사건 placeholder 보존 |
| `data/series3-science.js` 수정 | 자녀 사용 중인 시리즈 3 untouched |
| `engine/learn-features.js` 큰 폭 리팩터링 | 회귀 위험 (시리즈 10·11에 영향) |
| 채팅 시스템 (`chat-*.js`, `functions/`) 수정 | 이번 작업과 무관, Firebase 영향 위험 |
| `manifest.json`·`sw.js` 수정 | PWA 동작 위험 |
| `assets/`·`data/images.js` 수정 | 자산 통합은 §SERIES4_NEW_CREATION에서 완료됨 |
| 실명 「ニュートン」을 林檎博士 대사·인격으로 사용 | 가상 캐릭터 정체성 유지 |

---

## 11. 작업 순서 (Step-by-Step)

silent failure 방지를 위해 단계별 진행:

```
Step 1: 시리즈 11 학습 자료 시스템 정독
  - data/series11-math-learn.js
  - engine/math-learn.js
  - index.html의 시리즈 11 통합 위치
  → 정확한 패턴 파악

Step 2: data/series4-scientists.js 사건 1 갱신
  - SCIENTISTS_STORY[1] 만 교체
  - 사건 2~10 placeholder 그대로
  - 콘솔 검증: SCIENTISTS_STORY[1].title 확인

Step 3: data/series4-scientists-learn.js 신규 작성
  - SCIENTISTS_LEARN 변수 정의
  - scientists_case01 키만 채움
  - 콘솔 검증: SCIENTISTS_LEARN.scientists_case01.flashcards.length === 10

Step 4: engine/scientists-learn.js 신규 작성 (math-learn.js mirror)
  - 함수 시그니처는 §7-3 참조
  - 콘솔 검증: typeof openScientistsLearn === "function"

Step 5: index.html 스크립트 등록
  - 시리즈 11 등록 위치 바로 아래
  - 새로고침 후 콘솔 에러 없음 확인

Step 6: detectives-B.js (또는 해당 파일)에서 startScientists의 ending 후 학습 모달 호출
  - 시리즈 11 startMath와 동일 패턴

Step 7: 브라우저 시각 검증 (§9-3 체크리스트)

Step 8: 회귀 테스트 (§9-4 체크리스트)

Step 9: git commit + push
  - commit msg 예: "feat(series04/case01): add Newton/gravity content with learn modal"

Step 10: 완료 보고 (사용자에게)
  - 수정/신규 파일 목록
  - 콘솔 검증 결과
  - 시각 검증 결과
  - 회귀 테스트 결과
  - commit hash
```

---

## 12. 자녀에게 도달하는 순간

작업 push 완료 후 자녀 측 PWA Service Worker 갱신:

1. 자녀가 ハルゲーム 다음 실행 시 자동 업데이트
2. 시리즈 4 「偉人科学者ファイル」 카드 → 사건 1 「落ちる林檎の真実」 클릭
3. 林檎博士와의 첫 만남 → 「動かない林檎」미스터리 → 만유인력 학습
4. 5/15 도쿄 방문 시 자녀가 「お父さん、あの林檎博士の事件、面白かったよ!」 라고 말할 가능성

→ 단순 학습 게임이 아니라 「발견의 즐거움」 을 자녀에게 전하는 콘텐츠

---

## 13. 다음 작업 예고

이 명세서 적용 완료 후:

```
SERIES4_CASE02_SPEC.md  ← 사건 2 「時間を操る秘密 (アイン教授·相対性理論)」
  - 시간 지연·길이 수축 (어린이 친화적으로)
  - シラガアイン 교수 캐릭터 정립
  - 학습 자료 6섹션
  - caseQuiz 5문제
```

이후 사건 3~10도 같은 패턴으로 1개씩 추가. 각 사건 완성마다 push → 자녀에게 점진적으로 전달.

---

## 14. 위탁 명령 (Claude Code에 입력)

```
SERIES4_CONTENT_SPEC.md를 정독하고, 시리즈 4 사건 1 「落ちる林檎の真実」 
본격 콘텐츠를 작성해줘.

작업 순서는 §11 단계대로 진행하고, 각 단계마다 §9의 콘솔 검증 후 
다음 단계로 넘어가. 시리즈 11(数学)의 학습 자료 시스템 (data/series11-math-learn.js, 
engine/math-learn.js)을 정확히 mirror해서 engine/scientists-learn.js를 새로 만들어줘.

회귀 테스트(시리즈 1~3, 5~11 + 영어학습 + 채팅)를 push 전에 반드시 수행. 
시리즈 3(科学探偵)는 자녀가 사용 중이므로 절대 건드리지 말 것.

사건 1 외의 placeholder (사건 2~10)는 그대로 두고, 사건 1만 본격 콘텐츠로 채워줘.

데이터 양이 많으니 Step 2~5는 한 번에 한 파일씩 작성하고, 
파일 작성 직후 콘솔 검증을 해서 silent failure를 방지해줘.
```

---

**END OF SPEC**

이 명세서는 시리즈 4 본격 콘텐츠의 **첫 번째 산출물** 입니다. 사건 2~10은 각각 별도 명세서에서 다루며, 본 명세서가 학습 자료 시스템(`engine/scientists-learn.js`, `data/series4-scientists-learn.js`)을 처음 도입하므로, 이후 사건들은 이 시스템 위에 데이터만 추가하면 됩니다.
