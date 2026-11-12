/* engine/study-log.js — 학습 기록 (보호자 리포트용)
 * Study.log(area, ok, sub)  : 문제 1개 풀 때마다 (영검·인도식은 엔진에서 직접 호출, 나머지는 sfx('correct'/'wrong') 를 페이지 기준으로 자동 기록)
 * 활동 시간: 화면이 보이고 1분 안에 터치/키 입력이 있으면 그 1분을 현재 페이지의 영역에 더한다.
 * 저장: State.v2.log = { 'YYYY-MM-DD': { area: [문제수, 정답수, 분], ... } } (최근 120일)
 * Dependencies: State, saveState, sfx (audio.js 다음에 로드)
 */
const Study = (function () {
  const AREA = {
    pageEiken: 'eiken', pageKanken: 'kanken', pageIndian: 'indian', pageCodeLab: 'mathw', pageMathWorld: 'mathw', pageMath: 'math', pageMathLearn: 'math',
    pageWorldChase: 'chase', pageLab: 'lab', pageWeatherCh: 'weather', pageWxLab: 'weather', pageWea: 'weather', pageWeaLearn: 'weather',
    pageStoryMain: 'story', pageStory: 'case', pageSelect: 'case', pagePuzzle: 'case',
    pageEng: 'english', pageWriting: 'english', pageGrammar: 'english', pageComposition: 'english', pagePhraseDict: 'english', pageDaily: 'english', pageNews: 'english', pageCompound: 'english',
    pageScience: 'science', pageScienceList: 'science', pageScientists: 'science', pageScientistsLearn: 'science',
    pageWorld: 'geo', pageWQ: 'geo', pageJapanTrip: 'geo', pageHist: 'hist', pageTimeTravel: 'hist', pageSoc: 'soc', pageNews2: 'soc', pageJustice: 'soc', pageMon: 'money', pageBiz: 'biz', pageLit: 'lit',
    pageNewsBox: 'english', pageGame: 'game', pageFreeQuiz: 'game', pageGate: 'game',
  };
  const NAME = {
    eiken: '英検道場', kanken: '漢検道場', indian: 'インド式 計算', mathw: '世界の 算数道場', math: '算数', chase: '世界追跡', lab: 'ラボ探偵', weather: 'お天気',
    story: 'メインストーリー', case: '推理 事件', english: '英語', science: '理科・偉人', geo: '世界地理', hist: '歴史', soc: '社会', money: 'お金',
    biz: 'ビジネス', lit: '文学', game: 'ゲーム・クイズ', other: 'その他',
  };
  const EXPLICIT = { eiken: 1, indian: 1, kanken: 1 };   // 엔진이 직접 Study.log 하는 영역 (sfx 자동 기록에서 제외)
  const KEEP_DAYS = 120;
  let lastAct = 0, minuteMark = 0, dirty = false;

  function today(d) { d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
  function store() { if (!State.v2) State.v2 = {}; return State.v2.log || (State.v2.log = {}); }
  function curArea() { const p = document.querySelector('.page.active'); return (p && AREA[p.id]) || null; }
  function cell(area) { const L = store(), d = today(); const day = L[d] || (L[d] = {}); return day[area] || (day[area] = [0, 0, 0]); }
  function prune() { const L = store(), cut = today(new Date(Date.now() - KEEP_DAYS * 864e5)); Object.keys(L).forEach(k => { if (k < cut) delete L[k]; }); }
  function flush() { if (!dirty) return; dirty = false; try { saveState(); } catch (e) {} }
  function log(area, ok, sub) {
    if (!area) return;
    const c = cell(area); c[0]++; if (ok) c[1]++;
    if (sub) { const L = store(), d = today(); const k = area + ':' + sub; const s = L[d][k] || (L[d][k] = [0, 0, 0]); s[0]++; if (ok) s[1]++; }
    dirty = true; clearTimeout(log._t); log._t = setTimeout(flush, 1500);
  }
  // 활동 시간 (1분 단위)
  function touch() { lastAct = Date.now(); }
  function tick() {
    const now = Date.now();
    if (document.visibilityState === 'visible' && now - lastAct < 60000 && now - minuteMark >= 60000) {
      minuteMark = now; const a = curArea(); if (a) { cell(a)[2]++; dirty = true; flush(); }
    }
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(ev => document.addEventListener(ev, touch, { passive: true, capture: true }));
  setInterval(tick, 15000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });

  // sfx 자동 기록: 'correct' / 'wrong' 가 울리면 현재 페이지 영역에 1문제로 기록
  if (typeof sfx === 'function') {
    const orig = sfx;
    sfx = function (type) {
      if (type === 'correct' || type === 'wrong') { const a = curArea(); if (a && !EXPLICIT[a]) log(a, type === 'correct'); }
      return orig.apply(this, arguments);
    };
  }
  try { setTimeout(() => { if (State && State.v2 && State.v2.log) prune(); }, 3000); } catch (e) {}

  // 집계: 최근 n일 → { days: [{d, total:[n,ok,min], byArea}], sum: {area:[n,ok,min]} }
  function summary(n) {
    const L = store(), days = [], sum = {};
    for (let i = n - 1; i >= 0; i--) {
      const d = today(new Date(Date.now() - i * 864e5)), day = L[d] || {}, tot = [0, 0, 0];
      Object.keys(day).forEach(k => { if (k.indexOf(':') >= 0) return; const v = day[k]; tot[0] += v[0]; tot[1] += v[1]; tot[2] += v[2]; const s = sum[k] || (sum[k] = [0, 0, 0]); s[0] += v[0]; s[1] += v[1]; s[2] += v[2]; });
      days.push({ d: d, total: tot, byArea: day });
    }
    return { days: days, sum: sum };
  }
  function subSum(n, prefix) {
    const L = store(), out = {};
    for (let i = 0; i < n; i++) { const day = L[today(new Date(Date.now() - i * 864e5))] || {}; Object.keys(day).forEach(k => { if (k.indexOf(prefix + ':') !== 0) return; const s = out[k.slice(prefix.length + 1)] || (out[k.slice(prefix.length + 1)] = [0, 0]); s[0] += day[k][0]; s[1] += day[k][1]; }); }
    return out;
  }
  return { log: log, summary: summary, subSum: subSum, NAME: NAME, today: today, _area: curArea, _tick: tick, _flush: flush };
})();
