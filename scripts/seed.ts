/**
 * One-shot seed: pushes the 15 games and their photos from the local
 * `lib/games.ts` array (and `public/games/*.webp`) into Supabase.
 *
 * Idempotent: re-running upserts the rows by slug and overwrites the photos.
 * Run with: npm run seed
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { GAMES } from "./seed-data";

const BUCKET = "game-photos";

async function main() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      "Missing env vars. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local."
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  console.log(`Seeding ${GAMES.length} games into Supabase...\n`);

  for (const game of GAMES) {
    const photoFile = `${game.slug}.webp`;
    const photoPath = join(process.cwd(), "public", "games", photoFile);

    // Upload the photo (overwrites if it already exists)
    const photoBytes = await readFile(photoPath);
    const { error: uploadErr } = await supabase.storage
      .from(BUCKET)
      .upload(photoFile, photoBytes, {
        contentType: "image/webp",
        upsert: true,
      });
    if (uploadErr) {
      throw new Error(`[${game.slug}] photo upload failed: ${uploadErr.message}`);
    }

    // Upsert the row (matched on slug; safe to re-run)
    const row = {
      id: game.id,
      slug: game.slug,
      name: game.name,
      icon: game.icon,
      ibg: game.ibg,
      tc: game.tc,
      tbg: game.tbg,
      stem: game.stem,
      subj: game.subj,
      type: game.type,
      age: game.age,
      time: game.time,
      players: game.players,
      bgg: game.bgg,
      wiki: game.wiki,
      photo_path: photoFile,
      desc: game.desc,
      detail: game.detail,
      concepts: game.concepts,
      roles: game.roles,
      facts: game.facts,
      tools: game.tools,
      exps: game.exps,
      books: game.books,
    };

    const { error: insertErr } = await supabase
      .from("games")
      .upsert(row as never, { onConflict: "slug" });
    if (insertErr) {
      throw new Error(`[${game.slug}] row upsert failed: ${insertErr.message}`);
    }

    console.log(`  ✓ ${game.slug.padEnd(20)} (id ${game.id})`);
  }

  console.log(`\nDone. ${GAMES.length} rows + photos in Supabase.`);
}

main().catch((err) => {
  console.error("\nSeed failed:", err);
  process.exit(1);
});
