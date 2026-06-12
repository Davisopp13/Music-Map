// Dev utility: walk the Phase 2 interactions and screenshot each state.
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { chromium } from "playwright-core";

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
  viewport: { width: 1280, height: 800 },
  deviceScaleFactor: 2,
});
page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 300)));

// 1. overview arcs
await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
await page.waitForTimeout(8000);
await page.screenshot({ path: "/tmp/p2-overview-arcs.png" });

// 2. pin with threads open (Bristol Sessions site has inter-city threads)
await page.goto("http://localhost:3000/bristol?pin=bristol-sessions-site", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(9000);
await page.screenshot({ path: "/tmp/p2-threads.png" });

// expand the first thread chip
const threadChip = page
  .locator("aside")
  .locator("button")
  .filter({ hasText: "Nassau" });
if ((await threadChip.count()) > 0) {
  await threadChip.first().click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: "/tmp/p2-thread-note.png" });
}

// 3. trail mode: start + advance twice
await page.goto("http://localhost:3000/bristol", { waitUntil: "networkidle" });
await page.waitForTimeout(6000);
await page.getByText("Walk the trail").click();
await page.waitForTimeout(2500);
await page.getByLabel("Next stop").click();
await page.waitForTimeout(2200);
await page.getByLabel("Next stop").click();
await page.waitForTimeout(2200);
await page.getByLabel("Next stop").click();
await page.waitForTimeout(3000);
await page.screenshot({ path: "/tmp/p2-trail.png" });

await browser.close();
console.log("done");
