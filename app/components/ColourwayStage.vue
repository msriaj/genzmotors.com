<script setup lang="ts">
/**
 * Model gallery with a WebGL morph between colourways.
 *
 * Selecting a colourway crossfades on the GPU when WebGL is available; otherwise the
 * underlying <NuxtImg> simply swaps. The photograph itself is never warped — only the
 * boundary between the outgoing and incoming shot moves. Gallery thumbnails and alt
 * text stay in the DOM either way.
 */
import { COLOUR_FADE_FRAGMENT } from '~/utils/shaders'
import type { Bike, Colourway } from '~/data/bikes'

const props = defineProps<{ bike: Bike }>()

const active = ref(0)
const shot = ref(0)
const stage = ref<{ transitionTo: (from: string, to: string) => boolean } | null>(null)

const current = computed<Colourway>(() => props.bike.colourways[active.value]!)
const currentImage = computed(() => current.value.gallery[shot.value] ?? current.value.gallery[0] ?? null)

function selectColour(index: number) {
  if (index === active.value) return
  const from = currentImage.value
  const to = props.bike.colourways[index]?.gallery[0] ?? null
  active.value = index
  shot.value = 0
  if (from && to) stage.value?.transitionTo(from, to)
}

function selectShot(index: number) {
  if (index === shot.value) return
  const from = currentImage.value
  const to = current.value.gallery[index] ?? null
  shot.value = index
  if (from && to) stage.value?.transitionTo(from, to)
}
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
    <div class="relative overflow-hidden border border-line bg-white" data-cursor="view" data-cursor-label="Colourways">
      <ShaderImage
        v-if="currentImage"
        ref="stage"
        :key="bike.slug"
        :src="currentImage"
        :src-b="currentImage"
        :alt="`${bike.name} in ${current.name}`"
        :fragment="COLOUR_FADE_FRAGMENT"
        fit="contain"
        plate="#ffffff"
        preload
        sizes="(max-width: 1024px) 100vw, 62vw"
        class="aspect-[4/3] w-full bg-white"
        img-class="h-full w-full object-contain"
      />
      <PhotoPlaceholder v-else :label="`${bike.name} — ${current.name}`" ratio="4 / 3" />

      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/85 to-transparent p-6"
      >
        <p class="font-display text-sm uppercase tracking-[0.22em] text-ink">
          {{ current.name }}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-8">
      <div>
        <h2 class="eyebrow mb-4">Colourways — {{ bike.colourways.length }}</h2>
        <ul class="flex flex-col gap-2">
          <li v-for="(colour, i) in bike.colourways" :key="colour.slug">
            <button
              type="button"
              class="group flex w-full items-center gap-4 border px-4 py-3 text-left transition-colors duration-300"
              :class="
                i === active
                  ? 'border-gpx bg-gpx/8 text-ink'
                  : 'border-line text-muted hover:border-line hover:text-ink'
              "
              :aria-pressed="i === active"
              @click="selectColour(i)"
            >
              <span
                class="h-7 w-7 shrink-0 rounded-full border border-line"
                :style="{ backgroundColor: colour.hex }"
                aria-hidden="true"
              />
              <span class="font-display text-sm uppercase tracking-[0.16em]">{{ colour.name }}</span>
            </button>
          </li>
        </ul>
      </div>

      <div v-if="current.gallery.length > 1">
        <h2 class="eyebrow mb-4">Gallery</h2>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="(image, i) in current.gallery"
            :key="image"
            type="button"
            class="overflow-hidden border transition-colors"
            :class="i === shot ? 'border-gpx' : 'border-line hover:border-line'"
            :aria-label="`View ${bike.name} ${current.name}, image ${i + 1}`"
            @click="selectShot(i)"
          >
            <NuxtImg
              :src="image"
              :alt="`${bike.name} in ${current.name}, view ${i + 1}`"
              sizes="120px"
              loading="lazy"
              class="aspect-square w-full object-cover"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
