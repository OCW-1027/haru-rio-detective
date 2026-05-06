/* engine/bindings.js — extracted from index.html (v73 step4b)
 * Original location: lines 1738-1833 (EVENT BINDINGS — top-level execution)
 * Contents: page-load setup (loadState, migrateTokensV30 IIFE, titleBgImg IIFE), btnStart onclick, all back-button onclicks (14 buttons), notebook handlers (5), voice toggle handlers (9), btnBackLearn handler, updateVoiceButton call, dialogueArea/modalBg handlers
 * Dependencies: ALL OTHER ENGINE MODULES — references functions from core, ui-modal, story, audio, games, weather-learn (WeaLearnState const direct), TITLE_IMAGE (data/images.js).
 * Load order: ABSOLUTELY LAST. If any function/State referenced is not yet defined, page bindings fail with ReferenceError.
 */
// ============================================================
// EVENT BINDINGS
// ============================================================
// 페이지 로드 시 저장 데이터 복원
loadState();

// v30: 기존 사용자 토큰 자동 보정 (engClearCount가 0인데 이미 클리어된 챕터가 있으면)
(function migrateTokensV30() {
  if ((State.engClearCount || 0) === 0) {
    const alreadyCleared = State.engCleared.filter(c => c).length;
    if (alreadyCleared > 0) {
      // 기존 클리어 수를 카운트로 변환, 토큰도 부여
      State.engClearCount = alreadyCleared;
      const earnedTokens = Math.floor(alreadyCleared / 5);
      // 이미 사용한 토큰은 알 수 없으니 일단 모두 부여
      State.gameTokens = (State.gameTokens || 0) + earnedTokens;
      saveState();
    }
  }
})();

// v75: 영어 토큰 확장 — 새 4 필드를 기존 save에 자동 추가 (값 검증)
(function migrateTokensV75() {
  let dirty = false;
  if (!State.phraseCategoryDailyViews || typeof State.phraseCategoryDailyViews !== 'object'
      || !Array.isArray(State.phraseCategoryDailyViews.cats)) {
    State.phraseCategoryDailyViews = { date: '', cats: [] };
    dirty = true;
  }
  if (typeof State.dailyMissionLastDate !== 'string') {
    State.dailyMissionLastDate = '';
    dirty = true;
  }
  if (!State.newsQuizDailyTokens || typeof State.newsQuizDailyTokens !== 'object') {
    State.newsQuizDailyTokens = { date: '', count: 0 };
    dirty = true;
  }
  if (!State.compoundDailyTokens || typeof State.compoundDailyTokens !== 'object') {
    State.compoundDailyTokens = { date: '', count: 0 };
    dirty = true;
  }
  if (dirty) saveState();
})();

// 타이틀 이미지 설정
(function() {
  var img = document.getElementById('titleBgImg');
  if (img && typeof TITLE_IMAGE !== 'undefined') {
    img.src = TITLE_IMAGE;
  }
})();

document.getElementById('btnStart').onclick = () => {
  initAudio();
  playBGM('title');
  buildChapterGrid();
  showPage('pageSelect');
};

document.getElementById('btnBackTitle').onclick = () => { stopVoice(); showPage('pageTitle'); };
document.getElementById('btnBackSelect1').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackSelect2').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackWriting').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackGrammar').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackComposition').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackPhraseDict').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackDaily').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackNews').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackCompound').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackFreeQuiz').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackGame').onclick = () => { stopGame(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackScience').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackWorld').onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
// v64: 시리즈 5·6·7 もくじ 돌아가기 버튼 핸들러 + 과학 목록 버튼 누락 수정
const btnBackScienceList = document.getElementById('btnBackScienceList');
if (btnBackScienceList) btnBackScienceList.onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
const btnBackLit = document.getElementById('btnBackLit');
if (btnBackLit) btnBackLit.onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
const btnBackBiz = document.getElementById('btnBackBiz');
if (btnBackBiz) btnBackBiz.onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
const btnBackHist = document.getElementById('btnBackHist');
if (btnBackHist) btnBackHist.onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
const btnBackSoc = document.getElementById('btnBackSoc');
if (btnBackSoc) btnBackSoc.onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
const btnBackMon = document.getElementById('btnBackMon');
if (btnBackMon) btnBackMon.onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
const btnBackWea = document.getElementById('btnBackWea');
if (btnBackWea) btnBackWea.onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
// v75: 🔢 算数·数学 (series 11)
const btnBackMath = document.getElementById('btnBackMath');
if (btnBackMath) btnBackMath.onclick = () => { stopVoice(); buildChapterGrid(); showPage('pageSelect'); };
document.getElementById('btnBackStory').onclick = () => showPage('pageStory');

document.getElementById('btnNotebook1').onclick = openNotebook;
document.getElementById('btnNotebook2').onclick = openNotebook;
document.getElementById('btnNotebook3').onclick = openNotebook;
document.getElementById('btnCloseNote').onclick = closeNotebook;
document.getElementById('notebookModal').onclick = (e) => { if (e.target.id === 'notebookModal') closeNotebook(); };

document.getElementById('btnVoice').onclick = toggleVoice;
document.getElementById('btnVoiceSci').onclick = toggleVoice;
document.getElementById('btnVoiceWorld').onclick = toggleVoice;
// v64: 시리즈 5·6·7 음성 버튼 핸들러 추가
const btnVoiceLit = document.getElementById('btnVoiceLit');
if (btnVoiceLit) btnVoiceLit.onclick = toggleVoice;
const btnVoiceBiz = document.getElementById('btnVoiceBiz');
if (btnVoiceBiz) btnVoiceBiz.onclick = toggleVoice;
const btnVoiceHist = document.getElementById('btnVoiceHist');
if (btnVoiceHist) btnVoiceHist.onclick = toggleVoice;
const btnVoiceSoc = document.getElementById('btnVoiceSoc');
if (btnVoiceSoc) btnVoiceSoc.onclick = toggleVoice;
const btnVoiceMon = document.getElementById('btnVoiceMon');
if (btnVoiceMon) btnVoiceMon.onclick = toggleVoice;
const btnVoiceWea = document.getElementById('btnVoiceWea');
if (btnVoiceWea) btnVoiceWea.onclick = toggleVoice;
const btnVoiceMath = document.getElementById('btnVoiceMath');
if (btnVoiceMath) btnVoiceMath.onclick = toggleVoice;

const btnBackLearn = document.getElementById('btnBackLearn');
if (btnBackLearn) btnBackLearn.onclick = () => { sfx('click'); WeaLearnState.currentCase = null; buildChapterGrid(); showPage('pageSelect'); };
// v75: 算数·数学 학습 자료 페이지 뒤로가기
const btnBackMathLearn = document.getElementById('btnBackMathLearn');
if (btnBackMathLearn) btnBackMathLearn.onclick = () => { sfx('click'); MathLearnState.currentCase = null; buildChapterGrid(); showPage('pageSelect'); };
updateVoiceButton();

document.getElementById('dialogueArea').onclick = advanceDialogue;
document.getElementById('modalBg').onclick = (e) => { if (e.target.id === 'modalBg') closeModal(); };
