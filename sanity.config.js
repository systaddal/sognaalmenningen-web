'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { projectId, dataset } from './sanity/env'
import { schemaTypes } from './sanity/schemas'

// Dokumenttypar som berre skal finnast i éin instans (singletons)
const singletons = ['siteSettings', 'bookingInfo']

export default defineConfig({
  name: 'default',
  title: 'Sognaalmenningen',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Innhald')
          .items([
            S.listItem()
              .title('Nettstadinnstillingar')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Bookinginfo')
              .id('bookingInfo')
              .child(S.document().schemaType('bookingInfo').documentId('bookingInfo')),
            S.divider(),
            S.documentTypeListItem('page').title('Sider'),
            S.documentTypeListItem('article').title('Artiklar'),
            S.documentTypeListItem('category').title('Kategoriar'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Hindre at singletons kan opprettast som nye dokument frå "+"-menyen
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },

  document: {
    // Fjern "duplikat"/"slett" for singletons
    actions: (input, { schemaType }) =>
      singletons.includes(schemaType)
        ? input.filter(({ action }) => !['unpublish', 'delete', 'duplicate'].includes(action))
        : input,
  },
})
