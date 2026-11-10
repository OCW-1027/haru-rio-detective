/* engine/case-engine.js — v2 P3: 공통 사건 엔진
 * 시리즈 2·3·5~11 (science/world/lit/biz/hist/soc/mon/wea/math) 이 똑같이 복사해 쓰던
 * build*Grid / start*Case / render* / bind*Events 를 하나로 합친 것.
 * 시리즈를 추가하려면 CaseEngine.register({...}) 한 번이면 된다.
 * Dependencies: State, sfx, showModal, closeModal, showPage, saveState, playBGM, speakLine,
 *               stopVoice, escapeHtml, SCI_CHARS
 */
const CaseEngine = (function () {
  const registry = {};

  // v2: 별점 — 오답·힌트 0회 ⭐3 / 합계 2회까지 ⭐2 / 그 이상 ⭐1
  function calcStars(st) {
    const n = (st.mistakes || 0) + (st.hintsUsed || 0);
    return n === 0 ? 3 : n <= 2 ? 2 : 1;
  }
  function starText(n) { return '⭐'.repeat(n) + '<span class="v2-star-off">' + '☆'.repeat(3 - n) + '</span>'; }

  function create(cfg) {
    const STORY = cfg.story;
    const st = cfg.state;
    const P = cfg.idPrefix;
    const HINT_SHOW = '💡 コラドンに ヒントを もらう';
    const HINT_HIDE = '💡 ヒントを 隠す';
    const KORADON_TAG = '<img class="v2-koradon" src="assets/img/chars/spirits/koradon_greet_01.webp" alt=""><strong>コラドン:</strong> ';
    const KORARIN_IMG = 'assets/img/chars/spirits/korarin_greet_01.webp';

  function buildGrid(grid) {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'grid-column:1/-1;';

    const totalCases = STORY.length;
    const clearedCount = State[cfg.clearedKey].filter(c => c).length;

    let html = '<div class="sci-header">';
    html += '<div class="sci-h-title">' + cfg.title + '</div>';
    html += '<div class="sci-h-sub">' + cfg.sub + '</div>';
    html += '<div style="font-size:12px;color:#4a8a9a;margin-top:6px;font-family:Klee One;">';
    html += cfg.desc + ' (進行: ' + clearedCount + ' / ' + totalCases + ')';
    html += '</div>';
    const dueN = ReviewEngine.dueCount(cfg.key);
    if (dueN > 0) html += '<button class="v2-review-btn" id="' + P + 'ReviewBtn">🔁 まちがえた 問題を 復習 (' + dueN + '問)</button>';
    html += '</div>';

    // 사건 카드들
    STORY.forEach((s, i) => {
      const cleared = State[cfg.clearedKey][i];
      const comingSoon = s.comingSoon;
      // 잠금 조건: 이전 장 클리어 + 준비완료 사건만
      let locked = false;
      if (i > 0) {
        // 이전 장이 comingSoon이거나 클리어 안 했으면 잠금
        const prev = STORY[i - 1];
        if (prev.comingSoon || !State[cfg.clearedKey][i - 1]) locked = true;
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
        html += '<div class="sci-case-stars">' + (cleared ? starText(GameV2.getStars(cfg.key, i)) : '') + '</div>';
      }
      if (locked && !comingSoon) html += '<div class="sci-case-lock">🔒</div>';
      html += '</div>';
    });

    // 진행도 안내
    const ready = STORY.filter(s => !s.comingSoon).length;
    html += '<div style="background:rgba(255,255,255,0.7);border:2px solid #2a7a8a;border-radius:14px;padding:10px 14px;text-align:center;color:#1a4a5a;font-family:Klee One;font-size:12px;margin-top:8px;">';
    html += '🔬 現在 ' + ready + ' / ' + STORY.length + ' 事件 公開中。残りは 準備中です。';
    html += '</div>';

    wrapper.innerHTML = html;
    grid.appendChild(wrapper);

    const rvBtn = wrapper.querySelector('.v2-review-btn');
    if (rvBtn) rvBtn.onclick = () => { sfx('click'); ReviewEngine.open(cfg.key, () => { buildChapterGrid(); }); };

    wrapper.querySelectorAll('.sci-case-card').forEach(card => {
      card.onclick = () => {
        const idx = parseInt(card.dataset.idx);
        const s = STORY[idx];
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
        startCase(idx);
      };
    });
  }

  function startCase(idx) {
    st.caseIdx = idx;
    st.phase = 'intro';
    st.introIdx = 0;
    st.stepIdx = 0;
    st.stepPhase = 'intro';
    st.stepIntroIdx = 0;
    st.collectedClues = [];
    st.selectedSuspectId = null;
    st.hintShown = false;
    st.answered = false;
    st.wrongSuspects = [];  // v51: 추리 단계에서 틀린 용의자 누적
    st.wrongIds = [];  // v50: 한 번 틀린 용의자 ID 모음 (정답이 자동 노출되지 않도록)
    st.mistakes = 0;     // v2: 이번 도전의 오답 수 (별점 계산)
    st.hintsUsed = 0;    // v2: 코라돈 힌트를 본 횟수
    st.hintCounted = {}; // v2: 같은 문제의 힌트는 한 번만 센다
    showPage(cfg.page);
    // v32: 사건별 BGM 분위기
    const bgmKey = STORY[idx].bgm || 'mystery';
    playBGM(bgmKey);
    render();
  }

  function render() {
    const c = STORY[st.caseIdx];

    // ===== 상단 STAGE 갱신 =====
    const stageBg = document.getElementById((P + 'StageBg'));
    const stageProg = document.getElementById((P + 'StageProgress'));
    const stageChars = document.getElementById((P + 'StageChars'));

    // 배경: 항상 사건 일러스트
    if (stageBg && c.illustration) {
      stageBg.style.backgroundImage = 'url(' + c.illustration + ')';
    }

    // 진행 dot
    if (stageProg) {
      let progHtml = '';
      c.steps.forEach((s, i) => {
        let cls = 'pdot';
        if (i < st.stepIdx) cls += ' done';
        else if (i === st.stepIdx && st.phase === 'step') cls += ' current';
        progHtml += '<div class="' + cls + '">' + (i+1) + '</div>';
      });
      let finalCls = 'pdot';
      if (st.phase === 'resolved') finalCls += ' done';
      else if (st.phase === 'final') finalCls += ' current';
      progHtml += '<div class="' + finalCls + '">🔍</div>';
      stageProg.innerHTML = progHtml;
    }

    // 캐릭터 컷인 + 말풍선
    if (stageChars) {
      let charsHtml = '';
      let currentLine = null;

      if (st.phase === 'intro') {
        currentLine = c.intro[st.introIdx];
      } else if (st.phase === 'step' && st.stepPhase === 'intro') {
        const step = c.steps[st.stepIdx];
        if (step && step.intro) currentLine = step.intro[st.stepIntroIdx];
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
      } else if (st.phase === 'step' && st.stepPhase === 'puzzle') {
        // 퍼즐 풀이 중 - ハル·リオ 둘 다 (생각하는 모습)
        charLayout.push({ key: 'haru', pos: 'left', state: '' });
        charLayout.push({ key: 'rio', pos: 'right', state: '' });
      } else if (st.phase === 'step' && st.stepPhase === 'clue') {
        // 단서 발견 - 둘 다 기뻐
        charLayout.push({ key: 'haru', pos: 'left', state: '' });
        charLayout.push({ key: 'rio', pos: 'right', state: '' });
      } else if (st.phase === 'final') {
        // 최종 추리 - ハル·リオ가 함께
        charLayout.push({ key: 'haru', pos: 'left', state: '' });
        charLayout.push({ key: 'rio', pos: 'right', state: '' });
      } else if (st.phase === 'resolved') {
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
    const area = document.getElementById(cfg.areaId);
    let html = '';

    // 사건 제목 미니 헤더
    html += '<div style="font-family:RocknRoll One;font-size:13px;color:#1a4a5a;margin-bottom:8px;text-align:center;">';
    html += c.icon + ' 第' + c.id + '事件: ' + escapeHtml(c.title);
    html += '</div>';

    if (st.phase === 'intro') {
      // v41: 기존 스토리 풍 대사 박스 (위는 캐릭터, 아래는 대사)
      const line = c.intro[st.introIdx];
      const cls = line.cls || 'haru';
      html += '<div class="sci-dialogue" id="' + P + 'Dialogue">';
      html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
      html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
      if (st.introIdx < c.intro.length - 1) {
        html += '<span class="tap-hint">▼ タップ</span>';
      } else {
        html += '<button class="sci-next-btn" id="' + P + 'Next" style="margin-top:14px;">🔍 捜査 開始!</button>';
      }
      html += '</div>';
    }
    else if (st.phase === 'step') {
      const step = c.steps[st.stepIdx];
      if (st.stepPhase === 'intro') {
        const line = (step.intro || [])[st.stepIntroIdx];
        if (line) {
          const cls = line.cls || 'haru';
          html += '<div style="font-family:RocknRoll One;font-size:14px;color:#8a6a2a;margin-bottom:6px;text-align:center;">' + escapeHtml(step.title) + '</div>';
          html += '<div class="sci-dialogue" id="' + P + 'Dialogue">';
          html += '<span class="speaker-bubble ' + cls + '">' + escapeHtml(line.speaker) + '</span>';
          html += '<div class="dialogue-content">' + escapeHtml(line.text) + '</div>';
          if (st.stepIntroIdx < (step.intro || []).length - 1) {
            html += '<span class="tap-hint">▼ タップ</span>';
          } else {
            html += '<button class="sci-next-btn" id="' + P + 'Next" style="margin-top:10px;">問題に 進む →</button>';
          }
          html += '</div>';
        }
      }
      else if (st.stepPhase === 'puzzle') {
        // 단서 패널
        if (st.collectedClues.length > 0) {
          html += '<div class="sci-notes-panel">';
          html += '<div class="sci-notes-h">📓 捜査ノート (' + st.collectedClues.length + '件)</div>';
          st.collectedClues.forEach(cl => {
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
        html += '<button class="sci-hint-toggle" id="' + P + 'HintBtn">' + (st.hintShown ? HINT_HIDE : HINT_SHOW) + '</button>';
        html += '<div class="sci-puzzle-hint' + (st.hintShown ? ' show' : '') + '" id="' + P + 'Hint">';
        html += KORADON_TAG + escapeHtml(step.puzzle.hint);
        html += '</div>';
        html += '</div>';
        html += '<div id="' + P + 'Feedback"></div>';
      }
      else if (st.stepPhase === 'clue') {
        html += '<div class="sci-clue-note">';
        html += '<div class="sci-clue-h">📓 新しい 手がかりを 発見!</div>';
        html += '<div class="sci-clue-text"><strong>' + escapeHtml(step.clue.title) + ':</strong> ' + escapeHtml(step.clue.desc) + '</div>';
        html += '</div>';
        const isLastStep = st.stepIdx >= c.steps.length - 1;
        html += '<button class="sci-next-btn" id="' + P + 'Next">' + (isLastStep ? '🔍 容疑者の 確認 →' : '次の STEP →') + '</button>';
      }
    }
    else if (st.phase === 'final') {
      html += '<div class="sci-notes-panel">';
      html += '<div class="sci-notes-h">📓 捜査ノート 全件</div>';
      st.collectedClues.forEach(cl => {
        html += '<div class="sci-notes-item"><strong>' + escapeHtml(cl.title) + ':</strong> ' + escapeHtml(cl.desc) + '</div>';
      });
      html += '</div>';
      html += '<div class="sci-puzzle-card">';
      html += '<div class="sci-puzzle-prompt">' + escapeHtml(c.finalQ.prompt) + '</div>';
      html += '<div style="font-family:RocknRoll One;font-size:15px;color:#8a6a2a;margin:10px 0 6px;">' + escapeHtml(c.finalQ.question) + '</div>';
      html += '<div class="sci-suspects-grid">';
      c.suspects.forEach(s => {
        const isSelected = st.selectedSuspectId === s.id;
        const isWrong = (st.wrongIds || []).includes(s.id);  // v50: 이미 틀린 용의자
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
      html += '<button class="sci-hint-toggle" id="' + P + 'HintBtn">' + (st.hintShown ? HINT_HIDE : HINT_SHOW) + '</button>';
      html += '<div class="sci-puzzle-hint' + (st.hintShown ? ' show' : '') + '" id="' + P + 'Hint">';
      html += KORADON_TAG + escapeHtml(c.finalQ.hint);
      html += '</div>';
      html += '<button class="sci-next-btn" id="' + P + 'Submit"' + (st.selectedSuspectId ? '' : ' disabled style="opacity:0.5;"') + '>🔍 この人物を 推理する!</button>';
      html += '</div>';
      html += '<div id="' + P + 'Feedback"></div>';
    }
    else if (st.phase === 'resolved') {
      html += '<div class="sci-resolved">';
      html += '<div class="sci-resolved-title">🏆 事件 解決!</div>';
      const gotStars = st.lastStars || 3;
      html += '<div class="v2-stars-result">' + starText(gotStars) + '<span>' + (gotStars === 3 ? 'ノーミス! 完ぺきな 推理!' : gotStars === 2 ? 'ナイス 推理! ノーミスで ⭐3つに 挑戦しよう' : '解決! もう一度 挑戦して ⭐を ふやそう') + '</span></div>';
      html += '<div style="font-family:Klee One;font-size:14px;color:var(--deep-ink);line-height:1.7;white-space:pre-wrap;">' + escapeHtml(c.finalQ.explanation) + '</div>';
      html += '<div class="sci-learned-box">';
      html += '<div class="v2-korarin-h"><img src="' + KORARIN_IMG + '" alt=""><span>コラリンの まとめ</span></div>';
      html += '<div class="sci-learned-h">' + escapeHtml(c.learned.title) + '</div>';
      c.learned.points.forEach(p => {
        html += '<div class="sci-learned-item">' + escapeHtml(p) + '</div>';
      });
      html += '</div>';
      html += '</div>';
      const nextIdx = st.caseIdx + 1;
      if (nextIdx < STORY.length && !STORY[nextIdx].comingSoon) {
        html += '<button class="sci-next-btn" id="' + P + 'GoNext">第' + STORY[nextIdx].id + '事件 へ →</button>';
      }
      html += '<button class="sci-next-btn" id="' + P + 'GoMenu" style="background:#7a4a8a;margin-top:8px;">事件一覧へ</button>';
    }

    area.innerHTML = html;
    bind();
  }

  function bind() {
    const c = STORY[st.caseIdx];

    // v41: 대화 진행 - 「sciDialogue」 영역 또는 상단 stage 탭으로 다음 대사
    const advanceDialog = () => {
      if (st.phase === 'intro') {
        if (st.introIdx < c.intro.length - 1) {
          sfx('click');
          st.introIdx++;
          render();
          return true;
        }
      } else if (st.phase === 'step' && st.stepPhase === 'intro') {
        const step = c.steps[st.stepIdx];
        if (st.stepIntroIdx < (step.intro || []).length - 1) {
          sfx('click');
          st.stepIntroIdx++;
          render();
          return true;
        }
      }
      return false;
    };

    // 대사 박스 클릭
    const dlgBox = document.getElementById((P + 'Dialogue'));
    if (dlgBox) dlgBox.onclick = advanceDialog;

    // 상단 stage 자체도 탭 가능 (대화 단계일 때만)
    const stage = document.getElementById((P + 'Stage'));
    if (stage) {
      stage.onclick = () => {
        if (st.phase === 'intro' ||
            (st.phase === 'step' && st.stepPhase === 'intro')) {
          advanceDialog();
        }
      };
    }

    // 다음 버튼
    const nextBtn = document.getElementById((P + 'Next'));
    if (nextBtn) {
      nextBtn.onclick = () => {
        sfx('click');
        if (st.phase === 'intro') {
          if (st.introIdx < c.intro.length - 1) {
            st.introIdx++;
          } else {
            // 단계로 진입
            st.phase = 'step';
            st.stepIdx = 0;
            st.stepPhase = 'intro';
            st.stepIntroIdx = 0;
            st.hintShown = false;
          }
        } else if (st.phase === 'step') {
          const step = c.steps[st.stepIdx];
          if (st.stepPhase === 'intro') {
            if (st.stepIntroIdx < (step.intro || []).length - 1) {
              st.stepIntroIdx++;
            } else {
              st.stepPhase = 'puzzle';
              st.hintShown = false;
              st.answered = false;
            }
          } else if (st.stepPhase === 'clue') {
            // 다음 단계 또는 최종
            if (st.stepIdx < c.steps.length - 1) {
              st.stepIdx++;
              st.stepPhase = 'intro';
              st.stepIntroIdx = 0;
              st.hintShown = false;
            } else {
              st.phase = 'final';
              st.hintShown = false;
              st.selectedSuspectId = null;
              st.answered = false;  // v50 fix: puzzle에서 set된 answered가 final까지 그대로 와서 용의자 클릭 차단되는 버그 수정
              st.wrongIds = [];  // v50: 새 final 진입 시 wrongIds 리셋
            }
          }
        }
        render();
      };
    }

    // 힌트 토글
    const hintBtn = document.getElementById((P + 'HintBtn'));
    if (hintBtn) {
      hintBtn.onclick = () => {
        st.hintShown = !st.hintShown;
        sfx('click');
        if (st.hintShown) {
          const hk = st.phase + ':' + st.stepIdx;
          if (!st.hintCounted) st.hintCounted = {};
          if (!st.hintCounted[hk]) { st.hintCounted[hk] = true; st.hintsUsed = (st.hintsUsed || 0) + 1; }
        }
        // v70: render() 대신 DOM 직접 조작 (정답 후 피드백·続けるボタン 보존)
        const hintEl = document.getElementById((P + 'Hint'));
        if (hintEl) {
          hintEl.classList.toggle('show', st.hintShown);
        }
        hintBtn.textContent = st.hintShown ? HINT_HIDE : HINT_SHOW;
      };
    }

    // 퍼즐 옵션 (step phase) - v52: 오답 시 정답 자동 노출 X, 누른 옵션만 wrong 처리
    if (st.phase === 'step' && st.stepPhase === 'puzzle') {
      const step = c.steps[st.stepIdx];
      document.querySelectorAll('.sci-puzzle-opt').forEach(opt => {
        opt.onclick = () => {
          if (st.answered) return;
          if (opt.classList.contains('wrong')) return;  // 이미 틀린 옵션은 클릭 불가
          const chosen = parseInt(opt.dataset.i);
          const correct = step.puzzle.answer;
          const ok = chosen === correct;
          const fb = document.getElementById((P + 'Feedback'));

          if (ok) {
            // 정답: 모든 옵션 disabled, 정답에만 correct 표시, explanation 공개
            st.answered = true;
            document.querySelectorAll('.sci-puzzle-opt').forEach((o, i) => {
              o.classList.add('answered');
              if (i === correct) o.classList.add('correct');
            });
            sfx('unlock');
            let fbHtml = '<div class="sci-feedback ok">';
            fbHtml += '<div class="sci-feedback-h ok">🎉 正解!</div>';
            fbHtml += '<div class="sci-feedback-text">' + escapeHtml(step.puzzle.explanation) + '</div>';
            fbHtml += '</div>';
            if (step.clue) st.collectedClues.push(step.clue);
            fbHtml += '<button class="sci-next-btn" id="' + P + 'NextOk">続ける →</button>';
            fb.innerHTML = fbHtml;
            setTimeout(() => { fb.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
            const nb = document.getElementById((P + 'NextOk'));
            if (nb) nb.onclick = () => {
              sfx('clue');
              st.stepPhase = 'clue';
              render();
            };
          } else {
            // 오답: 누른 옵션만 wrong, 정답은 절대 표시하지 않음, explanation도 미공개
            opt.classList.add('answered', 'wrong');
            sfx('wrong');
            st.mistakes = (st.mistakes || 0) + 1;
            ReviewEngine.record(cfg.key, st.caseIdx, st.stepIdx);
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
    if (st.phase === 'final') {
      document.querySelectorAll('.sci-suspect-card').forEach(card => {
        card.onclick = () => {
          if (st.answered) return;
          if ((st.wrongIds || []).includes(card.dataset.id)) return;  // v50: 이미 틀린 용의자는 클릭 불가
          sfx('select');  // v32: 용의자 선택
          st.selectedSuspectId = card.dataset.id;
          render();
        };
      });
      const submitBtn = document.getElementById((P + 'Submit'));
      if (submitBtn) {
        submitBtn.onclick = () => {
          if (!st.selectedSuspectId) return;
          st.answered = true;
          const ok = st.selectedSuspectId === c.finalQ.answer;
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
            State[cfg.clearedKey][st.caseIdx] = true;
            st.lastStars = calcStars(st);
            GameV2.setStars(cfg.key, st.caseIdx, st.lastStars);
            saveState();
            setTimeout(() => {
              st.phase = 'resolved';
              render();
            }, 1800);
          } else {
            // v50: 오답이면 정답을 자동으로 알려주지 않고, 그 용의자만 X 처리
            if (!st.wrongIds) st.wrongIds = [];
            if (!st.wrongIds.includes(st.selectedSuspectId)) {
              st.wrongIds.push(st.selectedSuspectId);
            }
            sfx('wrong');
            st.mistakes = (st.mistakes || 0) + 1;
            const fb = document.getElementById((P + 'Feedback'));
            // 남은 용의자 수 계산 (정답 힌트 X)
            const remaining = c.suspects.length - st.wrongIds.length;
            fb.innerHTML = '<div class="sci-feedback ng">' +
              '<div class="sci-feedback-h ng">✗ 違うようだ…</div>' +
              '<div class="sci-feedback-text">この人は 犯人では ない。残り 容疑者: ' + remaining + '名。手がかりを もう一度 見直そう。</div>' +
              '</div>' +
              '<button class="sci-next-btn" id="' + P + 'TryAgain" style="background:#b85a5a;">もう一度 推理</button>';
            document.getElementById((P + 'TryAgain')).onclick = () => {
              sfx('click');
              st.answered = false;
              st.selectedSuspectId = null;
              // wrongIds는 유지 (다음 시도 시 X 마크 그대로)
              render();
            };
          }
        };
      }
    }

    // 해결 후 버튼
    const goNext = document.getElementById((P + 'GoNext'));
    if (goNext) {
      goNext.onclick = () => { sfx('click'); startCase(st.caseIdx + 1); };
    }
    const goMenu = document.getElementById((P + 'GoMenu'));
    if (goMenu) {
      goMenu.onclick = () => { sfx('click'); buildChapterGrid(); showPage('pageSelect'); };
    }
  }

    return { cfg: cfg, buildGrid: buildGrid, startCase: startCase, render: render, bind: bind };
  }

  function register(cfg) {
    registry[cfg.key] = create(cfg);
    return registry[cfg.key];
  }

  return { register: register, get: function (k) { return registry[k]; }, all: registry };
})();
