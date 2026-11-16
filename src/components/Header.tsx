import Image from 'next/image'
import Link from 'next/link'

import type { NavLeague } from '@/lib/events'
import { TAGLINE } from '@/lib/site'

import LeagueNav from './LeagueNav'
import ThemeToggle from './ThemeToggle'

const Header = ({ leagues }: { leagues: NavLeague[] }) => (
  <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
    <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
      <Link href="/" className="flex items-center gap-2.5">
        <Image
          src="/logo_only.svg"
          width={913}
          height={888}
          alt=""
          className="h-8 w-auto"
          priority
        />
        <span className="text-base font-semibold tracking-tight">Giveaway Gameplan</span>
      </Link>
      <div className="flex items-center gap-3">
        <p className="hidden text-sm text-muted-foreground md:block">{TAGLINE}</p>
        <ThemeToggle />
      </div>
    </div>
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
      <LeagueNav leagues={leagues} />
    </div>
  </header>
)

export default Header
