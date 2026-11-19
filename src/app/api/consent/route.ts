import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { readSession } from "@/lib/session";

const SIX_MONTHS = 60 * 60 * 24 * 182;
const VISITOR_COOKIE = "es_consent_id";

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const choice = (body as { choice?: unknown } | null)?.choice;
  if (choice !== "all" && choice !== "essential") {
    return NextResponse.json({ error: "Invalid cookie choice." }, { status: 400 });
  }

  const existingId = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId =
    existingId && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(existingId)
      ? existingId
      : randomUUID();
  const session = await readSession();
  const userId = session?.userId ?? null;
  const now = new Date().toISOString();
  const client = await db();

  await client.execute({
    sql: `INSERT INTO cookie_consents (visitor_id, user_id, choice, updated_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(visitor_id) DO UPDATE SET
            user_id = excluded.user_id,
            choice = excluded.choice,
            updated_at = excluded.updated_at`,
    args: [visitorId, userId, choice, now],
  });

  const response = NextResponse.json({ ok: true });
  response.cookies.set(VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SIX_MONTHS,
  });
  response.cookies.set("es_consent", choice, {
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SIX_MONTHS,
  });
  return response;
}
