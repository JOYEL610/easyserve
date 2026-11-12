import { SiteFrame } from "@/components/SiteFrame";

export default function EnglishLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteFrame lang="en">{children}</SiteFrame>;
}
