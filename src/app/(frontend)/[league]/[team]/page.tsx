import { parseFilters } from '@/lib/events'

import PageEventLists from '@/components/PageEventLists'

export default async function TeamPage({
  params,
  searchParams,
}: {
  params: Promise<{ league: string; team: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { league, team } = await params

  return <PageEventLists league={league} team={team} {...parseFilters(await searchParams)} />
}
