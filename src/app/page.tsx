import { getOverviewData } from "@/lib/data";
import OverviewMap from "@/components/OverviewMap";
import InstallPrompt from "@/components/InstallPrompt";

// Content lives in Supabase — render live so new cities and pins appear
// on refresh without a redeploy.
export const dynamic = "force-dynamic";

export default async function OverviewPage() {
  const { cities, locations, connections } = await getOverviewData();

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-background">
      <OverviewMap
        cities={cities}
        locations={locations}
        connections={connections}
      />

      {/* Masthead — the cover page of the atlas */}
      <header className="pointer-events-none absolute left-0 right-0 top-0 z-20 bg-gradient-to-b from-background/95 via-background/70 to-transparent px-4 pb-10 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
          An American Atlas
        </p>
        <h1 className="font-display text-2xl font-semibold leading-tight">
          Music History Map
        </h1>
        <p className="mt-0.5 text-[13px] text-ink-soft">
          Pick a city to open its chapter.
        </p>
      </header>

      {/* quiet corner affordance; hides itself when already installed */}
      <InstallPrompt />
    </div>
  );
}
