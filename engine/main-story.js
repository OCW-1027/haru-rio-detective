/* engine/main-story.js — メインストーリー シーズン1「知のカケラ」
 * 知の世界地図 (12地域): カケラの 光 (条件の 進み具合) が 満ちたら タップで 回収 → 会話 → 地域に 色が もどる。
 * 回収した カケラには 怪盗ブランクの メモカード。10枚で 幹部ゼロとの 対決 (5つの 試練: 英語·算数·地理·科学·推理)。
 * 画面: pageStoryMain (#msArea). 保存: State.v2.story = { seen: {prologue}, got: {id: 1}, boss: {won, tries} }
 * 絵: 表情・ポーズの 絵 (assets/img/chars/expr/…, chars/spirits/…) が あれば 使い、なければ 今の 絵
 * Dependencies: MAIN_STORY, State, saveState, showPage, sfx, escapeHtml, CaseEngine, CHAR_IMAGES, SCENE_IMAGES,
 *               SCIENTISTS_STORY, EIKEN_G2_PART1, IM, WORLD_CITIES, WorldChase
 */
const MainStory = (function () {
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
  function map(flash) {
    stop();
    const D = data(), F = MAIN_STORY.frags, n = gotN();
    if (!D.seen.prologue) { D.seen.prologue = 1; save(); return talk(MAIN_STORY.prologue, 'プロローグ', () => map()); }
    let h = '<div class="ms-hero"><div><div class="ms-kicker">メインストーリー シーズン1</div><h1 class="ms-h1">知のカケラ</h1><div class="ms-bar"><div style="width:' + (n / 12 * 100) + '%"></div></div><p>取りもどした カケラ <b>' + n + '</b> / 12</p></div>' + portrait('kr', n >= 10 ? 'happy' : 'card') + '</div>';
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
  function boss() {
    stop();
    const D = data(); D.boss.tries = (D.boss.tries || 0) + 1; save();
    const S = bossQs(), maxHp = S.reduce((a, s) => a + s.qs.length, 0);
    const B = { S: S, si: 0, qi: 0, hp: maxHp, maxHp: maxHp, life: 3 }; curB = B;
    const ask = () => {
      const st = B.S[B.si], Q = st.qs[B.qi];
      let h = '<div class="ms-head"><button class="ms-back" id="msBack">← 地図</button><div class="ms-title">⚔ 幹部 ゼロ — ' + st.icon + ' ' + st.name + ' (' + (B.si + 1) + '/5)</div></div>';
      h += '<div class="ms-bossbar">' + portrait('zero') + '<div><div class="ms-hp"><div style="width:' + (B.hp / B.maxHp * 100) + '%"></div></div><small>ゼロ HP ' + B.hp + ' / ' + B.maxHp + '</small><div class="ms-life">' + '❤'.repeat(B.life) + '🤍'.repeat(3 - B.life) + '</div></div></div>';
      h += '<div class="ms-boxw ms-q"><p>' + esc(Q.q) + '</p><div class="ms-opts">' + Q.opts.map((o, i) => '<button data-o="' + i + '">' + esc(o) + '</button>').join('') + '</div><div id="msFb"></div></div>';
      area().innerHTML = h; $('msBack').onclick = () => { sfx('click'); map(); };
      let done = false;
      area().querySelectorAll('[data-o]').forEach(b => b.onclick = () => {
        if (done) return; done = true;
        const ok = +b.dataset.o === Q.a;
        area().querySelectorAll('[data-o]').forEach(x => { x.disabled = true; if (+x.dataset.o === Q.a) x.classList.add('ok'); });
        if (ok) { sfx('unlock'); B.hp--; } else { sfx('wrong'); b.classList.add('ng'); B.life--; }
        $('msFb').innerHTML = '<div class="' + (ok ? 'ms-good' : 'ms-bad') + '">' + (ok ? '⚡ 命中! ゼロに 1ダメージ' : '💥 はずれ… ハートが 1つ へった') + '</div>' + (Q.exp ? '<p class="ms-small">' + esc(Q.exp) + '</p>' : '') + '<button class="ms-pri" id="msGo">次へ →</button>';
        $('msGo').onclick = () => {
          sfx('click');
          if (B.life <= 0) return talk(MAIN_STORY.bossLose, '幹部 ゼロ', () => map('💪 また 挑戦しよう!'));
          B.qi++; if (B.qi >= st.qs.length) { B.si++; B.qi = 0; }
          if (B.si >= B.S.length) return win();
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
    const win = () => {
      MAIN_STORY.frags.forEach(f => { D.got[f.id] = 1; }); D.boss.won = 1; save();
      talk(MAIN_STORY.bossWin, '勝利', () => map('🏆 ゼロに 勝った! 12の カケラが すべて そろった!'));
    };
    stageBanner(ask);
  }

  function open() { showPage('pageStoryMain'); map(); const p = $('pageStoryMain'); if (p) p.scrollTop = 0; }
  return { open: open, stop: stop, gotCount: gotN, _progress: () => MAIN_STORY.frags.map(f => [f.id, progress(f)]), _bossQs: bossQs, _boss: () => curB };
})();
