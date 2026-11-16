import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import Header from '@/components/Header'
import ThemeProvider from '@/components/ThemeProvider'
import { getLeagues } from '@/lib/events'
import { TAGLINE } from '@/lib/site'

import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })

export const metadata: Metadata = {
  title: 'Giveaway Gameplan',
  description: 'Your one stop shop for finding stadium giveaways',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const leagues = await getLeagues()

  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col antialiased">
        <ThemeProvider>
          <Header leagues={leagues} />
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">{children}</main>
          {/* The header has no room for the tagline on small screens. */}
          <footer className="border-t px-4 py-6 text-center text-xs text-muted-foreground md:hidden">
            {TAGLINE}
          </footer>
        </ThemeProvider>
      </body>
    </html>
  )
}
