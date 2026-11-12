import type { Metadata } from "next";
import { getDict } from "@/i18n/dict";
import { alternates } from "@/lib/seo";
import { HomeView } from "@/views/HomeView";

export const metadata: Metadata = {
  title: { absolute: getDict("ml").home.metaTitle },
  alternates: alternates("ml", "/"),
  openGraph: { url: "/ml", locale: "ml_IN" },
};

export default function MalayalamHomePage() {
  return <HomeView lang="ml" />;
}
