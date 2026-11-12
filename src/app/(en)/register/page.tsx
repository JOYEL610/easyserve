import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/AuthForms";
import { AuthShell } from "@/components/AuthShell";

export const metadata: Metadata = {
  title: "Create a customer account",
  description: "Create an EasyServe account to raise requests and follow your applications.",
  alternates: { canonical: "/register" },
  robots: { index: false, follow: true },
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create your account"
      intro="An account lets you raise a request and see where each application stands. You can also use EasyServe on WhatsApp without one."
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-leaf-700 underline underline-offset-2">
            Log in
          </Link>
          .
        </p>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
