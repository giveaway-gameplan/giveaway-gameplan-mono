import { notFound } from 'next/navigation'

import { type EventFilters, getEventCards } from '@/lib/events'

import EventCards from './EventCards'

export default async function EventList(filters: EventFilters) {
  const events = await getEventCards(filters)
  if (events === null) notFound()

  if (events.length === 0)
    return <div className="text-shadow-none text-2xl">No giveaways found</div>

  return <EventCards events={events} />
}
