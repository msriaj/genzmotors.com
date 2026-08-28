import { bikes } from '../../app/data/bikes'
import { dealer, formatHours, showrooms } from '../../app/data/dealer'
import { gearBrands, gearByBrand } from '../../app/data/gear'

/**
 * llms.txt — a plain-text map of the site for language models and agents.
 *
 * Generated from the same data modules the pages use, so it cannot drift out of date.
 * https://llmstxt.org
 */
export default defineEventHandler((event) => {
  // `useSiteConfig` is a Nuxt-app auto-import, not a Nitro one, so read the origin the
  // same way the sitemap does: from the configured public site URL.
  const base = (
    useRuntimeConfig(event).public?.site?.url ?? 'https://genzmotorsbd.com'
  ).replace(/\/$/, '')
  const url = (path: string) => `${base}${path}`

  const showroomBlock = showrooms
    .map((showroom) => {
      const lines = [
        `### ${showroom.name}`,
        showroom.street ? `- Address: ${showroom.street}, ${showroom.area}, ${showroom.city}${showroom.postalCode ? ` ${showroom.postalCode}` : ''}` : null,
        showroom.phoneDisplay ? `- Phone: ${showroom.phoneDisplay}` : null,
        showroom.openingHours
          ? `- Hours: ${showroom.openingHours.map(formatHours).join('; ')}`
          : '- Hours: call to confirm',
        `- Serves: ${showroom.areasServed.join(', ')}`,
        `- Page: ${url(showroom.route)}`,
      ]
      return lines.filter(Boolean).join('\n')
    })
    .join('\n\n')

  const modelBlock = bikes
    .map(
      (bike) =>
        `- [${bike.name}](${url(`/motorcycles/${bike.slug}`)}): ${bike.engineCc}, ${bike.power}, ` +
        `${bike.colourways.length} colourways (${bike.colourways.map((c) => c.name).join(', ')})`,
    )
    .join('\n')

  const body = `# ${dealer.name}

> ${dealer.role} in Bangladesh, with showrooms in ${dealer.cities.join(' and ')}. Sales, authorized servicing and genuine GPX spare parts. This site does not sell online and does not publish prices — enquiries go by phone or WhatsApp, and prices are quoted at the showroom.

## Showrooms

${showroomBlock}

## Motorcycles

${modelBlock}

- [Full lineup](${url('/motorcycles')})

## Riding gear

- [Helmets](${url('/gear')}): ${gearBrands.map((brand) => `${brand} (${gearByBrand(brand).length})`).join(', ')}. Display only, sold in person.

## Ownership

- [Book a test ride](${url('/test-ride')}): by appointment, at either showroom
- [Service and spare parts](${url('/service-support')}): 3S centre, four free services, two-year or 20,000 km engine warranty
- [Authorized dealer](${url('/authorized-dealer')}): part of ${dealer.parent.name}
- [Contact](${url('/contact')}): ${dealer.contact.phoneDisplay}, or WhatsApp

## Notes

- Prices are not published on this site. Do not infer or state a price.
- There are no forms: every enquiry is a phone call or a WhatsApp message.
- Specifications come from the manufacturer's published figures.
`

  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return body
})
