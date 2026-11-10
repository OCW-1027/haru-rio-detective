/* engine/detectives-A.js — extracted from index.html (v73 step4a)
 * Original location: lines 3515-5866 (current index.html)
 * Contents: All 8 detective States (ScienceState, WorldState, LitState, BizState, HistState, SocState, MonState, WeaState) + Science/World/Lit/Biz detective functions (build/start/render/bind × 4)
 * Dependencies: State, sfx, showModal, showPage, saveState, speakLine, stopVoice, recordGameBest, SCIENCE_STORY/series2-/series5-/series6- (series .js files)
 * Note: detectives-B.js refers to HistState/SocState/MonState/WeaState defined in this file → load this BEFORE detectives-B.js
 */
// ============================================================
// 🔬 科学探偵 시스템 - v31
// ============================================================
const ScienceState = {
  caseIdx: 0,        // 현재 사건 번호
  phase: 'intro',    // intro | step | final | resolved
  introIdx: 0,       // intro 대사 진행도
  stepIdx: 0,        // 현재 단계
  stepPhase: 'intro', // intro | puzzle | clue (단계 안에서)
  stepIntroIdx: 0,
  collectedClues: [], // 모은 단서들
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v45: 세계 추리 시리즈 상태
const WorldState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v53: 文学・芸術 시리즈 상태
const LitState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v58: 📊 ビジネス・企業 시리즈 상태
const BizState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v62: 🌐 世界経済・貿易史 시리즈 상태
const HistState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v65: 🏛 社会科総合 시리즈 상태
const SocState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v67: 💴 日常のお金 시리즈 상태
const MonState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v71: 🌦 気象予報士 시리즈 상태
const WeaState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v75: 🔢 算数·数学 探偵団 (series 11)
const MathState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};






// =========== 🌍 世界遺産の旅 함수들 (v45) ===========
// =========== 🎭 文学・芸術探偵団 (v53) ===========
// =========== 🎭 文学・芸術探偵団 함수들 (v45) ===========
// =========== 📊 ビジネス・企業探偵団 (v58) ===========
// =========== 📊 ビジネス・企業探偵団 함수들 (v58) ===========

// ============================================================
// v2 P3: 9개 시리즈를 공통 엔진(engine/case-engine.js)에 등록.
// 예전의 build*Grid / start*Case / render* / bind*Events 는 아래의 얇은 연결 함수로 대체.
// ============================================================
CaseEngine.register({ key: 'science', story: SCIENCE_STORY, state: ScienceState, clearedKey: 'scienceCleared', idPrefix: 'sci', areaId: 'scienceArea', page: 'pageScience',
  title: "🔬 科学探偵 ハル & リオ", sub: "~消えた発見の謎~", desc: "深い 推理と 科学の 知識で 事件を 解決しよう!" });
CaseEngine.register({ key: 'world', story: WORLD_STORY, state: WorldState, clearedKey: 'worldCleared', idPrefix: 'wld', areaId: 'worldArea', page: 'pageWorld',
  title: "🔬 科学探偵 ハル & リオ", sub: "~消えた発見の謎~", desc: "深い 推理と 科学の 知識で 事件を 解決しよう!" });
CaseEngine.register({ key: 'lit', story: LIT_STORY, state: LitState, clearedKey: 'litCleared', idPrefix: 'lit', areaId: 'litArea', page: 'pageLit',
  title: "🎭 文学・芸術探偵団 ハル & リオ", sub: "~消えた発見の謎~", desc: "深い 推理と 科学の 知識で 事件を 解決しよう!" });
CaseEngine.register({ key: 'biz', story: BIZ_STORY, state: BizState, clearedKey: 'bizCleared', idPrefix: 'biz', areaId: 'bizArea', page: 'pageBiz',
  title: "📊 ビジネス・企業探偵団 ハル & リオ", sub: "~消えた発見の謎~", desc: "深い 推理と 科学の 知識で 事件を 解決しよう!" });
CaseEngine.register({ key: 'hist', story: HIST_STORY, state: HistState, clearedKey: 'histCleared', idPrefix: 'hist', areaId: 'histArea', page: 'pageHist',
  title: "🌐 世界経済・貿易史探偵団 ハル & リオ", sub: "~消えた発見の謎~", desc: "深い 推理と 科学の 知識で 事件を 解決しよう!" });
CaseEngine.register({ key: 'soc', story: SOC_STORY, state: SocState, clearedKey: 'socCleared', idPrefix: 'soc', areaId: 'socArea', page: 'pageSoc',
  title: "🏛 社会科総合探偵団 ハル & リオ", sub: "~消えた発見の謎~", desc: "深い 推理と 科学の 知識で 事件を 解決しよう!" });
CaseEngine.register({ key: 'mon', story: MON_STORY, state: MonState, clearedKey: 'monCleared', idPrefix: 'mon', areaId: 'monArea', page: 'pageMon',
  title: "💴 日常のお金 探偵団 ハル & リオ", sub: "~消えた発見の謎~", desc: "深い 推理と 科学の 知識で 事件を 解決しよう!" });
CaseEngine.register({ key: 'wea', story: WEA_STORY, state: WeaState, clearedKey: 'weaCleared', idPrefix: 'wea', areaId: 'weaArea', page: 'pageWea',
  title: "🌦 ハルの 夢・気象予報士 探偵団 ハル & リオ", sub: "~消えた発見の謎~", desc: "深い 推理と 科学の 知識で 事件を 解決しよう!" });
CaseEngine.register({ key: 'math', story: MATH_STORY, state: MathState, clearedKey: 'mathCleared', idPrefix: 'math', areaId: 'mathArea', page: 'pageMath',
  title: "🔢 算数·数学 探偵団 ハル & リオ", sub: "~消えた図形と 数の 謎~", desc: "深い 推理と 算数·数学の 知識で 事件を 解決しよう!" });

function buildScienceGrid(grid) { return CaseEngine.get('science').buildGrid(grid); }
function startScienceCase(idx) { return CaseEngine.get('science').startCase(idx); }
function renderScience() { return CaseEngine.get('science').render(); }
function bindScienceEvents() { return CaseEngine.get('science').bind(); }
function buildWorldGrid(grid) { return CaseEngine.get('world').buildGrid(grid); }
function startWorldCase(idx) { return CaseEngine.get('world').startCase(idx); }
function renderWorld() { return CaseEngine.get('world').render(); }
function bindWorldEvents() { return CaseEngine.get('world').bind(); }
function buildLitGrid(grid) { return CaseEngine.get('lit').buildGrid(grid); }
function startLitCase(idx) { return CaseEngine.get('lit').startCase(idx); }
function renderLit() { return CaseEngine.get('lit').render(); }
function bindLitEvents() { return CaseEngine.get('lit').bind(); }
function buildBizGrid(grid) { return CaseEngine.get('biz').buildGrid(grid); }
function startBizCase(idx) { return CaseEngine.get('biz').startCase(idx); }
function renderBiz() { return CaseEngine.get('biz').render(); }
function bindBizEvents() { return CaseEngine.get('biz').bind(); }
function buildHistGrid(grid) { return CaseEngine.get('hist').buildGrid(grid); }
function startHistCase(idx) { return CaseEngine.get('hist').startCase(idx); }
function renderHist() { return CaseEngine.get('hist').render(); }
function bindHistEvents() { return CaseEngine.get('hist').bind(); }
function buildSocGrid(grid) { return CaseEngine.get('soc').buildGrid(grid); }
function startSocCase(idx) { return CaseEngine.get('soc').startCase(idx); }
function renderSoc() { return CaseEngine.get('soc').render(); }
function bindSocEvents() { return CaseEngine.get('soc').bind(); }
function buildMonGrid(grid) { return CaseEngine.get('mon').buildGrid(grid); }
function startMonCase(idx) { return CaseEngine.get('mon').startCase(idx); }
function renderMon() { return CaseEngine.get('mon').render(); }
function bindMonEvents() { return CaseEngine.get('mon').bind(); }
function buildWeaGrid(grid) { return CaseEngine.get('wea').buildGrid(grid); }
function startWeaCase(idx) { return CaseEngine.get('wea').startCase(idx); }
function renderWea() { return CaseEngine.get('wea').render(); }
function bindWeaEvents() { return CaseEngine.get('wea').bind(); }
function buildMathGrid(grid) { return CaseEngine.get('math').buildGrid(grid); }
function startMathCase(idx) { return CaseEngine.get('math').startCase(idx); }
function renderMath() { return CaseEngine.get('math').render(); }
function bindMathEvents() { return CaseEngine.get('math').bind(); }
