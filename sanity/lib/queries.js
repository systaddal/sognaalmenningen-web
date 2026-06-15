import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  title,
  description,
  contactEmail,
  contactPhone,
  address,
  facebookUrl,
  linkedinUrl,
  logo
}`

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  heroImage,
  heroTitle,
  heroIntro,
  body,
  seoTitle,
  seoDescription
}`

export const allArticlesQuery = groq`*[_type == "article"] | order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  author,
  leadImage,
  lead,
  "categories": categories[]->{ _id, title, "slug": slug.current }
}`

export const latestArticlesQuery = groq`*[_type == "article"] | order(publishedAt desc)[0...3]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  leadImage,
  lead
}`

export const articleBySlugQuery = groq`*[_type == "article" && slug.current == $slug][0]{
  title,
  publishedAt,
  author,
  leadImage,
  lead,
  body,
  "categories": categories[]->{ _id, title, "slug": slug.current }
}`

export const articleSlugsQuery = groq`*[_type == "article" && defined(slug.current)][].slug.current`

export const bookingInfoQuery = groq`*[_type == "bookingInfo"][0]{
  title,
  intro,
  packages,
  bookingUrl,
  contactPerson
}`
