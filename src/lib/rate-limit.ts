import "server-only";

/**
 * Small in-memory limiter for login attempts: five failures in fifteen
 * minutes locks that key until the window passes. Memory is per server
 * process, so on serverless hosting treat this as a first line of defence
 * and add a shared store (or the host's own rate limiting) as well.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;

const failures = new Map<string, number[]>();

function recent(key: string, now: number): number[] {
  const list = (failures.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (list.length > 0) failures.set(key, list);
  else failures.delete(key);
  return list;
}

export function isLocked(key: string): boolean {
  return recent(key, Date.now()).length >= MAX_FAILURES;
}

export function recordFailure(key: string): void {
  const now = Date.now();
  failures.set(key, [...recent(key, now), now]);
}

export function clearFailures(key: string): void {
  failures.delete(key);
}
