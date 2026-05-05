/* engine/weather-learn.js — extracted from index.html (v73 step4a)
 * Original location: lines 8101-8323 (current index.html)
 * Contents: WeaLearnState, renderWeaLearn, renderWeaLearnHome, renderWeaLearnCase, bindWeaLearnEvents, openWeaLearn
 * Dependencies: State, sfx, showModal, showPage, saveState, buildChapterGrid (engine/ui-modal — Step 4b), WEA_LEARN (data/series10-weather-learn.js)
 */
// =========================
// 📚 v74: 気象予報士 학습 자료 시스템
// =========================
const WeaLearnState = {
  currentCase: null, // null = 사건 선택 / 1~10 = 해당 사건 학습 중
  quizAnswered: {},  // {caseId: {quizIdx: chosenIdx}}
  cardRevealed: {},  // {caseId: {cardIdx: true}}
};

// 메인 학습 페이지 렌더링
function renderWeaLearn() {
  const area = document.getElementById('weaLearnArea');
  if (!area) return;
  
  if (WeaLearnState.currentCase === null) {
    // 사건 선택 화면
    area.innerHTML = renderWeaLearnHome();
  } else {
    // 사건 상세 학습 화면
    area.innerHTML = renderWeaLearnCase(WeaLearnState.currentCase);
  }
  bindWeaLearnEvents();
}

function renderWeaLearnHome() {
  let html = `
    <div class="wea-learn-header">
      <h2>📚 ハル 気象予報士 試験対策</h2>
      <div class="subtitle">国家資格 「気象予報士」 への 道</div>
      <div class="scope-badge">学科 一般·専門 70%+ カバー</div>
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
    const learn = WEA_LEARN[i];
    const story = WEA_STORY.find(c => c.id === i);
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

function renderWeaLearnCase(caseId) {
  const learn = WEA_LEARN[caseId];
  const story = WEA_STORY.find(c => c.id === caseId);
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
    const revealed = WeaLearnState.cardRevealed[caseId] || {};
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
    const ans = WeaLearnState.quizAnswered[caseId] || {};
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

function bindWeaLearnEvents() {
  // 사건 카드 클릭
  document.querySelectorAll('.wea-learn-card').forEach(card => {
    card.onclick = () => {
      sfx('click');
      WeaLearnState.currentCase = parseInt(card.dataset.case);
      renderWeaLearn();
      window.scrollTo(0, 0);
    };
  });
  // 홈 버튼
  const btnHome = document.getElementById('btnLearnHome');
  if (btnHome) btnHome.onclick = () => {
    sfx('click');
    WeaLearnState.currentCase = null;
    renderWeaLearn();
    window.scrollTo(0, 0);
  };
  // 暗記카드 토글
  document.querySelectorAll('.wea-card-flip').forEach(card => {
    card.onclick = () => {
      sfx('click');
      const cid = parseInt(card.dataset.case);
      const idx = parseInt(card.dataset.idx);
      if (!WeaLearnState.cardRevealed[cid]) WeaLearnState.cardRevealed[cid] = {};
      WeaLearnState.cardRevealed[cid][idx] = !WeaLearnState.cardRevealed[cid][idx];
      // 즉시 토글 (전체 재렌더 안함)
      card.classList.toggle('revealed');
      const learn = WEA_LEARN[cid];
      const c = learn.cards[idx];
      const span = card.querySelector('span:not(.label)');
      if (span) {
        span.textContent = WeaLearnState.cardRevealed[cid][idx] ? '✅ ' + c.a : '❓ ' + c.q;
      }
    };
  });
  // 객관식 클릭
  document.querySelectorAll('.wea-quiz .opt').forEach(opt => {
    opt.onclick = () => {
      const cid = parseInt(opt.dataset.case);
      const qi = parseInt(opt.dataset.qidx);
      const oi = parseInt(opt.dataset.oidx);
      if (!WeaLearnState.quizAnswered[cid]) WeaLearnState.quizAnswered[cid] = {};
      if (WeaLearnState.quizAnswered[cid][qi] !== undefined) return; // 이미 답함
      WeaLearnState.quizAnswered[cid][qi] = oi;
      const learn = WEA_LEARN[cid];
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
function openWeaLearn(caseId) {
  WeaLearnState.currentCase = caseId || null;
  showPage('pageWeaLearn');
  renderWeaLearn();
  window.scrollTo(0, 0);
}

