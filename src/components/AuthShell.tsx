import { Suspense, type ReactNode } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

/** Sends people who are already signed in straight to their dashboard. */
async function RedirectIfSignedIn() {
  const user = await getCurrentUser();
  if (user) redirect(user.role === "admin" ? "/admin" : "/account");
  return null;
}

export function AuthShell({
  title,
  intro,
  children,
  footer,
}: {
  title: string;
  intro: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="shell py-12 md:py-20">
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-extrabold text-forest-900 sm:text-4xl">{title}</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">{intro}</p>
        <div className="mt-8 rounded-2xl border border-rule bg-white p-6 sm:p-8">{children}</div>
        {footer ? <div className="mt-6 text-sm leading-relaxed text-ink-soft">{footer}</div> : null}
      </div>
    </div>
  );
}
