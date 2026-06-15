'use client'

import { useEffect, useState } from 'react'

const SCRIPT_SRC = 'https://js.hsforms.net/forms/embed/v2.js'
const CONTAINER_ID = 'hubspot-form-container'

export default function HubSpotForm({ portalId, formId, region = 'na1' }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'error'

  useEffect(() => {
    let cancelled = false

    function createForm() {
      if (cancelled) return
      if (!(window.hbspt && window.hbspt.forms)) {
        setStatus('error')
        return
      }
      const el = document.getElementById(CONTAINER_ID)
      if (el) el.innerHTML = ''
      try {
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: '#' + CONTAINER_ID,
          onFormReady: () => !cancelled && setStatus('ready'),
        })
        setStatus('ready')
      } catch {
        if (!cancelled) setStatus('error')
      }
    }

    if (window.hbspt && window.hbspt.forms) {
      createForm()
      return () => {
        cancelled = true
      }
    }

    let script = document.querySelector('script[data-hubspot-embed]')
    if (!script) {
      script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.defer = true
      script.setAttribute('data-hubspot-embed', 'true')
      document.body.appendChild(script)
    }
    const onLoad = () => createForm()
    const onError = () => !cancelled && setStatus('error')
    script.addEventListener('load', onLoad)
    script.addEventListener('error', onError)

    return () => {
      cancelled = true
      script.removeEventListener('load', onLoad)
      script.removeEventListener('error', onError)
    }
  }, [portalId, formId, region])

  return (
    <div>
      {status === 'loading' && (
        <div className="flex items-center gap-3 py-8 text-ink/60">
          <span
            className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-brand/30 border-t-brand"
            aria-hidden="true"
          />
          <span>Lastar skjema…</span>
        </div>
      )}
      {status === 'error' && (
        <p className="rounded-xl border border-dashed border-red-300 bg-red-50 p-6 text-sm text-red-700">
          Klarte ikkje å laste skjemaet. Prøv å laste sida på nytt, eller send oss ein e-post.
        </p>
      )}
      <div id={CONTAINER_ID} />
    </div>
  )
}
