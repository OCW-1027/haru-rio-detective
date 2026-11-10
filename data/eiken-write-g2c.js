/* 英検2級 ライティング バンク C (オリジナル) */
EIKEN_G2_WRITE.push(
  { type: 'summary', id: 'sum9', title: '要約: 自転車の ヘルメット',
    passage: [
      'In Japan, a new rule was introduced in 2023 that asks all bicycle riders to try to wear helmets. Before this, only young children were expected to wear them. However, there is no penalty for people who do not follow the rule.',
      'Experts say helmets are very important for safety. Many people who die in bicycle accidents suffer head injuries. Studies show that wearing a helmet can greatly reduce the risk of serious injury in an accident.',
      'Even so, many people still do not wear helmets. Some say helmets are uncomfortable, especially in hot summer weather. Others think helmets do not look fashionable, or they do not want to carry them around after riding.' ],
    instruction: '上の 英文の 要約を 45〜55語で 書きなさい。', min: 45, max: 55,
    model: 'Since 2023, Japan has asked all cyclists to make an effort to wear helmets, though there is no punishment. Experts stress that helmets greatly reduce serious head injuries in accidents. However, many riders still avoid them because helmets are uncomfortable in summer, unfashionable, or inconvenient to carry.',
    tips: ['規則 → 重要性 → 着用しない 理由 の 順', '理由は 3つを 1文に まとめる (because A, B, or C)', 'try to wear → make an effort to wear'] },
  { type: 'summary', id: 'sum10', title: '要約: シニアの 再就職',
    passage: [
      'In Japan, more and more people are continuing to work after the age of 65. Many companies have raised their retirement age or offer contracts to older employees who want to keep working.',
      'There are several reasons for this trend. Some older people need extra income because their pensions are not enough. Others want to stay active and keep in touch with society. Companies also benefit because they can use the experience and skills of older workers.',
      'However, older workers sometimes face difficulties. They may find it hard to learn new technology quickly. In addition, some jobs require physical strength, so companies need to provide suitable work for older employees.' ],
    instruction: '上の 英文の 要約を 45〜55語で 書きなさい。', min: 45, max: 55,
    model: 'An increasing number of Japanese people keep working after 65, as companies extend retirement ages. Older people work for extra income or to stay active, and companies value their experience. However, older workers may struggle with new technology and physically demanding jobs, so suitable roles must be prepared for them.',
    tips: ['理由は 本人側 (収入・社会参加) と 会社側 (経験) に 分ける', 'raised their retirement age → extend retirement ages', '最後の 段落の 「会社が すべきこと」まで 入れる'] },
  { type: 'opinion', id: 'op11', title: '意見: 高校生の アルバイトは 良い?',
    question: 'Do you think it is good for high school students to have part-time jobs?',
    points: ['Money', 'Work experience', 'Study'],
    instruction: 'あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。80〜100語。', min: 80, max: 100,
    model: 'I think it is good for high school students to have part-time jobs. First, students can learn the value of money. When they work hard to earn money themselves, they understand how difficult it is and start to spend it more carefully. Second, part-time jobs give students useful work experience. They learn how to communicate with customers and coworkers, and they learn the importance of being on time. These skills will help them in the future. For these reasons, I believe part-time jobs are good for high school students.',
    tips: ['反対なら Study (勉強時間が 減る) を 使える', 'learn the value of money は 便利な 表現', '具体的な 技能 (接客・時間を 守る) を 書く'] },
  { type: 'opinion', id: 'op12', title: '意見: 自動運転車は 普及するか',
    question: 'Do you think self-driving cars will become common in the future?',
    points: ['Safety', 'Technology', 'Elderly people'],
    instruction: 'あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。80〜100語。', min: 80, max: 100,
    model: 'I think self-driving cars will become common in the future. First, they can help elderly people. In rural areas, many older people need cars to go shopping or see a doctor, but driving becomes dangerous as they get older. Self-driving cars would allow them to travel safely. Second, technology is improving quickly. Many companies are already testing self-driving cars and buses on real roads, and they are becoming safer every year. For these reasons, I believe self-driving cars will be common in the future.',
    tips: ['未来予測 → will', '地方の 高齢者という 具体的な 場面を 示す', '「すでに 試験中」という 事実で 説得力'] }
);
