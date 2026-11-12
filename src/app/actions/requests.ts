"use server";

import { randomInt } from "node:crypto";
import { refresh } from "next/cache";
import { getService } from "@/content/services";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { isStatusId } from "@/lib/requests";

export type RequestFormState = { message?: string; createdId?: string; createdService?: string };

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function reference(): string {
  let code = "";
  for (let i = 0; i < 6; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return `ES-${code}`;
}

export async function createRequest(_prev: RequestFormState, formData: FormData): Promise<RequestFormState> {
  const user = await getCurrentUser();
  if (!user || user.role !== "customer") return { message: "Log in again to raise a request." };

  const service = getService(String(formData.get("service") ?? ""));
  if (!service) return { message: "Choose a service." };

  const note = String(formData.get("note") ?? "").trim();
  if (note.length > 1000) return { message: "Keep the note under 1,000 characters." };

  const client = await db();
  const now = new Date().toISOString();
  const id = reference();
  await client.execute({
    sql: "INSERT INTO requests (id, user_id, service_slug, note, status, created_at, updated_at) VALUES (?, ?, ?, ?, 'new', ?, ?)",
    args: [id, user.id, service.slug, note, now, now],
  });

  refresh();
  return { createdId: id, createdService: service.name };
}

export async function updateRequest(formData: FormData): Promise<void> {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") throw new Error("Not authorised.");

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  const staffNote = String(formData.get("staffNote") ?? "").trim().slice(0, 1000);
  if (!id || !isStatusId(status)) throw new Error("Invalid request update.");

  const client = await db();
  await client.execute({
    sql: "UPDATE requests SET status = ?, staff_note = ?, updated_at = ? WHERE id = ?",
    args: [status, staffNote, new Date().toISOString(), id],
  });

  refresh();
}
