<script setup lang="ts">
/**
 * Home hero. No product photograph: the subject is the dealership itself, so the type
 * leads and the motion sits behind it.
 *
 * The moving field comes from <SiteBackground>, which runs behind every page; this
 * section only deepens the edges for contrast and hosts the particle Z. Without WebGL
 * (or with reduced motion) the background's CSS gradient stands in and the headline
 * still animates.
 */
import { dealer, telLink } from '~/data/dealer'

const props = defineProps<{
  modelCount: number
  colourwayCount: number
}>()

const lines = ref<HTMLElement | null>(null)

/** The rail under the hero: the four numbers worth leading with. */
const facts = computed(() => [
  { value: String(props.modelCount), label: 'Demon models' },
  { value: String(props.colourwayCount), label: 'Factory colourways' },
  { value: String(dealer.cities.length), label: 'Showrooms' },
  { value: '2 yrs', label: 'Engine warranty' },
])

onMounted(async () => {
  if (prefersReducedMotion() || !lines.value) return

  const { gsap } = await useGsap()
  const targets = lines.value.querySelectorAll('[data-line] > span')
  gsap.set(targets, { yPercent: 115 })
  gsap.to(targets, { yPercent: 0, duration: 1.25, ease: 'expo.out', stagger: 0.08, delay: 0.2 })
  gsap.from('[data-hero-fade]', {
    opacity: 0,
    y: 18,
    duration: 1,
    ease: 'power2.out',
    stagger: 0.07,
    delay: 0.75,
  })
})
</script>

<template>
  <section class="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-[var(--header-h)]">
    <!-- The site-wide field shows through; this only deepens the edges for contrast. -->
    <div
      aria-hidden="true"
      class="absolute inset-0"
      style="
        background:
          radial-gradient(110% 70% at 68% 42%, rgba(235, 10, 30, 0.16) 0%, transparent 62%),
          linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, transparent 32%, rgba(0, 0, 0, 0.82) 100%);
      "
    />

    <!-- The brand Z, assembling out of its own particle cloud. -->
    <ClientOnly>
      <div
        aria-hidden="true"
        class="absolute right-0 top-[44%] hidden h-[58vh] w-[52vw] -translate-y-1/2 lg:block"
        style="
          mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 100%);
          -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 30%, #000 100%);
        "
      >
        <LazyHeroZ hydrate-on-visible />
      </div>
    </ClientOnly>

    <div class="container-x relative z-10 flex flex-1 flex-col justify-end pb-8 pt-16 lg:pb-10">
      <div class="grid flex-1 items-end gap-x-16 gap-y-10 lg:grid-cols-12">
        <!-- Headline column -->
        <div class="lg:col-span-7 xl:col-span-6">
          <p data-hero-fade class="eyebrow mb-7 flex items-center gap-3 text-white/55">
            <span class="inline-block h-px w-8 bg-gpx" />
            Sales · Service · Spare parts
          </p>

          <h1 ref="lines" class="text-white">
            <span data-line class="block overflow-hidden">
              <span
                class="block font-display text-[clamp(2.3rem,6vw,5.2rem)] font-light uppercase leading-[0.92] tracking-[-0.01em] text-white/75"
              >
                Authorized
              </span>
            </span>
            <span data-line class="block overflow-hidden">
              <span
                class="block font-display text-[clamp(2.9rem,7.6vw,6.8rem)] font-bold uppercase leading-[0.88] tracking-[-0.02em]"
              >
                <span class="text-gpx">GPX</span> dealer
              </span>
            </span>
            <span data-line class="mt-3 block overflow-hidden lg:mt-5">
              <span
                class="block font-display text-[clamp(1rem,2vw,1.6rem)] uppercase leading-none tracking-[0.16em] text-white/70"
              >
                Uttara · Mymensingh
              </span>
            </span>
          </h1>

          <p data-hero-fade class="mt-7 max-w-lg text-base leading-relaxed text-white/70 lg:text-lg">
            Every Demon on the floor to sit on, a test ride whenever you want one, and the same
            team looking after the bike long after you ride it home.
          </p>

          <div data-hero-fade class="mt-8 flex flex-wrap items-center gap-4">
            <AppButton to="/test-ride" size="lg" on-dark>Book a test ride</AppButton>
            <AppButton :href="telLink()" variant="ghost" size="lg" on-dark>
              {{ dealer.contact.phoneDisplay }}
            </AppButton>
          </div>
        </div>

        <!-- Spacer column: the particle Z lives here on wide screens. -->
        <div class="hidden lg:col-span-5 lg:block xl:col-span-6" />
      </div>

      <!-- Fact rail -->
      <dl
        data-hero-fade
        class="mt-10 grid grid-cols-2 border-t border-white/15 lg:mt-12 lg:grid-cols-4"
      >
        <div
          v-for="(fact, i) in facts"
          :key="fact.label"
          class="border-white/15 py-4 pr-6 lg:py-5"
          :class="[i > 0 ? 'lg:border-l lg:pl-8' : '', i === 1 ? 'border-l pl-6 lg:pl-8' : '', i > 1 ? 'border-t lg:border-t-0' : '']"
        >
          <dt class="eyebrow text-[0.62rem] text-white/45">{{ fact.label }}</dt>
          <dd class="mt-2 font-display text-2xl leading-none text-white lg:text-3xl">
            {{ fact.value }}
          </dd>
        </div>
      </dl>
    </div>

    <div
      aria-hidden="true"
      class="pointer-events-none absolute bottom-8 right-8 hidden items-center gap-3 lg:flex"
    >
      <span class="eyebrow text-white/40">Scroll</span>
      <span class="block h-14 w-px bg-gradient-to-b from-gpx to-transparent" />
    </div>
  </section>
</template>
