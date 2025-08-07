import TeamNav from "../components/TeamNav";
import { mlbTeams, nflTeams, nhlTeams, nbaTeams } from "../lib/sport-options";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ league: string }>;
}) {
  const { league } = await params;

  let teams: string[][] | string[] = [];

  switch (league) {
    case "mlb":
      teams = mlbTeams;
      break;
    case "nfl":
      teams = nflTeams;
      break;
    case "nhl":
      teams = nhlTeams;
      break;
    case "nba":
      teams = nbaTeams;
      break;
  }

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <TeamNav league={league} teams={teams} />
      <div className="">{children}</div>
    </div>
  );
}
