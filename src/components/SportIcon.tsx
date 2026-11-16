import Image from 'next/image'

import type { Sport } from '@/lib/events'
import { cn } from '@/lib/utils'

const ICONS: Record<Sport, string> = {
  baseball: '/baseball-svgrepo-com1.svg',
  basketball: '/basketball-svgrepo-com.svg',
  football: '/football-ball-svgrepo-com.svg',
  hockey: '/hockey-stick-sport-winter-svgrepo-com.svg',
}

// The icon files are drawn in a light grey for dark backgrounds, so they are
// inverted in light mode.
const SportIcon = ({ sport, className }: { sport: Sport; className?: string }) => (
  <Image
    src={ICONS[sport]}
    width={20}
    height={20}
    alt=""
    className={cn('invert dark:invert-0', className)}
  />
)

export default SportIcon
