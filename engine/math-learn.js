/* engine/math-learn.js — 算数·数学 학습 자료 시스템 (v75 series11)
 * Mirrors engine/weather-learn.js pattern (token-replaced).
 * Phase 4c-4: 사건 1~5 학습 자료 데이터 작성. 사건 6~10 은 이후 phase 에서.
 * Dependencies: State, sfx, showModal, showPage, saveState, buildChapterGrid (engine/ui-modal),
 *               MATH_LEARN (data/series11-math-learn.js), MATH_STORY (data/series11-math.js)
 */
// =========================
// 📚 v75: 算数·数学 학습 자료 시스템 (series 11)
// =========================
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
    // 사건 선택 화면
    area.innerHTML = renderMathLearnHome();
  } else {
    // 사건 상세 학습 화면
    area.innerHTML = renderMathLearnCase(MathLearnState.currentCase);
  }
  bindMathLearnEvents();
}

function renderMathLearnHome() {
  let html = `
    <div class="wea-learn-header">
      <h2>📐 ハル·リオの 算数·数学 試験対策</h2>
      <div class="subtitle">図形·面積·角度·合同変換 — 古代から の 普遍数学</div>
      <div class="scope-badge" style="background:#7c3aed;">5か国 解法比較·BC1900~BC300 普遍定理</div>
    </div>
    <div class="wea-learn-content">
      <div class="wea-learn-section" style="text-align:center;background:linear-gradient(135deg,#fff5d0 0%,#fae0a0 100%);">
        <div style="font-size:14px;color:#5a4020;line-height:1.7;">
          各事件の 学習資料を 開いて<br>
          概念·ダイアグラム·公式·暗記カード·過去問風 で 復習しよう!
        </div>
      </div>
      <div class="wea-learn-grid" style="margin-top:14px;">
  `;
  for (let i = 1; i <= 10; i++) {
    const learn = MATH_LEARN[i];
    const story = MATH_STORY.find(c => c.id === i);
    if (!learn || !story) continue;
    html += `
      <div class="wea-learn-card" data-case="${i}">
        <div class="icon">${story.icon}</div>
        <div class="title">第${i}事件<br>${learn.title.replace(/^[^ ]+ /, '')}</div>
      </div>
    `;
  }
  html += `</div></div>`;
  return html;
}

function renderMathLearnCase(caseId) {
  const learn = MATH_LEARN[caseId];
  const story = MATH_STORY.find(c => c.id === caseId);
  if (!learn || !story) return '<div>学習資料 が ありません。</div>';
  
  let html = `
    <div style="text-align:center;margin-bottom:8px;">
      <button class="wea-learn-entry-btn" id="btnLearnHome" style="background:#888;padding:6px 14px;font-size:12px;">← 事件 一覧</button>
    </div>
    <div class="wea-learn-header">
      <h2>${story.icon} 第${caseId}事件 学習資料</h2>
      <div class="subtitle">${learn.title} - ${learn.subtitle}</div>
      <div class="scope-badge">${learn.examScope}</div>
    </div>
    <div class="wea-learn-content">
  `;
  
  // 1. 概念
  html += `<div class="wea-learn-section"><h3>📖 概念</h3>`;
  learn.concepts.forEach(c => {
    html += `<div class="wea-concept"><div class="term">${c.term}</div><div class="desc">${c.desc}</div></div>`;
  });
  html += `</div>`;
  
  // 2. 다이어그램
  if (learn.diagram) {
    html += `<div class="wea-learn-section"><h3>📊 図解</h3><div class="wea-diagram-wrap">${learn.diagram}</div></div>`;
  }
  
  // 3. 공식
  if (learn.formulas && learn.formulas.length) {
    html += `<div class="wea-learn-section"><h3>📝 頻出公式</h3><div class="wea-formula-list">`;
    learn.formulas.forEach((f, i) => {
      html += `<div class="wea-formula"><div class="num">${i+1}</div><div class="f">${f.f}</div><div class="m">${f.m}</div></div>`;
    });
    html += `</div></div>`;
  }
  
  // 4. 표
  if (learn.table) {
    html += `<div class="wea-learn-section"><h3>📋 ${learn.table.title}</h3><table class="wea-table"><thead><tr>`;
    learn.table.headers.forEach(h => html += `<th>${h}</th>`);
    html += `</tr></thead><tbody>`;
    learn.table.rows.forEach(row => {
      html += `<tr>`;
      row.forEach(cell => html += `<td>${cell}</td>`);
      html += `</tr>`;
    });
    html += `</tbody></table></div>`;
  }
  
  // 5. 暗記카드 (토글)
  if (learn.cards && learn.cards.length) {
    html += `<div class="wea-learn-section"><h3>🎴 暗記カード (タップで 答え 表示)</h3><div class="wea-cards-grid">`;
    const revealed = MathLearnState.cardRevealed[caseId] || {};
    learn.cards.forEach((card, i) => {
      const isRev = revealed[i];
      html += `
        <div class="wea-card-flip ${isRev ? 'revealed' : ''}" data-case="${caseId}" data-idx="${i}">
          <span class="label">${i+1}/${learn.cards.length}</span>
          <span>${isRev ? '✅ ' + card.a : '❓ ' + card.q}</span>
        </div>
      `;
    });
    html += `</div></div>`;
  }
  
  // 6. 객관식
  if (learn.quiz && learn.quiz.length) {
    html += `<div class="wea-learn-section"><h3>❓ 過去問風 5問</h3>`;
    const ans = MathLearnState.quizAnswered[caseId] || {};
    learn.quiz.forEach((q, qi) => {
      const chosen = ans[qi];
      const answered = (chosen !== undefined);
      html += `<div class="wea-quiz ${answered ? 'answered' : ''}" data-case="${caseId}" data-qidx="${qi}">
        <div class="q">問${qi+1}: ${q.q}</div>
        <div class="opts">`;
      q.opts.forEach((opt, oi) => {
        let cls = '';
        if (answered) {
          if (oi === q.ans) cls = 'correct';
          else if (oi === chosen) cls = 'wrong';
        }
        html += `<div class="opt ${cls}" data-case="${caseId}" data-qidx="${qi}" data-oidx="${oi}">${String.fromCharCode(65+oi)}) ${opt}</div>`;
      });
      html += `</div><div class="exp">💡 ${q.exp}</div></div>`;
    });
    html += `</div>`;
  }
  
  // 7. Tips
  if (learn.tips && learn.tips.length) {
    html += `<div class="wea-learn-section"><h3>💡 試験対策 Tips</h3><div class="wea-tips"><ul>`;
    learn.tips.forEach(t => html += `<li>${t}</li>`);
    html += `</ul></div></div>`;
  }
  
  html += `</div>`;
  return html;
}

function bindMathLearnEvents() {
  // 사건 카드 클릭
  document.querySelectorAll('.wea-learn-card').forEach(card => {
    card.onclick = () => {
      sfx('click');
      MathLearnState.currentCase = parseInt(card.dataset.case);
      renderMathLearn();
      window.scrollTo(0, 0);
    };
  });
  // 홈 버튼
  const btnHome = document.getElementById('btnLearnHome');
  if (btnHome) btnHome.onclick = () => {
    sfx('click');
    MathLearnState.currentCase = null;
    renderMathLearn();
    window.scrollTo(0, 0);
  };
  // 暗記카드 토글
  document.querySelectorAll('.wea-card-flip').forEach(card => {
    card.onclick = () => {
      sfx('click');
      const cid = parseInt(card.dataset.case);
      const idx = parseInt(card.dataset.idx);
      if (!MathLearnState.cardRevealed[cid]) MathLearnState.cardRevealed[cid] = {};
      MathLearnState.cardRevealed[cid][idx] = !MathLearnState.cardRevealed[cid][idx];
      // 즉시 토글 (전체 재렌더 안함)
      card.classList.toggle('revealed');
      const learn = MATH_LEARN[cid];
      const c = learn.cards[idx];
      const span = card.querySelector('span:not(.label)');
      if (span) {
        span.textContent = MathLearnState.cardRevealed[cid][idx] ? '✅ ' + c.a : '❓ ' + c.q;
      }
    };
  });
  // 객관식 클릭
  document.querySelectorAll('.wea-quiz .opt').forEach(opt => {
    opt.onclick = () => {
      const cid = parseInt(opt.dataset.case);
      const qi = parseInt(opt.dataset.qidx);
      const oi = parseInt(opt.dataset.oidx);
      if (!MathLearnState.quizAnswered[cid]) MathLearnState.quizAnswered[cid] = {};
      if (MathLearnState.quizAnswered[cid][qi] !== undefined) return; // 이미 답함
      MathLearnState.quizAnswered[cid][qi] = oi;
      const learn = MATH_LEARN[cid];
      sfx(oi === learn.quiz[qi].ans ? 'correct' : 'wrong');
      // 즉시 시각 반영 (전체 재렌더 안함)
      const wrap = opt.closest('.wea-quiz');
      wrap.classList.add('answered');
      wrap.querySelectorAll('.opt').forEach(o => {
        const ooi = parseInt(o.dataset.oidx);
        if (ooi === learn.quiz[qi].ans) o.classList.add('correct');
        else if (ooi === oi) o.classList.add('wrong');
      });
    };
  });
}

// 学習 페이지로 진입
function openMathLearn(caseId) {
  MathLearnState.currentCase = caseId || null;
  showPage('pageMathLearn');
  renderMathLearn();
  window.scrollTo(0, 0);
}

