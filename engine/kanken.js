/* engine/kanken.js — 漢検道場 (漢字検定 対策)
 *
 * データ: data/kanken-base.js (KANKEN_GRADE·KANKEN_STROKES·KANKEN_ON), data/kanken-7.js … (KANKEN_LV[級])
 * 書き順: assets/kanji/strokes/<コードポイント16進>.json + assets/vendor/hanzi-writer.min.js (HanziWriter)
 * 保存: State.v2.kanken = { rec: { key: [連続正解, 不正解数, 最後(1/0)] }, mock: { 級: { best, last:[…] } }, set: { input } }
 *   key: 'read:番号' 'write:番号' 'hw:番号' 'okuri:番号' 'onkun:番号' 'taigi:番号' 'douon:番号' 'sanji:番号' 'bushu:番号' 'stroke:字' 'order:字'
 * 画面: pageKanken (#kkArea) — ホーム(級を えらぶ) → 級メニュー → 漢字カード / 手書き 書き取り / 分野別ドリル / 本番形式 / 苦手
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, Study (任意), HanziWriter (任意 — ない ときは 書き順 機能を 隠す)
 */
const Kanken = (function () {
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  // 級 id: 10〜3 は 数字、準2級 = 'p2'。KANKEN_GRADE の キー 1〜6 = 小学 学年、7〜10 = 4級・3級・準2級・2級 (中学以上の 常用漢字)
  const LVS = [10, 9, 8, 7, 6, 5, 4, 3, 'p2', 2, 'p1', 1];
  const LV_GRADE = { 10: 1, 9: 2, 8: 3, 7: 4, 6: 5, 5: 6, 4: 7, 3: 8, p2: 9, 2: 10, p1: 11, 1: 12 };
  const LV_TARGET = { 10: '小学1年', 9: '小学2年', 8: '小学3年', 7: '小学4年', 6: '小学5年', 5: '小学6年', 4: '中学 在学程度', 3: '中学 卒業程度', p2: '高校 在学程度', 2: '高校卒業・一般', p1: '大学・一般 程度', 1: '大学・一般 (最上位)' };
  const lvName = n => (n === 'p2' ? '準2' : n === 'p1' ? '準1' : n) + '級';
  const lvParse = x => (isNaN(+x) ? x : +x);
  const SEC = {
    read: { name: '読み', icon: '📖', note: '線の ことばの 読みを えらぼう' },
    write: { name: '書き取り (えらぶ)', icon: '✏️', note: 'ひらがなの ところを 漢字に' },
    hw: { name: '書き取り (手書き)', icon: '✍️', note: '指で 書いて 書き順も チェック' },
    stroke: { name: '画数・筆順', icon: '🔢', note: '何画? 何画目?' },
    okuri: { name: '送りがな', icon: '🌱', note: '正しい 送りがなは?' },
    onkun: { name: '音と訓', icon: '🔤', note: '音読み? 訓読み?' },
    taigi: { name: '対義語', icon: '↔️', note: '反対の 意味の ことば' },
    ruigi: { name: '類義語', icon: '🤝', note: '似た 意味の ことば' },
    kousei: { name: '熟語の 構成', icon: '🧱', note: 'どんな 組み立て?' },
    douon: { name: '同音異字', icon: '🔁', note: '同じ 読みの 漢字を 使い分け' },
    sanji: { name: '三字熟語', icon: '🧩', note: '□に 入る 漢字は?' },
    yoji: { name: '四字熟語', icon: '🀄', note: '□に 入る 漢字は?' },
    goji: { name: '誤字訂正', icon: '🔍', note: 'まちがった 字を 見つけよう' },
    hyogai: { name: '表外読み', icon: '🌙', note: 'ふだん 見ない 読み方' },
    kyuji: { name: '旧字体', icon: '🏯', note: '昔の 字の 形' },
    koji: { name: '故事・ことわざ', icon: '📜', note: '□に 入る 漢字は?' },
    bushu: { name: '部首', icon: '🏷️', note: '部首と 部首名' },
  };
  // 本番形式: [分野, 問題数, 1問の 点]  (合計 200点に 換算・140点以上が 合格の めやす)
  const MOCK = [['read', 20, 1], ['bushu', 10, 1], ['stroke', 10, 1], ['okuri', 10, 2], ['onkun', 10, 1], ['taigi', 10, 2], ['douon', 10, 2], ['sanji', 10, 2], ['write', 20, 2]];
  const ORDER = ['read', 'hyogai', 'write', 'stroke', 'okuri', 'onkun', 'taigi', 'ruigi', 'kousei', 'douon', 'sanji', 'yoji', 'koji', 'goji', 'kyuji', 'bushu'];
  const ARR = { okuri: 'OKURI', onkun: 'ONKUN', taigi: 'TAIGI', ruigi: 'RUIGI', kousei: 'KOUSEI', douon: 'DOUON', sanji: 'SANJI', yoji: 'YOJI', goji: 'GOJI', kyuji: 'KYUJI', koji: 'KOJI', hyogai: 'HYOGAI', bushu: 'BUSHU' };
  const KOUSEI = { ア: '同じような 意味の 字を 重ねた もの (例: 岩石)', イ: '反対や 対の 意味の 字を 重ねた もの (例: 高低)', ウ: '上の 字が 下の 字を 説明 (修飾) して いる もの (例: 洋画)', エ: '下の 字が 「〜を」「〜に」に あたる もの (例: 着席 = 席に 着く)' };
  let lv = 7, run = null, writers = [];
  const HW = () => typeof HanziWriter !== 'undefined';

  // ---------- データ ----------
  function data() {
    if (!State.v2) State.v2 = {};
    const d = State.v2.kanken || (State.v2.kanken = {});
    d.rec = d.rec || {}; d.mock = d.mock || {}; d.set = d.set || {};
    return d;
  }
  function save() { try { saveState(); } catch (e) {} }
  function mark(key, ok) {
    const r = data().rec, K = lv + ':' + key, v = r[K] || [0, 0, 0];
    if (ok) { v[0]++; v[2] = 1; } else { v[0] = 0; v[1]++; v[2] = 0; }
    r[K] = v; save();
  }
  function got(key) { return (data().rec[lv + ':' + key] || [])[2] === 1; }
  const gradeOf = c => { for (let g = 1; g <= 12; g++) if (KANKEN_GRADE[g] && KANKEN_GRADE[g].indexOf(c) >= 0) return g; return 99; };
  const L = () => (typeof KANKEN_LV !== 'undefined' && KANKEN_LV[lv]) || null;
  const newKanji = () => (KANKEN_GRADE[LV_GRADE[lv]] || '').split('');
  const isKanji = c => /[一-鿿]/.test(c);
  const split = s => s.split('|');
  const k2h = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
  const cp = c => c.codePointAt(0).toString(16).padStart(4, '0');

  function strokeData(c) {
    const cache = strokeData.cache || (strokeData.cache = {});
    if (!cache[c]) cache[c] = fetch('assets/kanji/strokes/' + cp(c) + '.json').then(r => { if (!r.ok) throw new Error('no data'); return r.json(); });
    return cache[c];
  }
  function strokeSVG(d, hi) {
    let s = '<svg viewBox="0 0 1024 1024" class="kk-svg"><g transform="scale(1,-1) translate(0,-900)">';
    d.strokes.forEach((p, i) => { s += '<path d="' + p + '" fill="' + (i === hi ? '#c8332b' : i < hi ? '#3a3a3a' : '#d8d2c4') + '"/>'; });
    return s + '</g></svg>';
  }
  function say(text) {
    try {
      if (!('speechSynthesis' in window)) return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text); u.lang = 'ja-JP'; u.rate = 0.9;
      const v = speechSynthesis.getVoices().find(x => /ja/i.test(x.lang)); if (v) u.voice = v;
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function killWriters() { writers.forEach(w => { try { w.cancelQuiz && w.cancelQuiz(); } catch (e) {} }); writers = []; }

  // ---------- 問題 づくり ----------
  // 1問 = { key, sec, q(html), opts[], ans(番号), input?(正しい 読み), exp(html), pts }
  function readItem(i) {
    const [k, w, r, s] = split(L().READ[i]);
    // まぎらわしい 読みを 優先: 同じ 字の 別の ことばの 読み > 最初か 最後の 音が 同じ > 長さが 近い
    const score = x => (Math.abs(x.length - r.length) <= 1 ? 1 : -5) + (x[0] === r[0] ? 2 : 0) + (x.slice(-1) === r.slice(-1) ? 1 : 0) + (x.slice(-2) === r.slice(-2) && x.length > 2 ? 1 : 0);
    const cand = L().READ.map(split).filter(x => x[2] !== r).map(x => [x[2], score(x[2]) + (x[0] === k ? 2 : 0) + Math.random() * 1.5]);
    cand.sort((p, q) => q[1] - p[1]);
    const opts = [r]; cand.forEach(x => { if (opts.length < 4 && opts.indexOf(x[0]) < 0) opts.push(x[0]); });
    const sent = esc(s).replace('〔' + esc(w) + '〕', '<u class="kk-tgt">' + esc(w) + '</u>');
    return finish({ key: 'read:' + i, sec: 'read', q: '<div class="kk-sent">' + sent + '</div><div class="kk-ask">線の ことばの 読みは?</div>', opts: opts, input: r,
      exp: '<b>' + esc(w) + '</b>(' + esc(r) + ')', speak: r, k: k });
  }
  function writable(i) { const w = split(L().READ[i])[1]; return w.split('').every(c => !isKanji(c) || gradeOf(c) <= LV_GRADE[lv]); }
  function writeItem(i) {
    const [k, w, r, s] = split(L().READ[i]);
    const g = LV_GRADE[lv], on = (KANKEN_ON[k] || '').split('/').filter(Boolean);
    const cands = [];
    Object.keys(KANKEN_ON).forEach(c => {
      if (c === k || w.indexOf(c) >= 0 || gradeOf(c) > g + 1) return;
      const o2 = KANKEN_ON[c].split('/');
      if (on.some(x => o2.indexOf(x) >= 0)) cands.push(c);
    });
    let pool = shuffle(cands.filter(c => gradeOf(c) <= g)).concat(shuffle(cands.filter(c => gradeOf(c) > g)));
    if (pool.length < 3) {
      const n = KANKEN_STROKES[k];
      pool = pool.concat(shuffle(KANKEN_GRADE[g].split('').filter(c => c !== k && Math.abs(KANKEN_STROKES[c] - n) <= 1)));
    }
    const opts = [w];
    pool.forEach(c => { const x = w.replace(k, c); if (opts.length < 4 && opts.indexOf(x) < 0) opts.push(x); });
    const kana = r; // ことば 全体を ひらがなで 見せる
    const sent = esc(s).replace('〔' + esc(w) + '〕', '<u class="kk-tgt kana">' + esc(kana) + '</u>');
    return finish({ key: 'write:' + i, sec: 'write', q: '<div class="kk-sent">' + sent + '</div><div class="kk-ask">線の ひらがなを 漢字に すると?</div>', opts: opts,
      exp: '<b>' + esc(w) + '</b>(' + esc(r) + ')', speak: r, k: k, big: true });
  }
  function okuriItem(i) {
    const [f, r] = split(L().OKURI[i]);
    let n = 0; while (n < f.length && isKanji(f[n])) n++;
    const stem = f.slice(0, n), ok = f.slice(n), sl = r.length - ok.length, alt = [];
    [sl - 1, sl - 2, sl + 1, sl - 3].forEach(p => { if (p > 0 && p < r.length) { const o = r.slice(p); if (o !== ok && alt.indexOf(o) < 0) alt.push(o); } });
    if (ok.length >= 2) { const o = ok.slice(1); if (alt.indexOf(o) < 0) alt.push(o); }   // 照らす → 照す
    const opts = [f]; alt.forEach(o => { if (opts.length < 4) opts.push(stem + o); });
    const exp = '<b>' + esc(f) + '</b>(' + esc(r) + ')', key = 'okuri:' + i;
    if (opts.length >= 3) return finish({ key: key, sec: 'okuri', q: '<div class="kk-big kana">' + esc(r) + '</div><div class="kk-ask">漢字と 送りがなで 正しく 書くと?</div>', opts: opts, exp: exp, big: true });
    // 選択肢が 足りない ときは「正しい ものは どれ?」形式 (ほかの ことばの まちがい 3つと)
    const wrong = [];
    shuffle(L().OKURI.map((x, j) => j).filter(j => j !== i)).forEach(j => {
      if (wrong.length >= 3) return;
      const [f2, r2] = split(L().OKURI[j]); let m = 0; while (m < f2.length && isKanji(f2[m])) m++;
      const ok2 = f2.slice(m), sl2 = r2.length - ok2.length, o2 = sl2 - 1 > 0 ? r2.slice(sl2 - 1) : ok2.length >= 2 ? ok2.slice(1) : null;
      if (o2 && o2 !== ok2) wrong.push(f2.slice(0, m) + o2);
    });
    return finish({ key: key, sec: 'okuri', q: '<div class="kk-ask" style="margin-top:0">送りがなが 正しい ものは どれ?</div>', opts: [f].concat(wrong), exp: exp + ' — ほかは 送りがなの まちがい', big: true });
  }
  function onkunItem(i) {
    const [k, r, t] = split(L().ONKUN[i]);
    return finish({ key: 'onkun:' + i, sec: 'onkun', q: '<div class="kk-big">' + esc(k) + '<small>(' + esc(r) + ')</small></div><div class="kk-ask">この 読み方は 音読み? 訓読み?</div>', opts: [t + '読み', (t === '音' ? '訓' : '音') + '読み'],
      exp: '「' + esc(r) + '」は <b>' + t + '読み</b>。' + (t === '音' ? '音読みは 中国から 伝わった 読み方で、それだけ 聞いても 意味が わかりにくい。' : '訓読みは 漢字に 日本語の 意味を あてた 読み方で、聞くと 意味が わかる。'), fixed: true });
  }
  const noStroke = c => typeof KANKEN_NOSTROKE !== 'undefined' && KANKEN_NOSTROKE.indexOf(c) >= 0;
  // 準1級・1級は 書き順データが そろって いないので 画数・筆順 ドリルは 出さない
  function secs() { const Lv = L(); return ORDER.filter(s => (s !== 'stroke' || LV_GRADE[lv] <= 10) && (!ARR[s] || (Lv[ARR[s]] && Lv[ARR[s]].length))); }
  function mockPlan() { return (L() && L().mock) || MOCK; }
  function ruigiItem(i) {
    const [a, b] = split(L().RUIGI[i]);
    const others = shuffle(L().RUIGI.filter((x, j) => j !== i).map(x => split(x)[Math.random() < 0.5 ? 0 : 1]));
    const opts = [b]; others.forEach(x => { if (opts.length < 4 && opts.indexOf(x) < 0 && x !== a) opts.push(x); });
    return finish({ key: 'ruigi:' + i, sec: 'ruigi', q: '<div class="kk-big">' + esc(a) + '</div><div class="kk-ask">似た 意味の ことば (類義語) は?</div>', opts: opts, exp: '<b>' + esc(a) + ' ≒ ' + esc(b) + '</b>', big: true });
  }
  function kouseiItem(i) {
    const [w, t] = split(L().KOUSEI[i]);
    return { key: 'kousei:' + i, sec: 'kousei', q: '<div class="kk-big">' + esc(w) + '</div><div class="kk-ask">この 熟語の 組み立ては?</div><div class="kk-kousei-key">' + Object.keys(KOUSEI).map(x => '<div><b>' + x + '</b> ' + esc(KOUSEI[x]) + '</div>').join('') + '</div>',
      opts: ['ア', 'イ', 'ウ', 'エ'], ans: 'アイウエ'.indexOf(t), exp: '<b>' + esc(w) + '</b> → ' + t + ': ' + esc(KOUSEI[t].replace(/ \(例.*\)/, '')), big: true };
  }
  // 表外読み: 'ことば|正|誤|誤|誤|例文'
  function hyogaiItem(i) {
    const [w, a, b, c, d, s] = split(L().HYOGAI[i]);
    const sent = esc(s).replace('〔' + esc(w) + '〕', '<u class="kk-tgt">' + esc(w) + '</u>');
    return finish({ key: 'hyogai:' + i, sec: 'hyogai', q: '<div class="kk-sent">' + sent + '</div><div class="kk-ask">線の ことばの 読みは?</div>', opts: [a, b, c, d],
      exp: '<b>' + esc(w) + '</b>(' + esc(a) + ')', speak: a });
  }
  // 旧字体: '新|旧' — 新字体を 見て 旧字体を えらぶ (選択肢は ほかの 旧字体)
  function kyujiItem(i) {
    const [a, b] = split(L().KYUJI[i]);
    const rev = Math.random() < 0.35, k = rev ? 0 : 1;   // ときどき 旧→新 も
    const others = shuffle(L().KYUJI.filter((x, j) => j !== i).map(x => split(x)[k]));
    return finish({ key: 'kyuji:' + i, sec: 'kyuji', q: '<div class="kk-big kk-kyu">' + esc(rev ? b : a) + '</div><div class="kk-ask">' + (rev ? 'この 旧字体を 今の 字に すると?' : 'この 字の 旧字体 (昔の 形) は どれ?') + '</div>',
      opts: [rev ? a : b].concat(others.slice(0, 3)), exp: '<b>' + esc(a) + '</b> の 旧字体は <b>' + esc(b) + '</b>' + (KANKEN_ON[a] ? ' (' + esc(KANKEN_ON[a].split('/')[0]) + ')' : ''), big: true, kyu: true });
  }
  // 誤字訂正: '文|誤|正' — 文の 中の まちがった 字を えらぶ (選択肢は 文中の ほかの 漢字)
  function gojiItem(i) {
    const [t, x, y] = split(L().GOJI[i]);
    const others = shuffle(Array.from(new Set(t.split('').filter(c => isKanji(c) && c !== x))));
    return finish({ key: 'goji:' + i, sec: 'goji', q: '<div class="kk-sent">' + esc(t) + '</div><div class="kk-ask">まちがって 使われて いる 漢字は どれ?</div>', opts: [x].concat(others.slice(0, 3)),
      exp: '<b>' + esc(x) + ' → ' + esc(y) + '</b>: ' + esc(t.replace(x, y)), big: true });
  }
  function taigiItem(i) {
    const [a, b] = split(L().TAIGI[i]);
    const others = shuffle(L().TAIGI.filter((x, j) => j !== i).map(x => split(x)[Math.random() < 0.5 ? 0 : 1]));
    const opts = [b]; others.forEach(x => { if (opts.length < 4 && opts.indexOf(x) < 0 && x !== a) opts.push(x); });
    return finish({ key: 'taigi:' + i, sec: 'taigi', q: '<div class="kk-big">' + esc(a) + '</div><div class="kk-ask">反対の 意味の ことば (対義語) は?</div>', opts: opts, exp: '<b>' + esc(a) + ' ↔ ' + esc(b) + '</b>', big: true });
  }
  function blankItem(sec, i, arr, ask) {
    const [w, a, ...d] = split(arr[i]);
    const m = w.match(/〔(.+?)〕/);
    const html = esc(w).replace(/〔(.+?)〕/, '<span class="kk-blank">$1</span>');
    return finish({ key: sec + ':' + i, sec: sec, q: '<div class="kk-big">' + html + '</div><div class="kk-ask">' + ask + '</div>', opts: [a].concat(d.slice(0, 3)),
      exp: '<b>' + esc(w.replace(m[0], a)) + '</b>' + (d[3] ? '<div class="kk-mean">' + esc(d[3]) + '</div>' : ''), big: true });
  }
  function bushuItem(i) {
    const [k, b, nm] = split(L().BUSHU[i]);
    const pool = L().BUSHU.map(split).filter(x => x[1] !== b);
    if (Math.random() < 0.5) {
      const opts = [b]; shuffle(pool).forEach(x => { if (opts.length < 4 && opts.indexOf(x[1]) < 0 && k.indexOf(x[1]) < 0) opts.push(x[1]); });
      return finish({ key: 'bushu:' + i, sec: 'bushu', q: '<div class="kk-big">' + esc(k) + '</div><div class="kk-ask">この 漢字の 部首は?</div>', opts: opts, exp: '<b>' + esc(k) + '</b> の 部首は <b>' + esc(b) + '</b>(' + esc(nm) + ')', big: true });
    }
    const opts = [nm]; shuffle(pool).forEach(x => { if (opts.length < 4 && opts.indexOf(x[2]) < 0) opts.push(x[2]); });
    return finish({ key: 'bushu:' + i, sec: 'bushu', q: '<div class="kk-big">' + esc(k) + '<small>部首: ' + esc(b) + '</small></div><div class="kk-ask">部首の 名前は?</div>', opts: opts, exp: '<b>' + esc(b) + '</b> = ' + esc(nm) });
  }
  function strokeItem(k, kind) {
    const n = KANKEN_STROKES[k];
    if (kind === 'count' || n < 3) {
      const opts = [n]; [n + 1, n - 1, n + 2, n - 2].forEach(x => { if (x > 0 && opts.length < 4) opts.push(x); });
      return finish({ key: 'stroke:' + k, sec: 'stroke', q: '<div class="kk-big">' + esc(k) + '</div><div class="kk-ask">総画数 (ぜんぶで 何画) は?</div>', opts: opts.map(x => x + '画'),
        exp: '<b>' + esc(k) + '</b> は <b>' + n + '画</b>', k: k, showOrder: true });
    }
    const s = Math.floor(Math.random() * n);
    const opts = [s + 1]; shuffle(Array.from({ length: n }, (x, j) => j + 1)).forEach(x => { if (opts.length < 4 && opts.indexOf(x) < 0) opts.push(x); });
    return finish({ key: 'order:' + k, sec: 'stroke', q: '<div class="kk-svgbox" data-k="' + esc(k) + '" data-s="' + s + '"></div><div class="kk-ask">赤い ところは 何画目?</div>', opts: opts.map(x => x + '画目'),
      exp: '<b>' + esc(k) + '</b> の 赤い ところは <b>' + (s + 1) + '画目</b> (全部で ' + n + '画)', k: k, showOrder: true });
  }
  // 選択肢を シャッフルし 正解の 位置を 記録
  function finish(it) {
    if (it.fixed) { const o = shuffle([0, 1]); it.opts = o.map(j => it.opts[j]); it.ans = o.indexOf(0); return it; }
    const idx = shuffle(it.opts.map((x, j) => j)); it.ans = idx.indexOf(0); it.opts = idx.map(j => it.opts[j]); return it;
  }
  function gen(sec, n) {
    const Lv = L(), out = [];
    const take = (len, f) => shuffle(Array.from({ length: len }, (x, j) => j)).slice(0, n).forEach(j => out.push(f(j)));
    // 読み・書きは 同じ ことばが 1回の セットで 重ならないように (2字とも その級の 漢字の ことばが ある ため)
    const uniq = idx => { const seen = new Set(), r = []; idx.forEach(j => { const w = split(Lv.READ[j])[1]; if (r.length < n && !seen.has(w)) { seen.add(w); r.push(j); } }); return r; };
    if (sec === 'read') uniq(shuffle(Lv.READ.map((x, j) => j))).forEach(j => out.push(readItem(j)));
    else if (sec === 'write') uniq(shuffle(Lv.READ.map((x, j) => j).filter(writable))).forEach(j => out.push(writeItem(j)));
    else if (sec === 'okuri') take(Lv.OKURI.length, okuriItem);
    else if (sec === 'onkun') take(Lv.ONKUN.length, onkunItem);
    else if (sec === 'taigi') take(Lv.TAIGI.length, taigiItem);
    else if (sec === 'ruigi') take(Lv.RUIGI.length, ruigiItem);
    else if (sec === 'kousei') take(Lv.KOUSEI.length, kouseiItem);
    else if (sec === 'douon') take(Lv.DOUON.length, j => blankItem('douon', j, Lv.DOUON, '〔 〕の カタカナに あう 漢字は?'));
    else if (sec === 'sanji') take(Lv.SANJI.length, j => blankItem('sanji', j, Lv.SANJI, '〔 〕に 入る 漢字は?'));
    else if (sec === 'yoji') take(Lv.YOJI.length, j => blankItem('yoji', j, Lv.YOJI, '〔 〕に 入る 漢字は?'));
    else if (sec === 'goji') take(Lv.GOJI.length, gojiItem);
    else if (sec === 'kyuji') take(Lv.KYUJI.length, kyujiItem);
    else if (sec === 'hyogai') take(Lv.HYOGAI.length, hyogaiItem);
    else if (sec === 'koji') take(Lv.KOJI.length, j => blankItem('koji', j, Lv.KOJI, '〔 〕に 入る 漢字は?'));
    else if (sec === 'bushu') take(Lv.BUSHU.length, bushuItem);
    else if (sec === 'stroke') shuffle(newKanji()).slice(0, n).forEach((k, j) => out.push(strokeItem(k, j % 2 ? 'count' : 'order')));
    return out;
  }
  function fromKey(key) {
    const [sec, id] = key.split(':'), Lv = L(); if (!Lv) return null;
    const i = +id;
    try {
      if (sec === 'read') return Lv.READ[i] ? readItem(i) : null;
      if (sec === 'write') return Lv.READ[i] ? writeItem(i) : null;
      if (sec === 'okuri') return Lv.OKURI[i] ? okuriItem(i) : null;
      if (sec === 'onkun') return Lv.ONKUN[i] ? onkunItem(i) : null;
      if (sec === 'taigi') return Lv.TAIGI[i] ? taigiItem(i) : null;
      if (sec === 'ruigi') return Lv.RUIGI && Lv.RUIGI[i] ? ruigiItem(i) : null;
      if (sec === 'kousei') return Lv.KOUSEI && Lv.KOUSEI[i] ? kouseiItem(i) : null;
      if (sec === 'douon') return Lv.DOUON[i] ? blankItem('douon', i, Lv.DOUON, '〔 〕の カタカナに あう 漢字は?') : null;
      if (sec === 'sanji') return Lv.SANJI[i] ? blankItem('sanji', i, Lv.SANJI, '〔 〕に 入る 漢字は?') : null;
      if (sec === 'yoji') return Lv.YOJI && Lv.YOJI[i] ? blankItem('yoji', i, Lv.YOJI, '〔 〕に 入る 漢字は?') : null;
      if (sec === 'goji') return Lv.GOJI && Lv.GOJI[i] ? gojiItem(i) : null;
      if (sec === 'hyogai') return Lv.HYOGAI && Lv.HYOGAI[i] ? hyogaiItem(i) : null;
      if (sec === 'kyuji') return Lv.KYUJI && Lv.KYUJI[i] ? kyujiItem(i) : null;
      if (sec === 'koji') return Lv.KOJI && Lv.KOJI[i] ? blankItem('koji', i, Lv.KOJI, '〔 〕に 入る 漢字は?') : null;
      if (sec === 'bushu') return Lv.BUSHU[i] ? bushuItem(i) : null;
      if (sec === 'stroke') return newKanji().indexOf(id) >= 0 ? strokeItem(id, 'count') : null;
      if (sec === 'order') return newKanji().indexOf(id) >= 0 ? strokeItem(id, 'order') : null;
      if (sec === 'hw') return Lv.READ[i] ? { hw: true, key: key, i: i } : null;
    } catch (e) {}
    return null;
  }
  // 苦手 = 1回以上 まちがえて、まだ 2回 連続で 正解して いない 問題
  function weakKeys() {
    const r = data().rec, pre = lv + ':';
    return Object.keys(r).filter(k => k.indexOf(pre) === 0 && r[k][1] > 0 && r[k][0] < 2).map(k => k.slice(pre.length));
  }

  // ---------- 画面 ----------
  function open() { killWriters(); showPage('pageKanken'); home(); }
  function frame(inner) { killWriters(); $('kkArea').innerHTML = inner; $('pageKanken').scrollTop = 0; }
  function mastered() {
    const Lv = L(); if (!Lv) return 0;
    const okRead = new Set(), okWrite = new Set();
    Lv.READ.forEach((x, i) => { const k = split(x)[0]; if (got('read:' + i)) okRead.add(k); if (got('write:' + i) || got('hw:' + i)) okWrite.add(k); });
    let n = 0; okRead.forEach(k => { if (okWrite.has(k)) n++; }); return n;
  }

  function home() {
    let h = '<div class="kk-head"><div class="kk-seal">漢</div><div><h1>漢検道場</h1><p>漢字の 読み・書き・書き順を 鍛えよう。級を えらんでね。</p></div></div>';
    h += '<div class="kk-lvgrid">';
    LVS.forEach(n => {
      const ready = typeof KANKEN_LV !== 'undefined' && !!KANKEN_LV[n];
      const cnt = (KANKEN_GRADE[LV_GRADE[n]] || '').length;
      let sub = LV_TARGET[n] + ' · 新しい 漢字 ' + cnt + '字';
      if (ready) { const save = lv; lv = n; const m = mastered(); lv = save; sub += '<br>覚えた ' + m + ' / ' + cnt; }
      const best = (data().mock[n] || {}).best;
      h += '<button class="kk-lv' + (ready ? ' ready' : '') + '" data-lv="' + n + '"><b>' + lvName(n) + '</b><span>' + sub + '</span>' +
        (best != null ? '<i>模試 最高 ' + best + '点</i>' : '') + (ready ? '' : '<em>カードのみ</em>') + '</button>';
    });
    h += '</div><p class="kk-foot">漢字の 学年は 2020年度からの 学年別漢字配当表 (小学校)。問題は ハルゲームの オリジナルです。<br>書き順データ: animCJK / hanzi-writer-data-jp · 書き順表示: Hanzi Writer (MIT)</p>';
    frame(h);
    $('kkArea').querySelectorAll('.kk-lv').forEach(b => b.onclick = () => { sfx('click'); lv = lvParse(b.dataset.lv); L() ? menu() : cards(); });
  }

  function menu() {
    data().lastLv = lv; save();
    const Lv = L(), cnt = newKanji().length, m = mastered(), weak = weakKeys().length;
    const best = (data().mock[lv] || {}).best;
    let h = '<div class="kk-top"><button class="kk-back" id="kkHome">← 級を えらぶ</button><b>' + lvName(lv) + '</b><span>' + LV_TARGET[lv] + '</span></div>';
    h += '<div class="kk-prog-card"><div class="kk-prog-t">覚えた 漢字 <b>' + m + '</b> / ' + cnt + '<small>(読みと 書きの 両方 正解で 1字)</small></div><div class="kk-bar"><i style="width:' + Math.round(m / cnt * 100) + '%"></i></div>' +
      (best != null ? '<div class="kk-prog-s">本番形式 最高 <b>' + best + '</b> / 200点 ' + (best >= 140 ? '🌸 合格ライン!' : '(合格の めやす 140点)') + '</div>' : '') + '</div>';
    h += '<div class="kk-main-btns">';
    h += '<button class="kk-mbtn card" id="kkCards"><span>📇</span><b>漢字カード</b><small>書き順 アニメ・例文</small></button>';
    if (HW()) h += '<button class="kk-mbtn hw" id="kkHW"><span>✍️</span><b>手書き 書き取り</b><small>指で 書いて 判定</small></button>';
    h += '<button class="kk-mbtn mock" id="kkMock"><span>⏱️</span><b>本番形式</b><small>' + mockPlan().reduce((a, x) => a + x[1], 0) + '問 · 200点</small></button>';
    h += '<button class="kk-mbtn weak" id="kkWeak"' + (weak ? '' : ' disabled') + '><span>❗</span><b>苦手 復習</b><small>' + weak + '問</small></button>';
    h += '</div><h2 class="kk-h2">分野別 ドリル <small>(10問ずつ)</small></h2><div class="kk-secgrid">';
    secs().forEach(s => {
      h += '<button class="kk-sec" data-s="' + s + '"><span>' + SEC[s].icon + '</span><b>' + SEC[s].name + '</b><small>' + SEC[s].note + '</small></button>';
    });
    h += '</div><label class="kk-set"><input type="checkbox" id="kkInput"' + (data().set.input ? ' checked' : '') + '> 読みは 自分で 入力して 答える (本番と 同じ)</label>';
    frame(h);
    $('kkHome').onclick = () => { sfx('click'); home(); };
    $('kkCards').onclick = () => { sfx('click'); cards(); };
    if ($('kkHW')) $('kkHW').onclick = () => { sfx('click'); startHW(); };
    $('kkMock').onclick = () => { sfx('click'); startMock(); };
    $('kkWeak').onclick = () => { sfx('click'); startWeak(); };
    $('kkInput').onchange = e => { data().set.input = e.target.checked; save(); };
    $('kkArea').querySelectorAll('.kk-sec').forEach(b => b.onclick = () => { sfx('click'); startDrill(b.dataset.s); });
  }

  // ---- 漢字カード ----
  function cards() {
    const ks = newKanji(), Lv = L();
    const done = new Set(); if (Lv) Lv.READ.forEach((x, i) => { if (got('read:' + i)) done.add(split(x)[0]); });
    let h = '<div class="kk-top"><button class="kk-back" id="kkBack">← もどる</button><b>' + lvName(lv) + ' 漢字カード</b><span>' + ks.length + '字</span></div>';
    h += '<p class="kk-tip">漢字を タップすると 書き順と 例文が 見られるよ。</p><div class="kk-kgrid">';
    ks.forEach(k => { h += '<button class="kk-k' + (done.has(k) ? ' done' : '') + '" data-k="' + esc(k) + '">' + esc(k) + '</button>'; });
    h += '</div>';
    frame(h);
    $('kkBack').onclick = () => { sfx('click'); L() ? menu() : home(); };
    $('kkArea').querySelectorAll('.kk-k').forEach(b => b.onclick = () => { sfx('click'); card(b.dataset.k); });
  }
  function examples(k) { const Lv = L(); return Lv ? Lv.READ.map((x, i) => [split(x), i]).filter(a => a[0][0] === k) : []; }
  function card(k) {
    const ks = newKanji(), at = ks.indexOf(k), n = KANKEN_STROKES[k];
    let h = '<div class="kk-top"><button class="kk-back" id="kkBack">← 一覧</button><b>' + esc(k) + '</b><span>' + (at + 1) + ' / ' + ks.length + '</span></div>';
    h += '<div class="kk-card"><div class="kk-grid-box"><div id="kkWriter" class="kk-writer"></div></div>';
    h += '<div class="kk-meta"><span>' + n + '画</span><span>' + (LV_GRADE[lv] <= 6 ? LV_GRADE[lv] + '年生' : lvName(lv)) + '</span></div>';
    if (HW()) h += '<div class="kk-cbtns"><button id="kkPlay">▶ 書き順</button><button id="kkTrace">✍️ なぞる</button><button id="kkSteps">🔢 1画ずつ</button></div>';
    h += '<div id="kkSteps2" class="kk-steps"></div>';
    const ex = examples(k);
    if (ex.length) {
      h += '<div class="kk-ex"><h3>例文</h3>';
      ex.forEach(([a]) => { h += '<div class="kk-exrow"><button class="kk-say" data-say="' + esc(a[2]) + '">🔊</button><div><b>' + esc(a[1]) + '</b> <span class="kana">' + esc(a[2]) + '</span><p>' + esc(a[3]).replace(/〔|〕/g, '') + '</p></div></div>'; });
      h += '</div>';
    } else if (KANKEN_ON[k]) {
      const kata = KANKEN_ON[k].replace(/[\u3041-\u3096]/g, c => String.fromCharCode(c.charCodeAt(0) + 0x60)).split('/').join('・');
      h += '<div class="kk-ex"><h3>音読み</h3><p class="kk-on">' + esc(kata) + '</p></div>';
    }
    h += '<div class="kk-nav"><button id="kkPrev"' + (at > 0 ? '' : ' disabled') + '>← 前</button><button id="kkNext"' + (at < ks.length - 1 ? '' : ' disabled') + '>次 →</button></div></div>';
    frame(h);
    $('kkBack').onclick = () => { sfx('click'); cards(); };
    $('kkPrev').onclick = () => { sfx('click'); card(ks[at - 1]); };
    $('kkNext').onclick = () => { sfx('click'); card(ks[at + 1]); };
    $('kkArea').querySelectorAll('.kk-say').forEach(b => b.onclick = () => say(b.dataset.say));
    const box = $('kkWriter');
    if (HW() && !noStroke(k)) {
      const size = Math.min(260, box.clientWidth || 260);
      const w = makeWriter(box, k, size, { showOutline: true });
      setTimeout(() => { try { w.animateCharacter(); } catch (e) {} }, 300);
      $('kkPlay').onclick = () => { killQuiz(w); w.showCharacter(); w.animateCharacter(); };
      $('kkTrace').onclick = () => { w.hideCharacter(); w.quiz({ showHintAfterMisses: 2, onComplete: () => { sfx('correct'); } }); };
      $('kkSteps').onclick = () => showSteps(k);
    } else {
      ['kkPlay', 'kkTrace', 'kkSteps'].forEach(id => { const b = $(id); if (b) b.style.display = 'none'; });
      strokeData(k).then(d => { box.innerHTML = strokeSVG(d, -1).replace(/#d8d2c4/g, '#3a3a3a'); }).catch(() => { box.innerHTML = '<div class="kk-plain">' + esc(k) + '</div>'; });
    }
  }
  function killQuiz(w) { try { w.cancelQuiz(); } catch (e) {} }
  function showSteps(k) {
    strokeData(k).then(d => {
      let s = ''; d.strokes.forEach((x, i) => { s += '<div class="kk-step">' + strokeSVG(d, i) + '<span>' + (i + 1) + '</span></div>'; });
      $('kkSteps2').innerHTML = s;
    }).catch(() => {});
  }
  function makeWriter(el, k, size, opt) {
    const w = HanziWriter.create(el, k, Object.assign({
      width: size, height: size, padding: Math.round(size * 0.06),
      strokeColor: '#2b2b2b', outlineColor: '#e4ddcc', drawingColor: '#1f3a5f', highlightColor: '#f2c14e', radicalColor: null,
      strokeAnimationSpeed: 1.1, delayBetweenStrokes: 180, drawingWidth: Math.max(18, Math.round(size / 12)), showCharacter: true,
      charDataLoader: (c, onLoad, onErr) => { strokeData(c).then(onLoad).catch(onErr); },
    }, opt || {}));
    writers.push(w); return w;
  }

  // ---- ドリル (選択式) ----
  function startDrill(sec) { start(SEC[sec].icon + ' ' + SEC[sec].name, gen(sec, 10), 'drill'); }
  function startWeak() {
    const items = shuffle(weakKeys()).slice(0, 10).map(fromKey).filter(Boolean);
    if (!items.length) return;
    start('❗ 苦手 復習', items, 'weak');
  }
  function startMock() {
    const items = []; mockPlan().forEach(([s, n, p]) => gen(s, n).forEach(it => { it.pts = p; it.part = s; items.push(it); }));
    start('⏱️ ' + lvName(lv) + ' 本番形式', items, 'mock');
  }
  function start(title, items, mode) { run = { title: title, items: items, i: 0, ok: 0, mode: mode, res: [] }; ask(); }
  function ask() {
    const it = run.items[run.i];
    if (!it) return result();
    if (it.hw) return askHW(it);
    const useInput = it.sec === 'read' && data().set.input && it.input;
    let h = '<div class="kk-top"><button class="kk-back" id="kkQuit">✕ やめる</button><b>' + esc(run.title) + '</b><span>' + (run.i + 1) + ' / ' + run.items.length + '</span></div>';
    h += '<div class="kk-bar thin"><i style="width:' + Math.round(run.i / run.items.length * 100) + '%"></i></div>';
    if (run.mode === 'mock' && (!run.items[run.i - 1] || run.items[run.i - 1].part !== it.part)) h += '<div class="kk-part">' + SEC[it.part].icon + ' ' + SEC[it.part].name + ' (' + it.pts + '点 × ' + run.items.filter(x => x.part === it.part).length + '問)</div>';
    h += '<div class="kk-qcard">' + it.q;
    if (useInput) h += '<div class="kk-inrow"><input id="kkIn" class="kk-in" autocomplete="off" inputmode="kana" placeholder="ひらがなで"><button id="kkOk" class="kk-go">決定</button></div><button id="kkIdk" class="kk-idk">わからない</button>';
    else { h += '<div class="kk-opts' + (it.big ? ' big' : '') + (it.kyu ? ' kyu' : '') + '">'; it.opts.forEach((o, j) => { h += '<button class="kk-opt" data-j="' + j + '">' + esc(o) + '</button>'; }); h += '</div>'; }
    h += '<div id="kkFb"></div></div>';
    frame(h);
    $('kkQuit').onclick = () => { sfx('click'); menu(); };
    const svg = $('kkArea').querySelector('.kk-svgbox');
    if (svg) strokeData(svg.dataset.k).then(d => { svg.innerHTML = strokeSVG(d, +svg.dataset.s); }).catch(() => { svg.textContent = svg.dataset.k; });
    if (useInput) {
      const inp = $('kkIn'); setTimeout(() => inp.focus(), 50);
      const go = () => { const v = k2h(inp.value.trim().replace(/\s/g, '')); if (!v) return; answer(v === k2h(it.input), null, v); };
      $('kkOk').onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
      $('kkIdk').onclick = () => answer(false, null, '');
    } else $('kkArea').querySelectorAll('.kk-opt').forEach(b => b.onclick = () => answer(+b.dataset.j === it.ans, +b.dataset.j));
  }
  function answer(ok, j, typed) {
    const it = run.items[run.i]; if (it.done) return; it.done = true;
    $('kkArea').querySelectorAll('.kk-opt').forEach((b, x) => { b.disabled = true; if (x === it.ans) b.classList.add('ok'); else if (x === j) b.classList.add('ng'); });
    if ($('kkIn')) { $('kkIn').disabled = true; $('kkOk').disabled = true; $('kkIdk').disabled = true; }
    if (ok) run.ok++;
    run.res.push({ it: it, ok: ok });
    mark(it.key, ok);
    try { sfx(ok ? 'correct' : 'wrong'); } catch (e) {}
    try { if (typeof Study !== 'undefined') Study.log('kanken', ok, it.sec); } catch (e) {}
    let fb = '<div class="kk-fb ' + (ok ? 'ok' : 'ng') + '"><b>' + (ok ? '⭕ 正解!' : '❌ ざんねん') + '</b>';
    if (!ok && typed != null) fb += '<div>正しい 読み: <b>' + esc(it.input) + '</b>' + (typed ? ' (あなたの 答え: ' + esc(typed) + ')' : '') + '</div>';
    fb += '<div class="kk-exp">' + it.exp + (it.speak ? ' <button class="kk-say" id="kkSay">🔊</button>' : '') + '</div>';
    if (it.showOrder && HW()) fb += '<div class="kk-mini" id="kkMini"></div>';
    fb += '<button class="kk-next" id="kkNext">' + (run.i + 1 < run.items.length ? '次へ →' : '結果を 見る') + '</button></div>';
    $('kkFb').innerHTML = fb;
    if ($('kkSay')) $('kkSay').onclick = () => say(it.speak);
    if ($('kkMini')) { const w = makeWriter($('kkMini'), it.k, 110, { showOutline: true }); setTimeout(() => { try { w.animateCharacter(); } catch (e) {} }, 200); }
    $('kkNext').onclick = () => { sfx('click'); run.i++; ask(); };
    const nb = $('kkNext'); if (nb.scrollIntoView) nb.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  // ---- 手書き 書き取り ----
  function startHW() {
    const idx = shuffle(L().READ.map((x, i) => i).filter(i => writable(i) && !split(L().READ[i])[1].split('').some(noStroke) && split(L().READ[i])[1].split('').filter(isKanji).length <= 3)).slice(0, 8);
    run = { title: '✍️ 手書き 書き取り', items: idx.map(i => ({ hw: true, key: 'hw:' + i, i: i })), i: 0, ok: 0, mode: 'hw', res: [] };
    ask();
  }
  function askHW(it) {
    const [k, w, r, s] = split(L().READ[it.i]);
    const chars = w.split(''), idxs = chars.map((c, j) => isKanji(c) ? j : -1).filter(j => j >= 0);
    let h = '<div class="kk-top"><button class="kk-back" id="kkQuit">✕ やめる</button><b>' + esc(run.title) + '</b><span>' + (run.i + 1) + ' / ' + run.items.length + '</span></div>';
    h += '<div class="kk-bar thin"><i style="width:' + Math.round(run.i / run.items.length * 100) + '%"></i></div>';
    h += '<div class="kk-qcard"><div class="kk-sent">' + esc(s).replace('〔' + esc(w) + '〕', '<u class="kk-tgt kana">' + esc(r) + '</u>') + '</div>';
    h += '<div class="kk-slots">';
    chars.forEach((c, j) => { h += isKanji(c) ? '<div class="kk-slot" id="kkSl' + j + '"></div>' : '<div class="kk-slot kana">' + esc(c) + '</div>'; });
    h += '</div><div class="kk-ask" id="kkHwAsk"></div><div class="kk-hwbig-wrap"><div class="kk-hwbox" id="kkHwBig"></div></div>';
    h += '<div class="kk-hwbtns"><button id="kkHint">💡 ヒント</button><button id="kkGive">🏳️ 答えを 見る</button></div><div id="kkFb"></div></div>';
    frame(h);
    $('kkQuit').onclick = () => { sfx('click'); menu(); };
    const big = $('kkHwBig'), size = Math.max(200, Math.min(300, (($('kkArea').clientWidth) || 360) - 60));
    big.style.width = big.style.height = size + 'px';
    const st = { miss: 0, gave: false, cur: 0, w: null };
    function ask1() {
      document.querySelectorAll('.kk-slot.on').forEach(x => x.classList.remove('on'));
      $('kkSl' + idxs[st.cur]).classList.add('on');
      $('kkHwAsk').textContent = (idxs.length > 1 ? (st.cur + 1) + '字目を ' : '') + '書こう (書き順も 見ているよ)';
      killWriters(); big.innerHTML = '';
      st.w = makeWriter(big, chars[idxs[st.cur]], size, { showCharacter: false, showOutline: false });
      quiz1();
    }
    function quiz1() {
      st.w.quiz({ showHintAfterMisses: 3, leniency: 1.15,
        onMistake: () => { st.miss++; },
        onComplete: () => {
          const sl = $('kkSl' + idxs[st.cur]); sl.textContent = chars[idxs[st.cur]]; sl.classList.remove('on'); sl.classList.add('fin');
          st.cur++; setTimeout(() => { if (it.done) return; st.cur < idxs.length ? ask1() : done(); }, 450);
        } });
    }
    function done() {
      if (it.done) return;
      const ok = !st.gave && st.miss <= idxs.length * 2;
      it.done = true; if (ok) run.ok++; run.res.push({ it: { sec: 'hw', exp: '<b>' + esc(w) + '</b>(' + esc(r) + ')' }, ok: ok });
      mark(it.key, ok); if (ok) mark('write:' + it.i, true);
      try { sfx(ok ? 'correct' : 'wrong'); } catch (e) {}
      try { if (typeof Study !== 'undefined') Study.log('kanken', ok, 'hw'); } catch (e) {}
      $('kkHint').disabled = true; $('kkGive').disabled = true;
      $('kkFb').innerHTML = '<div class="kk-fb ' + (ok ? 'ok' : 'ng') + '"><b>' + (ok ? (st.miss ? '⭕ よく できました!' : '💮 かんぺき!') : (st.gave ? '📖 答えを 確認しよう' : '△ もう少し')) + '</b>' +
        '<div class="kk-exp"><b>' + esc(w) + '</b>(' + esc(r) + ')' + (st.miss ? ' — ミス・ヒント ' + st.miss + '回' : '') + '</div><button class="kk-next" id="kkNext">' + (run.i + 1 < run.items.length ? '次へ →' : '結果を 見る') + '</button></div>';
      $('kkNext').onclick = () => { sfx('click'); run.i++; ask(); };
    }
    $('kkHint').onclick = () => {
      if (!st.w) return; st.miss++;
      try { st.w.cancelQuiz(); st.w.showCharacter(); st.w.animateCharacter({ onComplete: () => setTimeout(() => { if (it.done) return; st.w.hideCharacter(); quiz1(); }, 500) }); } catch (e) {}
    };
    $('kkGive').onclick = () => {
      st.gave = true;
      idxs.forEach(j => { const sl = $('kkSl' + j); if (!sl.classList.contains('fin')) { sl.textContent = chars[j]; sl.classList.add('gave'); } sl.classList.remove('on'); });
      try { st.w.cancelQuiz(); st.w.showCharacter(); st.w.animateCharacter(); } catch (e) {}
      done();
    };
    ask1();
  }
  // ---- 結果 ----
  function result() {
    const n = run.items.length;
    let h = '<div class="kk-top"><b>' + esc(run.title) + '</b></div><div class="kk-qcard kk-result">';
    if (run.mode === 'mock') {
      let raw = 0, max = 0; const per = {};
      run.items.forEach((it, j) => { const ok = run.res[j] && run.res[j].ok; max += it.pts; if (ok) raw += it.pts; const p = per[it.part] || (per[it.part] = [0, 0]); p[1]++; if (ok) p[0]++; });
      const score = Math.round(raw / max * 200), pass = score >= 140;
      const m = data().mock[lv] || (data().mock[lv] = {}); m.best = Math.max(m.best || 0, score); m.last = (m.last || []).concat([[Date.now(), score]]).slice(-10); save();
      h += '<div class="kk-score' + (pass ? ' pass' : '') + '"><b>' + score + '</b><span>/ 200点</span></div><div class="kk-verdict">' + (pass ? '🌸 合格ライン 突破!' : '合格の めやすは 140点。あと ' + (140 - score) + '点!') + '</div><table class="kk-tbl">';
      mockPlan().forEach(([s]) => { const p = per[s]; if (p) h += '<tr><td>' + SEC[s].icon + ' ' + SEC[s].name + '</td><td>' + p[0] + ' / ' + p[1] + '</td><td><div class="kk-bar mini"><i style="width:' + Math.round(p[0] / p[1] * 100) + '%"></i></div></td></tr>'; });
      h += '</table>';
    } else {
      h += '<div class="kk-score' + (run.ok >= n * 0.8 ? ' pass' : '') + '"><b>' + run.ok + '</b><span>/ ' + n + '問</span></div><div class="kk-verdict">' + (run.ok === n ? '💮 全問 正解!' : run.ok >= n * 0.8 ? '🌸 よく できました!' : '💪 苦手 復習で もう一度!') + '</div>';
    }
    const wrong = run.res.filter(x => !x.ok);
    if (wrong.length) { h += '<div class="kk-wrong"><h3>まちがえた 問題</h3>'; wrong.slice(0, 20).forEach(x => { h += '<div>' + x.it.exp + '</div>'; }); h += '</div>'; }
    h += '<div class="kk-rbtns"><button class="kk-go" id="kkAgain">もう一度</button><button class="kk-back2" id="kkMenu">メニューへ</button></div></div>';
    frame(h);
    const again = run.mode === 'mock' ? startMock : run.mode === 'hw' ? startHW : run.mode === 'weak' ? startWeak : () => startDrill(run.items[0].sec);
    $('kkAgain').onclick = () => { sfx('click'); again(); };
    $('kkMenu').onclick = () => { sfx('click'); menu(); };
  }

  function stats() {
    const d = data(); let n = 0; Object.keys(d.rec).forEach(k => { if (d.rec[k][2] === 1) n++; });
    const save = lv; lv = d.lastLv || 7; const out = { solved: n, lv: lv, name: lvName(lv), mastered: L() ? mastered() : 0, total: newKanji().length, best: (d.mock[lv] || {}).best }; lv = save; return out;
  }
  // 保護者レポート用: 級ごとの 覚えた字数・模試・分野別 (最後の 答えが 正解の 割合)
  function report() {
    const d = data(); if (!Object.keys(d.rec).length) return '';
    const save = lv; let h = '';
    LVS.forEach(n => {
      lv = n; if (!L()) return;
      const pre = n + ':', per = {};
      Object.keys(d.rec).forEach(k => { if (k.indexOf(pre)) return; let sec = k.split(':')[1]; if (sec === 'order') sec = 'stroke'; const p = per[sec] || (per[sec] = [0, 0]); p[0]++; if (d.rec[k][2] === 1) p[1]++; });
      if (!Object.keys(per).length) return;
      const m = d.mock[n] || {};
      h += '<p><b>' + lvName(n) + '</b> 覚えた 漢字 <b>' + mastered() + '</b> / ' + newKanji().length + '字' + (m.best != null ? ' · 本番形式 最高 <b>' + m.best + '</b>/200点 (直近 ' + m.last[m.last.length - 1][1] + '点)' : '') + ' · 苦手 ' + weakKeys().length + '問</p>';
      h += '<table class="pr-tbl"><thead><tr><th>分野</th><th>解いた 問題</th><th>いま 正解</th></tr></thead><tbody>';
      Object.keys(SEC).forEach(sec => { const p = per[sec]; if (p) h += '<tr><th>' + SEC[sec].name + '</th><td>' + p[0] + '</td><td>' + Math.round(p[1] / p[0] * 100) + '%</td></tr>'; });
      h += '</tbody></table>';
    });
    lv = save; return h;
  }
  return { open: open, stats: stats, report: report, _gen: gen, _setLv: n => { lv = n; }, _cur: () => { const it = run && run.items[run.i]; if (!it || !it.hw) return null; const sl = document.querySelector('.kk-slot.on'); return sl ? split(L().READ[it.i])[1][[...document.querySelectorAll('.kk-slot')].indexOf(sl)] : null; } };
})();
