/* 英検2級 ライティング バンク G (オリジナル) — 要約 2題 + 意見 2題 */
EIKEN_G2_WRITE.push(
  { type: 'summary', id: 'sum19', title: '要約: 熱中症対策',
    passage: [
      'In recent years, summers in Japan have become much hotter. Every year, many people are taken to the hospital because of heatstroke. Surprisingly, many of them are elderly people who were at home when they became sick.',
      'There are several reasons for this. Older people often do not feel thirsty or hot even when their bodies need water or cooling. Some of them also try to save money by not using air conditioners. In addition, many elderly people live alone, so no one notices when they become ill.',
      'To solve this problem, some cities have started programs in which volunteers visit or call elderly people during heat waves. Cities have also opened public buildings, such as libraries, as cool places where anyone can rest. Experts advise people to drink water often and to use air conditioners without hesitation.' ],
    instruction: '上の 英文の 要約を 45〜55語で 書きなさい。', min: 45, max: 55,
    model: 'As Japanese summers grow hotter, many elderly people at home suffer from heatstroke. Older people may not notice thirst or heat, may avoid air conditioners to save money, and often live alone. Some cities now have volunteers check on them and open public cool spaces, while experts recommend drinking water and using air conditioners.',
    tips: ['現状 → 原因 3つ → 対策 (市・専門家)', 'There are several reasons → 理由を 3つ 並べて 1文に', 'without hesitation は 省いて よい'] },
  { type: 'summary', id: 'sum20', title: '要約: 給食の 地産地消',
    passage: [
      'In many Japanese schools, school lunches now include vegetables, rice, and fish produced in the local area. This idea is called chisan-chisho, which means producing and consuming food locally. Some schools even invite local farmers to talk to students about how they grow food.',
      'Supporters say that using local food has many benefits. Fresh food tastes better and is more nutritious because it does not have to travel far. Buying from local farmers also supports the local economy. Moreover, students learn about the food culture of their area and become more interested in what they eat.',
      'However, there are some difficulties. Local farms cannot always provide enough food for all schools, especially in winter. Local food can also be more expensive than imported food. Because of this, many schools use local food only for some of their meals.' ],
    instruction: '上の 英文の 要約を 45〜55語で 書きなさい。', min: 45, max: 55,
    model: 'Many Japanese schools now serve locally produced food in school lunches. This provides fresher, more nutritious meals, supports local farmers, and helps students learn about their local food culture. However, local farms cannot always supply enough, especially in winter, and local food may cost more, so many schools use it only in some meals.',
    tips: ['取り組み → 利点 3つ → 課題 → 結果', 'tastes better and is more nutritious → fresher, more nutritious', 'Because of this → so で つなぐ'] },
  { type: 'opinion', id: 'op19', title: '意見: 小学生も 英語の 試験を 受けるべき?',
    question: 'Do you think elementary school students should take English tests?',
    points: ['Motivation', 'Stress', 'Future'],
    instruction: 'あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。80〜100語。', min: 80, max: 100,
    model: 'I think elementary school students should take English tests. First, tests can give children a clear goal. When students know they will take a test, they study harder and feel proud when they pass. This motivation can help them continue learning English for many years. Second, English will be very important in their future. If children start building their skills early, it will be easier for them to study abroad or work with people from other countries later. However, the tests should not be too difficult. For these reasons, I believe English tests are good for children.',
    tips: ['目標 → やる気 → 継続 の 流れ', 'If children start … early, it will be easier … で 将来の 効果', 'However, … で Stress (難しすぎない) にも 配慮'] },
  { type: 'opinion', id: 'op20', title: '意見: 町に もっと 公園が 必要?',
    question: 'Do you think cities should create more parks?',
    points: ['Health', 'Environment', 'Cost'],
    instruction: 'あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。80〜100語。', min: 80, max: 100,
    model: 'I think cities should create more parks. First, parks are good for people\'s health. In parks, children can play safely, and adults can walk or exercise in the fresh air. Spending time in nature can also help people relax and reduce stress. Second, parks are good for the environment. Trees and plants clean the air and help keep cities cool in hot summers. They also provide homes for birds and insects. Some people may say that parks cost a lot of money, but the benefits are worth it. For these reasons, I believe cities need more parks.',
    tips: ['体の 健康 + 心の 健康 (ストレス) を 1つの 理由に', '木が 空気を きれいに・都市を 涼しく → Environment', 'Some people may say … but … で Cost に 反論'] }
);
