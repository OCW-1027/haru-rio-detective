/* 中学・高校 数学ラダー — 단원별 要点 + 랜덤 문제 생성기 (단계별 풀이 포함)
 * unit: { id, g: 학년 그룹, name, icon, point: [要点], gen() → { q, type, a, steps, (labels|opts) } }
 *   type 'num'   : a = 수 또는 [분자, 분모] (분수 입력 허용)
 *   type 'pair'  : a = [x, y] (각각 수 또는 분수), labels = ['x', 'y']
 *   type 'set'   : a = [m, n] (순서 무관, 중근은 같은 값 2개)
 *   type 'choice': opts = [정답, 오답...] (엔진이 섞음), a = 0
 */
const LADDER = (function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const NZ = (a, b) => { let v = 0; while (!v) v = R(a, b); return v; };
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; };
  const M = n => n < 0 ? '−' + (-n) : String(n);                 // 마이너스 기호
  const P = n => n < 0 ? '(' + M(n) + ')' : String(n);            // 음수는 괄호
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d); n /= g; d /= g; return d === 1 ? n : [n, d]; }
  function fs(v) { return Array.isArray(v) ? M(v[0]) + '/' + v[1] : M(v); }   // 수·분수 표시
  const SUP = { 2: '²', 3: '³', 4: '⁴' };
  function poly(c, v) {   // c: 높은 차수부터 계수 배열
    v = v || 'x'; const n = c.length - 1; let s = '';
    c.forEach((k, i) => {
      if (!k) return; const e = n - i, a = Math.abs(k);
      const body = (e === 0 ? String(a) : (a === 1 ? '' : a) + v + (e > 1 ? SUP[e] : ''));
      s += s ? (k < 0 ? ' − ' : ' + ') + body : (k < 0 ? '−' : '') + body;
    });
    return s || '0';
  }
  function coef(k, v) { return (k === 1 ? '' : k === -1 ? '−' : M(k)) + v; }
  function lin(a, b, x, y) { x = x || 'a'; y = y || 'b'; let o = a ? coef(a, x) : ''; if (b) o += o ? (b < 0 ? ' − ' : ' + ') + coef(Math.abs(b), y) : coef(b, y); return o || '0'; }
  function choices(right, wrongs) { const s = [right]; wrongs.forEach(w => { if (w && s.indexOf(w) < 0 && s.length < 4) s.push(w); }); return s; }
  const C = (n, r) => { let x = 1; for (let i = 0; i < r; i++) x = x * (n - i) / (i + 1); return Math.round(x); };
  const F = n => n <= 1 ? 1 : n * F(n - 1);
  function sq(n) { let o = 1, i = n; for (let k = 2; k * k <= i; k++) while (i % (k * k) === 0) { i /= k * k; o *= k; } return [o, i]; }   // √n = o√i
  const fac = m => m === 0 ? 'x' : '(x ' + (m < 0 ? '+ ' + (-m) : '− ' + m) + ')';
  const pf = v => (Array.isArray(v) ? v[0] < 0 : v < 0) ? '(' + fs(v) + ')' : fs(v);
  const cf = v => (Array.isArray(v) || v < 0) ? '(' + fs(v) + ')' : (v === 1 ? '' : String(v));
  const rt = (o, i) => i === 1 ? String(o) : (o === 1 ? '' : o) + '√' + i;

  const U = [];
  const add = (g, id, icon, name, point, gen) => U.push({ g: g, id: id, icon: icon, name: name, point: point, gen: gen });

  // ======================= 中1 =======================
  add('c1', 'c1a', '➖', '正負の数の 計算', ['かけ算・わり算を 先に、たし算・ひき算は 後', '負の数を かける・わる と 符号が 変わる', '−3² = −9 と (−3)² = 9 は ちがう (² が どこに かかるか)'], () => {
    if (Math.random() < 0.5) {
      const a = NZ(-9, 9), b = NZ(-9, 9), d = NZ(-6, 6), c = d * NZ(-6, 6), p = a * b, qq = c / d;
      return { q: P(a) + ' × ' + P(b) + ' − ' + P(c) + ' ÷ ' + P(d) + ' を 計算しよう', type: 'num', a: p - qq,
        steps: ['先に かけ算と わり算: ' + P(a) + ' × ' + P(b) + ' = ' + M(p) + '、' + P(c) + ' ÷ ' + P(d) + ' = ' + M(qq), M(p) + ' − ' + P(qq) + ' = ' + M(p - qq)] };
    }
    const a = R(2, 5), b = R(2, 5), c = NZ(-4, 4), v = -(a * a) + b * b * c;
    return { q: '−' + a + '² + (−' + b + ')² × ' + P(c) + ' を 計算しよう', type: 'num', a: v,
      steps: ['−' + a + '² = −(' + a + '×' + a + ') = ' + M(-a * a) + '  (² は ' + a + ' だけに かかる)', '(−' + b + ')² = ' + (b * b) + '  (かっこ ごと 2回 かける)', (b * b) + ' × ' + P(c) + ' = ' + M(b * b * c), M(-a * a) + ' + ' + P(b * b * c) + ' = ' + M(v)] };
  });
  add('c1', 'c1b', '🔤', '文字式の 値 (代入)', ['文字に 数を 入れる ときは かっこを つける', 'x² は x × x、 −x² は −(x × x)'], () => {
    const x = NZ(-5, 5), y = NZ(-4, 4), a = NZ(-5, 5), b = NZ(-4, 4), v = a * x + b * y * y;
    return { q: 'x = ' + M(x) + '、y = ' + M(y) + ' の とき、' + lin(a, b, 'x', 'y²') + ' の 値は?', type: 'num', a: v,
      steps: [a + ' × ' + P(x) + ' = ' + M(a * x), 'y² = ' + P(y) + '² = ' + (y * y) + ' → ' + M(b) + ' × ' + (y * y) + ' = ' + M(b * y * y), M(a * x) + ' + ' + P(b * y * y) + ' = ' + M(v)] };
  });
  add('c1', 'c1c', '⚖', '一次方程式', ['x の 項を 左、数を 右へ 移項 (符号が 変わる)', '分数が あるときは 分母の 最小公倍数を かけて 分母を はらう', '最後に x の 係数で わる'], () => {
    if (Math.random() < 0.55) {
      const x = NZ(-9, 9); let a = NZ(-7, 7), c = NZ(-7, 7); while (c === a) c = NZ(-7, 7);
      const b = R(-15, 15), d = a * x + b - c * x;
      return { q: poly([a, b]) + ' = ' + poly([c, d]) + '  を 解こう。x = ?', type: 'num', a: x,
        steps: ['移項: ' + poly([a]) + 'x − ' + P(c) + 'x = ' + M(d) + ' − ' + P(b), poly([a - c, 0]) + ' = ' + M(d - b), 'x = ' + M(d - b) + ' ÷ ' + P(a - c) + ' = ' + M(x)] };
    }
    const x = NZ(-9, 9), p = R(2, 5); let q = R(2, 6); while (q === p) q = R(2, 6);
    const k = NZ(-4, 4), a = p * k - x, b = x - q * k;
    const L = '(x ' + (a < 0 ? '− ' + (-a) : '+ ' + a) + ')/' + p, Rr = '(x ' + (b > 0 ? '− ' + b : '+ ' + (-b)) + ')/' + q;
    const l = p * q / gcd(p, q);
    return { q: L + ' = ' + Rr + '  を 解こう。x = ?', type: 'num', a: x,
      steps: ['両辺に ' + l + ' (分母の 最小公倍数) を かける: ' + (l / p) + '(x ' + (a < 0 ? '− ' + (-a) : '+ ' + a) + ') = ' + (l / q) + '(x ' + (b > 0 ? '− ' + b : '+ ' + (-b)) + ')', '展開して 移項: ' + poly([l / p - l / q, 0]) + ' = ' + M(-(l / q) * b - (l / p) * a), 'x = ' + M(x)] };
  });
  add('c1', 'c1d', '📉', '比例・反比例', ['比例 y = ax (a: 比例定数)、 反比例 y = a/x', '反比例では xy = a (一定)', 'まず a を 求めてから、求めたい 値を 出す'], () => {
    if (Math.random() < 0.5) {
      const a = NZ(-6, 6), x1 = NZ(-6, 6), x2 = NZ(-9, 9);
      return { q: 'y は x に 比例し、x = ' + M(x1) + ' の とき y = ' + M(a * x1) + '。x = ' + M(x2) + ' の とき y = ?', type: 'num', a: a * x2,
        steps: ['y = ax に 代入: ' + M(a * x1) + ' = a × ' + P(x1) + ' → a = ' + M(a), 'y = ' + M(a) + ' × ' + P(x2) + ' = ' + M(a * x2)] };
    }
    const k = pick([12, 18, 24, 36, -12, -24, 30, 48]), divs = []; for (let i = -12; i <= 12; i++) if (i && k % i === 0) divs.push(i);
    const x1 = pick(divs), x2 = pick(divs.filter(d => d !== x1));
    return { q: 'y は x に 反比例し、x = ' + M(x1) + ' の とき y = ' + M(k / x1) + '。x = ' + M(x2) + ' の とき y = ?', type: 'num', a: k / x2,
      steps: ['a = xy = ' + P(x1) + ' × ' + P(k / x1) + ' = ' + M(k), 'y = ' + M(k) + ' ÷ ' + P(x2) + ' = ' + M(k / x2)] };
  });
  add('c1', 'c1e', '🍕', 'おうぎ形 (π を 使う)', ['弧の 長さ = 2πr × 中心角/360', '面積 = πr² × 中心角/360', '答えは「□π」の □ を 入れよう (分数も OK)'], () => {
    const r = pick([3, 4, 5, 6, 8, 9, 10, 12]), t = pick([30, 45, 60, 72, 90, 120, 135, 150, 240, 270]);
    if (Math.random() < 0.5) { const v = fr(2 * r * t, 360);
      return { q: '半径 ' + r + 'cm、中心角 ' + t + '° の おうぎ形の 弧の 長さは □π cm。□ は?', type: 'num', a: v, steps: ['2π × ' + r + ' × ' + t + '/360', '= ' + fs(v) + 'π cm'] }; }
    const v = fr(r * r * t, 360);
    return { q: '半径 ' + r + 'cm、中心角 ' + t + '° の おうぎ形の 面積は □π cm²。□ は?', type: 'num', a: v, steps: ['π × ' + r + '² × ' + t + '/360', '= ' + (r * r) + ' × ' + t + '/360 π = ' + fs(v) + 'π cm²'] };
  });
  add('c1', 'c1f', '📊', '代表値 (平均・中央値・最頻値・範囲)', ['中央値: 小さい 順に 並べた まん中 (偶数個なら まん中 2つの 平均)', '最頻値: いちばん 多く 出てくる 値', '範囲 = 最大値 − 最小値'], () => {
    const n = pick([7, 9]); const xs = Array.from({ length: n }, () => R(1, 20)); xs[R(0, n - 1)] = xs[0]; const s = xs.slice().sort((a, b) => a - b);
    const kind = pick(['med', 'rng', 'mode']);
    if (kind === 'mode') { const cnt = {}; s.forEach(v => cnt[v] = (cnt[v] || 0) + 1); const mx = Math.max(...Object.values(cnt)); const modes = Object.keys(cnt).filter(k => cnt[k] === mx); if (modes.length > 1) { xs.push(+modes[0]); s.push(+modes[0]); s.sort((a, b) => a - b); } }
    const med = s[(s.length - 1) / 2] !== undefined && s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
    const cnt = {}; s.forEach(v => cnt[v] = (cnt[v] || 0) + 1); const mode = +Object.keys(cnt).reduce((a, b) => cnt[b] > cnt[a] ? b : a);
    const v = kind === 'med' ? med : kind === 'rng' ? s[s.length - 1] - s[0] : mode;
    return { q: 'データ: ' + xs.join(', ') + '\nこの データの ' + { med: '中央値', rng: '範囲', mode: '最頻値' }[kind] + 'は?', type: 'num', a: v,
      steps: ['小さい 順: ' + s.join(', '), kind === 'med' ? (s.length % 2 ? (s.length + 1) / 2 + '番目 = ' + v : 'まん中 2つの 平均 = ' + v) : kind === 'rng' ? s[s.length - 1] + ' − ' + s[0] + ' = ' + v : mode + ' が ' + cnt[mode] + '回 で いちばん 多い'] };
  });

  // ======================= 中2 =======================
  add('c2', 'c2a', '🧮', '式の 計算 (多項式)', ['分配法則で かっこを はずす: −2(a − 4b) = −2a + 8b', '同類項 (同じ 文字) どうしを まとめる'], () => {
    const p = NZ(-4, 5), q = NZ(-5, 5), r = NZ(-5, 5), s = NZ(-5, 5), t = NZ(-4, 4);
    const A = p * q + t * r, B = p * s * 0 + t * s; // p(qa) + t(ra + sb)
    const b0 = NZ(-5, 5), B2 = p * b0 + t * s;
    const right = lin(A, B2);
    return { q: M(p) + '(' + lin(q, b0) + ') ' + (t < 0 ? '− ' + (-t) : '+ ' + t) + '(' + lin(r, s) + ') を 計算しよう', type: 'choice', a: 0,
      opts: choices(right, [lin(A, p * b0 - t * s), lin(p * q - t * r, B2), lin(A + t, B2), lin(q + r, b0 + s)]),
      steps: ['かっこを はずす: ' + lin(p * q, p * b0) + ' ' + (t * r < 0 ? '' : '+ ') + lin(t * r, t * s).replace(/^−/, '− '), 'a の 項: ' + M(p * q) + ' + ' + P(t * r) + ' = ' + M(A) + '、 b の 項: ' + M(p * b0) + ' + ' + P(t * s) + ' = ' + M(B2), '= ' + right] };
  });
  add('c2', 'c2b', '🔗', '連立方程式', ['加減法: 片方の 文字の 係数を そろえて ひく (たす)', '代入法: 1つの 式を x = … に して もう一方へ 代入', '出た 答えを 元の 式に 入れて 確かめる'], () => {
    const x = NZ(-6, 6), y = NZ(-6, 6); let a1, b1, a2, b2; do { a1 = NZ(-5, 5); b1 = NZ(-5, 5); a2 = NZ(-5, 5); b2 = NZ(-5, 5); } while (a1 * b2 - a2 * b1 === 0);
    const c1 = a1 * x + b1 * y, c2 = a2 * x + b2 * y, D = a1 * b2 - a2 * b1;
    const eq = (a, b, c) => lin(a, b, 'x', 'y') + ' = ' + M(c);
    return { q: '{ ' + eq(a1, b1, c1) + '\n{ ' + eq(a2, b2, c2) + '\nを 解こう。', type: 'pair', labels: ['x', 'y'], a: [x, y],
      steps: ['y を 消す: 上の 式 × ' + P(b2) + '、下の 式 × ' + P(b1) + ' を して ひく', '(' + M(a1 * b2) + ' − ' + P(a2 * b1) + ')x = ' + M(c1 * b2) + ' − ' + P(c2 * b1) + ' → ' + M(D) + 'x = ' + M(D * x) + ' → x = ' + M(x), 'x = ' + M(x) + ' を 上の 式に 代入: ' + M(a1 * x) + ' + ' + P(b1) + 'y = ' + M(c1) + ' → y = ' + M(y)] };
  });
  add('c2', 'c2c', '📈', '一次関数 (2点を 通る 直線)', ['y = ax + b (a: 傾き = y の 増加量 ÷ x の 増加量、b: 切片)', '2点から 傾きを 求めて、1点を 代入して b を 出す'], () => {
    const a = NZ(-4, 4), b = R(-8, 8); let x1 = R(-5, 5), x2 = R(-5, 5); while (x2 === x1) x2 = R(-5, 5);
    return { q: '2点 (' + M(x1) + ', ' + M(a * x1 + b) + ')、(' + M(x2) + ', ' + M(a * x2 + b) + ') を 通る 直線 y = ax + b の a と b は?', type: 'pair', labels: ['a (傾き)', 'b (切片)'], a: [a, b],
      steps: ['傾き a = (' + M(a * x2 + b) + ' − ' + P(a * x1 + b) + ') ÷ (' + M(x2) + ' − ' + P(x1) + ') = ' + M(a * (x2 - x1)) + ' ÷ ' + P(x2 - x1) + ' = ' + M(a), '(' + M(x1) + ', ' + M(a * x1 + b) + ') を 代入: ' + M(a * x1 + b) + ' = ' + M(a) + ' × ' + P(x1) + ' + b → b = ' + M(b)] };
  });
  add('c2', 'c2d', '⬡', '多角形の 角', ['n角形の 内角の 和 = 180° × (n − 2)', '外角の 和は 何角形でも 360°', '正n角形の 1つの 外角 = 360° ÷ n'], () => {
    const n = pick([5, 6, 8, 9, 10, 12, 15, 18, 20]), kind = pick(['in', 'ext', 'n']);
    if (kind === 'n') return { q: '1つの 外角が ' + (360 / n) + '° の 正多角形は 正何角形?', type: 'num', a: n, steps: ['外角の 和 360° ÷ ' + (360 / n) + '° = ' + n] };
    if (kind === 'ext') return { q: '正' + n + '角形の 1つの 外角は 何度?', type: 'num', a: 360 / n, steps: ['360 ÷ ' + n + ' = ' + (360 / n)] };
    return { q: '正' + n + '角形の 1つの 内角は 何度?', type: 'num', a: 180 - 360 / n, steps: ['外角 = 360 ÷ ' + n + ' = ' + (360 / n) + '°', '内角 = 180 − ' + (360 / n) + ' = ' + (180 - 360 / n) + '°'] };
  });
  add('c2', 'c2e', '🎲', '確率 (サイコロ 2個)', ['すべての 出方は 6 × 6 = 36 通り (同様に 確からしい)', '表を かいて 数える', '「少なくとも 1つ」は 1 − (どちらも ちがう 確率) が 速い'], () => {
    const kind = pick(['sum', 'sum2', 'atleast', 'prodeven', 'same']); let cnt = 0, txt = '', stp = '';
    for (let a = 1; a <= 6; a++) for (let b = 1; b <= 6; b++) {
      if (kind === 'sum' && a + b === 7) cnt++; if (kind === 'sum2' && a + b >= 10) cnt++; if (kind === 'atleast' && (a === 6 || b === 6)) cnt++; if (kind === 'prodeven' && a * b % 2 === 0) cnt++; if (kind === 'same' && a === b) cnt++;
    }
    txt = { sum: '目の 和が 7 に なる', sum2: '目の 和が 10 以上 に なる', atleast: '少なくとも 1つは 6 の 目が 出る', prodeven: '目の 積が 偶数 に なる', same: '2つの 目が 同じ に なる' }[kind];
    stp = { sum: '(1,6)(2,5)(3,4)(4,3)(5,2)(6,1) の 6通り', sum2: '和10: 3通り、11: 2通り、12: 1通り → 6通り', atleast: 'どちらも 6 以外 = 5×5 = 25通り → 36 − 25 = 11通り', prodeven: '積が 奇数 = 両方 奇数 = 3×3 = 9通り → 36 − 9 = 27通り', same: '(1,1)〜(6,6) の 6通り' }[kind];
    const v = fr(cnt, 36);
    return { q: '大小 2つの サイコロを 投げる とき、' + txt + ' 確率は? (分数で、例: 1/6)', type: 'num', a: v, steps: [stp, cnt + '/36' + (fs(v) === cnt + '/36' ? '' : ' = ' + fs(v))] };
  });

  // ======================= 中3 =======================
  add('c3', 'c3a', '✖', '展開', ['(x + a)(x + b) = x² + (a + b)x + ab', '(a + b)² = a² + 2ab + b²、 (a + b)(a − b) = a² − b²', 'ax + b の 形は 各項を すべて かけ合わせる'], () => {
    const a = NZ(-3, 3), b = NZ(-7, 7), c = NZ(-3, 3), d = NZ(-7, 7);
    const A = a * c, B = a * d + b * c, Cc = b * d;
    return { q: '(' + poly([a, b]) + ')(' + poly([c, d]) + ') を 展開しよう', type: 'choice', a: 0,
      opts: choices(poly([A, B, Cc]), [poly([A, a * d - b * c, Cc]), poly([A, B, -Cc]), poly([A, 0, Cc]), poly([A, B + 1, Cc])]),
      steps: [poly([a]).replace(/^1$/, '') + 'x × ' + poly([c]).replace(/^1$/, '') + 'x = ' + poly([A, 0, 0]), '外側 + 内側: ' + M(a * d) + 'x + ' + P(b * c) + 'x = ' + poly([B, 0]), M(b) + ' × ' + P(d) + ' = ' + M(Cc), '= ' + poly([A, B, Cc])] };
  });
  add('c3', 'c3b', '🧩', '因数分解', ['x² + px + q → たして p、かけて q に なる 2数を 探す', 'a² − b² = (a + b)(a − b)', 'まず 共通因数で くくれないか 確かめる'], () => {
    if (Math.random() < 0.7) {
      const m = NZ(-9, 9), n = NZ(-9, 9), f = (u, w) => '(x ' + (u < 0 ? '− ' + (-u) : '+ ' + u) + ')(x ' + (w < 0 ? '− ' + (-w) : '+ ' + w) + ')';
      return { q: poly([1, m + n, m * n]) + ' を 因数分解しよう', type: 'choice', a: 0, opts: choices(f(m, n), [f(-m, -n), f(m, -n), f(-m, n), f(m + n, 1)]),
        steps: ['たして ' + M(m + n) + '、かけて ' + M(m * n) + ' の 2数 → ' + M(m) + ' と ' + M(n), '= ' + f(m, n)] };
    }
    const a = R(2, 9), k = R(1, 3); const sq2 = k === 1 ? 'x²' : (k * k) + 'x²';
    const r = '(' + (k === 1 ? '' : k) + 'x + ' + a + ')(' + (k === 1 ? '' : k) + 'x − ' + a + ')';
    return { q: sq2 + ' − ' + (a * a) + ' を 因数分解しよう', type: 'choice', a: 0, opts: choices(r, ['(' + (k === 1 ? '' : k) + 'x − ' + a + ')²', '(' + (k === 1 ? '' : k) + 'x + ' + a + ')²', '(' + (k === 1 ? '' : k) + 'x − ' + (a * a) + ')(' + (k === 1 ? '' : k) + 'x + 1)']),
      steps: [sq2 + ' = (' + (k === 1 ? '' : k) + 'x)²、' + (a * a) + ' = ' + a + '²', 'a² − b² = (a + b)(a − b) → ' + r] };
  });
  add('c3', 'c3c', '√', '平方根の 計算', ['√(a²b) = a√b (中の 平方数を 外へ 出す)', '√a × √b = √(ab)', '分母の √ は 有理化: a/√b = a√b/b'], () => {
    const kind = pick(['simp', 'mul', 'add']);
    if (kind === 'simp') { const o = R(2, 6), i = pick([2, 3, 5, 6, 7]); const n = o * o * i;
      return { q: '√' + n + ' を 簡単に しよう (a√b の 形)', type: 'choice', a: 0, opts: choices(rt(o, i), [rt(i, o), rt(o * o, i), rt(o, i * 2), rt(o + 1, i)]), steps: [n + ' = ' + (o * o) + ' × ' + i + ' = ' + o + '² × ' + i, '√' + n + ' = ' + rt(o, i)] }; }
    if (kind === 'mul') { const a = pick([2, 3, 6, 5]), b = pick([6, 8, 10, 12, 15, 18]); const [o, i] = sq(a * b);
      return { q: '√' + a + ' × √' + b + ' を 計算しよう', type: 'choice', a: 0, opts: choices(rt(o, i), [rt(1, a + b), rt(i, o), rt(o + 1, i), rt(o, a * b)]), steps: ['√' + a + ' × √' + b + ' = √' + (a * b), '√' + (a * b) + ' = ' + rt(o, i)] }; }
    const i = pick([2, 3, 5]), p = R(2, 5), q = R(2, 5), r2 = R(1, 4), A = p * p * i, B = q * q * i, sgn = pick([1, -1]); const tot = p + sgn * q;
    return { q: '√' + A + (sgn > 0 ? ' + ' : ' − ') + '√' + B + ' を 計算しよう', type: 'choice', a: 0, opts: choices(tot === 0 ? '0' : (tot < 0 ? '−' : '') + rt(Math.abs(tot), i), [rt(1, A + sgn * B > 0 ? A + sgn * B : A + B), rt(p * q, i), rt(p + q + 1, i), (tot < 0 ? '' : '−') + rt(Math.abs(tot) || 1, i)]),
      steps: ['√' + A + ' = ' + rt(p, i) + '、√' + B + ' = ' + rt(q, i), '√' + i + ' を ひとまとまりに 見て ' + p + (sgn > 0 ? ' + ' : ' − ') + q + ' = ' + tot + ' → ' + (tot === 0 ? '0' : (tot < 0 ? '−' : '') + rt(Math.abs(tot), i))] };
  });
  add('c3', 'c3d', '✌', '二次方程式', ['因数分解できれば (x − m)(x − n) = 0 → x = m, n', 'できなければ 解の公式 x = (−b ± √(b² − 4ac)) / 2a', 'x² + 2px + q = 0 は x = −p ± √(p² − q) が 速い'], () => {
    if (Math.random() < 0.55) { const m = NZ(-9, 9), n = R(-9, 9);
      return { q: poly([1, -(m + n), m * n]) + ' = 0 を 解こう (解を 2つ、重解なら 同じ 数を 2つ)', type: 'set', a: [m, n], steps: ['たして ' + M(-(m + n)) + '、かけて ' + M(m * n) + ' → (x ' + (m < 0 ? '+ ' + (-m) : '− ' + m) + ')(x ' + (n < 0 ? '+ ' + (-n) : '− ' + n) + ') = 0', 'x = ' + M(m) + ', ' + M(n)] }; }
    let p, q, D; do { p = NZ(-5, 5); q = R(-10, 10); D = p * p - q; } while (D <= 1 || Number.isInteger(Math.sqrt(D)));
    const [o, i] = sq(D), r = (p ? M(-p) + ' ' : '') + '± ' + rt(o, i);
    return { q: poly([1, 2 * p, q]) + ' = 0 を 解こう', type: 'choice', a: 0, opts: choices('x = ' + r, ['x = ' + (p ? M(p) + ' ' : '') + '± ' + rt(o, i), 'x = ' + (p ? M(-p) + ' ' : '') + '± ' + rt(1, D + 2 * Math.abs(q) || 2), 'x = ' + (p ? M(-2 * p) + ' ' : '') + '± ' + rt(o, i)]),
      steps: ['x² + 2px + q = 0 で p = ' + M(p) + '、q = ' + M(q), 'x = −p ± √(p² − q) = ' + M(-p) + ' ± √' + D, (o > 1 ? '√' + D + ' = ' + rt(o, i) + ' → ' : '') + 'x = ' + r] };
  });
  add('c3', 'c3e', '🏹', '関数 y = ax²', ['変化の 割合 = (y の 増加量) ÷ (x の 増加量) = a(p + q)', 'y = ax² の グラフは 放物線。a > 0 で 上に 開く'], () => {
    const a = pick([1, 2, 3, -1, -2, 1 / 2]), p = R(-4, 3), q = p + R(1, 4);
    const yp = a * p * p, yq = a * q * q, v = a * (p + q);
    const af = a === 0.5 ? '1/2' : M(a);
    return { q: 'y = ' + (a === 1 ? '' : a === -1 ? '−' : af) + 'x² で、x が ' + M(p) + ' から ' + M(q) + ' まで 増える ときの 変化の 割合は?', type: 'num', a: Number.isInteger(v) ? v : fr(v * 2, 2),
      steps: ['x = ' + M(p) + ' → y = ' + M(yp) + '、x = ' + M(q) + ' → y = ' + M(yq), '(' + M(yq) + ' − ' + P(yp) + ') ÷ (' + M(q) + ' − ' + P(p) + ') = ' + M(v), '近道: a(p + q) = ' + af + ' × ' + P(p + q) + ' = ' + M(v)] };
  });
  add('c3', 'c3f', '📐', '三平方の 定理', ['直角三角形で a² + b² = c² (c は 斜辺)', '座標の 2点間の 距離 = √((x₂ − x₁)² + (y₂ − y₁)²)', 'よく 出る 組: 3-4-5、5-12-13、8-15-17'], () => {
    const t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [6, 8, 10], [9, 12, 15], [20, 21, 29]]), kind = pick(['hyp', 'leg', 'dist']);
    if (kind === 'hyp') return { q: '直角を はさむ 2辺が ' + t[0] + 'cm と ' + t[1] + 'cm の 直角三角形の 斜辺は 何cm?', type: 'num', a: t[2], steps: [t[0] + '² + ' + t[1] + '² = ' + (t[0] * t[0]) + ' + ' + (t[1] * t[1]) + ' = ' + (t[2] * t[2]), '√' + (t[2] * t[2]) + ' = ' + t[2]] };
    if (kind === 'leg') return { q: '斜辺 ' + t[2] + 'cm、1辺 ' + t[0] + 'cm の 直角三角形の 残りの 辺は 何cm?', type: 'num', a: t[1], steps: [t[2] + '² − ' + t[0] + '² = ' + (t[2] * t[2] - t[0] * t[0]), '√' + (t[1] * t[1]) + ' = ' + t[1]] };
    const x1 = R(-5, 5), y1 = R(-5, 5), sx = pick([1, -1]), sy = pick([1, -1]);
    return { q: '2点 A(' + M(x1) + ', ' + M(y1) + ')、B(' + M(x1 + sx * t[0]) + ', ' + M(y1 + sy * t[1]) + ') の 距離は?', type: 'num', a: t[2], steps: ['x の 差 ' + t[0] + '、y の 差 ' + t[1], '√(' + t[0] + '² + ' + t[1] + '²) = √' + (t[2] * t[2]) + ' = ' + t[2]] };
  });
  add('c3', 'c3g', '🔺', '相似 (面積比・体積比)', ['相似比 m : n なら 面積比 m² : n²、体積比 m³ : n³'], () => {
    let m = R(1, 4), n = m + R(1, 3); while (gcd(m, n) !== 1) n++; const k = R(1, 5);
    if (Math.random() < 0.5) return { q: '相似比 ' + m + ' : ' + n + ' の 2つの 三角形。小さい 方の 面積が ' + (m * m * k) + 'cm² の とき、大きい 方の 面積は?', type: 'num', a: n * n * k, steps: ['面積比 = ' + (m * m) + ' : ' + (n * n), (m * m * k) + ' × ' + (n * n) + '/' + (m * m) + ' = ' + (n * n * k)] };
    return { q: '相似比 ' + m + ' : ' + n + ' の 2つの 立体。小さい 方の 体積が ' + (m * m * m * k) + 'cm³ の とき、大きい 方の 体積は?', type: 'num', a: n * n * n * k, steps: ['体積比 = ' + (m ** 3) + ' : ' + (n ** 3), (m ** 3 * k) + ' × ' + (n ** 3) + '/' + (m ** 3) + ' = ' + (n ** 3 * k)] };
  });

  // ======================= 高1 数学I =======================
  add('h1', 'h1a', '⛰', '二次関数の 頂点 (平方完成)', ['y = a(x − p)² + q の 頂点は (p, q)', '平方完成: x² + bx = (x + b/2)² − (b/2)²', 'a ≠ 1 なら まず a で くくる'], () => {
    const a = pick([1, 1, 2, -1, 3, -2]), p = NZ(-5, 5), q = R(-9, 9), b = -2 * a * p, c = a * p * p + q;
    return { q: 'y = ' + poly([a, b, c]) + ' の 頂点の 座標は?', type: 'pair', labels: ['x 座標', 'y 座標'], a: [p, q],
      steps: [a !== 1 ? 'a で くくる: y = ' + M(a) + '(x² ' + (b / a < 0 ? '− ' + (-b / a) : '+ ' + b / a) + 'x) ' + (c < 0 ? '− ' + (-c) : '+ ' + c) : 'x² の 係数は 1', '平方完成: y = ' + (a === 1 ? '' : M(a)) + '(x ' + (p < 0 ? '+ ' + (-p) : '− ' + p) + ')² ' + (q < 0 ? '− ' + (-q) : '+ ' + q), '頂点 (' + M(p) + ', ' + M(q) + ')'] };
  });
  add('h1', 'h1b', '🎢', '二次関数の 最大・最小 (定義域あり)', ['頂点が 定義域の 中に あるか どうかを まず 確かめる', '下に 凸 (a > 0): 最小は 頂点 or 端、最大は 頂点から 遠い 端'], () => {
    const p = R(-3, 3), q = R(-6, 6), s = R(-4, 2), t = s + R(2, 5), f = x => (x - p) * (x - p) + q, kind = pick(['min', 'max']);
    let v, why;
    if (kind === 'min') { if (p < s) { v = f(s); why = '頂点 x = ' + M(p) + ' は 定義域の 左外 → x = ' + M(s) + ' で 最小'; } else if (p > t) { v = f(t); why = '頂点は 定義域の 右外 → x = ' + M(t) + ' で 最小'; } else { v = q; why = '頂点 x = ' + M(p) + ' が 定義域内 → 最小値は 頂点の y = ' + M(q); } }
    else { v = Math.max(f(s), f(t)); why = '頂点から 遠い 端で 最大: f(' + M(s) + ') = ' + M(f(s)) + '、f(' + M(t) + ') = ' + M(f(t)); }
    return { q: 'y = ' + poly([1, -2 * p, p * p + q]) + ' (' + M(s) + ' ≦ x ≦ ' + M(t) + ') の ' + (kind === 'min' ? '最小値' : '最大値') + 'は?', type: 'num', a: v,
      steps: ['平方完成: y = (x ' + (p < 0 ? '+ ' + (-p) : '− ' + p) + ')² ' + (q < 0 ? '− ' + (-q) : '+ ' + q) + ' → 頂点 (' + M(p) + ', ' + M(q) + ')', why, '答え ' + M(v)] };
  });
  add('h1', 'h1c', '↔', '二次不等式', ['(x − α)(x − β) < 0 (α < β) → α < x < β (間)', '(x − α)(x − β) > 0 → x < α, β < x (外側)', 'グラフ (放物線) が x軸の 下か 上かで 考える'], () => {
    let m = R(-6, 5), n = m + R(1, 6); const lt = Math.random() < 0.5;
    const r = lt ? M(m) + ' < x < ' + M(n) : 'x < ' + M(m) + ', ' + M(n) + ' < x';
    const w = lt ? 'x < ' + M(m) + ', ' + M(n) + ' < x' : M(m) + ' < x < ' + M(n);
    return { q: poly([1, -(m + n), m * n]) + (lt ? ' < 0' : ' > 0') + ' を 解こう', type: 'choice', a: 0, opts: choices(r, [w, lt ? M(-n) + ' < x < ' + M(-m) : 'x < ' + M(-n) + ', ' + M(-m) + ' < x', lt ? 'x < ' + M(n) : 'x > ' + M(m)]),
      steps: ['因数分解: ' + fac(m) + fac(n) + (lt ? ' < 0' : ' > 0'), lt ? '放物線が x軸より 下 = 2つの 解の 間' : '放物線が x軸より 上 = 2つの 解の 外側', r] };
  });
  add('h1', 'h1d', '📐', '三角比 (有名角)', ['30°・45°・60° の 直角三角形の 辺の 比を 覚える (1:√3:2、1:1:√2)', '鈍角は 180° − θ を 使う: sin(180° − θ) = sinθ、cos(180° − θ) = −cosθ', 'tanθ = sinθ / cosθ'], () => {
    const T = { 0: ['0', '1', '0'], 30: ['1/2', '√3/2', '1/√3'], 45: ['1/√2', '1/√2', '1'], 60: ['√3/2', '1/2', '√3'], 90: ['1', '0', null], 120: ['√3/2', '−1/2', '−√3'], 135: ['1/√2', '−1/√2', '−1'], 150: ['1/2', '−√3/2', '−1/√3'], 180: ['0', '−1', '0'] };
    let th, f; do { th = pick([30, 45, 60, 120, 135, 150, 0, 90, 180]); f = R(0, 2); } while (T[th][f] === null);
    const nm = ['sin', 'cos', 'tan'][f], right = T[th][f], pool = ['0', '1', '−1', '1/2', '−1/2', '√3/2', '−√3/2', '1/√2', '−1/√2', '√3', '−√3', '1/√3', '−1/√3'].filter(x => x !== right);
    const ws = []; while (ws.length < 3) { const w = pick(pool); if (ws.indexOf(w) < 0) ws.push(w); }
    return { q: nm + ' ' + th + '° の 値は?', type: 'choice', a: 0, opts: choices(right, ws), steps: [th > 90 && th < 180 ? th + '° = 180° − ' + (180 - th) + '° (第2象限: sin は +、cos・tan は −)' : th % 90 === 0 ? '単位円で 角 ' + th + '° の 点の 座標 (cos, sin) を 読む' : th + '° の 直角三角形の 辺の 比で 考える', nm + ' ' + th + '° = ' + right] };
  });
  add('h1', 'h1e', '🔺', '余弦定理', ['a² = b² + c² − 2bc cosA', 'A = 60° なら a² = b² + c² − bc、A = 120° なら a² = b² + c² + bc'], () => {
    const L = [[8, 5, 60, 7], [5, 8, 60, 7], [8, 3, 60, 7], [15, 8, 60, 13], [8, 15, 60, 13], [3, 5, 120, 7], [7, 8, 120, 13], [5, 16, 120, 19], [6, 10, 120, 14], [16, 10, 60, 14]];
    const [b, c, A, a] = pick(L);
    return { q: '△ABC で b = ' + b + '、c = ' + c + '、A = ' + A + '° の とき、a は?', type: 'num', a: a,
      steps: ['a² = ' + b + '² + ' + c + '² − 2·' + b + '·' + c + '·cos' + A + '°', 'cos' + A + '° = ' + (A === 60 ? '1/2' : '−1/2') + ' → a² = ' + (b * b) + ' + ' + (c * c) + (A === 60 ? ' − ' : ' + ') + (b * c) + ' = ' + (a * a), 'a = ' + a] };
  });
  add('h1', 'h1f', '📉', 'データの 分析 (分散)', ['分散 = (各値 − 平均)² の 平均', '別の 求め方: 分散 = (2乗の 平均) − (平均)²', '標準偏差 = √分散 (ばらつきの 大きさ)'], () => {
    const n = 5, m = R(4, 12); let xs; do { xs = Array.from({ length: n }, () => m + R(-4, 4)); } while (xs.reduce((a, b) => a + b, 0) !== m * n);
    const v = xs.reduce((a, x) => a + (x - m) * (x - m), 0);
    return { q: 'データ ' + xs.join(', ') + ' の 分散は? (平均は ' + m + ')', type: 'num', a: fr(v, n),
      steps: ['偏差: ' + xs.map(x => M(x - m)).join(', '), '偏差の 2乗の 和 = ' + xs.map(x => (x - m) * (x - m)).join(' + ') + ' = ' + v, '分散 = ' + v + ' ÷ ' + n + ' = ' + fs(fr(v, n))] };
  });

  // ======================= 高1 数学A =======================
  add('hA', 'hAa', '🔢', '順列・組合せ', ['順列 nPr = n(n−1)…(n−r+1) (並べる)', '組合せ nCr = nPr ÷ r! (選ぶだけ)', '円順列 (n − 1)!、 重複順列 nʳ'], () => {
    const kind = pick(['P', 'C', 'circ', 'rep', 'C2']);
    if (kind === 'P') { const n = R(5, 9), r = R(2, 4); let v = 1; for (let i = 0; i < r; i++) v *= n - i; return { q: n + '人の 中から 委員長・副委員長・書記' + (r === 4 ? '・会計' : r === 2 ? '' : '') + ' を ' + r + '人 選ぶ (役職あり) 方法は 何通り?'.replace('委員長・副委員長・書記 を 2人', '委員長と 副委員長を 1人ずつ'), type: 'num', a: v, steps: ['役職が ある = 並べ方 → ' + n + 'P' + r, Array.from({ length: r }, (_, i) => n - i).join(' × ') + ' = ' + v] }; }
    if (kind === 'C') { const n = R(6, 10), r = R(2, 4); return { q: n + '人の 中から ' + r + '人の 代表を 選ぶ 方法は 何通り?', type: 'num', a: C(n, r), steps: [n + 'C' + r + ' = ' + Array.from({ length: r }, (_, i) => n - i).join('×') + ' ÷ ' + r + '!', '= ' + C(n, r)] }; }
    if (kind === 'circ') { const n = R(4, 7); return { q: n + '人が 円形の テーブルに 座る 方法は 何通り? (回転して 同じものは 1通り)', type: 'num', a: F(n - 1), steps: ['1人を 固定して 残りを 並べる: (' + n + ' − 1)!', '= ' + F(n - 1)] }; }
    if (kind === 'rep') { const n = R(2, 4), r = R(3, 5); return { q: n + '種類の 記号を 使って (同じ記号を 何回 使っても よい) ' + r + '文字の 列を 作る。何通り?', type: 'num', a: n ** r, steps: ['各 位置に ' + n + '通り → ' + n + '^' + r, '= ' + (n ** r)] }; }
    const a = R(3, 6), b = R(3, 6), x = R(1, 2), y = R(1, 2);
    return { q: '男子 ' + a + '人、女子 ' + b + '人から 男子 ' + x + '人・女子 ' + y + '人を 選ぶ 方法は?', type: 'num', a: C(a, x) * C(b, y), steps: [a + 'C' + x + ' = ' + C(a, x) + '、' + b + 'C' + y + ' = ' + C(b, y), '積の 法則: ' + C(a, x) + ' × ' + C(b, y) + ' = ' + C(a, x) * C(b, y)] };
  });
  add('hA', 'hAb', '🎯', '確率 (組合せを 使う)', ['確率 = (その ことが 起こる 場合の数) ÷ (すべての 場合の数)', '同時に 取り出す ときは 組合せ C で 数える', '余事象: 1 − (起こらない 確率)'], () => {
    const r = R(3, 6), w = R(2, 5), N = r + w, kind = pick(['rr', 'rw', 'atleast']);
    if (kind === 'rr') { const v = fr(C(r, 2), C(N, 2)); return { q: '赤玉 ' + r + '個、白玉 ' + w + '個の 袋から 同時に 2個 取り出す。2個とも 赤の 確率は?', type: 'num', a: v, steps: ['全体: ' + N + 'C2 = ' + C(N, 2), '赤2個: ' + r + 'C2 = ' + C(r, 2), C(r, 2) + '/' + C(N, 2) + ' = ' + fs(v)] }; }
    if (kind === 'rw') { const v = fr(r * w, C(N, 2)); return { q: '赤玉 ' + r + '個、白玉 ' + w + '個の 袋から 同時に 2個 取り出す。赤と 白が 1個ずつの 確率は?', type: 'num', a: v, steps: ['全体: ' + N + 'C2 = ' + C(N, 2), '赤1・白1: ' + r + ' × ' + w + ' = ' + (r * w), (r * w) + '/' + C(N, 2) + ' = ' + fs(v)] }; }
    const v = fr(C(N, 2) - C(r, 2), C(N, 2)); return { q: '赤玉 ' + r + '個、白玉 ' + w + '個の 袋から 同時に 2個 取り出す。少なくとも 1個 白の 確率は?', type: 'num', a: v, steps: ['余事象 = 2個とも 赤: ' + C(r, 2) + '/' + C(N, 2), '1 − ' + C(r, 2) + '/' + C(N, 2) + ' = ' + fs(v)] };
  });
  add('hA', 'hAc', '🔁', 'ユークリッドの 互除法', ['a を b で わった 余りを r と すると gcd(a, b) = gcd(b, r)', '余りが 0 に なる 直前の わる数が 最大公約数'], () => {
    const g = R(3, 29), a = g * R(11, 60), b = g * R(5, 40); if (a === b) return null;
    let x = Math.max(a, b), y = Math.min(a, b); const st = [];
    while (y) { st.push(x + ' = ' + y + ' × ' + Math.floor(x / y) + ' + ' + (x % y)); [x, y] = [y, x % y]; }
    return { q: a + ' と ' + b + ' の 最大公約数を 互除法で 求めよう', type: 'num', a: x, steps: st.concat(['余りが 0 → 最大公約数 = ' + x]) };
  });
  add('hA', 'hAd', '💻', 'n進法', ['2進法 1011₍₂₎ = 1×8 + 0×4 + 1×2 + 1×1 = 11', '10進法 → 2進法は 2で わり続けて 余りを 下から 読む'], () => {
    if (Math.random() < 0.5) { const base = pick([2, 2, 3, 5]), n = R(base === 2 ? 9 : 10, base === 2 ? 63 : 120), s = n.toString(base);
      return { q: s + '₍' + base + '₎ を 10進法で 表すと?', type: 'num', a: n, steps: [s.split('').map((d, i) => d + '×' + base + '^' + (s.length - 1 - i)).join(' + '), '= ' + n] }; }
    const n = R(9, 60), s = n.toString(2); const st = []; let k = n; while (k) { st.push(k + ' ÷ 2 = ' + Math.floor(k / 2) + ' 余り ' + (k % 2)); k = Math.floor(k / 2); }
    return { q: '10進法の ' + n + ' を 2進法で 表すと? (0 と 1 の 数字の 列で 入力)', type: 'num', a: +s, steps: st.concat(['余りを 下から 読む → ' + s]) };
  });

  // ======================= 高2 数学II =======================
  add('h2', 'h2a', '🚀', '指数 (指数法則・累乗根)', ['aᵐ × aⁿ = aᵐ⁺ⁿ、(aᵐ)ⁿ = aᵐⁿ', 'a⁰ = 1、a⁻ⁿ = 1/aⁿ', 'a^(m/n) = ⁿ√(aᵐ) (例: 8^(2/3) = (∛8)² = 4)'], () => {
    const kind = pick(['frac', 'neg', 'eq']);
    if (kind === 'frac') { const [b, n] = pick([[8, 3], [27, 3], [16, 4], [4, 2], [9, 2], [32, 5], [64, 3], [81, 4]]), m = R(1, 3), root = Math.round(Math.pow(b, 1 / n)), v = root ** m;
      return { q: b + '^(' + m + '/' + n + ') の 値は?', type: 'num', a: v, steps: [n + '乗根: ' + b + ' = ' + root + '^' + n + ' → ' + n + '√' + b + ' = ' + root, root + '^' + m + ' = ' + v] }; }
    if (kind === 'neg') { const b = pick([2, 3, 4, 5, 10]), n = R(1, 3); return { q: b + '^(−' + n + ') の 値は? (分数で)', type: 'num', a: [1, b ** n], steps: ['a⁻ⁿ = 1/aⁿ', '1/' + b + '^' + n + ' = 1/' + (b ** n)] }; }
    const b = pick([2, 3, 5]), x = R(2, 6), k = NZ(-2, 2);
    return { q: b + '^(x ' + (k < 0 ? '− ' + (-k) : '+ ' + k) + ') = ' + (b ** (x + k) >= 1 ? b ** (x + k) : '1/' + b ** -(x + k)) + ' を 満たす x は?', type: 'num', a: x, steps: ['右辺を ' + b + ' の 累乗に: ' + b + '^' + (x + k), 'x ' + (k < 0 ? '− ' + (-k) : '+ ' + k) + ' = ' + (x + k) + ' → x = ' + x] };
  });
  add('h2', 'h2b', '🪵', '対数', ['logₐb = c ⇔ aᶜ = b', 'logₐM + logₐN = logₐMN、logₐM − logₐN = logₐ(M/N)', 'logₐMᵏ = k logₐM'], () => {
    const kind = pick(['basic', 'sum', 'diff']);
    if (kind === 'basic') { const b = pick([2, 3, 5, 10]), e = R(-2, 5); const val = e >= 0 ? String(b ** e) : '1/' + (b ** -e);
      return { q: 'log' + '₍' + b + '₎ ' + val + ' の 値は?', type: 'num', a: e, steps: [val + ' = ' + b + '^' + M(e), 'よって log₍' + b + '₎ ' + val + ' = ' + M(e)] }; }
    const b = pick([2, 3, 6]), e = R(1, 4), x = pick([2, 3, 5, 7]);
    if (kind === 'sum') { const y = b ** e * 1; const p1 = x, p2 = (b ** e); if (gcd(p2, p1) !== 1 && p2 % p1 === 0) return null;
      return { q: 'log₍' + b + '₎ ' + (p2 * p1) + ' − log₍' + b + '₎ ' + p1 + ' の 値は?', type: 'num', a: e, steps: ['ひき算は わり算に: log₍' + b + '₎ (' + (p2 * p1) + ' ÷ ' + p1 + ') = log₍' + b + '₎ ' + p2, p2 + ' = ' + b + '^' + e + ' → ' + e] }; }
    const c = b ** e; const d1 = pick([2, 3, 4].filter(d => c % d === 0 || true)), m1 = x, m2 = fr(c, x);
    return { q: 'log₍' + b + '₎ ' + fs(m2) + ' + log₍' + b + '₎ ' + m1 + ' の 値は?', type: 'num', a: e, steps: ['たし算は かけ算に: log₍' + b + '₎ (' + fs(m2) + ' × ' + m1 + ') = log₍' + b + '₎ ' + c, c + ' = ' + b + '^' + e + ' → ' + e] };
  });
  add('h2', 'h2c', '🌀', '弧度法・三角関数', ['180° = π ラジアン', 'θ° = θ × π/180 ラジアン', '単位円で 角を 回して 座標 (cosθ, sinθ) を 読む'], () => {
    if (Math.random() < 0.6) { const d = pick([30, 45, 60, 90, 120, 135, 150, 210, 225, 240, 270, 300, 315, 330, 360]); const v = fr(d, 180);
      return { q: d + '° を 弧度法で 表すと □π。□ は? (分数で)', type: 'num', a: v, steps: [d + ' × π/180 = ' + fs(v) + 'π'] }; }
    const T = [['7π/6', 'sin', '−1/2'], ['5π/4', 'cos', '−1/√2'], ['4π/3', 'tan', '√3'], ['5π/3', 'sin', '−√3/2'], ['11π/6', 'cos', '√3/2'], ['3π/4', 'tan', '−1'], ['2π/3', 'cos', '−1/2'], ['7π/4', 'sin', '−1/√2']];
    const [ang, f, r] = pick(T), pool = ['1/2', '−1/2', '√3/2', '−√3/2', '1/√2', '−1/√2', '√3', '−√3', '1', '−1'].filter(x => x !== r);
    const ws = []; while (ws.length < 3) { const w = pick(pool); if (ws.indexOf(w) < 0) ws.push(w); }
    return { q: f + '(' + ang + ') の 値は?', type: 'choice', a: 0, opts: choices(r, ws), steps: ['単位円で ' + ang + ' の 位置を とる (第' + ({ '7π/6': 3, '5π/4': 3, '4π/3': 3, '5π/3': 4, '11π/6': 4, '3π/4': 2, '2π/3': 2, '7π/4': 4 })[ang] + '象限)', '基準の 角の 値に 象限の 符号を つける → ' + r] };
  });
  add('h2', 'h2d', '📈', '微分 (導関数の 値)', ['(xⁿ)′ = n xⁿ⁻¹、 定数の 微分は 0', 'f′(a) は x = a での 接線の 傾き'], () => {
    const a = NZ(-3, 3), b = R(-5, 5), c = R(-8, 8), d = R(-9, 9), k = R(-3, 3);
    const v = 3 * a * k * k + 2 * b * k + c;
    return { q: 'f(x) = ' + poly([a, b, c, d]) + ' の とき、f′(' + M(k) + ') は?', type: 'num', a: v,
      steps: ['f′(x) = ' + poly([3 * a, 2 * b, c]), 'f′(' + M(k) + ') = ' + M(3 * a) + '×' + P(k) + '² + ' + P(2 * b) + '×' + P(k) + ' + ' + P(c) + ' = ' + M(v)] };
  });
  add('h2', 'h2e', '📏', '接線の 方程式', ['y = f(x) の x = t での 接線: y − f(t) = f′(t)(x − t)', '傾き = f′(t)'], () => {
    const b = R(-6, 6), c = R(-6, 6), t = R(-3, 3), ft = t * t + b * t + c, m = 2 * t + b, n = ft - m * t;
    return { q: 'y = ' + poly([1, b, c]) + ' 上の 点 (' + M(t) + ', ' + M(ft) + ') に おける 接線 y = mx + n の m と n は?', type: 'pair', labels: ['m (傾き)', 'n (切片)'], a: [m, n],
      steps: ['y′ = ' + poly([2, b]) + ' → 傾き m = ' + M(m), 'y − ' + P(ft) + ' = ' + M(m) + '(x − ' + P(t) + ')', '整理: y = ' + poly([m, n])] };
  });
  add('h2', 'h2f', '∫', '定積分', ['∫xⁿ dx = xⁿ⁺¹/(n+1) + C', '∫ₐᵇ f(x) dx = F(b) − F(a)', '放物線と x軸で 囲まれた 面積にも 使う'], () => {
    const a = R(-3, 3), b = R(-4, 4), c = R(-5, 5), p = R(-2, 1), q = p + R(1, 3);
    // ∫ (a x² + b x + c) = a x³/3 + b x²/2 + c x → 분모 6
    const Fq6 = 2 * a * q ** 3 + 3 * b * q * q + 6 * c * q, Fp6 = 2 * a * p ** 3 + 3 * b * p * p + 6 * c * p, v = fr(Fq6 - Fp6, 6);
    if (!a && !b) return null;
    return { q: '∫ (' + M(p) + ' から ' + M(q) + ' まで) (' + poly([a, b, c]) + ') dx の 値は? (分数 OK)', type: 'num', a: v,
      steps: ['原始関数 F(x) = ' + [a ? cf(fr(a, 3)) + 'x³' : '', b ? cf(fr(b, 2)) + 'x²' : '', c ? cf(c) + 'x' : ''].filter(Boolean).join(' + ').replace(/\+ \(−/g, '+ (−'), 'F(' + M(q) + ') − F(' + M(p) + ') = ' + fs(fr(Fq6, 6)) + ' − ' + pf(fr(Fp6, 6)), '= ' + fs(v)] };
  });
  add('h2', 'h2g', '⭕', '円の 方程式', ['中心 (a, b)、半径 r の 円: (x − a)² + (y − b)² = r²', 'x² + y² + lx + my + n = 0 は 平方完成して 中心と 半径を 読む'], () => {
    const a = NZ(-5, 5), b = NZ(-5, 5), r = R(1, 6), l = -2 * a, m = -2 * b, n = a * a + b * b - r * r;
    return { q: 'x² + y² ' + (l < 0 ? '− ' + (-l) : '+ ' + l) + 'x ' + (m < 0 ? '− ' + (-m) : '+ ' + m) + 'y ' + (n < 0 ? '− ' + (-n) : n ? '+ ' + n : '') + ' = 0 の 中心の 座標は?', type: 'pair', labels: ['中心の x', '中心の y'], a: [a, b],
      steps: ['x で 平方完成: (x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + ')² − ' + (a * a), 'y で 平方完成: (y ' + (b < 0 ? '+ ' + (-b) : '− ' + b) + ')² − ' + (b * b), '(x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + ')² + (y ' + (b < 0 ? '+ ' + (-b) : '− ' + b) + ')² = ' + (r * r) + ' → 中心 (' + M(a) + ', ' + M(b) + ')、半径 ' + r] };
  });
  add('h2', 'h2h', 'ⅰ', '複素数', ['i² = −1', '(a + bi)(c + di) = (ac − bd) + (ad + bc)i', '実部と 虚部を それぞれ まとめる'], () => {
    const a = NZ(-5, 5), b = NZ(-5, 5), c = NZ(-5, 5), d = NZ(-5, 5), cx = (x, y) => '(' + M(x) + (y < 0 ? ' − ' + (y === -1 ? '' : -y) : ' + ' + (y === 1 ? '' : y)) + 'i)';
    return { q: cx(a, b) + cx(c, d) + ' = □ + □i。実部と 虚部は?', type: 'pair', labels: ['実部', '虚部'], a: [a * c - b * d, a * d + b * c],
      steps: ['展開: ' + M(a * c) + ' + ' + P(a * d) + 'i + ' + P(b * c) + 'i + ' + P(b * d) + 'i²', 'i² = −1 → 実部 ' + M(a * c) + ' − ' + P(b * d) + ' = ' + M(a * c - b * d), '虚部 ' + M(a * d) + ' + ' + P(b * c) + ' = ' + M(a * d + b * c)] };
  });

  // ======================= 高2 数学B·C =======================
  add('hB', 'hBa', '🪜', '等差数列', ['一般項 aₙ = a₁ + (n − 1)d', '和 Sₙ = n(a₁ + aₙ)/2'], () => {
    const a1 = R(-10, 10), d = NZ(-5, 6), n = R(8, 30), an = a1 + (n - 1) * d;
    if (Math.random() < 0.5) return { q: '初項 ' + M(a1) + '、公差 ' + M(d) + ' の 等差数列の 第' + n + '項は?', type: 'num', a: an, steps: ['aₙ = ' + M(a1) + ' + (' + n + ' − 1) × ' + P(d), '= ' + M(an)] };
    return { q: '初項 ' + M(a1) + '、公差 ' + M(d) + ' の 等差数列の 初項から 第' + n + '項までの 和は?', type: 'num', a: n * (a1 + an) / 2, steps: ['第' + n + '項 = ' + M(an), 'S = ' + n + ' × (' + M(a1) + ' + ' + P(an) + ') ÷ 2 = ' + M(n * (a1 + an) / 2)] };
  });
  add('hB', 'hBb', '📶', '等比数列', ['一般項 aₙ = a₁ rⁿ⁻¹', '和 Sₙ = a₁(rⁿ − 1)/(r − 1) (r ≠ 1)'], () => {
    const a1 = NZ(-3, 4), r = pick([2, 3, -2]), n = R(4, 7), an = a1 * r ** (n - 1), S = a1 * (r ** n - 1) / (r - 1);
    if (Math.random() < 0.5) return { q: '初項 ' + M(a1) + '、公比 ' + M(r) + ' の 等比数列の 第' + n + '項は?', type: 'num', a: an, steps: ['aₙ = ' + M(a1) + ' × ' + P(r) + '^' + (n - 1), '= ' + M(an)] };
    return { q: '初項 ' + M(a1) + '、公比 ' + M(r) + ' の 等比数列の 初項から 第' + n + '項までの 和は?', type: 'num', a: S, steps: ['S = ' + M(a1) + ' × (' + P(r) + '^' + n + ' − 1) ÷ (' + M(r) + ' − 1)', '= ' + M(a1) + ' × ' + M(r ** n - 1) + ' ÷ ' + M(r - 1) + ' = ' + M(S)] };
  });
  add('hB', 'hBc', 'Σ', 'Σ (シグマ) の 計算', ['Σk = n(n+1)/2、Σk² = n(n+1)(2n+1)/6、Σc = cn', 'Σ(ak + b) = aΣk + bn'], () => {
    const n = R(5, 20), a = NZ(-4, 5), b = R(-6, 6), kind = Math.random() < 0.6 ? 'lin' : 'sq';
    if (kind === 'lin') { const v = a * n * (n + 1) / 2 + b * n; return { q: 'Σ (k = 1 から ' + n + ') (' + poly([a, b], 'k') + ') の 値は?', type: 'num', a: v, steps: [M(a) + ' × ' + n + '·' + (n + 1) + '/2 = ' + M(a * n * (n + 1) / 2), M(b) + ' × ' + n + ' = ' + M(b * n), '合計 ' + M(v)] }; }
    const v = n * (n + 1) * (2 * n + 1) / 6; return { q: 'Σ (k = 1 から ' + n + ') k² の 値は?', type: 'num', a: v, steps: [n + '·' + (n + 1) + '·' + (2 * n + 1) + '/6', '= ' + v] };
  });
  add('hB', 'hBd', '➡', 'ベクトルの 内積', ['a⃗ = (a₁, a₂)、b⃗ = (b₁, b₂) の 内積 a⃗·b⃗ = a₁b₁ + a₂b₂', 'a⃗·b⃗ = |a⃗||b⃗|cosθ → 内積 0 は 垂直'], () => {
    if (Math.random() < 0.6) { const a1 = NZ(-6, 6), a2 = NZ(-6, 6), b1 = NZ(-6, 6), b2 = NZ(-6, 6); return { q: 'a⃗ = (' + M(a1) + ', ' + M(a2) + ')、b⃗ = (' + M(b1) + ', ' + M(b2) + ') の 内積 a⃗·b⃗ は?', type: 'num', a: a1 * b1 + a2 * b2, steps: [M(a1) + '×' + P(b1) + ' + ' + M(a2) + '×' + P(b2), '= ' + M(a1 * b1 + a2 * b2)] }; }
    const a1 = NZ(-5, 5), a2 = NZ(-5, 5), k = NZ(-3, 3), b1 = a2 * k, x = -a1 * k;   // (a1,a2)·(x, b?) — 垂直: a1*x + a2*y = 0 → choose b = (a2k, −a1k)
    return { q: 'a⃗ = (' + M(a1) + ', ' + M(a2) + ')、b⃗ = (' + M(b1) + ', t) が 垂直に なる t は?', type: 'num', a: x, steps: ['垂直 ⇔ 内積 = 0', M(a1) + '×' + P(b1) + ' + ' + M(a2) + 't = 0 → t = ' + M(x)] };
  });

  // ======================= 発展 (数学III) =======================
  add('h3', 'h3a', '∞', '極限', ['0/0 の 形は 因数分解して 約分', 'n → ∞ の 分数式は 最高次の 係数の 比', 'lim(x→0) sinx / x = 1'], () => {
    const kind = pick(['factor', 'inf', 'sin']);
    if (kind === 'factor') { const a = NZ(-5, 5), b = R(-5, 5); return { q: 'lim (x → ' + M(a) + ') (' + poly([1, b - a, -a * b]) + ') / (x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + ') は?', type: 'num', a: a + b, steps: ['分子 = (x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + ')(x ' + (b < 0 ? '− ' + (-b) : '+ ' + b) + ')', '約分 → x ' + (b < 0 ? '− ' + (-b) : '+ ' + b) + ' に x = ' + M(a) + ' を 代入 = ' + M(a + b)] }; }
    if (kind === 'inf') { const p = NZ(-6, 6), q = R(1, 5), r = R(-5, 5), s = R(-5, 5); const v = fr(p, q); return { q: 'lim (n → ∞) (' + poly([p, r, 1], 'n') + ') / (' + poly([q, s, 2], 'n') + ') は?', type: 'num', a: v, steps: ['分母・分子を n² で わる', 'n → ∞ で 1/n → 0 → ' + M(p) + '/' + q + ' = ' + fs(v)] }; }
    const a = R(2, 6), b = R(1, 5); const v = fr(a, b); return { q: 'lim (x → 0) sin(' + a + 'x) / (' + (b === 1 ? '' : b) + 'x) は?', type: 'num', a: v, steps: ['sin(' + a + 'x)/(' + (b === 1 ? '' : b) + 'x) = (' + a + '/' + b + ') × sin(' + a + 'x)/(' + a + 'x)', 'sinθ/θ → 1 → ' + fs(v)] };
  });

  const GROUPS = [
    { id: 'c1', name: '中学1年', color: '#3a8a5a' }, { id: 'c2', name: '中学2年', color: '#2e7aa8' }, { id: 'c3', name: '中学3年', color: '#5a5ab0' },
    { id: 'h1', name: '高校 数学I', color: '#b05a3a' }, { id: 'hA', name: '高校 数学A', color: '#a0702a' }, { id: 'h2', name: '高校 数学II', color: '#9a3a7a' },
    { id: 'hB', name: '高校 数学B・C', color: '#6a3aa0' }, { id: 'h3', name: '発展 (数学III)', color: '#3a3a3a' },
  ];
  function make(u) { let r = null; for (let i = 0; i < 60 && !r; i++) { try { r = u.gen(); } catch (e) { r = null; } } return r; }
  return { U: U, GROUPS: GROUPS, make: make, byId: id => U.find(u => u.id === id), _fs: fs };
})();
