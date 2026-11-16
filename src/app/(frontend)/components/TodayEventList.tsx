'use client'

import { useEffect, useState } from 'react'

import { getEventsOnDay } from '@/lib/actions'
import type { EventCardData } from '@/lib/events'

import EventCards from './EventCards'

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

  if (failed) return <div className="text-rose-500 text-2xl font-bold">[ Error fetching data ]</div>
  if (events === null) return <div className="text-2xl font-bold">Loading . . .</div>
  if (events.length === 0)
    return (
      <div className="text-shadow-none text-2xl">
        Today is not your lucky day. There are no giveaways!
      </div>
    )

  return <EventCards events={events} />
}
