/* engine/lab.js — 新コンテンツ③ ラボ探偵 v2 (物理·化学·生物の 仮想実験)
 * 流れ: 事件ファイル (証拠と 証言) → 実験室で 全員の 証言を 再現して 検証 → 推理 (法則 → 計算 → 矛盾) → 犯人の 指名
 * 「証拠の 数値」と「証言どおりに 実験した 数値」を くらべて、うそや 犯人を 見ぬく。
 * 画面: pageLab (#labArea). 保存: State.v2.lab = { cleared: {caseId: stars} }
 * 絵: assets/img/lab/… が あれば 使い、なければ 絵文字で 代用 (docs/GEMINI_ART_REQUEST.md)
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, CHAR_IMAGES
 */
const LabDetective = (function () {
  const KORARIN = 'assets/img/chars/spirits/korarin_greet_01.webp';
  const KORADON = 'assets/img/chars/spirits/koradon_idle_01.webp';
  const IMG = 'assets/img/lab/';
  let cur = null, raf = 0;
  function area() { return document.getElementById('labArea'); }
  function esc(s) { return escapeHtml(String(s)); }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.lab || (State.v2.lab = {}); d.cleared = d.cleared || {}; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function ttsEn(t) { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-US'; u.rate = 0.85; speechSynthesis.speak(u); } catch (e) {} }
  function sayEn(t) { try { speechSynthesis.cancel(); } catch (e) {} if (typeof VoicePack !== 'undefined' && VoicePack.play(t, 'N', 1, null, () => ttsEn(t))) return; ttsEn(t); }
  function stop() { cancelAnimationFrame(raf); raf = 0; try { speechSynthesis.cancel(); } catch (e) {} if (typeof VoicePack !== 'undefined') VoicePack.stop(); }
  function art(src, fb, cls) { return '<span class="art-w ' + (cls || '') + '"><img class="art-main" src="' + src + '" alt="" onload="this.parentNode.classList.add(\'ok\')" onerror="this.remove()"><span class="art-fb">' + (fb || '') + '</span></span>'; }
  const near = (a, b) => Math.abs(+a - +b) < 1e-6;

  // ================= 物理モデル =================
  const G = 9.8;
  function period(L, deg) { const th = deg * Math.PI / 180; return 2 * Math.PI * Math.sqrt(L / G) * (1 + th * th / 16); }
  const T0 = period(1.0, 5);
  function dayLagMin(L, deg) { return 86400 * (1 - T0 / period(L, deg)) / 60; }   // +なら 遅れる
  function circuit(bn, ln) {
    const V = bn === '2s' ? 3 : 1.5, Rt = ln === '2s' ? 10 : ln === '2p' ? 2.5 : 5, I = V / Rt, Ib = ln === '2p' ? I / 2 : I, Ibat = bn === '2p' ? I / 2 : I;
    return { V: V, I: I, bright: (Ib * Ib * 5) / 0.45, life: 0.3 / Ibat };
  }
  const SOL = { salt: { n: '食塩', t: [35.7, 35.8, 36.3, 37.1, 38.0] }, alum: { n: 'ミョウバン', t: [5.7, 11.4, 23.8, 57.4, 321.6] }, kno3: { n: '硝酸カリウム', t: [13.3, 31.6, 63.9, 109, 169] } };
  function solub(k, T) { const t = SOL[k].t, i = Math.min(3, Math.floor(T / 20)), f = (T - i * 20) / 20; return t[i] + (t[i + 1] - t[i]) * f; }
  function dissolve(sub, W, Gm, T1, T2) {
    const m1 = solub(sub, T1) * W / 100, m2 = solub(sub, T2) * W / 100, left1 = Math.max(0, Gm - m1), dis = Gm - left1;
    return { m1: m1, m2: m2, left1: left1, cry: Math.max(0, dis - m2) };
  }
  const LIGHT = { sun: ['日なた', 1], half: ['半日かげ', 0.6], dark: ['黒い シート', 0.15] };
  const WATER = { daily: ['毎日', 1], d3: ['3日に1回', 0.85], w7: ['1週間に1回', 0.5] };
  const TEMP = { t25: ['25℃', 1], t20: ['20℃', 0.9], t10: ['10℃', 0.35] };
  function grow(p) {
    const f = LIGHT[p.l][1] * WATER[p.w][1] * TEMP[p.t][1];
    return { h: 2 + 14 * f + (p.l === 'dark' ? 14 : 0), pale: p.l === 'dark', wilt: p.w === 'w7', stem: p.l === 'dark' ? 'ひょろひょろ' : 'しっかり' };
  }
  const SPRING = { normal: ['ふつうの ばね', 1], soft: ['やわらかい ばね', 1.2], hard: ['かたい ばね', 0.8] };
  function scale(sp, z, w) { return w * SPRING[sp][1] + z; }
  function frac(x) { if (x >= 0.99 && x <= 1.01) return '同じ (1倍)'; if (x < 1) return '1/' + Math.round(1 / x); return Math.round(x * 10) / 10 + '倍'; }

  // ================= 事件 =================
  const CASES = [
    { id: 'pendulum', icon: '🕰', name: '遅れる 時計塔', field: '物理 · ふりこ', level: '★★',
      story: '町の 時計塔の ふりこ時計が、整備の あとから 毎日 遅れるように なった。整備の 記録には 4人の 名前。だれかが うそを ついている…?',
      evidence: ['時計は <b>1日に 約14分</b> 遅れる (3日間 毎日 同じ)', '整備前の ふりこ: ひもの 長さ <b>1.00m</b>・おもり <b>200g</b>・ふれはば <b>5°</b>', 'ふりこの 時計は「ふりこが 1往復するたびに 針が 進む」しくみ'],
      suspects: [
        { id: 'a', face: '👷', name: '整備士 アキラ', says: 'おもりを 200g から 400g の ものに 取りかえた だけだよ。', test: c => near(c.M, 400) && near(c.L, 1) && near(c.A, 5), how: 'おもり 400g・長さ 1.00m・ふれはば 5°' },
        { id: 'b', face: '🧑‍🔧', name: '助手 ベン', says: '古い ひもを 新品に 交換した。長さは 1cm しか 変わってないよ。', test: c => near(c.L, 1.01) && near(c.A, 5), how: '長さ 1.01m・ふれはば 5°' },
        { id: 'c', face: '👩‍🏫', name: '見学の 先生 チカ', says: 'ふれはばを 5° から 10° に 大きくして 生徒に 見せました。', test: c => near(c.L, 1) && near(c.A, 10), how: '長さ 1.00m・ふれはば 10°' },
        { id: 'd', face: '🧓', name: '時計番 ドロ', says: '針を 正しい 時刻に 合わせ直した だけじゃ。ふりこには さわっとらん。', test: null } ],
      sim: 'pendulum',
      qs: [
        { q: 'ふりこの 1往復の 時間を いちばん 大きく 変えるのは?', o: ['ひもの 長さ', 'おもりの 重さ', 'ふれはば (5°〜10°の 範囲)'], hint: '長さ・重さ・ふれはばを 1つずつ 変えて、1往復の 時間を くらべてみよう。' },
        { q: 'ベンの 言うとおり ひもが 1cm 長く なったら、時計は 1日に 約何分 遅れる?', o: ['約7分', '約1分', '約14分', '遅れない'], hint: '長さ 1.01m・ふれはば 5° で 実験して「1日の ずれ」を 見よう。' },
        { q: '証拠の「1日に 約14分 遅れる」に なるのは、ひもが 何cm 長く なったとき?', o: ['2cm', '1cm', '5cm', '14cm'], hint: '長さを 1.01m、1.02m、1.03m… と 変えて 1日の ずれを くらべよう。' } ],
      culprit: 'b',
      reveal: 'ベンは「1cm しか 変わってない」と 言ったが、実際には ひもが <b>2cm</b> 長く なっていた。1cm なら 1日 約7分、2cm なら 約14分 遅れる。数値が 証拠と 合わない 証言は うそ!',
      vocab: [['pendulum', 'ふりこ'], ['period', '周期 (1往復の 時間)'], ['length', '長さ'], ['evidence', '証拠'], ['measure', 'はかる']],
      summary: 'ふりこの 周期は ほぼ「ひもの 長さ」だけで 決まる (おもりの 重さには 関係なし。ふれはばは 大きくすると ほんの 少しだけ 長くなる)。長さが 1% 長くなると 周期は 約0.5% 長くなり、1日 (86400秒) では 約7分の 遅れに なる。' },
    { id: 'circuit', icon: '💡', name: '暗く なった 看板', field: '物理 · 電気回路', level: '★★',
      story: '商店街の 看板の 豆電球が 暗く なった。ところが 電池は なかなか 切れない。配線を さわった 4人の 証言を、回路を 組んで 1つずつ たしかめよう。',
      evidence: ['看板の 豆電球 1個の 明るさが 前の <b>1/4</b> に なった', '電池の もちが 前の <b>4倍</b> に なった (1か月 たっても 切れない)', '前の 回路: 電池 1個・豆電球 1個'],
      suspects: [
        { id: 'a', face: '🧑‍💼', name: '店長 ダイ', says: '電池を 2個 並列に つないで 長持ちするように した。', test: c => c.bn === '2p' && c.ln === '1', how: '電池 2個 並列・豆電球 1個' },
        { id: 'b', face: '🧑‍🎤', name: 'アルバイト エミ', says: '豆電球を 2個 直列に つないで 飾りを 増やしたの。電池は 1個の まま。', test: c => c.bn === '1' && c.ln === '2s', how: '電池 1個・豆電球 2個 直列' },
        { id: 'c', face: '👨‍🔬', name: '電気屋 フジ', says: '電池を 2個 直列に して パワーアップしたよ。', test: c => c.bn === '2s' && c.ln === '1', how: '電池 2個 直列・豆電球 1個' },
        { id: 'd', face: '🧑‍🏭', name: '配線係 ゲン', says: '電池を 並列に して、豆電球も 2個 直列に した。', test: c => c.bn === '2p' && c.ln === '2s', how: '電池 2個 並列・豆電球 2個 直列' } ],
      sim: 'circuit',
      qs: [
        { q: '豆電球を 2個 直列に すると、1個の 明るさは?', o: ['1/4 に なる', '1/2 に なる', '変わらない', '2倍に なる'], hint: '電池 1個のまま、豆電球 1個 と 2個 直列 を くらべよう。' },
        { q: '電池を 2個 並列に すると?', o: ['明るさは 同じで、電池が 長持ちする', '明るさが 2倍に なる', '暗く なる', '電池が 早く なくなる'], hint: '豆電球 1個のまま、電池 1個 と 2個 並列 を くらべよう。' },
        { q: '証拠 (明るさ 1/4・もち 4倍) と ぴったり 合う つなぎ方は?', o: ['電池 2個 並列 + 豆電球 2個 直列', '電池 1個 + 豆電球 2個 直列', '電池 2個 並列 + 豆電球 1個', '電池 2個 直列 + 豆電球 2個 直列'], hint: '明るさだけで なく「電池の もち」も 証拠と くらべよう。エミの つなぎ方は もち 何倍?' } ],
      culprit: 'd',
      reveal: 'エミの つなぎ方でも 明るさは 1/4 に なるが、電池の もちは 2倍。<b>明るさ 1/4 と もち 4倍</b> の 両方が 合うのは、ゲンの「電池 並列 + 豆電球 直列」だけ。証拠は 1つでなく 全部 くらべよう!',
      vocab: [['circuit', '回路'], ['series', '直列'], ['parallel', '並列'], ['current', '電流'], ['brightness', '明るさ']],
      summary: '豆電球を 直列に すると 抵抗が 2倍で 電流が 半分 → 1個の 明るさは 1/4 (明るさは 電流の 2乗に 比例)。電池を 並列に すると 電圧は 同じで、2個で 電流を 分けあうので 長持ち。電流が 半分 × 2個で 分担 → もちは 4倍。' },
    { id: 'dissolve', icon: '🧂', name: '理科室の 白い 結晶', field: '化学 · もののとけ方', level: '★★★',
      story: '理科室の 名前の ない ビーカーの 底に 白い 結晶が できていた。粉を とかしたと 言う 3人の 証言は 本当か? 結晶の 重さが 決め手だ。',
      evidence: ['ビーカーの 水は <b>100g</b>。ゴミ箱に <b>50g 入りの 空ぶくろ</b>', 'メモ「60℃で <b>全部 とけた</b>」', '一晩で <b>20℃</b> まで 冷えて、結晶が <b>約18g</b> 出ていた'],
      suspects: [
        { id: 'a', face: '🧑‍🍳', name: '料理部 ハナ', says: 'わたしは 食塩 30g を 60℃の 水に とかした。冷えても 結晶は 出なかったよ。', test: c => c.sub === 'salt' && near(c.G, 30) && near(c.W, 100) && near(c.T1, 60) && near(c.T2, 20), how: '食塩 30g・水 100g・60℃→20℃' },
        { id: 'b', face: '🧑‍🎨', name: '美術部 イツキ', says: 'ミョウバン 20g で 結晶作りの 練習を した。少し 結晶が できたかな。', test: c => c.sub === 'alum' && near(c.G, 20) && near(c.W, 100) && near(c.T1, 60) && near(c.T2, 20), how: 'ミョウバン 20g・水 100g・60℃→20℃' },
        { id: 'c', face: '🧑‍🌾', name: '園芸部 ジュン', says: '肥料の 硝酸カリウムを 30g だけ とかした。結晶なんて できないはず。', test: c => c.sub === 'kno3' && near(c.G, 30) && near(c.W, 100) && near(c.T1, 60) && near(c.T2, 20), how: '硝酸カリウム 30g・水 100g・60℃→20℃' } ],
      sim: 'dissolve',
      qs: [
        { q: '60℃の 水 100g に 50g が 全部 とけるのは?', o: ['ミョウバンと 硝酸カリウム', '食塩だけ', '3つとも', '硝酸カリウムだけ'], hint: '3つの 物質で 50g・60℃ を ためそう。「とけ残り」が 出るのは どれ?' },
        { q: '50g を 60℃で とかして 20℃に 冷やしたとき、結晶が 約18g 出るのは?', o: ['硝酸カリウム', 'ミョウバン', '食塩', 'どれも 出ない'], hint: '50g・60℃→20℃ で 3つ くらべよう。' },
        { q: 'ジュンの 言うとおり 硝酸カリウム 30g なら、20℃で 結晶は?', o: ['出ない (20℃でも 31.6g まで とける)', '約18g 出る', '約30g 出る', '約11g 出る'], hint: 'ジュンの 証言どおりに 実験してみよう。' } ],
      culprit: 'c',
      reveal: '証拠は「50g の ふくろ」と「結晶 約18g」。これに 合うのは <b>硝酸カリウム 50g</b> だけ (20℃で とけるのは 31.6g → 50 − 31.6 = 18.4g)。ジュンは 本当は 50g を とかしたのに「30g だけ」と うそを ついた!',
      vocab: [['dissolve', 'とける'], ['solution', '水よう液'], ['crystal', '結晶'], ['solubility', '溶解度 (とける 量)'], ['cool', '冷やす']],
      summary: 'とける 量 (溶解度) は 物質と 温度で 決まる。食塩は 温度が 変わっても ほとんど 同じ。ミョウバンや 硝酸カリウムは 温度が 高いほど たくさん とけ、冷やすと とけきれない 分が 結晶に なる (再結晶)。出てくる 結晶 = とけていた 量 − 冷えた 温度で とける 量。' },
    { id: 'plant', icon: '🌱', name: '育たない 苗', field: '生物 · 植物の 成長', level: '★★★',
      story: '温室の トマトの 苗が ひょろひょろで 色も うすく、葉まで しおれている。管理係 3人の 証言を「対照実験」で 1つずつ たしかめよう。原因は 1つとは かぎらない…!',
      evidence: ['苗が <b>ひょろ長く</b> 伸びて、葉の 色が <b>うすい</b>', '葉が <b>しおれて</b> 下を 向いている', '前の 温室: 日なた・水やり 毎日・25℃'],
      suspects: [
        { id: 'a', face: '👩‍🌾', name: '水やり係 ミサキ', says: '節約の ために、水やりを 1週間に 1回に 減らしました。', test: c => c.diff === 'w' && c.vals.includes('daily') && c.vals.includes('w7'), how: '水だけを「毎日」と「1週間に1回」で くらべる' },
        { id: 'b', face: '🧔', name: '温度係 ゴロウ', says: '暖房の 温度を 25℃から 20℃に 下げたよ。', test: c => c.diff === 't' && c.vals.includes('t25') && c.vals.includes('t20'), how: '温度だけを「25℃」と「20℃」で くらべる' },
        { id: 'c', face: '🕵', name: '清掃係 ヨル', says: '日差しが まぶしいので、窓に 黒い シートを はりました。', test: c => c.diff === 'l' && c.vals.includes('sun') && c.vals.includes('dark'), how: '光だけを「日なた」と「黒い シート」で くらべる' } ],
      sim: 'plant',
      qs: [
        { q: '原因を たしかめる 正しい くらべ方は?', o: ['変える 条件を 1つだけに して、他は 同じに する', '条件を ぜんぶ 変えて くらべる', '1つの 鉢だけで 育てる', '毎回 ちがう 種類の 植物を 使う'], hint: '2つの 鉢で 条件が 2つ 以上 ちがうと、どれが 原因か わからない。' },
        { q: '苗が ひょろ長く、葉の 色が うすく なる 原因は?', o: ['光が 足りない', '水が 足りない', '温度が 20℃', '肥料が 多すぎる'], hint: '光だけを 変えた 対照実験の 結果を 見よう。' },
        { q: '葉が しおれる 原因は?', o: ['水が 足りない', '光が 足りない', '温度が 20℃', 'シートが 黒い'], hint: '水だけを 変えた 対照実験の 結果を 見よう。' } ],
      culprit: ['a', 'c'],
      reveal: '原因は 2つ! ひょろ長く 色が うすいのは ヨルの 黒い シート (光不足)、しおれは ミサキの 水やり 減らし (水不足)。ゴロウの 20℃は 少し 小さく なる だけで、どちらの 症状も 出ない。',
      vocab: [['photosynthesis', '光合成'], ['variable', '条件 (変数)'], ['control', '対照 (くらべる 基準)'], ['wilt', 'しおれる'], ['cause', '原因']],
      summary: '原因を 調べる ときは「変える 条件を 1つだけ」に する (対照実験)。光が 足りないと 光合成が できず、光を 求めて ひょろ長く 伸び、葉の 色が うすく なる (もやしと 同じ)。水が 足りないと 葉が しおれる。症状が 2つ あれば 原因も 2つ かもしれない。' },
    { id: 'spring', icon: '⚖', name: 'ばねばかりの いかさま', field: '物理 · ばねと 比例', level: '★★★',
      story: '八百屋の ばねばかりで はかった 野菜が、家で はかると 軽い! お客さんの 苦情で 調査開始。ばねばかりを さわった 3人の 証言を、グラフで たしかめよう。',
      evidence: ['何も のせない とき: <b>0kg</b> を 指す', '1kg の 分銅: <b>1.2kg</b> を 指す', '2kg の 分銅: <b>2.4kg</b> を 指す'],
      suspects: [
        { id: 'a', face: '🧑‍🌾', name: '店主 マサ', says: 'ばねが 古く なったから、やわらかい ばねに 取りかえた。目盛りは そのまま。', test: c => c.sp === 'soft' && near(c.z, 0) && c.w >= 1, how: 'やわらかい ばね・0点 そのまま で 1kg 以上を はかる' },
        { id: 'b', face: '👩‍💼', name: '店員 リコ', says: '掃除の ときに、目盛りの 板が 0.2kg 分 下に ずれちゃったかも。', test: c => c.sp === 'normal' && near(c.z, 0.2) && c.w >= 1, how: 'ふつうの ばね・0点を 0.2kg ずらして 1kg 以上を はかる' },
        { id: 'c', face: '🧑‍🦱', name: '常連客 トオル', says: '店主が かたい ばねに 取りかえるのを 見たよ。', test: c => c.sp === 'hard' && near(c.z, 0) && c.w >= 1, how: 'かたい ばね・0点 そのまま で 1kg 以上を はかる' } ],
      sim: 'spring',
      qs: [
        { q: 'ばねの のびと 重さの 関係は?', o: ['重さが 2倍に なると のびも 2倍 (比例)', '重さに 関係なく 同じだけ のびる', '重さが 2倍でも のびは 1.2倍', '重いほど のびなく なる'], hint: '同じ ばねで 1kg・2kg・3kg を はかって くらべよう。' },
        { q: 'リコの 言うとおり 0点が 0.2kg ずれたら、2kg の 分銅は 何kg を 指す?', o: ['2.2kg', '2.4kg', '2.0kg', '1.8kg'], hint: 'ふつうの ばね・0点 0.2kg ずらし で 2kg を はかろう。' },
        { q: '証拠 (0kg→0、1kg→1.2、2kg→2.4) と 合うのは?', o: ['やわらかい ばね (どの 重さも 1.2倍)', '0点の ずれ (どの 重さも +0.2kg)', 'かたい ばね (どの 重さも 0.8倍)', 'ふつうの ばね'], hint: '0kg の とき 0 を 指すか、2kg の とき 2.4 に なるかを グラフで くらべよう。' } ],
      culprit: 'a',
      reveal: '0点が ずれただけなら 何も のせなくても 0.2kg を 指し、2kg は 2.2kg に なる。証拠は 0→0、2kg→2.4kg = <b>どの 重さも 1.2倍</b>。これは やわらかい ばねに 取りかえた とき だけ! トオルの 目撃は 見まちがいだった。',
      vocab: [['spring', 'ばね'], ['proportional', '比例'], ['scale', 'はかり'], ['weight', '重さ'], ['graph', 'グラフ']],
      summary: 'ばねの のびは のせた 重さに 比例する (フックの 法則)。やわらかい ばねは 同じ 重さで よく のびるので、目盛りが そのままだと どの 重さも 同じ 倍率で 重く 出る。0点の ずれは どの 重さにも 同じ 量を 足す。グラフに すると「傾きの ちがい」と「切片の ちがい」に なる。' },
  ];

  // ================= 一覧 =================
  function list() {
    stop();
    const d = data();
    let h = '<div class="lb-hero"><div><div class="lb-kicker">ハル&リオの</div><h1 class="lb-h1">ラボ探偵</h1><p>証言どおりに 実験して、証拠の 数値と くらべよう。合わない 証言は うそだ!</p></div>' + art(IMG + 'hero.webp', '<img src="' + KORARIN + '" alt="">', 'lb-hero-art') + '</div><div class="lb-cases">';
    CASES.forEach((c, i) => {
      const s = d.cleared[c.id] || 0;
      h += '<button class="lb-case" data-i="' + i + '">' + art(IMG + 'case_' + c.id + '.webp', '<span class="lb-case-i">' + c.icon + '</span>', 'lb-case-art') + '<span><b>' + (i + 1) + '. ' + esc(c.name) + '</b><small>' + esc(c.field) + ' ・ むずかしさ ' + c.level + '</small><span class="lb-stars">' + (s ? '★'.repeat(s) + '☆'.repeat(3 - s) : '未解決') + '</span></span></button>';
    });
    h += '</div><div class="lb-note">🔬 捜査の 手順: ① 事件ファイルで 証拠を 読む → ② 実験室で <b>全員の 証言を 再現</b> → ③ 推理 (法則 → 計算 → 証拠と くらべる) → ④ 犯人を 指名</div>';
    area().innerHTML = h;
    area().querySelectorAll('[data-i]').forEach(b => b.onclick = () => { sfx('click'); startCase(CASES[+b.dataset.i]); });
  }
  function head(t) { return '<div class="lb-head"><button class="lb-back" id="lbBack">← 事件一覧</button><div class="lb-title">' + t + '</div></div>'; }
  function bindHead() { const b = document.getElementById('lbBack'); if (b) b.onclick = () => { sfx('click'); list(); }; }
  function susPic(c, s) { return art(IMG + 'sus_' + c.id + '_' + s.id + '.webp', '<span class="lb-face">' + s.face + '</span>', 'lb-sp'); }
  const needTest = c => c.suspects.filter(s => s.test);
  const allVerified = () => needTest(cur.c).every(s => cur.ver[s.id]);

  function startCase(c) { cur = { c: c, notes: [], miss: 0, ver: {}, q: 0 }; caseView(); }
  function testimony(c, compact) {
    let h = '<div class="lb-sus">';
    c.suspects.forEach(s => {
      const v = !s.test ? '<span class="lb-chk na">実験 不要</span>' : cur.ver[s.id] ? '<span class="lb-chk ok">✅ 再現した: ' + cur.ver[s.id] + '</span>' : '<span class="lb-chk">⬜ 未検証 — ' + esc(s.how) + '</span>';
      h += '<div class="lb-su' + (compact ? ' sm' : '') + '">' + susPic(c, s) + '<div><b>' + esc(s.name) + '</b><p>「' + esc(s.says) + '」</p>' + v + '</div></div>';
    });
    return h + '</div>';
  }
  function evidenceBox(c) { return '<div class="lb-box lb-evi"><div class="lb-h2">🔎 証拠</div><ul>' + c.evidence.map(e => '<li>' + e + '</li>').join('') + '</ul></div>'; }
  function caseView() {
    stop();
    const c = cur.c;
    let h = head(c.icon + ' ' + esc(c.name));
    h += art(IMG + 'case_' + c.id + '.webp', '', 'lb-scene');
    h += '<div class="lb-box lb-talk"><img src="' + CHAR_IMAGES.haru + '" alt="" class="lb-haru"><div><b>ハル</b><p>' + esc(c.story) + '</p></div></div>';
    h += evidenceBox(c);
    h += '<div class="lb-h2">🗣 証言 (全員 実験で たしかめよう)</div>' + testimony(c);
    h += '<button class="lb-primary" id="lbExp">🔬 実験室へ</button>';
    if (allVerified()) h += '<button class="lb-secondary" id="lbSolve2">🕵 推理する</button>';
    area().innerHTML = h; bindHead();
    document.getElementById('lbExp').onclick = () => { sfx('click'); labView(); };
    const s2 = document.getElementById('lbSolve2'); if (s2) s2.onclick = () => { sfx('click'); solveView(); };
  }

  // ================= 実験室 =================
  function labView() {
    stop();
    const c = cur.c;
    let h = head('🔬 実験室 — ' + esc(c.name));
    h += '<button class="lb-tool" id="lbFile">📁 事件ファイル (証拠・証言) を 見る</button>';
    h += '<div class="lb-box" id="lbSim"></div>';
    h += '<div class="lb-box"><div class="lb-h2">🧾 証言の 検証</div><div id="lbVer"></div></div>';
    h += '<div class="lb-box"><div class="lb-h2">📓 実験ノート</div><div id="lbNotes" class="lb-notes"></div></div>';
    h += '<button class="lb-primary" id="lbSolve">🕵 推理する</button><div id="lbGate"></div>';
    area().innerHTML = h; bindHead();
    ({ pendulum: simPendulum, circuit: simCircuit, dissolve: simDissolve, plant: simPlant, spring: simSpring })[c.sim](document.getElementById('lbSim'));
    renderNotes(); renderVer();
    document.getElementById('lbFile').onclick = () => { sfx('click'); caseView(); };
    document.getElementById('lbSolve').onclick = () => {
      if (!allVerified()) { sfx('wrong'); document.getElementById('lbGate').innerHTML = '<div class="lb-warn">⚠ コラリン:「まだ 再現していない 証言が あるよ! 全員の 証言どおりに 実験してから 推理しよう。」</div>'; return; }
      sfx('click'); solveView();
    };
  }
  function renderVer() {
    const el = document.getElementById('lbVer'); if (!el) return;
    el.innerHTML = cur.c.suspects.map(s => '<div class="lb-vr">' + (!s.test ? '➖' : cur.ver[s.id] ? '✅' : '⬜') + ' <b>' + esc(s.name) + '</b> <span class="lb-small">' + (!s.test ? '(実験 不要)' : cur.ver[s.id] ? '→ ' + cur.ver[s.id] : esc(s.how)) + '</span></div>').join('');
  }
  // 実験 1回ごとに 呼ぶ: ノートに 書き、証言と 同じ 条件なら 検証済みに する
  function record(text, cfg, short) {
    cur.notes.push(text); if (cur.notes.length > 14) cur.notes.shift();
    let hit = '';
    cur.c.suspects.forEach(s => { if (s.test && s.test(cfg) && !cur.ver[s.id]) { cur.ver[s.id] = short; hit += s.name + ' '; } });
    renderNotes(); renderVer();
    if (hit) { sfx('unlock'); const o = document.getElementById('lbGate'); if (o) o.innerHTML = '<div class="lb-okmsg">✅ ' + esc(hit) + 'の 証言を 再現した!</div>'; }
  }
  function renderNotes() { const el = document.getElementById('lbNotes'); if (el) el.innerHTML = cur.notes.length ? cur.notes.map(n => '<div>• ' + n + '</div>').join('') : '<span class="lb-small">まだ 記録が ない。実験すると ここに 記録されるよ。</span>'; }
  function slider(id, label, min, max, step, val, unit) { return '<label class="lb-sl">' + label + ' <b id="' + id + 'V">' + val + '</b>' + unit + '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"></label>'; }

  // ---- ① ふりこ ----
  function simPendulum(box) {
    box.innerHTML = '<div class="lb-h2">🕰 ふりこ 実験装置</div><svg viewBox="0 0 300 230" class="lb-svg"><line x1="40" y1="14" x2="260" y2="14" stroke="#7a6a50" stroke-width="5"/><line id="lbStr" x1="150" y1="14" x2="150" y2="150" stroke="#444" stroke-width="2"/><circle id="lbBob" cx="150" cy="150" r="12" fill="#c0392b"/></svg>' +
      slider('pL', 'ひもの 長さ', 0.9, 1.1, 0.01, '1.00', 'm') + slider('pM', 'おもりの 重さ', 100, 800, 100, 200, 'g') + slider('pA', 'ふれはば', 5, 25, 5, 5, '°') +
      '<button class="lb-secondary" id="pRun">⏱ 100往復の 時間を はかる</button><div id="pOut" class="lb-out"></div>';
    const L = document.getElementById('pL'), M = document.getElementById('pM'), A = document.getElementById('pA');
    const upd = () => { document.getElementById('pLV').textContent = (+L.value).toFixed(2); document.getElementById('pMV').textContent = M.value; document.getElementById('pAV').textContent = A.value; };
    [L, M, A].forEach(x => x.oninput = upd);
    const t0 = performance.now();
    const draw = now => {
      const len = +L.value, T = period(len, +A.value), th = (+A.value) * 2 * Math.PI / 180 * Math.cos(2 * Math.PI * ((now - t0) / 1000) / T);
      const px = 30 + (len - 0.85) * 500, x = 150 + px * Math.sin(th), y = 14 + px * Math.cos(th);
      const s = document.getElementById('lbStr'), b = document.getElementById('lbBob'); if (!s) return;
      s.setAttribute('x2', x); s.setAttribute('y2', y); b.setAttribute('cx', x); b.setAttribute('cy', y); b.setAttribute('r', 6 + (+M.value) / 70);
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    document.getElementById('pRun').onclick = () => {
      sfx('click');
      const len = +(+L.value).toFixed(2), a = +A.value, m = +M.value, T = period(len, a), lag = dayLagMin(len, a);
      const lagTxt = Math.abs(lag) < 0.05 ? 'ずれない' : '約' + Math.abs(lag).toFixed(1) + '分 ' + (lag > 0 ? '遅れる' : '進む');
      document.getElementById('pOut').innerHTML = '⏱ 100往復: <b>' + (100 * T).toFixed(1) + '秒</b> → 1往復 <b>' + T.toFixed(3) + '秒</b><br>🕰 この ふりこの 時計は 1日に <b>' + lagTxt + '</b> <span class="lb-small">(整備前 1往復 ' + T0.toFixed(3) + '秒 と くらべて)</span>';
      record('長さ ' + len.toFixed(2) + 'm ・ ' + m + 'g ・ ' + a + '° → 1往復 ' + T.toFixed(3) + '秒 ・ 1日 ' + lagTxt, { L: len, M: m, A: a }, '1日 ' + lagTxt);
    };
  }

  // ---- ② 電気回路 ----
  function simCircuit(box) {
    box.innerHTML = '<div class="lb-h2">💡 回路 実験ボード</div><div id="cDraw"></div>' +
      '<div class="lb-opts"><div><b>電池</b><button class="lb-opt on" data-k="bn" data-v="1">1個</button><button class="lb-opt" data-k="bn" data-v="2s">2個 直列</button><button class="lb-opt" data-k="bn" data-v="2p">2個 並列</button></div>' +
      '<div><b>豆電球</b><button class="lb-opt on" data-k="ln" data-v="1">1個</button><button class="lb-opt" data-k="ln" data-v="2s">2個 直列</button><button class="lb-opt" data-k="ln" data-v="2p">2個 並列</button></div></div>' +
      '<button class="lb-secondary" id="cRun">🔌 スイッチ ON (明るさと 電池の もちを はかる)</button><div id="cOut" class="lb-out"></div>';
    const cfg = { bn: '1', ln: '1' };
    const draw = on => {
      const r = circuit(cfg.bn, cfg.ln), glow = on ? Math.min(1, 0.12 + r.bright * 0.45) : 0.06, n = cfg.ln === '1' ? 1 : 2, nb = cfg.bn === '1' ? 1 : 2;
      let s = '<svg viewBox="0 0 300 150" class="lb-svg"><rect x="20" y="20" width="260" height="110" rx="10" fill="none" stroke="#555" stroke-width="3"/>';
      if (cfg.bn === '2p') s += '<line x1="34" y1="60" x2="34" y2="94" stroke="#555" stroke-width="3"/><line x1="74" y1="60" x2="74" y2="94" stroke="#555" stroke-width="3"/>';
      for (let i = 0; i < nb; i++) { const x = cfg.bn === '2p' ? 40 : 40 + i * 34, y = cfg.bn === '2p' ? 60 + i * 34 : 130; s += '<rect x="' + x + '" y="' + (y - 10) + '" width="28" height="20" rx="3" fill="#e5b33a" stroke="#555"/><text x="' + (x + 14) + '" y="' + (y + 4) + '" font-size="10" text-anchor="middle">1.5V</text>'; }
      if (cfg.ln === '2p') s += '<line x1="200" y1="20" x2="200" y2="95" stroke="#555" stroke-width="3"/><line x1="160" y1="20" x2="160" y2="95" stroke="#555" stroke-width="3"/><line x1="160" y1="95" x2="200" y2="95" stroke="#555" stroke-width="3"/>';
      for (let i = 0; i < n; i++) { const x = cfg.ln === '2p' ? 180 : 170 + i * 50, y = cfg.ln === '2p' ? 45 + i * 50 : 20; s += '<circle cx="' + x + '" cy="' + y + '" r="16" fill="rgba(255,220,80,' + glow + ')" stroke="#666" stroke-width="2"/><circle cx="' + x + '" cy="' + y + '" r="' + (6 + glow * 26) + '" fill="rgba(255,230,120,' + (glow * 0.45) + ')"/>'; }
      return s + '</svg>';
    };
    const upd = on => { document.getElementById('cDraw').innerHTML = draw(on); };
    upd(false);
    box.querySelectorAll('.lb-opt').forEach(b => b.onclick = () => { sfx('click'); cfg[b.dataset.k] = b.dataset.v; box.querySelectorAll('.lb-opt[data-k="' + b.dataset.k + '"]').forEach(x => x.classList.toggle('on', x === b)); upd(false); document.getElementById('cOut').innerHTML = ''; });
    const NM = { '1': '1個', '2s': '2個 直列', '2p': '2個 並列' };
    document.getElementById('cRun').onclick = () => {
      sfx('click'); upd(true); const r = circuit(cfg.bn, cfg.ln);
      document.getElementById('cOut').innerHTML = '電圧 ' + r.V + 'V ・ 電流 ' + r.I.toFixed(2) + 'A<br>💡 豆電球 1個の 明るさ: <b>' + frac(r.bright) + '</b> ・ 🔋 電池の もち: <b>' + frac(r.life) + '</b> <span class="lb-small">(電池1個・豆電球1個 と くらべて)</span>';
      record('電池 ' + NM[cfg.bn] + ' ・ 豆電球 ' + NM[cfg.ln] + ' → 明るさ ' + frac(r.bright) + ' ・ もち ' + frac(r.life), { bn: cfg.bn, ln: cfg.ln }, '明るさ ' + frac(r.bright) + '・もち ' + frac(r.life));
    };
  }

  // ---- ③ もののとけ方 ----
  function simDissolve(box) {
    box.innerHTML = '<div class="lb-h2">🧪 とかして 冷やす 実験</div>' +
      '<div class="lb-opts"><div><b>物質</b><button class="lb-opt on" data-s="salt">食塩</button><button class="lb-opt" data-s="alum">ミョウバン</button><button class="lb-opt" data-s="kno3">硝酸カリウム</button></div></div>' +
      slider('dW', '水の 量', 50, 200, 50, 100, 'g') + slider('dG', 'とかす 量', 5, 60, 5, 30, 'g') + slider('dT1', 'とかす ときの 温度', 0, 80, 10, 60, '℃') + slider('dT2', '冷やした あとの 温度', 0, 80, 10, 20, '℃') +
      '<button class="lb-secondary" id="dRun">🔥 とかして → ❄ 冷やす</button><div id="dOut" class="lb-out"></div><svg viewBox="0 0 300 74" class="lb-svg" id="dGraph"></svg>';
    let sub = 'salt';
    box.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { sfx('click'); sub = b.dataset.s; box.querySelectorAll('[data-s]').forEach(x => x.classList.toggle('on', x === b)); graph(); });
    ['dW', 'dG', 'dT1', 'dT2'].forEach(id => document.getElementById(id).oninput = () => { document.getElementById(id + 'V').textContent = document.getElementById(id).value; });
    const graph = () => {
      let s = '<text x="4" y="10" font-size="9" fill="#555">' + SOL[sub].n + ' が 100g の 水に とける 量 (g)</text>';
      SOL[sub].t.forEach((v, i) => { const hh = Math.min(48, v / 1.3); s += '<rect x="' + (20 + i * 55) + '" y="' + (62 - hh) + '" width="34" height="' + hh + '" fill="#7fb3d5"/><text x="' + (37 + i * 55) + '" y="' + (58 - hh) + '" font-size="9" text-anchor="middle">' + v + '</text><text x="' + (37 + i * 55) + '" y="72" font-size="8" text-anchor="middle">' + (i * 20) + '℃</text>'; });
      document.getElementById('dGraph').innerHTML = s;
    };
    graph();
    document.getElementById('dRun').onclick = () => {
      sfx('click');
      const W = +document.getElementById('dW').value, Gm = +document.getElementById('dG').value, T1 = +document.getElementById('dT1').value, T2 = +document.getElementById('dT2').value;
      const r = dissolve(sub, W, Gm, T1, T2);
      let out = T1 + '℃・水' + W + 'g に とける 最大量 ' + r.m1.toFixed(1) + 'g → ' + (r.left1 > 0.05 ? '<b>' + r.left1.toFixed(1) + 'g とけ残った</b>' : '<b>ぜんぶ とけた</b>') + '<br>';
      out += T2 + '℃に 冷やすと とける 最大量 ' + r.m2.toFixed(1) + 'g → ' + (r.cry > 0.05 ? '<b>結晶が ' + r.cry.toFixed(1) + 'g 出てきた ❄</b>' : '<b>結晶は 出なかった</b>');
      document.getElementById('dOut').innerHTML = out;
      const res = (r.cry > 0.05 ? '結晶 ' + r.cry.toFixed(1) + 'g' : '結晶なし') + (r.left1 > 0.05 ? ' (とけ残り ' + r.left1.toFixed(1) + 'g)' : '');
      record(SOL[sub].n + ' ' + Gm + 'g / 水' + W + 'g / ' + T1 + '℃→' + T2 + '℃ : ' + res, { sub: sub, W: W, G: Gm, T1: T1, T2: T2 }, res);
    };
  }

  // ---- ④ 植物の 成長 (2つの 鉢で 対照実験) ----
  function simPlant(box) {
    const pots = [{ l: 'sun', w: 'daily', t: 't25' }, { l: 'sun', w: 'daily', t: 't25' }];
    const sel = (i, k, M) => '<div><b>' + ({ l: '光', w: '水', t: '温度' })[k] + '</b>' + Object.keys(M).map(v => '<button class="lb-opt' + (pots[i][k] === v ? ' on' : '') + '" data-p="' + i + '" data-k="' + k + '" data-v="' + v + '">' + M[v][0] + '</button>').join('') + '</div>';
    const leaf = (x, y, r) => '<ellipse cx="' + x + '" cy="' + y + '" rx="10" ry="4.5" fill="' + (r.pale ? '#c9df85' : '#4caf50') + '" transform="rotate(' + (r.wilt ? 45 : -15) + ' ' + x + ' ' + y + ')"/>';
    const render = () => {
      let h = '<div class="lb-h2">🌱 2つの 鉢で くらべる (14日間)</div><div class="lb-pots">';
      [0, 1].forEach(i => { h += '<div class="lb-pot"><div class="lb-pot-h">鉢 ' + 'AB'[i] + '</div>' + sel(i, 'l', LIGHT) + sel(i, 'w', WATER) + sel(i, 't', TEMP) + '</div>'; });
      h += '</div><button class="lb-secondary" id="gRun">📆 14日間 育てる</button><div id="gOut" class="lb-out"></div>';
      box.innerHTML = h;
      box.querySelectorAll('[data-p]').forEach(b => b.onclick = () => { sfx('click'); pots[+b.dataset.p][b.dataset.k] = b.dataset.v; render(); });
      document.getElementById('gRun').onclick = () => {
        sfx('click');
        const diff = ['l', 'w', 't'].filter(k => pots[0][k] !== pots[1][k]);
        const g = pots.map(grow);
        let o = '<svg viewBox="0 0 300 130" class="lb-svg">';
        g.forEach((r, i) => { const x = 80 + i * 140, hh = r.h * 3.4, top = 104 - hh; o += '<rect x="' + (x - 22) + '" y="104" width="44" height="22" fill="#b5651d"/><path d="M' + x + ' 104 Q' + (x + (r.wilt ? 10 : 2)) + ' ' + (104 - hh / 2) + ' ' + (x + (r.wilt ? 14 : 0)) + ' ' + top + '" stroke="' + (r.pale ? '#b9d36a' : '#3c8d2f') + '" stroke-width="' + (r.pale ? 2 : 5) + '" fill="none"/>' + leaf(x - 9, top + 8, r) + leaf(x + 9 + (r.wilt ? 12 : 0), top + 14, r) + leaf(x - 9, top + hh * 0.5, r) + '<text x="' + x + '" y="12" font-size="11" text-anchor="middle">鉢' + 'AB'[i] + ' ' + r.h.toFixed(1) + 'cm</text>'; });
        o += '</svg>';
        const D = r => '高さ <b>' + r.h.toFixed(1) + 'cm</b> ・ くき ' + r.stem + ' ・ 葉 ' + (r.pale ? 'うすい 黄緑' : '緑') + (r.wilt ? ' ・ <b>しおれている</b>' : '');
        g.forEach((r, i) => { o += '<div>鉢' + 'AB'[i] + ': ' + D(r) + '</div>'; });
        if (diff.length !== 1) o += '<div class="lb-warn">⚠ コラリン:「' + (diff.length ? '条件が ' + diff.length + 'つ ちがうよ! どれが 原因か わからない。変える 条件は 1つだけに しよう (対照実験)。' : '2つとも 同じ 条件だよ。1つだけ 変えて くらべよう。') + '」</div>';
        document.getElementById('gOut').innerHTML = o;
        const P = p => LIGHT[p.l][0] + '/' + WATER[p.w][0] + '/' + TEMP[p.t][0];
        const sym = r => (r.pale ? 'ひょろ・色うすい' : '') + (r.wilt ? (r.pale ? '・' : '') + 'しおれ' : '') || '元気';
        const k = diff[0], vals = diff.length === 1 ? [pots[0][k], pots[1][k]] : [];
        record('A(' + P(pots[0]) + ') ' + g[0].h.toFixed(1) + 'cm ' + sym(g[0]) + ' ⇔ B(' + P(pots[1]) + ') ' + g[1].h.toFixed(1) + 'cm ' + sym(g[1]) + (diff.length === 1 ? ' ✅ 対照実験' : ' ⚠ 条件 ' + diff.length + 'つ ちがい'),
          { diff: diff.length === 1 ? k : null, vals: vals }, diff.length === 1 ? sym(g[0]) + ' ⇔ ' + sym(g[1]) : '');
      };
    };
    render();
  }

  // ---- ⑤ ばねばかり (グラフで くらべる) ----
  function simSpring(box) {
    const pts = [];
    box.innerHTML = '<div class="lb-h2">⚖ ばねばかり 実験台</div>' +
      '<div class="lb-opts"><div><b>ばね</b>' + Object.keys(SPRING).map((k, i) => '<button class="lb-opt' + (i ? '' : ' on') + '" data-k="sp" data-v="' + k + '">' + SPRING[k][0] + '</button>').join('') + '</div>' +
      '<div><b>0点</b><button class="lb-opt on" data-k="z" data-v="0">そのまま</button><button class="lb-opt" data-k="z" data-v="0.2">0.2kg 下に ずらす</button></div></div>' +
      slider('sW', 'のせる 分銅', 0, 3, 0.5, 1, 'kg') + '<button class="lb-secondary" id="sRun">⚖ はかる</button><div id="sOut" class="lb-out"></div><div id="sGraph"></div>';
    const cfg = { sp: 'normal', z: '0' };
    const COL = { normal: '#3a7bc8', soft: '#d35400', hard: '#27ae60' };
    const graph = () => {
      const X = w => 34 + w * 80, Y = v => 150 - v * 36;
      let s = '<svg viewBox="0 0 300 170" class="lb-svg"><line x1="34" y1="150" x2="290" y2="150" stroke="#888"/><line x1="34" y1="150" x2="34" y2="8" stroke="#888"/>';
      for (let i = 0; i <= 3; i++) s += '<text x="' + X(i) + '" y="164" font-size="9" text-anchor="middle">' + i + 'kg</text><text x="28" y="' + (Y(i) + 3) + '" font-size="9" text-anchor="end">' + i + '</text><line x1="34" y1="' + Y(i) + '" x2="290" y2="' + Y(i) + '" stroke="#e5e5e5"/>';
      s += '<text x="290" y="146" font-size="8" text-anchor="end" fill="#666">本当の 重さ →</text><text x="38" y="14" font-size="8" fill="#666">↑ 目盛り</text>';
      [[0, 0], [1, 1.2], [2, 2.4]].forEach(p => { s += '<text x="' + X(p[0]) + '" y="' + (Y(p[1]) + 5) + '" font-size="15" text-anchor="middle" fill="#222">★</text>'; });
      pts.forEach(p => { s += '<circle cx="' + X(p.w) + '" cy="' + Y(p.v) + '" r="4.5" fill="' + COL[p.sp] + '" stroke="#fff"' + (p.z ? ' stroke-dasharray="2 1" stroke-width="2"' : '') + '/>'; });
      s += '</svg><div class="lb-small">★ = 証拠 (お店の ばねばかり) ・ <span style="color:' + COL.normal + '">●ふつう</span> <span style="color:' + COL.soft + '">●やわらかい</span> <span style="color:' + COL.hard + '">●かたい</span> (0点ずらしは 点線の ふち)</div>';
      document.getElementById('sGraph').innerHTML = s;
    };
    graph();
    box.querySelectorAll('.lb-opt').forEach(b => b.onclick = () => { sfx('click'); cfg[b.dataset.k] = b.dataset.v; box.querySelectorAll('.lb-opt[data-k="' + b.dataset.k + '"]').forEach(x => x.classList.toggle('on', x === b)); });
    document.getElementById('sW').oninput = () => { document.getElementById('sWV').textContent = document.getElementById('sW').value; };
    document.getElementById('sRun').onclick = () => {
      sfx('click');
      const w = +document.getElementById('sW').value, z = +cfg.z, v = scale(cfg.sp, z, w);
      pts.push({ w: w, v: v, sp: cfg.sp, z: z }); if (pts.length > 24) pts.shift(); graph();
      document.getElementById('sOut').innerHTML = SPRING[cfg.sp][0] + (z ? ' (0点 0.2kg ずらし)' : '') + ' に ' + w + 'kg → 目盛りは <b>' + v.toFixed(1) + 'kg</b>';
      record(SPRING[cfg.sp][0] + (z ? '+0点ずらし' : '') + ' : ' + w + 'kg → ' + v.toFixed(1) + 'kg', { sp: cfg.sp, z: z, w: w }, w + 'kg→' + v.toFixed(1) + 'kg');
    };
  }

  // ================= 推理 =================
  function solveView() {
    stop();
    const c = cur.c;
    if (cur.q < c.qs.length) return questionView();
    culpritView();
  }
  function notesBox() { return '<details class="lb-box lb-nd"><summary>📓 実験ノートを 見る (' + cur.notes.length + ')</summary><div class="lb-notes">' + cur.notes.map(n => '<div>• ' + n + '</div>').join('') + '</div></details>'; }
  function questionView() {
    const c = cur.c, Q = c.qs[cur.q];
    let h = head('🕵 推理 ' + (cur.q + 1) + ' / ' + (c.qs.length + 1) + ' — ' + esc(c.name));
    h += '<div class="lb-steps">' + c.qs.map((_, i) => '<span class="' + (i < cur.q ? 'done' : i === cur.q ? 'now' : '') + '">Q' + (i + 1) + '</span>').join('') + '<span>犯人</span></div>';
    h += evidenceBox(c) + notesBox();
    h += '<div class="lb-box"><div class="lb-h2">Q' + (cur.q + 1) + '. ' + esc(Q.q) + '</div><div class="lb-reasons">';
    shuffle(Q.o.map((t, i) => [t, i])).forEach(([t, i]) => { h += '<button class="lb-rs" data-r="' + i + '">' + esc(t) + '</button>'; });
    h += '</div><div id="lbFb"></div></div><button class="lb-secondary" id="lbBackLab">🔬 実験室に もどって たしかめる</button>';
    area().innerHTML = h; bindHead();
    document.getElementById('lbBackLab').onclick = () => { sfx('click'); labView(); };
    area().querySelectorAll('[data-r]').forEach(x => x.onclick = () => {
      if (+x.dataset.r !== 0) { sfx('wrong'); cur.miss++; x.classList.add('ng'); x.disabled = true; document.getElementById('lbFb').innerHTML = '<div class="lb-warn">💡 コラリン:「' + esc(Q.hint) + '」</div>'; return; }
      sfx('unlock'); x.classList.add('ok'); area().querySelectorAll('[data-r]').forEach(b => b.disabled = true);
      setTimeout(() => { cur.q++; solveView(); }, 650);
    });
  }
  function culpritView() {
    const c = cur.c, multi = Array.isArray(c.culprit);
    let h = head('🕵 推理 ' + (c.qs.length + 1) + ' / ' + (c.qs.length + 1) + ' — ' + esc(c.name));
    h += '<div class="lb-steps">' + c.qs.map((_, i) => '<span class="done">Q' + (i + 1) + '</span>').join('') + '<span class="now">犯人</span></div>';
    h += evidenceBox(c) + notesBox();
    h += '<div class="lb-box"><div class="lb-h2">' + (multi ? '最後の 推理: 原因を 作った 人を <b>全員</b> 選ぼう' : '最後の 推理: 犯人は だれ?') + '</div><div class="lb-pick">';
    c.suspects.forEach(s => { h += '<button class="lb-pk" data-s="' + s.id + '">' + susPic(c, s) + '<span>' + esc(s.name) + '</span></button>'; });
    h += '</div>' + (multi ? '<button class="lb-primary" id="lbDecide">この 人たちで 決定</button>' : '') + '<div id="lbFb"></div></div>';
    area().innerHTML = h; bindHead();
    const picked = {};
    const judge = ids => {
      const ans = [].concat(c.culprit).sort().join(), got = ids.sort().join();
      if (ans === got) { sfx('unlock'); return setTimeout(clear, 500); }
      sfx('wrong'); cur.miss++;
      document.getElementById('lbFb').innerHTML = '<div class="lb-warn">✗ ちがうようだ… 証拠の 数値と、それぞれの 証言を 再現した 結果を もう一度 くらべよう。' + (multi ? ' (症状は 2つ あるよ)' : '') + '</div>';
    };
    area().querySelectorAll('[data-s]').forEach(b => b.onclick = () => {
      sfx('click');
      if (multi) { picked[b.dataset.s] = !picked[b.dataset.s]; b.classList.toggle('sel', picked[b.dataset.s]); return; }
      if (b.dataset.s !== c.culprit) { b.classList.add('ng'); b.disabled = true; }
      judge([b.dataset.s]);
    });
    const dc = document.getElementById('lbDecide');
    if (dc) dc.onclick = () => judge(Object.keys(picked).filter(k => picked[k]));
  }
  function clear() {
    const c = cur.c, stars = cur.miss === 0 ? 3 : cur.miss <= 2 ? 2 : 1;
    const d = data(); d.cleared[c.id] = Math.max(d.cleared[c.id] || 0, stars); save();
    let h = head('🎉 事件解決 — ' + esc(c.name));
    const culs = [].concat(c.culprit).map(id => c.suspects.find(s => s.id === id));
    h += '<div class="lb-box lb-center"><div class="lb-big">🎉</div><div class="lb-culs">' + culs.map(s => '<div>' + susPic(c, s) + '<b>' + esc(s.name) + '</b></div>').join('') + '</div><p>' + (culs.length > 1 ? '原因を 作ったのは この ' + culs.length + '人!' : '犯人は <b>' + esc(culs[0].name) + '</b>!') + '</p><div class="lb-stars big">' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + '</div><p class="lb-small">まちがい ' + cur.miss + '回 ・ 実験 ' + cur.notes.length + '回</p></div>';
    h += '<div class="lb-box lb-talk"><img src="' + KORADON + '" alt=""><div><b>コラドンの 種あかし</b><p>' + c.reveal + '</p></div></div>';
    h += '<div class="lb-box lb-talk"><img src="' + KORARIN + '" alt=""><div><b>コラリンの まとめ</b><p>' + esc(c.summary) + '</p></div></div>';
    h += '<div class="lb-box"><div class="lb-h2">🔤 実験の 英語カード (タップで 発音)</div><div class="lb-vocab">';
    c.vocab.forEach(v => { h += '<button class="lb-vc" data-en="' + esc(v[0]) + '"><b>' + esc(v[0]) + '</b><small>' + esc(v[1]) + '</small></button>'; });
    h += '</div></div><button class="lb-primary" id="lbList">事件一覧へ</button>';
    area().innerHTML = h; bindHead();
    area().querySelectorAll('[data-en]').forEach(b => b.onclick = () => sayEn(b.dataset.en));
    document.getElementById('lbList').onclick = () => { sfx('click'); list(); };
  }

  function open() { showPage('pageLab'); list(); const p = document.getElementById('pageLab'); if (p) p.scrollTop = 0; }
  return { open: open, stop: stop, _speechTexts: () => CASES.flatMap(c => c.vocab.map(v => ['N', v[0]])), _cases: CASES, _solub: solub, _period: period, _lag: dayLagMin, _circuit: circuit, _dissolve: dissolve, _cur: () => cur };
})();
