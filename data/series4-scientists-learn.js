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
  scientists_case02: {
    title: '時間の 遅れと 特殊相対性理論',
    subtitle: '事件 2 で 学んだ こと',
    examScope: '中学 物理 + 比喩中心 (定性的理解)',

    concept: {
      title: '時間の 遅れと 特殊相対性理論',
      paragraphs: [
        '「時間は 誰にも 同じように 流れる」 — 普通は そう思います。 しかし、アインシュタインは 1905年、「速く 動く 物の 時間は ゆっくり 進む」 という 驚くべき 事実を 発見しました。 これを 特殊相対性理論 (とくしゅそうたいせいりろん) と 言います。',
        '事件 2 の 時計B は 高速で 回転する 板の 上に 置かれて いたため、時計A より わずかに 時間が ゆっくり 進みました。 これが 「時間の 遅れ」 です。',
        '日常の 速さでは 違いは 全く 感じられません が、光の 速さ (約 30万 km/秒) に 近づくほど、時間の 流れは 大きく 変わります。 GPS 衛星も この 効果を 計算に 入れて 設計されて います。',
        'アインシュタインは また、「物質と エネルギーは 同じ もの」 という 関係を E = mc² の 式で 表しました。 原子力 発電も この 原理を 使って います。',
      ],
      highlight: '時間は 絶対 ではなく、相対的。 動く 速度に よって 流れ方が 変わる。',
    },

    diagrams: [
      {
        title: '①  止まった 時計 vs 動く 時計',
        svg: `
          <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:380px;height:auto;background:#eaf2fb;border-radius:12px;">
            <text x="200" y="24" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a3a6a">動く 時計は ゆっくり 進む</text>
            <!-- 왼쪽: 정지한 시계 (지구 표면) -->
            <g transform="translate(80,80)">
              <circle cx="0" cy="0" r="48" fill="#fff" stroke="#1a4a7a" stroke-width="3"/>
              <text x="0" y="-30" font-size="10" text-anchor="middle" fill="#1a1a1a">12</text>
              <text x="34" y="4" font-size="10" text-anchor="middle" fill="#1a1a1a">3</text>
              <text x="0" y="38" font-size="10" text-anchor="middle" fill="#1a1a1a">6</text>
              <text x="-34" y="4" font-size="10" text-anchor="middle" fill="#1a1a1a">9</text>
              <line x1="0" y1="0" x2="0" y2="-30" stroke="#1a1a1a" stroke-width="3"/>
              <line x1="0" y1="0" x2="22" y2="0" stroke="#e74c3c" stroke-width="2"/>
              <circle cx="0" cy="0" r="3" fill="#1a1a1a"/>
              <text x="0" y="74" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a3a6a">時計A (静止)</text>
              <text x="0" y="90" font-size="10" text-anchor="middle" fill="#5a5a5a">12:00 ジャスト</text>
            </g>
            <!-- 오른쪽: 회전판 위 시계 -->
            <g transform="translate(280,80)">
              <ellipse cx="0" cy="60" rx="60" ry="14" fill="#bdbdbd" stroke="#5a5a5a" stroke-width="2"/>
              <circle cx="0" cy="0" r="48" fill="#fff" stroke="#7c3aed" stroke-width="3"/>
              <text x="0" y="-30" font-size="10" text-anchor="middle" fill="#1a1a1a">12</text>
              <text x="34" y="4" font-size="10" text-anchor="middle" fill="#1a1a1a">3</text>
              <text x="0" y="38" font-size="10" text-anchor="middle" fill="#1a1a1a">6</text>
              <text x="-34" y="4" font-size="10" text-anchor="middle" fill="#1a1a1a">9</text>
              <line x1="0" y1="0" x2="0" y2="-30" stroke="#1a1a1a" stroke-width="3"/>
              <line x1="0" y1="0" x2="-6" y2="-21" stroke="#e74c3c" stroke-width="2"/>
              <circle cx="0" cy="0" r="3" fill="#1a1a1a"/>
              <text x="0" y="86" font-size="12" font-weight="bold" text-anchor="middle" fill="#7c3aed">時計B (高速回転)</text>
              <text x="0" y="102" font-size="10" text-anchor="middle" fill="#5a5a5a">11:59:30  (30 秒 遅れ)</text>
            </g>
            <!-- 화살표 -->
            <line x1="150" y1="80" x2="220" y2="80" stroke="#e74c3c" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#ah_t1)"/>
            <text x="185" y="70" font-size="10" font-weight="bold" text-anchor="middle" fill="#e74c3c">同じ 時間で…</text>
            <text x="200" y="275" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a3a6a">動く 物の 時間は 止まる 物より ゆっくり 進む</text>
            <defs>
              <marker id="ah_t1" markerWidth="9" markerHeight="9" refX="8" refY="4.5" orient="auto">
                <path d="M0,0 L9,4.5 L0,9 Z" fill="#e74c3c"/>
              </marker>
            </defs>
          </svg>
        `,
      },
      {
        title: '②  光速 c = 宇宙の 速度限界',
        svg: `
          <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:380px;height:auto;background:#f0f4ff;border-radius:12px;">
            <text x="200" y="24" font-size="14" font-weight="bold" text-anchor="middle" fill="#4a2a8a">速度が 上がるほど 時間は 遅くなる</text>
            <!-- 축 -->
            <line x1="60" y1="260" x2="360" y2="260" stroke="#1a1a1a" stroke-width="2" marker-end="url(#ah_t2)"/>
            <line x1="60" y1="260" x2="60" y2="60" stroke="#1a1a1a" stroke-width="2" marker-end="url(#ah_t2)"/>
            <text x="200" y="290" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a1a1a">速度 v (→ 光速 c)</text>
            <text x="30" y="160" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a1a1a" transform="rotate(-90 30 160)">時間の 流れ</text>
            <!-- 곡선 (속도 → 시간 흐름이 감소) -->
            <path d="M 60 80 Q 200 80 280 130 Q 320 170 340 250" stroke="#7c3aed" stroke-width="3" fill="none"/>
            <!-- c 점선 -->
            <line x1="340" y1="60" x2="340" y2="260" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5 3"/>
            <text x="340" y="55" font-size="11" font-weight="bold" text-anchor="middle" fill="#e74c3c">v = c</text>
            <text x="340" y="276" font-size="9" text-anchor="middle" fill="#e74c3c">299,792 km/s</text>
            <!-- 라벨 -->
            <text x="80" y="76" font-size="11" fill="#4a2a8a">通常の 時間</text>
            <text x="300" y="220" font-size="11" font-weight="bold" fill="#e74c3c">時間≈0</text>
            <text x="200" y="310" font-size="11" font-weight="bold" text-anchor="middle" fill="#4a2a8a">光速に 近づくほど 時間の 流れは 限りなく ゆっくり</text>
            <defs>
              <marker id="ah_t2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#1a1a1a"/>
              </marker>
            </defs>
          </svg>
        `,
      },
      {
        title: '③  双子の パラドックス',
        svg: `
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#e8f0e8;border-radius:12px;">
            <text x="250" y="24" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a5a2a">双子の パラドックス</text>
            <!-- 왼쪽: 지구 + 늙은 형 -->
            <circle cx="80" cy="180" r="36" fill="#3498db" stroke="#1a4a7a" stroke-width="2"/>
            <text x="80" y="184" font-size="11" text-anchor="middle" fill="#fff" font-weight="bold">地球</text>
            <!-- 형 -->
            <circle cx="80" cy="110" r="14" fill="#fdebd0" stroke="#7a5a2a" stroke-width="2"/>
            <text x="80" y="114" font-size="10" text-anchor="middle" fill="#7a5a2a">60</text>
            <text x="80" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a5a2a">兄 (60 歳)</text>
            <text x="80" y="232" font-size="9" text-anchor="middle" fill="#1a4a5a">ずっと 地球で 待った</text>
            <!-- 우주선 -->
            <g transform="translate(250,150)">
              <polygon points="-30,0 30,-15 30,15" fill="#7f8c8d" stroke="#1a1a1a" stroke-width="2"/>
              <circle cx="-12" cy="0" r="6" fill="#3498db"/>
              <polygon points="-30,-2 -50,-12 -50,12 -30,2" fill="#e67e22" opacity="0.7"/>
            </g>
            <text x="250" y="120" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a1a1a">光速の 99% で 宇宙旅行</text>
            <!-- 오른쪽: 동생 (젊음) -->
            <circle cx="420" cy="110" r="14" fill="#fdebd0" stroke="#7a5a2a" stroke-width="2"/>
            <text x="420" y="114" font-size="10" text-anchor="middle" fill="#7a5a2a">30</text>
            <text x="420" y="76" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a5a2a">弟 (30 歳)</text>
            <text x="420" y="232" font-size="9" text-anchor="middle" fill="#1a4a5a">宇宙旅行から 帰還</text>
            <!-- 화살표 -->
            <line x1="100" y1="200" x2="220" y2="160" stroke="#1a5a2a" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#ah_t3)"/>
            <line x1="280" y1="160" x2="400" y2="200" stroke="#1a5a2a" stroke-width="2" stroke-dasharray="4 3" marker-end="url(#ah_t3)"/>
            <text x="250" y="280" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a5a2a">光に 近い 速さで 旅した 弟は、待つ 兄より 若いまま 帰ってくる</text>
            <defs>
              <marker id="ah_t3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="#1a5a2a"/>
              </marker>
            </defs>
          </svg>
        `,
      },
      {
        title: '④  E = mc² — 質量と エネルギーの 等価性',
        svg: `
          <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#fff5e0;border-radius:12px;">
            <text x="250" y="24" font-size="14" font-weight="bold" text-anchor="middle" fill="#8a4a1a">E = m × c²  — 小さな 質量が 巨大な エネルギー</text>
            <!-- 좌측: 작은 질량 -->
            <circle cx="80" cy="130" r="10" fill="#5a5a5a"/>
            <text x="80" y="170" font-size="13" font-weight="bold" text-anchor="middle" fill="#1a1a1a">m</text>
            <text x="80" y="188" font-size="10" text-anchor="middle" fill="#5a5a5a">1g の 質量</text>
            <!-- 중앙: 등호 + c² -->
            <text x="170" y="138" font-size="32" font-weight="bold" text-anchor="middle" fill="#8a4a1a">×</text>
            <text x="220" y="138" font-size="20" font-weight="bold" text-anchor="middle" fill="#8a4a1a">c²</text>
            <text x="220" y="160" font-size="10" text-anchor="middle" fill="#5a5a5a">(光速の 2乗)</text>
            <text x="280" y="138" font-size="32" font-weight="bold" text-anchor="middle" fill="#8a4a1a">=</text>
            <!-- 우측: 거대 에너지 -->
            <g transform="translate(400,130)">
              <polygon points="0,-40 12,-12 40,-8 18,8 26,38 0,22 -26,38 -18,8 -40,-8 -12,-12" fill="#ffd700" stroke="#d4a000" stroke-width="2"/>
              <text x="0" y="6" font-size="14" font-weight="bold" text-anchor="middle" fill="#8a4a1a">E</text>
            </g>
            <text x="400" y="188" font-size="10" text-anchor="middle" fill="#5a5a5a">≈ 9 × 10¹³ J</text>
            <text x="250" y="220" font-size="11" font-weight="bold" text-anchor="middle" fill="#8a4a1a">1g ≒ 東京都 1日分の 電力!</text>
            <text x="250" y="244" font-size="10" text-anchor="middle" fill="#7a5a2a">物質と エネルギーは 同じ もの。原子力·太陽の 核融合 が この 原理。</text>
          </svg>
        `,
      },
    ],

    formulas: [
      {
        name: '時間の 遅れ (時間膨張)',
        formula: "t' = t / √(1 − v²/c²)",
        formulaSimple: "t' = t / √(1 − v²/c²)",
        explanation: '動いている 物の 時間 t´ は、止まって いる 観測者の 時間 t に 対して、速度 v と 光速 c の 関係で 決まる。',
        note: '中学では 公式 そのもの より 「動く 物の 時間は ゆっくり」 と いう 概念を 覚えれば 十分。',
      },
      {
        name: '質量と エネルギーの 等価性',
        formula: 'E = m × c²',
        formulaSimple: 'E = mc²',
        explanation: '質量 m が 光速 c の 2乗倍の エネルギー E に 等しい。',
        note: 'ごく 少量の 質量が 莫大な エネルギーに 変わる 事を 意味する。 原子力·太陽の 核融合は この 原理。',
      },
    ],

    unitsTable: {
      title: '単位の まとめ',
      rows: [
        ['量', '記号', '単位', '意味'],
        ['時間',       't', '秒 (s)',         '時の 流れの 長さ'],
        ['速度',       'v', 'm/s',            '位置の 変化の 速さ'],
        ['光速',       'c', 'm/s',            '約 3 × 10⁸ m/s (299,792,458 m/s)'],
        ['質量',       'm', 'kg',             '物の 量'],
        ['エネルギー', 'E', 'J (ジュール)',   '仕事の 量'],
      ],
    },

    flashcards: [
      { front: '特殊相対性理論 (とくしゅそうたいせいりろん)', back: 'アインシュタインが 1905年に 発表した 理論。 動く 物の 時間が 遅れる ことを 説明。' },
      { front: '時間の 遅れ (時間膨張)',                       back: '速く 動く 物 ほど、その 時間は ゆっくり 進む 現象。' },
      { front: '光速 c',                                       back: '光の 速さ。 約 30万 km/秒 (299,792,458 m/s)。 宇宙の 速度の 上限。' },
      { front: 'E = mc²',                                      back: '質量と エネルギーは 等価。 質量 m に c² を かけた 量の エネルギーが 取り出せる。' },
      { front: '相対的 (そうたいてき)',                        back: '見る 立場 (基準) に よって 違って 見える こと。 時間や 長さは 相対的。' },
      { front: '光速度 不変の 原理',                            back: 'どんな 観測者から 見ても、光の 速さは いつも 同じ c。' },
      { front: '長さの 収縮',                                  back: '動く 物の 長さは、止まって いる 観測者から 見ると 進行方向に 縮んで 見える。' },
      { front: '双子の パラドックス',                          back: '光に 近い 速さで 旅した 双子の 一方が、地球に 残った 方より 若くなる。' },
      { front: 'GPS',                                          back: '人工衛星の 時計の 遅れを 相対性理論で 計算。 これ なしでは 位置が ずれる。' },
      { front: 'アルベルト·アインシュタイン',                  back: '20世紀 最大の 物理学者 (1879-1955)。 相対性理論·光電効果·E=mc² で ノーベル賞。' },
    ],

    exercises: [
      {
        q: '次の うち、特殊相対性理論の 説明と して 正しい のは?',
        options: ['止まって いる 物の 時間が 遅れる', '速く 動く 物の 時間は ゆっくり 進む', '全ての 物は 同じ 時間を 持つ', '時間は 質量に 反比例 する'],
        correct: 1,
        explanation: '事件 2 の 核心。 動く 速度が 光速に 近づくほど、時間は ゆっくり 進む。',
      },
      {
        q: '光速 c の 値に 最も 近い のは?',
        options: ['3千 km/秒', '3万 km/秒', '30万 km/秒', '300万 km/秒'],
        correct: 2,
        explanation: '光速 c ≈ 299,792 km/秒 ≈ 30万 km/秒。',
      },
      {
        q: 'E = mc² が 意味する ことは?',
        options: ['エネルギーは 質量に 比例 する', '質量と エネルギーは 同じ もの', '光速は 質量 × 2', '時間は 質量で 決まる'],
        correct: 1,
        explanation: '質量 m に c² を かけた 量の エネルギーが 内包されて いる。 物質 = エネルギー。',
      },
      {
        q: '事件 2 の 「止まった 時計」 トリックの 正体は?',
        options: ['時計が 壊れて いた', '高速 回転 する 円盤の 上に 置かれて 時間が 遅れた', '電池が 切れかけて いた', 'アイン教授が 針を 動かした'],
        correct: 1,
        explanation: '事件 2 の 核心。 速く 動く 物の 時間は ゆっくり 進む。',
      },
      {
        q: '光に 近い 速さで 5年 旅した 双子の 弟が 地球に 戻ったら、地球の 兄は 何年 過ぎて いる?',
        options: ['同じ 5年', '5年 より ずっと 長い 時間', '5年 より 短い 時間', '時間が 流れて いない'],
        correct: 1,
        explanation: '双子の パラドックス。 動いていた 弟の 時間が 遅く 流れた ため、兄の 時間が より 長く 経過。',
      },
      {
        q: '次の うち、相対性理論を 実用化 して いる 技術は?',
        options: ['電子レンジ', 'GPS', 'テレビ', '冷蔵庫'],
        correct: 1,
        explanation: 'GPS 衛星は 高速で 動く + 重力が 地上と 異なる → 相対性理論で 補正 しないと 位置が ずれる。',
      },
      {
        q: '相対性理論を 発表 したのは 誰?',
        options: ['ニュートン', 'アインシュタイン', 'ガリレオ', 'マクスウェル'],
        correct: 1,
        explanation: 'アルベルト·アインシュタイン (1879-1955) が 1905年 (特殊) と 1915年 (一般) に 発表。',
      },
      {
        q: '光速度 不変の 原理 とは?',
        options: ['光は 必ず 直進 する', 'どんな 観測者から 見ても 光の 速さは 同じ', '光は 物体で 反射 する', '光は 真空中で 最も 速い'],
        correct: 1,
        explanation: '相対性理論の 出発点。 どんな 速度で 動いて いても、光は いつも c で 観測される。',
      },
      {
        q: '時計B が 1日 30秒 遅れる のは、何が 原因 だった?',
        options: ['時計B が 高速 回転 する 円盤の 上に いた', '時計B の 電池が 弱かった', '時計B が 古い モデル だった', '時計B が 磁石の 近くに あった'],
        correct: 0,
        explanation: '高速で 動く 時計は、止まって いる 時計より ゆっくり 進む。 事件の 核心 トリック。',
      },
      {
        q: 'アインシュタインが ノーベル賞を 受賞 した 理由は?',
        options: ['特殊相対性理論', '一般相対性理論', '光電効果 の 説明', 'E = mc²'],
        correct: 2,
        explanation: '意外にも 相対性理論 そのもの では なく、光電効果 (光が 金属から 電子を 出す 現象) の 説明で 1921年に 受賞。',
      },
    ],

    tips: [
      { title: '①  「絶対」 では なく 「相対」',           body: '時間や 長さは、見る 立場に よって 違って 見える。 これが 相対性 の 本質。' },
      { title: '②  動く ほど 時間は 遅れる',              body: '速く 動く ほど、その 物の 時間は ゆっくり 進む。 日常では 感じない が、光速 近くで 顕著。' },
      { title: '③  光速 c は 宇宙の 限界',                body: '何も 光より 速くは なれない。 c は 約 30万 km/秒。 覚えて おくと テストで 役立つ。' },
      { title: '④  E = mc² の 意味',                      body: 'ごく 少量の 質量が 莫大な エネルギーに 変わる。 原子力·太陽の 核融合 が 例。' },
      { title: '⑤  双子の パラドックス',                  body: '光に 近い 速さで 旅した 双子の 一方は 若く なる。 SF 映画で よく 出て くる。' },
      { title: '⑥  GPS は 相対性理論を 使う',             body: 'GPS が 正確な のは 相対性理論で 衛星の 時計を 補正 して いる から。' },
      { title: '⑦  中学 レベルでは 「概念」 重視',         body: '式 そのもの より、「動くと 時間が 遅れる」 「質量 = エネルギー」 を しっかり 覚える。' },
      { title: '⑧  アインシュタイン = 光電効果 で ノーベル賞', body: '意外な 豆知識。 相対性理論 そのもの では ない。 テストの 引っかけ 問題に 注意。' },
    ],
  },
  scientists_case03: {
    title: '放射能と 原子の 世界',
    subtitle: '事件 3 で 学んだ こと',
    examScope: '中学 + 比喩 中心 + 安全 メッセージ',

    concept: {
      title: '放射能と 原子の 世界',
      paragraphs: [
        '事件 3 の 光石 — ラジウム は、原子核が 自然に 崩壊しながら エネルギーを 放出 する 元素です。 この 「放射能 (ほうしゃのう)」 という 現象は、マリー·キュリー 夫妻が 1898年 に 発見しました。',
        'すべての 物は 原子 から できて います。 原子の 中心には 「原子核 (げんしかく)」 が あり、その 周りを 電子が 回って います。 原子核が 不安定だと、自然に 崩壊して 別の 元素に 変わり、その 過程で 放射線を 出します。',
        '放射線には α 線·β 線·γ 線 の 3種類が あります。 また、放射性 物質は 時間と ともに 半分に なる 周期 — 半減期 (はんげんき) — を 持って います。',
        '放射線は 強すぎる と 人体に 害が ありますが、医療 (レントゲン·がん 治療)·発電 (原子力)·考古学 (年代測定) など、上手に 使えば 大いに 役立ちます。 安全規制を 守る ことが 大切です。',
      ],
      highlight: '原子は 不変では なく、自然に 変化して エネルギーを 放出 する ことが ある。 正しく 知って、慎重に 使う。',
    },

    diagrams: [
      {
        title: '①  原子の 構造 — 原子核と 電子',
        svg: `
          <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:380px;height:auto;background:#f0f4ff;border-radius:12px;">
            <text x="200" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a3a8a">原子の 構造</text>
            <!-- 전자 궤도 -->
            <ellipse cx="200" cy="170" rx="140" ry="50" fill="none" stroke="#3498db" stroke-width="1.5" stroke-dasharray="5 4"/>
            <ellipse cx="200" cy="170" rx="90" ry="32" fill="none" stroke="#3498db" stroke-width="1.5" stroke-dasharray="5 4"/>
            <!-- 원자핵 (양성자 + 중성자 클러스터) -->
            <g transform="translate(200,170)">
              <circle cx="-9" cy="-6" r="9" fill="#e74c3c"/>
              <circle cx="9" cy="-6" r="9" fill="#7f8c8d"/>
              <circle cx="-9" cy="6" r="9" fill="#7f8c8d"/>
              <circle cx="9" cy="6" r="9" fill="#e74c3c"/>
              <circle cx="0" cy="0" r="9" fill="#e74c3c"/>
            </g>
            <!-- 전자 -->
            <circle cx="340" cy="170" r="6" fill="#3498db"/>
            <circle cx="60" cy="170" r="6" fill="#3498db"/>
            <circle cx="290" cy="170" r="6" fill="#3498db"/>
            <circle cx="110" cy="170" r="6" fill="#3498db"/>
            <!-- 라벨 -->
            <text x="200" y="100" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a1a1a">原子核 (げんしかく)</text>
            <line x1="200" y1="106" x2="200" y2="148" stroke="#7a1a1a" stroke-width="1"/>
            <text x="60" y="200" font-size="10" text-anchor="middle" fill="#1a4a7a">電子</text>
            <text x="340" y="200" font-size="10" text-anchor="middle" fill="#1a4a7a">電子</text>
            <!-- 범례 -->
            <g transform="translate(40,260)">
              <circle cx="0" cy="0" r="6" fill="#e74c3c"/>
              <text x="12" y="4" font-size="10" fill="#1a1a1a">陽子 (ようし)</text>
              <circle cx="100" cy="0" r="6" fill="#7f8c8d"/>
              <text x="112" y="4" font-size="10" fill="#1a1a1a">中性子 (ちゅうせいし)</text>
              <circle cx="240" cy="0" r="6" fill="#3498db"/>
              <text x="252" y="4" font-size="10" fill="#1a1a1a">電子 (でんし)</text>
            </g>
            <text x="200" y="300" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a3a8a">すべての 物は 原子で できて いる</text>
          </svg>
        `,
      },
      {
        title: '②  放射線の 3種類 — α·β·γ',
        svg: `
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#fff0e8;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#8a2a1a">放射線の 透過力</text>
            <!-- 방사성 원자핵 -->
            <circle cx="60" cy="160" r="22" fill="#e74c3c" stroke="#7a1a1a" stroke-width="2"/>
            <text x="60" y="164" font-size="10" text-anchor="middle" fill="#fff" font-weight="bold">原子核</text>
            <!-- α선 (위) → 종이에 막힘 -->
            <line x1="84" y1="80" x2="180" y2="80" stroke="#e74c3c" stroke-width="3" marker-end="url(#ah_r2_a)"/>
            <rect x="180" y="60" width="6" height="40" fill="#fdf0c8" stroke="#7a5a2a" stroke-width="1.5"/>
            <text x="125" y="72" font-size="11" font-weight="bold" text-anchor="middle" fill="#e74c3c">α 線</text>
            <text x="220" y="84" font-size="10" fill="#7a5a2a">紙 で 止まる</text>
            <!-- β선 (중간) → 알루미늄에 막힘 -->
            <line x1="84" y1="160" x2="260" y2="160" stroke="#3498db" stroke-width="3" marker-end="url(#ah_r2_b)"/>
            <rect x="260" y="140" width="10" height="40" fill="#bdc3c7" stroke="#5a5a5a" stroke-width="1.5"/>
            <text x="170" y="152" font-size="11" font-weight="bold" text-anchor="middle" fill="#3498db">β 線</text>
            <text x="300" y="164" font-size="10" fill="#5a5a5a">アルミ で 止まる</text>
            <!-- γ선 (아래) → 납으로 약화 -->
            <line x1="84" y1="240" x2="380" y2="240" stroke="#7c3aed" stroke-width="3" marker-end="url(#ah_r2_c)"/>
            <rect x="380" y="220" width="20" height="40" fill="#5a5a8a" stroke="#1a1a3a" stroke-width="1.5"/>
            <text x="220" y="232" font-size="11" font-weight="bold" text-anchor="middle" fill="#7c3aed">γ 線</text>
            <text x="420" y="244" font-size="10" fill="#1a1a3a">鉛 で 弱まる</text>
            <text x="250" y="288" font-size="11" font-weight="bold" text-anchor="middle" fill="#8a2a1a">透過力: α &lt; β &lt; γ</text>
            <defs>
              <marker id="ah_r2_a" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e74c3c"/></marker>
              <marker id="ah_r2_b" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#3498db"/></marker>
              <marker id="ah_r2_c" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#7c3aed"/></marker>
            </defs>
          </svg>
        `,
      },
      {
        title: '③  半減期 — 時間と ともに 半分に',
        svg: `
          <svg viewBox="0 0 450 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:430px;height:auto;background:#eef8ee;border-radius:12px;">
            <text x="225" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a6a2a">半減期 (はんげんき)</text>
            <!-- 축 -->
            <line x1="60" y1="260" x2="420" y2="260" stroke="#1a1a1a" stroke-width="2" marker-end="url(#ah_r3)"/>
            <line x1="60" y1="260" x2="60" y2="60" stroke="#1a1a1a" stroke-width="2" marker-end="url(#ah_r3)"/>
            <text x="240" y="290" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a1a1a">時間 (半減期 T)</text>
            <text x="30" y="160" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a1a1a" transform="rotate(-90 30 160)">残量 (%)</text>
            <!-- 지수 감소 곡선 -->
            <path d="M 60 60 Q 100 100 130 160 Q 180 220 210 230 Q 280 248 350 256 L 410 258" stroke="#1a6a2a" stroke-width="3" fill="none"/>
            <!-- 점선 + 라벨 -->
            <line x1="130" y1="260" x2="130" y2="160" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3 3"/>
            <line x1="60" y1="160" x2="130" y2="160" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3 3"/>
            <text x="130" y="276" font-size="10" text-anchor="middle" fill="#4a2a8a">T</text>
            <text x="50" y="164" font-size="9" text-anchor="end" fill="#4a2a8a">50</text>
            <line x1="210" y1="260" x2="210" y2="210" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3 3"/>
            <line x1="60" y1="210" x2="210" y2="210" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3 3"/>
            <text x="210" y="276" font-size="10" text-anchor="middle" fill="#4a2a8a">2T</text>
            <text x="50" y="214" font-size="9" text-anchor="end" fill="#4a2a8a">25</text>
            <line x1="290" y1="260" x2="290" y2="240" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3 3"/>
            <line x1="60" y1="240" x2="290" y2="240" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3 3"/>
            <text x="290" y="276" font-size="10" text-anchor="middle" fill="#4a2a8a">3T</text>
            <text x="50" y="244" font-size="9" text-anchor="end" fill="#4a2a8a">12.5</text>
            <text x="55" y="64" font-size="9" text-anchor="end" fill="#1a1a1a">100</text>
            <text x="225" y="310" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">ラジウム の T ≈ 1,600 年</text>
            <defs>
              <marker id="ah_r3" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1a1a1a"/></marker>
            </defs>
          </svg>
        `,
      },
      {
        title: '④  自然 放射線 と 人工 放射線',
        svg: `
          <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#fff5f0;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#8a4a1a">私たちの 周りの 放射線</text>
            <!-- 좌측: 자연 -->
            <text x="125" y="50" font-size="13" font-weight="bold" text-anchor="middle" fill="#1a6a2a">🌿 自然 放射線</text>
            <g transform="translate(40,70)">
              <circle cx="20" cy="20" r="14" fill="#ffd700" stroke="#8a6a00" stroke-width="2"/>
              <text x="20" y="24" font-size="14" text-anchor="middle">☀</text>
              <text x="50" y="24" font-size="10" fill="#1a1a1a">宇宙線 (太陽·星)</text>
            </g>
            <g transform="translate(40,120)">
              <rect x="6" y="10" width="28" height="20" fill="#8a5a2a" stroke="#4a3010" stroke-width="2"/>
              <text x="50" y="24" font-size="10" fill="#1a1a1a">大地·岩石</text>
            </g>
            <g transform="translate(40,170)">
              <ellipse cx="20" cy="20" rx="14" ry="6" fill="#f7c08a" stroke="#7a4a2a" stroke-width="2"/>
              <text x="50" y="24" font-size="10" fill="#1a1a1a">食品 (バナナ等)</text>
            </g>
            <!-- 분리선 -->
            <line x1="250" y1="50" x2="250" y2="280" stroke="#bdbdbd" stroke-width="2" stroke-dasharray="4 3"/>
            <!-- 우측: 인공 -->
            <text x="375" y="50" font-size="13" font-weight="bold" text-anchor="middle" fill="#1a4a8a">🏥 人工 放射線</text>
            <g transform="translate(290,70)">
              <rect x="6" y="6" width="28" height="28" fill="#fff" stroke="#1a1a1a" stroke-width="2"/>
              <text x="20" y="26" font-size="14" text-anchor="middle">+</text>
              <text x="50" y="24" font-size="10" fill="#1a1a1a">レントゲン·CT</text>
            </g>
            <g transform="translate(290,120)">
              <circle cx="20" cy="20" r="14" fill="#7c3aed" stroke="#4a2a7a" stroke-width="2"/>
              <text x="20" y="24" font-size="11" text-anchor="middle" fill="#fff">⚛</text>
              <text x="50" y="24" font-size="10" fill="#1a1a1a">原子力 発電</text>
            </g>
            <g transform="translate(290,170)">
              <rect x="6" y="6" width="28" height="28" fill="#bdc3c7" stroke="#5a5a5a" stroke-width="2"/>
              <text x="20" y="26" font-size="12" text-anchor="middle" fill="#1a1a1a">📷</text>
              <text x="50" y="24" font-size="10" fill="#1a1a1a">がん 放射線治療</text>
            </g>
            <text x="250" y="260" font-size="11" font-weight="bold" text-anchor="middle" fill="#8a4a1a">自然 放射線は どこにでも ある。 量を 知る ことが 大切。</text>
            <text x="250" y="290" font-size="10" text-anchor="middle" fill="#5a4020">安全 規制を 守れば、医療·発電で 大いに 役立つ。</text>
          </svg>
        `,
      },
    ],

    formulas: [
      {
        name: '半減期の 式',
        formula: 'N(t) = N₀ × (1/2)^(t/T)',
        formulaSimple: 'N = N₀ × (1/2)^(t/T)',
        explanation: '時間 t が 経った 後の 放射性 物質の 残量 N。 N₀ は 最初の 量、 T は 半減期。',
        note: '中学では 「半減期 ごとに 半分に なる」 という 概念を 覚えれば 十分。',
      },
      {
        name: '放射能の 単位',
        formula: '1 Bq (ベクレル) = 1 回の 崩壊 / 秒',
        formulaSimple: '1 Bq = 1 崩壊/秒',
        explanation: '放射能の 強さを 表す 単位。 ベクレル は 発見者の 名前から 由来。',
        note: '人体への 影響を 表す 単位は シーベルト (Sv)。 別の 概念なので 注意。',
      },
    ],

    unitsTable: {
      title: '単位の まとめ',
      rows: [
        ['量',        '記号', '単位',          '意味'],
        ['放射能',     'A',   'Bq (ベクレル)',  '1秒 あたりの 崩壊数'],
        ['吸収線量',   'D',   'Gy (グレイ)',    '物質が 吸収した エネルギー'],
        ['等価線量',   'H',   'Sv (シーベルト)', '人体への 影響'],
        ['半減期',     'T',   '時間 (秒·年)',   '放射性物質が 半分に なる 時間'],
        ['原子番号',   'Z',   '個',             '原子核の 陽子の 数'],
      ],
    },

    flashcards: [
      { front: '放射能 (ほうしゃのう)',  back: '原子核が 自然に 崩壊しながら 放射線を 出す 性質。 マリー·キュリー が 命名。' },
      { front: '放射線 (ほうしゃせん)',  back: '放射性物質から 出る 高エネルギーの 粒子や 電磁波。 α·β·γ 線が ある。' },
      { front: '原子核 (げんしかく)',    back: '原子の 中心。 陽子と 中性子から なる。 不安定だと 崩壊する。' },
      { front: '半減期 (はんげんき)',    back: '放射性物質の 量が 半分に なる 時間。 ラジウム は 約 1,600年。' },
      { front: 'ラジウム (Ra)',          back: 'キュリー 夫妻が 1898年に 発見した 元素。 強い 放射能を 持つ。 原子番号 88。' },
      { front: 'ポロニウム (Po)',        back: 'キュリー 夫妻が 発見した 元素。 マリーの 祖国 ポーランド から 命名。' },
      { front: 'α 線 (アルファせん)',    back: '原子核から 出る ヘリウム核。 紙 一枚で 止められる。 透過力 弱い。' },
      { front: 'γ 線 (ガンマせん)',      back: '高エネルギーの 電磁波。 透過力が 強く、鉛で 弱める。 医療 (放射線治療) にも 利用。' },
      { front: 'ベクレル (Bq)',          back: '放射能の 強さの 単位。 1秒間に 1回の 崩壊が 1 Bq。' },
      { front: 'マリー·キュリー',         back: 'ポーランド出身の 化学者·物理学者 (1867-1934)。 女性 初の ノーベル賞、2回 受賞 (物理·化学)。' },
    ],

    exercises: [
      {
        q: '事件 3 の 「光る石」 の 正体は?',
        options: ['蓄光 素材', '小さな 電池', 'ラジウム (放射性 元素)', '化学反応'],
        correct: 2,
        explanation: '事件 3 の 核心。 キュリー 夫妻が 発見した ラジウム は 自然に 光と 放射線を 出す。',
      },
      {
        q: '放射性 物質が 半分に なる 時間を 何という?',
        options: ['周期', '半減期', '崩壊時間', '寿命'],
        correct: 1,
        explanation: '半減期 (はんげんき)。 ラジウム は 約 1,600年。',
      },
      {
        q: '原子の 中心に ある のは?',
        options: ['電子', '原子核', '分子', '光子'],
        correct: 1,
        explanation: '原子核 = 陽子 + 中性子。 周りを 電子が 回る。',
      },
      {
        q: '次のうち、紙 一枚で 止められる 放射線は?',
        options: ['α 線', 'β 線', 'γ 線', 'X 線'],
        correct: 0,
        explanation: 'α 線は ヘリウム核 (大きい) なので 紙 一枚で 止まる。 透過力 最弱。',
      },
      {
        q: '放射能の 強さの 単位は?',
        options: ['ボルト', 'アンペア', 'ベクレル', 'カロリー'],
        correct: 2,
        explanation: 'ベクレル (Bq)。 1秒間に 1回の 崩壊が 1 Bq。',
      },
      {
        q: 'マリー·キュリーが ノーベル賞を 受賞した 回数は?',
        options: ['1回', '2回', '3回', '受賞 していない'],
        correct: 1,
        explanation: '物理学賞 (1903年) と 化学賞 (1911年)。 女性 初の 2回 受賞者。',
      },
      {
        q: '次のうち、自然 放射線の 例 ではない のは?',
        options: ['宇宙から 来る 宇宙線', '土壌·岩石から 出る 放射線', '原子力 発電所から 出る 放射線', '食品 (バナナなど) の 微量 放射線'],
        correct: 2,
        explanation: '原子力 発電は 人工 放射線。 他は すべて 自然界 に 存在 する 放射線。',
      },
      {
        q: 'ラジウム の 半減期は 約 何年?',
        options: ['16 年', '160 年', '1,600 年', '16,000 年'],
        correct: 2,
        explanation: '約 1,600年。 長い 時間 かけて ゆっくり 崩壊する。',
      },
      {
        q: '放射線の 良い 利用 例は?',
        options: ['医療の レントゲン·がん 治療', '空気の 浄化', '食品の 冷蔵', '電球の 発光'],
        correct: 0,
        explanation: 'レントゲン (X線)·がん 放射線治療·CT 検査 など、医療に 広く 利用。',
      },
      {
        q: 'マリー·キュリーが 発見した 元素は?',
        options: ['鉄 と 銅', 'ラジウム と ポロニウム', '酸素 と 水素', 'ナトリウム と カリウム'],
        correct: 1,
        explanation: 'ラジウム (ラテン語 「光」) と ポロニウム (祖国 ポーランド から)。',
      },
    ],

    tips: [
      { title: '①  原子は 不変 では ない',         body: '不安定な 原子核は 自然に 崩壊する。 これが 放射能の 正体。' },
      { title: '②  放射線 3種類 を 覚える',         body: 'α (紙で止まる)·β (アルミで止まる)·γ (鉛で弱まる)。 透過力の 順 = α < β < γ。' },
      { title: '③  半減期 = 半分に なる 時間',     body: '半減期 ごとに 量が 半分に なる。 ラジウム ≈ 1,600年、ヨウ素131 ≈ 8日 など 物質ごとに 違う。' },
      { title: '④  単位 Bq と Sv を 区別',          body: 'Bq は 「物質が 出す 放射能の 強さ」、 Sv は 「人体への 影響」。 全く 違う 概念。' },
      { title: '⑤  自然 放射線は 身近に 存在',     body: '宇宙線·地殻·食品 (バナナの カリウム) など。 適量は 安全。 「放射線=即危険」 ではない。' },
      { title: '⑥  医療·発電 で 広く 活用',         body: 'レントゲン·CT·がん 治療·原子力 発電·年代測定 など。 上手に 使えば 人類に 有益。' },
      { title: '⑦  キュリー 夫妻 = 元素 2つ 発見', body: 'ラジウム (光) + ポロニウム (ポーランド)。 マリーは 女性 初の ノーベル賞 2回 受賞。' },
      { title: '⑧  安全 第一 — 距離·遮蔽·時間',    body: '放射線 から 身を 守る 3原則: 離れる·遮る·短時間。 安全 規制が ある 理由。' },
    ],
  },
  scientists_case04: {
    title: '進化論と 自然選択',
    subtitle: '事件 4 で 学んだ こと',
    examScope: '中学 生物 + 比喩 中心 (정성적 이해)',

    concept: {
      title: '進化論と 自然選択',
      paragraphs: [
        '事件 4 の 5種の フィンチ — 全部 同じ 祖先 から 分かれた 兄弟 たちです。 環境に 合った 個体が 生き残り、 子孫に その 形質を 残す ことで、 長い 時間を かけて 少しずつ 形が 変わって いきます。 これを 「進化 (しんか)」 と 言います。',
        '進化を 起こす 仕組みの 一つが 「自然選択 (しぜんせんたく)」 です。 ダーウィン が 1859年 に 発表した 『種の 起源』 で 詳しく 説明しました。',
        '生物は 親から 子へ、 形質を 「遺伝 (いでん)」 します。 たまに 少しだけ 違う 子 (変異, へんい) が 生まれます。 環境に 合う 変異を 持った 個体が より 多く 子孫を 残し、 世代を 重ねる うちに 集団 全体の 形が 変わって いきます。',
        'これは 「弱肉強食」 ではなく 「環境への 適応」 です。 大きい·速い·強い 個体だけが 生き残るのでは なく、 その 環境で 暮らす のに ぴったり な 個体が 生き残ります。 すべての 生物 (細菌から 人間まで) が、 この 進化の 物語の 一部です。',
      ],
      highlight: '進化 = 環境に 合う 個体が 生き残り、 形質が 子孫に 受け継がれる。 長い 時間が 多様な 生命を 作る。',
    },

    diagrams: [
      {
        title: '①  5種の フィンチ — くちばしと 食べ物',
        svg: `
          <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#f4f8e8;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#3a6a1a">環境に 合った くちばしの 形</text>
            <!-- A: 太い (큰 씨앗) -->
            <g transform="translate(50,70)">
              <ellipse cx="20" cy="20" rx="18" ry="14" fill="#c8c8c8" stroke="#5a5a5a" stroke-width="1.5"/>
              <polygon points="38,16 60,20 38,24" fill="#8a5a2a" stroke="#5a3010" stroke-width="2"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="60" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a3a1a">A: 太い</text>
              <circle cx="30" cy="85" r="8" fill="#8a5a2a"/>
              <text x="30" y="108" font-size="9" text-anchor="middle" fill="#1a1a1a">大きい 種子</text>
            </g>
            <!-- B: 細い (가는 씨앗) -->
            <g transform="translate(140,70)">
              <ellipse cx="20" cy="20" rx="16" ry="13" fill="#d8d8d8" stroke="#5a5a5a" stroke-width="1.5"/>
              <polygon points="36,18 56,20 36,22" fill="#a0691a" stroke="#5a3010" stroke-width="2"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="60" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a3a1a">B: 細い</text>
              <ellipse cx="30" cy="85" rx="3" ry="6" fill="#a0691a"/>
              <text x="30" y="108" font-size="9" text-anchor="middle" fill="#1a1a1a">細い 種子</text>
            </g>
            <!-- C: 尖った (곤충) -->
            <g transform="translate(230,70)">
              <ellipse cx="20" cy="20" rx="16" ry="13" fill="#cdcdcd" stroke="#5a5a5a" stroke-width="1.5"/>
              <polygon points="36,20 58,16 58,24" fill="#5a3a1a" stroke="#2a1a08" stroke-width="2"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="60" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a3a1a">C: 尖った</text>
              <ellipse cx="30" cy="85" rx="6" ry="4" fill="#3a6a1a"/>
              <line x1="24" y1="83" x2="20" y2="78" stroke="#3a6a1a" stroke-width="1"/>
              <line x1="36" y1="83" x2="40" y2="78" stroke="#3a6a1a" stroke-width="1"/>
              <text x="30" y="108" font-size="9" text-anchor="middle" fill="#1a1a1a">昆虫</text>
            </g>
            <!-- D: 長く 細い (꽃꿀) -->
            <g transform="translate(320,70)">
              <ellipse cx="20" cy="20" rx="15" ry="12" fill="#d8d8d8" stroke="#5a5a5a" stroke-width="1.5"/>
              <path d="M 35 20 Q 50 22 65 24" fill="none" stroke="#8a5a2a" stroke-width="2.5"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="60" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a3a1a">D: 長く 細い</text>
              <ellipse cx="30" cy="85" rx="8" ry="3" fill="#e74c3c"/>
              <ellipse cx="30" cy="85" rx="3" ry="6" fill="#e74c3c"/>
              <text x="30" y="108" font-size="9" text-anchor="middle" fill="#1a1a1a">花の 蜜</text>
            </g>
            <!-- E: 中間 (과일) -->
            <g transform="translate(410,70)">
              <ellipse cx="20" cy="20" rx="16" ry="13" fill="#d0d0d0" stroke="#5a5a5a" stroke-width="1.5"/>
              <polygon points="36,17 52,20 36,23" fill="#8a5a2a" stroke="#5a3010" stroke-width="2"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="60" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a3a1a">E: 中間</text>
              <circle cx="30" cy="85" r="7" fill="#e74c3c"/>
              <text x="30" y="108" font-size="9" text-anchor="middle" fill="#1a1a1a">果物</text>
            </g>
            <text x="250" y="200" font-size="11" font-weight="bold" text-anchor="middle" fill="#3a6a1a">同じ 祖先 → 5つの 島 で 違う 食べ物 → 違う くちばし に 進化</text>
            <text x="250" y="225" font-size="10" text-anchor="middle" fill="#5a4a2a">これが 「適応 (てきおう)」 の 結果</text>
            <text x="250" y="252" font-size="10" font-weight="bold" text-anchor="middle" fill="#8a2a1a">事件 4 の 5種は 偶然 では ない — 自然選択 の 証拠</text>
          </svg>
        `,
      },
      {
        title: '②  自然選択の 3段階 — 変異·選択·遺伝',
        svg: `
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#fff5e8;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#7a3a1a">自然選択 の 3段階</text>
            <!-- Stage 1: 変異 -->
            <g transform="translate(40,80)">
              <rect x="0" y="0" width="120" height="140" fill="#fff" stroke="#7a3a1a" stroke-width="2" rx="8"/>
              <text x="60" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#7a3a1a">1. 変異</text>
              <!-- 다양한 부리 -->
              <g transform="translate(20,38)">
                <ellipse cx="14" cy="12" rx="10" ry="8" fill="#cdcdcd" stroke="#5a5a5a"/>
                <polygon points="24,10 36,12 24,14" fill="#8a5a2a"/>
              </g>
              <g transform="translate(20,68)">
                <ellipse cx="14" cy="12" rx="10" ry="8" fill="#cdcdcd" stroke="#5a5a5a"/>
                <polygon points="24,10 32,12 24,14" fill="#a0691a"/>
              </g>
              <g transform="translate(20,98)">
                <ellipse cx="14" cy="12" rx="10" ry="8" fill="#cdcdcd" stroke="#5a5a5a"/>
                <polygon points="24,11 38,8 38,15" fill="#5a3a1a"/>
              </g>
              <text x="60" y="135" font-size="9" text-anchor="middle" fill="#5a3a1a">個体ごと 違う 形質</text>
            </g>
            <!-- 矢印 1→2 -->
            <polygon points="170,150 195,140 195,160" fill="#7a3a1a"/>
            <!-- Stage 2: 選択 -->
            <g transform="translate(200,80)">
              <rect x="0" y="0" width="120" height="140" fill="#fff" stroke="#7a3a1a" stroke-width="2" rx="8"/>
              <text x="60" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#7a3a1a">2. 選択</text>
              <!-- 환경 (큰 씨앗) + 큰 부리만 살아남음 -->
              <circle cx="30" cy="50" r="10" fill="#8a5a2a" stroke="#5a3010"/>
              <circle cx="60" cy="48" r="11" fill="#8a5a2a" stroke="#5a3010"/>
              <circle cx="92" cy="52" r="10" fill="#8a5a2a" stroke="#5a3010"/>
              <text x="60" y="80" font-size="9" text-anchor="middle" fill="#5a3a1a">環境: 大きい 種子</text>
              <!-- 큰 부리 ✓ -->
              <g transform="translate(20,90)">
                <ellipse cx="14" cy="12" rx="10" ry="8" fill="#a8c8a8" stroke="#3a6a1a"/>
                <polygon points="24,10 36,12 24,14" fill="#8a5a2a"/>
                <text x="50" y="15" font-size="14" font-weight="bold" fill="#1a7a1a">✓</text>
              </g>
              <!-- 작은 부리 ✗ -->
              <g transform="translate(20,118)">
                <ellipse cx="14" cy="12" rx="10" ry="8" fill="#f0c8c8" stroke="#7a3a3a"/>
                <polygon points="24,10 30,12 24,14" fill="#a0691a"/>
                <text x="50" y="15" font-size="14" font-weight="bold" fill="#7a1a1a">✗</text>
              </g>
            </g>
            <!-- 矢印 2→3 -->
            <polygon points="330,150 355,140 355,160" fill="#7a3a1a"/>
            <!-- Stage 3: 遺伝 -->
            <g transform="translate(360,80)">
              <rect x="0" y="0" width="120" height="140" fill="#fff" stroke="#7a3a1a" stroke-width="2" rx="8"/>
              <text x="60" y="20" font-size="12" font-weight="bold" text-anchor="middle" fill="#7a3a1a">3. 遺伝</text>
              <!-- 親 (큰 부리) -->
              <g transform="translate(30,40)">
                <ellipse cx="14" cy="12" rx="11" ry="9" fill="#cdcdcd" stroke="#5a5a5a"/>
                <polygon points="25,10 38,12 25,14" fill="#8a5a2a"/>
                <text x="60" y="14" font-size="9" fill="#1a1a1a">親</text>
              </g>
              <line x1="40" y1="68" x2="40" y2="90" stroke="#7a3a1a" stroke-width="1.5" stroke-dasharray="2 2"/>
              <!-- 子 (큰 부리) -->
              <g transform="translate(20,95)">
                <ellipse cx="14" cy="12" rx="9" ry="7" fill="#e0e0e0" stroke="#5a5a5a"/>
                <polygon points="23,10 33,12 23,14" fill="#8a5a2a"/>
              </g>
              <g transform="translate(55,95)">
                <ellipse cx="14" cy="12" rx="9" ry="7" fill="#e0e0e0" stroke="#5a5a5a"/>
                <polygon points="23,10 33,12 23,14" fill="#8a5a2a"/>
              </g>
              <g transform="translate(85,95)">
                <ellipse cx="14" cy="12" rx="9" ry="7" fill="#e0e0e0" stroke="#5a5a5a"/>
                <polygon points="23,10 33,12 23,14" fill="#8a5a2a"/>
              </g>
              <text x="60" y="135" font-size="9" text-anchor="middle" fill="#5a3a1a">子に 受け継がれる</text>
            </g>
            <text x="250" y="252" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a3a1a">変異 + 選択 + 遺伝 = 進化</text>
            <text x="250" y="278" font-size="10" text-anchor="middle" fill="#5a4a2a">この 3条件が 全て 揃うと、 種は 環境に 適応 して 変わって いく</text>
          </svg>
        `,
      },
      {
        title: '③  ビーグル号の 航海 (1831-1836)',
        svg: `
          <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#cfe8f0;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a4a7a">5年の 航海 — 自然選択 発見の 旅</text>
            <!-- 바다 배경 + 대륙 -->
            <rect x="0" y="40" width="500" height="220" fill="#a8d4e8"/>
            <!-- 영국 -->
            <path d="M 220 70 L 240 60 L 250 80 L 235 95 Z" fill="#8ab070" stroke="#3a5a2a" stroke-width="1.5"/>
            <text x="235" y="55" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a3a1a">英国</text>
            <!-- 남미 -->
            <path d="M 130 110 Q 145 130 150 170 Q 145 210 130 230 L 115 220 Q 110 175 120 140 Z" fill="#8ab070" stroke="#3a5a2a" stroke-width="1.5"/>
            <text x="135" y="190" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a3a1a">南米</text>
            <!-- 갈라파고스 (강조) -->
            <circle cx="90" cy="160" r="6" fill="#e74c3c" stroke="#7a1a1a" stroke-width="2"/>
            <circle cx="85" cy="155" r="3" fill="#e74c3c"/>
            <circle cx="95" cy="158" r="3" fill="#e74c3c"/>
            <text x="40" y="155" font-size="9" font-weight="bold" fill="#7a1a1a">ガラパゴス</text>
            <text x="40" y="167" font-size="9" font-weight="bold" fill="#7a1a1a">諸島 ★</text>
            <!-- 호주 -->
            <ellipse cx="400" cy="190" rx="40" ry="22" fill="#8ab070" stroke="#3a5a2a" stroke-width="1.5"/>
            <text x="400" y="195" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a3a1a">豪州</text>
            <!-- 항해 경로 (점선) -->
            <path d="M 232 90 Q 200 100 160 130 Q 130 160 120 200" fill="none" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ah_voy1)"/>
            <path d="M 120 200 Q 105 175 90 165" fill="none" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ah_voy2)"/>
            <path d="M 90 165 Q 200 220 360 195" fill="none" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ah_voy3)"/>
            <path d="M 400 180 Q 380 130 280 90 Q 250 80 240 80" fill="none" stroke="#e74c3c" stroke-width="2" stroke-dasharray="5 4" marker-end="url(#ah_voy4)"/>
            <!-- 배 아이콘 -->
            <g transform="translate(245,85)">
              <polygon points="0,5 14,5 12,0 2,0" fill="#fff"/>
              <rect x="6" y="-8" width="2" height="8" fill="#5a3a18"/>
              <polygon points="8,-8 14,-2 8,-2" fill="#fff"/>
            </g>
            <defs>
              <marker id="ah_voy1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e74c3c"/></marker>
              <marker id="ah_voy2" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e74c3c"/></marker>
              <marker id="ah_voy3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e74c3c"/></marker>
              <marker id="ah_voy4" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e74c3c"/></marker>
            </defs>
            <text x="250" y="258" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a4a7a">英国 → 南米 → ガラパゴス → 豪州 → 英国 (5年間)</text>
          </svg>
        `,
      },
      {
        title: '④  共通祖先と 種の 分化 — 生命の 木',
        svg: `
          <svg viewBox="0 0 450 350" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:430px;height:auto;background:#eef8ee;border-radius:12px;">
            <text x="225" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a6a2a">同じ 祖先 → 環境 適応 → 5種に 分化</text>
            <!-- 공통조상 (하단) -->
            <g transform="translate(200,290)">
              <ellipse cx="25" cy="15" rx="22" ry="14" fill="#a8c8a8" stroke="#3a6a1a" stroke-width="2"/>
              <polygon points="45,13 60,15 45,17" fill="#8a5a2a"/>
              <circle cx="18" cy="11" r="2" fill="#1a1a1a"/>
              <text x="25" y="50" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a4a1a">共通祖先 (1種)</text>
            </g>
            <!-- 분기 줄기 -->
            <line x1="225" y1="280" x2="225" y2="220" stroke="#5a3a1a" stroke-width="3"/>
            <line x1="225" y1="220" x2="80" y2="170" stroke="#5a3a1a" stroke-width="2.5"/>
            <line x1="225" y1="220" x2="150" y2="160" stroke="#5a3a1a" stroke-width="2.5"/>
            <line x1="225" y1="220" x2="225" y2="155" stroke="#5a3a1a" stroke-width="2.5"/>
            <line x1="225" y1="220" x2="300" y2="160" stroke="#5a3a1a" stroke-width="2.5"/>
            <line x1="225" y1="220" x2="370" y2="170" stroke="#5a3a1a" stroke-width="2.5"/>
            <!-- 5종 핀치 (상단) -->
            <g transform="translate(50,100)">
              <ellipse cx="20" cy="20" rx="18" ry="13" fill="#cdcdcd" stroke="#5a5a5a" stroke-width="1.5"/>
              <polygon points="36,18 60,20 36,22" fill="#8a5a2a" stroke="#5a3010" stroke-width="1.5"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="55" font-size="9" font-weight="bold" text-anchor="middle" fill="#7a3a1a">A 太い</text>
              <text x="30" y="68" font-size="8" text-anchor="middle" fill="#5a3a1a">島1·大種子</text>
            </g>
            <g transform="translate(120,90)">
              <ellipse cx="20" cy="20" rx="16" ry="12" fill="#d8d8d8" stroke="#5a5a5a" stroke-width="1.5"/>
              <polygon points="34,18 52,20 34,22" fill="#a0691a" stroke="#5a3010" stroke-width="1.5"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="28" y="50" font-size="9" font-weight="bold" text-anchor="middle" fill="#7a3a1a">B 細い</text>
              <text x="28" y="63" font-size="8" text-anchor="middle" fill="#5a3a1a">島2·小種子</text>
            </g>
            <g transform="translate(195,85)">
              <ellipse cx="20" cy="20" rx="16" ry="12" fill="#cdcdcd" stroke="#5a5a5a" stroke-width="1.5"/>
              <polygon points="34,20 54,16 54,24" fill="#5a3a1a" stroke="#2a1a08" stroke-width="1.5"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="50" font-size="9" font-weight="bold" text-anchor="middle" fill="#7a3a1a">C 尖った</text>
              <text x="30" y="63" font-size="8" text-anchor="middle" fill="#5a3a1a">島3·昆虫</text>
            </g>
            <g transform="translate(270,90)">
              <ellipse cx="20" cy="20" rx="15" ry="11" fill="#d8d8d8" stroke="#5a5a5a" stroke-width="1.5"/>
              <path d="M 33 20 Q 48 22 60 24" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="50" font-size="9" font-weight="bold" text-anchor="middle" fill="#7a3a1a">D 長い</text>
              <text x="30" y="63" font-size="8" text-anchor="middle" fill="#5a3a1a">島4·花蜜</text>
            </g>
            <g transform="translate(340,100)">
              <ellipse cx="20" cy="20" rx="16" ry="12" fill="#d0d0d0" stroke="#5a5a5a" stroke-width="1.5"/>
              <polygon points="34,18 50,20 34,22" fill="#8a5a2a" stroke="#5a3010" stroke-width="1.5"/>
              <circle cx="14" cy="16" r="2" fill="#1a1a1a"/>
              <text x="30" y="55" font-size="9" font-weight="bold" text-anchor="middle" fill="#7a3a1a">E 中間</text>
              <text x="30" y="68" font-size="8" text-anchor="middle" fill="#5a3a1a">島5·果物</text>
            </g>
            <!-- 시간축 -->
            <line x1="40" y1="240" x2="410" y2="240" stroke="#5a3a1a" stroke-width="1" stroke-dasharray="2 2"/>
            <text x="40" y="255" font-size="9" fill="#5a3a1a">何万年 前</text>
            <text x="410" y="255" font-size="9" text-anchor="end" fill="#5a3a1a">現在</text>
            <line x1="225" y1="245" x2="225" y2="235" stroke="#5a3a1a" stroke-width="1"/>
            <!-- 화살표 시간 흐름 -->
            <polygon points="405,237 415,240 405,243" fill="#5a3a1a"/>
            <text x="225" y="335" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">全ての 生き物は 共通祖先から 分かれた 「生命の 木」 の 枝</text>
          </svg>
        `,
      },
    ],

    formulas: [
      {
        name: '自然選択の 3原則',
        formula: '変異 + 環境圧力 + 遺伝 = 進化',
        formulaSimple: '変異 + 選択 + 遺伝',
        explanation: '1) 個体ごとに 少し 違う 変異が ある, 2) 環境に 合う 個体が より 多く 生き残る, 3) 形質が 子に 受け継がれる。 この 3つが 全て 揃うと 進化 発生。',
        note: '式 ではなく 「条件」。 全ての 生物に 当てはまる 普遍 原理。',
      },
      {
        name: '適応の 結果',
        formula: '「環境に ぴったり 合う 形質」 が 集団の 多数に なる',
        formulaSimple: '適応 = 環境 ↔ 形質 一致',
        explanation: '「強い」 より 「合う」 が 大切。 環境が 変われば 昨日 有利だった 形質が 今日は 不利に なる ことも ある。',
        note: '進化に 「目的」 は ない。 ただ 「結果」 として 環境に 合う 形質が 残る だけ。',
      },
    ],

    unitsTable: {
      title: '進化 キーワード まとめ',
      rows: [
        ['用語',                  '意味',                                          '例'],
        ['進化 (しんか)',          '世代を 経て 種が 変化 する 過程',                 '5種 フィンチの 分化'],
        ['自然選択',              '環境に 合う 個体が 生き残り 子孫を 残す こと',     '大きい くちばし → 大きい 種子の 島で 優勢'],
        ['変異 (へんい)',          '同じ 種でも 個体ごとに 形質が 少しずつ 違う こと', '同じ フィンチでも くちばし サイズ が 違う'],
        ['遺伝 (いでん)',          '形質が 親から 子へ 受け継がれる こと',           '大きい くちばし 親 → 大きい くちばし 子'],
        ['適応 (てきおう)',        '環境に 合うように 形質が 変わる こと',          '島ごと 違う 食べ物に 合う くちばし'],
        ['共通祖先',              '複数の 種が 共有する 昔の 祖先',                  '5種 フィンチ = 1種 フィンチ の 子孫'],
      ],
    },

    flashcards: [
      { front: '進化 (しんか)',             back: '世代を 経て 生物の 形質が 変化 する 過程。 ダーウィン が 1859年 『種の 起源』 で 体系化。' },
      { front: '自然選択 (しぜんせんたく)', back: '環境に 合う 個体が より 多く 生き残り 子孫を 残す 仕組み。 進化の 主な 原動力。' },
      { front: '変異 (へんい)',             back: '同じ 種でも 個体ごとに 形質が 少しずつ 違う こと。 進化の 出発点。' },
      { front: '遺伝 (いでん)',             back: '親の 形質が 子に 伝わる こと。 進化が 起こる ための 必須 条件。' },
      { front: '適応 (てきおう)',           back: '生物が 環境に 合う 形質を 持つように なる こと。 自然選択の 結果。' },
      { front: '共通祖先 (きょうつうそせん)', back: '複数の 種が 共有する 昔の 祖先。 5種 フィンチ = 1種 祖先 から 分化。' },
      { front: 'フィンチ (Finch)',          back: 'ガラパゴス諸島の 小さな 鳥。 ダーウィン 進化論の 核心 証拠。 13~14種 存在。' },
      { front: 'ガラパゴス 諸島',           back: 'エクアドル 西の 太平洋 火山島群。 ダーウィン が 約 5週間 滞在し フィンチを 観察。' },
      { front: 'ビーグル号',                back: 'ダーウィン が 5年間 (1831-1836) 世界一周した 英国 海軍 測量船。' },
      { front: 'チャールズ·ダーウィン',     back: '英国 自然主義者 (1809-1882)。 ビーグル号 航海 後 自然選択説 発表。 『種の 起源』 (1859) 著者。' },
    ],

    exercises: [
      {
        q: '事件 4 の 5種の フィンチの くちばしが 違う 理由は?',
        options: ['神様が 別々に 作った', '各島の 食べ物に 自然選択で 適応した', '偶然 違う 種が 集まった', '人間が 人工的に 変えた'],
        correct: 1,
        explanation: '事件 4 の 核心。 1種から 始まり → 各島の 食べ物に 適応 → 5種に 分化。',
      },
      {
        q: '自然選択の 3条件 ではない のは?',
        options: ['変異', '環境圧力 (選択)', '遺伝', '目的'],
        correct: 3,
        explanation: '進化に 「目的」 は ない。 ただ 結果として 環境に 合う 形質が 生き残る だけ。',
      },
      {
        q: '進化論を 体系化した 人は?',
        options: ['ニュートン', 'アインシュタイン', 'ダーウィン', 'ガリレオ'],
        correct: 2,
        explanation: 'チャールズ·ダーウィン (1809-1882)。 ビーグル号 5年 航海 後 1859年 『種の 起源』 発表。',
      },
      {
        q: 'ダーウィンが フィンチを 観察した 諸島の 名前は?',
        options: ['ハワイ', 'ガラパゴス', 'マダガスカル', 'カナリア'],
        correct: 1,
        explanation: 'ガラパゴス 諸島 (エクアドル 西)。 ダーウィン が 1835年 約 5週間 滞在。',
      },
      {
        q: '同じ 種の 個体が 少しずつ 違う 形質を 持つ ことを 何と いう?',
        options: ['遺伝', '変異', '進化', '適応'],
        correct: 1,
        explanation: '変異 (へんい)。 進化の 出発点。 変異が なければ 進化も ない。',
      },
      {
        q: '大きい 種子しか ない 島 では、 どんな くちばしの フィンチが 最も よく 生き残る?',
        options: ['細い くちばし', '太く 大きい くちばし', '長く 細い くちばし', '尖った くちばし'],
        correct: 1,
        explanation: '大きい 種子を 割る には 強い くちばし が 必要。 自然選択の 直接 例。',
      },
      {
        q: '次の うち、 進化の 結果 と 言え ない のは?',
        options: ['北極熊の 白い 毛', 'カメレオン の 色 変化', '人工的に 品種改良 した 犬', 'キリン の 長い 首'],
        correct: 2,
        explanation: '品種改良は 「人工選択」。 自然進化とは 別の 仕組み (ただし 原理は 似ている)。',
      },
      {
        q: 'ダーウィンが ビーグル号で 航海した 期間は?',
        options: ['1年', '3年', '5年', '10年'],
        correct: 2,
        explanation: '1831-1836年、 約 5年間 世界一周。 ガラパゴスは その 一つの 寄港地。',
      },
      {
        q: '「自然選択」 を 正しく 説明した のは?',
        options: ['強い 個体だけ 生き残る', '環境に 合う 個体が より 多く 子孫を 残す', '神様が 生き残る 個体を 決める', '全ての 個体が 平等に 生き残る'],
        correct: 1,
        explanation: '「適者生存」 は 「強者生存」 では ない。 環境 適合度が 核心。',
      },
      {
        q: '5種 フィンチが 全て 1種の 共通祖先から 分化した 証拠 ではない のは?',
        options: ['古い 化石が 1種だけ 残って いる', 'DNA 分析 結果 とても 似て いる', '5種 全て 同じ 色の 羽', '5種 全て 似た 鳴き声'],
        correct: 2,
        explanation: '羽の 色は 環境 適応の 結果で、 共通祖先の 証拠 では ない。 他 3つは 全て 有効な 証拠。',
      },
    ],

    tips: [
      { title: '①  進化 = 「強者」 より 「適者」',     body: '進化は 「強い 個体」 ではなく 「環境に 合う 個体」 が 生き残る 過程。 「適者生存」。' },
      { title: '②  自然選択 = 変異 + 選択 + 遺伝',   body: 'この 3つが 全て 揃うと 進化 発生。 どれか 一つでも 欠ければ ダメ。' },
      { title: '③  進化に 「目的」 は ない',           body: '未来の ために 進化する のでは なく、 環境 適合 個体が 生き残った 「結果」。' },
      { title: '④  時間が 鍵 — 何万年·何百万年',     body: '短期間 では 進化は ほぼ 観察 不可。 化石 記録·DNA 分析で 追跡。' },
      { title: '⑤  共通祖先 — 全ての 生物は 親戚',   body: '人間·ゴリラ·魚·植物 すべて 遡れば 共通祖先。 「生命の 木」。' },
      { title: '⑥  ガラパゴス フィンチ = 進化論の 象徴', body: '5種の くちばしの 違い = 自然選択の 直接 証拠。 ダーウィン が 『種の 起源』 核心 事例で 使用。' },
      { title: '⑦  人工選択も 進化の 一種',           body: '犬の 品種改良·小麦 などの 農作物。 人間が 環境の 役割を する。 原理は 自然選択と 同じ。' },
      { title: '⑧  進化は 今も 進行中',               body: '抗生物質 耐性菌·都市 環境 適応 生物 など。 私たちの 目の 前でも 進化 観察 可能。' },
    ],
  },
  scientists_case05: {
    title: '微生物と 細菌の 世界',
    subtitle: '事件 5 で 学んだ こと',
    examScope: '中学 生物 + 比喩 中心 (정성적 이해)',

    concept: {
      title: '微生物と 細菌の 世界',
      paragraphs: [
        '事件 5 の 腐った スープ — その 原因は、 空気中に 漂う 目に 見えない 小さな 生き物 「微生物 (びせいぶつ)」 でした。 パスツール は 1861年 ごろ、 有名な 「白鳥の 首 フラスコ」 実験で これを 証明 しました。',
        'それまで 人々は 「腐敗や 生命は 物質から 自然に 生まれる (自然発生説)」 と 信じて いました。 パスツール は、 空気は 通すが 微生物は 通さない 曲がった 首の フラスコ を 使い、 微生物が 入らなければ スープは 腐らない ことを 示したのです。',
        '微生物には 細菌 (バクテリア)・ウイルス・カビ など が あります。 多くは 無害 または 有益 (発酵·分解) ですが、 一部は 病気を 引き起こします。 これを 「病原菌」 と 言います。',
        'パスツール の 発見は 医学を 大きく 変えました。 殺菌·消毒で 病気を 防ぎ、 弱めた 病原菌で 作る 「ワクチン」 で 免疫を つける — 今 私たちが 健康に 暮らせる のは、 この 「見えない 世界」 の 発見の おかげ なのです。',
      ],
      highlight: '腐敗も 病気も、 目に 見えない 微生物が 原因。 清潔·殺菌·ワクチン で 防げる。',
    },

    diagrams: [
      {
        title: '①  白鳥の 首 フラスコ — 対照 実験',
        svg: `
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#eef4f8;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a4a7a">白鳥の 首 フラスコ — 対照 実験</text>
            <!-- LEFT: 真っ直ぐな 首 (썩음) -->
            <text x="125" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#7a1a1a">A: 真っ直ぐな 首</text>
            <g transform="translate(85,55)">
              <line x1="40" y1="10" x2="40" y2="90" stroke="#5a8a9a" stroke-width="3" fill="none"/>
              <ellipse cx="40" cy="125" rx="42" ry="32" fill="#8a4a2a" stroke="#5a2a18" stroke-width="2"/>
              <ellipse cx="40" cy="125" rx="36" ry="28" fill="#a8623a" opacity="0.7"/>
            </g>
            <!-- 공기 + 미생물 (좌측 직진) -->
            <text x="125" y="80" font-size="10" text-anchor="middle" fill="#1a4a7a">空気 ↓</text>
            <line x1="125" y1="85" x2="125" y2="115" stroke="#1a4a7a" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#ah_p1)"/>
            <!-- 미생물 점 (좌측 도달) -->
            <g fill="#7a1a1a">
              <circle cx="118" cy="92" r="2.5"/>
              <circle cx="130" cy="96" r="2"/>
              <circle cx="124" cy="105" r="2.5"/>
              <circle cx="115" cy="118" r="2"/>
              <circle cx="135" cy="135" r="2"/>
              <circle cx="120" cy="145" r="2.5"/>
              <circle cx="142" cy="148" r="2"/>
            </g>
            <text x="125" y="195" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a1a1a">微生物 直行 → 腐る</text>
            <!-- RIGHT: S字 首 (안 썩음) -->
            <text x="375" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a6a2a">B: S字に 曲がった 首</text>
            <g transform="translate(335,55)">
              <!-- S자 목 -->
              <path d="M 40 10 Q 40 30 60 38 Q 80 46 60 56 Q 40 64 40 80" stroke="#5a8a9a" stroke-width="3" fill="none"/>
              <ellipse cx="40" cy="125" rx="42" ry="32" fill="#a8d4e8" stroke="#1a4a7a" stroke-width="2"/>
              <ellipse cx="40" cy="125" rx="36" ry="28" fill="#cfe8f0" opacity="0.8"/>
            </g>
            <!-- 공기 (우측 통과) -->
            <text x="375" y="76" font-size="10" text-anchor="middle" fill="#1a4a7a">空気 ↓</text>
            <line x1="375" y1="82" x2="375" y2="92" stroke="#1a4a7a" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#ah_p1b)"/>
            <line x1="385" y1="125" x2="400" y2="135" stroke="#1a4a7a" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#ah_p1c)"/>
            <!-- 미생물 점 (S자 골에 갇힘) -->
            <g fill="#7a1a1a">
              <circle cx="372" cy="91" r="2.5"/>
              <circle cx="378" cy="100" r="2"/>
              <circle cx="392" cy="103" r="2"/>
              <circle cx="394" cy="111" r="2.5"/>
              <circle cx="388" cy="108" r="2"/>
            </g>
            <!-- 水滴 마크 -->
            <ellipse cx="395" cy="105" rx="4" ry="3" fill="#3498db" opacity="0.6"/>
            <text x="425" y="105" font-size="9" fill="#4a2a8a">微生物</text>
            <text x="425" y="116" font-size="9" fill="#4a2a8a">捕まる</text>
            <text x="375" y="195" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">空気だけ 通る → 腐らない</text>
            <defs>
              <marker id="ah_p1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1a4a7a"/></marker>
              <marker id="ah_p1b" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1a4a7a"/></marker>
              <marker id="ah_p1c" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1a4a7a"/></marker>
            </defs>
            <text x="250" y="240" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a4a7a">空気は 通る、 微生物は 曲がった 首で 止まる</text>
            <text x="250" y="265" font-size="10" text-anchor="middle" fill="#5a4a2a">「腐敗の 原因は 空気 自体 ではなく、 空気中の 微生物」 を 証明</text>
            <text x="250" y="288" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a1a1a">パスツール 1861年 — 自然発生説 を 否定</text>
          </svg>
        `,
      },
      {
        title: '②  微生物 3種類 — 細菌·ウイルス·カビ',
        svg: `
          <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#fff5e8;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#7a3a1a">目に 見えない 小さな 生き物たち</text>
            <!-- 細菌 (バクテリア) -->
            <text x="90" y="60" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a6a2a">細菌 (バクテリア)</text>
            <g transform="translate(30,75)">
              <!-- 막대형 -->
              <rect x="0" y="20" width="40" height="14" rx="7" fill="#a8d4a8" stroke="#3a6a1a" stroke-width="1.5"/>
              <rect x="20" y="50" width="40" height="14" rx="7" fill="#a8d4a8" stroke="#3a6a1a" stroke-width="1.5"/>
              <!-- 구형 -->
              <circle cx="80" cy="32" r="10" fill="#8ac88a" stroke="#3a6a1a" stroke-width="1.5"/>
              <circle cx="100" cy="60" r="9" fill="#8ac88a" stroke="#3a6a1a" stroke-width="1.5"/>
              <circle cx="115" cy="35" r="8" fill="#8ac88a" stroke="#3a6a1a" stroke-width="1.5"/>
            </g>
            <text x="90" y="170" font-size="10" text-anchor="middle" fill="#5a3a1a">1~10 μm</text>
            <text x="90" y="185" font-size="9" text-anchor="middle" fill="#5a3a1a">細胞 あり</text>
            <text x="90" y="200" font-size="9" text-anchor="middle" fill="#1a6a2a">例: 乳酸菌·大腸菌</text>
            <!-- 분리선 -->
            <line x1="180" y1="40" x2="180" y2="230" stroke="#bdbdbd" stroke-width="1" stroke-dasharray="3 2"/>
            <!-- ウイルス -->
            <text x="250" y="60" font-size="12" font-weight="bold" text-anchor="middle" fill="#7a1a1a">ウイルス</text>
            <g transform="translate(210,75)">
              <!-- 정20면체형 -->
              <polygon points="40,15 60,30 55,55 25,55 20,30" fill="#e8a8a8" stroke="#7a1a1a" stroke-width="1.5"/>
              <polygon points="40,15 60,30 55,55 25,55 20,30" fill="none" stroke="#7a1a1a" stroke-width="1" opacity="0.5"/>
              <line x1="40" y1="15" x2="40" y2="55" stroke="#7a1a1a" stroke-width="0.8" opacity="0.5"/>
              <line x1="20" y1="30" x2="55" y2="55" stroke="#7a1a1a" stroke-width="0.8" opacity="0.5"/>
              <line x1="60" y1="30" x2="25" y2="55" stroke="#7a1a1a" stroke-width="0.8" opacity="0.5"/>
              <!-- 작은 점 -->
              <circle cx="20" cy="80" r="4" fill="#e8a8a8" stroke="#7a1a1a" stroke-width="1"/>
              <circle cx="55" cy="85" r="4" fill="#e8a8a8" stroke="#7a1a1a" stroke-width="1"/>
              <circle cx="35" cy="100" r="4" fill="#e8a8a8" stroke="#7a1a1a" stroke-width="1"/>
            </g>
            <text x="250" y="170" font-size="10" text-anchor="middle" fill="#5a3a1a">20~300 nm (細菌 より 小)</text>
            <text x="250" y="185" font-size="9" text-anchor="middle" fill="#5a3a1a">細胞 なし</text>
            <text x="250" y="200" font-size="9" text-anchor="middle" fill="#7a1a1a">例: 風邪·インフル·コロナ</text>
            <!-- 분리선 -->
            <line x1="340" y1="40" x2="340" y2="230" stroke="#bdbdbd" stroke-width="1" stroke-dasharray="3 2"/>
            <!-- カビ -->
            <text x="410" y="60" font-size="12" font-weight="bold" text-anchor="middle" fill="#4a2a7a">カビ</text>
            <g transform="translate(360,70)">
              <!-- 실 모양 + 포자 -->
              <path d="M 10 80 Q 30 50 50 80 Q 70 50 90 80" stroke="#7a5a2a" stroke-width="2" fill="none"/>
              <line x1="20" y1="65" x2="20" y2="40" stroke="#7a5a2a" stroke-width="1.5"/>
              <line x1="50" y1="65" x2="50" y2="30" stroke="#7a5a2a" stroke-width="1.5"/>
              <line x1="80" y1="65" x2="80" y2="42" stroke="#7a5a2a" stroke-width="1.5"/>
              <!-- 포자 -->
              <circle cx="20" cy="35" r="6" fill="#4a2a7a" stroke="#1a0a3a" stroke-width="1"/>
              <circle cx="20" cy="25" r="5" fill="#4a2a7a" stroke="#1a0a3a" stroke-width="1"/>
              <circle cx="50" cy="25" r="6" fill="#4a2a7a" stroke="#1a0a3a" stroke-width="1"/>
              <circle cx="50" cy="15" r="5" fill="#4a2a7a" stroke="#1a0a3a" stroke-width="1"/>
              <circle cx="80" cy="35" r="6" fill="#4a2a7a" stroke="#1a0a3a" stroke-width="1"/>
            </g>
            <text x="410" y="170" font-size="10" text-anchor="middle" fill="#5a3a1a">数十 μm (大きい)</text>
            <text x="410" y="185" font-size="9" text-anchor="middle" fill="#5a3a1a">糸状 + 胞子</text>
            <text x="410" y="200" font-size="9" text-anchor="middle" fill="#4a2a7a">例: パン·コウジ·青カビ</text>
            <text x="250" y="245" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a3a1a">大きさ: ウイルス &lt; 細菌 &lt; カビ</text>
            <text x="250" y="268" font-size="10" text-anchor="middle" fill="#5a4a2a">多くは 無害·有益、 一部だけが 病原菌</text>
          </svg>
        `,
      },
      {
        title: '③  ワクチンの 原理 — 弱めた 敵で 練習',
        svg: `
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#eef8ee;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a6a2a">ワクチン の 3段階</text>
            <!-- Stage 1 : 약한 병원균 주입 -->
            <g transform="translate(30,60)">
              <rect x="0" y="0" width="135" height="180" fill="#fff" stroke="#1a6a2a" stroke-width="2" rx="8"/>
              <text x="67" y="22" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a6a2a">1. 弱毒 注射</text>
              <!-- 주사기 -->
              <g transform="translate(20,40)">
                <rect x="0" y="10" width="50" height="10" fill="#c0c0c0" stroke="#5a5a5a" stroke-width="1.5"/>
                <rect x="-8" y="8" width="8" height="14" fill="#5a5a5a"/>
                <polygon points="50,15 75,15 80,18 50,18" fill="#7a8a9a"/>
                <line x1="80" y1="16.5" x2="95" y2="16.5" stroke="#7a8a9a" stroke-width="1.5"/>
                <!-- 액체 -->
                <rect x="2" y="11" width="46" height="8" fill="#a8d4e8" opacity="0.8"/>
              </g>
              <!-- 약한 병원균 -->
              <g transform="translate(30,90)">
                <circle cx="10" cy="10" r="6" fill="#e8a8a8" stroke="#7a1a1a" stroke-width="1" opacity="0.7"/>
                <circle cx="40" cy="14" r="5" fill="#e8a8a8" stroke="#7a1a1a" stroke-width="1" opacity="0.7"/>
                <circle cx="70" cy="8" r="6" fill="#e8a8a8" stroke="#7a1a1a" stroke-width="1" opacity="0.7"/>
                <text x="40" y="40" font-size="10" text-anchor="middle" fill="#5a3a1a">弱めた 病原菌</text>
              </g>
              <text x="67" y="165" font-size="9" text-anchor="middle" fill="#5a3a1a">体に 入れる</text>
            </g>
            <!-- 矢印 -->
            <polygon points="175,150 200,138 200,162" fill="#1a6a2a"/>
            <!-- Stage 2: 항체 만듦 -->
            <g transform="translate(205,60)">
              <rect x="0" y="0" width="135" height="180" fill="#fff" stroke="#1a6a2a" stroke-width="2" rx="8"/>
              <text x="67" y="22" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a6a2a">2. 免疫 獲得</text>
              <!-- 면역 세포 + 항체 -->
              <g transform="translate(20,40)">
                <circle cx="45" cy="35" r="20" fill="#a8c8e8" stroke="#1a4a7a" stroke-width="1.5"/>
                <text x="45" y="40" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a3a5a">免疫</text>
                <!-- 항체 Y자 -->
                <g transform="translate(10,75) rotate(-30)" stroke="#1a4a7a" stroke-width="1.8" fill="none">
                  <line x1="0" y1="6" x2="6" y2="0"/>
                  <line x1="12" y1="6" x2="6" y2="0"/>
                  <line x1="6" y1="0" x2="6" y2="-10"/>
                </g>
                <g transform="translate(40,80)" stroke="#1a4a7a" stroke-width="1.8" fill="none">
                  <line x1="0" y1="6" x2="6" y2="0"/>
                  <line x1="12" y1="6" x2="6" y2="0"/>
                  <line x1="6" y1="0" x2="6" y2="-10"/>
                </g>
                <g transform="translate(70,75) rotate(30)" stroke="#1a4a7a" stroke-width="1.8" fill="none">
                  <line x1="0" y1="6" x2="6" y2="0"/>
                  <line x1="12" y1="6" x2="6" y2="0"/>
                  <line x1="6" y1="0" x2="6" y2="-10"/>
                </g>
                <text x="45" y="115" font-size="10" text-anchor="middle" fill="#1a3a5a">抗体 (Y字)</text>
              </g>
              <text x="67" y="165" font-size="9" text-anchor="middle" fill="#5a3a1a">体が 「敵」 を 覚える</text>
            </g>
            <!-- 矢印 -->
            <polygon points="350,150 375,138 375,162" fill="#1a6a2a"/>
            <!-- Stage 3: 진짜 병원균 격퇴 -->
            <g transform="translate(380,60)">
              <rect x="0" y="0" width="105" height="180" fill="#fff" stroke="#1a6a2a" stroke-width="2" rx="8"/>
              <text x="52" y="22" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">3. 本物 撃退</text>
              <!-- 진짜 병원균 -->
              <g transform="translate(15,40)">
                <circle cx="20" cy="10" r="8" fill="#e74c3c" stroke="#7a1a1a" stroke-width="1.5"/>
                <circle cx="55" cy="14" r="7" fill="#e74c3c" stroke="#7a1a1a" stroke-width="1.5"/>
                <text x="35" y="35" font-size="9" text-anchor="middle" fill="#7a1a1a">本物 病原菌</text>
              </g>
              <!-- 항체가 격퇴 -->
              <line x1="20" y1="75" x2="35" y2="95" stroke="#1a4a7a" stroke-width="2"/>
              <line x1="60" y1="75" x2="50" y2="95" stroke="#1a4a7a" stroke-width="2"/>
              <text x="52" y="115" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a4a7a">×</text>
              <text x="52" y="140" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a6a2a">撃退!</text>
              <text x="52" y="165" font-size="9" text-anchor="middle" fill="#5a3a1a">免疫が 守る</text>
            </g>
            <text x="250" y="270" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">弱めた 敵で 練習 → 本物が 来ても 勝てる</text>
            <text x="250" y="290" font-size="10" text-anchor="middle" fill="#5a4a2a">パスツール が 광견병·탄저병 백신을 개발 (1880년대)</text>
          </svg>
        `,
      },
      {
        title: '④  衛生 3原則 — 清潔が 命を 守る',
        svg: `
          <svg viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:430px;height:auto;background:#fff5f0;border-radius:12px;">
            <text x="225" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#8a4a1a">衛生 3原則 — パスツールの 教え</text>
            <!-- 手洗い -->
            <g transform="translate(40,60)">
              <rect x="0" y="0" width="115" height="170" fill="#fff" stroke="#8a4a1a" stroke-width="2" rx="8"/>
              <text x="57" y="22" font-size="12" font-weight="bold" text-anchor="middle" fill="#8a4a1a">① 手洗い</text>
              <!-- 손 -->
              <g transform="translate(25,40)">
                <path d="M 10 40 L 10 15 Q 10 5 20 5 Q 30 5 30 15 L 30 35" fill="#fdd5b3" stroke="#8a5a2a" stroke-width="1.5"/>
                <path d="M 30 40 L 30 10 Q 30 0 40 0 Q 50 0 50 10 L 50 35" fill="#fdd5b3" stroke="#8a5a2a" stroke-width="1.5"/>
                <path d="M 50 40 L 50 12 Q 50 2 60 2 Q 70 2 70 12 L 70 35" fill="#fdd5b3" stroke="#8a5a2a" stroke-width="1.5"/>
                <rect x="5" y="35" width="65" height="35" fill="#fdd5b3" stroke="#8a5a2a" stroke-width="1.5" rx="3"/>
              </g>
              <!-- 거품 -->
              <circle cx="55" cy="125" r="6" fill="#a8d4e8" stroke="#1a4a7a" stroke-width="1" opacity="0.6"/>
              <circle cx="70" cy="120" r="5" fill="#a8d4e8" stroke="#1a4a7a" stroke-width="1" opacity="0.6"/>
              <circle cx="45" cy="118" r="4" fill="#a8d4e8" stroke="#1a4a7a" stroke-width="1" opacity="0.6"/>
              <text x="57" y="155" font-size="9" text-anchor="middle" fill="#5a3a1a">石鹸で 洗う</text>
            </g>
            <!-- 加熱·殺菌 -->
            <g transform="translate(170,60)">
              <rect x="0" y="0" width="115" height="170" fill="#fff" stroke="#8a4a1a" stroke-width="2" rx="8"/>
              <text x="57" y="22" font-size="12" font-weight="bold" text-anchor="middle" fill="#8a4a1a">② 加熱·殺菌</text>
              <!-- 냄비 -->
              <g transform="translate(20,50)">
                <ellipse cx="37" cy="50" rx="32" ry="8" fill="#8a8a8a" stroke="#3a3a3a" stroke-width="1.5"/>
                <rect x="5" y="20" width="64" height="32" fill="#a8a8a8" stroke="#3a3a3a" stroke-width="1.5"/>
                <ellipse cx="37" cy="20" rx="32" ry="6" fill="#7a8a9a" stroke="#3a3a3a" stroke-width="1.5"/>
                <ellipse cx="37" cy="22" rx="28" ry="3" fill="#a8c4e8"/>
              </g>
              <!-- 김 -->
              <path d="M 195 95 Q 200 85 195 78 Q 190 70 195 60" stroke="#cdcdcd" stroke-width="2" fill="none" transform="translate(-180,-5)"/>
              <path d="M 210 95 Q 215 85 210 78 Q 205 70 210 60" stroke="#cdcdcd" stroke-width="2" fill="none" transform="translate(-180,-5)"/>
              <path d="M 225 95 Q 230 85 225 78 Q 220 70 225 60" stroke="#cdcdcd" stroke-width="2" fill="none" transform="translate(-180,-5)"/>
              <text x="57" y="148" font-size="9" text-anchor="middle" fill="#5a3a1a">煮沸·低温殺菌</text>
              <text x="57" y="160" font-size="8" text-anchor="middle" fill="#7a1a1a">微生物 ✗</text>
            </g>
            <!-- 消毒 -->
            <g transform="translate(300,60)">
              <rect x="0" y="0" width="115" height="170" fill="#fff" stroke="#8a4a1a" stroke-width="2" rx="8"/>
              <text x="57" y="22" font-size="12" font-weight="bold" text-anchor="middle" fill="#8a4a1a">③ 消毒</text>
              <!-- 알코올 병 -->
              <g transform="translate(35,40)">
                <rect x="6" y="20" width="34" height="60" fill="#a8d4e8" stroke="#1a4a7a" stroke-width="1.5" rx="3"/>
                <rect x="12" y="14" width="22" height="10" fill="#5a8a9a" stroke="#1a4a7a" stroke-width="1.5"/>
                <rect x="18" y="6" width="10" height="10" fill="#5a8a9a" stroke="#1a4a7a" stroke-width="1.5"/>
                <text x="23" y="55" font-size="9" font-weight="bold" text-anchor="middle" fill="#1a3a5a">アル</text>
                <text x="23" y="68" font-size="9" font-weight="bold" text-anchor="middle" fill="#1a3a5a">コール</text>
              </g>
              <!-- 미생물 X -->
              <text x="57" y="145" font-size="14" font-weight="bold" text-anchor="middle" fill="#7a1a1a">微生物 ✗</text>
              <text x="57" y="162" font-size="9" text-anchor="middle" fill="#5a3a1a">アルコール·薬品</text>
            </g>
            <text x="225" y="258" font-size="11" font-weight="bold" text-anchor="middle" fill="#8a4a1a">清潔が 命を 守る — パスツールの 教え</text>
          </svg>
        `,
      },
    ],

    formulas: [
      {
        name: '自然発生説の 否定',
        formula: '腐敗 = 外から 入った 微生物 (≠ 自然に 発生)',
        formulaSimple: '腐敗 = 外来 微生物',
        explanation: '生命·腐敗は 物質から 勝手に 生まれません。 必ず 既存の 生命 (微生物) から 由来。 白鳥の 首 フラスコ が これを 証明。',
        note: '「生命は 生命から (生物発生説)」 — パスツール が 自然発生説 を 覆した。',
      },
      {
        name: 'ワクチン の 原理',
        formula: '弱い 病原菌 → 免疫 獲得 → 本物 撃退',
        formulaSimple: '弱毒 → 免疫 → 防御',
        explanation: '弱めた 病原菌を 先に 入れて 体が 抗体を 作るように する。 本物の 病原菌が 来ても 免疫が 撃退。',
        note: 'ジェンナー の 種痘法を パスツール が 狂犬病·炭疽病で 拡張·理論化。',
      },
    ],

    unitsTable: {
      title: '微生物 キーワード まとめ',
      rows: [
        ['用語',                    '意味',                                       '例·備考'],
        ['微生物 (びせいぶつ)',      '目に 見えない 小さな 生き物',                 '細菌·ウイルス·カビ'],
        ['細菌 (さいきん)',          '単細胞 微生物 (バクテリア)',                 '乳酸菌·大腸菌·結核菌'],
        ['病原菌 (びょうげんきん)',  '病気を 引き起こす 微生物',                   '結核菌·コレラ菌'],
        ['自然発生説',              '生命が 物質から 勝手に 生まれる という 旧説', 'パスツール が 否定'],
        ['殺菌·消毒',                '微生物を 殺す·減らす こと',                   '加熱·アルコール·煮沸'],
        ['ワクチン',                '弱い 病原菌で 免疫を 作る 薬',                '狂犬病·天然痘 ワクチン'],
      ],
    },

    flashcards: [
      { front: '微生物 (びせいぶつ)',           back: '目に 見えない 小さな 生き物。 細菌·ウイルス·カビ など。 腐敗·発酵·病気の 原因。' },
      { front: '細菌 (さいきん)',               back: '単細胞 微生物 (バクテリア)。 棒型·球型 など。 有益な もの (乳酸菌) も 多い。' },
      { front: '自然発生説',                   back: '生命·腐敗が 物質から 勝手に 生まれる という 旧説。 パスツール が 白鳥の 首 フラスコ で 否定。' },
      { front: '白鳥の 首 フラスコ',            back: 'パスツール の 実験装置。 空気は 通すが 微生物は 曲がった 首に 閉じ込められ スープが 腐らない。' },
      { front: 'ワクチン',                     back: '弱めた 病原菌で 免疫を 作る 薬。 パスツール が 狂犬病·炭疽病 ワクチンを 開発。' },
      { front: '低温殺菌 (ていおんさっきん)',    back: 'パスツール が 開発。 牛乳 などを 適温で 温めて 有害菌だけ 殺す。 「パスチャライゼーション」。' },
      { front: '病原菌 (びょうげんきん)',       back: '病気を 引き起こす 微生物。 結核菌·コレラ菌 など。 衛生·消毒で 遮断。' },
      { front: '殺菌·消毒',                    back: '微生物を 殺す·減らす こと。 加熱·煮沸·アルコール など。' },
      { front: '免疫 (めんえき)',               back: '体が 病原菌と 戦う 防御 システム。 ワクチンで 事前に 訓練 可能。' },
      { front: 'ルイ·パスツール',               back: 'フランスの 化学者·微生物学者 (1822-1895)。 自然発生説 否定·低温殺菌·ワクチン 開発。' },
    ],

    exercises: [
      {
        q: '事件 5 で スープA だけ 腐った 理由は?',
        options: ['スープが 古かったから', '空気中の 微生物が 入って 繁殖したから', 'フラスコの ガラスが 違ったから', '温度が 高かったから'],
        correct: 1,
        explanation: '事件 5 の 核心。 空気中の 微生物が スープに 入って 繁殖 → 腐敗。 曲がった 首の フラスコは 微生物を 遮断。',
      },
      {
        q: '白鳥の 首 フラスコ 実験が 否定した 旧説は?',
        options: ['進化論', '自然発生説', '相対性理論', '万有引力'],
        correct: 1,
        explanation: '自然発生説 (生命が 物質から 勝手に 生まれる という 説) を パスツール が 否定。',
      },
      {
        q: '微生物 に 当たらない のは?',
        options: ['細菌', 'ウイルス', 'カビ', '岩石'],
        correct: 3,
        explanation: '岩石は 生物 ではない。 細菌·ウイルス·カビは 全て 微生物。',
      },
      {
        q: 'ワクチン の 原理は?',
        options: ['強い 病原菌を 注射', '弱めた 病原菌で 免疫を 作る', '抗生物質を 事前に 飲む', '微生物を 全て 殺す'],
        correct: 1,
        explanation: '弱毒化した 病原菌で 体が 抗体 (免疫) を 作るように する。 本物の 病原菌が 来ても 撃退。',
      },
      {
        q: '白鳥の 首 フラスコ で 空気は?',
        options: ['両方 通る', '曲がった 方だけ 塞がれる', '真っ直ぐな 方だけ 塞がれる', '両方 塞がれる'],
        correct: 0,
        explanation: '空気は 両方 通る。 違いは 微生物 — 曲がった 首が 微生物だけ 捕まえる。',
      },
      {
        q: 'パスツール が 開発した 牛乳 殺菌法は?',
        options: ['冷凍法', '低温殺菌 (パスチャライゼーション)', '乾燥法', '塩漬け'],
        correct: 1,
        explanation: '低温殺菌。 適温で 温めて 有害菌だけ 殺し 味は 保つ。 彼の 名前から 由来。',
      },
      {
        q: '次の うち 微生物の 有益な 作用は?',
        options: ['発酵 (ヨーグルト·パン)', '食中毒', '虫歯', '伝染病'],
        correct: 0,
        explanation: '発酵 (ヨーグルト·パン·チーズ·味噌) は 微生物の 有益な 作用。 全ての 微生物が 害な わけ ではない。',
      },
      {
        q: '病原菌を 遮断する 衛生 習慣 ではない のは?',
        options: ['手洗い', '加熱·殺菌', '消毒', '部屋を 暗くする'],
        correct: 3,
        explanation: '部屋を 暗くする ことは 衛生と 無関係。 手洗い·加熱·消毒が 微生物 遮断の 核心。',
      },
      {
        q: 'パスツール が ワクチンを 開発した 病気は?',
        options: ['風邪', '狂犬病·炭疽病', '骨折', '近視'],
        correct: 1,
        explanation: '狂犬病·炭疽病 ワクチン 開発。 ジェンナー の 種痘法を 理論的に 拡張。',
      },
      {
        q: '「生命は 生命から」 という 原理を 何と いう?',
        options: ['自然発生説', '生物発生説', '進化論', '細胞説'],
        correct: 1,
        explanation: '生物発生説。 生命は 既存の 生命からのみ 生まれる。 パスツール が 自然発生説を 覆して 確立。',
      },
    ],

    tips: [
      { title: '①  腐敗 = 外来 微生物',            body: 'スープが 腐るのは 勝手 ではなく 空気中の 微生物が 入って 繁殖する から。 「自然発生説」 は 間違い。' },
      { title: '②  白鳥の 首 フラスコ',            body: '空気は 通すが 微生物は 曲がった 首に 閉じ込められる。 「空気 自体 ではなく 微生物が 原因」 を 証明した 名実験。' },
      { title: '③  微生物 = 細菌·ウイルス·カビ',   body: '目に 見えない 小さな 生き物たち。 大部分は 無害·有益 (発酵)、 一部だけが 病原菌。' },
      { title: '④  発酵 — 微生物の 贈り物',        body: 'ヨーグルト·パン·チーズ·味噌·酒 全て 微生物の 発酵。 微生物 = 「敵」 だけ ではない。' },
      { title: '⑤  ワクチン = 弱い 敵で 練習',     body: '弱毒化した 病原菌で 免疫を 事前に 作る。 本物が 来ても 撃退。 パスツール が 理論化。' },
      { title: '⑥  低温殺菌 = パスツール の 発明', body: '牛乳 などを 適度に 温めて 有害菌だけ 殺す。 英語で pasteurization — 彼の 名前。' },
      { title: '⑦  清潔が 命を 守る',              body: '手洗い·消毒·加熱で 病原菌を 遮断。 微生物の 発見が 医学を 変えた。' },
      { title: '⑧  「見えない = 無い」 ではない',  body: '目に 見えなくても 存在する。 観察 (顕微鏡) と 実験で 証明 する のが 科学の 態度。' },
    ],
  },
  scientists_case06: {
    title: '遺伝の 法則',
    subtitle: '事件 6 で 学んだ こと',
    examScope: '中学 生物 + 比喩 中心 (정성적 이해)',

    concept: {
      title: '遺伝の 法則',
      paragraphs: [
        '事件 6 の 消えた 白い 花 — その 正体は、 親から 子へ 受け継がれる 「遺伝子 (いでんし)」 の 組み合わせ でした。 メンデル は 8年間、 修道院の 庭で 何万 株もの エンドウ豆を 育てて 数え、 1865年に 「遺伝の 法則」 を 発表 しました。',
        '生物の 形質 (花の 色など) を 決める 因子 (遺伝子) は、 ふつう 2個 ずつ ペアで あります。 親から 1個 ずつ 受け継ぎます。 2個の 因子が 違う とき、 強く 現れる 方を 「優性 (顕性)」、 隠れる 方を 「劣性 (潜性)」 と 言います。',
        '紫×白 の 子が 全部 紫に なったのは、 紫が 優性 だから。 でも 白の 因子は 消えず、 子の 中に 隠れて います。 孫の 代で 白同士が 出会うと、 また 白い 花が 咲きます。 因子が ペアから 1個 ずつ 分かれて 伝わる — これが 「分離の 法則」 です。',
        'その 結果、 孫世代は 紫:白 = 約 3:1 に なります。 これは 偶然 ではなく、 因子の 組み合わせ (紫紫·紫白·白紫·白白 の 4通り) から 計算で 出る 数 なのです。 メンデル の 発見は、 後に 「遺伝子」 「DNA」 の 研究へと つながりました。',
      ],
      highlight: '形質は 2個 ペアの 遺伝子で 決まる。 優性が 劣性を 隠すが、 劣性も 消えず 伝わる → 孫で 約 3:1。',
    },

    diagrams: [
      {
        title: '①  3世代の 流れ — 親 → 子 → 孫',
        svg: `
          <svg viewBox="0 0 500 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#f4e8f4;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#5a2a7a">親 → 子 → 孫 の 3世代</text>
            <!-- 親 -->
            <text x="40" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#5a2a7a">親</text>
            <g transform="translate(15,60)">
              <circle cx="25" cy="20" r="14" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2"/>
              <text x="25" y="25" font-size="11" font-weight="bold" text-anchor="middle" fill="#fff">BB</text>
              <text x="25" y="55" font-size="10" text-anchor="middle" fill="#3a0a5a">純紫</text>
            </g>
            <text x="65" y="80" font-size="14" font-weight="bold" fill="#3a3a3a">×</text>
            <g transform="translate(75,60)">
              <circle cx="25" cy="20" r="14" fill="#fff" stroke="#3a3a3a" stroke-width="2"/>
              <text x="25" y="25" font-size="11" font-weight="bold" text-anchor="middle" fill="#3a3a3a">bb</text>
              <text x="25" y="55" font-size="10" text-anchor="middle" fill="#3a3a3a">純白</text>
            </g>
            <!-- 矢印 親→子 -->
            <line x1="135" y1="80" x2="175" y2="80" stroke="#5a2a7a" stroke-width="2" marker-end="url(#ah_g1)"/>
            <!-- 子 (全部 紫, Bb) -->
            <text x="225" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#5a2a7a">子 (F1)</text>
            <g transform="translate(190,60)">
              <circle cx="20" cy="20" r="13" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2"/>
              <text x="20" y="25" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">Bb</text>
            </g>
            <g transform="translate(225,60)">
              <circle cx="20" cy="20" r="13" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2"/>
              <text x="20" y="25" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">Bb</text>
            </g>
            <g transform="translate(260,60)">
              <circle cx="20" cy="20" r="13" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2"/>
              <text x="20" y="25" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">Bb</text>
            </g>
            <text x="225" y="105" font-size="10" font-weight="bold" text-anchor="middle" fill="#5a2a7a">全部 紫</text>
            <text x="225" y="120" font-size="9" text-anchor="middle" fill="#3a3a3a">(白が 隠れている)</text>
            <!-- 矢印 子→孫 -->
            <line x1="320" y1="80" x2="360" y2="80" stroke="#5a2a7a" stroke-width="2" marker-end="url(#ah_g2)"/>
            <!-- 孫 -->
            <text x="425" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#5a2a7a">孫 (F2)</text>
            <g transform="translate(370,60)">
              <circle cx="18" cy="20" r="12" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="1.5"/>
              <text x="18" y="24" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">BB</text>
            </g>
            <g transform="translate(400,60)">
              <circle cx="18" cy="20" r="12" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="1.5"/>
              <text x="18" y="24" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">Bb</text>
            </g>
            <g transform="translate(430,60)">
              <circle cx="18" cy="20" r="12" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="1.5"/>
              <text x="18" y="24" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">Bb</text>
            </g>
            <g transform="translate(460,60)">
              <circle cx="18" cy="20" r="12" fill="#fff" stroke="#3a3a3a" stroke-width="1.5"/>
              <text x="18" y="24" font-size="9" font-weight="bold" text-anchor="middle" fill="#3a3a3a">bb</text>
            </g>
            <text x="425" y="110" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a1a1a">紫 : 白 = 3 : 1</text>
            <text x="425" y="125" font-size="9" text-anchor="middle" fill="#3a3a3a">白い 花が 復活!</text>
            <defs>
              <marker id="ah_g1" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#5a2a7a"/></marker>
              <marker id="ah_g2" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#5a2a7a"/></marker>
            </defs>
            <!-- 설명 박스 -->
            <rect x="40" y="170" width="420" height="130" fill="#fff" stroke="#5a2a7a" stroke-width="1.5" rx="8"/>
            <text x="250" y="195" font-size="11" font-weight="bold" text-anchor="middle" fill="#5a2a7a">なぜ 白い 花が 戻ってくるのか?</text>
            <text x="60" y="220" font-size="10" fill="#1a1a1a">• 子 (Bb) は 見た目 紫 でも 白の 因子 b を 隠して 持つ</text>
            <text x="60" y="240" font-size="10" fill="#1a1a1a">• Bb × Bb の 交配 → 孫は BB·Bb·bB·bb の 4通り</text>
            <text x="60" y="260" font-size="10" fill="#1a1a1a">• 紫(BB·Bb·bB) 3 個 : 白(bb) 1 個 = 3:1</text>
            <text x="250" y="288" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a1a1a">白は 消えて いない — 隠れて 待って いた のじゃ</text>
          </svg>
        `,
      },
      {
        title: '②  パネット 方格 — 因子の 組み合わせ',
        svg: `
          <svg viewBox="0 0 450 350" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:430px;height:auto;background:#eef4fa;border-radius:12px;">
            <text x="225" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a4a7a">子 (Bb) × 子 (Bb) → 孫の 4通り</text>
            <!-- 좌측 부모 (위쪽 라벨) -->
            <text x="150" y="65" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a4a7a">子 (父)</text>
            <text x="110" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#5a2a7a">B</text>
            <text x="190" y="100" font-size="14" font-weight="bold" text-anchor="middle" fill="#3a3a3a">b</text>
            <!-- 우측 부모 (좌측 라벨) -->
            <text x="50" y="165" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a4a7a" transform="rotate(-90 50 165)">子 (母)</text>
            <text x="80" y="145" font-size="14" font-weight="bold" text-anchor="middle" fill="#5a2a7a">B</text>
            <text x="80" y="225" font-size="14" font-weight="bold" text-anchor="middle" fill="#3a3a3a">b</text>
            <!-- 2×2 격자 -->
            <rect x="95" y="115" width="80" height="65" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2"/>
            <rect x="175" y="115" width="80" height="65" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2"/>
            <rect x="95" y="180" width="80" height="65" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2"/>
            <rect x="175" y="180" width="80" height="65" fill="#fff" stroke="#3a3a3a" stroke-width="2"/>
            <!-- 라벨 -->
            <text x="135" y="145" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">BB</text>
            <text x="135" y="165" font-size="10" text-anchor="middle" fill="#fff">純紫</text>
            <text x="215" y="145" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">Bb</text>
            <text x="215" y="165" font-size="10" text-anchor="middle" fill="#fff">紫 (b 隠す)</text>
            <text x="135" y="210" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">bB</text>
            <text x="135" y="230" font-size="10" text-anchor="middle" fill="#fff">紫 (b 隠す)</text>
            <text x="215" y="210" font-size="14" font-weight="bold" text-anchor="middle" fill="#3a3a3a">bb</text>
            <text x="215" y="230" font-size="10" text-anchor="middle" fill="#3a3a3a">白</text>
            <!-- 결과 박스 -->
            <rect x="280" y="115" width="150" height="130" fill="#fff" stroke="#1a4a7a" stroke-width="2" rx="6"/>
            <text x="355" y="140" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a4a7a">結果</text>
            <rect x="295" y="155" width="20" height="20" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="1.5"/>
            <text x="325" y="170" font-size="11" fill="#1a1a1a">紫 × 3</text>
            <rect x="295" y="185" width="20" height="20" fill="#fff" stroke="#3a3a3a" stroke-width="1.5"/>
            <text x="325" y="200" font-size="11" fill="#1a1a1a">白 × 1</text>
            <text x="355" y="230" font-size="13" font-weight="bold" text-anchor="middle" fill="#7a1a1a">紫 : 白 = 3 : 1</text>
            <text x="225" y="280" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a4a7a">4 通りの 組み合わせ → 紫 3 : 白 1</text>
            <text x="225" y="305" font-size="10" text-anchor="middle" fill="#5a4a2a">「3:1」は 偶然 では なく、 計算で 出る 結果</text>
            <text x="225" y="328" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a6a2a">これが 「分離の 法則」 (メンデル 第1法則)</text>
          </svg>
        `,
      },
      {
        title: '③  優性·劣性 — 強い 方が 見える、 弱い 方は 隠れる',
        svg: `
          <svg viewBox="0 0 500 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#fff5e8;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#7a3a1a">優性 と 劣性 (強い 方が 見える)</text>
            <!-- 子 (Bb) 큰 원 -->
            <g transform="translate(220,55)">
              <circle cx="30" cy="40" r="34" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2.5"/>
              <text x="30" y="46" font-size="18" font-weight="bold" text-anchor="middle" fill="#fff">Bb</text>
              <text x="30" y="100" font-size="11" font-weight="bold" text-anchor="middle" fill="#5a2a7a">見た目: 紫</text>
            </g>
            <!-- 좌측: B 강함 -->
            <g transform="translate(80,80)">
              <circle cx="25" cy="20" r="22" fill="#7a3aa0" stroke="#3a0a5a" stroke-width="2"/>
              <text x="25" y="26" font-size="14" font-weight="bold" text-anchor="middle" fill="#fff">B</text>
              <text x="25" y="60" font-size="11" font-weight="bold" text-anchor="middle" fill="#5a2a7a">優性</text>
              <text x="25" y="75" font-size="9" text-anchor="middle" fill="#3a0a5a">(強い)</text>
              <text x="25" y="93" font-size="9" text-anchor="middle" fill="#3a0a5a">見える</text>
            </g>
            <line x1="125" y1="100" x2="195" y2="100" stroke="#5a2a7a" stroke-width="2" marker-end="url(#ah_dom)"/>
            <!-- 우측: b 약함 -->
            <g transform="translate(360,80)">
              <circle cx="25" cy="20" r="22" fill="#e8d8e8" stroke="#7a3a1a" stroke-width="2" stroke-dasharray="3 2"/>
              <text x="25" y="26" font-size="14" font-weight="bold" text-anchor="middle" fill="#3a3a3a">b</text>
              <text x="25" y="60" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a3a1a">劣性</text>
              <text x="25" y="75" font-size="9" text-anchor="middle" fill="#5a3a1a">(弱い)</text>
              <text x="25" y="93" font-size="9" text-anchor="middle" fill="#5a3a1a">隠れる</text>
            </g>
            <line x1="310" y1="100" x2="375" y2="100" stroke="#7a3a1a" stroke-width="2" stroke-dasharray="3 2" marker-end="url(#ah_rec)"/>
            <text x="345" y="92" font-size="9" font-style="italic" text-anchor="middle" fill="#5a3a1a">(隠れる)</text>
            <defs>
              <marker id="ah_dom" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#5a2a7a"/></marker>
              <marker id="ah_rec" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#7a3a1a"/></marker>
            </defs>
            <!-- 注意 박스 -->
            <rect x="40" y="190" width="420" height="55" fill="#fff" stroke="#7a3a1a" stroke-width="1.5" rx="6"/>
            <text x="250" y="212" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a3a1a">⚠ 注意!</text>
            <text x="250" y="230" font-size="10" text-anchor="middle" fill="#1a1a1a">「優性」= 強くて 先に 見える という 意味。</text>
            <text x="250" y="244" font-size="10" text-anchor="middle" fill="#7a1a1a">「数が 多い」「良い 形質」 という 意味では ない!</text>
          </svg>
        `,
      },
      {
        title: '④  メモリ — 私たちの 体にも 遺伝',
        svg: `
          <svg viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:430px;height:auto;background:#eef8ee;border-radius:12px;">
            <text x="225" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a6a2a">遺伝の 法則は、 私たちの 体にも</text>
            <!-- 부모 -->
            <text x="225" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a6a2a">親</text>
            <g transform="translate(120,60)">
              <ellipse cx="25" cy="25" rx="20" ry="22" fill="#fdd5b3" stroke="#5a3a18" stroke-width="2"/>
              <ellipse cx="20" cy="22" rx="2.5" ry="3" fill="#3a2a18"/>
              <ellipse cx="30" cy="22" rx="2.5" ry="3" fill="#3a2a18"/>
              <path d="M 20 32 Q 25 35 30 32" fill="none" stroke="#5a3a18" stroke-width="1.5"/>
              <text x="25" y="68" font-size="10" text-anchor="middle" fill="#3a3a3a">父</text>
            </g>
            <g transform="translate(285,60)">
              <ellipse cx="25" cy="25" rx="20" ry="22" fill="#fdd5b3" stroke="#5a3a18" stroke-width="2"/>
              <ellipse cx="20" cy="22" rx="2.5" ry="3" fill="#1a4a7a"/>
              <ellipse cx="30" cy="22" rx="2.5" ry="3" fill="#1a4a7a"/>
              <path d="M 20 32 Q 25 35 30 32" fill="none" stroke="#5a3a18" stroke-width="1.5"/>
              <text x="25" y="68" font-size="10" text-anchor="middle" fill="#3a3a3a">母</text>
            </g>
            <!-- 因子 1개씩 -->
            <text x="145" y="145" font-size="14" font-weight="bold" text-anchor="middle" fill="#3a2a18">因子 1個</text>
            <line x1="145" y1="125" x2="200" y2="180" stroke="#5a3a18" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#ah_h1)"/>
            <text x="310" y="145" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a4a7a">因子 1個</text>
            <line x1="310" y1="125" x2="250" y2="180" stroke="#1a4a7a" stroke-width="1.5" stroke-dasharray="3 2" marker-end="url(#ah_h2)"/>
            <!-- 자녀 -->
            <text x="225" y="170" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a6a2a">子 (君·私)</text>
            <g transform="translate(200,185)">
              <ellipse cx="25" cy="25" rx="22" ry="25" fill="#fdd5b3" stroke="#5a3a18" stroke-width="2"/>
              <ellipse cx="19" cy="22" rx="3" ry="3.5" fill="#3a2a18"/>
              <ellipse cx="31" cy="22" rx="3" ry="3.5" fill="#1a4a7a"/>
              <path d="M 19 34 Q 25 38 31 34" fill="none" stroke="#5a3a18" stroke-width="1.5"/>
            </g>
            <defs>
              <marker id="ah_h1" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#5a3a18"/></marker>
              <marker id="ah_h2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a4a7a"/></marker>
            </defs>
            <text x="225" y="248" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a6a2a">目の 色·髪の 色·耳の 形 など も、</text>
            <text x="225" y="265" font-size="10" font-weight="bold" text-anchor="middle" fill="#5a2a7a">親から 1個 ずつ 受け継いだ 「因子」 の 組み合わせ</text>
          </svg>
        `,
      },
    ],

    formulas: [
      {
        name: '分離の 法則 (メンデル 第1法則)',
        formula: 'ペアの 因子 → 子に 1個 ずつ 分かれて 伝わる',
        formulaSimple: '2個 → 1個 ずつ 分離',
        explanation: '一つの 個体が 持つ 2個の 因子 (遺伝子) が、 子孫に 1個 ずつ 分かれて 伝わる。 だから 隠れて いた 劣性も 再び 現れる ことが ある。',
        note: 'メンデル 第1法則。 分離の 法則。 全ての 遺伝の 基本。',
      },
      {
        name: '優性·劣性 + 3:1',
        formula: '優性(紫) 3 : 劣性(白) 1',
        formulaSimple: '顕性 3 : 潜性 1',
        explanation: '子 (Bb) 同士の 交配 → 孫は BB·Bb·bB·bb = 1:1:1:1。 見た目は 紫 (BB·Bb·bB) 3 : 白 (bb) 1。',
        note: '「優性 = 多い」 では なく 「優性 = 強くて 先に 現れる」。 3:1 は 組み合わせ 計算の 結果。',
      },
    ],

    unitsTable: {
      title: '遺伝 キーワード まとめ',
      rows: [
        ['用語',                    '意味',                                          '例·備考'],
        ['遺伝子 (いでんし)',        '形質を 決める 因子',                            '花の 色·目の 色を 決める'],
        ['優性 (顕性)',             'ペアで 強く 現れる 形質',                        '紫の 花'],
        ['劣性 (潜性)',             'ペアで 隠れる 形質 (消えない)',                  '白い 花'],
        ['分離の 法則',             '因子 ペアが 子に 1個 ずつ 分かれて 伝わる',      'メンデル 第1法則'],
        ['3:1',                    '孫世代 優性:劣性 の 比率',                       '紫 3 : 白 1'],
        ['純系 (じゅんけい)',        '同じ 形質が 続けて 出る 純粋種',                  '純白·純紫の 親'],
      ],
    },

    flashcards: [
      { front: '遺伝 (いでん)',         back: '親の 形質が 子に 伝わる こと。 メンデル が エンドウ豆で 法則 発見。' },
      { front: '遺伝子 (いでんし)',     back: '形質を 決める 因子。 普通 2個 ずつ ペア。 親から 1個 ずつ 受け継ぐ。' },
      { front: '優性 (顕性, ゆうせい)', back: 'ペアで 強く 現れる 形質。 紫の 花 のように 見た目に 現れる。' },
      { front: '劣性 (潜性, れっせい)', back: 'ペアで 隠れる 形質。 白い 花 のように 見えなくても 消えずに 伝わる。' },
      { front: '分離の 法則',           back: '因子 ペアが 子孫に 1個 ずつ 分かれて 伝わる 法則。 メンデル 第1法則。' },
      { front: '3:1 の 比',            back: '子 (雑種) 同士の 交配 → 孫世代の 優性:劣性 比率。 組み合わせ 計算の 結果。' },
      { front: '純系 (じゅんけい)',     back: '同じ 形質だけが 続けて 出る 純粋種。 メンデル 実験の 出発点 (純白·純紫)。' },
      { front: 'エンドウ豆',           back: 'メンデルが 実験に 使った 豆。 形質が 明瞭で 栽培·交配が 簡単で 適合。' },
      { front: 'メンデル',             back: 'オーストリア の 修道士 (1822-1884)。 8年間 エンドウ豆 交配で 遺伝法則 発見 (1865)。' },
      { front: 'DNA·染色体',          back: '後に 明らかに なった 遺伝子の 実体。 メンデル の 「因子」 が DNA に つながる。' },
    ],

    exercises: [
      {
        q: '事件 6 で 白い 花が 子世代では 見えず 孫世代で 再び 現れた 理由は?',
        options: ['魔法で 戻った', '白の 因子が 子に 隠れて 伝わり 孫で 発現', '新しく 生まれた', '紫が 白に 変わった'],
        correct: 1,
        explanation: '事件 6 の 核心。 白 (劣性) の 因子は 消えず 子に 隠れていて、 孫で 白同士が 出会うと 発現。',
      },
      {
        q: '孫世代 紫:白 の 比率は?',
        options: ['1:1', '2:1', '3:1', '4:1'],
        correct: 2,
        explanation: '約 3:1。 因子 組み合わせ (BB·Bb·bB·bb) で 紫 3 : 白 1。',
      },
      {
        q: 'ペアで 強く 現れる 形質を 何という?',
        options: ['劣性 (潜性)', '優性 (顕性)', '純系', '分離'],
        correct: 1,
        explanation: '優性 (顕性)。 紫の 花 のように 見た目に 現れる 形質。',
      },
      {
        q: '遺伝法則を 発見した 人は?',
        options: ['ダーウィン', 'メンデル', 'パスツール', 'ニュートン'],
        correct: 1,
        explanation: 'グレゴール·メンデル。 修道院で 8年間 エンドウ豆 交配 実験。',
      },
      {
        q: '因子 ペアが 子孫に 1個 ずつ 分かれて 伝わる 法則は?',
        options: ['優性の 法則', '分離の 法則', '進化の 法則', '自然選択'],
        correct: 1,
        explanation: '分離の 法則 (メンデル 第1法則)。 だから 隠れた 劣性も 再び 現れる ことが ある。',
      },
      {
        q: 'メンデルが 実験に エンドウ豆を 使った 理由として 適切なのは?',
        options: ['美味しいから', '形質が 明瞭で 交配が 簡単だから', '高価だから', '花が きれい だから'],
        correct: 1,
        explanation: 'エンドウ豆は 形質 区分が 明確 (紫/白·丸/しわ) で 栽培·交配が 簡単。 実験に 理想的。',
      },
      {
        q: '紫の 花の 子 (Bb) が 白の 因子を 持って いるのに 紫色 なのは?',
        options: ['白の 因子が ないから', '紫が 優性で 先に 現れるから', '白が 弱くて 消えたから', '日光の せい'],
        correct: 1,
        explanation: '紫が 優性。 紫+白 因子を 持って いても 強い 紫が 見た目に 現れる。 白は 隠れる。',
      },
      {
        q: 'メンデル が 「因子」 と 呼んだ ものの 現代の 名前は?',
        options: ['細胞', '遺伝子 (DNA)', 'タンパク質', 'ウイルス'],
        correct: 1,
        explanation: 'メンデル の 「因子」 = 今日の 遺伝子 (DNA)。 メンデル 死後に その 実体が 明らかに。',
      },
      {
        q: '「優性」 を 正しく 理解した のは?',
        options: ['数が 多い', '強くて 先に 現れる', '常に 良い 形質', 'より 早く 育つ'],
        correct: 1,
        explanation: '優性 = 「強くて 先に 現れる」。 「多い」 や 「良い」 は 誤解。 劣性も 同じく 伝わる。',
      },
      {
        q: '純白の エンドウ豆 同士を 交配 し続けると 子孫は?',
        options: ['全部 白', '全部 紫', '3:1', '半分 ずつ'],
        correct: 0,
        explanation: '純系 (純粋種) は 同じ 形質だけが 続けて 出る。 白の 因子 (bb) だけ なら 子孫も 全部 白。',
      },
    ],

    tips: [
      { title: '①  消えた 形質は 「隠れた もの」',     body: '白い 花は 消えたのでは なく 子に 隠れて 伝わり 孫で 再発現。 劣性は 消滅 しない。' },
      { title: '②  遺伝子は 2個 ペア',                body: '形質を 決める 因子は 普通 ペア。 親から 1個 ずつ 受け取って 子は 2個 持つ。' },
      { title: '③  優性 = 「強さ」、 「多さ」 ではない', body: '優性は 強くて 先に 現れる こと。 数が 多い·より 良い という 意味では ない。' },
      { title: '④  分離の 法則',                     body: 'ペアが 子孫に 1個 ずつ 分かれて 伝わる。 だから 孫で 劣性が 再び 現れる ことが ある。' },
      { title: '⑤  3:1 は 計算の 結果',              body: 'Bb × Bb → BB·Bb·bB·bb。 紫 3 : 白 1。 偶然 では なく 組み合わせ 確率。' },
      { title: '⑥  数える ことの 力',                body: 'メンデル は 何万 株を 8年 間 数えた。 大量を 数えてこそ 3:1 のような 法則が 見える。' },
      { title: '⑦  エンドウ豆 = 良い 実験材料',       body: '形質が 明瞭で 交配が 簡単。 良い 実験は 良い 材料 選びから 始まる。' },
      { title: '⑧  メモリ — 君の 形質も 遺伝',        body: '目の 色·耳の 形 なども 親から 1個 ずつ 受けた 因子の 組み合わせ。 メンデル 法則は 私たちの 体にも。' },
    ],
  },
  scientists_case07: {
    title: '天体観測と 地動説',
    subtitle: '事件 7 で 学んだ こと',
    examScope: '中学 理科 (地学) + 比喩 中心',

    concept: {
      title: '天体観測と 地動説',
      paragraphs: [
        '事件 7 で 木星の そばに 見えた 4つの 点 — それは 木星を まわる 「衛星 (えいせい)」 でした。 ガリレオ は 1610年、 自作の 望遠鏡で これを 発見 しました。 木星の 4大 衛星は 今も 「ガリレオ 衛星」 と 呼ばれて います。',
        'それまで 多くの 人は 「地球が 宇宙の 中心で、 すべての 天体が 地球を まわる」 という 「天動説 (てんどうせつ)」 を 信じて いました。 ですが、 木星を まわる 衛星が ある なら、 「すべてが 地球を まわる」 とは 言えません。',
        'これは 「地球も 太陽の まわりを まわる 惑星の 一つだ」 という 「地動説 (ちどうせつ)」 を 支える 観測でした。 地動説は コペルニクス が 唱え、 ガリレオ の 観測が 力強い 証拠を 与えたのです。',
        'ガリレオ の 発見が 大切なのは、 「権威や 常識」 ではなく 「自分の 目で 見た 観測」 を 根拠に した ことです。 望遠鏡という 新しい 道具が、 人類の 宇宙観を 大きく 変えました。 観測と 証拠を 重んじる — これは 今の 科学の 土台です。',
      ],
      highlight: '木星の 衛星 = 「すべてが 地球を まわる」 の 反証。 観測と 証拠が、 古い 常識を 更新する。',
    },

    diagrams: [
      {
        title: '①  天動説 vs 地動説 — 中心は どっち?',
        svg: `
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#1a1a3a;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#fdd58e">中心は 地球か、 太陽か</text>
            <!-- 좌측: 天動説 -->
            <text x="125" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#e74c3c">天動説 (地球 中心)</text>
            <g transform="translate(125,160)">
              <!-- 지구 (중심) -->
              <circle cx="0" cy="0" r="14" fill="#6ba8c4" stroke="#fff" stroke-width="1.5"/>
              <text x="0" y="35" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">地球</text>
              <!-- 궤도 -->
              <circle cx="0" cy="0" r="40" fill="none" stroke="#fdd58e" stroke-width="1" stroke-dasharray="3 2" opacity="0.7"/>
              <circle cx="0" cy="0" r="60" fill="none" stroke="#fdd58e" stroke-width="1" stroke-dasharray="3 2" opacity="0.7"/>
              <circle cx="0" cy="0" r="80" fill="none" stroke="#fdd58e" stroke-width="1" stroke-dasharray="3 2" opacity="0.7"/>
              <!-- 태양 (외곽 궤도) -->
              <circle cx="0" cy="-80" r="10" fill="#ffd700" stroke="#fdd58e" stroke-width="1"/>
              <text x="0" y="-92" font-size="9" font-weight="bold" text-anchor="middle" fill="#fdd58e">太陽</text>
              <!-- 다른 행성 -->
              <circle cx="40" cy="0" r="5" fill="#e74c3c"/>
              <circle cx="-60" cy="0" r="5" fill="#7a8a6a"/>
              <circle cx="0" cy="60" r="5" fill="#9b87bc"/>
            </g>
            <text x="125" y="280" font-size="10" font-weight="bold" text-anchor="middle" fill="#e74c3c">すべてが 地球を まわる</text>
            <!-- 분리선 -->
            <line x1="250" y1="55" x2="250" y2="270" stroke="#fdd58e" stroke-width="1" stroke-dasharray="4 3" opacity="0.5"/>
            <!-- 우측: 地動説 -->
            <text x="375" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#a8d4e8">地動説 (太陽 中心)</text>
            <g transform="translate(375,160)">
              <!-- 태양 (중심) -->
              <circle cx="0" cy="0" r="16" fill="#ffd700" stroke="#fff" stroke-width="1.5"/>
              <text x="0" y="35" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">太陽</text>
              <!-- 궤도 -->
              <circle cx="0" cy="0" r="40" fill="none" stroke="#a8d4e8" stroke-width="1" stroke-dasharray="3 2" opacity="0.7"/>
              <circle cx="0" cy="0" r="60" fill="none" stroke="#a8d4e8" stroke-width="1" stroke-dasharray="3 2" opacity="0.7"/>
              <circle cx="0" cy="0" r="80" fill="none" stroke="#a8d4e8" stroke-width="1" stroke-dasharray="3 2" opacity="0.7"/>
              <!-- 지구 (제3궤도) -->
              <circle cx="0" cy="-60" r="9" fill="#6ba8c4" stroke="#a8d4e8" stroke-width="1.5"/>
              <text x="0" y="-72" font-size="9" font-weight="bold" text-anchor="middle" fill="#a8d4e8">地球</text>
              <!-- 다른 행성 -->
              <circle cx="40" cy="0" r="4" fill="#e74c3c"/>
              <circle cx="-40" cy="0" r="4" fill="#7a8a6a"/>
              <circle cx="0" cy="80" r="6" fill="#9b87bc"/>
            </g>
            <text x="375" y="280" font-size="10" font-weight="bold" text-anchor="middle" fill="#a8d4e8">地球も 太陽を まわる 惑星</text>
          </svg>
        `,
      },
      {
        title: '②  木星と ガリレオ 衛星 — 4つの 月',
        svg: `
          <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#0a0a2a;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#fdd58e">木星を まわる 4つの 衛星 (ガリレオ衛星)</text>
            <!-- 별 -->
            <g fill="#fff" opacity="0.6">
              <circle cx="40" cy="60" r="1"/>
              <circle cx="80" cy="40" r="1"/>
              <circle cx="120" cy="70" r="1.2"/>
              <circle cx="380" cy="50" r="1"/>
              <circle cx="430" cy="80" r="1.2"/>
              <circle cx="60" cy="200" r="1"/>
              <circle cx="450" cy="220" r="1"/>
            </g>
            <!-- 목성 -->
            <g transform="translate(250,140)">
              <circle cx="0" cy="0" r="40" fill="#d4a070" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="0" cy="-10" rx="35" ry="4" fill="#a8754a" opacity="0.7"/>
              <ellipse cx="0" cy="5" rx="38" ry="4" fill="#8a5a2a" opacity="0.7"/>
              <ellipse cx="0" cy="18" rx="32" ry="3" fill="#a8754a" opacity="0.7"/>
              <text x="0" y="60" font-size="11" font-weight="bold" text-anchor="middle" fill="#fdd58e">木星</text>
            </g>
            <!-- 위성 궤도 -->
            <ellipse cx="250" cy="140" rx="60" ry="12" fill="none" stroke="#a8d4e8" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>
            <ellipse cx="250" cy="140" rx="80" ry="16" fill="none" stroke="#a8d4e8" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>
            <ellipse cx="250" cy="140" rx="105" ry="20" fill="none" stroke="#a8d4e8" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>
            <ellipse cx="250" cy="140" rx="130" ry="24" fill="none" stroke="#a8d4e8" stroke-width="1" stroke-dasharray="3 2" opacity="0.5"/>
            <!-- 4 위성 -->
            <circle cx="190" cy="140" r="4" fill="#fff"/>
            <text x="190" y="120" font-size="8" text-anchor="middle" fill="#a8d4e8">イオ</text>
            <circle cx="170" cy="140" r="4" fill="#a8d4e8"/>
            <text x="170" y="170" font-size="8" text-anchor="middle" fill="#a8d4e8">エウロパ</text>
            <circle cx="355" cy="140" r="5" fill="#c8c8a8"/>
            <text x="355" y="120" font-size="8" text-anchor="middle" fill="#a8d4e8">ガニメデ</text>
            <circle cx="380" cy="140" r="5" fill="#a8a8a8"/>
            <text x="380" y="170" font-size="8" text-anchor="middle" fill="#a8d4e8">カリスト</text>
            <!-- 횡단면 -->
            <text x="250" y="225" font-size="11" font-weight="bold" text-anchor="middle" fill="#fdd58e">横から 見ると、 円運動が 左右の 往復に 見える</text>
            <line x1="80" y1="245" x2="420" y2="245" stroke="#a8d4e8" stroke-width="1" stroke-dasharray="2 2"/>
            <circle cx="180" cy="245" r="3" fill="#fff"/>
            <circle cx="220" cy="245" r="3" fill="#a8d4e8"/>
            <rect x="245" y="241" width="10" height="8" fill="#d4a070"/>
            <circle cx="290" cy="245" r="3" fill="#c8c8a8"/>
            <circle cx="330" cy="245" r="3" fill="#a8a8a8"/>
            <text x="250" y="265" font-size="9" text-anchor="middle" fill="#a8d4e8">毎晩 位置が 変わる = 木星を まわる 証拠</text>
          </svg>
        `,
      },
      {
        title: '③  望遠鏡 — 人の 目を 宇宙へ 広げる',
        svg: `
          <svg viewBox="0 0 450 260" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:430px;height:auto;background:#fff5e8;border-radius:12px;">
            <text x="225" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#7a3a1a">望遠鏡 — 遠くを 大きく 見る</text>
            <!-- 望遠鏡 본체 -->
            <g transform="translate(80,90)">
              <rect x="0" y="20" width="180" height="30" fill="#5a3a1a" stroke="#2a1a08" stroke-width="2" rx="3"/>
              <!-- 대물 렌즈 -->
              <ellipse cx="180" cy="35" rx="6" ry="18" fill="#a8d4e8" stroke="#1a4a7a" stroke-width="1.5" opacity="0.7"/>
              <!-- 접안 렌즈 -->
              <ellipse cx="0" cy="35" rx="4" ry="10" fill="#a8d4e8" stroke="#1a4a7a" stroke-width="1.5" opacity="0.7"/>
              <!-- 받침대 -->
              <line x1="90" y1="50" x2="90" y2="100" stroke="#5a3a1a" stroke-width="3"/>
              <polygon points="60,100 120,100 100,120 80,120" fill="#5a3a1a"/>
            </g>
            <!-- 좌측: 맨눈 -->
            <text x="50" y="65" font-size="11" font-weight="bold" text-anchor="middle" fill="#5a3a1a">肉眼</text>
            <circle cx="50" cy="120" r="8" fill="#fff" stroke="#1a1a1a" stroke-width="1.5"/>
            <circle cx="50" cy="120" r="3" fill="#1a1a1a"/>
            <!-- 우측: 보이는 것 -->
            <text x="350" y="50" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a3a1a">望遠鏡で 見える</text>
            <!-- 맨눈 시야 (작은 점) -->
            <g transform="translate(290,80)">
              <text x="0" y="0" font-size="9" text-anchor="end" fill="#5a3a1a">肉眼:</text>
              <circle cx="20" cy="-3" r="3" fill="#d4a070"/>
              <text x="35" y="0" font-size="9" fill="#5a3a1a">木星 だけ</text>
            </g>
            <!-- 망원경 시야 (큰 + 4점) -->
            <g transform="translate(290,120)">
              <text x="0" y="0" font-size="9" text-anchor="end" fill="#7a3a1a">望遠鏡:</text>
              <circle cx="35" cy="-3" r="10" fill="#d4a070" stroke="#8a5a2a" stroke-width="1"/>
              <ellipse cx="35" cy="-7" rx="8" ry="1" fill="#a8754a"/>
              <ellipse cx="35" cy="0" rx="9" ry="1" fill="#8a5a2a"/>
              <!-- 4 위성 -->
              <circle cx="20" cy="-3" r="1.5" fill="#fff"/>
              <circle cx="25" cy="-3" r="1.5" fill="#a8d4e8"/>
              <circle cx="50" cy="-3" r="1.5" fill="#c8c8a8"/>
              <circle cx="55" cy="-3" r="1.5" fill="#a8a8a8"/>
              <text x="40" y="20" font-size="9" text-anchor="middle" fill="#7a3a1a">木星 + 4衛星!</text>
            </g>
            <text x="225" y="220" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a3a1a">新しい 道具 = 新しい 発見</text>
            <text x="225" y="240" font-size="10" text-anchor="middle" fill="#5a4a2a">事件 5 の 顕微鏡 (パスト博士) と 同じ 原理</text>
          </svg>
        `,
      },
      {
        title: '④  観測が 常識を 更新する',
        svg: `
          <svg viewBox="0 0 450 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:430px;height:auto;background:#eef8ee;border-radius:12px;">
            <text x="225" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a6a2a">証拠が、 古い 常識を 更新する</text>
            <!-- 좌: 常識 (天動説) -->
            <g transform="translate(40,70)">
              <rect x="0" y="0" width="130" height="100" fill="#fff" stroke="#e74c3c" stroke-width="2" rx="8"/>
              <text x="65" y="22" font-size="11" font-weight="bold" text-anchor="middle" fill="#e74c3c">常識</text>
              <text x="65" y="42" font-size="10" text-anchor="middle" fill="#1a1a1a">「すべて 地球を</text>
              <text x="65" y="58" font-size="10" text-anchor="middle" fill="#1a1a1a">まわる」</text>
              <text x="65" y="80" font-size="9" text-anchor="middle" fill="#5a4a2a">(天動説)</text>
              <text x="65" y="95" font-size="10" font-weight="bold" text-anchor="middle" fill="#e74c3c">✗</text>
            </g>
            <!-- 衝突 -->
            <text x="200" y="125" font-size="18" font-weight="bold" text-anchor="middle" fill="#7a3a1a">⚡</text>
            <!-- 중: 観測 -->
            <g transform="translate(160,70)">
              <rect x="0" y="0" width="130" height="100" fill="#fff" stroke="#1a6a2a" stroke-width="2" rx="8"/>
              <text x="65" y="22" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">観測</text>
              <text x="65" y="42" font-size="10" text-anchor="middle" fill="#1a1a1a">「木星を まわる</text>
              <text x="65" y="58" font-size="10" text-anchor="middle" fill="#1a1a1a">4つの 衛星」</text>
              <text x="65" y="80" font-size="9" text-anchor="middle" fill="#5a4a2a">(望遠鏡)</text>
              <text x="65" y="95" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a6a2a">✓</text>
            </g>
            <!-- 矢印 -->
            <line x1="300" y1="120" x2="345" y2="120" stroke="#1a6a2a" stroke-width="2" marker-end="url(#ah_g7)"/>
            <!-- 우: 新理解 -->
            <g transform="translate(350,70)">
              <rect x="0" y="0" width="90" height="100" fill="#fff" stroke="#1a4a7a" stroke-width="2" rx="8"/>
              <text x="45" y="22" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a4a7a">新 理解</text>
              <text x="45" y="42" font-size="10" text-anchor="middle" fill="#1a1a1a">「地球は</text>
              <text x="45" y="58" font-size="10" text-anchor="middle" fill="#1a1a1a">中心では ない」</text>
              <text x="45" y="80" font-size="9" text-anchor="middle" fill="#5a4a2a">(地動説)</text>
              <text x="45" y="95" font-size="10" font-weight="bold" text-anchor="middle" fill="#1a4a7a">✓</text>
            </g>
            <defs>
              <marker id="ah_g7" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#1a6a2a"/></marker>
            </defs>
            <text x="225" y="210" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">権威 ではなく 観測·証拠が 真実を 決める</text>
            <text x="225" y="232" font-size="10" text-anchor="middle" fill="#5a4a2a">古い 常識でも、 観測と 合わなければ 疑い 直す</text>
            <text x="225" y="258" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a1a1a">これが 「近代 科学」 の 基本 態度</text>
          </svg>
        `,
      },
    ],

    formulas: [
      {
        name: '観測 > 権威',
        formula: '自分の 目で 見た 証拠 > 古い 常識·権威',
        formulaSimple: '証拠 優先',
        explanation: '真実は 多数決や 権威 ではなく 観測·証拠で 決まる。 ガリレオの 態度であり 科学の 基本。',
        note: '木星 衛星 という 一つの 観測が 「すべてが 地球 中心」 を 反証。',
      },
      {
        name: '地動説',
        formula: '地球 = 太陽を まわる 惑星の 一つ',
        formulaSimple: '太陽 中心',
        explanation: '地球は 宇宙の 中心 ではなく 太陽を まわる 惑星。 コペルニクス 提唱、 ガリレオ 観測で 裏付け。',
        note: '天動説 (地球 中心) から 地動説 (太陽 中心) への 転換。',
      },
    ],

    unitsTable: {
      title: '天体観測 キーワード まとめ',
      rows: [
        ['用語',                    '意味',                                       '例·備考'],
        ['天動説 (てんどうせつ)',    '地球が 中心、 全 天体が 地球を まわる 旧説', 'ガリレオ 以前の 常識'],
        ['地動説 (ちどうせつ)',      '地球が 太陽を まわる 惑星 という 説',         'コペルニクス·ガリレオ'],
        ['衛星 (えいせい)',          '惑星の 周りを まわる 天体',                  '木星の 4大 衛星·地球の 月'],
        ['望遠鏡 (ぼうえんきょう)',  '遠い 天体を 大きく 見る 道具',                'ガリレオが 天体観測に 使用'],
        ['観測 (かんそく)',          '直接 観察·記録 する こと',                    '毎晩 衛星 位置を 記録'],
        ['証拠 (しょうこ)',          '主張を 裏付ける 事実',                        '権威 より 優先する 根拠'],
      ],
    },

    flashcards: [
      { front: '天動説 (てんどうせつ)', back: '地球が 宇宙 中心で 全 天体が 地球を まわる 旧説。 ガリレオ 観測で 揺らぐ。' },
      { front: '地動説 (ちどうせつ)',   back: '地球が 太陽を まわる 惑星の 一つ という 説。 コペルニクス 提唱、 ガリレオが 証拠 提供。' },
      { front: '衛星 (えいせい)',       back: '惑星の 周りを まわる 天体。 木星の 4大 衛星、 地球の 月。' },
      { front: 'ガリレオ衛星',          back: 'ガリレオが 1610年に 発見した 木星の 4大 衛星。 イオ·エウロパ·ガニメデ·カリスト。' },
      { front: '望遠鏡 (ぼうえんきょう)', back: 'レンズで 遠い 天体を 大きく 見る 道具。 ガリレオが 天体観測に 本格的に 初使用。' },
      { front: '木星 (もくせい)',       back: '太陽系 最大の 惑星。 ガリレオが その 衛星を 観測し 地動説の 証拠と した。' },
      { front: 'コペルニクス',          back: '地動説を 初めて 体系的に 主張した 天文学者。 ガリレオが 観測で 裏付け。' },
      { front: '観測 (かんそく)',       back: '直接 観察し 記録する こと。 ガリレオは 「権威より 観測」 を 重視。' },
      { front: '証拠 (しょうこ)',       back: '主張を 裏付ける 事実。 真実は 多数決 ではなく 証拠で 決まる。' },
      { front: 'ガリレオ·ガリレイ',     back: 'イタリアの 天文学者·物理学者 (1564-1642)。 望遠鏡 天体観測·地動説 擁護。 「近代 科学の 父」。' },
    ],

    exercises: [
      {
        q: '事件 7 で 木星の そばの 4つの 点の 正体は?',
        options: ['遠い 星', '木星を まわる 衛星', '彗星', '人工衛星'],
        correct: 1,
        explanation: '事件 7 の 核心。 木星を まわる 4大 衛星。 「すべてが 地球を まわる」 を 反証。',
      },
      {
        q: '「すべての 天体が 地球を まわる」 という 旧説は?',
        options: ['地動説', '天動説', '進化論', '相対性理論'],
        correct: 1,
        explanation: '天動説 (地球 中心説)。 ガリレオの 木星 衛星 観測が これを 揺るがす。',
      },
      {
        q: 'ガリレオが 天体観測に 使った 道具は?',
        options: ['顕微鏡', '望遠鏡', '温度計', '羅針盤'],
        correct: 1,
        explanation: '望遠鏡。 肉眼では 見えなかった 木星 衛星を 発見。',
      },
      {
        q: '地動説を 初めて 体系的に 主張した 人は?',
        options: ['ガリレオ', 'コペルニクス', 'ニュートン', 'ケプラー'],
        correct: 1,
        explanation: 'コペルニクス。 ガリレオが 観測で 強力な 証拠を 提供。',
      },
      {
        q: '惑星の 周りを まわる 天体を 何という?',
        options: ['恒星', '衛星', '彗星', '流星'],
        correct: 1,
        explanation: '衛星。 木星の 4大 衛星、 地球の 月が その 例。',
      },
      {
        q: '木星の 衛星が 毎晩 位置が 違って 見える 理由は?',
        options: ['星が 瞬くから', '木星の 周りを まわっているから', '地球が 揺れるから', '望遠鏡の 故障'],
        correct: 1,
        explanation: '木星を まわる 円運動を 横から 見ると 左右の 往復に 見える。',
      },
      {
        q: 'ガリレオが 最も 重視した 科学的 態度は?',
        options: ['権威に 従う', '自分の 目で 観測·確認 する', '多数決で 決める', '伝統を 守る'],
        correct: 1,
        explanation: '「権威が 何と 言おうと 自分の 目で 確かめる」。 観測·証拠 重視が 科学の 基本。',
      },
      {
        q: '地動説で 地球は?',
        options: ['宇宙の 中心', '太陽を まわる 惑星', '動かない', '太陽より 大きい'],
        correct: 1,
        explanation: '地球は 中心 ではなく 太陽を まわる 惑星の 一つ。',
      },
      {
        q: '望遠鏡が 天文学に もたらした 変化は?',
        options: ['変化 なし', '肉眼で 見えなかった 天体を 観測 可能に', '星を より 小さく 見る', '昼にだけ 観測 可能'],
        correct: 1,
        explanation: '望遠鏡で 木星 衛星·月の 表面 など 新 天体 観測 → 宇宙観の 変化。',
      },
      {
        q: 'ガリレオが 「近代 科学の 父」 と 呼ばれる 理由は?',
        options: ['本を たくさん 書いた', '観測·実験·証拠 中心の 科学 方法を 確立', '王だった', '望遠鏡を 発明した'],
        correct: 1,
        explanation: '権威 ではなく 観測·実験·証拠に 基づく 科学 方法を 確立。',
      },
    ],

    tips: [
      { title: '①  観測 > 権威',                body: '真実は 権威·多数決 ではなく 観測·証拠で 決まる。 ガリレオの 中心 態度。' },
      { title: '②  木星の 4大 衛星',            body: 'ガリレオが 1610年 発見。 「すべてが 地球を まわる」 を 反証した 決定的 観測。' },
      { title: '③  天動説 → 地動説',            body: '地球 中心から 太陽 中心へ。 コペルニクス 提唱、 ガリレオ 観測で 裏付け。' },
      { title: '④  道具が 発見を 生む',          body: '望遠鏡 という 新道具が 新天体を 見せる。 事件 5 の 顕微鏡と 同じ 原理。' },
      { title: '⑤  円を 横から = 往復',          body: '衛星の 円運動を 横から 見ると 左右の 往復に 見える。 観測の 幾何学。' },
      { title: '⑥  常識も 疑える',              body: '観測と 合わなければ 常識も 疑う。 科学は 絶えず 検証·更新。' },
      { title: '⑦  地球は 特別 ではない',        body: '木星にも 衛星が ある = 地球だけが 中心 ではない。 人間 中心 宇宙観の 転換。' },
      { title: '⑧  証拠を 記録せよ',            body: 'ガリレオは 毎晩 位置を 記録。 地道な 観測 記録が 法則を 浮かび上がらせる (メンデルと 通じる)。' },
    ],
  },
  scientists_case08: {
    title: '電磁誘導と 発電の 原理',
    subtitle: '事件 8 で 学んだ こと',
    examScope: '中学 理科 (物理) + 比喩 中心',

    concept: {
      title: '電磁誘導と 発電の 原理',
      paragraphs: [
        '事件 8 で 電池も ないのに 流れた 電流 — その 正体は 「電磁誘導 (でんじゆうどう)」 でした。 ファラデー は 1831年、 コイルの 中で 磁石を 動かすと 電流が 生まれる ことを 発見 しました。',
        '磁石の まわりには、 目に 見えない 「磁場 (じば)」 が あります。 磁石を コイルに 近づけたり 遠ざけたり すると、 コイルを 通る 磁場が 「変化」 します。 この 変化が、 コイルに 電流を 生み出すのです。',
        '大切なのは 「変化」 です。 磁石を 止めて おくと 磁場は 一定で、 電流は 流れません。 動かす とき だけ 電流が 生まれ、 入れる·抜く で 向きが 逆に なります。 「変化の 速さ·大きさ」 が 電流の 強さを 決めます。',
        'この 発見が、 私たちの 暮らしを 一変させました。 磁石と コイルを 回し続けて 電気を 作る 装置が 「発電機」 です。 火力·水力·風力·原子力 — どんな 発電所も、 最後は この 電磁誘導で 電気を 作って います。 目に 見えない 力の 発見が、 世界を 電気で 照らしたのです。',
      ],
      highlight: '磁場の 「変化」 が 電流を 生む (電磁誘導)。 これが あらゆる 発電の 原理。',
    },

    diagrams: [
      {
        title: '①  止まると 0、 動かすと 電流',
        svg: `
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#eef4fa;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a4a7a">磁石が 動く ときだけ 電流が 流れる</text>
            <!-- LEFT: 정지 -->
            <text x="125" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#7a3a1a">A: 磁石 停止</text>
            <g transform="translate(60,80)">
              <!-- 코일 (가로 막대로 표현) -->
              <rect x="0" y="40" width="130" height="40" fill="none" stroke="#8a5a2a" stroke-width="2.5" rx="4"/>
              <line x1="10" y1="40" x2="10" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="30" y1="40" x2="30" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="50" y1="40" x2="50" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="70" y1="40" x2="70" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="90" y1="40" x2="90" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="110" y1="40" x2="110" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <!-- 자석 (정지) -->
              <rect x="40" y="50" width="50" height="20" fill="#e74c3c" stroke="#7a1a1a" stroke-width="1.5"/>
              <rect x="40" y="50" width="25" height="20" fill="#3a5a9a" stroke="#1a3a5a" stroke-width="1.5"/>
              <text x="52" y="64" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">N</text>
              <text x="78" y="64" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">S</text>
              <text x="65" y="105" font-size="14" font-weight="bold" text-anchor="middle" fill="#7a3a1a">停止</text>
              <!-- 전류계 (바늘 중앙) -->
              <circle cx="65" cy="150" r="22" fill="#fff" stroke="#1a4a7a" stroke-width="2"/>
              <line x1="65" y1="150" x2="65" y2="135" stroke="#1a4a7a" stroke-width="2"/>
              <text x="65" y="180" font-size="9" font-weight="bold" text-anchor="middle" fill="#1a4a7a">針: 0</text>
              <!-- 코일-전류계 연결선 -->
              <line x1="10" y1="80" x2="10" y2="100" stroke="#5a3a1a" stroke-width="1.5"/>
              <line x1="120" y1="80" x2="120" y2="100" stroke="#5a3a1a" stroke-width="1.5"/>
              <line x1="10" y1="100" x2="45" y2="150" stroke="#5a3a1a" stroke-width="1.5"/>
              <line x1="120" y1="100" x2="85" y2="150" stroke="#5a3a1a" stroke-width="1.5"/>
            </g>
            <text x="125" y="280" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a3a1a">磁場 一定 → 電流 なし</text>
            <!-- 분리선 -->
            <line x1="250" y1="55" x2="250" y2="265" stroke="#bdbdbd" stroke-width="1" stroke-dasharray="3 2"/>
            <!-- RIGHT: 運動 -->
            <text x="375" y="50" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a6a2a">B: 磁石 運動</text>
            <g transform="translate(310,80)">
              <!-- 코일 -->
              <rect x="0" y="40" width="130" height="40" fill="none" stroke="#8a5a2a" stroke-width="2.5" rx="4"/>
              <line x1="10" y1="40" x2="10" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="30" y1="40" x2="30" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="50" y1="40" x2="50" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="70" y1="40" x2="70" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="90" y1="40" x2="90" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <line x1="110" y1="40" x2="110" y2="80" stroke="#8a5a2a" stroke-width="2"/>
              <!-- 자석 (움직임 화살표) -->
              <rect x="40" y="50" width="50" height="20" fill="#e74c3c" stroke="#7a1a1a" stroke-width="1.5"/>
              <rect x="40" y="50" width="25" height="20" fill="#3a5a9a" stroke="#1a3a5a" stroke-width="1.5"/>
              <text x="52" y="64" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">N</text>
              <text x="78" y="64" font-size="10" font-weight="bold" text-anchor="middle" fill="#fff">S</text>
              <!-- 운동 화살표 -->
              <line x1="95" y1="60" x2="125" y2="60" stroke="#1a6a2a" stroke-width="2.5" marker-end="url(#ah_f1)"/>
              <text x="65" y="105" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a6a2a">運動 →</text>
              <!-- 전류계 (바늘 흔들림) -->
              <circle cx="65" cy="150" r="22" fill="#fff" stroke="#1a4a7a" stroke-width="2"/>
              <line x1="65" y1="150" x2="80" y2="138" stroke="#1a6a2a" stroke-width="2.5"/>
              <text x="65" y="180" font-size="9" font-weight="bold" text-anchor="middle" fill="#1a6a2a">針: 動く!</text>
              <line x1="10" y1="80" x2="10" y2="100" stroke="#5a3a1a" stroke-width="1.5"/>
              <line x1="120" y1="80" x2="120" y2="100" stroke="#5a3a1a" stroke-width="1.5"/>
              <line x1="10" y1="100" x2="45" y2="150" stroke="#5a3a1a" stroke-width="1.5"/>
              <line x1="120" y1="100" x2="85" y2="150" stroke="#5a3a1a" stroke-width="1.5"/>
            </g>
            <defs>
              <marker id="ah_f1" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1a6a2a"/></marker>
            </defs>
            <text x="375" y="280" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">磁場 変化 → 電流 発生!</text>
          </svg>
        `,
      },
      {
        title: '②  磁場と その 変化 — 目に 見えない 力',
        svg: `
          <svg viewBox="0 0 500 280" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#fff5e8;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#7a3a1a">磁石の まわりの 磁場 (磁力線)</text>
            <!-- 자석 -->
            <g transform="translate(220,110)">
              <rect x="0" y="0" width="60" height="30" fill="#e74c3c" stroke="#7a1a1a" stroke-width="2"/>
              <rect x="0" y="0" width="30" height="30" fill="#3a5a9a" stroke="#1a3a5a" stroke-width="2"/>
              <text x="15" y="20" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">N</text>
              <text x="45" y="20" font-size="13" font-weight="bold" text-anchor="middle" fill="#fff">S</text>
            </g>
            <!-- 자기력선 (N에서 S로 곡선) -->
            <g fill="none" stroke="#1a4a7a" stroke-width="1.5">
              <path d="M 235 110 Q 250 60 280 60 Q 310 60 325 110" stroke-width="1.8" marker-end="url(#ah_f2)"/>
              <path d="M 230 105 Q 245 45 280 45 Q 315 45 330 105" marker-end="url(#ah_f2)"/>
              <path d="M 235 140 Q 250 190 280 190 Q 310 190 325 140" stroke-width="1.8" marker-end="url(#ah_f2)"/>
              <path d="M 230 145 Q 245 205 280 205 Q 315 205 330 145" marker-end="url(#ah_f2)"/>
            </g>
            <defs>
              <marker id="ah_f2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#1a4a7a"/></marker>
            </defs>
            <!-- 좌측 코일 -->
            <g transform="translate(40,100)">
              <ellipse cx="0" cy="0" rx="12" ry="25" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="15" cy="0" rx="12" ry="25" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="30" cy="0" rx="12" ry="25" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="45" cy="0" rx="12" ry="25" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <text x="22" y="50" font-size="10" font-weight="bold" text-anchor="middle" fill="#5a3a1a">コイル</text>
            </g>
            <!-- 近づける 화살표 -->
            <line x1="115" y1="100" x2="200" y2="115" stroke="#e74c3c" stroke-width="2.5" stroke-dasharray="4 3" marker-end="url(#ah_f3)"/>
            <text x="155" y="92" font-size="10" font-weight="bold" text-anchor="middle" fill="#e74c3c">近づける</text>
            <text x="155" y="138" font-size="9" text-anchor="middle" fill="#7a1a1a">磁場 増える</text>
            <defs>
              <marker id="ah_f3" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e74c3c"/></marker>
            </defs>
            <!-- 우측 코일 -->
            <g transform="translate(410,100)">
              <ellipse cx="0" cy="0" rx="12" ry="25" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="15" cy="0" rx="12" ry="25" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="30" cy="0" rx="12" ry="25" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="45" cy="0" rx="12" ry="25" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <text x="22" y="50" font-size="10" font-weight="bold" text-anchor="middle" fill="#5a3a1a">コイル</text>
            </g>
            <!-- 遠ざける -->
            <line x1="385" y1="115" x2="295" y2="100" stroke="#3498db" stroke-width="2.5" stroke-dasharray="4 3" marker-end="url(#ah_f4)"/>
            <text x="345" y="92" font-size="10" font-weight="bold" text-anchor="middle" fill="#3498db">遠ざける</text>
            <text x="345" y="138" font-size="9" text-anchor="middle" fill="#1a3a5a">磁場 減る</text>
            <defs>
              <marker id="ah_f4" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#3498db"/></marker>
            </defs>
            <text x="250" y="245" font-size="11" font-weight="bold" text-anchor="middle" fill="#7a3a1a">コイルを 通る 磁場が 「変わる」 ことで 電流 発生</text>
            <text x="250" y="265" font-size="10" text-anchor="middle" fill="#5a4a2a">磁場は 見えない けど、 電流計が その 変化を 教えて くれる</text>
          </svg>
        `,
      },
      {
        title: '③  入れる ↔ 抜く — 電流 の 向きも 逆',
        svg: `
          <svg viewBox="0 0 450 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:430px;height:auto;background:#eef8ee;border-radius:12px;">
            <text x="225" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#1a6a2a">変化の 向き が 電流の 向きを 決める</text>
            <!-- LEFT: 入れる -->
            <text x="110" y="55" font-size="12" font-weight="bold" text-anchor="middle" fill="#7a1a1a">入れる</text>
            <g transform="translate(50,75)">
              <ellipse cx="60" cy="20" rx="50" ry="14" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="60" cy="35" rx="50" ry="14" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="60" cy="50" rx="50" ry="14" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <!-- 자석 -->
              <rect x="35" y="25" width="50" height="20" fill="#e74c3c" stroke="#7a1a1a" stroke-width="1.5"/>
              <rect x="35" y="25" width="25" height="20" fill="#3a5a9a" stroke="#1a3a5a" stroke-width="1.5"/>
              <text x="47" y="39" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">N</text>
              <text x="73" y="39" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">S</text>
              <!-- 화살표 → -->
              <line x1="92" y1="35" x2="125" y2="35" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#ah_f5)"/>
            </g>
            <!-- 전류 흐름 → -->
            <g transform="translate(50,160)">
              <rect x="0" y="0" width="120" height="22" fill="#fff" stroke="#7a1a1a" stroke-width="2" rx="3"/>
              <text x="20" y="15" font-size="10" font-weight="bold" fill="#7a1a1a">電流</text>
              <line x1="55" y1="11" x2="100" y2="11" stroke="#7a1a1a" stroke-width="2.5" marker-end="url(#ah_f6)"/>
            </g>
            <text x="110" y="220" font-size="10" text-anchor="middle" fill="#7a1a1a">磁場 増える → 電流 →</text>
            <!-- 분리선 -->
            <line x1="225" y1="50" x2="225" y2="280" stroke="#bdbdbd" stroke-width="1" stroke-dasharray="3 2"/>
            <!-- RIGHT: 抜く -->
            <text x="340" y="55" font-size="12" font-weight="bold" text-anchor="middle" fill="#1a3a5a">抜く</text>
            <g transform="translate(280,75)">
              <ellipse cx="60" cy="20" rx="50" ry="14" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="60" cy="35" rx="50" ry="14" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <ellipse cx="60" cy="50" rx="50" ry="14" fill="none" stroke="#8a5a2a" stroke-width="2"/>
              <rect x="35" y="25" width="50" height="20" fill="#e74c3c" stroke="#7a1a1a" stroke-width="1.5"/>
              <rect x="35" y="25" width="25" height="20" fill="#3a5a9a" stroke="#1a3a5a" stroke-width="1.5"/>
              <text x="47" y="39" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">N</text>
              <text x="73" y="39" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">S</text>
              <!-- 화살표 ← -->
              <line x1="30" y1="35" x2="-3" y2="35" stroke="#3498db" stroke-width="2.5" marker-end="url(#ah_f7)"/>
            </g>
            <!-- 전류 흐름 ← -->
            <g transform="translate(280,160)">
              <rect x="0" y="0" width="120" height="22" fill="#fff" stroke="#1a3a5a" stroke-width="2" rx="3"/>
              <text x="100" y="15" font-size="10" font-weight="bold" fill="#1a3a5a">電流</text>
              <line x1="65" y1="11" x2="20" y2="11" stroke="#1a3a5a" stroke-width="2.5" marker-end="url(#ah_f8)"/>
            </g>
            <text x="340" y="220" font-size="10" text-anchor="middle" fill="#1a3a5a">磁場 減る → 電流 ←</text>
            <defs>
              <marker id="ah_f5" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#e74c3c"/></marker>
              <marker id="ah_f6" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#7a1a1a"/></marker>
              <marker id="ah_f7" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#3498db"/></marker>
              <marker id="ah_f8" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1a3a5a"/></marker>
            </defs>
            <text x="225" y="265" font-size="11" font-weight="bold" text-anchor="middle" fill="#1a6a2a">入れる ↔ 抜く で 電流の 向きも 反対</text>
            <text x="225" y="285" font-size="10" text-anchor="middle" fill="#5a4a2a">変化の 「速さ」 が 大きいほど 強い 電流</text>
          </svg>
        `,
      },
      {
        title: '④  発電機の 原理 — すべての 発電所が 同じ',
        svg: `
          <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:480px;height:auto;background:#fff5f0;border-radius:12px;">
            <text x="250" y="22" font-size="14" font-weight="bold" text-anchor="middle" fill="#8a4a1a">回し続ければ 電気が できる = 発電機</text>
            <!-- 中央: 発電機 -->
            <g transform="translate(180,60)">
              <rect x="0" y="0" width="140" height="120" fill="#fff" stroke="#8a4a1a" stroke-width="2.5" rx="8"/>
              <text x="70" y="22" font-size="11" font-weight="bold" text-anchor="middle" fill="#8a4a1a">発電機</text>
              <!-- 회전 자석 -->
              <circle cx="70" cy="70" r="35" fill="none" stroke="#5a3a1a" stroke-width="1.5"/>
              <g transform="translate(70,70) rotate(45)">
                <rect x="-20" y="-10" width="40" height="20" fill="#e74c3c" stroke="#7a1a1a" stroke-width="1.5"/>
                <rect x="-20" y="-10" width="20" height="20" fill="#3a5a9a" stroke="#1a3a5a" stroke-width="1.5"/>
                <text x="-10" y="3" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">N</text>
                <text x="10" y="3" font-size="9" font-weight="bold" text-anchor="middle" fill="#fff">S</text>
              </g>
              <!-- 회전 화살표 -->
              <path d="M 100 50 A 35 35 0 0 1 100 90" fill="none" stroke="#1a6a2a" stroke-width="2" marker-end="url(#ah_f9)"/>
              <text x="70" y="115" font-size="9" text-anchor="middle" fill="#5a3a1a">磁石を 回転</text>
            </g>
            <!-- 左: エネルギー源 -->
            <text x="80" y="80" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a1a1a">エネルギー源</text>
            <g transform="translate(30,90)" font-size="9" fill="#5a3a1a">
              <text x="0" y="0">🔥 火力</text>
              <text x="0" y="18">💧 水力</text>
              <text x="0" y="36">💨 風力</text>
              <text x="0" y="54">⚛ 原子力</text>
            </g>
            <line x1="120" y1="120" x2="175" y2="120" stroke="#7a3a1a" stroke-width="2" marker-end="url(#ah_fa)"/>
            <text x="148" y="112" font-size="9" font-style="italic" text-anchor="middle" fill="#7a3a1a">回転 力</text>
            <!-- 右: 電気 出力 -->
            <line x1="325" y1="120" x2="385" y2="120" stroke="#fdd58e" stroke-width="3" marker-end="url(#ah_fb)"/>
            <text x="355" y="110" font-size="9" font-weight="bold" text-anchor="middle" fill="#7a1a1a">電気</text>
            <!-- 가정 (전구) -->
            <g transform="translate(390,90)">
              <ellipse cx="20" cy="20" rx="14" ry="16" fill="#fdd58e" stroke="#7a5a00" stroke-width="2"/>
              <rect x="14" y="34" width="12" height="8" fill="#888"/>
              <text x="20" y="60" font-size="10" font-weight="bold" text-anchor="middle" fill="#7a5a00">家庭·街</text>
            </g>
            <defs>
              <marker id="ah_f9" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#1a6a2a"/></marker>
              <marker id="ah_fa" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto"><path d="M0,0 L7,3.5 L0,7 Z" fill="#7a3a1a"/></marker>
              <marker id="ah_fb" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#fdd58e"/></marker>
            </defs>
            <!-- 설명 박스 -->
            <rect x="40" y="210" width="420" height="80" fill="#fff" stroke="#8a4a1a" stroke-width="1.5" rx="8"/>
            <text x="250" y="232" font-size="11" font-weight="bold" text-anchor="middle" fill="#8a4a1a">どんな 発電所も、 最後は 同じ 仕組み</text>
            <text x="60" y="252" font-size="10" fill="#1a1a1a">• エネルギー源で 何かを 回す</text>
            <text x="60" y="270" font-size="10" fill="#1a1a1a">• 磁石/コイルが 回転 → 磁場が 絶えず 変化 → 電磁誘導</text>
            <text x="60" y="286" font-size="10" font-weight="bold" fill="#7a1a1a">• ファラデーの 発見が、 世界の すべての 電気を 支えている</text>
          </svg>
        `,
      },
    ],

    formulas: [
      {
        name: '電磁誘導の 条件',
        formula: '磁場の 変化 → コイルに 電流 発生',
        formulaSimple: '変化 = 電流',
        explanation: 'コイルを 通る 磁場が 変わる ときだけ 電流 発生。 変わらなければ (磁石 停止) 電流は 流れない。',
        note: '「ある」 ではなく 「変わる」 が 鍵。 ファラデーの 電磁誘導。',
      },
      {
        name: '誘導電流の 性質',
        formula: '変化 速いほど·大きいほど → 強い 電流 / 変化 方向 ↔ 電流 方向',
        formulaSimple: '速い 変化 = 強い 電流',
        explanation: '磁石を 速く 動かしたり 強い 磁石を 使えば 電流が 大きい。 入れる ときと 抜く ときで 電流 方向が 反対。',
        note: '発電機は この 原理で 磁石/コイルを 回し続けて 電気を 生産。',
      },
    ],

    unitsTable: {
      title: '電磁気 キーワード まとめ',
      rows: [
        ['用語',                       '意味',                                            '例·備考'],
        ['電磁誘導 (でんじゆうどう)',   '磁場 変化で 電流が 生まれる 現象',                 'ファラデー 発見 (1831)'],
        ['磁場 (じば)',                 '磁石 周囲の 目に 見えない 力の 領域',              '磁力線で 表現'],
        ['コイル',                     '電線を 何回も 巻いた もの',                       '巻数が 多いほど 電流 大'],
        ['電流 (でんりゅう)',           '電気の 流れ',                                     '電流計の 針で 測定'],
        ['発電機 (はつでんき)',         '磁場 変化で 電気を 作る 装置',                    '発電所の 核心'],
        ['変化 (へんか)',               '磁場が 変わる こと (電磁誘導の 条件)',             '磁石を 動かして 作る'],
      ],
    },

    flashcards: [
      { front: '電磁誘導 (でんじゆうどう)', back: '磁場の 変化で コイルに 電流が 生まれる 現象。 ファラデーが 1831年 発見。' },
      { front: '磁場 (じば)',               back: '磁石 周囲の 目に 見えない 力の 領域。 変われば 電流を 生む。' },
      { front: 'コイル',                   back: '電線を 何回も 巻いた もの。 巻数が 多いほど 誘導 電流が 大きい。' },
      { front: '電流 (でんりゅう)',         back: '電気の 流れ。 磁場 変化で 電池 なしでも 作れる。' },
      { front: '発電機 (はつでんき)',       back: '磁石·コイルを 動かし続けて (回転) 電気を 作る 装置。 電磁誘導の 応用。' },
      { front: '「変化」 が 鍵',            back: '磁石が ある だけでは ダメ。 動かして 磁場が 変わら なければ 電流は 生まれない。' },
      { front: '誘導電流の 向き',           back: '磁石を 入れる ときと 抜く ときで 電流 方向が 反対。 変化の 向きが 決める。' },
      { front: '発電所',                   back: '火力·水力·風力·原子力 全て 最終的に 電磁誘導で 発電。 何かを 回して 磁場 変化を 生む。' },
      { front: 'モーター',                 back: '電磁誘導の 逆 応用。 電流で 回転力を 作る (発電機の 対)。' },
      { front: 'マイケル·ファラデー',       back: 'イギリスの 物理学者·化学者 (1791-1867)。 電磁誘導 発見。 発電機·モーター 原理の 基礎。' },
    ],

    exercises: [
      {
        q: '事件 8 で 電池 なしで 電流が 流れた 理由は?',
        options: ['コイルが 自分で 作る', '磁石を 動かして 磁場が 変化したから', '電線が 特別だから', '偶然'],
        correct: 1,
        explanation: '事件 8 の 核心。 磁石を 動かすと 磁場が 変わり、 その 変化が 電流を 生む (電磁誘導)。',
      },
      {
        q: '磁石を コイルの 中に じっと 置くと 電流は?',
        options: ['流れ続ける', '流れない', 'だんだん 大きくなる', '逆に 流れる'],
        correct: 1,
        explanation: '停止 = 磁場 不変 = 電流 なし。 「ある」 ではなく 「変わる」 が 条件。',
      },
      {
        q: '磁場の 変化で 電流が 生まれる 現象は?',
        options: ['電磁誘導', '万有引力', '自然選択', '進化'],
        correct: 0,
        explanation: '電磁誘導。 ファラデーが 1831年 発見。',
      },
      {
        q: '電磁誘導を 発見した 人は?',
        options: ['ニュートン', 'ファラデー', 'ガリレオ', 'メンデル'],
        correct: 1,
        explanation: 'マイケル·ファラデー。 発電機·モーターの 基礎 原理を 確立。',
      },
      {
        q: '磁石を 入れる ときと 抜く ときで 電流の 向きは?',
        options: ['同じ', '反対', 'どちらも なし', '無作為'],
        correct: 1,
        explanation: '変化の 方向が 反対 なので 電流の 方向も 反対。',
      },
      {
        q: '誘導 電流を より 大きく するには?',
        options: ['磁石を ゆっくり 動かす', '磁石を 速く 動かす·強い 磁石を 使う', 'コイルを 解く', '電池を 追加'],
        correct: 1,
        explanation: '変化が 速いほど·大きいほど (強い 磁石·巻数 多い コイル) 電流が 大きい。',
      },
      {
        q: '発電所が 電気を 作る 最終 原理は?',
        options: ['燃料を 燃やして 直接 電気に', '電磁誘導 (磁石·コイルを 回す)', '太陽光を 集めるだけ', '水を 沸かすだけ'],
        correct: 1,
        explanation: '火力·水力·風力·原子力 全て 結局 何かを 回して 磁場 変化 → 電磁誘導で 発電。',
      },
      {
        q: 'コイルの 巻数を 増やすと?',
        options: ['電流が 小さくなる', '誘導 電流が 大きくなる', '変化 なし', '磁石が 止まる'],
        correct: 1,
        explanation: 'コイルを 多く 巻くほど 誘導 電流が 大きくなる。',
      },
      {
        q: '「磁場」 を 正しく 説明した のは?',
        options: ['目に 見える 光', '磁石 周囲の 目に 見えない 力の 領域', '音の 一種', '電池の 中の 液体'],
        correct: 1,
        explanation: '磁石 周囲に 形成される 見えない 力の 領域。 磁力線で 表現。',
      },
      {
        q: '電磁誘導が 私たちの 生活に 与えた 影響は?',
        options: ['影響 なし', '発電·モーター など 電気 文明の 基礎', '磁石を 無くした', '電気を 減らした'],
        correct: 1,
        explanation: '発電機·モーター·変圧器 など 現代 電気 文明 全体の 基礎。',
      },
    ],

    tips: [
      { title: '①  「ある」 ではなく 「変わる」',  body: '磁石が ある だけでは 電流 なし。 磁場が 変わる ときだけ 電流 発生。 電磁誘導の 核心。' },
      { title: '②  電磁誘導 = ファラデー 発見',  body: '1831年。 コイルの 中で 磁石を 動かすと 電流 発生。 発電の 基礎 原理。' },
      { title: '③  方向が 反対',                body: '入れる ときと 抜く ときで 電流の 向きが 反対。 変化の 方向が 電流の 方向を 決める。' },
      { title: '④  速いほど·強いほど 大電流',    body: '変化が 速いか 磁石が 強いか コイルが 多く 巻かれているほど 電流が 大きい。' },
      { title: '⑤  発電機の 原理',              body: '磁石/コイルを 回し続け → 絶え間ない 磁場 変化 → 持続 電流。 すべての 発電所の 核心。' },
      { title: '⑥  全ての 発電所が 同じ 原理',   body: '火力·水力·風力·原子力 全て 何かを 回して 発電。 エネルギー源は 違うが 原理は 電磁誘導。' },
      { title: '⑦  目に 見えなくても 実在',     body: '磁場は 見えないが 実験で その 効果を 確認 可能 (事件 5·7と 通じる 科学的 態度)。' },
      { title: '⑧  実験で 確かめろ',            body: 'ファラデーは 正規 教育が 少なかったが 粘り強い 実験で 発見。 手で 確認する 姿勢。' },
    ],
  },
  // 사건 9~10 은 향후 별도 명세서에서 추가 (scientists_case09 ...).
};
