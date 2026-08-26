<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  lead?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2' | 'h3'
}>()

const root = ref<HTMLElement | null>(null)
const heading = ref<HTMLElement | null>(null)

useReveal(root, { children: '[data-reveal]:not([data-title])', stagger: 0.1 })
useTextReveal(heading)
</script>

<template>
  <div
    ref="root"
    class="max-w-3xl"
    :class="align === 'center' ? 'mx-auto text-center' : ''"
  >
    <p v-if="eyebrow" data-reveal class="js-reveal eyebrow mb-4">
      <span class="mr-3 inline-block h-px w-8 translate-y-[-4px] bg-gpx" />{{ eyebrow }}
    </p>
    <component :is="as ?? 'h2'" ref="heading" data-reveal data-title class="display-xl text-ink">
      {{ title }}
    </component>
    <p v-if="lead" data-reveal class="js-reveal mt-6 text-lg leading-relaxed text-muted">
      {{ lead }}
    </p>
  </div>
</template>
