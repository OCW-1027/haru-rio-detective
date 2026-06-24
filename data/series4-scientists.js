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
