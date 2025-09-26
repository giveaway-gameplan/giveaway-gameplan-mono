import { Event } from "../lib/definitions";
import BallIcon from "./BallIcon";
import CalendarIcon from "./CalendarIcon";

const EventCard = ({ event }: { event: Event }) => {
  return (
    <li
      className="
      text-sky-200 text-center font-extrabold
      p-4 mb-4 rounded-2xl
      min-w-full md:min-w-120 md:w-120 h-140
      shadow-md shadow-sky-200
      inset-shadow-sm inset-shadow-sky-200
      flex flex-col justify-between items-center
      bg-linear-to-tr from-sky-300/20 from-0% via-sky-950/50 via-50% to-sky-300/20 to-100%
     "
    >
      <p className="text-xl">{event.team_name.toUpperCase()}</p>
      <p>VS {event.matchup.split(" at")[0]}</p>
      <div className="w-20 h-20 mb-7">
        <BallIcon league={event.league} />
      </div>
      <p
        className="
        w-full px-10 py-3 rounded-md
        text-slate-300 text-2xl
        bg-linear-to-tr from-amber-400/60 from-0% to-amber-600/60 to-100%
        "
      >
        {event.event_name}
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-6">
        <CalendarIcon
          date={event.description.split(" on")[1].split(" at")[0].split(",")[0]}
        />
        <p>{event.day_of_week.toUpperCase()}</p>
        <p>{event.description.split(" on")[1].split("at ")[1]}</p>
      </div>
      <div className="w-full flex flex-row justify-evenly items-baseline pt-4">
        <p>📍 {event.location}</p>
        <a
          href={event.offer_url}
          target="_blank"
          rel="noopener noreferrer"
          className="
          underline underline-offset-4
          px-4 py-3 rounded-xl
          shadow-sm shadow-slate-400
          inset-shadow-xs inset-shadow-slate-400
          bg-linear-to-tr from-slate-400/90 from-0% via-zinc-900/5 via-50% to-slate-400/10 to-100%
          hover:from-slate-400/30  hover:to-slate-400/90
          focus:from-slate-400/30  focus:to-slate-400/90
      "
        >
          Visit official site
        </a>
      </div>
    </li>
  );
};

export default EventCard;
