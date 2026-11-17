import config from '@payload-config'
import { getPayload, type Where } from 'payload'
import { cache } from 'react'

import type { Event, League, Team } from '@/payload-types'

import {
  DAYS_OF_WEEK,
  type DayOfWeek,
  dayToStoredDate,
  isIsoDay,
  storedDateToDay,
  todayIn,
} from './dates'
import { isRegionCode, type RegionCode } from './regions'

/** "Today" for server-rendered lists. Visitors' own "today" comes from the browser. */
const SITE_TIME_ZONE = 'America/New_York'

export type Sport = League['sport']
export type NavLeague = Pick<League, 'id' | 'name' | 'slug' | 'sport' | 'theme'>
export type NavTeam = Pick<Team, 'id' | 'name' | 'slug'>
/** A place teams play, for the city and state filters. */
export type TeamLocation = { city: string; state: RegionCode }

export type EventCardData = {
  id: number
  title: string
  teamName: string
  opponentName: string | null
  leagueName: string | null
  day: string
  dayOfWeek: DayOfWeek
  time: string | null
  venue: string | null
  url: string | null
  photoUrl: string | null
}

export type EventFilters = {
  league?: string
  team?: string
  date?: string
  dow?: string
  month?: string
  city?: string
  state?: string
}

const payloadClient = () => getPayload({ config })

export const getLeagues = cache(async (): Promise<NavLeague[]> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'leagues',
    sort: '_order',
    limit: 100,
    depth: 0,
    select: { name: true, slug: true, sport: true, theme: true },
  })
  return docs
})

export const getLeague = cache(async (slug: string): Promise<NavLeague | null> => {
  const leagues = await getLeagues()
  return leagues.find((league) => league.slug === slug) ?? null
})

export const getTeams = cache(async (leagueId: number): Promise<NavTeam[]> => {
  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'teams',
    where: { league: { equals: leagueId } },
    sort: 'name',
    limit: 500,
    depth: 0,
    select: { name: true, slug: true },
  })
  return docs
})

/**
 * Every city that has a team, optionally within one league, sorted by name.
 * Teams with no city or state yet are left out.
 */
export const getTeamLocations = cache(async (leagueSlug?: string): Promise<TeamLocation[]> => {
  const league = leagueSlug ? await getLeague(leagueSlug) : null
  if (leagueSlug && !league) return []

  const payload = await payloadClient()
  const { docs } = await payload.find({
    collection: 'teams',
    where: league ? { league: { equals: league.id } } : {},
    pagination: false,
    depth: 0,
    select: { city: true, state: true },
  })

  const locations = new Map<string, TeamLocation>()
  for (const { city, state } of docs) {
    if (city && state) locations.set(`${city}|${state}`, { city, state })
  }
  return [...locations.values()].sort(
    (a, b) => a.city.localeCompare(b.city) || a.state.localeCompare(b.state),
  )
})

/** Drops anything in the query string that isn't a filter we understand. */
export const parseFilters = (params: Record<string, string | string[] | undefined>) => {
  const { date, dow, month, city, state } = params
  const monthNumber = typeof month === 'string' ? Number(month) : NaN
  return {
    date: isIsoDay(date) ? date : undefined,
    dow:
      typeof dow === 'string' && (DAYS_OF_WEEK as readonly string[]).includes(dow)
        ? dow
        : undefined,
    month:
      Number.isInteger(monthNumber) && monthNumber >= 1 && monthNumber <= 12
        ? String(monthNumber)
        : undefined,
    city: typeof city === 'string' && city.trim() ? city.trim().slice(0, 100) : undefined,
    state: isRegionCode(state) ? state : undefined,
  }
}

/**
 * A month filter means the next time that month comes around: this year's if it
 * hasn't finished yet, otherwise next year's. Past seasons stay out of the way.
 */
export const monthRange = (month: number, today: string): { from: string; before: string } => {
  const [currentYear, currentMonth] = today.split('-').map(Number)
  const year = month >= currentMonth ? currentYear : currentYear + 1
  const pad = (value: number) => String(value).padStart(2, '0')
  const from = `${year}-${pad(month)}-01`
  const before = month === 12 ? `${year + 1}-01-01` : `${year}-${pad(month + 1)}-01`
  return { from, before }
}

const asDoc = <T extends { id: number }>(value: number | T | null | undefined): T | null =>
  value && typeof value === 'object' ? value : null

const toCard = (event: Event): EventCardData => {
  const team = asDoc(event.team)
  return {
    id: event.id,
    title: event.title,
    teamName: team?.name ?? '',
    opponentName: asDoc(event.opponent)?.name ?? null,
    leagueName: asDoc(event.league)?.name ?? null,
    day: storedDateToDay(event.date),
    dayOfWeek: event.dayOfWeek ?? DAYS_OF_WEEK[new Date(event.date).getUTCDay()],
    time: event.time ?? null,
    venue: event.venue || team?.venue || null,
    url: event.url || team?.promotionsUrl || null,
    photoUrl: event.photoUrl || null,
  }
}

/** Returns null when the league or team in the filters doesn't exist. */
export const getEventCards = async (filters: EventFilters): Promise<EventCardData[] | null> => {
  const payload = await payloadClient()
  const today = todayIn(SITE_TIME_ZONE)
  const and: Where[] = []

  if (filters.league) {
    const league = await getLeague(filters.league)
    if (!league) return null
    and.push({ league: { equals: league.id } })

    if (filters.team) {
      const team = (await getTeams(league.id)).find(({ slug }) => slug === filters.team)
      if (!team) return null
      and.push({ team: { equals: team.id } })
    }
  }

  // Where an event is comes from its home team.
  if (filters.city) and.push({ 'team.city': { equals: filters.city } })
  if (filters.state) and.push({ 'team.state': { equals: filters.state } })

  if (filters.date) {
    and.push({ date: { equals: dayToStoredDate(filters.date) } })
  } else if (filters.dow) {
    and.push({ dayOfWeek: { equals: filters.dow } })
    and.push({ date: { greater_than_equal: dayToStoredDate(today) } })
  } else if (filters.month) {
    const { from, before } = monthRange(Number(filters.month), today)
    and.push({ date: { greater_than_equal: dayToStoredDate(from) } })
    and.push({ date: { less_than: dayToStoredDate(before) } })
  }

  const { docs } = await payload.find({
    collection: 'events',
    where: { and },
    sort: ['date', 'title'],
    limit: 500,
    depth: 1,
    populate: {
      teams: { name: true, venue: true, promotionsUrl: true },
      leagues: { name: true },
    },
  })

  // The league badge only helps on pages that mix leagues.
  return docs.map(toCard).map((card) => (filters.league ? { ...card, leagueName: null } : card))
}

export const currentMonth = (): string => String(Number(todayIn(SITE_TIME_ZONE).split('-')[1]))
