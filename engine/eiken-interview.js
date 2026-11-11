/* engine/eiken-interview.js — 英検道場「面接 (二次)」
 * 本番の 進行どおりに 面接委員 (音声) が 指示し、受験者は マイクで 答える (Web Speech API の 音声認識)。
 * 音声認識が 使えない 端末では 文字入力で 答える。
 * 採点は 目安: 音読 = 本文との 一致率 / ナレーション = 各コマの 要素・開始文・過去形・長さ / 意見 = 立場・理由の 表現・長さ
 * 2級 33点 (音読5·No.1 5·No.2 10·No.3 5·No.4 5·態度3)  準1級 38点 (ナレーション15·No.1〜4 各5·態度3)
 * 保存: State.v2.eiken.interview = { cardId: bestScore }
 * 呼び出し: EikenInterview.open(api, level)  api = { area, header, bindGo, speak, stopSpeak, data, save, esc }
 */
const EikenInterview = (function () {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const IMG = 'assets/img/eiken/int/';
  const NAME = 'Haru';
  let api = null, level = 'g2', st = null, timers = [];
  const $ = id => document.getElementById(id);
  const esc = s => api.esc(s);
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function rec() { const e = api.data(); e.interview = e.interview || {}; return e.interview; }
  function art(src, fb, cls) { return '<span class="art-w ' + (cls || '') + '"><img class="art-main" src="' + src + '" alt="" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"><span class="art-fb">' + (fb || '') + '</span></span>'; }
  function later(fn, ms) { const t = setTimeout(fn, ms); timers.push(t); return t; }
  function clearTimers() { timers.forEach(t => { clearTimeout(t); clearInterval(t); }); timers = []; }

  // ================= 音声認識 =================
  let R = null, recOn = false, finalTxt = '', interim = '', onUpd = null;
  function recStart(cb) {
    if (!SR) return false;
    recAbort(); finalTxt = ''; interim = ''; recOn = true; onUpd = cb; mk(); return true;
  }
  function mk() {
    try {
      R = new SR(); R.lang = 'en-US'; R.continuous = true; R.interimResults = true;
      R.onresult = e => {
        interim = '';
        for (let i = e.resultIndex; i < e.results.length; i++) { const r = e.results[i]; if (r.isFinal) finalTxt += r[0].transcript + ' '; else interim += r[0].transcript; }
        if (onUpd) onUpd((finalTxt + interim).trim());
      };
      R.onerror = e => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { recOn = false; if (onUpd) onUpd(finalTxt.trim(), 'denied'); } };
      R.onend = () => { if (recOn) mk(); };   // 無音で 切れても 録音中なら つなぎ直す
      R.start();
    } catch (e) {}
  }
  function recStop(cb) {
    recOn = false;
    const done = () => { const t = (finalTxt + interim).trim(); interim = ''; R = null; cb(t); };
    if (!R) return done();
    let fired = false; const fin = () => { if (!fired) { fired = true; done(); } };
    R.onend = fin; try { R.stop(); } catch (e) { fin(); }
    later(fin, 1200);
  }
  function recAbort() { recOn = false; if (R) { try { R.onend = null; R.abort(); } catch (e) {} R = null; } }

  // ================= 採点 =================
  const words = s => (String(s || '').toLowerCase().replace(/[’']/g, '\'').match(/[a-z0-9']+/g) || []);
  function lcs(a, b) {
    const m = a.length, n = b.length, d = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
    for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = a[i - 1] === b[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]);
    const hit = new Array(m).fill(false); let i = m, j = n;
    while (i && j) { if (a[i - 1] === b[j - 1]) { hit[i - 1] = true; i--; j--; } else if (d[i - 1][j] >= d[i][j - 1]) i--; else j--; }
    return hit;
  }
  function hasKey(text, key) {
    const t = ' ' + words(text).join(' ') + ' ', ws = words(text);
    return key.split('|').some(alt => alt.includes(' ') ? t.includes(' ' + alt + ' ') : ws.some(w => alt.length >= 4 ? w.startsWith(alt) : (w === alt || w === alt + 's' || w === alt + 'es')));
  }
  const REASON = /\b(because|since|so|also|in addition|moreover|for example|for instance|this is because|that's why|first|second|besides|however|therefore)\b/gi;
  const STANCE = /^(yes|no|yeah|i (do|don't|do not)|i (agree|disagree)|i think|i don't think|i believe|in my opinion|personally)/i;
  function scoreRead(passage, said) {
    const p = words(passage), s = words(said); if (!s.length) return { pts: 0, ratio: 0, hit: p.map(() => false) };
    const hit = lcs(p, s), ratio = hit.filter(Boolean).length / p.length;
    return { pts: ratio >= 0.93 ? 5 : ratio >= 0.85 ? 4 : ratio >= 0.72 ? 3 : ratio >= 0.5 ? 2 : 1, ratio: ratio, hit: hit };
  }
  function scoreKeys(said, keys, max) {
    const n = words(said).length; if (!n) return { pts: 0, got: [] };
    const got = keys.map(k => hasKey(said, k)), cov = got.filter(Boolean).length / keys.length;
    return { pts: Math.max(1, Math.round(cov * max)), got: got };
  }
  function scoreStory(said, start, panels, max) {
    const ws = words(said), n = ws.length, tips = [];
    if (!n) return { pts: 0, tips: ['答えが 記録されて いません。'], per: panels.map(() => 0) };
    const per = panels.map(p => p.keys.filter(k => hasKey(said, k)).length / p.keys.length);
    const sw = words(start), head = ws.slice(0, sw.length + 6), sHit = lcs(sw, head).filter(Boolean).length / sw.length;
    const past = ws.filter(w => /^(was|were|had|did|said|went|saw|thought|told|came|took|got|made|gave|felt|found|looked|started)$/.test(w) || (w.length > 4 && /ed$/.test(w))).length;
    const minLen = panels.length === 4 ? 90 : 45;
    let pts;
    if (panels.length === 4) {   // 準1級 15点: 各コマ 3点 + 開始文 1 + 長さ 2
      pts = per.reduce((a, c) => a + Math.round(c * 3), 0) + (sHit >= 0.7 ? 1 : 0) + (n >= minLen ? 2 : n >= 65 ? 1 : 0);
    } else {                      // 2級 10点: 各コマ 3点 + 開始文 1
      pts = per.reduce((a, c) => a + Math.round(c * 3), 0) + (sHit >= 0.7 ? 1 : 0);
    }
    if (past < 3) { pts = Math.max(1, pts - 1); tips.push('過去形 (was ~ing / said / went…) で 話そう。'); }
    if (sHit < 0.7) tips.push('カードの 開始文「' + start + '」から 始めよう。');
    per.forEach((c, i) => { if (c < 0.5) tips.push((i + 1) + 'コマ目の 様子を もっと 説明しよう。'); });
    if (n < minLen) tips.push('もう少し くわしく (目安 ' + minLen + '語 以上 ・ 今回 ' + n + '語)。');
    return { pts: Math.min(max, Math.max(1, pts)), tips: tips, per: per, n: n };
  }
  function scoreOpinion(said, kind) {
    const full = level === 'g2' ? 20 : 25, half = level === 'g2' ? 12 : 15;
    const s = String(said || '').trim(), n = words(s).length, tips = [];
    if (!n) return { pts: 0, tips: ['答えが 記録されて いません。'] };
    const sentences = s.split(/[.!?]+/).filter(x => words(x).length >= 3).length;
    const reasons = (s.match(REASON) || []).length + Math.max(0, sentences - 1);   // 理由の 表現 + 支える 文の 数
    let pts = 0;
    if (kind === 'think') {        // 準1級 No.1: 4コマ目の 人物の 気持ち
      if (/\b(i'd|i would|i'm|i am|i should|i'll|i will|i think|i wish|i hope)\b/i.test(s)) pts++; else tips.push('「I\'d be thinking, “…”」の 形で、その人に なりきって 話そう。');
      pts += n >= 25 ? 3 : n >= 15 ? 2 : 1;
      if (reasons || /\b(should|maybe|next time|will|need to)\b/i.test(s)) pts++; else tips.push('次に どうするかも 付け加えよう。');
    } else {
      if (STANCE.test(s)) pts++; else tips.push('最初に 立場 (Yes / No / I agree / I think…) を はっきり。');
      pts += reasons >= 2 ? 2 : reasons ? 1 : 0; if (!reasons) tips.push('because / also / for example で 理由を 2つ。');
      pts += n >= full ? 2 : n >= half ? 1 : 0; if (n < full) tips.push('2〜3文 (' + full + '語 以上) で 答えよう。今回 ' + n + '語。');
    }
    return { pts: Math.min(5, Math.max(1, pts)), tips: tips, n: n };
  }

  // ================= 画面 =================
  function cards() { return EIKEN_INTERVIEW[level] || []; }
  function list() {
    stop();
    const R0 = rec(), C = cards();
    let h = api.header('面接 (二次試験)', level === 'g2' ? '2級 ・ 音読 + 4問 ・ 33点' : '準1級 ・ ナレーション + 4問 ・ 38点');
    h += '<div class="ek-box iv-howto"><b>🎤 本番と 同じ 流れで 練習</b><ul>' + (level === 'g2'
      ? '<li>パッセージを 20秒 黙読 → 音読</li><li>No.1 パッセージの 質問 / No.2 3コマの 説明 (準備20秒)</li><li>カードを 裏返して No.3・No.4 (自分の 意見)</li>'
      : '<li>自由会話 → 4コマの ナレーション (準備1分・話す 2分)</li><li>No.1 4コマ目の 人物の 気持ち</li><li>カードを 裏返して No.2〜No.4 (自分の 意見・No.4 は 話題導入文つき)</li>') +
      '</ul><p class="ek-small">' + (SR ? 'マイクを 使います (初回は ブラウザが 許可を 聞きます)。静かな 場所で 話そう。' : '⚠ この ブラウザは 音声認識に 対応していないため、答えを 文字で 入力します (Chrome 推奨)。') + '</p><p class="ek-small">採点は 目安です。本番は 発音・文法・態度も 評価されます。</p></div>';
    h += '<div class="iv-list">';
    C.forEach((c, i) => {
      const best = R0[c.id];
      h += '<button class="iv-li" data-c="' + i + '">' + art(IMG + c.id + '_1.webp', '<span class="iv-li-i">🗂</span>', 'iv-li-art') + '<span><b>Card ' + (i + 1) + (c.title ? ' — ' + esc(c.title) : '') + '</b><small>' + esc(c.start) + '</small><span class="iv-best">' + (best != null ? '最高 ' + best + ' / ' + (level === 'g2' ? 33 : 38) + '点' : '未挑戦') + '</span></span></button>';
    });
    h += '</div>';
    api.area().innerHTML = h; api.bindGo(api.area());
    api.area().querySelectorAll('[data-c]').forEach(b => b.onclick = () => { sfx('click'); begin(C[+b.dataset.c]); });
  }

  // カード (本番の 問題カード)
  function cardHTML(c, opt) {
    let h = '<div class="iv-card">';
    if (level === 'g2' && opt.passage) h += '<div class="iv-ttl">' + esc(c.title) + '</div><p class="iv-pass">' + esc(c.passage) + '</p>';
    if (opt.pics) {
      h += '<div class="iv-ins">' + (level === 'g2' ? 'Your story should begin with this sentence:' : 'You have one minute to prepare. This is a story about a ' + (/woman|girl|couple/.test(c.start) ? 'woman' : 'man') + '. You have two minutes to narrate the story. Your story should begin with the following sentence:') + '<br><b>' + esc(c.start) + '</b></div>';
      h += '<div class="iv-panels n' + c.panels.length + '">';
      c.panels.forEach((p, i) => {
        h += '<div class="iv-panel">' + (p.t ? '<div class="iv-t">' + esc(p.t) + '</div>' : '') +
          art(IMG + c.id + '_' + (i + 1) + '.webp', '<div class="iv-desc">' + esc(p.ja) + '</div>', 'iv-pic') +
          (p.say ? '<div class="iv-say">“' + esc(p.say) + '”</div>' : '') + '</div>';
      });
      h += '</div>';
    }
    return h + '</div>';
  }
  function exBubble(text, show) {
    return '<div class="iv-ex"><span class="iv-ex-i">🧑‍🏫</span><div><b>面接委員</b><div class="iv-ex-t' + (show ? '' : ' hid') + '" id="ivExT">' + esc(text) + '</div>' + (show ? '' : '<button class="iv-mini" id="ivShowQ">質問の 文を 見る</button>') + ' <button class="iv-mini" id="ivAgain">🔊 もう一度</button></div></div>';
  }
  function head(step) {
    const steps = level === 'g2' ? ['音読', 'No.1', 'No.2', 'No.3', 'No.4'] : ['会話', 'ナレ', 'No.1', 'No.2', 'No.3', 'No.4'];
    return '<div class="ek-head"><button class="ek-back" id="ivQuit">← 面接 一覧</button><div><div class="ek-title">面接 ' + (level === 'g2' ? '2級' : '準1級') + ' — Card ' + (cards().indexOf(st.c) + 1) + '</div><div class="iv-steps">' + steps.map((s, i) => '<span class="' + (i < step ? 'done' : i === step ? 'now' : '') + '">' + s + '</span>').join('') + '</div></div></div>';
  }
  function bindCommon(sayText) {
    const q = $('ivQuit'); if (q) q.onclick = () => { sfx('click'); list(); };
    const a = $('ivAgain'); if (a) a.onclick = () => { api.stopSpeak(); api.speak(sayText, 'W', null, 0.9); };
    const s = $('ivShowQ'); if (s) s.onclick = () => { $('ivExT').classList.remove('hid'); s.remove(); st.peek = (st.peek || 0) + 1; };
  }
  function screen(stepIdx, examiner, body, showText) {
    let h = head(stepIdx) + exBubble(examiner, showText) + body;
    api.area().innerHTML = h; bindCommon(examiner);
    const p = document.getElementById('pageEiken'); if (p) p.scrollTop = 0;
  }
  // 録音ボックス: 話す → 終わる → 次へ
  function answerBox(key, opt) {
    return '<div class="ek-box iv-ans">' + (opt.timer ? '<div class="iv-timer" id="ivTimer"></div>' : '') +
      '<div class="iv-tr" id="ivTr"><span class="ek-small">' + (SR ? '🎤 ボタンを おして 英語で 答えよう' : '⌨ 下の 欄に 答えを 入力しよう') + '</span></div>' +
      (SR ? '<button class="iv-rec" id="ivRec">🎤 話す</button>' : '') +
      '<details class="iv-type"' + (SR ? '' : ' open') + '><summary>⌨ 文字で 入力する</summary><textarea id="ivTxt" rows="3" placeholder="Type your answer here."></textarea></details>' +
      '<button class="ek-primary" id="ivNext" disabled>次へ →</button></div>';
  }
  function bindAnswer(key, opt, next) {
    let recording = false, t0 = 0, iv = 0;
    const btn = $('ivRec'), tr = $('ivTr'), txt = $('ivTxt'), nx = $('ivNext');
    const finish = text => {
      recording = false; clearInterval(iv);
      st.ans[key] = text; st.sec[key] = t0 ? Math.round((Date.now() - t0) / 1000) : 0;
      tr.innerHTML = text ? '<span class="iv-said">' + esc(text) + '</span>' : '<span class="ek-small">(声が 聞き取れませんでした。もう一度 話すか、文字で 入力しよう)</span>';
      if (btn) { btn.textContent = '🎤 話し直す'; btn.classList.remove('on'); }
      nx.disabled = !text;
    };
    const tick = () => {
      const s = Math.floor((Date.now() - t0) / 1000), el = $('ivTimer');
      if (el) el.textContent = opt.limit ? '⏱ 残り ' + Math.max(0, opt.limit - s) + '秒' : '⏱ ' + s + '秒' + (opt.soft && s > opt.soft ? ' (そろそろ まとめよう)' : '');
      if (opt.limit && s >= opt.limit && recording) { api.speak('Thank you. Time\'s up.', 'W'); recStop(finish); }
    };
    if (btn) btn.onclick = () => {
      if (!recording) {
        api.stopSpeak(); sfx('click');
        recording = true; t0 = Date.now(); btn.textContent = '■ 話し終わった'; btn.classList.add('on'); nx.disabled = true;
        tr.innerHTML = '<span class="ek-small">● 聞いています…</span>';
        const ok = recStart((t, err) => { if (err === 'denied') { recAbort(); recording = false; tr.innerHTML = '<span class="ek-small">マイクが 許可されていません。文字で 入力してください。</span>'; document.querySelector('.iv-type').open = true; btn.remove(); return; } tr.innerHTML = '<span class="iv-said live">' + esc(t) + '</span>'; });
        if (!ok) { recording = false; return; }
        clearInterval(iv); iv = setInterval(tick, 500); timers.push(iv); tick();
      } else { sfx('click'); recStop(finish); }
    };
    if (txt) txt.oninput = () => { if (!recording) { st.ans[key] = txt.value.trim(); nx.disabled = !txt.value.trim(); } };
    if (opt.timer && !opt.limit) { const el = $('ivTimer'); if (el) el.textContent = opt.soft ? '目安 ' + opt.soft + '秒' : ''; }
    if (opt.timer && opt.limit) { const el = $('ivTimer'); if (el) el.textContent = '⏱ ' + opt.limit + '秒 以内'; }
    nx.onclick = () => { if (recording) return; if (txt && txt.value.trim() && !st.ans[key]) st.ans[key] = txt.value.trim(); sfx('click'); api.stopSpeak(); next(); };
  }
  // 指示を 読んでから 準備時間。読み上げ中でも「先へ」で すぐ 進める
  function prepThen(t, sec, label, next) {
    let gone = false; const go = () => { if (gone) return; gone = true; api.stopSpeak(); clearTimers(); next(); };
    const sk = $('ivSkip'); if (sk) sk.onclick = () => { sfx('click'); go(); };
    api.speak(t, 'W', () => { if (!gone) countdown(sec, label, go); });
  }
  function countdown(sec, label, done) {
    let left = sec; const el = $('ivCount');
    const upd = () => { if (el) el.innerHTML = label + ' <b>' + left + '</b>秒'; };
    upd();
    const iv = setInterval(() => { left--; upd(); if (left <= 0) { clearInterval(iv); done(); } }, 1000); timers.push(iv);
    const sk = $('ivSkip'); if (sk) sk.onclick = () => { clearInterval(iv); sfx('click'); done(); };
  }

  // ================= 進行 =================
  function begin(c) {
    stop();
    st = { c: c, ans: {}, sec: {}, peek: 0, free: shuffle(EIKEN_INTERVIEW.free)[0] };
    const t = 'Hello. My name is Ms. Green. May I have your name, please? ... Thank you, ' + NAME + '. Please have a seat.';
    screen(0, t, '<div class="ek-box ek-center"><p>面接室に 入ったよ。あいさつを してから 始めよう。<br><span class="ek-small">本番では 入室・あいさつ・態度も 評価されます (アティチュード 3点)。</span></p><button class="ek-primary" id="ivGo">はじめる</button></div>', true);
    api.speak(t, 'W');
    $('ivGo').onclick = () => { sfx('click'); api.stopSpeak(); level === 'g2' ? g2Silent() : p1Free(); };
  }
  // ---- 2級 ----
  function g2Silent() {
    const t = 'Let\'s start the test. Here is your card. First, please read the passage silently for 20 seconds.';
    screen(0, t, cardHTML(st.c, { passage: true, pics: true }) + '<div class="ek-box ek-center iv-count" id="ivCount"></div><button class="ek-secondary" id="ivSkip">読めた (先へ)</button>', true);
    prepThen(t, 20, '📖 黙読', g2Read);
  }
  function g2Read() {
    const t = 'All right. Now, please read it aloud.';
    screen(0, t, answerBox('read', { timer: true, soft: 40 }) + cardHTML(st.c, { passage: true }), true);
    bindAnswer('read', { timer: true, soft: 40 }, g2Q1); api.speak(t, 'W');
  }
  function g2Q1() {
    const t = 'Now, I\'ll ask you four questions. No. 1. ' + st.c.q1.q;
    screen(1, t, answerBox('q1', { timer: true, soft: 20 }) + cardHTML(st.c, { passage: true, pics: true }), false);
    bindAnswer('q1', { timer: true, soft: 20 }, g2Prep); api.speak(t, 'W');
  }
  function g2Prep() {
    const t = 'No. 2. Now, please look at the pictures and describe the situation. You have 20 seconds to prepare. Your story should begin with the sentence on the card.';
    screen(2, t, cardHTML(st.c, { pics: true }) + '<div class="ek-box ek-center iv-count" id="ivCount"></div><button class="ek-secondary" id="ivSkip">準備できた (先へ)</button>', true);
    prepThen(t, 20, '📝 準備', g2Q2);
  }
  function g2Q2() {
    const t = 'All right. Please begin.';
    screen(2, t, answerBox('q2', { timer: true, soft: 60 }) + cardHTML(st.c, { pics: true }), true);
    bindAnswer('q2', { timer: true, soft: 60 }, g2Q3); api.speak(t, 'W');
  }
  function turnText() { return 'Now, ' + NAME + ', please turn over the card and put it down. '; }
  function g2Q3() {
    const t = turnText() + 'No. 3. ' + st.c.q3.q;
    screen(3, t, '<div class="iv-down">🂠 カードは 裏返して 置いた</div>' + answerBox('q3', { timer: true, soft: 30 }), false);
    bindAnswer('q3', { timer: true, soft: 30 }, g2Q4); api.speak(t, 'W');
  }
  function g2Q4() {
    const t = 'No. 4. ' + st.c.q4.q;
    screen(4, t, '<div class="iv-down">🂠</div>' + answerBox('q4a', { timer: true, soft: 10 }), false);
    bindAnswer('q4a', { timer: true, soft: 10 }, () => {
      const a = String(st.ans.q4a || '').trim().toLowerCase();
      const yes = /^(yes|yeah|yep|sure|of course|i think so|i do\b)/.test(a), no = /^(no|nope|i don't|i do not|not really)/.test(a);
      if (yes || no) return g2Why(yes ? 'yes' : 'no');
      screen(4, 'Please answer Yes or No.', '<div class="ek-box ek-center"><p>Yes か No で 答えよう。</p><div class="iv-yn"><button class="ek-secondary" data-yn="yes">Yes</button><button class="ek-secondary" data-yn="no">No</button></div></div>', true);
      api.speak('Please answer Yes or No.', 'W');
      api.area().querySelectorAll('[data-yn]').forEach(b => b.onclick = () => { st.ans.q4a = (st.ans.q4a ? st.ans.q4a + ' ' : '') + (b.dataset.yn === 'yes' ? 'Yes.' : 'No.'); g2Why(b.dataset.yn); });
    });
  }
  function g2Why(yn) {
    st.yn = yn; const t = yn === 'yes' ? 'Why?' : 'Why not?';
    screen(4, t, '<div class="iv-down">🂠</div>' + answerBox('q4b', { timer: true, soft: 30 }), true);
    bindAnswer('q4b', { timer: true, soft: 30 }, result); api.speak(t, 'W');
  }
  // ---- 準1級 ----
  function p1Free() {
    const t = st.free;
    screen(0, t, '<div class="ek-box ek-center"><p class="ek-small">自由会話 (採点 対象外。でも 明るく はっきり 答えると 態度点に つながる)</p></div>' + answerBox('free', { timer: true, soft: 20 }), false);
    bindAnswer('free', { timer: true, soft: 20 }, p1Prep); api.speak(t, 'W');
  }
  function p1Prep() {
    const t = 'Now, let\'s start the test. Here is your card. You have one minute to prepare before you start your narration.';
    screen(1, t, cardHTML(st.c, { pics: true }) + '<div class="ek-box ek-center iv-count" id="ivCount"></div><button class="ek-secondary" id="ivSkip">準備できた (先へ)</button>', true);
    prepThen(t, 60, '📝 準備', p1Narr);
  }
  function p1Narr() {
    const t = 'All right. Please begin your narration. You have two minutes.';
    screen(1, t, answerBox('narr', { timer: true, limit: 120 }) + cardHTML(st.c, { pics: true }), true);
    bindAnswer('narr', { timer: true, limit: 120 }, p1Q1); api.speak(t, 'W');
  }
  function p1Q1() {
    const t = 'Now, I\'ll ask you four questions. No. 1. ' + st.c.q1.q;
    screen(2, t, answerBox('q1', { timer: true, soft: 30 }) + cardHTML(st.c, { pics: true }), false);
    bindAnswer('q1', { timer: true, soft: 30 }, () => p1Q('q2', 3, turnText() + 'No. 2. ' + st.c.q2.q, () => p1Q('q3', 4, 'No. 3. ' + st.c.q3.q, () => p1Q('q4', 5, 'No. 4. ' + st.c.q4.intro + ' ' + st.c.q4.q, result))));
    api.speak(t, 'W');
  }
  function p1Q(key, step, t, next) {
    screen(step, t, '<div class="iv-down">🂠 カードは 裏返して 置いた</div>' + answerBox(key, { timer: true, soft: 35 }), false);
    bindAnswer(key, { timer: true, soft: 35 }, next); api.speak(t, 'W');
  }

  // ================= 結果 =================
  function result() {
    clearTimers(); recAbort();
    const c = st.c, A = st.ans, items = [];
    if (level === 'g2') {
      const r = scoreRead(c.passage, A.read);
      items.push({ name: '音読', max: 5, pts: r.pts, said: A.read, extra: '<div class="iv-hl">' + words(c.passage).map((w, i) => '<span class="' + (r.hit[i] ? '' : 'miss') + '">' + esc(w) + '</span>').join(' ') + '</div><p class="ek-small">一致率 ' + Math.round(r.ratio * 100) + '%' + (st.sec.read ? ' ・ ' + st.sec.read + '秒' : '') + ' (赤 = 読めなかった・聞き取れなかった 語)。意味の まとまりで 区切り、名詞・動詞を はっきり。</p>', model: c.passage, q: c.title });
      const k = scoreKeys(A.q1, c.q1.keys, 5);
      items.push({ name: 'No.1 パッセージの 質問', max: 5, pts: k.pts, said: A.q1, q: c.q1.q, model: c.q1.model, tips: (k.got.every(Boolean) ? [] : ['本文の 該当部分 (by doing so / in this way の 前) を 使おう。']).concat(/^(by|because|they|it|some)/i.test(String(A.q1 || '').trim()) ? [] : ['How? には「By ~ing.」、Why? には「Because ~.」で 答えると わかりやすい。']) });
      const s = scoreStory(A.q2, c.start, c.panels, 10);
      items.push({ name: 'No.2 3コマの 説明', max: 10, pts: s.pts, said: A.q2, q: '3コマの イラストの 説明', model: c.model2, tips: s.tips });
      const o3 = scoreOpinion(A.q3);
      items.push({ name: 'No.3 意見', max: 5, pts: o3.pts, said: A.q3, q: c.q3.q, model: c.q3.model, tips: o3.tips });
      const o4 = scoreOpinion((st.yn === 'yes' ? 'Yes. ' : st.yn === 'no' ? 'No. ' : '') + (A.q4b || ''));
      items.push({ name: 'No.4 意見', max: 5, pts: o4.pts, said: (A.q4a || '') + ' → ' + (A.q4b || ''), q: c.q4.q, model: st.yn === 'no' ? c.q4.no : c.q4.yes, model2: st.yn === 'no' ? c.q4.yes : c.q4.no, tips: o4.tips });
    } else {
      const s = scoreStory(A.narr, c.start, c.panels, 15);
      items.push({ name: 'ナレーション', max: 15, pts: s.pts, said: A.narr, q: '4コマの ナレーション (2分)', model: c.model, tips: s.tips });
      const o1 = scoreOpinion(A.q1, 'think');
      items.push({ name: 'No.1 4コマ目の 気持ち', max: 5, pts: o1.pts, said: A.q1, q: c.q1.q, model: c.q1.model, tips: o1.tips });
      ['q2', 'q3', 'q4'].forEach((k, i) => { const o = scoreOpinion(A[k]); items.push({ name: 'No.' + (i + 2) + ' 意見', max: 5, pts: o.pts, said: A[k], q: (k === 'q4' ? c.q4.intro + ' ' : '') + c[k].q, model: c[k].model, tips: o.tips }); });
    }
    const answered = items.filter(i => i.pts > 0).length;
    const att = answered === items.length ? 3 : answered >= items.length - 1 ? 2 : 1;
    const total = items.reduce((a, i) => a + i.pts, 0) + att, max = level === 'g2' ? 33 : 38, pass = level === 'g2' ? 20 : 22;
    const R0 = rec(); R0[c.id] = Math.max(R0[c.id] || 0, total); api.save();
    let h = '<div class="ek-head"><button class="ek-back" id="ivQuit">← 面接 一覧</button><div><div class="ek-title">面接の 結果 — Card ' + (cards().indexOf(c) + 1) + '</div></div></div>';
    h += '<div class="ek-box ek-center"><div class="ek-big">' + (total >= pass ? '🎉' : '💪') + '</div><p>目安スコア <b class="iv-total">' + total + '</b> / ' + max + '点</p><p class="ek-small">合格の 目安は 6割前後 (約' + pass + '点)。' + (st.peek ? ' 質問文を 見た 回数: ' + st.peek + '回 (本番では 見られません)' : '') + '</p>';
    h += '<table class="iv-tbl">' + items.map(i => '<tr><td>' + i.name + '</td><td><b>' + i.pts + '</b> / ' + i.max + '</td></tr>').join('') + '<tr><td>アティチュード (態度)</td><td><b>' + att + '</b> / 3</td></tr></table></div>';
    items.forEach((it, k) => {
      h += '<div class="ek-box iv-res"><div class="iv-res-h">' + it.name + ' <span>' + it.pts + ' / ' + it.max + '</span></div>' +
        (it.q ? '<p class="iv-q">Q: ' + esc(it.q) + '</p>' : '') +
        '<div class="iv-lab">あなたの 答え</div><p class="iv-said">' + (it.said ? esc(it.said) : '(答えなし)') + '</p>' + (it.extra || '') +
        (it.tips && it.tips.length ? '<ul class="iv-tips">' + it.tips.map(t => '<li>' + esc(t) + '</li>').join('') + '</ul>' : (it.pts === it.max ? '<p class="iv-good">👍 よく できました!</p>' : '')) +
        '<div class="iv-lab">模範解答 <button class="iv-mini" data-m="' + k + '">🔊 聞く</button></div><p class="iv-model">' + esc(it.model) + '</p>' +
        (it.model2 ? '<details><summary class="ek-small">反対の 立場の 解答例</summary><p class="iv-model">' + esc(it.model2) + '</p></details>' : '') + '</div>';
    });
    h += '<div class="ek-box"><b>✅ 自分で ふりかえろう (態度)</b><ul class="iv-tips"><li>入室・退室の あいさつ (Hello / Thank you) を した?</li><li>面接委員の 目を 見て、聞こえる 声で 話した?</li><li>聞き取れない ときは「Could you say that again, please?」と 聞き返せた?</li><li>だまりこまず、何か 答えようと した?</li></ul></div>';
    h += '<button class="ek-primary" id="ivRetry">同じ カードで もう一度</button><button class="ek-secondary" id="ivList">ほかの カードへ</button>';
    api.area().innerHTML = h;
    $('ivQuit').onclick = () => { sfx('click'); list(); };
    $('ivList').onclick = () => { sfx('click'); list(); };
    $('ivRetry').onclick = () => { sfx('click'); begin(c); };
    api.area().querySelectorAll('[data-m]').forEach(b => b.onclick = () => { api.stopSpeak(); api.speak(items[+b.dataset.m].model, 'N', null, 0.9); });
    api.speak('That\'s all. Thank you. You may go now.', 'W');
    const p = document.getElementById('pageEiken'); if (p) p.scrollTop = 0;
  }

  function stop() { clearTimers(); recAbort(); if (api) api.stopSpeak(); }
  function open(a, lv) { api = a; level = lv; list(); }
  document.addEventListener('visibilitychange', () => { if (document.hidden) recAbort(); });
  // 音声 生成用 (面接委員 = W, 模範解答 = N)
  function speechTexts() {
    const o = [], W = t => o.push(['W', t]), N = t => o.push(['N', t]);
    W('Hello. My name is Ms. Green. May I have your name, please? ... Thank you, ' + NAME + '. Please have a seat.');
    W('Let\'s start the test. Here is your card. First, please read the passage silently for 20 seconds.'); W('All right. Now, please read it aloud.');
    W('No. 2. Now, please look at the pictures and describe the situation. You have 20 seconds to prepare. Your story should begin with the sentence on the card.');
    W('All right. Please begin.'); W('Please answer Yes or No.'); W('Why?'); W('Why not?'); W('That\'s all. Thank you. You may go now.'); W('Thank you. Time\'s up.');
    W('Now, let\'s start the test. Here is your card. You have one minute to prepare before you start your narration.'); W('All right. Please begin your narration. You have two minutes.');
    EIKEN_INTERVIEW.free.forEach(W);
    EIKEN_INTERVIEW.g2.forEach(c => { W('Now, I\'ll ask you four questions. No. 1. ' + c.q1.q); W(turnText() + 'No. 3. ' + c.q3.q); W('No. 4. ' + c.q4.q); N(c.passage); N(c.q1.model); N(c.model2); N(c.q3.model); N(c.q4.yes); N(c.q4.no); });
    EIKEN_INTERVIEW.p1.forEach(c => { W('Now, I\'ll ask you four questions. No. 1. ' + c.q1.q); W(turnText() + 'No. 2. ' + c.q2.q); W('No. 3. ' + c.q3.q); W('No. 4. ' + c.q4.intro + ' ' + c.q4.q); N(c.model); N(c.q1.model); N(c.q2.model); N(c.q3.model); N(c.q4.model); });
    return o;
  }
  return { open: open, stop: stop, _speechTexts: speechTexts, _score: { read: scoreRead, story: scoreStory, opinion: scoreOpinion, keys: scoreKeys }, _st: () => st };
})();
