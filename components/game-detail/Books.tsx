import type { Game } from "@/lib/types";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display font-black text-[0.72rem] uppercase tracking-[0.1em] text-teal mb-3 flex items-center gap-1.5">
      <span>{children}</span>
      <span className="flex-1 h-[1.5px] bg-teal-light" />
    </div>
  );
}

export function Books({ game }: { game: Game }) {
  return (
    <div>
      <SectionLabel>Recommended Reading</SectionLabel>
      <div className="grid gap-3">
        {game.books.map((b, i) => (
          <div
            key={i}
            className="flex gap-3 items-start bg-ink-50 rounded-[10px] p-3.5"
          >
            <div className="w-1 bg-amber rounded self-stretch flex-shrink-0" />
            <div>
              <div className="font-display font-black text-[0.92rem] text-ink-900 mb-0.5">
                {b.t}
              </div>
              <div className="text-[0.8rem] text-ink-400 mb-1">{b.a}</div>
              <div className="text-[0.85rem] text-ink-600 leading-snug">
                {b.d}
              </div>
              <span className="inline-block bg-teal-light text-teal font-display font-extrabold text-[0.7rem] px-2 py-0.5 rounded-[10px] mt-1.5">
                {b.ag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
