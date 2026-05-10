/* engine/detectives-B.js — extracted from index.html (v73 step4a)
 * Original location: lines 5867-8099 (current index.html)
 * Contents: Hist (世界経済・貿易史), Soc (社会), Mon (お金), Wea (気象予報士) detective functions (build/start/render/bind × 4)
 * Dependencies: State, HistState/SocState/MonState/WeaState (defined in detectives-A.js — load AFTER it), sfx, showModal, showPage, saveState, speakLine, stopVoice, recordGameBest, series7-trade/series8-social/series9-money/series10-weather (series .js files)
 */

// =========== 🌐 世界経済・貿易史探偵団 (v62) ===========
// =========== 🌐 世界経済・貿易史探偵団 함수들 (v62) ===========
function buildHistGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = HIST_STORY.length;
  const clearedCount = State.histCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">🌐 世界経済・貿易史探偵団 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた発見の謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 科学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  HIST_STORY.forEach((s, i) => {
    const cleared = State.histCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = HIST_STORY[i - 1];
      if (prev.comingSoon || !State.histCleared[i - 1]) locked = true;
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
  const ready = HIST_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + HIST_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = HIST_STORY[idx];
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
      startHistCase(idx);
    };
  });
}

function startHistCase(idx) {
  HistState.caseIdx = idx;
  HistState.phase = 'intro';
  HistState.introIdx = 0;
  HistState.stepIdx = 0;
  HistState.stepPhase = 'intro';
  HistState.stepIntroIdx = 0;
  HistState.collectedClues = [];
  HistState.selectedSuspectId = null;
  HistState.hintShown = false;
  HistState.answered = false;
  HistState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  HistState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageHist');
  // v32: 사건별 BGM 분위기
  const bgmKey = HIST_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderHist();
}

function renderHist() {
  const c = HIST_STORY[HistState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('histStageBg');
  const stageProg = document.getElementById('histStageProgress');
  const stageChars = document.getElementById('histStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < HistState.stepIdx) cls += ' done';
      else if (i === HistState.stepIdx && HistState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (HistState.phase === 'resolved') finalCls += ' done';
    else if (HistState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (HistState.phase === 'intro') {
      currentLine = c.intro[HistState.introIdx];
    } else if (HistState.phase === 'step' && HistState.stepPhase === 'intro') {
      const step = c.steps[HistState.stepIdx];
      if (step && step.intro) currentLine = step.intro[HistState.stepIntroIdx];
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
    } else if (HistState.phase === 'step' && HistState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (HistState.phase === 'step' && HistState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (HistState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (HistState.phase === 'resolved') {
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
  const area = document.getElementById('histArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (HistState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[HistState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="histDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (HistState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="histNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (HistState.phase === 'step') {
    const step = c.steps[HistState.stepIdx];
    if (HistState.stepPhase === 'intro') {
      const line = (step.intro || [])[HistState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="histDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (HistState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="histNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (HistState.stepPhase === 'puzzle') {
      // 단서 패널
      if (HistState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + HistState.collectedClues.length + '件)</div>';
        HistState.collectedClues.forEach(cl => {
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
      html += '<button class="sci-hint-toggle" id="histHintBtn">' + (HistState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (HistState.hintShown ? ' show' : '') + '" id="histHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="histFeedback"></div>';
    }
    else if (HistState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = HistState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="histNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (HistState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    HistState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = HistState.selectedSuspectId === s.id;
      const isWrong = (HistState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
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
    html += '<button class="sci-hint-toggle" id="histHintBtn">' + (HistState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (HistState.hintShown ? ' show' : '') + '" id="histHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="histSubmit"' + (HistState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="histFeedback"></div>';
  }
  else if (HistState.phase === 'resolved') {
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
    const nextIdx = HistState.caseIdx + 1;
    if (nextIdx < HIST_STORY.length && !HIST_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="histGoNext">第' + HIST_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="histGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindHistEvents();
}

function bindHistEvents() {
  const c = HIST_STORY[HistState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (HistState.phase === 'intro') {
      if (HistState.introIdx < c.intro.length - 1) {
        sfx('click');
        HistState.introIdx++;
        renderHist();
        return true;
      }
    } else if (HistState.phase === 'step' && HistState.stepPhase === 'intro') {
      const step = c.steps[HistState.stepIdx];
      if (HistState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        HistState.stepIntroIdx++;
        renderHist();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('histDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('histStage');
  if (stage) {
    stage.onclick = () => {
      if (HistState.phase === 'intro' ||
          (HistState.phase === 'step' && HistState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('histNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (HistState.phase === 'intro') {
        if (HistState.introIdx < c.intro.length - 1) {
          HistState.introIdx++;
        } else {
          // 단계로 진입
          HistState.phase = 'step';
          HistState.stepIdx = 0;
          HistState.stepPhase = 'intro';
          HistState.stepIntroIdx = 0;
          HistState.hintShown = false;
        }
      } else if (HistState.phase === 'step') {
        const step = c.steps[HistState.stepIdx];
        if (HistState.stepPhase === 'intro') {
          if (HistState.stepIntroIdx < (step.intro || []).length - 1) {
            HistState.stepIntroIdx++;
          } else {
            HistState.stepPhase = 'puzzle';
            HistState.hintShown = false;
            HistState.answered = false;
          }
        } else if (HistState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (HistState.stepIdx < c.steps.length - 1) {
            HistState.stepIdx++;
            HistState.stepPhase = 'intro';
            HistState.stepIntroIdx = 0;
            HistState.hintShown = false;
          } else {
            HistState.phase = 'final';
            HistState.hintShown = false;
            HistState.selectedSuspectId = null;
            HistState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            HistState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderHist();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('histHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      HistState.hintShown = !HistState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('histHint');
      if (hintEl) {
        hintEl.classList.toggle('show', HistState.hintShown);
      }
      hintBtn.textContent = HistState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (HistState.phase === 'step' && HistState.stepPhase === 'puzzle') {
    const step = c.steps[HistState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (HistState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('histFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          HistState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) HistState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="histNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('histNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            HistState.stepPhase = 'clue';
            renderHist();
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
  if (HistState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (HistState.answered) return;
        if ((HistState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        HistState.selectedSuspectId = card.dataset.id;
        renderHist();
      };
    });
    const submitBtn = document.getElementById('histSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!HistState.selectedSuspectId) return;
        HistState.answered = true;
        const ok = HistState.selectedSuspectId === c.finalQ.answer;
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
          State.histCleared[HistState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            HistState.phase = 'resolved';
            renderHist();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!HistState.wrongIds) HistState.wrongIds = [];
          if (!HistState.wrongIds.includes(HistState.selectedSuspectId)) {
            HistState.wrongIds.push(HistState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('histFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - HistState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="histTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('histTryAgain').onclick = () => {
            sfx('click');
            HistState.answered = false;
            HistState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderHist();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('histGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startHistCase(HistState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('histGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}

function buildSocGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = SOC_STORY.length;
  const clearedCount = State.socCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">🏛 社会科総合探偵団 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた発見の謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 科学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  SOC_STORY.forEach((s, i) => {
    const cleared = State.socCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = SOC_STORY[i - 1];
      if (prev.comingSoon || !State.socCleared[i - 1]) locked = true;
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
  const ready = SOC_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + SOC_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = SOC_STORY[idx];
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
      startSocCase(idx);
    };
  });
}

function startSocCase(idx) {
  SocState.caseIdx = idx;
  SocState.phase = 'intro';
  SocState.introIdx = 0;
  SocState.stepIdx = 0;
  SocState.stepPhase = 'intro';
  SocState.stepIntroIdx = 0;
  SocState.collectedClues = [];
  SocState.selectedSuspectId = null;
  SocState.hintShown = false;
  SocState.answered = false;
  SocState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  SocState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageSoc');
  // v32: 사건별 BGM 분위기
  const bgmKey = SOC_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderSoc();
}

function renderSoc() {
  const c = SOC_STORY[SocState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('socStageBg');
  const stageProg = document.getElementById('socStageProgress');
  const stageChars = document.getElementById('socStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < SocState.stepIdx) cls += ' done';
      else if (i === SocState.stepIdx && SocState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (SocState.phase === 'resolved') finalCls += ' done';
    else if (SocState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (SocState.phase === 'intro') {
      currentLine = c.intro[SocState.introIdx];
    } else if (SocState.phase === 'step' && SocState.stepPhase === 'intro') {
      const step = c.steps[SocState.stepIdx];
      if (step && step.intro) currentLine = step.intro[SocState.stepIntroIdx];
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
    } else if (SocState.phase === 'step' && SocState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (SocState.phase === 'step' && SocState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (SocState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (SocState.phase === 'resolved') {
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
  const area = document.getElementById('socArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (SocState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[SocState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="socDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (SocState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="socNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (SocState.phase === 'step') {
    const step = c.steps[SocState.stepIdx];
    if (SocState.stepPhase === 'intro') {
      const line = (step.intro || [])[SocState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="socDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (SocState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="socNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (SocState.stepPhase === 'puzzle') {
      // 단서 패널
      if (SocState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + SocState.collectedClues.length + '件)</div>';
        SocState.collectedClues.forEach(cl => {
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
      html += '<button class="sci-hint-toggle" id="socHintBtn">' + (SocState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (SocState.hintShown ? ' show' : '') + '" id="socHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="socFeedback"></div>';
    }
    else if (SocState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = SocState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="socNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (SocState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    SocState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = SocState.selectedSuspectId === s.id;
      const isWrong = (SocState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
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
    html += '<button class="sci-hint-toggle" id="socHintBtn">' + (SocState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (SocState.hintShown ? ' show' : '') + '" id="socHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="socSubmit"' + (SocState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="socFeedback"></div>';
  }
  else if (SocState.phase === 'resolved') {
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
    const nextIdx = SocState.caseIdx + 1;
    if (nextIdx < SOC_STORY.length && !SOC_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="socGoNext">第' + SOC_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="socGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindSocEvents();
}

function bindSocEvents() {
  const c = SOC_STORY[SocState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (SocState.phase === 'intro') {
      if (SocState.introIdx < c.intro.length - 1) {
        sfx('click');
        SocState.introIdx++;
        renderSoc();
        return true;
      }
    } else if (SocState.phase === 'step' && SocState.stepPhase === 'intro') {
      const step = c.steps[SocState.stepIdx];
      if (SocState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        SocState.stepIntroIdx++;
        renderSoc();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('socDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('socStage');
  if (stage) {
    stage.onclick = () => {
      if (SocState.phase === 'intro' ||
          (SocState.phase === 'step' && SocState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('socNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (SocState.phase === 'intro') {
        if (SocState.introIdx < c.intro.length - 1) {
          SocState.introIdx++;
        } else {
          // 단계로 진입
          SocState.phase = 'step';
          SocState.stepIdx = 0;
          SocState.stepPhase = 'intro';
          SocState.stepIntroIdx = 0;
          SocState.hintShown = false;
        }
      } else if (SocState.phase === 'step') {
        const step = c.steps[SocState.stepIdx];
        if (SocState.stepPhase === 'intro') {
          if (SocState.stepIntroIdx < (step.intro || []).length - 1) {
            SocState.stepIntroIdx++;
          } else {
            SocState.stepPhase = 'puzzle';
            SocState.hintShown = false;
            SocState.answered = false;
          }
        } else if (SocState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (SocState.stepIdx < c.steps.length - 1) {
            SocState.stepIdx++;
            SocState.stepPhase = 'intro';
            SocState.stepIntroIdx = 0;
            SocState.hintShown = false;
          } else {
            SocState.phase = 'final';
            SocState.hintShown = false;
            SocState.selectedSuspectId = null;
            SocState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            SocState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderSoc();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('socHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      SocState.hintShown = !SocState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('socHint');
      if (hintEl) {
        hintEl.classList.toggle('show', SocState.hintShown);
      }
      hintBtn.textContent = SocState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (SocState.phase === 'step' && SocState.stepPhase === 'puzzle') {
    const step = c.steps[SocState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (SocState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('socFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          SocState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) SocState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="socNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('socNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            SocState.stepPhase = 'clue';
            renderSoc();
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
  if (SocState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (SocState.answered) return;
        if ((SocState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        SocState.selectedSuspectId = card.dataset.id;
        renderSoc();
      };
    });
    const submitBtn = document.getElementById('socSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!SocState.selectedSuspectId) return;
        SocState.answered = true;
        const ok = SocState.selectedSuspectId === c.finalQ.answer;
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
          State.socCleared[SocState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            SocState.phase = 'resolved';
            renderSoc();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!SocState.wrongIds) SocState.wrongIds = [];
          if (!SocState.wrongIds.includes(SocState.selectedSuspectId)) {
            SocState.wrongIds.push(SocState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('socFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - SocState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="socTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('socTryAgain').onclick = () => {
            sfx('click');
            SocState.answered = false;
            SocState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderSoc();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('socGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startSocCase(SocState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('socGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}


function buildMonGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = MON_STORY.length;
  const clearedCount = State.monCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">💴 日常のお金 探偵団 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた発見の謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 科学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  MON_STORY.forEach((s, i) => {
    const cleared = State.monCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = MON_STORY[i - 1];
      if (prev.comingSoon || !State.monCleared[i - 1]) locked = true;
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
  const ready = MON_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + MON_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = MON_STORY[idx];
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
      startMonCase(idx);
    };
  });
}

function startMonCase(idx) {
  MonState.caseIdx = idx;
  MonState.phase = 'intro';
  MonState.introIdx = 0;
  MonState.stepIdx = 0;
  MonState.stepPhase = 'intro';
  MonState.stepIntroIdx = 0;
  MonState.collectedClues = [];
  MonState.selectedSuspectId = null;
  MonState.hintShown = false;
  MonState.answered = false;
  MonState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  MonState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageMon');
  // v32: 사건별 BGM 분위기
  const bgmKey = MON_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderMon();
}

function renderMon() {
  const c = MON_STORY[MonState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('monStageBg');
  const stageProg = document.getElementById('monStageProgress');
  const stageChars = document.getElementById('monStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < MonState.stepIdx) cls += ' done';
      else if (i === MonState.stepIdx && MonState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (MonState.phase === 'resolved') finalCls += ' done';
    else if (MonState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (MonState.phase === 'intro') {
      currentLine = c.intro[MonState.introIdx];
    } else if (MonState.phase === 'step' && MonState.stepPhase === 'intro') {
      const step = c.steps[MonState.stepIdx];
      if (step && step.intro) currentLine = step.intro[MonState.stepIntroIdx];
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
    } else if (MonState.phase === 'step' && MonState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (MonState.phase === 'step' && MonState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (MonState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (MonState.phase === 'resolved') {
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
  const area = document.getElementById('monArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (MonState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[MonState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="monDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (MonState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="monNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (MonState.phase === 'step') {
    const step = c.steps[MonState.stepIdx];
    if (MonState.stepPhase === 'intro') {
      const line = (step.intro || [])[MonState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="monDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (MonState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="monNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (MonState.stepPhase === 'puzzle') {
      // 단서 패널
      if (MonState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + MonState.collectedClues.length + '件)</div>';
        MonState.collectedClues.forEach(cl => {
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
      html += '<button class="sci-hint-toggle" id="monHintBtn">' + (MonState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (MonState.hintShown ? ' show' : '') + '" id="monHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="monFeedback"></div>';
    }
    else if (MonState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = MonState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="monNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (MonState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    MonState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = MonState.selectedSuspectId === s.id;
      const isWrong = (MonState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
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
    html += '<button class="sci-hint-toggle" id="monHintBtn">' + (MonState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (MonState.hintShown ? ' show' : '') + '" id="monHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="monSubmit"' + (MonState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="monFeedback"></div>';
  }
  else if (MonState.phase === 'resolved') {
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
    const nextIdx = MonState.caseIdx + 1;
    if (nextIdx < MON_STORY.length && !MON_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="monGoNext">第' + MON_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="monGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindMonEvents();
}

function bindMonEvents() {
  const c = MON_STORY[MonState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (MonState.phase === 'intro') {
      if (MonState.introIdx < c.intro.length - 1) {
        sfx('click');
        MonState.introIdx++;
        renderMon();
        return true;
      }
    } else if (MonState.phase === 'step' && MonState.stepPhase === 'intro') {
      const step = c.steps[MonState.stepIdx];
      if (MonState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        MonState.stepIntroIdx++;
        renderMon();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('monDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('monStage');
  if (stage) {
    stage.onclick = () => {
      if (MonState.phase === 'intro' ||
          (MonState.phase === 'step' && MonState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('monNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (MonState.phase === 'intro') {
        if (MonState.introIdx < c.intro.length - 1) {
          MonState.introIdx++;
        } else {
          // 단계로 진입
          MonState.phase = 'step';
          MonState.stepIdx = 0;
          MonState.stepPhase = 'intro';
          MonState.stepIntroIdx = 0;
          MonState.hintShown = false;
        }
      } else if (MonState.phase === 'step') {
        const step = c.steps[MonState.stepIdx];
        if (MonState.stepPhase === 'intro') {
          if (MonState.stepIntroIdx < (step.intro || []).length - 1) {
            MonState.stepIntroIdx++;
          } else {
            MonState.stepPhase = 'puzzle';
            MonState.hintShown = false;
            MonState.answered = false;
          }
        } else if (MonState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (MonState.stepIdx < c.steps.length - 1) {
            MonState.stepIdx++;
            MonState.stepPhase = 'intro';
            MonState.stepIntroIdx = 0;
            MonState.hintShown = false;
          } else {
            MonState.phase = 'final';
            MonState.hintShown = false;
            MonState.selectedSuspectId = null;
            MonState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            MonState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderMon();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('monHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      MonState.hintShown = !MonState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('monHint');
      if (hintEl) {
        hintEl.classList.toggle('show', MonState.hintShown);
      }
      hintBtn.textContent = MonState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (MonState.phase === 'step' && MonState.stepPhase === 'puzzle') {
    const step = c.steps[MonState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (MonState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('monFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          MonState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) MonState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="monNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('monNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            MonState.stepPhase = 'clue';
            renderMon();
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
  if (MonState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (MonState.answered) return;
        if ((MonState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        MonState.selectedSuspectId = card.dataset.id;
        renderMon();
      };
    });
    const submitBtn = document.getElementById('monSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!MonState.selectedSuspectId) return;
        MonState.answered = true;
        const ok = MonState.selectedSuspectId === c.finalQ.answer;
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
          State.monCleared[MonState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            MonState.phase = 'resolved';
            renderMon();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!MonState.wrongIds) MonState.wrongIds = [];
          if (!MonState.wrongIds.includes(MonState.selectedSuspectId)) {
            MonState.wrongIds.push(MonState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('monFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - MonState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="monTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('monTryAgain').onclick = () => {
            sfx('click');
            MonState.answered = false;
            MonState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderMon();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('monGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startMonCase(MonState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('monGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}


function buildWeaGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = WEA_STORY.length;
  const clearedCount = State.weaCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">🌦 ハルの 夢・気象予報士 探偵団 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた発見の謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 科学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  WEA_STORY.forEach((s, i) => {
    const cleared = State.weaCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = WEA_STORY[i - 1];
      if (prev.comingSoon || !State.weaCleared[i - 1]) locked = true;
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
  const ready = WEA_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + WEA_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = WEA_STORY[idx];
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
      startWeaCase(idx);
    };
  });
}

function startWeaCase(idx) {
  WeaState.caseIdx = idx;
  WeaState.phase = 'intro';
  WeaState.introIdx = 0;
  WeaState.stepIdx = 0;
  WeaState.stepPhase = 'intro';
  WeaState.stepIntroIdx = 0;
  WeaState.collectedClues = [];
  WeaState.selectedSuspectId = null;
  WeaState.hintShown = false;
  WeaState.answered = false;
  WeaState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  WeaState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageWea');
  // v32: 사건별 BGM 분위기
  const bgmKey = WEA_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderWea();
}

function renderWea() {
  const c = WEA_STORY[WeaState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('weaStageBg');
  const stageProg = document.getElementById('weaStageProgress');
  const stageChars = document.getElementById('weaStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < WeaState.stepIdx) cls += ' done';
      else if (i === WeaState.stepIdx && WeaState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (WeaState.phase === 'resolved') finalCls += ' done';
    else if (WeaState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (WeaState.phase === 'intro') {
      currentLine = c.intro[WeaState.introIdx];
    } else if (WeaState.phase === 'step' && WeaState.stepPhase === 'intro') {
      const step = c.steps[WeaState.stepIdx];
      if (step && step.intro) currentLine = step.intro[WeaState.stepIntroIdx];
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
    } else if (WeaState.phase === 'step' && WeaState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (WeaState.phase === 'step' && WeaState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (WeaState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (WeaState.phase === 'resolved') {
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
  const area = document.getElementById('weaArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (WeaState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[WeaState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="weaDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (WeaState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="weaNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (WeaState.phase === 'step') {
    const step = c.steps[WeaState.stepIdx];
    if (WeaState.stepPhase === 'intro') {
      const line = (step.intro || [])[WeaState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="weaDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (WeaState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="weaNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (WeaState.stepPhase === 'puzzle') {
      // 단서 패널
      if (WeaState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + WeaState.collectedClues.length + '件)</div>';
        WeaState.collectedClues.forEach(cl => {
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
      html += '<button class="sci-hint-toggle" id="weaHintBtn">' + (WeaState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (WeaState.hintShown ? ' show' : '') + '" id="weaHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="weaFeedback"></div>';
    }
    else if (WeaState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = WeaState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="weaNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (WeaState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    WeaState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = WeaState.selectedSuspectId === s.id;
      const isWrong = (WeaState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
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
    html += '<button class="sci-hint-toggle" id="weaHintBtn">' + (WeaState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (WeaState.hintShown ? ' show' : '') + '" id="weaHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="weaSubmit"' + (WeaState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="weaFeedback"></div>';
  }
  else if (WeaState.phase === 'resolved') {
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
    const nextIdx = WeaState.caseIdx + 1;
    if (nextIdx < WEA_STORY.length && !WEA_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="weaGoNext">第' + WEA_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="weaGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindWeaEvents();
}

function bindWeaEvents() {
  const c = WEA_STORY[WeaState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (WeaState.phase === 'intro') {
      if (WeaState.introIdx < c.intro.length - 1) {
        sfx('click');
        WeaState.introIdx++;
        renderWea();
        return true;
      }
    } else if (WeaState.phase === 'step' && WeaState.stepPhase === 'intro') {
      const step = c.steps[WeaState.stepIdx];
      if (WeaState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        WeaState.stepIntroIdx++;
        renderWea();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('weaDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('weaStage');
  if (stage) {
    stage.onclick = () => {
      if (WeaState.phase === 'intro' ||
          (WeaState.phase === 'step' && WeaState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('weaNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (WeaState.phase === 'intro') {
        if (WeaState.introIdx < c.intro.length - 1) {
          WeaState.introIdx++;
        } else {
          // 단계로 진입
          WeaState.phase = 'step';
          WeaState.stepIdx = 0;
          WeaState.stepPhase = 'intro';
          WeaState.stepIntroIdx = 0;
          WeaState.hintShown = false;
        }
      } else if (WeaState.phase === 'step') {
        const step = c.steps[WeaState.stepIdx];
        if (WeaState.stepPhase === 'intro') {
          if (WeaState.stepIntroIdx < (step.intro || []).length - 1) {
            WeaState.stepIntroIdx++;
          } else {
            WeaState.stepPhase = 'puzzle';
            WeaState.hintShown = false;
            WeaState.answered = false;
          }
        } else if (WeaState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (WeaState.stepIdx < c.steps.length - 1) {
            WeaState.stepIdx++;
            WeaState.stepPhase = 'intro';
            WeaState.stepIntroIdx = 0;
            WeaState.hintShown = false;
          } else {
            WeaState.phase = 'final';
            WeaState.hintShown = false;
            WeaState.selectedSuspectId = null;
            WeaState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            WeaState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderWea();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('weaHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      WeaState.hintShown = !WeaState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('weaHint');
      if (hintEl) {
        hintEl.classList.toggle('show', WeaState.hintShown);
      }
      hintBtn.textContent = WeaState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (WeaState.phase === 'step' && WeaState.stepPhase === 'puzzle') {
    const step = c.steps[WeaState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (WeaState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('weaFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          WeaState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) WeaState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="weaNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('weaNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            WeaState.stepPhase = 'clue';
            renderWea();
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
  if (WeaState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (WeaState.answered) return;
        if ((WeaState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        WeaState.selectedSuspectId = card.dataset.id;
        renderWea();
      };
    });
    const submitBtn = document.getElementById('weaSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!WeaState.selectedSuspectId) return;
        WeaState.answered = true;
        const ok = WeaState.selectedSuspectId === c.finalQ.answer;
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
          State.weaCleared[WeaState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            WeaState.phase = 'resolved';
            renderWea();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!WeaState.wrongIds) WeaState.wrongIds = [];
          if (!WeaState.wrongIds.includes(WeaState.selectedSuspectId)) {
            WeaState.wrongIds.push(WeaState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('weaFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - WeaState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="weaTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('weaTryAgain').onclick = () => {
            sfx('click');
            WeaState.answered = false;
            WeaState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderWea();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('weaGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startWeaCase(WeaState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('weaGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}



// ============================================================
// v75: 🔢 算数·数学 探偵団 (series 11) — Phase 4c-2 implementation
// ============================================================
// Weather (series 10) 패턴 정밀 mirror. 변경: Wea→Math / WEA_→MATH_ /
// weaCleared→mathCleared / weaArea·weaStage*→mathArea·mathStage* /
// pageWea→pageMath / btnVoiceWea·btnBackWea→btnVoiceMath·btnBackMath.
// 헤더 텍스트 3 군데 contextual 적응 (시리즈명·서브타이틀·설명).

function buildMathGrid(grid) {
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'grid-column:1/-1;';

  const totalCases = MATH_STORY.length;
  const clearedCount = State.mathCleared.filter(c => c).length;

  let html = '<div class="sci-header">';
  html += '<div class="sci-h-title">🔢 算数·数学 探偵団 ハル & リオ</div>';
  html += '<div class="sci-h-sub">~消えた図形と 数の 謎~</div>';
  html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
  html += '深い 推理と 算数·数学の 知識で 事件を 解決しよう! (進行: ' + clearedCount + ' / ' + totalCases + ')';
  html += '</div>';
  html += '</div>';

  // 사건 카드들
  MATH_STORY.forEach((s, i) => {
    const cleared = State.mathCleared[i];
    const comingSoon = s.comingSoon;
    // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
    let locked = false;
    if (i > 0) {
      // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
      const prev = MATH_STORY[i - 1];
      if (prev.comingSoon || !State.mathCleared[i - 1]) locked = true;
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
  const ready = MATH_STORY.filter(s => !s.comingSoon).length;
  html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
  html += '🔬 現在 ' + ready + ' / ' + MATH_STORY.length + ' 事件 公開中。残りは 準備中です。';
  html += '</div>';

  wrapper.innerHTML = html;
  grid.appendChild(wrapper);

  wrapper.querySelectorAll('.sci-case-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.dataset.idx);
      const s = MATH_STORY[idx];
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
      startMathCase(idx);
    };
  });
}

function startMathCase(idx) {
  MathState.caseIdx = idx;
  MathState.phase = 'intro';
  MathState.introIdx = 0;
  MathState.stepIdx = 0;
  MathState.stepPhase = 'intro';
  MathState.stepIntroIdx = 0;
  MathState.collectedClues = [];
  MathState.selectedSuspectId = null;
  MathState.hintShown = false;
  MathState.answered = false;
  MathState.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
  MathState.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
  showPage('pageMath');
  // v32: 사건별 BGM 분위기
  const bgmKey = MATH_STORY[idx].bgm || 'mystery';
  playBGM(bgmKey);
  renderMath();
}

function renderMath() {
  const c = MATH_STORY[MathState.caseIdx];

  // ===== 상단 STAGE 갱신 =====
  const stageBg = document.getElementById('mathStageBg');
  const stageProg = document.getElementById('mathStageProgress');
  const stageChars = document.getElementById('mathStageChars');

  // 배경: 항상 사건 일러스트
  if (stageBg && c.illustration) {
    stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
  }

  // 진행 dot
  if (stageProg) {
    let progHtml = '';
    c.steps.forEach((s, i) => {
      let cls = 'pdot';
      if (i < MathState.stepIdx) cls += ' done';
      else if (i === MathState.stepIdx && MathState.phase === 'step') cls += ' current';
      progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
    });
    let finalCls = 'pdot';
    if (MathState.phase === 'resolved') finalCls += ' done';
    else if (MathState.phase === 'final') finalCls += ' current';
    progHtml += '<div class="' + finalCls + '">🔍</div>';
    stageProg.innerHTML = progHtml;
  }

  // 캐릭터 컷인 + 말풍선
  if (stageChars) {
    let charsHtml = '';
    let currentLine = null;

    if (MathState.phase === 'intro') {
      currentLine = c.intro[MathState.introIdx];
    } else if (MathState.phase === 'step' && MathState.stepPhase === 'intro') {
      const step = c.steps[MathState.stepIdx];
      if (step && step.intro) currentLine = step.intro[MathState.stepIntroIdx];
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
    } else if (MathState.phase === 'step' && MathState.stepPhase === 'puzzle') {
      // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (MathState.phase === 'step' && MathState.stepPhase === 'clue') {
      // 단서 발견 - 둘 다 기뻐
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (MathState.phase === 'final') {
      // 최종 추리 - ハル·リオ가 함께
      charLayout.push({ key: 'haru', pos: 'left', state: '' });
      charLayout.push({ key: 'rio', pos: 'right', state: '' });
    } else if (MathState.phase === 'resolved') {
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
  const area = document.getElementById('mathArea');
  let html = '';

  // 사건 제목 미니 헤더
  html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
  html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
  html += '</div>';

  if (MathState.phase === 'intro') {
    // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
    const line = c.intro[MathState.introIdx];
    const cls = line.cls || 'haru';
    html += '<div class="sci-dialogue" id="mathDialogue">';
    html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
    html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
    if (MathState.introIdx < c.intro.length - 1) {
      html += '<span class="tap-hint">▼ タップ</span>';
    } else {
      html += '<button class="sci-next-btn" id="mathNext" style="margin-top:14px;">🔍 捜査 開始!</button>';
    }
    html += '</div>';
  }
  else if (MathState.phase === 'step') {
    const step = c.steps[MathState.stepIdx];
    if (MathState.stepPhase === 'intro') {
      const line = (step.intro || [])[MathState.stepIntroIdx];
      if (line) {
        const cls = line.cls || 'haru';
        html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
        html += '<div class="sci-dialogue" id="mathDialogue">';
        html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
        html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
        if (MathState.stepIntroIdx < (step.intro || []).length - 1) {
          html += '<span class="tap-hint">▼ タップ</span>';
        } else {
          html += '<button class="sci-next-btn" id="mathNext" style="margin-top:10px;">問題に 進む →</button>';
        }
        html += '</div>';
      }
    }
    else if (MathState.stepPhase === 'puzzle') {
      // 단서 패널
      if (MathState.collectedClues.length > 0) {
        html += '<div class="sci-notes-panel">';
        html += '<div class="sci-notes-h">📓 捜査ノート (' + MathState.collectedClues.length + '件)</div>';
        MathState.collectedClues.forEach(cl => {
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
      html += '<button class="sci-hint-toggle" id="mathHintBtn">' + (MathState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
      html += '<div class="sci-puzzle-hint' + (MathState.hintShown ? ' show' : '') + '" id="mathHint">';
      html += '💡 ' + escapeHtml(step.puzzle.hint);
      html += '</div>';
      html += '</div>';
      html += '<div id="mathFeedback"></div>';
    }
    else if (MathState.stepPhase === 'clue') {
      html += '<div class="sci-clue-note">';
      html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
      html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
      html += '</div>';
      const isLastStep = MathState.stepIdx >= c.steps.length - 1;
      html += '<button class="sci-next-btn" id="mathNext">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
    }
  }
  else if (MathState.phase === 'final') {
    html += '<div class="sci-notes-panel">';
    html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
    MathState.collectedClues.forEach(cl => {
      html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
    });
    html += '</div>';
    html += '<div class="sci-puzzle-card">';
    html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
    html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
    html += '<div class="sci-suspects-grid">';
    c.suspects.forEach(s => {
      const isSelected = MathState.selectedSuspectId === s.id;
      const isWrong = (MathState.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
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
    html += '<button class="sci-hint-toggle" id="mathHintBtn">' + (MathState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る') + '</button>';
    html += '<div class="sci-puzzle-hint' + (MathState.hintShown ? ' show' : '') + '" id="mathHint">';
    html += '💡 ' + escapeHtml(c.finalQ.hint);
    html += '</div>';
    html += '<button class="sci-next-btn" id="mathSubmit"' + (MathState.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
    html += '</div>';
    html += '<div id="mathFeedback"></div>';
  }
  else if (MathState.phase === 'resolved') {
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
    const nextIdx = MathState.caseIdx + 1;
    if (nextIdx < MATH_STORY.length && !MATH_STORY[nextIdx].comingSoon) {
      html += '<button class="sci-next-btn" id="mathGoNext">第' + MATH_STORY[nextIdx].id + '事件 へ →</button>';
    }
    html += '<button class="sci-next-btn" id="mathGoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
  }

  area.innerHTML = html;
  bindMathEvents();
}

function bindMathEvents() {
  const c = MATH_STORY[MathState.caseIdx];

  // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
  const advanceDialog = () => {
    if (MathState.phase === 'intro') {
      if (MathState.introIdx < c.intro.length - 1) {
        sfx('click');
        MathState.introIdx++;
        renderMath();
        return true;
      }
    } else if (MathState.phase === 'step' && MathState.stepPhase === 'intro') {
      const step = c.steps[MathState.stepIdx];
      if (MathState.stepIntroIdx < (step.intro || []).length - 1) {
        sfx('click');
        MathState.stepIntroIdx++;
        renderMath();
        return true;
      }
    }
    return false;
  };

  // 대사 박스 클릭
  const dlgBox = document.getElementById('mathDialogue');
  if (dlgBox) dlgBox.onclick = advanceDialog;

  // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
  const stage = document.getElementById('mathStage');
  if (stage) {
    stage.onclick = () => {
      if (MathState.phase === 'intro' ||
          (MathState.phase === 'step' && MathState.stepPhase === 'intro')) {
        advanceDialog();
      }
    };
  }

  // 다음 버튼
  const nextBtn = document.getElementById('mathNext');
  if (nextBtn) {
    nextBtn.onclick = () => {
      sfx('click');
      if (MathState.phase === 'intro') {
        if (MathState.introIdx < c.intro.length - 1) {
          MathState.introIdx++;
        } else {
          // 단계로 진입
          MathState.phase = 'step';
          MathState.stepIdx = 0;
          MathState.stepPhase = 'intro';
          MathState.stepIntroIdx = 0;
          MathState.hintShown = false;
        }
      } else if (MathState.phase === 'step') {
        const step = c.steps[MathState.stepIdx];
        if (MathState.stepPhase === 'intro') {
          if (MathState.stepIntroIdx < (step.intro || []).length - 1) {
            MathState.stepIntroIdx++;
          } else {
            MathState.stepPhase = 'puzzle';
            MathState.hintShown = false;
            MathState.answered = false;
          }
        } else if (MathState.stepPhase === 'clue') {
          // 다음 단계 또는 최종
          if (MathState.stepIdx < c.steps.length - 1) {
            MathState.stepIdx++;
            MathState.stepPhase = 'intro';
            MathState.stepIntroIdx = 0;
            MathState.hintShown = false;
          } else {
            MathState.phase = 'final';
            MathState.hintShown = false;
            MathState.selectedSuspectId = null;
            MathState.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
            MathState.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
          }
        }
      }
      renderMath();
    };
  }

  // 힌트 토글
  const hintBtn = document.getElementById('mathHintBtn');
  if (hintBtn) {
    hintBtn.onclick = () => {
      MathState.hintShown = !MathState.hintShown;
      sfx('click');
      // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
      const hintEl = document.getElementById('mathHint');
      if (hintEl) {
        hintEl.classList.toggle('show', MathState.hintShown);
      }
      hintBtn.textContent = MathState.hintShown ? '💡 ヒントを 隠す' : '💡 ヒントを 見る';
    };
  }

  // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
  if (MathState.phase === 'step' && MathState.stepPhase === 'puzzle') {
    const step = c.steps[MathState.stepIdx];
    document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
      opt.onclick = () => {
        if (MathState.answered) return;
        if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
        const chosen = parseInt(opt.dataset.i);
        const correct = step.puzzle.answer;
        const ok = chosen === correct;
        const fb = document.getElementById('mathFeedback');

        if (ok) {
          // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
          MathState.answered = true;
          document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
            o.classList.add('answered');
            if (i === correct) o.classList.add('correct');
          });
          sfx('unlock');
          let fbHtml = '<div class="sci-feedback ok">';
          fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
          fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
          fbHtml += '</div>';
          if (step.clue) MathState.collectedClues.push(step.clue);
          fbHtml += '<button class="sci-next-btn" id="mathNextOk">続ける →</button>';
          fb.innerHTML = fbHtml;
          setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
          const nb = document.getElementById('mathNextOk');
          if (nb) nb.onclick = () => {
            sfx('clue');
            MathState.stepPhase = 'clue';
            renderMath();
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
  if (MathState.phase === 'final') {
    document.querySelectorAll('.sci-suspect-card').forEach(card => {
      card.onclick = () => {
        if (MathState.answered) return;
        if ((MathState.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
        sfx('select');  // v32: 용의자 선택
        MathState.selectedSuspectId = card.dataset.id;
        renderMath();
      };
    });
    const submitBtn = document.getElementById('mathSubmit');
    if (submitBtn) {
      submitBtn.onclick = () => {
        if (!MathState.selectedSuspectId) return;
        MathState.answered = true;
        const ok = MathState.selectedSuspectId === c.finalQ.answer;
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
          State.mathCleared[MathState.caseIdx] = true;
          saveState();
          setTimeout(() => {
            MathState.phase = 'resolved';
            renderMath();
          }, 1800);
        } else {
          // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
          if (!MathState.wrongIds) MathState.wrongIds = [];
          if (!MathState.wrongIds.includes(MathState.selectedSuspectId)) {
            MathState.wrongIds.push(MathState.selectedSuspectId);
          }
          sfx('wrong');
          const fb = document.getElementById('mathFeedback');
          // 남은 용의자 수 계산 (정답 힌트 X)
          const remaining = c.suspects.length - MathState.wrongIds.length;
          fb.innerHTML = '<div class="sci-feedback ng">' +
            '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
            '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
            '</div>' +
            '<button class="sci-next-btn" id="mathTryAgain" style="background:#b85a5a;">もう一度 推理</button>';
          document.getElementById('mathTryAgain').onclick = () => {
            sfx('click');
            MathState.answered = false;
            MathState.selectedSuspectId = null;
            // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
            renderMath();
          };
        }
      };
    }
  }

  // 해결 후 버튼
  const goNext = document.getElementById('mathGoNext');
  if (goNext) {
    goNext.onclick = () => { sfx('click'); startMathCase(MathState.caseIdx + 1); };
  }
  const goMenu = document.getElementById('mathGoMenu');
  if (goMenu) {
    goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
  }
}

// ============================================================
// Series 4 — 偉人科学者ファイル (placeholder grid)
// Mirrors buildMathGrid; chapters are all comingSoon=true until
// SERIES4_CONTENT_SPEC.md fills in stories. startScientistsCase
// is a defensive stub (never reached via the grid since every card
// triggers the 準備中 modal).
// ============================================================
const ScientistsState = {
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
  wrongSuspects: [],
  wrongIds: [],
};

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
  // Placeholder stub — real flow lands with SERIES4_CONTENT_SPEC.
  // Since every chapter is currently comingSoon, this should never
  // be reached from the grid. Defensive fallback shows the same
  // 準備中 modal users would see from a card click.
  ScientistsState.caseIdx = idx;
  showModal('🚧', '準備中', 'この 事件は まだ 準備中です。\nもうしばらく お待ちください!',
    [{text:'OK', cb:closeModal}], 'fail');
}
