/**
 * Site-wide constants. The single place to change the canonical domain.
 *
 * Used by:
 *   - app/layout.tsx (metadataBase, default OG)
 *   - app/games/[slug]/page.tsx (per-page OG + canonical)
 *   - app/sitemap.ts
 *   - app/robots.ts
 */

export const SITE_URL = "https://fromboardstobeakers.org";

export const SITE_NAME = "From Boards to Beakers";

export const SITE_DESCRIPTION =
  "Free STEM activity sheets and hands-on experiments connected to the board games kids already love — for classrooms, game nights, and curious minds.";
