/* engine/world.js — 新コンテンツ① コラドン航空 世界追跡 v2
 * ブランク団の 8人の うち だれが 犯人か わからない。各都市で 証言を 集めて
 *   ① 次の 行き先 (言語·通貨·国旗·名所·名物·自然) を 推理し、
 *   ② 犯人の 特徴 (帽子·小物·マント·趣味) を メモして 容疑者ファイルで しぼりこみ、
 *   ③ 逮捕状を 出してから 最後の かくれ家に たどり着く。
 * 証人の 中には ブランク団の 仲間が まぎれていて、うその 行き先 (と うその 特徴) を 言うことが ある。
 * 時間制限: 聞きこみ 2時間 · 飛行時間は 実際の 距離から 計算 · 夜 (22時〜6時) は 現地で 眠る (時差が 効く)。
 * 画面: pageWorldChase (#wcArea). 保存: State.v2.world = { cleared: {caseId: stars}, visited: {cityId: 1} }
 * 絵: assets/img/world/… が あれば 使い、なければ SVG/絵文字で 代用 (docs/GEMINI_ART_REQUEST.md)
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, WORLD_CITIES, WORLD_MAP
 */
const WorldChase = (function () {
  const KORADON = 'assets/img/chars/spirits/koradon_greet_01.webp';
  const KORADON_IDLE = 'assets/img/chars/spirits/koradon_idle_01.webp';
  const KORARIN = 'assets/img/chars/spirits/korarin_greet_01.webp';
  const IMG = 'assets/img/world/';
  const ASK_H = 2;                     // 聞きこみ 1回の 時間

  // ---------- ブランク団 8人 (4つの 特徴 × 2通り。どの 3つが わかっても 1人に しぼれる) ----------
  const T = {
    hat:   { label: '帽子',  v: { top: 'シルクハット', beret: 'ベレー帽' }, en: { top: 'a tall black top hat', beret: 'a beret' } },
    acc:   { label: '小物',  v: { scarf: 'しまもようの マフラー', glasses: '丸い メガネ' }, en: { scarf: 'a striped scarf', glasses: 'round glasses' } },
    cape:  { label: 'マント', v: { red: 'ワインレッドの マント', navy: '紺色の マント' }, en: { red: 'a dark red cape', navy: 'a navy blue cape' } },
    hobby: { label: '趣味',  v: { chess: 'チェス', violin: 'バイオリン' }, en: { chess: 'chess', violin: 'the violin' } },
  };
  const TK = ['hat', 'acc', 'cape', 'hobby'];
  const GANG = [
    { id: 'mirage',   name: 'ミラージュ',         hat: 'top',   acc: 'scarf',   cape: 'red',  hobby: 'chess',  who: 'まぼろしの ように 消える 手品師' },
    { id: 'nocturne', name: 'ノクターン',         hat: 'top',   acc: 'scarf',   cape: 'navy', hobby: 'violin', who: '夜にしか 動かない 無口な 音楽家' },
    { id: 'fox',      name: 'シャドウ・フォックス', hat: 'top',   acc: 'glasses', cape: 'red',  hobby: 'violin', who: 'キツネの ように ずる賢い 青年' },
    { id: 'clocker',  name: 'クロッカー',         hat: 'top',   acc: 'glasses', cape: 'navy', hobby: 'chess',  who: '懐中時計を 手放さない 老紳士' },
    { id: 'palette',  name: 'パレット',           hat: 'beret', acc: 'scarf',   cape: 'red',  hobby: 'violin', who: '変装の 名人の 画家' },
    { id: 'roulette', name: 'ルーレット',         hat: 'beret', acc: 'scarf',   cape: 'navy', hobby: 'chess',  who: 'サイコロ好きの 勝負師の 少女' },
    { id: 'jester',   name: 'ジェスター',         hat: 'beret', acc: 'glasses', cape: 'red',  hobby: 'chess',  who: 'いたずら好きの 道化師' },
    { id: 'zero',     name: 'ゼロ',               hat: 'beret', acc: 'glasses', cape: 'navy', hobby: 'violin', who: 'ブランク団の 幹部。正体は 謎' },
  ];
  // 事件 (後ろほど むずかしい)  hops=飛ぶ 回数  liar=うそつきが 出はじめる 都市番号 (-1 は なし)  liarTrait=うそつきが 特徴も いつわる  en=英語の 証人数  slack=時間の 余裕  allow=まちがった 往復を 何回分 見こむか (max/mid/min = 一番 長い/ふつう/一番 短い 往復 1回分)
  const CASES = [
    { id: 'w1', name: '消えた 金の 招き猫', item: '浅草の 老舗に かざられていた 金の 招き猫', icon: '🐱', hops: 4, liar: -1, liarTrait: false, en: 1, slack: 10, allow: 'max',
      intro: '浅草の 老舗から 金の 招き猫が 盗まれた! 現場には 白い カードが 1枚… ブランク団の しわざだ。8人の 団員の うち、だれが 犯人だろう?' },
    { id: 'w2', name: '世界一 小さな 地球儀', item: '博物館の 手のひらサイズの 地球儀', icon: '🌐', hops: 4, liar: 2, liarTrait: false, en: 1, slack: 8, allow: 'max',
      intro: '博物館から 世界一 小さな 地球儀が 消えた。気をつけて! ブランク団は 証人に なりすまして うその 行き先を 教えることが あるらしい。' },
    { id: 'w3', name: '奪われた 星図', item: '天文台に 伝わる 古い 星図', icon: '🌌', hops: 5, liar: 1, liarTrait: false, en: 1, slack: 6, allow: 'max',
      intro: '天文台の 古い 星図が 盗まれた。犯人は 5つの 都市を 経由して アジトへ 向かう つもりだ。' },
    { id: 'w4', name: 'オルゴールの 秘密', item: '100年前の オルゴール', icon: '🎶', hops: 5, liar: 1, liarTrait: false, en: 2, slack: 4, allow: 'max',
      intro: '時計店の 100年前の オルゴールが 消えた。時差を 利用して 逃げる 犯人を、時計を 読みながら 追え!' },
    { id: 'w5', name: '虹色の 切手', item: '世界に 1枚しか ない 虹色の 切手', icon: '📮', hops: 5, liar: 0, liarTrait: true, en: 2, slack: 2, allow: 'max',
      intro: '郵便博物館の 虹色の 切手が ねらわれた。今回の うそつきは 行き先だけで なく、犯人の 特徴まで いつわるぞ!' },
    { id: 'w6', name: 'ブランク団の 地図', item: 'ブランク団の アジトを 示す 地図', icon: '🗺', hops: 6, liar: 0, liarTrait: true, en: 2, slack: 0, allow: 'max',
      intro: 'ついに ブランク団の アジトの 地図が 動いた。6つの 都市を めぐる 最後の 追跡。うそと 時差を 見ぬいて 逮捕状を 出せ!' },
  ];
  const ROLES = [
    { id: 'airport', ja: '空港の 係員', e: '🛂' }, { id: 'hotel', ja: 'ホテルの フロント', e: '🏨' },
    { id: 'market', ja: '市場の 店主', e: '🧺' }, { id: 'taxi', ja: 'タクシーの 運転手', e: '🚕' },
    { id: 'guide', ja: '博物館の ガイド', e: '🏛' }, { id: 'traveler', ja: '旅行者', e: '🧳' },
  ];
  const DAYS = ['月', '火', '水', '木', '金', '土', '日'];

  let st = null;
  function area() { return document.getElementById('wcArea'); }
  function esc(s) { return escapeHtml(String(s)); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.world || (State.v2.world = {}); d.cleared = d.cleared || {}; d.visited = d.visited || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  const city = id => WORLD_CITIES.find(c => c.id === id);
  const gang = id => GANG.find(g => g.id === id);
  // 絵が あれば 絵、なければ 代わりの 表示
  function art(src, fb, cls) { return '<span class="art-w ' + (cls || '') + '"><img class="art-main" src="' + src + '" alt="" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"><span class="art-fb">' + (fb || '') + '</span></span>'; }

  // ---------- 時刻 (t = 月曜 0:00 UTC からの 時間) ----------
  const mod = (a, n) => ((a % n) + n) % n;
  function clockStr(t, tz) {
    const L = t + tz, d = Math.floor(L / 24), h = mod(L, 24), hh = Math.floor(h + 1e-6), mm = Math.round((h - hh) * 60);
    return DAYS[mod(d, 7)] + '曜 ' + hh + ':' + String(mm).padStart(2, '0');
  }
  function hourStr(h) { h = mod(h, 24); const hh = Math.floor(h + 1e-6), mm = Math.round((h - hh) * 60); return hh + ':' + String(mm).padStart(2, '0'); }
  function flightH(a, b) { return Math.max(2, Math.round(km(a, b) / 850 + 1)); }
  // 夜 (22時〜6時) に なったら 朝 7時まで 眠る。眠った 時間を 返す
  function sleepIfNight(t, tz) {
    const L = t + tz, h = mod(L, 24);
    if (h >= 22) return 24 - h + 7;
    if (h < 6) return 7 - h;
    return 0;
  }

  // ---------- 地図 ----------
  function xy(c) { return [(c.lon + 180) / 360 * WORLD_MAP.w, (WORLD_MAP.top - c.lat) * WORLD_MAP.w / 360]; }
  function mapSVG(opts) {
    const W = WORLD_MAP.w, H = WORLD_MAP.h;
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

  // ---------- 団員の 絵 (絵が ない ときの 代わり) ----------
  function gangSVG(g, size) {
    const cape = !g ? '#555' : g.cape === 'red' ? '#7b1e2b' : '#1f2f5c';
    let hat = '', acc = '', hob = '';
    if (g && g.hat === 'top') hat = '<rect x="38" y="4" width="24" height="24" rx="2" fill="#1b1b1b"/><rect x="30" y="26" width="40" height="5" rx="2" fill="#1b1b1b"/><rect x="38" y="20" width="24" height="4" fill="#8a1c1c"/>';
    if (g && g.hat === 'beret') hat = '<ellipse cx="52" cy="24" rx="21" ry="8" fill="#3d3d3d"/><circle cx="56" cy="15" r="3" fill="#3d3d3d"/>';
    if (g && g.acc === 'scarf') acc = '<path d="M35 50 Q50 58 65 50 L65 57 Q50 65 35 57 Z" fill="#e8c35a"/><path d="M40 52 L42 60 M48 54 L49 62 M56 53 L56 61" stroke="#3b6aa8" stroke-width="3"/><rect x="56" y="55" width="8" height="24" rx="3" fill="#e8c35a"/>';
    if (g && g.acc === 'glasses') acc = '<circle cx="44" cy="37" r="5.5" fill="none" stroke="#e9d9a0" stroke-width="2"/><circle cx="57" cy="37" r="5.5" fill="none" stroke="#e9d9a0" stroke-width="2"/><line x1="49.5" y1="37" x2="51.5" y2="37" stroke="#e9d9a0" stroke-width="2"/>';
    if (g && g.hobby === 'chess') hob = '<g transform="translate(78 88)"><rect x="-7" y="14" width="14" height="4" fill="#f2efe6"/><path d="M-5 14 L-3 2 L3 2 L5 14 Z" fill="#f2efe6"/><circle cx="0" cy="0" r="4" fill="#f2efe6"/></g>';
    if (g && g.hobby === 'violin') hob = '<g transform="translate(80 92) rotate(-25)"><ellipse cx="0" cy="6" rx="6" ry="8" fill="#a5582a"/><rect x="-1.2" y="-14" width="2.4" height="14" fill="#5a2e14"/></g>';
    return '<svg class="wc-thief" viewBox="0 0 100 120" width="' + (size || 90) + '" height="' + Math.round((size || 90) * 1.2) + '">' +
      '<path d="M20 118 Q24 68 50 58 Q76 68 80 118 Z" fill="' + cape + '"/><circle cx="50" cy="38" r="16" fill="#e7c9a9"/>' +
      '<rect x="37" y="32" width="26" height="8" rx="4" fill="#fff"/><circle cx="44" cy="36" r="2" fill="#222"/><circle cx="56" cy="36" r="2" fill="#222"/>' +
      hat + acc + hob + '</svg>';
  }
  function gangPic(g, size) { return art(IMG + 'gang/' + g.id + '.webp', gangSVG(g, size), 'wc-gp'); }
  function rolePic(role) { const r = ROLES.find(x => x.id === role); return art(IMG + 'witness/' + role + '.webp', '<span class="wc-re">' + r.e + '</span>', 'wc-rp'); }

  // ---------- 証言の 文 ----------
  const JA = {
    lang: c => c.lang + 'の 会話の 本を 読んでいましたよ。',
    cur: c => c.cur + 'に 両替したいと 言っていました。',
    flag: c => 'かばんに ' + c.flag + 'の 旗の シールが はってありました。',
    sight: c => c.sight + 'を 見に 行くんだと 話していました。',
    food: c => 'むこうに 着いたら ' + c.food + 'を 食べるんだって。',
    nature: c => '行き先は ' + c.nature + ' ところだと 言っていました。',
  };
  const EN = {
    lang: c => ['They were studying a small book of ' + c.langEn + ' phrases.', c.lang + 'の 会話の 本で 勉強していました。'],
    cur: c => ['They asked me where they could change their money into ' + c.curEn + '.', 'お金を ' + c.cur + 'に 両替できる 場所を 聞かれました。'],
    flag: c => ['There was a sticker of a flag with ' + c.flagEn + ' on their suitcase.', 'スーツケースに ' + c.flag + 'の 旗の シールが ありました。'],
    sight: c => ['They said they couldn\'t wait to see ' + c.sightEn + '.', c.sight + 'を 見るのが 待ちきれないと 言っていました。'],
    food: c => ['They told me they were going to eat ' + c.foodEn + ' as soon as they arrived.', '着いたら すぐ ' + c.food + 'を 食べると 言っていました。'],
    nature: c => ['Their guidebook was open to a page about ' + c.natureEn + '.', 'ガイドブックは「' + c.nature + '」の ページが 開いていました。'],
  };
  function traitJa(k, v) {
    if (k === 'hat') return 'その人は ' + T.hat.v[v] + 'を かぶっていました。';
    if (k === 'acc') return 'その人は ' + T.acc.v[v] + 'を 身につけていました。';
    if (k === 'cape') return 'その人は ' + T.cape.v[v] + 'を はおっていました。';
    return v === 'chess' ? 'その人は 待ち時間に チェスの 駒を 指で 回していました。' : 'その人は バイオリンの ケースを 大事そうに 持っていました。';
  }
  function traitEn(k, v) {
    if (k === 'hat') return ['Oh, and the person was wearing ' + T.hat.en[v] + '.', 'あ、その人は ' + T.hat.v[v] + 'を かぶっていました。'];
    if (k === 'acc') return ['Oh, and the person had ' + T.acc.en[v] + '.', 'あ、その人は ' + T.acc.v[v] + 'を 身につけていました。'];
    if (k === 'cape') return ['Oh, and the person was wearing ' + T.cape.en[v] + '.', 'あ、その人は ' + T.cape.v[v] + 'を はおっていました。'];
    return v === 'chess' ? ['Oh, and the person was playing with a chess piece while waiting.', 'あ、その人は 待っている 間 チェスの 駒で 遊んでいました。'] : ['Oh, and the person was carrying a violin case very carefully.', 'あ、その人は バイオリンの ケースを とても 大事に 持っていました。'];
  }

  // ---------- ルートと 証言を 作る ----------
  function okPair(a, b) { return a.country !== b.country; }
  function buildRun(cs) {
    // ルート: 東京 → hops 都市。同じ 国は 続けない
    let route;
    for (let tries = 0; tries < 50; tries++) {
      const pool = shuffle(WORLD_CITIES.filter(c => c.id !== 'tokyo'));
      route = ['tokyo']; const used = { '日本': 1 };
      for (const c of pool) { if (route.length > cs.hops) break; if (!used[c.country]) { route.push(c.id); used[c.country] = 1; } }
      if (route.length === cs.hops + 1) break;
    }
    const thief = shuffle(GANG)[0];
    // 特徴を 聞ける 都市: 4つの 特徴を ランダムな 順で 配る (都市が 多いときは どこかで 聞けない)
    const keys = shuffle(TK), slots = shuffle([...Array(cs.hops).keys()]).slice(0, 4).sort((a, b) => a - b), traitAt = {};
    slots.forEach((p, i) => { traitAt[p] = keys[i]; });
    const steps = [];
    for (let p = 0; p < cs.hops; p++) steps.push(makeStep(cs, p, city(route[p]), city(route[p + 1]), traitAt[p], thief, route));
    return { route: route, thief: thief, steps: steps };
  }
  function makeStep(cs, p, here, next, traitKey, thief, route) {
    const types = shuffle(Object.keys(JA));
    let decoy = null;
    if (cs.liar >= 0 && p >= cs.liar) {
      const cand = shuffle(WORLD_CITIES.filter(c => !route.includes(c.id) && okPair(c, next) && c.country !== here.country && types.slice(0, 3).every(t => c[t] !== next[t])));
      decoy = cand[0] || null;
    }
    const liar = !!decoy;
    const tTrue = liar ? types.slice(0, 2) : types.slice(0, 3), tLie = liar ? types[2] : null;
    const clash = c => [next, decoy].filter(Boolean).some(x => x.country === c.country || types.slice(0, 3).some(t => c[t] === x[t]));
    const others = shuffle(WORLD_CITIES.filter(c => c.id !== here.id && !route.slice(0, p + 1).includes(c.id) && c.id !== next.id && (!decoy || c.id !== decoy.id) && !clash(c))).slice(0, decoy ? 2 : 3);
    const options = shuffle([next.id].concat(decoy ? [decoy.id] : [], others.map(c => c.id)));
    // 証人 3人
    const roles = shuffle(ROLES.filter(r => r.id !== 'traveler')).slice(0, 3);
    const enIdx = shuffle([0, 1, 2]).slice(0, cs.en);
    const W = [];
    const liarIdx = liar ? Math.floor(Math.random() * 3) : -1;
    let ti = 0;
    for (let i = 0; i < 3; i++) {
      const isLiar = i === liarIdx, type = isLiar ? tLie : tTrue[ti++], target = isLiar ? decoy : next;
      const en = enIdx.includes(i);
      const role = en ? (i === enIdx[0] ? 'traveler' : roles[i].id) : roles[i].id;
      W.push({ role: role, en: en ? EN[type](target) : null, ja: en ? null : JA[type](target), type: type, liar: isLiar, target: target.id });
    }
    if (traitKey) {
      const honest = W.map((w, i) => i).filter(i => !W[i].liar), k = honest[Math.floor(Math.random() * honest.length)];
      W[k].trait = [traitKey, thief[traitKey]];
      if (liar && cs.liarTrait) { const other = Object.keys(T[traitKey].v).find(v => v !== thief[traitKey]); W[liarIdx].trait = [traitKey, other]; }
    }
    W.forEach(w => { if (w.trait) { if (w.en) w.traitEn = traitEn(w.trait[0], w.trait[1]); else w.traitJa = traitJa(w.trait[0], w.trait[1]); } });
    return { w: W, options: options, decoy: decoy ? decoy.id : null, open: {}, tried: {}, liar: liar };
  }
  // 理想の ペース (全員に 聞いて まっすぐ 飛ぶ) から 締め切りを 決める
  function idealEnd(route, t) {
    for (let p = 0; p < route.length - 1; p++) {
      const here = city(route[p]), nx = city(route[p + 1]);
      for (let i = 0; i < 3; i++) { t += ASK_H; t += sleepIfNight(t, here.tz); }
      t += flightH(here, nx); t += sleepIfNight(t, nx.tz);
    }
    return t;
  }

  // ---------- 画面: 事件一覧 ----------
  function list() {
    stopSay();
    const d = data();
    let h = '<div class="wc-hero">' + art(IMG + 'banner.webp', '<img src="' + KORADON + '" alt="">', 'wc-hero-art') + '<div><div class="wc-kicker">コラドン航空</div><h1 class="wc-h1">世界追跡</h1><p>ブランク団の だれかが 宝物を 盗んで 世界へ 逃げた! 証言から 行き先と 犯人の 特徴を 推理し、逮捕状を 出して 追いつめよう。</p></div></div>';
    h += '<div class="wc-stats">🌍 訪れた 都市 <b>' + Object.keys(d.visited).length + '</b> / ' + WORLD_CITIES.length + '</div>';
    h += '<div class="wc-cases">';
    CASES.forEach((c, i) => {
      const stars = d.cleared[c.id] || 0;
      const lv = c.liar < 0 ? '入門' : c.liarTrait ? '超上級' : c.en > 1 ? '上級' : '中級';
      h += '<button class="wc-case" data-i="' + i + '">' + art(IMG + 'items/' + c.id + '.webp', '<span class="wc-ci">' + c.icon + '</span>', 'wc-case-art') +
        '<span class="wc-case-t"><b>' + (i + 1) + '. ' + esc(c.name) + '</b><small>' + lv + ' ・ ' + c.hops + '都市' + (c.liar >= 0 ? ' ・ うそつき証人' : '') + '</small><span class="wc-stars">' + (stars ? '★'.repeat(stars) + '☆'.repeat(3 - stars) : '未解決') + '</span></span></button>';
    });
    h += '</div><div class="wc-h2" style="margin-top:16px">🗂 ブランク団 団員ファイル</div><div class="wc-gang">';
    GANG.forEach(g => { h += '<div class="wc-gm">' + gangPic(g, 64) + '<b>' + esc(g.name) + '</b><small>' + esc(g.who) + '</small></div>'; });
    h += '</div><div class="wc-note">💡 遊ぶ たびに 犯人も ルートも 変わります。<br>① 証言で 次の 行き先を 推理 → ② 特徴を メモ → ③ 容疑者ファイルで 1人に しぼって 逮捕状 → ④ 締め切りまでに 最後の 都市へ!</div>';
    area().innerHTML = h;
    area().querySelectorAll('[data-i]').forEach(b => b.onclick = () => { sfx('click'); start(CASES[+b.dataset.i]); });
  }

  // ---------- ゲーム 開始 ----------
  function start(cs) {
    const run = buildRun(cs);
    const t0 = -1;   // 月曜 8:00 (東京) = 日曜 23:00 UTC
    const rts = run.steps.flatMap((S, p) => S.options.filter(id => id !== run.route[p + 1]).map(id => 2 * flightH(city(run.route[p]), city(id)))).sort((a, b) => a - b);
    const allow = cs.allow === 'max' ? rts[rts.length - 1] : cs.allow === 'mid' ? rts[rts.length >> 1] : cs.allow === 'min' ? rts[0] : 0;
    const deadline = Math.ceil(idealEnd(run.route, t0) + cs.slack + allow + (allow ? 9 : 0));
    st = { cs: cs, route: run.route, steps: run.steps, thief: run.thief, pos: 0, t: t0, deadline: deadline, trail: ['tokyo'],
      memo: [], filt: {}, warrant: null, tickets: 0, wrong: 0, tzOk: 0, log: [] };
    intro();
  }
  function intro() {
    let h = header();
    h += art(IMG + 'cities/tokyo.webp', '', 'wc-cityimg');
    h += '<div class="wc-box wc-talk"><img src="' + KORADON + '" alt=""><div><b>コラドン</b><p>' + esc(st.cs.intro) + '</p><p class="wc-small">盗まれた もの: ' + esc(st.cs.item) + '</p></div></div>';
    h += '<div class="wc-box"><div class="wc-h2">📜 捜査の ルール</div><ul class="wc-rules">' +
      '<li>聞きこみ 1人 = <b>' + ASK_H + '時間</b>。飛行機は 距離で 時間が 決まる (約850km/時)。</li>' +
      '<li>夜 22時〜朝 6時に なると、その 都市の 時刻で 朝 7時まで 眠る。<b>時差</b>に 注意!</li>' +
      '<li>犯人の 特徴は 証言の 中に まざっている。自分で <b>捜査メモ</b>を 見て、容疑者ファイルで しぼりこもう。</li>' +
      (st.cs.liar >= 0 ? '<li>⚠ ' + (st.cs.liar === 0 ? 'どの 都市にも' : (st.cs.liar + 1) + '番目の 都市から') + ' <b>うそつき</b>が 1人 まざる。2人の 証言が 一致する 行き先を 信じよう。' + (st.cs.liarTrait ? ' うそつきは <b>特徴も いつわる</b>!' : '') + '</li>' : '') +
      '<li>最後の 都市に 着く 前に <b>逮捕状</b>を 出しておかないと 逮捕できない。</li></ul>' +
      '<p>⏰ 出発: <b>' + clockStr(st.t, 9) + '</b> (東京)<br>⌛ 締め切り: <b>' + clockStr(st.deadline, 9) + '</b> (東京時間)</p></div>';
    h += '<button class="wc-primary" id="wcGo">🔎 東京で 聞きこみ 開始</button>';
    area().innerHTML = h; bindHeader();
    document.getElementById('wcGo').onclick = () => { sfx('click'); cityView(); };
  }
  function left() { return st.deadline - st.t; }
  function header() {
    const cs = st.cs, here = city(st.route[st.pos]), L = Math.max(0, left());
    return '<div class="wc-head"><button class="wc-back" id="wcBack">← 事件一覧</button><div class="wc-hinfo"><div class="wc-title">' + esc(cs.name) + '</div>' +
      '<div class="wc-sub">追跡 ' + st.pos + ' / ' + cs.hops + ' ・ 🕰 現地 <b>' + clockStr(st.t, here.tz) + '</b> ・ 東京 ' + clockStr(st.t, 9) + '</div>' +
      '<div class="wc-sub ' + (L < 12 ? 'wc-hurry' : '') + '">⌛ 残り <b>' + Math.floor(L) + '時間' + (L % 1 ? Math.round((L % 1) * 60) + '分' : '') + '</b> ・ 🎫 ヒント券 ' + st.tickets + (st.warrant ? ' ・ 📝 逮捕状: ' + esc(gang(st.warrant).name) : '') + '</div></div></div>' +
      '<div class="wc-tools"><button class="wc-tool" id="wcFile">🗂 容疑者ファイル</button><button class="wc-tool" id="wcMemo">📒 捜査メモ (' + st.memo.length + ')</button></div>';
  }
  function bindHeader(back) {
    const b = document.getElementById('wcBack'); if (b) b.onclick = () => { sfx('click'); list(); };
    const f = document.getElementById('wcFile'); if (f) f.onclick = () => { sfx('click'); fileView(back || cityView); };
    const m = document.getElementById('wcMemo'); if (m) m.onclick = () => { sfx('click'); memoView(back || cityView); };
  }
  function spend(h, tz) {
    st.t += h;
    const s = sleepIfNight(st.t, tz);
    if (s) { st.t += s; return s; }
    return 0;
  }
  function timeUp() { return st.t > st.deadline; }
  function failView(msg) {
    sfx('wrong');
    const g = st.thief;
    let h = header();
    h += '<div class="wc-box wc-center"><div class="wc-big">💨</div><p>' + msg + '</p></div>';
    h += '<div class="wc-box wc-center"><p class="wc-small">犯人の 正体は…</p>' + gangPic(g, 96) + '<p><b>' + esc(g.name) + '</b><br><span class="wc-small">' + TK.map(k => T[k].v[g[k]]).join(' ・ ') + '</span></p></div>';
    h += '<button class="wc-primary" id="wcRetry">もう一度 挑戦 (犯人と ルートが 変わる)</button><button class="wc-secondary" id="wcList2">事件一覧へ</button>';
    area().innerHTML = h; bindHeader();
    document.getElementById('wcRetry').onclick = () => { sfx('click'); start(st.cs); };
    document.getElementById('wcList2').onclick = () => { sfx('click'); list(); };
  }

  // ---------- 都市 (聞きこみ) ----------
  function cityView(flash) {
    stopSay();
    const here = city(st.route[st.pos]);
    data().visited[here.id] = 1; save();
    if (st.pos >= st.cs.hops) return finalView();
    if (timeUp()) return failView('⌛ 締め切りを 過ぎてしまった… 犯人は アジトへ 逃げこんだ!');
    const S = st.steps[st.pos];
    let h = header();
    if (flash) h += '<div class="wc-fb ' + (flash.ok ? 'ok' : 'ng') + '">' + flash.msg + '</div>';
    h += art(IMG + 'cities/' + here.id + '.webp', '', 'wc-cityimg');
    h += '<div class="wc-box wc-city"><div class="wc-city-n">📍 ' + esc(here.name) + ' <small>(' + esc(here.country) + ' ・ UTC' + (here.tz >= 0 ? '+' : '') + here.tz + ')</small></div><div class="wc-fact">📘 ' + esc(here.fact) + '</div></div>';
    h += '<div class="wc-h2">🔎 聞きこみ (1人 ' + ASK_H + '時間)</div><div class="wc-wits">';
    S.w.forEach((w, i) => {
      const r = ROLES.find(x => x.id === w.role), open = S.open[i];
      h += '<div class="wc-wit' + (open ? ' open' : '') + (S.marked === i ? ' sus' : '') + '">' + rolePic(w.role) + '<div class="wc-wit-c"><div class="wc-wit-n">' + r.ja + (w.en ? ' <span class="wc-tag">English</span>' : '') + (S.marked === i ? ' <span class="wc-tag ng">🎫 あやしい</span>' : '') + '</div>';
      if (!open) h += '<button class="wc-ask" data-w="' + i + '">💬 話を 聞く (+' + ASK_H + '時間)</button>';
      else if (w.en) h += '<div class="wc-en">“' + esc(w.en[0]) + (w.traitEn ? ' ' + esc(w.traitEn[0]) : '') + '” <button class="wc-mini" data-say="' + i + '">🔊</button></div><details class="wc-ja"><summary>和訳を 見る</summary>' + esc(w.en[1]) + (w.traitEn ? ' ' + esc(w.traitEn[1]) : '') + '</details>';
      else h += '<div class="wc-jaq">「' + esc(w.ja) + (w.traitJa ? ' ' + esc(w.traitJa) : '') + '」</div>';
      h += '</div></div>';
    });
    h += '</div>';
    if (st.tickets > 0 && S.marked === undefined) h += '<button class="wc-secondary" id="wcTicket">🎫 ヒント券を 使う (あやしい 証人を 教えてもらう)</button>';
    h += '<button class="wc-primary" id="wcFly"' + (Object.keys(S.open).length ? '' : ' disabled') + '>✈ 行き先を 決めて 飛ぶ</button>';
    if (!Object.keys(S.open).length) h += '<p class="wc-small wc-center">まず だれかに 話を 聞こう。全員に 聞くと 確実だけど 時間が かかる…</p>';
    area().innerHTML = h; bindHeader();
    area().querySelectorAll('[data-w]').forEach(b => b.onclick = () => {
      const i = +b.dataset.w; if (S.open[i]) return; sfx('click'); S.open[i] = 1;
      const w = S.w[i], r = ROLES.find(x => x.id === w.role);
      const slept = spend(ASK_H, here.tz);
      if (w.trait) st.memo.push({ at: here.name, who: r.ja, k: w.trait[0], v: w.trait[1], step: st.pos, idx: i });
      st.log.push(here.name + ': ' + r.ja + 'に 聞いた');
      cityView(slept ? { ok: false, msg: '🌙 夜に なったので ホテルで 眠った (+' + fmtH(slept) + ')。現地 ' + clockStr(st.t, here.tz) } : null);
      if (w.en) say([w.en[0]].concat(w.traitEn ? [w.traitEn[0]] : []));
    });
    area().querySelectorAll('[data-say]').forEach(b => b.onclick = () => { const w = S.w[+b.dataset.say]; say([w.en[0]].concat(w.traitEn ? [w.traitEn[0]] : [])); });
    const tk = document.getElementById('wcTicket');
    if (tk) tk.onclick = () => {
      sfx('click');
      const li = S.w.findIndex(w => w.liar);
      if (li < 0) { S.marked = -1; cityView({ ok: true, msg: '🎫 コラドン:「この 町の 証人は みんな 本当の ことを 言っているみたい!」(ヒント券は 使わずに すんだ)' }); return; }
      st.tickets--; S.marked = li; cityView({ ok: true, msg: '🎫 コラドン:「' + ROLES.find(x => x.id === S.w[li].role).ja + 'の 話は あやしいぞ… ブランク団の 仲間かも!」' });
    };
    document.getElementById('wcFly').onclick = () => { sfx('click'); chooseView(); };
  }
  function fmtH(h) { const H = Math.floor(h + 1e-6), m = Math.round((h - H) * 60); return (H ? H + '時間' : '') + (m ? m + '分' : ''); }
  // 英語の 証言を 読む: 文ごとに 事前生成音声 (VoicePack)、なければ ブラウザ音声
  let sayGen = 0;
  function say(list) {
    stopSay(); const g = sayGen; list = [].concat(list);
    const tts = (t, done) => { try { const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = 0.9; const v = speechSynthesis.getVoices().find(v => /en-US/i.test(v.lang)); if (v) u.voice = v; u.onend = u.onerror = done; speechSynthesis.speak(u); } catch (e) { done(); } };
    let i = 0;
    (function next() {
      if (g !== sayGen || i >= list.length) return;
      const t = list[i++], done = () => { if (g === sayGen) setTimeout(next, 250); };
      if (typeof VoicePack !== 'undefined' && VoicePack.play(t, 'N', 1, done, () => tts(t, done))) return;
      tts(t, done);
    })();
  }
  function stopSay() { sayGen++; try { speechSynthesis.cancel(); } catch (e) {} if (typeof VoicePack !== 'undefined') VoicePack.stop(); }
  function speechTexts() {
    const o = [];
    WORLD_CITIES.forEach(c => Object.keys(EN).forEach(k => o.push(['N', EN[k](c)[0]])));
    TK.forEach(k => Object.keys(T[k].v).forEach(v => o.push(['N', traitEn(k, v)[0]])));
    return o;
  }

  // ---------- 捜査メモ ----------
  function memoView(back) {
    let h = header();
    h += '<div class="wc-box"><div class="wc-h2">📒 捜査メモ — 犯人の 特徴について の 証言</div>';
    if (!st.memo.length) h += '<p class="wc-small">まだ 特徴の 証言は ない。聞きこみの 中に「その人は…」という 話が まざっているよ。</p>';
    else {
      h += '<table class="wc-memo"><tr><th>都市</th><th>だれ</th><th>' + '特徴</th></tr>';
      st.memo.forEach(m => { h += '<tr><td>' + esc(m.at) + '</td><td>' + esc(m.who) + '</td><td><b>' + T[m.k].label + '</b>: ' + esc(T[m.k].v[m.v]) + '</td></tr>'; });
      h += '</table>';
      const conflict = TK.filter(k => new Set(st.memo.filter(m => m.k === k).map(m => m.v)).size > 1);
      if (conflict.length) h += '<div class="wc-fb ng">⚠ ' + conflict.map(k => T[k].label).join('・') + 'について 証言が 食いちがっている! うそつきは だれ? その 都市で 行き先の 証言が 他の 2人と 合わなかった 人を 思い出そう。</div>';
    }
    h += '</div><div class="wc-box"><div class="wc-h2">🧭 これまでの 足どり</div><p>' + st.trail.map(id => esc(city(id).name)).join(' → ') + '</p></div>';
    h += '<button class="wc-primary" id="wcBk">もどる</button>';
    area().innerHTML = h; bindHeader(back);
    document.getElementById('wcBk').onclick = () => { sfx('click'); back(); };
  }

  // ---------- 容疑者ファイル & 逮捕状 ----------
  function fileView(back) {
    const F = st.filt;
    const cand = GANG.filter(g => TK.every(k => !F[k] || g[k] === F[k]));
    let h = header();
    h += '<div class="wc-box"><div class="wc-h2">🗂 容疑者ファイル — わかった 特徴を 選んで しぼりこもう</div><div class="wc-filt">';
    TK.forEach(k => {
      h += '<div class="wc-fr"><b>' + T[k].label + '</b><button class="wc-fb2' + (!F[k] ? ' on' : '') + '" data-k="' + k + '" data-v="">？</button>';
      Object.keys(T[k].v).forEach(v => { h += '<button class="wc-fb2' + (F[k] === v ? ' on' : '') + '" data-k="' + k + '" data-v="' + v + '">' + esc(T[k].v[v]) + '</button>'; });
      h += '</div>';
    });
    h += '</div><p class="wc-small">あてはまる 団員: <b>' + cand.length + '人</b>' + (cand.length > 1 ? ' — 1人に なるまで 特徴を 集めよう (4つの うち 3つ わかれば しぼれる)' : '') + '</p><div class="wc-gang">';
    GANG.forEach(g => { const ok = cand.includes(g); h += '<div class="wc-gm' + (ok ? '' : ' out') + (st.warrant === g.id ? ' war' : '') + '">' + gangPic(g, 60) + '<b>' + esc(g.name) + '</b><small>' + TK.map(k => T[k].v[g[k]]).join('<br>') + '</small></div>'; });
    h += '</div>';
    if (cand.length === 1) h += '<button class="wc-primary" id="wcWar">📝 ' + esc(cand[0].name) + 'の 逮捕状を 出す</button>';
    else if (cand.length === 0) h += '<div class="wc-fb ng">あてはまる 団員が いない! どこかの 証言が うそだったのかも。</div>';
    if (st.warrant) h += '<p class="wc-center">📝 いまの 逮捕状: <b>' + esc(gang(st.warrant).name) + '</b></p>';
    h += '</div><button class="wc-secondary" id="wcBk">もどる</button>';
    area().innerHTML = h; bindHeader(back);
    area().querySelectorAll('.wc-fb2').forEach(b => b.onclick = () => { sfx('click'); if (b.dataset.v) F[b.dataset.k] = b.dataset.v; else delete F[b.dataset.k]; fileView(back); });
    const w = document.getElementById('wcWar');
    if (w) w.onclick = () => { sfx('unlock'); st.warrant = cand[0].id; fileView(back); };
    document.getElementById('wcBk').onclick = () => { sfx('click'); back(); };
  }

  // ---------- 行き先を 選ぶ ----------
  function chooseView() {
    const here = city(st.route[st.pos]), S = st.steps[st.pos];
    let h = header();
    h += '<div class="wc-h2">✈ どこへ 飛ぶ? (地図の 都市か ボタンを タップ)</div>';
    h += mapSVG({ here: here.id, trail: st.trail, options: S.options.filter(id => !S.tried[id]) });
    h += '<div class="wc-dests">';
    S.options.forEach(id => { const c = city(id), fh = flightH(here, c); h += '<button class="wc-dest" data-c="' + id + '"' + (S.tried[id] ? ' disabled' : '') + '><b>' + esc(c.name) + '</b><small>' + esc(c.country) + ' ・ ' + km(here, c).toLocaleString() + 'km ・ 約' + fh + '時間</small></button>'; });
    h += '</div><button class="wc-secondary" id="wcBackCity">← 聞きこみに もどる</button>';
    area().innerHTML = h; bindHeader(chooseView);
    const pick = id => { if (S.tried[id]) return; sfx('click'); fly(id); };
    area().querySelectorAll('.wc-dest').forEach(b => b.onclick = () => pick(b.dataset.c));
    area().querySelectorAll('.wc-opt').forEach(g => g.onclick = () => pick(g.dataset.c));
    document.getElementById('wcBackCity').onclick = () => { sfx('click'); cityView(); };
  }
  function fly(id) {
    const here = city(st.route[st.pos]), dest = city(id), right = id === st.route[st.pos + 1], S = st.steps[st.pos];
    const fh = flightH(here, dest), dep = clockStr(st.t, here.tz);
    let h = header();
    h += mapSVG({ trail: st.trail, fly: [here.id, id], here: here.id });
    h += '<div class="wc-box wc-center"><div class="wc-plane">✈</div><p><b>' + esc(here.name) + '</b> → <b>' + esc(dest.name) + '</b><br>距離 約 ' + km(here, dest).toLocaleString() + 'km ・ 飛行 約 ' + fh + '時間</p></div>';
    area().innerHTML = h; bindHeader();
    setTimeout(() => {
      if (!document.querySelector('.wc-plane')) return;
      const slept = spend(fh, dest.tz);
      const arr = clockStr(st.t - slept, dest.tz);
      if (right) {
        // ふりかえり: うそつきが いたら 正体を 明かす
        let rev = '';
        const li = S.w.findIndex(w => w.liar);
        if (li >= 0) rev = '🕵 ' + ROLES.find(x => x.id === S.w[li].role).ja + 'は ブランク団の 仲間だった! ' + (S.w[li].trait ? '特徴の 話も うそ だったかも…' : 'うその 行き先を 言っていた。');
        st.pos++; st.trail.push(id);
        if (timeUp()) return failView('⌛ ' + esc(dest.name) + 'に 着いたが、もう 締め切りを 過ぎていた… 犯人は アジトへ 逃げこんだ!');
        tzQuiz(dest, here, dep, fh, arr, slept, rev);
      } else {
        st.wrong++; S.tried[id] = 1; sfx('wrong');
        const back = spend(fh, here.tz);
        let m = header();
        m += art(IMG + 'cities/' + dest.id + '.webp', '', 'wc-cityimg');
        m += '<div class="wc-box wc-talk"><img src="' + KORADON_IDLE + '" alt=""><div><b>コラドン</b><p>' + esc(dest.name) + 'には 怪盗の 足あとが ない… ちがう 都市だった。' + esc(here.name) + 'まで 飛んで もどったよ (往復 約' + (fh * 2) + '時間' + (slept + back ? ' + 夜の 休み ' + fmtH(slept + back) : '') + ')。</p>' +
          (S.decoy === id ? '<p class="wc-small">⚠ この 行き先を 言った 証人は うそつき だったのかも!</p>' : '') + '<p class="wc-small">📘 ' + esc(dest.fact) + '</p></div></div>';
        if (timeUp()) { area().innerHTML = m; bindHeader(); return setTimeout(() => failView('⌛ 時間を 使いすぎて 締め切りを 過ぎてしまった…'), 1600); }
        m += '<button class="wc-primary" id="wcRe">' + esc(here.name) + 'で 推理し直す</button>';
        area().innerHTML = m; bindHeader();
        document.getElementById('wcRe').onclick = () => { sfx('click'); cityView(); };
      }
    }, 1400);
  }
  // 到着: 時差クイズ (現地時刻を 当てる → ヒント券)
  function tzQuiz(c, from, dep, fh, arr, slept, rev) {
    const ansH = mod(st.t - slept + c.tz, 24);
    const tokyoH = mod(st.t - slept + 9, 24), wrongTz = mod(st.t - slept + from.tz, 24);
    const cand = [ansH, tokyoH, wrongTz, mod(ansH - 2 * (c.tz - from.tz), 24), mod(ansH + 3, 24), mod(ansH - 2, 24)];
    const opts = []; cand.forEach(x => { if (!opts.some(o => Math.abs(o - x) < 0.01) && opts.length < 4) opts.push(x); });
    const keepT = st.t; st.t -= slept;
    let h = header().replace(/🕰 現地 <b>[^<]*<\/b>/, '🕰 現地 <b>??</b>');
    st.t = keepT;
    h += art(IMG + 'cities/' + c.id + '.webp', '', 'wc-cityimg');
    h += '<div class="wc-box wc-center"><div class="wc-city-n">🛬 ' + esc(c.name) + ' に 到着!</div><p>怪盗の 足あとを 見つけた! 追跡 成功。</p>' + (rev ? '<p class="wc-small">' + rev + '</p>' : '') + '</div>';
    h += '<div class="wc-box"><div class="wc-h2">⏰ 時差クイズ (正解で 🎫 ヒント券)</div><p>' + esc(from.name) + 'を 現地 <b>' + dep + '</b> に 出発して、約' + fh + '時間 飛んだ。<br>' + esc(c.name) + ' (UTC' + (c.tz >= 0 ? '+' : '') + c.tz + ') の 時計は 今 何時? <span class="wc-small">(' + esc(from.name) + 'は UTC' + (from.tz >= 0 ? '+' : '') + from.tz + ')</span></p><div class="wc-tz">';
    shuffle(opts).forEach(x => { h += '<button class="wc-dest" data-t="' + x + '">' + hourStr(x) + '</button>'; });
    h += '</div><div id="wcTzFb"></div></div>';
    area().innerHTML = h; bindHeader();
    let done = false;
    area().querySelectorAll('[data-t]').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = Math.abs(+b.dataset.t - ansH) < 0.01;
      area().querySelectorAll('[data-t]').forEach(x => { x.disabled = true; if (Math.abs(+x.dataset.t - ansH) < 0.01) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sfx(ok ? 'unlock' : 'wrong');
      if (ok) { st.tzOk++; st.tickets++; }
      const dz = c.tz - from.tz;
      document.getElementById('wcTzFb').innerHTML = '<div class="wc-fb ' + (ok ? 'ok' : 'ng') + '">' + (ok ? '🎉 正解! 🎫 ヒント券 +1' : '✗ 正解は ' + hourStr(ansH)) +
        '<br>出発 ' + dep.split(' ')[1] + ' + 飛行 ' + fh + '時間 = ' + esc(from.name) + 'の 時計で ' + hourStr(mod(st.t - slept + from.tz, 24)) + '<br>時差 ' + c.tz + ' − (' + from.tz + ') = ' + (dz > 0 ? '+' : '') + dz + '時間 → <b>' + hourStr(ansH) + '</b>' +
        (slept ? '<br>🌙 夜なので ホテルで 朝まで 眠った (+' + fmtH(slept) + ')' : '') + '</div><button class="wc-primary" id="wcNext">次へ →</button>';
      document.getElementById('wcNext').onclick = () => { sfx('click'); cityView(); };
    });
  }

  // ---------- 最後の 都市: 逮捕 ----------
  function finalView() {
    const here = city(st.route[st.pos]);
    let h = header();
    h += art(IMG + 'cities/' + here.id + '.webp', '', 'wc-cityimg');
    h += '<div class="wc-box wc-city"><div class="wc-city-n">📍 ' + esc(here.name) + ' <small>(' + esc(here.country) + ')</small></div><div class="wc-fact">📘 ' + esc(here.fact) + '</div></div>';
    h += '<div class="wc-box wc-talk"><img src="' + KORADON + '" alt=""><div><b>コラドン</b><p>ここが アジトの ある 都市だ! ブランク団の 人物を 追いつめたぞ。' + (st.warrant ? '逮捕状の 人物で 合っているかな…?' : '逮捕状が ないと 逮捕できない! 急いで 容疑者ファイルで 出そう (+2時間)。') + '</p></div></div>';
    if (st.warrant) h += '<div class="wc-box wc-center">📝 逮捕状: ' + gangPic(gang(st.warrant), 80) + '<p><b>' + esc(gang(st.warrant).name) + '</b></p></div><button class="wc-primary" id="wcArrest">🚨 逮捕する!</button>';
    else h += '<button class="wc-primary" id="wcLate">🗂 容疑者ファイルを 開く (+2時間)</button>';
    area().innerHTML = h; bindHeader(finalView);
    const a = document.getElementById('wcArrest');
    if (a) a.onclick = () => {
      if (timeUp()) return failView('⌛ 締め切りを 過ぎていた… 犯人は アジトの 中へ 消えた!');
      if (st.warrant === st.thief.id) return success();
      failView('😱 逮捕状の 人物 (' + esc(gang(st.warrant).name) + ') は 人ちがいだった! そのすきに 本物の 犯人は 逃げてしまった…');
    };
    const l = document.getElementById('wcLate');
    if (l) l.onclick = () => { sfx('click'); st.t += 2; if (timeUp()) return failView('⌛ ファイルを 調べている 間に 締め切りを 過ぎてしまった…'); fileView(finalView); };
  }
  function success() {
    sfx('unlock');
    const L = left(), stars = st.wrong === 0 ? 3 : st.wrong === 1 ? 2 : 1;
    const d = data(); d.cleared[st.cs.id] = Math.max(d.cleared[st.cs.id] || 0, stars); save();
    const g = st.thief;
    let h = header();
    h += '<div class="wc-box wc-center"><div class="wc-big">🎉</div>' + gangPic(g, 110) + '<p>ブランク団の <b>' + esc(g.name) + '</b> を 逮捕した!<br>「' + esc(st.cs.item) + '」を 取り返した!</p><div class="wc-stars big">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div><p class="wc-small">残り時間 ' + fmtH(Math.max(0, L)) + ' ・ まちがった 飛行 ' + st.wrong + '回 ・ 時差クイズ 正解 ' + st.tzOk + '回</p></div>';
    h += mapSVG({ trail: st.trail, here: st.route[st.pos] });
    h += '<div class="wc-box wc-talk"><img src="' + KORARIN + '" alt=""><div><b>コラリンの まとめ</b><ul class="wc-sum">';
    st.trail.forEach(id => { const c = city(id); h += '<li><b>' + esc(c.name) + '</b> (' + esc(c.country) + ') — ' + esc(c.lang) + ' / 通貨 ' + esc(c.cur) + ' / UTC' + (c.tz >= 0 ? '+' : '') + c.tz + '</li>'; });
    h += '</ul><p class="wc-small">犯人の 特徴: ' + TK.map(k => T[k].label + '=' + T[k].v[g[k]]).join(' ・ ') + '</p></div></div><button class="wc-primary" id="wcList">事件一覧へ</button><button class="wc-secondary" id="wcAgain">同じ 事件を もう一度 (犯人と ルートが 変わる)</button>';
    area().innerHTML = h; bindHeader();
    document.getElementById('wcList').onclick = () => { sfx('click'); list(); };
    document.getElementById('wcAgain').onclick = () => { sfx('click'); start(st.cs); };
  }

  function open() { showPage('pageWorldChase'); list(); const p = document.getElementById('pageWorldChase'); if (p) p.scrollTop = 0; }
  return { open: open, stop: stopSay, _speechTexts: speechTexts, _city: city, _cases: CASES, _gang: GANG, _st: () => st, _build: buildRun };
})();
