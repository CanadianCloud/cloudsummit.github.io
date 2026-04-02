const SITE_FALLBACK = "https://cloudsummit.ca";

/**
 * Absolute canonical URL for the current page.
 * Relies on `site` in astro.config (https://cloudsummit.ca).
 */
export function getCanonical(astro: {
  url: URL;
  site: URL | undefined;
}): string {
  const base = astro.site ?? new URL(SITE_FALLBACK);
  return new URL(astro.url.pathname, base).href;
}

/** Default Open Graph / Twitter image (absolute URL). Use a raster; many crawlers prefer JPEG/PNG. */
export const DEFAULT_OG_IMAGE_PATH = "/images/locations/science-world-vancouver.jpg";

/**
 * Turn a site-root path (e.g. `/images/photo.jpg`) into an absolute URL for og:image / twitter:image.
 */
export function absoluteUrl(
  path: string,
  astro: { site: URL | undefined },
): string {
  const origin = (astro.site ?? new URL(SITE_FALLBACK)).origin;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${clean}`;
}
