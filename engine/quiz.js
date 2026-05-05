/* engine/quiz.js — extracted from index.html (v73 step4a)
 * Original location: lines 3044-3403 (current index.html)
 * Contents: GATE QUIZ (GateState, startGate, renderGate, renderProgressDots), FREE QUIZ (FreeQuizState, getQuizCatStats, buildQuizGrid, startFreeQuiz, renderFreeQuiz)
 * Dependencies: State, sfx, showModal, showPage, saveState, QUIZ_CATEGORIES/QUIZ_* (data/quiz-news.js)
 */
// ============================================================
// 🎯 GATE QUIZ (관문 퀴즈) - v27
// ============================================================
let GateState = {
  chapterIdx: 0,    // 어느 장 후의 관문인지 (0~14)
  questions: [],    // 5문제
  qIdx: 0,
  answered: false,
  // 각 문제 상태: 'pending' | 'correct' | 'wrong' | 'retry'
  results: [],
  // 통과 = 모두 'correct'
};

function startGate(chapterIdx) {
  GateState.chapterIdx = chapterIdx;
  // 모든 카테고리에서 무작위 5문제 선택
  const allQs = [];
  QUIZ_CATEGORIES.forEach(c => {
    c.data.forEach(q => allQs.push({ ...q, cat: c.label }));
  });
  // 셔플 후 5개
  for (let i = allQs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQs[i], allQs[j]] = [allQs[j], allQs[i]];
  }
  GateState.questions = allQs.slice(0, 5);
  GateState.qIdx = 0;
  GateState.answered = false;
  GateState.results = ['pending', 'pending', 'pending', 'pending', 'pending'];
  showPage('pageGate');
  playBGM('quiet');
  renderGate();
}

function renderGate() {
  const area = document.getElementById('gateArea');
  const total = GateState.questions.length;

  // 통과 처리: 모든 문제가 correct
  const allCorrect = GateState.results.every(r => r === 'correct');
  if (allCorrect) {
    // 통과
    State.gateCleared[GateState.chapterIdx] = true;
    saveState();
    let html = '<div class="gate-header">';
    html += '<div class="gate-h-title">🎯 関門 ' + (GateState.chapterIdx + 1) + ' 突破!</div>';
    html += '<div class="gate-h-sub">5問 ぜんぶ 正解!</div>';
    html += '</div>';
    html += '<div class="gate-success-msg">';
    html += '<div class="gate-success-h">✨ クリア!</div>';
    html += '<div class="gate-success-text">';
    if (GateState.chapterIdx === STORY.length - 1) {
      html += '🏆 全 ' + STORY.length + ' 関門を 突破した!<br>きみは ほんとうの 名探偵だ!';
    } else {
      html += '次の 章が ひらいたよ!<br>第 ' + (GateState.chapterIdx + 2) + ' 章に 挑戦!';
    }
    html += '</div></div>';
    if (GateState.chapterIdx === STORY.length - 1) {
      html += '<button class="gate-next-btn" id="gateGoMenu">もくじへ</button>';
    } else {
      html += '<button class="gate-next-btn" id="gateGoNext">第 ' + (GateState.chapterIdx + 2) + ' 章へ →</button>';
      html += '<button class="gate-next-btn" id="gateGoMenu" style="background:rgba(255,255,255,0.15);color:#fff;margin-top:8px;">もくじへ</button>';
    }
    area.innerHTML = html;
    sfx('chime'); triggerConfetti();
    const goNext = document.getElementById('gateGoNext');
    if (goNext) goNext.onclick = () => startChapter(GateState.chapterIdx + 1);
    document.getElementById('gateGoMenu').onclick = () => { buildChapterGrid(); showPage('pageSelect'); };
    return;
  }

  // 다음 'pending' 또는 'retry'를 찾아서 출제
  // 모든 문제가 풀이 완료되었지만 일부가 wrong/retry이면 재도전
  const nextIdx = GateState.results.findIndex(r => r === 'pending' || r === 'retry');
  if (nextIdx === -1) {
    // 5문제 다 풀었지만 통과는 아님 → 틀린 것을 retry로 표시
    let hasWrong = false;
    GateState.results = GateState.results.map(r => {
      if (r === 'wrong') { hasWrong = true; return 'retry'; }
      return r;
    });
    if (hasWrong) {
      // 재도전 안내
      const wrongCount = GateState.results.filter(r => r === 'retry').length;
      let html = '<div class="gate-header">';
      html += '<div class="gate-h-title">🎯 関門 ' + (GateState.chapterIdx + 1) + '</div>';
      html += '<div class="gate-h-sub">5問 ぜんぶ 正解で 突破!</div>';
      html += '</div>';
      html += renderProgressDots();
      html += '<div class="gate-fail-msg">';
      html += '<div class="gate-fail-h">あと ' + wrongCount + ' 問</div>';
      html += '<div class="gate-fail-text">';
      html += 'まちがえた 問題が ' + wrongCount + ' つ あります。<br>';
      html += '正解した 問題は そのまま、 まちがえた 問題だけ もう一度 挑戦しよう!';
      html += '</div></div>';
      html += '<button class="gate-next-btn" id="gateRetryStart">もう一度 挑戦 →</button>';
      area.innerHTML = html;
      document.getElementById('gateRetryStart').onclick = () => {
        // retry 상태를 다시 pending으로 바꿔서 재출제
        GateState.results = GateState.results.map(r => r === 'retry' ? 'pending' : r);
        renderGate();
      };
      return;
    }
  }

  // 현재 문제 출제
  GateState.qIdx = nextIdx;
  const q = GateState.questions[nextIdx];

  let html = '<div class="gate-header">';
  html += '<div class="gate-h-title">🎯 関門 ' + (GateState.chapterIdx + 1) + ' / ' + STORY.length + '</div>';
  html += '<div class="gate-h-sub">5問 ぜんぶ 正解で 突破!</div>';
  html += '</div>';
  html += renderProgressDots();
  html += '<div class="gate-q-card">';
  html += '<div class="gate-cat-tag">' + escapeHtml(q.cat) + '</div>';
  html += '<div class="gate-q-text">問' + (nextIdx + 1) + ': ' + escapeHtml(q.q) + '</div>';
  html += '<div class="gate-options">';
  q.opts.forEach((opt, i) => {
    html += '<div class="gate-opt" data-i="' + i + '">' + (i+1) + '. ' + escapeHtml(opt) + '</div>';
  });
  html += '</div></div>';
  html += '<div id="gateFeedback"></div>';
  area.innerHTML = html;
  GateState.answered = false;

  area.querySelectorAll('.gate-opt').forEach(opt => {
    opt.onclick = () => {
      if (GateState.answered) return;
      GateState.answered = true;
      const chosen = parseInt(opt.dataset.i);
      const correct = q.a;
      area.querySelectorAll('.gate-opt').forEach((o, i) => {
        o.classList.add('answered');
        if (i === correct) o.classList.add('correct');
        else if (i === chosen) o.classList.add('wrong');
      });
      const ok = chosen === correct;
      GateState.results[nextIdx] = ok ? 'correct' : 'wrong';
      if (ok) sfx('correct'); else sfx('wrong');
      // 피드백
      const fb = document.getElementById('gateFeedback');
      let fbHtml = '<div class="gate-feedback">';
      fbHtml += '<div class="gate-feedback-h ' + (ok ? 'ok' : 'ng') + '">' + (ok ? '🎉 正解!' : '✗ ざんねん…') + '</div>';
      if (!ok) fbHtml += '<div style="font-size:13px;color:#ffc850;margin-bottom:6px;">こたえ: ' + escapeHtml(q.opts[correct]) + '</div>';
      fbHtml += '<div class="gate-feedback-exp">📝 ' + escapeHtml(q.exp) + '</div>';
      fbHtml += '</div>';
      fbHtml += '<button class="gate-next-btn" id="gateNextBtn">次へ →</button>';
      fb.innerHTML = fbHtml;
      document.getElementById('gateNextBtn').onclick = () => renderGate();
    };
  });
}

function renderProgressDots() {
  let html = '<div class="gate-progress-row">';
  GateState.results.forEach((r, i) => {
    let cls = 'gate-pdot';
    let icon = (i+1) + '';
    if (r === 'correct') { cls += ' correct'; icon = '✓'; }
    else if (r === 'wrong') { cls += ' wrong'; icon = '✗'; }
    else if (r === 'retry') { cls += ' retry'; icon = '↻'; }
    html += '<div class="' + cls + '">' + icon + '</div>';
  });
  html += '</div>';
  return html;
}

// ============================================================
// 🧠 자유 퀴즈 (350문제 자유 학습) - v28
// ============================================================
let FreeQuizState = {
  catId: null,        // 선택한 카테고리 id (또는 'all')
  qIdx: 0,
  correct: 0,
  wrong: 0,
  shuffled: [],       // 셔플된 문제 배열
  answered: false,
};

// 카테고리별 학습 통계 (정답수)
function getQuizCatStats() {
  // localStorage에서 통계 복원, 카테고리별 baseline
  if (!State.quizStats) State.quizStats = {};
  return State.quizStats;
}

function buildQuizGrid(grid) {
  // 카테고리 선택 카드 만들기
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const stats = getQuizCatStats();
  const totalCorrect = Object.values(stats).reduce((s, v) => s + (v.correct || 0), 0);
  const totalDone = Object.values(stats).reduce((s, v) => s + (v.done || 0), 0);

  let html = '<div class="fq-header">';
  html += '<div class="fq-title">🧠 クイズ チャレンジ</div>';
  html += '<div class="fq-stats">📚 全 ' + QUIZ_CATEGORIES.reduce((s, c) => s + c.data.length, 0) + ' 問 / 🎯 正解 ' + totalCorrect + ' / ✏️ 解答 ' + totalDone + '</div>';
  html += '</div>';

  // ALL 모드 + 카테고리들
  html += '<div class="fq-cat-grid">';
  // 「ALL」 모드
  const allDone = totalDone;
  const allCorrect = totalCorrect;
  const allTotal = QUIZ_CATEGORIES.reduce((s, c) => s + c.data.length, 0);
  html += '<div class="fq-cat-card" data-cat="all" style="border-color:#6a2a8a;background:#fef0ff;">';
  html += '<span class="fq-cat-icon">🎲</span>';
  html += '<div class="fq-cat-name">ぜんぶ ランダム</div>';
  html += '<div class="fq-cat-count">' + allTotal + ' 問から 出題</div>';
  if (allDone > 0) html += '<div class="fq-cat-progress">✓ ' + allCorrect + '/' + allDone + ' (' + Math.round(allCorrect/allDone*100) + '%)</div>';
  html += '</div>';
  // 각 카테고리
  QUIZ_CATEGORIES.forEach(c => {
    const s = stats[c.id] || { correct: 0, done: 0 };
    html += '<div class="fq-cat-card" data-cat="' + c.id + '">';
    // 라벨에서 이모지와 텍스트 분리
    const labelMatch = c.label.match(/(\S+)\s+(.*)/);
    const icon = labelMatch ? labelMatch[1] : '📝';
    const name = labelMatch ? labelMatch[2] : c.label;
    html += '<span class="fq-cat-icon">' + icon + '</span>';
    html += '<div class="fq-cat-name">' + escapeHtml(name) + '</div>';
    html += '<div class="fq-cat-count">' + c.data.length + ' 問</div>';
    if (s.done > 0) {
      const pct = Math.round(s.correct/s.done*100);
      html += '<div class="fq-cat-progress">✓ ' + s.correct + '/' + s.done + ' (' + pct + '%)</div>';
    }
    html += '</div>';
  });
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  // 클릭 이벤트
  wrapper.querySelectorAll('.fq-cat-card').forEach(card => {
    card.onclick = () => {
      sfx('click');
      startFreeQuiz(card.dataset.cat);
    };
  });
}

function startFreeQuiz(catId) {
  FreeQuizState.catId = catId;
  FreeQuizState.qIdx = 0;
  FreeQuizState.correct = 0;
  FreeQuizState.wrong = 0;
  FreeQuizState.answered = false;
  // 출제 풀 만들기
  let pool;
  if (catId === 'all') {
    pool = [];
    QUIZ_CATEGORIES.forEach(c => {
      c.data.forEach(q => pool.push({ ...q, _cat: c.label }));
    });
  } else {
    const cat = QUIZ_CATEGORIES.find(c => c.id === catId);
    if (!cat) return;
    pool = cat.data.map(q => ({ ...q, _cat: cat.label }));
  }
  // 셔플
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  // 한 세션 = 10문제 (또는 카테고리가 작으면 전체)
  FreeQuizState.shuffled = pool.slice(0, Math.min(10, pool.length));
  showPage('pageFreeQuiz');
  playBGM('quiet');
  renderFreeQuiz();
}

function renderFreeQuiz() {
  const area = document.getElementById('freeQuizArea');
  const total = FreeQuizState.shuffled.length;

  // 완료 화면
  if (FreeQuizState.qIdx >= total) {
    const pct = total > 0 ? Math.round(FreeQuizState.correct / total * 100) : 0;
    let html = '<div class="fq-header">';
    html += '<div class="fq-title">🎉 完了!</div>';
    html += '</div>';
    html += '<div class="fq-q-card" style="text-align:center;">';
    html += '<div style="font-size:48px;margin-bottom:10px;">🏆</div>';
    html += '<div style="font-family:RocknRoll One;font-size:18px;color:var(--deep-ink);margin-bottom:8px;">';
    html += '正解 ' + FreeQuizState.correct + ' / ' + total + ' (' + pct + '%)';
    html += '</div>';
    html += '</div>';
    html += '<button class="fq-next-btn" id="fqRestart">もう一度</button>';
    html += '<button class="fq-next-btn" id="fqBackToCats" style="background:#7a4a8a;margin-top:10px;">他のカテゴリへ →</button>';
    area.innerHTML = html;
    document.getElementById('fqRestart').onclick = () => startFreeQuiz(FreeQuizState.catId);
    document.getElementById('fqBackToCats').onclick = () => { buildChapterGrid(); showPage('pageSelect'); };
    if (pct >= 80) launchConfetti();
    return;
  }

  const q = FreeQuizState.shuffled[FreeQuizState.qIdx];
  const progress = Math.round((FreeQuizState.qIdx / total) * 100);

  let html = '<div class="fq-header">';
  html += '<div class="fq-title">🧠 ' + escapeHtml(q._cat) + '</div>';
  html += '<div class="fq-stats">問 ' + (FreeQuizState.qIdx+1) + ' / ' + total + ' &nbsp;|&nbsp; 正解 ' + FreeQuizState.correct + '</div>';
  html += '<div class="fq-progress-bar"><div class="fq-progress-fill" style="width:' + progress + '%;"></div></div>';
  html += '</div>';

  html += '<div class="fq-q-card">';
  html += '<div class="fq-q-cat">' + escapeHtml(q._cat) + '</div>';
  html += '<div class="fq-q-text">' + escapeHtml(q.q) + '</div>';
  html += '<div class="fq-options">';
  q.opts.forEach((opt, i) => {
    html += '<div class="fq-opt" data-i="' + i + '">' + (i+1) + '. ' + escapeHtml(opt) + '</div>';
  });
  html += '</div></div>';
  html += '<div id="fqFeedback"></div>';

  area.innerHTML = html;
  FreeQuizState.answered = false;

  area.querySelectorAll('.fq-opt').forEach(opt => {
    opt.onclick = () => {
      if (FreeQuizState.answered) return;
      FreeQuizState.answered = true;
      const chosen = parseInt(opt.dataset.i);
      const correct = q.a;
      area.querySelectorAll('.fq-opt').forEach((o, i) => {
        o.classList.add('answered');
        if (i === correct) o.classList.add('correct');
        else if (i === chosen) o.classList.add('wrong');
      });
      const ok = chosen === correct;
      if (ok) { FreeQuizState.correct++; sfx('correct'); }
      else { FreeQuizState.wrong++; sfx('wrong'); }
      // 통계 저장
      if (!State.quizStats) State.quizStats = {};
      const catKey = FreeQuizState.catId;
      if (!State.quizStats[catKey]) State.quizStats[catKey] = { correct: 0, done: 0 };
      State.quizStats[catKey].done++;
      if (ok) State.quizStats[catKey].correct++;
      saveState();

      const fb = document.getElementById('fqFeedback');
      let fbHtml = '<div class="fq-feedback">';
      fbHtml += '<div class="fq-feedback-h ' + (ok ? 'ok' : 'ng') + '">' + (ok ? '🎉 正解!' : '✗ ざんねん…') + '</div>';
      if (!ok) fbHtml += '<div style="font-size:13px;color:#a04ab0;margin-bottom:4px;">こたえ: ' + escapeHtml(q.opts[correct]) + '</div>';
      fbHtml += '<div class="fq-feedback-exp">📝 ' + escapeHtml(q.exp) + '</div>';
      fbHtml += '</div>';
      fbHtml += '<button class="fq-next-btn" id="fqNext">' + (FreeQuizState.qIdx + 1 >= total ? '結果へ →' : '次へ →') + '</button>';
      fb.innerHTML = fbHtml;
      document.getElementById('fqNext').onclick = () => {
        FreeQuizState.qIdx++;
        renderFreeQuiz();
      };
    };
  });
}

