const PRODUCTION_SITE_URL = "https://skydeckrrnagar.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

function getSiteUrl(value: string | undefined): URL {
  if (!value) return new URL(PRODUCTION_SITE_URL);

  try {
    const url = new URL(value);
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return new URL(PRODUCTION_SITE_URL);
    }

    return new URL(url.origin);
  } catch {
    return new URL(PRODUCTION_SITE_URL);
  }
}

export const siteUrl = getSiteUrl(configuredSiteUrl);