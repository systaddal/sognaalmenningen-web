import { client } from '@/sanity/client'
import { bookingInfoQuery } from '@/sanity/lib/queries'
import HubSpotForm from '@/components/HubSpotForm'
import { HUBSPOT_PORTAL_ID, HUBSPOT_FORM_ID, HUBSPOT_REGION } from '@/lib/hubspot'

export async function generateMetadata() {
  const info = await client.fetch(bookingInfoQuery, {}, { next: { revalidate: 60 } })
  return {
    title: info?.title || 'Book ei økt',
    description:
      info?.intro ||
      'Book ei fasilitert designtenking-økt hjå Sognaalmenningen på Campus Sogndal.',
  }
}

const fallbackPackages = [
  { name: 'Smakebit', price: 'Frå 0 kr', description: 'Ein kort intro-økt der vi blir kjende med problemet dykkar.' },
  { name: 'Halvdag', price: 'Ta kontakt', description: 'Fasilitert designtenking-sesjon på ein halv dag.' },
  { name: 'Heildag', price: 'Ta kontakt', description: 'Djupdykk med fleire fasar – frå problem til prototype.' },
]

export default async function BookingPage() {
  const info = await client.fetch(bookingInfoQuery, {}, { next: { revalidate: 60 } })

  const title = info?.title || 'Book ei økt'
  const intro =
    info?.intro ||
    'Ta med problemet dykkar – så loser fasilitatorane våre dykk gjennom ein strukturert designtenking-prosess fram til ei konkret løysing.'
  const packages = info?.packages?.length ? info.packages : fallbackPackages

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink/70">{intro}</p>

      {/* Prisar / pakkar */}
      <section className="mt-12 grid gap-6 sm:grid-cols-3">
        {packages.map((p, i) => (
          <div key={i} className="flex flex-col rounded-2xl border border-mist bg-white p-7">
            <h2 className="text-lg font-bold text-brand">{p.name}</h2>
            <p className="mt-1 text-2xl font-semibold text-ink">{p.price}</p>
            <p className="mt-3 text-sm text-ink/70">{p.description}</p>
          </div>
        ))}
      </section>

      {/* Ekstern bookinglenke */}
      {info?.bookingUrl && (
        <div className="mt-10">
          <a
            href={info.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Gå til booking
          </a>
        </div>
      )}

      {/* HubSpot-skjema */}
      <section className="mt-16 rounded-2xl bg-mist p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-ink">Send oss ein førespurnad</h2>
        <p className="mt-2 text-ink/70">
          Fyll ut skjemaet, så tek vi kontakt for å avtale ei økt
          {info?.contactPerson ? ` (kontaktperson: ${info.contactPerson})` : ''}.
        </p>
        <div className="mt-6">
          <HubSpotForm portalId={HUBSPOT_PORTAL_ID} formId={HUBSPOT_FORM_ID} region={HUBSPOT_REGION} />
        </div>
      </section>
    </div>
  )
}
