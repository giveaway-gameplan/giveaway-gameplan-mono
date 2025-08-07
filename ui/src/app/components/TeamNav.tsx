import Link from "next/link";

const TeamNav = ({
  league,
  teams,
}: {
  league: string;
  teams: string[] | string[][];
}) => {
  return (
    <nav
      className="
      w-11/12
      flex 
      flex-row flex-nowrap overflow-auto justify-evenly self-center
      gap-5
      md:flex-col md:flex-nowrap md:self-start
      md:h-200 md:max-w-60 md:min-w-52 md:ml-5 md:pl-5 md:py-5
      [-ms-overflow-style:auto]
      [scrollbar-color:#fee685_transparent]
      [scrollbar-width:thin]
      rounded-2xl
      shadow-md shadow-amber-200
      inset-shadow-sm inset-shadow-amber-200
      bg-linear-to-tr from-amber-200/30 from-0% via-zinc-900/5 via-50% to-amber-200/30 to-100%
      "
    >
      {teams.map((team) => (
        <Link key={team[0]} href={`/${league}/${team[0]}`}>
          <div
            className="
            text-amber-100 text-xl font-medium
            text-shadow-sm text-shadow-amber-400
            text-center
            rounded-2xl
            md:text-start
            hover:text-amber-400"
          >
            {team[1]}
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default TeamNav;
