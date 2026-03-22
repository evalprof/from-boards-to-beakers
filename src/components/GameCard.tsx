"use client";

import Image from "next/image";
import Link from "next/link";
import { Game } from "@/data/types";
import { useState } from "react";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-600/10">
      {/* Image area */}
      <div
        className="relative h-[190px] overflow-hidden"
        style={{ backgroundColor: game.ibg }}
      >
        {!imgError ? (
          <Image
            src={game.photo}
            alt={game.name}
            fill
            className="object-contain transition-transform group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 295px"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-6xl"
            style={{ backgroundColor: game.ibg }}
          >
            {game.icon}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-lg font-extrabold text-gray-800">
          {game.name}
        </h3>
        <p
          className="mt-0.5 text-xs font-bold"
          style={{ color: game.tc }}
        >
          {game.stem}
        </p>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
          {game.desc}
        </p>

        {/* Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-bold"
            style={{ backgroundColor: game.tbg, color: game.tc }}
          >
            {game.type}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-600">
            Ages {game.age}
          </span>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-bold text-gray-600">
            {game.subj}
          </span>
        </div>

        {/* Meta */}
        <div className="mt-3 flex gap-4 text-xs text-gray-500">
          <span>{"⏱"} {game.time}</span>
          <span>{"👥"} {game.players}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-2 border-t border-gray-100 p-4">
        <Link
          href={`/games/${game.id}`}
          className="flex flex-1 items-center justify-center rounded-lg bg-teal-600 px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-teal-800"
        >
          View Activity Sheet
        </Link>
        <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-100">
          {"⬇"} PDF
        </button>
      </div>
    </div>
  );
}
