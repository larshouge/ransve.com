# Verk-oversikten — slik redigerer du den

Samme mønster som tidslinjen på forsiden (se `../tidslinje/README.md`): all
metadata for hvert verk ligger i **`verk.csv`**, én rad per verk. Bildene
ligger i `website/src/assets/verk/`.

**Status:** denne filen er tom (kun kolonneoverskrifter). Selve
galleri-/verksiden som skal vise disse radene er ikke bygget ennå — det er et
eget, senere steg. Arkitekturen står klar for når Bjørn begynner å legge inn
verk.

## Kolonner

| Kolonne | Betyr | Eksempel |
|---|---|---|
| `id` | Unik kode for verket (blir del av nettadressen). Kun bokstaver, tall og bindestrek. | `love-litografiet-2011` |
| `tiar` | Hvilket tiår verket hører til — brukes til filtrering/gruppering. | `2010` |
| `rekkefolge` | Rekkefølge innad i visningen. Lavest tall først. | `1` |
| `aar` | Årstall som vises. | `2011` |
| `tittel` | Verkets tittel. | `Løven` |
| `teknikk` | Teknikk/medium. | `Litografi` |
| `mal` | Mål (høyde × bredde, i cm). | `50 × 70 cm` |
| `bildefil` | **Bare filnavnet**, ikke sti — filen må ligge i `../../assets/verk/`. | `love-litografiet-2011.jpg` |
| `alt` | Beskrivelse for skjermlesere. | `Litografi av en løve i kobolt og svart` |
| `tekst_no` | Kort verkstekst på norsk (jf. `knowledge/sprakregler.md` — maks 60 ord før «les mer»). | — |
| `tekst_en` | Samme tekst på engelsk, skrevet av `oversetter-en` — ikke en direkte oversettelse ord for ord. | — |
| `status` | `til salgs`, `solgt`, eller `ikke til salgs`. | `til salgs` |
| `pris` | Pris med valuta, eller tom hvis ikke til salgs. Språkreglene krever at ett av de to alltid er utfylt — aldri taushet om pris. | `6 800 kr` |

## Arbeidsflyt

1. Tekst skrives og godkjennes i Claude Projects, eksporteres til
   `../../../content/klar-for-web/` (jf. rot-`CLAUDE.md`).
2. `innhold-integrator`-agenten legger inn eller oppdaterer raden i
   `verk.csv`, og flytter kildefilen til `content/arkivert/`.
3. Legg bildefilen i `website/src/assets/verk/` med samme filnavn som i
   `bildefil`-kolonnen.

Stavefeil i `bildefil` stopper bygget med en tydelig feilmelding, samme som
for tidslinjen.
