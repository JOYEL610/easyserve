import type { Metadata, Viewport } from "next";
import { Anek_Malayalam, Manrope } from "next/font/google";
import { Analytics, CookieBanner } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/content/services";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} | Government certificates and online applications, Edakkazhiyur`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.legalName,
    locale: "en_IN",
    url: "/",
    title: `${site.legalName} | Government certificates and online applications`,
    description: site.description,
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
  description: site.description,
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
        url: `${site.url}/services/${service.slug}`,
      },
    })),
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${anekMalayalam.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Analytics />
        <JsonLd data={business} />
      </body>
    </html>
  );
}
