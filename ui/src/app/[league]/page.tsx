import FilterBar from "../components/FilterBar";
import EventList from "../components/EventList";
import CurrentDayEventList from "../components/CurrentDayEventList";
import { monthNames } from "../lib/sport-options";

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

  if (!date && !dow) {
    return (
      <div className="flex flex-col gap-10">
        <FilterBar />
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">Today's Giveaways</h3>
          <CurrentDayEventList league={league} />
        </div>
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">
            Upcoming Giveaways
          </h3>
          <EventList league={league} />
        </div>
      </div>
    );
  } else if (date) {
    const [y, m, d] = date.split("-");
    return (
      <div className="flex flex-col gap-10">
        <FilterBar />
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">
            Giveaways on {`${monthNames[parseInt(m) - 1]} ${d}, ${y}`}
          </h3>
          <EventList league={league} date={date} />
        </div>
      </div>
    );
  } else if (dow) {
    return (
      <div className="flex flex-col gap-10">
        <FilterBar />
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">
            Giveaways on {`${dow?.slice(0, 1).toUpperCase()}${dow?.slice(1)}s`}
          </h3>
          <EventList league={league} dow={dow} />
        </div>
      </div>
    );
  }
}
