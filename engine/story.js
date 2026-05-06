/* engine/story.js — extracted from index.html (v73 step4b)
 * Original location: lines 1001-1673 (STORY FLOW + PUZZLE + ENGLISH FLOW + ENG QUESTION/SPELL)
 * Contents: STORY FLOW (startChapter, showDialogueLine, advanceDialogue, showEngMysteryPuzzle, afterEngMysteryPuzzle, finishEngMystery), PUZZLE (showPuzzle, buildKeyDiv, buildLockDials, checkAnswerText, checkAnswerLock, onCorrect, onWrong, afterPuzzle, finishChapter), ENG CHAPTER (startEngChapter), ENG QUESTION/SPELL (showEngQuestion, findWordByEn, showSpellPuzzle, nextEngQ, finishEngChapter)
 * Dependencies: State (core), showPage/showModal/closeModal/buildChapterGrid (ui-modal), sfx/playBGM/stopBGM/speakLine/stopVoice (audio), STORY/ENG_MYSTERY_STORIES/CHARS/SCENES (data), addWrongWord/markWordCorrect (core), launchConfetti (ui-modal)
 * Load order: after core + ui-modal + audio (run-time deps); engine/audio.js can load before/after story.js (only run-time use).
 */
// ============================================================
// STORY FLOW
// ============================================================
function startChapter(idx) {
  State.currentChapter = idx;
  State.dialogueQueue = STORY[idx].intro;
  State.dialogueIdx = 0;
  showPage('pageStory');
  playBGM((idx === 4 || idx === 9) ? 'mystery' : 'quiet');
  showDialogueLine();
}

function showDialogueLine() {
  const line = State.dialogueQueue[State.dialogueIdx];
  if (!line) return;
  document.getElementById('speakerBubble').textContent = line.speaker;
  document.getElementById('speakerBubble').className = 'speaker-bubble ' + (line.cls || '');
  document.getElementById('dialogueContent').textContent = line.text;
  const sceneEl = document.getElementById('sceneIllust');

  // 배경: 일러스트 이미지가 있으면 IMG로, 없으면 SVG 폴백
  // 새 사건 11~15장의 신규 sceneKey가 아직 일러스트 없으면 분위기 비슷한 기존 배경으로 폴백
  const sceneFallback = {
    shoppingMall: 'library',
    rooftop: 'schoolGate',
    cafe: 'home',
    gardenTanabata: 'garden',
    nightStreet: 'shrine',
  };
  let html;
  const sceneKey = line.scene || 'schoolGate';
  if (typeof SCENE_IMAGES !== 'undefined' && SCENE_IMAGES[sceneKey]) {
    html = '<img src="' + SCENE_IMAGES[sceneKey] + '" alt="' + sceneKey + '" class="scene-bg-img">';
  } else if (typeof SCENE_IMAGES !== 'undefined' && sceneFallback[sceneKey] && SCENE_IMAGES[sceneFallback[sceneKey]]) {
    html = '<img src="' + SCENE_IMAGES[sceneFallback[sceneKey]] + '" alt="' + sceneKey + '" class="scene-bg-img">';
  } else {
    html = SCENES[sceneKey] || SCENES[sceneFallback[sceneKey]] || SCENES.schoolGate;
  }

  // speaker의 cls를 보고 캐릭터 이미지 결정 (mina, yamada, mori 등도 표시)
  // line.char 가 left/right/both 면 하루·리오 기본
  // 그 외 cls가 있으면 해당 단역도 left에 함께 표시
  function charImg(name) {
    const src = CHAR_IMAGES[name];
    if (!src) return '';
    return '<img src="' + src + '" alt="' + name + '" style="width:100%;height:100%;object-fit:contain;">';
  }

  // 단역 스피커가 말하는 경우 (line.cls가 mina, yamada 등) 단역을 우측에 표시
  const sideCharCls = line.cls;
  const isMainChar = sideCharCls === 'haru' || sideCharCls === 'rio' || sideCharCls === 'narrator';

  if (line.char === 'left') html += '<div class="character-cutin left">' + charImg('haru') + '</div>';
  else if (line.char === 'right') html += '<div class="character-cutin right">' + charImg('rio') + '</div>';
  else if (line.char === 'both') {
    html += '<div class="character-cutin left">' + charImg('haru') + '</div>';
    html += '<div class="character-cutin right">' + charImg('rio') + '</div>';
  }
  // 단역이 말할 때 (char가 null이고 cls가 단역인 경우) 가운데에 단역 표시
  else if (!isMainChar && sideCharCls && CHAR_IMAGES[sideCharCls]) {
    html += '<div class="character-cutin right">' + charImg(sideCharCls) + '</div>';
  }
  sceneEl.innerHTML = html;

  // 음성 재생 (Web Speech API)
  speakLine(line);
}

function advanceDialogue() {
  sfx('click');
  State.dialogueIdx++;

  // 영어추리 챕터인 경우
  if (State.engMysteryActive !== null && State.engMysteryActive !== undefined) {
    const engCh = ENG_CHAPTERS[State.engMysteryActive];
    const story = engCh.story;
    if (State.dialogueIdx >= State.dialogueQueue.length) {
      if (State.dialogueQueue === story.intro) {
        showEngMysteryPuzzle();
      } else {
        // outro 끝 → 클리어
        finishEngMystery();
      }
    } else {
      showDialogueLine();
    }
    return;
  }

  const ch = STORY[State.currentChapter];
  if (State.dialogueIdx >= State.dialogueQueue.length) {
    if (State.dialogueQueue === ch.intro) {
      showPuzzle();
    } else {
      finishChapter();
    }
  } else {
    showDialogueLine();
  }
}

// 영어추리 퍼즐 표시
function showEngMysteryPuzzle() {
  const engCh = ENG_CHAPTERS[State.engMysteryActive];
  const p = engCh.story.puzzle;
  document.getElementById('puzzleTitle').textContent = p.title;
  document.getElementById('puzzleHint').textContent = p.hint;
  const area = document.getElementById('puzzleArea');
  area.innerHTML = '';

  if (p.type === 'eng_choice') {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:100%;max-width:600px;display:flex;flex-direction:column;gap:14px;';
    wrap.innerHTML =
      '<div style="background:white;border:3px solid var(--accent-blue);border-radius:14px;padding:18px;text-align:center;font-size:18px;line-height:1.7;color:var(--deep-ink);">' +
        '<div style="font-size:14px;color:#888;margin-bottom:8px;">この英語の意味は?</div>' +
        '<div style="font-family:Yusei Magic;font-size:22px;color:var(--accent-blue);">' + p.question + '</div>' +
      '</div>';
    const optsWrap = document.createElement('div');
    optsWrap.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;';
    p.options.forEach((o, i) => {
      const b = document.createElement('button');
      b.className = 'eng-option';
      b.textContent = o.text;
      b.onclick = () => {
        if (o.correct) {
          b.classList.add('correct');
          sfx('correct');
          State.stats.totalCorrect++;
          saveState();
          setTimeout(() => {
            showModal('🎉', '正解!', o.why, [{text:'つづける', cb:() => { closeModal(); afterEngMysteryPuzzle(); }}], 'success');
          }, 400);
        } else {
          b.classList.add('wrong');
          sfx('wrong');
          State.stats.totalWrong++;
          showModal('🤔', 'ちがうかも…', o.why, [{text:'もういちど', cb:closeModal}], 'fail');
          setTimeout(() => b.classList.remove('wrong'), 800);
        }
      };
      optsWrap.appendChild(b);
    });
    wrap.appendChild(optsWrap);
    area.appendChild(wrap);
  } else if (p.type === 'eng_anagram') {
    // 글자 재배열 퍼즐
    const wrap = document.createElement('div');
    wrap.style.cssText = 'width:100%;max-width:600px;display:flex;flex-direction:column;gap:14px;align-items:center;';
    wrap.innerHTML =
      '<div style="background:white;border:3px solid var(--accent-blue);border-radius:14px;padding:18px;text-align:center;">' +
        '<div style="font-size:14px;color:#888;margin-bottom:8px;">並びかえて 正しい単語に!</div>' +
        '<div style="font-family:Yusei Magic;font-size:32px;color:var(--accent-blue);letter-spacing:6px;">' + p.scrambled + '</div>' +
      '</div>' +
      '<input type="text" class="cipher-input" id="anagramInput" placeholder="こたえ" maxlength="10" autocomplete="off">' +
      '<button class="submit-btn" id="btnCheckAna">これだ!</button>';
    area.appendChild(wrap);
    document.getElementById('btnCheckAna').onclick = () => {
      const v = document.getElementById('anagramInput').value.trim().toUpperCase();
      if (v === p.answer) {
        sfx('correct');
        State.stats.totalCorrect++;
        saveState();
        showModal('🎉', '正解!', p.explanation, [{text:'つづける', cb:() => { closeModal(); afterEngMysteryPuzzle(); }}], 'success');
      } else {
        sfx('wrong');
        State.stats.totalWrong++;
        showModal('🤔', 'ちがうみたい…', 'もう一度 がんばろう!', [{text:'OK', cb:closeModal}], 'fail');
      }
    };
  }

  showPage('pagePuzzle');
}

function afterEngMysteryPuzzle() {
  const engCh = ENG_CHAPTERS[State.engMysteryActive];
  State.dialogueQueue = engCh.story.outro;
  State.dialogueIdx = 0;
  showPage('pageStory');
  showDialogueLine();
}

function finishEngMystery() {
  const idx = State.engMysteryActive;
  const engCh = ENG_CHAPTERS[idx];
  State.engCleared[idx] = true;
  if (engCh.note && !State.notes.find(n => n.title === engCh.note.title)) {
    State.notes.push(engCh.note);
  }
  State.engMysteryActive = null;
  // v75: eng mystery 는 추리 카테고리로 분리·영어 학습 토큰 미발급
  saveState();
  sfx('chime');
  triggerConfetti();
  showModal('🏆', engCh.title + ' クリア!', '英語と 推理を 両方 つかったね!\nすごい!',
    [{text:'もくじへ', cb:() => { closeModal(); buildChapterGrid(); showPage('pageSelect'); }}], 'success');
}

// ============================================================
// PUZZLES
// ============================================================
function showPuzzle() {
  const p = STORY[State.currentChapter].puzzle;
  document.getElementById('puzzleTitle').textContent = p.title;
  document.getElementById('puzzleHint').textContent = p.hint;
  const area = document.getElementById('puzzleArea');
  area.innerHTML = '';

  if (p.type === 'caesar' || p.type === 'number') {
    area.innerHTML =
      '<div class="cipher-paper">' + p.cipherText + '</div>' +
      '<input type="text" class="cipher-input" id="cipherInput" placeholder="こたえ" maxlength="10" autocomplete="off">' +
      '<button class="submit-btn" id="btnCheckText">これだ!</button>' +
      buildKeyDiv(p.type, p.shift || 5);
    document.getElementById('btnCheckText').onclick = () => checkAnswerText();
  } else if (p.type === 'reverse') {
    area.innerHTML =
      '<div class="cipher-paper">' + p.cipherText + '</div>' +
      '<p style="font-size:14px;color:#666;">↓ ぎゃくから 読むと?</p>' +
      '<input type="text" class="cipher-input" id="cipherInput" placeholder="ひらがな" maxlength="10" autocomplete="off">' +
      '<button class="submit-btn" id="btnCheckText">これだ!</button>';
    document.getElementById('btnCheckText').onclick = () => checkAnswerText();
  } else if (p.type === 'lock') {
    area.innerHTML =
      '<div class="cipher-paper" style="font-size:22px;">' + p.cipherText + '</div>' +
      '<div class="cipher-key"><h4>えとの 順番</h4>ね=1 うし=2 とら=3 う=4<br>たつ=5 み=6 うま=7 ひつじ=8<br>さる=9 とり=10 いぬ=11 い=12</div>' +
      '<div class="lock-dial" id="lockDial"></div>' +
      '<button class="submit-btn" id="btnCheckLock">あける!</button>';
    buildLockDials();
    document.getElementById('btnCheckLock').onclick = () => checkAnswerLock();
  } else if (p.type === 'final') {
    const html = ['<div class="suspects-row">'];
    p.suspects.forEach((s, i) => {
      const charImg = CHAR_IMAGES[s.charKey] ? '<img src="' + CHAR_IMAGES[s.charKey] + '" alt="' + s.name + '" style="width:90px;height:120px;object-fit:contain;margin-bottom:4px;">' : '';
      html.push('<div class="suspect-pick" data-idx="' + i + '">' + charImg + '<div class="suspect-pick-name">' + s.name + '</div><div class="suspect-pick-alibi">「' + s.alibi + '」</div></div>');
    });
    html.push('</div>');
    area.innerHTML = html.join('');
    area.querySelectorAll('.suspect-pick').forEach(el => {
      el.onclick = () => {
        const idx = parseInt(el.dataset.idx);
        const s = p.suspects[idx];
        if (s.correct) onCorrect();
        else { sfx('wrong'); showModal('🤔','ちがうかも…','「'+s.alibi+'」と言ってるね。\n他を考えてみよう。',[{text:'もういちど', cb:closeModal}],'fail'); }
      };
    });
  } else if (p.type === 'timetable') {
    // 시간표 퍼즐: 시간 순으로 정렬해서 첫 글자 모으기
    let html = '<div style="background:white;border:3px solid var(--accent-blue);border-radius:14px;padding:16px;width:100%;max-width:500px;">';
    html += '<table style="width:100%;border-collapse:collapse;font-family:Klee One;font-size:16px;">';
    html += '<thead><tr style="background:var(--soft-blue);"><th style="padding:8px;border:2px solid var(--line);">時間</th><th style="padding:8px;border:2px solid var(--line);">お店</th></tr></thead><tbody>';
    p.items.forEach(it => {
      html += '<tr><td style="padding:8px;border:2px solid var(--line);text-align:center;">' + it.time + '</td><td style="padding:8px;border:2px solid var(--line);">' + it.place + '</td></tr>';
    });
    html += '</tbody></table></div>';
    html += '<p style="font-size:14px;color:#666;margin:10px 0;">↓ 時間が 早い順に 並べて、最初の文字を 集めよう</p>';
    html += '<input type="text" class="cipher-input" id="cipherInput" placeholder="ふパほ など" maxlength="10" autocomplete="off">';
    html += '<button class="submit-btn" id="btnCheckText">これだ!</button>';
    area.innerHTML = html;
    document.getElementById('btnCheckText').onclick = () => checkAnswerText();
  } else if (p.type === 'mirror') {
    // 거울 글자 퍼즐: 좌우 반전된 글자를 정상으로 입력
    area.innerHTML =
      '<div class="cipher-paper" style="transform:scaleX(-1);font-size:48px;display:inline-block;">' + p.cipherText + '</div>' +
      '<p style="font-size:14px;color:#666;margin:8px 0;">↑ 鏡(かがみ)文字 ' + (p.displayHint || '') + '</p>' +
      '<input type="text" class="cipher-input" id="cipherInput" placeholder="ふつうの 文字" maxlength="10" autocomplete="off">' +
      '<button class="submit-btn" id="btnCheckText">これだ!</button>';
    document.getElementById('btnCheckText').onclick = () => checkAnswerText();
  } else if (p.type === 'emoji') {
    // 이모지 결합 퍼즐: 그림 → 일본어 → 결합
    let html = '<div style="background:white;border:3px solid var(--accent-blue);border-radius:14px;padding:20px;width:100%;max-width:500px;">';
    html += '<div style="display:flex;justify-content:center;gap:20px;align-items:center;flex-wrap:wrap;">';
    p.items.forEach((it, i) => {
      if (i > 0) html += '<div style="font-size:30px;color:var(--accent-blue);">+</div>';
      html += '<div style="text-align:center;">';
      html += '<div style="font-size:60px;">' + it.emoji + '</div>';
      html += '<div style="font-family:Klee One;font-size:18px;color:var(--deep-ink);">(' + it.name + ')</div>';
      html += '</div>';
    });
    html += '</div></div>';
    html += '<p style="font-size:14px;color:#666;margin:10px 0;">↓ 絵の名前を つなげよう</p>';
    html += '<input type="text" class="cipher-input" id="cipherInput" placeholder="つきいぬ など" maxlength="15" autocomplete="off">';
    html += '<button class="submit-btn" id="btnCheckText">これだ!</button>';
    area.innerHTML = html;
    document.getElementById('btnCheckText').onclick = () => checkAnswerText();
  } else if (p.type === 'firstchar') {
    // 첫 글자 모으기 퍼즐
    let html = '<div style="background:white;border:3px solid var(--accent-blue);border-radius:14px;padding:16px;width:100%;max-width:500px;">';
    html += '<div style="display:flex;flex-direction:column;gap:8px;">';
    const colorMap = { '赤':'#e87878', '黄':'#f0c674', '青':'#6ba8c4', '桃':'#e8a8b8', '白':'#fafafa', '緑':'#a8c8a8', '紫':'#9b87bc' };
    p.items.forEach((it, i) => {
      const bg = colorMap[it.color] || '#f0f0f0';
      html += '<div style="background:' + bg + ';border:2px solid var(--line);border-radius:8px;padding:10px;display:flex;gap:10px;align-items:center;">';
      html += '<div style="font-family:RocknRoll One;font-size:14px;width:30px;text-align:center;">' + (i+1) + '</div>';
      html += '<div style="font-family:Klee One;font-size:16px;color:var(--deep-ink);flex:1;">' + it.wish + '</div>';
      html += '</div>';
    });
    html += '</div></div>';
    html += '<p style="font-size:14px;color:#666;margin:10px 0;">↓ 1から順に 各短冊の 最初の文字を 集めよう</p>';
    html += '<input type="text" class="cipher-input" id="cipherInput" placeholder="あいすクリ など" maxlength="15" autocomplete="off">';
    html += '<button class="submit-btn" id="btnCheckText">これだ!</button>';
    area.innerHTML = html;
    document.getElementById('btnCheckText').onclick = () => checkAnswerText();
  }
  showPage('pagePuzzle');
}

function buildKeyDiv(type, shift) {
  if (type === 'caesar') {
    // shift 칸 만큼 동적으로 변환표 생성
    const n = shift || 5;
    const lines = [];
    let cur = '';
    for (let i = 0; i < 26; i++) {
      const cipher = String.fromCharCode(65 + ((i + n) % 26));
      const plain = String.fromCharCode(65 + i);
      cur += cipher + '→' + plain + ' ';
      if ((i + 1) % 5 === 0) { lines.push(cur); cur = ''; }
    }
    if (cur) lines.push(cur);
    return '<div class="cipher-key"><h4>カエサル暗号 (' + n + 'つ前)</h4><div style="font-family:Yusei Magic;letter-spacing:1px;font-size:12px;">' + lines.join('<br>') + '</div></div>';
  } else {
    return '<div class="cipher-key"><h4>A=1 ~ Z=26</h4><div style="font-family:Yusei Magic;font-size:11px;">A1 B2 C3 D4 E5 F6 G7 H8<br>I9 J10 K11 L12 M13 N14 O15<br>P16 Q17 R18 S19 T20 U21 V22<br>W23 X24 Y25 Z26</div></div>';
  }
}

function buildLockDials() {
  const dial = document.getElementById('lockDial');
  dial.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const col = document.createElement('div');
    col.className = 'dial-col';
    col.innerHTML =
      '<button class="dial-btn" data-i="' + i + '" data-d="1">▲</button>' +
      '<div class="dial-display" id="dial' + i + '">0</div>' +
      '<button class="dial-btn" data-i="' + i + '" data-d="-1">▼</button>';
    dial.appendChild(col);
  }
  dial.querySelectorAll('.dial-btn').forEach(b => {
    b.onclick = () => {
      sfx('click');
      const i = parseInt(b.dataset.i);
      const d = parseInt(b.dataset.d);
      const el = document.getElementById('dial' + i);
      let v = parseInt(el.textContent);
      v = (v + d + 13) % 13;
      el.textContent = v;
    };
  });
}

function checkAnswerText() {
  const p = STORY[State.currentChapter].puzzle;
  const v = document.getElementById('cipherInput').value.trim();
  if (v.toUpperCase() === p.answer.toUpperCase() || v === p.answer) onCorrect();
  else onWrong();
}

function checkAnswerLock() {
  const p = STORY[State.currentChapter].puzzle;
  const vals = [];
  for (let i = 0; i < 4; i++) vals.push(parseInt(document.getElementById('dial' + i).textContent));
  if (vals.every((v, i) => v === p.answer[i])) onCorrect();
  else onWrong();
}

function onCorrect() {
  sfx('correct');
  triggerConfetti();
  const p = STORY[State.currentChapter].puzzle;
  showModal('🎉', '正解!', p.explanation, [{text:'つづける', cb:() => { closeModal(); afterPuzzle(); }}], 'success');
}

function onWrong() {
  sfx('wrong');
  showModal('😅', 'ちがうみたい…', 'もう一度 ヒントを 読んで みよう!', [{text:'もういちど', cb:closeModal}], 'fail');
}

function afterPuzzle() {
  State.dialogueQueue = STORY[State.currentChapter].outro;
  State.dialogueIdx = 0;
  showPage('pageStory');
  showDialogueLine();
}

function finishChapter() {
  State.cleared[State.currentChapter] = true;
  const note = STORY[State.currentChapter].note;
  if (note && !State.notes.find(n => n.title === note.title)) State.notes.push(note);
  saveState();
  const isLastChapter = State.currentChapter === STORY.length - 1; // 15장
  if (isLastChapter) {
    // 15장 클리어 후에도 마지막 관문 (보스 관문)
    sfx('chime');
    showModal('🏆','第' + (State.currentChapter + 1) + '章 クリア!','つぎは 最終関門だ!\n5問 ぜんぶ 正解で クリア!',
      [{text:'最終関門へ', cb:() => { closeModal(); startGate(State.currentChapter); }}], 'success');
  } else {
    sfx('chime');
    showModal('⭐', '第' + (State.currentChapter + 1) + '章 クリア!', 'つぎは 関門 クイズ!\n5問 ぜんぶ 正解で 次の 章が 開く!',
      [{text:'関門へ →', cb:() => { closeModal(); startGate(State.currentChapter); }},
       {text:'あとで', cb:() => { closeModal(); buildChapterGrid(); showPage('pageSelect'); }}], 'success');
  }
}

// ============================================================
// ENGLISH FLOW
// ============================================================
function startEngChapter(idx) {
  // 매번 새 문제 출제 (단어 풀에서 무작위 추출)
  ENG_CHAPTERS = buildAllChapters();
  State.engChapter = idx;
  State.engQIdx = 0;
  State.engCorrect = 0;

  const ch = ENG_CHAPTERS[idx];
  if (ch && ch.isEngMystery) {
    // 영어추리 챕터: 스토리 도입 → 퍼즐 → 결말
    State.dialogueQueue = ch.story.intro;
    State.dialogueIdx = 0;
    State.engMysteryActive = idx;
    showPage('pageStory');
    playBGM('quiet');
    showDialogueLine();
    return;
  }
  if (ch && ch.isWriting) {
    startWritingChapter(ch);
    return;
  }
  if (ch && ch.isGrammar) {
    startGrammarChapter(ch);
    return;
  }
  if (ch && ch.isComposition) {
    startCompositionChapter(ch);
    return;
  }
  if (ch && ch.isPhraseDict) {
    startPhraseDictChapter();
    return;
  }
  if (ch && ch.isDailyMission) {
    startDailyMissionChapter();
    return;
  }
  if (ch && ch.isNews) {
    startNewsChapter();
    return;
  }
  if (ch && ch.isCompound) {
    startCompoundChapter(ch);
    return;
  }

  showPage('pageEng');
  playBGM('eng');
  showEngQuestion();
}




function showEngQuestion() {
  const ch = ENG_CHAPTERS[State.engChapter];
  const q = ch.questions[State.engQIdx];
  State.engCurrentQuestion = q;
  document.getElementById('engTitle').textContent = ch.title;
  document.getElementById('engProgress').textContent = '問' + (State.engQIdx + 1) + ' / ' + ch.questions.length + ' (正解 ' + State.engCorrect + ')';

  const area = document.getElementById('engArea');
  area.innerHTML = '';

  if (q.type === 'meaning') {
    // 현재 문제에 해당하는 단어 객체 찾기 (추적용)
    const wordItem = findWordByEn(q.q) || { en: q.q, ja: q.a[q.correct] };
    let answered = false;
    const wrap = document.createElement('div');
    wrap.className = 'eng-puzzle';
    wrap.innerHTML =
      '<div class="eng-question"><div class="ja-hint">この 単語 / 熟語の 意味は?</div><span class="en">' + q.q + '</span></div>' +
      '<div class="eng-options">' +
      q.a.map((a, i) => '<button class="eng-option" data-i="' + i + '">' + a + '</button>').join('') +
      '</div>';
    area.appendChild(wrap);
    wrap.querySelectorAll('.eng-option').forEach(b => {
      b.onclick = () => {
        if (answered) return;
        const i = parseInt(b.dataset.i);
        if (i === q.correct) {
          answered = true;
          b.classList.add('correct');
          sfx('correct');
          State.engCorrect++;
          State.stats.totalCorrect++;
          markWordCorrect(wordItem);
          saveState();
          setTimeout(nextEngQ, 700);
        } else {
          b.classList.add('wrong');
          sfx('wrong');
          State.stats.totalWrong++;
          addWrongWord(wordItem);
          // 정답도 표시
          wrap.querySelectorAll('.eng-option').forEach((opt, oi) => {
            if (oi === q.correct) opt.classList.add('correct');
          });
          setTimeout(() => {
            b.classList.remove('wrong');
            wrap.querySelectorAll('.eng-option').forEach(opt => opt.classList.remove('correct'));
          }, 1200);
        }
      };
    });
  } else if (q.type === 'spell') {
    showSpellPuzzle(q);
  }
}

// 영어 단어로 단어 객체 찾기 (전체 풀에서)
function findWordByEn(en) {
  const all = [...ALL_G2, ...ALL_IDIOMS, ...G_PRE1_WORDS];
  return all.find(w => w.en === en);
}

function showSpellPuzzle(q) {
  const area = document.getElementById('engArea');
  const word = q.word;
  // 글자를 무작위로 섞어서 bank에 배치
  const shuffled = word.split('').sort(() => Math.random() - 0.5);

  const wrap = document.createElement('div');
  wrap.className = 'eng-puzzle';
  wrap.innerHTML =
    '<div class="eng-question"><div class="ja-hint">「' + q.q + '」を 英語で つづろう!</div><div style="font-size:14px;color:#888;margin-top:6px;">(' + word.length + ' letters)</div></div>' +
    '<div class="eng-spell" id="spellSlots"></div>' +
    '<div class="eng-progress" style="font-size:13px;color:#666;">↑ クリックで うしろから けせる ↓ あいているマスへ 文字を タップ</div>' +
    '<div class="spell-bank" id="spellBank"></div>' +
    '<button class="submit-btn" id="btnCheckSpell">かくにん!</button>';
  area.appendChild(wrap);

  const slots = document.getElementById('spellSlots');
  for (let i = 0; i < word.length; i++) {
    const s = document.createElement('div');
    s.className = 'spell-letter';
    s.dataset.idx = i;
    s.textContent = '';
    s.onclick = () => {
      // 마지막에 배치된 글자 제거
      const allSlots = Array.from(slots.children);
      for (let j = allSlots.length - 1; j >= 0; j--) {
        if (allSlots[j].textContent) {
          const ch = allSlots[j].textContent;
          allSlots[j].textContent = '';
          allSlots[j].classList.remove('placed');
          // bank에서 다시 활성화
          const bankBtns = document.querySelectorAll('.bank-letter');
          for (let k = 0; k < bankBtns.length; k++) {
            if (bankBtns[k].textContent === ch && bankBtns[k].classList.contains('used')) {
              bankBtns[k].classList.remove('used');
              break;
            }
          }
          sfx('click');
          return;
        }
      }
    };
    slots.appendChild(s);
  }

  const bank = document.getElementById('spellBank');
  shuffled.forEach((ch, i) => {
    const b = document.createElement('button');
    b.className = 'bank-letter';
    b.textContent = ch;
    b.onclick = () => {
      if (b.classList.contains('used')) return;
      // 다음 빈 슬롯에 배치
      const emptySlot = Array.from(slots.children).find(s => !s.textContent);
      if (emptySlot) {
        emptySlot.textContent = ch;
        emptySlot.classList.add('placed');
        b.classList.add('used');
        sfx('click');
      }
    };
    bank.appendChild(b);
  });

  document.getElementById('btnCheckSpell').onclick = () => {
    const userWord = Array.from(slots.children).map(s => s.textContent).join('');
    const wordItem = findWordByEn(word.toLowerCase()) || { en: word.toLowerCase(), ja: q.q };
    if (userWord === word) {
      sfx('correct');
      State.engCorrect++;
      State.stats.totalCorrect++;
      markWordCorrect(wordItem);
      saveState();
      Array.from(slots.children).forEach(s => s.style.background = 'var(--soft-green)');
      setTimeout(nextEngQ, 800);
    } else {
      sfx('wrong');
      State.stats.totalWrong++;
      addWrongWord(wordItem);
      showModal('😅', 'ちがうみたい','正しいスペル: ' + word, [{text:'OK', cb:() => {
        closeModal();
        Array.from(slots.children).forEach(s => { s.textContent = ''; s.classList.remove('placed'); });
        bank.querySelectorAll('.bank-letter').forEach(b => b.classList.remove('used'));
      }}], 'fail');
    }
  };
}

function nextEngQ() {
  State.engQIdx++;
  const ch = ENG_CHAPTERS[State.engChapter];
  if (State.engQIdx >= ch.questions.length) {
    finishEngChapter();
  } else {
    showEngQuestion();
  }
}

// v75: 영어 토큰 발급 공통 함수 (모든 영어 sub-탭 종료점에서 호출)
// reason: 통계용 라벨 (vocab/mystery/grammar/comp/writing/phrase/daily/news_read/news_quiz/compound)
// 반환: 이번 호출에서 토큰을 새로 획득했는지 (true/false)
function awardEngToken(reason) {
  State.engClearCount = (State.engClearCount || 0) + 1;
  let earned = false;
  if (State.engClearCount % 3 === 0) {
    State.gameTokens = (State.gameTokens || 0) + 1;
    earned = true;
  }
  saveState();
  return earned;
}

// v75: 오늘 날짜 문자열 'YYYY-MM-DD'
function getTodayStr() {
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}

// v75: 일 1 토큰 캡 헬퍼 (news quiz·compound 4 모드 통합)
// stateField: 'newsQuizDailyTokens' | 'compoundDailyTokens'
// 캡 도달 시 null 반환 (조용히 skip), 발급 시 awardEngToken 의 결과 (bool) 반환
function tryAwardCappedToken(stateField, reason) {
  const today = getTodayStr();
  let cap = State[stateField] || { date: '', count: 0 };
  if (cap.date !== today) { cap = { date: today, count: 0 }; }
  if (cap.count >= 1) { State[stateField] = cap; saveState(); return null; }
  cap.count = 1;
  State[stateField] = cap;
  return awardEngToken(reason);
}

function finishEngChapter() {
  const ch = ENG_CHAPTERS[State.engChapter];
  const total = ch.questions.length;
  const score = State.engCorrect;
  const passed = score >= Math.ceil(total * 0.7);
  const perfect = score === total;
  State.stats.chaptersPlayed++;
  let earnedToken = false;  // v30: 토큰 획득 여부
  if (passed) {
    State.engCleared[State.engChapter] = true;
    if (ch.note && !State.notes.find(n => n.title === ch.note.title)) State.notes.push(ch.note);
    // v74: 첫 클리어든 복습이든 합격할 때마다 카운트, 3회마다 토큰 (반복 학습 인센티브)
    // v75: awardEngToken 헬퍼로 통일
    earnedToken = awardEngToken('vocab');
  }
  saveState();
  sfx('chime');
  triggerConfetti();
  const stars = perfect ? '⭐⭐⭐' : score >= total * 0.85 ? '⭐⭐' : score >= total * 0.7 ? '⭐' : '';
  const icon = perfect ? '🏆' : passed ? '🎉' : '💪';
  const msg = perfect
    ? 'パーフェクト!すごい!\nぜんぶ せいかい!'
    : passed
    ? 'よくできました!\nもう一度 ちょうせんしたら パーフェクト ねらえそう!'
    : 'おしい!もう一度 ちょうせんしてみよう!';
  const wrongCount = Object.keys(State.wrongWords).length;
  const reviewMsg = wrongCount >= 4 ? '\n\n📝 復習チャレンジに ' + wrongCount + '個の 単語が あります!' : '';
  // v30: 게임 토큰 메시지
  let tokenMsg = '';
  if (earnedToken) {
    tokenMsg = '\n\n🎮 ゲームトークン GET! (現在 ' + State.gameTokens + '個)';
  } else if (passed && State.engCleared[State.engChapter]) {
    const remaining = 3 - ((State.engClearCount || 0) % 3);
    if (remaining < 3 && remaining > 0 && State.engClearCount > 0) {
      tokenMsg = '\n\n🎮 あと ' + remaining + ' 章 クリアで ゲームトークン!';
    }
  }
  showModal(
    icon,
    ch.title + ' 終了!',
    stars + (stars ? '\n\n' : '') + '正解 ' + score + ' / ' + total + '問\n\n' + msg + reviewMsg + tokenMsg,
    [
      {text:'もう一度', cb:() => { closeModal(); startEngChapter(State.engChapter); }},
      {text:'もくじへ', cb:() => { closeModal(); buildChapterGrid(); showPage('pageSelect'); }},
    ], passed ? 'success' : 'fail'
  );
}
