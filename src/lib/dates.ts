export const DAYS_OF_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
] as const

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number]

export const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/

export const isIsoDay = (value: unknown): value is string =>
  typeof value === 'string' && ISO_DAY.test(value) && !Number.isNaN(Date.parse(value))

/**
 * Event dates are calendar days at the venue, not instants. They are stored at
 * noon UTC so the day reads the same in every timezone.
 */
export const dayToStoredDate = (day: string): string => `${day}T12:00:00.000Z`

export const storedDateToDay = (value: string | Date): string =>
  new Date(value).toISOString().slice(0, 10)

export const dayOfWeekFor = (day: string): DayOfWeek =>
  DAYS_OF_WEEK[new Date(dayToStoredDate(day)).getUTCDay()]

/** Today's calendar day in a given timezone, as YYYY-MM-DD. */
export const todayIn = (timeZone: string): string =>
  new Intl.DateTimeFormat('en-CA', { timeZone }).format(new Date())

/**
 * Accepts the ways people type a time ("7pm", "7:30 PM", "7:30 p.m.", "19:30")
 * and returns it as "7:30 PM". Returns null when it can't be understood.
 */
export const normalizeTime = (input: string): string | null => {
  const match = /^(\d{1,2})(?::(\d{2}))?\s*(?:(a|p)\.?\s*m?\.?)?$/i.exec(input.trim())
  if (!match) return null

  let hour = Number(match[1])
  const minute = Number(match[2] ?? '0')
  let meridiem = match[3]?.toUpperCase()
  if (minute > 59) return null

  if (meridiem) {
    if (hour < 1 || hour > 12) return null
  } else {
    // Without AM/PM only an unambiguous 24-hour time is accepted.
    if (hour > 23 || (hour >= 1 && hour <= 12)) return null
    meridiem = hour >= 12 ? 'P' : 'A'
    hour = hour % 12 || 12
  }

  return `${hour}:${String(minute).padStart(2, '0')} ${meridiem}M`
}
