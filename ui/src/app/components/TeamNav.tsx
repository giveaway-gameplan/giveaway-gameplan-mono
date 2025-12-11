"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TeamNav = ({
  league,
  teams,
}: {
  league: string;
  teams: string[] | string[][];
}) => {
  const pathname = usePathname();

  return (
    <nav
      className="
      w-11/12
      flex 
      flex-row flex-nowrap overflow-auto overflow-y-hidden justify-evenly self-center
      gap-5
      md:flex-col md:flex-nowrap md:self-start md:overflow-y-auto
      md:h-200 md:max-w-60 md:min-w-52 md:ml-5 md:pl-5 md:py-5
      [-ms-overflow-style:auto]
      [scrollbar-color:hsl(48,90%,79%)_transparent]
      [scrollbar-width:thin]
      rounded-2xl
      bg-[hsl(231,30%,15%)]
      shadow-[inset_0px_0px_50px_hsl(231,20%,1%),_0px_5px_10px_10px_hsl(231,20%,1%),_0px_0px_25px_5px_hsl(231,20%,95%)]
      snap-x snap-mandatory
      "
      // shadow-sm shadow-amber-200 inset-shadow-sm inset-shadow-amber-200
      // bg-linear-to-tr from-amber-200/50 from-0% via-amber-500/40 via-50% to-amber-200/50 to-100%
    >
      {teams.map((team) => (
        <Link key={team[0]} href={`/${league}/${team[0]}`}>
          <div
            className={`
              ${
                pathname === `/${league}/${team[0]}` && "text-[hsl(48,90%,50%)]"
              }
              text-xl font-medium
              text-center
              rounded-2xl
              md:text-start
              hover:text-[hsl(48,90%,50%)]
              snap-center
            `}
          >
            {team[1]}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default TeamNav;
