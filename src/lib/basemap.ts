import type { StyleSpecification } from "maplibre-gl";

// Carto Voyager raster tiles: free, no token, and the warmest of the
// no-key basemaps. globals.css adds a sepia filter on the canvas to push
// it the rest of the way toward "worn atlas". Shared by the city map and
// the overview map so the atlas reads as one book.
export const BASEMAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    basemap: {
      type: "raster",
      tiles: ["a", "b", "c", "d"].map(
        (s) =>
          `https://${s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png`
      ),
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    },
  },
  layers: [{ id: "basemap", type: "raster", source: "basemap" }],
};
