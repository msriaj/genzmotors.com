<script setup lang="ts">
/**
 * Stand-in for photography Gen-Z Motors has not supplied yet.
 *
 * Every instance names the shot it is waiting for; the matching AI generation prompt
 * lives in ASSETS.md under the same label. Swap in a real file and delete the component.
 */
defineProps<{ label: string; ratio?: string }>()
</script>

<template>
  <div
    class="relative flex items-center justify-center overflow-hidden bg-paper-mute"
    :style="{ aspectRatio: ratio ?? '16 / 10' }"
  >
    <div
      class="absolute inset-0 opacity-60"
      style="
        background-image:
          repeating-linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0 2px, transparent 2px 10px),
          radial-gradient(120% 90% at 30% 0%, #1e1e23 0%, #0e0e11 70%);
      "
    />
    <div class="relative px-6 text-center">
      <p class="eyebrow mb-2">Photography pending</p>
      <p class="font-display text-lg uppercase tracking-wide text-muted">{{ label }}</p>
    </div>
    <div class="absolute inset-3 border border-dashed border-white/12" />
  </div>
</template>
