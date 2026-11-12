import type { Metadata } from "next";
import { LoginForm } from "@/components/AuthForms";
import { AuthShell } from "@/components/AuthShell";

export const metadata: Metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <AuthShell
      title="Admin login"
      intro="For EasyServe staff. Customers should use the customer login."
    >
      <LoginForm role="admin" />
    </AuthShell>
  );
}
