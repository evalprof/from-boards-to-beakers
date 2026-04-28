/**
 * Cookie-aware Supabase client for server contexts that need to know
 * about the logged-in user — middleware, route handlers, server actions,
 * and admin server components.
 *
 * Distinct from:
 *   - lib/supabase.ts        (service-role; bypasses RLS; admin writes)
 *   - lib/supabase-public.ts (anon; RLS-gated; public reads)
 *
 * Uses @supabase/ssr to wire Next.js's cookie store into the client
 * so it can read/write the auth session cookies on the same request.
 */
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";

function requireEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      "Supabase env vars missing — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }
  return { url, anonKey };
}

/**
 * For Server Components and Route Handlers (read-only cookie context
 * from Next.js's cookies() helper).
 */
export function getRouteHandlerSupabase(): SupabaseClient {
  const { url, anonKey } = requireEnv();
  const cookieStore = cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          // Server Components can't mutate cookies; safe to ignore here.
          // Middleware handles session refresh via its own response.
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          // Same caveat as above.
        }
      },
    },
  });
}
