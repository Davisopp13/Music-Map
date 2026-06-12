"use client";

import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowRight,
  Compass,
  ExternalLink,
  MapPin,
  Music2,
  Spline,
  X,
} from "lucide-react";
import { PIN_TYPES } from "@/lib/pin-types";
import type { City, Connection, Location, TrailStop } from "@/lib/types";

// Story links (museum sites etc.) must open in the browser, not hijack the
// standalone PWA window — markdown gives us bare <a> tags otherwise.
const mdComponents = {
  a: (props: React.ComponentProps<"a">) => (
    <a {...props} target="_blank" rel="noreferrer" />
  ),
};

interface StoryCardProps {
  location: Location;
  city: City;
  cities: City[];
  connections: Connection[]; // threads touching this pin
  openThreadId: string | null;
  onThreadToggle: (id: string) => void;
  onThreadGo: (conn: Connection) => void;
  onSpotifyEngage: () => void; // user tapped into the embed — needle drops
  stop: TrailStop | null; // set when this card is the current trail stop
  stopCount: number;
  trailName: string | null;
  raised: boolean; // trail bar is docked at the bottom — leave it room
  onClose: () => void;
}

export default function StoryCard({
  location,
  city,
  cities,
  connections,
  openThreadId,
  onThreadToggle,
  onThreadGo,
  onSpotifyEngage,
  stop,
  stopCount,
  trailName,
  raised,
  onClose,
}: StoryCardProps) {
  const cfg = PIN_TYPES[location.pin_type];
  const TypeIcon = cfg.icon;

  // Spotify's embed gives no playback events cross-origin; the accepted
  // heuristic is "the user clicked into the iframe" — window blurs and the
  // iframe becomes the active element.
  const spotifyRef = useRef<HTMLIFrameElement>(null);
  const onEngageRef = useRef(onSpotifyEngage);
  useEffect(() => {
    onEngageRef.current = onSpotifyEngage;
  });
  useEffect(() => {
    const onBlur = () => {
      if (spotifyRef.current && document.activeElement === spotifyRef.current)
        onEngageRef.current();
    };
    window.addEventListener("blur", onBlur);
    return () => window.removeEventListener("blur", onBlur);
  }, [location.id]);

  return (
    <aside
      className={`absolute inset-x-0 z-30 flex max-h-[68dvh] flex-col overflow-hidden rounded-t-2xl border border-paper-edge bg-paper shadow-[0_-8px_30px_rgba(43,38,32,0.25)] md:inset-x-auto md:bottom-4 md:right-4 md:top-4 md:max-h-none md:w-[420px] md:rounded-2xl md:shadow-[0_8px_40px_rgba(43,38,32,0.3)] ${
        raised ? "bottom-[64px]" : "bottom-0"
      }`}
      aria-label={location.name}
    >
      {/* drag-handle affordance on mobile */}
      <div className="flex shrink-0 justify-center pt-2 md:hidden">
        <div className="h-1 w-10 rounded-full bg-paper-edge" />
      </div>

      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-ink-soft transition-colors hover:text-foreground"
      >
        <X size={17} />
      </button>

      <div className="overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 md:pt-5">
        <h2 className="pr-9 font-display text-[1.65rem] font-semibold leading-[1.15]">
          {location.name}
        </h2>

        {/* type + era */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper"
            style={{ background: cfg.color }}
          >
            <TypeIcon size={12} strokeWidth={2.4} />
            {cfg.label}
          </span>
          <EraBadge start={location.era_start} end={location.era_end} />
        </div>

        {location.spotify_track_id && (
          <div className="mt-4">
            <iframe
              ref={spotifyRef}
              src={`https://open.spotify.com/embed/track/${location.spotify_track_id}?theme=0`}
              width="100%"
              height="80"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title={`Spotify: ${location.name}`}
              className="rounded-xl"
            />
            {location.spotify_track_label && (
              <p className="mt-2 flex items-start gap-1.5 text-[13px] italic text-ink-soft">
                <Music2 size={14} className="mt-0.5 shrink-0" />
                {location.spotify_track_label}
              </p>
            )}
          </div>
        )}

        {location.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={location.image_url}
            alt={location.name}
            className="mt-4 aspect-[3/2] w-full rounded-lg border border-paper-edge object-cover"
          />
        )}

        {location.is_orbit && (
          <p className="mt-3 flex items-center gap-1.5 text-[13px] text-ink-soft">
            <Compass size={14} />
            About {milesFrom(city, location)} miles from downtown — the orbit
            pin worth the drive
          </p>
        )}

        {stop && (
          <div className="mt-4 rounded-lg border-l-4 bg-[#f3ead4] p-3.5 [border-left-color:var(--accent)]">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              Stop {stop.stop_order} of {stopCount}
              {trailName ? ` · ${trailName}` : ""}
            </p>
            {stop.stop_note_md && (
              <div className="story-prose text-[15px]">
                <ReactMarkdown components={mdComponents}>{stop.stop_note_md}</ReactMarkdown>
              </div>
            )}
          </div>
        )}

        <div className="story-prose mt-4">
          <ReactMarkdown components={mdComponents}>{location.story_md}</ReactMarkdown>
        </div>

        {connections.length > 0 && (
          <div className="mt-5 border-t border-paper-edge pt-4">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              <Spline size={13} />
              Threads
            </p>
            <div className="flex flex-col gap-1.5">
              {connections.map((conn) => {
                const other =
                  conn.from.id === location.id ? conn.to : conn.from;
                const otherCity =
                  other.city_id !== city.id
                    ? cities.find((c) => c.id === other.city_id)
                    : null;
                const open = openThreadId === conn.id;
                return (
                  <div
                    key={conn.id}
                    className={`rounded-lg border transition-colors ${
                      open
                        ? "border-paper-edge bg-background"
                        : "border-transparent"
                    }`}
                  >
                    <button
                      onClick={() => onThreadToggle(conn.id)}
                      className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-[13.5px] font-medium transition-colors ${
                        open
                          ? "text-foreground"
                          : "bg-background/60 text-ink-soft hover:text-foreground"
                      }`}
                    >
                      <span className="thread-stitch shrink-0" aria-hidden />
                      <span className="min-w-0 flex-1 truncate">
                        {other.name}
                        {otherCity && (
                          <span className="ml-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent">
                            {otherCity.name}
                          </span>
                        )}
                      </span>
                    </button>
                    {open && (
                      <div className="px-3 pb-3">
                        <div className="story-prose text-[14px]">
                          <ReactMarkdown components={mdComponents}>{conn.relationship_md}</ReactMarkdown>
                        </div>
                        <button
                          onClick={() => onThreadGo(conn)}
                          className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-foreground px-3.5 py-1.5 text-[12px] font-semibold text-paper transition-transform active:scale-95"
                        >
                          Go to pin
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {location.what_is_there_now && (
          <div className="mt-5 rounded-lg bg-background p-4">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
              What&rsquo;s there now
            </p>
            <p className="story-prose text-[15px]">
              {location.what_is_there_now}
            </p>
          </div>
        )}

        {location.address && (
          <p className="mt-5 flex items-start gap-1.5 border-t border-paper-edge pt-4 text-[13px] text-ink-soft">
            <MapPin size={14} className="mt-0.5 shrink-0" />
            <span>{location.address}</span>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location.address)}`}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex shrink-0 items-center gap-1 font-medium text-foreground underline underline-offset-2"
            >
              Directions
              <ExternalLink size={12} />
            </a>
          </p>
        )}
      </div>
    </aside>
  );
}

function EraBadge({ start, end }: { start: number | null; end: number | null }) {
  if (!start) return null;
  const label = end ? `${start}–${end}` : `since ${start}`;
  return (
    <span className="inline-flex items-center rounded-full border border-paper-edge bg-background px-2.5 py-1 font-display text-[12px] font-medium tracking-wide text-foreground">
      {label}
    </span>
  );
}

function milesFrom(city: City, loc: Location): number {
  const R = 3958.8;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(loc.lat - city.center_lat);
  const dLng = toRad(loc.lng - city.center_lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(city.center_lat)) *
      Math.cos(toRad(loc.lat)) *
      Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}
