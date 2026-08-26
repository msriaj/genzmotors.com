import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

/** Registers GSAP plugins once, client-side only. */
export function useGsap() {
  if (import.meta.client && !registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
  return { gsap, ScrollTrigger }
}

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  return import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Cheap WebGL capability probe, cached for the session. */
let webglSupport: boolean | null = null
export function supportsWebGL(): boolean {
  if (!import.meta.client) return false
  if (webglSupport !== null) return webglSupport
  try {
    const canvas = document.createElement('canvas')
    webglSupport = Boolean(
      canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl'),
    )
  } catch {
    webglSupport = false
  }
  return webglSupport
}

/** Heavy effects are skipped entirely on reduced-motion or non-WebGL clients. */
export function canRenderWebGL(): boolean {
  return supportsWebGL() && !prefersReducedMotion()
}

export interface RevealOptions {
  y?: number
  duration?: number
  stagger?: number
  start?: string
  /** Selector for children to stagger; when omitted the root element animates. */
  children?: string
}

/**
 * Scroll reveal that fails safe: elements stay visible unless this runs, so
 * no-JS and reduced-motion visitors never get stuck on opacity 0.
 */
export function useReveal(
  target: Ref<HTMLElement | null>,
  options: RevealOptions = {},
) {
  const { y = 28, duration = 0.9, stagger = 0.08, start = 'top 82%', children } = options

  onMounted(() => {
    const el = target.value
    if (!el || prefersReducedMotion()) return

    const { gsap, ScrollTrigger } = useGsap()
    const items: Element[] = children ? Array.from(el.querySelectorAll(children)) : [el]
    if (!items.length) return

    items.forEach((i) => i.setAttribute('data-reveal-armed', 'true'))

    const tween = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start, once: true },
    })

    onBeforeUnmount(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
      ScrollTrigger.refresh()
    })
  })
}

/** Counts a number up when its element scrolls into view. */
export function useCountUp(target: Ref<HTMLElement | null>, to: number, decimals = 0) {
  const display = ref(prefersReducedMotion() ? to : 0)

  onMounted(() => {
    const el = target.value
    if (!el || prefersReducedMotion()) {
      display.value = to
      return
    }
    const { gsap } = useGsap()
    const proxy = { n: 0 }
    const tween = gsap.to(proxy, {
      n: to,
      duration: 1.6,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        display.value = Number(proxy.n.toFixed(decimals))
      },
    })
    onBeforeUnmount(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  })

  return display
}
