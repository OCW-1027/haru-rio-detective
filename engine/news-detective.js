/* engine/news-detective.js — シーズン2 新コンテンツ⑦ ニュース探偵 (メディア・リテラシー)
 * ブランク団が 町に「まちがった ニュース」を 流している。グラフの わな・事実と 意見・情報源・相関と 因果・
 * 見出しの 大げさ・割合の 読みちがい を 見ぬいて、正しい 情報を 取りもどす。
 * 画面: pageNews2 (#ndArea). 保存: State.v2.news = { cleared: {caseId: stars}, best: {kind: n} }
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, Hub
 */
const NewsDetective = (function () {
  const SP = 'assets/img/chars/spirits/';
  const $ = id => document.getElementById(id);
  const esc = s => escapeHtml(String(s));
  const rnd = n => Math.floor(Math.random() * n);
  const pick = a => a[rnd(a.length)];
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.news || (State.v2.news = {}); d.cleared = d.cleared || {}; d.best = d.best || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function area() { return $('ndArea'); }
  function sound(t) { try { sfx(t); } catch (e) {} }
  function top() { const p = $('pageNews2'); if (p) p.scrollTop = 0; }
  function header(title, sub, back) { return '<div class="nd-head">' + (back ? '<button class="nd-back" data-back data-go="' + back + '">← ' + (back === 'cases' ? '事件' : 'トップ') + '</button>' : '') + '<div><div class="nd-title">' + title + '</div>' + (sub ? '<div class="nd-sub">' + sub + '</div>' : '') + '</div></div>'; }
  function bindGo(root) { root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => { sound('click'); go(b.dataset.go); }); }
  function go(v) { run = null; top(); ({ home: home, cases: cases }[v] || home)(); }

  // ---------- グラフ (SVG) ----------
  function bars(labels, vals, y0, y1, unit, title) {
    const W = 320, H = 200, L = 46, B = 30, T = 24, w = (W - L - 10) / vals.length;
    const y = v => T + (H - T - B) * (1 - (v - y0) / (y1 - y0));
    let s = '<svg class="nd-chart" viewBox="0 0 ' + W + ' ' + H + '"><text x="' + W / 2 + '" y="15" text-anchor="middle" class="nd-ct">' + esc(title) + '</text>';
    for (let k = 0; k <= 4; k++) { const v = y0 + (y1 - y0) * k / 4, yy = y(v); s += '<line x1="' + L + '" x2="' + (W - 6) + '" y1="' + yy + '" y2="' + yy + '" class="nd-grid"/><text x="' + (L - 4) + '" y="' + (yy + 4) + '" text-anchor="end" class="nd-ax">' + Math.round(v * 10) / 10 + '</text>'; }
    vals.forEach((v, i) => { const x = L + i * w + w * 0.2, yy = y(v); s += '<rect x="' + x + '" y="' + yy + '" width="' + w * 0.6 + '" height="' + (H - B - yy) + '" class="nd-bar b' + i + '"/><text x="' + (x + w * 0.3) + '" y="' + (H - B + 16) + '" text-anchor="middle" class="nd-ax">' + esc(labels[i]) + '</text><text x="' + (x + w * 0.3) + '" y="' + (yy - 4) + '" text-anchor="middle" class="nd-val">' + v + '</text>'; });
    return s + '<text x="6" y="' + (T - 6) + '" class="nd-ax">(' + esc(unit) + ')</text></svg>';
  }

  // ---------- 生成器 ----------
  // A: 縦軸が 0から 始まらない グラフ
  function graphQ() {
    const topic = pick([['A社', 'B社', 'ジュースの 売り上げ', '万本'], ['1組', '2組', 'テストの 平均点', '点'], ['ことし', 'きょねん', '図書館の 1日の 利用者', '人'], ['新型', '旧型', 'スマホの 電池の もち', '時間']]);
    const base = topic[3] === '点' ? 70 + rnd(10) : topic[3] === '時間' ? 18 + rnd(5) : 100 + rnd(80);
    const a = base + Math.max(1, Math.round(base * (0.03 + rnd(5) / 100))), b = base;
    const y0 = Math.floor(b * 0.97), y1 = Math.ceil(a * 1.01);
    const ratio = Math.round(a / b * 100) / 100;
    const opts = shuffle(['' + topic[0] + 'は ' + topic[1] + 'より 少し 多い (約' + ratio + '倍) が、差は 小さい', '' + topic[0] + 'は ' + topic[1] + 'の 何倍も 多い', '' + topic[1] + 'の 方が 多い', 'グラフからは どちらが 多いか わからない']);
    return { kind: 'graph', title: 'グラフの わな', q: '<p class="nd-p">ブランク団の チラシ:「' + topic[0] + 'が 圧勝! ' + topic[1] + 'を 大きく 引きはなした!」</p>' + bars([topic[0], topic[1]], [a, b], y0, y1, topic[3], topic[2]) + '<p class="nd-p">グラフを よく 見て、正しい 読み取りは どれ?</p>', opts: opts, ans: opts.findIndex(o => o.includes('少し')), exp: '縦軸が 0 から ではなく ' + y0 + ' から 始まっているので、差が 大きく 見える。実際は ' + a + ' と ' + b + ' で、約' + ratio + '倍。グラフを 見る ときは まず 軸の 目もりを 確認!' };
  }
  // B: 事実か 意見か
  const FO = [
    ['富士山の 高さは 3776m だ。', 1], ['富士山は 日本で いちばん 美しい 山だ。', 0], ['この 町の 人口は 10年で 2割 減った。', 1], ['この 町は もっと 観光に 力を 入れる べきだ。', 0],
    ['水は 0℃で こおる (1気圧の とき)。', 1], ['冬は 夏より 過ごしやすい 季節だ。', 0], ['きのうの 最高気温は 35.2℃ だった。', 1], ['35℃を こえる 日は 外で 遊ぶのを やめた 方が いい。', 0],
    ['この 本は 全国で 100万部 売れた。', 1], ['この 本は だれもが 読む べき 名作だ。', 0], ['給食の 残りは 先月より 15% 減った。', 1], ['給食は カレーの 日が いちばん おいしい。', 0],
    ['日本の 首都は 東京だ。', 1], ['東京は 住むには 人が 多すぎる。', 0], ['新しい 駅は 2027年に 開業する 予定だと 市が 発表した。', 1], ['新しい 駅が できれば 町は きっと 元気に なる。', 0],
    ['調査では 小学生の 6割が 自分の スマホを 持っている と 答えた。', 1], ['小学生に スマホは まだ 早い。', 0], ['選手は 100m を 9秒台で 走った。', 1], ['あの 選手は 史上 最高の スプリンターだ。', 0],
    ['市の 図書館は 月曜日が 休館日だ。', 1], ['図書館は 毎日 開ける べきだ。', 0], ['地球は 約1年で 太陽の まわりを 1周する。', 1], ['宇宙旅行は お金の むだ だ。', 0],
    ['この ゲームは 発売 1週間で 50万本 売れた。', 1], ['この ゲームは 子どもに 悪い 影響を あたえる。', 0], ['きょうの 朝刊の 1面は 地震の ニュースだった。', 1], ['新聞は ネットの ニュースより 信用できる。', 0],
  ];
  function factQ() {
    const t = pick(FO);
    return { kind: 'fact', title: '事実か 意見か', q: '<div class="nd-quote">' + esc(t[0]) + '</div><p class="nd-p">これは 確かめられる「事実」? それとも 人の 考えである「意見」?</p>', opts: ['事実', '意見'], ans: t[1] ? 0 : 1,
      exp: t[1] ? '数字・記録・発表など、正しいか どうか 調べて 確かめられる ことは「事実」。' : '「〜べきだ」「美しい」「おいしい」「きっと」など、人に よって 考えが ちがう ことは「意見」。' };
  }
  // C: 情報源
  const SRC = [
    ['あした 台風が 来るか 知りたい', '気象庁の 発表', ['友だちの うわさ', '1年前の 天気の 本', '知らない 人の SNS 投稿']],
    ['新しい 法律の 中身を 正しく 知りたい', '国 (省庁) の 公式サイト', ['まとめサイトの 感想', '動画の コメント欄', 'となりの 人の 話']],
    ['地震の とき どこへ 逃げるか 知りたい', '市が 配った ハザードマップ', ['ネットの 占い', '古い 地図アプリの スクリーンショット', '友だちの 想像']],
    ['薬の 正しい 飲み方を 知りたい', '薬の 説明書と 薬剤師さん', ['SNS の 体験談', '広告の キャッチコピー', 'クラスの うわさ']],
    ['電車が 止まって いるか 知りたい', '鉄道会社の 運行情報', ['3日前の ニュース', '知らない 人の 書きこみ', '駅の 近くの お店の 人の 予想']],
    ['歴史の 年号を 確かめたい', '教科書や 百科事典 (複数で 確認)', ['作者 不明の ブログ', '友だちの 記憶', 'クイズ番組の 感想']],
    ['選挙の 投票日を 知りたい', '選挙管理委員会の お知らせ', ['チェーンメール', '動画の サムネイル', 'うわさ話']],
    ['世界の 人口を 知りたい', '国連など 公的機関の 統計', ['個人の 予想', 'ゲームの 中の 設定', '10年 以上 前の テレビ番組']],
  ];
  function srcQ() {
    const t = pick(SRC), opts = shuffle([t[1]].concat(t[2]));
    return { kind: 'src', title: '情報源を えらぶ', q: '<p class="nd-p"><b>' + esc(t[0]) + '</b>。いちばん 信頼できる 情報源は?</p>', opts: opts, ans: opts.indexOf(t[1]), exp: '「だれが・いつ・何を もとに」出した 情報かを 確かめる。公式の 機関・専門家・最新の 発表が 基本。うわさや 古い 情報、出どころ不明の 投稿は 要注意。' };
  }
  // D: 相関と 因果
  const COR = [
    ['アイスクリームが よく 売れる 日は、水の 事故も 多い', '気温が 高い (暑いと アイスも 売れるし、水遊びも ふえる)'],
    ['消防車が たくさん 来た 火事ほど、被害が 大きい', '火事の 大きさ (大きな 火事ほど 消防車が 多く 来る)'],
    ['くつの サイズが 大きい 小学生ほど、漢字を たくさん 知っている', '学年 (年齢) が 上 (成長して 足も 大きく、習った 漢字も 多い)'],
    ['傘を 持っている 人が 多い 日は、道が ぬれている', '雨が ふっている'],
    ['テレビを 長く 見る 子ほど、成績が 低い という 調査が ある', 'ほかの 要因 (勉強時間・睡眠など) も 関係するので、テレビだけが 原因とは 言えない'],
    ['朝ごはんを 食べる 子ほど、テストの 点が 高い という 調査が ある', '生活リズムなど 別の 要因も ある (朝ごはん だけで 点が 上がるとは かぎらない)'],
    ['病院が 多い 町ほど、病気の 人が 多い', '人口が 多い (人が 多い 町は 病院も 患者も 多い)'],
    ['セミが たくさん 鳴く 日は、プールに 来る 人が 多い', '夏の 暑い 時期 (セミも プールも 夏に 多い)'],
  ];
  function corQ() {
    const t = pick(COR), others = shuffle(COR.filter(x => x !== t)).slice(0, 2).map(x => x[1]);
    const opts = shuffle([t[1], 'だから 前の ことが 後の ことの 原因だ'].concat(others.slice(0, 2)));
    return { kind: 'cor', title: '相関と 因果', q: '<div class="nd-quote">「' + esc(t[0]) + '」</div><p class="nd-p">ブランク団:「だから 一方が もう一方の 原因だ!」── 本当は どう 考えるのが 正しい?</p>', opts: opts, ans: opts.indexOf(t[1]), exp: '2つの ことが 一緒に 起きても (相関)、一方が 原因 (因果) とは かぎらない。両方に 関係する「第3の 要因」が かくれて いないか 考えよう。正解: ' + t[1] + '。' };
  }
  // E: 見出しの 大げさ
  function headQ() {
    const T = pick([['市民マラソンの 参加者', '人', 200 + rnd(300)], ['動物園の 来場者', '万人', 30 + rnd(30)], ['町の パン屋の 新作の 売り上げ', '個', 80 + rnd(60)], ['図書館で 借りられた 本', '冊', 1000 + rnd(2000)]]);
    const before = T[2], after = before + Math.max(1, Math.round(before * (0.02 + rnd(4) / 100)));
    const pct = Math.round((after - before) / before * 1000) / 10;
    const opts = shuffle(['見出しは 大げさ。実際は 約' + pct + '% の 増加に すぎない', '見出しの とおり、数が 何倍にも なった', '数が 減ったのに 増えたと うそを 書いている', '見出しと 記事は 同じ ことを 言っている']);
    return { kind: 'head', title: '見出しの 大げさ', q: '<div class="nd-paper"><div class="nd-hl">' + esc(T[0]) + '、記録的 大爆発!!</div><p>記事: ' + esc(T[0]) + 'は 去年の ' + before + T[1] + 'から、ことしは ' + after + T[1] + 'に なった。</p></div><p class="nd-p">見出しと 記事を くらべて、正しい ものは?</p>', opts: opts, ans: opts.findIndex(o => o.includes('大げさ')), exp: '増えたのは ' + (after - before) + T[1] + ' (' + before + ' → ' + after + '、約' + pct + '%)。見出しは 目立たせる ために 大げさに なる ことが ある。数字は 本文で 確かめよう。' };
  }
  // F: 割合の 読みちがい
  function rateQ() {
    const T = pick([
      () => { const a = 2 + rnd(3); return { q: 'ある 病気に かかる 人が「2倍に 増えた!」。調べると 1万人に ' + a + '人 → 1万人に ' + 2 * a + '人 だった。', ok: 'たしかに 2倍だが、もともと とても 少ない 数で、1万人あたり ' + a + '人 ふえた だけ', ng: ['1万人の 半分が かかる ように なった', '町の ほとんどの 人が かかった', '数は 変わって いない'], exp: '「2倍」のような 割合の 変化だけで なく、もとの 数 (1万人に ' + a + '人) も 見る こと。' }; },
      () => { const n = 10 + rnd(10); return { q: '「この ゲームを 遊んだ 人の 90% が 満足!」。よく 読むと 調査した のは ' + n + '人 だけ だった。', ok: '調べた 人数が 少ないので、全体の 意見とは 言い切れない', ng: ['日本中の 90% が 満足している', '少ない 人数の 方が 正確だ', '人数は 結果に 関係ない'], exp: '調査の 人数 (標本の 大きさ) が 少ないと、たまたまの かたよりが 大きく なる。' }; },
      () => { return { q: '「3人に 1人が 持っている!」と 広告に ある。', ok: '約33% (3分の1) の 人が 持っている という 意味', ng: ['ほとんど 全員が 持っている', '3人しか 持っていない', '100人中 3人が 持っている'], exp: '3人に 1人 = 1 ÷ 3 ≒ 0.33 = 約33%。言い方を 変えて 多く 見せる ことが ある。' }; },
      () => { const p = 40 + rnd(20); return { q: '「' + p + '% が 賛成!」と 書かれた 調査。でも 質問は「〇〇に 反対しますか?」で、「いいえ」と 答えた 人を 賛成と 数えていた。', ok: '質問の しかたで 結果が 変わる ので、そのまま 信じない 方が いい', ng: ['' + p + '% が 賛成なのは まちがいない', '質問の しかたは 結果に 関係ない', '反対の 人は 0人だった'], exp: '「反対しない」=「賛成」とは かぎらない (わからない・どちらでもない 人も いる)。質問文も 確かめよう。' }; },
    ])();
    const opts = shuffle([T.ok].concat(T.ng));
    return { kind: 'rate', title: '割合・調査の わな', q: '<div class="nd-quote">' + esc(T.q) + '</div><p class="nd-p">正しい 考え方は どれ?</p>', opts: opts, ans: opts.indexOf(T.ok), exp: T.exp };
  }
  const KINDS = { graph: graphQ, fact: factQ, src: srcQ, cor: corQ, head: headQ, rate: rateQ };
  const TRAIN = [['graph', '📊', 'グラフの わな'], ['fact', '🗣', '事実か 意見か'], ['src', '🏛', '情報源を えらぶ'], ['cor', '🔗', '相関と 因果'], ['head', '📰', '見出しの 大げさ'], ['rate', '％', '割合・調査の わな']];

  // ---------- ホーム ----------
  function home() {
    const d = data();
    let h = header('📰 ニュース探偵', 'シーズン2 ・ うその ニュースを 見ぬけ');
    h += '<div class="nd-hero"><img src="' + SP + 'korarin_greet_01.webp" alt=""><div class="nd-say"><b>コラリン:</b> ブランク団が 町じゅうに「まちがった ニュース」を ばらまいています。グラフの 目もり・数字・情報の 出どころを よく 見て、本当の ことを 見ぬきましょう!</div></div>';
    h += '<button class="nd-big" data-go="cases">🕵️ 事件ファイル <small>解決 ' + Object.keys(d.cleared).length + ' / ' + CASES.length + '</small></button>';
    h += '<div class="nd-h2">🏋 トレーニング (10問)</div><div class="nd-menu">';
    TRAIN.forEach(([k, i, n]) => { h += '<button class="nd-mbtn" data-t="' + k + '"><span class="i">' + i + '</span><b>' + n + '</b><small>ベスト ' + (d.best[k] || 0) + ' / 10</small></button>'; });
    h += '</div><div class="nd-tips"><b>📌 ニュースを 見る ときの 5つの チェック</b><ol><li>だれが 出した 情報? (情報源)</li><li>いつの 情報? (日付)</li><li>事実? それとも 意見?</li><li>グラフの 目もりは 0 から?</li><li>ほかの 情報でも 同じ ことが 言われている?</li></ol></div>';
    area().innerHTML = h; bindGo(area());
    area().querySelectorAll('[data-t]').forEach(b => b.onclick = () => { sound('click'); train(b.dataset.t); });
  }
  function showQ(P, head, onDone) {
    let h = head + '<div class="nd-card"><div class="nd-kind">' + P.title + '</div>' + P.q + '</div><div class="nd-opts' + (P.opts.length === 2 ? ' two' : '') + '">';
    P.opts.forEach((o, k) => { h += '<button class="nd-opt" data-k="' + k + '">' + esc(o) + '</button>'; });
    h += '</div><div id="ndFb"></div>';
    area().innerHTML = h; bindGo(area());
    let done = false;
    area().querySelectorAll('.nd-opt').forEach(b => b.onclick = () => {
      if (done) return; done = true;
      const ok = +b.dataset.k === P.ans;
      area().querySelectorAll('.nd-opt').forEach(x => { x.disabled = true; if (+x.dataset.k === P.ans) x.classList.add('ok'); });
      if (!ok) b.classList.add('ng');
      sound(ok ? 'correct' : 'wrong'); onDone(ok, $('ndFb'));
    });
  }
  function train(kind) {
    const T = { i: 0, ok: 0 }, name = TRAIN.find(x => x[0] === kind)[2];
    const next = () => {
      top();
      if (T.i >= 10) { const d = data(), nb = T.ok > (d.best[kind] || 0); d.best[kind] = Math.max(d.best[kind] || 0, T.ok); save(); area().innerHTML = header('🏋 ' + name + ' 結果', '', 'home') + '<div class="nd-res"><b>' + T.ok + '</b> / 10' + (nb ? ' 🏆' : '') + '</div><button class="nd-go" id="ndTA">🔁 もう一度</button>'; bindGo(area()); $('ndTA').onclick = () => { sound('click'); train(kind); }; return; }
      const P = KINDS[kind]();
      showQ(P, header('🏋 ' + name, (T.i + 1) + ' / 10 ・ 正解 ' + T.ok, 'home'), (ok, fb) => { if (ok) T.ok++; fb.innerHTML = '<div class="' + (ok ? 'nd-ok' : 'nd-ng') + '">' + (ok ? '✔ 見ぬいた!' : '✗ ざんねん') + ' ' + esc(P.exp) + '</div><button class="nd-go" id="ndN">次へ →</button>'; $('ndN').onclick = () => { sound('click'); T.i++; next(); }; });
    };
    next();
  }
  // ---------- 事件 ----------
  const CASES = [
    { id: 'n1', title: 'うわさの 号外', steps: ['fact', 'src', 'fact', 'head'] },
    { id: 'n2', title: 'ふしぎな グラフ', steps: ['graph', 'rate', 'graph', 'fact'] },
    { id: 'n3', title: '原因は アイス?', steps: ['cor', 'fact', 'cor', 'src'] },
    { id: 'n4', title: '大げさ 新聞社', steps: ['head', 'graph', 'head', 'rate'] },
    { id: 'n5', title: '数字の 魔術師', steps: ['rate', 'cor', 'graph', 'rate'] },
    { id: 'n6', title: 'ブランク放送局 乗っ取り', steps: ['graph', 'cor', 'head', 'src', 'rate'] },
  ];
  let run = null;
  function cases() {
    const d = data();
    let h = header('🕵️ 事件ファイル', 'フェイクを ぜんぶ 見ぬけば 解決', 'home') + '<div class="nd-cases">';
    CASES.forEach((c, i) => { const st = d.cleared[c.id]; h += '<button class="nd-case' + (st ? ' done' : '') + '" data-c="' + i + '"><span class="nd-cn">第' + (i + 1) + '事件</span><b>' + esc(c.title) + '</b><small>' + c.steps.map(s => TRAIN.find(x => x[0] === s)[1]).join(' → ') + '</small><span class="nd-st">' + (st ? '⭐'.repeat(st) + '☆'.repeat(3 - st) : '') + '</span></button>'; });
    area().innerHTML = h + '</div>'; bindGo(area());
    area().querySelectorAll('[data-c]').forEach(b => b.onclick = () => { sound('click'); run = { ci: +b.dataset.c, i: 0, miss: 0 }; step(); });
  }
  function step() {
    const r = run, c = CASES[r.ci]; top();
    if (r.i >= c.steps.length) {
      const st = r.miss === 0 ? 3 : r.miss <= 1 ? 2 : 1, d = data(); d.cleared[c.id] = Math.max(d.cleared[c.id] || 0, st); save();
      try { if (typeof triggerConfetti === 'function') triggerConfetti(); } catch (e) {}
      sound('chime');
      area().innerHTML = header('🗞 事件 解決!', esc(c.title), 'cases') + '<div class="nd-hero"><img src="' + SP + 'koradon_greet_01.webp" alt=""><div class="nd-say"><b>コラドン:</b> ブランク団の フェイクニュースを ぜんぶ 見ぬいた! 町の 人たちも 正しい 情報を 知る ことが できたぞ。</div></div><div class="nd-res">' + '⭐'.repeat(st) + '<span class="off">' + '☆'.repeat(3 - st) + '</span><div>まちがい ' + r.miss + '回</div></div><button class="nd-go" data-go="cases">事件ファイルへ</button>';
      bindGo(area()); return;
    }
    const P = KINDS[c.steps[r.i]]();
    showQ(P, header('第' + (r.ci + 1) + '事件 ' + esc(c.title), 'ニュース ' + (r.i + 1) + ' / ' + c.steps.length + ' ・ まちがい ' + r.miss, 'cases'), (ok, fb) => {
      if (!ok) r.miss++;
      fb.innerHTML = '<div class="' + (ok ? 'nd-ok' : 'nd-ng') + '">' + (ok ? '✔ 見ぬいた!' : '✗ だまされた…') + ' ' + esc(P.exp) + '</div><button class="nd-go" id="ndN">' + (r.i + 1 < c.steps.length ? '次の ニュースへ →' : '🗞 結果へ') + '</button>';
      $('ndN').onclick = () => { sound('click'); r.i++; step(); };
    });
  }
  function leave() { try { Hub.open(); } catch (e) { showPage('pageSelect'); } }
  function open() { showPage('pageNews2'); top(); home(); const b = $('btnNews2Back'); if (b) b.onclick = () => { sound('click'); run = null; leave(); }; }
  return { open: open, _gen: KINDS, stats: () => ({ cleared: Object.keys(data().cleared).length }) };
})();
