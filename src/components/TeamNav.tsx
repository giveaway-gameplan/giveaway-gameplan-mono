'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { NavTeam } from '@/lib/events'
import { cn } from '@/lib/utils'

const ALL_TEAMS = 'all'

const TeamNav = ({ league, teams }: { league: string; teams: NavTeam[] }) => {
  const router = useRouter()
  const current = usePathname().split('/')[2] ?? ALL_TEAMS
  const hrefFor = (slug: string) => (slug === ALL_TEAMS ? `/${league}` : `/${league}/${slug}`)
  const options = [{ slug: ALL_TEAMS, name: 'All teams' }, ...teams]

  return (
    <>
      {/* Small screens: a single dropdown instead of a long list. */}
      <div className="md:hidden">
        <Select value={current} onValueChange={(slug) => router.push(hrefFor(slug))}>
          <SelectTrigger aria-label="Team" className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {options.map((team) => (
              <SelectItem key={team.slug} value={team.slug}>
                {team.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <nav aria-label="Teams" className="sticky top-32 hidden md:block">
        <p className="px-3 pb-2 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Teams
        </p>
        <ScrollArea className="h-[calc(100svh-11rem)] pr-3">
          <ul className="space-y-0.5">
            {options.map((team) => (
              <li key={team.slug}>
                <Link
                  href={hrefFor(team.slug)}
                  aria-current={current === team.slug ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-1.5 text-sm transition-colors',
                    current === team.slug
                      ? 'bg-primary/10 font-medium text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )}
                >
                  {team.name}
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </nav>
    </>
  )
}

export default TeamNav
