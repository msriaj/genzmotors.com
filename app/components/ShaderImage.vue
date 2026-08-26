<script setup lang="ts">
/**
 * A photograph with an optional WebGL layer painted over it.
 *
 * The <NuxtImg> underneath is the real content: it is what search engines index,
 * what renders without JavaScript, and what reduced-motion visitors see. The canvas
 * fades in on top only when WebGL is available and the section is in view.
 */
import type { createShaderPlane } from '~/composables/useShaderPlane'

const props = withDefaults(
  defineProps<{
    src: string
    alt: string
    fragment: string
    /** Second texture, for transition shaders. */
    srcB?: string
    /** Drives uProgress; hero reveals animate this from 0 to 1 on mount. */
    progress?: number
    /** Animate progress 0 → 1 once the element is visible. */
    autoReveal?: boolean
    /** Pointer position feeds uMouse (parallax only — never distortion). */
    interactive?: boolean
    /** 'contain' letterboxes onto `plate`; 'cover' crops to fill. */
    fit?: 'cover' | 'contain'
    /** Backdrop colour behind a contained photograph. */
    plate?: string
    sizes?: string
    preload?: boolean
    width?: number
    height?: number
    imgClass?: string
  }>(),
  {
    progress: 1,
    autoReveal: false,
    interactive: false,
    fit: 'cover',
    plate: '#ffffff',
    sizes: '100vw',
    preload: false,
    imgClass: 'h-full w-full object-cover',
  },
)

const root = ref<HTMLElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)

let plane: ReturnType<typeof createShaderPlane> | null = null
let stopWatch: (() => void) | null = null

const hover = { current: 0, target: 0 }
const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }

function onPointerMove(event: PointerEvent) {
  const el = root.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  mouse.tx = (event.clientX - rect.left) / rect.width
  mouse.ty = 1 - (event.clientY - rect.top) / rect.height
}

onMounted(async () => {
  if (!canRenderWebGL() || !canvas.value) return

  const { createShaderPlane } = await import('~/composables/useShaderPlane')
  const textures = props.srcB ? [props.src, props.srcB] : [props.src]

  plane = createShaderPlane({
    canvas: canvas.value,
    textures,
    fragmentShader: props.fragment,
    fit: props.fit,
    plate: props.plate,
    onFrame: (uniforms) => {
      hover.current += (hover.target - hover.current) * 0.08
      mouse.x += (mouse.tx - mouse.x) * 0.06
      mouse.y += (mouse.ty - mouse.y) * 0.06
      uniforms.uHover!.value = hover.current
      ;(uniforms.uMouse!.value as { set: (x: number, y: number) => void }).set(mouse.x, mouse.y)
    },
  })

  if (props.autoReveal) {
    const { gsap } = useGsap()
    plane.uniforms.uProgress!.value = 0
    gsap.to(plane.uniforms.uProgress!, {
      value: 1,
      duration: 2.1,
      ease: 'expo.inOut',
      delay: 0.15,
    })
  } else {
    plane.uniforms.uProgress!.value = props.progress
  }

  stopWatch = watch(
    () => props.progress,
    (value) => {
      if (plane && !props.autoReveal) plane.uniforms.uProgress!.value = value
    },
  )

  // Give the texture a beat to decode before revealing the canvas.
  requestAnimationFrame(() => requestAnimationFrame(() => (ready.value = true)))
})

onBeforeUnmount(() => {
  stopWatch?.()
  plane?.dispose()
  plane = null
})

defineExpose({
  /** Used by the colourway switcher to crossfade to a new photograph. */
  transitionTo(from: string, to: string) {
    if (!plane) return false
    plane.setTextures(from, to)
    plane.uniforms.uProgress!.value = 0
    const { gsap } = useGsap()
    gsap.to(plane.uniforms.uProgress!, { value: 1, duration: 1.2, ease: 'power2.inOut' })
    return true
  },
})
</script>

<template>
  <div
    ref="root"
    class="relative overflow-hidden"
    @pointermove="props.interactive ? onPointerMove($event) : undefined"
    @pointerenter="hover.target = 1"
    @pointerleave="hover.target = 0"
  >
    <NuxtImg
      :src="props.src"
      :alt="props.alt"
      :sizes="props.sizes"
      :width="props.width"
      :height="props.height"
      :preload="props.preload"
      :loading="props.preload ? 'eager' : 'lazy'"
      :fetchpriority="props.preload ? 'high' : 'auto'"
      :class="props.imgClass"
      class="transition-opacity duration-700"
      :style="ready ? { opacity: 0.001 } : undefined"
    />
    <canvas
      ref="canvas"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-700"
      :class="ready ? 'opacity-100' : 'opacity-0'"
    />
    <slot />
  </div>
</template>
