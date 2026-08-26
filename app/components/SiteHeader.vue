<script setup lang="ts">
import { dealer, telLink, whatsappLink } from '~/data/dealer'

const open = ref(false)
const scrolled = ref(false)
const route = useRoute()

const links = [
  { to: '/motorcycles', label: 'Motorcycles' },
  { to: '/showrooms', label: 'Showrooms' },
  { to: '/service-support', label: 'Service' },
  { to: '/gear', label: 'Gear' },
  { to: '/authorized-dealer', label: 'Dealer' },
  { to: '/contact', label: 'Contact' },
]

const onScroll = () => (scrolled.value = window.scrollY > 40)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

watch(() => route.fullPath, () => (open.value = false))
watch(open, (isOpen) => {
  if (import.meta.client) document.body.style.overflow = isOpen ? 'hidden' : ''
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-all duration-500"
    :class="
      scrolled || open
        ? 'border-line bg-paper/88 backdrop-blur-xl'
        : 'border-transparent bg-transparent'
    "
  >
    <div class="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
      <NuxtLink to="/" class="flex items-center" aria-label="Gen-Z Motors home">
        <BrandLogo class="h-9 w-auto text-ink transition-colors duration-300 hover:text-gpx lg:h-10" />
      </NuxtLink>

      <nav class="hidden items-center gap-8 lg:flex" aria-label="Primary">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="group relative font-display text-sm uppercase tracking-[0.18em] text-muted transition-colors hover:text-ink"
          active-class="text-ink"
        >
          {{ link.label }}
          <span
            class="absolute -bottom-1.5 left-0 h-px w-0 bg-gpx transition-all duration-400 group-hover:w-full"
          />
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-3 lg:flex">
        <a
          :href="telLink()"
          class="font-display text-sm uppercase tracking-[0.16em] text-ink transition-colors hover:text-gpx"
        >
          {{ dealer.contact.phoneDisplay }}
        </a>
        <AppButton to="/test-ride" size="md">Book a test ride</AppButton>
      </div>

      <button
        class="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
        :aria-expanded="open"
        aria-label="Toggle navigation"
        @click="open = !open"
      >
        <span
          class="h-px w-6 bg-ink transition-transform duration-300"
          :class="open ? 'translate-y-[6px] rotate-45' : ''"
        />
        <span class="h-px w-6 bg-ink transition-opacity duration-300" :class="open ? 'opacity-0' : ''" />
        <span
          class="h-px w-6 bg-ink transition-transform duration-300"
          :class="open ? '-translate-y-[6px] -rotate-45' : ''"
        />
      </button>
    </div>

    <Transition
      enter-active-class="transition-all duration-400 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      leave-active-class="transition-all duration-300 ease-in"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="open" class="border-t border-line bg-paper lg:hidden">
        <nav class="container-x flex flex-col py-6" aria-label="Mobile">
          <NuxtLink
            v-for="(link, i) in links"
            :key="link.to"
            :to="link.to"
            class="border-b border-line py-4 font-display text-2xl uppercase tracking-wide text-ink"
            :style="{ transitionDelay: `${i * 40}ms` }"
          >
            {{ link.label }}
          </NuxtLink>
          <div class="mt-6 flex flex-col gap-3">
            <AppButton :href="telLink()" size="lg">Call {{ dealer.contact.phoneDisplay }}</AppButton>
            <AppButton
              :href="whatsappLink('Hi Gen-Z Motors, I would like to know more about GPX motorcycles.')"
              variant="ghost"
              size="lg"
            >
              WhatsApp us
            </AppButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
