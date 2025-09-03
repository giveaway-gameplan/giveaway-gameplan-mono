import PageEventLists from "@/app/components/PageEventLists";

export default async function TeamPage({
  params,
  searchParams,
}: {
  params: Promise<{ league: string; team: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { league, team } = await params;
  const { date, dow } = await searchParams;

  return <PageEventLists league={league} team={team} date={date} dow={dow} />;
}
