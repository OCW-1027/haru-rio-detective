# 英検 面接 イラスト — Gemini 지시서 (v3)

**대상**: 英検道場「面接 (二次)」 문제 카드의 그림
**총 62장** (+ 선택 6장, 인도 수학 도장 선생님 2장)
- 2級: 10스토리 × 3コマ = 30장
- 準1級: 8스토리 × 4コマ = 32장
- 선택: 세계추적 증인 다시 그리기 6장 (지난번에 얼굴이 비슷하게 나온 것)

**화면 쪽 처리**: 시간 표시(That evening 등)와 말풍선 대사는 게임 화면이 그림 위에 붙입니다. 그래서 **그림에는 글자를 넣지 않습니다.** 실제 시험 카드처럼 같은 스토리 안에서는 같은 인물이 계속 나와야 합니다.

## 사용법

1. Gemini **새 채팅**에 지난번과 같은 참고 그림 2장을 첨부합니다.
   - `assets\img\bg\series04\bg_ch09_physics.webp`
   - `assets\img\chars\series04\faraday_coil.webp`
2. 아래 「붙여넣기 블록」을 통째로 붙여넣습니다. 4장씩 그리고 멈추면 `next`를 입력합니다.
   - 대화가 길어지면 새 채팅 + 참고 그림 + 블록 + `Start from #31`처럼 이어 가면 됩니다.
3. 받은 그림을 `_art_inbox\v2\`에 **지난번처럼 `#01_int_g2i01_1.jpg` 형식으로** 저장합니다 (앞 번호는 있어도 없어도 됩니다).
4. PC와 연결된 Claude 채팅에서 "면접 그림 넣었어요"라고 알려 주세요. 검수 → 반영 → main 푸시까지 처리합니다.

---

## 붙여넣기 블록

```
You are the illustrator for a children's English-exam practice game. I attached 2 style references.
Please draw ALL the images in the list below, in order.

STYLE (every image):
- Exactly the same painting style as the attached references: soft hand-painted watercolor, Ghibli-like warmth,
  thin gentle ink outlines, warm natural light, muted earthy palette. Children's-book quality, clear and simple
  so the situation is easy to understand at a glance (like an exam picture card).

RULES (every image):
- ONE separate image per item (never a sheet, grid, comic strip, collage or multiple panels).
- Landscape 4:3.
- Absolutely NO text, letters or numbers anywhere. Signs, posters, stickers, notices and screens show only simple
  symbols or pictures (for example a big red X, an arrow, a drawing of a car, a price tag shape).
- No speech bubbles. A thought bubble with a small picture inside is OK when the item says someone is thinking.
- Each "Story" is a sequence: keep the SAME characters (face, hair, clothes, age) in every panel of that story.
- Before each image write only its number and file name as plain text (for example "#3 int_g2i01_3").
- Draw up to 4 items per reply, then wait until I say "next".

========== GROUP 1: EIKEN Grade 2 — 10 stories x 3 panels ==========
-- Story 1 (same characters in every panel of this story): One day, Mr. and Mrs. Sato were shopping at a supermarket.
#1 int_g2i01_1 — A Japanese couple in their forties shopping in a supermarket; the wife points at a loaf of bread with a half-price sticker. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#2 int_g2i01_2 — At home in the evening: the husband puts the bread into the refrigerator while the wife writes a shopping list at the table.
#3 int_g2i01_3 — The next morning the couple eat toast together at the breakfast table, smiling; the husband is happily thinking about how tasty the bread is.
-- Story 2 (same characters in every panel of this story): One day, Ken was talking with his mother about going to the library.
#4 int_g2i02_1 — A Japanese junior-high boy and his mother talk in a living room; the boy looks at a map on a smartphone. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#5 int_g2i02_2 — In front of a train station, the boy holds his smartphone over a bicycle-sharing dock to unlock a bike.
#6 int_g2i02_3 — The boy arrives at a library on the bike, but the door is closed with a "closed today" sign; he looks disappointed.
-- Story 3 (same characters in every panel of this story): One day, the Kimura family was having dinner at a restaurant.
#7 int_g2i03_1 — A Japanese family of three at a family restaurant; a small white serving robot brings dishes to their table and the daughter points happily. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#8 int_g2i03_2 — After the meal, a smiling waitress talks with the family at the table; the father compliments the food.
#9 int_g2i03_3 — That night at home, the daughter draws a picture of a robot at her desk, dreaming of building robots in the future.
-- Story 4 (same characters in every panel of this story): One day, Yuki was sick in bed at home.
#10 int_g2i04_1 — A Japanese junior-high girl lies sick in bed with a cold; her mother checks a thermometer looking worried. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#11 int_g2i04_2 — Two days later the girl, now feeling better, watches a recorded math lesson on a tablet at her desk and takes notes.
#12 int_g2i04_3 — At school, the girl raises her hand confidently to answer a question in class while her friends look surprised.
-- Story 5 (same characters in every panel of this story): One day, Mrs. Tanaka was getting ready to go shopping.
#13 int_g2i05_1 — At the front door, a Japanese woman gets ready to go shopping; her young son hands her a cloth shopping bag. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#14 int_g2i05_2 — At a store checkout, the woman packs vegetables into her cloth bag while a man next to her pays for a plastic bag.
#15 int_g2i05_3 — On the way home, the woman stops on a seaside path to watch volunteers picking up plastic trash on the beach.
-- Story 6 (same characters in every panel of this story): One day, Mr. Mori was working from home.
#16 int_g2i06_1 — A Japanese man in a shirt joins an online video meeting on a laptop at home; behind him his little daughter holds up a picture book. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#17 int_g2i06_2 — At lunchtime, the man sits on the sofa reading the picture book to his daughter.
#18 int_g2i06_3 — The next day at the office, the man chats happily with coworkers over coffee in a break room.
-- Story 7 (same characters in every panel of this story): One day, Emi and her father were walking their dog in the park.
#19 int_g2i07_1 — A girl and her father walk a golden retriever in a park; the girl points to a poster on a notice board showing a dog visiting elderly people. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#20 int_g2i07_2 — A week later at a nursing home, an elderly woman in a wheelchair pets the dog and laughs while the girl smiles.
#21 int_g2i07_3 — That evening at home, the girl hugs her dog and writes in her diary.
-- Story 8 (same characters in every panel of this story): One day, Sota was looking at a website with his friend.
#22 int_g2i08_1 — Two Japanese high-school boys look at a laptop showing a web page about joining a village festival as portable-shrine carriers. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#23 int_g2i08_2 — On festival day, the boys wear happi coats and carry a portable shrine together with local villagers in a lively street.
#24 int_g2i08_3 — After the festival, an elderly local woman hands rice balls to the boys; everyone is smiling.
-- Story 9 (same characters in every panel of this story): One day, Mr. Ito was talking with his son on the phone.
#25 int_g2i09_1 — An elderly Japanese man who lives alone talks on the phone in his traditional living room; he looks a little confused. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#26 int_g2i09_2 — A few days later, the old man talks to a small smart speaker on a shelf, and music notes come out of it.
#27 int_g2i09_3 — A month later, the old man smiles and waves at his grandchild on the small screen of a smart display during a video call.
-- Story 10 (same characters in every panel of this story): One day, Rina was going shopping with her grandmother.
#28 int_g2i10_1 — A junior-high girl and her grandmother walk toward a small shop; the grandmother holds a coin purse. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#29 int_g2i10_2 — At the register, the grandmother holds a smartphone over a payment reader while the girl shows her how.
#30 int_g2i10_3 — That evening at home, the grandmother looks at her smartphone screen with surprise, checking how much money she spent.

========== GROUP 2: EIKEN Grade Pre-1 — 8 stories x 4 panels ==========
-- Story 1 (same characters in every panel of this story): One day, a woman was talking with her neighbor about the empty land near their apartment.
#31 int_p1i01_1 — A woman in her thirties and an older male neighbor stand beside an empty lot with scattered trash near an apartment building. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#32 int_p1i01_2 — The woman pins a poster about a community garden on a bulletin board at a community center while residents gather to look.
#33 int_p1i01_3 — Residents of all ages plant vegetable seedlings in the cleaned-up lot; a child waters them with a watering can.
#34 int_p1i01_4 — The garden is full of ripe vegetables, but a city sign has been placed saying the land will become a parking lot; the woman looks shocked.
-- Story 2 (same characters in every panel of this story): One day, a boy was watching a TV program about plastic in the ocean with his parents.
#35 int_p1i02_1 — A family watches television in a living room; the screen shows a sea turtle surrounded by plastic trash in the ocean. The boy looks upset. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#36 int_p1i02_2 — The next weekend, the boy and his friends pick up plastic bottles on a beach and fill several trash bags.
#37 int_p1i02_3 — A month later at school, the boy gives a presentation in front of his class with photos of beach trash on a screen.
#38 int_p1i02_4 — The following week, many students still buy drinks in plastic bottles from a school vending machine; the boy watches with a disappointed look.
-- Story 3 (same characters in every panel of this story): One day, an elderly man was trying to buy a train ticket at a station.
#39 int_p1i03_1 — At a train station, an elderly man looks confused in front of a touch-screen ticket machine while a line of people waits behind him. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#40 int_p1i03_2 — A few minutes later, a high-school girl helps the man use the machine, and he bows to thank her.
#41 int_p1i03_3 — The next month, the girl teaches a smartphone class for elderly people at a community center; the same old man is a student.
#42 int_p1i03_4 — Half a year later, the ticket machines are gone and a sign tells people to buy tickets with an app; the old man passes the gate with his phone, but another elderly woman stands nearby looking lost.
-- Story 4 (same characters in every panel of this story): One day, a girl was looking at a flyer about a study abroad program.
#43 int_p1i04_1 — A Japanese high-school girl looks excitedly at a flyer about a summer study-abroad program on a school bulletin board. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#44 int_p1i04_2 — That evening at dinner, the girl talks with her parents; her father frowns at a paper showing the program costs.
#45 int_p1i04_3 — Over the next months, the girl works part-time at a café and studies English at night; a piggy bank fills with coins.
#46 int_p1i04_4 — At the airport on the day of departure, the family sees the girl off, but the departure board shows her flight is canceled because of a typhoon; everyone looks worried.
-- Story 5 (same characters in every panel of this story): One day, a man was reading an article about a shortage of workers at local farms.
#47 int_p1i05_1 — A Japanese office worker reads a news article on his smartphone on a commuter train; the screen shows a farmer standing alone in a large field. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#48 int_p1i05_2 — The following Saturday, the man picks apples in an orchard together with an elderly farmer.
#49 int_p1i05_3 — A few months later, the man brings several coworkers to the farm, and they all work happily together.
#50 int_p1i05_4 — The next year, a notice on the farm gate says the farm will close this year because there is no one to take over; the man and the old farmer look at it sadly.
-- Story 6 (same characters in every panel of this story): One day, a woman was walking home from work late at night.
#51 int_p1i06_1 — Late at night, a young woman walks home along a dark street where a streetlight is broken; she looks uneasy. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#52 int_p1i06_2 — The next day, the woman talks to a clerk at the city hall counter, pointing to a map to ask for the streetlight to be repaired.
#53 int_p1i06_3 — Two weeks later, new LED streetlights brighten the street; the woman and neighborhood children walk safely.
#54 int_p1i06_4 — A month later, a neighbor closes his curtains, annoyed because the bright streetlight shines into his bedroom; the woman notices.
-- Story 7 (same characters in every panel of this story): One day, a boy was playing a video game in his room.
#55 int_p1i07_1 — A boy plays a video game in his messy room while untouched homework lies on his desk; his mother looks in from the doorway with her arms crossed. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#56 int_p1i07_2 — That weekend, the family holds a meeting in the living room and writes a chart of rules about game time.
#57 int_p1i07_3 — A few weeks later, the boy plays soccer with friends in a park, looking happy and energetic.
#58 int_p1i07_4 — A few months later, the boy stands in front of a poster for a big video game tournament offering a scholarship prize, thinking hard about the family rule chart.
-- Story 8 (same characters in every panel of this story): One day, a couple was planning a trip to a famous tourist town.
#59 int_p1i08_1 — A young couple plan a trip at home, looking at photos of a historic old town with wooden houses on a laptop. (The speaking character has an open mouth as if talking, but draw NO speech bubble.)
#60 int_p1i08_2 — On the first day of the trip, the historic street is extremely crowded with tourists, and the couple cannot even take a photo.
#61 int_p1i08_3 — Early the next morning, the couple walk along the quiet street while a local shop owner sweeps in front of her shop.
#62 int_p1i08_4 — Later that day, at the town entrance, a sign announces a new entrance fee for tourists and residents hold banners asking for a quiet life; the couple look at them thoughtfully.
========== OPTIONAL GROUP 3: re-draw 6 witnesses (square 1:1, head-and-shoulders, soft plain cream background) ==========
Make these 6 people clearly DIFFERENT from each other in age, gender and background.
#63 witness_airport — young Black woman airport staff member in a navy uniform and cap, warm smile.
#64 witness_hotel — South Asian man in his thirties at a hotel front desk, vest and bow tie, neat beard.
#65 witness_market — cheerful elderly Latin American woman shopkeeper with an apron, fruit stall behind her.
#66 witness_taxi — middle-aged white man taxi driver with a flat cap and a gray mustache, hands on a steering wheel.
#67 witness_guide — East Asian woman museum guide in her twenties with short hair, holding a small flag and a guidebook.
#68 witness_traveler — Middle Eastern young man backpacker with curly hair, holding a map, big backpack.


========== GROUP 4: India-style math dojo teacher (square 1:1, head-and-shoulders, soft plain warm cream background) ==========
An original character "Aarya": a cheerful, clever 10-year-old girl from Bengaluru, India. Warm brown skin, big bright
dark eyes, long black hair in a single braid with a small marigold flower, a mustard-yellow kurta with a simple teal
pattern, holding a small chalkboard with only drawn math symbols (plus, times, equals signs; no numbers or letters).
#69 aarya_idle — friendly smile, looking at the viewer, waving one hand ("Namaste!" mood).
#70 aarya_cheer — delighted, both hands raised, eyes sparkling, celebrating a correct answer.

Start now with #1 to #4.
```
