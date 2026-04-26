import type { Game } from "@/lib/types";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display font-black text-[0.72rem] uppercase tracking-[0.1em] text-teal mb-3 flex items-center gap-1.5">
      <span>{children}</span>
      <span className="flex-1 h-[1.5px] bg-teal-light" />
    </div>
  );
}

export function Experiments({ game }: { game: Game }) {
  return (
    <div>
      <SectionLabel>At-Home Lab Activities</SectionLabel>
      {game.exps.map((e, i) => (
        <div
          key={i}
          className="border border-ink-100 rounded-xl overflow-hidden mb-3.5"
        >
          <div className="bg-amber-light p-3 flex items-center gap-2.5">
            <span className="bg-amber text-white w-6 h-6 rounded-full font-display font-black text-[0.78rem] flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <div className="font-display font-black text-[0.92rem] text-amber-dark">
              {e.t}
            </div>
          </div>
          <div className="p-3.5">
            <div className="text-[0.88rem] text-ink-600 leading-relaxed">
              {e.s.map((step, si) => (
                <div key={si} className="flex gap-2 mb-1">
                  <span className="text-amber font-bold flex-shrink-0 text-[0.85rem]">
                    Step {si + 1}.
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="bg-teal-light border-l-[3px] border-teal rounded-r-lg p-2.5 mt-3 text-[0.85rem] text-teal-dark leading-snug">
              <strong className="font-display font-black">
                🔬 Why it works:
              </strong>{" "}
              {e.w}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
