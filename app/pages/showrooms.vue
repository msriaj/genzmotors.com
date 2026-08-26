<script setup lang="ts">
/** Hub for every Gen-Z Motors location. Each branch also has its own local landing page. */
import { dealer, showrooms, telLink, whatsappLink } from '~/data/dealer'
import { bikes } from '~/data/bikes'

useSeoMeta({
  title: 'GPX Showrooms in Uttara & Mymensingh | Gen-Z Motors',
  description:
    'Two Gen-Z Motors GPX showrooms — Sector 15, Diabari in Uttara, Dhaka and Mymensingh. Same lineup, same warranty, same after-sales team.',
  ogTitle: 'Gen-Z Motors Showrooms — Uttara & Mymensingh',
  ogDescription: 'Authorized GPX dealer in Uttara, Dhaka and in Mymensingh.',
})

defineOgImageComponent('Dealer', {
  title: 'Our Showrooms',
  description: 'Uttara, Dhaka · Mymensingh',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Showrooms', item: '/showrooms' },
    ],
  }),
])

const grid = ref<HTMLElement | null>(null)
useReveal(grid, { children: '[data-reveal]', stagger: 0.1 })
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Showrooms' }]" />
      <div class="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h1 class="display-hero text-ink">
          Two<br ><span class="text-gpx">showrooms</span>
        </h1>
        <p class="text-lg leading-relaxed text-muted">
          {{ dealer.role }} in {{ dealer.cities.join(' and ') }}. The same GPX lineup, the same
          after-sales commitments, whichever branch you walk into.
        </p>
      </div>
    </section>

    <section ref="grid" class="container-x py-16 lg:py-24">
      <div class="grid gap-8 lg:grid-cols-2">
        <article
          v-for="showroom in showrooms"
          :key="showroom.slug"
          data-reveal
          class="js-reveal flex flex-col border border-line bg-card p-8 lg:p-10"
        >
          <p class="eyebrow mb-4">{{ showroom.region }}</p>
          <h2 class="display-lg text-ink">
            <NuxtLink :to="showroom.route" class="transition-colors hover:text-gpx">
              {{ showroom.city }}
            </NuxtLink>
          </h2>

          <address v-if="showroom.street" class="mt-5 not-italic leading-relaxed text-muted">
            {{ showroom.street }}, {{ showroom.area }}<br >
            {{ showroom.city }}
          </address>
          <p v-else class="mt-5 leading-relaxed text-muted">
            Street address and direct line are being confirmed. Call
            {{ dealer.contact.phoneDisplay }} and we will give you directions.
          </p>

          <ul class="mt-6 space-y-2 border-t border-line pt-6 text-sm text-muted">
            <li v-for="item in showroom.offers" :key="item">{{ item }}</li>
          </ul>

          <p class="mt-6 text-xs uppercase tracking-[0.18em] text-muted">
            Serving {{ showroom.areasServed.slice(0, 4).join(' · ') }}
          </p>

          <div class="mt-auto flex flex-wrap gap-3 pt-8">
            <AppButton :to="showroom.route">Showroom details</AppButton>
            <AppButton
              :href="showroom.phoneDial ? `tel:${showroom.phoneDial}` : telLink()"
              variant="ghost"
            >
              {{ showroom.phoneDisplay ?? dealer.contact.phoneDisplay }}
            </AppButton>
          </div>
        </article>
      </div>
    </section>

    <section class="bg-black py-20 text-white lg:py-24">
      <div class="container-x flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="display-xl text-white">Same lineup at both</h2>
          <p class="mt-4 max-w-xl text-lg leading-relaxed text-white/70">
            {{ bikes.length }} GPX Demon models and
            {{ bikes.reduce((n, b) => n + b.colourways.length, 0) }} colourways. Ask which
            branch has the one you want on the floor today.
          </p>
        </div>
        <div class="flex flex-wrap gap-4">
          <AppButton to="/motorcycles" size="lg" on-dark>See the lineup</AppButton>
          <AppButton
            :href="whatsappLink('Hi Gen-Z Motors, which showroom has the GPX Demon I want in stock?')"
            variant="ghost"
            size="lg"
            on-dark
          >
            Ask on WhatsApp
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>
