import type {
  DataDrivenPropertyValueSpecification,
  StyleSpecification,
} from "maplibre-gl";

// ---------------------------------------------------------------------------
// The worn-atlas basemap: a fully custom MapLibre style over OpenFreeMap
// vector tiles (free, no token). Authored, not tinted — every layer below is
// ours. The design language is "1948 show poster meets travel journal":
// cream paper land, faded-ink water, roads drawn as sepia pen strokes
// (major roads pressed harder), and letterpress place labels set in the
// same wood-type voice as the Hatch Show Print pins.
//
// Fonts are self-hosted glyph PBFs in public/glyphs/ — regenerate with
// `node scripts/build-glyphs.mjs` (see scripts/fonts/ for the OFL sources).
// ---------------------------------------------------------------------------

// Ink & paper palette
const PAPER = "#f4eee1"; // land
const PAPER_SHADE = "#ece4d2"; // built-up landuse, barely there
const WATER = "#aebfba"; // faded ink blue-gray
const WATER_SHORE = "#8fa39d"; // shoreline pen stroke
const WATER_INK = "#5f7a75"; // water labels
const SAGE = "#dee4cd"; // parks / woods, barely-there
const INK = "#3a332a"; // strongest label ink
const INK_MID = "#564b3d";
const INK_SOFT = "#6d6258";
const INK_FADED = "#a4977e"; // big tracked-out state names, like a watermark
const ROAD_MAJOR = "#8d7659"; // pressed harder with the pen
const ROAD_MID = "#a8957a";
const ROAD_MINOR = "#c3b399";
const ROAD_LABEL = "#857358";
const BOUNDARY = "#94846a";
const BUILDING = "#e7ddc6";

// Letterpress stacks (must match directory names under public/glyphs/)
const DISPLAY = ["Oswald SemiBold"]; // wood-type: cities, towns
const DISPLAY_SOFT = ["Oswald Medium"]; // neighborhoods, states
const ATLAS_ITALIC = ["Lora Medium Italic"]; // water, like an old atlas
const ATLAS_TEXT = ["Lora Medium"]; // street labels, quiet

// Tiles carry name / name:latin / name:en — prefer latin so every label is
// coverable by our self-hosted glyph ranges.
const NAME: DataDrivenPropertyValueSpecification<string> = [
  "coalesce",
  ["get", "name:latin"],
  ["get", "name:en"],
  ["get", "name"],
];

export function basemapStyle(): StyleSpecification {
  // Inline styles have no base URL to resolve against, so the glyph
  // template must be absolute. Both maps are client components that build
  // the map in useEffect — window is always there.
  const origin = typeof window === "undefined" ? "" : window.location.origin;

  return {
    version: 8,
    glyphs: `${origin}/glyphs/{fontstack}/{range}.pbf`,
    sources: {
      openmaptiles: {
        type: "vector",
        url: "https://tiles.openfreemap.org/planet",
        attribution:
          '<a href="https://openfreemap.org">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/">OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      },
    },
    layers: [
      { id: "background", type: "background", paint: { "background-color": PAPER } },

      // --- ground washes -------------------------------------------------
      {
        id: "landcover-wood",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        filter: ["in", ["get", "class"], ["literal", ["wood", "forest"]]],
        paint: { "fill-color": SAGE, "fill-opacity": 0.5, "fill-antialias": false },
      },
      {
        id: "landcover-grass",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landcover",
        filter: ["in", ["get", "class"], ["literal", ["grass", "grassland", "meadow", "scrub"]]],
        paint: { "fill-color": SAGE, "fill-opacity": 0.32, "fill-antialias": false },
      },
      {
        id: "park",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "park",
        paint: { "fill-color": SAGE, "fill-opacity": 0.4, "fill-antialias": false },
      },
      {
        id: "landuse-quiet",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landuse",
        filter: [
          "in",
          ["get", "class"],
          ["literal", ["cemetery", "stadium", "pitch", "playground", "track"]],
        ],
        paint: { "fill-color": SAGE, "fill-opacity": 0.3 },
      },
      {
        id: "landuse-built",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "landuse",
        filter: [
          "in",
          ["get", "class"],
          ["literal", ["commercial", "industrial", "retail", "hospital", "university", "college", "school"]],
        ],
        paint: { "fill-color": PAPER_SHADE, "fill-opacity": 0.45 },
      },

      // --- water ----------------------------------------------------------
      {
        id: "water",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "water",
        filter: ["!=", ["get", "brunnel"], "tunnel"],
        paint: { "fill-color": WATER },
      },
      {
        id: "water-shoreline",
        type: "line",
        source: "openmaptiles",
        "source-layer": "water",
        minzoom: 9,
        filter: ["!=", ["get", "brunnel"], "tunnel"],
        paint: {
          "line-color": WATER_SHORE,
          "line-width": ["interpolate", ["linear"], ["zoom"], 9, 0.4, 15, 1],
          "line-opacity": 0.6,
        },
      },
      {
        id: "waterway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "waterway",
        paint: {
          "line-color": WATER,
          "line-width": [
            "interpolate", ["exponential", 1.4], ["zoom"],
            8, ["match", ["get", "class"], "river", 0.9, 0.4],
            16, ["match", ["get", "class"], "river", 4, 1.6],
          ],
        },
      },

      // --- buildings: near-invisible hatch at deep zoom only --------------
      {
        id: "building",
        type: "fill",
        source: "openmaptiles",
        "source-layer": "building",
        minzoom: 15,
        paint: {
          "fill-color": BUILDING,
          "fill-opacity": ["interpolate", ["linear"], ["zoom"], 15, 0, 16.5, 0.4],
          "fill-antialias": false,
        },
      },

      // --- roads: faded ink pen strokes, no casings, no white -------------
      {
        id: "aeroway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "aeroway",
        minzoom: 11,
        filter: ["in", ["get", "class"], ["literal", ["runway", "taxiway"]]],
        paint: {
          "line-color": ROAD_MINOR,
          "line-width": ["interpolate", ["linear"], ["zoom"], 11, 1, 16, 6],
          "line-opacity": 0.6,
        },
      },
      {
        id: "road-path",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 14,
        filter: ["in", ["get", "class"], ["literal", ["path", "track"]]],
        paint: {
          "line-color": ROAD_MINOR,
          "line-width": ["interpolate", ["linear"], ["zoom"], 14, 0.4, 17, 1.2],
          "line-dasharray": [2, 2],
          "line-opacity": 0.8,
        },
      },
      {
        id: "road-minor",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 12,
        filter: ["in", ["get", "class"], ["literal", ["minor", "service"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": ROAD_MINOR,
          "line-width": [
            "interpolate", ["exponential", 1.5], ["zoom"],
            12, ["match", ["get", "class"], "service", 0.2, 0.45],
            16, ["match", ["get", "class"], "service", 1, 2],
          ],
          "line-opacity": ["interpolate", ["linear"], ["zoom"], 12, 0.5, 14, 1],
        },
      },
      {
        id: "road-secondary",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 9,
        filter: ["in", ["get", "class"], ["literal", ["secondary", "tertiary"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": ROAD_MID,
          "line-width": [
            "interpolate", ["exponential", 1.5], ["zoom"],
            9, 0.5, 13, 1.4, 16, 3,
          ],
        },
      },
      {
        id: "road-primary",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 7,
        filter: ["in", ["get", "class"], ["literal", ["primary", "trunk"]]],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": ROAD_MAJOR,
          "line-width": [
            "interpolate", ["exponential", 1.5], ["zoom"],
            7, 0.6, 12, 1.8, 16, 4,
          ],
        },
      },
      {
        id: "road-motorway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 5,
        filter: ["==", ["get", "class"], "motorway"],
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": ROAD_MAJOR,
          "line-width": [
            "interpolate", ["exponential", 1.5], ["zoom"],
            5, 0.5, 8, 1, 12, 2.4, 16, 5,
          ],
        },
      },
      {
        id: "railway",
        type: "line",
        source: "openmaptiles",
        "source-layer": "transportation",
        minzoom: 10,
        filter: ["==", ["get", "class"], "rail"],
        paint: {
          "line-color": ROAD_MID,
          "line-width": ["interpolate", ["linear"], ["zoom"], 10, 0.6, 16, 1.4],
          "line-dasharray": [3, 3],
          "line-opacity": 0.7,
        },
      },

      // --- boundaries: surveyor's dashes ----------------------------------
      {
        id: "boundary-state",
        type: "line",
        source: "openmaptiles",
        "source-layer": "boundary",
        filter: [
          "all",
          ["==", ["get", "admin_level"], 4],
          ["!=", ["get", "maritime"], 1],
        ],
        paint: {
          "line-color": BOUNDARY,
          "line-width": ["interpolate", ["linear"], ["zoom"], 3, 0.6, 10, 1.4],
          "line-dasharray": [4, 2, 1, 2],
          "line-opacity": 0.7,
        },
      },
      {
        id: "boundary-country",
        type: "line",
        source: "openmaptiles",
        "source-layer": "boundary",
        filter: [
          "all",
          ["==", ["get", "admin_level"], 2],
          ["!=", ["get", "maritime"], 1],
        ],
        paint: {
          "line-color": BOUNDARY,
          "line-width": ["interpolate", ["linear"], ["zoom"], 3, 1, 10, 2],
          "line-opacity": 0.8,
        },
      },

      // --- labels ----------------------------------------------------------
      // Street names: small, quiet, sepia — a travel journal's marginalia.
      {
        id: "label-street",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "transportation_name",
        minzoom: 13,
        filter: [
          "in",
          ["get", "class"],
          ["literal", ["motorway", "trunk", "primary", "secondary", "tertiary", "minor"]],
        ],
        layout: {
          "symbol-placement": "line",
          "text-field": NAME,
          "text-font": ATLAS_TEXT,
          "text-size": ["interpolate", ["linear"], ["zoom"], 13, 9.5, 17, 12],
          "text-letter-spacing": 0.04,
          "text-max-angle": 30,
        },
        paint: {
          "text-color": ROAD_LABEL,
          "text-halo-color": PAPER,
          "text-halo-width": 1,
        },
      },
      // Rivers: serif italic flowing along the line, like an old atlas.
      {
        id: "label-waterway",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "waterway",
        minzoom: 10,
        filter: ["==", ["get", "class"], "river"],
        layout: {
          "symbol-placement": "line",
          "text-field": NAME,
          "text-font": ATLAS_ITALIC,
          "text-size": ["interpolate", ["linear"], ["zoom"], 10, 10.5, 16, 13],
          "text-letter-spacing": 0.08,
          "text-max-angle": 30,
        },
        paint: {
          "text-color": WATER_INK,
          "text-halo-color": PAPER,
          "text-halo-width": 0.8,
        },
      },
      {
        id: "label-water",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "water_name",
        layout: {
          "text-field": NAME,
          "text-font": ATLAS_ITALIC,
          "text-size": ["match", ["get", "class"], "ocean", 15, 11.5],
          "text-letter-spacing": 0.12,
        },
        paint: {
          "text-color": WATER_INK,
          "text-halo-color": PAPER,
          "text-halo-width": 0.8,
        },
      },
      // Neighborhoods: the letterpress whisper under our pins.
      {
        id: "label-neighbourhood",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 11.5,
        filter: ["in", ["get", "class"], ["literal", ["suburb", "quarter", "neighbourhood", "hamlet"]]],
        layout: {
          "text-field": NAME,
          "text-font": DISPLAY_SOFT,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.28,
          "text-size": ["interpolate", ["linear"], ["zoom"], 11.5, 10, 15, 12.5],
          "text-padding": 6,
        },
        paint: {
          "text-color": INK_SOFT,
          "text-halo-color": PAPER,
          "text-halo-width": 1.2,
          "text-opacity": 0.85,
        },
      },
      {
        id: "label-village",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 10,
        filter: ["==", ["get", "class"], "village"],
        layout: {
          "text-field": NAME,
          "text-font": DISPLAY_SOFT,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.2,
          "text-size": ["interpolate", ["linear"], ["zoom"], 10, 10.5, 14, 13],
          "text-padding": 4,
        },
        paint: {
          "text-color": INK_MID,
          "text-halo-color": PAPER,
          "text-halo-width": 1.2,
        },
      },
      {
        id: "label-town",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 7,
        filter: ["==", ["get", "class"], "town"],
        layout: {
          "text-field": NAME,
          "text-font": DISPLAY,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.16,
          "text-size": ["interpolate", ["linear"], ["zoom"], 7, 10.5, 12, 14],
          "text-padding": 4,
        },
        paint: {
          "text-color": INK_MID,
          "text-halo-color": PAPER,
          "text-halo-width": 1.3,
        },
      },
      // Cities: the headline act — wood type, tracked out, ink-stamped.
      {
        id: "label-city",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 4,
        filter: ["==", ["get", "class"], "city"],
        layout: {
          "text-field": NAME,
          "text-font": DISPLAY,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.18,
          "text-size": [
            "interpolate", ["linear"], ["zoom"],
            4, ["case", ["<=", ["coalesce", ["get", "rank"], 10], 4], 12, 10.5],
            8, ["case", ["<=", ["coalesce", ["get", "rank"], 10], 4], 16, 13],
            12, 19,
          ],
          "text-padding": 4,
          "symbol-sort-key": ["coalesce", ["get", "rank"], 10],
        },
        paint: {
          "text-color": INK,
          "text-halo-color": PAPER,
          "text-halo-width": 1.4,
        },
      },
      // States: huge, faded, tracked way out — printed into the paper.
      {
        id: "label-state",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 3,
        maxzoom: 9,
        filter: ["==", ["get", "class"], "state"],
        layout: {
          "text-field": NAME,
          "text-font": DISPLAY_SOFT,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.45,
          "text-size": ["interpolate", ["linear"], ["zoom"], 3, 10, 6, 15, 8, 18],
          "text-padding": 10,
        },
        paint: {
          "text-color": INK_FADED,
          "text-halo-color": PAPER,
          "text-halo-width": 0.8,
          "text-opacity": ["interpolate", ["linear"], ["zoom"], 7.5, 1, 8.5, 0],
        },
      },
      {
        id: "label-country",
        type: "symbol",
        source: "openmaptiles",
        "source-layer": "place",
        minzoom: 2,
        maxzoom: 6,
        filter: ["==", ["get", "class"], "country"],
        layout: {
          "text-field": NAME,
          "text-font": DISPLAY_SOFT,
          "text-transform": "uppercase",
          "text-letter-spacing": 0.4,
          "text-size": ["interpolate", ["linear"], ["zoom"], 2, 11, 5, 16],
        },
        paint: {
          "text-color": INK_FADED,
          "text-halo-color": PAPER,
          "text-halo-width": 1,
        },
      },
    ],
  };
}
