import { getPublicSupabase } from "../supabase-public";
import type { Game } from "../types";

const BUCKET = "game-photos";

type GameRow = Omit<Game, "photo"> & { photo_path: string | null };

function rowToGame(row: GameRow, publicUrlFor: (path: string) => string): Game {
  const { photo_path, ...rest } = row;
  return {
    ...rest,
    photo: photo_path ? publicUrlFor(photo_path) : undefined,
  };
}

export async function getAllGames(): Promise<Game[]> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("id", { ascending: true });
  if (error) throw new Error(`getAllGames failed: ${error.message}`);

  const publicUrlFor = (path: string) =>
    supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  return (data ?? []).map((r) => rowToGame(r as GameRow, publicUrlFor));
}

export async function getGameBySlug(slug: string): Promise<Game | undefined> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`getGameBySlug(${slug}) failed: ${error.message}`);
  if (!data) return undefined;

  const publicUrlFor = (path: string) =>
    supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;

  return rowToGame(data as GameRow, publicUrlFor);
}

export async function getAllSlugs(): Promise<string[]> {
  const supabase = getPublicSupabase();
  const { data, error } = await supabase.from("games").select("slug");
  if (error) throw new Error(`getAllSlugs failed: ${error.message}`);
  return (data ?? []).map((r) => (r as { slug: string }).slug);
}
