"""
시리즈 4 캐릭터 PNG 13개의 흰 배경을 flood-fill 방식으로 알파화.

처리 흐름 (사용자 명세):
1) PNG → RGBA 변환 (모든 픽셀 alpha=255)
2) 흰색 마스크: R>=240 AND G>=240 AND B>=240
3) 이미지 4 모서리에서 시작하는 connected component (scipy.ndimage.label) 로
   외곽 배경 영역만 추출 — 캐릭터 내부의 닫힌 흰 영역은 보존
4) 외곽 영역의 알파를 0 으로 설정
5) 안티앨리어싱 경계 처리: 채널 평균이 220~239 인 픽셀 중 외곽 영역에 인접한 것은
   밝기에 비례해 알파 점진 (밝을수록 더 투명)

원본은 assets/_backup_series04_chars/ 로 백업한 뒤 in-place 갱신.
"""

import sys
import shutil
import struct
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
BACKUP_DIR = ROOT / "assets" / "_backup_series04_chars"

# 처리 대상 13개 (사용자 명세)
TARGETS = [
    "assets/characters/hinata.png",
    "assets/characters/penta.png",
    "assets/characters/penta_series04.png",
    "assets/characters/series04/bohr_atom.png",
    "assets/characters/series04/darwin_voyager.png",
    "assets/characters/series04/faraday_coil.png",
    "assets/characters/series04/galileo_telescope.png",
    "assets/characters/series04/hikari_curie.png",
    "assets/characters/series04/mendel_pea.png",
    "assets/characters/series04/pasteur_micro.png",
    "assets/characters/series04/ringo_hakase.png",
    "assets/characters/series04/shiraga_ein.png",
    "assets/characters/series04/togo_kenja.png",
]

# 임계값
HARD_WHITE = 240    # 이 이상은 확실한 흰 배경 후보 (외곽 flood-fill 의 traversable)
SOFT_LOW   = 200    # 안티앨리어싱 경계 하한 (회색·살짝 채도 있는 가장자리도 포함)
SOFT_HIGH  = 252    # 안티앨리어싱 경계 상한 (포함; 253~255 는 hard 영역 그대로)
EROSION_PX = 1      # 외곽 마스크 erosion 두께 (캐릭터 경계 안쪽으로 살짝 들여 부드럽게)


def png_color_type(path: Path) -> int:
    """IHDR 의 color type byte (offset 25)."""
    with open(path, "rb") as f:
        return f.read(26)[25]


def process(path: Path) -> dict:
    raw = Image.open(path)
    pre_color_type = png_color_type(path)

    rgba = raw.convert("RGBA")
    arr = np.array(rgba, dtype=np.uint8)
    H, W, _ = arr.shape
    total = H * W

    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    pre_white = int(np.sum((r >= HARD_WHITE) & (g >= HARD_WHITE) & (b >= HARD_WHITE)))

    # 1. 흰색 마스크 (hard) — 외곽 flood-fill 의 traversable 영역
    hard_mask = (r >= HARD_WHITE) & (g >= HARD_WHITE) & (b >= HARD_WHITE)

    # 2. connected components — 4 모서리가 속한 컴포넌트만 외곽 배경
    labels, n_labels = ndimage.label(hard_mask)
    corner_labels = {
        labels[0, 0],
        labels[0, W - 1],
        labels[H - 1, 0],
        labels[H - 1, W - 1],
    }
    corner_labels.discard(0)  # 0 = 배경 라벨 (=흰색 아닌 픽셀)

    if not corner_labels:
        # 모서리에 흰색이 없는 경우 — 단색 배경이 아닐 가능성, 처리 안 함
        outside_raw = np.zeros_like(hard_mask, dtype=bool)
    else:
        outside_raw = np.isin(labels, list(corner_labels))

    # 2.5 외곽 마스크 1px erosion — 캐릭터 경계를 안쪽으로 살짝 들여 부드럽게 fade
    struct_3x3 = np.ones((3, 3), dtype=bool)
    if np.any(outside_raw):
        outside = ndimage.binary_erosion(outside_raw, structure=struct_3x3, iterations=EROSION_PX)
    else:
        outside = outside_raw

    # 3. 외곽 영역(eroded)의 알파를 0 으로
    new_a = a.copy()
    new_a[outside] = 0

    # 4. 안티앨리어싱: outside(eroded) 1px 인접 + 원래 outside 의 erosion 으로 풀려난
    #    가장자리 ring 영역에 대해, RGB 평균이 SOFT_LOW~SOFT_HIGH 인 픽셀 점진 알파.
    if np.any(outside) or np.any(outside_raw):
        dilated   = ndimage.binary_dilation(outside, structure=struct_3x3, iterations=EROSION_PX + 1)
        edge_band = dilated & ~outside  # outside_eroded 바깥 1~2px ring (eroded ring + 그 너머)

        soft_mask = (
            edge_band
            & (r >= SOFT_LOW) & (r <= SOFT_HIGH)
            & (g >= SOFT_LOW) & (g <= SOFT_HIGH)
            & (b >= SOFT_LOW) & (b <= SOFT_HIGH)
        )

        if np.any(soft_mask):
            mean_rgb = (
                r[soft_mask].astype(np.int32)
                + g[soft_mask].astype(np.int32)
                + b[soft_mask].astype(np.int32)
            ) // 3
            # mean=SOFT_LOW(200) → alpha≈255 (거의 불투명)
            # mean=SOFT_HIGH(252) → alpha≈0    (거의 투명)
            t = (mean_rgb - SOFT_LOW) / max(1, (SOFT_HIGH - SOFT_LOW))
            t = np.clip(t, 0.0, 1.0)
            ramp_alpha = (255 * (1.0 - t)).astype(np.uint8)
            new_a[soft_mask] = ramp_alpha

    arr[..., 3] = new_a
    out = Image.fromarray(arr, mode="RGBA")
    out.save(path, format="PNG", optimize=True)

    post_color_type = png_color_type(path)
    post_alpha0 = int(np.sum(new_a == 0))
    post_alpha255 = int(np.sum(new_a == 255))
    post_alpha_mid = total - post_alpha0 - post_alpha255

    # 캐릭터 내부 흰 영역 보존 여부: 이미지 중앙 1/3 영역의 흰 픽셀 중 alpha=255 비율
    cy0, cy1 = H // 3, H - H // 3
    cx0, cx1 = W // 3, W - W // 3
    center_white = (
        (r[cy0:cy1, cx0:cx1] >= HARD_WHITE)
        & (g[cy0:cy1, cx0:cx1] >= HARD_WHITE)
        & (b[cy0:cy1, cx0:cx1] >= HARD_WHITE)
    )
    center_white_total = int(np.sum(center_white))
    center_white_kept = int(np.sum(center_white & (new_a[cy0:cy1, cx0:cx1] == 255)))

    return dict(
        total=total,
        pre_color_type=pre_color_type,
        pre_white=pre_white,
        post_color_type=post_color_type,
        post_alpha0=post_alpha0,
        post_alpha255=post_alpha255,
        post_alpha_mid=post_alpha_mid,
        center_white_total=center_white_total,
        center_white_kept=center_white_kept,
    )


def main() -> int:
    BACKUP_DIR.mkdir(parents=True, exist_ok=True)
    print(f"백업 폴더: {BACKUP_DIR}")
    print(f"대상 파일: {len(TARGETS)}개\n")

    for rel in TARGETS:
        src = ROOT / rel
        if not src.exists():
            print(f"⚠ MISSING: {rel}")
            continue

        # 백업 (충돌 방지를 위해 폴더 구조 평탄화: 'series04__' prefix)
        flat_name = rel.replace("assets/characters/", "").replace("/", "__")
        backup = BACKUP_DIR / flat_name
        if not backup.exists():
            shutil.copy2(src, backup)

        info = process(src)
        print(f"📄 {rel}")
        print(
            f"  전: colorType={info['pre_color_type']:>1} "
            f"흰픽셀={info['pre_white']:>7} / {info['total']:>7}"
        )
        print(
            f"  후: colorType={info['post_color_type']:>1} "
            f"alpha=0:{info['post_alpha0']:>7} "
            f"alpha=255:{info['post_alpha255']:>7} "
            f"중간:{info['post_alpha_mid']:>5}"
        )
        kept_pct = (
            (info['center_white_kept'] / info['center_white_total'] * 100)
            if info['center_white_total'] else 100.0
        )
        print(
            f"  내부 흰 보존: {info['center_white_kept']:>6} / {info['center_white_total']:>6} "
            f"({kept_pct:.1f}%)"
        )
        print()

    return 0


if __name__ == "__main__":
    sys.exit(main())
