"use client";

import { useActionState } from "react";
import { createRequest, type RequestFormState } from "@/app/actions/requests";
import { whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

const initial: RequestFormState = {};

export function RequestForm({
  groups,
}: {
  groups: { name: string; services: { slug: string; name: string }[] }[];
}) {
  const [state, action, pending] = useActionState(createRequest, initial);

  return (
    <div className="space-y-5">
      {state.createdId ? (
        <div role="status" className="rounded-xl border border-leaf-600/40 bg-mint-100 p-5">
          <p className="font-extrabold text-forest-900">
            Request {state.createdId} received
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            Now send your documents on WhatsApp and mention this reference so we can match them to
            your request.
          </p>
          <a
            href={whatsappLink(
              `Hi EasyServe, my request reference is ${state.createdId} (${state.createdService}). I am sending my documents.`,
            )}
            target="_blank"
            rel="noopener"
            className="btn btn-primary mt-4"
          >
            <WhatsAppIcon className="size-5" />
            Send documents on WhatsApp
          </a>
        </div>
      ) : null}

      <form action={action} className="space-y-5">
        <p aria-live="polite" className={state.message ? "rounded-lg bg-red-50 px-3.5 py-3 text-sm font-bold text-red-800" : "sr-only"}>
          {state.message}
        </p>
        <div>
          <label htmlFor="service" className="label">
            Service
          </label>
          <select id="service" name="service" required defaultValue="" className="field">
            <option value="" disabled>
              Choose a service
            </option>
            {groups.map((group) => (
              <optgroup key={group.name} label={group.name}>
                {group.services.map((service) => (
                  <option key={service.slug} value={service.slug}>
                    {service.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="note" className="label">
            Anything we should know <span className="font-medium text-ink-soft">(optional)</span>
          </label>
          <textarea
            id="note"
            name="note"
            rows={4}
            maxLength={1000}
            placeholder="For example: adding my wife to our ration card"
            className="field"
          />
        </div>
        <button type="submit" disabled={pending} className="btn btn-primary">
          {pending ? "Sending…" : "Raise request"}
        </button>
      </form>
    </div>
  );
}
