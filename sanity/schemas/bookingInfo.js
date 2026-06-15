import { CalendarIcon } from '@sanity/icons'

export default {
  name: 'bookingInfo',
  title: 'Bookinginfo',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    { name: 'title', title: 'Tittel', type: 'string', validation: (r) => r.required() },
    { name: 'intro', title: 'Ingress', type: 'text', rows: 3 },
    {
      name: 'packages',
      title: 'Prisar',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'package',
          title: 'Pakke',
          fields: [
            { name: 'name', title: 'Pakkenamn', type: 'string' },
            { name: 'price', title: 'Pris', type: 'string' },
            { name: 'description', title: 'Beskriving', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'name', subtitle: 'price' } },
        },
      ],
    },
    { name: 'bookingUrl', title: 'Bookinglenke (URL)', type: 'url' },
    { name: 'contactPerson', title: 'Kontaktperson', type: 'string' },
  ],
  preview: {
    prepare: () => ({ title: 'Bookinginfo' }),
  },
}
