import { notFound } from 'next/navigation'

import { type EventFilters, getEventCards } from '@/lib/events'

import EventCards, { EmptyState } from './EventCards'

export default async function EventList(filters: EventFilters) {
  const events = await getEventCards(filters)
  if (events === null) notFound()

  if (events.length === 0) return <EmptyState>No giveaways found.</EmptyState>

  return <EventCards events={events} />
}
