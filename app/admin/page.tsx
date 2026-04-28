import { getRouteHandlerSupabase } from "@/lib/supabase-server";

export default async function AdminDashboardPage() {
  const supabase = getRouteHandlerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="font-display font-black text-2xl text-ink-900 mb-2">
        Welcome back
      </h1>
      <p className="text-ink-600 mb-8">
        Signed in as <strong>{user?.email}</strong>
      </p>

      <div className="bg-amber-light border border-amber-mid rounded-2xl p-5">
        <h2 className="font-display font-extrabold text-amber-dark text-base mb-1">
          🚧 PR 1 placeholder dashboard
        </h2>
        <p className="text-ink-900 text-sm">
          Auth scaffold is working — you logged in, the email allowlist
          accepted you, and you're seeing this page. PR 2 will replace
          this with real counts and quick links to Games and Submissions
          management.
        </p>
      </div>
    </div>
  );
}
