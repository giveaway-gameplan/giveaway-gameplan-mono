'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme()

  // Both icons are rendered and CSS shows the right one, so the button is
  // correct before the browser has told React which theme is active.
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Switch between light and dark mode"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="dark:hidden" />
    </Button>
  )
}

export default ThemeToggle
