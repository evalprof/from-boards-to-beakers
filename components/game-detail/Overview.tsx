import type { Game } from "@/lib/types";

const CHIP_COLORS = [
  { bg: "#E1F5EE", c: "#085041" },
  { bg: "#EEEDFE", c: "#3C3489" },
  { bg: "#FAEEDA", c: "#412402" },
  { bg: "#E6F1FB", c: "#0C447C" },
  { bg: "#EAF3DE", c: "#27500A" },
  { bg: "#FAECE7", c: "#712B13" },
  { bg: "#FBEAF0", c: "#72243E" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display font-black text-[0.72rem] uppercase tracking-[0.1em] text-teal mb-3 flex items-center gap-1.5">
      <span>{children}</span>
      <span className="flex-1 h-[1.5px] bg-teal-light" />
    </div>
  );
}

export function Overview({ game }: { game: Game }) {
  return (
    <div>
      <div className="mb-7">
        <SectionLabel>STEM Connection</SectionLabel>
        <p className="text-[0.95rem] text-ink-600 leading-relaxed">
          {game.detail}
        </p>
      </div>
      <div className="mb-7">
        <SectionLabel>Key Science Concepts</SectionLabel>
        <div className="flex gap-1.5 flex-wrap">
          {game.concepts.map((c, i) => {
            const cl = CHIP_COLORS[i % CHIP_COLORS.length];
            return (
              <span
                key={c}
                className="px-2.5 py-1 rounded-[14px] font-display font-bold text-[0.75rem]"
                style={{ background: cl.bg, color: cl.c }}
              >
                {c}
              </span>
            );
          })}
        </div>
      </div>
      <div>
        <SectionLabel>STEM Careers in This Game</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2.5">
          {game.roles.map((r) => (
            <div
              key={r.n}
              className="bg-teal-light rounded-[10px] p-3"
            >
              <div className="font-display font-black text-teal-dark text-[0.85rem] mb-1">
                {r.n}
              </div>
              <div className="text-teal text-[0.82rem] leading-snug">
                {r.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
