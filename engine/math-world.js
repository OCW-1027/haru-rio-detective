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
  function stop() { if (run && run.timer) clearInterval(run.timer); run = null; document.onkeydown = null; }
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
    const ladDone = LADDER.U.filter(u => ((D.lad || {})[u.id] || {}).best >= 8).length;
    h += corner('mwLad', '📈', '中学・高校 数学ラダー', '中1 〜 高2 + 発展 ・ ' + LADDER.U.length + ' 単元', ladDone + ' / ' + LADDER.U.length, '#2a6a9a');
    h += corner('mwIndian', '🇮🇳', 'インド式 計算道場 へ', '事務所の「インド式 計算道場」と 同じ 道場です', '→', '#d0702a');
    h += corner('mwSg', '🇸🇬', 'シンガポール式 線分図', '文章題を 図に して 解く', sgStars + ' / ' + MW.SG.length, '#c0392b');
    h += corner('mwRu', '🇷🇺', 'ロシア式 思考パズル', 'じっくり 考える 24題', ru + ' / ' + MW.RU.length, '#2e5fa8');
    h += corner('mwFm', '📘', '公式図鑑', '公式が「なぜ そうなるか」', fm + ' / ' + MW.FM.length, '#2a8a5a');
    h += corner('mwStudy', '🌏', '世界の 勉強法', '強い 国の 学び方', '📖', '#7a5aa8');
    h += '</div><p class="mw-note">💡 同じ 問題でも、国に よって 考え方が ちがう。いちばん わかりやすい 方法を 自分で 選べるのが 最強!</p>';
    area().innerHTML = h;
    $('mwIndian').onclick = () => { sfx('click'); stop(); if (typeof IndianMath !== 'undefined') IndianMath.open(); };
    $('mwLad').onclick = () => { sfx('click'); ladList(LADDER); };
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
    h += '<div class="mw-fcard">' + (f.fig ? figSVG(f.fig) : '') + '<div class="mw-formula">' + esc(f.f) + '</div><div class="mw-how"><b>なぜ?</b> ' + esc(f.how) + '</div></div>';
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

  // ================= 中学・高校 数学ラダー / 理科・社会 ラダー (L で 切り替え) =================
  let L = LADDER;
  function ladData() { const d = data(); return d.lad || (d.lad = {}); }
  const ladStar = id => { const r = ladData()[id]; return !r ? '' : r.best >= 10 ? '🏅' : r.best >= 8 ? '★' : '·'; };
  function toVal(v) { return Array.isArray(v) ? v[0] / v[1] : v; }
  function parseAns(s) {
    s = String(s).trim().replace(/[０-９．／－]/g, c => ({ '．': '.', '／': '/', '－': '-' })[c] || String.fromCharCode(c.charCodeAt(0) - 0xFEE0)).replace(/[−–—ー]/g, '-').replace(/\s/g, '');
    if (!s) return null;
    const m = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/); if (m) return +m[2] === 0 ? null : +m[1] / +m[2];
    return /^-?\d+(\.\d+)?$/.test(s) ? +s : null;
  }
  const near = (x, y) => x != null && Math.abs(x - y) < 1e-9;
  function ladList(src) {
    stop(); if (src) L = src;
    const isM = L === LADDER, D = ladData(); let h = head(L.icon + ' ' + L.title);
    const done = L.U.filter(u => (D[u.id] || {}).best >= 8).length;
    h += '<div class="mw-box"><b>' + (isM ? '中学1年 から 高校2年 (+ 発展) まで ' : '中学 理科 から 高校 物理基礎・化学基礎、社会まで ') + L.U.length + ' 単元</b><p>どの 単元からでも 始めて OK。「要点 → 例題 → 練習 10問」で、8問 以上 正解で ★、全問 正解で 🏅。' + (isM ? '問題の 数は 毎回 変わるよ。' : '理科は 数値が 毎回 変わり、社会は 解説つきの 厳選問題だよ。') + '</p><div class="mw-ladprog">' + '<i style="width:' + Math.round(done * 100 / L.U.length) + '%"></i></div><small class="mw-ladn">★ ' + done + ' / ' + L.U.length + '</small></div>';
    const last = (data().diag || []).filter(d => isM ? d.lv !== 's' : d.lv === 's').slice(-1)[0];
    if (!isM) h += '<div class="mw-row"><button class="mw-primary" data-diag="s">🩺 社会 実力診断 (20問)</button></div>';
    if (isM) h += '<div class="mw-row"><button class="mw-primary" data-diag="c">🩺 実力診断 (中学 20問)</button><button class="mw-primary" data-diag="h">🩺 実力診断 (高校 20問)</button></div>' + (last ? '<p class="mw-note">前回の 診断: ' + esc(last.d) + ' ' + ({ c: '中学', h: '高校', s: '社会' })[last.lv] + ' ' + last.ok + ' / ' + last.n + '</p>' : '');
    L.GROUPS.forEach(g => {
      const us = L.U.filter(u => u.g === g.id); if (!us.length) return;
      h += '<h3 class="mw-cat" style="color:' + g.color + '">' + g.name + ' <small>' + us.filter(u => (D[u.id] || {}).best >= 8).length + ' / ' + us.length + '</small></h3><div class="mw-grid">';
      us.forEach(u => { h += '<button class="mw-card" data-lu="' + u.id + '" style="border-color:color-mix(in srgb,' + g.color + ' 30%,white)"><span class="mw-ci">' + u.icon + '</span><span class="mw-cn">' + esc(u.name) + '</span><span class="mw-cs">' + (ladStar(u.id) || '未挑戦') + ((D[u.id] || {}).best != null ? (u.ta ? ' ベスト ' + (D[u.id].ta || 0) + '問' : ' ' + D[u.id].best + '/10') : '') + '</span></button>'; });
      h += '</div>';
    });
    area().innerHTML = h; bindBack(isM ? home : () => { if (typeof Hub !== 'undefined') Hub.open(); });
    if (!isM) { const b0 = $('mwBack'); if (b0) b0.textContent = '← 事務所'; }
    area().querySelectorAll('[data-lu]').forEach(b => b.onclick = () => { sfx('click'); ladUnit(L.byId(b.dataset.lu)); });
    area().querySelectorAll('[data-diag]').forEach(b => b.onclick = () => { sfx('click'); diagStart(b.dataset.diag); });
  }
  function diagStart(lv) {
    const gs = lv === 'c' ? ['c1', 'c2', 'c3'] : lv === 's' ? ['sh', 'sg', 'sc2'] : ['h1', 'hA', 'h2', 'hB', 'h3'];
    if (lv === 's') L = SCILAD; else L = LADDER;
    const pool = L.U.filter(u => gs.indexOf(u.g) >= 0).sort(() => Math.random() - 0.5), units = [];
    while (units.length < 20) units.push(pool[units.length % pool.length]);
    units.sort((a, b) => L.U.indexOf(a) - L.U.indexOf(b));   // やさしい 順
    run = { diag: lv, units: units, u: units[0], i: 0, ok: 0, n: 20, wrong: [], res: [] }; ladQ();
  }
  function diagEnd() {
    const R = run, D = data(), byU = {};
    R.units.forEach((u, i) => { const b = byU[u.id] || (byU[u.id] = [0, 0]); b[1]++; if (R.res[i]) b[0]++; });
    const weak = Object.keys(byU).filter(id => byU[id][0] < byU[id][1]);
    const rec = { d: (typeof Study !== 'undefined' ? Study.today() : ''), lv: R.diag, ok: R.ok, n: R.n, weak: weak };
    D.diag = (D.diag || []).concat([rec]).slice(-10); save();
    const gs = {}; R.units.forEach((u, i) => { const g = gs[u.g] || (gs[u.g] = [0, 0]); g[1]++; if (R.res[i]) g[0]++; });
    let h = head('🩺 実力診断 — 結果', '一覧');
    const pct = Math.round(R.ok * 100 / R.n);
    h += '<div class="mw-result"><b>' + R.ok + ' / ' + R.n + '</b><p>' + (pct >= 85 ? '🏅 すばらしい! この レベルは ほぼ 完ぺき。次の 学年へ 進もう。' : pct >= 60 ? 'よく できました! 下の 苦手 単元を 練習すると 完成に 近づくよ。' : 'まずは 下の 単元の 要点と 例題から 始めよう。') + '</p></div>';
    h += '<div class="mw-box"><b>' + (R.diag === 's' ? '分野別' : '学年別') + '</b><table class="mw-dtbl">' + Object.keys(gs).map(g => { const G = L.GROUPS.find(x => x.id === g); return '<tr><th style="color:' + G.color + '">' + G.name + '</th><td>' + gs[g][0] + ' / ' + gs[g][1] + '</td><td><span class="mw-dbar"><i style="width:' + Math.round(gs[g][0] * 100 / gs[g][1]) + '%;background:' + G.color + '"></i></span></td></tr>'; }).join('') + '</table></div>';
    if (weak.length) h += '<div class="mw-box"><b>📌 おすすめ 単元 (まちがえた ところ)</b><div class="mw-grid" style="margin-top:8px">' + weak.map(id => { const u = L.byId(id); return '<button class="mw-card" data-lu="' + id + '"><span class="mw-ci">' + u.icon + '</span><span class="mw-cn">' + esc(u.name) + '</span><span class="mw-cs">' + L.GROUPS.find(x => x.id === u.g).name + '</span></button>'; }).join('') + '</div></div>';
    h += '<div class="mw-row"><button class="mw-secondary" id="mwList">一覧へ</button></div>';
    area().innerHTML = h; bindBack(ladList);
    area().querySelectorAll('[data-lu]').forEach(b => b.onclick = () => { sfx('click'); ladUnit(L.byId(b.dataset.lu)); });
    $('mwList').onclick = () => { sfx('click'); ladList(); };
  }
  function fmtA(p) { return p.type === 'text' ? p.model : p.type === 'choice' ? p.opts[0] : p.type === 'num' ? L._fs(p.a) : p.type === 'set' ? L._fs(p.a[0]) + ', ' + L._fs(p.a[1]) : (p.labels || ['', '']).map((l, i) => l + ' = ' + L._fs(p.a[i])).join('、'); }
  function ladUnit(u) {
    stop();
    const g = L.GROUPS.find(x => x.id === u.g), ex = L.make(u);
    let h = head(u.icon + ' ' + esc(u.name), '一覧');
    h += '<div class="mw-tag" style="background:' + g.color + '">' + g.name + '</div>';
    h += '<div class="mw-box mw-point"><b>📌 要点</b><ul>' + u.point.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul></div>';
    h += '<div class="mw-box"><b>📝 例題</b><div class="mw-q mw-pre">' + esc(ex.q) + (ex.fig ? '<div class="mw-qfig">' + ex.fig + '</div>' : '') + (ex.type === 'choice' ? '<div class="mw-exopts">' + ex.opts.map((o, i) => '<span>' + ['ア', 'イ', 'ウ', 'エ'][i] + ' ' + esc(o) + '</span>').join('') + '</div>' : '') + '</div><ol class="mw-steps" id="mwExSteps"></ol><div class="mw-row"><button class="mw-secondary" id="mwExNext">次の ステップ ▶</button><button class="mw-secondary" id="mwExNew">別の 例題</button></div></div>';
    h += '<div class="mw-row"><button class="mw-primary" id="mwLadGo">' + (u.ta ? '⏱ スタート (' + u.ta + '秒)' + (ladData()[u.id] ? ' ・ 自己ベスト ' + (ladData()[u.id].ta || 0) + '問' : '') : '✏ 練習 10問') + '</button></div>';
    area().innerHTML = h; bindBack(ladList);
    let k = 0; const steps = ex.steps.concat(['答え: ' + fmtA(ex)]);
    $('mwExNext').onclick = () => { sfx('click'); if (k < steps.length) { $('mwExSteps').insertAdjacentHTML('beforeend', '<li>' + esc(steps[k]) + '</li>'); k++; } if (k >= steps.length) $('mwExNext').disabled = true; };
    $('mwExNew').onclick = () => { sfx('click'); ladUnit(u); };
    $('mwLadGo').onclick = () => { sfx('click'); if (u.ta) { taStart(u); return; } run = { u: u, i: 0, ok: 0, n: 10, wrong: [] }; ladQ(); };
  }
  function ladQ() {
    const R = run; if (R.diag) R.u = R.units[R.i]; const u = R.u, p = L.make(u); R.p = p; R.done = false; R.miss = 0;
    if (p.type === 'choice') { const idx = p.opts.map((o, i) => i); for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; } R.order = idx; }
    let h = head((R.diag ? '🩺 実力診断 ・ ' : '') + u.icon + ' ' + esc(u.name) + ' <small>' + (R.i + 1) + ' / ' + R.n + '</small>', R.diag ? '一覧' : '単元');
    h += '<div class="mw-dots">' + Array.from({ length: R.n }, (_, i) => '<i class="' + (i < R.i ? (R.res && R.res[i] ? 'ok' : 'ng') : i === R.i ? 'cur' : '') + '"></i>').join('') + '</div>';
    h += '<div class="mw-q big mw-pre">' + esc(p.q) + (p.fig ? '<div class="mw-qfig">' + p.fig + '</div>' : '') + '</div>';
    if (p.type === 'choice') h += '<div class="mw-chs">' + R.order.map((oi, k) => '<button class="mw-ch" data-ch="' + oi + '"><b>' + ['ア', 'イ', 'ウ', 'エ'][k] + '</b> ' + esc(p.opts[oi]) + '</button>').join('') + '</div>';
    else if (p.type === 'text') h += '<textarea id="mwT" class="mw-text" rows="3" placeholder="理由を 書こう (〜から / 〜ため)"></textarea><div class="mw-row"><button class="mw-primary" id="mwTGo">決定</button></div>';
    else if (p.type === 'num') h += '<div class="mw-inp"><input id="mwA" autocomplete="off" placeholder="答え"><button class="mw-ok" id="mwAGo">決定</button></div><div class="mw-keys"><button data-ins="−">−</button><button data-ins="/">/</button><span>分数は 3/4、負の数は −5</span></div>';
    else { const L = p.type === 'set' ? ['解 1', '解 2'] : p.labels; h += '<div class="mw-pair"><label>' + esc(L[0]) + '<input id="mwA1" autocomplete="off"></label><label>' + esc(L[1]) + '<input id="mwA2" autocomplete="off"></label><button class="mw-ok" id="mwPairGo">決定</button></div><div class="mw-keys"><button data-ins="−">−</button><button data-ins="/">/</button><span>分数は 3/4、負の数は −5</span></div>'; }
    h += '<div id="mwFb"></div>';
    area().innerHTML = h; bindBack(R.diag ? ladList : () => ladUnit(u));
    let lastF = 'mwA'; ['mwA', 'mwA1', 'mwA2'].forEach(id => { const e = $(id); if (e) e.addEventListener('focus', () => { lastF = id; }); });
    area().querySelectorAll('[data-ins]').forEach(b => { b.onmousedown = e => e.preventDefault(); b.onclick = () => { const e = $(lastF) || $('mwA1'); if (!e || e.disabled) return; e.value += b.dataset.ins; e.focus(); }; });
    if (p.type === 'choice') area().querySelectorAll('[data-ch]').forEach(b => b.onclick = () => ladAns(+b.dataset.ch === 0, b));
    else if (p.type === 'text') {
      $('mwTGo').onclick = () => { const t = ($('mwT').value || '').replace(/\s/g, ''); if (t.length < 5) { $('mwT').classList.add('shake'); setTimeout(() => $('mwT').classList.remove('shake'), 400); return; }
        const hits = p.keys.map(g => g.some(k => t.indexOf(k.replace(/\s/g, '')) >= 0)); R.hits = hits; R.mine = $('mwT').value; ladAns(hits.every(Boolean)); };
    }
    else if (p.type === 'num') { const go = () => { const v = parseAns($('mwA').value); if (v == null) { $('mwA').classList.add('shake'); setTimeout(() => $('mwA').classList.remove('shake'), 400); return; } ladAns(near(v, toVal(p.a))); };
      $('mwAGo').onclick = go; $('mwA').onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); go(); } }; if (!('ontouchstart' in window)) $('mwA').focus(); }
    else {
      const go = () => { const x = parseAns($('mwA1').value), y = parseAns($('mwA2').value); if (x == null || y == null) { ($('mwA1').value ? $('mwA2') : $('mwA1')).focus(); return; }
        const a = toVal(p.a[0]), b = toVal(p.a[1]);
        ladAns(p.type === 'set' ? ((near(x, a) && near(y, b)) || (near(x, b) && near(y, a))) : near(x, a) && near(y, b)); };
      $('mwPairGo').onclick = go; ['mwA1', 'mwA2'].forEach(id => $(id).onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); id === 'mwA1' && !$('mwA2').value ? $('mwA2').focus() : go(); } });
      if (!('ontouchstart' in window)) $('mwA1').focus();
    }
  }
  function ladAns(ok, btn) {
    const R = run; if (!R || R.done) return; const p = R.p, fb = $('mwFb');
    if (!ok && R.miss === 0 && p.type !== 'choice' && p.type !== 'text' && !R.diag) { R.miss = 1; sfx('wrong'); fb.innerHTML = '<div class="mw-ng">🤔 ちがうみたい。もう1回! (符号・約分・計算ミスを 確認)</div>'; return; }
    R.done = true; R.res = R.res || []; R.res[R.i] = ok; if (ok) R.ok++; else R.wrong.push(p);
    sfx(ok ? 'correct' : 'wrong');
    area().querySelectorAll('.mw-ch').forEach(b => { b.disabled = true; if (+b.dataset.ch === 0) b.classList.add('right'); }); if (btn && !ok) btn.classList.add('wrongc');
    ['mwA', 'mwAGo', 'mwA1', 'mwA2', 'mwPairGo', 'mwT', 'mwTGo'].forEach(id => { const e = $(id); if (e) e.disabled = true; });
    const kx = p.type === 'text' ? '<div class="mw-keyhit">' + p.keys.map((g, i) => '<span class="' + (R.hits[i] ? 'ok' : 'ng') + '">' + (R.hits[i] ? '✓ ' : '✗ ') + esc(g[0]) + '</span>').join('') + '</div><div class="mw-exp"><b>モデル解答</b><br>' + esc(p.model) + '</div>' : '';
    fb.innerHTML = '<div class="' + (ok ? 'mw-okm' : 'mw-ng') + '">' + (p.type === 'text' ? (ok ? '⭕ キーワード OK!' : '△ キーワードが 足りない') : ok ? '⭕ 正解!' : '❌ 答えは ' + esc(fmtA(p))) + '</div>' + kx + (p.type === 'text' ? '' : ok ? '<details class="mw-det"><summary>解き方を 見る</summary><ol class="mw-steps">' + p.steps.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol></details>' : '<ol class="mw-steps">' + p.steps.map(s => '<li>' + esc(s) + '</li>').join('') + '</ol>') + '<button class="mw-primary" id="mwNext">' + (R.i + 1 < R.n ? '次の 問題 →' : '結果を 見る') + '</button>';
    $('mwNext').onclick = () => { sfx('click'); R.i++; if (R.i < R.n) ladQ(); else if (R.diag) diagEnd(); else ladEnd(); };
  }
  // ---- タイムアタック ----
  function taStart(u) { stop(); run = { u: u, ta: true, ok: 0, n: 0, end: Date.now() + u.ta * 1000 }; taQ(); run.timer = setInterval(taTick, 250); }
  function taTick() { const R = run; if (!R || !R.ta) return; const left = Math.max(0, Math.ceil((R.end - Date.now()) / 1000)), el = $('mwTaT'); if (el) el.textContent = left; if (left <= 0) taEnd(); }
  function taQ() {
    const R = run, u = R.u, p = L.make(u); R.p = p; R.lock = false;
    const idx = p.opts.map((o, i) => i).sort(() => Math.random() - 0.5);
    let h = head('⏱ ' + esc(u.name), '単元');
    h += '<div class="mw-ta"><span>残り <b id="mwTaT">' + Math.max(0, Math.ceil((R.end - Date.now()) / 1000)) + '</b> 秒</span><span>正解 <b>' + R.ok + '</b> / ' + R.n + '</span></div>';
    h += '<div class="mw-q big mw-pre">' + esc(p.q) + '</div><div class="mw-chs">' + idx.map((oi, k) => '<button class="mw-ch" data-ch="' + oi + '"><b>' + ['ア', 'イ', 'ウ', 'エ'][k] + '</b> ' + esc(p.opts[oi]) + '</button>').join('') + '</div><div id="mwFb"></div>';
    area().innerHTML = h; bindBack(() => { const t = run && run.timer; if (t) clearInterval(t); ladUnit(u); });
    area().querySelectorAll('[data-ch]').forEach(b => b.onclick = () => {
      const R2 = run; if (!R2 || !R2.ta || R2.lock) return; R2.lock = true; R2.n++;
      const ok = +b.dataset.ch === 0; if (ok) R2.ok++; sfx(ok ? 'correct' : 'wrong');
      area().querySelectorAll('.mw-ch').forEach(x => { if (+x.dataset.ch === 0) x.classList.add('right'); }); if (!ok) b.classList.add('wrongc');
      if (!ok) $('mwFb').innerHTML = '<div class="mw-ng" style="font-size:13px">' + p.steps.map(esc).join('<br>') + '</div>';
      setTimeout(() => { if (run === R2 && Date.now() < R2.end) taQ(); }, ok ? 450 : 1800);
    });
  }
  function taEnd() {
    const R = run; if (!R || !R.ta || R.done) return; R.done = true; clearInterval(R.timer);
    const D = ladData(), r = D[R.u.id] || (D[R.u.id] = { best: 0, n: 0 }), prev = r.ta || 0;
    r.ta = Math.max(prev, R.ok); r.n = (r.n || 0) + 1; r.best = Math.max(r.best || 0, R.ok >= 12 ? 10 : R.ok >= 8 ? 8 : 0); save();
    let h = head('⏱ ' + esc(R.u.name) + ' — 結果', '単元');
    h += '<div class="mw-result"><b>' + R.ok + ' 問</b><p>' + R.n + '問 中 ' + R.ok + '問 正解' + (R.ok > prev ? '<br>🎉 自己ベスト 更新! (前回まで ' + prev + '問)' : '<br>自己ベスト ' + prev + '問') + '<br>' + (R.ok >= 12 ? '🏅 年表マスター!' : R.ok >= 8 ? '★ 合格!' : '8問で ★') + '</p></div>';
    h += '<div class="mw-row"><button class="mw-primary" id="mwAgain">もう一度</button><button class="mw-secondary" id="mwList">一覧へ</button></div>';
    area().innerHTML = h; bindBack(() => ladUnit(R.u));
    $('mwAgain').onclick = () => { sfx('click'); taStart(R.u); };
    $('mwList').onclick = () => { sfx('click'); ladList(); };
  }
  function ladEnd() {
    const R = run, u = R.u, D = ladData(), r = D[u.id] || (D[u.id] = { best: 0, n: 0 }), before = r.best;
    r.best = Math.max(r.best || 0, R.ok); r.n = (r.n || 0) + 1; save();
    let h = head(u.icon + ' ' + esc(u.name) + ' — 結果', '単元');
    h += '<div class="mw-result"><b>' + R.ok + ' / ' + R.n + '</b><p>' + (R.ok === 10 ? '🏅 パーフェクト! この 単元は 完全に マスター。' : R.ok >= 8 ? '★ 合格! 次の 単元へ 進もう。' : 'あと ' + (8 - R.ok) + '問で ★。まちがえた 問題の 解き方を 見直そう。') + (r.best > before && before ? '<br>(自己ベスト 更新)' : '') + '</p></div>';
    const idx = L.U.indexOf(u), nx = L.U[idx + 1];
    h += '<div class="mw-row"><button class="mw-primary" id="mwAgain">もう一度 (新しい 問題)</button>' + (nx ? '<button class="mw-secondary" id="mwNextU">次の 単元: ' + esc(nx.name) + '</button>' : '') + '<button class="mw-secondary" id="mwList">一覧へ</button></div>';
    area().innerHTML = h; bindBack(() => ladUnit(u));
    $('mwAgain').onclick = () => { sfx('click'); run = { u: u, i: 0, ok: 0, n: 10, wrong: [] }; ladQ(); };
    if (nx) $('mwNextU').onclick = () => { sfx('click'); ladUnit(nx); };
    $('mwList').onclick = () => { sfx('click'); ladList(); };
  }

  function open(where) {
    showPage('pageMathWorld');
    if (where === 'sci') ladList(SCILAD); else if (where === 'lad') ladList(LADDER); else ({ sg: sgList, ru: ruList, fm: fmList, study: study }[where] || home)();
    const p = $('pageMathWorld'); if (p) p.scrollTop = 0;
  }
  return { open: open, stop: stop, _bar: barSVG, _fig: figSVG, _run: () => run };
})();
