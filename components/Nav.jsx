'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/image'

const links = [
  { href: '/', label: 'Heim' },
  { href: '/om', label: 'Om oss' },
  { href: '/artiklar', label: 'Artiklar' },
  { href: '/booking', label: 'Booking' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Nav({ settings }) {
  const [open, setOpen] = useState(false)
  const title = settings?.title || 'Sognaalmenningen'
  const logoUrl = settings?.logo
    ? urlForImage(settings.logo).height(120).fit('max').auto('format').url()
    : null

  return (
    <header className="sticky top-0 z-50 border-b border-mist bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-center">
          {logoUrl ? (
            <span className="relative block h-12 w-48">
              <Image src={logoUrl} alt={title} fill sizes="192px" className="object-contain object-left" />
            </span>
          ) : (
            <span className="text-lg font-bold tracking-tight text-brand">{title}</span>
          )}
        </Link>

        {/* Desktop-meny */}
        <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-ink/80 transition hover:text-brand">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburgarknapp */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Lukk meny' : 'Opne meny'}
          aria-expanded={open}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink md:hidden"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="6" y1="18" x2="18" y2="6" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobilmeny */}
      {open && (
        <ul className="border-t border-mist bg-white px-6 py-4 text-sm font-medium md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-ink/80 transition hover:text-brand"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
