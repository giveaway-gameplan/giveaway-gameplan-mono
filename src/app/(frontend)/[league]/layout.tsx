import { notFound } from 'next/navigation'

import { getLeague, getTeams } from '@/lib/events'

import TeamNav from '../components/TeamNav'

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
    <div className="flex flex-col md:flex-row gap-10 md:mr-10">
      <TeamNav league={league.slug} teams={teams} />
      <div className="w-full max-w-screen overflow-x-hidden">{children}</div>
    </div>
  )
}
