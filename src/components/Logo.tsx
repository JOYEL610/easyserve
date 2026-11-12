import Image from "next/image";

/** The ES emblem on its own. Used beside the wordmark in the header. */
export function Logo({ className = "size-11" }: { className?: string }) {
  return (
    <Image
      src="/brand/easyserve-mark.png"
      alt=""
      width={288}
      height={288}
      priority
      className={`shrink-0 object-contain ${className}`}
    />
  );
}

/** The complete logo (emblem, name and tagline) on a white tile, for dark backgrounds. */
export function FullLogo({ className = "size-32" }: { className?: string }) {
  return (
    <span className={`grid shrink-0 place-items-center rounded-2xl bg-white p-1.5 ${className}`}>
      <Image
        src="/brand/easyserve-logo.png"
        alt="EasyServe Online Centre"
        width={640}
        height={640}
        className="size-full object-contain"
      />
    </span>
  );
}

export function Wordmark({ tagline }: { tagline: string }) {
  return (
    <span lang="en" className="leading-none">
      <span className="block text-[1.2rem] font-extrabold italic tracking-tight text-ink">
        Easy<span className="text-leaf-600">Serve</span>
      </span>
      <span className="mt-1 hidden whitespace-nowrap text-[0.62rem] font-bold uppercase tracking-[0.2em] text-forest-800 min-[420px]:block">
        {tagline}
      </span>
    </span>
  );
}
