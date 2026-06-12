import fs from "node:fs";
import { PbfReader } from "pbf";

const file = process.argv[2];
const chars = (process.argv[3] ?? "Ago |").split("");
const data = fs.readFileSync(file);
const pbf = new PbfReader(data);

const stacks = [];
pbf.readFields((tag, obj, p) => {
  if (tag !== 1) return;
  const end = p.readVarint() + p.pos;
  const stack = { name: "", range: "", glyphs: [] };
  p.readFields((t, o, pp) => {
    if (t === 1) stack.name = pp.readString();
    else if (t === 2) stack.range = pp.readString();
    else if (t === 3) {
      const e2 = pp.readVarint() + pp.pos;
      const g = {};
      pp.readFields((tt, oo, ppp) => {
        if (tt === 1) g.id = ppp.readVarint();
        else if (tt === 2) g.bitmapLen = ppp.readBytes().length;
        else if (tt === 3) g.width = ppp.readVarint();
        else if (tt === 4) g.height = ppp.readVarint();
        else if (tt === 5) g.left = ppp.readSVarint();
        else if (tt === 6) g.top = ppp.readSVarint();
        else if (tt === 7) g.advance = ppp.readVarint();
      }, g, e2);
      stack.glyphs.push(g);
    }
  }, stack, end);
  stacks.push(stack);
}, null, pbf.length);

const s = stacks[0];
console.log("stack:", JSON.stringify(s.name), "range:", s.range, "glyphs:", s.glyphs.length);
for (const ch of chars) {
  const g = s.glyphs.find((g) => g.id === ch.charCodeAt(0));
  console.log(JSON.stringify(ch), JSON.stringify(g));
}
