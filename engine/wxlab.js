/* engine/wxlab.js — 天気図 実技道場 (気象予報士の 実技試験に つながる 天気図の 読み方)
 *
 * 地図: data/wxmap-base.js (WXMAP: 東アジア 正距円筒)  ·  気圧場は ガウス型の 高気圧・低気圧の 重ね合わせで 自動生成
 * 等圧線 = マーチングスクエア (4hPaごと、20hPaごと 太線) · 風 = 地衡風を 摩擦で 低圧側へ 30度 傾けた 向き (北半球)
 * 画面: pageWxLab (#wlArea) — ホーム → ① 記号マスター ② 等圧線リーディング ③ 前線と天気 ④ 季節の 気圧配置 ⑤ 予報演習 ⑥ 実技 記述 ⑦ 天気図ラボ (自由研究)
 * 保存: State.v2.wxlab = { best: { mod: 点 }, plays: n }
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, WXMAP
 */
const WxLab = (function () {
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const S = 10;
  const X = lon => (lon - WXMAP.L0) * S * WXMAP.K;
  const Y = lat => (WXMAP.T0 - lat) * S;
  const CITY = {
    sapporo: ['札幌', 141.35, 43.06], sendai: ['仙台', 140.87, 38.27], niigata: ['新潟', 139.02, 37.9], tokyo: ['東京', 139.69, 35.69],
    kanazawa: ['金沢', 136.65, 36.56], nagoya: ['名古屋', 136.91, 35.18], osaka: ['大阪', 135.5, 34.69], hiroshima: ['広島', 132.46, 34.39],
    fukuoka: ['福岡', 130.4, 33.59], kagoshima: ['鹿児島', 130.56, 31.6], naha: ['那覇', 127.68, 26.21],
  };
  const cx = id => X(CITY[id][1]), cy = id => Y(CITY[id][2]);
  const DIR8 = ['北', '北東', '東', '南東', '南', '南西', '西', '北西'];
  const WXN = { kaisei: '快晴', hare: '晴れ', kumori: 'くもり', ame: '雨', yuki: '雪', kaminari: '雷', kiri: '霧' };

  // ---------- 気圧場 ----------
  // spec = { base, gx, gy, c: [{x, y, a, s}] }  P = base + gx*x + gy*y + Σ a·exp(-r²/2s²)
  function P(sp, x, y) { if (sp.f) return sp.f(x, y); let p = sp.base + (sp.gx || 0) * x + (sp.gy || 0) * y; sp.c.forEach(c => { const dx = x - c.x, dy = y - c.y; p += c.a * Math.exp(-(dx * dx + dy * dy) / (2 * c.s * c.s)); }); return p; }
  function grad(sp, x, y) { return [(P(sp, x + 1, y) - P(sp, x - 1, y)) / 2, (P(sp, x, y + 1) - P(sp, x, y - 1)) / 2]; }
  // 風 (吹いていく 向きの 単位ベクトル·強さ)  SVG 座標 (y 下向き)。北半球: 低圧部を 左に 見て 吹き、摩擦で 低圧側へ 約30度
  function wind(sp, x, y) {
    const [gx, gy] = grad(sp, x, y), m = Math.hypot(gx, gy) || 1e-9;
    const ux = gx / m, uy = gy / m;            // 高圧側を 向く
    const geo = [uy, -ux];                      // 画面座標 (y 下向き) で 低圧部を 左に 見る 向き
    const c = Math.cos(Math.PI / 6), s = Math.sin(Math.PI / 6);
    const vx = geo[0] * c - ux * s, vy = geo[1] * c - uy * s;
    return { vx: vx, vy: vy, m: m };
  }
  function fromDir8(w) { const ang = (Math.atan2(-w.vx, w.vy) * 180 / Math.PI + 360) % 360; return Math.round(ang / 45) % 8; } // 吹いてくる 方角
  // ---------- 等圧線 (マーチングスクエア) ----------
  function contours(sp, step) {
    const G = 6, nx = Math.ceil(WXMAP.W / G) + 1, ny = Math.ceil(WXMAP.H / G) + 1, v = [];
    let mn = 1e9, mx = -1e9;
    for (let j = 0; j < ny; j++) { v[j] = []; for (let i = 0; i < nx; i++) { const p = P(sp, i * G, j * G); v[j][i] = p; if (p < mn) mn = p; if (p > mx) mx = p; } }
    const out = [];
    for (let L = Math.ceil(mn / step) * step; L <= mx; L += step) {
      const segs = [];
      for (let j = 0; j < ny - 1; j++) for (let i = 0; i < nx - 1; i++) {
        const a = v[j][i], b = v[j][i + 1], c = v[j + 1][i + 1], d = v[j + 1][i];
        const k = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
        if (k === 0 || k === 15) continue;
        const x0 = i * G, y0 = j * G, t = (p, q) => (L - p) / (q - p);
        const T = [x0 + G * t(a, b), y0], R = [x0 + G, y0 + G * t(b, c)], B = [x0 + G * t(d, c), y0 + G], Lf = [x0, y0 + G * t(a, d)];
        const E = { 1: [[Lf, B]], 2: [[B, R]], 3: [[Lf, R]], 4: [[T, R]], 5: [[Lf, T], [B, R]], 6: [[T, B]], 7: [[Lf, T]], 8: [[Lf, T]], 9: [[T, B]], 10: [[T, R], [Lf, B]], 11: [[T, R]], 12: [[Lf, R]], 13: [[B, R]], 14: [[Lf, B]] }[k];
        E.forEach(e => segs.push(e));
      }
      chain(segs).forEach(pts => out.push({ L: L, pts: pts }));
    }
    return out;
  }
  function chain(segs) {
    const key = p => Math.round(p[0] * 10) + ',' + Math.round(p[1] * 10), adj = {};
    segs.forEach((s, i) => { [0, 1].forEach(e => { const k = key(s[e]); (adj[k] = adj[k] || []).push([i, e]); }); });
    const used = new Array(segs.length).fill(false), out = [];
    const walk = (pts, si, end) => { for (;;) { const k = key(segs[si][end]); const nx = (adj[k] || []).find(([j]) => !used[j]); if (!nx) return; used[nx[0]] = true; const e2 = 1 - nx[1]; pts.push(segs[nx[0]][e2]); si = nx[0]; end = e2; } };
    segs.forEach((s, i) => {
      if (used[i]) return; used[i] = true;
      const fw = [s[0], s[1]]; walk(fw, i, 1);
      const bw = [s[1], s[0]]; walk(bw, i, 0);
      out.push(bw.reverse().concat(fw.slice(2)));
    });
    return out.filter(p => p.length > 3);
  }
  function smooth(pts) {
    if (pts.length < 3) return 'M' + pts.map(p => p[0].toFixed(1) + ',' + p[1].toFixed(1)).join('L');
    let d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      d += 'C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ',' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ',' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
    }
    return d;
  }
  // ---------- 前線 ----------
  function frontSVG(f) {
    const pts = f.pts, col = { cold: '#2a5fd0', warm: '#d23a2a', stat: '#2a5fd0', occl: '#8a3ab8' }[f.t];
    let s = '<path d="' + smooth(pts) + '" fill="none" stroke="' + col + '" stroke-width="2.6" stroke-linecap="round"/>';
    if (f.t === 'stat') s = '<path d="' + smooth(pts) + '" fill="none" stroke="#d23a2a" stroke-width="2.6" stroke-dasharray="14 14"/><path d="' + smooth(pts) + '" fill="none" stroke="#2a5fd0" stroke-width="2.6" stroke-dasharray="14 14" stroke-dashoffset="14"/>';
    // 記号を 一定間隔で
    const seg = []; let tot = 0;
    for (let i = 0; i < pts.length - 1; i++) { const l = Math.hypot(pts[i + 1][0] - pts[i][0], pts[i + 1][1] - pts[i][1]); seg.push(l); tot += l; }
    const side = f.side || -1;
    let k = 0;
    for (let d = 10; d < tot - 6; d += 24, k++) {
      let acc = 0, i = 0; while (i < seg.length - 1 && acc + seg[i] < d) { acc += seg[i]; i++; }
      const t = (d - acc) / seg[i], ax = pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t, ay = pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t;
      const ux = (pts[i + 1][0] - pts[i][0]) / seg[i], uy = (pts[i + 1][1] - pts[i][1]) / seg[i];
      let typ = f.t === 'occl' ? (k % 2 ? 'warm' : 'cold') : f.t === 'stat' ? (k % 2 ? 'warm' : 'cold') : f.t;
      let sd = f.t === 'stat' ? (k % 2 ? -side : side) : side;
      const nx = -uy * sd, ny = ux * sd, c2 = typ === 'cold' ? (f.t === 'occl' ? '#8a3ab8' : '#2a5fd0') : (f.t === 'occl' ? '#8a3ab8' : '#d23a2a');
      if (typ === 'cold') s += '<path d="M' + (ax - ux * 5).toFixed(1) + ',' + (ay - uy * 5).toFixed(1) + 'L' + (ax + nx * 8).toFixed(1) + ',' + (ay + ny * 8).toFixed(1) + 'L' + (ax + ux * 5).toFixed(1) + ',' + (ay + uy * 5).toFixed(1) + 'Z" fill="' + c2 + '"/>';
      else { const r = 5, a0 = Math.atan2(uy, ux); const p1 = [ax - ux * r, ay - uy * r], p2 = [ax + ux * r, ay + uy * r]; s += '<path d="M' + p1[0].toFixed(1) + ',' + p1[1].toFixed(1) + 'A' + r + ',' + r + ' 0 0 ' + (sd < 0 ? 1 : 0) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1) + 'Z" fill="' + c2 + '"/>'; }
    }
    return s;
  }
  // 低気圧に ともなう 前線 (中心 x,y から)。stage: 0=発達中 (温暖·寒冷)、1=閉塞
  function cycloneFronts(x, y, stage, sc) {
    sc = sc || 1;
    const P0 = (dx, dy) => [x + dx * sc, y + dy * sc];
    if (stage === 1) {
      const tp = P0(22, 26);
      return [{ t: 'occl', pts: [P0(0, 0), P0(12, 10), tp], side: -1 },
        { t: 'warm', pts: [tp, P0(46, 32), P0(72, 44)], side: -1 },
        { t: 'cold', pts: [tp, P0(12, 52), P0(-6, 80), P0(-30, 104)], side: -1 }];
    }
    return [{ t: 'warm', pts: [P0(0, 0), P0(26, 10), P0(52, 22), P0(76, 36)], side: -1 },
      { t: 'cold', pts: [P0(0, 0), P0(-6, 26), P0(-20, 54), P0(-40, 80), P0(-62, 100)], side: -1 }];
  }
  // ---------- 天気記号 (日本式) ----------
  function wxSym(t, x, y, r) {
    r = r || 7; const c = '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" ';
    if (t === 'kaisei') return c + 'fill="#fff" stroke="#222" stroke-width="1.6"/>';
    if (t === 'hare') return c + 'fill="#fff" stroke="#222" stroke-width="1.6"/><line x1="' + x + '" y1="' + (y - r) + '" x2="' + x + '" y2="' + (y + r) + '" stroke="#222" stroke-width="1.6"/>';
    if (t === 'kumori') return c + 'fill="#fff" stroke="#222" stroke-width="1.6"/><circle cx="' + x + '" cy="' + y + '" r="' + (r * 0.55) + '" fill="none" stroke="#222" stroke-width="1.4"/>';
    if (t === 'ame') return c + 'fill="#222"/>';
    if (t === 'yuki') { let s = c + 'fill="#fff" stroke="#222" stroke-width="1.6"/>'; for (let i = 0; i < 3; i++) { const a = i * Math.PI / 3; s += '<line x1="' + (x - Math.cos(a) * r * 0.75).toFixed(1) + '" y1="' + (y - Math.sin(a) * r * 0.75).toFixed(1) + '" x2="' + (x + Math.cos(a) * r * 0.75).toFixed(1) + '" y2="' + (y + Math.sin(a) * r * 0.75).toFixed(1) + '" stroke="#222" stroke-width="1.3"/>'; } return s; }
    if (t === 'kaminari') return c + 'fill="#222"/><path d="M' + (x + 1) + ',' + (y - r + 1) + 'L' + (x - 3) + ',' + (y + 1) + 'L' + (x + 1) + ',' + (y + 1) + 'L' + (x - 2) + ',' + (y + r - 1) + '" fill="none" stroke="#f4c430" stroke-width="1.6"/>';
    if (t === 'kiri') return c + 'fill="#fff" stroke="#222" stroke-width="1.6"/><circle cx="' + x + '" cy="' + y + '" r="' + (r * 0.45) + '" fill="#222"/>';
    return '';
  }
  // 風向 (吹いてくる 方位 0〜7) と 風力 (矢羽根の 数)
  function windSym(x, y, d8, f, r) {
    r = r || 7; if (!f) return '';
    const a = d8 * Math.PI / 4, ux = Math.sin(a), uy = -Math.cos(a), L = r + 20;
    let s = '<line x1="' + (x + ux * r).toFixed(1) + '" y1="' + (y + uy * r).toFixed(1) + '" x2="' + (x + ux * L).toFixed(1) + '" y2="' + (y + uy * L).toFixed(1) + '" stroke="#222" stroke-width="1.6"/>';
    for (let i = 0; i < f; i++) {
      const side = i < 6 ? 1 : -1, k = i % 6, px = x + ux * (L - k * 3.2), py = y + uy * (L - k * 3.2);
      const nx = -uy * side, ny = ux * side;
      s += '<line x1="' + px.toFixed(1) + '" y1="' + py.toFixed(1) + '" x2="' + (px + nx * 7 + ux * 2).toFixed(1) + '" y2="' + (py + ny * 7 + uy * 2).toFixed(1) + '" stroke="#222" stroke-width="1.4"/>';
    }
    return s;
  }
  // ---------- 天気図 SVG ----------
  // m = { sp, fronts, centers: [{x,y,t:'H'|'L'|'T'}], stations: [{x,y,wx,d,f,name}], marks: [{x,y,label,star}], view: [x,y,w,h], noIso }
  function mapSVG(m, cls) {
    const v = m.view || [0, 0, WXMAP.W, WXMAP.H];
    let s = '<svg class="wl-map no-furi ' + (cls || '') + '" viewBox="' + v.join(' ') + '" role="img" aria-label="天気図"><rect x="' + v[0] + '" y="' + v[1] + '" width="' + v[2] + '" height="' + v[3] + '" fill="#dcebf4"/><path d="' + WXMAP.land + '" fill="#f2ead2" stroke="#9a9078" stroke-width="0.6"/>';
    // 緯線·経線
    for (let lat = 20; lat <= 55; lat += 10) s += '<line x1="0" x2="' + WXMAP.W + '" y1="' + Y(lat) + '" y2="' + Y(lat) + '" stroke="#9ab" stroke-width="0.4" stroke-dasharray="2 4"/>';
    for (let lon = 110; lon <= 160; lon += 10) s += '<line y1="0" y2="' + WXMAP.H + '" x1="' + X(lon) + '" x2="' + X(lon) + '" stroke="#9ab" stroke-width="0.4" stroke-dasharray="2 4"/>';
    if (m.sp2) {   // 等温線 (破線)。hl の 値は 太い 青線
      contours(m.sp2, m.step2 || 6).forEach(c => { const hl = c.L === m.hl2; s += '<path d="' + smooth(c.pts) + '" fill="none" stroke="' + (hl ? '#1f5fbf' : '#c8332b') + '" stroke-width="' + (hl ? 2.6 : 0.9) + '" stroke-dasharray="' + (hl ? '' : '4 3') + '"/>'; if (c.pts.length > 12) { const q = c.pts[Math.floor(c.pts.length * 0.3)]; if (q[0] > v[0] + 10 && q[0] < v[0] + v[2] - 10 && q[1] > v[1] + 10 && q[1] < v[1] + v[3] - 10) s += '<text x="' + q[0].toFixed(1) + '" y="' + (q[1] + 3).toFixed(1) + '" class="wl-iso t' + (hl ? ' hl' : '') + '">' + c.L + '℃</text>'; } });
    }
    if (m.sp && !m.noIso) {
      const st = m.step || 4, bE = m.bold || 20, lE = m.lab || 8;
      const cs = contours(m.sp, st), lab = [];
      cs.forEach(c => { const bold = c.L % bE === 0; s += '<path d="' + smooth(c.pts) + '" fill="none" stroke="#3a3a3a" stroke-width="' + (bold ? 1.6 : 0.8) + '"/>'; if (c.pts.length > 14) lab.push(c); });
      const cen = (m.centers || []);
      lab.forEach(c => { if (c.L % lE) return; const p = c.pts[Math.floor(c.pts.length * 0.5)]; if (cen.some(q => Math.hypot(q.x - p[0], q.y - p[1]) < 34)) return; if (p[0] < v[0] + 8 || p[0] > v[0] + v[2] - 8 || p[1] < v[1] + 8 || p[1] > v[1] + v[3] - 8) return; s += '<text x="' + p[0].toFixed(1) + '" y="' + (p[1] + 3).toFixed(1) + '" class="wl-iso">' + c.L + '</text>'; });
    }
    (m.fronts || []).forEach(f => { s += frontSVG(f); });
    (m.centers || []).forEach(c => {
      const p = m.sp ? Math.round(P(m.sp, c.x, c.y)) : '';
      if (c.t === 'H') s += '<text x="' + c.x + '" y="' + (c.y + 2) + '" class="wl-H">高</text><text x="' + c.x + '" y="' + (c.y + 16) + '" class="wl-cp">' + p + '</text>';
      else if (c.t === 'T') s += '<text x="' + c.x + '" y="' + (c.y + 2) + '" class="wl-T">台</text><text x="' + c.x + '" y="' + (c.y + 16) + '" class="wl-cp">' + p + '</text>';
      else s += '<text x="' + c.x + '" y="' + (c.y + 2) + '" class="wl-L">低</text><text x="' + c.x + '" y="' + (c.y + 16) + '" class="wl-cp">' + p + '</text>';
      s += '<line x1="' + (c.x - 3) + '" y1="' + (c.y - 14) + '" x2="' + (c.x + 3) + '" y2="' + (c.y - 8) + '" stroke="#222" stroke-width="1.2"/><line x1="' + (c.x + 3) + '" y1="' + (c.y - 14) + '" x2="' + (c.x - 3) + '" y2="' + (c.y - 8) + '" stroke="#222" stroke-width="1.2"/>';
    });
    (m.stations || []).forEach(st => { s += windSym(st.x, st.y, st.d, st.f) + wxSym(st.wx, st.x, st.y); if (st.name) s += '<text x="' + (st.x + 9) + '" y="' + (st.y + 14) + '" class="wl-st">' + esc(st.name) + '</text>'; });
    (m.troughs || []).forEach(t => { s += '<path d="' + smooth(t.pts) + '" fill="none" stroke="#8a3ab8" stroke-width="2.4" stroke-dasharray="8 5"/><text x="' + t.pts[0][0] + '" y="' + (t.pts[0][1] - 5) + '" class="wl-tr">' + (t.ridge ? 'リッジ' : 'トラフ') + '</text>'; });
    (m.dots || []).forEach(d => { s += '<circle cx="' + d.x + '" cy="' + d.y + '" r="3.2" fill="#222"/><text x="' + (d.x + 5) + '" y="' + (d.y - 4) + '" class="wl-st">' + esc(d.name) + '</text>'; });
    (m.marks || []).forEach(k => {
      if (k.star) s += '<text x="' + k.x + '" y="' + (k.y + 6) + '" class="wl-star">★</text>';
      else s += '<circle cx="' + k.x + '" cy="' + k.y + '" r="9" fill="#fff" stroke="#c8332b" stroke-width="2"/><text x="' + k.x + '" y="' + (k.y + 4.5) + '" class="wl-mk">' + esc(k.label) + '</text>';
    });
    return s + '</svg>';
  }
  // ランダムな 気圧配置 (日本付近に 等圧線が ある ように)
  function randomField() {
    const c = [];
    const nh = 1 + Math.floor(Math.random() * 2), nl = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < nh; i++) c.push({ x: rnd(40, 450), y: rnd(60, 380), a: rnd(10, 22), s: rnd(55, 100), t: 'H' });
    for (let i = 0; i < nl; i++) c.push({ x: rnd(80, 420), y: rnd(80, 330), a: -rnd(14, 32), s: rnd(32, 60), t: 'L' });
    return { base: 1012, gx: 0, gy: 0, c: c };
  }
  const centersOf = sp => sp.c.filter(c => c.t).map(c => ({ x: Math.round(c.x), y: Math.round(c.y), t: c.t }));

  // ---------- 季節の 気圧配置 ----------
  function pattern(id) {
    const j = () => rnd(-8, 8);
    if (id === 'winter') { const sp = { base: 1010, c: [{ x: X(108) + j(), y: Y(46) + j(), a: 32, s: 120, t: 'H' }, { x: X(152) + j(), y: Y(46) + j(), a: -38, s: 70, t: 'L' }] }; return { sp: sp, centers: centersOf(sp), name: '西高東低 (冬型)' }; }
    if (id === 'summer') { const sp = { base: 1006, c: [{ x: X(152) + j(), y: Y(31) + j(), a: 16, s: 150, t: 'H' }, { x: X(114) + j(), y: Y(44) + j(), a: -10, s: 110, t: 'L' }] }; return { sp: sp, centers: centersOf(sp), name: '南高北低 (夏型)' }; }
    if (id === 'spring') { const lx = X(122) + j(), ly = Y(40) + j(); const sp = { base: 1010, c: [{ x: X(136) + j(), y: Y(34) + j(), a: 12, s: 55, t: 'H' }, { x: lx, y: ly, a: -14, s: 45, t: 'L' }, { x: X(160), y: Y(40), a: -6, s: 60 }] }; return { sp: sp, centers: centersOf(sp), fronts: cycloneFronts(lx, ly, 0, 1.1), name: '移動性高気圧 (春·秋)' }; }
    if (id === 'tsuyu') { const sp = { base: 1006, c: [{ x: X(146) + j(), y: Y(50) + j(), a: 12, s: 70, t: 'H' }, { x: X(150) + j(), y: Y(25) + j(), a: 12, s: 110, t: 'H' }, { x: X(128), y: Y(33), a: -5, s: 60 }] }; const fy = Y(32.5); return { sp: sp, centers: centersOf(sp), fronts: [{ t: 'stat', pts: [[X(114), fy + 18], [X(124), fy + 6], [X(134), fy], [X(144), fy - 4], [X(156), fy - 2]], side: -1 }], name: '梅雨 (停滞前線)' }; }
    if (id === 'typhoon') { const tx = X(131) + j(), ty = Y(28) + j(); const sp = { base: 1012, c: [{ x: X(156), y: Y(32), a: 10, s: 110, t: 'H' }, { x: tx, y: ty, a: -55, s: 16 }] }; return { sp: sp, centers: centersOf(sp).concat([{ x: Math.round(tx), y: Math.round(ty), t: 'T' }]), name: '台風' }; }
    if (id === 'nangan') { const lx = X(136) + j() / 2, ly = Y(31.5) + j() / 2; const sp = { base: 1016, c: [{ x: X(122), y: Y(44), a: 14, s: 80, t: 'H' }, { x: lx, y: ly, a: -16, s: 36, t: 'L' }] }; return { sp: sp, centers: centersOf(sp), fronts: cycloneFronts(lx, ly, 0, 0.8), name: '南岸低気圧' }; }
  }

  // ---------- 保存 ----------
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.wxlab || (State.v2.wxlab = {}); d.best = d.best || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }

  // ---------- 画面 ----------
  const MODS = [
    { id: 'sym', icon: '🔣', name: '記号マスター', sub: '天気記号・風・前線・高気圧と低気圧', lv: '入門' },
    { id: 'iso', icon: '〰️', name: '等圧線リーディング', sub: '気圧を 読む・風の 強さと 向き', lv: '基本' },
    { id: 'front', icon: '🌧️', name: '前線と 天気', sub: '雨の 降り方・前線が 通ると どうなる?', lv: '基本' },
    { id: 'season', icon: '🗾', name: '季節の 気圧配置', sub: '冬型・夏型・梅雨・台風・南岸低気圧', lv: '応用' },
    { id: 'fcst', icon: '📡', name: '予報演習', sub: '天気図の 動きから あすの 天気を 予報', lv: '応用' },
    { id: 'upper', icon: '🛰️', name: '高層天気図', sub: '500hPa の トラフ・寒気、850hPa の −6℃線', lv: '予報士' },
    { id: 'desc', icon: '📝', name: '実技 記述', sub: '予報士試験 ふうの 文を 完成させよう', lv: '予報士' },
  ];
  let run = null;
  function open() { showPage('pageWxLab'); home(); }
  function frame(h) { $('wlArea').innerHTML = h; const p = $('pageWxLab'); if (p) p.scrollTop = 0; }
  function home() {
    const d = data();
    let h = '<div class="wl-hero"><div><div class="wl-kicker">気象予報士への 第一歩</div><h1>天気図 実技道場</h1><p>天気図は 空の 「設計図」。記号と 等圧線を 読めれば、あすの 天気が 見えて くる。</p></div>' + heroMap() + '</div>';
    h += '<div class="wl-mods">';
    MODS.forEach(m => { const b = d.best[m.id]; h += '<button class="wl-mod" data-m="' + m.id + '"><span class="wl-mi">' + m.icon + '</span><b>' + m.name + '</b><small>' + m.sub + '</small><em class="lv-' + m.lv + '">' + m.lv + '</em>' + (b != null ? '<i>最高 ' + b + ' / 10</i>' : '') + '</button>'; });
    h += '<button class="wl-mod lab" data-m="lab"><span class="wl-mi">🧪</span><b>天気図ラボ</b><small>高気圧・低気圧を 置いて 等圧線と 風を 観察</small><em class="lv-自由">自由研究</em></button>';
    h += '</div><p class="wl-foot">地図: Natural Earth (パブリックドメイン)。天気図は 学習用に 自動で 作った もので、本物の 観測では ありません。</p>';
    frame(h);
    $('wlArea').querySelectorAll('.wl-mod').forEach(b => b.onclick = () => { sfx('click'); b.dataset.m === 'lab' ? lab() : start(b.dataset.m); });
  }
  function heroMap() { const p = pattern('spring'); return '<div class="wl-hero-map">' + mapSVG({ sp: p.sp, fronts: p.fronts, centers: p.centers, view: [180, 120, 260, 220] }) + '</div>'; }

  // ---------- 問題 生成 ----------
  // item = { q: html, map: html|null, opts: [html], ans: index, exp: html, wide: bool }
  function mk(q, map, opts, exp, wide) { const idx = shuffle(opts.map((x, i) => i)); return { q: q, map: map, opts: idx.map(i => opts[i]), ans: idx.indexOf(0), exp: exp, wide: wide }; }
  const symBox = (inner, w, h) => '<svg class="wl-sym" viewBox="0 0 ' + (w || 60) + ' ' + (h || 60) + '">' + inner + '</svg>';

  function genSym() {
    const t = pick(['wx', 'wx2', 'wind', 'front', 'front2', 'hl', 'iso']);
    const W = Object.keys(WXN);
    if (t === 'wx') { const a = pick(W), o = [a].concat(shuffle(W.filter(x => x !== a)).slice(0, 3)); return mk('この 天気記号は なに?', symBox(wxSym(a, 30, 30, 14)), o.map(x => WXN[x]), '<b>' + WXN[a] + '</b> の 記号。' + ({ kaisei: '雲が ほとんど ない (雲量 0〜1)。', hare: '雲量 2〜8。○に たて線。', kumori: '雲量 9〜10。二重の ○。', ame: '黒く ぬりつぶした ●。', yuki: '○の 中に 雪の 結晶の ような 線。', kaminari: '雷は ●に いなずま。', kiri: '霧は ○の 中に 小さな ●。' }[a])); }
    if (t === 'wx2') { const a = pick(W), o = [a].concat(shuffle(W.filter(x => x !== a)).slice(0, 3)); return mk('「' + WXN[a] + '」の 天気記号は どれ?', null, o.map(x => symBox(wxSym(x, 30, 30, 14))), '<b>' + WXN[a] + '</b> は ' + symBox(wxSym(a, 30, 30, 14), 60, 60).replace('class="wl-sym"', 'class="wl-sym in"') + ' 。'); }
    if (t === 'wind') {
      const d = Math.floor(Math.random() * 8), f = 1 + Math.floor(Math.random() * 6), w = pick(['hare', 'kumori', 'ame']);
      const ok = DIR8[d] + 'の 風 ・ 風力' + f;
      const o = [ok, DIR8[(d + 4) % 8] + 'の 風 ・ 風力' + f, DIR8[d] + 'の 風 ・ 風力' + (f === 6 ? 4 : f + 2), DIR8[(d + 2) % 8] + 'の 風 ・ 風力' + f];
      return mk('この 記号の 風向と 風力は? (上が 北)', symBox(windSym(40, 40, d, f, 10) + wxSym(w, 40, 40, 10), 80, 80), o, '線が のびて いる 方角が 風の <b>吹いて くる 方向</b>。矢羽根の 数が 風力。→ <b>' + ok + '</b>');
    }
    if (t === 'front' || t === 'front2') {
      const F = { cold: '寒冷前線', warm: '温暖前線', stat: '停滞前線', occl: '閉塞前線' }, k = Object.keys(F), a = pick(k);
      const ex = { cold: '青い 線に ▲。冷たい 空気が 暖かい 空気の 下に もぐりこむ。せまい 範囲に 強い 雨・雷。', warm: '赤い 線に 半円。暖かい 空気が 冷たい 空気の 上に はい上がる。広い 範囲に しとしと 雨。', stat: '赤と 青が 交互。暖かい 空気と 冷たい 空気の 勢いが 同じで ほとんど 動かない (梅雨前線・秋雨前線)。', occl: '紫色。寒冷前線が 温暖前線に 追いついた もの。低気圧が 最も 発達した ころ。' }[a];
      const ln = x => symBox(frontSVG({ t: x, pts: [[8, 36], [40, 30], [72, 34], [104, 28]], side: -1 }), 112, 56);
      if (t === 'front') return mk('この 前線の 名前は?', ln(a), [a].concat(shuffle(k.filter(x => x !== a))).map(x => F[x]), '<b>' + F[a] + '</b>: ' + ex);
      return mk('「' + F[a] + '」は どれ?', null, [a].concat(shuffle(k.filter(x => x !== a))).map(ln), '<b>' + F[a] + '</b>: ' + ex);
    }
    if (t === 'hl') {
      const Q = pick([
        ['北半球の 高気圧の まわりでは 風は どう 吹く?', '時計回りに 吹き出す', ['反時計回りに 吹きこむ', '時計回りに 吹きこむ', '反時計回りに 吹き出す'], '高気圧からは 空気が <b>時計回りに 吹き出す</b>。下降気流で 雲が できにくく 晴れ。'],
        ['北半球の 低気圧の まわりでは 風は どう 吹く?', '反時計回りに 吹きこむ', ['時計回りに 吹き出す', '時計回りに 吹きこむ', '反時計回りに 吹き出す'], '低気圧には 空気が <b>反時計回りに 吹きこむ</b>。上昇気流で 雲が できて 雨に なりやすい。'],
        ['高気圧の 中心付近の 空気の 動きは?', '下降気流', ['上昇気流', '水平に 回るだけ', '動かない'], '高気圧では <b>下降気流</b>。空気が 温まり 雲が 消えて 晴れる。'],
        ['低気圧の 中心付近の 空気の 動きは?', '上昇気流', ['下降気流', '水平に 回るだけ', '動かない'], '低気圧では <b>上昇気流</b>。空気が 冷えて 雲が でき、雨に なりやすい。'],
        ['南半球の 低気圧の まわりの 風は?', '時計回りに 吹きこむ', ['反時計回りに 吹きこむ', '時計回りに 吹き出す', '反時計回りに 吹き出す'], 'コリオリの力の 向きが 逆なので、南半球の 低気圧は <b>時計回り</b>。'],
        ['日本付近の 天気が 西から 東へ 移る おもな 理由は?', '上空の 偏西風', ['貿易風', '季節風', '海陸風'], '中緯度の 上空には <b>偏西風</b> が 吹き、低気圧や 高気圧を 西から 東へ 運ぶ。'],
      ]);
      return mk(Q[0], null, [Q[1]].concat(Q[2]), Q[3]);
    }
    const Q = pick([
      ['天気図の 等圧線は ふつう 何hPaごとに 引く?', '4hPa', ['2hPa', '5hPa', '10hPa'], '等圧線は <b>4hPaごと</b>。<b>20hPaごと</b>に 太い 線に する。'],
      ['太い 等圧線は 何hPaごと?', '20hPa', ['10hPa', '8hPa', '16hPa'], '1000hPa・1020hPa など <b>20hPaごと</b>に 太線。'],
      ['等圧線の 間隔が せまい ところは?', '風が 強い', ['風が 弱い', '雨が 多い', '気温が 高い'], '気圧の 差が 大きい ほど 空気を おす 力が 強い → <b>風が 強い</b>。'],
      ['1気圧は 約 何hPa?', '1013hPa', ['1000hPa', '1020hPa', '760hPa'], '標準の 大気圧は <b>1013hPa</b>。'],
      ['天気図で 高気圧・低気圧の 中心に 書く ×の 印の そばの 数字は?', '中心の 気圧', ['風速', '気温', '雨量'], '中心付近の 気圧 (hPa) を 書く。'],
    ]);
    return mk(Q[0], null, [Q[1]].concat(Q[2]), Q[3]);
  }

  function genIso() {
    for (let tries = 0; tries < 40; tries++) {
      const sp = randomField(), centers = centersOf(sp), t = pick(['read', 'read', 'strong', 'dir', 'dir', 'center']);
      const inMap = (x, y) => x > 30 && x < WXMAP.W - 30 && y > 30 && y < WXMAP.H - 30;
      if (t === 'read') {
        for (let k = 0; k < 60; k++) {
          const x = rnd(40, WXMAP.W - 40), y = rnd(40, WXMAP.H - 40), p = P(sp, x, y), L = Math.round(p / 4) * 4;
          if (Math.abs(p - L) > 0.5 || Math.abs(p - P(sp, x + 6, y)) < 0.3) continue;
          const o = [L, L + 4, L - 4, L + (Math.random() < 0.5 ? 8 : -8)];
          return mk('★の 地点の 気圧は 約 何hPa? (★は 等圧線の 上に ある)', mapSVG({ sp: sp, centers: centers, marks: [{ x: x, y: y, star: true }] }), o.map(v => v + 'hPa'), '★は <b>' + L + 'hPa</b> の 等圧線の 上。等圧線は 4hPaごとなので、となりの 線は ' + (L - 4) + ' と ' + (L + 4) + '。太い 線 (20hPaごと) から 数えると まちがえにくい。', true);
        }
      }
      if (t === 'strong') {
        const pts = [];
        for (let k = 0; k < 200 && pts.length < 4; k++) { const x = rnd(50, WXMAP.W - 50), y = rnd(50, WXMAP.H - 50), g = Math.hypot(...grad(sp, x, y)); if (pts.every(q => Math.hypot(q.x - x, q.y - y) > 70)) pts.push({ x: x, y: y, g: g }); }
        if (pts.length < 4) continue;
        const srt = pts.slice().sort((a, b) => b.g - a.g); if (srt[0].g < srt[1].g * 1.45 || srt[0].g < 0.05) continue;
        const L = ['A', 'B', 'C', 'D']; pts.forEach((p, i) => p.label = L[i]);
        const best = srt[0].label;
        return mk('A〜D の うち、風が いちばん 強いと 考えられる 地点は?', mapSVG({ sp: sp, centers: centers, marks: pts }), [best].concat(L.filter(x => x !== best)), '<b>' + best + '</b>。等圧線の 間隔が いちばん せまい (こみあって いる) ところほど 風が 強い。', true);
      }
      if (t === 'dir') {
        for (let k = 0; k < 80; k++) {
          const x = rnd(60, WXMAP.W - 60), y = rnd(60, WXMAP.H - 60), w = wind(sp, x, y);
          if (w.m < 0.06) continue;
          const ang = (Math.atan2(-w.vx, w.vy) * 180 / Math.PI + 360) % 360; if (Math.abs(ang / 45 - Math.round(ang / 45)) > 0.3) continue;
          const d = fromDir8(w);
          const o = [d, (d + 4) % 8, (d + 2) % 8, (d + 6) % 8];
          return mk('★の 地点では どの 方角から 風が 吹く?<br><small>ヒント: 北半球では 高い 方から 低い 方へ、低気圧には 反時計回りに 吹きこむ。等圧線を ななめに 横切る。</small>', mapSVG({ sp: sp, centers: centers, marks: [{ x: x, y: y, star: true }] }), o.map(i => DIR8[i] + 'の 風'), '<b>' + DIR8[d] + 'の 風</b>。地上の 風は 等圧線に そって 低気圧を 左に 見る 向きから、摩擦で 低い 方へ 少し (約30度) かたむいて 吹く。', true);
        }
      }
      if (t === 'center') {
        const L = centers.find(c => c.t === 'L'); if (!L || !inMap(L.x, L.y)) continue;
        const H = centers.find(c => c.t === 'H');
        const Q = pick([
          ['「低」の 中心付近の 天気は どう なりやすい?', 'くもりや 雨', ['よく 晴れる', '必ず 雪', '風が 止まる'], '低気圧の 中心付近は 上昇気流 → 雲が でき <b>くもりや 雨</b>。'],
          ['「低」の まわりで、等圧線が こみあって いる ところでは?', '風が 強い', ['風が 弱い', '気温が 下がる', '晴れる'], '等圧線が こみあう = 気圧の 差が 大きい → <b>風が 強い</b>。'],
        ].concat(H && inMap(H.x, H.y) ? [['「高」の 中心付近の 天気は どう なりやすい?', '晴れ', ['大雨', '雷雨', '雪'], '高気圧の 中心付近は 下降気流 → <b>晴れ</b>やすい。風は 弱い。']] : []));
        return mk(Q[0], mapSVG({ sp: sp, centers: centers }), [Q[1]].concat(Q[2]), Q[3], true);
      }
    }
    return genSym();
  }

  function cycloneMap(opts) {
    opts = opts || {};
    const lx = opts.x != null ? opts.x : rnd(X(120), X(136)), ly = opts.y != null ? opts.y : rnd(Y(44), Y(38));
    const sp = { base: 1012, c: [{ x: lx, y: ly, a: -rnd(18, 26), s: 55, t: 'L' }, { x: lx + 190, y: ly + 40, a: 12, s: 80, t: 'H' }, { x: lx - 160, y: ly + 10, a: 12, s: 70, t: 'H' }] };
    const fr = cycloneFronts(lx, ly, opts.stage || 0, opts.sc || 1.35);
    return { sp: sp, fronts: fr, centers: centersOf(sp), lx: lx, ly: ly };
  }
  function genFront() {
    const t = pick(['where', 'where', 'pass', 'pass', 'which', 'occl']);
    if (t === 'where') {
      const c = cycloneMap({ x: rnd(X(118), X(130)), y: rnd(Y(44), Y(40)) }), k = 1.35, x = c.lx, y = c.ly;
      const pts = {
        ahead: [x + 52 * k, y - 4 * k],          // 温暖前線の 前 (北東側)
        sector: [x + 26 * k, y + 46 * k],        // 暖域
        behind: [x - 36 * k, y + 46 * k],        // 寒冷前線の すぐ 後ろ
        high: [x + 190, y + 40],                 // 高気圧
      };
      const Q = pick([
        ['広い 範囲で しとしと 雨が 長く 降って いるのは?', 'ahead', '温暖前線の 前方 (進む 先) では、暖かい 空気が ゆっくり はい上がって 乱層雲が でき、<b>広い 範囲に 弱い 雨</b>が 長く 続く。'],
        ['にわか雨や 雷雨が 起きやすいのは?', 'behind', '寒冷前線の 付近では 冷たい 空気が 暖かい 空気を 急に おし上げ、積乱雲が できて <b>せまい 範囲に 強い 雨・雷</b>。'],
        ['気温が 高く、南よりの 風が 吹いて いるのは?', 'sector', '温暖前線と 寒冷前線に はさまれた <b>暖域</b>は 暖かく しめった 南風。'],
        ['よく 晴れて いると 考えられるのは?', 'high', '<b>高気圧</b>の 中は 下降気流で 晴れ。'],
      ]);
      const keys = shuffle(Object.keys(pts)), L = ['A', 'B', 'C', 'D'], marks = keys.map((k, i) => ({ x: pts[k][0], y: pts[k][1], label: L[i] }));
      const ans = L[keys.indexOf(Q[1])];
      return mk(Q[0], mapSVG({ sp: c.sp, fronts: c.fronts, centers: c.centers, marks: marks }), [ans].concat(L.filter(x => x !== ans)), '<b>' + ans + '</b>。' + Q[2], true);
    }
    if (t === 'pass') {
      const Q = pick([
        ['寒冷前線が 通過した あと、気温は どう なる?', '急に 下がる', ['急に 上がる', 'ほとんど 変わらない', '少しずつ 上がる'], '寒冷前線の 後ろは 冷たい 空気 → 気温が <b>急に 下がる</b>。'],
        ['寒冷前線が 通過すると 風向きは どう 変わる?', '南よりから 北よりへ', ['北よりから 南よりへ', '東よりから 西よりへ', '変わらない'], '暖域の 南よりの 風が、通過後は <b>北より (北西)</b> の 冷たい 風に 変わる。'],
        ['温暖前線が 通過した あと、気温は どう なる?', '上がる', ['下がる', '変わらない', '0度に なる'], '温暖前線の 後ろは 暖域 → 気温が <b>上がる</b>。雨も やむ ことが 多い。'],
        ['温暖前線が 近づくと 雲は どう 変わる?', '巻雲→高層雲→乱層雲と 低く 厚く なる', ['積乱雲が 急に 発達する', '雲が 消える', '霧だけが 出る'], '高い 空の <b>巻雲</b> から 始まり、<b>高層雲</b>、雨を 降らせる <b>乱層雲</b> へと だんだん 低く 厚く なる。'],
        ['寒冷前線で 発達する おもな 雲は?', '積乱雲', ['巻雲', '層雲', '高層雲'], '冷たい 空気が 暖かい 空気を 急に おし上げ、<b>積乱雲</b> が できる。'],
        ['前線を ともなう 低気圧は 日本付近で ふつう どの 方向へ 進む?', '東 (北東)', ['西', '南', '北西'], '偏西風に 流されて <b>東〜北東</b> へ 進む。1日で 約 1000km。'],
      ]);
      const c = cycloneMap({ x: X(130), y: Y(40) });
      return mk(Q[0], mapSVG({ sp: c.sp, fronts: c.fronts, centers: c.centers }), [Q[1]].concat(Q[2]), Q[3], true);
    }
    if (t === 'which') {
      const c = cycloneMap(); const k = pick(['cold', 'warm']);
      const F = { cold: '寒冷前線', warm: '温暖前線' };
      const f = c.fronts.find(z => z.t === k), mid = f.pts[Math.floor(f.pts.length / 2)];
      return mk('★を 通る 前線の 名前は?', mapSVG({ sp: c.sp, fronts: c.fronts, centers: c.centers, marks: [{ x: mid[0], y: mid[1] - 2, star: true }] }), [F[k], F[k === 'cold' ? 'warm' : 'cold'], '停滞前線', '閉塞前線'], '<b>' + F[k] + '</b>。' + (k === 'cold' ? '低気圧の 中心から 南西に のびる 青い ▲の 線。' : '低気圧の 中心から 東〜南東に のびる 赤い 半円の 線。'), true);
    }
    const c = cycloneMap({ stage: 1 });
    return mk('この 低気圧の 中心から のびる 紫色の 前線は? 低気圧は どの 段階?', mapSVG({ sp: c.sp, fronts: c.fronts, centers: c.centers }), ['閉塞前線 ・ もっとも 発達した ころ', '停滞前線 ・ できはじめ', '温暖前線 ・ 弱まって きた', '寒冷前線 ・ できはじめ'], '寒冷前線が 温暖前線に 追いつくと <b>閉塞前線</b>。低気圧は このころ もっとも 発達し、その後 しだいに 弱まる。', true);
  }

  function genSeason() {
    const ids = ['winter', 'summer', 'spring', 'tsuyu', 'typhoon', 'nangan'], id = pick(ids), p = pattern(id);
    const map = mapSVG({ sp: p.sp, fronts: p.fronts, centers: p.centers });
    const NM = { winter: '西高東低 (冬型)', summer: '南高北低 (夏型)', spring: '移動性高気圧 (春·秋)', tsuyu: '梅雨 (停滞前線)', typhoon: '台風', nangan: '南岸低気圧' };
    const t = pick(['name', 'name', 'detail']);
    if (t === 'name') return mk('この 天気図の 気圧配置は?', map, [NM[id]].concat(shuffle(ids.filter(x => x !== id)).slice(0, 3).map(x => NM[x])), '<b>' + NM[id] + '</b>。' + {
      winter: 'シベリア高気圧が 西に、発達した 低気圧が 東に。等圧線が <b>南北に たてじま</b>に なり、冷たい 北西の 季節風。',
      summer: '太平洋高気圧が 日本の 南東を おおう。等圧線の 間隔は 広く、むし暑い 晴れ。',
      spring: '高気圧と 低気圧が 交互に 西から 東へ。天気が <b>周期的に</b> 変わる。',
      tsuyu: 'オホーツク海高気圧と 太平洋高気圧の 間に <b>停滞前線 (梅雨前線)</b>。',
      typhoon: '小さく まるい 等圧線が こみあう。<b>熱帯低気圧</b> が 発達した もので、前線は ない。',
      nangan: '本州の 南岸を 低気圧が 東へ 進む。冬から 春には <b>太平洋側に 雪</b>を 降らせる ことが ある。',
    }[id]);
    const D = {
      winter: [['この 気圧配置の とき、日本海側の 天気は?', '雪', ['晴れて 乾燥', '快晴', '霧'], '北西の 季節風が 日本海で 水蒸気を 補給し、山に ぶつかって 雲が でき <b>日本海側は 雪</b>。'], ['この 気圧配置の とき、太平洋側の 天気は?', '晴れて 乾燥', ['大雪', '梅雨', '台風'], '山を こえた 風は 乾いて ふき下りる → <b>太平洋側は 晴れて 乾燥</b> (からっ風)。'], ['この 天気図で 日本付近に 吹く 風は?', '北西の 季節風', ['南東の 季節風', '南西の 風', 'ほぼ 無風'], '等圧線が 南北に こみあい、<b>強い 北西の 季節風</b>。']],
      summer: [['この 気圧配置で 夏に 多い 天気は?', 'むし暑い 晴れ、夕立', ['大雪', '冷たい 雨が 続く', '北西の 強風'], '太平洋高気圧に おおわれ <b>むし暑い 晴れ</b>。午後は 積乱雲が 発達し <b>夕立</b>。'], ['夏に 日本付近に 吹く 季節風は?', '南東の 季節風', ['北西の 季節風', '北東の 風', '偏東風だけ'], '海から 陸へ <b>南東の 季節風</b>。']],
      spring: [['この 気圧配置の ころの 天気の 特徴は?', '晴れと 雨が 周期的に 変わる', ['毎日 雪', '晴れが 1か月 続く', 'ずっと 雨'], '移動性高気圧と 低気圧が 交互に 通り、<b>天気が 3〜4日 ごとに 変わる</b>。'], ['この 低気圧が 1日 たつと だいたい どこへ 動く?', '東へ 約1000km', ['西へ 約1000km', '南へ 約100km', '動かない'], '偏西風で <b>東へ 約1000km/日</b>。']],
      tsuyu: [['この 前線の 名前は?', '梅雨前線 (停滞前線)', ['寒冷前線', '温暖前線', '閉塞前線'], '<b>停滞前線</b>。初夏は 梅雨前線、秋は 秋雨前線と よばれる。'], ['前線の 北側に ある 冷たく しめった 高気圧は?', 'オホーツク海高気圧', ['太平洋高気圧', 'シベリア高気圧', 'チベット高気圧'], '北の <b>オホーツク海高気圧</b> と 南の 太平洋高気圧が おしあう。']],
      typhoon: [['台風の 進行方向に 向かって 風が より 強いのは?', '右側', ['左側', '後ろ側', 'どちらも 同じ'], '台風の 風と 台風を 動かす 風が 重なる <b>右側</b>が 危険半円。'], ['台風の 中心付近で 風が 弱く 晴れ間も 見える ところを 何と いう?', '台風の 目', ['眼の壁', '暖域', '前線'], '中心の <b>台風の 目</b> は 下降気流で 雲が 少ない。']],
      nangan: [['南岸低気圧が 通る とき、東京で 雪に なりやすい 条件は?', '北から 冷たい 空気が 流れこむ', ['南風が 強い', '気温が 20度 以上', '高気圧が 南に ある'], '低気圧の 北側に <b>冷たい 空気</b> が あると、雨ではなく 雪に。予報が とても むずかしい。'], ['この 低気圧は どの 方向へ 進む ことが 多い?', '本州の 南岸を 東〜北東へ', ['日本海を 北西へ', '西へ もどる', '南へ'], '<b>本州の 南岸に そって 東〜北東</b> へ。']],
    }[id];
    const Q = pick(D);
    return mk(Q[0], map, [Q[1]].concat(Q[2]), Q[3]);
  }

  function genFcst() {
    // 今日 → あす: 低気圧は 東北東へ 約 10〜12度 進む
    for (let tries = 0; tries < 30; tries++) {
      const x0 = rnd(X(114), X(124)), y0 = rnd(Y(42), Y(37));
      const dx = rnd(105, 125), dy = -rnd(10, 25);
      const a = -rnd(18, 24);
      const mkSp = (x, y) => ({ base: 1012, c: [{ x: x, y: y, a: a, s: 55, t: 'L' }, { x: x + 190, y: y + 40, a: 12, s: 80, t: 'H' }, { x: x - 160, y: y + 10, a: 12, s: 70, t: 'H' }] });
      const sp0 = mkSp(x0, y0), sp1 = mkSp(x0 + dx, y0 + dy);
      const SC = 1.35, f0 = cycloneFronts(x0, y0, 0, SC), f1 = cycloneFronts(x0 + dx, y0 + dy, 0, SC);
      // あすの 都市の 位置関係で 天気を きめる
      const cls = id => {
        const x = cx(id), y = cy(id), lx = x0 + dx, ly = y0 + dy, rx = (x - lx) / SC, ry = (y - ly) / SC;
        if (Math.hypot(rx, ry) < 18) return 'ame';
        const warmY = ry - rx * 0.45;           // 温暖前線より 北なら 負
        const coldX = rx + ry * 0.62;            // 寒冷前線より 西なら 負
        if (rx > -4 && rx < 95 && warmY < -4 && warmY > -55) return 'ame';      // 温暖前線の 前方
        if (ry > 0 && coldX > 6 && warmY > 4 && rx < 90) return 'kumori';    // 暖域
        if (ry > 0 && coldX < -2 && coldX > -24) return 'ame';                // 寒冷前線の すぐ 後ろ
        if (ry > -10 && coldX < -40) return 'hare';                          // 寒冷前線が 通過して 高気圧へ
        return null;
      };
      const ids = shuffle(['fukuoka', 'osaka', 'tokyo', 'sendai', 'sapporo', 'niigata', 'kagoshima']);
      const id = ids.find(i => cls(i)); if (!id) continue;
      const w = cls(id);
      const today = mapSVG({ sp: sp0, fronts: f0, centers: centersOf(sp0), view: [0, 30, WXMAP.W, 380] });
      const tom = mapSVG({ sp: sp1, fronts: f1, centers: centersOf(sp1), marks: [{ x: cx(id), y: cy(id), star: true }], view: [0, 30, WXMAP.W, 380] });
      const map = '<div class="wl-two"><figure>' + today + '<figcaption>きょう 9時</figcaption></figure><figure>' + tom + '<figcaption>あす 9時 (予想図) ★=' + esc(CITY[id][0]) + '</figcaption></figure></div>';
      const NM = { ame: '雨', kumori: 'くもり (南風で 暖かい)', hare: '晴れ (北西の 風で 気温が 下がる)' };
      const why = { ame: '★は あす、前線の 雨の 範囲 (温暖前線の 前方 か 寒冷前線の すぐ 後ろ・低気圧の 中心付近) に 入る。', kumori: '★は あす、温暖前線と 寒冷前線に はさまれた <b>暖域</b>。南よりの 風で 暖かく、雲が 多い。', hare: '★は あす、寒冷前線が 通りすぎて 西から 高気圧が 近づく。<b>北西の 風</b> に 変わり 晴れる。' }[w];
      return mk('きょうの 天気図と あすの 予想図を くらべて、<b>' + esc(CITY[id][0]) + '</b> の あすの 天気を 予報しよう。', map, [NM[w]].concat(Object.keys(NM).filter(k => k !== w).map(k => NM[k])).concat(['雪 (強い 寒気)']), '<b>' + NM[w] + '</b>。' + why + '<br>低気圧は 偏西風に のって 1日に 約 1000km 東北東へ 進む。', true);
    }
    return genFront();
  }

  // ---------- 実技 記述 (空欄を 順に うめる) ----------
  const DESC = [
    { t: '寒冷前線の 通過', s: '〔寒冷前線〕の 通過に ともない、気温が 〔下がり〕、風向が 〔南〕よりから 〔北西〕よりに 変わる。', o: [['寒冷前線', '温暖前線', '停滞前線'], ['下がり', '上がり', '変わらず'], ['南', '北', '西'], ['北西', '南東', '南西']] },
    { t: '温暖前線の 通過', s: '〔温暖前線〕が 通過すると 雨が 〔やみ〕、気温が 〔上がる〕。風向は 東よりから 〔南〕よりに 変わる。', o: [['温暖前線', '寒冷前線', '閉塞前線'], ['やみ', '強まり', '雪に 変わり'], ['上がる', '下がる', '0度に なる'], ['南', '北', '北西']] },
    { t: '冬型の 気圧配置', s: '〔西高東低〕の 気圧配置で 等圧線が 〔南北〕に のび、〔北西〕の 季節風が 強い。〔日本海〕側では 雪、太平洋側では 晴れて 乾燥する。', o: [['西高東低', '南高北低', '北高南低'], ['南北', '東西', 'うずまき状'], ['北西', '南東', '南西'], ['日本海', '太平洋', 'オホーツク海']] },
    { t: '梅雨前線', s: '北の 〔オホーツク海〕高気圧と 南の 〔太平洋〕高気圧の 間に 〔停滞〕前線が のび、前線付近で 雨が 続く。', o: [['オホーツク海', 'シベリア', 'チベット'], ['太平洋', '移動性', 'オホーツク海'], ['停滞', '寒冷', '温暖']] },
    { t: '台風の 風', s: '台風の 中心に 向かって 風が 〔反時計〕回りに 吹きこむ。進行方向の 〔右〕側は 風が 特に 強い 危険半円で ある。', o: [['反時計', '時計'], ['右', '左', '後ろ']] },
    { t: '850hPa 気温と 雪', s: '上空 約1500m (〔850〕hPa) の 気温が 〔−6〕℃ 以下だと、地上で 雪に なる めやすと される。', o: [['850', '500', '300'], ['−6', '+6', '−30']] },
    { t: '500hPa の 寒気', s: '上空 約5500m (〔500〕hPa) に 〔−30〕℃ 以下の 強い 寒気が 入ると、大気の 状態が 〔不安定〕に なり、大雪や 雷の おそれが ある。', o: [['500', '850', '1000'], ['−30', '−6', '0'], ['不安定', '安定', '乾燥']] },
    { t: '湿数', s: '気温と 露点温度の 差を 〔湿数〕と いい、〔3〕℃ 以下の 領域は 湿って いて 雲が 多い。', o: [['湿数', '気温減率', '温度風'], ['3', '10', '30']] },
    { t: 'トラフ', s: '上空の 偏西風の 谷 (〔トラフ〕) の 〔東〕側では 上昇気流が 起きやすく、地上の 低気圧が 発達しやすい。', o: [['トラフ', 'リッジ', 'ジェット'], ['東', '西', '真下']] },
    { t: 'フェーン現象', s: '湿った 風が 山を こえて 〔風下〕側に ふき下りると、気温が 〔上がり〕、空気が 〔乾燥〕する。これを フェーン現象と いう。', o: [['風下', '風上', '山頂'], ['上がり', '下がり', '変わらず'], ['乾燥', '湿潤', '凍結']] },
    { t: '海陸風', s: '晴れた 日の 昼は 陸が 早く 温まるので 〔海〕から 陸へ 海風が 吹き、夜は 〔陸〕から 海へ 陸風が 吹く。', o: [['海', '陸', '山'], ['陸', '海', '空']] },
    { t: '放射冷却', s: '風が 弱く 〔晴れた〕 夜は 地面の 熱が 宇宙へ にげる 〔放射冷却〕で 朝の 気温が 下がり、〔霜〕や 霧が 発生しやすい。', o: [['晴れた', 'くもった', '雨の'], ['放射冷却', 'フェーン現象', '逆転層の 消滅'], ['霜', '雹', '雷']] },
    { t: '低気圧の 発達', s: '低気圧は 〔寒冷〕前線が 温暖前線に 追いついて 〔閉塞〕前線が できる ころ もっとも 発達し、中心気圧は 〔低く〕 なる。', o: [['寒冷', '温暖', '停滞'], ['閉塞', '停滞', '寒冷'], ['低く', '高く']] },
    { t: '等圧線と 風', s: '等圧線の 間隔が 〔せまい〕 ほど 気圧傾度力が 大きく、風が 〔強い〕。地上では 摩擦の ため 等圧線を ななめに 横切り 〔低気圧〕側へ 吹きこむ。', o: [['せまい', '広い'], ['強い', '弱い'], ['低気圧', '高気圧']] },
  ];
  function genDesc() {
    const d = pick(DESC), blanks = d.s.match(/〔[^〕]+〕/g).map(x => x.slice(1, -1));
    return { desc: true, title: d.t, s: d.s, blanks: blanks, opts: d.o.map(o => shuffle(o)), step: 0, miss: 0 };
  }

  // ---------- 高層天気図 ----------
  // 500hPa 高度 Z = 南ほど 高い 基本場 + 偏西風の 波 (トラフ・リッジ)。トラフ = 波の 谷 (高度が 低い 側へ 張り出す)
  function upperField() {
    const lam = rnd(230, 290), ph = rnd(0, lam), A = rnd(80, 120), yc = rnd(170, 230);
    const env = y => Math.exp(-Math.pow((y - yc) / 170, 2));
    const Z = (x, y) => 5300 + y / 450 * 600 + A * Math.sin(2 * Math.PI * (x - ph) / lam) * env(y);
    const T5 = (x, y) => -46 + y / 450 * 38 + 7 * Math.sin(2 * Math.PI * (x - ph - lam * 0.05) / lam) * env(y);
    const T8 = (x, y) => -22 + y / 450 * 40 + 6 * Math.sin(2 * Math.PI * (x - ph - lam * 0.05) / lam) * env(y);
    const axes = (off) => { const r = []; for (let k = -1; k < 4; k++) { const xa = ph + lam * off + k * lam; if (xa > 20 && xa < WXMAP.W - 20) r.push(xa); } return r; };
    return { Z: Z, T5: T5, T8: T8, tr: axes(0.75), rd: axes(0.25), yc: yc, lam: lam };
  }
  const axisPts = (xa, yc) => [[xa + 18, yc - 120], [xa + 6, yc - 50], [xa, yc], [xa + 6, yc + 50], [xa + 18, yc + 110]];
  function genUpper() {
    const t = pick(['trough', 'east', 'cold', 'snow']);
    for (let tries = 0; tries < 120; tries++) {
      const u = upperField();
      const z500 = { f: u.Z }, t500 = { f: u.T5 }, t850 = { f: u.T8 };
      if (t === 'trough') {
        const xt = u.tr.find(x => x > 80 && x < WXMAP.W - 80), xr = u.rd.find(x => x > 60 && x < WXMAP.W - 60); if (xt == null || xr == null) continue;
        const cand = [{ x: xt, y: u.yc, k: 't' }, { x: xr, y: u.yc, k: 'r' }, { x: (xt + xr) / 2, y: u.yc - 80, k: 'o' }, { x: (xt + xr) / 2, y: u.yc + 90, k: 'o' }];
        if (cand.some(c => c.y < 30 || c.y > WXMAP.H - 30 || c.x < 30 || c.x > WXMAP.W - 30)) continue;
        const L = ['A', 'B', 'C', 'D'], sh = shuffle(cand); sh.forEach((c, i) => c.label = L[i]);
        const ans = sh.find(c => c.k === 't').label;
        return mk('500hPa 天気図。等高度線 (60mごと) が 南へ 大きく たれさがった 「<b>トラフ (気圧の 谷)</b>」は A〜D の どこ?', mapSVG({ sp: z500, step: 60, bold: 300, lab: 120, marks: sh }), [ans].concat(L.filter(x => x !== ans)), '<b>' + ans + '</b>。等高度線が <b>南 (高度の 高い 側) へ U字に 張り出す</b> ところが トラフ。北へ もり上がる ところは <b>リッジ (気圧の 尾根)</b>。', true);
      }
      if (t === 'east') {
        const tr = u.tr.filter(x => x > 60 && x < WXMAP.W - 60).map(x => ({ pts: axisPts(x, u.yc) }));
        if (!tr.length) continue;
        return mk('500hPa の トラフ (紫の 破線) に 対して、地上の 低気圧が 発達しやすいのは どちら側?', mapSVG({ sp: z500, step: 60, bold: 300, lab: 120, troughs: tr }), ['トラフの 東側 (前面)', 'トラフの 西側 (後面)', 'トラフの 真下だけ', 'リッジの 西側'], '<b>トラフの 東側 (前面)</b> では 上空で 空気が 発散し 上昇気流が 強まる。地上の 低気圧は トラフの 前面で 発達しやすい。', true);
      }
      if (t === 'cold') {
        const pts = [];
        for (let k = 0; k < 300 && pts.length < 4; k++) { const x = rnd(50, WXMAP.W - 50), y = rnd(50, WXMAP.H - 50); if (pts.every(q => Math.hypot(q.x - x, q.y - y) > 70)) pts.push({ x: x, y: y, T: u.T5(x, y) }); }
        if (pts.length < 4) continue;
        const cold = pts.filter(q => q.T <= -31), warm = pts.filter(q => q.T >= -27);
        if (cold.length !== 1 || warm.length !== 3) continue;
        const L = ['A', 'B', 'C', 'D']; pts.forEach((q, i) => q.label = L[i]);
        const ans = cold[0].label;
        return mk('500hPa の 等温線 (赤い 破線、太い 青線が −30℃)。<b>−30℃ 以下の 強い 寒気</b> が 入って いるのは?', mapSVG({ sp: z500, step: 60, bold: 300, lab: 300, sp2: t500, step2: 3, hl2: -30, marks: pts }), [ans].concat(L.filter(x => x !== ans)), '<b>' + ans + '</b>。上空 約5500mが −30℃ 以下だと 地上との 温度差が 大きく <b>大気が 不安定</b> に → 冬は 大雪、夏は 雷雨の おそれ。', true);
      }
      if (t === 'snow') {
        const ids = shuffle(['sapporo', 'sendai', 'niigata', 'kanazawa', 'tokyo', 'osaka', 'hiroshima', 'fukuoka', 'kagoshima']);
        const sn = ids.filter(i => u.T8(cx(i), cy(i)) <= -8), wm = ids.filter(i => u.T8(cx(i), cy(i)) >= -2);
        if (!sn.length || wm.length < 3) continue;
        const ch = [sn[0]].concat(wm.slice(0, 3)), ans = CITY[sn[0]][0];
        return mk('850hPa (上空 約1500m) の 等温線。<b>太い 青線が −6℃</b>。地上で <b>雪</b> に なる 可能性が いちばん 高い 都市は?', mapSVG({ sp: { f: u.Z }, noIso: true, sp2: t850, step2: 3, hl2: -6, dots: ch.map(i => ({ x: cx(i), y: cy(i), name: CITY[i][0] })) }), [ans].concat(wm.slice(0, 3).map(i => CITY[i][0])), '<b>' + ans + '</b>。850hPa で <b>−6℃ 以下</b> (太い 青線より 北側) は、地上で 雨ではなく 雪に なる めやす。', true);
      }
    }
    return genDesc();
  }

  const GEN = { sym: genSym, iso: genIso, front: genFront, season: genSeason, fcst: genFcst, upper: genUpper, desc: genDesc };
  function start(mod) { const items = []; for (let i = 0; i < 10; i++) items.push(GEN[mod]()); run = { mod: mod, items: items, i: 0, ok: 0 }; ask(); }
  function head() { const m = MODS.find(x => x.id === run.mod); return '<div class="wl-top"><button class="wl-back" id="wlQuit">✕ やめる</button><b>' + m.icon + ' ' + m.name + '</b><span>' + (run.i + 1) + ' / ' + run.items.length + '</span></div><div class="wl-bar"><i style="width:' + Math.round(run.i / run.items.length * 100) + '%"></i></div>'; }
  function ask() {
    const it = run.items[run.i]; if (!it) return result();
    if (it.desc) return askDesc(it);
    let h = head() + '<div class="wl-card"><div class="wl-q">' + it.q + '</div>' + (it.map ? '<div class="wl-mapbox' + (it.wide ? ' wide' : '') + '">' + it.map + '</div>' : '');
    h += '<div class="wl-opts">'; it.opts.forEach((o, j) => { h += '<button class="wl-opt" data-j="' + j + '">' + o + '</button>'; }); h += '</div><div id="wlFb"></div></div>';
    frame(h);
    $('wlQuit').onclick = () => { sfx('click'); home(); };
    $('wlArea').querySelectorAll('.wl-opt').forEach(b => b.onclick = () => answer(+b.dataset.j));
  }
  function answer(j) {
    const it = run.items[run.i]; if (it.done) return; it.done = true;
    const ok = j === it.ans; if (ok) run.ok++;
    $('wlArea').querySelectorAll('.wl-opt').forEach((b, x) => { b.disabled = true; if (x === it.ans) b.classList.add('ok'); else if (x === j) b.classList.add('ng'); });
    sfx(ok ? 'correct' : 'wrong');
    fb(ok, it.exp);
  }
  function fb(ok, exp) {
    $('wlFb').innerHTML = '<div class="wl-fb ' + (ok ? 'ok' : 'ng') + '"><b>' + (ok ? '⭕ 正解!' : '❌ ざんねん') + '</b><div>' + exp + '</div><button class="wl-next" id="wlNext">' + (run.i + 1 < run.items.length ? '次へ →' : '結果を 見る') + '</button></div>';
    $('wlNext').onclick = () => { sfx('click'); run.i++; ask(); };
    const n = $('wlNext'); if (n.scrollIntoView) n.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function askDesc(it) {
    const parts = it.s.split(/〔[^〕]+〕/);
    let sent = '';
    parts.forEach((p, k) => { sent += esc(p); if (k < it.blanks.length) sent += k < it.step ? '<span class="wl-fill ok">' + esc(it.blanks[k]) + '</span>' : k === it.step ? '<span class="wl-fill cur">？</span>' : '<span class="wl-fill">　　</span>'; });
    let h = head() + '<div class="wl-card"><div class="wl-q">📝 <b>' + esc(it.title) + '</b> — 空らんに 入る ことばを 順に えらんで 文を 完成させよう。</div><div class="wl-desc">' + sent + '</div>';
    if (it.step < it.blanks.length) { h += '<div class="wl-opts">'; it.opts[it.step].forEach(o => { h += '<button class="wl-opt" data-v="' + esc(o) + '">' + esc(o) + '</button>'; }); h += '</div>'; }
    h += '<div id="wlFb"></div></div>';
    frame(h);
    $('wlQuit').onclick = () => { sfx('click'); home(); };
    $('wlArea').querySelectorAll('.wl-opt').forEach(b => b.onclick = () => {
      if (b.dataset.v === it.blanks[it.step]) { sfx('click'); it.step++; if (it.step >= it.blanks.length) { const ok = it.miss === 0; if (ok) run.ok++; sfx(ok ? 'correct' : 'wrong'); askDesc(it); fb(ok, ok ? '完ぺきな 解答文! 予報士試験の 記述でも この 言い方が 使える。' : 'まちがえた 空らんが ' + it.miss + 'こ あった。完成した 文を もう一度 読んで おこう。'); } else askDesc(it); }
      else { it.miss++; b.disabled = true; b.classList.add('ng'); sfx('wrong'); }
    });
  }
  function result() {
    const d = data(), n = run.items.length;
    d.best[run.mod] = Math.max(d.best[run.mod] || 0, run.ok); d.plays = (d.plays || 0) + 1; save();
    const m = MODS.find(x => x.id === run.mod);
    const msg = run.ok === n ? '💮 完ぺき! 予報士の たまご 認定!' : run.ok >= 8 ? '🌤 すばらしい! 天気図が 読めて きた。' : run.ok >= 5 ? '⛅ いい 調子。解説を 読んで もう一度!' : '🌧 ここから レベルアップ!';
    frame('<div class="wl-top"><b>' + m.icon + ' ' + m.name + '</b></div><div class="wl-card wl-res"><div class="wl-score"><b>' + run.ok + '</b><span>/ ' + n + '</span></div><p>' + msg + '</p><div class="wl-rbtns"><button class="wl-go" id="wlAgain">もう一度</button><button class="wl-back2" id="wlHome">メニューへ</button></div></div>');
    $('wlAgain').onclick = () => { sfx('click'); start(run.mod); };
    $('wlHome').onclick = () => { sfx('click'); home(); };
  }

  // ---------- 天気図ラボ (自由研究) ----------
  let labSp = null, labTool = 'H';
  function lab() {
    if (!labSp) labSp = { base: 1012, c: [{ x: X(115), y: Y(44), a: 18, s: 80, t: 'H' }, { x: X(140), y: Y(40), a: -20, s: 45, t: 'L' }] };
    let h = '<div class="wl-top"><button class="wl-back" id="wlQuit">← もどる</button><b>🧪 天気図ラボ</b></div>';
    h += '<div class="wl-card"><p class="wl-q">地図を タップして 高気圧・低気圧を 置いて みよう。等圧線と 風 (矢印) が どう 変わるかな? 等圧線が こむと 矢印が 長く (風が 強く) なるよ。</p>';
    h += '<div class="wl-tools"><button data-t="H" class="' + (labTool === 'H' ? 'on' : '') + '">🔵 高気圧を 置く</button><button data-t="L" class="' + (labTool === 'L' ? 'on' : '') + '">🔴 低気圧を 置く</button><button data-t="X" class="' + (labTool === 'X' ? 'on' : '') + '">✕ 消す</button><button id="wlReset">リセット</button></div>';
    h += '<div class="wl-mapbox wide" id="wlLabMap"></div><div class="wl-labinfo" id="wlInfo">地図の 上で 指を 動かすと、その 場所の 気圧と 風が わかるよ。</div></div>';
    frame(h);
    $('wlQuit').onclick = () => { sfx('click'); home(); };
    $('wlArea').querySelectorAll('.wl-tools [data-t]').forEach(b => b.onclick = () => { labTool = b.dataset.t; $('wlArea').querySelectorAll('.wl-tools [data-t]').forEach(x => x.classList.toggle('on', x === b)); });
    $('wlReset').onclick = () => { labSp = null; lab(); };
    drawLab();
  }
  function drawLab() {
    const box = $('wlLabMap'); if (!box) return;
    let arrows = '';
    for (let y = 30; y < WXMAP.H; y += 40) for (let x = 30; x < WXMAP.W; x += 40) {
      const w = wind(labSp, x, y), L = Math.min(26, 6 + w.m * 60);
      if (w.m < 0.01) continue;
      const ex = x + w.vx * L, ey = y + w.vy * L, a = Math.atan2(w.vy, w.vx);
      arrows += '<line x1="' + x + '" y1="' + y + '" x2="' + ex.toFixed(1) + '" y2="' + ey.toFixed(1) + '" stroke="#1c6ea4" stroke-width="1.6"/><path d="M' + ex.toFixed(1) + ',' + ey.toFixed(1) + 'L' + (ex - 6 * Math.cos(a - 0.45)).toFixed(1) + ',' + (ey - 6 * Math.sin(a - 0.45)).toFixed(1) + 'L' + (ex - 6 * Math.cos(a + 0.45)).toFixed(1) + ',' + (ey - 6 * Math.sin(a + 0.45)).toFixed(1) + 'Z" fill="#1c6ea4"/>';
    }
    box.innerHTML = mapSVG({ sp: labSp, centers: centersOf(labSp) }).replace('</svg>', arrows + '</svg>');
    const svg = box.querySelector('svg');
    const toMap = ev => { const r = svg.getBoundingClientRect(), t = ev.touches ? ev.touches[0] : ev; return [(t.clientX - r.left) / r.width * WXMAP.W, (t.clientY - r.top) / r.height * WXMAP.H]; };
    svg.onclick = ev => {
      const [x, y] = toMap(ev);
      if (labTool === 'X') { let bi = -1, bd = 40; labSp.c.forEach((c, i) => { const d = Math.hypot(c.x - x, c.y - y); if (d < bd) { bd = d; bi = i; } }); if (bi >= 0) labSp.c.splice(bi, 1); }
      else { if (labSp.c.length >= 6) labSp.c.shift(); labSp.c.push(labTool === 'H' ? { x: x, y: y, a: 16, s: 70, t: 'H' } : { x: x, y: y, a: -22, s: 42, t: 'L' }); }
      sfx('click'); drawLab();
    };
    svg.onpointermove = ev => {
      const [x, y] = toMap(ev), w = wind(labSp, x, y), p = P(labSp, x, y), f = Math.min(12, Math.round(w.m * 40));
      $('wlInfo').innerHTML = '気圧 <b>' + p.toFixed(0) + 'hPa</b> ・ 風 <b>' + DIR8[fromDir8(w)] + 'の 風</b> ・ 強さ (風力の めやす) <b>' + f + '</b>';
    };
  }

  function stats() { const d = data(); const v = MODS.map(m => d.best[m.id]).filter(x => x != null); return { done: v.length, sum: v.reduce((a, b) => a + b, 0) }; }
  return { open: open, stats: stats, _gen: GEN, _P: P, _wind: wind, _pattern: pattern, _mapSVG: mapSVG };
})();
