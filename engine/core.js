/* engine/core.js — extracted from index.html (v73 step4b)
 * Original location: lines 363-786 (post-step4a index.html)
 * Contents: vocab composites (ALL_VERBS/NOUNS/ADJADV/G2/IDIOMS/PRE1/DAILY/SCHOOL), CHAPTER BUILDER (shuffleArr, makeMeaningQuestion, buildChapter, buildAllChapters, buildReviewChapter), ENG_CHAPTERS init, STATE (State, SAVE_KEY), SAVE/LOAD (saveState, loadState, resetSave), WRONG WORDS (addWrongWord, markWordCorrect, getWrongWords)
 * Dependencies: data/vocab.js (G2_*, IDIOMS_*, G_PRE1_*, DAILY_PHRASES, SCHOOL_WORDS)
 * Top-level execution: line ~552 (post-step4a) — `let ENG_CHAPTERS = buildAllChapters();` runs at load time. All deps in same file (above).
 * Load order: FIRST among engine modules (everyone references State).
 */
// ============================================================
// 게임 로직 재시작 (이후 코드는 위 데이터 모듈에 의존)
// ============================================================

const ALL_VERBS = [...G2_VERBS, ...G2_VERBS_PLUS, ...G2_VERBS_PLUS2];
const ALL_NOUNS = [...G2_NOUNS, ...G2_NOUNS_PLUS, ...G2_NOUNS_PLUS2];
const ALL_ADJADV = [...G2_ADJADV, ...G2_ADJADV_PLUS, ...G2_ADJADV_PLUS2];
const ALL_G2 = [...ALL_VERBS, ...ALL_NOUNS, ...ALL_ADJADV];
const ALL_IDIOMS = [...IDIOMS_G3, ...IDIOMS_G3_PLUS, ...IDIOMS_G_PRE2, ...IDIOMS_G_PRE2_PLUS, ...IDIOMS_G2, ...IDIOMS_G2_PLUS];
const ALL_PRE1 = [...G_PRE1_WORDS, ...G_PRE1_WORDS_PLUS];
const ALL_DAILY = DAILY_PHRASES;
const ALL_SCHOOL = SCHOOL_WORDS;


// ============================================================
// CHAPTER BUILDER - 단어 풀에서 챕터 자동 생성
// ============================================================

// 배열 셔플 (Fisher-Yates)
function shuffleArr(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 단어 풀에서 4지선다 문제 생성
// 정답 단어 + 오답 후보 풀에서 3개 선택
function makeMeaningQuestion(item, distractorPool) {
  const correctMeaning = item.ja;
  // 같은 풀에서 정답을 제외하고 3개 무작위 선택
  const candidates = distractorPool.filter(x => x.ja !== correctMeaning);
  const shuffled = shuffleArr(candidates).slice(0, 3);
  const wrongs = shuffled.map(x => x.ja);
  // 4개 보기를 섞고 정답 인덱스 찾기
  const all = shuffleArr([correctMeaning, ...wrongs]);
  return {
    type: 'meaning',
    q: item.en,
    a: all,
    correct: all.indexOf(correctMeaning),
  };
}

// 챕터 1개 생성 (단어 풀 + 문항 수)
function buildChapter(id, icon, title, desc, sourceArr, count, type) {
  const sample = shuffleArr(sourceArr).slice(0, count);
  let questions;
  if (type === 'meaning') {
    questions = sample.map(item => makeMeaningQuestion(item, sourceArr));
  } else if (type === 'spell') {
    // 스펠 문제는 너무 긴 단어 제외 (12자 이내)
    const spellable = sourceArr.filter(x => x.en.length <= 10 && !/[ -]/.test(x.en));
    const spellSample = shuffleArr(spellable).slice(0, count);
    questions = spellSample.map(item => ({
      type: 'spell',
      q: item.ja,
      word: item.en.toUpperCase(),
    }));
  }
  return {
    id, icon, title, desc, questions,
    note: { title: title + ' クリア', desc: desc + ' を マスター!' },
  };
}

// 모든 챕터 정의 (실행 시점에 단어 무작위 추출)
function buildAllChapters() {
  const chapters = [
    // ===== G2 動詞 5개 (총 204개) =====
    buildChapter('v1', '🏃', '動詞 ①', 'よくでる 動詞', ALL_VERBS.slice(0, 50), 15, 'meaning'),
    buildChapter('v2', '🏃', '動詞 ②', 'よくでる 動詞', ALL_VERBS.slice(40, 90), 15, 'meaning'),
    buildChapter('v3', '🏃', '動詞 ③', 'よくでる 動詞', ALL_VERBS.slice(80, 130), 15, 'meaning'),
    buildChapter('v4', '🏃', '動詞 ④', 'よくでる 動詞', ALL_VERBS.slice(120, 170), 15, 'meaning'),
    buildChapter('v5', '🏃', '動詞 ⑤', 'よくでる 動詞', ALL_VERBS.slice(160), 15, 'meaning'),
    // ===== G2 名詞 5개 (총 222개) =====
    buildChapter('n1', '📦', '名詞 ①', 'よくでる 名詞', ALL_NOUNS.slice(0, 50), 15, 'meaning'),
    buildChapter('n2', '📦', '名詞 ②', 'よくでる 名詞', ALL_NOUNS.slice(40, 90), 15, 'meaning'),
    buildChapter('n3', '📦', '名詞 ③', 'よくでる 名詞', ALL_NOUNS.slice(80, 130), 15, 'meaning'),
    buildChapter('n4', '📦', '名詞 ④', 'よくでる 名詞', ALL_NOUNS.slice(120, 175), 15, 'meaning'),
    buildChapter('n5', '📦', '名詞 ⑤', 'よくでる 名詞', ALL_NOUNS.slice(170), 15, 'meaning'),
    // ===== G2 形容詞 5개 (총 203개) =====
    buildChapter('a1', '🌈', '形容詞 ①', 'よくでる 形容詞', ALL_ADJADV.slice(0, 50), 15, 'meaning'),
    buildChapter('a2', '🌈', '形容詞 ②', 'よくでる 形容詞', ALL_ADJADV.slice(40, 90), 15, 'meaning'),
    buildChapter('a3', '🌈', '形容詞 ③', 'よくでる 形容詞', ALL_ADJADV.slice(80, 130), 15, 'meaning'),
    buildChapter('a4', '🌈', '形容詞 ④', 'よくでる 形容詞', ALL_ADJADV.slice(120, 170), 15, 'meaning'),
    buildChapter('a5', '🌈', '形容詞 ⑤', 'よくでる 形容詞', ALL_ADJADV.slice(160), 15, 'meaning'),
    // ===== 熟語 6개 (3개 + 추가 3개) =====
    buildChapter('i1', '🔗', '熟語 (3級) ①', '中学校レベル', [...IDIOMS_G3], 15, 'meaning'),
    buildChapter('i2', '🔗', '熟語 (3級) ②', '中学校レベル', [...IDIOMS_G3_PLUS], 15, 'meaning'),
    buildChapter('i3', '🔗', '熟語 (準2級) ①', '高校1年レベル', [...IDIOMS_G_PRE2], 15, 'meaning'),
    buildChapter('i4', '🔗', '熟語 (準2級) ②', '高校1年レベル', [...IDIOMS_G_PRE2_PLUS], 15, 'meaning'),
    buildChapter('i5', '🔗', '熟語 (2級) ①', '高校2年レベル', [...IDIOMS_G2], 15, 'meaning'),
    buildChapter('i6', '🔗', '熟語 (2級) ②', '高校2年レベル', [...IDIOMS_G2_PLUS], 15, 'meaning'),
    // ===== 신규: 日常会話 2개 (50개) =====
    buildChapter('d1', '💬', '日常会話 ①', 'まいにち つかえる', ALL_DAILY.slice(0, 25), 12, 'meaning'),
    buildChapter('d2', '💬', '日常会話 ②', 'まいにち つかえる', ALL_DAILY.slice(25), 12, 'meaning'),
    // ===== 신규: 学校生活 2개 (40개) =====
    buildChapter('sc1', '🎒', '学校の 単語 ①', 'がっこうで つかう', ALL_SCHOOL.slice(0, 20), 12, 'meaning'),
    buildChapter('sc2', '🎒', '学校の 単語 ②', 'がっこうで つかう', ALL_SCHOOL.slice(20), 12, 'meaning'),
    // ===== 준1급 3개 (총 152개, 도전!) =====
    buildChapter('p1', '🔥', '準1級 ①', 'チャレンジ!むずかしい', ALL_PRE1.slice(0, 50), 15, 'meaning'),
    buildChapter('p2', '🔥', '準1級 ②', 'チャレンジ!むずかしい', ALL_PRE1.slice(40, 100), 15, 'meaning'),
    buildChapter('p3', '🔥', '準1級 ③', 'チャレンジ!むずかしい', ALL_PRE1.slice(100), 15, 'meaning'),
    // ===== 종합 =====
    buildChapter('mix2', '⭐', '腕だめし!2級', 'ぜんぶ ごちゃまぜ', [...ALL_G2, ...ALL_IDIOMS], 25, 'meaning'),
    buildChapter('mixall', '🌟', 'マスター挑戦', '2級+準1級ぜんぶ', [...ALL_G2, ...ALL_IDIOMS, ...ALL_PRE1], 30, 'meaning'),
    // ===== スペル =====
    buildChapter('s1', '✏️', 'スペル ①', '基本のスペル', ALL_G2.slice(0, 100), 10, 'spell'),
    buildChapter('s2', '✏️', 'スペル ②', '応用のスペル', ALL_G2.slice(100, 250), 10, 'spell'),
    buildChapter('s3', '✏️', 'スペル ③', 'むずかしいスペル', ALL_G2.slice(250), 10, 'spell'),
    // ===== ✍️ ライティング (영검 2급, 30주제) =====
    { id: 'wr1', icon: '✍️', title: 'ライティング ①', desc: '環境・教育 (10題)', isWriting: true, topics: ALL_WRITING.slice(0, 10) },
    { id: 'wr2', icon: '✍️', title: 'ライティング ②', desc: '技術・健康 (10題)', isWriting: true, topics: ALL_WRITING.slice(10, 20) },
    { id: 'wr3', icon: '✍️', title: 'ライティング ③', desc: '社会・生活 (10題)', isWriting: true, topics: ALL_WRITING.slice(20) },
    // ===== 📐 文法 (영검 2급, 50문제) =====
    { id: 'gr1', icon: '📐', title: '文法 ① 時制', desc: '現在/過去/完了形', isGrammar: true, topics: GRAMMAR_TOPICS.filter(g => g.cat === '⏰ 時制') },
    { id: 'gr2', icon: '📐', title: '文法 ② 仮定法', desc: 'If / I wish / as if', isGrammar: true, topics: GRAMMAR_TOPICS.filter(g => g.cat === '🎲 仮定法') },
    { id: 'gr3', icon: '📐', title: '文法 ③ 関係詞', desc: 'who/which/whose', isGrammar: true, topics: GRAMMAR_TOPICS.filter(g => g.cat === '🔗 関係詞') },
    { id: 'gr4', icon: '📐', title: '文法 ④ to V/-ing', desc: '不定詞・動名詞・分詞', isGrammar: true, topics: GRAMMAR_TOPICS.filter(g => g.cat === '📝 -ing/to V') },
    { id: 'gr5', icon: '📐', title: '文法 ⑤ 受動態・比較・助動詞', desc: 'パッシブ・比較・モーダル', isGrammar: true, topics: GRAMMAR_TOPICS.filter(g => g.cat === '🔄 受動態' || g.cat === '📊 比較' || g.cat === '💪 助動詞') },
    // ===== 🎯 준1급 문법 (v23) =====
    { id: 'p1g1', icon: '🎯', title: '準1級 ① 倒置', desc: 'Never/Hardly/Only…', isGrammar: true, isPre1: true, topics: GRAMMAR_PRE1_TOPICS.filter(g => g.cat === '🔄 倒置') },
    { id: 'p1g2', icon: '🎯', title: '準1級 ② 強調', desc: 'It is X that…', isGrammar: true, isPre1: true, topics: GRAMMAR_PRE1_TOPICS.filter(g => g.cat === '💪 強調') },
    { id: 'p1g3', icon: '🎯', title: '準1級 ③ 高級分詞構文', desc: 'Having p.p./Being…', isGrammar: true, isPre1: true, topics: GRAMMAR_PRE1_TOPICS.filter(g => g.cat === '📝 分詞構文') },
    { id: 'p1g4', icon: '🎯', title: '準1級 ④ 複合関係詞・名詞節', desc: 'whoever/whatever/whether', isGrammar: true, isPre1: true, topics: GRAMMAR_PRE1_TOPICS.filter(g => g.cat === '🔗 関係詞' || g.cat === '📚 名詞節') },
    { id: 'p1g5', icon: '🎯', title: '準1級 ⑤ 高級仮定法・時制・慣用', desc: 'mixed/were to/lest/no longer', isGrammar: true, isPre1: true, topics: GRAMMAR_PRE1_TOPICS.filter(g => g.cat === '🎲 仮定法' || g.cat === '⏰ 時制' || g.cat === '💡 慣用表現') },
    // ===== 🎯 준1급 라이팅 (v24) =====
    { id: 'p1w1', icon: '🎯', title: '準1級 ライティング ①', desc: 'AI・環境・社会 (5題)', isWriting: true, isPre1: true, isPre1Writing: true, topics: ALL_WRITING_PRE1.slice(0, 5) },
    { id: 'p1w2', icon: '🎯', title: '準1級 ライティング ②', desc: '教育・医療・国際 (5題)', isWriting: true, isPre1: true, isPre1Writing: true, topics: ALL_WRITING_PRE1.slice(5, 10) },
    { id: 'p1w3', icon: '🎯', title: '準1級 ライティング ③', desc: '科学・政治・経済 (5題)', isWriting: true, isPre1: true, isPre1Writing: true, topics: ALL_WRITING_PRE1.slice(10) },
    // ===== 📝 英作文チャレンジ (v21) =====
    { id: 'comp1', icon: '📝', title: '英作文 ① 初級', desc: '5~7語の文 (20問)', isComposition: true, level: 'beginner', topics: COMPOSITION_DATA.beginner },
    { id: 'comp2', icon: '📝', title: '英作文 ② 中級', desc: '8~12語の文 (20問)', isComposition: true, level: 'intermediate', topics: COMPOSITION_DATA.intermediate },
    { id: 'comp3', icon: '📝', title: '英作文 ③ 上級', desc: '13~20語の文 (20問)', isComposition: true, level: 'advanced', topics: COMPOSITION_DATA.advanced },
    // ===== 🎭 ライティング表現辞典 (v21) =====
    { id: 'phrase', icon: '🎭', title: '表現辞典', desc: 'ライティング 表現 110+', isPhraseDict: true },
    // ===== 📅 매일의 영어 미션 (v21) =====
    { id: 'daily', icon: '📅', title: '毎日の ミッション', desc: '今日の 英作文 (30種)', isDailyMission: true },
    // ===== 📰 英語ニュース見出し (v22) =====
    { id: 'news', icon: '📰', title: 'ニュース 見出し', desc: '40 見出し / 5 カテゴリ', isNews: true },
    // ===== 🧩 합성어 게임 (v22 기본 + v23 어려운 모드 3개) =====
    { id: 'compound', icon: '🧩', title: '合成語ゲーム ① 基本', desc: '日常合成語 (50種)', isCompound: true, mode: 'basic' },
    { id: 'compoundH1', icon: '🧩', title: '合成語ゲーム ② 隠し', desc: '両方ブランク・推理 (50種)', isCompound: true, mode: 'hidden' },
    { id: 'compoundH2', icon: '🧩', title: '合成語ゲーム ③ 高級', desc: '抽象的合成語 (50種)', isCompound: true, mode: 'advanced' },
    { id: 'compoundH3', icon: '🧩', title: '合成語ゲーム ④ 意味', desc: '意味あて (50種)', isCompound: true, mode: 'meaning' },
  ];

  // 복습 챕터 (틀린 단어가 있을 때만 추가)
  const wrongList = getWrongWords();
  if (wrongList.length >= 4) {
    chapters.push(buildReviewChapter(wrongList));
  }

  // 추리+영어 통합 챕터 (스토리형)
  ENG_MYSTERY_STORIES.forEach(s => {
    chapters.push({
      id: s.id,
      icon: s.icon,
      title: s.title,
      desc: s.desc,
      isEngMystery: true,
      story: s,
      questions: [s.puzzle], // 단일 퍼즐
      note: s.note,
    });
  });

  return chapters;
}

// 틀린 단어들로 복습 챕터 만들기
function buildReviewChapter(wrongList) {
  const count = Math.min(wrongList.length, 15);
  const sample = shuffleArr(wrongList).slice(0, count);
  // 오답 보기는 전체 단어 풀에서
  const distractorPool = [...ALL_G2, ...ALL_IDIOMS, ...G_PRE1_WORDS];
  const questions = sample.map(item => makeMeaningQuestion(item, distractorPool));
  return {
    id: 'review', icon: '📝', title: '復習チャレンジ', desc: 'まちがえた 単語',
    questions,
    note: { title: '復習 クリア!', desc: 'まちがえた 単語を マスター!' },
    isReview: true,
  };
}

// 처음 로드 시 한 번 빌드 (이후 챕터 시작할 때마다 재빌드해서 매번 다른 문제 출제)
let ENG_CHAPTERS = buildAllChapters();


// ============================================================
// STATE
// ============================================================
const State = {
  cleared: new Array(STORY.length).fill(false),
  gateCleared: new Array(STORY.length).fill(false), // v27: 각 장 후 관문 통과 여부
  engCleared: new Array(ENG_CHAPTERS.length).fill(false),
  // v31: 과학 추리 시리즈 진행도
  scienceCleared: new Array(SCIENCE_STORY.length).fill(false),
  // v45: 세계 추리 시리즈 진행도 (10장)
  worldCleared: new Array(10).fill(false),
  litCleared: new Array(10).fill(false),  // v53: 文学・芸術 시리즈 클리어 상태
  bizCleared: new Array(10).fill(false),  // v58: ビジネス・企業 시리즈 클리어 상태
  histCleared: new Array(10).fill(false),  // v62: 世界経済·貿易史 시리즈 클리어 상태
  socCleared: new Array(10).fill(false),  // v65: 社会科総合 시리즈 클리어 상태
  monCleared: new Array(10).fill(false),  // v67: 日常のお金 시리즈 클리어 상태
  weaCleared: new Array(10).fill(false),  // v71: 🌦 気象予報士 시리즈 클리어 상태
  // v30: 게임 토큰 시스템 (5챕터 클리어마다 1토큰)
  engClearCount: 0,    // 누적 영어 챕터 클리어 수 (토큰 환산용)
  gameTokens: 0,       // 현재 보유 토큰
  tokensUsed: 0,       // 사용한 토큰 누계 (통계용)
  notes: [],
  currentChapter: 0,
  currentTab: 'story',
  engSubTab: 'vocab', // v21: vocab | writing | grammar | extra (영어 탭 안에서)
  dialogueQueue: [],
  dialogueIdx: 0,
  audioCtx: null,
  audioOn: true,
  bgmInterval: null,
  // 음성 관련
  voiceOn: true, // Web Speech API 음성 재생
  voiceVolume: 1.0,
  jaVoice: null, // 선택된 일본어 음성 객체
  jaVoices: {}, // 캐릭터별 음성 매핑 캐시
  currentUtterance: null,
  // 英語 진행
  engChapter: 0,
  engQIdx: 0,
  engCorrect: 0,
  engCurrentQuestion: null,
  engMysteryActive: null, // 영어추리 챕터 진행 중일 때 챕터 idx
  // 틀린 단어 추적: { 'achieve': { count: 3, ja: '...' }, ... }
  wrongWords: {},
  // 통계
  stats: { totalCorrect: 0, totalWrong: 0, chaptersPlayed: 0 },
};

// ============================================================
// SAVE / LOAD (localStorage)
// ============================================================
const SAVE_KEY = 'haruRioGameSave_v6';

function saveState() {
  try {
    const data = {
      cleared: State.cleared,
      gateCleared: State.gateCleared,
      engCleared: State.engCleared,
      scienceCleared: State.scienceCleared,
      worldCleared: State.worldCleared,
      litCleared: State.litCleared,  // v53
      bizCleared: State.bizCleared,  // v58
      histCleared: State.histCleared,  // v62
      socCleared: State.socCleared,  // v65
      monCleared: State.monCleared,  // v67
      weaCleared: State.weaCleared,  // v71
      notes: State.notes,
      wrongWords: State.wrongWords,
      stats: State.stats,
      quizStats: State.quizStats || {},
      gameStats: State.gameStats || {},
      engClearCount: State.engClearCount || 0,
      gameTokens: State.gameTokens || 0,
      tokensUsed: State.tokensUsed || 0,
      voiceOn: State.voiceOn,
    };
    localStorage.setItem(SAVE_KEY, JSON.stringify(data));
  } catch(e) {
    console.log('Save unavailable:', e.message);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (Array.isArray(data.cleared)) {
      data.cleared.slice(0, State.cleared.length).forEach((v, i) => {
        State.cleared[i] = v;
      });
    }
    if (Array.isArray(data.gateCleared)) {
      data.gateCleared.slice(0, State.gateCleared.length).forEach((v, i) => {
        State.gateCleared[i] = v;
      });
    }
    if (Array.isArray(data.engCleared)) {
      data.engCleared.slice(0, State.engCleared.length).forEach((v, i) => {
        State.engCleared[i] = v;
      });
    }
    if (Array.isArray(data.scienceCleared)) {
      data.scienceCleared.slice(0, State.scienceCleared.length).forEach((v, i) => {
        State.scienceCleared[i] = v;
      });
      // v33: 새 사건 추가시 배열 늘림 (기존은 false 유지)
      while (State.scienceCleared.length < SCIENCE_STORY.length) {
        State.scienceCleared.push(false);
      }
    }
    if (Array.isArray(data.worldCleared)) {
      data.worldCleared.slice(0, State.worldCleared.length).forEach((v, i) => {
        State.worldCleared[i] = v;
      });
      while (State.worldCleared.length < 10) {
        State.worldCleared.push(false);
      }
    }
    if (Array.isArray(data.litCleared)) {  // v53: 文学・芸術 시리즈 복원
      data.litCleared.slice(0, State.litCleared.length).forEach((v, i) => {
        State.litCleared[i] = v;
      });
      while (State.litCleared.length < LIT_STORY.length) {
        State.litCleared.push(false);
      }
    }
    if (Array.isArray(data.bizCleared)) {  // v58: ビジネス・企業 시리즈 복원
      data.bizCleared.slice(0, State.bizCleared.length).forEach((v, i) => {
        State.bizCleared[i] = v;
      });
      while (State.bizCleared.length < BIZ_STORY.length) {
        State.bizCleared.push(false);
      }
    }
    if (Array.isArray(data.histCleared)) {  // v62: 世界経済·貿易史 시리즈 복원
      data.histCleared.slice(0, State.histCleared.length).forEach((v, i) => {
        State.histCleared[i] = v;
      });
      while (State.histCleared.length < HIST_STORY.length) {
        State.histCleared.push(false);
      }
    }
    if (Array.isArray(data.socCleared)) {  // v65: 社会科総合 시리즈 복원
      data.socCleared.slice(0, State.socCleared.length).forEach((v, i) => {
        State.socCleared[i] = v;
      });
      while (State.socCleared.length < SOC_STORY.length) {
        State.socCleared.push(false);
      }
    }
    if (Array.isArray(data.monCleared)) {  // v67: 日常のお金 시리즈 복원
      data.monCleared.slice(0, State.monCleared.length).forEach((v, i) => {
        State.monCleared[i] = v;
      });
      while (State.monCleared.length < MON_STORY.length) {
        State.monCleared.push(false);
      }
    }
    if (Array.isArray(data.weaCleared)) {  // v71: 🌦 気象予報士 시리즈 복원
      data.weaCleared.slice(0, State.weaCleared.length).forEach((v, i) => {
        State.weaCleared[i] = v;
      });
      while (State.weaCleared.length < WEA_STORY.length) {
        State.weaCleared.push(false);
      }
    }
    if (Array.isArray(data.notes)) State.notes = data.notes;
    if (data.wrongWords) State.wrongWords = data.wrongWords;
    if (data.stats) State.stats = Object.assign(State.stats, data.stats);
    if (data.quizStats) State.quizStats = data.quizStats;
    if (data.gameStats) State.gameStats = data.gameStats;
    if (typeof data.engClearCount === 'number') State.engClearCount = data.engClearCount;
    if (typeof data.gameTokens === 'number') State.gameTokens = data.gameTokens;
    if (typeof data.tokensUsed === 'number') State.tokensUsed = data.tokensUsed;
    if (typeof data.voiceOn === 'boolean') State.voiceOn = data.voiceOn;
  } catch(e) {
    console.log('Load failed:', e.message);
  }
}

function resetSave() {
  try { localStorage.removeItem(SAVE_KEY); } catch(e) {}
  State.cleared = new Array(STORY.length).fill(false);
  State.gateCleared = new Array(STORY.length).fill(false);
  State.engCleared = new Array(ENG_CHAPTERS.length).fill(false);
  State.scienceCleared = new Array(SCIENCE_STORY.length).fill(false);
  State.worldCleared = new Array(10).fill(false);
  State.notes = [];
  State.wrongWords = {};
  State.stats = { totalCorrect: 0, totalWrong: 0, chaptersPlayed: 0 };
  State.quizStats = {};
  State.gameStats = {};
  State.engClearCount = 0;
  State.gameTokens = 0;
  State.tokensUsed = 0;
}

// 틀린 단어 추가
function addWrongWord(item) {
  if (!item || !item.en) return;
  const key = item.en;
  if (!State.wrongWords[key]) {
    State.wrongWords[key] = { en: item.en, ja: item.ja, count: 0 };
  }
  State.wrongWords[key].count++;
  saveState();
}

// 틀린 단어 풀에서 정답 시 카운트 감소 (3번 맞히면 제거)
function markWordCorrect(item) {
  if (!item || !item.en) return;
  const key = item.en;
  if (State.wrongWords[key]) {
    State.wrongWords[key].count--;
    if (State.wrongWords[key].count <= 0) {
      delete State.wrongWords[key];
    }
    saveState();
  }
}

// 복습 챕터용: 현재 틀린 단어 배열 반환
function getWrongWords() {
  try {
    if (!State || !State.wrongWords) return [];
    return Object.values(State.wrongWords).map(w => ({ en: w.en, ja: w.ja }));
  } catch(e) {
    return [];
  }
}
