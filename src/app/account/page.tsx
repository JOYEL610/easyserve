import type { Metadata } from "next";
import { Suspense } from "react";
import { logout } from "@/app/actions/auth";
import { RequestForm } from "@/components/RequestForm";
import { StatusBadge } from "@/components/StatusBadge";
import { categories, getService, servicesIn } from "@/content/services";
import { requireCustomer } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPhone } from "@/lib/phone";
import { formatDate, statusOf } from "@/lib/requests";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false, follow: false },
};

const groups = categories.map((category) => ({
  name: category.name,
  services: servicesIn(category.id).map(({ slug, name }) => ({ slug, name })),
}));

async function Account() {
  const user = await requireCustomer();
  const client = await db();
  const result = await client.execute({
    sql: "SELECT id, service_slug, note, status, staff_note, created_at, updated_at FROM requests WHERE user_id = ? ORDER BY created_at DESC",
    args: [user.id],
  });

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-6">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf-700">Your account</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-forest-900 sm:text-4xl">
            {user.name}
          </h1>
          <p className="mt-1 text-ink-soft">{formatPhone(user.phone)}</p>
        </div>
        <form action={logout}>
          <button type="submit" className="btn btn-ghost">
            Log out
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.25fr]">
        <section aria-labelledby="new-request">
          <h2 id="new-request" className="text-xl font-extrabold tracking-tight text-forest-900">
            Raise a request
          </h2>
          <p className="mb-6 mt-2 leading-relaxed text-ink-soft">
            Tell us which service you need. We will message you on WhatsApp with the documents and
            the charges.
          </p>
          <RequestForm groups={groups} />
        </section>

        <section aria-labelledby="your-requests">
          <h2 id="your-requests" className="text-xl font-extrabold tracking-tight text-forest-900">
            Your requests
          </h2>
          {result.rows.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-rule bg-white p-6 leading-relaxed text-ink-soft">
              No requests yet. Raise one and it will show here with its status.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {result.rows.map((row) => {
                const service = getService(String(row.service_slug));
                const status = statusOf(String(row.status));
                return (
                  <li key={String(row.id)} className="rounded-xl border border-rule bg-white p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-lg font-extrabold leading-snug text-forest-900">
                          {service?.name ?? String(row.service_slug)}
                        </p>
                        <p className="mt-0.5 text-sm tabular-nums text-ink-soft">
                          {String(row.id)} · raised {formatDate(String(row.created_at))}
                        </p>
                      </div>
                      <StatusBadge status={status.id} />
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{status.hint}</p>
                    {row.note ? (
                      <p className="mt-3 border-t border-rule pt-3 text-sm leading-relaxed text-ink">
                        <span className="font-bold">Your note: </span>
                        {String(row.note)}
                      </p>
                    ) : null}
                    {row.staff_note ? (
                      <p className="mt-3 rounded-lg bg-mint-100 px-3.5 py-3 text-sm leading-relaxed text-ink">
                        <span className="font-bold">From EasyServe: </span>
                        {String(row.staff_note)}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default function AccountPage() {
  return (
    <div className="shell py-10 md:py-14">
      <Suspense fallback={<p className="py-20 text-center font-bold text-ink-soft">Loading your account…</p>}>
        <Account />
      </Suspense>
    </div>
  );
}
