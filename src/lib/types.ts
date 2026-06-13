export type PinType =
  | "studio"
  | "venue"
  | "home"
  | "marker"
  | "museum"
  | "street"
  | "festival";

export interface City {
  id: string;
  slug: string;
  name: string;
  state: string | null;
  center_lat: number;
  center_lng: number;
  default_zoom: number;
  intro_md: string | null;
  sort_order: number;
}

export interface Location {
  id: string;
  city_id: string;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  coords_verified: boolean;
  address: string | null;
  pin_type: PinType;
  era_start: number | null;
  era_end: number | null;
  story_md: string;
  what_is_there_now: string | null;
  spotify_track_id: string | null;
  spotify_track_label: string | null;
  image_url: string | null;
  image_attribution: string | null;
  is_orbit: boolean;
  sort_order: number;
}

// A named music district, washed onto the map like watercolor.
export interface District {
  id: string;
  city_id: string;
  name: string;
  geojson: GeoJSON.Polygon;
  color: string;
}

// A connection endpoint — just enough of the other pin to draw the thread
// and label the chip, even when it lives in another city.
export interface ConnectionPin {
  id: string;
  slug: string;
  name: string;
  lat: number;
  lng: number;
  city_id: string;
}

export interface Connection {
  id: string;
  relationship_md: string;
  from: ConnectionPin;
  to: ConnectionPin;
}

export interface TrailStop {
  id: string;
  trail_id: string;
  location_id: string;
  stop_order: number;
  stop_note_md: string | null;
}

export interface Trail {
  id: string;
  slug: string;
  name: string;
  description_md: string | null;
  trail_type: "walking" | "driving" | "virtual";
  sort_order: number;
  stops: TrailStop[];
}

export interface CityData {
  city: City;
  locations: Location[];
  trails: Trail[];
  connections: Connection[];
  districts: District[];
}
