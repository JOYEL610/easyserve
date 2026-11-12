"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDict, hasMalayalam, localePath } from "@/i18n/dict";

/** Switches between the English page and its Malayalam twin. Hidden on English-only pages. */
export function LangSwitch() {
  const pathname = usePathname();
  const isMl = pathname === "/ml" || pathname.startsWith("/ml/");
  const bare = isMl ? pathname.slice(3) || "/" : pathname;
  if (!hasMalayalam(bare)) return null;

  const t = getDict(isMl ? "ml" : "en");
  const target = isMl ? bare : localePath("ml", bare);

  return (
    <Link
      href={target}
      hrefLang={isMl ? "en" : "ml"}
      lang={isMl ? "en" : "ml"}
      aria-label={t.switchLabel}
      className="inline-flex min-h-[2.75rem] items-center whitespace-nowrap rounded-lg border border-rule px-3 text-sm font-bold text-forest-900 hover:border-leaf-700 hover:bg-mint-100"
    >
      {t.switchTo}
    </Link>
  );
}
