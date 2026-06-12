// Dev utility: districts + turntable + needle-drop ripple screenshots.
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

// 1. Nashville: four district washes + turntable button bottom-left
await page.goto("http://localhost:3000/nashville", { waitUntil: "networkidle" });
await page.waitForTimeout(9000);
await page.screenshot({ path: "/tmp/p4-nashville.png" });

// 2. turntable on (vinyl spins; crackle gain ramps — silent in headless).
// JS click: the Next dev overlay owns the corner and confuses playwright.
console.log(
  "turntable:",
  await page.evaluate(() => {
    const btn = document.querySelector('button[title="Ambient crackle"]');
    btn?.click();
    return new Promise((r) =>
      setTimeout(() => r(btn?.getAttribute("aria-label")), 500)
    );
  })
);
await page.screenshot({ path: "/tmp/p4-turntable.png" });

// 3. needle drop: open a pin with a track, click into the Spotify iframe
await page.goto("http://localhost:3000/bristol?pin=bristol-sessions-site", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(8000);
const frameEl = page.locator("iframe[title^='Spotify']");
await frameEl.click({ position: { x: 40, y: 40 } }); // play button corner
await page.waitForTimeout(2500);
await page.screenshot({ path: "/tmp/p3-ripple.png" });

await browser.close();
console.log("done");
