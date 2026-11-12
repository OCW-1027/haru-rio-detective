/* engine/japan-trip.js — シーズン2 新コンテンツ④ 日本列島ミステリー紀行
 * ブランク団 日本支部が 各地の「知のカケラ」を 盗んで 逃げる。証言 (名産・名所・祭り・歴史・地理) から
 * 次の 行き先の 都道府県を 推理して 追いかけ、最後は 地図で 隠れ家を 当てる。
 *   事件 6 / 都道府県 図鑑 47 / 地図クイズ 3モード (地図で 探す・色の 県は?・県庁所在地)
 * 画面: pageJapanTrip (#jtArea). 保存: State.v2.jp = { cleared: {caseId: stars}, seen: {prefId: 1}, quiz: {mode: best} }
 * Dependencies: JP_PREF, JPMAP, State, saveState, showPage, sfx, escapeHtml, buildChapterGrid
 */
const JapanTrip = (function () {
  const SP = 'assets/img/chars/spirits/';
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const P = id => JP_PREF.find(p => p.id === id);
  const REGS = ['北海道', '東北', '関東', '中部', '近畿', '中国', '四国', '九州・沖縄'];
  const REG_IMG = { 北海道: 'hokkaido', 東北: 'tohoku', 関東: 'kanto', 中部: 'chubu', 近畿: 'kinki', 中国: 'chugoku', 四国: 'shikoku', '九州・沖縄': 'kyushu' };
  // 絵の 差しこみ口 (ファイルが なければ 何も 出ない) — docs/GEMINI_ART_REQUEST_S2.md
  const pic = (f, cls) => '<img class="s2-banner' + (cls ? ' ' + cls : '') + '" src="assets/img/s2/' + f + '" alt="" loading="lazy" onerror="this.remove()">';
  const TYPE = { 産: ['🍎', '名産・産業'], 所: ['🏞', '名所・自然'], 祭: ['🏮', '祭り・文化'], 史: ['🏯', '歴史・人物'], 地: ['🗺', '地理・交通'] };
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.jp || (State.v2.jp = {}); d.cleared = d.cleared || {}; d.seen = d.seen || {}; d.quiz = d.quiz || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function area() { return $('jtArea'); }
  function sound(t) { try { sfx(t); } catch (e) {} }
  function top() { const p = $('pageJapanTrip'); if (p) p.scrollTop = 0; }
  // 手がかりに 県名 (の 一部) が 入っていたら 伏せる
  function mask(p, s) { const stem = p.n.replace(/[都道府県]$/, ''); return stem.length >= 2 ? s.split(stem).join('〇〇') : s; }
  function dist(a, b) { const A = JPMAP.C[a], B = JPMAP.C[b]; return Math.hypot(A[0] - B[0], A[1] - B[1]); }

  // ---------- 地図 ----------
  // opt: { hl: {id: 'cls'}, mark: id, line: [ids], click: true }
  function map(opt) {
    opt = opt || {};
    let s = '<svg class="jt-map" viewBox="0 0 ' + JPMAP.W + ' ' + JPMAP.H + '" role="img" aria-label="日本地図">';
    const I = JPMAP.INSET; s += '<rect x="' + I[0] + '" y="' + I[1] + '" width="' + I[2] + '" height="' + I[3] + '" class="jt-inset"/>';
    Object.keys(JPMAP.P).forEach(k => { const c = (opt.hl && opt.hl[k]) || ''; s += '<path d="' + JPMAP.P[k] + '" data-id="' + k + '" class="jt-pf ' + c + (opt.click ? ' tap' : '') + '"/>'; });
    if (opt.line && opt.line.length > 1) { s += '<polyline class="jt-route" points="' + opt.line.map(id => JPMAP.C[id].join(',')).join(' ') + '"/>'; opt.line.forEach(id => { const c = JPMAP.C[id]; s += '<circle cx="' + c[0] + '" cy="' + c[1] + '" r="5" class="jt-dot"/>'; }); }
    if (opt.mark) { const c = JPMAP.C[opt.mark]; s += '<g class="jt-mark" transform="translate(' + c[0] + ',' + c[1] + ')"><circle r="11"/><text y="5" text-anchor="middle">🔍</text></g>'; }
    if (opt.labels) Object.keys(opt.labels).forEach(k => { const c = JPMAP.C[k]; s += '<text class="jt-lbl" x="' + c[0] + '" y="' + (c[1] - 9) + '" text-anchor="middle">' + esc(opt.labels[k]) + '</text>'; });
    return s + '</svg>';
  }
  function bindMap(root, fn) { root.querySelectorAll('.jt-pf.tap').forEach(el => el.onclick = () => fn(+el.dataset.id)); }

  function header(title, sub, back) {
    return '<div class="jt-head">' + (back === 'hub' ? '' : '<button class="jt-back" data-back data-go="' + (back || 'home') + '">← ' + (back === 'cases' ? '事件' : back === 'zukan' ? '図鑑' : back === 'quiz' ? 'クイズ' : '紀行 トップ') + '</button>') + '<div><div class="jt-title">' + title + '</div>' + (sub ? '<div class="jt-sub">' + sub + '</div>' : '') + '</div></div>';
  }
  function bindGo(root) { root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { sound('click'); go(b.dataset.go); }); }
  function go(v) { stopRun(); top(); ({ hub: leave, home: home, cases: cases, zukan: zukan, quiz: quizMenu }[v] || home)(); }
  function leave() { try { if (typeof Hub !== 'undefined') { Hub.open(); return; } } catch (e) {} showPage('pageSelect'); }

  // ---------- ホーム ----------
  function home() {
    const d = data(), nCl = Object.keys(d.cleared).length, nSeen = Object.keys(d.seen).length;
    let h = header('🗾 日本列島ミステリー紀行', 'シーズン2 ・ 47都道府県を 追え', 'hub');
    h += '<div class="jt-hero"><img src="' + SP + 'koradon_greet_01.webp" alt=""><div class="jt-say"><b>コラドン:</b> たいへんだ! ブランク団の 日本支部が、各地の「知のカケラ」を 盗んで 日本じゅうを にげまわっている! 証言を 集めて 次の 行き先を 推理しよう。</div></div>';
    h += '<div class="jt-menu">';
    h += '<button class="jt-mbtn" data-go="cases"><span class="i">🕵️</span><b>事件ファイル</b><small>解決 ' + nCl + ' / ' + CASES.length + '</small></button>';
    h += '<button class="jt-mbtn" data-go="zukan"><span class="i">📖</span><b>都道府県 図鑑</b><small>見た ' + nSeen + ' / 47</small></button>';
    h += '<button class="jt-mbtn" data-go="quiz"><span class="i">🗺</span><b>地図クイズ</b><small>' + QUIZ.map(q => q.icon + ' ' + (d.quiz[q.id] || 0)).join(' ・ ') + '</small></button>';
    h += '</div>';
    h += '<div class="jt-mapbox">' + map({ hl: Object.keys(d.seen).reduce((o, k) => (o[k] = 'seen', o), {}) }) + '<div class="jt-note">色が ついた 県 = 図鑑で 見た 県</div></div>';
    area().innerHTML = h; bindGo(area());
  }

  // ---------- 図鑑 ----------
  function zukan() {
    const d = data();
    let h = header('📖 都道府県 図鑑', '県を 選ぶと 詳しい カードが 出るよ');
    h += '<div class="jt-mapbox">' + map({ click: true, hl: Object.keys(d.seen).reduce((o, k) => (o[k] = 'seen', o), {}) }) + '</div>';
    REGS.forEach(r => {
      h += '<div class="jt-reg"><div class="jt-reg-h">' + r + '地方</div><div class="jt-chips">';
      JP_PREF.filter(p => p.reg === r).forEach(p => { h += '<button class="jt-chip' + (d.seen[p.id] ? ' on' : '') + '" data-p="' + p.id + '">' + esc(p.n) + '</button>'; });
      h += '</div></div>';
    });
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-p]').forEach(b => b.onclick = () => { sound('click'); card(+b.dataset.p); });
    bindMap(area(), id => { sound('click'); card(id); });
  }
  function card(id) {
    const p = P(id), d = data(); d.seen[id] = 1; save(); top();
    let h = header(esc(p.n), p.reg + '地方 ・ 県庁所在地 ' + esc(p.cap), 'zukan');
    h += pic('japan/reg_' + REG_IMG[p.reg] + '.webp') + '<div class="jt-mapbox small">' + map({ hl: { [id]: 'hl' }, mark: id }) + '</div><div class="jt-card">';
    p.c.forEach(([t, s]) => { h += '<div class="jt-fact"><span class="jt-ft">' + TYPE[t][0] + ' ' + TYPE[t][1] + '</span>' + esc(s) + '</div>'; });
    h += '</div>';
    const i = JP_PREF.indexOf(p);
    h += '<div class="jt-row"><button class="jt-btn2" id="jtPrev">← ' + esc(JP_PREF[(i + 46) % 47].n) + '</button><button class="jt-btn2" id="jtNext">' + esc(JP_PREF[(i + 1) % 47].n) + ' →</button></div>';
    area().innerHTML = h; bindGo(area());
    $('jtPrev').onclick = () => { sound('click'); card(JP_PREF[(i + 46) % 47].id); };
    $('jtNext').onclick = () => { sound('click'); card(JP_PREF[(i + 1) % 47].id); };
  }

  // ---------- 事件 ----------
  const THIEF = { kage: ['カゲボウシ', '影の ように 音も なく 動く'], tsuku: ['ツクモ', '古い 道具に 化ける 変装の 名人'], nagi: ['ナギ', '風の ように 速い 乗り物マニア'], yomi: ['ヨミ', '地図を 読み、うらを かく 頭脳派'], hagu: ['ハグレ', '群れない 一匹狼の 怪力'], oboro: ['オボロ', '日本支部の リーダー。霧の ように 正体を 見せない'] };
  const CASES = [
    { id: 'c1', title: '消えた 金箔の 知識', thief: 'kage', start: 17, reg: null, hops: 4, kakera: '金箔づくりの 知のカケラ' },
    { id: 'c2', title: '雪国から 来た 予告状', thief: 'tsuku', start: 15, reg: null, hops: 4, kakera: '米づくりの 知のカケラ' },
    { id: 'c3', title: '西国 お城 めぐり', thief: 'nagi', start: 28, reg: null, hops: 5, kakera: 'お城の 知のカケラ' },
    { id: 'c4', title: '南の 島の 暗号', thief: 'yomi', start: 47, reg: null, hops: 5, kakera: '琉球の 知のカケラ' },
    { id: 'c5', title: '北の 大地の 追跡', thief: 'hagu', start: 1, reg: null, hops: 6, kakera: '開拓の 知のカケラ' },
    { id: 'c6', title: '日本列島 大縦断', thief: 'oboro', start: 13, reg: null, hops: 7, kakera: '日本の 知のカケラ (大)' },
  ];
  function cases() {
    const d = data();
    let h = header('🕵️ 事件ファイル', '6つの 事件 ・ ルートは 毎回 変わる');
    h += '<div class="jt-cases">';
    CASES.forEach((c, i) => {
      const st = d.cleared[c.id], t = THIEF[c.thief];
      h += '<button class="jt-case' + (st ? ' done' : '') + '" data-c="' + i + '"><span class="jt-cn">第' + (i + 1) + '事件</span><b>' + esc(c.title) + '</b><small>犯人: ' + t[0] + ' ・ スタート: ' + esc(P(c.start).n) + ' ・ ' + c.hops + '地点</small><span class="jt-st">' + (st ? '⭐'.repeat(st) + '☆'.repeat(3 - st) : '') + '</span></button>';
    });
    h += '</div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-c]').forEach(b => b.onclick = () => { sound('click'); caseIntro(+b.dataset.c); });
  }
  function caseIntro(ci) {
    const c = CASES[ci], t = THIEF[c.thief];
    let h = header('第' + (ci + 1) + '事件 ' + esc(c.title), '', 'cases');
    h += pic('japan/thief_' + c.thief + '.webp', 'thief');
    h += '<div class="jt-hero"><img src="' + SP + 'korarin_greet_01.webp" alt=""><div class="jt-say"><b>コラリン:</b> ' + esc(P(c.start).n) + 'で「' + esc(c.kakera) + '」が 盗まれました。犯人は ブランク団の <b>' + t[0] + '</b> (' + t[1] + ')。<br>町の 人に 聞きこみを して、次の 行き先を 推理しましょう。間違えて いい のは 2回まで です。</div></div>';
    h += '<div class="jt-rules"><div>🗣 聞きこみ: 1地点で 3人まで 話を 聞ける</div><div>💡 コラドンの ヒント: 地方が 分かる (⭐が 減る)</div><div>❤ 間違えて 飛ぶと ❤ が 1つ 減る。3つ なくなると 犯人は 逃げる</div><div>🏁 最後は 地図で 隠れ家を タップ!</div></div>';
    h += '<button class="jt-go" id="jtStart">🚄 追跡 開始</button>';
    area().innerHTML = h; bindGo(area());
    $('jtStart').onclick = () => { sound('click'); startCase(ci); };
  }
  // ルート: 前の 地点から 近すぎず 遠すぎない 県を つないでいく (同じ 県は 通らない)
  function route(c) {
    const r = [c.start];
    for (let k = 0; k < c.hops; k++) {
      const cur = r[r.length - 1];
      const cand = JP_PREF.map(p => p.id).filter(id => !r.includes(id)).sort((a, b) => dist(cur, a) - dist(cur, b));
      const band = cand.slice(2, 14);   // となりすぎない 範囲から
      r.push(pick(band.length ? band : cand));
    }
    return r;
  }
  let run = null;
  function stopRun() { run = null; }
  function startCase(ci) {
    const c = CASES[ci];
    run = { ci: ci, c: c, route: route(c), i: 0, hearts: 3, miss: 0, hints: 0, asked: 0, clues: [], wrong: {}, regionShown: false, log: [] };
    stop_();
  }
  function stop_() {   // 現在地の 画面
    if (!run) return;
    const r = run, cur = r.route[r.i], nxt = r.route[r.i + 1], last = r.i === r.route.length - 2;
    const pc = P(cur);
    const fresh = r.asked === 0 && !r.clues.length && r.topAt !== r.i;
    if (r.asked === 0 && !r.clues.length) {
      // この 地点で 使う 手がかり (次の 県の 5つから 3つ)
      r.pool = shuffle(P(nxt).c.slice()).slice(0, 3);
    }
    if (fresh) { r.topAt = r.i; top(); }   // 同じ 地点での 再描画 (証言・ヒント・間違い) では 位置を 動かさない
    let h = header('第' + (r.ci + 1) + '事件 ' + esc(r.c.title), '地点 ' + (r.i + 1) + ' / ' + (r.route.length - 1) + ' ・ ' + '❤'.repeat(r.hearts) + '<span class="off">' + '❤'.repeat(3 - r.hearts) + '</span>', 'cases');
    h += '<div class="jt-mapbox small">' + map({ line: r.route.slice(0, r.i + 1), mark: cur, hl: Object.assign({ [cur]: 'here' }, r.wrong) }) + '</div>';
    h += pic('japan/reg_' + REG_IMG[pc.reg] + '.webp', 'thin') + '<div class="jt-now">📍 いま: <b>' + esc(pc.n) + '</b> (' + pc.reg + '地方)</div>';
    const WIT = [['🧳', '駅員さん'], ['🛍', 'おみやげ屋さん'], ['♨', '旅館の おかみさん'], ['🚕', 'タクシーの 運転手さん'], ['📸', '観光ガイドさん'], ['👵', '地元の おばあさん']];
    if (!r.wit) r.wit = shuffle(WIT).slice(0, 3);
    h += '<div class="jt-wits">';
    r.wit.forEach((w, k) => {
      if (k < r.asked) { const cl = r.pool[k]; h += '<div class="jt-wit done"><span class="jt-wi">' + w[0] + '</span><div><b>' + w[1] + '</b><p>' + (last && k === 0 ? 'あやしい 人が「最後の 隠れ家へ 行く」と 話していたよ。場所は「<mark>' + esc(mask(P(nxt), cl[1])) + '</mark>」で 有名な ところ らしい。' : 'あやしい 人が「<mark>' + esc(mask(P(nxt), cl[1])) + '</mark>」で 有名な ところへ 行くと 言っていたよ。') + '</p></div></div>'; }
      else h += '<button class="jt-wit" data-w="' + k + '"' + (k > r.asked ? ' disabled' : '') + '><span class="jt-wi">' + w[0] + '</span><div><b>' + w[1] + '</b><p>' + (k === r.asked ? 'タップして 話を 聞く' : '…') + '</p></div></button>';
    });
    h += '</div>';
    h += '<div class="jt-row"><button class="jt-btn2" id="jtHint"' + (r.regionShown || !r.asked ? ' disabled' : '') + '>💡 コラドンの ヒント' + (r.regionShown ? ': ' + P(nxt).reg + '地方' : '') + '</button></div>';
    if (r.asked) {
      if (last) h += '<div class="jt-final">🏁 隠れ家の 県を 地図で タップ!</div><div class="jt-mapbox tapme">' + map({ click: true, hl: Object.assign({}, r.wrong, { [cur]: 'here' }) }) + '</div>';
      else {
        if (!r.opts) {
          const near = JP_PREF.map(p => p.id).filter(id => id !== nxt && id !== cur && !r.route.slice(0, r.i).includes(id)).sort((a, b) => dist(nxt, a) - dist(nxt, b));
          r.opts = shuffle([nxt].concat(shuffle(near.slice(0, 8)).slice(0, 2), shuffle(near.slice(8)).slice(0, 1)));
        }
        h += '<div class="jt-final">🚄 どこへ 追う?</div><div class="jt-opts">';
        r.opts.forEach(id => { h += '<button class="jt-opt' + (r.wrong[id] ? ' ng' : '') + '" data-to="' + id + '"' + (r.wrong[id] ? ' disabled' : '') + '>' + esc(P(id).n) + '</button>'; });
        h += '</div>';
      }
    }
    h += '<div id="jtFb"></div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-w]').forEach(b => b.onclick = () => { sound('click'); r.asked++; stop_(); });
    const hb = $('jtHint'); if (hb) hb.onclick = () => { sound('click'); r.regionShown = true; r.hints++; stop_(); };
    area().querySelectorAll('[data-to]').forEach(b => b.onclick = () => fly(+b.dataset.to));
    if (last && r.asked) bindMap(area().querySelector('.tapme'), id => fly(id));
  }
  function fly(id) {
    const r = run; if (!r) return;
    const nxt = r.route[r.i + 1], last = r.i === r.route.length - 2;
    if (id === r.route[r.i]) return;
    if (id === nxt) {
      sound('correct');
      const p = P(nxt);
      r.log.push(nxt);
      const fb = $('jtFb');
      if (fb) fb.innerHTML = '<div class="jt-ok"><b>✔ ' + esc(p.n) + ' だ!</b> 「' + esc(r.pool.slice(0, r.asked).map(c => c[1]).join('」「')) + '」は ' + esc(p.n) + '。県庁所在地は ' + esc(p.cap) + '。</div><button class="jt-go" id="jtOn">' + (last ? '🚨 隠れ家に 突入!' : '🚄 ' + esc(p.n) + 'へ 向かう') + '</button>';
      area().querySelectorAll('[data-to],.jt-pf.tap').forEach(b => { b.onclick = null; });
      $('jtOn').onclick = () => { sound('click'); if (last) return arrest(); r.i++; r.asked = 0; r.clues = []; r.wit = null; r.opts = null; r.regionShown = false; r.wrong = {}; stop_(); };
      $('jtOn').scrollIntoView({ block: 'center', behavior: 'smooth' });
    } else {
      sound('wrong');
      r.hearts--; r.miss++; r.wrong[id] = 'ng';
      const p = P(id);
      if (r.hearts <= 0) return escaped(id);
      stop_();
      const fb = $('jtFb'); if (fb) fb.innerHTML = '<div class="jt-ng">✗ ' + esc(p.n) + 'には いなかった… (' + esc(p.n) + 'は「' + esc(p.c[0][1]) + '」の 県)</div>';
    }
  }
  function stars(r) { const n = r.miss + r.hints; return n === 0 ? 3 : n <= 2 ? 2 : 1; }
  function recap(r) {
    let h = '<div class="jt-recap"><div class="jt-recap-h">🗺 追跡ルートの ふりかえり</div>';
    r.route.forEach((id, k) => { const p = P(id); h += '<div class="jt-rc"><b>' + (k + 1) + '. ' + esc(p.n) + '</b> <small>(' + esc(p.cap) + ')</small><span>' + esc(p.c.map(c => c[1]).slice(0, 2).join(' / ')) + '</span></div>'; });
    return h + '</div>';
  }
  function arrest() {
    const r = run, st = stars(r), d = data(); d.cleared[r.c.id] = Math.max(d.cleared[r.c.id] || 0, st); r.route.forEach(id => { d.seen[id] = 1; }); save();
    try { if (typeof triggerConfetti === 'function') triggerConfetti(); } catch (e) {}
    sound('chime'); top();
    let h = header('🚨 事件 解決!', esc(r.c.title), 'cases');
    h += '<div class="jt-hero"><img src="' + SP + 'koradon_greet_01.webp" alt=""><div class="jt-say"><b>コラドン:</b> やった! ' + THIEF[r.c.thief][0] + 'を つかまえて「' + esc(r.c.kakera) + '」を 取りもどしたぞ!</div></div>';
    h += '<div class="jt-res">' + '⭐'.repeat(st) + '<span class="off">' + '☆'.repeat(3 - st) + '</span><div>まちがい ' + r.miss + '回 ・ ヒント ' + r.hints + '回</div></div>';
    h += '<div class="jt-mapbox small">' + map({ line: r.route, hl: r.route.reduce((o, k) => (o[k] = 'seen', o), {}), labels: r.route.reduce((o, k) => (o[k] = P(k).n, o), {}) }) + '</div>';
    h += recap(r) + '<div class="jt-row"><button class="jt-go" id="jtAgain">🔁 もう一度 (ルートが 変わる)</button></div>';
    area().innerHTML = h; bindGo(area());
    const ci = r.ci; $('jtAgain').onclick = () => { sound('click'); startCase(ci); };
  }
  function escaped() {
    const r = run; sound('wrong'); top();
    let h = header('💨 逃げられた…', esc(r.c.title), 'cases');
    h += '<div class="jt-hero"><img src="' + SP + 'korarin_greet_01.webp" alt=""><div class="jt-say"><b>コラリン:</b> ' + THIEF[r.c.thief][0] + 'は ' + esc(P(r.route[r.i + 1]).n) + 'に にげました。手がかりと 県の 特ちょうを 図鑑で 確認して、もう一度 挑戦しましょう!</div></div>';
    h += recap(r) + '<div class="jt-row"><button class="jt-go" id="jtAgain">🔁 もう一度</button><button class="jt-btn2" data-go="zukan">📖 図鑑で 確認</button></div>';
    area().innerHTML = h; bindGo(area());
    const ci = r.ci; $('jtAgain').onclick = () => { sound('click'); startCase(ci); };
  }

  // ---------- 地図クイズ ----------
  const QUIZ = [
    { id: 'find', icon: '👆', name: '地図で 探す', desc: '県の 名前を 見て、地図で タップ' },
    { id: 'name', icon: '🎨', name: '色の 県は?', desc: '色の ついた 県の 名前を 4択で' },
    { id: 'cap', icon: '🏛', name: '県庁所在地', desc: '県庁所在地を 4択で (名前が 違う 県が 多めに 出る)' },
  ];
  let qz = null;
  function quizMenu() {
    const d = data();
    let h = header('🗺 地図クイズ', '10問 ・ ベスト記録が 残るよ');
    h += '<div class="jt-menu">';
    QUIZ.forEach(q => { h += '<button class="jt-mbtn" data-q="' + q.id + '"><span class="i">' + q.icon + '</span><b>' + q.name + '</b><small>' + q.desc + '<br>ベスト ' + (d.quiz[q.id] || 0) + ' / 10</small></button>'; });
    h += '</div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-q]').forEach(b => b.onclick = () => { sound('click'); quizStart(b.dataset.q); });
  }
  function quizStart(mode) {
    let ids = shuffle(JP_PREF.map(p => p.id));
    if (mode === 'cap') { const diff = JP_PREF.filter(p => p.cap.replace(/市$/, '') !== p.n.replace(/[都道府県]$/, '')).map(p => p.id); ids = shuffle(shuffle(diff).slice(0, 7).concat(shuffle(ids.filter(i => !diff.includes(i))).slice(0, 3))); }
    qz = { mode: mode, list: ids.slice(0, 10), i: 0, ok: 0, miss: [] };
    quizQ();
  }
  function quizQ() {
    const q = qz; top();
    if (q.i >= q.list.length) {
      const d = data(); const nb = q.ok > (d.quiz[q.mode] || 0); d.quiz[q.mode] = Math.max(d.quiz[q.mode] || 0, q.ok); save();
      let h = header('🗺 地図クイズ 結果', QUIZ.find(x => x.id === q.mode).name, 'quiz');
      h += '<div class="jt-res"><b>' + q.ok + '</b> / 10' + (nb ? ' 🏆 ベスト更新!' : '') + '</div>';
      if (q.miss.length) { h += '<div class="jt-recap"><div class="jt-recap-h">❗ 間違えた 県</div>'; q.miss.forEach(id => { const p = P(id); h += '<div class="jt-rc"><b>' + esc(p.n) + '</b> <small>(' + p.reg + ' ・ ' + esc(p.cap) + ')</small><span>' + esc(p.c[0][1]) + '</span></div>'; }); h += '</div>'; }
      h += '<div class="jt-row"><button class="jt-go" id="jtQA">🔁 もう一度</button><button class="jt-btn2" data-go="quiz">クイズ 一覧</button></div>';
      area().innerHTML = h; bindGo(area()); $('jtQA').onclick = () => { sound('click'); quizStart(q.mode); }; return;
    }
    const id = q.list[q.i], p = P(id);
    let h = header('🗺 ' + QUIZ.find(x => x.id === q.mode).name, (q.i + 1) + ' / 10 ・ 正解 ' + q.ok, 'quiz');
    if (q.mode === 'find') {
      h += '<div class="jt-ask"><b>' + esc(p.n) + '</b> は どこ?</div><div class="jt-mapbox tapme">' + map({ click: true }) + '</div>';
    } else {
      const ans = q.mode === 'cap' ? p.cap : p.n;
      const others = JP_PREF.filter(x => x.id !== id).sort((a, b) => dist(id, a.id) - dist(id, b.id)).slice(0, 8).map(x => q.mode === 'cap' ? x.cap : x.n);
      const opts = shuffle([ans].concat(shuffle(others).slice(0, 3)));
      q.opts = opts; q.ans = ans;
      h += '<div class="jt-ask">' + (q.mode === 'cap' ? '<b>' + esc(p.n) + '</b> の 県庁所在地は?' : '色の ついた 県は?') + '</div>';
      h += '<div class="jt-mapbox small">' + map({ hl: { [id]: 'hl' } }) + '</div><div class="jt-opts">';
      opts.forEach((o, k) => { h += '<button class="jt-opt" data-k="' + k + '">' + esc(o) + '</button>'; });
      h += '</div>';
    }
    h += '<div id="jtFb"></div>';
    area().innerHTML = h; bindGo(area());
    let done = false;
    const finish = (ok, shownHl) => {
      if (done) return; done = true;
      sound(ok ? 'correct' : 'wrong'); if (ok) q.ok++; else q.miss.push(id);
      $('jtFb').innerHTML = '<div class="' + (ok ? 'jt-ok' : 'jt-ng') + '">' + (ok ? '✔ 正解!' : '✗ 正解は ' + esc(q.mode === 'cap' ? p.cap : p.n)) + ' ・ ' + esc(p.n) + 'は「' + esc(p.c[0][1]) + '」</div><button class="jt-go" id="jtQN">次へ →</button>';
      $('jtQN').onclick = () => { sound('click'); q.i++; quizQ(); };
    };
    if (q.mode === 'find') bindMap(area().querySelector('.tapme'), t => {
      if (done) return;
      const ok = t === id;
      area().querySelectorAll('.jt-pf').forEach(el => { const k = +el.dataset.id; if (k === id) el.classList.add('hl'); else if (k === t) el.classList.add('ng'); });
      finish(ok);
    });
    else area().querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      if (done) return;
      const ok = q.opts[+b.dataset.k] === q.ans;
      area().querySelectorAll('[data-k]').forEach(x => { if (q.opts[+x.dataset.k] === q.ans) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      finish(ok);
    });
  }

  function open() { showPage('pageJapanTrip'); top(); home(); const b = $('btnJapanBack'); if (b) b.onclick = () => { sound('click'); stopRun(); leave(); }; }
  return { open: open, _cases: CASES, _route: route, stats: () => { const d = data(); return { cleared: Object.keys(d.cleared).length, seen: Object.keys(d.seen).length }; } };
})();
