<script setup lang="ts">
defineProps<{ trail: { label: string; to?: string }[] }>()
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2 font-display text-xs uppercase tracking-[0.2em]">
      <li>
        <NuxtLink to="/" class="text-muted transition-colors hover:text-gpx">Home</NuxtLink>
      </li>
      <li v-for="crumb in trail" :key="crumb.label" class="flex items-center gap-2">
        <span aria-hidden="true" class="text-muted">/</span>
        <NuxtLink v-if="crumb.to" :to="crumb.to" class="text-muted transition-colors hover:text-gpx">
          {{ crumb.label }}
        </NuxtLink>
        <span v-else class="text-ink">{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>
