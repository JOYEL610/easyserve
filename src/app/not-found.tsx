import Link from "next/link";
import { SiteFrame } from "@/components/SiteFrame";

export default function NotFound() {
  return (
    <SiteFrame lang="en">
      <div className="shell py-20 md:py-28">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf-700">Page not found</p>
        <h1 className="mt-3 max-w-xl text-4xl font-extrabold tracking-[-0.03em] text-forest-900">
          This page does not exist.
        </h1>
        <p className="mt-4 max-w-lg leading-relaxed text-ink-soft">
          The link may be old, or the address may have a typo. The full list of services is one
          click away.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/services" className="btn btn-primary">
            See all services
          </Link>
          <Link href="/" className="btn btn-ghost">
            Go to the home page
          </Link>
        </div>
      </div>
    </SiteFrame>
  );
}
