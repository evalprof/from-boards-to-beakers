import Link from "next/link";
import { getRouteHandlerSupabase } from "@/lib/supabase-server";
import { SignOutButton } from "@/components/SignOutButton";

// Force dynamic — admin pages should never be statically prerendered.
// Each request must hit middleware to verify auth.
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Middleware has already verified auth + the email allowlist by the
  // time we reach here. We just read the user to display the email.
  const supabase = getRouteHandlerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-page">
      <header className="bg-white border-b border-ink-100">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center gap-6">
          <Link
            href="/admin"
            className="font-display font-black text-lg text-ink-900 no-underline"
          >
            <span className="text-teal">From Boards</span>{" "}
            <span className="text-amber-mid">to Beakers</span>{" "}
            <span className="text-ink-400 font-bold text-sm">/ Admin</span>
          </Link>
          <nav className="flex gap-5 ml-2">
            <Link
              href="/admin"
              className="text-ink-600 hover:text-teal font-display font-bold text-sm no-underline"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/games"
              className="text-ink-600 hover:text-teal font-display font-bold text-sm no-underline"
            >
              Games
            </Link>
            <Link
              href="/admin/submissions"
              className="text-ink-600 hover:text-teal font-display font-bold text-sm no-underline"
            >
              Submissions
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-4">
            <span className="text-ink-400 text-xs font-display font-bold">
              {user?.email}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="max-w-[1280px] mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
