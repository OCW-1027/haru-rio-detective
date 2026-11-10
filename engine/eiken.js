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
  function words(level) {
    const has = n => { try { return Array.isArray(eval(n)); } catch (e) { return false; } };
    const pick = names => names.filter(has).flatMap(n => eval(n).map(w => ({ en: w.en, ja: w.ja })));
    const g2 = ['G2_VERBS', 'G2_NOUNS', 'G2_ADJADV', 'G2_VERBS_PLUS', 'G2_NOUNS_PLUS', 'G2_ADJADV_PLUS',
      'G2_VERBS_PLUS2', 'G2_VERBS_PLUS3', 'G2_NOUNS_PLUS2', 'G2_NOUNS_PLUS3', 'G2_ADJADV_PLUS2', 'G2_ADJADV_PLUS3',
      'IDIOMS_G2', 'IDIOMS_G2_PLUS'];
    const p1 = ['G_PRE1_WORDS', 'G_PRE1_WORDS_PLUS', 'G_PRE1_WORDS_PLUS2', 'G_PRE1_WORDS_PLUS3'];
    const seen = new Set();
    return pick(level === 'p1' ? p1 : g2).filter(w => w.en && !seen.has(w.en) && seen.add(w.en));
  }
  let cache = {};
  function wordList(level) { return cache[level] || (cache[level] = words(level)); }

  function data() {
    if (!State.v2) State.v2 = {};
    const e = State.v2.eiken || (State.v2.eiken = {});
    e.srs = e.srs || {}; e.p1 = e.p1 || {}; e.listen = e.listen || {}; e.write = e.write || {};
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
  function voiceFor(role) {
    if (!voices.length) loadVoices();
    const us = voices.filter(v => /en-(US|GB|AU|CA)/i.test(v.lang));
    const pool = us.length ? us : voices;
    if (role === 'M') return pool.find(v => MALE.test(v.name)) || pool[1] || pool[0];
    if (role === 'W') return pool.find(v => FEMALE.test(v.name)) || pool[0];
    return pool.find(v => /en-US/i.test(v.lang)) || pool[0];
  }
  function speak(text, role, onEnd, rate) {
    if (!('speechSynthesis' in window)) { if (onEnd) onEnd(); return; }
    const u = new SpeechSynthesisUtterance(text);
    const v = voiceFor(role || 'N');
    if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
    u.rate = rate || 0.92;
    if (role === 'M' && v && !MALE.test(v.name)) u.pitch = 0.75;
    u.onend = () => onEnd && onEnd();
    u.onerror = () => onEnd && onEnd();
    speechSynthesis.speak(u);
  }
  function stopSpeak() { try { speechSynthesis.cancel(); } catch (e) {} }
  function speakSeq(items, done) {
    stopSpeak();
    let i = 0;
    (function next() { if (i >= items.length) { if (done) done(); return; } const it = items[i++]; speak(it[1], it[0], () => setTimeout(next, 350)); })();
  }

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
  function go(v) { view = v; ({ home: home, vocab: vocab, p1: part1, listen: listen, write: writeList }[v] || home)(); const p = document.getElementById('pageEiken'); if (p) p.scrollTop = 0; }

  // ---------- 홈 ----------
  function vocabStats(lv) {
    const e = data(), list = wordList(lv), t = Date.now();
    let mastered = 0, learning = 0, due = 0;
    list.forEach(w => { const s = e.srs[lv + ':' + w.en]; if (!s) return; if (s[0] >= MASTER_BOX) mastered++; else learning++; if (s[1] <= t) due++; });
    return { total: list.length, mastered: mastered, learning: learning, due: due, fresh: list.length - mastered - learning };
  }
  function rate(obj) { let ok = 0, ng = 0; Object.values(obj).forEach(r => { ok += r[0]; ng += r[1]; }); return ok + ng ? Math.round(ok * 100 / (ok + ng)) + '%' : '—'; }
  function home() {
    const e = data(), vs = vocabStats(level);
    const newLeft = Math.max(0, NEW_PER_DAY - e.newDay.n);
    let h = '<div class="ek-hero"><div><div class="ek-kicker">コラドン&コラリンの</div><h1 class="ek-h1">英検道場</h1>';
    h += '<div class="ek-levels"><button class="ek-lv' + (level === 'g2' ? ' on' : '') + '" data-lv="g2">2級</button><button class="ek-lv' + (level === 'p1' ? ' on' : '') + '" data-lv="p1">準1級</button></div></div>';
    h += '<img src="assets/img/chars/spirits/korarin_greet_01.webp" alt=""></div>';

    h += '<div class="ek-today"><div class="ek-today-h">きょうの 単語</div>';
    h += '<div class="ek-today-row"><span>🔁 復習 <b>' + vs.due + '</b></span><span>🆕 新しい 単語 <b>' + Math.min(newLeft, vs.fresh) + '</b></span><span>✅ 覚えた <b>' + vs.mastered + '</b> / ' + vs.total + '</span></div>';
    h += '<div class="ek-meter"><i style="width:' + (vs.mastered * 100 / vs.total).toFixed(1) + '%"></i><i class="l" style="width:' + (vs.learning * 100 / vs.total).toFixed(1) + '%"></i></div>';
    h += '<button class="ek-primary" data-go="vocab">単語トレーニング 開始 →</button></div>';

    const g2 = level === 'g2';
    const C = [
      { go: 'p1', icon: '✏️', name: '大問1 語句空所補充', sub: g2 ? EIKEN_G2_PART1.length + '問 · 正答率 ' + rate(e.p1) : '準備中', ok: g2 },
      { go: 'listen', icon: '🎧', name: 'リスニング', sub: g2 ? EIKEN_G2_LISTEN.length + '問 · 会話と 説明文' : '準備中', ok: g2 },
      { go: 'write', icon: '📝', name: 'ライティング', sub: g2 ? '要約 · 意見論述 ' + EIKEN_G2_WRITE.length + '題' : '準備中', ok: g2 },
      { icon: '📖', name: '長文読解', sub: '準備中', ok: false },
      { icon: '🎤', name: '面接 (二次)', sub: '準備中', ok: false },
      { icon: '⏱', name: '模擬試験', sub: '準備中', ok: false },
    ];
    h += '<div class="ek-grid">';
    C.forEach(c => { h += '<button class="ek-card' + (c.ok ? '' : ' off') + '"' + (c.ok ? ' data-go="' + c.go + '"' : ' disabled') + '><span class="ek-card-icon">' + c.icon + '</span><span class="ek-card-name">' + c.name + '</span><span class="ek-card-sub">' + c.sub + '</span></button>'; });
    h += '</div>';
    h += '<div class="ek-note">📚 ここの 問題は すべて 英検の 形式に 合わせた オリジナル問題です。本物の 過去問は 英検の 公式サイトで 解けます → <a href="' + OFFICIAL[level] + '" target="_blank" rel="noopener">' + (g2 ? '2級' : '準1級') + 'の 過去問ページ</a></div>';
    area().innerHTML = h;
    bindGo(area());
    area().querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { sfx('click'); level = b.dataset.lv; home(); });
  }

  // ---------- 単語 (간격반복) ----------
  let vq = null;
  function buildVocabQueue() {
    const e = data(), list = wordList(level), t = Date.now();
    const due = shuffle(list.filter(w => { const s = e.srs[level + ':' + w.en]; return s && s[1] <= t; })).slice(0, 20);
    const newLeft = Math.max(0, NEW_PER_DAY - e.newDay.n);
    const fresh = list.filter(w => !e.srs[level + ':' + w.en]).slice(0, Math.min(newLeft, 10));
    return shuffle(due.concat(fresh)).map(w => ({ w: w, retry: false }));
  }
  function vocab() {
    vq = { list: buildVocabQueue(), i: 0, ok: 0, ng: 0 };
    vocabQ();
  }
  function vocabQ() {
    const root = area();
    if (!vq.list.length) {
      root.innerHTML = header('単語トレーニング', level === 'g2' ? '2級' : '準1級') + '<div class="ek-box ek-center"><div class="ek-big">🎉</div><p>きょうの 単語は ぜんぶ 終わりました!<br>また あした 新しい 単語と 復習が 出ます。</p><button class="ek-primary" data-go="home">道場に もどる</button></div>';
      return bindGo(root);
    }
    if (vq.i >= vq.list.length) {
      root.innerHTML = header('単語トレーニング', '結果') + '<div class="ek-box ek-center"><div class="ek-big">' + (vq.ng ? '👍' : '🏆') + '</div><p>正解 <b>' + vq.ok + '</b> ・ まちがい <b>' + vq.ng + '</b></p><p class="ek-small">まちがえた 単語は 少し あとで また 出てきます。</p><button class="ek-primary" data-go="vocab">もう1セット</button><button class="ek-secondary" data-go="home">道場に もどる</button></div>';
      return bindGo(root);
    }
    const e = data(), item = vq.list[vq.i], w = item.w, key = level + ':' + w.en;
    const s = e.srs[key] || [0, 0];
    const reverse = s[0] >= 2 && Math.random() < 0.5;          // 익숙해지면 일→영도 출제
    const pool = wordList(level).filter(x => x.en !== w.en);
    const opts = shuffle([w].concat(shuffle(pool).slice(0, 3)));
    let h = header('単語トレーニング', (vq.i + 1) + ' / ' + vq.list.length + (s[0] ? ' ・ 復習' : ' ・ 🆕 新しい 単語'));
    h += '<div class="ek-box ek-word"><div class="ek-word-main">' + esc(reverse ? w.ja : w.en) + '</div>';
    if (!reverse) h += '<button class="ek-speak" id="ekSay">🔊</button>';
    h += '<div class="ek-word-ask">' + (reverse ? '英語で 言うと?' : '意味は?') + '</div></div>';
    h += '<div class="ek-opts">';
    opts.forEach((o, k) => { h += '<button class="ek-opt" data-k="' + k + '">' + esc(reverse ? o.en : o.ja) + '</button>'; });
    h += '</div><div id="ekFb"></div>';
    area().innerHTML = h; bindGo(area());
    const say = document.getElementById('ekSay');
    if (say) { say.onclick = () => speak(w.en, 'N'); speak(w.en, 'N'); }
    let done = false;
    area().querySelectorAll('.ek-opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = opts[+b.dataset.k] === w;
      area().querySelectorAll('.ek-opt').forEach((x, k) => { x.disabled = true; if (opts[k] === w) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sfx(ok ? 'unlock' : 'wrong');
      const isNew = !e.srs[key];
      if (isNew) e.newDay.n++;
      if (ok && !item.retry) { const nb = Math.min(s[0] + 1, BOX_DAYS.length - 1); e.srs[key] = [nb, Date.now() + BOX_DAYS[nb] * DAY]; vq.ok++; }
      else if (ok) { e.srs[key] = [1, Date.now() + DAY]; vq.ok++; }
      else { e.srs[key] = [0, Date.now()]; vq.ng++; vq.list.push({ w: w, retry: true }); }
      save();
      speak(w.en, 'N');
      document.getElementById('ekFb').innerHTML = '<div class="ek-fb ' + (ok ? 'ok' : 'ng') + '"><b>' + esc(w.en) + '</b> = ' + esc(w.ja) + '</div><button class="ek-primary" id="ekNext">次へ →</button>';
      document.getElementById('ekNext').onclick = () => { vq.i++; vocabQ(); };
    });
  }

  // ---------- 大問1 ----------
  let pq = null;
  function part1() {
    const e = data();
    const idx = EIKEN_G2_PART1.map((q, i) => i);
    const score = i => { const r = e.p1[i]; return r ? (r[1] * 2 - r[0]) : 5; };   // 미풀이·오답 우선
    const pick = shuffle(idx).sort((a, b) => score(b) - score(a)).slice(0, 10);
    pq = { list: shuffle(pick), i: 0, ok: 0 };
    part1Q();
  }
  function part1Q() {
    const root = area();
    if (pq.i >= pq.list.length) {
      root.innerHTML = header('大問1 語句空所補充', '結果') + '<div class="ek-box ek-center"><div class="ek-big">' + (pq.ok >= 8 ? '🏆' : '💪') + '</div><p>' + pq.list.length + '問中 <b>' + pq.ok + '</b>問 正解</p><p class="ek-small">本番の 大問1は 17問。8割 取れれば 合格ペース!</p><button class="ek-primary" data-go="p1">もう10問</button><button class="ek-secondary" data-go="home">道場に もどる</button></div>';
      return bindGo(root);
    }
    const qi = pq.list[pq.i], q = EIKEN_G2_PART1[qi];
    const order = shuffle([0, 1, 2, 3]);
    let h = header('大問1 語句空所補充', (pq.i + 1) + ' / ' + pq.list.length + ' ・ ' + q.tag);
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
      sfx(ok ? 'unlock' : 'wrong');
      const e = data(); const r = e.p1[qi] || [0, 0]; r[ok ? 0 : 1]++; e.p1[qi] = r; save();
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
  let lq = null;
  function listen() { lq = { list: shuffle(EIKEN_G2_LISTEN.map((x, i) => i)), i: 0, ok: 0 }; listenQ(); }
  function listenQ() {
    const root = area();
    if (lq.i >= lq.list.length) {
      root.innerHTML = header('リスニング', '結果') + '<div class="ek-box ek-center"><div class="ek-big">🎧</div><p>' + lq.list.length + '問中 <b>' + lq.ok + '</b>問 正解</p><button class="ek-primary" data-go="listen">もう一度</button><button class="ek-secondary" data-go="home">道場に もどる</button></div>';
      return bindGo(root);
    }
    const li = lq.list[lq.i], item = EIKEN_G2_LISTEN[li];
    let h = header('リスニング', (lq.i + 1) + ' / ' + lq.list.length + ' ・ Part ' + item.part + (item.part === 1 ? ' 会話' : ' 説明文'));
    h += '<div class="ek-box ek-center"><div class="ek-listen-ico" id="ekWave">🎧</div><p class="ek-small" id="ekStatus">▶ を 押して 英語を 聞こう (本番は 1回 だけ!)</p>';
    h += '<button class="ek-primary" id="ekPlay">▶ 再生</button></div><div id="ekQ"></div>';
    root.innerHTML = h; bindGo(root);
    let plays = 0;
    const showQ = () => {
      document.getElementById('ekStatus').textContent = 'Question: ' + item.q;
      let qh = '<div class="ek-opts">';
      item.options.forEach((o, k) => { qh += '<button class="ek-opt" data-k="' + k + '">' + (k + 1) + '. ' + esc(o) + '</button>'; });
      qh += '</div><div id="ekFb"></div>';
      document.getElementById('ekQ').innerHTML = qh;
      let done = false;
      root.querySelectorAll('#ekQ .ek-opt').forEach(b => b.onclick = () => {
        if (done) return; done = true; stopSpeak();
        const ok = +b.dataset.k === item.answer;
        root.querySelectorAll('#ekQ .ek-opt').forEach((x, k) => { x.disabled = true; if (k === item.answer) x.classList.add('ok'); });
        if (!ok) b.classList.add('ng');
        sfx(ok ? 'unlock' : 'wrong');
        const e = data(); const r = e.listen[li] || [0, 0]; r[ok ? 0 : 1]++; e.listen[li] = r; save();
        if (ok) lq.ok++;
        let sc = '<div class="ek-script"><div class="ek-script-h">📜 スクリプト</div>';
        item.lines.forEach(l => { sc += '<p><b>' + ({ W: '★', M: '☆', N: '' }[l[0]]) + '</b>' + esc(l[1]) + '</p>'; });
        sc += '<p class="ek-script-q">Q: ' + esc(item.q) + '</p></div>';
        document.getElementById('ekFb').innerHTML = '<div class="ek-fb ' + (ok ? 'ok' : 'ng') + '"><div class="ek-fb-h">' + (ok ? '🎉 正解!' : '✗ 正解は ' + (item.answer + 1) + '番') + '</div><div class="ek-fb-exp">💡 ' + esc(item.exp) + '</div></div>' + sc +
          '<button class="ek-secondary" id="ekAgain">🔁 もう一度 聞く</button><button class="ek-primary" id="ekNext">次へ →</button>';
        document.getElementById('ekAgain').onclick = () => speakSeq(item.lines);
        document.getElementById('ekNext').onclick = () => { stopSpeak(); lq.i++; listenQ(); };
      });
    };
    document.getElementById('ekPlay').onclick = () => {
      const btn = document.getElementById('ekPlay');
      btn.disabled = true; plays++;
      document.getElementById('ekWave').classList.add('on');
      document.getElementById('ekStatus').textContent = '🔊 聞いています…';
      const seq = item.lines.concat([['N', 'Question. ' + item.q]]);
      speakSeq(seq, () => {
        const w = document.getElementById('ekWave'); if (w) w.classList.remove('on');
        if (!document.getElementById('ekQ')) return;
        btn.disabled = false; btn.textContent = '🔁 もう一度 (練習用)';
        if (plays === 1) showQ();
      });
    };
  }

  // ---------- ライティング ----------
  function wordCount(t) { return (t.trim().match(/[A-Za-z0-9’'-]+/g) || []).length; }
  function writeList() {
    let h = header('ライティング', '2級: 要約 1題 + 意見論述 1題 (各16点)');
    h += '<div class="ek-grid">';
    EIKEN_G2_WRITE.forEach((w, i) => {
      const saved = data().write[w.id];
      h += '<button class="ek-card" data-w="' + i + '"><span class="ek-card-icon">' + (w.type === 'summary' ? '🗜' : '💭') + '</span><span class="ek-card-name">' + esc(w.title) + '</span><span class="ek-card-sub">' + (saved ? '✍ ' + wordCount(saved) + '語 書いた' : w.min + '〜' + w.max + '語') + '</span></button>';
    });
    h += '</div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-w]').forEach(b => b.onclick = () => { sfx('click'); writeTask(+b.dataset.w); });
  }
  function writeTask(i) {
    const w = EIKEN_G2_WRITE[i], e = data();
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
  return { open: open, _speak: speak, _vocabStats: vocabStats, _wordList: wordList };
})();
