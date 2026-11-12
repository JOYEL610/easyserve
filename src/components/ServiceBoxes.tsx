import Image from "next/image";
import Link from "next/link";
import {
  categories,
  documentCount,
  localCategory,
  localize,
  servicesIn,
  type CategoryId,
  type Lang,
  type Service,
} from "@/content/services";
import { getDict, localePath, type Dict } from "@/i18n/dict";
import { ArrowIcon } from "./icons";

const photos: Record<CategoryId, string> = {
  ids: "/images/cat-ids.webp",
  certificates: "/images/cat-certificates.webp",
  applications: "/images/cat-applications.webp",
  desk: "/images/cat-desk.webp",
};

function rowMeta(service: Service, t: Dict["directory"]): string {
  if (service.listPending) return t.onRequest;
  if (service.variants.length > 1) return t.options(service.variants.length);
  return t.documents(documentCount(service));
}

/**
 * One box per group of services: a photo, the group name, and a table of
 * its services. `detailed` adds the "what it is" column and gives each box
 * the full width (used on the services page).
 */
export function ServiceBoxes({
  lang,
  detailed = false,
  headingLevel = "h3",
}: {
  lang: Lang;
  detailed?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const t = getDict(lang);
  const Heading = headingLevel;

  return (
    <div className={detailed ? "space-y-8" : "grid gap-6 lg:grid-cols-2"}>
      {categories.map(({ id }, index) => {
        const category = localCategory(id, lang);
        return (
          <section
            key={id}
            id={id}
            aria-labelledby={`cat-${id}`}
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-rule bg-white"
          >
            <div className={`relative ${detailed ? "aspect-[16/7] md:aspect-[16/4]" : "aspect-[16/7]"}`}>
              <Image
                src={photos[id]}
                alt={t.images[id]}
                fill
                sizes={detailed ? "(min-width: 1280px) 1150px, 100vw" : "(min-width: 1024px) 560px, 100vw"}
                loading={detailed && index === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
            </div>

            <div className="px-5 pb-4 pt-5 sm:px-6">
              <Heading id={`cat-${id}`} className="text-2xl font-extrabold text-forest-900">
                {category.name}
              </Heading>
              <p className="mt-1.5 leading-relaxed text-ink-soft">{category.blurb}</p>
            </div>

            <table className="w-full border-t border-rule text-left">
              <thead className="bg-mint-100 text-xs font-bold uppercase tracking-[0.08em] text-forest-900">
                <tr>
                  <th scope="col" className="px-5 py-2.5 sm:px-6">
                    {t.table.service}
                  </th>
                  {detailed ? (
                    <th scope="col" className="hidden px-4 py-2.5 md:table-cell">
                      {t.table.about}
                    </th>
                  ) : null}
                  <th scope="col" className="px-5 py-2.5 text-right sm:px-6">
                    {t.table.documents}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {servicesIn(id).map((service) => {
                  const local = localize(service, lang);
                  const href = localePath(lang, `/services/${service.slug}`);
                  return (
                    <tr key={service.slug} className="group transition-colors hover:bg-paper">
                      <th scope="row" className="px-5 py-3.5 font-bold sm:px-6">
                        <Link
                          href={href}
                          className="text-forest-900 underline-offset-4 group-hover:text-leaf-700 group-hover:underline"
                        >
                          {local.name}
                        </Link>
                        {detailed ? (
                          <span className="mt-1 block text-sm font-normal leading-relaxed text-ink-soft md:hidden">
                            {local.summary}
                          </span>
                        ) : null}
                      </th>
                      {detailed ? (
                        <td className="hidden px-4 py-3.5 text-sm leading-relaxed text-ink-soft md:table-cell">
                          {local.summary}
                        </td>
                      ) : null}
                      <td className="whitespace-nowrap px-5 py-3.5 text-right align-top text-sm font-bold text-leaf-700 sm:px-6">
                        <Link href={href} tabIndex={-1} aria-hidden="true" className="inline-flex items-center gap-1.5">
                          {rowMeta(service, t.directory)}
                          <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}
