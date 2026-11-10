# P1 아트 바이블 + ChatGPT 프롬프트 팩

**작성**: 2026-11-10 · 기준: `MASTER_PLAN_v2.md` v1.0 (D1·D4·D5·D6·D11)
**사용처**: ChatGPT 이미지 생성 (휴대폰에서도 진행 가능)
**산출물**: 캐릭터별 **개별 이미지 파일** (시트·콜라주 금지)

---

## 0. 진행 순서 (한눈에)

**2026-11-10 변경**: 반실사(B) 시안을 만들어 본 결과 게임과 어울리지 않아 **기존 지브리풍 수채 화풍 유지**로 확정. 사진은 쓰지 않는다.

| 순서 | 할 일 | 장수 | 올릴 기준 그림 |
|---|---|---|---|
| 1 | ハル 표정 5종 | 5 | `assets/characters/haru.png` |
| 2 | リオ 표정 5종 | 5 | `assets/characters/rio.png` |
| 3 | コラドン·コラリン 포즈 각 5종 | 10 | 설정 시트 2장 |
| 4 | 怪盗ブランク 2형태 | 2 | 설정 시트 2장 |

기본 이미지(idle)는 새로 만들지 않고 **지금 게임의 ハル·リオ 그림을 그대로** 쓴다 (P2에서 깨끗하게 다시 잘라 둠).
받은 그림은 이 채팅에 올리면 Claude가 먼저 검토한다.

---

## 1. 화풍 정의 (기존 화풍 유지)

| 항목 | 기준 |
|---|---|
| 한 줄 정의 | 지브리풍 수채 일러스트 — 기준 그림과 **완전히 같은 그림체** |
| 선·채색 | 얇고 부드러운 펜선, 수채 텍스처, 따뜻한 내추럴 톤 |
| 얼굴 | 큰 둥근 갈색 눈, 자연스럽게 흐트러진 검은 머리 |
| 포즈 | 전신 정면, 발끝까지 보이게, 기준 그림과 같은 크기·위치 |
| 배경 | **단색 중간 회색(#808080)** — 투명·흰색·체커보드 금지 (§5) |
| 금지 | 글자·로고·워터마크, 바닥 그림자, 잘린 발, 의상 변경 |

| 캐릭터 | 성격 | 의상 (기준 그림 그대로) |
|---|---|---|
| ハル | 차분·논리 추리 | 세이지그린 스웨터, 베이지 반바지, 흰 스니커즈, 초록 수첩 |
| リオ | 활발·관찰·직감 | 흑백 줄무늬 긴팔 티, 검은 바지, 흰 스니커즈 |

---

## 2. 프롬프트 — ハル 표정 5종

`haru.png` 를 **매번** 올리고, 아래 문장의 마지막 줄만 바꿔 한 장씩 만든다.

```
Use the attached image as the exact reference. Draw the SAME boy in the SAME art style
(soft Ghibli-like watercolor illustration, thin gentle outlines, warm natural colors).
Same face, same hair, same outfit, same body size and same position in the frame.
Full body, front view, feet fully visible. Portrait 1024x1536.
Background: plain flat solid medium gray (#808080) only. No checkerboard, no shadow, no text.
Change ONLY the facial expression and a small hand gesture:

[EXPRESSION]
```

| 파일명 | `[EXPRESSION]` |
|---|---|
| `haru_happy.png` | `Bright happy smile, eyes slightly squinting with joy.` |
| `haru_surprised.png` | `Surprised: eyes wide, mouth slightly open, eyebrows raised.` |
| `haru_thinking.png` | `Thinking: free hand on his chin, eyes looking slightly up.` |
| `haru_serious.png` | `Serious detective face: focused eyes, mouth closed firmly, pointing forward with one finger.` |
| `haru_cheer.png` | `Celebrating a correct answer: one fist raised, big confident grin.` |

---

## 3. 프롬프트 — リオ 표정 5종

`rio.png` 를 매번 올리고 §2와 같은 문장을 쓴다.

| 파일명 | `[EXPRESSION]` |
|---|---|
| `rio_calm.png` | `Calm gentle smile, arms relaxed at his sides.` |
| `rio_surprised.png` | `Very surprised: mouth open wide, both hands up near his face.` |
| `rio_thinking.png` | `Puzzled: head tilted, one finger on his cheek.` |
| `rio_found.png` | `"I found it!": pointing excitedly at something, eyes sparkling.` |
| `rio_cheer.png` | `Celebrating: both arms raised high, big grin.` |

---

## 4. 프롬프트 — コラドン·コラリン·怪盗ブランク

**기준 이미지**: `공통에셋\캐릭터\트윈정령\コラドン.png`, `コラリン.png` (설정 시트) — 매번 업로드
**절대 규칙**: 배의 비행기 마크 방향이 둘을 구분하므로 **좌우 반전 금지**. 디자인(색·뿔·꽃잎 목깃·눈)은 시트와 똑같이.
**화풍**: 정령은 기존 시트의 귀여운 화풍을 **그대로 유지** (사람 캐릭터와 달라도 됨 — 다른 세계의 존재라는 설정).

### 4-1. 공통 프롬프트

```
Use the attached character sheet as the exact design reference for [NAME].
Draw ONLY this one character, one single pose, as an individual image (not a sheet).

- Same design exactly: body color, horn, petal collar, sparkling eyes, blush,
  and the airplane mark on the belly in the SAME direction as the sheet (do not mirror).
- Pose: [POSE]
- Background: plain flat solid medium gray (#808080) only. No checkerboard, no text.
- Square 1024x1024, character centered, feet near the bottom with a small margin.
```

| 파일명 | `[NAME]` | `[POSE]` |
|---|---|---|
| `koradon_idle.png` | Koradon (yellow) | `Standing, relaxed, friendly smile.` |
| `koradon_hint.png` | Koradon | `Raising one hand with a small glowing light bulb above his head, cheerful "I have a hint!" face.` |
| `koradon_point.png` | Koradon | `Pointing to the left side with one hand, explaining.` |
| `koradon_happy.png` | Koradon | `Jumping with both arms up, eyes closed in joy.` |
| `koradon_worried.png` | Koradon | `Worried: hands together, eyebrows down, small sweat drop.` |
| `koralin_idle.png` | Koralin (mint green) | `Standing neatly, calm confident smile.` |
| `koralin_card.png` | Koralin | `Holding up a blank summary card with both hands, explaining.` |
| `koralin_think.png` | Koralin | `One hand on chin, thoughtful.` |
| `koralin_happy.png` | Koralin | `Small proud smile, one hand on hip, giving a thumbs-up.` |
| `koralin_strict.png` | Koralin | `Strict but cute: hands on hips, slightly puffed cheeks.` |

### 4-2. 怪盗ブランク (끝판대장 — 세 번째 정령)

> 업로드: 두 설정 시트

```
Design a third sibling spirit of the two attached twin characters, named "Blank".
Same body shape, size, petal collar and single horn as the twins, so he clearly
looks like their younger sibling.

- Form A (villain, but kid-friendly, not scary): deep indigo/charcoal body,
  a short dark cape, a small white domino mask, the horn slightly chipped.
  The belly mark is EMPTY: only a faint dotted outline where an airplane mark should be.
  Expression: lonely and stubborn rather than evil.
- Background: plain flat solid medium gray (#808080). Single character, single image, square 1024x1024, no text.
```

화해 후 형태 (Form B) — Form A 이미지를 업로드해서:

```
Same character as the attached image, after making peace with his siblings.
Body color changes to soft lavender, no cape and no mask, horn repaired.
The empty mark on his belly now shows a small airplane mark that is just beginning to appear
(lightly drawn). Shy, warm smile. Plain flat solid medium gray (#808080) background, square 1024x1024, no text.
```

파일명: `blank_villain.png`, `blank_friend.png`

---

## 5. 배경은 항상 회색으로

ChatGPT의 「투명 배경」은 체커보드 무늬를 그림으로 그려 넣는 경우가 많다 (예전 시리즈 4 문제의 원인).
그래서 **모든 그림을 단색 회색(#808080) 배경으로 받고**, `tools/process_art.py` 가 AI 배경 제거로 투명하게 만든다.
흰 배경은 쓰지 않는다 (흰 옷·흰 운동화·정령의 하이라이트가 같이 지워질 수 있음).

---

## 6. 받은 이미지 저장

| 항목 | 규칙 |
|---|---|
| 저장 위치 | `C:\Users\taise\OneDrive\Desktop\클로드코딩\harugame\haru-rio-detective\_art_inbox\` (PC에서 한꺼번에) |
| 파일명 | 위 표의 이름 그대로 (`haru_idle.png` 등) |
| 처리 | P2에서 Claude Code가 `_art_inbox` → 배경 제거·크기별 WebP 변환 → `assets/` 에 반영 (`_art_inbox`는 git 제외) |

휴대폰에서 만든 이미지는 ChatGPT 대화에 남아 있으니, PC에서 다운로드해 위 폴더에 넣으면 됩니다.

---

## 7. 검수 체크리스트 (Claude가 확인)

- [ ] 기준 그림과 같은 아이·같은 그림체로 보이는가
- [ ] 표정 6종이 같은 인물·같은 의상·같은 크기·같은 발 위치인가
- [ ] 손가락 5개, 발끝까지 보임, 잘린 부분 없음
- [ ] 글자·워터마크·체커보드·바닥 그림자 없음
- [ ] 정령: 비행기 마크 방향이 시트와 같은가 (반전 없음)
- [ ] 怪盗ブランク: 아이가 보기에 무섭지 않은가

**END**
