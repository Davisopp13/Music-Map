import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCities, getCityData } from "@/lib/data";
import CityExperience from "@/components/CityExperience";

// Content lives in Supabase and is edited there directly — without this,
// Next statically caches each city on first visit (and caches the 404 for
// cities that didn't exist yet), so DB edits never reach the live site.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ citySlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { citySlug } = await params;
  const data = await getCityData(citySlug);
  if (!data) return { title: "Music History Map" };
  return {
    title: `${data.city.name} ${data.city.state ?? ""} — Music History Map`,
    description: data.city.intro_md ?? undefined,
  };
}

export default async function CityPage({ params }: Props) {
  const { citySlug } = await params;
  const [data, cities] = await Promise.all([getCityData(citySlug), getCities()]);
  if (!data) notFound();
  return <CityExperience data={data} cities={cities} />;
}
