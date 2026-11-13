"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Lang } from "@/content/services";
import { getDict } from "@/i18n/dict";
import { Dropdown } from "./Dropdown";
import { MenuIcon } from "./icons";

type NavItem = { href: string; label: string };

/** Logo link. On the home page it scrolls back to the top instead of doing nothing. */
export function HomeLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex items-center gap-2.5"
      onClick={(event) => {
        if (pathname !== href) return;
        event.preventDefault();
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
      }}
    >
      {children}
    </Link>
  );
}

/** Desktop navigation. Marks the page you are on. */
export function NavLinks({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
      {items.map((item) => {
        const current = !item.href.includes("#") && (pathname === item.href || pathname.startsWith(`${item.href}/`));
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={current ? "page" : undefined}
            className={`text-sm font-semibold underline-offset-8 hover:underline ${
              current ? "text-leaf-700 underline" : "text-forest-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function MenuLink({ href, title }: { href: string; title: string }) {
  return (
    <Link href={href} className="block rounded-lg px-3 py-2.5 text-sm font-bold text-forest-900 hover:bg-mint-100 focus-visible:bg-mint-100">
      {title}
    </Link>
  );
}

/**
 * Phone-only menu button holding the main navigation. Hidden on desktop,
 * where the links sit inline in the header. Customer and staff login pages
 * still exist (/login, /register, /admin/login) but are not linked from the
 * site, so visitors are not sent to a sign-in screen they do not need.
 */
export function MobileMenu({ lang, nav }: { lang: Lang; nav: NavItem[] }) {
  const t = getDict(lang);
  return (
    <div className="lg:hidden">
      <Dropdown
        label={
          <>
            <MenuIcon className="size-6" />
            <span className="sr-only">{t.nav.menu}</span>
          </>
        }
        chevronClassName="hidden"
        buttonClassName="inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center rounded-lg px-2 text-forest-900 hover:bg-mint-100"
      >
        {nav.map((item) => (
          <MenuLink key={item.href} href={item.href} title={item.label} />
        ))}
      </Dropdown>
    </div>
  );
}
