import type maplibregl from "maplibre-gl";

// Hand-drawn line work for the travel-journal layer: trail routes, story
// threads, and the overview arcs. Everything here is illustrative — curves
// are gentle beziers with a touch of pen wobble, never routed.

export type LngLat = [number, number];

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

// Deterministic per-line wobble so the ink doesn't rewiggle on re-render.
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * A sketched ink line from a to b: quadratic bezier bowed perpendicular to
 * the chord, with low-frequency pen wobble. `bow` and `jitter` are fractions
 * of the chord length. Longitudes are scaled by cos(lat) so curves look
 * round on screen, not squashed.
 */
export function inkLine(
  a: LngLat,
  b: LngLat,
  {
    bow = 0.12,
    jitter = 0.012,
    steps = 28,
    seed = 1,
  }: { bow?: number; jitter?: number; steps?: number; seed?: number } = {}
): LngLat[] {
  const rand = mulberry32(seed);
  const midLat = (a[1] + b[1]) / 2;
  const kx = Math.cos((midLat * Math.PI) / 180) || 1e-6;

  // planar coords (lng compressed), back-converted at the end
  const ax = a[0] * kx,
    ay = a[1],
    bx = b[0] * kx,
    by = b[1];
  const dx = bx - ax,
    dy = by - ay;
  const len = Math.hypot(dx, dy);
  if (len === 0) return [a, b];
  // unit perpendicular; bow side flips with the seed so a fan of threads
  // from one pin doesn't all bend the same way
  const px = -dy / len,
    py = dx / len;
  const side = rand() > 0.5 ? 1 : -1;
  const cx = ax + dx / 2 + px * len * bow * side;
  const cy = ay + dy / 2 + py * len * bow * side;

  // 2-3 wobble waves along the line
  const w1 = (rand() - 0.5) * 2,
    w2 = (rand() - 0.5) * 2,
    ph = rand() * Math.PI * 2;

  const out: LngLat[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const mt = 1 - t;
    let x = mt * mt * ax + 2 * mt * t * cx + t * t * bx;
    let y = mt * mt * ay + 2 * mt * t * cy + t * t * by;
    // wobble fades at the endpoints so the line lands exactly on the pins
    const fade = Math.sin(Math.PI * t);
    const wob =
      (w1 * Math.sin(2 * Math.PI * t * 2 + ph) +
        w2 * Math.sin(2 * Math.PI * t * 3.7 + ph * 1.7)) *
      jitter *
      len *
      fade;
    x += px * wob;
    y += py * wob;
    out.push([x / kx, y]);
  }
  return out;
}

export function lineFeature(
  coords: LngLat[],
  props: Record<string, unknown> = {}
): GeoJSON.Feature<GeoJSON.LineString> {
  return {
    type: "Feature",
    properties: props,
    geometry: { type: "LineString", coordinates: coords },
  };
}

export function featureCollection(
  features: GeoJSON.Feature[]
): GeoJSON.FeatureCollection {
  return { type: "FeatureCollection", features };
}

// Marching-dash frames (the classic ant-path trick: line-dasharray can't be
// interpolated, so we step through phase-shifted patterns). Dash 3, gap 4 —
// dashes appear to travel from the line's first coordinate toward its last.
const DASH_FRAMES: number[][] = [
  [0, 4, 3],
  [0.5, 4, 2.5],
  [1, 4, 2],
  [1.5, 4, 1.5],
  [2, 4, 1],
  [2.5, 4, 0.5],
  [3, 4, 0],
  [0, 0.5, 3, 3.5],
  [0, 1, 3, 3],
  [0, 1.5, 3, 2.5],
  [0, 2, 3, 2],
  [0, 2.5, 3, 1.5],
  [0, 3, 3, 1],
  [0, 3.5, 3, 0.5],
];

export const STATIC_DASH = [3, 4];

/**
 * Slowly march the dashes of a line layer (≈1.6s per cycle). Returns a stop
 * function. No-ops (static dashes) when the user prefers reduced motion.
 */
export function animateDashes(
  map: maplibregl.Map,
  layerId: string,
  cycleMs = 1600
): () => void {
  if (prefersReducedMotion()) return () => {};
  let raf = 0;
  let lastStep = -1;
  const frame = (now: number) => {
    const step = Math.floor(((now % cycleMs) / cycleMs) * DASH_FRAMES.length);
    if (step !== lastStep && map.getLayer(layerId)) {
      map.setPaintProperty(layerId, "line-dasharray", DASH_FRAMES[step]);
      lastStep = step;
    }
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}
