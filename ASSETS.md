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

Each `<PhotoPlaceholder label="…">` in the codebase maps to one shot below. Drop a real
file into `public/images/showroom/`, swap the placeholder for `<NuxtImg>`, and delete the
entry here.

### 1. Showroom exterior, Sector 15 Diabari
*Used on:* home, `/gpx-showroom-uttara`

> Photorealistic exterior of a modern motorcycle dealership at dusk in Uttara, Dhaka.
> Two-storey glass frontage, red and white signage reading nothing legible, sport bikes
> visible through the glass, wet asphalt reflecting red light, a few rickshaws blurred in
> motion on the road. Wide 24mm perspective, low camera, cinematic colour grade, deep
> blacks, single dominant red accent. No text, no logos, no people's faces.

### 2. Showroom floor with the GPX Demon lineup
*Used on:* `/gpx-showroom-uttara`

> Interior of a premium motorcycle showroom, polished dark concrete floor, three sport
> bikes on low white plinths under narrow spotlights, black walls with subtle brushed
> metal panels, red LED strip along the ceiling line. Symmetrical composition, 35mm,
> shallow depth of field, editorial lighting. No text, no branding.

### 3. Service bay, 3S centre
*Used on:* `/gpx-showroom-uttara`, `/service-support`

> A clean motorcycle service workshop, one sport bike on a hydraulic lift, technician in
> dark uniform working with a torque wrench, tool wall in focus behind, cool overhead
> light with warm task lamp on the bike. Documentary style, 50mm, natural colour, no faces
> clearly visible, no text.

### 4. Spare parts counter
*Used on:* `/gpx-showroom-uttara`

> Genuine motorcycle spare-parts counter: boxed parts on dark shelving, chain kits, brake
> discs and filters neatly arranged, one part held on the counter under a spotlight.
> Dark background, single red accent, product-documentary lighting, 35mm. No text.

### 5. Showroom entrance from Road 09
*Used on:* `/gpx-showroom-uttara`

> Street-level view of a dealership entrance on a residential Dhaka road, glass door
> flanked by dark panels, a sport bike parked outside, early-morning light, mild haze,
> power lines overhead. Photojournalistic, 28mm, natural colour. No readable signage.

### 6. Team at the Uttara showroom
*Used on:* `/authorized-dealer`

> Four dealership staff in matching dark polo shirts standing in front of a row of sport
> bikes inside a showroom, relaxed posture, mid-shot, soft key light from the left, dark
> background. Editorial corporate portrait, 50mm, natural skin tones. Faces may be
> partially turned away.

### 7. Service bay with a Demon on the lift
*Used on:* `/service-support`

> A red sport bike raised on a workshop lift, front wheel removed, tools laid out on a
> cart, dark workshop with a shaft of daylight from the left. Cinematic, 35mm, high
> contrast, deliberate negative space on the right for text overlay.

## Also missing

- **Brochure PDFs** per model — currently the model pages offer them over WhatsApp instead.
- **Google Maps place URL and coordinates** — add to `app/data/dealer.ts` to switch on the
  map embed and the geo fields in structured data.
