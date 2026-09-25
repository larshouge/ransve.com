// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ransve.com',
  // Engelsk forside kommer når oversetter-en har levert tekst.
  // Inntil da sendes / videre til den norske forsiden.
  redirects: {
    '/': '/no/',
  },
});
