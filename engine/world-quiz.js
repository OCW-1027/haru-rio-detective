/* engine/world-quiz.js — 世界の 国 クイズ (4択で 237の 国・地域と 首都を 全部 解く)
 * 地図 データ: WORLDMAP (data/world-countries.js)、地図 描画: SCILAD._wMap (data/sci-ladder.js)
 * モード: map = 地図 → 国名、cap = 国名 → 首都、rev = 首都 → 国名
 * 保存: State.v2.wq = { map: {code: [正解数, 不正解数, 最後 1/0]}, cap: {...}, rev: {...} }
 * 画面: pageWQ (#wqArea)。Dependencies: State, saveState, showPage, sfx, escapeHtml, WORLDMAP, SCILAD
 */
const WorldQuiz = (function () {
  const CONT = [
    ['all', '🌏', '全世界', null], ['asia', '🏯', 'アジア', ['ea', 'se', 'sa', 'ca', 'wa']], ['eu', '🏰', 'ヨーロッパ', ['eu1', 'eu2', 'eu3', 'eu5', 'eu4', 'ru']],
    ['af', '🦁', 'アフリカ', ['afn', 'afw', 'afc', 'afe', 'afs']], ['nam', '🗽', '北・中央アメリカ', ['na', 'cam', 'cb', 'cb2']], ['sam', '🦙', '南アメリカ', ['la']], ['oce', '🐨', 'オセアニア', ['oc', 'pa']],
  ];
  const MODES = { map: ['🗺', '地図 → 国名', '赤く ぬった 国・地域の 名前を 答える'], cap: ['🏛', '国名 → 首都', '国・地域の 首都 (政庁所在地) を 答える'], rev: ['🔁', '首都 → 国名', '首都から 国・地域を 答える'], flag: ['🚩', '国旗 → 国名', '国旗を 見て 国を 答える (' + (typeof FLAGS !== 'undefined' ? FLAGS.names().length : 0) + 'か国)'], paint: ['🎨', '国旗ぬりえ', '色を えらんで 国旗を 自分で ぬる'] };
  let mode = 'map', run = null;
  const $ = id => document.getElementById(id), esc = s => escapeHtml(String(s));
  const M = () => WORLDMAP, K = c => M().K[c];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.wq || (State.v2.wq = {}); ['map', 'cap', 'rev', 'flag', 'paint'].forEach(m => d[m] = d[m] || {}); return d; }
  function save() { try { saveState(); } catch (e) {} }
  function items(cont, md) {   // 対象の コード一覧
    const C = CONT.find(c => c[0] === cont), rs = C[3] || Object.keys(M().R);
    return Object.keys(M().K).filter(k => rs.indexOf(K(k)[2]) >= 0 && (md === 'paint' ? Paint.ok(K(k)[0]) : md === 'flag' ? (typeof FLAGS !== 'undefined' && FLAGS.has(K(k)[0])) : (md === 'map' || K(k)[1])));
  }
  const mastered = (md, k) => { const r = data()[md][k]; return !!r && r[2] === 1; };
  function area() { return $('wqArea'); }

  function menu() {
    run = null; const D = data();
    let h = '<div class="wq-head"><h1>🌐 世界の 国 クイズ</h1><p>世界の 237の 国・地域 (海外領土も ふくむ) と 首都を 4択で 全部 制覇しよう。最後に 正解した 国が「覚えた」に なるよ。</p></div>';
    h += '<div class="wq-modes">' + Object.keys(MODES).map(m => '<button class="wq-mode' + (m === mode ? ' on' : '') + '" data-mode="' + m + '"><b>' + MODES[m][0] + ' ' + MODES[m][1] + '</b><small>' + MODES[m][2] + '</small></button>').join('') + '</div>';
    h += '<div class="wq-conts">';
    CONT.forEach(([id, ic, nm]) => { const it = items(id, mode), got = it.filter(k => mastered(mode, k)).length, weak = it.filter(k => { const r = D[mode][k]; return r && r[2] === 0; }).length;
      h += '<div class="wq-cont' + (id === 'all' ? ' all' : '') + '"><button class="wq-cgo" data-cont="' + id + '"><span class="wq-ci">' + ic + '</span><span class="wq-cn">' + nm + '</span><span class="wq-cc">覚えた ' + got + ' / ' + it.length + '</span><span class="wq-bar"><i style="width:' + Math.round(got * 100 / Math.max(1, it.length)) + '%"></i></span></button>' +
        (weak ? '<button class="wq-weak" data-weak="' + id + '">苦手 ' + weak + '</button>' : '') + '</div>'; });
    h += '</div><p class="wq-note">地図で 位置を じっくり 学ぶ ときは「理科・社会 ラダー」の 世界地図 単元へ。</p>';
    area().innerHTML = h;
    area().querySelectorAll('[data-mode]').forEach(b => b.onclick = () => { sfx('click'); mode = b.dataset.mode; menu(); });
    area().querySelectorAll('[data-cont]').forEach(b => b.onclick = () => { sfx('click'); start(b.dataset.cont, items(b.dataset.cont, mode)); });
    area().querySelectorAll('[data-weak]').forEach(b => b.onclick = () => { sfx('click'); start(b.dataset.weak, items(b.dataset.weak, mode).filter(k => { const r = D[mode][k]; return r && r[2] === 0; })); });
  }

  function start(cont, list) { if (!list.length) return; run = { cont: cont, md: mode, list: shuffle(list), i: 0, ok: 0, wrong: [] }; question(); }

  function makeQ(code, md) {
    const X = K(code), R = M().R[X[2]], me = R.C.find(c => c[0] === code), pool = R.C.filter(c => c[0] !== code);
    const near = pool.sort((a, b) => Math.hypot(a[1] - me[1], a[2] - me[2]) - Math.hypot(b[1] - me[1], b[2] - me[2]));
    let right, cands;
    if (md === 'flag') {   // 似た 国旗 → 近くの 国旗の ある 国 → その他 国旗の ある 国
      right = X[0]; const has = c => FLAGS.has(K(c[0] || c)[0]), wr = [];
      FLAGS.like(X[0]).forEach(n => { if (n !== right && wr.length < 2 && Object.values(M().K).some(k => k[0] === n)) wr.push(n); });
      near.filter(has).map(c => K(c[0])[0]).concat(shuffle(Object.keys(M().K).filter(c => FLAGS.has(K(c)[0])).map(c => K(c)[0]))).forEach(n => { if (n !== right && wr.indexOf(n) < 0 && wr.length < 3) wr.push(n); });
      return { right: right, opts: shuffle([right].concat(wr)) };
    }
    if (md === 'cap') { right = X[1]; cands = (X[3] ? [X[3]] : []).concat(near.filter(c => K(c[0])[1]).slice(0, 7).map(c => K(c[0])[1])); }
    else { right = X[0]; cands = near.filter(c => md === 'map' || K(c[0])[1]).slice(0, 7).map(c => K(c[0])[0]); }
    const wr = [], trap = md === 'cap' && X[3] ? X[3] : null; if (trap) wr.push(trap);
    shuffle(cands.slice(0, 6)).forEach(c => { if (c !== right && wr.indexOf(c) < 0 && wr.length < 3) wr.push(c); });
    if (wr.length < 3) { const all = Object.keys(M().K).map(K).filter(k => md !== 'cap' || k[1]).map(k => md === 'cap' ? k[1] : k[0]); shuffle(all).forEach(c => { if (c !== right && wr.indexOf(c) < 0 && wr.length < 3) wr.push(c); }); }
    return { right: right, opts: shuffle([right].concat(wr)) };
  }

  function question() {
    const R = run; if (R.i >= R.list.length) return result();
    if (R.md === 'paint') return paintQ();
    const code = R.list[R.i], X = K(code), md = R.md, q = makeQ(code, md); R.q = q; R.code = code;
    const title = md === 'flag' ? 'この 国旗は どこの 国?' : md === 'map' ? '地図で 赤く ぬった 国・地域は?' : md === 'cap' ? '「' + X[0] + '」の 首都 (政庁所在地) は?' : '首都 (政庁所在地) が「' + X[1] + '」の 国・地域は?';
    let h = '<div class="wq-top"><button class="wq-quit" id="wqQuit">← やめる</button><span>' + MODES[md][0] + ' ' + MODES[md][1] + '</span><span class="wq-cnt">' + (R.i + 1) + ' / ' + R.list.length + ' ・ ⭕ ' + R.ok + '</span></div>';
    h += '<div class="wq-prog"><i style="width:' + Math.round(R.i * 100 / R.list.length) + '%"></i></div>';
    h += '<div class="wq-q"><div class="wq-qt">' + esc(title) + '</div>' + (md === 'flag' ? '' : '<div class="wq-reg">' + esc(M().R[X[2]].n) + '</div>') + (md === 'flag' ? '<div class="wq-flag">' + FLAGS.svg(X[0]) + '</div><div class="wq-map" id="wqMapLater"></div>' : md !== 'rev' ? '<div class="wq-map">' + SCILAD._wMap(X[2], code) + '</div>' : '<div class="wq-map" id="wqMapLater"></div>') + '</div>';
    h += '<div class="wq-opts">' + q.opts.map((o, i) => '<button class="wq-opt" data-o="' + i + '"><b>' + ['ア', 'イ', 'ウ', 'エ'][i] + '</b> ' + esc(o) + '</button>').join('') + '</div><div id="wqFb"></div>';
    area().innerHTML = h; $('pageWQ').scrollTop = 0;
    $('wqQuit').onclick = () => { sfx('click'); result(true); };
    area().querySelectorAll('[data-o]').forEach(b => b.onclick = () => answer(+b.dataset.o));
  }

  function answer(oi) {
    const R = run; if (R.done) return; R.done = true;
    const ok = R.q.opts[oi] === R.q.right, X = K(R.code), D = data()[R.md], r = D[R.code] || [0, 0, 0];
    r[ok ? 0 : 1]++; r[2] = ok ? 1 : 0; D[R.code] = r; save();
    sfx(ok ? 'correct' : 'wrong'); if (ok) R.ok++; else R.wrong.push(R.code);
    area().querySelectorAll('.wq-opt').forEach((b, i) => { b.disabled = true; if (R.q.opts[i] === R.q.right) b.classList.add('ok'); else if (i === oi) b.classList.add('ng'); });
    if (R.md === 'rev' || R.md === 'flag') { const m = $('wqMapLater'); if (m) m.innerHTML = SCILAD._wMap(X[2], R.code); }
    const info = '<b>' + esc(X[0]) + '</b>' + (X[1] ? ' — 首都 ' + esc(X[1]) : '') + (X[3] ? '<br>※ ' + esc(X[3]) + 'は 首都では ない' : '') + (X[4] ? '<br>' + esc(X[4]) : '');
    $('wqFb').innerHTML = '<div class="wq-fb ' + (ok ? 'ok' : 'ng') + '"><div class="wq-fbh">' + (ok ? '⭕ 正解!' : '❌ 正解は「' + esc(R.q.right) + '」') + '</div><div class="wq-fbi">' + info + '</div></div><button class="wq-next" id="wqNext">' + (R.i + 1 < R.list.length ? '次へ →' : '結果を 見る') + '</button>';
    $('wqNext').onclick = () => { sfx('click'); R.i++; R.done = false; question(); };
    $('wqNext').scrollIntoView({ block: 'nearest' });
  }

  /* ---------- 国旗ぬりえ ----------
   * FLAGS.svg の 図形を 元の 色ごとに グループに して、タップで パレットの 色を ぬる。
   * 正解 = 元の 色に いちばん 近い パレット色 (CIE Lab 距離)。境目の 色は 2番目に 近い 色も 正解に する。
   * パレットと 遠すぎる 色 (紋章の 金・茶など) は 最初から 本物の 色で 描いて ぬらない 部分に する。 */
  const Paint = (function () {
    const PAL = [['赤', '#d7192d'], ['えんじ', '#8d1b3d'], ['オレンジ', '#ff8a1e'], ['黄', '#fcd116'], ['緑', '#009b3a'], ['深緑', '#00573f'], ['水色', '#75aadb'], ['青', '#1f4fb4'], ['紺', '#0b2361'], ['茶', '#8c5a2b'], ['白', '#ffffff'], ['黒', '#141414']];
    const lab = hex => { const v = [1, 3, 5].map(i => { const c = parseInt(hex.substr(i, 2), 16) / 255; return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92; });
      const X = (v[0] * 0.4124 + v[1] * 0.3576 + v[2] * 0.1805) / 0.95047, Y = v[0] * 0.2126 + v[1] * 0.7152 + v[2] * 0.0722, Z = (v[0] * 0.0193 + v[1] * 0.1192 + v[2] * 0.9505) / 1.08883;
      const f = t => t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116; return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))]; };
    const PL = PAL.map(p => lab(p[1]));
    const NAMED = { white: '#ffffff', black: '#000000' };
    const norm = c => { if (!c || c === 'none') return null; c = c.trim().toLowerCase(); if (NAMED[c]) return NAMED[c]; if (/^#[0-9a-f]{6}$/.test(c)) return c; if (/^#[0-9a-f]{3}$/.test(c)) return '#' + c[1] + c[1] + c[2] + c[2] + c[3] + c[3]; return null; };
    function judge(hex) {   // → { ok: [正解の パレット番号], fixed: パレットに ない 色か }
      const L = lab(hex), d = PL.map(q => Math.hypot(L[0] - q[0], L[1] - q[1], L[2] - q[2])), m = Math.min.apply(null, d);
      return { ok: d.map((x, i) => [x, i]).filter(x => x[0] <= m * 1.22 + 5).map(x => x[1]), fixed: m > 30, best: d.indexOf(m) };
    }
    const cache = {};
    // 国旗の 図形を 読む (DOM を 使わず SVG 文字列から)
    function parse(name) {
      if (cache[name]) return cache[name];
      const src = FLAGS.svg(name), els = [], groups = {};
      src.replace(/<(rect|circle|polygon|path|line|ellipse)\b([^>]*)\/?>/g, (all, tag, attr) => {
        const fill = norm((attr.match(/fill="([^"]*)"/) || [])[1]), stroke = norm((attr.match(/stroke="([^"]*)"/) || [])[1]);
        if (!fill && stroke === '#c9cfd8') return all;   // 外わく
        const col = fill || stroke; if (!col) return all;
        if (!groups[col]) groups[col] = Object.assign({ col: col, n: 0 }, judge(col));
        groups[col].n++; els.push(col); return all;
      });
      const live = Object.keys(groups).filter(c => !groups[c].fixed);
      return (cache[name] = { src: src, groups: groups, live: live });
    }
    const ok = name => typeof FLAGS !== 'undefined' && FLAGS.has(name) && parse(name).live.length >= 2;
    return { PAL: PAL, parse: parse, ok: ok };
  })();

  function paintQ() {
    const R = run, code = R.list[R.i], X = K(code), F = Paint.parse(X[0]); R.code = code; R.paint = { sel: -1, got: {}, done: false };
    let h = '<div class="wq-top"><button class="wq-quit" id="wqQuit">← やめる</button><span>🎨 国旗ぬりえ</span><span class="wq-cnt">' + (R.i + 1) + ' / ' + R.list.length + ' ・ ⭕ ' + R.ok + '</span></div>';
    h += '<div class="wq-prog"><i style="width:' + Math.round(R.i * 100 / R.list.length) + '%"></i></div>';
    h += '<div class="wq-q"><div class="wq-qt">「' + esc(X[0]) + '」の 国旗を ぬろう</div><div class="wq-reg">' + esc(M().R[X[2]].n) + ' ・ ぬる ところ ' + F.live.length + 'か所</div>';
    h += '<div class="wq-paint" id="wqPaint">' + F.src + '</div>';
    h += '<div class="wq-pal" id="wqPal">' + Paint.PAL.map((p, i) => '<button class="wq-sw" data-c="' + i + '" style="--c:' + p[1] + '"><i></i><span>' + p[0] + '</span></button>').join('') + '</div>';
    h += '<p class="wq-phint" id="wqPHint">① 下から 色を えらぶ → ② 国旗の ぬりたい ところを タップ</p>';
    h += '<div class="wq-pbtns"><button class="wq-sec" id="wqPClear">ぜんぶ けす</button><button class="wq-next" id="wqPCheck">こたえあわせ</button></div><div id="wqFb"></div></div>';
    area().innerHTML = h; $('pageWQ').scrollTop = 0;
    const svg = $('wqPaint').querySelector('svg'); svg.classList.add('no-furi');
    // 図形に グループを つけて 白紙に する
    svg.querySelectorAll('rect,circle,polygon,path,line,ellipse').forEach(el => {
      const fa = el.getAttribute('fill'), sa = el.getAttribute('stroke');
      const fill = fa && fa !== 'none' ? fa : null, col = (fill || sa || '').toLowerCase();
      const c = col === 'white' ? '#ffffff' : col === 'black' ? '#000000' : col;
      if (!fill && c === '#c9cfd8') { el.style.pointerEvents = 'none'; return; }
      const g = F.groups[c]; if (!g) return;
      el.dataset.g = c; el.dataset.kind = fill ? 'f' : 's';
      if (g.fixed) { el.style.pointerEvents = 'none'; return; }
      el.classList.add('wq-pe'); blank(el);
    });
    function blank(el) { if (el.dataset.kind === 'f') { el.setAttribute('fill', '#f1ede4'); el.setAttribute('stroke', '#7c7a74'); el.setAttribute('stroke-width', '0.7'); } else el.setAttribute('stroke', '#d8d3c7'); }
    function paintG(c, pi) {
      svg.querySelectorAll('[data-g="' + c + '"]').forEach(el => { const hex = Paint.PAL[pi][1]; if (el.dataset.kind === 'f') { el.setAttribute('fill', hex); el.setAttribute('stroke', 'rgba(60,60,60,.35)'); el.setAttribute('stroke-width', '0.6'); } else el.setAttribute('stroke', hex); });
    }
    const pal = $('wqPal');
    pal.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { if (R.paint.done) return; sfx('click'); R.paint.sel = +b.dataset.c; pal.querySelectorAll('.wq-sw').forEach(x => x.classList.toggle('on', x === b)); $('wqPHint').textContent = '「' + Paint.PAL[R.paint.sel][0] + '」で ぬる ところを タップ'; });
    svg.addEventListener('click', e => {
      const el = e.target.closest('.wq-pe'); if (!el || R.paint.done) return;
      if (R.paint.sel < 0) { $('wqPHint').textContent = '先に 下の パレットから 色を えらんでね'; $('wqPHint').classList.add('warn'); return; }
      $('wqPHint').classList.remove('warn'); sfx('click'); R.paint.got[el.dataset.g] = R.paint.sel; paintG(el.dataset.g, R.paint.sel);
    });
    $('wqPClear').onclick = () => { if (R.paint.done) return; sfx('click'); R.paint.got = {}; svg.querySelectorAll('.wq-pe').forEach(blank); };
    $('wqPCheck').onclick = () => paintCheck(svg);
    $('wqQuit').onclick = () => { sfx('click'); result(true); };
  }

  function paintCheck(svg) {
    const R = run, P = R.paint; if (P.done) return;
    const X = K(R.code), F = Paint.parse(X[0]);
    const left = F.live.filter(c => P.got[c] == null).length;
    if (left && !P.warned) { P.warned = true; $('wqPHint').textContent = 'まだ ぬって いない ところが ' + left + 'か所 あるよ。このまま なら もう一度 「こたえあわせ」'; $('wqPHint').classList.add('warn'); return; }
    P.done = true;
    const bad = F.live.filter(c => P.got[c] == null || F.groups[c].ok.indexOf(P.got[c]) < 0), ok = !bad.length;
    // まちがいの ところを いちばん 上に 赤い 点線で 重ねる (となりの 図形に かくれない ように)
    bad.forEach(c => svg.querySelectorAll('[data-g="' + c + '"]').forEach(el => { const o = el.cloneNode(false); o.removeAttribute('class'); o.classList.add('wq-bad'); o.setAttribute('fill', 'none'); if (el.dataset.kind === 's') o.setAttribute('stroke-opacity', '0.5'); svg.appendChild(o); }));
    const D = data().paint, r = D[R.code] || [0, 0, 0]; r[ok ? 0 : 1]++; r[2] = ok ? 1 : 0; D[R.code] = r; save();
    sfx(ok ? 'correct' : 'wrong'); if (ok) R.ok++; else R.wrong.push(R.code);
    const used = Array.from(new Set(F.live.map(c => F.groups[c].best))).map(i => '<span class="wq-chip" style="--c:' + Paint.PAL[i][1] + '"><i></i>' + Paint.PAL[i][0] + '</span>').join('');
    const info = '<b>' + esc(X[0]) + '</b>' + (X[1] ? ' — 首都 ' + esc(X[1]) : '') + '<div class="wq-pused">使う 色: ' + used + '</div>';
    $('wqPHint').textContent = ''; $('wqPHint').classList.remove('warn');
    $('wqFb').innerHTML = '<div class="wq-fb ' + (ok ? 'ok' : 'ng') + '"><div class="wq-fbh">' + (ok ? '⭕ かんぺき!' : '❌ ' + bad.length + 'か所 ちがうよ (赤い 点線の ところ)') + '</div><div class="wq-pcmp"><div><small>ほんもの</small>' + FLAGS.svg(X[0]) + '</div></div><div class="wq-fbi">' + info + '</div></div><button class="wq-next" id="wqNext">' + (R.i + 1 < R.list.length ? '次へ →' : '結果を 見る') + '</button>';
    $('wqPCheck').disabled = true; $('wqPClear').disabled = true;
    $('wqNext').onclick = () => { sfx('click'); R.i++; question(); };
    $('wqNext').scrollIntoView({ block: 'nearest' });
  }

  function result(quit) {
    const R = run, n = quit ? R.i : R.list.length, pct = n ? Math.round(R.ok * 100 / n) : 0;
    let h = '<div class="wq-res"><div class="wq-rbig">' + (pct >= 90 ? '🏆' : pct >= 70 ? '🎉' : '💪') + '</div><h2>' + (quit ? 'ここまでの 結果' : '全問 終了!') + '</h2><p><b>' + n + '</b>問中 <b>' + R.ok + '</b>問 正解 (' + pct + '%)</p>';
    if (R.wrong.length) h += '<div class="wq-wl"><b>まちがえた 国・地域</b><ul>' + R.wrong.map(k => '<li>' + esc(K(k)[0]) + (K(k)[1] ? ' — ' + esc(K(k)[1]) : '') + '</li>').join('') + '</ul></div><button class="wq-next" id="wqRetry">まちがえた ' + R.wrong.length + 'か国を もう一度</button>';
    h += '<button class="wq-sec" id="wqMenu">メニューに もどる</button></div>';
    area().innerHTML = h; $('pageWQ').scrollTop = 0;
    const rt = $('wqRetry'); if (rt) rt.onclick = () => { sfx('click'); mode = R.md; start(R.cont, R.wrong.slice()); };
    $('wqMenu').onclick = () => { sfx('click'); menu(); };
  }

  function open() { try { SCILAD._wzLoad(); } catch (e) {} showPage('pageWQ'); menu(); }
  function stats() { const D = data(); const c = m => Object.keys(D[m]).filter(k => D[m][k][2] === 1 && M() && M().K[k]).length; return { map: c('map'), cap: c('cap'), rev: c('rev'), flag: c('flag'), paint: c('paint'), paintTotal: M() ? items('all', 'paint').length : 0, flagTotal: typeof FLAGS !== 'undefined' ? items('all', 'flag').length : 81, total: M() ? Object.keys(M().K).length : 237, capTotal: M() ? Object.keys(M().K).filter(k => K(k)[1]).length : 220 }; }
  return { open: open, stats: stats, _makeQ: makeQ, _paint: Paint };
})();
