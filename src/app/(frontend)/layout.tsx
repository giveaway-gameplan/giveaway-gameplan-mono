import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import './globals.css'
import Header from './components/header'
import LeagueNav from './components/LeagueNav'
import { getLeagues } from '@/lib/events'

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Giveaway Gameplan',
  description: 'Your one stop shop for finding stadium giveaways',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const leagues = await getLeagues()

  return (
    <html
      lang="en"
      className="
      selection:bg-amber-500 selection:text-slate-900
      bg-[hsl(231,89%,7%)]
      text-[hsl(48,90%,85%)]
      text-shadow-[hsl(231,20%,0%)] text-shadow-lg
      "
    >
      <body
        className={`
          ${josefinSans.className} antialiased
          pb-24
          flex flex-col gap-10
          `}
      >
        <Header />
        <LeagueNav leagues={leagues} />
        <main>{children}</main>
      </body>
    </html>
  )
}
