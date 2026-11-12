import type { Lang } from "@/content/services";
import { getDict, localePath } from "@/i18n/dict";
import { site, whatsappLink } from "@/lib/site";
import { AccountMenu, HomeLink, NavLinks } from "./HeaderParts";
import { LangSwitch } from "./LangSwitch";
import { Logo, Wordmark } from "./Logo";
import { WhatsAppIcon } from "./icons";

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
        <HomeLink href={localePath(lang, "/")} label={`${site.legalName} home`}>
          <Logo className="size-11 sm:size-12" />
          <Wordmark tagline={t.tagline} />
        </HomeLink>

        <NavLinks items={nav} />

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LangSwitch />
          <AccountMenu lang={lang} nav={nav} />
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
