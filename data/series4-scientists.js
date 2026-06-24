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
    subtitle: '動く時計は ゆっくり 進む',
    theme: '特殊相対性理論·時間の遅れ',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[2],
    charKey: 'shiraga_ein',
    sceneKey: 'bg_ch02_blackboard',
    comingSoon: false,
    learnRef: 'scientists_case02',
    intro: {
      title: '時間を操る秘密',
      subtitle: '動く時計は ゆっくり 進む',
      bg: 'bg_ch02_blackboard',
      lines: [
        { speaker: 'narrator',    text: '林檎博士の紹介で、隣町の物理学者を訪ねた。' },
        { speaker: 'hinata',      text: 'こちらが アイン教授の 研究所です。' },
        { speaker: 'rio',         text: 'うわぁ、黒板だらけ!数字いっぱい〜!' },
        { speaker: 'haru',        text: 'これ全部、物理の 公式…?' },
        { speaker: 'shiraga_ein', text: 'ほっほ、よう来たな、若き探偵たちよ。わしが アイン教授じゃ。' },
        { speaker: 'haru',        text: 'はじめまして。林檎博士から お話を 聞いて 来ました。' },
        { speaker: 'shiraga_ein', text: 'ふむふむ、ちょうど 困った 事が あってのう…' },
        { speaker: 'shiraga_ein', text: '見て おくれ、この 二つの 時計を。' },
        { speaker: 'narrator',    text: '机の上に、まったく 同じ モデルの 懐中時計が 二つ 並んでいた。' },
        { speaker: 'shiraga_ein', text: '同じ時計じゃ。同じ日に 同じ工場で 作られた。じゃが…' },
        { speaker: 'hinata',      text: 'え… 時刻が ずれています!時計Bが 約30秒 遅れている。' },
        { speaker: 'rio',         text: 'ええっ、なんで!?' },
        { speaker: 'shiraga_ein', text: 'そうなのじゃ。毎日 30秒から 60秒ずつ 遅れていく。' },
        { speaker: 'shiraga_ein', text: 'わしは 何も していない。じゃが 時計が 遅れるのじゃ。' },
        { speaker: 'haru',        text: '不思議だ… 同じ時計なのに、なぜ?' },
        { speaker: 'shiraga_ein', text: '皆で この謎を 解いて はくれぬか?ふむ、興味深い 問題で あろう。' },
        { speaker: 'penta',       text: 'ペンッ!時間の 謎、ペン!' },
      ],
      cta: '🔍 調査を 始める',
    },
    steps: [
      {
        id: 'step1',
        title: '⏰ STEP 1: 二つの 時計を 比べる',
        bg: 'bg_ch02_blackboard',
        question: 'まず、二つの時計を よく 比べてみよう。何を 確認する?',
        options: [
          {
            label: '外観·モデル·製造元が 同じか 確認する',
            isCorrect: true,
            response: [
              { speaker: 'rio',    text: 'うん、見た目は 完全に 同じだよ!' },
              { speaker: 'haru',   text: '同じ メーカー、同じ モデル、同じ 製造日…' },
              { speaker: 'hinata', text: '物理的な 違いは ありません。じゃあ、なぜ 時刻が ずれる?' },
            ],
          },
          {
            label: '時計の 重さを 測る',
            isCorrect: false,
            response: [
              { speaker: 'haru', text: '重さは 同じだよ。製造元も 同じだから。' },
            ],
          },
          {
            label: '時計を 分解する',
            isCorrect: false,
            response: [
              { speaker: 'shiraga_ein', text: 'ふむ、分解は 最後の 手段じゃ。まずは 観察を。' },
            ],
          },
        ],
      },
      {
        id: 'step2',
        title: '👀 STEP 2: 時計の 置き場所を 観察',
        bg: 'bg_ch02_blackboard',
        question: 'ハルが 二つの 時計の 置き場所に 注目した。何が 違う?',
        options: [
          {
            label: '時計Bは 円い 板の 上に 置かれている',
            isCorrect: true,
            response: [
              { speaker: 'haru',   text: '時計Aは 普通に 机の 上だけど、時計Bは 円い 板の 上に 置いてある。' },
              { speaker: 'rio',    text: '本当だ!回転 木馬みたいな 板!' },
              { speaker: 'hinata', text: 'これは… 何かの 装置かもしれません。' },
            ],
          },
          {
            label: '時計Aの 場所だけ 確認',
            isCorrect: false,
            response: [
              { speaker: 'haru', text: '両方を 比べないと 差が わからないよ。' },
            ],
          },
        ],
      },
      {
        id: 'step3',
        title: '🌀 STEP 3: 円い 板を よく 見る',
        bg: 'bg_ch02_blackboard',
        question: 'ヒナタが 円い 板を じっくり 観察した。何に 気づく?',
        options: [
          {
            label: '板が ゆっくり 回転している',
            isCorrect: true,
            response: [
              { speaker: 'hinata', text: 'あれ… 板が ゆっくり 回っています!' },
              { speaker: 'rio',    text: 'ホント!見えない くらい ゆっくりだけど、回ってる!' },
              { speaker: 'haru',   text: '板の 下に… モーターが ある!' },
              { speaker: 'hinata', text: '時計Bは 動いている 板の 上に 乗っていることに なります。' },
            ],
          },
          {
            label: '板の 色を 確認する',
            isCorrect: false,
            response: [
              { speaker: 'hinata', text: '色は 関係 ないと 思います… もっと 動きに 注目しましょう。' },
            ],
          },
        ],
      },
      {
        id: 'step4',
        title: '📓 STEP 4: 教授の ノートを 読む',
        bg: 'bg_ch02_blackboard',
        question: '机の 上の ノートを 開いた。何が 書いてある?',
        options: [
          {
            label: '「時間と 速度の 実験」と 書かれている',
            isCorrect: true,
            response: [
              { speaker: 'haru',        text: '「時間と 速度の 実験」… 教授、これは?' },
              { speaker: 'hinata',      text: '時間と 速度… 速く 動く 時計の 時間が 変わる?' },
              { speaker: 'shiraga_ein', text: 'ほっほっ、もう ほとんど 見抜いておるな。続けるが よい。' },
            ],
          },
          {
            label: 'ノートを 閉じて おく',
            isCorrect: false,
            response: [
              { speaker: 'haru', text: '手がかりは ノートに ありそう。読んでみよう。' },
            ],
          },
        ],
      },
      {
        id: 'step5',
        title: '📏 STEP 5: 板の 回転速度を 測る',
        bg: 'bg_ch02_blackboard',
        question: '板が どれくらいの 速さで 回っているか 測ろう。',
        options: [
          {
            label: '回転計で 測る — RPM=1000',
            isCorrect: true,
            response: [
              { speaker: 'rio',    text: '1分間に 1000回も 回ってる!めっちゃ 速い!' },
              { speaker: 'haru',   text: '時計Bは 物凄い 速さで 動いていた。これが 30秒の 遅れの 原因?' },
              { speaker: 'hinata', text: '速く 動く 物の 時間が 遅れる…?ものすごく 不思議な 現象です。' },
            ],
          },
          {
            label: '回転を 止めて 測る',
            isCorrect: false,
            response: [
              { speaker: 'shiraga_ein', text: '止めて しまっては 観察の 意味が なくなってしまうぞ。回したまま 測るのじゃ。' },
            ],
          },
        ],
      },
      {
        id: 'step6',
        title: '🧩 STEP 6: 推理を 組み立てる',
        bg: 'bg_ch02_blackboard',
        question: '全ての 手がかりが 揃った。教授に どう 伝える?',
        options: [
          {
            label: '「速く 動く 時計は ゆっくり 進む。これが 時間の 遅れ」',
            isCorrect: true,
            response: [
              { speaker: 'shiraga_ein', text: 'ふむ、見事じゃ!まさに 正解で あろう。' },
              { speaker: 'shiraga_ein', text: 'これが わしの 研究 — 特殊相対性理論じゃ。物が 速く 動くほど、その 時間は ゆっくり 進む。' },
              { speaker: 'shiraga_ein', text: '時計Bは 板の 上で 高速で 回転していた。だから 時計Aより 時間が ゆっくり 進んだのじゃ。' },
              { speaker: 'hinata',      text: '時間は 絶対 ではなく、速度によって 変わる…!' },
              { speaker: 'haru',        text: 'まさに 時間を 操る 秘密だった。' },
              { speaker: 'rio',         text: 'すごい!じゃあ もし 光の 速さで 動けば?' },
              { speaker: 'shiraga_ein', text: 'ふむふむ、興味深い 質問じゃ。光の 速さに 近づくほど、時間は 限りなく ゆっくりに なる。それが 宇宙の 秘密じゃ。' },
            ],
          },
          {
            label: '「時計Bが 古いから」',
            isCorrect: false,
            response: [
              { speaker: 'shiraga_ein', text: 'ふむ、同じ 製造日であろう?それは 違うのう。' },
            ],
          },
          {
            label: '「板が 磁気を 出している」',
            isCorrect: false,
            response: [
              { speaker: 'haru', text: '磁気だったら 一定で ずれるはず。毎日 違うのは おかしい。' },
            ],
          },
        ],
      },
    ],
    ending: {
      bg: 'bg_ch02_blackboard',
      lines: [
        { speaker: 'shiraga_ein', text: '皆の おかげで、わしの 実験も 説明できた。ありがとう のう。' },
        { speaker: 'shiraga_ein', text: 'では、相対性理論について もう 少し 学んでみるかな?' },
        { speaker: 'hinata',      text: 'はい!E=mc² の 公式も 気に なります。' },
        { speaker: 'rio',         text: '光の 速さって どれくらい 速いの?' },
        { speaker: 'haru',        text: '時間が 変わるって 普段は 感じないけど、宇宙の 真実だね。' },
        { speaker: 'shiraga_ein', text: 'ふむふむ、興味深い 質問じゃ。さあ、一緒に 学ぼう。' },
        { speaker: 'penta',       text: 'ペンッ!時間の 勉強、ペン!' },
      ],
      cta: '📚 学習資料を 開く',
    },
    caseQuiz: [
      {
        q: '事件 2 で 時計B が 遅れていた 本当の 理由は?',
        options: [
          '時計B が 壊れていた',
          '高速 回転 する 円盤の 上に 置かれて 時間が 遅れた',
          'アイン教授 が 針を 動かした',
          '電池切れ',
        ],
        correct: 1,
      },
      {
        q: '速く 動く 物の 時間は どうなる?',
        options: ['速く 進む', 'ゆっくり 進む', '止まる', '逆に 戻る'],
        correct: 1,
      },
      {
        q: 'E = mc² の m は 何を 表す?',
        options: ['時間', '速度', '質量', '長さ'],
        correct: 2,
      },
      {
        q: '光の 速さ c は 約 何 km/秒?',
        options: ['3万', '30万', '300万', '3千万'],
        correct: 1,
      },
      {
        q: 'アインシュタインの 国籍は?',
        options: ['アメリカ', 'ドイツ', 'スイス', '全部 該当 (生涯で 移った)'],
        correct: 3,
      },
    ],
    note: { title: '第2事件 時間を 操る 秘密', desc: '高速 回転する 円盤の 上で 遅れた 時計。 アインシュタインの 特殊相対性理論 — 動く 物の 時間は ゆっくり 進む — を 学んだ 第二歩。' },
  },
  {
    id: 3, icon: '✨',
    title: '光る石の秘密',
    subtitle: '暗闇に 浮かぶ 不思議な 光',
    theme: '放射能·原子核·半減期',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[3],
    charKey: 'hikari_curie',
    sceneKey: 'bg_ch03_radium',
    comingSoon: false,
    learnRef: 'scientists_case03',
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
    steps: [
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
              { speaker: 'hinata',       text: '「新元素 発見?」と 書かれて います。夫人、これは…?' },
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
    ],
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
    note: { title: '第3事件 光る 石', desc: 'ラジウム の 放射能 — 原子核が 自然に 崩壊し 光と 放射線を 出す 現象。 キュリー 夫妻の 発見と、放射能の 正しい 理解·活用 を 学んだ 第三歩。' },
  },
  {
    id: 4, icon: '🐦',
    title: '島々の鳥たち',
    subtitle: '似ているけれど 違う鳥たちの 謎',
    theme: '進化論·自然選択·適應·変異·遺伝',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[4],
    charKey: 'darwin_voyager',
    sceneKey: 'bg_ch04_beagle',
    comingSoon: false,
    learnRef: 'scientists_case04',
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
    steps: [
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
              { speaker: 'rio',            text: 'A は すごく 太くて 大きい!ナッツ 割り みたいだね!' },
              { speaker: 'haru',           text: 'B は 細くて 真っ直ぐ、 C は 鋭く 尖って いる…' },
              { speaker: 'hinata',         text: 'D は 長くて 細い、 E は 普通の 大きさ。 5種類 全部 違います。' },
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
    ],
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
    caseQuiz: [
      {
        q: '事件 4 で 5種の フィンチの くちばしが 違う 理由は?',
        options: ['偶然', '各島の 食べ物に 自然選択で 適応した', '人間が 作った', '不思議な 力'],
        correct: 1,
      },
      {
        q: '自然選択を 発見した 人は?',
        options: ['ニュートン', 'ダーウィン', 'アインシュタイン', 'パスカル'],
        correct: 1,
      },
      {
        q: '進化の 3条件 ではない のは?',
        options: ['変異', '遺伝', '環境圧力', '目的'],
        correct: 3,
      },
      {
        q: 'ダーウィンが フィンチを 観察した 諸島は?',
        options: ['ハワイ', 'ガラパゴス', 'カナリア', 'マダガスカル'],
        correct: 1,
      },
      {
        q: '進化論の 核心 メッセージは?',
        options: ['強い 個体だけ 生き残る', '環境に 合う 個体が 生き残り 子孫を 残す', '進化には 目的が ある', '生物は 変化 しない'],
        correct: 1,
      },
    ],
    note: { title: '第4事件 島々の 鳥たち', desc: 'ガラ諸島 5種の フィンチ — 同じ 祖先から 環境に 合う くちばしへ 進化。 ダーウィンの 自然選択説 — 「強い 個体」 ではなく 「適応した 個体」 が 生き残る 自然の 法則 — を 学んだ 第四歩。' },
  },
  {
    id: 5, icon: '🦠',
    title: '見えない敵の正体',
    subtitle: 'スープは なぜ 腐るのか?',
    theme: '細菌·微生物·ワクチン·殺菌',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[5],
    charKey: 'pasteur_micro',
    sceneKey: 'bg_ch05_microbiology',
    comingSoon: false,
    learnRef: 'scientists_case05',
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
    steps: [
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
    ],
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
    caseQuiz: [
      {
        q: '事件 5 で 片方の スープだけ 腐った 理由は?',
        options: ['古かったから', '空気中の 微生物が 入ったから', 'ガラスが 違ったから', '塩が なかったから'],
        correct: 1,
      },
      {
        q: '白鳥の 首 フラスコが 否定した 古い 学説は?',
        options: ['進化論', '自然発生説', '万有引力', '相対性理論'],
        correct: 1,
      },
      {
        q: 'ワクチンの 原理は?',
        options: ['強い 病原菌を 注射', '弱めた 病原菌で 免疫を 作る', '微生物を 全滅', '抗生物質を 飲む'],
        correct: 1,
      },
      {
        q: '微生物 ではない のは?',
        options: ['細菌', 'カビ', 'ウイルス', '石'],
        correct: 3,
      },
      {
        q: '細菌学の 父と 呼ばれる 人は?',
        options: ['ダーウィン', 'パスツール', 'ニュートン', 'キュリー'],
        correct: 1,
      },
    ],
    note: { title: '第5事件 見えない 敵の 正体', desc: '白鳥の 首 フラスコ — 空気は 通すが 微生物は 遮断。 腐敗と 病気の 原因が 「自然発生」 では なく 目に 見えない 微生物 である ことを 証明した パスツールの 細菌学。 衛生·ワクチン·殺菌の 出発点を 学んだ 第五歩。' },
  },
  {
    id: 6, icon: '🌸',
    title: 'エンドウ豆の法則',
    subtitle: '消えた 白い 花は どこへ?',
    theme: '遺伝法則·優性劣性·分離の法則·遺伝子',
    bgm: 'mystery',
    illustration: SCIENTISTS_CASE_IMAGES[6],
    charKey: 'mendel_pea',
    sceneKey: 'bg_ch06_monastery',
    comingSoon: false,
    learnRef: 'scientists_case06',
    intro: {
      title: 'エンドウ豆の法則',
      subtitle: '消えた 白い 花は どこへ?',
      bg: 'bg_ch06_monastery',
      lines: [
        { speaker: 'narrator',   text: 'パスト博士の 紹介で、 静かな 修道院の 庭を 訪ねた。' },
        { speaker: 'hinata',     text: 'こちらが メンデルさんの 庭 です。 エンドウ豆が ずらり…' },
        { speaker: 'rio',        text: 'うわぁ、 すごい 数の 鉢! 何千 個も ある!' },
        { speaker: 'haru',       text: '紫の 花、 白い 花… それぞれ 札に 記録が ついてる。' },
        { speaker: 'mendel_pea', text: 'ようこそ。 私が メンデル じゃ。 ちょうど 不思議な 事が あってのう。' },
        { speaker: 'mendel_pea', text: 'この 記録を 見て ほしい。 私を ずっと 悩ませて いる 謎なのじゃ。' },
        { speaker: 'narrator',   text: 'メンデルが 古い 観察ノートを 開いた。' },
        { speaker: 'mendel_pea', text: '白い 花の 豆と、 紫の 花の 豆を かけ合わせた。 すると…' },
        { speaker: 'rio',        text: '子どもは… 全部 紫!? 白が 一つも ない!' },
        { speaker: 'haru',       text: '白い 花が 消えて しまった みたいだ…' },
        { speaker: 'mendel_pea', text: 'そう。 だが、 もっと 不思議な ことが 起きたのじゃ。' },
        { speaker: 'mendel_pea', text: 'その 紫の 子ども 同士を かけ合わせると — 孫の 代に、 白い 花が また 現れた!' },
        { speaker: 'hinata',     text: 'えっ、 消えた はずの 白が 戻ってきた…?' },
        { speaker: 'rio',        text: '魔法みたい! 白は どこに 隠れてたの?' },
        { speaker: 'mendel_pea', text: 'ふむ。 自然には 隠れた 法則が ある。 数えれば、 必ず 見えてくるのじゃ。' },
        { speaker: 'mendel_pea', text: '皆の 力で、 この 謎を 解いて くれるかのう?' },
        { speaker: 'penta',      text: 'ペンッ! 消えた 白い 花、 探すペン!' },
      ],
      cta: '🔍 調査を 始める',
    },
    steps: [
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
    ],
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
    caseQuiz: [
      {
        q: '事件 6 で 白い 花が 孫世代で 再び 現れた 理由は?',
        options: ['新しく できた', '白の 因子が 隠れて 伝わり 発現', '紫が 変わった', '魔法'],
        correct: 1,
      },
      {
        q: '孫世代 紫:白 の 割合は?',
        options: ['1:1', '2:1', '3:1', '1:3'],
        correct: 2,
      },
      {
        q: '強く 現れる 形質を 何という?',
        options: ['劣性', '優性', '純系', '分離'],
        correct: 1,
      },
      {
        q: '遺伝法則の 発見者は?',
        options: ['ダーウィン', 'メンデル', 'パスツール', 'キュリー'],
        correct: 1,
      },
      {
        q: '事件 6 の 核心 メッセージは?',
        options: ['形質は 消える', '隠れた 形質も 消えずに 伝わる', '全ての 子孫は 同じ', '色は 混ざる'],
        correct: 1,
      },
    ],
    note: { title: '第6事件 エンドウ豆の 法則', desc: '消えた 白い 花の 謎 — 優性の 裏に 隠れた 劣性の 因子は 消えずに 孫世代で 3:1で 復活。 8年間 何万 株を 数えて 発見した メンデルの 遺伝法則 を 学んだ 第六歩。' },
  },
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
    steps: [
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
    ],
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
    caseQuiz: [
      {
        q: '事件 7 で 木星の そばの 4つの 点の 正体は?',
        options: ['遠い 星', '木星を まわる 衛星', '彗星', '人工衛星'],
        correct: 1,
      },
      {
        q: '「すべての 天体が 地球を まわる」 という 旧説は?',
        options: ['地動説', '天動説', '進化論', '万有引力'],
        correct: 1,
      },
      {
        q: 'ガリレオが 使った 観測 道具は?',
        options: ['顕微鏡', '望遠鏡', '温度計', '羅針盤'],
        correct: 1,
      },
      {
        q: 'ガリレオが 重視した のは?',
        options: ['権威', '自分の 目の 観測·証拠', '多数決', '伝統'],
        correct: 1,
      },
      {
        q: '事件 7 の 核心 メッセージは?',
        options: ['常識は いつも 正しい', '観測·証拠が 常識を 更新する', '空は 変わらない', '道具は 不要'],
        correct: 1,
      },
    ],
    note: { title: '第7事件 天空の 真実', desc: '木星 そばの 4つの 点 — 木星を まわる 衛星。 「すべてが 地球を まわる」 を 反証し 地動説を 支えた 観測。 権威 ではなく 「自分の 目の 証拠」 を 重んじた ガリレオの 科学的 態度を 学んだ 第七歩。' },
  },
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
    steps: [
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
    ],
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
    caseQuiz: [
      {
        q: '事件 8 で 電池 なしで 電流が 流れた 理由は?',
        options: ['コイルが ひとりでに', '磁石を 動かして 磁場が 変化したから', '電線が 特別だから', '偶然'],
        correct: 1,
      },
      {
        q: '磁石を じっと 止めて おくと 電流は?',
        options: ['流れる', '流れない', '大きくなる', '逆に なる'],
        correct: 1,
      },
      {
        q: '磁場の 変化で 電流が 生まれる 現象は?',
        options: ['電磁誘導', '万有引力', '自然選択', '放射能'],
        correct: 0,
      },
      {
        q: '電磁誘導の 発見者は?',
        options: ['ニュートン', 'ファラデー', 'ガリレオ', 'メンデル'],
        correct: 1,
      },
      {
        q: '事件 8 の 核心 メッセージは?',
        options: ['磁石だけ あれば 良い', '磁場の 変化が 電流を 作る', '電気は 電池からだけ', 'コイルは 不要'],
        correct: 1,
      },
    ],
    note: { title: '第8事件 見えない 力の 正体', desc: '電池 なしで 流れた 電流 — 磁石を 動かして 磁場が 変化する とき コイルに 電流が 生まれる 電磁誘導。 すべての 発電の 原理であり、 「ある」 ではなく 「変わる」 が 鍵 である ことを 学んだ 第八歩。' },
  },
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
    steps: [
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
    ],
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
    caseQuiz: [
      {
        q: '事件 9 で 元素の 光が とびとび だった 理由は?',
        options: ['偶然', '電子が 決まった 層にだけ いる から', 'プリズムの 故障', '光が 弱いから'],
        correct: 1,
      },
      {
        q: '原子の 構造は?',
        options: ['空っぽ', '核 + まわりの 電子', '電子だけ', '核だけ'],
        correct: 1,
      },
      {
        q: 'ボーア 模型で 電子は?',
        options: ['どこにでも', '決まった 層にだけ', '核の 中に', '原子の 外に'],
        correct: 1,
      },
      {
        q: '原子 模型の 提案者は?',
        options: ['ファラデー', 'ボーア', 'ガリレオ', 'メンデル'],
        correct: 1,
      },
      {
        q: '事件 9 の 核心 メッセージは?',
        options: ['原子は 単純だ', '見えない 原子の 中にも 規則が ある', '光は 意味が ない', '元素は 皆 同じ'],
        correct: 1,
      },
    ],
    note: { title: '第9事件 原子の 中の 世界', desc: 'とびとびの 光 — 電子が 決まった 「層」 にだけ 存在し、 層を 移る とき 決まった 色の 光を 出す。 目に 見えない 原子の 中にも 美しい 規則が ある ことを 示した ボーアの 原子模型を 学んだ 第九歩。' },
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
