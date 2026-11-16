import Image from 'next/image'

import type { Sport } from '@/lib/events'

const ICONS: Record<Sport, string> = {
  baseball: '/baseball-svgrepo-com1.svg',
  basketball: '/basketball-svgrepo-com.svg',
  football: '/football-ball-svgrepo-com.svg',
  hockey: '/hockey-stick-sport-winter-svgrepo-com.svg',
}

const BallIcon = ({ sport }: { sport: Sport | null }) => (
  <Image src={ICONS[sport ?? 'baseball']} width={100} height={100} alt="" />
)

export default BallIcon
