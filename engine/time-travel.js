/* engine/time-travel.js — シーズン2 新コンテンツ⑥ タイムトラベル探偵 (日本史)
 * ブランク団の 時間あやつり「クロノ」が 歴史を ゆがめながら 時代を 飛びまわる。
 *   事件: 各時代で ① 時代に 合わない もの (時のゆがみ) を 見つけ、② 手がかりの できごとから 次の 時代を 当てる
 *   年表 ならべかえ / 時代あて クイズ / 時代 図鑑
 * 画面: pageTimeTravel (#ttArea). 保存: State.v2.tt = { cleared: {caseId: stars}, best: {order, era} }
 * Dependencies: TT_ERAS, TT_EVENTS, TT_THINGS, TT_PEOPLE, State, saveState, showPage, sfx, escapeHtml, Hub
 */
const TimeTravel = (function () {
  const SP = 'assets/img/chars/spirits/';
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const E = TT_ERAS;
  const pic = (f, cls) => '<img class="s2-banner' + (cls ? ' ' + cls : '') + '" src="assets/img/s2/' + f + '" alt="" loading="lazy" onerror="this.remove()">';
  const eraPic = (i, cls) => pic('era/era_' + String(i).padStart(2, '0') + '.webp', cls);
  const yr = y => y < 0 ? '紀元前' + (-y) + '年' : y + '年';
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.tt || (State.v2.tt = {}); d.cleared = d.cleared || {}; d.best = d.best || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function area() { return $('ttArea'); }
  function sound(t) { try { sfx(t); } catch (e) {} }
  function top() { const p = $('pageTimeTravel'); if (p) p.scrollTop = 0; }
  function header(title, sub, back) {
    return '<div class="tt-head">' + (back ? '<button class="tt-back" data-back data-go="' + back + '">← ' + ({ home: 'トップ', cases: '事件', quiz: 'もどる' }[back] || 'もどる') + '</button>' : '') + '<div><div class="tt-title">' + title + '</div>' + (sub ? '<div class="tt-sub">' + sub + '</div>' : '') + '</div></div>';
  }
  function bindGo(root) { root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { sound('click'); go(b.dataset.go); }); }
  function go(v) { run = null; top(); ({ home: home, cases: cases, order: orderStart, era: eraStart, zukan: zukan }[v] || home)(); }
  // 時代の 帯 (タイムライン)。sel: {i: cls}, click: true
  function line(opt) {
    opt = opt || {};
    let h = '<div class="tt-line">';
    E.forEach((e, i) => { h += '<button class="tt-era ' + ((opt.sel && opt.sel[i]) || '') + '" data-era="' + i + '"' + (opt.click ? '' : ' tabindex="-1"') + '><b>' + e[0] + '</b><small>' + (e[1] < 0 ? '' : e[1]) + '</small></button>'; });
    return h + '</div>';
  }

  // ---------- ホーム ----------
  function home() {
    const d = data();
    let h = header('⏳ タイムトラベル探偵', 'シーズン2 ・ 日本史を かけぬけろ');
    h += '<div class="tt-hero"><img src="' + SP + 'korarin_greet_01.webp" alt=""><div class="tt-say"><b>コラリン:</b> ブランク団の <b>クロノ</b>が 時間を 飛びまわって、歴史に「時のゆがみ」を まぎれこませています! その時代に あるはずの ない ものを 見つけ、手がかりの できごとから 次の 時代を 当てて 追いかけましょう。</div></div>';
    h += '<div class="tt-menu">';
    h += '<button class="tt-mbtn" data-go="cases"><span class="i">🕰</span><b>事件ファイル</b><small>解決 ' + Object.keys(d.cleared).length + ' / ' + CASES.length + '</small></button>';
    h += '<button class="tt-mbtn" data-go="order"><span class="i">📜</span><b>年表 ならべかえ</b><small>古い 順に タップ ・ ベスト ' + (d.best.order || 0) + ' / 5</small></button>';
    h += '<button class="tt-mbtn" data-go="era"><span class="i">🏯</span><b>時代あて クイズ</b><small>できごと・人物・ものの 時代 ・ ベスト ' + (d.best.era || 0) + ' / 10</small></button>';
    h += '<button class="tt-mbtn" data-go="zukan"><span class="i">📖</span><b>時代 図鑑</b><small>' + E.length + 'の 時代の できごと・人物・もの</small></button>';
    h += '</div>' + line();
    area().innerHTML = h; bindGo(area());
  }

  // ---------- 図鑑 ----------
  function zukan(sel) {
    sel = sel || 0;
    const e = E[sel];
    let h = header('📖 時代 図鑑', '時代を タップ', 'home') + line({ click: true, sel: { [sel]: 'on' } });
    h += eraPic(sel) + '<div class="tt-card"><div class="tt-card-h">' + e[0] + '時代 <small>' + (e[1] < 0 ? '約' + (-e[1]) + '年前〜' : e[1] + '年〜') + (E[sel + 1] ? (E[sel + 1][1] < 0 ? '' : E[sel + 1][1] + '年') : '') + '</small></div><p class="tt-card-p">' + e[2] + '</p>';
    const ev = TT_EVENTS.filter(x => x[1] === sel), th = TT_THINGS.filter(x => x[0] === sel), pp = TT_PEOPLE.filter(x => x[0] === sel);
    if (ev.length) { h += '<div class="tt-sec">📜 できごと</div>'; ev.forEach(x => { h += '<div class="tt-ev"><span>' + yr(x[0]) + '</span>' + esc(x[2]) + '</div>'; }); }
    if (pp.length) { h += '<div class="tt-sec">👤 人物</div><div class="tt-chips">'; pp.forEach(x => { h += '<span class="tt-chip"><b>' + esc(x[1]) + '</b> ' + esc(x[2]) + '</span>'; }); h += '</div>'; }
    if (th.length) { h += '<div class="tt-sec">🏺 この 時代の もの・ようす</div><div class="tt-chips">'; th.forEach(x => { h += '<span class="tt-chip">' + esc(x[1]) + '</span>'; }); h += '</div>'; }
    h += '</div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-era]').forEach(b => b.onclick = () => { sound('click'); zukan(+b.dataset.era); });
    const cur = area().querySelector('.tt-era.on'); if (cur) cur.scrollIntoView({ inline: 'center', block: 'nearest' });
  }

  // ---------- 事件 ----------
  const CASES = [
    { id: 't1', title: 'ゆがんだ 大仏', start: 4, hops: 3 },
    { id: 't2', title: '武士の 世の 落とし物', start: 6, hops: 3 },
    { id: 't3', title: '縄文から 来た 予告状', start: 0, hops: 4 },
    { id: 't4', title: '天下統一 大混乱', start: 8, hops: 4 },
    { id: 't5', title: '文明開化の わな', start: 10, hops: 4 },
    { id: 't6', title: 'クロノとの 最終決戦', start: 2, hops: 5 },
  ];
  let run = null;
  function cases() {
    const d = data();
    let h = header('🕰 事件ファイル', 'ルートは 毎回 変わる', 'home') + pic('era/chrono.webp', 'thief') + '<div class="tt-cases">';
    CASES.forEach((c, i) => { const st = d.cleared[c.id]; h += '<button class="tt-case' + (st ? ' done' : '') + '" data-c="' + i + '"><span class="tt-cn">第' + (i + 1) + '事件</span><b>' + esc(c.title) + '</b><small>スタート: ' + E[c.start][0] + '時代 ・ ' + (c.hops + 1) + 'つの 時代</small><span class="tt-st">' + (st ? '⭐'.repeat(st) + '☆'.repeat(3 - st) : '') + '</span></button>'; });
    area().innerHTML = h + '</div>'; bindGo(area());
    area().querySelectorAll('[data-c]').forEach(b => b.onclick = () => { sound('click'); startCase(+b.dataset.c); });
  }
  function startCase(ci) {
    const c = CASES[ci], r = [c.start];
    while (r.length < c.hops + 1) { const cand = E.map((e, i) => i).filter(i => i <= 11 && !r.includes(i) && Math.abs(i - r[r.length - 1]) >= 2); r.push(pick(cand)); }
    run = { ci: ci, c: c, route: r, i: 0, phase: 'gap', miss: 0, hearts: 3 };
    stage();
  }
  // 時のゆがみ: その時代の もの 4つ + 3つ 以上 後の 時代の もの 1つ
  function gapScene(era) {
    const own = shuffle(TT_THINGS.filter(x => x[0] === era)).slice(0, 4);
    const odd = pick(TT_THINGS.filter(x => x[0] >= era + 3));
    return { items: shuffle(own.concat([odd])), odd: odd };
  }
  function stage() {
    const r = run; if (!r) return; top();
    const era = r.route[r.i], last = r.i === r.route.length - 1;
    let h = header('第' + (r.ci + 1) + '事件 ' + esc(r.c.title), '時代 ' + (r.i + 1) + ' / ' + r.route.length + ' ・ ' + '❤'.repeat(r.hearts) + '<span class="off">' + '❤'.repeat(3 - r.hearts) + '</span>', 'cases');
    h += line({ sel: r.route.slice(0, r.i + 1).reduce((o, k, n) => (o[k] = n === r.i ? 'here' : 'past', o), {}) });
    h += eraPic(era, 'thin') + '<div class="tt-now">⏳ いま: <b>' + E[era][0] + '時代</b> <small>(' + E[era][2] + ')</small></div>';
    if (r.phase === 'gap') {
      if (!r.scene) r.scene = gapScene(era);
      h += '<div class="tt-q">🔎 この 時代の 町に「時のゆがみ」が 1つ まぎれている! <b>' + E[era][0] + '時代に あるはずの ない もの</b>は どれ?</div><div class="tt-items">';
      r.scene.items.forEach((x, k) => { h += '<button class="tt-item" data-k="' + k + '">' + esc(x[1]) + '</button>'; });
      h += '</div>';
    } else {
      if (!r.clue) { const nx = r.route[r.i + 1]; r.clue = pick(TT_EVENTS.filter(x => x[1] === nx)); }
      h += '<div class="tt-q">💨 クロノが 時空の 穴に 飛びこんだ! 残された メモには こう 書いてある…</div><div class="tt-memo">「次は <b>' + esc(r.clue[2]) + '</b> の 時代だ」</div><div class="tt-q">どの 時代へ 追う? 下の 年表から えらぼう。</div>' + line({ click: true, sel: Object.assign({}, r.wrongEra || {}) });
    }
    h += '<div id="ttFb"></div>';
    area().innerHTML = h; bindGo(area());
    const here = area().querySelector('.tt-era.here'); if (here) here.scrollIntoView({ inline: 'center', block: 'nearest' });
    if (r.phase === 'gap') area().querySelectorAll('.tt-item').forEach(b => b.onclick = () => {
      if (r.lock) return; r.lock = true;
      const x = r.scene.items[+b.dataset.k], ok = x === r.scene.odd;
      area().querySelectorAll('.tt-item').forEach((el, k) => { el.disabled = true; if (r.scene.items[k] === r.scene.odd) el.classList.add('ok'); });
      if (!ok) { b.classList.add('ng'); r.miss++; r.hearts--; }
      sound(ok ? 'correct' : 'wrong');
      const o = r.scene.odd;
      $('ttFb').innerHTML = '<div class="' + (ok ? 'tt-ok' : 'tt-ng') + '">' + (ok ? '✔ 見つけた!' : '✗ ざんねん…') + ' 「' + esc(o[1]) + '」は <b>' + E[o[0]][0] + '時代</b>の もの。' + E[era][0] + '時代には まだ なかった。' + (ok ? '' : '<br>「' + esc(x[1]) + '」は ' + E[x[0]][0] + '時代の もの だよ。') + '</div>' +
        (r.hearts <= 0 ? '<button class="tt-go" id="ttOn">💨 にげられた… 結果へ</button>' : '<button class="tt-go" id="ttOn">' + (last ? '🚨 クロノを 追いつめる!' : '⏭ クロノを 追う') + '</button>');
      $('ttOn').onclick = () => { sound('click'); r.lock = false; if (r.hearts <= 0) return result(false); if (last) return result(true); r.phase = 'jump'; r.scene = null; stage(); };
      $('ttOn').scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
    else area().querySelectorAll('.tt-line [data-era]').forEach(b => b.onclick = () => {
      if (r.lock) return;
      const k = +b.dataset.era, nx = r.route[r.i + 1];
      if (k === era || (r.wrongEra && r.wrongEra[k])) return;
      if (k === nx) {
        r.lock = true; sound('correct');
        $('ttFb').innerHTML = '<div class="tt-ok">✔ 正解! 「' + esc(r.clue[2]) + '」は ' + yr(r.clue[0]) + '、' + E[nx][0] + '時代の できごと。</div><button class="tt-go" id="ttOn">🌀 ' + E[nx][0] + '時代へ タイムトラベル!</button>';
        $('ttOn').onclick = () => { sound('click'); r.lock = false; r.i++; r.phase = 'gap'; r.clue = null; r.wrongEra = null; stage(); };
        $('ttOn').scrollIntoView({ block: 'center', behavior: 'smooth' });
      } else {
        sound('wrong'); r.miss++; r.hearts--; r.wrongEra = Object.assign(r.wrongEra || {}, { [k]: 'ng' });
        if (r.hearts <= 0) return result(false);
        stage();
        $('ttFb').innerHTML = '<div class="tt-ng">✗ ' + E[k][0] + '時代では ない みたい… (' + (k < nx ? 'もっと 後の 時代' : 'もっと 前の 時代') + ')</div>';
      }
    });
  }
  function result(win) {
    const r = run, d = data(); top();
    const st = r.miss === 0 ? 3 : r.miss <= 1 ? 2 : 1;
    if (win) { d.cleared[r.c.id] = Math.max(d.cleared[r.c.id] || 0, st); save(); try { if (typeof triggerConfetti === 'function') triggerConfetti(); } catch (e) {} }
    sound(win ? 'chime' : 'wrong');
    let h = header(win ? '🚨 事件 解決!' : '💨 にげられた…', esc(r.c.title), 'cases');
    h += '<div class="tt-hero"><img src="' + SP + (win ? 'koradon_greet_01' : 'korarin_greet_01') + '.webp" alt=""><div class="tt-say">' + (win ? '<b>コラドン:</b> クロノを つかまえた! 歴史の ゆがみは ぜんぶ 元に もどったぞ!' : '<b>コラリン:</b> クロノは 時の かなたへ にげました… 時代 図鑑で 復習して、もう一度!') + '</div></div>';
    if (win) h += '<div class="tt-res">' + '⭐'.repeat(st) + '<span class="off">' + '☆'.repeat(3 - st) + '</span><div>まちがい ' + r.miss + '回</div></div>';
    h += '<div class="tt-recap"><div class="tt-sec">🕰 追跡した 時代</div>';
    r.route.slice(0, r.i + 1).forEach(k => { h += '<div class="tt-ev"><span>' + E[k][0] + '</span>' + esc(E[k][2]) + '</div>'; });
    h += '</div><div class="tt-row"><button class="tt-go" id="ttAgain">🔁 もう一度 (ルートが 変わる)</button><button class="tt-btn2" data-go="zukan">📖 時代 図鑑</button></div>';
    area().innerHTML = h; bindGo(area());
    const ci = r.ci; $('ttAgain').onclick = () => { sound('click'); startCase(ci); };
  }

  // ---------- 年表 ならべかえ (5ラウンド) ----------
  let od = null;
  function orderStart() { od = { round: 0, ok: 0 }; orderRound(); }
  function orderRound() {
    top();
    if (od.round >= 5) {
      const d = data(), nb = od.ok > (d.best.order || 0); d.best.order = Math.max(d.best.order || 0, od.ok); save();
      let h = header('📜 年表 ならべかえ 結果', '', 'home') + '<div class="tt-res"><b>' + od.ok + '</b> / 5 ラウンド 全問正解' + (nb ? ' 🏆' : '') + '</div><div class="tt-row"><button class="tt-go" id="ttOA">🔁 もう一度</button></div>';
      area().innerHTML = h; bindGo(area()); $('ttOA').onclick = () => { sound('click'); orderStart(); }; return;
    }
    // 5つの できごと (年が 重ならない ように)
    const pool = shuffle(TT_EVENTS), set = [];
    pool.forEach(x => { if (set.length < 5 && !set.some(y => Math.abs(y[0] - x[0]) < (od.round < 2 ? 40 : 8))) set.push(x); });
    od.set = set; od.picked = [];
    draw();
    function draw() {
      let h = header('📜 年表 ならべかえ', 'ラウンド ' + (od.round + 1) + ' / 5 ・ 古い 順に タップ', 'home') + '<div class="tt-ord">';
      od.picked.forEach((x, n) => { h += '<div class="tt-slot"><span>' + (n + 1) + '</span>' + esc(x[2]) + '</div>'; });
      for (let n = od.picked.length; n < 5; n++) h += '<div class="tt-slot empty"><span>' + (n + 1) + '</span></div>';
      h += '</div><div class="tt-items">';
      od.set.forEach((x, k) => { if (!od.picked.includes(x)) h += '<button class="tt-item" data-k="' + k + '">' + esc(x[2]) + '</button>'; });
      h += '</div><div class="tt-row">' + (od.picked.length ? '<button class="tt-btn2" id="ttUndo">↩ 1つ もどす</button>' : '') + '</div><div id="ttFb"></div>';
      area().innerHTML = h; bindGo(area());
      area().querySelectorAll('[data-k]').forEach(b => b.onclick = () => { sound('click'); od.picked.push(od.set[+b.dataset.k]); if (od.picked.length === 5) check(); else draw(); });
      const u = $('ttUndo'); if (u) u.onclick = () => { od.picked.pop(); draw(); };
    }
    function check() {
      const right = od.set.slice().sort((a, b) => a[0] - b[0]);
      const ok = od.picked.every((x, n) => x === right[n]);
      if (ok) od.ok++;
      sound(ok ? 'correct' : 'wrong');
      let h = header('📜 年表 ならべかえ', 'ラウンド ' + (od.round + 1) + ' / 5', 'home');
      h += '<div class="' + (ok ? 'tt-ok' : 'tt-ng') + '">' + (ok ? '✔ 完ぺき!' : '✗ 正しい 順番は こう!') + '</div><div class="tt-ord">';
      right.forEach((x, n) => { const mine = od.picked[n] === x; h += '<div class="tt-slot ' + (mine ? 'good' : 'bad') + '"><span>' + yr(x[0]) + '</span>' + esc(x[2]) + ' <small>(' + E[x[1]][0] + ')</small></div>'; });
      h += '</div><button class="tt-go" id="ttON">次の ラウンド →</button>';
      area().innerHTML = h; bindGo(area());
      $('ttON').onclick = () => { sound('click'); od.round++; orderRound(); };
    }
  }

  // ---------- 時代あて (10問) ----------
  let eq = null;
  function eraStart() {
    const Q = [];
    shuffle(TT_EVENTS).slice(0, 4).forEach(x => Q.push({ text: '「' + x[2] + '」が あった 時代は?', era: x[1], note: yr(x[0]) + '・' + x[2] }));
    shuffle(TT_PEOPLE).slice(0, 3).forEach(x => Q.push({ text: '「' + x[1] + '」(' + x[2] + ') が 活躍した 時代は?', era: x[0], note: x[1] + ' = ' + x[2] }));
    shuffle(TT_THINGS).slice(0, 3).forEach(x => Q.push({ text: '「' + x[1] + '」が 見られるように なった 時代は?', era: x[0], note: x[1] }));
    eq = { list: shuffle(Q), i: 0, ok: 0, miss: [] }; eraQ();
  }
  function eraQ() {
    top();
    if (eq.i >= eq.list.length) {
      const d = data(), nb = eq.ok > (d.best.era || 0); d.best.era = Math.max(d.best.era || 0, eq.ok); save();
      let h = header('🏯 時代あて 結果', '', 'home') + '<div class="tt-res"><b>' + eq.ok + '</b> / 10' + (nb ? ' 🏆 ベスト更新!' : '') + '</div>';
      if (eq.miss.length) { h += '<div class="tt-recap"><div class="tt-sec">❗ まちがえた 問題</div>'; eq.miss.forEach(m => { h += '<div class="tt-ev"><span>' + E[m.era][0] + '</span>' + esc(m.note) + '</div>'; }); h += '</div>'; }
      h += '<div class="tt-row"><button class="tt-go" id="ttEA">🔁 もう一度</button></div>';
      area().innerHTML = h; bindGo(area()); $('ttEA').onclick = () => { sound('click'); eraStart(); }; return;
    }
    const q = eq.list[eq.i];
    const near = E.map((e, i) => i).filter(i => i !== q.era).sort((a, b) => Math.abs(a - q.era) - Math.abs(b - q.era)).slice(0, 4);
    const opts = shuffle([q.era].concat(shuffle(near).slice(0, 3)));
    let h = header('🏯 時代あて クイズ', (eq.i + 1) + ' / 10 ・ 正解 ' + eq.ok, 'home') + '<div class="tt-q big">' + esc(q.text) + '</div><div class="tt-opts">';
    opts.forEach(k => { h += '<button class="tt-opt" data-e="' + k + '">' + E[k][0] + '時代</button>'; });
    h += '</div><div id="ttFb"></div>';
    area().innerHTML = h; bindGo(area());
    let done = false;
    area().querySelectorAll('[data-e]').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = +b.dataset.e === q.era; if (ok) eq.ok++; else eq.miss.push(q);
      area().querySelectorAll('[data-e]').forEach(x => { if (+x.dataset.e === q.era) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sound(ok ? 'correct' : 'wrong');
      $('ttFb').innerHTML = '<div class="' + (ok ? 'tt-ok' : 'tt-ng') + '">' + (ok ? '✔ 正解!' : '✗ 正解は ' + E[q.era][0] + '時代') + ' ・ ' + esc(q.note) + '</div><button class="tt-go" id="ttEN">次へ →</button>';
      $('ttEN').onclick = () => { sound('click'); eq.i++; eraQ(); };
    });
  }

  function leave() { try { Hub.open(); } catch (e) { showPage('pageSelect'); } }
  function open() { showPage('pageTimeTravel'); top(); home(); const b = $('btnTimeBack'); if (b) b.onclick = () => { sound('click'); run = null; leave(); }; }
  return { open: open, _cases: CASES, stats: () => ({ cleared: Object.keys(data().cleared).length }) };
})();
