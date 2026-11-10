/* engine/lab.js — 新コンテンツ③ ラボ探偵 (物理·化学·生物の 仮想実験)
 * 変数を 1つずつ 変えて 実験 → 結果から 犯人の トリックを 見ぬく。
 * 画面: pageLab (#labArea). 保存: State.v2.lab = { cleared: {caseId: stars} }
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, CHAR_IMAGES
 */
const LabDetective = (function () {
  const KORARIN = 'assets/img/chars/spirits/korarin_greet_01.webp';
  const KORADON = 'assets/img/chars/spirits/koradon_idle_01.webp';
  let cur = null, sim = null, raf = 0;
  function area() { return document.getElementById('labArea'); }
  function esc(s) { return escapeHtml(String(s)); }
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.lab || (State.v2.lab = {}); d.cleared = d.cleared || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function sayEn(t) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = 0.85; speechSynthesis.speak(u); } catch (e) {} }
  function stop() { cancelAnimationFrame(raf); raf = 0; try { speechSynthesis.cancel(); } catch (e) {} }

  // ================= 事件 =================
  const CASES = [
    { id: 'pendulum', icon: '🕰', name: '遅れる 時計塔', field: '物理 · ふりこ',
      story: '町の 時計塔の ふりこ時計が、1日に 何分も 遅れるように なった。きのう 整備に 入った 3人の うち、だれかが ふりこを いじったらしい。',
      suspects: [
        { id: 'a', face: '👷', name: '整備士 アキラ', says: '「おもりを 重い ものに 取りかえただけ だよ。」' },
        { id: 'b', face: '🧑‍🔧', name: '助手 ベン', says: '「ひもが 古かったから、少し 長い ひもに 交換したよ。」' },
        { id: 'c', face: '👩‍🏫', name: '見学の 先生 チカ', says: '「ふりこを 大きく ゆらして 見ていた だけです。」' } ],
      culprit: 'b',
      question: '時計が 遅れる (ふりこが ゆっくり 往復する) 原因に なるのは どれ?',
      reasons: [ { t: 'ふりこの 1往復の 時間は ひもの 長さだけで 決まり、長いほど 長くなるから', ok: true },
                 { t: 'おもりが 重いほど ふりこは ゆっくり ゆれるから' }, { t: 'ふれはばが 大きいほど 1往復の 時間が 長くなるから' } ],
      vocab: [['pendulum', 'ふりこ'], ['period', '周期 (1往復の 時間)'], ['length', '長さ'], ['weight', '重さ'], ['swing', 'ゆれる']],
      summary: 'ふりこの 周期は「ひもの 長さ」だけで 決まる (おもりの 重さや ふれはばには ほぼ 関係しない)。長さが 4倍に なると 周期は 2倍。ガリレオが 発見した「ふりこの 等時性」。' },
    { id: 'circuit', icon: '💡', name: '暗く なった 看板', field: '物理 · 電気回路',
      story: '商店街の 看板の 豆電球が、ゆうべから 急に 暗く なった。配線を さわったのは 3人。だれが 何を したのか、回路を 組んで 調べよう。',
      suspects: [
        { id: 'a', face: '🧑‍💼', name: '店長 ダイ', says: '「電池を 2つ 並列に つないで 長持ちするように したんだ。」' },
        { id: 'b', face: '🧑‍🎤', name: 'アルバイト エミ', says: '「豆電球を 2つ 直列に つないで 飾りを 増やしたの。」' },
        { id: 'c', face: '👨‍🔬', name: '電気屋 フジ', says: '「電池を 2つ 直列に して パワーアップしたよ。」' } ],
      culprit: 'b',
      question: '豆電球が 暗く なる つなぎ方は どれ?',
      reasons: [ { t: '豆電球を 直列に すると 回路全体の 抵抗が 大きくなり、流れる 電流が 減るから', ok: true },
                 { t: '電池を 並列に すると 電圧が 半分に なるから' }, { t: '電池を 直列に すると 電流が 流れにくく なるから' } ],
      vocab: [['circuit', '回路'], ['battery', '電池'], ['series', '直列'], ['parallel', '並列'], ['current', '電流']],
      summary: '電池の 直列 → 電圧が 足し算で 明るく。電池の 並列 → 明るさは 1個と 同じだが 長持ち。豆電球の 直列 → 抵抗が 増えて 1個ずつ 暗い。豆電球の 並列 → それぞれ 1個の ときと 同じ 明るさ。' },
    { id: 'dissolve', icon: '🧂', name: '理科室の 白い 結晶', field: '化学 · もののとけ方',
      story: '理科室の ビーカーの 底に、白い 結晶が できていた。メモには「60℃の 水 100g に 30g とかして、そのまま 一晩 置いた (20℃まで 冷えた)」。とかしたのは 食塩・ミョウバン・硝酸カリウムの どれ?',
      suspects: [
        { id: 'a', face: '🧑‍🍳', name: '料理部 ハナ (食塩)', says: '「わたしは 食塩を とかして 塩水を 作っただけ。」' },
        { id: 'b', face: '🧑‍🎨', name: '美術部 イツキ (ミョウバン)', says: '「ミョウバンで 結晶作りの 練習を しようと 思って…」' },
        { id: 'c', face: '🧑‍🌾', name: '園芸部 ジュン (硝酸カリウム)', says: '「肥料の 硝酸カリウムを 水に とかしたよ。」' } ],
      culprit: 'b',
      question: '60℃で 30g とけて、20℃に 冷えると 結晶が 出るのは どれ?',
      reasons: [ { t: 'ミョウバンは 20℃では 100g の 水に 約11g しか とけないので、とけきれない 約19g が 結晶に なるから', ok: true },
                 { t: '食塩は 温度が 下がると とける 量が 大きく 減るから' }, { t: '硝酸カリウムは 20℃では まったく とけないから' } ],
      vocab: [['dissolve', 'とける'], ['solution', '水よう液'], ['crystal', '結晶'], ['temperature', '温度'], ['solubility', 'とける 量 (溶解度)']],
      summary: 'とける 量は 物質と 温度で ちがう。食塩は 温度が 変わっても ほとんど 変わらない。ミョウバンや 硝酸カリウムは 温度が 高いほど たくさん とけ、冷やすと とけきれない 分が 結晶に なる (再結晶)。' },
    { id: 'plant', icon: '🌱', name: '育たない 苗', field: '生物 · 植物の 成長',
      story: '温室の トマトの 苗が、ひょろひょろで 色も うすく、ちっとも 育たない。温室を 管理する 3人の 証言を もとに、「対照実験」で 原因を つきとめよう。',
      suspects: [
        { id: 'a', face: '👩‍🌾', name: '水やり係 ミサキ', says: '「節約の ために、水やりを 3日に 1回に 減らしました。」' },
        { id: 'b', face: '🧔', name: '温度係 ゴロウ', says: '「暖房の 温度を 25℃から 20℃に 下げたよ。」' },
        { id: 'c', face: '🕵', name: '清掃係 ヨル', says: '「日差しが まぶしいので、窓に 黒い シートを はりました。」' } ],
      culprit: 'c',
      question: '苗が ひょろひょろで 色が うすい いちばんの 原因は?',
      reasons: [ { t: '光が 足りないと 光合成が できず、苗は 光を 求めて ひょろ長く 伸び、色も うすく なるから', ok: true },
                 { t: '水が 3日に 1回だと 植物は すぐに かれてしまうから' }, { t: '20℃では トマトは まったく 育たないから' } ],
      vocab: [['photosynthesis', '光合成'], ['variable', '条件 (変数)'], ['control', '対照 (くらべる 基準)'], ['sunlight', '日光'], ['grow', '育つ']],
      summary: '原因を 調べる ときは、くらべる 2つで「変える 条件を 1つだけ」に する (対照実験)。光が 足りないと 植物は 光合成が できず、ひょろ長く 伸びて 葉の 色が うすく なる (もやしと 同じ)。' },
  ];

  // ================= 一覧 =================
  function list() {
    stop();
    const d = data();
    let h = '<div class="lb-hero"><div><div class="lb-kicker">ハル&リオの</div><h1 class="lb-h1">ラボ探偵</h1><p>条件を 変えて 実験し、犯人の トリックを 科学で 見ぬこう!</p></div><img src="' + KORARIN + '" alt=""></div><div class="lb-cases">';
    CASES.forEach((c, i) => {
      const s = d.cleared[c.id] || 0;
      h += '<button class="lb-case" data-i="' + i + '"><span class="lb-case-i">' + c.icon + '</span><span><b>' + (i + 1) + '. ' + esc(c.name) + '</b><small>' + esc(c.field) + '</small><span class="lb-stars">' + (s ? '★'.repeat(s) + '☆'.repeat(3 - s) : '未解決') + '</span></span></button>';
    });
    h += '</div><div class="lb-note">🔬 実験の コツ: 変える 条件は 1回に 1つだけ。ほかの 条件は 同じに して くらべよう (対照実験)。</div>';
    area().innerHTML = h;
    area().querySelectorAll('[data-i]').forEach(b => b.onclick = () => { sfx('click'); startCase(CASES[+b.dataset.i]); });
  }
  function head(t) { return '<div class="lb-head"><button class="lb-back" id="lbBack">← 事件一覧</button><div class="lb-title">' + t + '</div></div>'; }
  function bindHead() { const b = document.getElementById('lbBack'); if (b) b.onclick = () => { sfx('click'); list(); }; }

  function startCase(c) {
    cur = { c: c, notes: [], miss: 0 };
    let h = head(c.icon + ' ' + esc(c.name));
    h += '<div class="lb-box lb-talk"><img src="' + CHAR_IMAGES.haru + '" alt="" class="lb-haru"><div><b>ハル</b><p>' + esc(c.story) + '</p></div></div>';
    h += '<div class="lb-h2">🗣 容疑者の 証言</div><div class="lb-sus">';
    c.suspects.forEach(s => { h += '<div class="lb-su"><span class="lb-face">' + s.face + '</span><div><b>' + esc(s.name) + '</b><p>' + esc(s.says) + '</p></div></div>'; });
    h += '</div><button class="lb-primary" id="lbExp">🔬 実験室へ (証言を 実験で たしかめる)</button>';
    area().innerHTML = h; bindHead();
    document.getElementById('lbExp').onclick = () => { sfx('click'); labView(); };
  }

  // ================= 実験室 =================
  function labView() {
    stop();
    const c = cur.c;
    let h = head('🔬 実験室 — ' + esc(c.name));
    h += '<div class="lb-box" id="lbSim"></div>';
    h += '<div class="lb-box"><div class="lb-h2">📓 実験ノート</div><div id="lbNotes" class="lb-notes"></div></div>';
    h += '<button class="lb-primary" id="lbSolve">🕵 犯人が わかった!</button>';
    area().innerHTML = h; bindHead();
    ({ pendulum: simPendulum, circuit: simCircuit, dissolve: simDissolve, plant: simPlant })[c.id](document.getElementById('lbSim'));
    renderNotes();
    document.getElementById('lbSolve').onclick = () => { sfx('click'); solveView(); };
  }
  function note(t) { cur.notes.push(t); if (cur.notes.length > 12) cur.notes.shift(); renderNotes(); }
  function renderNotes() { const el = document.getElementById('lbNotes'); if (el) el.innerHTML = cur.notes.length ? cur.notes.map(n => '<div>• ' + n + '</div>').join('') : '<span class="lb-small">まだ 記録が ない。実験すると ここに 記録されるよ。</span>'; }
  function slider(id, label, min, max, step, val, unit) { return '<label class="lb-sl">' + label + ' <b id="' + id + 'V">' + val + '</b>' + unit + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>'; }

  // ---- ① ふりこ ----
  function simPendulum(box) {
    box.innerHTML = '<div class="lb-h2">🕰 ふりこ 実験装置</div><svg viewBox="0 0 300 230" class="lb-svg"><line x1="40" y1="14" x2="260" y2="14" stroke="#7a6a50" stroke-width="5"/><g id="lbPend"><line id="lbStr" x1="150" y1="14" x2="150" y2="150" stroke="#444" stroke-width="2"/><circle id="lbBob" cx="150" cy="150" r="12" fill="#c0392b"/></g></svg>' +
      slider('pL', 'ひもの 長さ', 0.25, 2, 0.25, 1, 'm') + slider('pM', 'おもりの 重さ', 50, 500, 50, 100, 'g') + slider('pA', 'ふれはば', 5, 30, 5, 10, '°') +
      '<button class="lb-secondary" id="pRun">⏱ 10往復の 時間を はかる</button><div id="pOut" class="lb-out"></div>';
    const L = document.getElementById('pL'), M = document.getElementById('pM'), A = document.getElementById('pA');
    const upd = () => { ['pL', 'pM', 'pA'].forEach(id => document.getElementById(id + 'V').textContent = document.getElementById(id).value); };
    [L, M, A].forEach(x => x.oninput = upd);
    let t0 = performance.now();
    const draw = now => {
      const len = +L.value, T = 2 * Math.PI * Math.sqrt(len / 9.8), th = (+A.value) * Math.PI / 180 * Math.cos(2 * Math.PI * ((now - t0) / 1000) / T);
      const px = 30 + len * 60, x = 150 + px * Math.sin(th), y = 14 + px * Math.cos(th);
      const s = document.getElementById('lbStr'), b = document.getElementById('lbBob'); if (!s) return;
      s.setAttribute('x2', x); s.setAttribute('y2', y); b.setAttribute('cx', x); b.setAttribute('cy', y); b.setAttribute('r', 7 + (+M.value) / 60);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    document.getElementById('pRun').onclick = () => {
      sfx('click');
      const len = +L.value, T = 2 * Math.PI * Math.sqrt(len / 9.8), meas = (10 * T * (1 + (+A.value > 20 ? 0.006 : 0)) + (Math.random() - 0.5) * 0.12).toFixed(1);
      document.getElementById('pOut').innerHTML = '⏱ 10往復: <b>' + meas + ' 秒</b> → 1往復 約 <b>' + (meas / 10).toFixed(2) + ' 秒</b>';
      note('長さ ' + len + 'm ・ 重さ ' + M.value + 'g ・ ふれはば ' + A.value + '° → 1往復 ' + (meas / 10).toFixed(2) + '秒');
    };
  }

  // ---- ② 電気回路 ----
  function simCircuit(box) {
    box.innerHTML = '<div class="lb-h2">💡 回路 実験ボード</div><div id="cDraw"></div>' +
      '<div class="lb-opts"><div><b>電池</b><button class="lb-opt on" data-k="bn" data-v="1">1個</button><button class="lb-opt" data-k="bn" data-v="2s">2個 直列</button><button class="lb-opt" data-k="bn" data-v="2p">2個 並列</button></div>' +
      '<div><b>豆電球</b><button class="lb-opt on" data-k="ln" data-v="1">1個</button><button class="lb-opt" data-k="ln" data-v="2s">2個 直列</button><button class="lb-opt" data-k="ln" data-v="2p">2個 並列</button></div></div>' +
      '<button class="lb-secondary" id="cRun">🔌 スイッチ ON (明るさを はかる)</button><div id="cOut" class="lb-out"></div>';
    const cfg = { bn: '1', ln: '1' };
    const calc = () => {
      const V = cfg.bn === '2s' ? 3 : 1.5, R = 5, Rt = cfg.ln === '2s' ? 10 : cfg.ln === '2p' ? 2.5 : 5, I = V / Rt, ib = cfg.ln === '2p' ? I / 2 : I;
      return { V: V, I: I, rel: (ib * ib * R) / 0.45, life: cfg.bn === '2p' ? '約2倍 長持ち' : cfg.bn === '2s' ? '1個の ときより 早く 減る' : 'ふつう' };
    };
    const draw = on => {
      const r = calc(), glow = on ? Math.min(1, 0.15 + r.rel * 0.5) : 0.08, n = cfg.ln === '1' ? 1 : 2;
      let s = '<svg viewBox="0 0 300 150" class="lb-svg"><rect x="20" y="20" width="260" height="110" rx="10" fill="none" stroke="#555" stroke-width="3"/>';
      const nb = cfg.bn === '1' ? 1 : 2;
      for (let i = 0; i < nb; i++) { const x = cfg.bn === '2p' ? 40 : 40 + i * 34, y = cfg.bn === '2p' ? 60 + i * 34 : 115; s += '<rect x="' + x + '" y="' + (y - 10) + '" width="28" height="20" rx="3" fill="#e5b33a" stroke="#555"/><text x="' + (x + 14) + '" y="' + (y + 4) + '" font-size="10" text-anchor="middle">1.5V</text>'; }
      for (let i = 0; i < n; i++) { const x = cfg.ln === '2p' ? 200 : 170 + i * 50, y = cfg.ln === '2p' ? 45 + i * 50 : 20; s += '<circle cx="' + x + '" cy="' + y + '" r="18" fill="rgba(255,220,80,' + glow + ')" stroke="#666"/><circle cx="' + x + '" cy="' + y + '" r="' + (6 + glow * 26) + '" fill="rgba(255,230,120,' + (glow * 0.45) + ')"/>'; }
      return s + '</svg>';
    };
    const upd = on => { document.getElementById('cDraw').innerHTML = draw(on); };
    upd(false);
    box.querySelectorAll('.lb-opt').forEach(b => b.onclick = () => { sfx('click'); cfg[b.dataset.k] = b.dataset.v; box.querySelectorAll('.lb-opt[data-k="' + b.dataset.k + '"]').forEach(x => x.classList.toggle('on', x === b)); upd(false); document.getElementById('cOut').innerHTML = ''; });
    const NM = { '1': '1個', '2s': '2個 直列', '2p': '2個 並列' };
    document.getElementById('cRun').onclick = () => {
      sfx('click'); upd(true); const r = calc(), lv = r.rel >= 3 ? 'とても 明るい ☀' : r.rel >= 0.9 ? 'ふつう 💡' : '暗い 🌑';
      document.getElementById('cOut').innerHTML = '電圧 ' + r.V + 'V ・ 電流 ' + r.I.toFixed(2) + 'A ・ 豆電球1個の 明るさ <b>' + lv + '</b> (基準の ' + r.rel.toFixed(2) + '倍) ・ 電池の もち: ' + r.life;
      note('電池 ' + NM[cfg.bn] + ' ・ 豆電球 ' + NM[cfg.ln] + ' → ' + lv + ' (' + r.rel.toFixed(2) + '倍)');
    };
  }

  // ---- ③ もののとけ方 ----
  const SOL = { salt: { n: '食塩', t: [35.7, 35.8, 36.3, 37.1, 38.0] }, alum: { n: 'ミョウバン', t: [5.7, 11.4, 23.8, 57.4, 321.6] }, kno3: { n: '硝酸カリウム', t: [13.3, 31.6, 63.9, 109, 169] } };
  function solub(k, T) { const t = SOL[k].t, i = Math.min(3, Math.floor(T / 20)), f = (T - i * 20) / 20; return t[i] + (t[i + 1] - t[i]) * f; }
  function simDissolve(box) {
    box.innerHTML = '<div class="lb-h2">🧪 とかす 実験 (100g あたりの とける 量を 使う)</div>' +
      '<div class="lb-opts"><div><b>物質</b><button class="lb-opt on" data-s="salt">食塩</button><button class="lb-opt" data-s="alum">ミョウバン</button><button class="lb-opt" data-s="kno3">硝酸カリウム</button></div></div>' +
      slider('dW', '水の 量', 50, 200, 50, 100, 'g') + slider('dG', 'とかす 量', 5, 60, 5, 30, 'g') + slider('dT1', 'とかす ときの 温度', 0, 80, 10, 60, '℃') + slider('dT2', '冷やした あとの 温度', 0, 80, 10, 20, '℃') +
      '<button class="lb-secondary" id="dRun">🔥 とかして → ❄ 冷やす</button><div id="dOut" class="lb-out"></div><svg viewBox="0 0 300 70" class="lb-svg" id="dGraph"></svg>';
    let sub = 'salt';
    box.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { sfx('click'); sub = b.dataset.s; box.querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', x === b)); graph(); });
    ['dW', 'dG', 'dT1', 'dT2'].forEach(id => document.getElementById(id).oninput = () => { document.getElementById(id + 'V').textContent = document.getElementById(id).value; });
    const graph = () => {
      let s = '<text x="4" y="10" font-size="9" fill="#555">' + SOL[sub].n + ' の とける 量 (100g の 水) 0〜80℃</text>';
      SOL[sub].t.forEach((v, i) => { const hh = Math.min(50, v / 1.3); s += '<rect x="' + (20 + i * 55) + '" y="' + (62 - hh) + '" width="34" height="' + hh + '" fill="#7fb3d5"/><text x="' + (37 + i * 55) + '" y="' + (58 - hh) + '" font-size="9" text-anchor="middle">' + v + '</text><text x="' + (37 + i * 55) + '" y="70" font-size="8" text-anchor="middle">' + (i * 20) + '℃</text>'; });
      document.getElementById('dGraph').innerHTML = s;
    };
    graph();
    document.getElementById('dRun').onclick = () => {
      sfx('click');
      const W = +document.getElementById('dW').value, G = +document.getElementById('dG').value, T1 = +document.getElementById('dT1').value, T2 = +document.getElementById('dT2').value;
      const m1 = solub(sub, T1) * W / 100, m2 = solub(sub, T2) * W / 100;
      const left1 = Math.max(0, G - m1), dissolved = G - left1, cry = Math.max(0, dissolved - m2);
      let out = T1 + '℃・水' + W + 'g に とける 最大量 ' + m1.toFixed(1) + 'g → ' + (left1 > 0 ? '<b>' + left1.toFixed(1) + 'g とけ残った</b>' : 'ぜんぶ とけた') + '<br>';
      out += T2 + '℃に 冷やすと とける 最大量 ' + m2.toFixed(1) + 'g → ' + (cry > 0.05 ? '<b>結晶が ' + cry.toFixed(1) + 'g 出てきた ❄</b>' : '結晶は 出なかった');
      document.getElementById('dOut').innerHTML = out;
      note(SOL[sub].n + ' ' + G + 'g / 水' + W + 'g / ' + T1 + '℃→' + T2 + '℃ : ' + (cry > 0.05 ? '結晶 ' + cry.toFixed(1) + 'g' : '結晶なし') + (left1 > 0 ? ' (とけ残り ' + left1.toFixed(1) + 'g)' : ''));
    };
  }

  // ---- ④ 植物の 成長 ----
  const LIGHT = { sun: ['日なた', 1], half: ['半日かげ', 0.6], dark: ['黒い シート', 0.15] };
  const WATER = { daily: ['毎日', 1], d3: ['3日に1回', 0.85], none: ['なし', 0.1] };
  const TEMP = { t25: ['25℃', 1], t20: ['20℃', 0.9], t10: ['10℃', 0.35] };
  function grow(p) { const f = LIGHT[p.l][1] * WATER[p.w][1] * TEMP[p.t][1]; return { h: (2 + 14 * f + (p.l === 'dark' ? 14 : 0)), green: p.l === 'dark' ? 'うすい 黄緑' : f > 0.7 ? 'こい 緑' : 'ふつうの 緑', stem: p.l === 'dark' ? 'ひょろひょろ' : 'しっかり' }; }
  function simPlant(box) {
    const pots = [{ l: 'sun', w: 'daily', t: 't25' }, { l: 'sun', w: 'daily', t: 't25' }];
    const sel = (i, k, M) => '<div><b>' + ({ l: '光', w: '水', t: '温度' })[k] + '</b>' + Object.keys(M).map(v => '<button class="lb-opt' + (pots[i][k] === v ? ' on' : '') + '" data-p="' + i + '" data-k="' + k + '" data-v="' + v + '">' + M[v][0] + '</button>').join('') + '</div>';
    const render = () => {
      let h = '<div class="lb-h2">🌱 2つの 鉢で くらべる (14日間)</div><div class="lb-pots">';
      [0, 1].forEach(i => { h += '<div class="lb-pot"><div class="lb-pot-h">鉢 ' + 'AB'[i] + '</div>' + sel(i, 'l', LIGHT) + sel(i, 'w', WATER) + sel(i, 't', TEMP) + '</div>'; });
      h += '</div><button class="lb-secondary" id="gRun">📆 14日間 育てる</button><div id="gOut" class="lb-out"></div>';
      box.innerHTML = h;
      box.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { sfx('click'); pots[+b.dataset.p][b.dataset.k] = b.dataset.v; render(); });
      document.getElementById('gRun').onclick = () => {
        sfx('click');
        const diff = ['l', 'w', 't'].filter(k => pots[0][k] !== pots[1][k]);
        const g = pots.map(grow);
        let o = '<svg viewBox="0 0 300 120" class="lb-svg">';
        g.forEach((r, i) => { const x = 80 + i * 140, hh = r.h * 4; o += '<rect x="' + (x - 22) + '" y="96" width="44" height="22" fill="#b5651d"/><line x1="' + x + '" y1="96" x2="' + x + '" y2="' + (96 - hh) + '" stroke="' + (r.green === 'うすい 黄緑' ? '#b9d36a' : '#3c8d2f') + '" stroke-width="' + (r.stem === 'ひょろひょろ' ? 2 : 5) + '"/><ellipse cx="' + (x - 8) + '" cy="' + (96 - hh + 6) + '" rx="9" ry="4" fill="' + (r.green === 'うすい 黄緑' ? '#c9df85' : '#4caf50') + '"/><ellipse cx="' + (x + 8) + '" cy="' + (96 - hh + 10) + '" rx="9" ry="4" fill="' + (r.green === 'うすい 黄緑' ? '#c9df85' : '#4caf50') + '"/><text x="' + x + '" y="12" font-size="11" text-anchor="middle">鉢' + 'AB'[i] + ' ' + r.h.toFixed(1) + 'cm</text>'; });
        o += '</svg>';
        g.forEach((r, i) => { o += '<div>鉢' + 'AB'[i] + ': 高さ <b>' + r.h.toFixed(1) + 'cm</b> ・ 葉の 色 ' + r.green + ' ・ くき ' + r.stem + '</div>'; });
        if (diff.length !== 1) o += '<div class="lb-warn">⚠ コラリン:「' + (diff.length ? '条件が ' + diff.length + 'つ ちがうよ! どれが 原因か わからない。変える 条件は 1つだけに しよう (対照実験)。' : '2つとも 同じ 条件だよ。1つだけ 変えて くらべよう。') + '」</div>';
        document.getElementById('gOut').innerHTML = o;
        const D = p => LIGHT[p.l][0] + '/' + WATER[p.w][0] + '/' + TEMP[p.t][0];
        note('A(' + D(pots[0]) + ') ' + g[0].h.toFixed(1) + 'cm ' + g[0].stem + ' ⇔ B(' + D(pots[1]) + ') ' + g[1].h.toFixed(1) + 'cm ' + g[1].stem + (diff.length === 1 ? ' ✅ 対照実験' : ' ⚠ 条件 ' + diff.length + 'つ ちがい'));
      };
    };
    render();
  }

  // ================= 推理 =================
  function solveView() {
    stop();
    const c = cur.c;
    if (!cur.notes.length) { const o = document.getElementById('lbNotes'); if (o) o.innerHTML = '<span class="lb-warn">⚠ まだ 実験していないよ! 証言を 実験で たしかめてから 推理しよう。</span>'; return; }
    let h = head('🕵 推理 — ' + esc(c.name));
    h += '<div class="lb-box"><div class="lb-h2">📓 実験ノート</div><div class="lb-notes">' + cur.notes.map(n => '<div>• ' + n + '</div>').join('') + '</div></div>';
    h += '<div class="lb-box"><div class="lb-h2">Q1. 犯人は だれ?</div><div class="lb-pick">';
    c.suspects.forEach(s => { h += '<button class="lb-pk" data-s="' + s.id + '"><span class="lb-face">' + s.face + '</span>' + esc(s.name) + '</button>'; });
    h += '</div><div id="lbQ2"></div></div>';
    area().innerHTML = h; bindHead();
    let step = 1;
    area().querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
      if (step !== 1) return;
      if (b.dataset.s !== c.culprit) { sfx('wrong'); cur.miss++; b.classList.add('ng'); b.disabled = true; return; }
      sfx('unlock'); step = 2; b.classList.add('ok');
      const rs = c.reasons.map((r, i) => [r, i]).sort(() => Math.random() - 0.5);
      let q = '<div class="lb-h2">Q2. 決め手は? ' + esc(c.question) + '</div><div class="lb-reasons">';
      rs.forEach(([r, i]) => { q += '<button class="lb-rs" data-r="' + i + '">' + esc(r.t) + '</button>'; });
      document.getElementById('lbQ2').innerHTML = q + '</div>';
      document.getElementById('lbQ2').querySelectorAll('[data-r]').forEach(x => x.onclick = () => {
        const r = c.reasons[+x.dataset.r];
        if (!r.ok) { sfx('wrong'); cur.miss++; x.classList.add('ng'); x.disabled = true; return; }
        sfx('unlock'); x.classList.add('ok'); setTimeout(clear, 600);
      });
    });
  }
  function clear() {
    const c = cur.c, stars = cur.miss === 0 ? 3 : cur.miss <= 2 ? 2 : 1;
    const d = data(); d.cleared[c.id] = Math.max(d.cleared[c.id] || 0, stars); save();
    let h = head('🎉 事件解決 — ' + esc(c.name));
    const cul = c.suspects.find(s => s.id === c.culprit);
    h += '<div class="lb-box lb-center"><div class="lb-big">🎉</div><p>犯人は <b>' + cul.face + ' ' + esc(cul.name) + '</b>!</p><div class="lb-stars big">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div></div>';
    h += '<div class="lb-box lb-talk"><img src="' + KORARIN + '" alt=""><div><b>コラリンの まとめ</b><p>' + esc(c.summary) + '</p></div></div>';
    h += '<div class="lb-box"><div class="lb-h2">🔤 実験の 英語カード (タップで 発音)</div><div class="lb-vocab">';
    c.vocab.forEach(v => { h += '<button class="lb-vc" data-en="' + esc(v[0]) + '"><b>' + esc(v[0]) + '</b><small>' + esc(v[1]) + '</small></button>'; });
    h += '</div></div><button class="lb-primary" id="lbList">事件一覧へ</button>';
    area().innerHTML = h; bindHead();
    area().querySelectorAll('[data-en]').forEach(b => b.onclick = () => sayEn(b.dataset.en));
    document.getElementById('lbList').onclick = () => { sfx('click'); list(); };
  }

  function open() { showPage('pageLab'); list(); const p = document.getElementById('pageLab'); if (p) p.scrollTop = 0; }
  return { open: open, stop: stop, _cases: CASES, _solub: solub };
})();
