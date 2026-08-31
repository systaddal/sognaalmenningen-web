import { PlayIcon } from '@sanity/icons'

/**
 * Ein bolk med podcast-spelarar inne i ein artikkel eller ei side.
 * Episodane blir henta frå RSS-feeden når sida blir bygd, så du treng
 * berre peike på feeden og seie kva episodar du vil ha med.
 */
export default {
  name: 'podcastEpisodes',
  title: 'Podcast-episodar',
  type: 'object',
  icon: PlayIcon,
  fields: [
    { name: 'heading', title: 'Overskrift', type: 'string', description: 'Valfri. Står over spelarane.' },
    { name: 'intro', title: 'Innleiing', type: 'text', rows: 2, description: 'Valfri.' },
    {
      name: 'rssUrl',
      title: 'RSS-adresse',
      type: 'url',
      description: 'Sogndalspraten: https://anchor.fm/s/1143464d4/podcast/rss',
      validation: (r) => r.required(),
    },
    {
      name: 'match',
      title: 'Filter på tittel',
      type: 'string',
      description: 'Berre episodar med denne teksten i tittelen, t.d. «Rolf Navarsete». Tomt = alle.',
    },
    {
      name: 'order',
      title: 'Rekkjefølgje',
      type: 'string',
      options: {
        list: [
          { title: 'Eldste først (del 1, 2, 3)', value: 'asc' },
          { title: 'Nyaste først', value: 'desc' },
        ],
        layout: 'radio',
      },
      initialValue: 'asc',
    },
    { name: 'limit', title: 'Maks tal episodar', type: 'number', initialValue: 10 },
    {
      name: 'showUrl',
      title: 'Lenke til heile podcasten',
      type: 'url',
      description: 'Valfri. Blir vist som ei lenke under spelarane.',
    },
    { name: 'showLabel', title: 'Tekst på lenka', type: 'string', description: 'Standard: «Sjå alle episodar»' },
  ],
  preview: {
    select: { heading: 'heading', match: 'match' },
    prepare: ({ heading, match }) => ({
      title: heading || 'Podcast-episodar',
      subtitle: match ? `Filter: ${match}` : 'Alle episodar i feeden',
    }),
  },
}
