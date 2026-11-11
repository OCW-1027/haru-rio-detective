/* engine/badges.js — 実績バッジ図鑑
 * 각 콘텐츠의 저장 데이터 (State.v2.* · State.*Cleared) 에서 진척을 계산해 배지를 판정한다 (별도 기록 불필요).
 * 새로 얻은 배지는 허브로 돌아올 때 토스트로 알린다. 저장: State.v2.badges = { id: 'YYYY-MM-DD' }
 * 화면: pageBadges (#bgArea). Dependencies: State, saveState, showPage, sfx, escapeHtml, Hub (_cases), 각 엔진 (있으면)
 */
const Badges = (function () {
  const v2 = () => State.v2 || {};
  const n = o => Object.keys(o || {}).length;
  const safe = f => { try { return f() || 0; } catch (e) { return 0; } };
  function solvedCases() { return safe(() => Hub._cases().reduce((a, c) => a + (c.cleared || []).slice(0, c.total).filter(Boolean).length, 0)); }
  function totalCases() { return safe(() => Hub._cases().reduce((a, c) => a + c.total, 0)); }
  function vocab(lv) { return safe(() => Eiken._vocabStats(lv).mastered); }
  function ladStars(L) { const lad = (v2().mw || {}).lad || {}; return safe(() => L.U.filter(u => (lad[u.id] || {}).best >= 8).length); }
  function ladStarsG(L, gs) { const lad = (v2().mw || {}).lad || {}; return safe(() => L.U.filter(u => gs.indexOf(u.g) >= 0 && (lad[u.id] || {}).best >= 8).length); }
  function diagBest(lv) { return safe(() => Math.max(0, ...((v2().mw || {}).diag || []).filter(d => d.lv === lv).map(d => d.ok))); }
  function imStars() { const t = (v2().indian || {}).t || {}; return Object.keys(t).reduce((a, k) => a + (t[k].stars || 0), 0); }
  function streak() {   // 연속 학습일 (오늘 또는 어제부터 거꾸로)
    const L = v2().log || {}; let s = 0; const d = new Date(); if (!dayHas(L, d)) d.setDate(d.getDate() - 1);
    while (dayHas(L, d)) { s++; d.setDate(d.getDate() - 1); } return s;
  }
  function dayHas(L, d) { const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); const x = L[k]; return !!x && Object.keys(x).some(a => a.indexOf(':') < 0 && (x[a][0] || x[a][2])); }
  function totalQs() { const L = v2().log || {}; let t = 0; Object.values(L).forEach(day => Object.keys(day).forEach(a => { if (a.indexOf(':') < 0) t += day[a][0]; })); return t; }
  function taBest() { return safe(() => ((v2().mw || {}).lad || {}).xt.ta); }
  const SOC = ['sh', 'sg', 'sc2'], SCI = ['sj1', 'sj2', 'shp', 'shc', 'shb'];

  // [id, icon, 名前, 条件の 説明, 現在値 () , 目標, 分類]
  const B = [
    ['first', '🔰', 'はじめの 一歩', '問題を 10問 解く', totalQs, 10, '学習'],
    ['q500', '📚', 'コツコツ 500', '問題を 合計 500問 解く', totalQs, 500, '学習'],
    ['q3000', '🏯', '千里の 道', '問題を 合計 3000問 解く', totalQs, 3000, '学習'],
    ['st3', '🔥', '3日 連続', '3日 続けて 学習する', streak, 3, '学習'],
    ['st7', '🌟', '1週間 連続', '7日 続けて 学習する', streak, 7, '学習'],
    ['st30', '👑', '1か月 連続', '30日 続けて 学習する', streak, 30, '学習'],
    ['case10', '🔍', '駆け出し 探偵', '事件を 10件 解決する', solvedCases, 10, '探偵'],
    ['case50', '🕵', '名探偵', '事件を 50件 解決する', solvedCases, 50, '探偵'],
    ['caseAll', '🏆', '伝説の 探偵', 'すべての 事件を 解決する', solvedCases, () => Math.max(1, totalCases()), '探偵'],
    ['world6', '✈', '世界を 追え', '世界追跡の 6事件を すべて 解決', () => n((v2().world || {}).cleared), 6, '探偵'],
    ['lab5', '🧪', '実験の 達人', 'ラボ探偵の 事件を すべて 解決', () => n((v2().lab || {}).cleared), () => safe(() => LabDetective._cases.length) || 5, '探偵'],
    ['frag12', '💎', '知の 守り手', '知のカケラを 12個 集める', () => safe(() => MainStory.gotCount()), 12, '探偵'],
    ['boss1', '⚔', 'ゼロに 勝利', 'メインストーリーの ボスを たおす', () => ((v2().story || {}).boss || {}).won ? 1 : 0, 1, '探偵'],
    ['ek100', '🔤', '単語 100', '英検 単語を 100語 覚える (2級・準1級 合計)', () => vocab('g2') + vocab('p1'), 100, '英語'],
    ['ek500', '📖', '単語 500', '英検 単語を 500語 覚える', () => vocab('g2') + vocab('p1'), 500, '英語'],
    ['ek1000', '🎓', '単語 1000', '英検 単語を 1000語 覚える', () => vocab('g2') + vocab('p1'), 1000, '英語'],
    ['mock75', '📝', '合格圏', '英検 模擬試験で リーディング 75% 以上', () => safe(() => Math.max(0, ...((v2().eiken || {}).mock || []).map(m => Math.round(m.r[0] * 100 / m.r[1])))), 75, '英語'],
    ['int', '🎤', '面接 デビュー', '英検 二次面接を 1回 受ける', () => n((v2().eiken || {}).interview), 1, '英語'],
    ['im10', '🇮🇳', 'インド式 入門', 'インド式の ★を 10個 集める', imStars, 10, '算数・数学'],
    ['im40', '🧮', 'インド式 達人', 'インド式の ★を 40個 集める', imStars, 40, '算数・数学'],
    ['imExam', '🏅', '検定 合格', 'インド式の 検定に 2つ 合格', () => n((v2().indian || {}).badge), 2, '算数・数学'],
    ['lad10', '📈', '数学 ラダー 10', '数学ラダーで ★を 10単元', () => safe(() => ladStars(LADDER)), 10, '算数・数学'],
    ['lad40', '🧗', '数学 ラダー 40', '数学ラダーで ★を 40単元', () => safe(() => ladStars(LADDER)), 40, '算数・数学'],
    ['diagC', '🩺', '中学数学 合格', '中学数学の 実力診断で 16問 以上', () => diagBest('c'), 16, '算数・数学'],
    ['diagH', '🎯', '高校数学 合格', '高校数学の 実力診断で 16問 以上', () => diagBest('h'), 16, '算数・数学'],
    ['ru', '🧩', 'パズル 名人', 'ロシア式 パズルを 20題 解く', () => n((v2().mw || {}).ru), 20, '算数・数学'],
    ['sci10', '🔬', '理科 ラダー 10', '理科ラダーで ★を 10単元', () => safe(() => ladStarsG(SCILAD, SCI)), 10, '理科・社会'],
    ['soc10', '🏛', '社会 ラダー 10', '社会ラダーで ★を 10単元', () => safe(() => ladStarsG(SCILAD, SOC)), 10, '理科・社会'],
    ['soc20', '🗺', '社会 博士', '社会ラダーで ★を 20単元', () => safe(() => ladStarsG(SCILAD, SOC)), 20, '理科・社会'],
    ['diagS', '📜', '社会 合格', '社会の 実力診断で 17問 以上', () => diagBest('s'), 17, '理科・社会'],
    ['diagR', '⚗', '理科 合格', '理科の 実力診断で 16問 以上', () => diagBest('r'), 16, '理科・社会'],
    ['ta12', '⏱', '年表 マスター', '年表 タイムアタックで 12問 以上', taBest, 12, '理科・社会'],
    ['wx', '🌤', 'お天気 キャスター', 'お天気予報チャレンジを 5回', () => ((v2().wx || {}).done || []).length, 5, '理科・社会'],
  ];
  const goal = b => typeof b[5] === 'function' ? b[5]() : b[5];
  function status() { return B.map(b => { const cur = safe(b[4]), g = goal(b); return { id: b[0], icon: b[1], name: b[2], desc: b[3], cur: Math.min(cur, g), goal: g, ok: cur >= g, cat: b[6] }; }); }
  function store() { if (!State.v2) State.v2 = {}; return State.v2.badges || (State.v2.badges = {}); }
  function today() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  // 새 배지 확인 → 토스트
  function check() {
    const S = store(), news = status().filter(b => b.ok && !S[b.id]);
    if (!news.length) return [];
    news.forEach(b => S[b.id] = today()); try { saveState(); } catch (e) {}
    const show = news.length > 3 ? news.slice(0, 2).concat([{ icon: '🏅', name: 'ほか ' + (news.length - 2) + '個 — 図鑑を 見てね' }]) : news;
    show.forEach((b, i) => setTimeout(() => toast(b), 400 + i * 2600));
    return news;
  }
  function toast(b) {
    const el = document.createElement('div'); el.className = 'bg-toast';
    el.innerHTML = '<span class="bg-ti">' + b.icon + '</span><span><small>バッジ ゲット!</small><b>' + escapeHtml(b.name) + '</b></span>';
    document.body.appendChild(el); try { sfx('unlock'); } catch (e) {}
    setTimeout(() => el.classList.add('show'), 30); setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 500); }, 2400);
  }
  function render() {
    const S = store(), st = status().map(b => { if (S[b.id] && !b.ok) { b.ok = true; b.cur = b.goal; } return b; }), got = st.filter(b => b.ok).length, cats = [];
    st.forEach(b => { if (cats.indexOf(b.cat) < 0) cats.push(b.cat); });
    let h = '<div class="bg-head"><h1>🏅 バッジ 図鑑</h1><div class="bg-count"><b>' + got + '</b> / ' + st.length + '</div></div><div class="bg-bar"><i style="width:' + Math.round(got * 100 / st.length) + '%"></i></div>';
    cats.forEach(c => {
      h += '<h3 class="bg-cat">' + escapeHtml(c) + '</h3><div class="bg-grid">';
      st.filter(b => b.cat === c).forEach(b => {
        const p = Math.round(b.cur * 100 / b.goal);
        h += '<div class="bg-card' + (b.ok ? ' ok' : '') + '"><div class="bg-icon">' + b.icon + '</div><div class="bg-name">' + escapeHtml(b.name) + '</div><div class="bg-desc">' + escapeHtml(b.desc) + '</div>' + (b.ok ? '<div class="bg-date">' + escapeHtml(S[b.id] || '') + '</div>' : '<div class="bg-prog"><i style="width:' + p + '%"></i></div><div class="bg-num">' + b.cur + ' / ' + b.goal + '</div>') + '</div>';
      });
      h += '</div>';
    });
    document.getElementById('bgArea').innerHTML = h;
  }
  function open() { check(); showPage('pageBadges'); render(); const p = document.getElementById('pageBadges'); if (p) p.scrollTop = 0; }
  return { open: open, check: check, status: status, _streak: streak };
})();
