<script setup lang="ts">
import { dealer, telLink, whatsappLink } from '~/data/dealer'

useSeoMeta({
  title: 'GPX Service & Spare Parts | Gen-Z Motors, Uttara & Mymensingh',
  description:
    'Authorized GPX servicing, warranty work and genuine spare parts at Gen-Z Motors. The Uttara 3S centre in Sector 15, Diabari handles service and parts, with support for Mymensingh customers. Four free services and a two-year or 20,000 km engine warranty on new GPX motorcycles.',
  ogTitle: 'GPX Service & Support — Uttara, Dhaka',
  ogDescription: 'Authorized 3S centre: servicing, warranty and genuine GPX spare parts.',
})

defineOgImageComponent('Dealer', {
  title: 'GPX Service & Spare Parts',
  description: '3S centre — Uttara, Dhaka',
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Service & support', item: '/service-support' },
    ],
  }),
])

const services = [
  {
    title: 'Free scheduled services',
    body: 'New GPX motorcycles bought here include four free services on the standard schedule.',
  },
  {
    title: 'Engine warranty work',
    body: 'Two years or 20,000 km of engine warranty, whichever comes first, handled in-house.',
  },
  {
    title: 'Genuine spare parts',
    body: 'GPX parts stocked at the counter so common jobs do not wait on an order.',
  },
  {
    title: 'On-call support',
    body: 'Call the showroom from anywhere in Bangladesh for help with a GPX bought here.',
  },
]

const root = ref<HTMLElement | null>(null)
useReveal(root, { children: '[data-reveal]', stagger: 0.08 })
</script>

<template>
  <div class="pt-[calc(var(--header-h)+2.5rem)]">
    <section class="container-x">
      <Breadcrumbs :trail="[{ label: 'Service & support' }]" />
      <div class="mt-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h1 class="display-hero text-ink">
          Service<br ><span class="text-gpx">&amp; support</span>
        </h1>
        <p class="text-lg leading-relaxed text-muted">
          {{ dealer.centreType }} in Uttara, with parts and service support for Mymensingh
          customers — the bike, the warranty and the parts stay with the same team.
        </p>
      </div>
    </section>

    <section ref="root" class="container-x py-20 lg:py-28">
      <div class="grid gap-px border border-line bg-line md:grid-cols-2">
        <div v-for="service in services" :key="service.title" data-reveal class="js-reveal bg-card p-8 lg:p-10">
          <p class="font-display text-2xl uppercase text-ink">{{ service.title }}</p>
          <p class="mt-3 text-sm leading-relaxed text-muted">{{ service.body }}</p>
        </div>
      </div>
    </section>

    <section class="border-y border-line bg-paper-soft py-20">
      <div class="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <PhotoPlaceholder label="Service bay with a GPX Demon on the lift" ratio="16 / 10" />
        <div>
          <SectionHeading
            eyebrow="Booking"
            title="Bring it in"
            lead="Call ahead with your model and registration so the right parts are on the shelf when you arrive."
          />
          <div class="mt-8 flex flex-wrap gap-4">
            <AppButton :href="telLink()">Call {{ dealer.contact.phoneDisplay }}</AppButton>
            <AppButton
              :href="whatsappLink('Hi Gen-Z Motors, I would like to book a service for my GPX.')"
              variant="ghost"
            >
              WhatsApp the service desk
            </AppButton>
          </div>
          <p class="mt-6 text-xs uppercase tracking-[0.2em] text-muted">
            Service pricing is quoted per job — ask when you book.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
