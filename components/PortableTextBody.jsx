import { PortableText } from 'next-sanity'

import SanityImage from '@/components/SanityImage'

const components = {
  block: {
    normal: ({ children }) => <p className="mb-4 leading-relaxed text-ink/90">{children}</p>,
    h2: ({ children }) => <h2 className="mt-10 mb-4 text-2xl font-bold text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold text-ink">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-4 border-brand pl-4 italic text-ink/80">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const external = href.startsWith('http')
      return (
        <a
          href={href}
          className="text-brand underline underline-offset-2 hover:opacity-80"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <span className="relative my-6 block aspect-[16/9] w-full overflow-hidden rounded-lg">
          <SanityImage image={value} alt={value.alt || ''} sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </span>
      )
    },
  },
}

export default function PortableTextBody({ value }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
