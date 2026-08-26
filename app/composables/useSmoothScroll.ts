import type Lenis from 'lenis'

/**
 * Lenis smooth scroll, wired into GSAP's ticker so ScrollTrigger stays in sync.
 * Skipped for reduced-motion visitors, who keep native scrolling.
 */
export function useSmoothScroll() {
  let lenis: Lenis | null = null

  onMounted(async () => {
    if (prefersReducedMotion()) return

    const { default: LenisCtor } = await import('lenis')
    const { gsap, ScrollTrigger } = useGsap()

    lenis = new LenisCtor({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    })

    lenis.on('scroll', ScrollTrigger.update)
    const raf = (time: number) => lenis?.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    document.documentElement.classList.add('lenis-active')

    onBeforeUnmount(() => {
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenis = null
      document.documentElement.classList.remove('lenis-active')
    })
  })

  return {
    scrollTo: (target: string | number) => lenis?.scrollTo(target, { offset: -90 }),
  }
}
