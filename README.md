# ransve-prosjekt

Monorepo for den digitale kommunikasjonsstrategien til Bjørn Ransve.

Dette repoet dekker **ransve.com** (bygget med Claude Code) og kunnskapsbasen
som både nettsiden og innholdsproduksjonen i Claude Projects leser fra.
Selve innholdsproduksjonen for sosiale medier og nyhetsbrev skjer utenfor
dette repoet, i egne Claude Projects — se `content/README.md` for koblingen.

## Struktur

```
ransve-prosjekt/
├── CLAUDE.md                  Felles regler for alt arbeid i repoet
├── knowledge/                 Delt kildemateriale (biografi, strategi, språkregler)
├── website/                   ransve.com — Astro-prosjekt + Claude Code-agenter
├── content/                   Mottakslomme for ferdig, godkjent tekst fra Claude Projects
└── docs/                      Arkitektur- og beslutningsdokumenter
```

## Kom i gang

Se `docs/arkitektur-agentstruktur-ransve.md` for full beskrivelse av
agentstrukturen, oppsettsrekkefølgen og hvordan dette repoet forholder seg
til innholdsproduksjonen i Claude Projects.

## Status

Struktur og agentdefinisjoner er på plass. `website/` er ennå ikke initialisert
som et kjørbart Astro-prosjekt (`npm create astro@latest`) — det gjøres når
utviklingsmaskinen (MacBook Air) er anskaffet. Se `website/README.md`.
