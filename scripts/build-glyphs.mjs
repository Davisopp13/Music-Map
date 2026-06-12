// Build MapLibre glyph PBFs (SDF bitmaps) from the vendored TTFs.
//
// Why hand-rolled: fontnik/genfontgl are native modules with no darwin-arm64
// binaries. This is pure JS — opentype.js parses the outlines, we compute the
// signed distance field directly from the flattened contours (higher fidelity
// than rasterize-then-transform), and encode the same protobuf fontnik emits.
// Conventions verified against the OpenFreeMap Noto Sans glyphs:
//   bitmap dims = (width + 2*BUFFER) x (height + 2*BUFFER)
//   top = (glyph bbox top above baseline) - ascender   (negative numbers)
//   SDF: byte = 255 - 255 * (dist/RADIUS + CUTOFF), edge lands at ~191
//
// Usage: node scripts/build-glyphs.mjs   → writes public/glyphs/<stack>/<range>.pbf

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import opentype from "opentype.js";
import { PbfWriter } from "pbf";

const FONT_SIZE = 24;
const BUFFER = 3;
const RADIUS = 8;
const CUTOFF = 0.25;

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outRoot = path.join(root, "public", "glyphs");

// stack name (directory + style "text-font" value) → vendored TTF
const FONTS = {
  "Oswald SemiBold": "scripts/fonts/oswald-600.ttf",
  "Oswald Medium": "scripts/fonts/oswald-500.ttf",
  "Lora Medium": "scripts/fonts/lora-500.ttf",
  "Lora Medium Italic": "scripts/fonts/lora-500i.ttf",
};

// Flatten a glyph path into closed polylines (TrueType/CFF curves → segments).
function flattenPath(commands) {
  const contours = [];
  let cur = null;
  let start = [0, 0];
  let last = [0, 0];
  const push = (x, y) => cur.push([x, y]);
  for (const c of commands) {
    if (c.type === "M") {
      if (cur && cur.length > 1) contours.push(cur);
      cur = [[c.x, c.y]];
      start = [c.x, c.y];
      last = [c.x, c.y];
    } else if (c.type === "L") {
      push(c.x, c.y);
      last = [c.x, c.y];
    } else if (c.type === "Q") {
      const N = 10;
      for (let i = 1; i <= N; i++) {
        const t = i / N;
        const mt = 1 - t;
        push(
          mt * mt * last[0] + 2 * mt * t * c.x1 + t * t * c.x,
          mt * mt * last[1] + 2 * mt * t * c.y1 + t * t * c.y
        );
      }
      last = [c.x, c.y];
    } else if (c.type === "C") {
      const N = 14;
      for (let i = 1; i <= N; i++) {
        const t = i / N;
        const mt = 1 - t;
        push(
          mt * mt * mt * last[0] +
            3 * mt * mt * t * c.x1 +
            3 * mt * t * t * c.x2 +
            t * t * t * c.x,
          mt * mt * mt * last[1] +
            3 * mt * mt * t * c.y1 +
            3 * mt * t * t * c.y2 +
            t * t * t * c.y
        );
      }
      last = [c.x, c.y];
    } else if (c.type === "Z") {
      if (cur) {
        push(start[0], start[1]);
        if (cur.length > 1) contours.push(cur);
        cur = null;
      }
      last = start;
    }
  }
  if (cur && cur.length > 1) contours.push(cur);
  return contours;
}

// Signed distance from point to the outline; sign by nonzero winding.
function signedDistance(contours, px, py) {
  let minSq = Infinity;
  let winding = 0;
  for (const pts of contours) {
    for (let i = 0; i < pts.length - 1; i++) {
      const ax = pts[i][0],
        ay = pts[i][1],
        bx = pts[i + 1][0],
        by = pts[i + 1][1];
      // distance to segment
      const dx = bx - ax,
        dy = by - ay;
      const lenSq = dx * dx + dy * dy;
      let t = lenSq > 0 ? ((px - ax) * dx + (py - ay) * dy) / lenSq : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const ex = px - (ax + t * dx),
        ey = py - (ay + t * dy);
      const dSq = ex * ex + ey * ey;
      if (dSq < minSq) minSq = dSq;
      // winding (nonzero rule); y-down coords, direction convention cancels out
      if (ay <= py) {
        if (by > py && dx * (py - ay) - (px - ax) * dy > 0) winding++;
      } else if (by <= py && dx * (py - ay) - (px - ax) * dy < 0) {
        winding--;
      }
    }
  }
  const d = Math.sqrt(minSq);
  return winding !== 0 ? -d : d;
}

function buildGlyph(font, scale, ascenderPx, cp) {
  const glyph = font.charToGlyph(String.fromCodePoint(cp));
  if (!glyph || (glyph.index === 0 && cp !== 0)) return null;
  const advance = Math.round((glyph.advanceWidth ?? 0) * scale);
  const pathObj = glyph.getPath(0, 0, FONT_SIZE);
  const contours = flattenPath(pathObj.commands);

  if (contours.length === 0) {
    // whitespace: metrics only, no bitmap
    return { id: cp, width: 0, height: 0, left: 0, top: -ascenderPx, advance };
  }

  let xMin = Infinity,
    xMax = -Infinity,
    yMin = Infinity,
    yMax = -Infinity;
  for (const pts of contours)
    for (const [x, y] of pts) {
      if (x < xMin) xMin = x;
      if (x > xMax) xMax = x;
      if (y < yMin) yMin = y;
      if (y > yMax) yMax = y;
    }
  const x0 = Math.floor(xMin),
    y0 = Math.floor(yMin);
  const width = Math.ceil(xMax) - x0;
  const height = Math.ceil(yMax) - y0;
  if (width <= 0 || height <= 0)
    return { id: cp, width: 0, height: 0, left: 0, top: -ascenderPx, advance };

  const bw = width + 2 * BUFFER,
    bh = height + 2 * BUFFER;
  const bitmap = new Uint8Array(bw * bh);
  for (let j = 0; j < bh; j++) {
    const py = y0 - BUFFER + j + 0.5;
    for (let i = 0; i < bw; i++) {
      const px = x0 - BUFFER + i + 0.5;
      const d = signedDistance(contours, px, py);
      const v = Math.round(255 - 255 * (d / RADIUS + CUTOFF));
      bitmap[j * bw + i] = v < 0 ? 0 : v > 255 ? 255 : v;
    }
  }

  return {
    id: cp,
    bitmap,
    width,
    height,
    left: x0,
    top: -y0 - ascenderPx, // glyph top above baseline, relative to ascender
    advance,
  };
}

function writeFontstackPbf(name, range, glyphs) {
  const pbf = new PbfWriter();
  pbf.writeMessage(1, (obj, p) => {
    p.writeStringField(1, name);
    p.writeStringField(2, range);
    for (const g of glyphs) {
      p.writeMessage(3, (gg, pp) => {
        pp.writeVarintField(1, gg.id);
        if (gg.bitmap) pp.writeBytesField(2, gg.bitmap);
        pp.writeVarintField(3, gg.width);
        pp.writeVarintField(4, gg.height);
        pp.writeSVarintField(5, gg.left);
        pp.writeSVarintField(6, gg.top);
        pp.writeVarintField(7, gg.advance);
      }, g);
    }
  }, null);
  return pbf.finish();
}

for (const [stackName, fontFile] of Object.entries(FONTS)) {
  const buf = fs.readFileSync(path.join(root, fontFile));
  const font = opentype.parse(
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength)
  );
  const scale = FONT_SIZE / font.unitsPerEm;
  const ascenderPx = Math.round(font.ascender * scale);

  // every 256-codepoint range the font actually covers (BMP)
  const ranges = new Set([0]); // always ship 0-255
  for (const cp of Object.keys(font.tables.cmap.glyphIndexMap)) {
    const n = Number(cp);
    if (n <= 0xffff) ranges.add(Math.floor(n / 256));
  }

  const dir = path.join(outRoot, stackName);
  fs.mkdirSync(dir, { recursive: true });
  let total = 0;
  for (const r of [...ranges].sort((a, b) => a - b)) {
    const startCp = r * 256;
    const glyphs = [];
    for (let cp = startCp; cp < startCp + 256; cp++) {
      if (cp < 32) continue;
      const g = buildGlyph(font, scale, ascenderPx, cp);
      if (g) glyphs.push(g);
    }
    if (glyphs.length === 0) continue;
    const range = `${startCp}-${startCp + 255}`;
    fs.writeFileSync(
      path.join(dir, `${range}.pbf`),
      writeFontstackPbf(stackName, range, glyphs)
    );
    total += glyphs.length;
  }
  console.log(`${stackName}: ${total} glyphs → ${dir}`);
}
