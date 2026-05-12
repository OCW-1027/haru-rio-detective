/* data/series4-scientists-learn.js — 시리즈 4 偉人科学者ファイル 학습 자료 데이터
 *
 * Schema is the SPEC-defined SCIENTISTS_LEARN pattern (SERIES4_CONTENT_SPEC.md §5):
 *   concept     : { title, paragraphs, highlight }
 *   diagrams    : [{ title, svg }]
 *   formulas    : [{ name, formula, formulaSimple, explanation, note }]
 *   unitsTable  : { title, rows: [headerRow, ...dataRows] }
 *   flashcards  : [{ front, back }]
 *   exercises   : [{ q, options, correct, explanation }]
 *   tips        : [{ title, body }]
 *
 * Inspired by data/series11-math-learn.js (MATH_LEARN) UX/section pattern,
 * but field names follow SPEC §5 schema. Engine renderer in
 * engine/scientists-learn.js consumes these keys directly.
 *
 * 사건 1만 작성. 사건 2~10은 향후 별도 명세서에서 추가.
 */
const SCIENTISTS_LEARN = {
  scientists_case01: {
    title: '万有引力と 運動の 法則',
    subtitle: '事件 1 で 学んだ こと',
    examScope: '中学 物理 基礎 + 英検 2級 科学常識',

    concept: {
      title: '万有引力って なに?',
      paragraphs: [
        '宇宙にある すべての 物には、お互いに 引きつけ合う 力が あります。 これを 「万有引力(ばんゆういんりょく)」 と いいます。',
        '私たちが 地面に 立って いられる のも、林檎が 木から 落ちる のも、月が 地球の 周りを 回って いる のも、すべて 万有引力の おかげです。',
        '中でも、地球が 物を 引きつける 力の こと を 特に 「重力(じゅうりょく)」 と 呼びます。',
        'この 力は、物の 重さに 関係なく、すべての 物に 同じ ように 働きます。 重い 鉄の 球も、軽い 羽毛も、空気の 抵抗が なければ 同じ 速さで 落ちる のです。',
      ],
      highlight: '落ちない 物体が あると したら、それは 重力に 勝つ 別の 力が 働いて いる という こと。',
    },

    diagrams: [
      {
        title: '①  林檎が 落ちる 理由 — 地球が 引く',
        svg: `
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:380px;height:auto;background:#fff8e8;border-radius:12px;">
            <text x="200" y="24" font-size="14" font-weight="bold" text-anchor="middle" fill="#7a4a1a">林檎が 落ちる の は、地球が 引っ張る から</text>
            <!-- 林檎 -->
            <circle cx="200" cy="80" r="22" fill="#e74c3c" stroke="#7a1f1f" stroke-width="2"/>
            <path d="M 200 58 Q 205 50 213 50" stroke="#5a8a2a" stroke-width="3" fill="none"/>
            <text x="200" y="86" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">林檎</text>
            <!-- 화살표 -->
            <line x1="200" y1="110" x2="200" y2="190" stroke="#2c3e50" stroke-width="4" marker-end="url(#ah1)"/>
            <text x="232" y="155" font-size="14" font-weight="bold" fill="#2c3e50">重力</text>
            <text x="232" y="173" font-size="11" fill="#2c3e50">(じゅうりょく)</text>
            <!-- 地球 -->
            <circle cx="200" cy="250" r="42" fill="#3498db" stroke="#1a4a7a" stroke-width="2"/>
            <text x="200" y="258" font-size="13" text-anchor="middle" fill="#fff" font-weight="bold">地球</text>
            <!-- 점선 화살표 (서로 끌어당김) -->
            <line x1="200" y1="208" x2="200" y2="118" stroke="#2c3e50" stroke-width="1.5" stroke-dasharray="4 3" marker-end="url(#ah1)"/>
            <text x="98" y="170" font-size="11" fill="#1a4a5a">地球も 林檎を</text>
            <text x="98" y="184" font-size="11" fill="#1a4a5a">引いて いる</text>
            <defs>
              <marker id="ah1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#2c3e50"/>
              </marker>
            </defs>
          </svg>
        `,
      },
      {
        title: '②  万有引力 — すべての 物が 引き合う',
        svg: `
          <svg viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:380px;height:auto;background:#f0eaff;border-radius:12px;">
            <text x="200" y="24" font-size="14" font-weight="bold" text-anchor="middle" fill="#4a2a8a">万有引力 — お互いに 引き合う</text>
            <!-- 地球 -->
            <circle cx="110" cy="110" r="48" fill="#3498db" stroke="#1a4a7a" stroke-width="2"/>
            <text x="110" y="116" font-size="14" text-anchor="middle" fill="#fff" font-weight="bold">地球</text>
            <!-- 달 -->
            <circle cx="310" cy="110" r="22" fill="#bdbdbd" stroke="#5a5a5a" stroke-width="2"/>
            <text x="310" y="115" font-size="11" text-anchor="middle" fill="#1a1a1a" font-weight="bold">月</text>
            <!-- 양방향 화살표 -->
            <line x1="158" y1="110" x2="288" y2="110" stroke="#7c3aed" stroke-width="3" marker-start="url(#ah2)" marker-end="url(#ah2)"/>
            <text x="223" y="100" font-size="11" font-weight="bold" text-anchor="middle" fill="#5b21b6">万有引力</text>
            <text x="200" y="172" font-size="11" text-anchor="middle" fill="#4a2a8a">地球も 月も お互いに 引き合って いる</text>
            <!-- 사람들 -->
            <line x1="140" y1="280" x2="140" y2="250" stroke="#1a4a5a" stroke-width="2"/>
            <circle cx="140" cy="246" r="6" fill="#1a4a5a"/>
            <line x1="140" y1="265" x2="125" y2="278" stroke="#1a4a5a" stroke-width="2"/>
            <line x1="140" y1="265" x2="155" y2="278" stroke="#1a4a5a" stroke-width="2"/>
            <line x1="140" y1="258" x2="155" y2="262" stroke="#1a4a5a" stroke-width="2"/>
            <line x1="260" y1="280" x2="260" y2="250" stroke="#1a4a5a" stroke-width="2"/>
            <circle cx="260" cy="246" r="6" fill="#1a4a5a"/>
            <line x1="260" y1="265" x2="245" y2="278" stroke="#1a4a5a" stroke-width="2"/>
            <line x1="260" y1="265" x2="275" y2="278" stroke="#1a4a5a" stroke-width="2"/>
            <line x1="260" y1="258" x2="245" y2="262" stroke="#1a4a5a" stroke-width="2"/>
            <line x1="160" y1="260" x2="240" y2="260" stroke="#a06ad8" stroke-width="1.5" stroke-dasharray="4 3" marker-start="url(#ah2)" marker-end="url(#ah2)"/>
            <text x="200" y="252" font-size="10" text-anchor="middle" fill="#4a2a8a">人と 人の 間にも(ごく 弱い)</text>
            <text x="200" y="320" font-size="11" font-weight="bold" text-anchor="middle" fill="#4a2a8a">実は あらゆる 物の 間に 万有引力が 働いて いる!</text>
            <defs>
              <marker id="ah2" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0 L9,4.5 L0,9 Z" fill="#7c3aed"/>
              </marker>
            </defs>
          </svg>
        `,
      },
      {
        title: '③  力の 釣り合い — 事件 1 の 核心',
        svg: `
          <svg viewBox="0 0 350 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:340px;height:auto;background:#e8f7f2;border-radius:12px;">
            <text x="175" y="24" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a6a5a">力の 釣り合い (つりあい)</text>
            <!-- 위쪽 磁石 박스 -->
            <rect x="135" y="50" width="80" height="34" fill="#444" stroke="#1a1a1a" stroke-width="2" rx="4"/>
            <text x="175" y="71" font-size="13" text-anchor="middle" fill="#fff" font-weight="bold">磁石 (N)</text>
            <!-- 위 방향 화살표 (반발력) -->
            <line x1="175" y1="180" x2="175" y2="100" stroke="#e74c3c" stroke-width="5" marker-end="url(#ah3)"/>
            <text x="200" y="148" font-size="13" font-weight="bold" fill="#e74c3c">磁石の</text>
            <text x="200" y="166" font-size="13" font-weight="bold" fill="#e74c3c">反発力</text>
            <!-- 林檎 (떠 있음) -->
            <circle cx="175" cy="200" r="22" fill="#e74c3c" stroke="#7a1f1f" stroke-width="2"/>
            <path d="M 175 178 Q 180 170 188 170" stroke="#5a8a2a" stroke-width="3" fill="none"/>
            <text x="175" y="206" font-size="13" text-anchor="middle" fill="#fff" font-weight="bold">林檎</text>
            <text x="232" y="206" font-size="11" font-weight="bold" fill="#1a6a5a">空中で 静止</text>
            <!-- 等号 -->
            <text x="80" y="208" font-size="20" font-weight="bold" fill="#1a6a5a">=</text>
            <text x="80" y="234" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a5a">釣り合い</text>
            <!-- 아래 방향 화살표 (重力) -->
            <line x1="175" y1="220" x2="175" y2="300" stroke="#2c3e50" stroke-width="5" marker-end="url(#ah3)"/>
            <text x="200" y="258" font-size="13" font-weight="bold" fill="#2c3e50">重力</text>
            <text x="200" y="276" font-size="11" fill="#2c3e50">(万有引力)</text>
            <!-- 地球 -->
            <ellipse cx="175" cy="345" rx="100" ry="22" fill="#a0c8e8" stroke="#1a4a7a" stroke-width="2"/>
            <text x="175" y="352" font-size="11" text-anchor="middle" fill="#1a4a5a" font-weight="bold">地球</text>
            <text x="175" y="390" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a5a">二つの 力が つり合う と、物は 動かない</text>
            <defs>
              <marker id="ah3" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0 L9,4.5 L0,9 Z" fill="currentColor"/>
              </marker>
            </defs>
          </svg>
        `,
      },
      {
        title: '④  ニュートンの 三法則',
        svg: `
          <svg viewBox="0 0 600 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:580px;height:auto;background:#fff5e8;border-radius:12px;">
            <text x="300" y="24" font-size="14" font-weight="bold" text-anchor="middle" fill="#8a4a1a">ニュートンの 三法則</text>
            <!-- 1: 慣性 -->
            <g transform="translate(20,50)">
              <rect x="0" y="0" width="170" height="150" fill="#fff" stroke="#8a4a1a" stroke-width="2" rx="8"/>
              <text x="85" y="22" font-size="13" font-weight="bold" text-anchor="middle" fill="#8a4a1a">① 慣性の 法則</text>
              <circle cx="50" cy="65" r="14" fill="#e74c3c"/>
              <text x="50" y="69" font-size="10" text-anchor="middle" fill="#fff">止</text>
              <text x="50" y="92" font-size="10" text-anchor="middle" fill="#1a1a1a">そのまま</text>
              <circle cx="120" cy="65" r="14" fill="#e74c3c"/>
              <line x1="120" y1="65" x2="150" y2="65" stroke="#1a4a5a" stroke-width="2" marker-end="url(#ah4)"/>
              <text x="120" y="92" font-size="10" text-anchor="middle" fill="#1a1a1a">等速で</text>
              <text x="85" y="135" font-size="10" text-anchor="middle" fill="#5a5a5a">力 ゼロ なら</text>
              <text x="85" y="148" font-size="10" text-anchor="middle" fill="#5a5a5a">状態は 変わらない</text>
            </g>
            <!-- 2: 運動 -->
            <g transform="translate(215,50)">
              <rect x="0" y="0" width="170" height="150" fill="#fff" stroke="#8a4a1a" stroke-width="2" rx="8"/>
              <text x="85" y="22" font-size="13" font-weight="bold" text-anchor="middle" fill="#8a4a1a">② 運動の 法則</text>
              <circle cx="50" cy="80" r="16" fill="#e74c3c"/>
              <line x1="20" y1="80" x2="42" y2="80" stroke="#2c3e50" stroke-width="3" marker-end="url(#ah4)"/>
              <text x="33" y="65" font-size="11" font-weight="bold" text-anchor="middle" fill="#2c3e50">F</text>
              <line x1="66" y1="80" x2="120" y2="80" stroke="#1a6a5a" stroke-width="3" marker-end="url(#ah4)"/>
              <text x="93" y="68" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a5a">a</text>
              <text x="85" y="125" font-size="13" font-weight="bold" text-anchor="middle" fill="#5b21b6">F = m × a</text>
              <text x="85" y="143" font-size="9" text-anchor="middle" fill="#5a5a5a">力 = 質量 × 加速度</text>
            </g>
            <!-- 3: 作用·反作用 -->
            <g transform="translate(410,50)">
              <rect x="0" y="0" width="170" height="150" fill="#fff" stroke="#8a4a1a" stroke-width="2" rx="8"/>
              <text x="85" y="22" font-size="13" font-weight="bold" text-anchor="middle" fill="#8a4a1a">③ 作用·反作用</text>
              <circle cx="55" cy="75" r="13" fill="#e74c3c"/>
              <circle cx="115" cy="75" r="13" fill="#3498db"/>
              <line x1="68" y1="75" x2="102" y2="75" stroke="#2c3e50" stroke-width="2" marker-end="url(#ah4)"/>
              <line x1="102" y1="90" x2="68" y2="90" stroke="#2c3e50" stroke-width="2" marker-end="url(#ah4)"/>
              <text x="85" y="120" font-size="11" font-weight="bold" text-anchor="middle" fill="#5b21b6">同じ 大きさ</text>
              <text x="85" y="138" font-size="11" font-weight="bold" text-anchor="middle" fill="#5b21b6">逆向き で 必ず ペア</text>
            </g>
            <defs>
              <marker id="ah4" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                <path d="M0,0 L7,3.5 L0,7 Z" fill="#2c3e50"/>
              </marker>
            </defs>
          </svg>
        `,
      },
    ],

    formulas: [
      {
        name: '重力 (じゅうりょく)',
        formula: '重さ = 質量 × 重力加速度',
        formulaSimple: 'W = m × g',
        explanation: '物の「重さ」は、その 物の「質量」に 地球の「重力加速度 (g ≈ 9.8 m/s²)」を かけた もの。',
        note: '質量 (kg) と 重さ (N: ニュートン) は 別の 概念。 月では 重力加速度が 小さい ので、同じ 質量でも 重さは 軽く なる。',
      },
      {
        name: 'ニュートンの 運動方程式',
        formula: '力 = 質量 × 加速度',
        formulaSimple: 'F = m × a',
        explanation: '物に どれだけの 力が 加わる と、どれだけ 速度が 変わる かを 表す 式。',
        note: '中学では 概念だけ 覚えて おけば 十分。 高校で 詳しく 扱う。',
      },
    ],

    unitsTable: {
      title: '単位の まとめ',
      rows: [
        ['量', '記号', '単位', '意味'],
        ['質量',       'm', 'kg (キログラム)',           '物の 量 そのもの'],
        ['重さ',       'W', 'N (ニュートン)',             '重力による 力'],
        ['加速度',     'a', 'm/s² (メートル毎秒毎秒)',    '速度の 変化の 速さ'],
        ['力',         'F', 'N (ニュートン)',             '物を 動かそうとする はたらき'],
        ['重力加速度', 'g', 'm/s² (約 9.8)',              '地球上での 重力の 強さ'],
      ],
    },

    flashcards: [
      { front: '万有引力 (ばんゆういんりょく)',     back: '宇宙に ある すべての 物が お互いに 引きつけ合う 力。 英: gravity / universal gravitation' },
      { front: '重力 (じゅうりょく)',               back: '地球が 物を 引きつける 力。 万有引力の 一種。' },
      { front: '質量 (しつりょう)',                 back: '物の 量 そのもの。 単位は kg。 場所が 変わっても 変わらない。' },
      { front: '重さ (おもさ)',                     back: '重力に よって 物に かかる 力。 単位は N (ニュートン)。 月では 地球の 約 1/6 に なる。' },
      { front: '慣性 (かんせい)',                   back: '物が 今の 状態 (静止 or 等速直線運動) を 保とう とする 性質。 ニュートン 第一法則。' },
      { front: '加速度 (かそくど)',                 back: '速度が どれだけ 速く 変化して いる か。 単位は m/s²。' },
      { front: '作用·反作用の 法則',                back: '力は 必ず 対で 働く。 A が B を 押す と、B も A を 同じ 大きさで 押し返す。 ニュートン 第三法則。' },
      { front: '力の 釣り合い (ちからのつりあい)', back: '複数の 力が 打ち消し合って、合計が ゼロに なって いる 状態。 物は 静止 または 等速で 動く。' },
      { front: '落体 (らくたい)',                   back: '重力に よって 落ちる 物体。 空気の 抵抗が なければ、重さに 関係なく 同じ 速さで 落ちる。' },
      { front: 'アイザック·ニュートン',             back: 'イギリスの 科学者 (1642-1727)。 万有引力と 運動の 三法則を 発見した。 林檎が 落ちる のを 見た という 逸話が 有名。' },
    ],

    exercises: [
      {
        q: '次の うち、「万有引力」の 説明と して 正しい もの は どれ?',
        options: ['地球だけが 持つ 特別な 力', '宇宙に ある すべての 物が お互いに 引き合う 力', '磁石が 他の 物を 引きつける 力', '風が 物を 押す 力'],
        correct: 1,
        explanation: '万有引力 は 「万物が 有する 引力」。 すべての 物の 間に 働く。',
      },
      {
        q: '質量 60kg の 人が 月に 行くと、月での「重さ」は どう なる? (月の 重力は 地球の 約 1/6)',
        options: ['60kg の まま', '約 10kg 分の 重さに なる', '0kg に なる', '120kg に なる'],
        correct: 1,
        explanation: '質量 (60kg) は 変わらない が、月の 重力が 地球の 1/6 なので 重さは 1/6 に なる。',
      },
      {
        q: '落ちない 林檎を 見たら、まず 何を 疑う べき?',
        options: ['重力が なく なった', '林檎が 魔法に かかった', '重力 以外の 何らかの 力が 働いて いる', '目の 錯覚'],
        correct: 2,
        explanation: '重力は 地球上では どこでも 働いて いる。 動かない = 力が 釣り合って いる という こと。',
      },
      {
        q: 'F = ma という 式の「a」は 何を 表して いる?',
        options: ['面積', '加速度', '質量', '角度'],
        correct: 1,
        explanation: 'a は 加速度 (acceleration)。 F は 力、m は 質量。',
      },
      {
        q: 'ニュートンの 第三法則 (作用·反作用) の 例と して 最も 適切な のは?',
        options: ['ボールを 蹴ると 足にも 衝撃が 返って くる', 'ボールが 転がり 続ける', 'ボールの 重さを 測る', 'ボールが 落ちる'],
        correct: 0,
        explanation: '蹴った 力 (作用) と 同じ 大きさの 力が 足に 返る (反作用)。 これが 第三法則。',
      },
      {
        q: '空気の 抵抗が ない 場所で、1kg の 鉄球と 100g の 羽毛を 同じ 高さから 同時に 落とすと?',
        options: ['鉄球の 方が 早く 落ちる', '羽毛の 方が 早く 落ちる', '同時に 落ちる', '羽毛は 落ちない'],
        correct: 2,
        explanation: '重力加速度は どんな 物にも 同じ。 空気抵抗が なければ 同時に 落ちる。 ガリレオが 発見した。',
      },
      {
        q: '「慣性の 法則」の 説明と して 正しい のは?',
        options: ['重い 物 ほど 早く 落ちる', '力が 働かない 限り、物は 今の 運動を 続ける', '物には 必ず 重力が 働く', '力は 必ず 対で 働く'],
        correct: 1,
        explanation: 'ニュートン 第一法則 = 慣性の 法則。 電車で 急ブレーキ 時に 体が 前に 倒れる のも この 法則。',
      },
      {
        q: '月が 地球の 周りを 回り 続けて いる のは なぜ?',
        options: ['月に エンジンが ついて いる から', '地球と 月の 間に 万有引力が 働いて いる から', '風が 月を 押して いる から', '宇宙が 月を 支えて いる から'],
        correct: 1,
        explanation: '万有引力が 月を 地球に 引きつけ、円運動を 維持 させて いる。',
      },
      {
        q: '「動かない 林檎」の トリックの 正体は?',
        options: ['重力が ない 場所だった', '林檎が 特別な 品種だった', '磁石の 反発力が 重力と 釣り合って いた', '風が 下から 吹いて いた'],
        correct: 2,
        explanation: '事件の 核心。 林檎の 中の 磁石と 木の 上の 磁石が 反発力を 生み、重力と 釣り合って 止まって いた。',
      },
      {
        q: 'アイザック·ニュートンが 万有引力を 発見した きっかけは 何だった と いわれて いる?',
        options: ['星を 観察して いた 時', '海を 見て いた 時', '林檎が 木から 落ちる のを 見た 時', '夢の 中で'],
        correct: 2,
        explanation: '有名な 逸話。 実際に 林檎が 頭に 当たったか は 諸説 あるが、林檎の 落下から 着想を 得たと される。',
      },
    ],

    tips: [
      { title: '①  「重さ」と「質量」を 混同しない',                body: '質量 (kg) は 物 そのものの 量。 重さ (N) は 重力に よって 生じる 力。 月や 宇宙では 重さは 変わる が、質量は 変わらない。' },
      { title: '②  落ちない 物を 見たら「力の 釣り合い」を 疑え',  body: '重力は 地球上では 必ず 働いて いる。 動かない = もう 一つの 力が 打ち消して いる。 事件 1 の 核心は ここ。' },
      { title: '③  重さに 関係なく 落下速度は 同じ (空気抵抗 無し時)', body: 'ガリレオが 発見した 法則。 中学 テストでも よく 出題される。 羽毛が 遅く 落ちる のは 空気の 抵抗の せい。' },
      { title: '④  「万物が 引き合う」という 壮大さを 覚えて おく',  body: '君と 隣の 人の 間にも 万有引力は 働いて いる (感じない 位 弱いけど)。 地球と 月、太陽と 地球も 同じ 仕組み。' },
      { title: '⑤  三法則は 順番で 覚える',                          body: '第一: 慣性 / 第二: F=ma / 第三: 作用反作用。 順番を 覚えて おけば 問題で 迷わない。' },
      { title: '⑥  単位を 必ず チェック',                            body: 'kg (質量) と N (重さ·力) を 取り違える 失敗が 多い。 問題文の 単位を 最初に 確認する 習慣を つけよう。' },
      { title: '⑦  重力加速度 g ≈ 9.8 m/s² を 覚えて おく',          body: '中学では 概数 (約 10) で 計算する ことも 多い。 テストでは 問題文に 書かれる ことも 多いが、暗記して おく と 便利。' },
      { title: '⑧  ニュートンの 林檎の 話は「作り話」ではなく「着想の きっかけ」', body: '林檎が 頭に 当たって 発見、と いう のは 脚色だが、林檎の 落下から 万有引力の 概念を 考えた のは 事実と される。' },
    ],
  },
  // 사건 2~10 은 향후 별도 명세서에서 추가 (scientists_case02 ...).
};
