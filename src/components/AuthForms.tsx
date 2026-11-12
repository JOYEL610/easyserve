"use client";

import Link from "next/link";
import { useActionState, useState, type InputHTMLAttributes } from "react";
import { loginAdmin, loginCustomer, registerCustomer, type FormState } from "@/app/actions/auth";

const initial: FormState = {};

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-bold text-red-700">
      {message}
    </p>
  );
}

function FormMessage({ message }: { message?: string }) {
  return (
    <p aria-live="polite" className={message ? "rounded-lg bg-red-50 px-3.5 py-3 text-sm font-bold text-red-800" : "sr-only"}>
      {message}
    </p>
  );
}

/** Password box with a Show / Hide button, so people can check what they typed. */
function PasswordField(props: InputHTMLAttributes<HTMLInputElement>) {
  const [shown, setShown] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={shown ? "text" : "password"} className="field pr-20" />
      <button
        type="button"
        onClick={() => setShown((value) => !value)}
        aria-pressed={shown}
        className="absolute right-1.5 top-1/2 min-h-[2.25rem] -translate-y-1/2 rounded-md px-3 text-sm font-bold text-leaf-700 hover:bg-mint-100"
      >
        {shown ? "Hide" : "Show"}
        <span className="sr-only"> password</span>
      </button>
    </div>
  );
}

export function LoginForm({ role }: { role: "customer" | "admin" }) {
  const [state, action, pending] = useActionState(role === "admin" ? loginAdmin : loginCustomer, initial);

  return (
    <form action={action} className="space-y-5">
      <FormMessage message={state.message} />
      <div>
        <label htmlFor="phone" className="label">
          Mobile number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="username"
          required
          defaultValue={state.values?.phone}
          placeholder="10-digit number"
          className="field"
        />
      </div>
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <PasswordField id="password" name="password" autoComplete="current-password" required />
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerCustomer, initial);
  const errors = state.errors ?? {};

  return (
    <form action={action} className="space-y-5" noValidate>
      <FormMessage message={state.message} />
      <div>
        <label htmlFor="name" className="label">
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          defaultValue={state.values?.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
          className="field"
        />
        <FieldError id="name-error" message={errors.name} />
      </div>
      <div>
        <label htmlFor="phone" className="label">
          Mobile number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          required
          defaultValue={state.values?.phone}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          className="field"
        />
        <p id="phone-hint" className="mt-1.5 text-sm text-ink-soft">
          Use your WhatsApp number. Outside India, include the country code.
        </p>
        <FieldError id="phone-error" message={errors.phone} />
      </div>
      <div>
        <label htmlFor="password" className="label">
          Password
        </label>
        <PasswordField
          id="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={8}
          aria-invalid={Boolean(errors.password)}
          aria-describedby={errors.password ? "password-error" : "password-hint"}
        />
        <p id="password-hint" className="mt-1.5 text-sm text-ink-soft">
          At least 8 characters.
        </p>
        <FieldError id="password-error" message={errors.password} />
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <input
            type="checkbox"
            name="agree"
            required
            aria-describedby={errors.agree ? "agree-error" : undefined}
            className="mt-1 size-5 shrink-0 accent-leaf-700"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="font-bold text-leaf-700 underline underline-offset-2">
              terms and conditions
            </Link>{" "}
            and the{" "}
            <Link href="/privacy" className="font-bold text-leaf-700 underline underline-offset-2">
              privacy policy
            </Link>
            .
          </span>
        </label>
        <FieldError id="agree-error" message={errors.agree} />
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary w-full">
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
