import Image from 'next/image'

import { urlForImage } from '@/sanity/lib/image'

// Fyller foreldre-containeren (som må vere position: relative med ein fast aspekt).
export default function SanityImage({ image, alt = '', sizes = '100vw', className = '', priority = false }) {
  if (!image?.asset) return null
  const src = urlForImage(image).width(1600).fit('max').auto('format').url()
  return <Image src={src} alt={alt} fill sizes={sizes} className={className} priority={priority} />
}
