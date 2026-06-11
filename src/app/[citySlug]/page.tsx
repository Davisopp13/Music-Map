import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCityData } from "@/lib/data";
import CityExperience from "@/components/CityExperience";

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
  const data = await getCityData(citySlug);
  if (!data) notFound();
  return <CityExperience data={data} />;
}
