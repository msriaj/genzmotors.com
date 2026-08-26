# Gen-Z Motors — Authorized GPX Dealer, Uttara

Premium corporate site for Gen-Z Motors (part of Speedoz Limited): GPX motorcycle
showcase, showroom visits, test rides and phone/WhatsApp leads. Not e-commerce — no cart,
no checkout, no prices.

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm generate   # static output in .output/public
```

## Stack

Nuxt 4 · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Lenis · Three.js ·
`@nuxt/image` · `@nuxtjs/seo` (sitemap, robots, schema.org, OG images). Output is fully
static — deploy `.output/public` to any host.

## Where the content lives

| What | File |
| --- | --- |
| Motorcycle models, colourways, specs | `app/data/bikes.ts` |
| Helmets / gear | `app/data/gear.ts` |
| Dealership facts, showrooms, contact | `app/data/dealer.ts` |
| Photography | `public/images/` — see [ASSETS.md](ASSETS.md) |

All model data was taken from the Speedoz Limited catalogue (the parent company) and the
Gen-Z Motors listing. Nothing is estimated.

## Contact model

There are **no forms anywhere on this site** — no inputs, no storage, no backend. Every
enquiry is either a `tel:` link or a `wa.me` deep link with the first message already
written (`WhatsAppChoice.vue`, `whatsappLink()` in `app/data/dealer.ts`). The visitor keeps
the conversation in their own WhatsApp thread.

## Still to supply

These are `null` in `app/data/dealer.ts` and are deliberately hidden from the pages and
omitted from structured data until you fill them in:

- **Opening hours** — `dealer.openingHours`
- **Email address** — `dealer.contact.email`
- **Google Maps link, latitude, longitude** — `dealer.address` (switches on the map block)
- **Mymensingh showroom** — street, area, direct phone in `showrooms[1]`; until these
  exist the branch page stays out of LocalBusiness structured data
- **Authorization certificate / trade licence numbers** — `dealer.ownership`
- **Brochure PDFs** — model pages currently route brochure requests to WhatsApp

Photography still needed is listed in [ASSETS.md](ASSETS.md), each with an AI generation
prompt.

## Motion

- **`SiteBackground.vue`** — one fixed WebGL plane behind every page: volumetric red haze,
  a horizon grid that tilts with scroll velocity, drifting dust, and a bloom that follows
  the pointer. Paused when the tab is hidden.
- **`HeroZ.vue`** — the brand **Z** as ~7,200 particles sampled from the logo's own
  geometry. They spiral in from a spherical cloud, hold, disperse and re-form on a loop,
  and scatter away from the cursor with a ripple.
- **`CursorLens.vue`** — dot plus lagging ring; elements opt into states with
  `data-cursor="view"` and `data-cursor-label="…"`.
- **`useTextReveal`** — word-by-word masked heading reveals on scroll.
- Colourway switching: GPU crossfade — the photograph is never warped.
- Magnetic buttons, hover underlines, staggered section reveals.
- Scroll: Lenis smooth scroll, GSAP reveals, pinned spec index.
- Everything degrades: `prefers-reduced-motion` and non-WebGL clients get the static
  markup underneath, and no canvas blocks the LCP.

## SEO

Unique metadata per route, canonical URLs, `AutoDealer`/`MotorcycleDealer` +
`Product` + `BreadcrumbList` + `FAQPage` structured data, generated OG images, sitemap,
robots, and a local landing page per city: `/gpx-showroom-uttara` and
`/gpx-showroom-mymensingh`, linked from the `/showrooms` hub.
