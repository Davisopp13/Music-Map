// Dev utility: regenerate the PWA icon set from scripts/icon-source.png
// (the vinyl-record map pin on cream). Renders with the cached Playwright
// chromium, same as screenshot.mjs — no native image deps.
//
// Outputs:
//   public/icons/icon-{192,512}.png        purpose "any", art near full bleed
//   public/icons/maskable-{192,512}.png    art at ~78% so the pin tip
//                                          survives squircle/circle masks
//   public/icons/apple-touch-icon.png      180px, full-bleed cream (iOS
//                                          masks it itself; no transparency)
//   public/icons/favicon-32.png
//   src/app/favicon.ico                    PNG-in-ICO, 32px
//   /tmp/icon-mask-preview.png             maskable-512 under a circle mask,
//                                          for eyeballing the safe zone
//
// Usage: node scripts/build-icons.mjs
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { chromium } from "playwright-core";

const SRC = "scripts/icon-source.png";
const OUT = "public/icons";

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

const b64 = fs.readFileSync(SRC).toString("base64");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath });
const page = await browser.newPage();
await page.setContent(
  `<img id="src" src="data:image/png;base64,${b64}">`
);
await page.waitForFunction(
  () => document.getElementById("src").complete
);

// Bleed color sampled from the art's own corner so the background is the
// exact cream of the illustration, not our CSS token.
const bg = await page.evaluate(() => {
  const img = document.getElementById("src");
  const c = document.createElement("canvas");
  c.width = c.height = 4;
  const ctx = c.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const [r, g, bl] = ctx.getImageData(1, 1, 1, 1).data;
  return `rgb(${r},${g},${bl})`;
});
console.log("bleed color:", bg);

// artFrac: the art's tall side as a fraction of the canvas.
async function render(size, artFrac, { circleMask = false } = {}) {
  const dataUrl = await page.evaluate(
    ([size, artFrac, bg, circleMask]) => {
      const img = document.getElementById("src");
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d");
      if (circleMask) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.clip();
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);
      const s =
        (size * artFrac) / Math.max(img.naturalWidth, img.naturalHeight);
      const w = img.naturalWidth * s;
      const h = img.naturalHeight * s;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      return c.toDataURL("image/png");
    },
    [size, artFrac, bg, circleMask]
  );
  return Buffer.from(dataUrl.split(",")[1], "base64");
}

async function out(file, buf) {
  fs.writeFileSync(file, buf);
  console.log("wrote", file, `${(buf.length / 1024).toFixed(1)}KB`);
}

await out(`${OUT}/icon-192.png`, await render(192, 0.94));
await out(`${OUT}/icon-512.png`, await render(512, 0.94));
// maskable safe zone: platforms may crop to the inner 80% circle
await out(`${OUT}/maskable-192.png`, await render(192, 0.78));
await out(`${OUT}/maskable-512.png`, await render(512, 0.78));
await out(`${OUT}/apple-touch-icon.png`, await render(180, 0.84));
const fav32 = await render(32, 1.0);
await out(`${OUT}/favicon-32.png`, fav32);
await out(
  "/tmp/icon-mask-preview.png",
  await render(512, 0.78, { circleMask: true })
);

// Minimal ICO container around the 32px PNG (PNG-in-ICO; fine for browsers).
const header = Buffer.alloc(6);
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // one image
const entry = Buffer.alloc(16);
entry[0] = 32;
entry[1] = 32;
entry.writeUInt16LE(1, 4); // color planes
entry.writeUInt16LE(32, 6); // bpp
entry.writeUInt32LE(fav32.length, 8);
entry.writeUInt32LE(22, 12); // data offset: 6 + 16
await out("src/app/favicon.ico", Buffer.concat([header, entry, fav32]));

await browser.close();
