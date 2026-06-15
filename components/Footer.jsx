export default function Footer({ settings }) {
  const title = settings?.title || 'Sognaalmenningen'
  const email = settings?.contactEmail || 'post@sognaalmenningen.no'
  const phone = settings?.contactPhone || '+47 000 00 000'
  const address = settings?.address || 'Campus Sogndal, Sogndal'

  return (
    <footer id="kontakt" className="mt-20 border-t border-mist bg-mist">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-brand">{title}</h3>
          <p className="mt-2 max-w-xs text-sm text-ink/70">
            {settings?.description || 'Ein fasilitert møteplass og innovasjonsarena på Campus Sogndal.'}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Kontakt</h4>
          <ul className="mt-3 space-y-1 text-sm text-ink/80">
            <li><a className="hover:text-brand" href={`mailto:${email}`}>{email}</a></li>
            <li><a className="hover:text-brand" href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a></li>
            <li>{address}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Følg oss</h4>
          <ul className="mt-3 space-y-1 text-sm text-ink/80">
            {settings?.facebookUrl && (
              <li><a className="hover:text-brand" href={settings.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            )}
            {settings?.linkedinUrl && (
              <li><a className="hover:text-brand" href={settings.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            )}
            {!settings?.facebookUrl && !settings?.linkedinUrl && (
              <li className="text-ink/50">Sosiale lenkar kjem</li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/60 py-4 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} {title}. Skap i lag. Snakk i lag.
      </div>
    </footer>
  )
}
