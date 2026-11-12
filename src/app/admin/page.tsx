import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/actions/auth";
import { updateRequest } from "@/app/actions/requests";
import { StatusBadge } from "@/components/StatusBadge";
import { WhatsAppIcon } from "@/components/icons";
import { getService } from "@/content/services";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatPhone } from "@/lib/phone";
import { formatDate, isStatusId, statuses } from "@/lib/requests";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

async function Dashboard({ searchParams }: { searchParams: Promise<{ status?: string | string[] }> }) {
  const admin = await requireAdmin();
  const { status: rawStatus } = await searchParams;
  const filter = typeof rawStatus === "string" && isStatusId(rawStatus) ? rawStatus : null;

  const client = await db();
  const [requests, counts, customers] = await Promise.all([
    client.execute({
      sql: `SELECT r.id, r.service_slug, r.note, r.status, r.staff_note, r.created_at, r.updated_at,
                   u.name AS customer_name, u.phone AS customer_phone
            FROM requests r JOIN users u ON u.id = r.user_id
            ${filter ? "WHERE r.status = ?" : ""}
            ORDER BY r.updated_at DESC LIMIT 200`,
      args: filter ? [filter] : [],
    }),
    client.execute("SELECT status, COUNT(*) AS total FROM requests GROUP BY status"),
    client.execute("SELECT COUNT(*) AS total FROM users WHERE role = 'customer'"),
  ]);

  const countFor = (id: string) => Number(counts.rows.find((row) => row.status === id)?.total ?? 0);
  const total = counts.rows.reduce((sum, row) => sum + Number(row.total), 0);

  const chip = (active: boolean) =>
    `inline-flex min-h-[2.5rem] items-center gap-2 rounded-full border px-4 text-sm font-bold ${
      active ? "border-forest-900 bg-forest-900 text-white" : "border-rule bg-white text-forest-900 hover:border-leaf-700"
    }`;

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-6">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-leaf-700">Admin</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.02em] text-forest-900 sm:text-4xl">
            Customer requests
          </h1>
          <p className="mt-1 text-ink-soft">
            Signed in as {admin.name}. {Number(customers.rows[0]?.total ?? 0)} customer accounts.
          </p>
        </div>
        <form action={logout}>
          <button type="submit" className="btn btn-ghost">
            Log out
          </button>
        </form>
      </div>

      <nav aria-label="Filter by status" className="mt-6 flex flex-wrap gap-2">
        <Link href="/admin" className={chip(!filter)}>
          All <span className="tabular-nums opacity-70">{total}</span>
        </Link>
        {statuses.map((status) => (
          <Link key={status.id} href={`/admin?status=${status.id}`} className={chip(filter === status.id)}>
            {status.label} <span className="tabular-nums opacity-70">{countFor(status.id)}</span>
          </Link>
        ))}
      </nav>

      {requests.rows.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-rule bg-white p-8 leading-relaxed text-ink-soft">
          {filter
            ? "No requests with this status."
            : "No requests yet. They appear here when a customer raises one from their account."}
        </p>
      ) : (
        <ul className="mt-8 space-y-5">
          {requests.rows.map((row) => {
            const id = String(row.id);
            const service = getService(String(row.service_slug));
            const phone = String(row.customer_phone);
            const name = String(row.customer_name);
            const wa = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(
              `Hi ${name}, this is EasyServe about your request ${id} (${service?.name ?? row.service_slug}).`,
            )}`;
            return (
              <li key={id} className="grid gap-6 rounded-xl border border-rule bg-white p-5 md:grid-cols-[1.2fr_1fr] md:p-6">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={String(row.status)} />
                    <span className="text-sm font-bold tabular-nums text-ink-soft">{id}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-forest-900">
                    {service?.name ?? String(row.service_slug)}
                  </h2>
                  <p className="mt-1 font-bold text-ink">
                    {name} · {formatPhone(phone)}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Raised {formatDate(String(row.created_at))} · updated {formatDate(String(row.updated_at))}
                  </p>
                  {row.note ? (
                    <p className="mt-3 rounded-lg bg-paper px-3.5 py-3 text-sm leading-relaxed text-ink">
                      {String(row.note)}
                    </p>
                  ) : null}
                  <a href={wa} target="_blank" rel="noopener" className="btn btn-ghost mt-4">
                    <WhatsAppIcon className="size-5 text-leaf-700" />
                    Message customer
                  </a>
                </div>

                <form action={updateRequest} className="space-y-4 md:border-l md:border-rule md:pl-6">
                  <input type="hidden" name="id" value={id} />
                  <div>
                    <label htmlFor={`status-${id}`} className="label">
                      Status
                    </label>
                    <select id={`status-${id}`} name="status" defaultValue={String(row.status)} className="field">
                      {statuses.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor={`note-${id}`} className="label">
                      Note shown to the customer
                    </label>
                    <textarea
                      id={`note-${id}`}
                      name="staffNote"
                      rows={3}
                      maxLength={1000}
                      defaultValue={String(row.staff_note ?? "")}
                      className="field"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Save changes
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default function AdminPage({ searchParams }: PageProps<"/admin">) {
  return (
    <div className="shell py-10 md:py-14">
      <Suspense fallback={<p className="py-20 text-center font-bold text-ink-soft">Loading requests…</p>}>
        <Dashboard searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
