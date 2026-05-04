import '../css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

import type { Metadata } from 'next'
import { Geist_Mono, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics, type AnalyticsConfig } from 'pliny/analytics'
import { type SearchConfig, SearchProvider } from 'pliny/search'
import Aurora from '@/app/components/Aurora'
import Footer from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  icons: {
    icon: [{ url: '/static/favicons/favicon-v3.png', sizes: '64x64', type: 'image/png' }],
    apple: [{ url: '/static/favicons/favicon-v3.png', sizes: '64x64' }],
  },
  manifest: '/static/favicons/site.webmanifest',
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${geistMono.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-background pl-[calc(100vw-100%)] text-foreground antialiased">
        <Script
          id="adsense-auto-ads"
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8416805375023197"
          crossOrigin="anonymous"
        />
        <ThemeProviders>
          <div className="pointer-events-none fixed inset-0 z-0">
            <Aurora colorStops={['#d87943', '#ececec', '#d87943']} amplitude={0.55} blend={0.35} />
          </div>
          <div className="relative z-10">
            <div className="pointer-events-none fixed inset-0 z-0 bg-white/70 dark:bg-black/55 backdrop-blur-[1px]" />
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
            <div className="relative z-10">
              <SectionContainer>
                <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                  <Header />
                  <main className="mb-auto">{children}</main>
                </SearchProvider>
                <Footer />
              </SectionContainer>
            </div>
          </div>
        </ThemeProviders>
      </body>
    </html>
  )
}
