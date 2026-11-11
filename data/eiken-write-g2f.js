/* 英検2級 ライティング バンク F (オリジナル) — 要約 1題 + 意見 1題 */
EIKEN_G2_WRITE.push(
  { type: 'summary', id: 'sum18', title: '要約: 無人の お店',
    passage: [
      'In Japan, there are more and more stores that have no staff. Customers enter the store, choose what they want, and pay at a machine or with a smartphone app. Some of these stores are open 24 hours a day, and some sell only one kind of product, such as frozen dumplings or fresh vegetables.',
      'Store owners like this style because they do not need to hire workers, which has become difficult and expensive. Customers also find these stores convenient because they can shop at any time without waiting in line.',
      'However, there are some problems. In some stores, people have taken products without paying. To prevent this, many store owners have put in security cameras, and some stores require customers to scan a card at the entrance. Owners say that these stores can only work if customers are honest.' ],
    instruction: '上の 英文の 要約を 45〜55語で 書きなさい。', min: 45, max: 55,
    model: 'Stores without staff are increasing in Japan, where customers pay by machine or smartphone. Owners like them because hiring workers is difficult and costly, and customers can shop anytime without lines. However, some people steal products, so many stores have added security cameras or entry cards, and owners say honest customers are essential.',
    tips: ['しくみ → 利点 (店側・客側) → 問題と 対策', 'difficult and expensive → difficult and costly と 言いかえ', 'only work if customers are honest → honest customers are essential'] },
  { type: 'opinion', id: 'op18', title: '意見: 宿題に AIを 使っても よい?',
    question: 'Do you think students should be allowed to use AI tools to help with their homework?',
    points: ['Learning', 'Fairness', 'Future jobs'],
    instruction: 'あなたの 意見と その理由を 2つ 書きなさい。POINTS は 参考。80〜100語。', min: 80, max: 100,
    model: 'I do not think students should be allowed to use AI tools for their homework. First, homework is a chance for students to practice and learn by themselves. If AI writes their answers, they will not develop their own thinking or writing skills. Second, it is not fair to other students. Students who do their homework honestly may get lower grades than students who use AI to do it for them. Of course, AI can be useful, but students should learn how to use it in class. For these reasons, I think it should not be allowed.',
    tips: ['反対の 立場: I do not think … で 始める', 'If AI writes their answers, … で 結果を 示す', 'Of course, … but … で 賛成側にも 配慮'] }
);
