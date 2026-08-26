/**
 * Fragment shaders. Each covers a plane with `uv` in 0..1, with `uResolution` and
 * `uImageAspect` available for cover-fitting photography.
 */

const COMMON = /* glsl */ `
  // Fits the plane to the photograph. uContain = 1 letterboxes (product shots on a
  // white plate), 0 crops to fill (full-bleed imagery).
  vec2 fitUv(vec2 uv, vec2 res, float imageAspect, float contain) {
    float screenAspect = res.x / res.y;
    vec2 coverScale = screenAspect > imageAspect
      ? vec2(1.0, imageAspect / screenAspect)
      : vec2(screenAspect / imageAspect, 1.0);
    vec2 containScale = screenAspect > imageAspect
      ? vec2(screenAspect / imageAspect, 1.0)
      : vec2(1.0, imageAspect / screenAspect);
    vec2 scale = mix(coverScale, containScale, contain);
    return (uv - 0.5) * scale + 0.5;
  }

  vec2 coverUv(vec2 uv, vec2 res, float imageAspect) {
    float screenAspect = res.x / res.y;
    vec2 scale = screenAspect > imageAspect
      ? vec2(1.0, imageAspect / screenAspect)
      : vec2(screenAspect / imageAspect, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }

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

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }
`

/**
 * Colourway change — a clean crossfade with a soft directional wipe.
 *
 * No displacement or channel splitting: the motorcycle must stay undistorted, so the
 * only motion is the boundary between the outgoing and incoming photograph.
 */
export const COLOUR_FADE_FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture0;
  uniform sampler2D uTexture1;
  uniform vec2 uResolution;
  uniform float uImageAspect;
  uniform float uProgress;
  uniform float uContain;
  uniform vec3 uPlate;
  ${COMMON}

  void main() {
    vec2 uv = fitUv(vUv, uResolution, uImageAspect, uContain);

    // Letterboxed areas take the plate colour so the photograph is never stretched.
    float inside = step(0.0, uv.x) * step(uv.x, 1.0) * step(0.0, uv.y) * step(uv.y, 1.0);
    vec2 clamped = clamp(uv, 0.0, 1.0);

    vec3 from = mix(uPlate, texture2D(uTexture0, clamped).rgb, inside);
    vec3 to = mix(uPlate, texture2D(uTexture1, clamped).rgb, inside);

    // Soft diagonal boundary so the change reads as motion, not a dissolve.
    float edge = smoothstep(uProgress - 0.35, uProgress + 0.15, vUv.x * 0.6 + vUv.y * 0.2 + 0.1);
    vec3 color = mix(to, from, edge);

    // A faint warm line travelling with the boundary.
    float band = (1.0 - abs(edge - 0.5) * 2.0);
    color += vec3(1.0, 0.42, 0.36) * pow(band, 6.0) * 0.16;

    gl_FragColor = vec4(color, 1.0);
  }
`
