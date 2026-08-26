<script setup lang="ts">
import { gear, gearBrands, type GearBrand } from '~/data/gear'
import { dealer, telLink, whatsappLink } from '~/data/dealer'

const filter = ref<GearBrand | 'ALL'>('ALL')
const visible = computed(() =>
  filter.value === 'ALL' ? gear : gear.filter((item) => item.brand === filter.value),
)

const counts = computed(() =>
  Object.fromEntries(gearBrands.map((brand) => [brand, gear.filter((g) => g.brand === brand).length])),
)

useSeoMeta({
  title: 'MT, TORQ & ORIGINE Helmets | Gen-Z Motors Uttara',
  description:
    'MT, TORQ and ORIGINE helmets on the counter at the Gen-Z Motors GPX showrooms in Uttara and Mymensingh. Try the fit in person before you buy.',
  ogTitle: 'Helmets & gear — Gen-Z Motors',
  ogDescription: 'MT, TORQ and ORIGINE helmets at both showrooms.',
})

defineOgImageComponent('Dealer', {
  title: 'Helmets & Riding Gear',
  description: 'MT · TORQ · ORIGINE — Uttara & Mymensingh',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Gear', item: '/gear' },
    ],
  }),
])
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Gear' }]" />
      <div class="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h1 class="display-hero text-ink">Helmets<br ><span class="text-gpx">&amp; gear</span></h1>
        <p class="text-lg leading-relaxed text-muted">
          {{ gear.length }} helmets from MT, TORQ and ORIGINE sit at the counter next to the
          motorcycles. Nothing is sold online — come in, try the fit and we will quote you there.
        </p>
      </div>
    </section>

    <section class="container-x py-12">
      <div class="flex flex-wrap gap-3" role="group" aria-label="Filter helmets by brand">
        <button
          type="button"
          class="border px-5 py-2.5 font-display text-xs uppercase tracking-[0.18em] transition-colors"
          :class="filter === 'ALL' ? 'border-gpx bg-gpx text-white' : 'border-line text-muted hover:border-line hover:text-ink'"
          :aria-pressed="filter === 'ALL'"
          @click="filter = 'ALL'"
        >
          All {{ gear.length }}
        </button>
        <button
          v-for="brand in gearBrands"
          :key="brand"
          type="button"
          class="border px-5 py-2.5 font-display text-xs uppercase tracking-[0.18em] transition-colors"
          :class="filter === brand ? 'border-gpx bg-gpx text-white' : 'border-line text-muted hover:border-line hover:text-ink'"
          :aria-pressed="filter === brand"
          @click="filter = brand"
        >
          {{ brand }} {{ counts[brand] }}
        </button>
      </div>

      <div class="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <article
          v-for="item in visible"
          :key="item.slug"
          class="group flex flex-col border border-line bg-card p-5 transition-colors hover:border-line"
        >
          <NuxtImg
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            sizes="(max-width: 768px) 45vw, 22vw"
            loading="lazy"
            class="aspect-square w-full object-contain transition-transform duration-700 group-hover:scale-105"
          />
          <PhotoPlaceholder v-else :label="item.name" ratio="1 / 1" />

          <p class="mt-5 font-display text-xs uppercase tracking-[0.2em] text-gpx">
            {{ item.brand }}
          </p>
          <h2 class="mt-1 text-sm leading-snug text-ink">{{ item.name }}</h2>
          <p class="mt-auto pt-4 font-display text-xs uppercase tracking-[0.18em] text-muted">
            Price at the counter
          </p>
        </article>
      </div>
    </section>

    <section class="border-t border-line bg-paper-soft py-20">
      <div class="container-x flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
        <SectionHeading
          eyebrow="At the counter"
          title="Ask about sizes and stock"
          lead="Helmet fit is personal. Call ahead and we will have the sizes you want ready to try."
        />
        <div class="flex flex-wrap gap-4">
          <AppButton :href="telLink()">Call {{ dealer.contact.phoneDisplay }}</AppButton>
          <AppButton
            :href="whatsappLink('Hi Gen-Z Motors, do you have this helmet in my size?')"
            variant="ghost"
          >
            WhatsApp
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>
