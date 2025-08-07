import FilterBar from "../components/FilterBar";
import EventList from "../components/EventList";

// https://nextjs.org/docs/app/getting-started/linking-and-navigating#dynamic-segments-without-generatestaticparams

// export function generateStaticParams() {
//   return leagues.map((lg) => ({
//     league: lg,
//   }));
// }

// show some alternative ui if user types a non-existent league in the address bar like "MLF"
export default async function LeaguePage({
  params,
  searchParams,
}: {
  params: Promise<{ league: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { league } = await params;
  const { date, dow } = await searchParams;

  return (
    <div className="flex flex-col gap-10">
      <FilterBar />
      <EventList
        league={league}
        date={date || undefined}
        dow={dow || undefined}
      />
    </div>
  );
}
