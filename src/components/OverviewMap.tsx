"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { basemapStyle } from "@/lib/basemap";
import {
  animateDashes,
  featureCollection,
  hashSeed,
  inkLine,
  lineFeature,
} from "@/lib/ink-lines";
import { grooveFeatures, PATCH_GROOVE } from "@/lib/grooves";
import { PIN_TYPES } from "@/lib/pin-types";
import CompassRose from "./CompassRose";
import type { City, Connection, Location } from "@/lib/types";

// Below this zoom the cover shows city medallions only; past it the
// nearby city's individual pins fade in so free-zooming feels continuous.
const PIN_FADE_ZOOM = 8.5;

interface OverviewMapProps {
  cities: City[];
  locations: Location[];
  connections: Connection[];
}

export default function OverviewMap({
  cities,
  locations,
  connections,
}: OverviewMapProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);

  // Marker DOM nodes, available once the map has mounted; portal targets.
  const [cityEls, setCityEls] = useState<Map<string, HTMLDivElement> | null>(
    null
  );
  const [pinEls, setPinEls] = useState<Map<string, HTMLDivElement> | null>(
    null
  );
  const [pinsVisible, setPinsVisible] = useState(false);

  const pinCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const l of locations)
      counts.set(l.city_id, (counts.get(l.city_id) ?? 0) + 1);
    return counts;
  }, [locations]);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: basemapStyle(),
      center: [cities[0]?.center_lng ?? -84, cities[0]?.center_lat ?? 35],
      zoom: 5,
      attributionControl: { compact: true },
    });
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );
    mapRef.current = map;

    // Frame every pin in the atlas — future cities stretch the cover on
    // their own. City centers are included as a guard for a city whose
    // pins haven't been seeded yet.
    const bounds = new maplibregl.LngLatBounds();
    for (const l of locations) bounds.extend([l.lng, l.lat]);
    for (const c of cities) bounds.extend([c.center_lng, c.center_lat]);
    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, {
        padding: { top: 150, bottom: 70, left: 70, right: 70 },
        maxZoom: 9,
        duration: 0,
      });
    }

    map.on("zoom", () => setPinsVisible(map.getZoom() >= PIN_FADE_ZOOM));

    // The long threads: gentle ink arcs between cities, dashes drifting
    // along them — the atlas's Indiana Jones moment.
    let stopArcDashes = () => {};
    map.on("load", () => {
      // Four records lying on a table: a small groove pressing under each
      // city medallion.
      map.addSource("grooves", {
        type: "geojson",
        data: grooveFeatures(
          cities.map((c) => [c.center_lng, c.center_lat]),
          PATCH_GROOVE
        ),
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

      const arcs = connections
        .filter((c) => c.from.city_id !== c.to.city_id)
        .map((c) =>
          lineFeature(
            inkLine([c.from.lng, c.from.lat], [c.to.lng, c.to.lat], {
              bow: 0.18,
              jitter: 0.004,
              steps: 64,
              seed: hashSeed(c.id),
            })
          )
        );
      if (arcs.length === 0) return;
      map.addSource("city-arcs", {
        type: "geojson",
        data: featureCollection(arcs),
      });
      map.addLayer({
        id: "city-arcs-line",
        type: "line",
        source: "city-arcs",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "#5a4633",
          "line-width": 1.8,
          "line-opacity": 0.55,
          "line-dasharray": [3, 4],
        },
      });
      stopArcDashes = animateDashes(map, "city-arcs-line", 2200);
    });

    const cEls = new Map<string, HTMLDivElement>();
    for (const c of cities) {
      const el = document.createElement("div");
      el.style.zIndex = "10"; // city medallions ride above pin dots
      new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([c.center_lng, c.center_lat])
        .addTo(map);
      cEls.set(c.id, el);
    }
    setCityEls(cEls);

    const pEls = new Map<string, HTMLDivElement>();
    for (const l of locations) {
      const el = document.createElement("div");
      el.style.pointerEvents = "none"; // dots are scenery, not buttons
      new maplibregl.Marker({ element: el, anchor: "center" })
        .setLngLat([l.lng, l.lat])
        .addTo(map);
      pEls.set(l.id, el);
    }
    setPinEls(pEls);

    return () => {
      stopArcDashes();
      setCityEls(null);
      setPinEls(null);
      map.remove();
      mapRef.current = null;
    };
    // cities + locations + connections are immutable for the life of the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Warm the city routes so the post-flyTo navigation doesn't stall.
  useEffect(() => {
    for (const c of cities) router.prefetch(`/${c.slug}`);
  }, [cities, router]);

  const enterCity = (city: City) => {
    const map = mapRef.current;
    if (!map) {
      router.push(`/${city.slug}`);
      return;
    }
    map.flyTo({
      center: [city.center_lng, city.center_lat],
      zoom: Math.max(map.getZoom(), 10.5),
      speed: 1.6,
    });
    map.once("moveend", () => router.push(`/${city.slug}`));
  };

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      <CompassRose className="pointer-events-none absolute right-3 top-[max(0.9rem,env(safe-area-inset-top))] z-10 opacity-80" />
      {pinEls &&
        locations.map((loc) => {
          const el = pinEls.get(loc.id);
          if (!el) return null;
          return createPortal(
            <OverviewPin location={loc} visible={pinsVisible} />,
            el,
            loc.id
          );
        })}
      {cityEls &&
        cities.map((c) => {
          const el = cityEls.get(c.id);
          if (!el) return null;
          return createPortal(
            <CityMarker
              city={c}
              pinCount={pinCounts.get(c.id) ?? 0}
              dimmed={pinsVisible}
              onEnter={() => enterCity(c)}
            />,
            el,
            c.id
          );
        })}
    </div>
  );
}

function CityMarker({
  city,
  pinCount,
  dimmed,
  onEnter,
}: {
  city: City;
  pinCount: number;
  dimmed: boolean;
  onEnter: () => void;
}) {
  return (
    <button
      onClick={onEnter}
      aria-label={`Open ${city.name}`}
      className={`flex min-h-11 flex-col items-center rounded-full border-2 border-foreground/80 bg-paper px-5 py-1.5 font-display shadow-[0_3px_12px_rgba(43,38,32,0.35)] transition-all duration-500 hover:scale-105 ${
        dimmed ? "opacity-75" : ""
      }`}
    >
      <span className="whitespace-nowrap text-[15px] font-semibold leading-tight">
        {city.name}
      </span>
      <span className="whitespace-nowrap text-[11px] tracking-wide text-ink-soft">
        {pinCount} {pinCount === 1 ? "pin" : "pins"}
      </span>
    </button>
  );
}

function OverviewPin({
  location,
  visible,
}: {
  location: Location;
  visible: boolean;
}) {
  const cfg = PIN_TYPES[location.pin_type];
  return (
    <span
      title={location.name}
      className={`block h-3.5 w-3.5 rounded-full border border-paper shadow-[0_1px_3px_rgba(43,38,32,0.4)] transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      // a 45 in miniature: colored label, vinyl rim
      style={{
        background: `radial-gradient(circle, ${cfg.color} 0 42%, #241f19 46%)`,
      }}
    />
  );
}
