/* engine/math-world.js — 世界の 算数道場
 * コーナー: シンガポール式 線分図 (7タイプ × 5問) / ロシア式 思考パズル (24題) / 公式図鑑 (20) / 世界の 勉強法 / インド式 計算道場 (IndianMath へ)
 * 線分図: 問題 → 「線分図を かく」で 図が 出る → 答え → まちがえたら 解き方 ステップ
 * 保存: State.v2.mw = { sg: {id: best(0-5)}, ru: {i: 1}, fm: {id: 1} }
 * 画面: pageMathWorld (#mwArea). Dependencies: MW, State, saveState, showPage, sfx, escapeHtml, IndianMath (任意)
 */
const MathWorld = (function () {
  const KORADON = 'assets/img/chars/spirits/koradon_greet_01.webp';
  let run = null;
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const area = () => $('mwArea');
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.mw || (State.v2.mw = {}); d.sg = d.sg || {}; d.ru = d.ru || {}; d.fm = d.fm || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function stop() { run = null; document.onkeydown = null; }
  function art(src, fb, cls) { return '<span class="art-w ' + (cls || '') + '"><img class="art-main" src="' + src + '" alt="" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"><span class="art-fb">' + (fb || '') + '</span></span>'; }
  function head(title, back) { return '<div class="mw-head"><button class="mw-back" id="mwBack">← ' + (back || '道場') + '</button><div class="mw-title">' + title + '</div></div>'; }
  function bindBack(fn) { const b = $('mwBack'); if (b) b.onclick = () => { sfx('click'); stop(); (fn || home)(); }; }
  const num = v => { const s = String(v).trim().replace(/[０-９．]/g, c => String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/,/g, ''); return s === '' || isNaN(+s) ? null : +s; };
  const same = (a, b) => a != null && Math.abs(a - b) < 1e-6;
  const fmt = n => Number.isInteger(n) ? String(n) : String(Math.round(n * 1000) / 1000);
  function answerBox(id) { return '<div class="mw-inp"><input id="' + id + '" inputmode="decimal" autocomplete="off" placeholder="答え"><button class="mw-ok" id="' + id + 'Go">決定</button></div>'; }
  function bindAnswer(id, fn) {
    const el = $(id), go = $(id + 'Go'); if (!el) return;
    const submit = () => { const v = num(el.value); if (v == null) { el.classList.add('shake'); setTimeout(() => el.classList.remove('shake'), 400); return; } fn(v); };
    el.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } };
    go.onclick = submit;
    if (!('ontouchstart' in window)) el.focus();
  }

  // ================= ホーム =================
  function home() {
    stop();
    const D = data();
    const sgStars = MW.SG.reduce((a, t) => a + (D.sg[t.id] >= 4 ? 1 : 0), 0), ru = Object.keys(D.ru).length, fm = Object.keys(D.fm).length;
    let h = '<div class="mw-hero">' + art(KORADON, '🌏', 'mw-kora') + '<div><div class="mw-kicker">世界の</div><h1 class="mw-h1">算数道場</h1><p>コラドン:「算数が 強い 国には、それぞれ ひみつの 考え方が あるんだ。インドの ワザ、シンガポールの 図、ロシアの パズル … 全部 ためしてみよう!」</p></div></div>';
    const corner = (id, flag, name, sub, prog, color) => '<button class="mw-corner" id="' + id + '" style="--cc:' + color + '"><span class="mw-flag">' + flag + '</span><span class="mw-cb"><b>' + name + '</b><small>' + sub + '</small></span><span class="mw-prog">' + prog + '</span></button>';
    h += '<div class="mw-corners">';
    h += corner('mwIndian', '🇮🇳', 'インド式 計算道場', '20の 計算ワザ · 検定', '▶', '#d0702a');
    h += corner('mwSg', '🇸🇬', 'シンガポール式 線分図', '文章題を 図に して 解く', sgStars + ' / ' + MW.SG.length, '#c0392b');
    h += corner('mwRu', '🇷🇺', 'ロシア式 思考パズル', 'じっくり 考える 24題', ru + ' / ' + MW.RU.length, '#2e5fa8');
    h += corner('mwFm', '📘', '公式図鑑', '公式が「なぜ そうなるか」', fm + ' / ' + MW.FM.length, '#2a8a5a');
    h += corner('mwStudy', '🌏', '世界の 勉強法', '強い 国の 学び方', '📖', '#7a5aa8');
    h += '</div><p class="mw-note">💡 同じ 問題でも、国に よって 考え方が ちがう。いちばん わかりやすい 方法を 自分で 選べるのが 最強!</p>';
    area().innerHTML = h;
    $('mwIndian').onclick = () => { sfx('click'); stop(); if (typeof IndianMath !== 'undefined') IndianMath.open(); };
    $('mwSg').onclick = () => { sfx('click'); sgList(); };
    $('mwRu').onclick = () => { sfx('click'); ruList(); };
    $('mwFm').onclick = () => { sfx('click'); fmList(); };
    $('mwStudy').onclick = () => { sfx('click'); study(); };
  }

  // ================= 線分図 SVG =================
  const BC = ['#bcd7f0', '#f6c9a8', '#f4e19a', '#c8e6c3'], BS = ['#5a85b0', '#c07a4a', '#b09a3a', '#5a9a5a'];
  function barSVG(p) {
    const rows = p.bars, labW = 74, W = 340, rowH = 46, top = p.brace != null ? 30 : 10;
    const tot = r => (r.off || 0) + r.parts.reduce((a, q) => a + q.w, 0);
    const max = Math.max.apply(null, rows.map(tot)), sc = (W - labW - 16) / max, H = top + rows.length * rowH + 8;
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="mw-bar" role="img" aria-label="線分図">';
    if (p.brace != null) {
      const x2 = labW + tot(rows[0]) * sc;
      s += '<path d="M' + labW + ' ' + (top - 4) + ' V' + (top - 12) + ' H' + x2 + ' V' + (top - 4) + '" fill="none" stroke="#7a6a5a" stroke-width="1.5"/>';
      s += '<text x="' + ((labW + x2) / 2) + '" y="' + (top - 16) + '" text-anchor="middle" font-size="12" fill="#5a4a3a">' + (rows.length > 1 ? '合計 ' : '') + p.brace + '</text>';
    }
    rows.forEach((r, i) => {
      const y = top + i * rowH + 8;
      s += '<text x="' + (labW - 8) + '" y="' + (y + 19) + '" text-anchor="end" font-size="13" fill="#3a2a1a">' + esc(r.label) + '</text>';
      let x = labW + (r.off || 0) * sc;
      r.parts.forEach(q => {
        const w = q.w * sc;
        s += '<rect x="' + x + '" y="' + y + '" width="' + Math.max(w - 1, 2) + '" height="28" rx="4" fill="' + BC[q.c || 0] + '" stroke="' + BS[q.c || 0] + '" stroke-width="1.4"/>';
        if (q.t !== '' && q.t != null) s += '<text x="' + (x + w / 2) + '" y="' + (y + 19) + '" text-anchor="middle" font-size="' + (String(q.t).length > 3 ? 11 : 13) + '" fill="#2a1a0a" font-weight="' + (q.t === '?' ? 700 : 400) + '">' + esc(q.t) + '</text>';
        x += w;
      });
    });
    return s + '</svg>';
  }

  // ================= シンガポール式 =================
  function sgList() {
    stop();
    const D = data();
    let h = head('🇸🇬 シンガポール式 線分図');
    h += '<div class="mw-box"><b>線分図 (バー・モデル) って?</b><p>文章題の 量を「棒 (バー)」で かいて、どこが わかっていて どこが「?」かを 目で 見る 方法。シンガポールでは 小学1年から 使う。式を 立てる 前に 図を かくのが ポイント!</p>' + barSVG({ bars: [{ label: 'ハル', parts: [{ w: 3, t: '?', c: 0 }, { w: 2, t: '差', c: 1 }] }, { label: 'リオ', parts: [{ w: 3, t: '', c: 0 }] }], brace: '合計' }) + '</div>';
    h += '<div class="mw-grid">';
    MW.SG.forEach(t => { const b = D.sg[t.id] || 0; h += '<button class="mw-card" data-sg="' + t.id + '"><span class="mw-ci">' + t.icon + '</span><span class="mw-cn">' + esc(t.name) + '</span><span class="mw-cs">' + (b >= 4 ? '🏅 ' : '') + b + ' / 5</span></button>'; });
    h += '</div>';
    area().innerHTML = h; bindBack();
    area().querySelectorAll('[data-sg]').forEach(b => b.onclick = () => { sfx('click'); sgPlay(MW.SG.find(t => t.id === b.dataset.sg)); });
  }
  function sgPlay(t) {
    stop();
    run = { t: t, i: 0, ok: 0, n: 5 };
    sgQ();
  }
  function sgQ() {
    const R = run, t = R.t, p = MW.sgMake(t); R.p = p; R.drawn = false; R.miss = 0;
    let h = head(t.icon + ' ' + esc(t.name) + ' <small>' + (R.i + 1) + ' / ' + R.n + '</small>', '一覧');
    h += '<div class="mw-rule">📏 ' + esc(t.rule) + '</div>';
    h += '<div class="mw-q">' + esc(p.q) + '</div>';
    h += '<div id="mwFig" class="mw-fig"><button class="mw-draw" id="mwDraw">✏ 線分図を かく</button><small>まず 自分で 紙に かいてから おしてみよう</small></div>';
    h += answerBox('mwA') + '<span class="mw-unit">' + esc(p.unit) + '</span><div id="mwFb"></div>';
    area().innerHTML = h; bindBack(sgList);
    $('mwDraw').onclick = () => { sfx('click'); R.drawn = true; $('mwFig').innerHTML = barSVG(p); };
    bindAnswer('mwA', v => sgAns(v));
  }
  function sgAns(v) {
    const R = run; if (!R || R.done) return;
    const p = R.p, ok = same(v, p.a), fb = $('mwFb');
    if (!ok && R.miss === 0) { R.miss = 1; sfx('wrong'); fb.innerHTML = '<div class="mw-ng">🤔 ちがうみたい。' + (R.drawn ? '図の「?」は どの 部分?' : '線分図を かいてみよう!') + ' もう1回!</div>'; if (!R.drawn) { R.drawn = true; $('mwFig').innerHTML = barSVG(p); } $('mwA').value = ''; return; }
    R.done = true;
    if (ok) { R.ok++; sfx('correct'); } else sfx('wrong');
    $('mwFig').innerHTML = barSVG(p);
    fb.innerHTML = '<div class="' + (ok ? 'mw-okm' : 'mw-ng') + '">' + (ok ? '⭕ 正解!' : '❌ 答えは ' + fmt(p.a) + p.unit) + '</div><ol class="mw-steps">' + p.steps.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol><button class="mw-primary" id="mwNext">' + (R.i + 1 < R.n ? '次の 問題 →' : '結果を 見る') + '</button>';
    $('mwA').disabled = true; $('mwAGo').disabled = true;
    $('mwNext').onclick = () => { sfx('click'); R.done = false; R.i++; if (R.i < R.n) sgQ(); else sgEnd(); };
  }
  function sgEnd() {
    const R = run, D = data(), t = R.t, prev = D.sg[t.id] || 0;
    D.sg[t.id] = Math.max(prev, R.ok); save();
    let h = head(t.icon + ' ' + esc(t.name) + ' — 結果', '一覧');
    h += '<div class="mw-result"><b>' + R.ok + ' / ' + R.n + '</b><p>' + (R.ok >= 4 ? '🏅 線分図マスター! この タイプは もう だいじょうぶ。' : R.ok >= 2 ? 'いい感じ! 図を かく くせを つけよう。' : '図を かいてから 式を 立てると、ぐっと 楽に なるよ。') + '</p></div>';
    h += '<div class="mw-row"><button class="mw-primary" id="mwAgain">もう一度 (新しい 数)</button><button class="mw-secondary" id="mwList">一覧へ</button></div>';
    area().innerHTML = h; bindBack(sgList);
    $('mwAgain').onclick = () => { sfx('click'); sgPlay(t); };
    $('mwList').onclick = () => { sfx('click'); sgList(); };
  }

  // ================= ロシア式 =================
  function ruList() {
    stop();
    const D = data();
    let h = head('🇷🇺 ロシア式 思考パズル');
    h += '<div class="mw-box"><b>数学サークルの 問題</b><p>速く 解くより「なぜ?」を 考える 問題たち。すぐに わからなくても だいじょうぶ。ヒントは 1回だけ 見られるよ。</p></div><div class="mw-ru">';
    MW.RU.forEach((r, i) => { h += '<button class="mw-rub' + (D.ru[i] ? ' done' : '') + '" data-ru="' + i + '">' + (D.ru[i] ? '✓' : i + 1) + '</button>'; });
    h += '</div>';
    area().innerHTML = h; bindBack();
    area().querySelectorAll('[data-ru]').forEach(b => b.onclick = () => { sfx('click'); ruPlay(+b.dataset.ru); });
  }
  function ruPlay(i) {
    stop();
    const r = MW.RU[i], D = data(); run = { i: i, miss: 0, hint: false };
    let h = head('🧩 パズル ' + (i + 1) + ' / ' + MW.RU.length + (D.ru[i] ? ' ✓' : ''), '一覧');
    h += '<div class="mw-q big">' + esc(r.q) + '</div>';
    h += answerBox('mwA') + '<div class="mw-row"><button class="mw-secondary" id="mwHint">💡 ヒント</button><button class="mw-secondary" id="mwGive">🏳 答えを 見る</button></div><div id="mwFb"></div>';
    area().innerHTML = h; bindBack(ruList);
    $('mwHint').onclick = () => { sfx('click'); run.hint = true; $('mwHint').disabled = true; $('mwFb').innerHTML = '<div class="mw-hint">💡 ' + esc(r.hint) + '</div>'; };
    $('mwGive').onclick = () => { sfx('click'); ruReveal(false); };
    bindAnswer('mwA', v => {
      if (!run || run.done) return;
      if (same(v, r.a)) { D.ru[i] = 1; save(); sfx('correct'); ruReveal(true); return; }
      run.miss++; sfx('wrong'); $('mwA').value = '';
      $('mwFb').innerHTML = '<div class="mw-ng">🤔 ちがうみたい (' + run.miss + '回目)。' + (run.hint ? '' : 'ヒントを 見てもいいよ。') + '</div>' + (run.hint ? '<div class="mw-hint">💡 ' + esc(r.hint) + '</div>' : '');
    });
  }
  function ruReveal(ok) {
    const i = run.i, r = MW.RU[i]; run.done = true;
    $('mwA').disabled = true; $('mwAGo').disabled = true; $('mwGive').disabled = true; $('mwHint').disabled = true;
    $('mwFb').innerHTML = '<div class="' + (ok ? 'mw-okm' : 'mw-ng') + '">' + (ok ? '⭕ 正解! ' : '答えは ') + fmt(r.a) + '</div><div class="mw-exp">' + esc(r.exp) + '</div><div class="mw-row">' + (i + 1 < MW.RU.length ? '<button class="mw-primary" id="mwNext">次の パズル →</button>' : '') + '<button class="mw-secondary" id="mwList">一覧へ</button></div>';
    const n = $('mwNext'); if (n) n.onclick = () => { sfx('click'); ruPlay(i + 1); };
    $('mwList').onclick = () => { sfx('click'); ruList(); };
  }

  // ================= 公式図鑑 =================
  function figSVG(k) {
    const st = 'fill="#d6e8fb" stroke="#4a6a8a" stroke-width="2"', t = (x, y, s) => '<text x="' + x + '" y="' + y + '" text-anchor="middle" font-size="12" fill="#3a2a1a">' + s + '</text>', dash = 'stroke="#c0602a" stroke-width="1.5" stroke-dasharray="4 3" fill="none"';
    const F = {
      rect: '<rect x="40" y="25" width="140" height="80" ' + st + '/>' + t(110, 120, '横') + t(25, 70, 'たて'),
      tri: '<path d="M30 105 L190 105 L120 25 Z" ' + st + '/><line x1="120" y1="25" x2="120" y2="105" ' + dash + '/>' + t(110, 122, '底辺') + t(136, 70, '高さ'),
      para: '<path d="M30 105 L160 105 L190 25 L60 25 Z" ' + st + '/><line x1="60" y1="25" x2="60" y2="105" ' + dash + '/>' + t(95, 122, '底辺') + t(78, 70, '高さ'),
      trap: '<path d="M30 105 L190 105 L150 30 L70 30 Z" ' + st + '/><line x1="70" y1="30" x2="70" y2="105" ' + dash + '/>' + t(110, 22, '上底') + t(110, 122, '下底') + t(86, 72, '高さ'),
      rhom: '<path d="M110 15 L180 65 L110 115 L40 65 Z" ' + st + '/><line x1="110" y1="15" x2="110" y2="115" ' + dash + '/><line x1="40" y1="65" x2="180" y2="65" ' + dash + '/>' + t(150, 60, '対角線'),
      circ: '<circle cx="110" cy="65" r="50" ' + st + '/><line x1="110" y1="65" x2="160" y2="65" stroke="#c0602a" stroke-width="2"/>' + t(135, 60, '半径') + '<circle cx="110" cy="65" r="2.5" fill="#c0602a"/>',
      sector: '<path d="M70 105 L170 105 A100 100 0 0 0 120.7 18.4 Z" ' + st + '/>' + t(100, 98, '中心角') + t(125, 120, '半径'),
      cuboid: '<path d="M40 50 L140 50 L140 115 L40 115 Z" ' + st + '/><path d="M40 50 L75 22 L175 22 L140 50 Z" fill="#eaf3fd" stroke="#4a6a8a" stroke-width="2"/><path d="M140 50 L175 22 L175 87 L140 115 Z" fill="#c4dcf4" stroke="#4a6a8a" stroke-width="2"/>' + t(90, 129, '横') + t(170, 112, 'たて') + t(22, 86, '高さ'),
      cyl: '<ellipse cx="110" cy="28" rx="55" ry="14" ' + st + '/><path d="M55 28 V100 A55 14 0 0 0 165 100 V28" fill="#d6e8fb" stroke="#4a6a8a" stroke-width="2"/>' + t(110, 32, '底面') + t(182, 68, '高さ'),
      speed: '<circle cx="110" cy="65" r="52" fill="#fffaf0" stroke="#7a6a5a" stroke-width="2"/><line x1="58" y1="65" x2="162" y2="65" stroke="#7a6a5a" stroke-width="2"/><line x1="110" y1="65" x2="110" y2="117" stroke="#7a6a5a" stroke-width="2"/><text x="110" y="50" text-anchor="middle" font-size="22" fill="#c0392b">き</text><text x="84" y="96" text-anchor="middle" font-size="22" fill="#2e5fa8">は</text><text x="136" y="96" text-anchor="middle" font-size="22" fill="#2a8a5a">じ</text>' + t(110, 26, '道のり') ,
      bar: '<rect x="20" y="45" width="180" height="30" fill="#eaf3fd" stroke="#4a6a8a" stroke-width="2"/><rect x="20" y="45" width="54" height="30" fill="#f6c9a8" stroke="#c07a4a" stroke-width="2"/>' + t(47, 65, '30%') + t(110, 95, 'もとにする量 = 100%'),
      avg: '<rect x="30" y="55" width="30" height="55" fill="#bcd7f0"/><rect x="75" y="25" width="30" height="85" fill="#bcd7f0"/><rect x="120" y="70" width="30" height="40" fill="#bcd7f0"/><rect x="165" y="45" width="30" height="65" fill="#bcd7f0"/><line x1="20" y1="49" x2="205" y2="49" ' + dash + '/>' + t(110, 125, 'ならすと 同じ 高さ'),
      poly: '<path d="M110 15 L175 50 L160 115 L60 115 L45 50 Z" ' + st + '/><line x1="110" y1="15" x2="160" y2="115" ' + dash + '/><line x1="110" y1="15" x2="60" y2="115" ' + dash + '/>' + t(110, 130, '三角形 3つ'),
      map: '<rect x="30" y="20" width="160" height="90" fill="#eef7e6" stroke="#5a9a5a" stroke-width="2"/><path d="M50 90 C80 40 130 100 170 40" ' + dash + '/><circle cx="50" cy="90" r="4" fill="#c0392b"/><circle cx="170" cy="40" r="4" fill="#c0392b"/>' + t(110, 125, '1 : 25000'),
      venn: '<circle cx="85" cy="65" r="45" fill="#bcd7f0" fill-opacity=".7" stroke="#4a6a8a" stroke-width="2"/><circle cx="135" cy="65" r="45" fill="#f6c9a8" fill-opacity=".7" stroke="#c07a4a" stroke-width="2"/>' + t(65, 70, 'A') + t(155, 70, 'B') + t(110, 70, '共通'),
      pyth: '<path d="M60 100 L140 100 L60 40 Z" ' + st + '/><rect x="60" y="100" width="80" height="22" fill="#f4e19a" fill-opacity=".6"/><rect x="38" y="40" width="22" height="60" fill="#c8e6c3" fill-opacity=".7"/>' + t(48, 75, 'a') + t(100, 116, 'b') + t(110, 66, 'c'),
    };
    return '<svg viewBox="0 0 220 135" class="mw-figsvg" role="img" aria-label="図">' + (F[k] || '') + '</svg>';
  }
  function fmList() {
    stop();
    const D = data(), cats = [];
    MW.FM.forEach(f => { if (cats.indexOf(f.cat) < 0) cats.push(f.cat); });
    let h = head('📘 公式図鑑');
    h += '<div class="mw-box"><p>公式は 暗記より「なぜ そうなるか」が 大事。図を 見て 導き方を 読み、確認問題に 正解すると 図鑑に 🔖 が つくよ。</p></div>';
    cats.forEach(c => {
      h += '<h3 class="mw-cat">' + esc(c) + '</h3><div class="mw-grid">';
      MW.FM.filter(f => f.cat === c).forEach(f => { h += '<button class="mw-card" data-fm="' + f.id + '"><span class="mw-ci">' + (D.fm[f.id] ? '🔖' : '📄') + '</span><span class="mw-cn">' + esc(f.name) + '</span><span class="mw-cs f">' + esc(f.f) + '</span></button>'; });
      h += '</div>';
    });
    area().innerHTML = h; bindBack();
    area().querySelectorAll('[data-fm]').forEach(b => b.onclick = () => { sfx('click'); fmView(MW.FM.find(f => f.id === b.dataset.fm)); });
  }
  function fmView(f) {
    stop();
    const D = data(), c = f.chk(); run = { f: f, c: c, miss: 0 };
    let h = head('📘 ' + esc(f.name) + (D.fm[f.id] ? ' 🔖' : ''), '図鑑');
    h += '<div class="mw-fcard">' + figSVG(f.fig) + '<div class="mw-formula">' + esc(f.f) + '</div><div class="mw-how"><b>なぜ?</b> ' + esc(f.how) + '</div></div>';
    h += '<div class="mw-q">✅ 確認問題: ' + esc(c.q) + '</div>' + answerBox('mwA') + '<div id="mwFb"></div>';
    area().innerHTML = h; bindBack(fmList);
    bindAnswer('mwA', v => {
      if (!run || run.done) return;
      const ok = same(v, c.a);
      if (!ok && run.miss === 0) { run.miss = 1; sfx('wrong'); $('mwA').value = ''; $('mwFb').innerHTML = '<div class="mw-ng">🤔 もう一度。公式に 数を 当てはめてみよう: ' + esc(f.f) + '</div>'; return; }
      run.done = true; $('mwA').disabled = true; $('mwAGo').disabled = true;
      if (ok) { D.fm[f.id] = 1; save(); sfx('correct'); } else sfx('wrong');
      $('mwFb').innerHTML = '<div class="' + (ok ? 'mw-okm' : 'mw-ng') + '">' + (ok ? '⭕ 正解! 図鑑に 🔖' : '答えは ' + fmt(c.a)) + '</div><div class="mw-row"><button class="mw-primary" id="mwMore">別の 数で もう1問</button><button class="mw-secondary" id="mwList">図鑑へ</button></div>';
      $('mwMore').onclick = () => { sfx('click'); fmView(f); };
      $('mwList').onclick = () => { sfx('click'); fmList(); };
    });
  }

  // ================= 勉強法 =================
  function study() {
    stop();
    let h = head('🌏 世界の 勉強法');
    MW.STUDY.forEach(s => { h += '<div class="mw-study"><div class="mw-si">' + s.icon + '</div><div><b>' + esc(s.t) + '</b><p>' + esc(s.b) + '</p></div></div>'; });
    h += '<div class="mw-row"><button class="mw-primary" id="mwGoSg">🇸🇬 線分図を ためす</button><button class="mw-secondary" id="mwGoRu">🇷🇺 パズルを ためす</button></div>';
    area().innerHTML = h; bindBack();
    $('mwGoSg').onclick = () => { sfx('click'); sgList(); };
    $('mwGoRu').onclick = () => { sfx('click'); ruList(); };
  }

  function open(where) {
    showPage('pageMathWorld');
    ({ sg: sgList, ru: ruList, fm: fmList, study: study }[where] || home)();
    const p = $('pageMathWorld'); if (p) p.scrollTop = 0;
  }
  return { open: open, stop: stop, _bar: barSVG, _fig: figSVG, _run: () => run };
})();
