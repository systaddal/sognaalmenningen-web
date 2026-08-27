/**
 * Hentar og les episodane frå ein podcast-RSS-feed.
 *
 * Ingen ekstra pakkar: feeden er vanleg RSS 2.0 med itunes-utvidingar,
 * og me plukkar ut berre dei felta framsida treng.
 */

const ENTITIES = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
}

function decodeEntities(value) {
  if (!value) return ''
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match)
}

function unwrap(value) {
  if (!value) return ''
  return decodeEntities(value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')).trim()
}

/** Innhaldet i første <tag>…</tag> i ein blokk. */
function tagText(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'i'))
  return match ? unwrap(match[1]) : ''
}

/** Verdien til eit attributt på første <tag …/>. */
function tagAttr(block, tag, attr) {
  const match = block.match(new RegExp(`<${tag}\\b[^>]*\\b${attr}\\s*=\\s*"([^"]*)"`, 'i'))
  return match ? decodeEntities(match[1]) : ''
}

function stripHtml(value) {
  return unwrap(value)
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<\/p>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

/** «1523» eller «00:25:23» → 1523 sekund. */
function durationSeconds(raw) {
  if (!raw) return 0
  const seconds = raw.includes(':')
    ? raw
        .split(':')
        .map((part) => parseInt(part, 10) || 0)
        .reduce((total, part) => total * 60 + part, 0)
    : parseInt(raw, 10)
  return Number.isFinite(seconds) && seconds > 0 ? seconds : 0
}

/** 1523 → «25 min». */
function readableDuration(seconds) {
  if (!seconds) return ''
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest ? `${hours} t ${rest} min` : `${hours} t`
}

function parseEpisode(block, channelImage) {
  const audioUrl = tagAttr(block, 'enclosure', 'url')
  if (!audioUrl) return null

  const summary =
    stripHtml(tagText(block, 'itunes:subtitle')) ||
    stripHtml(tagText(block, 'description')) ||
    stripHtml(tagText(block, 'itunes:summary'))

  const seconds = durationSeconds(tagText(block, 'itunes:duration'))
  const published = tagText(block, 'pubDate')
  const publishedAt = published ? new Date(published) : null

  return {
    id: tagText(block, 'guid') || audioUrl,
    title: tagText(block, 'title'),
    summary,
    audioUrl,
    audioType: tagAttr(block, 'enclosure', 'type') || 'audio/mpeg',
    link: tagText(block, 'link'),
    image: tagAttr(block, 'itunes:image', 'href') || channelImage,
    duration: readableDuration(seconds),
    durationSeconds: seconds,
    publishedAt: publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt.toISOString() : null,
  }
}

/**
 * @param {string} rssUrl   Adressa til RSS-feeden
 * @param {number} limit    Kor mange episodar framsida skal vise
 * @returns {Promise<Array>} Episodane, nyaste først. Tom liste om noko feilar.
 */
export async function getEpisodes(rssUrl, limit = 3) {
  if (!rssUrl) return []

  let xml
  try {
    const response = await fetch(rssUrl, {
      headers: { 'user-agent': 'sognaalmenningen.no' },
      next: { revalidate: 1800 },
    })
    if (!response.ok) {
      console.error(`Podcast-feed svarte ${response.status}: ${rssUrl}`)
      return []
    }
    xml = await response.text()
  } catch (error) {
    console.error('Fekk ikkje henta podcast-feeden:', error)
    return []
  }

  const channelImage = tagAttr(xml, 'itunes:image', 'href') || tagText(xml, 'url')
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || []

  return blocks
    .map((block) => parseEpisode(block, channelImage))
    .filter(Boolean)
    .sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0))
    .slice(0, limit)
}
