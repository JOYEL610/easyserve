import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-forest-900 text-white">
        <div className="shell py-12 md:py-16">
          <p className="text-sm font-bold text-leaf-300">Last updated {updated}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mint-100">{intro}</p>
        </div>
      </section>
      <article className="shell py-10 md:py-14">
        <div className="prose-legal max-w-3xl">{children}</div>
      </article>
    </>
  );
}
