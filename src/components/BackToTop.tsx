"use client";

import { useEffect, useState } from "react";
import { ChevronIcon } from "./icons";

/** Small round button that appears after scrolling and returns to the top. */
export function BackToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={() => {
        const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: calm ? "auto" : "smooth" });
      }}
      className="fixed bottom-5 right-5 z-40 grid size-12 place-items-center rounded-full border border-rule bg-white text-forest-900 shadow-[0_10px_30px_-12px_rgb(4_38_12/0.5)] hover:border-leaf-700 hover:text-leaf-700"
    >
      <ChevronIcon className="size-5 rotate-180" />
    </button>
  );
}
