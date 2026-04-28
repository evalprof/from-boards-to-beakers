# From Boards to Beakers

A website connecting board games (mainstream and non-mainstream) to STEM-themed fact sheets and hands-on activities for K–8 students, teachers, and parents.

## Project Context

Originally a greenfield full-stack build migrating from a single-file HTML prototype (`Prototype/boards-to-beakers.html`). **Phases 1, 2, and 3 are shipped to production.** The prototype is preserved as a reference for design tokens and visual direction; the live source of truth is now the Next.js app under `app/`, `components/`, `lib/`, and game content/photos in Supabase.

## Current build status (2026-04-26)

- **Live site**: https://from-boards-to-beakers.vercel.app
- **GitHub**: https://github.com/evalprof/from-boards-to-beakers (deploys to Vercel from `main`)
- **Phase 1 (shipped)**: Public site MVP — game library at `/`, detail pages at `/games/[slug]`, client-side jsPDF generator.
- **Phase 2 (shipped)**: Submission form persists to Supabase `submissions` table; each insert triggers a Resend email. **Live recipient is `evalprof2@gmail.com`** (Resend sandbox restriction; see memory `project_from_boards_to_beakers.md` for the recipient routing story and how to change it later).
- **Phase 3 (shipped — PR #7)**: Game data and photos moved into Supabase. 15 rows in `public.games` (scalar columns + JSONB for `concepts/roles/facts/tools/exps/books`); 15 photos in public `game-photos` storage bucket. Site reads via `lib/db/games.ts` (`getAllGames`/`getGameBySlug`/`getAllSlugs`) using the anon-key client at `lib/supabase-public.ts`. Home + detail pages are async with `revalidate = 3600`. Seed script at `scripts/seed.ts` (run via `npm run seed`).
- **Phase 4 (next)**: `/admin` panel behind Supabase magic-link auth — CRUD for games and submissions review. **Will also implement on-demand revalidation** (`revalidatePath('/')` / `revalidatePath('/games/<slug>')` from save handlers) so admin edits appear instantly instead of waiting up to 1h for the Vercel Data Cache.
- **Phase 5 (later)**: custom domain + SEO + a11y + Lighthouse polish. Custom domain also unlocks sending mail to any recipient (verified Resend domain), which would let us route notifications back to `naturewarrior11@gmail.com` if desired.

## Important context for Claude

- This is **Pete's personal project**, NOT Project Evident work. Submission notifications go to `evalprof2@gmail.com` (a personal Gmail) — never wire `pyork@projectevident.org` into FBtB.
- Pete is **not a coder** — explain technical choices in plain language and walk through any browser-side steps click-by-click.
- Always run `npm run build` (not just `npm run dev`) before pushing — production-only errors (Suspense, prerender) are a recurring trap.
- After editing a row in Supabase, the live site can take up to **1 hour** to reflect the change (Vercel Data Cache TTL = `revalidate` setting). Manually redeploying does NOT bust this cache. Phase 4 will fix this with on-demand revalidation.

## Stack

- **Frontend**: Next.js (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Supabase (PostgreSQL + file storage for PDFs and images)
- **PDF generation**: jsPDF (already used in prototype) or server-side alternative
- **Deployment**: Vercel

## Design Tokens (from prototype)

```
Teal:    #0F6E56 (primary), #E1F5EE (light), #9FE1CB (mid), #085041 (dark)
Amber:   #BA7517 (primary), #FAEEDA (light), #FAC775 (mid), #412402 (dark)
Coral:   #993C1D, #FAECE7 (light)
Purple:  #534AB7, #EEEDFE (light)
Blue:    #185FA5, #E6F1FB (light)
Green:   #3B6D11, #EAF3DE (light)
Pink:    #993556, #FBEAF0 (light)
Grays:   #F1EFE8, #D3D1C7, #B4B2A9, #888780, #5F5E5A, #2C2C2A
Body BG: #FFFCF7

Fonts: Nunito (display/headings, weight 700-900), Lato (body)
```

## Data Model

Each game entry (`public.games` row) has:
- `id`, `slug`, `name`, `icon`, `photo_path` (relative to `game-photos` bucket; resolved to public URL by `lib/db/games.ts` and exposed as `game.photo` on the `Game` type)
- Color theming: `ibg`, `tc`, `tbg`
- `stem` label, `subj`, `type`, `age`, `time`, `players`
- `"desc"` (card summary; quoted because `desc` is a SQL reserved word), `detail` (expanded description)
- JSONB columns: `concepts[]`, `roles[]` (STEM careers), `facts[]`, `tools[]`, `exps[]` (experiments with title/steps/why-it-works), `books[]` (recommended reading)
- External links: `bgg` (BoardGameGeek ID), `wiki`
- `created_at`, `updated_at` (auto-bumped by trigger)

RLS policy: public can SELECT; INSERT/UPDATE/DELETE locked (only service-role bypasses, used by `scripts/seed.ts` and the future Phase 4 admin handlers).

## Key Features (Priority Order)

1. **Game Library** — browsable grid with card layout, filter by grade/age
2. **Game Detail Pages** — full fact sheet view with all STEM content
3. **PDF Download** — generate downloadable fact sheet per game
4. **Submission Form** — let visitors submit game + STEM connection ideas (early priority)
5. **Admin Panel** — upload new games and content without touching code

## Current Assets

- 15 game entries with full STEM content (in prototype JS)
- 15 game cover images (.webp)
- Logo: `Official From Boards to Beakers Logo No Words.png` (icon-only, transparent background)
- Fact sheet content in `Game_Sheets.md` (detailed markdown versions)
- Brand text: "From Boards" in teal (#0F6E56), "to Beakers" in amber (#FAC775)

## Architecture Notes

- Navbar: 84px height, single "Submit a Game" link + logo
- Logo: icon-only image + inline brand text at 40px
- Cards: 295px min-width grid, 190px image area, rounded 16px corners
- Filter: pill-style toggles for grade level
- Search bar in hero section

## Code Style

- TypeScript strict mode
- Prefer server components where possible
- Keep components small and composable
- Use Tailwind — no separate CSS files
- Meaningful commit messages

## What NOT to Do

- Don't change the color palette — it's been carefully refined
- Don't add user accounts or saved favorites (deferred)
- Don't build a "featured game of the month" (deferred)
- Don't over-engineer — start simple and iterate
