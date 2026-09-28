# Sidetekst — forside, Om, Kontakt

Én Markdown-fil per side. Frontmatal (mellom `---`) styrer kicker-teksten,
overskriften og om portrettet skal vises; teksten under er selve
sideinnholdet og kan skrives som vanlig Markdown (avsnitt, lister, uthevet
tekst).

| Fil | Side | Viser portrett? |
|---|---|---|
| `forside.md` | `/no/` | Ja |
| `verk.md` | `/no/verk/` | Nei — kun kicker/overskrift/intro. Selve verkene kommer fra `../verk/verk.csv`. |
| `om.md` | `/no/om/` | Ja |
| `kontakt.md` | `/no/kontakt/` | Nei |

## Felter

| Felt | Betyr |
|---|---|
| `merkelapp` | Den lille grå kicker-teksten over overskriften. |
| `overskrift` | Overskriftens linjer, én per listeelement — hver linje får sitt eget linjeskift. |
| `portrettTekst` | Valgfri. Sett den for å vise portrettrotasjonen (samme bilder som forsiden) med denne billedteksten. Utelates helt for sider uten portrett. |

## Kontakt-informasjon

`kontakt.md` har tre linjer merket «trengs» (e-post, Instagram, nyhetsbrev).
Disse er bevisst ikke fylt inn — ingen av oss skal gjette en adresse eller et
brukernavn. Fyll dem inn direkte i fila når de er klare.
