import { fetchEpisodes, selectEpisodes } from '@/lib/podcast'

/**
 * Finn podcast-bolkane i ein Portable Text-body, hentar feedane dei peikar på
 * (kvar feed berre éin gong) og returnerer episodane nøkla på blokka sin _key.
 *
 * @param {Array} body  Portable Text-innhaldet
 * @returns {Promise<Record<string, Array>>}
 */
export async function resolvePodcastBlocks(body) {
  const blocks = (body || []).filter((block) => block?._type === 'podcastEpisodes' && block.rssUrl)
  if (!blocks.length) return null

  const feeds = new Map()
  await Promise.all(
    [...new Set(blocks.map((block) => block.rssUrl))].map(async (url) => {
      feeds.set(url, await fetchEpisodes(url))
    }),
  )

  const byKey = {}
  for (const block of blocks) {
    byKey[block._key] = selectEpisodes(feeds.get(block.rssUrl) || [], {
      match: block.match,
      order: block.order,
      limit: block.limit,
    })
  }

  return byKey
}
