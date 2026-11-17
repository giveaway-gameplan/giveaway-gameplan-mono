/**
 * One-time import of the leagues, teams and 2025-26 events that predate the CMS.
 * Safe to re-run: anything that already exists is left alone, apart from teams
 * with no city or state yet, which get theirs filled in.
 *
 *   pnpm seed
 */
import config from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'

import type { Team } from '@/payload-types'

import {
  dayOfWeekFor,
  dayToStoredDate,
  isIsoDay,
  normalizeTime,
  storedDateToDay,
} from '@/lib/dates'

import { seedLeagues } from './leagues'
import type { LegacyEvent } from './types'

const CONCURRENCY = 8

/** The value that appears most often, e.g. a team's usual venue. */
const mostCommon = (values: string[]): string | undefined => {
  const counts = new Map<string, number>()
  for (const value of values) counts.set(value, (counts.get(value) ?? 0) + 1)
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0]
}

/** " on October 22, 2025 at 7:30 p.m." -> { day: "2025-10-22", time: "7:30 PM" } */
const parseDescription = (description: string) => {
  const match = /on ([A-Z][a-z]+ \d{1,2}, \d{4}) at (.+)$/.exec(description)
  if (!match) return null
  const date = new Date(`${match[1]} 12:00 UTC`)
  return {
    day: Number.isNaN(date.getTime()) ? null : storedDateToDay(date),
    time: normalizeTime(match[2]),
  }
}

const runPool = async <T>(items: T[], worker: (item: T) => Promise<void>) => {
  let next = 0
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (next < items.length) await worker(items[next++])
    }),
  )
}

const payload = await getPayload({ config })
const review: string[] = []
const totals = { leagues: 0, teams: 0, located: 0, events: 0, duplicates: 0 }

for (const seedLeague of seedLeagues) {
  const fixSlug = (slug: string) => seedLeague.teamSlugFixes?.[slug] ?? slug
  const eventsByTeam = new Map<string, LegacyEvent[]>()
  for (const event of seedLeague.events) {
    const slug = fixSlug(event.teamName)
    eventsByTeam.set(slug, [...(eventsByTeam.get(slug) ?? []), event])
  }

  // League
  const existingLeague = await payload.find({
    collection: 'leagues',
    where: { slug: { equals: seedLeague.slug } },
    limit: 1,
    depth: 0,
  })
  const league =
    existingLeague.docs[0] ??
    (await payload.create({
      collection: 'leagues',
      data: { name: seedLeague.name, slug: seedLeague.slug, sport: seedLeague.sport },
      depth: 0,
    }))
  if (!existingLeague.docs[0]) totals.leagues++

  // Teams
  const existingTeams = await payload.find({
    collection: 'teams',
    where: { league: { equals: league.id } },
    pagination: false,
    depth: 0,
    select: { name: true, slug: true, venue: true, promotionsUrl: true, city: true, state: true },
  })
  const teamsBySlug = new Map(existingTeams.docs.map((team) => [team.slug, team]))

  for (const [slug, name, city, region] of seedLeague.teams) {
    const state = region as Team['state']
    const existing = teamsBySlug.get(slug)
    if (existing) {
      if (!existing.city && !existing.state) {
        await payload.update({
          collection: 'teams',
          id: existing.id,
          data: { city, state },
          depth: 0,
        })
        totals.located++
      }
      continue
    }
    const legacy = eventsByTeam.get(slug) ?? []
    const team = await payload.create({
      collection: 'teams',
      data: {
        name,
        slug,
        league: league.id,
        city,
        state,
        venue: mostCommon(legacy.map((event) => event.location)),
        promotionsUrl: mostCommon(legacy.map((event) => event.offerURL)),
      },
      depth: 0,
    })
    teamsBySlug.set(slug, team)
    totals.teams++
  }
  const teamsByName = new Map([...teamsBySlug.values()].map((team) => [team.name, team]))

  // Events
  const existingEvents = await payload.find({
    collection: 'events',
    where: { league: { equals: league.id } },
    pagination: false,
    depth: 0,
    select: { title: true, team: true, date: true },
  })
  const keyOf = (teamId: number, title: string, day: string) => `${teamId}|${title}|${day}`
  const seen = new Set(
    existingEvents.docs.map((event) =>
      keyOf(event.team as number, event.title, storedDateToDay(event.date)),
    ),
  )

  const toCreate: RequiredDataFromCollectionSlug<'events'>[] = []

  for (const legacy of seedLeague.events) {
    const label = `${seedLeague.slug}/${fixSlug(legacy.teamName)} ${legacy.startDate} "${legacy.eventName.trim()}"`
    const team = teamsBySlug.get(fixSlug(legacy.teamName))
    if (!team) throw new Error(`Unknown team for ${label}`)
    if (!isIsoDay(legacy.startDate)) throw new Error(`Bad date for ${label}`)

    const opponentName = seedLeague.opponentFixes?.[legacy.matchup] ?? legacy.matchup
    const opponent = teamsByName.get(opponentName)
    if (!opponent) throw new Error(`Unknown opponent "${legacy.matchup}" for ${label}`)
    const playsItself = opponent.id === team.id
    if (playsItself)
      review.push(`${label}: imported with no opponent, because it listed the home team`)

    const time = normalizeTime(legacy.timeAndZone.split(' ')[0])
    if (!time) throw new Error(`Bad time "${legacy.timeAndZone}" for ${label}`)

    // The legacy records stated the date and time twice. Where the two copies
    // disagree beyond an obvious wrong year, a person needs to check the source.
    const described = parseDescription(legacy.description)
    if (described?.day && described.day.slice(5) !== legacy.startDate.slice(5)) {
      review.push(
        `${label}: imported as ${legacy.startDate}, but its description said ${described.day}`,
      )
    }
    if (described?.time && described.time !== time) {
      review.push(`${label}: imported as ${time}, but its description said ${described.time}`)
    }
    if (dayOfWeekFor(legacy.startDate) !== legacy.dayOfWeek) {
      review.push(
        `${label}: ${legacy.startDate} is a ${dayOfWeekFor(legacy.startDate)}, but it was entered as ${legacy.dayOfWeek}`,
      )
    }

    const title = legacy.eventName.trim()
    const key = keyOf(team.id, title, legacy.startDate)
    if (seen.has(key)) {
      totals.duplicates++
      continue
    }
    seen.add(key)

    toCreate.push({
      title,
      team: team.id,
      opponent: playsItself ? undefined : opponent.id,
      league: league.id,
      date: dayToStoredDate(legacy.startDate),
      time,
      venue: legacy.location !== team.venue ? legacy.location : undefined,
      url: legacy.offerURL !== team.promotionsUrl ? legacy.offerURL : undefined,
    })
  }

  await runPool(toCreate, async (data) => {
    await payload.create({ collection: 'events', data, depth: 0 })
    totals.events++
  })

  payload.logger.info(
    `${seedLeague.name}: ${teamsBySlug.size} teams, ${toCreate.length} events created`,
  )
}

payload.logger.info(
  `Created ${totals.leagues} leagues, ${totals.teams} teams and ${totals.events} events. ` +
    `Added a city and state to ${totals.located} existing teams. ` +
    `Skipped ${totals.duplicates} event records that already existed or were repeated in the source.`,
)

if (review.length) {
  console.log(`\n${review.length} imported events have conflicting source data and need a check:\n`)
  for (const line of review) console.log(`  - ${line}`)
}

process.exit(0)
