import FilterBar from "@/app/components/FilterBar";
import EventList from "@/app/components/EventList";

// https://nextjs.org/docs/app/getting-started/linking-and-navigating#dynamic-segments-without-generatestaticparams

// export function generateStaticParams() {
//   return leagues.map((lg) => ({
//     league: lg,
//   }));
// }

export default async function TeamPage({
  params,
  searchParams,
}: {
  params: Promise<{ league: string; team: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { league, team } = await params;
  const { date, dow } = await searchParams;

  return (
    <div className="flex flex-col gap-10">
      <FilterBar />
      <EventList
        league={league}
        team={team}
        date={date || undefined}
        dow={dow || undefined}
      />
    </div>
  );
}
