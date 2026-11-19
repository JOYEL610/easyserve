import "server-only";

import { cookies } from "next/headers";
import { db } from "@/lib/db";

const VISITOR_COOKIE = "es_consent_id";
const CONSENT_COOKIE = "es_consent";

export async function linkConsentToUser(userId: string): Promise<void> {
  const store = await cookies();
  const visitorId = store.get(VISITOR_COOKIE)?.value;
  const choice = store.get(CONSENT_COOKIE)?.value;
  if (
    !visitorId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(visitorId) ||
    (choice !== "all" && choice !== "essential")
  ) {
    return;
  }

  const client = await db();
  await client.execute({
    sql: `INSERT INTO cookie_consents (visitor_id, user_id, choice, updated_at)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(visitor_id) DO UPDATE SET user_id = COALESCE(cookie_consents.user_id, excluded.user_id)`,
    args: [visitorId, userId, choice, new Date().toISOString()],
  });
}
