import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGameBySlug, getAllSlugs } from "@/lib/games";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tabs } from "@/components/game-detail/Tabs";
import { PdfButton } from "@/components/PdfButton";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const game = getGameBySlug(params.slug);
  if (!game) return { title: "Game not found — From Boards to Beakers" };
  return {
    title: `${game.name} — From Boards to Beakers`,
    description: game.desc,
  };
}

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = getGameBySlug(params.slug);
  if (!game) notFound();

  return (
    <>
      <Nav />
      <main className="max-w-[820px] mx-auto px-4 py-6">
        <Link
          href="/"
          className="inline-block text-teal font-display font-bold text-sm mb-3 no-underline hover:underline"
        >
          ← Back to library
        </Link>
        <div className="bg-white rounded-[20px] overflow-hidden border border-ink-100">
          <div className="flex gap-4 items-start p-6 border-b border-ink-100">
            <div className="w-[80px] h-[80px] rounded-xl bg-[#F5F7F5] p-1 flex-shrink-0">
              <Image
                src={`/games/${game.slug}.webp`}
                alt={game.name}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="inline-block font-display font-extrabold text-[0.7rem] px-2.5 py-0.5 rounded-[14px] mb-1.5 uppercase tracking-[0.06em]"
                style={{ background: game.tbg, color: game.tc }}
              >
                STEM Activity Sheet
              </span>
              <div className="font-display font-black text-2xl text-ink-900 leading-tight mb-1">
                {game.name}
              </div>
              <div className="text-[0.82rem] text-ink-400 font-bold">
                {game.stem} • {game.type} • Ages {game.age} • {game.time} •{" "}
                {game.players} players
              </div>
            </div>
          </div>
          <Tabs game={game} />
          <div className="border-t border-ink-100 p-4 flex gap-3 bg-white sticky bottom-0">
            <PdfButton game={game} />
            <Link
              href="/"
              className="bg-ink-50 text-ink-600 px-5 py-2.5 rounded-[10px] font-display font-bold text-[0.88rem] no-underline hover:bg-ink-100"
            >
              Close
            </Link>
          </div>
        </div>
        {(game.bgg || game.wiki) && (
          <div className="mt-4 text-center text-[0.85rem] text-ink-400">
            Learn more:{" "}
            {game.bgg && (
              <a
                href={`https://boardgamegeek.com/boardgame/${game.bgg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal font-bold hover:underline"
              >
                BoardGameGeek
              </a>
            )}
            {game.bgg && game.wiki && " • "}
            {game.wiki && (
              <a
                href={`https://en.wikipedia.org/wiki/${game.wiki}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal font-bold hover:underline"
              >
                Wikipedia
              </a>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
