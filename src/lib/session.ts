import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export type Role = "customer" | "admin";

const COOKIE = "es_session";
/** Readable hint so the header can show the right menu. Grants nothing by itself. */
const ROLE_HINT = "es_role";
const ONE_WEEK = 60 * 60 * 24 * 7;

function key(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET is missing or shorter than 32 characters. See .env.example.");
  }
  return new TextEncoder().encode(secret);
}

export async function createSession(userId: string, role: Role): Promise<void> {
  const token = await new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(`${ONE_WEEK}s`)
    .sign(key());

  const store = await cookies();
  const base = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ONE_WEEK,
  };
  store.set(COOKIE, token, { ...base, httpOnly: true });
  store.set(ROLE_HINT, role, { ...base, httpOnly: false });
}

/** Returns the signed-in user's id, or null. The role is always re-read from the database. */
export async function readSession(): Promise<{ userId: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key(), { algorithms: ["HS256"] });
    return typeof payload.sub === "string" ? { userId: payload.sub } : null;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
  store.delete(ROLE_HINT);
}
