# 새 콘텐츠 일러스트 — Gemini 지시서 (v2)

**대상**: ① コラドン航空 世界追跡 · ③ ラボ探偵
**총 74장**: 4묶음, 중요한 것부터 (A 8장 → B 23장 → C 13장 → D 30장)
**화풍**: 지금 게임의 지브리풍 수채화 그대로

## 사용법 (3단계)

1. Gemini 새 채팅을 열고 아래 **참고 그림 2장을 먼저 첨부**합니다 (PC의 게임 폴더 안).
   - `assets\img\bg\series04\bg_ch09_physics.webp` — 배경·장면 화풍 기준
   - `assets\img\chars\series04\faraday_coil.webp` — 인물 화풍 기준 (회색 배경)
2. 아래 **「붙여넣기 블록」 전체를 한 번에 붙여넣기** → Gemini가 #1부터 그립니다.
   - 멈추면 `next`(또는 `다음`)만 입력하면 이어서 그립니다.
   - 마음에 안 드는 그림은 `#5 again`처럼 번호로 다시 요청하세요.
   - 대화가 길어져 화풍이 흐려지면 새 채팅을 열고, 참고 그림 2장 + 붙여넣기 블록 + `Start from #32`로 이어가면 됩니다.
3. 받은 그림을 PC의 `haru-rio-detective\_art_inbox\v2\` 폴더에 저장합니다.
   - **파일 이름은 바꾸지 않아도 됩니다.** 생성된 순서대로만 저장해 주세요. 어느 그림인지는 Claude가 직접 보고 맞춥니다.
   - 저장한 뒤 **PC와 연결된 Claude 채팅**에서 "그림 넣었어요"라고 하면, Claude가 이름 맞추기 → 배경 제거·크기 조정 → 게임 반영 → main 푸시까지 처리합니다.
   - 그림이 아직 없어도 게임은 지금처럼 동작합니다 (이모지·간이 그림으로 대신 표시). 받는 대로 하나씩 바뀝니다.

---

## 붙여넣기 블록 (여기부터 끝까지 복사)

```
You are the illustrator for a children's detective learning game. I attached 2 reference images.
Please draw ALL the images in the list below, in order.

STYLE (every image):
- Exactly the same painting style as the attached references: soft hand-painted watercolor,
  Ghibli-like warmth, thin gentle ink outlines, warm natural light, muted earthy palette
  (sage green, ochre, teal, warm browns), detailed but not cluttered. Children's-book quality.
- Kid-friendly. Villains look mischievous and stylish, never scary.

RULES (every image):
- ONE separate image per item (never a sheet, grid, collage or multiple panels).
- No text, letters, numbers, logos, signatures or watermarks inside the image.
- Real people, places and things only as described; do not add brand names.
- Draw up to 4 items per reply, in order. Before each image write only its number and file name
  as plain text (for example "#3 gang_fox"). Then stop and wait until I say "next".

FORMATS:
- [FULL] Full-body character, front view, standing, whole body from head to toe visible with a small
  margin. Portrait 2:3. Background: plain flat solid medium gray (#808080) only. No floor shadow.
- [BUST] Head-and-shoulders portrait, friendly expression, looking at the viewer. Square 1:1.
  Background: soft plain warm cream watercolor wash.
- [ITEM] Single object, centered, still-life. Square 1:1. Background: soft plain watercolor wash.
- [SCENE] Wide landscape 16:9. No people in the foreground (small distant figures are fine).

========== GROUP A: the "Blank Gang" — 8 phantom thieves [FULL] ==========
All 8 are members of the same gang: each wears a long cape and has a small white blank playing card
tucked into their hat band (the gang's mark). Each one has EXACTLY these 4 identifying features —
make all 4 clearly visible and do NOT add any other hat, scarf, glasses or held item:
  HAT: either a tall black TOP HAT, or a soft dark-gray BERET
  ACCESSORY: either a STRIPED SCARF (mustard-yellow and blue stripes), or ROUND wire-rim GLASSES
  CAPE: either a DARK WINE-RED cape, or a NAVY BLUE cape
  HOBBY ITEM held in one hand: either a white CHESS PIECE, or a VIOLIN (with bow)
#1 gang_mirage — elegant young woman stage magician, long silver hair. TOP HAT, STRIPED SCARF, WINE-RED cape, holding a white chess knight.
#2 gang_nocturne — tall quiet young man, pale, neat black hair, sleepy eyes. TOP HAT, STRIPED SCARF, NAVY cape, holding a violin.
#3 gang_fox — sly cheerful young man with orange hair and a fox-like grin. TOP HAT, ROUND GLASSES, WINE-RED cape, holding a violin.
#4 gang_clocker — old gentleman with a white mustache, a gold pocket-watch chain on his vest. TOP HAT, ROUND GLASSES, NAVY cape, holding a white chess king.
#5 gang_palette — artist woman with short wavy brown hair and a little paint on her cheek. BERET, STRIPED SCARF, WINE-RED cape, holding a violin.
#6 gang_roulette — confident teenage girl with a high ponytail and dice earrings. BERET, STRIPED SCARF, NAVY cape, holding a white chess queen.
#7 gang_jester — playful freckled boy with a big grin. BERET, ROUND GLASSES, WINE-RED cape, holding a white chess pawn.
#8 gang_zero — cool mysterious adult with short black hair and a calm smile; the gang's leader. BERET, ROUND GLASSES, NAVY cape, holding a violin.

========== GROUP B: Lab Detective — 1 cover, 5 case scenes, 17 suspects ==========
#9 lab_hero [ITEM] — a cozy kid detective's science desk: microscope, beakers, a magnifying glass, an open notebook with sketches, warm lamp light.
#10 lab_case_pendulum [SCENE] — inside an old European-style town clock tower: a huge brass pendulum, big gears, dusty light beams through a round window.
#11 lab_case_circuit [SCENE] — a small Japanese shopping street at dusk; a shop sign decorated with small light bulbs that glow very dimly.
#12 lab_case_dissolve [SCENE] — a school science room; on the table a glass beaker with white crystals at the bottom, a lab notebook and an empty powder bag nearby.
#13 lab_case_plant [SCENE] — a greenhouse with tomato seedlings that are tall, thin and pale with drooping leaves; one window covered with a black sheet.
#14 lab_case_spring [SCENE] — a Japanese neighborhood greengrocer shop with vegetables in baskets and an old hanging spring scale.
Suspects [BUST], everyday Japanese people, each holding the item named:
#15 lab_sus_pendulum_a — middle-aged mechanic man (Akira), work cap and overalls, holding a wrench.
#16 lab_sus_pendulum_b — young assistant mechanic (Ben), slightly nervous smile, holding a coil of new string.
#17 lab_sus_pendulum_c — kind female schoolteacher (Chika), cardigan, holding a pointer stick.
#18 lab_sus_pendulum_d — old clock keeper (Doro) with a white beard, holding a big old brass key.
#19 lab_sus_circuit_a — shop manager man (Dai) in an apron, holding a battery pack.
#20 lab_sus_circuit_b — cheerful part-time young woman (Emi), holding a string of small light bulbs.
#21 lab_sus_circuit_c — electrician man (Fuji) with a tool belt and a tester.
#22 lab_sus_circuit_d — wiring worker (Gen) in a white safety helmet, holding a spool of wire.
#23 lab_sus_dissolve_a — middle-school girl from the cooking club (Hana), apron, holding a salt shaker.
#24 lab_sus_dissolve_b — middle-school boy from the art club (Itsuki), holding a paintbrush and a small crystal.
#25 lab_sus_dissolve_c — middle-school boy from the gardening club (Jun), straw hat, holding a small fertilizer bag.
#26 lab_sus_plant_a — young woman (Misaki) holding a watering can.
#27 lab_sus_plant_b — bearded man (Goro) in a warm vest, holding a thermometer.
#28 lab_sus_plant_c — quiet young cleaner (Yoru) holding a mop and a rolled black sheet.
#29 lab_sus_spring_a — greengrocer shop owner (Masa) with a towel headband, holding a daikon radish.
#30 lab_sus_spring_b — shop clerk woman (Riko) in an apron, holding a cleaning cloth.
#31 lab_sus_spring_c — young male regular customer (Toru) with a shopping bag.

========== GROUP C: World Chase — witnesses, stolen treasures, cover ==========
Witnesses [BUST], friendly people from around the world (mixed ages and backgrounds):
#32 witness_airport — airport staff member in a neat uniform and cap.
#33 witness_hotel — hotel front-desk clerk in a vest and bow tie.
#34 witness_market — outdoor market shopkeeper with an apron, fruit stall behind.
#35 witness_taxi — friendly taxi driver with a flat cap, steering wheel visible.
#36 witness_guide — museum guide holding a small flag and a guidebook.
#37 witness_traveler — backpacker traveler with a suitcase and a map.
Stolen treasures [ITEM]:
#38 item_w1 — a golden beckoning cat figurine (maneki-neko) with one paw raised.
#39 item_w2 — a tiny palm-sized antique globe on a brass stand.
#40 item_w3 — an old rolled star chart with constellations, slightly unrolled.
#41 item_w4 — an antique wooden music box, 100 years old, lid open.
#42 item_w5 — a single rainbow-colored postage stamp with perforated edges, on velvet.
#43 item_w6 — an old treasure map with a blank white card pinned to it.
#44 banner_world [ITEM] — a small yellow propeller airplane flying over a watercolor world map with dotted flight routes.

========== GROUP D: 30 cities [SCENE] — each famous landmark, daytime, inviting travel-postcard feel ==========
#45 city_tokyo — Sensoji Temple's Kaminarimon gate with the giant red lantern, cherry blossoms.
#46 city_beijing — the Great Wall winding over green mountains.
#47 city_seoul — Gyeongbokgung Palace with mountains behind.
#48 city_bangkok — the golden Temple of the Emerald Buddha (Wat Phra Kaew) roofs.
#49 city_singapore — the Merlion statue spouting water with the bay and skyline.
#50 city_delhi — the Taj Mahal reflected in a long pool.
#51 city_dubai — Burj Khalifa rising above the city with desert in the distance.
#52 city_cairo — the pyramids of Giza with camels, the desert under a blue sky.
#53 city_nairobi — savanna national park with giraffes and acacia trees, city skyline far away.
#54 city_capetown — Table Mountain with its flat top above the harbor.
#55 city_moscow — St. Basil's Cathedral with colorful onion domes.
#56 city_istanbul — Hagia Sophia with domes and minarets, the Bosphorus nearby.
#57 city_athens — the Parthenon on the Acropolis hill.
#58 city_rome — the Colosseum on a sunny day.
#59 city_paris — the Eiffel Tower seen from the Seine river.
#60 city_london — Big Ben and the Houses of Parliament by the Thames, red double-decker bus.
#61 city_madrid — a grand museum building with a plaza and fountains.
#62 city_berlin — the Brandenburg Gate.
#63 city_amsterdam — canal houses, a canal with boats and bicycles, a windmill.
#64 city_reykjavik — green northern lights over snowy mountains and a small town.
#65 city_newyork — the Statue of Liberty with the Manhattan skyline.
#66 city_losangeles — palm-lined boulevard with sunny hills.
#67 city_vancouver — Stanley Park's forest and seawall with mountains and the harbor.
#68 city_mexicocity — the Pyramid of the Sun at Teotihuacan.
#69 city_lima — Machu Picchu ruins on a misty mountain ridge.
#70 city_rio — the giant Christ statue on a mountain above the bay and beaches.
#71 city_buenosaires — colorful painted houses of the La Boca tango district.
#72 city_sydney — the Sydney Opera House and Harbour Bridge.
#73 city_auckland — green volcanic hills and the harbor with sailboats.
#74 city_honolulu — Waikiki Beach with Diamond Head and palm trees.

Start now with #1 to #4.
```

---

## Claude가 확인할 것 (받은 뒤 검수)

| 항목 | 기준 |
|---|---|
| A 갱단 8명 | 모자·소품·망토 색·취미 도구 **4가지가 표와 정확히 일치** (게임 추리가 이 4가지로 동작) |
| 공통 | 글자·로고·워터마크 없음, 한 장에 한 개, 지금 게임 화풍과 같은 수채화 |
| [FULL] | 회색 배경, 발끝까지 보임 → 배경 제거 후 투명 처리 |
| [SCENE] | 16:9, 실존 명소가 알아볼 수 있게 |

## 파일 → 게임 위치 (자동 처리: `tools/process_v2_art.py`)

| 그림 이름 | 게임 파일 | 크기 |
|---|---|---|
| `gang_*` | `assets/img/world/gang/*.webp` (배경 제거) | 512×768 |
| `witness_*` | `assets/img/world/witness/*.webp` | 384×384 |
| `item_*`, `banner_world` | `assets/img/world/items/*.webp`, `world/banner.webp` | 384×384 |
| `city_*` | `assets/img/world/cities/*.webp` | 960×540 |
| `lab_hero`, `lab_case_*`, `lab_sus_*` | `assets/img/lab/…` | 384 / 960×540 |
