/* engine/vocab-learn.js — 単語·熟語 学習 タブ (English vocabulary browser + mini quiz)
 * Categories use existing ALL_VERBS/NOUNS/ADJADV/PRE1/IDIOMS arrays from data/vocab.js
 * Self-contained modal with own UI, TTS, and mini quiz. No external State changes.
 * Storage:
 *   localStorage.haruvocab_status     {en: 'known'|'review'} — per-word status
 *   localStorage.haruvocab_view_mode  'card' | 'list'
 *   localStorage.haruvocab_hide_known '0' | '1'
 */

const VLEARN_LS = {
  STATUS: 'haruvocab_status',
  VIEW_MODE: 'haruvocab_view_mode',
  HIDE_KNOWN: 'haruvocab_hide_known',
};

// Lazy compute (relies on globals from vocab.js loaded before us)
function getVlearnCategories() {
  const PRE1 = (typeof ALL_PRE1 !== 'undefined') ? ALL_PRE1 : [];
  const G2 = (typeof ALL_G2 !== 'undefined') ? ALL_G2 : [];
  const IDIOMS = (typeof ALL_IDIOMS !== 'undefined') ? ALL_IDIOMS : [];
  return [
    { id: '2kyu',   label: '2級',     words: G2 },
    { id: 'pre1',   label: '準1級',    words: PRE1 },
    { id: 'p1',     label: '準1級①',  words: PRE1.slice(0, 70) },
    { id: 'p2',     label: '準1級②',  words: PRE1.slice(60, 140) },
    { id: 'p3',     label: '準1級③',  words: PRE1.slice(130, 210) },
    { id: 'p4',     label: '準1級④',  words: PRE1.slice(200, 280) },
    { id: 'p5',     label: '準1級⑤',  words: PRE1.slice(270) },
    { id: 'idioms', label: '熟語',    words: IDIOMS },
  ];
}

const VlearnState = {
  selectedCat: '2kyu',
  viewMode: 'card',
  hideKnown: false,
  cardIdx: 0,
  statusMap: {},
  modalEl: null,
  // Mini quiz
  quizActive: false,
  quizFilter: 'all',
  quizPool: [],
  quizIdx: 0,
  quizCorrect: 0,
  quizDistractors: [],
  quizCurrent: null,
};

function vlLoadLS() {
  try {
    const s = localStorage.getItem(VLEARN_LS.STATUS);
    VlearnState.statusMap = s ? JSON.parse(s) : {};
  } catch (e) { VlearnState.statusMap = {}; }
  VlearnState.viewMode = localStorage.getItem(VLEARN_LS.VIEW_MODE) === 'list' ? 'list' : 'card';
  VlearnState.hideKnown = localStorage.getItem(VLEARN_LS.HIDE_KNOWN) === '1';
}
function vlSaveStatus() {
  try { localStorage.setItem(VLEARN_LS.STATUS, JSON.stringify(VlearnState.statusMap)); } catch (e) {}
}
function vlSavePrefs() {
  try {
    localStorage.setItem(VLEARN_LS.VIEW_MODE, VlearnState.viewMode);
    localStorage.setItem(VLEARN_LS.HIDE_KNOWN, VlearnState.hideKnown ? '1' : '0');
  } catch (e) {}
}

function vlEscapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function vlGetCurrentList() {
  const cats = getVlearnCategories();
  const cat = cats.find(c => c.id === VlearnState.selectedCat) || cats[0];
  let list = cat.words || [];
  if (VlearnState.hideKnown) {
    list = list.filter(w => VlearnState.statusMap[w.en] !== 'known');
  }
  return list;
}

function vlGetCategoryStats(catId) {
  const cats = getVlearnCategories();
  const cat = cats.find(c => c.id === catId);
  if (!cat) return { known: 0, review: 0, total: 0 };
  let known = 0, review = 0;
  for (const w of cat.words) {
    const s = VlearnState.statusMap[w.en];
    if (s === 'known') known++;
    else if (s === 'review') review++;
  }
  return { known, review, total: cat.words.length };
}

// ===== TTS (English) =====
let _vlEnVoice = null;
function vlPickEnVoice() {
  if (!('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) return null;
  return voices.find(v => /^en-US/i.test(v.lang)) ||
         voices.find(v => /^en-GB/i.test(v.lang)) ||
         voices.find(v => /^en/i.test(v.lang)) ||
         null;
}
function vlSpeak(text) {
  if (!('speechSynthesis' in window) || !text) return;
  try { window.speechSynthesis.cancel(); } catch (e) {}
  if (!_vlEnVoice) _vlEnVoice = vlPickEnVoice();
  const u = new SpeechSynthesisUtterance(text);
  if (_vlEnVoice) { u.voice = _vlEnVoice; u.lang = _vlEnVoice.lang; }
  else { u.lang = 'en-US'; }
  u.rate = 0.9;
  u.pitch = 1.0;
  try { window.speechSynthesis.speak(u); } catch (e) {}
}

// ===== Modal =====
function vlEnsureModal() {
  if (VlearnState.modalEl) return VlearnState.modalEl;
  const m = document.createElement('div');
  m.className = 'vlearn-modal vlearn-hidden';
  m.innerHTML = `
    <div class="vlearn-content">
      <div class="vlearn-topbar">
        <button class="vlearn-back" id="vlearnBack">← 戻る</button>
        <div class="vlearn-title">📖 単語·熟語 学習</div>
        <div class="vlearn-stats" id="vlearnStats"></div>
      </div>
      <div class="vlearn-toolbar">
        <div class="vlearn-cat-tabs" id="vlearnCatTabs"></div>
        <div class="vlearn-mode-toggle" id="vlearnModeToggle"></div>
      </div>
      <div class="vlearn-body" id="vlearnBody"></div>
      <div class="vlearn-footer">
        <label class="vlearn-hide-toggle">
          <input type="checkbox" id="vlearnHideKnown"> 覚えた語を 隠す
        </label>
        <button class="vlearn-quiz-btn" id="vlearnQuizBtn">▶ このカテゴリの クイズ</button>
      </div>
    </div>
  `;
  document.body.appendChild(m);
  VlearnState.modalEl = m;
  vlBindEvents();
  return m;
}

function vlBindEvents() {
  document.getElementById('vlearnBack').onclick = closeVocabLearn;
  document.getElementById('vlearnHideKnown').onclick = (e) => {
    VlearnState.hideKnown = e.target.checked;
    vlSavePrefs();
    VlearnState.cardIdx = 0;
    vlRenderBody();
    vlRenderStats();
  };
  document.getElementById('vlearnQuizBtn').onclick = vlOpenQuizFilter;
  document.addEventListener('keydown', vlKeyHandler);
}

function vlKeyHandler(e) {
  if (!VlearnState.modalEl || VlearnState.modalEl.classList.contains('vlearn-hidden')) return;
  if (VlearnState.quizActive) return;
  if (VlearnState.viewMode !== 'card') return;
  if (e.key === 'ArrowLeft') { e.preventDefault(); vlPrevCard(); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); vlNextCard(); }
}

function openVocabLearn() {
  vlLoadLS();
  vlEnsureModal();
  VlearnState.quizActive = false;
  VlearnState.modalEl.classList.remove('vlearn-hidden');
  // Trigger voices load (Chrome lazy)
  if ('speechSynthesis' in window) {
    try { window.speechSynthesis.getVoices(); } catch (e) {}
  }
  vlRenderAll();
}

function closeVocabLearn() {
  if (VlearnState.modalEl) VlearnState.modalEl.classList.add('vlearn-hidden');
  try { window.speechSynthesis.cancel(); } catch (e) {}
}

// ===== Render =====
function vlRenderAll() {
  vlRenderCatTabs();
  vlRenderModeToggle();
  document.getElementById('vlearnHideKnown').checked = VlearnState.hideKnown;
  vlRenderStats();
  vlRenderBody();
}

function vlRenderCatTabs() {
  const wrap = document.getElementById('vlearnCatTabs');
  if (!wrap) return;
  const cats = getVlearnCategories();
  let html = '';
  for (const c of cats) {
    const stats = vlGetCategoryStats(c.id);
    const active = c.id === VlearnState.selectedCat;
    html += `<button class="vlearn-cat-tab ${active ? 'vlearn-cat-tab-active' : ''}" data-cat="${vlEscapeHtml(c.id)}">${vlEscapeHtml(c.label)}<span class="vlearn-cat-count">${stats.total}</span></button>`;
  }
  wrap.innerHTML = html;
  wrap.querySelectorAll('.vlearn-cat-tab').forEach(b => {
    b.onclick = () => {
      VlearnState.quizActive = false;
      VlearnState.selectedCat = b.dataset.cat;
      VlearnState.cardIdx = 0;
      vlRenderAll();
    };
  });
}

function vlRenderModeToggle() {
  const wrap = document.getElementById('vlearnModeToggle');
  if (!wrap) return;
  wrap.innerHTML = `
    <button class="vlearn-mode-btn ${VlearnState.viewMode === 'card' ? 'vlearn-mode-btn-active' : ''}" data-mode="card">📑 カード</button>
    <button class="vlearn-mode-btn ${VlearnState.viewMode === 'list' ? 'vlearn-mode-btn-active' : ''}" data-mode="list">📋 リスト</button>
  `;
  wrap.querySelectorAll('.vlearn-mode-btn').forEach(b => {
    b.onclick = () => {
      VlearnState.viewMode = b.dataset.mode;
      vlSavePrefs();
      vlRenderModeToggle();
      vlRenderBody();
    };
  });
}

function vlRenderStats() {
  const wrap = document.getElementById('vlearnStats');
  if (!wrap) return;
  const s = vlGetCategoryStats(VlearnState.selectedCat);
  wrap.textContent = `✓${s.known} ⭕${s.review} / ${s.total}`;
}

function vlRenderBody() {
  const body = document.getElementById('vlearnBody');
  if (!body) return;
  if (VlearnState.quizActive) { vlRenderQuiz(); return; }
  if (VlearnState.viewMode === 'card') vlRenderCard(body);
  else vlRenderList(body);
}

// ===== Card mode =====
function vlRenderCard(body) {
  const list = vlGetCurrentList();
  if (!list.length) {
    body.innerHTML = `<div class="vlearn-empty">表示する語が ありません。<br>「覚えた語を 隠す」 を OFF にすると 全部 表示されます。</div>`;
    return;
  }
  if (VlearnState.cardIdx >= list.length) VlearnState.cardIdx = list.length - 1;
  if (VlearnState.cardIdx < 0) VlearnState.cardIdx = 0;
  const item = list[VlearnState.cardIdx];
  const status = VlearnState.statusMap[item.en] || '';
  const badge = status === 'known' ? '<span class="vlearn-status-badge vlearn-known">✓ 覚えた</span>'
              : status === 'review' ? '<span class="vlearn-status-badge vlearn-review">⭕ 復習</span>' : '';
  body.innerHTML = `
    <div class="vlearn-card">
      <div class="vlearn-card-nav">
        <button class="vlearn-nav-btn" id="vlearnPrev" ${VlearnState.cardIdx === 0 ? 'disabled' : ''}>← 前へ</button>
        <button class="vlearn-nav-btn" id="vlearnNext" ${VlearnState.cardIdx >= list.length - 1 ? 'disabled' : ''}>次へ →</button>
      </div>
      <div class="vlearn-card-status">${badge}</div>
      <div class="vlearn-card-word">${vlEscapeHtml(item.en)}</div>
      <div class="vlearn-card-def">${vlEscapeHtml(item.ja)}</div>
      <button class="vlearn-tts-btn" id="vlearnTtsCard">🔊 発音</button>
      <div class="vlearn-card-actions">
        <button class="vlearn-action-btn vlearn-action-known" data-action="known">✓ 覚えた</button>
        <button class="vlearn-action-btn vlearn-action-review" data-action="review">⭕ 復習</button>
        <button class="vlearn-action-btn vlearn-action-clear" data-action="clear">─ 解除</button>
      </div>
      <div class="vlearn-card-index">${VlearnState.cardIdx + 1} / ${list.length}</div>
    </div>
  `;
  document.getElementById('vlearnPrev').onclick = vlPrevCard;
  document.getElementById('vlearnNext').onclick = vlNextCard;
  document.getElementById('vlearnTtsCard').onclick = () => vlSpeak(item.en);
  body.querySelectorAll('.vlearn-action-btn').forEach(b => {
    b.onclick = () => {
      const action = b.dataset.action;
      if (action === 'known') {
        VlearnState.statusMap[item.en] = 'known';
        vlSaveStatus();
        vlNextCard();
        vlRenderStats();
        vlRenderCatTabs();
      } else if (action === 'review') {
        VlearnState.statusMap[item.en] = 'review';
        vlSaveStatus();
        vlRenderCard(body);
        vlRenderStats();
        vlRenderCatTabs();
      } else {
        delete VlearnState.statusMap[item.en];
        vlSaveStatus();
        vlRenderCard(body);
        vlRenderStats();
        vlRenderCatTabs();
      }
    };
  });
}

function vlPrevCard() {
  if (VlearnState.cardIdx > 0) { VlearnState.cardIdx--; vlRenderBody(); }
}
function vlNextCard() {
  const list = vlGetCurrentList();
  if (VlearnState.cardIdx < list.length - 1) {
    VlearnState.cardIdx++;
  }
  vlRenderBody();
}

// ===== List mode =====
function vlRenderList(body) {
  const list = vlGetCurrentList();
  if (!list.length) {
    body.innerHTML = `<div class="vlearn-empty">表示する語が ありません。</div>`;
    return;
  }
  let html = '<div class="vlearn-list">';
  for (const item of list) {
    const status = VlearnState.statusMap[item.en] || '';
    const icon = status === 'known' ? '✓' : status === 'review' ? '⭕' : '·';
    const cls = `vlearn-list-item ${status === 'known' ? 'vlearn-status-known' : status === 'review' ? 'vlearn-status-review' : ''}`;
    const en = vlEscapeHtml(item.en);
    html += `
      <div class="${cls}">
        <button class="vlearn-list-status" data-en="${en}" type="button">${icon}</button>
        <div class="vlearn-list-text">
          <span class="vlearn-list-en">${en}</span>
          <span class="vlearn-list-ja">${vlEscapeHtml(item.ja)}</span>
        </div>
        <button class="vlearn-list-tts" data-en="${en}" type="button">🔊</button>
      </div>
    `;
  }
  html += '</div>';
  body.innerHTML = html;
  body.querySelectorAll('.vlearn-list-status').forEach(b => {
    b.onclick = (ev) => {
      ev.stopPropagation();
      const en = b.dataset.en;
      const cur = VlearnState.statusMap[en];
      if (!cur) VlearnState.statusMap[en] = 'known';
      else if (cur === 'known') VlearnState.statusMap[en] = 'review';
      else delete VlearnState.statusMap[en];
      vlSaveStatus();
      vlRenderBody();
      vlRenderStats();
      vlRenderCatTabs();
    };
  });
  body.querySelectorAll('.vlearn-list-tts').forEach(b => {
    b.onclick = (ev) => { ev.stopPropagation(); vlSpeak(b.dataset.en); };
  });
}

// ===== Mini Quiz =====
function vlOpenQuizFilter() {
  const cats = getVlearnCategories();
  const cat = cats.find(c => c.id === VlearnState.selectedCat);
  if (!cat) return;
  const total = cat.words.length;
  const stats = vlGetCategoryStats(VlearnState.selectedCat);
  const knownCount = stats.known;
  const unknownCount = total - knownCount;
  const wrap = document.createElement('div');
  wrap.className = 'vlearn-filter-overlay';
  wrap.innerHTML = `
    <div class="vlearn-filter-box">
      <div class="vlearn-filter-title">クイズ範囲を 選択</div>
      <button class="vlearn-filter-btn" data-filter="all">全部 (${total})</button>
      <button class="vlearn-filter-btn" data-filter="known" ${knownCount < 4 ? 'disabled' : ''}>覚えた語のみ (${knownCount})</button>
      <button class="vlearn-filter-btn" data-filter="unknown" ${unknownCount < 4 ? 'disabled' : ''}>覚えていない語のみ (${unknownCount})</button>
      <button class="vlearn-filter-cancel" data-filter="cancel">キャンセル</button>
    </div>
  `;
  document.body.appendChild(wrap);
  wrap.querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      const f = b.dataset.filter;
      document.body.removeChild(wrap);
      if (f && f !== 'cancel') vlStartQuiz(f);
    };
  });
}

function vlStartQuiz(filter) {
  const cats = getVlearnCategories();
  const cat = cats.find(c => c.id === VlearnState.selectedCat);
  if (!cat) return;
  let pool = [...cat.words];
  if (filter === 'known') pool = pool.filter(w => VlearnState.statusMap[w.en] === 'known');
  else if (filter === 'unknown') pool = pool.filter(w => VlearnState.statusMap[w.en] !== 'known');
  if (pool.length < 4) {
    alert('クイズに必要な単語が 4個以上 必要です。');
    return;
  }
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  const count = Math.min(15, pool.length);
  VlearnState.quizPool = pool.slice(0, count);
  VlearnState.quizDistractors = cat.words;
  VlearnState.quizFilter = filter;
  VlearnState.quizIdx = 0;
  VlearnState.quizCorrect = 0;
  VlearnState.quizActive = true;
  vlRenderQuiz();
}

function vlRenderQuiz() {
  const body = document.getElementById('vlearnBody');
  if (!body) return;
  if (VlearnState.quizIdx >= VlearnState.quizPool.length) {
    const total = VlearnState.quizPool.length;
    const pct = Math.round(VlearnState.quizCorrect / total * 100);
    const icon = pct === 100 ? '🏆' : pct >= 70 ? '🎉' : '💪';
    body.innerHTML = `
      <div class="vlearn-quiz-result">
        <div class="vlearn-quiz-icon">${icon}</div>
        <div class="vlearn-quiz-score">${VlearnState.quizCorrect} / ${total} (${pct}%)</div>
        <div class="vlearn-quiz-actions">
          <button class="vlearn-action-btn vlearn-action-known" id="vlearnQuizRetry">▶ もう一度</button>
          <button class="vlearn-action-btn vlearn-action-clear" id="vlearnQuizExit">学習に戻る</button>
        </div>
      </div>
    `;
    document.getElementById('vlearnQuizRetry').onclick = () => vlStartQuiz(VlearnState.quizFilter);
    document.getElementById('vlearnQuizExit').onclick = () => {
      VlearnState.quizActive = false;
      vlRenderBody();
    };
    return;
  }
  const item = VlearnState.quizPool[VlearnState.quizIdx];
  // Build 4 options: 1 correct + 3 random distractors (from category, not the word itself)
  const distractors = [];
  const seen = new Set([item.en]);
  let safety = 0;
  while (distractors.length < 3 && safety++ < 200) {
    const d = VlearnState.quizDistractors[Math.floor(Math.random() * VlearnState.quizDistractors.length)];
    if (d && !seen.has(d.en) && d.ja !== item.ja) {
      distractors.push(d);
      seen.add(d.en);
    }
  }
  // If safety bailed (very small category), pad with whatever
  while (distractors.length < 3) {
    const d = VlearnState.quizDistractors[Math.floor(Math.random() * VlearnState.quizDistractors.length)];
    if (d && !seen.has(d.en)) { distractors.push(d); seen.add(d.en); }
    else break;
  }
  const options = [{ ja: item.ja, correct: true }, ...distractors.map(d => ({ ja: d.ja, correct: false }))];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  VlearnState.quizCurrent = { item, options, answered: false };
  body.innerHTML = `
    <div class="vlearn-quiz">
      <div class="vlearn-quiz-progress">${VlearnState.quizIdx + 1} / ${VlearnState.quizPool.length}　正解 ${VlearnState.quizCorrect}</div>
      <div class="vlearn-quiz-question">
        <div class="vlearn-quiz-en">${vlEscapeHtml(item.en)}</div>
        <button class="vlearn-tts-btn" id="vlearnQuizTts" type="button">🔊</button>
      </div>
      <div class="vlearn-quiz-prompt">この単語の 意味は?</div>
      <div class="vlearn-quiz-options">
        ${options.map((o, i) => `<button class="vlearn-quiz-opt" data-i="${i}" data-correct="${o.correct ? '1' : '0'}" type="button">${vlEscapeHtml(o.ja)}</button>`).join('')}
      </div>
      <div class="vlearn-quiz-feedback" id="vlearnQuizFb"></div>
    </div>
  `;
  document.getElementById('vlearnQuizTts').onclick = () => vlSpeak(item.en);
  body.querySelectorAll('.vlearn-quiz-opt').forEach(b => {
    b.onclick = () => {
      if (VlearnState.quizCurrent.answered) return;
      VlearnState.quizCurrent.answered = true;
      const isCorrect = b.dataset.correct === '1';
      body.querySelectorAll('.vlearn-quiz-opt').forEach(o => {
        if (o.dataset.correct === '1') o.classList.add('vlearn-opt-correct');
        else if (o === b) o.classList.add('vlearn-opt-wrong');
        o.disabled = true;
      });
      if (isCorrect) VlearnState.quizCorrect++;
      const fb = document.getElementById('vlearnQuizFb');
      const isLast = VlearnState.quizIdx >= VlearnState.quizPool.length - 1;
      fb.innerHTML = `
        <div class="vlearn-quiz-fb-msg">${isCorrect ? '🎉 正解!' : '✗ 残念… 正解は ' + vlEscapeHtml(item.ja)}</div>
        <button class="vlearn-action-btn vlearn-action-known" id="vlearnQuizNext" type="button">${isLast ? '結果を 見る →' : '次へ →'}</button>
      `;
      document.getElementById('vlearnQuizNext').onclick = () => {
        VlearnState.quizIdx++;
        vlRenderQuiz();
      };
    };
  });
}

// Expose globals for ui-modal.js sub-tab onclick
if (typeof window !== 'undefined') {
  window.openVocabLearn = openVocabLearn;
  window.closeVocabLearn = closeVocabLearn;
}
