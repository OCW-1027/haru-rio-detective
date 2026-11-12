// ============================================================
// 시리즈 6 📊 ビジネス・企業 (BIZ_STORY + BIZ_CASE_IMAGES)
// 원본 index.html 라인 14122 ~ 15619
// 분할 v73 (모듈화)
// ============================================================
// =========================
// 📊 ビジネス・企業探偵団 시리즈 (v58)
// 큰자녀(英検2級) 도전적 난이도
// =========================
const BIZ_CASE_IMAGES = {}; // v61: 시리즈 6 일러스트 10장 전체 통합 완료 ✓

// BIZ_CASE_IMAGES (v61)
BIZ_CASE_IMAGES[1] = 'assets/img/series6-business/biz_case_images_1.webp';
BIZ_CASE_IMAGES[2] = 'assets/img/series6-business/biz_case_images_2.webp';
BIZ_CASE_IMAGES[3] = 'assets/img/series6-business/biz_case_images_3.webp';
BIZ_CASE_IMAGES[4] = 'assets/img/series6-business/biz_case_images_4.webp';
BIZ_CASE_IMAGES[5] = 'assets/img/series6-business/biz_case_images_5.webp';
BIZ_CASE_IMAGES[6] = 'assets/img/series6-business/biz_case_images_6.webp';
BIZ_CASE_IMAGES[7] = 'assets/img/series6-business/biz_case_images_7.webp';
BIZ_CASE_IMAGES[8] = 'assets/img/series6-business/biz_case_images_8.webp';
BIZ_CASE_IMAGES[9] = 'assets/img/series6-business/biz_case_images_9.webp';
BIZ_CASE_IMAGES[10] = 'assets/img/series6-business/biz_case_images_10.webp';

const BIZ_STORY = [
  // ========================================
  // 第1事件: 🏯 家族会社の 後継者争い
  // ========================================
  {
    id: 1, icon: '🏯',
    title: '家族会社の 後継者争い',
    subtitle: '誰が 老舗の 真の 後継者か?',
    theme: '株式·議決権·相続',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[1],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '京都の 老舗、200年の 伝統を 持つ 和菓子メーカー「松竹堂」。3代目社長が 急逝した。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '会社の 株式は 家族内で 分散している。誰が 4代目 社長に なるかで 争いが 起きた!' },
      { speaker: '弁護士 田中先生', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、よく 来てくれた。私は 松竹堂の 顧問弁護士、田中だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '会社って 誰が 決めるの? 一番 偉い人?' },
      { speaker: '弁護士 田中先生', cls: 'sensei', charKey: 'ojiisan',
        text: '「株主総会」 で 決める。株式を 多く 持つ 人ほど 議決権が 強い。これが 株式会社の 仕組みだ。' },
      { speaker: '弁護士 田中先生', cls: 'sensei', charKey: 'ojiisan',
        text: '3人の 親族が「自分こそ 4代目」 と 主張している。みな 株式の 知識を 自慢するが、本当の 専門家は 誰なのか…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '株式・議決権の 知識で 真犯人 (会社を 私物化しようとする 人) を 暴きます!' },
    ],
    steps: [
      // STEP 1: 議決権の 仕組み
      {
        id: 'step1', type: 'mc',
        title: '🏛 STEP 1: 株主総会の 議決権',
        intro: [
          { speaker: '田中先生', cls: 'sensei', charKey: 'ojiisan', text: '株主総会では 1株 = 1票 が 原則だ。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '何株 あれば 過半数を 取れますか?' },
        ],
        puzzle: {
          prompt: '会社の 重要な 決定 (普通決議) に 必要な 議決権の 割合は?',
          hint: '「過半数」 が キーワード。',
          options: [
            '発行済株式の 1/4 以上',
            '発行済株式の 過半数 (50%超)',
            '発行済株式の 2/3 以上',
            '発行済株式の 全部',
          ],
          answer: 1,
          explanation: '普通決議は「議決権の 過半数を 持つ 株主が 出席し、その 過半数の 賛成」 で 成立 (会社法309条1項)。社長選任·配当決定 などが 該当。なお 定款変更などの 特別決議は 2/3以上 必要。',
        },
        clue: { title: '議決権の 基本', desc: '普通決議 = 過半数 (50%超)、特別決議 = 2/3以上。1株 = 1票が 原則。' },
      },
      // STEP 2: 相続と 株式
      {
        id: 'step2', type: 'mc',
        title: '👴 STEP 2: 相続による 株式の 移転',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '社長が 亡くなった 場合、株式は どう なるの?' },
          { speaker: '田中先生', cls: 'sensei', charKey: 'ojiisan', text: '相続 (そうぞく) で 家族に 引き継がれる。' },
        ],
        puzzle: {
          prompt: '亡くなった 社長 (3代目) の 配偶者 (妻) と 子2人 (長男・長女) が 法定相続する 場合、配偶者の 法定相続分は?',
          hint: '配偶者は 常に 相続人。子供と 一緒の 場合は…',
          options: [
            '1/4',
            '1/3',
            '1/2',
            '2/3',
          ],
          answer: 2,
          explanation: '配偶者と 子供が 相続人の 場合 → 配偶者 1/2、子供たち 残り 1/2を 均等分割 (民法900条)。今回 = 妻 1/2、長男 1/4、長女 1/4。遺言が ある場合は 別。',
        },
        clue: { title: '法定相続分', desc: '配偶者+子供 = 配偶者1/2、子供1/2 (子供同士は 均等分割)。長男だから 多い という ことは ない。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者の 1人が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager3',
            text: '「私は 長男だから 株式は 全部 私の もの。普通決議は 1/4で 通るし、何も 問題ない」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '相続の 法定相続分と 議決権の 基準、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 長男が 全部 相続するのは 嘘 (配偶者+子供で 分割)、② 普通決議は 1/4ではなく 過半数 (50%超)。会社法・民法を 知る 人なら 絶対 間違えない 基本。',
        },
        clue: { title: '専門家詐欺', desc: '法律家を 自称しながら 相続分も 議決権も 両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'kazuko', name: '松竹 和子 (亡き社長の 妻)', icon: '👘', charKey: 'tanaka',
        role: '副社長 (25年)',
        height: '162cm', clothes: '喪服',
        specialty: '会社法・経理 (経営に 詳しい)',
        alibi: '夫の 葬儀の 準備に 追われていた。',
        testimony: '法定相続では 私が 1/2、子供たちが 1/4ずつ。普通決議は 過半数 (50%超) が 必要。これを 守って 4代目を 決めるべきだ。',
      },
      {
        id: 'takashi', name: '松竹 隆 (長男・40歳)', icon: '🏯', charKey: 'villager3',
        role: '営業部長 (10年)',
        height: '178cm', clothes: 'スーツ',
        specialty: '営業 (法律は 知ったかぶり)',
        alibi: '昨夜は 弁護士事務所に 相談に 行った と 主張。',
        testimony: '私は 長男だから 株式は 全部 私の もの。普通決議は 1/4で 通るし、何も 問題ない。',
      },
      {
        id: 'sakura', name: '松竹 桜 (長女・35歳)', icon: '🌸', charKey: 'villager4',
        role: '広報部 (8年)',
        height: '165cm', clothes: '黒いワンピース',
        specialty: '広報 (会社法は 専門外)',
        alibi: '昨夜は 葬儀で 弔問客の 対応を していた。',
        testimony: '私は 法律は 詳しくない。でも 母さんと 兄さんと 私で 公平に 話し合いたい。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は 法律家 (会社法・相続法) の「ふり」 を している\n② しかし 相続分 (長男全部) と 議決権 (1/4) 両方 間違えた\n③ 容疑者:\n  ・和子 (妻): 副社長 (法定相続·過半数を 正確に 知る)\n  ・隆 (長男): 営業部長 (法律を 自称しながら 両方 間違える)\n  ・桜 (長女): 広報 (「法律は 詳しくない」 と 自認)',
      question: '会社を 私物化しようとする 真犯人は 誰?',
      hint: '法律家を 装いながら 会社法と 相続法の 基本を 両方 間違えた 人物は?',
      suspectIds: ['kazuko', 'takashi', 'sakura'],
      answer: 'takashi',
      explanation:
        '真犯人は 隆 さん!\n\n' +
        '【推理】\n' +
        '① 動機 = 4代目 社長に なって 会社を 独占したい\n' +
        '② 隆は「法律に 詳しい」 と 自称したが 法定相続も 議決権も 両方 間違えた\n' +
        '③ 真の 経営者なら 絶対 間違えない 会社法・民法の 基本\n' +
        '④ 母 和子は 正確、妹 桜は 専門外を 自認\n' +
        '⑤ 隆は 嘘の 法律解釈で 母と 妹を 説得し、株式を 独占しようとした\n\n' +
        '会社法・相続法の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🏛 株主総会の 普通決議 = 議決権の 過半数 (50%超)',
      '🏛 特別決議 (定款変更等) = 2/3以上',
      '👴 法定相続: 配偶者+子供 = 配偶者1/2、子供1/2 (均等分割)',
      '⚠ 長男だから 全部 相続する わけではない',
      '📜 会社の 重要決定は「株主総会」 で 行われる (1株 = 1票 が 原則)',
    ]},
    note: { title: '第1事件 家族会社の 後継', desc: '株主総会の 議決権と 法定相続分を 学び、会社法・民法の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第2事件: 💻 IT会社の 機密漏洩
  // ========================================
  {
    id: 2, icon: '💻',
    title: 'IT会社の 機密漏洩',
    subtitle: '消えた 新製品の 設計書!',
    theme: '営業秘密·特許·NDA',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[2],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京・渋谷の IT スタートアップ「テックフロー」。AIを 使った 新製品を 開発中だった。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '一晩で 設計書 ファイルが 競合他社に 漏洩した! 株価が 暴落する 前に 真犯人を 見つけたい。' },
      { speaker: 'CTO 山田さん', cls: 'sensei', charKey: 'mori',
        text: 'ハル君、リオ君、緊急で 来てくれて ありがとう。私は CTO の 山田だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '会社の 秘密って どう やって 守るの?' },
      { speaker: '山田 CTO', cls: 'sensei', charKey: 'mori',
        text: '3つの 法律で 守る。「営業秘密」 (不正競争防止法)、「特許権」 (特許法)、「NDA」 (秘密保持契約)。それぞれ 役割が 違う。' },
      { speaker: '山田 CTO', cls: 'sensei', charKey: 'mori',
        text: '社内に 3人 怪しい人物が いる。みな IT・法律を 自称するが、本当の 専門家は 誰か…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '営業秘密と 特許の 違いを 使って、嘘を 見抜きます!' },
    ],
    steps: [
      // STEP 1: 営業秘密の 3要件
      {
        id: 'step1', type: 'mc',
        title: '🔒 STEP 1: 営業秘密の 3要件',
        intro: [
          { speaker: '山田 CTO', cls: 'sensei', charKey: 'mori', text: '営業秘密として 法的に 保護されるには 3つの 条件が 必要だ。' },
        ],
        puzzle: {
          prompt: '不正競争防止法の「営業秘密」 として 保護される 3要件 (秘密管理性・有用性・非公知性) の うち、含まれない のは どれ?',
          hint: '「有用 (役に 立つ)」「秘密として 管理」「公に 知られていない」 が 3要件。',
          options: [
            '秘密管理性 (鍵をかけ・アクセス制限など)',
            '有用性 (事業に 役立つ 情報)',
            '非公知性 (公に 知られていない)',
            '特許登録性 (特許庁に 登録されている)',
          ],
          answer: 3,
          explanation: '営業秘密の 3要件 = 秘密管理性·有用性·非公知性 (不正競争防止法2条6項)。「特許登録」 は 特許権の 要件で、営業秘密とは 全く 別。営業秘密は「秘密」 であることが 重要なので むしろ 公開しない。',
        },
        clue: { title: '営業秘密の 3要件', desc: '営業秘密 = 秘密管理性+有用性+非公知性 (登録は 不要)。' },
      },
      // STEP 2: 特許 vs 営業秘密
      {
        id: 'step2', type: 'mc',
        title: '📜 STEP 2: 特許と 営業秘密の 違い',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '特許と 営業秘密、どっちが 強いんですか?' },
          { speaker: '山田 CTO', cls: 'sensei', charKey: 'mori', text: '目的が 違う。特許は「公開する」 代わりに 独占権、営業秘密は「秘密にする」 代わりに 不正使用を 禁止。' },
        ],
        puzzle: {
          prompt: '特許権の 説明として 正しい のは どれ?',
          hint: '特許は「公開」 と「期限」 が キーワード。',
          options: [
            '特許は 永久に 守られ、内容を 公開する 必要は ない',
            '特許は 出願日から 20年で 期限が 切れ、内容は 公開される',
            '特許は 期限なし だが 内容は 公開される',
            '特許は 期限なし で 内容も 公開不要',
          ],
          answer: 1,
          explanation: '特許権は 出願日から 20年 (特許法67条)。その 期間 独占できる 代わりに 内容は 公開される (特許公報)。期限後は 誰でも 使える。コカ・コーラの レシピは 特許を 取らず 営業秘密として 100年以上 守っている。',
        },
        clue: { title: '特許の 仕組み', desc: '特許 = 20年限定·内容公開·独占権。営業秘密 = 期限なし·非公開·不正使用禁止のみ。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「設計書は 営業秘密だが 特許登録が ないから 法的保護なし。私が 持ち出しても 罪に ならない」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '営業秘密の 要件と 特許の 関係を 思い出そう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 営業秘密に 特許登録は 不要 (3要件は 別物)、② 不正競争防止法で「不正取得・使用・開示」 は 民事・刑事責任 (10年以下の 懲役・2000万円以下の 罰金)。本当の IT・法律者なら 絶対 知る 基本。',
        },
        clue: { title: '専門家詐欺', desc: 'IT・法律者を 自称しながら 営業秘密と 特許の 関係を 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'sato', name: '佐藤 主任エンジニア', icon: '💻', charKey: 'mina',
        role: 'シニアエンジニア (10年)',
        height: '175cm', clothes: 'カジュアルシャツ',
        specialty: 'AI開発·セキュリティ',
        alibi: '昨夜は 自宅で 別プロジェクトの コードを 書いていた。',
        testimony: '営業秘密は 不正競争防止法で、特許とは 別の 制度。3要件 (秘密管理性·有用性·非公知性) を 満たせば 登録不要で 守られる。',
      },
      {
        id: 'kobayashi', name: '小林 営業マネージャー', icon: '👔', charKey: 'mystery',
        role: 'セールス (4年)',
        height: '180cm', clothes: 'スーツ',
        specialty: '営業 (法律は 浅い)',
        alibi: '昨夜は クライアントと 飲み会だった と 主張。',
        testimony: '設計書は 営業秘密だが 特許登録が ないから 法的保護なし。私が 持ち出しても 罪に ならない。',
      },
      {
        id: 'tanaka_a', name: '田中 アシスタント', icon: '👩‍💼', charKey: 'villager2',
        role: '事務 (2年)',
        height: '160cm', clothes: 'オフィスカジュアル',
        specialty: '事務処理 (法律・技術は 専門外)',
        alibi: '昨夜は 残業で 経理書類を 整理していた。',
        testimony: '私は 事務で 法律も 技術も 詳しくない。でも 大事な 書類は ロックされた 部屋で 保管していた。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は 法律・IT に 詳しい「ふり」 を している\n② しかし 営業秘密の 要件 と 不正取得の 罰則、両方 間違えた\n③ 容疑者:\n  ・佐藤 (エンジニア): 3要件を 正確に 知る\n  ・小林 (営業): 「特許登録なし=保護なし」 と 嘘をつく\n  ・田中 (事務): 「法律は 専門外」 と 自認',
      question: '機密を 漏洩した 真犯人は 誰?',
      hint: '営業秘密の 法律を 知らずに 「持ち出しても 大丈夫」 と 嘘を ついた 人物は?',
      suspectIds: ['sato', 'kobayashi', 'tanaka_a'],
      answer: 'kobayashi',
      explanation:
        '真犯人は 小林 さん!\n\n' +
        '【推理】\n' +
        '① 動機 = 競合他社に 設計書を 売って 大金を 得ようとした\n' +
        '② 「特許登録が ない から 法的保護なし」 と 自分を 説得しようとしたが 完全な 嘘\n' +
        '③ 営業秘密 = 3要件 (登録不要)、不正取得 = 10年以下の 懲役\n' +
        '④ 佐藤 エンジニアは 正確、田中 事務は 専門外を 自認\n' +
        '⑤ 小林は 法律を 都合よく 解釈して 犯罪行為を 正当化しようとした\n\n' +
        '不正競争防止法の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🔒 営業秘密の 3要件 = 秘密管理性 + 有用性 + 非公知性',
      '📜 営業秘密 ≠ 特許 (登録不要)',
      '⏰ 特許 = 出願日から 20年·内容公開·独占権',
      '⚠ 営業秘密の 不正取得 = 不正競争防止法違反 (10年以下の 懲役)',
      '💼 NDA (秘密保持契約) = 個別契約で 秘密保護を 強化',
    ]},
    note: { title: '第2事件 機密漏洩', desc: '営業秘密の 3要件と 特許との 違いを 学び、不正競争防止法の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第3事件: 📑 偽決算書事件
  // ========================================
  {
    id: 3, icon: '📑',
    title: '偽決算書事件',
    subtitle: '消えた 利益、書き換えられた 数字!',
    theme: '損益計算書·粉飾決算',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[3],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京・丸の内の 大手商社「東洋商事」。決算発表が 明日に 迫っている。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '監査法人が 決算書の 異常を 見つけた! 売上は 増えたのに 現金が 減っている…粉飾決算 (ふんしょくけっさん) の 疑い!' },
      { speaker: '監査人 高橋先生', cls: 'sensei', charKey: 'yamada',
        text: 'ハル君、リオ君、来てくれて 助かる。私は 監査法人の 公認会計士、高橋だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '会社の お金って どう やって 確認するの?' },
      { speaker: '高橋 監査人', cls: 'sensei', charKey: 'yamada',
        text: '3つの 財務諸表で 見る。「損益計算書 (P/L)」「貸借対照表 (B/S)」「キャッシュ・フロー計算書 (C/F)」。それぞれ 違う 角度で 会社の 状態を 表す。' },
      { speaker: '高橋 監査人', cls: 'sensei', charKey: 'yamada',
        text: '経理部で 3人 怪しい人物が いる。みな 会計の 専門家を 名乗るが、嘘を ついている 者が いる…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '会計の 知識で 粉飾決算の 真犯人を 暴きます!' },
    ],
    steps: [
      // STEP 1: 損益計算書 (P/L) の 構造
      {
        id: 'step1', type: 'mc',
        title: '📊 STEP 1: 損益計算書の 利益区分',
        intro: [
          { speaker: '高橋 監査人', cls: 'sensei', charKey: 'yamada', text: '損益計算書には 5つの 利益が ある。順番が 重要だ。' },
        ],
        puzzle: {
          prompt: '損益計算書の 利益区分の 計算順序 として 正しい のは?',
          hint: '売上から 段階的に 費用を 引いていく。最後に「税金引き後」 の 利益。',
          options: [
            '売上総利益 → 営業利益 → 経常利益 → 税引前当期純利益 → 当期純利益',
            '営業利益 → 売上総利益 → 経常利益 → 当期純利益 → 税引前',
            '当期純利益 → 経常利益 → 営業利益 → 売上総利益 → 税引前',
            '経常利益 → 営業利益 → 売上総利益 → 税引前 → 当期純利益',
          ],
          answer: 0,
          explanation: 'P/Lの 5つの 利益: ① 売上総利益 (粗利、売上-売上原価)、② 営業利益 (本業の 利益)、③ 経常利益 (営業+営業外)、④ 税引前当期純利益 (経常+特別)、⑤ 当期純利益 (税引後)。投資家は ②営業利益と ⑤当期純利益を 重視。',
        },
        clue: { title: 'P/L の 5つの 利益', desc: '売上総利益 → 営業利益 → 経常利益 → 税引前当期純利益 → 当期純利益。' },
      },
      // STEP 2: 売上 と キャッシュフロー
      {
        id: 'step2', type: 'mc',
        title: '💰 STEP 2: 売上と 現金の ズレ',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '売上が 増えれば お金も 増えますよね?' },
          { speaker: '高橋 監査人', cls: 'sensei', charKey: 'yamada', text: 'そう とは 限らない。「売上計上」 と「現金回収」 は 別の タイミングなんだ。' },
        ],
        puzzle: {
          prompt: '会計上、商品を 売って すぐに 売上を 計上したのに 現金が 入って こない 場合、貸借対照表 (B/S) に 何が 増える?',
          hint: '「まだ もらってない お金」 を 表す 勘定科目。',
          options: [
            '現金 (cash)',
            '売掛金 (accounts receivable)',
            '買掛金 (accounts payable)',
            '在庫 (inventory)',
          ],
          answer: 1,
          explanation: '商品 販売で 売上を 計上したが 現金 未回収 → 「売掛金」 が 増える。粉飾決算では 架空の 売掛金を 増やして 売上を 水増しすることが 多い。本当に 現金が 入った かは キャッシュ・フロー計算書 (C/F) で 確認できる。',
        },
        clue: { title: '売掛金の 警戒', desc: '売上 増 + 現金 減 = 売掛金 急増の 可能性。粉飾決算の 典型パターン。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager1',
            text: '「売上が 増えれば 必ず 現金も 増える。当期純利益が P/Lの 一番上に 来るのが 会計の 基本だ」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '売上と 現金の 関係、P/Lの 利益順序、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 売上=現金 ではない (売掛金が 入る、回収まで 時間差)、② 当期純利益は P/Lの 一番下 (最終的な 税引後利益)、一番上は 売上総利益。会計士なら 絶対 間違えない 超基本。',
        },
        clue: { title: '専門家詐欺', desc: '会計士を 名乗りながら 売上=現金、当期純利益=一番上 と 二重の 嘘を ついた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'cfo', name: '田村 CFO', icon: '💼', charKey: 'tanaka',
        role: '財務担当役員 (15年)',
        height: '178cm', clothes: 'ダークスーツ',
        specialty: '財務会計·監査対応',
        alibi: '昨夜は 監査法人と 決算書の 最終確認会議に 参加していた。',
        testimony: 'P/L の 5つの 利益区分、B/S の 売掛金、C/F の 現金フロー。会計の 基本を 守れば 粉飾は 起きない。',
      },
      {
        id: 'manager', name: '伊藤 経理部長', icon: '📊', charKey: 'villager1',
        role: '経理部長 (8年)',
        height: '175cm', clothes: 'スーツ',
        specialty: '経理処理 (実は 会計知識が 浅い)',
        alibi: '昨夜は 自宅で 仕事を していた と 主張。',
        testimony: '売上が 増えれば 必ず 現金も 増える。当期純利益が P/Lの 一番上に 来るのが 会計の 基本だ。',
      },
      {
        id: 'staff', name: '鈴木 経理スタッフ', icon: '🧑‍💻', charKey: 'villager4',
        role: '経理スタッフ (3年)',
        height: '165cm', clothes: 'オフィスカジュアル',
        specialty: '伝票処理 (高度な 会計分析は 専門外)',
        alibi: '昨夜は 残業で 仕訳入力を していた。',
        testimony: '私は スタッフで 高度な 分析は 専門外。でも 売掛金が 急増しているのは 気になっていた。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は 会計の「ふり」 を している\n② しかし 売上=現金 と 当期純利益=一番上、二重の 嘘\n③ 容疑者:\n  ・田村 CFO: 財務役員 (P/L·B/S·C/F を 正確に 説明)\n  ・伊藤 経理部長: 「売上=現金、純利益=一番上」 と 嘘\n  ・鈴木 スタッフ: 「高度な 分析は 専門外」 と 自認しつつ 売掛金急増を 疑問視',
      question: '粉飾決算の 真犯人は 誰?',
      hint: '会計士を 装いながら 売上と 現金の 違い、P/Lの 構造を 両方 間違えた 人物は?',
      suspectIds: ['cfo', 'manager', 'staff'],
      answer: 'manager',
      explanation:
        '真犯人は 伊藤 経理部長!\n\n' +
        '【推理】\n' +
        '① 動機 = 売上目標 未達を 隠すため、架空売上を 計上 (粉飾決算)\n' +
        '② 「売上=現金」 と 言って 売掛金急増の 違和感を ごまかそうとした\n' +
        '③ しかし 当期純利益=P/L一番上 など 会計の 超基本まで 間違えた → 会計知識が 浅い ことが 露呈\n' +
        '④ 田村 CFOは 正確、鈴木 スタッフは 専門外を 自認しつつ 売掛金急増を 疑った\n' +
        '⑤ 伊藤は「経理部長」 の 肩書きを 利用して 部下の 鈴木に 不正な 仕訳を 強要した\n\n' +
        '会計の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '📊 P/Lの 5つの 利益: 売上総 → 営業 → 経常 → 税引前当期純 → 当期純',
      '💰 売上 ≠ 現金 (売掛金で タイムラグ)',
      '⚠ 売上急増 + 現金減 = 粉飾決算の 警戒サイン',
      '📑 3つの 財務諸表: P/L (利益)、B/S (財産)、C/F (現金フロー)',
      '🔍 監査人は 3表を 突き合わせて 不正を 発見する',
    ]},
    note: { title: '第3事件 偽決算書', desc: '損益計算書と 売上・現金の 違いを 学び、会計の「正確さ」 で 粉飾決算の 真犯人を 暴いた。' },
  },

  // ========================================
  // 第4事件: 📈 株価操作の 謎
  // ========================================
  {
    id: 4, icon: '📈',
    title: '株価操作の 謎',
    subtitle: '不自然な 値上がりの 裏に…',
    theme: 'インサイダー取引·相場操縦',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[4],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京証券取引所 (東証)。ある 中堅製薬会社の 株価が、好材料の 公表 1日前から 不自然に 急騰した。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '証券取引等監視委員会 (SESC) が 動いた。「インサイダー取引」 の 疑いだ!' },
      { speaker: '監視委員 林さん', cls: 'sensei', charKey: 'yamada',
        text: 'ハル君、リオ君、ご協力 ありがとう。私は 証券取引等監視委員会の 林。市場の 公正さを 守る 番人だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '「インサイダー取引」 って 何ですか?' },
      { speaker: '林さん', cls: 'sensei', charKey: 'yamada',
        text: '会社の「重要事実」 (例: 新薬承認、業績修正、合併など) を 公表前に 知って、その 株を 売買すること。一般投資家との 不公平が 生じるので 金商法で 厳しく 禁じられている。' },
      { speaker: '林さん', cls: 'sensei', charKey: 'yamada',
        text: '3人の 関係者が 怪しい。みな 投資・法律に 詳しい と 言うが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '金商法の 知識で、市場を 裏切った 真犯人を 暴きます!' },
    ],
    steps: [
      // STEP 1: インサイダー取引の 定義
      {
        id: 'step1', type: 'mc',
        title: '🚫 STEP 1: インサイダー取引の 要件',
        intro: [
          { speaker: '林さん', cls: 'sensei', charKey: 'yamada', text: 'インサイダー取引が 成立するには 3つの 条件が ある。' },
        ],
        puzzle: {
          prompt: '金融商品取引法上の「インサイダー取引」 の 成立要件として 含まれない のは どれ?',
          hint: '「会社関係者」 が「重要事実」 を「公表前に」 知って 売買…が キーワード。',
          options: [
            '会社関係者 (役員·従業員·主要株主など) であること',
            '「重要事実」 を 知っていること',
            '当該 重要事実が「未公表」 であること',
            '取引の 利益が 100万円以上 であること',
          ],
          answer: 3,
          explanation: '3要件 = ①会社関係者である ②重要事実を 知る ③公表前 (金商法166条)。利益額の 大小は 関係ない (1万円でも アウト)。違反時は 5年以下の 懲役 or 500万円以下の 罰金 + 課徴金。',
        },
        clue: { title: 'インサイダーの 3要件', desc: '会社関係者 + 重要事実 + 公表前 = アウト。利益額は 関係ない。' },
      },
      // STEP 2: 公表のタイミング
      {
        id: 'step2', type: 'mc',
        title: '⏰ STEP 2: 「公表」 の 定義',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '「公表前」 って いつから OK ですか?' },
          { speaker: '林さん', cls: 'sensei', charKey: 'yamada', text: '法律で 厳密に 決まっている。' },
        ],
        puzzle: {
          prompt: '金商法上「公表された」 と 認められる タイミングは いつ?',
          hint: 'TDnet (適時開示情報) や 報道機関 への 公開が キーワード。',
          options: [
            '社内会議で 決まった 瞬間',
            '社長が 友人に 話した 瞬間',
            'TDnet 公表 または 2社以上の 報道機関への 周知から 12時間経過後',
            '株式市場が 開いた 瞬間',
          ],
          answer: 2,
          explanation: '「公表」 = TDnet (東証の 適時開示) 公表、または 2社以上の 報道機関への 周知から 12時間経過 (金商法166条4項、施行令30条)。社内決定や 私的な 会話は「公表」 ではない。',
        },
        clue: { title: '公表のタイミング', desc: 'TDnet公表 or 2社以上 報道+12時間 = 公表済み。それ以前の 取引は インサイダー。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mina',
            text: '「私は 100万円も 利益が 出てないし、社長が 会議で 決めた 後 すぐ 買ったから 公表後の 取引で セーフだ」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '利益額の 要件と「公表」 の 定義、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① インサイダー取引に 利益額の 下限は ない (1円でも アウト)、② 社内会議の 決定は「公表」 ではない (TDnetや 報道周知が 必要)。本当の 投資・法律 専門家なら 絶対 知る 基本。',
        },
        clue: { title: '専門家詐欺', desc: '投資・法律家を 名乗りながら 利益額 と「公表」 の 意味、両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'pm', name: '中島 機関投資家 PM', icon: '📊', charKey: 'yamada',
        role: 'ファンドマネージャー (12年)',
        height: '178cm', clothes: 'スーツ',
        specialty: '株式運用·金商法',
        alibi: '昨日は 公表後 (TDnet翌日) に 買い増した。記録あり。',
        testimony: 'インサイダー取引は 公表前の 売買が アウト。TDnet公表 か 2社以上の 報道+12時間後 が「公表済み」 だ。利益額は 関係ない。',
      },
      {
        id: 'employee', name: '佐々木 社員 (経理)', icon: '👨‍💼', charKey: 'mina',
        role: '経理部 (5年、自社株 保有)',
        height: '175cm', clothes: 'ビジネスカジュアル',
        specialty: '経理 (金商法は 都合よく 解釈)',
        alibi: '会議直後 (公表前) に 自社株を 買い増した。',
        testimony: '私は 100万円も 利益が 出てないし、社長が 会議で 決めた 後 すぐ 買ったから 公表後の 取引で セーフだ。',
      },
      {
        id: 'retail', name: '青木 個人投資家', icon: '🧑‍💻', charKey: 'mori',
        role: '個人投資家 (3年)',
        height: '168cm', clothes: 'カジュアル',
        specialty: '個人売買 (法律詳しくない)',
        alibi: 'TDnet 公表を 見て、その 翌日 ネット証券で 買った。',
        testimony: '私は 法律は 詳しくないけど、新聞で ニュースを 見てから 買ったから 普通の 投資です。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は 投資・金商法に 詳しい「ふり」 を している\n② しかし 利益額の 下限 と「公表」 の 定義、両方 間違えた\n③ 容疑者:\n  ・中島 PM: 機関投資家 (3要件·公表 を 正確に 知る、公表後購入)\n  ・佐々木 社員: 会議直後 (公表前) 購入、誤った 自己解釈\n  ・青木 個人: TDnet公表後の 通常購入',
      question: 'インサイダー取引の 真犯人は 誰?',
      hint: '投資家を 装いながら 金商法の 基本を 間違えて 公表前の 自社株を 買った 人物は?',
      suspectIds: ['pm', 'employee', 'retail'],
      answer: 'employee',
      explanation:
        '真犯人は 佐々木 社員!\n\n' +
        '【推理】\n' +
        '① 動機 = 新薬承認の 内部情報を 知って 自社株で 儲けたかった\n' +
        '② 「100万円以下なら セーフ」「会議決定 = 公表」 と 二重に 自己正当化\n' +
        '③ しかし 両方 法律違反 (利益額無関係 + 公表は TDnet/報道+12h)\n' +
        '④ 中島 PMは 公表後の 通常購入、青木 個人も 公表後 → 違法性なし\n' +
        '⑤ 佐々木は「経理」 として 内部情報に アクセスでき、会議直後 (=公表前) に 買い増した\n\n' +
        '金商法の「正確さ」 が インサイダー取引を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🚫 インサイダー取引 = 会社関係者 + 重要事実 + 公表前 (3要件)',
      '⚠ 利益額 0円でも アウト (利益の 大小は 無関係)',
      '⏰ 「公表」 = TDnet 公表 or 2社以上 報道+12時間経過',
      '⚖ 違反時 = 5年以下の 懲役 / 500万円以下の 罰金 + 課徴金',
      '🏛 監視機関 = 証券取引等監視委員会 (SESC)',
    ]},
    note: { title: '第4事件 株価操作', desc: 'インサイダー取引の 3要件と「公表」 の 定義を 学び、金商法の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第5事件 (中ボス): 🎩 上場詐欺事件
  // ========================================
  {
    id: 5, icon: '🎩',
    title: '上場詐欺事件',
    subtitle: 'IPO 直前、消えた 監査報告書!',
    theme: 'IPO·監査·投資家保護',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[5],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京証券取引所 グロース市場。明日 上場予定の バイオベンチャー「ゲノミックス」。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '上場 (IPO) 直前、監査法人の 監査報告書が 改ざんされた! 投資家 保護の ため 真相を 解明しなければ ならない。' },
      { speaker: '主幹事 担当者 西田さん', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、緊急で 来てくれた ことに 感謝する。私は 主幹事証券会社の 引受担当 西田だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '「IPO」 って 何ですか?' },
      { speaker: '西田さん', cls: 'sensei', charKey: 'ojiisan',
        text: 'Initial Public Offering、新規株式公開だ。会社が 初めて 株式を 一般投資家に 売る こと。証券取引所の 厳しい 審査を 通って 初めて 上場できる。' },
      { speaker: '西田さん', cls: 'sensei', charKey: 'ojiisan',
        text: '3人の 上場 関係者が 怪しい。みな IPOに 詳しい と 言うが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'IPOと 監査の 知識で、投資家を 騙そうとした 真犯人を 暴きます!' },
    ],
    steps: [
      // STEP 1: 監査の 種類
      {
        id: 'step1', type: 'mc',
        title: '✅ STEP 1: 監査意見の 種類',
        intro: [
          { speaker: '西田さん', cls: 'sensei', charKey: 'ojiisan', text: '監査法人は 4種類の「監査意見」 を 出す。最高評価から 最悪まで。' },
        ],
        puzzle: {
          prompt: '上場審査で 必要な「最も 良い」 監査意見は?',
          hint: '英語で「Unqualified Opinion」 (条件なしの 意見)。',
          options: [
            '無限定適正意見 (Unqualified)',
            '限定付適正意見 (Qualified)',
            '不適正意見 (Adverse)',
            '意見不表明 (Disclaimer)',
          ],
          answer: 0,
          explanation: '監査意見 4種類: ①無限定適正 (最高、上場審査 通過可)、②限定付適正 (一部問題あり)、③不適正 (重大な 虚偽表示あり)、④意見不表明 (監査が できなかった)。②~④では 上場できない。',
        },
        clue: { title: '監査意見の レベル', desc: '無限定適正 → 限定付適正 → 不適正 → 意見不表明。最高は 無限定適正。' },
      },
      // STEP 2: ロックアップ
      {
        id: 'step2', type: 'mc',
        title: '🔒 STEP 2: ロックアップ条項',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'IPOで 上場した 直後、創業者は 株を 売れますか?' },
          { speaker: '西田さん', cls: 'sensei', charKey: 'ojiisan', text: 'すぐは 売れない。「ロックアップ」 という 制限が ある。' },
        ],
        puzzle: {
          prompt: '日本の IPOで「ロックアップ」 (大株主の 売却制限) の 一般的な 期間は?',
          hint: '上場直後 すぐに 大量 売却されると 株価が 暴落するから 制限する。',
          options: [
            '上場後 1日',
            '上場後 30日',
            '上場後 90日 ~ 180日 (3ヶ月~6ヶ月)',
            '上場後 5年',
          ],
          answer: 2,
          explanation: 'ロックアップ = 90日~180日 (3~6ヶ月) が 一般的 (取引所規則)。創業者·VC·役員などの 大株主は この 期間 株を 売れない。期間後の 一斉売却を 防ぐため 段階解除も 多い。',
        },
        clue: { title: 'ロックアップ', desc: 'IPO後 90~180日 大株主は 売却制限。投資家保護の 仕組み。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「監査意見は 限定付適正でも 上場できる。ロックアップは 上場後 1日で 解除されるから 私はすぐ 株を 売って 儲ける!」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '監査意見と ロックアップ期間、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 限定付適正では 上場できない (無限定適正が 必要)、② ロックアップは 90~180日 (1日では ない)。IPOの 基本を 全く 知らない 人物。',
        },
        clue: { title: '専門家詐欺', desc: 'IPOに 詳しい と 名乗りながら 監査意見の レベルと ロックアップ期間、両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'auditor', name: '高木 監査法人 パートナー', icon: '✅', charKey: 'mori',
        role: '公認会計士 (20年)',
        height: '180cm', clothes: 'ダークスーツ',
        specialty: '上場会社監査·IPO',
        alibi: '昨夜は 監査調書の 最終確認を 監査法人で していた。',
        testimony: '無限定適正意見が 出てこそ 上場できる。ロックアップは 一般に 90~180日。投資家保護は IPOの 根幹だ。',
      },
      {
        id: 'founder', name: '若林 創業社長', icon: '🎩', charKey: 'mystery',
        role: 'CEO (会社設立 7年)',
        height: '178cm', clothes: 'スリムスーツ',
        specialty: '創業·経営 (上場の 法律は 浅い)',
        alibi: '昨夜は IPOの 記者会見の 準備を していた。',
        testimony: '監査意見は 限定付適正でも 上場できる。ロックアップは 上場後 1日で 解除されるから 私はすぐ 株を 売って 儲ける!',
      },
      {
        id: 'cfo_ipo', name: '岡田 CFO', icon: '💼', charKey: 'villager2',
        role: '財務責任者 (3年)',
        height: '175cm', clothes: 'スーツ',
        specialty: '財務 (IPO 実務は 学習中)',
        alibi: '昨夜は 主幹事証券会社と 価格決定会議に 参加していた。',
        testimony: '私は IPOは 初めての 経験で、細かい 規則は 学習中。でも 監査法人の 報告書は 慎重に 確認している。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は IPOに 詳しい「ふり」 を している\n② しかし 監査意見と ロックアップ期間、両方 間違えた\n③ 容疑者:\n  ・高木 会計士: 公認会計士 (4種類の 監査意見·ロックアップ を 正確に 知る)\n  ・若林 社長: 創業者 (限定付でOK、1日で 解除 と 誤解)\n  ・岡田 CFO: 「IPO実務は 学習中」 と 自認',
      question: '投資家を 騙そうとした 真犯人は 誰?',
      hint: 'IPOに 詳しい と 名乗りながら 監査と ロックアップを 両方 誤った 人物は?',
      suspectIds: ['auditor', 'founder', 'cfo_ipo'],
      answer: 'founder',
      explanation:
        '真犯人は 若林 社長!\n\n' +
        '【推理】\n' +
        '① 動機 = IPOで 自分の 持ち株を 高値で 売り抜けたい\n' +
        '② 「限定付適正でも上場 OK」「ロックアップ 1日」 と 二重の 自己正当化\n' +
        '③ しかし 両方 IPOの 基礎を 完全に 誤解 → 投資家から 集めた お金で 自分だけ 逃げようとした\n' +
        '④ 高木 会計士は 正確、岡田 CFOは 学習中を 自認しつつ 慎重\n' +
        '⑤ 若林は 監査報告書を 改ざんし「無限定適正」 を 装い、上場直後の 売り抜けを 計画\n\n' +
        '中ボス事件: IPO・監査の 2つの 知識で 投資家詐欺を 暴いた 集大成事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '✅ 監査意見 4種類: 無限定適正·限定付適正·不適正·意見不表明',
      '🏛 上場には「無限定適正意見」 が 必要',
      '🔒 ロックアップ = IPO後 90~180日 大株主の 売却制限',
      '⚠ IPO審査を 通った=安全 とは 限らない (会社が 監査を 騙すケースも)',
      '👥 主幹事証券·監査法人·取引所 = 投資家保護の 3層チェック',
    ]},
    note: { title: '第5事件 中ボス・上場詐欺', desc: 'IPOの 仕組みと 監査·ロックアップの 知識を 学び、投資家保護の「正確さ」 で 真犯人を 暴いた 中ボス事件。' },
  },

  // ========================================
  // 第6事件: 🤝 M&A 妨害事件
  // ========================================
  {
    id: 6, icon: '🤝',
    title: 'M&A 妨害事件',
    subtitle: '消えた 機密協議書、買収妨害!',
    theme: 'TOB·敵対的買収·防衛策',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[6],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京の 高級ホテル スイート。大手商社「東商」 が 中堅メーカー「中野工業」 への 買収交渉を 進めている。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '機密の 友好的買収 (M&A) 協議書が 漏洩し、第三者から 突如「敵対的TOB」 が 発表された! 妨害者を 見つけたい。' },
      { speaker: '東商 副社長 岩田さん', cls: 'sensei', charKey: 'mori',
        text: 'ハル君、リオ君、極秘案件で 申し訳ない。私は 東商の 副社長、M&A責任者の 岩田だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '「TOB」 って 何ですか?' },
      { speaker: '岩田 副社長', cls: 'sensei', charKey: 'mori',
        text: 'Take-Over Bid、株式公開買付け。市場で コソコソ 買うのではなく、価格と 期間を 公表して 一斉に 株主から 買い取る 方法だ。' },
      { speaker: '岩田 副社長', cls: 'sensei', charKey: 'mori',
        text: '3人の 関係者が 機密を 知りえた。みな M&Aの 専門家を 名乗るが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'M&Aと TOBの 知識で、敵対的買収を 仕掛けた 真犯人を 暴きます!' },
    ],
    steps: [
      // STEP 1: TOBの 義務
      {
        id: 'step1', type: 'mc',
        title: '📢 STEP 1: TOB の 強制適用',
        intro: [
          { speaker: '岩田 副社長', cls: 'sensei', charKey: 'mori', text: '一定割合 以上の 株を 取得する 場合は TOBが 強制される。' },
        ],
        puzzle: {
          prompt: '日本で TOBが 義務付けられる「3分の1ルール」 とは?',
          hint: '市場外で 多数の 株主から 株を 買う 場合、ある 割合を 超えると…',
          options: [
            '市場外取引 で 議決権の 5%超を 取得する 場合 TOB必須',
            '市場外 + 市場内取引 で 議決権の 1/3 (33.33%) 超を 取得する 場合 TOB必須',
            '議決権の 過半数を 一度に 取得する 場合のみ TOB必須',
            'TOBは 義務ではなく 任意',
          ],
          answer: 1,
          explanation: '金商法27条の2: 市場外取引などで 議決権の 1/3超を 取得する 場合 TOB強制 (3分の1ルール)。一般株主に 売却機会を 平等に 与える ため。違反すれば 取引無効·課徴金。',
        },
        clue: { title: '3分の1ルール', desc: '議決権 1/3超 取得 = TOB強制。一般株主の 平等保護。' },
      },
      // STEP 2: 防衛策
      {
        id: 'step2', type: 'mc',
        title: '🛡 STEP 2: 敵対的買収 防衛策',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'いきなり 買収されるのを 防ぐ 方法は あるの?' },
          { speaker: '岩田 副社長', cls: 'sensei', charKey: 'mori', text: '「ポイズンピル」 など 防衛策が ある。' },
        ],
        puzzle: {
          prompt: '「ポイズンピル」 (毒薬条項) の 仕組みは?',
          hint: '敵対的買収者の 持株比率を「希薄化」 させる 仕組み。',
          options: [
            '会社が 自社株を 大量に 買い戻す',
            '敵対的買収者 以外の 既存株主に 新株予約権を 大量発行し、買収者の 議決権比率を 希薄化',
            '会社の 重要資産を 売却する',
            '買収者を 訴訟で 妨害する',
          ],
          answer: 1,
          explanation: 'ポイズンピル = 敵対的買収者を 除く 既存株主に 新株予約権を 配り、行使させて 買収者の 比率を 強制希薄化 (例: 30% → 10%)。日本では「事前警告型」 が 多い。実行には 株主総会の 承認 など 厳しい 条件。',
        },
        clue: { title: 'ポイズンピル', desc: '新株予約権を 既存株主に 配り 買収者の 比率を 希薄化。事前警告型が 主流。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager1',
            text: '「議決権 5%取得まで TOBは 不要だし、ポイズンピルは 自社株を 買い戻すだけだから 簡単だ」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: 'TOB強制の 閾値と ポイズンピルの 仕組み、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 5%は 大量保有報告書の 閾値で、TOBは 1/3 (33%超)、② ポイズンピルは 新株予約権を 配る 仕組みで、自社株買戻しでは ない (両者は 全く 別の 防衛策)。M&A実務者なら 絶対 間違えない。',
        },
        clue: { title: '専門家詐欺', desc: 'M&A専門家を 名乗りながら TOB閾値も ポイズンピルも 両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'mna_lawyer', name: '黒田 M&A弁護士', icon: '⚖️', charKey: 'mina',
        role: '企業法務弁護士 (15年)',
        height: '180cm', clothes: 'スリーピーススーツ',
        specialty: 'M&A·会社法 (専門家)',
        alibi: '昨夜は 法律事務所で TOB 法的 手続書類を 作成していた。',
        testimony: '日本のM&Aは 1/3超でTOB強制、ポイズンピルは 新株予約権の 事前警告型が 主流。実務上の 細部まで 詳しい。',
      },
      {
        id: 'rival', name: '西原 ライバル商社の 部長', icon: '🥷', charKey: 'villager1',
        role: '競合商社のM&A担当 (5年)',
        height: '178cm', clothes: 'スーツ',
        specialty: '営業 (M&A法律は 浅い)',
        alibi: '昨夜は 出張先で 接待中 と 主張するが 確認できず。',
        testimony: '議決権 5%取得まで TOBは 不要だし、ポイズンピルは 自社株を 買い戻すだけだから 簡単だ。',
      },
      {
        id: 'ib_analyst', name: '林田 投資銀行アナリスト', icon: '📊', charKey: 'yamada',
        role: 'M&Aアドバイザリー (3年)',
        height: '170cm', clothes: 'スーツ',
        specialty: 'バリュエーション (法律は 弁護士に 任せる)',
        alibi: '昨夜は 自宅で 企業価値評価モデルを 作っていた。',
        testimony: '私は バリュエーション 担当で、法律の 細部は 弁護士の 黒田先生に 任せる。でも TOB価格の 妥当性は 検討した。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は M&Aに 詳しい「ふり」 を している\n② しかし TOB強制の 閾値 と ポイズンピルの 仕組み、両方 間違えた\n③ 容疑者:\n  ・黒田 弁護士: M&A専門家 (3分の1ルール·ポイズンピルを 正確に 知る)\n  ・西原 ライバル: 営業 (5%超でTOB·自社株買戻し と 二重に 誤解)\n  ・林田 アナリスト: バリュエーション専門·法律は 専門外を 自認',
      question: '機密漏洩・敵対的TOB を 仕掛けた 真犯人は 誰?',
      hint: 'M&A専門家を 装いながら 法律の 基本を 完全に 間違え、機密を 利用して 妨害した 人物は?',
      suspectIds: ['mna_lawyer', 'rival', 'ib_analyst'],
      answer: 'rival',
      explanation:
        '真犯人は 西原 部長!\n\n' +
        '【推理】\n' +
        '① 動機 = 競合商社が 中野工業を 先に 取りたい (敵対的TOBで 邪魔)\n' +
        '② 「5%でTOB」「ポイズンピル=自社株買戻し」 と 二重の 嘘で 法律を 都合よく 解釈\n' +
        '③ しかし TOB = 1/3超、ポイズンピル = 新株予約権 が 正解 → 法律 知識ゼロ\n' +
        '④ 黒田 弁護士は 正確、林田 アナリストは 専門外を 自認しつつ 真摯に 仕事\n' +
        '⑤ 西原は 機密協議書を 入手し 自社の 突然のTOBを 仕掛けて 友好的M&Aを 妨害\n\n' +
        'M&A法律の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🤝 M&A = Mergers & Acquisitions (合併·買収)',
      '📢 TOB = 株式公開買付け (Take-Over Bid)',
      '⚖ 3分の1ルール: 議決権 1/3超 取得 = TOB強制',
      '🛡 ポイズンピル = 新株予約権で 買収者の 比率を 希薄化',
      '🥷 敵対的買収 vs 友好的M&A の 違い',
    ]},
    note: { title: '第6事件 M&A妨害', desc: 'TOBと 敵対的買収防衛策を 学び、M&A法律の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第7事件: 🚀 スタートアップ 投資詐欺
  // ========================================
  {
    id: 7, icon: '🚀',
    title: 'スタートアップ 投資詐欺',
    subtitle: '消えた 出資金、偽装された バリュエーション!',
    theme: 'VC·バリュエーション·優先株',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[7],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京・六本木の コワーキングスペース。AIスタートアップ「ネクスト」 に VC (ベンチャーキャピタル) から 10億円が 出資された。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'しかし バリュエーション (企業価値) が 不当に 高く 算定され、VCの 出資金が 騙し取られた疑い!' },
      { speaker: 'VCパートナー 内藤さん', cls: 'sensei', charKey: 'yamada',
        text: 'ハル君、リオ君、調査を お願いする。私は ベンチャーキャピタルの パートナー、内藤だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '「バリュエーション」 って 何ですか?' },
      { speaker: '内藤さん', cls: 'sensei', charKey: 'yamada',
        text: '会社の 価値評価 = 株式の 価格。スタートアップは 売上が 少ないから「DCF」「類似会社比較」 など 専門的な 手法で 推定する。' },
      { speaker: '内藤さん', cls: 'sensei', charKey: 'yamada',
        text: '関係者 3人が 怪しい。みな VCの 専門家を 名乗るが、嘘を ついている 者が いる…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'VCと バリュエーションの 知識で、出資金を 騙し取った 真犯人を 暴きます!' },
    ],
    steps: [
      // STEP 1: pre-money / post-money
      {
        id: 'step1', type: 'mc',
        title: '💰 STEP 1: Pre-money と Post-money',
        intro: [
          { speaker: '内藤さん', cls: 'sensei', charKey: 'yamada', text: 'バリュエーションには 出資前と 出資後の 2種類が ある。' },
        ],
        puzzle: {
          prompt: 'Pre-money valuation 40億円の 会社に 10億円を 出資した 場合、VC の 持株比率は?',
          hint: 'Post-money = Pre-money + 出資額。比率 = 出資額 ÷ Post-money。',
          options: [
            '25% (10億 ÷ 40億)',
            '20% (10億 ÷ 50億)',
            '10% (10億 ÷ 100億)',
            '40% (40億 ÷ 100億)',
          ],
          answer: 1,
          explanation: 'Post-money = Pre-money 40億 + 出資 10億 = 50億。VC 持株比率 = 10億 ÷ 50億 = 20%。創業者は Pre-money分 (40億 = 80%) を 維持。Pre vs Postの 区別は VC実務の 基本中の 基本。',
        },
        clue: { title: 'バリュエーション計算', desc: 'Post-money = Pre-money + 出資額。VC比率 = 出資 ÷ Post-money。' },
      },
      // STEP 2: 優先株
      {
        id: 'step2', type: 'mc',
        title: '⭐ STEP 2: 優先株の 権利',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'VCは 普通株を 買うんですか?' },
          { speaker: '内藤さん', cls: 'sensei', charKey: 'yamada', text: 'いや、ほぼ「優先株」 だ。普通株より 強い 権利が ある。' },
        ],
        puzzle: {
          prompt: 'VC が 取得する 優先株 (種類株) の 権利として 「含まれない」 のは?',
          hint: '清算優先·参加権·転換権·議決権…一般的な 4つ。',
          options: [
            '清算優先権 (Liquidation Preference): 会社が 売却された 時 普通株より 先に 配当',
            '参加権 (Participation): 残余財産にも 参加',
            '転換権 (Conversion): IPO時に 普通株に 転換',
            '創業者の 経営権を 直接 奪う 権利',
          ],
          answer: 3,
          explanation: '優先株の 主な 権利 = ①清算優先権、②参加権、③転換権、④議決権、⑤反希薄化条項 など。創業者の 経営権を「直接 奪う」 権利は 通常の 優先株には ない (取締役指名権 などは あるが 別)。',
        },
        clue: { title: '優先株の 権利', desc: '清算優先·参加·転換·議決·反希薄化 が 一般。創業者の 経営権 直接奪取は 不可。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager3',
            text: '「Pre-money 40億で 10億 出資なら 持株は 10億÷40億 = 25%。優先株が あれば 創業者の 経営権を 奪える!」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: 'Pre/Postの 計算と 優先株の 権利、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 持株比率は Post-money で 計算 (10÷50=20%、25%ではない)、② 優先株では 創業者の 経営権を「直接奪う」 権利は ない。VC実務者なら 絶対 知る 基本。',
        },
        clue: { title: '専門家詐欺', desc: 'VC専門家を 名乗りながら バリュエーション計算と 優先株の 権利、両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'gp', name: '内藤 ジュニアパートナー', icon: '🚀', charKey: 'tanaka',
        role: 'ベンチャーキャピタリスト (8年)',
        height: '178cm', clothes: 'カジュアルジャケット',
        specialty: 'VC投資·バリュエーション (実務)',
        alibi: '昨夜は LP (出資者) との 投資委員会会議に 参加していた。',
        testimony: 'Pre-money + 出資額 = Post-money で 比率を 計算する 基本。優先株は 清算優先·参加·転換が 主な 権利。経営権の 直接奪取は できない。',
      },
      {
        id: 'founder_b', name: '篠原 創業社長', icon: '👨‍💼', charKey: 'villager3',
        role: 'スタートアップ CEO (3年)',
        height: '175cm', clothes: 'パーカー+ジャケット',
        specialty: 'プロダクト開発 (財務は 浅い)',
        alibi: '昨夜は VC の パーティーで 自分を アピールしていた。',
        testimony: 'Pre-money 40億で 10億 出資なら 持株は 10億÷40億 = 25%。優先株が あれば 創業者の 経営権を 奪える!',
      },
      {
        id: 'cfo_startup', name: '本田 CFO', icon: '📊', charKey: 'mori',
        role: '財務担当 (2年)',
        height: '168cm', clothes: 'スーツ',
        specialty: '財務 (VC契約は 学習中)',
        alibi: '昨夜は タームシートを 弁護士と 確認していた。',
        testimony: '私は VC契約は 学習中で、細部は 弁護士に 任せている。Pre/Postの 違いと 優先株は 重要だと 認識している。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は VC・バリュエーションに 詳しい「ふり」 を している\n② しかし Pre/Post計算と 優先株の 権利、両方 間違えた\n③ 容疑者:\n  ・内藤 GP: VC実務 (計算·優先株を 正確に 知る)\n  ・篠原 創業者: プロダクト中心 (Pre/Postと 優先株を 二重に 誤解)\n  ・本田 CFO: 「VC契約は 学習中」 と 自認',
      question: '出資金を 騙し取った 真犯人は 誰?',
      hint: 'VC専門家を 装いながら バリュエーション と 優先株の 基本を 両方 間違えた 人物は?',
      suspectIds: ['gp', 'founder_b', 'cfo_startup'],
      answer: 'founder_b',
      explanation:
        '真犯人は 篠原 創業社長!\n\n' +
        '【推理】\n' +
        '① 動機 = 自分の 持株比率を 高く 見せて VCから 高い バリュエーションで 出資を 引き出したい\n' +
        '② 「Pre-money 40億 = Post-money」 と 偽装し、VCの 比率を 25% (実際は 20%) と 誤魔化した\n' +
        '③ さらに「優先株で 経営権を 奪える」 と VCを 不安にさせ 議決権制限を 拒否\n' +
        '④ 内藤 GPは 正確、本田 CFOは 学習中を 自認しつつ 慎重\n' +
        '⑤ 篠原は バリュエーションを 偽って 不当に 多くの 出資を 集め、自分の 持ち分を 守りつつ お金を 騙し取った\n\n' +
        'VCバリュエーションの「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '💰 Pre-money valuation = 出資前の 企業価値',
      '💰 Post-money = Pre-money + 出資額',
      '🧮 VC持株比率 = 出資額 ÷ Post-money',
      '⭐ 優先株 = 清算優先·参加·転換·議決·反希薄化',
      '🚀 VC = LPから 集めた お金で スタートアップに 投資する 仕組み',
    ]},
    note: { title: '第7事件 VC投資詐欺', desc: 'VCバリュエーションと 優先株の 権利を 学び、VC実務の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第8事件: 🏭 サプライチェーン 寸断事件
  // ========================================
  {
    id: 8, icon: '🏭',
    title: 'サプライチェーン 寸断事件',
    subtitle: '消えた 半導体部品、止まった 工場!',
    theme: '仕入·在庫·下請法',
    country: '日本 🇯🇵',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[8],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '石川県・金沢の 半導体製造装置メーカー「シブヤ工業」。マイクロボールマウンタの 主要部品が 突如 不足し、生産が 止まった!' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '韓国の 大手代理店「チョンホICT」 への 納期も 危ない。サプライチェーンの どこかで 寸断が 起きた…' },
      { speaker: '購買部長 渋谷さん', cls: 'sensei', charKey: 'mori',
        text: 'ハル君、リオ君、来てくれて 助かる。私は シブヤ工業の 購買部長、渋谷だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '「サプライチェーン」 って 何ですか?' },
      { speaker: '渋谷部長', cls: 'sensei', charKey: 'mori',
        text: '原材料·部品·組立·販売まで 「物・お金・情報」 が 流れる 仕組みだ。半導体は 何百もの 下請け企業が 連鎖していて、1社でも 止まれば 全体が 止まる。' },
      { speaker: '渋谷部長', cls: 'sensei', charKey: 'mori',
        text: '関係者 3人が 怪しい。みな 製造業の 知識を 自慢するが、本当の 専門家は 誰なのか…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '在庫管理と 下請法の 知識で、サプライチェーンを 寸断した 真犯人を 暴きます!' },
    ],
    steps: [
      // STEP 1: 在庫管理 - JIT vs 安全在庫
      {
        id: 'step1', type: 'mc',
        title: '📦 STEP 1: 在庫管理の 基本',
        intro: [
          { speaker: '渋谷部長', cls: 'sensei', charKey: 'mori', text: '日本の 製造業は「JIT (ジャスト・イン・タイム)」 で 在庫を 最小化する 文化が 強い。' },
        ],
        puzzle: {
          prompt: 'JIT (Just-In-Time) 方式 と 安全在庫 (Safety Stock) について 正しい 説明は?',
          hint: 'JITは トヨタが 確立。コロナ・地震 等 の 危機後、安全在庫を 増やす 動きが 主流。',
          options: [
            'JITは 在庫ゼロが 理想で、危機にも 強い 万能 方式',
            'JITは 効率的だが 災害·輸送停止 で 弱く、安全在庫との バランスが 重要',
            '安全在庫は 余分な コストで、現代の 製造業では 完全に 廃止された',
            'JIT と 安全在庫は 同じ 概念',
          ],
          answer: 1,
          explanation: 'JIT (トヨタ生産方式) は 在庫コスト 最小化に 優れるが、自然災害·パンデミック·地政学リスクで サプライチェーンが 寸断されると 即停止。コロナ後 多くの 企業が 重要部品で 安全在庫を 戻し、JIT+安全在庫の ハイブリッドが 主流に。',
        },
        clue: { title: '在庫戦略', desc: 'JIT = 効率重視、安全在庫 = リスク対策。コロナ後は ハイブリッドが 主流。' },
      },
      // STEP 2: 下請法
      {
        id: 'step2', type: 'mc',
        title: '⚖ STEP 2: 下請法の 規制',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '大企業が 下請けに 無理な 注文を 出すのは 合法ですか?' },
          { speaker: '渋谷部長', cls: 'sensei', charKey: 'mori', text: 'いや、「下請法」 (下請代金支払遅延等防止法) で 厳しく 禁止されている。' },
        ],
        puzzle: {
          prompt: '下請法上、親事業者 (発注側) に 禁止されている 行為として 含まれない のは?',
          hint: '「受領拒否·支払遅延·減額·返品·買いたたき」 等が 主な 禁止行為。',
          options: [
            '受領拒否 (注文した 物を 受け取らない)',
            '下請代金の 支払遅延 (60日超)',
            '減額·買いたたき (一方的に 値下げ)',
            '下請けに 適正な 利益を 払うこと',
          ],
          answer: 3,
          explanation: '下請法11条の 禁止行為: ①受領拒否 ②支払遅延 (60日以内が 原則) ③減額 ④返品 ⑤買いたたき ⑥購入強制 ⑦報復措置 ⑧有償支給原材料の 早期決済 ⑨割引困難手形 ⑩経済上の 利益供与要請 ⑪不当な 給付内容変更·やり直し。「適正な 利益を 払うこと」 は むしろ 正しい 行為。違反時は 公正取引委員会の 勧告·課徴金。',
        },
        clue: { title: '下請法 11の 禁止行為', desc: '受領拒否·支払遅延·減額·返品·買いたたき が 中心。違反は 公取委が 監督。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「JITなら 在庫ゼロで リスクも ゼロ。下請けには 急に 値下げを 要求しても 法律問題 ない!」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: 'JITの リスクと 下請法の 規制、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① JITは 災害·物流停止 等で リスク高 (コロナで 証明された)、② 下請けへの 一方的な 値下げ要求 (買いたたき·減額) は 下請法違反。製造業の 実務者なら 絶対 知る 基本。',
        },
        clue: { title: '専門家詐欺', desc: '製造業に 詳しい と 名乗りながら JITリスクと 下請法、両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'shibuya_engineer', name: '島崎 製造部長', icon: '🔧', charKey: 'mori',
        role: '製造部 (18年)',
        height: '175cm', clothes: '作業服',
        specialty: 'マイクロボールマウンタ製造·下請管理',
        alibi: '昨夜は 工場で 復旧作業を 指揮していた。',
        testimony: 'JITは 効率的だが 万能ではない。半導体は 安全在庫を 持つ。下請法も 当然 守る、適正価格で 発注する。',
      },
      {
        id: 'cost_cutter', name: '林田 コストカット 部長', icon: '💰', charKey: 'mystery',
        role: '購買コスト削減担当 (4年)',
        height: '180cm', clothes: 'スーツ',
        specialty: 'コスト削減 (法律・実務は 浅い)',
        alibi: '昨夜は 自宅で 来期の コスト計画を 作成していた と 主張。',
        testimony: 'JITなら 在庫ゼロで リスクも ゼロ。下請けには 急に 値下げを 要求しても 法律問題 ない!',
      },
      {
        id: 'logistics', name: '川崎 物流担当', icon: '🚚', charKey: 'villager4',
        role: '物流·配送調整 (6年)',
        height: '172cm', clothes: '事務服',
        specialty: '物流·輸送 (在庫·法律は 専門外)',
        alibi: '昨夜は 緊急配送の 手配で 物流センターに いた。',
        testimony: '私は 物流が 専門で 在庫戦略や 下請法は 詳しくない。でも 部品が 来ない 時の 対応は 何度も 経験している。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は 製造業に 詳しい「ふり」 を している\n② しかし JITの リスク と 下請法、両方 間違えた\n③ 容疑者:\n  ・島崎 製造部長: 実務経験豊富 (JIT+安全在庫·下請法を 正確に 知る)\n  ・林田 コスト部長: 「JIT=ゼロリスク」「値下げ要求OK」 と 二重に 誤解\n  ・川崎 物流: 「在庫戦略·法律は 専門外」 と 自認',
      question: 'サプライチェーンを 寸断した 真犯人は 誰?',
      hint: '製造業を 装いながら JITリスクと 下請法を 両方 誤った、過度の コスト削減に 走った 人物は?',
      suspectIds: ['shibuya_engineer', 'cost_cutter', 'logistics'],
      answer: 'cost_cutter',
      explanation:
        '真犯人は 林田 コストカット部長!\n\n' +
        '【推理】\n' +
        '① 動機 = コスト削減 KPI のため、安全在庫を ゼロに 削り、下請けに 一方的な 値下げを 強要\n' +
        '② 「JITで リスクゼロ」 と 思い込み 安全在庫を 廃止 → 1社が 止まると 全体が 寸断\n' +
        '③ さらに 下請けに 法律違反の 買いたたき → 信頼関係 破壊で 部品供給ストップ\n' +
        '④ 島崎 製造部長は JIT+安全在庫の バランスを 守り、下請けに 適正価格で 発注\n' +
        '⑤ 川崎 物流は 専門外を 自認、現場対応に 集中\n' +
        '⑥ 林田の 短期コスト主義が サプライチェーンを 自滅させた\n\n' +
        '在庫戦略と 下請法の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🏭 JIT (ジャスト・イン・タイム) = トヨタ生産方式、在庫最小化',
      '⚠ JIT の 弱点 = 災害·パンデミック·地政学リスクで 寸断',
      '📦 安全在庫 = リスク対策の 余分な 在庫 (コロナ後 復活)',
      '⚖ 下請法 = 親事業者の 11の 禁止行為 (買いたたき·減額·支払遅延 等)',
      '🇯🇵 下請法 監督機関 = 公正取引委員会',
    ]},
    note: { title: '第8事件 サプライチェーン', desc: '在庫戦略と 下請法を 学び、製造業実務の「正確さ」 で 真犯人を 暴いた。シブヤ工業·チョンホICT が 舞台 (ハルの 父の 仕事 領域)。' },
  },

  // ========================================
  // 第9事件: 🌍 国際企業の 税金回避事件
  // ========================================
  {
    id: 9, icon: '🌍',
    title: '国際企業の 税金回避事件',
    subtitle: '消えた 利益、ケイマン諸島の 影!',
    theme: '移転価格·タックスヘイブン·OECD',
    country: '国際 🌍',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[9],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '日本の 大手IT企業「グローバルテック」。日本での 売上は 1000億円。利益は 出ているはず なのに 法人税の 納付額が 異常に 少ない!' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '国税局が 動いた。利益を ケイマン諸島の 子会社に「移転」 した 疑いだ!' },
      { speaker: '国税調査官 高山さん', cls: 'sensei', charKey: 'mina',
        text: 'ハル君、リオ君、国際租税の 専門調査に 協力 ありがとう。私は 国税局の 国際監査担当、高山だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '「タックスヘイブン」 って 何ですか?' },
      { speaker: '高山さん', cls: 'sensei', charKey: 'mina',
        text: '法人税が 極端に 低いか ゼロの 国・地域。ケイマン諸島·バミューダ·バージン諸島 等。多国籍企業が 利益を そこに 移して 租税を 回避する 問題が 世界的に 議論されている。' },
      { speaker: '高山さん', cls: 'sensei', charKey: 'mina',
        text: '関係者 3人が 怪しい。みな 国際税務の 専門家を 名乗るが…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '移転価格と OECD ルールの 知識で、租税回避の 真犯人を 暴きます!' },
    ],
    steps: [
      // STEP 1: 移転価格税制
      {
        id: 'step1', type: 'mc',
        title: '💱 STEP 1: 移転価格 (Transfer Pricing)',
        intro: [
          { speaker: '高山さん', cls: 'sensei', charKey: 'mina', text: '関連企業間の 取引価格は 第三者間の「独立企業間価格」 で なければ ならない。' },
        ],
        puzzle: {
          prompt: '日本企業が ケイマンの 子会社に サービスを 提供する 場合、価格は どう 決めるべき?',
          hint: '「アームズ・レングス原則」 (Arm\'s Length Principle) が キーワード。',
          options: [
            '本社が 一方的に 決められる (グループ内なので 自由)',
            '独立した 第三者間で 取引する 場合の 価格 (独立企業間価格)',
            'ケイマンの 法人税率に 合わせて 決める',
            '常に ゼロでよい (グループ内取引だから)',
          ],
          answer: 1,
          explanation: '移転価格税制 (措置法66の4) = 関連企業間取引でも「独立企業間価格 (Arm\'s Length Price)」 で 行わなければ ならない。比較対象取引法·原価基準法·再販売価格基準法 等で 算定。違反時は 国税局が 価格を「再計算」 して 課税。',
        },
        clue: { title: '移転価格', desc: '関連企業間でも「独立企業間価格」 が 義務。アームズ・レングス原則。' },
      },
      // STEP 2: BEPS (OECD)
      {
        id: 'step2', type: 'mc',
        title: '🌐 STEP 2: BEPS と 最低法人税率',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '世界的に タックスヘイブンを 防ぐ ルールは あるんですか?' },
          { speaker: '高山さん', cls: 'sensei', charKey: 'mina', text: 'OECD・G20が 主導する「BEPS」 と「グローバル最低法人税」 が 進行中だ。' },
        ],
        puzzle: {
          prompt: 'OECD・G20 が 2021年に 合意した「グローバル最低法人税率」 は 何%?',
          hint: '主要国が「これ より 低い 国に 利益を 移しても 結局 課税する」 と 決めた 率。',
          options: [
            '5%',
            '10%',
            '15%',
            '25%',
          ],
          answer: 2,
          explanation: 'OECD・G20が 2021年合意・2024年から 段階導入の「グローバル最低法人税率 (Pillar 2)」 = 15%。多国籍企業 (連結売上 7.5億ユーロ超) が タックスヘイブンに 利益を 移しても、本国が 不足分 (15% との 差) を 課税できる 仕組み。BEPS = Base Erosion and Profit Shifting (税源浸食と 利益移転) 対策。',
        },
        clue: { title: 'グローバル最低法人税', desc: '15% 最低税率 (OECD・G20、2024年~)。タックスヘイブン回避策。' },
      },
      // STEP 3: 容疑者の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 容疑者の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「グループ内取引なら 価格は 自由。グローバル最低税率は 5%だから ケイマン (法人税ゼロ) でも セーフ!」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違っている のは いくつ?',
          hint: '移転価格と グローバル最低税率、両方 確認しよう。',
          options: [
            '間違いは ない',
            '1つ 間違い',
            '2つ 間違い',
            '判断できない',
          ],
          answer: 2,
          explanation: '2つも 間違い! ① 関連企業間でも 独立企業間価格 が 義務 (自由ではない)、② グローバル最低税率は 15% (5%ではない)。国際税務の 専門家なら 絶対 知る 基本。',
        },
        clue: { title: '専門家詐欺', desc: '国際税務に 詳しい と 名乗りながら 移転価格と 最低税率、両方 間違えた 人物が いる!' },
      },
    ],
    suspects: [
      {
        id: 'tax_director', name: '吉本 国際税務部長', icon: '⚖️', charKey: 'yamada',
        role: '国際税務担当 (15年)',
        height: '178cm', clothes: 'スリーピーススーツ',
        specialty: '国際租税·移転価格',
        alibi: '昨夜は OECD会合の 資料を 読んでいた。',
        testimony: '関連企業間でも 独立企業間価格が 義務。グローバル最低税率は 15%。BEPS対策で タックスヘイブンの 抜け道は 塞がれつつある。',
      },
      {
        id: 'tax_consultant', name: '黒岩 自称・税務コンサルタント', icon: '💼', charKey: 'mystery',
        role: '個人コンサル (2年)',
        height: '180cm', clothes: '高級スーツ',
        specialty: '節税アドバイス (実は 知識が 浅い)',
        alibi: 'ケイマンの「法律事務所」 と Zoom会議していた と 主張するが 記録なし。',
        testimony: 'グループ内取引なら 価格は 自由。グローバル最低税率は 5%だから ケイマン (法人税ゼロ) でも セーフ!',
      },
      {
        id: 'cfo_global', name: '田所 CFO', icon: '📊', charKey: 'villager2',
        role: '財務CFO (5年)',
        height: '175cm', clothes: 'スーツ',
        specialty: '財務 (国際税務は 専門家に 委ねる)',
        alibi: '昨夜は 監査法人と 決算会議に 参加していた。',
        testimony: '国際税務は 吉本部長と 大手会計事務所に 任せている。私は 詳細は 把握しないが、コンプライアンスを 守るよう 指示は している。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 容疑者は 国際税務に 詳しい「ふり」 を している\n② しかし 移転価格と グローバル最低税率、両方 間違えた\n③ 容疑者:\n  ・吉本 部長: 国際税務 (移転価格·BEPS·15%を 正確に 知る)\n  ・黒岩 コンサル: 「価格自由·5%」 と 二重の 嘘\n  ・田所 CFO: 「税務は 専門家に 委ねる」 と 自認',
      question: '租税回避を 主導した 真犯人は 誰?',
      hint: '国際税務を 装いながら 移転価格と 最低税率を 両方 間違え、ケイマンへ 利益を 流出させた 人物は?',
      suspectIds: ['tax_director', 'tax_consultant', 'cfo_global'],
      answer: 'tax_consultant',
      explanation:
        '真犯人は 黒岩 自称コンサル!\n\n' +
        '【推理】\n' +
        '① 動機 = 「節税スキーム」 を 高額で 売り、ケイマンの 仲介手数料も 取る\n' +
        '② 「グループ内取引は 価格自由」「最低税率 5%」 と 二重の 嘘で CFOを 騙した\n' +
        '③ 実際は 移転価格は 独立企業間価格義務、最低税率は 15%\n' +
        '④ 吉本部長は 正確、田所 CFOは 専門家委任を 自認 (黒岩を 信じてしまった)\n' +
        '⑤ 黒岩は 怪しい 経歴で 経営層の 「節税したい」 心理を 利用、違法スキームを 仕掛けた\n' +
        '⑥ 結果、国税局が 移転価格税制で 課税し、追徴・延滞税で 数倍の 損失\n\n' +
        '国際租税の「正確さ」 が 真犯人を 暴いた 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '💱 移転価格税制 = 関連企業間も「独立企業間価格」 義務',
      '🌐 BEPS = OECD/G20の 国際租税対策フレームワーク',
      '⚖ グローバル最低法人税 = 15% (Pillar 2、2024年~段階導入)',
      '🏝 タックスヘイブン例 = ケイマン諸島·バミューダ·バージン諸島',
      '⚠ 違法な 租税回避 = 国税局が 課税·追徴·延滞税',
    ]},
    note: { title: '第9事件 国際租税', desc: '移転価格税制と グローバル最低税率を 学び、国際租税の「正確さ」 で 真犯人を 暴いた。' },
  },

  // ========================================
  // 第10事件 (보스): 🏢 巨大コングロマリットの 崩壊
  // ========================================
  {
    id: 10, icon: '🏢',
    title: '巨大コングロマリットの 崩壊',
    subtitle: '1~9事件の 真の 黒幕!',
    theme: 'ビジネスの 集大成',
    country: '世界 🌐',
    bgm: 'sci_chem',
    illustration: BIZ_CASE_IMAGES[10],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京・大手町。創業100年の 巨大コングロマリット「東京グループ」。家族会社·IT·金融·製造·国際取引 すべての 事業を 抱える 帝国。' },
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'しかし この グループで 1~9事件 すべてが 起きていた! 後継者争い、機密漏洩、粉飾、株価操作、上場詐欺、M&A妨害、VC詐欺、サプライチェーン破壊、租税回避…' },
      { speaker: '社外取締役 山口さん', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、最終調査を お願いする。私は 東京グループの 社外取締役、山口だ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '全部の 事件が 1つの グループで 起きてたんだ!' },
      { speaker: '山口さん', cls: 'sensei', charKey: 'ojiisan',
        text: '誰かが グループ全体を 私物化し 崩壊させようとしている。3人の 役員が 怪しい。会社法・金商法・租税法 の すべてに 詳しい と 言うが、本物の 専門家は 1人だけだ。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '今までの 9事件で 学んだ ビジネス・法律 すべての 知識を 使って、真の 黒幕を 暴きます!' },
    ],
    steps: [
      // STEP 1: 9事件の 共通点
      {
        id: 'step1', type: 'mc',
        title: '🔍 STEP 1: 9事件の 共通パターン',
        intro: [
          { speaker: '山口さん', cls: 'sensei', charKey: 'ojiisan', text: '9事件の 真犯人 全員に 共通する パターンが ある。' },
        ],
        puzzle: {
          prompt: '1~9事件の 真犯人 全員に 共通する 特徴は?',
          hint: '全員「専門家のふり」 を しながら…',
          options: [
            '全員 真の 専門家だった',
            '全員「専門家のふり」 を しながら 法律の 基本を 2つ 以上 同時に 間違えた',
            '全員 偶然の 巻き込まれ',
            '全員 同じ 国の 出身',
          ],
          answer: 1,
          explanation: '9事件の 真犯人 全員: ①隆 (相続+議決権) ②小林 (営業秘密+特許) ③伊藤 (P/L+売掛金) ④佐々木 (利益額+公表) ⑤若林 (監査+ロックアップ) ⑥西原 (TOB+ピル) ⑦篠原 (Pre/Post+優先株) ⑧林田 (JIT+下請法) ⑨黒岩 (移転価格+最低税率)。全員が 法律・実務の 基本を 同時に 2つ 以上 誤った 偽専門家。黒幕が 偽専門家を 操って 各分野を 攻撃。',
        },
        clue: { title: '9事件の 真犯人 共通点', desc: '全員「専門家のふり」 を しながら 法律基本を 2つ 以上 同時に 誤った 偽者。' },
      },
      // STEP 2: コングロマリット崩壊の メカニズム
      {
        id: 'step2', type: 'mc',
        title: '💀 STEP 2: 大企業崩壊の 連鎖',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '一つの グループで これだけ 事件が 起きると どう なるんですか?' },
          { speaker: '山口さん', cls: 'sensei', charKey: 'ojiisan', text: '実際の 大企業崩壊では 連鎖が 起きる。リーマン・東芝・エンロン 等が 教訓。' },
        ],
        puzzle: {
          prompt: '大企業が 突然 崩壊する 場合の 典型的な 連鎖は?',
          hint: '不正発覚 → 信用低下 → 資金繰り → 株価 → 連鎖。',
          options: [
            '突然 倒産する だけで、連鎖は ない',
            '不正発覚 → 株価暴落 → 信用格付け 低下 → 資金繰り 悪化 → 取引先 連鎖倒産',
            '株価が 上がり 続ける',
            '社長が 交代するだけで すぐ 復活する',
          ],
          answer: 1,
          explanation: '大企業崩壊の 典型的連鎖: ①不正発覚 (粉飾・違法行為) ②株価暴落 ③信用格付け (S&P・Moody\'s) 引き下げ ④資金調達コスト 上昇 ⑤資金繰り 悪化 ⑥取引先・下請けの 連鎖倒産 ⑦社員・地域経済 への 波及。リーマン (2008年)、東芝 (2015年粉飾)、エンロン (2001年) 等が 実例。',
        },
        clue: { title: '崩壊の 連鎖', desc: '不正発覚→株価→格付け→資金繰り→取引先連鎖。リーマン·東芝·エンロンの 教訓。' },
      },
      // STEP 3: 黒幕の モ盾
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 黒幕の 言葉',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者の 1人が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'mystery',
            text: '「私は ビジネスの 全方位プロ。普通決議は 1/4、営業秘密は 特許登録が 必要、売上=現金、TOBは 5%超、最低法人税は 5%だ」' },
        ],
        puzzle: {
          prompt: 'この 発言で 間違って いるのは いくつ?',
          hint: '事件 1·2·3·6·9を 振り返ろう。',
          options: [
            '0個 (全部 正しい)',
            '2個 間違い',
            '4個 間違い',
            '5個 全部 間違い',
          ],
          answer: 3,
          explanation: '5つ 全部 間違い! ① 普通決議は 過半数 (1/4ではない、事件1)、② 営業秘密に 特許登録 不要 (事件2)、③ 売上 ≠ 現金 (売掛金で タイムラグ、事件3)、④ TOBは 1/3超 (5%は 大量保有報告書、事件6)、⑤ グローバル最低法人税は 15% (5%ではない、事件9)。すべて 9事件で 学んだ 基本。本物の 専門家なら 絶対 1つも 間違えない。',
        },
        clue: { title: '黒幕の 正体', desc: '5つ すべての 法律・実務基本を 誤った = 全方位プロを 装う 完全な 偽者!' },
      },
    ],
    suspects: [
      {
        id: 'curator_b', name: '北山 弁護士・社外取締役', icon: '⚖️', charKey: 'tanaka',
        role: '企業法務・社外取締役 (25年)',
        height: '178cm', clothes: 'スリーピーススーツ',
        specialty: '会社法·金商法·国際租税の 全方位 (本物)',
        alibi: '昨夜は 監査委員会で 9事件の レポートを 確認していた。',
        testimony: '私は 企業法務 25年、9事件 すべての 法律・実務に 関与してきた。普通決議·営業秘密·P/L·インサイダー·監査·TOB·VC·下請法·移転価格、全て 正確に 説明できる。',
      },
      {
        id: 'kingpin_b', name: '松井 自称・経営の 神様', icon: '💼', charKey: 'mystery',
        role: '東京グループ 役員 (経歴不明)',
        height: '182cm', clothes: 'ブランド スーツ',
        specialty: 'ビジネス全般 を 自称 (実は 詐欺師)',
        alibi: '昨夜は どこに いたか 不明 (秘書も 知らない)',
        testimony: '私は ビジネスの 全方位プロ。普通決議は 1/4、営業秘密は 特許登録が 必要、売上=現金、TOBは 5%超、最低法人税は 5%だ。',
      },
      {
        id: 'specialist_b', name: '安藤 専門役員', icon: '📊', charKey: 'mina',
        role: '経理財務 限定 (10年)',
        height: '170cm', clothes: 'スーツ',
        specialty: '経理 (法律・国際は 専門家委任)',
        alibi: '昨夜は 経理部で 月次決算を 締めていた。',
        testimony: '私は 経理財務に 限定した 専門家。会社法·金商法·国際租税は 弁護士・税理士に 委ねる。自分の 専門外を 知ったかぶりは しない。',
      },
    ],
    finalQ: {
      prompt: '🔍 9事件の 集大成!\n\n📌 手がかり:\n① 黒幕は「ビジネス全方位プロ」 を 装っている\n② しかし 9事件で 学んだ 法律・実務基本を 5つ すべて 同時に 間違えた\n③ 容疑者:\n  ・北山 弁護士: 25年実務 (9分野すべて 正確)\n  ・松井 自称神様: 5つ すべて 誤り·経歴不明·アリバイなし\n  ・安藤 経理役員: 「専門外は 委ねる」 と 自認\n\n💡 9事件の 真犯人 全員 共通: 「専門家を 装って 基本を 同時に 2つ 以上 誤る」。黒幕も 同じ パターンの 究極形。',
      question: '東京グループ 崩壊を 主導する 真の 黒幕は 誰?',
      hint: 'ビジネス全方位を 装いながら 9事件の 基本を 5つ すべて 同時に 誤った 人物は?',
      suspectIds: ['curator_b', 'kingpin_b', 'specialist_b'],
      answer: 'kingpin_b',
      explanation:
        '真の 黒幕は 松井 自称・経営の神様!\n\n' +
        '【推理】\n' +
        '① 動機 = 東京グループを 内側から 崩壊させ 大株主から 株を 安値で 集め 個人で 支配したい (敵対的 内部買収)\n' +
        '② 9人の 偽専門家 (隆·小林·伊藤·佐々木·若林·西原·篠原·林田·黒岩) を 各事業部に 配置·扇動\n' +
        '③ 自身も「全方位プロ」 を 装い 役員会を 操ったが、9事件 すべての 法律基本を 5つ 同時に 誤る ことで 偽者 露呈\n' +
        '④ 北山 弁護士 (社外取締役) は 25年実務で 9分野 全て 正確、安藤は 専門外を 自認\n' +
        '⑤ 松井は 経歴不明·アリバイなし·ブランド服で 装うだけ、知識ゼロの 詐欺師\n' +
        '⑥ 9事件の 真犯人 全員と 同じ パターン (偽専門家·基本同時誤り) の 究極形\n\n' +
        'ハル·リオの 1~9事件で 学んだ 全ての ビジネス・法律 知識を 集大成し、コングロマリット崩壊を 仕掛けた 黒幕を 暴いた、最終 集大成事件!',
    },
    learned: { title: '📚 この 事件で 学んだこと (集大成)', points: [
      '🏯 会社法 (株主総会·議決権·相続)',
      '🔒 不正競争防止法 (営業秘密·NDA)',
      '📑 会計 (P/L·B/S·C/F·粉飾決算)',
      '📈 金商法 (インサイダー·TOB·公表)',
      '🎩 IPO·監査 (4種監査意見·ロックアップ)',
      '🤝 M&A (TOB·ポイズンピル·防衛策)',
      '🚀 VC実務 (Pre/Post-money·優先株)',
      '🏭 製造業 (JIT·安全在庫·下請法)',
      '🌍 国際租税 (移転価格·BEPS·15%最低税率)',
      '🔍 「偽専門家」 を 見抜く 力 = ビジネス推理の 基本',
    ]},
    note: { title: '第10事件 ボス・コングロマリット崩壊', desc: '1~9事件の 全ての ビジネス・法律 知識を 集大成し、東京グループの 黒幕を 暴いた 最終事件。' },
  },

];

