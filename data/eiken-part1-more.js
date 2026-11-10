/* data/eiken-part1-more.js — 大問1 追加 (2級 +60) と 準1級 大問1 (60問)
 * すべて オリジナル問題 (英検の 過去問では ありません)。answer は 常に 0 (表示時に シャッフル)
 * 形式: [問題文, [正解, 誤1, 誤2, 誤3], 日本語訳, 解説, タグ]
 */
(function () {
  const mk = a => ({ q: a[0], options: a[1], answer: 0, ja: a[2], exp: a[3], tag: a[4] });
  const G2 = [
    ['The museum will ( ) a special exhibition of ancient Egyptian art next month.', ['host', 'hire', 'hang', 'hurt'], 'その博物館は 来月、古代エジプト美術の 特別展を 開催する。', 'host = (行事を) 主催する・開く', '語彙'],
    ['Mike suddenly ( ) that he had left his passport at home, so he went back to get it.', ['realized', 'rejected', 'removed', 'recorded'], 'マイクは パスポートを 家に 忘れたことに 突然 気づき、取りに もどった。', 'realize that 〜 = 〜だと 気づく', '語彙'],
    ['The company had to ( ) its plan to open a new store because of the bad economy.', ['postpone', 'polish', 'pronounce', 'provide'], '景気が 悪いため、その会社は 新店舗の 計画を 延期しなければ ならなかった。', 'postpone = 延期する (= put off)', '語彙'],
    ['Before you sign the contract, please read the ( ) carefully.', ['conditions', 'conversations', 'concerts', 'contests'], '契約書に サインする前に、条件を よく 読んでください。', 'condition = 条件 (契約の terms and conditions)', '語彙'],
    ['The doctor told Mr. Tanaka to ( ) eating salty food to keep his blood pressure low.', ['avoid', 'allow', 'admire', 'arrive'], '医者は 田中さんに 血圧を 低く 保つため 塩辛い 食べ物を 避けるよう 言った。', 'avoid 〜ing = 〜するのを 避ける (to不定詞は 取らない)', '語彙'],
    ['The new smartphone is very popular because it is light and easy to ( ).', ['carry', 'copy', 'cancel', 'chase'], 'その新しい スマホは 軽くて 持ち運びやすいので とても 人気だ。', 'easy to carry = 持ち運びやすい', '語彙'],
    ['Lisa practiced the piano every day, and her ( ) paid off when she won first prize.', ['effort', 'error', 'edge', 'escape'], 'リサは 毎日 ピアノを 練習し、1位を 取って 努力が 報われた。', 'effort = 努力 / pay off = 報われる', '語彙'],
    ['The hotel staff were very ( ) and answered all of our questions kindly.', ['helpful', 'harmful', 'hopeless', 'homeless'], 'ホテルの スタッフは とても 親切で、質問に すべて 丁寧に 答えてくれた。', 'helpful = 役に立つ・親切な ⇔ harmful 有害な', '語彙'],
    ['The city is trying to ( ) the number of cars downtown in order to cut air pollution.', ['limit', 'reveal', 'rescue', 'retire'], '市は 大気汚染を 減らすため、中心部の 車の 数を 制限しようと している。', 'limit = 制限する', '語彙'],
    ['Jack could not ( ) his excitement when he heard he had passed the exam.', ['hide', 'hire', 'heal', 'host'], 'ジャックは 試験に 合格したと 聞いて、興奮を 隠せなかった。', 'hide = 隠す (hide-hid-hidden)', '語彙'],
    ['The scientists\' ( ) shows that the new medicine works well for most patients.', ['research', 'receipt', 'rumor', 'rhythm'], '科学者たちの 研究は、新薬が ほとんどの 患者に よく 効くことを 示している。', 'research = 研究・調査', '語彙'],
    ['Our teacher ( ) us to read at least one English book every month.', ['encourages', 'enjoys', 'explains', 'escapes'], '先生は 毎月 少なくとも 1冊 英語の 本を 読むよう 私たちに すすめる。', 'encourage 人 to do = 人に 〜するよう 勧める・励ます', '語彙'],
    ['The bus was ( ) because of the heavy snow, so many students were late for school.', ['delayed', 'delivered', 'designed', 'divided'], '大雪で バスが 遅れ、多くの 生徒が 遅刻した。', 'be delayed = 遅れる', '語彙'],
    ['The restaurant is famous for its ( ) atmosphere, so many couples go there on special days.', ['romantic', 'rapid', 'rural', 'rough'], 'その店は ロマンチックな 雰囲気で 有名で、特別な 日に 多くの カップルが 行く。', 'romantic atmosphere = ロマンチックな 雰囲気', '語彙'],
    ['In Japan, wearing a helmet on a motorcycle is ( ) by law.', ['required', 'retired', 'repaired', 'reflected'], '日本では バイクで ヘルメットを かぶることが 法律で 義務づけられている。', 'be required by law = 法律で 義務づけられている', '語彙'],
    ['My sister and I have ( ) tastes in music, so we often go to concerts together.', ['similar', 'single', 'sudden', 'silent'], '姉と 私は 音楽の 好みが 似ているので、よく いっしょに コンサートに 行く。', 'similar = 似ている (be similar to 〜)', '語彙'],
    ['The library has a large ( ) of books about local history.', ['collection', 'connection', 'correction', 'competition'], 'その図書館には 郷土史の 本の 大きな コレクションが ある。', 'collection = 収集物・蔵書', '語彙'],
    ['The climbers had to ( ) to the bottom of the mountain because a storm was coming.', ['return', 'refuse', 'remind', 'reply'], '嵐が 近づいていたので、登山者たちは ふもとに もどらなければ ならなかった。', 'return to 〜 = 〜に もどる', '語彙'],
    ['Sarah felt ( ) after running ten kilometers, so she lay down on the sofa.', ['exhausted', 'expensive', 'exact', 'external'], 'サラは 10キロ 走って くたくたで、ソファに 横になった。', 'exhausted = へとへとに 疲れた', '語彙'],
    ['The factory ( ) about 500 cars a day.', ['produces', 'protects', 'proposes', 'punishes'], 'その工場は 1日に 約500台の 車を 生産する。', 'produce = 生産する', '語彙'],
    ['The manager asked all employees to ( ) their reports by Friday.', ['submit', 'survive', 'suggest', 'suppose'], '部長は 全社員に 金曜までに 報告書を 提出するよう 求めた。', 'submit = 提出する (= hand in)', '語彙'],
    ['The final ( ) of the soccer match was 3-2, and our team won.', ['score', 'scene', 'scale', 'shape'], 'サッカーの 試合の 最終スコアは 3対2で、私たちの チームが 勝った。', 'score = 得点・スコア', '語彙'],
    ['Paul has a good ( ) of humor, so everyone enjoys talking with him.', ['sense', 'sign', 'sight', 'scent'], 'ポールは ユーモアの センスが あるので、みんな 彼との 話を 楽しむ。', 'a sense of humor = ユーモアの センス', '語彙'],
    ['The island is ( ) for its beautiful beaches and clear blue sea.', ['famous', 'familiar', 'faithful', 'frequent'], 'その島は 美しい 浜辺と 澄んだ 青い 海で 有名だ。', 'be famous for 〜 = 〜で 有名だ (familiar は with/to)', '語彙'],
    ['Ms. Brown ( ) her son for breaking the window, but later she forgave him.', ['scolded', 'scored', 'scattered', 'searched'], 'ブラウンさんは 窓を 割った 息子を しかったが、あとで 許した。', 'scold 人 for 〜 = 〜のことで 人を しかる', '語彙'],
    ['Because of a ( ) of rain, the rice farmers in the area are worried about this year\'s harvest.', ['lack', 'luck', 'load', 'lane'], '雨不足のため、その地域の 米農家は 今年の 収穫を 心配している。', 'lack of 〜 = 〜の 不足', '語彙'],
    ['The company ( ) a new manager from another country.', ['hired', 'heated', 'healed', 'hugged'], 'その会社は 外国から 新しい 部長を 雇った。', 'hire = 雇う (= employ)', '語彙'],
    ['The scientist made an important ( ) about how birds find their way home.', ['discovery', 'decoration', 'delivery', 'departure'], 'その科学者は 鳥が どうやって 巣に 帰る道を 見つけるかに ついて 重要な 発見を した。', 'make a discovery = 発見を する', '語彙'],
    ['The weather forecast says it will be cloudy, but there is a ( ) chance of rain in the evening.', ['slight', 'steep', 'strict', 'stiff'], '天気予報では くもりだが、夕方に わずかに 雨の 可能性が ある。', 'slight = わずかな', '語彙'],
    ['The children were ( ) to see the dolphins jumping out of the water.', ['thrilled', 'thrown', 'threatened', 'trusted'], '子どもたちは イルカが 水から 跳ねるのを 見て 大興奮だった。', 'be thrilled to do = 〜して わくわくする', '語彙'],
    ['Tom ( ) to his friend for being late and promised to be on time next time.', ['apologized', 'appeared', 'applied', 'approved'], 'トムは 遅れたことを 友だちに 謝り、次は 時間を 守ると 約束した。', 'apologize to 人 for 〜 = 〜のことで 人に 謝る', '語彙'],
    ['The volunteers collected ( ) such as plastic bottles and cans from the beach.', ['garbage', 'gardens', 'guests', 'grades'], 'ボランティアは 浜辺から ペットボトルや 缶などの ごみを 集めた。', 'garbage = ごみ (= trash)', '語彙'],
    ['The singer\'s new song became ( ) all over the world in just a few weeks.', ['popular', 'polite', 'private', 'patient'], 'その歌手の 新曲は わずか 数週間で 世界中で 人気に なった。', 'popular = 人気のある', '語彙'],
    ['The police are still trying to find out the ( ) of the fire.', ['cause', 'case', 'care', 'cave'], '警察は まだ 火事の 原因を 調べようと している。', 'cause = 原因', '語彙'],
    ['Kate is ( ) at math, so her classmates often ask her for help.', ['excellent', 'expensive', 'extra', 'empty'], 'ケイトは 数学が とても 得意なので、クラスメートが よく 助けを 求める。', 'be excellent at 〜 = 〜が とても 得意', '語彙'],
    ['The town ( ) a festival every summer to celebrate the end of the rice planting season.', ['holds', 'hits', 'hangs', 'hates'], 'その町は 田植えの 終わりを 祝って 毎夏 祭りを 開く。', 'hold a festival = 祭りを 開催する', '語彙'],
    ['The ( ) from the hotel room was so beautiful that we took many photos from our window.', ['view', 'voice', 'vote', 'visit'], 'ホテルの 部屋からの 眺めが とても 美しく、窓から たくさん 写真を 撮った。', 'view = 眺め・景色', '語彙'],
    ['My father ( ) a lot of money by working at a bank for 30 years.', ['saved', 'served', 'solved', 'sailed'], '父は 30年 銀行で 働いて たくさん お金を ためた。', 'save money = お金を ためる', '語彙'],
    ['If you want more ( ) about the event, please visit our website.', ['details', 'debts', 'diets', 'doubts'], 'イベントの 詳細を 知りたい 方は ウェブサイトを ご覧ください。', 'details = 詳細', '語彙'],
    ['The new library will be ( ) to the public next spring.', ['open', 'equal', 'eager', 'empty'], '新しい 図書館は 来春 一般に 公開される。', 'be open to the public = 一般に 公開される', '語彙'],
    // ---------- 熟語 ----------
    ['Ken ( ) the word in the dictionary because he did not know its meaning.', ['looked up', 'looked after', 'looked out', 'looked over'], 'ケンは 意味が わからなかったので、その単語を 辞書で 調べた。', 'look up = (辞書などで) 調べる', '熟語'],
    ['You should ( ) your old clothes instead of throwing them away. Someone else may need them.', ['give away', 'give up', 'give in', 'give off'], '古い 服は 捨てずに 人に あげた ほうが いい。だれかが 必要と するかも。', 'give away = ただで あげる', '熟語'],
    ['Mary ( ) a cold last week, so she stayed home for three days.', ['came down with', 'came across', 'came up with', 'came out of'], 'メアリーは 先週 かぜを ひいて、3日間 家に いた。', 'come down with 〜 = (病気) に かかる', '熟語'],
    ['The fire alarm ( ) suddenly, and everyone left the building.', ['went off', 'went on', 'went over', 'went by'], '火災報知器が 突然 鳴り、みんな 建物から 出た。', 'go off = (警報などが) 鳴る', '熟語'],
    ['My grandmother ( ) me when my parents were working abroad.', ['brought up', 'brought out', 'brought back', 'brought in'], '両親が 海外で 働いていた とき、祖母が 私を 育てた。', 'bring up = 育てる (= raise)', '熟語'],
    ['Don\'t worry. I\'ll ( ) your cat while you are on vacation.', ['take care of', 'take part in', 'take pride in', 'take advantage of'], '心配しないで。休暇中は 私が 猫の 世話を するよ。', 'take care of 〜 = 〜の 世話を する', '熟語'],
    ['Kevin is ( ) speaking in front of many people, so he was not nervous during his speech.', ['used to', 'about to', 'due to', 'close to'], 'ケビンは 大勢の 前で 話すのに 慣れているので、スピーチ中も 緊張しなかった。', 'be used to 〜ing = 〜するのに 慣れている', '熟語'],
    ['The new traffic rule will ( ) on April 1.', ['come into effect', 'come to an end', 'come to mind', 'come into view'], '新しい 交通ルールは 4月1日に 施行される。', 'come into effect = (法律などが) 効力を 持つ・施行される', '熟語'],
    ['( ) his hard work, Tom was chosen as the team leader.', ['Thanks to', 'In case of', 'Instead of', 'Apart from'], '努力の おかげで、トムは チームリーダーに 選ばれた。', 'thanks to 〜 = 〜の おかげで', '熟語'],
    ['The singer finally ( ) at the party an hour late.', ['showed up', 'gave up', 'held up', 'used up'], 'その歌手は 1時間 遅れて やっと パーティーに 現れた。', 'show up = 現れる (= appear)', '熟語'],
    ['You should ( ) your mistakes so that you don\'t make them again.', ['learn from', 'hear from', 'suffer from', 'differ from'], '同じ まちがいを しないよう、失敗から 学ぶべきだ。', 'learn from 〜 = 〜から 学ぶ', '熟語'],
    ['The company ( ) 100 workers because sales were falling.', ['laid off', 'laid out', 'laid down', 'laid aside'], '売上が 落ちていたので、その会社は 100人を 解雇した。', 'lay off = (一時) 解雇する', '熟語'],
    // ---------- 文法 ----------
    ['If I ( ) more money, I would buy a new bike.', ['had', 'have', 'will have', 'had had'], 'もし もっと お金が あれば、新しい 自転車を 買うのに。', '仮定法過去: If + 過去形, would + 動詞の原形', '文法'],
    ['I\'m not used to ( ) up so early.', ['getting', 'get', 'got', 'have got'], '私は そんなに 早く 起きるのに 慣れていない。', 'be used to の to は 前置詞 → 〜ing', '文法'],
    ['( ) from the top of the tower, the city looks like a toy town.', ['Seen', 'Seeing', 'To see', 'Saw'], 'タワーの 上から 見ると、街は おもちゃの 町の ように 見える。', '分詞構文: 街は 「見られる」側 → 過去分詞 Seen', '文法'],
    ['It is important for students ( ) enough sleep.', ['to get', 'getting', 'got', 'get'], '生徒が 十分な 睡眠を とることは 大切だ。', 'It is 形容詞 for 人 to do', '文法'],
    ['Neither Tom ( ) his sister likes spicy food.', ['nor', 'or', 'but', 'and'], 'トムも 妹も 辛い 食べ物が 好きではない。', 'neither A nor B = A も B も 〜ない', '文法'],
    ['I wish I ( ) speak French as well as you.', ['could', 'can', 'will', 'have'], 'あなたのように フランス語が 話せたら いいのに。', 'I wish + 仮定法過去 (could)', '文法'],
    ['The letter ( ) last week has not arrived yet.', ['sent', 'sending', 'to send', 'sends'], '先週 送られた 手紙は まだ 届いていない。', '「送られた」手紙 → 過去分詞の 後置修飾', '文法'],
    ['Not only Mary but also her brothers ( ) good at swimming.', ['are', 'is', 'be', 'being'], 'メアリーだけでなく 兄弟たちも 水泳が 得意だ。', 'not only A but also B の 動詞は B に 合わせる', '文法'],
  ];
  const P1 = [
    ['The politician\'s speech was so ( ) that nobody could understand what he actually wanted to do.', ['ambiguous', 'abundant', 'authentic', 'arrogant'], 'その政治家の 演説は あまりに 曖昧で、実際に 何を したいのか だれにも わからなかった。', 'ambiguous = 曖昧な', '語彙'],
    ['After years of drought, the once ( ) farmland had turned into a desert.', ['fertile', 'futile', 'feeble', 'frantic'], '何年もの 干ばつで、かつて 肥沃だった 農地は 砂漠に なっていた。', 'fertile = 肥沃な ⇔ barren 不毛の', '語彙'],
    ['The company was forced to ( ) its expansion plans after profits fell sharply.', ['curtail', 'cultivate', 'confide', 'convene'], '利益が 急落し、その会社は 拡大計画を 縮小せざるを 得なかった。', 'curtail = 削減する・縮小する', '語彙'],
    ['The witness\'s statement ( ) the suspect\'s claim that he had been at home all night.', ['contradicted', 'contemplated', 'commemorated', 'congratulated'], '目撃者の 証言は 一晩中 家に いたという 容疑者の 主張と 矛盾していた。', 'contradict = 〜と 矛盾する・否定する', '語彙'],
    ['The new manager tried to ( ) a sense of teamwork among the employees.', ['foster', 'falter', 'flinch', 'fumble'], '新しい 部長は 社員の あいだに チームワークの 意識を 育てようと した。', 'foster = 育む・促進する', '語彙'],
    ['Scientists are working to ( ) the disease, which has killed thousands of people.', ['eradicate', 'evaporate', 'elaborate', 'emancipate'], '科学者たちは 何千人もの 命を 奪った その病気を 根絶しようと している。', 'eradicate = 根絶する', '語彙'],
    ['The professor gave a ( ) explanation that covered every aspect of the theory.', ['comprehensive', 'compulsive', 'conspicuous', 'contagious'], '教授は その理論の あらゆる 側面を 網羅した 包括的な 説明を した。', 'comprehensive = 包括的な', '語彙'],
    ['Although the evidence was only ( ), the jury found him guilty.', ['circumstantial', 'ceremonial', 'congenial', 'cordial'], '証拠は 状況証拠に すぎなかったが、陪審は 彼を 有罪と した。', 'circumstantial evidence = 状況証拠', '語彙'],
    ['The government introduced ( ) rules on food imports to protect public health.', ['stringent', 'stagnant', 'strident', 'sparse'], '政府は 公衆衛生を 守るため 食品輸入に 厳しい 規則を 導入した。', 'stringent = (規則が) 厳しい', '語彙'],
    ['The heavy rain ( ) the rescue workers\' efforts to reach the village.', ['hampered', 'harvested', 'harnessed', 'haunted'], '大雨が 村に たどり着こうと する 救助隊の 努力を 妨げた。', 'hamper = 妨げる (= hinder)', '語彙'],
    ['The new policy was met with fierce ( ) from local residents.', ['opposition', 'obligation', 'observation', 'occupation'], '新しい 政策は 地元住民の 激しい 反対に あった。', 'be met with opposition = 反対に あう', '語彙'],
    ['The athlete\'s ( ) to training every day was the secret of his success.', ['commitment', 'commodity', 'compartment', 'complement'], '毎日 練習に 打ち込んだことが その選手の 成功の 秘訣だった。', 'commitment = 献身・打ち込むこと', '語彙'],
    ['Many voters are ( ) about the promise to lower taxes, since similar promises have been broken before.', ['skeptical', 'sentimental', 'superficial', 'spontaneous'], '以前にも 同様の 約束が 破られたので、多くの 有権者は 減税の 約束に 懐疑的だ。', 'skeptical = 懐疑的な', '語彙'],
    ['The CEO decided to ( ) after the scandal became public.', ['resign', 'resent', 'reside', 'resume'], 'スキャンダルが 公に なり、CEOは 辞任を 決めた。', 'resign = 辞任する (= step down)', '語彙'],
    ['The vase is extremely ( ), so please handle it with great care.', ['fragile', 'frugal', 'fluent', 'fervent'], 'その花瓶は とても 壊れやすいので、細心の 注意を 払って 扱ってください。', 'fragile = 壊れやすい', '語彙'],
    ['The doctor ( ) a medicine to help her sleep better.', ['prescribed', 'proscribed', 'presumed', 'persisted'], '医者は 彼女が よく 眠れるよう 薬を 処方した。', 'prescribe = 処方する (proscribe = 禁止する)', '語彙'],
    ['Economists warn that a recession is ( ) unless the government acts quickly.', ['imminent', 'immense', 'immune', 'impartial'], '経済学者は 政府が すぐに 動かなければ 不況が 差し迫っていると 警告する。', 'imminent = 差し迫った', '語彙'],
    ['The two countries finally reached a ( ) after months of negotiations.', ['compromise', 'compulsion', 'composure', 'compliment'], '何か月もの 交渉の 末、両国は ついに 妥協点に 達した。', 'reach a compromise = 妥協に 達する', '語彙'],
    ['The novelist is known for her ( ) descriptions of everyday life.', ['vivid', 'vain', 'vacant', 'vulgar'], 'その小説家は 日常生活の 生き生きとした 描写で 知られている。', 'vivid = 生き生きとした・鮮やかな', '語彙'],
    ['The company\'s profits ( ) after it launched its popular new product.', ['soared', 'soaked', 'soothed', 'sobbed'], '人気の 新商品を 発売してから、その会社の 利益は 急上昇した。', 'soar = 急上昇する', '語彙'],
    ['Despite his ( ) background, he became one of the richest men in the country.', ['humble', 'hostile', 'hollow', 'hasty'], '貧しい 生まれにも かかわらず、彼は 国で 有数の 富豪に なった。', 'humble = 質素な・身分の 低い / 謙虚な', '語彙'],
    ['The teacher tried to ( ) the argument between the two students before it turned into a fight.', ['defuse', 'deform', 'defer', 'deduce'], '先生は けんかに なる前に 2人の 口論を しずめようと した。', 'defuse = (緊張・危機を) 和らげる', '語彙'],
    ['Smoking is ( ) in all public buildings in this city.', ['prohibited', 'prolonged', 'promoted', 'proclaimed'], 'この市では すべての 公共の 建物で 喫煙が 禁止されている。', 'prohibit = 禁止する', '語彙'],
    ['The report ( ) that the factory had been polluting the river for years.', ['revealed', 'revolved', 'revived', 'revered'], '報告書は その工場が 何年も 川を 汚染していたことを 明らかに した。', 'reveal = 明らかに する', '語彙'],
    ['Her ( ) work made her an excellent editor; she never missed a single mistake.', ['meticulous', 'mischievous', 'miserable', 'monotonous'], '彼女の 細心の 仕事ぶりは 優秀な 編集者の 証で、ミスを 一つも 見逃さなかった。', 'meticulous = 細心の・几帳面な', '語彙'],
    ['The government provides ( ) to farmers to help them survive bad harvests.', ['subsidies', 'subsidiaries', 'substitutes', 'subscriptions'], '政府は 不作を 乗り切れるよう 農家に 補助金を 出している。', 'subsidy = 補助金 (subsidiary = 子会社)', '語彙'],
    ['The volcano has been ( ) for over 200 years, but scientists say it could erupt again.', ['dormant', 'dominant', 'docile', 'durable'], 'その火山は 200年以上 休んでいるが、再び 噴火しうると 科学者は 言う。', 'dormant = 休止中の', '語彙'],
    ['The negotiations ended in ( ) when neither side was willing to make concessions.', ['deadlock', 'deadline', 'debris', 'decree'], 'どちらも 譲歩しようと せず、交渉は 行き詰まりに 終わった。', 'deadlock = 行き詰まり', '語彙'],
    ['His ( ) remarks about his colleagues made him very unpopular in the office.', ['derogatory', 'dormant', 'diligent', 'dexterous'], '同僚への 見下した 発言で、彼は 職場で とても 嫌われた。', 'derogatory = 軽蔑的な', '語彙'],
    ['The disease spread rapidly in the ( ) refugee camps.', ['overcrowded', 'overdue', 'overt', 'overlooked'], 'その病気は 過密した 難民キャンプで 急速に 広がった。', 'overcrowded = 過密の', '語彙'],
    ['The scientist\'s theory was ( ) by a series of careful experiments.', ['verified', 'ventilated', 'vaccinated', 'varnished'], 'その科学者の 理論は 一連の 慎重な 実験で 実証された。', 'verify = 検証する・実証する', '語彙'],
    ['The company has been accused of ( ) its customers by charging hidden fees.', ['deceiving', 'deceasing', 'decaying', 'declining'], 'その会社は 隠れた 手数料で 客を だましたと 非難されている。', 'deceive = だます', '語彙'],
    ['The famous chef is ( ) for his bad temper as much as for his cooking.', ['notorious', 'nutritious', 'numerous', 'nocturnal'], 'その有名シェフは 料理と 同じくらい 短気でも 悪名高い。', 'notorious = 悪名高い', '語彙'],
    ['The heavy snow ( ) traffic in the northern part of the country.', ['paralyzed', 'paraphrased', 'patronized', 'pacified'], '大雪で 国の 北部の 交通が まひした。', 'paralyze = まひさせる', '語彙'],
    ['The athlete was ( ) from the competition after failing a drug test.', ['disqualified', 'dismantled', 'disclosed', 'dispersed'], 'その選手は 薬物検査に ひっかかり 大会で 失格に なった。', 'disqualify = 失格に する', '語彙'],
    ['Investors were ( ) to put money into such a risky project.', ['reluctant', 'relevant', 'redundant', 'resilient'], '投資家たちは そんな 危険な 計画に お金を 出すのを 渋った。', 'be reluctant to do = 〜するのに 気が 進まない', '語彙'],
    ['The building\'s ( ) design won several international awards.', ['innovative', 'inquisitive', 'intrusive', 'invasive'], 'その建物の 革新的な デザインは いくつもの 国際賞を 取った。', 'innovative = 革新的な', '語彙'],
    ['The hungry children ( ) the sandwiches in a few minutes.', ['devoured', 'devoted', 'deviated', 'devised'], 'お腹を すかせた 子どもたちは 数分で サンドイッチを たいらげた。', 'devour = むさぼり 食う', '語彙'],
    ['The judge ordered the company to ( ) the workers for the injuries they suffered.', ['compensate', 'compile', 'comply', 'conceive'], '裁判官は 労働者の けがに 対し 補償するよう 会社に 命じた。', 'compensate 人 for 〜 = 〜について 人に 補償する', '語彙'],
    ['The new bypass is expected to ( ) traffic congestion in the town center.', ['alleviate', 'allocate', 'alienate', 'allure'], '新しい バイパスは 町の 中心部の 渋滞を 緩和すると 期待されている。', 'alleviate = 緩和する', '語彙'],
    ['The lecture was so ( ) that several students fell asleep.', ['tedious', 'tenacious', 'tentative', 'tremendous'], '講義が あまりに 退屈で、何人かの 学生が 眠ってしまった。', 'tedious = 退屈な・うんざりする', '語彙'],
    ['The country\'s economy is heavily ( ) on tourism.', ['dependent', 'decent', 'dormant', 'dense'], 'その国の 経済は 観光に 大きく 依存している。', 'be dependent on 〜 = 〜に 依存している', '語彙'],
    ['Some critics ( ) that the movie was too violent for children.', ['contended', 'contained', 'contrived', 'condensed'], '一部の 批評家は その映画は 子どもには 暴力的すぎると 主張した。', 'contend that 〜 = 〜と 主張する', '語彙'],
    ['The new evidence ( ) doubt on the official explanation of the accident.', ['cast', 'cost', 'caught', 'cut'], '新しい 証拠は 事故の 公式説明に 疑問を 投げかけた。', 'cast doubt on 〜 = 〜に 疑問を 投げかける', '語彙'],
    ['The manager ( ) the importance of safety at every meeting.', ['stressed', 'stretched', 'strained', 'striped'], '部長は 毎回の 会議で 安全の 重要性を 強調した。', 'stress = 強調する (= emphasize)', '語彙'],
    // ---------- 熟語 ----------
    ['The old factory will be ( ) to make way for a new shopping mall.', ['torn down', 'turned down', 'toned down', 'tied down'], '新しい ショッピングモールの ため、古い 工場は 取り壊される。', 'tear down = 取り壊す', '熟語'],
    ['The police are still trying to ( ) what caused the explosion.', ['figure out', 'carry out', 'wear out', 'stand out'], '警察は 爆発の 原因を まだ 解明しようと している。', 'figure out = 解明する・理解する', '熟語'],
    ['It took the company years to ( ) its huge debts.', ['pay off', 'lay off', 'see off', 'set off'], 'その会社が 巨額の 借金を 完済するのに 何年も かかった。', 'pay off = (借金を) 完済する', '熟語'],
    ['Experts have ( ) the possibility that the fire was started on purpose.', ['ruled out', 'ruled over', 'run out', 'rolled out'], '専門家は 放火の 可能性を 排除した。', 'rule out = 除外する', '熟語'],
    ['The newly found letters ( ) the writer\'s secret life.', ['shed light on', 'made light of', 'set fire to', 'kept track of'], '新たに 見つかった 手紙が その作家の 秘密の 生活を 明らかに した。', 'shed light on 〜 = 〜を 解明する', '熟語'],
    ['Many people find it hard to ( ) the loss of a pet.', ['come to terms with', 'come up with', 'catch up with', 'keep up with'], 'ペットを 失ったことを 受け入れるのは 多くの 人に とって 難しい。', 'come to terms with 〜 = 〜を (あきらめて) 受け入れる', '熟語'],
    ['The government plans to ( ) coal power plants over the next 20 years.', ['phase out', 'back up', 'pick up', 'hand down'], '政府は 今後20年で 石炭火力発電所を 段階的に 廃止する 計画だ。', 'phase out = 段階的に 廃止する', '熟語'],
    ['The success of the project ( ) the support of local residents.', ['hinges on', 'hangs up', 'hands over', 'heads for'], '計画の 成否は 地元住民の 支持 しだいだ。', 'hinge on 〜 = 〜 しだいである', '熟語'],
    ['The vice president will ( ) the company when the current president retires next month.', ['take over', 'take after', 'take apart', 'take back'], '来月 社長が 引退すると、副社長が 会社を 引き継ぐ。', 'take over = 引き継ぐ', '熟語'],
    ['The new restaurant did not ( ) its reputation; the food was quite ordinary.', ['live up to', 'look up to', 'make up for', 'get away with'], '新しい レストランは 評判ほどでは なく、料理は ごく 普通だった。', 'live up to 〜 = (期待・評判) に こたえる', '熟語'],
    ['The two small companies decided to ( ) to compete with their larger rival.', ['join forces', 'lose touch', 'break even', 'call it a day'], '2つの 小さな 会社は 大手に 対抗するため 手を 組むことに した。', 'join forces = 協力する・手を 組む', '熟語'],
    ['Our budget is limited, so we have to ( ) unnecessary expenses.', ['cut back on', 'look back on', 'fall back on', 'turn back on'], '予算が 限られているので、不要な 出費を 減らさなければ ならない。', 'cut back on 〜 = 〜を 減らす', '熟語'],
    ['The scandal eventually ( ) the minister\'s resignation.', ['led to', 'lived on', 'lay in', 'looked into'], 'そのスキャンダルが 結局 大臣の 辞任に つながった。', 'lead to 〜 = 〜に つながる', '熟語'],
    ['After hours of questioning, the suspect finally ( ) the pressure and confessed.', ['gave in to', 'gave out', 'gave off', 'gave away'], '何時間もの 取り調べの 末、容疑者は ついに 圧力に 屈して 自白した。', 'give in to 〜 = 〜に 屈する', '熟語'],
    ['Visitors are asked to ( ) the museum rules at all times.', ['abide by', 'stand by', 'drop by', 'pass by'], '来館者は 常に 博物館の 規則を 守るよう 求められる。', 'abide by 〜 = (規則) に 従う', '熟語'],
  ];
  if (typeof EIKEN_G2_PART1 !== 'undefined') G2.forEach(a => EIKEN_G2_PART1.push(mk(a)));
  window.EIKEN_P1_PART1 = P1.map(mk);
  // 문제은행 파일 (data/eiken-bank-*.js) 용: 'タグ|問題文|正解|誤1|誤2|誤3|日本語訳|解説'
  window.EIKEN_ADD = function (level, rows) {
    const T = { v: '語彙', n: '語彙', a: '語彙', i: '熟語', g: '文法' };
    const dst = level === 'p1' ? window.EIKEN_P1_PART1 : EIKEN_G2_PART1;
    rows.forEach(r => { const a = r.split('|'); if (a.length !== 8) { console.warn('EIKEN_ADD bad row', r); return; }
      dst.push({ q: a[1], options: [a[2], a[3], a[4], a[5]], answer: 0, ja: a[6], exp: a[7], tag: T[a[0]] || a[0] }); });
  };
  // リスニング: 'part|W:台詞~M:台詞~N:ナレーション|質問|正解|誤1|誤2|誤3|解説'
  window.EIKEN_ADD_LISTEN = function (level, rows) {
    const name = level === 'p1' ? 'EIKEN_P1_LISTEN' : 'EIKEN_G2_LISTEN';
    const dst = level === 'p1' ? (window.EIKEN_P1_LISTEN = window.EIKEN_P1_LISTEN || []) : EIKEN_G2_LISTEN;
    // 1지문 복수설문: 'part|lines|Q1|正解|誤|誤|誤|解説|Q2|正解|誤|誤|誤|解説'
    rows.forEach(r => { const a = r.split('|'); if (a.length < 8 || (a.length - 2) % 6) { console.warn('EIKEN_ADD_LISTEN bad row', r); return; }
      const lines = a[1].split('~').map(l => { const m = l.match(/^([WMN]):\s*(.*)$/); return m ? [m[1], m[2]] : ['N', l]; });
      const qs = []; for (let i = 2; i < a.length; i += 6) qs.push({ q: a[i], options: [a[i + 1], a[i + 2], a[i + 3], a[i + 4]], answer: 0, exp: a[i + 5] });
      const it = { part: +a[0], lines: lines, q: qs[0].q, options: qs[0].options, answer: 0, exp: qs[0].exp };
      if (qs.length > 1) it.qs = qs;
      dst.push(it); });
  };
  window.EIKEN_P1_READING = window.EIKEN_P1_READING || [];
  window.EIKEN_P1_WRITE = window.EIKEN_P1_WRITE || [];
})();
