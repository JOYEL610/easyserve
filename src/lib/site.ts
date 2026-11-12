/** Single source of truth for business details shown across the site. */
export const site = {
  name: "EasyServe",
  legalName: "EasyServe Online Centre",
  tagline: "Online Centre",
  taglineMl: "ജനസേവന കേന്ദ്രം",
  description:
    "EasyServe Online Centre in Nallamkallu, Edakkazhiyur handles government certificates and online applications for you: ration card, income certificate, PAN, voter ID, marriage and birth certificates, Udyam, FSSAI and more. Send your documents on WhatsApp from anywhere.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  phoneDisplay: "95266 10610",
  phoneE164: "+919526610610",
  whatsappNumber: "919526610610",
  instagram: "https://www.instagram.com/easyserve610/",
  address: {
    line1: "EasyServe",
    line2: "Nallamkallu, Edakkazhiyur",
    line3: "Keralam 680515",
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

export const defaultEnquiry = "Hi EasyServe, I have an enquiry.";
