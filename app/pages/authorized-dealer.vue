<script setup lang="ts">
import { dealer, fullAddress, telLink } from '~/data/dealer'
import { bikes } from '~/data/bikes'

useSeoMeta({
  title: 'Authorized GPX Dealer in Bangladesh | About Gen-Z Motors',
  description:
    'Gen-Z Motors is an authorized GPX Motorcycles dealer with showrooms in Uttara, Dhaka and Mymensingh, and a 3S centre in Sector 15, Diabari — sales, authorized servicing and genuine spare parts with a two-year engine warranty.',
  ogTitle: 'Authorized GPX Dealer — Gen-Z Motors, Uttara',
  ogDescription: 'Sales, service and spare parts under one roof in Uttara, Dhaka.',
})

defineOgImageComponent('Dealer', {
  title: 'Authorized GPX Dealer',
  description: 'Gen-Z Motors — Uttara, Dhaka',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Authorized dealer', item: '/authorized-dealer' },
    ],
  }),
])

const pillars = [
  {
    title: 'Sales',
    body: `Every GPX model we carry is on the floor in Uttara — ${bikes.reduce((n, b) => n + b.colourways.length, 0)} colourways across ${bikes.length} Demon models.`,
  },
  {
    title: 'Service',
    body: 'An authorized service bay staffed for GPX motorcycles, including the four free services that come with a new bike.',
  },
  {
    title: 'Spare parts',
    body: 'A genuine GPX parts counter, so a repair does not turn into a wait for stock from somewhere else.',
  },
]

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '[data-reveal]', stagger: 0.09 })
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Authorized dealer' }]" />
      <div class="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h1 class="display-hero text-ink">
          Authorized<br ><span class="text-gpx">GPX</span> dealer
        </h1>
        <p class="text-lg leading-relaxed text-muted">
          Gen-Z Motors sells, services and supports GPX motorcycles from two showrooms —
          {{ dealer.cities.join(' and ') }} — anchored by the 3S centre in
          {{ dealer.address.sector }}. Buying here means the bike, the warranty work and the
          parts all come from the same team.
        </p>
      </div>
    </section>

    <section ref="root" class="container-x py-20 lg:py-28">
      <div class="grid gap-px border border-line bg-line md:grid-cols-3">
        <div v-for="pillar in pillars" :key="pillar.title" data-reveal class="js-reveal bg-card p-8 lg:p-10">
          <p class="font-display text-3xl uppercase text-ink">{{ pillar.title }}</p>
          <p class="mt-4 text-sm leading-relaxed text-muted">{{ pillar.body }}</p>
        </div>
      </div>
    </section>

    <section class="border-y border-line bg-paper-soft py-20 lg:py-28">
      <div class="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <PhotoPlaceholder label="Gen-Z Motors team at the Uttara showroom" ratio="4 / 3" />
        <div>
          <SectionHeading
            eyebrow="Ownership"
            title="What we commit to"
            lead="These are the terms stated for every new GPX sold at Gen-Z Motors."
          />
          <dl class="mt-10 divide-y divide-line border-y border-line">
            <div v-for="promise in dealer.ownershipPromises" :key="promise.title" class="py-5">
              <dt class="font-display text-lg uppercase text-ink">{{ promise.title }}</dt>
              <dd class="mt-1 text-sm text-muted">{{ promise.detail }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="container-x py-20 lg:py-28">
      <div class="grid gap-12 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="Find us" title="One address, everything GPX" />
          <address class="mt-8 not-italic text-lg leading-relaxed text-ink">
            {{ fullAddress() }}<br >
            {{ dealer.address.region }}, {{ dealer.address.country }}
          </address>
          <div class="mt-8 flex flex-wrap gap-4">
            <AppButton to="/gpx-showroom-uttara">Showroom page</AppButton>
            <AppButton :href="telLink()" variant="ghost">
              {{ dealer.contact.phoneDisplay }}
            </AppButton>
          </div>
        </div>

        <div class="space-y-8">
          <div class="border border-line bg-card p-8">
            <h2 class="eyebrow mb-4">Part of {{ dealer.parent.name }}</h2>
            <p class="text-sm leading-relaxed text-muted">
              Gen-Z Motors is part of {{ dealer.parent.name }}, whose flagship showroom is at
              {{ dealer.parent.flagshipShowroom }}, with a central service centre at
              {{ dealer.parent.centralServiceCentre }}.
            </p>
            <a
              :href="dealer.parent.url"
              target="_blank"
              rel="noopener"
              class="mt-4 inline-block font-display text-sm uppercase tracking-[0.18em] text-gpx"
            >
              {{ dealer.parent.url.replace('https://', '') }}
            </a>
          </div>

          <div class="border border-dashed border-line p-8">
          <h2 class="eyebrow mb-4">Dealer credentials</h2>
          <p class="text-sm leading-relaxed text-muted">
            Authorization certificate and trade licence numbers are not published on this site
            yet. Add them in <code class="text-ink">app/data/dealer.ts</code> and they will
            appear here and in the structured data.
          </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
