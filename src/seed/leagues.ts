import type { League } from '@/payload-types'

import ahlEvents from './data/ahl'
import nbaEvents from './data/nba'
import gLeagueEvents from './data/nba-g-league'
import nhlEvents from './data/nhl'
import { ahlTeams, gleagueNbaTeams, mlbTeams, nbaTeams, nflTeams, nhlTeams } from './data/teams'
import type { LegacyEvent } from './types'

export type SeedLeague = {
  name: string
  slug: string
  sport: League['sport']
  teams: string[][]
  events: LegacyEvent[]
  /** Team slugs that were misspelled in the legacy records. */
  teamSlugFixes?: Record<string, string>
  /** Opponent names that were misspelled, or have changed, in the legacy records. */
  opponentFixes?: Record<string, string>
}

// Listed in the order they appear in the site navigation.
export const seedLeagues: SeedLeague[] = [
  { name: 'MLB', slug: 'mlb', sport: 'baseball', teams: mlbTeams, events: [] },
  { name: 'NFL', slug: 'nfl', sport: 'football', teams: nflTeams, events: [] },
  { name: 'NBA', slug: 'nba', sport: 'basketball', teams: nbaTeams, events: nbaEvents },
  { name: 'NHL', slug: 'nhl', sport: 'hockey', teams: nhlTeams, events: nhlEvents },
  {
    name: 'AHL',
    slug: 'ahl',
    sport: 'hockey',
    teams: ahlTeams,
    events: ahlEvents,
    teamSlugFixes: { firebrids: 'firebirds', regin: 'reign', rockets: 'rocket' },
    opponentFixes: {
      'Hersey Bears': 'Hershey Bears',
      'Syracuse Crush': 'Syracuse Crunch',
      'Bankersfield Condors': 'Bakersfield Condors',
      'Ontario Regin': 'Ontario Reign',
      'Grand Rapid Griffins': 'Grand Rapids Griffins',
      'Rockford Icehogs': 'Rockford IceHogs',
      'Toronto Marlins': 'Toronto Marlies',
      'Laval Rockets': 'Laval Rocket',
      'Scranton Penguins': 'Wilkes-Barre/Scranton Penguins',
    },
  },
  {
    name: 'NBA G League',
    slug: 'gleaguenba',
    sport: 'basketball',
    teams: gleagueNbaTeams,
    events: gLeagueEvents,
    opponentFixes: {
      'Nobelsville Boom': 'Noblesville Boom',
      'Rio City Remix': 'Rip City Remix',
    },
  },
]
