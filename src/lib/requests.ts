export const statuses = [
  { id: "new", label: "Received", hint: "We have your request and will message you." },
  { id: "documents", label: "Waiting for documents", hint: "We need something more from you." },
  { id: "filed", label: "Application filed", hint: "Submitted to the department. Waiting for their decision." },
  { id: "done", label: "Completed", hint: "Finished. Check WhatsApp for your certificate or receipt." },
  { id: "cancelled", label: "Cancelled", hint: "This request was closed without filing." },
] as const;

export type StatusId = (typeof statuses)[number]["id"];

export function statusOf(id: string) {
  return statuses.find((status) => status.id === id) ?? statuses[0];
}

export function isStatusId(value: string): value is StatusId {
  return statuses.some((status) => status.id === value);
}

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

export function formatDate(iso: string): string {
  return dateFormat.format(new Date(iso));
}
