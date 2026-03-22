"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Game } from "@/data/types";
import DetailTabs from "./DetailTabs";

const CONCEPT_COLORS = [
  { bg: "#E1F5EE", c: "#085041" },
  { bg: "#EEEDFE", c: "#3C3489" },
  { bg: "#FAEEDA", c: "#412402" },
  { bg: "#E6F1FB", c: "#0C447C" },
  { bg: "#EAF3DE", c: "#27500A" },
  { bg: "#FAECE7", c: "#712B13" },
  { bg: "#FBEAF0", c: "#72243E" },
];

function OverviewPanel({ game }: { game: Game }) {
  return (
    <div className="space-y-8">
      {/* STEM Connection */}
      <div>
        <h3 className="font-display text-lg font-extrabold text-gray-800">
          STEM Connection
        </h3>
        <p className="mt-2 leading-relaxed text-gray-600">{game.detail}</p>
      </div>

      {/* Key Concepts */}
      <div>
        <h3 className="font-display text-lg font-extrabold text-gray-800">
          Key Science Concepts
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {game.concepts.map((concept, i) => {
            const color = CONCEPT_COLORS[i % CONCEPT_COLORS.length];
            return (
              <span
                key={concept}
                className="rounded-full px-3 py-1 text-sm font-bold"
                style={{ backgroundColor: color.bg, color: color.c }}
              >
                {concept}
              </span>
            );
          })}
        </div>
      </div>

      {/* STEM Careers */}
      <div>
        <h3 className="font-display text-lg font-extrabold text-gray-800">
          STEM Careers
        </h3>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {game.roles.map((role) => (
            <div
              key={role.n}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <p className="font-display font-extrabold text-gray-800">
                {role.n}
              </p>
              <p className="mt-1 text-sm text-gray-600">{role.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FactsPanel({ game }: { game: Game }) {
  return (
    <div className="space-y-8">
      {/* Did You Know? */}
      <div>
        <h3 className="font-display text-lg font-extrabold text-gray-800">
          {"🧠"} Did You Know?
        </h3>
        <div className="mt-3 space-y-3">
          {game.facts.map((fact, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-2 block h-2 w-2 flex-shrink-0 rounded-full bg-teal-600" />
              <p className="text-gray-600">{fact}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Science Tools */}
      <div>
        <h3 className="font-display text-lg font-extrabold text-gray-800">
          {"🔧"} Science Tools & Techniques
        </h3>
        <div className="mt-3 space-y-3">
          {game.tools.map((tool, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-2 block h-2 w-2 flex-shrink-0 rounded-full bg-amber-600" />
              <p className="text-gray-600">{tool}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ExperimentsPanel({ game }: { game: Game }) {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-lg font-extrabold text-gray-800">
        {"🔬"} At-Home Lab Activities
      </h3>
      {game.exps.map((exp, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border border-gray-200"
        >
          {/* Experiment header */}
          <div className="flex items-center gap-3 bg-amber-50 px-5 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-600 text-sm font-bold text-white">
              {i + 1}
            </span>
            <h4 className="font-display text-base font-extrabold text-amber-900">
              {exp.t}
            </h4>
          </div>

          {/* Steps */}
          <div className="space-y-2 px-5 py-4">
            {exp.s.map((step, si) => (
              <div key={si} className="flex items-start gap-2">
                <span className="text-sm font-bold text-gray-400">
                  Step {si + 1}.
                </span>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>

          {/* Why it works */}
          <div className="mx-5 mb-5 rounded-lg bg-teal-50 p-4">
            <p className="text-sm text-teal-800">
              <strong>{"🔬"} Why it works:</strong> {exp.w}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function BooksPanel({ game }: { game: Game }) {
  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg font-extrabold text-gray-800">
        {"📚"} Recommended Reading
      </h3>
      {game.books.map((book, i) => (
        <div key={i} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4">
          <div className="w-1 flex-shrink-0 rounded-full bg-amber-600" />
          <div>
            <p className="font-display font-extrabold text-gray-800">
              {book.t}
            </p>
            <p className="text-sm text-gray-500">{book.a}</p>
            <p className="mt-1 text-sm text-gray-600">{book.d}</p>
            <span className="mt-2 inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-600">
              {book.ag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GameDetail({ game }: { game: Game }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="mx-auto max-w-3xl pb-12">
      {/* Back link */}
      <div className="px-6 py-4">
        <Link
          href="/"
          className="text-sm font-bold text-teal-600 hover:text-teal-800"
        >
          {"←"} Back to Game Library
        </Link>
      </div>

      {/* Header image */}
      <div
        className="relative h-[240px] overflow-hidden rounded-t-2xl mx-6 sm:h-[300px]"
        style={{ backgroundColor: game.ibg }}
      >
        {!imgError ? (
          <Image
            src={game.photo}
            alt={game.name}
            fill
            className="object-contain"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 720px"
            priority
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-8xl"
            style={{ backgroundColor: game.ibg }}
          >
            {game.icon}
          </div>
        )}
      </div>

      {/* Title block */}
      <div className="mx-6 rounded-b-2xl border border-t-0 border-gray-200 bg-white px-6 pb-6 pt-5">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-bold"
          style={{ backgroundColor: game.tbg, color: game.tc }}
        >
          STEM Activity Sheet
        </span>
        <h1 className="mt-2 font-display text-3xl font-black text-gray-800">
          {game.name}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {game.stem} · {game.type} · Ages {game.age} · {game.time} ·{" "}
          {game.players} players
        </p>
      </div>

      {/* Tabbed content */}
      <div className="mx-6 mt-6 rounded-2xl border border-gray-200 bg-white">
        <DetailTabs>
          {{
            overview: <OverviewPanel game={game} />,
            facts: <FactsPanel game={game} />,
            experiments: <ExperimentsPanel game={game} />,
            books: <BooksPanel game={game} />,
          }}
        </DetailTabs>
      </div>

      {/* External links */}
      <div className="mx-6 mt-6 flex gap-3">
        <a
          href={`https://boardgamegeek.com/boardgame/${game.bgg}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100"
        >
          BoardGameGeek {"↗"}
        </a>
        <a
          href={`https://en.wikipedia.org/wiki/${game.wiki}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100"
        >
          Wikipedia {"↗"}
        </a>
      </div>
    </div>
  );
}
