"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { City, CityData, Connection } from "@/lib/types";
import CityMap from "./CityMap";
import StoryCard from "./StoryCard";
import TrailBar from "./TrailBar";
import Turntable from "./Turntable";

export default function CityExperience({
  data,
  cities,
  initialPinSlug,
}: {
  data: CityData;
  cities: City[];
  initialPinSlug?: string;
}) {
  const { city, locations, trails, connections, districts } = data;
  const router = useRouter();
  const otherCities = cities.filter((c) => c.id !== city.id);
  const trail = trails[0] ?? null;

  // Inter-city threads land here via /city?pin=slug deep links.
  const [selectedId, setSelectedId] = useState<string | null>(
    () => locations.find((l) => l.slug === initialPinSlug)?.id ?? null
  );
  const [trailActive, setTrailActive] = useState(false);
  const [stopIndex, setStopIndex] = useState(0);
  // The thread whose relationship note is open on the card.
  const [openThreadId, setOpenThreadId] = useState<string | null>(null);
  // The user dropped the needle on this pin's Spotify embed — it ripples
  // while the card stays open, and the ambient crackle ducks out of the way.
  const [spotifyPinId, setSpotifyPinId] = useState<string | null>(null);

  const locationById = useMemo(
    () => new Map(locations.map((l) => [l.id, l])),
    [locations]
  );

  const stops = useMemo(() => trail?.stops ?? [], [trail]);
  const currentStop = trailActive ? (stops[stopIndex] ?? null) : null;
  const selected = selectedId ? (locationById.get(selectedId) ?? null) : null;

  const selectedConnections = useMemo(
    () =>
      selectedId
        ? connections.filter(
            (c) => c.from.id === selectedId || c.to.id === selectedId
          )
        : [],
    [connections, selectedId]
  );

  // The stop note only belongs on the card when the selected pin IS the
  // current stop — tapping a random pin mid-trail shows its plain story.
  const cardStop =
    currentStop && selected && currentStop.location_id === selected.id
      ? currentStop
      : null;

  // Plain functions: the React Compiler memoizes these automatically.
  const selectPin = (id: string) => {
    setSelectedId(id);
    setOpenThreadId(null);
    setSpotifyPinId(null);
    if (trailActive) {
      const i = stops.findIndex((s) => s.location_id === id);
      if (i >= 0) setStopIndex(i);
    }
  };

  const deselect = () => {
    setSelectedId(null);
    setOpenThreadId(null);
    setSpotifyPinId(null);
  };

  // Follow a thread to its far pin — across the map, or across the atlas.
  const goToThreadPin = (conn: Connection) => {
    const other = conn.from.id === selectedId ? conn.to : conn.from;
    if (other.city_id === city.id) {
      selectPin(other.id);
      return;
    }
    const otherCity = cities.find((c) => c.id === other.city_id);
    if (otherCity) router.push(`/${otherCity.slug}?pin=${other.slug}`);
  };

  const goToStop = (i: number) => {
    const stop = stops[i];
    if (!stop) return;
    setStopIndex(i);
    setSelectedId(stop.location_id);
    setOpenThreadId(null);
  };

  const startTrail = () => {
    setTrailActive(true);
    const first = stops[0];
    if (first) {
      setStopIndex(0);
      setSelectedId(first.location_id);
      setOpenThreadId(null);
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
        connections={connections}
        districts={districts}
        cities={cities}
        selectedId={selectedId}
        onSelect={selectPin}
        onDeselect={deselect}
        onThreadClick={(id) => setOpenThreadId(id)}
        ripplingId={spotifyPinId}
        trailStops={trailActive ? stops : null}
        trailStopIndex={stopIndex}
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
          cities={cities}
          connections={selectedConnections}
          openThreadId={openThreadId}
          onThreadToggle={(id) =>
            setOpenThreadId((cur) => (cur === id ? null : id))
          }
          onThreadGo={goToThreadPin}
          onSpotifyEngage={() => setSpotifyPinId(selectedId)}
          stop={cardStop}
          stopCount={stops.length}
          trailName={trail?.name ?? null}
          raised={trailActive}
          onClose={deselect}
        />
      )}

      {/* Ambient crackle ducks while Spotify is sounding — and while the
          open card is a no-track pin. Silence stays silent. */}
      {/* bottom-left, lifted above the mobile trail dock (and the Next.js
          dev badge that owns the exact corner during development) */}
      <div className="absolute bottom-[max(5rem,calc(env(safe-area-inset-bottom)+4.5rem))] left-3 z-40 md:left-5">
        <Turntable
          silenced={
            spotifyPinId !== null ||
            (selected !== null && !selected.spotify_track_id)
          }
        />
      </div>

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
