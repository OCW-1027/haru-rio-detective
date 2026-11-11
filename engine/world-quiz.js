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
  const MODES = { map: ['🗺', '地図 → 国名', '赤く ぬった 国・地域の 名前を 答える'], cap: ['🏛', '国名 → 首都', '国・地域の 首都 (政庁所在地) を 答える'], rev: ['🔁', '首都 → 国名', '首都から 国・地域を 答える'], flag: ['🚩', '国旗 → 国名', '国旗を 見て 国を 答える (' + (typeof FLAGS !== 'undefined' ? FLAGS.names().length : 0) + 'か国)'] };
  let mode = 'map', run = null;
  const $ = id => document.getElementById(id), esc = s => escapeHtml(String(s));
  const M = () => WORLDMAP, K = c => M().K[c];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.wq || (State.v2.wq = {}); ['map', 'cap', 'rev', 'flag'].forEach(m => d[m] = d[m] || {}); return d; }
  function save() { try { saveState(); } catch (e) {} }
  function items(cont, md) {   // 対象の コード一覧
    const C = CONT.find(c => c[0] === cont), rs = C[3] || Object.keys(M().R);
    return Object.keys(M().K).filter(k => rs.indexOf(K(k)[2]) >= 0 && (md === 'flag' ? (typeof FLAGS !== 'undefined' && FLAGS.has(K(k)[0])) : (md === 'map' || K(k)[1])));
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
  function stats() { const D = data(); const c = m => Object.keys(D[m]).filter(k => D[m][k][2] === 1 && M() && M().K[k]).length; return { map: c('map'), cap: c('cap'), rev: c('rev'), flag: c('flag'), flagTotal: typeof FLAGS !== 'undefined' ? items('all', 'flag').length : 81, total: M() ? Object.keys(M().K).length : 237, capTotal: M() ? Object.keys(M().K).filter(k => K(k)[1]).length : 220 }; }
  return { open: open, stats: stats, _makeQ: makeQ };
})();
