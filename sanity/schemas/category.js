import { TagIcon } from '@sanity/icons'

export default {
  name: 'category',
  title: 'Kategori',
  type: 'document',
  icon: TagIcon,
  fields: [
    { name: 'title', title: 'Tittel', type: 'string', validation: (r) => r.required() },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    },
    { name: 'description', title: 'Beskriving', type: 'text', rows: 3 },
  ],
}
