/* インド式 計算道場 — 20の ワザ
 * 各ワザ: rand(lv) → 問題の 数 / make(args) → { q: 問題, a: 答え, steps: [解き方 (HTML)] }
 *   lv 1 = ステップ1 (形に なれる) / lv 2 = ステップ2 (本気)
 *   ans: 'num' (数) | 'qr' (商と 余り) | 'ox' (○×)
 * course: kihon 基本 / oyo 応用 / tatsujin 達人 / jokyu 上級
 * why: なぜ そうなるか (式 · 図)。 area: 面積図 [上の ラベル2, 左の ラベル2, 4マス]
 */
const IM = (function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const dg = n => String(n).split('').map(Number);
  const s = (x, c) => '<span class="im-' + c + '">' + x + '</span>';
  const two = n => String(n).padStart(2, '0');
  // 右から くり上げて 数字の 列を 1つの 数に まとめる (各列の 値は 10 以上でも よい)
  function carryJoin(cols) {
    const out = []; let c = 0;
    for (let i = cols.length - 1; i >= 0; i--) { const v = cols[i] + c; out.unshift(i === 0 ? v : v % 10); c = Math.floor(v / 10); }
    return Number(out.join(''));
  }
  function carryNote(cols) {
    if (cols.slice(1).every(v => v < 10)) return '';
    return 'くり上げ: 10 以上の 列は 十の位を 左の 列へ 足す → ';
  }
  const box = arr => arr.map(v => '<span class="im-box">' + v + '</span>').join('<span class="im-bar">|</span>');

  const T = [];
  // ===================== 基本 =====================
  T.push({ id: 't01', course: 'kihon', icon: '🔟', name: '11を かける', short: '両はしは そのまま、間に となり同士の 和',
    why: ['<b>ab × 11 = ab × 10 + ab</b>。10倍した 数を 1けた ずらして 足すと、となり同士の 数字が 重なる。', '例: 34 × 11 = 340 + 34 = 374 → 3 | 3+4 | 4'],
    ex: [43], rand: lv => lv === 1 ? (a => [10 * a + R(0, 9 - a)])(R(1, 8)) : (Math.random() < 0.5 ? (a => [10 * a + R(10 - a, 9)])(R(2, 9)) : [R(102, 989)]),
    make: ([n]) => {
      const d = dg(n), raw = [d[0]]; for (let i = 0; i < d.length - 1; i++) raw.push(d[i] + d[i + 1]); raw.push(d[d.length - 1]);
      const a = n * 11, st = [];
      st.push(s(n, 'a') + ' × 11 → 左はし ' + s(d[0], 'b') + '、右はし ' + s(d[d.length - 1], 'b') + '、間は となり同士を 足す');
      st.push(box(raw.map((v, i) => (i === 0 || i === raw.length - 1) ? s(v, 'b') : s(v, 'c'))));
      if (raw.slice(1).some(v => v >= 10)) st.push(carryNote(raw) + box(dg(a)));
      st.push('答え ' + s(a, 'r'));
      return { q: n + ' × 11', a: a, steps: st };
    }, ans: 'num', target: 12, slow: 6 });

  T.push({ id: 't02', course: 'kihon', icon: '5️⃣', name: '一の位が 5 の 2乗', short: '5を とった 数 × (その次の 数) の 後ろに 25',
    why: ['<b>(10a + 5)² = 100a² + 100a + 25 = 100 × a(a+1) + 25</b>', 'だから 下2けたは いつも 25。上は a と (a+1) を かけるだけ。'],
    area: [['10a', '5'], ['10a', '5'], ['100a²', '50a', '50a', '25']],
    ex: [65], rand: lv => [10 * (lv === 1 ? R(1, 9) : R(10, 19)) + 5],
    make: ([n]) => {
      const a = (n - 5) / 10, P = a * (a + 1), A = n * n;
      return { q: n + '²  (' + n + ' × ' + n + ')', a: A, steps: [
        '一の位が 5 → 下2けたは ' + s('25', 'c'),
        '5を とった 数 ' + s(a, 'a') + ' × 次の 数 ' + s(a + 1, 'b') + ' = ' + s(P, 'r'),
        s(P, 'r') + ' の 後ろに ' + s('25', 'c') + ' → 答え ' + s(A, 'r')] };
    }, ans: 'num', target: 14, slow: 5 });

  T.push({ id: 't03', course: 'kihon', icon: '🤝', name: '十の位が 同じ・一の位の 和が 10', short: '十の位 × (十の位+1) の 後ろに 一の位どうしの 積 (2けた)',
    why: ['<b>(10a+b)(10a+c) = 100a² + 10a(b+c) + bc</b>。b+c = 10 なら 10a×10 = 100a に なるので', '= 100a² + 100a + bc = <b>100 × a(a+1) + bc</b>'],
    ex: [43, 47], rand: lv => { const a = lv === 1 ? R(1, 9) : R(10, 19), b = R(1, 9); return [10 * a + b, 10 * a + 10 - b]; },
    make: ([x, y]) => {
      const a = Math.floor(x / 10), b = x % 10, c = y % 10, P = a * (a + 1), Q = b * c, A = x * y;
      return { q: x + ' × ' + y, a: A, steps: [
        '十の位は どちらも ' + s(a, 'a') + '、一の位 ' + b + ' + ' + c + ' = 10 ✓',
        s(a, 'a') + ' × ' + s(a + 1, 'a') + ' = ' + s(P, 'b'),
        '一の位どうし ' + b + ' × ' + c + ' = ' + s(two(Q), 'c') + ' (必ず 2けたで 書く)',
        s(P, 'b') + ' と ' + s(two(Q), 'c') + ' を つなげて 答え ' + s(A, 'r')] };
    }, ans: 'num', target: 12, slow: 6 });

  T.push({ id: 't04', course: 'kihon', icon: '9️⃣', name: '9・99・999 を かける', short: '1つ 大きい 10・100・1000 を かけて、もとの 数を 引く',
    why: ['<b>99 = 100 − 1</b> だから n × 99 = n × 100 − n', '9 = 10 − 1、999 = 1000 − 1 も 同じ。難しい 掛け算が 簡単な 引き算に 変わる。'],
    ex: [47, 99], rand: lv => lv === 1 ? [R(12, 99), pick([9, 99])] : (Math.random() < 0.5 ? [R(101, 999), 99] : [R(23, 999), 999]),
    make: ([n, m]) => {
      const N = n * (m + 1), A = n * m;
      return { q: n + ' × ' + m, a: A, steps: [s(m, 'a') + ' = ' + s(m + 1, 'b') + ' − 1 と 考える', n + ' × ' + s(m + 1, 'b') + ' = ' + s(N, 'c'), s(N, 'c') + ' − ' + n + ' = ' + s(A, 'r')] };
    }, ans: 'num', target: 10, slow: 7 });

  T.push({ id: 't05', course: 'kihon', icon: '➖', name: '1000・10000 からの 引き算', short: 'すべて 9 から、最後 (一の位) だけ 10 から 引く',
    why: ['<b>1000 − n = (999 − n) + 1</b>。999 から 引くと くり下がりが 一度も 起きない。', 'だから 各けたを 9 から ひき、最後に 1 を 足す (= 一の位だけ 10 から 引く)。'],
    ex: [1000, 368], rand: lv => lv === 1 ? [1000, R(101, 999)] : [10000, R(1001, 9999)],
    make: ([B, n]) => {
      const A = B - n, w = String(B).length - 1, d = String(n).padStart(w, '0').split('').map(Number);
      let last = d.length - 1; while (last > 0 && d[last] === 0) last--;
      const res = d.map((v, i) => i < last ? 9 - v : i === last ? 10 - v : 0);
      const st = [B + ' − ' + n + ' : 各けたを 9 から 引く、最後の 0 で ない けただけ 10 から 引く'];
      st.push(d.map((v, i) => i < last ? '9−' + v + '=' + s(9 - v, 'c') : i === last ? '10−' + v + '=' + s(10 - v, 'b') : '0').join('  '));
      if (last < d.length - 1) st.push('後ろの 0 は そのまま 0');
      st.push('答え ' + s(A, 'r'));
      return { q: B + ' − ' + n, a: A, steps: st };
    }, ans: 'num', target: 12, slow: 6 });

  T.push({ id: 't06', course: 'kihon', icon: '🪙', name: '5・25・125 の 掛け算 割り算', short: '× 5 = ×10 ÷2 / × 25 = ×100 ÷4 / ÷ 5 = ×2 ÷10',
    why: ['<b>5 = 10 ÷ 2、25 = 100 ÷ 4、125 = 1000 ÷ 8</b>', 'だから × 5 は「10倍して 半分」、÷ 5 は「2倍して 10で 割る」。'],
    ex: ['x25', 36], rand: lv => { const op = pick(lv === 1 ? ['x5', 'x25', 'd5'] : ['x25', 'd25', 'x125', 'd5']); return [op, op === 'x5' ? R(14, 198) : op === 'x25' ? R(12, 96) : op === 'd5' ? 5 * R(11, 199) : op === 'd25' ? 25 * R(5, 99) : R(8, 96)]; },
    make: ([op, n]) => {
      const M = { x5: [10, 2, '×', 5], x25: [100, 4, '×', 25], x125: [1000, 8, '×', 125] };
      if (M[op]) { const [k, d, , m] = M[op], A = n * m; return { q: n + ' × ' + m, a: A, steps: [m + ' = ' + k + ' ÷ ' + d + ' と 考える', n + ' × ' + k + ' = ' + s(n * k, 'c'), s(n * k, 'c') + ' ÷ ' + d + ' = ' + s(A, 'r')] }; }
      const m = op === 'd5' ? 5 : 25, k = op === 'd5' ? 2 : 4, z = op === 'd5' ? 10 : 100, A = n / m;
      return { q: n + ' ÷ ' + m, a: A, steps: ['÷ ' + m + ' は「× ' + k + ' して ÷ ' + z + '」と 同じ', n + ' × ' + k + ' = ' + s(n * k, 'c'), s(n * k, 'c') + ' ÷ ' + z + ' = ' + s(A, 'r')] };
    }, ans: 'num', target: 12, slow: 6 });

  T.push({ id: 't07', course: 'kihon', icon: '⬅', name: '左から 足し算・引き算', short: '大きい 位から 順に 足して (ひいて) いく',
    why: ['インドでは 暗算を「左から」 する 練習を よく する。大きい 位から 計算すると、大体の 答えが 最初に 分かり、間違いにも 気づきやすい。', '例: 476 + 358 → 476 + 300 = 776 → + 50 = 826 → + 8 = 834'],
    ex: ['+', 476, 358], rand: lv => lv === 1 ? ['+', R(123, 899), R(123, 899)] : (Math.random() < 0.5 ? ['+', R(1234, 8999), R(1234, 8999)] : (a => ['−', a, R(123, a - 50)])(R(400, 999))),
    make: ([op, x, y]) => {
      const A = op === '+' ? x + y : x - y, d = dg(y), st = [], L = d.length; let cur = x;
      st.push(x + ' ' + op + ' ' + y + ' : ' + y + ' を 位ごとに 分けて 左から');
      d.forEach((v, i) => { const part = v * Math.pow(10, L - 1 - i); if (!part) return; const nx = op === '+' ? cur + part : cur - part; st.push(cur + ' ' + op + ' ' + s(part, 'c') + ' = ' + s(nx, i === L - 1 ? 'r' : 'b')); cur = nx; });
      return { q: x + ' ' + op + ' ' + y, a: A, steps: st };
    }, ans: 'num', target: 10, slow: 8 });

  // ===================== 応用 =====================
  T.push({ id: 't08', course: 'oyo', icon: '🇮🇳', name: '19×19 まで (インド式 2けた九九)', short: '(かけられる数 + もう一方の 一の位) × 10 + 一の位どうし',
    why: ['<b>(10+a)(10+b) = 100 + 10a + 10b + ab = 10 × (10 + a + b) + ab</b>', '面積図で 見ると、4つの 長方形を 2つの かたまりに まとめている。20台なら (20+a)(20+b) = 20 × (20+a+b) + ab。'],
    area: [['10', 'b'], ['10', 'a'], ['100', '10b', '10a', 'ab']],
    ex: [17, 14], rand: lv => lv === 1 ? [R(11, 19), R(11, 19)] : [R(21, 29), R(21, 29)],
    make: ([x, y]) => {
      const B = x < 20 ? 10 : 20, u = x - B, v = y - B, S = x + v, A = x * y;
      return { q: x + ' × ' + y, a: A, steps: [
        s(x, 'a') + ' + ' + s(v, 'b') + ' (' + y + ' の 一の位) = ' + s(S, 'c'),
        s(S, 'c') + ' × ' + B + ' = ' + s(S * B, 'c'),
        '一の位どうし ' + u + ' × ' + v + ' = ' + s(u * v, 'b'),
        s(S * B, 'c') + ' + ' + s(u * v, 'b') + ' = ' + s(A, 'r')] };
    }, ans: 'num', target: 10, slow: 7 });

  T.push({ id: 't09', course: 'oyo', icon: '🔁', name: '一の位が 同じ・十の位の 和が 10', short: '(十の位どうしの 積 + 一の位) の 後ろに 一の位の 2乗 (2けた)',
    why: ['<b>(10a+c)(10b+c) = 100ab + 10c(a+b) + c²</b>。a + b = 10 なら 10c × 10 = 100c なので', '= <b>100(ab + c) + c²</b>'],
    ex: [36, 76], rand: lv => { const a = R(1, 9), c = lv === 1 ? R(1, 5) : R(1, 9); return [10 * a + c, 10 * (10 - a) + c]; },
    make: ([x, y]) => {
      const a = Math.floor(x / 10), b = Math.floor(y / 10), c = x % 10, P = a * b + c, A = x * y;
      return { q: x + ' × ' + y, a: A, steps: [
        '一の位は どちらも ' + s(c, 'b') + '、十の位 ' + a + ' + ' + b + ' = 10 ✓',
        a + ' × ' + b + ' + ' + s(c, 'b') + ' = ' + s(P, 'c'),
        s(c, 'b') + ' × ' + s(c, 'b') + ' = ' + s(two(c * c), 'a') + ' (2けたで)',
        s(P, 'c') + ' と ' + s(two(c * c), 'a') + ' を つなげて ' + s(A, 'r')] };
    }, ans: 'num', target: 10, slow: 7 });

  T.push({ id: 't10', course: 'oyo', icon: '💯', name: '100に 近い 数どうし (ニキラム)', short: '100との 違いを 使う: (x + yの 違い) × 100 + 違いどうしの 積',
    why: ['ヴェーダ数学の「すべては 9 から、最後は 10 から (ニキラム)」の 考え方。', '<b>(100 + p)(100 + q) = 100(100 + p + q) + pq</b>。p・q は 100 との 違い (マイナスでも よい)。'],
    ex: [97, 94], rand: lv => lv === 1 ? [R(88, 99), R(88, 99)] : pick([[R(101, 115), R(101, 115)], [R(91, 99), R(101, 112)]]),
    make: ([x, y]) => {
      const p = x - 100, q = y - 100, L = x + q, P = p * q, A = x * y, sg = v => (v >= 0 ? '+' : '−') + Math.abs(v);
      return { q: x + ' × ' + y, a: A, steps: [
        '100 との 違い: ' + x + ' → ' + s(sg(p), 'a') + '、' + y + ' → ' + s(sg(q), 'b'),
        'ななめに 足す: ' + x + ' ' + sg(q).replace('+', '+ ').replace('−', '− ') + ' = ' + s(L, 'c') + ' → ' + s(L, 'c') + ' × 100 = ' + (L * 100),
        '違いどうし: (' + sg(p) + ') × (' + sg(q) + ') = ' + s(P, 'b'),
        (L * 100) + ' ' + (P >= 0 ? '+ ' + P : '− ' + (-P)) + ' = ' + s(A, 'r')] };
    }, ans: 'num', target: 9, slow: 8 });

  T.push({ id: 't11', course: 'oyo', icon: '⏹', name: '100・50 に 近い 数の 2乗', short: '100近く: (n + 違い)×100 + 違い² / 50近く: (25 + 違い)×100 + 違い²',
    why: ['<b>(100 + d)² = 100(100 + 2d) + d² = 100 × (n + d) + d²</b>', '<b>(50 + d)² = 2500 + 100d + d² = 100 × (25 + d) + d²</b>'],
    ex: [96], rand: lv => [lv === 1 ? pick([R(88, 99), R(101, 112)]) : pick([R(38, 49), R(51, 62)])],
    make: ([n]) => {
      const A = n * n;
      if (n > 75) { const d = n - 100; return { q: n + '²', a: A, steps: ['100 との 違い d = ' + s(d, 'a'), n + ' + (' + d + ') = ' + s(n + d, 'c') + ' → × 100 = ' + (n + d) * 100, 'd² = ' + s(d * d, 'b'), (n + d) * 100 + ' + ' + d * d + ' = ' + s(A, 'r')] }; }
      const d = n - 50; return { q: n + '²', a: A, steps: ['50 との 違い d = ' + s(d, 'a'), '25 + (' + d + ') = ' + s(25 + d, 'c') + ' → × 100 = ' + (25 + d) * 100, 'd² = ' + s(d * d, 'b'), (25 + d) * 100 + ' + ' + d * d + ' = ' + s(A, 'r')] };
    }, ans: 'num', target: 9, slow: 8 });

  T.push({ id: 't12', course: 'oyo', icon: '✖', name: 'たすきがけ (2けた × 2けた)', short: '右: 一の位どうし → まん中: クロスの 和 → 左: 十の位どうし',
    why: ['ヴェーダ数学の「縦と ななめ (ウールドヴァ・ティリャグビャーム)」。', '<b>(10a+b)(10c+d) = 100ac + 10(ad + bc) + bd</b>。3つの 列を 右から くり上げて まとめる。どんな 2けたにも 使える 万能の ワザ。'],
    area: [['10c', 'd'], ['10a', 'b'], ['100ac', '10ad', '10bc', 'bd']],
    ex: [23, 41], rand: lv => lv === 1 ? [10 * R(1, 4) + R(1, 4), 10 * R(1, 4) + R(1, 4)] : [R(12, 99), R(12, 99)],
    make: ([x, y]) => {
      const a = Math.floor(x / 10), b = x % 10, c = Math.floor(y / 10), d = y % 10, cols = [a * c, a * d + b * c, b * d], A = x * y, st = [];
      st.push('右 (一の位×一の位): ' + b + ' × ' + d + ' = ' + s(cols[2], 'a'));
      st.push('まん中 (クロス): ' + a + '×' + d + ' + ' + b + '×' + c + ' = ' + s(cols[1], 'b'));
      st.push('左 (十の位×十の位): ' + a + ' × ' + c + ' = ' + s(cols[0], 'c'));
      st.push(box([s(cols[0], 'c'), s(cols[1], 'b'), s(cols[2], 'a')]) + (cols.slice(1).some(v => v >= 10) ? '  → くり上げて まとめる' : ''));
      st.push('答え ' + s(A, 'r'));
      return { q: x + ' × ' + y, a: A, steps: st };
    }, ans: 'num', target: 7, slow: 12 });

  const ds = n => { let v = n; while (v > 9) v = dg(v).reduce((p, c) => p + c, 0); return v === 9 ? 0 : v; };
  T.push({ id: 't13', course: 'oyo', icon: '🔍', name: '9去法で 検算', short: '各数の 数字の 和を 1けたに (9は 0) → 左右が 同じなら たぶん 正しい',
    why: ['10 を 9 で 割ると 余り 1。だから どの 数も「数字の 和」と 9 で わった 余りが 同じに なる。', '掛け算の 答えの 余りは、かける 数どうしの 余りの 積と 同じ。合わなければ <b>確実に 間違い</b>。', '⚠ 数字の 入れかえ (例 1243 ↔ 1423) のように 9 の 倍数だけ ずれた 間違いは 見つけられない。'],
    ex: [347, 26, 9022], rand: lv => { const x = lv === 1 ? R(12, 99) : R(102, 999), y = R(12, 99), p = x * y; return [x, y, Math.random() < 0.5 ? p : p + pick([1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 20, -1, -2, -10, -11, -20].filter(k => k % 9 !== 0))]; },
    make: ([x, y, p]) => {
      const ok = x * y === p, dx = ds(x), dy = ds(y), dp = ds(p), dm = ds(dx * dy);
      return { q: x + ' × ' + y + ' = ' + p + ' ?', a: ok ? 'o' : 'x', steps: [
        x + ' → ' + s(dx, 'a') + '、' + y + ' → ' + s(dy, 'b') + ' (数字を 足して 1けたに、9 は 0)',
        s(dx, 'a') + ' × ' + s(dy, 'b') + ' = ' + dx * dy + ' → ' + s(dm, 'c'),
        '答えの ' + p + ' → ' + s(dp, 'c'),
        dm === dp ? '同じ → ' + s('○ 正しい', 'r') + (ok ? '' : ' (?)') : '違う → ' + s('× 間違い', 'r')] };
    }, ans: 'ox', target: 12, slow: 8 });

  T.push({ id: 't14', course: 'oyo', icon: '%', name: 'パーセントの 入れかえ', short: 'x の y% = y の x%  (掛け算の 順番は 入れかえて よい)',
    why: ['<b>x の y% = x × y ÷ 100 = y × x ÷ 100 = y の x%</b>', '「50 の 8%」は 難しそうでも「8 の 50%」= 8の半分 = 4 と すぐ 分かる。'],
    ex: [50, 8], rand: lv => { const Rn = pick(lv === 1 ? [50, 25, 20, 10] : [25, 50, 20, 75, 40, 60, 12, 5]); let X; do { X = R(2, 96); } while ((X * Rn) % 100 !== 0 || X === Rn); return [Rn, X]; },
    make: ([Rn, X]) => {
      const A = Rn * X / 100;
      return { q: Rn + ' の ' + X + '%', a: A, steps: [Rn + ' の ' + X + '% = ' + s(X, 'b') + ' の ' + s(Rn + '%', 'a') + ' と 入れかえる', X + ' × ' + Rn + ' ÷ 100 = ' + s(A, 'r')] };
    }, ans: 'num', target: 12, slow: 7 });

  T.push({ id: 't20', course: 'oyo', icon: '🎯', name: '一の位が 5 どうし', short: '十の位の 積 + (十の位の 和の 半分) の 後ろに 25 か 75',
    why: ['<b>(10a+5)(10b+5) = 100ab + 50(a+b) + 25</b>', 'a+b が 偶数なら 50(a+b) = 100 × (a+b)/2 で 下2けた 25。奇数なら 半分の 余り 50 が 25 に 足されて 75。'],
    ex: [35, 75], rand: lv => { let a = R(1, 9), b; do { b = R(1, 9); } while (b === a || (lv === 1 && (a + b) % 2)); return [10 * a + 5, 10 * b + 5]; },
    make: ([x, y]) => {
      const a = Math.floor(x / 10), b = Math.floor(y / 10), H = Math.floor((a + b) / 2), P = a * b + H, tail = (a + b) % 2 ? '75' : '25', A = x * y;
      return { q: x + ' × ' + y, a: A, steps: [
        '十の位どうし ' + a + ' × ' + b + ' = ' + s(a * b, 'a'),
        '十の位の 和 ' + (a + b) + ' の 半分 = ' + s(H, 'b') + ((a + b) % 2 ? ' (余り 1 → 下2けたは 75)' : ' (割り切れる → 下2けたは 25)'),
        s(a * b, 'a') + ' + ' + s(H, 'b') + ' = ' + s(P, 'c') + ' の 後ろに ' + s(tail, 'c'),
        '答え ' + s(A, 'r')] };
    }, ans: 'num', target: 10, slow: 7 });

  // ===================== 達人 =====================
  T.push({ id: 't15', course: 'tatsujin', icon: '🧮', name: 'たすきがけ (3けた)', short: '右から: 1列 → 2組の クロス → 3組 → 2組 → 1列 を 足して くり上げる',
    why: ['2けたの たすきがけを 広げた 形。<b>(100a+10b+c)(100d+10e+f)</b> の 各位は', '一の位 cf / 十の位 bf+ce / 百の位 af+be+cd / 千の位 ae+bd / 一万の位 ad'],
    ex: [213, 42], rand: lv => lv === 1 ? [R(102, 999), R(12, 99)] : [R(102, 999), R(102, 999)],
    make: ([x, y]) => {
      const A = x * y, a = String(x).padStart(3, '0').split('').map(Number), b = String(y).padStart(3, '0').split('').map(Number);
      const cols = [a[0] * b[0], a[0] * b[1] + a[1] * b[0], a[0] * b[2] + a[1] * b[1] + a[2] * b[0], a[1] * b[2] + a[2] * b[1], a[2] * b[2]];
      let first = 0; while (first < 4 && cols[first] === 0) first++;
      const show = cols.slice(first), names = ['一万の位', '千の位', '百の位', '十の位', '一の位'].slice(first);
      const fx = [a[0] + '×' + b[0], a[0] + '×' + b[1] + '+' + a[1] + '×' + b[0], a[0] + '×' + b[2] + '+' + a[1] + '×' + b[1] + '+' + a[2] + '×' + b[0], a[1] + '×' + b[2] + '+' + a[2] + '×' + b[1], a[2] + '×' + b[2]].slice(first);
      const st = [x + ' × ' + y + ' を 列ごとに (右から)'];
      for (let i = show.length - 1; i >= 0; i--) st.push(names[i] + ': ' + fx[i] + ' = ' + s(show[i], i % 2 ? 'b' : 'a'));
      st.push(box(show) + ' → くり上げて まとめる');
      st.push('答え ' + s(A, 'r'));
      return { q: x + ' × ' + y, a: A, steps: st };
    }, ans: 'num', target: 4, slow: 25 });

  T.push({ id: 't16', course: 'tatsujin', icon: '🎚', name: '補助基準 (50・200 の 近く)', short: '(x + yの 違い) × 基準 + 違いどうしの 積',
    why: ['ニキラムの 基準は 100 で なくても よい。<b>(B + p)(B + q) = B(B + p + q) + pq</b>', '50 なら「× 50 = × 100 ÷ 2」、200 なら「× 200 = × 2 × 100」で 計算する。'],
    ex: [48, 46], rand: lv => lv === 1 ? [R(41, 59), R(41, 59)].map(v => v === 50 ? 49 : v) : [R(188, 212), R(188, 212)].map(v => v === 200 ? 197 : v),
    make: ([x, y]) => {
      const B = x < 100 ? 50 : 200, p = x - B, q = y - B, L = x + q, P = p * q, A = x * y, sg = v => (v >= 0 ? '+' : '−') + Math.abs(v);
      return { q: x + ' × ' + y, a: A, steps: [
        '基準 ' + B + ' との 違い: ' + s(sg(p), 'a') + '、' + s(sg(q), 'b'),
        x + ' ' + sg(q) + ' = ' + s(L, 'c') + ' → ' + L + ' × ' + B + ' = ' + s(L * B, 'c') + (B === 50 ? ' (×100 ÷2)' : ' (×2 ×100)'),
        '(' + sg(p) + ') × (' + sg(q) + ') = ' + s(P, 'b'),
        (L * B) + ' ' + (P >= 0 ? '+ ' + P : '− ' + (-P)) + ' = ' + s(A, 'r')] };
    }, ans: 'num', target: 6, slow: 14 });

  const SQ_END = { 0: [0], 1: [1, 9], 4: [2, 8], 5: [5], 6: [4, 6], 9: [3, 7] };
  T.push({ id: 't17', course: 'tatsujin', icon: '√', name: '平方根 (完全平方数)', short: '一の位から 候補を 2つに しぼり、前の 部分で 決める',
    why: ['2乗の 一の位は 0,1,4,5,6,9 だけ。1→1か9、4→2か8、9→3か7、6→4か6、5→5、0→0。', '下2けたを 消した 前の 部分 F で、A² ≤ F と なる 一番 大きい A が 十の位 (以上)。', '最後に A × (A+1) と F を 比べ、F が 小さければ 小さい 候補、大きければ 大きい 候補。'],
    ex: [5329], rand: lv => { const n = lv === 1 ? R(32, 99) : R(101, 316); return [n * n]; },
    make: ([N]) => {
      const n = Math.round(Math.sqrt(N)), u = N % 10, F = Math.floor(N / 100), A = Math.floor(Math.sqrt(F)), c = SQ_END[u];
      const st = ['一の位 ' + s(u, 'a') + ' → 答えの 一の位は ' + c.map(v => s(v, 'a')).join(' か ')];
      st.push('前の 部分 ' + s(F, 'b') + ' → ' + A + '² = ' + A * A + ' ≤ ' + F + ' < ' + (A + 1) * (A + 1) + ' = ' + (A + 1) + '² → 前は ' + s(A, 'b'));
      if (c.length === 2) st.push(A + ' × ' + (A + 1) + ' = ' + A * (A + 1) + (F < A * (A + 1) ? ' > ' + F + ' → 小さい 方 ' + s(c[0], 'a') : ' ≤ ' + F + ' → 大きい 方 ' + s(c[1], 'a')));
      st.push('答え ' + s(n, 'r') + '  (' + n + '² = ' + N + ')');
      return { q: '√' + N, a: n, steps: st };
    }, ans: 'num', target: 6, slow: 15 });

  const CB_END = { 0: 0, 1: 1, 2: 8, 3: 7, 4: 4, 5: 5, 6: 6, 7: 3, 8: 2, 9: 9 };
  T.push({ id: 't18', course: 'tatsujin', icon: '∛', name: '立方根 (完全立方数)', short: '一の位で 1つに 決まる + 下3けたを 消した 部分で 前が 決まる',
    why: ['3乗の 一の位は 0〜9 が すべて 違う: 2↔8、3↔7 が 入れかわり、他は 同じ。だから 一の位は すぐ 決まる。', '下3けたを 消した 部分 F で、A³ ≤ F と なる 一番 大きい A が 前の 数字。', '1³=1 2³=8 3³=27 4³=64 5³=125 6³=216 7³=343 8³=512 9³=729 を 覚えよう。'],
    ex: [175616], rand: lv => { const n = lv === 1 ? R(11, 99) : R(101, 999); return [n * n * n]; },
    make: ([N]) => {
      const n = Math.round(Math.cbrt(N)), u = N % 10, F = Math.floor(N / 1000); let A = Math.floor(Math.cbrt(F)); while ((A + 1) ** 3 <= F) A++; while (A ** 3 > F) A--;
      return { q: '∛' + N, a: n, steps: [
        '一の位 ' + s(u, 'a') + ' → 答えの 一の位は ' + s(CB_END[u], 'a'),
        '下3けたを 消して ' + s(F, 'b') + ' → ' + A + '³ = ' + A ** 3 + ' ≤ ' + F + ' < ' + (A + 1) ** 3 + ' → 前は ' + s(A, 'b'),
        '答え ' + s(n, 'r')] };
    }, ans: 'num', target: 8, slow: 12 });

  T.push({ id: 't19', course: 'tatsujin', icon: '➗', name: '9 で 割る (ニキラム)', short: '商の 各けた = 左からの 数字の 合計、余り = 全部の 数字の 合計',
    why: ['10 = 9 + 1 だから、10 の 位の 数を 9 で 割ると「同じ 数 あまり 同じ 数」に なる。', 'だから 左から 数字を 足していった 合計が 商の 各けた、全部の 合計が 余り。余りが 9 以上なら 9 ずつ 商に くり上げる。'],
    ex: [1234], rand: lv => [lv === 1 ? R(101, 799) : R(1001, 9999)],
    make: ([N]) => {
      const d = dg(N), run = []; let t = 0; d.forEach(v => { t += v; run.push(t); });
      const qcols = run.slice(0, -1), rem0 = run[run.length - 1], qv = qcols.reduce((p, c) => p * 10 + c, 0), extra = Math.floor(rem0 / 9);
      const q = Math.floor(N / 9), r = N % 9, st = [];
      st.push('左から 数字を 足していく: ' + d.map((v, i) => run[i]).map((v, i) => i < d.length - 1 ? s(v, 'b') : s(v, 'a')).join(' → '));
      st.push('最後 以外 ' + box(qcols.map(v => s(v, 'b'))) + (qcols.some(v => v >= 10) ? ' → くり上げて ' + qv : '') + ' が 商の もと、最後の ' + s(rem0, 'a') + ' が 余りの もと');
      if (extra) st.push('余り ' + rem0 + ' は 9 以上 → 9 × ' + extra + ' を 商に 足す: ' + qv + ' + ' + extra + ' = ' + s(q, 'c') + '、余り ' + rem0 + ' − ' + 9 * extra + ' = ' + s(r, 'c'));
      st.push('答え 商 ' + s(q, 'r') + ' 余り ' + s(r, 'r'));
      return { q: N + ' ÷ 9', a: [q, r], steps: st };
    }, ans: 'qr', target: 6, slow: 14 });

  // ===================== 上級 (ヴェーダ数学 発展) =====================
  T.push({ id: 't21', course: 'jokyu', icon: '🎯', name: '1000に 近い 数どうし', short: '1000との 違いを 使う: (x + yの 違い) × 1000 + 違いどうしの 積 (3けた)',
    why: ['ニキラムの 1000 版。x = 1000 + a、y = 1000 + b と すると x × y = (1000 + a + b) × 1000 + a × b。', '例: 996 × 993 → 違い −4 と −7 → 996 − 7 = 989、(−4)×(−7) = 028 → 989028', '後ろは 必ず 3けた で 書く (足りなければ 0 を つめる)。'],
    ex: [996, 993], rand: lv => lv === 1 ? [1000 - R(1, 9), 1000 - R(1, 9)] : (Math.random() < 0.5 ? [1000 - R(5, 40), 1000 - R(5, 40)] : [1000 + R(2, 30), 1000 + R(2, 30)]),
    make: ([x, y]) => {
      const a = x - 1000, b = y - 1000, left = x + b, right = a * b, ans = x * y, st = [];
      const sg = v => v < 0 ? '−' + (-v) : '+' + v;
      st.push('1000との 違い: ' + s(x, 'a') + ' → ' + s(sg(a), 'b') + '、' + s(y, 'a') + ' → ' + s(sg(b), 'b'));
      st.push('左: ' + x + ' ' + sg(b) + ' = ' + s(left, 'c') + '  /  右: (' + sg(a) + ') × (' + sg(b) + ') = ' + s(right, 'c'));
      if (right >= 1000) st.push('右が 4けた → 千の位を 左へ くり上げ');
      st.push(left + ' × 1000 + ' + right + ' = 答え ' + s(ans, 'r'));
      return { q: x + ' × ' + y, a: ans, steps: st };
    }, ans: 'num', target: 6, slow: 15 });
  T.push({ id: 't22', course: 'jokyu', icon: '²', name: 'どんな 2けたでも 2乗 (デュプレックス)', short: 'ab² = a² | 2ab | b² を 右から くり上げ',
    why: ['(10a + b)² = 100a² + 2·10ab + b²。3つの 部分を 位ごとに 並べて、右から くり上げる だけ。', '例: 47² → 16 | 56 | 49 → 49 の 4 を 56 へ: 60 → 6 を 16 へ: 22 → 2209', '2ab (デュプレックス) が インド式の かなめ。'],
    ex: [47], rand: lv => [lv === 1 ? R(11, 49) : R(51, 99)],
    make: ([n]) => {
      const a = Math.floor(n / 10), b = n % 10, cols = [a * a, 2 * a * b, b * b], ans = n * n;
      return { q: n + '²', a: ans, steps: [s(a, 'a') + '² = ' + s(a * a, 'b') + '、2 × ' + a + ' × ' + b + ' = ' + s(2 * a * b, 'b') + '、' + s(b, 'a') + '² = ' + s(b * b, 'b'), box(cols), carryNote(cols) + '答え ' + s(ans, 'r')] };
    }, ans: 'num', target: 8, slow: 10 });
  T.push({ id: 't23', course: 'jokyu', icon: '³²', name: '3けたの 2乗 (デュプレックス)', short: 'abc² = a² | 2ab | 2ac+b² | 2bc | c²',
    why: ['5つの 列: a²、2ab、2ac + b²、2bc、c²。まん中の 列は「外側どうしの 2倍 + まん中の 2乗」。', '例: 213² → 4 | 4 | 12+1=13 | 6 | 9 → くり上げて 45369', '2けたの デュプレックスを 3けたに のばした 形。'],
    ex: [213], rand: lv => [lv === 1 ? R(101, 233) : R(234, 999)],
    make: ([n]) => {
      const a = Math.floor(n / 100), b = Math.floor(n / 10) % 10, c = n % 10, cols = [a * a, 2 * a * b, 2 * a * c + b * b, 2 * b * c, c * c], ans = n * n;
      return { q: n + '²', a: ans, steps: ['a=' + a + '、b=' + b + '、c=' + c, 'a² = ' + cols[0] + '、2ab = ' + cols[1] + '、2ac + b² = ' + (2 * a * c) + ' + ' + (b * b) + ' = ' + cols[2] + '、2bc = ' + cols[3] + '、c² = ' + cols[4], box(cols.map(v => s(v, 'b'))), carryNote(cols) + '答え ' + s(ans, 'r')] };
    }, ans: 'num', target: 4, slow: 25 });
  T.push({ id: 't24', course: 'jokyu', icon: '⚖', name: '中点で 掛け算 (平方の 差)', short: 'x × y = (中点)² − (中点との 差)²',
    why: ['(m + d)(m − d) = m² − d²。2つの 数の まん中 (中点) m の 2乗から、差 d の 2乗を 引く。', '例: 47 × 53 → 中点 50、差 3 → 2500 − 9 = 2491', '中点が 10 の 倍数や 25・50 に なる ときに 特に 速い。'],
    ex: [47, 53], rand: lv => { const m = lv === 1 ? pick([20, 30, 40, 50, 60, 70, 80, 90]) : pick([25, 35, 45, 55, 65, 75, 85, 95, 100, 150, 200]), d = R(1, lv === 1 ? 5 : 9); return [m - d, m + d]; },
    make: ([x, y]) => {
      const m = (x + y) / 2, d = (y - x) / 2, ans = x * y;
      return { q: x + ' × ' + y, a: ans, steps: ['中点 ' + s(m, 'a') + '、差 ' + s(d, 'b'), m + '² = ' + s(m * m, 'c') + '、' + d + '² = ' + s(d * d, 'c'), (m * m) + ' − ' + (d * d) + ' = 答え ' + s(ans, 'r')] };
    }, ans: 'num', target: 8, slow: 10 });
  T.push({ id: 't25', course: 'jokyu', icon: '🔍', name: '7・11・13 の 倍数判定', short: '下から 3けたずつ 区切り、交互に 足し引き → 7・11・13 で 割り切れるか',
    why: ['1001 = 7 × 11 × 13。1000 ≡ −1 なので、3けたずつ 区切った かたまりを 交互に 足し引きした 数と 同じ あまりに なる。', '例: 123123 → 123 − 123 = 0 → 7 でも 11 でも 13 でも 割り切れる', '残った 3けた以下の 数を 7・11・13 で 割って 確かめる。'],
    ex: [246813, 7], rand: lv => { const k = pick([7, 11, 13]), yes = Math.random() < 0.5; let N = lv === 1 ? R(10000, 99999) : R(100000, 9999999); if (yes) N -= N % k; else if (N % k === 0) N += 1; return [N, k]; },
    make: ([N, k]) => {
      const parts = []; let t = N; while (t) { parts.unshift(t % 1000); t = Math.floor(t / 1000); }
      let alt = 0; parts.slice().reverse().forEach((p, i) => { alt += i % 2 ? -p : p; });
      const ok = N % k === 0;
      return { q: N + ' は ' + k + ' で 割り切れる?', a: ok ? 'o' : 'x', steps: ['3けたずつ: ' + box(parts.map(p => s(String(p).padStart(parts.indexOf(p) === 0 ? 1 : 3, '0'), 'b'))), '下から 交互に + − : ' + s(alt, 'c'), alt + ' ÷ ' + k + ' → ' + (alt % k === 0 ? '割り切れる' : '余り ' + (((alt % k) + k) % k)), '答え ' + s(ok ? '○ 割り切れる' : '× 割り切れない', 'r')] };
    }, ans: 'ox', target: 8, slow: 12 });
  T.push({ id: 't26', course: 'jokyu', icon: '🔁', name: '循環小数の n けた目', short: '1/7 = 0.142857 142857… 周期で 割って 余りの 位置を 見る',
    why: ['1/7 の 小数は 142857 の 6けたが くり返す。2/7・3/7… も 同じ 数字の 輪を 別の 場所から 読む だけ (2/7 = 0.285714…)。', 'n けた目は n ÷ 周期 の あまりで 決まる (余り 0 は 周期の 最後)。', '1/13 = 0.076923…、1/27 = 0.037… なども 同じ 考え方。'],
    ex: [1, 7, 20], rand: lv => { const P = lv === 1 ? [[1, 7], [2, 7], [3, 7], [1, 3], [1, 11]] : [[1, 7], [4, 7], [5, 7], [6, 7], [1, 13], [1, 27], [5, 11]]; const [a, b] = pick(P); return [a, b, R(lv === 1 ? 7 : 20, lv === 1 ? 40 : 500)]; },
    make: ([a, b, n]) => {
      let r = a % b, dig = ''; const seen = {}; while (seen[r] === undefined) { seen[r] = dig.length; r *= 10; dig += Math.floor(r / b); r %= b; }
      const start = seen[r], per = dig.slice(start), pre = dig.slice(0, start); // 純循環なら pre = ''
      const k = n <= pre.length ? null : ((n - pre.length - 1) % per.length);
      const ans = k === null ? +pre[n - 1] : +per[k];
      return { q: a + '/' + b + ' を 小数に した とき、小数第 ' + n + ' 位の 数字は?', a: ans, steps: [a + '/' + b + ' = 0.' + pre + per + per + '… (周期 ' + s(per.length, 'a') + ' けた: ' + s(per, 'b') + ')', n + ' ÷ ' + per.length + ' = ' + Math.floor((n - pre.length - 1) / per.length) + ' 余り ' + (((n - pre.length - 1) % per.length) + 1) + ' → 周期の ' + (k + 1) + ' 番目', '答え ' + s(ans, 'r')] };
    }, ans: 'num', target: 6, slow: 15 });

  const COURSES = [
    { id: 'kihon', name: '基本', sub: 'インド式の 入口。くり上げの 少ない 形から', color: '#3a8fd1', exam: { n: 20, sec: 480, pass: 16 } },
    { id: 'oyo', name: '応用', sub: '19×19・100の 近く・たすきがけ・検算', color: '#e0832a', exam: { n: 20, sec: 600, pass: 16 } },
    { id: 'tatsujin', name: '達人', sub: '3けたの たすきがけ・平方根・立方根・÷9', color: '#8b4bc7', exam: { n: 15, sec: 900, pass: 12 } },
    { id: 'jokyu', name: '上級', sub: '中学・高校レベル: 1000の 近く・デュプレックス 2乗・平方の 差・倍数判定・循環小数', color: '#c0392b', exam: { n: 12, sec: 900, pass: 9 } },
  ];
  const STORIES = [
    { icon: '0️⃣', t: '「0」は インドで 生まれた', b: '7世紀の インドの 数学者 ブラーマグプタは、0 を「何も ない ことを 表す 数」として あつかい、0 を 足す・引く・かける ときの ルールを 本に 書いた (628年)。0 が 数に なったことで、今の 計算の 仕方が できあがった。' },
    { icon: '🔢', t: 'アラビア数字の ふるさと', b: '私たちが 使う 0〜9 の 数字と「位取り」の 仕組みは インドで 発達し、アラビアの 学者を 通じて ヨーロッパへ 伝わった。だから ヨーロッパでは「アラビア数字」と よばれるが、生まれは インドだ。' },
    { icon: '⭕', t: 'アーリヤバタと 円周率', b: '5〜6世紀の 天文学者 アーリヤバタは、円周率を 62832 ÷ 20000 = 3.1416 と 計算した。1500年 前に、小数第4位まで 正しい 値を 出していた。インド初の 人工衛星には 彼の 名前が つけられた。' },
    { icon: '🚕', t: 'ラマヌジャンと 1729', b: '天才数学者 ラマヌジャン (1887〜1920) が 病気の とき、見舞いに 来た 数学者 ハーディが「乗ってきた タクシーの 番号 1729 は つまらない 数だ」と 言うと、「いいえ、2つの 立方数の 和として 2通りに 表せる 一番 小さい 数です」と 答えた。1729 = 1³ + 12³ = 9³ + 10³' },
    { icon: '📜', t: '「ヴェーダ数学」の 本当', b: 'この 道場の ワザの 多くは「ヴェーダ数学」と よばれる。ただし 古代の 本に そのまま 書かれていた わけでは なく、20世紀に インドの 僧 バーラティ・クリシュナ・ティールタが 16の 短い 言葉 (スートラ) に まとめ、1965年に 本として 出版された ものだ。' },
    { icon: '🏫', t: 'インドの 子どもと 九九', b: '日本の 九九は 9×9 までだが、インドでは 学校で 12 や 20 の 段まで 掛け算の 表を 覚える ことが 多い と 言われる。この 道場の「19×19」の ワザを 使えば、覚えなくても その場で 計算できる。' },
  ];
  return { T: T, COURSES: COURSES, STORIES: STORIES, byId: id => T.find(t => t.id === id), R: R };
})();
