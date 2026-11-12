import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChecklistSlip } from "@/components/ChecklistSlip";
import { JsonLd } from "@/components/JsonLd";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { categories, getService, services, servicesIn } from "@/content/services";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const docs = service.variants.flatMap((variant) => variant.documents.map((doc) => doc.en));
  const unique = [...new Set(docs)].slice(0, 6);
  const description = unique.length
    ? `${service.summary} Documents required: ${unique.join(", ")}. Apply through EasyServe, Edakkazhiyur, on WhatsApp.`
    : `${service.summary} Apply through EasyServe, Edakkazhiyur. Message us on WhatsApp for the document list.`;
  const title = service.listPending ? service.name : `${service.name}: documents required`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: `${title} | ${site.name}`, description, url: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const category = categories.find((c) => c.id === service.category)!;
  const related = servicesIn(service.category).filter((s) => s.slug !== service.slug);
  const stacked = service.variants.length > 1;
  const enquiry = `Hi EasyServe, I need help with: ${service.name}.`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.name,
        alternateName: service.nameMl,
        description: service.summary,
        serviceType: category.name,
        url: `${site.url}/services/${service.slug}`,
        provider: { "@id": `${site.url}/#business` },
        areaServed: { "@type": "AdministrativeArea", name: "Kerala" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: site.url },
          { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/services` },
          {
            "@type": "ListItem",
            position: 3,
            name: service.name,
            item: `${site.url}/services/${service.slug}`,
          },
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
                <Link href="/services" className="hover:text-white hover:underline">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={`/services#${category.id}`} className="hover:text-white hover:underline">
                  {category.name}
                </Link>
              </li>
            </ol>
          </nav>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            {service.name}
          </h1>
          <p lang="ml" className="mt-1 text-xl font-semibold text-leaf-300">
            {service.nameMl}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mint-100">{service.summary}</p>
        </div>
      </section>

      <div className="shell grid gap-12 py-12 md:py-16 lg:grid-cols-[1.35fr_1fr]">
        <div className="space-y-10">
          {stacked ? (
            service.variants.map((variant) => (
              <ChecklistSlip key={variant.id} service={service} onlyVariantId={variant.id} />
            ))
          ) : (
            <ChecklistSlip service={service} />
          )}
          {!service.listPending ? (
            <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
              This is the usual list. The department can ask for more depending on your case. We
              check your documents before filing and tell you if anything else is needed.
            </p>
          ) : null}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-rule bg-white p-6">
            <h2 className="text-lg font-extrabold tracking-tight text-forest-900">Start this application</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">
              Message us with what you need. We confirm the documents and the charges before
              anything is filed.
            </p>
            <div className="mt-5 flex flex-col gap-2.5">
              <a href={whatsappLink(enquiry)} target="_blank" rel="noopener" className="btn btn-primary">
                <WhatsAppIcon className="size-5" />
                Enquire now
              </a>
              <a href={`tel:${site.phoneE164}`} className="btn btn-ghost">
                <PhoneIcon className="size-5" />
                Call {site.phoneDisplay}
              </a>
            </div>
            <p className="mt-5 border-t border-rule pt-4 text-sm leading-relaxed text-ink-soft">
              Already a customer?{" "}
              <Link href="/login" className="font-bold text-leaf-700 underline underline-offset-2">
                Log in
              </Link>{" "}
              to raise this as a request and follow its status.
            </p>
          </div>

          {related.length > 0 ? (
            <nav aria-labelledby="related-heading">
              <h2 id="related-heading" className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf-700">
                More in {category.name.toLowerCase()}
              </h2>
              <ul className="mt-3 divide-y divide-rule border-y border-rule">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      className="group flex items-center justify-between gap-3 py-3 font-bold text-forest-900 hover:text-leaf-700"
                    >
                      {item.name}
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
