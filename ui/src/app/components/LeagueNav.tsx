"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { leagues } from "../lib/sport-options";
import BallIcon from "./BallIcon";

const LeagueNav = () => {
  const pathname = usePathname().split("/")[1];

  return (
    <nav
      className="
      w-11/12
      flex flex-row flex-nowrap overflow-auto overflow-y-hidden justify-evenly self-center
      [-ms-overflow-style:auto]
      [scrollbar-color:hsl(48,90%,79%)_transparent]
      [scrollbar-width:thin]
      rounded-2xl
      text-2xl font-bold
      bg-[hsl(231,30%,15%)]
      shadow-[inset_0px_0px_50px_hsl(231,20%,1%),_0px_5px_10px_10px_hsl(231,20%,1%),_-0px_-2px_25px_5px_hsl(231,20%,75%),_0px_0px_350px_hsl(231,20%,95%)]
      snap-x snap-mandatory
      "
    >
      {leagues.map((league) => (
        <Link key={league} href={`/${league}`}>
          <div
            className={`
              ${`/${pathname}` === `/${league}` && "text-[hsl(48,90%,50%)]"}
              flex items-center gap-5
              py-5 px-4 rounded-2xl 
              hover:text-[hsl(48,90%,50%)]
              snap-center
              `}
          >
            <span>
              {league === "gleaguenba" ? "NBA G League" : league.toUpperCase()}
            </span>
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
