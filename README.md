# Sognaalmenningen

Informasjons- og bookingnettstad for **Sognaalmenningen** – ein fasilitert møteplass og
innovasjonsarena på Campus Sogndal. Slagord: _«Skap i lag. Snakk i lag.»_

Bygd med [Next.js](https://nextjs.org) (App Router) og [Sanity](https://www.sanity.io)
som CMS, med Tailwind CSS for styling og HubSpot for skjema.

## Teknologi

- **Next.js 16** (App Router, JavaScript)
- **Sanity v6** – innhald + innebygd Studio på `/studio`
- **Tailwind CSS v4**
- **HubSpot** – kontakt-/bookingskjema

## Kom i gang

Føresetnader: [Node.js LTS](https://nodejs.org) og [Git](https://git-scm.com).

```bash
# 1. Installer avhengigheiter
npm install

# 2. Lag miljøfil og fyll inn verdiar
copy .env.example .env.local   # macOS/Linux: cp .env.example .env.local

# 3. Start utviklingsserver
npm run dev
```

Opne så:

- http://localhost:3000 – nettstaden
- http://localhost:3000/studio – Sanity Studio (rediger innhald)

## Miljøvariablar

Alle ligg i `.env.local` (sjå `.env.example` for mal). `.env.local` er gitignorert og
skal **aldri** committast.

| Variabel | Påkravd | Skildring |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Ja | Sanity project-ID (frå sanity.io/manage) |
| `NEXT_PUBLIC_SANITY_DATASET` | Ja | Datasett, vanlegvis `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Nei | API-dato, standard `2024-01-01` |
| `SANITY_API_TOKEN` | Ja* | Server-only token. Eksponer aldri med `NEXT_PUBLIC_`. |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | Nei | HubSpot portal-ID (offentleg embed-ID) |
| `NEXT_PUBLIC_HUBSPOT_FORM_ID` | Nei | HubSpot form-ID (offentleg embed-ID) |

\* Trengst for skriving/utkast. Offentleg lesing fungerer utan token.

## Skript

| Kommando | Gjer |
| --- | --- |
| `npm run dev` | Startar utviklingsserver |
| `npm run build` | Byggjer produksjonsversjon |
| `npm run start` | Køyrer produksjonsbygg lokalt |
| `npm run lint` | Køyrer ESLint |

## Innhaldsstruktur (Sanity)

- **siteSettings** (singleton) – tittel, kontaktinfo, sosiale lenker, logo
- **page** – sider med hero + Portable Text + SEO (t.d. «Om oss», slug `om`)
- **article** – artiklar med ingress, brødtekst, kategoriar
- **category** – kategoriar for artiklar
- **bookingInfo** (singleton) – ingress, prispakkar, bookinglenke

## Sidestruktur

| Rute | Innhald |
| --- | --- |
| `/` | Framside (hero, pilarar, siste artiklar, CTA) |
| `/om` | Om oss (Sanity-side med slug `om`) |
| `/artiklar` | Artikkeloversikt |
| `/artiklar/[slug]` | Enkeltartikkel |
| `/booking` | Prisar + HubSpot-skjema |
| `/kontakt` | Kontaktinfo + HubSpot-skjema |
| `/studio` | Sanity Studio (redigering) |

## Deploy (Vercel)

Importer repoet i Vercel, legg inn dei same miljøvariablane som i `.env.local`, og deploy.
Hugs å leggje produksjonsdomenet og `localhost` til som CORS-origin i Sanity
(sanity.io/manage → API → CORS origins).
