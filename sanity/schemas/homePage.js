import { HomeIcon } from '@sanity/icons'

export default {
  name: 'homePage',
  title: 'Framside',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      name: 'pillars',
      title: 'Pilarar (Skap / Snakk / Tenk i lag)',
      type: 'array',
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
  ],
  preview: { prepare: () => ({ title: 'Framside' }) },
}
