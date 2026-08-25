# ransve.com — tekniske tillegg

(Arver alle regler fra `../CLAUDE.md` automatisk — språkregler, faktagrenser,
rettigheter og kildekrav gjelder like fullt her.)

## Stack
- Astro (statisk generering, ingen server-side kode, ingen database)
- Innhold som Astro content collections under `src/content/verk/`
- Ingen CMS — innhold redigeres som Markdown-filer i repoet

## Struktur
- Engelsk er hovedspråk på ransve.com (jf. strategiens "engelsk først" for
  nettsiden). Norsk versjon ligger under `/no/`.
- Hver verkside har: tittel, år, teknikk, mål, kort tekst (NO+EN), bilde,
  status/pris.
- Forsiden viser et utvalg på rundt 12 verk, en tidslinje og en kort
  om-tekst — ikke mer, jf. fase 0–1 i handlingsplanen.

## Hosting
- Domeneshop Web Light. FTP/SFTP. INGEN SSH, ingen PHP, ingen Node på serveren.
- Produksjonsbygg (`npm run build`) → `dist/` → lastes opp via SFTP.
- Domenenavn: ransve.com

## Credentials
- SFTP-brukernavn/passord ligger i `website/.env`, ALDRI i kode, agentfiler
  eller commits.
- `.env` står i `.gitignore`. Sjekk dette før hver commit.

## Status
Dette prosjektet er ennå ikke initialisert som et kjørbart Astro-prosjekt.
Se `README.md` i denne mappen for oppstartssteget (`npm create astro@latest`),
som gjøres når utviklingsmaskinen er klar.
