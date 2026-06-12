"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { City, CityData } from "@/lib/types";
import CityMap from "./CityMap";
import StoryCard from "./StoryCard";
import TrailBar from "./TrailBar";

export default function CityExperience({
  data,
  cities,
}: {
  data: CityData;
  cities: City[];
}) {
  const { city, locations, trails } = data;
  const otherCities = cities.filter((c) => c.id !== city.id);
  const trail = trails[0] ?? null;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [trailActive, setTrailActive] = useState(false);
  const [stopIndex, setStopIndex] = useState(0);

  const locationById = useMemo(
    () => new Map(locations.map((l) => [l.id, l])),
    [locations]
  );

  const stops = useMemo(() => trail?.stops ?? [], [trail]);
  const currentStop = trailActive ? (stops[stopIndex] ?? null) : null;
  const selected = selectedId ? (locationById.get(selectedId) ?? null) : null;

  // The stop note only belongs on the card when the selected pin IS the
  // current stop — tapping a random pin mid-trail shows its plain story.
  const cardStop =
    currentStop && selected && currentStop.location_id === selected.id
      ? currentStop
      : null;

  // Plain functions: the React Compiler memoizes these automatically.
  const selectPin = (id: string) => {
    setSelectedId(id);
    if (trailActive) {
      const i = stops.findIndex((s) => s.location_id === id);
      if (i >= 0) setStopIndex(i);
    }
  };

  const goToStop = (i: number) => {
    const stop = stops[i];
    if (!stop) return;
    setStopIndex(i);
    setSelectedId(stop.location_id);
  };

  const startTrail = () => {
    setTrailActive(true);
    const first = stops[0];
    if (first) {
      setStopIndex(0);
      setSelectedId(first.location_id);
    }
  };

  const exitTrail = () => {
    setTrailActive(false);
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background">
      <CityMap
        city={city}
        locations={locations}
        selectedId={selectedId}
        onSelect={selectPin}
        onDeselect={() => setSelectedId(null)}
        trailStops={trailActive ? stops : null}
      />

      {/* Masthead */}
      <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 bg-gradient-to-b from-background/95 via-background/70 to-transparent px-4 pb-8 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <Link
          href="/"
          className="pointer-events-auto inline-block text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft transition-colors hover:text-foreground"
        >
          ← All cities
        </Link>
        <h1 className="font-display text-2xl font-semibold leading-tight">
          {city.name}
          {city.state && (
            <span className="ml-2 align-middle text-sm font-normal tracking-wide text-ink-soft">
              {city.state}
            </span>
          )}
        </h1>
        {otherCities.length > 0 && (
          <nav className="pointer-events-auto mt-1.5 flex flex-wrap gap-1.5">
            {otherCities.map((c) => (
              <Link
                key={c.id}
                href={`/${c.slug}`}
                className="rounded-full border border-paper-edge bg-paper/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink-soft shadow-sm transition-colors hover:text-foreground"
              >
                {c.name} {c.state} →
              </Link>
            ))}
          </nav>
        )}
      </header>

      {selected && (
        <StoryCard
          location={selected}
          city={city}
          stop={cardStop}
          stopCount={stops.length}
          trailName={trail?.name ?? null}
          raised={trailActive}
          onClose={() => setSelectedId(null)}
        />
      )}

      {trail && (
        <TrailBar
          trail={trail}
          active={trailActive}
          stopIndex={stopIndex}
          locationById={locationById}
          cardOpen={selected !== null}
          onStart={startTrail}
          onExit={exitTrail}
          onPrev={() => goToStop(stopIndex - 1)}
          onNext={() => goToStop(stopIndex + 1)}
        />
      )}
    </div>
  );
}
