'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'

import { projectId, dataset } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'Sognaalmenningen',

  projectId,
  dataset,

  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: [],
  },
})
