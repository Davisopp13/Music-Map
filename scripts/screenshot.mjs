// Dev utility: screenshot a page with Playwright's managed Chromium.
// Usage: node scripts/screenshot.mjs <url> <outfile> [width] [height] [waitMs]
import { chromium } from "playwright-core";

const [url, outfile, w = "1280", h = "800", waitMs = "9000"] =
  process.argv.slice(2);

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
});
page.on("console", (m) => {
  if (m.type() === "error" || m.type() === "warning")
    console.log(`[console.${m.type()}]`, m.text().slice(0, 300));
});
page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 300)));
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 }).catch((e) =>
  console.log("[goto]", String(e).slice(0, 200))
);
await page.waitForTimeout(Number(waitMs));
await page.screenshot({ path: outfile });
await browser.close();
console.log("saved", outfile);
