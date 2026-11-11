/* engine/indian-math.js — インド式 計算道場
 * 20の ワザ × (解説 → 例題 → 練習 10問 (2段階) → 60秒 チャレンジ) + コース検定 + 今日の 復習 + インド数学 ものがたり
 * まちがえた 問題は その場で「その問題の 解き方」を ステップで 表示する。
 * 星: ★1 練習で 8/10 以上 · ★2 ステップ2で 9/10 以上 かつ 平均 目標秒 以内 · ★3 60秒で 目標数 以上
 * 画面: pageIndian (#imArea). 保存: State.v2.indian = { t: {id: {stars, sprint, n, ok, ng, avg}}, exam: {course: best}, badge: {course: 1} }
 * Dependencies: IM (data/indian-math.js), State, saveState, showPage, sfx, escapeHtml
 */
const IndianMath = (function () {
  const KORADON = 'assets/img/chars/spirits/koradon_greet_01.webp';
  const KORARIN = 'assets/img/chars/spirits/korarin_greet_01.webp';
  const IMG = 'assets/img/indian/';
  let run = null, timers = [];
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  function area() { return $('imArea'); }
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.indian || (State.v2.indian = {}); d.t = d.t || {}; d.exam = d.exam || {}; d.badge = d.badge || {}; return d; }
  function tr(id) { const d = data(); return d.t[id] || (d.t[id] = { stars: 0, sprint: 0, n: 0, ok: 0, ng: 0, avg: 0 }); }
  function save() { try { saveState(); } catch (e) {} }
  function clearTimers() { timers.forEach(t => { clearTimeout(t); clearInterval(t); }); timers = []; }
  function stop() { clearTimers(); run = null; document.onkeydown = null; }
  function art(src, fb, cls) { return '<span class="art-w ' + (cls || '') + '"><img class="art-main" src="' + src + '" alt="" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"><span class="art-fb">' + (fb || '') + '</span></span>'; }
  const aarya = (cls, pose) => art(IMG + 'aarya_' + (pose || 'idle') + '.webp', '<span class="im-aarya-fb">👧🏽</span>', 'im-aarya ' + (cls || ''));
  const stars = n => '★'.repeat(n) + '☆'.repeat(3 - n);
  const course = id => IM.COURSES.find(c => c.id === id);
  function head(title, back) {
    return '<div class="im-head"><button class="im-back" id="imBack">← ' + (back ? '戻る' : '道場') + '</button><div class="im-title">' + title + '</div></div>';
  }
  function bindBack(fn) { const b = $('imBack'); if (b) b.onclick = () => { sfx('click'); stop(); (fn || home)(); }; }

  // ================= 道場 ホーム =================
  function home() {
    stop();
    const D = data(), total = IM.T.reduce((a, t) => a + tr(t.id).stars, 0);
    let h = '<div class="im-hero">' + aarya('big') + '<div><div class="im-kicker">インド式</div><h1 class="im-h1">計算道場</h1><p>アーリヤ:「ナマステ! わたしは インドの ベンガルールから 来た アーリヤ。インドの 子どもたちが 使う 計算の ワザを ' + IM.T.length + 'こ 教えるよ。ワザには 全部 ちゃんと 理由が あるんだ!」</p></div></div>';
    h += '<div class="im-stats"><div><b>' + total + '</b><small>/ ' + IM.T.length * 3 + ' ★</small></div><div><b>' + IM.T.filter(t => tr(t.id).stars >= 1).length + '</b><small>おぼえた ワザ</small></div><div><b>' + IM.COURSES.filter(c => D.badge[c.id]).length + '</b><small>/ ' + IM.COURSES.length + ' 検定 合格</small></div></div>';
    h += '<div class="im-row"><button class="im-primary" id="imReview">📅 今日の 復習 (10問)</button><button class="im-secondary" id="imStory">📜 インド数学 ものがたり</button></div>';
    IM.COURSES.forEach(c => {
      const list = IM.T.filter(t => t.course === c.id), best = D.exam[c.id];
      h += '<div class="im-course" style="--cc:' + c.color + '"><div class="im-ch"><div><b>' + c.name + ' コース</b><small>' + esc(c.sub) + '</small></div><button class="im-exam" data-exam="' + c.id + '">' + (D.badge[c.id] ? '🏅 合格' : '📝 検定') + (best != null ? ' <small>' + best + '/' + c.exam.n + '</small>' : '') + '</button></div><div class="im-grid">';
      list.forEach(t => { const r = tr(t.id); h += '<button class="im-card" data-t="' + t.id + '"><span class="im-ci">' + t.icon + '</span><span class="im-cn">' + esc(t.name) + '</span><span class="im-cs">' + stars(r.stars) + '</span></button>'; });
      h += '</div></div>';
    });
    h += '<p class="im-note">💡 どの ワザも「解説 → 例題 → 練習 → 60秒」の 順で 進めよう。まちがえたら、その 問題の 解き方が ステップで 出るよ。</p>';
    area().innerHTML = h;
    area().querySelectorAll('[data-t]').forEach(b => b.onclick = () => { sfx('click'); techView(IM.byId(b.dataset.t), 'why'); });
    area().querySelectorAll('[data-exam]').forEach(b => b.onclick = () => { sfx('click'); examIntro(b.dataset.exam); });
    $('imReview').onclick = () => { sfx('click'); review(); };
    $('imStory').onclick = () => { sfx('click'); stories(); };
  }

  // ================= ワザの ページ =================
  function areaSVG(a) {
    const [top, left, cells] = a, W = 260, H = 200, x0 = 40, y0 = 30, w1 = 140, w2 = 70, h1 = 105, h2 = 55;
    const cs = ['#d6e8fb', '#fde4cc', '#fde4cc', '#d9f2dc'];
    let s = '<svg viewBox="0 0 ' + W + ' ' + H + '" class="im-area">';
    [[x0, y0, w1, h1], [x0 + w1, y0, w2, h1], [x0, y0 + h1, w1, h2], [x0 + w1, y0 + h1, w2, h2]].forEach((r, i) => { s += '<rect x="' + r[0] + '" y="' + r[1] + '" width="' + r[2] + '" height="' + r[3] + '" fill="' + cs[i] + '" stroke="#5a6a7a"/><text x="' + (r[0] + r[2] / 2) + '" y="' + (r[1] + r[3] / 2 + 5) + '" text-anchor="middle" font-size="15">' + cells[i] + '</text>'; });
    s += '<text x="' + (x0 + w1 / 2) + '" y="20" text-anchor="middle" font-size="14">' + top[0] + '</text><text x="' + (x0 + w1 + w2 / 2) + '" y="20" text-anchor="middle" font-size="14">' + top[1] + '</text>';
    s += '<text x="30" y="' + (y0 + h1 / 2 + 5) + '" text-anchor="end" font-size="14">' + left[0] + '</text><text x="30" y="' + (y0 + h1 + h2 / 2 + 5) + '" text-anchor="end" font-size="14">' + left[1] + '</text>';
    return s + '</svg>';
  }
  function techView(t, tab) {
    stop();
    const r = tr(t.id), c = course(t.course);
    let h = head(t.icon + ' ' + esc(t.name));
    h += '<div class="im-tinfo" style="--cc:' + c.color + '"><span>' + c.name + ' コース</span><span class="im-cs">' + stars(r.stars) + '</span><span>60秒 最高 ' + r.sprint + ' / 目標 ' + t.target + '</span></div>';
    h += '<div class="im-tabs">' + [['why', '📖 解説'], ['ex', '👀 例題'], ['prac', '✏ 練習'], ['sprint', '⏱ 60秒']].map(x => '<button class="' + (x[0] === tab ? 'on' : '') + '" data-tab="' + x[0] + '">' + x[1] + '</button>').join('') + '</div><div id="imTab"></div>';
    area().innerHTML = h; bindBack();
    area().querySelectorAll('[data-tab]').forEach(b => b.onclick = () => { sfx('click'); techView(t, b.dataset.tab); });
    const box = $('imTab');
    if (tab === 'why') {
      let s = '<div class="im-box im-rule"><b>ワザ</b><p>' + esc(t.short) + '</p></div><div class="im-box"><div class="im-talk">' + aarya('sm') + '<div><b>なぜ そうなる?</b>' + t.why.map(p => '<p>' + p + '</p>').join('') + '</div></div>' + (t.area ? '<div class="im-center">' + areaSVG(t.area) + '<p class="im-small">面積図: 4つの 長方形の 合計が 答え</p></div>' : '') + '</div>';
      s += '<button class="im-primary" id="imGoEx">👀 例題を 見る</button>';
      box.innerHTML = s; $('imGoEx').onclick = () => { sfx('click'); techView(t, 'ex'); };
    } else if (tab === 'ex') exampleView(t, box, t.make(t.ex));
    else if (tab === 'prac') {
      box.innerHTML = '<div class="im-box im-center"><p>10問 練習。ステップを 選ぼう。</p><div class="im-row"><button class="im-secondary" data-lv="1">ステップ1<br><small>形に なれる</small></button><button class="im-primary" data-lv="2">ステップ2<br><small>本気 (★2 の 条件)</small></button></div><p class="im-small">★1: 8問 以上 正解 ・ ★2: ステップ2で 9問 以上 かつ 平均 ' + t.slow + '秒 以内</p></div>';
      box.querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { sfx('click'); practice(t, +b.dataset.lv); });
    } else {
      box.innerHTML = '<div class="im-box im-center"><p>⏱ 60秒で 何問 解ける? (ステップ1の 問題)</p><p>最高記録 <b>' + r.sprint + '</b>問 ・ ★3 の 目標 <b>' + t.target + '</b>問</p><button class="im-primary" id="imSpr">スタート!</button></div>';
      $('imSpr').onclick = () => { sfx('click'); sprint(t); };
    }
  }
  function exampleView(t, box, ex) {
    let shown = 1;
    const draw = () => {
      let s = '<div class="im-box"><div class="im-q">' + esc(ex.q) + '</div><ol class="im-steps">' + ex.steps.slice(0, shown).map(x => '<li>' + x + '</li>').join('') + '</ol>';
      s += shown < ex.steps.length ? '<button class="im-primary" id="imNextStep">次の ステップ ▶</button>' : '<div class="im-okline">✔ ' + esc(ex.q) + ' = ' + fmtA(t, ex.a) + '</div><div class="im-row"><button class="im-secondary" id="imAnother">🎲 ほかの 例題</button><button class="im-primary" id="imToPrac">✏ 練習へ</button></div>';
      box.innerHTML = s + '</div>';
      const n = $('imNextStep'); if (n) n.onclick = () => { sfx('click'); shown++; draw(); };
      const a = $('imAnother'); if (a) a.onclick = () => { sfx('click'); exampleView(t, box, t.make(t.rand(1))); };
      const p = $('imToPrac'); if (p) p.onclick = () => { sfx('click'); techView(t, 'prac'); };
    };
    draw();
  }
  function fmtA(t, a) { return t.ans === 'qr' ? a[0] + ' あまり ' + a[1] : t.ans === 'ox' ? (a === 'o' ? '○ 正しい' : '× まちがい') : String(a); }

  // ================= 解答 入力 (テンキー) =================
  function inputHTML(t) {
    if (t.ans === 'ox') return '<div class="im-ox"><button data-ox="o">○ 正しい</button><button data-ox="x">× まちがい</button></div>';
    let h = '<div class="im-inp">';
    h += t.ans === 'qr' ? '<label>商 <input id="imA" inputmode="numeric" autocomplete="off"></label><label>あまり <input id="imB" inputmode="numeric" autocomplete="off"></label>' : '<input id="imA" inputmode="numeric" autocomplete="off" placeholder="答え">';
    h += '</div><div class="im-pad">' + [7, 8, 9, 4, 5, 6, 1, 2, 3].map(n => '<button data-k="' + n + '">' + n + '</button>').join('') + '<button data-k="del">⌫</button><button data-k="0">0</button><button data-k="ok" class="ok">決定</button></div>';
    return h;
  }
  function bindInput(t, onAnswer) {
    let field = 'imA';
    const get = () => t.ans === 'qr' ? [$('imA').value, $('imB').value] : $('imA').value;
    const submit = () => {
      if (t.ans === 'qr') { if ($('imA').value === '' ) return; if ($('imB').value === '' && field === 'imA') { field = 'imB'; $('imB').focus(); return; } }
      else if ($('imA').value === '') return;
      onAnswer(get());
    };
    if (t.ans === 'ox') { area().querySelectorAll('[data-ox]').forEach(b => b.onclick = () => onAnswer(b.dataset.ox)); document.onkeydown = e => { if (e.key === 'o' || e.key === '1') onAnswer('o'); if (e.key === 'x' || e.key === '2') onAnswer('x'); }; return; }
    ['imA', 'imB'].forEach(id => { const el = $(id); if (!el) return; el.onfocus = () => { field = id; }; el.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }; el.oninput = () => { el.value = el.value.replace(/[^0-9]/g, ''); }; });
    area().querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      const k = b.dataset.k, el = $(field);
      if (k === 'ok') return submit();
      if (k === 'del') el.value = el.value.slice(0, -1); else if (el.value.length < 9) el.value += k;
    });
    const a = $('imA'); if (a && !('ontouchstart' in window)) a.focus();
  }
  function isRight(t, ex, v) {
    if (t.ans === 'ox') return v === ex.a;
    if (t.ans === 'qr') return +v[0] === ex.a[0] && +v[1] === ex.a[1];
    return String(+v) === String(ex.a);
  }

  // ================= 練習 · 復習 (1問ずつ 解き方つき) =================
  function practice(t, lv) { runSet({ mode: 'prac', t: t, lv: lv, n: 10, title: t.icon + ' ' + t.name + ' — 練習 ステップ' + lv, pick: () => [t, lv] }); }
  function review() {
    const D = data();
    let pool = IM.T.filter(t => (D.t[t.id] || {}).n);
    if (!pool.length) pool = IM.T.filter(t => t.course === 'kihon');
    const w = pool.map(t => { const r = tr(t.id); return Math.max(1, 1 + r.ng * 2 - r.ok * 0.3 + (3 - r.stars)); });
    const tot = w.reduce((a, b) => a + b, 0);
    runSet({ mode: 'rev', n: 10, title: '📅 今日の 復習', pick: () => { let x = Math.random() * tot; for (let i = 0; i < pool.length; i++) { x -= w[i]; if (x <= 0) return [pool[i], Math.random() < 0.6 ? 2 : 1]; } return [pool[0], 1]; } });
  }
  function runSet(cfg) {
    stop();
    run = { cfg: cfg, i: 0, ok: 0, times: [], wrong: [] };
    nextQ();
  }
  function nextQ() {
    const R0 = run; if (!R0) return;
    if (R0.i >= R0.cfg.n) return setResult();
    const [t, lv] = R0.cfg.pick(), ex = t.make(t.rand(lv));
    R0.cur = { t: t, ex: ex, t0: Date.now() };
    let h = head(esc(R0.cfg.title), true);
    h += '<div class="im-prog"><div style="width:' + (R0.i / R0.cfg.n * 100) + '%"></div></div><div class="im-qno">' + (R0.i + 1) + ' / ' + R0.cfg.n + (R0.cfg.mode === 'rev' ? ' ・ ' + t.icon + ' ' + esc(t.name) : '') + '</div>';
    h += '<div class="im-box im-center"><div class="im-q big">' + esc(ex.q) + (t.ans === 'num' ? ' =' : '') + '</div><div id="imFb"></div>' + inputHTML(t) + '</div>';
    if (R0.cfg.mode !== 'rev') h += '<details class="im-hint"><summary>💡 ワザを 思い出す</summary><p>' + esc(t.short) + '</p></details>';
    area().innerHTML = h; bindBack(R0.cfg.t ? () => techView(R0.cfg.t, 'prac') : home);
    bindInput(t, v => answer(v));
  }
  function answer(v) {
    const R0 = run; if (!R0 || R0.cur.done) return;
    const { t, ex } = R0.cur, ok = isRight(t, ex, v), sec = (Date.now() - R0.cur.t0) / 1000;
    R0.cur.done = true;
    const r = tr(t.id); r.n++; if (ok) r.ok++; else r.ng++; if (typeof Study !== 'undefined') Study.log('indian', ok); 
    if (ok) {
      R0.ok++; R0.times.push(sec); sfx('unlock');
      $('imFb').innerHTML = '<div class="im-good">⭕ 正解! ' + sec.toFixed(1) + '秒</div>';
      timers.push(setTimeout(() => { R0.i++; nextQ(); }, 550));
    } else {
      sfx('wrong'); R0.wrong.push({ t: t, ex: ex, v: v });
      const box = area().querySelector('.im-box.im-center');
      box.innerHTML = '<div class="im-q big">' + esc(ex.q) + '</div><div class="im-bad">✗ 答えは <b>' + fmtA(t, ex.a) + '</b>' + (t.ans !== 'ox' ? ' (あなた: ' + esc(Array.isArray(v) ? v[0] + ' あまり ' + v[1] : v) + ')' : '') + '</div><div class="im-talk">' + art(KORARIN, '', 'im-kor') + '<div><b>コラリン: この 問題の 解き方</b><ol class="im-steps">' + ex.steps.map(x => '<li>' + x + '</li>').join('') + '</ol></div></div><button class="im-primary" id="imGoOn">次へ →</button>';
      $('imGoOn').onclick = () => { sfx('click'); R0.i++; nextQ(); };
      document.onkeydown = e => { if (e.key === 'Enter') { document.onkeydown = null; R0.i++; nextQ(); } };
    }
    save();
  }
  function setResult() {
    const R0 = run, cfg = R0.cfg, avg = R0.times.length ? R0.times.reduce((a, b) => a + b, 0) / R0.times.length : 0;
    let msg = '';
    if (cfg.mode === 'prac') {
      const t = cfg.t, r = tr(t.id), before = r.stars;
      if (R0.ok >= 8) r.stars = Math.max(r.stars, 1);
      if (cfg.lv === 2 && R0.ok >= 9 && avg <= t.slow) r.stars = Math.max(r.stars, 2);
      if (cfg.lv === 2 && R0.ok >= 9) r.avg = r.avg ? Math.min(r.avg, avg) : avg;
      if (r.stars > before) msg = '<div class="im-good big">★ ' + stars(r.stars) + ' に アップ!</div>';
      else if (r.stars < 2) msg = '<p class="im-small">' + (R0.ok < 8 ? '★1 まで あと ' + (8 - R0.ok) + '問' : cfg.lv === 1 ? 'ステップ2で ★2 を ねらおう' : R0.ok < 9 ? '★2 は 9問 以上 正解' : '★2 は 平均 ' + t.slow + '秒 以内 (今回 ' + avg.toFixed(1) + '秒)') + '</p>';
      save();
    }
    stop(); run = R0;
    let h = head(esc(cfg.title) + ' — 結果', true);
    h += '<div class="im-box im-center"><div class="im-big">' + (R0.ok >= 8 ? aarya('mid', 'cheer') : (R0.ok >= 7 ? '👍' : '💪')) + '</div><p><b class="im-score">' + R0.ok + '</b> / ' + cfg.n + ' 正解 ・ 平均 ' + avg.toFixed(1) + '秒</p>' + msg + '</div>';
    if (R0.wrong.length) h += '<div class="im-box"><b>まちがえた 問題の 解き方</b>' + R0.wrong.map(w => '<details class="im-wr"><summary>' + esc(w.ex.q) + ' = ' + fmtA(w.t, w.ex.a) + '</summary><ol class="im-steps">' + w.ex.steps.map(x => '<li>' + x + '</li>').join('') + '</ol></details>').join('') + '</div>';
    h += '<div class="im-row"><button class="im-primary" id="imAgain">もう一度</button><button class="im-secondary" id="imBackT">' + (cfg.t ? 'ワザの ページへ' : '道場へ') + '</button></div>';
    area().innerHTML = h; bindBack(cfg.t ? () => techView(cfg.t, 'prac') : home);
    $('imAgain').onclick = () => { sfx('click'); cfg.mode === 'rev' ? review() : practice(cfg.t, cfg.lv); };
    $('imBackT').onclick = () => { sfx('click'); cfg.t ? techView(cfg.t, 'prac') : home(); };
  }

  // ================= 60秒 チャレンジ =================
  function sprint(t) {
    stop();
    const S = { t: t, ok: 0, ng: 0, end: Date.now() + 60000 };
    run = S;
    const ask = () => {
      if (run !== S) return;
      const ex = t.make(t.rand(1)); S.cur = { ex: ex, done: false };
      let h = head('⏱ 60秒 — ' + esc(t.name), true);
      h += '<div class="im-spr"><div class="im-clock" id="imClock"></div><div class="im-sc">⭕ <b>' + S.ok + '</b> ・ ✗ ' + S.ng + '</div></div>';
      h += '<div class="im-box im-center"><div class="im-q big">' + esc(ex.q) + (t.ans === 'num' ? ' =' : '') + '</div><div id="imFb"></div>' + inputHTML(t) + '</div>';
      area().innerHTML = h; bindBack(() => techView(t, 'sprint')); tick();
      bindInput(t, v => {
        if (S.cur.done || run !== S) return; S.cur.done = true;
        const ok = isRight(t, ex, v); if (typeof Study !== 'undefined') Study.log('indian', ok); const r = tr(t.id); r.n++; if (ok) { r.ok++; S.ok++; sfx('click'); } else { r.ng++; S.ng++; sfx('wrong'); }
        if (ok) return ask();
        $('imFb').innerHTML = '<div class="im-bad">✗ ' + fmtA(t, ex.a) + '</div>';
        timers.push(setTimeout(ask, 900));
      });
    };
    const tick = () => { const el = $('imClock'); const left = Math.max(0, Math.ceil((S.end - Date.now()) / 1000)); if (el) { el.textContent = left; el.classList.toggle('hurry', left <= 10); } };
    const iv = setInterval(() => { if (run !== S) return clearInterval(iv); tick(); if (Date.now() >= S.end) { clearInterval(iv); done(); } }, 250);
    timers.push(iv);
    const done = () => {
      const r = tr(t.id), rec = S.ok > r.sprint; if (rec) r.sprint = S.ok;
      const before = r.stars; if (S.ok >= t.target && r.stars >= 2) r.stars = 3;
      save(); stop(); sfx('unlock');
      let h = head('⏱ 60秒 — 結果', true);
      h += '<div class="im-box im-center"><div class="im-big">' + (rec ? '🏆' : '⏱') + '</div><p><b class="im-score">' + S.ok + '</b> 問 正解 (✗ ' + S.ng + ')</p>' + (rec ? '<div class="im-good">自己ベスト 更新!</div>' : '<p class="im-small">最高記録 ' + r.sprint + '問</p>') +
        (r.stars > before ? '<div class="im-good big">★★★ 達成!</div>' : S.ok >= t.target && r.stars < 2 ? '<p class="im-small">目標 達成! ★3 には 先に ★2 (練習 ステップ2) が 必要</p>' : '<p class="im-small">★3 の 目標: ' + t.target + '問</p>') + '</div>';
      h += '<div class="im-row"><button class="im-primary" id="imAgain">もう一度</button><button class="im-secondary" id="imBackT">ワザの ページへ</button></div>';
      area().innerHTML = h; bindBack(() => techView(t, 'sprint'));
      $('imAgain').onclick = () => { sfx('click'); sprint(t); };
      $('imBackT').onclick = () => { sfx('click'); techView(t, 'sprint'); };
    };
    ask();
  }

  // ================= コース 検定 =================
  function examIntro(cid) {
    stop();
    const c = course(cid), E = c.exam, list = IM.T.filter(t => t.course === cid);
    let h = head('📝 ' + c.name + ' 検定');
    h += '<div class="im-box"><div class="im-talk">' + aarya('sm') + '<div><b>アーリヤ</b><p>' + c.name + ' コースの ワザ ' + list.length + 'こ から ' + E.n + '問。制限時間 ' + Math.round(E.sec / 60) + '分。' + E.pass + '問 以上 正解で 合格だよ! 答え合わせは 最後に まとめて。</p></div></div><p class="im-small">出題する ワザ: ' + list.map(t => t.icon + esc(t.name)).join(' / ') + '</p></div>';
    h += '<button class="im-primary" id="imStart">はじめる</button>';
    area().innerHTML = h; bindBack();
    $('imStart').onclick = () => { sfx('click'); exam(cid); };
  }
  function exam(cid) {
    stop();
    const c = course(cid), E = c.exam, list = IM.T.filter(t => t.course === cid), qs = [];
    for (let i = 0; i < E.n; i++) { const t = list[i % list.length]; qs.push({ t: t, ex: t.make(t.rand(Math.random() < 0.6 ? 2 : 1)) }); }
    for (let i = qs.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [qs[i], qs[j]] = [qs[j], qs[i]]; }
    const X = { c: c, qs: qs, i: 0, ans: [], end: Date.now() + E.sec * 1000 };
    run = X;
    const ask = () => {
      if (run !== X) return;
      if (X.i >= qs.length) return finish();
      const { t, ex } = qs[X.i];
      let h = head('📝 ' + c.name + ' 検定', true);
      h += '<div class="im-spr"><div class="im-clock wide" id="imClock"></div><div class="im-sc">' + (X.i + 1) + ' / ' + qs.length + '</div></div>';
      h += '<div class="im-box im-center"><div class="im-q big">' + esc(ex.q) + (t.ans === 'num' ? ' =' : '') + '</div>' + inputHTML(t) + '<button class="im-skip" id="imSkipQ">とばす</button></div>';
      area().innerHTML = h; bindBack(() => examIntro(cid)); tick();
      bindInput(t, v => { X.ans[X.i] = v; X.i++; sfx('click'); ask(); });
      $('imSkipQ').onclick = () => { X.ans[X.i] = null; X.i++; ask(); };
    };
    const tick = () => { const el = $('imClock'); const left = Math.max(0, Math.ceil((X.end - Date.now()) / 1000)); if (el) { el.textContent = Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0'); el.classList.toggle('hurry', left <= 60); } };
    const iv = setInterval(() => { if (run !== X) return clearInterval(iv); tick(); if (Date.now() >= X.end) { clearInterval(iv); finish(true); } }, 500);
    timers.push(iv);
    const finish = timeUp => {
      if (X.done) return; X.done = true;
      const D = data(); let ok = 0;
      const rows = qs.map((q, i) => { const v = X.ans[i], r = v != null && isRight(q.t, q.ex, v); if (r) ok++; const tt = tr(q.t.id); if (v != null) { tt.n++; if (r) tt.ok++; else tt.ng++; if (typeof Study !== 'undefined') Study.log('indian', r); } return { q: q, v: v, r: r }; });
      const pass = ok >= E.pass; D.exam[cid] = Math.max(D.exam[cid] || 0, ok); if (pass) D.badge[cid] = 1; save();
      stop(); sfx(pass ? 'unlock' : 'wrong');
      let h = head('📝 ' + c.name + ' 検定 — 結果');
      h += '<div class="im-box im-center"><div class="im-big">' + (pass ? aarya('mid', 'cheer') + '<div>🏅</div>' : '💪') + '</div>' + (timeUp ? '<p class="im-small">⏰ 時間切れ</p>' : '') + '<p><b class="im-score">' + ok + '</b> / ' + qs.length + '</p><div class="' + (pass ? 'im-good big' : 'im-bad') + '">' + (pass ? c.name + ' 検定 合格!' : '合格まで あと ' + (E.pass - ok) + '問') + '</div></div>';
      const byT = {}; rows.forEach(x => { const k = x.q.t.id; byT[k] = byT[k] || [0, 0]; byT[k][1]++; if (x.r) byT[k][0]++; });
      h += '<div class="im-box"><b>ワザ別</b><table class="im-tbl">' + Object.keys(byT).map(k => { const t = IM.byId(k); return '<tr><td>' + t.icon + ' ' + esc(t.name) + '</td><td>' + byT[k][0] + ' / ' + byT[k][1] + '</td></tr>'; }).join('') + '</table></div>';
      const wr = rows.filter(x => !x.r);
      if (wr.length) h += '<div class="im-box"><b>まちがえた 問題の 解き方</b>' + wr.map(x => '<details class="im-wr"><summary>' + esc(x.q.ex.q) + ' = ' + fmtA(x.q.t, x.q.ex.a) + (x.v == null ? ' (未回答)' : '') + '</summary><ol class="im-steps">' + x.q.ex.steps.map(s => '<li>' + s + '</li>').join('') + '</ol></details>').join('') + '</div>';
      h += '<div class="im-row"><button class="im-primary" id="imAgain">もう一度 受ける</button><button class="im-secondary" id="imHome">道場へ</button></div>';
      area().innerHTML = h; bindBack();
      $('imAgain').onclick = () => { sfx('click'); exam(cid); };
      $('imHome').onclick = () => { sfx('click'); home(); };
    };
    ask();
  }

  // ================= ものがたり =================
  function stories() {
    stop();
    let h = head('📜 インド数学 ものがたり');
    h += IM.STORIES.map(s => '<div class="im-box im-story"><div class="im-si">' + s.icon + '</div><div><b>' + esc(s.t) + '</b><p>' + esc(s.b) + '</p></div></div>').join('');
    area().innerHTML = h; bindBack();
  }

  function open() { showPage('pageIndian'); home(); const p = $('pageIndian'); if (p) p.scrollTop = 0; }
  return { open: open, stop: stop, home: home, _run: () => run };
})();
