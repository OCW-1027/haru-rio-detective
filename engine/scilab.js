/* engine/scilab.js — 理科 実験室 (さわって 確かめる シミュレーター)
 * ① 電気回路 (直列・並列 / オームの法則) ② 凸レンズ (作図と 像) ③ ふりこ (周期) ④ 月の 満ち欠け
 * 各実験に ミッション 3つ。達成は State.v2.scilab.done['実験:番号'] = 1
 * 画面: pageSciLab (#slArea)。Dependencies: State, saveState, showPage, sfx, escapeHtml
 */
const SciLab = (function () {
  const $ = id => document.getElementById(id), esc = s => escapeHtml(String(s));
  const r2 = v => Math.round(v * 100) / 100, r1 = v => Math.round(v * 10) / 10;
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.scilab || (State.v2.scilab = {}); d.done = d.done || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  let raf = null; function stopAnim() { if (raf) cancelAnimationFrame(raf); raf = null; }
  const EXPS = [
    { id: 'circuit', icon: '🔋', name: '電気回路', sub: '直列・並列で 電流と 電圧は どう 変わる?', lv: '中2' },
    { id: 'lens', icon: '🔍', name: '凸レンズ', sub: '物体を 動かして 像の でき方を 見よう', lv: '中1' },
    { id: 'pend', icon: '🕰️', name: 'ふりこ', sub: '周期を 決めるのは 長さ? 重さ? ふれはば?', lv: '小5' },
    { id: 'moon', icon: '🌙', name: '月の 満ち欠け', sub: '月・地球・太陽の 位置と 見え方', lv: '中3' },
  ];
  const MISS = {
    circuit: ['直列つなぎで 回路の 電流を ちょうど 0.2A に しよう', '並列つなぎで 全体の 電流を 1A 以上に しよう', '直列つなぎで 抵抗①に かかる 電圧を ちょうど 3V に しよう'],
    lens: ['実物と 同じ 大きさの 実像を 作ろう', '像が できない (光が 平行に なる) 位置に 物体を 置こう', '虫めがねの ように、大きな 虚像を 作ろう'],
    pend: ['周期 (1往復の 時間) を 2.0秒 に 近づけよう (±0.05秒)', '長さを 変えずに おもりの 重さだけ 変えて、周期を くらべよう', '長さ 0.25m と 1.00m の 両方で 周期を はかろう'],
    moon: ['満月の 位置に 月を 動かそう', '上弦の 月に しよう (夕方、南の 空に 見える 半月)', '三日月に しよう (夕方、西の 空に 見える)'],
  };
  function done(exp, i) { const d = data(); return !!d.done[exp + ':' + i]; }
  function mark(exp, i) { const d = data(); const k = exp + ':' + i; if (d.done[k]) return; d.done[k] = 1; save(); sfx('correct'); const el = document.querySelector('[data-mi="' + i + '"]'); if (el) { el.classList.add('ok'); el.querySelector('i').textContent = '✅'; } const t = $('slToast'); if (t) { t.textContent = '🎉 ミッション 達成!'; t.classList.add('on'); setTimeout(() => t.classList.remove('on'), 1600); } }
  function missions(exp) { return '<div class="sl-miss"><b>🎯 ミッション</b>' + MISS[exp].map((m, i) => '<div class="sl-mi' + (done(exp, i) ? ' ok' : '') + '" data-mi="' + i + '"><i>' + (done(exp, i) ? '✅' : '⬜') + '</i>' + esc(m) + '</div>').join('') + '</div><div class="sl-toast" id="slToast"></div>'; }
  function frame(h) { stopAnim(); $('slArea').innerHTML = h; const p = $('pageSciLab'); if (p) p.scrollTop = 0; }
  function head(e) { return '<div class="sl-top"><button class="sl-back" id="slHome">← 実験室</button><b>' + e.icon + ' ' + e.name + '</b></div>'; }
  const slider = (id, label, min, max, step, val, unit) => '<label class="sl-sl"><span>' + label + ' <b id="' + id + 'V">' + val + '</b>' + unit + '</span><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>';

  function home() {
    const d = data();
    let h = '<div class="sl-hero"><div class="sl-kicker">さわって 確かめる</div><h1>理科 実験室</h1><p>つまみを 動かすと 結果が すぐ 変わる。教科書の 「法則」を 自分の 手で 見つけよう。</p></div><div class="sl-cards">';
    EXPS.forEach(e => { const n = MISS[e.id].filter((m, i) => d.done[e.id + ':' + i]).length; h += '<button class="sl-card" data-e="' + e.id + '"><span class="sl-ci">' + e.icon + '</span><b>' + e.name + '</b><small>' + e.sub + '</small><em>' + e.lv + '</em><i>ミッション ' + n + ' / 3</i></button>'; });
    h += '</div>';
    frame(h);
    $('slArea').querySelectorAll('[data-e]').forEach(b => b.onclick = () => { sfx('click'); ({ circuit: circuit, lens: lens, pend: pend, moon: moon })[b.dataset.e](); });
  }
  function bindHome() { $('slHome').onclick = () => { sfx('click'); home(); }; }

  // ================= ① 電気回路 =================
  function circuit() {
    const e = EXPS[0]; let mode = 'series';
    let h = head(e) + '<div class="sl-card2"><div class="sl-seg"><button data-m="series" class="on">直列つなぎ</button><button data-m="parallel">並列つなぎ</button></div><div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' +
      slider('slV', '電源の 電圧', 1.5, 9, 1.5, 6, ' V') + slider('slR1', '抵抗①', 5, 30, 5, 10, ' Ω') + slider('slR2', '抵抗②', 5, 30, 5, 20, ' Ω') + '</div>' + missions('circuit') +
      '<div class="sl-law"><b>📘 わかった こと</b><p><b>オームの 法則</b>: 電圧 V = 抵抗 R × 電流 I</p><p><b>直列</b>: 電流は どこでも 同じ。電圧は 抵抗の 大きさに 比例して 分かれる。全体の 抵抗 = R₁ + R₂</p><p><b>並列</b>: どの 抵抗にも 電源と 同じ 電圧。電流は 分かれて、全体の 電流 = I₁ + I₂。全体の 抵抗は どちらの 抵抗よりも 小さい。</p></div>';
    frame(h); bindHome();
    const upd = () => {
      const V = +$('slV').value, R1 = +$('slR1').value, R2 = +$('slR2').value; $('slVV').textContent = V; $('slR1V').textContent = R1; $('slR2V').textContent = R2;
      let I, I1, I2, V1, V2, R;
      if (mode === 'series') { R = R1 + R2; I = V / R; I1 = I2 = I; V1 = I * R1; V2 = I * R2; } else { I1 = V / R1; I2 = V / R2; I = I1 + I2; R = V / I; V1 = V2 = V; }
      $('slFig').innerHTML = circSVG(mode, V, R1, R2, I, I1, I2, V1, V2);
      $('slRead').innerHTML = '<span>全体の 電流 <b>' + r2(I) + ' A</b></span><span>①の 電圧 <b>' + r2(V1) + ' V</b></span><span>②の 電圧 <b>' + r2(V2) + ' V</b></span><span>全体の 抵抗 <b>' + r2(R) + ' Ω</b></span>' + (mode === 'parallel' ? '<span>①の 電流 <b>' + r2(I1) + ' A</b></span><span>②の 電流 <b>' + r2(I2) + ' A</b></span>' : '');
      if (mode === 'series' && Math.abs(I - 0.2) < 1e-9) mark('circuit', 0);
      if (mode === 'parallel' && I >= 1 - 1e-9) mark('circuit', 1);
      if (mode === 'series' && Math.abs(V1 - 3) < 1e-9) mark('circuit', 2);
    };
    ['slV', 'slR1', 'slR2'].forEach(id => $(id).oninput = upd);
    $('slArea').querySelectorAll('[data-m]').forEach(b => b.onclick = () => { sfx('click'); mode = b.dataset.m; $('slArea').querySelectorAll('[data-m]').forEach(x => x.classList.toggle('on', x === b)); upd(); });
    upd();
  }
  function circSVG(mode, V, R1, R2, I, I1, I2, V1, V2) {
    const flow = (d, cur) => cur > 0 ? '<path d="' + d + '" fill="none" stroke="#f2b632" stroke-width="3" stroke-dasharray="3 13" stroke-linecap="round" style="animation:slFlow ' + Math.max(0.25, 1.6 / cur).toFixed(2) + 's linear infinite"/>' : '';
    const wire = d => '<path d="' + d + '" fill="none" stroke="#3a3a4a" stroke-width="3" stroke-linejoin="round"/>';
    const bulb = (x, y, P, lab, vlab) => { const g = Math.min(1, P / 3); return '<circle cx="' + x + '" cy="' + y + '" r="' + (14 + g * 14) + '" fill="rgba(255,214,90,' + (0.15 + g * 0.55).toFixed(2) + ')"/><rect x="' + (x - 20) + '" y="' + (y - 10) + '" width="40" height="20" rx="3" fill="#fff" stroke="#3a3a4a" stroke-width="2.5"/><text x="' + x + '" y="' + (y + 5) + '" font-size="12" text-anchor="middle" font-weight="700" fill="#2a2a3a">' + lab + '</text><text x="' + x + '" y="' + (y - 18) + '" font-size="11" text-anchor="middle" fill="#2e5fa8">' + vlab + '</text>'; };
    const bat = (x, y) => '<rect x="' + (x - 22) + '" y="' + (y - 14) + '" width="44" height="28" fill="#f4f1e6"/><line x1="' + (x - 6) + '" y1="' + (y - 16) + '" x2="' + (x - 6) + '" y2="' + (y + 16) + '" stroke="#3a3a4a" stroke-width="3"/><line x1="' + (x + 6) + '" y1="' + (y - 9) + '" x2="' + (x + 6) + '" y2="' + (y + 9) + '" stroke="#3a3a4a" stroke-width="5"/><text x="' + x + '" y="' + (y + 32) + '" font-size="13" text-anchor="middle" font-weight="700" fill="#d0382a">' + V + ' V</text>';
    const am = (x, y, cur) => '<circle cx="' + x + '" cy="' + y + '" r="15" fill="#fff" stroke="#3a3a4a" stroke-width="2.5"/><text x="' + x + '" y="' + (y + 5) + '" font-size="13" text-anchor="middle" font-weight="700">A</text><text x="' + (x + 20) + '" y="' + (y + 5) + '" font-size="13" font-weight="700" fill="#2f8a4f">' + r2(cur) + 'A</text>';
    let s = '';
    if (mode === 'series') { const d = 'M60,150 L60,40 L320,40 L320,150 L60,150'; s += wire(d) + flow(d, I) + bulb(140, 40, V1 * I, R1 + 'Ω', r2(V1) + 'V') + bulb(240, 40, V2 * I, R2 + 'Ω', r2(V2) + 'V') + bat(190, 150) + am(320, 95, I); }
    else { const d0 = 'M60,170 L60,30 L320,30 L320,170 L60,170', da = 'M120,30 L120,100', db = 'M260,30 L260,100'; s += wire(d0) + wire('M120,30 L120,110 L260,110 L260,30') + flow('M60,170 L60,30 L120,30', I) + flow('M120,30 L120,110', I1) + flow('M260,30 L260,110', I2) + flow('M120,110 L260,110 L260,30 L320,30 L320,170 L60,170', I) +
      bulb(120, 70, V1 * I1, R1 + 'Ω', '') + bulb(260, 70, V2 * I2, R2 + 'Ω', '') + '<text x="150" y="74" font-size="11" fill="#2f8a4f" font-weight="700">' + r2(I1) + 'A</text><text x="200" y="74" font-size="11" fill="#2f8a4f" font-weight="700" text-anchor="end">' + r2(I2) + 'A</text>' + bat(190, 170) + am(320, 100, I); }
    return '<svg viewBox="0 0 380 210" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '<text x="190" y="206" font-size="10" text-anchor="middle" fill="#8a8a9a">黄色い 点 = 電流の 流れ (速いほど 電流が 大きい) ・ 明るさ = 電力</text></svg>';
  }

  // ================= ② 凸レンズ =================
  function lens() {
    const e = EXPS[1];
    let h = head(e) + '<div class="sl-card2"><div class="sl-fig" id="slFig"></div><div class="sl-read" id="slRead"></div>' + slider('slA', '物体の 位置 (レンズからの 距離)', 4, 40, 1, 30, ' cm') + slider('slF', '焦点距離', 6, 14, 1, 10, ' cm') + '</div>' + missions('lens') +
      '<div class="sl-law"><b>📘 わかった こと</b><p>物体が <b>焦点距離の 2倍より 遠い</b> → 実物より 小さい 倒立の 実像。<b>ちょうど 2倍</b> → 同じ 大きさ。<b>2倍と 焦点の 間</b> → 大きい 実像。</p><p><b>焦点の 上</b> → 像は できない。<b>焦点より 内側</b> → スクリーンには 映らないが、レンズを のぞくと 大きな 正立の 虚像 (虫めがね)。</p><p>作図の 3本の 光: ① 軸に 平行 → 反対側の 焦点を 通る ② レンズの 中心 → まっすぐ ③ 手前の 焦点を 通る → 軸に 平行</p></div>';
    frame(h); bindHome();
    const upd = () => { const a = +$('slA').value, f = +$('slF').value; $('slAV').textContent = a; $('slFV').textContent = f;
      const r = lensSVG(a, f); $('slFig').innerHTML = r.svg; $('slRead').innerHTML = r.read;
      if (a === 2 * f) mark('lens', 0); if (a === f) mark('lens', 1); if (a < f && f / (f - a) >= 2) mark('lens', 2); };
    $('slA').oninput = upd; $('slF').oninput = upd; upd();
  }
  function lensSVG(a, f) {
    const W = 380, H = 220, cx = 190, ay = 115, sc = 4, h0 = 30, X = d => cx + d * sc, ox = X(-a);
    const L = (x1, y1, x2, y2, c, w, d) => '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="' + c + '" stroke-width="' + (w || 1.8) + '"' + (d ? ' stroke-dasharray="5 4"' : '') + '/>';
    const arrow = (x, top, c, d) => L(x, ay, x, top, c, 3, d) + '<polygon points="' + x + ',' + (top + (top < ay ? -6 : 6)) + ' ' + (x - 6) + ',' + (top + (top < ay ? 6 : -6)) + ' ' + (x + 6) + ',' + (top + (top < ay ? 6 : -6)) + '" fill="' + c + '"/>';
    let s = '<rect width="' + W + '" height="' + H + '" fill="#fbfaf5"/>' + L(0, ay, W, ay, '#9a9aa8', 1.2) + '<ellipse cx="' + cx + '" cy="' + ay + '" rx="8" ry="80" fill="rgba(160,205,240,.45)" stroke="#5a8ab8" stroke-width="2"/>';
    [-2, -1, 1, 2].forEach(k => { const x = X(k * f); s += '<circle cx="' + x + '" cy="' + ay + '" r="3.5" fill="#2a2a3a"/><text x="' + x + '" y="' + (ay + 18) + '" font-size="11" text-anchor="middle" fill="#2a2a3a">' + (Math.abs(k) === 1 ? 'F' : '2F') + '</text>'; });
    s += arrow(ox, ay - h0, '#d0382a');
    const yTop = ay - h0, red = '#e8902a';
    let read;
    if (a === f) {   // 平行光
      s += L(ox, yTop, cx, yTop, red) + L(cx, yTop, W, yTop + (W - cx) * h0 / (f * sc), red) + L(ox, yTop, W, yTop + (W - ox) * (h0 / (a * sc)), red);
      read = '<span><b>像は できない</b> (屈折した 光が 平行に なり、交わらない)</span>';
    } else {
      const b = a * f / (a - f), m = b / a, ix = X(b), iyTop = ay + h0 * m;   // m>0 実像 (倒立 → 下向き)
      // 光1: 平行 → レンズ → F'
      const fpx = X(f);
      s += L(ox, yTop, cx, yTop, red);
      if (b > 0) { s += L(cx, yTop, Math.min(W, ix + 60), yTop + (Math.min(W, ix + 60) - cx) * (iyTop - yTop) / (ix - cx), red); s += L(ox, yTop, Math.min(W, ix + 60), yTop + (Math.min(W, ix + 60) - ox) * (iyTop - yTop) / (ix - ox), red); s += arrow(ix, iyTop, '#2f8a4f') + '<text x="' + ix + '" y="' + (Math.max(iyTop, ay) + 30) + '" font-size="12" text-anchor="middle" font-weight="700" fill="#2f8a4f">実像</text>'; }
      else { const vy = ay - h0 * (-m), ext = (x0, y0, x1, y1, xe) => y0 + (xe - x0) * (y1 - y0) / (x1 - x0);   // 虚像 (正立)
        s += L(cx, yTop, W, ext(cx, yTop, fpx, ay, W), red) + L(cx, yTop, ix, vy, red, 1.2, 1);   // 平行 → F' / うしろへ のばすと 虚像の 先
        s += L(ox, yTop, W, ext(ox, yTop, cx, ay, W), red) + L(ox, yTop, ix, vy, red, 1.2, 1);    // 中心を 通る 光
        s += arrow(ix, vy, '#7a4ab0', 1) + '<text x="' + ix + '" y="' + (vy - 12) + '" font-size="12" text-anchor="middle" font-weight="700" fill="#7a4ab0">虚像</text>'; }
      const bigger = Math.abs(m) > 1.001 ? '大きい' : Math.abs(m) < 0.999 ? '小さい' : '同じ 大きさ';
      read = b > 0 ? '<span>像の 位置 <b>レンズの 右 ' + r1(b) + ' cm</b></span><span>大きさ <b>' + r2(Math.abs(m)) + ' 倍 (' + bigger + ')</b></span><span><b>倒立の 実像</b> (スクリーンに 映る)</span>'
        : '<span>像の 位置 <b>レンズの 左 ' + r1(-b) + ' cm</b></span><span>大きさ <b>' + r2(Math.abs(m)) + ' 倍 (' + bigger + ')</b></span><span><b>正立の 虚像</b> (レンズを のぞくと 見える)</span>';
    }
    return { svg: '<svg viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '<text x="' + ox + '" y="' + (ay - h0 - 12) + '" font-size="11" text-anchor="middle" fill="#d0382a" font-weight="700">物体</text></svg>', read: read };
  }

  // ================= ③ ふりこ =================
  function pend() {
    const e = EXPS[2], st = { seenL: {}, massAt: {} };
    let h = head(e) + '<div class="sl-card2"><div class="sl-fig sl-pend"><canvas id="slCv" width="380" height="250"></canvas></div><div class="sl-read" id="slRead"></div>' +
      slider('slL', 'ふりこの 長さ', 0.25, 2, 0.05, 1, ' m') + slider('slAmp', 'ふれはば', 5, 30, 5, 15, '°') + slider('slM', 'おもりの 重さ', 50, 200, 50, 100, ' g') + '</div>' + missions('pend') +
      '<div class="sl-law"><b>📘 わかった こと</b><p>ふりこが 1往復する 時間 (周期) は <b>ふりこの 長さだけで 決まる</b>。おもりの 重さや ふれはば (小さい とき) を 変えても 変わらない (ふりこの 等時性 — ガリレオが 発見)。</p><p>長さを <b>4倍</b> に すると 周期は <b>2倍</b>。周期 ≒ 2 × √長さ (m) 秒 (地球上)。</p></div>';
    frame(h); bindHome();
    const cv = $('slCv'), ctx = cv.getContext('2d'); let t0 = performance.now();
    const T = () => 2 * Math.PI * Math.sqrt(+$('slL').value / 9.8);
    const upd = () => { const L = +$('slL').value, A = +$('slAmp').value, M = +$('slM').value; $('slLV').textContent = L.toFixed(2); $('slAmpV').textContent = A; $('slMV').textContent = M;
      const per = T(); $('slRead').innerHTML = '<span>周期 (1往復) <b>' + per.toFixed(2) + ' 秒</b></span><span>10往復 <b>' + (per * 10).toFixed(1) + ' 秒</b></span><span>1分間に <b>' + (60 / per).toFixed(1) + ' 往復</b></span>';
      if (Math.abs(per - 2) <= 0.05) mark('pend', 0);
      const key = L.toFixed(2); st.massAt[key] = st.massAt[key] || {}; st.massAt[key][M] = 1; if (Object.keys(st.massAt[key]).length >= 2) mark('pend', 1);
      st.seenL[key] = 1; if (st.seenL['0.25'] && st.seenL['1.00']) mark('pend', 2); };
    ['slL', 'slAmp', 'slM'].forEach(id => $(id).oninput = upd); upd();
    const draw = now => {
      if (!document.body.contains(cv)) { raf = null; return; }
      const L = +$('slL').value, A = +$('slAmp').value * Math.PI / 180, M = +$('slM').value, per = T(), th = A * Math.cos(2 * Math.PI * ((now - t0) / 1000) / per);
      const px = 190, py = 18, len = 20 + L * 105, bx = px + len * Math.sin(th), by = py + len * Math.cos(th), br = 7 + M / 25;
      ctx.clearRect(0, 0, 380, 250); ctx.fillStyle = '#5a4a3a'; ctx.fillRect(110, 8, 160, 10);
      ctx.strokeStyle = '#c9c4b8'; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, py + len + 20); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = '#2a2a3a'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(bx, by); ctx.stroke();
      ctx.fillStyle = '#d9822b'; ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill(); ctx.strokeStyle = '#8a4a1a'; ctx.stroke();
      ctx.fillStyle = '#2e5fa8'; ctx.font = 'bold 12px sans-serif'; ctx.fillText(L.toFixed(2) + ' m', px + 8, py + len / 2);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
  }

  // ================= ④ 月の 満ち欠け =================
  const PHASES = [[0, '新月'], [3, '三日月'], [7.4, '上弦の 月'], [11, '十日夜の 月 (ふくらんで いく)'], [14.8, '満月'], [18.5, '欠けて いく 月'], [22.1, '下弦の 月'], [26, '明け方の 細い 月']];
  function phaseName(d) { let best = PHASES[0]; PHASES.forEach(p => { if (Math.abs(p[0] - d) < Math.abs(best[0] - d)) best = p; }); if (d > 27.5) best = PHASES[0]; return best[1]; }
  function moon() {
    const e = EXPS[3];
    let h = head(e) + '<div class="sl-card2"><div class="sl-moonrow"><div class="sl-fig" id="slTop"></div><div class="sl-fig" id="slView"></div></div><div class="sl-read" id="slRead"></div>' + slider('slD', '月齢 (新月からの 日数)', 0, 29.5, 0.5, 3, ' 日') + '</div>' + missions('moon') +
      '<div class="sl-law"><b>📘 わかった こと</b><p>月は 太陽の 光を 反射して 光る。いつも <b>太陽の 方が 半分 光って</b> いて、地球から 見える 光った 部分の 形が 変わる。</p><p>新月 → 三日月 (夕方 西) → 上弦 (夕方 南、右半分) → 満月 (真夜中 南) → 下弦 (明け方 南、左半分) → 新月。約 29.5日で 一周。</p><p>満月の とき、太陽・地球・月が 一直線に 並ぶと <b>月食</b>。新月の ときに 並ぶと <b>日食</b>。</p></div>';
    frame(h); bindHome();
    const upd = () => { const d = +$('slD').value; $('slDV').textContent = d; const th = d / 29.53 * 2 * Math.PI;
      $('slTop').innerHTML = topSVG(th); $('slView').innerHTML = viewSVG(th);
      const k = (1 - Math.cos(th)) / 2, when = d < 1 || d > 28.5 ? '見えない (太陽と 同じ 方向)' : d < 5 ? '夕方、西の 空に 低く' : d < 10 ? '夕方、南の 空' : d < 13 ? '夜の はじめ、南東〜南' : d < 17 ? '真夜中、南の 空 (夕方に 東から のぼる)' : d < 20 ? '夜半すぎ〜明け方' : d < 25 ? '明け方、南の 空' : '明け方、東の 空に 低く';
      $('slRead').innerHTML = '<span><b>' + phaseName(d) + '</b></span><span>光って 見える 割合 <b>' + Math.round(k * 100) + '%</b></span><span>見える ころ <b>' + when + '</b></span>';
      if (Math.abs(d - 14.8) <= 0.5) mark('moon', 0); if (Math.abs(d - 7.4) <= 0.5) mark('moon', 1); if (d >= 2.5 && d <= 3.5) mark('moon', 2); };
    $('slD').oninput = upd; upd();
  }
  function topSVG(th) {
    const cx = 120, cy = 110, R = 72, ang = Math.PI + th, mx = cx + R * Math.cos(ang), my = cy + R * Math.sin(ang) * -1;
    let s = '<rect width="240" height="220" fill="#101a33"/>';
    for (let i = 0; i < 5; i++) s += '<line x1="0" y1="' + (40 + i * 35) + '" x2="26" y2="' + (40 + i * 35) + '" stroke="#ffd84a" stroke-width="1.5"/><polygon points="30,' + (40 + i * 35) + ' 24,' + (36 + i * 35) + ' 24,' + (44 + i * 35) + '" fill="#ffd84a"/>';
    s += '<text x="6" y="22" font-size="11" fill="#ffd84a">☀ 太陽の 光</text><circle cx="' + cx + '" cy="' + cy + '" r="' + R + '" fill="none" stroke="#4a5a7a" stroke-dasharray="4 4"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="15" fill="#2e6fb8"/><path d="M' + cx + ',' + (cy - 15) + ' A15,15 0 0 1 ' + cx + ',' + (cy + 15) + ' Z" fill="rgba(0,0,0,.45)"/><text x="' + cx + '" y="' + (cy + 30) + '" font-size="10" text-anchor="middle" fill="#9ab4e0">地球</text>';
    s += '<circle cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="10" fill="#e8e4d4"/><path d="M' + mx.toFixed(1) + ',' + (my - 10).toFixed(1) + ' A10,10 0 0 1 ' + mx.toFixed(1) + ',' + (my + 10).toFixed(1) + ' Z" fill="#3a3a48"/>';
    s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + mx.toFixed(1) + '" y2="' + my.toFixed(1) + '" stroke="#7fe0a0" stroke-width="1" stroke-dasharray="2 3"/><text x="232" y="212" font-size="10" text-anchor="end" fill="#9ab4e0">北極の 上から 見た 図 (反時計回り)</text>';
    return '<svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }
  function viewSVG(th) {
    const cx = 80, cy = 95, r = 55, c = Math.cos(th), waxing = Math.sin(th) >= 0, rx = Math.abs(c) * r;
    // 光って いる 半分 (満ちていく とき 右、欠けていく とき 左) + 明暗の 境目 (楕円)
    const lit = waxing ? 1 : 0;   // sweep
    let d = 'M' + cx + ',' + (cy - r) + ' A' + r + ',' + r + ' 0 0 ' + lit + ' ' + cx + ',' + (cy + r) + ' A' + rx.toFixed(1) + ',' + r + ' 0 0 ' + ((c > 0) === waxing ? 0 : 1) + ' ' + cx + ',' + (cy - r) + ' Z';
    let s = '<rect width="160" height="220" fill="#101a33"/><circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#2c3346"/><path d="' + d + '" fill="#f3eccb"/><text x="80" y="176" font-size="11" text-anchor="middle" fill="#9ab4e0">地球から 見た 月</text><text x="80" y="194" font-size="10" text-anchor="middle" fill="#6a7a9a">(日本から 見た 向き)</text>';
    return '<svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + s + '</svg>';
  }

  function open() { showPage('pageSciLab'); home(); }
  function stats() { const d = data(); return { done: Object.keys(d.done).length, total: 12 }; }
  return { open: open, stats: stats, stop: stopAnim, _lens: lensSVG, _circ: circSVG };
})();
