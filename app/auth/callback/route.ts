/**
 * Magic-link landing page. Supabase appends `?code=<one-time-code>` when
 * Pete clicks the link in his email; we exchange that for a session cookie
 * and redirect to wherever he was trying to go (or /admin by default).
 */
import { NextResponse } from "next/server";
import { getRouteHandlerSupabase } from "@/lib/supabase-server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/admin";

  if (code) {
    const supabase = getRouteHandlerSupabase();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/callback] exchange error", error);
      const loginUrl = new URL("/login", origin);
      loginUrl.searchParams.set("error", "exchange_failed");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.redirect(new URL(next, origin));
}
