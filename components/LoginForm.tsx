"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type Status = "idle" | "sending" | "sent" | "error";

export function LoginForm({ initialError }: { initialError?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(
    initialError === "not_authorized"
      ? "That email isn't on the admin list."
      : initialError === "exchange_failed"
      ? "Login link expired or already used. Please request a new one."
      : null
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    setErrorMsg(null);

    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("[login] signInWithOtp error", error);
      setErrorMsg(error.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="bg-teal-light border border-teal-mid rounded-2xl p-6 text-center">
        <h2 className="font-display font-black text-xl text-teal-dark mb-2">
          ✉️ Check your inbox
        </h2>
        <p className="text-ink-600 text-sm">
          We sent a sign-in link to <strong>{email}</strong>. Click the
          link in the email to log in. The link expires in 1 hour.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {errorMsg && (
        <div className="bg-coral-light border border-coral text-coral px-4 py-2 rounded-lg text-sm font-bold">
          {errorMsg}
        </div>
      )}
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full px-4 py-3 rounded-lg border border-ink-100 font-display text-base outline-none focus:border-teal"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-teal text-white font-display font-extrabold text-base py-3 rounded-lg cursor-pointer hover:bg-teal-dark disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
