<script setup lang="ts">
/**
 * Local landing page for Mymensingh searches.
 *
 * The branch has its own address and direct line, so it carries its own AutoDealer node
 * in the structured data rather than deferring to the Uttara identity.
 */
import { dealer, showroomBySlug, telLink, whatsappLink } from '~/data/dealer'
import { bikes } from '~/data/bikes'

const branch = showroomBySlug('mymensingh')!

const faqs = [
  {
    q: 'Where is the GPX showroom in Mymensingh?',
    a: `Gen-Z Motors is at ${branch.street}, ${branch.area}, Mymensingh ${branch.postalCode}. Call ${branch.phoneDisplay} for directions.`,
  },
  {
    q: 'Which GPX motorcycles can I see in Mymensingh?',
    a: `Gen-Z Motors carries the ${bikes.map((b) => b.name).join(', ')}. Call ahead to confirm which colourways are on the Mymensingh floor.`,
  },
  {
    q: 'Can I book a test ride in Mymensingh?',
    a: `Yes, by appointment. Call ${branch.phoneDisplay} or send your preferred model and day on WhatsApp, and the team will confirm the time.`,
  },
  {
    q: 'Do you deliver to areas around Mymensingh?',
    a: `The branch serves ${branch.areasServed.join(', ')}. Call ${branch.phoneDisplay} to arrange collection or delivery.`,
  },
]

useSeoMeta({
  title: 'GPX Showroom Mymensingh | Gen-Z Motors Dealer',
  description:
    'Authorized GPX showroom at Kadur Bari Mor, Digharkanda, Mymensingh Sadar. See the Demon lineup, book a test ride, get genuine parts. Call 01601-711903.',
  ogTitle: 'GPX Showroom Mymensingh — Gen-Z Motors',
  ogDescription: 'Authorized GPX dealer serving Mymensingh and the surrounding upazilas.',
})

defineOgImageComponent('Dealer', {
  title: 'GPX Showroom Mymensingh',
  description: 'Digharkanda, Mymensingh Sadar — 01601-711903',
})

useSchemaOrg([
  defineLocalBusiness({
    '@type': ['AutoDealer', 'MotorcycleDealer'],
    '@id': `${useSiteConfig().url}/gpx-showroom-mymensingh#branch`,
    'name': branch.name,
    'description':
      'Authorized GPX Motorcycles showroom in Digharkanda, Mymensingh Sadar — sales, service support and genuine spare parts.',
    'telephone': branch.phoneDial,
    'currenciesAccepted': 'BDT',
    'address': {
      streetAddress: `${branch.street}, ${branch.area}`,
      addressLocality: branch.city,
      addressRegion: branch.region,
      postalCode: branch.postalCode,
      addressCountry: dealer.address.countryCode,
    },
    'areaServed': branch.areasServed.map((name) => ({ '@type': 'Place', name })),
    'brand': { '@type': 'Brand', name: 'GPX Motorcycles' },
    'parentOrganization': { '@type': 'Organization', name: dealer.name, url: useSiteConfig().url },
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Showrooms', item: '/showrooms' },
      { name: 'GPX Showroom Mymensingh', item: '/gpx-showroom-mymensingh' },
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
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Showrooms', to: '/showrooms' }, { label: 'Mymensingh' }]" />

      <div class="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p class="eyebrow mb-5">Mymensingh</p>
          <h1 class="display-hero text-ink">
            GPX Showroom<br ><span class="text-gpx">Mymensingh</span>
          </h1>
        </div>
        <div>
          <p class="text-lg leading-relaxed text-muted">
            Gen-Z Motors is an authorized GPX Motorcycles dealer, and the Mymensingh branch puts
            the same Demon lineup within reach of riders outside Dhaka.
          </p>
          <div class="mt-8 flex flex-wrap gap-4">
            <AppButton :href="`tel:${branch.phoneDial}`">Call {{ branch.phoneDisplay }}</AppButton>
            <AppButton
              :href="whatsappLink('Hi Gen-Z Motors, I would like directions to the Mymensingh showroom.')"
              variant="ghost"
            >
              WhatsApp
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <section class="container-x py-16 lg:py-24">
      <div class="grid gap-8 lg:grid-cols-3">
        <div class="border border-line bg-card p-8">
          <h2 class="eyebrow mb-4">Address</h2>
          <address class="not-italic text-lg leading-relaxed text-ink">
            {{ branch.street }}<br >
            {{ branch.area }}<br >
            {{ branch.city }} {{ branch.postalCode }}
          </address>
        </div>

        <div class="border border-line bg-card p-8">
          <h2 class="eyebrow mb-4">Contact</h2>
          <a
            :href="`tel:${branch.phoneDial}`"
            class="block font-display text-2xl text-ink transition-colors hover:text-gpx"
          >
            {{ branch.phoneDisplay }}
          </a>
          <p class="mt-3 text-sm leading-relaxed text-muted">
            Direct line to the Mymensingh branch. The Uttara showroom is on
            {{ dealer.contact.phoneDisplay }}.
          </p>
        </div>

        <div class="border border-line bg-card p-8">
          <h2 class="eyebrow mb-4">At this branch</h2>
          <ul class="space-y-2 text-sm text-muted">
            <li v-for="item in branch.offers" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="border-y border-line bg-paper-soft py-20">
      <div class="container-x">
        <SectionHeading
          eyebrow="On the floor"
          title="The GPX Demon lineup"
          lead="Call ahead and we will confirm which models and colourways are in Mymensingh this week."
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

    <section class="container-x py-20">
      <SectionHeading
        eyebrow="Areas served"
        title="Riders across greater Mymensingh"
        lead="Customers ride in from across the district for sales, servicing and genuine parts."
      />
      <ul class="mt-10 flex flex-wrap gap-3">
        <li
          v-for="area in branch.areasServed"
          :key="area"
          class="border border-line bg-card px-4 py-2 font-display text-xs uppercase tracking-[0.18em] text-muted"
        >
          {{ area }}
        </li>
      </ul>
    </section>

    <section class="border-t border-line bg-paper-soft py-20">
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
  </div>
</template>
