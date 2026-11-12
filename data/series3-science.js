// ============================================================
// 시리즈 3 🔬 科学探偵 (SCIENCE_STORY + SCI_CASE_IMAGES + SCI_CHARS)
// 원본 index.html 라인 9571 ~ 11143
// 분할 v73 (모듈화)
// ============================================================
// ============================================================
// ============================================================
// 🔬 科学探偵 일러스트 base64 (v33)
// ============================================================
const SCI_CASE_IMAGES = {};
SCI_CASE_IMAGES[1] = 'assets/img/series3-science/sci_case_images_1.webp';
SCI_CASE_IMAGES[2] = 'assets/img/series3-science/sci_case_images_2.webp';
SCI_CASE_IMAGES[3] = 'assets/img/series3-science/sci_case_images_3.webp';
SCI_CASE_IMAGES[4] = 'assets/img/series3-science/sci_case_images_4.webp';
SCI_CASE_IMAGES[5] = 'assets/img/series3-science/sci_case_images_5.webp';
SCI_CASE_IMAGES[6] = 'assets/img/series3-science/sci_case_images_6.webp';
SCI_CASE_IMAGES[7] = 'assets/img/series3-science/sci_case_images_7.webp';
SCI_CASE_IMAGES[8] = 'assets/img/series3-science/sci_case_images_8.webp';
SCI_CASE_IMAGES[9] = 'assets/img/series3-science/sci_case_images_9.webp';
SCI_CASE_IMAGES[10] = 'assets/img/series3-science/sci_case_images_10.webp';

// v37: SCI_CHARS는 기존 CHAR_IMAGES 재사용 (기존 스토리와 동일한 이미지)
// CHAR_IMAGES는 위쪽에 정의됨
let SCI_CHARS = null; // 초기화는 아래에서 (CHAR_IMAGES 참조용)

// 🔬 科学탐정 시리즈 - 새로운 추리 시스템 (v31)
// ============================================================
// 각 장 구조:
//   id, icon, title, subtitle, theme, scene
//   intro: [...] (도입부 대사)
//   steps: [...] (다단계 퍼즐)
//   suspects: [...] (용의자들)
//   finalQ: { ... } (최종 추리 - 진범 + 이유)
//   learned: { title, content } (이 장에서 배운 것)
//   note: 메모
// ============================================================

SCI_CHARS = CHAR_IMAGES;

const SCIENCE_STORY = [
  // ========================================
  // 第1事件: 消えた 元素サンプル
  // ========================================
  {
    id: 1, icon: '⚗️',
    title: '消えた 元素サンプル',
    subtitle: '化学研究室の 不可解な 盗難事件',
    theme: '化学・元素',
    scene: 'chemLab',
    bgm: 'sci_chem',
    illustration: SCI_CASE_IMAGES[1],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京 大学の 化学研究室。世界的に 有名な 中村 教授の 研究室で 事件が 起きた。' },
      { speaker: '中村 教授', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、来てくれてありがとう。実は 貴重な 元素サンプルが 一つ 消えてしまったんだ。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '元素サンプルですか?どんな 元素だったんですか?' },
      { speaker: '中村 教授', cls: 'sensei', charKey: 'ojiisan',
        text: 'それが 分からないんだ…保管庫の ラベルも 一緒に 持って行かれたから。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'えー、犯人 ずるい!お兄ちゃん 解こう!' },
      { speaker: '中村 教授', cls: 'sensei', charKey: 'ojiisan',
        text: '研究員は 3人。みんな この建物に いた。でも、誰が 盗んだか 分からないんだ。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'まずは 現場を 調べてみましょう。' },
    ],

    steps: [
      // ===== STEP 1: 現場調査 (1차 단서) =====
      {
        id: 'step1',
        type: 'cipher',
        title: '🔍 STEP 1: 現場の メモ',
        scene: 'chemLab',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '保管庫の そばに 紙きれが 落ちている…' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '何か 書いてあるよ! 「Au 79 79.0」 ?' },
        ],
        puzzle: {
          prompt: '紙には 「Au 79 79.0」 と 書かれていた。これは 何を 表している?',
          hint: '元素の 周期表を 思い出そう。Au は 元素記号、79 は 原子番号、79.0は…?',
          options: [
            '銀の 化学式',
            '金 (Au) の 情報',
            '水銀 の 情報',
            '鉄 の 情報',
          ],
          answer: 1,
          explanation: 'Au (アウルム) は 金の 元素記号。原子番号 79、原子量 約 197 (実は197が正しいが、犯人が 間違えた!)。',
        },
        clue: {
          title: '紙きれ',
          desc: '「Au 79 79.0」 と 書かれた メモ。盗まれたのは 金の サンプル。原子量が 間違っている (正しくは 197)。',
        },
      },

      // ===== STEP 2: 専門知識 (외부 지식 필요) =====
      {
        id: 'step2',
        type: 'mc',
        title: '🧪 STEP 2: 元素の 知識',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '金の 原子量を 間違えた…これは 重要な 手がかりだ。' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'どういうこと?' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'プロの 化学者なら 絶対 間違えない 数字。犯人は…' },
        ],
        puzzle: {
          prompt: '金 (Au) の 正しい 原子量は 約 197。メモには 79 と 書かれていた。なぜ 犯人は 79 と 書いた?',
          hint: '79 は 別の 数字と 混同しやすい。表の 中で 見ると…',
          options: [
            '原子番号 (79) と 原子量 (197) を 混同した',
            '計算間違いを した',
            'わざと 嘘の 情報を 残した',
            '金ではなく 別の 元素だった',
          ],
          answer: 0,
          explanation: '原子番号(79)と 原子量(197)を 混同するのは 化学を 専門としない 人。犯人は 化学の 深い 知識を 持っていない。',
        },
        clue: {
          title: '推理メモ',
          desc: '犯人は 化学の 深い 専門知識を 持たない。化学者でない 可能性が 高い。',
        },
      },

      // ===== STEP 3: 시간 추리 =====
      {
        id: 'step3',
        type: 'mc',
        title: '⏰ STEP 3: 時刻の 推理',
        intro: [
          { speaker: '中村 教授', cls: 'sensei', charKey: 'ojiisan', text: '保管庫が 開けられた のは、ロックの 記録から 午後 3時 〜 4時の 間だ。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'その 時間帯、研究員たちは どこに いたんですか?' },
        ],
        puzzle: {
          prompt: '監視カメラの 記録によると、午後 3時 14分 に 化学研究室の 廊下で 一人の 人物が 目撃された。\n\n身長は 高め、白い 上着を 着ていた。',
          hint: '身長が 高い 人は 誰?上着の 色も ヒント。',
          options: [
            '田中 さん (身長 165cm、青い 上着)',
            '鈴木 さん (身長 178cm、白い 上着)',
            '佐藤 さん (身長 160cm、白い 上着)',
            '不明 (情報が 不足)',
          ],
          answer: 1,
          explanation: '身長 178cm + 白い 上着 = 鈴木 さん。ただし、この 人物が 必ずしも 犯人とは 限らない (まだ 確定 できない)。',
        },
        clue: {
          title: '目撃情報',
          desc: '午後3時14分、化学研究室の 廊下で 鈴木さんに 似た 人物 (身長178cm、白い 上着) が 目撃された。',
        },
      },
    ],

    // ===== 용의자 =====
    suspects: [
      {
        id: 'tanaka',
        name: '田中 さん',
        icon: '👨‍🔬', charKey: 'tanaka',
        role: '化学研究員 (15年目)',
        height: '165cm',
        clothes: '青い 上着',
        specialty: '塩化ナトリウム',
        alibi: '午後 3時 〜 4時、論文を 読みに 図書館に いた。',
        testimony: '私は 塩化ナトリウムの 研究員。金には 興味が ない。',
      },
      {
        id: 'suzuki',
        name: '鈴木 さん',
        icon: '👨‍💼', charKey: 'villager3',
        role: '研究助手 (3年目)',
        height: '178cm',
        clothes: '白い 上着',
        specialty: '研究のサポート (専門家ではない)',
        alibi: '午後 3時 〜 4時、研究室の 隣の カフェテリアに いた。',
        testimony: '私は カフェテリアで コーヒーを 飲んでいた。化学研究室には 行っていない。',
      },
      {
        id: 'sato',
        name: '佐藤 さん',
        icon: '👩‍🔬', charKey: 'villager4',
        role: '化学研究員 (10年目)',
        height: '160cm',
        clothes: '白い 上着',
        specialty: '希土類 元素',
        alibi: '午後 3時 〜 4時、自分の 実験室で 実験を していた。',
        testimony: '私の 専門は 希土類。金 (Au) には 関心が ない。',
      },
    ],

    // ===== 최종 추리 =====
    finalQ: {
      prompt: '🔍 これまでの 手がかりを 総合して、犯人を 推理しよう!\n\n📌 手がかり:\n① メモ「Au 79 79.0」 (原子量を 間違えている)\n② 犯人は 化学の 専門知識が ない\n③ 午後3時14分、身長 178cm・白い 上着の 人物が 廊下に いた\n④ 鈴木さんは「カフェテリアに いた」 と 証言',
      question: '犯人は 誰?',
      hint: '② と ③ と ④ を 組み合わせて 考えよう。証言と 目撃情報が 一致しない 人は?',
      suspectIds: ['tanaka', 'suzuki', 'sato'],
      answer: 'suzuki',
      explanation:
        '犯人は 鈴木 さん!\n\n' +
        '【推理】\n' +
        '① メモの 原子量間違いから、犯人は 化学者 ではない → 鈴木 (専門家でない 助手)\n' +
        '② 目撃情報 (身長178cm・白い 上着) と 鈴木の 特徴が 一致\n' +
        '③ 鈴木は「カフェテリアに いた」と 証言したが、目撃情報と 矛盾 (= 嘘)\n\n' +
        '田中 さんは 身長が 違う、佐藤 さんは 身長と 専門知識が 一致しない。',
    },

    // ===== 이번 사건에서 배운 것 =====
    learned: {
      title: '📚 この 事件で 学んだこと',
      points: [
        '🧪 元素記号: Au = 金 (アウルム/aurum はラテン語)',
        '🔢 原子番号 と 原子量 は 違う数字 (例: 金は 番号79、量197)',
        '⚗️ 化学の 専門家は 周期表の 数字を 暗記している',
        '🔍 犯人を 見つけるには 「証言」 と 「事実」 の 矛盾を 探す',
      ],
    },

    note: { title: '第1事件 化学研究室', desc: '元素記号 Au=金。原子番号と 原子量の 違いを 学んだ。' },
  },

  // ========================================
  // 第2事件: 天文台の 観測ログ改竄
  // ========================================
  {
    id: 2, icon: '🔭',
    title: '天文台の 観測ログ',
    subtitle: '改ざんされた 惑星観測 データ',
    theme: '天文・惑星',
    scene: 'observatory',
    bgm: 'sci_space',
    illustration: SCI_CASE_IMAGES[2],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '長野県の 八ヶ岳天文台。世界的に 重要な 観測データが 改ざんされる 事件が 起きた。' },
      { speaker: '山下 博士', cls: 'sensei', charKey: 'yamada',
        text: 'ハル君、リオ君、本当に 困っているんだ。火星の 観測データが 書き換えられている。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'いつ 気づきましたか?' },
      { speaker: '山下 博士', cls: 'sensei', charKey: 'yamada',
        text: '今朝、ログを 確認した時に。昨日の 夜、3人の 助手が 当番だった。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '惑星って 空に いっぱい あるよね!' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '改ざんされた 場所を 詳しく 教えてください。' },
    ],

    steps: [
      // STEP 1: 데이터의 모순
      {
        id: 'step1',
        type: 'mc',
        title: '🔍 STEP 1: 観測データの 矛盾',
        intro: [
          { speaker: '山下 博士', cls: 'sensei', charKey: 'yamada', text: 'ログには「火星の 衝 (しょう) は 1月15日 22時45分」と 書かれていた。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '「衝」は 太陽 - 地球 - 火星が 一直線に なる 現象ですね。' },
        ],
        puzzle: {
          prompt: '火星の 「衝」 は 約 何年に 1回?',
          hint: '火星と 地球の 公転周期から 計算 できる。火星=687日、地球=365日。',
          options: [
            '約 1年に 1回',
            '約 2年 2ヶ月に 1回',
            '約 5年に 1回',
            '毎月',
          ],
          answer: 1,
          explanation: '火星の 衝は 約 2年 2ヶ月 (約780日) に 1回。これは 火星と 地球の 公転周期の 差から 計算 できる「会合周期」。',
        },
        clue: {
          title: '天文学の 知識',
          desc: '火星の 衝は 約 2年2ヶ月に 1回。前回が いつかを 知れば 今回が 本当か 分かる。',
        },
      },

      // STEP 2: 시간 검증
      {
        id: 'step2',
        type: 'mc',
        title: '📅 STEP 2: 過去の 記録',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '前回の 火星の 衝は いつだったの?' },
          { speaker: '山下 博士', cls: 'sensei', charKey: 'yamada', text: '前回は 2022年 12月8日。' },
        ],
        puzzle: {
          prompt: '前回の 衝が 2022年 12月8日。次の 衝は 約 何年 何月?',
          hint: '約 2年 2ヶ月 後を 計算しよう。',
          options: [
            '2024年 1月頃',
            '2025年 1月〜2月頃',
            '2026年 1月頃',
            '2027年 12月頃',
          ],
          answer: 1,
          explanation: '2022年12月 + 2年2ヶ月 ≒ 2025年 1月〜2月。観測ログの 「2025年1月15日」 は 時期としては 自然。',
        },
        clue: {
          title: '時期の 検証',
          desc: '2025年 1月15日に 火星の 衝が 起きるのは 自然。日付 自体は 怪しくない。',
        },
      },

      // STEP 3: 관측 위치
      {
        id: 'step3',
        type: 'mc',
        title: '🌌 STEP 3: 観測の 方角',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'ログの「火星の 位置」を 確認しよう。' },
          { speaker: '山下 博士', cls: 'sensei', charKey: 'yamada', text: '「南西の 空、高度 30度」と 書かれている。' },
        ],
        puzzle: {
          prompt: '火星の「衝」の 時、夜空での 火星の 位置は どこ?',
          hint: '太陽 - 地球 - 火星が 一直線。火星は 太陽の 反対側に ある。',
          options: [
            '太陽と 同じ 方向 (昼間 見える)',
            '太陽の 反対側 (真夜中に 真南)',
            '東の 地平線 近く',
            '西の 地平線 近く',
          ],
          answer: 1,
          explanation: '「衝」 とは 太陽-地球-火星が 一直線に 並んだ 状態。地球から 見て 火星は 太陽の 反対側。だから 真夜中に 南中 (真南で 一番 高く なる)。',
        },
        clue: {
          title: '重要な 矛盾!',
          desc: 'ログには「南西の 空、高度 30度」と あるが、衝の 火星は「真南、高度 高い」が 正しい。データは 改ざんされている!',
        },
      },
    ],

    suspects: [
      {
        id: 'kobayashi',
        name: '小林 さん',
        icon: '🧑‍🚀', charKey: 'villager1',
        role: '天文台 助手 (5年目)',
        height: '170cm',
        clothes: '白衣',
        specialty: '惑星観測',
        alibi: '夜10時頃まで 観測室で 当番。その後 仮眠室に。',
        testimony: '改ざんは していない。火星の 衝の 時 真南に 見えるのは 当然 知っている。',
      },
      {
        id: 'watanabe',
        name: '渡辺 さん',
        icon: '👨‍🎓', charKey: 'villager2',
        role: '実習生 (1年目)',
        height: '175cm',
        clothes: 'ジャージ',
        specialty: '勉強中',
        alibi: '夜は 主に 自分の 部屋で 勉強。観測室には 数回 行った。',
        testimony: '改ざんは していない。先輩が 書いた ログを 見て 不思議に 思っただけ。',
      },
      {
        id: 'yamamoto',
        name: '山本 さん',
        icon: '👨‍🔬', charKey: 'yamada',
        role: '研究員 (12年目)',
        height: '168cm',
        clothes: '白衣',
        specialty: '銀河 研究 (惑星は 専門外)',
        alibi: '夜中に データを 整理していた。火星に 関する データも 見た。',
        testimony: '私は 銀河が 専門。火星の 詳しい 動きは 知らない。',
      },
    ],

    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 火星の 衝の 時、火星は「真南、高い 位置」に 見える\n② ログには「南西、高度30度」と 改ざんされている\n③ 改ざんを した 犯人は 火星の 詳しい 知識を 知らない\n④ 各容疑者の 専門と 知識:\n  ・小林: 惑星観測 専門 (詳しい)\n  ・渡辺: 実習生 (勉強中)\n  ・山本: 銀河専門 「火星の 動きは 知らない」と 自分で 言った',
      question: '犯人は 誰?',
      hint: '「火星の 詳しい 動きを 知らない」 と 自分で 言った 人物は?',
      suspectIds: ['kobayashi', 'watanabe', 'yamamoto'],
      answer: 'yamamoto',
      explanation:
        '犯人は 山本 さん!\n\n' +
        '【推理】\n' +
        '① 改ざんは「南西、高度30度」 という 自然な 位置に 書き換えられた\n' +
        '② しかし「衝」の 火星は 真南で 高い 位置が 正解。改ざん者は これを 知らない\n' +
        '③ 山本 さんは「火星の 詳しい 動きは 知らない」と 自ら 発言\n' +
        '④ 小林は 惑星専門 (知識がある)、渡辺は 実習生 (改ざんしても データに アクセス 困難)\n\n' +
        '山本 さんは 銀河専門なので 惑星の 詳細を 知らず、自然な 数値に 書き換えた つもりだった。',
    },

    learned: {
      title: '📚 この 事件で 学んだこと',
      points: [
        '🪐 「衝 (しょう)」: 太陽-地球-惑星が 一直線に 並ぶ 現象',
        '⏱ 火星の 衝は 約 2年2ヶ月に 1回 (会合周期)',
        '🌙 衝の 時、惑星は 真夜中に 真南で 一番 高く 見える',
        '🔭 太陽系の 惑星は それぞれ 公転周期が 違う',
      ],
    },

    note: { title: '第2事件 八ヶ岳天文台', desc: '惑星の 衝、公転周期、見える 方角を 学んだ。' },
  },

  // ========================================
  // 第3~10事件: 준비중 (일러스트만 미리)
  // ========================================
  { id: 3, icon: '🧬', title: '生物実験室の 入れ替え', subtitle: 'DNA と 標本の 謎', theme: '生物・DNA', bgm: 'sci_bio',
    illustration: SCI_CASE_IMAGES[3],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '神奈川県の 生物研究所。希少な 生物標本が こっそり 入れ替えられた 事件が 起きた。' },
      { speaker: '吉田 所長', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、ありがとう。展示中の「希少な 黒い 蝶」の 標本が、普通の 蝶に 入れ替えられていたんだ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'えー、蝶って 似てるのに、よく 気づいたね!' },
      { speaker: '吉田 所長', cls: 'sensei', charKey: 'ojiisan',
        text: '本物には 特別な マークが あって、にせ物には なかったんだ。研究員 3人の 中に 入れ替えた 人が いる。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '入れ替えは いつ 起きたんですか?' },
      { speaker: '吉田 所長', cls: 'sensei', charKey: 'ojiisan',
        text: '昨日 午後 2時 から 4時の 間。3人とも その 時間に 研究所内に いた。DNA 鑑定の 結果も 出ているんだ。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'DNA…生物学の 知識が 必要ですね。挑戦します!' },
    ],
    steps: [
      // STEP 1: DNA 기본 지식
      {
        id: 'step1', type: 'mc',
        title: '🔍 STEP 1: DNAの 構造',
        intro: [
          { speaker: '吉田 所長', cls: 'sensei', charKey: 'ojiisan', text: 'にせ物の 蝶の DNAを 調べたんだ。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'DNAの 4つの 塩基…A・T・G・C ですね。' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'え、4つだけ?それで 全部の 生き物が 違うの?' },
        ],
        puzzle: {
          prompt: 'DNAの 二重らせんで、A は 何と ペアに なる?',
          hint: 'A=アデニン、T=チミン、G=グアニン、C=シトシン。決まった ペアが ある!',
          options: ['G (グアニン)', 'C (シトシン)', 'T (チミン)', 'A 自身'],
          answer: 2,
          explanation: 'A(アデニン)は 必ず T(チミン)と、G(グアニン)は 必ず C(シトシン)と ペアに なる。これを「相補的塩基対」という。',
        },
        clue: { title: 'DNAの 知識', desc: 'DNA の 塩基対: A-T, G-C。これを 知らないと DNA は 分析 できない。' },
      },
      // STEP 2: 종 식별
      {
        id: 'step2', type: 'mc',
        title: '🧪 STEP 2: 種の 違い',
        intro: [
          { speaker: '吉田 所長', cls: 'sensei', charKey: 'ojiisan', text: 'にせ物の DNAを 解析したら、本物の「黒い 蝶」とは 違う 種だった。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '同じ 蝶でも、種が 違えば DNAは 違う…' },
        ],
        puzzle: {
          prompt: '同じ「蝶」でも、種が 違えば DNAの 配列が 違う。これは どんな 法則と 関係?',
          hint: '生物の 形の 違いは 遺伝子の 違い。これを 発見した のは…',
          options: [
            '相対性理論 (アインシュタイン)',
            '進化論 (ダーウィン)',
            '万有引力 (ニュートン)',
            '元素周期律 (メンデレーエフ)',
          ],
          answer: 1,
          explanation: 'ダーウィンの「進化論」: 生物は 環境に 合わせて 少しずつ 変化し、新しい 種が 生まれる。DNAの 違いが その 証拠。',
        },
        clue: { title: '進化論', desc: 'にせ物は 別の 種の 蝶。本物の「黒い 蝶」を 持っている のは 専門家だけ。' },
      },
      // STEP 3: 알리바이 + 전문지식
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 入れ替えに 必要な 知識',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'にせ物を 用意するには、似た 種を 知っている 必要がある…' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '誰でも できるわけじゃ ないんだね!' },
        ],
        puzzle: {
          prompt: 'にせ物の 蝶は「普通に 売られている 種類」で、本物と 見た目は 似ていた。\n\n犯人は どんな 知識を 持っている 必要がある?',
          hint: '見た目が 似ている 種を 知るには 何の 知識が 必要?',
          options: [
            '化学の 知識',
            '昆虫の 種類 (分類学)',
            '物理の 知識',
            '建築の 知識',
          ],
          answer: 1,
          explanation: '昆虫を 種として 分類する 知識(分類学)が 必要。植物専門や 海洋専門では 蝶の 種を 詳しく 知らない。',
        },
        clue: { title: '犯人像', desc: '犯人は 昆虫(蝶)の 種類を 詳しく 知っている。植物専門・海洋専門では ない。' },
      },
    ],
    suspects: [
      {
        id: 'matsuda', name: '松田 さん', icon: '👨‍🔬', charKey: 'tanaka',
        role: '昆虫研究員 (10年目)',
        height: '172cm', clothes: '緑のエプロン',
        specialty: '蝶の 分類 (昆虫学)',
        alibi: '午後 2時 〜 4時、ずっと 自分の 研究室で 顕微鏡を 使っていた。',
        testimony: '私は 蝶を 愛している。本物を 入れ替えるなんて 考えられない。',
      },
      {
        id: 'kato', name: '加藤 さん', icon: '👩‍🔬', charKey: 'villager4',
        role: '植物研究員 (5年目)',
        height: '165cm', clothes: '白衣',
        specialty: '熱帯植物',
        alibi: '午後 2時 〜 4時、植物展示室と 標本室を 行き来していた。',
        testimony: '私の 専門は 植物。蝶の 種類なんて 詳しく 知らないわ。',
      },
      {
        id: 'nakajima', name: '中島 さん', icon: '👨‍🎓', charKey: 'villager3',
        role: '海洋生物研究員 (8年目)',
        height: '180cm', clothes: '青いシャツ',
        specialty: 'クジラと 深海魚',
        alibi: '午後 2時 〜 4時、自分の 部屋で 論文を 書いていた。',
        testimony: '私は 海の 生物が 専門。蝶? 詳しく ありません。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① にせ物は 似た 種類の 蝶 (本物とは 別の 種)\n② 犯人は 昆虫(蝶)の 分類を 知っている 必要がある\n③ 容疑者の 専門:\n  ・松田: 蝶 (昆虫学) ← 本物を 一番 愛していると 主張\n  ・加藤: 植物 ← 「蝶 知らない」と 自分で 発言\n  ・中島: 海洋生物 ← 「蝶 詳しく ない」と 自分で 発言\n④ にせ物を 用意するには 蝶を 知っている 必要',
      question: '犯人は 誰?',
      hint: '蝶の 種類を 詳しく 知っている のは 1人だけ。「自分は 知らない」 と 言った 人物は 候補から 除外できる。',
      suspectIds: ['matsuda', 'kato', 'nakajima'],
      answer: 'matsuda',
      explanation:
        '犯人は 松田 さん!\n\n' +
        '【推理】\n' +
        '① 加藤・中島は「蝶 詳しくない」と 自ら 発言 → にせ物を 用意できない\n' +
        '② 蝶の 似た 種を 知っている のは 松田 だけ\n' +
        '③ 「蝶を 愛している」 という 言葉は アリバイに ならない\n' +
        '④ 専門家しか できない 入れ替え = 松田 さんが 犯人\n\n' +
        '実は 松田 さんは 黒い 蝶を 自分の 個人 コレクションに したかった。専門家だからこそ 本物の 価値を 知っていた。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🧬 DNAの 4つの 塩基: A・T・G・C',
      '🔗 塩基対: A-T, G-C (相補的)',
      '🦋 種の 違い = DNA の 違い',
      '🌍 ダーウィンの 進化論: 環境に 合わせて 種が 変化',
      '🔬 専門家しか できない 犯罪を 見抜くのも 推理の 1つ',
    ]},
    note: { title: '第3事件 生物研究所', desc: 'DNAの 塩基対と 進化論を 学んだ。' },
  },
  { id: 4, icon: '⚛️', title: '物理学者の 暗号メモ', subtitle: '光と 重力の 暗号', theme: '物理', bgm: 'sci_phys',
    illustration: SCI_CASE_IMAGES[4],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '京都の 理論物理学研究所。著名な 物理学者 河本 教授が 研究ノートを 盗まれた。' },
      { speaker: '河本 教授', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、私の 30年の 研究が 入った ノートが 消えたんだ。新しい 重力理論の 発見が 書かれていた!' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '誰が 取れる 場所に あったんですか?' },
      { speaker: '河本 教授', cls: 'sensei', charKey: 'ojiisan',
        text: '研究室の 金庫に 入れていた。鍵を 知っているのは 私と 3人の 助手だけ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '机の 上に 何か 紙が あるよ! 「c=3×10⁸ m/s」 って 書いてある!' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'これは 物理の 暗号メモだ!犯人が 落としたのかも しれない。' },
      { speaker: '河本 教授', cls: 'sensei', charKey: 'ojiisan',
        text: 'これを 解けば 犯人が 分かる!' },
    ],
    steps: [
      // STEP 1: 빛의 속도
      {
        id: 'step1', type: 'mc',
        title: '🔍 STEP 1: 暗号の 数字',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '「c=3×10⁸ m/s」…これは 物理の 重要な 定数だ。' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'え、何の 数字なの?' },
        ],
        puzzle: {
          prompt: '「c = 3×10⁸ m/秒」 は 何の 速さを 表す?',
          hint: 'c は 物理学者なら 誰でも 知っている 定数。地球を 1秒で 7周半 する 速さ…',
          options: [
            '音の 速さ',
            '光の 速さ',
            '地球の 公転速度',
            '人工衛星の 速さ',
          ],
          answer: 1,
          explanation: '光速 c = 約3×10⁸ m/秒 = 約30万km/秒。アインシュタインの 相対性理論で 重要な 定数。',
        },
        clue: { title: '光速', desc: 'c = 3×10⁸ m/秒 = 光速。物理学では 基本的な 定数。' },
      },
      // STEP 2: 더 어려운 물리 지식
      {
        id: 'step2', type: 'mc',
        title: '🌌 STEP 2: 暗号の 続き',
        intro: [
          { speaker: '河本 教授', cls: 'sensei', charKey: 'ojiisan', text: 'メモの 裏に もう 1つ 数字が ある!「g=9.8 m/s²」' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'g…これも 物理の 重要な 数字。' },
        ],
        puzzle: {
          prompt: '「g = 9.8 m/秒²」 は 何を 表す?',
          hint: 'りんごが 木から 落ちる 速さの 増え方…ニュートンが 発見!',
          options: [
            '空気の 抵抗',
            '光の 屈折率',
            '地球の 重力加速度',
            '原子の 振動数',
          ],
          answer: 2,
          explanation: '地球の 重力加速度 g = 約9.8 m/秒²。物が 自由落下する 時、毎秒 9.8m/秒ずつ 速く なる。',
        },
        clue: { title: '重力', desc: 'g = 9.8 m/秒² = 地球の 重力加速度。ニュートンが 発見。' },
      },
      // STEP 3: 결정적 모순
      {
        id: 'step3', type: 'mc',
        title: '🎯 STEP 3: 矛盾を 探せ',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '犯人は 物理を 知っている人物。容疑者の 証言を 確認しよう。' },
          { speaker: '河本 教授', cls: 'sensei', charKey: 'ojiisan', text: '助手たちに 話を 聞いてみたよ。' },
        ],
        puzzle: {
          prompt: '一人の 助手が こう 言った:\n\n「光は 1秒で 月まで 行ける から、c は とても 速い。」\n\n月までは 約 38万km。光速は 30万km/秒。\nこの 発言は 正しい?',
          hint: '計算してみよう。38万km ÷ 30万km/秒 = ?',
          options: [
            '正しい (約1秒)',
            '間違い (実際は 約1.3秒 かかる)',
            '正しい (光は 一瞬)',
            '計算不可能',
          ],
          answer: 1,
          explanation: '38万km ÷ 30万km/秒 ≒ 1.27秒。「1秒で 月まで」 は おおまかには 合っているが、正確には 約1.3秒。物理を 詳しく 知る人は こう 言わない。',
        },
        clue: { title: '誰が 物理に 弱い?', desc: '「光は 1秒で 月まで」 と 言った 人物は 物理の 細かい 知識が 弱い。本当の 物理学者なら 1.3秒と 答える。' },
      },
    ],
    suspects: [
      {
        id: 'morimoto', name: '森本 さん', icon: '👨‍🔬', charKey: 'tanaka',
        role: '理論物理 助手 (8年目)',
        height: '170cm', clothes: '黒いシャツ',
        specialty: '相対性理論',
        alibi: '昨日 夜、研究室で 計算を していた。',
        testimony: 'メモは 私のじゃ ない。光は 1秒で 月まで 行ける から、c は とても 速い ですね。',
      },
      {
        id: 'ishikawa', name: '石川 さん', icon: '👩‍🔬', charKey: 'villager4',
        role: '実験物理 助手 (5年目)',
        height: '163cm', clothes: '白衣',
        specialty: '量子実験',
        alibi: '昨日 夜、実験室で データを 取っていた。',
        testimony: '光速は 正確に 約30万km/秒。月までは 1.3秒くらい かかる。',
      },
      {
        id: 'fujita', name: '藤田 さん', icon: '👨‍🎓', charKey: 'villager2',
        role: '事務員 (3年目)',
        height: '175cm', clothes: 'スーツ',
        specialty: '事務 (物理は 専門外)',
        alibi: '昨日 夜、書類整理を していた。',
        testimony: '物理の こと 分かりません。鍵は 持っているけど、メモは 私のじゃ ない。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 暗号メモ「c=3×10⁸, g=9.8」 = 光速と 重力\n② 犯人は 物理を 知っている (メモを 書いたから)\n③ 容疑者の 発言:\n  ・森本: 「光は 1秒で 月まで」 ← 物理の 詳細に 弱い\n  ・石川: 「月まで 約1.3秒」 ← 正確な 物理知識\n  ・藤田: 「物理 分かりません」 ← メモを 書ける はずない\n④ 鍵は 全員 持っている',
      question: '犯人は 誰?',
      hint: '本当の 物理学者なら「1秒で 月まで」 とは 言わない。物理を 専門と している のに「ざっくりした」 答えを する 人は 怪しい。逆に 正確な 答えを する 人は…',
      suspectIds: ['morimoto', 'ishikawa', 'fujita'],
      answer: 'morimoto',
      explanation:
        '犯人は 森本 さん!\n\n' +
        '【推理】\n' +
        '① 暗号メモを 書ける = 物理の 知識が ある人物\n' +
        '② 藤田は「物理 分かりません」 → メモを 書けない\n' +
        '③ 石川は 正確な 知識を 持っている → 正直\n' +
        '④ 森本は 専門が 「相対性理論」 なのに、光速の 詳細で 間違った 発言を した = 知ってて わざと 適当に 答えた = 怪しい\n\n' +
        '森本さんは メモが バレないように、わざと 物理に 弱いふりを した。でも 石川さんと 比較すると、専門家としての 知識の レベルが 不自然。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '💡 光速 c = 3×10⁸ m/秒 (約30万km/秒)',
      '🍎 重力加速度 g = 9.8 m/秒² (地球の 重力)',
      '🌙 月まで 光は 約 1.3秒で 到達',
      '🔬 アインシュタインの 相対性理論で c は 重要',
      '🎯 「わざと 知らないふり」 を 見抜くのも 推理',
    ]},
    note: { title: '第4事件 理論物理研究所', desc: '光速、重力加速度、相対性理論を 学んだ。' },
  },
  { id: 5, icon: '🦴', title: '古生物学者の 化石盗難', subtitle: '中ボス: 失われた 太古の 証拠', theme: '古生物', bgm: 'sci_paleo',
    illustration: SCI_CASE_IMAGES[5],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '東京 自然史博物館。世紀の 大発見と される 1億年前の 恐竜化石が 突然 消えた。' },
      { speaker: '黒川 館長', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君… これは 大変な 事件です。明日 国際発表する 化石が 盗まれた。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '化石の 価値は どのくらい?' },
      { speaker: '黒川 館長', cls: 'sensei', charKey: 'ojiisan',
        text: '値段では はかれない。新種の 恐竜の 証拠で、進化の 歴史を 書き換える 発見だった。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'すごい!でも、誰が 取れるの?展示室は 鍵が かかってるよね?' },
      { speaker: '黒川 館長', cls: 'sensei', charKey: 'ojiisan',
        text: '鍵を 持つ 4人が 容疑者。みんな 古生物学の 専門家だ。これは これまでで 一番 難しい 推理に なる。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '4人?今までより 1人 多い…全員の 証言を 慎重に 確認しないと。' },
    ],
    steps: [
      // STEP 1: 지질 시대
      {
        id: 'step1', type: 'mc',
        title: '🔍 STEP 1: 化石の 時代',
        intro: [
          { speaker: '黒川 館長', cls: 'sensei', charKey: 'ojiisan', text: '盗まれたのは 1億年前の 化石。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '1億年前… それは 中生代 ですね。' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '中生代って 何時代?' },
        ],
        puzzle: {
          prompt: '1億年前 (約1億〜1.45億年前) は どの 時代?',
          hint: '恐竜が 栄えた 時代の 中で、後半。 T-rexは もっと 後 (約7000万年前)。',
          options: [
            'ジュラ紀 (1.45億〜2億年前)',
            '白亜紀 (6600万〜1.45億年前)',
            '三畳紀 (2億〜2.5億年前)',
            '古生代カンブリア紀',
          ],
          answer: 1,
          explanation: '1億年前 = 白亜紀の 中頃。中生代は 三畳紀(古い)→ジュラ紀→白亜紀(新しい) の 順。',
        },
        clue: { title: '時代特定', desc: '1億年前 = 白亜紀。この 時代を 専門と している 学者が 重要。' },
      },
      // STEP 2: 恐竜の 進化
      {
        id: 'step2', type: 'mc',
        title: '🦖 STEP 2: 進化の 系統',
        intro: [
          { speaker: '黒川 館長', cls: 'sensei', charKey: 'ojiisan', text: '化石は 「鳥に 進化する 前の 恐竜」 だった。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '鳥…そう、現代の 鳥は 恐竜の 子孫ですね。' },
        ],
        puzzle: {
          prompt: '現代の 鳥が 進化したと される のは どの 恐竜の 仲間?',
          hint: '羽毛を 持っていた 恐竜… T-rex の 仲間。',
          options: [
            '草食の 大型恐竜 (アパトサウルス類)',
            '獣脚類 (ティラノサウルス・ヴェロキラプトル類)',
            '海の 爬虫類 (モササウルス類)',
            '翼竜 (プテラノドン類)',
          ],
          answer: 1,
          explanation: '鳥は 獣脚類 (二足歩行の 肉食恐竜) から 進化した。羽毛は 元々 体温調節用だった。翼竜は 鳥とは 別の 進化系統。',
        },
        clue: { title: '鳥と 恐竜', desc: '盗まれた 化石は 獣脚類 (鳥に 進化する 前)。獣脚類の 専門家が 怪しい。' },
      },
      // STEP 3: 모순 발견
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 証言の 矛盾',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '4人の 証言を 整理しよう。' },
          { speaker: '黒川 館長', cls: 'sensei', charKey: 'ojiisan', text: '昨夜 11時、警報が 鳴った。その 時間に みんな どこに いたか…' },
        ],
        puzzle: {
          prompt: '一人が こう 言った:\n\n「私は 11時に 図書館に いた。一緒に いた 人と「翼竜が 鳥の 祖先だ」 と 議論していた」\n\nこの 人は 古生物学者。発言の 中に 間違いは ある?',
          hint: '「翼竜が 鳥の 祖先」 は 正しい?STEP 2で 学んだ 事実を 思い出そう。',
          options: [
            '間違いない',
            '「翼竜が 鳥の 祖先」 は 誤り (鳥は 獣脚類から 進化)',
            '日付が 間違っている',
            '判断 不可能',
          ],
          answer: 1,
          explanation: '古生物学者なら「翼竜が 鳥の 祖先」 とは 絶対 言わない。鳥は 獣脚類から 進化した。これは 専門家の はずなのに 知識が 怪しい人物。',
        },
        clue: { title: '怪しい 専門家', desc: '専門家を 名乗りながら、基本知識を 間違えた 人物が いる。本当の 専門家か どうか 怪しい!' },
      },
      // STEP 4 (中ボス 추가 단계): 동기
      {
        id: 'step4', type: 'mc',
        title: '💰 STEP 4: 動機',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'お兄ちゃん、なんで 盗んだの?' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'いい 質問だ、リオ。動機を 考えてみよう。' },
        ],
        puzzle: {
          prompt: '盗まれた 化石は「進化の 歴史を 書き換える」 もの。\n4人 の 容疑者の うち、化石が 公開される と 一番 困る 人は?',
          hint: '誰の 過去の 学説が 否定される?',
          options: [
            '別の 進化説を 主張する 学者',
            '化石が ニセ物だと 言った 学者',
            '館長',
            '実習生',
          ],
          answer: 0,
          explanation: '化石が 進化の 歴史を 書き換える なら、それと 違う 学説を 主張していた 人物は 困る。動機は「自分の 過去の 主張を 守る ため」。',
        },
        clue: { title: '動機', desc: '別の 進化説を 主張していた 学者が、自分の 過去の 主張を 守るために 化石を 隠した。' },
      },
    ],
    suspects: [
      {
        id: 'kojima', name: '小島 教授', icon: '👨‍🏫', charKey: 'tanaka',
        role: '古生物学 教授 (35年)',
        height: '170cm', clothes: 'スーツ',
        specialty: 'ジュラ紀の 翼竜研究',
        alibi: '夜10時に 帰宅した。',
        testimony: '私は 翼竜の 進化を 30年 研究してきた。新しい 化石が 私の 説を 否定する とは 思わない。',
      },
      {
        id: 'iwamoto', name: '岩本 さん', icon: '👨‍🔬', charKey: 'villager3',
        role: '研究員 (12年)',
        height: '178cm', clothes: '白衣',
        specialty: '白亜紀の 獣脚類',
        alibi: '夜11時、図書館で 同僚と 議論していた。「翼竜が 鳥の 祖先だ」 と 話していた。',
        testimony: '昨夜は 図書館に いた。同僚と 一緒だ。',
      },
      {
        id: 'mochizuki', name: '望月 さん', icon: '👩‍🔬', charKey: 'villager4',
        role: '研究員 (8年)',
        height: '162cm', clothes: 'カーディガン',
        specialty: '三畳紀の 初期恐竜',
        alibi: '夜は 自宅に いた。家族が 証言できる。',
        testimony: '私の 専門は 三畳紀。1億年前の 化石は 専門外です。',
      },
      {
        id: 'sasaki', name: '佐々木 さん', icon: '👨‍🎓', charKey: 'villager2',
        role: '実習生 (1年)',
        height: '170cm', clothes: 'カジュアル',
        specialty: '勉強中',
        alibi: '夜10時から 学生寮で 勉強していた。',
        testimony: 'まだ 勉強中で、化石を 盗んでも 価値が 分かりません。',
      },
    ],
    finalQ: {
      prompt: '🔍 中ボス 事件: すべての 手がかりを 総合しよう!\n\n📌 手がかり:\n① 化石: 1億年前 (白亜紀)、獣脚類 (鳥の 祖先)\n② 容疑者の 専門:\n  ・小島: ジュラ紀 翼竜 (動機: 自説を 守る?)\n  ・岩本: 白亜紀 獣脚類 ← 一番 専門に 近い\n  ・望月: 三畳紀 (専門外)\n  ・佐々木: 実習生\n③ 岩本「翼竜が 鳥の 祖先」 ← 古生物学者なのに 大きな 間違い\n④ 動機: 自分の 過去の 主張を 守りたい',
      question: '犯人は 誰?',
      hint: '専門家として 嘘の 知識を 言った 人物は 誰?\n動機 (自説を 守る) と 一致する 容疑者は?\n2つの ヒントを 組み合わせて。',
      suspectIds: ['kojima', 'iwamoto', 'mochizuki', 'sasaki'],
      answer: 'kojima',
      explanation:
        '犯人は 小島 教授!\n\n' +
        '【推理】\n' +
        '① 動機: 「翼竜の 進化」 を 30年 研究 → 化石が 「鳥は 獣脚類から 進化」 と 証明する なら 小島の 説 (翼竜が 鳥の 祖先かも) が 否定される\n' +
        '② 岩本は 「翼竜が 鳥の 祖先」 と 発言 → 実は これは 小島 の 教えだから、弟子も 信じている。岩本は 嘘を ついている わけ ではない (恩師の 説を 信じている)\n' +
        '③ つまり 小島 が 弟子に 間違った 知識を 教え、自分の 説を 守ろうと した\n' +
        '④ 望月は 専門外、佐々木は 実習生で 動機がない\n\n' +
        '中ボス 事件は 「動機」 と 「専門家としての 嘘」 を 両方 見抜く 必要が ある。\n小島 教授は 自分の キャリアを 守るために、新しい 発見を 隠した。',
    },
    learned: { title: '📚 中ボス事件で 学んだこと', points: [
      '🦖 中生代 = 三畳紀 → ジュラ紀 → 白亜紀 (古→新)',
      '🐦 鳥は 獣脚類 (T-rex の 仲間) から 進化',
      '✈️ 翼竜は 鳥とは 別の 進化系統',
      '⏰ 1億年前 = 白亜紀',
      '🎭 専門家でも 嘘を つく ことが ある',
      '💡 動機を 考える のが 推理の 基本',
    ]},
    note: { title: '第5事件 自然史博物館', desc: '中生代、進化系統、専門家の 嘘を 見抜く 推理を 学んだ。' },
  },
  { id: 6, icon: '💊', title: '医療研究所の 薬品事件', subtitle: '消えた 新薬 サンプル', theme: '医学', bgm: 'sci_med',
    illustration: SCI_CASE_IMAGES[6],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '横浜の 医療研究所。新しい 痛み止めの 臨床試験が 進む 中、事件が 起きた。' },
      { speaker: '高橋 所長', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、来てくれて ありがとう。新薬の サンプルが 消えて、データも 改ざんされそうに なったんだ。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'それは 大変です。新薬は どんな 薬ですか?' },
      { speaker: '高橋 所長', cls: 'sensei', charKey: 'ojiisan',
        text: '今までより 副作用の 少ない、新しい 痛み止めだよ。臨床試験で 効果が 認められたんだ。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: '痛み止め!お腹 痛い時に 飲む やつ?' },
      { speaker: '高橋 所長', cls: 'sensei', charKey: 'ojiisan',
        text: 'そうだね。研究員は 3人。みんな 薬の 専門家。机の 上に 化学式の メモが 落ちていた…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '化学式!犯人が 残した 手がかりかも しれません。' },
    ],
    steps: [
      // STEP 1: 化学式 識別
      {
        id: 'step1', type: 'mc',
        title: '🔍 STEP 1: 化学式の メモ',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'メモには 「C₉H₈O₄」 と 書かれている。' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'CとHとO?何の 薬?' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '炭素・水素・酸素 だけで できている。これは 有名な 薬の 化学式だ…' },
        ],
        puzzle: {
          prompt: '「C₉H₈O₄」 は 何の 薬の 化学式?',
          hint: '世界で 一番 古い 痛み止めの 1つ。柳の 樹皮から 発見された 成分。',
          options: [
            'ペニシリン (抗生物質)',
            'アスピリン (痛み止め)',
            'ビタミンC',
            'カフェイン',
          ],
          answer: 1,
          explanation: 'C₉H₈O₄ = アスピリン (アセチルサリチル酸)。1899年に 発売された 古典的な 痛み止め。柳の 樹皮の 成分から 開発された。',
        },
        clue: { title: '化学式 解読', desc: 'メモの 化学式は アスピリン (古い 痛み止め)。新薬と 何か 関係が ある?' },
      },
      // STEP 2: 약의 효능과 모순
      {
        id: 'step2', type: 'mc',
        title: '🧪 STEP 2: 新薬の 効果',
        intro: [
          { speaker: '高橋 所長', cls: 'sensei', charKey: 'ojiisan', text: '新薬は アスピリンより 副作用が 少ない 改良版なんだ。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'つまり、新薬が 認められると…' },
          { speaker: '高橋 所長', cls: 'sensei', charKey: 'ojiisan', text: '古い アスピリン系の 薬は 売れなく なる 可能性が 高い。' },
        ],
        puzzle: {
          prompt: '新薬が 認められると 困る 人は 誰?',
          hint: '古い 薬を 作っていた 人は どう なる?',
          options: [
            '新薬を 開発した 人 (もっと 売れる)',
            '古い 薬の 開発に 関わった 人 (仕事が 減る)',
            '患者さん',
            '所長',
          ],
          answer: 1,
          explanation: '古い 薬を 開発・販売してきた 人は、新薬の 登場で 自分の 仕事や 評価が 失われる 可能性が ある。これが 動機に なりうる。',
        },
        clue: { title: '動機', desc: '古い アスピリン系の 薬を 作っていた 人物が 犯人の 可能性が 高い。' },
      },
      // STEP 3: 분자량과 결정적 모순
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 分子量の 計算',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'お兄ちゃん、もう 1つ メモが ある!「分子量 = 200」 だって。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'アスピリン C₉H₈O₄ の 本当の 分子量を 計算してみよう。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '炭素 C=12、水素 H=1、酸素 O=16 だから…' },
        ],
        puzzle: {
          prompt: 'アスピリン C₉H₈O₄ の 分子量を 計算しよう。\n\n計算: 12×9 + 1×8 + 16×4 = ?',
          hint: '12×9=108、1×8=8、16×4=64。合計は?',
          options: ['約 150', '約 180', '約 200', '約 250'],
          answer: 1,
          explanation: '12×9 + 1×8 + 16×4 = 108 + 8 + 64 = 180。\nアスピリンの 正しい 分子量は 約 180。メモに「200」と 書いた 人物は 間違えている = アスピリンを 専門と していない 可能性が 高い。',
        },
        clue: { title: '分子量の 矛盾', desc: 'アスピリンの 正しい 分子量は 180。メモには 200 と 書かれていた。これは 重要な 矛盾!\n\n犯人は アスピリンを「知っているふり」を しているが、実は 詳しく ない 可能性。または、わざと 間違えて 別人を 疑わせようと した。' },
      },
    ],
    suspects: [
      {
        id: 'kondo', name: '近藤 さん', icon: '👨‍🔬', charKey: 'tanaka',
        role: '薬学研究員 (20年目)',
        height: '170cm', clothes: '白衣',
        specialty: 'アスピリン系 痛み止め (古典的 薬)',
        alibi: '昨夜は 自分の 研究室で 残業していた。',
        testimony: '私は 30年 アスピリン系を 研究してきた。新薬の こと?…まあ、必要なら 受け入れるよ。分子量? アスピリンは 200くらい だったかな。',
      },
      {
        id: 'fujimoto', name: '藤本 さん', icon: '👩‍🔬', charKey: 'villager4',
        role: '新薬開発員 (5年目)',
        height: '163cm', clothes: '白衣',
        specialty: '新しい 痛み止め (今回の 新薬の 担当)',
        alibi: '昨夜は 22時まで 実験を していた。',
        testimony: '新薬は 私が 担当。アスピリンの 分子量は 180。メモは 私のじゃ ない。',
      },
      {
        id: 'inoue', name: '井上 さん', icon: '👨‍🎓', charKey: 'villager2',
        role: '実験助手 (2年目)',
        height: '175cm', clothes: '白衣',
        specialty: '勉強中 (薬の 化学式は まだ 詳しくない)',
        alibi: '昨夜は 早く 帰宅した。',
        testimony: '化学式? 勉強中で 詳しく 知りません。サンプルの 場所は 知っているけど…',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① メモは アスピリンの 化学式 (C₉H₈O₄)\n② 新薬は アスピリンの 改良版\n③ 分子量 「200」 は 間違い (正しくは 180)\n④ 容疑者:\n  ・近藤: アスピリン専門 (30年!)、「分子量200くらい」 と 自分で 発言\n  ・藤本: 新薬開発、分子量「180」 と 正確に 答えた\n  ・井上: 助手、化学式 知らないと 自分で 発言',
      question: '犯人は 誰?',
      hint: 'アスピリンを 30年 研究してきた 人が、分子量を 「200」 と 答えるのは あり得るか?\n動機 (新薬で 仕事を 失う) と 一致する 人物は?',
      suspectIds: ['kondo', 'fujimoto', 'inoue'],
      answer: 'kondo',
      explanation:
        '犯人は 近藤 さん!\n\n' +
        '【推理】\n' +
        '① 動機: 30年 アスピリン系を 研究 → 新薬で 自分の 業績が 否定される 危機\n' +
        '② 矛盾: アスピリン 専門家なのに 分子量を「200くらい」と 答えた → わざと 知らないふり\n' +
        '③ 「まあ、必要なら 受け入れる」 という 表現も 怪しい (本心を 隠している)\n' +
        '④ 藤本は 正確な 知識、井上は 動機が ない\n\n' +
        '近藤 さんは 新薬の データを 改ざんして 「副作用が 多い 薬」 に 見せかけ、自分の 古い アスピリン系 薬を 守ろうと した。\n\n' +
        '科学者の プライドと 過去の 業績への 執着が 動機の 事件。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '💊 アスピリン = C₉H₈O₄ (世界で 古い 痛み止め)',
      '🌿 元々は 柳の 樹皮の 成分から 発見',
      '⚖️ 分子量の 計算: C=12, H=1, O=16',
      '🧮 アスピリンの 分子量: 12×9+1×8+16×4 = 180',
      '🔬 新薬は 古い 薬の 改良版で 副作用を 減らす',
      '🎯 専門家の「わざとの 無知」を 見抜くのが 推理の カギ',
    ]},
    note: { title: '第6事件 医療研究所', desc: '化学式、分子量、薬の 歴史を 学んだ。' },
  },
  { id: 7, icon: '🌦️', title: '気象観測の 改ざん', subtitle: '嵐の 真実', theme: '気象', bgm: 'sci_weather',
    illustration: SCI_CASE_IMAGES[7],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '伊豆半島の 気象観測所。台風 接近中、観測データに 不審な 改ざんが 見つかった。' },
      { speaker: '田島 所長', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、急いで 来てくれて ありがとう。台風の 進路予測 データが 書き換えられていた。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'それは 大変だ!誤った 予報が 出れば 住民が 危険に なります。' },
      { speaker: '田島 所長', cls: 'sensei', charKey: 'ojiisan',
        text: '幸い 私が 気づいて 修正した。でも、誰が 改ざんしたか…' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'なんで そんな 事するの?みんな 困るよ!' },
      { speaker: '田島 所長', cls: 'sensei', charKey: 'ojiisan',
        text: '観測所には 3人の 観測員。みんな 昨日 当番だった。気象学の 知識を 使って 推理してくれ。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '気象データを 確認しましょう!' },
    ],
    steps: [
      // STEP 1: 気圧
      {
        id: 'step1', type: 'mc',
        title: '🔍 STEP 1: 台風の 気圧',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'まず 改ざん前の データを 確認しよう。' },
          { speaker: '田島 所長', cls: 'sensei', charKey: 'ojiisan', text: '台風の 中心気圧は 950 hPa。これは 強い 台風だ。' },
        ],
        puzzle: {
          prompt: '通常の 大気圧 (晴れの 日) は 約 何 hPa?',
          hint: '海面の 標準気圧。天気予報で よく 聞く 数字。',
          options: ['約 100 hPa', '約 500 hPa', '約 1013 hPa', '約 5000 hPa'],
          answer: 2,
          explanation: '海面の 標準大気圧は 約 1013 hPa。台風の 中心は それより ずっと 低く、950 hPa の 台風は 強い 部類。気圧が 低いほど 風が 強い。',
        },
        clue: { title: '気圧の 知識', desc: '通常 1013 hPa、台風中心 950 hPa = 強い 台風。気圧が 低いほど 風速が 強い。' },
      },
      // STEP 2: 風速
      {
        id: 'step2', type: 'mc',
        title: '💨 STEP 2: 風速の 単位',
        intro: [
          { speaker: '田島 所長', cls: 'sensei', charKey: 'ojiisan', text: '改ざんされた データには 「最大風速 80 km/h」 と あった。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '気象庁は 風速を 何の 単位で 表記しますか?' },
        ],
        puzzle: {
          prompt: '日本の 気象庁が 風速を 表す 標準単位は どれ?',
          hint: 'ニュースで「風速 30メートル」 と 聞いたこと ある?',
          options: [
            '時速 (km/h)',
            '秒速 (m/s)',
            'マイル毎時 (mph)',
            'ノット (knot)',
          ],
          answer: 1,
          explanation: '日本の 気象庁は 風速を 「m/s (メートル毎秒)」 で 表す。海外 (英語圏) では km/h や mph。改ざんで「km/h」 が 使われたのは 不自然。',
        },
        clue: { title: '単位の 矛盾', desc: '気象庁は 「m/s」 を 使う。改ざんに 「km/h」 を 使った 人は 気象専門ではない、または わざと 別人を 装った 可能性。' },
      },
      // STEP 3: 雲の 知識
      {
        id: 'step3', type: 'mc',
        title: '☁️ STEP 3: 雲の 種類',
        intro: [
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: 'お兄ちゃん、メモに 雲の 絵が 描いてある!' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '台風と 一緒に 出る 雲は…積乱雲だね。' },
        ],
        puzzle: {
          prompt: '台風や 雷雨を もたらす 巨大な 雲を 何と 呼ぶ?',
          hint: '夏の 入道雲。とても 高く 育つ 雲。',
          options: [
            '巻雲 (けんうん) - 高い 薄い 雲',
            '積乱雲 (せきらんうん) - 雷雨の 雲',
            '層雲 (そううん) - 霧のような 雲',
            '高積雲 (こうせきうん) - うろこ雲',
          ],
          answer: 1,
          explanation: '積乱雲 = 雷雨や 台風を もたらす 巨大な 雲。地表近くから 高度 10km以上 まで 育つ。 雨・雷・突風・雹を 起こす。',
        },
        clue: { title: '気象専門の 知識', desc: '積乱雲・気圧の 知識は 気象学の 基本。専門家なら 当然 知っている。' },
      },
    ],
    suspects: [
      {
        id: 'matsumoto', name: '松本 さん', icon: '👨‍🔬', charKey: 'tanaka',
        role: '気象観測員 (15年目)',
        height: '172cm', clothes: '紺色の 制服',
        specialty: '台風予測 (気象学 専門)',
        alibi: '昨夜は 観測室で 一晩中 当番だった。',
        testimony: '私は 気象一筋。風速は m/s で 表記する。改ざんは 私じゃ ない。',
      },
      {
        id: 'ueda', name: '上田 さん', icon: '👩‍💻', charKey: 'villager4',
        role: 'データ管理員 (8年目)',
        height: '160cm', clothes: 'カーディガン',
        specialty: 'コンピュータ・データベース管理 (気象学は 専門外)',
        alibi: '昨夜は 22時頃まで 観測室で データ 整理をして 帰宅した。',
        testimony: 'データは 私が 管理。アクセス 権限も ある。でも 改ざん 動機は ない。',
      },
      {
        id: 'okamoto', name: '岡本 さん', icon: '👨‍🎓', charKey: 'villager3',
        role: '研究員 (10年目)',
        height: '178cm', clothes: '白衣',
        specialty: '長期気候予測 (異常気象の 研究)',
        alibi: '昨夜は 自分の 研究室で 論文を 書いていた。',
        testimony: '私の 研究は「異常気象の 増加」。台風データは そのまま 使える 重要な 証拠だ。改ざんしても 私には 損。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 改ざんで「km/h」 が 使われた (気象庁は m/s を 使う)\n② 容疑者の 専門:\n  ・松本: 気象専門 (m/s を 自然に 使う)\n  ・上田: データ管理 (気象学は 専門外、km/hを 使う 可能性)\n  ・岡本: 異常気象研究 (改ざんは 損)\n③ アクセス権限: 上田が データ管理\n④ 動機: 上田は「気象 専門外」 だが、データを 自由に 触れる',
      question: '犯人は 誰?',
      hint: '気象庁の 単位 (m/s) を 使い慣れていない 人が 改ざんした。それは 気象専門で ない 人。\nデータに アクセスできる 人 = ?',
      suspectIds: ['matsumoto', 'ueda', 'okamoto'],
      answer: 'ueda',
      explanation:
        '犯人は 上田 さん!\n\n' +
        '【推理】\n' +
        '① 改ざんに「km/h」 が 使われた → 気象庁の m/s を 知らない 人物\n' +
        '② 上田は データ管理員で 気象学は 専門外 → 自然に km/h と 書いてしまう\n' +
        '③ データへの アクセス権限を 持つ 唯一の 人物\n' +
        '④ 松本は 気象専門 (m/s を 使う)、岡本は 異常気象データを 求めるので 動機が ない\n\n' +
        '実は 上田 さんは データ会社から 賄賂を 受け、誤った 進路予測で 株式に 影響を 与えようと した。気象専門でない から 単位の 違いに 気づかなかった。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🌪️ 台風の 中心気圧: 950 hPa = 強い 台風',
      '📏 通常の 大気圧: 約 1013 hPa',
      '💨 日本の 風速単位: m/s (メートル毎秒)',
      '☁️ 積乱雲 = 雷雨・台風を もたらす 雲',
      '🔍 専門外の 人物が 残す「単位の 違和感」',
    ]},
    note: { title: '第7事件 気象観測所', desc: '気圧・風速単位・雲の 種類を 学んだ。' },
  },
  { id: 8, icon: '🤖', title: 'ロボット工学の 設計図', subtitle: '消えた 設計の 一部', theme: '工学', bgm: 'sci_robot',
    illustration: SCI_CASE_IMAGES[8],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '埼玉の ロボット工学研究所。世界で 初の 「介護ロボット」 試作機の 設計図 一部が 盗まれた。' },
      { speaker: '杉田 博士', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、来てくれて 感謝する。介護ロボットの コア部品「腕の 関節機構」 の 設計図が 消えた。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '腕の 関節?ロボットの 動きを 決める 重要な 部分ですね。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'ロボット 動かない の?' },
      { speaker: '杉田 博士', cls: 'sensei', charKey: 'ojiisan',
        text: '完成までの 数ヶ月が 失われる。技術者 3人が 設計に 関わっていたが、誰が 持ち出したか…' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '研究室の 黒板に 何か 計算式が 残っている!' },
      { speaker: '杉田 博士', cls: 'sensei', charKey: 'ojiisan',
        text: '昨夜の 計算メモだ。これが 解明の 手がかりに なるかも しれない。' },
    ],
    steps: [
      // STEP 1: 톱니바퀴 비율
      {
        id: 'step1', type: 'mc',
        title: '🔍 STEP 1: ギア比の 計算',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '黒板に「歯車A 20歯、歯車B 60歯」 と 書いてある。' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '歯車?どういう こと?' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '歯車の 歯数が 違うと、回転数も 変わるんだ。' },
        ],
        puzzle: {
          prompt: '歯車A (20歯) が 3回転 すると、歯車B (60歯) は 何回転 する?',
          hint: '歯数の 比は 3:1。歯数が 多い 方は ゆっくり 回る。',
          options: [
            '9回転 (3倍 速い)',
            '3回転 (同じ)',
            '1回転 (3分の1)',
            '回らない',
          ],
          answer: 2,
          explanation: '歯車A:B = 20:60 = 1:3。Aが 3回転 すると Bは 1回転 (3分の1)。\n大きな 歯車は ゆっくり 回るが、力 (トルク) が 強くなる。介護ロボットの 関節には 大事な 原理。',
        },
        clue: { title: 'ギア比の 知識', desc: '歯数比 1:3 = 回転速度 3:1 (反比例)。力は 大きく なる。介護ロボットでは「力強い 動き」 が 必要。' },
      },
      // STEP 2: 관절 종류
      {
        id: 'step2', type: 'mc',
        title: '🦾 STEP 2: 関節の 自由度',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'メモに「自由度 6」 と 書かれている。' },
          { speaker: '杉田 博士', cls: 'sensei', charKey: 'ojiisan', text: '人間の 腕に 似せた ロボットは 普通 6自由度を 持つ。' },
        ],
        puzzle: {
          prompt: '人間の 腕に 近い ロボットアームの「自由度 6」 とは?',
          hint: '前後・上下・左右 の 移動 + 3つの 回転。',
          options: [
            '6種類の 部品で できている',
            '6つの 異なる 動き方が できる',
            '6kgまでの 物を 持てる',
            '時速 6kmで 動く',
          ],
          answer: 1,
          explanation: '自由度 (DoF: Degrees of Freedom) = ロボットが できる 独立した 動きの 数。\n人間の 腕 = 6自由度 (3つの 移動 + 3つの 回転)。\n介護ロボットには これが 必須。',
        },
        clue: { title: 'ロボット工学 専門知識', desc: '自由度 = 独立した 動きの 数。ロボット工学者の 基本知識。これを 知らない 人は 設計 できない。' },
      },
      // STEP 3: 모순
      {
        id: 'step3', type: 'mc',
        title: '⏰ STEP 3: 設計者の 知識',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '容疑者の 1人が こう 言った。' },
          { speaker: '容疑者', cls: 'suspect', charKey: 'villager3', text: '「歯車比 1:3 なら、A が 速いほど B も 速く なるはず…」' },
        ],
        puzzle: {
          prompt: '上の 発言は 正しい? STEP 1で 学んだ 事を 思い出そう。',
          hint: '歯数が 多い 歯車 (B) は ゆっくり 回る。「速くなる」 と 言うのは 間違い。',
          options: [
            '正しい',
            '間違い (歯数が 多い B は 遅く 回る)',
            '一部だけ 正しい',
            '判断不能',
          ],
          answer: 1,
          explanation: '歯車比 1:3 では、A が 速くなれば B も 速くなる が、B の 速度は 常に A の 1/3。\n「比例」 と 「同じ 速さ」 は 違う。基本中の 基本を 間違える 人物は ロボット工学者では ない。',
        },
        clue: { title: '専門家詐欺', desc: '専門家を 名乗りながら ギア比の 基本を 間違える 人物が いる。本当の 工学者か どうか 怪しい。' },
      },
    ],
    suspects: [
      {
        id: 'aoki', name: '青木 さん', icon: '👨‍🔬', charKey: 'tanaka',
        role: 'ロボット工学者 (12年目)',
        height: '175cm', clothes: '作業着',
        specialty: '関節機構・ギア設計',
        alibi: '昨夜は 工房で 試作品を 修理していた。',
        testimony: '歯車比 1:3 なら 回転速度は 3:1の 比に なる。これは 当然。',
      },
      {
        id: 'kawamura', name: '川村 さん', icon: '👨‍💼', charKey: 'villager3',
        role: '営業・技術連絡 (3年目)',
        height: '180cm', clothes: 'スーツ',
        specialty: '顧客対応 (技術は 表面的に 知っているだけ)',
        alibi: '昨夜は オフィスで 報告書を 書いていた。',
        testimony: 'ロボットの 営業を 担当している。技術 詳細は 専門外だが、歯車比 1:3 なら A が 速いほど B も 速く なる、よね?',
      },
      {
        id: 'hayashi', name: '林 さん', icon: '👩‍🔬', charKey: 'villager4',
        role: 'ソフトウェア技術者 (7年目)',
        height: '162cm', clothes: 'パーカー',
        specialty: '制御プログラム (機械部品は 専門外)',
        alibi: '昨夜は 自宅で コードを 書いていた。',
        testimony: '私は ソフトウェア。機械部品は 触らない。設計図を 持ち出しても 私には 使えない。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 設計図には ギア比 1:3、自由度 6 (専門知識 必要)\n② 容疑者:\n  ・青木: ロボット工学者 (ギア比を 正確に 説明)\n  ・川村: 営業 (ギア比の 基本を 間違えて 発言)\n  ・林: ソフト技術者 (機械専門外、設計図 持っても 使えないと 自ら 発言)\n③ 動機: 設計図を 売れば 大金。営業の 川村が 顧客 ネットワークを 持っている',
      question: '犯人は 誰?',
      hint: 'ギア比の 発言が 怪しい 人物 + 顧客との 繋がりが ある 人物 = ?',
      suspectIds: ['aoki', 'kawamura', 'hayashi'],
      answer: 'kawamura',
      explanation:
        '犯人は 川村 さん!\n\n' +
        '【推理】\n' +
        '① 川村は ギア比 1:3 で「Aが 速ければ Bも 速く なる」 と 発言 → 工学者なら 絶対 言わない 間違い\n' +
        '② 専門家ではない 川村が 設計図に 興味を 持つ 理由 → 顧客 (競合企業) に 売るため\n' +
        '③ 営業として 顧客 ネットワークを 持ち、設計図を 換金できる 立場\n' +
        '④ 青木は 専門家として 信頼できる、林は 機械専門外で 設計図に 興味 なし\n\n' +
        '川村 さんは 競合企業に 設計図を 売って 大金を 得ようと した。技術知識が 浅いことが 決定的な 手がかり に なった。',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '⚙️ ギア比: 歯数比と 回転速度は 反比例',
      '🦾 自由度 (DoF) = ロボットの 独立した 動きの 数',
      '🤖 人間の 腕に 似た ロボットアーム = 6自由度',
      '🔧 大きな 歯車 = ゆっくり 回るが 力が 強い',
      '🎯 「専門家のふり」 を 見抜くには 基本知識を 確認',
    ]},
    note: { title: '第8事件 ロボット工学研究所', desc: 'ギア比、自由度、ロボット工学の 基礎を 学んだ。' },
  },
  { id: 9, icon: '⚛️', title: '量子物理学者の 失踪', subtitle: '観測されない 真実', theme: '量子物理', bgm: 'sci_quantum',
    illustration: SCI_CASE_IMAGES[9],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: 'つくばの 量子物理学研究所。世界的に 有名な 量子物理学者・西川 教授が 突然 失踪した。' },
      { speaker: '所員', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、西川 教授が 昨夜から 行方不明だ。机の 上に 不思議な メモが 残されていた。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'メモには なんと?' },
      { speaker: '所員', cls: 'sensei', charKey: 'ojiisan',
        text: '「シュレーディンガーの 猫を 解放した。観測されない 場所へ。」 と 書かれている。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'シュレーディンガーの 猫?なんで 猫が 関係 あるの?' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'これは 量子物理学の 思考実験だよ。事件の 鍵は ここに ある。' },
      { speaker: '所員', cls: 'sensei', charKey: 'ojiisan',
        text: '研究室の 同僚 3人が 容疑者。教授と 仕事で 関わっていた。' },
    ],
    steps: [
      // STEP 1: シュレーディンガーの 猫
      {
        id: 'step1', type: 'mc',
        title: '🐱 STEP 1: 量子の 思考実験',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '「シュレーディンガーの 猫」 は 有名な 思考実験。' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '思考実験?頭の 中で する 実験?' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'そう。箱の 中の 猫が「生きている」 と「死んでいる」 が 同時に 存在する 状態を 想定する。' },
        ],
        puzzle: {
          prompt: 'シュレーディンガーの 猫の 思考実験で、箱の 中の 猫の 状態が 確定するのは いつ?',
          hint: '量子力学では 「観測する 瞬間」 に 状態が 決まる。',
          options: [
            '実験を 始めた 瞬間',
            '1時間 経った 時',
            '箱を 開けて 観測した 瞬間',
            '猫が 鳴いた 時',
          ],
          answer: 2,
          explanation: '量子力学では 観測されるまで 状態は 重ね合わせ (生 + 死)。観測 (箱を 開ける) の 瞬間に 1つに 確定する。これは 「観測問題」 と 呼ばれる 量子力学の 不思議な 性質。',
        },
        clue: { title: '量子の 観測問題', desc: '量子の 状態は 観測まで 確定しない。教授の メモ「観測されない 場所」 = 観測されたく ない = 隠れたい?' },
      },
      // STEP 2: 不確定性原理
      {
        id: 'step2', type: 'mc',
        title: '⚛️ STEP 2: 不確定性原理',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'もう 1つ 量子物理の 重要な 原理が ある。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'ハイゼンベルクの 「不確定性原理」 だ。' },
        ],
        puzzle: {
          prompt: 'ハイゼンベルクの 不確定性原理 とは?',
          hint: '電子の 「位置」 と 「速度」 を 同時に 完全に 知ることは できない。',
          options: [
            '光より 速い 物は 存在 しない',
            '位置と 運動量を 同時に 正確に 測ることは できない',
            'エネルギーは 保存される',
            '宇宙は 膨張している',
          ],
          answer: 1,
          explanation: '不確定性原理 = 量子の 「位置 (どこに いるか)」 と 「運動量 (どう 動くか)」 を 同時に 完全に 測ることは 不可能。これが 量子力学の 基本原理 の 1つ。',
        },
        clue: { title: '量子物理 専門知識', desc: '不確定性原理は 量子物理の 基本中の 基本。専門家なら 即答 できる。' },
      },
      // STEP 3: 教授の メッセージ 解読
      {
        id: 'step3', type: 'mc',
        title: '🔍 STEP 3: 真実の 解読',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'メモの 「観測されない 場所へ」 が 鍵だ。' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '量子物理学者なら、これを 比喩として 使うはず。' },
        ],
        puzzle: {
          prompt: '「観測されない 場所へ 行った」 = 教授の 真意は?',
          hint: '量子では 観測=確定。観測されない=確定しない=自由。教授は 何から 逃れたかった?',
          options: [
            '実験室から 物理的に 逃げた',
            '誰にも 見られない場所で 自由に 研究したい (誰かに 妨害されていた)',
            '宇宙に 行った',
            '別の 次元へ',
          ],
          answer: 1,
          explanation: '教授は 比喩で「監視・妨害から 自由になりたい」 と 言っていた。つまり 誰かに 研究を 邪魔されていて、隠れる 必要が あった。\n動機: 教授の 研究を 盗もう として いた 同僚?',
        },
        clue: { title: '失踪の 理由', desc: '教授は 自発的に 隠れた 可能性が 高い。誰かが 教授の 研究を 盗もうと していた。' },
      },
    ],
    suspects: [
      {
        id: 'minamida', name: '南田 さん', icon: '👨‍🔬', charKey: 'tanaka',
        role: '量子物理 助手 (10年目)',
        height: '170cm', clothes: '白衣',
        specialty: '量子もつれ (専門中の 専門)',
        alibi: '昨夜は 自分の 実験で 忙しかった。',
        testimony: '不確定性原理は 当然 知っている。教授とは 良い 関係だった。',
      },
      {
        id: 'okazaki', name: '岡崎 さん', icon: '👨‍🎓', charKey: 'villager3',
        role: '客員研究員 (1年目)',
        height: '175cm', clothes: 'カジュアル',
        specialty: '理論物理 一般 (量子は 専門外)',
        alibi: '夜は 自分の オフィスに いた。',
        testimony: '不確定性原理? それは…まあ、エネルギー保存の 法則の ような ものだろう?',
      },
      {
        id: 'kuroda', name: '黒田 さん', icon: '👨‍💼', charKey: 'villager2',
        role: '研究費管理 (5年目)',
        height: '178cm', clothes: 'スーツ',
        specialty: '事務 (物理は 専門外)',
        alibi: '夜は 経理処理の 残業を していた。',
        testimony: '私は 経理担当。物理の 中身は 分かりません。教授の 研究内容も 詳しく 知りません。',
      },
    ],
    finalQ: {
      prompt: '🔍 手がかりを 総合しよう!\n\n📌 手がかり:\n① 教授は 自発的に 隠れた (「観測されない 場所」 という 比喩)\n② 動機: 誰かが 教授の 研究を 盗もう と していた\n③ 容疑者の 専門:\n  ・南田: 量子もつれ (専門の 専門) - 教授と 良好\n  ・岡崎: 理論物理 (量子は 専門外、不確定性原理を「エネルギー保存」 と 混同)\n  ・黒田: 経理 (物理 専門外、自分も そう 主張)\n④ 専門外なのに 教授の 研究に 興味を 示す = 怪しい',
      question: '犯人 (教授を 妨害していた 人物) は 誰?',
      hint: '量子の 基本知識を 間違えながら 教授の 研究に 関わっていた 人物。\n専門外なら 普通 興味が 薄い はず。',
      suspectIds: ['minamida', 'okazaki', 'kuroda'],
      answer: 'okazaki',
      explanation:
        '犯人は 岡崎 さん!\n\n' +
        '【推理】\n' +
        '① 岡崎は「量子物理 専門外」 と 言いながら、不確定性原理を「エネルギー保存」 と 混同 (基本知識ゼロ)\n' +
        '② 専門外なのに 客員研究員として 教授の 部屋に 出入り → 研究を 盗もう としていた\n' +
        '③ 南田は 量子もつれ専門で 信頼できる、黒田は 経理で 物理に 興味なし\n' +
        '④ 教授は 岡崎の 行動を 察知し、研究データを 守るため 一時的に 隠れた\n\n' +
        '岡崎 さんは 別の 国の 研究機関に 教授の 研究を 売ろう として いた。教授は 自分の 量子コンピュータ研究が 盗まれる 危機を 感じ、「観測されない 場所」 (= 公的に 把握 できない 場所) で 研究を 続けようと した。\n\n' +
        '無事に 教授と 連絡が 取れ、研究も 守られた!',
    },
    learned: { title: '📚 この 事件で 学んだこと', points: [
      '🐱 シュレーディンガーの 猫: 観測まで 状態は 重ね合わせ',
      '👁️ 観測問題: 量子は 観測の 瞬間に 確定する',
      '⚛️ 不確定性原理: 位置と 運動量を 同時に 完全には 知れない',
      '🧠 比喩を 使った メッセージの 解読',
      '🔬 専門外の 人が 専門用語を 使う 違和感',
    ]},
    note: { title: '第9事件 量子物理学研究所', desc: '量子の 観測問題、不確定性原理、量子物理の 基礎を 学んだ。' },
  },
  { id: 10, icon: '🏆', title: 'ノーベル賞の 影', subtitle: 'ボス: すべての 真実', theme: '総合', bgm: 'sci_boss',
    illustration: SCI_CASE_IMAGES[10],
    intro: [
      { speaker: 'ナレーター', cls: 'narrator', charKey: null,
        text: '京都の ノーベル賞 授賞記念式典。会場で 信じられない 事件が 起きた。' },
      { speaker: '式典 主催者', cls: 'sensei', charKey: 'ojiisan',
        text: 'ハル君、リオ君、本当に 困っている。今年 ノーベル賞を 受賞した 4つの 研究 すべての データに 不正の 疑いが かかった。' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '4つ 全部?それは 大事件です!' },
      { speaker: '式典 主催者', cls: 'sensei', charKey: 'ojiisan',
        text: '化学賞、物理学賞、生理学・医学賞、そして 物理学 第二賞。受賞者 4人が それぞれ「他の 受賞者の 不正」 を 告発した。' },
      { speaker: 'リオ', cls: 'rio', charKey: 'rio',
        text: 'みんなが お互いを 疑ってる の?ややこしい!' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: 'これは 中ボス事件より 難しい…1人だけ 嘘を ついている 可能性が あります。' },
      { speaker: '式典 主催者', cls: 'sensei', charKey: 'ojiisan',
        text: '時間が ない。式典開始まで 1時間。今までの 知識 全てを 使って 真実を 暴いてくれ!' },
      { speaker: 'ハル', cls: 'haru', charKey: 'haru',
        text: '化学・物理・生物・天文…これまで 学んだ 全てが 役に 立ちます。挑戦します!' },
    ],
    steps: [
      // STEP 1: 化学賞
      {
        id: 'step1', type: 'mc',
        title: '⚗️ STEP 1: 化学賞の 検証',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'まず 化学賞の 受賞者・西野 教授の 研究を 確認しよう。' },
          { speaker: '西野 教授', cls: 'suspect', charKey: 'tanaka', text: '私の 研究は 「金 (Au) を 使った 新しい 触媒」。原子量は 79 で 軽い 元素を 扱う ものだ。' },
        ],
        puzzle: {
          prompt: '西野 教授の 発言は 正しい?第1事件で 学んだ ことを 思い出そう。',
          hint: '金 (Au) の 原子番号は 79、原子量は 約 197。これは 重い 元素。',
          options: [
            '正しい',
            '間違い (Au の 原子量は 197、79 は 原子番号)',
            '一部だけ 正しい',
            '判断不能',
          ],
          answer: 1,
          explanation: 'Au の 原子番号 = 79、原子量 = 約 197。西野 教授は「原子量 79」 と 言ったが これは 原子番号。\nノーベル化学賞を 取った 人物が 基本を 間違えるのは 不自然。怪しい!',
        },
        clue: { title: '化学賞の 矛盾', desc: '西野 教授は 金の 原子量と 原子番号を 混同。化学賞 受賞者として 異常。' },
      },
      // STEP 2: 物理学賞
      {
        id: 'step2', type: 'mc',
        title: '⚛️ STEP 2: 物理学賞の 検証',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '次は 物理学賞の 河野 博士。' },
          { speaker: '河野 博士', cls: 'suspect', charKey: 'villager3', text: '私は 光速度 c の 新測定で 受賞。c は 約 3×10⁸ m/秒、月までは 光で 約 1.3秒で 到達する。' },
        ],
        puzzle: {
          prompt: '河野 博士の 発言は 正しい?',
          hint: '第4事件で 学んだ。光速 = 3×10⁸ m/秒、月まで 約 38万km。',
          options: [
            '正しい',
            '間違い',
            '一部だけ 正しい',
            '判断不能',
          ],
          answer: 0,
          explanation: '光速 c = 3×10⁸ m/秒 は 正しい。月まで 38万km ÷ 30万km/秒 ≒ 1.27秒 ≒ 1.3秒も 正しい。\n河野 博士の 発言は 完全に 正確。',
        },
        clue: { title: '物理学賞: 信頼できる', desc: '河野 博士の 知識は 正確。物理学賞は 真の 受賞者の 可能性が 高い。' },
      },
      // STEP 3: 生理学・医学賞
      {
        id: 'step3', type: 'mc',
        title: '🧬 STEP 3: 医学賞の 検証',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '医学賞の 守屋 博士は どうかな。' },
          { speaker: '守屋 博士', cls: 'suspect', charKey: 'villager4', text: '私は DNAの 新しい 修復メカニズムを 発見。塩基は A・T・G・C の 4つで、Aは Gと、Tは Cと ペアに なる。' },
        ],
        puzzle: {
          prompt: '守屋 博士の 発言の 中で 間違いは ある?',
          hint: '第3事件で 学んだ DNAの 塩基対を 思い出そう。',
          options: [
            '間違いない',
            '塩基対が 違う (正しくは A-T、G-C)',
            'DNAの 塩基は 5つ',
            '判断不能',
          ],
          answer: 1,
          explanation: 'DNAの 塩基対は A-T、G-C が 正解。守屋 博士は「A-G、T-C」 と 言って 間違えた。\n医学賞の 受賞者が 高校生でも 知っている DNAの 基本を 間違えるのは あり得ない。',
        },
        clue: { title: '医学賞の 矛盾', desc: '守屋 博士は DNAの 塩基対を 間違えた。医学賞 受賞者として 不自然。' },
      },
      // STEP 4: 物理学 第二賞 (天文)
      {
        id: 'step4', type: 'mc',
        title: '🔭 STEP 4: 天文学の 検証',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '最後は 物理学 第二賞 (天文部門) の 大谷 教授。' },
          { speaker: '大谷 教授', cls: 'suspect', charKey: 'villager2', text: '私の 研究は 火星の 衝の 観測。衝の 時 火星は 真夜中に 真南で 一番 高く 見える。' },
        ],
        puzzle: {
          prompt: '大谷 教授の 発言は 正しい?',
          hint: '第2事件で 学んだ。「衝」 = 太陽-地球-惑星 が 一直線。',
          options: [
            '正しい',
            '間違い',
            '一部だけ 正しい',
            '判断不能',
          ],
          answer: 0,
          explanation: '「衝」 では 火星は 太陽の 反対側に あり、真夜中に 真南で 一番 高く 見える。完全に 正確。',
        },
        clue: { title: '天文学賞: 信頼できる', desc: '大谷 教授の 発言は 正確。天文学賞も 真の 受賞者の 可能性が 高い。' },
      },
      // STEP 5: 全体の 真相
      {
        id: 'step5', type: 'mc',
        title: '🎯 STEP 5: 最終 推理',
        intro: [
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: 'ここで 重要な 事実が ある。' },
          { speaker: 'リオ', cls: 'rio', charKey: 'rio', text: '何?お兄ちゃん!' },
          { speaker: 'ハル', cls: 'haru', charKey: 'haru', text: '今 4人が お互いを 告発している。でも 実は 真の 偽者は 1人。残り 3人は 本物だが お互いを 信じていない。' },
        ],
        puzzle: {
          prompt: '4人の うち、誰が「他の 3人 全員」 を 告発する 動機を 持つ?',
          hint: '自分が 偽者なら、他人の 注意を 逸らすため 全員を 告発する 戦略。\n本物なら 1人 (本当の 怪しい 人) を 告発する はず。',
          options: [
            '本物の 受賞者',
            '偽者の 受賞者 (注意を 全員に 分散)',
            '主催者',
            '観客',
          ],
          answer: 1,
          explanation: '偽者は 全員を 告発して「みんな 怪しい」 という 状況を 作り、自分が 紛れる ように する。\n本物の 受賞者は 真の 偽者 1人だけを 告発する はず。',
        },
        clue: { title: '心理戦の 鍵', desc: '4人 全員を 告発する 行動は 偽者の 戦略。誰が「全員告発」 を 始めた?' },
      },
    ],
    suspects: [
      {
        id: 'nishino', name: '西野 教授', icon: '👨‍🏫', charKey: 'tanaka',
        role: '化学賞 受賞者',
        height: '170cm', clothes: '正装',
        specialty: '触媒化学',
        alibi: '式典準備で 一日中 会場に いた。',
        testimony: '私が 最初に 不正を 告発した。他の 3人 全員が 怪しい!',
      },
      {
        id: 'kawano', name: '河野 博士', icon: '👨‍🔬', charKey: 'villager3',
        role: '物理学賞 受賞者',
        height: '175cm', clothes: '正装',
        specialty: '光速度の 精密測定',
        alibi: '研究室から 直接 会場に 来た。',
        testimony: '不正を しているのは 西野 教授 1人だと 思う。他は 信頼できる。',
      },
      {
        id: 'moriya', name: '守屋 博士', icon: '👩‍🔬', charKey: 'villager4',
        role: '生理学・医学賞 受賞者',
        height: '163cm', clothes: '正装',
        specialty: 'DNA研究',
        alibi: '昨夜は ホテルに 滞在。',
        testimony: '怪しいのは 西野 教授だけ。他の 2人は 立派な 学者。',
      },
      {
        id: 'otani', name: '大谷 教授', icon: '👨‍🚀', charKey: 'villager2',
        role: '物理学 第二賞 (天文部門) 受賞者',
        height: '180cm', clothes: '正装',
        specialty: '天文観測',
        alibi: '天文台から 朝に 到着。',
        testimony: '私が 怪しいと 思うのは 西野 教授。彼の 化学知識は 怪しい。',
      },
    ],
    finalQ: {
      prompt: '🔍 ボス事件 - すべての 知識を 使って 真実を 暴け!\n\n📌 手がかりの 総合:\n\n【知識検証】\n① 西野 (化学): 金の 原子量と 原子番号を 混同 ← ❌間違い\n② 河野 (物理): 光速・月まで 1.3秒 ← ✅正確\n③ 守屋 (医学): DNA塩基対を 間違えた ← ❌間違い\n④ 大谷 (天文): 火星の 衝を 正確 ← ✅正確\n\n【告発パターン】\n・西野: 「他の 3人 全員」 を 告発\n・河野: 西野 だけを 告発\n・守屋: 西野 だけを 告発\n・大谷: 西野 だけを 告発\n\n→ 知識誤りが 2人?でも 全員告発を したのは 1人だけ',
      question: '本当の 偽者は 誰?',
      hint: '2つの 異常: ①基本知識を 間違えた ②全員を 告発した\n両方 該当する 人物が 真犯人!\n\n守屋 (医学) も 間違えたが、彼女は「西野 1人」 を 告発したから 本物が 単に 緊張で 言い間違えた可能性。\n両方 該当 = ?',
      suspectIds: ['nishino', 'kawano', 'moriya', 'otani'],
      answer: 'nishino',
      explanation:
        '真の 偽者は 西野 教授!\n\n' +
        '【最終推理】\n' +
        '① 知識検証: 西野は 金 (化学賞 専門!) の 基本を 間違えた → 化学者ではない\n' +
        '② 告発パターン: 西野だけが「全員」 を 告発 → 自分への 注意を 逸らす 戦略\n' +
        '③ 守屋も 知識を 間違えたが、彼女は 西野 1人を 告発 → 緊張で 言い間違えただけ\n' +
        '④ 河野・大谷は 完全に 正確な 知識\n\n' +
        '【真相】\n' +
        '西野 教授は 本物の 化学者ではなく、論文を 盗用して 受賞した 偽者。\n他の 3人 全員を 告発する ことで 混乱を 作り、自分が 紛れ込もう と した。\n\n' +
        'しかし、化学者の 基本知識 (金の 原子量) を 知らない という 致命的な 矛盾を 残した。\n\n' +
        '🏆 ハル と リオ、ノーベル賞を 守った!\n科学の 真実は、すべての 学んだ 知識の 力で 守られる。',
    },
    learned: { title: '🏆 ボス事件で 学んだこと (集大成)', points: [
      '⚗️ 化学: Au = 原子番号79、原子量197',
      '🔭 天文: 火星の 衝 = 真夜中の 真南',
      '🧬 生物: DNA塩基対 A-T、G-C',
      '⚛️ 物理: 光速 3×10⁸ m/秒、月まで 1.3秒',
      '💊 医学: アスピリン C₉H₈O₄ = 分子量180',
      '🌦️ 気象: 風速単位 m/s、台風中心 950 hPa',
      '🤖 工学: ギア比は 反比例、自由度 = 動きの 数',
      '🐱 量子: 観測まで 状態は 重ね合わせ',
      '🦴 古生物: 鳥は 獣脚類から 進化',
      '🎯 心理戦: 全員告発 = 真犯人の 戦略',
      '🏆 学んだ 全ての 知識を 統合して 真実を 見つける!',
    ]},
    note: { title: '第10事件 ノーベル賞 (ボス)', desc: '1~9事件で 学んだ 全ての 科学知識を 使って 解決した 集大成。' },
  },
];


