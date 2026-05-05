/* engine/writing.js — extracted from index.html (v73 step4a)
 * Original location: lines 1702-2370 (current index.html)
 * Contents: WRITING (WritingState, startWritingChapter, renderWriting, setupOrderDrag, checkWritingOrder, escapeHtml, countWords, checkExamKeywords), GRAMMAR (GrammarState, startGrammarChapter, renderGrammar, showGrammarFeedback), COMPOSITION (CompositionState, startCompositionChapter, renderComposition)
 * Dependencies: State, sfx, showModal, showPage, saveState, ALL_WRITING/GRAMMAR_TOPICS/COMPOSITION_DATA (data files)
 */
// ============================================================
// ✍️ WRITING (라이팅) 함수들
// ============================================================
let WritingState = {
  chapter: null,
  topicIdx: 0,
  step: 'read', // read | blank | order | compare | exam
  blankIdx: 0,
  blankCorrect: 0,
  orderArr: [],
  yesno: 'yes', // yes | no (read 단계에서)
  examState: 'writing', // writing | submitted
  examText: '',
};

function startWritingChapter(ch) {
  WritingState.chapter = ch;
  WritingState.topicIdx = 0;
  WritingState.step = 'read';
  WritingState.yesno = 'yes';
  WritingState.examState = 'writing';
  WritingState.examText = '';
  showPage('pageWriting');
  playBGM('eng');
  renderWriting();
}

function renderWriting() {
  const ch = WritingState.chapter;
  const t = ch.topics[WritingState.topicIdx];
  const area = document.getElementById('writingArea');
  const stepLabels = { read: 'A. 模範解答', blank: 'B. 穴埋め', order: 'C. 順番', compare: 'D. Yes/No 比較', exam: 'E. ✏️ 試験形式' };

  let html = '';
  // 헤더
  html += '<div class="wr-step-tabs">';
  ['read', 'blank', 'order', 'compare', 'exam'].forEach(s => {
    html += '<button class="wr-step-tab' + (WritingState.step === s ? ' active' : '') + '" data-step="' + s + '">' + stepLabels[s] + '</button>';
  });
  html += '</div>';

  // 주제 카드
  html += '<div class="wr-topic-card">';
  html += '<div class="wr-cat">' + t.cat + ' / 第' + (WritingState.topicIdx+1) + '/' + ch.topics.length + '題</div>';
  html += '<div class="wr-q">' + escapeHtml(t.q) + '</div>';
  html += '<div class="wr-q-ja">' + escapeHtml(t.qja) + '</div>';
  html += '</div>';

  // 단계별 컨텐츠
  if (WritingState.step === 'read') {
    // Yes/No 토글 버튼
    html += '<div class="wr-yesno-toggle">';
    html += '<button class="wr-yn-btn' + (WritingState.yesno === 'yes' ? ' active yes' : '') + '" data-yn="yes">👍 Yes 答案</button>';
    if (t.answerNo) {
      html += '<button class="wr-yn-btn' + (WritingState.yesno === 'no' ? ' active no' : '') + '" data-yn="no">👎 No 答案 (反対意見)</button>';
    }
    html += '</div>';

    const showingAnswer = (WritingState.yesno === 'no' && t.answerNo) ? t.answerNo : t.answer;
    const showingHint = (WritingState.yesno === 'no' && t.hintNo) ? t.hintNo : t.hint;
    const showingPov = (WritingState.yesno === 'no' && t.povNo) ? t.povNo : t.pov;
    const ansClass = (WritingState.yesno === 'no') ? 'wr-answer-box wr-answer-no' : 'wr-answer-box';

    // 준1급 라이팅: POV (관점) 표시
    if (showingPov && showingPov.length) {
      const povJa = { Environment:'環境', Economy:'経済', Society:'社会', Health:'健康',
                      Technology:'技術', Education:'教育', Ethics:'倫理', Culture:'文化' };
      html += '<div class="wr-pov-row">';
      html += '<span class="wr-pov-label">📌 観点 (POV):</span> ';
      showingPov.forEach(p => {
        html += '<span class="wr-pov-chip">' + escapeHtml(p) + ' (' + (povJa[p]||p) + ')</span>';
      });
      html += '</div>';
    }

    html += '<div class="' + ansClass + '">';
    showingAnswer.forEach(line => {
      html += '<div class="wr-line">' + escapeHtml(line) + '</div>';
    });
    html += '<div class="wr-hint">💡 ' + escapeHtml(showingHint) + '</div>';
    html += '</div>';
  } else if (WritingState.step === 'blank') {
    if (!t.blanks || t.blanks.length === 0) {
      html += '<div class="wr-answer-box"><div class="wr-line" style="text-align:center;">この主題には 穴埋め問題が ありません。<br>(準1級 ライティングは 試験形式モードで 練習しましょう)</div></div>';
    } else {
      if (WritingState.blankIdx === 0) WritingState.blankCorrect = 0;
      if (WritingState.blankIdx >= t.blanks.length) {
      // 빈칸 모두 풀었음 - 결과 표시
      html += '<div class="wr-answer-box">';
      html += '<div class="wr-line" style="text-align:center;font-size:18px;font-family:\'RocknRoll One\';">';
      html += '🎉 ' + WritingState.blankCorrect + ' / ' + t.blanks.length + ' 正解!';
      html += '</div></div>';
      html += '<button class="wr-check-btn" id="wrBlankReset">もう一度</button>';
    } else {
      const b = t.blanks[WritingState.blankIdx];
      html += '<div class="wr-topic-card">';
      html += '<div class="wr-blank-q">問' + (WritingState.blankIdx+1) + '/' + t.blanks.length + ': ' + escapeHtml(b.sentence) + '</div>';
      html += '<div class="wr-blank-options">';
      b.choices.forEach((c, i) => {
        html += '<div class="wr-blank-opt" data-choice="' + escapeHtml(c) + '" data-correct="' + escapeHtml(b.answer) + '">' + escapeHtml(c) + '</div>';
      });
      html += '</div></div>';
    }
    }
  } else if (WritingState.step === 'order') {
    if (!t.order || !t.order.shuffled) {
      html += '<div class="wr-answer-box"><div class="wr-line" style="text-align:center;">この主題には 順番問題が ありません。<br>(準1級 ライティングは 試験形式モードで 練習しましょう)</div></div>';
    } else {
    if (!WritingState.orderArr.length || !WritingState.orderArr.length) {
      WritingState.orderArr = [...t.order.shuffled.keys()].map(i => ({ origIdx: i, text: t.order.shuffled[i] }));
    }
    html += '<div class="wr-topic-card">';
    html += '<div class="wr-blank-q">▼ 上下にドラッグして正しい順番に</div>';
    html += '<ul class="wr-order-list" id="wrOrderList">';
    WritingState.orderArr.forEach((item, i) => {
      html += '<li class="wr-order-item" draggable="true" data-orig="' + item.origIdx + '" data-pos="' + i + '">';
      html += '<span class="wr-order-num">' + (i+1) + '</span>';
      html += '<span>' + escapeHtml(item.text) + '</span>';
      html += '</li>';
    });
    html += '</ul>';
    html += '<button class="wr-check-btn" id="wrOrderCheck">こたえあわせ</button>';
    html += '</div>';
    html += '<div id="wrOrderResult" style="text-align:center;margin-top:10px;font-family:\'RocknRoll One\';"></div>';
    }
  } else if (WritingState.step === 'compare') {
    if (!t.answerNo) {
      html += '<div class="wr-answer-box"><div class="wr-line" style="text-align:center;">この主題には No 答案がありません。</div></div>';
    } else {
      html += '<div class="wr-compare-grid">';
      // Yes 컬럼
      html += '<div class="wr-compare-col wr-compare-yes">';
      html += '<div class="wr-compare-h">👍 Yes (賛成)</div>';
      t.answer.forEach(line => {
        html += '<div class="wr-line">' + escapeHtml(line) + '</div>';
      });
      html += '<div class="wr-hint">💡 ' + escapeHtml(t.hint) + '</div>';
      html += '</div>';
      // No 컬럼
      html += '<div class="wr-compare-col wr-compare-no">';
      html += '<div class="wr-compare-h">👎 No (反対)</div>';
      t.answerNo.forEach(line => {
        html += '<div class="wr-line">' + escapeHtml(line) + '</div>';
      });
      html += '<div class="wr-hint">💡 ' + escapeHtml(t.hintNo) + '</div>';
      html += '</div>';
      html += '</div>';
      // 핵심 표현 안내
      html += '<div class="wr-keywords">';
      html += '<div class="wr-keywords-h">📌 反対意見の表現</div>';
      html += '<div class="wr-keyword-item">• <strong>I do not think...</strong> ~とは思わない</div>';
      html += '<div class="wr-keyword-item">• <strong>However, ...</strong> しかし、~</div>';
      html += '<div class="wr-keyword-item">• <strong>On the other hand, ...</strong> 一方で、~</div>';
      html += '<div class="wr-keyword-item">• <strong>It depends on ...</strong> ~による</div>';
      html += '</div>';
    }
  } else if (WritingState.step === 'exam') {
    // ===== 試験形式モード =====
    if (WritingState.examState === 'submitted') {
      // 제출 후: 비교 화면
      html += '<div class="wr-exam-result">';
      html += '<div class="wr-exam-result-h">📝 あなたの解答</div>';
      const userText = WritingState.examText || '';
      const wordCount = countWords(userText);
      const isPre1W = ch.isPre1Writing === true;
      const recommendRange = isPre1W ? '120~150語' : '80~100語';
      html += '<div class="wr-exam-user-box">';
      html += '<div class="wr-exam-user-text">' + escapeHtml(userText).replace(/\n/g, '<br>') + '</div>';
      html += '<div class="wr-exam-wordcount">単語数: ' + wordCount + ' (推奨: ' + recommendRange + ')</div>';
      html += '</div>';

      // 핵심 표현 체크
      const keywords = checkExamKeywords(userText);
      html += '<div class="wr-exam-checks">';
      html += '<div class="wr-keywords-h">✓ 使った表現チェック</div>';
      keywords.forEach(k => {
        html += '<div class="wr-exam-check-item ' + (k.used ? 'used' : 'unused') + '">';
        html += (k.used ? '✓' : '○') + ' <strong>' + escapeHtml(k.expr) + '</strong> ' + escapeHtml(k.ja);
        html += '</div>';
      });
      html += '</div>';

      // 모범답안 비교 (Yes/No 둘 다)
      html += '<div class="wr-exam-models">';
      html += '<div class="wr-keywords-h">📚 模範解答 (参考)</div>';
      html += '<div class="wr-compare-grid">';
      html += '<div class="wr-compare-col wr-compare-yes">';
      html += '<div class="wr-compare-h">👍 Yes</div>';
      t.answer.forEach(line => {
        html += '<div class="wr-line">' + escapeHtml(line) + '</div>';
      });
      html += '</div>';
      if (t.answerNo) {
        html += '<div class="wr-compare-col wr-compare-no">';
        html += '<div class="wr-compare-h">👎 No</div>';
        t.answerNo.forEach(line => {
          html += '<div class="wr-line">' + escapeHtml(line) + '</div>';
        });
        html += '</div>';
      }
      html += '</div></div>';

      html += '<button class="wr-check-btn" id="wrExamRetry">もう一度書く</button>';
      html += '</div>';
    } else {
      // 작성 모드
      const isPre1W2 = ch.isPre1Writing === true;
      html += '<div class="wr-exam-instructions">';
      html += '<div class="wr-exam-h">✏️ 試験形式モード' + (isPre1W2 ? ' (準1級レベル)' : '') + '</div>';
      html += '<div class="wr-exam-rules">';
      if (isPre1W2) {
        html += '• <strong>120~150語</strong>で英語の意見文を書きましょう<br>';
        html += '• 4つの観点 (環境・経済・社会・健康・技術・教育・倫理・文化) のうち <strong>2つ以上</strong> を使う<br>';
        html += '• 構成: 意見 → 理由1 (観点A + 詳細) → 理由2 (観点B + 詳細) → 結論<br>';
        html += '• 提出後、模範解答と比較できます';
      } else {
        html += '• 80~100語で英語の意見文を書きましょう<br>';
        html += '• 構成: 意見 → 理由1 → 理由2 → 結論<br>';
        html += '• 提出後、模範解答と比較できます';
      }
      html += '</div></div>';

      html += '<textarea class="wr-exam-textarea" id="wrExamInput" placeholder="ここに英語で答案を書いてください..."></textarea>';
      html += '<div class="wr-exam-counter" id="wrExamCounter">単語数: 0</div>';
      html += '<button class="wr-check-btn" id="wrExamSubmit">📤 答案を提出する</button>';
    }
  }

  // 주제 이동
  html += '<div class="wr-nav">';
  html += '<button class="wr-nav-btn" id="wrPrev"' + (WritingState.topicIdx === 0 ? ' disabled' : '') + '>← 前の題</button>';
  html += '<button class="wr-nav-btn" id="wrNext"' + (WritingState.topicIdx >= ch.topics.length - 1 ? ' disabled' : '') + '>次の題 →</button>';
  html += '</div>';

  area.innerHTML = html;

  // 이벤트
  area.querySelectorAll('.wr-step-tab').forEach(b => {
    b.onclick = () => {
      WritingState.step = b.dataset.step;
      WritingState.blankIdx = 0;
      WritingState.orderArr = [];
      renderWriting();
    };
  });
  // Yes/No 토글
  area.querySelectorAll('.wr-yn-btn').forEach(b => {
    b.onclick = () => {
      WritingState.yesno = b.dataset.yn;
      sfx('click');
      renderWriting();
    };
  });
  // 시험 형식 모드: textarea 입력·제출·재시도
  const examInput = document.getElementById('wrExamInput');
  if (examInput) {
    // 기존 텍스트 복원
    examInput.value = WritingState.examText || '';
    examInput.oninput = () => {
      WritingState.examText = examInput.value;
      const counter = document.getElementById('wrExamCounter');
      if (counter) counter.textContent = '単語数: ' + countWords(examInput.value);
    };
  }
  const examSubmit = document.getElementById('wrExamSubmit');
  if (examSubmit) {
    examSubmit.onclick = () => {
      if (!WritingState.examText.trim()) {
        alert('解答を書いてから提出してください。');
        return;
      }
      WritingState.examState = 'submitted';
      sfx('correct');
      renderWriting();
    };
  }
  const examRetry = document.getElementById('wrExamRetry');
  if (examRetry) {
    examRetry.onclick = () => {
      WritingState.examState = 'writing';
      sfx('click');
      renderWriting();
    };
  }
  area.querySelectorAll('.wr-blank-opt').forEach(opt => {
    opt.onclick = () => {
      const correct = opt.dataset.correct;
      const choice = opt.dataset.choice;
      area.querySelectorAll('.wr-blank-opt').forEach(o => {
        if (o.dataset.choice === correct) o.classList.add('correct');
        else if (o === opt && choice !== correct) o.classList.add('wrong');
      });
      if (choice === correct) {
        WritingState.blankCorrect++;
        sfx('correct');
      } else {
        sfx('wrong');
      }
      setTimeout(() => {
        WritingState.blankIdx++;
        renderWriting();
      }, 1200);
    };
  });
  const resetBtn = document.getElementById('wrBlankReset');
  if (resetBtn) resetBtn.onclick = () => { WritingState.blankIdx = 0; WritingState.blankCorrect = 0; renderWriting(); };

  const orderCheckBtn = document.getElementById('wrOrderCheck');
  if (orderCheckBtn) orderCheckBtn.onclick = checkWritingOrder;

  // 드래그&드롭 (PC)
  setupOrderDrag();

  document.getElementById('wrPrev').onclick = () => {
    if (WritingState.topicIdx > 0) {
      WritingState.topicIdx--;
      WritingState.step = 'read';
      WritingState.blankIdx = 0;
      WritingState.orderArr = [];
      WritingState.yesno = 'yes';
      WritingState.examState = 'writing';
      WritingState.examText = '';
      renderWriting();
    }
  };
  document.getElementById('wrNext').onclick = () => {
    if (WritingState.topicIdx < ch.topics.length - 1) {
      WritingState.topicIdx++;
      WritingState.step = 'read';
      WritingState.blankIdx = 0;
      WritingState.orderArr = [];
      WritingState.yesno = 'yes';
      WritingState.examState = 'writing';
      WritingState.examText = '';
      renderWriting();
    }
  };
}

function setupOrderDrag() {
  const list = document.getElementById('wrOrderList');
  if (!list) return;
  let dragSrc = null;
  list.querySelectorAll('.wr-order-item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
      dragSrc = item;
      item.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });
    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!dragSrc || dragSrc === item) return;
      const rect = item.getBoundingClientRect();
      const after = (e.clientY - rect.top) > rect.height / 2;
      list.insertBefore(dragSrc, after ? item.nextSibling : item);
    });
    // 모바일 터치
    let touchY = 0;
    item.addEventListener('touchstart', (e) => {
      dragSrc = item;
      item.classList.add('dragging');
      touchY = e.touches[0].clientY;
    });
    item.addEventListener('touchmove', (e) => {
      if (!dragSrc) return;
      e.preventDefault();
      const y = e.touches[0].clientY;
      const items = [...list.querySelectorAll('.wr-order-item')];
      items.forEach(other => {
        if (other === dragSrc) return;
        const rect = other.getBoundingClientRect();
        if (y > rect.top && y < rect.bottom) {
          const after = (y - rect.top) > rect.height / 2;
          list.insertBefore(dragSrc, after ? other.nextSibling : other);
        }
      });
    });
    item.addEventListener('touchend', () => {
      if (dragSrc) dragSrc.classList.remove('dragging');
      dragSrc = null;
    });
  });
}

function checkWritingOrder() {
  const list = document.getElementById('wrOrderList');
  const items = [...list.querySelectorAll('.wr-order-item')];
  const t = WritingState.chapter.topics[WritingState.topicIdx];
  // 현재 순서대로 origIdx를 추출, 그것이 t.order.correct와 일치하는지
  const currentOrder = items.map(it => parseInt(it.dataset.orig));
  const correct = t.order.correct;
  let allCorrect = true;
  for (let i = 0; i < correct.length; i++) {
    if (currentOrder[i] !== correct[i]) { allCorrect = false; break; }
  }
  // 번호 다시 매기기
  items.forEach((it, i) => {
    it.querySelector('.wr-order-num').textContent = (i+1);
  });
  const result = document.getElementById('wrOrderResult');
  if (allCorrect) {
    result.style.color = '#4a8a4a';
    result.innerHTML = '🎉 正解!じゅんばんが あっています!';
    sfx('correct');
  } else {
    result.style.color = 'var(--accent-red)';
    result.innerHTML = '✗ 順番が ちがいます。もう一度!';
    sfx('wrong');
  }
}

function escapeHtml(s) {
  const div = document.createElement('div');
  div.textContent = s;
  return div.innerHTML;
}

// 시험 형식 모드 헬퍼들
function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).length;
}

function checkExamKeywords(text) {
  // 라이팅에 필요한 핵심 표현 체크 (대소문자 무시)
  const lower = (text || '').toLowerCase();
  const keywords = [
    { expr: 'I think / I do not think', ja: '意見表現',
      check: () => /\b(i\s+(do\s+not\s+|don'?t\s+)?think)\b/i.test(text) },
    { expr: 'First, ...', ja: '最初の理由',
      check: () => /\bfirst[,\s]/i.test(text) },
    { expr: 'Second, ... / Also, ...', ja: '2つ目の理由',
      check: () => /\b(second[,\s]|also[,\s]|in\s+addition[,\s])/i.test(text) },
    { expr: 'because', ja: '理由を示す',
      check: () => /\bbecause\b/i.test(text) },
    { expr: 'For these reasons / Therefore', ja: '結論の表現',
      check: () => /\b(for\s+these\s+reasons[,\s]|therefore[,\s]|so[,\s]+i)/i.test(text) },
  ];
  return keywords.map(k => ({ expr: k.expr, ja: k.ja, used: k.check() }));
}

// ============================================================
// 📐 GRAMMAR (문법) 함수들
// ============================================================
let GrammarState = {
  chapter: null,
  qIdx: 0,
  correct: 0,
  answered: false,
};

function startGrammarChapter(ch) {
  GrammarState.chapter = ch;
  GrammarState.qIdx = 0;
  GrammarState.correct = 0;
  GrammarState.answered = false;
  showPage('pageGrammar');
  playBGM('eng');
  renderGrammar();
}

function renderGrammar() {
  const ch = GrammarState.chapter;
  if (GrammarState.qIdx >= ch.topics.length) {
    // 완료
    const total = ch.topics.length;
    const pct = Math.round(GrammarState.correct / total * 100);
    document.getElementById('grammarTitle').textContent = '🎉 完了!';
    document.getElementById('grammarProgress').textContent = '正解 ' + GrammarState.correct + ' / ' + total + ' (' + pct + '%)';
    const area = document.getElementById('grammarArea');
    area.innerHTML = '<div class="gr-question-box"><div class="gr-result correct">🎉 おつかれさまでした!</div><div style="text-align:center;margin-top:14px;">' +
      GrammarState.correct + ' / ' + total + ' (' + pct + '%)</div></div>' +
      '<button class="gr-next-btn" id="grRestart">もう一度</button>';
    document.getElementById('grRestart').onclick = () => { GrammarState.qIdx = 0; GrammarState.correct = 0; renderGrammar(); };
    if (pct >= 80) launchConfetti();
    return;
  }
  const q = ch.topics[GrammarState.qIdx];
  document.getElementById('grammarTitle').textContent = ch.title;
  document.getElementById('grammarProgress').textContent = '問' + (GrammarState.qIdx+1) + ' / ' + ch.topics.length + ' (正解 ' + GrammarState.correct + ')';

  const area = document.getElementById('grammarArea');
  let html = '<div class="gr-question-box">';
  html += '<div class="gr-cat">' + escapeHtml(q.cat) + '</div>';
  html += '<div class="gr-topic">' + escapeHtml(q.topic) + '</div>';
  html += '<div class="gr-q-text">' + escapeHtml(q.q) + '</div>';
  html += '</div>';

  if (q.type === 'mc') {
    html += '<div class="gr-options">';
    q.options.forEach((opt, i) => {
      html += '<div class="gr-opt" data-i="' + i + '">' + (i+1) + '. ' + escapeHtml(opt) + '</div>';
    });
    html += '</div>';
  } else if (q.type === 'fill') {
    html += '<div class="gr-fill-hint">💡 ' + escapeHtml(q.hint) + '</div>';
    html += '<input type="text" class="gr-fill-input" id="grFillInput" placeholder="ここに 入力" autocomplete="off"/>';
    html += '<button class="gr-next-btn" id="grFillSubmit">こたえる</button>';
  }

  html += '<div id="grResult"></div>';
  area.innerHTML = html;
  GrammarState.answered = false;

  if (q.type === 'mc') {
    area.querySelectorAll('.gr-opt').forEach(opt => {
      opt.onclick = () => {
        if (GrammarState.answered) return;
        GrammarState.answered = true;
        const chosen = parseInt(opt.dataset.i);
        const correct = q.answer;
        area.querySelectorAll('.gr-opt').forEach((o, i) => {
          o.classList.add('answered');
          if (i === correct) o.classList.add('correct');
          else if (i === chosen) o.classList.add('wrong');
        });
        const ok = chosen === correct;
        if (ok) { GrammarState.correct++; sfx('correct'); }
        else sfx('wrong');
        showGrammarFeedback(q, ok);
      };
    });
  } else if (q.type === 'fill') {
    const input = document.getElementById('grFillInput');
    input.focus();
    const submit = () => {
      if (GrammarState.answered) return;
      GrammarState.answered = true;
      const v = input.value.trim().toLowerCase();
      const a = q.answer.trim().toLowerCase();
      const ok = v === a;
      if (ok) { GrammarState.correct++; sfx('correct'); }
      else sfx('wrong');
      showGrammarFeedback(q, ok);
    };
    document.getElementById('grFillSubmit').onclick = submit;
    input.onkeydown = (e) => { if (e.key === 'Enter') submit(); };
  }
}

function showGrammarFeedback(q, ok) {
  const result = document.getElementById('grResult');
  const correctAns = q.type === 'mc' ? q.options[q.answer] : q.answer;
  let html = '<div class="gr-result ' + (ok ? 'correct' : 'wrong') + '">' + (ok ? '🎉 正解!' : '✗ ざんねん…') + '</div>';
  if (!ok) html += '<div style="text-align:center;font-size:14px;margin-bottom:8px;">こたえ: <strong>' + escapeHtml(correctAns) + '</strong></div>';
  html += '<div class="gr-explain-box">📝 ' + escapeHtml(q.explanation) + '</div>';
  html += '<button class="gr-next-btn" id="grNext">次へ →</button>';
  result.innerHTML = html;
  document.getElementById('grNext').onclick = () => {
    GrammarState.qIdx++;
    renderGrammar();
  };
}

// ============================================================
// 📝 英作文チャレンジ (v21)
// ============================================================
let CompositionState = {
  chapter: null,
  qIdx: 0,
  showAnswer: false,
  userAnswer: '',
};

function startCompositionChapter(ch) {
  CompositionState.chapter = ch;
  CompositionState.qIdx = 0;
  CompositionState.showAnswer = false;
  CompositionState.userAnswer = '';
  showPage('pageComposition');
  playBGM('eng');
  renderComposition();
}

function renderComposition() {
  const ch = CompositionState.chapter;
  const q = ch.topics[CompositionState.qIdx];
  const area = document.getElementById('compositionArea');

  let html = '<div class="comp-header">';
  html += '<div class="comp-title">' + escapeHtml(ch.title) + '</div>';
  html += '<div class="comp-progress">問' + (CompositionState.qIdx+1) + ' / ' + ch.topics.length + '</div>';
  html += '</div>';

  html += '<div class="comp-question-card">';
  html += '<div class="comp-ja-label">📖 日本語の文を 英語に 訳しましょう</div>';
  html += '<div class="comp-ja-text">' + escapeHtml(q.ja) + '</div>';
  if (q.hint && q.hint.length) {
    html += '<div class="comp-hint-row">';
    html += '<span style="font-size:12px;color:#6a5688;">💡 ヒント:</span>';
    q.hint.forEach(h => {
      html += '<span class="comp-hint-chip">' + escapeHtml(h) + '</span>';
    });
    html += '</div>';
  }
  html += '</div>';

  if (!CompositionState.showAnswer) {
    html += '<textarea class="comp-input" id="compInput" placeholder="ここに 英語で 入力">' + escapeHtml(CompositionState.userAnswer) + '</textarea>';
    html += '<div class="comp-buttons">';
    html += '<button class="comp-btn" id="compShow">答えを 見る</button>';
    html += '</div>';
  } else {
    html += '<div class="comp-result-box">';
    if (CompositionState.userAnswer.trim()) {
      html += '<div class="comp-result-h">📝 あなたの答え</div>';
      html += '<div class="comp-user-answer">' + escapeHtml(CompositionState.userAnswer) + '</div>';
    }
    html += '<div class="comp-result-h" style="margin-top:10px;">✅ 模範解答</div>';
    html += '<div class="comp-result-en">' + escapeHtml(q.en) + '</div>';
    html += '</div>';
    html += '<div class="comp-buttons">';
    html += '<button class="comp-btn secondary" id="compRetry">もう一度</button>';
    if (CompositionState.qIdx < ch.topics.length - 1) {
      html += '<button class="comp-btn" id="compNext">次の問題 →</button>';
    } else {
      html += '<button class="comp-btn" id="compFinish">完了</button>';
    }
    html += '</div>';
  }

  area.innerHTML = html;

  const input = document.getElementById('compInput');
  if (input) {
    input.oninput = () => { CompositionState.userAnswer = input.value; };
    input.focus();
  }
  const showBtn = document.getElementById('compShow');
  if (showBtn) {
    showBtn.onclick = () => {
      CompositionState.showAnswer = true;
      sfx('click');
      renderComposition();
    };
  }
  const retryBtn = document.getElementById('compRetry');
  if (retryBtn) {
    retryBtn.onclick = () => {
      CompositionState.showAnswer = false;
      CompositionState.userAnswer = '';
      sfx('click');
      renderComposition();
    };
  }
  const nextBtn = document.getElementById('compNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      CompositionState.qIdx++;
      CompositionState.showAnswer = false;
      CompositionState.userAnswer = '';
      sfx('click');
      renderComposition();
    };
  }
  const finishBtn = document.getElementById('compFinish');
  if (finishBtn) {
    finishBtn.onclick = () => {
      sfx('correct');
      launchConfetti();
      buildChapterGrid();
      showPage('pageSelect');
    };
  }
}

