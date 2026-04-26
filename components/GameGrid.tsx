import type { Game, AgeBand } from "@/lib/types";
import { GameCard } from "./GameCard";

function ageKey(g: Game): AgeBand {
  return g.age;
}

function matches(g: Game, f: Filters): boolean {
  if (f.age !== "all" && ageKey(g) !== f.age) return false;
  if (f.type !== "all" && !g.type.includes(f.type)) return false;
  if (f.subject !== "all" && g.subj !== f.subject) return false;
  if (f.q) {
    const s = f.q.toLowerCase();
    if (
      !g.name.toLowerCase().includes(s) &&
      !g.stem.toLowerCase().includes(s) &&
      !g.desc.toLowerCase().includes(s)
    )
      return false;
  }
  return true;
}

type Filters = {
  age: string;
  type: string;
  subject: string;
  q: string;
};

export function GameGrid({
  games,
  searchParams,
}: {
  games: Game[];
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  const get = (k: string) => {
    const v = searchParams[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const f: Filters = {
    age: get("age") ?? "all",
    type: get("type") ?? "all",
    subject: get("subject") ?? "all",
    q: get("q") ?? "",
  };
  const list = games.filter((g) => matches(g, f));

  return (
    <>
      <p className="font-display text-[0.88rem] text-ink-400 mb-5 mt-3">
        <strong className="text-ink-900">
          {list.length} game{list.length !== 1 ? "s" : ""}
        </strong>{" "}
        found
      </p>
      {list.length === 0 ? (
        <div className="text-center py-16 px-8">
          <h3 className="font-display font-extrabold text-lg text-ink-600 mb-1.5">
            No games found
          </h3>
          <p className="text-[0.88rem] text-ink-400">
            Try different filters or clear your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(295px,1fr))] gap-5">
          {list.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </>
  );
}
