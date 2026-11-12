import "server-only";
import fs from "node:fs";
import path from "node:path";
import { createClient, type Client } from "@libsql/client";
import { DEFAULT_DATABASE_URL, schema } from "./schema";

/**
 * libSQL client. A local SQLite file by default; set DATABASE_URL (and
 * DATABASE_AUTH_TOKEN) to a hosted libSQL/Turso database in production,
 * where the filesystem is usually read-only.
 */
const globalForDb = globalThis as unknown as {
  easyserveDb?: { client: Client; ready: Promise<void> };
};

function connect() {
  const url = process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL;
  if (url.startsWith("file:")) {
    fs.mkdirSync(path.dirname(path.resolve(url.slice("file:".length))), { recursive: true });
  }
  const client = createClient({ url, authToken: process.env.DATABASE_AUTH_TOKEN });
  const ready = (async () => {
    for (const statement of schema) await client.execute(statement);
  })();
  return { client, ready };
}

export async function db(): Promise<Client> {
  globalForDb.easyserveDb ??= connect();
  await globalForDb.easyserveDb.ready;
  return globalForDb.easyserveDb.client;
}
