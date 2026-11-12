import Link from "next/link";
import { HeroFinder } from "@/components/HeroFinder";
import { ServiceDirectory } from "@/components/ServiceDirectory";
import { ArrowIcon, WhatsAppIcon } from "@/components/icons";
import { localize, services, type Lang } from "@/content/services";
import { getDict, localePath } from "@/i18n/dict";
import { whatsappLink } from "@/lib/site";

export function HomeView({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const local = services.map((service) => localize(service, lang));

  return (
    <>
      <section className="bg-forest-900 text-white">
        <div className="shell py-12 md:py-16">
          <HeroFinder
            lang={lang}
            services={local}
            initialSlug="income-certificate"
            quickPicks={[
              "income-certificate",
              "ration-card",
              "marriage-certificate",
              "pan-card",
              "udyam-registration",
            ]}
          >
            <p className="text-sm font-bold text-leaf-300">
              {t.hero.eyebrow}
              <span aria-hidden="true"> · </span>
              {t.place}
            </p>
            <h1
              className={`mt-4 max-w-2xl font-extrabold ${
                lang === "ml"
                  ? "text-[1.8rem] sm:text-[2.15rem] lg:text-[2.4rem]"
                  : "text-[2.2rem] leading-[1.08] tracking-[-0.03em] sm:text-[2.7rem] lg:text-[3rem]"
              }`}
            >
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mint-100">{t.hero.lead}</p>
          </HeroFinder>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="shell py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="services-heading" className="text-3xl font-extrabold tracking-[-0.02em] text-forest-900 sm:text-4xl">
              {t.directory.title}
            </h2>
            <p className="mt-2 max-w-xl text-ink-soft">{t.directory.lead(services.length)}</p>
          </div>
          <Link
            href={localePath(lang, "/services")}
            className="inline-flex min-h-[2.75rem] items-center gap-1.5 font-bold text-leaf-700 underline-offset-4 hover:underline"
          >
            {t.directory.all} <ArrowIcon className="size-4" />
          </Link>
        </div>
        <ServiceDirectory lang={lang} />
      </section>

      <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-20 border-t border-rule bg-white">
        <div className="shell py-16 md:py-24">
          <h2 id="how-heading" className="text-3xl font-extrabold tracking-[-0.02em] text-forest-900 sm:text-4xl">
            {t.how.title}
          </h2>
          <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {t.how.steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-forest-900 pt-5">
                <p className="text-sm font-extrabold tabular-nums text-leaf-700">{t.how.step(index + 1)}</p>
                <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-forest-900">{step.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>

          <p className="mt-10 max-w-3xl border-l-4 border-turmeric pl-4 leading-relaxed text-ink-soft">
            <strong className="text-forest-900">{t.how.chargesTitle}. </strong>
            {t.how.charges}
          </p>

          <div className="mt-12 grid gap-6 rounded-2xl bg-mint-100 p-7 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-forest-900">{t.how.awayTitle}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">{t.how.away}</p>
            </div>
            <div className="md:justify-self-end">
              <a href={whatsappLink(t.enquiryMessage)} target="_blank" rel="noopener" className="btn btn-primary">
                <WhatsAppIcon className="size-5" />
                {t.enquire}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
