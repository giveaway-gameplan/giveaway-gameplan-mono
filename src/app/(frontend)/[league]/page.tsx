import { parseFilters } from '@/lib/events'

import PageEventLists from '@/components/PageEventLists'

export default async function LeaguePage({
  params,
  searchParams,
}: {
  params: Promise<{ league: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const { league } = await params

  return <PageEventLists league={league} {...parseFilters(await searchParams)} />
}
