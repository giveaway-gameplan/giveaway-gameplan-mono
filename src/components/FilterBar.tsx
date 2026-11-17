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
import type { TeamLocation } from '@/lib/events'
import { REGIONS } from '@/lib/regions'
import { cn } from '@/lib/utils'

type WhenKey = 'date' | 'dow' | 'month'

/** Select value that stands for "no filter", since an item can't have an empty one. */
const ANY = 'any'

const locationKey = ({ city, state }: TeamLocation) => `${city}|${state}`

// Weeks start on Monday in the dropdown.
const WEEKDAYS = [...DAYS_OF_WEEK.slice(1), DAYS_OF_WEEK[0]]

const capitalize = (word: string) => word[0].toUpperCase() + word.slice(1)

/** A YYYY-MM-DD day as a Date at local midnight, which is what the calendar works in. */
const toLocalDate = (day: string) => {
  const [year, month, dayOfMonth] = day.split('-').map(Number)
  return new Date(year, month - 1, dayOfMonth)
}

const FilterBar = ({ locations }: { locations: TeamLocation[] }) => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [calendarOpen, setCalendarOpen] = useState(false)

  const dateParam = searchParams.get('date')
  const date = isIsoDay(dateParam) ? toLocalDate(dateParam) : undefined
  const dow = searchParams.get('dow') ?? ''
  const month = searchParams.get('month') ?? ''
  const city = searchParams.get('city') ?? ''
  const state = searchParams.get('state') ?? ''
  const hasFilter = Boolean(date || dow || month || city || state)

  const states = [...new Set(locations.map((location) => location.state))].sort((a, b) =>
    REGIONS[a].localeCompare(REGIONS[b]),
  )
  // Picking a state narrows the cities on offer to that state's.
  const cities = state ? locations.filter((location) => location.state === state) : locations
  const selectedCity = city && cities.find((location) => location.city === city)

  const setParams = (changes: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams)
    for (const [key, value] of Object.entries(changes)) {
      if (value) params.set(key, value)
      else params.delete(key)
    }
    const query = params.toString()
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false })
  }

  // Only one of date, day of the week and month applies at a time, so choosing
  // one replaces the others. Where the event is narrows whichever is chosen.
  const setFilter = (key: WhenKey, value?: string) => {
    setParams({ date: undefined, dow: undefined, month: undefined, [key]: value })
  }

  const setState = (value: string) => {
    setParams({ state: value === ANY ? undefined : value, city: undefined })
  }

  // A city name can repeat across states (Portland), so a city brings its state along.
  const setCity = (value: string) => {
    const location = cities.find((candidate) => locationKey(candidate) === value)
    setParams(location ? { city: location.city, state: location.state } : { city: undefined })
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

      {locations.length > 0 && (
        <>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger aria-label="State" className="flex-1 sm:w-40 sm:flex-none">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY}>All states</SelectItem>
              {states.map((code) => (
                <SelectItem key={code} value={code}>
                  {REGIONS[code]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCity ? locationKey(selectedCity) : ''} onValueChange={setCity}>
            <SelectTrigger aria-label="City" className="flex-1 sm:w-44 sm:flex-none">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ANY}>All cities</SelectItem>
              {cities.map((location) => (
                <SelectItem key={locationKey(location)} value={locationKey(location)}>
                  {location.city}, {location.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}

      {hasFilter && (
        <Button variant="ghost" onClick={() => router.replace(pathname, { scroll: false })}>
          <XIcon />
          Clear
        </Button>
      )}
    </div>
  )
}

export default FilterBar
