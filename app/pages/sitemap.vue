<script setup lang="ts">
/**
 * Human sitemap.
 *
 * Machines get `/sitemap.xml`; this is for people, and it doubles as an internal linking
 * hub — every page on the site is one click from here, grouped the way a visitor thinks
 * about them rather than the way the routes are nested.
 */
import { bikes } from '~/data/bikes'
import { dealer, showrooms, telLink, whatsappLink } from '~/data/dealer'
import { gearBrands, gearByBrand } from '~/data/gear'

const sections = computed(() => [
  {
    title: 'Motorcycles',
    intro: `${bikes.length} GPX Demon models, ${bikes.reduce((n, b) => n + b.colourways.length, 0)} factory colourways.`,
    links: [
      { to: '/motorcycles', label: 'The GPX lineup', note: 'All models, specs and colourways' },
      ...bikes.map((bike) => ({
        to: `/motorcycles/${bike.slug}`,
        label: bike.name,
        note: `${bike.engineCc} · ${bike.power} · ${bike.colourways.length} colourways`,
      })),
    ],
  },
  {
    title: 'Showrooms',
    intro: `Authorized GPX dealer in ${dealer.cities.join(' and ')}.`,
    links: [
      { to: '/showrooms', label: 'Both showrooms', note: 'Addresses, what each branch does' },
      ...showrooms.map((showroom) => ({
        to: showroom.route,
        label: showroom.name,
        note: showroom.street ? `${showroom.street}, ${showroom.area}` : 'Call for directions',
      })),
    ],
  },
  {
    title: 'Ownership',
    intro: 'Before and after you buy.',
    links: [
      { to: '/test-ride', label: 'Book a test ride', note: 'Pick a model and a showroom' },
      { to: '/service-support', label: 'Service & spare parts', note: '3S centre, warranty, genuine parts' },
      {
        to: '/gear',
        label: 'Helmets & gear',
        note: gearBrands.map((brand) => `${brand} (${gearByBrand(brand).length})`).join(' · '),
      },
    ],
  },
  {
    title: 'The dealership',
    intro: `${dealer.role}, part of ${dealer.parent.name}.`,
    links: [
      { to: '/authorized-dealer', label: 'Authorized dealer', note: 'Who we are and what we commit to' },
      { to: '/contact', label: 'Contact', note: `Call ${dealer.contact.phoneDisplay} or WhatsApp` },
    ],
  },
])

useSeoMeta({
  title: 'Sitemap | Gen-Z Motors, GPX Dealer Bangladesh',
  description:
    'Every page on the Gen-Z Motors site: GPX Demon models, the Uttara and Mymensingh showrooms, test rides, service and spare parts, helmets and contact.',
  ogTitle: 'Sitemap — Gen-Z Motors',
  ogDescription: 'Every page on the Gen-Z Motors GPX dealer site.',
})

defineOgImageComponent('Dealer', {
  title: 'Sitemap',
  description: 'Every page on the Gen-Z Motors site',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Sitemap', item: '/sitemap' },
    ],
  }),
])
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Sitemap' }]" />
      <div class="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h1 class="display-hero text-ink">Every<br ><span class="text-gpx">page</span></h1>
        <p class="text-lg leading-relaxed text-muted">
          The whole site in one place. Search engines get
          <a
            href="/sitemap.xml"
            class="text-ink underline decoration-gpx underline-offset-4 transition-colors hover:text-gpx"
          >
            sitemap.xml
          </a>
          — this one is for people.
        </p>
      </div>
    </section>

    <section class="container-x py-16 lg:py-24">
      <div class="grid gap-px border border-line bg-line md:grid-cols-2">
        <div v-for="group in sections" :key="group.title" class="bg-card p-8 lg:p-10">
          <h2 class="display-lg text-ink">{{ group.title }}</h2>
          <p class="mt-2 text-sm text-muted">{{ group.intro }}</p>

          <ul class="mt-7 divide-y divide-line border-t border-line">
            <li v-for="link in group.links" :key="link.to">
              <NuxtLink
                :to="link.to"
                class="group flex items-baseline justify-between gap-6 py-4 transition-colors hover:text-gpx"
              >
                <span>
                  <span class="font-display text-base uppercase tracking-[0.08em] text-ink transition-colors group-hover:text-gpx">
                    {{ link.label }}
                  </span>
                  <span class="mt-1 block text-xs text-muted">{{ link.note }}</span>
                </span>
                <span aria-hidden="true" class="font-display text-sm text-muted transition-transform group-hover:translate-x-1 group-hover:text-gpx">
                  →
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="border-t border-line bg-paper-soft py-16">
      <div class="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="display-lg text-ink">Cannot find it?</h2>
          <p class="mt-2 text-sm text-muted">One number reaches both showrooms.</p>
        </div>
        <div class="flex flex-wrap gap-3">
          <AppButton :href="telLink()">{{ dealer.contact.phoneDisplay }}</AppButton>
          <AppButton
            :href="whatsappLink('Hi Gen-Z Motors, I am looking for something on your website.')"
            variant="ghost"
          >
            WhatsApp
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>
