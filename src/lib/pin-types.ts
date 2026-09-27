import {
  Disc3,
  Landmark,
  Music,
  Home,
  MapPin,
  Footprints,
  Tent,
  type LucideIcon,
} from "lucide-react";
import type { PinType } from "./types";

// Poster inks, one per pin type, spread around the wheel so the legend reads
// at a glance on the muted basemap. Red is deliberately absent: the single
// action red (--accent) means "happening now" (active trail, now playing).
// `onColor` is the icon/text ink on that label (venue's marquee yellow needs
// dark ink); `offsetInk` is the letterpress second ink, printed 1.5px off
// register behind the label.
const MUSTARD_OFFSET = "rgba(224, 165, 38, 0.55)";
const RED_OFFSET = "rgba(200, 55, 45, 0.45)";
const CREAM = "#faf5ea";
const INK = "#2b2620";

export interface PinTypeStyle {
  label: string;
  color: string;
  onColor: string;
  offsetInk: string;
  icon: LucideIcon;
}

export const PIN_TYPES: Record<PinType, PinTypeStyle> = {
  studio: { label: "Studio", color: "#2e5b8f", onColor: CREAM, offsetInk: MUSTARD_OFFSET, icon: Disc3 },
  museum: { label: "Museum", color: "#6d3f86", onColor: CREAM, offsetInk: MUSTARD_OFFSET, icon: Landmark },
  venue: { label: "Venue", color: "#e0a526", onColor: INK, offsetInk: RED_OFFSET, icon: Music },
  home: { label: "Home", color: "#3d7a52", onColor: CREAM, offsetInk: MUSTARD_OFFSET, icon: Home },
  marker: { label: "Landmark", color: "#6b4a2e", onColor: CREAM, offsetInk: MUSTARD_OFFSET, icon: MapPin },
  street: { label: "Street", color: "#5c5650", onColor: CREAM, offsetInk: MUSTARD_OFFSET, icon: Footprints },
  festival: { label: "Festival", color: "#b5306f", onColor: CREAM, offsetInk: MUSTARD_OFFSET, icon: Tent },
};
