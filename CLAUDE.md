# From Boards to Beakers

A website connecting board games (mainstream and non-mainstream) to STEM-themed fact sheets and hands-on activities for K–8 students, teachers, and parents.

## Project Context

This is a **greenfield full-stack build** migrating from a single-file HTML prototype (`boards-to-beakers.html`). The prototype contains all current game data, styling, and layout decisions. Treat it as the source of truth for design tokens, game content structure, and visual direction.

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

Each game entry has:
- `id`, `name`, `icon`, `photo` (webp image)
- Color theming: `ibg`, `tc`, `tbg`
- `stem` label, `subj`, `type`, `age`, `time`, `players`
- `desc` (card summary), `detail` (expanded description)
- `concepts[]`, `roles[]` (STEM careers), `facts[]`, `tools[]`
- `exps[]` (hands-on experiments with title, steps[], and "why it works")
- `books[]` (recommended reading with title, author, description, age range)
- External links: `bgg` (BoardGameGeek ID), `wiki`

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
