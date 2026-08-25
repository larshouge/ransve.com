# ransve.com — website

Astro-prosjektet for ransve.com. Driftes med Claude Code og agentene i
`.claude/agents/`.

## Status

Mappestruktur og agenter er på plass. Selve Astro-prosjektet er **ikke**
initialisert ennå (krever `npm install` og en utviklingsmaskin — se
prosjektnotatet om MacBook Air).

## Oppstart (når maskinen er klar)

```bash
# Fra website/-mappen:
npm create astro@latest .
# Velg: tomt prosjekt (empty), TypeScript valgfritt, installer avhengigheter: ja

# Legg til content collections-konfigurasjon for src/content/verk/
# Se docs/arkitektur-agentstruktur-ransve.md for full spesifikasjon
```

Etter initialisering:
1. Kopier `.env.example` til `.env` og fyll inn Domeneshop-credentials.
2. Bekreft at `.env`, `node_modules/` og `dist/` står i `.gitignore`.
3. Test `astro-bygger`-agenten på en enkel side før du bygger noe stort.

## Agenter

Se `.claude/agents/` for de fem agentene som drifter dette prosjektet:
`astro-bygger`, `faktasjekker`, `oversetter-en`, `innhold-integrator`,
`deploy-domeneshop`. Full beskrivelse i
`../docs/arkitektur-agentstruktur-ransve.md`.
