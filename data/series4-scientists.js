/* data/series4-scientists.js — 시리즈 4 偉人科学者ファイル (placeholder skeleton)
 *
 * Schema mirrors data/series11-math.js (MATH_STORY pattern).
 * All 10 chapters are placeholders (comingSoon: true). Story content,
 * suspects, and learn materials will be added in SERIES4_CONTENT_SPEC.md
 * (next phase). For now the goal is: tab + grid + 10 cards + 24 assets
 * wired up, no console errors, other series untouched.
 *
 * 라인업:
 *   1. 🍎  落ちる林檎の真実      (ringo_hakase, 万有引力·三法則)
 *   2. ⏰  時間を操る秘密         (shiraga_ein,  相対性理論)
 *   3. ✨  光る石の秘密           (hikari_curie, 放射能)
 *   4. 🐦  島々の鳥たち           (darwin_voyager, 進化論)
 *   5. 🦠  見えない敵の正体       (pasteur_micro, 細菌学)
 *   6. 🌱  エンドウ豆の法則       (mendel_pea, 遺伝法則)
 *   7. 🔭  天空の真実             (galileo_telescope, 天体観測)
 *   8. ⚡  電気と磁気の関係       (faraday_coil, 電磁気学)
 *   9. ⚛️  原子の中の世界         (bohr_atom, 原子模型)
 *  10. 🌌  偉人たちの調和 (보스)   (togo_kenja, 종합)
 */

// Series 4 character mapping: ペンタ wears the safari-hat variant only
// inside this series; everywhere else CHAR_IMAGES.penta is the default.
// All other character keys fall through to CHAR_IMAGES.
const SCIENTISTS_CHARS = Object.assign({}, CHAR_IMAGES, {
  penta: CHAR_IMAGES.penta_series04,
});

// Series 4 backgrounds are already registered in data/images.js under
// the bg_* keys; alias kept for symmetry with other series modules.
const SCIENTISTS_SCENES = SCENE_IMAGES;

// Chapter-card illustration uses the chapter's BACKGROUND scene
// (landscape, cover-friendly) — same visual pattern as series 9
// (MON_CASE_IMAGES are case-art base64 illustrations). NPC portraits
// (ringo_hakase etc.) stay in CHAR_IMAGES and are used during case
// flow via SCIENTISTS_STORY[i].charKey, not on the chapter card.
const SCIENTISTS_CASE_IMAGES = {
  1:  SCENE_IMAGES.bg_ch01_apple,
  2:  SCENE_IMAGES.bg_ch02_blackboard,
  3:  SCENE_IMAGES.bg_ch03_radium,
  4:  SCENE_IMAGES.bg_ch04_beagle,
  5:  SCENE_IMAGES.bg_ch05_microbiology,
  6:  SCENE_IMAGES.bg_ch06_monastery,
  7:  SCENE_IMAGES.bg_ch07_observatory,
  8:  SCENE_IMAGES.bg_ch08_electricity,
  9:  SCENE_IMAGES.bg_ch09_physics,
  10: SCENE_IMAGES.bg_ch10_boss,
};

const SCIENTISTS_STORY = [
  {
    id: 1, icon: '🍎',
    title: '落ちる林檎の真実',
    subtitle: '万有引力を発見した日',
    theme: '万有引力·三法則',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[1],
    charKey: 'ringo_hakase',
    sceneKey: 'bg_ch01_apple',
    comingSoon: false,
    learnRef: 'scientists_case01',
    intro: {
      title: '落ちる林檎の真実',
      subtitle: '万有引力を発見した日',
      bg: 'bg_ch01_apple',
      lines: [
        { speaker: 'narrator',     text: '秋の午後。林檎の香りが漂う、のどかな田舎の庭。' },
        { speaker: 'haru',         text: 'ここが噂の「林檎園」だね。' },
        { speaker: 'rio',          text: 'わぁ、林檎の木がいっぱい!甘い匂い〜!' },
        { speaker: 'hinata',       text: '林檎博士の研究所です。私、博士の助手として時々お手伝いをしているんです。' },
        { speaker: 'rio',          text: 'えっ、ヒナタちゃん、博士のこと知ってるの!?' },
        { speaker: 'hinata',       text: 'はい。今日は皆さんを紹介しようと思って、お呼びしました。' },
        { speaker: 'ringo_hakase', text: 'ほっほっ、よう来たのう。儂が林檎博士じゃ。' },
        { speaker: 'haru',         text: 'はじめまして、ハルです。' },
        { speaker: 'rio',          text: 'リオでーす!博士、その林檎、食べていい?' },
        { speaker: 'ringo_hakase', text: 'ふむふむ、元気な子じゃのう。じゃが、今日はちょっと困った事があってのう…' },
        { speaker: 'ringo_hakase', text: '見ておくれ、あの一番奥の林檎の木を。' },
        { speaker: 'narrator',     text: '博士の指す方を見ると——一つの林檎が、空中で静止していた。' },
        { speaker: 'rio',          text: 'ええっ!? 林檎が…浮いてる!?' },
        { speaker: 'haru',         text: '落ちない…どうして?' },
        { speaker: 'hinata',       text: '他の林檎は普通に落ちているのに、あの一つだけが…' },
        { speaker: 'ringo_hakase', text: '儂にも分からんのじゃ。皆で、この謎を解いてはくれんかのう?' },
        { speaker: 'penta',        text: 'ペンッ!謎、解くペン!' },
      ],
      cta: '🔍 調査を 始める',
    },
    steps: [
      {
        id: 'step1',
        title: '🍎 STEP 1: 他の林檎の木を 調べる',
        bg: 'bg_ch01_apple',
        question: 'まず、他の林檎の木はどうなっているか調べよう。何を確認する?',
        options: [
          {
            label: '他の林檎が普通に落ちるか確認する',
            isCorrect: true,
            response: [
              { speaker: 'rio',    text: '他の6本の木は、林檎がちゃんと落ちてるよ!' },
              { speaker: 'haru',   text: 'つまり、あの一つの林檎だけが特別な状態にあるってことだね。' },
              { speaker: 'hinata', text: '比較対象が確認できました。次に進みましょう。' },
            ],
          },
          {
            label: '林檎の木の高さを測る',
            isCorrect: false,
            response: [
              { speaker: 'haru', text: '高さは関係ないかも。落ちる/落ちないの違いを先に調べよう。' },
            ],
          },
          {
            label: '林檎を食べてみる',
            isCorrect: false,
            response: [
              { speaker: 'rio',          text: 'あ、それいいね!' },
              { speaker: 'haru',         text: 'リオ、調査が先だよ…' },
              { speaker: 'ringo_hakase', text: 'ほっほっ、後でいくらでも食べてよいぞ。まずは謎を解こうかのう。' },
            ],
          },
        ],
      },
      {
        id: 'step2',
        title: '🌀 STEP 2: 浮いている林檎に 近づく',
        bg: 'bg_ch01_apple',
        question: '浮いている林檎に近づいた。何に注目する?',
        options: [
          {
            label: '周囲の空気を観察する',
            isCorrect: true,
            response: [
              { speaker: 'haru', text: '…林檎の周りの空気が、わずかに振動してる気がする。' },
              { speaker: 'rio',  text: 'えっ、本当?' },
              { speaker: 'haru', text: '目に見えない「何か」が働いてるかもしれない。' },
            ],
          },
          {
            label: '林檎を引っ張ってみる',
            isCorrect: false,
            response: [
              { speaker: 'ringo_hakase', text: 'ふむ、それは少し危ないのう。先に観察するのがよいぞ。' },
            ],
          },
          {
            label: '林檎の色を見る',
            isCorrect: false,
            response: [
              { speaker: 'haru', text: '色は普通の赤い林檎だね。手がかりにはならないかな。' },
            ],
          },
        ],
      },
      {
        id: 'step3',
        title: '⬆ STEP 3: 木の 上の方を 見上げる',
        bg: 'bg_ch01_apple',
        question: 'ヒナタが木の上を見上げた。何が見える?',
        options: [
          {
            label: '木の上の枝に小さな黒い箱がある',
            isCorrect: true,
            response: [
              { speaker: 'hinata',       text: 'あれ…枝に小さな黒い箱がついています。' },
              { speaker: 'haru',         text: '人工的な装置だね。誰かが取り付けたのかな。' },
              { speaker: 'rio',          text: '博士が知ってるかも!' },
              { speaker: 'ringo_hakase', text: '…ふむふむ、儂は何も言わんぞ。皆で調べてみるのじゃ。' },
            ],
          },
          {
            label: '葉っぱの色を確認する',
            isCorrect: false,
            response: [
              { speaker: 'hinata', text: '葉っぱは普通の秋の色です…手がかりにはならなさそう。' },
            ],
          },
        ],
      },
      {
        id: 'step4',
        title: '📓 STEP 4: 庭の 机を 調べる',
        bg: 'bg_ch01_apple',
        question: '庭の片隅にある博士の机を調べる。何を見る?',
        options: [
          {
            label: '実験ノートを開く',
            isCorrect: true,
            response: [
              { speaker: 'haru',         text: '博士のノートだ。…「重力に挑戦する実験」って書いてある。' },
              { speaker: 'hinata',       text: '重力に挑戦…つまり、林檎を落ちなくする実験ですね!' },
              { speaker: 'rio',          text: '博士、やっぱり何か仕掛けてたんだ!' },
              { speaker: 'ringo_hakase', text: 'ほっほっ、見つかってしまったのう…' },
            ],
          },
          {
            label: 'ペンと紙だけ見る',
            isCorrect: false,
            response: [
              { speaker: 'haru', text: 'ペンと紙だけじゃ何も分からないね。もっと詳しく調べよう。' },
            ],
          },
          {
            label: '机の上の磁石を持ち上げる',
            isCorrect: false,
            response: [
              { speaker: 'rio',  text: '磁石!?なんで博士が磁石を持ってるの?' },
              { speaker: 'haru', text: 'これも手がかりかもしれない…でも、まずはノートを読もう。' },
            ],
          },
        ],
      },
      {
        id: 'step5',
        title: '🔍 STEP 5: 林檎を もう一度 よく 見る',
        bg: 'bg_ch01_apple',
        question: 'リオがじっくり林檎を観察した。何に気づく?',
        options: [
          {
            label: '林檎の表面に小さな金属片がある',
            isCorrect: true,
            response: [
              { speaker: 'rio',    text: 'あっ!林檎の中に何か金属みたいなのが見える!' },
              { speaker: 'haru',   text: '金属…さっきの磁石と関係があるかもしれない。' },
              { speaker: 'hinata', text: 'もしかして、林檎の中に磁石が入っていて、木の上の黒い箱も磁石だとしたら——' },
              { speaker: 'haru',   text: '同じ極同士の磁石が反発する力で、林檎を浮かせている?' },
            ],
          },
          {
            label: '林檎の重さを推測する',
            isCorrect: false,
            response: [
              { speaker: 'rio', text: 'うーん、見ただけじゃ重さは分からないなぁ。' },
            ],
          },
        ],
      },
      {
        id: 'step6',
        title: '🧩 STEP 6: 推理を 組み立てる',
        bg: 'bg_ch01_apple',
        question: '全ての手がかりが揃った。博士にどう伝える?',
        options: [
          {
            label: '「林檎の中の磁石と、木の上の磁石の反発力で浮かせている」',
            isCorrect: true,
            response: [
              { speaker: 'ringo_hakase', text: 'ほっほっ、見事じゃのう!まさに正解じゃ!' },
              { speaker: 'ringo_hakase', text: 'あの林檎の中には小さな強力磁石が、木の上には同じ極の大きな磁石が仕掛けてある。' },
              { speaker: 'ringo_hakase', text: '磁石の反発力と、地球の引力——つまり万有引力——が、ちょうど釣り合っておるのじゃ。' },
              { speaker: 'haru',         text: '落ちない=引力がない、じゃなくて、力が釣り合ってるってことか。' },
              { speaker: 'hinata',       text: '重力は確かに働いているけど、別の力で打ち消されているんですね。' },
              { speaker: 'rio',          text: 'なるほど〜!すごい実験!' },
              { speaker: 'ringo_hakase', text: '皆、林檎が落ちる理由——「万有引力」を、これから一緒に学ぼうかのう。' },
            ],
          },
          {
            label: '「林檎が軽いから浮いている」',
            isCorrect: false,
            response: [
              { speaker: 'ringo_hakase', text: 'ふむ、それは違うのう。重さに関係なく、物は地球に引っ張られておるのじゃ。' },
            ],
          },
          {
            label: '「風が下から吹いている」',
            isCorrect: false,
            response: [
              { speaker: 'haru', text: '風だったら他の林檎も影響を受けるはず。違うかな。' },
            ],
          },
        ],
      },
    ],
    ending: {
      bg: 'bg_ch01_apple',
      lines: [
        { speaker: 'ringo_hakase', text: '皆のおかげで、儂の実験も無事に説明できたのう。' },
        { speaker: 'ringo_hakase', text: 'では、これから万有引力について、もう少し詳しく学んでみるかのう?' },
        { speaker: 'haru',         text: 'うん、もっと知りたい!' },
        { speaker: 'hinata',       text: '私も、改めて整理したいです。' },
        { speaker: 'rio',          text: '学んだら、林檎食べていい?' },
        { speaker: 'ringo_hakase', text: 'ほっほっ、約束じゃ。' },
        { speaker: 'penta',        text: 'ペンッ!勉強、ペン!' },
      ],
      cta: '📚 学習資料を 開く',
    },
    caseQuiz: [
      {
        q: '事件 1 で 林檎が 浮いていた 本当の 理由は?',
        options: [
          '重力が なかった',
          '風が 吹いていた',
          '磁石の 反発力と 重力が 釣り合っていた',
          '林檎が 軽すぎた',
        ],
        correct: 2,
      },
      {
        q: '宇宙の すべての 物が お互いに 引き合う 力を 何という?',
        options: [
          '電磁力',
          '万有引力',
          '摩擦力',
          '弾性力',
        ],
        correct: 1,
      },
      {
        q: 'ニュートンの 第一法則は 何の 法則?',
        options: [
          '慣性の 法則',
          '運動の 法則',
          '作用·反作用の 法則',
          '万有引力の 法則',
        ],
        correct: 0,
      },
      {
        q: '1kg の 物体の 地球上での 重さは 約何 N? (g ≈ 9.8 m/s²)',
        options: [
          '1 N',
          '9.8 N',
          '98 N',
          '0.98 N',
        ],
        correct: 1,
      },
      {
        q: 'アイザック·ニュートンが 生まれた 国は?',
        options: [
          'ドイツ',
          'イタリア',
          'イギリス',
          'フランス',
        ],
        correct: 2,
      },
    ],
    note: { title: '第1事件 落ちる 林檎', desc: '磁石の 反発力と 万有引力の 釣り合いで 浮いていた 林檎。 ニュートンの 三法則と 万有引力を 学んだ 第一歩。' },
  },
  {
    id: 2, icon: '⏰',
    title: '時間を操る秘密',
    subtitle: '光と時間の関係',
    theme: '相対性理論',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[2],
    charKey: 'shiraga_ein',
    sceneKey: 'bg_ch02_blackboard',
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
  {
    id: 3, icon: '✨',
    title: '光る石の秘密',
    subtitle: '見えない力の発見',
    theme: '放射能',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[3],
    charKey: 'hikari_curie',
    sceneKey: 'bg_ch03_radium',
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
  {
    id: 4, icon: '🐦',
    title: '島々の鳥たち',
    subtitle: '進化を辿る航海',
    theme: '進化論',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[4],
    charKey: 'darwin_voyager',
    sceneKey: 'bg_ch04_beagle',
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
  {
    id: 5, icon: '🦠',
    title: '見えない敵の正体',
    subtitle: '微生物との戦い',
    theme: '細菌学',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[5],
    charKey: 'pasteur_micro',
    sceneKey: 'bg_ch05_microbiology',
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
  {
    id: 6, icon: '🌱',
    title: 'エンドウ豆の法則',
    subtitle: '受け継がれる特徴',
    theme: '遺伝法則',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[6],
    charKey: 'mendel_pea',
    sceneKey: 'bg_ch06_monastery',
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
  {
    id: 7, icon: '🔭',
    title: '天空の真実',
    subtitle: '望遠鏡が映した宇宙',
    theme: '天体観測',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[7],
    charKey: 'galileo_telescope',
    sceneKey: 'bg_ch07_observatory',
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
  {
    id: 8, icon: '⚡',
    title: '電気と磁気の関係',
    subtitle: '見えない力の正体',
    theme: '電磁気学',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[8],
    charKey: 'faraday_coil',
    sceneKey: 'bg_ch08_electricity',
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
  {
    id: 9, icon: '⚛️',
    title: '原子の中の世界',
    subtitle: '電子の軌道',
    theme: '原子模型',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[9],
    charKey: 'bohr_atom',
    sceneKey: 'bg_ch09_physics',
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
  {
    id: 10, icon: '🌌',
    title: '偉人たちの調和',
    subtitle: 'すべての発見を繋ぐ謎',
    theme: '종합 (보스)',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[10],
    charKey: 'togo_kenja',
    sceneKey: 'bg_ch10_boss',
    isBoss: true,
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
  },
];
