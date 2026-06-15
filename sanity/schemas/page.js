import { DocumentIcon } from '@sanity/icons'

export default {
  name: 'page',
  title: 'Side',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Innhald', default: true },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'title', title: 'Tittel', type: 'string', group: 'content', validation: (r) => r.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    },
    { name: 'heroImage', title: 'Hero-bilde', type: 'image', group: 'content', options: { hotspot: true } },
    { name: 'heroTitle', title: 'Hero-tittel', type: 'string', group: 'content' },
    { name: 'heroIntro', title: 'Hero-ingress', type: 'text', rows: 3, group: 'content' },
    {
      name: 'body',
      title: 'Hovudinnhald',
      type: 'array',
      group: 'content',
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
                fields: [
                  { name: 'href', type: 'url', title: 'URL', validation: (r) => r.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }) },
                ],
              },
            ],
          },
        },
        { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt-tekst' }] },
      ],
    },
    { name: 'seoTitle', title: 'SEO-tittel', type: 'string', group: 'seo' },
    { name: 'seoDescription', title: 'SEO-beskrivelse', type: 'text', rows: 3, group: 'seo' },
  ],
}
