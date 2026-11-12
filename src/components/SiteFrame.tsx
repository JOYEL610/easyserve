import type { ReactNode } from "react";
import type { Lang } from "@/content/services";
import { getDict } from "@/i18n/dict";
import { BackToTop } from "./BackToTop";
import { Analytics, CookieBanner } from "./CookieConsent";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Header, footer and cookie banner in one language, around a page. */
export function SiteFrame({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = getDict(lang);
  return (
    <div lang={lang === "ml" ? "ml" : undefined} className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold"
      >
        {t.skip}
      </a>
      <Header lang={lang} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer lang={lang} />
      <BackToTop label={t.backToTop} />
      <CookieBanner lang={lang} />
      <Analytics />
    </div>
  );
}
