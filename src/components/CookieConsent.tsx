"use client";

import Link from "next/link";
import Script from "next/script";
import { useSyncExternalStore } from "react";
import type { Lang } from "@/content/services";
import { getDict } from "@/i18n/dict";

/**
 * Cookie consent.
 *
 * - `es_consent` remembers the choice for six months.
 * - Essential cookies (login session, this choice) are always set.
 * - Analytics loads only after "Accept all", and only when
 *   NEXT_PUBLIC_GA_ID is configured.
 */

type Consent = "all" | "essential";
type State = Consent | "none" | "pending";

const COOKIE = "es_consent";
const SIX_MONTHS = 60 * 60 * 24 * 182;
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

let reopened = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readConsent(): Consent | "none" {
  const match = document.cookie.match(/(?:^|;\s*)es_consent=(all|essential)/);
  return match ? (match[1] as Consent) : "none";
}

function snapshot(): string {
  return `${readConsent()}|${reopened ? "open" : "closed"}`;
}

function serverSnapshot(): string {
  return "pending|closed";
}

function useConsent(): { consent: State; open: boolean } {
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [consent, flag] = value.split("|") as [State, string];
  return { consent, open: flag === "open" };
}

function clearAnalyticsCookies() {
  for (const part of document.cookie.split(";")) {
    const name = part.split("=")[0]?.trim();
    if (name && (name === "_ga" || name.startsWith("_ga_") || name === "_gid")) {
      document.cookie = `${name}=; Max-Age=0; Path=/`;
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${location.hostname}`;
    }
  }
}

function saveConsent(choice: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE}=${choice}; Max-Age=${SIX_MONTHS}; Path=/; SameSite=Lax${secure}`;
  if (choice === "essential") clearAnalyticsCookies();
  reopened = false;
  emit();
}

export function CookieSettingsButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => {
        reopened = true;
        emit();
      }}
      className="font-bold hover:text-white hover:underline"
    >
      {label}
    </button>
  );
}

export function CookieBanner({ lang }: { lang: Lang }) {
  const { consent, open } = useConsent();
  if (consent === "pending") return null;
  if (consent !== "none" && !open) return null;
  const t = getDict(lang).cookie;

  return (
    <section
      aria-label={t.label}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-rule bg-white p-5 shadow-[0_24px_60px_-24px_rgb(4_38_12/0.6)] sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <h2 className="text-base font-extrabold text-forest-900">{t.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft">
        {t.body}{" "}
        <Link href="/privacy#cookies" className="font-bold text-leaf-700 underline underline-offset-2">
          {t.details}
        </Link>
      </p>
      {consent !== "none" ? (
        <p className="mt-2 text-sm font-bold text-forest-900">
          {t.current} {consent === "all" ? t.all : t.essential}.
        </p>
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2.5">
        <button type="button" className="btn btn-primary" onClick={() => saveConsent("all")}>
          {t.accept}
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => saveConsent("essential")}>
          {t.reject}
        </button>
      </div>
    </section>
  );
}

/** Loads Google Analytics only after consent, and only when an ID is configured. */
export function Analytics() {
  const { consent } = useConsent();
  if (!GA_ID || consent !== "all") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}
