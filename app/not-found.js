import Link from 'next/link'

export const metadata = { title: 'Sida finst ikkje' }

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-28 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Denne sida fann vi ikkje
      </h1>
      <p className="mt-4 text-lg text-ink/70">
        Lenka kan vere utdatert, eller sida er flytta. Prøv framsida eller artiklane våre.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link href="/" className="rounded-full bg-brand px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark">
          Til framsida
        </Link>
        <Link href="/artiklar" className="rounded-full border border-brand px-7 py-3 text-sm font-semibold text-brand transition hover:bg-brand hover:text-white">
          Sjå artiklar
        </Link>
      </div>
    </div>
  )
}
