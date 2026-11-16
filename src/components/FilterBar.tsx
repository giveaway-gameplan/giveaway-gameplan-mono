'use client'

import { format } from 'date-fns'
import { CalendarIcon, XIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DAYS_OF_WEEK, isIsoDay, MONTH_NAMES } from '@/lib/dates'
import { cn } from '@/lib/utils'

type FilterKey = 'date' | 'dow' | 'month'

// Weeks start on Monday in the dropdown.
const WEEKDAYS = [...DAYS_OF_WEEK.slice(1), DAYS_OF_WEEK[0]]

const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1)

/** A YYYY-MM-DD day as a Date at local midnight, which is what the calendar works in. */
const toLocalDate = (day: string) => {
  const [year, month, dayOfMonth] = day.split('-').map(Number)
  return new Date(year, month - 1, dayOfMonth)
}

const FilterBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [calendarOpen, setCalendarOpen] = useState(false)

  const dateParam = searchParams.get('date')
  const date = isIsoDay(dateParam) ? toLocalDate(dateParam) : undefined
  const dow = searchParams.get('dow') ?? ''
  const month = searchParams.get('month') ?? ''
  const hasFilter = Boolean(date || dow || month)

  // Only one filter applies at a time, so choosing one replaces the others.
  const setFilter = (key?: FilterKey, value?: string) => {
    router.replace(key && value ? `${pathname}?${key}=${value}` : pathname, { scroll: false })
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start font-normal sm:w-52',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date ? format(date, 'EEE, MMM d, yyyy') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            defaultMonth={date}
            onSelect={(selected) => {
              setFilter('date', selected ? format(selected, 'yyyy-MM-dd') : undefined)
              setCalendarOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>

      <Select value={dow} onValueChange={(value) => setFilter('dow', value)}>
        <SelectTrigger aria-label="Day of the week" className="flex-1 sm:w-40 sm:flex-none">
          <SelectValue placeholder="Day of the week" />
        </SelectTrigger>
        <SelectContent>
          {WEEKDAYS.map((day) => (
            <SelectItem key={day} value={day}>
              {capitalize(day)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={month} onValueChange={(value) => setFilter('month', value)}>
        <SelectTrigger aria-label="Month" className="flex-1 sm:w-36 sm:flex-none">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_NAMES.map((name, index) => (
            <SelectItem key={name} value={String(index + 1)}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilter && (
        <Button variant="ghost" onClick={() => setFilter()}>
          <XIcon />
          Clear
        </Button>
      )}
    </div>
  )
}

export default FilterBar
