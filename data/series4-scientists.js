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
    comingSoon: true,
    intro: [],
    steps: [],
    note: null,
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
