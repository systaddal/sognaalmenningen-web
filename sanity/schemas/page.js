import { DocumentIcon } from '@sanity/icons'

export default {
  name: 'page',
  title: 'Side',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'content', title: 'Innhald', default: true },
    { name: 'podcast', title: 'Podcast' },
    { name: 'cta', title: 'Oppmoding (nedst)' },
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
    {
      name: 'podcastRssUrl',
      title: 'Podcast – RSS-adresse',
      description:
        'Adressa til RSS-feeden. Er feltet tomt, blir heile podcast-seksjonen nedst på sida skjult.',
      type: 'url',
      group: 'podcast',
      validation: (r) => r.uri({ scheme: ['http', 'https'] }),
    },
    { name: 'podcastTitle', title: 'Podcast – overskrift', type: 'string', group: 'podcast' },
    { name: 'podcastIntro', title: 'Podcast – tekst', type: 'text', rows: 3, group: 'podcast' },
    {
      name: 'podcastPinnedMatch',
      title: 'Podcast – episode som skal liggje øvst',
      description:
        'Skriv ein bit av tittelen på episoden som alltid skal liggje først, til dømes «Introepisode». Resten kjem nyaste først. Tomt felt = berre nyaste først.',
      type: 'string',
      group: 'podcast',
    },
    {
      name: 'podcastCount',
      title: 'Podcast – kor mange episodar',
      description: 'Tomt felt viser alle episodane i feeden.',
      type: 'number',
      group: 'podcast',
      validation: (r) => r.min(1).max(50).integer(),
    },
    {
      name: 'podcastShowUrl',
      title: 'Podcast – lenke til heile podcasten',
      description: 'Til dømes Spotify-sida. Blir vist som lenke ved sida av overskrifta.',
      type: 'url',
      group: 'podcast',
      validation: (r) => r.uri({ scheme: ['http', 'https'] }),
    },
    { name: 'podcastShowLabel', title: 'Podcast – tekst på lenka', type: 'string', group: 'podcast' },
    {
      name: 'ctaTitle',
      title: 'Oppmoding – tittel',
      description: 'Boksen nedst på sida. Er tittelen tom, blir heile oppmodinga skjult.',
      type: 'string',
      group: 'cta',
    },
    { name: 'ctaText', title: 'Oppmoding – tekst', type: 'text', rows: 2, group: 'cta' },
    { name: 'ctaButtonLabel', title: 'Oppmoding – knapp', type: 'string', group: 'cta' },
    {
      name: 'ctaHref',
      title: 'Oppmoding – kvar knappen går',
      description: 'Til dømes /kontakt eller mailto:post@sognaalmenningen.no',
      type: 'string',
      group: 'cta',
    },
    { name: 'seoTitle', title: 'SEO-tittel', type: 'string', group: 'seo' },
    { name: 'seoDescription', title: 'SEO-beskrivelse', type: 'text', rows: 3, group: 'seo' },
  ],
}
