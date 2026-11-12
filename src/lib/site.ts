/**
 * The site's public address. Uses NEXT_PUBLIC_SITE_URL when set, otherwise the
 * address Vercel gives the project, otherwise localhost for development.
 */
function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

/** Single source of truth for business details shown across the site. */
export const site = {
  name: "EasyServe",
  legalName: "EasyServe Online Centre",
  tagline: "Online Centre",
  taglineMl: "ജനസേവന കേന്ദ്രം",
  description:
    "EasyServe Online Centre in Nallamkallu, Edakkazhiyur handles government certificates and online applications for you: ration card, income certificate, PAN, voter ID, marriage and birth certificates, Udyam, FSSAI and more. Send your documents on WhatsApp from anywhere.",
  url: siteUrl(),
  phoneDisplay: "95266 10610",
  phoneE164: "+919526610610",
  whatsappNumber: "919526610610",
  instagram: "https://www.instagram.com/easyserve610/",
  address: {
    line1: "EasyServe Online Centre",
    line2: "Nallamkallu, Edakkazhiyur",
    line3: "Thrissur, Kerala 680515",
    locality: "Edakkazhiyur",
    street: "Nallamkallu",
    region: "Kerala",
    postalCode: "680515",
    country: "IN",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=EasyServe+Nallamkallu+Edakkazhiyur+Kerala+680515",
} as const;

/** Builds a wa.me link with a prefilled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

