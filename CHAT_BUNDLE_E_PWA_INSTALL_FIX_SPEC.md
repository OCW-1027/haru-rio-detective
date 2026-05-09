# 하루게임 PWA — Install 강화 fix (Bundle E)

## 0. 컨텍스트

| 단계 | 상태 |
|---|---|
| Bundle C (PWA + FCM) | ✅ |
| Bundle D (페어링 리셋 fix) | ✅ |
| **Bundle E (PWA Install 강화)** | **이번** |

작업 폴더: `C:\Users\taise\Projects\harugame`

---

## 1. 문제

### 1-1. 증상

- 휴대폰 Chrome에서 사이트 접속 시 **「アプリをインストール」** 메뉴가 안 보임
- 「ホーム画面に追加」 메뉴만 보여서 단순 바로가기만 생성됨
- 단순 바로가기로 설치된 「PWA」는:
  - 별도 앱으로 등록되지 않음 (설정 → 앱 목록에 없음)
  - Chrome의 알림 권한에 종속
  - 백그라운드 푸시 차단됨

### 1-2. 원인

`manifest.json`에 다음 두 가지가 없어서 Chrome이 **「풍부한 PWA 설치 UI」**를 표시 안 함:

1. `screenshots` 필드 (PWA 설치 시 미리보기용)
2. `id` 필드 (PWA 고유 식별자)

DevTools Manifest 검증 결과:
```
⚠ Richer PWA Install UI won't be available on desktop.
   Please add at least one screenshot with the form_factor set to wide.
⚠ Richer PWA Install UI won't be available on mobile.
   Please add at least one screenshot for which form_factor is not set or set to a value other than wide.
```

---

## 2. 해결

### 2-1. manifest.json 수정

```json
{
  "name": "ハルゲーム",
  "short_name": "ハルゲーム",
  "id": "/haru-rio-detective/",
  "description": "ハル専用の学習ゲーム",
  "start_url": "/haru-rio-detective/",
  "scope": "/haru-rio-detective/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#fef9c3",
  "theme_color": "#fee500",
  "categories": ["education", "games"],
  "icons": [
    { "src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any" },
    { "src": "icons/icon-maskable-192.png", "sizes": "192x192", "type": "image/png", "purpose": "maskable" },
    { "src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ],
  "screenshots": [
    {
      "src": "icons/screenshot-mobile.png",
      "sizes": "540x720",
      "type": "image/png",
      "form_factor": "narrow",
      "label": "ハルゲーム メイン画面"
    },
    {
      "src": "icons/screenshot-desktop.png",
      "sizes": "1280x720",
      "type": "image/png",
      "form_factor": "wide",
      "label": "ハルゲーム デスクトップ画面"
    }
  ]
}
```

**추가 필드**:
- `id`: PWA 고유 식별자 (start_url과 동일하게 명시)
- `categories`: PWA 카테고리 (선택)
- `screenshots`: 모바일용(narrow) + 데스크톱용(wide) 각 1개 필수

### 2-2. 스크린샷 이미지 생성

`icons/screenshot-mobile.png` (540x720, narrow)
`icons/screenshot-desktop.png` (1280x720, wide)

PowerShell System.Drawing으로 생성. 디자인:
- **mobile (540x720, 세로)**:
  - 노란 배경 (#fee500)
  - 가운데 「ハル」 큰 텍스트 (검정, 200px 굵기)
  - 아래 「学習ゲーム」 작은 텍스트 (검정, 60px)
- **desktop (1280x720, 가로)**:
  - 노란 배경
  - 왼쪽에 「ハル」 + 「学習ゲーム」
  - 오른쪽에 노란 그라데이션 또는 단순 패턴

스크린샷이라기보다 **앱 미리보기 이미지** 역할. 실제 게임 화면 스크린샷은 아니지만 PWA 설치 UI 표시 조건만 충족.

⚠️ **추후 개선**: 5/15 이후 실제 게임 화면 스크린샷으로 교체 가능. 지금은 PWA 설치 가능 조건 충족이 최우선.

---

## 3. 변경 파일

```
manifest.json                           수정 (id + categories + screenshots 추가)
icons/screenshot-mobile.png             신규 (540x720)
icons/screenshot-desktop.png            신규 (1280x720)
CHAT_BUNDLE_E_PWA_INSTALL_FIX_SPEC.md   신규 (이 명세서)
```

---

## 4. 검증

### 4-1. PC DevTools Manifest 재확인

PC Chrome → F12 → Application → Manifest:
- `Errors and warnings` 섹션에 **screenshots 관련 경고 사라짐** 확인
- `Screenshots` 항목 추가되어 미리보기 표시됨

### 4-2. 휴대폰 Chrome 메뉴 확인

휴대폰 Chrome으로 사이트 접속 → 강제 새로고침 → 메뉴(⋮):
- ✅ **「アプリをインストール」** 또는 **「Install app」** 메뉴 표시됨
- 클릭 → PWA 설치 다이얼로그에 **스크린샷 미리보기 + 앱 정보** 표시
- 「インストール」 클릭

### 4-3. 설치 후 확인

휴대폰 설정 → 앱:
- ✅ **「ハルゲーム」** 별도 앱으로 표시됨
- 클릭 → 「알림」 → 알림 권한 ON

휴대폰 설정 → 알림 → 앱 알림:
- ✅ **「ハルゲーム」** 별도 항목 표시됨

### 4-4. 푸시 테스트

설치된 PWA 아이콘으로 ハルゲーム 실행 → 풀스크린 → 푸시 토글 ON → 「✓ 有効」.

PC에서 메시지 송신:
- ✅ 휴대폰 잠금 화면에 **시스템 알림** 표시
- ✅ 알림 영역에 누적

---

## 5. Git 작업

```bash
git add manifest.json icons/screenshot-mobile.png icons/screenshot-desktop.png \
        CHAT_BUNDLE_E_PWA_INSTALL_FIX_SPEC.md
git commit -m "fix(pwa): add screenshots and id field for richer install UI

Bug: Chrome's 'Install app' menu was not appearing on Android, only
'Add to Home screen' (which creates a simple bookmark, not a real PWA).
This prevented background push notifications because the resulting
'app' was just a Chrome shortcut, not a separately registered PWA.

Fix:
- Added 'screenshots' field with mobile (narrow) and desktop (wide)
  variants — required for richer install UI
- Added 'id' field (= start_url) for explicit PWA identity
- Added 'categories' for PWA store classification
- Generated placeholder screenshot PNGs (540x720 + 1280x720) using
  System.Drawing — yellow background with 'ハル' text

After this fix:
- 'Install app' menu appears in Chrome on Android
- PWA installs as a separate app (visible in Settings > Apps)
- Notifications work in true background (lock screen, other apps)
- Resolves Galaxy S24 push notification issue"
git push origin main
```

---

## 6. 비고

### 6-1. 기존 사용자

이미 「ホーム画面に追加」로 단순 바로가기 만든 사용자는:
1. 기존 바로가기 제거
2. 사이트 재접속 → 새 「アプリをインストール」 메뉴로 정식 설치

### 6-2. 5/15 자녀 페어링 시

자녀 태블릿에서:
1. Chrome으로 ハルゲーム 사이트 접속
2. **「アプリをインストール」** 메뉴 사용 (「ホーム画面に追加」 X)
3. 설치 후 홈화면 아이콘 클릭으로 풀스크린 실행
4. 페어링 + 푸시 토글 ON

### 6-3. iOS 호환성

iPhone Safari는 manifest 일부 지원이 부족. 다만:
- iOS 16.4+: 홈화면 추가 후 푸시 가능
- 사용자가 iPhone 사용 시 별도 안내 필요

자녀가 안드로이드 태블릿이면 무관.
