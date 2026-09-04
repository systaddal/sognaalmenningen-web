import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'

import './globals.css'
import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://sognaalmenningen.no'),
  title: {
    default: 'Sognaalmenningen',
    template: '%s | Sognaalmenningen',
  },
  description: 'Fasilitert møteplass og innovasjonsarena på Campus Sogndal',
  openGraph: {
    type: 'website',
    locale: 'nn_NO',
    siteName: 'Sognaalmenningen',
    title: 'Sognaalmenningen',
    description: 'Fasilitert møteplass og innovasjonsarena på Campus Sogndal',
  },
}

export default async function RootLayout({ children }) {
  const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })

  return (
    <html
      lang="nn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav settings={settings} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} />
        {/* Innsikt-teljaren. Hovudkjelda for besøkstal: han sender vertsnamnet
            med, og tala hamnar rett i vår eigen database. Ingen
            informasjonskapslar, inga månadsgrense. */}
        <Script
          src="https://innsikt.selsengsystaddal.no/teljar.js"
          data-til="https://innsikt.selsengsystaddal.no/api/spor"
          strategy="afterInteractive"
        />
        {/* Vercel Web Analytics. Ligg igjen som eit ekstra syn i Vercel sitt
            eige dashbord — API-et deira gir ikkje ut tal på Hobby-planen.
            Må lastast via next/script: React køyrer ikkje vanlege
            script-taggar som ligg i komponenttreet. */}
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
