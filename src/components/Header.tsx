import Image from "next/image";
import Link from "next/link";
import { defaultEnquiry, site, whatsappLink } from "@/lib/site";
import { Dropdown } from "./Dropdown";
import { WhatsAppIcon } from "./icons";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#contact", label: "Contact" },
];

function MenuLink({ href, title, hint }: { href: string; title: string; hint?: string }) {
  return (
    <Link
      href={href}
      className="block rounded-lg px-3 py-2.5 hover:bg-mint-100 focus-visible:bg-mint-100"
    >
      <span className="block text-sm font-bold text-forest-900">{title}</span>
      {hint ? <span className="block text-xs text-ink-soft">{hint}</span> : null}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-white/95 backdrop-blur">
      <div className="shell flex h-[4.25rem] items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.legalName} home`}>
          <Image
            src="/brand/easyserve-logo.jpg"
            alt=""
            width={46}
            height={46}
            priority
            className="size-[46px] rounded-full ring-1 ring-rule"
          />
          <span className="leading-none">
            <span className="block text-[1.15rem] font-extrabold italic tracking-tight text-forest-900">
              Easy<span className="text-leaf-600">Serve</span>
            </span>
            <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-soft">
              {site.tagline}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-bold text-forest-900 underline-offset-8 hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Dropdown
            label="Log in"
            buttonClassName="inline-flex min-h-[2.75rem] items-center gap-1 rounded-lg px-3 text-sm font-bold text-forest-900 hover:bg-mint-100"
          >
            <div className="md:hidden">
              {nav.map((item) => (
                <MenuLink key={item.href} href={item.href} title={item.label} />
              ))}
              <hr className="my-2 border-rule" />
            </div>
            <MenuLink href="/login" title="Customer login" hint="Track your applications" />
            <MenuLink href="/register" title="Create customer account" hint="New to EasyServe" />
            <hr className="my-2 border-rule" />
            <MenuLink href="/admin/login" title="Admin login" hint="EasyServe staff only" />
          </Dropdown>

          <a
            href={whatsappLink(defaultEnquiry)}
            target="_blank"
            rel="noopener"
            className="btn btn-primary !min-h-[2.75rem] !px-3.5 sm:!px-4"
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden sm:inline">Enquire now</span>
            <span className="sm:hidden">Enquire</span>
          </a>
        </div>
      </div>
    </header>
  );
}
