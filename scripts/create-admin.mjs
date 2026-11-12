/**
 * Creates or updates the admin account.
 *
 *   npm run create-admin
 *
 * Reads ADMIN_NAME, ADMIN_PHONE and ADMIN_PASSWORD from .env.local.
 * Running it again with a new ADMIN_PASSWORD resets the password.
 */
import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import bcrypt from "bcryptjs";
import { DEFAULT_DATABASE_URL, schema } from "../src/lib/schema.ts";

const { ADMIN_NAME = "EasyServe Admin", ADMIN_PHONE, ADMIN_PASSWORD } = process.env;

if (!ADMIN_PHONE || !ADMIN_PASSWORD) {
  console.error("Set ADMIN_PHONE and ADMIN_PASSWORD in .env.local first. See .env.example.");
  process.exit(1);
}
if (ADMIN_PASSWORD.length < 12) {
  console.error("ADMIN_PASSWORD must be at least 12 characters.");
  process.exit(1);
}

const digits = ADMIN_PHONE.replace(/\D/g, "");
const phone = ADMIN_PHONE.trim().startsWith("+") ? `+${digits}` : `+91${digits.slice(-10)}`;

const url = process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL;
if (url.startsWith("file:")) {
  fs.mkdirSync(path.dirname(path.resolve(url.slice("file:".length))), { recursive: true });
}
const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
for (const statement of schema) await client.execute(statement);

const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
const existing = await client.execute({ sql: "SELECT id FROM users WHERE phone = ?", args: [phone] });

if (existing.rows.length > 0) {
  await client.execute({
    sql: "UPDATE users SET role = 'admin', name = ?, password_hash = ? WHERE phone = ?",
    args: [ADMIN_NAME, passwordHash, phone],
  });
  console.log(`Updated admin account for ${phone}.`);
} else {
  await client.execute({
    sql: "INSERT INTO users (id, role, name, phone, password_hash, created_at) VALUES (?, 'admin', ?, ?, ?, ?)",
    args: [randomUUID(), ADMIN_NAME, phone, passwordHash, new Date().toISOString()],
  });
  console.log(`Created admin account for ${phone}.`);
}
