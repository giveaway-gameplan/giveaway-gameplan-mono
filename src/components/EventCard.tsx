import { ArrowUpRightIcon, ClockIcon, MapPinIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { MONTH_NAMES } from '@/lib/dates'
import type { EventCardData } from '@/lib/events'

import EventPhoto from './EventPhoto'

const EventCard = ({ event }: { event: EventCardData }) => {
  const [, month, dayOfMonth] = event.day.split('-').map(Number)

  return (
    <li className="flex flex-col rounded-xl border bg-card text-card-foreground shadow-xs transition-shadow hover:shadow-md">
      <div className="flex flex-1 gap-4 p-4">
        <div className="flex h-fit w-14 shrink-0 flex-col items-center rounded-lg bg-primary/10 py-2 text-primary">
          <span className="text-[0.6875rem] font-semibold tracking-wide uppercase">
            {MONTH_NAMES[month - 1].slice(0, 3)}
          </span>
          <span className="text-2xl leading-none font-semibold tabular-nums">{dayOfMonth}</span>
          <span className="pt-1 text-[0.6875rem] font-medium uppercase opacity-80">
            {event.dayOfWeek.slice(0, 3)}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="leading-snug font-medium text-pretty">{event.title}</h3>
            {event.leagueName && (
              <Badge variant="secondary" className="shrink-0">
                {event.leagueName}
              </Badge>
            )}
          </div>
          <p className="pt-1 text-sm text-muted-foreground">
            {event.teamName}
            {event.opponentName && ` vs ${event.opponentName}`}
          </p>
        </div>

        {event.photoUrl && <EventPhoto src={event.photoUrl} alt={event.title} />}
      </div>

      <div className="flex items-center justify-between gap-3 border-t px-4 py-2.5 text-xs text-muted-foreground">
        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-1">
          {event.time && (
            <span className="flex items-center gap-1.5">
              <ClockIcon className="size-3.5" />
              {event.time}
            </span>
          )}
          {event.venue && (
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPinIcon className="size-3.5 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </span>
          )}
        </div>
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 items-center gap-0.5 font-medium text-primary underline-offset-4 hover:underline"
          >
            Official site
            <ArrowUpRightIcon className="size-3.5" />
          </a>
        )}
      </div>
    </li>
  )
}

export default EventCard
