'use client'

import { useEffect, useState } from 'react'

// Deler "Skap i lag. Snakk i lag." i to setningar. Returnerer null om det ikkje blir nett to.
function splitPhrases(text) {
  if (!text) return null
  const parts = text.split(/(?<=\.)\s+/).map((s) => s.trim()).filter(Boolean)
  return parts.length === 2 ? parts : null
}

export default function AnimatedHeadline({ text, className = '' }) {
  const phrases = splitPhrases(text)
  const [swapped, setSwapped] = useState(false)
  const [anim, setAnim] = useState(false)

  useEffect(() => {
    if (!phrases) return undefined
    const timers = []
    const id = setInterval(() => {
      setAnim(true)
      timers.push(setTimeout(() => setSwapped((s) => !s), 400)) // byt tekst når dei står på «kant»
      timers.push(setTimeout(() => setAnim(false), 820))
    }, 10000)
    return () => {
      clearInterval(id)
      timers.forEach(clearTimeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  if (!phrases) {
    return <h1 className={className}>{text}</h1>
  }

  const [a, b] = phrases
  const first = swapped ? b : a
  const second = swapped ? a : b
  const spanCls = `inline-block ${anim ? 'tumble' : ''}`

  return (
    <h1 className={className} style={{ perspective: '900px' }}>
      <span className={spanCls}>{first}</span>{' '}
      <span className={spanCls}>{second}</span>
    </h1>
  )
}
