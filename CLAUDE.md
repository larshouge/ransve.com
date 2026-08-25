# ransve-prosjekt — felles regler

Disse reglene gjelder for ALL tekst og alt arbeid i dette repoet, uavhengig av
om det havner på nettsiden. De arves automatisk av alle undermapper og agenter
i Claude Code (CLAUDE.md-hierarkiet lastes oppover fra arbeidsmappen).

## Språkregler (ufravikelig)
Ett verk, én tanke. Begynn med det man ser. Konkrete substantiv.
Forbudte ord: ikonisk, verdenskjent, mesterverk, unik, tidløs, ubestridt.
Si prisen, eller si at verket ikke er til salgs. Skriv «du», ikke «man».
Maks 60 ord før «les mer». Alltid tittel, år, teknikk, mål.
Ingen emojier i verkstekster. Innrøm det du ikke vet.

Full versjon med begrunnelse og eksempler: se `knowledge/sprakregler.md`.

## Faktagrenser (ufravikelig)
- Alle årstall og navn skal kontrolleres mot `knowledge/biografi.md` og
  `knowledge/utstillinger-og-samlinger.md` før publisering.
- Ingen publisert tekst fra bøkene gjengis ordrett — alltid omskrevet, med
  kilde oppgitt der det er relevant.
- Aldri AI-genererte bilder av Ransves verk eller "i hans stil" — verken som
  illustrasjon eller eksperiment, internt eller offentlig.

## Rettigheter
- Ransve er BONO-medlem. Ikke-ervervsmessig formidling er unntatt betaling,
  men skal meldes til BONO. Ervervsmessig bruk avklares særskilt — spør Lars,
  gjett aldri.
- Kunstavgift 5 % til Bildende Kunstneres Hjelpefond (BKH) gjelder ved salg
  over 2000 kr, uavhengig av BONO.
- Fotografier: fotografen har egne rettigheter til bildene. Skriftlig,
  ubegrenset bruksrett skal være avtalt før bildene brukes i formidling.

## Kilder
Bruk kun `knowledge/*.md` som faktagrunnlag for påstander om Ransves liv,
verk og karriere. Oppgi hvilken kilde en påstand bygger på når det er tvil.

## Struktur i dette repoet
- `knowledge/` — delt kildemateriale, kun lesing for agentene.
- `website/` — ransve.com, bygget i Astro, driftes med Claude Code-agenter
  (se `website/CLAUDE.md` og `website/.claude/agents/`).
- `content/` — mottakslomme for tekst som er ferdig produsert og godkjent i
  Claude Projects, klar til å integreres i nettsiden. Selve
  innholdsproduksjonen skjer IKKE i dette repoet.
- `docs/` — arkitektur- og beslutningsdokumenter for prosjektet.
