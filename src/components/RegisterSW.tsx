"use client";

import { useEffect } from "react";

// Registers the minimal service worker (public/sw.js). Production only —
// a SW in dev serves yesterday's chunks and ruins your afternoon.
export default function RegisterSW() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // no SW, no problem — the app works fine without it
    });
  }, []);
  return null;
}
