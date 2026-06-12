import { featureCollection, lineFeature, type LngLat } from "./ink-lines";

// The groove: concentric vinyl rings pressed into the paper around a city
// center. Geography-anchored — the rings are real geometry, so they pan and
// zoom with the map like the city sits on a record, not like a screen
// watermark. Spacing opens up as the rings travel outward (real grooves run
// tighter toward the label), and the ink fades with distance so the texture
// stays subliminal at the edge of the viewport.

const EARTH_M_PER_DEG_LAT = 111320;

function ring(center: LngLat, radiusM: number): LngLat[] {
  const kLng = Math.cos((center[1] * Math.PI) / 180) || 1e-6;
  const dLat = radiusM / EARTH_M_PER_DEG_LAT;
  const dLng = radiusM / (EARTH_M_PER_DEG_LAT * kLng);
  // enough points that big rings stay round, small rings stay cheap
  const steps = Math.max(48, Math.min(144, Math.round(radiusM / 250)));
  const out: LngLat[] = [];
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    out.push([center[0] + Math.cos(a) * dLng, center[1] + Math.sin(a) * dLat]);
  }
  return out;
}

export interface GrooveOptions {
  rings: number;
  /** spacing of the innermost pair of rings, meters */
  startSpacingM: number;
  /** per-ring spacing multiplier (>1 = denser toward center) */
  growth: number;
  /** ink opacity at the center ring, fading to ~55% of this at the edge */
  maxOpacity: number;
}

// Full-city pressing: covers the viewport at city zoom and keeps going far
// enough that panning doesn't fall off the record (~38km radius).
export const CITY_GROOVE: GrooveOptions = {
  rings: 80,
  startSpacingM: 120,
  growth: 1.03,
  maxOpacity: 0.08,
};

// A small pressing under each overview medallion — four records on a table.
export const PATCH_GROOVE: GrooveOptions = {
  rings: 14,
  startSpacingM: 2300,
  growth: 1.05,
  maxOpacity: 0.14,
};

/**
 * Groove rings around one or more centers. Each ring carries an `o`
 * opacity property so the layer can fade the ink outward with
 * `["get", "o"]`.
 */
export function grooveFeatures(
  centers: LngLat[],
  opts: GrooveOptions
): GeoJSON.FeatureCollection {
  const features: GeoJSON.Feature[] = [];
  for (const center of centers) {
    let radius = opts.startSpacingM;
    let spacing = opts.startSpacingM;
    for (let i = 0; i < opts.rings; i++) {
      const fade = 1 - (i / Math.max(1, opts.rings - 1)) * 0.45;
      features.push(
        lineFeature(ring(center, radius), { o: opts.maxOpacity * fade })
      );
      spacing *= opts.growth;
      radius += spacing;
    }
  }
  return featureCollection(features);
}
