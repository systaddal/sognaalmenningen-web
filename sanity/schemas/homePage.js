import { HomeIcon } from '@sanity/icons'

export default {
  name: 'homePage',
  title: 'Framside',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero (toppen)', default: true },
    { name: 'pillars', title: 'Pilarar' },
    { name: 'cta', title: 'Oppmoding (nedst)' },
  ],
  fields: [
    { name: 'heroEyebrow', title: 'Hero – liten overskrift', type: 'string', group: 'hero' },
    { name: 'heroTitle', title: 'Hero – tittel', type: 'string', group: 'hero' },
    { name: 'heroText', title: 'Hero – tekst', type: 'text', rows: 3, group: 'hero' },
    { name: 'heroPrimaryLabel', title: 'Hero – knapp 1 (til booking)', type: 'string', group: 'hero' },
    { name: 'heroSecondaryLabel', title: 'Hero – knapp 2 (til om oss)', type: 'string', group: 'hero' },
    {
      name: 'pillars',
      title: 'Pilarar (Skap / Snakk / Tenk i lag)',
      type: 'array',
      group: 'pillars',
      of: [
        {
          type: 'object',
          name: 'pillar',
          fields: [
            { name: 'title', title: 'Tittel', type: 'string' },
            { name: 'text', title: 'Tekst', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'title', subtitle: 'text' } },
        },
      ],
      validation: (r) => r.max(3).warning('Framsida viser tre pilarar'),
    },
    { name: 'ctaTitle', title: 'CTA – tittel', type: 'string', group: 'cta' },
    { name: 'ctaText', title: 'CTA – tekst', type: 'text', rows: 2, group: 'cta' },
    { name: 'ctaButtonLabel', title: 'CTA – knapp', type: 'string', group: 'cta' },
  ],
  preview: { prepare: () => ({ title: 'Framside' }) },
}
