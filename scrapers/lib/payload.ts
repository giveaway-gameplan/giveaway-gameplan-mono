/**
 * Sends scraped events to the Giveaway Gameplan CMS over its REST API.
 *
 * Scrapers print what they found by default. Pass --push to write to the CMS,
 * which needs PAYLOAD_URL and PAYLOAD_API_KEY (see ../.env.example).
 */

export interface ScrapedEvent {
  /** Home team slug, as it appears in the site URL (e.g. "ducks"). */
  team: string;
  title: string;
  /** Visiting team as written on the source page; matched to a team by name. */
  opponent?: string;
  /** Calendar day at the venue, YYYY-MM-DD. */
  date: string;
  /** Local start time as written on the source page, e.g. "7:30 p.m. PDT". */
  time?: string;
  venue?: string;
  url?: string;
}

interface Team {
  id: number;
  name: string;
  slug: string;
  venue?: string | null;
  promotionsUrl?: string | null;
}

const PAYLOAD_URL = (process.env.PAYLOAD_URL ?? "http://localhost:3000").replace(/\/$/, "");
const API_KEY = process.env.PAYLOAD_API_KEY;

export const shouldPush = process.argv.includes("--push");

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${PAYLOAD_URL}/api${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(API_KEY ? { Authorization: `users API-Key ${API_KEY}` } : {}),
    },
  });
  if (!response.ok) {
    throw new Error(`${init?.method ?? "GET"} ${path} failed: ${response.status} ${await response.text()}`);
  }
  return response.json() as Promise<T>;
};

/** "7:30 p.m. PDT" -> "7:30 p.m."; the CMS tidies the rest. */
const cleanTime = (time?: string): string | undefined =>
  time?.match(/\d{1,2}(?::\d{2})?\s*[ap]\.?\s*m\.?/i)?.[0];

const findOpponent = (teams: Team[], written?: string): Team | undefined => {
  const wanted = written?.trim().toLowerCase();
  if (!wanted) return undefined;
  return (
    teams.find((team) => team.name.toLowerCase() === wanted) ??
    teams.find((team) => team.name.toLowerCase().endsWith(` ${wanted}`)) ??
    teams.find((team) => team.slug === wanted.replace(/[^a-z0-9]/g, ""))
  );
};

export const pushEvents = async (leagueSlug: string, events: ScrapedEvent[]): Promise<void> => {
  if (!shouldPush) {
    console.log(events);
    console.log(`${events.length} events found. Re-run with --push to add them to the CMS.`);
    return;
  }
  if (!API_KEY) throw new Error("PAYLOAD_API_KEY is not set");

  const leagues = await request<{ docs: { id: number }[] }>(
    `/leagues?where[slug][equals]=${encodeURIComponent(leagueSlug)}&depth=0&limit=1`,
  );
  const league = leagues.docs[0];
  if (!league) throw new Error(`League "${leagueSlug}" does not exist in the CMS`);

  const { docs: teams } = await request<{ docs: Team[] }>(
    `/teams?where[league][equals]=${league.id}&depth=0&limit=500`,
  );
  const { docs: existing } = await request<{ docs: { title: string; team: number; date: string }[] }>(
    `/events?where[league][equals]=${league.id}&depth=0&pagination=false`,
  );
  const seen = new Set(existing.map((event) => `${event.team}|${event.title}|${event.date.slice(0, 10)}`));

  let created = 0;
  let skipped = 0;

  for (const event of events) {
    const title = event.title.trim();
    const team = teams.find(({ slug }) => slug === event.team);
    if (!team || !title || !/^\d{4}-\d{2}-\d{2}$/.test(event.date)) {
      console.warn("Skipping event the CMS can't accept:", event);
      skipped++;
      continue;
    }

    const key = `${team.id}|${title}|${event.date}`;
    if (seen.has(key)) {
      skipped++;
      continue;
    }
    seen.add(key);

    const opponent = findOpponent(teams, event.opponent);
    if (event.opponent && !opponent) {
      console.warn(`No team matches opponent "${event.opponent}" (${team.name}, ${event.date})`);
    }

    try {
      await request("/events", {
        method: "POST",
        body: JSON.stringify({
          title,
          team: team.id,
          opponent: opponent?.id,
          date: event.date,
          time: cleanTime(event.time),
          // Only stored when they differ from the team's own venue and link.
          venue: event.venue && event.venue !== team.venue ? event.venue : undefined,
          url: event.url && event.url !== team.promotionsUrl ? event.url : undefined,
        }),
      });
      created++;
    } catch (error) {
      console.error(`Failed to create "${title}" (${team.name}, ${event.date})`, error);
      skipped++;
    }
  }

  console.log(`${leagueSlug}: ${created} events created, ${skipped} skipped`);
};
