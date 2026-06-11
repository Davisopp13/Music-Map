"use client";

import { RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
        Music History Map
      </p>
      <h1 className="font-display text-2xl font-semibold">
        The needle skipped
      </h1>
      <p className="max-w-sm text-sm text-ink-soft">
        Something went wrong loading the map data
        {error.digest ? ` (ref ${error.digest})` : ""}. Try again in a moment.
      </p>
      <button
        onClick={reset}
        className="mt-2 flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-paper"
      >
        <RotateCcw size={15} />
        Retry
      </button>
    </main>
  );
}
