import json, os, re

models = json.load(open('.scrape/models.json'))
gear = json.load(open('.scrape/gear.json'))

def ts(v, indent=0):
    pad = '  ' * indent
    if v is None: return 'null'
    if isinstance(v, bool): return 'true' if v else 'false'
    if isinstance(v, (int, float)): return str(v)
    if isinstance(v, str):
        return "'" + v.replace('\\', '\\\\').replace("'", "\\'").replace('\n', ' ') + "'"
    if isinstance(v, list):
        if not v: return '[]'
        return '[\n' + ',\n'.join(pad + '  ' + ts(x, indent + 1) for x in v) + ',\n' + pad + ']'
    if isinstance(v, dict):
        return '{\n' + ',\n'.join(f"{pad}  {k}: {ts(val, indent + 1)}" for k, val in v.items()) + ',\n' + pad + '}'
    raise TypeError(type(v))

def spec(m, group_prefix, key_prefix, default=''):
    for g in m['specs']:
        if g['group'].lower().startswith(group_prefix.lower()):
            for k, v in g['rows']:
                if k.lower().startswith(key_prefix.lower()):
                    return v
    return default

COPY = {
  'gpx-demon-gr165r': {
    'hero': 'Where the Demon starts',
    'tagline': 'Liquid-cooled 164.6 cc single in a trellis frame, on upside-down forks.',
    'stance': 'Full-fairing sportbike',
    'intro': 'The Demon GR165R puts a trellis frame, USD forks and a YSS rear shock under a liquid-cooled 164.6 cc single with GPX-FI injection. It is the entry into the Demon family, and the bike most riders start on at the Uttara showroom.',
    'highlights': [
      {'label': 'Trellis frame', 'body': 'Tubular trellis chassis, upside-down front fork and a YSS rear unit.'},
      {'label': 'GPX-FI injection', 'body': 'Liquid-cooled 164.6 cc SOHC engine with electric start and a six-speed box.'},
      {'label': '17.8 bhp', 'body': 'Peak power at 9,000 rpm with 16 Nm of torque at 6,500 rpm.'},
      {'label': 'Disc both ends', 'body': 'Hydraulic disc brakes front and rear on 17-inch tubeless wheels.'},
    ],
  },
  'gpx-demon-gr165rr-da-corsa': {
    'hero': 'Da Corsa. Front row.',
    'tagline': 'Hyper four-valve head, 19.7 bhp and dual-channel ABS.',
    'stance': 'Flagship 165 sportbike',
    'intro': 'The Demon GR165RR Da Corsa takes the same 164.6 cc displacement to a hyper four-valve head for 19.7 bhp, adds anti-lock braking and wraps it in four factory colourways. It is the sharpest 165 GPX builds.',
    'highlights': [
      {'label': 'Hyper 4-valve head', 'body': '19.7 bhp at 10,000 rpm and 18 Nm at 8,000 rpm from 164.6 cc.'},
      {'label': 'Anti-lock brakes', 'body': 'Disc brakes front and rear with ABS.'},
      {'label': 'GPX-FI + TCI', 'body': 'Fuel injection with transistor-controlled ignition and electric start.'},
      {'label': 'Four colourways', 'body': 'Da Corsa Red, Racing Grey, Daytona Black and Blue.'},
    ],
  },
  'gpx-demon-gr250r': {
    'hero': 'Two-fifty. No excuses.',
    'tagline': '249.6 cc Hyper Quadro, 29 bhp, ABS with traction control.',
    'stance': 'Quarter-litre flagship',
    'intro': 'The Demon GR250R is the biggest Demon on the floor: a 249.6 cc liquid-cooled Hyper Quadro four-valve making 29 bhp, stopped by hydraulic discs with both ABS and traction control, on the same trellis chassis and upside-down forks.',
    'highlights': [
      {'label': '29 bhp Hyper Quadro', 'body': '249.6 cc liquid-cooled SOHC four-valve at 9,500 rpm, 23 Nm at 7,500 rpm.'},
      {'label': 'ABS + TCS', 'body': 'Hydraulic disc brakes front and rear with anti-lock and traction control.'},
      {'label': 'Adjustable rear', 'body': 'Trellis frame, upside-down fork and a seven-step adjustable monoshock.'},
      {'label': 'EFI, six speed', 'body': 'Electronic fuel injection, ECU ignition and a six-speed gearbox.'},
    ],
  },
}

head = """/**
 * GPX lineup.
 *
 * Specifications, colourways and photography come from the Speedoz Limited catalogue —
 * Gen-Z Motors' parent company and the GPX importer — with one colourway carried over from
 * the Gen-Z Motors showroom listing. Nothing here is estimated; if a figure is not published,
 * the row does not exist.
 *
 * Prices are deliberately absent: the showroom quotes them in person.
 */

export interface SpecRow {
  label: string
  value: string
}

export interface SpecGroup {
  group: string
  rows: SpecRow[]
}

export interface Colourway {
  name: string
  slug: string
  hex: string
  gallery: string[]
}

export interface Highlight {
  label: string
  body: string
}

export interface Bike {
  slug: string
  name: string
  shortName: string
  hero: string
  tagline: string
  intro: string
  stance: string
  engineCc: string
  power: string
  torque: string
  brakes: string
  kerbWeight: string
  fuelCapacity: string
  highlights: Highlight[]
  colourways: Colourway[]
  specs: SpecGroup[]
}
"""

bikes = []
for m in models:
    c = COPY[m['slug']]
    bikes.append({
        'slug': m['slug'],
        'name': m['name'],
        'shortName': m['shortName'],
        'hero': c['hero'],
        'tagline': c['tagline'],
        'intro': c['intro'],
        'stance': c['stance'],
        'engineCc': spec(m, 'engine', 'displacement'),
        'power': spec(m, 'engine', 'max'),
        'torque': [v for k, v in sum(([r for r in g['rows']] for g in m['specs'] if g['group'].lower().startswith('engine')), []) if k.lower().startswith('max') and 'torque' in k.lower()][0] if True else '',
        'brakes': spec(m, 'brak', 'front brake'),
        'kerbWeight': spec(m, 'dimension', 'kerb') or spec(m, 'dimension', 'weight'),
        'fuelCapacity': spec(m, 'dimension', 'fuel tank') or spec(m, 'dimension', 'tank'),
        'highlights': c['highlights'],
        'colourways': [{'name': col['name'], 'slug': col['slug'], 'hex': col['hex'],
                        'gallery': col['gallery']} for col in m['colours']],
        'specs': [{'group': g['group'], 'rows': [{'label': k, 'value': v} for k, v in g['rows']]}
                  for g in m['specs']],
    })

# `power` must be the power row, not whichever "Max…" came first.
for b, m in zip(bikes, models):
    rows = sum(([r for r in g['rows']] for g in m['specs']), [])
    def find(*needles):
        for k, v in rows:
            kl = k.lower()
            if all(n in kl for n in needles):
                return v
        return ''
    b['power'] = find('max', 'power')
    b['torque'] = find('max', 'torque')
    b['engineCc'] = find('displacement')
    b['kerbWeight'] = find('weight')
    b['fuelCapacity'] = find('tank') or find('fuel', 'capacity')
    b['brakes'] = find('front brake')

os.makedirs('app/data', exist_ok=True)
open('app/data/bikes.ts', 'w').write(
    head + '\nexport const bikes: Bike[] = ' + ts(bikes) + '\n'
    + "\nexport const bikeBySlug = (slug: string): Bike | undefined =>\n"
      "  bikes.find((bike) => bike.slug === slug)\n"
)

gear_head = """/**
 * Helmet and riding-gear showcase, from the Gen-Z Motors counter stock.
 * Display only — this site does not sell online, and prices are quoted in person.
 */

export interface GearItem {
  name: string
  slug: string
  brand: 'MT' | 'TORQ' | 'ORIGINE'
  image: string | null
}
"""
items = [{'name': g['name'], 'slug': g['slug'], 'brand': g['brand'], 'image': g['image']}
         for g in gear if g['brand'] in ('MT', 'TORQ', 'ORIGINE')]
items.sort(key=lambda g: (g['brand'], g['name']))
open('app/data/gear.ts', 'w').write(
    gear_head + '\nexport const gear: GearItem[] = ' + ts(items) + '\n'
    + "\nexport const gearBrands = ['MT', 'TORQ', 'ORIGINE'] as const\n"
      "export type GearBrand = (typeof gearBrands)[number]\n\n"
      "export const gearByBrand = (brand: GearBrand): GearItem[] =>\n"
      "  gear.filter((item) => item.brand === brand)\n"
)

for b in bikes:
    print(b['slug'], '|', b['engineCc'], '|', b['power'], '|', b['torque'], '|', b['kerbWeight'], '|', b['brakes'])
print('gear items:', len(items))
