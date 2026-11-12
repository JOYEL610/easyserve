import type { Metadata } from "next";
import { ServiceDirectory } from "@/components/ServiceDirectory";
import { WhatsAppIcon } from "@/components/icons";
import { services } from "@/content/services";
import { defaultEnquiry, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "All services and documents required",
  description:
    "Every service EasyServe handles in Edakkazhiyur, with the documents each one needs: Aadhaar, ration card, PAN, voter ID, income, caste, nativity, birth, death and marriage certificates, Udyam, FSSAI and more.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-forest-900 text-white">
        <div className="shell py-12 md:py-16">
          <p className="text-sm font-bold text-leaf-300">{services.length} services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            Services and the documents each one needs
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mint-100">
            Open a service to see its checklist. Tick what you already have and send us the list on
            WhatsApp.
          </p>
        </div>
      </section>

      <section className="shell py-12 md:py-16">
        <ServiceDirectory headingLevel="h2" />

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 rounded-2xl bg-mint-100 p-7 md:p-9">
          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-forest-900">Not on the list?</h2>
            <p className="mt-1.5 max-w-xl text-ink-soft">
              We take on other online applications too. Tell us what you need and we will say if we
              can do it.
            </p>
          </div>
          <a href={whatsappLink(defaultEnquiry)} target="_blank" rel="noopener" className="btn btn-primary">
            <WhatsAppIcon className="size-5" />
            Enquire now
          </a>
        </div>
      </section>
    </>
  );
}
