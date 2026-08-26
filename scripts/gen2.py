"""Rebuild the model data from the Speedoz (parent company) catalogue.

Speedoz is the mother company and carries the current GPX lineup, so its product
descriptions and photography are the source of truth. The Gen-Z Motors catalogue is
merged in only for a colourway Speedoz no longer lists.
"""
import json, re, html, os, shutil

sp = json.load(open('.scrape/speedoz_products.json'))
gz = json.load(open('.scrape/products.json'))
sp_assets = {a['url']: a['file'] for a in json.load(open('.scrape/speedoz_assets.json'))}
gz_assets = {a['url']: a['file'] for a in json.load(open('.scrape/assets.json'))}

def unesc(s): return html.unescape(s or '')
def flat(s): return re.sub(r'\s+', ' ', s).strip()

def to_lines(desc):
    """Flatten spec HTML (three different authoring styles) into text lines."""
    s = unesc(desc)
    s = re.sub(r'(?is)<(br|/p|/li|/h[1-6]|/div|/tr)[^>]*>', '\n', s)
    s = re.sub(r'(?is)</td>\s*<td[^>]*>', ': ', s)
    s = re.sub(r'(?is)<[^>]+>', '', s)
    s = html.unescape(s)
    out = []
    for raw in s.split('\n'):
        line = flat(raw).lstrip('•·-– ').strip()
        if line:
            out.append(line)
    return out

def parse_specs(desc):
    groups, current = [], None
    for line in to_lines(desc):
        if ':' in line:
            label, _, value = line.partition(':')
            label, value = flat(label), flat(value)
            if label and value:
                if current is None:
                    current = {'group': 'Specifications', 'rows': []}
                    groups.append(current)
                current['rows'].append([label, value])
                continue
        # A short, colon-free line is a group heading.
        if 2 <= len(line) <= 42:
            current = {'group': line.replace('&', 'and'), 'rows': []}
            groups.append(current)
    return [g for g in groups if g['rows']]

def copy_image(url, assets, folder='bikes'):
    fn = assets.get(url.split('?')[0])
    if not fn:
        return None
    src = ('.scrape/speedoz_assets/' if assets is sp_assets else '.scrape/assets/') + fn
    dst = f'public/images/{folder}/{fn}'
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if os.path.exists(src) and not os.path.exists(dst):
        shutil.copy2(src, dst)
    return f'/images/{folder}/{fn}' if os.path.exists(dst) else None

# --- colourway registry -------------------------------------------------------
# (source, product id) -> model slug, colourway label, swatch
SPEEDOZ = {
    1002: ('gpx-demon-gr165r', 'Black Space', '#15171b'),
    999:  ('gpx-demon-gr165r', 'Red Fire', '#c4161c'),
    550:  ('gpx-demon-gr165rr-da-corsa', 'Da Corsa Red', '#c8102e'),
    547:  ('gpx-demon-gr165rr-da-corsa', 'Da Corsa Racing Grey', '#6d7278'),
    544:  ('gpx-demon-gr165rr-da-corsa', 'Da Corsa Daytona Black', '#101114'),
    537:  ('gpx-demon-gr250r', 'Burning Red', '#bf1622'),
    444:  ('gpx-demon-gr250r', 'Aviator Yellow', '#d9a520'),
    432:  ('gpx-demon-gr250r', 'Black Space', '#15171b'),
}
# Colourway the dealer stocks that the parent catalogue no longer lists.
GENZ_EXTRA = {
    1860: ('gpx-demon-gr165rr-da-corsa', 'Da Corsa Blue', '#1a49a0'),
}

MODELS = {
    'gpx-demon-gr165r': {
        'name': 'GPX Demon GR165R',
        'shortName': 'Demon GR165R',
        'order': 1,
        'specSource': 1002,
    },
    'gpx-demon-gr165rr-da-corsa': {
        'name': 'GPX Demon GR165RR Da Corsa',
        'shortName': 'Demon GR165RR Da Corsa',
        'order': 2,
        'specSource': 550,
    },
    'gpx-demon-gr250r': {
        'name': 'GPX Demon GR250R',
        'shortName': 'Demon GR250R',
        'order': 3,
        'specSource': 537,
    },
}

by_id_sp = {p['id']: p for p in sp}
by_id_gz = {p['id']: p for p in gz}

models = {}
for slug, meta in MODELS.items():
    models[slug] = {'slug': slug, 'name': meta['name'], 'shortName': meta['shortName'],
                    'order': meta['order'], 'colours': [],
                    'specs': parse_specs(by_id_sp[meta['specSource']]['description'])}

for pid, (slug, label, hexv) in SPEEDOZ.items():
    p = by_id_sp[pid]
    gallery = [g for g in (copy_image(im['src'], sp_assets) for im in p['images']) if g]
    models[slug]['colours'].append({
        'name': label, 'slug': re.sub(r'[^a-z0-9]+', '-', label.lower()).strip('-'),
        'hex': hexv, 'gallery': list(dict.fromkeys(gallery)),
    })

for pid, (slug, label, hexv) in GENZ_EXTRA.items():
    p = by_id_gz[pid]
    gallery = [g for g in (copy_image(im['src'], gz_assets) for im in p['images']) if g]
    if gallery:
        models[slug]['colours'].append({
            'name': label, 'slug': re.sub(r'[^a-z0-9]+', '-', label.lower()).strip('-'),
            'hex': hexv, 'gallery': list(dict.fromkeys(gallery)),
        })

ordered = sorted(models.values(), key=lambda m: m['order'])
json.dump(ordered, open('.scrape/models.json', 'w'), indent=1, ensure_ascii=False)

for m in ordered:
    print(m['slug'], '| colours', len(m['colours']), '| spec rows',
          sum(len(g['rows']) for g in m['specs']))
    print('   groups:', [g['group'] for g in m['specs']])
    for c in m['colours']:
        print('   -', c['name'], len(c['gallery']), c['gallery'][:1])
