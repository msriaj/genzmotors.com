<script setup lang="ts">
import { bikes } from '~/data/bikes'
import { gear } from '~/data/gear'
import { allAreasServed, dealer, showrooms, telLink, whatsappLink } from '~/data/dealer'

const colourwayCount = computed(() => bikes.reduce((n, b) => n + b.colourways.length, 0))

// Three models in a two-column grid leaves an orphan, so the flagship runs full width
// and the rest pair up underneath.
const flagship = computed(() => bikes.find((b) => b.slug.includes('gr250r')) ?? bikes[0]!)
const rest = computed(() => bikes.filter((b) => b.slug !== flagship.value.slug))

const promisesRoot = ref<HTMLElement | null>(null)
useReveal(promisesRoot, { children: '[data-reveal]', stagger: 0.09 })

const showroomRoot = ref<HTMLElement | null>(null)
useReveal(showroomRoot, { children: '[data-reveal]', stagger: 0.1 })

const gearPreview = computed(() => gear.filter((g) => g.image).slice(0, 4))

useSeoMeta({
  title: 'GPX Motorcycles Uttara & Mymensingh | Gen-Z Motors, Authorized GPX Dealer',
  description:
    'Gen-Z Motors is an authorized GPX motorcycle dealer with showrooms in Sector 15, Diabari, Uttara, Dhaka and in Mymensingh. See the GPX Demon GR165R, GR165RR Da Corsa and GR250R, book a test ride, and get genuine servicing and spare parts.',
  ogTitle: 'Gen-Z Motors — Authorized GPX Dealer, Uttara & Mymensingh',
  ogDescription:
    'The GPX Demon lineup on the floor in Uttara and Mymensingh. Sales, service and genuine spare parts.',
  ogType: 'website',
})

defineOgImageComponent('Dealer', {
  title: 'GPX Motorcycles in Bangladesh',
  description: 'Authorized GPX dealer — Uttara, Dhaka & Mymensingh',
})
</script>

<template>
  <div>
    <HeroStage :model-count="bikes.length" :colourway-count="colourwayCount" />

    <MarqueeStrip
      :items="[
        'Authorized GPX dealer',
        'Uttara · Dhaka',
        'Mymensingh',
        '3S centre',
        'Test rides available',
        '2 years / 20,000 km engine warranty',
        'Genuine spare parts',
      ]"
    />

    <!-- Lineup ---------------------------------------------------------- -->
    <section class="container-x py-24 lg:py-32">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="The lineup"
          title="GPX Demon, on the floor"
          :lead="`${bikes.length} Demon models and ${colourwayCount} factory colourways, at the Uttara and Mymensingh showrooms.`"
        />
        <AppButton to="/motorcycles" variant="ghost">View all motorcycles</AppButton>
      </div>

      <div class="mt-14 flex flex-col gap-8">
        <BikeCard :bike="flagship" :index="0" featured />
        <div class="grid gap-8 lg:grid-cols-2">
          <BikeCard
            v-for="(bike, i) in rest"
            :key="bike.slug"
            :bike="bike"
            :index="i + 1"
          />
        </div>
      </div>
    </section>

    <!-- Ownership promises: dark band ------------------------------------- -->
    <section class="bg-black py-24 text-white lg:py-32">
      <div ref="promisesRoot" class="container-x">
        <p class="eyebrow mb-4 text-white/50">Buying here</p>
        <h2 class="display-xl max-w-3xl text-white">What comes with the keys</h2>
        <p class="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          Every new GPX bought at Gen-Z Motors carries the same after-sales commitments.
        </p>

        <div class="mt-14 grid gap-px overflow-hidden border border-white/12 bg-white/12 md:grid-cols-2">
          <div
            v-for="promise in dealer.ownershipPromises"
            :key="promise.title"
            data-reveal
            class="js-reveal group bg-black p-8 transition-colors duration-500 hover:bg-[#141418] lg:p-10"
          >
            <p class="font-display text-2xl uppercase text-white">{{ promise.title }}</p>
            <p class="mt-3 text-sm leading-relaxed text-white/65">{{ promise.detail }}</p>
            <span class="mt-6 block h-px w-12 bg-gpx transition-all duration-500 group-hover:w-24" />
          </div>
        </div>
      </div>
    </section>

    <!-- Showrooms -------------------------------------------------------- -->
    <section ref="showroomRoot" class="container-x py-24 lg:py-32">
      <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Visit us"
          title="Two showrooms, one standard"
          lead="Uttara for the full 3S centre — sales, service and spare parts — and Mymensingh for riders outside Dhaka."
        />
        <AppButton to="/showrooms" variant="ghost">All showrooms</AppButton>
      </div>

      <div class="mt-14 grid gap-8 lg:grid-cols-2">
        <article
          v-for="showroom in showrooms"
          :key="showroom.slug"
          data-reveal
          class="js-reveal flex flex-col border border-line bg-card p-8 lg:p-10"
        >
          <p class="eyebrow mb-4">{{ showroom.region }}</p>
          <h3 class="display-lg text-ink">
            <NuxtLink :to="showroom.route" class="transition-colors hover:text-gpx">
              {{ showroom.city }}
            </NuxtLink>
          </h3>
          <address v-if="showroom.street" class="mt-4 not-italic leading-relaxed text-muted">
            {{ showroom.street }}, {{ showroom.area }}
          </address>
          <p v-else class="mt-4 leading-relaxed text-muted">
            Call {{ dealer.contact.phoneDisplay }} for directions to this branch.
          </p>
          <div class="mt-auto flex flex-wrap gap-3 pt-8">
            <AppButton :to="showroom.route">Details</AppButton>
            <AppButton
              :href="showroom.phoneDial ? `tel:${showroom.phoneDial}` : telLink()"
              variant="ghost"
            >
              {{ showroom.phoneDisplay ?? dealer.contact.phoneDisplay }}
            </AppButton>
          </div>
        </article>
      </div>

      <ul data-reveal class="js-reveal mt-12 flex flex-wrap gap-x-6 gap-y-2">
        <li
          v-for="area in allAreasServed()"
          :key="area"
          class="font-display text-xs uppercase tracking-[0.2em] text-muted"
        >
          {{ area }}
        </li>
      </ul>
    </section>

    <!-- Gear ------------------------------------------------------------ -->
    <section v-if="gearPreview.length" class="border-t border-line bg-paper-soft py-24 lg:py-32">
      <div class="container-x">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Rider gear"
            title="Helmets at the counter"
            lead="MT, TORQ and ORIGINE helmets stocked alongside the motorcycles at both showrooms. Try them on in person."
          />
          <AppButton to="/gear" variant="ghost">Browse gear</AppButton>
        </div>

        <div class="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          <NuxtLink
            v-for="item in gearPreview"
            :key="item.slug"
            to="/gear"
            class="group block border border-line bg-card p-4 transition-colors hover:border-line"
          >
            <NuxtImg
              v-if="item.image"
              :src="item.image"
              :alt="item.name"
              sizes="(max-width: 768px) 45vw, 22vw"
              loading="lazy"
              class="aspect-square w-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
            <p class="mt-4 font-display text-xs uppercase tracking-[0.18em] text-muted">
              {{ item.brand }}
            </p>
            <p class="mt-1 line-clamp-2 text-sm text-ink">{{ item.name }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Lead band: the closing dark punctuation before the footer ---------- -->
    <section class="relative overflow-hidden bg-black py-24 text-white lg:py-32">
      <div
        aria-hidden="true"
        class="absolute inset-0"
        style="background: radial-gradient(80% 120% at 50% 120%, rgba(235, 10, 30, 0.28) 0%, transparent 60%)"
      />
      <div class="container-x relative text-center">
        <p class="eyebrow mb-4 text-white/50">Next step</p>
        <h2 class="display-xl mx-auto max-w-3xl text-white">Ride it before you buy it</h2>
        <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
          Tell us which Demon you want to try, and whether Uttara or Mymensingh suits you. We
          will have it ready.
        </p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <AppButton to="/test-ride" size="lg" on-dark>Book a test ride</AppButton>
          <AppButton
            :href="whatsappLink('Hi Gen-Z Motors, I would like to book a GPX test ride in Uttara.')"
            variant="ghost"
            size="lg"
            on-dark
          >
            WhatsApp the showroom
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>
