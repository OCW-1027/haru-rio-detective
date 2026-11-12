# ふりがな辞書 1/2: ゲーム内の 文章を Sudachi(C単位) で 解析し、4年生以上の 漢字を 含む 語と 読みを 集める
# 必要: pip install sudachipy sudachidict_core fugashi unidic-lite
# 使い方: python3 tools/furigana/build_raw.py && python3 tools/furigana/finalize.py
import re, glob, json, collections, fugashi
from sudachipy import dictionary, tokenizer as tk
import os
HERE=os.path.dirname(os.path.abspath(__file__)); ROOT=os.path.dirname(os.path.dirname(HERE))
GRADE=json.load(open(os.path.join(HERE,'kanji-grades.json')))
for ch in '茨媛岡潟岐熊香佐埼崎滋鹿縄井沖栃奈梨阪阜': GRADE[ch]=GRADE.get(ch) or 4
TH=3
ERAS={'飛鳥','奈良','平安','鎌倉','室町','戦国','安土','桃山','江戸','明治','大正','昭和','平成','令和','縄文','弥生','古墳'}
def hard(ch): g=GRADE.get(ch); return g is None or g>TH
isk=lambda c: '一'<=c<='鿿' or c in '々〆ヶ'
def hira(s): return ''.join(chr(ord(c)-0x60) if 'ァ'<=c<='ヶ' else c for c in s)
def align(surf, rd):
    segs=re.findall(r'[一-鿿々〆ヶ]+|[^一-鿿々〆ヶ]+', surf)
    pat='^'+''.join('(.+?)' if isk(sg[0]) else re.escape(hira(sg)) for sg in segs)+'$'
    m=re.match(pat, hira(rd))
    if not m: return None
    out=[]; gi=0
    for sg in segs:
        if isk(sg[0]): gi+=1; out.append([sg, m.group(gi)])
        else: out.append(sg)
    return out
S=dictionary.Dictionary().create(); MODE=tk.Tokenizer.SplitMode.C
F=fugashi.Tagger()
def fread(sf): return hira(''.join((w.feature.kana or '?') for w in F(sf)))
cnt=collections.defaultdict(collections.Counter); pos={}
files=sorted(glob.glob(ROOT+'/data/*.js')+glob.glob(ROOT+'/engine/*.js'))+[ROOT+'/index.html']
for f in files:
    s=open(f,encoding='utf8').read()
    for chunk in re.findall(r'[^\x00-\x7f]+(?:[ 　]+[^\x00-\x7f]+)*', s):
        c2=chunk.replace(' ','').replace('　','')
        if not any(isk(c) for c in c2): continue
        for m in S.tokenize(c2, MODE):
            sf=m.surface()
            ks=[c for c in sf if isk(c)]
            pp=m.part_of_speech()
            person = False
            if not ks or not (any(hard(c) for c in ks) or person or sf in ERAS): continue
            if re.search(r'[0-9０-９A-Za-zＡ-Ｚａ-ｚ]', sf): continue
            rd=hira(m.reading_form())
            if not rd: continue
            cnt[sf][rd]+=1; pos[sf]=m.part_of_speech()[:3]
D={}; flag=[]; amb=[]
for sf,c in cnt.items():
    (r1,n1),=c.most_common(1); tot=sum(c.values())
    nk=len([ch for ch in sf if isk(ch)])
    if n1/tot<0.85: amb.append([sf,dict(c)]); continue
    a=align(sf,r1)
    if a is None: flag.append([sf,r1,'noalign',pos[sf]]); continue
    fr=fread(sf)
    D[sf]={'a':a,'p':pos[sf],'n':tot,'agree':fr==r1,'fr':fr}
json.dump({'D':D,'amb':amb,'flag':flag},open(os.path.join(HERE,'raw.json'),'w'),ensure_ascii=False)
dis=[ (k,''.join(x[1] if isinstance(x,list) else x for x in v['a']),v['fr'],v['p'][1]) for k,v in D.items() if not v['agree']]
print('dict',len(D),'disagree',len(dis),'amb',len(amb),'noalign',len(flag))
json.dump(dis,open(os.path.join(HERE,'disagree.json'),'w'),ensure_ascii=False)
