import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

// useSearchParams is read by LoginForm via prop, so this page itself
// can stay a server component and reads searchParams from props.
export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const error = searchParams.error;

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-page">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-display font-black text-3xl text-ink-900 mb-1">
            <span className="text-teal">From Boards</span>{" "}
            <span className="text-amber-mid">to Beakers</span>
          </h1>
          <p className="text-ink-600 text-sm font-display font-bold">
            Admin sign-in
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-ink-100 p-6 shadow-sm">
          <Suspense fallback={null}>
            <LoginForm initialError={error} />
          </Suspense>
        </div>
        <p className="text-center text-ink-400 text-xs mt-6">
          Sign-in is by magic link. We'll email you a one-time link that
          logs you in automatically.
        </p>
      </div>
    </main>
  );
}
