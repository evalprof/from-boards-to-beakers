"use client";

import { useState, useMemo } from "react";
import { GAMES } from "@/data/games";
import Hero from "./Hero";
import FilterBar from "./FilterBar";
import GameCard from "./GameCard";

function ageKey(age: string): string {
  if (age === "5-8") return "5-8";
  if (age === "12+") return "12+";
  return "8-12";
}

export default function GameGrid() {
  const [search, setSearch] = useState("");
  const [age, setAge] = useState("all");
  const [type, setType] = useState("all");
  const [subject, setSubject] = useState("all");

  const filtered = useMemo(() => {
    const s = search.toLowerCase().trim();
    return GAMES.filter((g) => {
      if (age !== "all" && ageKey(g.age) !== age) return false;
      if (type !== "all" && !g.type.includes(type)) return false;
      if (subject !== "all" && g.subj !== subject) return false;
      if (
        s &&
        !g.name.toLowerCase().includes(s) &&
        !g.stem.toLowerCase().includes(s) &&
        !g.desc.toLowerCase().includes(s)
      )
        return false;
      return true;
    });
  }, [search, age, type, subject]);

  function handleSubjectClick(subj: string) {
    setSubject(subj);
  }

  return (
    <>
      <Hero
        searchValue={search}
        onSearchChange={setSearch}
        onSubjectClick={handleSubjectClick}
      />
      <FilterBar
        age={age}
        type={type}
        subject={subject}
        count={filtered.length}
        onAgeChange={setAge}
        onTypeChange={setType}
        onSubjectChange={setSubject}
      />

      <section className="mx-auto max-w-6xl px-6 py-8">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(295px,1fr))] gap-6">
            {filtered.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-xl font-bold text-gray-500">
              No games match your filters
            </p>
            <p className="mt-2 text-gray-300">
              Try adjusting your search or filter selections.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
