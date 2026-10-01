const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelHost = process.env.VERCEL_URL?.trim();

export const siteUrl = new URL(
  configuredSiteUrl ||
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
);