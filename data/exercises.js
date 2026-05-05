/* exercises.js — extracted from index.html (v73 step3)
 * Original location: lines 2027-3999 (current index.html)
 * Contents: WRITING_TOPICS_1/2/3, ALL_WRITING (composite), WRITING_NO_ANSWERS, GRAMMAR_TOPICS, COMPOSITION_DATA, ALL_COMPOSITION, PHRASE_DICT, DAILY_MISSIONS
 */
// ============================================================
// 영검 2급 라이팅 + 문법 데이터 (v18 추가)
// ============================================================
// ============================================================
// 영검 2급 라이팅 데이터 (1~10번 / 환경·교육·기술)
// 각 주제: 질문 + 모범답안 + 한국어 해설 + 빈칸 + 순서 맞추기
// ============================================================
const WRITING_TOPICS_1 = [
  {
    id: 'w1',
    cat: '🌍 環境',
    q: 'Do you think people should use more public transportation?',
    qja: '人々は もっと 公共交通機関を つかうべきだと おもいますか?',
    answer: [
      "I think people should use more public transportation.",
      "First, it helps reduce air pollution because trains and buses produce less CO2 than cars.",
      "Second, it can reduce traffic jams in big cities, so people can save time.",
      "For these reasons, I believe using public transportation is a good idea."
    ],
    hint: '意見 → 理由1(環境) → 理由2(時間) → 結論',
    blanks: [
      { sentence: "I think people should use more public ___.", answer: "transportation", choices: ["transportation", "education", "information", "communication"] },
      { sentence: "It helps ___ air pollution.", answer: "reduce", choices: ["reduce", "increase", "produce", "create"] },
      { sentence: "Trains produce ___ CO2 than cars.", answer: "less", choices: ["less", "more", "many", "few"] },
      { sentence: "People can ___ time.", answer: "save", choices: ["save", "spend", "waste", "lose"] }
    ],
    order: {
      shuffled: ["For these reasons, I believe using public transportation is a good idea.",
                 "First, it helps reduce air pollution.",
                 "I think people should use more public transportation.",
                 "Second, it can reduce traffic jams in big cities."],
      correct: [2, 1, 3, 0]
    }
  },
  {
    id: 'w2',
    cat: '🌍 環境',
    q: 'Should people try to save water in their daily lives?',
    qja: '人々は 日常生活で 水を 節約するべきですか?',
    answer: [
      "Yes, I think people should try to save water in their daily lives.",
      "First, water is a limited resource, and many countries suffer from water shortages.",
      "Second, saving water also saves energy because cleaning water uses a lot of electricity.",
      "Therefore, we should all try to save water every day."
    ],
    hint: '賛成 → 理由1(資源の限界) → 理由2(エネルギー) → 結論',
    blanks: [
      { sentence: "Water is a ___ resource.", answer: "limited", choices: ["limited", "endless", "useless", "natural"] },
      { sentence: "Many countries ___ from water shortages.", answer: "suffer", choices: ["suffer", "enjoy", "escape", "benefit"] },
      { sentence: "Cleaning water uses a lot of ___.", answer: "electricity", choices: ["electricity", "money", "time", "people"] },
      { sentence: "We should ___ to save water every day.", answer: "try", choices: ["try", "stop", "fail", "refuse"] }
    ],
    order: {
      shuffled: ["Therefore, we should all try to save water.",
                 "Second, saving water also saves energy.",
                 "Yes, I think people should try to save water.",
                 "First, water is a limited resource."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w3',
    cat: '🌍 環境',
    q: 'Is recycling important for the environment?',
    qja: 'リサイクルは 環境に 重要ですか?',
    answer: [
      "Yes, I think recycling is very important for the environment.",
      "First, recycling reduces the amount of waste that goes to landfills.",
      "Second, it saves natural resources like trees and metals because we can reuse old materials.",
      "For these reasons, everyone should recycle as much as possible."
    ],
    hint: '賛成 → 理由1(ごみ削減) → 理由2(資源節約) → 結論',
    blanks: [
      { sentence: "Recycling reduces the amount of ___.", answer: "waste", choices: ["waste", "water", "wealth", "weather"] },
      { sentence: "It saves natural ___ like trees.", answer: "resources", choices: ["resources", "responses", "reasons", "results"] },
      { sentence: "We can ___ old materials.", answer: "reuse", choices: ["reuse", "refuse", "remove", "repair"] },
      { sentence: "Everyone should recycle as much as ___.", answer: "possible", choices: ["possible", "popular", "polite", "perfect"] }
    ],
    order: {
      shuffled: ["For these reasons, everyone should recycle.",
                 "Second, it saves natural resources.",
                 "Yes, recycling is very important.",
                 "First, recycling reduces waste."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w4',
    cat: '🎓 教育',
    q: 'Do you think students should study abroad?',
    qja: '学生は 海外留学を するべきだと おもいますか?',
    answer: [
      "I think students should study abroad if they have the chance.",
      "First, they can improve their language skills by speaking with native speakers every day.",
      "Second, they can learn about different cultures and become more open-minded.",
      "For these reasons, studying abroad is a great experience."
    ],
    hint: '意見 → 理由1(言語) → 理由2(文化) → 結論',
    blanks: [
      { sentence: "Students should study ___ if they have the chance.", answer: "abroad", choices: ["abroad", "above", "ahead", "around"] },
      { sentence: "They can ___ their language skills.", answer: "improve", choices: ["improve", "ignore", "imagine", "include"] },
      { sentence: "They can learn about different ___.", answer: "cultures", choices: ["cultures", "creatures", "captures", "carriers"] },
      { sentence: "Studying abroad is a great ___.", answer: "experience", choices: ["experience", "expensive", "expression", "expectation"] }
    ],
    order: {
      shuffled: ["For these reasons, studying abroad is a great experience.",
                 "Second, they can learn about different cultures.",
                 "I think students should study abroad.",
                 "First, they can improve their language skills."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w5',
    cat: '🎓 教育',
    q: 'Should schools have more physical education classes?',
    qja: '学校は 体育の 授業を もっと ふやすべきですか?',
    answer: [
      "Yes, I think schools should have more physical education classes.",
      "First, exercise keeps students healthy and helps them concentrate better in other classes.",
      "Second, sports teach students about teamwork and how to communicate with others.",
      "Therefore, more PE classes would benefit students greatly."
    ],
    hint: '賛成 → 理由1(健康) → 理由2(チームワーク) → 結論',
    blanks: [
      { sentence: "Exercise keeps students ___.", answer: "healthy", choices: ["healthy", "wealthy", "happy", "heavy"] },
      { sentence: "It helps them ___ better.", answer: "concentrate", choices: ["concentrate", "communicate", "complete", "compare"] },
      { sentence: "Sports teach students about ___.", answer: "teamwork", choices: ["teamwork", "homework", "framework", "network"] },
      { sentence: "More PE classes would ___ students.", answer: "benefit", choices: ["benefit", "behave", "beg", "borrow"] }
    ],
    order: {
      shuffled: ["Therefore, more PE classes would benefit students.",
                 "Second, sports teach about teamwork.",
                 "Yes, schools should have more PE classes.",
                 "First, exercise keeps students healthy."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w6',
    cat: '🎓 教育',
    q: 'Is reading books better than watching TV?',
    qja: '本を 読むのは テレビを みるより よいですか?',
    answer: [
      "I think reading books is better than watching TV.",
      "First, reading helps us imagine the story in our minds, which improves our creativity.",
      "Second, books usually have more detailed information than TV shows.",
      "For these reasons, reading is more valuable than watching TV."
    ],
    hint: '意見 → 理由1(創造力) → 理由2(情報) → 結論',
    blanks: [
      { sentence: "Reading helps us ___ the story.", answer: "imagine", choices: ["imagine", "improve", "increase", "include"] },
      { sentence: "It improves our ___.", answer: "creativity", choices: ["creativity", "celebrity", "curiosity", "community"] },
      { sentence: "Books have more ___ information.", answer: "detailed", choices: ["detailed", "decided", "delayed", "delivered"] },
      { sentence: "Reading is more ___ than watching TV.", answer: "valuable", choices: ["valuable", "visible", "vegetable", "variable"] }
    ],
    order: {
      shuffled: ["For these reasons, reading is more valuable.",
                 "Second, books have more detailed information.",
                 "I think reading books is better than watching TV.",
                 "First, reading improves our creativity."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w7',
    cat: '🎓 教育',
    q: 'Should homework be reduced?',
    qja: '宿題は へらすべきですか?',
    answer: [
      "Yes, I think homework should be reduced.",
      "First, students need time to relax and do their hobbies after school.",
      "Second, too much homework can cause stress and affect their mental health.",
      "Therefore, schools should give less homework to students."
    ],
    hint: '賛成 → 理由1(休息) → 理由2(ストレス) → 結論',
    blanks: [
      { sentence: "Homework should be ___.", answer: "reduced", choices: ["reduced", "removed", "renewed", "repaired"] },
      { sentence: "Students need time to ___.", answer: "relax", choices: ["relax", "react", "release", "remind"] },
      { sentence: "Too much homework can ___ stress.", answer: "cause", choices: ["cause", "carry", "catch", "change"] },
      { sentence: "It can ___ their mental health.", answer: "affect", choices: ["affect", "accept", "attack", "attend"] }
    ],
    order: {
      shuffled: ["Therefore, schools should give less homework.",
                 "Second, too much homework can cause stress.",
                 "Yes, homework should be reduced.",
                 "First, students need time to relax."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w8',
    cat: '🎓 教育',
    q: 'Is learning a foreign language important?',
    qja: '外国語を 学ぶのは 重要ですか?',
    answer: [
      "Yes, learning a foreign language is very important.",
      "First, it helps us communicate with people from different countries when we travel.",
      "Second, it gives us better job opportunities because many companies want bilingual workers.",
      "For these reasons, everyone should learn at least one foreign language."
    ],
    hint: '賛成 → 理由1(コミュニケーション) → 理由2(仕事) → 結論',
    blanks: [
      { sentence: "It helps us ___ with people.", answer: "communicate", choices: ["communicate", "concentrate", "compete", "complete"] },
      { sentence: "It gives us better job ___.", answer: "opportunities", choices: ["opportunities", "operations", "obligations", "observations"] },
      { sentence: "Companies want ___ workers.", answer: "bilingual", choices: ["bilingual", "biological", "billion", "biography"] },
      { sentence: "Everyone should learn at ___ one foreign language.", answer: "least", choices: ["least", "last", "latest", "lately"] }
    ],
    order: {
      shuffled: ["For these reasons, everyone should learn a foreign language.",
                 "Second, it gives us better job opportunities.",
                 "Learning a foreign language is very important.",
                 "First, it helps us communicate when we travel."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w9',
    cat: '💻 技術',
    q: 'Are smartphones useful for students?',
    qja: 'スマートフォンは 学生に 役立ちますか?',
    answer: [
      "Yes, I think smartphones are very useful for students.",
      "First, students can search for information quickly when they have questions about their homework.",
      "Second, they can use educational apps to learn languages and other subjects easily.",
      "For these reasons, smartphones are helpful tools for studying."
    ],
    hint: '賛成 → 理由1(情報検索) → 理由2(学習アプリ) → 結論',
    blanks: [
      { sentence: "Smartphones are ___ for students.", answer: "useful", choices: ["useful", "useless", "unusual", "unique"] },
      { sentence: "Students can ___ for information.", answer: "search", choices: ["search", "sell", "send", "serve"] },
      { sentence: "They can use ___ apps.", answer: "educational", choices: ["educational", "emotional", "essential", "electrical"] },
      { sentence: "Smartphones are helpful ___ for studying.", answer: "tools", choices: ["tools", "tales", "tasks", "teams"] }
    ],
    order: {
      shuffled: ["For these reasons, smartphones are helpful tools.",
                 "Second, they can use educational apps.",
                 "Smartphones are very useful for students.",
                 "First, students can search for information quickly."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w10',
    cat: '💻 技術',
    q: 'Is online shopping better than shopping at stores?',
    qja: 'ネットショッピングは 店で 買うより よいですか?',
    answer: [
      "I think online shopping is better than shopping at stores.",
      "First, we can compare prices easily and find the cheapest option in just a few minutes.",
      "Second, we can shop at any time, even late at night when stores are closed.",
      "For these reasons, online shopping is more convenient."
    ],
    hint: '意見 → 理由1(価格比較) → 理由2(時間) → 結論',
    blanks: [
      { sentence: "We can ___ prices easily.", answer: "compare", choices: ["compare", "complete", "compose", "compute"] },
      { sentence: "We can find the ___ option.", answer: "cheapest", choices: ["cheapest", "deepest", "biggest", "highest"] },
      { sentence: "We can shop at any ___.", answer: "time", choices: ["time", "place", "store", "price"] },
      { sentence: "Online shopping is more ___.", answer: "convenient", choices: ["convenient", "confident", "constant", "concrete"] }
    ],
    order: {
      shuffled: ["For these reasons, online shopping is more convenient.",
                 "Second, we can shop at any time.",
                 "I think online shopping is better than shopping at stores.",
                 "First, we can compare prices easily."],
      correct: [2, 3, 1, 0]
    }
  }
];

// ============================================================
// 영검 2급 라이팅 데이터 (11~20번 / 사회·건강·생활)
// ============================================================
const WRITING_TOPICS_2 = [
  {
    id: 'w11',
    cat: '💻 技術',
    q: 'Should children use the Internet?',
    qja: '子供は インターネットを つかうべきですか?',
    answer: [
      "I think children can use the Internet, but with some rules.",
      "First, the Internet has many educational websites that help children learn new things.",
      "Second, parents should check what their children are watching to keep them safe.",
      "Therefore, the Internet can be useful if it is used carefully."
    ],
    hint: '意見 → 理由1(教育) → 理由2(安全) → 結論',
    blanks: [
      { sentence: "Children can use the Internet with some ___.", answer: "rules", choices: ["rules", "tools", "roles", "rooms"] },
      { sentence: "It has many ___ websites.", answer: "educational", choices: ["educational", "elemental", "essential", "exceptional"] },
      { sentence: "Parents should ___ what their children are watching.", answer: "check", choices: ["check", "change", "choose", "cheer"] },
      { sentence: "It must be used ___.", answer: "carefully", choices: ["carefully", "carelessly", "cheerfully", "completely"] }
    ],
    order: {
      shuffled: ["Therefore, the Internet can be useful.",
                 "Second, parents should check what they watch.",
                 "Children can use the Internet with some rules.",
                 "First, the Internet has educational websites."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w12',
    cat: '💻 技術',
    q: 'Are video games good for children?',
    qja: 'テレビゲームは 子供に よいですか?',
    answer: [
      "I think video games can be good for children if they play in moderation.",
      "First, some games help children develop problem-solving skills and quick thinking.",
      "Second, playing online games allows them to make friends with people around the world.",
      "However, parents should limit playing time to avoid addiction."
    ],
    hint: '意見 → 理由1(問題解決) → 理由2(友達) → 結論(注意)',
    blanks: [
      { sentence: "Children can play games in ___.", answer: "moderation", choices: ["moderation", "motivation", "modification", "monitor"] },
      { sentence: "Games help children develop ___-solving skills.", answer: "problem", choices: ["problem", "process", "product", "project"] },
      { sentence: "They can make friends ___ the world.", answer: "around", choices: ["around", "above", "across", "against"] },
      { sentence: "Parents should ___ playing time.", answer: "limit", choices: ["limit", "list", "lift", "link"] }
    ],
    order: {
      shuffled: ["Parents should limit playing time.",
                 "Second, online games help them make friends.",
                 "Video games can be good if played in moderation.",
                 "First, some games develop problem-solving skills."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w13',
    cat: '🏥 健康',
    q: 'Is breakfast the most important meal of the day?',
    qja: '朝食は 一日の中で 一番 大切な 食事ですか?',
    answer: [
      "Yes, I think breakfast is the most important meal of the day.",
      "First, eating breakfast gives us energy to start our day actively.",
      "Second, students who eat breakfast can concentrate better during morning classes.",
      "For these reasons, we should never skip breakfast."
    ],
    hint: '賛成 → 理由1(エネルギー) → 理由2(集中力) → 結論',
    blanks: [
      { sentence: "Breakfast is the most ___ meal.", answer: "important", choices: ["important", "interesting", "imaginary", "imperfect"] },
      { sentence: "It gives us ___ to start our day.", answer: "energy", choices: ["energy", "enemy", "entry", "empty"] },
      { sentence: "Students can ___ better.", answer: "concentrate", choices: ["concentrate", "communicate", "complete", "compete"] },
      { sentence: "We should never ___ breakfast.", answer: "skip", choices: ["skip", "slip", "skim", "skin"] }
    ],
    order: {
      shuffled: ["For these reasons, we should never skip breakfast.",
                 "Second, students can concentrate better.",
                 "Breakfast is the most important meal.",
                 "First, breakfast gives us energy."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w14',
    cat: '🏥 健康',
    q: 'Should people exercise every day?',
    qja: '人々は 毎日 運動すべきですか?',
    answer: [
      "I think people should exercise every day if possible.",
      "First, regular exercise keeps our body strong and prevents many diseases.",
      "Second, exercise also reduces stress and makes us feel happier.",
      "Therefore, daily exercise is good for both our body and mind."
    ],
    hint: '意見 → 理由1(体) → 理由2(心) → 結論',
    blanks: [
      { sentence: "Regular exercise keeps our body ___.", answer: "strong", choices: ["strong", "stable", "steady", "stuck"] },
      { sentence: "It ___ many diseases.", answer: "prevents", choices: ["prevents", "presents", "promotes", "produces"] },
      { sentence: "Exercise ___ stress.", answer: "reduces", choices: ["reduces", "raises", "regards", "removes"] },
      { sentence: "It makes us feel ___.", answer: "happier", choices: ["happier", "heavier", "harder", "higher"] }
    ],
    order: {
      shuffled: ["Daily exercise is good for body and mind.",
                 "Second, exercise reduces stress.",
                 "People should exercise every day.",
                 "First, exercise keeps our body strong."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w15',
    cat: '🏥 健康',
    q: 'Is fast food bad for our health?',
    qja: 'ファストフードは 健康に わるいですか?',
    answer: [
      "Yes, I think fast food is bad for our health.",
      "First, fast food usually contains too much salt, sugar, and fat, which can cause obesity.",
      "Second, eating fast food often increases the risk of heart disease.",
      "For these reasons, we should eat fast food only occasionally."
    ],
    hint: '賛成 → 理由1(栄養) → 理由2(病気) → 結論',
    blanks: [
      { sentence: "Fast food ___ too much salt.", answer: "contains", choices: ["contains", "contains", "compares", "complains"] },
      { sentence: "It can cause ___.", answer: "obesity", choices: ["obesity", "objection", "obstacle", "occupation"] },
      { sentence: "It increases the ___ of heart disease.", answer: "risk", choices: ["risk", "ring", "right", "rich"] },
      { sentence: "We should eat fast food only ___.", answer: "occasionally", choices: ["occasionally", "officially", "originally", "obviously"] }
    ],
    order: {
      shuffled: ["We should eat fast food only occasionally.",
                 "Second, it increases heart disease risk.",
                 "Yes, fast food is bad for our health.",
                 "First, fast food contains too much salt and fat."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w16',
    cat: '🏥 健康',
    q: 'Should people get enough sleep every night?',
    qja: '人々は 毎晩 十分に 眠るべきですか?',
    answer: [
      "Yes, I strongly believe people should get enough sleep every night.",
      "First, sleep helps our brain recover, which improves memory and learning.",
      "Second, lack of sleep weakens our immune system and makes us get sick easily.",
      "Therefore, getting enough sleep is essential for a healthy life."
    ],
    hint: '賛成 → 理由1(脳) → 理由2(免疫) → 結論',
    blanks: [
      { sentence: "Sleep helps our brain ___.", answer: "recover", choices: ["recover", "receive", "reduce", "remember"] },
      { sentence: "It improves ___ and learning.", answer: "memory", choices: ["memory", "mystery", "machinery", "majority"] },
      { sentence: "Lack of sleep ___ our immune system.", answer: "weakens", choices: ["weakens", "wakens", "watches", "warns"] },
      { sentence: "Sleep is ___ for a healthy life.", answer: "essential", choices: ["essential", "emotional", "eventual", "exceptional"] }
    ],
    order: {
      shuffled: ["Getting enough sleep is essential.",
                 "Second, lack of sleep weakens our immune system.",
                 "People should get enough sleep every night.",
                 "First, sleep helps our brain recover."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w17',
    cat: '🌆 社会',
    q: 'Is it important to have rules in society?',
    qja: '社会に ルールが あることは 重要ですか?',
    answer: [
      "Yes, I think rules are very important in society.",
      "First, rules protect people by preventing dangerous behavior, like reckless driving.",
      "Second, rules make society fair because everyone is treated equally under the law.",
      "Therefore, we need clear rules to live peacefully together."
    ],
    hint: '賛成 → 理由1(保護) → 理由2(公平) → 結論',
    blanks: [
      { sentence: "Rules ___ people from danger.", answer: "protect", choices: ["protect", "produce", "promote", "propose"] },
      { sentence: "Rules ___ dangerous behavior.", answer: "prevent", choices: ["prevent", "present", "pretend", "prepare"] },
      { sentence: "Everyone is ___ equally under the law.", answer: "treated", choices: ["treated", "trusted", "trained", "traveled"] },
      { sentence: "We need rules to live ___.", answer: "peacefully", choices: ["peacefully", "powerfully", "perfectly", "politely"] }
    ],
    order: {
      shuffled: ["We need rules to live peacefully.",
                 "Second, rules make society fair.",
                 "Yes, rules are very important.",
                 "First, rules protect people."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w18',
    cat: '🌆 社会',
    q: 'Should young people volunteer in their community?',
    qja: '若者は 地域社会で ボランティアを するべきですか?',
    answer: [
      "Yes, I believe young people should volunteer in their community.",
      "First, volunteering teaches young people the importance of helping others.",
      "Second, they can gain valuable experience and meet new people while volunteering.",
      "For these reasons, volunteer work is meaningful for young people."
    ],
    hint: '賛成 → 理由1(価値) → 理由2(経験) → 結論',
    blanks: [
      { sentence: "Young people should ___ in their community.", answer: "volunteer", choices: ["volunteer", "venture", "visit", "vary"] },
      { sentence: "It teaches the ___ of helping others.", answer: "importance", choices: ["importance", "improvement", "impression", "imagination"] },
      { sentence: "They can gain ___ experience.", answer: "valuable", choices: ["valuable", "visible", "variable", "vegetable"] },
      { sentence: "Volunteer work is ___ for young people.", answer: "meaningful", choices: ["meaningful", "mindful", "merciful", "magnificent"] }
    ],
    order: {
      shuffled: ["Volunteer work is meaningful for young people.",
                 "Second, they gain valuable experience.",
                 "Young people should volunteer.",
                 "First, volunteering teaches helping others."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w19',
    cat: '🌆 社会',
    q: 'Is it better to live in a city or in the countryside?',
    qja: '都市と 田舎、どちらに 住むのが よいですか?',
    answer: [
      "I think living in the countryside is better than living in the city.",
      "First, the countryside has fresh air and beautiful nature, which is good for our health.",
      "Second, life in the countryside is quieter and less stressful than city life.",
      "Therefore, the countryside is a better place to live for many people."
    ],
    hint: '意見 → 理由1(自然) → 理由2(ストレス) → 結論',
    blanks: [
      { sentence: "The countryside has ___ air.", answer: "fresh", choices: ["fresh", "fast", "free", "full"] },
      { sentence: "Nature is good for our ___.", answer: "health", choices: ["health", "wealth", "habit", "history"] },
      { sentence: "Life in the countryside is ___.", answer: "quieter", choices: ["quieter", "quicker", "quitter", "quester"] },
      { sentence: "It is less ___ than city life.", answer: "stressful", choices: ["stressful", "successful", "skillful", "shameful"] }
    ],
    order: {
      shuffled: ["The countryside is a better place to live.",
                 "Second, countryside life is less stressful.",
                 "Living in the countryside is better.",
                 "First, the countryside has fresh air."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w20',
    cat: '🌆 社会',
    q: 'Should people watch the news every day?',
    qja: '人々は 毎日 ニュースを 見るべきですか?',
    answer: [
      "Yes, I think people should watch the news every day.",
      "First, watching the news helps us understand what is happening in the world.",
      "Second, knowing current events makes it easier to discuss topics with other people.",
      "For these reasons, watching the news is a good habit."
    ],
    hint: '賛成 → 理由1(理解) → 理由2(コミュニケーション) → 結論',
    blanks: [
      { sentence: "The news helps us ___ what is happening.", answer: "understand", choices: ["understand", "underline", "underwear", "underway"] },
      { sentence: "It tells us about events in the ___.", answer: "world", choices: ["world", "word", "work", "worth"] },
      { sentence: "Knowing ___ events helps discussions.", answer: "current", choices: ["current", "courage", "correct", "concrete"] },
      { sentence: "Watching the news is a good ___.", answer: "habit", choices: ["habit", "habitat", "haircut", "harvest"] }
    ],
    order: {
      shuffled: ["Watching the news is a good habit.",
                 "Second, current events make discussions easier.",
                 "People should watch the news every day.",
                 "First, the news helps us understand the world."],
      correct: [2, 3, 1, 0]
    }
  }
];

// ============================================================
// 영검 2급 라이팅 데이터 (21~30번 / 일·일상·기타)
// ============================================================
const WRITING_TOPICS_3 = [
  {
    id: 'w21',
    cat: '💼 仕事',
    q: 'Is it better to work for a small company or a big one?',
    qja: '小さい 会社と 大きい 会社、 どちらが よいですか?',
    answer: [
      "I think working for a small company is better than a big one.",
      "First, in a small company, employees can build close relationships with their coworkers.",
      "Second, workers can take on more responsibilities and learn many different skills.",
      "Therefore, small companies offer better opportunities for personal growth."
    ],
    hint: '意見 → 理由1(人間関係) → 理由2(成長) → 結論',
    blanks: [
      { sentence: "Working for a small company is ___.", answer: "better", choices: ["better", "bigger", "busier", "brighter"] },
      { sentence: "Employees can build close ___.", answer: "relationships", choices: ["relationships", "responsibilities", "reservations", "regulations"] },
      { sentence: "Workers can take on more ___.", answer: "responsibilities", choices: ["responsibilities", "relationships", "reservations", "registrations"] },
      { sentence: "Small companies offer better ___.", answer: "opportunities", choices: ["opportunities", "operations", "occupations", "obligations"] }
    ],
    order: {
      shuffled: ["Small companies offer better opportunities.",
                 "Second, workers learn many skills.",
                 "Working for a small company is better.",
                 "First, employees build close relationships."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w22',
    cat: '💼 仕事',
    q: 'Should people change jobs many times in their life?',
    qja: '人々は 人生で 何度も 仕事を 変えるべきですか?',
    answer: [
      "I think changing jobs several times can be a good thing.",
      "First, people can find a job that truly matches their interests and skills.",
      "Second, new workplaces give us new experiences and help us grow as people.",
      "However, it is also important not to change jobs too often."
    ],
    hint: '意見 → 理由1(適性) → 理由2(経験) → 結論(注意)',
    blanks: [
      { sentence: "Changing jobs can be a good ___.", answer: "thing", choices: ["thing", "think", "thanks", "throw"] },
      { sentence: "We can find a job that ___ our interests.", answer: "matches", choices: ["matches", "marches", "marks", "messes"] },
      { sentence: "New workplaces give us new ___.", answer: "experiences", choices: ["experiences", "expectations", "expressions", "exchanges"] },
      { sentence: "It is important not to change jobs too ___.", answer: "often", choices: ["often", "early", "easily", "even"] }
    ],
    order: {
      shuffled: ["It is important not to change jobs too often.",
                 "Second, new workplaces give new experiences.",
                 "Changing jobs can be a good thing.",
                 "First, we can find a job that matches our interests."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w23',
    cat: '🍽 生活',
    q: 'Is it important to eat dinner with your family?',
    qja: '家族と 夕食を 食べるのは 重要ですか?',
    answer: [
      "Yes, I think eating dinner with family is very important.",
      "First, dinner time is a good chance for family members to talk about their day.",
      "Second, sharing meals strengthens family bonds and creates happy memories.",
      "Therefore, families should try to eat dinner together as often as possible."
    ],
    hint: '賛成 → 理由1(コミュニケーション) → 理由2(絆) → 結論',
    blanks: [
      { sentence: "Eating dinner with family is ___.", answer: "important", choices: ["important", "interesting", "imaginary", "incredible"] },
      { sentence: "It is a good ___ to talk about the day.", answer: "chance", choices: ["chance", "change", "charge", "chain"] },
      { sentence: "Sharing meals ___ family bonds.", answer: "strengthens", choices: ["strengthens", "stretches", "straightens", "starts"] },
      { sentence: "It creates ___ memories.", answer: "happy", choices: ["happy", "heavy", "hard", "huge"] }
    ],
    order: {
      shuffled: ["Families should eat dinner together often.",
                 "Second, sharing meals strengthens family bonds.",
                 "Eating dinner with family is important.",
                 "First, dinner time is good for talking."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w24',
    cat: '🍽 生活',
    q: 'Is it good to have pets at home?',
    qja: '家で ペットを 飼うのは よいですか?',
    answer: [
      "Yes, I think having pets at home is a wonderful thing.",
      "First, pets give us love and comfort, which can reduce stress and loneliness.",
      "Second, taking care of pets teaches children about responsibility.",
      "For these reasons, having pets brings many benefits to our lives."
    ],
    hint: '賛成 → 理由1(情緒) → 理由2(責任感) → 結論',
    blanks: [
      { sentence: "Pets give us love and ___.", answer: "comfort", choices: ["comfort", "command", "compare", "complete"] },
      { sentence: "They can reduce stress and ___.", answer: "loneliness", choices: ["loneliness", "laziness", "loudness", "looseness"] },
      { sentence: "Taking care of pets teaches ___.", answer: "responsibility", choices: ["responsibility", "relationship", "registration", "reservation"] },
      { sentence: "Pets bring many ___ to our lives.", answer: "benefits", choices: ["benefits", "burdens", "battles", "barriers"] }
    ],
    order: {
      shuffled: ["Having pets brings many benefits.",
                 "Second, pets teach responsibility.",
                 "Having pets is wonderful.",
                 "First, pets give love and comfort."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w25',
    cat: '🍽 生活',
    q: 'Should people cook at home rather than eat out?',
    qja: '人々は 外食より 家で 料理するべきですか?',
    answer: [
      "Yes, I think people should cook at home more often.",
      "First, home-cooked meals are usually healthier because we can control the ingredients.",
      "Second, cooking at home saves money compared to eating at restaurants every day.",
      "Therefore, cooking at home is good for both health and budget."
    ],
    hint: '賛成 → 理由1(健康) → 理由2(お金) → 結論',
    blanks: [
      { sentence: "People should cook at home more ___.", answer: "often", choices: ["often", "early", "easily", "also"] },
      { sentence: "Home-cooked meals are ___.", answer: "healthier", choices: ["healthier", "heavier", "harder", "happier"] },
      { sentence: "We can ___ the ingredients.", answer: "control", choices: ["control", "complete", "compete", "concrete"] },
      { sentence: "Cooking at home ___ money.", answer: "saves", choices: ["saves", "spends", "shares", "serves"] }
    ],
    order: {
      shuffled: ["Cooking at home is good for health and budget.",
                 "Second, cooking at home saves money.",
                 "People should cook at home more often.",
                 "First, home-cooked meals are healthier."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w26',
    cat: '✈️ 旅行',
    q: 'Is traveling abroad a good experience?',
    qja: '海外旅行は よい 経験ですか?',
    answer: [
      "Yes, I think traveling abroad is a great experience for everyone.",
      "First, traveling exposes us to different cultures, foods, and languages.",
      "Second, it gives us unforgettable memories that we can share with others.",
      "For these reasons, everyone should travel abroad if they have the chance."
    ],
    hint: '賛成 → 理由1(文化) → 理由2(思い出) → 結論',
    blanks: [
      { sentence: "Traveling abroad is a great ___.", answer: "experience", choices: ["experience", "expensive", "expression", "expansion"] },
      { sentence: "Traveling ___ us to different cultures.", answer: "exposes", choices: ["exposes", "explains", "expresses", "explores"] },
      { sentence: "It gives us ___ memories.", answer: "unforgettable", choices: ["unforgettable", "unbelievable", "unlimited", "unusual"] },
      { sentence: "Everyone should travel if they have the ___.", answer: "chance", choices: ["chance", "change", "charge", "chair"] }
    ],
    order: {
      shuffled: ["Everyone should travel abroad if possible.",
                 "Second, it gives us unforgettable memories.",
                 "Traveling abroad is a great experience.",
                 "First, traveling exposes us to different cultures."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w27',
    cat: '🎨 趣味',
    q: 'Is having a hobby important?',
    qja: '趣味を 持つことは 重要ですか?',
    answer: [
      "Yes, I think having a hobby is very important for everyone.",
      "First, hobbies help us relax after a busy day at work or school.",
      "Second, hobbies can develop new skills and even lead to new friendships.",
      "Therefore, everyone should find a hobby they enjoy."
    ],
    hint: '賛成 → 理由1(休息) → 理由2(スキル/友達) → 結論',
    blanks: [
      { sentence: "Having a hobby is very ___.", answer: "important", choices: ["important", "imaginary", "imperfect", "impressive"] },
      { sentence: "Hobbies help us ___ after a busy day.", answer: "relax", choices: ["relax", "react", "release", "remove"] },
      { sentence: "Hobbies can ___ new skills.", answer: "develop", choices: ["develop", "deliver", "decide", "describe"] },
      { sentence: "They lead to new ___.", answer: "friendships", choices: ["friendships", "frustrations", "frequencies", "fractions"] }
    ],
    order: {
      shuffled: ["Everyone should find a hobby they enjoy.",
                 "Second, hobbies develop new skills.",
                 "Having a hobby is very important.",
                 "First, hobbies help us relax."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w28',
    cat: '💰 お金',
    q: 'Should children learn how to manage money?',
    qja: '子供は お金の 管理方法を 学ぶべきですか?',
    answer: [
      "Yes, I think children should learn how to manage money from an early age.",
      "First, learning about money teaches children the value of hard work.",
      "Second, good money habits in childhood prevent financial problems in the future.",
      "For these reasons, money education is essential for children."
    ],
    hint: '賛成 → 理由1(価値) → 理由2(未来) → 結論',
    blanks: [
      { sentence: "Children should ___ money.", answer: "manage", choices: ["manage", "marry", "march", "match"] },
      { sentence: "It teaches the ___ of hard work.", answer: "value", choices: ["value", "valid", "vague", "vain"] },
      { sentence: "Good habits prevent ___ problems.", answer: "financial", choices: ["financial", "physical", "fictional", "factual"] },
      { sentence: "Money education is ___ for children.", answer: "essential", choices: ["essential", "emotional", "exceptional", "eventful"] }
    ],
    order: {
      shuffled: ["Money education is essential for children.",
                 "Second, good habits prevent future problems.",
                 "Children should learn to manage money.",
                 "First, money teaches the value of work."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w29',
    cat: '🎬 文化',
    q: 'Are movies a good way to learn about other cultures?',
    qja: '映画は 他の 文化を 学ぶのに よい 方法ですか?',
    answer: [
      "Yes, I think movies are an excellent way to learn about other cultures.",
      "First, movies show us how people in other countries live, eat, and celebrate.",
      "Second, watching foreign movies helps us understand different languages and customs.",
      "Therefore, movies are both fun and educational."
    ],
    hint: '賛成 → 理由1(生活) → 理由2(言語) → 結論',
    blanks: [
      { sentence: "Movies are an ___ way to learn.", answer: "excellent", choices: ["excellent", "exciting", "expensive", "experienced"] },
      { sentence: "Movies show how people ___.", answer: "celebrate", choices: ["celebrate", "calculate", "concentrate", "communicate"] },
      { sentence: "They help us understand ___ languages.", answer: "different", choices: ["different", "difficult", "diligent", "dependent"] },
      { sentence: "Movies are both fun and ___.", answer: "educational", choices: ["educational", "essential", "emotional", "exceptional"] }
    ],
    order: {
      shuffled: ["Movies are both fun and educational.",
                 "Second, foreign movies help with languages.",
                 "Movies are an excellent way to learn cultures.",
                 "First, movies show how people live."],
      correct: [2, 3, 1, 0]
    }
  },
  {
    id: 'w30',
    cat: '🌳 環境',
    q: 'Should we plant more trees in cities?',
    qja: '都市に もっと 木を 植えるべきですか?',
    answer: [
      "Yes, I strongly believe we should plant more trees in cities.",
      "First, trees clean the air by absorbing carbon dioxide and producing oxygen.",
      "Second, trees provide shade and make cities cooler in summer.",
      "Therefore, planting more trees will make our cities healthier and more beautiful."
    ],
    hint: '賛成 → 理由1(空気) → 理由2(気温) → 結論',
    blanks: [
      { sentence: "We should ___ more trees.", answer: "plant", choices: ["plant", "place", "play", "plan"] },
      { sentence: "Trees ___ the air.", answer: "clean", choices: ["clean", "claim", "climb", "close"] },
      { sentence: "They provide ___ in summer.", answer: "shade", choices: ["shade", "shape", "share", "shake"] },
      { sentence: "Trees make cities ___.", answer: "cooler", choices: ["cooler", "closer", "colder", "calmer"] }
    ],
    order: {
      shuffled: ["Planting trees makes cities healthier and more beautiful.",
                 "Second, trees provide shade in summer.",
                 "We should plant more trees in cities.",
                 "First, trees clean the air."],
      correct: [2, 3, 1, 0]
    }
  }
];

// 30주제 통합
const ALL_WRITING = [...WRITING_TOPICS_1, ...WRITING_TOPICS_2, ...WRITING_TOPICS_3];
// ============================================================
// 영검 2급 라이팅 No 답안 (30주제 모두)
// 각 항목: id에 매칭 + answerNo, hintNo
// 게임 로딩 시 ALL_WRITING의 각 주제에 머지됨
// ============================================================
const WRITING_NO_ANSWERS = {
  // ===== 1~10 (환경·교육·기술) =====
  w1: {
    answerNo: [
      "I do not think people should rely too much on public transportation.",
      "First, public transportation does not always go where we want, especially in rural areas.",
      "Second, buses and trains are often crowded, which can be very stressful during rush hours.",
      "For these reasons, I prefer to use a car for daily transportation."
    ],
    hintNo: '反対 → 理由1(不便) → 理由2(混雑) → 結論'
  },
  w2: {
    answerNo: [
      "I do not think saving water in daily life makes a big difference.",
      "First, individual efforts at home are very small compared to industrial water use.",
      "Second, focusing too much on saving water may reduce our quality of life.",
      "Therefore, governments should focus on bigger solutions instead of asking individuals."
    ],
    hintNo: '反対 → 理由1(個人努力の限界) → 理由2(生活の質) → 結論'
  },
  w3: {
    answerNo: [
      "I do not think recycling alone can solve our environmental problems.",
      "First, recycling itself uses a lot of energy and water in the process.",
      "Second, many recycled materials are still thrown away because they cannot be processed.",
      "We should focus on reducing waste in the first place rather than only recycling."
    ],
    hintNo: '反対 → 理由1(エネルギー使用) → 理由2(処理の限界) → 結論'
  },
  w4: {
    answerNo: [
      "I do not think all students need to study abroad.",
      "First, studying abroad is very expensive, and not all families can afford it.",
      "Second, students can now learn languages and cultures online from home.",
      "For these reasons, studying at home can be just as good as studying abroad."
    ],
    hintNo: '反対 → 理由1(費用) → 理由2(オンライン代替) → 結論'
  },
  w5: {
    answerNo: [
      "I do not think schools need to add more PE classes.",
      "First, students already have many academic subjects to study and not enough time.",
      "Second, students can exercise after school by joining clubs or sports teams.",
      "Therefore, the current number of PE classes is enough."
    ],
    hintNo: '反対 → 理由1(時間不足) → 理由2(放課後の運動) → 結論'
  },
  w6: {
    answerNo: [
      "I do not think reading books is always better than watching TV.",
      "First, TV programs like documentaries can teach us a lot in a short time.",
      "Second, watching TV with family is a good way to spend time together.",
      "Both reading and watching TV have their own benefits."
    ],
    hintNo: '反対 → 理由1(ドキュメンタリー) → 理由2(家族の時間) → 結論'
  },
  w7: {
    answerNo: [
      "I do not think we should reduce homework.",
      "First, homework helps students review what they learned in class and remember it better.",
      "Second, doing homework teaches students how to manage their time and work independently.",
      "For these reasons, homework is an important part of education."
    ],
    hintNo: '反対 → 理由1(復習) → 理由2(自己管理) → 結論'
  },
  w8: {
    answerNo: [
      "I do not think learning a foreign language is necessary for everyone.",
      "First, with translation apps, we can easily communicate with people in other languages.",
      "Second, learning a language takes a lot of time, and not everyone has that free time.",
      "People should choose to learn a language only if they really need it."
    ],
    hintNo: '反対 → 理由1(翻訳アプリ) → 理由2(時間) → 結論'
  },
  w9: {
    answerNo: [
      "I do not think smartphones are good for students.",
      "First, students often get distracted by social media and games during study time.",
      "Second, looking at small screens for a long time can damage their eyes and posture.",
      "Therefore, students should limit their smartphone use."
    ],
    hintNo: '反対 → 理由1(注意散漫) → 理由2(健康) → 結論'
  },
  w10: {
    answerNo: [
      "I do not think online shopping is always better than shopping at stores.",
      "First, we cannot try on clothes or check the quality of products before buying.",
      "Second, shopping at real stores supports local businesses and our community.",
      "For these reasons, I sometimes prefer to shop at physical stores."
    ],
    hintNo: '反対 → 理由1(品質確認) → 理由2(地域経済) → 結論'
  },

  // ===== 11~20 (사회·건강·생활) =====
  w11: {
    answerNo: [
      "I do not think children should use the Internet freely.",
      "First, the Internet has many dangerous websites that are not good for children.",
      "Second, spending too much time online can reduce their time for outdoor play and reading.",
      "Therefore, children should not use the Internet without parental supervision."
    ],
    hintNo: '反対 → 理由1(危険) → 理由2(時間の無駄) → 結論'
  },
  w12: {
    answerNo: [
      "I do not think video games are good for children.",
      "First, many games include violent scenes that may affect children's behavior.",
      "Second, children can become addicted and ignore their schoolwork and friends.",
      "For these reasons, parents should be careful about letting children play video games."
    ],
    hintNo: '反対 → 理由1(暴力) → 理由2(中毒) → 結論'
  },
  w13: {
    answerNo: [
      "I do not think breakfast is always the most important meal of the day.",
      "First, some people are not hungry in the morning and forcing them to eat is unhealthy.",
      "Second, the total amount of food we eat each day matters more than which meal we eat.",
      "Therefore, people should eat when they feel hungry, not because of the time."
    ],
    hintNo: '反対 → 理由1(個人差) → 理由2(総食事量) → 結論'
  },
  w14: {
    answerNo: [
      "I do not think people need to exercise every single day.",
      "First, our body also needs rest days to recover and grow stronger.",
      "Second, exercising every day can be tiring and make people give up exercise altogether.",
      "Three or four days of exercise per week is enough for most people."
    ],
    hintNo: '反対 → 理由1(休息が必要) → 理由2(疲労) → 結論'
  },
  w15: {
    answerNo: [
      "I do not think fast food is always bad for our health.",
      "First, eating fast food once in a while will not seriously harm a healthy person.",
      "Second, many fast food restaurants now offer healthy options like salads.",
      "It depends on how often we eat it and what we choose."
    ],
    hintNo: '反対 → 理由1(時々ならOK) → 理由2(ヘルシー選択) → 結論'
  },
  w16: {
    answerNo: [
      "I do not think everyone needs the same amount of sleep.",
      "First, the amount of sleep people need depends on their age and lifestyle.",
      "Second, some successful people are known to function well with very little sleep.",
      "Therefore, the right amount of sleep is different for each person."
    ],
    hintNo: '反対 → 理由1(個人差) → 理由2(例外) → 結論'
  },
  w17: {
    answerNo: [
      "I do not think too many rules are good for society.",
      "First, too many rules can limit personal freedom and creativity.",
      "Second, rules sometimes do not fit special situations and cause unfair results.",
      "We need only the most important rules, not too many."
    ],
    hintNo: '反対 → 理由1(自由) → 理由2(不公平) → 結論'
  },
  w18: {
    answerNo: [
      "I do not think young people must volunteer in their community.",
      "First, young people are very busy with school, exams, and their own activities.",
      "Second, volunteering should come from the heart, not be forced on them.",
      "Therefore, volunteer work should be a personal choice, not a duty."
    ],
    hintNo: '反対 → 理由1(忙しい) → 理由2(自発性) → 結論'
  },
  w19: {
    answerNo: [
      "I think living in a city is better than living in the countryside.",
      "First, cities have many job opportunities, schools, and hospitals.",
      "Second, cities offer more entertainment like restaurants, museums, and concerts.",
      "For these reasons, city life is more convenient and exciting."
    ],
    hintNo: '都市派 → 理由1(便利施設) → 理由2(エンタメ) → 結論'
  },
  w20: {
    answerNo: [
      "I do not think people need to watch the news every day.",
      "First, much of the news is bad news, which can make people feel stressed and worried.",
      "Second, many news stories are biased or not completely true.",
      "It is enough to check the news once or twice a week."
    ],
    hintNo: '反対 → 理由1(ストレス) → 理由2(偏向) → 結論'
  },

  // ===== 21~30 (일·일상·기타) =====
  w21: {
    answerNo: [
      "I think working for a big company is better than a small one.",
      "First, big companies usually offer higher salaries and better benefits to their workers.",
      "Second, big companies have more resources for training and career growth.",
      "Therefore, big companies provide more stable and rewarding careers."
    ],
    hintNo: '大企業派 → 理由1(給与) → 理由2(研修) → 結論'
  },
  w22: {
    answerNo: [
      "I do not think people should change jobs many times.",
      "First, changing jobs too often makes it hard to build deep skills in one field.",
      "Second, employers may not trust people who change jobs frequently.",
      "Therefore, staying at one job longer is usually better for one's career."
    ],
    hintNo: '反対 → 理由1(専門性) → 理由2(信頼) → 結論'
  },
  w23: {
    answerNo: [
      "I do not think eating dinner together every day is necessary.",
      "First, family members often have busy schedules with work, school, and clubs.",
      "Second, the quality of family time matters more than just sharing a meal.",
      "Eating together a few times a week is enough to keep the family bond strong."
    ],
    hintNo: '反対 → 理由1(忙しい) → 理由2(質) → 結論'
  },
  w24: {
    answerNo: [
      "I do not think having pets is always a good idea.",
      "First, pets need a lot of time, money, and attention to be cared for properly.",
      "Second, some people are allergic to animals or live in places where pets are not allowed.",
      "People should think carefully before getting a pet."
    ],
    hintNo: '反対 → 理由1(負担) → 理由2(アレルギー) → 結論'
  },
  w25: {
    answerNo: [
      "I do not think people always need to cook at home.",
      "First, cooking takes a lot of time, which is hard for busy working people.",
      "Second, eating out gives us a chance to try new foods and enjoy social time.",
      "A balance between home cooking and eating out is the best."
    ],
    hintNo: '反対 → 理由1(時間) → 理由2(社交) → 結論'
  },
  w26: {
    answerNo: [
      "I do not think traveling abroad is necessary for everyone.",
      "First, traveling abroad costs a lot of money, which not everyone can afford.",
      "Second, we can learn about other cultures through books, movies, and the Internet.",
      "Therefore, people who cannot travel abroad can still have a rich life."
    ],
    hintNo: '反対 → 理由1(費用) → 理由2(代替) → 結論'
  },
  w27: {
    answerNo: [
      "I do not think having a hobby is essential for everyone.",
      "First, some people find satisfaction in their work and family, without needing a hobby.",
      "Second, hobbies often cost money and time that some people cannot spare.",
      "It is fine to live without a specific hobby."
    ],
    hintNo: '反対 → 理由1(仕事と家族) → 理由2(資源) → 結論'
  },
  w28: {
    answerNo: [
      "I do not think children need to learn about money management at a young age.",
      "First, children are too young to understand complex financial topics.",
      "Second, childhood should be a time for play and learning, not worrying about money.",
      "They will learn about money naturally when they grow up."
    ],
    hintNo: '反対 → 理由1(理解度) → 理由2(子供時代) → 結論'
  },
  w29: {
    answerNo: [
      "I do not think movies always show real culture accurately.",
      "First, movies often exaggerate or use stereotypes for entertainment.",
      "Second, what we see in movies may not match how people really live in that country.",
      "We should not rely only on movies to learn about other cultures."
    ],
    hintNo: '反対 → 理由1(誇張) → 理由2(現実との違い) → 結論'
  },
  w30: {
    answerNo: [
      "I think planting trees in cities is good, but we should also focus on other actions.",
      "First, cities have limited space, and trees alone cannot solve air pollution.",
      "Second, reducing cars and factories is more important for cleaning the air.",
      "We need many different solutions, not only planting trees."
    ],
    hintNo: '複合意見 → 理由1(空間の限界) → 理由2(他の解決策) → 結論'
  }
};


// v19 추가: 각 주제에 No 답안 머지
ALL_WRITING.forEach(topic => {
  if (WRITING_NO_ANSWERS[topic.id]) {
    topic.answerNo = WRITING_NO_ANSWERS[topic.id].answerNo;
    topic.hintNo = WRITING_NO_ANSWERS[topic.id].hintNo;
  }
});


// ============================================================
// 영검 2급 문법 문제 50개 (4지선다 + 빈칸 채우기 섞음)
// 영역: 시제, 가정법, 관계대명사, 분사, 수동태, to不定詞/動名詞, 比較級, 조동사
// ============================================================
const GRAMMAR_TOPICS = [
  // ===== 시제 (10개) =====
  {
    id: 'g1', type: 'mc', cat: '⏰ 時制', topic: '現在完了',
    q: "I ___ never been to Hokkaido.",
    options: ['have', 'has', 'had', 'having'],
    answer: 0,
    explanation: 'I + have + p.p. (現在完了・経験)'
  },
  {
    id: 'g2', type: 'mc', cat: '⏰ 時制', topic: '過去完了',
    q: "When I arrived, the train ___ already left.",
    options: ['has', 'had', 'have', 'was'],
    answer: 1,
    explanation: '過去の時点(arrived)より前 = 過去完了(had + p.p.)'
  },
  {
    id: 'g3', type: 'fill', cat: '⏰ 時制', topic: '未来進行',
    q: "This time tomorrow, I ___ ___ at the airport.",
    answer: 'will be',
    hint: '未来のある時点で進行中の動作 (will + be + ~ing)',
    explanation: 'will be waiting / will be sitting など。 will be + V-ing'
  },
  {
    id: 'g4', type: 'mc', cat: '⏰ 時制', topic: '現在進行',
    q: "Look! It ___ raining now.",
    options: ['is', 'has', 'was', 'are'],
    answer: 0,
    explanation: '今進行中の動作 = 現在進行形 (is/are + ~ing)'
  },
  {
    id: 'g5', type: 'fill', cat: '⏰ 時制', topic: '現在完了進行',
    q: "I ___ ___ studying English for 3 years.",
    answer: 'have been',
    hint: '3年前から今まで継続 (have + been + ~ing)',
    explanation: 'have/has + been + V-ing。 過去から現在まで続く動作'
  },
  {
    id: 'g6', type: 'mc', cat: '⏰ 時制', topic: '過去完了',
    q: "She ___ already eaten lunch when I called her.",
    options: ['has', 'have', 'had', 'was'],
    answer: 2,
    explanation: 'called(過去)より前 = 過去完了。 had + p.p.'
  },
  {
    id: 'g7', type: 'mc', cat: '⏰ 時制', topic: '現在完了',
    q: "Have you ___ finished your homework?",
    options: ['yet', 'already', 'just', 'still'],
    answer: 1,
    explanation: '現在完了の疑問文で「もう?」の意味は already。 yet は否定文/疑問文の最後に使用'
  },
  {
    id: 'g8', type: 'fill', cat: '⏰ 時制', topic: 'since/for',
    q: "I have lived here ___ 2010.",
    answer: 'since',
    hint: '特定の時点から = since、 期間 = for',
    explanation: 'since + 時点 (2010, last year)。 for + 期間 (10 years, a long time)'
  },
  {
    id: 'g9', type: 'mc', cat: '⏰ 時制', topic: '単純未来',
    q: "I think it ___ rain tomorrow.",
    options: ['will', 'is', 'has', 'does'],
    answer: 0,
    explanation: '未来の予測 = will + 動詞の原形'
  },
  {
    id: 'g10', type: 'mc', cat: '⏰ 時制', topic: '時制の一致',
    q: "He said that he ___ tired.",
    options: ['is', 'are', 'was', 'be'],
    answer: 2,
    explanation: '主節が過去(said)なら従属節も過去(was)に'
  },

  // ===== 가정법 (8개) =====
  {
    id: 'g11', type: 'mc', cat: '🎲 仮定法', topic: '仮定法過去',
    q: "If I ___ rich, I would buy a big house.",
    options: ['am', 'were', 'will be', 'have been'],
    answer: 1,
    explanation: '仮定法過去: If + 主語 + were/過去形動詞, 主語 + would + 動詞の原形'
  },
  {
    id: 'g12', type: 'fill', cat: '🎲 仮定法', topic: '仮定法過去完了',
    q: "If I had studied harder, I ___ ___ passed the exam.",
    answer: 'would have',
    hint: 'If + had + p.p., 主語 + would + have + p.p.',
    explanation: '過去に起こらなかったことへの仮定 = 仮定法過去完了'
  },
  {
    id: 'g13', type: 'mc', cat: '🎲 仮定法', topic: 'I wish',
    q: "I wish I ___ speak Chinese.",
    options: ['can', 'could', 'will', 'have'],
    answer: 1,
    explanation: 'I wish + 仮定法過去 (could)。 現在の事実と反対の願望'
  },
  {
    id: 'g14', type: 'mc', cat: '🎲 仮定法', topic: 'as if',
    q: "He talks as if he ___ everything.",
    options: ['knows', 'knew', 'known', 'has known'],
    answer: 1,
    explanation: 'as if + 仮定法過去(knew)。 現在の事実と異なる仮定'
  },
  {
    id: 'g15', type: 'fill', cat: '🎲 仮定法', topic: 'unless',
    q: "I will be late ___ I run.",
    answer: 'unless',
    hint: '~しなければ = unless (= if not)',
    explanation: 'unless = if ... not。「走らなければ遅刻する」'
  },
  {
    id: 'g16', type: 'mc', cat: '🎲 仮定法', topic: '混合仮定法',
    q: "If I ___ taken the train, I would be there now.",
    options: ['have', 'had', 'has', 'having'],
    answer: 1,
    explanation: '過去の仮定 + 現在の結果 = had + p.p., would + 動詞の原形'
  },
  {
    id: 'g17', type: 'mc', cat: '🎲 仮定法', topic: 'should',
    q: "If you ___ see Tom, please tell him to call me.",
    options: ['should', 'would', 'could', 'might'],
    answer: 0,
    explanation: 'If + 主語 + should = 未来に万一~するなら'
  },
  {
    id: 'g18', type: 'fill', cat: '🎲 仮定法', topic: 'without',
    q: "___ your help, I could not finish this.",
    answer: 'Without',
    hint: '~なしで = Without (= If it were not for)',
    explanation: 'Without = If it were not for。「あなたの助けなしでは」'
  },

  // ===== 관계대명사 (8개) =====
  {
    id: 'g19', type: 'mc', cat: '🔗 関係詞', topic: 'who',
    q: "The boy ___ is wearing a red shirt is my brother.",
    options: ['who', 'which', 'whose', 'whom'],
    answer: 0,
    explanation: '先行詞が人(boy) + 主格 = who'
  },
  {
    id: 'g20', type: 'mc', cat: '🔗 関係詞', topic: 'which',
    q: "This is the book ___ I bought yesterday.",
    options: ['who', 'which', 'whose', 'where'],
    answer: 1,
    explanation: '先行詞が物(book) + 目的格 = which (または that)'
  },
  {
    id: 'g21', type: 'mc', cat: '🔗 関係詞', topic: 'whose',
    q: "I have a friend ___ father is a doctor.",
    options: ['who', 'whose', 'which', 'whom'],
    answer: 1,
    explanation: '所有格 = whose。「彼のお父さんがお医者さんの」友達'
  },
  {
    id: 'g22', type: 'fill', cat: '🔗 関係詞', topic: 'where',
    q: "This is the city ___ I was born.",
    answer: 'where',
    hint: '場所 = where (= in which)',
    explanation: '先行詞が場所(city) + 副詞の役割 = where'
  },
  {
    id: 'g23', type: 'mc', cat: '🔗 関係詞', topic: 'when',
    q: "I remember the day ___ we first met.",
    options: ['who', 'where', 'when', 'which'],
    answer: 2,
    explanation: '先行詞が時間(day) + 副詞の役割 = when'
  },
  {
    id: 'g24', type: 'mc', cat: '🔗 関係詞', topic: 'what',
    q: "Tell me ___ you want for your birthday.",
    options: ['that', 'which', 'what', 'who'],
    answer: 2,
    explanation: 'what = the thing(s) which。 先行詞を含む関係代名詞'
  },
  {
    id: 'g25', type: 'mc', cat: '🔗 関係詞', topic: '継続用法',
    q: "My sister, ___ lives in Tokyo, is a teacher.",
    options: ['who', 'that', 'which', 'whose'],
    answer: 0,
    explanation: '継続用法(コンマの後)では that は使用不可。 人なら who'
  },
  {
    id: 'g26', type: 'fill', cat: '🔗 関係詞', topic: 'whom',
    q: "The man ___ I met yesterday was kind.",
    answer: 'whom',
    hint: '人 + 目的格 = whom (口語では who も可能)',
    explanation: '先行詞が人 + 動詞の目的語 = whom'
  },

  // ===== 분사·動名詞·to不定詞 (8개) =====
  {
    id: 'g27', type: 'mc', cat: '📝 -ing/to V', topic: '動名詞',
    q: "I enjoy ___ books in my free time.",
    options: ['read', 'to read', 'reading', 'reads'],
    answer: 2,
    explanation: 'enjoy + V-ing (動名詞)。 enjoy の後には to不定詞は不可'
  },
  {
    id: 'g28', type: 'mc', cat: '📝 -ing/to V', topic: 'to不定詞',
    q: "She wants ___ a doctor.",
    options: ['be', 'being', 'to be', 'been'],
    answer: 2,
    explanation: 'want + to + 動詞の原形'
  },
  {
    id: 'g29', type: 'mc', cat: '📝 -ing/to V', topic: '現在分詞',
    q: "Look at the ___ baby!",
    options: ['sleep', 'sleeping', 'slept', 'to sleep'],
    answer: 1,
    explanation: '能動(寝ている) = 現在分詞 V-ing。 名詞の前で形容詞の役割'
  },
  {
    id: 'g30', type: 'mc', cat: '📝 -ing/to V', topic: '過去分詞',
    q: "The window was ___ by the boy.",
    options: ['break', 'broke', 'broken', 'breaking'],
    answer: 2,
    explanation: '受動態 = be + p.p. break-broke-broken'
  },
  {
    id: 'g31', type: 'fill', cat: '📝 -ing/to V', topic: 'stop ~ing',
    q: "Please stop ___ noise!",
    answer: 'making',
    hint: 'stop + V-ing (~するのをやめる)',
    explanation: 'stop V-ing (やめる) vs stop to V (~するために止まる)'
  },
  {
    id: 'g32', type: 'mc', cat: '📝 -ing/to V', topic: '分詞構文',
    q: "___ at the news, she started crying.",
    options: ['Shock', 'Shocked', 'Shocking', 'To shock'],
    answer: 1,
    explanation: '受動(驚かされた) = p.p. Being shocked → Shocked'
  },
  {
    id: 'g33', type: 'mc', cat: '📝 -ing/to V', topic: 'to V',
    q: "It is important ___ honest.",
    options: ['be', 'being', 'to be', 'been'],
    answer: 2,
    explanation: 'It is + 形容詞 + to V。「~することは重要だ」'
  },
  {
    id: 'g34', type: 'fill', cat: '📝 -ing/to V', topic: 'remember to V',
    q: "Remember ___ ___ off the lights when you leave.",
    answer: 'to turn',
    hint: 'remember + to V (これから~することを覚えておく)',
    explanation: 'remember to V (これから) vs remember V-ing (過去に)'
  },

  // ===== 수동태 (5개) =====
  {
    id: 'g35', type: 'mc', cat: '🔄 受動態', topic: '単純受動',
    q: "This book ___ written by a famous author.",
    options: ['is', 'are', 'has', 'have'],
    answer: 0,
    explanation: '単数主語(book) + be動詞 + p.p. = is written'
  },
  {
    id: 'g36', type: 'mc', cat: '🔄 受動態', topic: '過去受動',
    q: "The room ___ cleaned yesterday.",
    options: ['is', 'was', 'were', 'has'],
    answer: 1,
    explanation: '過去の受動 = was/were + p.p.'
  },
  {
    id: 'g37', type: 'fill', cat: '🔄 受動態', topic: '現在完了受動',
    q: "The work ___ ___ ___ finished.",
    answer: 'has not been',
    hint: '現在完了受動の否定 = has not been + p.p.',
    explanation: 'has/have + been + p.p. (現在完了受動)。 否定は not を追加'
  },
  {
    id: 'g38', type: 'mc', cat: '🔄 受動態', topic: '助動詞受動',
    q: "The homework must ___ by tomorrow.",
    options: ['finish', 'be finished', 'finishing', 'finished'],
    answer: 1,
    explanation: '助動詞 + be + p.p. = 助動詞受動態'
  },
  {
    id: 'g39', type: 'mc', cat: '🔄 受動態', topic: 'by',
    q: "The cake was made ___ my mother.",
    options: ['by', 'from', 'with', 'of'],
    answer: 0,
    explanation: '受動態で行為者は by + 行為者'
  },

  // ===== 比較級·最上級 (5개) =====
  {
    id: 'g40', type: 'mc', cat: '📊 比較', topic: '比較級',
    q: "Tokyo is ___ than Osaka.",
    options: ['big', 'bigger', 'biggest', 'more big'],
    answer: 1,
    explanation: 'big-bigger-biggest。 単音節 + er'
  },
  {
    id: 'g41', type: 'mc', cat: '📊 比較', topic: '最上級',
    q: "This is the ___ movie I have ever seen.",
    options: ['good', 'better', 'best', 'well'],
    answer: 2,
    explanation: 'good-better-best。 最上級 the + best'
  },
  {
    id: 'g42', type: 'fill', cat: '📊 比較', topic: 'as ~ as',
    q: "He runs as fast ___ his brother.",
    answer: 'as',
    hint: 'as + 原級 + as (~と同じくらい~)',
    explanation: 'as ~ as 原級比較。「彼のお兄さんと同じくらい速く」'
  },
  {
    id: 'g43', type: 'mc', cat: '📊 比較', topic: 'more',
    q: "This problem is ___ difficult than I thought.",
    options: ['much', 'more', 'most', 'many'],
    answer: 1,
    explanation: '2音節以上 = more + 原級 + than'
  },
  {
    id: 'g44', type: 'mc', cat: '📊 比較', topic: 'the + 比較級',
    q: "The harder you study, the ___ you learn.",
    options: ['much', 'more', 'most', 'many'],
    answer: 1,
    explanation: 'The 比較級 ~, the 比較級 ~。「~すればするほど~」'
  },

  // ===== 조동사 (6개) =====
  {
    id: 'g45', type: 'mc', cat: '💪 助動詞', topic: 'must',
    q: "You ___ wear a seatbelt in a car.",
    options: ['can', 'must', 'might', 'should'],
    answer: 1,
    explanation: 'must = ~しなければならない (強い義務)'
  },
  {
    id: 'g46', type: 'mc', cat: '💪 助動詞', topic: 'should',
    q: "You look tired. You ___ get some rest.",
    options: ['must', 'should', 'will', 'can'],
    answer: 1,
    explanation: 'should = ~したほうがよい (アドバイス)'
  },
  {
    id: 'g47', type: 'fill', cat: '💪 助動詞', topic: 'used to',
    q: "I ___ ___ play tennis when I was young.",
    answer: 'used to',
    hint: '過去の習慣 = used to + 動詞の原形',
    explanation: 'used to V = 昔は~した (今はしない)'
  },
  {
    id: 'g48', type: 'mc', cat: '💪 助動詞', topic: 'have to',
    q: "I ___ get up early tomorrow.",
    options: ['have to', 'has to', 'having to', 'had to'],
    answer: 0,
    explanation: 'I + have to + V。 (must と似た意味)'
  },
  {
    id: 'g49', type: 'mc', cat: '💪 助動詞', topic: '推測 might',
    q: "It ___ rain later. Take an umbrella.",
    options: ['must', 'might', 'should', 'has to'],
    answer: 1,
    explanation: 'might = ~かもしれない (弱い推測)'
  },
  {
    id: 'g50', type: 'mc', cat: '💪 助動詞', topic: '過去の推測',
    q: "She ___ have forgotten our meeting.",
    options: ['must', 'should', 'can', 'will'],
    answer: 0,
    explanation: 'must + have + p.p. = ~したにちがいない'
  }
];


// ============================================================
// v21 추가 데이터 (英作文/표현사전/매일미션)
// ============================================================
// ============================================================
// 📝 英作文チャレンジ (일본어 → 영어 번역 학습)
// 3단계: 초급 5~7어 / 중급 8~12어 / 고급 13~20어 각 20문제
// ============================================================
const COMPOSITION_DATA = {
  beginner: [
    { ja: 'わたしは 学生です。', en: 'I am a student.', hint: ['I', 'am', 'a', 'student'] },
    { ja: 'これは 本です。', en: 'This is a book.', hint: ['This', 'is', 'a', 'book'] },
    { ja: 'わたしは 犬が すきです。', en: 'I like dogs.', hint: ['I', 'like', 'dogs'] },
    { ja: 'かれは 先生です。', en: 'He is a teacher.', hint: ['He', 'is', 'a', 'teacher'] },
    { ja: 'わたしは 東京に すんでいます。', en: 'I live in Tokyo.', hint: ['I', 'live', 'in', 'Tokyo'] },
    { ja: 'きょうは 月曜日です。', en: 'Today is Monday.', hint: ['Today', 'is', 'Monday'] },
    { ja: 'かれらは 友だちです。', en: 'They are friends.', hint: ['They', 'are', 'friends'] },
    { ja: 'わたしは 13さいです。', en: 'I am 13 years old.', hint: ['I', 'am', '13', 'years', 'old'] },
    { ja: 'ねこが ねむっています。', en: 'The cat is sleeping.', hint: ['cat', 'sleeping', 'is'] },
    { ja: 'わたしは ピアノが ひけます。', en: 'I can play the piano.', hint: ['I', 'can', 'play', 'piano'] },
    { ja: 'あれは わたしの 本です。', en: 'That is my book.', hint: ['That', 'is', 'my', 'book'] },
    { ja: 'かのじょは とても かわいいです。', en: 'She is very cute.', hint: ['She', 'is', 'very', 'cute'] },
    { ja: 'わたしは おにぎりが すきです。', en: 'I like rice balls.', hint: ['I', 'like', 'rice', 'balls'] },
    { ja: 'あめが ふっています。', en: 'It is raining.', hint: ['It', 'is', 'raining'] },
    { ja: 'わたしは 公園に 行きます。', en: 'I go to the park.', hint: ['I', 'go', 'to', 'park'] },
    { ja: 'これは 新しい くるまです。', en: 'This is a new car.', hint: ['This', 'is', 'new', 'car'] },
    { ja: 'わたしは おさらを あらいます。', en: 'I wash the dishes.', hint: ['I', 'wash', 'dishes'] },
    { ja: 'かれは サッカーを します。', en: 'He plays soccer.', hint: ['He', 'plays', 'soccer'] },
    { ja: 'わたしは えいがが すきです。', en: 'I like movies.', hint: ['I', 'like', 'movies'] },
    { ja: 'かのじょは 日本人です。', en: 'She is Japanese.', hint: ['She', 'is', 'Japanese'] },
  ],
  intermediate: [
    { ja: 'わたしは まいにち えいごを べんきょうします。', en: 'I study English every day.', hint: ['study', 'English', 'every', 'day'] },
    { ja: 'かれは いつも おもしろい 話を します。', en: 'He always tells interesting stories.', hint: ['always', 'tells', 'interesting'] },
    { ja: 'わたしの ゆめは いしゃに なることです。', en: 'My dream is to become a doctor.', hint: ['dream', 'become', 'doctor'] },
    { ja: 'きのう しゅくだいを わすれて しまいました。', en: 'I forgot my homework yesterday.', hint: ['forgot', 'homework', 'yesterday'] },
    { ja: 'かれは わたしより せが たかいです。', en: 'He is taller than me.', hint: ['taller', 'than', 'me'] },
    { ja: 'この 本は とても むずかしいです。', en: 'This book is very difficult.', hint: ['book', 'very', 'difficult'] },
    { ja: 'わたしは あした はやく おきなければなりません。', en: 'I have to get up early tomorrow.', hint: ['have to', 'get up', 'early'] },
    { ja: 'いっしょに ひるごはんを たべませんか?', en: 'Shall we have lunch together?', hint: ['shall', 'lunch', 'together'] },
    { ja: 'わたしは ピザを たべたことが あります。', en: 'I have eaten pizza before.', hint: ['have', 'eaten', 'before'] },
    { ja: 'あの 山は とても 高いです。', en: 'That mountain is very high.', hint: ['mountain', 'very', 'high'] },
    { ja: 'わたしは 兄が ふたり います。', en: 'I have two older brothers.', hint: ['have', 'two', 'older', 'brothers'] },
    { ja: 'かれは わたしに プレゼントを くれました。', en: 'He gave me a present.', hint: ['gave', 'present'] },
    { ja: 'わたしは おんがくを ききながら べんきょうします。', en: 'I study while listening to music.', hint: ['while', 'listening', 'music'] },
    { ja: '日本の 食べものは とても おいしいです。', en: 'Japanese food is very delicious.', hint: ['Japanese', 'food', 'delicious'] },
    { ja: 'わたしは このまえ 海に いきました。', en: 'I went to the sea recently.', hint: ['went', 'sea', 'recently'] },
    { ja: 'かのじょは うつくしい 声を しています。', en: 'She has a beautiful voice.', hint: ['beautiful', 'voice'] },
    { ja: 'わたしは あした 友だちに 会います。', en: 'I will meet my friend tomorrow.', hint: ['meet', 'friend', 'tomorrow'] },
    { ja: 'この レストランは いつも こんでいます。', en: 'This restaurant is always crowded.', hint: ['restaurant', 'always', 'crowded'] },
    { ja: 'わたしは ねこより 犬の ほうが すきです。', en: 'I like dogs better than cats.', hint: ['better', 'than', 'cats'] },
    { ja: 'かれは 5年間 中国に すんでいます。', en: 'He has lived in China for 5 years.', hint: ['has lived', 'for', 'years'] },
  ],
  advanced: [
    { ja: 'もし お金が あったら、 せかい中を 旅行したいです。', en: 'If I had money, I would like to travel around the world.', hint: ['If', 'had', 'would', 'travel'] },
    { ja: 'わたしが 知っている かぎり、 かれは 信じる 人です。', en: 'As far as I know, he is a person we can trust.', hint: ['As far as', 'know', 'trust'] },
    { ja: 'べんきょうすれば するほど、 知らないことが 多くなります。', en: 'The more I study, the more I realize how much I do not know.', hint: ['The more', 'realize'] },
    { ja: 'たとえ あめが ふっても、 わたしは 出かけます。', en: 'Even if it rains, I will go out.', hint: ['Even if', 'rains'] },
    { ja: 'かれは いそがしいに ちがいないので、 でんわを しないほうが いいです。', en: 'He must be busy, so we should not call him.', hint: ['must be', 'should not'] },
    { ja: 'わたしは えいごを べんきょうし はじめてから 5年に なります。', en: 'It has been five years since I started studying English.', hint: ['has been', 'since', 'started'] },
    { ja: 'こどもの ときに ピアノを ならっていれば よかったです。', en: 'I wish I had learned the piano when I was a child.', hint: ['wish', 'had learned', 'when'] },
    { ja: 'かれは わたしに ねっしんに べんきょうするように いいました。', en: 'He told me to study hard.', hint: ['told', 'to study', 'hard'] },
    { ja: 'この 本は 子どもにも おとなにも おすすめです。', en: 'This book is recommended for both children and adults.', hint: ['recommended', 'both', 'and'] },
    { ja: 'みなさんの きょうりょくが なければ、 これは できませんでした。', en: 'Without your cooperation, this would not have been possible.', hint: ['Without', 'cooperation', 'would not'] },
    { ja: 'インターネットは わたしたちの 生活を 大きく 変えました。', en: 'The Internet has greatly changed our lives.', hint: ['Internet', 'greatly', 'changed'] },
    { ja: 'かんきょうを まもることは わたしたち みんなの せきにんです。', en: 'Protecting the environment is the responsibility of all of us.', hint: ['Protecting', 'environment', 'responsibility'] },
    { ja: 'もっと どりょくしていれば、 しけんに ごうかくできたのに。', en: 'If I had tried harder, I could have passed the exam.', hint: ['If', 'had tried', 'could have'] },
    { ja: 'けんこうを たいせつに しないと、 あとで こうかいします。', en: 'If you do not take care of your health, you will regret it later.', hint: ['take care', 'regret'] },
    { ja: 'これは わたしが いままでに 読んだ 中で いちばん おもしろい 本です。', en: 'This is the most interesting book I have ever read.', hint: ['most interesting', 'have ever read'] },
    { ja: 'かれが いそいで いた 理由が やっと わかりました。', en: 'I finally understood the reason why he was in a hurry.', hint: ['finally', 'reason', 'in a hurry'] },
    { ja: 'こんなに きれいな けしきは みた ことが ありません。', en: 'I have never seen such beautiful scenery.', hint: ['never seen', 'such', 'beautiful'] },
    { ja: 'えいごを じょうずに 話せるように なるには じかんが かかります。', en: 'It takes time to become able to speak English fluently.', hint: ['takes time', 'become able', 'fluently'] },
    { ja: 'たとえ しっぱいしても、 また ちょうせんすれば いいのです。', en: 'Even if you fail, you can try again.', hint: ['Even if', 'fail', 'try again'] },
    { ja: 'みらいを よくするためには、 いま ぜんりょくを つくす ひつようが あります。', en: 'To make the future better, we need to do our best now.', hint: ['To make', 'better', 'do our best'] },
  ]
};

// 모든 작문 문제 통합 (난이도 정보 포함)
const ALL_COMPOSITION = [
  ...COMPOSITION_DATA.beginner.map(q => ({ ...q, level: 'beginner', levelJa: '初級' })),
  ...COMPOSITION_DATA.intermediate.map(q => ({ ...q, level: 'intermediate', levelJa: '中級' })),
  ...COMPOSITION_DATA.advanced.map(q => ({ ...q, level: 'advanced', levelJa: '上級' })),
];

// ============================================================
// 🎭 ライティング 表現辞典 (영검 라이팅용 표현 사전)
// 카테고리별로 정리, 각 표현에 일본어 의미 + 예문 1개
// ============================================================
const PHRASE_DICT = [
  // ===== 1. 意見を述べる (의견 제시) =====
  { cat: '💭 意見', expr: 'I think (that)...', ja: '~と思います', ex: 'I think that exercise is important.' },
  { cat: '💭 意見', expr: 'I believe (that)...', ja: '~と信じています', ex: 'I believe that hard work pays off.' },
  { cat: '💭 意見', expr: 'In my opinion, ...', ja: '私の意見では、~', ex: 'In my opinion, reading is the best hobby.' },
  { cat: '💭 意見', expr: 'I feel (that)...', ja: '~と感じる', ex: 'I feel that we need more time.' },
  { cat: '💭 意見', expr: 'It seems to me that...', ja: '私には~のように思える', ex: 'It seems to me that he is right.' },
  { cat: '💭 意見', expr: 'From my perspective, ...', ja: '私の視点では、~', ex: 'From my perspective, this is the best choice.' },
  { cat: '💭 意見', expr: 'As far as I am concerned, ...', ja: '私に関する限り、~', ex: 'As far as I am concerned, this is fair.' },
  { cat: '💭 意見', expr: 'I would say that...', ja: '~と言えると思う', ex: 'I would say that he is very kind.' },

  // ===== 2. 賛成 (찬성) =====
  { cat: '👍 賛成', expr: 'I agree with...', ja: '~に賛成です', ex: 'I agree with your idea.' },
  { cat: '👍 賛成', expr: 'I am in favor of...', ja: '~に賛成です', ex: 'I am in favor of this plan.' },
  { cat: '👍 賛成', expr: 'I support...', ja: '~を支持します', ex: 'I support this decision.' },
  { cat: '👍 賛成', expr: 'I am for...', ja: '~に賛成です', ex: 'I am for using public transportation.' },
  { cat: '👍 賛成', expr: 'That is a good point.', ja: 'それは良い意見です', ex: 'That is a good point about education.' },
  { cat: '👍 賛成', expr: 'I completely agree.', ja: '完全に同意します', ex: 'I completely agree with the teacher.' },
  { cat: '👍 賛成', expr: 'Exactly!', ja: 'まさにその通り!', ex: 'Exactly! That is what I meant.' },

  // ===== 3. 反対 (반대) =====
  { cat: '👎 反対', expr: 'I do not think (that)...', ja: '~とは思いません', ex: 'I do not think money brings happiness.' },
  { cat: '👎 反対', expr: 'I disagree with...', ja: '~に反対です', ex: 'I disagree with this idea.' },
  { cat: '👎 反対', expr: 'I am against...', ja: '~に反対です', ex: 'I am against using cars in the city.' },
  { cat: '👎 反対', expr: 'I cannot agree.', ja: '同意できません', ex: 'I cannot agree with that opinion.' },
  { cat: '👎 反対', expr: 'I do not believe (that)...', ja: '~とは信じない', ex: 'I do not believe that is the best way.' },
  { cat: '👎 反対', expr: 'However, ...', ja: 'しかし、~', ex: 'However, there are some problems.' },
  { cat: '👎 反対', expr: 'On the other hand, ...', ja: '一方で、~', ex: 'On the other hand, it is expensive.' },
  { cat: '👎 反対', expr: 'In contrast, ...', ja: '対照的に、~', ex: 'In contrast, traditional methods are slower.' },

  // ===== 4. 理由を示す (이유 제시) =====
  { cat: '🔍 理由', expr: 'because...', ja: '~だから', ex: 'I love sports because they are fun.' },
  { cat: '🔍 理由', expr: 'since...', ja: '~なので', ex: 'Since it is raining, we should stay home.' },
  { cat: '🔍 理由', expr: 'as...', ja: '~なので', ex: 'As I am tired, I want to sleep.' },
  { cat: '🔍 理由', expr: 'because of...', ja: '~のため (名詞)', ex: 'Because of the rain, we stayed home.' },
  { cat: '🔍 理由', expr: 'due to...', ja: '~のため (名詞)', ex: 'The flight was delayed due to bad weather.' },
  { cat: '🔍 理由', expr: 'thanks to...', ja: '~のおかげで', ex: 'Thanks to my teacher, I passed the exam.' },
  { cat: '🔍 理由', expr: 'The reason is (that)...', ja: '理由は~です', ex: 'The reason is that I love music.' },
  { cat: '🔍 理由', expr: 'That is why...', ja: 'だから~', ex: 'That is why I study hard every day.' },

  // ===== 5. 順序を示す (순서 표시) =====
  { cat: '📋 順序', expr: 'First, ...', ja: '第一に、~', ex: 'First, you need to make a plan.' },
  { cat: '📋 順序', expr: 'Second, ...', ja: '第二に、~', ex: 'Second, you should set a goal.' },
  { cat: '📋 順序', expr: 'Third, ...', ja: '第三に、~', ex: 'Third, take action quickly.' },
  { cat: '📋 順序', expr: 'Finally, ...', ja: '最後に、~', ex: 'Finally, evaluate your results.' },
  { cat: '📋 順序', expr: 'To begin with, ...', ja: 'まず初めに、~', ex: 'To begin with, let me introduce myself.' },
  { cat: '📋 順序', expr: 'Next, ...', ja: '次に、~', ex: 'Next, we discussed the problem.' },
  { cat: '📋 順序', expr: 'In addition, ...', ja: '加えて、~', ex: 'In addition, it is good for the environment.' },
  { cat: '📋 順序', expr: 'Moreover, ...', ja: 'さらに、~', ex: 'Moreover, it saves time.' },
  { cat: '📋 順序', expr: 'Furthermore, ...', ja: 'さらに、~', ex: 'Furthermore, it is more reliable.' },
  { cat: '📋 順序', expr: 'Also, ...', ja: 'また、~', ex: 'Also, we should consider the cost.' },

  // ===== 6. 結論を述べる (결론) =====
  { cat: '🎯 結論', expr: 'Therefore, ...', ja: 'したがって、~', ex: 'Therefore, I think we should try.' },
  { cat: '🎯 結論', expr: 'In conclusion, ...', ja: '結論として、~', ex: 'In conclusion, sleep is essential.' },
  { cat: '🎯 結論', expr: 'For these reasons, ...', ja: 'これらの理由から、~', ex: 'For these reasons, I prefer the city.' },
  { cat: '🎯 結論', expr: 'As a result, ...', ja: '結果として、~', ex: 'As a result, the team won the game.' },
  { cat: '🎯 結論', expr: 'Thus, ...', ja: 'このように、~', ex: 'Thus, education plays a key role.' },
  { cat: '🎯 結論', expr: 'In short, ...', ja: '要するに、~', ex: 'In short, hard work brings success.' },
  { cat: '🎯 結論', expr: 'To sum up, ...', ja: 'まとめると、~', ex: 'To sum up, exercise is important.' },
  { cat: '🎯 結論', expr: 'Overall, ...', ja: '全体として、~', ex: 'Overall, the trip was successful.' },

  // ===== 7. 例を挙げる (예시) =====
  { cat: '🌟 例示', expr: 'For example, ...', ja: '例えば、~', ex: 'For example, watching movies is fun.' },
  { cat: '🌟 例示', expr: 'For instance, ...', ja: '例えば、~', ex: 'For instance, soccer is popular.' },
  { cat: '🌟 例示', expr: 'such as...', ja: '~のような', ex: 'I love fruits such as apples and oranges.' },
  { cat: '🌟 例示', expr: 'like...', ja: '~のような', ex: 'I enjoy sports like tennis.' },
  { cat: '🌟 例示', expr: 'including...', ja: '~を含めて', ex: 'Many people, including students, love music.' },
  { cat: '🌟 例示', expr: 'Take ... for example.', ja: '例として~を取ろう', ex: 'Take Tokyo for example.' },
  { cat: '🌟 例示', expr: 'A good example is...', ja: '良い例は~', ex: 'A good example is online learning.' },

  // ===== 8. 比較・対比 (비교/대조) =====
  { cat: '⚖️ 比較', expr: '... is better than ~', ja: '~より良い', ex: 'Reading is better than watching TV.' },
  { cat: '⚖️ 比較', expr: '... is more important than ~', ja: '~より重要', ex: 'Health is more important than wealth.' },
  { cat: '⚖️ 比較', expr: 'compared to...', ja: '~と比べて', ex: 'Compared to last year, I am taller.' },
  { cat: '⚖️ 比較', expr: 'similar to...', ja: '~と似ている', ex: 'This game is similar to chess.' },
  { cat: '⚖️ 比較', expr: 'different from...', ja: '~と異なる', ex: 'My opinion is different from yours.' },
  { cat: '⚖️ 比較', expr: 'unlike...', ja: '~と違って', ex: 'Unlike summer, winter is cold.' },
  { cat: '⚖️ 比較', expr: 'while...', ja: '~一方で', ex: 'While he likes coffee, I prefer tea.' },
  { cat: '⚖️ 比較', expr: 'whereas...', ja: '~一方で', ex: 'I am quiet, whereas my brother is loud.' },

  // ===== 9. 仮定・条件 (가정/조건) =====
  { cat: '🎲 仮定', expr: 'If..., ...', ja: 'もし~なら、~', ex: 'If you study, you will pass.' },
  { cat: '🎲 仮定', expr: 'Unless..., ...', ja: '~でなければ、~', ex: 'Unless you hurry, you will be late.' },
  { cat: '🎲 仮定', expr: 'In case..., ...', ja: '~の場合に備えて', ex: 'Take an umbrella in case it rains.' },
  { cat: '🎲 仮定', expr: 'As long as..., ...', ja: '~である限り、~', ex: 'As long as you try, you will improve.' },
  { cat: '🎲 仮定', expr: 'Provided that..., ...', ja: '~という条件で', ex: 'You can go provided that you finish work.' },
  { cat: '🎲 仮定', expr: 'Otherwise, ...', ja: 'さもなければ、~', ex: 'Hurry up. Otherwise, we will miss the train.' },

  // ===== 10. 強調 (강조) =====
  { cat: '💪 強調', expr: 'It is true that...', ja: '~は本当だ', ex: 'It is true that exercise is good.' },
  { cat: '💪 強調', expr: 'Of course, ...', ja: 'もちろん、~', ex: 'Of course, family is important.' },
  { cat: '💪 強調', expr: 'Indeed, ...', ja: '確かに、~', ex: 'Indeed, this is a great idea.' },
  { cat: '💪 強調', expr: 'Certainly, ...', ja: '確実に、~', ex: 'Certainly, we need a plan.' },
  { cat: '💪 強調', expr: 'Without doubt, ...', ja: '疑いなく、~', ex: 'Without doubt, she is the best.' },
  { cat: '💪 強調', expr: 'It is essential to...', ja: '~することが不可欠だ', ex: 'It is essential to study every day.' },
  { cat: '💪 強調', expr: 'It is important to...', ja: '~することが重要だ', ex: 'It is important to listen carefully.' },
  { cat: '💪 強調', expr: 'It is necessary to...', ja: '~することが必要だ', ex: 'It is necessary to plan ahead.' },

  // ===== 11. 提案・解決策 (제안/해결책) =====
  { cat: '💡 提案', expr: 'We should...', ja: '~すべきだ', ex: 'We should protect the environment.' },
  { cat: '💡 提案', expr: 'We must...', ja: '~しなければならない', ex: 'We must finish this today.' },
  { cat: '💡 提案', expr: 'We need to...', ja: '~する必要がある', ex: 'We need to think carefully.' },
  { cat: '💡 提案', expr: 'It would be better to...', ja: '~したほうが良い', ex: 'It would be better to wait.' },
  { cat: '💡 提案', expr: 'How about...?', ja: '~はどうですか?', ex: 'How about going to the park?' },
  { cat: '💡 提案', expr: 'Why don\'t we...?', ja: '~しませんか?', ex: 'Why don\'t we have lunch together?' },
  { cat: '💡 提案', expr: 'Let me suggest...', ja: '~を提案させてください', ex: 'Let me suggest a different approach.' },
  { cat: '💡 提案', expr: 'One solution is...', ja: '一つの解決策は~', ex: 'One solution is to start early.' },

  // ===== 12. 利点・欠点 (장점/단점) =====
  { cat: '✨ 利点', expr: 'The advantage is (that)...', ja: '利点は~', ex: 'The advantage is that it is fast.' },
  { cat: '✨ 利点', expr: 'The benefit is (that)...', ja: '利益は~', ex: 'The benefit is better health.' },
  { cat: '✨ 利点', expr: '... has many benefits.', ja: '~には多くの利点がある', ex: 'Reading has many benefits.' },
  { cat: '✨ 利点', expr: '... is helpful for ~', ja: '~は~に役立つ', ex: 'Exercise is helpful for health.' },
  { cat: '⚠️ 欠点', expr: 'The disadvantage is (that)...', ja: '欠点は~', ex: 'The disadvantage is the cost.' },
  { cat: '⚠️ 欠点', expr: 'The downside is (that)...', ja: 'マイナス面は~', ex: 'The downside is the noise.' },
  { cat: '⚠️ 欠点', expr: 'However, there is a problem.', ja: 'しかし、問題がある', ex: 'However, there is a problem with this idea.' },
  { cat: '⚠️ 欠点', expr: '... has some drawbacks.', ja: '~にはいくつかの欠点がある', ex: 'This plan has some drawbacks.' },

  // ===== 13. 頻度・程度 (빈도/정도) =====
  { cat: '📊 頻度', expr: 'always', ja: '常に', ex: 'I always wake up at 7.' },
  { cat: '📊 頻度', expr: 'usually', ja: '普段は', ex: 'I usually have rice for breakfast.' },
  { cat: '📊 頻度', expr: 'often', ja: 'よく', ex: 'I often visit my grandmother.' },
  { cat: '📊 頻度', expr: 'sometimes', ja: '時々', ex: 'Sometimes I read before sleeping.' },
  { cat: '📊 頻度', expr: 'rarely', ja: 'まれに', ex: 'I rarely watch TV.' },
  { cat: '📊 頻度', expr: 'never', ja: '決して~ない', ex: 'I never give up.' },
  { cat: '📊 頻度', expr: 'every day', ja: '毎日', ex: 'I exercise every day.' },
  { cat: '📊 頻度', expr: 'most of the time', ja: 'ほとんどの時間', ex: 'Most of the time, I study at home.' },

  // ===== 14. 接続 (접속) =====
  { cat: '🔗 接続', expr: 'and', ja: '~と', ex: 'I like apples and oranges.' },
  { cat: '🔗 接続', expr: 'but', ja: 'しかし', ex: 'I tried, but I failed.' },
  { cat: '🔗 接続', expr: 'or', ja: 'または', ex: 'Tea or coffee?' },
  { cat: '🔗 接続', expr: 'so', ja: 'だから', ex: 'It was raining, so I stayed home.' },
  { cat: '🔗 接続', expr: 'although', ja: '~にも関わらず', ex: 'Although it was cold, I went out.' },
  { cat: '🔗 接続', expr: 'even though', ja: '~であっても', ex: 'Even though I was tired, I finished.' },
  { cat: '🔗 接続', expr: 'while', ja: '~の間に', ex: 'I read while waiting.' },
  { cat: '🔗 接続', expr: 'after', ja: '~の後で', ex: 'I exercise after school.' },
  { cat: '🔗 接続', expr: 'before', ja: '~の前に', ex: 'I brush my teeth before bed.' },
  { cat: '🔗 接続', expr: 'when', ja: '~のとき', ex: 'When I was young, I lived in Osaka.' },
];

// ============================================================
// 📅 매일의 영어 미션 - 30개 (날짜 기반 순환, 1달치)
// 매일 다른 미션 + 작성한 답을 localStorage에 누적 저장
// ============================================================
const DAILY_MISSIONS = [
  {
    id: 1,
    cat: '🌅 朝',
    title: 'Morning Greeting',
    titleJa: '朝の あいさつ',
    prompt: 'Write 2-3 sentences about how you spent your morning today.',
    promptJa: '今朝 どう 過ごしたか 2~3文 で 書いてみよう。',
    example: 'I woke up at 7 a.m. I had toast and milk for breakfast. Then I brushed my teeth and got ready for school.'
  },
  {
    id: 2,
    cat: '🍱 食事',
    title: 'Favorite Food',
    titleJa: '好きな 食べもの',
    prompt: 'Write 3 sentences about your favorite food and why you like it.',
    promptJa: 'あなたの 好きな 食べものと 理由を 3文 で 書いてみよう。',
    example: 'My favorite food is sushi. I love the taste of fresh fish on rice. My family often eats sushi on weekends.'
  },
  {
    id: 3,
    cat: '👨‍👩‍👧 家族',
    title: 'My Family',
    titleJa: 'わたしの 家族',
    prompt: 'Introduce one family member in 2-3 sentences.',
    promptJa: '家族の だれか ひとりを 2~3文 で 紹介してみよう。',
    example: 'My younger brother is in first grade. He is cheerful and likes playing games. We often play together at home.'
  },
  {
    id: 4,
    cat: '🎮 趣味',
    title: 'My Hobby',
    titleJa: 'わたしの 趣味',
    prompt: 'What is your hobby? Why do you enjoy it? (3 sentences)',
    promptJa: 'あなたの 趣味は 何ですか? なぜ それが 好きですか? 3文 で 書こう。',
    example: 'My hobby is drawing. I love drawing animals and characters. It makes me feel relaxed and happy.'
  },
  {
    id: 5,
    cat: '🏫 学校',
    title: 'School Today',
    titleJa: '今日の 学校',
    prompt: 'Tell me about your school day today. What did you learn?',
    promptJa: '今日の 学校は どうでしたか? 何を 学びましたか?',
    example: 'Today, I had math, English, and PE. In math, we learned about fractions. PE was fun because we played dodgeball.'
  },
  {
    id: 6,
    cat: '🌧️ 天気',
    title: 'Today\'s Weather',
    titleJa: '今日の 天気',
    prompt: 'Describe today\'s weather and what it makes you want to do.',
    promptJa: '今日の 天気を 説明し、 それで 何が したく なるか 書こう。',
    example: 'It is sunny and warm today. The sky is blue with no clouds. I want to go to the park and play soccer.'
  },
  {
    id: 7,
    cat: '🎉 週末',
    title: 'Weekend Plan',
    titleJa: '週末の 予定',
    prompt: 'What will you do this weekend? Write 3 things.',
    promptJa: '今週末 何を しますか? 3つ 書こう。',
    example: 'This weekend, I will visit my grandmother on Saturday. On Sunday, I will play with my friends. I will also do my homework in the evening.'
  },
  {
    id: 8,
    cat: '🐶 動物',
    title: 'Favorite Animal',
    titleJa: '好きな 動物',
    prompt: 'What is your favorite animal? Describe it in 3 sentences.',
    promptJa: '好きな 動物は 何ですか? 3文 で 説明しよう。',
    example: 'My favorite animal is the dog. Dogs are loyal and friendly. I want to have a small dog as a pet.'
  },
  {
    id: 9,
    cat: '✈️ 旅行',
    title: 'Dream Vacation',
    titleJa: '夢の バカンス',
    prompt: 'Where would you like to travel? What would you do there?',
    promptJa: 'どこに 旅行 したいですか? そこで 何を しますか?',
    example: 'I would like to travel to Hawaii. I would swim in the sea every day. I would also try a lot of delicious food.'
  },
  {
    id: 10,
    cat: '📚 読書',
    title: 'Best Book',
    titleJa: 'いちばん 好きな 本',
    prompt: 'What is the best book you have read? Why?',
    promptJa: '今まで 読んだ 中で いちばん 好きな 本は? なぜ?',
    example: 'My favorite book is Harry Potter. The story is exciting and full of magic. I have read it three times.'
  },
  {
    id: 11,
    cat: '🍰 おやつ',
    title: 'Sweet Treat',
    titleJa: 'おやつ',
    prompt: 'What is your favorite snack? When do you eat it?',
    promptJa: '好きな おやつは? いつ 食べますか?',
    example: 'My favorite snack is chocolate cookies. I usually eat them after school. They give me energy for homework.'
  },
  {
    id: 12,
    cat: '🎵 音楽',
    title: 'Music I Love',
    titleJa: '好きな 音楽',
    prompt: 'What kind of music do you like? Why?',
    promptJa: 'どんな 音楽が 好きですか? なぜ?',
    example: 'I like J-pop music. The melodies are catchy and the lyrics are meaningful. I listen to it every day on my way to school.'
  },
  {
    id: 13,
    cat: '🏃 運動',
    title: 'Exercise Today',
    titleJa: '今日の 運動',
    prompt: 'Did you exercise today? What did you do?',
    promptJa: '今日 運動しましたか? 何を しましたか?',
    example: 'Yes, I exercised today. I rode my bicycle for 30 minutes. I felt refreshed after the ride.'
  },
  {
    id: 14,
    cat: '👫 友だち',
    title: 'My Best Friend',
    titleJa: 'いちばん 仲の良い 友だち',
    prompt: 'Tell me about your best friend in 3 sentences.',
    promptJa: 'いちばん 仲の良い 友だちに ついて 3文 で 書いて。',
    example: 'My best friend is Kenta. He is funny and kind. We play soccer together every weekend.'
  },
  {
    id: 15,
    cat: '🌸 季節',
    title: 'Favorite Season',
    titleJa: '好きな 季節',
    prompt: 'What is your favorite season? Why?',
    promptJa: '好きな 季節は? なぜ?',
    example: 'My favorite season is spring. The cherry blossoms are beautiful. The weather is warm and perfect for picnics.'
  },
  {
    id: 16,
    cat: '😊 気持ち',
    title: 'How I Feel',
    titleJa: '今の 気もち',
    prompt: 'How do you feel today? Why?',
    promptJa: '今日の 気もちは? なぜ?',
    example: 'I feel happy today. I got a good score on my math test. My mom said she is proud of me.'
  },
  {
    id: 17,
    cat: '🎁 プレゼント',
    title: 'Best Gift',
    titleJa: 'いちばんの プレゼント',
    prompt: 'What is the best gift you have received? Who gave it?',
    promptJa: 'もらった 中で いちばん 良い プレゼントは? だれから?',
    example: 'The best gift was a bicycle from my parents. They gave it to me on my birthday. I use it almost every day.'
  },
  {
    id: 18,
    cat: '🌟 夢',
    title: 'My Dream',
    titleJa: 'わたしの 夢',
    prompt: 'What do you want to be in the future? Why?',
    promptJa: '将来の 夢は? なぜ?',
    example: 'I want to be a scientist in the future. I love learning about how things work. I hope to discover something new someday.'
  },
  {
    id: 19,
    cat: '🍳 料理',
    title: 'Cooking',
    titleJa: '料理',
    prompt: 'Have you ever cooked? What can you make?',
    promptJa: '料理したことが ありますか? 何が 作れますか?',
    example: 'Yes, I can make eggs and toast. Sometimes I help my mom in the kitchen. I want to learn how to make curry next.'
  },
  {
    id: 20,
    cat: '📺 映画',
    title: 'Favorite Movie',
    titleJa: '好きな 映画',
    prompt: 'What is your favorite movie? Why do you like it?',
    promptJa: '好きな 映画は? なぜ それが 好き?',
    example: 'My favorite movie is My Neighbor Totoro. The story is warm and beautiful. Totoro is so cute that I want to meet him.'
  },
  {
    id: 21,
    cat: '🌍 場所',
    title: 'Favorite Place',
    titleJa: '好きな 場所',
    prompt: 'Where is your favorite place? What do you do there?',
    promptJa: '好きな 場所は? そこで 何を しますか?',
    example: 'My favorite place is the library. It is quiet and peaceful. I read many books there on weekends.'
  },
  {
    id: 22,
    cat: '🎂 誕生日',
    title: 'Birthday',
    titleJa: '誕生日',
    prompt: 'When is your birthday? How do you usually celebrate?',
    promptJa: '誕生日は いつ? いつも どう 祝う?',
    example: 'My birthday is on June 5. I usually have a birthday cake with my family. We sing the birthday song and I make a wish.'
  },
  {
    id: 23,
    cat: '😨 こわい',
    title: 'Scary Thing',
    titleJa: 'こわい こと',
    prompt: 'What scares you? Why?',
    promptJa: 'こわい ものは 何? なぜ?',
    example: 'I am scared of spiders. They have many legs and move quickly. I cannot stay in a room with one.'
  },
  {
    id: 24,
    cat: '🎓 勉強',
    title: 'Best Subject',
    titleJa: '得意な 科目',
    prompt: 'What is your best subject at school? Why?',
    promptJa: '学校で 得意な 科目は? なぜ?',
    example: 'My best subject is English. I love learning new words and expressions. My teacher always praises my work.'
  },
  {
    id: 25,
    cat: '😴 ねむる',
    title: 'Sleep Routine',
    titleJa: 'ねる 前の しゅうかん',
    prompt: 'What do you do before bed? When do you sleep?',
    promptJa: 'ねる前に 何を する? いつ ねる?',
    example: 'Before bed, I read a book for 20 minutes. Then I brush my teeth and say good night to my family. I usually sleep at 9 p.m.'
  },
  {
    id: 26,
    cat: '🎨 興味',
    title: 'New Interest',
    titleJa: '新しい きょうみ',
    prompt: 'Is there something you want to start doing? Why?',
    promptJa: '何か 始めたい ことが ありますか? なぜ?',
    example: 'I want to start playing the guitar. I think it is a cool instrument. I hope to play my favorite songs someday.'
  },
  {
    id: 27,
    cat: '🌈 思い出',
    title: 'Best Memory',
    titleJa: '楽しい 思い出',
    prompt: 'What is one of your best memories? Describe it.',
    promptJa: '楽しい 思い出を 一つ 説明しよう。',
    example: 'One of my best memories is going to Disneyland. I rode many exciting rides with my family. We took lots of pictures together.'
  },
  {
    id: 28,
    cat: '💪 がんばり',
    title: 'Hard Work',
    titleJa: 'がんばっている こと',
    prompt: 'What are you working hard at right now?',
    promptJa: '今 がんばって いる ことは?',
    example: 'I am working hard at English. I study new words every day. I want to be able to speak with foreign friends.'
  },
  {
    id: 29,
    cat: '🙏 感謝',
    title: 'Thanks',
    titleJa: '感謝',
    prompt: 'Who or what are you thankful for?',
    promptJa: 'だれ・何に 感謝 していますか?',
    example: 'I am thankful for my family. They always support me. I love them very much.'
  },
  {
    id: 30,
    cat: '🌟 自分',
    title: 'About Me',
    titleJa: '自分の こと',
    prompt: 'Describe yourself in 3 sentences. What kind of person are you?',
    promptJa: '自分を 3文 で 説明しよう。 どんな 人ですか?',
    example: 'I am a curious and friendly person. I love learning new things. My friends say I am always smiling.'
  }
];
