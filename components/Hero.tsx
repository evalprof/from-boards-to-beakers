"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const SUBJECT_CHIPS = [
  { label: "🦠 Biology", value: "Biology" },
  { label: "🚀 Space", value: "Space" },
  { label: "🏛 Engineering", value: "Engineering" },
  { label: "🗺 Geography", value: "Geography" },
  { label: "🔍 Forensics", value: "Forensics" },
];

export function Hero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") ?? "");

  function applySearch(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search.trim()) {
      params.set("q", search.trim());
    } else {
      params.delete("q");
    }
    router.replace(`/?${params.toString()}#library`, { scroll: false });
    document
      .getElementById("library")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  function applySubject(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("subject", value);
    router.replace(`/?${params.toString()}#library`, { scroll: false });
    document
      .getElementById("library")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="bg-teal py-[4.5rem] px-8 text-center relative overflow-hidden">
      <div className="hero-dots absolute inset-0" />
      <h1 className="font-display font-black text-white leading-tight mb-3 relative text-[clamp(2rem,5vw,3.3rem)]">
        The Science Behind
        <br />
        <em className="not-italic text-amber-mid">Your Favorite Games</em>
      </h1>
      <p className="text-base text-teal-light max-w-[540px] mx-auto mb-8 leading-relaxed relative">
        Free STEM activity sheets and hands-on experiments connected to the
        board games kids already love — for classrooms, game nights, and
        curious minds.
      </p>
      <form
        onSubmit={applySearch}
        role="search"
        className="flex max-w-[480px] mx-auto bg-white rounded-[50px] py-[5px] pr-[5px] pl-5 relative"
      >
        <label htmlFor="hero-search" className="sr-only">
          Search games or STEM topics
        </label>
        <input
          id="hero-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search games or STEM topics…"
          className="border-none outline-none flex-1 font-display text-[0.95rem] text-ink-900 bg-transparent"
        />
        <button
          type="submit"
          className="bg-amber text-white border-none px-[22px] py-[9px] rounded-[40px] font-display font-extrabold text-[0.88rem] cursor-pointer hover:bg-amber-dark"
        >
          Search
        </button>
      </form>
      <div className="relative flex gap-2 justify-center flex-wrap mt-6">
        {SUBJECT_CHIPS.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => applySubject(c.value)}
            className="bg-white/15 border border-white/30 text-white px-[13px] py-[5px] rounded-[20px] font-display font-bold text-[0.76rem] cursor-pointer hover:bg-white/25 transition-colors"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
