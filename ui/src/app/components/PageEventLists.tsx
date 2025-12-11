import FilterBar from "./FilterBar";
import CurrentDayEventList from "./CurrentDayEventList";
import EventList from "./EventList";
import { Suspense } from "react";
import FilteredEventList from "./FilteredEventList";

interface PELProps {
  league?: string;
  team?: string;
  date?: string;
  dow?: string;
  month?: string;
}

const currentMonth = new Date().getMonth() + 1;

const PageEventLists = ({ league, team, date, dow, month }: PELProps) => {
  if (!date && !dow && !month) {
    return (
      <div className="text-[hsl(48,90%,95%)] flex flex-col gap-12 rounded-2xl bg-sky-100/10 pb-10">
        <Suspense fallback={null}>
          <FilterBar />
        </Suspense>
        <div className="flex flex-col items-center gap-10 mx-10">
          <h3 className="text-4xl font-bold">Today&apos;s giveaways</h3>
          <CurrentDayEventList league={league} team={team} />
        </div>
        <div className="flex flex-col items-center gap-5 mx-10">
          <h3 className="text-4xl font-bold">All giveaways this month</h3>
          <EventList
            league={league}
            team={team}
            month={currentMonth.toString()}
          />
        </div>
      </div>
    );
  } else {
    return (
      <FilteredEventList
        league={league}
        team={team}
        date={date}
        dow={dow}
        month={month}
      />
    );
  }
};

export default PageEventLists;
