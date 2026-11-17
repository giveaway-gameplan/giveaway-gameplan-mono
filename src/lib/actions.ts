'use server'

import { isIsoDay } from './dates'
import { type EventCardData, type EventFilters, getEventCards, parseFilters } from './events'

/** Events on the visitor's own "today", which only their browser knows. */
export async function getEventsOnDay(
  day: string,
  { league, team, city, state }: Pick<EventFilters, 'league' | 'team' | 'city' | 'state'> = {},
): Promise<EventCardData[]> {
  if (!isIsoDay(day)) return []
  const where = parseFilters({ city, state })
  return (
    (await getEventCards({ league, team, city: where.city, state: where.state, date: day })) ?? []
  )
}
