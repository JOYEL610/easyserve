import Image from "next/image";
import Link from "next/link";
import { HeroFinder } from "@/components/HeroFinder";
import { ServiceBoxes } from "@/components/ServiceBoxes";
import { ArrowIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { localize, services, type Lang } from "@/content/services";
import { getDict, localePath } from "@/i18n/dict";
import { whatsappLink } from "@/lib/site";

const stepPhotos = [
  "/images/step-message.webp",
  "/images/step-send.webp",
  "/images/step-file.webp",
  "/images/step-result.webp",
];

export function HomeView({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const local = services.map((service) => localize(service, lang));

  return (
    <>
      <section id="top" className="bg-forest-900 text-white">
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
            <h1
              className={`max-w-2xl font-extrabold ${
                lang === "ml"
                  ? "text-[1.8rem] sm:text-[2.15rem] lg:text-[2.4rem]"
                  : "text-[2.1rem] leading-[1.15] sm:text-[2.6rem] lg:text-[2.9rem]"
              }`}
            >
              {t.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mint-100">{t.hero.lead}</p>
            <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-leaf-300">
              <PinIcon className="size-4 shrink-0" />
              {t.address[0]}, {t.address[1]}
            </p>
          </HeroFinder>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="shell py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="services-heading" className="text-3xl font-extrabold text-forest-900 sm:text-4xl">
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
        <ServiceBoxes lang={lang} />
      </section>

      <section id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-20 border-t border-rule bg-white">
        <div className="shell py-16 md:py-24">
          <h2 id="how-heading" className="text-3xl font-extrabold text-forest-900 sm:text-4xl">
            {t.how.title}
          </h2>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.how.steps.map((step, index) => (
              <li key={step.title} className="overflow-hidden rounded-2xl border border-rule bg-paper">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={stepPhotos[index]}
                    alt={t.images.steps[index]}
                    fill
                    sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute left-3 top-3 grid size-10 place-items-center rounded-full bg-turmeric text-lg font-extrabold tabular-nums text-forest-950 shadow-sm"
                  >
                    {index + 1}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-forest-900">
                    <span className="sr-only">{t.how.step(index + 1)}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2.5 leading-relaxed text-ink-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
            <div className="rounded-2xl border border-rule bg-paper p-6 md:p-7">
              <h3 className="text-xl font-extrabold text-forest-900">{t.how.chargesTitle}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-soft">{t.how.charges}</p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-mint-100 p-6 md:p-7">
              <div className="max-w-xl">
                <h3 className="text-xl font-extrabold text-forest-900">{t.how.awayTitle}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{t.how.away}</p>
              </div>
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
