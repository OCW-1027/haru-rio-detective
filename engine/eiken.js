/* engine/eiken.js — v2 P7: 英検道場 (2級 / 準1級)
 * 화면: pageEiken. 코너: 単語 (간격반복) / 大問1 (短文空所補充) / リスニング / ライティング (要約·意見)
 * 저장: State.v2.eiken = { srs:{key:[box,due]}, newDay:{d,n}, p1:{i:[ok,ng]}, listen:{i:[ok,ng]}, write:{id:text} }
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, Hub, data/vocab.js, data/eiken.js
 */
const Eiken = (function () {
  const DAY = 864e5;
  const BOX_DAYS = [0, 1, 2, 4, 7, 15, 30];   // box n 을 맞힌 뒤 다음 출제까지 일수
  const MASTER_BOX = 4;                        // 이 이상이면 「覚えた」
  const NEW_PER_DAY = 15;
  const OFFICIAL = {
    g2: 'https://www.eiken.or.jp/eiken/exam/grade_2/',
    p1: 'https://www.eiken.or.jp/eiken/exam/grade_p1/',
  };

  // ---------- 데이터 ----------
  const POS = [
    { id: 'all', name: 'すべて', icon: '📚' },
    { id: 'v', name: '動詞', icon: '🏃' },
    { id: 'n', name: '名詞', icon: '📦' },
    { id: 'a', name: '形容詞·副詞', icon: '🎨' },
    { id: 'i', name: '熟語', icon: '🔗' },
  ];
  const POS_NAME = { v: '動詞', n: '名詞', a: '形容詞·副詞', i: '熟語' };
  function words(level) {
    const has = n => { try { return Array.isArray(eval(n)); } catch (e) { return false; } };
    const out = [], seen = new Set();
    const add = (en, ja, pos) => { if (!en || seen.has(en)) return; seen.add(en); out.push({ en: en, ja: ja, pos: pos }); };
    if (level === 'p1') {
      const P = typeof EIKEN_P1_POS !== 'undefined' ? EIKEN_P1_POS : { v: '', a: '' };
      const V = new Set(P.v.split(' ')), A = new Set(P.a.split(' '));
      ['G_PRE1_WORDS', 'G_PRE1_WORDS_PLUS', 'G_PRE1_WORDS_PLUS2', 'G_PRE1_WORDS_PLUS3'].filter(has)
        .forEach(n => eval(n).forEach(w => add(w.en, w.ja, V.has(w.en) ? 'v' : A.has(w.en) ? 'a' : (/ /.test(w.en) ? 'i' : 'n'))));
    } else {
      const G = { v: ['G2_VERBS', 'G2_VERBS_PLUS', 'G2_VERBS_PLUS2', 'G2_VERBS_PLUS3'],
        n: ['G2_NOUNS', 'G2_NOUNS_PLUS', 'G2_NOUNS_PLUS2', 'G2_NOUNS_PLUS3'],
        a: ['G2_ADJADV', 'G2_ADJADV_PLUS', 'G2_ADJADV_PLUS2', 'G2_ADJADV_PLUS3'],
        i: ['IDIOMS_G2', 'IDIOMS_G2_PLUS'] };
      Object.keys(G).forEach(p => G[p].filter(has).forEach(n => eval(n).forEach(w => add(w.en, w.ja, p))));
    }
    const X = typeof EIKEN_WORDS !== 'undefined' && EIKEN_WORDS[level];
    if (X) Object.keys(X).forEach(p => X[p].forEach(s => { const k = s.indexOf('|'); add(s.slice(0, k), s.slice(k + 1), p); }));
    return out;
  }
  let cache = {};
  function wordList(level, pos) {
    const all = cache[level] || (cache[level] = words(level));
    return !pos || pos === 'all' ? all : all.filter(w => w.pos === pos);
  }

  function data() {
    if (!State.v2) State.v2 = {};
    const e = State.v2.eiken || (State.v2.eiken = {});
    e.srs = e.srs || {}; e.p1 = e.p1 || {}; e.listen = e.listen || {}; e.write = e.write || {}; e.read = e.read || {};
    if (!e.newDay || e.newDay.d !== today()) e.newDay = { d: today(), n: 0 };
    return e;
  }
  function today() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function save() { try { saveState(); } catch (e) {} }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function esc(s) { return escapeHtml(String(s)); }

  // ---------- 음성 ----------
  let voices = [];
  function loadVoices() { try { voices = speechSynthesis.getVoices().filter(v => /^en/i.test(v.lang)); } catch (e) {} }
  if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  const FEMALE = /female|samantha|zira|susan|karen|moira|tessa|victoria|aria|jenny|google us english|serena|fiona/i;
  const MALE = /\bmale|david|daniel|alex|fred|guy|mark|george|james|tom|google uk english male|arthur|rishi/i;
  // ブラウザ音声: 自然な 声 (Natural / Neural / Enhanced / Premium / Google) を 優先
  const GOOD = /natural|neural|enhanced|premium|google|siri/i;
  function voiceFor(role) {
    if (!voices.length) loadVoices();
    const us = voices.filter(v => /en-(US|GB|AU|CA)/i.test(v.lang));
    const base = us.length ? us : voices, good = base.filter(v => GOOD.test(v.name));
    const pool = good.length >= 2 ? good.concat(base.filter(v => !good.includes(v))) : base;
    if (role === 'M') return pool.find(v => MALE.test(v.name)) || pool[1] || pool[0];
    if (role === 'W') return pool.find(v => FEMALE.test(v.name)) || pool[0];
    return pool.find(v => /en-US/i.test(v.lang)) || pool[0];
  }
  // 음성 세대 번호: stopSpeak() 하면 증가 → 이전 세대의 콜백·이어 읽기는 모두 무시 (뒤로 가도 소리가 남는 버그 방지)
  let speakGen = 0;
  function onEikenPage() { const p = document.getElementById('pageEiken'); return !!(p && p.classList.contains('active')); }
  function speak(text, role, onEnd, rate) {
    const gen = speakGen;
    const end = () => { if (gen === speakGen && onEnd) onEnd(); };
    if (!onEikenPage()) { end(); return; }
    // 事前生成の 高音質音声 (Kokoro) が あれば それを 再生、なければ ブラウザ音声
    if (typeof VoicePack !== 'undefined' && VoicePack.play(text, role || 'N', (rate || 0.92) / 0.92, end, () => { if (gen === speakGen) tts(text, role, end, rate); })) return;
    tts(text, role, end, rate);
  }
  function tts(text, role, end, rate) {
    if (!('speechSynthesis' in window)) { end(); return; }
    const u = new SpeechSynthesisUtterance(text);
    const v = voiceFor(role || 'N');
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
    u.rate = rate || 0.92;
    if (role === 'M' && v && !MALE.test(v.name)) u.pitch = 0.75;
    u.onend = end;
    u.onerror = end;
    speechSynthesis.speak(u);
  }
  function stopSpeak() { speakGen++; try { speechSynthesis.cancel(); } catch (e) {} if (typeof VoicePack !== 'undefined') VoicePack.stop(); }
  function speakSeq(items, done) {
    stopSpeak();
    const gen = speakGen;
    let i = 0;
    (function next() {
      if (gen !== speakGen || !onEikenPage()) return;
      if (i >= items.length) { if (done) done(); return; }
      const it = items[i++];
      speak(it[1], it[0], () => setTimeout(next, 350));
    })();
  }
  // 다른 화면으로 나가거나 앱이 백그라운드로 가면 즉시 정지
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopSpeak(); });
  window.addEventListener('pagehide', stopSpeak);
  try {
    new MutationObserver(() => { if (!onEikenPage()) { stopSpeak(); if (typeof EikenInterview !== 'undefined') EikenInterview.stop(); } })
      .observe(document.getElementById('pageEiken') || document.body, { attributes: true, attributeFilter: ['class'] });
  } catch (e) {}

  // ---------- 화면 공통 ----------
  let level = 'g2';
  let view = 'home';
  function area() { return document.getElementById('eikenArea'); }
  function header(title, sub) {
    return '<div class="ek-head"><button class="ek-back" data-go="home">← 道場</button><div><div class="ek-title">' + title + '</div>' + (sub ? '<div class="ek-sub">' + sub + '</div>' : '') + '</div></div>';
  }
  function bindGo(root) {
    root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { sfx('click'); stopSpeak(); go(b.dataset.go); });
  }
  function go(v) { if (v === 'k1') { k1 = true; v = 'p1'; } else if (v !== 'p1') k1 = false; view = v; ({ home: home, vocab: vocab, quiz: quiz, wlist: wlist, p1: part1, listen: listen, write: writeList, read: readList, mock: mockIntro, interview: interview }[v] || home)(); const p = document.getElementById('pageEiken'); if (p) p.scrollTop = 0; }

  // ---------- 홈 ----------
  let pos = 'all';
  function newLeftToday(e) { return Math.max(0, NEW_PER_DAY + (e.newDay.bonus || 0) - e.newDay.n); }
  function vocabStats(lv, p) {
    const e = data(), list = wordList(lv, p), t = Date.now();
    let mastered = 0, learning = 0, due = 0;
    list.forEach(w => { const s = e.srs[lv + ':' + w.en]; if (!s) return; if (s[0] >= MASTER_BOX) mastered++; else learning++; if (s[1] <= t) due++; });
    return { total: list.length, mastered: mastered, learning: learning, due: due, fresh: list.length - mastered - learning };
  }
  function rate(obj) { let ok = 0, ng = 0; Object.values(obj).forEach(r => { ok += r[0]; ng += r[1]; }); return ok + ng ? Math.round(ok * 100 / (ok + ng)) + '%' : '—'; }
  function pct(a, b) { return b ? (a * 100 / b).toFixed(1) : 0; }
  function home() {
    const e = data(), vs = vocabStats(level, pos);
    const newLeft = newLeftToday(e);
    let h = '<div class="ek-hero"><div><div class="ek-kicker">コラドン&コラリンの</div><h1 class="ek-h1">英検道場</h1>';
    h += '<div class="ek-levels"><button class="ek-lv' + (level === 'g2' ? ' on' : '') + '" data-lv="g2">2級</button><button class="ek-lv' + (level === 'p1' ? ' on' : '') + '" data-lv="p1">準1級</button></div></div>';
    h += '<img src="assets/img/chars/spirits/korarin_greet_01.webp" alt=""></div>';

    h += '<div class="ek-today"><div class="ek-today-h">単語トレーニング <span class="ek-today-all">' + (level === 'g2' ? '2級' : '準1級') + ' 全 ' + wordList(level).length + '語</span></div>';
    h += '<div class="ek-pos">';
    POS.forEach(p => {
      const st = vocabStats(level, p.id);
      h += '<button class="ek-pos-b' + (pos === p.id ? ' on' : '') + '" data-pos="' + p.id + '"><span class="ek-pos-n">' + p.icon + ' ' + p.name + '</span><span class="ek-pos-c">' + st.mastered + ' / ' + st.total + '</span><span class="ek-pos-m"><i style="width:' + pct(st.mastered, st.total) + '%"></i></span></button>';
    });
    h += '</div>';
    h += '<div class="ek-today-row"><span>🔁 復習 <b>' + vs.due + '</b></span><span>🆕 新しい 単語 <b>' + Math.min(newLeft, vs.fresh) + '</b></span><span>✅ 覚えた <b>' + vs.mastered + '</b> / ' + vs.total + '</span></div>';
    h += '<div class="ek-meter"><i style="width:' + pct(vs.mastered, vs.total) + '%"></i><i class="l" style="width:' + pct(vs.learning, vs.total) + '%"></i></div>';
    h += '<button class="ek-primary" data-go="vocab">' + (pos === 'all' ? '' : POS_NAME[pos] + 'を ') + 'トレーニング 開始 →</button>';
    h += '<div class="ek-row2"><button class="ek-secondary" data-go="quiz">⚡ 10問 クイズ</button><button class="ek-secondary" data-go="wlist">📋 単語リスト</button></div></div>';

    const g2 = level === 'g2';
    const P1 = SET('p1'); const n = k => SET(k).length;
    const C = [
      { go: 'p1', icon: '✏️', name: '大問1 語句空所補充', sub: P1.length ? P1.length + '問 · 正答率 ' + rate(e[g2 ? 'p1' : 'pp1'] || {}) : '準備中', ok: P1.length > 0 },
      { go: 'listen', icon: '🎧', name: 'リスニング', sub: n('listen') ? n('listen') + '問 · 正答率 ' + rate(REC('listen')) : '準備中', ok: n('listen') > 0 },
      { go: 'write', icon: '📝', name: 'ライティング', sub: n('write') ? '要約 · 意見論述 ' + n('write') + '題' : '準備中', ok: n('write') > 0 },
      { go: 'read', icon: '📖', name: '長文読解', sub: n('read') ? '空所補充 · 内容一致 ' + n('read') + '題 · 解いた ' + SET('read').filter(r => e.read[r.id]).length : '準備中', ok: n('read') > 0 },
      { go: 'interview', icon: '🎤', name: '面接 (二次)', sub: (typeof EIKEN_INTERVIEW !== 'undefined' ? EIKEN_INTERVIEW[level].length + 'カード · ' : '') + (level === 'p1' ? 'ナレーション + 4問' : '音読 + 4問') + ' · 音声認識', ok: typeof EikenInterview !== 'undefined' },
      ...(level === 'p1' && typeof EIKEN_1K_PART1 !== 'undefined' ? [{ go: 'k1', icon: '🎓', name: '1級 チャレンジ (大問1)', sub: EIKEN_1K_PART1.length + '問 · 正答率 ' + rate(e.k1p1 || {}), ok: true }] : []),
      { go: 'mock', icon: '⏱', name: '模擬試験 (本番形式)', sub: '全 ' + mockPlan().n + '回 · ' + (level === 'p1' ? '筆記31問 + 作文2題 + リスニング29問' : '筆記31問 + 作文2題 + リスニング30問'), ok: true },
    ];
    h += '<div class="ek-grid">';
    C.forEach(c => { h += '<button class="ek-card' + (c.ok ? '' : ' off') + '"' + (c.ok ? ' data-go="' + c.go + '"' : ' disabled') + '><span class="ek-card-icon">' + c.icon + '</span><span class="ek-card-name">' + c.name + '</span><span class="ek-card-sub">' + c.sub + '</span></button>'; });
    h += '</div>';
    h += '<div class="ek-note">📚 ここの 問題は すべて 英検の 形式に 合わせた オリジナル問題です。本物の 過去問は 英検の 公式サイトで 解けます → <a href="' + OFFICIAL[level] + '" target="_blank" rel="noopener">' + (g2 ? '2級' : '準1級') + 'の 過去問ページ</a></div>';
    area().innerHTML = h;
    bindGo(area());
    area().querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { sfx('click'); level = b.dataset.lv; home(); });
    area().querySelectorAll('[data-pos]').forEach(b => b.onclick = () => { sfx('click'); pos = b.dataset.pos; home(); });
  }

  // ---------- 単語 (간격반복) ----------
  let vq = null;
  function buildVocabQueue() {
    const e = data(), list = wordList(level, pos), t = Date.now();
    const due = shuffle(list.filter(w => { const s = e.srs[level + ':' + w.en]; return s && s[1] <= t; })).slice(0, 20);
    const newLeft = newLeftToday(e);
    const fresh = list.filter(w => !e.srs[level + ':' + w.en]).slice(0, Math.min(newLeft, 10));
    return shuffle(due.concat(fresh)).map(w => ({ w: w, retry: false }));
  }
  // 퀴즈: SRS 와 별도로 아무 단어나 10문 (이미 본 단어 우선 섞기)
  function buildQuizQueue() {
    const e = data(), list = wordList(level, pos);
    const seen = list.filter(w => e.srs[level + ':' + w.en]);
    const src = seen.length >= 10 ? shuffle(seen).slice(0, 6).concat(shuffle(list).slice(0, 4)) : shuffle(list).slice(0, 10);
    const uniq = []; const u = new Set(); src.forEach(w => { if (!u.has(w.en)) { u.add(w.en); uniq.push(w); } });
    return shuffle(uniq).map(w => ({ w: w, retry: false, quiz: true }));
  }
  function vocab() { vq = { list: buildVocabQueue(), i: 0, ok: 0, ng: 0, mode: 'srs' }; vocabQ(); }
  function quiz() { vq = { list: buildQuizQueue(), i: 0, ok: 0, ng: 0, mode: 'quiz' }; vocabQ(); }
  function sub() { return (level === 'g2' ? '2級' : '準1級') + (pos === 'all' ? '' : ' · ' + POS_NAME[pos]); }
  function vocabQ() {
    const root = area(), e = data();
    const title = vq.mode === 'quiz' ? '⚡ 単語クイズ' : '単語トレーニング';
    if (!vq.list.length) {
      const more = vocabStats(level, pos).fresh > 0;
      root.innerHTML = header(title, sub()) + '<div class="ek-box ek-center"><div class="ek-big">🎉</div><p>きょうの 単語は ぜんぶ 終わりました!</p>' +
        (more ? '<button class="ek-primary" id="ekMore">🆕 もっと 新しい 単語 (+10)</button>' : '') +
        '<button class="ek-secondary" data-go="quiz">⚡ 10問 クイズ</button><button class="ek-secondary" data-go="home">道場に もどる</button></div>';
      bindGo(root);
      const m = document.getElementById('ekMore'); if (m) m.onclick = () => { sfx('click'); e.newDay.bonus = (e.newDay.bonus || 0) + 10; save(); vocab(); };
      return;
    }
    if (vq.i >= vq.list.length) {
      const more = vq.mode === 'srs' && vocabStats(level, pos).fresh > 0;
      root.innerHTML = header(title, '結果') + '<div class="ek-box ek-center"><div class="ek-big">' + (vq.ng ? '👍' : '🏆') + '</div><p>正解 <b>' + vq.ok + '</b> ・ まちがい <b>' + vq.ng + '</b></p><p class="ek-small">まちがえた 単語は 少し あとで また 出てきます。</p>' +
        '<button class="ek-primary" data-go="' + (vq.mode === 'quiz' ? 'quiz' : 'vocab') + '">もう1セット</button>' +
        (more ? '<button class="ek-secondary" id="ekMore">🆕 新しい 単語を もっと (+10)</button>' : '') +
        '<button class="ek-secondary" data-go="home">道場に もどる</button></div>';
      bindGo(root);
      const m = document.getElementById('ekMore'); if (m) m.onclick = () => { sfx('click'); e.newDay.bonus = (e.newDay.bonus || 0) + 10; save(); vocab(); };
      return;
    }
    const item = vq.list[vq.i], w = item.w, key = level + ':' + w.en;
    const s = e.srs[key] || [0, 0];
    // 출제 형식: 영→일 / 일→영 (box≥2) / 듣기 (box≥1)
    const r = Math.random();
    const type = s[0] >= 2 && r < 0.35 ? 'ja' : s[0] >= 1 && r > 0.75 ? 'ear' : 'en';
    const same = wordList(level, w.pos).filter(x => x.en !== w.en);
    const pool = same.length >= 3 ? same : wordList(level).filter(x => x.en !== w.en);
    const opts = shuffle([w].concat(shuffle(pool).slice(0, 3)));
    const tag = '<span class="ek-tag">' + POS_NAME[w.pos] + '</span>';
    let h = header(title, (vq.i + 1) + ' / ' + vq.list.length + (vq.mode === 'quiz' ? '' : s[0] ? ' ・ 復習' : ' ・ 🆕 新しい 単語'));
    h += '<div class="ek-box ek-word">' + tag;
    if (type === 'ear') h += '<div class="ek-word-main">🎧</div><button class="ek-speak" id="ekSay">🔊 もう一度</button><div class="ek-word-ask">聞こえた 単語の 意味は?</div>';
    else h += '<div class="ek-word-main">' + esc(type === 'ja' ? w.ja : w.en) + '</div>' + (type === 'en' ? '<button class="ek-speak" id="ekSay">🔊</button>' : '') + '<div class="ek-word-ask">' + (type === 'ja' ? '英語で 言うと?' : '意味は?') + '</div>';
    h += '</div><div class="ek-opts">';
    opts.forEach((o, k) => { h += '<button class="ek-opt" data-k="' + k + '">' + esc(type === 'ja' ? o.en : o.ja) + '</button>'; });
    h += '</div><div id="ekFb"></div>';
    root.innerHTML = h; bindGo(root);
    const say = document.getElementById('ekSay');
    if (say) { say.onclick = () => speak(w.en, 'N'); speak(w.en, 'N'); }
    let done = false;
    root.querySelectorAll('.ek-opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = opts[+b.dataset.k] === w;
      root.querySelectorAll('.ek-opt').forEach((x, k) => { x.disabled = true; if (opts[k] === w) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sfx(ok ? 'unlock' : 'wrong'); if (typeof Study !== 'undefined') Study.log('eiken', ok, 'vocab'); 
      if (vq.mode === 'quiz') {
        if (ok) vq.ok++; else { vq.ng++; if (e.srs[key]) e.srs[key] = [Math.max(0, s[0] - 1), Date.now()]; }
      } else {
        if (!e.srs[key]) e.newDay.n++;
        if (ok && !item.retry) { const nb = Math.min(s[0] + 1, BOX_DAYS.length - 1); e.srs[key] = [nb, Date.now() + BOX_DAYS[nb] * DAY]; vq.ok++; }
        else if (ok) { e.srs[key] = [1, Date.now() + DAY]; vq.ok++; }
        else { e.srs[key] = [0, Date.now()]; vq.ng++; vq.list.push({ w: w, retry: true }); }
      }
      save();
      speak(w.en, 'N');
      document.getElementById('ekFb').innerHTML = '<div class="ek-fb ' + (ok ? 'ok' : 'ng') + '"><b>' + esc(w.en) + '</b> = ' + esc(w.ja) + '</div><button class="ek-primary" id="ekNext">次へ →</button>';
      document.getElementById('ekNext').onclick = () => { vq.i++; vocabQ(); };
    });
  }

  // ---------- 単語リスト ----------
  function wlist() {
    const e = data(), list = wordList(level, pos);
    const mark = w => { const s = e.srs[level + ':' + w.en]; return !s ? '' : s[0] >= MASTER_BOX ? '✅' : '🔁'; };
    let h = header('📋 単語リスト', sub() + ' · ' + list.length + '語');
    h += '<div class="ek-pos small">';
    POS.forEach(p => { h += '<button class="ek-pos-b' + (pos === p.id ? ' on' : '') + '" data-pos="' + p.id + '"><span class="ek-pos-n">' + p.icon + ' ' + p.name + '</span></button>'; });
    h += '</div><p class="ek-small">タップすると 発音を 聞けます。✅ 覚えた · 🔁 練習中</p><div class="ek-wl">';
    list.forEach((w, i) => { h += '<button class="ek-wl-r" data-i="' + i + '"><span class="ek-wl-m">' + mark(w) + '</span><b>' + esc(w.en) + '</b><span>' + esc(w.ja) + '</span></button>'; });
    h += '</div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-pos]').forEach(b => b.onclick = () => { sfx('click'); pos = b.dataset.pos; wlist(); });
    area().querySelectorAll('.ek-wl-r').forEach(b => b.onclick = () => { stopSpeak(); speak(list[+b.dataset.i].en, 'N'); });
  }

  // ---------- 大問1 ----------
  let pq = null, k1 = false;   // k1 = 1級 チャレンジ (準1級の 画面から)
  function SET(kind) {
    const g = { p1: 'EIKEN_G2_PART1', listen: 'EIKEN_G2_LISTEN', read: 'EIKEN_G2_READING', write: 'EIKEN_G2_WRITE' }[kind];
    const n = level === 'p1' ? g.replace('G2', 'P1') : g;
    try { const v = eval(n); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  function REC(kind) { const e = data(); const k = level === 'p1' ? 'p_' + kind : kind; return e[k] || (e[k] = {}); }
  function P1SET() { if (k1) return typeof EIKEN_1K_PART1 !== 'undefined' ? EIKEN_1K_PART1 : []; return level === 'p1' ? (typeof EIKEN_P1_PART1 !== 'undefined' ? EIKEN_P1_PART1 : []) : EIKEN_G2_PART1; }
  function P1REC() { const e = data(); if (k1) return e.k1p1 || (e.k1p1 = {}); return level === 'p1' ? (e.pp1 || (e.pp1 = {})) : e.p1; }
  let p1opt = { tag: 'all' };
  function part1() {
    const set = P1SET(), rec = P1REC();
    const tags = ['all'].concat([...new Set(set.map(q => q.tag))]);
    const cnt = t => set.filter(q => t === 'all' || q.tag === t).length;
    const solved = Object.keys(rec).length;
    const wrong = Object.keys(rec).filter(i => rec[i][1] > 0 && rec[i][1] >= rec[i][0]).length;
    let h = header(k1 ? '🎓 1級 チャレンジ' : '✏️ 大問1 語句空所補充', (k1 ? '1級 大問1 体験' : level === 'p1' ? '準1級' : '2級') + ' · 全 ' + set.length + '問');
    if (k1) h += '<div class="ek-box"><p class="ek-small">🎓 1級の 大問1 は 22問、語彙の レベルは 約1万〜1万5千語。準1級より ずっと 難しい 単語ばかり。まちがえても 大丈夫、解説で 覚えよう!</p></div>';
    h += '<div class="ek-box"><div class="ek-today-row"><span>📊 解いた <b>' + solved + '</b> / ' + set.length + '</span><span>🎯 正答率 <b>' + rate(rec) + '</b></span><span>❗ 苦手 <b>' + wrong + '</b></span></div>';
    h += '<div class="ek-meter"><i style="width:' + pct(solved, set.length) + '%"></i></div>';
    h += '<div class="ek-pos small" style="grid-template-columns:repeat(' + tags.length + ',1fr)">';
    tags.forEach(t => { h += '<button class="ek-pos-b' + (p1opt.tag === t ? ' on' : '') + '" data-tag="' + t + '"><span class="ek-pos-n">' + (t === 'all' ? 'すべて' : t) + '</span><span class="ek-pos-c">' + cnt(t) + '問</span></button>'; });
    h += '</div>';
    h += '<button class="ek-primary" id="p1Go10">▶ 10問 チャレンジ</button>';
    h += '<div class="ek-row2"><button class="ek-secondary" id="p1GoWrong"' + (wrong ? '' : ' disabled') + '>❗ 苦手だけ (' + wrong + ')</button><button class="ek-secondary" id="p1GoExam">⏱ 本番形式 ' + (k1 ? 22 : level === 'p1' ? 18 : 17) + '問</button></div></div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-tag]').forEach(b => b.onclick = () => { sfx('click'); p1opt.tag = b.dataset.tag; part1(); });
    const pool = () => set.map((q, i) => i).filter(i => p1opt.tag === 'all' || set[i].tag === p1opt.tag);
    const score = i => { const r = rec[i]; return r ? (r[1] * 2 - r[0]) : 5; };
    const start = list => { sfx('click'); pq = { list: list, i: 0, ok: 0 }; part1Q(); };
    document.getElementById('p1Go10').onclick = () => start(shuffle(shuffle(pool()).sort((a, b) => score(b) - score(a)).slice(0, 10)));
    document.getElementById('p1GoWrong').onclick = () => start(shuffle(pool().filter(i => rec[i] && rec[i][1] > 0 && rec[i][1] >= rec[i][0])).slice(0, 10));
    document.getElementById('p1GoExam').onclick = () => {
      // 本番 비율: 語彙 대부분 + 熟語 몇 개 (+ 2級은 文法)
      if (k1) return start(shuffle(set.map((q, i) => i)).slice(0, 22));
      const by = t => shuffle(set.map((q, i) => i).filter(i => set[i].tag === t));
      const L = level === 'p1' ? by('語彙').slice(0, 14).concat(by('熟語').slice(0, 4)) : by('語彙').slice(0, 10).concat(by('熟語').slice(0, 4), by('文法').slice(0, 3));
      start(L);
    };
  }
  function part1Q() {
    const root = area();
    if (pq.i >= pq.list.length) {
      root.innerHTML = header(k1 ? '🎓 1級 チャレンジ' : '大問1 語句空所補充', '結果') + '<div class="ek-box ek-center"><div class="ek-big">' + (pq.ok >= 8 ? '🏆' : '💪') + '</div><p>' + pq.list.length + '問中 <b>' + pq.ok + '</b>問 正解</p><p class="ek-small">本番の 大問1は ' + (k1 ? '22' : level === 'p1' ? '18' : '17') + '問。8割 取れれば 合格ペース!</p><button class="ek-primary" data-go="p1">大問1 メニューへ</button><button class="ek-secondary" data-go="home">道場に もどる</button></div>';
      return bindGo(root);
    }
    const qi = pq.list[pq.i], q = P1SET()[qi];
    const order = shuffle([0, 1, 2, 3]);
    let h = header(k1 ? '🎓 1級 チャレンジ' : '大問1 語句空所補充', (pq.i + 1) + ' / ' + pq.list.length + ' ・ ' + q.tag);
    h += '<div class="ek-box ek-q">' + esc(q.q).replace('( )', '<span class="ek-blank">(　　)</span>') + '</div><div class="ek-opts two">';
    order.forEach((o, k) => { h += '<button class="ek-opt" data-o="' + o + '">' + (k + 1) + '. ' + esc(q.options[o]) + '</button>'; });
    h += '</div><div id="ekFb"></div>';
    root.innerHTML = h; bindGo(root);
    let done = false;
    root.querySelectorAll('.ek-opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = +b.dataset.o === q.answer;
      root.querySelectorAll('.ek-opt').forEach(x => { x.disabled = true; if (+x.dataset.o === q.answer) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sfx(ok ? 'unlock' : 'wrong'); if (typeof Study !== 'undefined') Study.log('eiken', ok, 'p1'); 
      const rec = P1REC(); const r = rec[qi] || [0, 0]; r[ok ? 0 : 1]++; rec[qi] = r; save();
      if (ok) pq.ok++;
      const full = q.q.replace('( )', q.options[q.answer]);
      document.getElementById('ekFb').innerHTML = '<div class="ek-fb ' + (ok ? 'ok' : 'ng') + '"><div class="ek-fb-h">' + (ok ? '🎉 正解!' : '✗ 正解は ' + esc(q.options[q.answer])) + '</div>' +
        '<div class="ek-fb-en">' + esc(full) + ' <button class="ek-mini" id="ekSay">🔊</button></div><div class="ek-fb-ja">' + esc(q.ja) + '</div><div class="ek-fb-exp">💡 ' + esc(q.exp) + '</div></div>' +
        '<button class="ek-primary" id="ekNext">次へ →</button>';
      document.getElementById('ekSay').onclick = () => speak(full, 'N');
      document.getElementById('ekNext').onclick = () => { pq.i++; part1Q(); };
    });
  }

  // ---------- リスニング ----------
  let lq = null, lpart = 0;
  const LPARTS = () => level === 'p1'
    ? [[1, '会話の 内容一致選択', '2人の 会話を 聞いて 質問に 答える'], [2, '文の 内容一致選択', '説明文を 聞いて 2問 (または 1問) に 答える'], [3, 'Real-Life 形式', 'Situation を 読んでから、放送を 聞いて 行動を 選ぶ']]
    : [[1, '会話の 内容一致選択', '2人の 会話を 聞いて 質問に 答える'], [2, '文の 内容一致選択', '説明文・アナウンスを 聞いて 質問に 答える']];
  // パート 選択 → 10題。part: 0 = ミックス
  function listen(part) {
    if (part === undefined) return listenMenu();
    lpart = part;
    const rec = REC('listen'), all = SET('listen');
    const score = i => { const r = rec[i] || rec[i + '.0']; return r ? (r[1] * 2 - r[0]) : 5; };
    const pick = shuffle(all.map((x, i) => i).filter(i => !part || all[i].part === part)).sort((a, b) => score(b) - score(a)).slice(0, 10);
    lq = { list: shuffle(pick), i: 0, ok: 0, total: 0, part: part }; listenQ();
  }
  function listenMenu() {
    const rec = REC('listen'), all = SET('listen');
    const sub = part => { const o = {}; Object.keys(rec).forEach(k => { const it = all[parseInt(k, 10)]; if (it && (!part || it.part === part)) o[k] = rec[k]; }); return o; };
    const cnt = part => all.filter(x => !part || x.part === part).length;
    let h = header('リスニング', 'パートを えらぼう') + '<div class="ek-box"><p class="ek-small">本番と 同じ パート分けで 練習できるよ。苦手な パートを 集中して やってみよう。まちがえた 問題ほど 出やすく なる。</p></div><div class="ek-grid">';
    h += '<button class="ek-card" data-lp="0"><span class="ek-card-icon">🎧</span><span class="ek-card-name">ミックス (全パート)</span><span class="ek-card-sub">' + cnt(0) + '問 · 正答率 ' + rate(sub(0)) + '</span></button>';
    LPARTS().forEach(([n, nm, ds]) => { h += '<button class="ek-card" data-lp="' + n + '"><span class="ek-card-icon">' + ['', '💬', '📢', '🏃'][n] + '</span><span class="ek-card-name">Part ' + n + ' ' + nm + '</span><span class="ek-card-sub">' + ds + '<br>' + cnt(n) + '問 · 正答率 ' + rate(sub(n)) + '</span></button>'; });
    h += '</div>';
    const root = area(); root.innerHTML = h; bindGo(root);
    root.querySelectorAll('[data-lp]').forEach(b => b.onclick = () => { sfx('click'); listen(+b.dataset.lp); });
  }
  // 문항 정규화: 복수 설문 (準1級 Part2 = 1지문 2문) · Situation (Part3 = 문제지에 인쇄, 음성 아님)
  function normListen(item) {
    let lines = item.lines.slice(), situation = '';
    if (lines.length && /^Situation:/i.test(lines[0][1])) { situation = lines[0][1].replace(/^Situation:\s*/i, ''); lines = lines.slice(1); }
    const qs = item.qs || [{ q: item.q, options: item.options, answer: item.answer, exp: item.exp }];
    return { part: item.part, lines: lines, situation: situation, qs: qs };
  }
  function listenQ() {
    const root = area();
    if (lq.i >= lq.list.length) {
      root.innerHTML = header('リスニング', '結果') + '<div class="ek-box ek-center"><div class="ek-big">🎧</div><p>' + lq.total + '問中 <b>' + lq.ok + '</b>問 正解</p><button class="ek-primary" id="ekLAgain">次の 10題' + (lq.part ? ' (Part ' + lq.part + ')' : '') + '</button><button class="ek-secondary" data-go="listen">パートを えらぶ</button><button class="ek-secondary" data-go="home">道場に もどる</button></div>';
      bindGo(root); document.getElementById('ekLAgain').onclick = () => { sfx('click'); listen(lq.part); }; return;
    }
    const li = lq.list[lq.i], it = normListen(SET('listen')[li]);
    const partName = it.part === 1 ? ' 会話' : it.part === 3 ? ' Real-Life' : ' 説明文';
    let h = header('リスニング', (lq.i + 1) + ' / ' + lq.list.length + ' ・ Part ' + it.part + partName + (it.qs.length > 1 ? ' (' + it.qs.length + '問)' : ''));
    if (it.situation) h += '<div class="ek-box ek-situation"><div class="ek-script-h">📄 Situation (問題用紙に 印刷されている 文)</div><p>' + esc(it.situation) + '</p><div class="ek-sit-q">' + esc(it.qs[0].q) + '</div></div>';
    h += '<div class="ek-box ek-center"><div class="ek-listen-ico" id="ekWave">🎧</div><p class="ek-small" id="ekStatus">' + (it.situation ? 'Situation と 質問を 読んだら ▶ (本番は 10秒)' : '▶ を 押して 英語を 聞こう (本番は 1回 だけ!)') + '</p>';
    h += '<button class="ek-primary" id="ekPlay">▶ 再生</button></div><div id="ekQ"></div>';
    root.innerHTML = h; bindGo(root);
    let plays = 0, qi = 0;
    const status = t => { const el = document.getElementById('ekStatus'); if (el) el.textContent = t; };
    const finish = () => {
      let sc = '<div class="ek-script"><div class="ek-script-h">📜 スクリプト</div>';
      it.lines.forEach(l => { sc += '<p><b>' + ({ W: '★', M: '☆', N: '' }[l[0]]) + '</b>' + esc(l[1]) + '</p>'; });
      it.qs.forEach((q, k) => { sc += '<p class="ek-script-q">Q' + (it.qs.length > 1 ? (k + 1) : '') + ': ' + esc(q.q) + '</p>'; });
      sc += '</div>';
      const box = document.createElement('div');
      box.innerHTML = sc + '<button class="ek-secondary" id="ekAgain">🔁 もう一度 聞く</button><button class="ek-primary" id="ekNext">次へ →</button>';
      document.getElementById('ekQ').appendChild(box);
      document.getElementById('ekAgain').onclick = () => speakSeq(it.lines);
      document.getElementById('ekNext').onclick = () => { stopSpeak(); lq.i++; listenQ(); };
    };
    const askQ = () => {
      const q = it.qs[qi], label = it.qs.length > 1 ? 'No. ' + (qi + 1) + ' ' : '';
      const printed = !!it.situation;   // 本番: Part1·2 の 質問は 音声のみ, Part3 は 印刷
      status(printed ? 'Question: ' + q.q : '🔊 質問は 音声のみ (本番と 同じ)。選択肢を 見て 答えよう');
      speak((it.qs.length > 1 ? 'Number ' + (qi + 1) + '. ' : 'Question. ') + q.q, 'N');
      const wrap = document.createElement('div');
      wrap.className = 'ek-lq';
      const qlabel = 'Q' + (it.qs.length > 1 ? (qi + 1) : '') + '. ';
      let qh = '<div class="ek-fb-h ek-qtext">' + qlabel + (printed ? esc(q.q) : '🔊 <button class="ek-mini ek-qsay">質問を もう一度 聞く</button>') + '</div><div class="ek-opts">';
      shuffle(q.options.map((o, k) => k)).forEach((k, j) => { qh += '<button class="ek-opt" data-k="' + k + '">' + (j + 1) + '. ' + esc(q.options[k]) + '</button>'; });
      qh += '</div><div class="ek-lfb"></div>';
      wrap.innerHTML = qh;
      document.getElementById('ekQ').appendChild(wrap);
      const qs2 = wrap.querySelector('.ek-qsay'); if (qs2) qs2.onclick = () => speak(q.q, 'N');
      let done = false;
      wrap.querySelectorAll('.ek-opt').forEach(b => b.onclick = () => {
        if (done) return; done = true; stopSpeak();
        const ok = +b.dataset.k === q.answer;
        wrap.querySelectorAll('.ek-opt').forEach(x => { x.disabled = true; if (+x.dataset.k === q.answer) x.classList.add('ok'); });
        if (!ok) b.classList.add('ng');
        sfx(ok ? 'unlock' : 'wrong'); if (typeof Study !== 'undefined') Study.log('eiken', ok, 'listen'); 
        wrap.querySelector('.ek-qtext').textContent = qlabel + q.q;
        lq.total++; if (ok) lq.ok++;
        const rec = REC('listen'); const key = it.qs.length > 1 ? li + '.' + qi : li; const r = rec[key] || [0, 0]; r[ok ? 0 : 1]++; rec[key] = r; save();
        wrap.querySelector('.ek-lfb').innerHTML = '<div class="ek-fb ' + (ok ? 'ok' : 'ng') + '"><div class="ek-fb-h">' + (ok ? '🎉 正解!' : '✗ 正解は 「' + esc(q.options[q.answer]) + '」') + '</div><div class="ek-fb-exp">💡 ' + esc(q.exp) + '</div></div>';
        qi++;
        if (qi < it.qs.length) { const g = speakGen; setTimeout(() => { if (g === speakGen && document.getElementById('ekQ')) askQ(); }, 600); } else finish();
      });
    };
    document.getElementById('ekPlay').onclick = () => {
      const btn = document.getElementById('ekPlay');
      btn.disabled = true; plays++;
      document.getElementById('ekWave').classList.add('on');
      status('🔊 聞いています…');
      speakSeq(it.lines, () => {
        const w = document.getElementById('ekWave'); if (w) w.classList.remove('on');
        if (!document.getElementById('ekQ')) return;
        btn.disabled = false; btn.textContent = '🔁 もう一度 (練習用)';
        if (plays === 1) askQ();
      });
    };
  }

  // ---------- 長文読解 ----------
  let rf = 'all';   // 長文 一覧の 絞りこみ: all / cloze / content / todo
  function readList() {
    const e = data(), all = SET('read');
    const done = all.filter(r => e.read[r.id]).length;
    let h = header('長文読解', '大問2 (空所補充) · 大問3 (内容一致) ・ 全 ' + all.length + '題 · 解いた ' + done);
    const F = [['all', 'すべて', all.length], ['cloze', '🧩 大問2', all.filter(r => r.type === 'cloze').length], ['content', '🔎 大問3', all.filter(r => r.type === 'content').length], ['todo', '⏳ まだ', all.length - done]];
    h += '<div class="ek-pos small" style="grid-template-columns:repeat(4,1fr)">';
    F.forEach(([id, nm, c]) => { h += '<button class="ek-pos-b' + (rf === id ? ' on' : '') + '" data-rf="' + id + '"><span class="ek-pos-n">' + nm + '</span><span class="ek-pos-c">' + c + '題</span></button>'; });
    h += '</div><div class="ek-grid">';
    const L = all.map((r, i) => [r, i]).filter(([r]) => rf === 'all' || (rf === 'todo' ? !e.read[r.id] : r.type === rf));
    L.sort((x, y) => (y[0].real ? 1 : 0) - (x[0].real ? 1 : 0));
    L.forEach(([r, i]) => {
      const d = e.read[r.id];
      h += '<button class="ek-card' + (r.real ? ' real' : '') + (d ? ' done' : '') + '" data-r="' + i + '"><span class="ek-card-icon">' + (r.type === 'cloze' ? '🧩' : '🔎') + '</span><span class="ek-card-name">' + esc(r.title) + '</span><span class="ek-card-sub">' + (r.real ? '🎯 本番サイズ ・ ' : 'ミニ ・ ') + (r.type === 'cloze' ? '空所補充' : '内容一致 ' + r.questions.length + '問') + (d ? ' ・ 前回 ' + d[0] + '/' + d[1] : '') + '</span></button>';
    });
    h += '</div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-rf]').forEach(b => b.onclick = () => { sfx('click'); rf = b.dataset.rf; readList(); });
    area().querySelectorAll('[data-r]').forEach(b => b.onclick = () => { sfx('click'); readTask(+b.dataset.r); });
  }
  function readTask(ri) {
    const r = SET('read')[ri];
    let h = header(esc(r.title), r.type === 'cloze' ? '大問2: 文中の ( ) に 入る ものを 選ぼう' : '大問3: 内容に 合う ものを 選ぼう');
    h += '<div class="ek-box ek-read">';
    r.paragraphs.forEach(p => { h += '<p class="ek-passage">' + esc(p).replace(/\((\d)\)/g, '<span class="ek-blank">( $1 )</span>') + '</p>'; });
    h += '</div>';
    const orders = r.questions.map(() => shuffle([0, 1, 2, 3]));
    r.questions.forEach((q, qi) => {
      h += '<div class="ek-box ek-rq" data-qi="' + qi + '"><div class="ek-fb-h">' + (r.type === 'cloze' ? esc(q.q) + ' に 入るのは?' : 'Q' + (qi + 1) + '. ' + esc(q.q)) + '</div><div class="ek-opts">';
      orders[qi].forEach((o, k) => { h += '<button class="ek-opt" data-o="' + o + '">' + (k + 1) + '. ' + esc(q.options[o]) + '</button>'; });
      h += '</div><div class="ek-rfb"></div></div>';
    });
    h += '<div id="ekReadEnd"></div>';
    area().innerHTML = h; bindGo(area());
    let answered = 0, ok = 0;
    area().querySelectorAll('.ek-rq').forEach(box => {
      const qi = +box.dataset.qi, q = r.questions[qi];
      let done = false;
      box.querySelectorAll('.ek-opt').forEach(b => b.onclick = () => {
        if (done) return; done = true; answered++;
        const good = +b.dataset.o === q.answer; if (good) ok++; if (typeof Study !== 'undefined') Study.log('eiken', good, 'read'); 
        box.querySelectorAll('.ek-opt').forEach(x => { x.disabled = true; if (+x.dataset.o === q.answer) x.classList.add('ok'); });
        if (!good) b.classList.add('ng');
        sfx(good ? 'unlock' : 'wrong');
        box.querySelector('.ek-rfb').innerHTML = '<div class="ek-fb ' + (good ? 'ok' : 'ng') + '"><div class="ek-fb-h">' + (good ? '🎉 正解!' : '✗ 正解は 「' + esc(q.options[q.answer]) + '」') + '</div><div class="ek-fb-exp">💡 ' + esc(q.exp) + '</div></div>';
        if (answered === r.questions.length) {
          data().read[r.id] = [ok, r.questions.length]; save();
          const RS = SET('read'), e2 = data(); let nx = -1;
          for (let k = 1; k <= RS.length; k++) { const j = (ri + k) % RS.length; if (RS[j].type === r.type && RS[j].real === r.real && !e2.read[RS[j].id]) { nx = j; break; } }
          document.getElementById('ekReadEnd').innerHTML = '<div class="ek-box ek-center"><p>' + r.questions.length + '問中 <b>' + ok + '</b>問 正解</p>' + (nx >= 0 ? '<button class="ek-primary" id="ekReadNext">次の ' + (r.type === 'cloze' ? '空所補充' : '内容一致') + ' →</button>' : '') + '<button class="ek-secondary" data-go="read">長文の 一覧へ</button></div>';
          bindGo(document.getElementById('ekReadEnd'));
          const nb = document.getElementById('ekReadNext'); if (nb) nb.onclick = () => { sfx('click'); readTask(nx); const pg = document.getElementById('pageEiken'); if (pg) pg.scrollTop = 0; };
        }
      });
    });
  }


  // ---------- 模擬試験 (本番と 同じ 問題数・順番) ----------
  // 2級: 大問1 17 / 大問2 2題×3 / 大問3 2題×4 / 作文 要約+意見 / リスニング Part1 15 + Part2 15
  // 準1級: 大問1 18 / 大問2 2題×3 / 大問3 3問+4問 / 作文 要約+意見 / リスニング Part1 12 + Part2 6題×2 + Part3 5
  let mk = null;
  const MOCK = {
    g2: { p1: { '語彙': 10, '熟語': 4, '文法': 3 }, cloze: 2, content: [4, 4], L: [[1, 15, 1], [2, 15, 1]], min: 85, lmin: 25 },
    p1: { p1: { '語彙': 14, '熟語': 4 }, cloze: 2, content: [3, 4], L: [[1, 12, 1], [2, 6, 2], [3, 5, 1]], min: 90, lmin: 30 },
  };
  function pickReading(type, nq) {
    const all = SET('read').filter(r => r.type === type && (type === 'cloze' || r.questions.length >= nq));
    const real = shuffle(all.filter(r => r.real)), mini = shuffle(all.filter(r => !r.real));
    return real.concat(mini);
  }
  // 固定の 回 (第1回, 第2回 …): 本番サイズの 長文・リスニング・大問1 を 前から 順に 区切って 割り当てる。
  // 新しい 問題は 配列の 後ろに 追加されるので、既存の 回の 中身は 変わらない (回が 増えるだけ)。
  function mockPlan() {
    const C = MOCK[level], set = P1SET(), R = SET('read'), LS = SET('listen');
    const chunk = (pool, size) => { const out = []; for (let i = 0; i + size <= pool.length; i += size) out.push(pool.slice(i, i + size)); return out; };
    const idx = (arr, f) => arr.map((x, i) => i).filter(i => f(arr[i]));
    const p1 = {}; Object.keys(C.p1).forEach(t => { p1[t] = chunk(idx(set, q => q.tag === t), C.p1[t]); });
    const cloze = chunk(idx(R, r => r.real && r.type === 'cloze'), C.cloze);
    const need = {}; C.content.forEach(nq => { need[nq] = (need[nq] || 0) + 1; });
    const content = {}; Object.keys(need).forEach(nq => { content[nq] = chunk(idx(R, r => r.real && r.type === 'content' && r.questions.length === +nq), need[nq]); });
    const L = C.L.map(([part, n, nq]) => chunk(idx(LS, x => x.part === part && (x.qs ? x.qs.length : 1) === nq), n));
    const lens = [cloze.length].concat(Object.values(content).map(c => c.length), Object.values(p1).map(c => c.length), L.map(c => c.length));
    return { n: Math.min.apply(null, lens), p1: p1, cloze: cloze, content: content, L: L };
  }
  function buildFixed(k) {
    const C = MOCK[level], P = mockPlan(), R = SET('read'), W = SET('write');
    const p1 = []; Object.keys(C.p1).forEach(t => p1.push(...P.p1[t][k]));
    const used = {}; const content = C.content.map(nq => { used[nq] = (used[nq] || 0); return R[P.content[nq][k][used[nq]++]]; });
    const lis = []; P.L.forEach(c => lis.push(...c[k]));
    const ws = W.filter(w => w.type === 'summary'), wo = W.filter(w => w.type === 'opinion');
    const rs = seedRand(1000 + k * 7 + (level === 'p1' ? 500 : 0));
    return { level: level, no: k + 1, p1: p1.map(i => ({ i: i, order: rs.shuf([0, 1, 2, 3]) })), cloze: P.cloze[k].map(i => R[i]), content: content, lis: lis,
      wsum: ws[k % Math.max(1, ws.length)], wop: wo[k % Math.max(1, wo.length)], ans: {}, lans: {}, li: 0, t0: Date.now(), stage: 'read', rscore: null };
  }
  function seedRand(seed) { let x = seed >>> 0 || 1; const r = () => { x = (x * 1103515245 + 12345) >>> 0; return x / 4294967296; }; return { shuf: a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; } }; }
  function buildMock() {
    const C = MOCK[level], set = P1SET();
    const p1 = [];
    Object.keys(C.p1).forEach(t => { p1.push(...shuffle(set.map((q, i) => i).filter(i => set[i].tag === t)).slice(0, C.p1[t])); });
    const clz = pickReading('cloze', 3).slice(0, C.cloze);
    const used = new Set(); const cnt = [];
    C.content.forEach(nq => { const r = pickReading('content', nq).find(x => !used.has(x.id) && x.questions.length >= nq) || pickReading('content', 3).find(x => !used.has(x.id)); if (r) { used.add(r.id); cnt.push(r); } });
    const LS = SET('listen').map((x, i) => [x, i]);
    const lis = [];
    C.L.forEach(([part, n, nq]) => {
      const pool = shuffle(LS.filter(([x]) => x.part === part && ((x.qs ? x.qs.length : 1) === nq)));
      const fallback = shuffle(LS.filter(([x]) => x.part === part));
      (pool.length >= n ? pool : pool.concat(fallback.filter(f => !pool.includes(f)))).slice(0, n).forEach(([x, i]) => lis.push(i));
    });
    const W = SET('write');
    const wsum = shuffle(W.filter(w => w.type === 'summary'))[0], wop = shuffle(W.filter(w => w.type === 'opinion'))[0];
    return { level: level, p1: p1.map(i => ({ i: i, order: shuffle([0, 1, 2, 3]) })), cloze: clz, content: cnt, lis: lis, wsum: wsum, wop: wop,
      ans: {}, lans: {}, li: 0, t0: Date.now(), stage: 'read', rscore: null };
  }
  function mockIntro() {
    const C = MOCK[level], P = mockPlan(), e = data();
    const hist = (e.mock || []).filter(m => m.lv === level);
    let h = header('⏱ 模擬試験', (level === 'p1' ? '準1級' : '2級') + ' 一次試験 (本番形式) ・ 全 ' + P.n + '回');
    h += '<div class="ek-box"><p class="ek-passage">本番と 同じ 問題数・順番で 解きます。途中で 答えは 出ません (最後に まとめて 採点)。</p><ul class="ek-mock-ul">';
    const nP1 = Object.values(C.p1).reduce((a, b) => a + b, 0);
    h += '<li>📝 筆記 (目安 ' + C.min + '分): 大問1 短文空所補充 ' + nP1 + '問 → 大問2 長文空所補充 2題 → 大問3 長文内容一致 ' + C.content.join('問 + ') + '問</li>';
    h += '<li>✍ 作文: 要約 1題 + 意見論述 1題 (筆記の 時間内)</li>';
    h += '<li>🎧 リスニング (約' + C.lmin + '分): ' + C.L.map(l => 'Part' + l[0] + ' ' + l[1] + (l[2] > 1 ? '題×' + l[2] + '問' : '問')).join(' / ') + ' — 音声は 1回だけ</li></ul>';
    h += '<p class="ek-small">第1回〜第' + P.n + '回は それぞれ 別の 問題 (長文・リスニングが 重ならない)。順番に 受けて 本番の 練習を しよう。</p></div>';
    const agg = {}; hist.filter(m => m.s).slice(-5).forEach(m => Object.keys(m.s).forEach(k => { const v = agg[k] || (agg[k] = [0, 0]); v[0] += m.s[k][0]; v[1] += m.s[k][1]; }));
    h += partBox(agg, 'これまでの パート別 (最近 5回)');
    h += '<div class="ek-grid ek-mock-grid">';
    for (let k = 0; k < P.n; k++) {
      const hs = hist.filter(m => m.n === k + 1), last = hs[hs.length - 1];
      const pc = m => Math.round((m.r[0] + m.l[0]) * 100 / (m.r[1] + m.l[1]));
      const best = hs.length ? Math.max.apply(null, hs.map(pc)) : null;
      h += '<button class="ek-card real' + (hs.length ? ' done' : '') + '" data-mk="' + k + '"><span class="ek-card-icon">' + (hs.length ? (best >= 75 ? '🏅' : '📝') : '⏱') + '</span><span class="ek-card-name">第' + (k + 1) + '回</span><span class="ek-card-sub">' + (last ? '前回 R ' + last.r[0] + '/' + last.r[1] + ' ・ L ' + last.l[0] + '/' + last.l[1] + '<br>ベスト ' + best + '%' : 'まだ 受けていない') + '</span></button>';
    }
    h += '</div>';
    h += '<button class="ek-secondary" id="mkRand">🎲 ランダム模試 (ミニ長文も まぜて 出題)</button>';
    h += '<p class="ek-small">※ 問題は すべて この道場の オリジナル問題です。</p>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-mk]').forEach(b => b.onclick = () => { sfx('click'); mk = buildFixed(+b.dataset.mk); mockRead(); });
    document.getElementById('mkRand').onclick = () => { sfx('click'); mk = buildMock(); mockRead(); };
  }
  function mins() { return Math.floor((Date.now() - mk.t0) / 60000); }
  function optBtns(name, opts, order, sel) {
    let h = '<div class="ek-opts two">';
    order.forEach((o, k) => { h += '<button class="ek-opt ek-mopt' + (sel === o ? ' sel' : '') + '" data-name="' + name + '" data-o="' + o + '">' + (k + 1) + '. ' + esc(opts[o]) + '</button>'; });
    return h + '</div>';
  }
  function mockRead() {
    const set = P1SET();
    let n = 0;
    let h = header('⏱ 模擬試験 ・ 筆記' + (mk.no ? ' 第' + mk.no + '回' : ''), '経過 ' + mins() + '分 / 目安 ' + MOCK[mk.level].min + '分');
    h += '<div class="ek-mock-sec">大問1 次の (　) に 入れるのに 最も 適切な ものを 選びなさい。</div>';
    mk.p1.forEach((it, k) => {
      const q = set[it.i]; n++;
      h += '<div class="ek-box ek-mq"><div class="ek-mq-n">(' + n + ')</div><div class="ek-q">' + esc(q.q).replace('( )', '<span class="ek-blank">(　　)</span>') + '</div>' + optBtns('p1_' + k, q.options, it.order, mk.ans['p1_' + k]) + '</div>';
    });
    mk.ro = mk.ro || {};
    const pas = (r, sec) => {
      let x = '<div class="ek-box ek-read"><div class="ek-fb-h">' + esc(r.title) + '</div>';
      r.paragraphs.forEach(p => { x += '<p class="ek-passage">' + esc(p).replace(/\((\d)\)/g, (m, d) => '<span class="ek-blank">( ' + (n + +d) + ' )</span>') + '</p>'; });
      x += '</div>';
      r.questions.forEach((q, qi) => {
        const key = sec + '_' + r.id + '_' + qi; mk.ro[key] = mk.ro[key] || shuffle([0, 1, 2, 3]);
        x += '<div class="ek-box ek-mq"><div class="ek-mq-n">(' + (n + qi + 1) + ')</div>' + (r.type === 'content' ? '<div class="ek-fb-h">' + esc(q.q) + '</div>' : '') + optBtns(key, q.options, mk.ro[key], mk.ans[key]).replace('ek-opts two', 'ek-opts') + '</div>';
      });
      n += r.questions.length;
      return x;
    };
    h += '<div class="ek-mock-sec">大問2 次の 英文を 読み、( ) に 入る 最も 適切な ものを 選びなさい。</div>';
    mk.cloze.forEach(r => { h += pas(r, 'c'); });
    h += '<div class="ek-mock-sec">大問3 次の 英文の 内容に 関して、質問に 対する 最も 適切な 答えを 選びなさい。</div>';
    mk.content.forEach(r => { h += pas(r, 't'); });
    h += '<div class="ek-mock-sec">作文 (要約・意見論述)</div>' + mockWriteHtml();
    h += '<div class="ek-box ek-center"><p id="mkLeft"></p><button class="ek-primary" id="mkToL">筆記を 終えて リスニングへ →</button></div>';
    area().innerHTML = h; bindGo(area());
    const left = () => { const total = document.querySelectorAll('.ek-mq').length; const done = Object.keys(mk.ans).length; document.getElementById('mkLeft').textContent = '解答済み ' + done + ' / ' + total; };
    area().querySelectorAll('.ek-mopt').forEach(b => b.onclick = () => {
      const name = b.dataset.name; mk.ans[name] = +b.dataset.o;
      area().querySelectorAll('.ek-mopt[data-name="' + name + '"]').forEach(x => x.classList.toggle('sel', x === b)); left();
    });
    ['mkSum', 'mkOp'].forEach(id => { const ta = document.getElementById(id); if (!ta) return; const c = document.getElementById(id + 'C'); const w = id === 'mkSum' ? mk.wsum : mk.wop;
      const u = () => { mk[id] = ta.value; const k = wordCount(ta.value); c.textContent = k + ' 語 (目安 ' + w.min + '〜' + w.max + ')'; c.className = 'ek-count ' + (k < w.min ? 'low' : k > w.max ? 'high' : 'good'); }; ta.oninput = u; u(); });
    left();
    document.getElementById('mkToL').onclick = () => {
      const total = document.querySelectorAll('.ek-mq').length, done = Object.keys(mk.ans).length;
      if (done < total && !confirm('未解答が ' + (total - done) + '問 あります。リスニングに 進みますか?')) return;
      mk.rmin = mins(); mk.stage = 'listen'; mk.li = 0; mk.lt0 = Date.now(); mockListen();
    };
  }
  function mockWriteHtml() {
    let h = '';
    [[mk.wsum, 'mkSum'], [mk.wop, 'mkOp']].forEach(([w, id]) => {
      if (!w) return;
      h += '<div class="ek-box"><div class="ek-fb-h">' + (w.type === 'summary' ? '要約' : '意見論述') + '</div>';
      if (w.type === 'summary') w.passage.forEach(p => { h += '<p class="ek-passage">' + esc(p) + '</p>'; });
      else h += '<p class="ek-passage"><b>TOPIC</b><br>' + esc(w.question) + '</p><p class="ek-points"><b>POINTS</b> ' + w.points.map(esc).join(' ・ ') + '</p>';
      h += '<p class="ek-instr">' + esc(w.instruction) + '</p><textarea class="ek-text" id="' + id + '" spellcheck="false" placeholder="ここに 英語で 書こう…">' + esc(mk[id] || '') + '</textarea><div class="ek-count" id="' + id + 'C"></div></div>';
    });
    return h;
  }
  function mockListen() {
    const root = area();
    if (mk.li >= mk.lis.length) return mockResult();
    const idx = mk.lis[mk.li], it = normListen(SET('listen')[idx]);
    const partName = it.part === 1 ? '会話' : it.part === 3 ? 'Real-Life' : '説明文';
    let h = header('⏱ 模擬試験 ・ リスニング', 'No. ' + (mk.li + 1) + ' / ' + mk.lis.length + ' ・ Part ' + it.part + ' ' + partName);
    if (it.situation) h += '<div class="ek-box ek-situation"><div class="ek-script-h">📄 Situation</div><p>' + esc(it.situation) + '</p><div class="ek-sit-q">' + esc(it.qs[0].q) + '</div></div>';
    mk.lo = mk.lo || {};
    it.qs.forEach((q, qi) => {
      const key = idx + '.' + qi; mk.lo[key] = mk.lo[key] || shuffle([0, 1, 2, 3]);
      h += '<div class="ek-box ek-mq">' + (it.qs.length > 1 ? '<div class="ek-mq-n">No.' + (qi + 1) + '</div>' : '') + (it.situation ? '' : '') + optBtns('L_' + key, q.options, mk.lo[key], mk.lans[key]).replace('ek-opts two', 'ek-opts') + '</div>';
    });
    h += '<div class="ek-box ek-center"><div class="ek-listen-ico" id="ekWave">🎧</div><p class="ek-small" id="ekStatus">' + (it.situation ? '10秒で Situation と 質問を 読もう' : '選択肢に 目を 通そう') + '</p><button class="ek-primary" id="mkNextL" disabled>次へ →</button></div>';
    root.innerHTML = h; bindGo(root);
    root.querySelectorAll('.ek-mopt').forEach(b => b.onclick = () => {
      const key = b.dataset.name.slice(2); mk.lans[key] = +b.dataset.o;
      root.querySelectorAll('.ek-mopt[data-name="' + b.dataset.name + '"]').forEach(x => x.classList.toggle('sel', x === b));
    });
    const next = document.getElementById('mkNextL');
    next.onclick = () => { stopSpeak(); mk.li++; mockListen(); };
    const status = t => { const el = document.getElementById('ekStatus'); if (el) el.textContent = t; };
    const g = speakGen;
    setTimeout(() => {
      if (g !== speakGen || !document.getElementById('mkNextL')) return;
      const wave = document.getElementById('ekWave'); if (wave) wave.classList.add('on');
      status('🔊 放送中… (1回のみ)');
      const seq = it.lines.concat(it.qs.map((q, k) => ['N', (it.qs.length > 1 ? 'Number ' + (k + 1) + '. ' : 'Question. ') + q.q]));
      speakSeq(seq, () => { const w = document.getElementById('ekWave'); if (w) w.classList.remove('on'); status('答えを 選んで 次へ'); const n2 = document.getElementById('mkNextL'); if (n2) n2.disabled = false; });
    }, it.situation ? 10000 : 2500);
  }
  // パート別 正答率 (s1〜s3 = 筆記 大問1〜3, L1〜L3 = リスニング Part1〜3)
  const PART_NAME = { s1: '大問1 語句', s2: '大問2 長文空所', s3: '大問3 内容一致', L1: 'Part1 会話', L2: 'Part2 説明文', L3: 'Part3 Real-Life' };
  const PART_GO = { s1: 'p1', s2: 'read', s3: 'read', L1: 'listen', L2: 'listen', L3: 'listen' };
  function partBox(ps, title) {
    const ks = Object.keys(PART_NAME).filter(k => ps[k] && ps[k][1]);
    if (!ks.length) return '';
    const pc = k => Math.round(ps[k][0] * 100 / ps[k][1]);
    const weak = ks.slice().sort((a, b) => pc(a) - pc(b))[0];
    let h = '<div class="ek-box"><div class="ek-fb-h">📊 ' + title + '</div>';
    ks.forEach(k => { const v = pc(k); h += '<div class="ek-pbar' + (k === weak && v < 80 ? ' weak' : '') + '"><span class="ek-pbar-n">' + PART_NAME[k] + '</span><span class="ek-pbar-t"><i style="width:' + v + '%;background:' + (v >= 75 ? '#3a9a6a' : v >= 60 ? '#e0a42a' : '#d9604a') + '"></i></span><span class="ek-pbar-v">' + v + '%<small> ' + ps[k][0] + '/' + ps[k][1] + '</small></span></div>'; });
    if (pc(weak) < 80) h += '<button class="ek-secondary ek-pbar-go" data-go="' + PART_GO[weak] + '">🎯 いちばん 弱い「' + PART_NAME[weak] + '」を 練習する</button>';
    return h + '</div>';
  }
  function mockResult() {
    stopSpeak();
    const set = P1SET(), wrong = [], ps = {};
    const tally = (k, ok) => { const v = ps[k] || (ps[k] = [0, 0]); v[1]++; if (ok) v[0]++; };
    let r1 = 0, rTotal = 0;
    mk.p1.forEach((it, k) => { rTotal++; const q = set[it.i], ok = mk.ans['p1_' + k] === q.answer; tally('s1', ok); if (ok) r1++; else wrong.push({ sec: '大問1', q: q.q, a: q.options[q.answer], exp: q.exp }); });
    let r23 = 0;
    [['c', mk.cloze, '大問2', 's2'], ['t', mk.content, '大問3', 's3']].forEach(([sec, L, nm, sk]) => L.forEach(r => r.questions.forEach((q, qi) => { rTotal++; const ok = mk.ans[sec + '_' + r.id + '_' + qi] === q.answer; tally(sk, ok); if (ok) r23++; else wrong.push({ sec: nm, q: r.title + ' — ' + q.q, a: q.options[q.answer], exp: q.exp }); })));
    let lc = 0, lTotal = 0;
    mk.lis.forEach(idx => { const it = normListen(SET('listen')[idx]); it.qs.forEach((q, qi) => { lTotal++; const ok = mk.lans[idx + '.' + qi] === q.answer; tally('L' + it.part, ok); if (ok) lc++; else wrong.push({ sec: 'リスニング Part' + it.part, q: q.q, a: q.options[q.answer], exp: q.exp }); }); });
    const rr = r1 + r23, pr = Math.round(rr * 100 / rTotal), pl = Math.round(lc * 100 / lTotal);
    const e = data(); e.mock = e.mock || []; e.mock.push({ lv: mk.level, n: mk.no || 0, d: today(), r: [rr, rTotal], l: [lc, lTotal], s: ps }); save();
    if (typeof Study !== 'undefined') { for (let i = 0; i < rTotal; i++) Study.log('eiken', i < rr, 'mockR'); for (let i = 0; i < lTotal; i++) Study.log('eiken', i < lc, 'mockL'); }
    const judge = p => p >= 75 ? '🟢 合格圏' : p >= 60 ? '🟡 あと少し' : '🔴 要復習';
    let h = header('⏱ 模擬試験 ・ 結果', (mk.level === 'p1' ? '準1級' : '2級') + (mk.no ? ' 第' + mk.no + '回' : ' ランダム') + ' ・ 筆記 ' + (mk.rmin || 0) + '分');
    h += '<div class="ek-box"><div class="ek-mres"><div><b>' + rr + '</b> / ' + rTotal + '<span>リーディング ' + pr + '% ' + judge(pr) + '</span></div><div><b>' + lc + '</b> / ' + lTotal + '<span>リスニング ' + pl + '% ' + judge(pl) + '</span></div></div>';
    h += '<p class="ek-small">※ 英検の 合否は CSE スコア (技能ごとの 換算) で 決まります。正答率 7〜8割が 一次合格の おおよその 目安です。作文は 下の モデル解答と 比べて 自己採点しよう。</p></div>';
    h += partBox(ps, 'この回の パート別');
    [[mk.wsum, 'mkSum'], [mk.wop, 'mkOp']].forEach(([w, id]) => { if (!w) return; h += '<div class="ek-box ek-model"><div class="ek-fb-h">✍ ' + (w.type === 'summary' ? '要約' : '意見論述') + ' — あなた ' + wordCount(mk[id] || '') + '語</div><p class="ek-mine">' + esc(mk[id] || '(未記入)') + '</p><div class="ek-fb-h">📖 モデル解答</div><p>' + esc(w.model) + '</p></div>'; });
    if (wrong.length) {
      h += '<div class="ek-mock-sec">❗ まちがえた 問題 (' + wrong.length + ')</div>';
      wrong.forEach(w => { h += '<div class="ek-box ek-mw"><div class="ek-small">' + esc(w.sec) + '</div><div class="ek-fb-en">' + esc(w.q) + '</div><div class="ek-fb-h">正解: ' + esc(w.a) + '</div><div class="ek-fb-exp">💡 ' + esc(w.exp) + '</div></div>'; });
    }
    h += '<button class="ek-primary" data-go="mock">もう一度 受ける</button><button class="ek-secondary" data-go="home">道場に もどる</button>';
    area().innerHTML = h; bindGo(area());
    const p = document.getElementById('pageEiken'); if (p) p.scrollTop = 0;
  }

  // ---------- ライティング ----------
  function wordCount(t) { return (t.trim().match(/[A-Za-z0-9’'-]+/g) || []).length; }
  function writeList() {
    let h = header('ライティング', level === 'p1' ? '準1級: 要約 1題 (60〜70語) + 意見論述 1題 (120〜150語)' : '2級: 要約 1題 + 意見論述 1題 (各16点)');
    h += '<div class="ek-grid">';
    SET('write').forEach((w, i) => {
      const saved = data().write[w.id];
      h += '<button class="ek-card" data-w="' + i + '"><span class="ek-card-icon">' + (w.type === 'summary' ? '🗜' : '💭') + '</span><span class="ek-card-name">' + esc(w.title) + '</span><span class="ek-card-sub">' + (saved ? '✍ ' + wordCount(saved) + '語 書いた' : w.min + '〜' + w.max + '語') + '</span></button>';
    });
    h += '</div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-w]').forEach(b => b.onclick = () => { sfx('click'); writeTask(+b.dataset.w); });
  }
  function writeTask(i) {
    const w = SET('write')[i], e = data();
    let h = header(esc(w.title), w.type === 'summary' ? '要約問題' : '意見論述');
    h += '<div class="ek-box">';
    if (w.type === 'summary') w.passage.forEach(p => { h += '<p class="ek-passage">' + esc(p) + '</p>'; });
    else {
      h += '<p class="ek-passage"><b>TOPIC</b><br>' + esc(w.question) + '</p><p class="ek-points"><b>POINTS</b> ' + w.points.map(esc).join(' ・ ') + '</p>';
    }
    h += '<p class="ek-instr">' + esc(w.instruction) + '</p></div>';
    h += '<textarea class="ek-text" id="ekText" spellcheck="false" placeholder="ここに 英語で 書こう…">' + esc(e.write[w.id] || '') + '</textarea>';
    h += '<div class="ek-count" id="ekCount"></div>';
    h += '<div class="ek-row"><button class="ek-secondary" id="ekCheck">✅ 自己チェック</button><button class="ek-secondary" id="ekModel">📖 モデル解答</button><button class="ek-secondary off" disabled title="準備中">🤖 AI添削 (準備中)</button></div>';
    h += '<div id="ekOut"></div>';
    area().innerHTML = h; bindGo(area());
    const ta = document.getElementById('ekText'), cnt = document.getElementById('ekCount');
    const upd = () => {
      const n = wordCount(ta.value);
      cnt.className = 'ek-count ' + (n < w.min ? 'low' : n > w.max ? 'high' : 'good');
      cnt.textContent = n + ' 語 (目安 ' + w.min + '〜' + w.max + ')' + (n < w.min ? ' ・ もう少し' : n > w.max ? ' ・ 長すぎ' : ' ・ ちょうどいい!');
      e.write[w.id] = ta.value; save();
    };
    ta.oninput = upd; upd();
    document.getElementById('ekModel').onclick = () => {
      sfx('click');
      let o = '<div class="ek-box ek-model"><div class="ek-fb-h">📖 モデル解答 (' + wordCount(w.model) + '語) <button class="ek-mini" id="ekSay">🔊</button></div><p>' + esc(w.model) + '</p><div class="ek-fb-h">💡 書き方の コツ</div><ul>';
      w.tips.forEach(t => { o += '<li>' + esc(t) + '</li>'; });
      document.getElementById('ekOut').innerHTML = o + '</ul></div>';
      document.getElementById('ekSay').onclick = () => speak(w.model, 'N');
    };
    document.getElementById('ekCheck').onclick = () => {
      sfx('click');
      const items = w.type === 'summary'
        ? ['内容: 3つの 段落の 要点 (話題・良い点・問題点 など) が すべて 入っている', '構成: 文と 文が However / Also などで 自然に つながっている', '語彙: 本文の 文を そのまま 写さず、自分の 言葉で 言い換えている', '文法: 主語と 動詞が そろい、時制・三単現の s が 正しい']
        : ['内容: 1文目で 自分の 意見 (賛成/反対) が はっきり 分かる', '内容: 理由が 2つあり、それぞれ 具体例や 説明が ある', '構成: First, / Second, / For these reasons, で 組み立てている', '語彙・文法: 同じ 単語の くり返しが 少なく、文法の ミスが ない'];
      let o = '<div class="ek-box"><div class="ek-fb-h">✅ 自己チェック (英検の 4つの 観点)</div>';
      items.forEach((t, k) => { o += '<label class="ek-chk"><input type="checkbox" data-k="' + k + '"> ' + esc(t) + '</label>'; });
      o += '<div class="ek-small" id="ekChkRes">できている 項目に ✓ を 入れよう</div></div>';
      document.getElementById('ekOut').innerHTML = o;
      const boxes = document.querySelectorAll('.ek-chk input');
      boxes.forEach(b => b.onchange = () => {
        const n = [...boxes].filter(x => x.checked).length;
        document.getElementById('ekChkRes').textContent = n + ' / 4 ' + (n === 4 ? '・ 完ぺき! モデル解答とも 比べてみよう' : '・ ✓ が つかない ところを 書き直そう');
      });
    };
  }

  // ---------- 진입 ----------
  function open(lv) {
    if (lv) level = lv;
    showPage('pageEiken');
    go('home');
  }
  function interview() { EikenInterview.open({ area: area, header: header, bindGo: bindGo, speak: speak, stopSpeak: stopSpeak, data: data, save: () => { try { saveState(); } catch (e) {} }, esc: esc }, level); }
  function stopAll() { stopSpeak(); if (typeof EikenInterview !== 'undefined') EikenInterview.stop(); }
  // 音声 生成用: ゲームで 読み上げる 文の 一覧 [役, 文]
  function speechTexts() {
    const out = [], keep = level;
    ['g2', 'p1'].forEach(lv => {
      level = lv;
      SET('listen').forEach(x => { const it = normListen(x); it.lines.forEach(l => out.push([l[0], l[1]])); it.qs.forEach((q, k) => { out.push(['N', (it.qs.length > 1 ? 'Number ' + (k + 1) + '. ' : 'Question. ') + q.q]); out.push(['N', q.q]); }); });
      wordList(lv).forEach(w => out.push(['N', w.en]));
      SET('write').forEach(w => { if (w.model) out.push(['N', w.model]); });
      P1SET().forEach(q => out.push(['N', q.q.replace('( )', q.options[q.answer])]));   // 大問1 の 解説 🔊
    });
    k1 = true; P1SET().forEach(q => out.push(['N', q.q.replace('( )', q.options[q.answer])])); k1 = false;
    level = keep; return out;
  }
  return { open: open, stop: stopAll, _speechTexts: speechTexts, _speak: speak, _vocabStats: vocabStats, _wordList: wordList };
})();
