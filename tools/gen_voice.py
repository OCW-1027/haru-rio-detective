#!/usr/bin/env python3
"""英語 音声パックを 作る (無料の オープンソース音声合成 Kokoro-82M, Apache-2.0)
入力: [{r: 役 W|M|N, t: 文}, …] の JSON (ゲーム内で 読み上げる 文。tools 側で ゲームから 書き出す)
出力: assets/audio/en/<key>.mp3 と assets/audio/en/index.json
key = FNV-1a 32bit (役 + '|' + 文 の UTF-8) — engine/voice-pack.js と 同じ 計算
すでに ある ファイルは とばすので、途中で 止まっても もう一度 実行すれば 続きから。

準備: pip install kokoro misaki spacy soundfile (+ ffmpeg)
使い方: python tools/gen_voice.py texts.json [出力フォルダ]
"""
import sys, os, json, re, subprocess, time
import numpy as np, soundfile as sf

VOICE = {'W': 'af_heart', 'M': 'am_michael', 'N': 'af_bella'}   # 女性 · 男性 · ナレーター

def key(t, r):
    h = 0x811c9dc5
    for b in (r + '|' + t).encode('utf-8'):
        h ^= b; h = (h * 0x01000193) & 0xffffffff
    return '%08x' % h

def speakable(t):
    t = re.sub(r'\bNo\. ?(\d+)', r'Number \1', t)      # 「No. 1」を「Number 1」と 読ませる
    t = t.replace('—', ', ').replace('...', ', ')
    return t

def main():
    src = sys.argv[1]
    out = sys.argv[2] if len(sys.argv) > 2 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'assets', 'audio', 'en')
    os.makedirs(out, exist_ok=True)
    items = json.load(open(src, encoding='utf-8'))
    from kokoro import KPipeline
    pipe = KPipeline(lang_code='a')
    done = 0; t0 = time.time(); tmp = os.path.join(out, '_tmp.wav')
    def write_index():
        ks = sorted(f[:-4] for f in os.listdir(out) if f.endswith('.mp3'))
        json.dump({'v': 1, 'k': ks}, open(os.path.join(out, 'index.json'), 'w'), separators=(',', ':'))
        return len(ks)
    for n, it in enumerate(items):
        r, t = it['r'], it['t'].strip()
        k = key(t, r); f = os.path.join(out, k + '.mp3')
        if os.path.exists(f): continue
        chunks = [a for _, _, a in pipe(speakable(t), voice=VOICE.get(r, 'af_bella'), speed=1.0)]
        if not chunks: continue
        audio = np.concatenate([np.asarray(c) for c in chunks])
        audio = np.concatenate([np.zeros(2400, dtype=audio.dtype), audio, np.zeros(3600, dtype=audio.dtype)])  # 前 0.1秒・後 0.15秒の 間
        sf.write(tmp, audio, 24000)
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', tmp, '-ac', '1', '-ar', '24000', '-b:a', '32k', f], check=True)
        done += 1
        if done % 50 == 0:
            print('%d/%d  %.0fs  index=%d' % (n + 1, len(items), time.time() - t0, write_index()), flush=True)
    if os.path.exists(tmp): os.remove(tmp)
    print('finished', done, 'new files, index =', write_index(), flush=True)

if __name__ == '__main__':
    main()
