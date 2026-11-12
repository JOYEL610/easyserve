import type { Metadata } from "next";
import { getDict } from "@/i18n/dict";
import { alternates } from "@/lib/seo";
import { ServicesView } from "@/views/ServicesView";

const page = getDict("en").servicesPage;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: alternates("en", "/services"),
};

export default function ServicesPage() {
  return <ServicesView lang="en" />;
}
