import type { EventCardData } from '@/lib/events'

import EventCard from './EventCard'

/** The horizontally scrolling row of cards, shared by server and client lists. */
const EventCards = ({ events }: { events: EventCardData[] }) => (
  <ul
    className="
      w-full
      flex flex-row flex-nowrap overflow-auto overflow-y-hidden justify-center-safe
      px-8
      gap-10
      [-ms-overflow-style:auto]
      [scrollbar-color:hsl(48,90%,79%)_transparent]
      [scrollbar-width:thin]
      snap-x snap-mandatory
    "
  >
    {events.map((event) => (
      <EventCard key={event.id} event={event} />
    ))}
  </ul>
)

export default EventCards
