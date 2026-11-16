import { EventCardsSkeleton } from '@/components/EventCards'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => (
  <div className="space-y-8">
    <Skeleton className="h-8 w-56" />
    <EventCardsSkeleton count={6} />
  </div>
)

export default Loading
