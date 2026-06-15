import { CogIcon } from '@sanity/icons'

export default {
  name: 'siteSettings',
  title: 'Nettstadinnstillingar',
  type: 'document',
  icon: CogIcon,
  fields: [
    { name: 'title', title: 'Tittel', type: 'string', validation: (r) => r.required() },
    { name: 'description', title: 'Beskrivelse', type: 'text', rows: 3 },
    { name: 'contactEmail', title: 'Kontakt-epost', type: 'string' },
    { name: 'contactPhone', title: 'Kontakt-telefon', type: 'string' },
    { name: 'address', title: 'Adresse', type: 'text', rows: 2 },
    { name: 'facebookUrl', title: 'Facebook-URL', type: 'url' },
    { name: 'linkedinUrl', title: 'LinkedIn-URL', type: 'url' },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  preview: {
    prepare: () => ({ title: 'Nettstadinnstillingar' }),
  },
}
