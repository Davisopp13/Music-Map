"use client";

import { useEffect } from "react";
import { isEmbedded } from "@/lib/embed";

// Registers the minimal service worker (public/sw.js). Production only —
// a SW in dev serves yesterday's chunks and ruins your afternoon.
export default function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    // Inside the docodelab.com test drive: no offline install.
    if (isEmbedded()) return;
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => navigator.serviceWorker.ready)
      .then((registration) => {
        // A quiet DOM signal keeps production verification read-only and
        // avoids exposing Cache Storage or service-worker internals in UI.
        document.documentElement.dataset.serviceWorker =
          registration.active?.state ?? "ready";
      })
      .catch(() => {
        document.documentElement.dataset.serviceWorker = "failed";
      });
  }, []);
  return null;
}
