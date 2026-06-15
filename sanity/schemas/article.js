import { ComposeIcon } from '@sanity/icons'

export default {
  name: 'article',
  title: 'Artikkel',
  type: 'document',
  icon: ComposeIcon,
  fields: [
    { name: 'title', title: 'Tittel', type: 'string', validation: (r) => r.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    },
    { name: 'publishedAt', title: 'Publiseringsdato', type: 'datetime', initialValue: () => new Date().toISOString() },
    { name: 'author', title: 'Forfattar', type: 'string' },
    { name: 'leadImage', title: 'Ingressbilete', type: 'image', options: { hotspot: true } },
    {
      name: 'lead',
      title: 'Ingress',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(200).warning('Maks 200 teikn'),
    },
    {
      name: 'body',
      title: 'Brødtekst',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Sitat', value: 'blockquote' },
          ],
          lists: [
            { title: 'Punktliste', value: 'bullet' },
            { title: 'Nummerert', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Feit', value: 'strong' },
              { title: 'Kursiv', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lenke',
                fields: [{ name: 'href', type: 'url', title: 'URL' }],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt-tekst' }] },
      ],
    },
    {
      name: 'categories',
      title: 'Kategoriar',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    },
  ],
  orderings: [
    { title: 'Publiseringsdato, nyast', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'leadImage' },
  },
}
