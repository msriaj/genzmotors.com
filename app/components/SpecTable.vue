<script setup lang="ts">
/** Specification groups with a scroll-pinned index on wide screens. */
import type { SpecGroup } from '~/data/bikes'

const props = defineProps<{ groups: SpecGroup[]; model: string }>()

const root = ref<HTMLElement | null>(null)
const activeGroup = ref(0)

onMounted(() => {
  if (prefersReducedMotion() || !root.value) return
  const { gsap, ScrollTrigger } = useGsap()
  const sections = root.value.querySelectorAll('[data-spec-group]')

  const triggers = Array.from(sections).map((section, index) =>
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => {
        if (self.isActive) activeGroup.value = index
      },
    }),
  )

  const rows = root.value.querySelectorAll('[data-spec-row]')
  const tween = gsap.from(rows, {
    opacity: 0,
    x: -14,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.015,
    scrollTrigger: { trigger: root.value, start: 'top 78%', once: true },
  })

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill())
    tween.scrollTrigger?.kill()
    tween.kill()
  })
})
</script>

<template>
  <div ref="root" class="grid gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:gap-16">
    <nav class="hidden lg:block" aria-label="Specification sections">
      <div class="sticky top-[calc(var(--header-h)+2rem)]">
        <p class="eyebrow mb-5">{{ props.model }} specifications</p>
        <ul class="space-y-2">
          <li v-for="(group, i) in props.groups" :key="group.group">
            <span
              class="block border-l-2 py-1.5 pl-4 font-display text-sm uppercase tracking-[0.16em] transition-colors duration-300"
              :class="i === activeGroup ? 'border-gpx text-ink' : 'border-line text-muted'"
            >
              {{ group.group }}
            </span>
          </li>
        </ul>
      </div>
    </nav>

    <div class="space-y-14">
      <section v-for="group in props.groups" :key="group.group" data-spec-group>
        <h3 class="display-lg mb-6 text-ink">{{ group.group }}</h3>
        <dl class="divide-y divide-line border-y border-line">
          <div
            v-for="row in group.rows"
            :key="row.label"
            data-spec-row
            class="grid grid-cols-1 gap-1 py-4 sm:grid-cols-2 sm:gap-6"
          >
            <dt class="text-sm text-muted">{{ row.label }}</dt>
            <dd class="text-sm font-medium text-ink">{{ row.value }}</dd>
          </div>
        </dl>
      </section>
    </div>
  </div>
</template>
