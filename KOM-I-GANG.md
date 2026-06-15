# Kom i gang – sognaalmenningen-web

Prosjektet er ferdig sett opp (Next.js 16 + Sanity) og ligg klart i denne mappa.
`node_modules` er **ikkje** med (den er plattform-spesifikk og skal byggjast lokalt),
så fyrste steg på Windows-maskina di er å installere verktøy og køyre `npm install`.

## 1. Installer verktøy (eingong)

Eg kan ikkje installere programvare på Windows-maskina di, så dette må du gjere sjølv:

- **Node.js LTS** – last ned frå https://nodejs.org (vel "LTS"). Stadfest i ein ny terminal:
  `node --version` og `npm --version`
- **Git** – last ned frå https://git-scm.com/download/win. Stadfest: `git --version`
- **VS Code** – last ned frå https://code.visualstudio.com

## 2. Opne prosjektet

Mappa kan liggje der du vil. Vil du ha den på `C:\prosjekt\sognaalmenningen-web`,
flytt heile `sognaalmenningen-web`-mappa dit. Opne mappa i VS Code
(File → Open Folder) og opne ein terminal: **Terminal → New Terminal**.

## 3. Installer pakkar

I terminalen, ståande i prosjektmappa:

```
npm install
```

(Dette les `package-lock.json` og hentar nøyaktig dei same versjonane som er testa.)

## 4. Start utviklingsserveren

```
npm run dev
```

Opne så:
- http://localhost:3000 – framsida
- http://localhost:3000/studio – Sanity Studio (innlogga redigering)

## 5. Push til GitHub

Git er allereie initialisert med ein commit ("initial setup") og remote er sett til
`https://github.com/systaddal/sognaalmenningen-web.git`. Du treng berre å autentisere
og pushe (eg har ikkje tilgang til GitHub-kontoen din):

```
git push -u origin main
```

Fyrste gong opnar Git eit vindauge for GitHub-innlogging. Sjekk gjerne fyrst at remote
er rett: `git remote -v`.

## ⚠️ Viktig om API-tokenet

API-tokenet ditt vart limt inn i chatten og ligg no i klartekst i `.env.local`.
`.env.local` er gitignorert (vert **ikkje** pusha til GitHub), men sidan tokenet alt
har vore eksponert i ein samtale, bør du **rullere det**: lag eit nytt token i
Sanity (Manage → API → Tokens), slett det gamle, og lim det nye inn i `.env.local`.

## Kva som er sett opp

- Next.js 16, App Router, JavaScript, Tailwind CSS v4, ESLint
- Sanity-pakkar: `sanity`, `next-sanity`, `@sanity/client`, `@sanity/image-url`
- `sanity/env.js` – les projectId/dataset/apiVersion frå miljøvariablar
- `sanity/client.js` – ferdig Sanity-klient for å hente data
- `sanity.config.js` – Studio-konfig (basePath `/studio`)
- `app/studio/[[...tool]]/page.js` – embedded Studio-rute
- `.env.local` – projectId `eozv45n6`, dataset `production`, token (gitignorert)
- Produksjonsbygg (`npm run build`) er testa og går grønt

## Neste steg (forslag)

Studioet har ingen dokumenttypar enno (`schema.types: []`). Når du veit kva
Sognaalmenningen-sida treng (t.d. `event`, `rom`, `booking`, `side`), lagar me
schema-filer under `sanity/schemaTypes/` og koplar dei inn i `sanity.config.js`.
