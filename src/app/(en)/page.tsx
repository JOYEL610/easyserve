import type { Metadata } from "next";
import { alternates } from "@/lib/seo";
import { HomeView } from "@/views/HomeView";

export const metadata: Metadata = {
  alternates: alternates("en", "/"),
  openGraph: { url: "/" },
};

export default function HomePage() {
  return <HomeView lang="en" />;
}
