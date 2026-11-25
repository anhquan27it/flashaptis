# Đọc mọi file .xlsx trong một thư mục (chỉ dùng thư viện chuẩn Python) → JSON {tênFile: [[tênSheet, [hàng...]], ...]}
# Dùng: python tools/xlsx-to-json.py <thư mục xlsx> <file json ra>  (build-vocab.js tự gọi)
import zipfile, re, sys, json, glob, os
import xml.etree.ElementTree as ET
NS = {'m': 'http://schemas.openxmlformats.org/spreadsheetml/2006/main'}
R_NS = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id'

def col_idx(ref):
    s = re.match(r'[A-Z]+', ref).group(0)
    n = 0
    for ch in s: n = n * 26 + ord(ch) - 64
    return n - 1

def read(path):
    z = zipfile.ZipFile(path)
    ss = []
    if 'xl/sharedStrings.xml' in z.namelist():
        root = ET.fromstring(z.read('xl/sharedStrings.xml'))
        for si in root.findall('m:si', NS):
            ss.append(''.join(t.text or '' for t in si.iter('{%s}t' % NS['m'])))
    wb = ET.fromstring(z.read('xl/workbook.xml'))
    rels = ET.fromstring(z.read('xl/_rels/workbook.xml.rels'))
    rmap = {r.get('Id'): r.get('Target') for r in rels}
    sheets = []
    for s in wb.find('m:sheets', NS):
        tgt = rmap[s.get(R_NS)]
        tgt = tgt.lstrip('/')
        if not tgt.startswith('xl/'): tgt = 'xl/' + tgt
        root = ET.fromstring(z.read(tgt))
        rows = []
        for row in root.iter('{%s}row' % NS['m']):
            vals = {}
            for c in row.findall('m:c', NS):
                t = c.get('t'); v = c.find('m:v', NS); is_ = c.find('m:is', NS)
                if t == 's' and v is not None: val = ss[int(v.text)]
                elif t == 'inlineStr' and is_ is not None: val = ''.join(x.text or '' for x in is_.iter('{%s}t' % NS['m']))
                else: val = v.text if v is not None else None
                vals[col_idx(c.get('r'))] = val
            if vals:
                mx = max(vals)
                rows.append([vals.get(i) for i in range(mx + 1)])
        sheets.append((s.get('name'), rows))
    return sheets

if __name__ == '__main__':
    out = {}
    for p in sorted(glob.glob(os.path.join(sys.argv[1], '*.xlsx'))):
        out[os.path.basename(p)[:-5]] = read(p)
    json.dump(out, open(sys.argv[2], 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print('files', len(out))
