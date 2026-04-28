import type { MetadataRoute } from "next";
import { getAllGames } from "@/lib/db/games";
import { SITE_URL } from "@/lib/site-config";

/**
 * Lists every public route for search engines. Auto-served at /sitemap.xml.
 * Excludes /admin (gated), /login, /auth/callback (auth-only).
 *
 * Each game uses its DB updated_at for `lastModified` so search engines
 * can prioritize re-crawling games whose content changed recently.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const games = await getAllGames();
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...games.map((game) => ({
      url: `${SITE_URL}/games/${game.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
