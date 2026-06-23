"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { basemapStyle } from "@/lib/basemap";
import {
  animateDashes,
  featureCollection,
  hashSeed,
  inkLine,
  lineFeature,
  prefersReducedMotion,
  STATIC_DASH,
  type LngLat,
} from "@/lib/ink-lines";
import { CITY_GROOVE, grooveFeatures } from "@/lib/grooves";
import CompassRose from "./CompassRose";
import { PIN_TYPES } from "@/lib/pin-types";
import type {
  City,
  Connection,
  District,
  Location,
  TrailStop,
} from "@/lib/types";

const INK_TRAIL = "#473a2b";
const INK_THREAD = "#6b4e36";
// faded mustard, the gig-poster's second ink — district stamps
const INK_MUSTARD = "#9c7820";

const EMPTY_FC = featureCollection([]);

interface CityMapProps {
  city: City;
  locations: Location[];
  connections: Connection[];
  districts: District[];
  cities: City[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDeselect: () => void;
  onThreadClick: (connectionId: string) => void;
  ripplingId: string | null; // pin whose Spotify embed the user engaged
  trailStops: TrailStop[] | null;
  trailStopIndex: number;
  handoffCity: City | null;
  onHandoffComplete: () => void;
}

interface EdgeChip {
  connId: string;
  label: string;
  x: number;
  y: number;
}

export default function CityMap({
  city,
  locations,
  connections,
  districts,
  cities,
  selectedId,
  onSelect,
  onDeselect,
  onThreadClick,
  ripplingId,
  trailStops,
  trailStopIndex,
  handoffCity,
  onHandoffComplete,
}: CityMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const onSelectRef = useRef(onSelect);
  const onDeselectRef = useRef(onDeselect);
  const onThreadClickRef = useRef(onThreadClick);
  const onHandoffCompleteRef = useRef(onHandoffComplete);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onDeselectRef.current = onDeselect;
    onThreadClickRef.current = onThreadClick;
    onHandoffCompleteRef.current = onHandoffComplete;
  });

  // Marker DOM nodes, available once the map has mounted; portal targets.
  const [markerEls, setMarkerEls] = useState<Map<string, HTMLDivElement> | null>(
    null
  );
  // Map style finished loading — sources/layers exist, data effects may run.
  const [mapReady, setMapReady] = useState(false);
  // Inter-city thread labels pinned to the viewport edge ("→ Bristol").
  const [edgeChips, setEdgeChips] = useState<EdgeChip[]>([]);

  const locationById = useMemo(
    () => new Map(locations.map((l) => [l.id, l])),
    [locations]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: basemapStyle(),
      center: [city.center_lng, city.center_lat],
      zoom: city.default_zoom,
      attributionControl: { compact: true },
    });
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );
    map.on("click", (e) => {
      // a tap on a stitched thread opens its note, not a deselect
      if (mapRef.current === map && safeHasLayer(map, "threads-hit")) {
        const hits = map.queryRenderedFeatures(e.point, {
          layers: ["threads-hit"],
        });
        if (hits.length > 0) {
          onThreadClickRef.current(String(hits[0].properties?.connId));
          return;
        }
      }
      onDeselectRef.current();
    });
    map.on("load", () => {
      // The groove: the whole city pressed into a record. Real geometry
      // centered on the city, under the roads — subliminal until noticed.
      map.addSource("grooves", {
        type: "geojson",
        data: grooveFeatures([[city.center_lng, city.center_lat]], CITY_GROOVE),
      });
      map.addLayer(
        {
          id: "grooves",
          type: "line",
          source: "grooves",
          paint: {
            "line-color": "#6b5a40",
            "line-width": 1,
            "line-opacity": ["get", "o"],
          },
        },
        "building"
      );

      // District watercolors: soft washes under the roads. The blurred
      // wide outline is what sells the wet-paint edge — a crisp polygon
      // would read as data, not pigment.
      if (districts.length > 0) {
        map.addSource("districts", {
          type: "geojson",
          data: featureCollection(
            districts.map((d) => ({
              type: "Feature" as const,
              properties: { color: d.color, name: d.name },
              geometry: d.geojson,
            }))
          ),
        });
        const beforeId = map.getLayer("building") ? "building" : undefined;
        map.addLayer(
          {
            id: "districts-wash",
            type: "fill",
            source: "districts",
            paint: {
              "fill-color": ["get", "color"],
              "fill-opacity": 0.22,
              "fill-antialias": false,
            },
          },
          beforeId
        );
        map.addLayer(
          {
            id: "districts-bleed",
            type: "line",
            source: "districts",
            paint: {
              "line-color": ["get", "color"],
              "line-width": 14,
              "line-blur": 12,
              "line-opacity": 0.26,
            },
          },
          beforeId
        );
        // District names stamped in wood type — sections of the gig poster.
        // Added last so they win symbol collisions against basemap labels.
        map.addSource("district-labels", {
          type: "geojson",
          data: featureCollection(
            districts.map((d) => {
              // centroid of the outer ring (good enough for these blobs)
              const ring = d.geojson.coordinates[0].slice(0, -1);
              const [cx, cy] = ring
                .reduce(([x, y], [px, py]) => [x + px, y + py], [0, 0])
                .map((v) => v / ring.length);
              return {
                type: "Feature" as const,
                properties: { name: d.name },
                geometry: { type: "Point" as const, coordinates: [cx, cy] },
              };
            })
          ),
        });
        map.addLayer({
          id: "district-labels",
          type: "symbol",
          source: "district-labels",
          minzoom: 11.2,
          layout: {
            "text-field": ["get", "name"],
            "text-font": ["Oswald SemiBold"],
            "text-transform": "uppercase",
            "text-letter-spacing": 0.3,
            "text-size": ["interpolate", ["linear"], ["zoom"], 11.2, 12, 14.5, 19],
            "text-padding": 8,
          },
          paint: {
            "text-color": INK_MUSTARD,
            "text-halo-color": "#f4eee1",
            "text-halo-width": 1.1,
            "text-opacity": 0.95,
          },
        });
      }

      // Trail route: a musical staff — five thin ink lines sharing one
      // sketched path, revealed stop by stop. All five layers read from the
      // same source, so the draw/retract animation moves the whole staff.
      // Zoomed way out the outer lines fade and the middle line fattens
      // back into the single pen stroke (legibility beats cleverness).
      map.addSource("trail-route", { type: "geojson", data: EMPTY_FC });
      for (const k of [-2, -1, 0, 1, 2]) {
        map.addLayer({
          id: `trail-staff-${k + 2}`,
          type: "line",
          source: "trail-route",
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": INK_TRAIL,
            "line-width":
              k === 0
                ? ["interpolate", ["linear"], ["zoom"], 10.5, 2.4, 12, 0.9]
                : 0.9,
            "line-opacity":
              k === 0
                ? 0.85
                : ["interpolate", ["linear"], ["zoom"], 11, 0, 11.8, 0.8],
            "line-offset": [
              "interpolate", ["linear"], ["zoom"],
              11, 0, 12, k * 1.7, 16, k * 2.4,
            ],
          },
        });
      }
      // Story threads: stitches that flow from the open pin outward.
      map.addSource("threads", { type: "geojson", data: EMPTY_FC });
      map.addLayer({
        id: "threads-line",
        type: "line",
        source: "threads",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": INK_THREAD,
          "line-width": 2,
          "line-opacity": 0.75,
          "line-dasharray": STATIC_DASH,
        },
      });
      // generous invisible hit area for fingers
      map.addLayer({
        id: "threads-hit",
        type: "line",
        source: "threads",
        paint: { "line-width": 20, "line-opacity": 0 },
      });
      map.on("mouseenter", "threads-hit", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "threads-hit", () => {
        map.getCanvas().style.cursor = "";
      });
      setMapReady(true);
    });
    mapRef.current = map;

    // Frame the walking cluster (orbit pins are off-map by design; the
    // trail flies out to them).
    const walking = locations.filter((l) => !l.is_orbit);
    if (walking.length > 1) {
      const bounds = new maplibregl.LngLatBounds();
      for (const l of walking) bounds.extend([l.lng, l.lat]);
      map.fitBounds(bounds, {
        padding: { top: 120, bottom: 110, left: 48, right: 48 },
        maxZoom: city.default_zoom,
        duration: 0,
      });
    }

    const els = new Map<string, HTMLDivElement>();
    for (const loc of locations) {
      const el = document.createElement("div");
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectRef.current(loc.id);
      });
      new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map);
      els.set(loc.id, el);
    }
    setMarkerEls(els);

    return () => {
      setMarkerEls(null);
      setMapReady(false);
      setEdgeChips([]);
      if (mapRef.current === map) mapRef.current = null;
      map.remove();
    };
    // city + locations are immutable for the life of the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to the selected pin, nudging it clear of the story card.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    const loc = locationById.get(selectedId);
    if (!loc) return;

    const isDesktop = window.innerWidth >= 768;
    map.flyTo({
      center: [loc.lng, loc.lat],
      zoom: Math.max(map.getZoom(), 14),
      // Mobile: card sheet covers the lower half, lift the pin above it.
      // Desktop: card panel sits on the right, push the pin left of it.
      offset: isDesktop ? [-180, 0] : [0, -Math.round(window.innerHeight * 0.18)],
      speed: 1.4,
    });
  }, [selectedId, locationById]);

  useEffect(() => {
    const map = mapRef.current;
    if (!handoffCity) return;
    if (!map || prefersReducedMotion()) {
      onHandoffCompleteRef.current();
      return;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onHandoffCompleteRef.current();
    };
    const timer = window.setTimeout(finish, 1800);

    map.once("moveend", finish);
    map.flyTo({
      center: [handoffCity.center_lng, handoffCity.center_lat],
      zoom: 6.4,
      speed: 1.35,
      curve: 1.25,
      essential: true,
    });

    return () => {
      window.clearTimeout(timer);
      map.off("moveend", finish);
    };
  }, [handoffCity]);

  // ---- trail route: draws itself as the user advances -------------------

  // One sketched polyline per consecutive stop pair, computed once.
  const trailSegments = useMemo(() => {
    if (!trailStops) return null;
    const segs: LngLat[][] = [];
    for (let i = 0; i < trailStops.length - 1; i++) {
      const a = locationById.get(trailStops[i].location_id);
      const b = locationById.get(trailStops[i + 1].location_id);
      if (!a || !b) continue;
      segs.push(
        inkLine([a.lng, a.lat], [b.lng, b.lat], {
          bow: 0.07,
          jitter: 0.014,
          steps: 22,
          seed: hashSeed(`${trailStops[i].id}:${trailStops[i + 1].id}`),
        })
      );
    }
    return segs;
  }, [trailStops, locationById]);

  const trailProgressRef = useRef(0); // float stop index currently drawn
  const trailRafRef = useRef(0);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const source = map.getSource<maplibregl.GeoJSONSource>("trail-route");
    if (!source) return;
    let cancelled = false;

    if (!trailSegments) {
      trailProgressRef.current = 0;
      source.setData(EMPTY_FC);
      return;
    }

    const coordsUpTo = (p: number): LngLat[] => {
      const coords: LngLat[] = [];
      const whole = Math.min(Math.floor(p), trailSegments.length);
      for (let i = 0; i < whole; i++) coords.push(...trailSegments[i]);
      const frac = p - whole;
      if (frac > 0 && whole < trailSegments.length) {
        const seg = trailSegments[whole];
        const n = Math.floor(frac * (seg.length - 1));
        coords.push(...seg.slice(0, n + 1));
        const t = frac * (seg.length - 1) - n;
        if (t > 0 && n + 1 < seg.length) {
          const [x0, y0] = seg[n];
          const [x1, y1] = seg[n + 1];
          coords.push([x0 + (x1 - x0) * t, y0 + (y1 - y0) * t]);
        }
      }
      return coords;
    };

    const render = (p: number) => {
      if (cancelled || mapRef.current !== map) return;
      const coords = coordsUpTo(p);
      source.setData(
        coords.length > 1 ? featureCollection([lineFeature(coords)]) : EMPTY_FC
      );
    };

    const target = Math.min(trailStopIndex, trailSegments.length);
    const from = trailProgressRef.current;
    if (target === from) {
      render(target);
      return;
    }
    if (prefersReducedMotion()) {
      trailProgressRef.current = target;
      render(target);
      return;
    }

    const duration = Math.min(1400, 800 * Math.abs(target - from));
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const ease = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      const p = from + (target - from) * ease;
      trailProgressRef.current = p;
      render(p);
      if (t < 1) trailRafRef.current = requestAnimationFrame(tick);
    };
    trailRafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(trailRafRef.current);
    };
  }, [trailSegments, trailStopIndex, mapReady]);

  // ---- story threads: stitched lines from the open pin ------------------

  const selectedThreads = useMemo(() => {
    if (!selectedId) return [];
    return connections
      .filter((c) => c.from.id === selectedId || c.to.id === selectedId)
      .map((c) => {
        const origin = c.from.id === selectedId ? c.from : c.to;
        const other = c.from.id === selectedId ? c.to : c.from;
        return { conn: c, origin, other, sameCity: other.city_id === city.id };
      });
  }, [connections, selectedId, city.id]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;
    const source = map.getSource<maplibregl.GeoJSONSource>("threads");
    if (!source) return;

    // Lines always start at the open pin so the dashes flow outward.
    source.setData(
      selectedThreads.length === 0
        ? EMPTY_FC
        : featureCollection(
            selectedThreads.map(({ conn, origin, other, sameCity }) =>
              lineFeature(
                inkLine([origin.lng, origin.lat], [other.lng, other.lat], {
                  bow: sameCity ? 0.16 : 0.05,
                  jitter: sameCity ? 0.015 : 0.006,
                  steps: sameCity ? 24 : 48,
                  seed: hashSeed(conn.id),
                }),
                { connId: conn.id }
              )
            )
          )
    );
    const stopDashes =
      selectedThreads.length > 0 ? animateDashes(map, "threads-line") : null;

    // Inter-city threads get a chip where the line leaves the viewport.
    const interCity = selectedThreads.filter((t) => !t.sameCity);
    const cityName = (cityId: string) =>
      cities.find((c) => c.id === cityId)?.name;
    const updateChips = () => {
      if (interCity.length === 0) {
        setEdgeChips((cur) => (cur.length === 0 ? cur : []));
        return;
      }
      const w = map.getContainer().clientWidth;
      const h = map.getContainer().clientHeight;
      const isDesktop = window.innerWidth >= 768;
      const xMin = 60,
        xMax = w - (isDesktop ? 460 : 60), // clear the desktop story card
        yMin = 100,
        yMax = h - 120; // clear masthead / trail bar
      setEdgeChips(
        interCity.map(({ conn, origin, other }) => {
          const p0 = map.project([origin.lng, origin.lat]);
          const p1 = map.project([other.lng, other.lat]);
          const dx = p1.x - p0.x,
            dy = p1.y - p0.y;
          let t = 1;
          if (dx > 0) t = Math.min(t, (xMax - p0.x) / dx);
          else if (dx < 0) t = Math.min(t, (xMin - p0.x) / dx);
          if (dy > 0) t = Math.min(t, (yMax - p0.y) / dy);
          else if (dy < 0) t = Math.min(t, (yMin - p0.y) / dy);
          t = Math.max(0.1, t);
          const x = Math.min(xMax, Math.max(xMin, p0.x + dx * t));
          const y = Math.min(yMax, Math.max(yMin, p0.y + dy * t));
          return {
            connId: conn.id,
            label: cityName(other.city_id) ?? other.name,
            x,
            y,
          };
        })
      );
    };
    // initial placement deferred a frame: chip positions come from the map,
    // not React, so this isn't render-derived state
    const raf = requestAnimationFrame(updateChips);
    map.on("move", updateChips);

    return () => {
      cancelAnimationFrame(raf);
      stopDashes?.();
      if (mapRef.current !== map) return;
      map.off("move", updateChips);
      if (safeHasLayer(map, "threads-line"))
        map.setPaintProperty("threads-line", "line-dasharray", STATIC_DASH);
    };
  }, [selectedThreads, mapReady, cities]);

  const stopNumberByLocation = useMemo(() => {
    if (!trailStops) return null;
    return new Map(trailStops.map((s) => [s.location_id, s.stop_order]));
  }, [trailStops]);

  const currentStopLocationId = trailStops?.[trailStopIndex]?.location_id ?? null;

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      <CompassRose className="pointer-events-none absolute right-3 top-[max(0.9rem,env(safe-area-inset-top))] z-10 opacity-80" />
      {markerEls &&
        locations.map((loc) => {
          const el = markerEls.get(loc.id);
          if (!el) return null;
          const stopNumber = stopNumberByLocation?.get(loc.id) ?? null;
          return createPortal(
            <PinMarker
              location={loc}
              selected={loc.id === selectedId}
              rippling={loc.id === ripplingId}
              stopNumber={stopNumber}
              currentStop={loc.id === currentStopLocationId}
              dimmed={stopNumberByLocation !== null && stopNumber === null}
            />,
            el,
            loc.id
          );
        })}
      {edgeChips.map((chip) => (
        <button
          key={chip.connId}
          onClick={() => onThreadClick(chip.connId)}
          className="absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-foreground/50 bg-paper px-3 py-1.5 font-display text-[12px] font-semibold tracking-wide text-foreground shadow-[0_2px_10px_rgba(43,38,32,0.3)] transition-transform hover:scale-105"
          style={{ left: chip.x, top: chip.y }}
        >
          → {chip.label}
        </button>
      ))}
    </div>
  );
}

function safeHasLayer(map: maplibregl.Map, layerId: string) {
  try {
    return Boolean(map.getLayer(layerId));
  } catch {
    return false;
  }
}

function PinMarker({
  location,
  selected,
  rippling,
  stopNumber,
  currentStop,
  dimmed,
}: {
  location: Location;
  selected: boolean;
  rippling: boolean;
  stopNumber: number | null;
  currentStop: boolean;
  dimmed: boolean;
}) {
  const cfg = PIN_TYPES[location.pin_type];
  const Icon = cfg.icon;
  const rootRef = useRef<HTMLDivElement>(null);

  // Raise the selected pin above its neighbors. The z-index must live on
  // the MapLibre-positioned marker element, i.e. our portal's parent.
  useEffect(() => {
    const markerEl = rootRef.current?.parentElement;
    if (markerEl) markerEl.style.zIndex = selected ? "10" : "1";
  }, [selected]);

  return (
    <div
      ref={rootRef}
      className={`pin-marker relative transition-all duration-200 ${
        dimmed ? "opacity-35" : ""
      } ${selected ? "scale-110" : ""}`}
      title={location.name}
    >
      {/* Invisible tap target: the 38px pin alone is under the 44-48px
          touch minimum, so pad the hit area to 52px on touch screens. */}
      <span className="absolute hidden pointer-coarse:-inset-2 pointer-coarse:block" />
      {rippling && (
        // the needle is down — this place is sounding
        <span className="pointer-events-none absolute inset-0" aria-hidden>
          <span className="needle-ripple" />
          <span className="needle-ripple [animation-delay:1.33s]" />
          <span className="needle-ripple [animation-delay:2.66s]" />
        </span>
      )}
      {location.is_orbit && (
        // the dust sleeve: orbit pins ship in protective packaging
        <span
          className="absolute -inset-[7px] rounded-full border-2 border-dashed"
          style={{ borderColor: cfg.color }}
        />
      )}
      {/* A 45: dark vinyl, pressed grooves, the pin_type color as the
          center label. The open pin's record turns; while its track is
          actually sounding the spin gains a wobble — the spin IS the
          now-playing state. */}
      <div
        className={`record-45 flex h-[38px] w-[38px] items-center justify-center rounded-full border-2 shadow-[0_2px_6px_rgba(43,38,32,0.4)] ${
          selected ? "record-spinning" : ""
        } ${rippling ? "record-sounding" : ""}`}
        style={{ borderColor: selected ? "#2b2620" : "#faf5ea" }}
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full"
          style={{ background: cfg.color }}
        >
          <Icon size={11} color="#faf5ea" strokeWidth={2.6} />
        </span>
      </div>
      {stopNumber !== null && (
        // trail stops are note heads — filled, tilted, numbered; the
        // current stop sings in rust
        <span
          className={`absolute -right-2.5 -top-2 transition-transform duration-200 ${
            currentStop ? "scale-125" : ""
          }`}
        >
          <span
            className={`absolute -top-[7px] right-0 h-2.5 w-[2px] rounded-full ${
              currentStop ? "bg-accent-rust" : "bg-foreground"
            }`}
            aria-hidden
          />
          <span
            className={`flex h-[17px] w-[21px] -rotate-12 items-center justify-center rounded-[50%] border border-paper text-[11px] font-bold leading-none text-paper ${
              currentStop ? "bg-accent-rust" : "bg-foreground"
            }`}
          >
            {stopNumber}
          </span>
        </span>
      )}
    </div>
  );
}
