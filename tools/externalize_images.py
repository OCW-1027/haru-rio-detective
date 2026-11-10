#!/usr/bin/env python3
"""data/*.js 에 base64 로 내장된 이미지를 assets/img/ 아래 WebP 파일로 분리하고,
JS 안의 data URI 를 파일 경로로 바꾼다. (P2 기반 공사 — 1회성, 재실행해도 안전)"""
import re, base64, io, sys, glob, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
URI = re.compile(r"(['\"`])data:image/(\w+);base64,([A-Za-z0-9+/=]+)\1")
LHS = re.compile(r"(?:(\w+)\[(\w+)\]|(\w+)\.(\w+)|(?:const|let|var)\s+(\w+))\s*=\s*$")
KEY = re.compile(r"['\"]?(\w+)['\"]?\s*:\s*$")
OBJ = re.compile(r"(?:const|let|var)\s+(\w+)\s*=\s*\{")

def name_for(src, pos):
    head = src[max(0, pos - 200):pos]
    m = LHS.search(head)
    if m:
        if m.group(1): return m.group(1), m.group(2)
        if m.group(3): return m.group(3), m.group(4)
        return m.group(5), None
    k = KEY.search(head)
    objs = OBJ.findall(src[:pos])
    return (objs[-1] if objs else 'IMG'), (k.group(1) if k else None)

def encode(raw):
    im = Image.open(io.BytesIO(raw))
    out = io.BytesIO()
    has_alpha = im.mode in ('RGBA', 'LA', 'P') and ('transparency' in im.info or im.mode != 'P')
    if has_alpha:
        im.convert('RGBA').save(out, 'WEBP', lossless=True, method=6)
    else:
        im.convert('RGB').save(out, 'WEBP', quality=84, method=6)
    return out.getvalue(), im.size

total_before = total_after = n = 0
for path in sorted(glob.glob(os.path.join(ROOT, 'data', '*.js'))):
    src = open(path, encoding='utf8').read()
    stem = os.path.basename(path)[:-3]
    used = {}
    def repl(m):
        global total_before, total_after, n
        obj, key = name_for(src, m.start())
        base = (obj + ('_' + str(key) if key is not None else '')).lower()
        used[base] = used.get(base, 0) + 1
        if used[base] > 1: base += '_%d' % used[base]
        raw = base64.b64decode(m.group(3))
        data, size = encode(raw)
        rel = 'assets/img/%s/%s.webp' % (stem, base)
        os.makedirs(os.path.dirname(os.path.join(ROOT, rel)), exist_ok=True)
        open(os.path.join(ROOT, rel), 'wb').write(data)
        total_before += len(raw); total_after += len(data); n += 1
        print('  %-52s %4dx%-4d %7.0fKB -> %6.0fKB' % (rel, size[0], size[1], len(raw)/1024, len(data)/1024))
        return m.group(1) + rel + m.group(1)
    new = URI.sub(repl, src)
    if new != src:
        open(path, 'w', encoding='utf8', newline='').write(new)
        print('%s: %.1fMB -> %.0fKB' % (stem, len(src)/1e6, len(new)/1e3))
print('images: %d, %.1fMB -> %.1fMB' % (n, total_before/1e6, total_after/1e6))
