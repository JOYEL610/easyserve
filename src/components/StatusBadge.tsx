import { statusOf } from "@/lib/requests";

const styles: Record<string, string> = {
  new: "bg-turmeric text-forest-950",
  documents: "bg-mint-200 text-forest-900",
  filed: "bg-forest-900 text-white",
  done: "bg-leaf-700 text-white",
  cancelled: "bg-zinc-200 text-zinc-700",
};

export function StatusBadge({ status }: { status: string }) {
  const info = statusOf(status);
  return (
    <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-extrabold ${styles[info.id]}`}>
      {info.label}
    </span>
  );
}
