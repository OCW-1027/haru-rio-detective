/* engine/parent-report.js — 保護者レポート
 * 기간 (7일/30일) 의 학습 시간·문제 수·정답률, 영역별 표, 英検 상세 (단어 SRS·大問1 분야별·리스닝·模試 추이), インド式 苦手ワザ, 모험 진척, 규칙 기반 おすすめ
 * 데이터: Study.summary (study-log.js) + 각 엔진의 State.v2.* (이 단말의 기록)
 * 화면: pageParent (#prArea). Dependencies: Study, State, showPage, sfx, escapeHtml, (Eiken, IM, MainStory, LabDetective, WorldChase 는 있으면 사용)
 */
const ParentReport = (function () {
  let span = 7;
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const pct = (ok, n) => n ? Math.round(ok * 100 / n) : null;
  const v2 = () => State.v2 || {};
  const fmtMin = m => m >= 60 ? Math.floor(m / 60) + '時間' + (m % 60 ? (m % 60) + '分' : '') : m + '分';
  const bar = (p, cls) => '<span class="pr-bar ' + (cls || '') + '"><i style="width:' + Math.max(0, Math.min(100, p || 0)) + '%"></i></span>';
  const tone = p => p == null ? '' : p >= 80 ? 'good' : p >= 60 ? 'mid' : 'low';

  function daysChart(days) {
    const W = 340, H = 120, n = days.length, bw = (W - 30) / n, max = Math.max(10, ...days.map(d => d.total[2]));
    let s = '<svg viewBox="0 0 ' + W + ' ' + (H + 22) + '" class="pr-chart" role="img" aria-label="日ごとの 学習時間">';
    [0.5, 1].forEach(f => { const y = H - (H - 10) * f; s += '<line x1="26" x2="' + W + '" y1="' + y + '" y2="' + y + '" stroke="#e8e2d8" stroke-dasharray="3 3"/><text x="22" y="' + (y + 4) + '" text-anchor="end" font-size="9" fill="#9a8a7a">' + Math.round(max * f) + '</text>'; });
    days.forEach((d, i) => {
      const m = d.total[2], h = (H - 10) * m / max, x = 30 + i * bw;
      s += '<rect x="' + (x + bw * 0.15) + '" y="' + (H - h) + '" width="' + (bw * 0.7) + '" height="' + Math.max(h, m ? 2 : 0) + '" rx="2" fill="' + (d.d === Study.today() ? '#e0732a' : '#7aa6d6') + '"><title>' + d.d + ' ' + m + '分 · ' + d.total[0] + '問</title></rect>';
      if (n <= 7 || i % 5 === 0 || i === n - 1) s += '<text x="' + (n > 7 && i === n - 1 ? W - 1 : x + bw / 2) + '" y="' + (H + 14) + '" text-anchor="' + (n > 7 && i === n - 1 ? 'end' : 'middle') + '" font-size="9" fill="#7a6a5a">' + (+d.d.slice(5, 7)) + '/' + (+d.d.slice(8)) + '</text>';
    });
    s += '<line x1="26" x2="' + W + '" y1="' + H + '" y2="' + H + '" stroke="#bfb4a4"/></svg>';
    return s;
  }

  // ---- 英検 상세 ----
  function eikenBlock() {
    const e = v2().eiken; if (!e) return '<p class="pr-empty">まだ 記録が ありません。</p>';
    let h = '';
    [['g2', '2級', 'EIKEN_G2_PART1', e.p1 || {}, e.listen || {}], ['p1', '準1級', 'EIKEN_P1_PART1', e.pp1 || {}, e.p_listen || {}]].forEach(([lv, name, setName, p1, lis]) => {
      let vs = null; try { vs = Eiken._vocabStats(lv); } catch (er) {}
      let set = []; try { set = eval(setName) || []; } catch (er) {}
      const tag = {}; let pn = 0, pok = 0;
      Object.keys(p1).forEach(i => { const r = p1[i], q = set[+i]; pn += r[0] + r[1]; pok += r[0]; const t = (q && q.tag) || '他'; const a = tag[t] || (tag[t] = [0, 0]); a[0] += r[0]; a[1] += r[0] + r[1]; });
      let ln = 0, lok = 0; Object.keys(lis).forEach(k => { ln += lis[k][0] + lis[k][1]; lok += lis[k][0]; });
      const mocks = (e.mock || []).filter(m => m.lv === lv).slice(-5);
      if (!pn && !ln && !mocks.length && !(vs && (vs.mastered || vs.learning))) return;
      h += '<div class="pr-sub"><h4>' + name + '</h4><table class="pr-tbl"><tbody>';
      if (vs) h += '<tr><th>単語</th><td>覚えた <b>' + vs.mastered + '</b> · 学習中 ' + vs.learning + ' / ' + vs.total + '語' + (vs.due ? ' <span class="pr-warn">復習待ち ' + vs.due + '</span>' : '') + '</td><td>' + bar(pct(vs.mastered, vs.total), 'good') + '</td></tr>';
      if (pn) h += '<tr><th>大問1</th><td>' + pok + ' / ' + pn + ' 正解 (' + pct(pok, pn) + '%)</td><td>' + bar(pct(pok, pn), tone(pct(pok, pn))) + '</td></tr>';
      Object.keys(tag).forEach(t => { const a = tag[t]; if (a[1] >= 5) h += '<tr class="pr-indent"><th>└ ' + esc(t) + '</th><td>' + pct(a[0], a[1]) + '% (' + a[1] + '問)</td><td>' + bar(pct(a[0], a[1]), tone(pct(a[0], a[1]))) + '</td></tr>'; });
      if (ln) h += '<tr><th>リスニング</th><td>' + lok + ' / ' + ln + ' 正解 (' + pct(lok, ln) + '%)</td><td>' + bar(pct(lok, ln), tone(pct(lok, ln))) + '</td></tr>';
      h += '</tbody></table>';
      if (mocks.length) h += '<div class="pr-mock"><b>模擬試験</b>' + mocks.map(m => '<span>' + esc((m.d || '').slice(5)) + ' R ' + pct(m.r[0], m.r[1]) + '% · L ' + pct(m.l[0], m.l[1]) + '%</span>').join('') + '</div>';
      h += '</div>';
    });
    return h || '<p class="pr-empty">まだ 記録が ありません。</p>';
  }

  // ---- インド式 ----
  function indianBlock() {
    const d = v2().indian; if (!d || !d.t || typeof IM === 'undefined') return '';
    const stars = IM.T.reduce((a, t) => a + ((d.t[t.id] || {}).stars || 0), 0);
    const weak = IM.T.map(t => ({ t: t, r: d.t[t.id] })).filter(x => x.r && x.r.n >= 5).map(x => ({ t: x.t, p: pct(x.r.ok, x.r.n), n: x.r.n })).filter(x => x.p < 85).sort((a, b) => a.p - b.p).slice(0, 3);
    let h = '<div class="pr-kv"><span>★ <b>' + stars + '</b> / ' + IM.T.length * 3 + '</span><span>検定 合格 <b>' + Object.keys(d.badge || {}).length + '</b> / ' + IM.COURSES.length + '</span></div>';
    if (weak.length) h += '<div class="pr-note">苦手な ワザ: ' + weak.map(w => esc(w.t.icon + ' ' + w.t.name) + ' (' + w.p + '%)').join('、') + '</div>';
    return h;
  }

  // ---- 数学ラダー ----
  function ladderBlock(LL) {
    const LADDER = LL || (typeof window.LADDER !== 'undefined' ? window.LADDER : null); if (!LADDER) return '';
    const m = v2().mw || {}, lad = m.lad || {}, diag = m.diag || [];
    if (!Object.keys(lad).length && !diag.length) return '';
    let h = '<table class="pr-tbl"><tbody>';
    LADDER.GROUPS.forEach(g => { const us = LADDER.U.filter(u => u.g === g.id), st = us.filter(u => (lad[u.id] || {}).best >= 8).length, tried = us.filter(u => lad[u.id]).length; if (tried) h += '<tr><th>' + esc(g.name) + '</th><td class="pr-num">★ ' + st + ' / ' + us.length + '</td><td>' + bar(pct(st, us.length), 'good') + '</td></tr>'; });
    h += '</tbody></table>';
    const lvs = (LADDER.diags || []).map(x => x[0]), dl = diag.filter(d => lvs.indexOf(d.lv) >= 0);
    if (dl.length) { const d = dl[dl.length - 1]; h += '<div class="pr-note">最新の 実力診断 (' + esc(d.d) + '・' + ({ c: '中学', h: '高校', s: '社会', r: '理科', e: '小学' })[d.lv] + '): <b>' + d.ok + ' / ' + d.n + '</b>' + (d.weak.length ? '<br>苦手 単元: ' + d.weak.map(id => { const u = LADDER.byId(id); return u ? esc(u.name) : ''; }).filter(Boolean).join('、') : '') + '</div>'; }
    return h;
  }
  // ---- 冒険の 進み具合 ----
  function adventureBlock() {
    const V = v2(), rows = [];
    const n = o => Object.keys(o || {}).length;
    try { rows.push(['知のカケラ', MainStory.gotCount(), 12]); } catch (e) {}
    rows.push(['世界追跡', n(V.world && V.world.cleared), 6]);
    try { rows.push(['ラボ探偵', n(V.lab && V.lab.cleared), LabDetective._cases.length]); } catch (e) {}
    if (typeof MW !== 'undefined') { rows.push(['ロシア式 パズル', n(V.mw && V.mw.ru), MW.RU.length]); rows.push(['公式図鑑', n(V.mw && V.mw.fm), MW.FM.length]); rows.push(['線分図 マスター', Object.values((V.mw && V.mw.sg) || {}).filter(x => x >= 4).length, MW.SG.length]); }
    return '<table class="pr-tbl"><tbody>' + rows.map(r => '<tr><th>' + esc(r[0]) + '</th><td class="pr-num">' + r[1] + ' / ' + r[2] + '</td><td>' + bar(pct(r[1], r[2]), 'good') + '</td></tr>').join('') + '</tbody></table>';
  }

  // ---- おすすめ (규칙 기반) ----
  function tips(sum7, days7) {
    const out = [], V = v2();
    const studied = days7.filter(d => d.total[2] > 0 || d.total[0] > 0).length;
    let gap = 0; for (let i = days7.length - 1; i >= 0 && !(days7[i].total[2] || days7[i].total[0]); i--) gap++;
    if (gap >= 3) out.push('📅 ' + gap + '日間 学習の 記録が ありません。短い 時間でも 毎日 続けると 定着しやすく なります。');
    else if (studied >= 5) out.push('🌟 この1週間で ' + studied + '日 学習しました。とても よい ペースです。');
    try { ['g2', 'p1'].forEach(lv => { const vs = Eiken._vocabStats(lv); if (vs.due >= 20) out.push('🔁 英検' + (lv === 'p1' ? '準1級' : '2級') + 'の 単語が ' + vs.due + '語 復習待ちです。「今日の 単語」から 復習できます。'); }); } catch (e) {}
    const sub = Study.subSum(30, 'eiken'), L = sub.listen, P = sub.p1;
    if (L && L[0] >= 10 && pct(L[1], L[0]) < 60) out.push('🎧 最近 30日の リスニング 正答率が ' + pct(L[1], L[0]) + '% です。スクリプトを 見ながら もう一度 聞く 練習が おすすめです。');
    if (P && P[0] >= 20 && pct(P[1], P[0]) >= 85) out.push('📈 大問1の 正答率が ' + pct(P[1], P[0]) + '% と 高いです。模擬試験で 本番の 時間配分を 試してみましょう。');
    if (!sub.listen && !sub.mockL && sum7.eiken) out.push('🎧 英検の リスニングを まだ 練習していません。1日 5問から 始めてみましょう。');
    const d = V.indian; if (d && d.t && typeof IM !== 'undefined') { const w = IM.T.map(t => ({ t: t, r: d.t[t.id] })).filter(x => x.r && x.r.n >= 5 && pct(x.r.ok, x.r.n) < 70)[0]; if (w) out.push('🧮 インド式「' + w.t.name + '」の 正答率が 低めです。解説を もう一度 読んでから 練習すると 効果的です。'); }
    const areas = Object.keys(sum7).filter(a => sum7[a][2] >= 5 || sum7[a][0] >= 5);
    if (areas.length === 1) out.push('🗺 最近は「' + (Study.NAME[areas[0]] || areas[0]) + '」が 中心です。他の 冒険にも 誘ってみると 興味が 広がります。');
    if (!out.length) out.push('🙂 記録が たまると、ここに アドバイスが 表示されます。');
    return out;
  }

  function render() {
    const S = Study.summary(span), S7 = span === 7 ? S : Study.summary(7);
    const tot = S.days.reduce((a, d) => [a[0] + d.total[0], a[1] + d.total[1], a[2] + d.total[2]], [0, 0, 0]);
    const active = S.days.filter(d => d.total[0] || d.total[2]).length;
    let h = '<div class="pr-head"><div><div class="pr-kicker">ハル探偵事務所</div><h1>保護者レポート</h1></div><div class="pr-span"><button data-span="7" class="' + (span === 7 ? 'on' : '') + '">7日</button><button data-span="30" class="' + (span === 30 ? 'on' : '') + '">30日</button></div></div>';
    h += '<div class="pr-kpis"><div><b>' + active + '</b><small>学習した 日 / ' + span + '日</small></div><div><b>' + fmtMin(tot[2]) + '</b><small>学習時間</small></div><div><b>' + tot[0] + '</b><small>解いた 問題</small></div><div><b>' + (pct(tot[1], tot[0]) == null ? '—' : pct(tot[1], tot[0]) + '%') + '</b><small>正答率</small></div></div>';
    h += '<section class="pr-card"><h3>📊 日ごとの 学習時間 (分)</h3>' + daysChart(S.days) + '</section>';
    const areas = Object.keys(S.sum).sort((a, b) => S.sum[b][2] - S.sum[a][2] || S.sum[b][0] - S.sum[a][0]);
    h += '<section class="pr-card"><h3>📚 分野別</h3>' + (areas.length ? '<table class="pr-tbl pr-areas"><thead><tr><th>分野</th><th>時間</th><th>問題</th><th>正答率</th></tr></thead><tbody>' + areas.map(a => { const v = S.sum[a], p = pct(v[1], v[0]); return '<tr><th>' + esc(Study.NAME[a] || a) + '</th><td>' + fmtMin(v[2]) + '</td><td>' + v[0] + '</td><td class="' + tone(p) + '">' + (p == null ? '—' : p + '%') + '</td></tr>'; }).join('') + '</tbody></table>' : '<p class="pr-empty">この 期間の 記録は まだ ありません。</p>') + '</section>';
    h += '<section class="pr-card"><h3>💡 おすすめ</h3><ul class="pr-tips">' + tips(S7.sum, S7.days).map(t => '<li>' + esc(t) + '</li>').join('') + '</ul></section>';
    h += '<section class="pr-card"><h3>🇬🇧 英検道場 (これまでの 合計)</h3>' + eikenBlock() + '</section>';
    const ib = indianBlock(); if (ib) h += '<section class="pr-card"><h3>🇮🇳 インド式 計算道場</h3>' + ib + '</section>';
    const eb = ladderBlock(typeof ELAD !== 'undefined' ? ELAD : null); if (eb) h += '<section class="pr-card"><h3>🎒 小学 算数 ラダー</h3>' + eb + '</section>';
    const lb = ladderBlock(typeof LADDER !== 'undefined' ? LADDER : null); if (lb) h += '<section class="pr-card"><h3>📈 中学・高校 数学ラダー</h3>' + lb + '</section>';
    const sb = ladderBlock(typeof SCILAD !== 'undefined' ? SCILAD : null); if (sb) h += '<section class="pr-card"><h3>🔬 理科・社会 ラダー</h3>' + sb + '</section>';
    h += '<section class="pr-card"><h3>🧭 冒険の 進み具合</h3>' + adventureBlock() + '</section>';
    h += '<p class="pr-foot">※ この 端末に 保存された 記録です。学習時間は 画面を 操作している 1分ごとに 数えています (2026年11月 以降の 記録)。</p>';
    $('prArea').innerHTML = h;
    $('prArea').querySelectorAll('[data-span]').forEach(b => b.onclick = () => { sfx('click'); span = +b.dataset.span; render(); });
  }
  function open() { showPage('pageParent'); render(); const p = $('pageParent'); if (p) p.scrollTop = 0; }
  return { open: open, _render: render };
})();
