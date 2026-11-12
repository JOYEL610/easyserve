import type { Metadata, Viewport } from "next";
import { Anek_Malayalam, Manrope } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
import { getDict } from "@/i18n/dict";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const anekMalayalam = Anek_Malayalam({
  variable: "--font-anek-ml",
  subsets: ["malayalam"],
  display: "swap",
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
  image: `${site.url}/brand/easyserve-logo.jpg`,
  logo: `${site.url}/brand/easyserve-logo.jpg`,
  telephone: site.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  areaServed: { "@type": "AdministrativeArea", name: "Kerala" },
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
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${anekMalayalam.variable}`}>
      <body>
        {children}
        <JsonLd data={business} />
      </body>
    </html>
  );
}
