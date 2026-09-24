// Embed mode: Music Map running inside the docodelab.com portfolio's test drive.
// Turned on by ?embed=1 in a frame, and remembered for the tab so in-app links keep it.
// While embedded, no service worker is registered, the install prompt stays hidden,
// and a few progress events are posted to the portfolio so its "Things to try" list
// can tick off.

const KEY = "dcl-embed";
const PORTFOLIO = ["https://docodelab.com", "https://www.docodelab.com"];

function framed(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

export function isEmbedded(): boolean {
  if (typeof window === "undefined" || !framed()) return false;
  const asked = new URLSearchParams(window.location.search).has("embed");
  try {
    if (asked) window.sessionStorage.setItem(KEY, "1");
    return asked || window.sessionStorage.getItem(KEY) === "1";
  } catch {
    return asked;
  }
}

export function emitToPortfolio(event: string) {
  if (!isEmbedded()) return;
  const targets = [...PORTFOLIO];
  // Local portfolio previews (localhost) get events too.
  const ancestor = (window.location as Location & { ancestorOrigins?: DOMStringList })
    .ancestorOrigins?.[0];
  if (ancestor && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(ancestor)) {
    targets.push(ancestor);
  }
  for (const origin of targets) {
    try {
      window.parent.postMessage({ source: "dcl-demo", id: "music-map", event }, origin);
    } catch {}
  }
}
