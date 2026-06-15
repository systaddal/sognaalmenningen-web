import Link from 'next/link'

import { client } from '@/sanity/client'
import { latestArticlesQuery } from '@/sanity/lib/queries'
import SanityImage from '@/components/SanityImage'

export const metadata = {
  title: 'Sognaalmenningen – Skap i lag. Snakk i lag.',
  description:
    'Ta med problemet dykkar og gå heim med ei løysing. Fasilitert møteplass og innovasjonsarena på Campus Sogndal.',
}

const pillars = [
  { title: 'Skap i lag', text: 'Designtenking-baserte sesjonar der vi byggjer løysingar saman – hands-on og strukturert.' },
  { title: 'Snakk i lag', text: 'Ein open møteplass der verksemder, organisasjonar og kommunar deler problem og innsikt.' },
  { title: 'Tenk i lag', text: 'Fasilitatorar loser dykk gjennom prosessen – frå uklart problem til konkret retning.' },
]

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('nn-NO', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function Home() {
  const articles = await client.fetch(latestArticlesQuery, {}, { next: { revalidate: 60 } })

  return (
    <>
      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-20 text-center sm:py-24">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand">
            Innovasjonsarena på Campus Sogndal
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-6xl">
            Skap i lag. Snakk i lag.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-ink/70">
            Ta med problemet dykkar – gå heim med ei løysing. Sognaalmenningen er ein
            fasilitert møteplass der vi brukar designtenking til å kome vidare saman.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/booking" className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
              Book ein økt
            </Link>
            <Link href="/om" className="rounded-full border border-brand px-7 py-3 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white">
              Les meir
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="rounded-2xl border border-mist bg-white p-8">
              <h2 className="text-xl font-bold text-brand">{p.title}</h2>
              <p className="mt-3 text-ink/70">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-bold text-ink">Siste artiklar</h2>
            <Link href="/artiklar" className="text-sm font-semibold text-brand hover:underline">Sjå alle →</Link>
          </div>

          {articles?.length ? (
            <div className="grid gap-8 sm:grid-cols-3">
              {articles.map((a) => (
                <Link key={a._id} href={`/artiklar/${a.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-white bg-white">
                  <div className="relative aspect-[16/10] overflow-hidden bg-mist">
                    {a.leadImage ? (
                      <SanityImage image={a.leadImage} alt={a.title} sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-brand/40">Sognaalmenningen</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs text-ink/50">{formatDate(a.publishedAt)}</p>
                    <h3 className="mt-2 text-lg font-semibold text-ink group-hover:text-brand">{a.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-ink/70">{a.lead}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-brand/30 bg-white p-10 text-center text-ink/60">
              Ingen artiklar er publiserte enno. Legg til artiklar i Sanity Studio
              (<span className="font-mono">/studio</span>), så dukkar dei opp her.
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
        <h2 className="text-3xl font-bold text-ink sm:text-4xl">Har de eit problem som treng nye auge?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">
          Book ei fasilitert økt, så hjelper vi dykk frå floke til konkret neste steg.
        </p>
        <Link href="/booking" className="mt-8 inline-block rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
          Book ein økt
        </Link>
      </section>
    </>
  )
}
