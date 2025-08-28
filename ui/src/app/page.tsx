import FilterBar from "./components/FilterBar";
import EventList from "./components/EventList";
import CurrentDayEventList from "./components/CurrentDayEventList";
import { monthNames } from "./lib/sport-options";

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { date, dow } = await searchParams;

  if (!date && !dow) {
    return (
      <div className="flex flex-col gap-10">
        <FilterBar />
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">Today's Giveaways</h3>
          <CurrentDayEventList />
        </div>
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">
            Upcoming Giveaways
          </h3>
          <EventList />
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
          <EventList date={date} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-10">
        <FilterBar />
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">
            Giveaways on {`${dow?.slice(0, 1).toUpperCase()}${dow?.slice(1)}s`}
          </h3>
          <EventList dow={dow} />
        </div>
      </div>
    );
  }
}
