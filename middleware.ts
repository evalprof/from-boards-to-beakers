/**
 * Gates /admin/* and /api/admin/* behind Supabase Auth, then enforces
 * a single-email allowlist (only Pete can pass).
 *
 * Flow:
 *   1. Refresh the session cookie if needed (via the @supabase/ssr middleware client).
 *   2. If no session → redirect to /login?next=<original-path>.
 *   3. If session but user.email is not in the allowlist → 403.
 *   4. Otherwise pass through.
 *
 * To add a co-admin in the future, append their email to ALLOWED_ADMINS.
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_ADMINS = ["evalprof2@gmail.com"];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: "", ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Refresh the session if it's about to expire.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in: redirect to /login with a "next" hint so we can return
  // them where they came from after login.
  if (!user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Logged in but not on the allowlist: send to /login with an error code.
  // We chose "redirect with message" over "raw 403" so non-admins land on
  // a page that explains what happened, instead of a browser error screen.
  if (!user.email || !ALLOWED_ADMINS.includes(user.email)) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "not_authorized");
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  // Run on every /admin/* and /api/admin/* path. Note: this does NOT run
  // on /login or /auth/callback, so unauthenticated users can reach those.
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
