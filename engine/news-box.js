/* engine/news-box.js — 英語ニュースBOX (はるの英語ニュースボックス サイトとの 連動)
 *
 * サイト: https://ocw-1027.github.io/haru-newsstudy/ (リポジトリ OCW-1027/haru-newsstudy)
 * ゲームと サイトは 同じ オリジン (ocw-1027.github.io) なので localStorage を 共有できる。
 *   'haru-news-words' : [{ en, ja, t?, src? }]        サイトの「単語メモ」(新しい 順)
 *   'haru-news-log'   : { 'YYYY-MM-DD': { open: [サイト名…], read: 1 } }  サイトで 開いた / 読んだ 記録
 * ゲーム側の 保存: State.v2.news = { tok: {日付:1} (読書スタンプの トークン 受け取り済み), w: { en: [正解, 不正解, 最後 1/0] } }
 *
 * 画面: pageNewsBox (#nbArea)
 *   ① サイトを 開く ② 今週の 読書スタンプ (読んだ 日は ゲームトークン +1 / 1日1回) ③ メモした 単語の 一覧・発音 ④ 単語クイズ (4択)
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, Hub, VoicePack (任意), G2_VERBS など (data/vocab.js, ダミー選択肢用)
 */
const NewsBox = (function () {
  const SITE = 'https://ocw-1027.github.io/haru-newsstudy/';
  const KW = 'haru-news-words', KL = 'haru-news-log';
  const $ = id => document.getElementById(id), esc = s => escapeHtml(String(s));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const ymd = d => { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  let run = null;

  function readJSON(k, def) { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? def : v; } catch (e) { return def; } }
  function words() { const w = readJSON(KW, []); return Array.isArray(w) ? w.filter(x => x && x.en && x.ja) : []; }
  function nlog() { const l = readJSON(KL, {}); return l && typeof l === 'object' ? l : {}; }
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.news || (State.v2.news = {}); d.tok = d.tok || {}; d.w = d.w || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  const didRead = (L, k) => !!(L[k] && (L[k].read || (L[k].open && L[k].open.length)));
  const learned = w => { const r = data().w[w.en.toLowerCase()]; return !!r && r[2] === 1; };

  function stats() {
    const W = words(), L = nlog(); let streak = 0;
    for (let i = 0; i < 400; i++) { const k = ymd(new Date(Date.now() - i * 864e5)); if (didRead(L, k)) streak++; else if (i > 0) break; }
    return { words: W.length, learned: W.filter(learned).length, streak: streak, today: didRead(L, ymd()) };
  }

  function sayEn(t) {
    const tts = () => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = 0.85; speechSynthesis.speak(u); } catch (e) {} };
    try { speechSynthesis.cancel(); } catch (e) {}
    if (typeof VoicePack !== 'undefined' && VoicePack.play(t, 'N', 1, null, tts)) return; tts();
  }

  function menu() {
    run = null;
    const W = words(), L = nlog(), D = data(), st = stats(), td = ymd();
    let h = '<div class="nb-head"><h1>📰 英語ニュースBOX</h1><p>アメリカ・イギリス・オーストラリアの 子ども向け 英語ニュースを 読もう。サイトで メモした 単語は ここで クイズに なるよ。</p></div>';
    h += '<a class="nb-open no-furi" href="' + SITE + '" target="_blank" rel="noopener" id="nbOpen"><span class="nb-oi">📮</span><span><b>はるの英語ニュースボックスを 開く</b><small>News for Kids · BTN · BBC Newsround ほか 15サイト</small></span><span class="nb-arrow">↗</span></a>';

    // 読書スタンプ (今週)
    h += '<section class="nb-box"><h2>📅 今週の 読書スタンプ <small>連続 ' + st.streak + '日</small></h2><div class="nb-week">';
    const now = new Date(), dow = (now.getDay() + 6) % 7;   // 月曜 はじまり
    ['月', '火', '水', '木', '金', '土', '日'].forEach((n, i) => {
      const d = new Date(now.getTime() + (i - dow) * 864e5), k = ymd(d), ok = didRead(L, k), fut = i > dow;
      h += '<div class="nb-day' + (ok ? ' ok' : '') + (k === td ? ' td' : '') + (fut ? ' fut' : '') + '"><span>' + n + '</span><b>' + (ok ? '📰' : (fut ? '' : '・')) + '</b></div>';
    });
    h += '</div>';
    if (st.today && !D.tok[td]) h += '<button class="nb-claim" id="nbClaim">🎮 今日 読んだ ごほうび: ゲームトークン +1 を 受け取る</button>';
    else if (st.today) h += '<p class="nb-ok">✅ 今日の ごほうびは 受け取り済み。明日も 読もう!</p>';
    else h += '<p class="nb-tip">サイトで ニュースを 開くか「今日 読んだ!」を おすと スタンプが つくよ。読んだ 日は ゲームトークン +1。</p>';
    h += '</section>';

    // 単語
    h += '<section class="nb-box"><h2>📝 ニュースで 集めた 単語 <small>' + W.length + '語 · 覚えた ' + st.learned + '</small></h2>';
    if (!W.length) {
      h += '<p class="nb-tip">まだ 単語が ありません。サイトの「今日の単語メモ」に、読んだ ニュースの 知らない 単語を 書いてみよう (1記事 3つまでが おすすめ)。</p>';
    } else {
      const canQuiz = W.length >= 2;
      h += '<div class="nb-qbtns"><button class="nb-qgo" id="nbQuiz"' + (canQuiz ? '' : ' disabled') + '>🧠 単語クイズ (意味を 選ぶ)</button><button class="nb-qgo en" id="nbQuizR"' + (canQuiz ? '' : ' disabled') + '>🔁 逆クイズ (英語を 選ぶ)</button></div>';
      h += '<ul class="nb-words">' + W.slice(0, 200).map((w, i) => { const r = D.w[w.en.toLowerCase()];
        return '<li><button class="nb-say no-furi" data-say="' + i + '" aria-label="発音">🔊</button><span class="nb-en no-furi">' + esc(w.en) + '</span><span class="nb-ja">' + esc(w.ja) + '</span>' + (r ? '<span class="nb-mk ' + (r[2] ? 'ok' : 'ng') + '">' + (r[2] ? '◎' : '△') + '</span>' : '') + '</li>'; }).join('') + '</ul>';
      if (W.length > 200) h += '<p class="nb-tip">新しい 200語を 表示しています。</p>';
    }
    h += '</section>';
    h += '<p class="nb-note">※ 単語メモと 読書記録は、サイトと ゲームを 同じ 端末・同じ ブラウザで 開いた ときに つながります。</p>';
    $('nbArea').innerHTML = h; $('pageNewsBox').scrollTop = 0;

    const op = $('nbOpen'); if (op) op.onclick = () => { sfx('click'); };
    const cl = $('nbClaim'); if (cl) cl.onclick = () => { const d = data(); if (d.tok[ymd()]) return; d.tok[ymd()] = 1; State.gameTokens = (State.gameTokens || 0) + 1; save(); sfx('correct'); menu();
      const t = document.createElement('div'); t.className = 'nb-toast'; t.textContent = '🎮 ゲームトークン +1 (いま ' + State.gameTokens + '個)'; document.body.appendChild(t); setTimeout(() => t.remove(), 2400); };
    $('nbArea').querySelectorAll('[data-say]').forEach(b => b.onclick = () => sayEn(W[+b.dataset.say].en));
    const q1 = $('nbQuiz'); if (q1) q1.onclick = () => { sfx('click'); start(false); };
    const q2 = $('nbQuizR'); if (q2) q2.onclick = () => { sfx('click'); start(true); };
  }

  // ダミーの 選択肢: 自分の メモ + 英検単語
  function pool() {
    const out = [];
    ['G2_VERBS', 'G2_NOUNS', 'G2_ADJADV', 'G2_VERBS_PLUS', 'G2_NOUNS_PLUS', 'G2_ADJADV_PLUS'].forEach(n => { try { const a = window[n] || eval(n); if (Array.isArray(a)) out.push(...a); } catch (e) {} });
    return out.filter(x => x && x.en && x.ja);
  }
  function start(rev) {
    const W = words(); if (W.length < 2) return;
    // 覚えていない 単語・間違えた 単語を 優先して 最大 10問
    const D = data(), score = w => { const r = D.w[w.en.toLowerCase()]; return r ? (r[2] ? 2 : 0) : 1; };
    const qs = shuffle(W).sort((a, b) => score(a) - score(b)).slice(0, 10);
    run = { rev: rev, qs: qs, i: 0, ok: 0, extra: shuffle(pool()).slice(0, 120), all: W };
    ask();
  }
  function ask() {
    const r = run, w = r.qs[r.i], key = r.rev ? 'en' : 'ja';
    const seen = new Set([w[key].toLowerCase()]), opts = [w[key]];
    const cands = shuffle(r.all.filter(x => x !== w)).concat(r.extra);
    for (const c of cands) { if (opts.length >= 4) break; const v = c[key]; if (v && !seen.has(v.toLowerCase())) { seen.add(v.toLowerCase()); opts.push(v); } }
    const ord = shuffle(opts);
    let h = '<div class="nb-top"><button class="nb-quit" id="nbQuit">← もどる</button><span>' + (r.rev ? '🔁 逆クイズ' : '🧠 単語クイズ') + '</span><span class="nb-cnt">' + (r.i + 1) + ' / ' + r.qs.length + '</span></div>';
    h += '<div class="nb-prog"><i style="width:' + (r.i * 100 / r.qs.length) + '%"></i></div>';
    h += '<div class="nb-q">' + (r.rev ? '<div class="nb-qt">' + esc(w.ja) + '</div><div class="nb-qs">英語で 何と いう?</div>' : '<div class="nb-qt en no-furi">' + esc(w.en) + ' <button class="nb-say" id="nbSayQ">🔊</button></div><div class="nb-qs">意味は どれ?' + (w.src ? ' <small>(' + esc(w.src) + ' で メモ)</small>' : '') + '</div>') + '</div>';
    h += '<div class="nb-opts">' + ord.map((o, k) => '<button class="nb-opt' + (r.rev ? ' en no-furi' : '') + '" data-o="' + k + '">' + esc(o) + '</button>').join('') + '</div><div id="nbFb"></div>';
    $('nbArea').innerHTML = h; $('pageNewsBox').scrollTop = 0;
    if (!r.rev) sayEn(w.en);
    const sq = $('nbSayQ'); if (sq) sq.onclick = () => sayEn(w.en);
    $('nbQuit').onclick = () => { sfx('click'); menu(); };
    $('nbArea').querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
      if (r.done) return; r.done = true;
      const ok = ord[+b.dataset.o] === w[key];
      $('nbArea').querySelectorAll('[data-o]').forEach(x => { x.disabled = true; if (ord[+x.dataset.o] === w[key]) x.classList.add('right'); });
      if (!ok) b.classList.add('wrong');
      const D = data(), k = w.en.toLowerCase(), rec = D.w[k] || (D.w[k] = [0, 0, 0]); if (ok) { rec[0]++; rec[2] = 1; r.ok++; } else { rec[1]++; rec[2] = 0; } save();
      sfx(ok ? 'correct' : 'wrong'); if (r.rev && ok) sayEn(w.en);
      $('nbFb').innerHTML = '<div class="nb-fb ' + (ok ? 'ok' : 'ng') + '">' + (ok ? '⭕ 正解!' : '❌ 正解は「' + esc(w[key]) + '」') + '<br><b class="no-furi">' + esc(w.en) + '</b> = ' + esc(w.ja) + '</div><button class="nb-next" id="nbNext">' + (r.i + 1 < r.qs.length ? '次へ ▶' : '結果を 見る') + '</button>';
      $('nbNext').onclick = () => { sfx('click'); r.done = false; r.i++; if (r.i < r.qs.length) ask(); else result(); };
    });
  }
  function result() {
    const r = run, pct = Math.round(r.ok * 100 / r.qs.length);
    let h = '<div class="nb-res"><div class="nb-big">' + r.ok + ' / ' + r.qs.length + '</div><p>' + (pct === 100 ? '🎉 パーフェクト! ニュースの 単語が 身についてきたね。' : pct >= 70 ? '👍 よく できました! △の 単語は もう一度 ニュースで 見てみよう。' : '📖 間違えた 単語は 次の クイズで 先に 出るよ。') + '</p>';
    h += '<button class="nb-qgo" id="nbAgain">もう一度</button><button class="nb-qgo en" id="nbBack">メニューへ</button></div>';
    $('nbArea').innerHTML = h;
    $('nbAgain').onclick = () => { sfx('click'); start(r.rev); };
    $('nbBack').onclick = () => { sfx('click'); menu(); };
  }

  function open() { showPage('pageNewsBox'); menu(); }
  // サイトから 戻った とき (別タブで 単語を 追加) に 最新を 表示
  document.addEventListener('visibilitychange', () => { const p = $('pageNewsBox'); if (!document.hidden && p && p.classList.contains('active') && !run) menu(); });
  window.addEventListener('storage', e => { const p = $('pageNewsBox'); if ((e.key === KW || e.key === KL) && p && p.classList.contains('active') && !run) menu(); });
  return { open: open, stats: stats, SITE: SITE };
})();
