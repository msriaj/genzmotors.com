<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
    <p class="eyebrow mb-6">{{ error.statusCode }}</p>
    <h1 class="display-hero text-ink">
      Wrong<br ><span class="text-gpx">turn</span>
    </h1>
    <p class="mt-8 max-w-md text-lg text-muted">
      {{ error.statusCode === 404 ? 'That page is not on the map.' : 'Something went wrong on our side.' }}
      The GPX lineup and the Uttara showroom are still where you left them.
    </p>
    <div class="mt-10 flex flex-wrap justify-center gap-4">
      <AppButton to="/" size="lg">Back home</AppButton>
      <AppButton to="/motorcycles" variant="ghost" size="lg">See the lineup</AppButton>
    </div>
  </div>
</template>
