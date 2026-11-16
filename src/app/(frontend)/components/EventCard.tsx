import type { EventCardData } from '@/lib/events'
import BallIcon from './BallIcon'
import CalendarIcon from './CalendarIcon'

const EventCard = ({ event }: { event: EventCardData }) => {
  return (
    <li
      className="
      text-center font-extrabold
      p-4 mt-10 mb-10 mx-5 rounded-2xl
      min-w-full min-h-fit md:min-w-120 md:w-120 h-140
      
      bg-[hsl(231,30%,15%)]
      shadow-[inset_0px_0px_70px_hsl(231,20%,1%),_0px_5px_10px_10px_hsl(231,20%,1%),_0px_-2px_8px_5px_hsl(231,20%,75%)]

      flex flex-col justify-between items-center
      snap-center
      text-shadow-none
      "
    >
      <p className="text-xl">{event.teamName.toUpperCase()}</p>
      <p>{event.opponentName ? `VS ${event.opponentName}` : '\u00A0'}</p>
      <div className="w-20 h-20 mb-7">
        <BallIcon sport={event.sport} />
      </div>
      <p
        className="
        w-full px-10 py-3 rounded-md
        bg-amber-500/60
        shadow-[inset_2px_2px_10px_theme(colors.amber.950),inset_-2px_-2px_10px_theme(colors.amber.100)]
        "
      >
        {event.title}
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-x-6">
        <CalendarIcon day={event.day} />
        <p>{event.dayOfWeek.toUpperCase()}</p>
        {event.time && <p>{event.time}</p>}
      </div>
      <div className="w-full flex flex-row justify-evenly items-baseline pt-4">
        {event.venue && <p>📍 {event.venue}</p>}
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
          underline underline-offset-4
          px-4 py-3 rounded-xl
          shadow-sm shadow-slate-400
          inset-shadow-xs inset-shadow-slate-400
          bg-linear-to-tr from-slate-400/90 from-0% via-zinc-900/5 via-50% to-slate-400/10 to-100%
          hover:from-slate-400/30  hover:to-slate-400/90
          focus:from-slate-400/30  focus:to-slate-400/90
      "
          >
            Visit official site
          </a>
        )}
      </div>
    </li>
  )
}

export default EventCard
