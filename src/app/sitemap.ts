import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { localePath } from "@/i18n/dict";
import { site } from "@/lib/site";

type Entry = MetadataRoute.Sitemap[number];

/** One page in both languages, each entry pointing at its twin. */
function both(path: string, changeFrequency: Entry["changeFrequency"], priority: number): Entry[] {
  const languages = {
    "en-IN": `${site.url}${localePath("en", path)}`,
    "ml-IN": `${site.url}${localePath("ml", path)}`,
  };
  return (["en", "ml"] as const).map((lang) => ({
    url: `${site.url}${localePath(lang, path)}`,
    changeFrequency,
    priority: lang === "en" ? priority : priority - 0.1,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...both("/", "weekly", 1),
    ...both("/services", "weekly", 0.9),
    ...services.flatMap((service) => both(`/services/${service.slug}`, "monthly", 0.8)),
    { url: `${site.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
