"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Plus, Share, SquarePlus, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const noopSubscribe = () => () => {};

// Environment facts, read off the real browser (server snapshot pretends
// we're standalone so nothing flashes before hydration).
function useStandalone(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(display-mode: standalone)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () =>
      window.matchMedia("(display-mode: standalone)").matches ||
      // iOS Safari's pre-standard flag
      (navigator as { standalone?: boolean }).standalone === true,
    () => true
  );
}

function useIsIOS(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => /iphone|ipad|ipod/i.test(navigator.userAgent),
    () => false
  );
}

// A quiet corner affordance, never a popup: Chrome/Android gets the real
// install prompt (deferred from beforeinstallprompt); iOS has no prompt
// API, so the tap opens a small atlas-styled sheet with the two-step
// Share → Add to Home Screen instructions. Hidden entirely when already
// running standalone.
export default function InstallPrompt() {
  const standalone = useStandalone();
  const isIOS = useIsIOS();
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(
    null
  );
  const [installed, setInstalled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setSheetOpen(false);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  // already on the home screen, or a browser with neither a deferred
  // prompt nor iOS conventions: stay quiet
  if (standalone || installed || (!deferred && !isIOS)) return null;

  const onClick = async () => {
    if (deferred) {
      await deferred.prompt();
      const choice = await deferred.userChoice;
      if (choice.outcome === "accepted") setDeferred(null);
      return;
    }
    setSheetOpen(true);
  };

  return (
    <>
      <button
        onClick={onClick}
        className="absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 z-30 flex items-center gap-1.5 rounded-[3px] border border-foreground/45 bg-paper/90 px-2.5 py-1.5 font-poster text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-soft shadow-sm transition-colors hover:border-foreground/70 hover:text-foreground"
      >
        <Plus size={12} strokeWidth={2.6} />
        Add to Home Screen
      </button>

      {sheetOpen && (
        <div
          className="absolute inset-0 z-50 flex items-end justify-center bg-foreground/30 md:items-center"
          onClick={() => setSheetOpen(false)}
        >
          <div
            role="dialog"
            aria-label="Add to Home Screen"
            className="relative w-full rounded-t-2xl border border-paper-edge bg-paper px-6 pb-[max(1.75rem,env(safe-area-inset-bottom))] pt-6 shadow-[0_-8px_30px_rgba(43,38,32,0.3)] md:w-[380px] md:rounded-2xl md:pb-7"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSheetOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-ink-soft transition-colors hover:text-foreground"
            >
              <X size={17} />
            </button>
            <p className="font-poster text-[10px] font-semibold uppercase tracking-[0.2em] text-accent-rust">
              ✦ Two taps ✦
            </p>
            <h2 className="mt-1 font-poster text-xl font-semibold uppercase tracking-[0.04em]">
              Put the atlas on your home screen
            </h2>
            <ol className="mt-4 flex flex-col gap-3">
              <li className="flex items-center gap-3 text-[14px]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-paper-edge bg-background">
                  <Share size={17} />
                </span>
                Tap the <strong>Share</strong> button in Safari&rsquo;s toolbar
              </li>
              <li className="flex items-center gap-3 text-[14px]">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-paper-edge bg-background">
                  <SquarePlus size={17} />
                </span>
                Choose <strong>Add to Home Screen</strong>
              </li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
