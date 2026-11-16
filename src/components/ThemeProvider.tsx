'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

/** Starts on the visitor's system setting and remembers a manual choice. */
const ThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <NextThemesProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
)

export default ThemeProvider
