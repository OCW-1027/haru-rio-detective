/* engine/hub.js — 허브 화면 「ハル探偵事務所」 (2026-11 개편)
 * 메인: 배너 → きょうの ミッション (つづきから·復習·英語ニュース) → メインストーリー 2장 → カテゴリ 6개 (문)
 * 카테고리를 누르면 같은 페이지 안에서 カテゴリ 화면 (← 事務所 로 돌아옴). 콘텐츠에서 「← 事務所」로 나오면 마지막 カテゴリ로 돌아온다.
 * 처음 여는 콘텐츠에만 NEW 표시 (State.v2.hubSeen), 마지막에 연 콘텐츠는 State.v2.hubLast → 「つづきから」
 * Dependencies: State, CaseEngine, ReviewEngine, switchTab, showPage, sfx, escapeHtml, CHAR_IMAGES, SCENE_IMAGES, STORY, SCIENTISTS_STORY 외 각 콘텐츠 엔진
 */
const Hub = (function () {
  const KORADON = 'assets/img/chars/spirits/koradon_idle_01.webp';
  const KORARIN = 'assets/img/chars/spirits/korarin_idle_01.webp';
  const esc = s => escapeHtml(String(s));
  const v2 = () => { if (!State.v2) State.v2 = {}; return State.v2; };
  const safe = (f, d) => { try { return f(); } catch (e) { return d; } };
  let cat = null;          // 지금 보고 있는 카테고리 (null = 메인)
  const POS = {};          // 화면별 스크롤 위치 (main / 카테고리 id) — 돌아왔을 때 그 자리로
  const hubPage = () => document.getElementById('pageHub');
  function keepPos() { const p = hubPage(); if (p && p.classList.contains('active')) POS[cat || 'main'] = p.scrollTop; }
  function setPos(y) { const p = hubPage(); if (!p) return; p.scrollTop = y || 0; requestAnimationFrame(() => { p.scrollTop = y || 0; }); }

  // 사건 파일 (탐정 시리즈)
  function cases() {
    const eng = k => CaseEngine.get(k);
    const fromEngine = (k, icon, name) => {
      const e = eng(k);
      return { tab: k, icon: icon, name: name, cover: e.cfg.story[0].illustration,
        total: e.cfg.story.filter(c => !c.comingSoon).length, cleared: State[e.cfg.clearedKey] };
    };
    return [
      { tab: 'story', icon: '🔍', name: 'ハル&リオの 名探偵物語', cover: SCENE_IMAGES.schoolGate, total: STORY.length, cleared: State.cleared },
      fromEngine('science', '🔬', '科学探偵'),
      { tab: 'scientists', icon: '👨‍🔬', name: '偉人科学者ファイル', cover: SCIENTISTS_STORY[0].illustration,
        total: SCIENTISTS_STORY.filter(c => !c.comingSoon).length, cleared: State.scientistsCleared },
      fromEngine('wea', '🌦', '気象予報士'),
      fromEngine('math', '🔢', '算数·数学'),
      fromEngine('world', '🌍', '世界遺産の旅'),
      fromEngine('soc', '🏛', '社会科総合'),
      fromEngine('hist', '🌐', '世界経済·貿易史'),
      fromEngine('mon', '💴', '日常のお金'),
      fromEngine('biz', '📊', 'ビジネス·企業'),
      fromEngine('lit', '🎭', '文学·芸術'),
    ];
  }
  function countCleared(a, total) { return (a || []).slice(0, total).filter(Boolean).length; }

  function openList(tab, title) {
    const t = document.querySelector('#pageSelect .select-title');
    const s = document.querySelector('#pageSelect .select-sub');
    if (t) t.textContent = title;
    if (s) s.textContent = tab === 'game' || tab === 'quiz' || tab === 'eng' ? '' : '事件を 選んで、謎を 解こう!';
    switchTab(tab);
    showPage('pageSelect');
    const page = document.getElementById('pageSelect');
    if (page) page.scrollTop = 0;
  }

  // ---------- 콘텐츠 목록 ----------
  // { id, cat, grp, icon|img, name, sub(): 진행 상황, go() }
  const cnt = o => Object.keys(o || {}).length;
  function items() {
    const L = [], add = o => L.push(o);
    // 探偵ミッション
    add({ id: 'japan', cat: 'mission', grp: 'シーズン2', icon: '🗾', name: '日本列島ミステリー紀行', sub: () => { const s = safe(() => JapanTrip.stats(), null); return '47都道府県を 推理で 追え · 解決 ' + (s ? s.cleared : 0) + '/6'; }, go: () => JapanTrip.open() });
    add({ id: 'time', cat: 'mission', grp: 'シーズン2', icon: '⏳', name: 'タイムトラベル探偵', sub: () => { const s = safe(() => TimeTravel.stats(), null); return '縄文〜令和を 追跡 · 解決 ' + (s ? s.cleared : 0) + '/6'; }, go: () => TimeTravel.open() });
    add({ id: 'code', cat: 'mission', grp: 'シーズン2', icon: '🔐', name: '暗号解読局', sub: () => { const s = safe(() => CodeLab.stats(), null); return '暗号・数列・うそつきパズル · 解決 ' + (s ? s.cleared : 0) + '/6'; }, go: () => CodeLab.open() });
    add({ id: 'news2', cat: 'mission', grp: 'シーズン2', icon: '🗞️', name: 'ニュース探偵', sub: () => { const s = safe(() => NewsDetective.stats(), null); return 'グラフの わな・事実と 意見 · 解決 ' + (s ? s.cleared : 0) + '/6'; }, go: () => NewsDetective.open() });
    add({ id: 'court', cat: 'mission', grp: 'シーズン2', icon: '⚖️', name: 'こども裁判所', sub: () => { const s = safe(() => KidsCourt.stats(), null); return '証言の むじゅんに「異議あり!」 · 解決 ' + (s ? s.cleared : 0) + '/5'; }, go: () => KidsCourt.open() });
    add({ id: 'world', cat: 'mission', grp: 'シーズン1', img: KORADON, name: 'コラドン航空 世界追跡', sub: () => '怪盗を 追って 世界を 飛ぼう · 解決 ' + cnt(safe(() => v2().world.cleared)) + '/6', go: () => WorldChase.open() });
    add({ id: 'lab', cat: 'mission', grp: 'シーズン1', icon: '🧪', name: 'ラボ探偵', sub: () => '実験で トリックを 見ぬけ · 解決 ' + cnt(safe(() => v2().lab.cleared)) + '/' + (typeof LabDetective !== 'undefined' ? LabDetective._cases.length : 5), go: () => LabDetective.open() });
    // 道場
    add({ id: 'eiken', cat: 'dojo', icon: '🥋', name: '英検道場', sub: () => '2級・準1級 単語・リスニング・作文・模試50回', go: () => Eiken.open() });
    add({ id: 'kanken', cat: 'dojo', icon: '🈴', name: '漢検道場', sub: () => { const k = safe(() => Kanken.stats(), null); return k && k.solved ? k.name + ' 覚えた ' + k.mastered + '/' + k.total + '字' + (k.best != null ? ' · 模試 ' + k.best + '点' : '') : '10級〜1級 · 書き順・手書き・本番形式'; }, go: () => Kanken.open() });
    add({ id: 'indian', cat: 'dojo', icon: '🇮🇳', name: 'インド式 計算道場', sub: () => { const d = safe(() => v2().indian.t, {}) || {}; const n = typeof IM !== 'undefined' ? IM.T.length : 26; return n + 'の ワザ · ★ ' + Object.keys(d).reduce((a, k) => a + (d[k].stars || 0), 0) + '/' + n * 3; }, go: () => IndianMath.open() });
    add({ id: 'mathworld', cat: 'dojo', icon: '🌏', name: '世界の 算数道場', sub: () => '中学・高校 数学ラダー · シンガポール式・ロシア式', go: () => MathWorld.open() });
    // 気象予報士への道
    add({ id: 'wxlab', cat: 'wx', icon: '🗺️', name: '天気図 実技道場', sub: () => { const s = safe(() => WxLab.stats(), null); return '等圧線・前線・高層天気図・本物の 天気図' + (s && s.done ? ' · ' + s.done + 'モジュール 挑戦' : ''); }, go: () => WxLab.open() });
    add({ id: 'wxc', cat: 'wx', img: KORARIN, name: 'お天気予報チャレンジ', sub: () => '本物の データで あしたを 予報 · 記録 ' + ((safe(() => v2().wx.done, []) || []).length) + '回', go: () => WeatherChallenge.open() });
    add({ id: 'weaLearn', cat: 'wx', icon: '📚', name: '気象 試験対策', sub: () => '気象予報士 試験の 学習資料', go: () => openWeaLearn() });
    add({ id: 'case_wea2', cat: 'wx', icon: '🌦', name: '事件ファイル 気象予報士', sub: () => { const c = cases().find(x => x.tab === 'wea'); return '天気の なぞを 解く 事件 · ' + countCleared(c.cleared, c.total) + '/' + c.total; }, go: () => openList('wea', '🌦 気象予報士') });
    // 学習室
    add({ id: 'newsbox', cat: 'study', icon: '📰', name: '英語ニュース', sub: () => { const n = safe(() => NewsBox.stats(), null); return n ? (n.today ? '✅ 今日 読んだ' : '📮 今日の ニュース') + ' · 単語 ' + n.words + '語' : '海外の 子ども ニュース'; }, go: () => NewsBox.open() });
    add({ id: 'eng', cat: 'study', icon: '🔤', name: '英語', sub: () => '単語・文法・作文 (前からの 練習)', go: () => openList('eng', '🔤 英語') });
    add({ id: 'elem', cat: 'study', icon: '🎒', name: '小学 算数 ラダー', sub: () => '4年〜6年 · ' + (typeof ELAD !== 'undefined' ? ELAD.U.length : 25) + '単元 · 図つき 解説', go: () => MathWorld.open('elem') });
    add({ id: 'mathLearn', cat: 'study', icon: '📐', name: '算数 試験対策', sub: () => '公式・図解・過去問', go: () => openMathLearn() });
    add({ id: 'scilab', cat: 'study', icon: '🧪', name: '理科 実験室', sub: () => { const s = safe(() => SciLab.stats(), null); return '8つの 実験 · 予想→記録→グラフ→考察' + (s && s.done ? ' · ミッション ' + s.done + '/' + s.total : '') + (s && s.notes ? ' · 📒' + s.notes : ''); }, go: () => SciLab.open() });
    add({ id: 'scilad', cat: 'study', icon: '🔬', name: '理科・社会 ラダー', sub: () => '中学〜高校 · 物理・化学・生物・地学・歴史・地理・公民', go: () => MathWorld.open('sci') });
    add({ id: 'wq', cat: 'study', icon: '🌐', name: '世界の 国 クイズ', sub: () => { const s = safe(() => WorldQuiz.stats(), null); return '237の 国・地域と 首都 · 覚えた ' + (s ? s.map : 0) + '/' + (s ? s.total : 237); }, go: () => WorldQuiz.open() });
    add({ id: 'quiz', cat: 'study', icon: '🧠', name: 'クイズ', sub: () => 'ニュース・熟語 クイズ', go: () => openList('quiz', '🧠 クイズ') });
    // ごほうび
    add({ id: 'game', cat: 'fun', icon: '🎮', name: 'ゲーム', sub: () => 'がんばった ごほうび', go: () => openList('game', '🎮 ゲーム') });
    add({ id: 'badges', cat: 'fun', icon: '🏅', name: 'バッジ 図鑑', sub: () => { const b = safe(() => Badges.status(), []), BS = v2().badges || {}; return b.length ? b.filter(x => x.ok || BS[x.id]).length + '/' + b.length + ' こ 集めた' : 'がんばりの 記録'; }, go: () => Badges.open() });
    // 事件ファイル (表紙 つき)
    cases().forEach(c => add({ id: 'case_' + c.tab, cat: 'cases', icon: c.icon, cover: c.cover, name: c.name, n: countCleared(c.cleared, c.total), total: c.total, sub: () => countCleared(c.cleared, c.total) + ' / ' + c.total + ' 事件', go: () => openList(c.tab, c.icon + ' ' + c.name) }));
    return L;
  }
  const CATS = [
    { id: 'mission', icon: '🔍', name: '探偵ミッション', sub: '推理で 解く 冒険', img: SCENE_IMAGES.nightStreet, col: '#7a4fa0' },
    { id: 'cases', icon: '🗂', name: '事件ファイル', sub: '11の シリーズ', img: SCENE_IMAGES.museum, col: '#8a5a2a' },
    { id: 'dojo', icon: '🥋', name: '道場', sub: '英検・漢検・計算・数学', img: SCENE_IMAGES.shrine, col: '#2a7a8a' },
    { id: 'wx', icon: '🌤', name: '気象予報士への 道', sub: '天気図・予報・試験対策', img: 'assets/img/series10-weather/wea_case_images_1.webp', col: '#2a6f9c' },
    { id: 'study', icon: '📚', name: '学習室', sub: '英語・算数・理科社会・クイズ', img: SCENE_IMAGES.schoolGate, col: '#4a7a3a' },
    { id: 'fun', icon: '🎮', name: 'ごほうび', sub: 'ゲーム・バッジ', img: SCENE_IMAGES.park, col: '#b0602a' },
  ];

  // 처음 개편 허브를 열 때: 기존 콘텐츠는 본 것으로, 새로 추가된 것만 NEW
  const FRESH = ['wxlab', 'kanken'];
  const seen = () => {
    const d = v2(); if (!d.hubSeen) d.hubSeen = {};
    if (!d.hubSeenInit) { items().forEach(it => { if (FRESH.indexOf(it.id) < 0) d.hubSeen[it.id] = 1; }); d.hubSeenInit = 1; }
    return d.hubSeen;
  };
  function launch(it, fromCat) {
    if (!it) return;
    sfx('click');
    keepPos();
    seen()[it.id] = 1; v2().hubLast = it.id;
    try { saveState(); } catch (e) {}
    cat = fromCat || null;
    it.go();
  }

  function hero(solved, total, due) {
    let h = '<section class="hub-hero" style="background-image:url(' + SCENE_IMAGES.library + ')"><div class="hub-hero-shade"></div>';
    h += '<div class="hub-hero-text"><div class="hub-hero-kicker">ハル&リオの</div><h1 class="hub-hero-title">探偵事務所</h1>';
    h += '<div class="hub-hero-stats"><span>🗂 解決 <b>' + solved + '</b> / ' + total + '</span>' + (due ? '<span>🔁 復習 <b>' + due + '</b>問</span>' : '') + '</div></div>';
    h += '<img class="hub-hero-char haru" src="' + CHAR_IMAGES.haru + '" alt=""><img class="hub-hero-char rio" src="' + CHAR_IMAGES.rio + '" alt="">';
    h += '<img class="hub-hero-spirit kd" src="' + KORADON + '" alt=""><img class="hub-hero-spirit kr" src="' + KORARIN + '" alt=""></section>';
    return h;
  }
  const ico = it => it.img ? '<img class="hub-ico-img" src="' + it.img + '" alt="">' : '<span class="hub-ico">' + it.icon + '</span>';

  function build() { cat ? buildCat(cat) : buildMain(); }

  function buildMain() {
    const root = document.getElementById('hubArea'); if (!root) return;
    const list = cases(), all = items(), S = seen();
    let solved = 0, total = 0; list.forEach(c => { solved += countCleared(c.cleared, c.total); total += c.total; });
    const due = safe(() => ReviewEngine.dueCount(), 0);
    let h = hero(solved, total, due);

    // きょうの ミッション
    const last = all.find(x => x.id === v2().hubLast) || all.find(x => x.id === 'case_' + State.currentTab);
    const nbs = safe(() => NewsBox.stats(), null);
    h += '<h2 class="hub-h">🎯 きょうの ミッション</h2><section class="hub-today">';
    if (last) h += '<button class="hub-chip" data-it="' + last.id + '">' + ico(last) + '<span><small>つづきから</small><b>' + esc(last.name) + '</b></span></button>';
    if (due) h += '<button class="hub-chip review" id="hubReview"><span class="hub-ico">🔁</span><span><small>コラリンの 復習</small><b>まちがえた 問題 ' + due + '問</b></span></button>';
    if (!nbs || !nbs.today) h += '<button class="hub-chip news" data-it="newsbox"><span class="hub-ico">📰</span><span><small>今日の 英語ニュース</small><b>まだ 読んで いないよ</b></span></button>';
    else h += '<button class="hub-chip done" data-it="newsbox"><span class="hub-ico">✅</span><span><small>英語ニュース</small><b>今日は 読んだ · 単語 ' + nbs.words + '語</b></span></button>';
    h += '</section>';

    // メインストーリー
    const st = v2().story || {}, sg = cnt(st.got), s2g = cnt(st.s2 && st.s2.got);
    h += '<h2 class="hub-h">📖 メインストーリー</h2><section class="hub-stories">';
    h += '<button class="hub-story" id="hubStory"><span class="hub-story-k">シーズン1</span><b>知のカケラ</b><small class="hub-story-t">怪盗ブランクを 追え</small><span class="hub-story-bar"><span style="width:' + (sg / 12 * 100) + '%"></span></span><small>カケラ ' + sg + ' / 12</small></button>';
    h += '<button class="hub-story s2" id="hubStory2"><span class="hub-story-k">シーズン2</span><b>白紙の ページ</b><small class="hub-story-t">怪盗ブランクの 正体</small><span class="hub-story-bar"><span style="width:' + (s2g / 6 * 100) + '%"></span></span><small>真実の カケラ ' + s2g + ' / 6</small></button>';
    h += '</section>';

    // カテゴリ: 見出し (タップで くわしい 画面) + 中身を すべて ボタンで 表示
    CATS.forEach(c => {
      const its = all.filter(x => x.cat === c.id);
      h += '<section class="hub-panel" style="--dc:' + c.col + '"><button class="hub-panel-head" data-cat="' + c.id + '"><span class="hub-panel-thumb" style="background-image:url(' + c.img + ')"></span><span class="hub-panel-t"><b>' + c.icon + ' ' + c.name + '</b><small>' + c.sub + '</small></span><span class="hub-panel-more">くわしく ›</span></button><div class="hub-chips">';
      its.forEach(it => { h += '<button class="hub-mini" data-it="' + it.id + '">' + (it.img ? '<img src="' + it.img + '" alt="">' : '<span>' + it.icon + '</span>') + '<b>' + esc(it.name) + '</b>' + (!S[it.id] ? '<em class="hub-tag">NEW</em>' : '') + '</button>'; });
      h += '</div></section>';
    });
    h += '<div class="hub-foot"><button class="hub-parent" id="hubParent">👪 保護者レポート</button><button class="hub-parent no-furi" id="hubFuri">ふりがな: ' + (window.Furigana && !Furigana.isOn() ? 'OFF' : 'ON') + '</button></div>';
    root.innerHTML = h;

    root.querySelectorAll('[data-it]').forEach(b => b.onclick = () => launch(all.find(x => x.id === b.dataset.it), null));
    root.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { sfx('click'); keepPos(); cat = b.dataset.cat; buildCat(cat); setPos(0); });
    const on = (id, f) => { const e = document.getElementById(id); if (e) e.onclick = () => { sfx('click'); keepPos(); f(); }; };
    on('hubStory', () => MainStory.open(1));
    on('hubStory2', () => MainStory.open(2));
    on('hubParent', () => ParentReport.open());
    on('hubReview', () => ReviewEngine.open(null, build));
    const hfu = document.getElementById('hubFuri');
    if (hfu) hfu.onclick = () => { sfx('click'); const v = window.Furigana ? Furigana.toggle() : true; hfu.textContent = 'ふりがな: ' + (v ? 'ON' : 'OFF'); };
    const back = document.getElementById('btnHubBack'); if (back) back.style.display = '';
  }

  function buildCat(id) {
    const root = document.getElementById('hubArea'); if (!root) return;
    const c = CATS.find(x => x.id === id); if (!c) { cat = null; return buildMain(); }
    const its = items().filter(x => x.cat === id), S = seen();
    let h = '<div class="hub-cat-head" style="--dc:' + c.col + ';background-image:url(' + c.img + ')"><div class="hub-cat-shade"></div><button class="hub-cat-back" id="hubCatBack" data-back>← 事務所</button><div class="hub-cat-title"><span>' + c.icon + '</span><h1>' + c.name + '</h1><p>' + c.sub + '</p></div></div>';
    if (id === 'cases') {
      h += '<section class="hub-cases">';
      its.forEach(it => {
        const pct = it.total ? Math.round(it.n * 100 / it.total) : 0;
        h += '<button class="hub-case" data-it="' + it.id + '"><div class="hub-case-cover" style="background-image:url(' + it.cover + ')">' + (it.n === it.total && it.total ? '<span class="hub-case-done">COMPLETE</span>' : '') + (!S[it.id] ? '<span class="hub-tag on-cover">NEW</span>' : '') + '</div>';
        h += '<div class="hub-case-body"><div class="hub-case-name"><span>' + it.icon + '</span>' + esc(it.name) + '</div><div class="hub-case-bar"><i style="width:' + pct + '%"></i></div><div class="hub-case-num">' + it.n + ' / ' + it.total + ' 事件</div></div></button>';
      });
      h += '</section>';
    } else {
      const grps = [...new Set(its.map(x => x.grp || ''))];
      grps.forEach(g => {
        if (g) h += '<h2 class="hub-h small">' + esc(g) + '</h2>';
        h += '<section class="hub-tiles">';
        its.filter(x => (x.grp || '') === g).forEach(it => { h += '<button class="hub-tile" data-it="' + it.id + '" style="--dc:' + c.col + '">' + ico(it) + '<span class="hub-tile-body"><b>' + esc(it.name) + (!S[it.id] ? '<em class="hub-tag">NEW</em>' : '') + '</b><small>' + esc(safe(it.sub, '')) + '</small></span><span class="hub-tile-go">›</span></button>'; });
        h += '</section>';
      });
    }
    root.innerHTML = h;
    root.querySelectorAll('[data-it]').forEach(b => b.onclick = () => launch(its.find(x => x.id === b.dataset.it), id));
    document.getElementById('hubCatBack').onclick = () => { sfx('click'); keepPos(); const from = cat; cat = null; buildMain(); setPos(POS.main != null ? POS.main : panelTop(from)); };
    const back = document.getElementById('btnHubBack'); if (back) back.style.display = 'none';
  }

  // 메인 화면에서 그 카테고리 칸이 있는 위치
  function panelTop(id) { const p = hubPage(), b = p && p.querySelector('.hub-panel-head[data-cat="' + id + '"]'); return b ? Math.max(0, b.closest('.hub-panel').offsetTop - 12) : 0; }

  function open() {
    const y = POS[cat || 'main'] || 0;
    build();
    showPage('pageHub');
    setPos(y);
    try { if (Badges.check().length) setTimeout(build, 100); } catch (e) {}
  }
  function home() { cat = null; POS.main = 0; open(); }

  return { build: build, open: open, home: home, openList: openList, _cases: cases, _items: items };
})();
