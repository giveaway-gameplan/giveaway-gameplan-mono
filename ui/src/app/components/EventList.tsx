import { Event } from "../lib/definitions";
import EventCard from "./EventCard";

export default async function EventList({
  league,
  team,
  date,
  dow,
  month,
}: {
  league?: string;
  team?: string;
  date?: string;
  dow?: string;
  month?: string;
}) {
  // const today = new Date();
  // const formattedDate = today.toISOString().split("T")[0];
  // if (!dow && !date) date = formattedDate;

  const base = process.env.INTERNAL_API_BASE_URL!;
  const url = new URL("/api/v1/events", base);

  const searchParams = new URLSearchParams();
  if (league) searchParams.append("league", league);
  if (team) searchParams.append("team", team);
  if (date) searchParams.append("date", date);
  if (dow) searchParams.append("dow", dow);
  if (month) searchParams.append("month", month);
  if (searchParams.toString()) url.search = searchParams.toString();

  try {
    const response = await fetch(url.toString());
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const events: Event[] = await response.json();

    if (events && events.length === 0)
      return <div className="text-sky-200/50 text-2xl">No giveaways found</div>;

    return (
      <ul
        className="
        w-full
        flex flex-row flex-nowrap overflow-auto overflow-y-hidden justify-center-safe
        gap-10
        [-ms-overflow-style:auto]
        [scrollbar-color:#11c8e0_transparent]
        [scrollbar-width:thin]"
      >
        {events.map((event: Event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </ul>
    );
  } catch (error) {
    console.error(error);
    return <div>Error fetching data</div>;
  }
}
