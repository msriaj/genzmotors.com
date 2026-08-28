<script setup lang="ts">
/**
 * Site-wide interactive background.
 *
 * One fixed full-viewport shader plane that lives behind every page: a slow volumetric
 * haze in brand red over near-black, a drifting particle dust layer, and a horizon grid
 * that reacts to how fast you are scrolling. The pointer drags a soft heat bloom around
 * with it.
 *
 * It is deliberately low-contrast — content sits on top and must stay readable. Mounted
 * once in the layout, paused when the tab is hidden, and skipped entirely for
 * reduced-motion or non-WebGL visitors (a CSS gradient stands in).
 */
import type * as THREE_NS from 'three'

const canvas = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)
let cleanup: (() => void) | null = null

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uScroll;      // page progress, 0..1
  uniform float uVelocity;    // scroll speed, smoothed and signed

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  // Three octaves is enough for a soft haze and costs 40% of five.
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);

    vec3 col = vec3(0.028, 0.028, 0.032);

    // Volumetric haze, dragged sideways by scroll velocity.
    vec2 q = p * 1.15 + vec2(uTime * 0.012 - uVelocity * 0.15, -uScroll * 0.55);
    float haze = fbm(q * 1.4);
    haze = pow(haze, 2.1);
    col += vec3(0.62, 0.03, 0.08) * haze * 0.42;

    // Pointer bloom: a soft warm light the cursor carries.
    float d = length(p - (uMouse - 0.5) * vec2(aspect, 1.0));
    col += vec3(0.85, 0.12, 0.16) * exp(-d * 3.4) * 0.16;

    // Horizon grid, tilting with scroll speed.
    float horizon = 0.14 + uVelocity * 0.02;
    if (vUv.y < horizon) {
      float depth = horizon - vUv.y;
      vec2 g = vec2(p.x / (depth * 2.6 + 0.05), 1.0 / (depth * 5.5 + 0.05) - uTime * 0.22 - uScroll * 6.0);
      vec2 grid = abs(fract(g) - 0.5);
      float line = 1.0 - min(min(grid.x, grid.y) * 16.0, 1.0);
      col += vec3(0.5, 0.03, 0.07) * line * smoothstep(0.0, 0.2, depth) * 0.42;
    }

    // Vignette and film grain.
    float vig = 1.0 - smoothstep(0.5, 1.35, length(vUv - 0.5) * 1.55);
    col *= mix(0.5, 1.0, vig);
    col += (hash(vUv * uResolution + uTime) - 0.5) * 0.018;

    gl_FragColor = vec4(col, 1.0);
  }
`

async function start() {
  if (!canvas.value) return

  const THREE = (await import('three')) as typeof THREE_NS
  const el = canvas.value

  const renderer = new THREE.WebGLRenderer({ canvas: el, antialias: false, alpha: false })
  // Half resolution, upscaled by CSS. The field is soft enough that nobody can tell,
  // and it quarters the fragment work.
  const RESOLUTION_SCALE = 0.5
  renderer.setPixelRatio(1)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1)

  const uniforms: Record<string, THREE_NS.IUniform> = {
    uResolution: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
    uScroll: { value: 0 },
    uVelocity: { value: 0 },
  }

  scene.add(
    new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: FRAGMENT,
        uniforms,
      }),
    ),
  )

  function resize() {
    const w = Math.round(window.innerWidth * RESOLUTION_SCALE)
    const h = Math.round(window.innerHeight * RESOLUTION_SCALE)
    renderer.setSize(w, h, false)
    ;(uniforms.uResolution!.value as THREE_NS.Vector2).set(w, h)
  }
  resize()

  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }
  const scroll = { progress: 0, velocity: 0, last: 0 }

  function onPointerMove(event: PointerEvent) {
    mouse.tx = event.clientX / window.innerWidth
    mouse.ty = 1 - event.clientY / window.innerHeight
  }

  function onScroll() {
    const max = Math.max(document.body.scrollHeight - window.innerHeight, 1)
    const y = window.scrollY
    scroll.velocity += (y - scroll.last) * 0.02
    scroll.last = y
    scroll.progress = y / max
  }

  const clock = new THREE.Clock()
  let frame = 0
  let running = true
  let lastDraw = 0
  const FRAME_MS = 1000 / 30

  function loop(now = 0) {
    frame = requestAnimationFrame(loop)
    if (!running || now - lastDraw < FRAME_MS) return
    lastDraw = now

    mouse.x += (mouse.tx - mouse.x) * 0.04
    mouse.y += (mouse.ty - mouse.y) * 0.04
    scroll.velocity *= 0.92

    uniforms.uTime!.value = clock.getElapsedTime()
    ;(uniforms.uMouse!.value as THREE_NS.Vector2).set(mouse.x, mouse.y)
    uniforms.uScroll!.value += (scroll.progress - uniforms.uScroll!.value) * 0.06
    uniforms.uVelocity!.value += (scroll.velocity - uniforms.uVelocity!.value) * 0.1

    renderer.render(scene, camera)
  }
  loop()

  const onVisibility = () => (running = !document.hidden)

  window.addEventListener('resize', resize, { passive: true })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('visibilitychange', onVisibility)

  ready.value = true

  cleanup = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', resize)
    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('scroll', onScroll)
    document.removeEventListener('visibilitychange', onVisibility)
    renderer.dispose()
  }
}

onMounted(() => {
  if (!canRenderWebGL()) return
  // Never compete with first paint: the field fades in after load, on an idle frame.
  whenIdle(() => void start())
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <div aria-hidden="true" class="pointer-events-none fixed inset-0 -z-10">
    <!-- Static stand-in: also what reduced-motion and no-WebGL visitors keep. -->
    <div
      class="absolute inset-0"
      style="
        background:
          radial-gradient(90% 60% at 50% 8%, rgba(235, 10, 30, 0.16) 0%, transparent 60%),
          radial-gradient(70% 50% at 12% 82%, rgba(235, 10, 30, 0.10) 0%, transparent 60%),
          #08080a;
      "
    />
    <canvas
      ref="canvas"
      class="absolute inset-0 h-full w-full transition-opacity duration-1000"
      :class="ready ? 'opacity-100' : 'opacity-0'"
    />
  </div>
</template>
