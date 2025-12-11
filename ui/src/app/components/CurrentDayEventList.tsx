"use client";

import { useEffect, useState } from "react";
import { Event } from "../lib/definitions";
import EventCard from "./EventCard";

type Props = {
  league?: string;
  team?: string;
};

export default function EventList({ league, team }: Props) {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dateFilter = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_BASE_URL!;
        const url = new URL("/api/v1/events", base);
        const sp = new URLSearchParams();
        if (league) sp.append("league", league);
        if (team) sp.append("team", team);
        if (dateFilter) sp.append("date", dateFilter);
        if (sp.toString()) url.search = sp.toString();

        const res = await fetch(url.toString());
        // const res = await fetch(url.toString(), { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        const data: Event[] = await res.json();
        setEvents(data);
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Unknown error");
        }
      }
    };

    fetchEvents();
  }, [league, team, dateFilter]);

  if (error)
    return (
      <div className="text-rose-500 text-2xl font-bold">
        [ Error fetching data ]
      </div>
    );
  if (events === null)
    return <div className="text-2xl font-bold">Loading . . .</div>;
  if (events.length === 0)
    return (
      <div className="text-shadow-none text-2xl">
        Today is not your lucky day. There ane no giveaways!
      </div>
    );

  return (
    <ul
      className="
        w-full
        flex flex-row flex-nowrap overflow-auto overflow-y-hidden justify-evenly
        px-8
        gap-10
        [-ms-overflow-style:auto]
        [scrollbar-color:hsl(48,90%,79%)_transparent]
        [scrollbar-width:thin]
        snap-x snap-mandatory
      "
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ul>
  );
}
