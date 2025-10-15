import PageEventLists from "../components/PageEventLists";

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { date, dow, month } = await searchParams;

  return <PageEventLists date={date} dow={dow} month={month} />;
}
