# content/

Denne mappen inneholder **ikke** innholdsproduksjon. Selve skrivingen av
verkstekster, Instagram-tekster, nyhetsbrev og Facebook-gruppe-innhold skjer
i egne Claude Projects, ikke i dette repoet — se
`../docs/arkitektur-agentstruktur-ransve.md`, kapittel 7, for begrunnelsen.

Denne mappen er kun en mottakslomme for tekst som er **ferdig skrevet og
godkjent** i Claude Projects, og som skal videre inn på ransve.com.

## Struktur

- `klar-for-web/` — tekst eksportert fra Claude Projects, venter på å bli
  integrert i nettsiden. Én fil per verk/side, med alle påkrevde felt
  (tittel, år, teknikk, mål, NO-tekst, EN-tekst, status/pris, bildereferanse).
- `arkivert/` — filer `innhold-integrator`-agenten har flyttet hit etter at
  de er satt inn i `website/src/content/verk/`.

## Arbeidsflyt

1. Skriv og godkjenn tekst i Claude Projects (bruk kunnskapsbasen i
   `../knowledge/` som prosjektkunnskap der).
2. Lim/eksporter den ferdige teksten som en fil i `klar-for-web/`.
3. Be `innhold-integrator`-agenten i Claude Code sette den inn på nettsiden.
4. Kjør `faktasjekker` og `oversetter-en` på nytt som en siste kontroll —
   nettsiden er det mest varige og offentlige leddet.
