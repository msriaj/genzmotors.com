/**
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

export const bikes: Bike[] = [
  {
    slug: 'gpx-demon-gr165r',
    name: 'GPX Demon GR165R',
    shortName: 'Demon GR165R',
    hero: 'Where the Demon starts',
    tagline: 'Liquid-cooled 164.6 cc single in a trellis frame, on upside-down forks.',
    intro: 'The Demon GR165R puts a trellis frame, USD forks and a YSS rear shock under a liquid-cooled 164.6 cc single with GPX-FI injection. It is the entry into the Demon family, and the bike most riders start on at the Uttara showroom.',
    stance: 'Full-fairing sportbike',
    engineCc: '164.6 cc',
    power: '17.8 bhp @ 9000 rpm',
    torque: '16 Nm @ 6,500 rpm',
    brakes: 'Disc Brake',
    kerbWeight: '155 kg',
    fuelCapacity: '11 Liters',
    highlights: [
      {
        label: 'Trellis frame',
        body: 'Tubular trellis chassis, upside-down front fork and a YSS rear unit.',
      },
      {
        label: 'GPX-FI injection',
        body: 'Liquid-cooled 164.6 cc SOHC engine with electric start and a six-speed box.',
      },
      {
        label: '17.8 bhp',
        body: 'Peak power at 9,000 rpm with 16 Nm of torque at 6,500 rpm.',
      },
      {
        label: 'Disc both ends',
        body: 'Hydraulic disc brakes front and rear on 17-inch tubeless wheels.',
      },
    ],
    colourways: [
      {
        name: 'Black Space',
        slug: 'black-space',
        hex: '#15171b',
        gallery: [
          '/images/bikes/GPX_Black-Space_1.jpg',
          '/images/bikes/GPX_Black-Space.jpg',
        ],
      },
      {
        name: 'Red Fire',
        slug: 'red-fire',
        hex: '#c4161c',
        gallery: [
          '/images/bikes/GPX_Red-Fire_1.jpg',
          '/images/bikes/GPX_Red-Fire.jpg',
        ],
      },
    ],
    specs: [
      {
        group: 'Engine and Performance',
        rows: [
          {
            label: 'Engine Type',
            value: '4 stroke, SOHC, 2 valves',
          },
          {
            label: 'Displacement',
            value: '164.6 cc',
          },
          {
            label: 'Maximum Power',
            value: '17.8 bhp @ 9000 rpm',
          },
          {
            label: 'Maximum Torque',
            value: '16 Nm @ 6,500 rpm',
          },
          {
            label: 'Bore × Stroke',
            value: '59.7 × 58.8 mm',
          },
          {
            label: 'Fuel System',
            value: 'GPX-FI',
          },
          {
            label: 'Transmission',
            value: '6-Speed',
          },
          {
            label: 'Starting System',
            value: 'Electric Start',
          },
          {
            label: 'Cooling System',
            value: 'Liquid-Cooled',
          },
        ],
      },
      {
        group: 'Dimensions',
        rows: [
          {
            label: 'Overall Dimensions (W × L × H)',
            value: '747 × 2020 × 1145 mm',
          },
          {
            label: 'Wheelbase',
            value: '1,350 mm',
          },
          {
            label: 'Ground Clearance',
            value: '150 mm',
          },
          {
            label: 'Seat Height',
            value: '815 mm',
          },
          {
            label: 'Fuel Tank Capacity',
            value: '11 Liters',
          },
          {
            label: 'Kerb Weight',
            value: '155 kg',
          },
        ],
      },
      {
        group: 'Chassis and Suspension',
        rows: [
          {
            label: 'Frame Type',
            value: 'Trellis Frame',
          },
          {
            label: 'Front Suspension',
            value: 'Upside-Down (USD) Fork',
          },
          {
            label: 'Rear Suspension',
            value: 'YSS Rear Suspension',
          },
        ],
      },
      {
        group: 'Braking and Safety',
        rows: [
          {
            label: 'Front Brake',
            value: 'Disc Brake',
          },
          {
            label: 'Rear Brake',
            value: 'Disc Brake',
          },
        ],
      },
    ],
  },
  {
    slug: 'gpx-demon-gr165rr-da-corsa',
    name: 'GPX Demon GR165RR Da Corsa',
    shortName: 'Demon GR165RR Da Corsa',
    hero: 'Da Corsa. Front row.',
    tagline: 'Hyper four-valve head, 19.7 bhp and dual-channel ABS.',
    intro: 'The Demon GR165RR Da Corsa takes the same 164.6 cc displacement to a hyper four-valve head for 19.7 bhp, adds anti-lock braking and wraps it in four factory colourways. It is the sharpest 165 GPX builds.',
    stance: 'Flagship 165 sportbike',
    engineCc: '164.6 cc',
    power: '19.7 BHP @ 10,000 RPM',
    torque: '18 Nm @ 8,000 RPM',
    brakes: 'Disc Brake',
    kerbWeight: '155 kg',
    fuelCapacity: '11 Liters',
    highlights: [
      {
        label: 'Hyper 4-valve head',
        body: '19.7 bhp at 10,000 rpm and 18 Nm at 8,000 rpm from 164.6 cc.',
      },
      {
        label: 'Anti-lock brakes',
        body: 'Disc brakes front and rear with ABS.',
      },
      {
        label: 'GPX-FI + TCI',
        body: 'Fuel injection with transistor-controlled ignition and electric start.',
      },
      {
        label: 'Four colourways',
        body: 'Da Corsa Red, Racing Grey, Daytona Black and Blue.',
      },
    ],
    colourways: [
      {
        name: 'Da Corsa Red',
        slug: 'da-corsa-red',
        hex: '#c8102e',
        gallery: [
          '/images/bikes/4V-Red-_1.jpg',
        ],
      },
      {
        name: 'Da Corsa Racing Grey',
        slug: 'da-corsa-racing-grey',
        hex: '#6d7278',
        gallery: [
          '/images/bikes/4V-Grey-_1.jpg',
          '/images/bikes/4V-Grey-_2.jpg',
        ],
      },
      {
        name: 'Da Corsa Daytona Black',
        slug: 'da-corsa-daytona-black',
        hex: '#101114',
        gallery: [
          '/images/bikes/4V-Black-_1.jpg',
          '/images/bikes/4V-Black-_2.jpg',
        ],
      },
      {
        name: 'Da Corsa Blue',
        slug: 'da-corsa-blue',
        hex: '#1a49a0',
        gallery: [
          '/images/bikes/LOW_Final_22GR_08_-Blue-1.webp',
          '/images/bikes/LOW_Final_22GR_05_-45-SOLID-Blue-RGB-Recovered.webp',
        ],
      },
    ],
    specs: [
      {
        group: 'Engine and Performance',
        rows: [
          {
            label: 'Engine Type',
            value: '4-Stroke, SOHC, Hyper, 4-Valve',
          },
          {
            label: 'Displacement',
            value: '164.6 cc',
          },
          {
            label: 'Maximum Power',
            value: '19.7 BHP @ 10,000 RPM',
          },
          {
            label: 'Maximum Torque',
            value: '18 Nm @ 8,000 RPM',
          },
          {
            label: 'Bore × Stroke',
            value: '59.7 × 58.8 mm',
          },
          {
            label: 'Fuel System',
            value: 'GPX-FI',
          },
          {
            label: 'Transmission',
            value: '6-Speed',
          },
          {
            label: 'Ignition',
            value: 'TCI (Transistor Controlled Ignition)',
          },
          {
            label: 'Starting System',
            value: 'Electric Start',
          },
          {
            label: 'Cooling System',
            value: 'Liquid-Cooled',
          },
        ],
      },
      {
        group: 'Dimensions',
        rows: [
          {
            label: 'Overall Dimensions (W × L × H)',
            value: '747 × 2020 × 1145 mm',
          },
          {
            label: 'Wheelbase',
            value: '1,350 mm',
          },
          {
            label: 'Ground Clearance',
            value: '159 mm',
          },
          {
            label: 'Seat Height',
            value: '815 mm',
          },
          {
            label: 'Fuel Tank Capacity',
            value: '11 Liters',
          },
          {
            label: 'Kerb Weight',
            value: '155 kg',
          },
        ],
      },
      {
        group: 'Chassis and Suspension',
        rows: [
          {
            label: 'Frame Type',
            value: 'Trellis Frame',
          },
          {
            label: 'Front Suspension',
            value: 'Upside-Down Fork',
          },
          {
            label: 'Rear Suspension',
            value: 'YSS Rear Suspension',
          },
        ],
      },
      {
        group: 'Braking and Safety',
        rows: [
          {
            label: 'Front Brake',
            value: 'Disc Brake',
          },
          {
            label: 'Rear Brake',
            value: 'Disc Brake',
          },
          {
            label: 'ABS',
            value: 'Dual Channel ABS',
          },
        ],
      },
    ],
  },
  {
    slug: 'gpx-demon-gr250r',
    name: 'GPX Demon GR250R',
    shortName: 'Demon GR250R',
    hero: 'Two-fifty. No excuses.',
    tagline: '249.6 cc Hyper Quadro, 29 bhp, ABS with traction control.',
    intro: 'The Demon GR250R is the biggest Demon on the floor: a 249.6 cc liquid-cooled Hyper Quadro four-valve making 29 bhp, stopped by hydraulic discs with both ABS and traction control, on the same trellis chassis and upside-down forks.',
    stance: 'Quarter-litre flagship',
    engineCc: '249.6cc',
    power: '29 bhp @ 9,500 rpm',
    torque: '23 Nm @ 7,500 rpm',
    brakes: 'Hydraulic Disc (ABS, TCS)',
    kerbWeight: '158 kg',
    fuelCapacity: '11 liters',
    highlights: [
      {
        label: '29 bhp Hyper Quadro',
        body: '249.6 cc liquid-cooled SOHC four-valve at 9,500 rpm, 23 Nm at 7,500 rpm.',
      },
      {
        label: 'ABS + TCS',
        body: 'Hydraulic disc brakes front and rear with anti-lock and traction control.',
      },
      {
        label: 'Adjustable rear',
        body: 'Trellis frame, upside-down fork and a seven-step adjustable monoshock.',
      },
      {
        label: 'EFI, six speed',
        body: 'Electronic fuel injection, ECU ignition and a six-speed gearbox.',
      },
    ],
    colourways: [
      {
        name: 'Burning Red',
        slug: 'burning-red',
        hex: '#bf1622',
        gallery: [
          '/images/bikes/250-Red-_1.jpg',
          '/images/bikes/250-Red-_2.jpg',
        ],
      },
      {
        name: 'Aviator Yellow',
        slug: 'aviator-yellow',
        hex: '#d9a520',
        gallery: [
          '/images/bikes/250-Yellow-_1-1.jpg',
          '/images/bikes/250-Yellow-_2.jpg',
        ],
      },
      {
        name: 'Black Space',
        slug: 'black-space',
        hex: '#15171b',
        gallery: [
          '/images/bikes/250-Black-_1.jpg',
          '/images/bikes/250-Black-_2.jpg',
        ],
      },
    ],
    specs: [
      {
        group: 'Engine and Performance',
        rows: [
          {
            label: 'Engine',
            value: 'Hyper Quadro, SOHC, 4 valve',
          },
          {
            label: 'Cooling System',
            value: 'Liquid-cooled',
          },
          {
            label: 'Displacement',
            value: '249.6cc',
          },
          {
            label: 'Max Power',
            value: '29 bhp @ 9,500 rpm',
          },
          {
            label: 'Max Torque',
            value: '23 Nm @ 7,500 rpm',
          },
          {
            label: 'Bore & Stroke',
            value: '77 x 53.6 mm',
          },
          {
            label: 'Fuel System',
            value: 'EFI',
          },
          {
            label: 'Gear',
            value: '6-speed',
          },
          {
            label: 'Ignition',
            value: 'ECU (Electronic Control Unit)',
          },
          {
            label: 'Starting System',
            value: 'Electric',
          },
        ],
      },
      {
        group: 'Dimensions',
        rows: [
          {
            label: 'L × W × H',
            value: '2020 × 747 × 1145 mm',
          },
          {
            label: 'Wheelbase',
            value: '1,350 mm',
          },
          {
            label: 'Ground Clearance',
            value: '159 mm',
          },
          {
            label: 'Seat Height',
            value: '815 mm',
          },
          {
            label: 'Tank Capacity',
            value: '11 liters',
          },
          {
            label: 'Weight',
            value: '158 kg',
          },
        ],
      },
      {
        group: 'Chassis and Suspension',
        rows: [
          {
            label: 'Frame',
            value: 'Trellis',
          },
          {
            label: 'Front Shock Absorber',
            value: 'Upside-Down',
          },
          {
            label: 'Rear Shock Absorber',
            value: 'Mono, 7-step adjustable',
          },
        ],
      },
      {
        group: 'Brakes and Safety',
        rows: [
          {
            label: 'Front Brake',
            value: 'Hydraulic Disc (ABS, TCS)',
          },
          {
            label: 'Rear Brake',
            value: 'Hydraulic Disc (ABS, TCS)',
          },
        ],
      },
      {
        group: 'Features',
        rows: [
          {
            label: 'Speedometer',
            value: 'TFT (with Screen Mirroring)',
          },
        ],
      },
    ],
  },
]

export const bikeBySlug = (slug: string): Bike | undefined =>
  bikes.find((bike) => bike.slug === slug)
