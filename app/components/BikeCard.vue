<script setup lang="ts">
/**
 * Lineup card. The photograph is left undistorted — hover only lifts the frame.
 *
 * `featured` switches to a full-width, two-column layout used for the flagship, so a
 * three-model lineup does not leave an orphan card in a two-column grid.
 */
import type { Bike } from '~/data/bikes'

const props = withDefaults(
  defineProps<{ bike: Bike; index: number; featured?: boolean }>(),
  { featured: false },
)

const image = computed(() => props.bike.colourways.find((c) => c.gallery.length)?.gallery[0] ?? null)
const root = ref<HTMLElement | null>(null)
useReveal(root, { y: 40 })
</script>

<template>
  <article
    ref="root"
    class="js-reveal group relative overflow-hidden border border-line bg-card transition-colors duration-500 hover:border-gpx/60"
    :class="featured ? 'grid lg:grid-cols-[1.05fr_0.95fr]' : 'flex flex-col'"
  >
    <NuxtLink
      :to="`/motorcycles/${bike.slug}`"
      class="relative block overflow-hidden bg-white"
      :class="featured ? 'aspect-[16/10] lg:aspect-[5/4]' : 'aspect-[4/3]'"
      data-cursor="view"
      data-cursor-label="View"
    >
      <NuxtImg
        v-if="image"
        :src="image"
        :alt="`${bike.name} — ${bike.stance}`"
        :sizes="featured ? 'sm:100vw md:100vw lg:55vw' : 'sm:100vw md:50vw lg:45vw'"
        :width="featured ? 1100 : 900"
        :height="featured ? 880 : 675"
        loading="lazy"
        class="h-full w-full object-contain transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
      />
      <PhotoPlaceholder v-else :label="`${bike.name} studio shot`" ratio="4 / 3" />

      <span class="absolute left-5 top-5 font-display text-xs uppercase tracking-[0.24em] text-ink/40">
        {{ String(index + 1).padStart(2, '0') }}
      </span>
      <span
        class="absolute right-5 top-5 bg-gpx px-3 py-1 font-display text-xs uppercase tracking-[0.18em] text-white"
      >
        {{ bike.colourways.length }} colourways
      </span>
    </NuxtLink>

    <div
      class="flex flex-1 flex-col gap-5 p-6 lg:p-8"
      :class="featured ? 'lg:justify-center lg:gap-7 lg:p-12' : ''"
    >
      <div>
        <p v-if="featured" class="eyebrow mb-4">Flagship</p>
        <h3 :class="featured ? 'display-xl text-ink' : 'display-lg text-ink'">
          <NuxtLink :to="`/motorcycles/${bike.slug}`" class="transition-colors hover:text-gpx">
            {{ bike.name }}
          </NuxtLink>
        </h3>
        <p class="mt-3 leading-relaxed text-muted" :class="featured ? 'max-w-md text-base' : 'text-sm'">
          {{ featured ? bike.intro : bike.tagline }}
        </p>
      </div>

      <dl class="grid grid-cols-3 gap-4 border-y border-line py-4">
        <div>
          <dt class="eyebrow text-[0.62rem]">Engine</dt>
          <dd class="mt-1 font-display text-ink" :class="featured ? 'text-xl' : 'text-lg'">
            {{ bike.engineCc }}
          </dd>
        </div>
        <div>
          <dt class="eyebrow text-[0.62rem]">Power</dt>
          <dd class="mt-1 font-display text-ink" :class="featured ? 'text-xl' : 'text-lg'">
            {{ bike.power }}
          </dd>
        </div>
        <div>
          <dt class="eyebrow text-[0.62rem]">Weight</dt>
          <dd class="mt-1 font-display text-ink" :class="featured ? 'text-xl' : 'text-lg'">
            {{ bike.kerbWeight }}
          </dd>
        </div>
      </dl>

      <div class="mt-auto flex flex-wrap items-center justify-between gap-4">
        <p class="font-display text-sm uppercase tracking-[0.18em] text-muted">Price on request</p>
        <div class="flex flex-wrap gap-3">
          <AppButton v-if="featured" to="/test-ride">Book a test ride</AppButton>
          <AppButton :to="`/motorcycles/${bike.slug}`" variant="ghost">Explore</AppButton>
        </div>
      </div>
    </div>
  </article>
</template>
