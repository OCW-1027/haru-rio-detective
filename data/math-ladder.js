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

  // ======================= 追加 単元 (v2) =======================
  add('c1', 'c1g', '🧊', '空間図形 (体積・表面積)', ['角柱・円柱 V = 底面積 × 高さ、 角錐・円錐 V = ⅓ × 底面積 × 高さ', '球 V = ⁴⁄₃πr³、 S = 4πr²', '答えは「□π」の □ (分数 OK)'], () => {
    const kind = pick(['cyl', 'cone', 'ball', 'ballS']), r = R(2, 6), h = R(3, 9) ;
    if (kind === 'cyl') return { q: '底面の 半径 ' + r + 'cm、高さ ' + h + 'cm の 円柱の 体積は □π cm³。□ は?', type: 'num', a: r * r * h, steps: ['底面積 = π × ' + r + '² = ' + (r * r) + 'π', '× 高さ ' + h + ' = ' + (r * r * h) + 'π'] };
    if (kind === 'cone') { const v = fr(r * r * h, 3); return { q: '底面の 半径 ' + r + 'cm、高さ ' + h + 'cm の 円錐の 体積は □π cm³。□ は?', type: 'num', a: v, steps: ['⅓ × π × ' + r + '² × ' + h, '= ' + fs(v) + 'π'] }; }
    if (kind === 'ball') { const v = fr(4 * r ** 3, 3); return { q: '半径 ' + r + 'cm の 球の 体積は □π cm³。□ は?', type: 'num', a: v, steps: ['⁴⁄₃ × π × ' + r + '³ = ⁴⁄₃ × ' + (r ** 3) + 'π', '= ' + fs(v) + 'π'] }; }
    return { q: '半径 ' + r + 'cm の 球の 表面積は □π cm²。□ は?', type: 'num', a: 4 * r * r, steps: ['4 × π × ' + r + '²', '= ' + (4 * r * r) + 'π'] };
  });
  add('c1', 'c1h', '🚲', '方程式の 文章題', ['求めたい ものを x と おく', '「等しい 関係」を 見つけて 式に する', '答えが 問題に 合うか 確かめる'], () => {
    const kind = pick(['speed', 'share', 'age']);
    if (kind === 'speed') { const v1 = pick([60, 70, 80]), v2 = pick([180, 200, 210, 240]), t = R(4, 12), L = v1 * (t + R(5, 15)); const t0 = L / v1 - t; // 兄が 弟より t0 分 遅れて 出発し、追いつく
      const x = v1 * t0 / (v2 - v1); if (!Number.isInteger(x)) return null;
      return { q: '弟が 分速 ' + v1 + 'm で 家を 出た。' + t0 + '分後に 兄が 分速 ' + v2 + 'm で 追いかけた。兄は 出発して 何分後に 追いつく?', type: 'num', a: x, steps: ['兄が x分 走ると: ' + v2 + 'x = ' + v1 + '(x + ' + t0 + ')', (v2 - v1) + 'x = ' + (v1 * t0), 'x = ' + x] }; }
    if (kind === 'share') { const n = R(5, 12), per = R(3, 6), more = R(2, 9), less = R(1, 9), tot = per * n + more; // per 個ずつ → more 余る、(per+1)個ずつ → less 足りない ⇔ n = more + less
      const nn = more + less, total = per * nn + more;
      return { q: 'あめを 子どもに 配る。1人 ' + per + '個ずつ だと ' + more + '個 余り、1人 ' + (per + 1) + '個ずつ だと ' + less + '個 足りない。子どもは 何人?', type: 'num', a: nn, steps: ['人数を x と おく: ' + per + 'x + ' + more + ' = ' + (per + 1) + 'x − ' + less, 'x = ' + more + ' + ' + less + ' = ' + nn + '人 (あめは ' + total + '個)'] }; }
    const c = R(8, 13), k = pick([3, 4]), p = R(26, 40), x = (p - k * c) / (k - 1); if (!Number.isInteger(x) || x <= 0) return null;
    return { q: '今、父は ' + p + '歳、子は ' + c + '歳。父の 年齢が 子の ' + k + '倍に なるのは 何年後?', type: 'num', a: x, steps: ['x年後: ' + p + ' + x = ' + k + '(' + c + ' + x)', p + ' + x = ' + (k * c) + ' + ' + k + 'x → ' + (k - 1) + 'x = ' + (p - k * c), 'x = ' + x] };
  });
  add('c2', 'c2f', '✖', '2直線の 交点', ['2つの 直線の 式を 連立方程式として 解く', '交点の 座標 = 連立方程式の 解'], () => {
    const x = R(-5, 5), y = R(-6, 6); let a1 = NZ(-4, 4), a2 = NZ(-4, 4); while (a2 === a1) a2 = NZ(-4, 4);
    const b1 = y - a1 * x, b2 = y - a2 * x;
    return { q: '直線 y = ' + poly([a1, b1]) + ' と y = ' + poly([a2, b2]) + ' の 交点の 座標は?', type: 'pair', labels: ['x', 'y'], a: [x, y],
      steps: [poly([a1, b1]) + ' = ' + poly([a2, b2]), poly([a1 - a2, 0]) + ' = ' + M(b2 - b1) + ' → x = ' + M(x), 'y = ' + M(a1) + ' × ' + P(x) + ' + ' + P(b1) + ' = ' + M(y)] };
  });
  add('c2', 'c2g', '📦', '四分位数・箱ひげ図', ['データを 小さい 順に 並べ、前半・後半に 分ける', '第1四分位数 = 前半の 中央値、第3四分位数 = 後半の 中央値', '四分位範囲 = 第3四分位数 − 第1四分位数'], () => {
    const n = pick([8, 10]); const xs = Array.from({ length: n }, () => R(1, 30)).sort((a, b) => a - b);
    const med = a => a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2;
    const lo = xs.slice(0, n / 2), hi = xs.slice(n / 2), q1 = med(lo), q3 = med(hi), kind = pick(['q1', 'q3', 'iqr']);
    const v = kind === 'q1' ? q1 : kind === 'q3' ? q3 : q3 - q1;
    return { q: 'データ (小さい 順): ' + xs.join(', ') + '\nこの データの ' + { q1: '第1四分位数', q3: '第3四分位数', iqr: '四分位範囲' }[kind] + 'は?', type: 'num', a: v,
      steps: ['前半: ' + lo.join(', ') + ' → 第1四分位数 ' + q1, '後半: ' + hi.join(', ') + ' → 第3四分位数 ' + q3].concat(kind === 'iqr' ? [q3 + ' − ' + q1 + ' = ' + (q3 - q1)] : []) };
  });
  add('c3', 'c3h', '⭕', '円周角の 定理', ['同じ 弧に 対する 円周角は 中心角の 半分', '同じ 弧に 対する 円周角は すべて 等しい', '直径に 対する 円周角は 90°'], () => {
    const kind = pick(['half', 'double', 'diam']);
    if (kind === 'half') { const c = 2 * R(20, 85); return { q: '円 O で、弧 AB に 対する 中心角 ∠AOB = ' + c + '° の とき、円周角 ∠APB は?', type: 'num', a: c / 2, steps: ['円周角 = 中心角 ÷ 2', c + ' ÷ 2 = ' + (c / 2)] }; }
    if (kind === 'double') { const a = R(15, 85); return { q: '円周角 ∠ACB = ' + a + '° の とき、同じ 弧 AB に 対する 中心角 ∠AOB は?', type: 'num', a: 2 * a, steps: ['中心角 = 円周角 × 2', a + ' × 2 = ' + (2 * a)] }; }
    const a = R(20, 70); return { q: 'AB は 円の 直径。円周上の 点 C で ∠CAB = ' + a + '° の とき、∠CBA は?', type: 'num', a: 90 - a, steps: ['直径に 対する 円周角 ∠ACB = 90°', '三角形の 内角の 和: 180 − 90 − ' + a + ' = ' + (90 - a)] };
  });
  add('c3', 'c3i', '🐟', '標本調査', ['標本の 割合 ≒ 母集団の 割合 と 考えて 推定する', '例: 印を つけて 放し、再び 捕まえて 印の 割合を 調べる (捕獲再捕獲法)'], () => {
    const marked = pick([20, 30, 40, 50, 60]), sample = pick([30, 40, 50, 60]), m2 = pick([2, 3, 4, 5, 6]); const N = marked * sample / m2; if (!Number.isInteger(N)) return null;
    return { q: '池の 魚を ' + marked + '匹 捕まえ、印を つけて 戻した。数日後 ' + sample + '匹 捕まえたら、印の ついた 魚は ' + m2 + '匹 だった。池の 魚は およそ 何匹?', type: 'num', a: N, steps: ['全体 x匹 : 印 ' + marked + '匹 = ' + sample + ' : ' + m2, 'x = ' + marked + ' × ' + sample + ' ÷ ' + m2 + ' = ' + N] };
  });
  add('c3', 'c3j', '🏞', '二次方程式の 文章題', ['求めたい 長さを x と おいて 式を 作る', '解が 2つ 出たら 問題に 合う 方 (正の 値など) を 選ぶ'], () => {
    const W = R(10, 20), H = R(8, 16), x = R(1, 3), A = (W - 2 * x) * (H - 2 * x);
    return { q: '縦 ' + H + 'm、横 ' + W + 'm の 土地の まわりに、同じ 幅の 道を 作ったら、残りの 土地の 面積が ' + A + 'm² に なった。道の 幅は 何m?', type: 'num', a: x,
      steps: ['道幅を x と おく: (' + W + ' − 2x)(' + H + ' − 2x) = ' + A, '展開: 4x² − ' + (2 * (W + H)) + 'x + ' + (W * H - A) + ' = 0', 'x = ' + x + ' (もう1つの 解は 土地より 大きく なり 不適)'] };
  });
  add('h1', 'h1g', '🔘', '集合と 要素の 個数', ['n(A ∪ B) = n(A) + n(B) − n(A ∩ B)', '補集合: n(Ā) = n(U) − n(A)', '1〜N の 中の k の 倍数の 個数 = N ÷ k の 整数部分'], () => {
    const N = pick([100, 120, 150, 200]), a = pick([2, 3, 4]), b = pick([5, 6, 7].filter(x => x % a)), l = a * b / gcd(a, b), na = Math.floor(N / a), nb = Math.floor(N / b), nab = Math.floor(N / l);
    if (Math.random() < 0.5) return { q: '1 から ' + N + ' までの 整数で、' + a + ' または ' + b + ' で わり切れる 数は 何個?', type: 'num', a: na + nb - nab, steps: [a + ' の 倍数 ' + na + '個、' + b + ' の 倍数 ' + nb + '個', '両方 (' + l + ' の 倍数) ' + nab + '個', na + ' + ' + nb + ' − ' + nab + ' = ' + (na + nb - nab)] };
    return { q: '1 から ' + N + ' までの 整数で、' + a + ' でも ' + b + ' でも わり切れない 数は 何個?', type: 'num', a: N - (na + nb - nab), steps: ['どちらかで わり切れる: ' + na + ' + ' + nb + ' − ' + nab + ' = ' + (na + nb - nab), '補集合: ' + N + ' − ' + (na + nb - nab) + ' = ' + (N - (na + nb - nab))] };
  });
  add('h1', 'h1h', '△', '三角形の 面積 (sin を 使う)', ['S = ½ bc sinA', 'sin30° = 1/2、 sin60° = √3/2、 sin90° = 1、 sin150° = 1/2'], () => {
    const b = R(2, 12), c = R(2, 12), A = pick([30, 90, 150]); const v = A === 90 ? fr(b * c, 2) : fr(b * c, 4);
    return { q: '△ABC で b = ' + b + '、c = ' + c + '、A = ' + A + '° の とき、面積 S は? (分数 OK)', type: 'num', a: v, steps: ['S = ½ × ' + b + ' × ' + c + ' × sin' + A + '°', 'sin' + A + '° = ' + (A === 90 ? '1' : '1/2') + ' → S = ' + fs(v)] };
  });
  add('h1', 'h1i', '｜', '絶対値の 方程式・不等式', ['|x − a| = b (b > 0) → x = a ± b', '|x − a| < b → a − b < x < a + b', '|x| は 数直線上の 0 からの 距離'], () => {
    const a = R(-6, 6), b = R(1, 7);
    if (Math.random() < 0.6) return { q: '|x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + '| = ' + b + ' を 解こう', type: 'set', a: [a + b, a - b], steps: ['x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + ' = ±' + b, 'x = ' + M(a) + ' ± ' + b + ' → ' + M(a + b) + ', ' + M(a - b)] };
    const r = M(a - b) + ' < x < ' + M(a + b);
    return { q: '|x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + '| < ' + b + ' を 解こう', type: 'choice', a: 0, opts: choices(r, ['x < ' + M(a - b) + ', ' + M(a + b) + ' < x', M(-a - b) + ' < x < ' + M(-a + b), M(a) + ' < x < ' + M(a + b)]), steps: ['−' + b + ' < x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + ' < ' + b, r] };
  });
  add('h1', 'h1j', '🔍', '判別式と グラフ', ['y = ax² + bx + c と x軸の 共有点の 個数は D = b² − 4ac の 符号で 決まる', 'D > 0 → 2個、 D = 0 → 1個 (接する)、 D < 0 → 0個'], () => {
    const kind = pick(['count', 'k']);
    if (kind === 'count') { const b = R(-8, 8), c = R(-8, 10), D = b * b - 4 * c; return { q: 'y = ' + poly([1, b, c]) + ' の グラフと x軸の 共有点は 何個?', type: 'num', a: D > 0 ? 2 : D === 0 ? 1 : 0, steps: ['D = ' + P(b) + '² − 4 × 1 × ' + P(c) + ' = ' + M(D), D > 0 ? 'D > 0 → 2個' : D === 0 ? 'D = 0 → 1個 (接する)' : 'D < 0 → 0個'] }; }
    const b = 2 * NZ(-5, 5), k = b * b / 4; return { q: 'y = ' + poly([1, b, 0]) + ' + k の グラフが x軸に 接する ときの k は?', type: 'num', a: k, steps: ['接する ⇔ D = 0', P(b) + '² − 4k = 0 → k = ' + k] };
  });
  add('hA', 'hAe', '🔎', '条件付き確率', ['P_A(B) = P(A ∩ B) / P(A) (A が 起きた ときに B が 起きる 確率)', '「A が 起きた と わかった 後」は 全体が A に しぼられる'], () => {
    const r = R(3, 6), w = R(2, 5), N = r + w;
    const v = fr(r - 1, N - 1);
    return { q: '赤玉 ' + r + '個・白玉 ' + w + '個の 袋から 1個ずつ 2回 取り出す (戻さない)。1回目が 赤だった とき、2回目も 赤の 確率は?', type: 'num', a: v, steps: ['1回目に 赤を 取った 後: 赤 ' + (r - 1) + '個、全部 ' + (N - 1) + '個', (r - 1) + '/' + (N - 1) + (fs(v) === (r - 1) + '/' + (N - 1) ? '' : ' = ' + fs(v))] };
  });
  add('hA', 'hAf', '⚖', '不定方程式 (1次)', ['ax + by = c の 整数解: まず 1組の 解を 見つける', '一般解: x = x₀ + bk、 y = y₀ − ak (a, b が 互いに 素)'], () => {
    let a, b; do { a = R(3, 11); b = R(2, 9); } while (gcd(a, b) !== 1 || a === b);
    const x0 = R(1, b), y0 = R(-a, a), c = a * x0 + b * y0; // 最小の 正の x
    let xm = ((x0 % b) + b) % b; if (xm === 0) xm = b; const ym = (c - a * xm) / b;
    return { q: a + 'x + ' + b + 'y = ' + c + ' を 満たす 整数 x, y の うち、x が いちばん 小さい 正の 整数に なる 解は?', type: 'pair', labels: ['x', 'y'], a: [xm, ym],
      steps: ['x を 1, 2, 3 … と 試して ' + c + ' − ' + a + 'x が ' + b + ' で わり切れる ものを 探す', 'x = ' + xm + ' → ' + b + 'y = ' + (c - a * xm) + ' → y = ' + M(ym), '(一般解: x = ' + xm + ' + ' + b + 'k、y = ' + M(ym) + ' − ' + a + 'k)'] };
  });
  add('hA', 'hAg', '📐', '角の 二等分線と 比', ['∠A の 二等分線が 辺 BC と 交わる 点 D: BD : DC = AB : AC', '中線・重心: 重心は 中線を 2 : 1 に 分ける'], () => {
    const ab = R(3, 12), ac = R(3, 12); if (ab === ac) return null; const sAC = ab + ac, u = sAC / gcd(ab, sAC), cand = []; for (let t = u; t < sAC; t += u) if (t > Math.abs(ab - ac)) cand.push(t); if (!cand.length) return null; const BC = pick(cand), bd = BC * ab / sAC;
    return { q: '△ABC で AB = ' + ab + '、AC = ' + ac + '、BC = ' + BC + '。∠A の 二等分線と BC の 交点を D と すると、BD は?', type: 'num', a: bd, steps: ['BD : DC = AB : AC = ' + ab + ' : ' + ac, 'BD = ' + BC + ' × ' + ab + '/' + (ab + ac) + ' = ' + bd] };
  });
  add('h2', 'h2i', '➕', '加法定理', ['sin(α ± β) = sinα cosβ ± cosα sinβ', 'cos(α ± β) = cosα cosβ ∓ sinα sinβ', '75° = 45° + 30°、15° = 45° − 30°'], () => {
    const T = [['sin75°', '(√6 + √2)/4', ['(√6 − √2)/4', '(√3 + 1)/2', '√3/2']], ['cos75°', '(√6 − √2)/4', ['(√6 + √2)/4', '(√3 − 1)/2', '1/2']], ['sin15°', '(√6 − √2)/4', ['(√6 + √2)/4', '(√3 − 1)/4', '1/4']], ['cos15°', '(√6 + √2)/4', ['(√6 − √2)/4', '(√2 + 1)/4', '√3/2']], ['sin105°', '(√6 + √2)/4', ['(√2 − √6)/4', '(√6 − √2)/4', '√3/2']], ['cos105°', '(√2 − √6)/4', ['(√6 + √2)/4', '(√6 − √2)/4', '−1/2']]];
    const [q, r, w] = pick(T); const dec = { 'sin75°': '45° + 30°', 'cos75°': '45° + 30°', 'sin15°': '45° − 30°', 'cos15°': '45° − 30°', 'sin105°': '60° + 45°', 'cos105°': '60° + 45°' }[q];
    return { q: q + ' の 値は?', type: 'choice', a: 0, opts: choices(r, w), steps: [q.slice(0, 3) + '(' + dec + ') と 分ける', '加法定理に 有名角の 値を 入れる', '= ' + r] };
  });
  add('h2', 'h2j', '2️⃣', '2倍角の 公式', ['sin2θ = 2 sinθ cosθ', 'cos2θ = cos²θ − sin²θ = 1 − 2sin²θ = 2cos²θ − 1', 'sin²θ + cos²θ = 1 で もう一方を 求める'], () => {
    const t = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]]), sw = Math.random() < 0.5; const s = sw ? t[1] : t[0], c = sw ? t[0] : t[1], h = t[2];
    if (Math.random() < 0.5) { const v = fr(2 * s * c, h * h); return { q: '0° < θ < 90° で sinθ = ' + s + '/' + h + ' の とき、sin2θ は?', type: 'num', a: v, steps: ['cosθ = √(1 − sin²θ) = ' + c + '/' + h, 'sin2θ = 2 × ' + s + '/' + h + ' × ' + c + '/' + h + ' = ' + fs(v)] }; }
    const v = fr(c * c - s * s, h * h); return { q: '0° < θ < 90° で sinθ = ' + s + '/' + h + ' の とき、cos2θ は?', type: 'num', a: v, steps: ['cos2θ = 1 − 2sin²θ = 1 − 2 × ' + (s * s) + '/' + (h * h), '= ' + fs(v)] };
  });
  add('h2', 'h2k', '🔓', '指数・対数の 方程式', ['logₐX = b ⇔ X = aᵇ (真数 X > 0 を 確認)', '4ˣ = (2ˣ)² の ように 置き換えて 2次方程式に する ことも'], () => {
    if (Math.random() < 0.5) { const a = pick([2, 3]), b = R(1, 4), k = R(-5, 5), x = a ** b - k; return { q: 'log₍' + a + '₎(x ' + (k < 0 ? '− ' + (-k) : '+ ' + k) + ') = ' + b + ' を 解こう', type: 'num', a: x, steps: ['x ' + (k < 0 ? '− ' + (-k) : '+ ' + k) + ' = ' + a + '^' + b + ' = ' + (a ** b), 'x = ' + x + ' (真数 > 0 も OK)'] }; }
    const m = pick([1, 2, 4, 8]), n = pick([2, 4, 8, 16].filter(v => v !== m)), xs = [Math.log2(m), Math.log2(n)];
    return { q: '4ˣ − ' + (m + n) + '·2ˣ + ' + (m * n) + ' = 0 を 解こう', type: 'set', a: xs, steps: ['t = 2ˣ と おく: t² − ' + (m + n) + 't + ' + (m * n) + ' = 0', '(t − ' + m + ')(t − ' + n + ') = 0 → t = ' + m + ', ' + n, '2ˣ = ' + m + ', ' + n + ' → x = ' + xs[0] + ', ' + xs[1]] };
  });
  add('h2', 'h2l', '🏔', '極値', ['f′(x) = 0 と なる x で 増減が 変わる ところが 極値', '増減表を かいて 極大・極小を 判断する'], () => {
    const a = R(1, 3), k = pick([-1, 1]), d = R(-5, 5); // f = k(x³ − 3a²x) + d → f' = 3k(x² − a²) → 極値 x = ±a
    const f = x => k * (x ** 3 - 3 * a * a * x) + d, xmax = k > 0 ? -a : a;
    return { q: 'f(x) = ' + poly([k, 0, -3 * a * a * k, d]) + ' の 極大値は?', type: 'num', a: f(xmax),
      steps: ['f′(x) = ' + poly([3 * k, 0, -3 * a * a * k]) + ' = 0 → x = ±' + a, '増減表: x = ' + M(xmax) + ' で 増加 → 減少 (極大)', 'f(' + M(xmax) + ') = ' + M(f(xmax))] };
  });
  add('h2', 'h2m', '🌙', '面積 (放物線と 直線)', ['囲まれた 面積 = ∫ (上の 式 − 下の 式) dx', '近道 (1/6 公式): ∫ₐᵝ (x − α)(x − β) dx = −(β − α)³/6'], () => {
    let al = R(-4, 2), be = al + R(1, 5); const k = pick([1, 2, 3]);
    const v = fr(k * (be - al) ** 3, 6);
    return { q: '放物線 y = ' + poly([k, 0, 0]) + ' と 直線 y = ' + poly([k * (al + be), -k * al * be]) + ' で 囲まれた 部分の 面積は? (分数 OK)', type: 'num', a: v,
      steps: ['交点: ' + poly([k, -k * (al + be), k * al * be]) + ' = 0 → x = ' + M(al) + ', ' + M(be), '面積 = ∫ (直線 − 放物線) dx = ' + k + ' × (' + M(be) + ' − ' + P(al) + ')³ / 6', '= ' + fs(v)] };
  });
  add('h2', 'h2n', '📍', '点と 直線の 距離', ['点 (x₀, y₀) と 直線 ax + by + c = 0 の 距離 = |ax₀ + by₀ + c| / √(a² + b²)'], () => {
    const [a, b] = pick([[3, 4], [4, 3], [5, 12], [12, 5], [6, 8], [-3, 4], [3, -4]]), n = Math.sqrt(a * a + b * b), x0 = R(-4, 4), y0 = R(-4, 4), dist = R(1, 5), sgn = pick([1, -1]);
    const c = sgn * dist * n - a * x0 - b * y0;
    return { q: '点 (' + M(x0) + ', ' + M(y0) + ') と 直線 ' + lin(a, b, 'x', 'y') + (c < 0 ? ' − ' + (-c) : c ? ' + ' + c : '') + ' = 0 の 距離は?', type: 'num', a: dist,
      steps: ['|' + M(a) + '×' + P(x0) + ' + ' + P(b) + '×' + P(y0) + ' + ' + P(c) + '| = ' + (dist * n), '√(' + P(a) + '² + ' + P(b) + '²) = ' + n, (dist * n) + ' ÷ ' + n + ' = ' + dist] };
  });
  add('hB', 'hBe', '🔄', '漸化式', ['aₙ₊₁ = aₙ + d → 等差、 aₙ₊₁ = r aₙ → 等比', 'aₙ₊₁ = p aₙ + q は aₙ₊₁ − α = p(aₙ − α) (α = q/(1 − p)) と 変形', '小さい n は 順に 計算して 確かめる'], () => {
    const p = pick([2, 3]), q = R(-3, 4), a1 = R(1, 4), n = R(4, 6); let a = a1; const seq = [a]; for (let i = 1; i < n; i++) { a = p * a + q; seq.push(a); }
    return { q: 'a₁ = ' + a1 + '、aₙ₊₁ = ' + p + 'aₙ ' + (q < 0 ? '− ' + (-q) : '+ ' + q) + ' で 定められる 数列の 第' + n + '項は?', type: 'num', a: a,
      steps: ['順に 計算: ' + seq.map(M).join(' → '), '(一般項: aₙ − α = (a₁ − α)·' + p + 'ⁿ⁻¹、α = ' + fs(fr(q, 1 - p)) + ')', 'a' + n + ' = ' + a] };
  });
  add('hB', 'hBf', '🎰', '確率分布 (期待値・二項分布)', ['期待値 E(X) = Σ xᵢ pᵢ', '二項分布 B(n, p): E(X) = np、V(X) = np(1 − p)'], () => {
    if (Math.random() < 0.5) { const n = pick([10, 20, 30, 60, 90, 120]), den = pick([2, 3, 4, 5, 6]); const E = fr(n, den), V = fr(n * (den - 1), den * den);
      return Math.random() < 0.5 ? { q: '確率 1/' + den + ' で 起こる 試行を ' + n + '回 行う。起こる 回数 X の 期待値は?', type: 'num', a: E, steps: ['X は 二項分布 B(' + n + ', 1/' + den + ')', 'E(X) = np = ' + n + ' × 1/' + den + ' = ' + fs(E)] }
        : { q: '確率 1/' + den + ' で 起こる 試行を ' + n + '回 行う。起こる 回数 X の 分散は?', type: 'num', a: V, steps: ['X は 二項分布 B(' + n + ', 1/' + den + ')', 'V(X) = np(1 − p) = ' + n + ' × 1/' + den + ' × ' + (den - 1) + '/' + den + ' = ' + fs(V)] }; }
    const pr = [R(100, 500), R(10, 90), 0]; const ps = [1, 3, 6]; const num = pr[0] * ps[0] + pr[1] * ps[1]; const E = fr(num, 10);
    return { q: 'くじ 10本: 1等 ' + pr[0] + '円 が 1本、2等 ' + pr[1] + '円 が 3本、はずれ 6本。1本 引く ときの 賞金の 期待値は? (円)', type: 'num', a: E, steps: [pr[0] + ' × 1/10 + ' + pr[1] + ' × 3/10 + 0 × 6/10', '= ' + num + '/10 = ' + fs(E) + '円'] };
  });
  add('h3', 'h3b', '🔗', '微分 (積・商・合成関数)', ['積: (fg)′ = f′g + fg′', '商: (f/g)′ = (f′g − fg′)/g²', '合成: {f(g(x))}′ = f′(g(x))·g′(x)、 例 {(ax+b)ⁿ}′ = na(ax+b)ⁿ⁻¹'], () => {
    const kind = pick(['chain', 'prod']);
    if (kind === 'chain') { const a = NZ(-3, 3), b = R(-3, 3), n = R(2, 4), x = R(-1, 2); const v = n * a * (a * x + b) ** (n - 1);
      return { q: 'f(x) = (' + poly([a, b]) + ')^' + n + ' の とき、f′(' + M(x) + ') は?', type: 'num', a: v, steps: ['f′(x) = ' + n + ' × (' + poly([a, b]) + ')^' + (n - 1) + ' × ' + P(a), 'x = ' + M(x) + ': ' + n + ' × ' + P(a * x + b) + '^' + (n - 1) + ' × ' + P(a) + ' = ' + M(v)] }; }
    const a = NZ(-3, 3), b = R(-3, 3), c = NZ(-3, 3), d = R(-3, 3), x = R(-2, 2); const v = a * (c * x * x + d) + (a * x + b) * 2 * c * x;
    return { q: 'f(x) = (' + poly([a, b]) + ')(' + poly([c, 0, d]) + ') の とき、f′(' + M(x) + ') は? (積の 微分)', type: 'num', a: v, steps: ['f′(x) = ' + M(a) + '(' + poly([c, 0, d]) + ') + (' + poly([a, b]) + ')(' + poly([2 * c, 0]) + ')', 'x = ' + M(x) + ' を 代入 = ' + M(v)] };
  });
  add('h3', 'h3c', '∫', '積分 (置換・(ax+b)ⁿ)', ['∫(ax + b)ⁿ dx = (ax + b)ⁿ⁺¹ / {a(n + 1)} + C', '置換積分: t = ax + b と おくと dx = dt/a'], () => {
    const a = R(1, 3), b = R(0, 3), n = R(1, 3); const num = (a + b) ** (n + 1) - b ** (n + 1), v = fr(num, a * (n + 1));
    return { q: '∫ (0 から 1 まで) (' + poly([a, b]) + ')^' + n + ' dx の 値は? (分数 OK)', type: 'num', a: v,
      steps: ['原始関数: (' + poly([a, b]) + ')^' + (n + 1) + ' / ' + (a * (n + 1)), '[x = 1] ' + (a + b) + '^' + (n + 1) + ' − [x = 0] ' + b + '^' + (n + 1) + ' = ' + num, num + ' / ' + (a * (n + 1)) + ' = ' + fs(v)] };
  });
  add('h3', 'h3d', '🌐', '複素数平面', ['z = a + bi の 絶対値 |z| = √(a² + b²) (原点からの 距離)', '積の 絶対値 = 絶対値の 積、 積の 偏角 = 偏角の 和', '極形式 z = r(cosθ + i sinθ)'], () => {
    if (Math.random() < 0.6) { const [p, q, r] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17]]), sp = pick([1, -1]), sq2 = pick([1, -1]);
      return { q: 'z = ' + M(sp * p) + (sq2 > 0 ? ' + ' : ' − ') + q + 'i の 絶対値 |z| は?', type: 'num', a: r, steps: ['|z| = √(' + P(sp * p) + '² + ' + P(sq2 * q) + '²)', '= √' + (r * r) + ' = ' + r] }; }
    const A = [[30, '1/2', '√3/2'], [45, '1/√2', '1/√2'], [60, '√3/2', '1/2']], [t1] = pick(A), [t2] = pick(A), s = t1 + t2;
    return { q: '偏角 ' + t1 + '° の 複素数と 偏角 ' + t2 + '° の 複素数を かけた 数の 偏角は 何度?', type: 'num', a: s, steps: ['積の 偏角 = 偏角の 和', t1 + ' + ' + t2 + ' = ' + s + '°'] };
  });

  // ======================= 追加 単元 (v3: 高難度) =======================
  add('c2', 'c2h', '🧪', '連立方程式の 文章題', ['わからない 量を 2つ x, y と おく', '「合計」の 式と「もう1つの 関係」の 式を 立てる', '濃度: 食塩の 量 = 食塩水 × 濃度'], () => {
    const kind = pick(['coin', 'salt', 'speed']);
    if (kind === 'coin') { const x = R(3, 15), y = R(3, 15), a = pick([50, 80, 100, 120]), b = pick([150, 200, 250].filter(v => v !== a)); return { q: '1個 ' + a + '円の ノートと 1個 ' + b + '円の ペンを 合わせて ' + (x + y) + '個 買い、代金は ' + (a * x + b * y) + '円 だった。ノートと ペンを それぞれ 何個 買った?', type: 'pair', labels: ['ノート', 'ペン'], a: [x, y], steps: ['x + y = ' + (x + y) + '、' + a + 'x + ' + b + 'y = ' + (a * x + b * y), '1つ目 × ' + a + ' を ひく: ' + (b - a) + 'y = ' + ((a * x + b * y) - a * (x + y)) + ' → y = ' + y, 'x = ' + (x + y) + ' − ' + y + ' = ' + x] }; }
    if (kind === 'salt') { const p1 = pick([4, 5, 6]), p2 = pick([10, 12, 15]), x = R(1, 6) * 50, y = R(1, 6) * 50, salt = (p1 * x + p2 * y) / 100, tot = x + y; const pc = salt * 100 / tot; if (!Number.isInteger(pc * 10)) return null;
      return { q: p1 + '% の 食塩水と ' + p2 + '% の 食塩水を 混ぜて、' + Math.round(pc * 10) / 10 + '% の 食塩水を ' + tot + 'g つくった。' + p1 + '% と ' + p2 + '% を それぞれ 何g 混ぜた?', type: 'pair', labels: [p1 + '% (g)', p2 + '% (g)'], a: [x, y], steps: ['x + y = ' + tot, '食塩: ' + (p1 / 100) + 'x + ' + (p2 / 100) + 'y = ' + salt + ' (= ' + tot + ' × ' + Math.round(pc * 10) / 10 + '%)', '解くと x = ' + x + '、y = ' + y] }; }
    const v1 = pick([3, 4, 5]), v2 = pick([10, 12, 15]), t1 = R(1, 3), t2 = R(1, 3); const d1 = v1 * t1, d2 = v2 * t2;
    return { q: '家から ' + (d1 + d2) + 'km 離れた 町まで、はじめは 時速 ' + v1 + 'km で 歩き、途中から 時速 ' + v2 + 'km の 自転車に 乗ったら、全体で ' + (t1 + t2) + '時間 かかった。歩いた 道のりと 自転車の 道のりは それぞれ 何km?', type: 'pair', labels: ['歩き (km)', '自転車 (km)'], a: [d1, d2], steps: ['x + y = ' + (d1 + d2) + '、x/' + v1 + ' + y/' + v2 + ' = ' + (t1 + t2), '解くと x = ' + d1 + '、y = ' + d2] };
  });
  add('hA', 'hAh', '🔢', '約数の 個数と 総和', ['n = pᵃ qᵇ (素因数分解) の とき、約数の 個数 = (a + 1)(b + 1)', '約数の 総和 = (1 + p + … + pᵃ)(1 + q + … + qᵇ)'], () => {
    const ps = pick([[2, 3], [2, 5], [3, 5], [2, 7]]), a = R(1, 4), b = R(1, 3), n = ps[0] ** a * ps[1] ** b;
    if (Math.random() < 0.6) return { q: n + ' の 正の 約数は 何個?', type: 'num', a: (a + 1) * (b + 1), steps: [n + ' = ' + ps[0] + '^' + a + ' × ' + ps[1] + '^' + b, '(' + a + ' + 1)(' + b + ' + 1) = ' + ((a + 1) * (b + 1)) + '個'] };
    const s1 = (ps[0] ** (a + 1) - 1) / (ps[0] - 1), s2 = (ps[1] ** (b + 1) - 1) / (ps[1] - 1);
    return { q: n + ' の 正の 約数の 総和は?', type: 'num', a: s1 * s2, steps: [n + ' = ' + ps[0] + '^' + a + ' × ' + ps[1] + '^' + b, '(1 + … + ' + ps[0] + '^' + a + ') × (1 + … + ' + ps[1] + '^' + b + ') = ' + s1 + ' × ' + s2 + ' = ' + (s1 * s2)] };
  });
  add('hA', 'hAi', '🎲', '反復試行の 確率', ['確率 p の 試行を n 回 くり返して ちょうど k 回 起こる 確率 = ₙCₖ pᵏ (1 − p)ⁿ⁻ᵏ'], () => {
    const n = R(3, 6), k = R(1, n - 1), [pn, pd] = pick([[1, 2], [1, 3], [1, 6], [2, 3]]);
    const num = C(n, k) * pn ** k * (pd - pn) ** (n - k), den = pd ** n, v = fr(num, den);
    const ev = { '1/2': 'コインを 投げて 表が 出る', '1/3': 'サイコロで 1 か 2 が 出る', '1/6': 'サイコロで 6 が 出る', '2/3': 'サイコロで 3 以上が 出る' }[pn + '/' + pd];
    return { q: ev + ' 試行を ' + n + '回 くり返す とき、ちょうど ' + k + '回 起こる 確率は?', type: 'num', a: v, steps: ['p = ' + pn + '/' + pd, n + 'C' + k + ' × (' + pn + '/' + pd + ')^' + k + ' × (' + (pd - pn) + '/' + pd + ')^' + (n - k), '= ' + C(n, k) + ' × ' + (pn ** k * (pd - pn) ** (n - k)) + '/' + den + ' = ' + fs(v)] };
  });
  add('h2', 'h2o', '〰', '三角関数の 合成', ['a sinθ + b cosθ = √(a² + b²) sin(θ + α)', '最大値 √(a² + b²)、最小値 −√(a² + b²)'], () => {
    const [a, b, r] = pick([[3, 4, 5], [4, 3, 5], [5, 12, 13], [12, 5, 13], [1, 1, null], [8, 6, 10], [6, 8, 10]]); if (!r) return null;
    const sa = pick([1, -1]), sb = pick([1, -1]), mx = Math.random() < 0.6;
    return { q: 'y = ' + (sa < 0 ? '−' : '') + a + 'sinθ ' + (sb < 0 ? '− ' : '+ ') + b + 'cosθ の ' + (mx ? '最大値' : '最小値') + 'は?', type: 'num', a: mx ? r : -r, steps: ['合成: √(' + a + '² + ' + b + '²) = ' + r, 'y = ' + r + ' sin(θ + α) → ' + (mx ? '最大 ' + r : '最小 −' + r)] };
  });
  add('h2', 'h2p', '÷', '剰余の 定理・因数定理', ['P(x) を x − a で わった 余りは P(a)', 'P(a) = 0 ⇔ P(x) は x − a で わり切れる (因数定理)'], () => {
    const c = [NZ(-3, 3), R(-5, 5), R(-6, 6), R(-9, 9)], a = NZ(-3, 3), v = ((c[0] * a + c[1]) * a + c[2]) * a + c[3];
    if (Math.random() < 0.6) return { q: 'P(x) = ' + poly(c) + ' を x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + ' で わった 余りは?', type: 'num', a: v, steps: ['余り = P(' + M(a) + ')', '= ' + M(c[0]) + '×' + P(a) + '³ + ' + P(c[1]) + '×' + P(a) + '² + ' + P(c[2]) + '×' + P(a) + ' + ' + P(c[3]) + ' = ' + M(v)] };
    const k = -(c[0] * a ** 3 + c[1] * a * a + c[2] * a);
    return { q: 'P(x) = ' + poly([c[0], c[1], c[2], 0]) + ' + k が x ' + (a < 0 ? '+ ' + (-a) : '− ' + a) + ' で わり切れる ような 定数 k は?', type: 'num', a: k, steps: ['因数定理: P(' + M(a) + ') = 0', M(c[0] * a ** 3 + c[1] * a * a + c[2] * a) + ' + k = 0 → k = ' + M(k)] };
  });
  add('hB', 'hBg', '📍', '内分点・重心 (ベクトル・座標)', ['A, B を m : n に 内分する 点 = (nA + mB)/(m + n)', '三角形の 重心 = (A + B + C)/3'], () => {
    if (Math.random() < 0.6) { const m = R(1, 4), n = R(1, 4), Ax = R(-6, 6), Ay = R(-6, 6), s = m + n, Bx = Ax + s * R(-3, 3), By = Ay + s * R(-3, 3);
      const Px = (n * Ax + m * Bx) / s, Py = (n * Ay + m * By) / s;
      return { q: 'A(' + M(Ax) + ', ' + M(Ay) + ')、B(' + M(Bx) + ', ' + M(By) + ') を ' + m + ' : ' + n + ' に 内分する 点の 座標は?', type: 'pair', labels: ['x', 'y'], a: [Px, Py], steps: ['x = (' + n + '×' + P(Ax) + ' + ' + m + '×' + P(Bx) + ')/' + s + ' = ' + M(Px), 'y = (' + n + '×' + P(Ay) + ' + ' + m + '×' + P(By) + ')/' + s + ' = ' + M(Py)] }; }
    const xs = [R(-6, 6), R(-6, 6)], ys = [R(-6, 6), R(-6, 6)], gx = R(-4, 4), gy = R(-4, 4), x3 = 3 * gx - xs[0] - xs[1], y3 = 3 * gy - ys[0] - ys[1];
    return { q: 'A(' + M(xs[0]) + ', ' + M(ys[0]) + ')、B(' + M(xs[1]) + ', ' + M(ys[1]) + ')、C(' + M(x3) + ', ' + M(y3) + ') の 三角形の 重心の 座標は?', type: 'pair', labels: ['x', 'y'], a: [gx, gy], steps: ['x = (' + M(xs[0]) + ' + ' + P(xs[1]) + ' + ' + P(x3) + ')/3 = ' + M(gx), 'y = (' + M(ys[0]) + ' + ' + P(ys[1]) + ' + ' + P(y3) + ')/3 = ' + M(gy)] };
  });
  add('h3', 'h3e', 'ℯ', '微分 (指数・対数・三角関数)', ['(eˣ)′ = eˣ、(log x)′ = 1/x', '(sin x)′ = cos x、(cos x)′ = −sin x', '合成関数: {f(ax + b)}′ = a f′(ax + b)'], () => {
    const kind = pick(['exp', 'log', 'sin']);
    if (kind === 'exp') { const a = NZ(-4, 4), c = R(2, 5); return { q: 'f(x) = ' + c + 'e^(' + (a === 1 ? '' : a === -1 ? '−' : M(a)) + 'x) の とき、f′(0) は?', type: 'num', a: c * a, steps: ['f′(x) = ' + c + ' × ' + P(a) + ' × e^(' + M(a) + 'x)', 'x = 0: e⁰ = 1 → ' + M(c * a)] }; }
    if (kind === 'log') { const a = R(1, 4), b = R(0, 4), x = R(1, 3); const v = fr(a, a * x + b); return { q: 'f(x) = log(' + poly([a, b]) + ') の とき、f′(' + x + ') は? (log は 自然対数)', type: 'num', a: v, steps: ['f′(x) = ' + a + '/(' + poly([a, b]) + ')', 'x = ' + x + ': ' + a + '/' + (a * x + b) + ' = ' + fs(v)] }; }
    const a = R(1, 5), c = R(2, 4); return { q: 'f(x) = ' + c + 'sin(' + (a === 1 ? '' : a) + 'x) の とき、f′(0) は?', type: 'num', a: c * a, steps: ['f′(x) = ' + c + ' × ' + a + ' × cos(' + a + 'x)', 'cos 0 = 1 → ' + (c * a)] };
  });
  add('h3', 'h3f', '∫', '定積分 (指数・対数・三角関数)', ['∫sin x dx = −cos x、∫cos x dx = sin x', '∫(1/x) dx = log|x|、∫eˣ dx = eˣ', '∫₀^π sin x dx = 2 は 有名'], () => {
    const kind = pick(['sin', 'cos', 'inv']);
    if (kind === 'sin') { const n = R(1, 5), c = R(2, 4); const v = n % 2 ? fr(2 * c, n) : 0; return { q: '∫ (0 から π まで) ' + c + 'sin(' + (n === 1 ? '' : n) + 'x) dx の 値は? (分数 OK)', type: 'num', a: v, steps: ['原始関数: −(' + c + '/' + n + ')cos(' + n + 'x)', '[−(' + c + '/' + n + ')cos(' + n + 'π)] − [−(' + c + '/' + n + ')cos 0] = ' + c + '/' + n + ' × (1 − cos ' + n + 'π)', 'cos ' + n + 'π = ' + (n % 2 ? '−1' : '1') + ' → ' + fs(v)] }; }
    if (kind === 'cos') { const c = R(2, 6); return { q: '∫ (0 から π/2 まで) ' + c + 'cos x dx の 値は?', type: 'num', a: c, steps: ['[' + c + 'sin x] = ' + c + '(sin(π/2) − sin 0) = ' + c] }; }
    const k = R(1, 4), c = R(1, 5); return { q: '∫ (1 から e^' + k + ' まで) (' + c + '/x) dx の 値は?', type: 'num', a: c * k, steps: ['[' + c + ' log x]', c + '(log e^' + k + ' − log 1) = ' + c + ' × ' + k + ' = ' + (c * k)] };
  });

  const GROUPS = [
    { id: 'c1', name: '中学1年', color: '#3a8a5a' }, { id: 'c2', name: '中学2年', color: '#2e7aa8' }, { id: 'c3', name: '中学3年', color: '#5a5ab0' },
    { id: 'h1', name: '高校 数学I', color: '#b05a3a' }, { id: 'hA', name: '高校 数学A', color: '#a0702a' }, { id: 'h2', name: '高校 数学II', color: '#9a3a7a' },
    { id: 'hB', name: '高校 数学B・C', color: '#6a3aa0' }, { id: 'h3', name: '発展 (数学III)', color: '#3a3a3a' },
  ];
  function make(u) { let r = null; for (let i = 0; i < 60 && !r; i++) { try { r = u.gen(); } catch (e) { r = null; } } return r; }
  const ORD = GROUPS.map(g => g.id); U.sort((a, b) => ORD.indexOf(a.g) - ORD.indexOf(b.g));
  return { title: '中学・高校 数学ラダー', icon: '📈', U: U, GROUPS: GROUPS, make: make, byId: id => U.find(u => u.id === id), _fs: fs };
})();
