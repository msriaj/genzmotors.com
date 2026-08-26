/**
 * Helmet and riding-gear showcase, from the Gen-Z Motors counter stock.
 * Display only — this site does not sell online, and prices are quoted in person.
 */

export interface GearItem {
  name: string
  slug: string
  brand: 'MT' | 'TORQ' | 'ORIGINE'
  image: string | null
}

export const gear: GearItem[] = [
  {
    name: 'MT Braker SV Chento – Gloss Grey',
    slug: 'mt-braker-sv-chento-gloss-grey',
    brand: 'MT',
    image: '/images/gear/1346A56103-1PP-24-FF128SV-MT-Helmets-BRAKER-SV-CHENTO-B0-Matt_02-scaled.webp',
  },
  {
    name: 'MT Braker SV Chento – Gloss Red',
    slug: 'mt-braker-sv-chento-gloss-red',
    brand: 'MT',
    image: '/images/gear/1346A56153-1PP-24-FF128SV-MT-Helmets-BRAKER-SV-CHENTO-B5-Matt_02-scaled.webp',
  },
  {
    name: 'MT Braker SV Solid – Gloss Black',
    slug: 'mt-braker-sv-solid-gloss-black',
    brand: 'MT',
    image: '/images/gear/1346000011-1PP-24-FF128SV-MT-Helmets-Braker-SV-SOLID-A1-GLOSS-BLACK_02-scaled.webp',
  },
  {
    name: 'MT Hummer Battery – Gloss Grey',
    slug: 'mt-hummer-battery-gloss-grey',
    brand: 'MT',
    image: '/images/gear/1.webp',
  },
  {
    name: 'MT Hummer Battery – Gloss Red',
    slug: 'mt-hummer-battery-gloss-red',
    brand: 'MT',
    image: '/images/gear/1-1.webp',
  },
  {
    name: 'MT Hummer Liquer – Gloss Red',
    slug: 'mt-hummer-liquer-gloss-red',
    brand: 'MT',
    image: '/images/gear/MT-hummer-Liquer-Glossy-red-1.webp',
  },
  {
    name: 'MT Hummer Monti – Gloss Red',
    slug: 'mt-hummer-monti-gloss-red',
    brand: 'MT',
    image: '/images/gear/MT-hummer-Monti-Red-angle-1.webp',
  },
  {
    name: 'MT Hummer Solid – Gloss Black',
    slug: 'mt-hummer-solid-gloss-black',
    brand: 'MT',
    image: '/images/gear/MT-Hummer-solid-gloss-black-angle-1.webp',
  },
  {
    name: 'MT Hummer Zel – Matt Blue',
    slug: 'mt-hummer-zel-matt-blue',
    brand: 'MT',
    image: '/images/gear/MT-hummer-Zel-Matt-Blue-angle-1.webp',
  },
  {
    name: 'MT REVENGE 2S HATAX GLOSS – RED',
    slug: 'mt-revenge-2s-hatax-gloss-red',
    brand: 'MT',
    image: '/images/gear/DSC_2581-scaled.webp',
  },
  {
    name: 'MT REVENGE 2S HATAX – GLOSS BLUE',
    slug: 'mt-revenge-2s-hatax-gloss-blue',
    brand: 'MT',
    image: '/images/gear/DSC_2579-scaled.webp',
  },
  {
    name: 'MT REVENGE 2S SOLID GLOSS – BLACK',
    slug: 'mt-revenge-2s-solid-gloss-black',
    brand: 'MT',
    image: '/images/gear/1326000013-1PP-23-FF110B-MT-HELMETS-REVENGE-2-S-SOLID-A1-GLOSS_02-scaled.webp',
  },
  {
    name: 'MT Stinger 2 Asphalt – Matt Grey Black',
    slug: 'mt-stinger-2-asphalt-matt-grey-black',
    brand: 'MT',
    image: '/images/gear/DSC_7697.webp',
  },
  {
    name: 'MT Stinger 2 Micro – Gloss Grey',
    slug: 'mt-stinger-2-micro-gloss-grey',
    brand: 'MT',
    image: '/images/gear/DSC_2107-scaled.webp',
  },
  {
    name: 'MT Stinger 2 Micro – Gloss Red',
    slug: 'mt-stinger-2-micro-gloss-red',
    brand: 'MT',
    image: '/images/gear/DSC_2094-scaled.webp',
  },
  {
    name: 'MT Stinger 2 Mint – Gloss White',
    slug: 'mt-stinger-2-mint-gloss-white',
    brand: 'MT',
    image: '/images/gear/DSC_2088.webp',
  },
  {
    name: 'MT Stinger 2 Poun – Gloss Blue Black',
    slug: 'mt-stinger-2-poun-gloss-blue-black',
    brand: 'MT',
    image: '/images/gear/ssd.webp',
  },
  {
    name: 'MT Stinger 2 Poun – Gloss White Black',
    slug: 'mt-stinger-2-poun-gloss-white-black',
    brand: 'MT',
    image: '/images/gear/DSC_9416.webp',
  },
  {
    name: 'MT Stinger 2 Raclette – Gloss Grey Black',
    slug: 'mt-stinger-2-raclette-gloss-grey-black',
    brand: 'MT',
    image: '/images/gear/MT-Raclette-Grey-Black_2.webp',
  },
  {
    name: 'MT Stinger 2 Raclette – Gloss Red Black',
    slug: 'mt-stinger-2-raclette-gloss-red-black',
    brand: 'MT',
    image: '/images/gear/MT-Raclette-Red-Black_1.webp',
  },
  {
    name: 'MT Stinger 2 Rush – Gloss Grey Black',
    slug: 'mt-stinger-2-rush-gloss-grey-black',
    brand: 'MT',
    image: '/images/gear/MT-Rush-Grey-Black_2.webp',
  },
  {
    name: 'MT Stinger 2 Rush – Gloss Red Black',
    slug: 'mt-stinger-2-rush-gloss-red-black',
    brand: 'MT',
    image: '/images/gear/MT-Rush-Red-Black_2.webp',
  },
  {
    name: 'MT Stinger 2 Solid -Matt Titanium',
    slug: 'mt-stinger-2-solid-matt-titanium',
    brand: 'MT',
    image: '/images/gear/13340000123_1PP_23_FF126_MT-HELMETS-STINGER-2-S_SOLID-A12-MATT_02-1.webp',
  },
  {
    name: 'MT Stinger 2 Solid – Gloss Black',
    slug: 'mt-stinger-2-solid-gloss-black',
    brand: 'MT',
    image: '/images/gear/stinger-2.webp',
  },
  {
    name: 'MT Street S – Bezos – Gloss Gray',
    slug: 'mt-street-s-bezos-gloss-gray',
    brand: 'MT',
    image: '/images/gear/web-test-2.webp',
  },
  {
    name: 'MT Street S – Entire – Matt Black',
    slug: 'mt-street-s-entire-matt-black',
    brand: 'MT',
    image: '/images/gear/MT-STREET-ENTIRE-C9-MATT-BLACK_02-scaled.webp',
  },
  {
    name: 'MT Street S – Entire – Matt Brown',
    slug: 'mt-street-s-entire-matt-brown',
    brand: 'MT',
    image: '/images/gear/MT-STREET-ENTIRE-I2-MATT-BROWN_02-scaled.webp',
  },
  {
    name: 'MT Street S – Poke – Gloss Flour',
    slug: 'mt-street-s-poke-gloss-flour',
    brand: 'MT',
    image: '/images/gear/Poke.webp',
  },
  {
    name: 'MT Street S – Poke – Gloss Red',
    slug: 'mt-street-s-poke-gloss-red',
    brand: 'MT',
    image: '/images/gear/13389511531-1PP-23-OF501B-MT-HELMETS-STREET-S-POKE-B5-MATT_01.webp',
  },
  {
    name: 'MT Street S – Solid – Gloss Black',
    slug: 'mt-street-s-solid-gloss-black',
    brand: 'MT',
    image: '/images/gear/1338000011-1PP-23-OF501B-MT-HELMETS-STREET-S-SOLID-A1-GLOSS_01.webp',
  },
  {
    name: 'MT Street S – Tino – Gloss Red',
    slug: 'mt-street-s-tino-gloss-red',
    brand: 'MT',
    image: '/images/gear/Tino-Red.webp',
  },
  {
    name: 'MT Targo S Kay – Gloss Bluev',
    slug: 'mt-targo-s-kay-gloss-bluev',
    brand: 'MT',
    image: '/images/gear/1343B00272-1PP-24-FF106B-MT-Helmets-TARGO-S-KAY-C7-MATT_02-scaled.webp',
  },
  {
    name: 'MT Targo S Kay – Gloss Grey',
    slug: 'mt-targo-s-kay-gloss-grey',
    brand: 'MT',
    image: '/images/gear/1343B00122-1PP-24-FF106B-MT-Helmets-TARGO-S-KAY-B2-MATT_02-scaled.webp',
  },
  {
    name: 'MT Targo S Kay – Gloss Red',
    slug: 'mt-targo-s-kay-gloss-red',
    brand: 'MT',
    image: null,
  },
  {
    name: 'MT Targo S Solid – Gloss Black',
    slug: 'mt-targo-s-solid-gloss-black',
    brand: 'MT',
    image: '/images/gear/1343000013-1PP-24-FF106B-MT-Helmets-TARGO-S-SOLID-A1-MATT2-scaled.webp',
  },
  {
    name: 'MT Thunder 4 SV Mil – Matt Black',
    slug: 'mt-thunder-4-sv-mil-matt-black',
    brand: 'MT',
    image: '/images/gear/2023-MT-THUNDER-4-SV_MIL_A11_01.webp',
  },
  {
    name: 'MT Thunder 4 SV Mountain – Gloss Blue',
    slug: 'mt-thunder-4-sv-mountain-gloss-blue',
    brand: 'MT',
    image: '/images/gear/DSC_6043.webp',
  },
  {
    name: 'MT Thunder 4 SV Mountain – Gloss Red',
    slug: 'mt-thunder-4-sv-mountain-gloss-red',
    brand: 'MT',
    image: '/images/gear/2023-MT-THUNDER-4-SV_MOUNTAIN_C5_01.webp',
  },
  {
    name: 'ORIGINE Delta Row – Gloss – Grey Titanium',
    slug: 'origine-delta-row-gloss-grey-titanium',
    brand: 'ORIGINE',
    image: '/images/gear/DSC_0281.webp',
  },
  {
    name: 'ORIGINE Delta Row – Gloss – Red – Black',
    slug: 'origine-delta-row-gloss-red-black',
    brand: 'ORIGINE',
    image: '/images/gear/DSC_0280.webp',
  },
  {
    name: 'ORIGINE Dinamo Core – Gloss Black Blue',
    slug: 'origine-dinamo-core-gloss-black-blue',
    brand: 'ORIGINE',
    image: '/images/gear/DSC_9373.webp',
  },
  {
    name: 'ORIGINE Dinamo Core – Gloss Black Red',
    slug: 'origine-dinamo-core-gloss-black-red',
    brand: 'ORIGINE',
    image: '/images/gear/DSC_9397.webp',
  },
  {
    name: 'ORIGINE Dinamo Faster – Gloss Black Blue',
    slug: 'origine-dinamo-faster-gloss-black-blue',
    brand: 'ORIGINE',
    image: '/images/gear/DSC_0261.webp',
  },
  {
    name: 'ORIGINE Dinamo Faster – Gloss Black Red',
    slug: 'origine-dinamo-faster-gloss-black-red',
    brand: 'ORIGINE',
    image: '/images/gear/DSC_0253-1.webp',
  },
  {
    name: 'ORIGINE Dinamo Sleeper – Gloss White Black',
    slug: 'origine-dinamo-sleeper-gloss-white-black',
    brand: 'ORIGINE',
    image: '/images/gear/FXP_2938.webp',
  },
  {
    name: 'ORIGINE Dinamo Solid – GLoss Black',
    slug: 'origine-dinamo-solid-gloss-black',
    brand: 'ORIGINE',
    image: '/images/gear/dinamo-solid-matt-black.webp',
  },
  {
    name: 'ORIGINE Dinamo Trak – Gloss Grey Black',
    slug: 'origine-dinamo-trak-gloss-grey-black',
    brand: 'ORIGINE',
    image: '/images/gear/DSC_0256-2.webp',
  },
  {
    name: 'ORIGINE Dinamo Trak – Gloss Red Black',
    slug: 'origine-dinamo-trak-gloss-red-black',
    brand: 'ORIGINE',
    image: '/images/gear/DSC_0259-scaled.webp',
  },
  {
    name: 'ORIGINE Strada Linestyle – Gloss Grey Black',
    slug: 'origine-strada-linestyle-gloss-grey-black',
    brand: 'ORIGINE',
    image: '/images/gear/Origine-Linestyle_Grey-Black_2.webp',
  },
  {
    name: 'ORIGINE Strada Linestyle – Gloss Red Black',
    slug: 'origine-strada-linestyle-gloss-red-black',
    brand: 'ORIGINE',
    image: '/images/gear/Origine-Linestyle_Red-Black_3.webp',
  },
  {
    name: 'ORIGINE Strada Solid – Matt Black',
    slug: 'origine-strada-solid-matt-black',
    brand: 'ORIGINE',
    image: '/images/gear/Origine-Strada-Solid-Matt-Black-3.webp',
  },
  {
    name: 'ORIGINE Strada Spider – Glossy Titanium',
    slug: 'origine-strada-spider-glossy-titanium',
    brand: 'ORIGINE',
    image: '/images/gear/spider-2.webp',
  },
  {
    name: 'ORIGINE Strada Velocity – Grey Black',
    slug: 'origine-strada-velocity-grey-black',
    brand: 'ORIGINE',
    image: '/images/gear/Strada-Velocity-Grey-Black_02.webp',
  },
  {
    name: 'TORQ Alpha Solid – Matt Black',
    slug: 'torq-alpha-solid-matt-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_6473-scaled.webp',
  },
  {
    name: 'TORQ Alpha Solid – Matt Red',
    slug: 'torq-alpha-solid-matt-red',
    brand: 'TORQ',
    image: '/images/gear/DSC_6474-scaled.webp',
  },
  {
    name: 'TORQ EVO Aqua – Blue-Black',
    slug: 'torq-evo-aqua-blue-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_6470-2.webp',
  },
  {
    name: 'TORQ EVO Aqua – Red-Black',
    slug: 'torq-evo-aqua-red-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_6469-2.webp',
  },
  {
    name: 'TORQ EVO Element – Gloss Grey Black',
    slug: 'torq-evo-element-gloss-grey-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_9779.webp',
  },
  {
    name: 'TORQ EVO Element – Gloss Red Black',
    slug: 'torq-evo-element-gloss-red-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_9789.webp',
  },
  {
    name: 'TORQ EVO Solid – Gloss Black',
    slug: 'torq-evo-solid-gloss-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_6471-2.webp',
  },
  {
    name: 'TORQ EVO Solid – Matt Black',
    slug: 'torq-evo-solid-matt-black',
    brand: 'TORQ',
    image: '/images/gear/TORQ-Evo-Matt-Black_2.webp',
  },
  {
    name: 'TORQ Nano Helmets – Gloss Black',
    slug: 'torq-nano-helmets-gloss-black',
    brand: 'TORQ',
    image: '/images/gear/Gloss-Black_3.webp',
  },
  {
    name: 'TORQ Nano Helmets – Gloss Red',
    slug: 'torq-nano-helmets-gloss-red',
    brand: 'TORQ',
    image: '/images/gear/Gloss-Red_3.webp',
  },
  {
    name: 'TORQ Nano Helmets – Matt Black',
    slug: 'torq-nano-helmets-matt-black',
    brand: 'TORQ',
    image: '/images/gear/Matt-Black-3.webp',
  },
  {
    name: 'TORQ Ranger Brexter – Gloss – Neon Orange/Navy Blue',
    slug: 'torq-ranger-brexter-gloss-neon-orange-navy-blue',
    brand: 'TORQ',
    image: '/images/gear/Layer-1-copy-2.webp',
  },
  {
    name: 'TORQ Ranger Brexter – Gloss – Neon Yellow/Black',
    slug: 'torq-ranger-brexter-gloss-neon-yellow-black',
    brand: 'TORQ',
    image: '/images/gear/Torq-Ranger-Brexter-Yellow-2-scaled.webp',
  },
  {
    name: 'Torq Legend Fuchus – Blue Black',
    slug: 'torq-legend-fuchus-blue-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_2125-2-scaled.webp',
  },
  {
    name: 'Torq Legend Fuchus – Grey Black',
    slug: 'torq-legend-fuchus-grey-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_2128-scaled.webp',
  },
  {
    name: 'Torq Legend Fuchus – Red Black',
    slug: 'torq-legend-fuchus-red-black',
    brand: 'TORQ',
    image: '/images/gear/DSC_2132-scaled.webp',
  },
]

export const gearBrands = ['MT', 'TORQ', 'ORIGINE'] as const
export type GearBrand = (typeof gearBrands)[number]

export const gearByBrand = (brand: GearBrand): GearItem[] =>
  gear.filter((item) => item.brand === brand)
