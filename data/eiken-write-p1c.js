/* 英検準1級 ライティング バンク C (オリジナル) */
EIKEN_P1_WRITE.push(
  { type: 'summary', id: 'p1sum5', title: '要約: 副業の 解禁',
    passage: [
      'In the past, most Japanese companies did not allow their employees to have second jobs. Employers believed that workers should devote all their energy to one company. In recent years, however, the government has encouraged companies to permit side jobs, and a growing number of firms have changed their rules.',
      'Supporters argue that side jobs benefit both workers and companies. Employees can earn extra income and develop new skills, which they may bring back to their main job. Some companies even see side jobs as a way to keep talented workers who might otherwise leave for more interesting opportunities.',
      'However, there are concerns. Working two jobs may lead to long hours and exhaustion, which can harm both health and performance. Companies also worry that employees might share confidential information with competitors or focus more on their side business than on their main duties.' ],
    instruction: '上の 英文の 要約を 60〜70語の 英語で 書きなさい。', min: 60, max: 70,
    model: 'Although Japanese companies traditionally banned second jobs, more firms are now allowing them with government encouragement. Advocates say side jobs let workers earn more and gain skills useful in their main work, and may help companies retain talented staff. Nevertheless, holding two jobs could cause overwork that damages health and performance, and employers fear leaks of confidential information or reduced commitment to their primary roles.',
    tips: ['Although で 過去と 現在の 変化を 1文に', '利点: 個人 (収入・技能) + 会社 (人材確保)', '懸念: 健康 + 情報漏洩・本業への 影響'] },
  { type: 'summary', id: 'p1sum6', title: '要約: 植物由来の 代替肉',
    passage: [
      'Plant-based meat substitutes, made from ingredients such as soybeans and peas, have become widely available in supermarkets and restaurants. Companies have worked hard to make these products look and taste like real meat, and sales grew rapidly in the late 2010s.',
      'Supporters claim that replacing meat with plant-based alternatives can significantly reduce greenhouse gas emissions and the amount of land and water used for farming. They also point out that such products do not require animals to be killed, which appeals to consumers concerned about animal welfare.',
      'Recently, however, sales growth has slowed in some countries. Many consumers say the products are too expensive compared with regular meat. Others are concerned that they are highly processed and contain many additives, which makes them less healthy than they first appear.' ],
    instruction: '上の 英文の 要約を 60〜70語の 英語で 書きなさい。', min: 60, max: 70,
    model: 'Meat substitutes made from plants such as soybeans have spread to stores and restaurants, as companies have made them resemble real meat. Advocates argue that they cut emissions, save land and water, and avoid harming animals. However, sales have slowed in some places because many shoppers find them more costly than ordinary meat and worry that they are heavily processed and full of additives.',
    tips: ['普及 → 支持理由 (環境・動物) → 減速の 理由 (価格・加工度)', 'soybeans and peas は 1つ 例示すれば 十分', 'less healthy than they first appear → worry about processing'] },
  { type: 'opinion', id: 'p1op7', title: '意見: SNSの 年齢制限は 必要?',
    question: 'Agree or disagree: The government should ban children under 16 from using social media.',
    points: ['Mental health', 'Online safety', 'Freedom of expression', 'Parental responsibility'],
    instruction: 'TOPIC について あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。120〜150語。', min: 120, max: 150,
    model: 'I agree that the government should ban children under 16 from using social media. First, social media can harm young people\'s mental health. Many platforms are designed to keep users scrolling for as long as possible, and constant comparison with others\' seemingly perfect lives can lead to anxiety and low self-esteem. Studies have linked heavy social media use among teenagers to rising rates of depression. Second, a legal ban would protect children from online dangers such as cyberbullying and contact with strangers who may wish to harm them. Although parents should play a role, it is extremely difficult for them to monitor their children\'s online activities constantly. A clear law would support parents and make technology companies take responsibility. For these reasons, I believe an age restriction on social media is necessary.',
    tips: ['Although parents should … で 「親の 責任」という 反論に 対処', '研究結果に 触れると 説得力 (Studies have linked …)', '結論で 理由を 短く 言い換えても よい'] },
  { type: 'opinion', id: 'p1op8', title: '意見: 移民受け入れを 拡大すべき?',
    question: 'Should Japan accept more foreign workers to deal with its labor shortage?',
    points: ['Aging population', 'Economy', 'Cultural differences', 'Public services'],
    instruction: 'TOPIC について あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。120〜150語。', min: 120, max: 150,
    model: 'I believe Japan should accept more foreign workers to deal with its labor shortage. First, Japan\'s population is aging rapidly, and the number of working-age people is shrinking. Industries such as nursing care, construction, and agriculture already struggle to find enough workers, and this problem will become more serious. Foreign workers can fill these positions and help essential services continue. Second, accepting foreign workers can strengthen the economy. With more workers, companies can maintain production and continue to grow, which will also generate tax revenue to support pensions and health care for the elderly. Of course, the government must provide language education and support so that foreign residents can live comfortably and communicate with local communities. With such measures in place, accepting more foreign workers will benefit Japan greatly.',
    tips: ['具体的な 業界名 (介護・建設・農業) で 説得力', 'Of course, … で 課題 (文化・言語) に 触れ、解決策を 示す', '120語以上を 確保'] }
);
