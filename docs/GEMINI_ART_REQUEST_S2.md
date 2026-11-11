# 시즌2 일러스트 — Gemini 지시서

**대상**: ④ 日本列島ミステリー紀行 · ⑤ こども裁判所 · ⑥ タイムトラベル探偵 · ⑦ ニュース探偵 · ⑧ 暗号解読局
**총 33장**: 4묶음, 중요한 것부터 (A 8장 → B 15장 → C 7장 → D 3장)
**화풍**: 지금 게임의 지브리풍 수채화 그대로

## 사용법 (3단계)

1. Gemini 새 채팅을 열고 아래 **참고 그림 2장을 먼저 첨부**합니다 (PC의 게임 폴더 안).
   - `assets\img\bg\series04\bg_ch09_physics.webp` — 배경·장면 화풍 기준
   - `assets\img\chars\series04\faraday_coil.webp` — 인물 화풍 기준 (회색 배경)
2. 아래 **「붙여넣기 블록」 전체를 한 번에 붙여넣기** → Gemini가 #1부터 그립니다.
   - 멈추면 `next`(또는 `다음`)만 입력하면 이어서 그립니다. 마음에 안 드는 그림은 `#5 again`.
   - 대화가 길어져 화풍이 흐려지면 새 채팅 + 참고 그림 2장 + 붙여넣기 블록 + `Start from #16`.
3. 받은 그림을 PC의 `haru-rio-detective\_art_inbox\s2\` 폴더에 저장 → PC와 연결된 Claude 채팅에서 "그림 넣었어요".
   - 파일 이름은 바꾸지 않아도 됩니다. Claude가 보고 맞춘 뒤 배경 제거·크기 조정 → `assets\img\s2\…` 에 넣고 푸시합니다.
   - 그림이 없어도 게임은 그대로 동작합니다 (그림 자리가 비어 보일 뿐). 받는 대로 하나씩 바뀝니다.

| 묶음 | 내용 | 들어가는 곳 | 파일 |
|---|---|---|---|
| A | 일본 8지방 풍경 [SCENE] | 日本列島: 도감 카드·추적 화면 위 | `s2/japan/reg_*.webp` |
| B | 15시대 풍경 [SCENE] | タイムトラベル: 시대 도감·추적 화면 위 | `s2/era/era_00〜14.webp` |
| C | 일본지부 괴도 6 + 크로노 [FULL] | 日本列島 사건 소개 / タイムトラベル 사건 목록 | `s2/japan/thief_*.webp`, `s2/era/chrono.webp` |
| D | 법정·암호국·신문사 [SCENE] | 각 콘텐츠 첫 화면 | `s2/court/courtroom.webp` 등 |

---

## 붙여넣기 블록 (여기부터 끝까지 복사)

```
You are the illustrator for a children's detective learning game set in Japan. I attached 2 reference images.
Please draw ALL the images in the list below, in order.

STYLE (every image):
- Exactly the same painting style as the attached references: soft hand-painted watercolor,
  Ghibli-like warmth, thin gentle ink outlines, warm natural light, muted earthy palette
  (sage green, ochre, teal, warm browns), detailed but not cluttered. Children's-book quality.
- Kid-friendly. Villains look mischievous and stylish, never scary.

RULES (every image):
- ONE separate image per item (never a sheet, grid, collage or multiple panels).
- No text, letters, numbers, logos, signatures or watermarks inside the image (no readable signs).
- Real places only as described; do not add brand names.
- Draw up to 4 items per reply, in order. Before each image write only its number and file name
  as plain text (for example "#3 reg_kanto"). Then stop and wait until I say "next".

FORMATS:
- [SCENE] Wide landscape 16:9. No people in the foreground (small distant figures are fine).
- [FULL] Full-body character, front view, standing, whole body visible with a small margin.
  Portrait 2:3. Background: plain flat solid medium gray (#808080) only. No floor shadow.

========== GROUP A: 8 regions of Japan [SCENE] ==========
#1 reg_hokkaido — wide snowy plains and lavender fields side by side under a big sky, a red-roofed farmhouse, distant mountains of Shiretoko, a fox in the snow.
#2 reg_tohoku — rice terraces in early summer, apple orchards with red apples, a thatched farmhouse, misty beech forest mountains behind.
#3 reg_kanto — a view across a river to a modern city skyline with a very tall slender broadcasting tower, an old wooden temple gate with a big red lantern in the foreground side.
#4 reg_chubu — Mount Fuji rising above a calm lake with tea fields on gentle hills, snowy Japanese Alps far behind, a few thatched gassho-style houses.
#5 reg_kinki — an old capital in autumn: a five-story wooden pagoda, red maple leaves, stone-paved slopes, deer resting in a park, a white castle far away.
#6 reg_chugoku — sand dunes by the sea on one side, a giant red torii gate standing in the sea at high tide on the other side, calm island-dotted inland sea.
#7 reg_shikoku — whirlpools in a narrow strait under a long bridge, a vine suspension bridge over a clear green river valley, citrus orchards on hillsides.
#8 reg_kyushu — an active volcano with a thin plume of smoke across a bay, palm trees, a tropical turquoise sea with coral, a red-roofed Okinawan house with a lion statue on the roof.

========== GROUP B: 15 eras of Japanese history [SCENE] ==========
(Show daily life and buildings of each era. Small distant people in era clothing are fine.)
#9 era_00 — Jomon period: pit dwellings with thatched conical roofs, clay pots with rope patterns drying, people fishing and gathering chestnuts in a forest by the sea.
#10 era_01 — Yayoi period: a moated village with wooden watchtowers and raised-floor granaries, rice paddies being harvested with stone knives.
#11 era_02 — Kofun period: a giant keyhole-shaped burial mound covered with trees surrounded by a moat, rows of clay haniwa figures, a chieftain's procession far away.
#12 era_03 — Asuka period: an early Buddhist temple with a wooden pagoda and corridors, monks and court officials in colored caps, green hills.
#13 era_04 — Nara period: the wide main avenue of the Heijo capital leading to a vermilion gate, a huge wooden temple hall with a great bronze Buddha visible inside.
#14 era_05 — Heian period: an aristocrat's shinden-style mansion with a garden pond and arched bridge, ladies in layered twelve-robe kimono writing poems by the veranda.
#15 era_06 — Kamakura period: samurai on horseback near a seaside town with a giant bronze Buddha statue sitting outdoors, wooden houses and a shrine.
#16 era_07 — Muromachi period: a golden pavilion reflected in a pond, a tea room, a Noh stage with an actor in a mask in the distance.
#17 era_08 — Azuchi-Momoyama period: a grand castle with a tall golden-roofed keep, a Portuguese-style trading ship arriving at a harbor, merchants with fabrics.
#18 era_09 — Edo period: a lively town street with wooden shops and noren curtains, a feudal lord's procession crossing a bridge, Mount Fuji in the background.
#19 era_10 — Meiji period: a brick-built street with gas lamps, a small steam locomotive, people mixing Western suits and kimono, rickshaws.
#20 era_11 — Taisho period: a stylish cafe street, a tram, young women in hakama and boots, a radio on a shop counter.
#21 era_12 — Showa period (1960s): a bullet train passing in front of a city with a red-and-white tower, families gathered around a black-and-white TV in an apartment window.
#22 era_13 — Heisei period: a busy station plaza with people using flip phones and IC cards at ticket gates, convenience store lights, a very tall slender tower far away.
#23 era_14 — Reiwa period: a bright modern waterfront with a big ring-shaped wooden expo structure, solar panels, electric buses, people paying with smartphones.

========== GROUP C: phantom thieves [FULL] ==========
(All belong to the "Blank Gang" Japan branch: each wears a long cape and has a small WHITE BLANK playing card tucked somewhere visible. Mischievous, never scary.)
#24 thief_kage — "Kageboshi": slim ninja-like thief in dark charcoal clothes and a short navy cape, half-mask over the mouth, moving silently on tiptoe.
#25 thief_tsuku — "Tsukumo": master of disguise, young woman holding a folded paper umbrella and an old lantern, patchwork cape made of old kimono fabrics.
#26 thief_nagi — "Nagi": speedy boy who loves vehicles, goggles on his head, wind-blown scarf, roller skates, light-blue cape fluttering.
#27 thief_yomi — "Yomi": calm map-reading strategist, round glasses, holding a rolled-up map and a compass, deep purple cape.
#28 thief_hagu — "Hagure": big strong lone-wolf type with a wolf-ear hood and a gray fur-trimmed cape, arms crossed, gentle eyes.
#29 thief_oboro — "Oboro": leader of the Japan branch, tall figure wrapped in a misty pale-gray cape, wearing a white fox mask, holding a folding fan.
#30 chrono — "Chrono": time-travelling thief, young man with a big pocket watch on a chain, cape lined with clock-face patterns, hourglass on his belt, tall hat.

========== GROUP D: places [SCENE] ==========
#31 courtroom — a warm, child-friendly courtroom: judge's high wooden bench in the center, witness stand, two tables for the lawyers, soft light from tall windows, scales of justice motif carved in wood (no text).
#32 hq — a secret code-breaking headquarters: old radio sets, a wall with string-connected clue cards, a big safe with a dial lock, chalkboard with arrows and symbols (no readable letters).
#33 newsroom — a cozy old newspaper office: desks piled with papers, a printing press in the back, bulletin board with photos and graphs (no readable text), afternoon light.
```

---

## 넣을 위치 (Claude용 메모)
- `assets/img/s2/japan/reg_{hokkaido,tohoku,kanto,chubu,kinki,chugoku,shikoku,kyushu}.webp` — 1600×900 → 1280×720 WebP
- `assets/img/s2/era/era_00.webp` 〜 `era_14.webp` — 1280×720 WebP
- `assets/img/s2/japan/thief_{kage,tsuku,nagi,yomi,hagu,oboro}.webp`, `assets/img/s2/era/chrono.webp` — 회색 배경 제거 (rembg) → 투명 WebP, 높이 900
- `assets/img/s2/court/courtroom.webp`, `assets/img/s2/code/hq.webp`, `assets/img/s2/news/newsroom.webp` — 1280×720 WebP
- 그림이 없으면 `onerror="this.remove()"` 로 자리가 사라진다 (engine/japan-trip.js · time-travel.js · kids-court.js · code-lab.js · news-detective.js)
