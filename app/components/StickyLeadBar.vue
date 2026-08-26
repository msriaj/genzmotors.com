<script setup lang="ts">
/** Mobile-only call / WhatsApp bar. Appears after the hero scrolls past. */
import { dealer, telLink, whatsappLink } from '~/data/dealer'

const visible = ref(false)
const onScroll = () => (visible.value = window.scrollY > 600)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-400 ease-out"
    enter-from-class="translate-y-full"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-to-class="translate-y-full"
  >
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-line bg-black/95 backdrop-blur-xl lg:hidden"
    >
      <a
        :href="telLink()"
        class="flex items-center justify-center gap-2 py-4 font-display text-sm uppercase tracking-[0.16em] text-white"
      >
        Call {{ dealer.contact.phoneDisplay }}
      </a>
      <a
        :href="whatsappLink('Hi Gen-Z Motors, I would like to book a test ride.')"
        target="_blank"
        rel="noopener"
        class="flex items-center justify-center gap-2 bg-gpx py-4 font-display text-sm uppercase tracking-[0.16em] text-white"
      >
        WhatsApp
      </a>
    </div>
  </Transition>
</template>
