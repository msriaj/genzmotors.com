<script setup lang="ts">
/**
 * The brand "Z", drawn as a particle field that assembles into the mark.
 *
 * Targets are sampled from the real logo geometry: `public/images/brand/genz-z.svg` is
 * rasterised offscreen and every opaque pixel becomes a candidate point, so the cloud
 * resolves into exactly the shape in the wordmark. Particles start scattered in a slab of
 * space, fly to their target, breathe, and scatter again on a slow loop.
 *
 * One THREE.Points draw call with a custom shader — no per-particle objects, no physics.
 * Skipped entirely for reduced-motion or non-WebGL visitors.
 */
import * as THREE from 'three'

const PARTICLES = 7200
/** Seconds: assemble, hold, disperse. */
const CYCLE = { form: 2.4, hold: 9, scatter: 1.4 }

const canvas = ref<HTMLCanvasElement | null>(null)
const ready = ref(false)

let cleanup: (() => void) | null = null

/** Rasterises the Z and returns points on its surface, normalised to roughly [-1, 1]. */
async function sampleZ(count: number): Promise<{ positions: Float32Array; aspect: number }> {
  const markup = await fetch('/images/brand/genz-z.svg').then((r) => r.text())
  const svg = markup.replace(/currentColor/g, '#ffffff')

  const width = 900
  const viewBox = markup.match(/viewBox="([\d.\-\s]+)"/)?.[1]?.trim().split(/\s+/).map(Number)
  const aspect = viewBox && viewBox[2] && viewBox[3] ? viewBox[2] / viewBox[3] : 2.4
  const height = Math.round(width / aspect)

  const image = new Image()
  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
  await image.decode()

  const c = document.createElement('canvas')
  c.width = width
  c.height = height
  const ctx = c.getContext('2d', { willReadFrequently: true })!
  ctx.drawImage(image, 0, 0, width, height)
  const { data } = ctx.getImageData(0, 0, width, height)

  // Collect opaque pixels, then take an even spread of them.
  const opaque: number[] = []
  for (let i = 3; i < data.length; i += 4) {
    if (data[i]! > 128) opaque.push((i - 3) / 4)
  }

  const positions = new Float32Array(count * 3)
  for (let n = 0; n < count; n++) {
    const pixel = opaque[Math.floor((n / count) * opaque.length)] ?? 0
    const px = pixel % width
    const py = Math.floor(pixel / width)
    // Jitter within the pixel so the cloud does not look like a grid.
    positions[n * 3] = ((px + Math.random()) / width - 0.5) * 2 * aspect
    positions[n * 3 + 1] = -((py + Math.random()) / height - 0.5) * 2
    positions[n * 3 + 2] = (Math.random() - 0.5) * 0.09
  }
  return { positions, aspect }
}

const VERTEX = /* glsl */ `
  attribute vec3 aTarget;
  attribute vec3 aScatter;
  attribute float aSeed;

  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform vec2 uMouse;
  uniform float uPointer;

  varying float vSeed;
  varying float vGlow;
  varying float vSpan;
  varying float vTouch;

  vec2 rotate(vec2 v, float a) {
    float c = cos(a);
    float s = sin(a);
    return vec2(v.x * c - v.y * s, v.x * s + v.y * c);
  }

  void main() {
    // Each particle lands slightly out of step with its neighbours.
    float delay = aSeed * 0.35;
    float t = clamp((uProgress - delay) / (1.0 - delay), 0.0, 1.0);
    float eased = 1.0 - pow(1.0 - t, 4.0);

    // Particles spiral in rather than travelling in a straight line.
    vec3 from = aScatter;
    from.xy = rotate(from.xy, (1.0 - eased) * (1.2 + aSeed * 2.4));
    vec3 pos = mix(from, aTarget, eased);

    // Idle drift once formed, so the mark never looks frozen.
    float breathe = sin(uTime * 0.7 + aSeed * 24.0) * 0.012 * eased;
    pos += vec3(breathe, breathe * 0.6, sin(uTime * 0.5 + aSeed * 11.0) * 0.03);

    // Pointer interaction: particles are pushed aside and a ripple travels outward.
    vec2 away = pos.xy - uMouse;
    float d = length(away);
    float falloff = exp(-d * 3.0) * uPointer * eased;
    float ripple = sin(d * 16.0 - uTime * 5.0) * 0.018 * exp(-d * 2.2) * uPointer * eased;
    pos.xy += normalize(away + 1e-5) * (0.30 * falloff + ripple);
    pos.z += ripple * 1.6;

    vGlow = eased;
    vSeed = aSeed;
    // Position along the mark, for the colour gradient.
    vSpan = clamp(aTarget.x * 0.5 + 0.5, 0.0, 1.0);
    vTouch = falloff;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * (1.0 + aSeed * 0.6 + vTouch * 1.4) * (1.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying float vSeed;
  varying float vGlow;
  varying float vSpan;
  varying float vTouch;

  void main() {
    // Round point with a bright core and a soft halo.
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float alpha = pow(core, 1.6);

    // Graded along the mark: deep crimson at the tail, brand red through the body,
    // hot white-orange at the leading edge.
    vec3 deep = vec3(0.42, 0.01, 0.05);
    vec3 brand = vec3(0.92, 0.04, 0.12);
    vec3 hot = vec3(1.0, 0.55, 0.42);

    vec3 color = mix(deep, brand, smoothstep(0.0, 0.55, vSpan));
    color = mix(color, hot, smoothstep(0.72, 1.0, vSpan) * 0.75);

    // A scatter of white sparks reads as chrome flake on the paint.
    color = mix(color, vec3(1.0, 0.95, 0.93), step(0.965, vSeed));

    // In flight the cloud is cooler and dimmer; touched particles flare.
    color = mix(color * 0.55, color, vGlow);
    color += vTouch * vec3(1.0, 0.45, 0.35) * 0.9;

    gl_FragColor = vec4(color, alpha * (0.06 + vGlow * 0.62 + vTouch * 0.5));
  }
`

async function start() {
  if (!canvas.value) return

  const el = canvas.value
  const renderer = new THREE.WebGLRenderer({
    canvas: el,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 20)
  camera.position.set(0, 0, 3.1)

  // Fewer points on smaller screens: the mark is physically smaller there.
  const count = window.innerWidth < 1400 ? Math.round(PARTICLES * 0.6) : PARTICLES
  const { positions, aspect } = await sampleZ(count)

  const scatter = new Float32Array(count * 3)
  const seeds = new Float32Array(count)
  for (let i = 0; i < count; i++) {
    // Dispersal is a spherical shell, not a slab: a box-shaped cloud reads as a rectangle
    // the moment the mark breaks apart. Cube-rooting the radius keeps density even.
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const radius = 0.55 + Math.cbrt(Math.random()) * 0.85
    scatter[i * 3] = Math.sin(phi) * Math.cos(theta) * radius * aspect * 0.8
    scatter[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius
    scatter[i * 3 + 2] = Math.cos(phi) * radius * 0.7
    seeds[i] = Math.random()
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
  geometry.setAttribute('aTarget', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3))
  geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1))

  const uniforms: Record<string, THREE.IUniform> = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uSize: { value: 22 },
    uMouse: { value: new THREE.Vector2(99, 99) },
    uPointer: { value: 0 },
  }

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader: FRAGMENT,
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  const points = new THREE.Points(geometry, material)
  scene.add(points)

  function fit() {
    const visibleHeight = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360)
    const visibleWidth = visibleHeight * camera.aspect
    const scale = Math.min((visibleWidth * 0.92) / (aspect * 2), (visibleHeight * 0.8) / 2)
    points.scale.setScalar(scale)
    uniforms.uSize!.value = 22 * scale * Math.min(window.devicePixelRatio, 2)
  }

  function resize() {
    const w = el.clientWidth
    const h = el.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    fit()
  }
  resize()

  // Pointer position in the mark's own space, so repulsion tracks the cursor.
  const pointer = new THREE.Vector2(99, 99)
  const target = new THREE.Vector2(99, 99)
  let pointerTarget = 0
  function onPointerMove(event: PointerEvent) {
    pointerTarget = 1
    const r = el.getBoundingClientRect()
    const visibleHeight = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360)
    const visibleWidth = visibleHeight * camera.aspect
    target.set(
      ((event.clientX - r.left) / r.width - 0.5) * visibleWidth / points.scale.x,
      -((event.clientY - r.top) / r.height - 0.5) * visibleHeight / points.scale.y,
    )
  }
  function onPointerLeave() {
    pointerTarget = 0
  }
  function onPointerEnter() {
    pointerTarget = 1
  }

  const clock = new THREE.Clock()
  let frame = 0
  let running = false

  function loop() {
    frame = requestAnimationFrame(loop)
    const t = clock.getElapsedTime()
    uniforms.uTime!.value = t

    // form → hold → scatter → repeat
    const total = CYCLE.form + CYCLE.hold + CYCLE.scatter
    const phase = t % total
    uniforms.uProgress!.value =
      phase < CYCLE.form
        ? phase / CYCLE.form
        : phase < CYCLE.form + CYCLE.hold
          ? 1
          : 1 - (phase - CYCLE.form - CYCLE.hold) / CYCLE.scatter

    pointer.lerp(target, 0.12)
    ;(uniforms.uMouse!.value as THREE.Vector2).copy(pointer)
    uniforms.uPointer!.value += (pointerTarget - uniforms.uPointer!.value) * 0.06

    points.rotation.y = Math.sin(t * 0.2) * 0.22
    points.rotation.x = Math.sin(t * 0.15) * 0.08

    renderer.render(scene, camera)
  }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        if (!running) {
          running = true
          loop()
        }
      } else {
        running = false
        cancelAnimationFrame(frame)
      }
    },
    { rootMargin: '80px' },
  )
  observer.observe(el)

  el.addEventListener('pointermove', onPointerMove, { passive: true })
  el.addEventListener('pointerenter', onPointerEnter, { passive: true })
  el.addEventListener('pointerleave', onPointerLeave, { passive: true })
  window.addEventListener('resize', resize, { passive: true })
  ready.value = true

  cleanup = () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    el.removeEventListener('pointermove', onPointerMove)
    el.removeEventListener('pointerenter', onPointerEnter)
    el.removeEventListener('pointerleave', onPointerLeave)
    window.removeEventListener('resize', resize)
    geometry.dispose()
    material.dispose()
    renderer.dispose()
  }
}

onMounted(() => {
  if (!canRenderWebGL()) return
  whenIdle(() => void start())
})

onBeforeUnmount(() => cleanup?.())
</script>

<template>
  <canvas
    ref="canvas"
    aria-hidden="true"
    class="h-full w-full transition-opacity duration-1000"
    :class="ready ? 'opacity-100' : 'opacity-0'"
  />
</template>
