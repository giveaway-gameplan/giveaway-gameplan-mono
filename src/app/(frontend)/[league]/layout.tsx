import { notFound } from 'next/navigation'

import TeamNav from '@/components/TeamNav'
import { getLeague, getTeams } from '@/lib/events'
import { leagueThemeCss } from '@/lib/theme'

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
  const themeCss = leagueThemeCss(league.theme)

  return (
    <div className="grid gap-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-10">
      {/* Lives only while a page of this league is showing, so other pages keep the site's colours. */}
      {themeCss && <style>{themeCss}</style>}
      <TeamNav league={league.slug} teams={teams} />
      <div>{children}</div>
    </div>
  )
}
