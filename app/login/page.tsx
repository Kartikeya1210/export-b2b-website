"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="stack">
      <header className="page-header">
        <h1 className="page-title">Wholesale access</h1>
        <p className="page-subtitle">
          For this demo, any email can log in as an approved wholesale buyer. In a real app, this would be
          tied to your actual customer database and approval flow.
        </p>
      </header>
      <form
        className="card stack-sm"
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmitting(true);
          try {
            const res = await fetch("/api/auth/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, redirectTo: "/catalog" }),
            });
            if (!res.ok) throw new Error("Failed to log in");
            const redirectTo = res.headers.get("X-Redirect-To") || "/catalog";
            router.push(redirectTo);
          } catch (error) {
            // eslint-disable-next-line no-alert
            alert("Login failed in this demo. Check the console for details.");
            // eslint-disable-next-line no-console
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <div className="field">
          <label htmlFor="email">Business email</label>
          <input
            id="email"
            type="email"
            required
            placeholder="buyer@example.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in as wholesale buyer"}
        </button>
        <p className="notice">
          Use the Request account flow in a real deployment. This login is only here to demonstrate
          wholesale-only pricing and ordering behaviour.
        </p>
      </form>
    </div>
  );
}

