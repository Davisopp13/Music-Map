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

// Warm "liner notes" accent per pin type — one hue family per type so the
// legend reads at a glance on the muted basemap.
export const PIN_TYPES: Record<
  PinType,
  { label: string; color: string; icon: LucideIcon }
> = {
  studio: { label: "Studio", color: "#9b2c2c", icon: Disc3 },
  museum: { label: "Museum", color: "#b7791f", icon: Landmark },
  venue: { label: "Venue", color: "#c05621", icon: Music },
  home: { label: "Home", color: "#5f7045", icon: Home },
  marker: { label: "Landmark", color: "#8b5e34", icon: MapPin },
  street: { label: "Street", color: "#6d6258", icon: Footprints },
  festival: { label: "Festival", color: "#97266d", icon: Tent },
};
