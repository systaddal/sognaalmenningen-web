import { notFound } from 'next/navigation'

import { client } from '@/sanity/client'
import { articleBySlugQuery, articleSlugsQuery } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import SanityImage from '@/components/SanityImage'
import PortableTextBody from '@/components/PortableTextBody'

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('nn-NO', { day: 'numeric', month: 'long', year: 'numeric' })
}

export async function generateStaticParams() {
  const slugs = await client.fetch(articleSlugsQuery)
  return (slugs || []).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug }, { next: { revalidate: 60 } })
  if (!article) return {}
  const description = article.lead || undefined
  return {
    title: article.title,
    description,
    openGraph: {
      type: 'article',
      title: article.title,
      description,
      images: article.leadImage
        ? [{ url: urlForImage(article.leadImage).width(1200).height(630).fit('crop').url() }]
        : undefined,
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await client.fetch(articleBySlugQuery, { slug }, { next: { revalidate: 60 } })

  if (!article) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm text-ink/50">{formatDate(article.publishedAt)}</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink">{article.title}</h1>
      {article.author && <p className="mt-3 text-ink/60">Av {article.author}</p>}

      {article.categories?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {article.categories.map((c) => (
            <span key={c._id} className="rounded-full bg-mist px-3 py-1 text-xs font-medium text-brand">{c.title}</span>
          ))}
        </div>
      )}

      {article.leadImage && (
        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
          <SanityImage image={article.leadImage} alt={article.title} sizes="(max-width: 768px) 100vw, 768px" className="object-cover" priority />
        </div>
      )}

      {article.lead && <p className="mt-8 text-xl leading-relaxed text-ink/80">{article.lead}</p>}

      <div className="mt-8">
        <PortableTextBody value={article.body} />
      </div>
    </article>
  )
}
