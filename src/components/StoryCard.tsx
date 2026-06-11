"use client";

import ReactMarkdown from "react-markdown";
import { Compass, ExternalLink, MapPin, Music2, X } from "lucide-react";
import { PIN_TYPES } from "@/lib/pin-types";
import type { City, Location, TrailStop } from "@/lib/types";

interface StoryCardProps {
  location: Location;
  city: City;
  stop: TrailStop | null; // set when this card is the current trail stop
  stopCount: number;
  trailName: string | null;
  raised: boolean; // trail bar is docked at the bottom — leave it room
  onClose: () => void;
}

export default function StoryCard({
  location,
  city,
  stop,
  stopCount,
  trailName,
  raised,
  onClose,
}: StoryCardProps) {
  const cfg = PIN_TYPES[location.pin_type];
  const TypeIcon = cfg.icon;

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
        {location.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={location.image_url}
            alt={location.name}
            className="mb-4 aspect-[3/2] w-full rounded-lg border border-paper-edge object-cover"
          />
        )}

        {/* type + era */}
        <div className="mb-2 flex flex-wrap items-center gap-2 pr-9">
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper"
            style={{ background: cfg.color }}
          >
            <TypeIcon size={12} strokeWidth={2.4} />
            {cfg.label}
          </span>
          <EraBadge start={location.era_start} end={location.era_end} />
        </div>

        <h2 className="font-display text-[1.65rem] font-semibold leading-[1.15]">
          {location.name}
        </h2>

        {location.is_orbit && (
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-ink-soft">
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
                <ReactMarkdown>{stop.stop_note_md}</ReactMarkdown>
              </div>
            )}
          </div>
        )}

        <div className="story-prose mt-4">
          <ReactMarkdown>{location.story_md}</ReactMarkdown>
        </div>

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

        {(location.spotify_track_id || location.spotify_track_label) && (
          <div className="mt-5">
            {location.spotify_track_label && (
              <p className="mb-2 flex items-start gap-1.5 text-[13px] italic text-ink-soft">
                <Music2 size={14} className="mt-0.5 shrink-0" />
                {location.spotify_track_label}
              </p>
            )}
            {location.spotify_track_id && (
              <iframe
                src={`https://open.spotify.com/embed/track/${location.spotify_track_id}?theme=0`}
                width="100%"
                height="80"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title={`Spotify: ${location.name}`}
                className="rounded-xl"
              />
            )}
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
