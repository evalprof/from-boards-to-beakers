import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-config";

/**
 * Auto-served at /robots.txt. Tells crawlers what they can index.
 *
 * - Allow: everything public.
 * - Disallow: /admin/* (auth-gated; pointless for crawlers to attempt),
 *   /api/* (no public-facing GET endpoints), /auth/* (callback-only),
 *   /login (no value to index).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/auth/", "/login"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
