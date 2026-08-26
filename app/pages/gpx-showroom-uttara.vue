<script setup lang="ts">
/** Dedicated local-SEO landing page for "GPX Showroom Uttara" style searches. */
import { dealer, fullAddress, hasMap, showroomBySlug, showrooms, telLink, whatsappLink } from '~/data/dealer'
import { bikes } from '~/data/bikes'

const uttara = showroomBySlug('uttara')!

const faqs = [
  {
    q: 'Where is the GPX showroom in Uttara?',
    a: `Gen-Z Motors is at ${fullAddress()}, Dhaka. It is inside Sector 15, Diabari, a short ride from Uttara Sectors 1 to 18, Turag and the airport road.`,
  },
  {
    q: 'Is Gen-Z Motors an authorized GPX dealer?',
    a: 'Yes. Gen-Z Motors is an authorized GPX Motorcycles dealer and operates as a 3S centre — sales, service and genuine spare parts in one place.',
  },
  {
    q: 'Which GPX motorcycles can I see in Uttara?',
    a: `The showroom stocks the ${bikes.map((b) => b.name).join(' and the ')}, across ${bikes.reduce((n, b) => n + b.colourways.length, 0)} factory colourways.`,
  },
  {
    q: 'Can I test ride a GPX bike before buying?',
    a: 'Yes. Test rides are arranged by appointment. Call or WhatsApp the showroom with your preferred model and time, and the bike will be ready when you arrive.',
  },
  {
    q: 'What after-sales support comes with a new GPX?',
    a: 'Four free services, a two-year or 20,000 km engine warranty (whichever comes first), nationwide on-call support and guaranteed genuine spare-parts availability.',
  },
  {
    q: 'Does Gen-Z Motors have a showroom outside Dhaka?',
    a: 'Yes — alongside the Uttara showroom there is a Gen-Z Motors showroom in Mymensingh. Call 01609-711911 for its address and opening times.',
  },
  {
    q: 'Do you service GPX motorcycles bought elsewhere?',
    a: 'The service bay is a GPX 3S centre and handles GPX motorcycles. Call the showroom with your model and chassis details before visiting so parts can be checked.',
  },
]

useSeoMeta({
  title: 'GPX Showroom Uttara | Authorized Dealer, Sector 15',
  description:
    'GPX showroom in Sector 15, Diabari, Uttara — House 29, Road 09. Authorized dealer and 3S centre: sales, service, genuine parts and test rides.',
  ogTitle: 'GPX Showroom Uttara — Gen-Z Motors',
  ogDescription:
    'Authorized GPX dealer and 3S centre in Sector 15, Diabari, Uttara. Test rides by appointment.',
})

defineOgImageComponent('Dealer', {
  title: 'GPX Showroom Uttara',
  description: 'House 29, Road 09, Sector 15, Diabari',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Showrooms', item: '/showrooms' },
      { name: 'GPX Showroom Uttara', item: '/gpx-showroom-uttara' },
    ],
  }),
  {
    '@type': 'FAQPage',
    'mainEntity': faqs.map((item) => ({
      '@type': 'Question',
      'name': item.q,
      'acceptedAnswer': { '@type': 'Answer', text: item.a },
    })),
  },
])

const openFaq = ref<number | null>(0)
const grid = ref<HTMLElement | null>(null)
useReveal(grid, { children: '[data-reveal]', stagger: 0.07 })
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Showrooms', to: '/showrooms' }, { label: 'Uttara' }]" />

      <div class="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p class="eyebrow mb-5">Sector 15 · Diabari · Uttara</p>
          <h1 class="display-hero text-ink">
            GPX Showroom<br ><span class="text-gpx">Uttara</span>
          </h1>
        </div>
        <div>
          <p class="text-lg leading-relaxed text-muted">
            Gen-Z Motors is the authorized GPX Motorcycles dealer for Uttara — a full 3S centre
            where the same roof covers sales, servicing and genuine spare parts.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <AppButton :href="telLink()">Call {{ dealer.contact.phoneDisplay }}</AppButton>
            <AppButton
              :href="whatsappLink('Hi Gen-Z Motors, I would like to visit the Uttara showroom.')"
              variant="ghost"
            >
              WhatsApp
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- Visit card -------------------------------------------------------- -->
    <section class="container-x py-16 lg:py-24">
      <div class="grid gap-8 lg:grid-cols-3">
        <div class="border border-line bg-card p-8">
          <h2 class="eyebrow mb-4">Address</h2>
          <address class="not-italic text-lg leading-relaxed text-ink">
            {{ dealer.address.street }}<br >
            {{ dealer.address.sector }}<br >
            {{ dealer.address.city }}
          </address>
          <a
            v-if="dealer.address.mapsPlaceUrl"
            :href="dealer.address.mapsPlaceUrl"
            target="_blank"
            rel="noopener"
            class="mt-5 inline-block font-display text-sm uppercase tracking-[0.18em] text-gpx"
          >
            Open in Google Maps
          </a>
        </div>

        <div class="border border-line bg-card p-8">
          <h2 class="eyebrow mb-4">Contact</h2>
          <a
            :href="telLink()"
            class="block font-display text-2xl text-ink transition-colors hover:text-gpx"
          >
            {{ dealer.contact.phoneDisplay }}
          </a>
          <p class="mt-3 text-sm leading-relaxed text-muted">
            Nationwide on-call support for GPX owners.
          </p>
        </div>

        <div class="border border-line bg-card p-8">
          <h2 class="eyebrow mb-4">On site</h2>
          <ul class="space-y-2 text-sm text-muted">
            <li v-for="item in uttara.offers" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Showroom imagery --------------------------------------------------- -->
    <section ref="grid" class="container-x pb-16 lg:pb-24">
      <div class="grid gap-6 md:grid-cols-3">
        <div data-reveal class="js-reveal md:col-span-2">
          <PhotoPlaceholder label="Showroom floor with GPX Demon lineup" ratio="16 / 9" />
        </div>
        <div data-reveal class="js-reveal">
          <PhotoPlaceholder label="Service bay, GPX 3S centre" ratio="4 / 5" />
        </div>
        <div data-reveal class="js-reveal">
          <PhotoPlaceholder label="Spare parts counter" ratio="4 / 3" />
        </div>
        <div data-reveal class="js-reveal md:col-span-2">
          <PhotoPlaceholder label="Showroom entrance from Road 09, Sector 15" ratio="16 / 9" />
        </div>
      </div>
    </section>

    <!-- Models in stock ----------------------------------------------------- -->
    <section class="border-y border-line bg-paper-soft py-20 lg:py-28">
      <div class="container-x">
        <SectionHeading
          eyebrow="On the floor"
          title="GPX models you can see today"
          lead="Walk in and inspect every colourway in person before deciding."
        />
        <ul class="mt-12 divide-y divide-line border-y border-line">
          <li
            v-for="bike in bikes"
            :key="bike.slug"
            class="flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <NuxtLink
                :to="`/motorcycles/${bike.slug}`"
                class="font-display text-2xl uppercase text-ink transition-colors hover:text-gpx"
              >
                {{ bike.name }}
              </NuxtLink>
              <p class="mt-1 text-sm text-muted">
                {{ bike.colourways.length }} colourways · {{ bike.engineCc }} · {{ bike.power }}
              </p>
            </div>
            <NuxtLink
              :to="`/motorcycles/${bike.slug}`"
              class="font-display text-sm uppercase tracking-[0.18em] text-gpx"
            >
              View model
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- Areas served -------------------------------------------------------- -->
    <section class="container-x py-20 lg:py-28">
      <SectionHeading
        eyebrow="Areas we serve"
        title="Riders across north Dhaka"
        lead="Customers ride in from across Uttara and the surrounding areas for sales and servicing."
      />
      <ul class="mt-10 flex flex-wrap gap-3">
        <li
          v-for="area in uttara.areasServed"
          :key="area"
          class="border border-line px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-muted"
        >
          {{ area }}
        </li>
      </ul>
    </section>

    <!-- Other branch --------------------------------------------------------- -->
    <section class="border-t border-line bg-paper-soft py-16">
      <div class="container-x">
        <SectionHeading eyebrow="Also find us" title="Gen-Z Motors showrooms" />
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <div
            v-for="showroom in showrooms"
            :key="showroom.slug"
            class="border border-line bg-card p-8"
          >
            <NuxtLink
              :to="showroom.route"
              class="font-display text-2xl uppercase text-ink transition-colors hover:text-gpx"
            >
              {{ showroom.city }}
            </NuxtLink>
            <address v-if="showroom.street" class="mt-3 not-italic text-sm leading-relaxed text-muted">
              {{ showroom.street }}, {{ showroom.area }}<br >
              {{ showroom.city }}
            </address>
            <p v-else class="mt-3 text-sm leading-relaxed text-muted">
              Address and direct line are being confirmed — call
              {{ dealer.contact.phoneDisplay }} and we will point you to the branch.
            </p>
            <a
              :href="showroom.phoneDial ? `tel:${showroom.phoneDial}` : telLink()"
              class="mt-5 inline-block font-display text-sm uppercase tracking-[0.18em] text-gpx"
            >
              {{ showroom.phoneDisplay ?? dealer.contact.phoneDisplay }}
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ ------------------------------------------------------------------ -->
    <section class="border-t border-line bg-paper-soft py-20 lg:py-28">
      <div class="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Questions" title="Before you visit" />

        <div class="divide-y divide-line border-y border-line">
          <div v-for="(faq, i) in faqs" :key="faq.q">
            <h3>
              <button
                type="button"
                class="flex w-full items-center justify-between gap-6 py-6 text-left"
                :aria-expanded="openFaq === i"
                @click="openFaq = openFaq === i ? null : i"
              >
                <span class="font-display text-lg uppercase tracking-wide text-ink">
                  {{ faq.q }}
                </span>
                <span
                  class="shrink-0 text-2xl leading-none text-gpx transition-transform duration-300"
                  :class="openFaq === i ? 'rotate-45' : ''"
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
            </h3>
            <div v-show="openFaq === i" class="pb-6 text-sm leading-relaxed text-muted">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="!hasMap()" class="container-x py-16">
      <p class="text-xs uppercase tracking-[0.2em] text-muted">
        Map embed pending — add coordinates in app/data/dealer.ts
      </p>
    </section>
  </div>
</template>
