/* engine/world.js — 新コンテンツ① コラドン航空 世界追跡 (地理·社会 + 英語の 証言)
 * ブランク団の 怪盗を、手がかり (言語·通貨·国旗·名所·名物·自然) で 追って 世界の 都市を 飛ぶ。
 * 画面: pageWorld (#worldArea). 保存: State.v2.world = { cleared: {caseId: stars}, visited: {cityId: 1} }
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, WORLD_CITIES, WORLD_MAP, Hub
 */
const WorldChase = (function () {
  const KORADON = 'assets/img/chars/spirits/koradon_greet_01.webp';
  const KORADON_IDLE = 'assets/img/chars/spirits/koradon_idle_01.webp';
  const KORARIN = 'assets/img/chars/spirits/korarin_greet_01.webp';
  const HOPS = 4, FUEL = 6;

  const CASES = [
    { id: 'w1', name: '消えた 金の 招き猫', thief: 'ミラージュ', color: '#5b4b8a', item: '浅草の 老舗に かざられていた 金の 招き猫',
      intro: 'ブランク団の 怪盗ミラージュが 金の 招き猫を 盗んで 成田空港から 飛び立った! コラドン航空で 追いかけよう。' },
    { id: 'w2', name: '世界一 小さな 地球儀', thief: 'シャドウ・フォックス', color: '#2f5d62', item: '博物館の 手のひらサイズの 地球儀',
      intro: '博物館から 世界一 小さな 地球儀が 消えた。現場に 残された 黒い キツネの カード… シャドウ・フォックスの しわざだ!' },
    { id: 'w3', name: '奪われた 星図', thief: 'ノクターン', color: '#22325c', item: '天文台に 伝わる 古い 星図',
      intro: '天文台の 古い 星図が 盗まれた。夜にだけ 動く 怪盗ノクターンが 国外へ 逃げたらしい。' },
    { id: 'w4', name: 'オルゴールの 秘密', thief: 'クロッカー', color: '#7a3e2e', item: '100年前の オルゴール',
      intro: '時計店の 100年前の オルゴールが 消えた。時間に うるさい 怪盗クロッカーが 時差を 利用して 逃げている!' },
    { id: 'w5', name: '虹色の 切手', thief: 'パレット', color: '#8a5a1f', item: '世界に 1枚しか ない 虹色の 切手',
      intro: '郵便博物館の 虹色の 切手が ねらわれた。変装の 名人 パレットを 世界の 果てまで 追え!' },
    { id: 'w6', name: 'ブランク団の 地図', thief: 'ゼロ', color: '#333', item: 'ブランク団の アジトを 示す 地図',
      intro: 'ついに ブランク団の 幹部 ゼロが 動いた。アジトの 地図を 持って 逃げている。これを 取り返せば 怪盗ブランクに 近づける!' },
  ];
  const HATS = { top: 'シルクハット', beret: 'ベレー帽', cap: '野球帽' };
  const HATS_EN = { top: 'a tall black top hat', beret: 'a round beret', cap: 'a baseball cap' };
  const ACCS = { scarf: '赤い マフラー', glasses: '丸い メガネ', cane: 'ステッキ' };
  const ACCS_EN = { scarf: 'a long red scarf', glasses: 'round glasses', cane: 'a walking stick' };

  let st = null;
  function area() { return document.getElementById('worldArea'); }
  function esc(s) { return escapeHtml(String(s)); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.world || (State.v2.world = {}); d.cleared = d.cleared || {}; d.visited = d.visited || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  const city = id => WORLD_CITIES.find(c => c.id === id);

  // ---------- 地図 ----------
  function xy(c) { return [(c.lon + 180) / 360 * WORLD_MAP.w, (WORLD_MAP.top - c.lat) * WORLD_MAP.w / 360]; }
  function mapSVG(opts) {
    const W = WORLD_MAP.w, H = WORLD_MAP.h;
    // 関係する 都市だけが 入るように 拡大 (スマホでも 地名が 読める)
    const pts = [].concat(opts.here ? [opts.here] : [], opts.options || [], opts.fly || [], opts.zoomTrail ? opts.trail || [] : []).map(id => xy(city(id)));
    let vx = 0, vy = 0, vw = W, vh = H;
    if (pts.length > 1) {
      let x0 = Math.min(...pts.map(p => p[0])), x1 = Math.max(...pts.map(p => p[0])), y0 = Math.min(...pts.map(p => p[1])), y1 = Math.max(...pts.map(p => p[1]));
      vw = Math.max(x1 - x0 + 160, 320); vh = Math.max(y1 - y0 + 110, vw / 2.2); vw = Math.max(vw, vh * 1.6);
      vw = Math.min(vw, W); vh = Math.min(vh, H);
      vx = Math.min(Math.max((x0 + x1) / 2 - vw / 2, 0), W - vw); vy = Math.min(Math.max((y0 + y1) / 2 - vh / 2, 0), H - vh);
    }
    const k = vw / W, fs = k > 0.8 ? 24 : Math.max(9, 18 * k), r = k > 0.8 ? 9 : Math.max(3.5, 7 * k);
    let s = '<svg class="wc-map" viewBox="' + vx.toFixed(1) + ' ' + vy.toFixed(1) + ' ' + vw.toFixed(1) + ' ' + vh.toFixed(1) + '" role="img" aria-label="世界地図">';
    s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" class="wc-sea"/>';
    s += '<path d="' + WORLD_MAP.land + '" class="wc-land" style="stroke-width:' + (0.6 * k) + '"/><path d="' + WORLD_MAP.borders + '" class="wc-border" style="stroke-width:' + (0.5 * k) + '"/>';
    (opts.trail || []).forEach((id, i, a) => { if (i) { const p = xy(city(a[i - 1])), q = xy(city(id)); s += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" class="wc-trail" style="stroke-width:' + (2.5 * k) + '"/>'; } });
    if (opts.fly) { const p = xy(city(opts.fly[0])), q = xy(city(opts.fly[1])); s += '<line x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '" class="wc-fly" style="stroke-width:' + (3 * k) + '"/>'; }
    (opts.options || []).forEach(id => { const p = xy(city(id)); s += '<g class="wc-opt" data-c="' + id + '"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (r * 2.4) + '" class="wc-hit"/><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" style="stroke-width:' + (2.5 * k) + '"/><text x="' + p[0] + '" y="' + (p[1] - r * 1.8) + '" style="font-size:' + fs + 'px;stroke-width:' + (fs / 4) + 'px">' + esc(city(id).name) + '</text></g>'; });
    if (opts.here) { const p = xy(city(opts.here)); s += '<g class="wc-here"><circle cx="' + p[0] + '" cy="' + p[1] + '" r="' + (r * 1.3) + '" style="stroke-width:' + (3 * k) + '"/><text x="' + p[0] + '" y="' + (p[1] + r * 1.3 + fs * 1.1) + '" style="font-size:' + fs + 'px;stroke-width:' + (fs / 4) + 'px">📍' + esc(city(opts.here).name) + '</text></g>'; }
    return s + '</svg>';
  }
  function km(a, b) {
    const R = 6371, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r;
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2;
    return Math.round(2 * R * Math.asin(Math.sqrt(h)));
  }

  // ---------- 怪盗の シルエット (ブランク団) ----------
  function thiefSVG(t, size) {
    const c = t.color || '#444';
    let hat = '';
    if (t.hat === 'top') hat = '<rect x="38" y="6" width="24" height="22" rx="2" fill="#1b1b1b"/><rect x="30" y="26" width="40" height="5" rx="2" fill="#1b1b1b"/>';
    if (t.hat === 'beret') hat = '<ellipse cx="52" cy="24" rx="20" ry="8" fill="#7a2d3a"/><circle cx="56" cy="16" r="3" fill="#7a2d3a"/>';
    if (t.hat === 'cap') hat = '<path d="M32 28 Q50 10 68 28 Z" fill="#2c5aa0"/><rect x="58" y="25" width="20" height="5" rx="2" fill="#2c5aa0"/>';
    let acc = '';
    if (t.acc === 'scarf') acc = '<path d="M36 50 Q50 58 64 50 L64 56 Q50 64 36 56 Z" fill="#d23b3b"/><rect x="55" y="54" width="8" height="24" rx="3" fill="#d23b3b"/>';
    if (t.acc === 'glasses') acc = '<circle cx="44" cy="38" r="5" fill="none" stroke="#f3e9c6" stroke-width="2"/><circle cx="57" cy="38" r="5" fill="none" stroke="#f3e9c6" stroke-width="2"/><line x1="49" y1="38" x2="52" y2="38" stroke="#f3e9c6" stroke-width="2"/>';
    if (t.acc === 'cane') acc = '<path d="M80 60 L80 112" stroke="#c9a14a" stroke-width="4" stroke-linecap="round"/><path d="M80 60 Q80 52 72 54" stroke="#c9a14a" stroke-width="4" fill="none" stroke-linecap="round"/>';
    return '<svg class="wc-thief" viewBox="0 0 100 120" width="' + (size || 90) + '" height="' + Math.round((size || 90) * 1.2) + '">' +
      '<path d="M22 118 Q24 70 50 58 Q76 70 78 118 Z" fill="' + c + '"/>' +   // マント
      '<circle cx="50" cy="38" r="16" fill="#2a2a2a"/>' +                    // 顔 (影)
      '<rect x="38" y="33" width="24" height="7" rx="3" fill="#fff" opacity="0.92"/>' + // 白い 仮面
      '<circle cx="45" cy="36.5" r="1.8" fill="#222"/><circle cx="55" cy="36.5" r="1.8" fill="#222"/>' +
      hat + acc + '</svg>';
  }

  // ---------- 証言 ----------
  const JA = {
    lang: c => '「' + c.lang + 'の 会話の 本を 読んでいましたよ。」',
    cur: c => '「' + c.cur + 'に 両替したいと 言っていました。」',
    flag: c => '「かばんに ' + c.flag + 'の 旗の シールが はってありました。」',
    sight: c => '「' + c.sight + 'を 見に 行くんだと 話していました。」',
    food: c => '「むこうに 着いたら ' + c.food + 'を 食べるんだって。」',
    nature: c => '「行き先は ' + c.nature + ' ところだと 言っていました。」',
  };
  const EN = {
    lang: c => ['They were studying a small book of ' + c.langEn + ' phrases.', c.lang + 'の 会話の 本で 勉強していました。'],
    cur: c => ['They asked me where they could change their money into ' + c.curEn + '.', 'お金を ' + c.cur + 'に 両替できる 場所を 聞かれました。'],
    flag: c => ['There was a sticker of a flag with ' + c.flagEn + ' on their suitcase.', 'スーツケースに ' + c.flag + 'の 旗の シールが ありました。'],
    sight: c => ['They said they couldn\'t wait to see ' + c.sightEn + '.', c.sight + 'を 見るのが 待ちきれないと 言っていました。'],
    food: c => ['They told me they were going to eat ' + c.foodEn + ' as soon as they arrived.', '着いたら すぐ ' + c.food + 'を 食べると 言っていました。'],
    nature: c => ['Their guidebook was open to a page about ' + c.natureEn + '.', 'ガイドブックは「' + c.nature + '」の ページが 開いていました。'],
  };
  const TRAIT_JA = (k, v) => k === 'hat' ? 'そういえば、その人は ' + HATS[v] + 'を かぶっていました。' : 'そういえば、その人は ' + ACCS[v] + 'を 身につけていました。';
  const TRAIT_EN = (k, v) => k === 'hat' ? ['Oh, and the person was wearing ' + HATS_EN[v] + '.', 'あ、その人は ' + HATS[v] + 'を かぶっていました。'] : ['Oh, and the person had ' + ACCS_EN[v] + '.', 'あ、その人は ' + ACCS[v] + 'を 身につけていました。'];

  function makeWitnesses(next, traitKey, thief) {
    const types = shuffle(['lang', 'cur', 'flag', 'sight', 'food', 'nature']).slice(0, 3);
    const W = [
      { who: '🛂 空港の 係員', ja: JA[types[0]](next) },
      { who: '🏨 ホテルの フロント', ja: JA[types[1]](next) },
      { who: '🧳 旅行者 (英語)', en: EN[types[2]](next) },
    ];
    if (traitKey) {
      const k = shuffle([0, 1, 2])[0];
      if (W[k].en) W[k].trait = TRAIT_EN(traitKey, thief[traitKey]); else W[k].traitJa = TRAIT_JA(traitKey, thief[traitKey]);
    }
    return { w: W, types: types };
  }

  // ---------- 画面: 事件一覧 ----------
  function list() {
    const d = data();
    let h = '<div class="wc-hero"><img src="' + KORADON + '" alt=""><div><div class="wc-kicker">コラドン航空</div><h1 class="wc-h1">世界追跡</h1><p>ブランク団の 怪盗を 手がかりで 追いかけ、世界の 都市へ 飛ぼう! 英語の 証言も あるよ。</p></div></div>';
    h += '<div class="wc-stats">🌍 訪れた 都市 <b>' + Object.keys(d.visited).length + '</b> / ' + WORLD_CITIES.length + '</div>';
    h += '<div class="wc-cases">';
    CASES.forEach((c, i) => {
      const stars = d.cleared[c.id] || 0;
      h += '<button class="wc-case" data-i="' + i + '">' + thiefSVG({ hat: ['top', 'beret', 'cap'][i % 3], acc: ['scarf', 'glasses', 'cane'][(i + 1) % 3], color: c.color }, 56) +
        '<span class="wc-case-t"><b>' + (i + 1) + '. ' + esc(c.name) + '</b><small>怪盗 ' + esc(c.thief) + '</small><span class="wc-stars">' + (stars ? '★'.repeat(stars) + '☆'.repeat(3 - stars) : '未解決') + '</span></span></button>';
    });
    h += '</div><div class="wc-note">💡 遊ぶ たびに 逃げる ルートが 変わります。手がかりを よく 読んで、地図で 次の 都市を 選ぼう。</div>';
    area().innerHTML = h;
    area().querySelectorAll('[data-i]').forEach(b => b.onclick = () => { sfx('click'); start(CASES[+b.dataset.i]); });
  }

  // ---------- ゲーム 開始 ----------
  function start(cs) {
    const pool = shuffle(WORLD_CITIES.filter(c => c.id !== 'tokyo')).map(c => c.id);
    const route = ['tokyo'].concat(pool.slice(0, HOPS));
    const hats = shuffle(Object.keys(HATS)), accs = shuffle(Object.keys(ACCS));
    const thief = { hat: hats[0], acc: accs[0], color: cs.color };
    const traitAt = {}; traitAt[1] = 'hat'; traitAt[2] = 'acc';      // 2番目·3番目の 都市で 特徴が わかる
    st = { cs: cs, route: route, pos: 0, fuel: FUEL, thief: thief, traitAt: traitAt, known: {}, wrong: 0, tzOk: 0, trail: ['tokyo'], heard: {} };
    intro();
  }
  function intro() {
    let h = header();
    h += '<div class="wc-box wc-talk"><img src="' + KORADON + '" alt=""><div><b>コラドン</b><p>' + esc(st.cs.intro) + '</p><p class="wc-small">盗まれた もの: ' + esc(st.cs.item) + '</p></div></div>';
    h += '<div class="wc-box wc-center">' + thiefSVG({ color: st.cs.color }, 80) + '<p>怪盗 <b>' + esc(st.cs.thief) + '</b><br><span class="wc-small">顔は 仮面で わからない。旅の とちゅうで 特徴を 聞き出そう。</span></p></div>';
    h += '<button class="wc-primary" id="wcGo">✈ 東京から 出発!</button>';
    area().innerHTML = h; bindHeader();
    document.getElementById('wcGo').onclick = () => { sfx('click'); cityView(); };
  }
  function header() {
    const cs = st.cs;
    let fuel = ''; for (let i = 0; i < FUEL; i++) fuel += i < st.fuel ? '⛽' : '·';
    return '<div class="wc-head"><button class="wc-back" id="wcBack">← 事件一覧</button><div><div class="wc-title">' + esc(cs.name) + '</div><div class="wc-sub">追跡 ' + st.pos + ' / ' + HOPS + ' ・ 燃料 ' + fuel + '</div></div></div>';
  }
  function bindHeader() { const b = document.getElementById('wcBack'); if (b) b.onclick = () => { sfx('click'); list(); }; }

  // ---------- 都市 ----------
  function cityView() {
    const here = city(st.route[st.pos]);
    data().visited[here.id] = 1; save();
    if (st.pos >= HOPS) return finalView();
    const next = city(st.route[st.pos + 1]);
    const key = here.id + '>' + next.id;
    if (!st.heard[key]) { const m = makeWitnesses(next, st.traitAt[st.pos], st.thief); st.heard[key] = { w: m.w, types: m.types, open: {} }; }
    const H = st.heard[key];
    let h = header();
    h += '<div class="wc-box wc-city"><div class="wc-city-n">📍 ' + esc(here.name) + ' <small>(' + esc(here.country) + ')</small></div><div class="wc-fact">📘 ' + esc(here.fact) + '</div></div>';
    h += mapSVG({ here: here.id, trail: st.trail });
    h += '<div class="wc-h2">🔎 怪盗の 行き先を 聞きこみ しよう</div><div class="wc-wits">';
    H.w.forEach((w, i) => {
      const open = H.open[i];
      h += '<div class="wc-wit' + (open ? ' open' : '') + '"><button class="wc-wit-b" data-w="' + i + '">' + w.who + (open ? '' : ' に 聞く') + '</button>';
      if (open) {
        if (w.en) h += '<div class="wc-en">“' + esc(w.en[0]) + (w.trait ? ' ' + esc(w.trait[0]) : '') + '” <button class="wc-mini" data-say="' + i + '">🔊</button></div><details class="wc-ja"><summary>和訳を 見る</summary>' + esc(w.en[1]) + (w.trait ? ' ' + esc(w.trait[1]) : '') + '</details>';
        else h += '<div class="wc-jaq">' + esc(w.ja) + (w.traitJa ? '<br>' + esc(w.traitJa) : '') + '</div>';
      }
      h += '</div>';
    });
    h += '</div>';
    const known = Object.keys(st.known);
    if (known.length) h += '<div class="wc-box wc-known">🕵 わかった 特徴: ' + known.map(k => k === 'hat' ? HATS[st.known[k]] : ACCS[st.known[k]]).join(' ・ ') + '</div>';
    h += '<button class="wc-primary" id="wcFly"' + (Object.keys(H.open).length ? '' : ' disabled') + '>✈ 次の 行き先を 選ぶ</button>';
    area().innerHTML = h; bindHeader();
    area().querySelectorAll('[data-w]').forEach(b => b.onclick = () => {
      const i = +b.dataset.w; if (H.open[i]) return; sfx('click'); H.open[i] = 1;
      const w = H.w[i]; if (w.trait || w.traitJa) st.known[st.traitAt[st.pos]] = st.thief[st.traitAt[st.pos]];
      cityView(); if (w.en) say(w.en[0] + (w.trait ? ' ' + w.trait[0] : ''));
    });
    area().querySelectorAll('[data-say]').forEach(b => b.onclick = () => { const w = H.w[+b.dataset.say]; say(w.en[0] + (w.trait ? ' ' + w.trait[0] : '')); });
    document.getElementById('wcFly').onclick = () => { sfx('click'); chooseView(); };
  }
  function say(t) {
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = 0.9; const v = speechSynthesis.getVoices().find(v => /en-US/i.test(v.lang)); if (v) u.voice = v; speechSynthesis.speak(u); } catch (e) {}
  }
  function stopSay() { try { speechSynthesis.cancel(); } catch (e) {} }

  function chooseView() {
    const here = city(st.route[st.pos]), next = city(st.route[st.pos + 1]);
    if (!st.opts || st.opts.at !== st.pos) {
      // 聞いた 手がかりと 同じ 特徴を 持つ 都市は 選択肢に 入れない (答えが 1つに 決まるように)
      const H = st.heard[here.id + '>' + next.id], types = H ? H.types : [];
      const clash = c => c.country === next.country || types.some(t => c[t] === next[t]);
      const others = shuffle(WORLD_CITIES.filter(c => c.id !== here.id && c.id !== next.id && !st.trail.includes(c.id) && !clash(c))).slice(0, 3).map(c => c.id);
      st.opts = { at: st.pos, ids: shuffle([next.id].concat(others)), tried: {} };
    }
    let h = header();
    h += '<div class="wc-h2">✈ どこへ 飛ぶ? (地図の 都市か ボタンを タップ)</div>';
    h += mapSVG({ here: here.id, trail: st.trail, options: st.opts.ids.filter(id => !st.opts.tried[id]) });
    h += '<div class="wc-dests">';
    st.opts.ids.forEach(id => { const c = city(id); h += '<button class="wc-dest" data-c="' + id + '"' + (st.opts.tried[id] ? ' disabled' : '') + '><b>' + esc(c.name) + '</b><small>' + esc(c.country) + ' ・ ' + km(here, c).toLocaleString() + 'km</small></button>'; });
    h += '</div><button class="wc-secondary" id="wcBackCity">← 聞きこみに もどる</button>';
    area().innerHTML = h; bindHeader();
    const pick = id => { if (st.opts.tried[id]) return; sfx('click'); fly(id); };
    area().querySelectorAll('.wc-dest').forEach(b => b.onclick = () => pick(b.dataset.c));
    area().querySelectorAll('.wc-opt').forEach(g => g.onclick = () => pick(g.dataset.c));
    document.getElementById('wcBackCity').onclick = () => { sfx('click'); cityView(); };
  }
  function fly(id) {
    const here = city(st.route[st.pos]), dest = city(id), right = id === st.route[st.pos + 1];
    const d = km(here, dest), hours = Math.round((d / 850 + 0.5) * 10) / 10;
    let h = header();
    h += mapSVG({ trail: st.trail, fly: [here.id, id], here: here.id });
    h += '<div class="wc-box wc-center"><div class="wc-plane">✈</div><p><b>' + esc(here.name) + '</b> → <b>' + esc(dest.name) + '</b><br>距離 約 ' + d.toLocaleString() + 'km ・ 飛行時間 約 ' + hours + '時間</p></div>';
    area().innerHTML = h; bindHeader();
    setTimeout(() => {
      if (!document.querySelector('.wc-plane')) return;
      if (right) { st.pos++; st.trail.push(id); st.opts = null; tzQuiz(dest); }
      else {
        st.fuel--; st.wrong++; st.opts.tried[id] = 1; sfx('wrong');
        let m = header();
        m += '<div class="wc-box wc-talk"><img src="' + KORADON_IDLE + '" alt=""><div><b>コラドン</b><p>' + esc(dest.name) + 'には 怪盗の 足あとが ない… ちがう 都市だったみたい。燃料を 1つ 使ってしまった。もどって 手がかりを 見直そう!</p><p class="wc-small">📘 ' + esc(dest.fact) + '</p></div></div>';
        if (st.fuel <= 0) { m += '<div class="wc-box wc-center"><p>⛽ 燃料が なくなった… 怪盗に 逃げられた!</p></div><button class="wc-primary" id="wcRetry">もう一度 挑戦</button>'; }
        else m += '<button class="wc-primary" id="wcRe">' + esc(here.name) + 'に もどる</button>';
        area().innerHTML = m; bindHeader();
        const r = document.getElementById('wcRe'); if (r) r.onclick = () => { sfx('click'); chooseView(); };
        const rt = document.getElementById('wcRetry'); if (rt) rt.onclick = () => { sfx('click'); start(st.cs); };
      }
    }, 1400);
  }
  function clock(h) {
    h = ((h % 24) + 24) % 24; const hh = Math.floor(h), mm = Math.round((h - hh) * 60);
    return (hh < 12 ? '午前' : '午後') + ((hh % 12) || 12) + '時' + (mm ? mm + '分' : '');
  }
  function tzQuiz(c) {
    const ans = 12 + (c.tz - 9);
    const cand = [ans, 12 - (c.tz - 9), ans + 1, ans - 1, ans + 2, ans - 3].map(x => ((x % 24) + 24) % 24);
    const opts = []; cand.forEach(x => { if (!opts.some(o => o === x) && opts.length < 4) opts.push(x); });
    const order = shuffle(opts);
    let h = header();
    h += '<div class="wc-box wc-center"><div class="wc-city-n">🛬 ' + esc(c.name) + ' に 到着!</div><p>怪盗の 足あとを 見つけた! 追跡 成功。</p></div>';
    h += '<div class="wc-box"><div class="wc-h2">⏰ 時差クイズ (ボーナス燃料)</div><p>東京が <b>正午 (午後12時)</b> の とき、' + esc(c.name) + ' は 何時? <span class="wc-small">(日本は UTC+9、' + esc(c.name) + 'は UTC' + (c.tz >= 0 ? '+' : '') + c.tz + ')</span></p><div class="wc-tz">';
    order.forEach(x => { h += '<button class="wc-dest" data-t="' + x + '">' + clock(x) + '</button>'; });
    h += '</div><div id="wcTzFb"></div></div>';
    area().innerHTML = h; bindHeader();
    let done = false;
    area().querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = +b.dataset.t === ((ans % 24) + 24) % 24;
      area().querySelectorAll('[data-t]').forEach(x => { x.disabled = true; if (+x.dataset.t === ((ans % 24) + 24) % 24) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sfx(ok ? 'unlock' : 'wrong');
      if (ok) { st.tzOk++; st.fuel = Math.min(FUEL, st.fuel + 1); }
      const diff = c.tz - 9;
      document.getElementById('wcTzFb').innerHTML = '<div class="wc-fb ' + (ok ? 'ok' : 'ng') + '">' + (ok ? '🎉 正解! 燃料 +1' : '✗ 正解は ' + clock(ans)) + '<br>時差 = ' + c.tz + ' − 9 = ' + (diff > 0 ? '+' : '') + diff + '時間 → 12時 ' + (diff >= 0 ? '+ ' + diff : '− ' + (-diff)) + ' = ' + clock(ans) + '</div><button class="wc-primary" id="wcNext">次へ →</button>';
      document.getElementById('wcNext').onclick = () => { sfx('click'); cityView(); };
    });
  }

  // ---------- 最後の 都市: 怪盗を 見つける ----------
  function finalView() {
    const here = city(st.route[st.pos]);
    if (!st.suspects) {
      const hats = Object.keys(HATS), accs = Object.keys(ACCS), all = [];
      hats.forEach(hh => accs.forEach(a => { if (!(hh === st.thief.hat && a === st.thief.acc)) all.push({ hat: hh, acc: a }); }));
      // 片方だけ 一致する 人を 入れて、2つの 特徴を 両方 使わないと 選べないようにする
      const half = shuffle(all.filter(s => s.hat === st.thief.hat || s.acc === st.thief.acc));
      st.suspects = shuffle([{ hat: st.thief.hat, acc: st.thief.acc, real: true }].concat(half.slice(0, 2))).map(s => Object.assign({ color: st.cs.color }, s));
      st.susTried = {};
    }
    let h = header();
    h += '<div class="wc-box wc-city"><div class="wc-city-n">📍 ' + esc(here.name) + ' <small>(' + esc(here.country) + ')</small></div><div class="wc-fact">📘 ' + esc(here.fact) + '</div></div>';
    h += '<div class="wc-box wc-talk"><img src="' + KORADON + '" alt=""><div><b>コラドン</b><p>ここが 怪盗の かくれ家だ! 空港に 怪しい 人が 3人… 聞きこみで わかった 特徴で 本物を 見つけよう!</p></div></div>';
    const known = Object.keys(st.known);
    h += '<div class="wc-box wc-known">🕵 わかった 特徴: ' + (known.length ? known.map(k => k === 'hat' ? HATS[st.known[k]] : ACCS[st.known[k]]).join(' ・ ') : '(聞きこみで 特徴を 聞けなかった… 勘で 選ぼう)') + '</div>';
    h += '<div class="wc-sus">';
    st.suspects.forEach((s, i) => { h += '<button class="wc-su" data-s="' + i + '"' + (st.susTried[i] ? ' disabled' : '') + '>' + thiefSVG(s, 84) + '<small>' + HATS[s.hat] + '<br>' + ACCS[s.acc] + '</small></button>'; });
    h += '</div><div id="wcSusFb"></div>';
    area().innerHTML = h; bindHeader();
    area().querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
      const s = st.suspects[+b.dataset.s];
      if (s.real) return success();
      sfx('wrong'); st.susTried[+b.dataset.s] = 1; st.fuel = Math.max(0, st.fuel - 1);
      if (st.fuel <= 0) { area().innerHTML = header() + '<div class="wc-box wc-center"><p>😱 人ちがい! そのすきに 怪盗は 逃げてしまった…</p></div><button class="wc-primary" id="wcRetry">もう一度 挑戦</button>'; bindHeader(); document.getElementById('wcRetry').onclick = () => start(st.cs); return; }
      finalView();
      document.getElementById('wcSusFb').innerHTML = '<div class="wc-fb ng">人ちがいだった! 燃料 −1。特徴を よく 見て!</div>';
    });
  }
  function success() {
    sfx('unlock');
    const stars = st.fuel >= 5 ? 3 : st.fuel >= 3 ? 2 : 1;
    const d = data(); d.cleared[st.cs.id] = Math.max(d.cleared[st.cs.id] || 0, stars); save();
    let h = header();
    h += '<div class="wc-box wc-center"><div class="wc-big">🎉</div><p>怪盗 <b>' + esc(st.cs.thief) + '</b> を つかまえた!<br>「' + esc(st.cs.item) + '」を 取り返した!</p><div class="wc-stars big">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div><p class="wc-small">まちがった 飛行 ' + st.wrong + '回 ・ 時差クイズ 正解 ' + st.tzOk + '回</p></div>';
    h += mapSVG({ trail: st.trail, here: st.route[st.pos] });
    h += '<div class="wc-box wc-talk"><img src="' + KORARIN + '" alt=""><div><b>コラリンの まとめ</b><ul class="wc-sum">';
    st.trail.forEach(id => { const c = city(id); h += '<li><b>' + esc(c.name) + '</b> (' + esc(c.country) + ') — ' + esc(c.lang) + ' / 通貨 ' + esc(c.cur) + ' / UTC' + (c.tz >= 0 ? '+' : '') + c.tz + '</li>'; });
    h += '</ul></div></div><button class="wc-primary" id="wcList">事件一覧へ</button><button class="wc-secondary" id="wcAgain">同じ 事件を もう一度 (ルートが 変わる)</button>';
    area().innerHTML = h; bindHeader();
    document.getElementById('wcList').onclick = () => { sfx('click'); list(); };
    document.getElementById('wcAgain').onclick = () => { sfx('click'); start(st.cs); };
  }

  function open() { showPage('pageWorld'); list(); const p = document.getElementById('pageWorld'); if (p) p.scrollTop = 0; }
  return { open: open, stop: stopSay, _city: city, _cases: CASES, _st: () => st };
})();
