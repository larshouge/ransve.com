# Språkregler

Dette er master-versjonen av språkreglene. Kortversjonen ligger også i
`CLAUDE.md` i repoets rot — hold de to i sync manuelt når denne endres
(se `docs/arkitektur-agentstruktur-ransve.md`, kap. 7.3). Samme tekst skal
limes inn som instruksjon i de tilsvarende Claude Projects for
innholdsproduksjon.

## Hvorfor dette er den delen som avgjør mest

Målgruppen ("den første samleren", 30–45 år) har en svært fintfølende radar
for markedsføringsspråk. Skriv som om du forklarer noe til en venn som er
smart, men som ikke kan kunsthistorie.

## Ti regler

1. Ett verk, én tanke. Ikke to.
2. Begynn med det man ser, ikke med det man skal mene.
3. Konkrete substantiv. Forbudte ord: ikonisk, verdenskjent, mesterverk, unik, tidløs, ubestridt.
4. Si prisen, eller si at verket ikke er til salgs. Taushet om pris er den største barrieren for nye kjøpere.
5. Still ett spørsmål, og svar på alle som kommer. Innen ett døgn.
6. Skriv «du», ikke «man».
7. Maks 60 ord før «les mer»-knappen.
8. Alltid tittel, år, teknikk og mål. Alltid.
9. Innrøm det du ikke vet. «Jeg vet ikke hvorfor han sluttet med dette i 1987» er godt innhold.
10. Ingen emojier i verkstekster. I svar og kommentarer er de greie.

## Før og etter

|  | Slik ikke | Slik heller |
|---|---|---|
| Verkstekst | «Bjørn Ransve er en av Norges mest anerkjente kunstnere, og dette ikoniske verket viser hans mesterlige beherskelse av det grafiske mediet.» | «Han tegnet den samme båten i tretti år. Denne er fra 1998. Havet er helt flatt — du ser skroget bare fordi det speiler seg i det. Litografi, opplag 60.» |
| Historie | «Ny post! Sjekk ut dette fantastiske maleriet.» | «I 1990 hang tre etasjer fulle av dette. Folk hadde kommet for å se harlekiner og aper. De fikk svarte flater med hvite streker. Noen ble sinte. Museet kjøpte.» |
| Salg | «Ta kontakt for pris.» | «Opplag 60, 22 igjen. 6 800 kr, uinnrammet. Svar her eller send melding.» |

## Verksteksten på mal

Fast oppsett, brukes av alle agenter og prosjekter som produserer verkstekst:

1. Tittel, år, teknikk, mål
2. Én setning om hva du ser
3. Én setning om hva som er rart/uventet
4. Én setning om hvor verket hører hjemme i serien
5. Pris eller status

## Engelsk

Samme regler, men kortere. Engelsk går som andre avsnitt i samme innlegg på
sosiale medier — ikke som eget innlegg, og ikke som en oversettelse som
lyder oversatt. Nettsiden og nyhetsbrevet er engelsk først, norsk versjon
under. Fagbegreper forklares: en internasjonal leser vet ikke hva
Kunstnerforbundet eller Festspillutstillingen er.

Forbudte ord på engelsk (tilsvarende de norske): iconic, world-famous,
masterpiece, unique, timeless, undisputed.

## Grenser som ikke er forhandlingsbare

- Aldri generere bilder av Ransves verk, eller bilder «i hans stil». Ikke som
  illustrasjon, ikke som eksperiment, ikke internt.
- Aldri publisere en setning om kunsten som du ikke selv ville skrevet.
- Aldri lime publisert tekst fra bøkene inn som ferdig innhold. Bruk den som
  kilde, skriv nytt, oppgi hvor det kommer fra.
- Kontroller hvert årstall og hvert navn mot biografien før publisering.
- Si fra hvis AI er brukt til noe som er synlig for publikum — for eksempel
  undertekster eller oversettelse.

## En prompt-mal du kan gjenbruke

*Du skriver for kunstnerskapet til Bjørn Ransve. Bruk bare kildene i
kunnskapsbasen. Regler: konkrete substantiv, ingen superlativer, ingen av
ordene ikonisk, verdenskjent, mesterverk, unik, tidløs. Maks 60 ord i første
avsnitt. Alltid tittel, år, teknikk og mål til slutt. Ingen publisert tekst
skal gjengis ordrett — skriv om, og oppgi hvilken kilde påstanden bygger på.
Merk hver faktapåstand du er usikker på med [SJEKK]. Skriv tre alternative
åpningssetninger, ikke én.*
