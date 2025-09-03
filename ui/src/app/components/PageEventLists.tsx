import FilterBar from "./FilterBar";
import CurrentDayEventList from "./CurrentDayEventList";
import EventList from "./EventList";
import { monthNames } from "../lib/sport-options";

interface PELProps {
  league?: string;
  team?: string;
  date?: string;
  dow?: string;
}

const PageEventLists = ({ league, team, date, dow }: PELProps) => {
  if (!date && !dow) {
    return (
      <div className="flex flex-col gap-12 rounded-2xl bg-sky-100/10">
        <FilterBar />
        <div className="flex flex-col items-center gap-10 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">
            Today&apos;s Giveaways
          </h3>
          <CurrentDayEventList league={league} team={team} />
        </div>
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">All Giveaways</h3>
          <EventList league={league} team={team} />
        </div>
      </div>
    );
  } else if (date) {
    const [y, m, d] = date.split("-");
    return (
      <div className="flex flex-col gap-10 rounded-2xl bg-sky-100/10">
        <FilterBar />
        <div className="flex flex-col items-center gap-10 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">
            Giveaways on {`${monthNames[parseInt(m) - 1]} ${d}, ${y}`}
          </h3>
          <EventList league={league} team={team} date={date} />
        </div>
      </div>
    );
  } else if (dow) {
    return (
      <div className="flex flex-col gap-10 rounded-2xl bg-sky-100/10">
        <FilterBar />
        <div className="flex flex-col items-center gap-10 mx-10">
          <h3 className="text-sky-200 text-4xl font-bold">
            Giveaways on {`${dow?.slice(0, 1).toUpperCase()}${dow?.slice(1)}s`}
          </h3>
          <EventList league={league} team={team} dow={dow} />
        </div>
      </div>
    );
  }
};

export default PageEventLists;
