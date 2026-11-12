import Image from "next/image";
import Link from "next/link";
import { categories, servicesIn } from "@/content/services";
import { defaultEnquiry, site, whatsappLink } from "@/lib/site";
import { CookieSettingsButton } from "./CookieConsent";

export function Footer() {
  return (
    <footer className="bg-forest-950 text-mint-100">
      <div className="shell grid gap-12 py-14 md:grid-cols-[1.25fr_2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/brand/easyserve-logo.jpg"
              alt=""
              width={52}
              height={52}
              className="size-[52px] rounded-full"
            />
            <div className="leading-none">
              <p className="text-xl font-extrabold italic tracking-tight text-white">
                Easy<span className="text-leaf-300">Serve</span>
              </p>
              <p className="mt-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-mint-200">
                {site.tagline}
              </p>
            </div>
          </div>

          <address className="mt-6 not-italic leading-relaxed text-mint-100">
            {site.address.line1}
            <br />
            {site.address.line2}
            <br />
            {site.address.line3}
          </address>

          <ul className="mt-5 space-y-2 text-sm font-bold">
            <li>
              <a href={`tel:${site.phoneE164}`} className="hover:text-white hover:underline">
                Call {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink(defaultEnquiry)}
                target="_blank"
                rel="noopener"
                className="hover:text-white hover:underline"
              >
                WhatsApp {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={site.instagram} target="_blank" rel="noopener" className="hover:text-white hover:underline">
                Instagram @easyserve610
              </a>
            </li>
            <li>
              <a href={site.mapsUrl} target="_blank" rel="noopener" className="hover:text-white hover:underline">
                Directions on Google Maps
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Services" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.id}>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf-300">
                {category.name}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {servicesIn(category.id).map((service) => (
                  <li key={service.slug}>
                    <Link href={`/services/${service.slug}`} className="text-mint-100 hover:text-white hover:underline">
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="shell space-y-4 py-6 text-sm text-mint-200">
          <p className="max-w-3xl leading-relaxed">
            EasyServe is a privately run service centre. We are not a government office and are not
            affiliated with any government department. Certificates and approvals are issued by the
            department concerned.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-bold">
            <Link href="/terms" className="hover:text-white hover:underline">
              Terms and conditions
            </Link>
            <Link href="/privacy" className="hover:text-white hover:underline">
              Privacy policy
            </Link>
            <CookieSettingsButton />
            <span className="font-normal sm:ml-auto">© 2026 {site.legalName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
