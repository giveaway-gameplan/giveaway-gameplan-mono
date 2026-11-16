import { notFound } from 'next/navigation'

import TeamNav from '@/components/TeamNav'
import { getLeague, getTeams } from '@/lib/events'

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ league: string }>
}) {
  const { league: leagueSlug } = await params
  const league = await getLeague(leagueSlug)
  if (!league) notFound()

  const teams = await getTeams(league.id)

  return (
    <div className="grid gap-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
      <TeamNav league={league.slug} teams={teams} />
      <div>{children}</div>
    </div>
  )
}
