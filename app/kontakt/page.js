import { client } from '@/sanity/client'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import HubSpotForm from '@/components/HubSpotForm'
import { HUBSPOT_PORTAL_ID, HUBSPOT_FORM_ID, HUBSPOT_REGION } from '@/lib/hubspot'

export const metadata = {
  title: 'Kontakt',
  description: 'Ta kontakt med Sognaalmenningen på Campus Sogndal.',
}

export default async function KontaktPage() {
  const s = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 60 } })

  const email = s?.contactEmail || 'post@sognaalmenningen.no'
  const phone = s?.contactPhone || '+47 000 00 000'
  const address = s?.address || 'Campus Sogndal, Sogndal'

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">Kontakt</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">
        Har du spørsmål eller vil booke ei økt? Send oss ein melding, så tek vi kontakt.
      </p>

      <div className="mt-12 grid gap-12 md:grid-cols-[1fr_1.2fr]">
        {/* Kontaktinfo frå Sanity */}
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Kontaktinfo</h2>
          <ul className="mt-4 space-y-3 text-ink/80">
            <li>
              <span className="block text-xs text-ink/50">E-post</span>
              <a className="hover:text-brand" href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <span className="block text-xs text-ink/50">Telefon</span>
              <a className="hover:text-brand" href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
            </li>
            <li>
              <span className="block text-xs text-ink/50">Adresse</span>
              {address}
            </li>
          </ul>

          {(s?.facebookUrl || s?.linkedinUrl) && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/60">Følg oss</h2>
              <ul className="mt-3 space-y-1 text-ink/80">
                {s?.facebookUrl && (
                  <li><a className="hover:text-brand" href={s.facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a></li>
                )}
                {s?.linkedinUrl && (
                  <li><a className="hover:text-brand" href={s.linkedinUrl} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* HubSpot-skjema */}
        <div className="rounded-2xl bg-mist p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-ink">Send oss ein melding</h2>
          <div className="mt-4">
            <HubSpotForm portalId={HUBSPOT_PORTAL_ID} formId={HUBSPOT_FORM_ID} region={HUBSPOT_REGION} />
          </div>
        </div>
      </div>
    </div>
  )
}
