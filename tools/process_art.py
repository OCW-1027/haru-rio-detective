#!/usr/bin/env python3
"""캐릭터 그림 처리 파이프라인 (flood-fill 방식 대체).
  입력 폴더의 PNG/JPG/WebP → AI 배경 제거(rembg) → 여백 정리 → 투명 WebP.

사용법:
  pip install rembg onnxruntime pillow numpy scipy
  python tools/process_art.py _art_inbox assets/img/chars            # 사람 캐릭터 768x1152
  python tools/process_art.py _art_inbox assets/img/chars --size 768x768   # 정령 등 정사각

- 이미 투명 배경(알파)이 제대로 있는 그림은 배경 제거를 건너뛴다.
- 캐릭터는 캔버스 아래쪽 중앙에 발끝을 맞춰 배치 → 표정을 바꿔도 위치가 튀지 않는다.
"""
import sys, os, glob, argparse
import numpy as np
from PIL import Image
from scipy import ndimage

def has_real_alpha(im):
    if im.mode != 'RGBA': return False
    a = np.asarray(im)[..., 3]
    return (a < 8).mean() > 0.15 and ((a > 8) & (a < 247)).mean() < 0.08

def cutout(im, session):
    from rembg import remove
    out = remove(im.convert('RGB'), session=session, post_process_mask=True)
    arr = np.asarray(out).copy()
    a = arr[..., 3].astype(np.float32)
    # 가장자리 1px 안쪽으로 당겨 배경색 테두리(흰/회색 번짐) 제거
    a = ndimage.minimum_filter(a, size=3)
    a = ndimage.gaussian_filter(a, 0.6)
    # 본체에서 떨어진 작은 조각 제거
    lab, n = ndimage.label(a > 40)
    if n > 1:
        sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
        keep = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= sizes.max() * 0.01])
        a = np.where(keep | (a <= 40), a, 0) * (keep | (lab == 0))
    arr[..., 3] = np.clip(a, 0, 255).astype(np.uint8)
    return Image.fromarray(arr, 'RGBA')

def place(im, W, H, margin=0.03, fit=False):
    src_w, src_h = im.size
    bbox = im.getchannel('A').point(lambda v: 255 if v > 16 else 0).getbbox()
    im = im.crop(bbox)
    fit_s = min(W * (1 - 2 * margin) / im.width, H * (1 - 2 * margin) / im.height)
    # 기본: 원본 캔버스 대비 크기를 유지(캐릭터끼리 키 차이 보존). --fit 이면 캔버스에 꽉 채움.
    s = fit_s if fit else min(fit_s, min(W / src_w, H / src_h))
    im = im.resize((max(1, round(im.width * s)), max(1, round(im.height * s))), Image.LANCZOS)
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    canvas.alpha_composite(im, ((W - im.width) // 2, H - round(H * margin) - im.height))
    return canvas

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('dst')
    ap.add_argument('--size', default='768x1152')
    ap.add_argument('--quality', type=int, default=90)
    ap.add_argument('--fit', action='store_true', help='캔버스에 꽉 차게 확대')
    ap.add_argument('--force', action='store_true', help='알파가 있어도 배경 제거를 다시 한다')
    a = ap.parse_args()
    W, H = map(int, a.size.split('x'))
    os.makedirs(a.dst, exist_ok=True)
    session = None
    files = sorted(f for e in ('png', 'jpg', 'jpeg', 'webp') for f in glob.glob(os.path.join(a.src, '*.' + e)))
    for f in files:
        im = Image.open(f)
        im = im.convert('RGBA') if im.mode in ('RGBA', 'LA', 'P') else im.convert('RGB')
        if a.force or not has_real_alpha(im):
            if session is None:
                from rembg import new_session
                session = new_session('isnet-general-use')
            im = cutout(im, session); how = 'rembg'
        else:
            how = 'alpha-kept'
        out = os.path.join(a.dst, os.path.splitext(os.path.basename(f))[0] + '.webp')
        place(im, W, H, fit=a.fit).save(out, 'WEBP', quality=a.quality, method=6)
        print('%-28s %-10s -> %s (%dKB)' % (os.path.basename(f), how, out, os.path.getsize(out) // 1024))

if __name__ == '__main__':
    main()
