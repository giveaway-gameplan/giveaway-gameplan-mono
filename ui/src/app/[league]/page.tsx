import PageEventLists from "../components/PageEventLists";

export default async function LeaguePage({
  params,
  searchParams,
}: {
  params: Promise<{ league: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { league } = await params;
  const { date, dow, month } = await searchParams;

  return <PageEventLists league={league} date={date} dow={dow} month={month} />;
}
