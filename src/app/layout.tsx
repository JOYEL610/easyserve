import type { Metadata, Viewport } from "next";
import { Anek_Malayalam, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { getDict } from "@/i18n/dict";
import { site } from "@/lib/site";
import "./globals.css";

/* Headings: Plus Jakarta Sans. Body: Inter. Malayalam falls through to Anek Malayalam. */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/* Not preloaded: English pages never need it, Malayalam pages fetch it on demand. */
const anekMalayalam = Anek_Malayalam({
  variable: "--font-anek-ml",
  subsets: ["malayalam"],
  display: "swap",
  preload: false,
});

const home = getDict("en").home;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: home.metaTitle,
    template: `%s | ${site.name}`,
  },
  description: home.metaDescription,
  applicationName: site.name,
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_IN",
    title: home.metaTitle,
    description: home.metaDescription,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#06350f",
};

const business = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#business`,
  name: site.legalName,
  alternateName: [site.name, "EasyServe ജനസേവന കേന്ദ്രം"],
  description: home.metaDescription,
  url: site.url,
  image: `${site.url}/brand/easyserve-logo.png`,
  logo: `${site.url}/brand/easyserve-logo.png`,
  telephone: site.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: ["Edakkazhiyur", "Chavakkad", "Guruvayur", "Thrissur", "Kerala"].map((name) => ({
    "@type": "Place",
    name,
  })),
  knowsLanguage: ["en", "ml"],
  sameAs: [site.instagram],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: site.phoneE164,
    contactType: "customer service",
    availableLanguage: ["Malayalam", "English"],
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.name,
        alternateName: service.nameMl,
        url: `${site.url}/services/${service.slug}`,
      },
    })),
  },
};

/**
 * Shared shell. The header, footer and cookie banner live in the language
 * layouts: app/(en)/layout.tsx for English and app/ml/layout.tsx for Malayalam.
 */
const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.legalName,
  url: site.url,
  inLanguage: ["en-IN", "ml"],
  publisher: { "@id": `${site.url}/#business` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${inter.variable} ${anekMalayalam.variable}`}>
      <body>
        {children}
        <JsonLd data={business} />
        <JsonLd data={website} />
      </body>
    </html>
  );
}
