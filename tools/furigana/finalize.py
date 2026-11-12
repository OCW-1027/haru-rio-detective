# ふりがな辞書 2/2: 1文字だけの 語・読みが ゆれる 語を 除き、手動の 修正 (OVR/ADD/DROP) を 当てて data/furigana-dict.json を 書き出す
import json,re
import os
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(os.path.dirname(HERE))
R=json.load(open(os.path.join(HERE,'raw.json'))); D=R['D']
isk=lambda c: '一'<=c<='鿿' or c in '々〆ヶ'
OVR={'富士山':'ふじさん','阿蘇山':'あそさん','億人':'おくにん','正積':'せいせき','海淵':'かいえん','素晴':'すば','桂太郎':'かつらたろう','秋芳':'あきよし','小倉':'おぐら','八幡':'やはた'}
DROP={'有格','年未','日成','宝物','如風','如林','如火','韓半','沢東','志文'}
def align(surf, rd):
    segs=re.findall(r'[一-鿿々〆ヶ]+|[^一-鿿々〆ヶ]+', surf)
    pat='^'+''.join('(.+?)' if isk(sg[0]) else re.escape(sg) for sg in segs)+'$'
    m=re.match(pat, rd)
    if not m: return None
    out=[]; gi=0
    for sg in segs:
        if isk(sg[0]): gi+=1; out.append([sg, m.group(gi)])
        else: out.append(sg)
    return out
OUT={}
for sf,v in D.items():
    if sf in DROP: continue
    nk=len([c for c in sf if isk(c)])
    if len(sf)==1 or (nk==1 and len(sf)==1): continue
    if nk==1 and all(isk(c) for c in sf): continue
    a=v['a']
    if sf in OVR: a=align(sf,OVR[sf])
    if not a: continue
    if any(isinstance(x,list) and (re.search(r'[一-鿿?]',x[1]) or not x[1]) for x in a): continue
    # 先頭/末尾が ひらがな だけの 断片 (例:「失い」) は 語の 一部に 当たって 誤る ことが あるので 2文字以上 kanji 部分を 持つ ものだけ
    OUT[sf]=[x if isinstance(x,str) else [x[0],x[1]] for x in a]
# single-kanji + okurigana (例: 驚か, 続く) は 動詞・形容詞の 活用形 → kanji 1字でも 語幹が ある 場合は 残す
ADD={'中大兄':'なかのおおえ','高野山':'こうやさん','平安':'へいあん','室町':'むろまち','昭和':'しょうわ','平成':'へいせい','大正':'たいしょう','明治':'めいじ','江戸':'えど','令和':'れいわ'}
for k,r in ADD.items():
    a=align(k,r)
    if a: OUT[k]=[x if isinstance(x,str) else [x[0],x[1]] for x in a]
OUT.pop('済み',None)
print(len(OUT))
json.dump(OUT,open(os.path.join(ROOT,'data','furigana-dict.json'),'w'),ensure_ascii=False,separators=(',',':'))

