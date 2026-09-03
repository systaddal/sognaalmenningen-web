import Link from 'next/link'

import { client } from '@/sanity/client'
import { pageBySlugQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import SanityImage from '@/components/SanityImage'
import PortableTextBody from '@/components/PortableTextBody'
import PodcastFeed from '@/components/PodcastFeed'
import { fetchEpisodes, selectEpisodes } from '@/lib/podcast'

const SLUG = 'sogndalspraten'

export async function generateMetadata() {
  const page = await client.fetch(pageBySlugQuery, { slug: SLUG }, { next: { revalidate: 60 } })
  const title = page?.seoTitle || page?.title || 'Sogndalspraten'
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

export default async function SogndalspratenPage() {
  const page = await client.fetch(pageBySlugQuery, { slug: SLUG }, { next: { revalidate: 60 } })

  const heroTitle = page?.heroTitle || page?.title || 'Sogndalspraten'
  const heroIntro =
    page?.heroIntro ||
    'Podcasten frå Sognaalmenningen. Me snakkar med folk som prøver, lærer og byggjer i praksis – på Campus Sogndal, i kommunen og i Sogn.'

  // Introepisoden ligg øvst dersom feltet er sett i Studio. Resten kjem nyaste først.
  const episodes = page?.podcastRssUrl
    ? selectEpisodes(await fetchEpisodes(page.podcastRssUrl), {
        pin: page.podcastPinnedMatch,
        limit: page.podcastCount,
      })
    : []

  const ctaHref = page?.ctaHref || '/kontakt'
  const ctaIsExternal = /^(https?:|mailto:|tel:)/i.test(ctaHref)

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

      {page?.body ? (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <PortableTextBody value={page.body} />
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-2xl border border-dashed border-brand/30 bg-mist/50 p-8 text-ink/70">
            <p>
              Denne sida hentar innhald frå Sanity. Opprett ei <strong>Side</strong> med slug{' '}
              <span className="font-mono">sogndalspraten</span> i Studio (<span className="font-mono">/studio</span>),
              så viser teksten her.
            </p>
          </div>
        </section>
      )}

      <PodcastFeed
        title={page?.podcastTitle || 'Episodar'}
        intro={page?.podcastIntro}
        showUrl={page?.podcastShowUrl}
        showLabel={page?.podcastShowLabel}
        episodes={episodes}
      />

      {page?.ctaTitle && (
        <section className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{page.ctaTitle}</h2>
          {page.ctaText && <p className="mx-auto mt-4 max-w-2xl text-lg text-ink/70">{page.ctaText}</p>}
          {page.ctaButtonLabel &&
            (ctaIsExternal ? (
              <a
                href={ctaHref}
                className="mt-8 inline-block rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                {page.ctaButtonLabel}
              </a>
            ) : (
              <Link
                href={ctaHref}
                className="mt-8 inline-block rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                {page.ctaButtonLabel}
              </Link>
            ))}
        </section>
      )}
    </article>
  )
}
