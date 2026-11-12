import Link from "next/link";
import type { Lang } from "@/content/services";
import { getDict, localePath } from "@/i18n/dict";
import { site, whatsappLink } from "@/lib/site";
import { Dropdown } from "./Dropdown";
import { LangSwitch } from "./LangSwitch";
import { Logo, Wordmark } from "./Logo";
import { MenuIcon, WhatsAppIcon } from "./icons";

function MenuLink({ href, title, hint }: { href: string; title: string; hint?: string }) {
  return (
    <Link href={href} className="block rounded-lg px-3 py-2.5 hover:bg-mint-100 focus-visible:bg-mint-100">
      <span className="block text-sm font-bold text-forest-900">{title}</span>
      {hint ? <span className="block text-xs text-ink-soft">{hint}</span> : null}
    </Link>
  );
}

export function Header({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const nav = [
    { href: localePath(lang, "/services"), label: t.nav.services },
    { href: `${localePath(lang, "/")}#how-it-works`, label: t.nav.how },
    { href: "#contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-white/95 backdrop-blur">
      <div className="shell flex h-[4.25rem] items-center justify-between gap-2 sm:gap-3">
        <Link href={localePath(lang, "/")} className="flex items-center gap-2.5" aria-label={`${site.legalName} home`}>
          <Logo className="size-11 sm:size-12" />
          <Wordmark tagline={t.tagline} />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-forest-900 underline-offset-8 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LangSwitch />

          <Dropdown
            label={
              <>
                <MenuIcon className="size-6 lg:hidden" />
                <span className="sr-only lg:hidden">{t.nav.menu}</span>
                <span className="hidden lg:inline">{t.nav.login}</span>
              </>
            }
            chevronClassName="hidden lg:block"
            buttonClassName="inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center gap-1 whitespace-nowrap rounded-lg px-2 text-sm font-bold text-forest-900 hover:bg-mint-100 lg:px-3"
          >
            <div className="lg:hidden">
              {nav.map((item) => (
                <MenuLink key={item.href} href={item.href} title={item.label} />
              ))}
              <hr className="my-2 border-rule" />
            </div>
            <MenuLink href="/login" title={t.menu.customer} hint={t.menu.customerHint} />
            <MenuLink href="/register" title={t.menu.register} hint={t.menu.registerHint} />
            <hr className="my-2 border-rule" />
            <MenuLink href="/admin/login" title={t.menu.admin} hint={t.menu.adminHint} />
          </Dropdown>

          <a
            href={whatsappLink(t.enquiryMessage)}
            target="_blank"
            rel="noopener"
            aria-label={t.enquire}
            className="btn btn-primary !min-h-[2.75rem] shrink-0 !px-3 sm:!px-4"
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">{t.enquire}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
