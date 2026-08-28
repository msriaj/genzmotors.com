type GsapModule = typeof import('gsap')['gsap']
type ScrollTriggerModule = typeof import('gsap/ScrollTrigger')['ScrollTrigger']

let gsapPromise: Promise<{ gsap: GsapModule; ScrollTrigger: ScrollTriggerModule }> | null = null

/**
 * Loads GSAP on demand and registers ScrollTrigger once.
 *
 * Importing it at module scope put ~60KB of animation library on the critical path of
 * every page, ahead of the content it animates. Now it arrives with the effect.
 */
export function useGsap() {
  if (!gsapPromise) {
    gsapPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger)
        return { gsap, ScrollTrigger }
      },
    )
  }
  return gsapPromise
}

/** True when the visitor asked the OS to reduce motion. */
export function prefersReducedMotion(): boolean {
  return import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * WebGL capability probe, cached for the session.
 *
 * "Has a context" is not enough. Headless Chrome, VMs and machines without a usable GPU
 * fall back to a software rasteriser (SwiftShader, llvmpipe), where a full-screen shader
 * is rendered pixel by pixel on the CPU and eats the main thread. Those clients get the
 * static fallback instead.
 */
let webglSupport: boolean | null = null
export function supportsWebGL(): boolean {
  if (!import.meta.client) return false
  if (webglSupport !== null) return webglSupport

  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl2') ||
      canvas.getContext('webgl')) as WebGLRenderingContext | null

    if (!gl) {
      webglSupport = false
      return false
    }

    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = info
      ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL) ?? '')
      : String(gl.getParameter(gl.RENDERER) ?? '')

    webglSupport = !/swiftshader|llvmpipe|software|basic render|angle \(software/i.test(renderer)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    webglSupport = false
  }
  return webglSupport
}

/** Rough "can this machine afford a shader running every frame?" check. */
export function hasSpareCycles(): boolean {
  if (!import.meta.client) return false
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  if (nav.connection?.saveData) return false
  if ((nav.deviceMemory ?? 8) < 4) return false
  if ((navigator.hardwareConcurrency ?? 8) < 4) return false
  return true
}

/** Heavy effects are skipped entirely on reduced-motion, weak or non-WebGL clients. */
export function canRenderWebGL(): boolean {
  return supportsWebGL() && hasSpareCycles() && !prefersReducedMotion()
}

/**
 * Ambient WebGL — the background field, the particle mark — is desktop only.
 * On a phone it would cost half a megabyte of three.js for decoration behind the text.
 */
export function canRenderAmbientWebGL(): boolean {
  if (!import.meta.client) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  if (window.innerWidth < 1024) return false
  return canRenderWebGL()
}

/**
 * Defers work until the page has loaded and the main thread is idle, so an effect can
 * never compete with first paint or push out the largest contentful paint.
 */
export function whenIdle(run: () => void, timeout = 2500) {
  if (!import.meta.client) return

  const schedule = () => {
    const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void })
      .requestIdleCallback
    if (ric) ric(() => run(), { timeout })
    else setTimeout(run, 200)
  }

  if (document.readyState === 'complete') schedule()
  else window.addEventListener('load', schedule, { once: true })
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

  onMounted(async () => {
    const el = target.value
    if (!el || prefersReducedMotion()) return

    const { gsap, ScrollTrigger } = await useGsap()
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

  onMounted(async () => {
    const el = target.value
    if (!el || prefersReducedMotion()) {
      display.value = to
      return
    }
    const { gsap } = await useGsap()
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
