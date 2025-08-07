import Link from "next/link";
import { leagues } from "../lib/sport-options";
import BallIcon from "./BallIcon";

const LeagueNav = () => {
  return (
    <nav
      className="
      w-11/12
      flex flex-row flex-nowrap overflow-auto justify-evenly self-center
      [-ms-overflow-style:auto]
      [scrollbar-color:#fee685_transparent]
      [scrollbar-width:thin]
      rounded-2xl
      text-amber-100 text-2xl font-bold
      text-shadow-sm text-shadow-amber-400
      shadow-md shadow-amber-200
      inset-shadow-sm inset-shadow-amber-200
      bg-linear-to-tr from-slate-900/90 from-0% via-slate-900/50 via-50% to-white to-100%
      "
    >
      {leagues.map((league) => (
        <Link key={league} href={`/${league}`}>
          <div
            className="
          flex items-center gap-5
          py-5 px-4 rounded-2xl 
          hover:text-amber-400 hover:text-shadow-none
          "
          >
            <span>{league.toUpperCase()}</span>
            <div className="w-10 h-10">
              <BallIcon league={league} />
            </div>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default LeagueNav;
