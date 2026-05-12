# SERIES4 CONTENT WORK — HANDOFF

**작성일**: 2026-05-10
**대상**: 다음 채팅 세션의 Claude.ai (이 문서를 첫 메시지로 사용)
**목적**: 시리즈 4 「偉人科学者ファイル」 본격 콘텐츠 작업 시작
**선행 완료**: 골격 + 자산 통합 (commit 7c5e2b4)

---

## 0. 새 세션 시작 가이드

이 문서를 작업 폴더(`C:\Users\taise\Projects\harugame`) 루트에 저장하고, 새 채팅 세션에서 다음 한 줄로 시작:

```
SERIES4_CONTENT_HANDOFF.md를 정독하고, 시리즈 4 사건 1 「린고박사·만유인력」 
본격 콘텐츠 명세서(SERIES4_CONTENT_SPEC.md)를 작성해줘.
```

또는 더 단순하게:

```
하루게임 시리즈 4 콘텐츠 작업 시작. 작업폴더의 SERIES4_CONTENT_HANDOFF.md 
참고해서 진행해줘.
```

---

## 1. 현재 상태 (2026-05-10)

### 완료된 것
- 시리즈 4 골격 (commit `7c5e2b4`): 탭·페이지·State·그리드·라우터 모두 동작
- 자산 26개 PNG (commit `c4485b8` + `6596c38`): characters/series04 + backgrounds/series04
- 신규 메인 캐릭터: ヒナタ(여아 모범생) + ペンタ(펭귄 마스코트)
- 시리즈 4 안에서 ペンタ는 안경 모드(penta_series04)
- 시각 디자인: 시리즈 9 패턴 미러링 (카드 일러스트 = 사건 배경, 헤더 깨끗)

### 미완료 (이번 세션 작업 대상)
- 모든 챕터 `comingSoon: true` (placeholder)
- intro·steps·트릭·NPC 대사 = 빈 문자열 또는 빈 배열
- 학습 자료 = `null`
- 챕터 퀴즈 = 미작성

### 작업 폴더 구조
```
C:\Users\taise\Projects\harugame\
├─ data/
│   ├─ series4-scientists.js          ← 이번 세션의 주 편집 대상
│   ├─ series11-math.js                ← 미러링 원본
│   └─ series11-math-learn.js          ← 학습 자료 미러링 원본
├─ engine/
│   ├─ detectives-B.js                 ← buildScientistsGrid + startScientistsCase
│   ├─ math-learn.js                   ← 학습 모달 로직 (시리즈 11)
│   └─ ...
├─ assets/
│   ├─ characters/series04/            ← 10 NPC PNG
│   └─ backgrounds/series04/           ← 11 배경 PNG
└─ SERIES4_CONTENT_HANDOFF.md          ← 이 문서
```

---

## 2. 사건 메타 (이미 결정됨, 변경 불가)

| # | 사건명 | 주인공 NPC | 배경 | 테마 |
|---|---|---|---|---|
| 1 | 落ちる林檎の真実 | `ringo_hakase` | `bg_ch01_apple` | 万有引力·三法則 |
| 2 | 時間を操る秘密 | `shiraga_ein` | `bg_ch02_blackboard` | 相対性理論 |
| 3 | 光る石の秘密 | `hikari_curie` | `bg_ch03_radium` | 放射能 |
| 4 | 島々の鳥たち | `darwin_voyager` | `bg_ch04_beagle` | 進化論 |
| 5 | 見えない敵の正体 | `pasteur_micro` | `bg_ch05_microbiology` | 細菌学 |
| 6 | エンドウ豆の法則 | `mendel_pea` | `bg_ch06_monastery` | 遺伝法則 |
| 7 | 天空の真実 | `galileo_telescope` | `bg_ch07_observatory` | 天体観測 |
| 8 | 電気と磁気の関係 | `faraday_coil` | `bg_ch08_electricity` | 電磁気学 |
| 9 | 原子の中の世界 | `bohr_atom` | `bg_ch09_physics` | 原子模型 |
| 10 | 偉人たちの調和 (보스) | `togo_kenja` | `bg_ch10_boss` | 종합 |

각 사건의 NPC 이름·배경·테마는 그대로 유지. 본격 콘텐츠(스토리·트릭·학습)만 채움.

---

## 3. 미러링 기준 (필수 정독)

### 데이터 구조 미러링
**`data/series11-math.js`의 `MATH_STORY[0]` (사건 1) 풀 구조 정독 → 시리즈 4 사건 1에 그대로 적용**

특히 다음 키들의 정확한 형태 확인:
- `id`, `title`, `subtitle`, `icon`, `theme` ← 골격에 이미 있음
- `intro` (사건 도입 텍스트)
- `steps` (단계별 진행 데이터)
- `learn` (학습 자료 참조 또는 직접 데이터)
- `note` (사건 종료 후 결말)
- `comingSoon: false` (placeholder 해제)

### 학습 자료 미러링
**`data/series11-math-learn.js` + `engine/math-learn.js` 정독 → 시리즈 4용 동일 패턴**

학습 자료 6섹션 구조 (시리즈 10·11 동일):
1. **概念** (개념 설명, 본격 텍스트)
2. **SVG 도해** 3~5개 (시각화)
3. **공식·표** (정리표)
4. **暗記카드** 8~10장 (앞면·뒷면 형식)
5. **객관식 10문제** (실력 점검)
6. **コツ・解き方** 8~10포인트 (시험 팁)

신규 파일 작성 예상:
- `data/series4-scientists-learn.js` (학습 자료 데이터)
- `engine/scientists-learn.js` (학습 모달 로직, math-learn.js 미러링)

### 그리드/사건 진행 미러링
**`engine/detectives-B.js`의 `buildMathGrid` + `startMath` + `mathStep` + `mathFinish` 흐름 정독**

이미 `buildScientistsGrid`와 `startScientistsCase`(stub)가 들어있음. stub을 풀버전으로 확장 + `scientistsStep`, `scientistsFinish` 추가 필요.

---

## 4. 작업 우선순위 — 사건 1부터 1개씩

### 한 번에 1사건씩 작성·검증·push
silent failure 방지 (시리즈 11 작업 교훈, 메모리 #8 참조). 절대 10사건을 한 번에 작성하지 말 것.

```
[Phase 1] 사건 1 「린고박사·만유인력」
  ├─ SERIES4_CONTENT_SPEC.md 작성 (이 세션의 첫 산출물)
  ├─ Claude Code에 위탁 → series4-scientists.js의 사건 1만 풀버전
  ├─ 학습 자료 (series4-scientists-learn.js + scientists-learn.js)
  ├─ 사건 진행 함수 (detectives-B.js의 startScientistsCase 풀버전)
  ├─ 브라우저 검증 + 회귀 테스트 (시리즈 3 절대 untouched)
  └─ commit + push
  
[Phase 2~10] 사건 2~10 (각 같은 흐름)
```

각 Phase 완료 후 push까지 하고 다음 Phase 시작.

---

## 5. 챕터 본격 콘텐츠 — 사건 1 작성 가이드

### 사건 1 「落ちる林檎の真実」

**무대**: 17세기 영국 시골 농장 (사과나무 정원)
**주인공 NPC**: `ringo_hakase` (린고박사 = 뉴턴 모티브 가상 캐릭터)
**테마**: 万有引力·三法則 (운동 3법칙 + 만유인력)
**자녀 학습 목표**: 영검 2급 수준의 과학 + 일본 중학교 物理 기초

### 콘텐츠 깊이 기준
- 자녀 타겟: 큰자녀 하루(초4, 영검 2급, 도전적 콘텐츠 선호)
- 단순화·작은자녀 친화 배려 불필요 (메모리 #3)
- 깊이 있는 추리 + 정확한 과학 + 한자·한자읽기 적절히

### 트릭/추리 구조
시리즈 11(数学) 사건들의 「관문·증거·범인 추리」 패턴 미러링. 사건 1의 경우:
- 「왜 사과는 떨어지는가」를 추리하는 흐름
- 증거 모으기 → 가설 검증 → 진실 발견
- 보조 캐릭터(ハル·リオ·ヒナタ·ペンタ) 적절히 등장

### 학습 자료 6섹션 — 사건 1 예시
1. **概念**: 万有引力·三法則 본격 설명 (질량·중력·관성·작용반작용)
2. **SVG 도해**: 사과 떨어지는 그림, 달의 공전, 작용반작용 화살표 등 3~5개
3. **공식·표**: F=ma, F=GmM/r², 운동 3법칙 표
4. **암기카드 8~10장**: 「만유인력 상수 G」, 「제1법칙=관성」 등
5. **객관식 10문제**: 영검 2급 수준 + 일본 중학 物理 기초
6. **コツ**: 「공식 외우는 법」, 「힘의 방향 헷갈리지 않는 법」 등 8~10포인트

---

## 6. 절대 하지 말 것 (CRITICAL)

- ❌ 시리즈 3 (data/series3-science.js, engine/detectives-A.js) 절대 건드리지 말 것
- ❌ 시리즈 1, 2, 5~11의 .js 파일 수정 금지 (자녀 사용 중)
- ❌ engine/ 폴더 핵심 엔진 파일(core.js·story.js)을 시리즈 11 패턴 외 영역까지 수정
- ❌ assets/ 폴더 안의 PNG 이동·삭제·이름 변경
- ❌ 채팅 기능(chat-*.js, manifest.json, sw.js, functions/)·영어학습 탭(vocab-learn.js) 수정
- ❌ 한 번에 사건 2개 이상 작성 (silent failure 위험)
- ❌ ハル·リオ base64 이미지 변경

---

## 7. 작업 워크플로우 (메모리 #11 따름)

```
[Claude.ai 세션]
  ├─ 사건 1 콘텐츠 명세서(SERIES4_CONTENT_SPEC.md) 작성
  └─ 사용자가 작업 폴더 루트에 저장

[Claude Code 세션]
  ├─ 명세서 정독 + 시리즈 11 사건 1 정독
  ├─ data/series4-scientists.js 사건 1만 본격 작성
  ├─ data/series4-scientists-learn.js (학습 자료)
  ├─ engine/scientists-learn.js (학습 모달 로직)
  ├─ engine/detectives-B.js의 startScientistsCase 풀버전
  ├─ 단계별 콘솔 검증 + 브라우저 검증
  ├─ 회귀 테스트 (시리즈 3 + 1·9·10·11 + 채팅 + 영어학습)
  └─ commit + push (한 사건당 한 commit)

[검증 후 본인 PC]
  ├─ GitHub Pages에서 시리즈 4 사건 1 정상 동작 확인
  ├─ 학습 자료 6섹션 표시·내용 검증
  └─ 자녀에게 슬쩍 「새 사건 풀어볼래?」 제안

[Claude.ai로 결과 공유]
  └─ 사건 2 작업으로 넘어감
```

---

## 8. 권한 요청 가이드 (메모리 #11)

| 명령 | 옵션 |
|---|---|
| 파일 읽기/쓰기 (작업 폴더 내) | 옵션 2 (자동 허용) |
| `git add` | 옵션 2 |
| `git commit -m` | **옵션 1 (이번만)** |
| `git push` | **옵션 1 (이번만)** |
| 외부 사이트 접근 | 옵션 1 또는 거부 |

---

## 9. 신규 시리즈 작업 시 시각 디자인 원칙 (메모리 #16)

이번엔 골격이 이미 완성되어 있어서 시각 변경 거의 없음. 다만 새 시리즈 추가 시:
- ✅ 챕터 카드 일러스트 = 그 사건의 **배경 이미지** (NPC 아님)
- ✅ NPC는 사건 진행 화면에서만 등장 (`SCIENTISTS_STORY[i].charKey`로 보존)
- ✅ 챕터 그리드 헤더는 배경 이미지 없이 깨끗
- ✅ 명세서 작성 전 `data/series9-money.js` + `buildMoneyGrid` 정독

---

## 10. 예상 작업량 (참고)

사건 1개당:
- SERIES4_CONTENT_SPEC.md (사건 1만): Claude.ai 30~45분
- 코드 작성·검증: Claude Code 1~2시간
- 사용자 본인 PC 검증: 15분
- 합계: 약 2~3시간/사건

10사건 전체: 약 20~30시간 (수일~수주에 분산 권장)

「시간 압박 없이 품질 우선」 (메모리 #9) — 자녀가 빨리 받지 못해도 OK.

---

## 11. 의문 사항 / 미결정 사항

새 세션에서 SERIES4_CONTENT_SPEC.md 작성 시 사용자에게 확인할 점:

1. **사건 1의 ヒナタ 등장 비중** — ハル·リオ만으로 충분한지, ヒナタ도 함께 등장시킬지
2. **린고박사의 캐릭터성** — 실명 뉴턴이 아닌 가상 「린고박사」, 인격·말투 어떻게?
3. **학습 자료 깊이** — 영검 2급 + 중학 物理 기초로 충분한지, 高校 物理 기초까지 가야 하는지
4. **사건 1 추리 트릭** — 단순 「왜 떨어지나」가 아닌 어떤 미스터리 구조로 갈지

이 4가지는 새 세션에서 사용자와 결정 후 명세서 작성.

---

## 12. 핵심 메모리 참조

이미 메모리에 저장된 항목 (새 세션이 자동 인지):
- #1 시리즈 진행 상태 (시리즈 4 골격 ✓)
- #3 자녀 타겟 (큰자녀 하루, 초4, 영검2급, 도전적)
- #5 작업 폴더 + 모듈 구조
- #8 silent failure 방지 (한 번에 1사건씩)
- #9 가치관 (시간 압박 없이 품질 우선)
- #11 워크플로우 (Claude.ai 명세 + Claude Code 코드)
- #14 아트 스타일 (지브리풍 수채화)
- #15 시리즈 4 골격 정보
- #16 시각 디자인 원칙
- #17 시리즈 1 「관문 1/15」 회귀 아님 (참고)

---

## 13. 본 세션의 성과 (참고)

```
2026-05-10 작업 결과:
  - commit c4485b8: 옛 명세 archive + 자산 26개 PNG add
  - commit 6596c38: penta_series03 → penta_series04 rename
  - commit 7c5e2b4: feat(series04): create new series "偉人科学者ファイル"
                    8 files changed, 1088 insertions(+)

작업한 명세서:
  - SERIES4_NEW_CREATION_SPEC.md (골격 작업, 작업 폴더에 보관)

다음 작성할 명세서:
  - SERIES4_CONTENT_SPEC.md (사건 1 본격 콘텐츠, 새 세션의 첫 산출물)
```

---

**END OF HANDOFF**

이 문서는 시리즈 4 본격 콘텐츠 작업의 출발점입니다. 새 세션은 이 문서를 정독하고 사건 1부터 1개씩 깊이 있게 작성해주세요.
