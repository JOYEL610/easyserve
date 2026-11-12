import type { Metadata } from "next";
import { Suspense } from "react";
import { services } from "@/content/services";
import { ServiceView, serviceMetadata } from "@/views/ServiceView";

type Props = PageProps<"/services/[slug]">;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata("en", slug);
}

/**
 * The page shell is shared by every service URL, so the slug is read inside
 * a Suspense boundary. Each known slug is still fully prerendered at build
 * time through generateStaticParams.
 */
export default function ServicePage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] bg-forest-900" aria-busy="true" />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({ params }: Pick<Props, "params">) {
  const { slug } = await params;
  return <ServiceView lang="en" slug={slug} />;
}
