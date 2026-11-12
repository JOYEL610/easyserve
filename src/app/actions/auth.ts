"use server";

import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/db";
import { normalizePhone } from "@/lib/phone";
import { clearFailures, isLocked, recordFailure } from "@/lib/rate-limit";
import { createSession, destroySession, type Role } from "@/lib/session";

export type FormState = {
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "password" | "agree", string>>;
  values?: { name?: string; phone?: string };
};

/** Compared against when no account exists, so both cases take the same time. */
const DUMMY_HASH = bcrypt.hashSync("no-such-account", 12);
const LOCKED = "Too many failed attempts. Try again in 15 minutes.";

const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(80, "Name is too long."),
  password: z
    .string()
    .min(8, "Use at least 8 characters.")
    .max(72, "Use 72 characters or fewer."),
  agree: z.literal("on", "Tick the box to agree before creating an account."),
});

export async function registerCustomer(_prev: FormState, formData: FormData): Promise<FormState> {
  const rawName = String(formData.get("name") ?? "");
  const rawPhone = String(formData.get("phone") ?? "");
  const values = { name: rawName, phone: rawPhone };

  const parsed = registerSchema.safeParse({
    name: rawName,
    password: String(formData.get("password") ?? ""),
    agree: formData.get("agree"),
  });
  const phone = normalizePhone(rawPhone);

  const errors: FormState["errors"] = {};
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as "name" | "password" | "agree";
      errors[field] ??= issue.message;
    }
  }
  if (!phone) {
    errors.phone = "Enter a 10-digit mobile number, or include the country code (for example +971…).";
  }
  if (!parsed.success || !phone) return { errors, values };

  const client = await db();
  const existing = await client.execute({ sql: "SELECT id FROM users WHERE phone = ?", args: [phone] });
  if (existing.rows.length > 0) {
    return {
      errors: { phone: "An account with this number already exists. Log in instead." },
      values,
    };
  }

  const id = randomUUID();
  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  await client.execute({
    sql: "INSERT INTO users (id, role, name, phone, password_hash, created_at) VALUES (?, 'customer', ?, ?, ?, ?)",
    args: [id, parsed.data.name, phone, passwordHash, new Date().toISOString()],
  });

  await createSession(id, "customer");
  redirect("/account");
}

async function login(role: Role, formData: FormData): Promise<FormState> {
  const rawPhone = String(formData.get("phone") ?? "");
  const password = String(formData.get("password") ?? "");
  const values = { phone: rawPhone };
  const phone = normalizePhone(rawPhone);
  const failed: FormState = { message: "Phone number or password is incorrect.", values };

  if (!phone || !password) return failed;

  const limitKey = `${role}:${phone}`;
  if (isLocked(limitKey)) return { message: LOCKED, values };

  const client = await db();
  const result = await client.execute({
    sql: "SELECT id, role, password_hash FROM users WHERE phone = ?",
    args: [phone],
  });
  const row = result.rows[0];
  const matches = await bcrypt.compare(password, row ? String(row.password_hash) : DUMMY_HASH);

  if (!row || !matches || row.role !== role) {
    recordFailure(limitKey);
    return failed;
  }

  clearFailures(limitKey);
  await createSession(String(row.id), role);
  redirect(role === "admin" ? "/admin" : "/account");
}

export async function loginCustomer(_prev: FormState, formData: FormData): Promise<FormState> {
  return login("customer", formData);
}

export async function loginAdmin(_prev: FormState, formData: FormData): Promise<FormState> {
  return login("admin", formData);
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/");
}
