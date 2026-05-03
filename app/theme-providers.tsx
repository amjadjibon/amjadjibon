'use client'

import { ThemeProvider } from 'next-themes'
import siteMetadata from '@/data/siteMetadata'

// next-themes injects an inline <script> for SSR FOUC prevention.
// React 19 warns that inline scripts in components won't re-execute on
// client navigation — which is correct and expected for this script.
// Remove this filter once next-themes ships a React 19-compatible release.
if (typeof console !== 'undefined' && process.env.NODE_ENV !== 'production') {
  const _orig = console.error.bind(console)
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('script tag while rendering')) return
    _orig(...args)
  }
}

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
