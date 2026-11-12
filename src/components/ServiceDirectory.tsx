import Link from "next/link";
import {
  categories,
  documentCount,
  localCategory,
  localize,
  servicesIn,
  type Lang,
  type Service,
} from "@/content/services";
import { getDict, localePath, type Dict } from "@/i18n/dict";
import { ArrowIcon } from "./icons";

function rowMeta(service: Service, t: Dict["directory"]): string {
  if (service.listPending) return t.onRequest;
  if (service.variants.length > 1) return t.options(service.variants.length);
  return t.documents(documentCount(service));
}

/** The full service register, grouped the way the centre groups its own work. */
export function ServiceDirectory({ lang, headingLevel = "h3" }: { lang: Lang; headingLevel?: "h2" | "h3" }) {
  const t = getDict(lang).directory;
  const Heading = headingLevel;
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {categories.map(({ id }) => {
        const category = localCategory(id, lang);
        return (
          <section
            key={id}
            id={id}
            aria-labelledby={`cat-${id}`}
            className="grid scroll-mt-24 gap-x-10 gap-y-4 py-9 lg:grid-cols-[17rem_1fr]"
          >
            <div className="lg:sticky lg:top-24 lg:self-start">
              <Heading id={`cat-${id}`} className="text-2xl font-extrabold tracking-tight text-forest-900">
                {category.name}
              </Heading>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{category.blurb}</p>
            </div>

            <ul className="divide-y divide-rule/70">
              {servicesIn(id).map((service) => {
                const local = localize(service, lang);
                return (
                  <li key={service.slug}>
                    <Link
                      href={localePath(lang, `/services/${service.slug}`)}
                      className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4 sm:grid-cols-[minmax(0,15rem)_1fr_auto]"
                    >
                      <span className="block text-[1.05rem] font-extrabold leading-snug text-forest-900 group-hover:text-leaf-700">
                        {local.name}
                      </span>
                      <span className="col-span-2 row-start-2 text-sm leading-relaxed text-ink-soft sm:col-span-1 sm:row-start-auto">
                        {local.summary}
                      </span>
                      <span className="col-start-2 row-start-1 flex items-center gap-2 whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.12em] text-leaf-700 sm:col-start-3">
                        {rowMeta(service, t)}
                        <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
