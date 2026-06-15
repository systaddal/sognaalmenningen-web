import Link from 'next/link'

import { client } from '@/sanity/client'
import { allArticlesQuery } from '@/sanity/lib/queries'
import SanityImage from '@/components/SanityImage'

export const metadata = {
  title: 'Artiklar',
  description: 'Innsikt, døme og nytt frå Sognaalmenningen på Campus Sogndal.',
}

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('nn-NO', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function ArtiklarPage() {
  const articles = await client.fetch(allArticlesQuery, {}, { next: { revalidate: 60 } })

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-ink">Artiklar</h1>
      <p className="mt-3 max-w-2xl text-ink/70">Innsikt, døme og nytt frå Sognaalmenningen.</p>

      {articles?.length ? (
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <Link key={a._id} href={`/artiklar/${a.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-mist bg-white">
              <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                {a.leadImage ? (
                  <SanityImage image={a.leadImage} alt={a.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center text-brand/40">Sognaalmenningen</div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs text-ink/50">{formatDate(a.publishedAt)}</p>
                <h2 className="mt-2 text-lg font-semibold text-ink group-hover:text-brand">{a.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-ink/70">{a.lead}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-2xl border border-dashed border-brand/30 bg-mist/50 p-10 text-center text-ink/60">
          Ingen artiklar er publiserte enno. Legg til ein <strong>Artikkel</strong> i Sanity Studio
          (<span className="font-mono">/studio</span>).
        </p>
      )}
    </div>
  )
}
