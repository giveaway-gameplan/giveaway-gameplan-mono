import Link from 'next/link'

import { Button } from '@/components/ui/button'

const NotFound = () => (
  <div className="flex flex-col items-center gap-4 py-24 text-center">
    <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
    <p className="text-sm text-muted-foreground">That league or team doesn’t exist.</p>
    <Button asChild>
      <Link href="/">See all giveaways</Link>
    </Button>
  </div>
)

export default NotFound
