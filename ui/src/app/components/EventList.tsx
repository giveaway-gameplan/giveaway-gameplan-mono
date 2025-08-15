import { Event } from "../lib/definitions";
import EventCard from "./EventCard";

export default async function EventList({
  league,
  team,
  date,
  dow,
}: {
  league?: string;
  team?: string;
  date?: string;
  dow?: string;
}) {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  if (!dow && !date) date = formattedDate;

  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  const url = new URL("/api/v1/events", base);

  const searchParams = new URLSearchParams();
  if (league) searchParams.append("league", league);
  if (team) searchParams.append("team", team);
  if (date) searchParams.append("date", date);
  if (dow) searchParams.append("dow", dow);
  if (searchParams.toString()) url.search = searchParams.toString();

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const events: Event[] = await response.json();

    return (
      <div className="flex flex-col gap-10">
        <ul className="flex flex-row flex-wrap justify-center gap-10">
          {events.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching data</div>;
  }
}
