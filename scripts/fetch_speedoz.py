import json, os, re, html, urllib.request, urllib.parse, hashlib

d = json.load(open('.scrape/speedoz_products.json'))
os.makedirs('.scrape/speedoz_assets', exist_ok=True)
manifest = {}

def safe(url):
    n = url.split('/')[-1]
    s = re.sub(r'[^A-Za-z0-9._-]', '', n)
    return s if len(s) > 5 else hashlib.md5(url.encode()).hexdigest()[:10] + '.jpg'

req = lambda u: urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
for p in d:
    n = html.unescape(p['name'])
    if 'GPX' not in n and 'Demon' not in n:
        continue
    for im in p['images']:
        u = im['src'].split('?')[0]
        fn = safe(u)
        path = '.scrape/speedoz_assets/' + fn
        try:
            if not os.path.exists(path):
                with urllib.request.urlopen(req(u), timeout=30) as r, open(path, 'wb') as f:
                    f.write(r.read())
            manifest[u] = {'url': u, 'file': fn, 'bytes': os.path.getsize(path)}
        except Exception as e:
            print('FAIL', u, e)
json.dump(list(manifest.values()), open('.scrape/speedoz_assets.json', 'w'), indent=1)
print('downloaded', len(manifest))
