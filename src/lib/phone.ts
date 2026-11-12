/**
 * Normalises a phone number to E.164. Ten-digit Indian mobile numbers get
 * +91; numbers from other countries must be typed with their country code.
 */
export function normalizePhone(input: string): string | null {
  const trimmed = input.trim();
  const digits = trimmed.replace(/\D/g, "");
  if (trimmed.startsWith("+")) {
    return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  }
  if (/^[6-9]\d{9}$/.test(digits)) return `+91${digits}`;
  if (/^0[6-9]\d{9}$/.test(digits)) return `+91${digits.slice(1)}`;
  if (/^91[6-9]\d{9}$/.test(digits)) return `+${digits}`;
  if (/^00\d{8,15}$/.test(digits)) return `+${digits.slice(2)}`;
  return null;
}

export function formatPhone(e164: string): string {
  const match = e164.match(/^\+91(\d{5})(\d{5})$/);
  return match ? `${match[1]} ${match[2]}` : e164;
}
