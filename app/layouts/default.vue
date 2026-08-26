<script setup lang="ts">
useSmoothScroll()
</script>

<template>
  <div class="relative min-h-screen">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gpx focus:px-4 focus:py-2 focus:text-white"
    >
      Skip to content
    </a>
    <SiteBackground />
    <CursorLens />
    <SiteHeader />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
    <StickyLeadBar />
  </div>
</template>
