import * as THREE from 'three'

export interface ShaderPlaneOptions {
  canvas: HTMLCanvasElement
  /** Image URLs loaded into `uTexture0` / `uTexture1`. */
  textures: string[]
  fragmentShader: string
  uniforms?: Record<string, THREE.IUniform>
  /** Called every frame with elapsed seconds. */
  onFrame?: (uniforms: Record<string, THREE.IUniform>, elapsed: number) => void
  /** 'contain' letterboxes the photograph onto `plate`; 'cover' crops it. */
  fit?: 'cover' | 'contain'
  /** CSS colour behind a contained photograph. */
  plate?: string
}

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

/**
 * A single full-bleed plane with an orthographic camera — the cheapest way to run a
 * custom fragment shader over photography. No scene graph, no lights, no model loading.
 *
 * The renderer pauses when the canvas leaves the viewport and disposes on teardown.
 */
export function createShaderPlane(options: ShaderPlaneOptions) {
  const { canvas, textures, fragmentShader, onFrame } = options

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: false,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0, 1)

  const loader = new THREE.TextureLoader()
  const loaded = textures.map((src) => {
    const t = loader.load(src, () => resize())
    t.colorSpace = THREE.SRGBColorSpace
    t.minFilter = THREE.LinearFilter
    t.generateMipmaps = false
    return t
  })

  const uniforms: Record<string, THREE.IUniform> = {
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uHover: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uImageAspect: { value: 1 },
    uContain: { value: options.fit === 'contain' ? 1 : 0 },
    uPlate: { value: new THREE.Color(options.plate ?? '#ffffff') },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTexture0: { value: loaded[0] ?? null },
    uTexture1: { value: loaded[1] ?? loaded[0] ?? null },
    ...options.uniforms,
  }

  const material = new THREE.ShaderMaterial({
    vertexShader: VERTEX,
    fragmentShader,
    uniforms,
    transparent: true,
  })
  scene.add(new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material))

  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas
    if (!w || !h) return
    renderer.setSize(w, h, false)
    uniforms.uResolution!.value.set(w, h)
    const tex = uniforms.uTexture0!.value as THREE.Texture | null
    const img = tex?.image as { width?: number; height?: number } | undefined
    if (img?.width && img?.height) uniforms.uImageAspect!.value = img.width / img.height
  }

  const clock = new THREE.Clock()
  let frame = 0
  let running = false

  function loop() {
    frame = requestAnimationFrame(loop)
    const elapsed = clock.getElapsedTime()
    uniforms.uTime!.value = elapsed
    onFrame?.(uniforms, elapsed)
    renderer.render(scene, camera)
  }

  function start() {
    if (running) return
    running = true
    clock.start()
    loop()
  }

  function stop() {
    running = false
    cancelAnimationFrame(frame)
  }

  const observer = new IntersectionObserver(
    ([entry]) => (entry?.isIntersecting ? start() : stop()),
    { rootMargin: '120px' },
  )
  observer.observe(canvas)

  const onResize = () => resize()
  window.addEventListener('resize', onResize, { passive: true })
  resize()

  function dispose() {
    stop()
    observer.disconnect()
    window.removeEventListener('resize', onResize)
    loaded.forEach((t) => t.dispose())
    material.dispose()
    renderer.dispose()
  }

  /** Swaps the outgoing/incoming textures for a crossfade transition. */
  function setTextures(from: string, to: string, onReady?: () => void) {
    const a = loader.load(from)
    const b = loader.load(to, () => onReady?.())
    ;[a, b].forEach((t) => {
      t.colorSpace = THREE.SRGBColorSpace
      t.minFilter = THREE.LinearFilter
      t.generateMipmaps = false
    })
    uniforms.uTexture0!.value = a
    uniforms.uTexture1!.value = b
    loaded.push(a, b)
  }

  return { uniforms, dispose, resize, setTextures, renderer }
}
