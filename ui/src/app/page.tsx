import FilterBar from "./components/FilterBar";
import EventList from "./components/EventList";

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { date, dow } = await searchParams;

  return (
    <div className="flex flex-col gap-10">
      <FilterBar />
      <EventList date={date || undefined} dow={dow || undefined} />
    </div>
  );
}
