"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore, type ReactNode } from "react";
import { logout } from "@/app/actions/auth";
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

function MenuLink({ href, title, hint }: { href: string; title: string; hint?: string }) {
  return (
    <Link href={href} className="block rounded-lg px-3 py-2.5 hover:bg-mint-100 focus-visible:bg-mint-100">
      <span className="block text-sm font-bold text-forest-900">{title}</span>
      {hint ? <span className="block text-xs text-ink-soft">{hint}</span> : null}
    </Link>
  );
}

/* The login session itself is an httpOnly cookie the page cannot read.
   `es_role` is a plain hint set beside it so the menu can show the right links. */
function readRole(): string {
  const match = document.cookie.match(/(?:^|;\s*)es_role=(customer|admin)/);
  return match ? match[1] : "none";
}
const noSubscription = () => () => {};

/** Account menu: login links when signed out, dashboard and log out when signed in. */
export function AccountMenu({ lang, nav }: { lang: Lang; nav: NavItem[] }) {
  const t = getDict(lang);
  usePathname(); // re-render after every navigation so the role hint is read again
  const role = useSyncExternalStore(noSubscription, readRole, () => "none");
  const signedIn = role !== "none";

  return (
    <Dropdown
      label={
        <>
          <MenuIcon className="size-6 lg:hidden" />
          <span className="sr-only lg:hidden">{t.nav.menu}</span>
          <span className="hidden lg:inline">{signedIn ? t.account.label : t.nav.login}</span>
        </>
      }
      chevronClassName="hidden lg:block"
      buttonClassName="inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center gap-1 whitespace-nowrap rounded-lg px-2 text-sm font-semibold text-forest-900 hover:bg-mint-100 lg:px-3"
    >
      <div className="lg:hidden">
        {nav.map((item) => (
          <MenuLink key={item.href} href={item.href} title={item.label} />
        ))}
        <hr className="my-2 border-rule" />
      </div>

      {signedIn ? (
        <>
          {role === "admin" ? (
            <MenuLink href="/admin" title={t.account.dashboard} hint={t.account.dashboardHint} />
          ) : (
            <MenuLink href="/account" title={t.account.mine} hint={t.account.mineHint} />
          )}
          <hr className="my-2 border-rule" />
          <form action={logout}>
            <button
              type="submit"
              className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-bold text-forest-900 hover:bg-mint-100"
            >
              {t.account.logout}
            </button>
          </form>
        </>
      ) : (
        <>
          <MenuLink href="/login" title={t.menu.customer} hint={t.menu.customerHint} />
          <MenuLink href="/register" title={t.menu.register} hint={t.menu.registerHint} />
          <hr className="my-2 border-rule" />
          <MenuLink href="/admin/login" title={t.menu.admin} hint={t.menu.adminHint} />
        </>
      )}
    </Dropdown>
  );
}
