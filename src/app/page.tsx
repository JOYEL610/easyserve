import Link from "next/link";
import { HeroFinder } from "@/components/HeroFinder";
import { ServiceDirectory } from "@/components/ServiceDirectory";
import { ArrowIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/icons";
import { services } from "@/content/services";
import { defaultEnquiry, site, whatsappLink } from "@/lib/site";

const steps = [
  {
    title: "Message us",
    body: "Tell us on WhatsApp which service you need. We reply with the exact list of documents for your case.",
  },
  {
    title: "Send your documents",
    body: "Send clear photos or scans on WhatsApp, or bring the papers to the centre in Nallamkallu.",
  },
  {
    title: "We file the application",
    body: "We fill in and submit the application on the official portal. If an OTP comes to your phone, we ask for it at that moment.",
  },
  {
    title: "You get the result",
    body: "We send you the certificate or the application receipt once the department issues it.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-forest-900 text-white">
        <div className="shell py-14 md:py-20">
          <HeroFinder
            services={services}
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
              <span lang="ml">{site.taglineMl}</span>
              <span aria-hidden="true"> · </span>
              Nallamkallu, Edakkazhiyur
            </p>
            <h1 className="mt-4 max-w-2xl text-[2.35rem] font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl lg:text-[3.4rem]">
              Government certificates and applications, done from wherever you are.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mint-100">
              Send your documents on WhatsApp. We file the application and send the certificate back
              to you. Pick a service to see what to bring.
            </p>
            <p lang="ml" className="mt-3 max-w-xl text-base text-mint-200">
              സർക്കാർ സേവനങ്ങൾക്കായി ഇനി ഓഫീസുകൾ തേടി അലയേണ്ടതില്ല.
            </p>
          </HeroFinder>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="shell py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="services-heading" className="text-3xl font-extrabold tracking-[-0.02em] text-forest-900 sm:text-4xl">
              What we handle
            </h2>
            <p className="mt-2 max-w-xl text-ink-soft">
              {services.length} services. Open one to see the documents it needs.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex min-h-[2.75rem] items-center gap-1.5 font-bold text-leaf-700 underline-offset-4 hover:underline"
          >
            All services on one page <ArrowIcon className="size-4" />
          </Link>
        </div>
        <ServiceDirectory />
      </section>

      <section id="how-it-works" aria-labelledby="how-heading" className="border-y border-rule bg-white">
        <div className="shell py-16 md:py-24">
          <h2 id="how-heading" className="text-3xl font-extrabold tracking-[-0.02em] text-forest-900 sm:text-4xl">
            How it works
          </h2>
          <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-forest-900 pt-5">
                <p className="text-sm font-extrabold tabular-nums text-leaf-700">Step {index + 1}</p>
                <h3 className="mt-1.5 text-xl font-extrabold tracking-tight text-forest-900">{step.title}</h3>
                <p className="mt-2.5 leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-6 rounded-2xl bg-mint-100 p-7 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight text-forest-900">
                Working outside Kerala, or abroad?
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink-soft">
                Much of this can be done without you being here. Message us from wherever you are
                and we will tell you what is possible for your case and what your family needs to
                send.
              </p>
            </div>
            <div className="md:justify-self-end">
              <a href={whatsappLink(defaultEnquiry)} target="_blank" rel="noopener" className="btn btn-primary">
                <WhatsAppIcon className="size-5" />
                Enquire now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-heading" className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 id="contact-heading" className="text-3xl font-extrabold tracking-[-0.02em] text-forest-900 sm:text-4xl">
              Contact and visit
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-ink-soft">
              WhatsApp is the quickest way to reach us. You can also call, or walk in to the centre.
            </p>
            <p lang="ml" className="mt-2 max-w-md text-ink-soft">
              നിങ്ങളുടെ എല്ലാ ഓൺലൈൻ സേവനങ്ങളും EasyServe വഴി എളുപ്പത്തിൽ ചെയ്തു തരാം.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={whatsappLink(defaultEnquiry)} target="_blank" rel="noopener" className="btn btn-primary">
                <WhatsAppIcon className="size-5" />
                WhatsApp {site.phoneDisplay}
              </a>
              <a href={`tel:${site.phoneE164}`} className="btn btn-ghost">
                <PhoneIcon className="size-5" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>

          <dl className="divide-y divide-rule border-y border-rule">
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-leaf-700">Address</dt>
              <dd>
                <address className="not-italic font-semibold leading-relaxed text-ink">
                  {site.address.line1}, {site.address.line2}, {site.address.line3}
                </address>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-bold text-leaf-700 underline-offset-4 hover:underline"
                >
                  <PinIcon className="size-4" /> Directions on Google Maps
                </a>
              </dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-leaf-700">Charges</dt>
              <dd className="leading-relaxed text-ink-soft">
                Government fees are set by the department. Our service charge depends on the work.
                Ask us for both before we start.
              </dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-leaf-700">Who we are</dt>
              <dd className="leading-relaxed text-ink-soft">
                A privately run service centre. Certificates and approvals are issued by the
                government department concerned, not by us.
              </dd>
            </div>
            <div className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr]">
              <dt className="text-xs font-extrabold uppercase tracking-[0.14em] text-leaf-700">Instagram</dt>
              <dd>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener"
                  className="font-bold text-leaf-700 underline-offset-4 hover:underline"
                >
                  @easyserve610
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </>
  );
}
