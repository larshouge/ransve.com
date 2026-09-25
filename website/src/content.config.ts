import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Ett tiårspanel på forsiden. Brødteksten i Markdown-filen er paneltekstet.
const tidslinje = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/tidslinje' }),
  schema: ({ image }) =>
    z.object({
      rekkefolge: z.number(),
      aar: z.string(),
      tittel: z.string(),
      bilde: image(),
      alt: z.string(),
      bildetekst: z.string(),
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

export const collections = { tidslinje, sider };
