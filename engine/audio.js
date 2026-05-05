/* engine/audio.js — extracted from index.html (v73 step4a)
 * Original location: lines 778-1029 (current index.html)
 * Contents: AUDIO (initAudio), VOICE (VOICE_PROFILES, initVoices, speakLine, stopVoice, toggleVoice, updateVoiceButton), BGM/SFX (playBGM, stopBGM, sfx)
 * Dependencies: State (engine/core.js — read), data/* (none direct)
 */
// ============================================================
// AUDIO
// ============================================================
function initAudio() {
  if (!State.audioCtx) {
    try { State.audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return; }
  }
  if (State.audioCtx.state === 'suspended') State.audioCtx.resume();
  // 음성 시스템 초기화
  initVoices();
}

// ============================================================
// VOICE (Web Speech API - 일본어 TTS)
// ============================================================
// 캐릭터별 음성 설정: pitch(높이), rate(속도)
// 각 캐릭터가 다르게 들리도록 조정
const VOICE_PROFILES = {
  // 하루·리오는 어린이라서 female 음성을 baseline으로 사용 (대부분 environment에서 더 높고 부드러움)
  // 그 위에 pitch를 조정해서 어린이 톤에 가깝게
  haru:     { pitch: 1.4,  rate: 1.0,  gender: 'female' }, // 형(초4) - 차분한 어린이
  rio:      { pitch: 1.9,  rate: 1.15, gender: 'female' }, // 동생(초1) - 밝고 빠른 어린이
  mina:     { pitch: 1.6,  rate: 1.0,  gender: 'female' }, // 친구(소녀)
  yamada:   { pitch: 0.8,  rate: 0.9,  gender: 'male' },   // 관리인 - 어른 남자
  mori:     { pitch: 1.3,  rate: 1.0,  gender: 'female' }, // 음악 선생님(여성)
  mystery:  { pitch: 0.7,  rate: 0.85, gender: 'male' },   // 미스터리 - 낮은 톤
  ojiisan:  { pitch: 0.85, rate: 0.85, gender: 'male' },   // 할아버지
  tanaka:   { pitch: 1.0,  rate: 0.95, gender: 'male' },   // 의사
  narrator: { pitch: 1.1,  rate: 0.95, gender: 'female' }, // 해설
  // v37: 과학 추리용
  sensei:   { pitch: 0.9,  rate: 0.9,  gender: 'male' },   // 박사·교수
  suspect:  { pitch: 1.0,  rate: 1.0,  gender: 'male' },   // 용의자
};

function initVoices() {
  if (!('speechSynthesis' in window)) return;
  // 음성 목록은 비동기 로드되므로 한 번 호출 후 voiceschanged 이벤트로 다시 시도
  function loadVoices() {
    const voices = window.speechSynthesis.getVoices();
    if (voices.length === 0) return;
    // 일본어 음성만 필터
    const jaVoices = voices.filter(v => v.lang.startsWith('ja'));
    if (jaVoices.length === 0) return;
    // 성별별 후보 분류 (이름에 흔히 들어가는 키워드로 대략 구분)
    // 윈도우: Haruka(F), Ayumi(F), Ichiro(M), Sayaka(F), Nanami(F), Keita(M)
    // 맥/iOS: Kyoko(F), Otoya(M)
    // 안드로이드/크롬: ja-JP voice들
    const femaleHints = ['Kyoko', 'Haruka', 'Ayumi', 'Sayaka', 'Nanami', 'Female', 'female'];
    const maleHints = ['Otoya', 'Ichiro', 'Keita', 'Male', 'male'];
    const voicesByGender = { male: [], female: [], any: jaVoices };
    jaVoices.forEach(v => {
      if (femaleHints.some(h => v.name.includes(h))) voicesByGender.female.push(v);
      else if (maleHints.some(h => v.name.includes(h))) voicesByGender.male.push(v);
    });
    // 매칭 안 되면 기본 음성 사용
    if (voicesByGender.male.length === 0) voicesByGender.male = jaVoices;
    if (voicesByGender.female.length === 0) voicesByGender.female = jaVoices;

    // 캐릭터별 음성 할당
    Object.entries(VOICE_PROFILES).forEach(([cls, profile]) => {
      const pool = voicesByGender[profile.gender] || jaVoices;
      State.jaVoices[cls] = pool[0]; // 첫 번째 매칭 음성 사용
    });
    State.jaVoice = jaVoices[0];
  }
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

function speakLine(line) {
  if (!State.voiceOn || !line || !line.text) return;
  if (!('speechSynthesis' in window)) return;
  // 이전 음성 중단
  try { window.speechSynthesis.cancel(); } catch(e) {}

  const cls = line.cls || 'narrator';
  const profile = VOICE_PROFILES[cls] || VOICE_PROFILES.narrator;
  const voice = State.jaVoices[cls] || State.jaVoice;
  if (!voice) return; // 일본어 음성 없는 환경

  // 텍스트에서 감정 부호 정리 (음성 합성에 좋게)
  const cleanText = line.text
    .replace(/[「」『』]/g, '') // 따옴표 제거
    .replace(/…+/g, '、')        // 말줄임 → 쉼표
    .replace(/!+/g, '!')          // 느낌표 정리
    // v38: TTS 읽기 보정 (한자 → 정확한 가나)
    .replace(/ハル君/g, 'ハルくん')
    .replace(/リオ君/g, 'リオくん')
    .replace(/お兄ちゃん/g, 'おにいちゃん')
    .replace(/僕/g, 'ぼく')
    .replace(/俺/g, 'おれ')
    .replace(/私/g, 'わたし')
    .replace(/貴方/g, 'あなた')
    .replace(/何故/g, 'なぜ')
    .replace(/誰/g, 'だれ')
    .replace(/何/g, 'なに')
    .replace(/\s+/g, ' ')
    .trim();
  if (!cleanText) return;

  const u = new SpeechSynthesisUtterance(cleanText);
  u.voice = voice;
  u.lang = 'ja-JP';
  u.pitch = profile.pitch;
  u.rate = profile.rate;
  u.volume = State.voiceVolume;
  State.currentUtterance = u;
  try { window.speechSynthesis.speak(u); } catch(e) {}
}

function stopVoice() {
  if (!('speechSynthesis' in window)) return;
  try { window.speechSynthesis.cancel(); } catch(e) {}
}

function toggleVoice() {
  State.voiceOn = !State.voiceOn;
  if (!State.voiceOn) stopVoice();
  saveState();
  updateVoiceButton();
}

function updateVoiceButton() {
  const btn = document.getElementById('btnVoice');
  if (btn) {
    btn.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btn.style.opacity = State.voiceOn ? '1' : '0.5';
  }
  // v37: 과학 추리 음성 버튼도 동기화
  const btnSci = document.getElementById('btnVoiceSci');
  if (btnSci) {
    btnSci.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btnSci.style.opacity = State.voiceOn ? '1' : '0.5';
  }
  // v45: 세계 추리 음성 버튼
  const btnWld = document.getElementById('btnVoiceWorld');
  if (btnWld) {
    btnWld.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btnWld.style.opacity = State.voiceOn ? '1' : '0.5';
  }
  // v64: 文学・芸術·ビジネス·経済史 음성 버튼 동기화
  const btnLit = document.getElementById('btnVoiceLit');
  if (btnLit) {
    btnLit.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btnLit.style.opacity = State.voiceOn ? '1' : '0.5';
  }
  const btnBiz = document.getElementById('btnVoiceBiz');
  if (btnBiz) {
    btnBiz.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btnBiz.style.opacity = State.voiceOn ? '1' : '0.5';
  }
  const btnHist = document.getElementById('btnVoiceHist');
  if (btnHist) {
    btnHist.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btnHist.style.opacity = State.voiceOn ? '1' : '0.5';
  }
  // v65: 社会科 음성 버튼
  const btnSoc = document.getElementById('btnVoiceSoc');
  if (btnSoc) {
    btnSoc.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btnSoc.style.opacity = State.voiceOn ? '1' : '0.5';
  }
  // v67: 日常のお金 음성 버튼
  const btnMon = document.getElementById('btnVoiceMon');
  if (btnMon) {
    btnMon.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btnMon.style.opacity = State.voiceOn ? '1' : '0.5';
  }
  // v71: 🌦 気象予報士 음성 버튼
  const btnWea = document.getElementById('btnVoiceWea');
  if (btnWea) {
    btnWea.textContent = State.voiceOn ? '🔊 音声ON' : '🔇 音声OFF';
    btnWea.style.opacity = State.voiceOn ? '1' : '0.5';
  }
}


function playBGM(mood) {
  if (!State.audioCtx || !State.audioOn) return;
  stopBGM();
  const patterns = {
    title:[392,440,523,659,587,523,440,392],
    quiet:[261.63,329.63,392,329.63,293.66,261.63,246.94,261.63],
    mystery:[196,233,261,233,196,174,196,233],
    happy:[392,523,659,523,587,698,587,523],
    eng:[523,587,659,698,659,587,523,440],
    // v32: 과학 추리 시리즈용 BGM (사건별 분위기)
    sci_chem:    [261.63, 311.13, 369.99, 392.00, 369.99, 311.13, 293.66, 261.63],  // 1장: 차분한 마이너 (Cm)
    sci_space:   [220.00, 277.18, 329.63, 392.00, 466.16, 392.00, 329.63, 277.18],  // 2장: 광활한 (Am add9 풍)
    sci_bio:     [293.66, 349.23, 392.00, 466.16, 523.25, 466.16, 392.00, 349.23],  // 3장: 부드러운 (Dm)
    sci_phys:    [261.63, 329.63, 415.30, 493.88, 415.30, 329.63, 311.13, 261.63],  // 4장: 신비한 (Cm/G♭)
    sci_paleo:   [196.00, 246.94, 293.66, 369.99, 311.13, 293.66, 246.94, 196.00],  // 5장 中ボス: 무거운 (Gm)
    sci_med:     [277.18, 329.63, 415.30, 466.16, 415.30, 329.63, 311.13, 277.18],  // 6장: 차분한 (C#m)
    sci_weather: [233.08, 277.18, 349.23, 415.30, 466.16, 415.30, 349.23, 277.18],  // 7장: 변화있는
    sci_robot:   [196.00, 261.63, 311.13, 392.00, 466.16, 392.00, 311.13, 261.63],  // 8장: 기계적 (Gm)
    sci_quantum: [220.00, 277.18, 311.13, 415.30, 311.13, 277.18, 233.08, 196.00],  // 9장: 양자적 흔들림
    sci_boss:    [174.61, 220.00, 261.63, 329.63, 392.00, 329.63, 261.63, 196.00],  // 10장 ボス: 극적 (Fm)
  };
  const notes = patterns[mood] || patterns.quiet;
  const gain = State.audioCtx.createGain();
  gain.gain.value = 0.04;
  gain.connect(State.audioCtx.destination);
  let i = 0;
  State.bgmInterval = setInterval(() => {
    if (!State.audioOn || !State.audioCtx) return;
    const o = State.audioCtx.createOscillator();
    const g = State.audioCtx.createGain();
    o.frequency.value = notes[i % notes.length];
    o.type = 'triangle';
    g.gain.setValueAtTime(0, State.audioCtx.currentTime);
    g.gain.linearRampToValueAtTime(0.4, State.audioCtx.currentTime + 0.05);
    g.gain.linearRampToValueAtTime(0, State.audioCtx.currentTime + 0.5);
    o.connect(g).connect(gain);
    o.start();
    o.stop(State.audioCtx.currentTime + 0.55);
    i++;
  }, 500);
}

function stopBGM() {
  if (State.bgmInterval) clearInterval(State.bgmInterval);
  State.bgmInterval = null;
}

function sfx(type) {
  if (!State.audioCtx || !State.audioOn) return;
  const ctx = State.audioCtx;
  const tone = (f, d, w, t, g) => {
    const o = ctx.createOscillator();
    const gn = ctx.createGain();
    o.type = t || 'sine'; o.frequency.value = f;
    gn.gain.setValueAtTime(g || 0.12, ctx.currentTime + (w||0));
    gn.gain.linearRampToValueAtTime(0, ctx.currentTime + (w||0) + d);
    o.connect(gn).connect(ctx.destination);
    o.start(ctx.currentTime + (w||0));
    o.stop(ctx.currentTime + (w||0) + d);
  };
  if (type === 'correct') [523,659,784,1046].forEach((f,i) => tone(f,0.2,i*0.08));
  else if (type === 'wrong') tone(196,0.4,0,'sawtooth',0.1);
  else if (type === 'click') tone(800,0.06,0,'sine',0.1);
  else if (type === 'page') { tone(440,0.1); tone(660,0.1,0.05); }
  else if (type === 'chime') [659,784,1046].forEach((f,i) => tone(f,0.3,i*0.1));
  // v32: 과학 추리 전용 효과음
  else if (type === 'clue')      [880,1100].forEach((f,i) => tone(f,0.15,i*0.08,'sine',0.13));  // 단서 발견 (キラリン!)
  else if (type === 'unlock')    [659,880,1318].forEach((f,i) => tone(f,0.18,i*0.06,'triangle',0.12));  // 문제 풀림
  else if (type === 'reveal')    { tone(220,0.3,0,'sawtooth',0.08); tone(440,0.4,0.1,'sawtooth',0.1); tone(660,0.5,0.2,'sawtooth',0.12); }  // 모순 발견 (緊張感)
  else if (type === 'select')    tone(660,0.08,0,'square',0.08);  // 용의자 선택
  else if (type === 'resolved')  [523,659,784,1046,1318].forEach((f,i) => tone(f,0.4,i*0.12,'sine',0.13));  // 해결!
  else if (type === 'thinking')  tone(330,0.15,0,'sine',0.06);  // 생각 중
}
