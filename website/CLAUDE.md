# ransve.com — tekniske tillegg

(Arver alle regler fra `../CLAUDE.md` automatisk — språkregler, faktagrenser,
rettigheter og kildekrav gjelder like fullt her.)

## Stack
- Astro (statisk generering, ingen server-side kode, ingen database)
- Ingen CMS — innhold redigeres som filer i repoet

## Innholdsarkitektur: én fil, én bildekatalog, per samling
Hver content collection (`src/content.config.ts`) har all sin metadata i
**én CSV-fil**, med bilder i en tilhørende `src/assets/<samling>/`-katalog.
Dette er bevisst valgt slik at Bjørn selv kan redigere metadata direkte i én
oversiktlig fil (regneark-vennlig format), i stedet for å lete gjennom mange
enkeltfiler.

- `src/content/tidslinje/tidslinje.csv` + `src/assets/tidslinje/` — de sju
  tiårspanelene på forsiden. Se `src/content/tidslinje/README.md`.
- `src/content/verk/verk.csv` + `src/assets/verk/` — verk-oversikten (ikke
  bygget som side ennå, kun datalag). Se `src/content/verk/README.md`.

CSV-radenes bildekolonne (`bildefil`) inneholder **kun filnavnet**, ikke en
sti. Astro-komponenter slår filnavnet opp mot bildekatalogen via
`src/lib/images.ts` (`buildImageMap` + `resolveImage`), som feiler bygget
med en tydelig norsk feilmelding hvis filnavnet er stavet feil eller filen
mangler — dette skal ALDRI mykes opp til en stille fallback, fordi en
lydløs feil i praksis betyr et ødelagt bilde på en publisert side.
`src/lib/csv.ts` har CSV-parseren som brukes av `content.config.ts`.

Ny samling med samme mønster: opprett `src/content/<navn>/<navn>.csv` og
`src/assets/<navn>/`, registrer collection i `content.config.ts` med
Astros `file()`-loader og `{ parser: parseCsv }`, skriv en `README.md` ved
siden av CSV-filen etter samme mal som de to over.

## Struktur
- Engelsk er hovedspråk på ransve.com (jf. strategiens "engelsk først" for
  nettsiden). Norsk versjon ligger under `/no/`.
- Hver verkside har: tittel, år, teknikk, mål, kort tekst (NO+EN), bilde,
  status/pris — se kolonnene i `src/content/verk/verk.csv`.
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
Astro-prosjektet er initialisert. Forsiden (`/no/`) er bygget med tidslinjen
og portrettrotasjon. Verk-oversikten har datalag (`src/content/verk/`) men
ingen side ennå — se `src/content/verk/README.md`.
