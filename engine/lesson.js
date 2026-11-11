/* engine/lesson.js — くわしい 解説 (図・表つき) の 共通エンジン
 * データ: data/lessons-*.js が LESSON(id, {...}) で 登録する。
 *   { lead: 一言で いうと, secs: [{ h: 見出し, p: [段落], fig: SVG, tbl: {head, rows, note}, ex: {q, steps, a}, tip }], miss: [よくある まちがい], check: [{q, a}] }
 *   本文の **太字** は <b>、[[赤]] [[青:...]] [[緑:...]] は 色つき。
 * 図の 道具: LF.numline / LF.graph / LF.area / LF.tape / LF.svg + LF.line, LF.poly, LF.txt, LF.circle, LF.arc, LF.arrow
 * 表示: Lesson.render(id, onBack) → #mwArea などの 中に HTML。Lesson.has(id)
 */
const LESSONS = {};
function LESSON(id, d) { LESSONS[id] = d; }
const LF = (function () {
  const C = { red: '#d0382a', blue: '#2e5fa8', green: '#2f8a4f', orange: '#d9822b', purple: '#7a4ab0', gray: '#8a8a9a', ink: '#2a2a3a', pale: '#eef3f9', paleR: '#fbe9e6', paleG: '#e8f4ea', paleY: '#fdf5dc' };
  const col = c => C[c] || c || C.ink;
  const n2 = v => Math.round(v * 100) / 100;
  const svg = (w, h, inner, cls) => '<svg class="lf-svg' + (cls ? ' ' + cls : '') + '" viewBox="0 0 ' + w + ' ' + h + '" role="img">' + inner + '</svg>';
  const line = (x1, y1, x2, y2, c, w, dash) => '<line x1="' + n2(x1) + '" y1="' + n2(y1) + '" x2="' + n2(x2) + '" y2="' + n2(y2) + '" stroke="' + col(c) + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' stroke-linecap="round"/>';
  const poly = (pts, fill, stroke, w) => '<polygon points="' + pts.map(p => n2(p[0]) + ',' + n2(p[1])).join(' ') + '" fill="' + (fill ? col(fill) : 'none') + '" stroke="' + col(stroke || 'ink') + '" stroke-width="' + (w || 2) + '" stroke-linejoin="round"/>';
  const pline = (pts, c, w, dash) => '<polyline points="' + pts.map(p => n2(p[0]) + ',' + n2(p[1])).join(' ') + '" fill="none" stroke="' + col(c) + '" stroke-width="' + (w || 2.5) + '"' + (dash ? ' stroke-dasharray="' + dash + '"' : '') + ' stroke-linejoin="round" stroke-linecap="round"/>';
  const txt = (x, y, t, c, size, anchor, bold) => '<text x="' + n2(x) + '" y="' + n2(y) + '" fill="' + col(c) + '" font-size="' + (size || 14) + '" text-anchor="' + (anchor || 'middle') + '"' + (bold ? ' font-weight="700"' : '') + '>' + t + '</text>';
  const circle = (x, y, r, fill, stroke, w) => '<circle cx="' + n2(x) + '" cy="' + n2(y) + '" r="' + r + '" fill="' + (fill ? col(fill) : 'none') + '" stroke="' + col(stroke || 'ink') + '" stroke-width="' + (w || 2) + '"/>';
  const rect = (x, y, w, h, fill, stroke, sw, rx) => '<rect x="' + n2(x) + '" y="' + n2(y) + '" width="' + n2(w) + '" height="' + n2(h) + '" rx="' + (rx || 0) + '" fill="' + (fill ? col(fill) : 'none') + '" stroke="' + col(stroke || 'ink') + '" stroke-width="' + (sw == null ? 1.5 : sw) + '"/>';
  function arc(cx, cy, r, a1, a2, fill, stroke) {   // 角度 (度、0 = 右、反時計回り)
    const p = a => [cx + r * Math.cos(a * Math.PI / 180), cy - r * Math.sin(a * Math.PI / 180)], s = p(a1), e = p(a2), large = (a2 - a1) % 360 > 180 ? 1 : 0;
    return '<path d="M' + n2(cx) + ',' + n2(cy) + ' L' + n2(s[0]) + ',' + n2(s[1]) + ' A' + r + ',' + r + ' 0 ' + large + ' 0 ' + n2(e[0]) + ',' + n2(e[1]) + ' Z" fill="' + (fill ? col(fill) : 'none') + '" stroke="' + col(stroke || 'ink') + '" stroke-width="2"/>';
  }
  function arrow(x1, y1, x2, y2, c, label, up) {   // 曲がった 矢印 (数直線の 移動など)
    const mx = (x1 + x2) / 2, my = Math.min(y1, y2) - (up === false ? -26 : 26);
    const ah = x2 > x1 ? -1 : 1;
    return '<path d="M' + n2(x1) + ',' + n2(y1) + ' Q' + n2(mx) + ',' + n2(my) + ' ' + n2(x2) + ',' + n2(y2) + '" fill="none" stroke="' + col(c) + '" stroke-width="2.5"/>' +
      poly([[x2, y2], [x2 + 9 * ah, y2 - (up === false ? -5 : 5) - 2], [x2 + 3 * ah, y2 - (up === false ? -10 : 10)]], c, c, 1) + (label ? txt(mx, my + (up === false ? 14 : 2), label, c, 14, 'middle', true) : '');
  }
  // 数直線: {min, max, step, marks: [[x, ラベル, 色]], arrows: [[from, to, ラベル, 色, 下か]], w}
  function numline(o) {
    const W = o.w || 420, H = o.h || 110, L = 30, Rr = W - 30, Y = o.y || 70, X = v => L + (v - o.min) * (Rr - L) / (o.max - o.min);
    let s = line(L - 14, Y, Rr + 14, Y, 'ink', 2) + poly([[Rr + 18, Y], [Rr + 8, Y - 5], [Rr + 8, Y + 5]], 'ink', 'ink', 1);
    for (let v = o.min; v <= o.max + 1e-9; v += (o.step || 1)) { const x = X(v), big = Math.abs(v) < 1e-9 || !o.labelEvery || Math.abs(v / o.labelEvery - Math.round(v / o.labelEvery)) < 1e-9; s += line(x, Y - (big ? 7 : 4), x, Y + (big ? 7 : 4), 'ink', big ? 2 : 1.2); if (big) s += txt(x, Y + 25, (v < 0 ? '−' + (-n2(v)) : n2(v)), Math.abs(v) < 1e-9 ? 'red' : 'ink', 15); }
    (o.arrows || []).forEach(a => { s += arrow(X(a[0]), Y - 6, X(a[1]), Y - 6, a[3] || 'blue', a[2], !a[4]); });
    (o.marks || []).forEach(m => { s += circle(X(m[0]), Y, 6, m[2] || 'red', 'white', 2) + (m[1] ? txt(X(m[0]), Y - 14, m[1], m[2] || 'red', 15, 'middle', true) : ''); });
    return svg(W, H, s);
  }
  // 座標と グラフ: {x: [min, max], y: [min, max], fns: [[f, 色, ラベル]], pts: [[x, y, ラベル, 色]], segs: [[x1, y1, x2, y2, 色, 点線]], w, h, unit}
  function graph(o) {
    const W = o.w || 360, H = o.h || 320, P = 28, xr = o.x, yr = o.y, X = v => P + (v - xr[0]) * (W - 2 * P) / (xr[1] - xr[0]), Y = v => H - P - (v - yr[0]) * (H - 2 * P) / (yr[1] - yr[0]);
    let s = rect(0, 0, W, H, 'white', 'white', 0);
    const st = o.grid || 1, sy = o.gridY || st;
    for (let v = Math.ceil(xr[0] / st) * st; v <= xr[1] + 1e-9; v += st) s += line(X(v), Y(yr[0]), X(v), Y(yr[1]), '#e3e8ef', 1);
    for (let v = Math.ceil(yr[0] / sy) * sy; v <= yr[1] + 1e-9; v += sy) s += line(X(xr[0]), Y(v), X(xr[1]), Y(v), '#e3e8ef', 1);
    s += line(X(xr[0]), Y(0), X(xr[1]) + 6, Y(0), 'ink', 1.8) + line(X(0), Y(yr[0]), X(0), Y(yr[1]) - 6, 'ink', 1.8) + txt(X(xr[1]) + 2, Y(0) - 8, 'x', 'ink', 14, 'end') + txt(X(0) + 12, Y(yr[1]) + 4, 'y', 'ink', 14) + txt(X(0) - 8, Y(0) + 16, 'O', 'ink', 13);
    const lab = o.labels || st, laby = o.labelsY || (o.gridY ? sy : lab);
    for (let v = Math.ceil(xr[0] / lab) * lab; v <= xr[1] + 1e-9; v += lab) { const r = Math.round(v * 1000) / 1000; if (r) s += txt(X(v), Y(0) + 16, r < 0 ? '−' + (-r) : r, 'gray', 11); }
    for (let v = Math.ceil(yr[0] / laby) * laby; v <= yr[1] + 1e-9; v += laby) { const r = Math.round(v * 1000) / 1000; if (r) s += txt(X(0) - 8, Y(v) + 4, r < 0 ? '−' + (-r) : r, 'gray', 11, 'end'); }
    (o.fns || []).forEach(([f, c, label, lx]) => { const pts = []; for (let i = 0; i <= 200; i++) { const x = xr[0] + (xr[1] - xr[0]) * i / 200, y = f(x); if (isFinite(y) && y >= yr[0] - 1 && y <= yr[1] + 1) pts.push([X(x), Y(Math.max(yr[0] - 1, Math.min(yr[1] + 1, y)))]); else if (pts.length) { s += pline(pts.splice(0), c); } } if (pts.length) s += pline(pts, c); if (label) { const x = lx != null ? lx : xr[1] - (xr[1] - xr[0]) * 0.15, y = f(x); if (isFinite(y)) s += txt(X(x), Y(Math.max(yr[0], Math.min(yr[1], y))) - 10, label, c, 14, 'middle', true); } });
    (o.segs || []).forEach(g => { s += line(X(g[0]), Y(g[1]), X(g[2]), Y(g[3]), g[4] || 'gray', 1.8, g[5] ? '5 4' : null); });
    (o.pts || []).forEach(p => { s += circle(X(p[0]), Y(p[1]), 5, p[3] || 'red', 'white', 1.5) + (p[2] ? txt(X(p[0]) + (p[4] || 8), Y(p[1]) - 9, p[2], p[3] || 'red', 13, p[4] < 0 ? 'end' : 'start', true) : ''); });
    s = '<g clip-path="none">' + s + '</g>';
    return svg(W, H, s, 'lf-graph');
  }
  // 面積図 (かけ算): {top: [ラベル], left: [ラベル], cells: [[値]], tw: [幅], lh: [高さ], colors}
  function area(o) {
    const tw = o.tw || o.top.map(() => 110), lh = o.lh || o.left.map(() => 70), X0 = 60, Y0 = 40, cols = o.colors || ['paleY', 'pale', 'paleG', 'paleR'];
    let s = '', x = X0;
    o.top.forEach((t, i) => { s += txt(x + tw[i] / 2, Y0 - 12, t, 'blue', 16, 'middle', true); x += tw[i]; });
    let y = Y0;
    o.left.forEach((t, j) => { s += txt(X0 - 12, y + lh[j] / 2 + 5, t, 'red', 16, 'end', true); let xx = X0; o.top.forEach((_, i) => { s += rect(xx, y, tw[i], lh[j], cols[(i + j * 2) % cols.length], 'ink', 1.5) + txt(xx + tw[i] / 2, y + lh[j] / 2 + 6, o.cells[j][i], 'ink', 17, 'middle', true); xx += tw[i]; }); y += lh[j]; });
    const W = X0 + tw.reduce((a, b) => a + b, 0) + 20, H = Y0 + lh.reduce((a, b) => a + b, 0) + (o.total ? 34 : 12);
    if (o.total) s += txt((X0 + W - 20) / 2, H - 10, o.total, 'green', 16, 'middle', true);
    return svg(W, H, s);
  }
  // テープ図: {rows: [{label, parts: [[長さ, ラベル, 色]]}], unit, total}
  function tape(o) {
    const W = o.w || 400, rowH = 38, gap = 22, L = 70, maxLen = Math.max(...o.rows.map(r => r.parts.reduce((a, p) => a + p[0], 0))), k = (W - L - 20) / maxLen;
    let s = '', y = 16;
    o.rows.forEach(r => { s += txt(L - 8, y + rowH / 2 + 6, r.label || '', 'ink', 14, 'end', true); let x = L; r.parts.forEach(p => { s += rect(x, y, p[0] * k, rowH, p[2] || 'pale', 'ink', 1.5, 3) + (p[1] ? txt(x + p[0] * k / 2, y + rowH / 2 + 6, p[1], 'ink', 15, 'middle', true) : ''); x += p[0] * k; }); if (r.brace) { s += line(L, y + rowH + 6, x, y + rowH + 6, 'red', 1.5) + txt((L + x) / 2, y + rowH + 22, r.brace, 'red', 15, 'middle', true); y += 16; } y += rowH + gap; });
    return svg(W, y, s);
  }
  return { C: C, svg: svg, line: line, poly: poly, pline: pline, txt: txt, circle: circle, rect: rect, arc: arc, arrow: arrow, numline: numline, graph: graph, area: area, tape: tape };
})();

const Lesson = (function () {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // 本文の 簡易記法: **太字**、[[赤:…]] [[青:…]] [[緑:…]]、改行
  const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\[\[(赤|青|緑|橙):(.+?)\]\]/g, (m, c, t) => '<span class="lf-' + ({ 赤: 'r', 青: 'b', 緑: 'g', 橙: 'o' })[c] + '">' + t + '</span>').replace(/\n/g, '<br>');
  const has = id => !!LESSONS[id];
  function html(id) {
    const d = LESSONS[id]; if (!d) return '';
    let h = '<div class="lf-lesson">';
    if (d.lead) h += '<div class="lf-lead"><span>💡 ひとことで いうと</span><p>' + fmt(d.lead) + '</p></div>';
    (d.secs || []).forEach((s, i) => {
      h += '<section class="lf-sec"><h3><span class="lf-no">' + (i + 1) + '</span>' + fmt(s.h) + '</h3>';
      (s.p || []).forEach(p => { h += '<p>' + fmt(p) + '</p>'; });
      if (s.fig) h += '<div class="lf-fig">' + s.fig + (s.cap ? '<div class="lf-cap">' + fmt(s.cap) + '</div>' : '') + '</div>';
      if (s.tbl) h += '<div class="lf-tblw"><table class="lf-tbl"><thead><tr>' + s.tbl.head.map(x => '<th>' + fmt(x) + '</th>').join('') + '</tr></thead><tbody>' + s.tbl.rows.map(r => '<tr>' + r.map(x => '<td>' + fmt(x) + '</td>').join('') + '</tr>').join('') + '</tbody></table>' + (s.tbl.note ? '<div class="lf-cap">' + fmt(s.tbl.note) + '</div>' : '') + '</div>';
      if (s.ex) h += '<div class="lf-ex"><div class="lf-exq">📝 ' + fmt(s.ex.q) + '</div><ol>' + s.ex.steps.map(x => '<li>' + fmt(x) + '</li>').join('') + '</ol>' + (s.ex.a ? '<div class="lf-exa">答え: ' + fmt(s.ex.a) + '</div>' : '') + '</div>';
      if (s.tip) h += '<div class="lf-tip">🌟 ' + fmt(s.tip) + '</div>';
      h += '</section>';
    });
    if (d.miss && d.miss.length) h += '<div class="lf-miss"><b>⚠ よくある まちがい</b><ul>' + d.miss.map(x => '<li>' + fmt(x) + '</li>').join('') + '</ul></div>';
    if (d.check && d.check.length) h += '<div class="lf-check"><b>✅ たしかめ (タップで 答え)</b>' + d.check.map(c => '<details><summary>' + fmt(c.q) + '</summary><div>' + fmt(c.a) + '</div></details>').join('') + '</div>';
    return h + '</div>';
  }
  return { has: has, html: html, fmt: fmt };
})();
