import { createClient } from "@supabase/supabase-js";
import type { City, CityData, Location, Trail, TrailStop } from "./types";
import { localCityData } from "./local-data";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getCityData(slug: string): Promise<CityData | null> {
  if (!url || !key) {
    console.warn(
      "[data] NEXT_PUBLIC_SUPABASE_URL / anon key not set — serving bundled Bristol seed data."
    );
    return localCityData(slug);
  }

  const supabase = createClient(url, key);

  const { data: city, error: cityError } = await supabase
    .from("cities")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<City>();
  if (cityError) throw cityError;
  if (!city) return null;

  const [locationsRes, trailsRes] = await Promise.all([
    supabase
      .from("locations")
      .select("*")
      .eq("city_id", city.id)
      .order("sort_order"),
    supabase
      .from("trails")
      .select("*, stops:trail_stops(*)")
      .order("sort_order"),
  ]);
  if (locationsRes.error) throw locationsRes.error;
  if (trailsRes.error) throw trailsRes.error;

  const locations = (locationsRes.data ?? []) as Location[];
  const locationIds = new Set(locations.map((l) => l.id));

  // Trails are global in the schema; keep only those that walk this city.
  const trails = ((trailsRes.data ?? []) as Trail[])
    .map((t) => ({
      ...t,
      stops: (t.stops ?? [])
        .filter((s: TrailStop) => locationIds.has(s.location_id))
        .sort((a: TrailStop, b: TrailStop) => a.stop_order - b.stop_order),
    }))
    .filter((t) => t.stops.length > 0);

  return { city, locations, trails };
}
