<script setup lang="ts">
/**
 * Test-ride booking without a form.
 *
 * Pick a Demon, pick a showroom, and WhatsApp opens with the request already written.
 * Nothing is collected here — no inputs, no storage, no backend — so the conversation
 * starts in the visitor's own WhatsApp thread where they keep a copy.
 */
import { bikes } from '~/data/bikes'
import { dealer, showrooms, telLink, whatsappLink } from '~/data/dealer'

const bringWithYou = [
  'A valid motorcycle driving licence',
  'National ID or passport',
  'Closed shoes — helmets are provided',
]

function branchesFor(model: string) {
  return showrooms.map((showroom) => ({
    label: showroom.city,
    message: `Hi Gen-Z Motors, I would like to book a test ride on the ${model} at your ${showroom.city} showroom. When are you free?`,
  }))
}

useSeoMeta({
  title: 'Book a GPX Test Ride in Uttara or Mymensingh',
  description:
    'Ride a GPX Demon before you buy. Pick your model and showroom and the booking opens in WhatsApp — no forms. Uttara, Dhaka and Mymensingh.',
  ogTitle: 'Book a GPX test ride — Uttara & Mymensingh',
  ogDescription: 'Pick your Demon, pick a showroom, message the team on WhatsApp.',
})

defineOgImageComponent('Dealer', {
  title: 'Book a GPX Test Ride',
  description: 'Uttara & Mymensingh — by appointment',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Test ride', item: '/test-ride' },
    ],
  }),
])
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Test ride' }]" />
      <div class="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <p class="eyebrow mb-5">By appointment</p>
          <h1 class="display-hero text-ink">Ride it<br ><span class="text-gpx">first</span></h1>
        </div>
        <p class="text-lg leading-relaxed text-muted">
          Pick the Demon you want to try and the showroom that suits you. WhatsApp opens with
          the request written out — send it, and the team confirms a time.
        </p>
      </div>
    </section>

    <section class="container-x py-16 lg:py-24">
      <SectionHeading eyebrow="Step one" title="Choose your Demon" />

      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <WhatsAppChoice
          v-for="bike in bikes"
          :key="bike.slug"
          :eyebrow="bike.stance"
          :title="bike.name"
          :detail="`${bike.engineCc} · ${bike.power} · ${bike.colourways.length} colourways`"
          :message="`Hi Gen-Z Motors, I would like to book a test ride on the ${bike.name}.`"
          :branches="branchesFor(bike.name)"
        />
      </div>

      <div class="mt-8 border border-line bg-card p-6 lg:p-8">
        <p class="text-sm leading-relaxed text-muted">
          Not sure which one yet?
          <a
            :href="whatsappLink('Hi Gen-Z Motors, I would like to book a test ride but I am not sure which GPX Demon suits me. Can you help?')"
            target="_blank"
            rel="noopener"
            class="text-ink underline decoration-gpx underline-offset-4 transition-colors hover:text-gpx"
          >
            Tell us how you ride
          </a>
          and we will suggest one — or call
          <a :href="telLink()" class="text-ink transition-colors hover:text-gpx">
            {{ dealer.contact.phoneDisplay }}</a >.
        </p>
      </div>
    </section>

    <section class="border-y border-line bg-paper-soft py-16 lg:py-20">
      <div class="container-x grid gap-10 lg:grid-cols-3">
        <div>
          <h2 class="eyebrow mb-4">Bring with you</h2>
          <ul class="space-y-2 text-sm text-muted">
            <li v-for="item in bringWithYou" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div v-for="showroom in showrooms" :key="showroom.slug">
          <h2 class="eyebrow mb-4">{{ showroom.city }}</h2>
          <address v-if="showroom.street" class="not-italic text-sm leading-relaxed text-muted">
            {{ showroom.street }}, {{ showroom.area }}
          </address>
          <p v-else class="text-sm leading-relaxed text-muted">
            Call {{ dealer.contact.phoneDisplay }} for directions to this branch.
          </p>
          <NuxtLink
            :to="showroom.route"
            class="mt-4 inline-block font-display text-sm uppercase tracking-[0.18em] text-gpx"
          >
            Showroom details
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="container-x py-16 lg:py-20">
      <div
        class="flex flex-col gap-6 border border-line bg-card p-8 md:flex-row md:items-center md:justify-between lg:p-12"
      >
        <div>
          <h2 class="display-lg text-ink">Rather just call?</h2>
          <p class="mt-3 max-w-md text-sm leading-relaxed text-muted">
            One number reaches both showrooms. Ask for the model you want and we will have it
            ready when you arrive.
          </p>
        </div>
        <AppButton :href="telLink()" size="lg">{{ dealer.contact.phoneDisplay }}</AppButton>
      </div>
    </section>
  </div>
</template>
