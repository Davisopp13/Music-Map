"use client";

import { ChevronLeft, ChevronRight, Route, X } from "lucide-react";
import type { Location, Trail } from "@/lib/types";

interface TrailBarProps {
  trail: Trail;
  active: boolean;
  stopIndex: number;
  locationById: Map<string, Location>;
  cardOpen: boolean;
  onStart: () => void;
  onExit: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function TrailBar({
  trail,
  active,
  stopIndex,
  locationById,
  cardOpen,
  onStart,
  onExit,
  onPrev,
  onNext,
}: TrailBarProps) {
  if (!active) {
    // On the phone an open story card owns the bottom of the screen —
    // the launch pill would float over its text.
    return (
      <div
        className={`absolute inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 justify-center px-4 md:right-[450px] ${
          cardOpen ? "hidden md:flex" : "flex"
        }`}
      >
        {/* poster language: cream card, ink border, wood type */}
        <button
          onClick={onStart}
          className="flex items-center gap-2.5 rounded-md border-2 border-foreground bg-paper py-2.5 pl-4 pr-5 text-foreground shadow-[0_4px_20px_rgba(43,38,32,0.35)] transition-transform active:scale-95"
        >
          <Route size={18} className="text-accent-rust" />
          <span className="text-left leading-tight">
            <span className="block font-poster text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-rust">
              Walk the trail
            </span>
            <span className="block font-poster text-sm font-medium uppercase tracking-[0.05em]">
              {trail.name}
            </span>
          </span>
        </button>
      </div>
    );
  }

  const stop = trail.stops[stopIndex];
  const location = stop ? locationById.get(stop.location_id) : undefined;

  return (
    <div className="absolute inset-x-0 bottom-0 z-40 bg-foreground pb-[env(safe-area-inset-bottom)] text-paper md:inset-x-auto md:bottom-4 md:left-1/2 md:w-[440px] md:max-w-[calc(100vw-2rem)] md:-translate-x-1/2 md:rounded-full md:pb-0 md:shadow-[0_4px_20px_rgba(43,38,32,0.45)]">
      <div className="flex h-[64px] items-center gap-1 px-2 md:h-[56px]">
        <button
          onClick={onExit}
          aria-label="Exit trail"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full opacity-70 transition-opacity hover:opacity-100"
        >
          <X size={18} />
        </button>
        <button
          onClick={onPrev}
          disabled={stopIndex === 0}
          aria-label="Previous stop"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full disabled:opacity-25"
        >
          <ChevronLeft size={22} />
        </button>
        <div className="min-w-0 flex-1 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] opacity-70">
            Stop {stop ? stop.stop_order : "—"} of {trail.stops.length}
          </p>
          <p className="truncate text-sm font-medium">
            {location?.name ?? trail.name}
          </p>
        </div>
        <button
          onClick={onNext}
          disabled={stopIndex >= trail.stops.length - 1}
          aria-label="Next stop"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full disabled:opacity-25"
        >
          <ChevronRight size={22} />
        </button>
        {/* spacer mirrors the exit button so the label stays centered */}
        <div className="h-10 w-10 shrink-0" />
      </div>
    </div>
  );
}
