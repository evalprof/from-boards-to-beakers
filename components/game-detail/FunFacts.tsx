import type { Game } from "@/lib/types";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-display font-black text-[0.72rem] uppercase tracking-[0.1em] text-teal mb-3 flex items-center gap-1.5">
      <span>{children}</span>
      <span className="flex-1 h-[1.5px] bg-teal-light" />
    </div>
  );
}

function BulletList({
  items,
  dotColor,
}: {
  items: string[];
  dotColor: string;
}) {
  return (
    <div className="grid gap-2">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex gap-2.5 items-start text-[0.92rem] text-ink-600 leading-relaxed"
        >
          <span
            className="w-[7px] h-[7px] rounded-full mt-[7px] flex-shrink-0"
            style={{ background: dotColor }}
          />
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

export function FunFacts({ game }: { game: Game }) {
  return (
    <div>
      <div className="mb-7">
        <SectionLabel>Did You Know?</SectionLabel>
        <BulletList items={game.facts} dotColor="#0F6E56" />
      </div>
      <div>
        <SectionLabel>Science Tools & Techniques</SectionLabel>
        <BulletList items={game.tools} dotColor="#BA7517" />
      </div>
    </div>
  );
}
