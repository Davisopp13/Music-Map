"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { BASEMAP_STYLE } from "@/lib/basemap";
import { PIN_TYPES } from "@/lib/pin-types";
import type { City, Location, TrailStop } from "@/lib/types";

interface CityMapProps {
  city: City;
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDeselect: () => void;
  trailStops: TrailStop[] | null;
}

export default function CityMap({
  city,
  locations,
  selectedId,
  onSelect,
  onDeselect,
  trailStops,
}: CityMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const onSelectRef = useRef(onSelect);
  const onDeselectRef = useRef(onDeselect);

  useEffect(() => {
    onSelectRef.current = onSelect;
    onDeselectRef.current = onDeselect;
  });

  // Marker DOM nodes, available once the map has mounted; portal targets.
  const [markerEls, setMarkerEls] = useState<Map<string, HTMLDivElement> | null>(
    null
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: BASEMAP_STYLE,
      center: [city.center_lng, city.center_lat],
      zoom: city.default_zoom,
      attributionControl: { compact: true },
    });
    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );
    map.on("click", () => onDeselectRef.current());
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
      map.remove();
      mapRef.current = null;
    };
    // city + locations are immutable for the life of the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fly to the selected pin, nudging it clear of the story card.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    const loc = locations.find((l) => l.id === selectedId);
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
  }, [selectedId, locations]);

  const stopNumberByLocation = useMemo(() => {
    if (!trailStops) return null;
    return new Map(trailStops.map((s) => [s.location_id, s.stop_order]));
  }, [trailStops]);

  return (
    <div className="absolute inset-0">
      <div ref={containerRef} className="h-full w-full" />
      {markerEls &&
        locations.map((loc) => {
          const el = markerEls.get(loc.id);
          if (!el) return null;
          const stopNumber = stopNumberByLocation?.get(loc.id) ?? null;
          return createPortal(
            <PinMarker
              location={loc}
              selected={loc.id === selectedId}
              stopNumber={stopNumber}
              dimmed={stopNumberByLocation !== null && stopNumber === null}
            />,
            el,
            loc.id
          );
        })}
    </div>
  );
}

function PinMarker({
  location,
  selected,
  stopNumber,
  dimmed,
}: {
  location: Location;
  selected: boolean;
  stopNumber: number | null;
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
      {location.is_orbit && (
        <span
          className="absolute -inset-[7px] rounded-full border-2 border-dashed"
          style={{ borderColor: cfg.color }}
        />
      )}
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 shadow-[0_2px_6px_rgba(43,38,32,0.4)]"
        style={{
          background: cfg.color,
          borderColor: selected ? "#2b2620" : "#faf5ea",
        }}
      >
        <Icon size={18} color="#faf5ea" strokeWidth={2.2} />
      </div>
      {stopNumber !== null && (
        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-paper bg-foreground text-[11px] font-bold leading-none text-paper">
          {stopNumber}
        </span>
      )}
    </div>
  );
}
