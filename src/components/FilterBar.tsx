"use client";

interface FilterBarProps {
  age: string;
  type: string;
  subject: string;
  count: number;
  onAgeChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
}

const AGE_OPTIONS = [
  { value: "all", label: "All Ages" },
  { value: "5-8", label: "Ages 5\u20138" },
  { value: "8-12", label: "Ages 8\u201312" },
  { value: "12+", label: "Ages 12+" },
];

const TYPE_OPTIONS = [
  { value: "all", label: "All Types" },
  { value: "Strategy", label: "Strategy" },
  { value: "Card", label: "Card" },
  { value: "Cooperative", label: "Cooperative" },
  { value: "Word", label: "Word/Party" },
  { value: "Dexterity", label: "Dexterity" },
];

const SUBJECT_OPTIONS = [
  { value: "all", label: "All Subjects" },
  { value: "Biology", label: "Biology" },
  { value: "Space", label: "Space" },
  { value: "Engineering", label: "Engineering" },
  { value: "Geography", label: "Geography" },
  { value: "Forensics", label: "Forensics" },
];

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-3.5 py-1.5 text-sm font-bold transition-colors ${
            value === opt.value
              ? "bg-teal-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default function FilterBar({
  age,
  type,
  subject,
  count,
  onAgeChange,
  onTypeChange,
  onSubjectChange,
}: FilterBarProps) {
  return (
    <div className="border-b border-gray-200 bg-white px-6 py-5">
      <div className="mx-auto max-w-6xl space-y-3">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <PillGroup options={AGE_OPTIONS} value={age} onChange={onAgeChange} />
          <div className="h-6 w-px bg-gray-200" />
          <PillGroup options={TYPE_OPTIONS} value={type} onChange={onTypeChange} />
          <div className="h-6 w-px bg-gray-200" />
          <PillGroup
            options={SUBJECT_OPTIONS}
            value={subject}
            onChange={onSubjectChange}
          />
        </div>
        <p className="text-sm text-gray-500">
          <strong>{count} game{count !== 1 ? "s" : ""}</strong> found
        </p>
      </div>
    </div>
  );
}
