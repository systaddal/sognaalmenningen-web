import EpisodePlayer from '@/components/EpisodePlayer'

function formatDate(value) {
  if (!value) return ''
  return new Date(value).toLocaleDateString('nn-NO', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function PodcastFeed({ title, intro, showUrl, showLabel, episodes }) {
  if (!episodes?.length) return null

  return (
    <section className="border-t border-mist">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mb-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-3xl font-bold text-ink">{title}</h2>
            {showUrl && (
              <a
                href={showUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brand hover:underline"
              >
                {showLabel || 'Alle episodar'} →
              </a>
            )}
          </div>
          {intro && <p className="mt-3 max-w-2xl text-ink/70">{intro}</p>}
        </div>

        <ul className="grid gap-6">
          {episodes.map((episode) => (
            <li key={episode.id} className="rounded-2xl border border-mist bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row">
                {episode.image && (
                  // Biletet kjem frå podcast-verten, ikkje frå Sanity – difor vanleg <img>.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={episode.image}
                    alt=""
                    loading="lazy"
                    className="h-24 w-24 shrink-0 rounded-xl bg-mist object-cover sm:h-32 sm:w-32"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-ink/50">
                    {[formatDate(episode.publishedAt), episode.duration].filter(Boolean).join(' · ')}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-ink">{episode.title}</h3>
                  {episode.summary && (
                    <p className="mt-2 line-clamp-3 text-sm text-ink/70">{episode.summary}</p>
                  )}

                  <EpisodePlayer
                    audioUrl={episode.audioUrl}
                    audioType={episode.audioType}
                    title={episode.title}
                    fallbackSeconds={episode.durationSeconds}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
