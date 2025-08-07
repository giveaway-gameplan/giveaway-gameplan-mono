import { Event } from "../lib/definitions";
import BallIcon from "./BallIcon";

const EventCard = ({ event }: { event: Event }) => {
  return (
    <li
      className="
      text-slate-200 text-center font-extrabold
      w-110 min-h-110 p-4 rounded-2xl
      shadow-md hover:shadow-lg shadow-slate-400
      inset-shadow-sm hover:inset-shadow-md inset-shadow-slate-400
      bg-linear-to-tr from-slate-400/10 from-0% via-zinc-900/5 via-50% to-slate-400/10 to-100%
      hover:from-slate-400/30  hover:to-slate-400/30
      flex flex-col justify-between items-center
     "
    >
      <p className="text-xl">{event.team_name.toUpperCase()}</p>
      <p>VS {event.matchup.split(" at")[0]}</p>
      <div className="w-20 h-20 mb-7">
        <BallIcon league={event.league} />
      </div>
      <p
        // shadow-sm shadow-slate-400
        // inset-shadow-xs inset-shadow-slate-400
        className="
        w-full
        text-slate-300 text-2xl
        px-10 py-3
        bg-linear-to-tr from-red-900/50 from-0% to-red-700/90 to-100%
        "
      >
        {event.event_name}
      </p>
      <p>
        <span>{event.day_of_week.toUpperCase()}</span>
        {event.description.split(" on")[1]}
      </p>
      <div className="w-full flex flex-row justify-evenly items-baseline">
        <p>{event.location}</p>
        <a
          href={event.offer_url}
          target="_blank"
          rel="noopener noreferrer"
          className="
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
