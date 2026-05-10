/* engine/ui-modal.js — extracted from index.html (v73 step4b)
 * Original locations: lines 789-1000 (PAGE NAV + CHAPTER GRID), 1675-1736 (MODAL & UTILITIES)
 * Contents: PAGE NAVIGATION (showPage, switchTab), CHAPTER GRID (buildChapterGrid), MODAL (showModal, closeModal), NOTEBOOK (openNotebook, closeNotebook), CONFETTI (triggerConfetti, launchConfetti alias)
 * Dependencies: State (core.js), STORY/EXTRA_STORIES/ENG_MYSTERY_STORIES (data/stories.js), buildChapterGrid called by event bindings + many cross-module places
 * Load order: after core.js, before story.js (which calls showPage/switchTab from finish flows)
 */
// ============================================================
// PAGE NAVIGATION
// ============================================================
function showPage(id) {
  // 게임 페이지를 떠나면 게임 정리
  if (id !== 'pageGame' && typeof CurrentGame !== 'undefined' && CurrentGame) {
    if (CurrentGame.cleanup) CurrentGame.cleanup();
    CurrentGame = null;
  }
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  sfx('page');
}

// ============================================================
// CHAPTER GRID
// ============================================================
function switchTab(tab) {
  State.currentTab = tab;
  document.getElementById('tabStory').classList.toggle('active', tab === 'story');
  document.getElementById('tabEng').classList.toggle('active', tab === 'eng');
  document.getElementById('tabQuiz').classList.toggle('active', tab === 'quiz');
  document.getElementById('tabGame').classList.toggle('active', tab === 'game');
  document.getElementById('tabScience').classList.toggle('active', tab === 'science');
  document.getElementById('tabWorld').classList.toggle('active', tab === 'world');
  document.getElementById('tabLit').classList.toggle('active', tab === 'lit');
  document.getElementById('tabBiz').classList.toggle('active', tab === 'biz');
  document.getElementById('tabHist').classList.toggle('active', tab === 'hist');
  document.getElementById('tabSoc').classList.toggle('active', tab === 'soc');
  document.getElementById('tabMon').classList.toggle('active', tab === 'mon');
  document.getElementById('tabWea').classList.toggle('active', tab === 'wea');
  const tabMathEl = document.getElementById('tabMath');
  if (tabMathEl) tabMathEl.classList.toggle('active', tab === 'math');
  const tabSciEl = document.getElementById('tabScientists');
  if (tabSciEl) tabSciEl.classList.toggle('active', tab === 'scientists');
  buildChapterGrid();
}

function buildChapterGrid() {
  const grid = document.getElementById('chapterGrid');
  grid.innerHTML = '';

  // 영어 탭이면 챕터 재빌드 (복습 챕터가 동적으로 생기므로)
  if (State.currentTab === 'eng') {
    ENG_CHAPTERS = buildAllChapters();
    // engCleared 길이 동기화
    while (State.engCleared.length < ENG_CHAPTERS.length) State.engCleared.push(false);
  }

  // 통계 표시
  const statBar = document.createElement('div');
  statBar.style.cssText = 'grid-column:1/-1;background:white;padding:14px 18px;border-radius:14px;border:3px solid var(--line);box-shadow:0 4px 0 var(--line);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:4px;';
  const wrongCount = Object.keys(State.wrongWords).length;
  const tokens = State.gameTokens || 0;
  statBar.innerHTML =
    '<div style="font-family:RocknRoll One;font-size:13px;color:var(--deep-ink);">' +
      '✅ ' + State.stats.totalCorrect + ' &nbsp; ❌ ' + State.stats.totalWrong + ' &nbsp; 📝 ' + wrongCount + ' &nbsp; 🎮 ' + tokens +
    '</div>' +
    '<button id="btnReset" style="background:#c4625e;color:white;border:none;padding:6px 14px;border-radius:16px;font-family:RocknRoll One;font-size:12px;cursor:pointer;box-shadow:0 3px 0 #993a35;">きろくリセット</button>';
  grid.appendChild(statBar);

  if (State.currentTab === 'story') {
    STORY.forEach((ch, i) => {
      // v27: 이전 장 클리어 + 이전 장 관문 통과(15장은 14장까지)가 조건
      const locked = i > 0 && (!State.cleared[i - 1] || !State.gateCleared[i - 1]);
      const cleared = State.cleared[i];
      const gateCleared = State.gateCleared[i];
      const card = document.createElement('div');
      card.className = 'chapter-card' + (locked ? ' locked' : '') + (cleared ? ' cleared' : '');
      card.innerHTML =
        '<div class="chapter-num">第' + ch.id + '章</div>' +
        '<div class="chapter-icon-big">' + ch.icon + '</div>' +
        '<div class="chapter-title">' + ch.title + '</div>' +
        '<div class="chapter-desc">' + ch.desc + '</div>' +
        '<div class="chapter-stars">' + (gateCleared ? '⭐⭐⭐' : (cleared ? '⭐⭐' : '')) + '</div>' +
        (locked ? '<div class="chapter-lock">🔒</div>' : '') +
        (cleared && !gateCleared ? '<div style="position:absolute;top:6px;right:6px;background:#ffc850;color:#2d1b3d;font-size:10px;padding:2px 6px;border-radius:8px;font-family:RocknRoll One;">関門!</div>' : '');
      if (!locked) {
        // 클리어했지만 관문 미통과 → 관문으로
        if (cleared && !gateCleared) {
          card.onclick = () => { sfx('click'); startGate(i); };
        } else {
          card.onclick = () => { sfx('click'); startChapter(i); };
        }
      }
      grid.appendChild(card);
    });
  } else if (State.currentTab === 'eng') {
    // === 영어 탭 ===
    // 카테고리 sub-탭 추가 (방안 1)
    const subTabBar = document.createElement('div');
    subTabBar.style.cssText = 'grid-column:1/-1;display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:6px;';
    const subTabs = [
      { id: 'vocab',   label: '📚 単語' },
      { id: 'learn',   label: '📖 学習' },  // v77: 単語·熟語 学習 (vocab-learn.js modal)
      { id: 'writing', label: '✍️ ライティング' },
      { id: 'grammar', label: '📐 2級文法' },
      { id: 'pre1',    label: '🎯 準1級' },
      { id: 'extra',   label: '📝 追加' },
    ];
    subTabs.forEach(t => {
      const btn = document.createElement('button');
      // 'learn' is action-style (opens modal), not a state tab — never appears active
      const active = t.id !== 'learn' && State.engSubTab === t.id;
      btn.style.cssText = 'background:' + (active ? 'var(--accent-red)' : 'white') +
        ';color:' + (active ? 'white' : 'var(--ink)') + ';border:3px solid var(--line)' +
        ';padding:6px 14px;border-radius:18px;font-family:RocknRoll One;font-size:12px;cursor:pointer;' +
        (active ? 'border-color:var(--accent-red);' : '');
      btn.textContent = t.label;
      btn.onclick = () => {
        sfx('click');
        if (t.id === 'learn') {
          // v77: open vocab-learn modal instead of switching sub-tab
          if (typeof openVocabLearn === 'function') openVocabLearn();
          return;
        }
        State.engSubTab = t.id;
        buildChapterGrid();
      };
      subTabBar.appendChild(btn);
    });
    grid.appendChild(subTabBar);

    // sub-탭 별 챕터 필터링
    const filterChapter = (ch) => {
      const id = ch.id || '';
      // 추리 + 단어 챕터는 vocab 탭으로
      if (State.engSubTab === 'vocab') {
        return ch.isEngMystery || ch.isReview ||
          (!ch.isWriting && !ch.isGrammar && !ch.isComposition && !ch.isPhraseDict && !ch.isDailyMission && !ch.isNews && !ch.isCompound);
      }
      if (State.engSubTab === 'writing') return ch.isWriting === true && !ch.isPre1; // 2급 라이팅만
      if (State.engSubTab === 'grammar') return ch.isGrammar === true && !ch.isPre1; // 2급 문법만
      if (State.engSubTab === 'pre1') return ch.isPre1 === true; // 준1급 (문법 + 라이팅)
      if (State.engSubTab === 'extra') {
        return ch.isComposition || ch.isPhraseDict || ch.isDailyMission || ch.isNews || ch.isCompound;
      }
      return true;
    };

    let cardsAdded = 0;
    ENG_CHAPTERS.forEach((ch, i) => {
      if (!filterChapter(ch)) return;
      cardsAdded++;
      const cleared = State.engCleared[i];
      const isReview = ch.isReview;
      const isEngMystery = ch.isEngMystery;
      const card = document.createElement('div');
      card.className = 'chapter-card eng' + (cleared ? ' cleared' : '');
      let style = '';
      if (isReview) style = 'border-color:#c4625e;background:#fff0ee;box-shadow:0 5px 0 #993a35;';
      else if (isEngMystery) style = 'border-color:#9b87bc;background:#f3edf9;box-shadow:0 5px 0 #6a5688;';
      else if (ch.isPre1) style = 'border-color:#a04ab0;background:#f8e8ff;box-shadow:0 5px 0 #7a2a8a;';
      else if (ch.isWriting) style = 'border-color:#d77;background:#fff5f0;box-shadow:0 5px 0 #b85;';
      else if (ch.isGrammar) style = 'border-color:#8aa86a;background:#f0f5e8;box-shadow:0 5px 0 #6a8a4a;';
      else if (ch.isComposition) style = 'border-color:#9b87bc;background:#f3edf9;box-shadow:0 5px 0 #6a5688;';
      else if (ch.isPhraseDict) style = 'border-color:#d4905a;background:#fff5e8;box-shadow:0 5px 0 #b06a3a;';
      else if (ch.isDailyMission) style = 'border-color:#6a9a4a;background:#ecf6e0;box-shadow:0 5px 0 #4a7a2a;';
      else if (ch.isNews) style = 'border-color:#5a7aa6;background:#ecf0f8;box-shadow:0 5px 0 #3a5a86;';
      else if (ch.isCompound) style = 'border-color:#d4905a;background:#fef5e8;box-shadow:0 5px 0 #b06a3a;';
      card.style.cssText = style;
      let label;
      if (isReview) label = '復習!';
      else if (isEngMystery) label = '推理+英語';
      else if (ch.isPre1) label = '準1級';
      else label = (ch.id || '').toUpperCase();
      card.innerHTML =
        '<div class="chapter-num">' + label + '</div>' +
        '<div class="chapter-icon-big">' + ch.icon + '</div>' +
        '<div class="chapter-title">' + ch.title + '</div>' +
        '<div class="chapter-desc">' + ch.desc + (isReview ? ' (' + Object.keys(State.wrongWords).length + '個)' : '') + '</div>' +
        '<div class="chapter-stars">' + (cleared ? '⭐⭐⭐' : '') + '</div>';
      card.onclick = () => { sfx('click'); startEngChapter(i); };
      grid.appendChild(card);
    });

    // 빈 카테고리일 때 안내
    if (cardsAdded === 0) {
      const emptyMsg = document.createElement('div');
      emptyMsg.style.cssText = 'grid-column:1/-1;text-align:center;padding:30px;color:var(--ink);font-family:Klee One;';
      emptyMsg.textContent = 'このカテゴリには まだ チャプターが ありません。';
      grid.appendChild(emptyMsg);
    }
  } else if (State.currentTab === 'quiz') {
    buildQuizGrid(grid);
  } else if (State.currentTab === 'game') {
    buildGameGrid(grid);
  } else if (State.currentTab === 'science') {
    // v35: 과학 탭 (메인 페이지 grid에 사건 카드 표시)
    buildScienceGrid(grid);
  } else if (State.currentTab === 'world') {
    // v45: 세계 추리 탭
    buildWorldGrid(grid);
  } else if (State.currentTab === 'lit') {
    // v53: 文学・芸術 탭
    buildLitGrid(grid);
  } else if (State.currentTab === 'biz') {
    // v58: ビジネス・企業 탭
    buildBizGrid(grid);
  } else if (State.currentTab === 'hist') {
    // v62: 世界経済·貿易史 탭
    buildHistGrid(grid);
  } else if (State.currentTab === 'soc') {
    // v65: 社会科総合 탭
    buildSocGrid(grid);
  } else if (State.currentTab === 'mon') {
    // v67: 日常のお金 탭
    buildMonGrid(grid);
  } else if (State.currentTab === 'wea') {
    // v71: 🌦 気象予報士 탭
    buildWeaGrid(grid);
  } else if (State.currentTab === 'math') {
    // v75: 🔢 算数·数学 탭
    buildMathGrid(grid);
  } else if (State.currentTab === 'scientists') {
    // s4: 👨‍🔬 偉人科学者ファイル 탭
    buildScientistsGrid(grid);
  }

  // 리셋 버튼 핸들러
  const resetBtn = document.getElementById('btnReset');
  if (resetBtn) {
    resetBtn.onclick = () => {
      showModal('⚠️', 'きろくをリセット?', 'すべての クリア記録、まちがえた単語、せいせきが\n きえます。\n\nほんとうに リセットしますか?',
        [
          {text:'はい、リセット', cb:() => { resetSave(); closeModal(); buildChapterGrid(); }},
          {text:'キャンセル', cb:closeModal},
        ], 'fail');
    };
  }
}


// ============================================================
// MODAL & UTILITIES
// ============================================================
function showModal(icon, title, text, buttons, cls) {
  document.getElementById('modalIcon').textContent = icon;
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalText').textContent = text;
  const m = document.getElementById('modal');
  m.className = 'modal' + (cls ? ' ' + cls : '');
  const btns = document.getElementById('modalButtons');
  btns.innerHTML = '';
  buttons.forEach((b, i) => {
    const btn = document.createElement('button');
    btn.className = 'modal-btn' + (i > 0 ? ' secondary' : '');
    btn.textContent = b.text;
    btn.onclick = b.cb;
    btns.appendChild(btn);
  });
  document.getElementById('modalBg').classList.add('active');
}

function closeModal() {
  document.getElementById('modalBg').classList.remove('active');
}

function openNotebook() {
  sfx('page');
  const c = document.getElementById('notebookContent');
  c.innerHTML = '';
  if (State.notes.length === 0) {
    c.innerHTML = '<div style="text-align:center;color:#888;padding:30px;">まだ 何も 書いてない…</div>';
  } else {
    State.notes.forEach(n => {
      const d = document.createElement('div');
      d.className = 'note-item' + (n.title.includes('英語') ? ' eng' : '');
      d.innerHTML = '<div class="note-item-t">' + n.title + '</div>' + n.desc;
      c.appendChild(d);
    });
  }
  document.getElementById('notebookModal').classList.add('active');
}

function closeNotebook() {
  document.getElementById('notebookModal').classList.remove('active');
}

function triggerConfetti() {
  const c = document.getElementById('confetti');
  c.innerHTML = '';
  const colors = ['#e07b5e','#6ba8c4','#f0c674','#9b87bc','#6fb074'];
  for (let i = 0; i < 35; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    p.style.animationDelay = (Math.random() * 0.4) + 's';
    p.style.animationDuration = (2 + Math.random() * 1.5) + 's';
    c.appendChild(p);
  }
  setTimeout(() => c.innerHTML = '', 3500);
}
const launchConfetti = triggerConfetti;
