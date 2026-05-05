/* engine/math-learn.js — 算数·数学 학습 자료 시스템 (v75 series11, skeleton)
 * Mirrors engine/weather-learn.js pattern.
 * Phase 4c-1: 진입 시 "준비 중" 표시. 실제 학습 자료는 Phase 4c-4 에서 채움.
 * Dependencies: State, sfx, showPage, buildChapterGrid (engine/ui-modal), MATH_LEARN (data/series11-math-learn.js)
 */
const MathLearnState = {
  currentCase: null, // null = 사건 선택 / 1~10 = 해당 사건 학습 중
  quizAnswered: {},  // {caseId: {quizIdx: chosenIdx}}
  cardRevealed: {},  // {caseId: {cardIdx: true}}
};

// 메인 학습 페이지 렌더링
function renderMathLearn() {
  const area = document.getElementById('mathLearnArea');
  if (!area) return;

  if (MathLearnState.currentCase === null) {
    area.innerHTML = renderMathLearnHome();
  } else {
    area.innerHTML = renderMathLearnCase(MathLearnState.currentCase);
  }
  bindMathLearnEvents();
}

function renderMathLearnHome() {
  const hasData = typeof MATH_LEARN !== 'undefined' && Object.keys(MATH_LEARN).length > 0;
  if (!hasData) {
    return `
      <div class="wea-learn-header">
        <h2>📐 算数·数学 試験対策</h2>
        <div class="subtitle">概念·SVG 도해·公式·暗記카드·객관식·コツ (5개국 풀이비교)</div>
        <div class="scope-badge" style="background:#7c3aed;">Phase 4c-4 で 公開予定</div>
      </div>
      <div class="wea-learn-content">
        <div class="wea-learn-section" style="text-align:center;background:linear-gradient(135deg,#f3e8ff 0%,#e9d5ff 100%);border:2px solid #7c3aed;">
          <div style="font-size:48px;margin-bottom:10px;">📐</div>
          <div style="font-size:14px;color:#5b21b6;line-height:1.7;font-weight:bold;">
            算数·数学 探偵団 学習資料<br>
            準備中 (사건 1~10 학습 자료 작성 중)
          </div>
          <div style="font-size:12px;color:#7c3aed;margin-top:8px;line-height:1.6;">
            완성 시: 概念 정의·증명, SVG 도해 3~5 개<br>
            公式 + 단위 환산표, 暗記카드 8~10장<br>
            객관식 10문제, コツ + 5개국 풀이비교
          </div>
        </div>
      </div>
    `;
  }

  // 데이터 있으면 weather-learn 패턴 따라 사건 그리드 렌더 (Phase 4c-4 에서 구현)
  let html = `
    <div class="wea-learn-header">
      <h2>📐 算数·数学 試験対策</h2>
      <div class="subtitle">10事件の 学習資料を 開いて 復習しよう</div>
      <div class="scope-badge" style="background:#7c3aed;">5개국 풀이비교 포함</div>
    </div>
    <div class="wea-learn-content">
      <div class="wea-learn-grid" style="margin-top:14px;">
  `;
  for (let i = 1; i <= 10; i++) {
    const learn = MATH_LEARN[i];
    const story = (typeof MATH_STORY !== 'undefined') ? MATH_STORY.find(c => c.id === i) : null;
    if (!learn || !story) continue;
    html += `
      <div class="wea-learn-card" data-case="${i}" style="border-color:#7c3aed;">
        <div class="icon">${story.icon || '📐'}</div>
        <div class="title">第${i}章<br>${story.title || ''}</div>
      </div>
    `;
  }
  html += `</div></div>`;
  return html;
}

function renderMathLearnCase(caseId) {
  // Phase 4c-4 에서 구현 (concept / SVG / 公式 / 暗記카드 / 객관식 / コツ 5개국)
  return `
    <div style="text-align:center;padding:60px 20px;">
      <div style="font-size:48px;margin-bottom:12px;">📐</div>
      <h2 style="color:#5b21b6;">第${caseId}章 学習資料</h2>
      <div style="color:#7c3aed;margin:16px 0;">準備中</div>
      <button class="wea-learn-entry-btn" onclick="MathLearnState.currentCase=null;renderMathLearn();" style="background:linear-gradient(135deg,#7c3aed 0%,#5b21b6 100%);box-shadow:0 2px 6px rgba(124,58,237,0.3);">← 사건 목록</button>
    </div>
  `;
}

function bindMathLearnEvents() {
  document.querySelectorAll('.wea-learn-card[data-case]').forEach(card => {
    card.onclick = () => {
      sfx('click');
      MathLearnState.currentCase = parseInt(card.dataset.case, 10);
      renderMathLearn();
      window.scrollTo(0, 0);
    };
  });
}

function openMathLearn() {
  sfx('click');
  MathLearnState.currentCase = null;
  showPage('pageMathLearn');
  renderMathLearn();
  window.scrollTo(0, 0);
}
