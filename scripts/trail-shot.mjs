// Dev utility: screenshot trail mode.
// Usage: node scripts/trail-shot.mjs <url> <outfile> [advances] [width] [height]
// Open a city, start the trail, advance N stops, screenshot.
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { chromium } from "playwright-core";

const [url, outfile, advances = "3", w = "1280", h = "800"] =
  process.argv.slice(2);

const cacheRoot = path.join(os.homedir(), "Library/Caches/ms-playwright");
const shellDir = fs
  .readdirSync(cacheRoot)
  .filter((d) => d.startsWith("chromium_headless_shell-"))
  .sort()
  .pop();
const executablePath = path.join(
  cacheRoot,
  shellDir,
  "chrome-headless-shell-mac-arm64",
  "chrome-headless-shell"
);

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 2,
});
page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 300)));
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(6000);
await page.getByText("Walk the trail", { exact: false }).first().click();
await page.waitForTimeout(2500);
for (let i = 0; i < Number(advances); i++) {
  await page.getByLabel("Next stop").click();
  await page.waitForTimeout(2200);
}
await page.waitForTimeout(3000);
await page.screenshot({ path: outfile });
await browser.close();
console.log("saved", outfile);
