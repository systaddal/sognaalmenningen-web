export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Sognaalmenningen
      </h1>
      <p className="max-w-xl text-lg text-gray-600">
        Ein fasilitert innovasjons- og møtestad på Campus Sogndal.
        Informasjon og booking kjem her.
      </p>
      <a
        href="/studio"
        className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Opne Sanity Studio
      </a>
    </main>
  )
}
