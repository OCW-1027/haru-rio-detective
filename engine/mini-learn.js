/* engine/mini-learn.js — 学習ミニゲーム (60秒 タイムアタック)
 * ゲームセンターの 上に 並ぶ「トークン 不要」の ゲーム。目標点を 超えると 1日1回 (ゲームごと) トークン +1。
 *   mental  : 暗算 ラッシュ (インド式の 技を 使う 問題が だんだん 出てくる)
 *   word    : 英単語 スピード (英検 2級 / 準1級 の 単語)
 *   flag    : 国旗 フラッシュ (data/flags.js)
 *   capital : 首都 フラッシュ (data/world-countries.js)
 * 画面: pageMiniLearn / 保存: State.gameStats['ml_' + id].best, State.miniDaily = { d: 'YYYY-MM-DD', got: { id: 1 } }
 * Dependencies: State, saveState, sfx, showPage, buildChapterGrid, escapeHtml, Study, Eiken, FLAGS, WORLDMAP, recordGameBest
 */
const MiniLearn = (function () {
  const SEC = 60;
  const GAMES = [
    { id: 'mental', icon: '🧮', name: '暗算 ラッシュ', desc: '60秒で 何問 とける? インド式の 技が 光る', target: 15, area: 'indian' },
    { id: 'word', icon: '🔤', name: '英単語 スピード', desc: '英検の 単語を 60秒 早押し', target: 18, area: 'eiken' },
    { id: 'flag', icon: '🚩', name: '国旗 フラッシュ', desc: '国旗を 見て 国名を 当てよう', target: 15, area: 'geo' },
    { id: 'capital', icon: '🏙', name: '首都 フラッシュ', desc: '国の 首都を 60秒で 何問?', target: 15, area: 'geo' },
    { id: 'pref', icon: '🗾', name: '県庁所在地 ラッシュ', desc: '47都道府県と 県庁所在地', target: 18, area: 'soc' },
    { id: 'element', icon: '⚗', name: '元素記号 ラッシュ', desc: '元素記号 ⇄ 元素名 (中学・高校 理科)', target: 16, area: 'science' },
  ];
  // [都道府県, 県庁所在地, 地方]
  const PREF = [['北海道','札幌市','北海道'],['青森県','青森市','東北'],['岩手県','盛岡市','東北'],['宮城県','仙台市','東北'],['秋田県','秋田市','東北'],['山形県','山形市','東北'],['福島県','福島市','東北'],
    ['茨城県','水戸市','関東'],['栃木県','宇都宮市','関東'],['群馬県','前橋市','関東'],['埼玉県','さいたま市','関東'],['千葉県','千葉市','関東'],['東京都','東京 (新宿区)','関東'],['神奈川県','横浜市','関東'],
    ['新潟県','新潟市','中部'],['富山県','富山市','中部'],['石川県','金沢市','中部'],['福井県','福井市','中部'],['山梨県','甲府市','中部'],['長野県','長野市','中部'],['岐阜県','岐阜市','中部'],['静岡県','静岡市','中部'],['愛知県','名古屋市','中部'],
    ['三重県','津市','近畿'],['滋賀県','大津市','近畿'],['京都府','京都市','近畿'],['大阪府','大阪市','近畿'],['兵庫県','神戸市','近畿'],['奈良県','奈良市','近畿'],['和歌山県','和歌山市','近畿'],
    ['鳥取県','鳥取市','中国'],['島根県','松江市','中国'],['岡山県','岡山市','中国'],['広島県','広島市','中国'],['山口県','山口市','中国'],
    ['徳島県','徳島市','四国'],['香川県','高松市','四国'],['愛媛県','松山市','四国'],['高知県','高知市','四国'],
    ['福岡県','福岡市','九州・沖縄'],['佐賀県','佐賀市','九州・沖縄'],['長崎県','長崎市','九州・沖縄'],['熊本県','熊本市','九州・沖縄'],['大分県','大分市','九州・沖縄'],['宮崎県','宮崎市','九州・沖縄'],['鹿児島県','鹿児島市','九州・沖縄'],['沖縄県','那覇市','九州・沖縄']];
  // ひっかけ用: 県内の 大きな 都市 (県庁所在地では ない)
  const PREF_TRAP = { '岩手県': '花巻市', '宮城県': '石巻市', '福島県': '郡山市', '茨城県': 'つくば市', '栃木県': '日光市', '群馬県': '高崎市', '埼玉県': '川越市', '神奈川県': '川崎市', '山梨県': '富士吉田市', '長野県': '松本市', '静岡県': '浜松市', '愛知県': '豊田市', '三重県': '四日市市', '滋賀県': '彦根市', '兵庫県': '姫路市', '島根県': '出雲市', '山口県': '下関市', '香川県': '丸亀市', '愛媛県': '今治市', '福岡県': '北九州市', '沖縄県': '沖縄市', '北海道': '函館市', '石川県': '加賀市', '青森県': '八戸市', '鹿児島県': '霧島市', '岐阜県': '大垣市' };
  // [記号, 名前]
  const ELEM = [['H','水素'],['He','ヘリウム'],['Li','リチウム'],['Be','ベリリウム'],['B','ホウ素'],['C','炭素'],['N','窒素'],['O','酸素'],['F','フッ素'],['Ne','ネオン'],
    ['Na','ナトリウム'],['Mg','マグネシウム'],['Al','アルミニウム'],['Si','ケイ素'],['P','リン'],['S','硫黄'],['Cl','塩素'],['Ar','アルゴン'],['K','カリウム'],['Ca','カルシウム'],
    ['Mn','マンガン'],['Fe','鉄'],['Co','コバルト'],['Ni','ニッケル'],['Cu','銅'],['Zn','亜鉛'],['Br','臭素'],['Kr','クリプトン'],['Ag','銀'],['Sn','スズ'],['I','ヨウ素'],['Ba','バリウム'],['Pt','白金'],['Au','金'],['Hg','水銀'],['Pb','鉛'],['U','ウラン'],['Ti','チタン'],['Cr','クロム'],['Xe','キセノン']];
  const $ = id => document.getElementById(id);
  const esc = s => (typeof escapeHtml === 'function' ? escapeHtml(String(s)) : String(s));
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function today() { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function daily() { if (!State.miniDaily || State.miniDaily.d !== today()) State.miniDaily = { d: today(), got: {} }; return State.miniDaily; }
  function best(id) { return (State.gameStats && State.gameStats['ml_' + id] && State.gameStats['ml_' + id].best) || 0; }
  function sound(t) { try { sfx(t); } catch (e) {} }

  // ---------- 暗算 ----------
  // lv 0: 基本 / 1: 技 (11倍・5の2乗・100から・25倍) / 2: 2けた×2けた の 技
  function mentalQ(lv) {
    const T = [];
    T.push(() => { const a = 12 + rnd(78), b = 12 + rnd(78); return { q: a + ' + ' + b, a: a + b, tip: '十の位 → 一の位の 順に たす。' }; });
    T.push(() => { const a = 50 + rnd(50), b = 11 + rnd(a - 11); return { q: a + ' − ' + b, a: a - b, tip: 'ひく数を キリの いい 数に して 調整 (例: −29 = −30 + 1)。' }; });
    T.push(() => { const a = 3 + rnd(7), b = 12 + rnd(38); return { q: b + ' × ' + a, a: a * b, tip: '(十の位 × ' + a + ') + (一の位 × ' + a + ') に 分ける。' }; });
    if (lv >= 1) {
      T.push(() => { const a = 12 + rnd(87); return { q: a + ' × 11', a: a * 11, tip: '11倍: 両はしの 数字の 間に 2つの 和を 入れる (' + String(a)[0] + '|' + (+String(a)[0] + +String(a)[1]) + '|' + String(a)[1] + '、くり上がりに 注意)。' }; });
      T.push(() => { const t = 1 + rnd(9), n = t * 10 + 5; return { q: n + ' × ' + n, a: n * n, tip: '5の 2乗: ' + t + '×' + (t + 1) + '=' + t * (t + 1) + ' の 後ろに 25。' }; });
      T.push(() => { const b = 11 + rnd(88); return { q: '100 − ' + b, a: 100 - b, tip: '100 から ひく: 十の位は 9 から、一の位は 10 から ひく。' }; });
      T.push(() => { const a = 4 + rnd(36); return { q: a + ' × 25', a: a * 25, tip: '25倍 = 100倍して 4で わる。' }; });
      T.push(() => { const a = 12 + rnd(88); return { q: a + ' × 5', a: a * 5, tip: '5倍 = 10倍して 2で わる。' }; });
    }
    if (lv >= 2) {
      T.push(() => { const a = 91 + rnd(9), b = 91 + rnd(9); return { q: a + ' × ' + b, a: a * b, tip: '100に 近い 数: (' + a + '−' + (100 - b) + ')=' + (a + b - 100) + ' の 後ろに ' + (100 - a) + '×' + (100 - b) + '=' + String((100 - a) * (100 - b)).padStart(2, '0') + '。' }; });
      T.push(() => { const t = 1 + rnd(9), u = 1 + rnd(9), a = t * 10 + u, b = t * 10 + (10 - u); return { q: a + ' × ' + b, a: a * b, tip: '十の位が 同じで 一の位の 和が 10: ' + t + '×' + (t + 1) + '=' + t * (t + 1) + ' の 後ろに ' + u + '×' + (10 - u) + '=' + String(u * (10 - u)).padStart(2, '0') + '。' }; });
      T.push(() => { const a = 12 + rnd(88); return { q: a + ' × 99', a: a * 99, tip: '99倍 = 100倍 − 1倍。' }; });
      T.push(() => { const a = 11 + rnd(9), b = 11 + rnd(9); return { q: a + ' × ' + b, a: a * b, tip: '10台 どうし: (' + a + '+' + (b - 10) + ')×10 + ' + (a - 10) + '×' + (b - 10) + '。' }; });
    }
    return pick(T)();
  }

  // ---------- 問題の 作り方 (4択) ----------
  let wordLv = 'g2';
  function choiceQ(id) {
    if (id === 'pref') {
      const row = pick(PREF), rev = Math.random() < 0.35;
      if (rev) {   // 県庁所在地 → 都道府県
        const opts = shuffle([row[0]].concat(shuffle(PREF.filter(r => r !== row && r[2] === row[2]).map(r => r[0])).concat(shuffle(PREF.filter(r => r !== row).map(r => r[0]))).filter((x, i, a) => a.indexOf(x) === i).slice(0, 3)));
        return { prompt: '<div class="ml-word">' + esc(row[1]) + '</div><div class="ml-ask">が 県庁所在地の 都道府県は?</div>', opts: opts, ans: opts.indexOf(row[0]), note: row[1] + ' → ' + row[0] };
      }
      const pool = []; if (PREF_TRAP[row[0]]) pool.push(PREF_TRAP[row[0]]);
      shuffle(PREF.filter(r => r !== row && r[2] === row[2])).forEach(r => { if (pool.length < 3) pool.push(r[1]); });
      while (pool.length < 3) { const x = pick(PREF)[1]; if (x !== row[1] && !pool.includes(x)) pool.push(x); }
      const opts = shuffle([row[1]].concat(pool));
      return { prompt: '<div class="ml-word">' + esc(row[0]) + '</div><div class="ml-ask">の 県庁所在地は? (' + row[2] + '地方)</div>', opts: opts, ans: opts.indexOf(row[1]), note: row[0] + ' → ' + row[1] + (PREF_TRAP[row[0]] && pool.includes(PREF_TRAP[row[0]]) ? ' (' + PREF_TRAP[row[0]] + 'は 県庁所在地ではない)' : '') };
    }
    if (id === 'element') {
      const e = pick(ELEM), sym = Math.random() < 0.5;
      const others = shuffle(ELEM.filter(x => x !== e)).slice(0, 3);
      const opts = shuffle([e].concat(others));
      return { prompt: '<div class="ml-word">' + esc(sym ? e[0] : e[1]) + '</div><div class="ml-ask">' + (sym ? 'この 元素記号の 元素は?' : 'の 元素記号は?') + '</div>', opts: opts.map(x => sym ? x[1] : x[0]), ans: opts.indexOf(e), note: e[0] + ' = ' + e[1] };
    }
    if (id === 'word') {
      const list = (typeof Eiken !== 'undefined' && Eiken._wordList) ? Eiken._wordList(wordLv) : [];
      const w = pick(list), same = list.filter(x => x.pos === w.pos && x.en !== w.en && x.ja !== w.ja);
      const opts = shuffle([w].concat(shuffle(same).slice(0, 3)));
      const ja = Math.random() < 0.3;   // 3割は 日本語 → 英語
      return { prompt: '<div class="ml-word">' + esc(ja ? w.ja : w.en) + '</div><div class="ml-ask">' + (ja ? '英語で 言うと?' : '意味は?') + '</div>', opts: opts.map(o => ja ? o.en : o.ja), ans: opts.indexOf(w), note: w.en + ' = ' + w.ja };
    }
    if (id === 'flag') {
      const names = FLAGS.names(), n = pick(names);
      const like = FLAGS.like(n).filter(x => FLAGS.has(x));
      const pool = shuffle(like).slice(0, 2);
      while (pool.length < 3) { const x = pick(names); if (x !== n && !pool.includes(x)) pool.push(x); }
      const opts = shuffle([n].concat(pool));
      return { prompt: '<div class="ml-flag">' + FLAGS.svg(n) + '</div>', opts: opts, ans: opts.indexOf(n), note: n };
    }
    // capital
    const K = WORLDMAP.K, codes = Object.keys(K).filter(k => K[k][1]);
    const c = pick(codes), cap = K[c][1];
    const sameReg = shuffle(codes.filter(k => k !== c && K[k][2] === K[c][2]).map(k => K[k][1]));
    const pool = []; if (K[c][3]) pool.push(K[c][3]);
    sameReg.forEach(x => { if (pool.length < 3 && x !== cap && !pool.includes(x)) pool.push(x); });
    while (pool.length < 3) { const x = K[pick(codes)][1]; if (x !== cap && !pool.includes(x)) pool.push(x); }
    const opts = shuffle([cap].concat(pool));
    return { prompt: '<div class="ml-word">' + esc(K[c][0]) + '</div><div class="ml-ask">の 首都は?</div>', opts: opts, ans: opts.indexOf(cap), note: K[c][0] + ' → ' + cap + (K[c][3] && pool.includes(K[c][3]) ? ' (' + K[c][3] + 'は 首都ではない)' : '') };
  }

  // ---------- 画面 ----------
  let run = null;
  function area() { return $('miniLearnArea'); }
  function quit() { stop(); try { buildChapterGrid(); } catch (e) {} showPage('pageSelect'); }
  function stop() { if (run) { clearInterval(run.timer); document.removeEventListener('keydown', run.key, true); run = null; } }

  function intro(id) {
    const g = GAMES.find(x => x.id === id);
    let h = '<div class="ml-head"><button class="ml-quit game-back-link" data-back>← ゲーム センター</button></div>';
    h += '<div class="ml-card"><div class="ml-icon">' + g.icon + '</div><h2 class="ml-title">' + g.name + '</h2><p class="ml-desc">' + g.desc + '</p>';
    h += '<div class="ml-meta">🏆 ベスト <b>' + best(id) + '</b> ・ 🎯 目標 <b>' + g.target + '</b>点 → ' + (daily().got[id] ? 'きょうの トークンは もらった ✅' : 'きょう 初めて 超えると トークン +1 🎮') + '</div>';
    if (id === 'word') h += '<div class="ml-lv"><button class="ml-lvb' + (wordLv === 'g2' ? ' on' : '') + '" data-lv="g2">2級</button><button class="ml-lvb' + (wordLv === 'p1' ? ' on' : '') + '" data-lv="p1">準1級</button></div>';
    if (id === 'mental') h += '<p class="ml-small">点が 増えるほど 難しい 問題 (11倍・5の2乗・100に 近い 数の かけ算 …) が 出るよ。まちがえると 技の ヒントが 出る。</p>';
    h += '<button class="ml-go" id="mlGo">▶ スタート</button></div>';
    area().innerHTML = h;
    area().querySelector('.ml-quit').onclick = quit;
    area().querySelectorAll('[data-lv]').forEach(b => b.onclick = () => { wordLv = b.dataset.lv; sound('click'); intro(id); });
    $('mlGo').onclick = () => { sound('click'); play(id); };
  }

  function play(id) {
    stop();
    const g = GAMES.find(x => x.id === id);
    run = { id: id, g: g, score: 0, combo: 0, maxCombo: 0, n: 0, miss: [], end: Date.now() + SEC * 1000, input: '', q: null, lock: false };
    let h = '<div class="ml-hud"><button class="ml-quit game-back-link" data-back>やめる</button><span class="ml-score">⭐ <b id="mlScore">0</b></span><span class="ml-combo" id="mlCombo"></span><span class="ml-time" id="mlTime">' + SEC + '</span></div>';
    h += '<div class="ml-bar"><i id="mlBar"></i></div><div class="ml-stage" id="mlStage"></div>';
    area().innerHTML = h;
    area().querySelector('.ml-quit').onclick = quit;
    run.timer = setInterval(() => {
      const left = Math.max(0, run.end - Date.now());
      $('mlTime').textContent = Math.ceil(left / 1000);
      $('mlBar').style.width = Math.min(100, left / (SEC * 10)) + '%';
      if (left <= 0) finish();
    }, 100);
    run.key = e => {
      if (!run || run.lock) return;
      if (id === 'mental') {
        if (/^[0-9]$/.test(e.key)) { press(e.key); e.preventDefault(); }
        else if (e.key === 'Backspace') { press('⌫'); e.preventDefault(); e.stopPropagation(); }
        else if (e.key === 'Enter') { press('OK'); e.preventDefault(); }
      } else if (/^[1-4]$/.test(e.key)) { const b = area().querySelectorAll('.ml-opt')[+e.key - 1]; if (b) b.click(); }
    };
    document.addEventListener('keydown', run.key, true);
    next();
  }

  function next() {
    if (!run) return;
    run.lock = false; run.input = '';
    const st = $('mlStage');
    if (run.id === 'mental') {
      const lv = run.score >= 14 ? 2 : run.score >= 6 ? 1 : 0;
      run.q = mentalQ(lv);
      let h = '<div class="ml-q">' + run.q.q + ' = <span class="ml-in" id="mlIn">?</span></div><div class="ml-pad">';
      ['7', '8', '9', '4', '5', '6', '1', '2', '3', '⌫', '0', 'OK'].forEach(k => { h += '<button class="ml-key' + (k === 'OK' ? ' ok' : k === '⌫' ? ' bs' : '') + '" data-k="' + k + '">' + k + '</button>'; });
      h += '</div><div class="ml-fb" id="mlFb"></div>';
      st.innerHTML = h;
      st.querySelectorAll('[data-k]').forEach(b => b.onclick = () => press(b.dataset.k));
    } else {
      run.q = choiceQ(run.id);
      let h = '<div class="ml-prompt">' + run.q.prompt + '</div><div class="ml-opts">';
      run.q.opts.forEach((o, k) => { h += '<button class="ml-opt" data-k="' + k + '">' + esc(o) + '</button>'; });
      h += '</div><div class="ml-fb" id="mlFb"></div>';
      st.innerHTML = h;
      st.querySelectorAll('.ml-opt').forEach(b => b.onclick = () => answer(+b.dataset.k === run.q.ans, b));
    }
  }

  function press(k) {
    if (!run || run.lock) return;
    if (k === '⌫') run.input = run.input.slice(0, -1);
    else if (k === 'OK') { if (run.input) answer(+run.input === run.q.a); return; }
    else if (run.input.length < 6) run.input += k;
    const el = $('mlIn'); if (el) el.textContent = run.input || '?';
  }

  function answer(ok, btn) {
    if (!run || run.lock) return;
    run.lock = true; run.n++;
    try { Study.log(run.g.area, ok, 'mini_' + run.id); } catch (e) {}
    const fb = $('mlFb');
    if (ok) {
      run.score++; run.combo++; run.maxCombo = Math.max(run.maxCombo, run.combo);
      if (run.combo > 0 && run.combo % 5 === 0) { run.score++; run.end += 3000; }   // 5連続 → +1点 & +3秒
      sound('unlock');
      if (btn) btn.classList.add('ok');
      if (fb) fb.innerHTML = run.combo % 5 === 0 ? '<span class="ml-bonus">🔥 ' + run.combo + ' 連続! +1点 +3秒</span>' : '';
    } else {
      run.combo = 0;
      sound('click');
      if (run.id === 'mental') { run.miss.push(run.q.q + ' = ' + run.q.a + ' … ' + run.q.tip); if (fb) fb.innerHTML = '<div class="ml-ng">✗ ' + run.q.q + ' = <b>' + run.q.a + '</b><br><span>💡 ' + esc(run.q.tip) + '</span></div>'; }
      else {
        run.miss.push(run.q.note);
        area().querySelectorAll('.ml-opt').forEach((b, k) => { if (k === run.q.ans) b.classList.add('ok'); });
        if (btn) btn.classList.add('ng');
        if (fb) fb.innerHTML = '<div class="ml-ng">✗ ' + esc(run.q.note) + '</div>';
      }
    }
    $('mlScore').textContent = run.score;
    $('mlCombo').textContent = run.combo >= 2 ? '🔥×' + run.combo : '';
    setTimeout(next, ok ? 250 : (run.id === 'mental' ? 1800 : 1100));
  }

  function finish() {
    if (!run) return;
    const r = run; stop();
    const nb = recordGameBest('ml_' + r.id, r.score);
    const d = daily(); let token = false;
    if (r.score >= r.g.target && !d.got[r.id]) { d.got[r.id] = 1; State.gameTokens = (State.gameTokens || 0) + 1; token = true; }
    try { saveState(); } catch (e) {}
    sound(token || nb ? 'chime' : 'click');
    let h = '<div class="ml-head"><button class="ml-quit game-back-link" data-back>← ゲーム センター</button></div>';
    h += '<div class="ml-card"><div class="ml-icon">' + (r.score >= r.g.target ? '🏆' : '⏱') + '</div><h2 class="ml-title">' + r.g.name + ' 結果</h2>';
    h += '<div class="ml-res"><b>' + r.score + '</b> 点</div><div class="ml-meta">' + r.n + '問 挑戦 ・ 最高 ' + r.maxCombo + ' 連続 ・ 🏆 ベスト ' + best(r.id) + (nb ? ' (更新!)' : '') + '</div>';
    if (token) h += '<div class="ml-token">🎮 目標 達成! ゲームトークン +1 (いま ' + State.gameTokens + '個)</div>';
    else if (r.score < r.g.target) h += '<div class="ml-meta">あと ' + (r.g.target - r.score) + '点で 目標!</div>';
    if (r.miss.length) { h += '<div class="ml-miss"><div class="ml-miss-h">❗ まちがえた 問題</div>'; r.miss.slice(0, 12).forEach(m => { h += '<div class="ml-miss-r">' + esc(m) + '</div>'; }); h += '</div>'; }
    h += '<button class="ml-go" id="mlAgain">🔁 もう一度</button></div>';
    area().innerHTML = h;
    area().querySelector('.ml-quit').onclick = quit;
    $('mlAgain').onclick = () => { sound('click'); play(r.id); };
  }

  function open(id) { stop(); showPage('pageMiniLearn'); const p = $('pageMiniLearn'); if (p) p.scrollTop = 0; intro(id); }

  // ゲームセンターの 一覧に 差しこむ HTML
  function menuHtml() {
    const d = daily();
    let h = '<div class="ml-menu"><div class="ml-menu-h">🧠 学習ミニゲーム <span>トークン 不要 ・ 目標点で 1日1回 トークン +1</span></div><div class="ml-menu-grid">';
    GAMES.forEach(g => { h += '<button class="ml-mc" data-ml="' + g.id + '"><span class="ml-mc-i">' + g.icon + '</span><span class="ml-mc-n">' + g.name + '</span><span class="ml-mc-s">🏆 ' + best(g.id) + ' ・ 🎯 ' + g.target + (d.got[g.id] ? ' ✅' : '') + '</span></button>'; });
    return h + '</div></div>';
  }
  function bindMenu(root) { root.querySelectorAll('[data-ml]').forEach(b => b.onclick = () => { sound('click'); open(b.dataset.ml); }); }

  return { open: open, menuHtml: menuHtml, bindMenu: bindMenu, stop: stop, _mentalQ: mentalQ, _choiceQ: choiceQ, GAMES: GAMES };
})();
