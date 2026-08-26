<script setup lang="ts">
import { bikes } from '~/data/bikes'

const flagship = computed(() => bikes.find((b) => b.slug.includes('gr250r')) ?? bikes[0]!)
const rest = computed(() => bikes.filter((b) => b.slug !== flagship.value.slug))
import { dealer } from '~/data/dealer'

useSeoMeta({
  title: 'GPX Demon Models & Specs | Gen-Z Motors Bangladesh',
  description:
    'Every GPX Demon at Gen-Z Motors: GR165R, GR165RR Da Corsa and GR250R with full specifications and all nine factory colourways. Uttara and Mymensingh.',
  ogTitle: 'GPX Motorcycle Lineup — Gen-Z Motors',
  ogDescription: 'Demon GR165R, GR165RR Da Corsa and GR250R, on the floor in Uttara and Mymensingh.',
})

defineOgImageComponent('Dealer', {
  title: 'GPX Motorcycle Lineup',
  description: 'Demon GR165R · GR165RR Da Corsa · GR250R',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Motorcycles', item: '/motorcycles' },
    ],
  }),
])

const intro = ref<HTMLElement | null>(null)
useReveal(intro, { children: '[data-reveal]', stagger: 0.08 })
</script>

<template>
  <div class="pt-[calc(var(--header-h)+3rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Motorcycles' }]" />

      <div ref="intro" class="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <h1 data-reveal class="js-reveal display-hero text-ink">
          The <span class="text-gpx">GPX</span> lineup
        </h1>
        <p data-reveal class="js-reveal text-lg leading-relaxed text-muted">
          {{ bikes.length }} Demon models and
          {{ bikes.reduce((n, b) => n + b.colourways.length, 0) }} factory colourways, all
          available to inspect and ride at the Uttara and Mymensingh showrooms.
        </p>
      </div>
    </section>

    <section class="container-x py-16 lg:py-24">
      <div class="flex flex-col gap-8">
        <BikeCard :bike="flagship" :index="0" featured />
        <div class="grid gap-8 lg:grid-cols-2">
          <BikeCard v-for="(bike, i) in rest" :key="bike.slug" :bike="bike" :index="i + 1" />
        </div>
      </div>
    </section>

    <section class="border-t border-line bg-paper-soft py-20">
      <div class="container-x grid gap-10 md:grid-cols-2 md:items-center">
        <SectionHeading
          eyebrow="At a glance"
          title="Compare the Demons"
          lead="Pricing, registration and accessories are quoted at the counter — call or visit and we will put a figure on the bike you want."
        />
        <dl class="divide-y divide-line border-y border-line">
          <div v-for="bike in bikes" :key="bike.slug" class="flex flex-wrap items-baseline justify-between gap-2 py-5">
            <dt class="font-display text-lg uppercase text-ink">{{ bike.shortName }}</dt>
            <dd class="text-sm text-muted">{{ bike.engineCc }} · {{ bike.power }}</dd>
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>
