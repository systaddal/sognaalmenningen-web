import EpisodePlayer from '@/components/EpisodePlayer'

/**
 * Podcast-spelarar inne i ein artikkel. Episodane er henta i sidekomponenten,
 * så denne gjer berre oppsettet.
 */
export default function ArticlePodcast({ heading, intro, episodes, showUrl, showLabel }) {
  if (!episodes?.length) return null

  return (
    <section className="my-8 rounded-2xl border border-mist bg-mist/50 p-6 sm:p-8">
      {heading && <h2 className="text-lg font-bold text-ink">{heading}</h2>}
      {intro && <p className="mt-2 text-sm text-ink/70">{intro}</p>}

      <ol className={`space-y-6 ${heading || intro ? 'mt-6' : ''}`}>
        {episodes.map((episode) => (
          <li key={episode.id} className="border-t border-mist pt-6 first:border-0 first:pt-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-base font-semibold text-ink">{episode.title}</h3>
              {episode.duration && (
                <span className="shrink-0 text-xs text-ink/50">{episode.duration}</span>
              )}
            </div>
            <EpisodePlayer
              audioUrl={episode.audioUrl}
              audioType={episode.audioType}
              title={episode.title}
              fallbackSeconds={episode.durationSeconds}
            />
          </li>
        ))}
      </ol>

      {showUrl && (
        <a
          href={showUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
        >
          {showLabel || 'Sjå alle episodar'} →
        </a>
      )}
    </section>
  )
}
