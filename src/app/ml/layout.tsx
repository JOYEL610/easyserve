import type { Metadata } from "next";
import { SiteFrame } from "@/components/SiteFrame";
import { getDict } from "@/i18n/dict";

const home = getDict("ml").home;

export const metadata: Metadata = {
  title: { default: home.metaTitle, template: "%s | EasyServe" },
  description: home.metaDescription,
  openGraph: { locale: "ml_IN", title: home.metaTitle, description: home.metaDescription },
};

export default function MalayalamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteFrame lang="ml">{children}</SiteFrame>;
}
