import { Suspense } from 'react'

import { currentMonth, type EventFilters } from '@/lib/events'

import EventList from './EventList'
import FilterBar from './FilterBar'
import FilteredEventList from './FilteredEventList'
import TodayEventList from './TodayEventList'

const PageEventLists = ({ league, team, date, dow, month }: EventFilters) => {
  if (date || dow || month) {
    return <FilteredEventList league={league} team={team} date={date} dow={dow} month={month} />
  }

  return (
    <div className="text-[hsl(48,90%,95%)] flex flex-col gap-12 rounded-2xl bg-white/4 backdrop-blur-[1px] pb-10">
      <Suspense fallback={null}>
        <FilterBar />
      </Suspense>
      <div className="flex flex-col items-center gap-10 mx-10">
        <h3 className="text-4xl font-bold">Today&apos;s giveaways</h3>
        <TodayEventList league={league} team={team} />
      </div>
      <div className="flex flex-col items-center gap-5 mx-10">
        <h3 className="text-4xl font-bold">All giveaways this month</h3>
        <EventList league={league} team={team} month={currentMonth()} />
      </div>
    </div>
  )
}

export default PageEventLists
