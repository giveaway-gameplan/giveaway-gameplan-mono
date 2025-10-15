import FilterBar from "./FilterBar";
import EventList from "./EventList";
import { monthNames } from "../lib/sport-options";

interface FELProps {
  league?: string;
  team?: string;
  date?: string;
  dow?: string;
  month?: string;
}

const FilteredEventList = ({ league, team, date, dow, month }: FELProps) => {
  let y: string, m: string, d: string;
  let monthIndex: number;
  let h3Text = "";

  if (date) {
    [y, m, d] = date.split("-");
    h3Text = `Giveaways on ${monthNames[parseInt(m) - 1]} ${d}, ${y}`;
  }
  if (dow) {
    h3Text = `Giveaways on ${dow?.slice(0, 1).toUpperCase()}${dow?.slice(1)}s`;
  }
  if (month) {
    monthIndex = Number(month) - 1;
    h3Text = `Giveaways in ${monthNames[monthIndex]}`;
  }
  return (
    <div className="flex flex-col gap-10 rounded-2xl bg-sky-100/10 pb-10">
      <FilterBar />
      <div className="flex flex-col items-center gap-10 mx-10">
        <h3 className="text-sky-200 text-4xl font-bold">{h3Text}</h3>
        <EventList
          league={league}
          team={team}
          date={date}
          dow={dow}
          month={month}
        />
      </div>
    </div>
  );
};

export default FilteredEventList;
