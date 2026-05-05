/* engine/learn-features.js — extracted from index.html (v73 step4a)
 * Original location: lines 2371-3043 (current index.html)
 * Contents: PHRASE DICT (PhraseDictState, startPhraseDictChapter, renderPhraseDict), DAILY MISSION (DAILY_STORAGE_KEY, getTodayMission, loadDailyEntries, saveDailyEntry, startDailyMissionChapter, renderDailyMission), NEWS (NewsState, startNewsChapter, renderNews, pickNewsQuiz), COMPOUND (CompoundState, startCompoundChapter, renderCompound, showCmpFeedback)
 * Dependencies: State, sfx, showModal, showPage, saveState, PHRASE_DICT/DAILY_MISSIONS/NEWS_HEADLINES/NEWS_CATS/COMPOUND_WORDS/COMPOUND_HARD (data files)
 */
// ============================================================
// 🎭 ライティング表現辞典 (v21)
// ============================================================
let PhraseDictState = {
  selectedCat: 'all',
};

function startPhraseDictChapter() {
  PhraseDictState.selectedCat = 'all';
  showPage('pagePhraseDict');
  playBGM('eng');
  renderPhraseDict();
}

function renderPhraseDict() {
  const area = document.getElementById('phraseDictArea');
  // 카테고리 목록 추출 (중복 제거, 등장 순서 유지)
  const cats = [];
  PHRASE_DICT.forEach(p => {
    if (!cats.includes(p.cat)) cats.push(p.cat);
  });

  let html = '<div class="pd-header">';
  html += '<div class="pd-title">🎭 ライティング表現辞典</div>';
  html += '<div style="font-size:12px;color:var(--ink);margin-top:4px;">' + PHRASE_DICT.length + ' 表現</div>';
  html += '</div>';

  // 카테고리 탭
  html += '<div class="pd-cat-tabs">';
  html += '<button class="pd-cat-btn' + (PhraseDictState.selectedCat === 'all' ? ' active' : '') + '" data-cat="all">すべて</button>';
  cats.forEach(c => {
    html += '<button class="pd-cat-btn' + (PhraseDictState.selectedCat === c ? ' active' : '') + '" data-cat="' + escapeHtml(c) + '">' + escapeHtml(c) + '</button>';
  });
  html += '</div>';

  // 표현 목록
  const filtered = PhraseDictState.selectedCat === 'all'
    ? PHRASE_DICT
    : PHRASE_DICT.filter(p => p.cat === PhraseDictState.selectedCat);

  html += '<div class="pd-list">';
  filtered.forEach(p => {
    html += '<div class="pd-item">';
    html += '<div class="pd-expr">' + escapeHtml(p.expr) + '</div>';
    html += '<div class="pd-ja">' + escapeHtml(p.ja) + '</div>';
    html += '<div class="pd-ex">▸ ' + escapeHtml(p.ex) + '</div>';
    html += '</div>';
  });
  html += '</div>';

  area.innerHTML = html;

  area.querySelectorAll('.pd-cat-btn').forEach(b => {
    b.onclick = () => {
      PhraseDictState.selectedCat = b.dataset.cat;
      sfx('click');
      renderPhraseDict();
    };
  });
}

// ============================================================
// 📅 매일의 영어 미션 (v21)
// ============================================================
const DAILY_STORAGE_KEY = 'haruRioDailyEntries';

function getTodayMission() {
  // 날짜 기반 미션 선택 (1년 365일을 30개로 순환)
  const today = new Date();
  const start = new Date(today.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  const idx = dayOfYear % DAILY_MISSIONS.length;
  return { mission: DAILY_MISSIONS[idx], day: dayOfYear, date: today };
}

function loadDailyEntries() {
  try {
    const raw = localStorage.getItem(DAILY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveDailyEntry(entry) {
  const entries = loadDailyEntries();
  // 같은 날짜 + 같은 미션은 덮어쓰기
  const existing = entries.findIndex(e => e.dateStr === entry.dateStr && e.missionId === entry.missionId);
  if (existing >= 0) {
    entries[existing] = entry;
  } else {
    entries.unshift(entry); // 최신순
  }
  // 최대 100개 보관
  const trimmed = entries.slice(0, 100);
  try {
    localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(trimmed));
  } catch (e) { /* 용량 초과시 무시 */ }
}

function startDailyMissionChapter() {
  showPage('pageDaily');
  playBGM('eng');
  renderDailyMission();
}

function renderDailyMission() {
  const area = document.getElementById('dailyArea');
  const { mission, day, date } = getTodayMission();
  const dateStr = date.getFullYear() + '/' + String(date.getMonth()+1).padStart(2,'0') + '/' + String(date.getDate()).padStart(2,'0');
  const weekDays = ['日','月','火','水','木','金','土'];
  const dayName = weekDays[date.getDay()];
  const entries = loadDailyEntries();
  const todayEntry = entries.find(e => e.dateStr === dateStr && e.missionId === mission.id);

  let html = '<div class="daily-header">';
  html += '<div class="daily-date">📅 ' + dateStr + ' (' + dayName + ')</div>';
  html += '<div class="daily-day-num">第 ' + (day) + ' 日 / ミッション ' + mission.id + '</div>';
  html += '</div>';

  html += '<div class="daily-mission-card">';
  html += '<div class="daily-cat">' + escapeHtml(mission.cat) + '</div>';
  html += '<div class="daily-title">' + escapeHtml(mission.title) + '</div>';
  html += '<div class="daily-title-ja">' + escapeHtml(mission.titleJa) + '</div>';

  html += '<div class="daily-prompt">';
  html += '<div class="daily-prompt-en">' + escapeHtml(mission.prompt) + '</div>';
  html += '<div class="daily-prompt-ja">' + escapeHtml(mission.promptJa) + '</div>';
  html += '</div>';

  html += '<div class="daily-example">💡 例: ' + escapeHtml(mission.example) + '</div>';

  html += '<textarea class="daily-textarea" id="dailyTextarea" placeholder="ここに 英語で 書いてみよう">' + escapeHtml(todayEntry ? todayEntry.text : '') + '</textarea>';
  html += '<button class="daily-save-btn" id="dailySaveBtn">💾 保存する</button>';
  html += '<div id="dailySaveMsg" style="text-align:center;margin-top:6px;font-size:12px;color:#4a8a4a;font-family:Klee One;"></div>';
  html += '</div>';

  // 과거 기록
  html += '<div class="daily-history">';
  html += '<div class="daily-history-h">📚 過去の 日記 (' + entries.length + ')</div>';
  if (entries.length === 0) {
    html += '<div class="daily-history-empty">まだ 何も 書いていません。今日から はじめよう!</div>';
  } else {
    // 최근 10개만 표시
    entries.slice(0, 10).forEach(e => {
      html += '<div class="daily-history-item">';
      html += '<div class="daily-history-date">' + escapeHtml(e.dateStr) + ' - ' + escapeHtml(e.missionTitle) + '</div>';
      html += '<div class="daily-history-text">' + escapeHtml(e.text) + '</div>';
      html += '</div>';
    });
    if (entries.length > 10) {
      html += '<div style="text-align:center;font-size:11px;color:var(--ink);margin-top:4px;">他 ' + (entries.length - 10) + ' 件</div>';
    }
  }
  html += '</div>';

  area.innerHTML = html;

  const textarea = document.getElementById('dailyTextarea');
  const saveBtn = document.getElementById('dailySaveBtn');
  const saveMsg = document.getElementById('dailySaveMsg');
  saveBtn.onclick = () => {
    const text = textarea.value.trim();
    if (!text) {
      saveMsg.textContent = '何か 書いてから 保存してください。';
      saveMsg.style.color = 'var(--accent-red)';
      return;
    }
    saveDailyEntry({
      dateStr: dateStr,
      missionId: mission.id,
      missionTitle: mission.title,
      text: text,
      savedAt: Date.now(),
    });
    saveMsg.textContent = '✓ 保存しました!';
    saveMsg.style.color = '#4a8a4a';
    sfx('correct');
    setTimeout(() => renderDailyMission(), 800);
  };
}

// ============================================================
// 📰 英語ニュース 見出し (v22)
// ============================================================
let NewsState = {
  mode: 'read', // read | quiz
  selectedCat: 'all',
  quizIdx: 0,
  quizCorrect: 0,
  quizAnswered: false,
  quizCurrent: null,
};

function startNewsChapter() {
  NewsState.mode = 'read';
  NewsState.selectedCat = 'all';
  NewsState.quizIdx = 0;
  NewsState.quizCorrect = 0;
  showPage('pageNews');
  playBGM('eng');
  renderNews();
}

function renderNews() {
  const area = document.getElementById('newsArea');
  let html = '';
  // 헤더
  html += '<div class="news-header">';
  html += '<div class="news-title">📰 英語ニュース 見出し</div>';
  html += '<div class="news-subtitle">' + NEWS_HEADLINES.length + ' 見出し / 5 カテゴリ</div>';
  html += '</div>';
  // 모드 탭
  html += '<div class="news-mode-tabs">';
  html += '<button class="news-mode-btn' + (NewsState.mode === 'read' ? ' active' : '') + '" data-mode="read">📖 読みモード</button>';
  html += '<button class="news-mode-btn' + (NewsState.mode === 'quiz' ? ' active' : '') + '" data-mode="quiz">🎯 クイズモード</button>';
  html += '</div>';

  if (NewsState.mode === 'read') {
    // 카테고리 필터
    html += '<div class="news-cat-tabs">';
    html += '<button class="news-cat-btn' + (NewsState.selectedCat === 'all' ? ' active' : '') + '" data-cat="all">すべて</button>';
    NEWS_CATS.forEach(c => {
      html += '<button class="news-cat-btn' + (NewsState.selectedCat === c ? ' active' : '') + '" data-cat="' + escapeHtml(c) + '">' + escapeHtml(c) + '</button>';
    });
    html += '</div>';

    const filtered = NewsState.selectedCat === 'all'
      ? NEWS_HEADLINES
      : NEWS_HEADLINES.filter(n => n.cat === NewsState.selectedCat);

    filtered.forEach((n, idx) => {
      html += '<div class="news-card" data-idx="' + idx + '">';
      html += '<div class="news-card-cat">' + escapeHtml(n.cat) + '</div>';
      html += '<div class="news-en">' + escapeHtml(n.en) + '</div>';
      html += '<div class="news-ja">▸ ' + escapeHtml(n.ja) + '</div>';
      html += '<div class="news-words-row">';
      html += '<span style="font-size:11px;color:#5a7aa6;font-family:RocknRoll One;align-self:center;">🔑 単語:</span>';
      n.words.forEach(w => {
        html += '<span class="news-word-chip" data-word="' + escapeHtml(w.w) + '">';
        html += escapeHtml(w.w);
        html += '<span class="news-word-meaning">= ' + escapeHtml(w.m) + '</span>';
        html += '</span>';
      });
      html += '</div>';
      html += '<div class="news-desc">';
      html += '<div class="news-desc-en">📝 ' + escapeHtml(n.desc) + '</div>';
      html += '<div class="news-desc-ja">▸ ' + escapeHtml(n.descJa) + '</div>';
      html += '<div class="news-desc-toggle">タップで 翻訳</div>';
      html += '</div>';
      html += '</div>';
    });
  } else {
    // 퀴즈 모드
    if (!NewsState.quizCurrent) {
      pickNewsQuiz();
    }
    const q = NewsState.quizCurrent;
    html += '<div class="news-quiz-progress">問 ' + (NewsState.quizIdx+1) + ' / 10 (正解 ' + NewsState.quizCorrect + ')</div>';
    html += '<div class="news-quiz-card">';
    html += '<div class="news-card-cat">' + escapeHtml(q.headline.cat) + '</div>';
    html += '<div class="news-quiz-q">' + q.questionHtml + '</div>';
    html += '<div class="news-ja" style="text-align:center;">▸ ' + escapeHtml(q.headline.ja) + '</div>';
    html += '<div class="news-quiz-options">';
    q.options.forEach((opt, i) => {
      html += '<div class="news-quiz-opt" data-i="' + i + '">' + escapeHtml(opt) + '</div>';
    });
    html += '</div>';
    html += '<div id="newsQuizFeedback"></div>';
    html += '</div>';
  }

  area.innerHTML = html;

  // 모드 탭 이벤트
  area.querySelectorAll('.news-mode-btn').forEach(b => {
    b.onclick = () => {
      NewsState.mode = b.dataset.mode;
      if (NewsState.mode === 'quiz') {
        NewsState.quizIdx = 0;
        NewsState.quizCorrect = 0;
        NewsState.quizCurrent = null;
        NewsState.quizAnswered = false;
      }
      sfx('click');
      renderNews();
    };
  });
  // 카테고리 이벤트
  area.querySelectorAll('.news-cat-btn').forEach(b => {
    b.onclick = () => {
      NewsState.selectedCat = b.dataset.cat;
      sfx('click');
      renderNews();
    };
  });
  // 단어 칩 토글
  area.querySelectorAll('.news-word-chip').forEach(chip => {
    chip.onclick = () => {
      chip.classList.toggle('revealed');
    };
  });
  // 설명 번역 토글
  area.querySelectorAll('.news-desc').forEach(d => {
    d.onclick = () => {
      d.classList.toggle('revealed');
    };
  });
  // 퀴즈 옵션 클릭
  area.querySelectorAll('.news-quiz-opt').forEach(opt => {
    opt.onclick = () => {
      if (NewsState.quizAnswered) return;
      NewsState.quizAnswered = true;
      const chosen = parseInt(opt.dataset.i);
      const correct = NewsState.quizCurrent.correctIdx;
      area.querySelectorAll('.news-quiz-opt').forEach((o, i) => {
        o.classList.add('answered');
        if (i === correct) o.classList.add('correct');
        else if (i === chosen) o.classList.add('wrong');
      });
      const ok = chosen === correct;
      if (ok) { NewsState.quizCorrect++; sfx('correct'); }
      else sfx('wrong');
      const fb = document.getElementById('newsQuizFeedback');
      let fbHtml = '<div class="news-quiz-feedback" style="color:' + (ok ? '#4a8a4a' : 'var(--accent-red)') + ';">';
      fbHtml += ok ? '🎉 正解!' : '✗ ざんねん…';
      fbHtml += '</div>';
      fbHtml += '<div style="text-align:center;font-size:13px;">完成: <strong>' + escapeHtml(NewsState.quizCurrent.headline.en) + '</strong></div>';
      if (NewsState.quizIdx < 9) {
        fbHtml += '<button class="news-quiz-next" id="newsQuizNext">次へ →</button>';
      } else {
        const total = 10;
        fbHtml += '<div style="text-align:center;margin-top:14px;font-family:RocknRoll One;color:var(--accent-red);">🏁 完了! ' + NewsState.quizCorrect + ' / ' + total + '</div>';
        fbHtml += '<button class="news-quiz-next" id="newsQuizRestart">もう一度</button>';
      }
      fb.innerHTML = fbHtml;
      const nextBtn = document.getElementById('newsQuizNext');
      if (nextBtn) nextBtn.onclick = () => {
        NewsState.quizIdx++;
        NewsState.quizAnswered = false;
        NewsState.quizCurrent = null;
        renderNews();
      };
      const restart = document.getElementById('newsQuizRestart');
      if (restart) restart.onclick = () => {
        NewsState.quizIdx = 0;
        NewsState.quizCorrect = 0;
        NewsState.quizAnswered = false;
        NewsState.quizCurrent = null;
        if (NewsState.quizCorrect >= 8) launchConfetti();
        renderNews();
      };
    };
  });
}

function pickNewsQuiz() {
  // 랜덤 헤드라인 선택, 핵심 단어 1개를 빈칸으로
  const headline = NEWS_HEADLINES[Math.floor(Math.random() * NEWS_HEADLINES.length)];
  const word = headline.words[Math.floor(Math.random() * headline.words.length)];
  // 헤드라인 영어 문장에서 해당 단어를 빈칸으로 (대소문자 무시)
  const re = new RegExp('\\b' + word.w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
  const questionHtml = escapeHtml(headline.en).replace(re, '<span class="blank">?</span>');
  // 오답 보기 - 다른 헤드라인의 단어들에서 추출
  const distractors = [];
  while (distractors.length < 3) {
    const other = NEWS_HEADLINES[Math.floor(Math.random() * NEWS_HEADLINES.length)];
    const ow = other.words[Math.floor(Math.random() * other.words.length)];
    if (ow.w !== word.w && !distractors.includes(ow.w)) distractors.push(ow.w);
  }
  const options = [...distractors, word.w];
  // 셔플
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  NewsState.quizCurrent = {
    headline: headline,
    questionHtml: questionHtml,
    options: options,
    correctIdx: options.indexOf(word.w),
  };
}

// ============================================================
// 🧩 합성어 게임 (v22)
// ============================================================
let CompoundState = {
  qIdx: 0,
  correct: 0,
  answered: false,
  currentQ: null,
  shuffled: null,
};

function startCompoundChapter(ch) {
  CompoundState.qIdx = 0;
  CompoundState.correct = 0;
  CompoundState.answered = false;
  CompoundState.currentQ = null;
  // 모드별 데이터 셋 결정
  const mode = (ch && ch.mode) || 'basic';
  CompoundState.mode = mode;
  let pool;
  if (mode === 'basic') pool = COMPOUND_WORDS;
  else if (mode === 'hidden') pool = COMPOUND_WORDS; // 일상 합성어 + 양쪽 빈칸
  else if (mode === 'advanced') pool = COMPOUND_HARD; // 고급 합성어
  else if (mode === 'meaning') pool = COMPOUND_HARD; // 의미 맞추기
  else pool = COMPOUND_WORDS;
  CompoundState.shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 10);
  showPage('pageCompound');
  playBGM('eng');
  renderCompound();
}

function renderCompound() {
  const area = document.getElementById('compoundArea');
  const mode = CompoundState.mode || 'basic';
  const total = CompoundState.shuffled.length;

  // 완료 화면
  if (CompoundState.qIdx >= total) {
    const pct = Math.round(CompoundState.correct / total * 100);
    let html = '<div class="cmp-header"><div class="cmp-title">🎉 完了!</div></div>';
    html += '<div class="cmp-question-card">';
    html += '<div class="cmp-emoji">🏆</div>';
    html += '<div class="cmp-meaning">正解 ' + CompoundState.correct + ' / ' + total + ' (' + pct + '%)</div>';
    html += '<button class="cmp-next-btn" id="cmpRestart">もう一度</button>';
    html += '</div>';
    area.innerHTML = html;
    document.getElementById('cmpRestart').onclick = () => {
      // 같은 모드로 재시작
      const fakeCh = { mode: CompoundState.mode };
      startCompoundChapter(fakeCh);
    };
    if (pct >= 80) launchConfetti();
    return;
  }

  const q = CompoundState.shuffled[CompoundState.qIdx];

  // 문제 생성 (모드별)
  if (!CompoundState.currentQ || CompoundState.currentQ.idx !== CompoundState.qIdx) {
    if (mode === 'basic' || mode === 'advanced') {
      // 한 쪽 빈칸, 4지선다 (basic = 일상, advanced = 고급)
      const blankSide = Math.random() < 0.5 ? 'a' : 'b';
      const correctWord = blankSide === 'a' ? q.a : q.b;
      const pool = mode === 'advanced' ? COMPOUND_HARD : COMPOUND_WORDS;
      const distractors = [];
      while (distractors.length < 3) {
        const other = pool[Math.floor(Math.random() * pool.length)];
        const ow = blankSide === 'a' ? other.a : other.b;
        if (ow !== correctWord && !distractors.includes(ow)) distractors.push(ow);
      }
      const options = [...distractors, correctWord];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      CompoundState.currentQ = {
        idx: CompoundState.qIdx, blankSide, correctWord, options,
        correctIdx: options.indexOf(correctWord),
      };
    } else if (mode === 'hidden') {
      // 양쪽 모두 빈칸 - 두 단어 모두 4지선다 (각각)
      const aOptions = [q.a];
      const bOptions = [q.b];
      const pool = COMPOUND_WORDS;
      while (aOptions.length < 4) {
        const o = pool[Math.floor(Math.random() * pool.length)].a;
        if (!aOptions.includes(o)) aOptions.push(o);
      }
      while (bOptions.length < 4) {
        const o = pool[Math.floor(Math.random() * pool.length)].b;
        if (!bOptions.includes(o)) bOptions.push(o);
      }
      // 셔플
      [aOptions, bOptions].forEach(arr => {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      });
      CompoundState.currentQ = {
        idx: CompoundState.qIdx,
        aOptions, bOptions,
        aCorrectIdx: aOptions.indexOf(q.a),
        bCorrectIdx: bOptions.indexOf(q.b),
        aChosen: -1, bChosen: -1,
      };
    } else if (mode === 'meaning') {
      // 의미 4지선다 - q.meanings 활용
      const correct = q.meanings[0]; // 첫 번째가 정답
      const options = [...q.meanings];
      for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
      }
      CompoundState.currentQ = {
        idx: CompoundState.qIdx,
        options,
        correctIdx: options.indexOf(correct),
      };
    }
  }
  const cq = CompoundState.currentQ;

  // 헤더
  const titleByMode = {
    basic: '🧩 合成語ゲーム ① 基本',
    hidden: '🧩 合成語ゲーム ② 隠し',
    advanced: '🧩 合成語ゲーム ③ 高級',
    meaning: '🧩 合成語ゲーム ④ 意味あて',
  };
  let html = '<div class="cmp-header">';
  html += '<div class="cmp-title">' + titleByMode[mode] + '</div>';
  html += '<div class="cmp-progress">問 ' + (CompoundState.qIdx+1) + ' / ' + total + ' (正解 ' + CompoundState.correct + ')</div>';
  html += '</div>';

  // 문제 카드 (모드별)
  if (mode === 'basic' || mode === 'advanced') {
    html += '<div class="cmp-question-card">';
    html += '<div class="cmp-emoji">' + q.emoji + '</div>';
    html += '<div class="cmp-meaning">「' + escapeHtml(q.ja) + '」 を つくろう!</div>';
    html += '<div class="cmp-equation">';
    if (cq.blankSide === 'a') {
      html += '<div class="cmp-word-box empty">?</div>';
      html += '<div class="cmp-plus">+</div>';
      html += '<div class="cmp-word-box">' + escapeHtml(q.b) + '</div>';
    } else {
      html += '<div class="cmp-word-box">' + escapeHtml(q.a) + '</div>';
      html += '<div class="cmp-plus">+</div>';
      html += '<div class="cmp-word-box empty">?</div>';
    }
    html += '<div class="cmp-equal">=</div>';
    html += '<div class="cmp-word-box" style="background:#fef0d8;border-color:#d4905a;">' + escapeHtml(q.word) + '</div>';
    html += '</div></div>';
    // 4지선다
    html += '<div class="cmp-options">';
    cq.options.forEach((opt, i) => {
      html += '<div class="cmp-opt" data-i="' + i + '">' + escapeHtml(opt) + '</div>';
    });
    html += '</div>';
  } else if (mode === 'hidden') {
    // 양쪽 빈칸: 합성어와 의미만 보여주고 두 단어 모두 추리
    html += '<div class="cmp-question-card">';
    html += '<div class="cmp-emoji">' + q.emoji + '</div>';
    html += '<div class="cmp-meaning">「' + escapeHtml(q.ja) + '」 を 完成させよう!</div>';
    html += '<div class="cmp-equation">';
    html += '<div class="cmp-word-box empty' + (cq.aChosen >= 0 ? ' filled-a' : '') + '" id="cmpBlankA">' +
      (cq.aChosen >= 0 ? escapeHtml(cq.aOptions[cq.aChosen]) : 'A?') + '</div>';
    html += '<div class="cmp-plus">+</div>';
    html += '<div class="cmp-word-box empty' + (cq.bChosen >= 0 ? ' filled-b' : '') + '" id="cmpBlankB">' +
      (cq.bChosen >= 0 ? escapeHtml(cq.bOptions[cq.bChosen]) : 'B?') + '</div>';
    html += '<div class="cmp-equal">=</div>';
    html += '<div class="cmp-word-box" style="background:#fef0d8;border-color:#d4905a;">' + escapeHtml(q.word) + '</div>';
    html += '</div></div>';
    // 두 줄로 옵션 표시
    html += '<div style="font-family:RocknRoll One;font-size:13px;color:var(--accent-red);text-align:center;margin:8px 0 6px;">▼ A の選択</div>';
    html += '<div class="cmp-options">';
    cq.aOptions.forEach((opt, i) => {
      const cls = (cq.aChosen === i) ? ' answered correct' : '';
      html += '<div class="cmp-opt' + cls + '" data-side="a" data-i="' + i + '">' + escapeHtml(opt) + '</div>';
    });
    html += '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:13px;color:var(--accent-red);text-align:center;margin:12px 0 6px;">▼ B の選択</div>';
    html += '<div class="cmp-options">';
    cq.bOptions.forEach((opt, i) => {
      const cls = (cq.bChosen === i) ? ' answered correct' : '';
      html += '<div class="cmp-opt' + cls + '" data-side="b" data-i="' + i + '">' + escapeHtml(opt) + '</div>';
    });
    html += '</div>';
  } else if (mode === 'meaning') {
    // 합성어 보여주고 의미 4지선다
    html += '<div class="cmp-question-card">';
    html += '<div class="cmp-emoji">' + q.emoji + '</div>';
    html += '<div style="font-family:Klee One;font-size:24px;color:var(--deep-ink);font-weight:bold;margin:8px 0 4px;">' + escapeHtml(q.word) + '</div>';
    html += '<div style="font-size:12px;color:var(--ink);">(' + escapeHtml(q.a) + ' + ' + escapeHtml(q.b) + ')</div>';
    html += '<div class="cmp-meaning" style="margin-top:10px;font-size:13px;color:var(--accent-red);">この単語の 意味は?</div>';
    html += '</div>';
    // 4지선다 (의미)
    html += '<div class="cmp-options" style="grid-template-columns:1fr;">';
    cq.options.forEach((opt, i) => {
      html += '<div class="cmp-opt" data-i="' + i + '">' + escapeHtml(opt) + '</div>';
    });
    html += '</div>';
  }
  html += '<div id="cmpFeedback"></div>';

  area.innerHTML = html;
  CompoundState.answered = false;

  // 이벤트 - 모드별
  if (mode === 'hidden') {
    // 양쪽 모두 답해야 채점
    area.querySelectorAll('.cmp-opt').forEach(opt => {
      opt.onclick = () => {
        if (CompoundState.answered) return;
        const side = opt.dataset.side;
        const i = parseInt(opt.dataset.i);
        if (side === 'a') {
          if (cq.aChosen >= 0) return;
          cq.aChosen = i;
        } else {
          if (cq.bChosen >= 0) return;
          cq.bChosen = i;
        }
        sfx('click');
        // 둘 다 선택했는지
        if (cq.aChosen >= 0 && cq.bChosen >= 0) {
          CompoundState.answered = true;
          const aOk = cq.aChosen === cq.aCorrectIdx;
          const bOk = cq.bChosen === cq.bCorrectIdx;
          const allOk = aOk && bOk;
          // 색상 칠하기
          area.querySelectorAll('.cmp-opt[data-side="a"]').forEach((o, idx) => {
            o.classList.add('answered');
            if (idx === cq.aCorrectIdx) o.classList.add('correct');
            else if (idx === cq.aChosen) o.classList.add('wrong');
          });
          area.querySelectorAll('.cmp-opt[data-side="b"]').forEach((o, idx) => {
            o.classList.add('answered');
            if (idx === cq.bCorrectIdx) o.classList.add('correct');
            else if (idx === cq.bChosen) o.classList.add('wrong');
          });
          if (allOk) { CompoundState.correct++; sfx('correct'); }
          else sfx('wrong');
          showCmpFeedback(q, allOk);
        } else {
          // 부분 진행 - 다시 그리기 (선택 표시)
          renderCompound();
          // currentQ는 유지됨 (idx가 같으므로)
        }
      };
    });
  } else {
    // basic / advanced / meaning
    area.querySelectorAll('.cmp-opt').forEach(opt => {
      opt.onclick = () => {
        if (CompoundState.answered) return;
        CompoundState.answered = true;
        const chosen = parseInt(opt.dataset.i);
        const correctIdx = cq.correctIdx;
        area.querySelectorAll('.cmp-opt').forEach((o, i) => {
          o.classList.add('answered');
          if (i === correctIdx) o.classList.add('correct');
          else if (i === chosen) o.classList.add('wrong');
        });
        const ok = chosen === correctIdx;
        if (ok) { CompoundState.correct++; sfx('correct'); }
        else sfx('wrong');
        showCmpFeedback(q, ok);
      };
    });
  }
}

function showCmpFeedback(q, ok) {
  const fb = document.getElementById('cmpFeedback');
  let fbHtml = '<div class="cmp-feedback ' + (ok ? 'ok' : 'ng') + '">';
  fbHtml += ok ? '🎉 正解!' : '✗ ざんねん…';
  fbHtml += '</div>';
  fbHtml += '<div class="cmp-result-text" style="text-align:center;">';
  fbHtml += '<strong>' + escapeHtml(q.a) + '</strong> + <strong>' + escapeHtml(q.b) + '</strong> = <strong>' + escapeHtml(q.word) + '</strong>';
  fbHtml += '<br>(' + escapeHtml(q.ja) + ')';
  fbHtml += '</div>';
  fbHtml += '<button class="cmp-next-btn" id="cmpNext">次へ →</button>';
  fb.innerHTML = fbHtml;
  document.getElementById('cmpNext').onclick = () => {
    CompoundState.qIdx++;
    CompoundState.currentQ = null;
    renderCompound();
  };
}

