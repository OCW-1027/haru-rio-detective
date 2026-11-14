/* engine/scilab.js — 理科 実験室 (さわって 確かめる シミュレーター + 実験ノート)
 * 物理: 電気回路・凸レンズ・光の 屈折・ふりこ・斜面と エネルギー・電磁誘導
 * 化学: 化学変化と 質量・中和と pH   生物: 植物の 蒸散
 * 地学: 流水と 堆積・露点と 湿度・月の 満ち欠け・太陽の 日周運動
 * 各実験 = 実験ノート (目的・器具・予想 → 記録表・グラフ → 考察) + ミッション 3つ
 * 保存: State.v2.scilab = { done: {'実験:番号':1}, note: {実験: {p, rows, c}}, nb: {実験:1} }
 * 画面: pageSciLab (#slArea)。Dependencies: State, saveState, showPage, sfx, escapeHtml
 */
const SciLab = (function () {
  const $ = id => document.getElementById(id), esc = s => escapeHtml(String(s));
  const r2 = v => Math.round(v * 100) / 100, r1 = v => Math.round(v * 10) / 10;
  const D2R = Math.PI / 180;
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.scilab || (State.v2.scilab = {}); d.done = d.done || {}; d.note = d.note || {}; d.nb = d.nb || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  let raf = null; const timers = [];
  function stopAnim() { if (raf) cancelAnimationFrame(raf); raf = null; while (timers.length) clearTimeout(timers.pop()); }
  const later = (f, ms) => { timers.push(setTimeout(f, ms)); };

  const EXPS = [
    { id: 'circuit', g: '物理', icon: '🔋', name: '電気回路', sub: '直列・並列で 電流と 電圧は どう 変わる?', lv: '中2' },
    { id: 'lens', g: '物理', icon: '🔍', name: '凸レンズ', sub: '物体を 動かして 像の でき方を 見よう', lv: '中1' },
    { id: 'refract', g: '物理', icon: '🔦', name: '光の 屈折', sub: '空気と 水・ガラスの 境目で 光は どう 曲がる?', lv: '中1' },
    { id: 'pend', g: '物理', icon: '🕰️', name: 'ふりこ', sub: 'ストップウォッチで 10往復を はかろう', lv: '小5' },
    { id: 'slope', g: '物理', icon: '🎢', name: '斜面と エネルギー', sub: '小球を 転がして 木片を 動かそう', lv: '中3' },
    { id: 'chem', g: '化学', icon: '⚗️', name: '化学変化と 質量', sub: '金属を 加熱すると 重く なる? 質量保存の 法則', lv: '中2' },
    { id: 'induct', g: '物理', icon: '🧲', name: '電磁誘導', sub: '磁石を コイルに 出し入れして 電流を 作ろう', lv: '中2' },
    { id: 'neut', g: '化学', icon: '🧪', name: '中和と pH', sub: 'BTB液の 色を 見ながら 塩酸を 中和しよう', lv: '中3' },
    { id: 'transp', g: '生物', icon: '🌿', name: '植物の 蒸散', sub: '葉の 表・裏、どこから 水が 出ていく?', lv: '中1' },
    { id: 'sedi', g: '地学', icon: '🪨', name: '流水と 堆積', sub: '粒の 大きさと しずむ 速さ・地層の でき方', lv: '中1' },
    { id: 'dew', g: '地学', icon: '💧', name: '露点と 湿度', sub: 'コップに 水てきが つく 温度から 湿度を 求めよう', lv: '中2' },
    { id: 'moon', g: '地学', icon: '🌙', name: '月の 満ち欠け', sub: '月・地球・太陽の 位置と 見え方', lv: '中3' },
    { id: 'sky', g: '地学', icon: '☀️', name: '太陽の 日周運動', sub: '透明半球に 太陽の 位置を 記録しよう', lv: '中3' },
  ];
  const MISS = {
    circuit: ['直列つなぎで 回路の 電流を ちょうど 0.2A に しよう', '並列つなぎで 全体の 電流を 1A 以上に しよう', '直列つなぎで 抵抗①に かかる 電圧を ちょうど 3V に しよう'],
    lens: ['実物と 同じ 大きさの 実像を 作ろう', '像が できない (光が 平行に なる) 位置に 物体を 置こう', '虫めがねの ように、大きな 虚像を 作ろう'],
    refract: ['空気から 水へ、入射角 0° で 光を 当てよう (曲がる?)', '水から 空気へ 進む 光で 全反射を 起こそう', 'ガラスに 入る 光の 屈折角を ちょうど 30° (±0.5°) に しよう'],
    pend: ['周期 (1往復の 時間) を 2.0秒 に 近づけよう (±0.05秒)', '長さを 変えずに おもりの 重さだけ 変えて、周期を くらべよう', '長さ 0.25m と 1.00m の 両方で 周期を はかろう'],
    slope: ['木片を ちょうど 16cm 動かそう', '高さを 変えずに 角度だけ 変えて 2回 転がそう (速さは?)', '小球の 運動エネルギーが 0.2J を こえる 条件で 転がそう'],
    chem: ['銅 1.2g を 完全に 酸化させよう (質量が 変わらなく なるまで)', 'マグネシウムに 結びつく 酸素を ちょうど 0.4g に しよう', '質量保存: ふたを したまま 反応させて 質量を はかろう'],
    induct: ['検流計の 針を 右に 10目盛り 以上 ふらせよう', '針を 左に ふらせる 方法を 2通り 見つけよう', '巻数 200回・いちばん 速く 動かして 最大の 電流を 作ろう'],
    neut: ['BTB液を ちょうど 緑 (中性・pH 7) に しよう', 'こさ 2倍の 塩酸を ちょうど 中和しよう', '水よう液を アルカリ性 (青) に しよう'],
    transp: ['明るい 所で 6時間 たった 結果を 見よう', '暗い 所で 4時間 以上 — 蒸散は どう なる?', '風を 当てて、A の 水を 4mL 以上 へらそう'],
    sedi: ['泥が しずむ 時間を はかろう', '4種類 すべての 粒の しずむ 時間を はかろう', '土砂を 3回 流しこんで 地層を 作ろう'],
    dew: ['教室の 露点を はかろう', '湿度 80% 以上の 部屋を 見つけよう', '3つの 部屋で 湿度を 求めよう'],
    moon: ['満月の 位置に 月を 動かそう', '上弦の 月に しよう (夕方、南の 空に 見える 半月)', '三日月に しよう (夕方、西の 空に 見える)'],
    sky: ['東京で 夏至の 日の 南中高度を はかろう', '同じ 日に 太陽の 位置を 5回 以上 透明半球に 記録しよう', '一日中 太陽が しずまない「白夜」を 起こそう'],
  };

  // ================= 実験ノート (共通) =================
  // cols: [key, 見出し, 表示関数?] / gx,gy: グラフの 軸 / grp: 線で つなぐ グループ / need: 考察に 必要な 記録数
  const NB = {
    circuit: { aim: '電圧・抵抗と 電流の 関係を 調べる', tools: ['電源装置', '抵抗器 2こ', '電流計', '電圧計', 'スイッチ', '導線'],
      pre: { q: '電圧を 同じに して、全体の 抵抗を 2倍に すると 電流は?', o: ['2倍に なる', '変わらない', '半分に なる'], a: 2 },
      cols: [['m', 'つなぎ方'], ['V', '電圧 V'], ['R', '全体の 抵抗 Ω'], ['I', '電流 A']], gx: 'V', gy: 'I', grp: 'R', xl: '電圧 (V)', yl: '電流 (A)', gl: v => v + 'Ω', need: 3,
      tip: '抵抗を 同じに したまま 電圧を 変えて 3回 以上 記録すると、きれいな グラフに なるよ',
      con: { q: '抵抗が 同じとき、電圧と 電流の グラフは 原点を 通る 直線に なった。わかる ことは?', o: ['電流は 電圧に 比例する', '電流は 電圧に 反比例する', '電流と 電圧は 関係ない'], a: 0, why: '原点を 通る 直線 = 比例。これが オームの 法則 (V = R × I)。直線の かたむきが 急なほど 抵抗が 小さい。' } },
    lens: { aim: '物体の 位置と、像の 位置・大きさの 関係を 調べる', tools: ['光学台', '凸レンズ', '物体 (矢印の 光源)', 'スクリーン', 'ものさし'],
      pre: { q: '物体を レンズに 近づけていくと、スクリーンに できる 実像は?', o: ['小さく なり、レンズに 近づく', '大きく なり、レンズから 遠ざかる', '変わらない'], a: 1 },
      cols: [['a', '物体の 位置 cm'], ['f', '焦点距離 cm'], ['b', '像の 位置 cm', (v, r) => r.kind === '実像' ? v : '—'], ['m', '倍率'], ['kind', '像']], gx: 'a', gy: 'b', grp: 'f', xl: '物体の 位置 (cm)', yl: '像の 位置 (cm)', gl: v => 'f=' + v, need: 3, onlyPos: true,
      tip: '焦点距離を 同じに して、物体の 位置を 遠く → 近く と 変えて 記録しよう',
      con: { q: '記録から、物体が 焦点に 近づくほど 実像は どう なる?', o: ['レンズから 遠く、大きく なる', 'レンズに 近く、小さく なる', 'いつも 同じ 位置に できる'], a: 0, why: '物体が 焦点距離の 2倍の 位置で 同じ 大きさ。それより 近づくと 像は 遠く 大きく なり、焦点の 上で 像は できなく なる。' } },
    refract: { aim: '光が 空気と 水・ガラスの 境目で どう 曲がるかを 調べる', tools: ['光源装置 (レーザー)', '半円形 ガラス / 水そう', '円形 分度器', '記録用紙'],
      pre: { q: '空気から 水に ななめに 光が 入るとき、屈折角は 入射角より?', o: ['大きく なる', '小さく なる', '同じ'], a: 1 },
      cols: [['dir', '向き'], ['i', '入射角 °'], ['r', '屈折角 °', v => v == null ? '全反射' : v]], gx: 'i', gy: 'r', grp: 'dir', xl: '入射角 (°)', yl: '屈折角 (°)', gl: v => v, need: 3, xr: [0, 90], yr: [0, 90], xt: 6, yt: 6,
      tip: '同じ 向き・同じ 物質で 入射角を 3つ 以上 変えて 記録しよう',
      con: { q: '水から 空気へ 進む 光で、入射角を どんどん 大きく すると 何が 起こる?', o: ['光が 空気中に 出られず、すべて 反射する', '光が 消えて しまう', '屈折角が 0° に なる'], a: 0, why: '水 → 空気 では 屈折角の 方が 大きい。屈折角が 90° に なる 入射角 (臨界角、水で 約 49°) を こえると 全反射。光ファイバーは この しくみ。' } },
    pend: { aim: 'ふりこの 周期 (1往復の 時間) は 何で 決まるかを 調べる', tools: ['糸', 'おもり (50〜200g)', 'スタンド', 'ストップウォッチ', '分度器', 'ものさし'],
      pre: { q: 'おもりを 重く すると、ふりこの 周期は?', o: ['長く なる', '短く なる', '変わらない'], a: 2 },
      cols: [['L', '長さ m'], ['A', 'ふれはば °'], ['M', '重さ g'], ['t10', '10往復 秒', v => v.toFixed(2)], ['T', '周期 秒', v => v.toFixed(2)]], gx: 'L', gy: 'T', xl: 'ふりこの 長さ (m)', yl: '周期 (秒)', need: 4, xr: [0, 2], yr: [0, 3], yt: 6,
      tip: 'まず ⏱ で 10往復を はかってから 記録。1往復だと 誤差が 大きいので 10往復を 10で わるよ',
      con: { q: '長さと 周期の グラフから わかる ことは?', o: ['長さを 4倍に すると 周期は 2倍に なる', '周期は 長さに 比例する (2倍で 2倍)', '長さと 周期は 関係ない'], a: 0, why: '周期 ≒ 2 × √長さ。長さ 0.25m → 約 1秒、1m → 約 2秒。重さ・ふれはばを 変えても 周期は ほぼ 同じ (ふりこの 等時性)。' } },
    slope: { aim: '小球の 高さ・質量と、木片を 動かす はたらき (エネルギー) の 関係を 調べる', tools: ['斜面 (レール)', '小球 (50〜200g)', '木片', 'ものさし', '速さ測定器'],
      pre: { q: '小球を 置く 高さを 2倍に すると、木片の 移動距離は?', o: ['2倍に なる', '4倍に なる', '変わらない'], a: 0 },
      cols: [['h', '高さ m'], ['th', '角度 °'], ['m', '質量 g'], ['v', '速さ m/s'], ['d', '移動距離 cm']], gx: 'h', gy: 'd', grp: 'm', xl: '小球の 高さ (m)', yl: '木片の 移動距離 (cm)', gl: v => v + 'g', need: 3, xr: [0, 0.5],
      tip: '質量を 同じに して 高さを 変えて 転がそう。転がしてから 記録できるよ',
      con: { q: 'グラフから、小球が もつ 位置エネルギーは 何に 比例する?', o: ['高さと 質量', '斜面の 角度', '高さの 2乗'], a: 0, why: '移動距離は 高さにも 質量にも 比例 → 位置エネルギー = 質量 × 重力 × 高さ。角度を 変えても 同じ 高さなら 斜面の 下での 速さは 同じ (力学的エネルギーの 保存)。' } },
    chem: { aim: '金属を 加熱すると 質量は どう 変わるか (結びつく 酸素の 割合) を 調べる', tools: ['ステンレス皿', 'ガスバーナー', '三脚と 金あみ', '電子てんびん', '銅 / マグネシウムの 粉末', '薬さじ'],
      pre: { q: '銅の 粉末を 空気中で 加熱すると、質量は?', o: ['ふえる', 'へる', '変わらない'], a: 0 },
      cols: [['met', '金属'], ['m0', '金属 g'], ['m1', '加熱後 g'], ['o', '酸素 g']], gx: 'm0', gy: 'o', grp: 'met', xl: '金属の 質量 (g)', yl: '結びついた 酸素 (g)', gl: v => v, need: 3, xr: [0, 2.5],
      tip: '質量が 変わらなく なるまで 加熱してから 記録。同じ 金属で 質量を 変えて 3回 以上',
      con: { q: '銅と、それに 結びついた 酸素の 質量の 比は?', o: ['銅 : 酸素 = 4 : 1', '銅 : 酸素 = 1 : 1', '銅 : 酸素 = 3 : 2'], a: 0, why: '銅 1.2g → 酸化銅 1.5g (酸素 0.3g) で 4 : 1。マグネシウムは 3 : 2 (0.6g に 0.4g)。結びつく 質量の 比は 物質ごとに 決まって いる (定比例の 法則)。' } },
    induct: { aim: 'コイルの 中の 磁界を 変化させて、流れる 電流 (誘導電流) の 大きさ・向きを 調べる', tools: ['コイル (50〜200回巻き)', '棒磁石', '検流計', '導線'],
      pre: { q: '磁石を コイルに 速く 入れると、流れる 電流は?', o: ['大きく なる', '小さく なる', '変わらない'], a: 0 },
      cols: [['pole', '磁極'], ['act', '動かし方'], ['n', '巻数 回'], ['sp', '速さ'], ['D', '針の ふれ', v => (v > 0 ? '右 ' : v < 0 ? '左 ' : '') + Math.abs(v)]], gx: 'sp', gy: 'a', grp: 'n', xl: '磁石の 速さ (1〜5)', yl: '針の ふれ (目盛り)', gl: v => v + '回巻き', need: 3, xr: [0, 5], yr: [0, 20],
      tip: '巻数を 同じに して 速さを 変えたり、速さを 同じに して 巻数を 変えたり して 記録しよう',
      con: { q: '記録から、誘導電流を 大きく する 方法は?', o: ['磁石を 速く 動かす・コイルの 巻数を ふやす', '磁石を ゆっくり 動かす', 'コイルの 巻数を へらす'], a: 0, why: 'コイルの 中の 磁界が 変化すると 電流が 流れる (電磁誘導)。変化が 速いほど・巻数が 多いほど・磁石が 強いほど 大きい。入れると ぬくで、N極と S極で 向きが 逆。磁石を 止めると 電流は 0。発電機の しくみ。' } },
    neut: { aim: '塩酸に 水酸化ナトリウム水溶液を 加えた ときの 性質 (pH) の 変化を 調べる', tools: ['ビーカー', 'うすい 塩酸 10mL', 'うすい 水酸化ナトリウム水溶液', 'こまごめピペット', 'BTB液', 'pHメーター', 'ガラス棒'],
      pre: { q: '塩酸に 水酸化ナトリウム水溶液を 少しずつ 加えていくと、BTB液の 色は?', o: ['黄 → 緑 → 青', '青 → 緑 → 黄', '変わらない'], a: 0 },
      cols: [['c', '塩酸の こさ'], ['v', '加えた量 mL'], ['pH', 'pH'], ['col', 'BTBの 色']], gx: 'v', gy: 'pH', grp: 'c', xl: '加えた 水酸化ナトリウム水溶液 (mL)', yl: 'pH', gl: v => '塩酸 ' + v, need: 4, xr: [0, 30], yr: [0, 14], xt: 6, yt: 7,
      tip: '少しずつ 加えながら 何回も 記録すると、中和の グラフ (pHが 急に 変わる) が 見えるよ',
      con: { q: '塩酸の こさを 2倍に すると、中和に 必要な 水酸化ナトリウム水溶液の 量は?', o: ['2倍に なる', '半分に なる', '同じ'], a: 0, why: '中和: H⁺ + OH⁻ → H₂O。塩酸の H⁺ が 2倍なら、打ち消す OH⁻ も 2倍 必要。中和で 水と 塩 (塩化ナトリウム NaCl) が できる。中和点の 近くで pH は 急に 変わる。' } },
    transp: { aim: '植物の 葉の どこから、どんな ときに 水が 出ていくか (蒸散) を 調べる', tools: ['同じ ような 枝 4本', '試験管 4本', '水と 油', 'ワセリン', 'ものさし (目盛り)'],
      pre: { q: '葉の 表と 裏、どちらから 多く 水が 出ていく?', o: ['表', '裏', 'どちらも 同じ'], a: 1 },
      cols: [['t', '時間'], ['cond', '条件'], ['tube', '枝'], ['w', '減った 水 mL']], gx: 't', gy: 'w', grp: 'tube', xl: '時間 (時間)', yl: '減った 水 (mL)', gl: v => v, need: 8, xr: [0, 8], cap: 24, xt: 8,
      tip: '同じ 条件で 時間を 2回 以上 変えて 記録 (1回で A〜D の 4本 ぶん 記録される)',
      con: { q: '葉の 裏から 出ていった 水の 量を 求める 式は?', o: ['A − C', 'A − B', 'C − D'], a: 0, why: 'A (何も ぬらない) − C (裏に ワセリン) = 裏から 出た 量 (B − D でも 同じ)。気孔は 葉の 裏に 多い ので 裏から 多く 出る。明るい・風が ある・あたたかい と さかん、暗いと 気孔が 閉じて へる。油は 水面からの 蒸発を ふせぐ ため。' } },
    sedi: { aim: '粒の 大きさと しずむ 速さ、地層が できる 順番を 調べる', tools: ['水を 入れた メスシリンダー (50cm)', 'れき・砂・泥', 'ストップウォッチ', '水そう', '土砂'],
      pre: { q: '大きな 粒と 小さな 粒を 同時に 水に 入れると、先に 底に つくのは?', o: ['大きな 粒', '小さな 粒', '同時'], a: 0 },
      cols: [['g', '粒'], ['mm', '大きさ mm'], ['sec', 'しずむ 時間 秒'], ['v', '速さ cm/秒']], gx: 'mm', gy: 'v', xl: '粒の 大きさ (mm)', yl: 'しずむ 速さ (cm/秒)', need: 4, xr: [0, 4], yr: [0, 40], xt: 4, yt: 4,
      tip: '4種類の 粒を それぞれ 落として、底に つくまでの 時間を はかろう',
      con: { q: '1回 流しこんだ 土砂で できる 地層は、下から 順に?', o: ['れき → 砂 → 泥', '泥 → 砂 → れき', 'まざって 区別 できない'], a: 0, why: '大きく 重い 粒ほど 速く しずむ → 下が あらく 上が 細かい。川が 海に 出ると、河口の 近くに れき、少し 沖に 砂、遠くに 泥が つもる。地層の 粒の 大きさで、当時 海が 深かったか 浅かったかが わかる。' } },
    dew: { aim: 'コップの 表面に 水てきが つく 温度 (露点) から、部屋の 湿度を 求める', tools: ['金属製の コップ', 'くみおきの 水', '氷水', '温度計 2本', 'ガラス棒'],
      pre: { q: '冷たい 水を 入れた コップの 外側に 水てきが つくのは なぜ?', o: ['空気中の 水蒸気が 冷やされて 水に なるから', 'コップの 水が しみ出るから', '氷が とけたから'], a: 0 },
      cols: [['room', '部屋'], ['T', '室温 ℃'], ['dp', '露点 ℃'], ['a', '水蒸気量 g/m³'], ['sat', '飽和水蒸気量'], ['hum', '湿度 %']], gx: 'T', gy: 'a', grp: 'room', xl: '気温 (℃)', yl: '水蒸気量 (g/m³)', gl: v => v, need: 3, xr: [0, 35], yr: [0, 40], xt: 7, yt: 4,
      curve: t => satVap(t), curveL: '飽和水蒸気量',
      tip: '部屋を えらび、氷水で コップの 水を 少しずつ 冷やして、くもり始めた 温度を 記録しよう',
      con: { q: '露点が 室温に 近い 部屋ほど、湿度は?', o: ['高い', '低い', '関係ない'], a: 0, why: '湿度 (%) = 空気 1m³ 中の 水蒸気量 ÷ その 気温の 飽和水蒸気量 × 100。露点の 飽和水蒸気量 = 今 ふくまれて いる 水蒸気量。露点と 室温が 近い = 飽和に 近い = 湿度が 高い。雲は 上昇した 空気が 露点まで 冷えて できる。' } },
    moon: { aim: '月の 位置と 満ち欠けの 関係を 調べる (モデル実験)', tools: ['ボール (月)', '電灯 (太陽)', '自分の 頭 (地球)', '暗い 部屋'],
      pre: { q: '満月に 見えるのは、月が どこに あるとき?', o: ['太陽と 同じ 方向', '地球を はさんで 太陽の 反対側', '太陽から 見て 直角の 方向'], a: 1 },
      cols: [['d', '月齢 日'], ['name', '形'], ['k', '光る 割合 %']], gx: 'd', gy: 'k', xl: '月齢 (日)', yl: '光って 見える 割合 (%)', need: 5, xr: [0, 30], yr: [0, 100], xt: 6,
      tip: '月齢を 少しずつ 変えて 5回 以上 記録すると、グラフが 山の 形に なるよ',
      con: { q: 'グラフから、月が 同じ 形に もどるまで 約 何日?', o: ['約 7日', '約 15日', '約 29.5日', '約 365日'], a: 2, why: '新月 → 満月 が 約 15日、満月 → 新月 が 約 15日。合わせて 約 29.5日 (ひと月の 語源)。' } },
    sky: { aim: '太陽の 1日の 動きと、季節・場所による ちがいを 調べる', tools: ['透明半球', '画用紙', 'サインペン', '方位磁針'],
      pre: { q: '夏至の 日、東京で 太陽が いちばん 高く なる ときの 高度は?', o: ['約 55°', '約 78°', '約 31°'], a: 1 },
      cols: [['place', '場所'], ['season', '季節'], ['t', '時刻', v => hm(v)], ['alt', '高度 °'], ['dir', '方位']], gx: 't', gy: 'alt', grp: 'key', xl: '時刻 (時)', yl: '太陽の 高度 (°)', gl: v => v, need: 5, xr: [0, 24], yr: [0, 90], xt: 6, yt: 6,
      tip: '同じ 場所・季節で 時刻を 変えて 記録 = 透明半球に 点を 打つ ことと 同じ',
      con: { q: '透明半球に 1時間ごとに 打った 点の 間かくが どこも 同じだった。わかる ことは?', o: ['太陽は 一定の 速さで 動いて 見える (地球の 自転)', '太陽は 昼に 速く 動く', '太陽は 止まって いて 雲が 動く'], a: 0, why: '地球が 1時間に 15° ずつ 自転 → 太陽は 1時間に 15° ずつ 東から 西へ 動いて 見える (日周運動)。点を のばすと 日の出・日の入りの 位置が わかる。' } },
  };
  function note(exp) { const d = data(); return d.note[exp] || (d.note[exp] = { p: null, rows: [], c: null }); }
  function toast(msg) { const t = $('slToast'); if (!t) return; t.textContent = msg; t.classList.add('on'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), 1700); }
  function nbTop(exp) {
    const s = NB[exp], n = note(exp);
    let h = '<div class="sl-nb"><div class="sl-nb-row"><b>🎯 目的</b><span>' + esc(s.aim) + '</span></div><div class="sl-nb-row"><b>🧰 器具</b><span class="sl-tools">' + s.tools.map(t => '<i>' + esc(t) + '</i>').join('') + '</span></div>';
    h += '<div class="sl-nb-pre"><b>🤔 予想</b> ' + esc(s.pre.q) + '<div class="sl-opts" id="slPre">' + s.pre.o.map((o, i) => '<button data-p="' + i + '" class="' + (n.p === i ? 'on' : '') + '">' + esc(o) + '</button>').join('') + '</div></div></div>';
    return h;
  }
  const recBtn = () => '<div class="sl-recrow"><button class="sl-recbtn" id="slRecBtn">📋 記録する</button><span id="slRecMsg"></span></div>';
  function bindNB(exp, cur) {
    const s = NB[exp];
    $('slPre').querySelectorAll('[data-p]').forEach(b => b.onclick = () => { sfx('click'); note(exp).p = +b.dataset.p; save(); $('slPre').querySelectorAll('[data-p]').forEach(x => x.classList.toggle('on', x === b)); renderRec(exp); checkNote(exp); });
    const msg = (t, ok) => { const m = $('slRecMsg'); if (m) { m.textContent = t; m.className = ok ? 'ok' : 'ng'; } };
    $('slRecBtn').onclick = () => {
      const n = note(exp);
      if (n.p == null) { msg('まず 上で 予想を えらぼう'); sfx('wrong'); return; }
      const r = cur(); if (!r || typeof r === 'string') { msg(r || 'まだ 記録 できないよ'); sfx('wrong'); return; }
      const add = Array.isArray(r) ? r : [r], key = JSON.stringify(add[0]); if (n.rows.some(x => JSON.stringify(x) === key)) { msg('同じ 条件は もう 記録したよ'); return; }
      add.forEach(x => n.rows.push(x)); while (n.rows.length > (s.cap || 14)) n.rows.shift(); save(); sfx('click'); msg('記録した! (' + n.rows.length + '件)', 1); renderRec(exp); checkNote(exp); if (s.onRec) s.onRec(n.rows);
    };
    renderRec(exp);
  }
  function renderRec(exp) {
    const el = $('slNbRec'); if (!el) return; const s = NB[exp], n = note(exp);
    let h = '<b class="sl-h">📋 記録表</b>';
    if (!n.rows.length) h += '<p class="sl-empty">' + esc(s.tip) + '</p>';
    else {
      h += '<div class="sl-tblw"><table class="sl-tbl"><tr><th>#</th>' + s.cols.map(c => '<th>' + esc(c[1]) + '</th>').join('') + '</tr>';
      n.rows.forEach((r, i) => { h += '<tr><td>' + (i + 1) + '</td>' + s.cols.map(c => '<td>' + esc(c[2] ? c[2](r[c[0]], r) : r[c[0]]) + '</td>').join('') + '</tr>'; });
      h += '</table></div><button class="sl-clear" id="slClr">記録を けす</button>';
    }
    h += '<b class="sl-h">📈 グラフ</b>' + graph(n.rows, s);
    h += '<b class="sl-h">🧠 考察</b>';
    if (n.rows.length < s.need) h += '<p class="sl-empty">あと ' + (s.need - n.rows.length) + '件 記録すると 考察できるよ</p>';
    else {
      h += '<p class="sl-q">' + esc(s.con.q) + '</p><div class="sl-opts" id="slCon">' + s.con.o.map((o, i) => '<button data-c="' + i + '" class="' + (n.c === i ? (i === s.con.a ? 'ok' : 'ng') : '') + '">' + esc(o) + '</button>').join('') + '</div>';
      if (n.c === s.con.a) h += '<div class="sl-why">⭕ ' + esc(s.con.why) + (n.p != null ? '<br><small>あなたの 予想「' + esc(s.pre.o[n.p]) + '」は ' + (n.p === s.pre.a ? '当たり! 🎯' : 'はずれ — 実験で 確かめたから わかった ことだね 👍') + '</small>' : '') + '</div>';
    }
    if (data().nb[exp]) h += '<div class="sl-nbdone">📒 実験ノート 完成!</div>';
    el.innerHTML = h;
    const clr = $('slClr'); if (clr) clr.onclick = () => { sfx('click'); n.rows = []; n.c = null; save(); renderRec(exp); if (exp === 'sky' && RUN._skyUpd) RUN._skyUpd(); };
    const con = $('slCon'); if (con) con.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { const c = +b.dataset.c; n.c = c; save(); sfx(c === s.con.a ? 'correct' : 'wrong'); renderRec(exp); checkNote(exp); });
  }
  function checkNote(exp) {
    const s = NB[exp], n = note(exp), d = data();
    if (d.nb[exp] || n.p == null || n.rows.length < s.need || n.c !== s.con.a) return;
    d.nb[exp] = 1; save(); sfx('correct'); toast('📒 実験ノート 完成!'); renderRec(exp);
  }
  function nice(v) { if (!(v > 0)) return 1; const p = Math.pow(10, Math.floor(Math.log10(v))), f = v / p; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p; }
  const COLS = ['#d0382a', '#2e6fb8', '#2f8a4f', '#b0742a', '#7a4ab0', '#1a8a8a'];
  function graph(rows, s) {
    const pts = rows.filter(r => typeof r[s.gx] === 'number' && typeof r[s.gy] === 'number' && (!s.onlyPos || r[s.gy] > 0));
    const W = 340, H = 210, x0 = 46, y0 = 172, gw = 276, gh = 150;
    const xmax = s.xr ? s.xr[1] : nice(Math.max(...pts.map(p => p[s.gx]), 0) * 1.1), ymax = s.yr ? s.yr[1] : nice(Math.max(...pts.map(p => p[s.gy]), 0) * 1.1);
    const xmin = s.xr ? s.xr[0] : 0, X = v => x0 + (Math.min(xmax, v) - xmin) / (xmax - xmin) * gw, Y = v => y0 - Math.max(0, Math.min(ymax, v)) / ymax * gh, fx = v => Math.round(v * 100) / 100;
    let g = '<rect width="' + W + '" height="' + H + '" fill="#fff"/>';
    const NX = s.xt || 5, NY = s.yt || 5;
    for (let i = 0; i <= Math.max(NX, NY); i++) { const xv = i <= NX ? xmin + (xmax - xmin) * i / NX : null, yv = i <= NY ? ymax * i / NY : null; if (xv != null) g += '<line x1="' + X(xv) + '" y1="' + y0 + '" x2="' + X(xv) + '" y2="' + (y0 - gh) + '" stroke="#e8edf2"/><text x="' + X(xv) + '" y="' + (y0 + 14) + '" font-size="10" text-anchor="middle" fill="#5a6a7a">' + fx(xv) + '</text>';
      if (yv != null) g += '<line x1="' + x0 + '" y1="' + Y(yv) + '" x2="' + (x0 + gw) + '" y2="' + Y(yv) + '" stroke="#e8edf2"/><text x="' + (x0 - 5) + '" y="' + (Y(yv) + 3) + '" font-size="10" text-anchor="end" fill="#5a6a7a">' + fx(yv) + '</text>'; }
    g += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + (x0 + gw) + '" y2="' + y0 + '" stroke="#3a3a4a" stroke-width="1.5"/><line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + (y0 - gh) + '" stroke="#3a3a4a" stroke-width="1.5"/>';
    g += '<text x="' + (x0 + gw / 2) + '" y="' + (H - 4) + '" font-size="11" text-anchor="middle" fill="#26323d">' + esc(s.xl) + '</text><text x="12" y="' + (y0 - gh / 2) + '" font-size="11" text-anchor="middle" fill="#26323d" transform="rotate(-90 12 ' + (y0 - gh / 2) + ')">' + esc(s.yl) + '</text>';
    if (s.curve) { let d = ''; for (let i = 0; i <= 60; i++) { const xv = (s.xr ? s.xr[0] : 0) + (xmax - (s.xr ? s.xr[0] : 0)) * i / 60, yv = s.curve(xv); d += (i ? 'L' : 'M') + X(xv).toFixed(1) + ',' + Y(yv).toFixed(1); } g += '<path d="' + d + '" fill="none" stroke="#7a9ab8" stroke-width="2" stroke-dasharray="5 3"/>' + (s.curveL ? '<text x="' + (x0 + gw - 4) + '" y="' + (Y(s.curve(xmax)) + 14) + '" font-size="10" text-anchor="end" fill="#5a7a98">' + esc(s.curveL) + '</text>' : ''); }
    if (!pts.length) g += '<text x="' + (x0 + gw / 2) + '" y="' + (y0 - gh / 2) + '" font-size="12" text-anchor="middle" fill="#9aa8b5">記録すると ここに 点が 打たれるよ</text>';
    const groups = {}; pts.forEach(p => { const k = s.grp ? String(p[s.grp]) : '_'; (groups[k] = groups[k] || []).push(p); });
    const keys = Object.keys(groups); let leg = '';
    keys.forEach((k, gi) => { const c = COLS[gi % COLS.length], ps = groups[k].slice().sort((a, b) => a[s.gx] - b[s.gx]);
      if (ps.length > 1) g += '<polyline points="' + ps.map(p => X(p[s.gx]).toFixed(1) + ',' + Y(p[s.gy]).toFixed(1)).join(' ') + '" fill="none" stroke="' + c + '" stroke-width="1.6" opacity=".55"/>';
      ps.forEach(p => { g += '<circle cx="' + X(p[s.gx]).toFixed(1) + '" cy="' + Y(p[s.gy]).toFixed(1) + '" r="4" fill="' + c + '" stroke="#fff" stroke-width="1.2"/>'; });
      if (s.grp && s.gl) leg += '<span><i style="background:' + c + '"></i>' + esc(s.gl(k)) + '</span>'; });
    return '<div class="sl-graph"><svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + g + '</svg>' + (leg ? '<div class="sl-leg">' + leg + '</div>' : '') + '</div>';
  }

  // ================= 共通 UI =================
  function done(exp, i) { const d = data(); return !!d.done[exp + ':' + i]; }
  function mark(exp, i) { const d = data(); const k = exp + ':' + i; if (d.done[k]) return; d.done[k] = 1; save(); sfx('correct'); const el = document.querySelector('[data-mi="' + i + '"]'); if (el) { el.classList.add('ok'); el.querySelector('i').textContent = '✅'; } toast('🎉 ミッション 達成!'); }
  function missions(exp) { return '<div class="sl-miss"><b>🎯 ミッション</b>' + MISS[exp].map((m, i) => '<div class="sl-mi' + (done(exp, i) ? ' ok' : '') + '" data-mi="' + i + '"><i>' + (done(exp, i) ? '✅' : '⬜') + '</i>' + esc(m) + '</div>').join('') + '</div><div class="sl-toast" id="slToast"></div>'; }
  function frame(h) { stopAnim(); $('slArea').innerHTML = h; const p = $('pageSciLab'); if (p) p.scrollTop = 0; }
  function head(e) { return '<div class="sl-top"><button class="sl-back" id="slHome">← 実験室</button><b>' + e.icon + ' ' + e.name + '</b><em>' + e.lv + '</em></div>'; }
  const law = body => '<details class="sl-law"><summary>📘 わかった こと (まとめ)</summary>' + body + '</details>';
  // 実験ページの 組み立て: ノート上 → 実験 → 記録 → ミッション → まとめ
  function page(id, body, lawHtml) { const e = EXPS.find(x => x.id === id); frame(head(e) + nbTop(id) + '<div class="sl-card2"><b class="sl-h">🧪 実験</b>' + body + recBtn() + '</div><div class="sl-nb2" id="slNbRec"></div>' + missions(id) + law(lawHtml)); bindHome(); }
  const slider = (id, label, min, max, step, val, unit) => '<label class="sl-sl"><span>' + label + ' <b id="' + id + 'V">' + val + '</b>' + unit + '</span><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';
  const seg = (attr, opts, on) => '<div class="sl-seg">' + opts.map(o => '<button data-' + attr + '="' + o[0] + '"' + (o[0] === on ? ' class="on"' : '') + '>' + o[1] + '</button>').join('') + '</div>';
  function bindSeg(attr, f) { $('slArea').querySelectorAll('[data-' + attr + ']').forEach(b => b.onclick = () => { sfx('click'); $('slArea').querySelectorAll('[data-' + attr + ']').forEach(x => x.classList.toggle('on', x === b)); f(b.dataset[attr]); }); }

  function home() {
    const d = data();
    let h = '<div class="sl-hero"><div class="sl-kicker">さわって 確かめる</div><h1>理科 実験室</h1><p>予想 → 実験 → 記録 → グラフ → 考察。本物の 理科室と 同じ 手順で、教科書の 「法則」を 自分の 手で 見つけよう。</p>' +
      '<div class="sl-steps"><span>🤔 予想</span>›<span>🧪 実験</span>›<span>📋 記録</span>›<span>📈 グラフ</span>›<span>🧠 考察</span></div></div>';
    ['物理', '化学', '生物', '地学'].forEach(g => {
      h += '<h2 class="sl-g">' + ({ 物理: '⚡ 物理', 化学: '⚗️ 化学', 生物: '🌱 生物', 地学: '🌏 地学' })[g] + '</h2><div class="sl-cards">';
      EXPS.filter(e => e.g === g).forEach(e => { const n = MISS[e.id].filter((m, i) => d.done[e.id + ':' + i]).length; h += '<button class="sl-card" data-e="' + e.id + '"><span class="sl-ci">' + e.icon + '</span><b>' + e.name + '</b><small>' + e.sub + '</small><em>' + e.lv + '</em><i>ミッション ' + n + ' / 3' + (d.nb[e.id] ? ' · 📒 ノート完成' : '') + '</i></button>'; });
      h += '</div>';
    });
    frame(h);
    $('slArea').querySelectorAll('[data-e]').forEach(b => b.onclick = () => { sfx('click'); RUN[b.dataset.e](); });
  }
  function bindHome() { $('slHome').onclick = () => { sfx('click'); home(); }; }

  // ================= ① 電気回路 =================
  function circuit() {
    let mode = 'series', last = null;
    page('circuit', seg('m', [['series', '直列つなぎ'], ['parallel', '並列つなぎ']], 'series') + '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' +
      slider('slV', '電源の 電圧', 1.5, 9, 1.5, 6, ' V') + slider('slR1', '抵抗①', 5, 30, 5, 10, ' Ω') + slider('slR2', '抵抗②', 5, 30, 5, 20, ' Ω'),
      '<p><b>オームの 法則</b>: 電圧 V = 抵抗 R × 電流 I</p><p><b>直列</b>: 電流は どこでも 同じ。電圧は 抵抗の 大きさに 比例して 分かれる。全体の 抵抗 = R₁ + R₂</p><p><b>並列</b>: どの 抵抗にも 電源と 同じ 電圧。電流は 分かれて、全体の 電流 = I₁ + I₂。全体の 抵抗は どちらの 抵抗よりも 小さい。</p><p><b>電力</b> (W) = 電圧 × 電流。明るさは 電力で 決まる。</p>');
    const upd = () => {
      const V = +$('slV').value, R1 = +$('slR1').value, R2 = +$('slR2').value; $('slVV').textContent = V; $('slR1V').textContent = R1; $('slR2V').textContent = R2;
      let I, I1, I2, V1, V2, R;
      if (mode === 'series') { R = R1 + R2; I = V / R; I1 = I2 = I; V1 = I * R1; V2 = I * R2; } else { I1 = V / R1; I2 = V / R2; I = I1 + I2; R = V / I; V1 = V2 = V; }
      last = { m: mode === 'series' ? '直列' : '並列', V: V, R: r2(R), I: r2(I) };
      $('slFig').innerHTML = circSVG(mode, V, R1, R2, I, I1, I2, V1, V2);
      $('slRead').innerHTML = '<span>全体の 電流 <b>' + r2(I) + ' A</b></span><span>①の 電圧 <b>' + r2(V1) + ' V</b></span><span>②の 電圧 <b>' + r2(V2) + ' V</b></span><span>全体の 抵抗 <b>' + r2(R) + ' Ω</b></span>' + (mode === 'parallel' ? '<span>①の 電流 <b>' + r2(I1) + ' A</b></span><span>②の 電流 <b>' + r2(I2) + ' A</b></span>' : '') + '<span>電力 <b>' + r2(V * I) + ' W</b></span>';
      if (mode === 'series' && Math.abs(I - 0.2) < 1e-9) mark('circuit', 0);
      if (mode === 'parallel' && I >= 1 - 1e-9) mark('circuit', 1);
      if (mode === 'series' && Math.abs(V1 - 3) < 1e-9) mark('circuit', 2);
    };
    ['slV', 'slR1', 'slR2'].forEach(id => $(id).oninput = upd);
    bindSeg('m', m => { mode = m; upd(); });
    bindNB('circuit', () => last); upd();
  }
  function circSVG(mode, V, R1, R2, I, I1, I2, V1, V2) {
    const flow = (d, cur) => cur > 0 ? '<path d="' + d + '" fill="none" stroke="#f2b632" stroke-width="3" stroke-dasharray="3 13" stroke-linecap="round" style="animation:slFlow ' + Math.max(0.25, 1.6 / cur).toFixed(2) + 's linear infinite"/>' : '';
    const wire = d => '<path d="' + d + '" fill="none" stroke="#3a3a4a" stroke-width="3" stroke-linejoin="round"/>';
    const bulb = (x, y, P, lab, vlab) => { const g = Math.min(1, P / 3); return '<circle cx="' + x + '" cy="' + y + '" r="' + (14 + g * 14) + '" fill="rgba(255,214,90,' + (0.15 + g * 0.55).toFixed(2) + ')"/><rect x="' + (x - 20) + '" y="' + (y - 10) + '" width="40" height="20" rx="3" fill="#fff" stroke="#3a3a4a" stroke-width="2.5"/><text x="' + x + '" y="' + (y + 5) + '" font-size="12" text-anchor="middle" font-weight="700" fill="#2a2a3a">' + lab + '</text><text x="' + x + '" y="' + (y - 18) + '" font-size="11" text-anchor="middle" fill="#2e5fa8">' + vlab + '</text>'; };
    const bat = (x, y) => '<rect x="' + (x - 22) + '" y="' + (y - 14) + '" width="44" height="28" fill="#f4f1e6"/><line x1="' + (x - 6) + '" y1="' + (y - 16) + '" x2="' + (x - 6) + '" y2="' + (y + 16) + '" stroke="#3a3a4a" stroke-width="3"/><line x1="' + (x + 6) + '" y1="' + (y - 9) + '" x2="' + (x + 6) + '" y2="' + (y + 9) + '" stroke="#3a3a4a" stroke-width="5"/><text x="' + x + '" y="' + (y + 32) + '" font-size="13" text-anchor="middle" font-weight="700" fill="#d0382a">' + V + ' V</text>';
    const am = (x, y, cur) => '<circle cx="' + x + '" cy="' + y + '" r="15" fill="#fff" stroke="#3a3a4a" stroke-width="2.5"/><text x="' + x + '" y="' + (y + 5) + '" font-size="13" text-anchor="middle" font-weight="700">A</text><text x="' + (x + 20) + '" y="' + (y + 5) + '" font-size="13" font-weight="700" fill="#2f8a4f">' + r2(cur) + 'A</text>';
    let s = '';
    if (mode === 'series') { const d = 'M60,150 L60,40 L320,40 L320,150 L60,150'; s += wire(d) + flow(d, I) + bulb(140, 40, V1 * I, R1 + 'Ω', r2(V1) + 'V') + bulb(240, 40, V2 * I, R2 + 'Ω', r2(V2) + 'V') + bat(190, 150) + am(320, 95, I); }
    else { const d0 = 'M60,170 L60,30 L320,30 L320,170 L60,170'; s += wire(d0) + wire('M120,30 L120,110 L260,110 L260,30') + flow('M60,170 L60,30 L120,30', I) + flow('M120,30 L120,110', I1) + flow('M260,30 L260,110', I2) + flow('M120,110 L260,110 L260,30 L320,30 L320,170 L60,170', I) +
      bulb(120, 70, V1 * I1, R1 + 'Ω', '') + bulb(260, 70, V2 * I2, R2 + 'Ω', '') + '<text x="150" y="74" font-size="11" fill="#2f8a4f" font-weight="700">' + r2(I1) + 'A</text><text x="200" y="74" font-size="11" fill="#2f8a4f" font-weight="700" text-anchor="end">' + r2(I2) + 'A</text>' + bat(190, 170) + am(320, 100, I); }
    return '<svg viewBox="0 0 380 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '<text x="190" y="206" font-size="10" text-anchor="middle" fill="#8a8a9a">黄色い 点 = 電流の 流れ (速いほど 電流が 大きい) ・ 明るさ = 電力</text></svg>';
  }

  // ================= ② 凸レンズ =================
  function lens() {
    let last = null;
    page('lens', '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' + slider('slA', '物体の 位置 (レンズからの 距離)', 4, 40, 1, 30, ' cm') + slider('slF', '焦点距離', 6, 14, 1, 10, ' cm'),
      '<p>物体が <b>焦点距離の 2倍より 遠い</b> → 実物より 小さい 倒立の 実像。<b>ちょうど 2倍</b> → 同じ 大きさ。<b>2倍と 焦点の 間</b> → 大きい 実像。</p><p><b>焦点の 上</b> → 像は できない。<b>焦点より 内側</b> → スクリーンには 映らないが、レンズを のぞくと 大きな 正立の 虚像 (虫めがね)。</p><p>作図の 3本の 光: ① 軸に 平行 → 反対側の 焦点を 通る ② レンズの 中心 → まっすぐ ③ 手前の 焦点を 通る → 軸に 平行</p><p>カメラ = 遠くの 物体 → 小さい 実像。プロジェクター = 焦点の 近く → 大きい 実像。</p>');
    const upd = () => { const a = +$('slA').value, f = +$('slF').value; $('slAV').textContent = a; $('slFV').textContent = f;
      const r = lensSVG(a, f); $('slFig').innerHTML = r.svg; $('slRead').innerHTML = r.read;
      if (a === f) last = { a: a, f: f, b: 0, m: '—', kind: 'できない' };
      else { const b = a * f / (a - f), m = Math.abs(b / a); last = { a: a, f: f, b: r1(b), m: r2(m), kind: b > 0 ? '実像' : '虚像' }; }
      if (a === 2 * f) mark('lens', 0); if (a === f) mark('lens', 1); if (a < f && f / (f - a) >= 2) mark('lens', 2); };
    $('slA').oninput = upd; $('slF').oninput = upd; bindNB('lens', () => last); upd();
  }
  function lensSVG(a, f) {
    const W = 380, H = 220, cx = 190, ay = 115, sc = 4, h0 = 30, X = d => cx + d * sc, ox = X(-a);
    const L = (x1, y1, x2, y2, c, w, d) => '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + c + '" stroke-width="' + (w || 1.8) + '"' + (d ? ' stroke-dasharray="5 4"' : '') + '/>';
    const arrow = (x, top, c, d) => L(x, ay, x, top, c, 3, d) + '<polygon points="' + x + ',' + (top + (top < ay ? -6 : 6)) + ' ' + (x - 6) + ',' + (top + (top < ay ? 6 : -6)) + ' ' + (x + 6) + ',' + (top + (top < ay ? 6 : -6)) + '" fill="' + c + '"/>';
    let s = '<rect width="' + W + '" height="' + H + '" fill="#fbfaf5"/>' + L(0, ay, W, ay, '#9a9aa8', 1.2) + '<ellipse cx="' + cx + '" cy="' + ay + '" rx="8" ry="80" fill="rgba(160,205,240,.45)" stroke="#5a8ab8" stroke-width="2"/>';
    [-2, -1, 1, 2].forEach(k => { const x = X(k * f); s += '<circle cx="' + x + '" cy="' + ay + '" r="3.5" fill="#2a2a3a"/><text x="' + x + '" y="' + (ay + 18) + '" font-size="11" text-anchor="middle" fill="#2a2a3a">' + (Math.abs(k) === 1 ? 'F' : '2F') + '</text>'; });
    s += arrow(ox, ay - h0, '#d0382a');
    const yTop = ay - h0, red = '#e8902a';
    let read;
    if (a === f) {
      s += L(ox, yTop, cx, yTop, red) + L(cx, yTop, W, yTop + (W - cx) * h0 / (f * sc), red) + L(ox, yTop, W, yTop + (W - ox) * (h0 / (a * sc)), red);
      read = '<span><b>像は できない</b> (屈折した 光が 平行に なり、交わらない)</span>';
    } else {
      const b = a * f / (a - f), m = b / a, ix = X(b), iyTop = ay + h0 * m, fpx = X(f);
      s += L(ox, yTop, cx, yTop, red);
      if (b > 0) { s += L(cx, yTop, Math.min(W, ix + 60), yTop + (Math.min(W, ix + 60) - cx) * (iyTop - yTop) / (ix - cx), red); s += L(ox, yTop, Math.min(W, ix + 60), yTop + (Math.min(W, ix + 60) - ox) * (iyTop - yTop) / (ix - ox), red); s += arrow(ix, iyTop, '#2f8a4f') + '<text x="' + ix + '" y="' + (Math.max(iyTop, ay) + 30) + '" font-size="12" text-anchor="middle" font-weight="700" fill="#2f8a4f">実像</text>'; }
      else { const vy = ay - h0 * (-m), ext = (x0, y0, x1, y1, xe) => y0 + (xe - x0) * (y1 - y0) / (x1 - x0);
        s += L(cx, yTop, W, ext(cx, yTop, fpx, ay, W), red) + L(cx, yTop, ix, vy, red, 1.2, 1);
        s += L(ox, yTop, W, ext(ox, yTop, cx, ay, W), red) + L(ox, yTop, ix, vy, red, 1.2, 1);
        s += arrow(ix, vy, '#7a4ab0', 1) + '<text x="' + ix + '" y="' + (vy - 12) + '" font-size="12" text-anchor="middle" font-weight="700" fill="#7a4ab0">虚像</text>'; }
      const bigger = Math.abs(m) > 1.001 ? '大きい' : Math.abs(m) < 0.999 ? '小さい' : '同じ 大きさ';
      read = b > 0 ? '<span>像の 位置 <b>レンズの 右 ' + r1(b) + ' cm</b></span><span>大きさ <b>' + r2(Math.abs(m)) + ' 倍 (' + bigger + ')</b></span><span><b>倒立の 実像</b> (スクリーンに 映る)</span>'
        : '<span>像の 位置 <b>レンズの 左 ' + r1(-b) + ' cm</b></span><span>大きさ <b>' + r2(Math.abs(m)) + ' 倍 (' + bigger + ')</b></span><span><b>正立の 虚像</b> (レンズを のぞくと 見える)</span>';
    }
    return { svg: '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '<text x="' + ox + '" y="' + (ay - h0 - 12) + '" font-size="11" text-anchor="middle" fill="#d0382a" font-weight="700">物体</text></svg>', read: read };
  }

  // ================= ③ 光の 屈折 =================
  const MATS = { water: ['水', 1.33], glass: ['ガラス', 1.5], dia: ['ダイヤモンド', 2.42] };
  function snell(i, n1, n2) { const s = n1 / n2 * Math.sin(i * D2R); return s > 1 ? null : Math.asin(s) / D2R; }
  function refract() {
    let dir = 'in', mat = 'water', last = null;
    page('refract', seg('dir', [['in', '空気 → 物質'], ['out', '物質 → 空気']], 'in') + seg('mat', [['water', '💧 水'], ['glass', '🔷 ガラス'], ['dia', '💎 ダイヤ']], 'water') +
      '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' + slider('slI', '入射角 (境目に 垂直な 線から)', 0, 85, 1, 40, '°'),
      '<p>光は 物質の 境目で 折れ曲がる (<b>屈折</b>)。角度は 境目に 垂直な 線 (法線) から はかる。</p><p><b>空気 → 水・ガラス</b>: 屈折角 &lt; 入射角 (法線に 近づく)。<b>水・ガラス → 空気</b>: 屈折角 &gt; 入射角 (境目に 近づく)。</p><p>水 → 空気で 入射角が 臨界角 (水 約 49°、ガラス 約 42°、ダイヤ 約 24°) を こえると <b>全反射</b>。ダイヤが きらきら 光るのは 臨界角が 小さく 全反射しやすいから。</p><p>身近な 例: 水そうの 底が 浅く 見える、ストローが 折れて 見える、光ファイバー。</p>');
    const upd = () => { const i = +$('slI').value; $('slIV').textContent = i; const nm = MATS[mat];
      const n1 = dir === 'in' ? 1 : nm[1], n2 = dir === 'in' ? nm[1] : 1, r = snell(i, n1, n2), crit = n1 > n2 ? Math.asin(n2 / n1) / D2R : null;
      $('slFig').innerHTML = refractSVG(i, r, dir, nm[0], n1, n2);
      $('slRead').innerHTML = '<span>入射角 <b>' + i + '°</b></span><span>' + (r == null ? '<b style="color:#d0382a">全反射</b> (光が 出られない)' : '屈折角 <b>' + r1(r) + '°</b>') + '</span><span>反射角 <b>' + i + '°</b></span>' + (crit ? '<span>臨界角 <b>' + r1(crit) + '°</b></span>' : '') + '<span>屈折率 ' + nm[0] + ' <b>' + nm[1] + '</b></span>';
      last = { dir: dir === 'in' ? '空気→' + nm[0] : nm[0] + '→空気', i: i, r: r == null ? null : r1(r) };
      if (dir === 'in' && mat === 'water' && i === 0) mark('refract', 0);
      if (dir === 'out' && r == null) mark('refract', 1);
      if (mat === 'glass' && r != null && Math.abs(r - 30) <= 0.5) mark('refract', 2); };
    $('slI').oninput = upd; bindSeg('dir', v => { dir = v; upd(); }); bindSeg('mat', v => { mat = v; upd(); });
    bindNB('refract', () => last); upd();
  }
  function refractSVG(i, r, dir, mname, n1, n2) {
    const W = 380, H = 260, cx = 190, cy = 130, R = 115, up = dir === 'in' ? '空気' : mname, dn = dir === 'in' ? mname : '空気';
    const tint = n => n > 2 ? 'rgba(190,210,235,.6)' : n > 1.4 ? 'rgba(170,215,230,.55)' : n > 1.1 ? 'rgba(120,180,230,.4)' : 'rgba(255,255,255,0)';
    const sx = cx - (R + 30) * Math.sin(i * D2R), sy = cy - (R + 30) * Math.cos(i * D2R);
    let s = '<rect width="' + W + '" height="' + H + '" fill="#fbfaf5"/><rect x="0" y="0" width="' + W + '" height="' + cy + '" fill="' + tint(n1) + '"/><rect x="0" y="' + cy + '" width="' + W + '" height="' + (H - cy) + '" fill="' + tint(n2) + '"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="#c9c4b8" stroke-dasharray="3 4"/>';
    for (let a = 0; a < 360; a += 10) { const k = a % 30 ? 5 : 9; s += '<line x1="' + (cx + R * Math.cos(a * D2R)).toFixed(1) + '" y1="' + (cy + R * Math.sin(a * D2R)).toFixed(1) + '" x2="' + (cx + (R - k) * Math.cos(a * D2R)).toFixed(1) + '" y2="' + (cy + (R - k) * Math.sin(a * D2R)).toFixed(1) + '" stroke="#b8b2a4"/>'; }
    s += '<line x1="0" y1="' + cy + '" x2="' + W + '" y2="' + cy + '" stroke="#4a6a8a" stroke-width="2"/><line x1="' + cx + '" y1="10" x2="' + cx + '" y2="' + (H - 10) + '" stroke="#7a7a8a" stroke-dasharray="6 4"/>';
    s += '<text x="8" y="20" font-size="13" font-weight="700" fill="#2e5f8a">' + up + '</text><text x="8" y="' + (H - 10) + '" font-size="13" font-weight="700" fill="#2e5f8a">' + dn + '</text><text x="' + (cx + 4) + '" y="22" font-size="10" fill="#7a7a8a">法線</text>';
    s += '<line x1="' + sx.toFixed(1) + '" y1="' + sy.toFixed(1) + '" x2="' + cx + '" y2="' + cy + '" stroke="#e8302a" stroke-width="3.5"/>';
    s += '<rect x="' + (sx - 11).toFixed(1) + '" y="' + (sy - 6).toFixed(1) + '" width="22" height="12" rx="2" fill="#3a3a4a" transform="rotate(' + (90 - i) + ' ' + sx.toFixed(1) + ' ' + sy.toFixed(1) + ')"/>';
    const rx = cx + (R + 10) * Math.sin(i * D2R), ry = cy - (R + 10) * Math.cos(i * D2R);
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + rx.toFixed(1) + '" y2="' + ry.toFixed(1) + '" stroke="#e8302a" stroke-width="' + (r == null ? 3.5 : 1.3) + '" opacity="' + (r == null ? 1 : 0.4) + '"/>';
    if (i > 0) { const p1 = [cx - 34 * Math.sin(i * D2R), cy - 34 * Math.cos(i * D2R)], lp = [cx - 50 * Math.sin(i / 2 * D2R), cy - 50 * Math.cos(i / 2 * D2R)];
      s += '<path d="M' + cx + ',' + (cy - 34) + ' A34,34 0 0 0 ' + p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + '" fill="none" stroke="#d0382a" stroke-width="1.8"/><text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + 4).toFixed(1) + '" font-size="11" font-weight="700" text-anchor="middle" fill="#d0382a">' + i + '°</text>'; }
    if (r != null) { const ex = cx + (R + 30) * Math.sin(r * D2R), ey = cy + (R + 30) * Math.cos(r * D2R); s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + ex.toFixed(1) + '" y2="' + ey.toFixed(1) + '" stroke="#e8302a" stroke-width="3.5"/>';
      if (r > 0.5) { const q1 = [cx + 40 * Math.sin(r * D2R), cy + 40 * Math.cos(r * D2R)], lp = [cx + 56 * Math.sin(r / 2 * D2R), cy + 56 * Math.cos(r / 2 * D2R)]; s += '<path d="M' + cx + ',' + (cy + 40) + ' A40,40 0 0 0 ' + q1[0].toFixed(1) + ',' + q1[1].toFixed(1) + '" fill="none" stroke="#2f8a4f" stroke-width="1.8"/><text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] + 4).toFixed(1) + '" font-size="11" font-weight="700" text-anchor="middle" fill="#2f8a4f">' + r1(r) + '°</text>'; } }
    else s += '<text x="' + (cx + 10) + '" y="' + (cy + 40) + '" font-size="13" font-weight="700" fill="#d0382a">全反射! 光は ' + dn + 'へ 出られない</text>';
    s += '<text x="' + (W - 6) + '" y="' + (H - 10) + '" font-size="10" text-anchor="end" fill="#7a7a8a">赤 = 入射角 ・ 緑 = 屈折角 ・ うすい 線 = 反射</text>';
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }

  // ================= ④ ふりこ =================
  function pend() {
    const st = { seenL: {}, massAt: {} }; let meas = null, timing = false;
    page('pend', '<div class="sl-fig sl-pend"><canvas id="slCv" width="380" height="250"></canvas></div><div class="sl-read" id="slRead"></div>' +
      '<div class="sl-sw"><span class="sl-swd" id="slSw">0.00</span><button class="sl-act" id="slSwBtn">⏱ 10往復を はかる</button></div>' +
      slider('slL', 'ふりこの 長さ', 0.25, 2, 0.05, 1, ' m') + slider('slAmp', 'ふれはば', 5, 30, 5, 15, '°') + slider('slM', 'おもりの 重さ', 50, 200, 50, 100, ' g'),
      '<p>ふりこが 1往復する 時間 (周期) は <b>ふりこの 長さだけで 決まる</b>。おもりの 重さや ふれはば (小さい とき) を 変えても 変わらない (ふりこの 等時性 — ガリレオが 発見)。</p><p>長さを <b>4倍</b> に すると 周期は <b>2倍</b>。周期 ≒ 2 × √長さ (m) 秒 (地球上)。</p><p><b>10往復を はかる 理由</b>: ストップウォッチを おす タイミングの ずれ (0.1〜0.2秒) を 10で わって 小さく できる。</p><p>長さは 支点から おもりの <b>中心</b> まで。</p>');
    const cv = $('slCv'), ctx = cv.getContext('2d'), t0 = performance.now();
    const T = () => 2 * Math.PI * Math.sqrt(+$('slL').value / 9.8);
    const cond = () => $('slL').value + '|' + $('slAmp').value + '|' + $('slM').value;
    const upd = () => { const L = +$('slL').value, A = +$('slAmp').value, M = +$('slM').value; $('slLV').textContent = L.toFixed(2); $('slAmpV').textContent = A; $('slMV').textContent = M;
      const per = T(); $('slRead').innerHTML = '<span>周期 (1往復) <b>' + per.toFixed(2) + ' 秒</b></span><span>10往復 <b>' + (per * 10).toFixed(1) + ' 秒</b></span><span>1分間に <b>' + (60 / per).toFixed(1) + ' 往復</b></span>';
      if (meas && meas.c !== cond()) { meas = null; $('slSw').textContent = '0.00'; }
      if (Math.abs(per - 2) <= 0.05) mark('pend', 0);
      const key = L.toFixed(2); st.massAt[key] = st.massAt[key] || {}; st.massAt[key][M] = 1; if (Object.keys(st.massAt[key]).length >= 2) mark('pend', 1);
      st.seenL[key] = 1; if (st.seenL['0.25'] && st.seenL['1.00']) mark('pend', 2); };
    ['slL', 'slAmp', 'slM'].forEach(id => $(id).oninput = upd); upd();
    $('slSwBtn').onclick = () => {   // 10往復 (5倍速で 表示)。人の 反応の ずれ ±0.15秒
      if (timing) return; timing = true; sfx('click'); const per = T(), total = per * 10, err = (Math.random() - 0.5) * 0.3, c = cond(), start = performance.now(), btn = $('slSwBtn'); btn.disabled = true; btn.textContent = '計測中… (5倍速)';
      const tick = () => { if (!document.body.contains(btn)) { timing = false; return; } const el = (performance.now() - start) / 1000 * 5;
        if (el >= total) { const t10 = Math.round((total + err) * 100) / 100; $('slSw').textContent = t10.toFixed(2); meas = { c: c, t10: t10 }; timing = false; btn.disabled = false; btn.textContent = '⏱ もう 一度 はかる'; sfx('correct'); return; }
        $('slSw').textContent = el.toFixed(2); later(tick, 40); };
      tick();
    };
    bindNB('pend', () => meas && meas.c === cond() ? { L: +(+$('slL').value).toFixed(2), A: +$('slAmp').value, M: +$('slM').value, t10: meas.t10, T: r2(meas.t10 / 10) } : '⏱ で 10往復を はかってから 記録しよう');
    const draw = now => {
      if (!document.body.contains(cv)) { raf = null; return; }
      const L = +$('slL').value, A = +$('slAmp').value * D2R, M = +$('slM').value, per = T(), th = A * Math.cos(2 * Math.PI * ((now - t0) / 1000) / per);
      const px = 190, py = 18, len = 20 + L * 105, bx = px + len * Math.sin(th), by = py + len * Math.cos(th), br = 7 + M / 25;
      ctx.clearRect(0, 0, 380, 250); ctx.fillStyle = '#5a4a3a'; ctx.fillRect(110, 8, 160, 10);
      ctx.strokeStyle = '#c9c4b8'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + len + 20); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = '#2a2a3a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke();
      ctx.fillStyle = '#d9822b'; ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#8a4a1a'; ctx.stroke();
      ctx.fillStyle = '#2e5fa8'; ctx.font = 'bold 12px sans-serif'; ctx.fillText(L.toFixed(2) + ' m', px + 8, py + len / 2);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
  }

  // ================= ⑤ 斜面と エネルギー =================
  const G = 9.8, CM = 2.5;   // 木片の ものさし: 1cm = 2.5px
  function slopeCalc(h, th, m) { const v = Math.sqrt(2 * G * h), L = h / Math.sin(th * D2R), t = Math.sqrt(2 * L / (G * Math.sin(th * D2R))), d = 0.4 * m * h, E = m / 1000 * G * h; return { v: v, L: L, t: t, d: d, E: E }; }
  function slope() {
    let res = null, running = false; const angAt = {};
    page('slope', '<div class="sl-fig sl-pend"><canvas id="slCv" width="380" height="240"></canvas></div><div class="sl-read" id="slRead"></div>' +
      '<div class="sl-sw"><button class="sl-act" id="slRun">▶ 小球を 転がす</button></div>' +
      slider('slH', '小球を はなす 高さ', 0.1, 0.5, 0.05, 0.2, ' m') + slider('slTh', '斜面の 角度', 15, 45, 5, 30, '°') + slider('slMs', '小球の 質量', 50, 200, 50, 100, ' g'),
      '<p><b>位置エネルギー</b> = 質量 × 重力 (9.8) × 高さ。高い 所に ある 物ほど、重い 物ほど 大きい。</p><p>転がる 間に 位置エネルギーが <b>運動エネルギー</b> に 変わる。(摩擦が なければ) 合計は 一定 = <b>力学的エネルギーの 保存</b>。</p><p>斜面の 下での 速さは <b>高さだけで 決まる</b> (角度・質量に よらない)。角度が 急だと 早く 着くが、速さは 同じ。</p><p>木片の 移動距離 ∝ 小球の エネルギー → 高さにも 質量にも 比例。</p>');
    const cv = $('slCv'), ctx = cv.getContext('2d');
    const P = () => ({ h: +$('slH').value, th: +$('slTh').value, m: +$('slMs').value });
    const geo = p => { const bx = 210, by = 200, run = 150, top = by - run * Math.tan(p.th * D2R), f = p.h / 0.5; return { bx: bx, by: by, run: run, top: top, sx: bx - run * f, sy: by - (by - top) * f }; };
    function scene(p, ballX, ballY, blockX, pe, ke) {
      const g = geo(p); ctx.clearRect(0, 0, 380, 240); ctx.fillStyle = '#fbfaf5'; ctx.fillRect(0, 0, 380, 240);
      ctx.fillStyle = '#d9c8a8'; ctx.beginPath(); ctx.moveTo(g.bx - g.run, g.by); ctx.lineTo(g.bx - g.run, g.top); ctx.lineTo(g.bx, g.by); ctx.closePath(); ctx.fill(); ctx.strokeStyle = '#8a6a3a'; ctx.lineWidth = 2; ctx.stroke();
      ctx.strokeStyle = '#5a4a3a'; ctx.beginPath(); ctx.moveTo(0, g.by); ctx.lineTo(380, g.by); ctx.stroke();
      ctx.fillStyle = '#6a7a8a'; ctx.font = '9px sans-serif';
      for (let cm = 0; cm <= 50; cm += 2) { const x = 250 + cm * CM; if (x > 378) break; ctx.fillRect(x, g.by + 2, 1, cm % 10 ? 4 : 8); if (cm % 10 === 0) ctx.fillText(cm, x - 3, g.by + 20); }
      ctx.fillText('cm', 362, g.by + 32);
      ctx.setLineDash([3, 3]); ctx.strokeStyle = '#2e6fb8'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(g.sx, g.sy); ctx.lineTo(20, g.sy); ctx.moveTo(20, g.sy); ctx.lineTo(20, g.by); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#2e6fb8'; ctx.font = 'bold 11px sans-serif'; ctx.fillText('h=' + p.h.toFixed(2) + 'm', 24, (g.sy + g.by) / 2);
      ctx.fillStyle = '#26323d'; ctx.font = '10px sans-serif'; ctx.fillText(p.th + '°', g.bx - 34, g.by - 5);
      ctx.fillStyle = '#b08a5a'; ctx.fillRect(blockX, g.by - 18, 30, 18); ctx.strokeStyle = '#6a4a2a'; ctx.strokeRect(blockX, g.by - 18, 30, 18); ctx.fillStyle = '#fff'; ctx.font = '9px sans-serif'; ctx.fillText('木片', blockX + 6, g.by - 6);
      const br = 5 + p.m / 40; ctx.fillStyle = '#6a7a8a'; ctx.beginPath(); ctx.arc(ballX, ballY - br, br, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#2a3a4a'; ctx.stroke();
      const full = p.m / 1000 * G * 0.5, h0 = 70; ctx.fillStyle = '#26323d'; ctx.font = 'bold 10px sans-serif'; ctx.fillText('エネルギー', 290, 16);
      [['位置', pe, '#2e6fb8'], ['運動', ke, '#d0382a']].forEach((q, i) => { const x = 286 + i * 44, hh = h0 * Math.max(0, q[1]) / full; ctx.fillStyle = '#eef2f6'; ctx.fillRect(x, 24, 26, h0); ctx.fillStyle = q[2]; ctx.fillRect(x, 24 + h0 - hh, 26, hh); ctx.fillStyle = '#26323d'; ctx.font = '10px sans-serif'; ctx.fillText(q[0], x + 2, 108); });
    }
    const idle = () => { const p = P(), g = geo(p); scene(p, g.sx + 6, g.sy + 3, 250, p.m / 1000 * G * p.h, 0); };
    const show = () => { const p = P(), c = slopeCalc(p.h, p.th, p.m); $('slHV').textContent = p.h.toFixed(2); $('slThV').textContent = p.th; $('slMsV').textContent = p.m;
      $('slRead').innerHTML = res && res.k === JSON.stringify(p) ? '<span>斜面の 下での 速さ <b>' + r2(c.v) + ' m/s</b></span><span>下りる 時間 <b>' + r2(c.t) + ' 秒</b></span><span>木片の 移動距離 <b>' + r1(c.d) + ' cm</b></span><span>位置エネルギー <b>' + r2(c.E) + ' J</b></span>' : '<span>▶ を おして 転がそう</span><span>はじめの 位置エネルギー <b>' + r2(c.E) + ' J</b></span>';
      if (!running) idle(); };
    ['slH', 'slTh', 'slMs'].forEach(id => $(id).oninput = show);
    $('slRun').onclick = () => {
      if (running) return; running = true; sfx('click'); const p = P(), c = slopeCalc(p.h, p.th, p.m), g = geo(p), slow = 1.6, start = performance.now(), Et = p.m / 1000 * G * p.h;
      const tFloor = 0.5 / c.v, dpx = c.d * CM;
      const step = now => {
        if (!document.body.contains(cv)) { raf = null; running = false; return; }
        const t = (now - start) / 1000 / slow;
        if (t < c.t) { const fr = (0.5 * G * Math.sin(p.th * D2R) * t * t) / c.L, x = g.sx + (g.bx - g.sx) * fr, y = g.sy + (g.by - g.sy) * fr, pe = p.m / 1000 * G * p.h * (1 - fr); scene(p, x + 6, y + 3, 250, pe, Et - pe); }
        else if (t < c.t + tFloor) scene(p, g.bx + 38 * (t - c.t) / tFloor, g.by, 250, 0, Et);
        else { const u = Math.min(1, (t - c.t - tFloor) / 0.7), e = 1 - (1 - u) * (1 - u); scene(p, 248, g.by, 250 + dpx * e, 0, Et * (1 - e));
          if (u >= 1) { running = false; raf = null; res = { k: JSON.stringify(p) }; const hk = p.h.toFixed(2); angAt[hk] = angAt[hk] || {}; angAt[hk][p.th] = 1; sfx('correct'); show(); scene(p, 248, g.by, 250 + dpx, 0, 0);
            if (Math.abs(c.d - 16) < 1e-6) mark('slope', 0); if (Object.keys(angAt[hk]).length >= 2) mark('slope', 1); if (c.E > 0.2) mark('slope', 2); return; } }
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    bindNB('slope', () => { const p = P(); if (!res || res.k !== JSON.stringify(p)) return '▶ で 転がしてから 記録しよう'; const c = slopeCalc(p.h, p.th, p.m); return { h: +p.h.toFixed(2), th: p.th, m: p.m, v: r2(c.v), d: r1(c.d) }; });
    show();
  }

  // ================= ⑥ 化学変化と 質量 =================
  const METAL = { cu: { n: '銅', r: 0.25, c0: [181, 101, 58], c1: [42, 37, 34], ox: '酸化銅 (黒)' }, mg: { n: 'マグネシウム', r: 2 / 3, c0: [200, 204, 210], c1: [246, 246, 240], ox: '酸化マグネシウム (白)' } };
  function chemMass(met, m0, k) { return m0 * (1 + METAL[met].r * (1 - Math.pow(0.25, k))); }
  function chem() {
    let mode = 'ox', met = 'cu', k = 0, hist = [], heating = false, cons = 0;
    page('chem', seg('cm', [['ox', '🔥 金属の 酸化'], ['cons', '⚖️ 質量保存']], 'ox') + '<div id="slChemBox"></div>',
      '<p>金属を 加熱すると 空気中の <b>酸素と 結びつき (酸化)</b>、結びついた 酸素の 分だけ 質量が ふえる。何回か 加熱すると 全部 結びつき、質量は それ以上 ふえない。</p><p><b>銅 : 酸素 = 4 : 1</b> (2Cu + O₂ → 2CuO、黒色)。<b>マグネシウム : 酸素 = 3 : 2</b> (2Mg + O₂ → 2MgO、白色、強い 光を 出す)。</p><p><b>質量保存の 法則</b>: 化学変化の 前後で 物質全体の 質量は 変わらない。ふたを 開けると 気体 (二酸化炭素) が にげるので 軽く なる。</p><p>NaHCO₃ + HCl → NaCl + H₂O + CO₂</p>');
    const box = () => $('slChemBox'), m0 = () => +$('slM0').value;
    const constant = () => k >= 2 && Math.abs(hist[hist.length - 1] - hist[hist.length - 2]) < 0.005;
    function oxUI() {
      box().innerHTML = seg('met', [['cu', '銅'], ['mg', 'マグネシウム']], met) + '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div><div class="sl-sw"><button class="sl-act" id="slHeat">🔥 加熱する (1回)</button><button class="sl-act ghost" id="slReset">新しい 粉末に する</button></div>' + slider('slM0', '金属の 粉末の 質量', 0.4, 2.0, 0.2, 1.2, ' g') + '<div id="slHist"></div>';
      bindSeg('met', v => { met = v; reset(); });
      $('slM0').oninput = reset; $('slReset').onclick = () => { sfx('click'); reset(); };
      $('slHeat').onclick = () => { if (heating) return; heating = true; sfx('click'); drawOx(true); later(() => { k++; hist.push(r2(chemMass(met, m0(), k))); heating = false; drawOx(false); checkOx(); }, 900); };
      reset();
    }
    function reset() { $('slM0V').textContent = m0().toFixed(1); k = 0; hist = [r2(m0())]; heating = false; drawOx(false); }
    function drawOx(fire) {
      const M = METAL[met], fr = 1 - Math.pow(0.25, k), col = M.c0.map((c, i) => Math.round(c + (M.c1[i] - c) * fr)), mass = hist[hist.length - 1];
      let s = '<rect width="380" height="200" fill="#fbfaf5"/>';
      s += '<line x1="70" y1="150" x2="50" y2="196" stroke="#6a6a7a" stroke-width="4"/><line x1="150" y1="150" x2="170" y2="196" stroke="#6a6a7a" stroke-width="4"/><rect x="56" y="140" width="108" height="10" fill="#8a8a9a"/><path d="M60,140 l100,0" stroke="#c9c9d4" stroke-width="2" stroke-dasharray="2 2"/>';
      s += '<path d="M68,138 Q110,120 152,138 Z" fill="#c9ccd2" stroke="#7a7a8a"/><ellipse cx="110" cy="133" rx="30" ry="5" fill="rgb(' + col.join(',') + ')"/>';
      s += '<rect x="100" y="166" width="20" height="32" fill="#4a5a6a"/>' + (fire ? '<path class="sl-flame" d="M110,164 C94,152 104,140 110,150 C112,138 124,152 110,164 Z" fill="#3a8ae8" opacity=".85"/><path class="sl-flame" d="M110,164 C102,156 106,149 110,153 C112,148 118,155 110,164 Z" fill="#9ad0ff"/>' + (met === 'mg' && k === 0 ? '<circle cx="110" cy="128" r="22" fill="rgba(255,255,255,.9)"/>' : '') : '');
      s += '<text x="110" y="112" font-size="11" text-anchor="middle" fill="#26323d">' + (k === 0 ? M.n + ' (加熱前)' : fr > 0.99 ? M.ox : M.n + ' → ' + M.ox) + '</text>';
      s += '<rect x="226" y="96" width="130" height="80" rx="8" fill="#e8ebef" stroke="#8a8a9a"/><rect x="240" y="140" width="102" height="26" rx="4" fill="#1d2a22"/><text x="336" y="159" font-size="17" text-anchor="end" fill="#7aff9a" font-family="monospace">' + mass.toFixed(2) + ' g</text><text x="291" y="128" font-size="10" text-anchor="middle" fill="#5a6a7a">電子てんびん</text><rect x="246" y="86" width="90" height="10" rx="2" fill="#b8bec6"/>';
      s += '<text x="190" y="20" font-size="11" text-anchor="middle" fill="#7a7a8a">加熱 → 冷ます → はかる (皿の 質量は 引いて ある)</text>';
      $('slFig').innerHTML = '<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
      $('slRead').innerHTML = '<span>加熱 <b>' + k + ' 回</b></span><span>質量 <b>' + mass.toFixed(2) + ' g</b></span><span>結びついた 酸素 <b>' + (mass - m0()).toFixed(2) + ' g</b></span>' + (constant() ? '<span style="color:#2f8a4f"><b>✔ 質量が 変わらなく なった</b></span>' : k ? '<span>まだ 質量が ふえて いる…</span>' : '');
      const top = m0() * (1 + M.r) * 1.08, bw = 26; let hb = '<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif"><text x="4" y="12" font-size="10" fill="#26323d">加熱 回数と 質量</text><line x1="30" y1="100" x2="336" y2="100" stroke="#3a3a4a"/>';
      hist.slice(-9).forEach((v, j) => { const i = Math.max(0, hist.length - 9) + j, hh = v / top * 80, x = 36 + j * (bw + 7); hb += '<rect x="' + x + '" y="' + (100 - hh) + '" width="' + bw + '" height="' + hh + '" fill="' + (i ? '#e8902a' : '#9aa8b5') + '"/><text x="' + (x + bw / 2) + '" y="' + (96 - hh) + '" font-size="8.5" text-anchor="middle">' + v.toFixed(2) + '</text><text x="' + (x + bw / 2) + '" y="112" font-size="9" text-anchor="middle" fill="#5a6a7a">' + i + '回</text>'; });
      $('slHist').innerHTML = '<div class="sl-fig">' + hb + '</svg></div>';
    }
    function checkOx() { if (!constant()) return; const mass = hist[hist.length - 1]; if (met === 'cu' && Math.abs(m0() - 1.2) < 1e-9) mark('chem', 0); if (met === 'mg' && Math.abs(mass - m0() - 0.4) < 0.006) mark('chem', 1); }
    function consUI() {
      box().innerHTML = '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div><div class="sl-sw"><button class="sl-act" id="slTilt">容器を かたむけて 反応させる</button><button class="sl-act ghost" id="slOpen">ふたを 開ける</button><button class="sl-act ghost" id="slAgain">はじめから</button></div>';
      $('slTilt').onclick = () => { if (cons) return; sfx('click'); cons = 1; drawCons(); mark('chem', 2); };
      $('slOpen').onclick = () => { if (cons !== 1) return; sfx('click'); cons = 2; drawCons(); };
      $('slAgain').onclick = () => { sfx('click'); cons = 0; drawCons(); };
      drawCons();
    }
    function drawCons() {
      const mass = cons === 2 ? 79.56 : 80.00;
      let s = '<rect width="380" height="210" fill="#fbfaf5"/><rect x="40" y="160" width="190" height="34" rx="6" fill="#e8ebef" stroke="#8a8a9a"/><rect x="120" y="168" width="96" height="20" rx="3" fill="#1d2a22"/><text x="210" y="183" font-size="15" text-anchor="end" fill="#7aff9a" font-family="monospace">' + mass.toFixed(2) + ' g</text>';
      s += '<path d="M90,158 L90,70 Q90,58 104,52 L104,40 L136,40 L136,52 Q150,58 150,70 L150,158 Z" fill="rgba(200,230,245,.55)" stroke="#5a8ab8" stroke-width="2"/>';
      s += cons === 2 ? '<rect x="150" y="26" width="34" height="12" rx="3" fill="#d0382a" transform="rotate(25 167 32)"/>' : '<rect x="102" y="30" width="36" height="12" rx="3" fill="#d0382a"/>';
      s += '<path d="M92,158 L92,128 L148,128 L148,158 Z" fill="rgba(240,240,250,.9)"/><text x="120" y="148" font-size="9" text-anchor="middle" fill="#5a6a7a">うすい 塩酸</text>';
      s += cons ? '' : '<g transform="rotate(-12 120 110)"><rect x="112" y="80" width="14" height="44" rx="6" fill="rgba(255,255,255,.95)" stroke="#8a8a9a"/><rect x="113" y="104" width="12" height="18" rx="5" fill="#f6f2e2"/></g><text x="156" y="98" font-size="9" fill="#5a6a7a">← 炭酸水素ナトリウム</text>';
      if (cons === 1) for (let i = 0; i < 14; i++) s += '<circle class="sl-bub" style="animation-delay:' + (i * 0.17).toFixed(2) + 's" cx="' + (98 + (i * 37) % 48) + '" cy="150" r="' + (2 + i % 3) + '" fill="none" stroke="#5a8ab8"/>';
      if (cons === 2) s += '<text x="190" y="20" font-size="11" fill="#7a7a8a">シュッ… 二酸化炭素が にげた</text>';
      s += '<text x="250" y="70" font-size="12" fill="#26323d" font-weight="700">' + ['① 反応前', '② ふたを したまま', '③ ふたを 開けた'][cons] + '</text>';
      s += '<text x="250" y="92" font-size="11" fill="#26323d">' + ['80.00 g', '80.00 g → 変わらない!', '79.56 g (0.44g へった)'][cons] + '</text>';
      $('slFig').innerHTML = '<svg viewBox="0 0 380 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
      $('slRead').innerHTML = ['<span>反応前の 質量 <b>80.00 g</b></span><span>ペットボトルの 中で 試験管を かたむけると 反応する</span>', '<span>反応後 <b>80.00 g</b></span><span>あわ (二酸化炭素) が 出たが、容器の 中に ある → <b>質量は 変わらない</b></span>', '<span>ふたを 開けた後 <b>79.56 g</b></span><span>にげた 二酸化炭素の 質量 <b>0.44 g</b></span>'][cons];
    }
    bindSeg('cm', v => { mode = v; v === 'ox' ? oxUI() : consUI(); });
    bindNB('chem', () => { if (mode !== 'ox') return '記録表は「金属の 酸化」で 使うよ'; if (!constant()) return k ? 'まだ 質量が 変わって いる。もう一度 加熱しよう' : '🔥 で 加熱してから 記録しよう'; const m1 = hist[hist.length - 1]; return { met: METAL[met].n, m0: r2(m0()), m1: r2(m1), o: r2(m1 - m0()) }; });
    oxUI();
  }

  // ================= ⑦ 月の 満ち欠け =================
  const PHASES = [[0, '新月'], [3, '三日月'], [7.4, '上弦の 月'], [11, '十日夜の 月 (ふくらんで いく)'], [14.8, '満月'], [18.5, '欠けて いく 月'], [22.1, '下弦の 月'], [26, '明け方の 細い 月']];
  function phaseName(d) { let best = PHASES[0]; PHASES.forEach(p => { if (Math.abs(p[0] - d) < Math.abs(best[0] - d)) best = p; }); if (d > 27.5) best = PHASES[0]; return best[1]; }
  function moon() {
    let last = null;
    page('moon', '<div class="sl-moonrow"><div class="sl-fig" id="slTop"></div><div class="sl-fig" id="slView"></div></div><div class="sl-read" id="slRead"></div>' + slider('slD', '月齢 (新月からの 日数)', 0, 29.5, 0.5, 3, ' 日'),
      '<p>月は 太陽の 光を 反射して 光る。いつも <b>太陽の 方が 半分 光って</b> いて、地球から 見える 光った 部分の 形が 変わる。</p><p>新月 → 三日月 (夕方 西) → 上弦 (夕方 南、右半分) → 満月 (真夜中 南) → 下弦 (明け方 南、左半分) → 新月。約 29.5日で 一周。</p><p>満月の とき、太陽・地球・月が 一直線に 並ぶと <b>月食</b>。新月の ときに 並ぶと <b>日食</b>。</p><p>月は 毎日 約 50分ずつ おそく のぼる。</p>');
    const upd = () => { const d = +$('slD').value; $('slDV').textContent = d; const th = d / 29.53 * 2 * Math.PI;
      $('slTop').innerHTML = topSVG(th); $('slView').innerHTML = viewSVG(th);
      const k = (1 - Math.cos(th)) / 2, when = d < 1 || d > 28.5 ? '見えない (太陽と 同じ 方向)' : d < 5 ? '夕方、西の 空に 低く' : d < 10 ? '夕方、南の 空' : d < 13 ? '夜の はじめ、南東〜南' : d < 17 ? '真夜中、南の 空 (夕方に 東から のぼる)' : d < 20 ? '夜半すぎ〜明け方' : d < 25 ? '明け方、南の 空' : '明け方、東の 空に 低く';
      $('slRead').innerHTML = '<span><b>' + phaseName(d) + '</b></span><span>光って 見える 割合 <b>' + Math.round(k * 100) + '%</b></span><span>見える ころ <b>' + when + '</b></span>';
      last = { d: d, name: phaseName(d), k: Math.round(k * 100) };
      if (Math.abs(d - 14.8) <= 0.5) mark('moon', 0); if (Math.abs(d - 7.4) <= 0.5) mark('moon', 1); if (d >= 2.5 && d <= 3.5) mark('moon', 2); };
    $('slD').oninput = upd; bindNB('moon', () => last); upd();
  }
  function topSVG(th) {
    const cx = 120, cy = 110, R = 72, ang = Math.PI + th, mx = cx + R * Math.cos(ang), my = cy + R * Math.sin(ang) * -1;
    let s = '<rect width="240" height="220" fill="#101a33"/>';
    for (let i = 0; i < 5; i++) s += '<line x1="0" y1="' + (40 + i * 35) + '" x2="26" y2="' + (40 + i * 35) + '" stroke="#ffd84a" stroke-width="1.5"/><polygon points="30,' + (40 + i * 35) + ' 24,' + (36 + i * 35) + ' 24,' + (44 + i * 35) + '" fill="#ffd84a"/>';
    s += '<text x="6" y="22" font-size="11" fill="#ffd84a">☀ 太陽の 光</text><circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="#4a5a7a" stroke-dasharray="4 4"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="15" fill="#2e6fb8"/><path d="M' + cx + ',' + (cy - 15) + ' A15,15 0 0 1 ' + cx + ',' + (cy + 15) + ' Z" fill="rgba(0,0,0,.45)"/><text x="' + cx + '" y="' + (cy + 30) + '" font-size="10" text-anchor="middle" fill="#9ab4e0">地球</text>';
    s += '<circle cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="10" fill="#e8e4d4"/><path d="M' + mx.toFixed(1) + ',' + (my - 10).toFixed(1) + ' A10,10 0 0 1 ' + mx.toFixed(1) + ',' + (my + 10).toFixed(1) + ' Z" fill="#3a3a48"/>';
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + mx.toFixed(1) + '" y2="' + my.toFixed(1) + '" stroke="#7fe0a0" stroke-width="1" stroke-dasharray="2 3"/><text x="232" y="212" font-size="10" text-anchor="end" fill="#9ab4e0">北極の 上から 見た 図 (反時計回り)</text>';
    return '<svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }
  function viewSVG(th) {
    const cx = 80, cy = 95, r = 55, c = Math.cos(th), waxing = Math.sin(th) >= 0, rx = Math.abs(c) * r, lit = waxing ? 1 : 0;
    const d = 'M' + cx + ',' + (cy - r) + ' A' + r + ',' + r + ' 0 0 ' + lit + ' ' + cx + ',' + (cy + r) + ' A' + rx.toFixed(1) + ',' + r + ' 0 0 ' + ((c > 0) === waxing ? 0 : 1) + ' ' + cx + ',' + (cy - r) + ' Z';
    const s = '<rect width="160" height="220" fill="#101a33"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#2c3346"/><path d="' + d + '" fill="#f3eccb"/><text x="80" y="176" font-size="11" text-anchor="middle" fill="#9ab4e0">地球から 見た 月</text><text x="80" y="194" font-size="10" text-anchor="middle" fill="#6a7a9a">(日本から 見た 向き)</text>';
    return '<svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }

  // ================= ⑧ 太陽の 日周運動 =================
  const PLACES = [['sapporo', '札幌', 43.1], ['tokyo', '東京', 35.7], ['naha', '那覇', 26.2], ['sing', 'シンガポール', 1.3], ['sydney', 'シドニー', -33.9], ['tromso', 'トロムソ (ノルウェー)', 69.6], ['pole', '北極点', 89.9]];
  const SEASONS = [['spring', '春分', 0], ['summer', '夏至', 23.4], ['autumn', '秋分', 0], ['winter', '冬至', -23.4]];
  function sunPos(lat, dec, t) { const H = (t - 12) * 15 * D2R, f = lat * D2R, d = dec * D2R;
    const sa = Math.sin(f) * Math.sin(d) + Math.cos(f) * Math.cos(d) * Math.cos(H), a = Math.asin(Math.max(-1, Math.min(1, sa)));
    const az = Math.atan2(-Math.cos(d) * Math.sin(H), Math.sin(d) * Math.cos(f) - Math.cos(d) * Math.cos(H) * Math.sin(f)); return { alt: a / D2R, az: (az / D2R + 360) % 360 }; }
  function dirName(az) { return ['北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東', '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西'][Math.round(az / 22.5) % 16]; }
  function dayInfo(lat, dec) { const x = -Math.tan(lat * D2R) * Math.tan(dec * D2R); if (x <= -1) return { polar: 'day' }; if (x >= 1) return { polar: 'night' }; const H0 = Math.acos(x) / D2R / 15; return { rise: 12 - H0, set: 12 + H0, len: 2 * H0 }; }
  function hm(h) { const m = Math.round(((h % 24) + 24) % 24 * 60); return Math.floor(m / 60) % 24 + ':' + String(m % 60).padStart(2, '0'); }
  function sky() {
    let pl = 'tokyo', se = 'summer', last = null;
    page('sky', '<label class="sl-sel">場所 <select id="slPl">' + PLACES.map(p => '<option value="' + p[0] + '"' + (p[0] === pl ? ' selected' : '') + '>' + p[1] + ' (' + (p[2] >= 0 ? '北緯 ' : '南緯 ') + Math.round(Math.abs(p[2]) * 10) / 10 + '°)</option>').join('') + '</select></label>' +
      seg('se', SEASONS.map(s => [s[0], s[1]]), se) + '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' + slider('slT', '時刻 (太陽の 時刻・南中 = 12時)', 0, 24, 0.5, 12, ' 時'),
      '<p>太陽は 東から のぼり、南の 空で いちばん 高く なり (<b>南中</b>)、西に しずむ。地球が 西から 東へ <b>自転</b> して いる ため (日周運動、1時間に 15°)。</p><p><b>南中高度</b> = 90° − 緯度 + 赤緯 (夏至 +23.4°、春分・秋分 0°、冬至 −23.4°)。東京: 夏至 約 78°、春分 約 54°、冬至 約 31°。</p><p>夏は 太陽の 通り道が 北に よって 長く なり、昼が 長い。地軸が 23.4° かたむいて 公転して いるから 季節が ある。</p><p>北極圏の 夏は 一日中 しずまない <b>白夜</b>、冬は のぼらない <b>極夜</b>。南半球では 太陽は <b>北の 空</b> を 通り、6月が 冬。</p>');
    const P = () => PLACES.find(p => p[0] === pl), S = () => SEASONS.find(s => s[0] === se);
    const upd = () => { const t = +$('slT').value; $('slTV').textContent = hm(t); const p = P(), s = S(), sp = sunPos(p[2], s[2], t), di = dayInfo(p[2], s[2]), culm = 90 - Math.abs(p[2] - s[2]);
      const key = p[1] + '・' + s[1], rows = note('sky').rows.filter(r => r.key === key);
      $('slFig').innerHTML = skySVG(p[2], s[2], t, rows);
      $('slRead').innerHTML = '<span>太陽の 高度 <b>' + r1(sp.alt) + '°</b>' + (sp.alt < 0 ? ' (しずんで いる)' : '') + '</span><span>方位 <b>' + dirName(sp.az) + '</b></span><span>南中高度 <b>' + r1(culm) + '°</b>' + (p[2] < s[2] ? ' (北の 空)' : '') + '</span>' +
        (di.polar ? '<span><b>' + (di.polar === 'day' ? '白夜 — 一日中 しずまない' : '極夜 — 一日中 のぼらない') + '</b></span>' : '<span>日の出 <b>' + hm(di.rise) + '</b> 日の入り <b>' + hm(di.set) + '</b></span><span>昼の 長さ <b>' + r1(di.len) + ' 時間</b></span>');
      last = sp.alt <= 0 ? '太陽が しずんで いる 時刻は 透明半球に 記録 できないよ' : { place: p[1].replace(/ \(.*\)/, ''), season: s[1], t: t, alt: r1(sp.alt), dir: dirName(sp.az), key: key };
      if (pl === 'tokyo' && se === 'summer' && t === 12) mark('sky', 0);
      if (rows.length >= 5) mark('sky', 1);
      if ((t === 0 || t === 24) && sp.alt > 0) mark('sky', 2); };
    RUN._skyUpd = upd;
    $('slT').oninput = upd; $('slPl').onchange = () => { pl = $('slPl').value; sfx('click'); upd(); }; bindSeg('se', v => { se = v; upd(); });
    bindNB('sky', () => last);
    const rb = $('slRecBtn'), orig = rb.onclick; rb.onclick = () => { orig(); upd(); };
    upd();
  }
  function skySVG(lat, dec, t, rows) {
    const W = 380, H = 250, cx = 190, cy = 178, R = 140, ep = 22 * D2R;
    const prj = (alt, az) => { const a = alt * D2R, z = az * D2R, e = Math.cos(a) * Math.sin(z), n = Math.cos(a) * Math.cos(z), u = Math.sin(a); return [cx + R * e, cy - R * (u * Math.cos(ep) + n * Math.sin(ep))]; };
    let s = '<rect width="' + W + '" height="' + H + '" fill="#eef5fb"/><rect y="' + cy + '" width="' + W + '" height="' + (H - cy) + '" fill="#e2d8c0"/>';
    s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + R + '" ry="' + (R * Math.sin(ep)).toFixed(1) + '" fill="#f4eedc" stroke="#9a8a6a" stroke-width="1.5"/>';
    s += '<path d="M' + (cx - R) + ',' + cy + ' A' + R + ',' + R + ' 0 0 1 ' + (cx + R) + ',' + cy + '" fill="rgba(255,255,255,.35)" stroke="#8aa8c8" stroke-width="1.5"/>';
    let mer = ''; for (let a = 0; a <= 180; a += 5) { const q = a <= 90 ? prj(a, 180) : prj(180 - a, 0); mer += (a ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); } s += '<path d="' + mer + '" fill="none" stroke="#b8c8d8" stroke-dasharray="3 3"/>';
    [['南', 180, 0, 16, 'middle'], ['北', 0, 0, -5, 'middle'], ['東', 90, 7, 4, 'start'], ['西', 270, -7, 4, 'end']].forEach(d => { const q = prj(0, d[1]); s += '<text x="' + (q[0] + d[2]).toFixed(1) + '" y="' + (q[1] + d[3]).toFixed(1) + '" font-size="13" font-weight="700" text-anchor="' + d[4] + '" fill="#5a4a2a">' + d[0] + '</text>'; });
    let up = '', dn = '', pen = null;
    for (let h = 0; h <= 24.001; h += 0.25) { const sp = sunPos(lat, dec, h), q = prj(sp.alt, sp.az), above = sp.alt >= 0, cmd = (pen === above ? 'L' : 'M') + q[0].toFixed(1) + ',' + q[1].toFixed(1); if (above) up += cmd; else dn += cmd; pen = above; }
    s += '<path d="' + dn + '" fill="none" stroke="#c8b898" stroke-width="1.2" stroke-dasharray="2 4"/><path d="' + up + '" fill="none" stroke="#e8902a" stroke-width="2.2"/>';
    rows.forEach(r => { const sp = sunPos(lat, dec, r.t), q = prj(sp.alt, sp.az); s += '<circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="4" fill="#26323d"/><text x="' + (q[0] + 6).toFixed(1) + '" y="' + (q[1] - 5).toFixed(1) + '" font-size="9" fill="#26323d">' + hm(r.t) + '</text>'; });
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="4" fill="#2e6fb8"/><text x="' + (cx + 6) + '" y="' + (cy + 12) + '" font-size="9" fill="#2e6fb8">観測者</text>';
    const sp = sunPos(lat, dec, t), q = prj(sp.alt, sp.az);
    if (sp.alt >= 0) s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + q[0].toFixed(1) + '" y2="' + q[1].toFixed(1) + '" stroke="#e8902a" stroke-dasharray="3 3"/><circle cx="' + q[0].toFixed(1) + '" cy="' + q[1].toFixed(1) + '" r="10" fill="#ffc53a" stroke="#e8902a" stroke-width="2"/>';
    else s += '<text x="' + cx + '" y="44" font-size="13" text-anchor="middle" fill="#5a6a7a">🌙 太陽は 地平線の 下</text>';
    s += '<text x="6" y="16" font-size="10" fill="#5a6a7a">透明半球 (南側の ななめ上から 見た 図) ・ ● = 記録した 点</text>';
    return '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }

  // ================= ⑨ 電磁誘導 =================
  function inductD(pole, act, n, sp) { const sign = (pole === 'N' ? 1 : -1) * (act === 'in' ? 1 : -1); return sign * Math.min(20, Math.round(n / 50 * sp)); }
  function induct() {
    let pole = 'N', pos = 0, moving = false, last = null; const leftWays = {};
    page('induct', seg('pole', [['N', 'N極を コイルに 向ける'], ['S', 'S極を コイルに 向ける']], 'N') + '<div class="sl-fig"><svg id="slInd" viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif"></svg></div><div class="sl-read" id="slRead"></div>' +
      '<div class="sl-sw"><button class="sl-act" id="slIn">▶ コイルに 入れる</button><button class="sl-act" id="slOut">◀ コイルから ぬく</button></div>' +
      slider('slN', 'コイルの 巻数', 50, 200, 50, 100, ' 回') + slider('slSp', '磁石を 動かす 速さ', 1, 5, 1, 3, ''),
      '<p>コイルの 中の <b>磁界が 変化</b> すると、コイルに 電圧が 生じて 電流が 流れる (<b>電磁誘導</b>、流れる 電流を 誘導電流 と いう)。</p><p>電流を 大きく するには: ① 磁石を <b>速く</b> 動かす ② コイルの <b>巻数を 多く</b> ③ <b>強い</b> 磁石。</p><p>向き: 入れる ↔ ぬく で 逆、N極 ↔ S極 で 逆。磁石を 止めると 電流は 流れない。</p><p>発電機・IH・非接触 充電 (スマホ・交通系ICカード) は 電磁誘導を 使って いる。</p>');
    const svg = $('slInd');
    const draw = (mx, D) => {
      const n = +$('slN').value, turns = 4 + n / 25; let s = '<rect width="380" height="230" fill="#fbfaf5"/>';
      // コイル
      s += '<rect x="196" y="58" width="120" height="44" rx="6" fill="#f0e2c8" stroke="#b08a5a"/>';
      let wind = ''; for (let i = 0; i < turns; i++) { const x = 200 + i * (112 / turns); wind += '<path d="M' + x.toFixed(1) + ',54 A5,26 0 0 1 ' + x.toFixed(1) + ',106" fill="none" stroke="#c87a2a" stroke-width="2"/>'; }
      s += '<text x="256" y="48" font-size="11" text-anchor="middle" fill="#7a5a2a">コイル ' + n + '回巻き</text>';
      // 導線と 検流計
      s += '<path d="M200,106 L200,170 L230,170 M316,106 L316,170 L286,170" fill="none" stroke="#3a3a4a" stroke-width="2.5"/>';
      s += '<path d="M228,190 A30,30 0 0 1 288,190 Z" fill="#fff" stroke="#3a3a4a" stroke-width="2"/>';
      for (let k = -20; k <= 20; k += 5) { const a = (k / 20) * 70 * D2R; s += '<line x1="' + (258 + 24 * Math.sin(a)).toFixed(1) + '" y1="' + (190 - 24 * Math.cos(a)).toFixed(1) + '" x2="' + (258 + 28 * Math.sin(a)).toFixed(1) + '" y2="' + (190 - 28 * Math.cos(a)).toFixed(1) + '" stroke="#3a3a4a"/>'; }
      const na = (D / 20) * 70 * D2R; s += '<line x1="258" y1="190" x2="' + (258 + 26 * Math.sin(na)).toFixed(1) + '" y2="' + (190 - 26 * Math.cos(na)).toFixed(1) + '" stroke="#d0382a" stroke-width="2.5"/><circle cx="258" cy="190" r="3" fill="#3a3a4a"/><text x="258" y="206" font-size="10" text-anchor="middle">検流計</text><text x="226" y="186" font-size="9">左</text><text x="284" y="186" font-size="9">右</text>';
      // 磁石
      const fr = pole === 'N' ? ['#d0382a', '#2e6fb8'] : ['#2e6fb8', '#d0382a'], lab = pole === 'N' ? ['N', 'S'] : ['S', 'N'];
      s += '<rect x="' + (mx - 40) + '" y="68" width="40" height="24" fill="' + fr[0] + '"/><rect x="' + (mx - 80) + '" y="68" width="40" height="24" fill="' + fr[1] + '"/><text x="' + (mx - 20) + '" y="85" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">' + lab[0] + '</text><text x="' + (mx - 60) + '" y="85" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">' + lab[1] + '</text>';
      s += wind;
      if (D) s += '<text x="190" y="24" font-size="13" text-anchor="middle" font-weight="700" fill="#d0382a">電流が 流れた! 針が ' + (D > 0 ? '右' : '左') + 'へ ' + Math.abs(D) + ' 目盛り</text>';
      svg.innerHTML = s;
    };
    const X0 = 140, X1 = 300, show = () => { $('slNV').textContent = $('slN').value; $('slSpV').textContent = $('slSp').value; draw(pos ? X1 : X0, 0);
      $('slRead').innerHTML = last ? '<span>前回: ' + esc(last.pole + '・' + last.act) + ' → 針 <b>' + (last.D > 0 ? '右 ' : '左 ') + Math.abs(last.D) + '</b></span>' : '<span>磁石を 動かすと 針が ふれるよ (止まって いる ときは 0)</span>'; };
    const move = act => {
      if (moving) return; if ((act === 'in') === !!pos) { $('slRead').innerHTML = '<span>' + (act === 'in' ? 'もう コイルの 中に 入って いるよ。ぬいてから 入れよう' : 'まだ コイルの 外だよ。まず 入れよう') + '</span>'; return; }
      moving = true; sfx('click'); const n = +$('slN').value, sp = +$('slSp').value, D = inductD(pole, act, n, sp), dur = 1400 / sp, t0 = performance.now();
      const step = now => { if (!document.body.contains(svg)) { raf = null; moving = false; return; } const u = Math.min(1, (now - t0) / dur), x = act === 'in' ? X0 + (X1 - X0) * u : X1 - (X1 - X0) * u;
        draw(x, u < 1 ? D * Math.sin(Math.PI * Math.min(1, u * 1.15)) ** 0.5 : 0); if (u < 1) { raf = requestAnimationFrame(step); return; }
        raf = null; moving = false; pos = act === 'in' ? 1 : 0; last = { pole: pole + '極', act: act === 'in' ? '入れる' : 'ぬく', n: n, sp: sp, D: D, a: Math.abs(D) }; show(); draw(pos ? X1 : X0, 0);
        svg.insertAdjacentHTML('beforeend', '<text x="190" y="24" font-size="13" text-anchor="middle" font-weight="700" fill="#d0382a">針が ' + (D > 0 ? '右' : '左') + 'へ ' + Math.abs(D) + ' 目盛り ふれて、0 に もどった</text>');
        if (D >= 10) mark('induct', 0); if (D < 0) { leftWays[pole + act] = 1; if (Object.keys(leftWays).length >= 2) mark('induct', 1); } if (Math.abs(D) === 20 && n === 200) mark('induct', 2); };
      raf = requestAnimationFrame(step);
    };
    $('slIn').onclick = () => move('in'); $('slOut').onclick = () => move('out');
    $('slN').oninput = show; $('slSp').oninput = show; bindSeg('pole', v => { pole = v; pos = 0; show(); });
    bindNB('induct', () => last || '磁石を 動かしてから 記録しよう'); show();
  }

  // ================= ⑩ 中和と pH =================
  function neutPH(c, v10) { const nH = c * 10 - v10 / 10, vol = 10 + v10 / 10; if (Math.abs(nH) < 1e-9) return 7; return nH > 0 ? -Math.log10(0.1 * nH / vol) : 14 + Math.log10(0.1 * -nH / vol); }
  function btb(pH) { const Y = [222, 196, 40], G = [70, 170, 90], B = [50, 110, 200]; const mix = (a, b, t) => a.map((x, i) => Math.round(x + (b[i] - x) * t)); const c = pH < 6 ? Y : pH < 6.8 ? mix(Y, G, (pH - 6) / 0.8) : pH <= 7.2 ? G : pH < 7.8 ? mix(G, B, (pH - 7.2) / 0.6) : B; return { rgb: 'rgb(' + c.join(',') + ')', name: pH < 6.5 ? '黄' : pH <= 7.5 ? '緑' : '青', prop: pH < 6.5 ? '酸性' : pH <= 7.5 ? '中性' : 'アルカリ性' }; }
  function neut() {
    let c = 1, v10 = 0;
    page('neut', seg('c', [['1', '塩酸 ふつうの こさ'], ['2', '塩酸 2倍の こさ']], '1') + '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' +
      '<div class="sl-sw"><button class="sl-act" data-add="20">+2 mL</button><button class="sl-act" data-add="10">+1 mL</button><button class="sl-act" data-add="2">+0.2 mL (少し)</button><button class="sl-act ghost" id="slNR">はじめから</button></div>',
      '<p><b>酸性</b>: H⁺ (水素イオン) を 出す — BTB液 <b>黄</b>、pH 7 より 小さい。<b>アルカリ性</b>: OH⁻ (水酸化物イオン) を 出す — BTB液 <b>青</b>、pH 7 より 大きい。<b>中性</b>: 緑、pH 7。</p><p><b>中和</b>: H⁺ + OH⁻ → H₂O。酸と アルカリが たがいの 性質を 打ち消し合う。同時に <b>塩</b> (えん) が できる: HCl + NaOH → NaCl + H₂O。</p><p>中和点の 近くでは、少し 加えただけで pH が 大きく 変わる。</p><p>身近な 例: 胃薬 (胃酸を 中和)、酸性の 土に 石灰を まく、虫さされ。</p>');
    const upd = () => { const pH = neutPH(c, v10), b = btb(pH), v = v10 / 10;
      $('slFig').innerHTML = neutSVG(c, v10, pH, b);
      $('slRead').innerHTML = '<span>加えた 量 <b>' + v.toFixed(1) + ' mL</b></span><span>pH <b>' + pH.toFixed(1) + '</b></span><span>BTB液 <b style="color:' + b.rgb + '">' + b.name + '</b> (' + b.prop + ')</span>';
      if (c === 1 && Math.abs(pH - 7) < 1e-9) mark('neut', 0); if (c === 2 && Math.abs(pH - 7) < 1e-9) mark('neut', 1); if (pH > 7.5) mark('neut', 2); };
    $('slArea').querySelectorAll('[data-add]').forEach(bt => bt.onclick = () => { if (v10 >= 300) return; sfx('click'); v10 = Math.min(300, v10 + +bt.dataset.add); upd(); });
    $('slNR').onclick = () => { sfx('click'); v10 = 0; upd(); };
    bindSeg('c', v => { c = +v; v10 = 0; upd(); });
    bindNB('neut', () => { const pH = neutPH(c, v10); return { c: c + '倍', v: v10 / 10, pH: r1(pH), col: btb(pH).name }; }); upd();
  }
  function neutSVG(c, v10, pH, b) {
    const v = v10 / 10, nH = Math.max(0, Math.round(c * 10 - v)), nOH = Math.max(0, Math.round(v - c * 10)), nNa = Math.round(v), nCl = c * 10, nW = Math.min(c * 10, Math.round(v));
    let s = '<rect width="380" height="230" fill="#fbfaf5"/>';
    // こまごめピペット
    s += '<rect x="96" y="14" width="10" height="56" rx="3" fill="rgba(200,220,240,.7)" stroke="#7a8a9a"/><ellipse cx="101" cy="14" rx="9" ry="7" fill="#d0382a"/><path d="M98,70 L101,82 L104,70 Z" fill="rgba(200,220,240,.9)" stroke="#7a8a9a"/><text x="112" y="40" font-size="10" fill="#5a6a7a">水酸化ナトリウム水溶液</text>';
    // ビーカー
    const lv = 190 - 40 - v * 1.6; s += '<path d="M48,90 L48,196 Q48,206 58,206 L144,206 Q154,206 154,196 L154,90" fill="none" stroke="#7a8a9a" stroke-width="2.5"/><path d="M50,' + lv.toFixed(1) + ' L152,' + lv.toFixed(1) + ' L152,196 Q152,204 144,204 L58,204 Q50,204 50,196 Z" fill="' + b.rgb + '" opacity=".8"/>';
    s += '<text x="101" y="222" font-size="10" text-anchor="middle" fill="#5a6a7a">塩酸 10mL + BTB液</text>';
    // pHメーター
    s += '<rect x="168" y="150" width="62" height="40" rx="6" fill="#e8ebef" stroke="#8a8a9a"/><rect x="174" y="158" width="50" height="22" rx="3" fill="#1d2a22"/><text x="220" y="174" font-size="14" text-anchor="end" fill="#7aff9a" font-family="monospace">' + pH.toFixed(1) + '</text><text x="199" y="200" font-size="9" text-anchor="middle" fill="#5a6a7a">pHメーター</text><path d="M168,160 Q150,150 140,130" fill="none" stroke="#3a3a4a" stroke-width="1.5"/>';
    // イオンの モデル
    s += '<rect x="242" y="14" width="130" height="200" rx="10" fill="#fff" stroke="#d8e2ea"/><text x="307" y="30" font-size="10" text-anchor="middle" fill="#26323d" font-weight="700">ビーカーの 中の イオン (モデル)</text>';
    const items = []; for (let i = 0; i < nH; i++) items.push(['H⁺', '#d0382a']); for (let i = 0; i < nOH; i++) items.push(['OH⁻', '#2e6fb8']); for (let i = 0; i < nCl; i++) items.push(['Cl⁻', '#2f8a4f']); for (let i = 0; i < nNa; i++) items.push(['Na⁺', '#b0742a']); for (let i = 0; i < nW; i++) items.push(['H₂O', '#9aa8b5']);
    const per = Math.ceil(Math.sqrt(items.length / 1.35)) || 1, cw = 120 / per, ch = Math.min(22, 160 / Math.ceil(items.length / per || 1)), fs = Math.max(6, Math.min(10, cw / 2.4));
    items.forEach((it, i) => { const x = 250 + (i % per) * cw + cw / 2, y = 44 + Math.floor(i / per) * ch + ch / 2; s += '<text x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" font-size="' + fs.toFixed(1) + '" text-anchor="middle" font-weight="700" fill="' + it[1] + '">' + it[0] + '</text>'; });
    s += '<text x="307" y="208" font-size="8.5" text-anchor="middle" fill="#5a6a7a">H⁺ ' + nH + ' · OH⁻ ' + nOH + ' · 水 ' + nW + '</text>';
    return '<svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }

  // ================= ⑪ 植物の 蒸散 =================
  const TUBES = [['A', '何も ぬらない', 1, 1], ['B', '葉の 表に ワセリン', 0, 1], ['C', '葉の 裏に ワセリン', 1, 0], ['D', '葉を すべて とる', -1, -1]];
  function transpRate(tube, light, wind) { const tb = TUBES.find(x => x[0] === tube), f = (light ? 1 : 0.25) * (wind ? 1.6 : 1); return ((tb[2] === 1 ? 0.2 : 0) + (tb[3] === 1 ? 0.6 : 0) + 0.05) * f; }
  function transp() {
    let light = 1, wind = 0;
    page('transp', seg('lt', [['1', '☀ 明るい 所'], ['0', '🌑 暗い 所']], '1') + seg('wd', [['0', '風 なし'], ['1', '🌬 扇風機の 風']], '0') + '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' + slider('slTm', '時間', 0, 8, 1, 0, ' 時間'),
      '<p><b>蒸散</b>: 植物の 体の 中の 水が 水蒸気に なって 出ていく こと。おもに 葉の <b>気孔</b> (2つの 孔辺細胞に かこまれた すきま) から。</p><p>気孔は ふつう 葉の <b>裏</b> に 多い → 裏からの 蒸散が 多い。</p><p>明るい・風が ある・あたたかい・かわいて いる と さかん。暗いと 気孔が 閉じて へる。</p><p>蒸散の はたらき: 根から 水を 吸い上げる 力に なる・体温を 下げる。水面に 油を うかべるのは、水面からの 蒸発を 防ぐ ため。</p>');
    const cond = () => (light ? '明るい' : '暗い') + (wind ? '・風' : '');
    const upd = () => { const t = +$('slTm').value; $('slTmV').textContent = t; const w = TUBES.map(tb => r2(transpRate(tb[0], light, wind) * t));
      $('slFig').innerHTML = transpSVG(w, light, wind);
      $('slRead').innerHTML = TUBES.map((tb, i) => '<span>' + tb[0] + ' <b>' + w[i].toFixed(2) + ' mL</b></span>').join('') + '<span>条件 <b>' + cond() + '</b></span>';
      if (light && !wind && t === 6) mark('transp', 0); if (!light && t >= 4) mark('transp', 1); if (wind && w[0] >= 4) mark('transp', 2); };
    $('slTm').oninput = upd; bindSeg('lt', v => { light = +v; upd(); }); bindSeg('wd', v => { wind = +v; upd(); });
    bindNB('transp', () => { const t = +$('slTm').value; if (!t) return '時間を すすめてから 記録しよう'; return TUBES.map(tb => ({ t: t, cond: cond(), tube: tb[0], w: r2(transpRate(tb[0], light, wind) * t) })); }); upd();
  }
  function transpSVG(w, light, wind) {
    let s = '<rect width="380" height="240" fill="' + (light ? '#fbfaf5' : '#3a4256') + '"/>';
    if (light) s += '<circle cx="356" cy="22" r="14" fill="#ffd84a"/>'; if (wind) s += '<text x="8" y="22" font-size="16">🌬</text><path d="M30,16 q20,-6 40,0 M30,24 q20,6 40,0" stroke="#7a9ab8" fill="none"/>';
    TUBES.forEach((tb, i) => { const x = 50 + i * 88, top = 108, lv = top + 14 + Math.min(80, w[i] * 12);
      // 枝と 葉
      s += '<line x1="' + x + '" y1="' + (top + 20) + '" x2="' + x + '" y2="40" stroke="#5a7a3a" stroke-width="3"/>';
      if (tb[2] !== -1) [[-1, 54], [1, 66], [-1, 80]].forEach(l => { const lx = x + l[0] * 18, ly = l[1]; s += '<ellipse cx="' + lx + '" cy="' + ly + '" rx="16" ry="7" fill="#5aa04a" transform="rotate(' + (l[0] * -20) + ' ' + lx + ' ' + ly + ')"/>' + (tb[2] === 0 ? '<ellipse cx="' + lx + '" cy="' + (ly - 1) + '" rx="13" ry="3.5" fill="rgba(255,255,255,.75)" transform="rotate(' + (l[0] * -20) + ' ' + lx + ' ' + ly + ')"/>' : '') + (tb[3] === 0 ? '<ellipse cx="' + lx + '" cy="' + (ly + 2.5) + '" rx="13" ry="3" fill="rgba(255,255,255,.75)" stroke="#c8c8c8" stroke-width=".5" transform="rotate(' + (l[0] * -20) + ' ' + lx + ' ' + ly + ')"/>' : ''); });
      // 試験管
      s += '<rect x="' + (x - 14) + '" y="' + top + '" width="28" height="104" rx="12" fill="rgba(220,235,245,.5)" stroke="#7a8a9a" stroke-width="1.5"/><rect x="' + (x - 12.5) + '" y="' + lv.toFixed(1) + '" width="25" height="' + (top + 102 - lv).toFixed(1) + '" rx="10" fill="rgba(110,170,230,.6)"/><rect x="' + (x - 12.5) + '" y="' + (lv - 3).toFixed(1) + '" width="25" height="3" fill="#e8c84a"/>';
      for (let k = 0; k <= 7; k++) s += '<line x1="' + (x + 9) + '" y1="' + (top + 14 + k * 12) + '" x2="' + (x + 14) + '" y2="' + (top + 14 + k * 12) + '" stroke="#7a8a9a" stroke-width=".8"/>';
      s += '<line x1="' + (x - 18) + '" y1="' + (top + 14) + '" x2="' + (x + 18) + '" y2="' + (top + 14) + '" stroke="#d0382a" stroke-dasharray="2 2"/>';
      s += '<text x="' + x + '" y="228" font-size="13" font-weight="700" text-anchor="middle" fill="' + (light ? '#26323d' : '#e8eef6') + '">' + tb[0] + '</text><text x="' + x + '" y="102" font-size="8.5" text-anchor="middle" fill="' + (light ? '#5a6a7a' : '#c8d2de') + '">' + tb[1].replace('葉の ', '') + '</text>'; });
    s += '<text x="' + (wind ? 80 : 8) + '" y="14" font-size="9" fill="' + (light ? '#7a7a8a' : '#c8d2de') + '">赤い 点線 = はじめの 水面 ・ 黄 = 油の 層 ・ 白 = ワセリン</text>';
    return '<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }

  // ================= ⑫ 流水と 堆積 =================
  const GRAINS = [['reki', 'れき', 4, 30, '#8a7a6a', 7], ['sa', 'あらい 砂', 1, 10, '#c8a86a', 4], ['fs', '細かい 砂', 0.25, 3, '#d8c48e', 2.5], ['doro', '泥', 0.05, 0.2, '#8a6a4a', 1.5]];
  function sedi() {
    let gi = 'reki', falling = false, last = null, layers = 0; const measured = {};
    page('sedi', seg('sm', [['fall', '⏱ しずむ 速さ'], ['pour', '🏞 地層を 作る']], 'fall') + '<div id="slSedBox"></div>',
      '<p>流れる 水の はたらき: <b>しん食</b> (けずる)・<b>運ぱん</b> (運ぶ)・<b>たい積</b> (つもらせる)。流れが ゆるやかに なると つもる。</p><p>大きく 重い 粒ほど 速く しずむ。1回の 流れで つもった 層は <b>下が あらく、上が 細かい</b>。</p><p>粒の 大きさ: れき (2mm 以上) > 砂 (1/16〜2mm) > 泥 (1/16mm 以下)。河口の 近くに れき・砂、沖の 深い 所に 泥。</p><p>地層を 見れば、そこが むかし 浅い 海だったか 深い 海だったかが わかる。</p>');
    const box = () => $('slSedBox');
    function fallUI() {
      box().innerHTML = seg('gr', GRAINS.map(g => [g[0], g[1]]), gi) + '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div><div class="sl-sw"><span class="sl-swd" id="slSw">0.0</span><button class="sl-act" id="slDrop">▼ 粒を 落とす</button></div>';
      bindSeg('gr', v => { gi = v; drawFall(-1); });
      $('slDrop').onclick = drop; drawFall(-1);
    }
    function drawFall(y) {
      const g = GRAINS.find(x => x[0] === gi); let s = '<rect width="380" height="240" fill="#fbfaf5"/><rect x="150" y="20" width="60" height="206" rx="6" fill="rgba(160,200,235,.45)" stroke="#7a8a9a" stroke-width="2"/>';
      for (let k = 0; k <= 50; k += 5) { const yy = 30 + k * 3.8; s += '<line x1="210" y1="' + yy + '" x2="' + (k % 10 ? 216 : 222) + '" y2="' + yy + '" stroke="#5a6a7a"/>' + (k % 10 ? '' : '<text x="226" y="' + (yy + 3) + '" font-size="9" fill="#5a6a7a">' + k + 'cm</text>'); }
      if (y >= 0) s += '<circle cx="180" cy="' + (30 + y * 3.8).toFixed(1) + '" r="' + g[5] + '" fill="' + g[4] + '"/>';
      s += '<text x="20" y="40" font-size="12" font-weight="700" fill="#26323d">' + g[1] + '</text><text x="20" y="58" font-size="11" fill="#5a6a7a">大きさ 約 ' + g[2] + ' mm</text><circle cx="40" cy="84" r="' + g[5] * 1.6 + '" fill="' + g[4] + '"/>';
      $('slFig').innerHTML = '<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
      if (y < 0) $('slRead').innerHTML = last && last.g === g[1] ? '<span>しずむ 時間 <b>' + last.sec + ' 秒</b></span><span>速さ <b>' + last.v + ' cm/秒</b></span>' : '<span>▼ で 落とすと 50cm しずむまでの 時間を はかるよ</span>';
    }
    function drop() {
      if (falling) return; falling = true; sfx('click'); const g = GRAINS.find(x => x[0] === gi), total = 50 / g[3], ff = total > 20 ? total / 6 : 1, t0 = performance.now(), btn = $('slDrop'); btn.disabled = true;
      if (ff > 1) btn.textContent = '早送り ×' + Math.round(ff);
      const step = now => { if (!document.body.contains(btn)) { raf = null; falling = false; return; } const el = (now - t0) / 1000 * ff;
        if (el >= total) { raf = null; falling = false; btn.disabled = false; btn.textContent = '▼ 粒を 落とす'; const sec = r1(total * (1 + (Math.random() - 0.5) * 0.04)); last = { g: g[1], mm: g[2], sec: sec, v: r2(50 / sec) }; $('slSw').textContent = sec.toFixed(1); drawFall(-1); sfx('correct');
          measured[gi] = 1; if (gi === 'doro') mark('sedi', 0); if (Object.keys(measured).length >= 4) mark('sedi', 1); return; }
        $('slSw').textContent = el.toFixed(1); drawFall(el / total * 50); raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }
    let pouring = false;
    function pourUI() {
      box().innerHTML = '<div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div><div class="sl-sw"><button class="sl-act" id="slPour">🪣 土砂を 流しこむ</button><button class="sl-act ghost" id="slPR">水そうを 空に する</button></div>';
      $('slPour').onclick = () => { if (pouring || layers >= 4) return; pouring = true; sfx('click'); const t0 = performance.now();
        const step = now => { if (!document.getElementById('slPour')) { raf = null; pouring = false; return; } const u = Math.min(1, (now - t0) / 2200); drawPour(u); if (u < 1) { raf = requestAnimationFrame(step); return; }
          raf = null; pouring = false; layers++; drawPour(-1); if (layers >= 3) mark('sedi', 2); };
        raf = requestAnimationFrame(step); };
      $('slPR').onclick = () => { sfx('click'); layers = 0; drawPour(-1); };
      drawPour(-1);
    }
    function drawPour(u) {
      let s = '<rect width="380" height="240" fill="#fbfaf5"/><rect x="40" y="40" width="300" height="186" fill="rgba(160,200,235,.35)" stroke="#7a8a9a" stroke-width="2"/>';
      const H = [10, 14, 12], bands = [['#8a7a6a', 'れき'], ['#d0b47a', '砂'], ['#8a6a4a', '泥']]; let y = 224;
      const drawSet = (k, frac) => { bands.forEach((b, j) => { const h = H[j] * Math.max(0, Math.min(1, frac * 3 - j)); if (h <= 0) return; y -= h; s += '<rect x="42" y="' + y.toFixed(1) + '" width="296" height="' + h.toFixed(1) + '" fill="' + b[0] + '"/>'; if (j === 0) for (let i = 0; i < 26; i++) s += '<circle cx="' + (48 + i * 11.3) + '" cy="' + (y + h / 2).toFixed(1) + '" r="' + (h / 3).toFixed(1) + '" fill="#6a5a4a"/>'; }); };
      for (let k = 0; k < layers; k++) drawSet(k, 1);
      if (u >= 0) { drawSet(layers, u); for (let i = 0; i < 40; i++) { const g = GRAINS[i % 4], px = 60 + (i * 53) % 270, py = 50 + ((u * 600 * g[3] / 10 + i * 13) % (y - 52)); s += '<circle cx="' + px + '" cy="' + py.toFixed(1) + '" r="' + g[5] * 0.6 + '" fill="' + g[4] + '" opacity="' + (1 - u * 0.6).toFixed(2) + '"/>'; } s += '<path d="M190,10 L190,40" stroke="#8a6a4a" stroke-width="6" opacity="' + (1 - u).toFixed(2) + '"/>'; }
      s += '<text x="346" y="222" font-size="9" fill="#5a6a7a">下</text><text x="346" y="50" font-size="9" fill="#5a6a7a">上</text>';
      $('slFig').innerHTML = '<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
      $('slRead').innerHTML = '<span>流しこんだ 回数 <b>' + layers + ' 回</b></span><span>1回ごとに 下から <b>れき → 砂 → 泥</b></span>' + (layers >= 4 ? '<span>水そうが いっぱい!</span>' : '');
    }
    bindSeg('sm', v => { v === 'fall' ? fallUI() : pourUI(); });
    bindNB('sedi', () => last ? { g: last.g, mm: last.mm, sec: last.sec, v: last.v } : '⏱ しずむ 速さ で 粒を 落としてから 記録しよう');
    fallUI();
  }

  // ================= ⑬ 露点と 湿度 =================
  function satVap(t) { const e = 6.1078 * Math.pow(10, 7.5 * t / (t + 237.3)); return 217 * e / (t + 273.15); }
  function dewPoint(a) { let lo = -20, hi = 40; for (let i = 0; i < 40; i++) { const m = (lo + hi) / 2; if (satVap(m) < a) lo = m; else hi = m; } return (lo + hi) / 2; }
  const ROOMS = [['class', '🏫 教室', 20, 60], ['bath', '🛁 おふろ場', 26, 90], ['winter', '❄ 冬の 暖房の 部屋', 18, 35], ['summer', '🌞 夏の 午後の 部屋', 32, 70], ['ac', '🌀 エアコンの 部屋', 25, 40]];
  function dew() {
    let room = 'class', cup = 20, cooling = false; const rec = {};
    page('dew', '<label class="sl-sel">部屋 <select id="slRm">' + ROOMS.map(r => '<option value="' + r[0] + '">' + r[1] + '</option>').join('') + '</select></label><div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' +
      '<div class="sl-sw"><button class="sl-act" id="slIce">🧊 氷水を 少し 入れて かきまぜる</button><button class="sl-act ghost" id="slDR">くみおきの 水に もどす</button></div>',
      '<p><b>飽和水蒸気量</b>: 空気 1m³ が ふくむ ことの できる 水蒸気の 最大量。気温が 高いほど 大きい (20℃ で 17.3g、30℃ で 30.4g)。</p><p><b>露点</b>: 空気を 冷やした とき、水蒸気が 水てきに 変わり始める 温度。露点の 飽和水蒸気量 = 今 空気に ふくまれて いる 水蒸気量。</p><p><b>湿度 (%)</b> = 水蒸気量 ÷ 飽和水蒸気量 × 100</p><p>コップに 金属を 使うのは 熱を よく 伝え、水温 = 表面の 空気の 温度に なる ため。くみおきの 水を 使うのは 室温と 同じ 温度から 始める ため。上昇気流で 空気が 露点まで 冷えると <b>雲</b> が できる。</p>');
    const R = () => ROOMS.find(r => r[0] === room);
    const info = () => { const r = R(), a = satVap(r[2]) * r[3] / 100, dp = dewPoint(a); return { r: r, a: a, dp: dp }; };
    const upd = () => { const o = info(), fog = cup <= o.dp + 1e-9;
      $('slFig').innerHTML = dewSVG(o.r[2], cup, fog);
      $('slRead').innerHTML = '<span>室温 <b>' + o.r[2] + ' ℃</b></span><span>コップの 水温 <b>' + cup + ' ℃</b></span><span>' + (fog ? '<b style="color:#2e6fb8">💧 表面が くもった!</b>' : 'まだ くもらない') + '</span>' + (rec[room] ? '<span>露点 <b>' + rec[room] + ' ℃</b> → 湿度 <b>' + Math.round(satVap(rec[room]) / satVap(o.r[2]) * 100) + ' %</b></span>' : '');
      if (fog && rec[room] == null) { rec[room] = cup; sfx('correct'); upd(); if (room === 'class') mark('dew', 0); if (Math.round(satVap(cup) / satVap(o.r[2]) * 100) >= 80) mark('dew', 1); if (Object.keys(rec).length >= 3) mark('dew', 2); } };
    const reset = () => { cup = R()[2]; upd(); };
    $('slRm').onchange = () => { room = $('slRm').value; sfx('click'); reset(); };
    $('slIce').onclick = () => { if (cooling || cup <= 0) return; cooling = true; sfx('click'); later(() => { cup -= 1; cooling = false; upd(); }, 350); };
    $('slDR').onclick = () => { sfx('click'); reset(); };
    bindNB('dew', () => { const o = info(); if (rec[room] == null) return 'コップが くもるまで 冷やしてから 記録しよう'; const dp = rec[room], a = r1(satVap(dp)), sat = r1(satVap(o.r[2])); return { room: o.r[1].replace(/^\S+ /, ''), T: o.r[2], dp: dp, a: a, sat: sat, hum: Math.round(a / sat * 100) }; });
    reset();
  }
  function dewSVG(T, cup, fog) {
    let s = '<rect width="380" height="230" fill="#fbfaf5"/>';
    s += '<path d="M120,60 L130,200 Q131,210 141,210 L219,210 Q229,210 230,200 L240,60 Z" fill="#c9ced6" stroke="#7a8a9a" stroke-width="2"/><path d="M123,96 L131,200 Q132,206 141,206 L219,206 Q228,206 229,200 L237,96 Z" fill="rgba(110,170,230,.55)"/>';
    s += '<rect x="196" y="18" width="8" height="150" rx="4" fill="#fff" stroke="#8a8a9a"/><circle cx="200" cy="172" r="8" fill="#d0382a"/><rect x="198" y="' + (140 - cup * 3.4).toFixed(1) + '" width="4" height="' + (32 + cup * 3.4).toFixed(1) + '" fill="#d0382a"/>';
    for (let k = 0; k <= 35; k += 5) s += '<line x1="204" y1="' + (164 - k * 3.4) + '" x2="208" y2="' + (164 - k * 3.4) + '" stroke="#5a6a7a"/><text x="210" y="' + (167 - k * 3.4) + '" font-size="8" fill="#5a6a7a">' + k + '</text>';
    s += '<line x1="160" y1="40" x2="165" y2="190" stroke="#8a8a9a" stroke-width="3"/><text x="150" y="36" font-size="9" fill="#5a6a7a">ガラス棒</text>';
    if (fog) { s += '<path d="M120,60 L130,200 Q131,210 141,210 L219,210 Q229,210 230,200 L240,60 Z" fill="rgba(255,255,255,.45)"/>'; for (let i = 0; i < 26; i++) { const yy = 70 + (i * 37) % 130, side = i % 2, xx = side ? 236 - (yy - 60) * 0.07 - 2 : 124 + (yy - 60) * 0.07 + 2; s += '<ellipse cx="' + xx.toFixed(1) + '" cy="' + yy + '" rx="2.2" ry="3" fill="rgba(120,170,220,.85)"/>'; } }
    if (cup < T) for (let i = 0; i < Math.min(6, T - cup); i++) s += '<rect x="' + (140 + i * 13) + '" y="' + (100 + (i % 2) * 6) + '" width="10" height="10" rx="2" fill="rgba(235,245,255,.9)" stroke="#aac"/>';
    s += '<text x="20" y="40" font-size="12" font-weight="700" fill="#26323d">室温 ' + T + ' ℃</text><text x="20" y="58" font-size="11" fill="#5a6a7a">金属製の コップ</text><text x="270" y="120" font-size="12" font-weight="700" fill="#d0382a">水温 ' + cup + ' ℃</text>';
    if (fog) s += '<text x="270" y="142" font-size="12" font-weight="700" fill="#2e6fb8">くもった!</text><text x="270" y="160" font-size="10" fill="#2e6fb8">この 温度 = 露点</text>';
    return '<svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }

  const RUN = { circuit: circuit, lens: lens, refract: refract, pend: pend, slope: slope, chem: chem, moon: moon, sky: sky, induct: induct, neut: neut, transp: transp, sedi: sedi, dew: dew };
  function open() { showPage('pageSciLab'); home(); }
  function stats() { const d = data(); return { done: Object.keys(d.done).filter(k => MISS[k.split(':')[0]]).length, total: EXPS.length * 3, notes: Object.keys(d.nb).length }; }
  return { open: open, stats: stats, stop: stopAnim, _lens: lensSVG, _circ: circSVG, _sun: sunPos, _snell: snell, _chem: chemMass, _slope: slopeCalc, _ph: neutPH, _dew: dewPoint, _sat: satVap, _ind: inductD };
})();
