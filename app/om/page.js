import { client } from '@/sanity/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import SanityImage from '@/components/SanityImage'
import PortableTextBody from '@/components/PortableTextBody'

const SLUG = 'om'

export async function generateMetadata() {
  const page = await client.fetch(pageBySlugQuery, { slug: SLUG }, { next: { revalidate: 60 } })
  const title = page?.seoTitle || page?.title || 'Om oss'
  const description = page?.seoDescription || page?.heroIntro || undefined
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: page?.heroImage
        ? [{ url: urlForImage(page.heroImage).width(1200).height(630).fit('crop').url() }]
        : undefined,
    },
  }
}

export default async function OmPage() {
  const page = await client.fetch(pageBySlugQuery, { slug: SLUG }, { next: { revalidate: 60 } })

  const heroTitle = page?.heroTitle || page?.title || 'Om Sognaalmenningen'
  const heroIntro =
    page?.heroIntro ||
    'Sognaalmenningen er ein fasilitert møteplass og innovasjonsarena på Campus Sogndal. Vi samlar verksemder, organisasjonar og kommunar i Sogn og Fjordane til designtenking-baserte sesjonar – der eit konkret problem blir til ei konkret løysing.'

  return (
    <article>
      <section className="bg-mist">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{heroTitle}</h1>
          <p className="mt-6 max-w-2xl text-lg text-ink/70">{heroIntro}</p>
        </div>
        {page?.heroImage && (
          <div className="mx-auto max-w-5xl px-6 pb-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <SanityImage image={page.heroImage} alt={heroTitle} sizes="(max-width: 1024px) 100vw, 1024px" className="object-cover" priority />
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16">
        {page?.body ? (
          <PortableTextBody value={page.body} />
        ) : (
          <div className="rounded-2xl border border-dashed border-brand/30 bg-mist/50 p-8 text-ink/70">
            <p className="mb-3">
              Denne sida hentar innhald frå Sanity. Opprett ei <strong>Side</strong> med slug{' '}
              <span className="font-mono">om</span> i Studio (<span className="font-mono">/studio</span>),
              så viser brødteksten her.
            </p>
            <p>Konseptet vårt: organisasjonar tar med seg eit problem og går heim med ei løysing. Slagordet er «Skap i lag. Snakk i lag.»</p>
          </div>
        )}
      </section>
    </article>
  )
}
