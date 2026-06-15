import { createImageUrlBuilder } from '@sanity/image-url'

import { projectId, dataset } from '../env'

const builder = createImageUrlBuilder({ projectId, dataset })

export function urlForImage(source) {
  return builder.image(source)
}
