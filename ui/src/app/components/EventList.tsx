import { Event } from "../lib/definitions";
import EventCard from "./EventCard";

// import {
//   leagues,
//   mlbTeams,
//   nflTeams,
//   nhlTeams,
//   nbaTeams,
// } from "../lib/sport-options";
// make sure the search param is in the sport-options before fetching. Otherwise show alternative UI?
// or just let the request fail and show 404 page

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

  // const base = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";
  const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
  // const base = "http://localhost:4000";
  const url = new URL("/api/v1/events", base);

  const searchParams = new URLSearchParams();
  if (league) searchParams.append("league", league);
  if (team) searchParams.append("team", team);
  if (date) searchParams.append("date", date);
  if (dow) searchParams.append("dow", dow);
  if (searchParams.toString()) url.search = searchParams.toString();

  console.log("====================================");
  console.log(url.toString());
  console.log("====================================");

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

// STATIC
// const response = await fetch("http://localhost:4000/api/v1/events");
//
//
//
// STATIC BUT REVALIDATES EVERY HOUR
// const response = await fetch("http://localhost:4000/api/v1/events", {
//   next: {
//     revalidate: 3600,
//   },
// });
//
//
//
// DYNAMIC
// const response = await fetch(
//   `http://localhost:4000/api/v1/events?query=${query}`,
//   {
//     cache: "no-store",
//   }
// );
