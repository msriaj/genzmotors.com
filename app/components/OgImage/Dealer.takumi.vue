<script setup lang="ts">
/** Social card rendered at build time by nuxt-og-image (satori). */
withDefaults(defineProps<{ title?: string; description?: string }>(), {
  title: 'Gen-Z Motors',
  description: 'Authorized GPX dealer — Uttara, Dhaka',
})
</script>

<template>
  <div class="flex h-full w-full flex-col justify-between bg-[#000000] p-20">
    <div class="flex items-center gap-4">
      <div class="h-3 w-16 bg-[#eb0a1e]" />
      <p class="text-2xl uppercase tracking-[0.3em] text-[#9b9b9b]">Gen-Z Motors</p>
    </div>

    <div class="flex flex-col">
      <h1 class="max-w-[900px] text-7xl font-bold uppercase leading-none text-white">
        {{ title }}
      </h1>
      <p class="mt-8 max-w-[820px] text-3xl text-[#9b9b9b]">{{ description }}</p>
    </div>

    <div class="flex items-center justify-between">
      <p class="text-2xl uppercase tracking-[0.2em] text-[#ffffff]">
        Sector 15, Diabari, Uttara
      </p>
      <p class="text-2xl uppercase tracking-[0.2em] text-[#eb0a1e]">01609-711911</p>
    </div>
  </div>
</template>
