import { ServiceDirectory } from "@/components/ServiceDirectory";
import { WhatsAppIcon } from "@/components/icons";
import { services, type Lang } from "@/content/services";
import { getDict } from "@/i18n/dict";
import { whatsappLink } from "@/lib/site";

export function ServicesView({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const page = t.servicesPage;

  return (
    <>
      <section className="bg-forest-900 text-white">
        <div className="shell py-12 md:py-16">
          <p className="text-sm font-bold text-leaf-300">{page.count(services.length)}</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mint-100">{page.lead}</p>
        </div>
      </section>

      <section className="shell py-12 md:py-16">
        <ServiceDirectory lang={lang} headingLevel="h2" />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-mint-100 p-7 md:p-9">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-forest-900">{page.missingTitle}</h2>
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
