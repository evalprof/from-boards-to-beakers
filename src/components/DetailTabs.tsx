"use client";

import { useState } from "react";

const TABS = [
  { key: "overview", label: "Overview" },
  { key: "facts", label: "Fun Facts" },
  { key: "experiments", label: "Experiments" },
  { key: "books", label: "Books" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

interface DetailTabsProps {
  children: Record<TabKey, React.ReactNode>;
}

export default function DetailTabs({ children }: DetailTabsProps) {
  const [active, setActive] = useState<TabKey>("overview");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-1 border-b border-gray-200 px-6">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`rounded-t-lg px-4 py-2.5 text-sm font-bold transition-colors ${
              active === tab.key
                ? "border-b-2 border-teal-600 text-teal-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active panel */}
      <div className="px-6 py-6">{children[active]}</div>
    </div>
  );
}
