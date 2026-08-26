<script setup lang="ts">
/**
 * Pointer companion: a small dot that tracks exactly, and a ring that lags behind it.
 *
 * Elements opt into states with `data-cursor="link" | "view" | "drag"`, and can override
 * the ring label with `data-cursor-label`. Pointer-coarse devices and reduced-motion
 * visitors never see it — the native cursor is left alone.
 */
const dot = ref<HTMLElement | null>(null)
const ring = ref<HTMLElement | null>(null)
const label = ref('')
const state = ref<'idle' | 'link' | 'view'>('idle')
const visible = ref(false)

let frame = 0

onMounted(() => {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return

  const pos = { x: innerWidth / 2, y: innerHeight / 2 }
  const ringPos = { ...pos }

  function onMove(event: PointerEvent) {
    pos.x = event.clientX
    pos.y = event.clientY
    visible.value = true

    const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]')
    if (target) {
      state.value = (target.dataset.cursor as 'link' | 'view') ?? 'link'
      label.value = target.dataset.cursorLabel ?? ''
    } else {
      const interactive = (event.target as HTMLElement | null)?.closest('a, button, select, input, textarea')
      state.value = interactive ? 'link' : 'idle'
      label.value = ''
    }
  }

  function onLeave() {
    visible.value = false
  }

  function loop() {
    frame = requestAnimationFrame(loop)
    ringPos.x += (pos.x - ringPos.x) * 0.16
    ringPos.y += (pos.y - ringPos.y) * 0.16
    if (dot.value) dot.value.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
    if (ring.value) ring.value.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`
  }
  loop()

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerleave', onLeave)

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerleave', onLeave)
  })
})
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none fixed inset-0 z-[70] hidden lg:block">
    <span
      ref="dot"
      class="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gpx transition-opacity duration-300"
      :class="visible ? 'opacity-100' : 'opacity-0'"
    />
    <span
      ref="ring"
      class="absolute left-0 top-0 flex items-center justify-center rounded-full border border-white/35 font-display text-[0.6rem] uppercase tracking-[0.2em] text-white transition-[width,height,background-color,border-color,opacity] duration-300 ease-[var(--ease-out-expo)]"
      :class="[
        visible ? 'opacity-100' : 'opacity-0',
        state === 'view' ? 'h-20 w-20 border-transparent bg-gpx' : state === 'link' ? 'h-12 w-12 border-white/70' : 'h-8 w-8',
      ]"
    >
      {{ state === 'view' ? label : '' }}
    </span>
  </div>
</template>
