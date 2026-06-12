import type { MetadataRoute } from "next";

// Installable atlas: the overview map (the cover page) is the front door.
// Icons are generated from scripts/icon-source.png — see
// scripts/build-icons.mjs.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Music History Map",
    short_name: "Music Map",
    description:
      "An interactive map of American music history — story-rich pins and curated trails.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4eee1", // basemap cream
    theme_color: "#2b2620", // ink
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
