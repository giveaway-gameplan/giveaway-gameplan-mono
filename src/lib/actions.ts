'use server'

import { isIsoDay } from './dates'
import { type EventCardData, getEventCards } from './events'

/** Events on the visitor's own "today", which only their browser knows. */
export async function getEventsOnDay(
  day: string,
  league?: string,
  team?: string,
): Promise<EventCardData[]> {
  if (!isIsoDay(day)) return []
  return (await getEventCards({ league, team, date: day })) ?? []
}
