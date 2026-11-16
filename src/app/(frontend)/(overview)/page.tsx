import { parseFilters } from '@/lib/events'

import PageEventLists from '@/components/PageEventLists'

export default async function MainPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  return <PageEventLists {...parseFilters(await searchParams)} />
}
