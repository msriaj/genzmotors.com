/**
 * Line-by-line heading reveal.
 *
 * Splits the element's text into words, wraps each in a masked span, then raises the
 * words in a stagger when the heading scrolls into view. The original text is restored
 * to the DOM if the effect never runs, so crawlers and reduced-motion visitors read the
 * plain markup.
 */
export function useTextReveal(target: Ref<HTMLElement | null>, options: { delay?: number } = {}) {
  onMounted(() => {
    const el = target.value
    if (!el || prefersReducedMotion()) return

    const original = el.textContent ?? ''
    if (!original.trim()) return

    el.setAttribute('aria-label', original.trim())
    el.textContent = ''

    const spans: HTMLElement[] = []
    for (const word of original.trim().split(/\s+/)) {
      const mask = document.createElement('span')
      mask.style.display = 'inline-block'
      mask.style.overflow = 'hidden'
      mask.style.verticalAlign = 'top'

      const inner = document.createElement('span')
      inner.style.display = 'inline-block'
      inner.textContent = word
      inner.setAttribute('aria-hidden', 'true')

      mask.append(inner)
      el.append(mask, document.createTextNode(' '))
      spans.push(inner)
    }

    const { gsap } = useGsap()
    const tween = gsap.from(spans, {
      yPercent: 115,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.045,
      delay: options.delay ?? 0,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    })

    onBeforeUnmount(() => {
      tween.scrollTrigger?.kill()
      tween.kill()
    })
  })
}
