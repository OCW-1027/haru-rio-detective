/* engine/kids-court.js — シーズン2 新コンテンツ⑤ こども裁判所 (法と 権利)
 * 法廷で 証言と 証拠の「むじゅん」を 見つけて「異議あり!」。最後に 判決と 法律の 問題。
 *   事件 5 (刑事・民事、弁護人・検察官・裁判官・裁判員の 立場) / 裁判の しくみ カード / 法律クイズ 10問
 * 画面: pageJustice (#kcArea). 保存: State.v2.court = { cleared: {caseId: stars}, best: n }
 * Dependencies: KC_CASES, KC_LEARN, KC_QUIZ, State, saveState, showPage, sfx, escapeHtml, Hub
 */
const KidsCourt = (function () {
  const SP = 'assets/img/chars/spirits/';
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.court || (State.v2.court = {}); d.cleared = d.cleared || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function area() { return $('kcArea'); }
  function sound(t) { try { sfx(t); } catch (e) {} }
  function top() { const p = $('pageJustice'); if (p) p.scrollTop = 0; }
  function header(title, sub, back) { return '<div class="kc-head">' + (back ? '<button class="kc-back" data-back data-go="' + back + '">← ' + (back === 'cases' ? '事件' : 'トップ') + '</button>' : '') + '<div><div class="kc-title">' + title + '</div>' + (sub ? '<div class="kc-sub">' + sub + '</div>' : '') + '</div></div>'; }
  function bindGo(root) { root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { sound('click'); go(b.dataset.go); }); }
  function go(v) { run = null; top(); ({ home: home, cases: cases, learn: learn, quiz: quizStart }[v] || home)(); }

  function home() {
    const d = data();
    let h = header('⚖ こども裁判所', 'シーズン2 ・ 証拠で 真実を 明らかに');
    h += '<div class="kc-hero"><img src="' + SP + 'koradon_greet_01.webp" alt=""><div class="kc-say"><b>コラドン:</b> ブランク団が うその 証言で 裁判を ゆがめようと している! 証言と 証拠を よく くらべて、むじゅんを 見つけたら「<b>異議あり!</b>」だ。</div></div>';
    h += '<div class="kc-menu">';
    h += '<button class="kc-mbtn" data-go="cases"><span class="i">🏛</span><b>法廷バトル</b><small>解決 ' + Object.keys(d.cleared).length + ' / ' + KC_CASES.length + '</small></button>';
    h += '<button class="kc-mbtn" data-go="learn"><span class="i">📘</span><b>裁判の しくみ</b><small>' + KC_LEARN.length + 'まいの カード</small></button>';
    h += '<button class="kc-mbtn" data-go="quiz"><span class="i">📝</span><b>法律クイズ</b><small>10問 ・ ベスト ' + (d.best || 0) + '</small></button>';
    area().innerHTML = h + '</div>'; bindGo(area());
  }
  function learn() {
    let h = header('📘 裁判の しくみ', '法廷バトルの 前に 読んで おこう', 'home') + '<div class="kc-cards">';
    KC_LEARN.forEach(([t, s]) => { h += '<div class="kc-card"><b>' + esc(t) + '</b><p>' + esc(s) + '</p></div>'; });
    area().innerHTML = h + '</div>'; bindGo(area());
  }
  // ---------- クイズ ----------
  let qz = null;
  function quizStart() { qz = { list: shuffle(KC_QUIZ).slice(0, 10), i: 0, ok: 0 }; quizQ(); }
  function quizQ() {
    top();
    if (qz.i >= qz.list.length) { const d = data(), nb = qz.ok > (d.best || 0); d.best = Math.max(d.best || 0, qz.ok); save(); area().innerHTML = header('📝 法律クイズ 結果', '', 'home') + '<div class="kc-res"><b>' + qz.ok + '</b> / 10' + (nb ? ' 🏆' : '') + '</div><button class="kc-go" id="kcQA">🔁 もう一度</button>'; bindGo(area()); $('kcQA').onclick = () => { sound('click'); quizStart(); }; return; }
    const r = qz.list[qz.i], opts = shuffle([r[1], r[2], r[3], r[4]]);
    let h = header('📝 法律クイズ', (qz.i + 1) + ' / 10 ・ 正解 ' + qz.ok, 'home') + '<div class="kc-q">' + esc(r[0]) + '</div><div class="kc-opts">';
    opts.forEach((o, k) => { h += '<button class="kc-opt" data-k="' + k + '">' + esc(o) + '</button>'; });
    area().innerHTML = h + '</div><div id="kcFb"></div>'; bindGo(area());
    let done = false;
    area().querySelectorAll('.kc-opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = opts[+b.dataset.k] === r[1]; if (ok) qz.ok++;
      area().querySelectorAll('.kc-opt').forEach(x => { if (opts[+x.dataset.k] === r[1]) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng'); sound(ok ? 'correct' : 'wrong');
      $('kcFb').innerHTML = '<div class="' + (ok ? 'kc-ok' : 'kc-ng') + '">' + (ok ? '✔ 正解!' : '✗ 正解は「' + esc(r[1]) + '」') + ' ' + esc(r[5]) + '</div><button class="kc-go" id="kcQN">次へ →</button>';
      $('kcQN').onclick = () => { sound('click'); qz.i++; quizQ(); };
    });
  }
  // ---------- 法廷バトル ----------
  let run = null;
  function cases() {
    const d = data();
    let h = header('🏛 法廷バトル', '証言の むじゅんを 証拠で つけ', 'home') + '<div class="kc-cases">';
    KC_CASES.forEach((c, i) => { const st = d.cleared[c.id]; h += '<button class="kc-case' + (st ? ' done' : '') + '" data-c="' + i + '"><span class="kc-cn">第' + (i + 1) + '事件 ・ ' + c.kind + '裁判</span><b>' + esc(c.title) + '</b><small>ハルの 立場: ' + c.role + '</small><span class="kc-st">' + (st ? '⭐'.repeat(st) + '☆'.repeat(3 - st) : '') + '</span></button>'; });
    area().innerHTML = h + '</div>'; bindGo(area());
    area().querySelectorAll('[data-c]').forEach(b => b.onclick = () => { sound('click'); intro(+b.dataset.c); });
  }
  function evidenceHtml(c, sel) {
    let h = '<div class="kc-evs">';
    c.evidence.forEach(e => { h += '<button class="kc-ev' + (sel === e.id ? ' on' : '') + '" data-ev="' + e.id + '"><span class="i">' + e.icon + '</span><b>' + esc(e.name) + '</b><small>' + esc(e.text) + '</small></button>'; });
    return h + '</div>';
  }
  const pic = (f, cls) => '<img class="s2-banner' + (cls ? ' ' + cls : '') + '" src="assets/img/s2/' + f + '" alt="" loading="lazy" onerror="this.remove()">';
  function intro(ci) {
    const c = KC_CASES[ci]; top();
    let h = header('第' + (ci + 1) + '事件 ' + esc(c.title), c.kind + '裁判 ・ ハルは ' + c.role, 'cases') + pic('court/courtroom.webp');
    h += '<div class="kc-intro">' + esc(c.intro) + '</div><div class="kc-h2">🗂 証拠ファイル</div>' + evidenceHtml(c);
    h += '<div class="kc-rules">証言を 1つ えらび → むじゅんする 証拠を 1つ えらび → 「異議あり!」。まちがえると ❤ が へる (3つ)。</div><button class="kc-go" id="kcStart">🔨 開廷!</button>';
    area().innerHTML = h; bindGo(area());
    $('kcStart').onclick = () => { sound('click'); run = { ci: ci, r: 0, hearts: 3, miss: 0, line: -1, ev: null, phase: 'round' }; court(); };
  }
  function court() {
    const R = run, c = KC_CASES[R.ci]; top();
    if (R.phase === 'verdict' || R.phase === 'law') return judge();
    const rd = c.rounds[R.r];
    let h = header('第' + (R.ci + 1) + '事件 ' + esc(c.title), '証言 ' + (R.r + 1) + ' / ' + c.rounds.length + ' ・ ' + '❤'.repeat(R.hearts) + '<span class="off">' + '❤'.repeat(3 - R.hearts) + '</span>', 'cases');
    h += '<div class="kc-wit">' + esc(rd.who) + ' の 証言</div><div class="kc-lines">';
    rd.lines.forEach((l, k) => { h += '<button class="kc-line' + (R.line === k ? ' on' : '') + '" data-l="' + k + '"><span>' + (k + 1) + '</span>' + esc(l) + '</button>'; });
    h += '</div><div class="kc-h2">🗂 つきつける 証拠</div>' + evidenceHtml(c, R.ev);
    h += '<div class="kc-row"><button class="kc-hint" id="kcHint">💡 ヒント</button><button class="kc-objection" id="kcObj"' + (R.line < 0 || !R.ev ? ' disabled' : '') + '>異議あり!</button></div><div id="kcFb"></div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-l]').forEach(b => b.onclick = () => { sound('click'); R.line = +b.dataset.l; court(); });
    area().querySelectorAll('[data-ev]').forEach(b => b.onclick = () => { sound('click'); R.ev = b.dataset.ev; court(); });
    $('kcHint').onclick = () => { sound('click'); $('kcFb').innerHTML = '<div class="kc-tip">💡 ' + esc(rd.hint) + '</div>'; };
    $('kcObj').onclick = () => {
      const ok = (R.line === rd.contra.line && R.ev === rd.contra.ev) || (rd.contra.alt || []).some(x => x[0] === R.line && x[1] === R.ev);
      const lineOk = R.line === rd.contra.line || (rd.contra.alt || []).some(x => x[0] === R.line);
      if (ok) {
        sound('correct');
        area().innerHTML = header('第' + (R.ci + 1) + '事件 ' + esc(c.title), '', 'cases') + '<div class="kc-boom">異議あり!!</div><div class="kc-ok big">' + esc(rd.hit) + '</div><button class="kc-go" id="kcNext">' + (R.r + 1 < c.rounds.length ? '次の 証言へ →' : '⚖ 判決へ') + '</button>';
        bindGo(area());
        $('kcNext').onclick = () => { sound('click'); R.r++; R.line = -1; R.ev = null; if (R.r >= c.rounds.length) R.phase = 'verdict'; court(); };
      } else {
        sound('wrong'); R.hearts--; R.miss++;
        if (R.hearts <= 0) return lose();
        const msg = !lineOk ? 'その 証言は 証拠と むじゅん して いない みたい…' : 'その 証言で 合っているけど、つきつける 証拠が ちがう!';
        court(); $('kcFb').innerHTML = '<div class="kc-ng">✗ ' + msg + '</div>';
      }
    };
  }
  function judge() {
    const R = run, c = KC_CASES[R.ci], Q = R.phase === 'verdict' ? c.verdict : c.law; top();
    const order = shuffle(Q.opts.map((o, k) => k));
    let h = header('第' + (R.ci + 1) + '事件 ' + esc(c.title), R.phase === 'verdict' ? '⚖ 判決' : '📘 法律の 問題', 'cases') + '<div class="kc-q">' + esc(Q.q) + '</div><div class="kc-opts">';
    order.forEach(k => { h += '<button class="kc-opt" data-k="' + k + '">' + esc(Q.opts[k]) + '</button>'; });
    area().innerHTML = h + '</div><div id="kcFb"></div>'; bindGo(area());
    let done = false;
    area().querySelectorAll('.kc-opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = +b.dataset.k === Q.ans; if (!ok) R.miss++;
      area().querySelectorAll('.kc-opt').forEach(x => { if (+x.dataset.k === Q.ans) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng'); sound(ok ? 'correct' : 'wrong');
      $('kcFb').innerHTML = '<div class="' + (ok ? 'kc-ok' : 'kc-ng') + '">' + (ok ? '✔ 正解!' : '✗ 正解は「' + esc(Q.opts[Q.ans]) + '」') + ' ' + esc(Q.exp) + '</div><button class="kc-go" id="kcJN">' + (R.phase === 'verdict' ? '📘 法律の 問題へ →' : '🏁 閉廷') + '</button>';
      $('kcJN').onclick = () => { sound('click'); if (R.phase === 'verdict') { R.phase = 'law'; judge(); } else win(); };
    });
  }
  function win() {
    const R = run, c = KC_CASES[R.ci], d = data(), st = R.miss === 0 ? 3 : R.miss <= 2 ? 2 : 1;
    d.cleared[c.id] = Math.max(d.cleared[c.id] || 0, st); save();
    try { if (typeof triggerConfetti === 'function') triggerConfetti(); } catch (e) {}
    sound('chime'); top();
    area().innerHTML = header('🏁 閉廷', esc(c.title), 'cases') + '<div class="kc-hero"><img src="' + SP + 'korarin_greet_01.webp" alt=""><div class="kc-say"><b>コラリン:</b> 証拠に もとづいて 正しい 判断が できました! 法律は、みんなが 安心して くらす ための ルールなんですね。</div></div><div class="kc-res">' + '⭐'.repeat(st) + '<span class="off">' + '☆'.repeat(3 - st) + '</span><div>まちがい ' + R.miss + '回</div></div><button class="kc-go" data-go="cases">法廷バトル 一覧へ</button>';
    bindGo(area());
  }
  function lose() {
    const R = run, c = KC_CASES[R.ci]; top();
    area().innerHTML = header('🔨 審理 中断', esc(c.title), 'cases') + '<div class="kc-ng big">❤ が なくなった… 証拠ファイルを よく 読んで、もう一度 挑戦しよう!</div><button class="kc-go" id="kcRetry">🔁 もう一度</button>';
    bindGo(area()); const ci = R.ci; $('kcRetry').onclick = () => { sound('click'); intro(ci); };
  }
  function leave() { try { Hub.open(); } catch (e) { showPage('pageSelect'); } }
  function open() { showPage('pageJustice'); top(); home(); const b = $('btnJusticeBack'); if (b) b.onclick = () => { sound('click'); run = null; leave(); }; }
  return { open: open, stats: () => ({ cleared: Object.keys(data().cleared).length }) };
})();
