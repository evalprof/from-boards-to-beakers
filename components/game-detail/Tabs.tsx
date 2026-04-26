"use client";

import { useState } from "react";
import type { Game } from "@/lib/types";
import { Overview } from "./Overview";
import { FunFacts } from "./FunFacts";
import { Experiments } from "./Experiments";
import { Books } from "./Books";

const TABS = [
  { id: "ov", label: "Overview" },
  { id: "fa", label: "Fun Facts" },
  { id: "ex", label: "Experiments" },
  { id: "bk", label: "Books" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function Tabs({ game }: { game: Game }) {
  const [active, setActive] = useState<TabId>("ov");

  return (
    <>
      <div className="flex border-b border-ink-100 px-6 bg-white sticky top-[84px] z-10 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActive(t.id)}
            className={`font-display font-extrabold text-[0.85rem] px-4 py-3 cursor-pointer border-b-[2.5px] -mb-[1.5px] whitespace-nowrap transition-all ${
              active === t.id
                ? "text-teal border-teal"
                : "text-ink-400 border-transparent hover:text-teal"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-6">
        {active === "ov" && <Overview game={game} />}
        {active === "fa" && <FunFacts game={game} />}
        {active === "ex" && <Experiments game={game} />}
        {active === "bk" && <Books game={game} />}
      </div>
    </>
  );
}
