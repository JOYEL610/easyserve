"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ChevronIcon } from "./icons";

/** Header dropdown that closes on outside click, Escape and navigation. */
export function Dropdown({
  label,
  children,
  align = "right",
  buttonClassName = "",
  chevronClassName = "",
}: {
  label: ReactNode;
  children: ReactNode;
  align?: "left" | "right";
  buttonClassName?: string;
  chevronClassName?: string;
}) {
  const [openOn, setOpenOn] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openOn === pathname;
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    function onPointer(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenOn(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenOn(null);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpenOn(open ? null : pathname)}
        className={buttonClassName}
      >
        {label}
        <ChevronIcon className={`size-4 transition-transform ${open ? "rotate-180" : ""} ${chevronClassName}`} />
      </button>
      <div
        id={panelId}
        hidden={!open}
        onClick={(e) => {
          if ((e.target as HTMLElement).closest("a")) setOpenOn(null);
        }}
        className={`absolute top-full z-40 mt-2 w-64 rounded-xl border border-rule bg-white p-2 shadow-[0_20px_40px_-20px_rgb(4_38_12/0.45)] ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
