"use client";

import Link from "next/link";
import { useState } from "react";
import type { Lang, LocalService } from "@/content/services";
import { getDict, localePath } from "@/i18n/dict";
import { whatsappLink } from "@/lib/site";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "./icons";

/**
 * The checklist slip: tick what you already have, then send the list on
 * WhatsApp so the centre knows what is ready and what is missing.
 */
export function ChecklistSlip({
  lang,
  service,
  showPageLink = false,
  headingLevel = "h2",
  onlyVariantId,
}: {
  lang: Lang;
  service: LocalService;
  showPageLink?: boolean;
  headingLevel?: "h2" | "h3";
  /** Show a single option with no tabs (used when every option gets its own slip). */
  onlyVariantId?: string;
}) {
  const t = getDict(lang).slip;
  const [variantId, setVariantId] = useState(onlyVariantId ?? service.variants[0].id);
  const [ticked, setTicked] = useState<Record<string, boolean>>({});

  const variant = service.variants.find((v) => v.id === variantId) ?? service.variants[0];
  const hasVariants = service.variants.length > 1;
  const showTabs = hasVariants && !onlyVariantId;
  const slipName = onlyVariantId ? variant.name : service.name;
  const key = (index: number) => `${variant.id}:${index}`;
  const ready = variant.documents.filter((_, i) => ticked[key(i)]);
  const missing = variant.documents.filter((_, i) => !ticked[key(i)]);
  const Heading = headingLevel;

  const title =
    hasVariants && variant.name !== service.name ? `${service.name} (${variant.name})` : service.name;

  const list = (docs: typeof variant.documents) => docs.map((doc) => `- ${doc.text}`).join("\n");
  let message = t.msgIntro(title);
  if (variant.documents.length > 0) {
    if (ready.length > 0) message += `\n\n${t.msgHave}\n${list(ready)}`;
    if (missing.length > 0) {
      message += `\n\n${ready.length > 0 ? t.msgMissing : t.msgList}\n${list(missing)}`;
    }
  } else {
    message += ` ${t.msgAsk}`;
  }

  return (
    <div className="slip">
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-rule px-5 pb-4 pt-5 sm:px-6">
        <div>
          <Heading className="text-xl font-extrabold leading-snug text-forest-900">{slipName}</Heading>
          <p className="mt-0.5 text-sm font-semibold text-leaf-700">{t.subtitle}</p>
        </div>
        {variant.documents.length > 0 ? (
          <p className="shrink-0 rounded-md bg-mint-100 px-2.5 py-1.5 text-xs font-extrabold tabular-nums text-forest-900">
            {t.ready(ready.length, variant.documents.length)}
          </p>
        ) : null}
      </div>

      {showTabs ? (
        <div role="tablist" aria-label={t.options(service.name)} className="flex flex-wrap gap-2 px-5 pt-4 sm:px-6">
          {service.variants.map((option) => {
            const selected = option.id === variant.id;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setVariantId(option.id)}
                className={`min-h-[2.5rem] rounded-full border px-3.5 text-sm font-bold transition-colors ${
                  selected
                    ? "border-forest-900 bg-forest-900 text-white"
                    : "border-rule bg-white text-forest-900 hover:border-leaf-700"
                }`}
              >
                {option.name}
              </button>
            );
          })}
        </div>
      ) : null}

      {variant.documents.length > 0 ? (
        <ul className="px-3 py-3 sm:px-4">
          {variant.documents.map((doc, index) => {
            const id = key(index);
            const checked = Boolean(ticked[id]);
            return (
              <li key={id}>
                <label className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 hover:bg-paper">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => setTicked((current) => ({ ...current, [id]: !checked }))}
                  />
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-turmeric ${
                      checked ? "border-forest-900 bg-turmeric text-forest-950" : "border-mint-200 bg-white text-transparent"
                    }`}
                  >
                    <CheckIcon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span
                      className={`block font-bold leading-snug ${
                        checked ? "text-ink-soft line-through decoration-leaf-600/60" : "text-ink"
                      }`}
                    >
                      {doc.text}
                    </span>
                    {doc.note ? (
                      <span className="mt-1 block text-sm leading-snug text-leaf-700">{doc.note}</span>
                    ) : null}
                  </span>
                </label>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-5 py-6 leading-relaxed text-ink-soft sm:px-6">{t.pending}</p>
      )}

      <div className="flex flex-wrap items-center gap-3 border-t border-dashed border-rule px-5 py-4 sm:px-6">
        <a href={whatsappLink(message)} target="_blank" rel="noopener" className="btn btn-primary">
          <WhatsAppIcon className="size-5" />
          {variant.documents.length > 0 ? t.send : t.ask}
        </a>
        {showPageLink ? (
          <Link
            href={localePath(lang, `/services/${service.slug}`)}
            className="inline-flex min-h-[2.75rem] items-center gap-1.5 text-sm font-bold text-forest-900 underline-offset-4 hover:underline"
          >
            {t.open} <ArrowIcon className="size-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
