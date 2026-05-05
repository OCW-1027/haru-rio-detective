/* engine/detectives-A.js — extracted from index.html (v73 step4a)
 * Original location: lines 3515-5866 (current index.html)
 * Contents: All 8 detective States (ScienceState, WorldState, LitState, BizState, HistState, SocState, MonState, WeaState) + Science/World/Lit/Biz detective functions (build/start/render/bind × 4)
 * Dependencies: State, sfx, showModal, showPage, saveState, speakLine, stopVoice, recordGameBest, SCIENCE_STORY/series2-/series5-/series6- (series .js files)
 * Note: detectives-B.js refers to HistState/SocState/MonState/WeaState defined in this file → load this BEFORE detectives-B.js
 */
// ============================================================
// 🔬 科学探偵 시스템 - v31
// ============================================================
const ScienceState = {
  caseIdx: 0,        // 현재 사건 번호
  phase: 'intro',    // intro | step | final | resolved
  introIdx: 0,       // intro 대사 진행도
  stepIdx: 0,        // 현재 단계
  stepPhase: 'intro', // intro | puzzle | clue (단계 안에서)
  stepIntroIdx: 0,
  collectedClues: [], // 모은 단서들
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v45: 세계 추리 시리즈 상태
const WorldState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v53: 文学・芸術 시리즈 상태
const LitState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v58: 📊 ビジネス・企業 시리즈 상태
const BizState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v62: 🌐 世界経済・貿易史 시리즈 상태
const HistState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v65: 🏛 社会科総合 시리즈 상태
const SocState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v67: 💴 日常のお金 시리즈 상태
const MonState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};

// v71: 🌦 気象予報士 시리즈 상태
const WeaState = {
  caseIdx: 0,
  phase: 'intro',
  introIdx: 0,
  stepIdx: 0,
  stepPhase: 'intro',
  stepIntroIdx: 0,
  collectedClues: [],
  selectedSuspectId: null,
  hintShown: false,
  answered: false,
};






function buildScienceGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = SCIENCE_STORY.length;
  const clearedCount = State.scienceCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">🔬 科学探偵 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた発見の謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 科学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  SCIENCE_STORY.forEach((s, i) => {
    const cleared = State.scienceCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = SCIENCE_STORY[i - 1];
      if (prev.comingSoon || !State.scienceCleared[i - 1]) locked = true;
    }
    let cls = 'sci-case-card';
    if (locked) cls += ' locked';
    if (cleared) cls += ' cleared';
    if (comingSoon) cls += ' coming-soon';
    html += '<div class="' + cls + '" data-idx="' + i + '">';
    html += '<div class="sci-case-num">第' + s.id + '事件</div>';
    // v32: 일러스트가 있으면 표시, 없으면 큰 이모지
    if (s.illustration) {
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

  // 진행도 안내
  const ready = SCIENCE_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + SCIENCE_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = SCIENCE_STORY[idx];
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
      startScienceCase(idx);
    };
  });
}

function startScienceCase(idx) {
  ScienceState.caseIdx = idx;
  ScienceState.phase = 'intro';
  ScienceState.introIdx = 0;
  ScienceState.stepIdx = 0;
  ScienceState.stepPhase = 'intro';
  ScienceState.stepIntroIdx = 0;
  ScienceState.collectedClues = [];
  ScienceState.selectedSuspectId = null;
  ScienceState.hintShown = false;
  ScienceState.answered = false;
  ScienceState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  ScienceState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageScience');
  // v32: 사건별 BGM 분위기
  const bgmKey = SCIENCE_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderScience();
}

function renderScience() {
  const c = SCIENCE_STORY[ScienceState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('sciStageBg');
  const stageProg = document.getElementById('sciStageProgress');
  const stageChars = document.getElementById('sciStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < ScienceState.stepIdx) cls += ' done';
      else if (i === ScienceState.stepIdx && ScienceState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (ScienceState.phase === 'resolved') finalCls += ' done';
    else if (ScienceState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (ScienceState.phase === 'intro') {
      currentLine = c.intro[ScienceState.introIdx];
    } else if (ScienceState.phase === 'step' && ScienceState.stepPhase === 'intro') {
      const step = c.steps[ScienceState.stepIdx];
      if (step && step.intro) currentLine = step.intro[ScienceState.stepIntroIdx];
    }

    // 위치 결정 함수 (대화 중인 사람 위치)
    let charLayout = []; // [{key, pos: 'left'|'right'|'center', state: 'speaking'|'dimmed'|''}]

    if (currentLine) {
      const speaker = currentLine.charKey;
      const cls = currentLine.cls || '';
      // v39: 스토리 방식 - 말하는 사람만 등장 (다른 캐릭터는 화면에서 사라짐)
      if (speaker === 'haru') {
        charLayout.push({ key: 'haru', pos: 'left', state: '' });
      } else if (speaker === 'rio') {
        charLayout.push({ key: 'rio', pos: 'right', state: '' });
      } else if (speaker && SCI_CHARS[speaker]) {
        // 박사·용의자가 중앙
        charLayout.push({ key: speaker, pos: 'center', state: '' });
      }
      // 나레이터의 경우는 캐릭터 없이 자막만 표시
    } else if (ScienceState.phase === 'step' && ScienceState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (ScienceState.phase === 'step' && ScienceState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (ScienceState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (ScienceState.phase === 'resolved') {
      // 사건 해결 - 둘 다 환호
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    }

    // 캐릭터 그리기 (말풍선 없이 - 대사는 하단 박스에 표시됨)
    charLayout.forEach(c => {
      if (!SCI_CHARS[c.key]) return;
      charsHtml += '<div class="sci-char ' + c.pos + ' ' + c.state + '" style="background-image:url(' + SCI_CHARS[c.key] + ');"></div>';
    });

    // v41: 음성 재생만 (말풍선 표시는 제거 - 하단 박스에서 텍스트 표시)
    if (currentLine) {
      try { speakLine(currentLine); } catch(e) {}
    }

    stageChars.innerHTML = charsHtml;
  }

  // ===== 하단 AREA 갱신 =====
  const area = document.getElementById('scienceArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (ScienceState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[ScienceState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="sciDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (ScienceState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="sciNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (ScienceState.phase === 'step') {
    const step = c.steps[ScienceState.stepIdx];
    if (ScienceState.stepPhase === 'intro') {
      const line = (step.intro || [])[ScienceState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="sciDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (ScienceState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="sciNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (ScienceState.stepPhase === 'puzzle') {
      // 단서 패널
      if (ScienceState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + ScienceState.collectedClues.length + '件)</div>';
        ScienceState.collectedClues.forEach(cl => {
          html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
        });
        html += '</div>';
      }
      html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;">' + escapeHtml(step.title) + '</div>';
      html += '<div class="sci-puzzle-card">';
      html += '<div class="sci-puzzle-prompt">' + escapeHtml(step.puzzle.prompt) + '</div>';
      html += '<div class="sci-puzzle-options">';
      step.puzzle.options.forEach((opt, i) => {
        html += '<div class="sci-puzzle-opt" data-i="' + i + '">' + (i+1) + '. ' + escapeHtml(opt) + '</div>';
      });
      html += '</div>';
      html += '<button class="sci-hint-toggle" id="sciHintBtn">' + (ScienceState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (ScienceState.hintShown ? ' show' : '') + '" id="sciHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="sciFeedback"></div>';
    }
    else if (ScienceState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = ScienceState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="sciNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (ScienceState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    ScienceState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = ScienceState.selectedSuspectId === s.id;
      const isWrong = (ScienceState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
      const wrongStyle = isWrong ? 'border-color:#b85a5a;background:#f5c6c6;opacity:0.55;cursor:not-allowed;' : '';
      html += '<div class="sci-suspect-card' + (isSelected ? ' selected' : '') + (isWrong ? ' tried-wrong' : '') + '" data-id="' + s.id + '" style="' + wrongStyle + '">';
      if (isWrong) {
        html += '<div style="position:absolute;top:8px;right:10px;font-size:22px;color:#b85a5a;font-weight:bold;">✗</div>';
      }
      html += '<div class="sci-suspect-row">';
      if (s.charKey && SCI_CHARS[s.charKey]) {
        html += '<div class="sci-suspect-portrait" style="background-image:url(' + SCI_CHARS[s.charKey] + ');"></div>';
      } else {
        html += '<div class="sci-suspect-icon">' + s.icon + '</div>';
      }
      html += '<div class="sci-suspect-info">';
      html += '<div class="sci-suspect-name">' + escapeHtml(s.name) + '</div>';
      html += '<div class="sci-suspect-role">' + escapeHtml(s.role) + '</div>';
      html += '</div></div>';
      html += '<div class="sci-suspect-detail">';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">専門:</span><span>' + escapeHtml(s.specialty) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">外見:</span><span>' + escapeHtml(s.height + ' / ' + s.clothes) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">アリバイ:</span><span>' + escapeHtml(s.alibi) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">証言:</span><span>「' + escapeHtml(s.testimony) + '」</span></div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<button class="sci-hint-toggle" id="sciHintBtn">' + (ScienceState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (ScienceState.hintShown ? ' show' : '') + '" id="sciHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="sciSubmit"' + (ScienceState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="sciFeedback"></div>';
  }
  else if (ScienceState.phase === 'resolved') {
    html += '<div class="sci-resolved">';
    html += '<div class="sci-resolved-title">🏆 事件 解決!</div>';
    html += '<div style="font-family:Klee One;font-size:14px;color:var(--deep-ink);line-height:1.7;white-space:pre-wrap;">' + escapeHtml(c.finalQ.explanation) + '</div>';
    html += '<div class="sci-learned-box">';
    html += '<div class="sci-learned-h">' + escapeHtml(c.learned.title) + '</div>';
    c.learned.points.forEach(p => {
      html += '<div class="sci-learned-item">' + escapeHtml(p) + '</div>';
    });
    html += '</div>';
    html += '</div>';
    const nextIdx = ScienceState.caseIdx + 1;
    if (nextIdx < SCIENCE_STORY.length && !SCIENCE_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="sciGoNext">第' + SCIENCE_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="sciGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindScienceEvents();
}

function bindScienceEvents() {
  const c = SCIENCE_STORY[ScienceState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (ScienceState.phase === 'intro') {
      if (ScienceState.introIdx < c.intro.length - 1) {
        sfx('click');
        ScienceState.introIdx++;
        renderScience();
        return true;
      }
    } else if (ScienceState.phase === 'step' && ScienceState.stepPhase === 'intro') {
      const step = c.steps[ScienceState.stepIdx];
      if (ScienceState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        ScienceState.stepIntroIdx++;
        renderScience();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('sciDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('sciStage');
  if (stage) {
    stage.onclick = () => {
      if (ScienceState.phase === 'intro' ||
          (ScienceState.phase === 'step' && ScienceState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('sciNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (ScienceState.phase === 'intro') {
        if (ScienceState.introIdx < c.intro.length - 1) {
          ScienceState.introIdx++;
        } else {
          // 단계로 진입
          ScienceState.phase = 'step';
          ScienceState.stepIdx = 0;
          ScienceState.stepPhase = 'intro';
          ScienceState.stepIntroIdx = 0;
          ScienceState.hintShown = false;
        }
      } else if (ScienceState.phase === 'step') {
        const step = c.steps[ScienceState.stepIdx];
        if (ScienceState.stepPhase === 'intro') {
          if (ScienceState.stepIntroIdx < (step.intro || []).length - 1) {
            ScienceState.stepIntroIdx++;
          } else {
            ScienceState.stepPhase = 'puzzle';
            ScienceState.hintShown = false;
            ScienceState.answered = false;
          }
        } else if (ScienceState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (ScienceState.stepIdx < c.steps.length - 1) {
            ScienceState.stepIdx++;
            ScienceState.stepPhase = 'intro';
            ScienceState.stepIntroIdx = 0;
            ScienceState.hintShown = false;
          } else {
            ScienceState.phase = 'final';
            ScienceState.hintShown = false;
            ScienceState.selectedSuspectId = null;
            ScienceState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            ScienceState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderScience();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('sciHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      ScienceState.hintShown = !ScienceState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('sciHint');
      if (hintEl) {
        hintEl.classList.toggle('show', ScienceState.hintShown);
      }
      hintBtn.textContent = ScienceState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (ScienceState.phase === 'step' && ScienceState.stepPhase === 'puzzle') {
    const step = c.steps[ScienceState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (ScienceState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('sciFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          ScienceState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) ScienceState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="sciNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('sciNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            ScienceState.stepPhase = 'clue';
            renderScience();
          };
        } else {
          // 오답: 누른 옵션만 wrong, 정답은 절대 표시하지 않음, explanation도 미공개
          opt.classList.add('answered', 'wrong');
          sfx('wrong');
          const remaining = document.querySelectorAll('.sci-puzzle-opt:not(.wrong)').length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違う…</div>' +
            '<div class="sci-feedback-text">それは 答えでは ない。手がかりを もう一度 考えて、別の 答えを 試そう。残り: ' + remaining + '個</div>' +
            '</div>';
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
        }
      };
    });
  }

  // 용의자 선택 (final phase)
  if (ScienceState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (ScienceState.answered) return;
        if ((ScienceState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        ScienceState.selectedSuspectId = card.dataset.id;
        renderScience();
      };
    });
    const submitBtn = document.getElementById('sciSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!ScienceState.selectedSuspectId) return;
        ScienceState.answered = true;
        const ok = ScienceState.selectedSuspectId === c.finalQ.answer;
        if (ok) {
          // v50: 정답일 때만 정답 카드 강조
          document.querySelectorAll('.sci-suspect-card').forEach(card => {
            if (card.dataset.id === c.finalQ.answer) {
              card.style.borderColor = '#6ba76b';
              card.style.background = '#c8e6c8';
              card.style.opacity = '1';
            }
          });
          sfx('reveal');  // v32: 모순/진실 발견의 긴장감
          setTimeout(() => sfx('resolved'), 800);  // 그 다음 해결의 환희
          triggerConfetti();
          // 클리어 처리
          State.scienceCleared[ScienceState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            ScienceState.phase = 'resolved';
            renderScience();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!ScienceState.wrongIds) ScienceState.wrongIds = [];
          if (!ScienceState.wrongIds.includes(ScienceState.selectedSuspectId)) {
            ScienceState.wrongIds.push(ScienceState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('sciFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - ScienceState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="sciTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('sciTryAgain').onclick = () => {
            sfx('click');
            ScienceState.answered = false;
            ScienceState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderScience();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('sciGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startScienceCase(ScienceState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('sciGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}


// =========== 🌍 世界遺産の旅 함수들 (v45) ===========
function buildWorldGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = WORLD_STORY.length;
  const clearedCount = State.worldCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">🔬 科学探偵 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた発見の謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 科学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  WORLD_STORY.forEach((s, i) => {
    const cleared = State.worldCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = WORLD_STORY[i - 1];
      if (prev.comingSoon || !State.worldCleared[i - 1]) locked = true;
    }
    let cls = 'sci-case-card';
    if (locked) cls += ' locked';
    if (cleared) cls += ' cleared';
    if (comingSoon) cls += ' coming-soon';
    html += '<div class="' + cls + '" data-idx="' + i + '">';
    html += '<div class="sci-case-num">第' + s.id + '事件</div>';
    // v32: 일러스트가 있으면 표시, 없으면 큰 이모지
    if (s.illustration) {
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

  // 진행도 안내
  const ready = WORLD_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + WORLD_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = WORLD_STORY[idx];
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
      startWorldCase(idx);
    };
  });
}

function startWorldCase(idx) {
  WorldState.caseIdx = idx;
  WorldState.phase = 'intro';
  WorldState.introIdx = 0;
  WorldState.stepIdx = 0;
  WorldState.stepPhase = 'intro';
  WorldState.stepIntroIdx = 0;
  WorldState.collectedClues = [];
  WorldState.selectedSuspectId = null;
  WorldState.hintShown = false;
  WorldState.answered = false;
  WorldState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  WorldState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageWorld');
  // v32: 사건별 BGM 분위기
  const bgmKey = WORLD_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderWorld();
}

function renderWorld() {
  const c = WORLD_STORY[WorldState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('wldStageBg');
  const stageProg = document.getElementById('wldStageProgress');
  const stageChars = document.getElementById('wldStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < WorldState.stepIdx) cls += ' done';
      else if (i === WorldState.stepIdx && WorldState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (WorldState.phase === 'resolved') finalCls += ' done';
    else if (WorldState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (WorldState.phase === 'intro') {
      currentLine = c.intro[WorldState.introIdx];
    } else if (WorldState.phase === 'step' && WorldState.stepPhase === 'intro') {
      const step = c.steps[WorldState.stepIdx];
      if (step && step.intro) currentLine = step.intro[WorldState.stepIntroIdx];
    }

    // 위치 결정 함수 (대화 중인 사람 위치)
    let charLayout = []; // [{key, pos: 'left'|'right'|'center', state: 'speaking'|'dimmed'|''}]

    if (currentLine) {
      const speaker = currentLine.charKey;
      const cls = currentLine.cls || '';
      // v39: 스토리 방식 - 말하는 사람만 등장 (다른 캐릭터는 화면에서 사라짐)
      if (speaker === 'haru') {
        charLayout.push({ key: 'haru', pos: 'left', state: '' });
      } else if (speaker === 'rio') {
        charLayout.push({ key: 'rio', pos: 'right', state: '' });
      } else if (speaker && SCI_CHARS[speaker]) {
        // 박사·용의자가 중앙
        charLayout.push({ key: speaker, pos: 'center', state: '' });
      }
      // 나레이터의 경우는 캐릭터 없이 자막만 표시
    } else if (WorldState.phase === 'step' && WorldState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (WorldState.phase === 'step' && WorldState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (WorldState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (WorldState.phase === 'resolved') {
      // 사건 해결 - 둘 다 환호
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    }

    // 캐릭터 그리기 (말풍선 없이 - 대사는 하단 박스에 표시됨)
    charLayout.forEach(c => {
      if (!SCI_CHARS[c.key]) return;
      charsHtml += '<div class="sci-char ' + c.pos + ' ' + c.state + '" style="background-image:url(' + SCI_CHARS[c.key] + ');"></div>';
    });

    // v41: 음성 재생만 (말풍선 표시는 제거 - 하단 박스에서 텍스트 표시)
    if (currentLine) {
      try { speakLine(currentLine); } catch(e) {}
    }

    stageChars.innerHTML = charsHtml;
  }

  // ===== 하단 AREA 갱신 =====
  const area = document.getElementById('worldArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (WorldState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[WorldState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="wldDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (WorldState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="wldNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (WorldState.phase === 'step') {
    const step = c.steps[WorldState.stepIdx];
    if (WorldState.stepPhase === 'intro') {
      const line = (step.intro || [])[WorldState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="wldDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (WorldState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="wldNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (WorldState.stepPhase === 'puzzle') {
      // 단서 패널
      if (WorldState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + WorldState.collectedClues.length + '件)</div>';
        WorldState.collectedClues.forEach(cl => {
          html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
        });
        html += '</div>';
      }
      html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;">' + escapeHtml(step.title) + '</div>';
      html += '<div class="sci-puzzle-card">';
      html += '<div class="sci-puzzle-prompt">' + escapeHtml(step.puzzle.prompt) + '</div>';
      html += '<div class="sci-puzzle-options">';
      step.puzzle.options.forEach((opt, i) => {
        html += '<div class="sci-puzzle-opt" data-i="' + i + '">' + (i+1) + '. ' + escapeHtml(opt) + '</div>';
      });
      html += '</div>';
      html += '<button class="sci-hint-toggle" id="wldHintBtn">' + (WorldState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (WorldState.hintShown ? ' show' : '') + '" id="wldHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="wldFeedback"></div>';
    }
    else if (WorldState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = WorldState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="wldNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (WorldState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    WorldState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = WorldState.selectedSuspectId === s.id;
      const isWrong = (WorldState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
      const wrongStyle = isWrong ? 'border-color:#b85a5a;background:#f5c6c6;opacity:0.55;cursor:not-allowed;' : '';
      html += '<div class="sci-suspect-card' + (isSelected ? ' selected' : '') + (isWrong ? ' tried-wrong' : '') + '" data-id="' + s.id + '" style="' + wrongStyle + '">';
      if (isWrong) {
        html += '<div style="position:absolute;top:8px;right:10px;font-size:22px;color:#b85a5a;font-weight:bold;">✗</div>';
      }
      html += '<div class="sci-suspect-row">';
      if (s.charKey && SCI_CHARS[s.charKey]) {
        html += '<div class="sci-suspect-portrait" style="background-image:url(' + SCI_CHARS[s.charKey] + ');"></div>';
      } else {
        html += '<div class="sci-suspect-icon">' + s.icon + '</div>';
      }
      html += '<div class="sci-suspect-info">';
      html += '<div class="sci-suspect-name">' + escapeHtml(s.name) + '</div>';
      html += '<div class="sci-suspect-role">' + escapeHtml(s.role) + '</div>';
      html += '</div></div>';
      html += '<div class="sci-suspect-detail">';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">専門:</span><span>' + escapeHtml(s.specialty) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">外見:</span><span>' + escapeHtml(s.height + ' / ' + s.clothes) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">アリバイ:</span><span>' + escapeHtml(s.alibi) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">証言:</span><span>「' + escapeHtml(s.testimony) + '」</span></div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<button class="sci-hint-toggle" id="wldHintBtn">' + (WorldState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (WorldState.hintShown ? ' show' : '') + '" id="wldHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="wldSubmit"' + (WorldState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="wldFeedback"></div>';
  }
  else if (WorldState.phase === 'resolved') {
    html += '<div class="sci-resolved">';
    html += '<div class="sci-resolved-title">🏆 事件 解決!</div>';
    html += '<div style="font-family:Klee One;font-size:14px;color:var(--deep-ink);line-height:1.7;white-space:pre-wrap;">' + escapeHtml(c.finalQ.explanation) + '</div>';
    html += '<div class="sci-learned-box">';
    html += '<div class="sci-learned-h">' + escapeHtml(c.learned.title) + '</div>';
    c.learned.points.forEach(p => {
      html += '<div class="sci-learned-item">' + escapeHtml(p) + '</div>';
    });
    html += '</div>';
    html += '</div>';
    const nextIdx = WorldState.caseIdx + 1;
    if (nextIdx < WORLD_STORY.length && !WORLD_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="wldGoNext">第' + WORLD_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="wldGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindWorldEvents();
}

function bindWorldEvents() {
  const c = WORLD_STORY[WorldState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (WorldState.phase === 'intro') {
      if (WorldState.introIdx < c.intro.length - 1) {
        sfx('click');
        WorldState.introIdx++;
        renderWorld();
        return true;
      }
    } else if (WorldState.phase === 'step' && WorldState.stepPhase === 'intro') {
      const step = c.steps[WorldState.stepIdx];
      if (WorldState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        WorldState.stepIntroIdx++;
        renderWorld();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('wldDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('wldStage');
  if (stage) {
    stage.onclick = () => {
      if (WorldState.phase === 'intro' ||
          (WorldState.phase === 'step' && WorldState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('wldNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (WorldState.phase === 'intro') {
        if (WorldState.introIdx < c.intro.length - 1) {
          WorldState.introIdx++;
        } else {
          // 단계로 진입
          WorldState.phase = 'step';
          WorldState.stepIdx = 0;
          WorldState.stepPhase = 'intro';
          WorldState.stepIntroIdx = 0;
          WorldState.hintShown = false;
        }
      } else if (WorldState.phase === 'step') {
        const step = c.steps[WorldState.stepIdx];
        if (WorldState.stepPhase === 'intro') {
          if (WorldState.stepIntroIdx < (step.intro || []).length - 1) {
            WorldState.stepIntroIdx++;
          } else {
            WorldState.stepPhase = 'puzzle';
            WorldState.hintShown = false;
            WorldState.answered = false;
          }
        } else if (WorldState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (WorldState.stepIdx < c.steps.length - 1) {
            WorldState.stepIdx++;
            WorldState.stepPhase = 'intro';
            WorldState.stepIntroIdx = 0;
            WorldState.hintShown = false;
          } else {
            WorldState.phase = 'final';
            WorldState.hintShown = false;
            WorldState.selectedSuspectId = null;
            WorldState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            WorldState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderWorld();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('wldHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      WorldState.hintShown = !WorldState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('wldHint');
      if (hintEl) {
        hintEl.classList.toggle('show', WorldState.hintShown);
      }
      hintBtn.textContent = WorldState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (WorldState.phase === 'step' && WorldState.stepPhase === 'puzzle') {
    const step = c.steps[WorldState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (WorldState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('wldFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          WorldState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) WorldState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="wldNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('wldNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            WorldState.stepPhase = 'clue';
            renderWorld();
          };
        } else {
          // 오답: 누른 옵션만 wrong, 정답은 절대 표시하지 않음, explanation도 미공개
          opt.classList.add('answered', 'wrong');
          sfx('wrong');
          // 남은 선택지 수
          const remaining = document.querySelectorAll('.sci-puzzle-opt:not(.wrong)').length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違う…</div>' +
            '<div class="sci-feedback-text">それは 答えでは ない。手がかりを もう一度 考えて、別の 答えを 試そう。残り: ' + remaining + '個</div>' +
            '</div>';
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
        }
      };
    });
  }

  // 용의자 선택 (final phase)
  if (WorldState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (WorldState.answered) return;
        if ((WorldState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        WorldState.selectedSuspectId = card.dataset.id;
        renderWorld();
      };
    });
    const submitBtn = document.getElementById('wldSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!WorldState.selectedSuspectId) return;
        WorldState.answered = true;
        const ok = WorldState.selectedSuspectId === c.finalQ.answer;
        if (ok) {
          // v50: 정답일 때만 정답 카드 강조
          document.querySelectorAll('.sci-suspect-card').forEach(card => {
            if (card.dataset.id === c.finalQ.answer) {
              card.style.borderColor = '#6ba76b';
              card.style.background = '#c8e6c8';
              card.style.opacity = '1';
            }
          });
          sfx('reveal');  // v32: 모순/진실 발견의 긴장감
          setTimeout(() => sfx('resolved'), 800);  // 그 다음 해결의 환희
          triggerConfetti();
          // 클리어 처리
          State.worldCleared[WorldState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            WorldState.phase = 'resolved';
            renderWorld();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!WorldState.wrongIds) WorldState.wrongIds = [];
          if (!WorldState.wrongIds.includes(WorldState.selectedSuspectId)) {
            WorldState.wrongIds.push(WorldState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('wldFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - WorldState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="wldTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('wldTryAgain').onclick = () => {
            sfx('click');
            WorldState.answered = false;
            WorldState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderWorld();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('wldGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startWorldCase(WorldState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('wldGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}


// =========== 🎭 文学・芸術探偵団 (v53) ===========
// =========== 🎭 文学・芸術探偵団 함수들 (v45) ===========
function buildLitGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = LIT_STORY.length;
  const clearedCount = State.litCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">🎭 文学・芸術探偵団 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた発見の謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 科学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  LIT_STORY.forEach((s, i) => {
    const cleared = State.litCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = LIT_STORY[i - 1];
      if (prev.comingSoon || !State.litCleared[i - 1]) locked = true;
    }
    let cls = 'sci-case-card';
    if (locked) cls += ' locked';
    if (cleared) cls += ' cleared';
    if (comingSoon) cls += ' coming-soon';
    html += '<div class="' + cls + '" data-idx="' + i + '">';
    html += '<div class="sci-case-num">第' + s.id + '事件</div>';
    // v32: 일러스트가 있으면 표시, 없으면 큰 이모지
    if (s.illustration) {
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

  // 진행도 안내
  const ready = LIT_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + LIT_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = LIT_STORY[idx];
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
      startLitCase(idx);
    };
  });
}

function startLitCase(idx) {
  LitState.caseIdx = idx;
  LitState.phase = 'intro';
  LitState.introIdx = 0;
  LitState.stepIdx = 0;
  LitState.stepPhase = 'intro';
  LitState.stepIntroIdx = 0;
  LitState.collectedClues = [];
  LitState.selectedSuspectId = null;
  LitState.hintShown = false;
  LitState.answered = false;
  LitState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  LitState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageLit');
  // v32: 사건별 BGM 분위기
  const bgmKey = LIT_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderLit();
}

function renderLit() {
  const c = LIT_STORY[LitState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('litStageBg');
  const stageProg = document.getElementById('litStageProgress');
  const stageChars = document.getElementById('litStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < LitState.stepIdx) cls += ' done';
      else if (i === LitState.stepIdx && LitState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (LitState.phase === 'resolved') finalCls += ' done';
    else if (LitState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (LitState.phase === 'intro') {
      currentLine = c.intro[LitState.introIdx];
    } else if (LitState.phase === 'step' && LitState.stepPhase === 'intro') {
      const step = c.steps[LitState.stepIdx];
      if (step && step.intro) currentLine = step.intro[LitState.stepIntroIdx];
    }

    // 위치 결정 함수 (대화 중인 사람 위치)
    let charLayout = []; // [{key, pos: 'left'|'right'|'center', state: 'speaking'|'dimmed'|''}]

    if (currentLine) {
      const speaker = currentLine.charKey;
      const cls = currentLine.cls || '';
      // v39: 스토리 방식 - 말하는 사람만 등장 (다른 캐릭터는 화면에서 사라짐)
      if (speaker === 'haru') {
        charLayout.push({ key: 'haru', pos: 'left', state: '' });
      } else if (speaker === 'rio') {
        charLayout.push({ key: 'rio', pos: 'right', state: '' });
      } else if (speaker && SCI_CHARS[speaker]) {
        // 박사·용의자가 중앙
        charLayout.push({ key: speaker, pos: 'center', state: '' });
      }
      // 나레이터의 경우는 캐릭터 없이 자막만 표시
    } else if (LitState.phase === 'step' && LitState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (LitState.phase === 'step' && LitState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (LitState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (LitState.phase === 'resolved') {
      // 사건 해결 - 둘 다 환호
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    }

    // 캐릭터 그리기 (말풍선 없이 - 대사는 하단 박스에 표시됨)
    charLayout.forEach(c => {
      if (!SCI_CHARS[c.key]) return;
      charsHtml += '<div class="sci-char ' + c.pos + ' ' + c.state + '" style="background-image:url(' + SCI_CHARS[c.key] + ');"></div>';
    });

    // v41: 음성 재생만 (말풍선 표시는 제거 - 하단 박스에서 텍스트 표시)
    if (currentLine) {
      try { speakLine(currentLine); } catch(e) {}
    }

    stageChars.innerHTML = charsHtml;
  }

  // ===== 하단 AREA 갱신 =====
  const area = document.getElementById('litArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (LitState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[LitState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="litDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (LitState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="litNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (LitState.phase === 'step') {
    const step = c.steps[LitState.stepIdx];
    if (LitState.stepPhase === 'intro') {
      const line = (step.intro || [])[LitState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="litDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (LitState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="litNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (LitState.stepPhase === 'puzzle') {
      // 단서 패널
      if (LitState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + LitState.collectedClues.length + '件)</div>';
        LitState.collectedClues.forEach(cl => {
          html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
        });
        html += '</div>';
      }
      html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;">' + escapeHtml(step.title) + '</div>';
      html += '<div class="sci-puzzle-card">';
      html += '<div class="sci-puzzle-prompt">' + escapeHtml(step.puzzle.prompt) + '</div>';
      html += '<div class="sci-puzzle-options">';
      step.puzzle.options.forEach((opt, i) => {
        html += '<div class="sci-puzzle-opt" data-i="' + i + '">' + (i+1) + '. ' + escapeHtml(opt) + '</div>';
      });
      html += '</div>';
      html += '<button class="sci-hint-toggle" id="litHintBtn">' + (LitState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (LitState.hintShown ? ' show' : '') + '" id="litHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="litFeedback"></div>';
    }
    else if (LitState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = LitState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="litNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (LitState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    LitState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = LitState.selectedSuspectId === s.id;
      const isWrong = (LitState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
      const wrongStyle = isWrong ? 'border-color:#b85a5a;background:#f5c6c6;opacity:0.55;cursor:not-allowed;' : '';
      html += '<div class="sci-suspect-card' + (isSelected ? ' selected' : '') + (isWrong ? ' tried-wrong' : '') + '" data-id="' + s.id + '" style="' + wrongStyle + '">';
      if (isWrong) {
        html += '<div style="position:absolute;top:8px;right:10px;font-size:22px;color:#b85a5a;font-weight:bold;">✗</div>';
      }
      html += '<div class="sci-suspect-row">';
      if (s.charKey && SCI_CHARS[s.charKey]) {
        html += '<div class="sci-suspect-portrait" style="background-image:url(' + SCI_CHARS[s.charKey] + ');"></div>';
      } else {
        html += '<div class="sci-suspect-icon">' + s.icon + '</div>';
      }
      html += '<div class="sci-suspect-info">';
      html += '<div class="sci-suspect-name">' + escapeHtml(s.name) + '</div>';
      html += '<div class="sci-suspect-role">' + escapeHtml(s.role) + '</div>';
      html += '</div></div>';
      html += '<div class="sci-suspect-detail">';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">専門:</span><span>' + escapeHtml(s.specialty) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">外見:</span><span>' + escapeHtml(s.height + ' / ' + s.clothes) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">アリバイ:</span><span>' + escapeHtml(s.alibi) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">証言:</span><span>「' + escapeHtml(s.testimony) + '」</span></div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<button class="sci-hint-toggle" id="litHintBtn">' + (LitState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (LitState.hintShown ? ' show' : '') + '" id="litHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="litSubmit"' + (LitState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="litFeedback"></div>';
  }
  else if (LitState.phase === 'resolved') {
    html += '<div class="sci-resolved">';
    html += '<div class="sci-resolved-title">🏆 事件 解決!</div>';
    html += '<div style="font-family:Klee One;font-size:14px;color:var(--deep-ink);line-height:1.7;white-space:pre-wrap;">' + escapeHtml(c.finalQ.explanation) + '</div>';
    html += '<div class="sci-learned-box">';
    html += '<div class="sci-learned-h">' + escapeHtml(c.learned.title) + '</div>';
    c.learned.points.forEach(p => {
      html += '<div class="sci-learned-item">' + escapeHtml(p) + '</div>';
    });
    html += '</div>';
    html += '</div>';
    const nextIdx = LitState.caseIdx + 1;
    if (nextIdx < LIT_STORY.length && !LIT_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="litGoNext">第' + LIT_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="litGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindLitEvents();
}

function bindLitEvents() {
  const c = LIT_STORY[LitState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (LitState.phase === 'intro') {
      if (LitState.introIdx < c.intro.length - 1) {
        sfx('click');
        LitState.introIdx++;
        renderLit();
        return true;
      }
    } else if (LitState.phase === 'step' && LitState.stepPhase === 'intro') {
      const step = c.steps[LitState.stepIdx];
      if (LitState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        LitState.stepIntroIdx++;
        renderLit();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('litDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('litStage');
  if (stage) {
    stage.onclick = () => {
      if (LitState.phase === 'intro' ||
          (LitState.phase === 'step' && LitState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('litNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (LitState.phase === 'intro') {
        if (LitState.introIdx < c.intro.length - 1) {
          LitState.introIdx++;
        } else {
          // 단계로 진입
          LitState.phase = 'step';
          LitState.stepIdx = 0;
          LitState.stepPhase = 'intro';
          LitState.stepIntroIdx = 0;
          LitState.hintShown = false;
        }
      } else if (LitState.phase === 'step') {
        const step = c.steps[LitState.stepIdx];
        if (LitState.stepPhase === 'intro') {
          if (LitState.stepIntroIdx < (step.intro || []).length - 1) {
            LitState.stepIntroIdx++;
          } else {
            LitState.stepPhase = 'puzzle';
            LitState.hintShown = false;
            LitState.answered = false;
          }
        } else if (LitState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (LitState.stepIdx < c.steps.length - 1) {
            LitState.stepIdx++;
            LitState.stepPhase = 'intro';
            LitState.stepIntroIdx = 0;
            LitState.hintShown = false;
          } else {
            LitState.phase = 'final';
            LitState.hintShown = false;
            LitState.selectedSuspectId = null;
            LitState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            LitState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderLit();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('litHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      LitState.hintShown = !LitState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('litHint');
      if (hintEl) {
        hintEl.classList.toggle('show', LitState.hintShown);
      }
      hintBtn.textContent = LitState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (LitState.phase === 'step' && LitState.stepPhase === 'puzzle') {
    const step = c.steps[LitState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (LitState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('litFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          LitState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) LitState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="litNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('litNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            LitState.stepPhase = 'clue';
            renderLit();
          };
        } else {
          // 오답: 누른 옵션만 wrong, 정답은 절대 표시하지 않음, explanation도 미공개
          opt.classList.add('answered', 'wrong');
          sfx('wrong');
          // 남은 선택지 수
          const remaining = document.querySelectorAll('.sci-puzzle-opt:not(.wrong)').length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違う…</div>' +
            '<div class="sci-feedback-text">それは 答えでは ない。手がかりを もう一度 考えて、別の 答えを 試そう。残り: ' + remaining + '個</div>' +
            '</div>';
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
        }
      };
    });
  }

  // 용의자 선택 (final phase)
  if (LitState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (LitState.answered) return;
        if ((LitState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        LitState.selectedSuspectId = card.dataset.id;
        renderLit();
      };
    });
    const submitBtn = document.getElementById('litSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!LitState.selectedSuspectId) return;
        LitState.answered = true;
        const ok = LitState.selectedSuspectId === c.finalQ.answer;
        if (ok) {
          // v50: 정답일 때만 정답 카드 강조
          document.querySelectorAll('.sci-suspect-card').forEach(card => {
            if (card.dataset.id === c.finalQ.answer) {
              card.style.borderColor = '#6ba76b';
              card.style.background = '#c8e6c8';
              card.style.opacity = '1';
            }
          });
          sfx('reveal');  // v32: 모순/진실 발견의 긴장감
          setTimeout(() => sfx('resolved'), 800);  // 그 다음 해결의 환희
          triggerConfetti();
          // 클리어 처리
          State.litCleared[LitState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            LitState.phase = 'resolved';
            renderLit();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!LitState.wrongIds) LitState.wrongIds = [];
          if (!LitState.wrongIds.includes(LitState.selectedSuspectId)) {
            LitState.wrongIds.push(LitState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('litFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - LitState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="litTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('litTryAgain').onclick = () => {
            sfx('click');
            LitState.answered = false;
            LitState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderLit();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('litGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startLitCase(LitState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('litGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}
// =========== 📊 ビジネス・企業探偵団 (v58) ===========
// =========== 📊 ビジネス・企業探偵団 함수들 (v58) ===========
function buildBizGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = BIZ_STORY.length;
  const clearedCount = State.bizCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">📊 ビジネス・企業探偵団 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた発見の謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 科学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  BIZ_STORY.forEach((s, i) => {
    const cleared = State.bizCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = BIZ_STORY[i - 1];
      if (prev.comingSoon || !State.bizCleared[i - 1]) locked = true;
    }
    let cls = 'sci-case-card';
    if (locked) cls += ' locked';
    if (cleared) cls += ' cleared';
    if (comingSoon) cls += ' coming-soon';
    html += '<div class="' + cls + '" data-idx="' + i + '">';
    html += '<div class="sci-case-num">第' + s.id + '事件</div>';
    // v32: 일러스트가 있으면 표시, 없으면 큰 이모지
    if (s.illustration) {
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

  // 진행도 안내
  const ready = BIZ_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + BIZ_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = BIZ_STORY[idx];
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
      startBizCase(idx);
    };
  });
}

function startBizCase(idx) {
  BizState.caseIdx = idx;
  BizState.phase = 'intro';
  BizState.introIdx = 0;
  BizState.stepIdx = 0;
  BizState.stepPhase = 'intro';
  BizState.stepIntroIdx = 0;
  BizState.collectedClues = [];
  BizState.selectedSuspectId = null;
  BizState.hintShown = false;
  BizState.answered = false;
  BizState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  BizState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageBiz');
  // v32: 사건별 BGM 분위기
  const bgmKey = BIZ_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderBiz();
}

function renderBiz() {
  const c = BIZ_STORY[BizState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('bizStageBg');
  const stageProg = document.getElementById('bizStageProgress');
  const stageChars = document.getElementById('bizStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < BizState.stepIdx) cls += ' done';
      else if (i === BizState.stepIdx && BizState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (BizState.phase === 'resolved') finalCls += ' done';
    else if (BizState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (BizState.phase === 'intro') {
      currentLine = c.intro[BizState.introIdx];
    } else if (BizState.phase === 'step' && BizState.stepPhase === 'intro') {
      const step = c.steps[BizState.stepIdx];
      if (step && step.intro) currentLine = step.intro[BizState.stepIntroIdx];
    }

    // 위치 결정 함수 (대화 중인 사람 위치)
    let charLayout = []; // [{key, pos: 'left'|'right'|'center', state: 'speaking'|'dimmed'|''}]

    if (currentLine) {
      const speaker = currentLine.charKey;
      const cls = currentLine.cls || '';
      // v39: 스토리 방식 - 말하는 사람만 등장 (다른 캐릭터는 화면에서 사라짐)
      if (speaker === 'haru') {
        charLayout.push({ key: 'haru', pos: 'left', state: '' });
      } else if (speaker === 'rio') {
        charLayout.push({ key: 'rio', pos: 'right', state: '' });
      } else if (speaker && SCI_CHARS[speaker]) {
        // 박사·용의자가 중앙
        charLayout.push({ key: speaker, pos: 'center', state: '' });
      }
      // 나레이터의 경우는 캐릭터 없이 자막만 표시
    } else if (BizState.phase === 'step' && BizState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (BizState.phase === 'step' && BizState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (BizState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (BizState.phase === 'resolved') {
      // 사건 해결 - 둘 다 환호
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    }

    // 캐릭터 그리기 (말풍선 없이 - 대사는 하단 박스에 표시됨)
    charLayout.forEach(c => {
      if (!SCI_CHARS[c.key]) return;
      charsHtml += '<div class="sci-char ' + c.pos + ' ' + c.state + '" style="background-image:url(' + SCI_CHARS[c.key] + ');"></div>';
    });

    // v41: 음성 재생만 (말풍선 표시는 제거 - 하단 박스에서 텍스트 표시)
    if (currentLine) {
      try { speakLine(currentLine); } catch(e) {}
    }

    stageChars.innerHTML = charsHtml;
  }

  // ===== 하단 AREA 갱신 =====
  const area = document.getElementById('bizArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (BizState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[BizState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="bizDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (BizState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="bizNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (BizState.phase === 'step') {
    const step = c.steps[BizState.stepIdx];
    if (BizState.stepPhase === 'intro') {
      const line = (step.intro || [])[BizState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="bizDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (BizState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="bizNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (BizState.stepPhase === 'puzzle') {
      // 단서 패널
      if (BizState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + BizState.collectedClues.length + '件)</div>';
        BizState.collectedClues.forEach(cl => {
          html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
        });
        html += '</div>';
      }
      html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;">' + escapeHtml(step.title) + '</div>';
      html += '<div class="sci-puzzle-card">';
      html += '<div class="sci-puzzle-prompt">' + escapeHtml(step.puzzle.prompt) + '</div>';
      html += '<div class="sci-puzzle-options">';
      step.puzzle.options.forEach((opt, i) => {
        html += '<div class="sci-puzzle-opt" data-i="' + i + '">' + (i+1) + '. ' + escapeHtml(opt) + '</div>';
      });
      html += '</div>';
      html += '<button class="sci-hint-toggle" id="bizHintBtn">' + (BizState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (BizState.hintShown ? ' show' : '') + '" id="bizHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="bizFeedback"></div>';
    }
    else if (BizState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = BizState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="bizNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (BizState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    BizState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = BizState.selectedSuspectId === s.id;
      const isWrong = (BizState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
      const wrongStyle = isWrong ? 'border-color:#b85a5a;background:#f5c6c6;opacity:0.55;cursor:not-allowed;' : '';
      html += '<div class="sci-suspect-card' + (isSelected ? ' selected' : '') + (isWrong ? ' tried-wrong' : '') + '" data-id="' + s.id + '" style="' + wrongStyle + '">';
      if (isWrong) {
        html += '<div style="position:absolute;top:8px;right:10px;font-size:22px;color:#b85a5a;font-weight:bold;">✗</div>';
      }
      html += '<div class="sci-suspect-row">';
      if (s.charKey && SCI_CHARS[s.charKey]) {
        html += '<div class="sci-suspect-portrait" style="background-image:url(' + SCI_CHARS[s.charKey] + ');"></div>';
      } else {
        html += '<div class="sci-suspect-icon">' + s.icon + '</div>';
      }
      html += '<div class="sci-suspect-info">';
      html += '<div class="sci-suspect-name">' + escapeHtml(s.name) + '</div>';
      html += '<div class="sci-suspect-role">' + escapeHtml(s.role) + '</div>';
      html += '</div></div>';
      html += '<div class="sci-suspect-detail">';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">専門:</span><span>' + escapeHtml(s.specialty) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">外見:</span><span>' + escapeHtml(s.height + ' / ' + s.clothes) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">アリバイ:</span><span>' + escapeHtml(s.alibi) + '</span></div>';
      html += '<div class="sci-suspect-line"><span class="sci-suspect-key">証言:</span><span>「' + escapeHtml(s.testimony) + '」</span></div>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<button class="sci-hint-toggle" id="bizHintBtn">' + (BizState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (BizState.hintShown ? ' show' : '') + '" id="bizHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="bizSubmit"' + (BizState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="bizFeedback"></div>';
  }
  else if (BizState.phase === 'resolved') {
    html += '<div class="sci-resolved">';
    html += '<div class="sci-resolved-title">🏆 事件 解決!</div>';
    html += '<div style="font-family:Klee One;font-size:14px;color:var(--deep-ink);line-height:1.7;white-space:pre-wrap;">' + escapeHtml(c.finalQ.explanation) + '</div>';
    html += '<div class="sci-learned-box">';
    html += '<div class="sci-learned-h">' + escapeHtml(c.learned.title) + '</div>';
    c.learned.points.forEach(p => {
      html += '<div class="sci-learned-item">' + escapeHtml(p) + '</div>';
    });
    html += '</div>';
    html += '</div>';
    const nextIdx = BizState.caseIdx + 1;
    if (nextIdx < BIZ_STORY.length && !BIZ_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="bizGoNext">第' + BIZ_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="bizGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindBizEvents();
}

function bindBizEvents() {
  const c = BIZ_STORY[BizState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (BizState.phase === 'intro') {
      if (BizState.introIdx < c.intro.length - 1) {
        sfx('click');
        BizState.introIdx++;
        renderBiz();
        return true;
      }
    } else if (BizState.phase === 'step' && BizState.stepPhase === 'intro') {
      const step = c.steps[BizState.stepIdx];
      if (BizState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        BizState.stepIntroIdx++;
        renderBiz();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('bizDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('bizStage');
  if (stage) {
    stage.onclick = () => {
      if (BizState.phase === 'intro' ||
          (BizState.phase === 'step' && BizState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('bizNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (BizState.phase === 'intro') {
        if (BizState.introIdx < c.intro.length - 1) {
          BizState.introIdx++;
        } else {
          // 단계로 진입
          BizState.phase = 'step';
          BizState.stepIdx = 0;
          BizState.stepPhase = 'intro';
          BizState.stepIntroIdx = 0;
          BizState.hintShown = false;
        }
      } else if (BizState.phase === 'step') {
        const step = c.steps[BizState.stepIdx];
        if (BizState.stepPhase === 'intro') {
          if (BizState.stepIntroIdx < (step.intro || []).length - 1) {
            BizState.stepIntroIdx++;
          } else {
            BizState.stepPhase = 'puzzle';
            BizState.hintShown = false;
            BizState.answered = false;
          }
        } else if (BizState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (BizState.stepIdx < c.steps.length - 1) {
            BizState.stepIdx++;
            BizState.stepPhase = 'intro';
            BizState.stepIntroIdx = 0;
            BizState.hintShown = false;
          } else {
            BizState.phase = 'final';
            BizState.hintShown = false;
            BizState.selectedSuspectId = null;
            BizState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            BizState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderBiz();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('bizHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      BizState.hintShown = !BizState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('bizHint');
      if (hintEl) {
        hintEl.classList.toggle('show', BizState.hintShown);
      }
      hintBtn.textContent = BizState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (BizState.phase === 'step' && BizState.stepPhase === 'puzzle') {
    const step = c.steps[BizState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (BizState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('bizFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          BizState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) BizState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="bizNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('bizNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            BizState.stepPhase = 'clue';
            renderBiz();
          };
        } else {
          // 오답: 누른 옵션만 wrong, 정답은 절대 표시하지 않음, explanation도 미공개
          opt.classList.add('answered', 'wrong');
          sfx('wrong');
          // 남은 선택지 수
          const remaining = document.querySelectorAll('.sci-puzzle-opt:not(.wrong)').length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違う…</div>' +
            '<div class="sci-feedback-text">それは 答えでは ない。手がかりを もう一度 考えて、別の 答えを 試そう。残り: ' + remaining + '個</div>' +
            '</div>';
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
        }
      };
    });
  }

  // 용의자 선택 (final phase)
  if (BizState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (BizState.answered) return;
        if ((BizState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        BizState.selectedSuspectId = card.dataset.id;
        renderBiz();
      };
    });
    const submitBtn = document.getElementById('bizSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!BizState.selectedSuspectId) return;
        BizState.answered = true;
        const ok = BizState.selectedSuspectId === c.finalQ.answer;
        if (ok) {
          // v50: 정답일 때만 정답 카드 강조
          document.querySelectorAll('.sci-suspect-card').forEach(card => {
            if (card.dataset.id === c.finalQ.answer) {
              card.style.borderColor = '#6ba76b';
              card.style.background = '#c8e6c8';
              card.style.opacity = '1';
            }
          });
          sfx('reveal');  // v32: 모순/진실 발견의 긴장감
          setTimeout(() => sfx('resolved'), 800);  // 그 다음 해결의 환희
          triggerConfetti();
          // 클리어 처리
          State.bizCleared[BizState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            BizState.phase = 'resolved';
            renderBiz();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!BizState.wrongIds) BizState.wrongIds = [];
          if (!BizState.wrongIds.includes(BizState.selectedSuspectId)) {
            BizState.wrongIds.push(BizState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('bizFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - BizState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="bizTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('bizTryAgain').onclick = () => {
            sfx('click');
            BizState.answered = false;
            BizState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderBiz();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('bizGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startBizCase(BizState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('bizGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}

