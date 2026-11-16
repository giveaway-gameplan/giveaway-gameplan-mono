'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import type { NavLeague } from '@/lib/events'
import { cn } from '@/lib/utils'

import SportIcon from './SportIcon'

const tabClass = (active: boolean) =>
  cn(
    'flex shrink-0 items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
    active
      ? 'border-primary text-foreground'
      : 'border-transparent text-muted-foreground hover:text-foreground',
  )

const LeagueNav = ({ leagues }: { leagues: NavLeague[] }) => {
  const current = usePathname().split('/')[1]

  return (
    <nav aria-label="Leagues" className="-mx-3 flex overflow-x-auto [scrollbar-width:none]">
      <Link href="/" className={tabClass(!current)}>
        All leagues
      </Link>
      {leagues.map((league) => (
        <Link
          key={league.slug}
          href={`/${league.slug}`}
          className={tabClass(current === league.slug)}
        >
          <SportIcon sport={league.sport} className="size-4" />
          {league.name}
        </Link>
      ))}
    </nav>
  )
}

export default LeagueNav
