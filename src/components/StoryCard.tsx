"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowRight,
  CalendarDays,
  Compass,
  ExternalLink,
  Globe2,
  ListMusic,
  MapPin,
  Music2,
  Spline,
  Ticket,
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
  const hasVenueDetails = Boolean(
    location.venue_status ||
      location.official_url ||
      location.tickets_url ||
      location.setlistfm_url
  );

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
      {/* drag-handle affordance on mobile, printed over the label band */}
      <div
        className="pointer-events-none absolute inset-x-0 top-2 z-10 flex justify-center md:hidden"
        aria-hidden
      >
        <div
          className="h-1 w-10 rounded-full opacity-40"
          style={{ background: cfg.onColor }}
        />
      </div>

      {/* paper disc with an ink rim: reads over the label band and over
          the story once the band scrolls away */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-foreground/40 bg-paper text-foreground shadow-[0_1px_4px_rgba(43,38,32,0.2)] transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      >
        <X size={18} />
      </button>

      <div className="overflow-y-auto overscroll-contain pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        {/* The record label: the pin's ink as a band, pressed rings off
            the right edge, the era stamped like a catalog number. */}
        <header
          className="relative overflow-hidden px-5 pb-5 pt-7 md:pt-6"
          style={{ background: cfg.color, color: cfg.onColor }}
        >
          <span
            className="pointer-events-none absolute -right-[70px] -top-[64px] h-[220px] w-[220px] rounded-full border-[1.5px] border-current opacity-15"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -right-[40px] -top-[34px] h-[160px] w-[160px] rounded-full border-[1.5px] border-current opacity-15"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -right-[10px] -top-[4px] h-[100px] w-[100px] rounded-full border-[1.5px] border-current opacity-20"
            aria-hidden
          />

          <div className="relative flex flex-wrap items-center gap-2.5 pr-12">
            <span
              className="inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-2.5 py-0.5 font-poster text-[12px] font-semibold uppercase tracking-[0.16em]"
              style={{ borderColor: "currentColor" }}
            >
              <TypeIcon size={12} strokeWidth={2.4} />
              {cfg.label}
            </span>
            <EraBadge start={location.era_start} end={location.era_end} />
          </div>

          <h2
            className="relative mt-2.5 pr-10 font-display text-[1.85rem] font-semibold leading-[1.1]"
            style={{ textShadow: `2px 2px 0 ${cfg.offsetInk}` }}
          >
            {location.name}
          </h2>
        </header>

        <div className="px-5">

        {location.spotify_track_id && (
          <div className="mt-5">
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
          <StoryImage
            key={location.image_url}
            src={location.image_url}
            alt={location.name}
            attribution={location.image_attribution}
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
          // a ticket stub: the stop number torn off along a dashed perforation
          <div className="mt-4 flex items-stretch overflow-hidden rounded-md bg-[#f3ead4]">
            <div className="flex shrink-0 flex-col items-center justify-center border-r-2 border-dashed border-paper-edge px-3.5 py-2.5 font-poster">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
                Stop
              </span>
              <span className="text-[26px] font-semibold leading-none text-accent">
                {stop.stop_order}
              </span>
              <span className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-soft">
                of {stopCount}
              </span>
            </div>
            <div className="min-w-0 flex-1 px-3.5 py-2.5">
              {trailName && (
                <p className="font-poster text-[13px] font-medium uppercase tracking-[0.06em]">
                  {trailName}
                </p>
              )}
              {stop.stop_note_md && (
                <div className="story-prose mt-1 text-[15px]">
                  <ReactMarkdown components={mdComponents}>{stop.stop_note_md}</ReactMarkdown>
                </div>
              )}
            </div>
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
                          <span className="ml-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground/70">
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

        {hasVenueDetails && (
          <section className="mt-5 border-t border-paper-edge pt-4">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                <CalendarDays size={13} />
                Venue now
              </p>
              {location.venue_status && (
                <span className="text-[12px] font-medium text-foreground/70">
                  {venueStatusLabel(location.venue_status, location.pin_type)}
                </span>
              )}
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {location.official_url && (
                <VenueLink href={location.official_url} icon={Globe2}>
                  Official site
                </VenueLink>
              )}
              {location.tickets_url && (
                <VenueLink href={location.tickets_url} icon={Ticket}>
                  Shows &amp; tickets
                </VenueLink>
              )}
              {location.setlistfm_url && (
                <VenueLink href={location.setlistfm_url} icon={ListMusic}>
                  Past setlists
                </VenueLink>
              )}
            </div>
          </section>
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
      </div>
    </aside>
  );
}

function StoryImage({
  src,
  alt,
  attribution,
}: {
  src: string;
  alt: string;
  attribution: string | null;
}) {
  const [failed, setFailed] = useState(false);
  const objectPosition = src.includes("Tennessee_Ernie_Ford_1957")
    ? "object-top"
    : "object-center";
  if (failed) return null;

  return (
    <figure className="mt-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`aspect-[3/2] w-full rounded-lg border border-paper-edge object-cover ${objectPosition}`}
      />
      {attribution && (
        <figcaption className="mt-1.5 text-xs italic text-foreground/50">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}

function VenueLink({
  href,
  icon: Icon,
  children,
}: {
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-paper-edge bg-background px-3 py-2 text-[12.5px] font-semibold text-foreground transition-colors hover:border-foreground/40"
    >
      <Icon size={14} className="shrink-0" />
      <span>{children}</span>
      <ExternalLink size={11} className="shrink-0 text-ink-soft" />
    </a>
  );
}

function venueStatusLabel(
  status: NonNullable<Location["venue_status"]>,
  pinType: Location["pin_type"]
) {
  switch (status) {
    case "active":
      return "Active venue";
    case "seasonal":
      return pinType === "festival" ? "Seasonal festival" : "Seasonal venue";
    case "closed":
      return "Closed venue";
    case "demolished":
      return "Demolished venue";
  }
}

// Stamped like a catalog number on the label; inherits the label's ink.
function EraBadge({ start, end }: { start: number | null; end: number | null }) {
  if (!start) return null;
  const label = end ? `${start} – ${end}` : `since ${start}`;
  return (
    <span
      className="inline-flex items-center rounded-[3px] border-[1.5px] px-2 py-0.5 font-poster text-[13px] font-semibold tracking-[0.14em]"
      style={{ borderColor: "currentColor" }}
    >
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
