import type { Metadata } from "next";
import type { Lang } from "@/content/services";
import { localePath } from "@/i18n/dict";

/** Canonical URL plus hreflang links for a page that exists in both languages. */
export function alternates(lang: Lang, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: localePath(lang, path),
    languages: {
      "en-IN": localePath("en", path),
      "ml-IN": localePath("ml", path),
      "x-default": localePath("en", path),
    },
  };
}
