# Assets

## Where the current imagery comes from

| Set | Source | Location in repo |
| --- | --- | --- |
| GPX Demon GR165R, GR165RR Da Corsa, GR250R studio shots | Speedoz Limited catalogue (parent company) — speedoz.com.bd | `public/images/bikes/` |
| GPX Demon GR165RR Da Corsa **Blue** | Gen-Z Motors catalogue — genzmotorsbd.com | `public/images/bikes/LOW_Final_22GR_*` |
| Helmets (MT, TORQ, ORIGINE) | Gen-Z Motors catalogue | `public/images/gear/` |
| Wordmark | Supplied by Gen-Z Motors (`genz logos v2.svg`) | `public/images/brand/genz-motors.svg`, inlined in `app/components/BrandLogo.vue` |

Product photography is shown on a white plate (`fit="contain"`), which is how the source
shots are cut out. Replace a file in place and nothing else needs to change.

## Photography still missing

Each shot below maps to a `<PhotoPlaceholder>` in the code. Drop a real file into
`public/images/showroom/`, swap the placeholder for `<NuxtImg>`, and delete the entry here.

Shoot landscape 3:2 unless noted, and shoot both showrooms — the Uttara page and the
Mymensingh page each need their own, so nothing is reused across cities.

### Uttara — `/gpx-showroom-uttara`, home

| # | Shot | Where it appears | Note |
| --- | --- | --- | --- |
| 1 | Showroom exterior at dusk, signage lit | home teaser, showroom page | The hero image of the branch — shoot wide, from across the road |
| 2 | Showroom floor with the Demon lineup on plinths | showroom page | Landscape 16:9, symmetrical down the aisle |
| 3 | Service bay, a bike on the lift, technician working | showroom page, `/service-support` | Portrait 4:5 for the showroom page, landscape for service |
| 4 | Spare parts counter, boxed genuine parts on shelves | showroom page | Close, shallow depth of field |
| 5 | Entrance from Road 09, a bike parked outside | showroom page | Street-level, morning light |
| 6 | Staff on the floor in front of the bikes | `/authorized-dealer` | Mid-shot, four people, no posed handshakes |

### Mymensingh — `/gpx-showroom-mymensingh`

| # | Shot | Where it appears | Note |
| --- | --- | --- | --- |
| 7 | Showroom exterior at Kadur Bari Mor | Mymensingh page | Same treatment as #1 so the two branches match |
| 8 | Showroom floor with the lineup | Mymensingh page | Landscape 16:9 |
| 9 | Service and parts corner | Mymensingh page | Shows the branch handles after-sales |

### Optional, high value

| # | Shot | Where it would go | Note |
| --- | --- | --- | --- |
| 10 | A customer riding away with a new bike | home, test ride | The only "lifestyle" shot worth having |
| 11 | Helmet wall, MT / TORQ / ORIGINE together | `/gear` | Replaces the cut-outs at the top of the page |
| 12 | Handover: keys, bike, owner | `/authorized-dealer` | Trust signal, faces optional |

**Practicalities:** shoot at 9 AM or after 6 PM to avoid harsh light; landscape unless
noted; 2400px on the long edge is plenty; JPEG straight from the camera is fine, the build
converts to AVIF/WebP. If a shot cannot be taken, tell me and I will keep the placeholder
rather than substitute stock.

### AI prompts, if you want stand-ins first

Each prompt is written for the shot with the same number above.

1. Photorealistic exterior of a modern motorcycle dealership at dusk, glass frontage, sport
   bikes visible inside, wet asphalt reflecting red light, rickshaws blurred on the road,
   24mm, cinematic grade, no text or logos.
2. Interior of a premium motorcycle showroom, polished dark concrete, three sport bikes on
   low white plinths under narrow spotlights, red LED line along the ceiling, 35mm.
3. Clean motorcycle workshop, one sport bike on a hydraulic lift, technician in dark uniform
   with a torque wrench, tool wall behind, 50mm, documentary lighting, no faces.
4. Motorcycle spare-parts counter, boxed parts on dark shelving, chain kits and brake discs,
   one part under a spotlight, dark background, single red accent, 35mm.
5. Street-level dealership entrance on a residential Dhaka road, glass door, one bike parked
   outside, early morning haze, power lines overhead, 28mm.
6. Four dealership staff in matching dark polo shirts in front of a row of sport bikes, mid
   shot, soft key light from the left, 50mm, natural skin tones.
7. Exterior of a motorcycle showroom on a busy small-city road in Bangladesh, evening, warm
   interior light spilling out, 24mm.
8. Motorcycle showroom interior, smaller floor, three bikes, bright even lighting, 35mm.
9. Service and parts corner of a small showroom, workbench, parts shelf, one bike waiting,
   35mm.
10. Rider pulling away from a dealership forecourt on a red sport bike, motion blur on the
    background, late afternoon, 85mm.
11. Wall of motorcycle helmets in a showroom, three brands grouped, even frontal light, 50mm.
12. Dealership handover moment, keys passed over a new motorcycle, showroom background out of
    focus, 85mm.

## Also missing

- **Brochure PDFs** per model — currently the model pages offer them over WhatsApp instead.
- **Map coordinates** — both branches now link to their Google listing; latitude and
  longitude in `app/data/dealer.ts` would additionally put geo fields in the structured data.
- **Mymensingh opening hours** — Uttara is set (every day, 9 AM to 9 PM); the Mymensingh
  page says to call until its hours are supplied.
