import { Geist, Geist_Mono } from 'next/font/google'

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
      </body>
    </html>
  )
}
