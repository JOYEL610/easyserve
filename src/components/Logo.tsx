import Image from "next/image";

/** The logo, shown whole inside a white disc with breathing room around it. */
export function Logo({ className = "size-11" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-rule ${className}`}>
      <Image
        src="/brand/easyserve-logo.jpg"
        alt=""
        width={150}
        height={150}
        className="size-[78%] object-contain"
      />
    </span>
  );
}

export function Wordmark({ tone = "dark", tagline }: { tone?: "dark" | "light"; tagline: string }) {
  return (
    <span lang="en" className="leading-none">
      <span
        className={`block text-[1.15rem] font-extrabold italic tracking-tight ${
          tone === "dark" ? "text-forest-900" : "text-white"
        }`}
      >
        Easy<span className={tone === "dark" ? "text-leaf-600" : "text-leaf-300"}>Serve</span>
      </span>
      <span
        className={`mt-1 hidden whitespace-nowrap text-[0.62rem] font-bold uppercase tracking-[0.2em] min-[420px]:block ${
          tone === "dark" ? "text-ink-soft" : "text-mint-200"
        }`}
      >
        {tagline}
      </span>
    </span>
  );
}
