import { JsonLd } from "@/components/JsonLd";
import { ServiceBoxes } from "@/components/ServiceBoxes";
import { WhatsAppIcon } from "@/components/icons";
import { localize, services, type Lang } from "@/content/services";
import { getDict, localePath } from "@/i18n/dict";
import { site, whatsappLink } from "@/lib/site";

export function ServicesView({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const page = t.servicesPage;

  const list = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: page.title,
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: localize(service, lang).name,
      url: `${site.url}${localePath(lang, `/services/${service.slug}`)}`,
    })),
  };

  return (
    <>
      <JsonLd data={list} />
      <section className="bg-forest-900 text-white">
        <div className="shell py-12 md:py-16">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.15] sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mint-100">{page.lead}</p>
        </div>
      </section>

      <section className="shell py-12 md:py-16">
        <ServiceBoxes lang={lang} detailed headingLevel="h2" />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-mint-100 p-7 md:p-9">
          <div>
            <h2 className="text-xl font-extrabold text-forest-900">{page.missingTitle}</h2>
            <p className="mt-1.5 max-w-xl text-ink-soft">{page.missing}</p>
          </div>
          <a href={whatsappLink(t.enquiryMessage)} target="_blank" rel="noopener" className="btn btn-primary">
            <WhatsAppIcon className="size-5" />
            {t.enquire}
          </a>
        </div>
      </section>
    </>
  );
}
