import Link from "next/link";
import Image from "next/image";
import type { Game } from "@/lib/types";

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      href={`/games/${game.slug}`}
      className="bg-white rounded-2xl border border-ink-100 cursor-pointer transition-all flex flex-col overflow-hidden no-underline text-inherit hover:border-teal-mid hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,110,86,0.12)]"
    >
      <div className="w-full h-[190px] bg-[#F5F7F5] rounded-t-xl p-2 flex items-center justify-center">
        <Image
          src={`/games/${game.slug}.webp`}
          alt={game.name}
          width={295}
          height={190}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="px-[1.1rem] pt-4 pb-2 flex-1">
        <div className="font-display font-black text-base text-ink-900 mb-0.5">
          {game.name}
        </div>
        <div className="text-[0.75rem] text-ink-400 font-bold mb-2">
          {game.stem}
        </div>
        <p className="text-[0.83rem] text-ink-600 leading-relaxed mb-3">
          {game.desc}
        </p>
        <div className="flex gap-1.5 flex-wrap mb-2.5">
          <span
            className="px-2.5 py-[3px] rounded-[14px] font-display font-bold text-[0.7rem]"
            style={{ background: game.tbg, color: game.tc }}
          >
            {game.type}
          </span>
          <span className="px-2.5 py-[3px] rounded-[14px] font-display font-bold text-[0.7rem] bg-ink-50 text-ink-600">
            Ages {game.age}
          </span>
          <span className="px-2.5 py-[3px] rounded-[14px] font-display font-bold text-[0.7rem] bg-ink-50 text-ink-600">
            {game.subj}
          </span>
        </div>
        <div className="flex gap-4 text-[0.75rem] text-ink-400 font-bold">
          <span>⏱ {game.time}</span>
          <span>👥 {game.players}</span>
        </div>
      </div>
      <div className="border-t border-ink-100 px-[1.1rem] py-3.5 flex gap-2">
        <span className="bg-teal text-white px-3.5 py-2 rounded-lg font-display font-extrabold text-[0.78rem] flex-1 text-center">
          View Activity Sheet
        </span>
      </div>
    </Link>
  );
}
