/* engine/code-lab.js — シーズン2 新コンテンツ⑧ 暗号解読局
 * ブランク団の 暗号通信を 解読して アジトの 金庫を 開ける。問題は すべて 自動生成 (毎回 ちがう)。
 *   シーザー暗号 (英語・ひらがな) / 数列の きまり / モールス信号 / うそつきパズル (論理) / 金庫の 暗証番号
 * 事件: 4つの 暗号を 解くと、答えに かくれた 数字が そろい、最後に 金庫の 4けたの 番号を 推理する
 * 画面: pageCodeLab (#clArea). 保存: State.v2.code = { cleared: {caseId: stars}, best: {kind: n} }
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, Hub, Eiken (単語リスト)
 */
const CodeLab = (function () {
  const SP = 'assets/img/chars/spirits/';
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.code || (State.v2.code = {}); d.cleared = d.cleared || {}; d.best = d.best || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function area() { return $('clArea'); }
  function sound(t) { try { sfx(t); } catch (e) {} }
  function top() { const p = $('pageCodeLab'); if (p) p.scrollTop = 0; }
  function header(title, sub, back) { return '<div class="cl-head">' + (back ? '<button class="cl-back" data-back data-go="' + back + '">← ' + (back === 'cases' ? '事件' : 'トップ') + '</button>' : '') + '<div><div class="cl-title">' + title + '</div>' + (sub ? '<div class="cl-sub">' + sub + '</div>' : '') + '</div></div>'; }
  function bindGo(root) { root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { sound('click'); go(b.dataset.go); }); }
  function go(v) { run = null; top(); ({ home: home, cases: cases }[v] || home)(); }

  // ---------- 生成器 ----------
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const KANA = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
  const KANA_WORDS = ['たんてい', 'ひみつ', 'かいとう', 'たからもの', 'すいり', 'きんこ', 'はんにん', 'とけい', 'やまのうえ', 'みなと', 'さくら', 'しるし', 'つくえ', 'うみのいえ', 'ふたり', 'きつね', 'ひこうき', 'あおいとり', 'ものしり', 'くもり', 'おおきなき', 'ちかみち'];   // 濁点・小さい 字は 使わない (ずらせない ため)
  const EN_FALLBACK = ['APPLE', 'RIVER', 'SPACE', 'CLOCK', 'BRIDGE', 'SECRET', 'PLANET', 'GARDEN', 'MUSEUM', 'WINDOW', 'ISLAND', 'TICKET', 'CASTLE', 'FOREST', 'SILVER'];
  function enWords(len) {
    let L = [];
    try { L = Eiken._wordList('g2').map(w => w.en).filter(w => /^[a-z]+$/.test(w)).map(w => w.toUpperCase()); } catch (e) {}
    if (L.length < 30) L = EN_FALLBACK;
    return len ? L.filter(w => w.length === len) : L.filter(w => w.length >= 4 && w.length <= 7);
  }
  const shiftEn = (w, k) => w.split('').map(c => ABC[(ABC.indexOf(c) + k + 26) % 26]).join('');
  const shiftKana = (w, k) => w.split('').map(c => { const i = KANA.indexOf(c); return i < 0 ? c : KANA[(i + k + KANA.length) % KANA.length]; }).join('');
  function caesarEn(hard) {
    const w = pick(enWords()), k = hard ? 1 + rnd(25) : 1 + rnd(4);
    const same = shuffle(enWords(w.length).filter(x => x !== w)).slice(0, 3);
    while (same.length < 3) same.push(shiftEn(w, same.length + 1));
    const opts = shuffle([w].concat(same));
    return { kind: 'caesar', title: 'シーザー暗号 (英語)', q: '<div class="cl-cipher">' + shiftEn(w, k) + '</div><p class="cl-p">' + (hard ? 'ずらした 数は ひみつ。<b>元の 英単語</b>は どれ?' : 'アルファベットを <b>' + k + 'つ 後ろ</b>へ ずらして ある (A→' + ABC[k] + ')。元に もどすと?') + '</p>', opts: opts, ans: opts.indexOf(w),
      exp: '各文字を ' + k + 'つ 前へ もどす: ' + shiftEn(w, k) + ' → ' + w + '。' + (hard ? 'ヒント: 選択肢の 1文字目と 暗号の 1文字目の ずれを 調べ、ほかの 文字でも 同じ ずれか 確かめる。' : ''), digit: k % 10, tool: 'abc' };
  }
  function caesarKana() {
    const w = pick(KANA_WORDS), k = 1 + rnd(5);
    const same = shuffle(KANA_WORDS.filter(x => x !== w && Math.abs(x.length - w.length) <= 1)).slice(0, 3);
    const opts = shuffle([w].concat(same));
    return { kind: 'kana', title: 'ずらし暗号 (ひらがな)', q: '<div class="cl-cipher kana">' + shiftKana(w, k) + '</div><p class="cl-p">五十音 (あいうえお…わをん) を <b>' + k + '文字 後ろ</b>へ ずらして ある。元の ことばは?</p>', opts: opts, ans: opts.indexOf(w), exp: '1文字ずつ ' + k + '文字 前に もどす: ' + shiftKana(w, k) + ' → ' + w + '。「ん」の 次は「あ」に もどる。', digit: k, tool: 'kana' };
  }
  function seqQ(hard) {
    const T = [
      () => { const a = 2 + rnd(9), d = 2 + rnd(8); const s = [0, 1, 2, 3, 4, 5].map(i => a + d * i); return [s, '同じ 数 (' + d + ') ずつ 増える']; },
      () => { const a = 1 + rnd(4), r = 2 + rnd(2); const s = [0, 1, 2, 3, 4, 5].map(i => a * Math.pow(r, i)); return [s, r + '倍 ずつ 増える']; },
      () => { const a = 1 + rnd(5); let s = [a], d = 1 + rnd(3); for (let i = 1; i < 6; i++) { s.push(s[i - 1] + d); d++; } return [s, '増え方が 1ずつ 大きくなる (差が ' + (s[1] - s[0]) + ', ' + (s[2] - s[1]) + ', …)']; },
      () => { const o = rnd(3); const s = [1, 2, 3, 4, 5, 6].map(i => (i + o) * (i + o)); return [s, '平方数 (同じ 数を 2回 かける): ' + (1 + o) + '×' + (1 + o) + ', ' + (2 + o) + '×' + (2 + o) + ', …']; },
      () => { const a = 1 + rnd(3), b = a + rnd(3); const s = [a, b]; for (let i = 2; i < 6; i++) s.push(s[i - 1] + s[i - 2]); return [s, '前の 2つを たす (フィボナッチ型)']; },
      () => { const s = [1, 3, 6, 10, 15, 21]; return [s, '三角数: +2, +3, +4, +5 … と 増える']; },
      () => { const a = 50 + rnd(50), d = 3 + rnd(7); const s = [0, 1, 2, 3, 4, 5].map(i => a - d * i); return [s, d + 'ずつ 減る']; },
      () => { const a = 1 + rnd(5), b = 10 + rnd(10); const s = [a, b, a + 2, b + 3, a + 4, b + 6]; return [s, '2つの 数列が 交互に 並ぶ (1つ目は +2、2つ目は +3)']; },
      () => { const s = [2, 3, 5, 7, 11, 13]; return [s, '素数 (1と その数 しか 約数が ない 数)']; },
      () => { const a = 2 + rnd(3); const s = [a]; for (let i = 1; i < 6; i++) s.push(s[i - 1] * 2 + 1); return [s, '2倍して 1 たす']; },
    ];
    const t = pick(hard ? T.slice(2) : T.slice(0, 4).concat([T[6]]));
    const [s, rule] = t(), ans = s[5], show = s.slice(0, 5);
    const cand = new Set([ans + 1, ans - 1, ans + (s[4] - s[3]), ans + 2, ans - 2, s[4] * 2, ans + 10]); cand.delete(ans);
    const opts = shuffle([ans].concat(shuffle([...cand].filter(x => x > 0)).slice(0, 3)));
    return { kind: 'seq', title: '数列の きまり', q: '<div class="cl-cipher seq">' + show.join(' , ') + ' , <span>?</span></div><p class="cl-p">きまりを 見つけて「?」に 入る 数を 当てよう。</p>', opts: opts.map(String), ans: opts.indexOf(ans), exp: 'きまり: ' + rule + '。だから 次は ' + ans + '。', digit: ans % 10 };
  }
  const MORSE = { A: '・－', B: '－・・・', C: '－・－・', D: '－・・', E: '・', F: '・・－・', G: '－－・', H: '・・・・', I: '・・', J: '・－－－', K: '－・－', L: '・－・・', M: '－－', N: '－・', O: '－－－', P: '・－－・', Q: '－－・－', R: '・－・', S: '・・・', T: '－', U: '・・－', V: '・・・－', W: '・－－', X: '－・・－', Y: '－・－－', Z: '－－・・' };
  function morseQ() {
    const w = pick(enWords().filter(x => x.length <= 5).concat(['SOS', 'MAP', 'KEY', 'CODE', 'GOLD', 'SAFE', 'BOX', 'SPY', 'CLUE']));
    const same = shuffle(enWords(w.length).concat(['MAP', 'KEY', 'BOX', 'SPY', 'CODE', 'GOLD', 'SAFE', 'CLUE']).filter(x => x !== w && x.length === w.length)).slice(0, 3);
    while (same.length < 3) same.push(w.split('').reverse().join('') + same.length);
    const opts = shuffle([w].concat(same));
    return { kind: 'morse', title: 'モールス信号', q: '<div class="cl-cipher morse">' + w.split('').map(c => MORSE[c]).join(' / ') + '</div><p class="cl-p">・ は 短い 音、－ は 長い 音。/ は 文字の 区切り。下の 表で 解読しよう。</p>', opts: opts, ans: opts.indexOf(w), exp: w.split('').map(c => c + ' = ' + MORSE[c]).join('、') + '。SOS (・・・ / －－－ / ・・・) は 有名な 救助信号。', digit: w.length, tool: 'morse' };
  }
  // うそつきパズル: 3人の うち 犯人は 1人。うそを ついているのは ちょうど 1人 (= 犯人とは かぎらない)。答えが 1通りに なる ものだけ 出す
  const NAMES = [['リオ', 'コラドン', 'コラリン'], ['駅員', '店長', '運転手'], ['A', 'B', 'C'], ['ねこ', 'いぬ', 'うさぎ']];
  function liarQ() {
    for (let tries = 0; tries < 200; tries++) {
      const N = pick(NAMES).slice();
      const st = [0, 1, 2].map(i => { const t = rnd(3), o = (i + 1 + rnd(2)) % 3; return { t: t, o: o }; });
      // t: 0「私は 犯人じゃない」 1「Xが 犯人だ」 2「Xは 犯人じゃない」
      const truth = (s, i, c) => s.t === 0 ? c !== i : s.t === 1 ? c === s.o : c !== s.o;
      const sols = [0, 1, 2].filter(c => st.filter((s, i) => !truth(s, i, c)).length === 1);
      if (sols.length !== 1) continue;
      const c = sols[0], liar = st.findIndex((s, i) => !truth(s, i, c));
      const say = (s, i) => s.t === 0 ? '「わたしは 犯人じゃ ない」' : s.t === 1 ? '「' + N[s.o] + 'が 犯人だ」' : '「' + N[s.o] + 'は 犯人じゃ ない」';
      const opts = N.slice();
      return { kind: 'liar', title: 'うそつきパズル', q: '<p class="cl-p">金庫の かぎを 盗んだ 犯人は 3人の うち 1人。<b>うそを ついているのは ちょうど 1人</b>だけ。犯人は だれ?</p><div class="cl-says">' + st.map((s, i) => '<div class="cl-say"><b>' + N[i] + '</b>' + say(s, i) + '</div>').join('') + '</div>', opts: opts, ans: c,
        exp: '犯人を 1人ずつ 仮定して、うその 数を 数える。犯人が ' + N[c] + ' の ときだけ、うそつきが 1人 (' + N[liar] + ') に なる。', digit: c + 1, tool: 'note' };
    }
    return seqQ(false);
  }
  const KINDS = { caesar: () => caesarEn(false), caesar2: () => caesarEn(true), kana: caesarKana, seq: () => seqQ(false), seq2: () => seqQ(true), morse: morseQ, liar: liarQ };

  // ---------- 道具 ----------
  function tool(t) {
    if (t === 'abc') return '<details class="cl-tool"><summary>🔤 アルファベット表</summary><div class="cl-abc">' + ABC.split('').map((c, i) => '<span><b>' + c + '</b>' + (i + 1) + '</span>').join('') + '</div></details>';
    if (t === 'kana') return '<details class="cl-tool"><summary>🔤 五十音 表</summary><div class="cl-abc kana">' + KANA.split('').map(c => '<span><b>' + c + '</b></span>').join('') + '</div></details>';
    if (t === 'morse') return '<details class="cl-tool" open><summary>📡 モールス符号 表</summary><div class="cl-abc morse">' + Object.keys(MORSE).map(c => '<span><b>' + c + '</b>' + MORSE[c] + '</span>').join('') + '</div></details>';
    if (t === 'note') return '<details class="cl-tool"><summary>📝 考え方の ヒント</summary><p class="cl-p">「犯人 = 1人目」と 仮定 → 3人の 発言が 本当か うそか 調べる → うそが ちょうど 1つなら その 仮定が 正しい。2人目・3人目も 同じように 試そう。</p></details>';
    return '';
  }

  // ---------- ホーム ----------
  const TRAIN = [['caesar', '🔤', 'シーザー暗号', 'ずらした 数が わかる'], ['caesar2', '🔐', 'シーザー暗号 (上級)', 'ずらした 数も 推理'], ['kana', 'あ', 'ひらがな ずらし暗号', '五十音を ずらす'], ['seq', '🔢', '数列の きまり', '基本の きまり'], ['seq2', '🧮', '数列 (上級)', 'フィボナッチ・素数 など'], ['morse', '📡', 'モールス信号', '・と － の 通信'], ['liar', '🤥', 'うそつきパズル', '論理で 犯人を しぼる']];
  function home() {
    const d = data();
    let h = header('🔐 暗号解読局', 'シーズン2 ・ 暗号と 論理で アジトを 開けろ');
    h += '<div class="cl-hero"><img src="' + SP + 'koradon_greet_01.webp" alt=""><div class="cl-say"><b>コラドン:</b> ブランク団の 暗号通信を キャッチした! 4つの 暗号を 解くと、金庫の 番号の ヒントが そろう。解読局の エージェントに なって 挑戦だ!</div></div>';
    h += '<button class="cl-big" data-go="cases">🕵️ 事件ファイル <small>解決 ' + Object.keys(d.cleared).length + ' / ' + CASES.length + '</small></button>';
    h += '<div class="cl-h2">🏋 トレーニング (10問)</div><div class="cl-menu">';
    TRAIN.forEach(([k, i, n, s]) => { h += '<button class="cl-mbtn" data-t="' + k + '"><span class="i">' + i + '</span><b>' + n + '</b><small>' + s + ' ・ ベスト ' + (d.best[k] || 0) + '</small></button>'; });
    h += '</div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-t]').forEach(b => b.onclick = () => { sound('click'); train(b.dataset.t); });
  }

  // ---------- 1問 表示 (共通) ----------
  function showQ(P, headerHtml, onDone) {
    let h = headerHtml + '<div class="cl-card"><div class="cl-kind">' + P.title + '</div>' + P.q + '</div>' + tool(P.tool) + '<div class="cl-opts">';
    P.opts.forEach((o, k) => { h += '<button class="cl-opt" data-k="' + k + '">' + esc(o) + '</button>'; });
    h += '</div><div id="clFb"></div>';
    area().innerHTML = h; bindGo(area());
    let done = false;
    area().querySelectorAll('.cl-opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = +b.dataset.k === P.ans;
      area().querySelectorAll('.cl-opt').forEach(x => { x.disabled = true; if (+x.dataset.k === P.ans) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sound(ok ? 'correct' : 'wrong');
      onDone(ok, $('clFb'));
    });
  }

  // ---------- トレーニング ----------
  function train(kind) {
    const T = { kind: kind, i: 0, ok: 0 };
    const name = TRAIN.find(x => x[0] === kind)[2];
    const next = () => {
      top();
      if (T.i >= 10) {
        const d = data(), nb = T.ok > (d.best[kind] || 0); d.best[kind] = Math.max(d.best[kind] || 0, T.ok); save();
        area().innerHTML = header('🏋 ' + name + ' 結果', '', 'home') + '<div class="cl-res"><b>' + T.ok + '</b> / 10' + (nb ? ' 🏆 ベスト更新!' : '') + '</div><button class="cl-go" id="clTA">🔁 もう一度</button>';
        bindGo(area()); $('clTA').onclick = () => { sound('click'); train(kind); }; return;
      }
      const P = KINDS[kind]();
      showQ(P, header('🏋 ' + name, (T.i + 1) + ' / 10 ・ 正解 ' + T.ok, 'home'), (ok, fb) => {
        if (ok) T.ok++;
        fb.innerHTML = '<div class="' + (ok ? 'cl-ok' : 'cl-ng') + '">' + (ok ? '✔ 解読 成功!' : '✗ ざんねん') + ' ' + esc(P.exp) + '</div><button class="cl-go" id="clN">次へ →</button>';
        $('clN').onclick = () => { sound('click'); T.i++; next(); };
      });
    };
    next();
  }

  // ---------- 事件 ----------
  const CASES = [
    { id: 'k1', title: '最初の 暗号文', steps: ['caesar', 'seq', 'kana', 'morse'] },
    { id: 'k2', title: 'うそつきだらけの アジト', steps: ['liar', 'seq', 'caesar', 'liar'] },
    { id: 'k3', title: '深夜の 無線', steps: ['morse', 'kana', 'seq2', 'morse'] },
    { id: 'k4', title: '鍵を にぎる 数列', steps: ['seq2', 'caesar2', 'seq2', 'liar'] },
    { id: 'k5', title: '二重の 暗号', steps: ['caesar2', 'morse', 'liar', 'seq2'] },
    { id: 'k6', title: 'ブランク団の 本部 金庫', steps: ['caesar2', 'seq2', 'liar', 'morse'] },
  ];
  let run = null;
  function cases() {
    const d = data();
    let h = header('🕵️ 事件ファイル', '暗号 4つ → 金庫の 番号', 'home') + '<div class="cl-cases">';
    CASES.forEach((c, i) => { const st = d.cleared[c.id]; h += '<button class="cl-case' + (st ? ' done' : '') + '" data-c="' + i + '"><span class="cl-cn">第' + (i + 1) + '事件</span><b>' + esc(c.title) + '</b><small>' + c.steps.map(s => TRAIN.find(x => x[0] === s)[1]).join(' → ') + ' → 🔒</small><span class="cl-st">' + (st ? '⭐'.repeat(st) + '☆'.repeat(3 - st) : '') + '</span></button>'; });
    area().innerHTML = h + '</div>'; bindGo(area());
    area().querySelectorAll('[data-c]').forEach(b => b.onclick = () => { sound('click'); run = { ci: +b.dataset.c, i: 0, miss: 0, digits: [] }; step(); });
  }
  function step() {
    const r = run, c = CASES[r.ci]; top();
    if (r.i >= c.steps.length) return safe();
    const P = KINDS[c.steps[r.i]]();
    const prog = '<div class="cl-prog">' + c.steps.map((s, k) => '<span class="' + (k < r.i ? 'ok' : k === r.i ? 'now' : '') + '">' + (k < r.i ? r.digits[k] : '?') + '</span>').join('') + '<span class="lock">🔒</span></div>';
    showQ(P, header('第' + (r.ci + 1) + '事件 ' + esc(c.title), '暗号 ' + (r.i + 1) + ' / 4 ・ まちがい ' + r.miss, 'cases') + prog, (ok, fb) => {
      if (!ok) r.miss++;
      r.digits.push(P.digit);
      fb.innerHTML = '<div class="' + (ok ? 'cl-ok' : 'cl-ng') + '">' + (ok ? '✔ 解読 成功!' : '✗ まちがえた… でも 解説で 答えが わかった') + ' ' + esc(P.exp) + '</div><div class="cl-digit">🔑 金庫の ヒント数字: <b>' + P.digit + '</b> <small>(' + digitWhy(P) + ')</small></div><button class="cl-go" id="clN">次の 暗号へ →</button>';
      $('clN').onclick = () => { sound('click'); r.i++; step(); };
    });
  }
  function digitWhy(P) { return { caesar: 'ずらした 数 (の 一の位)', kana: 'ずらした 文字数', seq: '答えの 一の位', morse: '単語の 文字数', liar: '犯人の 順番 (1〜3)' }[P.kind]; }
  // 金庫: 4つの 数字を ある 規則で 並べかえる (例: 小さい 順・逆順・そのまま・2つずつ 入れかえ)
  function safe() {
    const r = run, c = CASES[r.ci], D = r.digits;
    const R = [
      ['集めた 順', D.slice()], ['集めた 順の 逆', D.slice().reverse()], ['小さい 順', D.slice().sort((a, b) => a - b)], ['大きい 順', D.slice().sort((a, b) => b - a)], ['前半の 2つと 後半の 2つを 入れかえた 順', D.slice(2).concat(D.slice(0, 2))],
    ];
    const rule = pick(R.slice(r.ci >= 3 ? 1 : 0)), code = rule[1].join('');
    const opts = [...new Set([code].concat(R.map(x => x[1].join(''))))].slice(0, 4);
    while (opts.length < 4) { const x = String(1000 + rnd(9000)); if (!opts.includes(x)) opts.push(x); }
    const O = shuffle(opts);
    let h = header('🔒 金庫の 暗証番号', esc(c.title), 'cases');
    h += '<div class="cl-card"><div class="cl-kind">最後の 暗号</div><div class="cl-prog big">' + D.map(x => '<span class="ok">' + x + '</span>').join('') + '</div><p class="cl-p">金庫の メモ:「番号は 集めた 数字を <b>' + rule[0] + '</b>に 並べた もの」</p></div><div class="cl-opts">';
    O.forEach((o, k) => { h += '<button class="cl-opt code" data-k="' + k + '">' + o + '</button>'; });
    h += '</div><div id="clFb"></div>';
    area().innerHTML = h; bindGo(area());
    let done = false;
    area().querySelectorAll('.cl-opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = O[+b.dataset.k] === code; if (!ok) r.miss++;
      area().querySelectorAll('.cl-opt').forEach(x => { x.disabled = true; if (O[+x.dataset.k] === code) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sound(ok ? 'chime' : 'wrong');
      const st = r.miss === 0 ? 3 : r.miss <= 2 ? 2 : 1, d = data();
      if (ok) { d.cleared[c.id] = Math.max(d.cleared[c.id] || 0, st); save(); try { if (typeof triggerConfetti === 'function') triggerConfetti(); } catch (e) {} }
      $('clFb').innerHTML = ok ? '<div class="cl-ok">🔓 カチッ! 金庫が 開いた! 中から ブランク団の 計画書が 見つかった。</div><div class="cl-res">' + '⭐'.repeat(st) + '<span class="off">' + '☆'.repeat(3 - st) + '</span></div><button class="cl-go" data-go="cases">事件ファイルへ</button>'
        : '<div class="cl-ng">✗ 番号が ちがう… 正しくは ' + code + ' (' + rule[0] + ')。もう一度 事件に 挑戦しよう!</div><button class="cl-go" data-go="cases">事件ファイルへ</button>';
      bindGo(area());
    });
  }

  function leave() { try { Hub.open(); } catch (e) { showPage('pageSelect'); } }
  function open() { showPage('pageCodeLab'); top(); home(); const b = $('btnCodeBack'); if (b) b.onclick = () => { sound('click'); run = null; leave(); }; }
  return { open: open, _gen: KINDS, stats: () => ({ cleared: Object.keys(data().cleared).length }) };
})();
