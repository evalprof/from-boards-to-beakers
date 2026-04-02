"use client";

interface HeroProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSubjectClick: (subject: string) => void;
}

const SUBJECT_CHIPS = [
  { label: "Biology", icon: "\u{1F9EC}" },
  { label: "Space", icon: "\u{1F680}" },
  { label: "Engineering", icon: "\u2699\uFE0F" },
  { label: "Geography", icon: "\u{1F5FA}\uFE0F" },
  { label: "Forensics", icon: "\u{1F50D}" },
];

export default function Hero({
  searchValue,
  onSearchChange,
  onSubjectClick,
}: HeroProps) {
  return (
    <section className="bg-teal-50 px-6 py-16 text-center">
      <h1 className="font-display text-4xl font-black tracking-tight text-gray-800 md:text-5xl">
        From Boards{" "}
        <em className="not-italic text-amber-300">to Beakers</em>
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-lg text-gray-600">
        STEM activity sheets for curious kids, teachers, and game-loving
        families
      </p>

      {/* Search bar */}
      <div className="mx-auto mt-8 flex max-w-md overflow-hidden rounded-full border-2 border-teal-600 bg-white">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search games, topics, or activities…"
          className="flex-1 px-5 py-3 text-sm text-gray-800 outline-none placeholder:text-gray-300"
        />
        <button className="bg-teal-600 px-6 font-display text-sm font-bold text-white transition-colors hover:bg-teal-800">
          Search
        </button>
      </div>

      {/* Subject chips */}
      <div className="mx-auto mt-6 flex flex-wrap justify-center gap-2">
        {SUBJECT_CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onSubjectClick(chip.label)}
            className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-600 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            {chip.icon} {chip.label}
          </button>
        ))}
      </div>
    </section>
  );
}
