import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type {
  City,
  CityData,
  Connection,
  District,
  Location,
  Trail,
  TrailStop,
} from "./types";
import { localCityData } from "./local-data";

// trim() guards against stray whitespace/newlines pasted into dashboard
// env fields — an invalid URL makes createClient throw a 500 on every page.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = (
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)?.trim();

export async function getCities(): Promise<City[]> {
  if (!url || !key) {
    const local = localCityData("bristol");
    return local ? [local.city] : [];
  }
  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("cities")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return (data ?? []) as City[];
}

// Everything the overview map needs: every city plus every pin, so the
// frame can fitBounds over actual pin coordinates rather than city centers.
export async function getOverviewData(): Promise<{
  cities: City[];
  locations: Location[];
  connections: Connection[];
}> {
  if (!url || !key) {
    const local = localCityData("bristol");
    return local
      ? { cities: [local.city], locations: local.locations, connections: [] }
      : { cities: [], locations: [], connections: [] };
  }
  const supabase = createClient(url, key);
  const [citiesRes, locationsRes, connections] = await Promise.all([
    supabase.from("cities").select("*").order("sort_order"),
    supabase.from("locations").select("*"),
    fetchConnections(supabase),
  ]);
  if (citiesRes.error) throw citiesRes.error;
  if (locationsRes.error) throw locationsRes.error;
  return {
    cities: (citiesRes.data ?? []) as City[],
    locations: (locationsRes.data ?? []) as Location[],
    connections,
  };
}

// The whole connections table with both endpoint pins embedded — it's tiny
// (a dozen-ish threads), so both the city view and the overview arcs just
// take it all and filter client-side.
const CONNECTION_SELECT =
  "id, relationship_md, from:locations!connections_from_location_id_fkey(id, slug, name, lat, lng, city_id), to:locations!connections_to_location_id_fkey(id, slug, name, lat, lng, city_id)";

async function fetchConnections(
  supabase: SupabaseClient
): Promise<Connection[]> {
  const { data, error } = await supabase
    .from("connections")
    .select(CONNECTION_SELECT);
  if (error) throw error;
  // Supabase types embedded rows loosely; the FK targets are single rows.
  return (data ?? []) as unknown as Connection[];
}

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

  const [locationsRes, trailsRes, districtsRes, allConnections] =
    await Promise.all([
      supabase
        .from("locations")
        .select("*")
        .eq("city_id", city.id)
        .order("sort_order"),
      supabase
        .from("trails")
        .select("*, stops:trail_stops(*)")
        .order("sort_order"),
      supabase.from("districts").select("*").eq("city_id", city.id),
      fetchConnections(supabase),
    ]);
  if (locationsRes.error) throw locationsRes.error;
  if (trailsRes.error) throw trailsRes.error;
  if (districtsRes.error) throw districtsRes.error;

  const locations = (locationsRes.data ?? []) as Location[];
  const locationIds = new Set(locations.map((l) => l.id));

  // Threads that touch this city — including inter-city ones, which render
  // as stub arrows pointing off toward the other chapter.
  const connections = allConnections.filter(
    (c) => locationIds.has(c.from.id) || locationIds.has(c.to.id)
  );

  // Trails are global in the schema; keep only those that walk this city.
  const trails = ((trailsRes.data ?? []) as Trail[])
    .map((t) => ({
      ...t,
      stops: (t.stops ?? [])
        .filter((s: TrailStop) => locationIds.has(s.location_id))
        .sort((a: TrailStop, b: TrailStop) => a.stop_order - b.stop_order),
    }))
    .filter((t) => t.stops.length > 0);

  return {
    city,
    locations,
    trails,
    connections,
    districts: (districtsRes.data ?? []) as District[],
  };
}
