import "server-only";
import { redirect } from "next/navigation";
import { db } from "./db";
import { readSession, type Role } from "./session";

export type CurrentUser = { id: string; role: Role; name: string; phone: string };

/** The signed-in user, looked up fresh so removed accounts lose access at once. */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  const session = await readSession();
  if (!session) return null;
  const client = await db();
  const result = await client.execute({
    sql: "SELECT id, role, name, phone FROM users WHERE id = ?",
    args: [session.userId],
  });
  const row = result.rows[0];
  if (!row) return null;
  return {
    id: String(row.id),
    role: row.role === "admin" ? "admin" : "customer",
    name: String(row.name),
    phone: String(row.phone),
  };
}

export async function requireCustomer(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  if (user.role === "admin") redirect("/admin");
  return user;
}

export async function requireAdmin(): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") redirect("/admin/login");
  return user;
}
