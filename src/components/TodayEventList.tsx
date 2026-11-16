'use client'

import { useEffect, useState } from 'react'

import { getEventsOnDay } from '@/lib/actions'
import type { EventCardData } from '@/lib/events'

import EventCards, { EmptyState, EventCardsSkeleton } from './EventCards'

// en-CA formats dates as YYYY-MM-DD, in the visitor's own timezone.
const localToday = () => new Intl.DateTimeFormat('en-CA').format(new Date())

export default function TodayEventList({ league, team }: { league?: string; team?: string }) {
  const [events, setEvents] = useState<EventCardData[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getEventsOnDay(localToday(), league, team)
      .then((result) => {
        if (!cancelled) setEvents(result)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [league, team])

  if (failed) return <EmptyState>Today’s giveaways couldn’t be loaded. Try refreshing.</EmptyState>
  if (events === null) return <EventCardsSkeleton />
  if (events.length === 0) return <EmptyState>No giveaways today.</EmptyState>

  return <EventCards events={events} />
}
