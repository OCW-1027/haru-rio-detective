#!/usr/bin/env python3
"""v2 새 콘텐츠(세계추적·라보탐정) 그림 처리.
  _art_inbox/v2/<이름>.png  →  assets/img/world/… , assets/img/lab/…  (WebP)

이름 규칙 (docs/GEMINI_ART_REQUEST.md 의 파일명):
  gang_<id>         ブランク団 전신 (회색 배경 → 배경 제거)   → world/gang/<id>.webp      512x768 투명
  witness_<role>    증인 상반신                                → world/witness/<role>.webp 384x384
  item_<caseid>     도난품                                     → world/items/<caseid>.webp 384x384
  banner_world      世界追跡 표지                               → world/banner.webp         384x384
  city_<cityid>     도시 풍경                                  → world/cities/<id>.webp    960x540
  lab_hero          ラボ探偵 표지                               → lab/hero.webp             384x384
  lab_case_<id>     사건 장면                                  → lab/case_<id>.webp        960x540
  lab_sus_<case>_<s>  라보 용의자 상반신                        → lab/sus_<case>_<s>.webp   384x384
  int_<cardid>_<n>  英検 面接 イラスト (コマ)                  → eiken/int/<cardid>_<n>.webp 640x480

사용법:
  pip install pillow numpy scipy rembg onnxruntime
  python tools/process_v2_art.py _art_inbox/v2
"""
import sys, os, glob, re
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')

def cover(im, W, H, top_bias=0.5):
    """비율을 유지한 채 W x H 를 꽉 채우도록 자른다 (top_bias: 0=위쪽 기준, 0.5=가운데)."""
    s = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x = (im.width - W) // 2
    y = round((im.height - H) * top_bias)
    return im.crop((x, y, x + W, y + H))

def target(name):
    if name.startswith('gang_'):        return ('cut', 'world/gang/%s.webp' % name[5:], 512, 768, 0)
    if name.startswith('witness_'):     return ('cover', 'world/witness/%s.webp' % name[8:], 384, 384, 0.2)
    if name.startswith('item_'):        return ('cover', 'world/items/%s.webp' % name[5:], 384, 384, 0.5)
    if name == 'banner_world':          return ('cover', 'world/banner.webp', 384, 384, 0.5)
    if name.startswith('city_'):        return ('cover', 'world/cities/%s.webp' % name[5:], 960, 540, 0.5)
    if name == 'lab_hero':              return ('cover', 'lab/hero.webp', 384, 384, 0.5)
    if name.startswith('lab_case_'):    return ('cover', 'lab/case_%s.webp' % name[9:], 960, 540, 0.5)
    if name.startswith('lab_sus_'):     return ('cover', 'lab/sus_%s.webp' % name[8:], 384, 384, 0.2)
    if name.startswith('int_'):         return ('cover', 'eiken/int/%s.webp' % name[4:], 640, 480, 0.5)
    return None

def main():
    src = sys.argv[1] if len(sys.argv) > 1 else '_art_inbox/v2'
    files = sorted(f for e in ('png', 'jpg', 'jpeg', 'webp') for f in glob.glob(os.path.join(src, '*.' + e)))
    session = None
    for f in files:
        name = re.sub(r'^#?\d+_', '', os.path.splitext(os.path.basename(f))[0])   # 「#01_gang_mirage」→「gang_mirage」
        t = target(name)
        if not t:
            print('SKIP (이름 규칙 밖):', name); continue
        kind, rel, W, H, bias = t
        out = os.path.join(ROOT, 'assets/img', rel)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        im = Image.open(f)
        if kind == 'cut':
            sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
            from process_art import cutout, place, has_real_alpha
            im = im.convert('RGBA')
            if not has_real_alpha(im):
                if session is None:
                    from rembg import new_session
                    session = new_session('isnet-general-use')
                im = cutout(im, session)
            place(im, W, H, fit=True).save(out, 'WEBP', quality=88, method=6)
        else:
            cover(im.convert('RGB'), W, H, bias).save(out, 'WEBP', quality=84, method=6)
        print('%-32s -> %s (%dKB)' % (name, rel, os.path.getsize(out) // 1024))

if __name__ == '__main__':
    main()
