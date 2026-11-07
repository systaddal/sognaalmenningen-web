# Sognaalmenningen.no

Les desse først:

- @AGENTS.md

## Fakta

| Kva | Verdi |
|---|---|
| Nettstad | sognaalmenningen.no |
| Vercel | `sognaalmenningen-web` (`prj_fOESOzgYUqrskLDQmJFcrowP4QrF`) |
| Sanity | prosjekt `eozv45n6`, dataset `production` |
| Stack | Next 16, Tailwind 4, JavaScript |

## Dette må du vite

- **To studio, to skjema.** Studioet på `/studio` følgjer koden og blir oppdatert ved kvar deploy. Det hosta studioet på sanity.io blir berre oppdatert med `npx sanity schema deploy`. Nye felt finst berre i det innebygde til skjemaet er deploya.
- Framside og lister har ISR på 60 sekund. Nytt innhald treng ei sidevising og eit minutt.
- Bygget krev `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` og `NEXT_PUBLIC_SANITY_API_VERSION`.
- Gammal `.next`-cache skjuler nye Sanity-felt lokalt. Køyr `rm -rf .next` før test.
- Podcast-hentinga (`lib/articlePodcasts.js`) må skje i sidekomponenten, ikkje i ein Portable Text-type. Portable Text rendrar synkront.
- Artiklane blir skrivne som undersider av Notion-sida «Sognaalmenningen».
- `KOM-I-GANG.md` beskriv eit gammalt lokalt oppsett på Windows og gjeld ikkje lenger for Claude-økter.

## Felles for alle S&S-repo

- **Språk:** kode, kommentarar, commit-meldingar og tekst i grensesnittet på moderne nynorsk, med «me». Unntak: tekst der Helle er avsendar, og Medledelse, skal vere på bokmål.
- **Nøklar:** aldri i repoet, i filer, i minnet eller i Notion. Dei ligg i Vercel (miljøvariablar) og Bitwarden. Skriv berre `[i Bitwarden: <post>]` der det trengst ein peikar.
- **Git:** jobb på ei grein og opne PR mot `main`, med mindre Joakim har gjeve ståande løyve til push rett på `main` for dette repoet. Repoet er kopla direkte til Claude-økta med skrivetilgang, så push og PR går herfrå. Den gamle omvegen med patch og PowerShell-skript på studio-pc er avvikla. Ikkje bruk han.
- **Deploy:** Vercel-teamet `SelsengSystaddal` (`team_WdM3gUsRyMlTXzn6OxrI4C7m`) byggjer automatisk frå `main`. Følg bygget med Vercel-koplinga til det står `READY` før du seier at noko er ute.
- **Før du endrar:** køyr `npm install` og `npx next build` (kvar for seg, med lang tidsfrist). Rett feil før push.
- **Database:** reglar ligg i databasen (RLS og `SECURITY DEFINER`-funksjonar), ikkje i nettlesaren. Nye migrasjonar skal liggje i repoet òg, ikkje berre i Supabase.
- **Dokumentasjon:** kvart bygg har ei teknisk side under «Eigne bygg» i Notion (Teknisk infrastruktur). Endrar du korleis noko heng saman, oppdater sida. Kartet over heile systemet er Notion-sida «S&S OS».
- **Spør før** du slettar data, endrar skjema i produksjon, endrar domene eller sender noko til kundar.
