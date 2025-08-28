"use client";

import { useEffect, useState } from "react";
import { Event } from "../lib/definitions";
import EventCard from "./EventCard";
import { monthNames } from "../lib/sport-options";

type Props = {
  league?: string;
  team?: string;
};

export default function EventList({ league, team }: Props) {
  // const [dateFilter, setDateFilter] = useState<string | undefined>(
  //   new Date().toISOString().split("T")[0]
  // );
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
      } catch (e: any) {
        setError(e.message ?? "Unknown error");
      }
    };

    fetchEvents();
  }, [league, team, dateFilter]);

  if (error) return <div>Error fetching data</div>;
  if (!events) return <div>Loading...</div>;

  console.log("====================================");
  console.log("RENDERED");
  console.log("====================================");

  return (
    <ul
      className="
        w-full
        flex flex-row flex-nowrap overflow-auto justify-evenly
        gap-10
        [-ms-overflow-style:auto]
        [scrollbar-color:#11c8e0_transparent]
        [scrollbar-width:thin]
      "
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </ul>
  );
}
