# ふりがな辞書 3/3: できた 辞書を ゲーム内の 文章に 実際に 当てて、Sudachi の 文脈つき 解析と 比べる
#  - 語の 途中から 当たって 読みが 変わる 所 (例: 反対側 → 「対側」たいそく) は 長い 語を ctx-add.json に 足す
#  - 読みが 食いちがう 所は review.json に 書き出す (手で 確認 → finalize.py の OVR へ)
# 使い方: build_raw.py → finalize.py → check.py → (ctx-add が 増えたら) finalize.py → check.py
import re,glob,json,collections,os
from sudachipy import dictionary, tokenizer as tk
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(os.path.dirname(HERE))
DICT=json.load(open(os.path.join(ROOT,'data','furigana-dict.json')))
CTXP=os.path.join(HERE,'ctx-add.json'); CTX=json.load(open(CTXP)) if os.path.exists(CTXP) else {}
isk=lambda c: '一'<=c<='鿿' or c in '々〆ヶ'
def hira(s): return ''.join(chr(ord(c)-0x60) if 'ァ'<=c<='ヶ' else c for c in s)
def rd(k): return ''.join(x[1] if isinstance(x,list) else x for x in DICT[k])
IDX=collections.defaultdict(list)
for k in DICT: IDX[k[0]].append(k)
for v in IDX.values(): v.sort(key=len,reverse=True)
S=dictionary.Dictionary().create(); MODE=tk.Tokenizer.SplitMode.C
ok=0; add={}; rev=collections.Counter(); ex={}
for f in sorted(glob.glob(ROOT+'/data/*.js')+glob.glob(ROOT+'/engine/*.js')):
    for chunk in re.findall(r'[^\x00-\x7f]+(?:[ 　]+[^\x00-\x7f]+)*', open(f,encoding='utf8').read()):
        if not any(isk(c) for c in chunk): continue
        ms=[]; i=0
        while i<len(chunk):
            m=next((k for k in IDX.get(chunk[i],[]) if chunk.startswith(k,i)),None)
            if m: ms.append((i,m)); i+=len(m)
            else: i+=1
        pos=[j for j,c in enumerate(chunk) if c not in ' 　']; c2=''.join(chunk[j] for j in pos)
        toks=[(pos[t.begin()],pos[t.end()-1]+1,t.surface(),hira(t.reading_form())) for t in S.tokenize(c2,MODE) if t.begin()<t.end()<=len(pos)]
        for i,m in ms:
            sp=[t for t in toks if t[0]<i+len(m) and t[1]>i]
            if not sp: continue
            mine=hira(rd(m)); trd=''.join(t[3] for t in sp)
            if sp[0][0]==i and sp[-1][1]==i+len(m):
                if mine==trd: ok+=1
                elif len(m)==1 and i>0 and isk(chunk[i-1]):
                    # 1字の 語が 前の 漢字語に くっついて いる (例: 収入源・最頻値) → 前の 語ごと 登録
                    pv=[t for t in toks if t[1]==i]
                    if pv: add[pv[0][2]+m]=pv[0][3]+trd
                else: rev[(m,mine,trd)]+=1; ex.setdefault((m,mine,trd),chunk[max(0,i-8):i+len(m)+8])
            elif mine in trd: ok+=1
            else:
                surf=chunk[sp[0][0]:sp[-1][1]]
                if ' ' in surf or '　' in surf or re.search(r'[0-9A-Za-z]',surf): rev[(m,mine,'BOUND '+surf+'/'+trd)]+=1; ex.setdefault((m,mine,'BOUND '+surf+'/'+trd),chunk[max(0,i-8):i+len(m)+8]); continue
                add[surf]=trd
new={k:v for k,v in add.items() if k not in CTX}
CTX.update(new); json.dump(CTX,open(CTXP,'w'),ensure_ascii=False,indent=0,sort_keys=True)
json.dump([[k[0],k[1],k[2],n,ex[k]] for k,n in rev.most_common()],open(os.path.join(HERE,'review.json'),'w'),ensure_ascii=False,indent=0)
print('ok',ok,'ctx-add new',len(new),'total',len(CTX),'review',len(rev),sum(rev.values()))
