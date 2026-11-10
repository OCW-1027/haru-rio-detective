/* 英検準1級 ライティング バンク D (オリジナル) */
EIKEN_P1_WRITE.push(
  { type: 'summary', id: 'p1sum7', title: '要約: 学校の 給食と 食育',
    passage: [
      'School lunches in Japan are known around the world for being healthy and well balanced. Meals are planned by nutritionists, and students often serve the food to their classmates and clean up afterward. Many schools also use ingredients from local farms.',
      'Supporters say that school lunches teach children valuable lessons beyond nutrition. By serving and cleaning, students learn responsibility and cooperation. Using local ingredients helps children understand where their food comes from and supports local agriculture.',
      'However, school lunch programs face financial pressure. Rising food prices have made it difficult for schools to maintain quality without raising fees, which can burden low-income families. Some local governments have responded by making school lunches free, but critics argue that this places a heavy burden on public budgets.' ],
    instruction: '上の 英文の 要約を 60〜70語の 英語で 書きなさい。', min: 60, max: 70,
    model: 'Japanese school lunches are internationally praised for their nutrition, and students serve and clean up meals that often use local produce. Advocates say this teaches responsibility, cooperation, and the origins of food while supporting farmers. Nevertheless, rising food costs threaten quality or force higher fees that strain poorer families, and although some areas now provide free lunches, critics warn this heavily burdens public finances.',
    tips: ['特徴 → 教育効果 → 財政問題 の 3要素', 'serve the food / clean up → students serve and clean up', 'although で 無償化と その批判を 1文に'] },
  { type: 'summary', id: 'p1sum8', title: '要約: 自動販売機の 未来',
    passage: [
      'Japan has one of the highest numbers of vending machines per person in the world. They can be found on almost every street corner, selling drinks, snacks, and even hot meals. Their convenience has made them a familiar part of everyday life.',
      'In recent years, vending machines have evolved. Some use cameras to recommend drinks based on the customer\'s age and the weather. Others accept cashless payments and are connected to the internet, allowing companies to monitor stock levels and reduce wasted trips to refill machines.',
      'However, the total number of vending machines has been decreasing. The rise of convenience stores, which offer a wider range of products, has reduced demand. In addition, critics point out that machines consume large amounts of electricity, and some operators have begun removing unprofitable machines to save costs.' ],
    instruction: '上の 英文の 要約を 60〜70語の 英語で 書きなさい。', min: 60, max: 70,
    model: 'Vending machines are extremely common in Japan and form part of daily life. Recently, they have become more advanced, using cameras to suggest products, accepting cashless payments, and connecting online so companies can track stock efficiently. However, their numbers are falling because convenience stores offer more choices, and concerns about high electricity use have led operators to remove machines that do not make money.',
    tips: ['普及 → 進化 → 減少の 理由 の 構成', '進化の 例は 3つを 1文に 並べる', 'unprofitable → that do not make money と 言い換え'] },
  { type: 'opinion', id: 'p1op9', title: '意見: 投票を 義務化すべき?',
    question: 'Agree or disagree: Voting in national elections should be compulsory.',
    points: ['Democracy', 'Freedom of choice', 'Political awareness', 'Cost'],
    instruction: 'TOPIC について あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。120〜150語。', min: 120, max: 150,
    model: 'I disagree that voting in national elections should be compulsory. First, the freedom not to vote is part of democracy. Some people choose not to vote because they do not support any candidate, and this choice itself can express dissatisfaction with politics. Forcing everyone to vote would take away this freedom and could be seen as a form of government control. Second, compulsory voting may not improve the quality of decisions. People who are forced to vote without interest may choose candidates randomly or based on popularity rather than policies. A better solution would be to increase political awareness through education and make voting more convenient, for example by introducing online voting. In this way, more people would participate willingly. For these reasons, I believe voting should remain voluntary.',
    tips: ['反対の 立場 + 代案 (教育・オンライン投票)', '理由1 = 原則 (自由)、理由2 = 結果 (質) と 種類を 分ける', 'voluntary / compulsory の 対比で 結論'] },
  { type: 'opinion', id: 'p1op10', title: '意見: 在宅勤務は 標準に なるべき?',
    question: 'Should working from home become the standard way of working?',
    points: ['Productivity', 'Work-life balance', 'Teamwork', 'Office costs'],
    instruction: 'TOPIC について あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。120〜150語。', min: 120, max: 150,
    model: 'I do not think working from home should become the standard way of working. First, teamwork suffers when employees rarely meet in person. Casual conversations in the office often lead to new ideas and help solve problems quickly. Online meetings cannot fully replace these spontaneous interactions, and new employees in particular may find it difficult to learn from experienced colleagues. Second, working from home can blur the line between work and private life. Many people end up working longer hours because they find it hard to switch off when their office is in their home. This can lead to stress and burnout. That said, flexible arrangements that allow people to work from home a few days a week can be beneficial. Therefore, I believe a hybrid model is better than making remote work the standard.',
    tips: ['That said, … で 部分的な 譲歩 → 結論 (ハイブリッド)', '新入社員の 学びという 具体的な 視点', '120〜150語の 範囲に 調整'] }
);
