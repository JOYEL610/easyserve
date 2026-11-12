"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { Service } from "@/content/services";
import { ChecklistSlip } from "./ChecklistSlip";
import { SearchIcon } from "./icons";

function matches(service: Service, query: string): boolean {
  const haystack = [service.name, service.nameMl, ...service.keywords, ...service.variants.map((v) => v.name)]
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

/**
 * Hero: type what you need on the left, the checklist slip on the right
 * switches to that service.
 */
export function HeroFinder({
  services,
  quickPicks,
  initialSlug,
  children,
}: {
  services: Service[];
  quickPicks: string[];
  initialSlug: string;
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [slug, setSlug] = useState(initialSlug);

  const selected = services.find((s) => s.slug === slug) ?? services[0];
  const trimmed = query.trim();
  const results = useMemo(
    () => (trimmed ? services.filter((s) => matches(s, trimmed)).slice(0, 6) : []),
    [services, trimmed],
  );
  const picks = quickPicks
    .map((pick) => services.find((s) => s.slug === pick))
    .filter((s): s is Service => Boolean(s));
  const options = trimmed ? results : picks;

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
      <div>
        {children}

        <div className="mt-9 max-w-xl">
          <label htmlFor="service-search" className="block text-sm font-bold text-mint-100">
            Which service do you need?
          </label>
          <div className="relative mt-2">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-soft" />
            <input
              id="service-search"
              type="search"
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try ration card, income, marriage…"
              className="h-14 w-full rounded-xl border-2 border-transparent bg-white pl-12 pr-4 text-base font-semibold text-ink placeholder:font-medium placeholder:text-ink-soft/80 focus:border-turmeric focus:outline-none"
            />
          </div>

          <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-leaf-300" aria-live="polite">
            {trimmed
              ? results.length > 0
                ? `${results.length} matching ${results.length === 1 ? "service" : "services"}`
                : "No service by that name"
              : "Often asked for"}
          </p>

          {options.length > 0 ? (
            <ul className="mt-2.5 flex flex-wrap gap-2">
              {options.map((service) => {
                const active = service.slug === selected.slug;
                return (
                  <li key={service.slug}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSlug(service.slug)}
                      className={`min-h-[2.6rem] rounded-full border px-4 text-sm font-bold transition-colors ${
                        active
                          ? "border-turmeric bg-turmeric text-forest-950"
                          : "border-white/25 text-white hover:border-white/70"
                      }`}
                    >
                      {service.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-2.5 text-sm leading-relaxed text-mint-100">
              We may still handle it. Use the Enquire now button and tell us what you need.
            </p>
          )}
        </div>
      </div>

      <div className="lg:pt-3">
        <div className="mx-auto max-w-md lg:max-w-none lg:-rotate-[1.2deg]">
          <ChecklistSlip key={selected.slug} service={selected} showPageLink />
        </div>
      </div>
    </div>
  );
}
