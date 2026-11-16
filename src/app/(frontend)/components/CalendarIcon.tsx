import { MONTH_NAMES } from '@/lib/dates'

/** `day` is a YYYY-MM-DD calendar day. */
const CalendarIcon = ({ day }: { day: string }) => {
  const [, month, dayOfMonth] = day.split('-').map(Number)

  return (
    <div className="w-24 my-5 text-shadow-none">
      <div className="h-8 bg-rose-700 text-sky-100 rounded-t-md flex items-center justify-center">
        {MONTH_NAMES[month - 1]}
      </div>
      <div className="h-12 text-3xl bg-white/80 text-black rounded-b-md flex items-center justify-center">
        {dayOfMonth}
      </div>
    </div>
  )
}

export default CalendarIcon
