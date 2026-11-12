import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/AuthForms";
import { AuthShell } from "@/components/AuthShell";

export const metadata: Metadata = {
  title: "Customer login",
  description: "Log in to follow the status of your applications with EasyServe.",
  alternates: { canonical: "/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="Customers"
      title="Customer login"
      intro="Log in to raise a request and follow the status of your applications."
      footer={
        <p>
          New here?{" "}
          <Link href="/register" className="font-bold text-leaf-700 underline underline-offset-2">
            Create a customer account
          </Link>
          . Forgot your password? Message us on WhatsApp from your registered number and we will
          reset it.
        </p>
      }
    >
      <LoginForm role="customer" />
    </AuthShell>
  );
}
