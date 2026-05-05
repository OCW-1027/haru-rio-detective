/* stories.js — extracted from index.html (v73 step3)
 * Original locations: lines 435, 438-848, 851-853, 856-869 (current index.html)
 * Contents: SCENES (alias), NEW_STORY_1_5, NEW_STORY_6_10, NEW_ENG_MYSTERY_STORIES, NEW_STORY_11_15, STORY (composite), EXTRA_STORIES, ENG_MYSTERY_STORIES (alias), EXTRA_SCENES
 */
const SCENES = NEW_SCENES;

// ============================================================
// STORY CHAPTERS
// ============================================================
// ============================================================
// STORY (おおたかの森 무대 - 1~5장)
// ============================================================
const NEW_STORY_1_5 = [
{
  id: 1, icon: '🏫', title: '校門の メッセージ', desc: 'ABCの あんごう',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'おおたかの森小学校。なつ休み 明けの ある日のあさ…', scene:'schoolGate', char:null },
    { speaker:'ハル', cls:'haru', text:'リオ、見て。校門に へんな かみが はってあるよ。', scene:'schoolGate', char:'left' },
    { speaker:'リオ', cls:'rio', text:'えっ、なに?「IFNXP」?読めないよ お兄ちゃん!', scene:'schoolGate', char:'both' },
    { speaker:'ハル', cls:'haru', text:'これは あんごうかも しれない。だれかが しのびこんだのかな…', scene:'schoolGate', char:'both' },
    { speaker:'リオ', cls:'rio', text:'なぞなぞ?ぼく、なぞなぞ だいすき!', scene:'schoolGate', char:'both' },
    { speaker:'ハル', cls:'haru', text:'よし、考えてみよう。', scene:'schoolGate', char:'both' },
  ],
  puzzle: { type:'caesar', shift:5, title:'🔍 校門の あんごう', hint:'アルファベットを 5つ前に もどそう (例: F→A)', cipherText:'IFNXP', answer:'DAISI', explanation:'IFNXP → DAISI 「だいじ」!何かが 大事だって 言ってる。' },
  outro: [
    { speaker:'ハル', cls:'haru', text:'「だいじ」=「大事」。何が 大事なんだろう…', scene:'schoolGate', char:'both' },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、つぎは どこ いく?', scene:'schoolGate', char:'both' },
    { speaker:'ハル', cls:'haru', text:'図書室に ヒントが あるかも。行ってみよう。', scene:'schoolGate', char:'both' },
  ],
  note: { title:'第1章 校門', desc:'校門に「だいじ」と書かれた紙。' },
},
{
  id: 2, icon: '📚', title: '図書室の 暗号本', desc: 'ぎゃくよみ あんごう',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'ふたりは 学校の 図書室へ 来た。', scene:'library', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん!ここにも 紙が あるよ!', scene:'library', char:'right' },
    { speaker:'ハル', cls:'haru', text:'「るぐすぱぺ」?…これは ひらがな の あんごうだね。', scene:'library', char:'both' },
    { speaker:'リオ', cls:'rio', text:'ひらがなの なぞなぞ?', scene:'library', char:'both' },
    { speaker:'ハル', cls:'haru', text:'うーん、何か 見覚えが あるけど…', scene:'library', char:'both' },
  ],
  puzzle: { type:'reverse', title:'🔍 図書室の あんごう', hint:'ひらがなを ぎゃくから 読もう!', cipherText:'るぐすぱぺ', answer:'ぺぱすぐる', explanation:'ぺぱすぐる →「ペーパー(紙)、すぐる(過ぎる)」 → 紙の下を見ろ!' },
  outro: [
    { speaker:'ハル', cls:'haru', text:'「紙の下」?あ、机の下に 何か あるよ!', scene:'library', char:'both' },
    { speaker:'リオ', cls:'rio', text:'わぁ!見つけた!「美術室へ」って 書いてある!', scene:'library', char:'both' },
    { speaker:'ハル', cls:'haru', text:'よし、美術室へ 行こう。', scene:'library', char:'both' },
  ],
  note: { title:'第2章 図書室', desc:'紙の下に「美術室へ」と書かれていた。' },
},
{
  id: 3, icon: '🎨', title: '美術室の 数字', desc: 'A=1 の あんごう',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'美術室の 絵の そばに 数字の メモが あった。', scene:'artRoom', char:null },
    { speaker:'リオ', cls:'rio', text:'「8 1 14 1」?ぜんぶ 数字!', scene:'artRoom', char:'right' },
    { speaker:'ハル', cls:'haru', text:'数字だけ…これも あんごうだね。', scene:'artRoom', char:'both' },
    { speaker:'リオ', cls:'rio', text:'数字の なぞなぞ、できるかな?', scene:'artRoom', char:'both' },
  ],
  puzzle: { type:'number', title:'🔍 美術室の 数字', hint:'A=1, B=2, C=3… 数字を アルファベットに!', cipherText:'8 1 14 1', answer:'HANA', explanation:'8=H, 1=A, 14=N, 1=A → HANA「花」!' },
  outro: [
    { speaker:'ハル', cls:'haru', text:'「HANA」=「花」!花瓶の 中を しらべよう。', scene:'artRoom', char:'both' },
    { speaker:'リオ', cls:'rio', text:'あった!かぎが 入ってるよ!「倉庫」って 書いてある!', scene:'artRoom', char:'both' },
  ],
  note: { title:'第3章 美術室', desc:'花瓶の中に「倉庫の鍵」が あった。' },
},
{
  id: 4, icon: '📦', title: '倉庫の 鍵あけ', desc: 'えと の あんごう',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'学校の 倉庫の とびらに、4桁の ダイヤル錠が ついていた。', scene:'warehouse', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、紙に 動物の 名前が 書いてあるよ!', scene:'warehouse', char:'right' },
    { speaker:'ハル', cls:'haru', text:'「うま、ね、とら、いぬ」…これは 動物の 名前だね。', scene:'warehouse', char:'both' },
    { speaker:'リオ', cls:'rio', text:'動物が ダイヤル錠と なんの かんけい?', scene:'warehouse', char:'both' },
    { speaker:'ハル', cls:'haru', text:'動物に 何か 番号が あるのかも。考えてみよう。', scene:'warehouse', char:'both' },
  ],
  puzzle: { type:'lock', title:'🔍 倉庫の ダイヤル錠', hint:'ね=1 うし=2 とら=3 う=4 たつ=5 み=6 うま=7 ひつじ=8 さる=9 とり=10 いぬ=11 い=12', cipherText:'🐎うま 🐭ね 🐯とら 🐶いぬ', answer:[7,1,3,11], explanation:'うま=7、ね=1、とら=3、いぬ=11!' },
  outro: [
    { speaker:'リオ', cls:'rio', text:'カチッ!開いた!すごい お兄ちゃん!', scene:'warehouse', char:'both' },
    { speaker:'ハル', cls:'haru', text:'中に メッセージが ある…「公園の 大きな木の 下で 待つ」って!', scene:'warehouse', char:'both' },
    { speaker:'リオ', cls:'rio', text:'こうえん!行こう お兄ちゃん!', scene:'warehouse', char:'both' },
  ],
  note: { title:'第4章 倉庫', desc:'倉庫から「公園の 大きな木の 下で 待つ」のメッセージ。' },
},
{
  id: 5, icon: '🌳', title: '公園の 真実', desc: '犯人を 当てろ!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'おおたかの森公園。夕方、3人の 容疑者が 大きな木の 下に いた。', scene:'park', char:null },
    { speaker:'ハル', cls:'haru', text:'これまでの あんごうを 思い出そう。', scene:'park', char:'left' },
    { speaker:'ハル', cls:'haru', text:'①「だいじ」 ②「紙の下に」 ③「花」=花瓶 ④「うま・ね・とら・いぬ」', scene:'park', char:'left' },
    { speaker:'リオ', cls:'rio', text:'うーん、ぜんぶ ばらばら…?', scene:'park', char:'both' },
    { speaker:'ハル', cls:'haru', text:'いや、つながりが あるはずだ。よく 見てみよう。', scene:'park', char:'both' },
    { speaker:'ハル', cls:'haru', text:'動物には 漢字も あるね。うま=午、ね=子、とら=寅、いぬ=戌。', scene:'park', char:'both' },
    { speaker:'リオ', cls:'rio', text:'おもしろい かんじ!でも どう つかうの?', scene:'park', char:'both' },
  ],
  puzzle: { type:'final', title:'🔍 真犯人を えらべ!', hint:'動物の 漢字には 時刻の 意味も ある。午=正午…', suspects:[
    { id:'yamada', name:'ヤマダさん', alibi:'12時は しょくいんしつで お昼ごはん', charKey:'yamada' },
    { id:'mystery', name:'見たことない人', alibi:'12時に 図書室で 本を 読んでた', charKey:'mystery', correct:true },
    { id:'mori', name:'モリ先生', alibi:'12時は 音楽室で じゅぎょう中', charKey:'mori' },
  ], explanation:'正解!見たことない人が 12時に 図書室にいた!\nあんごうは ぜんぶ 図書室から はじまったんだ!' },
  outro: [
    { speaker:'??? ', cls:'mystery', text:'うっ!ばれたか…!', scene:'park', char:'both' },
    { speaker:'ハル', cls:'haru', text:'手がかりは ぜんぶ そろっていた。', scene:'park', char:'both' },
    { speaker:'リオ', cls:'rio', text:'やった!お兄ちゃん すごい!', scene:'park', char:'both' },
    { speaker:'ハル', cls:'haru', text:'リオも よく がんばった。ふたりで 解いたんだ。', scene:'park', char:'both' },
    { speaker:'ナレーター', cls:'narrator', text:'― 第1部 完 ―\n5つの 暗号を 解いた!', scene:'park', char:null },
  ],
  note: { title:'第5章 公園', desc:'5つの 暗号を 全部 解いた!見たことない人が 犯人だった。' },
},
];


// ============================================================
// STORY 6~10장 + 영어추리 챕터 (おおたかの森 무대)
// ============================================================
const NEW_STORY_6_10 = [
{
  id: 6, icon: '🖼️', title: '美術館の 不思議', desc: '消えた絵を さがせ!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'よる、おおたかの森の 美術館。だいじな 絵が きえてしまった!', scene:'museum', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん!ここにも 何か 書いてあるよ!', scene:'museum', char:'right' },
    { speaker:'ハル', cls:'haru', text:'壁に 数字…「3-15-14-1-14」?', scene:'museum', char:'both' },
    { speaker:'リオ', cls:'rio', text:'これも 数字の あんごう?', scene:'museum', char:'both' },
    { speaker:'ハル', cls:'haru', text:'うん、見覚えが あるね…', scene:'museum', char:'both' },
  ],
  puzzle: { type:'number', title:'🔍 数字の メッセージ', hint:'A=1, B=2, C=3… 数字を アルファベットに!', cipherText:'3-15-14-1-14', answer:'CONAN', explanation:'3=C, 15=O, 14=N, 1=A, 14=N → CONAN!でも CONAN は…?' },
  outro: [
    { speaker:'リオ', cls:'rio', text:'CONAN?だれの こと?', scene:'museum', char:'both' },
    { speaker:'ハル', cls:'haru', text:'…たぶん だれかの 名前だ。犯人の サインかも しれない。', scene:'museum', char:'both' },
    { speaker:'リオ', cls:'rio', text:'こわい!でも 絵は もどってきたから よかった!', scene:'museum', char:'both' },
    { speaker:'ハル', cls:'haru', text:'またどこかで 会いそうだ。気を つけよう。', scene:'museum', char:'both' },
  ],
  note: { title:'第6章 美術館', desc:'数字の メッセージは「CONAN」だった。犯人の サイン?' },
},
{
  id: 7, icon: '🚂', title: '駅で 困ったおじいさん', desc: 'おじいさんを 助けよう!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'おおたかの森駅。おじいさんが こまっていた。', scene:'trainStation', char:null },
    { speaker:'親切なおじいさん', cls:'ojiisan', text:'すまない…メモを なくしてしまって、行き先が わからん…', scene:'trainStation', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、おじいさんを 助けよう!', scene:'trainStation', char:'right' },
    { speaker:'ハル', cls:'haru', text:'なくしたメモの コピーは ありますか?', scene:'trainStation', char:'both' },
    { speaker:'親切なおじいさん', cls:'ojiisan', text:'これだけ 残っとる…「あおうこ」って書いてあるが…', scene:'trainStation', char:null },
    { speaker:'ハル', cls:'haru', text:'…「あおうこ」?変な ことばですね。', scene:'trainStation', char:'both' },
    { speaker:'リオ', cls:'rio', text:'うーん、町の 名前かな?', scene:'trainStation', char:'both' },
  ],
  puzzle: { type:'reverse', title:'🔍 駅の メモ', hint:'ひらがなを ぎゃくから 読もう!', cipherText:'あおうこ', answer:'こうおあ', explanation:'ぎゃくに読むと「こうおあ」→「こうべ(神戸)」を あらわす!行き先は 神戸!' },
  outro: [
    { speaker:'ハル', cls:'haru', text:'おじいさん、行き先は 神戸ですね。', scene:'trainStation', char:'both' },
    { speaker:'親切なおじいさん', cls:'ojiisan', text:'おお!そうじゃ!ありがとう、ぼうやたち!', scene:'trainStation', char:null },
    { speaker:'リオ', cls:'rio', text:'よかったね、おじいさん!', scene:'trainStation', char:'both' },
  ],
  note: { title:'第7章 駅', desc:'おじいさんを 神戸行きの 列車に 案内した。' },
},
{
  id: 8, icon: '🌸', title: '花壇の タイムカプセル', desc: 'むかしの メッセージ',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'公園の 花壇に、小さな はこが うまっていた…', scene:'garden', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、なにこれ?たからもの?', scene:'garden', char:'right' },
    { speaker:'ハル', cls:'haru', text:'タイムカプセルみたいだね。むかしの 人が うめたのかも。', scene:'garden', char:'both' },
    { speaker:'ハル', cls:'haru', text:'手紙が 入ってる…でも あんごうで 書かれてる。「KHOOR」?', scene:'garden', char:'both' },
    { speaker:'リオ', cls:'rio', text:'また 英語の あんごう!', scene:'garden', char:'both' },
    { speaker:'ハル', cls:'haru', text:'1章の 暗号と にているね。考えてみよう。', scene:'garden', char:'both' },
  ],
  puzzle: { type:'caesar', shift:3, title:'🔍 花壇の 暗号', hint:'アルファベットを 3つ前に! (例: D→A)', cipherText:'KHOOR', answer:'HELLO', explanation:'K→H, H→E, O→L, O→L, R→O → HELLO「こんにちは」!10年前の こどもたちからの あいさつだ!' },
  outro: [
    { speaker:'リオ', cls:'rio', text:'「HELLO」!こんにちはって 意味だね!', scene:'garden', char:'both' },
    { speaker:'ハル', cls:'haru', text:'10年前の こどもたちからの あいさつだ。', scene:'garden', char:'both' },
    { speaker:'リオ', cls:'rio', text:'いつか ぼくたちも うめようよ!', scene:'garden', char:'both' },
  ],
  note: { title:'第8章 花壇', desc:'10年前の タイムカプセル。HELLOの あいさつ。' },
},
{
  id: 9, icon: '🏥', title: '病院の カルテ', desc: '消えた看護師さんを さがせ!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'おおたかの森の 病院で、看護師さんが ゆくえふめい!', scene:'hospital', char:null },
    { speaker:'タナカ先生', cls:'tanaka', text:'机の上に カルテと ダイヤル錠が おいてあるんだ…', scene:'hospital', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、カルテに 動物が いっぱい 書いてあるよ!', scene:'hospital', char:'right' },
    { speaker:'ハル', cls:'haru', text:'「いぬ・うま・うし・ね」…これも 4章の 倉庫と 同じだね。', scene:'hospital', char:'both' },
    { speaker:'リオ', cls:'rio', text:'もう やったから わかるかな?', scene:'hospital', char:'both' },
  ],
  puzzle: { type:'lock', title:'🔍 病院の ダイヤル錠', hint:'ね=1 うし=2 とら=3 う=4 たつ=5 み=6 うま=7 ひつじ=8 さる=9 とり=10 いぬ=11 い=12', cipherText:'🐶いぬ 🐎うま 🐂うし 🐭ね', answer:[11,7,2,1], explanation:'いぬ=11、うま=7、うし=2、ね=1!' },
  outro: [
    { speaker:'リオ', cls:'rio', text:'カチッ!開いた!', scene:'hospital', char:'both' },
    { speaker:'ハル', cls:'haru', text:'中に 看護師さんからの メッセージ…「べつの病室に 急いで」!', scene:'hospital', char:'both' },
    { speaker:'タナカ先生', cls:'tanaka', text:'ありがとう、ふたりとも!すぐ 行ってくる!', scene:'hospital', char:null },
  ],
  note: { title:'第9章 病院', desc:'動物の番号で 看護師さんを 救出。' },
},
{
  id: 10, icon: '⛩️', title: '神社の 七つの 鈴', desc: '究極の 推理!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'最後の 事件。おおたかの森の 神社で、7つの 鈴が きえた!', scene:'shrine', char:null },
    { speaker:'ハル', cls:'haru', text:'4人の 容疑者が いる…でも アリバイが みんな ある。', scene:'shrine', char:'left' },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、どうしよう…', scene:'shrine', char:'both' },
    { speaker:'ハル', cls:'haru', text:'これまでの あんごうを 思い出そう。CONAN、HELLO、こうべ…', scene:'shrine', char:'both' },
    { speaker:'リオ', cls:'rio', text:'うーん、どこに ヒントが あるんだろう?', scene:'shrine', char:'both' },
    { speaker:'ハル', cls:'haru', text:'容疑者の 名前を よく 見てみよう。', scene:'shrine', char:'both' },
    { speaker:'ナレーター', cls:'narrator', text:'容疑者:カミノさん、タナカさん、ヤマモトさん、スズキさん', scene:'shrine', char:null },
  ],
  puzzle: { type:'final', title:'🔍 真犯人を えらべ!', hint:'これまでの 暗号は ある 漢字に 関係していた…名前を よく 見て!', suspects:[
    { id:'tanaka_v', name:'タナカさん', alibi:'10時に 図書室に いた', charKey:'villager1' },
    { id:'kamino', name:'カミノさん', alibi:'10時に 神社の 近くに いた', charKey:'villager2', correct:true },
    { id:'yamamoto', name:'ヤマモトさん', alibi:'10時に 家で ねていた', charKey:'villager3' },
    { id:'suzuki', name:'スズキさん', alibi:'10時に レストランに いた', charKey:'villager4' },
  ], explanation:'正解!カミノさんの「神」の字!\nぜんぶの 暗号が 神社の 鈴を 指していたんだ!' },
  outro: [
    { speaker:'カミノ', cls:'mystery', text:'ばれたか…!', scene:'shrine', char:'both' },
    { speaker:'ハル', cls:'haru', text:'なまえは 大切な てがかりだった。', scene:'shrine', char:'both' },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、すごい!ぼくたち やったね!', scene:'shrine', char:'both' },
    { speaker:'ハル', cls:'haru', text:'リオも よく 一緒に 解いてくれた。ふたりで 名探偵だ。', scene:'shrine', char:'both' },
    { speaker:'ナレーター', cls:'narrator', text:'― 第10章 完 ―\nハルと リオ、10つの 事件を ぜんぶ 解決した!', scene:'shrine', char:null },
  ],
  note: { title:'第10章 神社', desc:'10事件 ぜんぶ クリア!きみたちは 真の 名探偵!' },
},
];

// ============================================================
// 영어추리 챕터 (하루·리오 버전)
// ============================================================
const NEW_ENG_MYSTERY_STORIES = [
{
  id: 'em1', icon: '🔍', title: '英語の メッセージ ①', desc: '英語で 推理しよう!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'外国人の お客さんが 英語で メッセージを のこした…', scene:'museum', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、英語が いっぱい 書いてある!', scene:'museum', char:'right' },
    { speaker:'ハル', cls:'haru', text:'「The thief ran AWAY」…thiefは どろぼう、ranは 走った…', scene:'museum', char:'both' },
    { speaker:'リオ', cls:'rio', text:'AWAYって なに?', scene:'museum', char:'both' },
  ],
  puzzle: { type:'eng_choice', title:'🔍 英単語で 推理!',
    question:'「The thief ran AWAY」の 意味は?',
    hint:'thief = どろぼう / ran = 走った / AWAY = ?',
    options:[
      { text:'近くで 走った', correct:false, why:'AWAYは「離れて」の意味だよ!' },
      { text:'にげた (away = 離れる)', correct:true, why:'正解!run away = 逃げる!' },
      { text:'ねむった', correct:false, why:'眠るは sleep だよ' },
      { text:'戻ってきた', correct:false, why:'戻るは come back!' },
    ]
  },
  outro: [
    { speaker:'ハル', cls:'haru', text:'「run away」=「にげる」!犯人は どこかに 逃げたんだ。', scene:'museum', char:'both' },
    { speaker:'リオ', cls:'rio', text:'英語、すごい!', scene:'museum', char:'both' },
  ],
  note: { title:'英語推理 ①', desc:'run away = 逃げる' },
},
{
  id: 'em2', icon: '🔍', title: '英語の メッセージ ②', desc: '熟語で 推理しよう!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'外国人から 手紙が とどいた!', scene:'library', char:null },
    { speaker:'ハル', cls:'haru', text:'「Look up to the sky at noon」…?', scene:'library', char:'left' },
    { speaker:'リオ', cls:'rio', text:'look up to?', scene:'library', char:'both' },
    { speaker:'ハル', cls:'haru', text:'これは 熟語だね。意味を 考えよう。', scene:'library', char:'both' },
  ],
  puzzle: { type:'eng_choice', title:'🔍 熟語で 推理!',
    question:'「look up to ~」の 意味は?',
    hint:'look = 見る / up = 上 / to = ~に',
    options:[
      { text:'~を尊敬する / ~を見上げる', correct:true, why:'正解!look up to = 尊敬する/見上げる' },
      { text:'~を見下す', correct:false, why:'それは look down on だよ' },
      { text:'~を見つける', correct:false, why:'find や look for だね' },
      { text:'~を忘れる', correct:false, why:'forget だよ' },
    ]
  },
  outro: [
    { speaker:'ハル', cls:'haru', text:'「12時に 空を 見上げろ」!何かの サインだ。', scene:'library', char:'both' },
    { speaker:'リオ', cls:'rio', text:'12時、空に なにか あるかな?', scene:'library', char:'both' },
  ],
  note: { title:'英語推理 ②', desc:'look up to = 尊敬する/見上げる' },
},
{
  id: 'em3', icon: '🔍', title: '英語の メッセージ ③', desc: '英語スペルで 推理!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'壁に 文字が 書かれている。でも 文字が 並びかえられて…', scene:'warehouse', char:null },
    { speaker:'リオ', cls:'rio', text:'「TFEHI」?なんて 読むの?', scene:'warehouse', char:'right' },
    { speaker:'ハル', cls:'haru', text:'これは アナグラム…文字を 並びかえる パズルだね。', scene:'warehouse', char:'both' },
    { speaker:'ハル', cls:'haru', text:'並びかえると「どろぼう」を意味する 英単語に なる。', scene:'warehouse', char:'both' },
  ],
  puzzle: { type:'eng_anagram', title:'🔍 アナグラム(並び替え)',
    scrambled:'TFEHI',
    answer:'THIEF',
    hint:'5文字、意味は 「どろぼう」',
    explanation:'TFEHI を 並びかえると → THIEF (どろぼう)' },
  outro: [
    { speaker:'ハル', cls:'haru', text:'「THIEF」=「どろぼう」!ここに 犯人が いた しょうこだ。', scene:'warehouse', char:'both' },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、すごい!', scene:'warehouse', char:'both' },
  ],
  note: { title:'英語推理 ③', desc:'THIEF = どろぼう' },
},
];


// ============================================================
// STORY 11~15장 (おおたかの森 무대 확장)
// ============================================================
const NEW_STORY_11_15 = [
{
  id: 11, icon: '🛒', title: 'モールの 迷子', desc: '時間で 推理しよう!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'おおたかの森のショッピングモール。ヤマダさんが 困っていた。', scene:'shoppingMall', char:null },
    { speaker:'ヤマダさん', cls:'yamada', text:'まごの ケンタが いなくなってしまった!探してくれないか?', scene:'shoppingMall', char:null },
    { speaker:'ハル', cls:'haru', text:'てがかりは なんですか?', scene:'shoppingMall', char:'left' },
    { speaker:'ヤマダさん', cls:'yamada', text:'メモが 残っていたんだ。「3じ ふくや、5じ ほんや、4じ パンや」って。', scene:'shoppingMall', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、これ なんの じゅんばん?', scene:'shoppingMall', char:'both' },
    { speaker:'ハル', cls:'haru', text:'うーん…ぐちゃぐちゃに 書いてあるね。', scene:'shoppingMall', char:'both' },
  ],
  puzzle: { type:'timetable', title:'🔍 時間順の あんごう', hint:'時間が 早い 順に お店を ならべて、最初の文字を 集めよう!',
    items: [
      { time:'3じ', place:'ふくや', firstChar:'ふ' },
      { time:'5じ', place:'ほんや', firstChar:'ほ' },
      { time:'4じ', place:'パンや', firstChar:'パ' },
    ],
    answer:'ふパほ', explanation:'時間順(3じ→4じ→5じ): ふくや→パンや→ほんや → 「ふ・パ・ほ」!ケンタくんは 「ふんすい(噴水)」のところ → 中央広場!' },
  outro: [
    { speaker:'リオ', cls:'rio', text:'ふパほ?…ふんすい!', scene:'shoppingMall', char:'right' },
    { speaker:'ハル', cls:'haru', text:'モールの 中央広場に 噴水が あったよね。行ってみよう!', scene:'shoppingMall', char:'both' },
    { speaker:'ヤマダさん', cls:'yamada', text:'ケンター!よかった、見つかった!ありがとう ふたりとも!', scene:'shoppingMall', char:null },
  ],
  note: { title:'第11章 モール', desc:'時間順に並べると 場所が 分かる。' },
},
{
  id: 12, icon: '🏫', title: '屋上の 紙ひこうき', desc: 'かがみの 文字!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'学校の 屋上。風で 紙ひこうきが 飛んできた。', scene:'rooftop', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん!紙ひこうきに 何か 書いてある!', scene:'rooftop', char:'right' },
    { speaker:'ハル', cls:'haru', text:'…文字が 反対に なってるね。へんな かたち。', scene:'rooftop', char:'both' },
    { speaker:'モリ先生', cls:'mori', text:'(屋上の 入口で)あ、ハル君と リオ君!ちょうどよかった。', scene:'rooftop', char:null },
    { speaker:'モリ先生', cls:'mori', text:'音楽室で 大切な 楽譜が なくなって…ヒントを 紙ひこうきで 飛ばしたの。', scene:'rooftop', char:null },
    { speaker:'リオ', cls:'rio', text:'ぼくたち やってみる!', scene:'rooftop', char:'both' },
  ],
  puzzle: { type:'mirror', title:'🔍 鏡文字の メッセージ', hint:'鏡に うつった 文字を ふつうに 戻そう!',
    cipherText:'ろん',  // 좌우반전된 표시: 「のる」를 거울 반전한 형태로 보여줌
    displayHint:'(かがみで 見ると 「のる」になる文字)',
    answer:'のる', 
    explanation:'鏡文字を ふつうに 読むと「のる(乗る)」!楽譜は 「ピアノ の 上」に あった!' },
  outro: [
    { speaker:'リオ', cls:'rio', text:'のる!ピアノの 上!', scene:'rooftop', char:'right' },
    { speaker:'モリ先生', cls:'mori', text:'まあ!ありがとう、ふたりとも。すぐ 探しに 行きます!', scene:'rooftop', char:null },
    { speaker:'ハル', cls:'haru', text:'屋上の 風が きもちいいね、リオ。', scene:'rooftop', char:'both' },
  ],
  note: { title:'第12章 屋上', desc:'鏡文字「ろん」→「のる」→ピアノの上。' },
},
{
  id: 13, icon: '☕', title: 'カフェの コースター', desc: '絵で メッセージ!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'カフェに 来たハルと リオ。テーブルに 不思議な コースターが あった。', scene:'cafe', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、コースターに 絵が 描いてある!🌙と🐶!', scene:'cafe', char:'right' },
    { speaker:'ミナ', cls:'mina', text:'(隣の席から)あ、ハル君!リオ君も!こんにちは。', scene:'cafe', char:null },
    { speaker:'ミナ', cls:'mina', text:'そのコースター、わたしの 友達からの メッセージなの。でも 解けなくて…', scene:'cafe', char:null },
    { speaker:'ハル', cls:'haru', text:'絵が ならんでいる…これも 何かの あんごうだね。', scene:'cafe', char:'both' },
    { speaker:'リオ', cls:'rio', text:'お絵かきの あんごう!ぼく、絵 だいすき!', scene:'cafe', char:'both' },
  ],
  puzzle: { type:'emoji', title:'🔍 絵の あんごう', hint:'絵の 名前を つなげると 言葉に なる!',
    items: [
      { emoji:'🌙', name:'つき' },
      { emoji:'🐶', name:'いぬ' },
    ],
    answer:'つきいぬ', 
    explanation:'🌙(つき) + 🐶(いぬ) → 「つきいぬ」 → 「月(つき)が きれいな 夜に 犬と 散歩しよう」って 意味!' },
  outro: [
    { speaker:'ミナ', cls:'mina', text:'なるほど!友達と 月見散歩の 約束だったのね。ありがとう!', scene:'cafe', char:null },
    { speaker:'リオ', cls:'rio', text:'お兄ちゃん、ぼくたちも 月見 行こうよ!', scene:'cafe', char:'both' },
    { speaker:'ハル', cls:'haru', text:'今度 みんなで 行こうか。', scene:'cafe', char:'both' },
  ],
  note: { title:'第13章 カフェ', desc:'絵の 名前を つなげると 言葉に なる。' },
},
{
  id: 14, icon: '🎋', title: '七夕の 短冊', desc: 'はじめの 文字を 集めよう!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'公園の 七夕飾り。色とりどりの 短冊が 風に揺れている。', scene:'gardenTanabata', char:null },
    { speaker:'タナカ先生', cls:'tanaka', text:'やあ、ハル君と リオ君。七夕に 来てくれたんだね。', scene:'gardenTanabata', char:null },
    { speaker:'タナカ先生', cls:'tanaka', text:'実は、5枚の 短冊に 隠れた メッセージが あるんだ。挑戦してみる?', scene:'gardenTanabata', char:null },
    { speaker:'リオ', cls:'rio', text:'ぼく やる!お兄ちゃん 一緒に!', scene:'gardenTanabata', char:'right' },
    { speaker:'ハル', cls:'haru', text:'5枚の 短冊…どこに ヒントが あるんだろう。', scene:'gardenTanabata', char:'both' },
  ],
  puzzle: { type:'firstchar', title:'🔍 短冊の はじめの 文字', hint:'5枚の 短冊の さいしょの 文字を 順に 集めよう!',
    items: [
      { color:'赤', wish:'あめが ふってほしい' },
      { color:'黄', wish:'いぬと あそびたい' },
      { color:'青', wish:'すしを たべたい' },
      { color:'桃', wish:'クッキーを やきたい' },
      { color:'白', wish:'リンゴを たべたい' },
    ],
    answer:'あいすクリ', 
    explanation:'5枚の 短冊の はじめの文字: あ・い・す・ク・リ → 「アイスクリ(ーム)」!みんなで アイスを 食べに 行こう、という メッセージ!' },
  outro: [
    { speaker:'リオ', cls:'rio', text:'アイスクリーム!たべたい!たべたい!', scene:'gardenTanabata', char:'right' },
    { speaker:'タナカ先生', cls:'tanaka', text:'はは、よく 解けたね!ご褒美に、近くの お店で 一緒に 食べに 行こう。', scene:'gardenTanabata', char:null },
    { speaker:'ハル', cls:'haru', text:'リオ、よく やったね。', scene:'gardenTanabata', char:'both' },
  ],
  note: { title:'第14章 七夕', desc:'5枚の 短冊の 最初の文字 → アイスクリーム!' },
},
{
  id: 15, icon: '🌙', title: '真夜中の 大調査', desc: '究極の 推理!',
  intro: [
    { speaker:'ナレーター', cls:'narrator', text:'夜の おおたかの森。これまでの 14の 事件…ぜんぶに 共通点が あった。', scene:'nightStreet', char:null },
    { speaker:'ハル', cls:'haru', text:'リオ、よく聞いて。1章から 14章まで、ぜんぶ 思い出そう。', scene:'nightStreet', char:'left' },
    { speaker:'ハル', cls:'haru', text:'5章の「謎の人物」、10章の「カミノさん」…それぞれ 別の 犯人だった。', scene:'nightStreet', char:'both' },
    { speaker:'リオ', cls:'rio', text:'うん…でも 何が つながってるの?', scene:'nightStreet', char:'both' },
    { speaker:'ハル', cls:'haru', text:'各事件の 場所を よく 見て。校門・図書室・美術室・倉庫・公園…', scene:'nightStreet', char:'both' },
    { speaker:'ハル', cls:'haru', text:'美術館・駅・花壇・病院・神社・モール・屋上・カフェ・七夕公園…', scene:'nightStreet', char:'both' },
    { speaker:'リオ', cls:'rio', text:'いっぱい あるね…全部 ちがう 場所だね。', scene:'nightStreet', char:'both' },
    { speaker:'ハル', cls:'haru', text:'容疑者の 中に、これら ぜんぶに 関係できる人が いるはず…', scene:'nightStreet', char:'both' },
    { speaker:'ナレーター', cls:'narrator', text:'容疑者:ヤマダさん(管理人)、モリ先生(音楽教師)、タナカ先生(医師)、謎の人物', scene:'nightStreet', char:null },
  ],
  puzzle: { type:'final', title:'🔍 すべての 事件を つなぐ 人物は?', hint:'14の 事件 ぜんぶに 関われる 仕事は?', suspects:[
    { id:'mori_v', name:'モリ先生', alibi:'音楽室にしか 行かない', charKey:'mori' },
    { id:'tanaka_v', name:'タナカ先生', alibi:'病院に いる時間が 長い', charKey:'tanaka' },
    { id:'yamada_v', name:'ヤマダさん', alibi:'町の 管理人として どこにでも 行ける', charKey:'yamada', correct:true },
    { id:'mystery_v', name:'謎の人物', alibi:'5章で 捕まった', charKey:'mystery' },
  ], explanation:'正解!ヤマダさんは 町の 管理人として、すべての 場所に 行く 仕事が ある。\n…でも、心配しないで。ヤマダさんは 「事件を 起こした人」 では なく、ハルとリオの 推理を 見守ってくれた 「協力者」だったんだ!' },
  outro: [
    { speaker:'ヤマダさん', cls:'yamada', text:'よく 気づいたね、ハル君。実は…町の 名探偵を 探していたんだよ。', scene:'nightStreet', char:null },
    { speaker:'ヤマダさん', cls:'yamada', text:'14の 事件は、君たちを 試すための 「練習問題」だったんだ。', scene:'nightStreet', char:null },
    { speaker:'リオ', cls:'rio', text:'えっ!?ぜんぶ ヤマダさんが…?', scene:'nightStreet', char:'right' },
    { speaker:'ヤマダさん', cls:'yamada', text:'もちろん 本当の 困った人を 助けた事件も あった。でも 君たちなら 解けると 信じていた。', scene:'nightStreet', char:null },
    { speaker:'ハル', cls:'haru', text:'ぼくたちが 名探偵に なれるよう、応援してくれてたんですね。', scene:'nightStreet', char:'left' },
    { speaker:'ヤマダさん', cls:'yamada', text:'これからも 町の 平和を 守ってくれよ、ハルとリオの「兄弟探偵」!', scene:'nightStreet', char:null },
    { speaker:'ナレーター', cls:'narrator', text:'― 全15章 完 ―\nハルとリオは、おおたかの森の 本物の 名探偵に なった。', scene:'nightStreet', char:null },
  ],
  note: { title:'第15章 真夜中', desc:'15事件 完全クリア!ヤマダさんは 兄弟を 試した 協力者だった。' },
},
];

const STORY = [...NEW_STORY_1_5, ...NEW_STORY_6_10, ...NEW_STORY_11_15];
const EXTRA_STORIES = [];
const ENG_MYSTERY_STORIES = NEW_ENG_MYSTERY_STORIES;

// ============================================================
// EXTRA SCENES (추가 배경 SVG)
// ============================================================
const EXTRA_SCENES = {
  museum: '<svg class="bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="muSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a4a6b"/><stop offset="1" stop-color="#6b7a96"/></linearGradient></defs><rect width="800" height="500" fill="url(#muSky)"/><rect y="380" width="800" height="120" fill="#5a4a3b"/><rect x="100" y="180" width="600" height="240" fill="#c4b89a" stroke="#5a3a20" stroke-width="3"/><polygon points="80,180 720,180 700,140 100,140" fill="#8b6f4e" stroke="#5a3a20" stroke-width="3"/><g><rect x="180" y="80" width="14" height="100" fill="#c4b89a"/><rect x="606" y="80" width="14" height="100" fill="#c4b89a"/><rect x="290" y="60" width="14" height="120" fill="#c4b89a"/><rect x="496" y="60" width="14" height="120" fill="#c4b89a"/><rect x="396" y="50" width="14" height="130" fill="#c4b89a"/></g><rect x="350" y="270" width="100" height="150" fill="#5a3a20" stroke="#3a2a18" stroke-width="3"/><circle cx="400" cy="350" r="3" fill="#f0c674"/><g fill="#f7eed8"><rect x="150" y="220" width="100" height="80" stroke="#5a3a20" stroke-width="3"/><circle cx="200" cy="260" r="20" fill="#e07b5e"/><rect x="550" y="220" width="100" height="80" stroke="#5a3a20" stroke-width="3"/><polygon points="600,235 580,285 620,285" fill="#6ba8c4"/></g><rect x="270" y="220" width="80" height="80" fill="#1a1a2e" stroke="#f0c674" stroke-width="4"/><text x="310" y="270" text-anchor="middle" font-family="Yusei Magic" font-size="40" fill="#f0c674">?</text><rect x="450" y="220" width="80" height="80" fill="#1a1a2e" stroke="#f0c674" stroke-width="4"/><text x="490" y="270" text-anchor="middle" font-family="Yusei Magic" font-size="40" fill="#f0c674">?</text></svg>',

  trainStation: '<svg class="bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="ts" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6a8a"/><stop offset="1" stop-color="#8a9aba"/></linearGradient></defs><rect width="800" height="500" fill="url(#ts)"/><rect y="320" width="800" height="180" fill="#8b8b8b"/><rect y="310" width="800" height="14" fill="#3a3a3a"/><rect x="0" y="380" width="800" height="20" fill="#5a3a20"/><rect x="0" y="430" width="800" height="20" fill="#5a3a20"/><g fill="#3a3a3a"><rect x="60" y="380" width="14" height="50"/><rect x="200" y="380" width="14" height="50"/><rect x="340" y="380" width="14" height="50"/><rect x="480" y="380" width="14" height="50"/><rect x="620" y="380" width="14" height="50"/><rect x="760" y="380" width="14" height="50"/></g><rect x="100" y="120" width="600" height="180" fill="#c4b89a" stroke="#5a3a20" stroke-width="3"/><polygon points="80,120 720,120 700,80 100,80" fill="#c4625e" stroke="#5a3a20" stroke-width="3"/><rect x="350" y="180" width="100" height="120" fill="#3a4a5c"/><text x="400" y="100" text-anchor="middle" font-family="RocknRoll One" font-size="24" fill="white">えき (駅)</text><circle cx="180" cy="180" r="22" fill="white" stroke="#3a4a5c" stroke-width="3"/><line x1="180" y1="180" x2="180" y2="165" stroke="#3a4a5c" stroke-width="2"/><line x1="180" y1="180" x2="190" y2="180" stroke="#3a4a5c" stroke-width="2"/><circle cx="620" cy="180" r="22" fill="white" stroke="#3a4a5c" stroke-width="3"/><rect x="600" y="170" width="40" height="20" fill="#f0c674"/></svg>',

  garden: '<svg class="bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="gd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8d8ea"/><stop offset="1" stop-color="#c8e6c9"/></linearGradient></defs><rect width="800" height="500" fill="url(#gd)"/><rect y="320" width="800" height="180" fill="#7fb074"/><path d="M0,400 Q200,360 400,400 T800,400 L800,500 L0,500 Z" fill="#5a8c50"/><g><circle cx="120" cy="380" r="8" fill="#e07b5e"/><circle cx="116" cy="375" r="4" fill="#ffb6c1"/><circle cx="124" cy="375" r="4" fill="#ffb6c1"/><circle cx="120" cy="378" r="4" fill="#f0c674"/></g><g transform="translate(680,380)"><circle cx="0" cy="0" r="8" fill="#9b87bc"/><circle cx="-4" cy="-4" r="4" fill="#d4c4e8"/><circle cx="4" cy="-4" r="4" fill="#d4c4e8"/></g><g transform="translate(220,360)"><rect x="-10" y="0" width="20" height="60" fill="#5a3a20"/><circle cx="0" cy="-30" r="35" fill="#6fb074"/><circle cx="-15" cy="-40" r="20" fill="#7fb074"/><circle cx="15" cy="-40" r="20" fill="#7fb074"/><circle cx="-10" cy="-15" r="6" fill="#e07b5e"/><circle cx="12" cy="-25" r="6" fill="#e07b5e"/></g><rect x="380" y="280" width="180" height="100" fill="#c4a070" stroke="#5a3a20" stroke-width="3"/><rect x="440" y="320" width="60" height="60" fill="#5a3a20"/><polygon points="370,280 570,280 470,220" fill="#c4625e" stroke="#5a3a20" stroke-width="3"/><circle cx="60" cy="80" r="40" fill="#fff8e7" opacity="0.9"/><circle cx="55" cy="75" r="35" fill="#a8d8ea"/></svg>',

  hospital: '<svg class="bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"><rect width="800" height="500" fill="#e8f0f5"/><rect y="380" width="800" height="120" fill="#c4d4e0"/><rect x="100" y="120" width="600" height="280" fill="white" stroke="#6ba8c4" stroke-width="4"/><g><rect x="380" y="160" width="40" height="80" fill="#e07b5e"/><rect x="360" y="180" width="80" height="40" fill="#e07b5e"/></g><g fill="#a8d8ea" stroke="#3a4a5c" stroke-width="2"><rect x="160" y="280" width="80" height="80"/><rect x="280" y="280" width="80" height="80"/><rect x="440" y="280" width="80" height="80"/><rect x="560" y="280" width="80" height="80"/></g><rect x="0" y="100" width="800" height="20" fill="#6ba8c4"/><text x="400" y="115" text-anchor="middle" font-family="RocknRoll One" font-size="14" fill="white">びょういん (病院)</text></svg>',

  shrine: '<svg class="bg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sh" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffb88c"/><stop offset="1" stop-color="#ffd8c2"/></linearGradient></defs><rect width="800" height="500" fill="url(#sh)"/><rect y="380" width="800" height="120" fill="#5a3a20"/><rect y="370" width="800" height="14" fill="#8b6f4e"/><polygon points="0,360 100,260 200,360" fill="#7a6a90" opacity="0.6"/><polygon points="600,360 700,250 800,360" fill="#7a6a90" opacity="0.6"/><g><rect x="200" y="160" width="14" height="220" fill="#c4625e"/><rect x="586" y="160" width="14" height="220" fill="#c4625e"/><rect x="180" y="140" width="440" height="30" fill="#c4625e"/><polygon points="160,140 640,140 620,110 180,110" fill="#3a2a18"/><rect x="380" y="170" width="40" height="60" fill="#3a2a18"/></g><circle cx="120" cy="100" r="25" fill="#f0c674" opacity="0.7"/><circle cx="120" cy="100" r="18" fill="#e07b5e" opacity="0.8"/></svg>',
};
