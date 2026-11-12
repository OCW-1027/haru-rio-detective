/* engine/hub.js — v2 P4: 허브 화면 「ハル探偵事務所」
 * 상단 탭 18개 대신, 사무소 화면에서 시리즈·학습·게임으로 들어간다.
 * 기존 pageSelect(시리즈별 사건 목록)와 switchTab 은 그대로 재사용한다.
 * Dependencies: State, CaseEngine, GameV2, ReviewEngine, switchTab, showPage, sfx, escapeHtml,
 *               CHAR_IMAGES, SCENE_IMAGES, STORY, SCIENTISTS_STORY
 */
const Hub = (function () {
  const KORADON = 'assets/img/chars/spirits/koradon_idle_01.webp';
  const KORARIN = 'assets/img/chars/spirits/korarin_idle_01.webp';

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

  // 학습·게임
  const STUDY = [
    { id: 'eiken', icon: '🥋', name: '英検道場', sub: '2級·準1級 単語·リスニング·作文', go: () => Eiken.open(), hot: true },
    { id: 'newsbox', icon: '📰', name: '英語ニュース', sub: '海外の 子ども ニュース · 単語メモ クイズ', go: () => NewsBox.open(), hot: true },
    { id: 'eng', icon: '🔤', name: '英語', sub: '単語·文法·作文 (前からの 練習)', go: () => openList('eng', '🔤 英語') },
    { id: 'quiz', icon: '🧠', name: 'クイズ', sub: 'ニュース·熟語 クイズ', go: () => openList('quiz', '🧠 クイズ') },
    { id: 'weaLearn', icon: '📚', name: '気象 試験対策', sub: '気象予報士の 学習資料', go: () => openWeaLearn() },
    { id: 'mathLearn', icon: '📐', name: '算数 試験対策', sub: '公式·図解·過去問', go: () => openMathLearn() },
    { id: 'game', icon: '🎮', name: 'ゲーム', sub: 'がんばった ごほうび', go: () => openList('game', '🎮 ゲーム') },
  ];

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

  function build() {
    const root = document.getElementById('hubArea');
    if (!root) return;
    const list = cases();
    let solved = 0, total = 0;
    list.forEach(c => { solved += countCleared(c.cleared, c.total); total += c.total; });
    const due = ReviewEngine.dueCount();
    const last = list.find(c => c.tab === State.currentTab);

    let h = '';
    // 사무소 배너
    h += '<section class="hub-hero" style="background-image:url(' + SCENE_IMAGES.library + ')">';
    h += '<div class="hub-hero-shade"></div>';
    h += '<div class="hub-hero-text"><div class="hub-hero-kicker">ハル&リオの</div><h1 class="hub-hero-title">探偵事務所</h1>';
    h += '<div class="hub-hero-stats"><span>🗂 解決した 事件 <b>' + solved + '</b> / ' + total + '</span>';
    if (due) h += '<span>🔁 復習 <b>' + due + '</b>問</span>';
    h += '</div></div>';
    h += '<img class="hub-hero-char haru" src="' + CHAR_IMAGES.haru + '" alt="">';
    h += '<img class="hub-hero-char rio" src="' + CHAR_IMAGES.rio + '" alt="">';
    h += '<img class="hub-hero-spirit kd" src="' + KORADON + '" alt="">';
    h += '<img class="hub-hero-spirit kr" src="' + KORARIN + '" alt="">';
    h += '</section>';

    // 오늘 할 일
    h += '<section class="hub-today">';
    if (last) {
      h += '<button class="hub-today-btn" data-case="' + last.tab + '"><span class="hub-today-icon">' + last.icon + '</span><span><small>つづきから</small>' + escapeHtml(last.name) + '</span></button>';
    }
    if (due) {
      h += '<button class="hub-today-btn review" id="hubReview"><span class="hub-today-icon">🔁</span><span><small>コラリンの 復習</small>まちがえた 問題 ' + due + '問</span></button>';
    }
    let nbs = null; try { nbs = NewsBox.stats(); } catch (e) {}
    h += '<button class="hub-today-btn news" id="hubNewsBox"><span class="hub-today-icon">📰</span><span><small>' + (nbs && nbs.today ? '✅ 今日の ニュース 読んだ' : '今日の 英語ニュース') + '</small>英語ニュースBOX' + (nbs ? ' · 単語 ' + nbs.words + '語' : '') + '</span></button>';
    h += '</section>';

    // 메인 스토리
    const sg = (State.v2 && State.v2.story && State.v2.story.got) ? Object.keys(State.v2.story.got).length : 0;
    h += '<button class="hub-story" id="hubStory"><span class="hub-story-k">メインストーリー シーズン1</span><b>📖 知のカケラ — 怪盗ブランクを 追え</b><span class="hub-story-bar"><span style="width:' + (sg / 12 * 100) + '%"></span></span><small>取りもどした カケラ ' + sg + ' / 12' + (sg >= 10 ? ' · ⚔ 幹部ゼロが 待っている' : '') + '</small></button>';

    // シーズン2
    let jts = null; try { jts = JapanTrip.stats(); } catch (e) {}
    h += '<h2 class="hub-h">🌸 シーズン2 <small class="hub-h-sub">新しい 冒険が 始まる</small></h2>';
    const s2g = (State.v2 && State.v2.story && State.v2.story.s2 && State.v2.story.s2.got) ? Object.keys(State.v2.story.s2.got).length : 0;
    h += '<button class="hub-story s2" id="hubStory2"><span class="hub-story-k">メインストーリー シーズン2</span><b>📖 白紙の ページ — 怪盗ブランクの 正体</b><span class="hub-story-bar"><span style="width:' + (s2g / 6 * 100) + '%"></span></span><small>真実の カケラ ' + s2g + ' / 6</small></button>';
    h += '<section class="hub-new">';
    h += '<button class="hub-new-btn s2" id="hubJapan"><span style="font-size:44px">🗾</span><span><b>日本列島ミステリー紀行<span class="tag">NEW</span></b><small>47都道府県を 推理で 追え · 解決 ' + (jts ? jts.cleared : 0) + ' / 6 · 図鑑 ' + (jts ? jts.seen : 0) + ' / 47</small></span></button>';
    let tts = null; try { tts = TimeTravel.stats(); } catch (e) {}
    h += '<button class="hub-new-btn s2" id="hubTime"><span style="font-size:44px">⏳</span><span><b>タイムトラベル探偵<span class="tag">NEW</span></b><small>縄文〜令和を 追跡 · 時のゆがみ 探し · 年表 並べかえ · 解決 ' + (tts ? tts.cleared : 0) + ' / 6</small></span></button>';
    let cls = null; try { cls = CodeLab.stats(); } catch (e) {}
    h += '<button class="hub-new-btn s2" id="hubCode"><span style="font-size:44px">🔐</span><span><b>暗号解読局<span class="tag">NEW</span></b><small>シーザー暗号・数列・モールス・うそつきパズル · 解決 ' + (cls ? cls.cleared : 0) + ' / 6</small></span></button>';
    let nds = null; try { nds = NewsDetective.stats(); } catch (e) {}
    h += '<button class="hub-new-btn s2" id="hubNews2"><span style="font-size:44px">📰</span><span><b>ニュース探偵<span class="tag">NEW</span></b><small>グラフの わな・事実と 意見・相関と 因果を 見ぬけ · 解決 ' + (nds ? nds.cleared : 0) + ' / 6</small></span></button>';
    let kcs = null; try { kcs = KidsCourt.stats(); } catch (e) {}
    h += '<button class="hub-new-btn s2" id="hubCourt"><span style="font-size:44px">⚖</span><span><b>こども裁判所<span class="tag">NEW</span></b><small>証言の むじゅんを 証拠で つけ「異議あり!」· 法と 権利 · 解決 ' + (kcs ? kcs.cleared : 0) + ' / 5</small></span></button>';
    h += '</section>';

    // 새 콘텐츠 (시즌1)
    const wd = (State.v2 && State.v2.world && State.v2.world.cleared) || {};
    h += '<h2 class="hub-h">✨ シーズン1の 冒険</h2><section class="hub-new">';
    h += '<button class="hub-new-btn" id="hubWorld"><img src="' + KORADON + '" alt=""><span><b>✈ コラドン航空 世界追跡<span class="tag">NEW</span></b><small>怪盗を 追って 世界を 飛ぼう · 解決 ' + Object.keys(wd).length + ' / 6</small></span></button>';
    const wxd = (State.v2 && State.v2.wx) || {};
    h += '<button class="hub-new-btn" id="hubWx"><img src="' + KORARIN + '" alt=""><span><b>🌤 お天気予報チャレンジ<span class="tag">NEW</span></b><small>本物の データで あしたを 予報 · 記録 ' + ((wxd.done || []).length) + '回</small></span></button>';
    const lbd = (State.v2 && State.v2.lab && State.v2.lab.cleared) || {};
    h += '<button class="hub-new-btn" id="hubLab"><span style="font-size:44px">🧪</span><span><b>ラボ探偵<span class="tag">NEW</span></b><small>実験で トリックを 見ぬけ · 解決 ' + Object.keys(lbd).length + ' / ' + (typeof LabDetective !== 'undefined' ? LabDetective._cases.length : 5) + '</small></span></button>';
    const imd = (State.v2 && State.v2.indian && State.v2.indian.t) || {};
    h += '<button class="hub-new-btn" id="hubIndian"><span style="font-size:44px">🇮🇳</span><span><b>インド式 計算道場<span class="tag">NEW</span></b><small>' + (typeof IM !== 'undefined' ? IM.T.length : 26) + 'の ワザ · 4コース 検定 · ★ ' + Object.keys(imd).reduce((a, k) => a + (imd[k].stars || 0), 0) + ' / ' + (typeof IM !== 'undefined' ? IM.T.length * 3 : 78) + '</small></span></button>';
    const mwd = (State.v2 && State.v2.mw) || {};
    h += '<button class="hub-new-btn" id="hubElem"><span style="font-size:44px">🎒</span><span><b>小学 算数 ラダー<span class="tag">NEW</span></b><small>4年 〜 6年 · ' + (typeof ELAD !== 'undefined' ? ELAD.U.length : 25) + ' 単元 · 図つき 詳しい 解説</small></span></button>';
    h += '<button class="hub-new-btn" id="hubMathWorld"><span style="font-size:44px">🌏</span><span><b>世界の 算数道場<span class="tag">NEW</span></b><small>中学・高校 数学ラダー · シンガポール式 · ロシア式 · 公式図鑑</small></span></button>';
    let wqs = null; try { wqs = WorldQuiz.stats(); } catch (e) {}
    h += '<button class="hub-new-btn" id="hubWQ"><span style="font-size:44px">🌐</span><span><b>世界の 国 クイズ<span class="tag">NEW</span></b><small>237の 国・地域と 首都を 4択で 全部 制覇 · 覚えた ' + (wqs ? wqs.map : 0) + ' / ' + (wqs ? wqs.total : 237) + '</small></span></button>';
    h += '<button class="hub-new-btn" id="hubSciLad"><span style="font-size:44px">🔬</span><span><b>理科・社会 ラダー<span class="tag">NEW</span></b><small>中学〜高校 · 物理・化学・生物・地学・歴史・地理・公民</small></span></button>';
    h += '</section>';

    // 사건 파일
    h += '<h2 class="hub-h">🗂 事件ファイル</h2><section class="hub-cases">';
    list.forEach(c => {
      const n = countCleared(c.cleared, c.total);
      const pct = c.total ? Math.round(n * 100 / c.total) : 0;
      h += '<button class="hub-case" data-case="' + c.tab + '">';
      h += '<div class="hub-case-cover" style="background-image:url(' + c.cover + ')">' + (n === c.total && c.total ? '<span class="hub-case-done">COMPLETE</span>' : '') + '</div>';
      h += '<div class="hub-case-body"><div class="hub-case-name"><span>' + c.icon + '</span>' + escapeHtml(c.name) + '</div>';
      h += '<div class="hub-case-bar"><i style="width:' + pct + '%"></i></div>';
      h += '<div class="hub-case-num">' + n + ' / ' + c.total + ' 事件</div></div>';
      h += '</button>';
    });
    h += '</section>';

    // 학습·게임
    h += '<h2 class="hub-h">📚 学習室</h2><section class="hub-study">';
    STUDY.forEach(s => {
      let sub = s.sub;
      if (s.id === 'newsbox') { try { const ns = NewsBox.stats(); sub = (ns.today ? '✅ 今日 読んだ' : '📮 今日の ニュース') + ' · 単語 ' + ns.words + '語' + (ns.streak > 1 ? ' · 連続 ' + ns.streak + '日' : ''); } catch (e) {} }
      h += '<button class="hub-study-btn' + (s.hot ? ' hot' : '') + '" data-study="' + s.id + '"><span class="hub-study-icon">' + s.icon + '</span><span class="hub-study-name">' + s.name + '</span><span class="hub-study-sub">' + sub + '</span></button>';
    });
    h += '</section>';
    let bgot = 0, ball = 0;
    try { const bs = Badges.status(), BS = (State.v2 || {}).badges || {}; ball = bs.length; bgot = bs.filter(b => b.ok || BS[b.id]).length; } catch (e) {}
    h += '<div class="hub-foot">' + (ball ? '<button class="hub-parent hub-badge" id="hubBadges">🏅 バッジ 図鑑 <b>' + bgot + '</b> / ' + ball + '</button>' : '') + '<button class="hub-parent" id="hubParent">👪 保護者レポート</button><button class="hub-parent no-furi" id="hubFuri">ふりがな: ' + (window.Furigana && !Furigana.isOn() ? 'OFF' : 'ON') + '</button></div>';
    root.innerHTML = h;

    root.querySelectorAll('[data-case]').forEach(b => {
      b.onclick = () => {
        sfx('click');
        const c = list.find(x => x.tab === b.dataset.case);
        openList(c.tab, c.icon + ' ' + c.name);
      };
    });
    root.querySelectorAll('[data-study]').forEach(b => {
      b.onclick = () => { sfx('click'); STUDY.find(s => s.id === b.dataset.study).go(); };
    });
    const hs2 = document.getElementById('hubStory2');
    if (hs2) hs2.onclick = () => { sfx('click'); MainStory.open(2); };
    const hs = document.getElementById('hubStory');
    if (hs) hs.onclick = () => { sfx('click'); MainStory.open(1); };
    const hnb = document.getElementById('hubNewsBox');
    if (hnb) hnb.onclick = () => { sfx('click'); NewsBox.open(); };
    const hi = document.getElementById('hubIndian');
    if (hi) hi.onclick = () => { sfx('click'); IndianMath.open(); };
    const hpr = document.getElementById('hubParent');
    if (hpr) hpr.onclick = () => { sfx('click'); ParentReport.open(); };
    const hfu = document.getElementById('hubFuri');
    if (hfu) hfu.onclick = () => { sfx('click'); const v = window.Furigana ? Furigana.toggle() : true; hfu.textContent = 'ふりがな: ' + (v ? 'ON' : 'OFF'); };
    const hbg = document.getElementById('hubBadges');
    if (hbg) hbg.onclick = () => { sfx('click'); Badges.open(); };
    const hwq = document.getElementById('hubWQ');
    if (hwq) hwq.onclick = () => { sfx('click'); WorldQuiz.open(); };
    const hsl = document.getElementById('hubSciLad');
    if (hsl) hsl.onclick = () => { sfx('click'); MathWorld.open('sci'); };
    const hel = document.getElementById('hubElem');
    if (hel) hel.onclick = () => { sfx('click'); MathWorld.open('elem'); };
    const hmw = document.getElementById('hubMathWorld');
    if (hmw) hmw.onclick = () => { sfx('click'); MathWorld.open(); };
    const hl = document.getElementById('hubLab');
    if (hl) hl.onclick = () => { sfx('click'); LabDetective.open(); };
    const hx = document.getElementById('hubWx');
    if (hx) hx.onclick = () => { sfx('click'); WeatherChallenge.open(); };
    const hkc = document.getElementById('hubCourt');
    if (hkc) hkc.onclick = () => { sfx('click'); KidsCourt.open(); };
    const hnd = document.getElementById('hubNews2');
    if (hnd) hnd.onclick = () => { sfx('click'); NewsDetective.open(); };
    const hcl = document.getElementById('hubCode');
    if (hcl) hcl.onclick = () => { sfx('click'); CodeLab.open(); };
    const htt = document.getElementById('hubTime');
    if (htt) htt.onclick = () => { sfx('click'); TimeTravel.open(); };
    const hjp = document.getElementById('hubJapan');
    if (hjp) hjp.onclick = () => { sfx('click'); JapanTrip.open(); };
    const hw = document.getElementById('hubWorld');
    if (hw) hw.onclick = () => { sfx('click'); WorldChase.open(); };
    const rv = document.getElementById('hubReview');
    if (rv) rv.onclick = () => { sfx('click'); ReviewEngine.open(null, build); };
  }

  function open() {
    build();
    showPage('pageHub');
    const page = document.getElementById('pageHub');
    if (page) page.scrollTop = 0;
    try { if (Badges.check().length) setTimeout(build, 100); } catch (e) {}
  }

  return { build: build, open: open, openList: openList, _cases: cases };
})();
