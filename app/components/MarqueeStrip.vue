<script setup lang="ts">
const props = withDefaults(defineProps<{ items: string[]; speed?: number }>(), { speed: 38 })
const doubled = computed(() => [...props.items, ...props.items])
</script>

<template>
  <div class="relative overflow-hidden border-y border-line bg-paper-soft py-5">
    <div
      class="flex w-max gap-12 whitespace-nowrap"
      :style="{ animation: `marquee ${props.speed}s linear infinite` }"
    >
      <span
        v-for="(item, i) in doubled"
        :key="i"
        class="flex items-center gap-12 font-display text-sm uppercase tracking-[0.28em] text-muted"
      >
        {{ item }}
        <span class="h-1 w-1 rounded-full bg-gpx" />
      </span>
    </div>
  </div>
</template>

<style>
@keyframes marquee {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
@media (prefers-reduced-motion: reduce) {
  [style*='marquee'] {
    animation: none !important;
  }
}
</style>
