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
          <h1 className="text-4xl font-extrabold leading-[1.15] sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-mint-100">{intro}</p>
          <p className="mt-4 text-sm font-semibold text-leaf-300">Last updated {updated}</p>
        </div>
      </section>
      <article className="shell py-10 md:py-14">
        <div className="prose-legal max-w-3xl">{children}</div>
      </article>
    </>
  );
}
