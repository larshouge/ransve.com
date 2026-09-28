# Arkitekturdokument: Agentstruktur for ransve.com

**Prosjekt:** Bjørn Ransve — kommunikasjonsstrategi 2026
**Del av:** Teknologiprodukt (ransve.com). Innholdsproduksjon (sosiale medier, nyhetsbrev) er et eget produkt og løses i Claude Projects — se kapittel 7.
**Ansvarlig:** Lars Houge
**Sist oppdatert:** september 2026 (innholdsarkitektur revidert til CSV-per-samling, se kap. 3 og 6.4)
**Status:** Vedtatt struktur, klar for oppsett

---

## 1. Formål

Dette dokumentet beskriver hvordan Claude Code skal settes opp med et lite team av spesialiserte agenter for å bygge og drifte **ransve.com** — en statisk Astro-side hostet på Domeneshop Web Light. Dokumentet dekker:

- Hvilke agenter som trengs, og hvorfor
- Nøyaktig oppsett av hver agent (frontmatter + systemprompt)
- Mappestruktur og hvordan reglene ("husreglene") arves av alle agenter
- Hvordan dette repoet forholder seg til innholdsproduksjonen som skjer i Claude Projects
- Sikkerhetshåndtering for driftshemmeligheter (SFTP-credentials)
- Rekkefølgen for å sette alt opp fra bunnen

Dette er ikke et dokument om innholdsstrategi — se `Kommunikasjonsstrategi Bjørn Ransve` og `Handlingsplan 12 måneder` for det.

---

## 2. Grunnprinsipp: to produkter, ett kildepunkt

| | ransve.com | Innhold / sosiale medier |
|---|---|---|
| Verktøy | Claude Code | Claude Projects (+ Claude Cowork ved behov) |
| Arbeidsform | Filbasert kodearkiv, agentfiler med verktøytilganger | Samtalebasert, prosjektkunnskap lastet opp |
| Leveranse | Bygget nettside, deployet via SFTP | Tekstutkast klare til å limes inn i Buffer/Metricool/MailerLite |
| "Agenter" | `.claude/agents/*.md` — faktiske, kjørbare enheter | Egne instruksjonssett per oppgavetype — tekst, ikke kjøretidsobjekter |

**Det som er felles er ikke agent-*motoren*, men kilde­materialet den jobber fra:** biografien, verkslistene, kommunikasjonsstrategien og språkreglene. Disse ligger i ett kildepunkt (`/knowledge/`) i dette repoet, og *kopieres* — som opplastede filer eller limt inn tekst — inn i det tilsvarende Claude Project. Endrer du en regel, oppdaterer du den ett sted i `/knowledge/`, og oppdaterer deretter Project-instruksjonene manuelt (se kap. 7.3 for en enkel rutine på dette).

Dette dokumentet dekker kun venstre kolonne. Høyre kolonne får sitt eget kort notat i kapittel 7 for å forklare koblingen.

---

## 3. Repostruktur

```
/ransve-prosjekt/                    (monorepo, git)
│
├── CLAUDE.md                        # Rot-regler — arves av ALT under, inkl. website
├── knowledge/                       # Delt kildemateriale — kun lesing for agentene
│   ├── biografi.md
│   ├── kommunikasjonsstrategi.md
│   ├── verksliste.md
│   ├── utstillinger-og-samlinger.md
│   └── sprakregler.md               # Kildepunktet som også limes inn i Claude Projects
│
├── website/                         # Dette dokumentets domene
│   ├── CLAUDE.md                    # Tekniske tillegg (Astro, Domeneshop)
│   ├── .claude/
│   │   └── agents/
│   │       ├── astro-bygger.md
│   │       ├── faktasjekker.md
│   │       ├── oversetter-en.md
│   │       ├── innhold-integrator.md
│   │       └── deploy-domeneshop.md
│   ├── src/
│   │   ├── content/
│   │   │   ├── tidslinje/           # tidslinje.csv (tiårspaneler) + README.md
│   │   │   └── verk/                # verk.csv (NO + EN felt per rad) + README.md
│   │   ├── assets/
│   │   │   ├── tidslinje/           # bilder til tidslinje.csv, filnavn = bildefil-kolonnen
│   │   │   └── verk/                # bilder til verk.csv
│   │   ├── lib/
│   │   │   ├── csv.ts                # CSV-parser brukt av content.config.ts
│   │   │   └── images.ts             # filnavn → ImageMetadata, feiler bygget ved feil stavemåte
│   │   ├── content.config.ts        # definerer collections, én fil-loader per CSV
│   │   ├── pages/
│   │   │   ├── index.astro
│   │   │   ├── en/index.astro
│   │   │   ├── om.astro
│   │   │   └── tidslinje.astro
│   │   └── components/
│   ├── public/
│   ├── .env                         # SFTP-credentials — ALDRI i git
│   ├── .gitignore                   # må inkludere .env, node_modules, dist
│   ├── astro.config.mjs
│   └── package.json
│
└── content/                         # Speiler kun det som faktisk trengs lokalt
    └── README.md                    # Peker til Claude Projects — ingen kjørbare agenter her
```

**Merk:** `content/`-mappen i repoet er bevisst tynn. Selve innholdsproduksjonen skjer ikke i dette repoet — den skjer i Claude Projects. Mappen finnes kun som et sted å eksportere ferdig, godkjent tekst *til* før den settes inn som en rad i `website/src/content/verk/verk.csv` (se kap. 7.2).

**Innholdsarkitektur (revidert september 2026):** hver content collection er
én CSV-fil (`tidslinje.csv`, `verk.csv`) med bilder i en tilhørende
`src/assets/<samling>/`-katalog. Dette erstatter den opprinnelige planen om
én Markdown-fil per verk/panel. Årsak: Bjørn skal kunne redigere metadata
direkte i én samlet, regneark-vennlig fil, og bildene skal ligge sortert og
navngitt i en fast rekkefølge i én katalog, i stedet for spredt over mange
enkeltfiler. CSV-ens bildekolonne (`bildefil`) inneholder kun et filnavn —
komponentene slår det opp mot bildekatalogen via `src/lib/images.ts`, som
feiler bygget med en tydelig feilmelding hvis filnavnet ikke finnes. Se
`website/src/content/tidslinje/README.md` og `website/src/content/verk/README.md`
for hvordan filene redigeres.

---

## 4. CLAUDE.md-hierarkiet

Claude Code laster `CLAUDE.md`-filer fra alle nivåer på vei ned til arbeidsmappen — rotfilen gjelder alltid, og undermappens fil legger til presiseringer.

### 4.1 Rot: `/ransve-prosjekt/CLAUDE.md`

```markdown
# ransve-prosjekt — felles regler

Disse reglene gjelder for ALL tekst og alt arbeid i dette repoet, uavhengig
av om det havner på nettsiden.

## Språkregler (ufravikelig)
Ett verk, én tanke. Begynn med det man ser. Konkrete substantiv.
Forbudte ord: ikonisk, verdenskjent, mesterverk, unik, tidløs, ubestridt.
Si prisen, eller si at verket ikke er til salgs. Skriv «du», ikke «man».
Maks 60 ord før «les mer». Alltid tittel, år, teknikk, mål.
Ingen emojier i verkstekster. Innrøm det du ikke vet.

## Faktagrenser (ufravikelig)
- Alle årstall og navn skal kontrolleres mot /knowledge/biografi.md før publisering.
- Ingen publisert tekst fra bøkene gjengis ordrett — alltid omskrevet, kilde oppgitt.
- Aldri AI-genererte bilder av Ransves verk eller "i hans stil" — verken som
  illustrasjon eller eksperiment, internt eller offentlig.

## Rettigheter
- Ransve er BONO-medlem. Ikke-ervervsmessig formidling er unntatt meldeplikt-fritt,
  men skal meldes til BONO. Ervervsmessig bruk avklares særskilt — spør Lars, gjett aldri.
- Kunstavgift 5 % til BKH gjelder ved salg over 2000 kr.

## Kilder
Bruk kun /knowledge/*.md som faktagrunnlag. Oppgi hvilken kilde en påstand
bygger på når det er tvil.
```

### 4.2 Website: `/ransve-prosjekt/website/CLAUDE.md`

```markdown
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
- Engelsk er hovedspråk på ransve.com (jf. strategiens "engelsk først" for nettsiden).
  Norsk versjon ligger under /no/.
- Hver verkside har: tittel, år, teknikk, mål, kort tekst (NO+EN), bilde,
  status/pris — se kolonnene i `src/content/verk/verk.csv`.
- Forsiden viser et utvalg på rundt 12 verk, en tidslinje og en kort
  om-tekst — ikke mer, jf. fase 0–1 i handlingsplanen.

## Hosting
- Domeneshop Web Light. FTP/SFTP. INGEN SSH, ingen PHP, ingen Node på serveren.
- Produksjonsbygg (npm run build) → dist/ → lastes opp via SFTP.
- Domenenavn: ransve.com

## Credentials
- SFTP-brukernavn/passord ligger i website/.env, ALDRI i kode, agentfiler eller commits.
- .env står i .gitignore. Sjekk dette før hver commit.
```

---

## 5. Agentroster — website-teamet

| Agent | Ansvar | Verktøy | Modell | Skrivetilgang |
|---|---|---|---|---|
| `astro-bygger` | Bygger og endrer Astro-sider, komponenter, ruter | Read, Write, Edit, Bash | inherit | Ja (kun `website/src`, `website/public`) |
| `faktasjekker` | Kontrollerer årstall/navn mot biografien før publisering | Read, Grep, Glob | sonnet | Nei — skrivebeskyttet med vilje |
| `oversetter-en` | To-runders engelsk oversettelse av verkstekster og sidetekst | Read, Write | sonnet | Ja (kun engelske filer) |
| `innhold-integrator` | Tar ferdig, godkjent tekst fra `/content/klar-for-web/` og setter den inn som en rad i `verk.csv` | Read, Write, Edit | sonnet | Ja (kun `src/content/verk`, `src/assets/verk`) |
| `deploy-domeneshop` | Bygger produksjon og laster opp via SFTP | Bash | haiku | Kun `dist/`-overføring, ingen kildekode |

Prinsipp: den som *skriver* og den som *kontrollerer* er alltid to forskjellige agenter. `faktasjekker` har derfor bevisst ingen skrivetilgang — den flagger, den retter ikke selv.

---

## 6. Agentdefinisjoner

Legg disse i `website/.claude/agents/`.

### 6.1 `astro-bygger.md`

```markdown
---
name: astro-bygger
description: Bygger og endrer Astro-sider, komponenter og content collections for ransve.com. Brukes til alt strukturelt og visuelt arbeid på nettsiden.
tools: Read, Write, Edit, Bash
model: inherit
---

Du er frontend-utvikleren for ransve.com, bygget i Astro.

Prinsipper:
- Statisk generering. Ingen server-side logikk, ingen database, ingen klient-tunge
  rammeverk med mindre det er eksplisitt bedt om.
- Innhold hentes fra Astro content collections (src/content/*/*.csv), aldri
  hardkodet i komponentene. Hver samling er én CSV-fil + én bildekatalog i
  src/assets/ — filnavn i CSV-ens bildekolonne, aldri en sti. Se
  website/CLAUDE.md og src/lib/images.ts. Ikke gå tilbake til én
  Markdown-fil per verk/panel — det var forrige arkitektur.
- Engelsk er hovedspråket på forsiden; norsk ligger under /no/.
- Verksider skal alltid vise: tittel, år, teknikk, mål, kort tekst, bilde, status/pris.
- Endre aldri tekstinnhold selv — det er faktasjekker og oversetter-en sin jobb.
  Du strukturerer og viser fram, du dikter ikke opp tekst.
- Følg frontend-design-prinsippene for visuell utforming: bevisste typografiske
  valg, ikke standard malprisme.

Når du er ferdig med en endring: kjør `npm run build` lokalt for å bekrefte at
siten fortsatt bygger uten feil, før du rapporterer tilbake.
```

### 6.2 `faktasjekker.md`

```markdown
---
name: faktasjekker
description: Kontrollerer årstall, navn og faktapåstander mot biografidokumentet. Brukes ALLTID før ny tekst publiseres på nettsiden.
tools: Read, Grep, Glob
model: sonnet
---

Du kontrollerer fakta i utkast mot /knowledge/biografi.md,
/knowledge/verksliste.md og /knowledge/utstillinger-og-samlinger.md.

For hver faktapåstand i teksten du får (årstall, stedsnavn, personnavn,
utstillingstittel, museum, pris):
1. Finn belegg i kildedokumentene.
2. Merk uverifiserte eller motstridende påstander med
   [SJEKK: forklar hva som mangler eller ikke stemmer].
3. Rapporter kun avvik og usikkerheter i et kort sammendrag.

Du har ingen skrivetilgang og skal aldri foreslå omformuleringer av selve
teksten — det er en annen agents jobb. Du flagger fakta, du redigerer ikke prosa.
```

### 6.3 `oversetter-en.md`

```markdown
---
name: oversetter-en
description: Oversetter godkjent norsk verkstekst og sidetekst til engelsk, i to runder. Brukes etter at faktasjekker har godkjent norsk tekst.
tools: Read, Write
model: sonnet
---

Du oversetter til engelsk i to faste runder:
1. Første runde: presis oversettelse av norsk kildetekst.
2. Andre runde: gjør resultatet kortere og mindre høytidelig, og forklar norske
   egennavn og institusjoner en internasjonal leser ikke kjenner
   (f.eks. "Kunstnerforbundet" → kort forklarende apposisjon).

Samme språkregler gjelder som på norsk: konkrete substantiv, ingen av ordene
iconic, world-famous, masterpiece, unique, timeless, undisputed. Alltid tittel,
år, teknikk og mål. Behold prisangivelser eksakt som i kildeteksten — oversett
aldri om et beløp eller en valuta.

Du oversetter kun tekst som allerede er faktasjekket. Hvis du mottar tekst
uten tydelig godkjenning, si fra og be om bekreftelse før du fortsetter.
```

### 6.4 `innhold-integrator.md`

```markdown
---
name: innhold-integrator
description: Tar ferdig godkjent tekst (fra Claude Projects, eksportert til content/klar-for-web/) og setter den inn som en rad i verk.csv. Brukes når nytt verk eller ny sidetekst skal inn på nettsiden.
tools: Read, Write, Edit
model: sonnet
---

Du er broen mellom innholdsproduksjonen (som skjer utenfor dette repoet, i
Claude Projects) og nettsidens innholdsarkitektur: én CSV-fil per samling,
med bilder i en tilhørende bildekatalog. Se `website/src/content/verk/README.md`
for kolonneoversikten og `website/CLAUDE.md` for arkitekturen generelt.

Når du får en tekstfil fra `../content/klar-for-web/`:
1. Sjekk at den har alle påkrevde felt: id (slug), tiår, årstall, tittel,
   teknikk, mål, NO-tekst, EN-tekst, status, pris, bildereferanse.
2. Mangler noe — spør, dikt aldri opp manglende data selv.
3. Les `website/src/content/verk/verk.csv` i sin helhet.
   - Nytt verk: legg til en ny rad nederst, med en unik `id` (kebab-case av
     tittel + årstall, f.eks. `love-litografiet-2011`).
   - Oppdatering av eksisterende verk: finn raden med samme `id` og erstatt
     hele raden — ikke bare enkeltfelt, for å unngå at gamle og nye verdier
     blandes i samme rad.
   - CSV har kommentarer i en `README.md` ved siden av seg, ikke i selve
     filen — hver rad skal derfor bare inneholde data, i riktig kolonnerekkefølge.
4. Legg bildefilen i `website/src/assets/verk/` med nøyaktig samme filnavn
   som du skriver i `bildefil`-kolonnen. Feil stavemåte her stopper bygget —
   dobbeltsjekk at filnavnet i raden og filnavnet på disk er identiske.
5. Flytt kildefilen til `../content/arkivert/` når den er integrert, slik at
   `klar-for-web/` alltid viser hva som gjenstår.

Skriv rene CSV-rader: bruk anførselstegn rundt felt som inneholder komma,
anførselstegn eller linjeskift, og doble eventuelle anførselstegn inni et
sitert felt (`"` → `""`) — samme regel som Excel/Numbers bruker. Er du i tvil
om et felt er korrekt escapet, spør heller enn å gjette — en feil her kan
forskyve alle kolonnene i raden.

Du endrer aldri selve teksten — det er faktasjekker og oversetter-en sitt ansvar,
og skal være gjort før filen når deg.
```

### 6.5 `deploy-domeneshop.md`

```markdown
---
name: deploy-domeneshop
description: Bygger Astro-siten og laster opp til Domeneshop Web Light via SFTP. Brukes kun når det eksplisitt bes om deploy — aldri automatisk.
tools: Bash
model: haiku
---

Du bygger og deployer ransve.com til Domeneshop Web Light.

Fremgangsmåte:
1. Kjør `npm run build` i website/.
2. Last opp innholdet i website/dist/ via sftp/lftp, med credentials lest fra
   miljøvariabler (aldri hardkod brukernavn eller passord i kommandoer, skript
   eller filer som kan havne i git).
3. Domeneshop Web Light har ingen SSH — bruk kun FTP/SFTP-protokollen.
4. Rapporter hva som ble lastet opp (antall filer, evt. slettede filer på
   serveren som ikke finnes lokalt lenger).

Før overskriving av live-siten utenfor rutinemessige oppdateringer: spør om
bekreftelse først. Du gjør ingen andre endringer i filsystemet enn dist-mappen
og eventuelle midlertidige byggefiler.
```

---

## 7. Koblingen til Claude Projects (innholdsproduksjon)

Dette dokumentet styrer ikke innholdsproduksjonen, men her er de tre koblingspunktene som må holdes ved like manuelt.

### 7.1 Kunnskapsbase — samme kilde, to opplastinger

`/knowledge/`-filene i dette repoet er sannheten. Når de endres, last de samme filene opp på nytt som prosjektkunnskap i det relevante Claude Project. Det finnes ingen automatisk synkronisering mellom Claude Code og Claude Projects — dette er en manuell rutine, ikke en teknisk kobling.

### 7.2 Ferdig tekst inn i nettsiden

Når en verkstekst er skrevet og godkjent i Claude Projects:
1. Eksporter/lim inn teksten som en fil i `/content/klar-for-web/`.
2. Be `innhold-integrator`-agenten i Claude Code sette den inn som en rad i `website/src/content/verk/verk.csv`, og legge bildefilen i `website/src/assets/verk/`.
3. `faktasjekker` og `oversetter-en` kan kjøres på nytt her som en siste kontroll før publisering — nettsiden er det mest varige og offentlige leddet, så det tåler én kontroll ekstra selv om teksten allerede er sjekket i Projects.

### 7.3 Holde reglene i sync

`/knowledge/sprakregler.md` er master-versjonen av språkreglene. Når du endrer en regel der:
1. Oppdater `CLAUDE.md` i roten av dette repoet (kopier inn samme tekst).
2. Lim samme tekst inn i instruksjonene til hvert relevante Claude Project.

Dette er bevisst enkelt og manuelt — med seks timer i uken er en tredje synkroniseringsmekanisme mer arbeid enn den sparer.

---

## 8. Sikkerhet: håndtering av SFTP-credentials

- Domeneshop-passordet ligger kun i `website/.env`, som står i `.gitignore` fra dag én.
- `deploy-domeneshop`-agenten har kun `Bash`-tilgang, ingen `Read`/`Write` på selve kildekoden — den skal ikke kunne lese eller endre annet enn å bygge og overføre.
- Før første commit: kjør `git status` og bekreft at `.env` ikke listes som sporet fil.
- Ved behov for å dele tilgang med noen andre senere: bytt passord fremfor å dele det som tekst i en samtale eller et dokument.

---

## 9. Oppsettsrekkefølge

1. Opprett repoet `/ransve-prosjekt/` med `CLAUDE.md` og `/knowledge/` først.
2. Legg biografi, strategi og verksliste i `/knowledge/` som Markdown.
3. Initialiser `website/` som Astro-prosjekt (`npm create astro@latest`).
4. Legg `website/CLAUDE.md` og opprett `website/.claude/agents/` med de fem filene i kapittel 6.
5. Sjekk `.gitignore` (node_modules, dist, .env) før første commit.
6. Test rekkefølgen på ett enkelt verk: skriv tekst i Claude Projects → eksporter til `content/klar-for-web/` → `innhold-integrator` → `faktasjekker` → `oversetter-en` → `astro-bygger` setter det inn visuelt.
7. Sett opp `deploy-domeneshop` sist, når Web Light-pakken faktisk er kjøpt og SFTP-tilgangen er klar.
8. Første deploy: kjør manuelt og verifiser på ransve.com før du stoler på agenten for rutinemessige oppdateringer.

---

## 10. Vedlikehold og eierskap

- Alle agentfiler sjekkes inn i git — de er en del av prosjektets kildekode, ikke personlige innstillinger.
- Endringer i `CLAUDE.md` eller agentfiler bør committes med egen commit-melding, adskilt fra innholdsendringer, slik at reglene har egen historikk.
- Lars er eneste bidragsyter per nå — dokumentet er skrevet slik at det tåler at flere kommer til senere uten omstrukturering.
