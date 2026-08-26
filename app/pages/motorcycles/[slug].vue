<script setup lang="ts">
import { bikes, bikeBySlug } from '~/data/bikes'
import { dealer, telLink, whatsappLink } from '~/data/dealer'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const bike = computed(() => bikeBySlug(slug.value))

if (!bike.value) {
  throw createError({ statusCode: 404, statusMessage: 'Motorcycle not found', fatal: true })
}

const model = bike.value!
const others = computed(() => bikes.filter((b) => b.slug !== model.slug))
const heroImage = computed(() => model.colourways.find((c) => c.gallery.length)?.gallery[0] ?? null)

const enquiry = whatsappLink(
  `Hi Gen-Z Motors, I am interested in the ${model.name}. Which showroom has it in stock?`,
)
const testRide = whatsappLink(
  `Hi Gen-Z Motors, I would like to book a test ride on the ${model.name}.`,
)

const highlightsRoot = ref<HTMLElement | null>(null)
useReveal(highlightsRoot, { children: '[data-reveal]', stagger: 0.09 })

const site = useSiteConfig()
const canonical = computed(() => `${site.url}/motorcycles/${model.slug}`)

useSeoMeta({
  title: `${model.name} in Bangladesh | Gen-Z Motors, Authorized GPX Dealer`,
  description: `${model.name} at Gen-Z Motors, the authorized GPX dealer with showrooms in Uttara, Dhaka and Mymensingh. ${model.colourways.length} factory colourways, full specifications, and test rides by appointment.`,
  ogTitle: `${model.name} — Gen-Z Motors Uttara`,
  ogDescription: model.tagline,
  ogType: 'website',
})

defineOgImageComponent('Dealer', {
  title: model.name,
  description: `${model.colourways.length} colourways — GPX dealer, Uttara`,
})

useSchemaOrg([
  defineProduct({
    name: model.name,
    description: model.intro,
    brand: { name: 'GPX Motorcycles' },
    category: 'Motorcycle',
    image: model.colourways.flatMap((c) => c.gallery).slice(0, 6),
    url: canonical.value,
    // No price is published on this site, so no Offer is declared — an Offer without a
    // price would be invalid structured data.
  }),
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Motorcycles', item: '/motorcycles' },
      { name: model.name, item: `/motorcycles/${model.slug}` },
    ],
  }),
])
</script>

<template>
  <article v-if="bike" class="pt-[calc(var(--header-h)+2.5rem)]">
    <!-- Masthead -------------------------------------------------------- -->
    <section class="container-x">
      <Breadcrumbs
        :trail="[{ label: 'Motorcycles', to: '/motorcycles' }, { label: model.shortName }]"
      />

      <div class="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
        <div>
          <p class="eyebrow mb-5">{{ model.stance }}</p>
          <h1 class="display-hero text-ink">{{ model.hero }}</h1>
        </div>
        <div>
          <p class="text-lg leading-relaxed text-muted">{{ model.intro }}</p>
          <p class="mt-8 font-display text-3xl uppercase text-ink">
            {{ model.colourways.length }} factory colourways
          </p>
          <p class="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
            Pricing quoted at the showroom counter — Uttara or Mymensingh
          </p>
        </div>
      </div>
    </section>

    <!-- Gallery + colourways -------------------------------------------- -->
    <section class="container-x py-14 lg:py-20">
      <ColourwayStage :bike="model" />
    </section>

    <!-- Key figures ------------------------------------------------------ -->
    <section class="border-y border-line bg-paper-soft">
      <dl class="container-x grid grid-cols-2 gap-px py-0 lg:grid-cols-4">
        <div class="px-2 py-10 lg:px-6">
          <dt class="eyebrow">Displacement</dt>
          <dd class="mt-2 font-display text-3xl text-ink">{{ model.engineCc }}</dd>
        </div>
        <div class="px-2 py-10 lg:px-6">
          <dt class="eyebrow">Max power</dt>
          <dd class="mt-2 font-display text-3xl text-ink">{{ model.power }}</dd>
        </div>
        <div class="px-2 py-10 lg:px-6">
          <dt class="eyebrow">Max torque</dt>
          <dd class="mt-2 font-display text-3xl text-ink">{{ model.torque }}</dd>
        </div>
        <div class="px-2 py-10 lg:px-6">
          <dt class="eyebrow">Kerb weight</dt>
          <dd class="mt-2 font-display text-3xl text-ink">{{ model.kerbWeight }}</dd>
        </div>
      </dl>
    </section>

    <!-- Highlights ------------------------------------------------------- -->
    <section ref="highlightsRoot" class="container-x py-24 lg:py-32">
      <SectionHeading eyebrow="Why this one" :title="`What defines the ${model.shortName}`" />

      <div class="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
        <div
          v-for="highlight in model.highlights"
          :key="highlight.label"
          data-reveal
          class="js-reveal bg-paper p-8 lg:p-10"
        >
          <p class="font-display text-xl uppercase text-ink">{{ highlight.label }}</p>
          <p class="mt-3 text-sm leading-relaxed text-muted">{{ highlight.body }}</p>
        </div>
      </div>
    </section>

    <!-- Specifications --------------------------------------------------- -->
    <section class="border-t border-line bg-paper-soft py-24 lg:py-32">
      <div class="container-x">
        <SectionHeading
          eyebrow="Specifications"
          :title="`${model.shortName} in numbers`"
          lead="Figures as published for this model. Ask at the counter for the delivery specification of the unit you are buying."
        />
        <div class="mt-14">
          <SpecTable :groups="model.specs" :model="model.shortName" />
        </div>
      </div>
    </section>

    <!-- Conversion band --------------------------------------------------- -->
    <section class="container-x py-24 lg:py-28">
      <div class="grid gap-10 border border-line p-8 lg:grid-cols-2 lg:items-center lg:p-14">
        <div>
          <h2 class="display-xl text-ink">See it in person</h2>
          <p class="mt-5 max-w-md text-lg leading-relaxed text-muted">
            The {{ model.shortName }} is on the floor at Gen-Z Motors. Tell us whether Uttara
            or Mymensingh suits you, book a slot and ride it — or ask a quick question on
            WhatsApp.
          </p>
        </div>
        <div class="flex flex-wrap gap-4 lg:justify-end">
          <AppButton :href="testRide" size="lg">Book a test ride</AppButton>
          <AppButton :href="enquiry" variant="ghost" size="lg">Ask about stock</AppButton>
          <AppButton :href="telLink()" variant="quiet" size="lg">
            {{ dealer.contact.phoneDisplay }}
          </AppButton>
        </div>
      </div>
    </section>

    <!-- Brochure --------------------------------------------------------- -->
    <section class="container-x pb-24">
      <div
        class="flex flex-col gap-4 border border-dashed border-line p-8 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p class="font-display text-lg uppercase text-ink">{{ model.shortName }} brochure</p>
          <p class="mt-2 text-sm text-muted">
            The printed GPX brochure is available at the showroom counter. Ask us to send the PDF
            over WhatsApp.
          </p>
        </div>
        <AppButton
          :href="whatsappLink(`Hi Gen-Z Motors, please send me the ${model.name} brochure.`)"
          variant="ghost"
        >
          Request brochure
        </AppButton>
      </div>
    </section>

    <!-- Other models ------------------------------------------------------ -->
    <section v-if="others.length" class="border-t border-line bg-paper-soft py-24">
      <div class="container-x">
        <SectionHeading eyebrow="Also on the floor" title="Other GPX models" />
        <div class="mt-12 grid gap-8 lg:grid-cols-2">
          <BikeCard v-for="(other, i) in others" :key="other.slug" :bike="other" :index="i" />
        </div>
      </div>
    </section>
  </article>
</template>
