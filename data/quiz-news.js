/* quiz-news.js — extracted from index.html (v73 step3)
 * Original location: lines 4002-5847 (current index.html)
 * Contents: NEWS_HEADLINES, NEWS_CATS, COMPOUND_WORDS, COMPOUND_HARD, GRAMMAR_PRE1_TOPICS, WRITING_PRE1_PART1/2, ALL_WRITING_PRE1, QUIZ_JP_GEO/HIST/CULTURE, QUIZ_WORLD_GEO, QUIZ_FLAGS, QUIZ_WORLD, QUIZ_SCIENCE, QUIZ_CATEGORIES
 */
// ============================================================
// v22 추가 데이터
// ============================================================
// ============================================================
// 📰 英語ニュース 見出し (40 헤드라인 / 5 카테고리 × 8개)
// 친근한 주제 - 스포츠·동물·자연·우주·과학
// 각 헤드라인 + 일본어 해석 + 핵심 단어 3개 (의미) + 짧은 설명
// 학습용 폭넓은 내용. 실제 뉴스가 아닌 학습용 오리지널 헤드라인.
// ============================================================
const NEWS_HEADLINES = [
  // ===== 🏆 スポーツ (8개) =====
  {
    cat: '🏆 スポーツ',
    en: 'Japanese Swimmer Wins Gold Medal at World Games',
    ja: '日本人の 水泳選手が 世界大会で 金メダルを 獲得',
    words: [
      { w: 'swimmer', m: '水泳選手' },
      { w: 'gold medal', m: '金メダル' },
      { w: 'World Games', m: '世界大会' },
    ],
    desc: 'A 19-year-old swimmer from Tokyo broke the world record in the 200m race.',
    descJa: '東京出身の19歳の選手が 200m で 世界記録を 更新しました。'
  },
  {
    cat: '🏆 スポーツ',
    en: 'Soccer Team Celebrates Victory After Tough Match',
    ja: 'サッカーチームが 厳しい 試合の後 勝利を 祝う',
    words: [
      { w: 'celebrate', m: '祝う' },
      { w: 'victory', m: '勝利' },
      { w: 'tough', m: '厳しい' },
    ],
    desc: 'The team won 3-2 in the final minute of the game.',
    descJa: '試合の 最後の 1分で 3対2で 勝ちました。'
  },
  {
    cat: '🏆 スポーツ',
    en: 'Young Tennis Star Becomes Youngest Champion',
    ja: '若い テニススターが 史上 最年少の チャンピオンに',
    words: [
      { w: 'tennis', m: 'テニス' },
      { w: 'champion', m: 'チャンピオン' },
      { w: 'youngest', m: '最年少' },
    ],
    desc: 'At only 16 years old, she made history by winning the major tournament.',
    descJa: 'わずか 16歳で 大きな 大会に 優勝し 歴史を 作りました。'
  },
  {
    cat: '🏆 スポーツ',
    en: 'Marathon Runner Finishes Race in Record Time',
    ja: 'マラソン選手が 記録的な タイムで ゴール',
    words: [
      { w: 'marathon', m: 'マラソン' },
      { w: 'finish', m: '終える' },
      { w: 'record', m: '記録' },
    ],
    desc: 'The runner completed the 42-kilometer race in just 2 hours and 5 minutes.',
    descJa: '42キロを わずか 2時間5分で 走り切りました。'
  },
  {
    cat: '🏆 スポーツ',
    en: 'Basketball Team Practices Five Hours Every Day',
    ja: 'バスケットボールチームは 毎日 5時間 練習する',
    words: [
      { w: 'basketball', m: 'バスケットボール' },
      { w: 'practice', m: '練習する' },
      { w: 'every day', m: '毎日' },
    ],
    desc: 'The high school team won the national championship after months of training.',
    descJa: 'その 高校チームは 何ヶ月もの 練習の末 全国大会で 優勝しました。'
  },
  {
    cat: '🏆 スポーツ',
    en: 'Olympic Skater Performs Amazing Triple Jump',
    ja: 'オリンピックの フィギュア選手が すばらしい 3回転を 成功',
    words: [
      { w: 'Olympic', m: 'オリンピックの' },
      { w: 'amazing', m: 'すばらしい' },
      { w: 'perform', m: '演じる・行う' },
    ],
    desc: 'The skater landed three jumps perfectly and earned a high score.',
    descJa: '3回ジャンプを 完璧に 着地し 高い 点数を 得ました。'
  },
  {
    cat: '🏆 スポーツ',
    en: 'Baseball Player Hits Home Run on First Try',
    ja: '野球選手が 初打席で ホームランを 打つ',
    words: [
      { w: 'baseball', m: '野球' },
      { w: 'home run', m: 'ホームラン' },
      { w: 'first try', m: '最初の挑戦' },
    ],
    desc: 'The 18-year-old player surprised everyone in his first professional game.',
    descJa: '18歳の選手が プロ初試合で 皆を 驚かせました。'
  },
  {
    cat: '🏆 スポーツ',
    en: 'Skiing Festival Attracts Thousands of Visitors',
    ja: 'スキーフェスティバルに 数千人の 観光客が 集まる',
    words: [
      { w: 'skiing', m: 'スキー' },
      { w: 'festival', m: 'フェスティバル' },
      { w: 'attract', m: '引きつける' },
    ],
    desc: 'The annual event in Hokkaido brings ski lovers from around the world.',
    descJa: '北海道の 毎年恒例の イベントに 世界中から スキー愛好家が 集まります。'
  },

  // ===== 🐾 動物 (8개) =====
  {
    cat: '🐾 動物',
    en: 'Baby Panda Born at Tokyo Zoo This Spring',
    ja: '東京動物園で この春 赤ちゃんパンダが 誕生',
    words: [
      { w: 'panda', m: 'パンダ' },
      { w: 'born', m: '生まれる' },
      { w: 'zoo', m: '動物園' },
    ],
    desc: 'The little panda weighs only 200 grams and is healthy.',
    descJa: '小さな パンダは わずか 200グラムで 元気です。'
  },
  {
    cat: '🐾 動物',
    en: 'Dolphins Help Lost Boat Find Its Way Home',
    ja: 'イルカが 道に迷った 船を 安全な 港まで 案内',
    words: [
      { w: 'dolphin', m: 'イルカ' },
      { w: 'lost', m: '迷子の' },
      { w: 'find', m: '見つける' },
    ],
    desc: 'A group of dolphins guided fishermen safely to shore during a storm.',
    descJa: 'イルカの 群れが 嵐の中 漁師たちを 岸まで 案内しました。'
  },
  {
    cat: '🐾 動物',
    en: 'Endangered Sea Turtles Return to Japanese Beach',
    ja: '絶滅危惧種の ウミガメが 日本の 浜辺に 帰ってきた',
    words: [
      { w: 'endangered', m: '絶滅危惧の' },
      { w: 'sea turtle', m: 'ウミガメ' },
      { w: 'return', m: '帰る' },
    ],
    desc: 'Hundreds of turtles laid eggs on the beach, the most in 20 years.',
    descJa: '何百匹もの カメが 浜で 卵を 産み 20年で 最多でした。'
  },
  {
    cat: '🐾 動物',
    en: 'Smart Crows Solve Puzzles Faster Than Children',
    ja: '頭の いい カラスは 子どもより 早く パズルを 解く',
    words: [
      { w: 'crow', m: 'カラス' },
      { w: 'solve', m: '解く' },
      { w: 'puzzle', m: 'パズル' },
    ],
    desc: 'Scientists were surprised that crows could use simple tools.',
    descJa: '科学者たちは カラスが 簡単な 道具を 使えることに 驚きました。'
  },
  {
    cat: '🐾 動物',
    en: 'Kittens Rescued from Tree by Local Firefighters',
    ja: '地元の 消防士が 木から 子猫たちを 救出',
    words: [
      { w: 'kitten', m: '子猫' },
      { w: 'rescue', m: '救出する' },
      { w: 'firefighter', m: '消防士' },
    ],
    desc: 'Three small kittens were stuck in a tall tree for two days.',
    descJa: '3匹の 小さな 子猫が 2日間 高い 木に 閉じ込められていました。'
  },
  {
    cat: '🐾 動物',
    en: 'Penguin Walks 3,000 Kilometers to Find Friend',
    ja: 'ペンギンが 友だちを 探して 3,000キロを 歩く',
    words: [
      { w: 'penguin', m: 'ペンギン' },
      { w: 'walk', m: '歩く' },
      { w: 'friend', m: '友だち' },
    ],
    desc: 'The penguin returns every year to the same person who once helped him.',
    descJa: 'その ペンギンは かつて 助けてくれた 同じ人の所に 毎年 戻ります。'
  },
  {
    cat: '🐾 動物',
    en: 'Wild Elephants Found Painting in National Park',
    ja: '国立公園で 野生の ゾウが 絵を 描いている 姿を 発見',
    words: [
      { w: 'wild', m: '野生の' },
      { w: 'elephant', m: 'ゾウ' },
      { w: 'paint', m: '絵を描く' },
    ],
    desc: 'The elephants used their trunks to make patterns in the sand.',
    descJa: 'ゾウたちは 鼻を 使って 砂に 模様を 描きました。'
  },
  {
    cat: '🐾 動物',
    en: 'Dogs Trained to Help Children with Reading',
    ja: '子どもの 読書を 助ける 犬が 訓練される',
    words: [
      { w: 'train', m: '訓練する' },
      { w: 'help', m: '助ける' },
      { w: 'reading', m: '読書' },
    ],
    desc: 'Children read books to friendly dogs, who listen quietly without judgment.',
    descJa: '子どもたちは 静かに 聞いてくれる 犬に 本を 読み聞かせます。'
  },

  // ===== 🌳 自然 (8개) =====
  {
    cat: '🌳 自然',
    en: 'Cherry Blossoms Bloom Two Weeks Earlier This Year',
    ja: '今年は 桜が 2週間 早く 咲いた',
    words: [
      { w: 'cherry blossom', m: '桜' },
      { w: 'bloom', m: '咲く' },
      { w: 'earlier', m: '早く' },
    ],
    desc: 'Warmer weather caused the famous flowers to open in early March.',
    descJa: '暖かい 天気の 影響で 桜が 3月初めに 咲きました。'
  },
  {
    cat: '🌳 自然',
    en: 'Mount Fuji Climbing Season Opens Next Week',
    ja: '富士山の 登山シーズンが 来週 始まる',
    words: [
      { w: 'mountain', m: '山' },
      { w: 'climb', m: '登る' },
      { w: 'season', m: 'シーズン' },
    ],
    desc: 'Thousands of climbers are expected to reach the summit this summer.',
    descJa: 'この夏 何千人もの 登山者が 頂上に 到達すると 予想されます。'
  },
  {
    cat: '🌳 自然',
    en: 'Heavy Snow Creates Beautiful Winter Scenes',
    ja: '大雪が 美しい 冬の 景色を 作り出す',
    words: [
      { w: 'heavy snow', m: '大雪' },
      { w: 'beautiful', m: '美しい' },
      { w: 'scene', m: '景色' },
    ],
    desc: 'The mountain town received over 1 meter of snow last weekend.',
    descJa: 'その 山の町は 先週末 1メートル以上の 雪が 降りました。'
  },
  {
    cat: '🌳 自然',
    en: 'Volunteers Plant 10,000 Trees in Forest Park',
    ja: 'ボランティアが 森林公園に 1万本の 木を 植える',
    words: [
      { w: 'volunteer', m: 'ボランティア' },
      { w: 'plant', m: '植える' },
      { w: 'forest', m: '森' },
    ],
    desc: 'Local people gathered to help save the forest from disappearing.',
    descJa: '地元の 人々が 森を 守るために 集まりました。'
  },
  {
    cat: '🌳 自然',
    en: 'Rare Flowers Discovered in Mountain Valley',
    ja: '山の 谷で めずらしい 花が 発見される',
    words: [
      { w: 'rare', m: 'めずらしい' },
      { w: 'flower', m: '花' },
      { w: 'discover', m: '発見する' },
    ],
    desc: 'Scientists found three new types of flowers never seen before.',
    descJa: '科学者たちは これまで 見たことのない 3種類の 花を 見つけました。'
  },
  {
    cat: '🌳 自然',
    en: 'Beach Cleanup Removes Tons of Plastic Waste',
    ja: 'ビーチ清掃で 大量の プラスチックごみを 回収',
    words: [
      { w: 'beach', m: 'ビーチ' },
      { w: 'cleanup', m: '清掃' },
      { w: 'plastic waste', m: 'プラスチックごみ' },
    ],
    desc: 'Over 500 people joined the event to clean the coast.',
    descJa: '500人以上が 海岸の 清掃に 参加しました。'
  },
  {
    cat: '🌳 自然',
    en: 'Northern Lights Visible from Hokkaido Tonight',
    ja: '今夜 北海道から オーロラが 見られる 可能性',
    words: [
      { w: 'northern lights', m: 'オーロラ' },
      { w: 'visible', m: '見える' },
      { w: 'tonight', m: '今夜' },
    ],
    desc: 'A strong solar storm makes the rare aurora possible to see.',
    descJa: '強い 太陽嵐により めずらしい オーロラが 見られる 可能性が あります。'
  },
  {
    cat: '🌳 自然',
    en: 'Coral Reef Recovers After Years of Care',
    ja: '何年もの 保護活動で サンゴ礁が 回復',
    words: [
      { w: 'coral reef', m: 'サンゴ礁' },
      { w: 'recover', m: '回復する' },
      { w: 'care', m: '保護・世話' },
    ],
    desc: 'The Okinawa reef now has 40 percent more healthy coral.',
    descJa: '沖縄の サンゴ礁は 健康な サンゴが 40%増えました。'
  },

  // ===== 🚀 宇宙 (8개) =====
  {
    cat: '🚀 宇宙',
    en: 'Japanese Astronaut Returns Safely from Space Station',
    ja: '日本の 宇宙飛行士が 宇宙ステーションから 無事 帰還',
    words: [
      { w: 'astronaut', m: '宇宙飛行士' },
      { w: 'space station', m: '宇宙ステーション' },
      { w: 'safely', m: '無事に' },
    ],
    desc: 'After six months in space, the astronaut shared photos of Earth.',
    descJa: '宇宙で 6か月過ごした後 地球の 写真を 公開しました。'
  },
  {
    cat: '🚀 宇宙',
    en: 'Mars Rover Sends First Photos of Red Planet',
    ja: '火星探査機が 赤い惑星の 最初の 写真を 送る',
    words: [
      { w: 'Mars', m: '火星' },
      { w: 'rover', m: '探査機' },
      { w: 'planet', m: '惑星' },
    ],
    desc: 'The new rover landed last week and is already sending data.',
    descJa: '新しい 探査機は 先週 着陸し すでに データを 送っています。'
  },
  {
    cat: '🚀 宇宙',
    en: 'Total Solar Eclipse to Happen Next Month',
    ja: '来月 皆既日食が 起こる',
    words: [
      { w: 'solar eclipse', m: '日食' },
      { w: 'total', m: '完全な' },
      { w: 'happen', m: '起こる' },
    ],
    desc: 'For two minutes, day will turn into night across parts of Asia.',
    descJa: '2分間 アジアの 一部で 昼が 夜のように なります。'
  },
  {
    cat: '🚀 宇宙',
    en: 'New Galaxy Discovered Far Beyond Our Own',
    ja: '私たちの 銀河の はるか向こうで 新たな 銀河が 発見',
    words: [
      { w: 'galaxy', m: '銀河' },
      { w: 'discover', m: '発見する' },
      { w: 'beyond', m: '~の向こうに' },
    ],
    desc: 'The newly found galaxy is 13 billion light-years away.',
    descJa: '新発見の 銀河は 130億光年 離れています。'
  },
  {
    cat: '🚀 宇宙',
    en: 'Meteor Shower Lights Up the Night Sky',
    ja: '流星群が 夜空を 明るく 照らす',
    words: [
      { w: 'meteor', m: '流星' },
      { w: 'shower', m: '群れ' },
      { w: 'light up', m: '明るくする' },
    ],
    desc: 'You can see up to 100 shooting stars per hour this weekend.',
    descJa: '今週末 1時間に 最大100個の 流れ星を 見ることが できます。'
  },
  {
    cat: '🚀 宇宙',
    en: 'Children Build Mini Rocket That Reaches Sky',
    ja: '子どもたちが 空まで 届く ミニロケットを 作る',
    words: [
      { w: 'build', m: '作る' },
      { w: 'rocket', m: 'ロケット' },
      { w: 'reach', m: '届く' },
    ],
    desc: 'A school science club launched their rocket 200 meters into the air.',
    descJa: '学校の 科学クラブが ロケットを 200メートルの 空に 打ち上げました。'
  },
  {
    cat: '🚀 宇宙',
    en: 'Saturn\'s Rings Visible Through Home Telescope',
    ja: '家の 望遠鏡で 土星の 輪が 見える',
    words: [
      { w: 'Saturn', m: '土星' },
      { w: 'ring', m: '輪' },
      { w: 'telescope', m: '望遠鏡' },
    ],
    desc: 'This is the best month of the year to view Saturn from Earth.',
    descJa: '今月は 地球から 土星を 見るのに 1年で 最高の 月です。'
  },
  {
    cat: '🚀 宇宙',
    en: 'Moon Mission Plans Bring Back Rock Samples',
    ja: '月探査計画で 岩石サンプルを 持ち帰る',
    words: [
      { w: 'moon', m: '月' },
      { w: 'mission', m: '任務・計画' },
      { w: 'sample', m: 'サンプル' },
    ],
    desc: 'Scientists will study the rocks to learn about the moon\'s history.',
    descJa: '科学者たちは その 岩石を 調べて 月の 歴史を 知ろうとしています。'
  },

  // ===== 🔬 科学 (8개) =====
  {
    cat: '🔬 科学',
    en: 'New Robot Helps Doctors Save Lives',
    ja: '新しい ロボットが 医者の 命を 救う 手伝いを する',
    words: [
      { w: 'robot', m: 'ロボット' },
      { w: 'doctor', m: '医者' },
      { w: 'save lives', m: '命を救う' },
    ],
    desc: 'The robot helps doctors do very small operations with great accuracy.',
    descJa: 'その ロボットは 医者が 非常に 小さな 手術を 正確に 行うのを 助けます。'
  },
  {
    cat: '🔬 科学',
    en: 'Students Invent Phone Charger Powered by Sunlight',
    ja: '生徒たちが 太陽光で 動く 携帯充電器を 発明',
    words: [
      { w: 'invent', m: '発明する' },
      { w: 'charger', m: '充電器' },
      { w: 'sunlight', m: '太陽光' },
    ],
    desc: 'The team won first prize at a national science fair.',
    descJa: 'そのチームは 全国の 科学コンテストで 1位を 取りました。'
  },
  {
    cat: '🔬 科学',
    en: 'Scientists Find Way to Make Cleaner Air',
    ja: '科学者たちが よりきれいな 空気を 作る 方法を 発見',
    words: [
      { w: 'scientist', m: '科学者' },
      { w: 'find', m: '見つける' },
      { w: 'cleaner', m: 'よりきれい' },
    ],
    desc: 'A new machine can remove pollution from the air in minutes.',
    descJa: '新しい 機械が 数分で 空気中の 汚染を 取り除けます。'
  },
  {
    cat: '🔬 科学',
    en: 'AI Learns to Speak 50 Languages in One Year',
    ja: 'AIが 1年で 50ヶ国語を 話せるように なる',
    words: [
      { w: 'AI', m: '人工知能' },
      { w: 'learn', m: '学ぶ' },
      { w: 'language', m: '言語' },
    ],
    desc: 'The new AI helps people communicate across the world.',
    descJa: '新しい AIは 世界中の 人々が コミュニケーションを 取るのを 助けます。'
  },
  {
    cat: '🔬 科学',
    en: 'Tiny Robot Bees May Help Real Bees',
    ja: '小さな ロボットの ハチが 本物の ハチを 助ける かもしれない',
    words: [
      { w: 'tiny', m: '小さな' },
      { w: 'bee', m: 'ハチ' },
      { w: 'real', m: '本物の' },
    ],
    desc: 'Robot bees can pollinate flowers when there are not enough real bees.',
    descJa: '本物の ハチが 足りない 時 ロボットの ハチが 花の 受粉を 手伝えます。'
  },
  {
    cat: '🔬 科学',
    en: 'Ocean Robots Map Deep Sea for First Time',
    ja: '海洋ロボットが 初めて 深海の 地図を 作る',
    words: [
      { w: 'ocean', m: '海洋' },
      { w: 'map', m: '地図を作る' },
      { w: 'deep sea', m: '深海' },
    ],
    desc: 'The robots discovered new species of fish 5,000 meters underwater.',
    descJa: 'そのロボットは 5,000メートルの 海中で 新しい 魚の 種類を 発見しました。'
  },
  {
    cat: '🔬 科学',
    en: 'New Battery Lasts Five Times Longer Than Old Ones',
    ja: '新しい 電池が 古いものより 5倍 長持ちする',
    words: [
      { w: 'battery', m: '電池' },
      { w: 'last', m: '長持ちする' },
      { w: 'longer', m: 'より長い' },
    ],
    desc: 'The battery could change how electric cars work in the future.',
    descJa: 'この 電池は 将来 電気自動車の 動き方を 変えるかも しれません。'
  },
  {
    cat: '🔬 科学',
    en: 'Children Use 3D Printers to Make Toys',
    ja: '子どもたちが 3Dプリンターで おもちゃを 作る',
    words: [
      { w: '3D printer', m: '3Dプリンター' },
      { w: 'make', m: '作る' },
      { w: 'toy', m: 'おもちゃ' },
    ],
    desc: 'Schools are teaching kids how to design and print their own toys.',
    descJa: '学校で 子どもたちが 自分の おもちゃを デザインして 印刷する 方法を 学んでいます。'
  },
];

// 카테고리 목록
const NEWS_CATS = ['🏆 スポーツ', '🐾 動物', '🌳 自然', '🚀 宇宙', '🔬 科学'];

// ============================================================
// 🧩 合成語 ゲーム (단어 + 단어 = 합성어, 50개)
// 친근한 일상 합성어. 영검 5급~2급 수준 단어들.
// 각 항목: 단어1 + 단어2 = 합성어 + 의미
// ============================================================
const COMPOUND_WORDS = [
  // ===== 자연·날씨 =====
  { a: 'sun', b: 'flower', word: 'sunflower', ja: 'ヒマワリ', emoji: '🌻' },
  { a: 'rain', b: 'bow', word: 'rainbow', ja: '虹', emoji: '🌈' },
  { a: 'snow', b: 'man', word: 'snowman', ja: '雪だるま', emoji: '⛄' },
  { a: 'water', b: 'fall', word: 'waterfall', ja: '滝', emoji: '💦' },
  { a: 'rain', b: 'drop', word: 'raindrop', ja: '雨粒', emoji: '💧' },
  { a: 'star', b: 'fish', word: 'starfish', ja: 'ヒトデ', emoji: '⭐' },
  { a: 'moon', b: 'light', word: 'moonlight', ja: '月明かり', emoji: '🌙' },
  { a: 'thunder', b: 'storm', word: 'thunderstorm', ja: '雷雨', emoji: '⛈️' },
  // ===== 동물·곤충 =====
  { a: 'butter', b: 'fly', word: 'butterfly', ja: 'チョウ', emoji: '🦋' },
  { a: 'fire', b: 'fly', word: 'firefly', ja: 'ホタル', emoji: '✨' },
  { a: 'lady', b: 'bug', word: 'ladybug', ja: 'テントウムシ', emoji: '🐞' },
  { a: 'sea', b: 'horse', word: 'seahorse', ja: 'タツノオトシゴ', emoji: '🦄' },
  { a: 'jelly', b: 'fish', word: 'jellyfish', ja: 'クラゲ', emoji: '🪼' },
  { a: 'gold', b: 'fish', word: 'goldfish', ja: '金魚', emoji: '🐠' },
  // ===== 음식·간식 =====
  { a: 'pan', b: 'cake', word: 'pancake', ja: 'パンケーキ', emoji: '🥞' },
  { a: 'pop', b: 'corn', word: 'popcorn', ja: 'ポップコーン', emoji: '🍿' },
  { a: 'ice', b: 'cream', word: 'icecream', ja: 'アイスクリーム', emoji: '🍦' },
  { a: 'straw', b: 'berry', word: 'strawberry', ja: 'イチゴ', emoji: '🍓' },
  { a: 'water', b: 'melon', word: 'watermelon', ja: 'スイカ', emoji: '🍉' },
  { a: 'pine', b: 'apple', word: 'pineapple', ja: 'パイナップル', emoji: '🍍' },
  { a: 'milk', b: 'shake', word: 'milkshake', ja: 'ミルクシェイク', emoji: '🥤' },
  { a: 'cheese', b: 'cake', word: 'cheesecake', ja: 'チーズケーキ', emoji: '🍰' },
  // ===== 시간·하루 =====
  { a: 'birth', b: 'day', word: 'birthday', ja: '誕生日', emoji: '🎂' },
  { a: 'after', b: 'noon', word: 'afternoon', ja: '午後', emoji: '🌅' },
  { a: 'mid', b: 'night', word: 'midnight', ja: '真夜中', emoji: '🌑' },
  { a: 'sun', b: 'rise', word: 'sunrise', ja: '日の出', emoji: '🌄' },
  { a: 'sun', b: 'set', word: 'sunset', ja: '日の入り', emoji: '🌇' },
  { a: 'week', b: 'end', word: 'weekend', ja: '週末', emoji: '📅' },
  // ===== 학교·교실 =====
  { a: 'class', b: 'room', word: 'classroom', ja: '教室', emoji: '🏫' },
  { a: 'home', b: 'work', word: 'homework', ja: '宿題', emoji: '📚' },
  { a: 'note', b: 'book', word: 'notebook', ja: 'ノート', emoji: '📓' },
  { a: 'text', b: 'book', word: 'textbook', ja: '教科書', emoji: '📖' },
  { a: 'black', b: 'board', word: 'blackboard', ja: '黒板', emoji: '⬛' },
  { a: 'play', b: 'ground', word: 'playground', ja: '校庭・遊び場', emoji: '🤸' },
  // ===== 집·생활 =====
  { a: 'bed', b: 'room', word: 'bedroom', ja: '寝室', emoji: '🛏️' },
  { a: 'bath', b: 'room', word: 'bathroom', ja: 'お風呂・トイレ', emoji: '🛁' },
  { a: 'door', b: 'bell', word: 'doorbell', ja: '玄関のベル', emoji: '🔔' },
  { a: 'tooth', b: 'brush', word: 'toothbrush', ja: '歯ブラシ', emoji: '🪥' },
  { a: 'tooth', b: 'paste', word: 'toothpaste', ja: '歯みがき粉', emoji: '🦷' },
  { a: 'hair', b: 'brush', word: 'hairbrush', ja: 'ヘアブラシ', emoji: '💇' },
  { a: 'news', b: 'paper', word: 'newspaper', ja: '新聞', emoji: '📰' },
  { a: 'foot', b: 'print', word: 'footprint', ja: '足跡', emoji: '👣' },
  // ===== 놀이·여가 =====
  { a: 'foot', b: 'ball', word: 'football', ja: 'サッカー', emoji: '⚽' },
  { a: 'basket', b: 'ball', word: 'basketball', ja: 'バスケットボール', emoji: '🏀' },
  { a: 'volley', b: 'ball', word: 'volleyball', ja: 'バレーボール', emoji: '🏐' },
  { a: 'snow', b: 'board', word: 'snowboard', ja: 'スノーボード', emoji: '🏂' },
  { a: 'sky', b: 'line', word: 'skyline', ja: '都市の輪郭', emoji: '🏙️' },
  // ===== 교통·여행 =====
  { a: 'air', b: 'port', word: 'airport', ja: '空港', emoji: '✈️' },
  { a: 'air', b: 'plane', word: 'airplane', ja: '飛行機', emoji: '🛩️' },
  { a: 'sea', b: 'side', word: 'seaside', ja: '海辺', emoji: '🏖️' },
];


// ============================================================
// v23 추가 데이터
// ============================================================
// ============================================================
// 🧩 合成語ゲーム - 어려운 버전 (3가지 모드)
// 영검 준2급~2급 수준 합성어
// ============================================================

// ===== 고급 합성어 50개 =====
// 각 합성어는 두 단어의 결합이지만, 실제 의미는 비유적·추상적
// 예: break + through = breakthrough (돌파구) - 단순한 결합이 아님
const COMPOUND_HARD = [
  // 비즈니스·사회
  { a: 'break', b: 'through', word: 'breakthrough', ja: '突破口・大躍進', emoji: '🚀',
    meanings: ['突破口・大躍進', '故障', '休憩', '挑戦'] },
  { a: 'head', b: 'quarters', word: 'headquarters', ja: '本部・本社', emoji: '🏢',
    meanings: ['本部・本社', '頭痛', '四分の一', '住所'] },
  { a: 'master', b: 'piece', word: 'masterpiece', ja: '傑作', emoji: '🎨',
    meanings: ['傑作', '主人', '断片', '部品'] },
  { a: 'with', b: 'drawal', word: 'withdrawal', ja: '撤退・引き出し', emoji: '🏃',
    meanings: ['撤退・引き出し', '結婚', '到着', '配達'] },
  { a: 'draw', b: 'back', word: 'drawback', ja: '欠点・不利な点', emoji: '⚠️',
    meanings: ['欠点・不利な点', '描画', '休憩', '回復'] },
  { a: 'out', b: 'look', word: 'outlook', ja: '見通し・展望', emoji: '🔭',
    meanings: ['見通し・展望', '外出', '見せかけ', '輪郭'] },
  { a: 'down', b: 'fall', word: 'downfall', ja: '没落・崩壊', emoji: '📉',
    meanings: ['没落・崩壊', '下り坂', '降水量', '失敗'] },
  { a: 'frame', b: 'work', word: 'framework', ja: '枠組み・骨組み', emoji: '🏗️',
    meanings: ['枠組み・骨組み', '額縁', '労働', '構造物'] },
  { a: 'mile', b: 'stone', word: 'milestone', ja: '画期的出来事', emoji: '🎯',
    meanings: ['画期的出来事', '距離', '岩石', '記念碑'] },
  { a: 'strong', b: 'hold', word: 'stronghold', ja: '拠点・要塞', emoji: '🏰',
    meanings: ['拠点・要塞', '強い握力', '強情', '保管'] },

  // 시사·뉴스
  { a: 'out', b: 'break', word: 'outbreak', ja: '発生・勃発', emoji: '🦠',
    meanings: ['発生・勃発', '休憩', '外出', '故障'] },
  { a: 'over', b: 'come', word: 'overcome', ja: '克服する', emoji: '💪',
    meanings: ['克服する', 'やって来る', '乗り越え', '到着'] },
  { a: 'income', b: 'tax', word: 'incometax', ja: '所得税', emoji: '💰',
    meanings: ['所得税', '収入', '税務署', '給料'] },
  { a: 'high', b: 'light', word: 'highlight', ja: '強調・見どころ', emoji: '✨',
    meanings: ['強調・見どころ', '高い光', '高地', '重さ'] },
  { a: 'stand', b: 'point', word: 'standpoint', ja: '観点・視点', emoji: '👁️',
    meanings: ['観点・視点', '立ち位置', '駅', '基準'] },
  { a: 'view', b: 'point', word: 'viewpoint', ja: '視点・観点', emoji: '🎭',
    meanings: ['視点・観点', '展望', 'カメラ', '景色'] },
  { a: 'turn', b: 'over', word: 'turnover', ja: '売上・離職率', emoji: '💼',
    meanings: ['売上・離職率', '回転', '裏返し', 'パイ'] },
  { a: 'set', b: 'back', word: 'setback', ja: '挫折・後退', emoji: '😞',
    meanings: ['挫折・後退', '設定', '背景', '過去'] },
  { a: 'feed', b: 'back', word: 'feedback', ja: 'フィードバック', emoji: '💬',
    meanings: ['フィードバック', '食事', '返却', '応答'] },
  { a: 'work', b: 'force', word: 'workforce', ja: '労働力', emoji: '👷',
    meanings: ['労働力', '強制労働', '仕事の力', '会社員'] },

  // 학문·기술
  { a: 'in', b: 'sight', word: 'insight', ja: '洞察力', emoji: '🧠',
    meanings: ['洞察力', '視力', '内側', '景色'] },
  { a: 'out', b: 'come', word: 'outcome', ja: '結果', emoji: '🎲',
    meanings: ['結果', '出口', '退場', '到着'] },
  { a: 'break', b: 'down', word: 'breakdown', ja: '故障・分析', emoji: '🔧',
    meanings: ['故障・分析', '休憩', '降下', '休日'] },
  { a: 'over', b: 'view', word: 'overview', ja: '概要・概観', emoji: '📋',
    meanings: ['概要・概観', '見過ごし', '上から見る', '評価'] },
  { a: 'back', b: 'ground', word: 'background', ja: '背景・経歴', emoji: '🎬',
    meanings: ['背景・経歴', '地下', '裏庭', '基礎'] },
  { a: 'fore', b: 'cast', word: 'forecast', ja: '予報・予測', emoji: '🌦️',
    meanings: ['予報・予測', '前進', '配役', '前置き'] },
  { a: 'land', b: 'mark', word: 'landmark', ja: '名所・画期的', emoji: '🗽',
    meanings: ['名所・画期的', '地面', '土地', '記号'] },
  { a: 'check', b: 'point', word: 'checkpoint', ja: '検問所・関門', emoji: '🛂',
    meanings: ['検問所・関門', '小切手', '確認', '点数'] },
  { a: 'turn', b: 'point', word: 'turningpoint', ja: '転換点', emoji: '🔀',
    meanings: ['転換点', '回転', '方向', '回数'] },
  { a: 'wide', b: 'spread', word: 'widespread', ja: '広範囲な', emoji: '🌐',
    meanings: ['広範囲な', '広い道', '広がり', '幅広い'] },

  // 추상·심리
  { a: 'self', b: 'esteem', word: 'selfesteem', ja: '自尊心', emoji: '💖',
    meanings: ['自尊心', '自信', '自分', '尊敬'] },
  { a: 'mind', b: 'set', word: 'mindset', ja: '考え方・心構え', emoji: '🧘',
    meanings: ['考え方・心構え', '記憶力', '頭の中', '決意'] },
  { a: 'side', b: 'effect', word: 'sideeffect', ja: '副作用', emoji: '💊',
    meanings: ['副作用', '横の効果', '影響', '別の面'] },
  { a: 'whole', b: 'sale', word: 'wholesale', ja: '卸売り', emoji: '📦',
    meanings: ['卸売り', '大量販売', '全部', 'バーゲン'] },
  { a: 'over', b: 'whelm', word: 'overwhelm', ja: '圧倒する', emoji: '🌊',
    meanings: ['圧倒する', '上から', '大量', '完璧'] },
  { a: 'under', b: 'mine', word: 'undermine', ja: '弱体化させる', emoji: '⛏️',
    meanings: ['弱体化させる', '地下鉱山', '私の下', '隠れる'] },
  { a: 'with', b: 'stand', word: 'withstand', ja: '耐える', emoji: '🛡️',
    meanings: ['耐える', '一緒に立つ', '我慢', '反対'] },
  { a: 'over', b: 'look', word: 'overlook', ja: '見落とす・見渡す', emoji: '👀',
    meanings: ['見落とす・見渡す', '上から見る', '監視', '無視'] },
  { a: 'up', b: 'rising', word: 'uprising', ja: '反乱・蜂起', emoji: '✊',
    meanings: ['反乱・蜂起', '上昇', '日の出', '増加'] },
  { a: 'down', b: 'turn', word: 'downturn', ja: '景気後退', emoji: '📊',
    meanings: ['景気後退', '下降', '回転', '衰退'] },

  // 일상 비유
  { a: 'eye', b: 'witness', word: 'eyewitness', ja: '目撃者', emoji: '👁️',
    meanings: ['目撃者', '目医者', '目立つ', '視力'] },
  { a: 'short', b: 'coming', word: 'shortcoming', ja: '欠点・短所', emoji: '🚫',
    meanings: ['欠点・短所', '近道', '短期間', '小さい'] },
  { a: 'count', b: 'down', word: 'countdown', ja: 'カウントダウン', emoji: '⏰',
    meanings: ['カウントダウン', '計算', '数える', '減算'] },
  { a: 'fund', b: 'raising', word: 'fundraising', ja: '資金集め', emoji: '💵',
    meanings: ['資金集め', '基金', '上昇', '投資'] },
  { a: 'eye', b: 'sight', word: 'eyesight', ja: '視力', emoji: '👓',
    meanings: ['視力', '目の前', '視界', '監視'] },
  { a: 'foot', b: 'hold', word: 'foothold', ja: '足場・基盤', emoji: '🦶',
    meanings: ['足場・基盤', '足の裏', '靴', '支え'] },
  { a: 'short', b: 'sighted', word: 'shortsighted', ja: '近視眼的', emoji: '🤓',
    meanings: ['近視眼的', '近い', '視力', '短い'] },
  { a: 'far', b: 'sighted', word: 'farsighted', ja: '遠視・先見の明', emoji: '🦅',
    meanings: ['遠視・先見の明', '遠くの', '見通し', '遠視'] },
  { a: 'on', b: 'going', word: 'ongoing', ja: '進行中の', emoji: '🔄',
    meanings: ['進行中の', '出発', '継続', '前進'] },
  { a: 'in', b: 'put', word: 'input', ja: '入力・投入', emoji: '⌨️',
    meanings: ['入力・投入', '内部', '入る', '中身'] },
];

// ===== 의미 추측 게임용 데이터 (위와 동일 활용) =====
// COMPOUND_HARD 자체에 meanings 4지선다 포함 → 별도 데이터 불필요


// ============================================================
// 🎯 영검 준1급 문법 50문제 (고급 영역)
// 도치, 강조, 분사구문, 복합관계사, 명사절, 가정법 등
// ============================================================
const GRAMMAR_PRE1_TOPICS = [
  // ===== 1. 도치 (Inversion) - 8문제 =====
  {
    id: 'p1', type: 'mc', cat: '🔄 倒置', topic: '否定副詞 + 倒置',
    q: "Never ___ such a beautiful sunset before.",
    options: ['I have seen', 'have I seen', 'I saw', 'did I see'],
    answer: 1,
    explanation: '否定副詞(Never)が文頭に来ると主語と助動詞が倒置。 Never have I seen が正しい'
  },
  {
    id: 'p2', type: 'mc', cat: '🔄 倒置', topic: 'Hardly + 倒置',
    q: "Hardly ___ home when it started to rain.",
    options: ['I had reached', 'had I reached', 'I reached', 'did I reach'],
    answer: 1,
    explanation: 'Hardly/Scarcely は文頭で倒置誘発。 Hardly had I + p.p. (~するやいなや)'
  },
  {
    id: 'p3', type: 'mc', cat: '🔄 倒置', topic: 'Not only + 倒置',
    q: "Not only ___ the test, but he also got the highest score.",
    options: ['he passed', 'did he pass', 'he did pass', 'passed he'],
    answer: 1,
    explanation: 'Not only が文頭で倒置。 Not only did he pass, but he also...'
  },
  {
    id: 'p4', type: 'fill', cat: '🔄 倒置', topic: 'Only + 倒置',
    q: "Only after the meeting ___ ___ realize his mistake.",
    answer: 'did he',
    hint: 'Only + 副詞句 が文頭 → 主語と助動詞が倒置 (did he realize)',
    explanation: 'Only after... 文頭で倒置。 Only after the meeting did he realize'
  },
  {
    id: 'p5', type: 'mc', cat: '🔄 倒置', topic: 'So + 倒置',
    q: "I love sushi, and so ___ my brother.",
    options: ['do', 'does', 'is', 'has'],
    answer: 1,
    explanation: 'so + 動詞 + 主語 (~もそうだ)。 my brother は3人称単数なので does'
  },
  {
    id: 'p6', type: 'mc', cat: '🔄 倒置', topic: 'Neither + 倒置',
    q: "I don\'t like horror movies, and neither ___ my sister.",
    options: ['do', 'does', 'is', 'has'],
    answer: 1,
    explanation: 'neither + 動詞 + 主語 (~もそうではない)。 my sister は3単 → does'
  },
  {
    id: 'p7', type: 'mc', cat: '🔄 倒置', topic: 'Little + 倒置',
    q: "Little ___ that his life would change forever.",
    options: ['he knew', 'did he know', 'he did know', 'knew he'],
    answer: 1,
    explanation: 'Little (~ほとんど~ない) が文頭 → 倒置。 Little did he know (彼は思いもしなかった)'
  },
  {
    id: 'p8', type: 'fill', cat: '🔄 倒置', topic: 'Seldom + 倒置',
    q: "Seldom ___ ___ such a brilliant performance.",
    answer: 'have I',
    hint: '頻度の少なさを表す副詞 (seldom, rarely) → 文頭で倒置 (have I + p.p.)',
    explanation: 'Seldom/Rarely have I + p.p. (めったに~したことがない)'
  },

  // ===== 2. 강조 (Emphasis) - 6문제 =====
  {
    id: 'p9', type: 'mc', cat: '💪 強調', topic: 'It is X that 強調構文',
    q: "It was John ___ broke the window yesterday.",
    options: ['who', 'which', 'whose', 'that'],
    answer: 0,
    explanation: 'It is X that 강조구문。 X가 사람이면 who 가능 (또는 that)'
  },
  {
    id: 'p10', type: 'mc', cat: '💪 強調', topic: 'It is X that (시간 강조)',
    q: "It was yesterday ___ I met him at the station.",
    options: ['who', 'which', 'when', 'that'],
    answer: 3,
    explanation: '時間が強調されると関係詞は that を使うのが一般的'
  },
  {
    id: 'p11', type: 'fill', cat: '💪 強調', topic: 'do + 動詞 강조',
    q: "I ___ believe what he said yesterday.",
    answer: 'do',
    hint: '動詞を強調するには do/does/did + 動詞の原形',
    explanation: 'do + 動詞の原形 で強調 (本当に~だ)。 I do believe = 本当に信じる'
  },
  {
    id: 'p12', type: 'mc', cat: '💪 強調', topic: 'What + 강조',
    q: "What I really need ___ a long vacation.",
    options: ['is', 'are', 'be', 'has'],
    answer: 0,
    explanation: 'What 절は単数扱い → is。 (本当に必要なのは~だ)'
  },
  {
    id: 'p13', type: 'mc', cat: '💪 強調', topic: '재귀대명사 강조',
    q: "She ___ designed the entire house.",
    options: ['her', 'hers', 'herself', 'she'],
    answer: 2,
    explanation: '再帰代名詞による強調 (彼女自身が設計した)'
  },
  {
    id: 'p14', type: 'mc', cat: '💪 強調', topic: 'the very + 명사',
    q: "This is ___ very book I was looking for.",
    options: ['a', 'an', 'the', 'one'],
    answer: 2,
    explanation: 'the very + 名詞 = まさにその~'
  },

  // ===== 3. 고급 분사구문 - 8문제 =====
  {
    id: 'p15', type: 'mc', cat: '📝 分詞構文', topic: 'Having + p.p.',
    q: "___ his homework, he went out to play.",
    options: ['Finishing', 'Finished', 'Having finished', 'To finish'],
    answer: 2,
    explanation: 'Having + p.p. = 完了分詞構文 (~し終えてから)'
  },
  {
    id: 'p16', type: 'mc', cat: '📝 分詞構文', topic: '수동 분사구문',
    q: "___ in 1960, this building is now a museum.",
    options: ['Building', 'Built', 'Having built', 'Being build'],
    answer: 1,
    explanation: '受動の分詞構文 (Being) Built + 過去分詞。 (~され)'
  },
  {
    id: 'p17', type: 'fill', cat: '📝 分詞構文', topic: '독립 분사구문',
    q: "Weather ___, we will go on a picnic tomorrow.",
    answer: 'permitting',
    hint: '독立분사구문 (天気が許せば)。 weather + 現在分詞',
    explanation: 'Weather permitting = 天気が許せば (独立分詞構文)'
  },
  {
    id: 'p18', type: 'mc', cat: '📝 分詞構文', topic: '부정 분사구문',
    q: "___ what to say, she remained silent.",
    options: ['Knowing not', 'Not knowing', 'Don\'t know', 'Not to know'],
    answer: 1,
    explanation: '分詞構文の否定は Not + V-ing (Not knowing)'
  },
  {
    id: 'p19', type: 'mc', cat: '📝 分詞構文', topic: 'with + 명사 + 분사',
    q: "He was reading a book with his dog ___ beside him.",
    options: ['sleep', 'sleeping', 'slept', 'to sleep'],
    answer: 1,
    explanation: 'with + 名詞 + V-ing (能動)/p.p.(受動)。 犬は寝ている → sleeping'
  },
  {
    id: 'p20', type: 'mc', cat: '📝 分詞構文', topic: 'with + 名詞 + p.p.',
    q: "She listened to the music with her eyes ___.",
    options: ['close', 'closing', 'closed', 'to close'],
    answer: 2,
    explanation: '目が閉じられた状態 (受動) → with her eyes closed'
  },
  {
    id: 'p21', type: 'fill', cat: '📝 分詞構文', topic: '완료 수동 분사구문',
    q: "___ finished, the project will be celebrated.",
    answer: 'Once',
    hint: 'Once finished = いったん終われば (短縮分詞構文)',
    explanation: 'Once + 過去分詞 = いったん~されれば (短縮形)'
  },
  {
    id: 'p22', type: 'mc', cat: '📝 分詞構文', topic: 'considering',
    q: "___ his age, he is very mature.",
    options: ['Consider', 'Considering', 'Considered', 'To consider'],
    answer: 1,
    explanation: 'Considering = ~を考えると (前置詞的に使う分詞)'
  },

  // ===== 4. 복합 관계대명사 - 6문제 =====
  {
    id: 'p23', type: 'mc', cat: '🔗 関係詞', topic: 'whoever',
    q: "___ wins the contest will receive a prize.",
    options: ['Who', 'Whoever', 'Whomever', 'Whose'],
    answer: 1,
    explanation: 'Whoever = ~する人は誰でも (= anyone who)'
  },
  {
    id: 'p24', type: 'mc', cat: '🔗 関係詞', topic: 'whatever',
    q: "You can choose ___ you want from the menu.",
    options: ['what', 'which', 'whatever', 'whichever'],
    answer: 2,
    explanation: 'whatever = ~するものは何でも'
  },
  {
    id: 'p25', type: 'mc', cat: '🔗 関係詞', topic: 'whichever',
    q: "Take ___ book you like best.",
    options: ['what', 'whatever', 'whichever', 'whoever'],
    answer: 2,
    explanation: 'whichever + 名詞 = 限られた選択肢からどちらでも'
  },
  {
    id: 'p26', type: 'fill', cat: '🔗 関係詞', topic: 'no matter what',
    q: "I will support you ___ ___ happens.",
    answer: 'no matter',
    hint: 'no matter what (= whatever) = 何が起こっても',
    explanation: 'no matter what = 何が~しようとも (≒ whatever)'
  },
  {
    id: 'p27', type: 'mc', cat: '🔗 関係詞', topic: 'wherever',
    q: "He follows me ___ I go.",
    options: ['where', 'wherever', 'whatever', 'whoever'],
    answer: 1,
    explanation: 'wherever = ~するところはどこでも'
  },
  {
    id: 'p28', type: 'mc', cat: '🔗 関係詞', topic: 'however',
    q: "___ tired you are, you must finish this work.",
    options: ['How', 'However', 'Whatever', 'Whichever'],
    answer: 1,
    explanation: 'However + 形容詞 = どんなに~でも'
  },

  // ===== 5. 명사절·간접의문문 - 6문제 =====
  {
    id: 'p29', type: 'mc', cat: '📚 名詞節', topic: 'whether/if',
    q: "I don\'t know ___ he will come or not.",
    options: ['that', 'whether', 'what', 'which'],
    answer: 1,
    explanation: 'whether ... or not (~するかどうか)。 if も可だが or not と一緒なら whether'
  },
  {
    id: 'p30', type: 'mc', cat: '📚 名詞節', topic: '간접의문문 어순',
    q: "Could you tell me ___ ?",
    options: ['where is the station', 'where the station is', 'is where the station', 'the station where is'],
    answer: 1,
    explanation: '間接疑問文は平叙文の語順 (where + 主語 + 動詞)'
  },
  {
    id: 'p31', type: 'fill', cat: '📚 名詞節', topic: 'that 명사절',
    q: "___ ___ he is honest is well known.",
    answer: 'The fact',
    hint: 'The fact (that) + 主語 + 動詞 = ~という事実',
    explanation: 'The fact that S + V = ~という事実 (同格の that)'
  },
  {
    id: 'p32', type: 'mc', cat: '📚 名詞節', topic: 'what 명사절',
    q: "___ surprised me was his sudden visit.",
    options: ['That', 'What', 'Which', 'Who'],
    answer: 1,
    explanation: 'What = the thing(s) that。 主語位置で先行詞を含む関係代名詞'
  },
  {
    id: 'p33', type: 'mc', cat: '📚 名詞節', topic: 'the way + 명사절',
    q: "I like the way ___ she sings.",
    options: ['how', 'when', 'that', 'which'],
    answer: 2,
    explanation: 'the way how は使えない。 the way (that) または the way だけ'
  },
  {
    id: 'p34', type: 'mc', cat: '📚 名詞節', topic: 'whether 주어',
    q: "___ he comes or not is up to him.",
    options: ['That', 'If', 'Whether', 'What'],
    answer: 2,
    explanation: '主語位置では if は使えない。 Whether を使う'
  },

  // ===== 6. 고급 가정법 - 6문제 =====
  {
    id: 'p35', type: 'mc', cat: '🎲 仮定法', topic: '혼합 가정법',
    q: "If I had studied harder, I ___ now.",
    options: ['would succeed', 'would have succeeded', 'will succeed', 'succeeded'],
    answer: 0,
    explanation: '混合仮定法: 過去の仮定 (had p.p.) + 現在の結果 (would + 動詞の原形)'
  },
  {
    id: 'p36', type: 'mc', cat: '🎲 仮定法', topic: 'were to',
    q: "If I ___ to win the lottery, I would travel the world.",
    options: ['was', 'were', 'will be', 'have been'],
    answer: 1,
    explanation: 'If 主語 were to V = (起こりそうもない)未来の仮定'
  },
  {
    id: 'p37', type: 'fill', cat: '🎲 仮定法', topic: 'as if + 仮定法 過去完了',
    q: "He talks ___ ___ he had been there.",
    answer: 'as if',
    hint: 'as if + 仮定法過去完了 (まるで~したかのように)',
    explanation: 'as if + had p.p. = まるで~したかのように (過去の事実と反対)'
  },
  {
    id: 'p38', type: 'mc', cat: '🎲 仮定法', topic: 'But for',
    q: "___ your help, I would have failed.",
    options: ['But for', 'Although', 'Because of', 'Despite'],
    answer: 0,
    explanation: 'But for = If it had not been for = ~がなかったら'
  },
  {
    id: 'p39', type: 'mc', cat: '🎲 仮定法', topic: 'Should + 倒置',
    q: "___ you need any help, please call me.",
    options: ['If should', 'Should', 'Were', 'Had'],
    answer: 1,
    explanation: 'If you should V → Should you V (if 省略時の倒置)'
  },
  {
    id: 'p40', type: 'mc', cat: '🎲 仮定法', topic: 'It is high time',
    q: "It is high time we ___ home.",
    options: ['go', 'went', 'have gone', 'will go'],
    answer: 1,
    explanation: 'It is (high) time + 仮定法過去 (もう~する時間だ)'
  },

  // ===== 7. 고급 시제·완료 - 5문제 =====
  {
    id: 'p41', type: 'mc', cat: '⏰ 時制', topic: '미래완료',
    q: "By next year, I ___ in this company for ten years.",
    options: ['will work', 'will be working', 'will have worked', 'work'],
    answer: 2,
    explanation: '未来のある時点までの完了/継続 → will have + p.p. (未来完了)'
  },
  {
    id: 'p42', type: 'mc', cat: '⏰ 時制', topic: '시제 일치 예외',
    q: "Our teacher said that water ___ at 100 degrees.",
    options: ['boils', 'boiled', 'has boiled', 'will boil'],
    answer: 0,
    explanation: '不変の真理は時制の一致を受けない (現在形のまま)'
  },
  {
    id: 'p43', type: 'fill', cat: '⏰ 時制', topic: '미래완료진행',
    q: "By 2030, I ___ ___ ___ studying English for 20 years.",
    answer: 'will have been',
    hint: 'will have been V-ing = ~してきたことになるだろう (未来完了進行)',
    explanation: 'will have been + V-ing = 未来のある時点まで継続している動作'
  },
  {
    id: 'p44', type: 'mc', cat: '⏰ 時制', topic: 'No sooner ~ than',
    q: "No sooner had I sat down ___ the phone rang.",
    options: ['when', 'than', 'as', 'while'],
    answer: 1,
    explanation: 'No sooner ~ than = ~するやいなや'
  },
  {
    id: 'p45', type: 'mc', cat: '⏰ 時制', topic: 'used to / be used to',
    q: "I ___ getting up early because of my new job.",
    options: ['used to', 'am used to', 'use to', 'have used to'],
    answer: 1,
    explanation: 'be used to + V-ing = ~に慣れている (現在の状態)'
  },

  // ===== 8. 부사적 의미·관용 표현 - 5문제 =====
  {
    id: 'p46', type: 'mc', cat: '💡 慣用表現', topic: 'so that ~ may',
    q: "He works hard so that he ___ his dream.",
    options: ['achieves', 'will achieve', 'can achieve', 'achieved'],
    answer: 2,
    explanation: 'so that + 主語 + can/may + 動詞の原形 = ~するために (目的)'
  },
  {
    id: 'p47', type: 'fill', cat: '💡 慣用表現', topic: 'lest',
    q: "He spoke quietly lest he ___ disturb the baby.",
    answer: 'should',
    hint: 'lest + 主語 + (should) + 動詞の原形 = ~しないように',
    explanation: 'lest = ~しないように (should + 動詞の原形)'
  },
  {
    id: 'p48', type: 'mc', cat: '💡 慣用表現', topic: 'as ~ as possible',
    q: "Please reply as soon ___ possible.",
    options: ['that', 'as', 'than', 'so'],
    answer: 1,
    explanation: 'as ~ as possible = できるだけ~'
  },
  {
    id: 'p49', type: 'mc', cat: '💡 慣用表現', topic: 'cannot help V-ing',
    q: "I cannot help ___ when he tells jokes.",
    options: ['laugh', 'laughing', 'to laugh', 'laughed'],
    answer: 1,
    explanation: 'cannot help V-ing = ~せずにはいられない'
  },
  {
    id: 'p50', type: 'mc', cat: '💡 慣用表現', topic: 'no longer',
    q: "He ___ works at the bank.",
    options: ['no longer', 'no more', 'not longer', 'any more'],
    answer: 0,
    explanation: 'no longer = もはや~ない (動詞の前または be 動詞の後)'
  },
];


// ============================================================
// 🎯 영검 준1급 라이팅 데이터 (1~8주제)
// 120~150단어, 4관점 중 2개 사용 의무
// 관점 (POV): Environment, Economy, Society, Health, Technology, Education, Ethics, Culture
// ============================================================
const WRITING_PRE1_PART1 = [
  {
    id: 'pw1',
    cat: '🤖 AI・技術',
    q: 'Should governments limit the use of artificial intelligence in society?',
    qja: '政府は 社会における AI の 使用を 制限すべきですか?',
    answer: [
      "I believe governments should limit the use of artificial intelligence in society.",
      "From a social perspective, AI is rapidly replacing many human jobs, and millions of workers risk unemployment without proper protection. Without government regulation, this transition could create serious inequality between those who can adapt to new technologies and those who cannot.",
      "Furthermore, from an ethical standpoint, AI systems can be used to spread misinformation, create deepfakes, or violate privacy through facial recognition. Without clear rules, these technologies may threaten democratic values and individual freedoms.",
      "Without intervention, the negative consequences could affect generations to come.",
      "Therefore, governments should establish clear regulations to ensure AI develops in ways that benefit all members of society."
    ],
    pov: ['Society', 'Ethics'],
    hint: '社会的観点(雇用)・倫理的観点(誤情報・プライバシー) → 結論',
    answerNo: [
      "I do not think governments should heavily limit artificial intelligence in society.",
      "From an economic perspective, AI is driving innovation and creating new industries. Countries that overregulate AI risk falling behind their international competitors, losing both economic opportunities and skilled workers to other nations.",
      "In addition, from a technological standpoint, AI offers tremendous benefits in fields like medicine, education, and disaster response. Excessive restrictions would prevent us from solving major problems such as diseases and climate change.",
      "Many AI applications also operate across borders, making strict national regulations difficult to enforce.",
      "For these reasons, governments should support AI development with reasonable guidelines rather than strict limits."
    ],
    povNo: ['Economy', 'Technology'],
    hintNo: '경제(혁신·경쟁력)・기술(의료·교육 혜택) 관점 → 결론'
  },
  {
    id: 'pw2',
    cat: '🌍 環境',
    q: 'Will renewable energy completely replace fossil fuels in the future?',
    qja: '再生可能エネルギーは 将来 化石燃料を 完全に 置き換えますか?',
    answer: [
      "I believe renewable energy will completely replace fossil fuels in the future.",
      "From an environmental perspective, climate change is forcing humanity to abandon fossil fuels. Solar, wind, and hydropower produce no carbon emissions and have become essential for protecting our planet from catastrophic warming.",
      "Moreover, from a technological standpoint, renewable energy costs have fallen dramatically over the past decade. Solar panels and batteries are now cheaper than coal in many countries, making the transition economically inevitable.",
      "Recent breakthroughs in battery storage and grid technology are also accelerating this transition globally.",
      "Therefore, fossil fuels will likely be completely replaced by clean energy within the next few decades."
    ],
    pov: ['Environment', 'Technology'],
    hint: '환경(기후변화)・기술(비용 하락) 관점 → 결론',
    answerNo: [
      "I do not think renewable energy will completely replace fossil fuels in the foreseeable future.",
      "From a technological perspective, renewable sources like solar and wind are unreliable because they depend on weather. Without major breakthroughs in energy storage, fossil fuels remain necessary for stable electricity supply.",
      "In addition, from an economic standpoint, many developing countries cannot afford the high upfront costs of renewable infrastructure. They will continue to rely on cheaper fossil fuels for decades to maintain economic growth.",
      "Energy diversity remains essential to ensure stable supply during periods of high demand or supply disruption.",
      "For these reasons, fossil fuels and renewable energy will likely coexist for a long time."
    ],
    povNo: ['Technology', 'Economy'],
    hintNo: '기술(불안정성)・경제(개도국 비용) 관점 → 결론'
  },
  {
    id: 'pw3',
    cat: '🌍 環境',
    q: 'Should plastic packaging be completely banned?',
    qja: 'プラスチック包装は 完全に 禁止すべきですか?',
    answer: [
      "I strongly believe plastic packaging should be completely banned.",
      "From an environmental perspective, plastic waste is destroying our oceans and threatening marine life. Microplastics now contaminate the entire food chain, eventually reaching human bodies through the seafood we consume.",
      "Furthermore, from a health standpoint, chemicals from plastic containers leak into food and beverages, potentially causing hormonal problems and other long-term health issues. A ban would protect both nature and human well-being.",
      "Several European countries have already started implementing such policies with positive environmental results.",
      "Therefore, completely banning plastic packaging is necessary for a sustainable future."
    ],
    pov: ['Environment', 'Health'],
    hint: '환경(해양 오염)・건강(미세플라스틱) 관점 → 결론',
    answerNo: [
      "I do not believe plastic packaging should be completely banned.",
      "From an economic perspective, plastic is essential for food preservation and reduces waste by extending shelf life. A complete ban would dramatically increase food costs and harm small businesses that depend on cheap, lightweight packaging.",
      "In addition, from a social standpoint, plastic plays a vital role in medicine, particularly in single-use medical equipment that prevents infection. Banning all plastics could endanger patient safety in hospitals.",
      "A more practical approach is to invest in better recycling systems and improved plastic technology.",
      "Instead of a complete ban, we should focus on better recycling and biodegradable alternatives."
    ],
    povNo: ['Economy', 'Society'],
    hintNo: '경제(식품 보존·비용)・사회(의료) 관점 → 결론'
  },
  {
    id: 'pw4',
    cat: '🎓 教育',
    q: 'Should higher education be free for everyone?',
    qja: '高等教育は すべての人に 無料であるべきですか?',
    answer: [
      "I firmly believe that higher education should be free for everyone.",
      "From a social perspective, free higher education reduces inequality by giving talented students from low-income families the same opportunities as wealthy ones. This creates a more fair society where success depends on ability rather than family wealth.",
      "Moreover, from an economic standpoint, an educated workforce drives innovation and economic growth. Countries like Germany and Norway have shown that free university education leads to stronger economies and lower unemployment rates.",
      "Investing in human capital is one of the most reliable predictors of long-term national prosperity.",
      "Therefore, making higher education free is a wise investment in our nation's future."
    ],
    pov: ['Society', 'Economy'],
    hint: '사회(불평등 해소)・경제(혁신·성장) 관점 → 결론',
    answerNo: [
      "I do not think higher education should be completely free for everyone.",
      "From an economic perspective, providing free university education would require massive tax increases, placing a heavy burden on working-class families who may not directly benefit from it. The cost of high-quality education must come from somewhere.",
      "In addition, from an educational standpoint, when students pay tuition, they tend to study harder and value their education more. Free education may reduce student motivation and lower the overall quality of universities.",
      "Targeted financial aid for low-income students can achieve fairness without burdening taxpayers excessively.",
      "Therefore, scholarships for needy students are a better solution than universal free education."
    ],
    povNo: ['Economy', 'Education'],
    hintNo: '경제(세금 부담)・교육(동기·질) 관점 → 결론'
  },
  {
    id: 'pw5',
    cat: '🎓 教育',
    q: 'Will online learning eventually replace traditional classrooms?',
    qja: 'オンライン学習は 最終的に 伝統的な 教室を 置き換えますか?',
    answer: [
      "I believe online learning will eventually replace most traditional classrooms.",
      "From a technological perspective, advanced platforms with AI tutors and virtual reality can now provide personalized education tailored to each student's pace and learning style. This level of individual attention is impossible in crowded classrooms.",
      "Furthermore, from an economic standpoint, online education dramatically reduces costs for schools, students, and society. Without expensive buildings and physical materials, quality education can reach millions more people, especially in remote areas.",
      "The global pandemic has already proven that effective learning can happen outside traditional school buildings.",
      "Therefore, traditional classrooms will likely become obsolete within the next few decades."
    ],
    pov: ['Technology', 'Economy'],
    hint: '기술(AI 튜터·VR)・경제(비용 절감) 관점 → 결론',
    answerNo: [
      "I do not believe online learning will replace traditional classrooms.",
      "From a social perspective, students need face-to-face interaction with peers and teachers to develop communication and social skills. Online learning lacks the human connection that helps young people grow emotionally and form lifelong friendships.",
      "In addition, from an educational standpoint, certain subjects like science experiments, art, and physical education require hands-on practice that cannot be effectively delivered through screens. The quality of learning would suffer significantly.",
      "Many studies have shown that fully online students often have lower completion rates than in-person learners.",
      "Therefore, traditional classrooms will continue to play an irreplaceable role in education."
    ],
    povNo: ['Society', 'Education'],
    hintNo: '사회(대면 상호작용)・교육(실습 과목) 관점 → 결론'
  },
  {
    id: 'pw6',
    cat: '👥 社会',
    q: 'Should people work fewer hours per week?',
    qja: '人々は 週の 労働時間を 減らすべきですか?',
    answer: [
      "I strongly support reducing working hours to a four-day week.",
      "From a health perspective, long working hours cause stress, depression, and serious physical illnesses. Studies have shown that overwork shortens life expectancy and dramatically increases the risk of heart disease.",
      "Moreover, from a social standpoint, shorter working weeks allow people to spend more time with their families, pursue hobbies, and contribute to their communities. This leads to happier societies and stronger relationships.",
      "Several countries that have tested four-day work weeks report no decline in productivity, only happier workers.",
      "Therefore, reducing weekly working hours would benefit both individual well-being and society as a whole."
    ],
    pov: ['Health', 'Society'],
    hint: '건강(스트레스·심장병)・사회(가족·지역사회) 관점 → 결론',
    answerNo: [
      "I do not think reducing working hours is realistic for most companies.",
      "From an economic perspective, fewer working hours could reduce productivity and harm small businesses with tight budgets. Companies might be forced to hire more workers or pay overtime, which would increase costs and prices for consumers.",
      "In addition, from a social standpoint, many workers actually prefer longer hours to earn more money for their families. Forcing shorter weeks would limit their ability to save for major life goals like buying a home or supporting their children's education.",
      "Different industries have different needs, and one-size-fits-all policies often fail to serve everyone well.",
      "Therefore, working hours should remain flexible based on individual and company needs."
    ],
    povNo: ['Economy', 'Society'],
    hintNo: '경제(생산성)・사회(소득 선택) 관점 → 결론'
  },
  {
    id: 'pw7',
    cat: '💉 医療',
    q: 'Should genetic engineering be used to prevent inherited diseases?',
    qja: '遺伝子工学は 遺伝性疾患の 予防に 使われるべきですか?',
    answer: [
      "I strongly support using genetic engineering to prevent inherited diseases.",
      "From a health perspective, this technology could eliminate devastating conditions like Huntington's disease and cystic fibrosis from future generations. Saving children from suffering and early death is a powerful moral argument.",
      "Furthermore, from an economic standpoint, treating genetic diseases costs healthcare systems billions of dollars every year. Prevention through gene editing would free up resources for other important medical needs and reduce family financial burdens.",
      "Strict ethical guidelines can ensure this technology is used responsibly to help suffering families.",
      "Therefore, genetic engineering should be carefully developed to fight inherited diseases."
    ],
    pov: ['Health', 'Economy'],
    hint: '건강(질병 근절)・경제(의료비 절감) 관점 → 결론',
    answerNo: [
      "I have serious concerns about using genetic engineering, even for disease prevention.",
      "From an ethical perspective, modifying human genes could lead to a slippery slope where parents choose appearance, intelligence, or personality traits. This would create genetic inequality and a divided society of \"designed\" and \"natural\" people.",
      "Moreover, from a health standpoint, gene editing technology is still new, and unintended changes could be passed down to all future generations. Mistakes made today could harm humanity for centuries.",
      "We must also consider how this technology might be misused if regulations are weak or inconsistent across countries.",
      "Therefore, we should not modify the human genome until the technology is proven completely safe."
    ],
    povNo: ['Ethics', 'Health'],
    hintNo: '윤리(설계 아기)・건강(미지의 부작용) 관점 → 결론'
  },
  {
    id: 'pw8',
    cat: '👥 社会',
    q: 'Should people be required to retire at a certain age?',
    qja: '人々は 一定の 年齢で 退職を 義務付けられるべきですか?',
    answer: [
      "I believe mandatory retirement ages serve an important function in society.",
      "From an economic perspective, a fixed retirement age opens up jobs for younger generations entering the workforce. Without retirement, young people would face limited career opportunities and stagnant promotion prospects throughout their lives.",
      "In addition, from a health standpoint, certain professions like surgery, aviation, and emergency response require physical and mental sharpness that naturally declines with age. Mandatory retirement protects both workers and the public from age-related performance issues.",
      "Clear retirement policies also allow companies to plan workforce development effectively.",
      "Therefore, retirement ages should be maintained for the benefit of society."
    ],
    pov: ['Economy', 'Health'],
    hint: '경제(청년 일자리)・건강(직업적 안전) 관점 → 결론',
    answerNo: [
      "I am opposed to forcing people to retire at a specific age.",
      "From an ethical perspective, mandatory retirement is a form of age discrimination. Workers should be evaluated on their abilities and contributions, not their birth date. Many older professionals remain highly capable and motivated well past traditional retirement ages.",
      "Furthermore, from an economic standpoint, with longer life expectancies, forced retirement creates financial hardship for those who have not saved enough. Many older adults need to keep working to support themselves and their families.",
      "Allowing flexible retirement based on health and ability would benefit both individuals and businesses.",
      "Therefore, retirement should be a personal choice based on individual circumstances."
    ],
    povNo: ['Ethics', 'Economy'],
    hintNo: '윤리(연령 차별)・경제(고령자 생계) 관점 → 결론'
  },
];

// ============================================================
// 🎯 영검 준1급 라이팅 데이터 (9~15주제)
// ============================================================
const WRITING_PRE1_PART2 = [
  {
    id: 'pw9',
    cat: '🌐 国際',
    q: 'Should countries accept more immigrants?',
    qja: '国は より多くの 移民を 受け入れるべきですか?',
    answer: [
      "I believe countries should accept more immigrants in the modern world.",
      "From an economic perspective, immigrants fill critical labor shortages in industries like healthcare, agriculture, and technology. They start new businesses, pay taxes, and help address declining birth rates in developed nations.",
      "Moreover, from a cultural standpoint, immigration enriches society by bringing new ideas, foods, languages, and perspectives. Diverse societies tend to be more innovative and tolerant, producing artists, scientists, and leaders who benefit everyone.",
      "Most successful countries today have benefited enormously from waves of immigration throughout their history.",
      "Therefore, accepting more immigrants is essential for both prosperity and cultural growth."
    ],
    pov: ['Economy', 'Culture'],
    hint: '경제(인력·창업)・문화(다양성·혁신) 관점 → 결론',
    answerNo: [
      "I do not think countries should significantly increase immigration.",
      "From a social perspective, rapid immigration can strain public services like housing, schools, and hospitals. Existing residents may face longer waiting times and rising living costs as infrastructure struggles to keep up with new arrivals.",
      "In addition, from a cultural standpoint, large-scale immigration without proper integration can lead to social tensions and divided communities. Successful integration takes time and requires careful planning rather than rapid expansion.",
      "Most countries should focus on integrating current immigrants well before significantly increasing numbers.",
      "Therefore, immigration policies should be balanced and gradual rather than open-ended."
    ],
    povNo: ['Society', 'Culture'],
    hintNo: '사회(공공서비스)・문화(통합) 관점 → 결론'
  },
  {
    id: 'pw10',
    cat: '🚀 科学',
    q: 'Is space exploration worth the money?',
    qja: '宇宙探査は その費用に 値しますか?',
    answer: [
      "I firmly believe that space exploration is worth its enormous cost.",
      "From a technological perspective, space programs have given us GPS, satellite weather forecasting, and advanced medical imaging. Many everyday inventions, from memory foam to water purification, originated from space research.",
      "Furthermore, from a societal standpoint, space exploration inspires young people to study science and technology, creating the next generation of engineers and innovators. The dream of reaching the stars motivates humanity to solve difficult problems together.",
      "These returns on investment continue to multiply as space technologies advance.",
      "Therefore, the long-term benefits of space exploration far outweigh the financial costs."
    ],
    pov: ['Technology', 'Society'],
    hint: '기술(GPS·의료영상)・사회(과학 영감) 관점 → 결론',
    answerNo: [
      "I do not believe space exploration deserves the vast amounts of money spent on it.",
      "From an economic perspective, the same funds could solve urgent problems on Earth, such as poverty, hunger, and inadequate healthcare. Billions of dollars sent into space could feed millions of starving children right now.",
      "Moreover, from an environmental standpoint, our planet faces serious crises like climate change and species extinction. Instead of dreaming about Mars, we should focus our resources on saving the only home we have.",
      "Until basic human needs are met everywhere, expensive space missions seem difficult to justify morally.",
      "Therefore, space spending should be redirected to address pressing earthly needs."
    ],
    povNo: ['Economy', 'Environment'],
    hintNo: '경제(빈곤·기아 우선)・환경(지구 보호) 관점 → 결론'
  },
  {
    id: 'pw11',
    cat: '📱 メディア',
    q: 'Should social media platforms be more strictly regulated?',
    qja: 'SNS プラットフォームは より厳しく 規制されるべきですか?',
    answer: [
      "I strongly believe social media platforms need stricter regulation.",
      "From a social perspective, unregulated social media spreads dangerous misinformation about elections, vaccines, and public safety. False information can sway voters, harm public health, and even incite violence in extreme cases.",
      "Furthermore, from a health standpoint, unrestricted access to social media is harming young people's mental health. Studies link teenage social media use to rising rates of anxiety, depression, and self-harm, creating a generational health crisis.",
      "Other industries like food and pharmaceuticals are heavily regulated for similar reasons.",
      "Therefore, governments must establish clear rules to protect citizens from these harms."
    ],
    pov: ['Society', 'Health'],
    hint: '사회(허위 정보)・건강(청소년 정신건강) 관점 → 결론',
    answerNo: [
      "I do not support heavy regulation of social media platforms.",
      "From an ethical perspective, strict regulation threatens freedom of speech, which is a fundamental human right. Once governments start deciding what people can post online, the same power could be used to silence political opposition or unpopular ideas.",
      "In addition, from a technological standpoint, social media has become a vital tool for education, business, and global communication. Excessive rules could damage innovation and prevent platforms from serving users effectively.",
      "User education and platform-based moderation can address harmful content without compromising fundamental rights.",
      "Therefore, self-regulation by platforms is preferable to government control."
    ],
    povNo: ['Ethics', 'Technology'],
    hintNo: '윤리(표현의 자유)・기술(혁신) 관점 → 결론'
  },
  {
    id: 'pw12',
    cat: '🏛️ 政治',
    q: 'Should voting be mandatory in democratic countries?',
    qja: '民主主義国家では 投票は 義務化されるべきですか?',
    answer: [
      "I believe voting should be mandatory in all democratic countries.",
      "From a social perspective, mandatory voting ensures that election results truly reflect the will of the entire population, not just those motivated to participate. Countries like Australia have shown that compulsory voting strengthens democracy and reduces extremism.",
      "Moreover, from an ethical standpoint, voting is a civic duty as important as paying taxes or following laws. Citizens enjoy the benefits of democracy and should equally share the responsibility of maintaining it.",
      "Civic engagement is the foundation of any healthy democratic system.",
      "Therefore, mandatory voting would create healthier and more representative democracies."
    ],
    pov: ['Society', 'Ethics'],
    hint: '사회(대표성)・윤리(시민의 의무) 관점 → 결론',
    answerNo: [
      "I am opposed to making voting mandatory in democratic societies.",
      "From an ethical perspective, true democracy includes the right to abstain. Forcing people to vote violates personal freedom and may produce uninformed votes from citizens who are not engaged with politics.",
      "Furthermore, from a social standpoint, mandatory voting does not address the real reasons many people don't participate, such as feeling that their vote doesn't matter. Better civic education would be more effective than legal force.",
      "Forced participation by uninformed voters could actually weaken rather than strengthen democratic outcomes.",
      "Therefore, voting should remain a personal choice rather than a legal obligation."
    ],
    povNo: ['Ethics', 'Society'],
    hintNo: '윤리(개인의 자유)・사회(교육이 우선) 관점 → 결론'
  },
  {
    id: 'pw13',
    cat: '🦁 動物',
    q: 'Should zoos and aquariums be closed?',
    qja: '動物園や 水族館は 閉鎖すべきですか?',
    answer: [
      "I believe most zoos and aquariums should be gradually closed.",
      "From an ethical perspective, keeping intelligent animals like elephants, dolphins, and great apes in small enclosures causes them severe psychological distress. These creatures need vast natural environments and complex social lives that captivity cannot provide.",
      "Furthermore, from an educational standpoint, modern technology like virtual reality and high-quality nature documentaries can teach children about animals more effectively than viewing depressed creatures behind bars.",
      "Future generations will likely view modern zoos as we now view circuses with performing animals.",
      "Therefore, society should move toward sanctuaries and conservation, not entertainment-based zoos."
    ],
    pov: ['Ethics', 'Education'],
    hint: '윤리(동물의 고통)・교육(VR·다큐 대안) 관점 → 결론',
    answerNo: [
      "I do not think zoos and aquariums should be closed.",
      "From an environmental perspective, modern zoos play a crucial role in conservation by breeding endangered species and reintroducing them to the wild. Many animals that are extinct in nature still exist thanks to dedicated zoo programs.",
      "In addition, from an educational standpoint, seeing real animals creates an emotional connection that documentaries cannot match. This connection inspires children to become future conservationists and supports the public's interest in protecting wildlife.",
      "Closing all zoos suddenly could leave many rescued and bred animals without proper homes or care.",
      "Therefore, well-managed zoos remain valuable institutions for both conservation and education."
    ],
    povNo: ['Environment', 'Education'],
    hintNo: '환경(멸종 위기종 보호)・교육(정서적 연결) 관점 → 결론'
  },
  {
    id: 'pw14',
    cat: '💰 経済',
    q: 'Should the rich pay much higher taxes?',
    qja: '富裕層は はるかに 高い 税金を 払うべきですか?',
    answer: [
      "I firmly believe that wealthy individuals should pay significantly higher taxes.",
      "From an economic perspective, extreme wealth concentration weakens consumer demand and slows economic growth. When the rich accumulate money while the middle class struggles, the entire economy suffers from reduced spending power.",
      "Moreover, from a social standpoint, higher taxes on the wealthy can fund essential services like healthcare, education, and infrastructure that benefit everyone. This creates more equal opportunities and a stronger, more cohesive society.",
      "History shows that societies with extreme inequality eventually face political and social instability.",
      "Therefore, progressive taxation is both economically wise and socially fair."
    ],
    pov: ['Economy', 'Society'],
    hint: '경제(소비 진작)・사회(공공 서비스) 관점 → 결론',
    answerNo: [
      "I do not believe dramatically higher taxes on the wealthy are a good solution.",
      "From an economic perspective, very high tax rates discourage entrepreneurship and investment. The wealthy create jobs and fund innovation; punishing their success may slow economic growth and harm everyone, including the poor.",
      "In addition, from an ethical standpoint, taking large portions of someone's earnings raises questions of fairness, especially when the wealth was earned through hard work and risk-taking. Heavy taxation may also drive successful people to leave the country.",
      "A better approach is closing loopholes and ensuring everyone pays their fair share under the current system.",
      "Therefore, moderate and stable tax rates serve society better than extreme increases."
    ],
    povNo: ['Economy', 'Ethics'],
    hintNo: '경제(투자 의욕)・윤리(공정성) 관점 → 결론'
  },
  {
    id: 'pw15',
    cat: '🏥 医療',
    q: 'Should euthanasia be legalized for terminally ill patients?',
    qja: '末期患者の 安楽死は 合法化されるべきですか?',
    answer: [
      "I support the legalization of euthanasia for terminally ill patients.",
      "From an ethical perspective, every person should have the right to make decisions about their own body and life. Forcing patients to endure unbearable suffering against their will is a violation of personal autonomy and human dignity.",
      "Moreover, from a health standpoint, modern medicine sometimes prolongs life without curing pain. Allowing peaceful, doctor-assisted death gives patients control and prevents unnecessary suffering during their final days.",
      "Several countries with carefully regulated euthanasia laws have seen positive outcomes for patients and families.",
      "Therefore, euthanasia should be legal with strict safeguards to protect vulnerable patients."
    ],
    pov: ['Ethics', 'Health'],
    hint: '윤리(자기결정권)・건강(고통 종식) 관점 → 결론',
    answerNo: [
      "I have serious reservations about legalizing euthanasia.",
      "From an ethical perspective, doctors should focus on saving and caring for lives, not ending them. Once euthanasia becomes legal, the line between voluntary and involuntary cases may slowly blur, putting elderly and disabled people at risk.",
      "Furthermore, from a social standpoint, vulnerable patients may feel pressured to choose death to avoid being a financial or emotional burden on their families. This represents a failure of society rather than true freedom of choice.",
      "Improving hospice care and pain management can address suffering without crossing ethical boundaries.",
      "Therefore, we should focus on improving palliative care rather than legalizing euthanasia."
    ],
    povNo: ['Ethics', 'Society'],
    hintNo: '윤리(의사의 역할)・사회(약자 압박) 관점 → 결론'
  },
];

// 통합
const ALL_WRITING_PRE1 = [...WRITING_PRE1_PART1, ...WRITING_PRE1_PART2];


// ============================================================
// 🎯 関門クイズ データ - 1부 (일본 지리·역사·문화 / 150문제)
// 각 문제: q (문제) / opts (4지선다) / a (정답 인덱스) / exp (해설)
// ============================================================

// ===== 🗾 일본 지리 (50문제) =====
const QUIZ_JP_GEO = [
  { q: '日本の 都道府県は いくつ?', opts: ['43', '45', '47', '49'], a: 2, exp: '都道府県は 1都・1道・2府・43県=合計47' },
  { q: '日本で 一番 大きい 都道府県は?', opts: ['北海道', '岩手県', '長野県', '東京都'], a: 0, exp: '北海道は 約8.3万km²で 圧倒的に最大' },
  { q: '日本で 一番 小さい 都道府県は?', opts: ['東京都', '大阪府', '香川県', '沖縄県'], a: 2, exp: '香川県は 約1,876km²で 最小' },
  { q: '日本で 一番 高い 山は?', opts: ['北岳', '富士山', '槍ヶ岳', '穂高岳'], a: 1, exp: '富士山は 3,776m、世界遺産にも登録' },
  { q: '日本で 一番 長い 川は?', opts: ['利根川', '信濃川', '石狩川', '北上川'], a: 1, exp: '信濃川は 367kmで 日本最長' },
  { q: '日本で 一番 大きい 湖は?', opts: ['霞ヶ浦', '琵琶湖', '猪苗代湖', '中海'], a: 1, exp: '琵琶湖は 滋賀県、約670km²' },
  { q: '東北地方に 含まれない 県は?', opts: ['宮城県', '福島県', '新潟県', '青森県'], a: 2, exp: '新潟県は 中部地方(または信越)' },
  { q: '九州地方の 県の数は?', opts: ['6', '7', '8', '9'], a: 1, exp: '福岡・佐賀・長崎・熊本・大分・宮崎・鹿児島 = 7県' },
  { q: '中部地方の 県は いくつ?', opts: ['7', '8', '9', '10'], a: 2, exp: '新潟・富山・石川・福井・山梨・長野・岐阜・静岡・愛知 = 9県' },
  { q: '四国地方に ない 県は?', opts: ['徳島', '高知', '愛媛', '岡山'], a: 3, exp: '岡山は 中国地方。四国は 徳島・香川・愛媛・高知' },
  { q: '日本一の 平野は?', opts: ['濃尾平野', '関東平野', '石狩平野', '十勝平野'], a: 1, exp: '関東平野は 約17,000km²で 日本最大' },
  { q: '「日本アルプス」と 呼ばれる 山脈の数は?', opts: ['2', '3', '4', '5'], a: 1, exp: '北アルプス(飛騨)・中央アルプス(木曽)・南アルプス(赤石)' },
  { q: '富士山が またがる 都道府県は?', opts: ['静岡と山梨', '神奈川と静岡', '長野と山梨', '東京と神奈川'], a: 0, exp: '富士山は 静岡県と山梨県の境' },
  { q: '関東地方の 県の数は?', opts: ['6', '7', '8', '9'], a: 1, exp: '東京・神奈川・千葉・埼玉・茨城・栃木・群馬 = 1都6県' },
  { q: '近畿(関西)地方に 含まれない 県は?', opts: ['滋賀県', '奈良県', '岡山県', '和歌山県'], a: 2, exp: '岡山県は 中国地方。近畿は 大阪・京都・兵庫・奈良・和歌山・滋賀・三重' },
  { q: '日本の 標準時の 基準点は?', opts: ['東京', '京都', '明石', '神戸'], a: 2, exp: '兵庫県明石市が 日本標準時(東経135度)の 基準' },
  { q: '日本一 北の 都市は?', opts: ['札幌', '稚内', '釧路', '函館'], a: 1, exp: '稚内市は 北海道最北端、日本最北の市' },
  { q: '日本一 南の 都道府県は?', opts: ['沖縄県', '鹿児島県', '宮崎県', '長崎県'], a: 0, exp: '沖縄県、最南端は沖ノ鳥島(東京都)だが 都道府県では沖縄' },
  { q: '日本三景に 含まれない 場所は?', opts: ['松島', '天橋立', '宮島', '富士山'], a: 3, exp: '日本三景:松島(宮城)・天橋立(京都)・宮島(広島)' },
  { q: '世界遺産「白川郷」が ある 県は?', opts: ['岐阜県', '富山県', '長野県', '石川県'], a: 0, exp: '白川郷は 岐阜県の合掌造り集落' },
  { q: '「西の京」と 呼ばれる 都市は?', opts: ['京都', '奈良', '神戸', '大阪'], a: 1, exp: '奈良は 平城京として 西の京と呼ばれる' },
  { q: '青森県の 県庁所在地は?', opts: ['青森市', '弘前市', '八戸市', '十和田市'], a: 0, exp: '青森県の県庁所在地は 青森市' },
  { q: '愛知県の 県庁所在地は?', opts: ['豊田市', '名古屋市', '岡崎市', '一宮市'], a: 1, exp: '愛知県の県庁所在地は 名古屋市' },
  { q: '神奈川県の 県庁所在地は?', opts: ['川崎市', '相模原市', '横浜市', '鎌倉市'], a: 2, exp: '神奈川県の県庁所在地は 横浜市' },
  { q: '岩手県の 県庁所在地は?', opts: ['仙台市', '盛岡市', '青森市', '秋田市'], a: 1, exp: '岩手県の県庁所在地は 盛岡市' },
  { q: '茨城県の 県庁所在地は?', opts: ['水戸市', 'つくば市', '日立市', '取手市'], a: 0, exp: '茨城県の県庁所在地は 水戸市' },
  { q: '兵庫県の 県庁所在地は?', opts: ['姫路市', '神戸市', '西宮市', '芦屋市'], a: 1, exp: '兵庫県の県庁所在地は 神戸市' },
  { q: '香川県の 県庁所在地は?', opts: ['松山市', '高松市', '徳島市', '高知市'], a: 1, exp: '香川県の県庁所在地は 高松市' },
  { q: '島根県の 県庁所在地は?', opts: ['鳥取市', '松江市', '出雲市', '岡山市'], a: 1, exp: '島根県の県庁所在地は 松江市' },
  { q: '沖縄県の 県庁所在地は?', opts: ['那覇市', '宮古島市', '石垣市', '名護市'], a: 0, exp: '沖縄県の県庁所在地は 那覇市' },
  { q: '日本の 排他的経済水域の 面積は 世界第何位?', opts: ['4位', '6位', '8位', '10位'], a: 1, exp: '日本のEEZは 約447万km²で 世界6位' },
  { q: '日本で 一番 雨が 多い 場所は?', opts: ['屋久島', '尾鷲', '富山', '高知'], a: 0, exp: '屋久島は 年間4,000mm以上、月によっては「月35日雨」と言われる' },
  { q: '関東平野を 流れる 大きな川は?', opts: ['信濃川', '利根川', '木曽川', '淀川'], a: 1, exp: '利根川は 関東平野を流れ 流域面積日本一' },
  { q: '日本最大の 半島は?', opts: ['紀伊半島', '能登半島', '伊豆半島', '房総半島'], a: 0, exp: '紀伊半島は 三重・奈良・和歌山にまたがる 日本最大の半島' },
  { q: '「奥羽山脈」が 走る 地方は?', opts: ['北海道', '東北', '中部', '中国'], a: 1, exp: '奥羽山脈は 東北地方の中央を縦断' },
  { q: '日本一 寒い 場所として 知られる 町は?', opts: ['稚内', '陸別', '富士山', '室蘭'], a: 1, exp: '北海道陸別町は -30度を 観測することも' },
  { q: '世界自然遺産の「知床」が ある 県は?', opts: ['北海道', '青森県', '岩手県', '秋田県'], a: 0, exp: '知床は 北海道東部の半島、世界自然遺産' },
  { q: '「砂丘」で 有名な 県は?', opts: ['鳥取県', '島根県', '岡山県', '山口県'], a: 0, exp: '鳥取砂丘は 山陰海岸国立公園内' },
  { q: '日本三大温泉に 含まれない 温泉は?', opts: ['有馬温泉', '草津温泉', '下呂温泉', '別府温泉'], a: 3, exp: '日本三名泉:有馬・草津・下呂' },
  { q: '「霞ヶ浦」が ある 県は?', opts: ['茨城県', '千葉県', '栃木県', '群馬県'], a: 0, exp: '霞ヶ浦は 茨城県、日本第2位の湖' },
  { q: '「阿蘇山」が ある 県は?', opts: ['大分県', '熊本県', '宮崎県', '鹿児島県'], a: 1, exp: '阿蘇山は 熊本県、世界最大級のカルデラ' },
  { q: '「桜島」が ある 県は?', opts: ['宮崎県', '鹿児島県', '熊本県', '沖縄県'], a: 1, exp: '桜島は 鹿児島県、現在も活発な活火山' },
  { q: '日本の 海岸線の 長さは 世界第何位?', opts: ['4位', '6位', '8位', '10位'], a: 1, exp: '日本の海岸線は 約3.5万km、世界6位' },
  { q: '「北方領土」に 含まれない 島は?', opts: ['択捉島', '国後島', '色丹島', '佐渡島'], a: 3, exp: '北方領土:択捉・国後・色丹・歯舞群島。佐渡島は新潟' },
  { q: '日本一 高い 滝は?', opts: ['那智の滝', 'ハンノキ滝', '袋田の滝', '華厳の滝'], a: 1, exp: '富山県のハンノキ滝は 落差497m' },
  { q: '「鳴門のうずしお」が 見られる 海峡は?', opts: ['関門海峡', '鳴門海峡', '津軽海峡', '豊後水道'], a: 1, exp: '鳴門海峡は 徳島と淡路島の間の海峡' },
  { q: '「日本のへそ」と 呼ばれる 場所は?', opts: ['岐阜県', '長野県', '兵庫県西脇市', '福井県'], a: 2, exp: '兵庫県西脇市は 東経135度・北緯35度の交点' },
  { q: '日本最古の 木造建築 法隆寺が ある 県は?', opts: ['京都府', '奈良県', '大阪府', '滋賀県'], a: 1, exp: '法隆寺は 奈良県斑鳩町、世界最古の木造建築' },
  { q: '「五大湖」と 呼ばれる 日本の湖に 含まれない湖は?', opts: ['琵琶湖', '霞ヶ浦', '宍道湖', '中禅寺湖'], a: 3, exp: '日本五大湖:琵琶湖・霞ヶ浦・サロマ湖・猪苗代湖・中海(諸説あり)' },
  { q: '関東で 一番 高い 山は?', opts: ['筑波山', '日光白根山', '富士山', '高尾山'], a: 1, exp: '日光白根山は 2,578m、関東以北で最高峰' },
];

// ===== 🏯 일본 역사 (50문제) =====
const QUIZ_JP_HIST = [
  { q: '日本の 最初の 元号は?', opts: ['大化', '白雉', '朱鳥', '大宝'], a: 0, exp: '大化(645年)、大化の改新と共に始まる' },
  { q: '聖徳太子が 制定した 法は?', opts: ['大宝律令', '養老律令', '十七条憲法', '武家諸法度'], a: 2, exp: '十七条憲法は 604年に制定' },
  { q: '平安京を 都と した 天皇は?', opts: ['桓武天皇', '聖武天皇', '天武天皇', '推古天皇'], a: 0, exp: '桓武天皇が 794年に平安京遷都' },
  { q: '鎌倉幕府を 開いた 将軍は?', opts: ['足利尊氏', '徳川家康', '源頼朝', '北条時宗'], a: 2, exp: '源頼朝が 1192年(諸説あり)鎌倉幕府を開く' },
  { q: '室町幕府を 開いた 将軍は?', opts: ['足利尊氏', '足利義満', '織田信長', '源頼朝'], a: 0, exp: '足利尊氏が 1336年に室町幕府を開く' },
  { q: '江戸幕府を 開いた 将軍は?', opts: ['徳川秀忠', '徳川家光', '徳川家康', '徳川家綱'], a: 2, exp: '徳川家康が 1603年に江戸幕府を開く' },
  { q: '本能寺の変で 自害した 武将は?', opts: ['豊臣秀吉', '織田信長', '徳川家康', '武田信玄'], a: 1, exp: '1582年、明智光秀の謀反で 織田信長が自害' },
  { q: '「太閤」と 呼ばれた 武将は?', opts: ['織田信長', '豊臣秀吉', '徳川家康', '武田信玄'], a: 1, exp: '豊臣秀吉、関白を退いてから「太閤」と呼ばれる' },
  { q: '関ヶ原の 戦いは 何年?', opts: ['1580年', '1590年', '1600年', '1610年'], a: 2, exp: '1600年、東軍(徳川)対西軍(石田)の天下分け目の戦い' },
  { q: '明治維新は 何年?', opts: ['1858年', '1868年', '1878年', '1888年'], a: 1, exp: '1868年、王政復古の大号令から 始まる' },
  { q: '日本国憲法の 施行は?', opts: ['1945年', '1946年', '1947年', '1948年'], a: 2, exp: '1947年5月3日施行(現在の憲法記念日)' },
  { q: '昭和天皇の 在位期間は 約 何年?', opts: ['52年', '62年', '72年', '82年'], a: 1, exp: '1926年〜1989年、約62年で 史上最長' },
  { q: '「いい国つくろう 鎌倉幕府」は 何年?', opts: ['1185年', '1192年', '1199年', '1203年'], a: 1, exp: '1192年(現在の通説では1185年とも)' },
  { q: '元寇(蒙古襲来)は 何回 あった?', opts: ['1回', '2回', '3回', '4回'], a: 1, exp: '文永の役(1274)・弘安の役(1281)の2回' },
  { q: '応仁の乱が 起きた 年は?', opts: ['1457年', '1467年', '1477年', '1487年'], a: 1, exp: '1467年、戦国時代の幕開け' },
  { q: '「鎖国」を 完成させた 将軍は?', opts: ['徳川家康', '徳川秀忠', '徳川家光', '徳川綱吉'], a: 2, exp: '徳川家光、3代将軍が1639年にポルトガル船来航禁止' },
  { q: '黒船で 来航した アメリカ人は?', opts: ['ハリス', 'ペリー', 'マッカーサー', 'リンカーン'], a: 1, exp: '1853年、ペリー提督が浦賀に来航' },
  { q: '坂本龍馬が 暗殺された 場所は?', opts: ['寺田屋', '近江屋', '池田屋', '本能寺'], a: 1, exp: '京都の近江屋で 1867年に暗殺' },
  { q: '日清戦争は 何年に 始まった?', opts: ['1884年', '1894年', '1904年', '1914年'], a: 1, exp: '1894年、日本が勝利し 下関条約' },
  { q: '日露戦争は 何年に 始まった?', opts: ['1894年', '1904年', '1914年', '1924年'], a: 1, exp: '1904年、日本海海戦が有名' },
  { q: '大日本帝国憲法の 発布は?', opts: ['1879年', '1889年', '1899年', '1909年'], a: 1, exp: '1889年2月11日、明治22年' },
  { q: '日本初の 内閣総理大臣は?', opts: ['伊藤博文', '大隈重信', '山県有朋', '板垣退助'], a: 0, exp: '伊藤博文、1885年に初代総理大臣' },
  { q: '聖武天皇が 大仏を 造った 場所は?', opts: ['東大寺', '法隆寺', '興福寺', '薬師寺'], a: 0, exp: '東大寺の大仏(奈良の大仏)、752年開眼' },
  { q: '紫式部が 書いた 物語は?', opts: ['竹取物語', '源氏物語', '伊勢物語', '今昔物語'], a: 1, exp: '源氏物語は 世界最古の長編小説の一つ' },
  { q: '「枕草子」を 書いた 人は?', opts: ['紫式部', '清少納言', '小野小町', '額田王'], a: 1, exp: '清少納言、平安時代の随筆' },
  { q: '徳川幕府の 将軍は 何代まで?', opts: ['13代', '15代', '17代', '19代'], a: 1, exp: '徳川家康から 慶喜まで 15代' },
  { q: '「桜田門外の変」で 暗殺された 大老は?', opts: ['井伊直弼', '水野忠邦', '田沼意次', '阿部正弘'], a: 0, exp: '1860年、井伊直弼が水戸浪士に暗殺' },
  { q: '織田信長が 天下統一に 用いた 印章の 言葉は?', opts: ['天下泰平', '天下布武', '天下一統', '天下無双'], a: 1, exp: '「天下布武」は 武力で天下を治める意味' },
  { q: '「ええじゃないか」が 流行した 時代は?', opts: ['江戸初期', '江戸中期', '幕末', '明治初期'], a: 2, exp: '1867年頃、幕末の民衆運動' },
  { q: '日本最初の 鉄道は どこを 走った?', opts: ['新橋〜横浜', '東京〜大阪', '大阪〜神戸', '上野〜青森'], a: 0, exp: '1872年、新橋〜横浜間で 日本初の鉄道開業' },
  { q: '大政奉還を した 将軍は?', opts: ['徳川家慶', '徳川家定', '徳川家茂', '徳川慶喜'], a: 3, exp: '15代将軍 徳川慶喜が 1867年に大政奉還' },
  { q: '岩倉使節団が 出発した 年は?', opts: ['1865年', '1871年', '1877年', '1883年'], a: 1, exp: '1871年、欧米視察に出発' },
  { q: '「学制」が 公布された 年は?', opts: ['1870年', '1872年', '1874年', '1876年'], a: 1, exp: '1872年、近代教育制度のはじまり' },
  { q: '西南戦争を 起こした 人物は?', opts: ['西郷隆盛', '大久保利通', '木戸孝允', '板垣退助'], a: 0, exp: '1877年、西郷隆盛が起こした最後の士族反乱' },
  { q: '日本の 第二次世界大戦の 終戦日は?', opts: ['1945年8月6日', '1945年8月15日', '1945年9月2日', '1946年1月1日'], a: 1, exp: '1945年8月15日、玉音放送の日' },
  { q: '日本が 国際連盟を 脱退した 年は?', opts: ['1931年', '1933年', '1935年', '1937年'], a: 1, exp: '1933年、満州事変問題で脱退' },
  { q: '「五箇条の御誓文」が 発布された 年は?', opts: ['1865年', '1868年', '1871年', '1873年'], a: 1, exp: '1868年、明治政府の基本方針' },
  { q: '聖徳太子が 摂政として 仕えた 天皇は?', opts: ['推古天皇', '天武天皇', '聖武天皇', '桓武天皇'], a: 0, exp: '推古天皇、日本初の女性天皇' },
  { q: '「平家物語」の 冒頭の 言葉は?', opts: ['いざ鎌倉', '祇園精舎の鐘の声', '平家にあらずんば', '春はあけぼの'], a: 1, exp: '「祇園精舎の鐘の声 諸行無常の響きあり」' },
  { q: '「鎌倉時代」の 仏教で 浄土宗を 開いた 人は?', opts: ['法然', '親鸞', '日蓮', '栄西'], a: 0, exp: '法然が浄土宗、親鸞が浄土真宗を開く' },
  { q: '武田信玄の 有名な 旗印 「風林火山」 の 元になった 兵法書は?', opts: ['孫子', '三国志', '論語', '韓非子'], a: 0, exp: '孫子の兵法「疾如風 徐如林 侵掠如火 不動如山」' },
  { q: '「徳川綱吉」が 出した 有名な 法令は?', opts: ['武家諸法度', '生類憐みの令', '上知令', '禁中並公家諸法度'], a: 1, exp: '生類憐みの令、動物保護の極端な法' },
  { q: '伊能忠敬が 作った 地図の 名前は?', opts: ['大日本沿海輿地全図', '日本万国地図', '東洋全図', '皇国地理大全'], a: 0, exp: '伊能忠敬の日本全図、19世紀初頭' },
  { q: '幕末に 結ばれた 不平等条約の 名前は?', opts: ['日米和親条約', '日米修好通商条約', 'ポーツマス条約', 'ワシントン条約'], a: 1, exp: '1858年、井伊直弼が結んだ不平等条約' },
  { q: '日本の 鎖国期間は 約 何年?', opts: ['約100年', '約150年', '約200年', '約300年'], a: 2, exp: '1639年〜1854年、約215年間' },
  { q: '「文明開化」の 時代区分は?', opts: ['江戸末期', '明治初期', '大正時代', '昭和初期'], a: 1, exp: '明治初期、西洋文化が急速に流入' },
  { q: '「自由民権運動」を 主導した 人物は?', opts: ['西郷隆盛', '板垣退助', '大久保利通', '木戸孝允'], a: 1, exp: '板垣退助、自由党を結成' },
  { q: '関東大震災が 起きた 年は?', opts: ['1913年', '1923年', '1933年', '1943年'], a: 1, exp: '1923年9月1日(防災の日)' },
  { q: '日本の 戦後復興の 象徴 「東京オリンピック(初)」 は 何年?', opts: ['1960年', '1964年', '1968年', '1972年'], a: 1, exp: '1964年10月10日開幕、戦後復興の象徴' },
  { q: '「大坂の陣」で 滅亡した 一族は?', opts: ['北条氏', '足利氏', '豊臣氏', '今川氏'], a: 2, exp: '1615年、徳川家康が豊臣氏を滅ぼす' },
];

// ===== 🍱 일본 문화 (50문제) =====
const QUIZ_JP_CULTURE = [
  { q: '日本の 国技と されている スポーツは?', opts: ['柔道', '剣道', '相撲', '弓道'], a: 2, exp: '相撲は 神事に由来する日本の国技' },
  { q: '「茶道」を 大成した 人物は?', opts: ['利休', '光琳', '宗達', '芭蕉'], a: 0, exp: '千利休が 茶道(わび茶)を大成' },
  { q: '俳句の 基本形式は 何音?', opts: ['5-7-5', '7-7-7', '5-5-5', '7-5-7'], a: 0, exp: '5・7・5の17音、季語を含む' },
  { q: '短歌の 基本形式は 何音?', opts: ['5-7-5', '5-7-5-7-7', '7-5-7-5', '5-5-7-7'], a: 1, exp: '5・7・5・7・7の31音' },
  { q: '「松尾芭蕉」の 代表作は?', opts: ['古今和歌集', '奥の細道', '徒然草', '方丈記'], a: 1, exp: '奥の細道、東北・北陸を巡る紀行文' },
  { q: '日本最古の 和歌集は?', opts: ['万葉集', '古今和歌集', '新古今和歌集', '小倉百人一首'], a: 0, exp: '万葉集、奈良時代に編纂' },
  { q: 'ひな祭りは 何月何日?', opts: ['2月3日', '3月3日', '4月3日', '5月3日'], a: 1, exp: '3月3日、女の子の節句' },
  { q: 'こどもの日は 何月何日?', opts: ['4月5日', '5月5日', '6月5日', '7月5日'], a: 1, exp: '5月5日、男の子の節句(端午の節句)' },
  { q: '七夕は 何月何日?', opts: ['6月7日', '7月7日', '8月7日', '9月7日'], a: 1, exp: '7月7日(地域によっては8月7日)' },
  { q: '日本の 通貨記号は?', opts: ['$', '€', '¥', '£'], a: 2, exp: '¥(円)' },
  { q: '寿司の 起源は どの 国?', opts: ['中国', '韓国', '東南アジア', 'インド'], a: 2, exp: 'なれずし(東南アジアの保存食)が原型' },
  { q: '「歌舞伎」を 始めた と される 人物は?', opts: ['出雲の阿国', '世阿弥', '近松門左衛門', '市川團十郎'], a: 0, exp: '出雲の阿国(おくに)が 17世紀初頭に始めた' },
  { q: '能楽を 大成した 人物は?', opts: ['世阿弥', '観阿弥', '世阿弥と観阿弥', '近松門左衛門'], a: 2, exp: '父の観阿弥と子の世阿弥が 室町時代に大成' },
  { q: '「百人一首」の 編者は?', opts: ['紀貫之', '藤原定家', '在原業平', '柿本人麻呂'], a: 1, exp: '藤原定家が 鎌倉時代に編纂' },
  { q: '「源氏物語」の 主人公は?', opts: ['光源氏', '在原業平', '平清盛', '源義経'], a: 0, exp: '光源氏、紫式部が描いた架空の人物' },
  { q: '「枕草子」の ジャンルは?', opts: ['物語', '日記', '随筆', '軍記'], a: 2, exp: '清少納言の随筆(エッセイ)' },
  { q: '「鳥獣戯画」が 描かれた 時代は?', opts: ['平安〜鎌倉', '室町', '江戸', '明治'], a: 0, exp: '平安〜鎌倉時代、京都・高山寺所蔵' },
  { q: '「桃太郎」の キビダンゴで 仲間に なった 動物に いない のは?', opts: ['犬', 'サル', 'キジ', '猫'], a: 3, exp: '桃太郎の仲間は 犬・サル・キジ' },
  { q: '日本三大 祭りに 含まれない 祭りは?', opts: ['祇園祭', '天神祭', '神田祭', 'ねぶた祭'], a: 3, exp: '日本三大祭:京都 祇園祭・大阪 天神祭・東京 神田祭' },
  { q: '「歌舞伎」で 顔に 描く 化粧は?', opts: ['白粉', '隈取', '紅', '鉄漿'], a: 1, exp: '隈取(くまどり)、役柄を表す化粧' },
  { q: '「茶の湯」の 4つの 心は?', opts: ['礼節清正', '和敬清寂', '正大光明', '道徳礼儀'], a: 1, exp: '和・敬・清・寂(わけいせいじゃく)' },
  { q: '相撲で 一番 上の 番付は?', opts: ['大関', '関脇', '横綱', '小結'], a: 2, exp: '横綱、相撲の最高位' },
  { q: '日本酒の 主な 原料は?', opts: ['麦', '米', 'ぶどう', 'いも'], a: 1, exp: '日本酒は米と米麹と水から造る醸造酒' },
  { q: '抹茶の 主な 産地として 有名なのは?', opts: ['静岡', '京都(宇治)', '鹿児島', '埼玉'], a: 1, exp: '京都の宇治抹茶が最も有名' },
  { q: '「侘び寂び」の 意味に 近い ものは?', opts: ['豪華絢爛', '質素静寂の美', '勢いある美', '温かみのある美'], a: 1, exp: '質素・簡素の中にある美しさ' },
  { q: '「歌舞伎」の 屋号で 「成田屋」は どの 役者の家?', opts: ['市川團十郎', '尾上菊五郎', '中村勘三郎', '坂東玉三郎'], a: 0, exp: '市川團十郎家の屋号は「成田屋」' },
  { q: '「忍者」の 二大流派は?', opts: ['伊賀と甲賀', '相模と武蔵', '近江と尾張', '京都と大坂'], a: 0, exp: '伊賀流(三重)と甲賀流(滋賀)' },
  { q: '「蕎麦」で 有名な 県は?', opts: ['長野県', '香川県', '岡山県', '三重県'], a: 0, exp: '長野県の信州そば。香川はうどん' },
  { q: '「うどん県」の 愛称で 知られる 県は?', opts: ['香川県', '埼玉県', '群馬県', '岡山県'], a: 0, exp: '香川県、讃岐うどんで有名' },
  { q: '「カステラ」が 伝わった 県は?', opts: ['長崎県', '京都府', '東京都', '北海道'], a: 0, exp: '長崎、ポルトガルから伝来' },
  { q: '初詣で 有名な 「明治神宮」が ある 都道府県は?', opts: ['東京都', '神奈川県', '埼玉県', '千葉県'], a: 0, exp: '東京都渋谷区、明治天皇と昭憲皇太后を祀る' },
  { q: '日本の お盆は 主に 何月?', opts: ['7月', '8月', '9月', '10月'], a: 1, exp: '8月15日前後(地域により7月15日)' },
  { q: 'お正月に 食べる 「おせち料理」 の 黒豆の 意味は?', opts: ['長寿', 'まめに働く', '子孫繁栄', '金運'], a: 1, exp: '「まめ(健康)に働く」の意味' },
  { q: '「歌舞伎座」の 場所は?', opts: ['銀座', '渋谷', '上野', '浅草'], a: 0, exp: '東京都中央区銀座' },
  { q: '日本の 年賀状の 起源は どの 時代?', opts: ['平安時代', '江戸時代', '明治時代', '大正時代'], a: 0, exp: '平安時代、貴族の間で始まる' },
  { q: '「桜前線」が 通常 進む 方向は?', opts: ['北から南', '南から北', '東から西', '西から東'], a: 1, exp: '九州・四国から東北・北海道へ北上' },
  { q: '「干支」は いくつ?', opts: ['10', '12', '14', '16'], a: 1, exp: '子・丑・寅…亥の12種' },
  { q: '日本の 国花の 一つに 数えられる 花は?', opts: ['菊', 'バラ', 'ひまわり', 'チューリップ'], a: 0, exp: '菊と桜が事実上の国花(法定はない)' },
  { q: '「合掌造り」が 有名な 集落は?', opts: ['白川郷', '京都祇園', '奈良奈良町', '飛騨高山'], a: 0, exp: '岐阜県の白川郷、世界遺産' },
  { q: '「初午」に 食べる 食べ物は?', opts: ['いなり寿司', 'ちまき', '七草粥', '年越しそば'], a: 0, exp: '初午は稲荷神社の祭、いなり寿司を食べる' },
  { q: '日本の 国旗の デザインは?', opts: ['白地に赤丸', '赤地に白丸', '青地に白丸', '黄地に赤丸'], a: 0, exp: '日章旗、白地に赤い丸' },
  { q: '「君が代」の 歌詞の 出典は?', opts: ['万葉集', '古今和歌集', '源氏物語', '徒然草'], a: 1, exp: '古今和歌集の和歌が原典' },
  { q: '「歌舞伎」の 三大名作に 含まれない 作品は?', opts: ['仮名手本忠臣蔵', '菅原伝授手習鑑', '義経千本桜', '勧進帳'], a: 3, exp: '三大名作:忠臣蔵・菅原・義経千本桜' },
  { q: '日本最古の お寺は?', opts: ['法隆寺', '東大寺', '飛鳥寺', '清水寺'], a: 2, exp: '飛鳥寺(596年)が最古とされる' },
  { q: '「焼き物」で 有名な 「有田焼」 は どの 県?', opts: ['佐賀県', '岡山県', '愛知県', '岐阜県'], a: 0, exp: '佐賀県有田町、磁器発祥の地' },
  { q: '「九谷焼」が 有名な 県は?', opts: ['石川県', '福井県', '富山県', '新潟県'], a: 0, exp: '石川県、色絵が特徴' },
  { q: '「西陣織」が 有名な 都市は?', opts: ['京都', '奈良', '金沢', '高山'], a: 0, exp: '京都の高級織物' },
  { q: '日本の「世界遺産」 第1号 で 文化遺産 の もの は?', opts: ['法隆寺地域', '姫路城', '古都京都の文化財', '広島平和記念碑'], a: 0, exp: '1993年、法隆寺と姫路城が文化遺産第1号' },
  { q: '日本の 「国民の祝日」 は 全部で いくつ?', opts: ['14', '16', '18', '20'], a: 1, exp: '2024年現在 16日(山の日含む)' },
  { q: '「お雑煮」の 餅で 関東は 主に 何形?', opts: ['丸餅', '角餅(切り餅)', 'のし餅', '安倍川餅'], a: 1, exp: '関東は角餅(焼く)、関西は丸餅(煮る)' },
];

// ============================================================
// 🎯 関門クイズ データ - 2부 (세계·과학 / 150문제)
// ============================================================

// ===== 🌍 세계 지리 (50문제) =====
const QUIZ_WORLD_GEO = [
  { q: 'アメリカ合衆国の 首都は?', opts: ['ニューヨーク', 'ロサンゼルス', 'ワシントンD.C.', 'シカゴ'], a: 2, exp: 'ワシントンD.C.は 1790年に首都に' },
  { q: 'オーストラリアの 首都は?', opts: ['シドニー', 'メルボルン', 'キャンベラ', 'パース'], a: 2, exp: 'キャンベラ、シドニーとメルボルンの妥協で首都に' },
  { q: 'ブラジルの 首都は?', opts: ['リオデジャネイロ', 'サンパウロ', 'ブラジリア', 'サルバドール'], a: 2, exp: 'ブラジリア、1960年に内陸に建設' },
  { q: 'カナダの 首都は?', opts: ['トロント', 'バンクーバー', 'モントリオール', 'オタワ'], a: 3, exp: 'オタワ、英語圏とフランス語圏の境' },
  { q: 'トルコの 首都は?', opts: ['イスタンブール', 'アンカラ', 'イズミル', 'アンタルヤ'], a: 1, exp: 'アンカラ、1923年に首都に' },
  { q: 'スイスの 首都は?', opts: ['チューリッヒ', 'ジュネーブ', 'ベルン', 'バーゼル'], a: 2, exp: 'ベルン(事実上の首都)' },
  { q: '南アフリカ共和国の 首都は?', opts: ['ヨハネスブルグ', 'ケープタウン', 'プレトリア', 'ダーバン'], a: 2, exp: '行政首都はプレトリア(3つの首都の一つ)' },
  { q: 'ニュージーランドの 首都は?', opts: ['オークランド', 'ウェリントン', 'クライストチャーチ', 'クイーンズタウン'], a: 1, exp: 'ウェリントン、北島の南端' },
  { q: 'メキシコの 首都は?', opts: ['カンクン', 'グアダラハラ', 'メキシコシティ', 'モンテレイ'], a: 2, exp: 'メキシコシティ、世界最大級の都市' },
  { q: 'ベトナムの 首都は?', opts: ['ホーチミン', 'ハノイ', 'ダナン', 'フエ'], a: 1, exp: 'ハノイ、北部に位置' },
  { q: '世界一 人口が 多い 国は (2024年)?', opts: ['中国', 'インド', 'アメリカ', 'インドネシア'], a: 1, exp: 'インドが2023年に中国を抜き世界一' },
  { q: '世界一 面積が 大きい 国は?', opts: ['中国', 'アメリカ', 'カナダ', 'ロシア'], a: 3, exp: 'ロシア、約1,710万km²' },
  { q: '世界一 高い 山は?', opts: ['K2', 'エベレスト', 'カンチェンジュンガ', 'ローツェ'], a: 1, exp: 'エベレスト(8,849m)' },
  { q: '世界一 長い 川は?', opts: ['アマゾン川', 'ナイル川', '長江', 'ミシシッピ川'], a: 1, exp: 'ナイル川(約6,650km)。アマゾン説もあり' },
  { q: '世界一 大きい 砂漠は?', opts: ['サハラ砂漠', 'ゴビ砂漠', '南極', 'アタカマ砂漠'], a: 2, exp: '南極は最大の「寒冷砂漠」、サハラは熱帯砂漠最大' },
  { q: '世界一 深い 湖は?', opts: ['カスピ海', 'バイカル湖', 'タンガニーカ湖', 'スペリオル湖'], a: 1, exp: 'バイカル湖(ロシア)、最深1,642m' },
  { q: '世界一 大きい 島は?', opts: ['グリーンランド', 'マダガスカル', 'ボルネオ', 'ニューギニア'], a: 0, exp: 'グリーンランド(約217万km²)、大陸を除く' },
  { q: '南米大陸で 一番 大きい 国は?', opts: ['アルゼンチン', 'ブラジル', 'ペルー', 'コロンビア'], a: 1, exp: 'ブラジル、南米大陸の半分近く' },
  { q: 'アフリカで 一番 人口が 多い 国は?', opts: ['エジプト', 'エチオピア', 'ナイジェリア', '南アフリカ'], a: 2, exp: 'ナイジェリア、約2億2千万人' },
  { q: '日本から 見て 真南に ある 大陸は?', opts: ['ユーラシア', 'オセアニア', '南極', 'アフリカ'], a: 1, exp: 'オセアニア(オーストラリア大陸の方角)' },
  { q: '「ガラパゴス諸島」が ある 国は?', opts: ['ペルー', 'チリ', 'エクアドル', 'コロンビア'], a: 2, exp: 'エクアドル領、ダーウィンの研究で有名' },
  { q: '「タヒチ」が ある 国の 領土は?', opts: ['アメリカ', 'フランス', 'イギリス', 'オランダ'], a: 1, exp: 'タヒチはフランス領ポリネシア' },
  { q: '世界一 面積が 小さい 国は?', opts: ['モナコ', 'バチカン市国', 'サンマリノ', 'ナウル'], a: 1, exp: 'バチカン市国(0.44km²)' },
  { q: 'ユーラシア大陸の 西端の 国は?', opts: ['スペイン', 'ポルトガル', 'フランス', 'アイルランド'], a: 1, exp: 'ポルトガルのロカ岬がユーラシア最西端' },
  { q: 'パナマ運河は どの 2つの 海を つなぐ?', opts: ['大西洋と太平洋', '太平洋と地中海', '地中海と紅海', '北海と地中海'], a: 0, exp: '大西洋(カリブ海)と太平洋を結ぶ' },
  { q: 'スエズ運河は どの 2つの 海を つなぐ?', opts: ['黒海と地中海', '地中海と紅海', '紅海とペルシャ湾', '大西洋と地中海'], a: 1, exp: '地中海と紅海を結ぶ運河' },
  { q: 'アンデス山脈が 走る 大陸は?', opts: ['ユーラシア', '北アメリカ', '南アメリカ', 'アフリカ'], a: 2, exp: '南米大陸西側、世界最長の山脈' },
  { q: '「死海」が ある 国に 含まれない 国は?', opts: ['イスラエル', 'ヨルダン', 'パレスチナ', 'エジプト'], a: 3, exp: '死海はイスラエル・ヨルダン・パレスチナの境' },
  { q: '世界で 一番 多くの 国と 国境を 接する 国は?', opts: ['ロシア', '中国', 'ブラジル', 'インド'], a: 1, exp: '中国は14か国と接する(ロシアと並んで最多)' },
  { q: '「赤道」が 通る 国に 含まれない のは?', opts: ['エクアドル', 'ケニア', 'インドネシア', 'メキシコ'], a: 3, exp: 'メキシコは赤道より北。残り3国は赤道直下' },
  { q: 'ヨーロッパで 一番 大きい 半島は?', opts: ['イベリア半島', 'バルカン半島', 'スカンジナビア半島', 'イタリア半島'], a: 2, exp: 'スカンジナビア半島、ノルウェー・スウェーデン' },
  { q: 'ヨーロッパ最高峰は?', opts: ['モンブラン', 'マッターホルン', 'エルブルース', 'デナリ'], a: 2, exp: 'エルブルース(ロシア・コーカサス) 5,642m' },
  { q: '「東南アジア」に 含まれない 国は?', opts: ['ベトナム', 'タイ', 'バングラデシュ', 'マレーシア'], a: 2, exp: 'バングラデシュは南アジア' },
  { q: '世界一 高い ビルは?', opts: ['東京スカイツリー', 'ブルジュ・ハリファ', '上海中心', '台北101'], a: 1, exp: 'ブルジュ・ハリファ(ドバイ) 828m' },
  { q: '「中央アジア」の 5か国に 含まれない 国は?', opts: ['カザフスタン', 'ウズベキスタン', 'モンゴル', 'キルギス'], a: 2, exp: '中央アジア5か国:カザフ・ウズベク・キルギス・タジク・トルクメン' },
  { q: '世界遺産「マチュピチュ」が ある 国は?', opts: ['ペルー', 'メキシコ', 'チリ', 'ボリビア'], a: 0, exp: 'ペルー、インカ帝国の遺跡' },
  { q: '「ナイアガラの滝」が ある 国境は?', opts: ['アメリカとメキシコ', 'アメリカとカナダ', 'カナダとロシア', 'アメリカとロシア'], a: 1, exp: 'アメリカとカナダの国境' },
  { q: '世界一 海抜の 低い 国は?', opts: ['オランダ', 'モルディブ', 'バングラデシュ', 'ツバル'], a: 1, exp: 'モルディブ、平均海抜約1.5m' },
  { q: '「アマゾン川」が 流れる 国に 含まれない 国は?', opts: ['ブラジル', 'ペルー', 'コロンビア', 'アルゼンチン'], a: 3, exp: 'アマゾンはブラジル・ペルー・コロンビア・エクアドルなど' },
  { q: '日本と 同じ くらいの 緯度に ある 都市は?', opts: ['ニューヨーク', 'ロンドン', 'シドニー', 'モスクワ'], a: 0, exp: '東京とニューヨークは ほぼ同じ緯度(約35-40度)' },
  { q: '「南極大陸」を 領土として 主張していない 国は?', opts: ['アルゼンチン', 'チリ', 'ニュージーランド', '日本'], a: 3, exp: '日本は南極条約で領土主張を凍結' },
  { q: '「ヒマラヤ山脈」を 領土に 含む 国に いない のは?', opts: ['ネパール', 'ブータン', 'ミャンマー', 'インド'], a: 2, exp: 'ヒマラヤはネパール・ブータン・インド・中国(チベット)' },
  { q: '「マダガスカル」が ある 大陸は?', opts: ['アジア', 'アフリカ', 'オセアニア', 'ヨーロッパ'], a: 1, exp: 'アフリカ南東沖の大島' },
  { q: '世界で 一番 多くの 言語が 使われている 国は?', opts: ['インド', 'パプアニューギニア', '中国', 'ナイジェリア'], a: 1, exp: 'パプアニューギニアは800言語以上' },
  { q: '「タスマニア島」が ある 国は?', opts: ['ニュージーランド', 'オーストラリア', 'インドネシア', 'フィジー'], a: 1, exp: 'オーストラリア南方の州' },
  { q: '「シベリア」が ある 国は?', opts: ['ロシア', 'カナダ', 'モンゴル', 'カザフスタン'], a: 0, exp: 'ロシア東部の広大な地域' },
  { q: '「グレートバリアリーフ」が ある 国は?', opts: ['オーストラリア', 'フィリピン', 'インドネシア', 'マダガスカル'], a: 0, exp: 'オーストラリア東岸、世界最大のサンゴ礁' },
  { q: '北極点と 南極点、どちらが 寒い?', opts: ['北極点', '南極点', 'ほぼ同じ', '季節による'], a: 1, exp: '南極は大陸、北極は海。南極の方が寒い' },
  { q: '「カスピ海」は 海? 湖?', opts: ['海', '湖', '海でも湖でもない', '川の延長'], a: 1, exp: '世界最大の塩湖(海ではない)' },
  { q: '「アラビア半島」に 属さない 国は?', opts: ['サウジアラビア', 'イラン', 'イエメン', 'オマーン'], a: 1, exp: 'イランはアラビア半島ではなく西アジア' },
];

// ===== 🏳️ 국기 맞추기 (50문제 - 어려운 국기) =====
// 국기는 텍스트로 표현 어려우니 「특징 → 국가」 또는 「국가 → 특징」 형식
const QUIZ_FLAGS = [
  { q: '🇨🇦 国旗中央に カエデの葉が ある 国は?', opts: ['カナダ', 'デンマーク', 'スイス', 'チリ'], a: 0, exp: 'カナダの国旗、メープルリーフ' },
  { q: '🇰🇷 国旗中央に「太極(陰陽)」が ある 国は?', opts: ['日本', '中国', '韓国', 'ベトナム'], a: 2, exp: '韓国の太極旗' },
  { q: '🇨🇳 赤地に 黄色い 星 5つの 国旗の 国は?', opts: ['北朝鮮', '中国', 'ベトナム', '台湾'], a: 1, exp: '中華人民共和国の五星紅旗' },
  { q: '🇮🇳 オレンジ・白・緑の 横3色で 中央に 法輪が ある 国は?', opts: ['インド', 'スリランカ', 'ネパール', 'バングラデシュ'], a: 0, exp: 'インドの三色旗、中央のアショカチャクラ' },
  { q: '🇨🇭 赤地に 白十字 (正方形)の 国旗は?', opts: ['ノルウェー', 'デンマーク', 'スイス', 'スウェーデン'], a: 2, exp: 'スイスの国旗、世界唯一の正方形' },
  { q: '🇧🇷 緑地に 黄色い 菱形 + 青い 円の 国旗は?', opts: ['ブラジル', 'メキシコ', 'アルゼンチン', 'コロンビア'], a: 0, exp: 'ブラジル、青い円は星座を表す' },
  { q: '🇲🇽 緑・白・赤で 中央に ワシと サボテンが ある 国旗は?', opts: ['イタリア', 'メキシコ', 'ハンガリー', 'マダガスカル'], a: 1, exp: 'メキシコ、アステカの伝説のシンボル' },
  { q: '🇿🇦 6色 (黒・黄・緑・白・赤・青)の 国旗の 国は?', opts: ['ジンバブエ', '南アフリカ', 'ナミビア', 'ザンビア'], a: 1, exp: '南アフリカ、世界唯一の6色旗' },
  { q: '🇰🇿 水色地に 太陽と ワシの 国旗は?', opts: ['カザフスタン', 'モンゴル', 'ウズベキスタン', 'キルギス'], a: 0, exp: 'カザフスタン、空色は遊牧民の精神' },
  { q: '🇲🇳 赤・青・赤の 縦3色で 左に 黄色い ソヨンボの 国旗は?', opts: ['モンゴル', 'カンボジア', 'ラオス', 'ミャンマー'], a: 0, exp: 'モンゴル、ソヨンボは民族のシンボル' },
  { q: '🇳🇵 世界で 唯一 長方形 ではない 国旗の 国は?', opts: ['スイス', 'ネパール', 'ブータン', 'バチカン'], a: 1, exp: 'ネパール、二つの三角形を組み合わせた形' },
  { q: '🇰🇭 国旗に 寺院 (アンコールワット) が 描かれている 国は?', opts: ['タイ', 'ラオス', 'カンボジア', 'ミャンマー'], a: 2, exp: 'カンボジアの国旗、アンコールワット' },
  { q: '🇱🇰 ライオンが 剣を 持っている 国旗の 国は?', opts: ['スリランカ', 'ブータン', 'ミャンマー', 'モルディブ'], a: 0, exp: 'スリランカ、シンハ(ライオン)旗' },
  { q: '🇧🇹 龍が 描かれた 国旗の 国は?', opts: ['ブータン', 'ベトナム', 'ラオス', 'モンゴル'], a: 0, exp: 'ブータン、雷龍の国' },
  { q: '🇸🇦 アラビア文字と 剣の 国旗の 国は?', opts: ['イラン', 'サウジアラビア', 'イラク', 'クウェート'], a: 1, exp: 'サウジアラビア、シャハーダと剣' },
  { q: '🇲🇪 黄色い 縁取りに 中央 紋章の 国旗は?', opts: ['モンテネグロ', 'スペイン', 'ポルトガル', 'マルタ'], a: 0, exp: 'モンテネグロ、双頭のワシ' },
  { q: '🇪🇸 上下赤・中央 黄色 (黄が広い)で 紋章付きの 国旗は?', opts: ['スペイン', 'ポルトガル', 'コロンビア', 'ベネズエラ'], a: 0, exp: 'スペイン、紋章付きの三色旗' },
  { q: '🇮🇸 青地に 赤い 縁取りの 白十字の 国旗は?', opts: ['アイスランド', 'ノルウェー', 'フィンランド', 'デンマーク'], a: 0, exp: 'アイスランド、3色の北欧十字' },
  { q: '🇧🇪 黒・黄・赤の 縦3色の 国旗は?', opts: ['ベルギー', 'ドイツ', 'ルーマニア', 'チャド'], a: 0, exp: 'ベルギーの三色旗(縦)' },
  { q: '🇩🇪 黒・赤・黄の 横3色の 国旗は?', opts: ['ベルギー', 'ドイツ', 'オーストリア', 'スペイン'], a: 1, exp: 'ドイツの三色旗(横)' },
  { q: '🇮🇹 緑・白・赤の 縦3色の 国旗は?', opts: ['アイルランド', 'イタリア', 'メキシコ', 'ブルガリア'], a: 1, exp: 'イタリアの三色旗、緑(希望)・白(信仰)・赤(愛)' },
  { q: '🇮🇪 緑・白・オレンジの 縦3色の 国旗は?', opts: ['イタリア', 'アイルランド', 'コートジボワール', 'ハンガリー'], a: 1, exp: 'アイルランドの三色旗' },
  { q: '🇫🇷 青・白・赤の 縦3色の 国旗は?', opts: ['オランダ', 'フランス', 'ロシア', 'ルクセンブルク'], a: 1, exp: 'フランスの三色旗(トリコロール)' },
  { q: '🇳🇱 赤・白・青の 横3色の 国旗は?', opts: ['オランダ', 'ロシア', 'クロアチア', 'ルクセンブルク'], a: 0, exp: 'オランダ、世界最古の三色旗(1572年)' },
  { q: '🇷🇺 白・青・赤の 横3色の 国旗は?', opts: ['ロシア', 'オランダ', 'ルクセンブルク', 'スロバキア'], a: 0, exp: 'ロシアの三色旗' },
  { q: '🇰🇼 緑・白・赤に 黒い 三角形 (左)の 国旗は?', opts: ['アラブ首長国連邦', 'クウェート', 'ヨルダン', 'スーダン'], a: 1, exp: 'クウェート、汎アラブ色' },
  { q: '🇯🇲 黒・緑・黄の X字 (斜め十字)の 国旗は?', opts: ['ジャマイカ', 'バルバドス', 'ガイアナ', 'グレナダ'], a: 0, exp: 'ジャマイカ、世界唯一の3色旗' },
  { q: '🇸🇨 5色 (青・黄・赤・白・緑)が 中心から 放射する 国旗は?', opts: ['セーシェル', 'モーリシャス', 'マダガスカル', 'コモロ'], a: 0, exp: 'セーシェル、5色の動的デザイン' },
  { q: '🇰🇮 上が 太陽と 鳥、 下が 波の 国旗は?', opts: ['キリバス', 'ナウル', 'ツバル', 'パラオ'], a: 0, exp: 'キリバス、太平洋の島国' },
  { q: '🇵🇼 青地に 黄色い 円 (やや左寄り)の 国旗は?', opts: ['日本', 'バングラデシュ', 'パラオ', 'マルタ'], a: 2, exp: 'パラオ、青は太平洋・黄は月' },
  { q: '🇧🇩 緑地に 赤い 円 (やや左寄り)の 国旗は?', opts: ['日本', 'バングラデシュ', 'パラオ', 'モルディブ'], a: 1, exp: 'バングラデシュ、緑は土地・赤は太陽' },
  { q: '🇵🇰 緑地に 白い 三日月と 星 (左に白い帯)の 国旗は?', opts: ['トルコ', 'パキスタン', 'マレーシア', 'チュニジア'], a: 1, exp: 'パキスタン、左の白帯はマイノリティを表す' },
  { q: '🇲🇾 赤白の ストライプに 青と 黄色の 月星 (canton部)の 国旗は?', opts: ['アメリカ', 'マレーシア', 'リベリア', 'チリ'], a: 1, exp: 'マレーシアの輝く16光線の星' },
  { q: '🇮🇱 白地に 青い ストライプと 中央 ダビデの星の 国旗は?', opts: ['ギリシャ', 'イスラエル', 'アルゼンチン', 'ウルグアイ'], a: 1, exp: 'イスラエル、ダビデの星' },
  { q: '🇦🇷 水色・白・水色の 横3色で 中央 太陽の 国旗は?', opts: ['アルゼンチン', 'ウルグアイ', 'ホンジュラス', 'パナマ'], a: 0, exp: 'アルゼンチン、5月の太陽' },
  { q: '🇺🇾 9本の 横ストライプと 太陽の 国旗は?', opts: ['アルゼンチン', 'ウルグアイ', 'チリ', 'パラグアイ'], a: 1, exp: 'ウルグアイ、9本の縞は最初の9州' },
  { q: '🇵🇪 赤・白・赤の 縦3色の 国旗は?', opts: ['ペルー', 'カナダ', 'ポーランド', 'インドネシア'], a: 0, exp: 'ペルーの三色旗(縦)' },
  { q: '🇨🇦 赤・白・赤の 縦3色 (中央 メープル)の 国旗は?', opts: ['ペルー', 'カナダ', 'インドネシア', 'モナコ'], a: 1, exp: 'カナダ国旗、中央メープルリーフ付き' },
  { q: '🇮🇩 赤・白の 横2色の 国旗は?', opts: ['インドネシア', 'モナコ', 'ポーランド', 'シンガポール'], a: 0, exp: 'インドネシア(横長)、モナコと類似だが比率違う' },
  { q: '🇲🇨 赤・白の 横2色 (短い)の 国旗は?', opts: ['インドネシア', 'モナコ', 'ポーランド', 'シンガポール'], a: 1, exp: 'モナコ、インドネシアより短い' },
  { q: '🇵🇱 白・赤の 横2色の 国旗は?', opts: ['ポーランド', 'モナコ', 'インドネシア', 'マルタ'], a: 0, exp: 'ポーランド、白は鷲・赤は背景' },
  { q: '🇸🇬 赤・白の 横2色 + 三日月と 5つ星 (赤帯内)の 国旗は?', opts: ['シンガポール', 'マレーシア', 'インドネシア', 'タイ'], a: 0, exp: 'シンガポール、月と5つの星' },
  { q: '🇻🇳 赤地に 黄色い 大きな 1つの 星の 国旗は?', opts: ['ベトナム', '中国', '北朝鮮', 'ラオス'], a: 0, exp: 'ベトナムの金星紅旗' },
  { q: '🇱🇦 赤・青・赤の 横3色 (青が広い)で 中央 白丸の 国旗は?', opts: ['ベトナム', 'ラオス', '中国', 'タイ'], a: 1, exp: 'ラオス、白丸は満月のメコン川' },
  { q: '🇹🇭 赤・白・青・白・赤の 横5色の 国旗は?', opts: ['ロシア', 'タイ', 'コスタリカ', 'パラグアイ'], a: 1, exp: 'タイ、青は王・白は宗教・赤は国民' },
  { q: '🇪🇬 赤・白・黒の 横3色で 中央 サラディンの ワシの 国旗は?', opts: ['イラク', 'シリア', 'エジプト', 'イエメン'], a: 2, exp: 'エジプト、サラディンのワシ' },
  { q: '🇲🇦 赤地に 緑の 五芒星の 国旗は?', opts: ['チュニジア', 'モロッコ', 'アルジェリア', 'モーリタニア'], a: 1, exp: 'モロッコ、ソロモンの星' },
  { q: '🇹🇷 赤地に 白い 三日月と 星の 国旗は?', opts: ['トルコ', 'チュニジア', 'パキスタン', 'マレーシア'], a: 0, exp: 'トルコ、月星旗の元祖' },
  { q: '🇬🇷 青と白の 9本の 横ストライプ + 左上 白十字の 国旗は?', opts: ['ギリシャ', 'チリ', 'マルタ', 'キプロス'], a: 0, exp: 'ギリシャ、9本は独立戦争のスローガンの音節数' },
  { q: '🇨🇾 白地に 黄色の 島の形 + オリーブの枝の 国旗は?', opts: ['キプロス', 'マルタ', 'コソボ', 'バチカン'], a: 0, exp: 'キプロス、地図入りの珍しい国旗' },
];

// ===== 🌐 세계 문화·역사 (50문제) =====
const QUIZ_WORLD = [
  { q: 'ピラミッドが ある 古代文明は?', opts: ['メソポタミア', 'エジプト', 'インダス', '黄河'], a: 1, exp: '古代エジプト文明、ナイル川流域' },
  { q: '世界四大文明に 含まれない のは?', opts: ['エジプト', 'メソポタミア', 'マヤ', 'インダス'], a: 2, exp: '四大文明:エジプト・メソポタミア・インダス・黄河' },
  { q: 'コロンブスが アメリカ大陸に 到達した 年は?', opts: ['1392年', '1492年', '1592年', '1692年'], a: 1, exp: '1492年、スペインの援助で航海' },
  { q: '「マグナ・カルタ」が 制定された 国は?', opts: ['フランス', 'イギリス', 'ドイツ', 'スペイン'], a: 1, exp: '1215年、イングランドで制定' },
  { q: 'フランス革命が 始まった 年は?', opts: ['1689年', '1789年', '1848年', '1917年'], a: 1, exp: '1789年、バスチーユ襲撃から' },
  { q: 'ロシア革命が 起きた 年は?', opts: ['1905年', '1917年', '1923年', '1939年'], a: 1, exp: '1917年、二月革命と十月革命' },
  { q: '第一次世界大戦が 始まった 年は?', opts: ['1914年', '1918年', '1939年', '1945年'], a: 0, exp: '1914年、サラエボ事件がきっかけ' },
  { q: '第二次世界大戦が 終わった 年は?', opts: ['1939年', '1941年', '1945年', '1949年'], a: 2, exp: '1945年、9月2日に正式降伏文書調印' },
  { q: 'ベルリンの壁が 崩壊した 年は?', opts: ['1979年', '1989年', '1991年', '2001年'], a: 1, exp: '1989年11月9日' },
  { q: 'アメリカの 独立宣言は 何年?', opts: ['1676年', '1776年', '1876年', '1976年'], a: 1, exp: '1776年7月4日' },
  { q: '「ナポレオン」が 皇帝に なった 年は?', opts: ['1789年', '1799年', '1804年', '1815年'], a: 2, exp: '1804年、フランス第一帝政' },
  { q: '産業革命が 始まった 国は?', opts: ['フランス', 'ドイツ', 'イギリス', 'アメリカ'], a: 2, exp: 'イギリス、18世紀後半から' },
  { q: 'ピカソの 出身国は?', opts: ['イタリア', 'スペイン', 'フランス', 'ポルトガル'], a: 1, exp: 'パブロ・ピカソは スペイン生まれ' },
  { q: '「モナリザ」を 描いた 画家は?', opts: ['ミケランジェロ', 'ダ・ヴィンチ', 'ラファエロ', 'ボッティチェリ'], a: 1, exp: 'レオナルド・ダ・ヴィンチ' },
  { q: 'シェイクスピアの 出身国は?', opts: ['アメリカ', 'イギリス', 'フランス', 'ドイツ'], a: 1, exp: 'ウィリアム・シェイクスピア、イングランド' },
  { q: 'モーツァルトの 出身国は?', opts: ['ドイツ', 'オーストリア', 'スイス', 'ハンガリー'], a: 1, exp: 'モーツァルトは オーストリア(ザルツブルク)' },
  { q: 'ベートーヴェンの 出身国は?', opts: ['ドイツ', 'オーストリア', 'フランス', 'ベルギー'], a: 0, exp: 'ベートーヴェンは ドイツ(ボン)生まれ' },
  { q: '「相対性理論」を 唱えた 学者は?', opts: ['ニュートン', 'アインシュタイン', 'ガリレオ', 'ボーア'], a: 1, exp: 'アルベルト・アインシュタイン' },
  { q: '電球を 発明した 人物は?', opts: ['ベル', 'エジソン', 'ワット', 'テスラ'], a: 1, exp: 'トーマス・エジソン(改良)' },
  { q: '「万有引力の法則」を 発見した のは?', opts: ['ニュートン', 'ガリレオ', 'ケプラー', 'コペルニクス'], a: 0, exp: 'アイザック・ニュートン' },
  { q: 'インド独立の 父と 呼ばれる 人物は?', opts: ['ネルー', 'ガンジー', 'ボーズ', 'タゴール'], a: 1, exp: 'マハトマ・ガンジー' },
  { q: 'ナチス・ドイツの 指導者は?', opts: ['ヒトラー', 'ムッソリーニ', 'スターリン', 'チャーチル'], a: 0, exp: 'アドルフ・ヒトラー' },
  { q: '「鉄のカーテン」と 呼ばれた 時代は?', opts: ['第一次大戦中', '第二次大戦中', '冷戦', '産業革命'], a: 2, exp: '冷戦時代の東西対立' },
  { q: '「アパルトヘイト」が あった 国は?', opts: ['アメリカ', 'ブラジル', '南アフリカ', 'インド'], a: 2, exp: '南アフリカ、人種隔離政策' },
  { q: '「ノーベル賞」を 創設した 国は?', opts: ['ノルウェー', 'スウェーデン', 'デンマーク', 'スイス'], a: 1, exp: 'スウェーデン(平和賞のみノルウェー)' },
  { q: '「五輪」(オリンピック)発祥の 国は?', opts: ['イタリア', 'ギリシャ', 'エジプト', 'ローマ'], a: 1, exp: '古代ギリシャのオリンピア' },
  { q: '近代オリンピック 第1回が 開かれた 都市は?', opts: ['アテネ', 'ローマ', 'パリ', 'ロンドン'], a: 0, exp: '1896年 アテネ' },
  { q: 'マリー・キュリー(キュリー夫人)の 出身国は?', opts: ['フランス', 'ポーランド', 'ドイツ', 'ロシア'], a: 1, exp: 'ポーランド出身、後にフランスで研究' },
  { q: 'コペルニクスが 唱えた 説は?', opts: ['天動説', '地動説', '進化論', '相対性理論'], a: 1, exp: '地動説、太陽中心説' },
  { q: '「ヨーロッパ連合(EU)」 の 本部が ある 都市は?', opts: ['パリ', 'ベルリン', 'ブリュッセル', 'アムステルダム'], a: 2, exp: 'ベルギーのブリュッセル' },
  { q: '世界保健機関(WHO) の 本部が ある 都市は?', opts: ['ニューヨーク', 'パリ', 'ジュネーブ', 'ローマ'], a: 2, exp: 'スイス・ジュネーブ' },
  { q: '国連の 本部が ある 都市は?', opts: ['ニューヨーク', 'ワシントン', 'ジュネーブ', 'パリ'], a: 0, exp: 'アメリカ・ニューヨーク' },
  { q: 'NATOの 本部が ある 都市は?', opts: ['ワシントン', 'ロンドン', 'ブリュッセル', 'パリ'], a: 2, exp: 'ベルギー・ブリュッセル' },
  { q: 'ロシアの 旧名 「ソビエト連邦」 が 解体した 年は?', opts: ['1989年', '1991年', '1995年', '2000年'], a: 1, exp: '1991年12月' },
  { q: '南北戦争が あった 国は?', opts: ['イギリス', 'アメリカ', 'ロシア', 'ドイツ'], a: 1, exp: 'アメリカ、1861-1865' },
  { q: 'リンカーン大統領が 発表した のは?', opts: ['権利章典', '奴隷解放宣言', '独立宣言', 'マグナ・カルタ'], a: 1, exp: '1863年、奴隷解放宣言' },
  { q: '「マルティン・ルーサー・キング」が 戦った 運動は?', opts: ['女性解放', '公民権', '反戦', '労働組合'], a: 1, exp: '黒人公民権運動' },
  { q: '「アンネの日記」が 書かれた 場所は?', opts: ['ドイツ', 'オランダ', 'ポーランド', 'フランス'], a: 1, exp: 'オランダ・アムステルダムの隠れ家' },
  { q: '「ピラミッド」と 「スフィンクス」が ある 場所は?', opts: ['カイロ', 'ギザ', 'ルクソール', 'アレクサンドリア'], a: 1, exp: 'ギザの三大ピラミッドとスフィンクス' },
  { q: 'マヤ文明が 栄えた 地域は?', opts: ['南米北部', '中米', 'アンデス', 'カリブ海'], a: 1, exp: '中米(メキシコ南部・グアテマラなど)' },
  { q: 'インカ帝国の 中心地は?', opts: ['メキシコ', 'ペルー', 'ブラジル', 'チリ'], a: 1, exp: 'ペルー(クスコ)' },
  { q: '「シルクロード」の 起点は?', opts: ['北京', '長安(西安)', '上海', '広州'], a: 1, exp: '長安(現在の西安)から西へ' },
  { q: '「万里の長城」を 築いた 国は?', opts: ['日本', '中国', '韓国', 'モンゴル'], a: 1, exp: '中国、秦の始皇帝が起源' },
  { q: 'チンギス・ハンが 建てた 帝国は?', opts: ['ローマ帝国', 'モンゴル帝国', 'オスマン帝国', 'マウリヤ朝'], a: 1, exp: 'モンゴル帝国(13世紀)' },
  { q: '「ジャンヌ・ダルク」 が 戦った 国は?', opts: ['フランス', 'スペイン', 'ドイツ', 'イタリア'], a: 0, exp: '百年戦争でフランスのために戦う' },
  { q: '「マルコ・ポーロ」が 訪れた 国は?', opts: ['日本', '中国', 'インド', 'モンゴル'], a: 1, exp: '元(中国)、フビライ・ハンに仕える' },
  { q: '「カエサル」が 暗殺された 場所は?', opts: ['アテネ', 'ローマ', 'カルタゴ', 'エルサレム'], a: 1, exp: '紀元前44年、ローマの元老院で暗殺' },
  { q: 'クレオパトラが 君臨した 王朝は?', opts: ['古代エジプト第18王朝', 'プトレマイオス朝', 'ローマ帝国', 'ササン朝'], a: 1, exp: 'プトレマイオス朝の最後の女王' },
  { q: '「ペスト(黒死病)」が ヨーロッパで 大流行した 世紀は?', opts: ['11世紀', '14世紀', '17世紀', '19世紀'], a: 1, exp: '14世紀、ヨーロッパ人口の3分の1が死亡' },
  { q: '「ガリレオ・ガリレイ」 が 唱えた 説は?', opts: ['天動説', '地動説', '進化論', '量子論'], a: 1, exp: '地動説の支持者' },
];

// ===== 🔬 과학·자연 (50문제) =====
const QUIZ_SCIENCE = [
  { q: '太陽系の 惑星は いくつ?', opts: ['7', '8', '9', '10'], a: 1, exp: '2006年に冥王星が準惑星に。現在8つ' },
  { q: '太陽に 一番 近い 惑星は?', opts: ['水星', '金星', '地球', '火星'], a: 0, exp: '水星(マーキュリー)' },
  { q: '太陽系で 一番 大きい 惑星は?', opts: ['土星', '木星', '天王星', '海王星'], a: 1, exp: '木星(ジュピター)、地球の約11倍' },
  { q: '地球の 衛星は?', opts: ['火星', '太陽', '月', '金星'], a: 2, exp: '月、地球唯一の天然衛星' },
  { q: '光の 速さは 約 何km/秒?', opts: ['3万', '30万', '300万', '3000万'], a: 1, exp: '約30万km/秒(299,792km/秒)' },
  { q: '水の 化学式は?', opts: ['CO₂', 'H₂O', 'NaCl', 'O₂'], a: 1, exp: 'H₂O、水素2 + 酸素1' },
  { q: '空気中で 一番 多い 気体は?', opts: ['酸素', '二酸化炭素', '窒素', 'アルゴン'], a: 2, exp: '窒素(約78%)、酸素は約21%' },
  { q: '人間の 体内で 一番 大きい 臓器は?', opts: ['心臓', '肝臓', '肺', '皮膚'], a: 3, exp: '皮膚は最大の臓器(臓器を含めば)' },
  { q: '人間の 染色体の 数は?', opts: ['23', '46', '23対(46本)', '24対'], a: 2, exp: '23対46本、性染色体含む' },
  { q: '光合成で 植物が 作る ものは?', opts: ['酸素と糖', '酸素と水', '水と糖', 'CO₂と水'], a: 0, exp: '光合成:CO₂+H₂O→糖+O₂' },
  { q: 'DNA を 構成する 塩基は?', opts: ['ATGC', 'AUGC', 'ATCD', 'ABCD'], a: 0, exp: 'A・T・G・C(RNAではU)' },
  { q: '元素番号 1番は?', opts: ['ヘリウム', '水素', 'リチウム', '酸素'], a: 1, exp: '水素(H)、原子番号1' },
  { q: '元素番号 2番は?', opts: ['水素', 'ヘリウム', 'リチウム', '酸素'], a: 1, exp: 'ヘリウム(He)' },
  { q: '元素番号 8番は?', opts: ['炭素', '窒素', '酸素', '硫黄'], a: 2, exp: '酸素(O)、原子番号8' },
  { q: '雷が 光って から 音が 聞こえるまで 時間が かかる 理由は?', opts: ['光と音の速度差', '雷雲との距離', '空気の温度差', '気圧の差'], a: 0, exp: '光は約30万km/秒、音は約340m/秒' },
  { q: '虹の 色は 何色?', opts: ['5色', '6色', '7色', '8色'], a: 2, exp: '赤橙黄緑青藍紫の7色(国により異なる)' },
  { q: '地球から 一番 近い 恒星は?', opts: ['シリウス', '太陽', 'ベガ', 'プロキシマ・ケンタウリ'], a: 1, exp: '太陽は最も近い恒星(約1.5億km)' },
  { q: '人間が 月面に 初めて 立った のは?', opts: ['1957年', '1961年', '1969年', '1975年'], a: 2, exp: '1969年7月20日、アポロ11号' },
  { q: '月に 最初に 立った 人は?', opts: ['ガガーリン', 'アームストロング', 'オルドリン', 'グレン'], a: 1, exp: 'ニール・アームストロング' },
  { q: '人類初の 宇宙飛行士は?', opts: ['アームストロング', 'ガガーリン', 'コロンバス', 'グレン'], a: 1, exp: 'ユーリ・ガガーリン(ソ連、1961年)' },
  { q: '一年は 約 何日?', opts: ['365日', '365.25日', '366日', '364.5日'], a: 1, exp: '365.25日、4年に1回うるう年' },
  { q: '北半球で 夏が 一番 暑く なる 月は?', opts: ['6月', '7月', '8月', '9月'], a: 2, exp: '日本では一般に8月、海洋熱の遅れによる' },
  { q: '光は 真空中を 1秒間に 約 どれくらい 進む?', opts: ['月まで', '地球を7周半', '太陽まで', '火星まで'], a: 1, exp: '地球を約7.5周(地球1周は約4万km)' },
  { q: '海水の 塩分濃度は 約 何%?', opts: ['1%', '3.5%', '7%', '15%'], a: 1, exp: '約3.5%(平均)' },
  { q: '地球で 一番 深い 場所は?', opts: ['マリアナ海溝', 'チャレンジャー海溝', '日本海溝', 'プエルトリコ海溝'], a: 0, exp: 'マリアナ海溝のチャレンジャー海淵 約10,920m' },
  { q: '地震の 大きさを 表す 単位は?', opts: ['マグニチュード', '震度', 'ベクレル', 'デシベル'], a: 0, exp: 'マグニチュードは規模、震度は揺れの強さ' },
  { q: '人体に 含まれる 水分は 約 何%?', opts: ['40%', '50%', '60%', '70%'], a: 2, exp: '成人で約60%、赤ちゃんは80%' },
  { q: '人間の 心臓は 1日に 約 何回 鼓動する?', opts: ['1万回', '5万回', '10万回', '50万回'], a: 2, exp: '約10万回(60-100/分 × 60 × 24)' },
  { q: '音速(空気中)は 約 何m/秒?', opts: ['100', '340', '1000', '3000'], a: 1, exp: '約340m/秒(15℃の空気中)' },
  { q: '電気の 単位 「W(ワット)」 が 表す ものは?', opts: ['電流', '電圧', '電力', '抵抗'], a: 2, exp: '電力(P=V×I)' },
  { q: '太陽の 表面温度は 約 何度?', opts: ['1000度', '6000度', '10000度', '100000度'], a: 1, exp: '約6,000度(光球温度)' },
  { q: '生物の 5界(モネラ・原生・菌・植物・動物)で 細菌が 含まれる のは?', opts: ['モネラ界', '原生生物界', '菌界', '動物界'], a: 0, exp: '細菌は核を持たない原核生物=モネラ界' },
  { q: '酸性雨の 原因と なる 気体は?', opts: ['二酸化炭素', '硫黄酸化物', 'メタン', 'オゾン'], a: 1, exp: '硫黄酸化物・窒素酸化物が主因' },
  { q: 'オゾン層は 大気の どこに ある?', opts: ['対流圏', '成層圏', '中間圏', '熱圏'], a: 1, exp: '成層圏(地上約20-30km)' },
  { q: '人間の 永久歯は 全部で 何本?', opts: ['28本', '30本', '32本', '34本'], a: 2, exp: '32本(親知らず4本含む)' },
  { q: '血液型 「ABO」 を 発見した 人は?', opts: ['パスツール', 'ラントシュタイナー', 'メンデル', 'ダーウィン'], a: 1, exp: 'カール・ラントシュタイナー(1900年)' },
  { q: '進化論を 唱えた のは?', opts: ['メンデル', 'ダーウィン', 'パスツール', 'リンネ'], a: 1, exp: 'チャールズ・ダーウィン「種の起源」' },
  { q: '遺伝の法則を 発見した のは?', opts: ['ダーウィン', 'メンデル', 'ワトソン', 'クリック'], a: 1, exp: 'グレゴール・メンデル、エンドウ豆の実験' },
  { q: 'ペニシリンを 発見した 人は?', opts: ['フレミング', 'パスツール', 'コッホ', 'ジェンナー'], a: 0, exp: 'アレクサンダー・フレミング(1928年)' },
  { q: '電気の 「+」と「-」 を 発見した のは?', opts: ['ベンジャミン・フランクリン', 'ボルタ', 'エジソン', 'テスラ'], a: 0, exp: 'ベンジャミン・フランクリン(雷の研究)' },
  { q: 'X線を 発見した のは?', opts: ['キュリー夫人', 'レントゲン', 'アインシュタイン', 'ニュートン'], a: 1, exp: 'ヴィルヘルム・レントゲン(1895年)' },
  { q: 'ラジウムを 発見した 夫妻は?', opts: ['キュリー夫妻', 'メンデル夫妻', 'パスツール夫妻', 'コッホ夫妻'], a: 0, exp: 'ピエール&マリー・キュリー' },
  { q: 'iPS細胞を 開発した 日本人は?', opts: ['利根川進', '山中伸弥', '大隅良典', '本庶佑'], a: 1, exp: '山中伸弥、2012年ノーベル賞' },
  { q: '日本人 初の ノーベル賞 受賞者は?', opts: ['湯川秀樹', '朝永振一郎', '川端康成', '佐藤栄作'], a: 0, exp: '湯川秀樹、1949年物理学賞' },
  { q: 'ブラックホールを 初めて 撮影した のは?', opts: ['2015年', '2017年', '2019年', '2021年'], a: 2, exp: '2019年、イベントホライズンテレスコープ' },
  { q: '太陽の 光が 地球に 届く まで 約 何分?', opts: ['8秒', '8分', '80分', '8時間'], a: 1, exp: '約8分20秒' },
  { q: '人間の 細胞数は 約?', opts: ['37億', '37兆', '37万億', '370兆'], a: 1, exp: '約37兆個(約60兆という古い説もあり)' },
  { q: '地球の 自転周期は?', opts: ['12時間', '24時間', '24時間4分', '23時間56分'], a: 3, exp: '正確には23時間56分4秒(恒星時)' },
  { q: '人類最古の 化石「ルーシー」が 発見された 場所は?', opts: ['ケニア', 'タンザニア', 'エチオピア', '南アフリカ'], a: 2, exp: 'エチオピア、約320万年前のアウストラロピテクス' },
  { q: '原子の 中心に ある のは?', opts: ['電子', '原子核', '陽子だけ', '中性子だけ'], a: 1, exp: '原子核(陽子+中性子)、周りに電子' },
];

// ===== 통합 =====
const QUIZ_CATEGORIES = [
  { id: 'jp_geo', label: '🗾 日本地理', data: QUIZ_JP_GEO },
  { id: 'jp_hist', label: '🏯 日本歴史', data: QUIZ_JP_HIST },
  { id: 'jp_culture', label: '🍱 日本文化', data: QUIZ_JP_CULTURE },
  { id: 'world_geo', label: '🌍 世界地理', data: QUIZ_WORLD_GEO },
  { id: 'flags', label: '🏳️ 国旗', data: QUIZ_FLAGS },
  { id: 'world', label: '🌐 世界文化', data: QUIZ_WORLD },
  { id: 'science', label: '🔬 科学', data: QUIZ_SCIENCE },
];
