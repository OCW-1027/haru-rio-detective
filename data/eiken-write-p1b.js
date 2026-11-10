/* 英検準1級 ライティング バンク B (オリジナル) */
EIKEN_P1_WRITE.push(
  { type: 'summary', id: 'p1sum3', title: '要約: フードデリバリー',
    passage: [
      'Food delivery apps have grown rapidly over the past few years. With just a few taps on a smartphone, customers can order meals from a wide range of restaurants and have them delivered within minutes. Many restaurants that previously offered only dine-in service now rely on these apps for a large share of their sales.',
      'For customers, the apps provide convenience, especially for busy workers and people who cannot easily go out. Restaurants can reach new customers without opening additional locations, and the apps have created flexible work opportunities for delivery riders.',
      'However, critics point to several problems. The apps often charge restaurants high commissions, which can reduce their already small profits. Delivery riders are usually treated as independent contractors rather than employees, so they lack benefits such as health insurance and may face dangerous working conditions on busy roads.' ],
    instruction: '上の 英文の 要約を 60〜70語の 英語で 書きなさい。', min: 60, max: 70,
    model: 'Food delivery apps have expanded quickly, and many restaurants now depend on them for sales. They benefit busy customers, help restaurants attract new diners without opening more branches, and offer flexible jobs to riders. Nevertheless, critics argue that high commission fees cut into restaurants\' profits, and that riders, classified as contractors, receive no benefits and often work in risky conditions on crowded roads.',
    tips: ['3段落 = 現状 / 利点 (客・店・配達員) / 問題点 (手数料・待遇)', '利点は 3者の 立場で 整理すると 漏れが ない', 'rather than employees → classified as contractors'] },
  { type: 'summary', id: 'p1sum4', title: '要約: 宇宙ごみ',
    passage: [
      'Since the start of the space age, thousands of satellites and rockets have been launched into orbit. Many of them are no longer working but remain in space, along with millions of small fragments created by collisions and explosions. This material is known as space debris.',
      'Space debris poses a serious threat because it travels at extremely high speeds. Even a tiny piece can damage a working satellite or the International Space Station. As more companies launch large groups of satellites for internet services, experts fear that collisions will become more frequent.',
      'Several solutions are being developed. Some companies are testing spacecraft that can capture debris with nets or magnets and pull it down into the atmosphere, where it burns up. International agencies have also introduced guidelines requiring satellites to be removed from orbit within a certain period after their missions end.' ],
    instruction: '上の 英文の 要約を 60〜70語の 英語で 書きなさい。', min: 60, max: 70,
    model: 'Many inactive satellites, rockets, and fragments, known as space debris, now orbit the Earth. Because they move at tremendous speeds, even small pieces can damage satellites and the space station, and the growing number of commercial satellites may increase collisions. To tackle this, companies are developing craft that capture debris and drag it into the atmosphere, while international rules require satellites to leave orbit after their missions.',
    tips: ['定義 → 危険性 → 対策 の 3段構成', 'nets or magnets は 具体例なので 省略して よい', 'burns up は drag it into the atmosphere だけで 意味が 伝わる'] },
  { type: 'opinion', id: 'p1op5', title: '意見: 再生可能エネルギーで 原子力を 置き換えられるか',
    question: 'Can renewable energy completely replace nuclear power in the future?',
    points: ['Technology', 'Cost', 'Stability of supply', 'Safety'],
    instruction: 'TOPIC について あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。120〜150語。', min: 120, max: 150,
    model: 'I believe that renewable energy can completely replace nuclear power in the future. First, technology is advancing rapidly. Solar panels and wind turbines have become far more efficient, and new battery systems can store electricity for use when the sun is not shining or the wind is not blowing. These improvements are solving the main weakness of renewable energy, which is unstable supply. Second, renewable energy is becoming cheaper, while nuclear power is becoming more expensive. Building nuclear plants requires enormous investment and strict safety measures, and dealing with radioactive waste costs even more. In contrast, the price of solar power has fallen dramatically over the past decade. Although the transition will take time, these trends suggest that renewable sources will eventually be able to meet our energy needs on their own.',
    tips: ['予測型の 問いは can / will で 答える', 'In contrast, で 2つの エネルギーを 比較', 'Although 〜 で 反対意見を 認めてから 結論へ'] },
  { type: 'opinion', id: 'p1op6', title: '意見: 高齢者の 運転免許は 制限すべき?',
    question: 'Agree or disagree: Elderly people should be required to give up their driver\'s licenses at a certain age.',
    points: ['Road safety', 'Independence', 'Public transportation', 'Individual ability'],
    instruction: 'TOPIC について あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。120〜150語。', min: 120, max: 150,
    model: 'I disagree with the idea that elderly people should be required to give up their licenses at a certain age. First, driving ability differs greatly between individuals. Some people in their eighties are healthier and more careful than drivers who are much younger. Instead of setting an age limit, governments should require regular tests of eyesight and reaction time so that only unsafe drivers lose their licenses. Second, many elderly people depend on cars to live independently. In rural areas, buses and trains are often infrequent or have disappeared completely. Without a car, older people may be unable to shop, see a doctor, or visit friends, which could harm both their physical and mental health. For these reasons, I believe licenses should be judged by ability, not by age alone.',
    tips: ['disagree + 代案 (定期的な 適性検査) で 説得力', 'POINTS の Individual ability / Public transportation を 理由に 使用', '結論で by ability, not by age と 対比して 締める'] }
);
