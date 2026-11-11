/* 小学 算数 ラダー (4〜6年・学習指導要領の 順) — 数学ラダーと 同じ 形式
 * unit: { id, g: 学年, name, icon, point: [要点], gen() → { q, type, a, steps, (labels|opts) } }
 */
const ELAD = (function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const lcm = (a, b) => a / gcd(a, b) * b;
  const r3 = x => Math.round(x * 1000) / 1000;
  const cm = n => n.toLocaleString('ja-JP');
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); n /= g; d /= g; return d === 1 ? n : [n, d]; }
  function fs(v) { return Array.isArray(v) ? v[0] + '/' + v[1] : String(v); }
  const mixed = (n, d) => { const w = Math.floor(n / d), r = n % d; return w ? (r ? w + ' と ' + r + '/' + d : String(w)) : r + '/' + d; };
  const choice = (q, right, wrongs, steps) => { const w = []; wrongs.forEach(x => { if (x !== right && w.indexOf(x) < 0) w.push(x); }); return w.length < 3 ? null : { q: q, type: 'choice', a: 0, opts: [right].concat(w.slice(0, 3)), steps: steps }; };
  const U = [];
  const add = (g, id, icon, name, point, gen) => U.push({ g: g, id: id, icon: icon, name: name, point: point, gen: gen });

  // ======================= 4年 =======================
  const kan = n => { const t = Math.floor(n / 1e12), o = Math.floor(n % 1e12 / 1e8), m = Math.floor(n % 1e8 / 1e4), r = n % 1e4; return (t ? t + '兆' : '') + (o ? o + '億' : '') + (m ? m + '万' : '') + (r ? r : ''); };
  add('e4', 'e4a', '🔢', '大きな 数 (億・兆)', ['4けたごとに 区切る: 一・十・百・千 → 万 → 億 → 兆', '10倍すると 位が 1つ 上がり、0 が 1つ ふえる', '1億 = 1万 × 1万、1兆 = 1万 × 1億'], () => {
    const k = pick(['read', 'read', 'x10', 'count']);
    if (k === 'read') { const n = pick([R(1, 99) * 1e12 + R(1, 9999) * 1e8, R(1, 999) * 1e8 + R(1, 9999) * 1e4, R(1, 9) * 1e12 + R(1, 999) * 1e4]), s = cm(n);
      const w = [cm(n * 10), n % 10 === 0 ? cm(n / 10) : cm(n * 100), cm(Math.floor(n / 1e8) * 1e4 + n % 1e4), cm(n * 100)];
      return choice('「' + kan(n) + '」を 数字で 書くと どれ?', s, w, ['4けたごとに 区切って 考える: 兆 | 億 | 万 | 一', kan(n) + ' = ' + s]); }
    if (k === 'x10') { const base = R(2, 99), unit = pick([[1e8, '億'], [1e4, '万']]), times = pick([10, 100, 1000]), n = base * unit[0] * times;
      return choice(base + unit[1] + ' を ' + times + '倍 した 数は?', kan(n), [kan(n / 10), kan(n * 10), kan(base * unit[0] * times / 100 || base * unit[0])], [times + '倍は 0 を ' + (String(times).length - 1) + 'こ つける のと 同じ', base + unit[1] + ' × ' + times + ' = ' + kan(n)]); }
    const n = R(1, 99), unit = pick([['億', 8], ['兆', 12]]); return { q: n + unit[0] + ' を 数字で 書くと、0 は 何こ 並ぶ?', type: 'num', a: unit[1] + (n % 10 === 0 ? 1 : 0), steps: ['1' + unit[0] + ' は 1 の あとに 0 が ' + unit[1] + 'こ', n + unit[0] + ' = ' + cm(n * 10 ** unit[1]), '0 は ' + (unit[1] + (n % 10 === 0 ? 1 : 0)) + 'こ'] };
  });
  add('e4', 'e4b', '➗', 'わり算の 筆算 (2けたで わる)', ['商の 見当を つける: 84 ÷ 21 → 80 ÷ 20 = 4', '「たてる → かける → ひく → おろす」を くり返す', 'たしかめ: わる数 × 商 + あまり = わられる数'], () => {
    const d = R(12, 49), q = R(3, pick([9, 29, 99])), r = R(0, d - 1), n = d * q + r;
    return { q: n + ' ÷ ' + d + ' = ? (商と あまりを 答えよう)', type: 'pair', a: [q, r], labels: ['商', 'あまり'], steps: ['見当: ' + n + ' ÷ ' + d + ' は だいたい ' + Math.round(n / d), d + ' × ' + q + ' = ' + (d * q), n + ' − ' + (d * q) + ' = ' + r + ' (あまり)', 'たしかめ: ' + d + ' × ' + q + ' + ' + r + ' = ' + n] };
  });
  add('e4', 'e4c', '🎯', 'がい数 (四捨五入)', ['四捨五入: 求める 位の 1つ 下の 数字が 0〜4 なら 切り捨て、5〜9 なら 切り上げ', '「上から 2けた」は、上から 3けた目を 四捨五入'], () => {
    const n = R(10000, 999999), k = pick(['百', '千', '万', 'top2']);
    if (k === 'top2') { const L = String(n).length, p = 10 ** (L - 2), a = Math.round(n / p) * p; return { q: cm(n) + ' を 四捨五入して、上から 2けたの がい数に しよう。', type: 'num', a: a, steps: ['上から 3けた目は ' + String(n)[2] + ' → ' + (+String(n)[2] >= 5 ? '切り上げ' : '切り捨て'), '= ' + cm(a)] }; }
    const p = { 百: 100, 千: 1000, 万: 10000 }[k], a = Math.round(n / p) * p, dig = Math.floor(n / (p / 10)) % 10;
    return { q: cm(n) + ' を 四捨五入して、' + k + 'の位までの がい数に しよう。', type: 'num', a: a, steps: [k + 'の位の 1つ 下の 位は ' + dig + ' → ' + (dig >= 5 ? '切り上げ' : '切り捨て'), '= ' + cm(a)] };
  });
  add('e4', 'e4d', '🔟', '小数の 計算 (4年)', ['小数点を そろえて 筆算 (たし算・ひき算)', '小数 × 整数: 小数点が ないものと して 計算し、最後に 小数点を うつ', 'わり算の 商の 小数点は、わられる数の 小数点に そろえる'], () => {
    const k = pick(['add', 'sub', 'mul', 'div']);
    if (k === 'add') { const a = R(11, 999) / 100, b = R(1, 99) / 10; return { q: a + ' + ' + b + ' = ?', type: 'num', a: r3(a + b), steps: ['小数点を そろえる (' + a + ' と ' + b.toFixed(2) + ')', '= ' + r3(a + b)] }; }
    if (k === 'sub') { const a = R(100, 999) / 100, b = R(1, 99) / 100; if (b >= a) return null; return { q: a + ' − ' + b + ' = ?', type: 'num', a: r3(a - b), steps: ['小数点を そろえて 引く', '= ' + r3(a - b)] }; }
    if (k === 'mul') { const a = R(11, 99) / 10, b = R(3, 24); return { q: a + ' × ' + b + ' = ?', type: 'num', a: r3(a * b), steps: [String(a * 10) + ' × ' + b + ' = ' + (a * 10 * b) + ' と 計算', '小数点以下 1けた → ' + r3(a * b)] }; }
    const b = R(3, 9), q = R(11, 99) / 10, a = r3(b * q); return { q: a + ' ÷ ' + b + ' = ? (わりきれるよ)', type: 'num', a: q, steps: ['整数の わり算と 同じように 計算', '商の 小数点は ' + a + ' の 小数点の 真上に うつ → ' + q] };
  });
  add('e4', 'e4e', '🍰', '分数 (同じ 分母)', ['仮分数: 分子 ≧ 分母 (例: 7/3)、帯分数: 整数 + 真分数 (例: 2 と 1/3)', '帯分数 → 仮分数: 整数 × 分母 + 分子', '分母が 同じなら 分子だけ たし算・ひき算'], () => {
    const k = pick(['toI', 'add', 'sub']), d = R(3, 9);
    if (k === 'toI') { const w = R(1, 4), n = R(1, d - 1); return { q: '帯分数 ' + w + ' と ' + n + '/' + d + ' を 仮分数に すると? (□/□ で 答えよう)', type: 'num', a: fr(w * d + n, d), steps: ['整数 ' + w + ' = ' + (w * d) + '/' + d, (w * d) + ' + ' + n + ' = ' + (w * d + n) + ' → ' + (w * d + n) + '/' + d] }; }
    const a = R(1, 2 * d), b = R(1, 2 * d); if (k === 'sub' && a <= b) return null;
    const v = k === 'add' ? a + b : a - b; return { q: a + '/' + d + ' ' + (k === 'add' ? '+' : '−') + ' ' + b + '/' + d + ' = ? (仮分数・整数で 答えよう)', type: 'num', a: fr(v, d), steps: ['分母は そのまま、分子を ' + (k === 'add' ? '足す' : '引く') + ': ' + a + (k === 'add' ? ' + ' : ' − ') + b + ' = ' + v, '= ' + v + '/' + d + (v % d === 0 ? ' = ' + v / d : v > d ? ' (帯分数なら ' + mixed(v, d) + ')' : '')] };
  });
  add('e4', 'e4f', '⬜', '面積 (長方形・正方形)', ['長方形 = たて × よこ、正方形 = 1辺 × 1辺', '1m² = 10000cm²、1a = 100m²、1ha = 10000m²、1km² = 1000000m²', 'へこんだ 形は「分ける」か「大きい 長方形 − 欠けた ところ」'], () => {
    const k = pick(['rect', 'sq', 'L', 'unit']);
    if (k === 'rect') { const a = R(4, 25), b = R(4, 25); return { q: 'たて ' + a + 'cm、よこ ' + b + 'cm の 長方形の 面積は 何 cm²?', type: 'num', a: a * b, steps: [a + ' × ' + b + ' = ' + (a * b)] }; }
    if (k === 'sq') { const a = R(5, 30); return { q: '1辺 ' + a + 'm の 正方形の 面積は 何 m²?', type: 'num', a: a * a, steps: [a + ' × ' + a + ' = ' + (a * a)] }; }
    if (k === 'L') { const W = R(8, 15), H = R(8, 15), w = R(2, W - 3), h = R(2, H - 3); return { q: 'たて ' + H + 'cm、よこ ' + W + 'cm の 長方形の 角から、たて ' + h + 'cm・よこ ' + w + 'cm の 長方形を 切りとった L 字形の 面積は?', type: 'num', a: W * H - w * h, steps: ['大きい 長方形: ' + H + ' × ' + W + ' = ' + (W * H), '切りとった ところ: ' + h + ' × ' + w + ' = ' + (w * h), (W * H) + ' − ' + (w * h) + ' = ' + (W * H - w * h)] }; }
    const u = pick([['a', 100], ['ha', 10000]]), n = R(2, 30); return { q: n + u[0] + ' は 何 m²?', type: 'num', a: n * u[1], steps: ['1' + u[0] + ' = ' + cm(u[1]) + 'm²', n + ' × ' + cm(u[1]) + ' = ' + cm(n * u[1])] };
  });
  add('e4', 'e4g', '📐', '角の 大きさ', ['1回転 = 360°、半回転 (一直線) = 180°、直角 = 90°', '三角定規の 角: 90°・45°・45° と 90°・60°・30°', '向かい合う 角 (対頂角) は 等しい'], () => {
    const k = pick(['tri', 'line', 'clock', 'rest']);
    if (k === 'tri') { const [a, b] = pick([[45, 30], [45, 60], [90, 45], [60, 30], [90, 30], [45, 90]]), op = pick(['+', '−']); if (op === '−' && a <= b) return null;
      return { q: '三角定規の ' + a + '° の 角と ' + b + '° の 角を ' + (op === '+' ? '合わせた' : 'かさねた ときに できる 差の') + ' 角は 何度?', type: 'num', a: op === '+' ? a + b : a - b, steps: [a + (op === '+' ? ' + ' : ' − ') + b + ' = ' + (op === '+' ? a + b : a - b) + '°'] }; }
    if (k === 'line') { const a = R(20, 160); return { q: '一直線に なっている ところで、片方の 角が ' + a + '° の とき、もう 片方は 何度?', type: 'num', a: 180 - a, steps: ['一直線 = 180°', '180 − ' + a + ' = ' + (180 - a) + '°'] }; }
    if (k === 'clock') { const h = R(1, 5); return { q: '時計の 長いはりが 12、短いはりが ' + h + ' を さしている (' + h + '時)。2本の はりの 間の 小さい ほうの 角は 何度?', type: 'num', a: 30 * h, steps: ['時計 1周 360° を 12 等分 → 1目もり 30°', '30 × ' + h + ' = ' + (30 * h) + '°'] }; }
    const a = R(200, 330); return { q: '1回転の うち ' + a + '° 回った。あと 何度 回ると 1回転?', type: 'num', a: 360 - a, steps: ['1回転 = 360°', '360 − ' + a + ' = ' + (360 - a) + '°'] };
  });
  add('e4', 'e4h', '🧠', '計算の きまり・くふう', ['( ) の 中 → かけ算・わり算 → たし算・ひき算 の 順', '25 × 4 = 100、125 × 8 = 1000 を 使って くふうする', '分配: 98 × 7 = (100 − 2) × 7 = 700 − 14'], () => {
    const k = pick(['order', 'kufu', 'dist']);
    if (k === 'order') { const a = R(2, 9), b = R(2, 9), c = R(2, 9), d = R(10, 50); const v = d - a * b + c; if (v < 0) return null; return { q: d + ' − ' + a + ' × ' + b + ' + ' + c + ' = ?', type: 'num', a: v, steps: ['かけ算が 先: ' + a + ' × ' + b + ' = ' + (a * b), d + ' − ' + (a * b) + ' + ' + c + ' = ' + v] }; }
    if (k === 'kufu') { const [p, q] = pick([[25, 4], [125, 8], [50, 2]]), m = R(3, 19); return { q: p + ' × ' + m + ' × ' + q + ' = ? (くふうして 計算)', type: 'num', a: p * q * m, steps: ['順番を 入れかえる: ' + p + ' × ' + q + ' = ' + (p * q), (p * q) + ' × ' + m + ' = ' + (p * q * m)] }; }
    const b = pick([98, 99, 101, 102, 199]), m = R(3, 9), base = Math.round(b / 100) * 100; return { q: b + ' × ' + m + ' = ? (くふうして 計算)', type: 'num', a: b * m, steps: [b + ' = ' + base + (b > base ? ' + ' + (b - base) : ' − ' + (base - b)), base + ' × ' + m + (b > base ? ' + ' : ' − ') + Math.abs(b - base) + ' × ' + m + ' = ' + (base * m) + (b > base ? ' + ' : ' − ') + Math.abs(b - base) * m, '= ' + (b * m)] };
  });

  // ---- 4年 (つづき) ----
  const lineChart = (labels, vals, unit, title) => { const W = 330, H = 190, L = 40, B = 160, top = 20, mx = Math.ceil(Math.max(...vals) / 5) * 5 + 5, mn = Math.max(0, Math.floor(Math.min(...vals) / 5) * 5 - 5), X = i => L + 14 + i * (W - L - 30) / (vals.length - 1), Y = v => B - (v - mn) * (B - top) / (mx - mn);
    let s = '<svg viewBox="0 0 ' + W + ' ' + (H + 16) + '" class="mw-figsvg"><text x="' + W / 2 + '" y="14" font-size="13" text-anchor="middle">' + title + '</text>';
    for (let v = mn; v <= mx; v += 5) s += '<line x1="' + L + '" y1="' + Y(v) + '" x2="' + (W - 10) + '" y2="' + Y(v) + '" stroke="#dde4ec"/><text x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" font-size="11" text-anchor="end" fill="#6a7a8a">' + v + '</text>';
    s += '<polyline points="' + vals.map((v, i) => X(i) + ',' + Y(v)).join(' ') + '" fill="none" stroke="#d0382a" stroke-width="2.5"/>' + vals.map((v, i) => '<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="3.5" fill="#d0382a"/><text x="' + X(i) + '" y="' + (B + 18) + '" font-size="11" text-anchor="middle">' + labels[i] + '</text>').join('') + '<text x="' + (L - 4) + '" y="' + (top - 4) + '" font-size="11" text-anchor="end">(' + unit + ')</text></svg>';
    return s; };
  add('e4', 'e4i', '📈', '折れ線グラフ', ['変わっていく ようすを 表すのに 便利 (気温・身長 など)', '線の かたむきが 急 → 変わり方が 大きい、横に まっすぐ → 変わらない', '目もり 1つ分の 大きさを まず 確かめる'], () => {
    const M = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'], base = pick([[5, 6, 9, 14, 19, 22, 26, 27], [3, 4, 8, 13, 18, 21, 25, 26], [8, 9, 12, 16, 20, 23, 27, 29]]), v = base.map(x => x + R(-1, 1)), k = pick(['max', 'diff', 'steep', 'read']);
    const fig = lineChart(M, v, '度', '月ごとの 気温'), diffs = v.slice(1).map((x, i) => x - v[i]);
    if (k === 'max') { const i = v.indexOf(Math.max(...v)); if (v.lastIndexOf(Math.max(...v)) !== i) return null; const o = choice('グラフで 気温が いちばん 高いのは 何月?', M[i], M.filter((_, j) => j !== i).slice(-4), ['点が いちばん 上に ある 月 → ' + M[i] + ' (' + v[i] + '度)']); return o && Object.assign(o, { fig: fig }); }
    if (k === 'diff') { const i = R(0, 6); return { q: 'グラフで ' + M[i] + 'から ' + M[i + 1] + 'の 間に 気温は 何度 上がった?', type: 'num', a: v[i + 1] - v[i], fig: fig, steps: [M[i] + ' は ' + v[i] + '度、' + M[i + 1] + ' は ' + v[i + 1] + '度', v[i + 1] + ' − ' + v[i] + ' = ' + (v[i + 1] - v[i]) + '度'] }; }
    if (k === 'steep') { const mxd = Math.max(...diffs), i = diffs.indexOf(mxd); if (diffs.lastIndexOf(mxd) !== i) return null; const o = choice('グラフで 気温の 上がり方が いちばん 大きいのは どの 月の 間?', M[i] + '〜' + M[i + 1], diffs.map((_, j) => M[j] + '〜' + M[j + 1]).filter((_, j) => j !== i).sort(() => Math.random() - 0.5), ['線の かたむきが いちばん 急な ところ', M[i] + '〜' + M[i + 1] + ' で ' + mxd + '度 上がった']); return o && Object.assign(o, { fig: fig }); }
    const i = R(0, 7); return { q: 'グラフで ' + M[i] + 'の 気温は 何度?', type: 'num', a: v[i], fig: fig, steps: ['横の じくで ' + M[i] + ' を 見つけ、点の 高さを 左の 目もりで 読む', '→ ' + v[i] + '度'] };
  });
  const QUAD = [['台形', '向かい合った 1組の 辺が 平行'], ['平行四辺形', '向かい合った 2組の 辺が 平行'], ['ひし形', '4つの 辺の 長さが すべて 等しい'], ['長方形', '4つの 角が すべて 直角'], ['正方形', '4つの 辺が 等しく、4つの 角が すべて 直角']];
  add('e4', 'e4j', '▱', '垂直・平行と 四角形', ['2本の 直線が 直角に 交わる → 垂直、どこまで のばしても 交わらない → 平行', '台形: 1組が 平行、平行四辺形: 2組が 平行、ひし形: 4辺が 等しい', '平行四辺形の 向かい合う 辺の 長さ・角の 大きさは 等しい'], () => {
    const k = pick(['name', 'name', 'diag', 'angle', 'para']);
    if (k === 'name') { const SAT = { 平行四辺形: ['ひし形', '長方形', '正方形'], ひし形: ['正方形'], 長方形: ['正方形'], 正方形: [] }, q = pick(QUAD.slice(1)), ex = SAT[q[0]];
      return choice('「' + q[1] + '」四角形の 名前は? (いちばん 広く あてはまる 名前)', q[0], QUAD.map(x => x[0]).filter(x => x !== q[0] && ex.indexOf(x) < 0).concat(['三角形', '五角形']).sort(() => Math.random() - 0.5), [q[0] + ': ' + q[1], ex.length ? '(' + ex.join('・') + ' も この 性質を もつ — ' + q[0] + 'の なかまだから)' : '正方形は ひし形でも あり 長方形でも ある']); }
    if (k === 'diag') { const D = [['ひし形', '2本の 対角線が 垂直に 交わり、たがいの まん中で 交わる (長さは ちがう)'], ['長方形', '2本の 対角線の 長さが 等しく、たがいの まん中で 交わる (垂直では ない)'], ['正方形', '2本の 対角線の 長さが 等しく、垂直に 交わり、まん中で 交わる'], ['平行四辺形', '2本の 対角線が たがいの まん中で 交わる (長さも 角も 決まって いない)']], d = pick(D);
      return choice('対角線が「' + d[1] + '」四角形は?', d[0], D.filter(x => x !== d).map(x => x[0]).concat(['台形']), ['対角線の 性質: ' + d[0] + ' → ' + d[1]]); }
    if (k === 'angle') { const a = R(50, 80); return { q: '平行四辺形の 1つの 角が ' + a + '° の とき、となりの 角は 何度?', type: 'num', a: 180 - a, steps: ['平行四辺形の となり合う 角を 足すと 180°', '180 − ' + a + ' = ' + (180 - a) + '°'] }; }
    const a = R(4, 12), b = R(3, 9); return { q: '平行四辺形の となり合う 2辺が ' + a + 'cm と ' + b + 'cm。まわりの 長さは 何 cm?', type: 'num', a: 2 * (a + b), steps: ['向かい合う 辺の 長さは 等しい', '(' + a + ' + ' + b + ') × 2 = ' + 2 * (a + b) + 'cm'] };
  });
  add('e4', 'e4k', '📦', '直方体と 立方体', ['直方体も 立方体も 面 6・辺 12・頂点 8', '立方体は 6つの 面が すべて 同じ 正方形', '辺の 長さの 合計 = (たて + よこ + 高さ) × 4'], () => {
    const k = pick(['count', 'edge', 'cubeEdge', 'face', 'net']);
    if (k === 'count') { const w = pick([['面', 6], ['辺', 12], ['頂点', 8]]); return { q: '直方体の ' + w[0] + 'の 数は いくつ?', type: 'num', a: w[1], steps: ['面 6、辺 12、頂点 8', '→ ' + w[1]] }; }
    if (k === 'edge') { const a = R(2, 12), b = R(2, 12), c = R(2, 12); return { q: 'たて ' + a + 'cm、よこ ' + b + 'cm、高さ ' + c + 'cm の 直方体の 辺の 長さを ぜんぶ 足すと 何 cm?', type: 'num', a: 4 * (a + b + c), steps: ['同じ 長さの 辺が 4本ずつ', '(' + a + ' + ' + b + ' + ' + c + ') × 4 = ' + 4 * (a + b + c) + 'cm'] }; }
    if (k === 'cubeEdge') { const t = R(3, 20) * 12; return { q: '立方体の 辺の 長さを ぜんぶ 足すと ' + t + 'cm。1辺は 何 cm?', type: 'num', a: t / 12, steps: ['立方体は 12本の 辺が 同じ 長さ', t + ' ÷ 12 = ' + t / 12 + 'cm'] }; }
    if (k === 'face') { return choice('直方体で、1つの 面に 垂直な 面は いくつ?', '4つ', ['1つ', '2つ', '5つ', '6つ'], ['向かい合う 1つの 面は 平行', '残りの 4つの 面が 垂直']); }
    return choice('立方体の 展開図で、1つの 面と 向かい合う (平行な) 面は いくつ?', '1つ', ['2つ', '3つ', '4つ'], ['6つの 面は 3組の 向かい合う 面に 分かれる', '組み立てると 1つの 面に 平行な 面は 1つだけ']);
  });
  add('e4', 'e4l', '🔗', '変わり方 (きまりを 見つける)', ['2つの 量を 表に 書いて、ふえ方の きまりを 見つける', '「□ が 1 ふえると ○ が いくつ ふえる?」を 調べる', 'きまりを 式に すると、遠くの 数も 計算できる'], () => {
    const k = pick(['match', 'peri', 'age', 'steps', 'tables']), n = R(6, 30);
    if (k === 'match') return { q: 'マッチぼうで 正方形を 横に つなげて 作る。正方形 1こで 4本、2こで 7本、3こで 10本。正方形が ' + n + 'こ の とき、マッチぼうは 何本?', type: 'num', a: 3 * n + 1, steps: ['正方形が 1こ ふえると マッチぼうは 3本 ふえる', '最初の 1本 + 3 × こ数 → 1 + 3 × ' + n + ' = ' + (3 * n + 1) + '本'] };
    if (k === 'peri') return { q: '1辺 1cm の 正方形を 横に 1列に ' + n + 'こ 並べる。できた 長方形の まわりの 長さは 何 cm?', type: 'num', a: 2 * n + 2, steps: ['たて 1cm、よこ ' + n + 'cm の 長方形', '(1 + ' + n + ') × 2 = ' + (2 * n + 2) + 'cm'] };
    if (k === 'age') { const d = R(25, 35), c = R(4, 10), y = R(3, 15); return { q: '今、お母さんは ' + (d + c) + '才、わたしは ' + c + '才。わたしが ' + (c + y) + '才に なる とき、お母さんは 何才?', type: 'num', a: d + c + y, steps: ['2人の 年の 差は いつも ' + d + '才 (変わらない)', (c + y) + ' + ' + d + ' = ' + (d + c + y) + '才'] }; }
    if (k === 'steps') { const m = R(4, 12); return { q: '1辺 1cm の 立方体を 階だん の 形に 積む。1だん 1こ、2だん 3こ (1 + 2)、3だん 6こ (1 + 2 + 3)。' + m + 'だん の ときは 何こ?', type: 'num', a: m * (m + 1) / 2, steps: ['1 + 2 + 3 + … + ' + m, '= ' + m * (m + 1) / 2 + 'こ'] }; }
    return { q: 'つくえを 横に 1列に つなげる。1台で 6人、2台で 10人、3台で 14人 すわれる。' + n + '台 では 何人?', type: 'num', a: 4 * n + 2, steps: ['1台 ふえると 4人 ふえる', '6 + 4 × (' + n + ' − 1) = ' + (4 * n + 2) + '人'] };
  });
  add('e4', 'e4m', '🍬', 'わり算 (1けたで わる)', ['大きい 位から 順に「たてる → かける → ひく → おろす」', '商が たたない 位には 0 を たてる (例: 618 ÷ 6 = 103)', '暗算: 60 ÷ 3 は 6 ÷ 3 = 2 の 10倍 → 20'], () => {
    const k = pick(['hiss', 'hiss', 'zero', 'mental', 'word']);
    if (k === 'hiss') { const d = R(2, 9), q = R(12, 199), r = R(0, d - 1), n = d * q + r; return { q: n + ' ÷ ' + d + ' = ? (商と あまり)', type: 'pair', a: [q, r], labels: ['商', 'あまり'], steps: [d + ' × ' + q + ' = ' + d * q, n + ' − ' + d * q + ' = ' + r, 'たしかめ: ' + d + ' × ' + q + ' + ' + r + ' = ' + n] }; }
    if (k === 'zero') { const d = R(3, 9), a = R(1, 9), c = R(1, 9), q = a * 100 + c, n = d * q; return { q: n + ' ÷ ' + d + ' = ?', type: 'num', a: q, steps: ['百の位: ' + Math.floor(n / 100) + ' ÷ ' + d + ' → ' + a, '十の位: 商が たたない → 0 を たてる', '= ' + q] }; }
    if (k === 'mental') { const d = R(2, 9), q = R(2, 9) * pick([10, 100]); return { q: (d * q) + ' ÷ ' + d + ' = ? (暗算)', type: 'num', a: q, steps: [(d * q / (q >= 100 ? 100 : 10)) + ' ÷ ' + d + ' = ' + (q / (q >= 100 ? 100 : 10)), 'それの ' + (q >= 100 ? '100' : '10') + '倍 → ' + q] }; }
    const d = R(3, 8), q = R(10, 40), r = R(1, d - 1), n = d * q + r; return pick([0, 1]) ? { q: 'あめが ' + n + 'こ ある。1人 ' + d + 'こずつ 分けると、何人に 分けられて 何こ あまる?', type: 'pair', a: [q, r], labels: ['人数', 'あまり'], steps: [n + ' ÷ ' + d + ' = ' + q + ' あまり ' + r] }
      : { q: n + '人が ' + d + '人ずつ 長いすに すわる。全員が すわるには 長いすが 何きゃく いる?', type: 'num', a: q + 1, steps: [n + ' ÷ ' + d + ' = ' + q + ' あまり ' + r, 'あまりの ' + r + '人にも 1きゃく 必要 → ' + (q + 1) + 'きゃく'] };
  });
  add('e4', 'e4n', '🔍', '小数の しくみ', ['0.1 を 10こ 集めると 1、0.01 を 10こ 集めると 0.1', '2.45 は「1 が 2こ、0.1 が 4こ、0.01 が 5こ」', '大きさ くらべは 上の 位から 順に'], () => {
    const k = pick(['gather', 'count', 'cmp', 'x10']);
    if (k === 'gather') { const n = R(12, 999); return { q: '0.01 を ' + n + 'こ 集めた 数は?', type: 'num', a: r3(n / 100), steps: ['0.01 が 100こ で 1', n + 'こ → ' + r3(n / 100)] }; }
    if (k === 'count') { const v = R(101, 999) / 100; return { q: r3(v) + ' は 0.01 を 何こ 集めた 数?', type: 'num', a: Math.round(v * 100), steps: ['1 は 0.01 が 100こ', r3(v) + ' → ' + Math.round(v * 100) + 'こ'] }; }
    if (k === 'cmp') { const a = R(100, 400) / 100, xs = [a, r3(a + 0.1), r3(a + 0.01), r3(a - 0.05 + 0.001 * R(0, 4))].map(r3); const mx = Math.max(...xs); if (new Set(xs).size < 4) return null; return choice('いちばん 大きい 数は どれ?', String(mx), xs.filter(x => x !== mx).map(String), ['一の位 → 1/10 の位 → 1/100 の位 の 順に くらべる', '→ ' + mx]); }
    const v = R(11, 999) / 100, t = pick([10, 100]); return pick([0, 1]) ? { q: r3(v) + ' を ' + t + '倍 した 数は?', type: 'num', a: r3(v * t), steps: [t + '倍 → 小数点が ' + (t === 10 ? 1 : 2) + 'けた 右へ', '= ' + r3(v * t)] } : { q: r3(v * 10) + ' を 1/' + t + ' に した 数は?', type: 'num', a: r3(v * 10 / t), steps: ['1/' + t + ' → 小数点が ' + (t === 10 ? 1 : 2) + 'けた 左へ', '= ' + r3(v * 10 / t)] };
  });

  // ======================= 5年 =======================
  add('e5', 'e5a', '✖', '小数の かけ算・わり算', ['小数 × 小数: 小数点以下の けた数を 合わせた ぶんだけ、答えの 小数点を うつ', '÷ 小数: わる数が 整数に なるよう、両方の 小数点を 同じ けただけ 右へ', '1より 小さい 数で わると、答えは わられる数より 大きく なる'], () => {
    const k = pick(['mul', 'mul', 'div', 'div']);
    if (k === 'mul') { const a = R(11, 99) / 10, b = R(11, 99) / 10; return { q: a + ' × ' + b + ' = ?', type: 'num', a: r3(a * b), steps: [Math.round(a * 10) + ' × ' + Math.round(b * 10) + ' = ' + Math.round(a * 10) * Math.round(b * 10), '小数点以下は 1 + 1 = 2けた → ' + r3(a * b)] }; }
    const b = R(2, 9) / 10 + pick([0, 1, 2]), q = R(2, 40); const bb = r3(b), a = r3(bb * q); return { q: a + ' ÷ ' + bb + ' = ? (わりきれるよ)', type: 'num', a: q, steps: ['わる数を 整数に: 両方を 10倍 → ' + r3(a * 10) + ' ÷ ' + r3(bb * 10), '= ' + q] };
  });
  add('e5', 'e5b', '🔁', '倍数・約数 (公倍数・公約数)', ['倍数: その 数に 1, 2, 3 … を かけた 数。約数: その 数を わりきれる 数', '最小公倍数: 共通な 倍数の いちばん 小さい 数', '最大公約数: 共通な 約数の いちばん 大きい 数'], () => {
    const k = pick(['lcm', 'gcd', 'lcmw', 'gcdw']), a = R(4, 18), b = R(4, 18); if (a === b) return null;
    if (k === 'lcm') return { q: a + ' と ' + b + ' の 最小公倍数は?', type: 'num', a: lcm(a, b), steps: [a + ' の 倍数: ' + [1, 2, 3, 4, 5, 6].map(i => a * i).join(', ') + ' …', b + ' の 倍数: ' + [1, 2, 3, 4, 5, 6].map(i => b * i).join(', ') + ' …', 'はじめて 共通な 数 → ' + lcm(a, b)] };
    if (k === 'gcd') { const g = R(2, 9), x = g * R(2, 7), y = g * R(2, 7); if (x === y) return null; const G = gcd(x, y); return { q: x + ' と ' + y + ' の 最大公約数は?', type: 'num', a: G, steps: [x + ' の 約数と ' + y + ' の 約数を 書き出す', '共通な 約数の 中で いちばん 大きい → ' + G] }; }
    if (k === 'lcmw') { const x = pick([6, 8, 9, 10, 12, 15]), y = pick([4, 6, 8, 10, 15, 20]); if (x === y) return null; return { q: 'A の バスは ' + x + '分 ごと、B の バスは ' + y + '分 ごとに 出る。午前8時に 同時に 出発した。次に 同時に 出るのは 何分後?', type: 'num', a: lcm(x, y), steps: [x + ' と ' + y + ' の 最小公倍数を 求める', '= ' + lcm(x, y) + '分後'] }; }
    const g = R(3, 8), x = g * R(2, 6), y = g * R(2, 6); if (x === y) return null; const G = gcd(x, y); return { q: 'えんぴつ ' + x + '本 と ノート ' + y + '冊 を、あまりが 出ないように できるだけ 多くの 人に 同じ 数ずつ 分ける。何人に 分けられる?', type: 'num', a: G, steps: [x + ' と ' + y + ' の 最大公約数', '= ' + G + '人 (1人 えんぴつ ' + x / G + '本、ノート ' + y / G + '冊)'] };
  });
  add('e5', 'e5c', '🥧', '分数の たし算・ひき算 (通分)', ['分母が ちがう ときは 通分 (分母を そろえる) — 最小公倍数を 使う', '答えは 約分して いちばん 簡単に する', '帯分数は 仮分数に 直すと まちがえにくい'], () => {
    const d1 = R(2, 9), d2 = R(2, 9); if (d1 === d2) return null; const n1 = R(1, d1 - 1), n2 = R(1, d2 - 1), op = pick(['+', '−']), L = lcm(d1, d2), a = n1 * L / d1, b = n2 * L / d2; if (op === '−' && a <= b) return null;
    const v = op === '+' ? a + b : a - b, ans = fr(v, L);
    return { q: n1 + '/' + d1 + ' ' + op + ' ' + n2 + '/' + d2 + ' = ? (約分して 答えよう)', type: 'num', a: ans, steps: ['通分: 分母を ' + d1 + ' と ' + d2 + ' の 最小公倍数 ' + L + ' に そろえる', n1 + '/' + d1 + ' = ' + a + '/' + L + '、' + n2 + '/' + d2 + ' = ' + b + '/' + L, a + (op === '+' ? ' + ' : ' − ') + b + ' = ' + v + ' → ' + v + '/' + L + (fs(ans) !== v + '/' + L ? ' = ' + fs(ans) + ' (約分)' : '')] };
  });
  add('e5', 'e5d', '⚖', '平均', ['平均 = 合計 ÷ 個数', '合計 = 平均 × 個数 (逆算に 使う)', '0 の データも 個数に 数える'], () => {
    const k = pick(['avg', 'avg', 'need']);
    if (k === 'avg') { const n = R(4, 6), xs = Array.from({ length: n }, () => R(3, 15)); let s = xs.reduce((a, b) => a + b, 0); const r = s % n; xs[0] += r ? n - r : 0; s = xs.reduce((a, b) => a + b, 0);
      return { q: n + '日間に 読んだ 本の ページ数 (×10): ' + xs.map(x => x * 10).join(', ') + '。1日 平均 何 ページ?', type: 'num', a: s * 10 / n, steps: ['合計: ' + xs.map(x => x * 10).join(' + ') + ' = ' + s * 10, s * 10 + ' ÷ ' + n + ' = ' + s * 10 / n] }; }
    const n = R(3, 5), avg = R(70, 85), sc = Array.from({ length: n }, () => R(avg - 10, avg + 10)), want = avg + R(1, 4), need = want * (n + 1) - sc.reduce((a, b) => a + b, 0); if (need > 100 || need < 0) return null;
    return { q: 'テスト ' + n + '回の 点数: ' + sc.join(', ') + '。次の テストで 何点 とれば、' + (n + 1) + '回の 平均が ' + want + '点に なる?', type: 'num', a: need, steps: [(n + 1) + '回の 合計: ' + want + ' × ' + (n + 1) + ' = ' + want * (n + 1), 'これまでの 合計: ' + sc.reduce((a, b) => a + b, 0), want * (n + 1) + ' − ' + sc.reduce((a, b) => a + b, 0) + ' = ' + need + '点'] };
  });
  add('e5', 'e5e', '🚄', '単位量あたり・速さ', ['こみぐあい = 人数 ÷ 面積 (1m² あたり)、人口密度 = 人口 ÷ 面積 (km²)', '速さ = 道のり ÷ 時間、道のり = 速さ × 時間、時間 = 道のり ÷ 速さ', '時速 → 分速 は ÷ 60、分速 → 秒速 は ÷ 60'], () => {
    const k = pick(['spd', 'dist', 'time', 'conv', 'dens']);
    if (k === 'spd') { const v = R(4, 12) * 10, t = R(2, 5); return { q: t + '時間で ' + v * t + 'km 走る 車の 時速は?', type: 'num', a: v, steps: ['速さ = 道のり ÷ 時間', v * t + ' ÷ ' + t + ' = ' + v + ' (時速 ' + v + 'km)'] }; }
    if (k === 'dist') { const v = R(50, 90), t = R(10, 30); return { q: '分速 ' + v + 'm で ' + t + '分 歩くと、何 m 進む?', type: 'num', a: v * t, steps: ['道のり = 速さ × 時間', v + ' × ' + t + ' = ' + v * t + 'm'] }; }
    if (k === 'time') { const v = R(3, 8) * 10, t = R(2, 6); return { q: '時速 ' + v + 'km で ' + v * t + 'km 進むのに 何時間 かかる?', type: 'num', a: t, steps: ['時間 = 道のり ÷ 速さ', v * t + ' ÷ ' + v + ' = ' + t + '時間'] }; }
    if (k === 'conv') { const v = pick([36, 54, 72, 90, 108]); return { q: '時速 ' + v + 'km は 秒速 何 m?', type: 'num', a: v * 1000 / 3600, steps: ['時速 ' + v + 'km = 時速 ' + cm(v * 1000) + 'm', '÷ 60 で 分速 ' + v * 1000 / 60 + 'm', '÷ 60 で 秒速 ' + v * 1000 / 3600 + 'm'] }; }
    const area = R(2, 9) * 10, d = R(3, 30) * 10; return { q: '面積 ' + area + 'km²、人口 ' + cm(area * d) + '人の 町の 人口密度は? (1km² あたり 何人)', type: 'num', a: d, steps: ['人口密度 = 人口 ÷ 面積', cm(area * d) + ' ÷ ' + area + ' = ' + d + '人'] };
  });
  add('e5', 'e5f', '💯', '割合 (百分率・歩合)', ['割合 = くらべる量 ÷ もとにする量', 'くらべる量 = もとにする量 × 割合、もとにする量 = くらべる量 ÷ 割合', '0.1 = 10% = 1割、0.01 = 1% = 1分'], () => {
    const k = pick(['rate', 'comp', 'base', 'sale', 'buai']);
    if (k === 'rate') { const b = pick([20, 25, 40, 50, 80, 200]), p = pick([10, 15, 20, 25, 30, 40, 60, 75]), c = b * p / 100; if (!Number.isInteger(c)) return null; return { q: b + '人中 ' + c + '人が 賛成した。賛成した 人の 割合は 何 %?', type: 'num', a: p, steps: ['割合 = くらべる量 ÷ もとにする量 = ' + c + ' ÷ ' + b + ' = ' + p / 100, '× 100 で 百分率 → ' + p + '%'] }; }
    if (k === 'comp') { const b = R(2, 20) * 100, p = pick([5, 10, 20, 25, 30, 40, 60, 80]); return { q: b + 'g の ' + p + '% は 何 g?', type: 'num', a: b * p / 100, steps: [p + '% = ' + p / 100, b + ' × ' + p / 100 + ' = ' + b * p / 100 + 'g'] }; }
    if (k === 'base') { const p = pick([20, 25, 40, 50, 75]), b = R(2, 12) * 20, c = b * p / 100; return { q: 'クラスの ' + p + '% に あたる ' + c + '人が 犬を かっている。クラスは 何人?', type: 'num', a: b, steps: ['もとにする量 = くらべる量 ÷ 割合', c + ' ÷ ' + p / 100 + ' = ' + b + '人'] }; }
    if (k === 'sale') { const pr = R(2, 30) * 100, p = pick([10, 20, 25, 30, 40]); return { q: pr + '円の 品物が ' + p + '% 引き。代金は 何円?', type: 'num', a: pr * (100 - p) / 100, steps: [p + '% 引き → 代金は ' + (100 - p) + '% (= ' + (100 - p) / 100 + ')', pr + ' × ' + (100 - p) / 100 + ' = ' + pr * (100 - p) / 100 + '円'] }; }
    const x = pick([0.3, 0.05, 0.25, 0.7, 0.12, 0.08]), wari = n => { const w = Math.floor(n * 10 + 1e-9), b = Math.round(n * 100) % 10; return (w ? w + '割' : '') + (b ? b + '分' : ''); };
    return choice('小数 ' + x + ' を 歩合で 表すと?', wari(x), [wari(x * 10 > 1 ? x / 10 : x * 10), Math.round(x * 100) + '割', wari(Math.min(0.99, r3(x + 0.1)))], ['0.1 = 1割、0.01 = 1分', x + ' = ' + wari(x)]);
  });
  const shapeFig = (k, a, b, c) => {
    const S = (pts, extra) => '<svg viewBox="0 0 260 150" class="mw-figsvg"><polygon points="' + pts.map(p => p.join(',')).join(' ') + '" fill="#e8f0fa" stroke="#2e5fa8" stroke-width="2.5"/>' + extra + '</svg>';
    const T = (x, y, t, col) => '<text x="' + x + '" y="' + y + '" font-size="14" text-anchor="middle" fill="' + (col || '#2a2a3a') + '">' + t + '</text>';
    const dash = (x1, y1, x2, y2) => '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#d0382a" stroke-width="2" stroke-dasharray="5 4"/>';
    if (k === 'tri') return S([[30, 120], [220, 120], [150, 25]], dash(150, 25, 150, 120) + T(125, 140, '底辺 ' + a + 'cm') + T(175, 80, '高さ ' + b + 'cm', '#d0382a'));
    if (k === 'para') return S([[30, 120], [180, 120], [230, 30], [80, 30]], dash(80, 30, 80, 120) + T(105, 140, '底辺 ' + a + 'cm') + T(45, 80, b + 'cm', '#d0382a'));
    if (k === 'trap') return S([[20, 120], [240, 120], [180, 30], [70, 30]], dash(70, 30, 70, 120) + T(125, 22, '上底 ' + c + 'cm') + T(130, 140, '下底 ' + a + 'cm') + T(52, 80, b + 'cm', '#d0382a'));
    return S([[130, 15], [230, 75], [130, 135], [30, 75]], dash(30, 75, 230, 75) + dash(130, 15, 130, 135) + T(180, 70, a + 'cm', '#d0382a') + T(145, 110, b + 'cm', '#d0382a'));
  };
  add('e5', 'e5g', '🔷', '図形の 面積 (三角形・四角形)', ['三角形 = 底辺 × 高さ ÷ 2、平行四辺形 = 底辺 × 高さ', '台形 = (上底 + 下底) × 高さ ÷ 2、ひし形 = 対角線 × 対角線 ÷ 2', '高さは 底辺に 垂直な 長さ (ななめの 辺では ない)'], () => {
    const k = pick(['tri', 'para', 'trap', 'rho']), a = R(4, 16), b = R(3, 12), c = R(2, a - 1);
    if (k === 'tri') { if (a * b % 2) return null; return { q: '底辺 ' + a + 'cm、高さ ' + b + 'cm の 三角形の 面積は 何 cm²?', type: 'num', a: a * b / 2, fig: shapeFig('tri', a, b), steps: [a + ' × ' + b + ' ÷ 2 = ' + a * b / 2] }; }
    if (k === 'para') return { q: '底辺 ' + a + 'cm、高さ ' + b + 'cm の 平行四辺形の 面積は 何 cm²?', type: 'num', a: a * b, fig: shapeFig('para', a, b), steps: [a + ' × ' + b + ' = ' + a * b] };
    if (k === 'trap') { if ((a + c) * b % 2) return null; return { q: '上底 ' + c + 'cm、下底 ' + a + 'cm、高さ ' + b + 'cm の 台形の 面積は 何 cm²?', type: 'num', a: (a + c) * b / 2, fig: shapeFig('trap', a, b, c), steps: ['(' + c + ' + ' + a + ') × ' + b + ' ÷ 2 = ' + (a + c) * b / 2] }; }
    if (a * b % 2) return null; return { q: '対角線が ' + a + 'cm と ' + b + 'cm の ひし形の 面積は 何 cm²?', type: 'num', a: a * b / 2, fig: shapeFig('rho', a, b), steps: [a + ' × ' + b + ' ÷ 2 = ' + a * b / 2] };
  });
  add('e5', 'e5h', '🧊', '体積 (直方体・立方体)', ['直方体 = たて × よこ × 高さ、立方体 = 1辺 × 1辺 × 1辺', '1L = 1000cm³ = 1000mL、1m³ = 1000000cm³ = 1000L', '内のり: 板の 厚さを 引いた 内側の 長さで 計算する'], () => {
    const k = pick(['box', 'cube', 'L', 'in']);
    if (k === 'box') { const a = R(3, 12), b = R(3, 12), c = R(2, 10); return { q: 'たて ' + a + 'cm、よこ ' + b + 'cm、高さ ' + c + 'cm の 直方体の 体積は 何 cm³?', type: 'num', a: a * b * c, steps: [a + ' × ' + b + ' × ' + c + ' = ' + a * b * c] }; }
    if (k === 'cube') { const a = R(2, 12); return { q: '1辺 ' + a + 'cm の 立方体の 体積は 何 cm³?', type: 'num', a: a ** 3, steps: [a + ' × ' + a + ' × ' + a + ' = ' + a ** 3] }; }
    if (k === 'L') { const a = pick([10, 20, 25, 50]), b = pick([10, 20, 40]), c = pick([10, 15, 20, 30]); return { q: '内のりが たて ' + a + 'cm、よこ ' + b + 'cm、深さ ' + c + 'cm の 水そうに 入る 水は 何 L?', type: 'num', a: a * b * c / 1000, steps: [a + ' × ' + b + ' × ' + c + ' = ' + cm(a * b * c) + 'cm³', '1L = 1000cm³ → ' + a * b * c / 1000 + 'L'] }; }
    const t = 1, A = R(12, 22), B = R(12, 22), C = R(8, 15); return { q: '板の 厚さ 1cm で 作った 箱。外側の 長さが たて ' + A + 'cm、よこ ' + B + 'cm、高さ ' + C + 'cm (ふたは ない)。内側の 容積は 何 cm³?', type: 'num', a: (A - 2) * (B - 2) * (C - 1), steps: ['内のり: たて ' + A + ' − 2 = ' + (A - 2) + '、よこ ' + B + ' − 2 = ' + (B - 2) + '、深さ ' + C + ' − 1 = ' + (C - 1) + ' (ふたが ないので 底の 1枚だけ)', (A - 2) + ' × ' + (B - 2) + ' × ' + (C - 1) + ' = ' + (A - 2) * (B - 2) * (C - 1)] };
  });
  add('e5', 'e5i', '⭕', '円周・多角形の 角', ['円周 = 直径 × 3.14 (円周率)', '三角形の 角の 和 = 180°、四角形の 角の 和 = 360°', 'n角形の 角の 和 = 180° × (n − 2)'], () => {
    const k = pick(['circ', 'circ', 'tri', 'quad', 'poly']);
    if (k === 'circ') { const d = R(2, 20), r = pick([0, 1]); return r ? { q: '半径 ' + d + 'cm の 円の 円周は 何 cm? (円周率 3.14)', type: 'num', a: r3(d * 2 * 3.14), steps: ['直径 = ' + d + ' × 2 = ' + d * 2, d * 2 + ' × 3.14 = ' + r3(d * 2 * 3.14)] } : { q: '直径 ' + d + 'cm の 円の 円周は 何 cm? (円周率 3.14)', type: 'num', a: r3(d * 3.14), steps: [d + ' × 3.14 = ' + r3(d * 3.14)] }; }
    if (k === 'tri') { const a = R(30, 90), b = R(20, 150 - a); return { q: '三角形の 2つの 角が ' + a + '° と ' + b + '°。残りの 角は 何度?', type: 'num', a: 180 - a - b, steps: ['三角形の 角の 和 = 180°', '180 − ' + a + ' − ' + b + ' = ' + (180 - a - b) + '°'] }; }
    if (k === 'quad') { const a = R(60, 120), b = R(60, 120), c = R(50, 110); if (a + b + c >= 340) return null; return { q: '四角形の 3つの 角が ' + a + '°、' + b + '°、' + c + '°。残りの 角は 何度?', type: 'num', a: 360 - a - b - c, steps: ['四角形の 角の 和 = 360°', '360 − ' + a + ' − ' + b + ' − ' + c + ' = ' + (360 - a - b - c) + '°'] }; }
    const n = R(5, 10); return { q: n + '角形の 角の 和は 何度?', type: 'num', a: 180 * (n - 2), steps: ['1つの 頂点から 対角線を ひくと 三角形が ' + (n - 2) + 'こ', '180 × ' + (n - 2) + ' = ' + 180 * (n - 2) + '°'] };
  });

  // ---- 5年 (つづき) ----
  add('e5', 'e5j', '🪞', '合同な 図形', ['ぴったり 重なる 図形 = 合同 (うら返しても よい)', '対応する 辺の 長さ・角の 大きさは 等しい', '三角形は「3辺」「2辺と その間の 角」「1辺と その両はしの 角」が わかれば かける'], () => {
    const k = pick(['side', 'angle', 'cond', 'tri']);
    if (k === 'side') { const a = R(3, 9), b = R(3, 9), c = R(3, 9); return { q: '三角形 ABC と 三角形 DEF は 合同で、頂点 A と D、B と E、C と F が 対応する。AB = ' + a + 'cm、BC = ' + b + 'cm、CA = ' + c + 'cm の とき、辺 EF は 何 cm?', type: 'num', a: b, steps: ['EF に 対応する 辺は BC', '対応する 辺の 長さは 等しい → ' + b + 'cm'] }; }
    if (k === 'angle') { const A = R(40, 80), B = R(30, 80); if (A + B >= 160) return null; return { q: '三角形 ABC と 三角形 DEF は 合同 (A と D、B と E、C と F が 対応)。角 A = ' + A + '°、角 B = ' + B + '° の とき、角 F は 何度?', type: 'num', a: 180 - A - B, steps: ['角 F に 対応するのは 角 C', '角 C = 180 − ' + A + ' − ' + B + ' = ' + (180 - A - B) + '°'] }; }
    if (k === 'cond') return choice('次の うち、1つの 三角形が 決まらない (合同な 三角形が かけない) のは どれ?', '3つの 角の 大きさ', ['3つの 辺の 長さ', '2つの 辺の 長さと その間の 角', '1つの 辺の 長さと その両はしの 角'], ['3つの 角だけでは、形は 同じでも 大きさが 決まらない (拡大・縮小できる)', '合同な 三角形を かく 3つの 条件: 3辺 / 2辺と間の角 / 1辺と両はしの角']);
    return choice('四角形に 1本の 対角線を ひいて できる 2つの 三角形が いつも 合同に なる 四角形は?', '平行四辺形', ['台形', '四角形 (ふつうの)', '五角形'], ['平行四辺形は 対角線で 合同な 2つの 三角形に 分かれる', '(長方形・ひし形・正方形も 平行四辺形の なかま)']);
  });
  add('e5', 'e5k', '🔄', '分数と 小数・整数', ['わり算の 商は 分数で 表せる: a ÷ b = a/b', '分数 → 小数: 分子 ÷ 分母 (3/4 = 3 ÷ 4 = 0.75)', '小数 → 分数: 0.1 = 1/10、0.01 = 1/100 を 使って 約分'], () => {
    const k = pick(['div', 'toD', 'toF', 'cmp']);
    if (k === 'div') { const a = R(1, 9), b = R(2, 9); if (a === b) return null; return { q: a + ' ÷ ' + b + ' の 商を 分数で 表すと?', type: 'num', a: fr(a, b), steps: ['a ÷ b = a/b', a + ' ÷ ' + b + ' = ' + a + '/' + b + (fs(fr(a, b)) !== a + '/' + b ? ' = ' + fs(fr(a, b)) : '')] }; }
    if (k === 'toD') { const [n, d] = pick([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 8], [3, 8], [5, 8], [7, 20], [9, 25], [3, 2], [7, 4]]); return { q: n + '/' + d + ' を 小数で 表すと?', type: 'num', a: r3(n / d), steps: ['分子 ÷ 分母', n + ' ÷ ' + d + ' = ' + r3(n / d)] }; }
    if (k === 'toF') { const v = pick([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 0.125, 1.2, 0.35, 0.45, 2.5]), den = String(v).split('.')[1].length === 1 ? 10 : String(v).split('.')[1].length === 2 ? 100 : 1000; return { q: v + ' を 分数で 表すと? (約分して)', type: 'num', a: fr(Math.round(v * den), den), steps: [v + ' = ' + Math.round(v * den) + '/' + den, '約分 → ' + fs(fr(Math.round(v * den), den))] }; }
    const P = [['3/4', 0.75], ['0.7', 0.7], ['2/3', 2 / 3], ['0.68', 0.68], ['5/8', 0.625], ['0.6', 0.6]].sort(() => Math.random() - 0.5).slice(0, 4), mx = P.reduce((a, b) => b[1] > a[1] ? b : a);
    return choice('いちばん 大きい 数は どれ?', mx[0], P.filter(x => x !== mx).map(x => x[0]), ['分数を 小数に そろえて くらべる', P.map(x => x[0] + ' = ' + (Math.round(x[1] * 1000) / 1000)).join('、')]);
  });
  const pieSVG = (items) => { let s = '<svg viewBox="0 0 320 200" class="mw-figsvg">', a = -90, cx = 100, cy = 100, r = 85; const C = ['#f2a65a', '#6aa8d8', '#8cc98c', '#e88a9a', '#c0a0e0', '#d8d0b0'];
    items.forEach(([nm, p], i) => { const a2 = a + p * 3.6, x1 = cx + r * Math.cos(a * Math.PI / 180), y1 = cy + r * Math.sin(a * Math.PI / 180), x2 = cx + r * Math.cos(a2 * Math.PI / 180), y2 = cy + r * Math.sin(a2 * Math.PI / 180), mid = (a + a2) / 2;
      s += '<path d="M' + cx + ',' + cy + ' L' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' A' + r + ',' + r + ' 0 ' + (p > 50 ? 1 : 0) + ' 1 ' + x2.toFixed(1) + ',' + y2.toFixed(1) + ' Z" fill="' + C[i] + '" stroke="#fff" stroke-width="2"/>';
      if (p >= 8) s += '<text x="' + (cx + r * 0.62 * Math.cos(mid * Math.PI / 180)).toFixed(1) + '" y="' + (cy + r * 0.62 * Math.sin(mid * Math.PI / 180) + 5).toFixed(1) + '" font-size="12" text-anchor="middle">' + p + '%</text>';
      s += '<rect x="205" y="' + (30 + i * 24) + '" width="14" height="14" fill="' + C[i] + '"/><text x="225" y="' + (42 + i * 24) + '" font-size="13">' + nm + '</text>'; a = a2; });
    return s + '</svg>'; };
  add('e5', 'e5l', '🥧', '帯グラフ・円グラフ', ['全体を 100% と して、それぞれの 割合を 表す グラフ', '人数 = 全体 × 割合 (%) ÷ 100', '円グラフは 12時の 位置から 右回りに、割合の 大きい 順に かく'], () => {
    const set = pick([[['犬', 35], ['ねこ', 25], ['うさぎ', 15], ['鳥', 10], ['その他', 15]], [['サッカー', 30], ['野球', 20], ['水泳', 25], ['テニス', 15], ['その他', 10]], [['米', 40], ['小麦', 25], ['とうもろこし', 20], ['その他', 15]]]),
      tot = pick([40, 80, 120, 200, 300]), fig = pieSVG(set), k = pick(['pct', 'num', 'diff', 'times']), i = R(0, set.length - 2), j = (i + 1 + R(0, set.length - 3)) % (set.length - 1);
    if (k === 'pct') return { q: '円グラフで「' + set[i][0] + '」は 全体の 何 %?', type: 'num', a: set[i][1], fig: fig, steps: ['グラフの 目もりを 読む → ' + set[i][1] + '%'] };
    if (k === 'num') return { q: '全体が ' + tot + '人 の とき、「' + set[i][0] + '」は 何人?', type: 'num', a: tot * set[i][1] / 100, fig: fig, steps: [set[i][0] + ' は ' + set[i][1] + '%', tot + ' × ' + set[i][1] / 100 + ' = ' + tot * set[i][1] / 100 + '人'] };
    if (k === 'diff') { if (i === j) return null; const d = Math.abs(set[i][1] - set[j][1]); if (!d) return null; return { q: '全体が ' + tot + '人 の とき、「' + set[i][0] + '」と「' + set[j][0] + '」の 人数の 差は 何人?', type: 'num', a: tot * d / 100, fig: fig, steps: ['割合の 差: ' + Math.abs(set[i][1] - set[j][1]) + '%', tot + ' × ' + d / 100 + ' = ' + tot * d / 100 + '人'] }; }
    const a = set[0], b = set.find(x => a[1] % x[1] === 0 && x !== a && x[0] !== 'その他'); if (!b) return null; return { q: '「' + a[0] + '」は「' + b[0] + '」の 何倍?', type: 'num', a: a[1] / b[1], fig: fig, steps: [a[1] + '% ÷ ' + b[1] + '% = ' + a[1] / b[1] + '倍'] };
  });
  add('e5', 'e5m', '🏛', '角柱と 円柱', ['角柱: 2つの 底面 (合同な 多角形) と 長方形の 側面', 'n角柱の 面 = n + 2、辺 = 3 × n、頂点 = 2 × n', '円柱の 展開図: 側面の 長方形の 横 = 底面の 円周'], () => {
    const k = pick(['face', 'edge', 'vert', 'net', 'name']), n = R(3, 8), NM = { 3: '三', 4: '四', 5: '五', 6: '六', 7: '七', 8: '八' };
    if (k === 'face') return { q: NM[n] + '角柱の 面の 数は?', type: 'num', a: n + 2, steps: ['底面 2つ + 側面 ' + n + 'つ', '= ' + (n + 2)] };
    if (k === 'edge') return { q: NM[n] + '角柱の 辺の 数は?', type: 'num', a: 3 * n, steps: ['上の 底面 ' + n + '本 + 下の 底面 ' + n + '本 + たての 辺 ' + n + '本', '= ' + 3 * n] };
    if (k === 'vert') return { q: NM[n] + '角柱の 頂点の 数は?', type: 'num', a: 2 * n, steps: ['上の 底面 ' + n + 'こ + 下の 底面 ' + n + 'こ', '= ' + 2 * n] };
    if (k === 'net') { const d = R(2, 10); return { q: '直径 ' + d + 'cm の 円柱の 展開図で、側面の 長方形の 横の 長さは 何 cm? (円周率 3.14)', type: 'num', a: r3(d * 3.14), steps: ['側面の 横 = 底面の 円周', d + ' × 3.14 = ' + r3(d * 3.14) + 'cm'] }; }
    const f = R(5, 10); return choice('面の 数が ' + f + 'つの 角柱は?', NM[f - 2] + '角柱', [NM[f - 1] || '九', NM[f - 3] || '二', NM[Math.min(8, f)] ].map(x => x + '角柱'), ['角柱の 面 = 底面の 辺の 数 + 2', f + ' − 2 = ' + (f - 2) + ' → ' + NM[f - 2] + '角柱']);
  });
  add('e5', 'e5n', '📊', '比例 (5年)', ['□ が 2倍・3倍 に なると ○ も 2倍・3倍 → ○ は □ に 比例する', '○ ÷ □ が いつも 同じ 数に なる', '表を たてに 見ても (÷)、横に 見ても (×何倍) 解ける'], () => {
    const k = pick(['find', 'find', 'which', 'tbl']);
    if (k === 'find') { const c = pick([[80, 'えんぴつ', '本', '円'], [6, '針金', 'm', 'g'], [3, '水そう', '分', 'cm'], [45, '電車', '分', 'km']]), x1 = R(2, 6), x2 = R(7, 15);
      if (c[1] === '針金') return { q: '針金 ' + x1 + 'm の 重さは ' + c[0] * x1 + 'g。この 針金 ' + x2 + 'm の 重さは? (重さは 長さに 比例)', type: 'num', a: c[0] * x2, steps: ['1m あたり ' + c[0] * x1 + ' ÷ ' + x1 + ' = ' + c[0] + 'g', c[0] + ' × ' + x2 + ' = ' + c[0] * x2 + 'g'] };
      if (c[1] === '水そう') return { q: '水そうに 水を 入れると、' + x1 + '分で 深さが ' + c[0] * x1 + 'cm に なった。' + x2 + '分後の 深さは? (深さは 時間に 比例)', type: 'num', a: c[0] * x2, steps: ['1分 あたり ' + c[0] + 'cm', c[0] + ' × ' + x2 + ' = ' + c[0] * x2 + 'cm'] };
      return { q: 'えんぴつ ' + x1 + '本で ' + c[0] * x1 + '円。同じ えんぴつ ' + x2 + '本では 何円?', type: 'num', a: c[0] * x2, steps: ['1本 ' + c[0] * x1 + ' ÷ ' + x1 + ' = ' + c[0] + '円', c[0] + ' × ' + x2 + ' = ' + c[0] * x2 + '円'] }; }
    if (k === 'which') return choice('○ が □ に 比例している ものは どれ?', '1こ 50円の あめの こ数 □ と 代金 ○', ['年れい □ と 身長 ○', '1日の うち 昼の 長さ □ と 夜の 長さ ○', '正方形の 1辺 □ と 面積 ○'], ['□ が 2倍 → ○ も 2倍 に なるか 確かめる', 'あめは 2こ で 100円、4こ で 200円 → 比例']);
    const a = R(2, 9), xs = [1, 2, 3, 4, 5], hide = R(2, 4); return { q: '表: □ = ' + xs.join(', ') + ' の とき ○ = ' + xs.map((x, i) => i === hide ? '?' : a * x).join(', ') + '。? に 入る 数は? (○ は □ に 比例)', type: 'num', a: a * xs[hide], steps: ['○ ÷ □ = ' + a + ' (いつも 同じ)', a + ' × ' + xs[hide] + ' = ' + a * xs[hide]] };
  });
  add('e5', 'e5o', '🛒', '単位量あたりの 文章題', ['くらべる ときは「1こ あたり」「1L あたり」「1m² あたり」に そろえる', 'ねだん ÷ こ数 = 1こ あたりの ねだん (安い ほうが お得)', '道のり ÷ ガソリン = 1L あたりに 走る 道のり'], () => {
    const k = pick(['cheap', 'gas', 'crop', 'ink', 'need']);
    if (k === 'cheap') { const p1 = R(5, 12) * 10, n1 = pick([3, 4, 5]), p2 = R(5, 12) * 10, n2 = pick([6, 8, 10]); const a = p1 * n1, b = p2 * n2; if (p1 === p2) return null; return choice('A: ' + n1 + 'こ ' + a + '円、B: ' + n2 + 'こ ' + b + '円。1こ あたり 安いのは?', p1 < p2 ? 'A' : 'B', [p1 < p2 ? 'B' : 'A', 'どちらも 同じ', 'くらべられない'], ['A: ' + a + ' ÷ ' + n1 + ' = ' + p1 + '円', 'B: ' + b + ' ÷ ' + n2 + ' = ' + p2 + '円', '→ ' + (p1 < p2 ? 'A' : 'B') + ' が 安い']); }
    if (k === 'gas') { const per = R(12, 25), L = R(20, 45); return { q: 'ガソリン ' + L + 'L で ' + per * L + 'km 走る 車が ある。ガソリン 1L あたり 何 km 走る?', type: 'num', a: per, steps: [per * L + ' ÷ ' + L + ' = ' + per + 'km'] }; }
    if (k === 'crop') { const a = pick([5, 8, 10, 12]), per = R(30, 60); return { q: a + 'a の 畑から じゃがいもが ' + per * a + 'kg とれた。1a あたり 何 kg?', type: 'num', a: per, steps: [per * a + ' ÷ ' + a + ' = ' + per + 'kg'] }; }
    if (k === 'ink') { const per = R(3, 8), n = R(4, 9); return { q: 'ペンキ ' + n + 'dL で かべを ' + per * n + 'm² ぬれる。同じ ペンキ 1dL で 何 m² ぬれる?', type: 'num', a: per, steps: [per * n + ' ÷ ' + n + ' = ' + per + 'm²'] }; }
    const per = R(12, 18), d = per * R(10, 30); return { q: '1L あたり ' + per + 'km 走る 車で ' + d + 'km 走るには、ガソリンは 何 L 必要?', type: 'num', a: d / per, steps: ['必要な 量 = 道のり ÷ 1L あたりの 道のり', d + ' ÷ ' + per + ' = ' + d / per + 'L'] };
  });

  // ======================= 6年 =======================
  add('e6', 'e6a', '✂', '分数の かけ算・わり算', ['分数 × 分数: 分母どうし・分子どうしを かける (とちゅうで 約分)', '分数 ÷ 分数: わる数の 分母と 分子を 入れかえて (逆数に して) かける', '整数は「整数/1」と 考える'], () => {
    const k = pick(['mul', 'div', 'mixd']), a = R(1, 8), b = R(2, 9), c = R(1, 8), d = R(2, 9);
    if (gcd(a, b) !== 1 || gcd(c, d) !== 1 || c === d || a === b) return null;
    if (k === 'mul') { const v = fr(a * c, b * d); return { q: a + '/' + b + ' × ' + c + '/' + d + ' = ? (約分して)', type: 'num', a: v, steps: ['分子どうし: ' + a + ' × ' + c + ' = ' + a * c + '、分母どうし: ' + b + ' × ' + d + ' = ' + b * d, '= ' + a * c + '/' + b * d + (fs(v) !== a * c + '/' + b * d ? ' = ' + fs(v) : '')] }; }
    if (k === 'div') { const v = fr(a * d, b * c); return { q: a + '/' + b + ' ÷ ' + c + '/' + d + ' = ? (約分して)', type: 'num', a: v, steps: ['わる数を 逆数に して かける: ' + a + '/' + b + ' × ' + d + '/' + c, '= ' + a * d + '/' + b * c + (fs(v) !== a * d + '/' + b * c ? ' = ' + fs(v) : '')] }; }
    const n = R(2, 9), v = fr(a * n, b); return { q: a + '/' + b + ' × ' + n + ' = ? (約分して)', type: 'num', a: v, steps: [n + ' = ' + n + '/1 と 考える', a + ' × ' + n + ' = ' + a * n + ' → ' + a * n + '/' + b + (fs(v) !== a * n + '/' + b ? ' = ' + fs(v) : '')] };
  });
  add('e6', 'e6b', '⚖', '比', ['a : b の 比の 値 = a ÷ b', '比の 両方に 同じ 数を かけたり わったり しても 等しい 比 (6 : 9 = 2 : 3)', 'a : b = c : x なら、何倍かを 見つけて x を 求める'], () => {
    const k = pick(['simp', 'x', 'share', 'val']);
    if (k === 'simp') { const g = R(2, 9), a = R(1, 9), b = R(1, 9); if (gcd(a, b) !== 1 || a === b) return null; return { q: (a * g) + ' : ' + (b * g) + ' を いちばん 簡単な 整数の 比に しよう。', type: 'pair', a: [a, b], labels: ['左', '右'], steps: [(a * g) + ' と ' + (b * g) + ' の 最大公約数 ' + g + ' で わる', '= ' + a + ' : ' + b] }; }
    if (k === 'x') { const a = R(2, 9), b = R(2, 9), m = R(2, 8); return { q: a + ' : ' + b + ' = ' + a * m + ' : x の とき、x は?', type: 'num', a: b * m, steps: [a + ' → ' + a * m + ' は ' + m + '倍', 'x = ' + b + ' × ' + m + ' = ' + b * m] }; }
    if (k === 'share') { const a = R(1, 5), b = R(1, 5), u = R(2, 12) * 10; if (a === b) return null; return { q: (a + b) * u + '円を、兄と 弟で ' + a + ' : ' + b + ' に 分ける。兄は 何円?', type: 'num', a: a * u, steps: ['全体は ' + a + ' + ' + b + ' = ' + (a + b) + ' (つ分)', '1つ分 = ' + (a + b) * u + ' ÷ ' + (a + b) + ' = ' + u, '兄 = ' + u + ' × ' + a + ' = ' + a * u + '円'] }; }
    const a = R(1, 9), b = R(2, 9); return { q: a + ' : ' + b + ' の 比の 値は? (分数で)', type: 'num', a: fr(a, b), steps: ['比の 値 = ' + a + ' ÷ ' + b + ' = ' + fs(fr(a, b))] };
  });
  add('e6', 'e6c', '🍕', '円の 面積', ['円の 面積 = 半径 × 半径 × 3.14', '半円 = 円の 面積 ÷ 2、おうぎ形 = 円 × (中心角 ÷ 360)', '直径が わかっている ときは まず 半径に'], () => {
    const k = pick(['r', 'd', 'half', 'quarter']), r = R(2, 10);
    if (k === 'r') return { q: '半径 ' + r + 'cm の 円の 面積は 何 cm²? (円周率 3.14)', type: 'num', a: r3(r * r * 3.14), steps: [r + ' × ' + r + ' × 3.14 = ' + r3(r * r * 3.14)] };
    if (k === 'd') return { q: '直径 ' + 2 * r + 'cm の 円の 面積は 何 cm²? (円周率 3.14)', type: 'num', a: r3(r * r * 3.14), steps: ['半径 = ' + 2 * r + ' ÷ 2 = ' + r, r + ' × ' + r + ' × 3.14 = ' + r3(r * r * 3.14)] };
    if (k === 'half') return { q: '半径 ' + r + 'cm の 半円の 面積は 何 cm²? (円周率 3.14)', type: 'num', a: r3(r * r * 3.14 / 2), steps: [r + ' × ' + r + ' × 3.14 ÷ 2 = ' + r3(r * r * 3.14 / 2)] };
    return { q: '半径 ' + r + 'cm、中心角 90° の おうぎ形の 面積は 何 cm²? (円周率 3.14)', type: 'num', a: r3(r * r * 3.14 / 4), steps: ['90° は 円の 1/4', r + ' × ' + r + ' × 3.14 ÷ 4 = ' + r3(r * r * 3.14 / 4)] };
  });
  add('e6', 'e6d', '🥫', '角柱・円柱の 体積', ['角柱・円柱の 体積 = 底面積 × 高さ', '三角柱なら 底面の 三角形の 面積を 先に', '円柱の 底面積 = 半径 × 半径 × 3.14'], () => {
    const k = pick(['tri', 'cyl', 'cyl', 'quad']);
    if (k === 'tri') { const a = R(3, 10), b = R(2, 8) * 2, h = R(3, 12); return { q: '底面が 底辺 ' + a + 'cm・高さ ' + b + 'cm の 三角形で、高さ ' + h + 'cm の 三角柱の 体積は 何 cm³?', type: 'num', a: a * b / 2 * h, steps: ['底面積: ' + a + ' × ' + b + ' ÷ 2 = ' + a * b / 2, a * b / 2 + ' × ' + h + ' = ' + a * b / 2 * h] }; }
    if (k === 'quad') { const a = R(3, 9), b = R(3, 9), c = R(2, 6), h = R(3, 10); return { q: '底面が 上底 ' + c + 'cm・下底 ' + (c + 2) + 'cm・高さ ' + a + 'cm の 台形で、高さ ' + h + 'cm の 四角柱の 体積は 何 cm³?', type: 'num', a: (2 * c + 2) * a / 2 * h, steps: ['底面積: (' + c + ' + ' + (c + 2) + ') × ' + a + ' ÷ 2 = ' + (2 * c + 2) * a / 2, (2 * c + 2) * a / 2 + ' × ' + h + ' = ' + (2 * c + 2) * a / 2 * h] }; }
    const r = R(2, 6), h = R(3, 10); return { q: '底面の 半径 ' + r + 'cm、高さ ' + h + 'cm の 円柱の 体積は 何 cm³? (円周率 3.14)', type: 'num', a: r3(r * r * 3.14 * h), steps: ['底面積: ' + r + ' × ' + r + ' × 3.14 = ' + r3(r * r * 3.14), r3(r * r * 3.14) + ' × ' + h + ' = ' + r3(r * r * 3.14 * h)] };
  });
  add('e6', 'e6e', '🗺', '拡大図・縮図 (縮尺)', ['縮尺 1/25000 は「地図の 1cm が 実際の 25000cm (= 250m)」', '実際の 長さ = 地図上の 長さ × 縮尺の 分母', '1m = 100cm、1km = 1000m = 100000cm'], () => {
    const k = pick(['real', 'map', 'scale']), s = pick([10000, 20000, 25000, 50000]), c = R(2, 12);
    if (k === 'real') return { q: '縮尺 1/' + cm(s) + ' の 地図で ' + c + 'cm の 長さは、実際には 何 m?', type: 'num', a: c * s / 100, steps: [c + ' × ' + cm(s) + ' = ' + cm(c * s) + 'cm', cm(c * s) + 'cm = ' + c * s / 100 + 'm'] };
    if (k === 'map') { const m = c * s / 100; return { q: '実際の きょり ' + cm(m) + 'm は、縮尺 1/' + cm(s) + ' の 地図では 何 cm?', type: 'num', a: c, steps: [cm(m) + 'm = ' + cm(m * 100) + 'cm', cm(m * 100) + ' ÷ ' + cm(s) + ' = ' + c + 'cm'] }; }
    const k2 = R(2, 4), w = R(2, 6); return { q: 'たて ' + w + 'cm の 三角形の ' + k2 + '倍の 拡大図を かく。拡大図の たては 何 cm?', type: 'num', a: w * k2, steps: ['拡大図は すべての 辺が 同じ 倍率', w + ' × ' + k2 + ' = ' + w * k2 + 'cm (角の 大きさは 変わらない)'] };
  });
  add('e6', 'e6f', '📈', '比例と 反比例', ['比例: y = きまった数 × x (x が 2倍 → y も 2倍)', '反比例: x × y = きまった数 (x が 2倍 → y は 1/2)', 'まず「きまった数」を 求める'], () => {
    const k = pick(['p', 'p', 'h', 'h']);
    if (k === 'p') { const a = R(2, 9), x1 = R(2, 6), x2 = R(7, 15); return { q: 'y は x に 比例し、x = ' + x1 + ' の とき y = ' + a * x1 + '。x = ' + x2 + ' の とき y は?', type: 'num', a: a * x2, steps: ['きまった数 = y ÷ x = ' + a * x1 + ' ÷ ' + x1 + ' = ' + a, 'y = ' + a + ' × ' + x2 + ' = ' + a * x2] }; }
    const K = pick([12, 18, 24, 36, 48, 60]), x1 = pick([2, 3, 4, 6].filter(v => K % v === 0)), x2 = pick([2, 3, 4, 6, 12].filter(v => K % v === 0 && v !== x1)); return { q: 'y は x に 反比例し、x = ' + x1 + ' の とき y = ' + K / x1 + '。x = ' + x2 + ' の とき y は?', type: 'num', a: K / x2, steps: ['きまった数 = x × y = ' + x1 + ' × ' + K / x1 + ' = ' + K, 'y = ' + K + ' ÷ ' + x2 + ' = ' + K / x2] };
  });
  add('e6', 'e6g', '🎲', '並べ方と 組み合わせ方', ['並べ方: 樹形図 や かけ算 (4人の 並び方 = 4 × 3 × 2 × 1)', '組み合わせ方: 順番を 区別しない (A-B と B-A は 同じ)', 'リーグ戦の 試合数 = n × (n − 1) ÷ 2'], () => {
    const k = pick(['perm', 'perm2', 'comb', 'league', 'num']);
    if (k === 'perm') { const n = R(3, 5), f = [1, 1, 2, 6, 24, 120][n]; return { q: n + '人が 1列に 並ぶ 並び方は 何通り?', type: 'num', a: f, steps: ['1番目 ' + n + '通り、2番目 ' + (n - 1) + '通り … とかけていく', Array.from({ length: n }, (_, i) => n - i).join(' × ') + ' = ' + f] }; }
    if (k === 'perm2') { const n = R(4, 7); return { q: n + '人の 中から 委員長と 副委員長を 1人ずつ 選ぶ 選び方は 何通り?', type: 'num', a: n * (n - 1), steps: ['委員長 ' + n + '通り、副委員長は 残り ' + (n - 1) + '通り (順番が ある)', n + ' × ' + (n - 1) + ' = ' + n * (n - 1)] }; }
    if (k === 'comb') { const n = R(4, 7); return { q: n + '種類の くだものから 2種類を 選ぶ 組み合わせは 何通り?', type: 'num', a: n * (n - 1) / 2, steps: ['並べ方なら ' + n + ' × ' + (n - 1) + ' = ' + n * (n - 1) + '通り', 'A-B と B-A は 同じ なので ÷ 2 → ' + n * (n - 1) / 2] }; }
    if (k === 'league') { const n = R(4, 8); return { q: n + 'チームが どの チームとも 1回ずつ 試合を する (リーグ戦)。全部で 何試合?', type: 'num', a: n * (n - 1) / 2, steps: ['1チームは ' + (n - 1) + '試合', n + ' × ' + (n - 1) + ' ÷ 2 = ' + n * (n - 1) / 2 + ' (2チームで 1試合 なので ÷ 2)'] }; }
    return { q: '1, 2, 3, 4 の 4まいの カードから 2まい 選んで 2けたの 整数を つくる。何通り できる?', type: 'num', a: 12, steps: ['十の位 4通り、一の位は 残り 3通り', '4 × 3 = 12'] };
  });
  add('e6', 'e6h', '🦋', '対称な 図形', ['線対称: 1本の 直線 (対称の 軸) で 折ると ぴったり 重なる', '点対称: 1つの 点 (対称の 中心) の まわりに 180° 回すと ぴったり 重なる', '正方形・長方形・ひし形・円は 両方の 対称'], () => {
    const S = [['正三角形', 1, 0, 3], ['正方形', 1, 1, 4], ['長方形', 1, 1, 2], ['ひし形', 1, 1, 2], ['平行四辺形', 0, 1, 0], ['二等辺三角形', 1, 0, 1], ['正五角形', 1, 0, 5], ['正六角形', 1, 1, 6], ['台形 (ふつうの)', 0, 0, 0], ['直角三角形 (ふつうの)', 0, 0, 0], ['四角形 (ふつうの)', 0, 0, 0]];
    const k = pick(['pt', 'line', 'axes']);
    if (k === 'axes') { const s = pick(S.filter(x => x[1])); return { q: s[0] + 'の 対称の 軸は 何本?', type: 'num', a: s[3], steps: [s[0] + 'は 折って 重なる 直線が ' + s[3] + '本', s[0].indexOf('正') === 0 ? '正n角形の 対称の 軸は n本' : '形を 思いうかべて 折ってみよう'] }; }
    if (k === 'pt') { const yes = pick(S.filter(x => x[2] && !x[1] || x[2])), nos = S.filter(x => !x[2]).map(x => x[0]); return choice('点対称な 図形は どれ?', yes[0], nos.sort(() => Math.random() - 0.5), [yes[0] + 'は 180° 回すと 重なる', '正三角形・二等辺三角形・正五角形は 点対称では ない (線対称だけ)']); }
    const yes = pick(S.filter(x => x[1])), nos = S.filter(x => !x[1]).map(x => x[0]); if (nos.length < 3) return { q: '平行四辺形の 対称の 軸は 何本?', type: 'num', a: 0, steps: ['平行四辺形は 線対称では ない (点対称だけ)'] };
    return choice('線対称な 図形は どれ?', yes[0], nos, [yes[0] + 'は 折って 重なる 軸が ある', '平行四辺形は 点対称だが 線対称では ない']);
  });

  // ---- 6年 (つづき) ----
  add('e6', 'e6i', '🔤', '文字と 式', ['わからない 数を x や a で 表す: 1こ x円の あめ 5こ → x × 5 (円)', 'x に 数を あてはめると 式の 値が 決まる', 'x + 15 = 40 の x は、40 − 15 で 求める (逆算)'], () => {
    const k = pick(['val', 'solve', 'solve2', 'mean']);
    if (k === 'val') { const a = R(2, 9), b = R(5, 40), x = R(2, 15); return { q: 'x = ' + x + ' の とき、x × ' + a + ' + ' + b + ' の 値は?', type: 'num', a: x * a + b, steps: [x + ' × ' + a + ' = ' + x * a, x * a + ' + ' + b + ' = ' + (x * a + b)] }; }
    if (k === 'solve') { const x = R(5, 60), b = R(5, 40), op = pick(['+', '−', '×']); if (op === '−' && x <= b) return null; const c = op === '+' ? x + b : op === '−' ? x - b : x * (b % 9 + 2);
      return op === '×' ? { q: 'x × ' + (b % 9 + 2) + ' = ' + c + ' の x は?', type: 'num', a: x, steps: ['x = ' + c + ' ÷ ' + (b % 9 + 2) + ' = ' + x] } : { q: 'x ' + op + ' ' + b + ' = ' + c + ' の x は?', type: 'num', a: x, steps: ['x = ' + c + (op === '+' ? ' − ' : ' + ') + b + ' = ' + x] }; }
    if (k === 'solve2') { const x = R(20, 200), n = R(3, 8), p = R(50, 300); return { q: '1こ x円の ケーキを ' + n + 'こ と ' + p + '円の ジュースを 買ったら、代金は ' + (x * n + p) + '円だった。x は?', type: 'num', a: x, steps: ['式: x × ' + n + ' + ' + p + ' = ' + (x * n + p), 'x × ' + n + ' = ' + (x * n + p) + ' − ' + p + ' = ' + x * n, 'x = ' + x * n + ' ÷ ' + n + ' = ' + x] }; }
    const a = R(3, 9); return choice('「x × ' + a + '」で 表される ものは どれ?', '1辺 x cm の ' + ['', '', '', '正三角形', '正方形', '正五角形', '正六角形', '正七角形', '正八角形', '正九角形'][a] + 'の まわりの 長さ', ['x cm の テープを ' + a + '人で 分けた 1人分', 'x 円 持っていて ' + a + '円 使った 残り', 'x 才の 人の ' + a + '年後の 年れい'], [a + '本の 辺が すべて x cm', '→ x × ' + a]);
  });
  add('e6', 'e6j', '📋', 'データの 調べ方', ['ドットプロット: 1つの データを 1つの ● で 表す', '度数分布表: 区間 (階級) ごとに 人数を 数える', '代表値: 平均値・中央値 (まん中)・最頻値 (いちばん 多い)'], () => {
    const n = pick([9, 10, 11]), xs = Array.from({ length: n }, () => R(2, 10)).sort((a, b) => a - b), k = pick(['mean', 'med', 'mode', 'range', 'class']);
    const med = n % 2 ? xs[(n - 1) / 2] : (xs[n / 2 - 1] + xs[n / 2]) / 2, cnt = {}; xs.forEach(v => cnt[v] = (cnt[v] || 0) + 1); const mx = Math.max(...Object.values(cnt)), modes = Object.keys(cnt).filter(v => cnt[v] === mx);
    const q0 = n + '人の 小テストの 点数 (小さい 順): ' + xs.join(', ');
    if (k === 'mean') { const s = xs.reduce((a, b) => a + b, 0); if (s * 10 % n) return null; return { q: q0 + '\n平均値は?', type: 'num', a: r3(s / n), steps: ['合計 ' + s + ' ÷ ' + n + ' = ' + r3(s / n)] }; }
    if (k === 'med') return { q: q0 + '\n中央値は?', type: 'num', a: med, steps: [n % 2 ? 'まん中は ' + ((n + 1) / 2) + '番目 → ' + med : 'まん中 2つ (' + n / 2 + '番目と ' + (n / 2 + 1) + '番目) の 平均 → ' + med] };
    if (k === 'mode') { if (modes.length > 1) return null; return { q: q0 + '\n最頻値は?', type: 'num', a: +modes[0], steps: [modes[0] + '点が ' + mx + '人で いちばん 多い'] }; }
    if (k === 'range') return { q: q0 + '\n範囲 (最大値 − 最小値) は?', type: 'num', a: xs[n - 1] - xs[0], steps: [xs[n - 1] + ' − ' + xs[0] + ' = ' + (xs[n - 1] - xs[0])] };
    const c = xs.filter(v => v >= 6 && v < 8).length; return { q: q0 + '\n6点 以上 8点 未満の 人は 何人?', type: 'num', a: c, steps: ['6 と 7 の 人を 数える (8 は ふくまない)', '→ ' + c + '人'] };
  });
  add('e6', 'e6k', '🍫', '分数の 文章題', ['「全体の 2/5」= 全体 × 2/5', '「残りの 1/3」は 残りを もとに する', '時間の 分数: 20分 = 20/60 時間 = 1/3 時間'], () => {
    const k = pick(['part', 'rest', 'base', 'time', 'area']);
    if (k === 'part') { const d = pick([3, 4, 5, 6, 8]), n = R(1, d - 1), tot = d * R(3, 15); return { q: tot + 'ページの 本の ' + n + '/' + d + ' を 読んだ。何ページ 読んだ?', type: 'num', a: tot * n / d, steps: [tot + ' × ' + n + '/' + d + ' = ' + tot * n / d] }; }
    if (k === 'rest') { const tot = pick([60, 120, 240, 360]), a = pick([2, 3, 4]), b = pick([2, 3, 5]); const r1 = tot - tot / a, r2 = r1 - r1 / b; if (!Number.isInteger(r2)) return null; return { q: tot + '円 持っていた。はじめに 持っていた お金の 1/' + a + ' を 使い、次に 残りの 1/' + b + ' を 使った。何円 残っている?', type: 'num', a: r2, steps: ['はじめ: ' + tot + ' × 1/' + a + ' = ' + tot / a + '円 使う → 残り ' + r1 + '円', '次: ' + r1 + ' × 1/' + b + ' = ' + r1 / b + '円 使う → 残り ' + r2 + '円'] }; }
    if (k === 'base') { const d = pick([3, 4, 5]), n = R(1, d - 1), tot = d * R(4, 20); return { q: 'クラスの ' + n + '/' + d + ' に あたる ' + tot * n / d + '人が 自転車通学。クラスは 何人?', type: 'num', a: tot, steps: ['クラス × ' + n + '/' + d + ' = ' + tot * n / d, 'クラス = ' + tot * n / d + ' ÷ ' + n + '/' + d + ' = ' + tot] }; }
    if (k === 'time') { const m = pick([10, 15, 20, 30, 40, 45]), v = pick([3, 4, 6, 12]) * 60 / gcd(m, 60) * gcd(m, 60) / 60; const dist = v * m / 60; if (!Number.isInteger(dist * 10)) return null; return { q: '時速 ' + v + 'km で ' + m + '分 歩くと 何 km 進む?', type: 'num', a: r3(dist), steps: [m + '分 = ' + m + '/60 時間 = ' + fs(fr(m, 60)) + ' 時間', v + ' × ' + fs(fr(m, 60)) + ' = ' + r3(dist) + 'km'] }; }
    const a = R(2, 5), b = R(2, 5), c = pick([3, 4, 5]); return { q: 'たて ' + a + '/' + c + ' m、よこ ' + b + ' m の 長方形の 面積は 何 m²? (分数で)', type: 'num', a: fr(a * b, c), steps: [a + '/' + c + ' × ' + b + ' = ' + fs(fr(a * b, c))] };
  });
  add('e6', 'e6l', '🏃', '速さの 応用', ['平均の 速さ = 全体の 道のり ÷ 全体の 時間 (速さの 平均では ない!)', '単位を そろえる: 分速 → 時速 は × 60', '時間を 分数で: 1時間20分 = 1と1/3 時間'], () => {
    const k = pick(['avg', 'conv', 'meet', 'time2']);
    if (k === 'avg') { const d = pick([12, 24, 60, 120]), v1 = pick([3, 4, 6, 12]), v2 = pick([2, 3, 4, 6]); if (v1 === v2 || d % v1 || d % v2 || (2 * d) % (d / v1 + d / v2)) return null; return { q: 'A から B まで ' + d + 'km を 行きは 時速 ' + v1 + 'km、帰りは 時速 ' + v2 + 'km で 往復した。往復の 平均の 速さは 時速 何 km?', type: 'num', a: 2 * d / (d / v1 + d / v2), steps: ['行き ' + d + ' ÷ ' + v1 + ' = ' + d / v1 + '時間、帰り ' + d + ' ÷ ' + v2 + ' = ' + d / v2 + '時間', '全体: ' + 2 * d + 'km ÷ ' + (d / v1 + d / v2) + '時間 = 時速 ' + 2 * d / (d / v1 + d / v2) + 'km', '※ (' + v1 + ' + ' + v2 + ') ÷ 2 = ' + (v1 + v2) / 2 + ' では ない!'] }; }
    if (k === 'conv') { const v = pick([50, 60, 75, 80, 90, 120]); return { q: '分速 ' + v + 'm は 時速 何 km?', type: 'num', a: r3(v * 60 / 1000), steps: ['1時間 = 60分 → 時速 ' + v * 60 + 'm', '= 時速 ' + r3(v * 60 / 1000) + 'km'] }; }
    if (k === 'meet') { const a = R(50, 80), b = R(50, 80), t = R(5, 15); return { q: '池の まわりの 道 (1周 ' + (a + b) * t + 'm) を、A は 分速 ' + a + 'm、B は 分速 ' + b + 'm で 同じ 場所から 反対向きに 歩く。何分後に 出会う?', type: 'num', a: t, steps: ['2人で 1分に ' + a + ' + ' + b + ' = ' + (a + b) + 'm ずつ 近づく', (a + b) * t + ' ÷ ' + (a + b) + ' = ' + t + '分後'] }; }
    const v = pick([4, 6, 12, 15]), m = pick([20, 30, 40, 50]), d = v * (60 + m) / 60; if (!Number.isInteger(d * 10)) return null; return { q: '時速 ' + v + 'km で 1時間' + m + '分 進むと 何 km?', type: 'num', a: r3(d), steps: ['1時間' + m + '分 = 1と' + fs(fr(m, 60)) + ' 時間 = ' + fs(fr(60 + m, 60)) + ' 時間', v + ' × ' + fs(fr(60 + m, 60)) + ' = ' + r3(d) + 'km'] };
  });

  // ======================= 発展 (中学受験) =======================
  add('ej', 'ej1', '🐢', 'つるかめ算', ['「全部 つる (または かめ) だったら?」と 仮定する', 'ちがいの 数 ÷ 1ぴき あたりの ちがい = 入れかえる 数', '面積図でも 解ける'], () => {
    const k = pick(['crane', 'coin', 'test']);
    if (k === 'crane') { const n = R(10, 30), t = R(2, n - 2), legs = 2 * (n - t) + 4 * t; return { q: 'つると かめが 合わせて ' + n + 'ひき、足の 数は 合わせて ' + legs + '本。かめは 何びき?', type: 'num', a: t, steps: ['全部 つるだと 足は 2 × ' + n + ' = ' + 2 * n + '本', '実際との 差: ' + legs + ' − ' + 2 * n + ' = ' + (legs - 2 * n) + '本', 'つる 1羽を かめに 変えると 足は 2本 ふえる → ' + (legs - 2 * n) + ' ÷ 2 = ' + t + 'ひき'] }; }
    if (k === 'coin') { const n = R(10, 25), b = R(2, n - 2), tot = 50 * b + 10 * (n - b); return { q: '10円玉と 50円玉が 合わせて ' + n + 'まい、合計 ' + tot + '円。50円玉は 何まい?', type: 'num', a: b, steps: ['全部 10円玉だと ' + 10 * n + '円', '差: ' + tot + ' − ' + 10 * n + ' = ' + (tot - 10 * n) + '円', '1まい 50円玉に 変えると 40円 ふえる → ' + (tot - 10 * n) + ' ÷ 40 = ' + b + 'まい'] }; }
    const n = 20, ok = R(8, 19), sc = 5 * ok - 2 * (n - ok); return { q: '20問の テスト。正解 1問 5点、まちがい 1問 2点 減点 (全問 答える)。得点は ' + sc + '点。正解は 何問?', type: 'num', a: ok, steps: ['全問 正解なら 100点', '差: 100 − ' + sc + ' = ' + (100 - sc) + '点', '1問 まちがえると 5 + 2 = 7点 減る → ' + (100 - sc) + ' ÷ 7 = ' + (n - ok) + '問 まちがい', '正解 = 20 − ' + (n - ok) + ' = ' + ok + '問'] };
  });
  add('ej', 'ej2', '⚖', '和差算・分配算', ['和差算: 大 = (和 + 差) ÷ 2、小 = (和 − 差) ÷ 2', '分配算: 「Aは Bの 3倍より 5 多い」→ 線分図で そろえる', '線分図を かいて、同じ 長さに そろえる'], () => {
    const k = pick(['sd', 'sd3', 'bunpai']);
    if (k === 'sd') { const b = R(10, 80), d = R(4, 30), a = b + d; return { q: '2つの 数の 和が ' + (a + b) + '、差が ' + d + '。大きい ほうの 数は?', type: 'num', a: a, steps: ['大きい ほう = (和 + 差) ÷ 2', '(' + (a + b) + ' + ' + d + ') ÷ 2 = ' + a] }; }
    if (k === 'sd3') { const c = R(100, 300), b = c + R(50, 150), a = b + R(50, 150); return { q: 'A・B・C の 3人の 所持金の 合計は ' + (a + b + c) + '円。A は B より ' + (a - b) + '円 多く、B は C より ' + (b - c) + '円 多い。C は 何円?', type: 'num', a: c, steps: ['C に そろえる: A = C + ' + (a - c) + '、B = C + ' + (b - c), 'C × 3 + ' + (a - c) + ' + ' + (b - c) + ' = ' + (a + b + c), 'C = (' + (a + b + c) + ' − ' + (a - b + 2 * (b - c)) + ') ÷ 3 = ' + c] }; }
    const b = R(20, 120), m = R(2, 4), e = R(5, 40), a = b * m + e; return { q: 'A と B の 合計は ' + (a + b) + '円。A は B の ' + m + '倍より ' + e + '円 多い。B は 何円?', type: 'num', a: b, steps: ['線分図: A = B × ' + m + ' + ' + e, 'B × ' + (m + 1) + ' + ' + e + ' = ' + (a + b), 'B = (' + (a + b) + ' − ' + e + ') ÷ ' + (m + 1) + ' = ' + b] };
  });
  add('ej', 'ej3', '🌳', '植木算', ['両はしに 植える 直線: 木の 本数 = 間の 数 + 1', '両はしに 植えない: 本数 = 間の 数 − 1', '池の まわり (円): 本数 = 間の 数'], () => {
    const k = pick(['both', 'none', 'circle', 'cut', 'tape']), g = pick([2, 3, 4, 5, 6, 8, 10]), n = R(6, 30), L = g * n;
    if (k === 'both') return { q: '長さ ' + L + 'm の 道の 片側に、はしから はしまで ' + g + 'm おきに 木を 植える (両はしにも 植える)。木は 何本?', type: 'num', a: n + 1, steps: ['間の 数: ' + L + ' ÷ ' + g + ' = ' + n, '両はしに 植える → 間の 数 + 1 = ' + (n + 1) + '本'] };
    if (k === 'none') return { q: '長さ ' + L + 'm の 道に ' + g + 'm おきに 旗を 立てる。両はしには 立てない。旗は 何本?', type: 'num', a: n - 1, steps: ['間の 数: ' + L + ' ÷ ' + g + ' = ' + n, '両はしに 立てない → ' + n + ' − 1 = ' + (n - 1) + '本'] };
    if (k === 'circle') return { q: '1周 ' + L + 'm の 池の まわりに ' + g + 'm おきに くいを 打つ。くいは 何本?', type: 'num', a: n, steps: ['まわり (輪) では 本数 = 間の 数', L + ' ÷ ' + g + ' = ' + n + '本'] };
    if (k === 'cut') { const p = R(4, 12), t = R(2, 6); return { q: '丸太を ' + p + 'こ に 切り分ける。1回 切るのに ' + t + '分 かかる。全部で 何分 かかる? (休みなし)', type: 'num', a: (p - 1) * t, steps: [p + 'こに 分けるには ' + (p - 1) + '回 切る', (p - 1) + ' × ' + t + ' = ' + (p - 1) * t + '分'] }; }
    const m = R(4, 10), len = R(10, 25), over = R(2, 5); return { q: '長さ ' + len + 'cm の テープ ' + m + 'まいを、のりしろ ' + over + 'cm ずつ 重ねて つなぐ。全体の 長さは 何 cm?', type: 'num', a: len * m - over * (m - 1), steps: ['重なりは ' + (m - 1) + 'か所', len + ' × ' + m + ' − ' + over + ' × ' + (m - 1) + ' = ' + (len * m - over * (m - 1)) + 'cm'] };
  });
  add('ej', 'ej4', '🏃‍♂️', '旅人算', ['出会い: 2人の きょり ÷ (速さの 和)', '追いつき: 2人の きょり ÷ (速さの 差)', '池の まわり: 反対向き = 和、同じ向き = 差'], () => {
    const k = pick(['meet', 'catch', 'catch2', 'pond']);
    if (k === 'meet') { const a = R(50, 90), b = R(40, 80), t = R(6, 20); return { q: (a + b) * t + 'm はなれた 2地点から、兄は 分速 ' + a + 'm、弟は 分速 ' + b + 'm で 向かい合って 同時に 出発した。何分後に 出会う?', type: 'num', a: t, steps: ['1分に ' + a + ' + ' + b + ' = ' + (a + b) + 'm ずつ 近づく', (a + b) * t + ' ÷ ' + (a + b) + ' = ' + t + '分後'] }; }
    if (k === 'catch') { const b = R(50, 70), a = b + R(20, 60), t = R(5, 15); const gap = (a - b) * t; return { q: '弟が 家を 出て ' + gap + 'm 先を 歩いている。兄が 分速 ' + a + 'm で 追いかける (弟は 分速 ' + b + 'm)。兄は 何分で 追いつく?', type: 'num', a: t, steps: ['1分に ' + a + ' − ' + b + ' = ' + (a - b) + 'm ずつ ちぢまる', gap + ' ÷ ' + (a - b) + ' = ' + t + '分'] }; }
    if (k === 'catch2') { const b = pick([60, 70, 80]), a = pick([180, 200, 240]), t0 = R(5, 12), t = b * t0 / (a - b); if (!Number.isInteger(t)) return null; return { q: '弟が 分速 ' + b + 'm で 家を 出た ' + t0 + '分後に、兄が 自転車 (分速 ' + a + 'm) で 追いかけた。兄は 出発して 何分後に 追いつく?', type: 'num', a: t, steps: ['兄が 出発する とき、弟は ' + b + ' × ' + t0 + ' = ' + b * t0 + 'm 先', '1分に ' + (a - b) + 'm ちぢまる → ' + b * t0 + ' ÷ ' + (a - b) + ' = ' + t + '分後'] }; }
    const a = R(70, 100), b = R(40, 65), L = (a - b) * R(10, 30); return { q: '1周 ' + L + 'm の 池を、A (分速 ' + a + 'm) と B (分速 ' + b + 'm) が 同じ 場所から 同じ 向きに 出発。A が B に はじめて 追いつく (1周 差を つける) のは 何分後?', type: 'num', a: L / (a - b), steps: ['同じ 向き → 速さの 差 ' + (a - b) + 'm/分', '1周の 差 ' + L + 'm ÷ ' + (a - b) + ' = ' + L / (a - b) + '分後'] };
  });
  add('ej', 'ej5', '🚃', '通過算', ['電車が 鉄橋を わたりきる: 進む きょり = 鉄橋 + 電車の 長さ', '電車が 人 (電柱) の 前を 通る: 進む きょり = 電車の 長さ', '秒速に そろえて 計算する'], () => {
    const k = pick(['pole', 'bridge', 'bridge2', 'tunnel']), v = pick([15, 20, 25, 30]), Lt = v * pick([4, 5, 6, 8]);
    if (k === 'pole') return { q: '長さ ' + Lt + 'm の 電車が 秒速 ' + v + 'm で 走っている。電柱の 前を 通りすぎるのに 何秒 かかる?', type: 'num', a: Lt / v, steps: ['電柱の 前を 通る → 進む きょり = 電車の 長さ ' + Lt + 'm', Lt + ' ÷ ' + v + ' = ' + Lt / v + '秒'] };
    if (k === 'bridge') { const B = v * R(10, 40) - Lt; if (B <= 0) return null; return { q: '長さ ' + Lt + 'm の 電車が、長さ ' + B + 'm の 鉄橋を 秒速 ' + v + 'm で わたる。わたり始めてから わたり終わるまで 何秒?', type: 'num', a: (B + Lt) / v, steps: ['進む きょり = 鉄橋 + 電車 = ' + B + ' + ' + Lt + ' = ' + (B + Lt) + 'm', (B + Lt) + ' ÷ ' + v + ' = ' + (B + Lt) / v + '秒'] }; }
    if (k === 'bridge2') { const t = R(15, 40), B = v * t - Lt; if (B <= 0) return null; return { q: '秒速 ' + v + 'm の 電車が、長さ ' + B + 'm の 鉄橋を わたり始めてから わたり終わるまでに ' + t + '秒 かかった。電車の 長さは 何 m?', type: 'num', a: Lt, steps: ['進んだ きょり: ' + v + ' × ' + t + ' = ' + v * t + 'm', 'これは 鉄橋 + 電車 → 電車 = ' + v * t + ' − ' + B + ' = ' + Lt + 'm'] }; }
    const T = v * R(20, 60) + Lt; return { q: '長さ ' + Lt + 'm の 電車が 秒速 ' + v + 'm で、長さ ' + T + 'm の トンネルに 入った。電車が 完全に かくれている 時間は 何秒?', type: 'num', a: (T - Lt) / v, steps: ['完全に かくれる → 進む きょり = トンネル − 電車 = ' + (T - Lt) + 'm', (T - Lt) + ' ÷ ' + v + ' = ' + (T - Lt) / v + '秒'] };
  });
  add('ej', 'ej6', '🚤', '流水算', ['下りの 速さ = 船の 速さ + 川の 流れ', '上りの 速さ = 船の 速さ − 川の 流れ', '船の 速さ = (下り + 上り) ÷ 2、流れ = (下り − 上り) ÷ 2'], () => {
    const k = pick(['down', 'up', 'boat', 'river']), b = R(6, 15), r = R(1, 4), d = lcm(b + r, b - r) * R(1, 2);
    if (k === 'down') return { q: '静水での 速さが 時速 ' + b + 'km の 船が、流れの 速さ 時速 ' + r + 'km の 川を ' + d + 'km 下る。何時間 かかる?', type: 'num', a: d / (b + r), steps: ['下り = ' + b + ' + ' + r + ' = 時速 ' + (b + r) + 'km', d + ' ÷ ' + (b + r) + ' = ' + d / (b + r) + '時間'] };
    if (k === 'up') return { q: '静水での 速さが 時速 ' + b + 'km の 船が、流れの 速さ 時速 ' + r + 'km の 川を ' + d + 'km 上る。何時間 かかる?', type: 'num', a: d / (b - r), steps: ['上り = ' + b + ' − ' + r + ' = 時速 ' + (b - r) + 'km', d + ' ÷ ' + (b - r) + ' = ' + d / (b - r) + '時間'] };
    if (k === 'boat') return { q: 'ある 船が 川を 下ると 時速 ' + (b + r) + 'km、上ると 時速 ' + (b - r) + 'km。静水での 船の 速さは 時速 何 km?', type: 'num', a: b, steps: ['船の 速さ = (下り + 上り) ÷ 2', '(' + (b + r) + ' + ' + (b - r) + ') ÷ 2 = ' + b] };
    return { q: 'ある 船が 川を 下ると 時速 ' + (b + r) + 'km、上ると 時速 ' + (b - r) + 'km。川の 流れの 速さは 時速 何 km?', type: 'num', a: r, steps: ['流れ = (下り − 上り) ÷ 2', '(' + (b + r) + ' − ' + (b - r) + ') ÷ 2 = ' + r] };
  });
  add('ej', 'ej7', '🛠', '仕事算', ['全体の 仕事量を 最小公倍数で 決める (または 1 と する)', '1日 あたりの 仕事量 = 全体 ÷ 日数', 'いっしょに やる = 1日 あたりの 量を 足す'], () => {
    const k = pick(['two', 'two', 'pipe', 'after']), a = pick([6, 10, 12, 15, 20]), b = pick([4, 5, 6, 10, 12, 30]); if (a === b) return null; const W = lcm(a, b), t = W / (W / a + W / b);
    if (k === 'two') { if (!Number.isInteger(t * 10)) return null; return { q: 'ある 仕事を A は ' + a + '日、B は ' + b + '日で 終える。2人で いっしょに すると 何日で 終わる?', type: 'num', a: r3(t), steps: ['全体を ' + a + ' と ' + b + ' の 最小公倍数 ' + W + ' と する', 'A は 1日 ' + W / a + '、B は 1日 ' + W / b + ' → 2人で ' + (W / a + W / b), W + ' ÷ ' + (W / a + W / b) + ' = ' + r3(t) + '日'] }; }
    if (k === 'pipe') { if (!Number.isInteger(t * 10)) return null; return { q: '水そうを いっぱいに するのに、A 管だけだと ' + a + '分、B 管だけだと ' + b + '分 かかる。両方 使うと 何分?', type: 'num', a: r3(t), steps: ['水そうを ' + W + ' と する → A 1分 ' + W / a + '、B 1分 ' + W / b, W + ' ÷ ' + (W / a + W / b) + ' = ' + r3(t) + '分'] }; }
    const x = R(1, Math.min(a, b) - 1), rest = W - (W / a + W / b) * x; if (rest <= 0 || rest % (W / b)) return null; return { q: 'ある 仕事を A は ' + a + '日、B は ' + b + '日で 終える。はじめ 2人で ' + x + '日 した あと、残りを B 1人で した。B 1人で した のは 何日?', type: 'num', a: rest / (W / b), steps: ['全体 ' + W + '、A 1日 ' + W / a + '、B 1日 ' + W / b, '2人で ' + x + '日: ' + (W / a + W / b) * x + ' → 残り ' + rest, rest + ' ÷ ' + W / b + ' = ' + rest / (W / b) + '日'] };
  });
  add('ej', 'ej8', '🧂', '食塩水 (濃度)', ['食塩の 重さ = 食塩水 × 濃度', '濃度 = 食塩 ÷ 食塩水 × 100 (%)', '水を 加えても 食塩の 重さは 変わらない'], () => {
    const k = pick(['salt', 'conc', 'water', 'mix', 'evap']);
    if (k === 'salt') { const w = R(2, 10) * 50, p = pick([4, 5, 6, 8, 10, 12, 15]); return { q: p + '% の 食塩水 ' + w + 'g に ふくまれる 食塩は 何 g?', type: 'num', a: w * p / 100, steps: [w + ' × ' + p / 100 + ' = ' + w * p / 100 + 'g'] }; }
    if (k === 'conc') { const salt = R(2, 9) * 5, water = R(4, 19) * 20 - salt; const tot = salt + water, p = salt * 100 / tot; if (!Number.isInteger(p * 10)) return null; return { q: '水 ' + water + 'g に 食塩 ' + salt + 'g を とかした。濃度は 何 %?', type: 'num', a: r3(p), steps: ['食塩水 = ' + water + ' + ' + salt + ' = ' + tot + 'g', salt + ' ÷ ' + tot + ' × 100 = ' + r3(p) + '%'] }; }
    if (k === 'water') { const w = R(2, 6) * 100, p = pick([10, 12, 15, 20]), q = pick([5, 6, 8, 10].filter(x => x < p)), salt = w * p / 100, nw = salt * 100 / q; if (!Number.isInteger(nw)) return null; return { q: p + '% の 食塩水 ' + w + 'g に 水を 加えて ' + q + '% に したい。水を 何 g 加える?', type: 'num', a: nw - w, steps: ['食塩: ' + w + ' × ' + p / 100 + ' = ' + salt + 'g (変わらない)', q + '% に なる 食塩水: ' + salt + ' ÷ ' + q / 100 + ' = ' + nw + 'g', '加える 水: ' + nw + ' − ' + w + ' = ' + (nw - w) + 'g'] }; }
    if (k === 'mix') { const a = R(1, 4) * 100, b = R(1, 4) * 100, p = pick([4, 6, 8, 10]), q = pick([10, 12, 15, 20]), salt = a * p / 100 + b * q / 100, c = salt * 100 / (a + b); if (!Number.isInteger(c * 10)) return null; return { q: p + '% の 食塩水 ' + a + 'g と ' + q + '% の 食塩水 ' + b + 'g を 混ぜた。何 % に なる?', type: 'num', a: r3(c), steps: ['食塩: ' + a * p / 100 + ' + ' + b * q / 100 + ' = ' + salt + 'g', '食塩水: ' + (a + b) + 'g', salt + ' ÷ ' + (a + b) + ' × 100 = ' + r3(c) + '%'] }; }
    const w = R(3, 8) * 100, p = pick([4, 5, 6, 8]), salt = w * p / 100, q = pick([10, 12, 16, 20].filter(x => x > p)), nw = salt * 100 / q; if (!Number.isInteger(nw)) return null; return { q: p + '% の 食塩水 ' + w + 'g から 水を 蒸発させて ' + q + '% に したい。何 g 蒸発させる?', type: 'num', a: w - nw, steps: ['食塩 ' + salt + 'g (変わらない)', q + '% の 食塩水: ' + salt + ' ÷ ' + q / 100 + ' = ' + nw + 'g', w + ' − ' + nw + ' = ' + (w - nw) + 'g'] };
  });
  add('ej', 'ej9', '💴', '損益算', ['定価 = 原価 × (1 + 利益の 割合)', '売り値 = 定価 × (1 − 値引きの 割合)', '利益 = 売り値 − 原価 (マイナスなら 損)'], () => {
    const k = pick(['teika', 'urine', 'rieki', 'genka']), c = R(4, 30) * 100, up = pick([20, 25, 30, 40, 50]), off = pick([10, 20, 25]);
    if (k === 'teika') return { q: '原価 ' + c + '円の 品物に ' + up + '% の 利益を 見こんで 定価を つけた。定価は 何円?', type: 'num', a: c * (100 + up) / 100, steps: [c + ' × ' + (100 + up) / 100 + ' = ' + c * (100 + up) / 100 + '円'] };
    const t = c * (100 + up) / 100, s = t * (100 - off) / 100;
    if (k === 'urine') return { q: '定価 ' + t + '円の 品物を ' + off + '% 引きで 売った。売り値は 何円?', type: 'num', a: s, steps: [t + ' × ' + (100 - off) / 100 + ' = ' + s + '円'] };
    if (k === 'rieki') { if (!Number.isInteger(s)) return null; return { q: '原価 ' + c + '円の 品物に ' + up + '% の 利益を 見こんで 定価を つけたが、売れないので 定価の ' + off + '% 引きで 売った。利益は 何円? (損なら マイナス)', type: 'num', a: s - c, steps: ['定価: ' + c + ' × ' + (100 + up) / 100 + ' = ' + t, '売り値: ' + t + ' × ' + (100 - off) / 100 + ' = ' + s, '利益: ' + s + ' − ' + c + ' = ' + (s - c) + '円'] }; }
    return { q: '原価に ' + up + '% の 利益を 見こんで 定価 ' + t + '円 を つけた。原価は 何円?', type: 'num', a: c, steps: ['原価 × ' + (100 + up) / 100 + ' = ' + t, '原価 = ' + t + ' ÷ ' + (100 + up) / 100 + ' = ' + c + '円'] };
  });
  add('ej', 'ej10', '👨‍👦', '年齢算・倍数算', ['年齢の 差は 何年たっても 変わらない', '「何年後に 3倍」→ 差を 線分図で 考える (差 = 子の 2つ分)', '倍数算: やりとり しても 合計が 変わらない ことを 使う'], () => {
    const k = pick(['after', 'before', 'sum', 'give']);
    if (k === 'after') { const c = R(4, 12), m = pick([2, 3, 4]), x = R(1, 15), p = m * (c + x) - x; if (p - c < 20) return null; return { q: '今、父は ' + p + '才、子は ' + c + '才。父の 年れいが 子の ' + m + '倍に なるのは 何年後?', type: 'num', a: x, steps: ['年の 差 ' + (p - c) + '才 は 変わらない', m + '倍の とき、差は 子の ' + (m - 1) + 'つ分 → 子 = ' + (p - c) + ' ÷ ' + (m - 1) + ' = ' + (p - c) / (m - 1) + '才', (p - c) / (m - 1) + ' − ' + c + ' = ' + x + '年後'] }; }
    if (k === 'before') { const c = R(12, 20), m = pick([3, 4, 5]), x = R(1, 8), p = m * (c - x) + x; if (c - x <= 0) return null; return { q: '今、母は ' + p + '才、子は ' + c + '才。母の 年れいが 子の ' + m + '倍だったのは 何年前?', type: 'num', a: x, steps: ['差 ' + (p - c) + '才 = 子の ' + (m - 1) + 'つ分', 'その とき 子は ' + (p - c) / (m - 1) + '才', c + ' − ' + (p - c) / (m - 1) + ' = ' + x + '年前'] }; }
    if (k === 'sum') { const a = R(30, 45), b = R(28, 42), c1 = R(3, 10), c2 = c1 + R(1, 4), m = pick([2, 3]); const x = (a + b - m * (c1 + c2)) / (2 * m - 2); if (!Number.isInteger(x) || x <= 0) return null; return { q: '父 ' + a + '才、母 ' + b + '才、兄 ' + c2 + '才、弟 ' + c1 + '才。両親の 年れいの 和が 兄弟の 和の ' + m + '倍に なるのは 何年後?', type: 'num', a: x, steps: ['x 年後: 両親の 和 ' + (a + b) + ' + 2x、兄弟の 和 ' + (c1 + c2) + ' + 2x', (a + b) + ' + 2x = ' + m + ' × (' + (c1 + c2) + ' + 2x)', 'x = ' + x] }; }
    const ra = pick([3, 5]), rb = pick([2, 1]), g = R(1, 4) * 10; return { q: 'A と B の 所持金の 比は ' + ra + ' : ' + rb + '。A が B に ' + g * (ra - rb) + '円 わたすと、2人の 所持金は 同じに なる。はじめ A は 何円?', type: 'num', a: 2 * g * ra, steps: ['わたす 前後で 合計は 変わらない', '差 ' + (ra - rb) + ' つ分 の 半分 = わたした お金 → 1つ分 = ' + g * (ra - rb) + ' × 2 ÷ ' + (ra - rb) + ' = ' + g * 2, 'A = ' + g * 2 + ' × ' + ra + ' = ' + g * 2 * ra + '円'] };
  });
  add('ej', 'ej11', '🔢', '規則性 (数列・周期)', ['等差数列: □番目 = 最初 + 差 × (□ − 1)', '周期: 何こで 1セット かを 見つけ、わり算の あまりで 考える', '曜日の 問題は 7日 周期'], () => {
    const k = pick(['ap', 'apsum', 'cycle', 'week', 'nth']);
    if (k === 'ap') { const a = R(1, 9), d = R(2, 9), n = R(10, 50); return { q: a + ', ' + (a + d) + ', ' + (a + 2 * d) + ', ' + (a + 3 * d) + ', … と 並ぶ。' + n + '番目の 数は?', type: 'num', a: a + d * (n - 1), steps: ['差は ' + d, a + ' + ' + d + ' × (' + n + ' − 1) = ' + (a + d * (n - 1))] }; }
    if (k === 'apsum') { const n = R(10, 50); return { q: '1 + 3 + 5 + 7 + … と、奇数を 小さい 順に ' + n + 'こ 足すと?', type: 'num', a: n * n, steps: ['奇数を n こ 足すと n × n に なる (正方形の 形)', n + ' × ' + n + ' = ' + n * n] }; }
    if (k === 'cycle') { const pat = pick(['○●△', '赤青黄緑', 'ABCDE']), p = pat.length, n = R(20, 200), c = pat[(n - 1) % p]; return choice(pat.split('').join(' ') + ' ' + pat.split('').join(' ') + ' … と くり返す。' + n + '番目は?', c, pat.split('').filter(x => x !== c), [p + 'こで 1セット', n + ' ÷ ' + p + ' = ' + Math.floor(n / p) + ' あまり ' + n % p + (n % p ? ' → セットの ' + n % p + '番目' : ' → セットの 最後'), '→ ' + c]); }
    if (k === 'week') { const W = ['日', '月', '火', '水', '木', '金', '土'], s = R(0, 6), d = R(10, 100); return choice('今日は ' + W[s] + '曜日。' + d + '日後は 何曜日?', W[(s + d) % 7] + '曜日', W.filter((_, i) => i !== (s + d) % 7).map(x => x + '曜日').sort(() => Math.random() - 0.5), ['7日ごとに 同じ 曜日', d + ' ÷ 7 = ' + Math.floor(d / 7) + ' あまり ' + d % 7, W[s] + ' から ' + d % 7 + '日 進む → ' + W[(s + d) % 7]]); }
    const a = R(3, 7), d = R(3, 8), v = a + d * R(15, 40); return { q: a + ', ' + (a + d) + ', ' + (a + 2 * d) + ', … と 並ぶ。' + v + ' は 何番目?', type: 'num', a: (v - a) / d + 1, steps: ['(' + v + ' − ' + a + ') ÷ ' + d + ' = ' + (v - a) / d, '+ 1 → ' + ((v - a) / d + 1) + '番目'] };
  });
  add('ej', 'ej12', '📏', '平均算・過不足算', ['平均算: 合計 = 平均 × 人数 で 考える', '過不足算: (余り + 不足) ÷ (1人分の 差) = 人数', '面積図で 考えると わかりやすい'], () => {
    const k = pick(['avg2', 'avgadd', 'kafusoku', 'kafusoku2']);
    if (k === 'avg2') { const nb = R(10, 20), ng = R(10, 20), ab = R(60, 80), ag = R(62, 85); const tot = nb * ab + ng * ag; if (tot % (nb + ng)) return null; return { q: '男子 ' + nb + '人の 平均点は ' + ab + '点、女子 ' + ng + '人の 平均点は ' + ag + '点。クラス全体の 平均点は?', type: 'num', a: tot / (nb + ng), steps: ['合計: ' + nb + ' × ' + ab + ' + ' + ng + ' × ' + ag + ' = ' + tot, tot + ' ÷ ' + (nb + ng) + ' = ' + tot / (nb + ng) + '点', '※ (' + ab + ' + ' + ag + ') ÷ 2 では ない'] }; }
    if (k === 'avgadd') { const n = R(4, 9), a = R(60, 80), up = R(1, 4), x = a + up * (n + 1); return { q: n + '回の テストの 平均は ' + a + '点。次の テストで 何点 とれば、平均が ' + up + '点 上がる?', type: 'num', a: x, steps: [(n + 1) + '回の 合計は ' + (a + up) + ' × ' + (n + 1) + ' = ' + (a + up) * (n + 1), 'これまで ' + a * n, (a + up) * (n + 1) + ' − ' + a * n + ' = ' + x + '点'] }; }
    if (k === 'kafusoku') { const n = R(6, 20), p = R(3, 6), r = R(2, Math.min(9, 2 * n - 1)), s = 2 * n - r; return { q: 'みかんを 子どもに 配る。1人 ' + p + 'こずつ だと ' + r + 'こ 余り、' + (p + 2) + 'こずつ だと ' + s + 'こ 足りない。子どもは 何人?', type: 'num', a: (r + s) / 2, steps: ['1人分の 差 2こ、全体の 差 ' + r + ' + ' + s + ' = ' + (r + s) + 'こ', (r + s) + ' ÷ 2 = ' + (r + s) / 2 + '人'] }; }
    const n = R(5, 15), p = R(3, 6), r = R(10, 30), q = p + R(1, 3), extra = q * n - (p * n + r); if (extra <= 0) return null; return { q: 'あめを 1人 ' + p + 'こずつ 配ると ' + r + 'こ 余る。1人 ' + q + 'こずつ 配ると ' + extra + 'こ 足りない。あめは 何こ?', type: 'num', a: p * n + r, steps: ['1人分の 差 ' + (q - p) + 'こ、全体の 差 ' + r + ' + ' + extra + ' = ' + (r + extra), '人数 = ' + (r + extra) + ' ÷ ' + (q - p) + ' = ' + n + '人', 'あめ = ' + p + ' × ' + n + ' + ' + r + ' = ' + (p * n + r) + 'こ'] };
  });

  const GROUPS = [{ id: 'e4', name: '小学 4年', color: '#c0702a' }, { id: 'e5', name: '小学 5年', color: '#3a8a6a' }, { id: 'e6', name: '小学 6年', color: '#5a6ab0' }, { id: 'ej', name: '発展 (中学受験 算数)', color: '#8a3a5a' }];
  function make(u) { let r = null; for (let i = 0; i < 60 && !r; i++) { try { r = u.gen(); } catch (e) { r = null; } } return r; }
  return { U: U, GROUPS: GROUPS, make: make, byId: id => U.find(u => u.id === id), _fs: fs, title: '小学 算数 ラダー (4〜6年)', icon: '🎒',
    desc: '小学4年 から 6年 まで (学校の 教科書と 同じ 順番) + 発展 (中学受験の 特殊算)', note: '問題の 数は 毎回 変わるよ。くわしい 解説で 図を 見ながら 学ぼう。', diags: [['e', '🩺 実力診断 (小学 20問)']], back: 'home' };
})();
