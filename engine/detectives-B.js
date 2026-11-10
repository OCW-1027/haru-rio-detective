/* engine/detectives-B.js — extracted from index.html (v73 step4a)
 * Original location: lines 5867-8099 (current index.html)
 * Contents: Hist (世界経済・貿易史), Soc (社会), Mon (お金), Wea (気象予報士) detective functions (build/start/render/bind × 4)
 * Dependencies: State, HistState/SocState/MonState/WeaState (defined in detectives-A.js — load AFTER it), sfx, showModal, showPage, saveState, speakLine, stopVoice, recordGameBest, series7-trade/series8-social/series9-money/series10-weather (series .js files)
 */

// =========== 🌐 世界経済・貿易史探偵団 (v62) ===========
// =========== 🌐 世界経済・貿易史探偵団 함수들 (v62) ===========
// ============================================================
// v75: 🔢 算数·数学 探偵団 (series 11) — Phase 4c-2 implementation
// ============================================================
// Weather (series 10) 패턴 정밀 mirror. 변경: Wea→Math / WEA_→MATH_ /
// weaCleared→mathCleared / weaArea·weaStage*→mathArea·mathStage* /
// pageWea→pageMath / btnVoiceWea·btnBackWea→btnVoiceMath·btnBackMath.
// 헤더 텍스트 3 군데 contextual 적응 (시리즈명·서브타이틀·설명).

// ============================================================
// Series 4 — 偉人科学者ファイル (s4-case01 question-driven flow)
// SCIENTISTS_STORY schema (SERIES4_CONTENT_SPEC.md §4):
//   intro.lines[] → click-to-advance dialogue → CTA enters step
//   steps[i] = { question, options: [{label, isCorrect, response:[]}] }
//     question phase → user picks option; wrong → toast + retry; correct → response lines
//   ending.lines[] → CTA opens learn modal
//   caseQuiz[] → 5 multiple-choice; star rating; return to grid
// ============================================================
const ScientistsState = {
  caseIdx: 0,
  phase: 'intro',      // 'intro' | 'step' | 'ending' | 'caseQuiz' | 'cleared'
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'question', // 'question' | 'response'
  pickedIdx: -1,
  responseIdx: 0,
  wrongIdxs: [],       // wrong option indices tried in current step
  endingIdx: 0,
  quizIdx: 0,
  quizPicked: {},      // { qIdx: chosenIdx }
  quizCorrect: 0,
};

// SPEC speakerKey → (cls, displayName, charKey, pos) for s4 case 1.
// `cls` feeds speakLine() voice-profile lookup and CSS speaker-bubble class.
// Unknown cls falls back to narrator voice profile (engine/audio.js).
// 신규 사건 추가 시 해당 사건의 NPC 키를 반드시 등록할 것.
// 미등록 키는 narrator 로 fallback 되어 말풍선이 「ナレーター」, 초상화 누락 됨.
const SCIENTISTS_SPEAKER_MAP = {
  narrator:          { cls: 'narrator', name: 'ナレーター',     charKey: null,                pos: null },
  haru:              { cls: 'haru',     name: 'ハル',           charKey: 'haru',              pos: 'left' },
  rio:               { cls: 'rio',      name: 'リオ',           charKey: 'rio',               pos: 'right' },
  hinata:            { cls: 'hinata',   name: 'ヒナタ',         charKey: 'hinata',            pos: 'right' },
  penta:             { cls: 'penta',    name: 'ペンタ',         charKey: 'penta',             pos: 'center' },
  // 사건 1~10 NPC (case SPEC에 정의된 가상 캐릭터명).
  ringo_hakase:      { cls: 'sensei',   name: '林檎博士',       charKey: 'ringo_hakase',      pos: 'center' },
  shiraga_ein:       { cls: 'sensei',   name: 'アイン教授',     charKey: 'shiraga_ein',       pos: 'center' },
  hikari_curie:      { cls: 'sensei',   name: 'キューリィ夫人', charKey: 'hikari_curie',      pos: 'center' },
  darwin_voyager:    { cls: 'sensei',   name: 'ダーリン教授',   charKey: 'darwin_voyager',    pos: 'center' },
  pasteur_micro:     { cls: 'sensei',   name: 'パスト博士',     charKey: 'pasteur_micro',     pos: 'center' },
  mendel_pea:        { cls: 'sensei',   name: 'メンデル',       charKey: 'mendel_pea',        pos: 'center' },
  galileo_telescope: { cls: 'sensei',   name: 'ガリレオ',       charKey: 'galileo_telescope', pos: 'center' },
  faraday_coil:      { cls: 'sensei',   name: 'ファラデー',     charKey: 'faraday_coil',      pos: 'center' },
  bohr_atom:         { cls: 'sensei',   name: 'ボーア',         charKey: 'bohr_atom',         pos: 'center' },
  togo_kenja:        { cls: 'sensei',   name: '賢者',           charKey: 'togo_kenja',        pos: 'center' },
};

function scientistsSpeakerInfo(key) {
  return SCIENTISTS_SPEAKER_MAP[key] || SCIENTISTS_SPEAKER_MAP.narrator;
}

function buildScientistsGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = SCIENTISTS_STORY.length;
  const clearedCount = State.scientistsCleared.filter(c => c).length;

  // s4: clean header pattern matching series 9/10/11 — no inline
  // background, default .sci-header / .sci-h-title styling. The
  // bg_main_study asset stays registered in SCENE_IMAGES for future
  // content (boss case backdrop etc.); it's just not used here.
  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">👨‍🔬 偉人科学者ファイル ハル & リオ</div>';
  html += '<div class="sci-h-sub">~歴史を変えた 発見の 謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '偉人科学者の 発見を 追体験しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  SCIENTISTS_STORY.forEach((s, i) => {
    const cleared = State.scientistsCleared[i];
    const comingSoon = s.comingSoon;
    let locked = false;
    if (i > 0) {
      const prev = SCIENTISTS_STORY[i - 1];
      if (prev.comingSoon || !State.scientistsCleared[i - 1]) locked = true;
    }
    let cls = 'sci-case-card';
    if (locked) cls += ' locked';
    if (cleared) cls += ' cleared';
    if (comingSoon) cls += ' coming-soon';
    html += '<div class="' + cls + '" data-idx="' + i + '">';
    html += '<div class="sci-case-num">第' + s.id + '事件</div>';
    if (s.illustration) {
      // s4: chapter cards use landscape scene PNGs (bg_chXX_*) — same
      // visual pattern as series 9. CSS default (.sci-case-illust:
      // background-size:cover) handles framing; no inline override.
      html += '<div class="sci-case-illust" style="background-image:url(' + s.illustration + ');"></div>';
    } else {
      html += '<div class="sci-case-icon">' + s.icon + '</div>';
    }
    html += '<div class="sci-case-title">' + escapeHtml(s.title) + '</div>';
    html += '<div class="sci-case-sub">' + escapeHtml(s.subtitle) + '</div>';
    html += '<div style="text-align:center;"><span class="sci-case-theme">' + escapeHtml(s.theme) + '</span></div>';
    if (comingSoon) {
      html += '<div style="text-align:center;margin-top:6px;font-family:RocknRoll One;font-size:11px;color:#b85a5a;">🚧 準備中…</div>';
    } else {
      html += '<div class="sci-case-stars">' + (cleared ? '⭐⭐⭐' : '') + '</div>';
    }
    if (locked && !comingSoon) html += '<div class="sci-case-lock">🔒</div>';
    html += '</div>';
  });

  const ready = SCIENTISTS_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '👨‍🔬 現在 ' + ready + ' / ' + SCIENTISTS_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = SCIENTISTS_STORY[idx];
      if (s.comingSoon) {
        sfx('wrong');
        showModal('🚧', '準備中', 'この 事件は まだ 準備中です。\nもうしばらく お待ちください!',
          [{text:'OK', cb:closeModal}], 'fail');
        return;
      }
      if (card.classList.contains('locked')) {
        sfx('wrong');
        showModal('🔒', '事件 ロック中', '前の 事件を 解決すると 開きます。',
          [{text:'OK', cb:closeModal}], 'fail');
        return;
      }
      sfx('click');
      startScientistsCase(idx);
    };
  });
}

function startScientistsCase(idx) {
  const s = SCIENTISTS_STORY[idx];
  if (!s || s.comingSoon) {
    showModal('🚧', '準備中', 'この 事件は まだ 準備中です。\nもうしばらく お待ちください!',
      [{text:'OK', cb:closeModal}], 'fail');
    return;
  }
  ScientistsState.caseIdx    = idx;
  ScientistsState.phase      = 'intro';
  ScientistsState.introIdx   = 0;
  ScientistsState.stepIdx    = 0;
  ScientistsState.stepPhase  = 'question';
  ScientistsState.pickedIdx  = -1;
  ScientistsState.responseIdx = 0;
  ScientistsState.wrongIdxs  = [];
  ScientistsState.endingIdx  = 0;
  ScientistsState.quizIdx    = 0;
  ScientistsState.quizPicked = {};
  ScientistsState.quizCorrect = 0;
  showPage('pageScientists');
  playBGM(s.bgm || 'mystery');
  renderScientists();
}

function scientistsCurrentLine() {
  const c = SCIENTISTS_STORY[ScientistsState.caseIdx];
  if (ScientistsState.phase === 'intro') {
    return c.intro.lines[ScientistsState.introIdx] || null;
  }
  if (ScientistsState.phase === 'step' && ScientistsState.stepPhase === 'response') {
    const step = c.steps[ScientistsState.stepIdx];
    const opt = step.options[ScientistsState.pickedIdx];
    return opt ? (opt.response[ScientistsState.responseIdx] || null) : null;
  }
  if (ScientistsState.phase === 'ending') {
    return c.ending.lines[ScientistsState.endingIdx] || null;
  }
  return null;
}

function renderScientists() {
  const c = SCIENTISTS_STORY[ScientistsState.caseIdx];
  if (!c) return;

  // ===== 상단 STAGE =====
  const stageBg = document.getElementById('scientistsStageBg');
  const stageProg = document.getElementById('scientistsStageProgress');
  const stageChars = document.getElementById('scientistsStageChars');

  // 배경: phase별 배경키 → SCENE_IMAGES
  let bgKey = null;
  if (ScientistsState.phase === 'intro')        bgKey = c.intro.bg;
  else if (ScientistsState.phase === 'step')    bgKey = c.steps[ScientistsState.stepIdx].bg;
  else if (ScientistsState.phase === 'ending')  bgKey = c.ending.bg;
  else                                          bgKey = c.sceneKey;
  if (stageBg) {
    const url = (typeof SCENE_IMAGES !== 'undefined' && SCENE_IMAGES[bgKey]) || c.illustration || '';
    stageBg.style.backgroundImage = url ? 'url(' + url + ')' : '';
  }

  // 진행 dot: 6 step + 학습 + 퀴즈
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < ScientistsState.stepIdx) cls += ' done';
      else if (i === ScientistsState.stepIdx && ScientistsState.phase === 'step') cls += ' current';
      else if (ScientistsState.phase === 'ending' || ScientistsState.phase === 'caseQuiz' || ScientistsState.phase === 'cleared') cls += ' done';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let endingCls = 'pdot';
    if (ScientistsState.phase === 'ending') endingCls += ' current';
    else if (ScientistsState.phase === 'caseQuiz' || ScientistsState.phase === 'cleared') endingCls += ' done';
    progHtml += '<div class="' + endingCls + '">📚</div>';
    let quizCls = 'pdot';
    if (ScientistsState.phase === 'caseQuiz') quizCls += ' current';
    else if (ScientistsState.phase === 'cleared') quizCls += ' done';
    progHtml += '<div class="' + quizCls + '">⭐</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인
  if (stageChars) {
    let charsHtml = '';
    const line = scientistsCurrentLine();
    const layout = [];
    if (line) {
      const info = scientistsSpeakerInfo(line.speaker);
      if (info.charKey && info.pos) {
        layout.push({ key: info.charKey, pos: info.pos });
      }
    } else if (ScientistsState.phase === 'step' && ScientistsState.stepPhase === 'question') {
      // 질문 phase: 3인 동행 표시
      layout.push({ key: 'haru', pos: 'left' });
      layout.push({ key: 'hinata', pos: 'center' });
      layout.push({ key: 'rio', pos: 'right' });
    } else if (ScientistsState.phase === 'caseQuiz') {
      layout.push({ key: 'haru', pos: 'left' });
      layout.push({ key: 'rio', pos: 'right' });
    } else if (ScientistsState.phase === 'cleared') {
      layout.push({ key: 'haru', pos: 'left' });
      // 현재 사건의 NPC (case 1: ringo_hakase / case 2: shiraga_ein / case 3: hikari_curie / ...)
      if (c.charKey) layout.push({ key: c.charKey, pos: 'center' });
      layout.push({ key: 'rio', pos: 'right' });
    }
    layout.forEach(ch => {
      const src = (typeof SCIENTISTS_CHARS !== 'undefined') ? SCIENTISTS_CHARS[ch.key] : null;
      if (!src) return;
      charsHtml += '<div class="sci-char ' + ch.pos + '" style="background-image:url(' + src + ');"></div>';
    });
    if (line) {
      const info = scientistsSpeakerInfo(line.speaker);
      try { speakLine({ cls: info.cls, text: line.text }); } catch(e) {}
    }
    stageChars.innerHTML = charsHtml;
  }

  // ===== 하단 AREA =====
  const area = document.getElementById('scientistsArea');
  if (!area) return;
  let html = '';

  // 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (ScientistsState.phase === 'intro') {
    const line = c.intro.lines[ScientistsState.introIdx];
    const info = scientistsSpeakerInfo(line.speaker);
    html += '<div class="sci-dialogue" id="scientistsDialogue">';
    html += '<span class="speaker-bubble ' + info.cls + '">' + escapeHtml(info.name) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (ScientistsState.introIdx < c.intro.lines.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="scientistsNext" style="margin-top:14px;">' + escapeHtml(c.intro.cta || '🔍 調査 開始!') + '</button>';
    }
    html += '</div>';
  }
  else if (ScientistsState.phase === 'step') {
    const step = c.steps[ScientistsState.stepIdx];
    if (ScientistsState.stepPhase === 'question') {
      html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
      html += '<div class="sci-puzzle-card">';
      html += '<div class="sci-puzzle-prompt">' + escapeHtml(step.question) + '</div>';
      html += '<div class="sci-puzzle-options">';
      step.options.forEach((opt, i) => {
        const isWrong = ScientistsState.wrongIdxs.includes(i);
        const wrongStyle = isWrong ? 'opacity:0.5;text-decoration:line-through;cursor:not-allowed;' : '';
        html += '<div class="sci-puzzle-opt" data-i="' + i + '" style="' + wrongStyle + '">' + (i+1) + '. ' + escapeHtml(opt.label) + '</div>';
      });
      html += '</div></div>';
      html += '<div id="scientistsFeedback"></div>';
    }
    else if (ScientistsState.stepPhase === 'response') {
      const opt = step.options[ScientistsState.pickedIdx];
      const line = opt.response[ScientistsState.responseIdx];
      const info = scientistsSpeakerInfo(line.speaker);
      html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
      html += '<div class="sci-dialogue" id="scientistsDialogue">';
      html += '<span class="speaker-bubble ' + info.cls + '">' + escapeHtml(info.name) + '</span>';
      html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
      const isLastLine = ScientistsState.responseIdx >= opt.response.length - 1;
      const isLastStep = ScientistsState.stepIdx >= c.steps.length - 1;
      if (!isLastLine) {
        html += '<span class="tap-hint">▼ タップ</span>';
      } else {
        html += '<button class="sci-next-btn" id="scientistsNext" style="margin-top:10px;">' + (isLastStep ? '🎉 推理 完成!' : '次の STEP →') + '</button>';
      }
      html += '</div>';
    }
  }
  else if (ScientistsState.phase === 'ending') {
    const line = c.ending.lines[ScientistsState.endingIdx];
    const info = scientistsSpeakerInfo(line.speaker);
    html += '<div class="sci-dialogue" id="scientistsDialogue">';
    html += '<span class="speaker-bubble ' + info.cls + '">' + escapeHtml(info.name) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (ScientistsState.endingIdx < c.ending.lines.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="scientistsNext" style="margin-top:14px;">' + escapeHtml(c.ending.cta || '📚 学習資料を 開く') + '</button>';
    }
    html += '</div>';
  }
  else if (ScientistsState.phase === 'caseQuiz') {
    const total = c.caseQuiz.length;
    const qIdx = ScientistsState.quizIdx;
    const q = c.caseQuiz[qIdx];
    const picked = ScientistsState.quizPicked[qIdx];
    const answered = (picked !== undefined);
    html += '<div style="font-family:RocknRoll One;font-size:14px;color:#1a4a5a;margin-bottom:8px;text-align:center;">⭐ クリア クイズ (' + (qIdx+1) + ' / ' + total + ')</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(q.q) + '</div>';
    html += '<div class="sci-puzzle-options">';
    q.options.forEach((opt, i) => {
      let extraStyle = '';
      if (answered) {
        if (i === q.correct) extraStyle = 'background:#d0f0d0;border-color:#2a8a4a;';
        else if (i === picked) extraStyle = 'background:#f5c6c6;border-color:#b85a5a;';
        else extraStyle = 'opacity:0.6;';
      }
      html += '<div class="sci-puzzle-opt" data-i="' + i + '" style="' + extraStyle + '">' + String.fromCharCode(65+i) + ') ' + escapeHtml(opt) + '</div>';
    });
    html += '</div></div>';
    if (answered) {
      const isCorrect = (picked === q.correct);
      html += '<div style="text-align:center;font-family:Klee One;font-size:13px;margin-top:8px;color:' + (isCorrect ? '#2a8a4a' : '#b85a5a') + ';">' + (isCorrect ? '⭕ 正解!' : '❌ 不正解') + '</div>';
      const isLastQ = qIdx >= total - 1;
      html += '<button class="sci-next-btn" id="scientistsNext" style="margin-top:10px;">' + (isLastQ ? '🎉 結果を 見る' : '次の 問題 →') + '</button>';
    }
  }
  else if (ScientistsState.phase === 'cleared') {
    const total = c.caseQuiz.length;
    const correct = ScientistsState.quizCorrect;
    let stars = 1;
    if (correct === total) stars = 3;
    else if (correct >= total - 1) stars = 2;
    const starStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    html += '<div style="text-align:center;font-family:RocknRoll One;font-size:18px;color:#d49a3a;margin-bottom:8px;">事件 解決!</div>';
    html += '<div style="text-align:center;font-family:Klee One;font-size:14px;color:#1a4a5a;margin-bottom:6px;">クイズ ' + correct + ' / ' + total + ' 正解</div>';
    html += '<div style="text-align:center;font-size:30px;margin-bottom:14px;letter-spacing:6px;">' + starStr + '</div>';
    html += '<div style="text-align:center;">';
    html += '<button class="sci-next-btn" id="scientistsNext" style="background:#2a7a8a;">📋 もくじに 戻る</button>';
    html += '</div>';
  }

  area.innerHTML = html;
  bindScientistsEvents();
}

function bindScientistsEvents() {
  // 다음 버튼
  const nextBtn = document.getElementById('scientistsNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      scientistsHandleNext();
    };
  }
  // 대화 박스 탭 (▼ タップ)
  const dialogue = document.getElementById('scientistsDialogue');
  if (dialogue) {
    dialogue.onclick = (e) => {
      // 다음 버튼 클릭은 nextBtn.onclick에서 처리, 버블링 차단
      if (e.target.closest('#scientistsNext')) return;
      const c = SCIENTISTS_STORY[ScientistsState.caseIdx];
      if (ScientistsState.phase === 'intro' && ScientistsState.introIdx < c.intro.lines.length - 1) {
        sfx('click');
        ScientistsState.introIdx++;
        renderScientists();
      }
      else if (ScientistsState.phase === 'step' && ScientistsState.stepPhase === 'response') {
        const opt = c.steps[ScientistsState.stepIdx].options[ScientistsState.pickedIdx];
        if (ScientistsState.responseIdx < opt.response.length - 1) {
          sfx('click');
          ScientistsState.responseIdx++;
          renderScientists();
        }
      }
      else if (ScientistsState.phase === 'ending' && ScientistsState.endingIdx < c.ending.lines.length - 1) {
        sfx('click');
        ScientistsState.endingIdx++;
        renderScientists();
      }
    };
  }
  // 옵션 클릭 (step question / caseQuiz)
  document.querySelectorAll('#scientistsArea .sci-puzzle-opt').forEach(el => {
    el.onclick = () => {
      const i = parseInt(el.dataset.i);
      const c = SCIENTISTS_STORY[ScientistsState.caseIdx];
      if (ScientistsState.phase === 'step' && ScientistsState.stepPhase === 'question') {
        if (ScientistsState.wrongIdxs.includes(i)) {
          sfx('wrong');
          return; // 이미 틀린 옵션
        }
        const step = c.steps[ScientistsState.stepIdx];
        const opt = step.options[i];
        if (opt.isCorrect) {
          sfx('correct');
          ScientistsState.pickedIdx = i;
          ScientistsState.responseIdx = 0;
          ScientistsState.stepPhase = 'response';
          renderScientists();
        } else {
          sfx('wrong');
          ScientistsState.wrongIdxs.push(i);
          // 즉시 오답 reaction line 표시: 임시로 pickedIdx + response 사용
          ScientistsState.pickedIdx = i;
          ScientistsState.responseIdx = 0;
          ScientistsState.stepPhase = 'response';
          renderScientists();
        }
      }
      else if (ScientistsState.phase === 'caseQuiz') {
        const qIdx = ScientistsState.quizIdx;
        if (ScientistsState.quizPicked[qIdx] !== undefined) return; // 이미 답함
        const q = c.caseQuiz[qIdx];
        ScientistsState.quizPicked[qIdx] = i;
        if (i === q.correct) {
          ScientistsState.quizCorrect++;
          sfx('correct');
        } else {
          sfx('wrong');
        }
        renderScientists();
      }
    };
  });
}

function scientistsHandleNext() {
  const c = SCIENTISTS_STORY[ScientistsState.caseIdx];
  if (ScientistsState.phase === 'intro') {
    // intro → 첫 step의 question phase로
    ScientistsState.phase = 'step';
    ScientistsState.stepIdx = 0;
    ScientistsState.stepPhase = 'question';
    ScientistsState.pickedIdx = -1;
    ScientistsState.wrongIdxs = [];
    renderScientists();
    return;
  }
  if (ScientistsState.phase === 'step' && ScientistsState.stepPhase === 'response') {
    const step = c.steps[ScientistsState.stepIdx];
    const opt = step.options[ScientistsState.pickedIdx];
    if (!opt.isCorrect) {
      // 오답 response 끝 → 다시 question phase (틀린 옵션은 wrongIdxs에 남음)
      ScientistsState.stepPhase = 'question';
      ScientistsState.pickedIdx = -1;
      ScientistsState.responseIdx = 0;
      renderScientists();
      return;
    }
    // 정답 response 끝 → 다음 step 또는 ending
    if (ScientistsState.stepIdx >= c.steps.length - 1) {
      ScientistsState.phase = 'ending';
      ScientistsState.endingIdx = 0;
      renderScientists();
    } else {
      ScientistsState.stepIdx++;
      ScientistsState.stepPhase = 'question';
      ScientistsState.pickedIdx = -1;
      ScientistsState.responseIdx = 0;
      ScientistsState.wrongIdxs = [];
      renderScientists();
    }
    return;
  }
  if (ScientistsState.phase === 'ending') {
    // 학습 자료 모달 진입 + 다음 단계는 caseQuiz로 진행하도록 표시
    if (c.learnRef && typeof openScientistsLearn === 'function') {
      openScientistsLearn(c.learnRef);
      // 학습 후 돌아올 때를 위해 caseQuiz 상태 미리 세팅
      ScientistsState.phase = 'caseQuiz';
      ScientistsState.quizIdx = 0;
      ScientistsState.quizPicked = {};
      ScientistsState.quizCorrect = 0;
      // 학습 페이지 뒤로가기 핸들러는 buildChapterGrid로 돌아가지만,
      // 사용자는 학습을 보고 다시 사건 카드를 클릭해 들어오면 caseQuiz가 시작됨.
      // → 향후 phase4: 학습 완료 버튼에서 직접 startScientistsCaseQuiz 호출하는 흐름 추가 가능.
    } else {
      // learn 모달 없으면 바로 caseQuiz
      ScientistsState.phase = 'caseQuiz';
      ScientistsState.quizIdx = 0;
      ScientistsState.quizPicked = {};
      ScientistsState.quizCorrect = 0;
      renderScientists();
    }
    return;
  }
  if (ScientistsState.phase === 'caseQuiz') {
    if (ScientistsState.quizIdx >= c.caseQuiz.length - 1) {
      ScientistsState.phase = 'cleared';
      // State에 클리어 반영
      if (State.scientistsCleared && State.scientistsCleared.length > ScientistsState.caseIdx) {
        State.scientistsCleared[ScientistsState.caseIdx] = true;
        try { saveState(); } catch(e) {}
      }
      try { triggerConfetti(); } catch(e) {}
      renderScientists();
    } else {
      ScientistsState.quizIdx++;
      renderScientists();
    }
    return;
  }
  if (ScientistsState.phase === 'cleared') {
    stopVoice();
    buildChapterGrid();
    showPage('pageSelect');
    return;
  }
}
