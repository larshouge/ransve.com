import type { ImageMetadata } from 'astro';

/**
 * CSV-radene peker til bilder med filnavn alene (f.eks. "2020.jpg"), ikke
 * full sti. Denne bygger et oppslag filnavn → ImageMetadata fra resultatet
 * av et `import.meta.glob(..., { eager: true })`-kall mot bildekatalogen.
 */
export function buildImageMap(
  glob: Record<string, { default: ImageMetadata }>
): Record<string, ImageMetadata> {
  const map: Record<string, ImageMetadata> = {};
  for (const path in glob) {
    const filename = path.split('/').pop();
    if (filename) map[filename] = glob[path].default;
  }
  return map;
}

/**
 * Slår opp et bilde fra kartet over. Kaster en tydelig feil ved bygg hvis
 * filnavnet i CSV-filen ikke finnes i bildekatalogen — bedre å stoppe bygget
 * enn å sende et ødelagt bilde til nettsiden.
 */
export function resolveImage(
  map: Record<string, ImageMetadata>,
  filename: string,
  context: string
): ImageMetadata {
  const img = map[filename];
  if (!img) {
    const available = Object.keys(map).sort().join(', ') || '(ingen filer funnet)';
    throw new Error(
      `Fant ikke bildefilen "${filename}" (${context}). ` +
        `Sjekk stavemåten i CSV-filen. Filer som faktisk ligger i katalogen: ${available}`
    );
  }
  return img;
}
