import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChecklistSlip } from "@/components/ChecklistSlip";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { getService, localCategory, localize, servicesIn, type Lang } from "@/content/services";
import { getDict, localePath } from "@/i18n/dict";
import { alternates } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

export function serviceMetadata(lang: Lang, slug: string): Metadata {
  const service = getService(slug);
  if (!service) return {};
  const t = getDict(lang).servicePage;
  const local = localize(service, lang);

  const docs = [...new Set(local.variants.flatMap((v) => v.documents.map((doc) => doc.text)))].slice(0, 4);
  const description = docs.length
    ? t.metaWithDocs(local.summary, docs.join(", "))
    : t.metaNoDocs(local.summary);
  const title = service.listPending ? local.name : t.metaTitle(local.name);
  const path = `/services/${service.slug}`;

  return {
    title,
    description,
    alternates: alternates(lang, path),
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: localePath(lang, path),
      locale: lang === "ml" ? "ml_IN" : "en_IN",
    },
  };
}

export function ServiceView({ lang, slug }: { lang: Lang; slug: string }) {
  const service = getService(slug);
  if (!service) notFound();

  const t = getDict(lang);
  const page = t.servicePage;
  const local = localize(service, lang);
  const category = localCategory(service.category, lang);
  const related = servicesIn(service.category).filter((s) => s.slug !== service.slug);
  const stacked = local.variants.length > 1;
  const url = `${site.url}${localePath(lang, `/services/${service.slug}`)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: local.name,
        alternateName: lang === "ml" ? service.name : service.nameMl,
        description: local.summary,
        serviceType: category.name,
        url,
        inLanguage: lang === "ml" ? "ml" : "en-IN",
        provider: { "@id": `${site.url}/#business` },
        areaServed: { "@type": "AdministrativeArea", name: "Kerala" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}${localePath(lang, "/")}` },
          {
            "@type": "ListItem",
            position: 2,
            name: t.nav.services,
            item: `${site.url}${localePath(lang, "/services")}`,
          },
          { "@type": "ListItem", position: 3, name: local.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-forest-900 text-white">
        <div className="shell py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="text-sm font-bold text-leaf-300">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <li>
                <Link href={localePath(lang, "/services")} className="hover:text-white hover:underline">
                  {t.nav.services}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`${localePath(lang, "/services")}#${category.id}`}
                  className="hover:text-white hover:underline"
                >
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.15] sm:text-5xl">
            {local.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mint-100">{local.summary}</p>
        </div>
      </section>

      <div className="shell grid gap-12 py-12 md:py-16 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-10">
          {stacked ? (
            local.variants.map((variant) => (
              <ChecklistSlip key={variant.id} lang={lang} service={local} onlyVariantId={variant.id} />
            ))
          ) : (
            <ChecklistSlip lang={lang} service={local} />
          )}
          {!service.listPending ? (
            <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">{page.usual}</p>
          ) : null}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-rule bg-white p-6">
            <h2 className="text-lg font-extrabold text-forest-900">{page.startTitle}</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{page.start}</p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={whatsappLink(page.enquiry(local.name))}
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                <WhatsAppIcon className="size-5" />
                {t.enquire}
              </a>
              <a href={`tel:${site.phoneE164}`} className="btn btn-ghost">
                <PhoneIcon className="size-5" />
                {t.call} {site.phoneDisplay}
              </a>
            </div>
            <p className="mt-5 border-t border-rule pt-4 text-sm leading-relaxed text-ink-soft">
              {page.account[0]}{" "}
              <Link href="/login" className="font-bold text-leaf-700 underline underline-offset-2">
                {page.account[1]}
              </Link>{" "}
              {page.account[2]}
            </p>
          </div>

          {related.length > 0 ? (
            <nav aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf-700">
                {page.more}
              </h2>
              <ul className="mt-3 divide-y divide-rule border-y border-rule">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={localePath(lang, `/services/${item.slug}`)}
                      className="group flex items-center justify-between gap-3 py-3 font-bold text-forest-900 hover:text-leaf-700"
                    >
                      {localize(item, lang).name}
                      <ArrowIcon className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </aside>
      </div>
    </>
  );
}
