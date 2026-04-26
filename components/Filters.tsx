"use client";

import { useRouter, useSearchParams } from "next/navigation";

const AGE_PILLS = [
  { label: "All Ages", value: "all" },
  { label: "Ages 5–8", value: "5-8" },
  { label: "Ages 8–12", value: "8-12" },
  { label: "Ages 12+", value: "12+" },
];
const TYPE_PILLS = [
  { label: "All Types", value: "all" },
  { label: "Strategy", value: "Strategy" },
  { label: "Card Game", value: "Card" },
  { label: "Cooperative", value: "Cooperative" },
  { label: "Word / Party", value: "Word" },
  { label: "Dexterity", value: "Dexterity" },
];
const SUBJECT_PILLS = [
  { label: "All Topics", value: "all" },
  { label: "Biology", value: "Biology" },
  { label: "Space", value: "Space" },
  { label: "Engineering", value: "Engineering" },
  { label: "Geography", value: "Geography" },
  { label: "Forensics", value: "Forensics" },
];

function PillRow({
  label,
  paramKey,
  options,
}: {
  label: string;
  paramKey: string;
  options: { label: string; value: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get(paramKey) ?? "all";

  function setValue(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(paramKey);
    } else {
      params.set(paramKey, value);
    }
    router.replace(`/?${params.toString()}#library`, { scroll: false });
  }

  return (
    <div className="flex gap-3 flex-wrap items-center mb-3">
      <span className="font-display font-extrabold text-[0.78rem] text-ink-600 min-w-[80px] uppercase tracking-[0.06em]">
        {label}
      </span>
      <div className="flex gap-1.5 flex-wrap">
        {options.map((o) => {
          const active = current === o.value;
          return (
            <button
              key={o.value}
              type="button"
              onClick={() => setValue(o.value)}
              className={`px-[13px] py-[5px] rounded-[20px] border font-display font-bold text-[0.78rem] cursor-pointer transition-all select-none ${
                active
                  ? "bg-teal border-teal text-white"
                  : "bg-white border-ink-100 text-ink-600 hover:border-teal hover:text-teal"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Filters() {
  return (
    <div>
      <PillRow label="Age Range" paramKey="age" options={AGE_PILLS} />
      <PillRow label="Game Type" paramKey="type" options={TYPE_PILLS} />
      <PillRow label="STEM Topic" paramKey="subject" options={SUBJECT_PILLS} />
    </div>
  );
}
