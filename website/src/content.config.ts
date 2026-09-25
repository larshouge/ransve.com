import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parseCsv } from './lib/csv';

// Ett tiårspanel på forsiden. All metadata i én fil (tidslinje.csv), bilder
// i src/assets/tidslinje/ — se README.md i samme mappe for hvordan man
// redigerer. bildefil er kun et filnavn, ikke en sti: komponentene slår det
// opp mot en bildekatalog via src/lib/images.ts.
const tidslinje = defineCollection({
  loader: file('src/content/tidslinje/tidslinje.csv', { parser: parseCsv }),
  schema: z.object({
    rekkefolge: z.coerce.number(),
    aar: z.string(),
    tittel: z.string(),
    bildefil: z.string(),
    alt: z.string(),
    bildetekst: z.string(),
    tekst: z.string(),
  }),
});

// Verk-oversikten. Samme mønster som tidslinjen — én fil, én bildekatalog
// (src/assets/verk/). Tom inntil videre; se README.md i src/content/verk/.
const verk = defineCollection({
  loader: file('src/content/verk/verk.csv', { parser: parseCsv }),
  schema: z.object({
    tiar: z.string(),
    rekkefolge: z.coerce.number(),
    aar: z.string(),
    tittel: z.string(),
    teknikk: z.string(),
    mal: z.string(),
    bildefil: z.string(),
    alt: z.string(),
    tekst_no: z.string(),
    tekst_en: z.string(),
    status: z.string(),
    pris: z.string(),
  }),
});

// Sidetekst som ikke hører til et enkelt verk (forside-intro o.l.).
const sider = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/sider' }),
  schema: z.object({
    merkelapp: z.string(),
    overskrift: z.array(z.string()),
    portrettTekst: z.string(),
  }),
});

export const collections = { tidslinje, verk, sider };
