# 캐릭터 표정·포즈 — Gemini 지시서 (P1 아트 바이블을 Gemini용으로 통합)

**용도**: 메인 스토리(怪盗ブランク·知のカケラ)와 사건 대화 장면에 쓰는 캐릭터 그림
**총 22장**

| 캐릭터 | 내용 | 장수 |
|---|---|---|
| ハル | 표정 | 5 |
| リオ | 표정 | 5 |
| コラドン | 포즈 | 5 |
| コラリン | 포즈 | 5 |
| 怪盗ブランク | 2형태 (악당 / 화해 후) | 2 |

**기본 그림(idle)**: 새로 만들지 않고 지금 게임의 그림을 그대로 씁니다.

## 사용법

1. Gemini **새 채팅**에 아래 4장을 **이 순서대로** 첨부합니다. 모두 PC의 게임 폴더 안에 있습니다.
   1. `assets\characters\haru.png` — ハル
   2. `assets\characters\rio.png` — リオ
   3. `assets\img\chars\spirits\koradon_idle_01.webp` — コラドン
   4. `assets\img\chars\spirits\korarin_idle_01.webp` — コラリン
2. 아래 「붙여넣기 블록」을 통째로 붙여넣습니다. 4장씩 그리고 멈추면 `next`를 입력합니다.
3. 얼굴이나 옷이 기준 그림과 달라지면 `#3 again — keep the face and outfit exactly like reference 1`처럼 다시 요청합니다.
4. 받은 그림은 지난번처럼 `_art_inbox\v2\`에 `#01_haru_happy.png` 형식으로 저장합니다.
5. PC와 연결된 채팅에서 알려 주세요. 회색 배경을 지워 투명하게 만들고 게임에 넣겠습니다.

**怪盗ブランク 화해 후(#22)**: #21 그림이 마음에 들면, #22를 그리기 전에 #21을 다시 첨부해 주시면 같은 캐릭터로 더 잘 나옵니다.

---

## 붙여넣기 블록

```
You are the character artist for a children's detective learning game. I attached 4 reference images:
  Reference 1 = HARU (older brother, calm logical detective): sage-green knit sweater, beige shorts, white sneakers,
                holds a green notebook.
  Reference 2 = RIO (younger brother, lively and observant): black-and-white striped long-sleeve T-shirt,
                black pants, white sneakers.
  Reference 3 = KORADON (yellow twin spirit, cheerful hint-giver): round yellow body, orange cone horn,
                orange petal collar, big sparkling navy eyes, pink cheeks, ORANGE airplane mark on the belly
                flying up to the RIGHT with a dashed trail on its LEFT.
  Reference 4 = KORARIN (mint-green twin spirit, smart summarizer): same body shape, mint-green color,
                orange cone horn and petal collar, WHITE airplane mark on the belly flying up to the LEFT with
                a dotted trail on its RIGHT.

ABSOLUTE RULES (every image):
- Draw the SAME character as the named reference, in EXACTLY the same art style (the boys: soft Ghibli-like
  watercolor, thin gentle outlines, warm natural colors; the spirits: their own cute glossy style).
- Same face, same hair, same outfit, same colors, same body proportions. Never change clothes.
- Never mirror the spirits: the airplane mark direction must stay exactly as described above.
- ONE character, ONE image per item (never a sheet, grid or collage).
- Full body, front view, whole body from head to toe visible with a small margin.
- Background: plain flat solid medium gray (#808080) only. No checkerboard, no floor shadow,
  no text, letters, logos or watermarks.
- Boys: portrait 2:3, same size and position as the reference. Spirits: square 1:1, character centered.
- Before each image write only its number and file name as plain text (for example "#3 haru_thinking").
- Draw up to 4 items per reply, then wait until I say "next".

========== HARU (Reference 1) — change ONLY the facial expression and a small hand gesture ==========
#1 haru_happy — bright happy smile, eyes slightly squinting with joy.
#2 haru_surprised — surprised: eyes wide, mouth slightly open, eyebrows raised.
#3 haru_thinking — thinking: free hand on his chin, eyes looking slightly up.
#4 haru_serious — serious detective face: focused eyes, mouth firmly closed, pointing forward with one finger.
#5 haru_cheer — celebrating a correct answer: one fist raised, big confident grin.

========== RIO (Reference 2) — change ONLY the facial expression and a small hand gesture ==========
#6 rio_calm — calm gentle smile, arms relaxed at his sides.
#7 rio_surprised — very surprised: mouth open wide, both hands up near his face.
#8 rio_thinking — puzzled: head tilted, one finger on his cheek.
#9 rio_found — "I found it!": pointing excitedly at something, eyes sparkling.
#10 rio_cheer — celebrating: both arms raised high, big grin.

========== KORADON (Reference 3) — single pose each ==========
#11 koradon_idle2 — standing, relaxed, friendly smile.
#12 koradon_hint — raising one hand with a small glowing light bulb above his head, cheerful "I have a hint!" face.
#13 koradon_point — pointing to the left side with one hand, explaining.
#14 koradon_happy — jumping with both arms up, eyes closed in joy.
#15 koradon_worried — worried: hands together, eyebrows down, a small sweat drop.

========== KORARIN (Reference 4) — single pose each ==========
#16 korarin_idle2 — standing neatly, calm confident smile.
#17 korarin_card — holding up a blank summary card with both hands, explaining.
#18 korarin_think — one hand on chin, thoughtful.
#19 korarin_happy — small proud smile, one hand on hip, giving a thumbs-up.
#20 korarin_strict — strict but cute: hands on hips, slightly puffed cheeks.

========== PHANTOM THIEF "BLANK" — the twins' younger sibling spirit (final boss, kid-friendly) ==========
#21 blank_villain — a THIRD sibling of the twins (References 3 and 4): same body shape, size, single cone horn and
    petal collar, so he clearly looks like their younger brother. Deep indigo / charcoal body, a short dark cape,
    a small white domino mask, the horn slightly chipped. The belly mark is EMPTY: only a faint dotted outline where
    an airplane mark should be. Expression: lonely and stubborn rather than evil. Not scary. Square 1:1.
#22 blank_friend — the SAME character as #21 after making peace with his siblings: body color changes to soft
    lavender, no cape and no mask, horn repaired. The empty mark on his belly now shows a small airplane mark that is
    just beginning to appear (lightly drawn). Shy, warm smile. Square 1:1.

Start now with #1 to #4.
```

---

## Claude 검수 기준

| 항목 | 기준 |
|---|---|
| 인물 일치 | 기준 그림과 같은 아이·같은 옷·같은 화풍 |
| 손과 몸 | 손가락 5개, 발끝까지 보임 |
| 배경 | 회색 단색 (체커보드·그림자·글자 없음) |
| 정령 | 배의 비행기 마크 방향이 기준과 같음 (반전 금지) |
| 怪盗ブランク | 아이가 보기에 무섭지 않음 |
