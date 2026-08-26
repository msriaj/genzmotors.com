# Gen-Z Motors — Authorized GPX Dealer Site (Uttara, Dhaka)

Date: 2026-08-23
Status: Approved, then revised during build (see "Revisions" at the end)

## Goal

Replace the WooCommerce storefront (`genzmotorsbd.com`) with a premium **corporate brand
site** for an authorized GPX motorcycle dealer. Not e-commerce: no cart, no checkout, no
payment. Success = showroom visits, test-ride bookings, and phone/WhatsApp leads, driven by
local search for "GPX Dealer Uttara", "GPX Showroom Uttara", "GPX Motorcycle Uttara",
"GPX Dhaka".

Priority order: Premium interactive experience → GPX product showcase → local SEO →
lead generation → performance.

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Nuxt 4.5, TypeScript, `compatibilityVersion: 4` |
| Rendering | SSG — `nuxt generate`, every route prerendered, deployable to static hosting |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite`, design tokens in `app/assets/css/main.css` |
| SEO | `@nuxtjs/seo` (sitemap, robots, schema-org, link-checker, og-image) |
| Images | `@nuxt/image`, AVIF/WebP, responsive `sizes`, explicit dimensions |
| Motion | GSAP 3.15 + ScrollTrigger, Lenis smooth scroll |
| WebGL | Three.js 0.185, shader planes only — no GLTF, no orbit scenes |

## Content model

Typed data modules under `app/data/`. No CMS, no runtime fetch. Every fact is taken from the
existing site; nothing about specs, prices, or dealership status is invented.

- `bikes.ts` — 2 GPX models, 6 colorways
  - **GPX Demon GR165R** — ৳324,999 — Red Fire, Black Space
  - **GPX Demon GR165RR Da Corsa** — ৳374,999 — Blue, Racing Gray, Red, Daytona Black
  - Spec sheets copied verbatim from the current product descriptions.
- `gear.ts` — helmet showcase, 69 items across MT (38), TORQ (16), ORIGINE (15). Display only.
- `dealer.ts` — House 29, Road 09, Sector 15, Diabari, Uttara, Dhaka; 01609-711911;
  3S centre (Sales, Service, Spare Parts); 4 free services; 2 years / 20,000 km engine warranty;
  nationwide on-call support; guaranteed spare-parts availability.

Unknown facts are declared once in `app/data/dealer.ts` as `null` with a `TODO` comment and are
**omitted from JSON-LD** until supplied: opening hours, email address, map coordinates /
place ID, authorization certificate number, service pricing, brochure PDFs.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Cinematic hero, model showcase, dealer proof, showroom teaser, lead CTAs |
| `/motorcycles` | Lineup grid with scroll-driven reveals |
| `/motorcycles/[slug]` | Overview, gallery, features, full specs, colorways, price, CTAs |
| `/gear` | Helmet showcase filtered by brand |
| `/authorized-dealer` | About / authorization / 3S capability |
| `/gpx-showroom-uttara` | Dedicated local-SEO landing page (directions, area coverage, FAQ) |
| `/service-support` | Servicing, warranty, spare parts, on-call support |
| `/test-ride` | Test-ride request flow → WhatsApp deep link |
| `/contact` | Address, phone, WhatsApp, map, enquiry form |

## Motion system

Effects are attached to sections, not to the whole app, and each one degrades to static markup.

1. **Hero reveal** — Three.js plane, custom fragment shader: displacement wipe + moving
   specular light sweep over the GR165RR photo, driven by a GSAP timeline.
2. **Colorway morph** — on a model page, switching colorway runs a WebGL displacement +
   RGB-shift transition between the two real photographs of that colorway.
3. **Scroll storytelling** — pinned spec sections, clip-path text masks, layered parallax,
   number counters. GSAP/ScrollTrigger only, no WebGL.
4. **Page transitions** — shader wipe overlay on route change.
5. **Micro-interaction** — magnetic buttons, cursor-follow highlight, marquee.

Guard rails:
- Every WebGL canvas is dynamically imported and mounted only when its section intersects.
- `prefers-reduced-motion: reduce` disables Lenis, ScrollTrigger effects, and all WebGL —
  the static `<NuxtImg>` underneath is what renders.
- No canvas above the fold blocks LCP: the hero image is a real `<NuxtImg>` with
  `preload`/`fetchpriority=high`; the shader canvas fades in over it after load.
- Renderers are disposed on unmount; `powerPreference: 'high-performance'`, DPR capped at 2.

## SEO

- Unique `title`/`description`/OG per route via `useSeoMeta`; canonical from `site.url`.
- JSON-LD: `AutoDealer` (extends `LocalBusiness`) sitewide; `Product` + `Offer` per model;
  `BreadcrumbList` on nested routes; `FAQPage` on the showroom landing page.
- `sitemap.xml`, `robots.txt`, semantic landmarks, single `h1` per page, descriptive alt text.
- Internal linking: home → models → showroom → test ride, plus a persistent footer hub.
- Core Web Vitals: prerendered HTML, no render-blocking JS beyond Nuxt's own, fonts
  `display: swap` and self-hosted, images sized and lazy below the fold.

## Lead generation

No backend. `tel:` links, and forms that compose a prefilled `wa.me/8801609711911` message
(model, colorway, preferred date, name). Sticky mobile call/WhatsApp bar. Test-ride and
enquiry CTAs repeat on every model page.

## Assets

Real photography is reused from the current site: 6 GPX colorway shots, hero sliders, logo.
Missing categories — showroom exterior/interior, service bay, staff, test-ride lifestyle,
brochure PDFs — ship as styled placeholders, each with a matching AI generation prompt in
`ASSETS.md`.

## Out of scope

Cart, checkout, payments, user accounts, wishlist, blog, CMS, i18n, analytics installation
(hooks left in `app.config.ts`).


## Revisions during build

1. **Catalogue source changed.** Gen-Z Motors' parent company, Speedoz Limited
   (speedoz.com.bd), carries the current GPX lineup, so its product data and photography
   became the source of truth. That added a third model — **GPX Demon GR250R** (249.6 cc,
   29 bhp, ABS + TCS) — and refreshed the spec sheets. The Da Corsa **Blue** colourway,
   which Speedoz no longer lists, is carried over from the Gen-Z Motors listing. Nine
   colourways across three models in total.
2. **Prices removed.** No price appears anywhere in the UI, and `Product` structured data
   carries no `Offer` (an Offer without a price would be invalid). Pages say pricing is
   quoted at the counter.
3. **Hero is no longer a motorcycle photograph.** It is a procedural WebGL light field —
   carbon weave, a receding floor grid, red light ribbons — with the brand **Z** extruded
   in 3D above it (`HeroZ.vue`, `MeshPhysicalMaterial` lit by a procedurally generated
   environment map).
4. **Hover distortion dropped.** Lineup cards no longer run a distortion shader; hover is
   a 3% scale and a border tint. The colourway change is a clean GPU crossfade with no
   displacement or channel splitting.
5. **Brand palette applied.** Toyota red (#eb0a1e), white and black, from the supplied
   wordmark (`public/images/brand/genz-motors.svg`, inlined as `BrandLogo.vue`).
6. **Light theme.** Pages are white/near-white with black text; the hero, the closing
   call-to-action band and the footer stay black as deliberate punctuation. Product shots
   are cut out on white, so they sit on the light surface without a visible plate.
7. **Second showroom.** A Mymensingh branch was added to `app/data/dealer.ts` as a
   `Showroom` record. Its street address and direct line are unknown, so those fields are
   `null`, the UI shows the branch without inventing details, and it is excluded from
   structured data until the address is supplied.
8. **Second city in the content, not just the data.** The site now reads as a two-city
   dealer: a `/showrooms` hub, a second local landing page at `/gpx-showroom-mymensingh`,
   a showroom picker on the test-ride form, and copy, titles and descriptions that name
   both Uttara and Mymensingh. Each branch carries its own `offers` and `areasServed`
   list; `areaServed` in the structured data spans both. The Mymensingh street address and
   direct line are still unknown, so that page states what is known and routes callers to
   the main number instead of inventing an address.
9. **Back to a dark theme.** The light experiment was reverted. Surfaces are lifted off
   pure black (`#0c0c0e` page, `#131317` cards) so panels separate; pure black is kept for
   the hero and the closing band. Product photography keeps a white plate, because the
   source shots are cut out on white.
10. **The Z is a particle formation.** `HeroZ.vue` rasterises the logo's Z off-screen,
    samples ~7,200 opaque pixels as targets, and animates a single `THREE.Points` cloud
    through assemble → hold → disperse on a loop, with pointer repulsion. One draw call,
    no per-particle objects. The extruded-solid version it replaced is gone.
11. **A site-wide interactive background.** Taking the interaction cues from the
    reference the client shared (dashcreative.co — GSAP + Lenis + WebGL), the hero's own
    shader plane was replaced by `SiteBackground.vue`: a single fixed WebGL plane behind
    every page that reacts to pointer position, scroll position and scroll velocity. One
    canvas for the whole site rather than one per section.
12. **Reference motion patterns.** A two-part custom cursor with per-element states, and
    word-by-word masked heading reveals (`useTextReveal`). Magnetic buttons were fixed
    along the way: the ref can hold a `NuxtLink` component instance rather than an
    element, which was throwing on every internal-link button.
13. **Hero rewritten.** The headline is a sentence again — "Authorized / GPX dealer /
    Uttara · Mymensingh" staged across three weights and sizes — with a twelve-column
    layout that keeps the type in the left half and the particle mark in the right, and a
    four-item fact rail on a rule at the bottom. The whole section now fits one viewport
    on a laptop. A leftover `plane?.dispose()` from the removed hero shader was throwing
    on every mount; it is gone.
14. **Type scale retuned.** `display-hero`, `display-xl` and `display-lg` were sized for a
    full-bleed hero and were overwhelming as page headers and card titles. All three came
    down (hero 10.5rem → 5.5rem at the top of the clamp).
15. **Three models, no orphan card.** A three-model lineup in a two-column grid left a
    lone card, so `BikeCard` gained a `featured` variant: the GR250R runs full width as a
    two-column feature, and the two 165s pair up underneath. Used on both the home page
    and the lineup page.
16. **No forms at all.** The test-ride and contact forms were removed. Both pages are now
    sets of one-tap choices that open WhatsApp with the message pre-written
    (`WhatsAppChoice.vue`): a card per Demon with a button per showroom on `/test-ride`,
    and a card per topic on `/contact`, alongside the phone number. The site collects
    nothing, which also means there is no data to store, protect or lose.
