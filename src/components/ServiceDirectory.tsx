import Link from "next/link";
import { categories, documentCount, servicesIn, type Service } from "@/content/services";
import { ArrowIcon } from "./icons";

function rowMeta(service: Service): string {
  if (service.listPending) return "List on request";
  const count = documentCount(service);
  if (service.variants.length > 1) return `${service.variants.length} options`;
  return `${count} ${count === 1 ? "document" : "documents"}`;
}

/** The full service register, grouped the way the centre groups its own work. */
export function ServiceDirectory({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {categories.map((category) => (
        <section
          key={category.id}
          id={category.id}
          aria-labelledby={`cat-${category.id}`}
          className="grid gap-x-10 gap-y-4 py-9 lg:grid-cols-[17rem_1fr]"
        >
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Heading id={`cat-${category.id}`} className="text-2xl font-extrabold tracking-tight text-forest-900">
              {category.name}
            </Heading>
            <p lang="ml" className="text-base font-semibold text-leaf-700">
              {category.nameMl}
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-soft">{category.blurb}</p>
          </div>

          <ul className="divide-y divide-rule/70">
            {servicesIn(category.id).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 py-4 sm:grid-cols-[minmax(0,15rem)_1fr_auto]"
                >
                  <span>
                    <span className="block text-[1.05rem] font-extrabold leading-snug text-forest-900 group-hover:text-leaf-700">
                      {service.name}
                    </span>
                    <span lang="ml" className="block text-sm text-ink-soft">
                      {service.nameMl}
                    </span>
                  </span>
                  <span className="col-span-2 row-start-2 text-sm leading-relaxed text-ink-soft sm:col-span-1 sm:row-start-auto">
                    {service.summary}
                  </span>
                  <span className="col-start-2 row-start-1 flex items-center gap-2 whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.12em] text-leaf-700 sm:col-start-3">
                    {rowMeta(service)}
                    <ArrowIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
