'use client'

import { useEffect, useId, useRef, useState } from 'react'

const PLAY_EVENT = 'sognaalmenningen:episode-play'

function readLength(audio) {
  const value = audio?.duration
  return Number.isFinite(value) && value > 0 ? value : 0
}

function clock(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const total = Math.floor(seconds)
  const minutes = Math.floor(total / 60)
  const rest = total % 60
  return `${minutes}:${String(rest).padStart(2, '0')}`
}

export default function EpisodePlayer({ audioUrl, audioType, title, fallbackSeconds = 0 }) {
  const audioRef = useRef(null)
  const playerId = useId()
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [browserLength, setBrowserLength] = useState(0)

  // Lengda står i feeden. Nettlesaren overstyrer så snart han har lese fila.
  const length = browserLength || fallbackSeconds

  // Berre éin episode skal spele om gongen.
  useEffect(() => {
    function onOtherPlay(event) {
      if (event.detail !== playerId) audioRef.current?.pause()
    }
    window.addEventListener(PLAY_EVENT, onOtherPlay)
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay)
  }, [playerId])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: playerId }))
      audio.play()
    } else {
      audio.pause()
    }
  }

  function scrub(event) {
    const audio = audioRef.current
    if (!audio) return
    const value = Number(event.target.value)
    audio.currentTime = value
    setCurrent(value)
  }

  return (
    <div className="mt-4 flex items-center gap-3">
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setBrowserLength(readLength(e.currentTarget))}
        onDurationChange={(e) => setBrowserLength(readLength(e.currentTarget))}
      >
        <source src={audioUrl} type={audioType} />
      </audio>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${title}` : `Spel av ${title}`}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        {playing ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="ml-0.5 h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.29-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
          </svg>
        )}
      </button>

      <input
        type="range"
        min={0}
        max={length || 1}
        step={1}
        value={Math.min(current, length || 1)}
        onChange={scrub}
        aria-label={`Spol i ${title}`}
        disabled={!length}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-mist accent-brand disabled:cursor-default"
        style={{ accentColor: 'var(--color-brand)' }}
      />

      <span className="shrink-0 font-mono text-xs tabular-nums text-ink/50">
        {clock(current)} / {clock(length)}
      </span>
    </div>
  )
}
