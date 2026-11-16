import { Skeleton } from '@/components/ui/skeleton'
import type { EventCardData } from '@/lib/events'

import EventCard from './EventCard'

const gridClass = 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'

/** The grid of cards, shared by the server-rendered and browser-fetched lists. */
const EventCards = ({ events }: { events: EventCardData[] }) => (
  <ul className={gridClass}>
    {events.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </ul>
)

export const EventCardsSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className={gridClass} aria-hidden>
    {Array.from({ length: count }, (_, index) => (
      <Skeleton key={index} className="h-32 rounded-xl" />
    ))}
  </div>
)

export const EmptyState = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-xl border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
    {children}
  </p>
)

export default EventCards
