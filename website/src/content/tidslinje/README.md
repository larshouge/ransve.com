# Tidslinjen på forsiden — slik redigerer du den

All tekst og alle bilder til de sju tiårspanelene på forsiden styres fra
**`tidslinje.csv`**, én rad per panel. Bildene selv ligger i
`website/src/assets/tidslinje/`.

## Redigere en rad

Åpne `tidslinje.csv` (på GitHub vises den som en tabell — trykk blyant-ikonet
for å redigere), eller last den ned og åpne i Excel/Numbers/Google Sheets og
last opp igjen etterpå.

| Kolonne | Betyr | Eksempel |
|---|---|---|
| `id` | Fast kode for panelet. Ikke endre denne. | `2020` |
| `rekkefolge` | Hvilken plass panelet har på siden. 1 øverst. | `1` |
| `aar` | Årstall(ene) som vises som stor overskrift. | `2010–19` |
| `tittel` | Kort tittel under årstallet. | `Løve-litografiet, 2011` |
| `bildefil` | **Bare filnavnet**, ikke sti — filen må ligge i `../../assets/tidslinje/`. | `2010.jpg` |
| `alt` | Beskrivelse av bildet for skjermlesere (synes ikke på siden). | `Litografi av en løve i kobolt og svart` |
| `bildetekst` | Den lille grå teksten under bildet. | `Litografi, 2011 — opplag trengs` |
| `tekst` | Avsnittet med brødtekst. | — |

## Bytte eller legge til bilde

1. Legg bildefilen i `website/src/assets/tidslinje/`.
2. Skriv det nøyaktige filnavnet (med endelse, f.eks. `.jpg`) i `bildefil`-kolonnen
   på riktig rad.

Stavefeil i `bildefil` stopper bygget med en tydelig feilmelding — det er med
vilje, så en feil oppdages med én gang og ikke først når noen besøker siden.

## Endre rekkefølgen

Bare endre tallene i `rekkefolge`-kolonnen. Radene i selve filen kan stå i
hvilken som helst rekkefølge — det er tallet som styrer.

## Legge til et åttende panel

Legg til en ny rad med en ny, unik `id`. Husk et `rekkefolge`-tall som ikke
finnes fra før.
