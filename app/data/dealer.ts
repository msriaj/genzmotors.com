/**
 * Single source of truth for dealership facts.
 *
 * Everything here was taken from the existing Gen-Z Motors website. Fields set to `null`
 * are NOT known — they are deliberately left empty, omitted from JSON-LD, and hidden in the
 * UI rather than guessed. Fill them in and the pages and structured data pick them up.
 */

export interface DealerContact {
  phoneDisplay: string
  phoneDial: string
  whatsapp: string
  email: string | null
}

export interface OpeningHours {
  /** Human label, e.g. 'Every day'. */
  days: string
  /** 24-hour times, so they can go straight into schema.org. */
  opens: string
  closes: string
  /** schema.org day names this slot covers. */
  dayOfWeek: string[]
}

export interface Showroom {
  slug: string
  /** Route segment for this showroom's local landing page. */
  route: string
  name: string
  city: string
  region: string
  /** Null until Gen-Z Motors supplies the details — never guessed, never in JSON-LD. */
  street: string | null
  area: string | null
  postalCode: string | null
  phoneDisplay: string | null
  phoneDial: string | null
  mapsPlaceUrl: string | null
  latitude: number | null
  longitude: number | null
  /** Null while the branch has not confirmed its hours — never guessed. */
  openingHours: OpeningHours[] | null
  isPrimary: boolean
  /** What this branch does, for the hub and landing pages. */
  offers: string[]
  /** Neighbourhoods this branch draws from — used for local SEO copy and areaServed. */
  areasServed: string[]
}

/**
 * Every Gen-Z Motors location. Uttara is documented; the Mymensingh branch exists but
 * its address and direct line have not been supplied, so those fields stay null and the
 * UI shows the branch without inventing details.
 */
export const showrooms: Showroom[] = [
  {
    slug: 'uttara',
    route: '/gpx-showroom-uttara',
    name: 'GPX Showroom Uttara',
    city: 'Uttara, Dhaka',
    region: 'Dhaka',
    street: 'House 29, Road 09',
    area: 'Sector 15, Diabari',
    postalCode: null,
    phoneDisplay: '01609-711911',
    phoneDial: '+8801609711911',
    mapsPlaceUrl: 'https://share.google/Y76sjlhHvYEUme2DB',
    latitude: null,
    longitude: null,
    openingHours: [
      {
        days: 'Every day',
        opens: '09:00',
        closes: '21:00',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      },
    ],
    isPrimary: true,
    offers: [
      'New GPX motorcycle sales',
      'Authorized service bay',
      'Genuine spare parts counter',
      'Helmets and rider gear',
      'Test rides by appointment',
    ],
    areasServed: [
      'Uttara Sector 1–18',
      'Diabari',
      'Turag',
      'Airport / Dakshinkhan',
      'Tongi',
      'Mirpur & Pallabi',
      'Gulshan & Banani',
      'Greater Dhaka',
    ],
  },
  {
    slug: 'mymensingh',
    route: '/gpx-showroom-mymensingh',
    name: 'GPX Showroom Mymensingh',
    city: 'Mymensingh',
    region: 'Mymensingh',
    street: 'Kadur Bari Mor',
    area: 'Digharkanda, Mymensingh Sadar',
    postalCode: '2200',
    phoneDisplay: '01601-711903',
    phoneDial: '+8801601711903',
    mapsPlaceUrl: 'https://share.google/HE41qbImNSPNLimNi',
    latitude: null,
    longitude: null,
    openingHours: null,
    isPrimary: false,
    offers: ['New GPX motorcycle sales', 'Service and spare parts support', 'Helmets and rider gear'],
    areasServed: ['Mymensingh city', 'Trishal', 'Bhaluka', 'Muktagacha', 'Gouripur', 'Greater Mymensingh'],
  },
]

export const primaryShowroom = (): Showroom => showrooms.find((s) => s.isPrimary) ?? showrooms[0]!

/** A branch is only publishable in full once it has a street address. */
export const isDocumented = (showroom: Showroom): boolean => showroom.street !== null

export const dealer = {
  name: 'Gen-Z Motors',
  legalName: 'Gen-Z Motors',
  role: 'Authorized GPX Motorcycles dealer',
  /** 3S = Sales, Service, Spare Parts — as stated on the current site. */
  centreType: '3S Centre (Sales, Service, Spare Parts)',
  brand: 'GPX Motorcycles',

  address: {
    street: 'House 29, Road 09',
    sector: 'Sector 15, Diabari',
    city: 'Uttara, Dhaka',
    region: 'Dhaka',
    country: 'Bangladesh',
    countryCode: 'BD',
    postalCode: null as string | null,
    /** Needed for a map embed and for geo coordinates in schema. Not published on the old site. */
    mapsPlaceUrl: null as string | null,
    latitude: null as number | null,
    longitude: null as number | null,
  },

  contact: {
    phoneDisplay: '01609-711911',
    phoneDial: '+8801609711911',
    whatsapp: '8801609711911',
    email: null,
  } satisfies DealerContact,

  ownership: {
    /** Authorization paperwork numbers are not public. Do not invent one. */
    authorizationCertificate: null as string | null,
    tradeLicence: null as string | null,
  },

  /** Verbatim after-sales commitments from the current About page. */
  ownershipPromises: [
    { title: '4 free services', detail: 'Included with every new GPX motorcycle purchased here.' },
    {
      title: '2 years / 20,000 km engine warranty',
      detail: 'Whichever comes first, on the engine of your new GPX.',
    },
    { title: 'Nationwide on-call support', detail: 'Reach the team by phone from anywhere in Bangladesh.' },
    {
      title: 'Guaranteed spare parts availability',
      detail: 'Genuine GPX parts stocked at the Uttara counter.',
    },
  ],

  /**
   * Speedoz Limited is the parent company; its catalogue is the source for the GPX
   * lineup on this site. Details below are taken from speedoz.com.bd.
   */
  parent: {
    name: 'Speedoz Limited',
    url: 'https://speedoz.com.bd',
    flagshipShowroom:
      'Pacific Center (Ground Floor), 14 Mohakhali C/A, Bir Uttam A.K. Khandakar Sarak, Dhaka 1212',
    centralServiceCentre: '7 VIP Road, behind SKS Tower, Mohakhali 1206',
    phones: ['01990-400600', '01990-400603'],
  },

  /** Cities with a Gen-Z Motors showroom, in the order they should be listed. */
  cities: ['Uttara, Dhaka', 'Mymensingh'],
} as const

/** Every neighbourhood served, across all branches. */
export const allAreasServed = (): string[] => showrooms.flatMap((s) => s.areasServed)

export const showroomBySlug = (slug: string): Showroom | undefined =>
  showrooms.find((s) => s.slug === slug)

/** A branch can be mapped as soon as it has a Google listing, coordinates or not. */
export const hasMap = (showroom: Showroom): boolean => showroom.mapsPlaceUrl !== null

/** '9:00 AM' from '09:00' — schema keeps 24-hour, the page shows 12-hour. */
export const formatTime = (value: string): string => {
  const [h = '0', m = '00'] = value.split(':')
  const hour = Number(h)
  const suffix = hour < 12 ? 'AM' : 'PM'
  const display = hour % 12 === 0 ? 12 : hour % 12
  return m === '00' ? `${display} ${suffix}` : `${display}:${m} ${suffix}`
}

/** 'Every day, 9 AM to 9 PM' */
export const formatHours = (slot: OpeningHours): string =>
  `${slot.days}, ${formatTime(slot.opens)} to ${formatTime(slot.closes)}`

export const fullAddress = (): string =>
  `${dealer.address.street}, ${dealer.address.sector}, ${dealer.address.city}`

/** Builds a wa.me deep link with a prefilled message. */
export const whatsappLink = (message: string): string =>
  `https://wa.me/${dealer.contact.whatsapp}?text=${encodeURIComponent(message)}`

export const telLink = (): string => `tel:${dealer.contact.phoneDial}`
