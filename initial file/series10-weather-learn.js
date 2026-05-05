// ============================================================
// 시리즈 10 학습자료 (WEA_LEARN)
// 원본 index.html 라인 21484 ~ 22962
// 분할 v73 (모듈화)
// ============================================================
// =========================
// 📚 WEA_LEARN: 気象予報士 시험 대비 학습 자료 (v73)
// 사건 10건 × 6 섹션 (概念·다이어그램·공식·暗記·객관식·Tips)
// =========================
const WEA_LEARN = {
  // ========================================
  // 第1事件: 🌡 気温·湿度
  // ========================================
  1: {
    title: '🌡 気温·湿度·露点',
    subtitle: '気象観測の 基本',
    examScope: '学科一般 (毎年1~2問)',
    
    concepts: [
      { term: '気温 (きおん)',
        desc: '大気の温度·地上1.25~2.0mで測定·単位は摂氏(°C)·絶対温度(K=°C+273.15)。' },
      { term: '露点温度 (ろてん·Td)',
        desc: '空気を冷却し水蒸気が飽和して凝結が始まる温度。気温と露点が等しい→湿度100%。' },
      { term: '飽和水蒸気量',
        desc: 'ある気温で空気1m³に含み得る水蒸気の最大量(g/m³)。気温が高いほど指数関数的に増加。' },
      { term: '相対湿度 (RH)',
        desc: '実際の水蒸気量÷飽和水蒸気量×100%。一般に「湿度」と言えばこれ。' },
      { term: '百葉箱',
        desc: '気象観測用·白色塗装·芝生上·地上1.2~1.5m·扉は北向き·風通し良いよろい戸構造。' },
    ],
    
    // SVG 다이어그램 - 백엽상 단면도 + 飽和水蒸気量 곡선
    diagram: `
      <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:#f5f0e8;border-radius:12px;">
        <!-- 백엽상 -->
        <g transform="translate(80,80)">
          <text x="0" y="-10" font-size="16" font-weight="bold" fill="#1a4a5a">百葉箱の構造</text>
          <!-- 屋根 -->
          <polygon points="0,30 80,10 160,30" fill="#d4b896" stroke="#7a6450" stroke-width="2"/>
          <!-- 본체 (よろい戸) -->
          <rect x="20" y="30" width="120" height="100" fill="#f5f0e0" stroke="#7a6450" stroke-width="2"/>
          <!-- よろい戸 라인들 -->
          <line x1="20" y1="45" x2="140" y2="45" stroke="#a89070" stroke-width="1"/>
          <line x1="20" y1="60" x2="140" y2="60" stroke="#a89070" stroke-width="1"/>
          <line x1="20" y1="75" x2="140" y2="75" stroke="#a89070" stroke-width="1"/>
          <line x1="20" y1="90" x2="140" y2="90" stroke="#a89070" stroke-width="1"/>
          <line x1="20" y1="105" x2="140" y2="105" stroke="#a89070" stroke-width="1"/>
          <line x1="20" y1="120" x2="140" y2="120" stroke="#a89070" stroke-width="1"/>
          <!-- 안의 온도계 보이게 -->
          <rect x="65" y="55" width="6" height="60" fill="#fff" stroke="#888"/>
          <circle cx="68" cy="120" r="6" fill="#c44"/>
          <!-- 다리 -->
          <line x1="35" y1="130" x2="35" y2="200" stroke="#7a6450" stroke-width="3"/>
          <line x1="125" y1="130" x2="125" y2="200" stroke="#7a6450" stroke-width="3"/>
          <line x1="80" y1="130" x2="80" y2="200" stroke="#7a6450" stroke-width="3"/>
          <!-- 지면 -->
          <line x1="0" y1="200" x2="240" y2="200" stroke="#5a8a4a" stroke-width="3"/>
          <!-- 잔디 표시 -->
          <text x="120" y="215" font-size="9" fill="#5a8a4a" text-anchor="middle">芝生</text>
          
          <!-- 라벨 -->
          <text x="180" y="20" font-size="10" fill="#1a4a5a">▲ 屋根:日射反射(白)</text>
          <text x="180" y="60" font-size="10" fill="#1a4a5a">◀ よろい戸</text>
          <text x="180" y="75" font-size="10" fill="#1a4a5a">  (通風確保)</text>
          <text x="180" y="100" font-size="10" fill="#1a4a5a">◀ 温度計</text>
          <text x="180" y="115" font-size="10" fill="#1a4a5a">  (1.25~2.0m)</text>
          <text x="180" y="170" font-size="10" fill="#1a4a5a">▼ 扉は北向き</text>
          <text x="180" y="183" font-size="10" fill="#1a4a5a">  (直射日光回避)</text>
        </g>
        
        <!-- 飽和水蒸気量 곡선 -->
        <g transform="translate(360,260)">
          <text x="0" y="-130" font-size="13" font-weight="bold" fill="#1a4a5a">飽和水蒸気量曲線</text>
          <!-- 축 -->
          <line x1="0" y1="0" x2="180" y2="0" stroke="#1a4a5a" stroke-width="2"/>
          <line x1="0" y1="0" x2="0" y2="-110" stroke="#1a4a5a" stroke-width="2"/>
          <!-- X축 라벨 -->
          <text x="0" y="14" font-size="9" text-anchor="middle">-10</text>
          <text x="45" y="14" font-size="9" text-anchor="middle">0</text>
          <text x="90" y="14" font-size="9" text-anchor="middle">10</text>
          <text x="135" y="14" font-size="9" text-anchor="middle">20</text>
          <text x="180" y="14" font-size="9" text-anchor="middle">30</text>
          <text x="90" y="30" font-size="10" text-anchor="middle">気温(°C)</text>
          <!-- Y축 라벨 -->
          <text x="-10" y="-100" font-size="9" text-anchor="end">30</text>
          <text x="-10" y="-60" font-size="9" text-anchor="end">17.3</text>
          <text x="-10" y="-32" font-size="9" text-anchor="end">9.4</text>
          <text x="-10" y="-15" font-size="9" text-anchor="end">4.85</text>
          <text x="-25" y="-55" font-size="10" transform="rotate(-90,-25,-55)">g/m³</text>
          <!-- 곡선 (지수함수 근사) -->
          <path d="M 0,-7 Q 45,-15 90,-32 Q 135,-60 180,-105" 
                stroke="#4a90e2" stroke-width="3" fill="none"/>
          <!-- 데이터 점 -->
          <circle cx="0" cy="-7" r="3" fill="#c44"/>
          <circle cx="45" cy="-15" r="3" fill="#c44"/>
          <circle cx="90" cy="-32" r="3" fill="#c44"/>
          <circle cx="135" cy="-60" r="3" fill="#c44"/>
          <circle cx="180" cy="-105" r="3" fill="#c44"/>
          <!-- 값 표시 -->
          <text x="50" y="-20" font-size="8" fill="#c44">4.85</text>
          <text x="95" y="-37" font-size="8" fill="#c44">9.4</text>
          <text x="140" y="-65" font-size="8" fill="#c44">17.3</text>
        </g>
      </svg>
    `,
    
    formulas: [
      { f: '相対湿度 = 実際の水蒸気量 ÷ 飽和水蒸気量 × 100%', m: 'RH の 定義' },
      { f: 'T(K) = T(°C) + 273.15', m: '絶対温度の 変換' },
      { f: '気温 = 露点 → 相対湿度 100%', m: '露点の 応用' },
    ],
    
    table: {
      title: '飽和水蒸気量 早見表 (暗記必須)',
      headers: ['気温', '飽和水蒸気量'],
      rows: [
        ['-10°C', '2.36 g/m³'],
        ['0°C', '4.85 g/m³'],
        ['10°C', '9.41 g/m³'],
        ['20°C', '17.3 g/m³'],
        ['30°C', '30.4 g/m³'],
      ],
    },
    
    cards: [
      { q: '気温の 標準測定高さは?', a: '地上 1.25~2.0m' },
      { q: '露点温度の 定義は?', a: '水蒸気が 飽和し 凝結が始まる 温度·湿度100%' },
      { q: '0°Cの 飽和水蒸気量は?', a: '約 4.85 g/m³' },
      { q: '気温が 10°C上がると 飽和水蒸気量は?', a: '約 2倍 (指数関数的増加)' },
      { q: '百葉箱の 扉の 向きは?', a: '北向き (直射日光を 避けるため)' },
    ],
    
    quiz: [
      { q: '気温30°C·相対湿度50%の 空気を 冷却すると、何°C付近で 凝結が始まるか?',
        opts: ['約 10°C', '約 18°C', '約 25°C', '約 30°C'],
        ans: 1,
        exp: '30°Cの 飽和水蒸気量 約 30.4 g/m³ × 50% = 15.2 g/m³。これと 等しい 飽和水蒸気量に なる 温度が 露点。早見表で 約 18°C (20°Cの 17.3より少し下)。' },
      { q: '露点温度と 気温の 差が 小さいとき、湿度は?',
        opts: ['高い', '低い', '関係ない', '一定'], ans: 0,
        exp: '気温と 露点が 近い = 飽和に 近い = 湿度高い。気温=露点 → 湿度100%。' },
      { q: '百葉箱について 正しい のは?',
        opts: ['扉は 南向き·日光取り入れる', '屋根 黒色·熱吸収', '白色塗装·よろい戸·1.25~2.0m', 'コンクリート上に設置'],
        ans: 2,
        exp: '白色 (反射)·よろい戸 (通風)·芝生上·地上 1.25~2.0m·扉北向き が 標準。' },
      { q: '絶対温度 273.15 K は 摂氏で?',
        opts: ['-273.15°C', '0°C', '100°C', '273.15°C'], ans: 1,
        exp: '0°C = 273.15 K (氷点)。-273.15°C = 0 K (絶対零度)。' },
      { q: '飽和水蒸気量は 気温が 上がると?',
        opts: ['一定', '直線的に 増加', '指数関数的に 増加', '減少'], ans: 2,
        exp: 'クラウジウス・クラペイロンの 関係式に 従い 約 7%/°C で 指数関数的に 増加。温暖化で 大気中 水蒸気増加 → 豪雨頻発の 原因。' },
    ],
    
    tips: [
      '🎯 学科一般で 毎年 1~2問 出題',
      '⭐ 飽和水蒸気量 早見表 (0°·10°·20°C) は 暗記必須',
      '💡 露点 計算 = 「相対湿度 → 実際の水蒸気量 → 同じ 飽和水蒸気量に なる 気温」 3段階',
      '📝 百葉箱は 設置·構造の 出題率 高い (色·向き·高さ)',
    ],
  },

  // ========================================
  // 第2事件: ☁ 10種雲形
  // ========================================
  2: {
    title: '☁ 10種雲形·対流圏',
    subtitle: '雲を 高さで 分類',
    examScope: '学科専門 (毎年1~2問)',
    
    concepts: [
      { term: '10種雲形',
        desc: '国際気象機関(WMO·1957年標準化)の 雲分類。高さと 形状で 10種類に 分類。' },
      { term: '上層雲 (5~13km)',
        desc: '巻雲(けんうん)·巻積雲·巻層雲。氷の結晶で できている。すべて「巻」 の字。' },
      { term: '中層雲 (2~7km)',
        desc: '高積雲·高層雲·乱層雲。乱層雲は 連続性の ある 雨を 降らせる。' },
      { term: '下層雲 (~2km)',
        desc: '層積雲·層雲。層雲は 霧の様に 低い 灰色の 雲。' },
      { term: '対流雲 (積雲·積乱雲)',
        desc: '下層から 上層まで 全層に 発達。積乱雲は 10~16km·圏界面に 達し かなとこ雲を 形成。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:linear-gradient(180deg,#e8f0f5 0%,#c8d8e0 50%,#a8c0c8 100%);border-radius:12px;">
        <text x="300" y="20" font-size="14" font-weight="bold" fill="#1a4a5a" text-anchor="middle">10種雲形 高度別 分類</text>
        
        <!-- 高度축 -->
        <line x1="60" y1="40" x2="60" y2="380" stroke="#1a4a5a" stroke-width="2"/>
        <text x="40" y="50" font-size="9" text-anchor="end">km</text>
        
        <!-- 上層 (5~13km) -->
        <text x="55" y="70" font-size="9" text-anchor="end">13</text>
        <text x="55" y="120" font-size="9" text-anchor="end">10</text>
        <line x1="60" y1="125" x2="540" y2="125" stroke="#aaa" stroke-dasharray="3 3"/>
        <text x="55" y="155" font-size="9" text-anchor="end">5</text>
        <line x1="60" y1="155" x2="540" y2="155" stroke="#aaa" stroke-dasharray="3 3"/>
        <rect x="65" y="60" width="475" height="95" fill="rgba(200,220,235,0.3)"/>
        <text x="80" y="80" font-size="11" font-weight="bold" fill="#1a4a5a">上層雲 (氷晶)</text>
        <!-- 巻雲 (すじ) -->
        <g transform="translate(120,100)">
          <path d="M 0,0 Q 20,-5 40,0 M 50,5 Q 70,-3 90,3" stroke="#fff" stroke-width="2" fill="none"/>
          <text x="45" y="22" font-size="9" text-anchor="middle">巻雲</text>
        </g>
        <!-- 巻積雲 (うろこ) -->
        <g transform="translate(280,100)">
          <circle cx="0" cy="0" r="3" fill="#fff"/>
          <circle cx="10" cy="0" r="3" fill="#fff"/>
          <circle cx="20" cy="0" r="3" fill="#fff"/>
          <circle cx="5" cy="-7" r="3" fill="#fff"/>
          <circle cx="15" cy="-7" r="3" fill="#fff"/>
          <text x="10" y="22" font-size="9" text-anchor="middle">巻積雲</text>
        </g>
        <!-- 巻層雲 (うす) -->
        <g transform="translate(420,100)">
          <ellipse cx="20" cy="0" rx="40" ry="5" fill="rgba(255,255,255,0.5)"/>
          <text x="20" y="22" font-size="9" text-anchor="middle">巻層雲</text>
        </g>
        
        <!-- 中層 (2~7km) -->
        <text x="55" y="195" font-size="9" text-anchor="end">2</text>
        <line x1="60" y1="195" x2="540" y2="195" stroke="#aaa" stroke-dasharray="3 3"/>
        <rect x="65" y="155" width="475" height="40" fill="rgba(180,200,215,0.4)"/>
        <text x="80" y="175" font-size="11" font-weight="bold" fill="#1a4a5a">中層雲</text>
        <g transform="translate(170,180)">
          <ellipse cx="0" cy="0" rx="8" ry="3" fill="#fff"/>
          <ellipse cx="20" cy="0" rx="8" ry="3" fill="#fff"/>
          <text x="10" y="15" font-size="8" text-anchor="middle">高積雲</text>
        </g>
        <g transform="translate(280,180)">
          <ellipse cx="20" cy="0" rx="40" ry="4" fill="rgba(220,220,220,0.7)"/>
          <text x="20" y="15" font-size="8" text-anchor="middle">高層雲</text>
        </g>
        <g transform="translate(420,180)">
          <ellipse cx="20" cy="0" rx="40" ry="6" fill="rgba(140,140,160,0.7)"/>
          <text x="20" y="15" font-size="8" text-anchor="middle">乱層雲(雨)</text>
        </g>
        
        <!-- 下層 (~2km) -->
        <text x="55" y="370" font-size="9" text-anchor="end">0</text>
        <rect x="65" y="195" width="475" height="180" fill="rgba(160,180,195,0.3)"/>
        <text x="80" y="215" font-size="11" font-weight="bold" fill="#1a4a5a">下層雲</text>
        <g transform="translate(150,300)">
          <ellipse cx="0" cy="0" rx="20" ry="5" fill="#ddd"/>
          <ellipse cx="35" cy="0" rx="20" ry="5" fill="#ddd"/>
          <text x="20" y="20" font-size="9" text-anchor="middle">層積雲</text>
        </g>
        <g transform="translate(250,340)">
          <ellipse cx="20" cy="0" rx="50" ry="4" fill="rgba(200,200,200,0.8)"/>
          <text x="20" y="15" font-size="9" text-anchor="middle">層雲(霧)</text>
        </g>
        
        <!-- 対流雲: 積雲·積乱雲 -->
        <g transform="translate(420,80)">
          <text x="0" y="0" font-size="11" font-weight="bold" fill="#c44">対流雲</text>
          <!-- 적란운 - 全層 발달 -->
          <ellipse cx="40" cy="10" rx="50" ry="12" fill="#ddd"/>
          <path d="M 10,30 Q 30,-5 50,30 Q 70,5 90,30 L 90,280 L 10,280 Z" fill="rgba(120,120,140,0.8)" stroke="#666" stroke-width="1"/>
          <text x="50" y="160" font-size="10" fill="white" text-anchor="middle">積乱雲</text>
          <text x="50" y="175" font-size="9" fill="white" text-anchor="middle">10~16km</text>
          <text x="50" y="195" font-size="8" fill="white" text-anchor="middle">雷·豪雨</text>
          <!-- 비 -->
          <line x1="20" y1="280" x2="15" y2="295" stroke="#4a8" stroke-width="1.5"/>
          <line x1="40" y1="280" x2="35" y2="295" stroke="#4a8" stroke-width="1.5"/>
          <line x1="60" y1="280" x2="55" y2="295" stroke="#4a8" stroke-width="1.5"/>
          <line x1="80" y1="280" x2="75" y2="295" stroke="#4a8" stroke-width="1.5"/>
        </g>
        
        <!-- 圏界面 표시 -->
        <text x="540" y="65" font-size="9" fill="#c44" text-anchor="end">⤴ 圏界面</text>
      </svg>
    `,
    
    formulas: [
      { f: '上層雲 (5~13km) = 巻·巻積·巻層', m: '高度+「巻」' },
      { f: '中層雲 (2~7km) = 高積·高層·乱層', m: '高度+「高·乱」' },
      { f: '下層雲 (~2km) = 層積·層', m: '高度+「層」のみ' },
      { f: '積乱雲 = 10~16km·かなとこ雲·雷·豪雨', m: '対流雲·全層発達' },
    ],
    
    table: {
      title: '10種雲形 一覧',
      headers: ['分類', '雲名', '特徴'],
      rows: [
        ['上層', '巻雲', 'すじ雲·氷晶'],
        ['上層', '巻積雲', 'うろこ雲'],
        ['上層', '巻層雲', 'うす雲·ハロ'],
        ['中層', '高積雲', 'ひつじ雲'],
        ['中層', '高層雲', 'おぼろ雲'],
        ['中層', '乱層雲', 'あま雲·連続雨'],
        ['下層', '層積雲', 'うね雲'],
        ['下層', '層雲', 'きり雲'],
        ['対流', '積雲', 'わた雲'],
        ['対流', '積乱雲', '入道·かみなり雲'],
      ],
    },
    
    cards: [
      { q: '上層雲 (5~13km) は どんな 結晶?', a: '氷の 結晶 (氷晶)' },
      { q: '「巻」 が つく 雲は どこに?', a: 'すべて 上層雲 (巻雲·巻積雲·巻層雲)' },
      { q: '積乱雲の 高さは?', a: '10~16km·対流圏 上端 (圏界面) まで' },
      { q: '雨を 連続的に 降らせる 中層雲は?', a: '乱層雲 (あま雲)' },
      { q: '霧の様な 低い 雲は?', a: '層雲 (きり雲·下層雲)' },
    ],
    
    quiz: [
      { q: '次の うち、上層雲に 属さない のは?',
        opts: ['巻雲', '巻積雲', '巻層雲', '高積雲'],
        ans: 3, exp: '高積雲は 中層雲 (2~7km)。上層雲は すべて「巻」 の 字が つく。' },
      { q: '積乱雲が 達する 高さは?',
        opts: ['約 1km', '約 5km', '約 10~16km', '約 50km'],
        ans: 2, exp: '積乱雲は 10~16km·圏界面まで 達し、横に 広がって「かなとこ雲」 を 形成。雷·豪雨·ひょう·竜巻の 原因。' },
      { q: '連続的な 雨を 降らせる 雲は?',
        opts: ['巻雲', '高積雲', '乱層雲', '層積雲'],
        ans: 2, exp: '乱層雲(あま雲) = 中層雲·雨や 雪を 連続的に 降らせる。一方 積乱雲は 短時間の 強雨。' },
      { q: '上層雲が 氷晶で できている 理由は?',
        opts: ['空気が 乾いている', '上層は 気温が -40°C 以下', '太陽光が 強い', '気圧が 高い'],
        ans: 1, exp: '対流圏 上層は 気温が -40°C以下·水蒸気が 凝結すると 直接 氷晶に。これが 上層雲の 白く すじ状に 見える 理由。' },
      { q: '層雲の 特徴は?',
        opts: ['空高く すじ状', 'うろこ状', '低い 灰色·霧の 様', '巨大に 発達'],
        ans: 2, exp: '層雲(きり雲) = 下層雲·地表付近に 広がる 灰色の 雲·霧と 同じ。視程低下·航空気象で 重要。' },
    ],
    
    tips: [
      '🎯 学科専門で 毎年 1~2問·実技でも 雲識別が 出題',
      '⭐ 「巻」=上層 / 「高·乱」=中層 / 「層·層積」=下層 / 「積·積乱」=対流',
      '💡 積乱雲 (Cb) と 乱層雲 (Ns) を 混同しない·Cb は 短時間強雨·Ns は 連続雨',
      '📝 ハロ (太陽の周りの輪) は 巻層雲·後の 天気悪化の サイン',
    ],
  },

  // ========================================
  // 第3事件: 💨 気圧·風
  // ========================================
  3: {
    title: '💨 気圧·コリオリ力·偏西風',
    subtitle: '大気の 流れの 法則',
    examScope: '学科一般·専門 (両方で 出題)',
    
    concepts: [
      { term: '気圧 (hPa)',
        desc: '大気の 重さによる 圧力·1気圧 = 1013.25 hPa·高度100mで 約 12 hPa 低下。' },
      { term: '高気圧·低気圧',
        desc: '周囲より 気圧が 高い·低い 領域。北半球: 高気圧=時計回りに 吹き出す·低気圧=反時計回りに 吹き込む。' },
      { term: 'コリオリ力',
        desc: '地球自転による 見かけの 力。北半球で 進行方向の 右に 偏向·南半球で 左に 偏向。緯度·速度に 比例·赤道では ゼロ。' },
      { term: '偏西風 (へんせいふう)',
        desc: '中緯度 (30~60度) 上空 5~13km を 西から 東へ 吹く 強風 (100~300km/h)。日本の 天気が 西→東に 変わる 原因。' },
      { term: 'ジェット気流',
        desc: '偏西風の 中で 特に 強い 部分 (200~300km/h)。寒帯ジェット·亜熱帯ジェットの 2種類が 存在。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:#f0f5f8;border-radius:12px;">
        <text x="300" y="20" font-size="14" font-weight="bold" fill="#1a4a5a" text-anchor="middle">高気圧·低気圧と コリオリ力 (北半球)</text>
        
        <!-- 高気圧 -->
        <g transform="translate(150,170)">
          <text x="0" y="-90" font-size="13" font-weight="bold" fill="#c44" text-anchor="middle">高気圧 (H)</text>
          <text x="0" y="-75" font-size="10" fill="#666" text-anchor="middle">中心から 時計回りに 発散</text>
          <!-- 등압선 -->
          <circle cx="0" cy="0" r="20" fill="none" stroke="#c44" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="40" fill="none" stroke="#c44" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="60" fill="none" stroke="#c44" stroke-width="1.5"/>
          <text x="0" y="3" font-size="14" fill="#c44" text-anchor="middle" font-weight="bold">H</text>
          <!-- 시계방향 화살표 (발산) -->
          <path d="M 0,-50 L 10,-45 L 8,-55 Z" fill="#c44"/>
          <path d="M 50,0 L 45,10 L 55,8 Z" fill="#c44"/>
          <path d="M 0,50 L -10,45 L -8,55 Z" fill="#c44"/>
          <path d="M -50,0 L -45,-10 L -55,-8 Z" fill="#c44"/>
          <!-- 회전 호 -->
          <path d="M 0,-50 Q 35,-35 50,0" stroke="#c44" stroke-width="2" fill="none"/>
          <path d="M 50,0 Q 35,35 0,50" stroke="#c44" stroke-width="2" fill="none"/>
          <path d="M 0,50 Q -35,35 -50,0" stroke="#c44" stroke-width="2" fill="none"/>
          <path d="M -50,0 Q -35,-35 0,-50" stroke="#c44" stroke-width="2" fill="none"/>
          <text x="0" y="105" font-size="10" fill="#c44" text-anchor="middle">晴天·乾燥</text>
        </g>
        
        <!-- 低気圧 -->
        <g transform="translate(450,170)">
          <text x="0" y="-90" font-size="13" font-weight="bold" fill="#48c" text-anchor="middle">低気圧 (L)</text>
          <text x="0" y="-75" font-size="10" fill="#666" text-anchor="middle">中心へ 反時計回りに 収束</text>
          <!-- 등압선 -->
          <circle cx="0" cy="0" r="20" fill="none" stroke="#48c" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="40" fill="none" stroke="#48c" stroke-width="1.5"/>
          <circle cx="0" cy="0" r="60" fill="none" stroke="#48c" stroke-width="1.5"/>
          <text x="0" y="3" font-size="14" fill="#48c" text-anchor="middle" font-weight="bold">L</text>
          <!-- 반시계 화살표 (수렴) -->
          <path d="M 0,-50 L -10,-45 L -8,-55 Z" fill="#48c"/>
          <path d="M -50,0 L -45,10 L -55,8 Z" fill="#48c"/>
          <path d="M 0,50 L 10,45 L 8,55 Z" fill="#48c"/>
          <path d="M 50,0 L 45,-10 L 55,-8 Z" fill="#48c"/>
          <!-- 회전 호 -->
          <path d="M 0,-50 Q -35,-35 -50,0" stroke="#48c" stroke-width="2" fill="none"/>
          <path d="M -50,0 Q -35,35 0,50" stroke="#48c" stroke-width="2" fill="none"/>
          <path d="M 0,50 Q 35,35 50,0" stroke="#48c" stroke-width="2" fill="none"/>
          <path d="M 50,0 Q 35,-35 0,-50" stroke="#48c" stroke-width="2" fill="none"/>
          <text x="0" y="105" font-size="10" fill="#48c" text-anchor="middle">曇·雨·上昇気流</text>
        </g>
        
        <!-- 偏西風 표시 -->
        <g transform="translate(0,310)">
          <text x="20" y="-5" font-size="12" font-weight="bold" fill="#1a4a5a">⤳ 偏西風 (中緯度上空·西→東·100~300km/h)</text>
          <line x1="20" y1="10" x2="560" y2="10" stroke="#48c" stroke-width="3" stroke-dasharray="10 3"/>
          <path d="M 560,10 L 545,5 L 545,15 Z" fill="#48c"/>
          <text x="290" y="35" font-size="10" fill="#666" text-anchor="middle">日本の 天気が 西→東に 変わる 原因</text>
          <text x="290" y="48" font-size="10" fill="#666" text-anchor="middle">飛行機の 東行きが 速い 理由</text>
        </g>
      </svg>
    `,
    
    formulas: [
      { f: '1気圧 = 1013.25 hPa', m: '基準気圧·暗記' },
      { f: '高度100m上昇 ≈ 気圧 12 hPa 低下', m: '高度·気圧 関係' },
      { f: '北半球: 高気圧=時計回り発散·低気圧=反時計回り収束', m: 'コリオリ力 結果' },
      { f: '南半球: 高気圧=反時計回り·低気圧=時計回り (逆)', m: '南半球は 反対' },
    ],
    
    table: {
      title: '主な 風と 力',
      headers: ['名前', '原因·特徴'],
      rows: [
        ['気圧傾度力', '気圧の差で 高 → 低へ'],
        ['コリオリ力', '自転·北半球で 進行方向 右偏向'],
        ['地衡風', '上空·気圧傾度力と コリオリ力が 釣合·等圧線に 平行'],
        ['偏西風', '中緯度上空·西→東·100~300km/h'],
        ['貿易風', '熱帯·北東 (北半球)·南東 (南半球)'],
      ],
    },
    
    cards: [
      { q: '1気圧は 何 hPa?', a: '1013.25 hPa' },
      { q: '北半球 低気圧の 風の 流れは?', a: '反時計回り·中心へ 収束' },
      { q: 'コリオリ力·北半球で 進行方向 どちらに 偏向?', a: '右に 偏向' },
      { q: '偏西風が 吹く 緯度·高度は?', a: '中緯度 30~60度·上空 5~13km' },
      { q: '台風が 反時計回りに 回転する 理由は?', a: '北半球の 低気圧·コリオリ力で' },
    ],
    
    quiz: [
      { q: '北半球の 低気圧の 風の 流れ方は?',
        opts: ['時計回りに 発散', '反時計回りに 収束', '直線的に 流れる', '回転しない'],
        ans: 1, exp: '北半球: 高気圧=時計回り·低気圧=反時計回り。コリオリ力 (進行方向の 右へ 偏向) の 結果。台風も 同じ 反時計回り。' },
      { q: '偏西風の 風向と 場所は?',
        opts: ['東→西·赤道', '西→東·中緯度上空', '南→北·極地', '北→南·熱帯'],
        ans: 1, exp: '偏西風 = 中緯度 (30~60度) 上空を 西→東·100~300km/h。日本の 天気が 西から 東に 変わる 原因。' },
      { q: '1気圧は 何 hPa?',
        opts: ['1000', '1013.25', '760', '850'],
        ans: 1, exp: '1気圧 = 1013.25 hPa = 760 mmHg。標準大気圧 (海面)。' },
      { q: 'コリオリ力が ゼロに なる 場所は?',
        opts: ['北極', '赤道', '中緯度', '南極'],
        ans: 1, exp: 'コリオリ力 = 2 × 自転角速度 × sin(緯度)。赤道(緯度0°)で sin=0 ゆえに ゼロ。極で 最大。' },
      { q: '高度100m 上昇すると 気圧は 約?',
        opts: ['1 hPa 上昇', '12 hPa 低下', '100 hPa 低下', '変化なし'],
        ans: 1, exp: '海面付近で 高度100m上昇あたり 約 12 hPa 低下。これを 利用した 高度計 (気圧高度計) が 航空機·登山で 使用される。' },
    ],
    
    tips: [
      '🎯 コリオリ力·偏西風は 学科一般·専門 両方で 頻出',
      '⭐ 1013.25 hPa は 暗記必須·気圧高度計の 基準',
      '💡 北半球 低気圧 = 反時計回り は 台風と 同じ·覚えやすい',
      '📝 ジェット気流 蛇行 → 異常気象の 原因 (温暖化との 関連 出題)',
    ],
  },

  // ========================================
  // 第4事件: 🌀 台風
  // ========================================
  4: {
    title: '🌀 台風·熱帯低気圧',
    subtitle: '日本に 影響する 気象災害',
    examScope: '学科専門·実技 (毎年出題)',
    
    concepts: [
      { term: '台風の 定義',
        desc: '北西太平洋·南シナ海で 発生する 熱帯低気圧で 中心付近の 最大風速が 17.2 m/s 以上の もの (気象庁)。' },
      { term: '熱帯低気圧の 発生条件',
        desc: '海面水温 26~27°C 以上·コリオリ力 (赤道付近では 発生しにくい)·上下層風が 弱い·対流活動 活発。' },
      { term: '台風の 構造',
        desc: '中心の「眼 (アイ)」(直径 数十km·下降気流·晴れ)·眼の壁雲 (アイウォール·最強風雨)·らせん状降雨帯 (スパイラルバンド)。' },
      { term: '中心気圧と 強さ',
        desc: '中心気圧が 低いほど 強い。猛烈な台風 = 54 m/s 以上·概ね 920 hPa以下。1979年 台風20号 (Tip) = 870 hPa·史上最強。' },
      { term: 'ハリケーン·サイクロン',
        desc: '同じ 熱帯低気圧の 別名。大西洋·北東太平洋=ハリケーン (33 m/s以上)·インド洋·南半球=サイクロン。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:#0a2030;border-radius:12px;">
        <text x="300" y="20" font-size="14" font-weight="bold" fill="white" text-anchor="middle">台風の 構造 (上空から 見た図)</text>
        
        <!-- 외곽 나선밴드 -->
        <g transform="translate(300,210)">
          <!-- 가장 바깥 나선 -->
          <path d="M 0,-150 Q 100,-130 130,-50 Q 145,30 80,90 Q -10,130 -80,80 Q -140,20 -110,-60 Q -60,-130 0,-150" 
                fill="none" stroke="rgba(120,180,220,0.5)" stroke-width="6"/>
          <path d="M 0,-120 Q 80,-100 100,-40 Q 110,20 60,70 Q 0,100 -60,60 Q -110,10 -90,-50 Q -50,-110 0,-120"
                fill="none" stroke="rgba(140,200,235,0.7)" stroke-width="8"/>
          <path d="M 0,-90 Q 60,-70 75,-30 Q 80,15 45,50 Q 0,70 -45,40 Q -80,5 -65,-40 Q -35,-85 0,-90"
                fill="none" stroke="rgba(180,220,250,0.85)" stroke-width="10"/>
          
          <!-- 아이 월 (가장 강한 영역) -->
          <circle cx="0" cy="0" r="40" fill="none" stroke="white" stroke-width="3"/>
          <circle cx="0" cy="0" r="38" fill="rgba(220,240,255,0.6)"/>
          
          <!-- 눈 (중심) -->
          <circle cx="0" cy="0" r="20" fill="#0a2030" stroke="white" stroke-width="1"/>
          <text x="0" y="3" font-size="11" fill="white" text-anchor="middle" font-weight="bold">眼</text>
          <text x="0" y="14" font-size="8" fill="white" text-anchor="middle">(晴れ)</text>
          
          <!-- 라벨 -->
          <line x1="-25" y1="-5" x2="-90" y2="-30" stroke="white" stroke-width="0.5"/>
          <text x="-95" y="-30" font-size="10" fill="white" text-anchor="end">眼 (アイ)</text>
          <text x="-95" y="-18" font-size="9" fill="#aac" text-anchor="end">下降気流·無風</text>
          
          <line x1="40" y1="-15" x2="100" y2="-50" stroke="white" stroke-width="0.5"/>
          <text x="105" y="-50" font-size="10" fill="white">眼の壁雲 (アイウォール)</text>
          <text x="105" y="-38" font-size="9" fill="#fcc">最強風雨·上昇気流</text>
          
          <line x1="80" y1="50" x2="135" y2="80" stroke="white" stroke-width="0.5"/>
          <text x="140" y="80" font-size="10" fill="white">スパイラルバンド</text>
          <text x="140" y="92" font-size="9" fill="#aac">らせん状降雨帯</text>
          
          <!-- 회전 방향 (북반구 반시계) -->
          <path d="M 100,-100 Q 130,-130 145,-100" stroke="#fc6" stroke-width="2" fill="none"/>
          <path d="M 145,-100 L 138,-105 L 144,-92 Z" fill="#fc6"/>
          <text x="145" y="-130" font-size="9" fill="#fc6" text-anchor="end">反時計回り (北半球)</text>
        </g>
        
        <!-- 강도 표 -->
        <g transform="translate(15,355)">
          <text x="0" y="0" font-size="10" font-weight="bold" fill="white">強さの 区分:</text>
          <text x="80" y="0" font-size="9" fill="white">強い 33~44 m/s</text>
          <text x="220" y="0" font-size="9" fill="white">非常に強い 44~54</text>
          <text x="370" y="0" font-size="9" fill="#fc6">猛烈な ≧54 m/s</text>
          <text x="490" y="0" font-size="9" fill="#fc6">(≦920hPa)</text>
        </g>
      </svg>
    `,
    
    formulas: [
      { f: '台風の 定義: 中心風速 ≥ 17.2 m/s (北西太平洋)', m: '気象庁基準' },
      { f: '強い: 33~44·非常に強い: 44~54·猛烈な: ≥54 m/s', m: '強さ 区分' },
      { f: '大型: 風速15m/s以上の半径 ≥500km·超大型: ≥800km', m: '大きさ 区分' },
      { f: '海面水温 26~27°C 以上 → 発生·発達', m: '発生条件' },
    ],
    
    table: {
      title: '熱帯低気圧の 地域別呼称',
      headers: ['地域', '呼称', '基準'],
      rows: [
        ['北西太平洋·南シナ海', '台風 (Typhoon)', '17.2 m/s 以上'],
        ['大西洋·北東太平洋', 'ハリケーン (Hurricane)', '33 m/s 以上'],
        ['インド洋·南半球', 'サイクロン (Cyclone)', '17 m/s 以上'],
        ['オーストラリア', 'ウィリーウィリー', '同上'],
      ],
    },
    
    cards: [
      { q: '台風の 中心風速 基準は?', a: '17.2 m/s 以上 (約 34ノット·風力8)' },
      { q: '熱帯低気圧 発生の 海水温は?', a: '26~27°C 以上' },
      { q: '台風の「眼」 内部の 天気は?', a: '下降気流·無風·晴れ' },
      { q: '猛烈な 台風の 風速·中心気圧は?', a: '54 m/s 以上·概ね 920 hPa以下' },
      { q: 'ハリケーンの 基準風速は?', a: '33 m/s 以上 (台風より 厳しい)' },
    ],
    
    quiz: [
      { q: '台風の 定義 (気象庁) で 必要な 最大風速は?',
        opts: ['10 m/s', '17.2 m/s', '25 m/s', '50 m/s'],
        ans: 1, exp: '台風 = 北西太平洋·中心風速 17.2 m/s (34ノット·風力8) 以上の 熱帯低気圧。' },
      { q: '熱帯低気圧が 発達する 海面水温の 目安は?',
        opts: ['10°C', '20°C', '26~27°C 以上', '40°C以上'],
        ans: 2, exp: '海面水温 26~27°C 以上で 海面から 蒸発する 水蒸気が 多くなり 熱帯低気圧が 発達。温暖化で 強い 台風が 増える 主因。' },
      { q: '台風の 眼 (アイ) の 状態は?',
        opts: ['最強の 雨風', '下降気流·無風·晴れ', '雪が 降る', '雷が 多い'],
        ans: 1, exp: '台風の 眼 = 中心の 直径 数十km·下降気流·無風·晴れ。一方 眼の壁雲 (アイウォール) は 最強の 雨風。' },
      { q: '北半球の 台風の 回転方向は?',
        opts: ['時計回り', '反時計回り', '直線', '回転しない'],
        ans: 1, exp: '台風は 北半球の 低気圧 → 反時計回り (コリオリ力)。南半球の サイクロンは 時計回り。' },
      { q: '猛烈な 台風の 中心気圧は 概ね?',
        opts: ['1013 hPa以下', '1000 hPa以下', '920 hPa以下', '850 hPa以下'],
        ans: 2, exp: '猛烈な 台風 = 54 m/s 以上·中心気圧 概ね 920 hPa以下。1979年 台風20号 = 870 hPa·史上最強。' },
    ],
    
    tips: [
      '🎯 学科専門で 必出·実技でも 進路予報·中心気圧の 出題',
      '⭐ 17.2·33·44·54 m/s の 区分は 暗記必須',
      '💡 ハリケーン基準 (33 m/s) は 台風基準 (17.2) より 厳しい',
      '📝 海面水温 26°C は 暖海域指標·温暖化との 関連で 出題増加',
    ],
  },

  // ========================================
  // 第5事件: ⚡ 雷·豪雨
  // ========================================
  5: {
    title: '⚡ 雷·ゲリラ豪雨·線状降水帯',
    subtitle: '激しい 短時間気象',
    examScope: '学科専門·実技 (近年頻出)',
    
    concepts: [
      { term: 'ゲリラ豪雨',
        desc: '俗語·正式名は「局地的大雨」。突発的·局地的·短時間 (1時間 50mm 以上) の 強雨。積乱雲 1個が 原因。' },
      { term: '集中豪雨',
        desc: '同じ地域に 数時間 以上 強雨が 続く 現象。複数の 積乱雲·線状降水帯が 原因·都市型水害·土砂災害の 主因。' },
      { term: '線状降水帯',
        desc: '次々発生する 積乱雲が 線状に 並び·同じ場所に 数時間 強雨が 持続。長さ 50~300km·幅 20~50km。気象庁が 2022年から 予測情報開始。' },
      { term: '雷の 発生',
        desc: '積乱雲内 氷晶と あられの 衝突で 静電気·正負電荷が 分離 → 落雷。1時間に 数千回 落雷も。' },
      { term: 'ダウンバースト',
        desc: '積乱雲から 急激に 下降する 強風。地面に 衝突して 放射状に 拡散·航空機事故の 原因。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:linear-gradient(180deg,#3a4a6a 0%,#2a3a5a 60%,#5a6a4a 100%);border-radius:12px;">
        <text x="300" y="20" font-size="14" font-weight="bold" fill="white" text-anchor="middle">線状降水帯の 形成 メカニズム</text>
        
        <!-- 적란운들 (선형으로 나열) -->
        <g>
          <!-- Cb 1 -->
          <ellipse cx="100" cy="80" rx="45" ry="15" fill="#ddd" opacity="0.9"/>
          <path d="M 70,90 Q 85,40 100,90 Q 115,55 130,90 L 130,200 L 70,200 Z" fill="rgba(80,80,100,0.85)"/>
          <text x="100" y="135" font-size="9" fill="white" text-anchor="middle">Cb1</text>
          
          <!-- Cb 2 -->
          <ellipse cx="220" cy="75" rx="50" ry="17" fill="#ddd" opacity="0.9"/>
          <path d="M 185,90 Q 205,30 220,90 Q 240,40 255,90 L 255,210 L 185,210 Z" fill="rgba(70,70,90,0.85)"/>
          <text x="220" y="140" font-size="9" fill="white" text-anchor="middle">Cb2</text>
          
          <!-- Cb 3 (가장 발달) -->
          <ellipse cx="340" cy="65" rx="55" ry="20" fill="#ddd" opacity="0.95"/>
          <path d="M 295,90 Q 320,15 340,90 Q 365,30 385,90 L 385,220 L 295,220 Z" fill="rgba(60,60,80,0.9)"/>
          <text x="340" y="145" font-size="10" fill="white" text-anchor="middle" font-weight="bold">Cb3</text>
          <!-- 雷 -->
          <path d="M 340,110 L 335,130 L 343,128 L 335,150 L 350,125 L 342,127 L 350,110 Z" fill="#ff8" stroke="#fc4" stroke-width="0.5"/>
          
          <!-- Cb 4 (新発生) -->
          <ellipse cx="455" cy="90" rx="40" ry="12" fill="#ddd" opacity="0.85"/>
          <path d="M 430,100 Q 445,55 455,100 Q 470,65 480,100 L 480,200 L 430,200 Z" fill="rgba(90,90,110,0.8)"/>
          <text x="455" y="145" font-size="9" fill="white" text-anchor="middle">Cb4(新)</text>
          
          <!-- 비 표시 -->
          <g stroke="#4af" stroke-width="1.5">
            <line x1="80" y1="200" x2="75" y2="220"/>
            <line x1="100" y1="200" x2="95" y2="220"/>
            <line x1="120" y1="200" x2="115" y2="220"/>
            <line x1="200" y1="210" x2="195" y2="235"/>
            <line x1="220" y1="210" x2="215" y2="235"/>
            <line x1="240" y1="210" x2="235" y2="235"/>
            <line x1="310" y1="220" x2="305" y2="250"/>
            <line x1="340" y1="220" x2="335" y2="250"/>
            <line x1="370" y1="220" x2="365" y2="250"/>
            <line x1="445" y1="200" x2="440" y2="220"/>
            <line x1="465" y1="200" x2="460" y2="220"/>
          </g>
        </g>
        
        <!-- 暖湿気流 화살표 -->
        <g transform="translate(0,300)">
          <text x="20" y="0" font-size="10" font-weight="bold" fill="#ff8">暖湿気流の 流入</text>
          <line x1="20" y1="15" x2="540" y2="15" stroke="#ff8" stroke-width="3" stroke-dasharray="8 3"/>
          <path d="M 540,15 L 525,10 L 525,20 Z" fill="#ff8"/>
          <text x="280" y="45" font-size="11" fill="white" text-anchor="middle">同じ場所に 次々 積乱雲が 発生 → 線状降水帯</text>
          <text x="280" y="60" font-size="10" fill="#fcc" text-anchor="middle">長さ 50~300km · 幅 20~50km · 数時間持続</text>
        </g>
      </svg>
    `,
    
    formulas: [
      { f: 'ゲリラ豪雨: 1時間 50mm 以上の 局地·短時間強雨', m: '定義' },
      { f: '線状降水帯: 50~300km·幅20~50km·数時間連続', m: '定義' },
      { f: '積乱雲 1個: 寿命 30~60分·範囲 数km', m: '生命周期' },
      { f: '高解像度降水ナウキャスト: 5分ごと·1km格子', m: '気象庁の 予測ツール' },
    ],
    
    table: {
      title: '雨の 強さ (気象庁基準·1時間雨量)',
      headers: ['区分', '雨量', '感じ方·影響'],
      rows: [
        ['弱い雨', '~3 mm', '傘 不要·路面 濡れる程度'],
        ['普通の雨', '3~10 mm', '一般的な雨·傘 必要'],
        ['やや強い雨', '10~20 mm', 'ザーザーと降る·地面 水溜まり'],
        ['強い雨', '20~30 mm', '土砂降り·道路 冠水'],
        ['激しい雨', '30~50 mm', 'バケツを ひっくり返した様·運転 困難'],
        ['非常に激しい雨', '50~80 mm', '滝の様·都市部 内水氾濫'],
        ['猛烈な雨', '80 mm以上', '息苦しい圧迫感·恐怖·重大災害'],
      ],
    },
    
    cards: [
      { q: 'ゲリラ豪雨の 雨量 基準は?', a: '1時間 50mm 以上' },
      { q: '線状降水帯の 長さは?', a: '50~300km' },
      { q: '気象庁の 線状降水帯予測情報は いつから?', a: '2022年~' },
      { q: '雷の 発生原因は?', a: '積乱雲内 氷晶·あられの 衝突で 電荷分離' },
      { q: 'ダウンバーストとは?', a: '積乱雲から 急降下する 強風·航空機事故の 原因' },
    ],
    
    quiz: [
      { q: 'ゲリラ豪雨 (局地的大雨) の 雨量基準は?',
        opts: ['1時間 10mm', '1時間 50mm 以上', '1日 100mm', '基準なし'],
        ans: 1, exp: '気象庁の 局地的大雨 = 1時間 50mm 以上·短時間·局地的。積乱雲 1個が 原因·予測困難。' },
      { q: '線状降水帯の 大きさは?',
        opts: ['10km × 5km', '50~300km × 20~50km', '1000km以上', '世界規模'],
        ans: 1, exp: '線状降水帯 = 長さ 50~300km·幅 20~50km。次々発生する 積乱雲が 線状に 並び·同じ場所に 数時間 持続。' },
      { q: '積乱雲 1個の 寿命は?',
        opts: ['1分', '30~60分', '1日', '1週間'],
        ans: 1, exp: '単独の 積乱雲は 30~60分の 寿命 (発達·成熟·衰退)。これが 連続発生すると 集中豪雨·線状降水帯に。' },
      { q: '雷の 発生原因は?',
        opts: ['太陽光の 反射', '積乱雲内 氷晶·あられの 衝突で 電荷分離', '海水温の 上昇', '気圧変化'],
        ans: 1, exp: '積乱雲内で 上昇気流に より 氷晶 (軽·上)·あられ (重·下) が 衝突 → 電荷分離 → 落雷。気温 -10~-20°C 帯で 活発。' },
      { q: '気象庁が 線状降水帯予測情報を 開始した 年は?',
        opts: ['2010年', '2015年', '2022年', 'まだ なし'],
        ans: 2, exp: '2022年6月から 半日前の 予測情報 開始·2024年 5kmメッシュ高解像度に。近年 大災害の 頻発を 受けた 対策。' },
    ],
    
    tips: [
      '🎯 近年 大災害頻発で 出題率 上昇 (学科専門·実技)',
      '⭐ 1時間 50mm = ゲリラ豪雨基準·暗記必須',
      '💡 線状降水帯 50~300km·数時間連続·これが キーワード',
      '📝 高解像度降水ナウキャストは 5分·1km格子·短時間予測の 主力',
    ],
  },

  // ========================================
  // 第6事件: ❄ 冬型気圧
  // ========================================
  6: {
    title: '❄ 冬型気圧·西高東低',
    subtitle: '日本海効果·豪雪',
    examScope: '学科専門 (毎年出題)',
    
    concepts: [
      { term: '西高東低 (せいこうとうてい)',
        desc: '冬の 典型気圧配置。西側 (シベリア) に 高気圧·東側 (アリューシャン) に 低気圧。等圧線が 縦縞。北西の 季節風。' },
      { term: 'シベリア高気圧',
        desc: 'シベリア大陸の 寒冷·乾燥した 空気塊。1050 hPa超え も。世界最強の 寒冷高気圧。' },
      { term: '日本海効果',
        desc: 'シベリア寒気が 暖かい 日本海 (10°C前後) で 水蒸気·熱を 吸収 → 対流発達 → 筋状雲 → 山にぶつかり 大雪。' },
      { term: 'JPCZ',
        desc: '日本海寒帯気団収束帯 (Japan sea Polar air mass Convergence Zone)。記録的豪雪の 主犯·北陸·新潟·秋田中心。' },
      { term: '冬の 太平洋側',
        desc: '日本海側で 雪を 降らせた 後の 乾燥空気が 山を 越えて 太平洋側へ → 「からっ風」·乾燥晴天。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:linear-gradient(180deg,#dde8f0 0%,#e0e8e8 100%);border-radius:12px;">
        <text x="300" y="20" font-size="14" font-weight="bold" fill="#1a4a5a" text-anchor="middle">西高東低 と 日本海効果</text>
        
        <!-- 西高東低 등압선 (왼쪽에 H, 오른쪽 L) -->
        <g transform="translate(0,40)">
          <!-- 시베리아 高 -->
          <text x="60" y="20" font-size="20" font-weight="bold" fill="#c44" text-anchor="middle">H</text>
          <text x="60" y="35" font-size="9" fill="#c44" text-anchor="middle">シベリア</text>
          <text x="60" y="48" font-size="9" fill="#c44" text-anchor="middle">高気圧</text>
          <text x="60" y="61" font-size="9" fill="#c44" text-anchor="middle">1050hPa超</text>
          
          <!-- 등압선 (세로 줄무늬) -->
          <line x1="100" y1="0" x2="100" y2="280" stroke="#666" stroke-width="1.2"/>
          <line x1="170" y1="0" x2="170" y2="280" stroke="#666" stroke-width="1.2"/>
          <line x1="240" y1="0" x2="240" y2="280" stroke="#666" stroke-width="1.2"/>
          <line x1="310" y1="0" x2="310" y2="280" stroke="#666" stroke-width="1.2"/>
          <line x1="380" y1="0" x2="380" y2="280" stroke="#666" stroke-width="1.2"/>
          <line x1="450" y1="0" x2="450" y2="280" stroke="#666" stroke-width="1.2"/>
          
          <!-- アリューシャン 低 -->
          <text x="540" y="20" font-size="20" font-weight="bold" fill="#48c" text-anchor="middle">L</text>
          <text x="540" y="35" font-size="9" fill="#48c" text-anchor="middle">アリュー</text>
          <text x="540" y="48" font-size="9" fill="#48c" text-anchor="middle">シャン</text>
          <text x="540" y="61" font-size="9" fill="#48c" text-anchor="middle">低気圧</text>
          
          <!-- 北西季節風 화살표 -->
          <g transform="translate(170,90)">
            <text x="0" y="0" font-size="11" fill="#1a4a5a" font-weight="bold">→ 北西の 季節風</text>
            <line x1="-30" y1="15" x2="120" y2="15" stroke="#48c" stroke-width="2.5"/>
            <path d="M 120,15 L 110,10 L 110,20 Z" fill="#48c"/>
          </g>
          
          <!-- 일본해와 일본 -->
          <g transform="translate(0,140)">
            <!-- 日本海 -->
            <rect x="200" y="0" width="100" height="60" fill="#48c" opacity="0.4"/>
            <text x="250" y="35" font-size="10" fill="#1a4a5a" text-anchor="middle">日本海</text>
            <text x="250" y="48" font-size="9" fill="#1a4a5a" text-anchor="middle">10°C前後</text>
            
            <!-- 일본열도 (북쪽 높은 산맥과 함께) -->
            <polygon points="300,60 320,15 340,40 360,5 380,30 400,55 420,60" 
                     fill="#5a8" stroke="#3a6" stroke-width="2"/>
            <text x="335" y="80" font-size="9" fill="#1a4a5a">山地</text>
            <rect x="300" y="60" width="180" height="35" fill="#7c8"/>
            
            <!-- 筋狀雲 (일본해 위) -->
            <g fill="#fff" opacity="0.85">
              <ellipse cx="210" cy="-15" rx="6" ry="3"/>
              <ellipse cx="220" cy="-13" rx="6" ry="3"/>
              <ellipse cx="232" cy="-15" rx="6" ry="3"/>
              <ellipse cx="245" cy="-13" rx="6" ry="3"/>
              <ellipse cx="260" cy="-15" rx="6" ry="3"/>
              <ellipse cx="275" cy="-13" rx="6" ry="3"/>
              <ellipse cx="288" cy="-15" rx="6" ry="3"/>
            </g>
            <text x="250" y="-28" font-size="9" fill="#fff" text-anchor="middle" stroke="#48c" stroke-width="0.3">筋状雲 (JPCZ)</text>
            
            <!-- 雪 (일본해측) -->
            <g fill="white">
              <text x="305" y="55" font-size="8">❄</text>
              <text x="315" y="50" font-size="8">❄</text>
              <text x="325" y="58" font-size="8">❄</text>
            </g>
            <text x="320" y="115" font-size="9" fill="#1a4a5a" text-anchor="middle" font-weight="bold">日本海側·大雪</text>
            
            <!-- 태평양측 - 건조 -->
            <text x="430" y="115" font-size="9" fill="#c44" text-anchor="middle" font-weight="bold">太平洋側·乾燥晴天</text>
            <text x="430" y="50" font-size="14" fill="#fc6">☀</text>
            
            <!-- 太平洋 -->
            <rect x="450" y="60" width="100" height="35" fill="#48c" opacity="0.5"/>
            <text x="500" y="80" font-size="10" fill="white" text-anchor="middle">太平洋</text>
          </g>
        </g>
      </svg>
    `,
    
    formulas: [
      { f: '冬型 = 西側 高気圧 (1050 hPa超) + 東側 低気圧', m: '西高東低' },
      { f: '日本海効果 = 寒気 + 暖海 (10°C) + 山地 → 大雪', m: '3要素' },
      { f: 'JPCZ = 日本海寒帯気団収束帯·豪雪の 主犯', m: '記録的豪雪' },
      { f: 'からっ風 = 山越え 後の 乾燥風 (太平洋側)', m: 'フェーン現象の 一種' },
    ],
    
    table: {
      title: '冬の 日本 (太平洋側 vs 日本海側)',
      headers: ['地域', '気候', '原因'],
      rows: [
        ['日本海側', '大雪·曇·湿度高', '日本海効果·JPCZ'],
        ['太平洋側', '乾燥·晴天·空っ風', '山越えで 乾燥した 空気'],
        ['北陸·新潟', '世界有数の豪雪', 'JPCZの 主たる 影響地'],
        ['北海道', '低温·乾雪·-30°C', '寒気の 直接流入'],
      ],
    },
    
    cards: [
      { q: '冬の 典型気圧配置を 何という?', a: '西高東低' },
      { q: 'シベリア高気圧の 中心気圧は?', a: '1050 hPa を 超えることも' },
      { q: '日本海の 冬の 水温は?', a: '約 10°C 前後 (対馬暖流の 影響)' },
      { q: 'JPCZとは?', a: '日本海寒帯気団収束帯·豪雪の 主犯' },
      { q: '冬の 太平洋側が 乾燥する 理由は?', a: '日本海側で 雪を 降らせた 後の 乾燥空気が 山を 越えて' },
    ],
    
    quiz: [
      { q: '冬の 典型的な 気圧配置は?',
        opts: ['東高西低', '西高東低', '南高北低', '一様気圧'],
        ans: 1, exp: '西高東低 = 西側シベリア高気圧 + 東側アリューシャン低気圧。等圧線が 縦縞·北西の 季節風が 吹く。' },
      { q: '日本海効果で 大雪に なる 地域は?',
        opts: ['太平洋側', '日本海側 (新潟·北陸)', '九州南部', '沖縄'],
        ans: 1, exp: 'シベリアからの 寒気が 日本海 (10°C前後) で 水蒸気を 吸収 → 山にぶつかり 日本海側に 大雪。太平洋側は 乾燥晴天。' },
      { q: 'JPCZ の 正式名は?',
        opts: ['日本海寒帯気団収束帯', '日本海高気圧', '日本海前線', '日本海台風'],
        ans: 0, exp: 'JPCZ (Japan sea Polar air mass Convergence Zone) = 日本海寒帯気団収束帯·北陸·新潟の 記録的豪雪の 主犯。' },
      { q: '冬の 太平洋側が 乾燥晴天に なる 理由は?',
        opts: ['雨が 多い', '山越えで 水分を 失った 乾燥空気が 流入', '海水温が 高い', '湿度が 100%'],
        ans: 1, exp: '日本海側で 雪を 降らせて 水分を 失った 乾燥空気が 山を 越えて 太平洋側に 流入。「空っ風」 と 呼ばれる。' },
      { q: 'シベリア高気圧の 性質は?',
        opts: ['暖かく 湿った 空気', '寒冷·乾燥·1050 hPa超え', '熱帯起源', '海洋性'],
        ans: 1, exp: 'シベリア大陸 上で 形成される 寒冷·乾燥な 高気圧。冬季 1050 hPa を 超え 世界最強。' },
    ],
    
    tips: [
      '🎯 日本独特の 季節気象·学科専門で 必出',
      '⭐ 西高東低·縦縞等圧線·北西季節風 は セット で 暗記',
      '💡 日本海効果は「寒気+暖海+山地」 の 3要素が 必要',
      '📝 太平洋側 乾燥·日本海側 大雪 の 対比が 出題ポイント',
    ],
  },

  // ========================================
  // 第7事件: 🌸 梅雨·秋雨
  // ========================================
  7: {
    title: '🌸 梅雨·秋雨·停滞前線',
    subtitle: '日本の 季節雨',
    examScope: '学科専門·実技 (毎年出題)',
    
    concepts: [
      { term: '梅雨前線',
        desc: '6~7月の 停滞前線。北のオホーツク海高気圧 (寒湿) と 南の 太平洋高気圧 (暖湿) の 境界。東西に 伸び 数週間 停滞。' },
      { term: '秋雨前線',
        desc: '8月末~10月の 停滞前線。夏の太平洋高気圧が 弱まり 寒気が 南下。梅雨と 逆方向に 移動。台風と 重なれば 大雨。' },
      { term: 'オホーツク海高気圧',
        desc: 'オホーツク海上で 形成される 寒冷·湿潤な 高気圧。「やませ」 (北東風·冷害) を もたらす。' },
      { term: '太平洋高気圧 (小笠原気団)',
        desc: '夏の 主役·暖かく 湿った 高気圧。日本の 蒸し暑さの 原因。' },
      { term: '停滞前線の 種類',
        desc: '寒気·暖気の 力が 拮抗し 動かない 前線。日本独特ではなく 世界中に 存在·特に アジアモンスーン地帯で 発達。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 360" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:#e8eef0;border-radius:12px;">
        <text x="300" y="20" font-size="14" font-weight="bold" fill="#1a4a5a" text-anchor="middle">梅雨前線の 構造 (停滞前線)</text>
        
        <!-- 일본열도 -->
        <g transform="translate(50,180)">
          <!-- 일본 (간략) -->
          <path d="M 50,0 Q 100,-20 150,0 Q 250,5 350,15 Q 420,25 480,30" 
                fill="none" stroke="#5a8" stroke-width="20" opacity="0.5"/>
          <text x="100" y="50" font-size="9" fill="#1a4a5a" text-anchor="middle">九州</text>
          <text x="250" y="55" font-size="9" fill="#1a4a5a" text-anchor="middle">本州</text>
          <text x="430" y="55" font-size="9" fill="#1a4a5a" text-anchor="middle">北海道</text>
        </g>
        
        <!-- 北 オホーツク海高気圧 -->
        <g transform="translate(150,80)">
          <text x="0" y="0" font-size="14" font-weight="bold" fill="#c44" text-anchor="middle">H オホーツク海</text>
          <text x="0" y="14" font-size="10" fill="#c44" text-anchor="middle">寒·湿</text>
          <!-- 寒気 화살표 (남쪽으로) -->
          <line x1="0" y1="22" x2="0" y2="60" stroke="#48c" stroke-width="2"/>
          <path d="M 0,60 L -5,52 L 5,52 Z" fill="#48c"/>
          <text x="-10" y="50" font-size="9" fill="#48c" text-anchor="end">寒気</text>
        </g>
        
        <!-- 南 太平洋高気圧 -->
        <g transform="translate(450,260)">
          <text x="0" y="0" font-size="14" font-weight="bold" fill="#c84" text-anchor="middle">H 太平洋</text>
          <text x="0" y="14" font-size="10" fill="#c84" text-anchor="middle">暖·湿 (小笠原気団)</text>
          <!-- 暖気 화살표 (북쪽으로) -->
          <line x1="0" y1="-20" x2="0" y2="-65" stroke="#c84" stroke-width="2"/>
          <path d="M 0,-65 L -5,-57 L 5,-57 Z" fill="#c84"/>
          <text x="10" y="-58" font-size="9" fill="#c84">暖気</text>
        </g>
        
        <!-- 梅雨前線 (정체전선) -->
        <g transform="translate(80,180)">
          <!-- 정체전선 - 빨간 반원과 파란 삼각형 교대 -->
          <line x1="0" y1="0" x2="450" y2="0" stroke="#1a4a5a" stroke-width="2"/>
          <!-- 위쪽 반원 (적색·暖) -->
          <path d="M 0,-2 A 8,8 0 0 1 16,-2" fill="#c44" stroke="#c44"/>
          <path d="M 30,-2 A 8,8 0 0 1 46,-2" fill="#c44" stroke="#c44"/>
          <path d="M 60,-2 A 8,8 0 0 1 76,-2" fill="#c44" stroke="#c44"/>
          <path d="M 90,-2 A 8,8 0 0 1 106,-2" fill="#c44" stroke="#c44"/>
          <path d="M 120,-2 A 8,8 0 0 1 136,-2" fill="#c44" stroke="#c44"/>
          <path d="M 150,-2 A 8,8 0 0 1 166,-2" fill="#c44" stroke="#c44"/>
          <path d="M 180,-2 A 8,8 0 0 1 196,-2" fill="#c44" stroke="#c44"/>
          <path d="M 210,-2 A 8,8 0 0 1 226,-2" fill="#c44" stroke="#c44"/>
          <path d="M 240,-2 A 8,8 0 0 1 256,-2" fill="#c44" stroke="#c44"/>
          <path d="M 270,-2 A 8,8 0 0 1 286,-2" fill="#c44" stroke="#c44"/>
          <path d="M 300,-2 A 8,8 0 0 1 316,-2" fill="#c44" stroke="#c44"/>
          <path d="M 330,-2 A 8,8 0 0 1 346,-2" fill="#c44" stroke="#c44"/>
          <path d="M 360,-2 A 8,8 0 0 1 376,-2" fill="#c44" stroke="#c44"/>
          <path d="M 390,-2 A 8,8 0 0 1 406,-2" fill="#c44" stroke="#c44"/>
          <path d="M 420,-2 A 8,8 0 0 1 436,-2" fill="#c44" stroke="#c44"/>
          <!-- 아래쪽 삼각형 (청색·寒) -->
          <polygon points="15,2 23,10 7,10" fill="#48c"/>
          <polygon points="45,2 53,10 37,10" fill="#48c"/>
          <polygon points="75,2 83,10 67,10" fill="#48c"/>
          <polygon points="105,2 113,10 97,10" fill="#48c"/>
          <polygon points="135,2 143,10 127,10" fill="#48c"/>
          <polygon points="165,2 173,10 157,10" fill="#48c"/>
          <polygon points="195,2 203,10 187,10" fill="#48c"/>
          <polygon points="225,2 233,10 217,10" fill="#48c"/>
          <polygon points="255,2 263,10 247,10" fill="#48c"/>
          <polygon points="285,2 293,10 277,10" fill="#48c"/>
          <polygon points="315,2 323,10 307,10" fill="#48c"/>
          <polygon points="345,2 353,10 337,10" fill="#48c"/>
          <polygon points="375,2 383,10 367,10" fill="#48c"/>
          <polygon points="405,2 413,10 397,10" fill="#48c"/>
          <polygon points="435,2 443,10 427,10" fill="#48c"/>
          <text x="225" y="-15" font-size="11" font-weight="bold" fill="#1a4a5a" text-anchor="middle">梅雨前線 (停滞前線)</text>
          <text x="225" y="28" font-size="9" fill="#666" text-anchor="middle">数週間 停滞·連続的な 雨</text>
        </g>
        
        <!-- 期間 정보 -->
        <g transform="translate(20,310)">
          <text x="0" y="0" font-size="10" font-weight="bold" fill="#1a4a5a">梅雨: 6月上旬 (沖縄·九州) → 7月中旬 (東北)</text>
          <text x="0" y="15" font-size="10" font-weight="bold" fill="#1a4a5a">秋雨: 8月末 (東北·北海道) → 10月 (西日本)</text>
          <text x="0" y="32" font-size="9" fill="#c44">⚠ 近年は 線状降水帯·大雨災害の 主舞台に</text>
        </g>
      </svg>
    `,
    
    formulas: [
      { f: '梅雨前線 = オホーツク海高気圧 + 太平洋高気圧 の 境界', m: '6~7月' },
      { f: '秋雨前線 = 寒気南下·夏の高気圧 弱化', m: '8月末~10月' },
      { f: '梅雨は 南→北·秋雨は 北→南 (逆方向)', m: '季節進行' },
      { f: '前線+台風 → 大雨災害', m: '秋雨期の 危険' },
    ],
    
    table: {
      title: '梅雨と 秋雨の 比較',
      headers: ['項目', '梅雨', '秋雨'],
      rows: [
        ['期間', '6~7月', '8月末~10月'],
        ['原因', 'オホーツク海高気圧 vs 太平洋高気圧', '太平洋高気圧 弱化·寒気南下'],
        ['移動方向', '南→北 (沖縄→東北)', '北→南 (東北→西日本)'],
        ['災害', '集中豪雨·線状降水帯', '台風と重なり 大水害 (例:2019年台風19号)'],
      ],
    },
    
    cards: [
      { q: '梅雨前線の 種類は?', a: '停滞前線' },
      { q: '梅雨前線を 形成する 2つの 高気圧は?', a: 'オホーツク海高気圧 + 太平洋高気圧' },
      { q: '秋雨前線の 期間は?', a: '8月末~10月' },
      { q: '梅雨と 秋雨の 移動方向は?', a: '梅雨=南→北·秋雨=北→南 (逆)' },
      { q: '小笠原気団の 性質は?', a: '暖·湿 (太平洋高気圧)' },
    ],
    
    quiz: [
      { q: '梅雨前線の 種類は?',
        opts: ['寒冷前線', '温暖前線', '停滞前線', '閉塞前線'],
        ans: 2, exp: '梅雨前線·秋雨前線 ともに 停滞前線。寒気と 暖気の 力が 拮抗 → 動かず 数週間 停滞。' },
      { q: '梅雨前線を 形成する 2つの 高気圧は?',
        opts: ['シベリア + 太平洋', 'オホーツク海 + 太平洋', '北極 + 赤道', 'アジア + 北米'],
        ans: 1, exp: '北のオホーツク海高気圧 (寒湿) と 南の太平洋高気圧 (暖湿·小笠原気団) が 拮抗·境界に 梅雨前線 形成。' },
      { q: '秋雨前線の 期間は?',
        opts: ['6~7月', '8月末~10月', '12~2月', '通年'],
        ans: 1, exp: '秋雨前線 = 8月末~10月。夏の 太平洋高気圧が 弱まり 寒気南下·梅雨と 逆方向に 移動。' },
      { q: '台風と 秋雨前線が 重なると 何が 起きるか?',
        opts: ['天気 良くなる', '大雨·大水害·土砂災害', '雪が 降る', '無風'],
        ans: 1, exp: '台風が 秋雨前線を 刺激 → 線状降水帯·大雨。例: 2019年 台風19号 (東日本台風)·関東·東北で 大水害。' },
      { q: '小笠原気団 (太平洋高気圧) の 性質は?',
        opts: ['寒冷·乾燥', '暖·湿', '冷·湿', '寒·乾'],
        ans: 1, exp: '小笠原気団 = 太平洋上の 暖·湿気団·夏の 主役·日本の 蒸し暑さの 原因。梅雨明けで 強まる·秋雨で 弱まる。' },
    ],
    
    tips: [
      '🎯 日本独特の 気象·学科専門で 必出·実技でも 天気図解析',
      '⭐ 停滞前線·オホーツク海 vs 太平洋 セットで 暗記',
      '💡 梅雨は 南→北·秋雨は 北→南 (逆方向) が ポイント',
      '📝 近年は 線状降水帯と 関連付けた 出題が 多い',
    ],
  },

  // ========================================
  // 第8事件: 📡 数値予報
  // ========================================
  8: {
    title: '📡 数値予報·GSM·MSM·LFM',
    subtitle: '気象予報の 中核技術',
    examScope: '学科専門 (中核·必出)',
    
    concepts: [
      { term: '数値予報',
        desc: '物理法則 (運動方程式·熱力学·流体力学) を 元に コンピュータで 大気の 未来を 計算する 手法。1950年代から 実用化。' },
      { term: 'GSM (全球モデル)',
        desc: 'Global Spectral Model·全世界·約 13km格子·1日4回·予報期間 11日 (264時間) 先まで。中長期予報の 基盤。' },
      { term: 'MSM (メソスケールモデル)',
        desc: 'MesoScale Model·日本周辺·約 5km格子·1日8回·39時間先まで。台風·豪雨予報の 主力。' },
      { term: 'LFM (局地モデル)',
        desc: 'Local Forecast Model·日本付近·約 2km格子·1日24回·10時間先まで。短時間·局地予報·ナウキャスト用。' },
      { term: 'アンサンブル予報',
        desc: '初期値·モデルを 少し 変えて 複数回 (例: 50メンバー) 計算·結果の 散らばりで 予報の 信頼度·不確実性を 表す。スパゲッティダイアグラム。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:#0a1428;border-radius:12px;">
        <text x="300" y="22" font-size="14" font-weight="bold" fill="white" text-anchor="middle">数値予報モデル 比較</text>
        
        <!-- GSM (全球) -->
        <g transform="translate(50,50)">
          <text x="80" y="0" font-size="12" font-weight="bold" fill="#4af" text-anchor="middle">GSM (全球)</text>
          <circle cx="80" cy="60" r="50" fill="none" stroke="#4af" stroke-width="2"/>
          <!-- 위경도 격자 (간략) -->
          <line x1="40" y1="60" x2="120" y2="60" stroke="#4af" stroke-width="0.5"/>
          <line x1="50" y1="30" x2="110" y2="30" stroke="#4af" stroke-width="0.5"/>
          <line x1="50" y1="90" x2="110" y2="90" stroke="#4af" stroke-width="0.5"/>
          <line x1="80" y1="20" x2="80" y2="100" stroke="#4af" stroke-width="0.5"/>
          <line x1="60" y1="25" x2="60" y2="95" stroke="#4af" stroke-width="0.5"/>
          <line x1="100" y1="25" x2="100" y2="95" stroke="#4af" stroke-width="0.5"/>
          <text x="80" y="135" font-size="9" fill="white" text-anchor="middle">約 13km 格子</text>
          <text x="80" y="148" font-size="9" fill="white" text-anchor="middle">11日先まで</text>
          <text x="80" y="161" font-size="9" fill="#aac" text-anchor="middle">中長期·全球</text>
        </g>
        
        <!-- MSM (메소) -->
        <g transform="translate(220,50)">
          <text x="80" y="0" font-size="12" font-weight="bold" fill="#4f8" text-anchor="middle">MSM (メソ)</text>
          <rect x="40" y="20" width="80" height="80" fill="none" stroke="#4f8" stroke-width="2"/>
          <!-- 더 조밀한 격자 -->
          <line x1="50" y1="20" x2="50" y2="100" stroke="#4f8" stroke-width="0.5"/>
          <line x1="60" y1="20" x2="60" y2="100" stroke="#4f8" stroke-width="0.5"/>
          <line x1="70" y1="20" x2="70" y2="100" stroke="#4f8" stroke-width="0.5"/>
          <line x1="80" y1="20" x2="80" y2="100" stroke="#4f8" stroke-width="0.5"/>
          <line x1="90" y1="20" x2="90" y2="100" stroke="#4f8" stroke-width="0.5"/>
          <line x1="100" y1="20" x2="100" y2="100" stroke="#4f8" stroke-width="0.5"/>
          <line x1="110" y1="20" x2="110" y2="100" stroke="#4f8" stroke-width="0.5"/>
          <line x1="40" y1="30" x2="120" y2="30" stroke="#4f8" stroke-width="0.5"/>
          <line x1="40" y1="40" x2="120" y2="40" stroke="#4f8" stroke-width="0.5"/>
          <line x1="40" y1="50" x2="120" y2="50" stroke="#4f8" stroke-width="0.5"/>
          <line x1="40" y1="60" x2="120" y2="60" stroke="#4f8" stroke-width="0.5"/>
          <line x1="40" y1="70" x2="120" y2="70" stroke="#4f8" stroke-width="0.5"/>
          <line x1="40" y1="80" x2="120" y2="80" stroke="#4f8" stroke-width="0.5"/>
          <line x1="40" y1="90" x2="120" y2="90" stroke="#4f8" stroke-width="0.5"/>
          <text x="80" y="135" font-size="9" fill="white" text-anchor="middle">約 5km 格子</text>
          <text x="80" y="148" font-size="9" fill="white" text-anchor="middle">39時間先まで</text>
          <text x="80" y="161" font-size="9" fill="#aac" text-anchor="middle">日本周辺·中期</text>
        </g>
        
        <!-- LFM (局地) -->
        <g transform="translate(390,50)">
          <text x="80" y="0" font-size="12" font-weight="bold" fill="#fc4" text-anchor="middle">LFM (局地)</text>
          <rect x="40" y="20" width="80" height="80" fill="none" stroke="#fc4" stroke-width="2"/>
          <!-- 매우 조밀한 격자 -->
          <g stroke="#fc4" stroke-width="0.3">
            <line x1="45" y1="20" x2="45" y2="100"/>
            <line x1="50" y1="20" x2="50" y2="100"/>
            <line x1="55" y1="20" x2="55" y2="100"/>
            <line x1="60" y1="20" x2="60" y2="100"/>
            <line x1="65" y1="20" x2="65" y2="100"/>
            <line x1="70" y1="20" x2="70" y2="100"/>
            <line x1="75" y1="20" x2="75" y2="100"/>
            <line x1="80" y1="20" x2="80" y2="100"/>
            <line x1="85" y1="20" x2="85" y2="100"/>
            <line x1="90" y1="20" x2="90" y2="100"/>
            <line x1="95" y1="20" x2="95" y2="100"/>
            <line x1="100" y1="20" x2="100" y2="100"/>
            <line x1="105" y1="20" x2="105" y2="100"/>
            <line x1="110" y1="20" x2="110" y2="100"/>
            <line x1="115" y1="20" x2="115" y2="100"/>
            <line x1="40" y1="25" x2="120" y2="25"/>
            <line x1="40" y1="30" x2="120" y2="30"/>
            <line x1="40" y1="35" x2="120" y2="35"/>
            <line x1="40" y1="40" x2="120" y2="40"/>
            <line x1="40" y1="45" x2="120" y2="45"/>
            <line x1="40" y1="50" x2="120" y2="50"/>
            <line x1="40" y1="55" x2="120" y2="55"/>
            <line x1="40" y1="60" x2="120" y2="60"/>
            <line x1="40" y1="65" x2="120" y2="65"/>
            <line x1="40" y1="70" x2="120" y2="70"/>
            <line x1="40" y1="75" x2="120" y2="75"/>
            <line x1="40" y1="80" x2="120" y2="80"/>
            <line x1="40" y1="85" x2="120" y2="85"/>
            <line x1="40" y1="90" x2="120" y2="90"/>
            <line x1="40" y1="95" x2="120" y2="95"/>
          </g>
          <text x="80" y="135" font-size="9" fill="white" text-anchor="middle">約 2km 格子</text>
          <text x="80" y="148" font-size="9" fill="white" text-anchor="middle">10時間先まで</text>
          <text x="80" y="161" font-size="9" fill="#aac" text-anchor="middle">局地·短時間</text>
        </g>
        
        <!-- 앙상블 예보 (스파게티) -->
        <g transform="translate(50,235)">
          <text x="0" y="0" font-size="12" font-weight="bold" fill="#fc8">アンサンブル予報 (50メンバー)</text>
          <line x1="0" y1="100" x2="500" y2="100" stroke="#aaa" stroke-width="1"/>
          <line x1="0" y1="20" x2="0" y2="100" stroke="#aaa" stroke-width="1"/>
          <text x="-5" y="100" font-size="8" fill="white" text-anchor="end">low</text>
          <text x="-5" y="25" font-size="8" fill="white" text-anchor="end">high</text>
          <text x="0" y="115" font-size="8" fill="white">今日</text>
          <text x="500" y="115" font-size="8" fill="white" text-anchor="end">11日後</text>
          
          <!-- 스파게티 라인들 (50개 시뮬레이션, 시간 갈수록 발산) -->
          <g stroke="#fc8" stroke-width="0.7" fill="none" opacity="0.6">
            <path d="M 0,60 Q 100,55 200,50 Q 300,40 400,30 Q 450,25 500,30"/>
            <path d="M 0,60 Q 100,58 200,55 Q 300,55 400,55 Q 450,55 500,55"/>
            <path d="M 0,60 Q 100,62 200,65 Q 300,70 400,80 Q 450,85 500,80"/>
            <path d="M 0,60 Q 100,55 200,48 Q 300,45 400,50 Q 450,60 500,65"/>
            <path d="M 0,60 Q 100,65 200,68 Q 300,75 400,75 Q 450,70 500,72"/>
            <path d="M 0,60 Q 100,57 200,53 Q 300,52 400,40 Q 450,30 500,40"/>
            <path d="M 0,60 Q 100,63 200,70 Q 300,80 400,85 Q 450,90 500,90"/>
            <path d="M 0,60 Q 100,58 200,56 Q 300,48 400,45 Q 450,42 500,45"/>
            <path d="M 0,60 Q 100,60 200,62 Q 300,65 400,68 Q 450,67 500,68"/>
            <path d="M 0,60 Q 100,52 200,45 Q 300,38 400,35 Q 450,33 500,38"/>
            <path d="M 0,60 Q 100,64 200,67 Q 300,72 400,78 Q 450,82 500,85"/>
            <path d="M 0,60 Q 100,56 200,52 Q 300,50 400,55 Q 450,58 500,60"/>
          </g>
          
          <text x="250" y="135" font-size="9" fill="white" text-anchor="middle">線が 揃う = 信頼度高 / バラける = 不確実性高</text>
        </g>
      </svg>
    `,
    
    formulas: [
      { f: 'GSM = 13km × 11日先 × 全球', m: '中長期·全世界' },
      { f: 'MSM = 5km × 39時間先 × 日本周辺', m: '中期·主力' },
      { f: 'LFM = 2km × 10時間先 × 局地', m: '短時間·高解像度' },
      { f: 'アンサンブル = 50メンバー × 不確実性表現', m: '信頼度評価' },
    ],
    
    table: {
      title: '気象庁 数値予報モデル 比較',
      headers: ['モデル', '範囲', '解像度', '予報期間'],
      rows: [
        ['GSM', '全球', '約 13km', '11日先 (264h)'],
        ['MSM', '日本周辺', '約 5km', '39時間先'],
        ['LFM', '日本付近', '約 2km', '10時間先'],
        ['ナウキャスト', '日本', '1km', '1時間先'],
        ['GEPS (アンサンブル)', '全球', '約 27km', '11日·27メンバー'],
      ],
    },
    
    cards: [
      { q: 'GSM の 解像度·予報期間は?', a: '約 13km格子·11日先まで' },
      { q: 'MSM の 解像度·予報期間は?', a: '約 5km格子·39時間先まで' },
      { q: 'LFM の 用途は?', a: '局地·短時間予報·ナウキャスト用 (10時間先)' },
      { q: 'アンサンブル予報の 仕組みは?', a: '初期値を 少し変え 複数回計算·散らばりで 不確実性表現' },
      { q: '気象庁の スーパーコンピュータは?', a: '富岳·世界トップクラス' },
    ],
    
    quiz: [
      { q: 'GSM (全球モデル) の 予報期間は?',
        opts: ['1時間', '24時間', '11日 (264時間)', '1ヶ月'],
        ans: 2, exp: 'GSM = 全球·約13km格子·11日 (264時間) 先まで。中長期予報の 基盤·1日4回 (00·06·12·18 UTC) 実行。' },
      { q: 'MSM の 解像度は?',
        opts: ['約 1km', '約 5km', '約 13km', '約 50km'],
        ans: 1, exp: 'MSM (メソスケールモデル) = 日本周辺·約 5km格子·39時間先まで。台風·豪雨予報の 主力。' },
      { q: 'アンサンブル予報の 目的は?',
        opts: ['1回で 確実な 予報', '不確実性·信頼度を 評価', '計算量を 減らす', '雨量を 増やす'],
        ans: 1, exp: '初期値·モデルを 少し 変えて 複数回 (50メンバー) 計算·結果の 散らばりで 予報の 信頼度·不確実性を 評価。' },
      { q: '局地·短時間予報に 最適な モデルは?',
        opts: ['GSM', 'MSM', 'LFM (2km格子)', 'GEPS'],
        ans: 2, exp: 'LFM = 約 2km格子·10時間先まで·1日24回·局地的な 大雨·ゲリラ豪雨の 短時間予測に 最適。' },
      { q: '気象庁の スーパーコンピュータの 名前は?',
        opts: ['IBM Watson', 'ChatGPT', '富岳 (Fugaku)', 'ガイア'],
        ans: 2, exp: '富岳 (Fugaku) = 理化学研究所·富士通開発·世界トップクラスの スーパーコンピュータ。気象庁が 数値予報に 使用。' },
    ],
    
    tips: [
      '🎯 学科専門の 中核·必出範囲',
      '⭐ GSM 13km·MSM 5km·LFM 2km は 暗記',
      '💡 解像度が 高いほど 範囲は 狭く·期間は 短い (トレードオフ)',
      '📝 アンサンブルの スパゲッティダイアグラムの 読み方が 実技で 出題',
    ],
  },

  // ========================================
  // 第9事件: ⚠ 気象警報
  // ========================================
  9: {
    title: '⚠ 警報·注意報·特別警報',
    subtitle: '気象業務法と 防災',
    examScope: '学科一般·法令 (毎年出題)',
    
    concepts: [
      { term: '注意報',
        desc: '災害の おそれ がある場合に 発表。15種類: 大雨·洪水·暴風·波浪·高潮·雷·乾燥·濃霧·雪·風雪·着雪·着氷·融雪·霜·低温。' },
      { term: '警報',
        desc: '重大な 災害の おそれがある場合に 発表。7種類: 大雨·洪水·暴風·暴風雪·大雪·波浪·高潮。' },
      { term: '特別警報 (2013年8月~)',
        desc: '重大な 災害が 起こる おそれが 著しく 大きい·数十年に 1度 のレベル。「直ちに 命を 守る 行動を」 が キーワード。' },
      { term: '気象業務法',
        desc: '1952年制定·1994年改正で 気象予報士制度創設·予報業務の 基本法。許可事業者は 気象予報士に 予想を させる 義務。' },
      { term: '気象予報士',
        desc: '国家資格 (1994年~)·合格率 4~5%·学科一般·専門·実技の 3科目·受験資格なし·年齢制限なし (最年少11歳合格)。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:#f5f0e8;border-radius:12px;">
        <text x="300" y="20" font-size="14" font-weight="bold" fill="#1a4a5a" text-anchor="middle">気象警報の 階層</text>
        
        <!-- 피라미드 형태 -->
        <g>
          <!-- 注意報 (가장 넓음) -->
          <polygon points="50,290 550,290 470,210 130,210" fill="#ffd76b" stroke="#c9a040" stroke-width="2"/>
          <text x="300" y="265" font-size="14" font-weight="bold" fill="#5a3a10" text-anchor="middle">⚠ 注意報</text>
          <text x="300" y="282" font-size="10" fill="#5a3a10" text-anchor="middle">災害の おそれ · 15種類</text>
          
          <!-- 警報 -->
          <polygon points="130,210 470,210 410,130 190,130" fill="#ff8c4a" stroke="#c95820" stroke-width="2"/>
          <text x="300" y="180" font-size="14" font-weight="bold" fill="white" text-anchor="middle">⚠ 警報</text>
          <text x="300" y="197" font-size="10" fill="white" text-anchor="middle">重大な 災害の おそれ · 7種類</text>
          
          <!-- 特別警報 (정점) -->
          <polygon points="190,130 410,130 350,50 250,50" fill="#a040c0" stroke="#601890" stroke-width="2"/>
          <text x="300" y="95" font-size="13" font-weight="bold" fill="white" text-anchor="middle">⚠ 特別警報</text>
          <text x="300" y="113" font-size="9" fill="white" text-anchor="middle">数十年に 1度</text>
          
          <!-- 우측 라벨 -->
          <text x="560" y="100" font-size="11" fill="#a040c0" font-weight="bold" text-anchor="end">▲</text>
          <text x="560" y="115" font-size="10" fill="#1a4a5a" text-anchor="end">命を守る</text>
          <text x="560" y="128" font-size="10" fill="#1a4a5a" text-anchor="end">行動を!</text>
          
          <text x="560" y="180" font-size="11" fill="#ff8c4a" font-weight="bold" text-anchor="end">↑</text>
          <text x="560" y="195" font-size="10" fill="#1a4a5a" text-anchor="end">避難準備</text>
          
          <text x="560" y="260" font-size="11" fill="#c9a040" font-weight="bold" text-anchor="end">・</text>
          <text x="560" y="275" font-size="10" fill="#1a4a5a" text-anchor="end">注意</text>
        </g>
        
        <!-- 種類別 라벨 (좌측) -->
        <g transform="translate(20,330)">
          <text x="0" y="0" font-size="9" fill="#1a4a5a" font-weight="bold">特別警報の 対象:</text>
          <text x="0" y="14" font-size="8" fill="#1a4a5a">大雨·暴風·暴風雪·大雪·波浪·高潮·津波·火山·地震など</text>
          <text x="0" y="28" font-size="9" fill="#c44">※ 気象庁 気象業務法に 基づく</text>
        </g>
      </svg>
    `,
    
    formulas: [
      { f: '注意報 (15種) → 警報 (7種) → 特別警報 (数十年に1度)', m: '段階' },
      { f: '気象業務法 1952年制定·1994年改正で 気象予報士創設', m: '法令' },
      { f: '気象予報士 = 国家資格·合格率4~5%·受験資格なし', m: '資格' },
      { f: '特別警報発表 → 「直ちに 命を 守る 行動を」', m: 'キーワード' },
    ],
    
    table: {
      title: '主な 警報·注意報',
      headers: ['種類', '注意報', '警報', '特別警報'],
      rows: [
        ['大雨', '◯', '◯', '◯ 数十年に1度'],
        ['洪水', '◯', '◯', '×'],
        ['暴風', '◯', '◯', '◯'],
        ['大雪', '◯', '◯', '◯'],
        ['波浪', '◯', '◯', '◯'],
        ['高潮', '◯', '◯', '◯'],
        ['乾燥·濃霧', '◯', '×', '×'],
        ['津波·火山·地震', '×', '◯', '◯ '],
      ],
    },
    
    cards: [
      { q: '注意報の 種類は 何種類?', a: '15種類' },
      { q: '警報の 種類は 何種類?', a: '7種類' },
      { q: '特別警報は いつから?', a: '2013年8月~' },
      { q: '気象予報士の 国家資格 開始は?', a: '1994年 (気象業務法改正)' },
      { q: '気象予報士試験の 合格率は?', a: '約 4~5% (難関)' },
    ],
    
    quiz: [
      { q: '気象警報の 段階を 軽い順に 並べると?',
        opts: ['特別警報→警報→注意報', '注意報→警報→特別警報', '警報→注意報→特別警報', '段階なし'],
        ans: 1, exp: '注意報 (災害おそれ) → 警報 (重大な災害おそれ) → 特別警報 (数十年に1度·命を守る行動)。' },
      { q: '特別警報が 開始された 年は?',
        opts: ['1990年', '2000年', '2013年8月', '2020年'],
        ans: 2, exp: '特別警報 = 2013年8月30日 運用開始。重大な災害が 起こるおそれが 著しく大きい場合に 発表。' },
      { q: '気象予報士の 国家資格が 創設された 年は?',
        opts: ['1980年', '1994年', '2000年', '2010年'],
        ans: 1, exp: '1994年 気象業務法改正で 気象予報士制度創設。同年に 第1回 試験実施。' },
      { q: '気象予報士試験の 受験資格は?',
        opts: ['大卒以上', '気象学専攻必須', '受験資格なし·誰でも 可', '20歳以上'],
        ans: 2, exp: '気象予報士試験 = 受験資格なし·年齢制限なし。最年少合格は 11歳·小学生でも 合格可能。' },
      { q: '特別警報発表時の キーワードは?',
        opts: ['余裕を持って', '直ちに 命を 守る 行動を', '様子を見る', '通常通り'],
        ans: 1, exp: '特別警報発表 = 「直ちに 命を 守る 行動を」 取る べき レベル。すでに 災害発生中の 可能性も。' },
    ],
    
    tips: [
      '🎯 法令科目で 必出·暗記中心',
      '⭐ 注意報15·警報7·特別警報の 数字は 暗記',
      '💡 1994年 気象業務法改正·気象予報士創設は 必須',
      '📝 ハル君も 気象予報士試験の 受験資格 ありだよ! (年齢制限なし)',
    ],
  },

  // ========================================
  // 第10事件: 🌍 地球温暖化
  // ========================================
  10: {
    title: '🌍 地球温暖化·気候変動',
    subtitle: 'IPCC·異常気象',
    examScope: '学科専門 (近年頻出)',
    
    concepts: [
      { term: '地球温暖化',
        desc: '産業革命以降の 人間活動 (化石燃料·森林破壊) による 大気中の 温室効果ガス 増加で 地球の 平均気温が 上昇する 現象。' },
      { term: 'IPCC',
        desc: '気候変動に関する 政府間パネル·1988年設立·世界中の 科学者の 知見を まとめた 評価報告書を 数年ごとに 発行。第6次評価報告書 (AR6·2021)。' },
      { term: 'パリ協定 (2015)',
        desc: '世界の 平均気温上昇を 産業革命前比 +2°C より 十分 低く·できれば +1.5°C に 抑える 目標。COP21で 採択·2016年発効。' },
      { term: '温室効果ガス',
        desc: 'CO₂ (二酸化炭素·主犯)·CH₄ (メタン)·N₂O (亜酸化窒素)·フロン類。CO₂濃度は 産業革命前 280ppm → 現在 420ppm超。' },
      { term: '異常気象',
        desc: '温暖化の 結果·豪雨頻発·猛暑·強い台風·偏西風蛇行·海面上昇·北極海氷減少·干ばつ·森林火災 など。' },
    ],
    
    diagram: `
      <svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:550px;height:auto;background:linear-gradient(180deg,#1a3a5a 0%,#2a4a6a 100%);border-radius:12px;">
        <text x="300" y="20" font-size="14" font-weight="bold" fill="white" text-anchor="middle">地球温暖化と CO₂ (1850~2100)</text>
        
        <!-- 그래프 영역 -->
        <g transform="translate(60,50)">
          <!-- 축 -->
          <line x1="0" y1="280" x2="500" y2="280" stroke="white" stroke-width="2"/>
          <line x1="0" y1="0" x2="0" y2="280" stroke="white" stroke-width="2"/>
          
          <!-- X축 라벨 -->
          <text x="0" y="295" font-size="9" fill="white" text-anchor="middle">1850</text>
          <text x="100" y="295" font-size="9" fill="white" text-anchor="middle">1900</text>
          <text x="200" y="295" font-size="9" fill="white" text-anchor="middle">1950</text>
          <text x="300" y="295" font-size="9" fill="white" text-anchor="middle">2000</text>
          <text x="400" y="295" font-size="9" fill="white" text-anchor="middle">2050</text>
          <text x="500" y="295" font-size="9" fill="white" text-anchor="middle">2100</text>
          <text x="250" y="315" font-size="10" fill="white" text-anchor="middle">年</text>
          
          <!-- Y축 라벨 -->
          <text x="-8" y="280" font-size="9" fill="white" text-anchor="end">0</text>
          <text x="-8" y="220" font-size="9" fill="white" text-anchor="end">+1°C</text>
          <text x="-8" y="160" font-size="9" fill="white" text-anchor="end">+2°C</text>
          <text x="-8" y="100" font-size="9" fill="white" text-anchor="end">+3°C</text>
          <text x="-8" y="40" font-size="9" fill="white" text-anchor="end">+4°C</text>
          <text x="-25" y="140" font-size="10" fill="white" transform="rotate(-90,-25,140)">気温上昇</text>
          
          <!-- 1.5°C·2°C 목표선 -->
          <line x1="0" y1="190" x2="500" y2="190" stroke="#ffa040" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="510" y="193" font-size="9" fill="#ffa040">+1.5°C パリ協定</text>
          <line x1="0" y1="160" x2="500" y2="160" stroke="#ff6040" stroke-width="1" stroke-dasharray="3 3"/>
          <text x="510" y="163" font-size="9" fill="#ff6040">+2°C 限界</text>
          
          <!-- 관측 데이터 (1850~2024) -->
          <path d="M 0,278 Q 50,275 100,272 Q 150,268 200,263 Q 250,258 300,240 Q 320,234 340,222"
                stroke="#4af" stroke-width="2.5" fill="none"/>
          <text x="200" y="252" font-size="9" fill="#4af">観測 (~1.1°C·2024)</text>
          
          <!-- 미래 시나리오 - 高排出 (악화) -->
          <path d="M 340,222 Q 380,180 420,120 Q 460,70 500,30"
                stroke="#f44" stroke-width="2.5" fill="none" stroke-dasharray="5 2"/>
          <text x="450" y="55" font-size="9" fill="#f44">高排出 +4°C超</text>
          
          <!-- 미래 시나리오 - 中排出 -->
          <path d="M 340,222 Q 380,205 420,180 Q 460,160 500,150"
                stroke="#fa4" stroke-width="2.5" fill="none" stroke-dasharray="5 2"/>
          <text x="490" y="148" font-size="9" fill="#fa4" text-anchor="end">中排出 +2.7°C</text>
          
          <!-- 미래 시나리오 - 低排出 (パリ協定) -->
          <path d="M 340,222 Q 380,215 420,205 Q 460,195 500,195"
                stroke="#4f8" stroke-width="2.5" fill="none" stroke-dasharray="5 2"/>
          <text x="490" y="208" font-size="9" fill="#4f8" text-anchor="end">低排出 +1.5°C</text>
          
          <!-- 産業革命前 점선 -->
          <line x1="0" y1="280" x2="500" y2="280" stroke="#8c4" stroke-width="1"/>
          <text x="2" y="275" font-size="8" fill="#8c4">産業革命前 基準</text>
        </g>
        
        <!-- IPCC AR6 라벨 -->
        <text x="300" y="385" font-size="10" fill="#ffa" text-anchor="middle">出典: IPCC 第6次評価報告書 (2021) - 「人間の影響は 疑う余地なし」</text>
      </svg>
    `,
    
    formulas: [
      { f: '産業革命前比 +1.09°C (2011~2020·IPCC AR6)', m: '現在の 温暖化' },
      { f: 'パリ協定 = +2°C より 十分低く·できれば +1.5°C', m: '世界目標' },
      { f: 'CO₂濃度 = 280 → 420ppm超 (産業革命前→現在)', m: '増加50%' },
      { f: '大気の 水蒸気量 = 約 7%/°C 増加 (Clausius-Clapeyron)', m: '豪雨増の 物理' },
    ],
    
    table: {
      title: '温暖化が 引き起こす 異常気象',
      headers: ['現象', 'メカニズム'],
      rows: [
        ['豪雨頻発', '気温上昇 → 大気の 水蒸気量増 → 強雨'],
        ['猛暑·熱波', '直接的な 気温上昇'],
        ['強い台風', '海面水温上昇 → エネルギー増'],
        ['偏西風 蛇行', '極地と 中緯度の 温度差変化'],
        ['海面上昇', '氷河·氷床 融解·海水熱膨張·約 3-4mm/年'],
        ['北極海氷減少', '気温上昇 → 夏季 海氷激減'],
        ['干ばつ·森林火災', '蒸発量増加·乾燥化'],
      ],
    },
    
    cards: [
      { q: '産業革命前比 現在の 気温上昇は?', a: '約 +1.09°C (2011~2020·IPCC AR6)' },
      { q: 'パリ協定の 目標は?', a: '+2°C より 十分 低く·できれば +1.5°C に 抑制' },
      { q: 'CO₂濃度 産業革命前と 現在は?', a: '280ppm → 420ppm超 (約 50%増)' },
      { q: 'IPCC とは?', a: '気候変動に関する 政府間パネル·1988年設立' },
      { q: '気温が 1°C 上がると 大気水蒸気量は?', a: '約 7%増 (Clausius-Clapeyron)' },
    ],
    
    quiz: [
      { q: '産業革命前と 比べた 現在 (2011~2020) の 世界平均気温上昇は?',
        opts: ['約 0.1°C', '約 1.1°C', '約 5°C', '変化なし'],
        ans: 1, exp: 'IPCC第6次評価報告書 (AR6·2021): 約 +1.09°C 上昇。「人間の影響は 疑う余地なし」 と 初めて 断言。' },
      { q: 'パリ協定 (2015) の 気温目標は?',
        opts: ['+0.5°C', '+1.5~2°C 以内', '+5°C', '目標なし'],
        ans: 1, exp: 'パリ協定 = +2°C より 十分低く·できれば +1.5°C に 抑制。COP21で 採択·2016年発効·世界196ヶ国参加。' },
      { q: '気温が 1°C 上昇すると 大気の 水蒸気量は 約?',
        opts: ['1%増', '7%増', '50%増', '変化なし'],
        ans: 1, exp: 'Clausius-Clapeyron式: 約 7%/°C で 飽和水蒸気量 増加 → 豪雨頻発の 物理的根拠。' },
      { q: 'IPCC の 設立年と 役割は?',
        opts: ['2000年·環境庁', '1988年·気候変動の 科学評価', '1990年·原子力', '2015年·貿易'],
        ans: 1, exp: 'IPCC = Intergovernmental Panel on Climate Change·1988年 WMO·UNEP共同設立·世界中の 科学者の 知見を まとめた 評価報告書 発行。' },
      { q: '温暖化で 増加する 異常気象に 含まれない のは?',
        opts: ['豪雨·線状降水帯', '強い台風', '猛暑·熱波', '寒冷化·氷河期'],
        ans: 3, exp: '温暖化 → 豪雨·猛暑·強台風·偏西風蛇行·海面上昇 など。寒冷化·氷河期は 含まれない (むしろ 北極海氷は 減少)。' },
    ],
    
    tips: [
      '🎯 近年 学科専門で 出題増加·実技でも 関連付け',
      '⭐ +1.09°C·+1.5°C·+2°C·420ppm の 数字は 暗記',
      '💡 IPCC AR6 (2021) の「人間影響は 疑う余地なし」 は キーフレーズ',
      '📝 ハルの 夢 = 気象予報士 = 温暖化対策の 最前線! 君の 出番!',
    ],
  },
};









