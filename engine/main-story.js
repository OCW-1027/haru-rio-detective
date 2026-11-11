/* engine/main-story.js — メインストーリー シーズン1「知のカケラ」
 * 知の世界地図 (12地域): カケラの 光 (条件の 進み具合) が 満ちたら タップで 回収 → 会話 → 地域に 色が もどる。
 * 回収した カケラには 怪盗ブランクの メモカード。10枚で 幹部ゼロとの 対決 (5つの 試練: 英語·算数·地理·科学·推理)。
 * 画面: pageStoryMain (#msArea). 保存: State.v2.story = { seen: {prologue}, got: {id: 1}, boss: {won, tries}, s2: {seen, got, boss} }
 * シーズン2「白紙の ページ」(data/main-story-s2.js): 6つの 真実の カケラ → 怪盗ブランク (シロ) との 最終決戦 → 和解
 * 絵: 表情・ポーズの 絵 (assets/img/chars/expr/…, chars/spirits/…) が あれば 使い、なければ 今の 絵
 * Dependencies: MAIN_STORY, State, saveState, showPage, sfx, escapeHtml, CaseEngine, CHAR_IMAGES, SCENE_IMAGES,
 *               SCIENTISTS_STORY, EIKEN_G2_PART1, IM, WORLD_CITIES, WorldChase
 */
const MainStory = (function () {
  const pick = a => a[Math.floor(Math.random() * a.length)];
  const SP = 'assets/img/chars/spirits/';
  let timers = [], curB = null;
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  function area() { return $('msArea'); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.story || (State.v2.story = {}); d.seen = d.seen || {}; d.got = d.got || {}; d.boss = d.boss || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function stop() { timers.forEach(t => clearTimeout(t)); timers = []; }
  function art(src, fb, cls) { return '<span class="art-w ' + (cls || '') + '"><img class="art-main" src="' + src + '" alt="" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"><span class="art-fb">' + (fb || '') + '</span></span>'; }

  // ---------- 進み具合 ----------
  const cnt = a => (a || []).filter(Boolean).length;
  function caseCleared(k) { try { const e = CaseEngine.get(k); return e ? cnt(State[e.cfg.clearedKey]) : 0; } catch (e) { return 0; } }
  function v2(k) { return (State.v2 && State.v2[k]) || {}; }
  function eikenCount() { const e = v2('eiken'); const n = o => Object.keys(o || {}).length; return n(e.srs) + 2 * (n(e.listen) + n(e.p1) + n(e.p_listen) + n(e.pp1)); }
  function imStars() { const t = v2('indian').t || {}; return Object.keys(t).reduce((a, k) => a + (t[k].stars || 0), 0); }
  // [現在, 目標] の 組 (どれか 1つ 満たせば OK)
  const COND = {
    suiri: () => [[cnt(State.cleared), 3]],
    kagaku: () => [[caseCleared('science'), 3], [Object.keys(v2('lab').cleared || {}).length, 2]],
    ijin: () => [[cnt(State.scientistsCleared), 3]],
    kisho: () => [[caseCleared('wea'), 3], [(v2('wx').done || []).length, 2]],
    sansu: () => [[caseCleared('math'), 3], [imStars(), 6]],
    chiri: () => [[caseCleared('world'), 3], [Object.keys(v2('world').cleared || {}).length, 2]],
    shakai: () => [[caseCleared('soc'), 3]],
    rekishi: () => [[caseCleared('hist'), 3]],
    okane: () => [[caseCleared('mon'), 3]],
    biz: () => [[caseCleared('biz'), 3]],
    geijutsu: () => [[caseCleared('lit'), 3]],
    eigo: () => [[eikenCount(), 60]],
  };
  function progress(f) { const c = COND[f.id](); return Math.min(1, Math.max(...c.map(x => x[0] / x[1]))); }
  function cover(f) {
    const ce = k => { try { return CaseEngine.get(k).cfg.story[0].illustration; } catch (e) { return ''; } };
    return ({ suiri: SCENE_IMAGES.schoolGate, kagaku: ce('science'), ijin: (typeof SCIENTISTS_STORY !== 'undefined' ? SCIENTISTS_STORY[0].illustration : ''), kisho: ce('wea'), sansu: ce('math'), chiri: ce('world'), shakai: ce('soc'), rekishi: ce('hist'), okane: ce('mon'), biz: ce('biz'), geijutsu: ce('lit'), eigo: 'assets/img/world/cities/london.webp' })[f.id] || SCENE_IMAGES.library;
  }
  const gotN = () => Object.keys(data().got).length;

  // ---------- 立ち絵 ----------
  const BLANK_SVG = '<svg viewBox="0 0 100 120" class="ms-blank"><path d="M50 4 L58 30 L42 30 Z" fill="#3a3550"/><ellipse cx="50" cy="52" rx="30" ry="27" fill="#2c2840"/><path d="M22 58 Q8 100 24 116 L76 116 Q92 100 78 58 Z" fill="#231f35"/><rect x="30" y="44" width="40" height="12" rx="6" fill="#f2f2f2"/><circle cx="41" cy="50" r="3" fill="#2c2840"/><circle cx="59" cy="50" r="3" fill="#2c2840"/><circle cx="50" cy="92" r="9" fill="none" stroke="#8a86a0" stroke-dasharray="2 2"/></svg>';
  function portrait(who, pose) {
    if (who === 'haru') return art('assets/img/chars/expr/haru_' + (pose || 'happy') + '.webp', '<img src="' + CHAR_IMAGES.haru + '" alt="">', 'ms-pt boy');
    if (who === 'rio') return art('assets/img/chars/expr/rio_' + (pose || 'calm') + '.webp', '<img src="' + CHAR_IMAGES.rio + '" alt="">', 'ms-pt boy');
    if (who === 'kd') return art(SP + 'koradon_' + (pose || 'idle2') + '.webp', '<img src="' + SP + 'koradon_greet_01.webp" alt="">', 'ms-pt sp');
    if (who === 'kr') return art(SP + 'korarin_' + (pose || 'idle2') + '.webp', '<img src="' + SP + 'korarin_greet_01.webp" alt="">', 'ms-pt sp');
    if (who === 'bl') return art(SP + 'blank_villain.webp', BLANK_SVG, 'ms-pt sp dark');
    if (who === 'zero') return art('assets/img/world/gang/zero.webp', '<span class="ms-emo">🎩</span>', 'ms-pt boy');
    return '';
  }
  const NAME = { haru: 'ハル', rio: 'リオ', kd: 'コラドン', kr: 'コラリン', bl: '怪盗ブランク', zero: 'ゼロ', nar: '' };

  // ---------- 会話 ----------
  function talk(lines, title, done) {
    stop();
    let i = 0;
    const draw = () => {
      const [who, pose, text] = lines[i];
      let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">' + esc(title) + '</div><button class="ms-skip" id="msSkip">スキップ ▶▶</button></div>';
      h += '<div class="ms-stage' + (who === 'bl' || who === 'zero' ? ' night' : '') + '" style="--g:' + (1 - gotN() / 12).toFixed(2) + '"><div class="ms-bg" style="background-image:url(\'' + SCENE_IMAGES.library + '\')"></div>' + (who !== 'nar' ? '<div class="ms-ptwrap ' + (who === 'haru' || who === 'kd' ? 'left' : 'right') + '">' + portrait(who, pose) + '</div>' : '') + '</div>';
      h += '<button class="ms-box' + (who === 'nar' ? ' nar' : '') + '" id="msNext">' + (NAME[who] ? '<b>' + NAME[who] + '</b>' : '') + '<span>' + esc(text) + '</span><small>' + (i + 1) + ' / ' + lines.length + ' ▼</small></button>';
      area().innerHTML = h;
      $('msBack').onclick = () => { sfx('click'); map(); };
      $('msSkip').onclick = () => { sfx('click'); done(); };
      $('msNext').onclick = () => { sfx('click'); i++; if (i >= lines.length) done(); else draw(); };
    };
    draw();
  }

  // ---------- 知の 世界地図 ----------
  let season = 1;
  function map(flash) {
    if (season === 2 && MAIN_STORY.s2) return mapS2(flash);
    stop();
    const D = data(), F = MAIN_STORY.frags, n = gotN();
    if (!D.seen.prologue) { D.seen.prologue = 1; save(); return talk(MAIN_STORY.prologue, 'プロローグ', () => map()); }
    let h = (MAIN_STORY.s2 ? seasonTabs(1) : '') + '<div class="ms-hero"><div><div class="ms-kicker">メインストーリー シーズン1</div><h1 class="ms-h1">知のカケラ</h1><div class="ms-bar"><div style="width:' + (n / 12 * 100) + '%"></div></div><p>取りもどした カケラ <b>' + n + '</b> / 12</p></div>' + portrait('kr', n >= 10 ? 'happy' : 'card') + '</div>';
    if (flash) h += '<div class="ms-flash">' + flash + '</div>';
    h += '<div class="ms-map">';
    F.forEach(f => {
      const got = D.got[f.id], p = progress(f), ready = !got && p >= 1;
      h += '<button class="ms-tile' + (got ? ' got' : ready ? ' ready' : '') + '" data-f="' + f.id + '" style="--fc:' + f.color + '"><span class="ms-img" style="background-image:url(\'' + cover(f) + '\')"></span>' +
        '<span class="ms-tl"><b>' + f.icon + ' ' + esc(f.name) + '</b><small>' + (got ? '✨ 回収ずみ' : ready ? '💡 タップで 回収!' : esc(f.need)) + '</small>' + (got ? '' : '<span class="ms-pg"><span style="width:' + Math.round(p * 100) + '%"></span></span>') + '</span></button>';
    });
    h += '</div>';
    const bossOk = n >= 10;
    h += '<button class="ms-boss' + (bossOk ? '' : ' off') + '" id="msBoss">' + portrait('zero') + '<span><b>' + (D.boss.won ? '🏆 ゼロに 勝利' : '⚔ 幹部 ゼロとの 対決') + '</b><small>' + (bossOk ? (D.boss.won ? 'もう一度 挑戦できる' : '5つの 試練 · まちがいは 3回まで') : 'カケラ 10こで 出現 (あと ' + (10 - n) + ')') + '</small></span></button>';
    h += '<div class="ms-row"><button class="ms-sec" id="msNotes">🃏 ブランクの カード (' + Object.keys(D.got).length + ')</button><button class="ms-sec" id="msPro">📜 プロローグ</button></div>';
    area().innerHTML = h;
    bindSeasons();
    area().querySelectorAll('[data-f]').forEach(b => b.onclick = () => { sfx('click'); tile(F.find(f => f.id === b.dataset.f)); });
    $('msBoss').onclick = () => { if (!bossOk) { sfx('wrong'); return; } sfx('click'); talk(MAIN_STORY.bossIntro, '幹部 ゼロ', boss); };
    $('msNotes').onclick = () => { sfx('click'); notes(); };
    $('msPro').onclick = () => { sfx('click'); talk(MAIN_STORY.prologue, 'プロローグ', () => map()); };
  }
  function tile(f) {
    const D = data(), p = progress(f);
    if (D.got[f.id]) return fragView(f);
    if (p < 1) {
      const c = COND[f.id]();
      let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">' + f.icon + ' ' + esc(f.name) + 'の カケラ</div></div>';
      h += '<div class="ms-card gray"><span class="ms-img" style="background-image:url(\'' + cover(f) + '\')"></span></div>';
      h += '<div class="ms-boxw"><div class="ms-talk">' + portrait('kd', 'hint') + '<div><b>コラドン</b><p>この カケラは まだ 光が 弱いよ。<br>' + esc(f.need) + 'で 取りもどせる!</p>' + c.map(x => '<div class="ms-cond"><span class="ms-pg"><span style="width:' + Math.min(100, Math.round(x[0] / x[1] * 100)) + '%"></span></span> ' + Math.min(x[0], x[1]) + ' / ' + x[1] + '</div>').join('') + '</div></div></div>';
      area().innerHTML = h; $('msBack').onclick = () => { sfx('click'); map(); };
      return;
    }
    talk(f.lines, f.name + 'の カケラ', () => {
      D.got[f.id] = 1; save(); sfx('unlock');
      fragView(f, true);
    });
  }
  function fragView(f, fresh) {
    let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">' + f.icon + ' ' + esc(f.name) + 'の カケラ</div></div>';
    h += '<div class="ms-card' + (fresh ? ' bloom' : '') + '"><span class="ms-img" style="background-image:url(\'' + cover(f) + '\')"></span><span class="ms-gem" style="--fc:' + f.color + '">' + f.icon + '</span></div>';
    h += '<div class="ms-boxw"><div class="ms-lesson">📖 知の ことば<br><b>' + esc(f.lesson) + '</b></div></div>';
    h += '<div class="ms-note"><div class="ms-note-h">🃏 カケラの そばに 落ちていた 白い カード</div><p>「' + esc(f.note) + '」</p><small>— B</small></div>';
    h += '<button class="ms-pri" id="msOk">地図へ もどる</button>';
    area().innerHTML = h;
    $('msBack').onclick = $('msOk').onclick = () => { sfx('click'); map(fresh ? '✨ ' + f.area + 'に 色が もどった!' + (gotN() === 10 ? ' …だれかが 近づいてくる気配が する。' : '') : ''); };
  }
  function notes() {
    const D = data();
    let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">🃏 ブランクの カード</div></div>';
    h += '<p class="ms-small">カケラを 取りもどすたびに 見つかる、怪盗ブランクの 白い カード。並べて 読むと…?</p>';
    MAIN_STORY.frags.forEach((f, i) => { h += '<div class="ms-note sm' + (D.got[f.id] ? '' : ' locked') + '"><span>' + (i + 1) + '</span><p>' + (D.got[f.id] ? '「' + esc(f.note) + '」' : '? ? ?') + '</p></div>'; });
    if (Object.keys(D.got).length >= 6) h += '<div class="ms-boxw"><div class="ms-talk">' + portrait('haru', 'thinking') + '<div><b>ハル</b><p>ブランクは「知らない」ことが こわくて、ひとりぼっちだったのかも しれない…。</p></div></div></div>';
    area().innerHTML = h; $('msBack').onclick = () => { sfx('click'); map(); };
  }

  // ---------- ボス戦: 幹部ゼロ ----------
  const TRAIT = { hat: { top: 'シルクハット', beret: 'ベレー帽' }, acc: { scarf: 'しまもようの マフラー', glasses: '丸い メガネ' }, cape: { red: 'ワインレッドの マント', navy: '紺色の マント' } };
  function bossQs() {
    const S = [];
    // 1 英語 (英検2級 大問1)
    const E = shuffle(typeof EIKEN_G2_PART1 !== 'undefined' ? EIKEN_G2_PART1 : []).slice(0, 3);
    S.push({ name: '英語の 試練', icon: '🔤', qs: E.map(it => ({ q: it.q, opts: it.options, a: it.answer, exp: it.exp || '' })) });
    // 2 算数 (インド式)
    const T = IM.T.filter(t => t.ans === 'num' && t.course !== 'tatsujin');
    S.push({ name: '算数の 試練', icon: '🔢', qs: shuffle(T).slice(0, 3).map(t => {
      const ex = t.make(t.rand(1)), a = ex.a, ds = new Set([a]);
      [a + 10, a - 10, a + 1, a - 1, a + 100, a + 9].forEach(v => { if (ds.size < 4 && v > 0) ds.add(v); });
      const opts = shuffle([...ds]);
      return { q: ex.q + ' = ?', opts: opts.map(String), a: opts.indexOf(a), exp: t.name + ': ' + t.short };
    }) });
    // 3 地理 (世界追跡の 都市)
    const C = shuffle(WORLD_CITIES).slice(0, 3);
    S.push({ name: '地理の 試練', icon: '🌍', qs: C.map(c => {
      const pool = shuffle(WORLD_CITIES.filter(x => x.country !== c.country && x.cur !== c.cur && x.sight !== c.sight)).slice(0, 3);
      const opts = shuffle([c].concat(pool));
      return { q: '通貨が「' + c.cur + '」で、' + c.sight + 'が ある 都市は?', opts: opts.map(x => x.name), a: opts.indexOf(c), exp: c.name + ' (' + c.country + ') — ' + c.fact };
    }) });
    // 4 科学
    S.push({ name: '科学の 試練', icon: '🔬', qs: shuffle(MAIN_STORY.science).slice(0, 3).map(([q, o]) => { const opts = shuffle(o); return { q: q, opts: opts, a: opts.indexOf(o[0]), exp: '答え: ' + o[0] }; }) });
    // 5 推理 (ブランク団の 団員)
    const G = WorldChase._gang, m = shuffle(G)[0], others = shuffle(G.filter(g => g !== m)).slice(0, 3), opts = shuffle([m].concat(others));
    S.push({ name: '推理の 試練', icon: '🕵', qs: [{ q: '目撃情報: 「' + TRAIT.hat[m.hat] + '・' + TRAIT.acc[m.acc] + '・' + TRAIT.cape[m.cape] + '」。この 団員は だれ? (世界追跡の 団員ファイルを 思い出そう)', opts: opts.map(g => g.name), a: opts.indexOf(m), exp: m.name + ' — ' + m.who }] });
    return S;
  }
  // 対決 (共通): cfg = { S: 試練[], who: 立ち絵, name: 名前, lose: セリフ, onWin: fn }
  function battle(cfg) {
    stop();
    const S = cfg.S, maxHp = S.reduce((a, s) => a + s.qs.length, 0);
    const B = { S: S, si: 0, qi: 0, hp: maxHp, maxHp: maxHp, life: 3 }; curB = B;
    const ask = () => {
      const st = B.S[B.si], Q = st.qs[B.qi];
      let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">⚔ ' + cfg.name + ' — ' + st.icon + ' ' + st.name + ' (' + (B.si + 1) + '/' + B.S.length + ')</div></div>';
      h += '<div class="ms-bossbar">' + portrait(cfg.who) + '<div><div class="ms-hp"><div style="width:' + (B.hp / B.maxHp * 100) + '%"></div></div><small>' + cfg.short + ' HP ' + B.hp + ' / ' + B.maxHp + '</small><div class="ms-life">' + '❤'.repeat(B.life) + '🤍'.repeat(3 - B.life) + '</div></div></div>';
      h += '<div class="ms-boxw ms-q"><p>' + esc(Q.q) + '</p><div class="ms-opts">' + Q.opts.map((o, i) => '<button data-o="' + i + '">' + esc(o) + '</button>').join('') + '</div><div id="msFb"></div></div>';
      area().innerHTML = h; $('msBack').onclick = () => { sfx('click'); map(); };
      let done = false;
      area().querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
        if (done) return; done = true;
        const ok = +b.dataset.o === Q.a;
        area().querySelectorAll('[data-o]').forEach(x => { x.disabled = true; if (+x.dataset.o === Q.a) x.classList.add('ok'); });
        if (ok) { sfx('unlock'); B.hp--; } else { sfx('wrong'); b.classList.add('ng'); B.life--; }
        $('msFb').innerHTML = '<div class="' + (ok ? 'ms-good' : 'ms-bad') + '">' + (ok ? '⚡ 命中! ' + cfg.short + 'に 1ダメージ' : '💥 はずれ… ハートが 1つ へった') + '</div>' + (Q.exp ? '<p class="ms-small">' + esc(Q.exp) + '</p>' : '') + '<button class="ms-pri" id="msGo">次へ →</button>';
        $('msGo').onclick = () => {
          sfx('click');
          if (B.life <= 0) return talk(cfg.lose, cfg.name, () => map('💪 また 挑戦しよう!'));
          B.qi++; if (B.qi >= st.qs.length) { B.si++; B.qi = 0; }
          if (B.si >= B.S.length) return cfg.onWin();
          if (B.qi === 0) return stageBanner(ask);
          ask();
        };
      });
    };
    const stageBanner = next => {
      const st = B.S[B.si];
      area().innerHTML = '<div class="ms-stagebn"><div class="ms-big">' + st.icon + '</div><h2>試練 ' + (B.si + 1) + ' : ' + st.name + '</h2><p>' + st.qs.length + '問</p></div>';
      timers.push(setTimeout(next, 1100));
    };
    stageBanner(ask);
  }
  function boss() {
    const D = data(); D.boss.tries = (D.boss.tries || 0) + 1; save();
    battle({ S: bossQs(), who: 'zero', name: '幹部 ゼロ', short: 'ゼロ', lose: MAIN_STORY.bossLose, onWin: () => {
      MAIN_STORY.frags.forEach(f => { D.got[f.id] = 1; }); D.boss.won = 1; save();
      talk(MAIN_STORY.bossWin, '勝利', () => map('🏆 ゼロに 勝った! 12の カケラが すべて そろった!'));
    } });
  }

  // ================= シーズン2「白紙の ページ」 =================
  function d2() { const D = data(); D.s2 = D.s2 || {}; D.s2.got = D.s2.got || {}; D.s2.seen = D.s2.seen || {}; D.s2.boss = D.s2.boss || {}; return D.s2; }
  const st2 = (k, f) => { try { return f(); } catch (e) { return 0; } };
  const COND2 = {
    s2japan: () => [[st2(0, () => JapanTrip.stats().cleared), 2], [st2(0, () => JapanTrip.stats().seen), 20]],
    s2time: () => [[st2(0, () => TimeTravel.stats().cleared), 2], [((v2('tt').best) || {}).era || 0, 7]],
    s2code: () => [[st2(0, () => CodeLab.stats().cleared), 2]],
    s2news: () => [[st2(0, () => NewsDetective.stats().cleared), 2]],
    s2court: () => [[st2(0, () => KidsCourt.stats().cleared), 2]],
    s2math: () => { const L = (v2('mw').lad) || {}; return [[Object.keys(L).filter(k => (L[k] || {}).best >= 8).length, 5]]; },
  };
  const S2COVER = { s2japan: '🗾', s2time: '⏳', s2code: '🔐', s2news: '📰', s2court: '⚖', s2math: '🌏' };
  function prog2(f) { const c = COND2[f.id](); return Math.min(1, Math.max(...c.map(x => x[0] / x[1]))); }
  const got2N = () => Object.keys(d2().got).length;
  function seasonTabs(n) { return '<div class="ms-seasons"><button class="ms-season' + (n === 1 ? ' on' : '') + '" data-season="1">シーズン1 知のカケラ</button><button class="ms-season' + (n === 2 ? ' on' : '') + '" data-season="2">🌸 シーズン2 白紙のページ</button></div>'; }
  function bindSeasons() { area().querySelectorAll('[data-season]').forEach(b => b.onclick = () => { sfx('click'); season = +b.dataset.season; map(); }); }
  function mapS2(flash) {
    stop();
    const D = d2(), F = MAIN_STORY.s2.frags, n = got2N();
    if (!D.seen.prologue) { D.seen.prologue = 1; save(); return talk(MAIN_STORY.s2.prologue, 'シーズン2 プロローグ', () => map()); }
    let h = seasonTabs(2) + '<div class="ms-hero s2"><div><div class="ms-kicker">メインストーリー シーズン2</div><h1 class="ms-h1">白紙の ページ</h1><div class="ms-bar"><div style="width:' + (n / F.length * 100) + '%"></div></div><small>真実の カケラ ' + n + ' / ' + F.length + '</small></div>' + portrait('bl') + '</div>';
    if (flash) h += '<div class="ms-flash">' + flash + '</div>';
    h += '<div class="ms-map s2">';
    F.forEach(f => {
      const got = D.got[f.id], p = prog2(f), ready = !got && p >= 1;
      h += '<button class="ms-tile s2' + (got ? ' got' : ready ? ' ready' : '') + '" data-f="' + f.id + '" style="--fc:' + f.color + '"><span class="ms-emoji">' + S2COVER[f.id] + '</span><span class="ms-tl"><b>' + f.icon + ' ' + esc(f.name) + '</b><small>' + (got ? '✨ 回収ずみ' : ready ? '💡 タップで 回収!' : esc(f.need)) + '</small>' + (got ? '' : '<span class="ms-pg"><i style="width:' + Math.round(p * 100) + '%"></i></span>') + '</span></button>';
    });
    h += '</div>';
    const ok = n >= 5;
    h += '<button class="ms-boss' + (ok ? '' : ' off') + '" id="msFinal">' + portrait('bl') + '<span><b>' + (D.boss.won ? '🤝 シロと なかなおり' : '⚔ 怪盗ブランクとの 最終決戦') + '</b><small>' + (ok ? '6つの 試練 (日本・歴史・暗号・ニュース・法律・英語)' : '真実の カケラを 5つ 集めると 挑戦できる (いま ' + n + ')') + '</small></span></button>';
    h += '<div class="ms-row"><button class="ms-sec" id="msNotes2">🃏 シロの カード (' + n + ')</button><button class="ms-sec" id="msPro2">📜 プロローグ</button></div>';
    area().innerHTML = h; bindSeasons();
    area().querySelectorAll('[data-f]').forEach(b => b.onclick = () => { sfx('click'); tile2(F.find(f => f.id === b.dataset.f)); });
    $('msFinal').onclick = () => { if (!ok) { sfx('wrong'); return; } sfx('click'); talk(MAIN_STORY.s2.finalIntro, '怪盗ブランク', finalBoss); };
    $('msNotes2').onclick = () => { sfx('click'); notes2(); };
    $('msPro2').onclick = () => { sfx('click'); talk(MAIN_STORY.s2.prologue, 'シーズン2 プロローグ', () => map()); };
  }
  function tile2(f) {
    const D = d2();
    const view = fresh => {
      let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">' + f.icon + ' ' + esc(f.name) + 'の カケラ</div></div>';
      h += '<div class="ms-card s2' + (fresh ? ' bloom' : '') + '"><span class="ms-emoji big">' + S2COVER[f.id] + '</span><span class="ms-gem" style="--fc:' + f.color + '">' + f.icon + '</span></div>';
      h += '<div class="ms-boxw"><div class="ms-lesson">📖 真実の ことば<br><b>' + esc(f.lesson) + '</b></div></div>';
      h += '<div class="ms-note"><div class="ms-note-h">🃏 カケラの そばの 白い カード</div><p>「' + esc(f.note) + '」</p><small>— B</small></div><button class="ms-pri" id="msOk">地図へ もどる</button>';
      area().innerHTML = h;
      $('msBack').onclick = $('msOk').onclick = () => { sfx('click'); map(fresh ? '✨ ' + f.area + 'の 真実が 明らかに なった!' : null); };
    };
    if (D.got[f.id]) return view(false);
    if (prog2(f) < 1) {
      let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">' + f.icon + ' ' + esc(f.name) + 'の カケラ</div></div>';
      h += '<div class="ms-boxw"><div class="ms-talk">' + portrait('kd', 'hint') + '<div><b>コラドン</b><p>この カケラは まだ 光が 弱いよ。<br>' + esc(f.need) + 'で 取りもどせる!</p></div></div></div>';
      area().innerHTML = h; $('msBack').onclick = () => { sfx('click'); map(); }; return;
    }
    talk(f.lines, f.name + 'の カケラ', () => { D.got[f.id] = 1; save(); sfx('unlock'); view(true); });
  }
  function notes2() {
    const D = d2();
    let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">🃏 シロの カード</div></div><p class="ms-small">真実の カケラの そばに あった カード。ブランクの 本当の 気持ちが 少しずつ わかる。</p>';
    MAIN_STORY.s2.frags.forEach((f, i) => { h += '<div class="ms-note sm' + (D.got[f.id] ? '' : ' locked') + '"><span>' + (i + 1) + '</span><p>' + (D.got[f.id] ? '「' + esc(f.note) + '」' : '? ? ?') + '</p></div>'; });
    area().innerHTML = h; $('msBack').onclick = () => { sfx('click'); map(); };
  }
  function finalQs() {
    const S = [], Q4 = (q, ans, wrong, exp) => { const opts = shuffle([ans].concat(wrong.slice(0, 3))); return { q: q, opts: opts, a: opts.indexOf(ans), exp: exp || '' }; };
    // 1 日本 (県の 手がかり → 県)
    if (typeof JP_PREF !== 'undefined') S.push({ name: '日本列島の 試練', icon: '🗾', qs: shuffle(JP_PREF).slice(0, 2).map(p => { const c = pick(p.c); return Q4('「' + c[1].split(p.n.replace(/[都道府県]$/, '')).join('〇〇') + '」で 有名な 都道府県は?', p.n, shuffle(JP_PREF.filter(x => x !== p && x.reg === p.reg).map(x => x.n).concat(shuffle(JP_PREF.filter(x => x !== p)).map(x => x.n))).filter((x, i, a) => a.indexOf(x) === i), p.n + ' (' + p.cap + ')'); }) });
    // 2 歴史
    if (typeof TT_EVENTS !== 'undefined') S.push({ name: '歴史の 試練', icon: '⏳', qs: shuffle(TT_EVENTS).slice(0, 2).map(e => { const near = TT_ERAS.map((x, i) => i).filter(i => i !== e[1]).sort((a, b) => Math.abs(a - e[1]) - Math.abs(b - e[1])).slice(0, 3).map(i => TT_ERAS[i][0] + '時代'); return Q4('「' + e[2] + '」は 何時代?', TT_ERAS[e[1]][0] + '時代', near, (e[0] < 0 ? '紀元前' + (-e[0]) : e[0]) + '年'); }) });
    // 3 暗号
    if (typeof CodeLab !== 'undefined') S.push({ name: '暗号の 試練', icon: '🔐', qs: ['seq2', 'caesar'].map(k => { const P = CodeLab._gen[k](); return { q: P.title + ': ' + P.q.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(), opts: P.opts, a: P.ans, exp: P.exp }; }) });
    // 4 ニュース
    if (typeof NewsDetective !== 'undefined') S.push({ name: 'ニュースの 試練', icon: '📰', qs: ['fact', 'cor'].map(k => { const P = NewsDetective._gen[k](); return { q: P.title + ': ' + P.q.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(), opts: P.opts, a: P.ans, exp: P.exp }; }) });
    // 5 法律
    if (typeof KC_QUIZ !== 'undefined') S.push({ name: '法律の 試練', icon: '⚖', qs: shuffle(KC_QUIZ).slice(0, 2).map(r => Q4(r[0], r[1], [r[2], r[3], r[4]], r[5])) });
    // 6 英語 (準1級 大問1)
    const E = shuffle(typeof EIKEN_P1_PART1 !== 'undefined' ? EIKEN_P1_PART1 : (typeof EIKEN_G2_PART1 !== 'undefined' ? EIKEN_G2_PART1 : [])).slice(0, 3);
    S.push({ name: '英語の 試練 (準1級)', icon: '🔤', qs: E.map(it => ({ q: it.q, opts: it.options, a: it.answer, exp: it.exp || '' })) });
    return S;
  }
  function finalBoss() {
    const D = d2(); D.boss.tries = (D.boss.tries || 0) + 1; save();
    battle({ S: finalQs(), who: 'bl', name: '怪盗ブランク', short: 'ブランク', lose: MAIN_STORY.s2.finalLose, onWin: () => {
      MAIN_STORY.s2.frags.forEach(f => { D.got[f.id] = 1; }); D.boss.won = 1; save();
      try { if (typeof triggerConfetti === 'function') triggerConfetti(); } catch (e) {}
      talk(MAIN_STORY.s2.finalWin, 'エンディング', () => map('🤝 シロが なかまに なった! 知の図書館に 色が もどった!'));
    } });
  }

  function open(s) { if (s) season = s; showPage('pageStoryMain'); map(); const p = $('pageStoryMain'); if (p) p.scrollTop = 0; }
  return { open: open, stop: stop, gotCount: gotN, _progress: () => MAIN_STORY.frags.map(f => [f.id, progress(f)]), _bossQs: bossQs, _boss: () => curB };
})();
