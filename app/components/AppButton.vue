<script setup lang="ts">
/**
 * Call-to-action button. Renders as NuxtLink for internal routes, <a> for tel:/wa.me,
 * and <button> otherwise. Magnetic pointer response is disabled for reduced motion.
 */
const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    variant?: 'primary' | 'ghost' | 'quiet'
    size?: 'md' | 'lg'
    magnetic?: boolean
    /** Render for a dark section (hero, closing band, footer). */
    onDark?: boolean
  }>(),
  { variant: 'primary', size: 'md', magnetic: true, onDark: false },
)

// The ref may hold a component instance (NuxtLink) or a plain element, so unwrap it.
const el = ref<HTMLElement | { $el: HTMLElement } | null>(null)
const node = (): HTMLElement | null => {
  const value = el.value
  if (!value) return null
  return '$el' in value ? value.$el : value
}

const classes = computed(() => {
  const base =
    'group relative inline-flex items-center justify-center gap-2 overflow-hidden font-display uppercase tracking-[0.14em] transition-colors duration-300 will-change-transform'
  const size = props.size === 'lg' ? 'px-9 py-4 text-base' : 'px-6 py-3 text-sm'
  // `onDark` flips the palette for the hero, the closing band and the footer.
  const variant = props.onDark
    ? {
        primary: 'bg-gpx text-white hover:bg-white hover:text-ink',
        ghost: 'border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink',
        quiet: 'text-white/70 hover:text-white',
      }[props.variant]
    : {
        primary: 'bg-gpx text-white hover:bg-white hover:text-black',
        ghost: 'border border-white/25 text-ink hover:border-white hover:bg-white hover:text-black',
        quiet: 'text-muted hover:text-gpx',
      }[props.variant]
  return [base, size, variant].join(' ')
})

function onMove(event: PointerEvent) {
  const target = node()
  if (!props.magnetic || !target || prefersReducedMotion()) return
  const rect = target.getBoundingClientRect()
  const x = (event.clientX - rect.left - rect.width / 2) * 0.18
  const y = (event.clientY - rect.top - rect.height / 2) * 0.28
  target.style.transform = `translate3d(${x}px, ${y}px, 0)`
}

function onLeave() {
  const target = node()
  if (target) target.style.transform = ''
}

const tag = computed(() => (props.to ? resolveComponent('NuxtLink') : props.href ? 'a' : 'button'))
const isExternal = computed(() => Boolean(props.href?.startsWith('http')))
</script>

<template>
  <component
    :is="tag"
    ref="el"
    :to="props.to"
    :href="props.href"
    :rel="isExternal ? 'noopener' : undefined"
    :target="isExternal ? '_blank' : undefined"
    :class="classes"
    style="transition: transform 0.4s var(--ease-out-expo), background-color 0.3s, color 0.3s"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <span class="relative z-10 flex items-center gap-2"><slot /></span>
  </component>
</template>
