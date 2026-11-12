import Link from "next/link";
import { categories, localCategory, localize, servicesIn, type Lang } from "@/content/services";
import { getDict, localePath } from "@/i18n/dict";
import { site, whatsappLink } from "@/lib/site";
import { CookieSettingsButton } from "./CookieConsent";
import { FullLogo } from "./Logo";
import { InstagramIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

function IconLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="grid size-11 place-items-center rounded-full border border-white/20 text-mint-100 transition-colors hover:border-turmeric hover:bg-turmeric hover:text-forest-950"
    >
      {children}
    </a>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const t = getDict(lang);

  return (
    <footer id="contact" className="scroll-mt-20 bg-forest-950 text-mint-100">
      <div className="shell grid gap-12 py-14 lg:grid-cols-[1.15fr_2fr]">
        <div>
          <FullLogo className="size-32" />

          <h2 className="mt-8 text-xs font-extrabold uppercase tracking-[0.16em] text-leaf-300">
            {t.footer.contact}
          </h2>
          <address className="mt-3 not-italic leading-relaxed text-mint-100">
            <span lang="en" className="font-bold text-white">
              {site.legalName}
            </span>
            <br />
            {t.address[0]}
            <br />
            {t.address[1]}
          </address>
          <p className="mt-3">
            <a
              href={`tel:${site.phoneE164}`}
              className="text-lg font-extrabold tabular-nums text-white hover:underline"
            >
              {site.phoneDisplay}
            </a>
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <IconLink href={whatsappLink(t.enquiryMessage)} label={t.footer.whatsapp}>
              <WhatsAppIcon className="size-5" />
            </IconLink>
            <IconLink href={site.instagram} label={t.footer.instagram}>
              <InstagramIcon className="size-5" />
            </IconLink>
            <IconLink href={`tel:${site.phoneE164}`} label={t.footer.phone}>
              <PhoneIcon className="size-5" />
            </IconLink>
            <IconLink href={site.mapsUrl} label={t.footer.maps}>
              <PinIcon className="size-5" />
            </IconLink>
          </div>
        </div>

        <nav aria-label={t.nav.services} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.id}>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf-300">
                {localCategory(category.id, lang).name}
              </h2>
              <ul className="mt-3 space-y-2 text-sm">
                {servicesIn(category.id).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={localePath(lang, `/services/${service.slug}`)}
                      className="text-mint-100 hover:text-white hover:underline"
                    >
                      {localize(service, lang).name}
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
          <p className="max-w-3xl leading-relaxed">{t.footer.disclaimer}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-bold">
            <Link href="/terms" className="hover:text-white hover:underline">
              {t.footer.terms}
            </Link>
            <Link href="/privacy" className="hover:text-white hover:underline">
              {t.footer.privacy}
            </Link>
            <CookieSettingsButton label={t.footer.cookies} />
            <span lang="en" className="font-normal sm:ml-auto">
              © 2026 {site.legalName}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
