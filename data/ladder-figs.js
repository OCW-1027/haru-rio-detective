/* 算数・数学ラダーの 図 — 問題文の 数値から 図を 作って gen() の 結果に fig を 足す (2026-11)
 * 対象: 小学 ELAD (面積・角・四角形・立体・体積・円・合同・角柱・円の面積・拡大図・対称) と 中学 LADDER (おうぎ形・空間図形・多角形・三平方・相似・円周角)
 * 答えに なる ところは「?」で 示し、答えそのものは 描かない。
 */
(function () {
  const INK = '#2a2a3a', PALE = '#eef3f9', RED = '#d0382a', GRN = '#2f8a4f', BLU = '#2e5fa8', GRY = '#8a8a9a';
  const n2 = v => Math.round(v * 10) / 10;
  const S = (w, h, inner) => '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">' + inner + '</svg>';
  const L = (x1, y1, x2, y2, c, w, d) => '<line x1="' + n2(x1) + '" y1="' + n2(y1) + '" x2="' + n2(x2) + '" y2="' + n2(y2) + '" stroke="' + (c || INK) + '" stroke-width="' + (w || 2) + '"' + (d ? ' stroke-dasharray="5 4"' : '') + ' stroke-linecap="round"/>';
  const T = (x, y, t, c, s, a) => '<text x="' + n2(x) + '" y="' + n2(y) + '" font-size="' + (s || 15) + '" fill="' + (c || INK) + '" text-anchor="' + (a || 'middle') + '" font-weight="700">' + t + '</text>';
  const P = (pts, f, c, d) => '<polygon points="' + pts.map(p => n2(p[0]) + ',' + n2(p[1])).join(' ') + '" fill="' + (f || 'none') + '" stroke="' + (c || INK) + '" stroke-width="2" stroke-linejoin="round"' + (d ? ' stroke-dasharray="5 4"' : '') + '/>';
  const C = (x, y, r, f, c, d) => '<circle cx="' + n2(x) + '" cy="' + n2(y) + '" r="' + n2(r) + '" fill="' + (f || 'none') + '" stroke="' + (c || INK) + '" stroke-width="2"' + (d ? ' stroke-dasharray="5 4"' : '') + '/>';
  const D = (x, y) => '<circle cx="' + n2(x) + '" cy="' + n2(y) + '" r="3.5" fill="' + INK + '"/>';
  const E = (x, y, rx, ry, d, f) => '<ellipse cx="' + n2(x) + '" cy="' + n2(y) + '" rx="' + n2(rx) + '" ry="' + n2(ry) + '" fill="' + (f || 'none') + '" stroke="' + INK + '" stroke-width="2"' + (d ? ' stroke-dasharray="5 4"' : '') + '/>';
  const rad = a => a * Math.PI / 180, pt = (cx, cy, r, a) => [cx + r * Math.cos(rad(a)), cy - r * Math.sin(rad(a))];
  function sector(cx, cy, r, a1, a2, f) { const s = pt(cx, cy, r, a1), e = pt(cx, cy, r, a2), lg = ((a2 - a1) % 360 + 360) % 360 > 180 ? 1 : 0; return '<path d="M' + n2(cx) + ',' + n2(cy) + ' L' + n2(s[0]) + ',' + n2(s[1]) + ' A' + n2(r) + ',' + n2(r) + ' 0 ' + lg + ' 0 ' + n2(e[0]) + ',' + n2(e[1]) + ' Z" fill="' + (f || PALE) + '" stroke="' + INK + '" stroke-width="2" stroke-linejoin="round"/>'; }
  function angMark(cx, cy, r, a1, a2, c) { const s = pt(cx, cy, r, a1), e = pt(cx, cy, r, a2), lg = ((a2 - a1) % 360 + 360) % 360 > 180 ? 1 : 0; return '<path d="M' + n2(s[0]) + ',' + n2(s[1]) + ' A' + r + ',' + r + ' 0 ' + lg + ' 0 ' + n2(e[0]) + ',' + n2(e[1]) + '" fill="none" stroke="' + (c || RED) + '" stroke-width="1.8"/>'; }
  const dirOf = (a, b) => Math.atan2(-(b[1] - a[1]), b[0] - a[0]) * 180 / Math.PI;
  // 頂点 v の 角 (p→v→q) に 弧と ラベル
  function angAt(v, p, q, label, c, r) { let a1 = dirOf(v, p), a2 = dirOf(v, q); let d = ((a2 - a1) % 360 + 360) % 360; if (d > 180) { const t = a1; a1 = a2; a2 = t; d = 360 - d; } const m = a1 + d / 2, lp = pt(v[0], v[1], (r || 22) + 14, m); return angMark(v[0], v[1], r || 22, a1, a1 + d, c) + T(lp[0], lp[1] + 5, label, c || RED, 13); }
  const fit = (a, b, W, H) => { const s = Math.min(W / a, H / b); return [a * s, b * s]; };
  // 直方体 (斜投影): 横 w、高さ h、奥行き d の ラベル
  function box(w, h, d, lw, lh, ld, open, water) {
    const sc = Math.min(190 / (w + d * 0.5), 130 / (h + d * 0.4)), W = w * sc, H = h * sc, Dx = d * sc * 0.5, Dy = d * sc * 0.4, x0 = 72, y0 = 30 + Dy;
    const f = [[x0, y0], [x0 + W, y0], [x0 + W, y0 + H], [x0, y0 + H]], b = f.map(p => [p[0] + Dx, p[1] - Dy]);
    let s = '';
    if (water) { const wy = y0 + H * 0.3; s += P([[x0, wy], [x0 + W, wy], [x0 + W + Dx, wy - Dy], [x0 + W + Dx, y0 + H - Dy], [x0 + W, y0 + H], [x0, y0 + H]], '#cfe6f7', 'none'); }
    s += L(b[3][0], b[3][1], b[0][0], b[0][1], GRY, 1.5, 1) + L(b[3][0], b[3][1], b[2][0], b[2][1], GRY, 1.5, 1) + L(b[3][0], b[3][1], f[3][0], f[3][1], GRY, 1.5, 1);
    s += P(f, open ? 'none' : 'rgba(238,243,249,.6)') + L(f[0][0], f[0][1], b[0][0], b[0][1]) + L(f[1][0], f[1][1], b[1][0], b[1][1]) + L(f[2][0], f[2][1], b[2][0], b[2][1]) + L(b[0][0], b[0][1], b[1][0], b[1][1]) + L(b[1][0], b[1][1], b[2][0], b[2][1]);
    s += T(x0 + W / 2, y0 + H + 20, lw, RED, 13) + T(x0 - 6, y0 + H / 2 + 4, lh, RED, 13, 'end') + T(x0 + W + Dx / 2 + 10, y0 + H - Dy / 2 + 12, ld, RED, 13, 'start');
    return S(340, Math.max(150, y0 + H + 32), s);
  }
  function cyl(r, h, lr, lh, cone) {
    const R = 55, Hh = Math.min(130, Math.max(60, R * h / r)), cx = 140, top = 20, bot = top + Hh, ry = 16;
    let s = '';
    if (cone) s += L(cx - R, bot, cx, top) + L(cx + R, bot, cx, top) + L(cx, top, cx, bot, GRY, 1.5, 1);
    else s += E(cx, top, R, ry, 0, PALE) + L(cx - R, top, cx - R, bot) + L(cx + R, top, cx + R, bot) + L(cx + R + 18, top, cx + R + 18, bot, GRY, 1.2);
    s += '<path d="M' + (cx - R) + ',' + bot + ' A' + R + ',' + ry + ' 0 0 0 ' + (cx + R) + ',' + bot + '" fill="none" stroke="' + INK + '" stroke-width="2"/><path d="M' + (cx - R) + ',' + bot + ' A' + R + ',' + ry + ' 0 0 1 ' + (cx + R) + ',' + bot + '" fill="none" stroke="' + INK + '" stroke-width="1.5" stroke-dasharray="5 4"/>';
    s += L(cx, bot, cx + R, bot, BLU, 2) + D(cx, bot) + T(cx + R / 2, bot + ry + 14, lr, RED, 13) + T(cone ? cx + 8 : cx + R + 24, (top + bot) / 2 + 4, lh, RED, 13, 'start');
    return S(300, bot + ry + 24, s);
  }
  function regPoly(n, cx, cy, r, rot) { return Array.from({ length: n }, (x, i) => pt(cx, cy, r, 90 + (rot || 0) + i * 360 / n)); }
  // 三角形 (角度から 作る): 底辺 AB と 角 A、角 B
  function triByAngles(A, B, Wd) { const a = rad(A), b = rad(B), base = Wd || 220, h = base / (1 / Math.tan(a) + 1 / Math.tan(b)), x0 = 50, y0 = 150; const cx = x0 + h / Math.tan(a); return [[x0, y0], [x0 + base, y0], [cx, y0 - h]]; }
  const SHAPES = {
    '正三角形': () => P(regPoly(3, 150, 92, 70), PALE), '正方形': () => P([[95, 30], [205, 30], [205, 140], [95, 140]], PALE), '長方形': () => P([[70, 45], [230, 45], [230, 130], [70, 130]], PALE),
    'ひし形': () => P([[150, 20], [225, 85], [150, 150], [75, 85]], PALE), '二等辺三角形': () => P([[150, 20], [205, 150], [95, 150]], PALE),
    '正五角形': () => P(regPoly(5, 150, 90, 68), PALE), '正六角形': () => P(regPoly(6, 150, 85, 66), PALE),
  };
  const F = {};
  // ===== 小学 =====
  F.e4f = q => { let m;
    if ((m = q.match(/縦 (\d+)cm、横 (\d+)cm の 長方形の 角から、縦 (\d+)cm・横 (\d+)cm/))) { const [H, W, h, w] = m.slice(1).map(Number), [pw, ph] = fit(W, H, 220, 140), sx = pw / W, sy = ph / H, x0 = 50, y0 = 20;
      return S(320, 200, P([[x0, y0], [x0 + (W - w) * sx, y0], [x0 + (W - w) * sx, y0 + h * sy], [x0 + pw, y0 + h * sy], [x0 + pw, y0 + ph], [x0, y0 + ph]], PALE) + P([[x0 + (W - w) * sx, y0], [x0 + pw, y0], [x0 + pw, y0 + h * sy], [x0 + (W - w) * sx, y0 + h * sy]], 'none', GRY, 1) +
        T(x0 + pw / 2, y0 + ph + 20, W + 'cm', RED, 13) + T(x0 - 6, y0 + ph / 2 + 4, H + 'cm', RED, 13, 'end') + T(x0 + (W - w / 2) * sx, y0 + h * sy / 2 + 5, '切りとる', GRY, 11) + T(x0 + (W - w / 2) * sx, y0 - 5, w + 'cm', GRY, 12) + T(x0 + pw + 5, y0 + h * sy / 2 + 4, h + 'cm', GRY, 12, 'start')); }
    if ((m = q.match(/縦 (\d+)cm、横 (\d+)cm の 長方形の 面積/))) { const [a, b] = m.slice(1).map(Number), [pw, ph] = fit(b, a, 220, 130); return S(320, ph + 50, P([[50, 15], [50 + pw, 15], [50 + pw, 15 + ph], [50, 15 + ph]], PALE) + T(50 + pw / 2, 15 + ph + 20, b + 'cm', RED, 13) + T(44, 15 + ph / 2 + 4, a + 'cm', RED, 13, 'end')); }
    if ((m = q.match(/1辺 (\d+)m の 正方形/))) return S(260, 160, P([[80, 15], [200, 15], [200, 135], [80, 135]], PALE) + T(140, 154, m[1] + 'm', RED, 13) + T(74, 80, m[1] + 'm', RED, 13, 'end'));
  };
  F.e4g = q => { let m;
    if ((m = q.match(/片方の 角が (\d+)°/))) { const a = +m[1], o = [150, 120], e = pt(150, 120, 110, a); return S(300, 140, L(30, 120, 270, 120) + L(o[0], o[1], e[0], e[1], BLU, 2.5) + angMark(150, 120, 26, 0, a) + T(pt(150, 120, 42, a / 2)[0], pt(150, 120, 42, a / 2)[1] + 5, a + '°', RED, 13) + angMark(150, 120, 32, a, 180, GRN) + T(pt(150, 120, 50, (a + 180) / 2)[0], pt(150, 120, 50, (a + 180) / 2)[1] + 5, '?', GRN, 15)); }
    if ((m = q.match(/短いはりが (\d+) を/))) { const h = +m[1], cx = 150, cy = 90, r = 70; let s = C(cx, cy, r, '#fffdf6'); for (let i = 1; i <= 12; i++) { const p = pt(cx, cy, r - 13, 90 - i * 30); s += T(p[0], p[1] + 5, i, INK, 12); } const hp = pt(cx, cy, 40, 90 - h * 30); s += L(cx, cy, cx, cy - 55, INK, 2.5) + L(cx, cy, hp[0], hp[1], INK, 4) + angMark(cx, cy, 22, 90 - h * 30, 90, GRN) + T(pt(cx, cy, 30, 90 - h * 15)[0] + 4, pt(cx, cy, 30, 90 - h * 15)[1] + 4, '?', GRN, 14) + D(cx, cy); return S(300, 180, s); }
    if ((m = q.match(/1回転の うち (\d+)° 回った/))) { const a = +m[1]; return S(300, 170, sector(150, 85, 65, 0, a, '#fbe9e6') + C(150, 85, 65) + L(150, 85, 215, 85, BLU, 2.5) + T(pt(150, 85, 30, a / 2)[0], pt(150, 85, 30, a / 2)[1] + 5, a + '°', RED, 13) + T(pt(150, 85, 40, (a + 360) / 2)[0], pt(150, 85, 40, (a + 360) / 2)[1] + 5, '?', GRN, 15)); }
  };
  const para = (la, lb, angA, angQ) => { const A = [50, 140], B = [210, 140], Cc = [260, 40], Dd = [100, 40]; return S(310, 170, P([A, B, Cc, Dd], PALE) + (la ? T(130, 160, la, RED, 13) : '') + (lb ? T(68, 92, lb, RED, 13, 'end') : '') + (angA ? angAt(A, B, Dd, angA) : '') + (angQ ? angAt(B, Cc, A, angQ, GRN) : '')); };
  F.e4j = q => { let m;
    if ((m = q.match(/平行四辺形の 1つの 角が (\d+)°/))) return para(null, null, m[1] + '°', '?');
    if ((m = q.match(/となり合う 2辺が (\d+)cm と (\d+)cm/))) return para(m[1] + 'cm', m[2] + 'cm');
  };
  F.e4k = q => { let m; if ((m = q.match(/縦 (\d+)cm、横 (\d+)cm、高さ (\d+)cm の 直方体/))) return box(+m[2], +m[3], +m[1], '横 ' + m[2] + 'cm', '高さ ' + m[3] + 'cm', '縦 ' + m[1] + 'cm');
    if (/直方体の (面|辺|頂点)の 数/.test(q)) return box(6, 4, 4, '', '', ''); };
  F.e5h = q => { let m;
    if ((m = q.match(/縦 (\d+)cm、横 (\d+)cm、高さ (\d+)cm の 直方体/))) return box(+m[2], +m[3], +m[1], m[2] + 'cm', m[3] + 'cm', m[1] + 'cm');
    if ((m = q.match(/1辺 (\d+)cm の 立方体/))) return box(5, 5, 5, m[1] + 'cm', m[1] + 'cm', m[1] + 'cm');
    if ((m = q.match(/内のりが 縦 (\d+)cm、横 (\d+)cm、深さ (\d+)cm/))) return box(+m[2], +m[3], +m[1], m[2] + 'cm', '深さ ' + m[3] + 'cm', m[1] + 'cm', true, true);
    if ((m = q.match(/外側の 長さが 縦 (\d+)cm、横 (\d+)cm、高さ (\d+)cm/))) return box(+m[2], +m[3], +m[1], m[2] + 'cm', m[3] + 'cm', m[1] + 'cm', true).replace('</svg>', T(170, 16, '板の 厚さ 1cm (ふたなし)', GRY, 12) + '</svg>');
  };
  F.e5i = q => { let m;
    if ((m = q.match(/半径 (\d+)cm の 円の 円周/))) return S(260, 170, C(130, 85, 70, PALE) + L(130, 85, 200, 85, BLU, 2.5) + D(130, 85) + T(165, 78, m[1] + 'cm', RED, 13));
    if ((m = q.match(/直径 (\d+)cm の 円の 円周/))) return S(260, 170, C(130, 85, 70, PALE) + L(60, 85, 200, 85, BLU, 2.5) + D(130, 85) + T(130, 78, m[1] + 'cm', RED, 13));
    if ((m = q.match(/三角形の 2つの 角が (\d+)° と (\d+)°/))) { const t = triByAngles(+m[1], +m[2]); return S(320, 170, P(t, PALE) + angAt(t[0], t[1], t[2], m[1] + '°') + angAt(t[1], t[2], t[0], m[2] + '°') + angAt(t[2], t[0], t[1], '?', GRN, 18)); }
    if ((m = q.match(/四角形の 3つの 角が (\d+)°、(\d+)°、(\d+)°/))) { const Q = [[50, 150], [250, 150], [230, 30], [80, 55]]; return S(310, 175, P(Q, PALE) + angAt(Q[0], Q[1], Q[3], m[1] + '°') + angAt(Q[1], Q[2], Q[0], m[2] + '°') + angAt(Q[2], Q[3], Q[1], m[3] + '°') + angAt(Q[3], Q[0], Q[2], '?', GRN) + T(155, 172, '(図は 正確では ない)', GRY, 10)); }
    if ((m = q.match(/(\d+)角形の 角の 和/))) { const n = +m[1], v = regPoly(n, 150, 92, 72); let s = P(v, PALE); for (let i = 2; i < n - 1; i++) s += L(v[0][0], v[0][1], v[i][0], v[i][1], BLU, 1.5, 1); return S(300, 175, s); }
  };
  F.e5j = q => { let m; const tri2 = (la, lb, lc, qa) => { const A = [40, 140], B = [140, 140], Cc = [70, 40], Dd = [270, 140], Ee = [170, 140], Ff = [240, 40];
      return S(310, 165, P([A, B, Cc], PALE) + P([Dd, Ee, Ff], PALE) + T(32, 156, 'A') + T(148, 156, 'B') + T(68, 32, 'C') + T(278, 156, 'D') + T(162, 156, 'E') + T(242, 32, 'F') + (la || '') + (qa || '')); };
    if ((m = q.match(/AB = (\d+)cm、BC = (\d+)cm、CA = (\d+)cm の とき、辺 EF/))) return tri2(T(90, 158, m[1], RED, 12) + T(112, 88, m[2], RED, 12) + T(44, 88, m[3], RED, 12), '', '', T(214, 88, '?', GRN, 15));
    if ((m = q.match(/角 A = (\d+)°、角 B = (\d+)° の とき、角 F/))) return tri2(T(62, 132, m[1] + '°', RED, 12) + T(122, 132, m[2] + '°', RED, 12), '', '', T(236, 62, '?', GRN, 15));
  };
  F.e5m = q => { let m; const NUM = { 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8 };
    if ((m = q.match(/^(三|四|五|六|七|八)角柱の/))) { const n = NUM[m[1]], top = regPoly(n, 140, 40, 60, 0).map(p => [p[0], 40 + (p[1] - 40) * 0.35]), bot = top.map(p => [p[0], p[1] + 100]); let s = '';
      bot.forEach((p, i) => { const q2 = bot[(i + 1) % n]; const back = (p[1] + q2[1]) / 2 < 140; s += L(p[0], p[1], q2[0], q2[1], back ? GRY : INK, back ? 1.5 : 2, back); });
      top.forEach((p, i) => { s += L(p[0], p[1], bot[i][0], bot[i][1], p[1] < 40 ? GRY : INK, p[1] < 40 ? 1.5 : 2, p[1] < 40); }); s += P(top, PALE); return S(300, 175, s); }
    if ((m = q.match(/直径 (\d+)cm の 円柱の 展開図/))) return S(320, 225, C(120, 35, 26, PALE) + P([[50, 62], [270, 62], [270, 158], [50, 158]], PALE) + C(120, 185, 26, PALE) + L(94, 35, 146, 35, BLU, 2) + T(120, 28, m[1] + 'cm', RED, 12) + L(50, 170, 270, 170, GRN, 1.5) + L(50, 164, 50, 176, GRN, 1.5) + L(270, 164, 270, 176, GRN, 1.5) + T(205, 186, '横 = ?', GRN, 14) + T(160, 114, '側面', GRY, 13));
  };
  F.e6c = q => { let m;
    if ((m = q.match(/半径 (\d+)cm の 円の 面積/))) return S(260, 170, C(130, 85, 70, PALE) + L(130, 85, 200, 85, BLU, 2.5) + D(130, 85) + T(165, 78, m[1] + 'cm', RED, 13));
    if ((m = q.match(/直径 (\d+)cm の 円の 面積/))) return S(260, 170, C(130, 85, 70, PALE) + L(60, 85, 200, 85, BLU, 2.5) + D(130, 85) + T(130, 78, m[1] + 'cm', RED, 13));
    if ((m = q.match(/半径 (\d+)cm の 半円/))) return S(260, 120, sector(130, 100, 80, 0, 180) + L(130, 100, 210, 100, BLU, 2.5) + D(130, 100) + T(170, 116, m[1] + 'cm', RED, 13));
    if ((m = q.match(/半径 (\d+)cm、中心角 90° の おうぎ形/))) return S(240, 160, sector(60, 140, 110, 0, 90) + D(60, 140) + T(115, 156, m[1] + 'cm', RED, 13) + angMark(60, 140, 18, 0, 90) + T(84, 124, '90°', RED, 12));
  };
  F.e6d = q => { let m;
    if ((m = q.match(/底辺 (\d+)cm・高さ (\d+)cm の 三角形で、高さ (\d+)cm の 三角柱/))) { const t = [[60, 150], [170, 150], [100, 95]], u = t.map(p => [p[0] + 70, p[1] - 70]);
      return S(320, 175, P(t, PALE) + P(u, 'none', GRY, 1) + t.map((p, i) => L(p[0], p[1], u[i][0], u[i][1], i === 2 ? GRY : INK, i === 2 ? 1.5 : 2, i === 2)).join('') + L(100, 95, 100, 150, BLU, 1.5, 1) + T(115, 168, m[1] + 'cm', RED, 12) + T(96, 128, m[2] + 'cm', RED, 12, 'end') + T(222, 116, '高さ ' + m[3] + 'cm', RED, 12, 'start')); }
    if ((m = q.match(/半径 (\d+)cm、高さ (\d+)cm の 円柱/))) return cyl(+m[1], +m[2], m[1] + 'cm', m[2] + 'cm');
  };
  F.e6e = q => { let m; if ((m = q.match(/縦 (\d+)cm の 三角形の (\d+)倍の 拡大図/))) { const k = +m[2], s1 = 50, s2 = Math.min(140, 50 * k);
      return S(320, 175, P([[30, 160], [80, 160], [30, 160 - s1]], PALE) + T(24, 160 - s1 / 2 + 4, m[1] + 'cm', RED, 12, 'end') + P([[150, 160], [150 + s2, 160], [150, 160 - s2]], PALE) + T(144, 160 - s2 / 2 + 4, '?', GRN, 15, 'end') + T(190, 30, k + '倍', BLU, 14)); } };
  F.e6h = q => { const m = q.match(/^(正三角形|正方形|長方形|ひし形|二等辺三角形|正五角形|正六角形)の 対称の 軸は/); if (m) return S(300, 170, SHAPES[m[1]]()); };
  // ===== 中学 =====
  F.c1e = q => { const m = q.match(/半径 (\d+)cm、中心角 (\d+)° の おうぎ形/); if (!m) return; const a = +m[2], r = 70, cx = 150, cy = a > 180 ? 90 : 120;
    return S(300, a > 180 ? 175 : 140, sector(cx, cy, r, 0, a) + D(cx, cy) + T(cx + r / 2, cy + 16, m[1] + 'cm', RED, 13) + angMark(cx, cy, 18, 0, a) + T(pt(cx, cy, 32, a / 2)[0], pt(cx, cy, 32, a / 2)[1] + 5, a + '°', RED, 12)); };
  F.c1g = q => { let m;
    if ((m = q.match(/半径 (\d+)cm、高さ (\d+)cm の 円柱/))) return cyl(+m[1], +m[2], m[1] + 'cm', m[2] + 'cm');
    if ((m = q.match(/半径 (\d+)cm、高さ (\d+)cm の 円錐/))) return cyl(+m[1], +m[2], m[1] + 'cm', m[2] + 'cm', true);
    if ((m = q.match(/半径 (\d+)cm の 球/))) return S(260, 170, C(130, 85, 70, PALE) + E(130, 85, 70, 18, 1) + L(130, 85, 200, 85, BLU, 2.5) + D(130, 85) + T(165, 78, m[1] + 'cm', RED, 13));
  };
  F.c2d = q => { const m = q.match(/正(\d+)角形の 1つの (外角|内角)/); if (!m) return; const n = +m[1], v = regPoly(n, 140, 95, 70, 180 / n), A = v[0], B = v[1], ext = [B[0] + (B[0] - A[0]) * 0.6, B[1] + (B[1] - A[1]) * 0.6];
    return S(300, 185, P(v, PALE) + (m[2] === '外角' ? L(B[0], B[1], ext[0], ext[1], BLU, 1.8, 1) + angAt(B, ext, v[2], '?', GRN, 18) : angAt(B, A, v[2], '?', GRN, 18))); };
  F.c3f = q => { let m; const rt = (la, lb, lc) => S(300, 175, P([[50, 150], [250, 150], [50, 40]], PALE) + '<polyline points="50,136 64,136 64,150" fill="none" stroke="' + INK + '" stroke-width="1.5"/>' + T(150, 168, lb, lb === '?' ? GRN : RED, 14) + T(42, 100, la, la === '?' ? GRN : RED, 14, 'end') + T(160, 88, lc, lc === '?' ? GRN : RED, 14));
    if ((m = q.match(/2辺が (\d+)cm と (\d+)cm の 直角三角形の 斜辺/))) return rt(m[1] + 'cm', m[2] + 'cm', '?');
    if ((m = q.match(/斜辺 (\d+)cm、1辺 (\d+)cm の 直角三角形/))) return rt(m[2] + 'cm', '?', m[1] + 'cm');
  };
  F.c3g = q => { const m = q.match(/相似比 (\d+) : (\d+) の 2つの (三角形|立体)/); if (!m) return; const a = +m[1], b = +m[2], s1 = 120 * a / b, s2 = 120;
    if (m[3] === '三角形') return S(320, 160, P([[20, 145], [20 + s1, 145], [20 + s1 * 0.3, 145 - s1 * 0.8]], PALE) + P([[160, 145], [160 + s2, 145], [160 + s2 * 0.3, 145 - s2 * 0.8]], PALE) + T(20 + s1 / 2, 158, a, RED, 13) + T(160 + s2 / 2, 158, b, RED, 13));
    const cube = (x, s, lab) => { const y = 150, d = s * 0.35; return P([[x, y], [x + s, y], [x + s, y - s], [x, y - s]], PALE) + P([[x, y - s], [x + d, y - s - d], [x + s + d, y - s - d], [x + s, y - s]], '#f6f9fc') + P([[x + s, y], [x + s + d, y - d], [x + s + d, y - s - d], [x + s, y - s]], '#dfe8f2') + T(x + s / 2, y + 14, lab, RED, 13); };
    return S(320, 170, cube(20, s1 * 0.8, a) + cube(160, s2 * 0.8, b)); };
  F.c3h = q => { let m; const cx = 150, cy = 95, r = 75, O = [cx, cy], cen = (() => { const k = q.match(/∠AOB = (\d+)°/) || q.match(/∠ACB = (\d+)°/); return k ? (q.indexOf('∠AOB') >= 0 && q.indexOf('中心角 ∠AOB =') >= 0 ? +k[1] : 2 * +k[1]) : 120; })(), A = pt(cx, cy, r, 270 - cen / 2), B = pt(cx, cy, r, 270 + cen / 2), Pp = pt(cx, cy, r, 100);
    const base = C(cx, cy, r) + D(cx, cy) + T(cx + 10, cy - 4, 'O', INK, 13, 'start');
    if ((m = q.match(/中心角 ∠AOB = (\d+)°/))) return S(300, 185, base + L(O[0], O[1], A[0], A[1]) + L(O[0], O[1], B[0], B[1]) + L(Pp[0], Pp[1], A[0], A[1], BLU) + L(Pp[0], Pp[1], B[0], B[1], BLU) + angAt(O, A, B, m[1] + '°', RED, 16) + angAt(Pp, A, B, '?', GRN, 18) + T(A[0] - 10, A[1] + 14, 'A') + T(B[0] + 10, B[1] + 14, 'B') + T(Pp[0], Pp[1] - 8, 'P'));
    if ((m = q.match(/円周角 ∠ACB = (\d+)°/))) return S(300, 185, base + L(O[0], O[1], A[0], A[1]) + L(O[0], O[1], B[0], B[1]) + L(Pp[0], Pp[1], A[0], A[1], BLU) + L(Pp[0], Pp[1], B[0], B[1], BLU) + angAt(Pp, A, B, m[1] + '°', RED, 18) + angAt(O, A, B, '?', GRN, 16) + T(A[0] - 10, A[1] + 14, 'A') + T(B[0] + 10, B[1] + 14, 'B') + T(Pp[0], Pp[1] - 8, 'C'));
    if ((m = q.match(/∠CAB = (\d+)°/))) { const A2 = [cx - r, cy], B2 = [cx + r, cy], C2 = pt(cx, cy, r, 115); return S(300, 185, base + L(A2[0], A2[1], B2[0], B2[1]) + L(C2[0], C2[1], A2[0], A2[1], BLU) + L(C2[0], C2[1], B2[0], B2[1], BLU) + angAt(A2, B2, C2, m[1] + '°', RED, 22) + angAt(B2, A2, C2, '?', GRN, 22) + T(A2[0] - 12, A2[1] + 5, 'A') + T(B2[0] + 12, B2[1] + 5, 'B') + T(C2[0], C2[1] - 8, 'C')); }
  };

  // ----- 追加の 型 (more() で 足された 問題) -----
  const rectF = (a, b, la, lb, inner) => { const [pw, ph] = fit(b, a, 220, 130); return S(320, ph + 50, P([[50, 15], [50 + pw, 15], [50 + pw, 15 + ph], [50, 15 + ph]], PALE) + T(50 + pw / 2, 15 + ph + 20, lb, lb === '?' ? GRN : RED, 13) + T(44, 15 + ph / 2 + 4, la, la === '?' ? GRN : RED, 13, 'end') + (inner ? T(50 + pw / 2, 15 + ph / 2 + 5, inner, BLU, 13) : '')); };
  const X = {};
  X.e4f = q => { let m;
    if ((m = q.match(/面積が (\d+)cm² で、縦が (\d+)cm の 長方形の 横/))) return rectF(+m[2], +m[1] / +m[2], m[2] + 'cm', '?', m[1] + 'cm²');
    if ((m = q.match(/縦 (\d+)m、横 (\d+)m の 長方形の 土地に、はば (\d+)m の 道/))) { const a = +m[1], b = +m[2], w = +m[3], [pw, ph] = fit(b, a, 220, 130), sx = pw / b, x0 = 50, y0 = 15, rw = Math.max(6, w * sx);
      return S(320, ph + 50, P([[x0, y0], [x0 + pw, y0], [x0 + pw, y0 + ph], [x0, y0 + ph]], '#e8f4ea') + '<rect x="' + n2(x0 + pw * 0.45) + '" y="' + y0 + '" width="' + n2(rw) + '" height="' + n2(ph) + '" fill="#e8dcc6"/><rect x="' + x0 + '" y="' + n2(y0 + ph * 0.55) + '" width="' + n2(pw) + '" height="' + n2(rw) + '" fill="#e8dcc6"/>' + P([[x0, y0], [x0 + pw, y0], [x0 + pw, y0 + ph], [x0, y0 + ph]]) + T(x0 + pw / 2, y0 + ph + 20, b + 'm', RED, 13) + T(x0 - 6, y0 + ph / 2 + 4, a + 'm', RED, 13, 'end') + T(x0 + pw * 0.45 + rw / 2, y0 - 3, '道 ' + w + 'm', '#8a6a3a', 11)); }
    if ((m = q.match(/縦 (\d+)m、横 (\d+)m の 畑/))) return rectF(+m[1], +m[2], m[1] + 'm', m[2] + 'm');
  };
  X.e4g = q => { let m;
    if ((m = q.match(/長いはりが (\d+)分間に/))) { const mm = +m[1], cx = 150, cy = 90, r = 70, a2 = 90 - mm * 6; let s = C(cx, cy, r, '#fffdf6'); for (let i = 1; i <= 12; i++) { const p = pt(cx, cy, r - 13, 90 - i * 30); s += T(p[0], p[1] + 5, i, INK, 12); } const e = pt(cx, cy, 55, a2); return S(300, 180, s + sector(cx, cy, 30, a2, 90, 'rgba(47,138,79,.18)') + L(cx, cy, cx, cy - 55, GRY, 2, 1) + L(cx, cy, e[0], e[1], INK, 2.5) + T(pt(cx, cy, 42, (a2 + 90) / 2)[0], pt(cx, cy, 42, (a2 + 90) / 2)[1] + 5, '?', GRN, 14) + D(cx, cy)); }
    if ((m = q.match(/2本の 直線が 交わって できる 角の 1つが (\d+)°。その (向かい合う|となりの)/))) { const x = +m[1], cx = 150, cy = 85, e1 = pt(cx, cy, 120, x), e2 = pt(cx, cy, 120, x + 180);
      const qa = m[2] === '向かい合う' ? [180, 180 + x] : [x, 180]; return S(300, 170, L(30, cy, 270, cy) + L(e2[0], e2[1], e1[0], e1[1]) + angMark(cx, cy, 24, 0, x) + T(pt(cx, cy, 40, x / 2)[0], pt(cx, cy, 40, x / 2)[1] + 5, x + '°', RED, 13) + angMark(cx, cy, 30, qa[0], qa[1], GRN) + T(pt(cx, cy, 46, (qa[0] + qa[1]) / 2)[0], pt(cx, cy, 46, (qa[0] + qa[1]) / 2)[1] + 5, '?', GRN, 15)); }
  };
  X.e5g = q => { let m;
    if ((m = q.match(/面積が (\d+)cm²、底辺が (\d+)cm の 三角形の 高さ/))) return S(300, 170, P([[50, 145], [230, 145], [110, 30]], PALE) + L(110, 30, 110, 145, BLU, 1.8, 1) + T(140, 162, m[2] + 'cm', RED, 13) + T(104, 92, '?', GRN, 15, 'end') + T(160, 110, m[1] + 'cm²', BLU, 12));
    if ((m = q.match(/上底 (\d+)cm、下底 (\d+)cm、面積 (\d+)cm² の 台形の 高さ/))) return S(300, 170, P([[40, 145], [260, 145], [190, 45], [90, 45]], PALE) + L(90, 45, 90, 145, BLU, 1.8, 1) + T(140, 38, m[1] + 'cm', RED, 13) + T(150, 162, m[2] + 'cm', RED, 13) + T(84, 100, '?', GRN, 15, 'end') + T(165, 105, m[3] + 'cm²', BLU, 12));
    if ((m = q.match(/縦 (\d+)cm、横 (\d+)cm の 長方形から、直角を はさむ 2辺が (\d+)cm と (\d+)cm の 直角三角形/))) { const b = +m[1], a = +m[2], c = +m[3], d = +m[4], [pw, ph] = fit(a, b, 220, 130), sx = pw / a, sy = ph / b, x0 = 50, y0 = 15;
      return S(320, ph + 50, P([[x0, y0], [x0 + pw - c * sx, y0], [x0 + pw, y0 + d * sy], [x0 + pw, y0 + ph], [x0, y0 + ph]], PALE) + P([[x0 + pw - c * sx, y0], [x0 + pw, y0], [x0 + pw, y0 + d * sy]], 'none', GRY, 1) + T(x0 + pw / 2, y0 + ph + 20, a + 'cm', RED, 13) + T(x0 - 6, y0 + ph / 2 + 4, b + 'cm', RED, 13, 'end') + T(x0 + pw - c * sx / 2, y0 - 4, c + 'cm', GRY, 12) + T(x0 + pw + 5, y0 + d * sy / 2 + 4, d + 'cm', GRY, 12, 'start')); }
  };
  X.e5h = q => { let m;
    if ((m = q.match(/体積が (\d+)cm³、縦 (\d+)cm、横 (\d+)cm の 直方体の 高さ/))) return box(+m[3], 5, +m[2], m[3] + 'cm', '?', m[2] + 'cm');
    if ((m = q.match(/内のり 縦 (\d+)cm、横 (\d+)cm の 水そうに 水を (\d+)L/))) return box(+m[2], 30, +m[1], m[2] + 'cm', '深さ ?', m[1] + 'cm', true, true);
  };
  X.e5i = q => { let m;
    if ((m = q.match(/円周が ([\d.]+)cm の 円の 直径/))) return S(260, 175, C(130, 85, 70, PALE) + L(60, 85, 200, 85, BLU, 2.5) + D(130, 85) + T(130, 78, '?', GRN, 15) + T(130, 172, '円周 ' + m[1] + 'cm', RED, 12));
    if ((m = q.match(/直径 (\d+)cm の 半円の 周り/))) return S(260, 120, sector(130, 100, 80, 0, 180, PALE) + '<path d="M50,100 A80,80 0 0 1 210,100" fill="none" stroke="' + GRN + '" stroke-width="3.5"/>' + L(50, 100, 210, 100, GRN, 3.5) + T(130, 116, m[1] + 'cm', RED, 13));
    if ((m = q.match(/正(\d+)角形の 1つの 角/))) { const n = +m[1], v = regPoly(n, 150, 95, 72, 180 / n); return S(300, 185, P(v, PALE) + angAt(v[1], v[0], v[2], '?', GRN, 18)); }
  };
  X.e5j = q => { const m = q.match(/片方の 四角形の 角が (\d+)°、(\d+)°、(\d+)°/); if (!m) return; const Q = [[30, 140], [140, 140], [125, 50], [45, 65]], Q2 = Q.map(p => [p[0] + 150, p[1]]);
    return S(310, 165, P(Q, PALE) + P(Q2, PALE) + angAt(Q[0], Q[1], Q[3], m[1] + '°', RED, 16) + angAt(Q[1], Q[2], Q[0], m[2] + '°', RED, 16) + angAt(Q[2], Q[3], Q[1], m[3] + '°', RED, 16) + angAt(Q2[3], Q2[0], Q2[2], '?', GRN, 16)); };
  X.e5m = q => { let m;
    if ((m = q.match(/直径 (\d+)cm、高さ (\d+)cm の 円柱の 側面/))) return cyl(+m[1] / 2, +m[2], '', m[2] + 'cm').replace('</svg>', T(140, 14, '直径 ' + m[1] + 'cm', RED, 12) + '</svg>');
    if ((m = q.match(/底面が 1辺 (\d+)cm の 正(三|四|五|六|七|八)角形で、高さ (\d+)cm の 角柱/))) return F.e5m(m[2] + '角柱の').replace('</svg>', T(250, 100, '高さ ' + m[3] + 'cm', RED, 12) + T(140, 14, '1辺 ' + m[1] + 'cm', RED, 12) + '</svg>');
  };
  X.e6c = q => { let m;
    if ((m = q.match(/円周が ([\d.]+)cm の 円の 面積/))) return S(260, 175, C(130, 85, 70, PALE) + D(130, 85) + T(130, 172, '円周 ' + m[1] + 'cm', RED, 12));
    if ((m = q.match(/半径 (\d+)cm の 円から、同じ 中心で 半径 (\d+)cm の 円を くりぬいた/))) { const R1 = 70, r1 = 70 * +m[2] / +m[1]; return S(260, 170, C(130, 85, R1, PALE) + C(130, 85, r1, '#fff') + D(130, 85) + L(130, 85, 130 + R1, 85, BLU, 2) + L(130, 85, 130 - r1 * 0.7, 85 - r1 * 0.7, RED, 2) + T(130 + R1 / 2 + r1 / 2, 78, m[1] + 'cm', BLU, 12) + T(130 - r1 * 0.35 - 8, 85 - r1 * 0.35, m[2] + 'cm', RED, 12, 'end')); }
    if ((m = q.match(/1辺 (\d+)cm の 正方形の 中に ぴったり 入る 円/))) return S(260, 175, P([[60, 15], [200, 15], [200, 155], [60, 155]], '#fbe9e6') + C(130, 85, 70, '#fff') + T(130, 172, m[1] + 'cm', RED, 12));
    if ((m = q.match(/半径 (\d+)cm、中心角 (\d+)° の おうぎ形/))) return F.c1e('半径 ' + m[1] + 'cm、中心角 ' + m[2] + '° の おうぎ形');
  };
  X.e6d = q => { let m;
    if ((m = q.match(/底面の 半径 (\d+)cm、体積 ([\d.]+)cm³ の 円柱の 高さ/))) return cyl(+m[1], +m[1] * 2, m[1] + 'cm', '?');
    if ((m = q.match(/縦 (\d+)cm・横 (\d+)cm の 長方形から 縦 (\d+)cm・横 (\d+)cm の 長方形を 切り取った 形\) で、高さ (\d+)cm の 角柱/))) { const b = +m[1], a = +m[2], d = +m[3], c = +m[4], sc = 110 / Math.max(a, b), W = a * sc, H = b * sc, w = c * sc, h = d * sc, x0 = 40, y0 = 165, dx = 70, dy = -45;
      const f = [[x0, y0], [x0 + W, y0], [x0 + W, y0 - H + h], [x0 + W - w, y0 - H + h], [x0 + W - w, y0 - H], [x0, y0 - H]], bk = f.map(p => [p[0] + dx, p[1] + dy]);
      return S(320, 190, P(bk, 'none', GRY, 1) + f.map((p, i) => L(p[0], p[1], bk[i][0], bk[i][1], i === 0 ? GRY : INK, i === 0 ? 1.2 : 1.8, i === 0)).join('') + P(f, PALE) + T(x0 + W / 2, y0 + 16, a + 'cm', RED, 12) + T(x0 - 6, y0 - H / 2, b + 'cm', RED, 12, 'end') + T(x0 + W + dx / 2 + 12, y0 + dy / 2 + 4, '高さ ' + m[5] + 'cm', RED, 12, 'start') + T(x0 + W / 2, y0 - H / 2 + 20, '底面', GRY, 12)); }
  };
  X.e6e = q => { const m = q.match(/長さ ([\d.]+)m の 棒の かげが ([\d.]+)m の とき、かげが ([\d.]+)m の 木/); if (!m) return;
    return S(320, 170, L(10, 150, 310, 150, GRY, 1.5) + L(40, 150, 40, 110, INK, 4) + L(40, 110, 90, 150, '#c9a26a', 1.2, 1) + L(40, 150, 90, 150, '#5a4a3a', 5) + T(34, 132, m[1] + 'm', RED, 12, 'end') + T(65, 166, m[2] + 'm', RED, 12) +
      L(160, 150, 160, 40, '#6a4a2a', 6) + C(160, 45, 22, '#bfe3b0', '#5a9a4a') + L(160, 40, 300, 150, '#c9a26a', 1.2, 1) + L(160, 150, 300, 150, '#5a4a3a', 5) + T(152, 100, '?', GRN, 16, 'end') + T(230, 166, m[3] + 'm', RED, 12)); };
  Object.keys(X).forEach(k => { const f0 = F[k]; F[k] = q => (f0 && f0(q)) || X[k](q); });
  function wrap(lad) { if (typeof lad === 'undefined' || !lad || !lad.U) return; lad.U.forEach(u => { const f = F[u.id]; if (!f || u._figWrapped) return; const g0 = u.gen; u._figWrapped = true;
    u.gen = function () { const r = g0.apply(this, arguments); if (r && !r.fig) { try { const s = f(r.q); if (s) r.fig = s; } catch (e) {} } return r; }; }); }
  if (typeof ELAD !== 'undefined') wrap(ELAD);
  if (typeof LADDER !== 'undefined') wrap(LADDER);
  window.LADDER_FIGS = F;
})();
