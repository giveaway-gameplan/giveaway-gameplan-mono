import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { MONTH_NAMES } from '@/lib/dates'
import {
  currentMonth,
  type EventFilters,
  getLeague,
  getTeamLocations,
  getTeams,
} from '@/lib/events'

import EventList from './EventList'
import FilterBar from './FilterBar'
import TodayEventList from './TodayEventList'

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="space-y-4">
    <h2 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">{title}</h2>
    {children}
  </section>
)

const filterHeading = ({ date, dow, month }: EventFilters) => {
  if (date) {
    const [year, monthNumber, day] = date.split('-').map(Number)
    return `${MONTH_NAMES[monthNumber - 1]} ${day}, ${year}`
  }
  if (dow) return `Upcoming ${dow[0].toUpperCase()}${dow.slice(1)}s`
  return MONTH_NAMES[Number(month) - 1]
}

/** The league or team being viewed, for the page heading. */
const pageTitle = async (leagueSlug?: string, teamSlug?: string) => {
  if (!leagueSlug) return 'All giveaways'
  const league = await getLeague(leagueSlug)
  if (!league) notFound()
  if (!teamSlug) return `${league.name} giveaways`
  const team = (await getTeams(league.id)).find(({ slug }) => slug === teamSlug)
  if (!team) notFound()
  return team.name
}

const PageEventLists = async (filters: EventFilters) => {
  const { league, team, date, dow, month, city, state } = filters
  const month_ = currentMonth()
  // A team only plays in one place, so its page has nothing to narrow down.
  const locations = team ? [] : await getTeamLocations(league)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{await pageTitle(league, team)}</h1>
        <Suspense fallback={null}>
          <FilterBar locations={locations} />
        </Suspense>
      </div>

      {date || dow || month ? (
        <Section title={filterHeading(filters)}>
          <EventList {...filters} />
        </Section>
      ) : (
        <>
          <Section title="Today">
            {/* Keyed so a new place shows the loading state rather than the old list. */}
            <TodayEventList
              key={`${city}|${state}`}
              league={league}
              team={team}
              city={city}
              state={state}
            />
          </Section>
          <Section title={`This month · ${MONTH_NAMES[Number(month_) - 1]}`}>
            <EventList league={league} team={team} city={city} state={state} month={month_} />
          </Section>
        </>
      )}
    </div>
  )
}

export default PageEventLists
