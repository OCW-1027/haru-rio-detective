/* engine/weather-challenge.js — 新コンテンツ② お天気予報チャレンジ (気象科学)
 * 本物の 気象データ (Open-Meteo, 非商用・キー不要) を 見て「あした の 天気」を 予報 → 次の日 実際の 天気で 採点。
 * 練習モード: 過去の ある日の データで 予報 → その場で 答え合わせ。
 * 保存: State.v2.wx = { preds: [{city, date, wx, tmax, tmin, pro, made}], done: [{city, date, score, pro, ...}] }
 * Dependencies: State, saveState, showPage, sfx, escapeHtml, Hub
 */
const WeatherChallenge = (function () {
  const KORARIN = 'assets/img/chars/spirits/korarin_greet_01.webp';
  const KORADON = 'assets/img/chars/spirits/koradon_idle_01.webp';
  const API = 'https://api.open-meteo.com/v1/forecast';
  const ARCHIVE = 'https://archive-api.open-meteo.com/v1/archive';
  const CITIES = [
    { id: 'tokyo', name: '東京', lat: 35.69, lon: 139.69, up: ['osaka', 'fukuoka'] },
    { id: 'osaka', name: '大阪', lat: 34.69, lon: 135.50, up: ['hiroshima', 'fukuoka'] },
    { id: 'sapporo', name: '札幌', lat: 43.06, lon: 141.35, up: ['akita', 'vladivostok'] },
    { id: 'naha', name: '那覇', lat: 26.21, lon: 127.68, up: ['taipei', 'shanghai'] },
  ];
  const UP = {
    osaka: { name: '大阪', lat: 34.69, lon: 135.50 }, fukuoka: { name: '福岡', lat: 33.59, lon: 130.40 },
    hiroshima: { name: '広島', lat: 34.39, lon: 132.46 }, akita: { name: '秋田', lat: 39.72, lon: 140.10 },
    vladivostok: { name: 'ウラジオストク', lat: 43.12, lon: 131.89 }, taipei: { name: '台北', lat: 25.03, lon: 121.56 },
    shanghai: { name: '上海', lat: 31.23, lon: 121.47 },
  };
  const WX = { sun: { n: '晴れ', i: '☀️', en: 'sunny' }, cloud: { n: 'くもり', i: '☁️', en: 'cloudy' }, rain: { n: '雨', i: '☔', en: 'rainy' }, snow: { n: '雪', i: '⛄', en: 'snowy' } };

  let cityId = 'tokyo';
  function area() { return document.getElementById('wxArea'); }
  function esc(s) { return escapeHtml(String(s)); }
  function data() { if (!State.v2) State.v2 = {}; const d = State.v2.wx || (State.v2.wx = {}); d.preds = d.preds || []; d.done = d.done || []; return d; }
  function save() { try { saveState(); } catch (e) {} }
  function jstDate(off) { const t = new Date(Date.now() + 9 * 3600e3 + (off || 0) * 864e5); return t.toISOString().slice(0, 10); }
  function addDays(d, n) { const t = new Date(d + 'T00:00:00Z'); t.setUTCDate(t.getUTCDate() + n); return t.toISOString().slice(0, 10); }
  function jpDate(d) { const t = new Date(d + 'T00:00:00Z'); return (t.getUTCMonth() + 1) + '月' + t.getUTCDate() + '日 (' + '日月火水木金土'[t.getUTCDay()] + ')'; }
  const city = id => CITIES.find(c => c.id === id);

  // WMO 天気コード + 降水量 → 4分類
  function cat(code, precip) {
    const snow = (code >= 71 && code <= 77) || code === 85 || code === 86;
    if (precip >= 1 || (code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return snow ? 'snow' : 'rain';
    if (snow) return 'snow';
    return code <= 2 ? 'sun' : 'cloud';
  }
  // 採点: 天気 50点 (近い 天気は 部分点) + 最高気温 25点 + 最低気温 25点 (1℃ずれる ごとに −5)
  const NEAR = { 'sun>cloud': 15, 'cloud>sun': 15, 'cloud>rain': 15, 'rain>cloud': 15, 'rain>snow': 30, 'snow>rain': 30, 'cloud>snow': 10, 'snow>cloud': 10 };
  function score(p, a) {
    let s = p.wx === a.wx ? 50 : (NEAR[p.wx + '>' + a.wx] || 0);
    s += Math.max(0, 25 - 5 * Math.round(Math.abs(p.tmax - a.tmax)));
    s += Math.max(0, 25 - 5 * Math.round(Math.abs(p.tmin - a.tmin)));
    return s;
  }
  async function getJSON(url) {
    const r = await fetch(url); if (!r.ok) throw new Error('HTTP ' + r.status); return r.json();
  }
  const DAILY = 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum';
  const HOURLY = 'pressure_msl,relative_humidity_2m,cloud_cover,wind_direction_10m';
  function q(o) { return Object.keys(o).map(k => k + '=' + encodeURIComponent(o[k])).join('&'); }

  // ---------- データ 取得 ----------
  async function liveData(c) {
    const main = await getJSON(API + '?' + q({ latitude: c.lat, longitude: c.lon, daily: DAILY, hourly: HOURLY, past_days: 3, forecast_days: 2, timezone: 'Asia/Tokyo' }));
    const ups = await Promise.all(c.up.map(id => getJSON(API + '?' + q({ latitude: UP[id].lat, longitude: UP[id].lon, daily: DAILY, past_days: 0, forecast_days: 1, timezone: 'Asia/Tokyo' })).then(j => ({ id: id, j: j })).catch(() => null)));
    return { main: main, ups: ups.filter(Boolean), today: jstDate(0) };
  }
  async function archiveData(c, day) {
    const main = await getJSON(ARCHIVE + '?' + q({ latitude: c.lat, longitude: c.lon, daily: DAILY, hourly: HOURLY, start_date: addDays(day, -3), end_date: addDays(day, 1), timezone: 'Asia/Tokyo' }));
    const ups = await Promise.all(c.up.map(id => getJSON(ARCHIVE + '?' + q({ latitude: UP[id].lat, longitude: UP[id].lon, daily: DAILY, start_date: day, end_date: day, timezone: 'Asia/Tokyo' })).then(j => ({ id: id, j: j })).catch(() => null)));
    return { main: main, ups: ups.filter(Boolean), today: day };
  }
  function dayIdx(j, d) { return j.daily.time.indexOf(d); }
  function dayRec(j, d) { const i = dayIdx(j, d); if (i < 0) return null; const D = j.daily; return { code: D.weather_code[i], tmax: D.temperature_2m_max[i], tmin: D.temperature_2m_min[i], pr: D.precipitation_sum[i], wx: cat(D.weather_code[i], D.precipitation_sum[i]) }; }

  // ---------- 観測データの 表示 ----------
  function panel(dt, hideFuture) {
    const j = dt.main, today = dt.today;
    let h = '<div class="wx-box"><div class="wx-h">📅 ' + esc(city(cityId).name) + ' の ここ数日</div><div class="wx-days">';
    for (let k = -3; k <= 0; k++) {
      const d = addDays(today, k), r = dayRec(j, d); if (!r) continue;
      h += '<div class="wx-day' + (k === 0 ? ' today' : '') + '"><small>' + (k === 0 ? (hideFuture === 'archive' ? 'この日' : 'きょう') : jpDate(d)) + '</small><span class="wx-ico">' + WX[r.wx].i + '</span><b>' + Math.round(r.tmax) + '° / ' + Math.round(r.tmin) + '°</b><small>💧' + r.pr.toFixed(1) + 'mm</small></div>';
    }
    h += '<div class="wx-day q"><small>あした</small><span class="wx-ico">❓</span><b>予報しよう</b></div></div></div>';
    // 気圧グラフ (過去 48時間)
    const H = j.hourly, end = H.time.findIndex(t => t >= today + 'T' + (hideFuture === 'archive' ? '23:00' : nowHour()));
    const last = end < 0 ? H.time.length - 1 : end;
    const from = Math.max(0, last - 48);
    const P = H.pressure_msl.slice(from, last + 1), T = H.time.slice(from, last + 1);
    if (P.length > 2) {
      const mn = Math.min(...P) - 1, mx = Math.max(...P) + 1, W = 320, Hh = 110;
      const pts = P.map((p, i) => (i / (P.length - 1) * (W - 20) + 10).toFixed(1) + ',' + (Hh - 14 - (p - mn) / (mx - mn) * (Hh - 30)).toFixed(1)).join(' ');
      const diff = P[P.length - 1] - P[Math.max(0, P.length - 25)];
      h += '<div class="wx-box"><div class="wx-h">🧭 気圧の 変化 (48時間)</div><svg viewBox="0 0 ' + W + ' ' + Hh + '" class="wx-chart"><polyline points="' + pts + '" fill="none" stroke="#2a6fb0" stroke-width="2.5"/><text x="10" y="12">' + Math.round(mx) + 'hPa</text><text x="10" y="' + (Hh - 2) + '">' + Math.round(mn) + 'hPa</text><text x="' + (W - 10) + '" y="' + (Hh - 2) + '" text-anchor="end">いま</text></svg>';
      h += '<p class="wx-small">24時間で <b class="' + (diff < -2 ? 'down' : diff > 2 ? 'up' : '') + '">' + (diff >= 0 ? '+' : '') + diff.toFixed(1) + ' hPa</b> ' + (diff < -2 ? '⬇ 下がっている' : diff > 2 ? '⬆ 上がっている' : '→ あまり 変わらない') + '</p></div>';
      const hum = H.relative_humidity_2m[last], cl = H.cloud_cover[last], wd = H.wind_direction_10m[last];
      h += '<div class="wx-box wx-now"><span>💧 湿度 <b>' + Math.round(hum) + '%</b></span><span>☁ 雲の 量 <b>' + Math.round(cl) + '%</b></span><span>🌬 風向き <b>' + windName(wd) + '</b></span></div>';
    }
    // 西の 都市
    if (dt.ups.length) {
      h += '<div class="wx-box"><div class="wx-h">🗾 西の 都市の ' + (hideFuture === 'archive' ? 'この日' : 'きょう') + 'の 天気 (天気は 西から 東へ)</div><div class="wx-ups">';
      dt.ups.forEach(u => { const r = dayRec(u.j, today); if (r) h += '<div class="wx-up"><b>' + esc(UP[u.id].name) + '</b><span class="wx-ico">' + WX[r.wx].i + '</span><small>' + WX[r.wx].n + ' ・ ' + Math.round(r.tmax) + '°</small></div>'; });
      h += '</div></div>';
    }
    return h;
  }
  function nowHour() { const t = new Date(Date.now() + 9 * 3600e3); return String(t.getUTCHours()).padStart(2, '0') + ':00'; }
  function windName(d) { return ['北', '北東', '東', '南東', '南', '南西', '西', '北西'][Math.round(((d % 360) + 360) % 360 / 45) % 8] + 'の 風'; }
  const HINTS = '<div class="wx-box wx-talk"><img src="' + KORARIN + '" alt=""><div><b>コラリンの 予報の コツ</b><ul>' +
    '<li>気圧が 下がっている → 低気圧が 近づき 天気が 悪くなりやすい。上がっている → 晴れやすい。</li>' +
    '<li>日本の 天気は 偏西風で <b>西から 東へ</b> 変わる。西の 都市が 今日 雨なら、あした こちらも 雨かも。</li>' +
    '<li>湿度が 高く 雲が 多い → 雨の 前ぶれ。</li>' +
    '<li>気温は きょうを 基準に。雨や くもりなら 最高気温は 低め、晴れた 冬の 朝は 冷え込む (放射冷却)。</li></ul></div></div>';

  function predictForm(btnLabel) {
    let h = '<div class="wx-box"><div class="wx-h">🔮 あしたの 予報</div><div class="wx-cats">';
    Object.keys(WX).forEach(k => { h += '<button class="wx-cat" data-wx="' + k + '"><span>' + WX[k].i + '</span>' + WX[k].n + '</button>'; });
    h += '</div><label class="wx-sl">最高気温 <b id="wxMaxV">--</b>℃<input type="range" id="wxMax" min="-15" max="40" step="1"></label>';
    h += '<label class="wx-sl">最低気温 <b id="wxMinV">--</b>℃<input type="range" id="wxMin" min="-25" max="32" step="1"></label>';
    h += '<button class="wx-primary" id="wxSubmit" disabled>' + btnLabel + '</button></div>';
    return h;
  }
  function bindForm(dt, onSubmit) {
    const r = dayRec(dt.main, dt.today) || { tmax: 15, tmin: 8 };
    const mx = document.getElementById('wxMax'), mn = document.getElementById('wxMin');
    mx.value = Math.round(r.tmax); mn.value = Math.round(r.tmin);
    const upd = () => { document.getElementById('wxMaxV').textContent = mx.value; document.getElementById('wxMinV').textContent = mn.value; if (+mn.value > +mx.value) mn.value = mx.value; };
    mx.oninput = upd; mn.oninput = upd; upd();
    let wx = null;
    area().querySelectorAll('[data-wx]').forEach(b => b.onclick = () => { sfx('click'); wx = b.dataset.wx; area().querySelectorAll('[data-wx]').forEach(x => x.classList.toggle('on', x === b)); document.getElementById('wxSubmit').disabled = false; });
    document.getElementById('wxSubmit').onclick = () => { sfx('click'); onSubmit({ wx: wx, tmax: +mx.value, tmin: +mn.value }); };
  }

  // ---------- ホーム ----------
  async function home() {
    const d = data();
    let h = '<div class="wx-hero"><div><div class="wx-kicker">気象予報士 見習い</div><h1 class="wx-h1">お天気予報チャレンジ</h1><p>本物の 気象データで あしたの 天気を 予報! 次の日に 実際の 天気で 採点されるよ。</p></div><img src="' + KORARIN + '" alt=""></div>';
    h += '<div class="wx-cities">'; CITIES.forEach(c => { h += '<button class="wx-city' + (c.id === cityId ? ' on' : '') + '" data-city="' + c.id + '">' + c.name + '</button>'; }); h += '</div>';
    h += '<div id="wxPending"></div>';
    const avg = arr => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : '—';
    const mine = d.done.filter(x => x.mode === 'live');
    h += '<div class="wx-box wx-rec"><div><b>' + mine.length + '</b><small>本番 予報</small></div><div><b>' + avg(mine.map(x => x.score)) + '</b><small>平均点 (あなた)</small></div><div><b>' + avg(mine.filter(x => x.pro != null).map(x => x.pro)) + '</b><small>平均点 (プロの 予報)</small></div></div>';
    h += '<button class="wx-primary" id="wxLive">☀ あしたの ' + esc(city(cityId).name) + 'を 予報する (本番)</button>';
    h += '<button class="wx-secondary" id="wxPrac">🎲 練習モード (過去の 1日で すぐ 答え合わせ)</button>';
    if (typeof WxLab !== 'undefined') h += '<button class="wx-secondary" id="wxMap">🗺️ 予報の 前に きょうの 本物の 天気図を 見る</button>';
    if (d.done.length) {
      h += '<div class="wx-h2">📒 予報の 記録</div><div class="wx-hist">';
      d.done.slice(-12).reverse().forEach(x => { h += '<div class="wx-hrow"><span>' + (x.mode === 'live' ? '本番' : '練習') + ' ' + esc((city(x.city) || {}).name || '') + ' ' + jpDate(x.date) + '</span><span>' + WX[x.p.wx].i + '→' + WX[x.a.wx].i + '</span><b>' + x.score + '点</b></div>'; });
      h += '</div>';
    }
    h += '<p class="wx-note">データ: Open-Meteo (非商用 無料 API)。プロの 予報 = 同じ サイトの 数値予報モデル。</p>';
    area().innerHTML = h;
    area().querySelectorAll('[data-city]').forEach(b => b.onclick = () => { sfx('click'); cityId = b.dataset.city; home(); });
    document.getElementById('wxLive').onclick = () => { sfx('click'); live(); };
    document.getElementById('wxPrac').onclick = () => { sfx('click'); practice(); };
    const mb = document.getElementById('wxMap'); if (mb) mb.onclick = () => { sfx('click'); stop(); WxLab.open(); WxLab.live(); };
    checkPending();
  }
  async function checkPending() {
    const d = data(), today = jstDate(0);
    const due = d.preds.filter(p => p.date < today);
    const waiting = d.preds.filter(p => p.date >= today);
    const box = document.getElementById('wxPending'); if (!box) return;
    let h = '';
    waiting.forEach(p => { h += '<div class="wx-box wx-wait">⏳ ' + esc(city(p.city).name) + ' ' + jpDate(p.date) + ' の 予報: ' + WX[p.wx].i + ' ' + p.tmax + '° / ' + p.tmin + '° — あした 以降に 採点</div>'; });
    box.innerHTML = h;
    for (const p of due) {
      try {
        const c = city(p.city);
        const j = await getJSON(API + '?' + q({ latitude: c.lat, longitude: c.lon, daily: DAILY, past_days: 7, forecast_days: 1, timezone: 'Asia/Tokyo' }));
        const a = dayRec(j, p.date); if (!a) continue;
        const sc = score(p, a), pro = p.pro ? score(p.pro, a) : null;
        d.done.push({ mode: 'live', city: p.city, date: p.date, p: { wx: p.wx, tmax: p.tmax, tmin: p.tmin }, a: { wx: a.wx, tmax: a.tmax, tmin: a.tmin }, score: sc, pro: pro });
        d.preds = d.preds.filter(x => x !== p); save();
        resultView({ mode: 'live', city: p.city, date: p.date, p: p, a: a, score: sc, pro: pro, proP: p.pro });
        return;
      } catch (e) { /* オフライン: あとで */ }
    }
  }

  // ---------- 本番 ----------
  async function live() {
    const c = city(cityId), target = jstDate(1);
    if (data().preds.some(p => p.city === cityId && p.date === target)) { area().innerHTML = head('本番 予報') + '<div class="wx-box wx-center">' + esc(c.name) + 'の ' + jpDate(target) + ' は もう 予報したよ! あした 採点を 見に来てね。</div>'; return bindHead(); }
    area().innerHTML = head('本番 予報') + '<div class="wx-box wx-center">📡 気象データを 読み込み中…</div>'; bindHead();
    let dt;
    try { dt = await liveData(c); } catch (e) { area().innerHTML = head('本番 予報') + '<div class="wx-box wx-center">📡 データを 読み込めなかった… インターネットに つながっているか 確認してね。<br><small>' + esc(e.message) + '</small></div>'; return bindHead(); }
    let h = head(esc(c.name) + ' ' + jpDate(target) + ' の 予報') + panel(dt, 'live') + HINTS + predictForm('📮 この 予報で 決定 (あした 採点)');
    area().innerHTML = h; bindHead();
    bindForm(dt, p => {
      const pr = dayRec(dt.main, target);
      data().preds.push({ city: cityId, date: target, wx: p.wx, tmax: p.tmax, tmin: p.tmin, pro: pr ? { wx: pr.wx, tmax: Math.round(pr.tmax), tmin: Math.round(pr.tmin) } : null, made: new Date().toISOString() });
      save();
      area().innerHTML = head('予報 完了') + '<div class="wx-box wx-talk"><img src="' + KORADON + '" alt=""><div><b>コラドン</b><p>予報を 受け付けたよ! ' + jpDate(target) + ' が 終わったら、実際の 天気と 比べて 採点するね。プロの 予報とも 勝負だ!</p></div></div><button class="wx-primary" id="wxHome">もどる</button>';
      bindHead(); document.getElementById('wxHome').onclick = () => home();
    });
  }

  // ---------- 練習 ----------
  async function practice() {
    const c = city(cityId);
    const back = 10 + Math.floor(Math.random() * 700);
    const day = jstDate(-back);
    area().innerHTML = head('練習モード') + '<div class="wx-box wx-center">📡 過去の データを 読み込み中…</div>'; bindHead();
    let dt;
    try { dt = await archiveData(c, day); } catch (e) { area().innerHTML = head('練習モード') + '<div class="wx-box wx-center">📡 データを 読み込めなかった… <br><small>' + esc(e.message) + '</small></div>'; return bindHead(); }
    const target = addDays(day, 1);
    let h = head('練習: ' + esc(c.name) + ' ' + jpDate(day) + ' の 次の日は?') + panel(dt, 'archive') + HINTS + predictForm('✅ 予報して 答え合わせ');
    area().innerHTML = h; bindHead();
    bindForm(dt, p => {
      const a = dayRec(dt.main, target); if (!a) return;
      const sc = score(p, a);
      data().done.push({ mode: 'prac', city: cityId, date: target, p: p, a: { wx: a.wx, tmax: a.tmax, tmin: a.tmin }, score: sc }); save();
      resultView({ mode: 'prac', city: cityId, date: target, p: p, a: a, score: sc, dt: dt, day: day });
    });
  }

  // ---------- 結果 ----------
  function resultView(r) {
    const c = city(r.city), a = r.a, p = r.p;
    let h = head((r.mode === 'live' ? '本番' : '練習') + ' の 結果');
    h += '<div class="wx-box wx-center"><div class="wx-score">' + r.score + '<small>点</small></div>' + (r.pro != null ? '<p>プロの 予報: <b>' + r.pro + '点</b> ' + (r.score > r.pro ? '🏆 プロに 勝った!' : r.score === r.pro ? '🤝 引き分け' : '💪 次は 勝とう') + '</p>' : '') + '</div>';
    h += '<div class="wx-box"><table class="wx-tbl"><tr><th></th><th>天気</th><th>最高</th><th>最低</th></tr>';
    h += '<tr><td>あなた</td><td>' + WX[p.wx].i + ' ' + WX[p.wx].n + '</td><td>' + p.tmax + '℃</td><td>' + p.tmin + '℃</td></tr>';
    if (r.proP) h += '<tr><td>プロ</td><td>' + WX[r.proP.wx].i + ' ' + WX[r.proP.wx].n + '</td><td>' + r.proP.tmax + '℃</td><td>' + r.proP.tmin + '℃</td></tr>';
    h += '<tr class="real"><td>実際</td><td>' + WX[a.wx].i + ' ' + WX[a.wx].n + '</td><td>' + Math.round(a.tmax) + '℃</td><td>' + Math.round(a.tmin) + '℃</td></tr></table>';
    h += '<p class="wx-small">' + esc(c.name) + ' ' + jpDate(r.date) + (a.pr != null ? ' ・ 降水量 ' + a.pr.toFixed(1) + 'mm' : '') + ' ・ 採点: 天気 50点 + 最高気温 25点 + 最低気温 25点 (1℃ずれる ごとに −5)</p></div>';
    if (r.mode === 'prac' && r.dt) h += explain(r);
    // 英語の 天気予報 (リスニング ボーナス)
    const en = 'Here is the weather report for ' + ({ tokyo: 'Tokyo', osaka: 'Osaka', sapporo: 'Sapporo', naha: 'Naha' }[r.city]) + '. It was ' + WX[a.wx].en + ', with a high of ' + Math.round(a.tmax) + ' degrees and a low of ' + Math.round(a.tmin) + ' degrees.';
    h += '<div class="wx-box"><div class="wx-h">🎧 English Weather Report</div><button class="wx-secondary" id="wxSay">🔊 英語で 聞く</button><details class="wx-ja"><summary>英文を 見る</summary><p class="wx-en">' + esc(en) + '</p></details></div>';
    h += '<button class="wx-primary" id="wxAgain">' + (r.mode === 'prac' ? '🎲 もう1問 練習' : 'もどる') + '</button><button class="wx-secondary" id="wxHome2">チャレンジの トップへ</button>';
    area().innerHTML = h; bindHead();
    document.getElementById('wxSay').onclick = () => { try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(en); u.lang = 'en-US'; u.rate = 0.9; speechSynthesis.speak(u); } catch (e) {} };
    document.getElementById('wxAgain').onclick = () => { sfx('click'); r.mode === 'prac' ? practice() : home(); };
    document.getElementById('wxHome2').onclick = () => { sfx('click'); home(); };
  }
  function explain(r) {
    const j = r.dt.main, H = j.hourly, day = r.day;
    const idx = H.time.findIndex(t => t >= day + 'T23:00'), i0 = Math.max(0, idx - 24);
    const dp = idx > 0 ? H.pressure_msl[idx] - H.pressure_msl[i0] : 0;
    const ups = r.dt.ups.map(u => ({ n: UP[u.id].name, r: dayRec(u.j, day) })).filter(x => x.r);
    const wet = ups.filter(x => x.r.wx === 'rain' || x.r.wx === 'snow');
    let h = '<div class="wx-box wx-talk"><img src="' + KORARIN + '" alt=""><div><b>コラリンの 解説</b><ul>';
    h += '<li>前の日の 気圧変化は <b>' + (dp >= 0 ? '+' : '') + dp.toFixed(1) + 'hPa</b>。' + (dp < -2 ? '下がっていたので 天気が 崩れる サインだった。' : dp > 2 ? '上がっていたので 天気が よくなる サインだった。' : '大きな 変化は なかった。') + '</li>';
    if (ups.length) h += '<li>西の 都市は ' + ups.map(x => x.n + ' ' + WX[x.r.wx].i).join('・') + '。' + (wet.length ? '西で 雨が 降っていたので、雨雲が 東へ 移動してきた 可能性が 高い。' : '西が 晴れていたので、こちらも 天気が 安定しやすかった。') + '</li>';
    h += '<li>実際は ' + WX[r.a.wx].n + '。最高気温は 前の日より ' + (r.a.tmax - (dayRec(j, day) || r.a).tmax >= 0 ? '+' : '') + (r.a.tmax - (dayRec(j, day) || r.a).tmax).toFixed(1) + '℃ 変化した。</li></ul></div></div>';
    return h;
  }

  function head(t) { return '<div class="wx-head"><button class="wx-back" id="wxBack">← もどる</button><div class="wx-title">' + t + '</div></div>'; }
  function bindHead() { const b = document.getElementById('wxBack'); if (b) b.onclick = () => { sfx('click'); home(); }; }
  function open() { showPage('pageWeatherCh'); home(); const p = document.getElementById('pageWeatherCh'); if (p) p.scrollTop = 0; }
  function stop() { try { speechSynthesis.cancel(); } catch (e) {} }
  return { open: open, stop: stop, _cat: cat, _score: score };
})();
