<script setup lang="ts">
/**
 * Contact without a form.
 *
 * Every route here is a real conversation: a WhatsApp thread with the message already
 * written, or the phone. The site stores nothing and asks for nothing.
 */
import { dealer, formatHours, showrooms, telLink, whatsappLink } from '~/data/dealer'

const topics = [
  {
    title: 'A motorcycle',
    detail: 'Availability, colourways, specifications or arranging a look in person.',
    message:
      'Hi Gen-Z Motors, I have a question about a GPX motorcycle. Could you help me with availability and colours?',
  },
  {
    title: 'Service booking',
    detail: 'Scheduled servicing, warranty work or a problem you want looked at.',
    message:
      'Hi Gen-Z Motors, I would like to book a service for my GPX. Here is the model and registration:',
  },
  {
    title: 'Spare parts',
    detail: 'Genuine GPX parts — tell us the model and the part you need.',
    message: 'Hi Gen-Z Motors, I am looking for a genuine GPX spare part. The model and part are:',
  },
  {
    title: 'Helmets & gear',
    detail: 'MT, TORQ and ORIGINE stock, sizing and what is on the counter this week.',
    message: 'Hi Gen-Z Motors, do you have this helmet in my size? I am looking at:',
  },
]

useSeoMeta({
  title: 'Contact Gen-Z Motors | GPX Dealer 01609-711911',
  description:
    'Call 01609-711911 or message the Gen-Z Motors GPX showrooms on WhatsApp about motorcycles, servicing, spare parts and helmets. Uttara and Mymensingh.',
  ogTitle: 'Contact Gen-Z Motors — Uttara & Mymensingh',
  ogDescription: 'Call or WhatsApp the GPX showrooms. No forms.',
})

defineOgImageComponent('Dealer', {
  title: 'Contact Gen-Z Motors',
  description: 'Uttara & Mymensingh — 01609-711911',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Contact', item: '/contact' },
    ],
  }),
])
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Contact' }]" />
      <div class="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h1 class="display-hero text-ink">Talk to<br ><span class="text-gpx">the showroom</span></h1>
        <p class="text-lg leading-relaxed text-muted">
          No contact forms here. Pick what you need below and WhatsApp opens with the message
          written — or call, and one number reaches both showrooms.
        </p>
      </div>
    </section>

    <!-- Direct lines -------------------------------------------------------- -->
    <section class="container-x py-14 lg:py-20">
      <div class="grid gap-6 md:grid-cols-2">
        <a
          :href="telLink()"
          class="group flex flex-col justify-between border border-line bg-card p-8 transition-colors duration-500 hover:border-gpx/60 lg:p-10"
        >
          <p class="eyebrow">Call</p>
          <p class="mt-6 font-display text-3xl text-ink transition-colors group-hover:text-gpx lg:text-4xl">
            {{ dealer.contact.phoneDisplay }}
          </p>
          <p class="mt-3 text-sm text-muted">Sales, service and the parts counter.</p>
        </a>

        <a
          :href="whatsappLink('Hi Gen-Z Motors, I have a question.')"
          target="_blank"
          rel="noopener"
          class="group flex flex-col justify-between border border-line bg-card p-8 transition-colors duration-500 hover:border-gpx/60 lg:p-10"
        >
          <p class="eyebrow">WhatsApp</p>
          <p class="mt-6 font-display text-3xl text-ink transition-colors group-hover:text-gpx lg:text-4xl">
            Start a chat
          </p>
          <p class="mt-3 text-sm text-muted">
            You keep the conversation and a copy of what was agreed.
          </p>
        </a>
      </div>
    </section>

    <!-- What is it about ----------------------------------------------------- -->
    <section class="border-y border-line bg-paper-soft py-16 lg:py-24">
      <div class="container-x">
        <SectionHeading
          eyebrow="Pick a topic"
          title="What is it about?"
          lead="Each one opens WhatsApp with the first message already written. Edit it before you send if you like."
        />

        <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <WhatsAppChoice
            v-for="topic in topics"
            :key="topic.title"
            :title="topic.title"
            :detail="topic.detail"
            :message="topic.message"
          />
        </div>
      </div>
    </section>

    <!-- Showrooms ------------------------------------------------------------- -->
    <section class="container-x py-16 lg:py-24">
      <SectionHeading eyebrow="Where we are" title="Both showrooms" />

      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <ShowroomMap v-for="showroom in showrooms" :key="showroom.slug" :showroom="showroom" />
      </div>

      <div class="mt-12 grid gap-6 md:grid-cols-2">
        <div v-for="showroom in showrooms" :key="showroom.slug" class="border border-line bg-card p-8 lg:p-10">
          <p class="eyebrow mb-4">{{ showroom.region }}</p>
          <h3 class="display-lg text-ink">{{ showroom.city }}</h3>

          <address class="mt-5 not-italic leading-relaxed text-muted">
            {{ showroom.street }}, {{ showroom.area }}<br >
            {{ showroom.city }}<span v-if="showroom.postalCode"> {{ showroom.postalCode }}</span>
          </address>

          <a
            :href="`tel:${showroom.phoneDial ?? dealer.contact.phoneDial}`"
            class="mt-4 inline-block font-display text-lg text-ink transition-colors hover:text-gpx"
          >
            {{ showroom.phoneDisplay ?? dealer.contact.phoneDisplay }}
          </a>

          <p v-if="showroom.openingHours" class="mt-2 text-sm text-muted">
            {{ showroom.openingHours.map(formatHours).join(' · ') }}
          </p>

          <a
            v-if="showroom.mapsPlaceUrl"
            :href="showroom.mapsPlaceUrl"
            target="_blank"
            rel="noopener"
            class="mt-3 block font-display text-xs uppercase tracking-[0.18em] text-gpx"
          >
            Open in Google Maps
          </a>

          <p v-if="showroom.openingHours" class="mt-4 font-display text-sm uppercase tracking-[0.14em] text-ink">
            {{ showroom.openingHours.map(formatHours).join(' · ') }}
          </p>
          <p v-else class="mt-4 text-sm text-muted">
            Call {{ showroom.phoneDisplay ?? dealer.contact.phoneDisplay }} to check hours.
          </p>

          <a
            :href="`tel:${showroom.phoneDial ?? dealer.contact.phoneDial}`"
            class="mt-4 inline-block font-display text-lg text-ink transition-colors hover:text-gpx"
          >
            {{ showroom.phoneDisplay ?? dealer.contact.phoneDisplay }}
          </a>

          <div class="mt-8 flex flex-wrap gap-3">
            <AppButton :to="showroom.route">Showroom details</AppButton>
            <AppButton v-if="showroom.mapsPlaceUrl" :href="showroom.mapsPlaceUrl" variant="ghost">
              Directions
            </AppButton>
            <AppButton
              :href="whatsappLink(`Hi Gen-Z Motors, could you send me directions to your ${showroom.city} showroom?`)"
              variant="ghost"
            >
              Ask for directions
            </AppButton>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>
