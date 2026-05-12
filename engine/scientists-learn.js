/* engine/scientists-learn.js — 시리즈 4 偉人科学者ファイル 학습 자료 시스템 (s4-case01)
 *
 * Mirrors engine/math-learn.js UX/state/event-binding pattern, but the
 * data schema follows SERIES4_CONTENT_SPEC.md §5 (SCIENTISTS_LEARN with
 * concept / diagrams / formulas / unitsTable / flashcards / exercises / tips).
 *
 * Dependencies:
 *   - SCIENTISTS_LEARN (data/series4-scientists-learn.js)
 *   - SCIENTISTS_STORY (data/series4-scientists.js)
 *   - State, sfx, showPage, buildChapterGrid, escapeHtml (engine/core.js, engine/ui-modal.js)
 *
 * The learn page DOM (pageScientistsLearn + scientistsLearnArea + btnBackScientistsLearn)
 * is added to index.html in the s4-case01 commit.
 */
// =========================
// 📚 s4: 偉人科学者ファイル 학습 자료 시스템 (series 4)
// =========================
const ScientistsLearnState = {
  currentCase: null,   // null = 사건 선택 / 'scientists_case01' 등의 키
  quizAnswered: {},    // {caseKey: {qIdx: chosenIdx}}
  cardRevealed: {},    // {caseKey: {cardIdx: true}}
};

// 사건 키 ↔ 사건 메타 매핑 헬퍼
function scientistsLearnStoryFor(caseKey) {
  if (typeof SCIENTISTS_STORY === 'undefined') return null;
  return SCIENTISTS_STORY.find(s => s.learnRef === caseKey) || null;
}

// 메인 학습 페이지 렌더링
function renderScientistsLearn() {
  const area = document.getElementById('scientistsLearnArea');
  if (!area) return;

  if (ScientistsLearnState.currentCase === null) {
    area.innerHTML = renderScientistsLearnHome();
  } else {
    area.innerHTML = renderScientistsLearnCase(ScientistsLearnState.currentCase);
  }
  bindScientistsLearnEvents();
}

function renderScientistsLearnHome() {
  let html = `
    <div class="wea-learn-header">
      <h2>👨‍🔬 偉人科学者の 学習資料</h2>
      <div class="subtitle">事件で 学んだ 科学を 整理しよう</div>
      <div class="scope-badge" style="background:#2a7a8a;">中学 物理·化学·生物 基礎 + 英検 2級 科学常識</div>
    </div>
    <div class="wea-learn-content">
      <div class="wea-learn-section" style="text-align:center;background:linear-gradient(135deg,#e0f0e8 0%,#c5dfd0 100%);">
        <div style="font-size:14px;color:#1a4a3a;line-height:1.7;">
          各事件の 学習資料を 開いて<br>
          概念·図解·公式·暗記カード·過去問風 で 復習しよう!
        </div>
      </div>
      <div class="wea-learn-grid" style="margin-top:14px;">
  `;
  if (typeof SCIENTISTS_STORY !== 'undefined') {
    SCIENTISTS_STORY.forEach((s, i) => {
      if (!s.learnRef) return;
      const learn = SCIENTISTS_LEARN[s.learnRef];
      if (!learn) return;
      html += `
        <div class="wea-learn-card" data-case="${s.learnRef}">
          <div class="icon">${s.icon}</div>
          <div class="title">第${s.id}事件<br>${escapeHtml(learn.title)}</div>
        </div>
      `;
    });
  }
  html += `</div></div>`;
  return html;
}

function renderScientistsLearnCase(caseKey) {
  const learn = SCIENTISTS_LEARN[caseKey];
  const story = scientistsLearnStoryFor(caseKey);
  if (!learn) return '<div>学習資料 が ありません。</div>';

  const icon = story ? story.icon : '👨‍🔬';
  const caseNo = story ? story.id : '';

  let html = `
    <div style="text-align:center;margin-bottom:8px;">
      <button class="wea-learn-entry-btn" id="btnScientistsLearnHome" style="background:#888;padding:6px 14px;font-size:12px;">← 事件 一覧</button>
    </div>
    <div class="wea-learn-header">
      <h2>${icon} 第${caseNo}事件 学習資料</h2>
      <div class="subtitle">${escapeHtml(learn.title)} - ${escapeHtml(learn.subtitle || '')}</div>
      ${learn.examScope ? `<div class="scope-badge">${escapeHtml(learn.examScope)}</div>` : ''}
    </div>
    <div class="wea-learn-content">
  `;

  // 1. 概念
  if (learn.concept) {
    html += `<div class="wea-learn-section"><h3>📖 ${escapeHtml(learn.concept.title || '概念')}</h3>`;
    (learn.concept.paragraphs || []).forEach(p => {
      html += `<div class="wea-concept" style="margin-bottom:8px;"><div class="desc">${escapeHtml(p)}</div></div>`;
    });
    if (learn.concept.highlight) {
      html += `<div class="wea-concept" style="background:#fff5d0;border-left:4px solid #d49a3a;padding:10px 12px;margin-top:10px;"><div class="desc"><strong>💡 ポイント:</strong> ${escapeHtml(learn.concept.highlight)}</div></div>`;
    }
    html += `</div>`;
  }

  // 2. SVG 도해
  if (learn.diagrams && learn.diagrams.length) {
    html += `<div class="wea-learn-section"><h3>📊 図解</h3>`;
    learn.diagrams.forEach(d => {
      html += `<div style="margin-bottom:14px;">`;
      if (d.title) html += `<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:6px;text-align:center;">${escapeHtml(d.title)}</div>`;
      html += `<div class="wea-diagram-wrap" style="text-align:center;">${d.svg || ''}</div>`;
      html += `</div>`;
    });
    html += `</div>`;
  }

  // 3. 공식
  if (learn.formulas && learn.formulas.length) {
    html += `<div class="wea-learn-section"><h3>📝 公式</h3><div class="wea-formula-list">`;
    learn.formulas.forEach((f, i) => {
      const simple = f.formulaSimple ? `  (${escapeHtml(f.formulaSimple)})` : '';
      html += `<div class="wea-formula">
        <div class="num">${i+1}</div>
        <div class="f">${escapeHtml(f.name || '')}: ${escapeHtml(f.formula || '')}${simple}</div>
        <div class="m">${escapeHtml(f.explanation || '')}${f.note ? '<br><span style="color:#7a5a2a;font-size:11px;">📌 ' + escapeHtml(f.note) + '</span>' : ''}</div>
      </div>`;
    });
    html += `</div></div>`;
  }

  // 4. 単位 표
  if (learn.unitsTable && learn.unitsTable.rows && learn.unitsTable.rows.length > 1) {
    const rows = learn.unitsTable.rows;
    html += `<div class="wea-learn-section"><h3>📋 ${escapeHtml(learn.unitsTable.title || '単位')}</h3><table class="wea-table"><thead><tr>`;
    rows[0].forEach(h => { html += `<th>${escapeHtml(h)}</th>`; });
    html += `</tr></thead><tbody>`;
    for (let i = 1; i < rows.length; i++) {
      html += `<tr>`;
      rows[i].forEach(cell => { html += `<td>${escapeHtml(cell)}</td>`; });
      html += `</tr>`;
    }
    html += `</tbody></table></div>`;
  }

  // 5. 暗記カード (토글)
  if (learn.flashcards && learn.flashcards.length) {
    html += `<div class="wea-learn-section"><h3>🎴 暗記カード (タップで 答え 表示)</h3><div class="wea-cards-grid">`;
    const revealed = ScientistsLearnState.cardRevealed[caseKey] || {};
    learn.flashcards.forEach((card, i) => {
      const isRev = !!revealed[i];
      html += `
        <div class="wea-card-flip ${isRev ? 'revealed' : ''}" data-case="${caseKey}" data-idx="${i}">
          <span class="label">${i+1}/${learn.flashcards.length}</span>
          <span class="card-body">${isRev ? '✅ ' + escapeHtml(card.back) : '❓ ' + escapeHtml(card.front)}</span>
        </div>
      `;
    });
    html += `</div></div>`;
  }

  // 6. 객관식 연습 문제
  if (learn.exercises && learn.exercises.length) {
    html += `<div class="wea-learn-section"><h3>❓ 過去問風 ${learn.exercises.length}問</h3>`;
    const ans = ScientistsLearnState.quizAnswered[caseKey] || {};
    learn.exercises.forEach((q, qi) => {
      const chosen = ans[qi];
      const answered = (chosen !== undefined);
      html += `<div class="wea-quiz ${answered ? 'answered' : ''}" data-case="${caseKey}" data-qidx="${qi}">
        <div class="q">問${qi+1}: ${escapeHtml(q.q)}</div>
        <div class="opts">`;
      (q.options || []).forEach((opt, oi) => {
        let cls = '';
        if (answered) {
          if (oi === q.correct) cls = 'correct';
          else if (oi === chosen) cls = 'wrong';
        }
        html += `<div class="opt ${cls}" data-case="${caseKey}" data-qidx="${qi}" data-oidx="${oi}">${String.fromCharCode(65+oi)}) ${escapeHtml(opt)}</div>`;
      });
      html += `</div><div class="exp">💡 ${escapeHtml(q.explanation || '')}</div></div>`;
    });
    html += `</div>`;
  }

  // 7. Tips
  if (learn.tips && learn.tips.length) {
    html += `<div class="wea-learn-section"><h3>💡 試験対策 Tips</h3>`;
    learn.tips.forEach(t => {
      html += `<div class="wea-concept" style="margin-bottom:8px;">
        <div class="term">${escapeHtml(t.title || '')}</div>
        <div class="desc">${escapeHtml(t.body || '')}</div>
      </div>`;
    });
    html += `</div>`;
  }

  html += `</div>`;
  return html;
}

function bindScientistsLearnEvents() {
  // 사건 카드 클릭 (홈에서)
  document.querySelectorAll('#scientistsLearnArea .wea-learn-card').forEach(card => {
    card.onclick = () => {
      sfx('click');
      ScientistsLearnState.currentCase = card.dataset.case;
      renderScientistsLearn();
      window.scrollTo(0, 0);
    };
  });

  // 홈 버튼
  const btnHome = document.getElementById('btnScientistsLearnHome');
  if (btnHome) btnHome.onclick = () => {
    sfx('click');
    ScientistsLearnState.currentCase = null;
    renderScientistsLearn();
    window.scrollTo(0, 0);
  };

  // 暗記카드 토글
  document.querySelectorAll('#scientistsLearnArea .wea-card-flip').forEach(card => {
    card.onclick = () => {
      sfx('click');
      const ck = card.dataset.case;
      const idx = parseInt(card.dataset.idx);
      if (!ScientistsLearnState.cardRevealed[ck]) ScientistsLearnState.cardRevealed[ck] = {};
      ScientistsLearnState.cardRevealed[ck][idx] = !ScientistsLearnState.cardRevealed[ck][idx];
      card.classList.toggle('revealed');
      const learn = SCIENTISTS_LEARN[ck];
      const c = learn.flashcards[idx];
      const span = card.querySelector('.card-body');
      if (span) {
        span.textContent = ScientistsLearnState.cardRevealed[ck][idx] ? '✅ ' + c.back : '❓ ' + c.front;
      }
    };
  });

  // 객관식 클릭
  document.querySelectorAll('#scientistsLearnArea .wea-quiz .opt').forEach(opt => {
    opt.onclick = () => {
      const ck = opt.dataset.case;
      const qi = parseInt(opt.dataset.qidx);
      const oi = parseInt(opt.dataset.oidx);
      if (!ScientistsLearnState.quizAnswered[ck]) ScientistsLearnState.quizAnswered[ck] = {};
      if (ScientistsLearnState.quizAnswered[ck][qi] !== undefined) return; // 이미 답함
      ScientistsLearnState.quizAnswered[ck][qi] = oi;
      const learn = SCIENTISTS_LEARN[ck];
      const correct = learn.exercises[qi].correct;
      sfx(oi === correct ? 'correct' : 'wrong');
      const wrap = opt.closest('.wea-quiz');
      wrap.classList.add('answered');
      wrap.querySelectorAll('.opt').forEach(o => {
        const ooi = parseInt(o.dataset.oidx);
        if (ooi === correct) o.classList.add('correct');
        else if (ooi === oi) o.classList.add('wrong');
      });
    };
  });
}

// 学習 페이지로 진입 (caseKey 지정 시 해당 사건 직접 열기)
function openScientistsLearn(caseKey) {
  ScientistsLearnState.currentCase = caseKey || null;
  showPage('pageScientistsLearn');
  renderScientistsLearn();
  window.scrollTo(0, 0);
}
