// ============================================================
// 시리즈 5 🎭 文学・芸術 (LIT_STORY + LIT_CASE_IMAGES)
// 원본 index.html 라인 12653 ~ 14121
// 분할 v73 (모듈화)
// ============================================================
// =========================
// 🎭 文学・芸術探偵団 시리즈 (v53)
// =========================
const LIT_CASE_IMAGES = {}; // v57: 시리즈 5 일러스트 10장 전체 통합 완료 ✓


// LIT_CASE_IMAGES update (v56)
LIT_CASE_IMAGES[1] = 'assets/img/series5-literature/lit_case_images_1.webp';
LIT_CASE_IMAGES[3] = 'assets/img/series5-literature/lit_case_images_3.webp';
LIT_CASE_IMAGES[4] = 'assets/img/series5-literature/lit_case_images_4.webp';
LIT_CASE_IMAGES[6] = 'assets/img/series5-literature/lit_case_images_6.webp';
LIT_CASE_IMAGES[8] = 'assets/img/series5-literature/lit_case_images_8.webp';
LIT_CASE_IMAGES[10] = 'assets/img/series5-literature/lit_case_images_10.webp';
LIT_CASE_IMAGES[2] = 'assets/img/series5-literature/lit_case_images_2.webp';
LIT_CASE_IMAGES[5] = 'assets/img/series5-literature/lit_case_images_5.webp';
LIT_CASE_IMAGES[7] = 'assets/img/series5-literature/lit_case_images_7.webp';
LIT_CASE_IMAGES[9] = 'assets/img/series5-literature/lit_case_images_9.webp';

const LIT_STORY = [
  // ========================================
  // 第1事件: 🎭 シェイクスピアの 失われた原稿
  // ========================================
  {
    id: 1, icon: '🎭',
    title: 'シェイクスピアの 失われた原稿',
    subtitle: '消えた「ハムレット」 の 続き!',
    theme: '英国ルネサンス文学',
    country: 'イギリス 🇬🇧',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[1],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '16世紀末の ロンドン。テムズ川の ほとりに ある グローブ座 (Globe Theatre)。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'シェイクスピアが 書いていた 新しい 戯曲 (ぎきょく) の 原稿が 一晩で 消えた!' },
      { speaker: 'バーベッジ 座長', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、よく 来てくれた。私は この 劇場の 座長、リチャード・バーベッジ。シェイクスピアの 親友だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'シェイクスピアって 有名な 劇作家ですよね!' },
      { speaker: 'バーベッジ 座長', cls: 'sensei', charKey: 'ojiisan',
        text: 'そう、彼は 4大悲劇 (ハムレット、マクベス、リア王、オセロ) の 作者だ。今は 新作を 書いていた。だが 昨夜 原稿が 消えた…' },
      { speaker: 'バーベッジ 座長', cls: 'sensei', charKey: 'ojiisan',
        text: '劇団員 3人が 怪しい。みな 文学の 知識を 自慢しているが、本当の 専門家は 誰なのか…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'シェイクスピアの 知識で 嘘を 見抜きましょう!' },
    ],
    steps: [
      // STEP 1: 4대 비극
      {
        id: 'step1', type: 'mc',
        title: '🎭 STEP 1: シェイクスピアの 4大悲劇',
        intro: [
          { speaker: 'バーベッジ 座長', cls: 'sensei', charKey: 'ojiisan', text: '消えた 原稿は 4大悲劇の 1つに 関係する 続編らしい。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '4大悲劇を 確認しましょう。' },
        ],
        puzzle: {
          prompt: 'シェイクスピアの 4大悲劇に 含まれない のは どれ?',
          hint: '「ハムレット」「マクベス」「リア王」「オセロ」が 4大悲劇。「ロミオとジュリエット」は 含まれない。',
          options: [
            'ハムレット',
            'マクベス',
            'ロミオとジュリエット',
            'オセロ',
          ],
          answer: 2,
          explanation: 'シェイクスピアの 4大悲劇は「ハムレット」「マクベス」「リア王」「オセロ」。「ロミオとジュリエット」は 有名だが 4大悲劇には 含まれない (悲恋劇として 別分類)。',
        },
        clue: { title: '4大悲劇の 知識', desc: '4大悲劇 = ハムレット·マクベス·リア王·オセロ。ロミオとジュリエットは 含まれない。' },
      },
      // STEP 2: 명대사
      {
        id: 'step2', type: 'mc',
        title: '📜 STEP 2: 有名な セリフ',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'シェイクスピアの セリフって 何が 有名なの?' },
          { speaker: 'バーベッジ 座長', cls: 'sensei', charKey: 'ojiisan', text: '「To be, or not to be」 (生きるべきか 死ぬべきか) は 一番 有名な セリフだ。' },
        ],
        puzzle: {
          prompt: '「To be, or not to be, that is the question.」 は どの 作品の セリフ?',
          hint: 'デンマークの 王子が 主人公の 悲劇。',
          options: [
            'マクベス',
            'ハムレット',
            'リア王',
            'オセロ',
          ],
          answer: 1,
          explanation: '「生きるべきか、死ぬべきか、それが 問題だ」 は「ハムレット」第3幕の 独白。世界文学で 最も 有名な セリフの 1つ。',
        },
        clue: { title: '名セリフの 出典', desc: '「To be, or not to be」=「ハムレット」。第3幕の 独白。' },
      },
      // STEP 3: 결정적 모순
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者の 1人が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager3',
            text: '「私は シェイクスピアの 大ファン。"To be or not to be" は『マクベス』 の 名セリフですよ」' },
        ],
        puzzle: {
          prompt: 'この 発言は 正しい?',
          hint: 'STEP 2の 答えを 思い出そう。',
          options: [
            '正しい',
            '間違い (ハムレットの セリフ)',
            '一部だけ 正しい',
            '判断できない',
          ],
          answer: 1,
          explanation: '「To be, or not to be」 は「ハムレット」の セリフ。「マクベス」と 言うのは 基本的な 間違い。本当の シェイクスピア研究者なら 絶対に 知っている 事実。',
        },
        clue: { title: '専門家詐欺', desc: 'シェイクスピア・ファンを 名乗りながら 一番 有名な セリフの 出典を 間違えた 人物が いる。本物の ファンか 怪しい!' },
      },
    ],
    suspects: [
      {
        id: 'william', name: 'ウィリアム さん', icon: '🎩', charKey: 'tanaka',
        role: '主席俳優 (20年)',
        height: '178cm', clothes: 'エリザベス朝の 衣装',
        specialty: 'シェイクスピア劇の 主演',
        alibi: '昨夜は 自宅で セリフの 練習を していた。',
        testimony: '私は ハムレットを 何百回も 演じた。あの 有名な 独白は もちろん「ハムレット」の セリフだ。',
      },
      {
        id: 'edward', name: 'エドワード さん', icon: '👨‍🎨', charKey: 'villager3',
        role: '舞台美術担当 (5年)',
        height: '175cm', clothes: '作業着',
        specialty: '舞台装置・美術 (文学の 専門家ではない)',
        alibi: '昨夜は 倉庫で 道具の 整理を していた。',
        testimony: '私は シェイクスピアの 大ファン。「To be or not to be」 は「マクベス」 の 名セリフですよ。',
      },
      {
        id: 'mary', name: 'メアリー さん', icon: '👩', charKey: 'villager4',
        role: '衣装担当 (12年)',
        height: '162cm', clothes: '裁縫の エプロン',
        specialty: '衣装作り (劇の セリフは よく 知らない)',
        alibi: '昨夜は 衣装室で 新作の 衣装を 縫っていた。',
        testimony: '私は 衣装が 専門で、セリフは 詳しくない。でも シェイクスピアが 偉大な 作家だと いう ことは 知っている。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は シェイクスピアに 詳しい 「ふり」 を している\n② しかし「To be or not to be」 を 「マクベス」 と 間違えた\n③ 容疑者:\n  ・ウィリアム: 主演俳優 (正しく ハムレットと 答える)\n  ・エドワード: 美術担当 (「マクベス」 と 間違える)\n  ・メアリー: 衣装担当 (「セリフは 詳しくない」 と 自ら 認める)',
      question: '犯人は 誰?',
      hint: '「ファン」 を 自称しながら 一番 有名な セリフの 出典を 間違えた 人物は?',
      suspectIds: ['william', 'edward', 'mary'],
      answer: 'edward',
      explanation:
        '犯人は エドワード さん!\n\n' +
        '【推理】\n' +
        '① 原稿盗難の 動機は シェイクスピア人気を 利用した 高額売買\n' +
        '② 犯人は「ファン」 を 自称したが「To be or not to be」 を 「マクベス」 と 間違えた\n' +
        '③ 真の ファンや 専門家なら 絶対に 間違えない 基本 知識\n' +
        '④ ウィリアムは 正確、メアリーは 専門外を 自ら 認める\n' +
        '⑤ エドワードは「ふり」 を しただけで、原稿の 価値を 知り 盗んだ\n\n' +
        '文学知識の 「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🎭 シェイクスピア = 16世紀末~17世紀初の イギリス 劇作家',
      '🎭 4大悲劇 = ハムレット·マクベス·リア王·オセロ',
      '📜 「To be, or not to be」 = ハムレット 第3幕の 独白',
      '🏛 グローブ座 = ロンドンの シェイクスピア劇場',
      '💝 ロミオとジュリエットは 4大悲劇には 含まれない (悲恋劇)',
    ]},
    note: { title: '第1事件 シェイクスピア', desc: 'シェイクスピアの 4大悲劇と 名セリフを 学び、文学知識の 「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第2事件: 🎼 モーツァルトの 隠された旋律
  // ========================================
  {
    id: 2, icon: '🎼',
    title: 'モーツァルトの 隠された旋律',
    subtitle: '消えた 楽譜の 一部!',
    theme: '古典派音楽',
    country: 'オーストリア 🇦🇹',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[2],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '18世紀末の ウィーン。神聖ローマ帝国の 音楽の 都で 大事件が 起きた。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'モーツァルトが 作曲中の 新しい 協奏曲の 楽譜の 一部が 消えた!' },
      { speaker: 'シューベルト 教授', cls: 'sensei', charKey: 'mori',
        text: 'ハル君、リオ君、ようこそ。私は ウィーン宮廷音楽院の 教授だ。モーツァルト先生の 親しい 友人だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'モーツァルトって あの「キラキラ星」の 作曲家ですよね!' },
      { speaker: 'シューベルト 教授', cls: 'sensei', charKey: 'mori',
        text: 'そう。彼は 35年の 短い 生涯で 600以上の 曲を 残した 天才。今は ピアノ協奏曲を 書いていた。だが 楽譜の 第3楽章が 消えた…' },
      { speaker: 'シューベルト 教授', cls: 'sensei', charKey: 'mori',
        text: '昨夜、音楽院に 出入りしていた 3人が 怪しい。みな 音楽家を 名乗るが、本当の 専門家は 誰なのか…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'モーツァルトの 知識で 真犯人を 暴きましょう!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '🎼 STEP 1: モーツァルトの 故郷',
        intro: [
          { speaker: 'シューベルト 教授', cls: 'sensei', charKey: 'mori', text: 'モーツァルトが 生まれた 街を 知っているかな?' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '確認しましょう。' },
        ],
        puzzle: {
          prompt: 'モーツァルトの 生まれた 街は?',
          hint: 'オーストリアの 美しい 古都。映画「サウンド・オブ・ミュージック」 でも 有名。',
          options: [
            'ウィーン',
            'ザルツブルク',
            'プラハ',
            'ベルリン',
          ],
          answer: 1,
          explanation: 'モーツァルトは 1756年に オーストリアの ザルツブルクで 生まれた。後に ウィーンで 活躍したが、生地は ザルツブルク。',
        },
        clue: { title: 'モーツァルトの 出身', desc: '生地 = ザルツブルク (オーストリア)。1756年生まれ。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🎵 STEP 2: 有名な 作品',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'モーツァルトの 有名な 曲は?' },
          { speaker: 'シューベルト 教授', cls: 'sensei', charKey: 'mori', text: '彼は オペラも たくさん 書いた。最も 有名な のは…' },
        ],
        puzzle: {
          prompt: 'モーツァルトの オペラ作品は どれ?',
          hint: '「魔法の 笛」 という 意味の 作品。',
          options: [
            '第九交響曲',
            '魔笛 (まてき)',
            'カルメン',
            '蝶々夫人',
          ],
          answer: 1,
          explanation: '「魔笛」(原題: Die Zauberflöte) は モーツァルトの 最後の オペラ (1791年)。「第九」 は ベートーヴェン、「カルメン」 は ビゼー、「蝶々夫人」 は プッチーニの 作品。',
        },
        clue: { title: '代表作', desc: 'モーツァルト = 「魔笛」「フィガロの結婚」「ドン・ジョバンニ」。「第九」 は ベートーヴェン。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者の 1人が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「私は モーツァルト研究家。彼の 代表作 第九交響曲は 素晴らしい!」' },
        ],
        puzzle: {
          prompt: 'この 発言は 正しい?',
          hint: '第九 (合唱付き 交響曲) の 作曲家を 思い出そう。',
          options: [
            '正しい',
            '間違い (第九は ベートーヴェン)',
            '一部だけ 正しい',
            '判断できない',
          ],
          answer: 1,
          explanation: '「第九交響曲」 (合唱付き) は ベートーヴェンの 作品 (1824年)。モーツァルトの 作品ではない。本当の 研究家なら 絶対に 間違えない 基本知識。',
        },
        clue: { title: '専門家詐欺', desc: 'モーツァルト 研究家を 名乗りながら 第九 (ベートーヴェン作) を モーツァルト作と 言った 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'franz', name: 'フランツ さん', icon: '🎻', charKey: 'mina',
        role: '宮廷音楽家 (18年)',
        height: '172cm', clothes: '宮廷礼服',
        specialty: 'バイオリン·モーツァルト 研究',
        alibi: '昨夜は 自宅で バイオリンの 練習を していた。',
        testimony: '私は モーツァルトを 愛している。「魔笛」 と 「フィガロの結婚」 は 完璧な 傑作だ。',
      },
      {
        id: 'klaus', name: 'クラウス さん', icon: '🎹', charKey: 'mystery',
        role: '楽譜販売員 (3年)',
        height: '180cm', clothes: '商人の 服',
        specialty: '楽譜販売 (専門研究家ではない)',
        alibi: '昨夜は 店の 在庫整理を していた。',
        testimony: '私は モーツァルト研究家。彼の 代表作 第九交響曲は 素晴らしい!',
      },
      {
        id: 'anna', name: 'アンナ さん', icon: '👩‍🎤', charKey: 'villager2',
        role: 'オペラ歌手 (8年)',
        height: '163cm', clothes: 'ドレス',
        specialty: 'オペラ歌唱 (作曲は 専門外)',
        alibi: '昨夜は 劇場で 公演に 出ていた。',
        testimony: '私は 歌手で 作曲は 詳しくない。でも「魔笛」 の 夜の 女王の アリアは 何度も 歌った。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は モーツァルト研究家の「ふり」 を している\n② しかし「第九」 を モーツァルト作と 間違えた\n③ 容疑者:\n  ・フランツ: 宮廷音楽家 (魔笛・フィガロを 正しく 知る)\n  ・クラウス: 楽譜販売員 (「第九」 を モーツァルト作と 言う)\n  ・アンナ: 歌手 (作曲は 専門外と 自認、魔笛は 知る)',
      question: '犯人は 誰?',
      hint: '「研究家」 を 自称しながら 第九を モーツァルト作と 間違えた 人物は?',
      suspectIds: ['franz', 'klaus', 'anna'],
      answer: 'klaus',
      explanation:
        '犯人は クラウス さん!\n\n' +
        '【推理】\n' +
        '① 楽譜が 消えた 動機は 高額売買 (モーツァルト の 未発表楽譜)\n' +
        '② 犯人は「研究家」 を 自称したが「第九」 を モーツァルト作と 言った\n' +
        '③ 第九は ベートーヴェン (1824年) → 真の 研究家なら 絶対 間違えない\n' +
        '④ フランツは 正確、アンナは 専門外を 自認\n' +
        '⑤ クラウスは 楽譜販売の 知識を 利用し 価値ある 楽譜を 盗んだ\n\n' +
        '音楽史の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🎼 モーツァルト = 1756~1791年、オーストリア 古典派音楽家',
      '🏰 生地 = ザルツブルク (オーストリア)、活躍地 = ウィーン',
      '🎭 代表作 = 「魔笛」「フィガロの結婚」「ドン・ジョバンニ」',
      '🎵 35年の 短い 生涯で 600曲以上 作曲',
      '⚠ 「第九交響曲」 は ベートーヴェンの 作品',
    ]},
    note: { title: '第2事件 モーツァルト', desc: 'モーツァルトの 出身·代表作と「第九=ベートーヴェン」 の 区別を 学び、音楽史の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第3事件: 🌻 ゴッホの 消えた絵
  // ========================================
  {
    id: 3, icon: '🌻',
    title: 'ゴッホの 消えた絵',
    subtitle: '「ひまわり」 が なくなった!',
    theme: '後期印象派',
    country: 'フランス 🇫🇷',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[3],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '19世紀末の フランス南部、プロヴァンス地方の アルル。明るい 太陽と 糸杉 (いとすぎ) の 街。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'ゴッホの アトリエから「ひまわり」 の 連作の 1枚が 消えた!' },
      { speaker: 'テオ', cls: 'sensei', charKey: 'yamada',
        text: 'ハル君、リオ君、来てくれて ありがとう。私は ゴッホの 弟、テオ。兄の 絵を 守りたい。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'ゴッホって 耳を 切ったって 聞いた!' },
      { speaker: 'テオ', cls: 'sensei', charKey: 'yamada',
        text: 'そう…兄は 心の 病で 苦しんでいた。でも 美しい絵を たくさん 残した。「ひまわり」「星月夜」「自画像」 など…今、価値ある 1枚が 消えた。' },
      { speaker: 'テオ', cls: 'sensei', charKey: 'yamada',
        text: '怪しい人物が 3人 いる。みな 美術通を 名乗るが、本当の 専門家は 誰か…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'ゴッホの 知識で 嘘を 見抜きます!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '🎨 STEP 1: ゴッホの 国籍',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'ゴッホは どこの 国の 画家ですか?' },
          { speaker: 'テオ', cls: 'sensei', charKey: 'yamada', text: 'フランスで 描いたが、生まれは…' },
        ],
        puzzle: {
          prompt: 'フィンセント・ファン・ゴッホの 出身国は?',
          hint: 'チューリップと 風車で 有名な 国。',
          options: [
            'フランス',
            'オランダ',
            'ベルギー',
            'スペイン',
          ],
          answer: 1,
          explanation: 'ゴッホは 1853年 オランダ生まれ。フランスで 活躍したが、本来は オランダ人。「ファン・ゴッホ」 という 名前も オランダ風 (van = オランダ語)。',
        },
        clue: { title: 'ゴッホの 出身', desc: 'ゴッホ = 1853年 オランダ生まれ。フランスで 活躍した オランダ人 画家。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🌻 STEP 2: 代表作と 流派',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'ゴッホの 絵って 色が 鮮やかですよね!' },
          { speaker: 'テオ', cls: 'sensei', charKey: 'yamada', text: '兄は 後期印象派の 代表的な 画家だ。' },
        ],
        puzzle: {
          prompt: 'ゴッホの 作品ではない のは どれ?',
          hint: '「最後の晩餐」 は ルネサンス時代 (15世紀末) の 作品。',
          options: [
            'ひまわり',
            '星月夜',
            '最後の晩餐',
            '自画像 (耳に 包帯)',
          ],
          answer: 2,
          explanation: '「最後の晩餐」 は レオナルド・ダ・ヴィンチの 作品 (1495~1498年、ミラノ)。ゴッホ より 約 400年も 前。',
        },
        clue: { title: 'ゴッホの 代表作', desc: 'ゴッホ = 「ひまわり」「星月夜」「自画像」。「最後の晩餐」 は ダ・ヴィンチの 作品。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager1',
            text: '「ゴッホ作の "最後の晩餐" は 私の 一番 好きな 絵だ!」' },
        ],
        puzzle: {
          prompt: 'この 発言は 正しい?',
          hint: '「最後の晩餐」 の 作者を 思い出そう。',
          options: [
            '正しい',
            '間違い (最後の晩餐は ダ・ヴィンチ作)',
            '一部だけ 正しい',
            '判断できない',
          ],
          answer: 1,
          explanation: '「最後の晩餐」 は ダ・ヴィンチが 1495~1498年に 描いた フレスコ画。ゴッホ (19世紀末) より 約 400年も 前。美術通なら 絶対に 間違えない 基本。',
        },
        clue: { title: '専門家詐欺', desc: '美術通を 名乗りながら 「最後の晩餐」 を ゴッホ作と 言った 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'paul', name: 'ポール さん', icon: '🎨', charKey: 'tanaka',
        role: '画家·ゴッホ友人 (10年)',
        height: '178cm', clothes: '画家の 上着',
        specialty: '後期印象派 絵画',
        alibi: '昨夜は 自分の アトリエで 風景画を 描いていた。',
        testimony: '私は ゴッホ と 一緒に 絵を 描いた 画家。彼の 「ひまわり」 や 「星月夜」 は 本当に 美しい。',
      },
      {
        id: 'henri', name: 'アンリ さん', icon: '👨‍💼', charKey: 'villager1',
        role: '画商 (4年)',
        height: '175cm', clothes: '紳士服',
        specialty: '絵画売買 (美術史は 浅い)',
        alibi: '昨夜は 店で 絵の 査定を していた。',
        testimony: 'ゴッホ作の 「最後の晩餐」 は 私の 一番 好きな 絵だ!',
      },
      {
        id: 'marie', name: 'マリー さん', icon: '👩', charKey: 'villager4',
        role: 'モデル (5年)',
        height: '165cm', clothes: '田舎風 ワンピース',
        specialty: 'モデル業 (美術知識は 限定的)',
        alibi: '昨夜は 友人と 食事を していた。',
        testimony: '私は モデルで 絵の ことは 詳しくない。でも 「ひまわり」 の モデルを した ことが ある。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は ゴッホに 詳しい「ふり」 を している\n② しかし「最後の晩餐」 を ゴッホ作と 言った\n③ 容疑者:\n  ・ポール: 画家·友人 (ひまわり·星月夜を 正しく 知る)\n  ・アンリ: 画商 (「最後の晩餐」 を ゴッホ作と 間違える)\n  ・マリー: モデル (「美術は 詳しくない」 と 自認)',
      question: '犯人は 誰?',
      hint: '美術通を 装いながら 西洋絵画の 基本を 間違えた 人物は?',
      suspectIds: ['paul', 'henri', 'marie'],
      answer: 'henri',
      explanation:
        '犯人は アンリ さん!\n\n' +
        '【推理】\n' +
        '① 動機 = ひまわりの 1枚を 高く 売りたい (画商)\n' +
        '② 犯人は「美術通」 を 自称したが 「最後の晩餐」 を ゴッホ作と 言った\n' +
        '③ 「最後の晩餐」 はダ・ヴィンチ作 (1495~1498年)、ゴッホ より 400年も 前\n' +
        '④ ポールは 正確、マリーは 専門外を 自認\n' +
        '⑤ アンリは 売買だけ 得意で 美術史を 知らず、価値ある絵を 盗もうとした\n\n' +
        '美術史の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🎨 ゴッホ = 1853~1890年、オランダ生まれ、フランスで 活躍',
      '🌻 代表作 = 「ひまわり」「星月夜」「自画像」',
      '🌟 流派 = 後期印象派',
      '⚠ 「最後の晩餐」 は ダ・ヴィンチ作 (15世紀末ルネサンス)',
      '🇳🇱 「ファン (van)」 = オランダ語の 名前',
    ]},
    note: { title: '第3事件 ゴッホ', desc: 'ゴッホの 出身·代表作と「最後の晩餐=ダ・ヴィンチ」 の 区別を 学び、美術史の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第4事件: 🧜‍♀️ アンデルセンの 失われた童話
  // ========================================
  {
    id: 4, icon: '🧜',
    title: 'アンデルセンの 失われた童話',
    subtitle: '消えた 新作の 童話原稿!',
    theme: '北欧童話',
    country: 'デンマーク 🇩🇰',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[4],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '19世紀の デンマーク、コペンハーゲン。人魚像が 海を 見つめる 港町。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'アンデルセンが 書きあげたばかりの 新作 童話の 原稿が 一晩で 消えた!' },
      { speaker: 'グレタ さん', cls: 'sensei', charKey: 'yamada',
        text: 'ハル君、リオ君、私は コペンハーゲン 図書館の 司書。アンデルセン先生の 原稿を 預かっていたが…' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'アンデルセンって「人魚姫」 の 作家ですよね!' },
      { speaker: 'グレタ さん', cls: 'sensei', charKey: 'yamada',
        text: 'そう。「人魚姫」「みにくいアヒルの子」「マッチ売りの少女」 など 多くの 童話を 書いた。今、新作が 消えた…' },
      { speaker: 'グレタ さん', cls: 'sensei', charKey: 'yamada',
        text: '昨夜 図書館に 出入りした 3人が 怪しい。みな 文学通を 名乗るが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'アンデルセンの 知識で 嘘を 見抜きます!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '📚 STEP 1: アンデルセンの 国',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'アンデルセンは どこの 国の 作家ですか?' },
        ],
        puzzle: {
          prompt: 'ハンス・クリスチャン・アンデルセンの 出身国は?',
          hint: '北欧の 小さな 国。コペンハーゲンが 首都で 「人魚像」 が 有名。',
          options: [
            'スウェーデン',
            'ノルウェー',
            'デンマーク',
            'フィンランド',
          ],
          answer: 2,
          explanation: 'アンデルセンは 1805年 デンマークの オーデンセで 生まれた。コペンハーゲンで 活躍。「人魚姫」 の 像は コペンハーゲン港の シンボル。',
        },
        clue: { title: 'アンデルセンの 出身', desc: 'アンデルセン = デンマーク 1805年生まれ。コペンハーゲンで 活躍。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🧜 STEP 2: 代表作',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'アンデルセンの 童話は 何が 有名ですか?' },
          { speaker: 'グレタ さん', cls: 'sensei', charKey: 'yamada', text: '世界中の 子供が 知っている 物語ばかりだ。' },
        ],
        puzzle: {
          prompt: 'アンデルセンの 作品ではない のは どれ?',
          hint: '「白雪姫」 は グリム兄弟 (ドイツ) の 童話。',
          options: [
            '人魚姫',
            'みにくいアヒルの子',
            '白雪姫',
            'マッチ売りの少女',
          ],
          answer: 2,
          explanation: '「白雪姫」 は グリム兄弟 (1812年 ドイツ) の 童話。アンデルセンの 作品は「人魚姫」「みにくいアヒルの子」「マッチ売りの少女」「裸の王様」「親指姫」 など。',
        },
        clue: { title: '代表作', desc: 'アンデルセン = 「人魚姫」「みにくいアヒルの子」「マッチ売りの少女」「裸の王様」。「白雪姫」 は グリム兄弟。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mina',
            text: '「アンデルセンの 「白雪姫」 は 私の 一番 好きな 童話!」' },
        ],
        puzzle: {
          prompt: 'この 発言は 正しい?',
          hint: '「白雪姫」 の 作者を 思い出そう。',
          options: [
            '正しい',
            '間違い (白雪姫は グリム兄弟作)',
            '一部だけ 正しい',
            '判断できない',
          ],
          answer: 1,
          explanation: '「白雪姫」 は グリム兄弟 (ドイツ、1812年) の 童話。デンマークの アンデルセンと 国も 違う、年代も 異なる。文学通なら 絶対に 間違えない 基本。',
        },
        clue: { title: '専門家詐欺', desc: '文学通を 名乗りながら 白雪姫を アンデルセン作と 言った 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'lars', name: 'ラース さん', icon: '📖', charKey: 'yamada',
        role: '童話研究者 (15年)',
        height: '180cm', clothes: '学者の 服',
        specialty: '北欧童話 研究',
        alibi: '昨夜は 自宅で 古い 童話集を 読んでいた。',
        testimony: '私は 童話研究者。「人魚姫」「みにくいアヒルの子」 は アンデルセンの 傑作だ。',
      },
      {
        id: 'sven', name: 'スヴェン さん', icon: '👨‍💼', charKey: 'mina',
        role: '本屋 店主 (5年)',
        height: '175cm', clothes: '店主の エプロン',
        specialty: '本販売 (童話研究は 趣味程度)',
        alibi: '昨夜は 店の 在庫を 整理していた。',
        testimony: 'アンデルセンの「白雪姫」 は 私の 一番 好きな 童話!',
      },
      {
        id: 'ingrid', name: 'イングリッド さん', icon: '👩‍🏫', charKey: 'mori',
        role: '学校教師 (10年)',
        height: '165cm', clothes: '教師の 服',
        specialty: '初等教育 (童話は 授業で 使う 程度)',
        alibi: '昨夜は 学校で 翌日の 授業準備を していた。',
        testimony: '私は 教師で 専門研究家ではない。でも 子供たちに「人魚姫」 を 読んで 聞かせる。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は アンデルセンに 詳しい「ふり」 を している\n② しかし「白雪姫」 を アンデルセン作と 言った\n③ 容疑者:\n  ・ラース: 童話研究者 (人魚姫·アヒルの子を 正しく 知る)\n  ・スヴェン: 本屋 (「白雪姫」 を アンデルセン作と 間違える)\n  ・イングリッド: 教師 (「専門研究家ではない」 と 自認)',
      question: '犯人は 誰?',
      hint: '文学通を 装いながら 童話の 作者を 間違えた 人物は?',
      suspectIds: ['lars', 'sven', 'ingrid'],
      answer: 'sven',
      explanation:
        '犯人は スヴェン さん!\n\n' +
        '【推理】\n' +
        '① 動機 = アンデルセンの 未発表原稿を 高く 売りたい\n' +
        '② 犯人は「文学通」 を 自称したが「白雪姫」 を アンデルセン作と 言った\n' +
        '③ 「白雪姫」 は グリム兄弟 (ドイツ) の 作品。国も 違う\n' +
        '④ ラースは 正確、イングリッドは 専門外を 自認\n' +
        '⑤ スヴェンは 本販売の 知識を 利用し 価値ある 原稿を 盗もうとした\n\n' +
        '童話の「作者」 知識が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🧜 アンデルセン = デンマーク 1805~1875年',
      '📚 代表作 = 「人魚姫」「みにくいアヒルの子」「マッチ売りの少女」「裸の王様」',
      '🇩🇰 デンマークの 首都 = コペンハーゲン (人魚像)',
      '⚠ 「白雪姫」 は グリム兄弟 (ドイツ) の 童話 (1812年)',
      '🌍 童話 = 国境を 越えて 子供たちに 愛される 文学',
    ]},
    note: { title: '第4事件 アンデルセン', desc: 'アンデルセンの 出身·代表作と「白雪姫=グリム兄弟」 の 区別を 学び、童話の「作者」 知識で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第5事件 (中ボス): 🌙 千夜一夜物語の 暗号
  // ========================================
  {
    id: 5, icon: '🌙',
    title: '千夜一夜物語の 暗号',
    subtitle: 'シェヘラザードの 秘密の メッセージ!',
    theme: 'アラブ古典文学',
    country: '中世アラブ 🌙',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[5],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '時は 中世。バグダードの 大宮殿。「アラビアン・ナイト」 として 知られる 物語の 舞台。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '宮殿の 図書館に 保管されていた 「千夜一夜物語」 の 古い 写本に 暗号が 隠されていた!' },
      { speaker: 'カリフ', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、遠くから 来てくれて 嬉しい。私は バグダードの カリフ (王) だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '千夜一夜物語って「アラジン」 の 話ですよね!' },
      { speaker: 'カリフ', cls: 'sensei', charKey: 'ojiisan',
        text: 'そう。「アラジン」「シンドバッド」「アリババと 40人の 盗賊」 などが 入っている。だが この 写本に 隠された 暗号が 解けない…' },
      { speaker: 'カリフ', cls: 'sensei', charKey: 'ojiisan',
        text: '3人の 学者が 解読を 試みている。みな アラブ文学を 名乗るが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '千夜一夜物語の 知識で 真の 学者を 見抜きます!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '📜 STEP 1: 物語の 語り手',
        intro: [
          { speaker: 'カリフ', cls: 'sensei', charKey: 'ojiisan', text: '千夜一夜物語は ある 女性が 王に 1001夜にわたって 語る 物語だ。' },
        ],
        puzzle: {
          prompt: '千夜一夜物語で 王に 物語を 語る 女性の 名前は?',
          hint: '「シェ」 で 始まる ペルシャ風の 名前。',
          options: [
            'クレオパトラ',
            'シェヘラザード',
            'カルメン',
            'ザビーネ',
          ],
          answer: 1,
          explanation: 'シェヘラザード (Scheherazade) は シャフリヤール王に 1001夜にわたって 物語を 語る 才女。物語が 終わらないように 毎夜 続きを 残し、王の 怒りを 静めて 命を 守った。',
        },
        clue: { title: '語り手', desc: '千夜一夜物語の 語り手 = シェヘラザード。1001夜 王に 物語を 語る 才女。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🧞 STEP 2: 含まれる 物語',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'どんな 物語が 入っているの?' },
          { speaker: 'カリフ', cls: 'sensei', charKey: 'ojiisan', text: '世界中の 子供が 知る 物語ばかりだ。' },
        ],
        puzzle: {
          prompt: '千夜一夜物語に 含まれない 物語は どれ?',
          hint: '「ピノキオ」 は イタリアの 童話 (1883年)。',
          options: [
            'アラジンと 魔法の ランプ',
            'シンドバッドの 冒険',
            'アリババと 40人の 盗賊',
            'ピノキオの 冒険',
          ],
          answer: 3,
          explanation: '「ピノキオ」 は カルロ・コッローディの イタリア童話 (1883年)。千夜一夜物語の 主な 話 は「アラジン」「シンドバッド」「アリババ」 など。',
        },
        clue: { title: '物語の 区別', desc: '千夜一夜物語 = アラジン·シンドバッド·アリババ。「ピノキオ」 は イタリア童話。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 学者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '学者の 1人が 言った。' },
          { speaker: '学者', cls: 'suspect', charKey: 'mystery',
            text: '「千夜一夜物語の 語り手は クレオパトラ。"ピノキオの 冒険" も 入っている」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '語り手 と 物語、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 語り手は シェヘラザード (クレオパトラは 古代エジプト)、② ピノキオは イタリア童話で 千夜一夜物語ではない。アラブ文学者なら 絶対に 知っている 基本。',
        },
        clue: { title: '専門家詐欺', desc: 'アラブ文学者を 名乗りながら 語り手も 物語も 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'omar', name: 'オマル さん', icon: '📚', charKey: 'mori',
        role: 'バグダード大学 教授 (20年)',
        height: '178cm', clothes: '学者の 礼服',
        specialty: 'アラブ古典文学',
        alibi: '昨夜は 大学で 講義の 準備を していた。',
        testimony: '私は アラブ文学の 教授。シェヘラザードの 1001夜の 物語、その 中の アラジン・シンドバッドは よく 知る。',
      },
      {
        id: 'rashid', name: 'ラシド さん', icon: '🧞', charKey: 'mystery',
        role: '商人 (8年)',
        height: '180cm', clothes: '商人の 衣装',
        specialty: '香辛料·織物 売買 (文学は 知ったかぶり)',
        alibi: '昨夜は キャラバン宿で 仲間と 食事を していた。',
        testimony: '千夜一夜物語の 語り手は クレオパトラ。"ピノキオの 冒険" も 入っている。',
      },
      {
        id: 'fatima', name: 'ファティマ さん', icon: '👩‍🎓', charKey: 'villager2',
        role: '宮廷詩人 (12年)',
        height: '165cm', clothes: '宮廷服',
        specialty: '詩作 (散文物語は 専門外)',
        alibi: '昨夜は 宮殿で 詩を 書いていた。',
        testimony: '私は 詩が 専門で 物語は 詳しくない。でも シェヘラザードの 賢さは 詩にも 出てくる。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は アラブ文学に 詳しい「ふり」 を している\n② しかし 語り手と 含まれる 物語、両方 間違えた\n③ 容疑者:\n  ・オマル: 大学教授 (シェヘラザード·アラジンを 正しく 知る)\n  ・ラシド: 商人 (語り手·物語両方 間違える)\n  ・ファティマ: 詩人 (「散文は 専門外」 と 自認)',
      question: '犯人は 誰?',
      hint: '文学者を 装いながら 基本中の 基本を 2つも 間違えた 人物は?',
      suspectIds: ['omar', 'rashid', 'fatima'],
      answer: 'rashid',
      explanation:
        '犯人は ラシド さん!\n\n' +
        '【推理】\n' +
        '① 動機 = 千夜一夜物語の 古写本を 高く 売りたい (商人らしい 動機)\n' +
        '② 犯人は「文学者」 を 自称したが 語り手 (シェヘラザード) を 「クレオパトラ」 と 言い、ピノキオまで 千夜一夜物語に 入れた\n' +
        '③ 真の 学者なら 絶対に 間違えない 2つの 基本\n' +
        '④ オマルは 正確、ファティマは 専門外を 自認\n' +
        '⑤ ラシドは 商売の 知識を 文学風に 飾ったが、本当は 何も 知らない 詐欺師\n\n' +
        '中ボス事件: 文学知識の「複数チェック」 で 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🌙 千夜一夜物語 = 中世アラブの 物語集 (アラビアン・ナイト)',
      '👸 語り手 = シェヘラザード (1001夜にわたる 物語)',
      '🧞 含まれる 話 = アラジン·シンドバッド·アリババと 40人の 盗賊',
      '⚠ 「ピノキオ」 は イタリアの 童話 (コッローディ作、1883年)',
      '🏛 中世アラブ文化の 中心 = バグダード',
    ]},
    note: { title: '第5事件 中ボス・千夜一夜物語', desc: 'アラブ古典文学の 語り手と 内容を 学び、複数の 知識ポイントで 真犯人を 暴いた 中ボス事件。' },
  },

  // ========================================
  // 第6事件: 📜 紫式部の 源氏物語の謎
  // ========================================
  {
    id: 6, icon: '📜',
    title: '紫式部の 源氏物語の謎',
    subtitle: '消えた 一巻の 行方!',
    theme: '平安時代の 古典文学',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[6],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '11世紀初めの 平安京 (現在の 京都)。御所の 奥にある 藤原家の 邸宅。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '紫式部 (むらさきしきぶ) が 書いていた『源氏物語』 の 一巻 (ひとまき) が 消えた!' },
      { speaker: '藤原 卿', cls: 'sensei', charKey: 'mori',
        text: 'ハル君、リオ君、よく 来てくれた。私は 中宮様に 仕える 藤原卿。式部殿の 物語は 朝廷の 宝だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '紫式部って 平安時代の 女性作家ですよね!' },
      { speaker: '藤原 卿', cls: 'sensei', charKey: 'mori',
        text: 'そう。54巻からなる 大長編で、光源氏 (ひかるげんじ) の 恋と 人生を 描く 王朝物語だ。今、そのうち 一巻が 消えた。' },
      { speaker: '藤原 卿', cls: 'sensei', charKey: 'mori',
        text: '昨夜 御殿に 出入りした 3人が 怪しい。みな 文学に 詳しい と 言うが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '平安時代と 源氏物語の 知識で 真犯人を 暴きます!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '🏯 STEP 1: 紫式部の 時代',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '紫式部は いつの 時代の 人ですか?' },
        ],
        puzzle: {
          prompt: '紫式部が 生きていた 時代は?',
          hint: '京都が 都だった 雅 (みやび) な 時代。藤原氏が 権力を 持っていた。',
          options: [
            '奈良時代',
            '平安時代',
            '鎌倉時代',
            '戦国時代',
          ],
          answer: 1,
          explanation: '紫式部は 平安時代 (794~1185年) 中期、11世紀初めに 活躍。一条天皇の 中宮 彰子 (しょうし) に 仕えた 女房だった。',
        },
        clue: { title: '紫式部の 時代', desc: '紫式部 = 平安時代 (11世紀初め)。一条天皇の 中宮に 仕えた 女房。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🌸 STEP 2: 源氏物語の 主人公',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '源氏物語の 主人公は 誰ですか?' },
          { speaker: '藤原 卿', cls: 'sensei', charKey: 'mori', text: '美しく 才能ある 貴公子だ。' },
        ],
        puzzle: {
          prompt: '源氏物語の 主人公の 名前は?',
          hint: '「光る (ひかる)」 ような 美しさ という 意味。',
          options: [
            '織田信長',
            '光源氏 (ひかるげんじ)',
            '武蔵坊弁慶',
            '徳川家康',
          ],
          answer: 1,
          explanation: '光源氏は 桐壺帝 (きりつぼてい) の 子で、美貌と 才能を 持つ 貴公子。多くの 女性との 恋愛を 通じて 平安貴族の 世界が 描かれる。武士ではない。',
        },
        clue: { title: '主人公', desc: '源氏物語の 主人公 = 光源氏。平安貴族の 王子 (武士ではない)。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者の 1人が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager1',
            text: '「紫式部は 戦国時代の 人。源氏物語は 武士の 戦いの 物語だ」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '時代と 物語の 内容、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 紫式部は 平安時代 (戦国時代より 約 400年も 前)、② 源氏物語は 武士の 物語ではなく 平安貴族の 王朝恋愛物語。文学に 詳しい 人なら 絶対 知っている 基本。',
        },
        clue: { title: '専門家詐欺', desc: '文学に 詳しい と 名乗りながら 時代も 内容も 両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'fujiwara_y', name: '藤原 雅子 (まさこ) さん', icon: '👘', charKey: 'mina',
        role: '宮廷女房 (12年)',
        height: '160cm', clothes: '十二単 (じゅうにひとえ)',
        specialty: '王朝文学・和歌',
        alibi: '昨夜は 中宮様の お側で 物語を 読み聞かせていた。',
        testimony: '私は 平安時代の 女房。光源氏様の 恋物語は 何度も 読んだ。54巻の 大作だ。',
      },
      {
        id: 'ronin', name: '浪人 平蔵 さん', icon: '⚔', charKey: 'villager1',
        role: '流浪の 学者を 名乗る (経歴不明)',
        height: '175cm', clothes: '小袖と 袴',
        specialty: '文学を 自称 (実は 詳しくない)',
        alibi: '昨夜は 旅籠 (はたご) に 泊まっていた。',
        testimony: '紫式部は 戦国時代の 人。源氏物語は 武士の 戦いの 物語だ。',
      },
      {
        id: 'wakana', name: '若菜 さん', icon: '🌸', charKey: 'yamada',
        role: '若い 女房 (3年)',
        height: '158cm', clothes: '汗衫 (かざみ)',
        specialty: '和歌は 学ぶが 物語は 浅い',
        alibi: '昨夜は 自室で 和歌の 練習を していた。',
        testimony: '私は まだ 若く、物語は あまり 詳しくない。でも 和歌の 一部は 写し書きした ことが ある。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は 文学に 詳しい「ふり」 を している\n② しかし 紫式部の 時代も 源氏物語の 内容も 両方 間違えた\n③ 容疑者:\n  ・藤原雅子: 宮廷女房 (光源氏·54巻を 正しく 知る)\n  ・浪人平蔵: 自称学者 (時代·内容両方 間違える)\n  ・若菜: 若い女房 (「物語は 詳しくない」 と 自認)',
      question: '犯人は 誰?',
      hint: '学者を 装いながら 平安時代と 戦国時代の 違いも 知らない 人物は?',
      suspectIds: ['fujiwara_y', 'ronin', 'wakana'],
      answer: 'ronin',
      explanation:
        '犯人は 浪人 平蔵 さん!\n\n' +
        '【推理】\n' +
        '① 動機 = 紫式部の 直筆原稿は 計り知れない 価値\n' +
        '② 犯人は「学者」 を 自称したが 平安時代を 戦国時代と 言い、王朝物語を 武士物語と 言った\n' +
        '③ 真の 学者なら 絶対 間違えない 基本中の 基本\n' +
        '④ 藤原雅子は 正確、若菜は 専門外を 自認\n' +
        '⑤ 平蔵は 経歴不明の 怪しい 人物。武士の 物語と 思いこんで 価値を 過信し 盗んだ\n\n' +
        '日本古典文学の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '📜 紫式部 = 平安時代 (11世紀初め) の 女流作家',
      '🌸 源氏物語 = 54巻の 王朝恋愛物語 (世界最古の 長編小説の 一つ)',
      '👑 主人公 = 光源氏 (貴公子、武士ではない)',
      '🏯 平安時代 = 794~1185年 (戦国時代より 約400年 前)',
      '✍ 紫式部は 一条天皇の 中宮 彰子に 仕えた 女房',
    ]},
    note: { title: '第6事件 紫式部', desc: '平安時代の 女流文学を 学び、時代と 内容の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第7事件: 🦢 バレエ「白鳥の湖」の 謎
  // ========================================
  {
    id: 7, icon: '🦢',
    title: 'バレエ「白鳥の湖」の 謎',
    subtitle: '消えた 楽譜と 振付!',
    theme: 'クラシック・バレエ',
    country: 'ロシア 🇷🇺',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[7],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '19世紀末の ロシア、モスクワの ボリショイ劇場。世界三大バレエの 公演が 控えている。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'チャイコフスキーの「白鳥の湖」 楽譜の 一部と 振付の メモが 消えた!' },
      { speaker: 'イワン 演出家', cls: 'sensei', charKey: 'yamada',
        text: 'ハル君、リオ君、ようこそ ボリショイに。私は 演出家の イワン。明日が 初日なのに 大変なことに…' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '白鳥の湖って 美しいバレエですよね!' },
      { speaker: 'イワン 演出家', cls: 'sensei', charKey: 'yamada',
        text: 'そう。チャイコフスキーが 1875~1876年に 作曲した 名作だ。「白鳥」「眠れる森の美女」「くるみ割り人形」 が 三大バレエ。' },
      { speaker: 'イワン 演出家', cls: 'sensei', charKey: 'yamada',
        text: '昨夜 楽屋に 出入りした 3人が 怪しい。みな バレエ関係者を 名乗るが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'クラシックバレエの 知識で 真犯人を 暴きます!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '🎼 STEP 1: 白鳥の湖の 作曲家',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '白鳥の湖の 作曲家を 確認しましょう。' },
        ],
        puzzle: {
          prompt: '「白鳥の湖」 の 作曲家は 誰?',
          hint: 'ロシアの 大作曲家。「くるみ割り人形」 も 作った。',
          options: [
            'モーツァルト',
            'チャイコフスキー',
            'ベートーヴェン',
            'バッハ',
          ],
          answer: 1,
          explanation: 'ピョートル・イリイチ・チャイコフスキー (1840~1893年、ロシア) が 1875~1876年に 作曲。三大バレエの「白鳥の湖」「眠れる森の美女」「くるみ割り人形」 はすべて 彼の 作品。',
        },
        clue: { title: '作曲家', desc: '白鳥の湖 = チャイコフスキー作 (1875~1876年、ロシア)。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🩰 STEP 2: チャイコフスキーの バレエ',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '三大バレエって 何ですか?' },
          { speaker: 'イワン 演出家', cls: 'sensei', charKey: 'yamada', text: '世界中で 上演される 古典バレエの 代表作だ。' },
        ],
        puzzle: {
          prompt: 'チャイコフスキー作曲の バレエではない のは どれ?',
          hint: '「ジゼル」 は フランスの アダンの 作品 (1841年)。',
          options: [
            '白鳥の湖',
            '眠れる森の美女',
            'くるみ割り人形',
            'ジゼル',
          ],
          answer: 3,
          explanation: '「ジゼル」 は アドルフ・アダン (フランス、1841年) の バレエ。チャイコフスキーの 三大バレエは「白鳥の湖」「眠れる森の美女」「くるみ割り人形」。',
        },
        clue: { title: 'チャイコフスキー三大バレエ', desc: '白鳥の湖·眠れる森の美女·くるみ割り人形 = チャイコフスキー作。「ジゼル」 は アダン (フランス)。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager3',
            text: '「私は バレエ評論家。チャイコフスキーの 代表作 ジゼルは 素晴らしい!」' },
        ],
        puzzle: {
          prompt: 'この 発言は 正しい?',
          hint: '「ジゼル」 の 作曲家を 思い出そう。',
          options: [
            '正しい',
            '間違い (ジゼルは アダン作)',
            '一部だけ 正しい',
            '判断できない',
          ],
          answer: 1,
          explanation: '「ジゼル」 は フランスの アダン作。チャイコフスキーの 作品ではない。本当の バレエ評論家なら 絶対に 間違えない 基本。',
        },
        clue: { title: '専門家詐欺', desc: 'バレエ評論家を 名乗りながら ジゼル (アダン作) を チャイコフスキー作と 言った 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'natasha', name: 'ナターシャ さん', icon: '🩰', charKey: 'tanaka',
        role: 'プリマ・バレリーナ (15年)',
        height: '170cm', clothes: 'チュチュ (バレエ衣装)',
        specialty: 'バレエ舞踊 (作曲も 詳しい)',
        alibi: '昨夜は 自宅で 振付の 練習を していた。',
        testimony: '私は チャイコフスキーの 三大バレエ全てを 踊った。白鳥の湖の オデット役は 一生忘れない。',
      },
      {
        id: 'dmitri', name: 'ドミトリー さん', icon: '🎩', charKey: 'villager3',
        role: '自称 バレエ評論家 (3年)',
        height: '178cm', clothes: '紳士服',
        specialty: '評論執筆 (実は 浅い知識)',
        alibi: '昨夜は 楽屋で 取材を していた。',
        testimony: '私は バレエ評論家。チャイコフスキーの 代表作 ジゼルは 素晴らしい!',
      },
      {
        id: 'pavel', name: 'パーヴェル さん', icon: '🎻', charKey: 'mori',
        role: 'オーケストラ団員 (8年)',
        height: '172cm', clothes: '燕尾服',
        specialty: 'バイオリン (バレエの 振付は 専門外)',
        alibi: '昨夜は 楽器の 調整を していた。',
        testimony: '私は 演奏家で 振付は 詳しくない。でも 白鳥の湖の 演奏は 何度も した。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は バレエに 詳しい「ふり」 を している\n② しかし「ジゼル」 を チャイコフスキー作と 言った\n③ 容疑者:\n  ・ナターシャ: プリマ (三大バレエ全てを 正確に 知る)\n  ・ドミトリー: 自称評論家 (「ジゼル」 を チャイコフスキー作と 間違える)\n  ・パーヴェル: 演奏家 (「振付は 専門外」 と 自認)',
      question: '犯人は 誰?',
      hint: '評論家を 装いながら バレエの 基本を 間違えた 人物は?',
      suspectIds: ['natasha', 'dmitri', 'pavel'],
      answer: 'dmitri',
      explanation:
        '犯人は ドミトリー さん!\n\n' +
        '【推理】\n' +
        '① 動機 = チャイコフスキーの 直筆楽譜は 国宝級の 価値\n' +
        '② 犯人は「評論家」 を 自称したが「ジゼル」 を チャイコフスキー作と 言った\n' +
        '③ ジゼルは フランスの アダン作 → 真の 評論家なら 絶対 間違えない\n' +
        '④ ナターシャは 正確、パーヴェルは 専門外を 自認\n' +
        '⑤ ドミトリーは 評論を 自称しながら 知識が 浅く、価値ある楽譜を 盗もうとした\n\n' +
        'クラシック・バレエの「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🦢 白鳥の湖 = チャイコフスキー (1875~1876年、ロシア)',
      '🩰 三大バレエ = 白鳥の湖・眠れる森の美女・くるみ割り人形',
      '🇷🇺 チャイコフスキー = ロシアの 大作曲家 (1840~1893年)',
      '⚠ 「ジゼル」 は フランスの アダン作 (1841年)',
      '🎭 ボリショイ劇場 = モスクワの 大バレエ劇場',
    ]},
    note: { title: '第7事件 白鳥の湖', desc: 'チャイコフスキーの 三大バレエと「ジゼル=アダン」 の 区別を 学び、バレエ史の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第8事件: 🌊 葛飾北斎の 浮世絵事件
  // ========================================
  {
    id: 8, icon: '🌊',
    title: '葛飾北斎の 浮世絵事件',
    subtitle: '消えた「神奈川沖浪裏」 の 版木!',
    theme: '江戸時代の 浮世絵',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[8],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '江戸時代後期、19世紀の 江戸 (現在の 東京)。葛飾北斎 (かつしかほくさい) の 浮世絵 工房。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '北斎の「富嶽三十六景」 の 中でも 最も 有名な「神奈川沖浪裏」 の 版木 (はんぎ) が 消えた!' },
      { speaker: '北斎の 弟子', cls: 'sensei', charKey: 'mori',
        text: 'ハル君、リオ君、こんにちは。私は 北斎先生の 弟子だ。先生の 版木が 盗まれたら 大事件だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '富嶽三十六景って 富士山の 絵ですよね!' },
      { speaker: '北斎の 弟子', cls: 'sensei', charKey: 'mori',
        text: 'そう。北斎先生が 70歳代で 描いた 連作で、富士山を 36の 場所から 見た 風景。「神奈川沖浪裏」 は その 一枚で、世界中で 有名だ。' },
      { speaker: '北斎の 弟子', cls: 'sensei', charKey: 'mori',
        text: '昨夜 工房に 出入りした 3人が 怪しい。みな 浮世絵に 詳しい と 言うが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '浮世絵の 知識で 真犯人を 暴きます!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '🗻 STEP 1: 富嶽三十六景の 内容',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '富嶽三十六景は 何を 描いた 連作ですか?' },
        ],
        puzzle: {
          prompt: '「富嶽三十六景」 は 何を 36の 視点で 描いた 連作?',
          hint: '「富嶽 (ふがく)」 は 日本一の 山の 別名。',
          options: [
            '京都の 寺',
            '富士山',
            '江戸の 町',
            '日本の 桜',
          ],
          answer: 1,
          explanation: '「富嶽 (ふがく)」 は 富士山の 雅名。北斎は 1831~1834年 頃に 富士山を 36の 視点・場所から 見た 風景を 描いた 連作を 制作。',
        },
        clue: { title: '富嶽三十六景の 内容', desc: '富嶽三十六景 = 富士山を 36の 視点・場所から 見た 風景画 (北斎、1830年代)。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🌊 STEP 2: 神奈川沖浪裏の 特徴',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '神奈川沖浪裏って どんな 絵ですか?' },
          { speaker: '北斎の 弟子', cls: 'sensei', charKey: 'mori', text: '世界で 一番 有名な 浮世絵だ。' },
        ],
        puzzle: {
          prompt: '「神奈川沖浪裏 (かながわおきなみうら)」 の 特徴は?',
          hint: 'タイトルに「浪 (なみ)」 が ある。',
          options: [
            '静かな 桜の 風景',
            '巨大な 波と 富士山',
            '京都の 庭園',
            '雪の 山道',
          ],
          answer: 1,
          explanation: '「神奈川沖浪裏」 は 巨大な 波が 砕ける 瞬間と、その 向こうに 小さく 見える 富士山が 描かれた 名作。「グレート・ウェーブ」 として 世界中で 知られる。',
        },
        clue: { title: '神奈川沖浪裏', desc: '神奈川沖浪裏 = 巨大な 波と 富士山 (世界で「The Great Wave」 と 呼ばれる)。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「富嶽三十六景は 京都の 36景を 描いたもの。神奈川沖浪裏は 静かな 田園風景だ」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '富嶽の 意味と、神奈川沖浪裏の 内容、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 富嶽=富士山なので「京都の 36景」 は 嘘。② 神奈川沖浪裏は「巨大な 波と 富士山」で 静かな 田園風景ではない。浮世絵に 詳しい 人なら 絶対 知る 基本。',
        },
        clue: { title: '専門家詐欺', desc: '浮世絵に 詳しい と 名乗りながら 富嶽の 意味も 神奈川沖浪裏の 内容も 両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'kichi', name: '吉次 (きちじ) さん', icon: '🖌', charKey: 'mori',
        role: '版木彫師 (20年)',
        height: '168cm', clothes: '職人の 半纏 (はんてん)',
        specialty: '木版彫刻 (北斎作品の 版木専門)',
        alibi: '昨夜は 自宅で 別の 版木を 彫っていた。',
        testimony: '私は 北斎先生の 版木を 彫る 職人。神奈川沖浪裏の 巨大な 波の 表現は 彫師の 命だ。',
      },
      {
        id: 'goemon', name: '五右衛門 さん', icon: '👘', charKey: 'mystery',
        role: '美術商 (4年)',
        height: '175cm', clothes: '商人の 着物',
        specialty: '美術品売買 (実は 知識が 浅い)',
        alibi: '昨夜は 取引先と 話していた。',
        testimony: '富嶽三十六景は 京都の 36景を 描いたもの。神奈川沖浪裏は 静かな 田園風景だ。',
      },
      {
        id: 'osen', name: 'お仙 (せん) さん', icon: '👩', charKey: 'villager4',
        role: '茶屋の 看板娘 (5年)',
        height: '160cm', clothes: '町人の 小袖',
        specialty: '茶店の 接客 (浮世絵は 客から 聞く 程度)',
        alibi: '昨夜は 茶屋で 接客を していた。',
        testimony: '私は 茶店の 娘で 美術は 詳しくない。でも 北斎先生の 富士山の 絵は 美しい と 客から 聞く。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は 浮世絵に 詳しい「ふり」 を している\n② しかし 富嶽三十六景の 内容も 神奈川沖浪裏の 特徴も 両方 間違えた\n③ 容疑者:\n  ・吉次: 版木彫師 (波の 表現を 正確に 知る)\n  ・五右衛門: 美術商 (両方 間違える)\n  ・お仙: 茶屋娘 (「美術は 詳しくない」 と 自認)',
      question: '犯人は 誰?',
      hint: '美術商を 名乗りながら 浮世絵の 一番 有名な 作品も 知らない 人物は?',
      suspectIds: ['kichi', 'goemon', 'osen'],
      answer: 'goemon',
      explanation:
        '犯人は 五右衛門 さん!\n\n' +
        '【推理】\n' +
        '① 動機 = 北斎の 版木は 高値で 売れる (海外でも 人気)\n' +
        '② 犯人は「美術商」 を 自称したが 富嶽=富士山も 知らず、神奈川沖浪裏の 波も 知らない\n' +
        '③ 真の 美術商なら 絶対 知る 浮世絵の 基本\n' +
        '④ 吉次は 正確、お仙は 専門外を 自認\n' +
        '⑤ 五右衛門は 売買の 知識を 利用しようとしたが 美術知識は 全くない 詐欺師\n\n' +
        '日本美術の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🌊 葛飾北斎 = 江戸時代後期 (1760~1849年) の 浮世絵師',
      '🗻 富嶽三十六景 = 富士山を 36の 視点から 描いた 連作 (1830年代)',
      '🌊 神奈川沖浪裏 = 「The Great Wave」 として 世界で 有名',
      '🎨 浮世絵 = 江戸時代の 木版画 (版木を 彫って 印刷)',
      '⚠ 「富嶽」 = 富士山の 雅名 (京都ではない)',
    ]},
    note: { title: '第8事件 北斎', desc: '江戸浮世絵と 北斎の 代表作を 学び、日本美術の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第9事件: 🎨 ピカソの キュビズム革命
  // ========================================
  {
    id: 9, icon: '🎨',
    title: 'ピカソの キュビズム革命',
    subtitle: '消えた 新しい絵の 行方!',
    theme: '20世紀 現代美術',
    country: 'スペイン·フランス 🇪🇸 🇫🇷',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[9],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '20世紀初頭、パリの モンマルトル。前衛芸術家たちが 集まる 街。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'ピカソの アトリエから 新しい キュビズム作品が 一枚 消えた!' },
      { speaker: 'ガストン 画廊主', cls: 'sensei', charKey: 'mina',
        text: 'ハル君、リオ君、よく 来てくれた。私は パリの 画廊主、ガストン。ピカソさんの 友人だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'ピカソって 顔が ぐちゃぐちゃの 絵を 描く 画家ですよね!' },
      { speaker: 'ガストン 画廊主', cls: 'sensei', charKey: 'mina',
        text: 'ぐちゃぐちゃでは ないよ。彼の キュビズムは 物を 何方向からも 見て、それを 平面に 再構成する 革命的な 手法だ。' },
      { speaker: 'ガストン 画廊主', cls: 'sensei', charKey: 'mina',
        text: '昨夜 アトリエに 出入りした 3人が 怪しい。みな 美術通を 名乗るが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'ピカソと キュビズムの 知識で 真犯人を 暴きます!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '🇪🇸 STEP 1: ピカソの 出身',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'ピカソは どこの 国の 画家ですか?' },
        ],
        puzzle: {
          prompt: 'パブロ・ピカソの 出身国は?',
          hint: 'フラメンコと 闘牛で 有名な 南欧の 国。',
          options: [
            'フランス',
            'スペイン',
            'イタリア',
            'オランダ',
          ],
          answer: 1,
          explanation: 'ピカソは 1881年 スペイン南部の マラガで 生まれた。後に パリへ 移り 活躍したが、出身は スペイン。代表作「ゲルニカ」 も スペイン内戦を 主題。',
        },
        clue: { title: 'ピカソの 出身', desc: 'ピカソ = 1881年 スペイン マラガ生まれ。フランスで 活躍した スペイン人 画家。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🔷 STEP 2: キュビズムとは',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'キュビズムって どんな 絵ですか?' },
          { speaker: 'ガストン 画廊主', cls: 'sensei', charKey: 'mina', text: '20世紀美術の 革命だ。' },
        ],
        puzzle: {
          prompt: 'キュビズム (立体派) の 特徴は?',
          hint: '「キューブ (立方体)」 が 名前の 由来。',
          options: [
            '柔らかい 光と 色を 重視',
            '物を 多視点から 見て 平面に 再構成',
            '写実的に 細部まで 描写',
            '点を 並べて 表現',
          ],
          answer: 1,
          explanation: 'キュビズム (Cubism) = 物体を 何方向からも 見た 視点を 同時に 平面に 描く 革新的 手法。1907年 ピカソの「アヴィニョンの娘たち」 が 始まり。「印象派 (光と 色)」 とは 全く 違う。',
        },
        clue: { title: 'キュビズムの 特徴', desc: 'キュビズム = 多視点·再構成 (1907年~)。印象派とは 別の 流派。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「私は ピカソ研究家。彼は フランス出身の 印象派画家だ」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '出身国と 流派、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① ピカソは スペイン出身 (フランスではない)、② ピカソは キュビズムの 創始者で 印象派ではない。本当の 研究家なら 絶対 知る 基本。',
        },
        clue: { title: '専門家詐欺', desc: 'ピカソ研究家を 名乗りながら 出身国も 流派も 両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'francois', name: 'フランソワ さん', icon: '🎨', charKey: 'yamada',
        role: '美術館 学芸員 (15年)',
        height: '178cm', clothes: 'スーツ',
        specialty: '20世紀美術 (キュビズム専門)',
        alibi: '昨夜は 美術館で 展示準備を していた。',
        testimony: '私は キュビズムの 専門家。ピカソの「アヴィニョンの娘たち」(1907年) は 美術史を 変えた 革命作だ。',
      },
      {
        id: 'jean', name: 'ジャン さん', icon: '🎩', charKey: 'mystery',
        role: '自称 美術品コレクター (3年)',
        height: '180cm', clothes: '高級スーツ',
        specialty: '美術品蒐集 (実は 知識が 浅い)',
        alibi: '昨夜は 自宅で 新しい 絵の 査定を していた。',
        testimony: '私は ピカソ研究家。彼は フランス出身の 印象派画家だ。',
      },
      {
        id: 'sophie', name: 'ソフィー さん', icon: '👩', charKey: 'villager2',
        role: '画家の モデル (4年)',
        height: '165cm', clothes: 'ベレー帽と スカーフ',
        specialty: 'モデル業 (美術史は 専門外)',
        alibi: '昨夜は 別の 画家の モデルを していた。',
        testimony: '私は モデルで 美術史は 詳しくない。でも ピカソさんの 絵は 不思議で 素敵だ。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 犯人は ピカソに 詳しい「ふり」 を している\n② しかし 出身国 (スペイン→フランス) と 流派 (キュビズム→印象派) 両方 間違えた\n③ 容疑者:\n  ・フランソワ: 学芸員 (キュビズムの 始まりを 正確に 知る)\n  ・ジャン: 自称コレクター (出身·流派両方 間違える)\n  ・ソフィー: モデル (「美術史は 専門外」 と 自認)',
      question: '犯人は 誰?',
      hint: 'コレクターを 名乗りながら 20世紀美術の 基本を 間違えた 人物は?',
      suspectIds: ['francois', 'jean', 'sophie'],
      answer: 'jean',
      explanation:
        '犯人は ジャン さん!\n\n' +
        '【推理】\n' +
        '① 動機 = ピカソの キュビズム作品は 高値で 売れる\n' +
        '② 犯人は「研究家·コレクター」 を 自称したが ピカソを「フランス出身の 印象派」 と 言った\n' +
        '③ ピカソは スペイン出身、流派は キュビズム → 真の コレクターなら 絶対 知る\n' +
        '④ フランソワは 正確、ソフィーは 専門外を 自認\n' +
        '⑤ ジャンは 高級な 服装で 装ったが、美術知識は 浅く、価値ある絵を 盗もうとした\n\n' +
        '20世紀美術の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🎨 ピカソ = 1881~1973年、スペイン マラガ生まれ',
      '🔷 キュビズム = 多視点·再構成 (1907年~、20世紀美術の 革命)',
      '🖼 代表作 = 「アヴィニョンの娘たち」「ゲルニカ」',
      '⚠ ピカソは 印象派ではない (印象派は モネ·ルノワール など、19世紀)',
      '🇪🇸 ピカソは スペイン人 (パリで 活躍)',
    ]},
    note: { title: '第9事件 ピカソ', desc: 'ピカソの 出身·流派 (キュビズム) を 学び、20世紀美術の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第10事件 (ボス): 🌐 世界芸術連続事件
  // ========================================
  {
    id: 10, icon: '🌐',
    title: '世界芸術連続事件',
    subtitle: '1~9事件の 真の 黒幕!',
    theme: '世界文学・芸術の 集大成',
    country: '世界 🌐',
    bgm: 'sci_chem',
    illustration: LIT_CASE_IMAGES[10],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'ハル と リオが 解決した 9事件。それぞれの 真犯人は 捕まったが、皆「黒幕に 雇われた」 と 証言した…' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'そして 今、世界中の 美術品·原稿が 集められた「世界 美術館」 で、最終事件が 起きた!' },
      { speaker: 'ヘンリー 館長', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、君たちの 推理力に 期待している。1~9事件の 真の 黒幕が この 美術館に 来ている。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '全部の 事件が つながってたんだ!' },
      { speaker: 'ヘンリー 館長', cls: 'sensei', charKey: 'ojiisan',
        text: '黒幕は 国際的な 美術品密売組織の リーダー。世界各地の 文学·芸術を 利用して 価値ある 物を 盗み 売り捌いて いた。' },
      { speaker: 'ヘンリー 館長', cls: 'sensei', charKey: 'ojiisan',
        text: '今、館内に 3人の 容疑者が いる。みな 文学·芸術の 国際的な 専門家を 名乗るが、本物は 1人だけだ。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '今までの 9事件で 学んだ 全てを 使って、真の 黒幕を 暴きます!' },
    ],
    steps: [
      {
        id: 'step1', type: 'mc',
        title: '📚 STEP 1: 9事件の 共通点',
        intro: [
          { speaker: 'ヘンリー 館長', cls: 'sensei', charKey: 'ojiisan', text: '9事件には 共通点が ある。何だと 思う?' },
        ],
        puzzle: {
          prompt: '1~9事件の 真犯人に 共通する 特徴は?',
          hint: '皆「専門家」 を 自称した が…',
          options: [
            '皆 文学·芸術の 真の 専門家だった',
            '皆「専門家」 を 装ったが 基本知識を 間違えた',
            '皆 偶然 居合わせた だけ',
            '皆 同じ 国の 出身',
          ],
          answer: 1,
          explanation: '9事件の 真犯人は 全員「専門家」 を 装ったが 基本中の 基本を 間違えた (4大悲劇·モーツァルト·ゴッホ·アンデルセン·千夜一夜·紫式部·チャイコフスキー·北斎·ピカソ)。黒幕は 偽専門家を 使って 価値ある物を 盗ませていた。',
        },
        clue: { title: '9事件の 共通点', desc: '真犯人は 皆「専門家」 を 装った 偽者。黒幕が 操った。' },
      },
      {
        id: 'step2', type: 'mc',
        title: '🌍 STEP 2: 国境を 越えた 文学·芸術',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '世界中で 事件が 起きたね!' },
          { speaker: 'ヘンリー 館長', cls: 'sensei', charKey: 'ojiisan', text: '黒幕は 世界の 文学·芸術を 知っていなければ できない。' },
        ],
        puzzle: {
          prompt: '次の 中で 同じ 国の 作家·芸術家の 組み合わせは?',
          hint: '紫式部と 北斎は どちらも…',
          options: [
            'シェイクスピア と モーツァルト',
            '紫式部 と 葛飾北斎',
            'ゴッホ と ピカソ',
            'アンデルセン と チャイコフスキー',
          ],
          answer: 1,
          explanation: '紫式部 (平安時代) も 葛飾北斎 (江戸時代) も 日本の 作家·画家。他の 組合せ: シェイクスピア (英)+モーツァルト (墺)、ゴッホ (蘭)+ピカソ (西)、アンデルセン (丁)+チャイコフスキー (露) で 全て 別々の 国。',
        },
        clue: { title: '日本の 文化', desc: '紫式部 (平安) と 北斎 (江戸) = 日本の 誇る 世界的 作家·画家。' },
      },
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 黒幕の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者の 1人が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「私は 国際的な 文学·芸術の 専門家。シェイクスピアの "ロミオとジュリエット" は 4大悲劇の 一つで、ピカソは 印象派、紫式部は 戦国時代の 武士物語の 作者だ」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違って いるのは いくつ?',
          hint: '今までの 9事件を 振り返ろう。',
          options: [
            '0個 (全部 正しい)',
            '1個 間違い',
            '2個 間違い',
            '3個 間違い',
          ],
          answer: 3,
          explanation: '3つも 間違い! ① ロミジュリは 4大悲劇に 含まれない (ハム·マク·リア·オセロ)、② ピカソは キュビズム (印象派ではない)、③ 紫式部は 平安時代で 王朝物語 (戦国·武士ではない)。国際的 専門家なら 絶対 知る 基本。',
        },
        clue: { title: '黒幕の 正体', desc: '国際的 専門家を 名乗りながら 1·6·9事件の 全てを 間違えた 人物が 黒幕!' },
      },
    ],
    suspects: [
      {
        id: 'curator', name: 'ジェシカ 学芸員', icon: '👩‍🏫', charKey: 'tanaka',
        role: '世界美術館 主席学芸員 (20年)',
        height: '170cm', clothes: 'スーツ',
        specialty: '世界文学·芸術 (本物の 専門家)',
        alibi: '昨夜は 国際会議で 発表していた。',
        testimony: '私は 9事件の 全てに 関連する 作品を 研究した。シェイクスピア4大悲劇·ピカソのキュビズム·紫式部の 王朝物語、全て 正確に 知る。',
      },
      {
        id: 'kingpin', name: 'ヴィクトル 国際商人', icon: '💼', charKey: 'mystery',
        role: '自称 国際美術品 仲介人 (10年)',
        height: '182cm', clothes: '高級スーツ',
        specialty: '美術品売買 (実は 詐欺の 黒幕)',
        alibi: '不明 (世界中を 飛び回って いる)',
        testimony: '私は 国際的な 文学·芸術の 専門家。シェイクスピアの ロミオとジュリエットは 4大悲劇、ピカソは 印象派、紫式部は 戦国時代の 武士物語の 作者だ。',
      },
      {
        id: 'translator', name: 'カレン 翻訳家', icon: '📖', charKey: 'mina',
        role: '文学翻訳家 (12年)',
        height: '163cm', clothes: 'カーディガン',
        specialty: '翻訳 (作品名は 知るが 美術は 専門外)',
        alibi: '昨夜は 自宅で 翻訳の 仕事を していた。',
        testimony: '私は 翻訳家で 美術は 専門外。でも 紫式部の 源氏物語·アンデルセンの 童話など、文学作品は よく 知る。',
      },
    ],
    finalQ: {
      prompt: '🔍 9事件の 集大成!\n\n📌 手がかり:\n① 黒幕は 国際的な「専門家」 を 装っている\n② しかし シェイクスピア·ピカソ·紫式部の 3つも 間違えた\n③ 容疑者:\n  ・ジェシカ: 学芸員 (4大悲劇·キュビズム·王朝物語を 正確に 知る)\n  ・ヴィクトル: 自称仲介人 (3つも 間違える·経歴怪しい)\n  ・カレン: 翻訳家 (「美術は 専門外」 と 自認)\n\n💡 ヒント: 9事件の 真犯人は 皆「専門家を 装って 基本を 間違えた」。黒幕も 同じ 手口を 使った。',
      question: '黒幕は 誰?',
      hint: '国際的 専門家を 名乗りながら、3つの 大事件 (1·6·9) の 全てを 間違えた 人物は?',
      suspectIds: ['curator', 'kingpin', 'translator'],
      answer: 'kingpin',
      explanation:
        '黒幕は ヴィクトル さん!\n\n' +
        '【推理】\n' +
        '① 動機 = 世界の 文学·芸術品を 集めて 高額で 売りさばく 国際密売組織の リーダー\n' +
        '② 黒幕は「国際専門家」 を 自称したが シェイクスピア (4大悲劇)·ピカソ (キュビズム)·紫式部 (平安) の 3つも 間違えた\n' +
        '③ 真の 国際専門家なら 絶対 知る 基本\n' +
        '④ ジェシカは 9事件の 全てに 詳しく 正確、カレンは 専門外を 自認\n' +
        '⑤ ヴィクトルは 経歴も 不明 (世界を 飛び回る = アリバイなし)、装いだけで 知識ゼロ\n' +
        '⑥ 9人の 偽専門家を 雇って 世界各地の 価値ある物を 盗ませていた 真の 黒幕\n\n' +
        'ハル·リオの 1~9事件で 学んだ 全ての 文学·芸術知識が 真犯人を 暴いた、最終 集大成事件!',
    },
    learned: { title: '📚 この 事件で 学んだこと (集大成)', points: [
      '🎭 西洋古典文学 (シェイクスピア·アンデルセン·千夜一夜物語)',
      '🎼 西洋古典音楽·バレエ (モーツァルト·チャイコフスキー)',
      '🎨 西洋美術 (ゴッホ·ピカソ)',
      '📜 日本の 古典 (紫式部·葛飾北斎)',
      '🌍 世界の 文学·芸術 = 国境を 越えて 人類の 宝',
      '🔍 「専門家を 装う 偽者」 を 見抜く 力 = 推理の 基本',
    ]},
    note: { title: '第10事件 ボス・世界芸術連続事件', desc: '1~9事件の 全ての 文学·芸術知識を 集大成し、国際密売組織の 黒幕を 暴いた 最終事件。' },
  },

];

