<script setup lang="ts">
/**
 * Google Maps embed for a branch.
 *
 * The iframe is lazy and only mounts once the block scrolls close to the viewport, so a
 * map never costs anything on first paint. Every branch keeps a plain link to its Google
 * listing underneath, which is what actually works on a phone.
 */
import type { Showroom } from '~/data/dealer'

const props = defineProps<{ showroom: Showroom }>()

const root = ref<HTMLElement | null>(null)
const show = ref(false)

onMounted(() => {
  const el = root.value
  if (!el || !props.showroom.mapsEmbedUrl) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        show.value = true
        observer.disconnect()
      }
    },
    { rootMargin: '400px' },
  )
  observer.observe(el)
  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <div ref="root" class="border border-line bg-card">
    <div class="relative aspect-[16/10] w-full overflow-hidden bg-paper-mute md:aspect-[21/9]">
      <iframe
        v-if="show && showroom.mapsEmbedUrl"
        :src="showroom.mapsEmbedUrl"
        :title="`Map to ${showroom.name}`"
        class="absolute inset-0 h-full w-full"
        style="border: 0; filter: grayscale(0.35) contrast(1.05)"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      />
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <p class="eyebrow">Loading map</p>
      </div>
    </div>

    <div class="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
      <address class="not-italic text-sm leading-relaxed text-muted">
        <span class="font-display uppercase tracking-[0.14em] text-ink">{{ showroom.city }}</span
        ><br >
        {{ showroom.street }}, {{ showroom.area }}<span v-if="showroom.postalCode">
          {{ showroom.postalCode }}</span
        >
      </address>
      <AppButton v-if="showroom.mapsPlaceUrl" :href="showroom.mapsPlaceUrl" variant="ghost">
        Get directions
      </AppButton>
    </div>
  </div>
</template>
