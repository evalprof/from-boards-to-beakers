import { notFound } from "next/navigation";
import { Metadata } from "next";
import { GAMES } from "@/data/games";
import Navbar from "@/components/Navbar";
import GameDetail from "@/components/GameDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return GAMES.map((game) => ({ id: String(game.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const game = GAMES.find((g) => String(g.id) === id);
  if (!game) return { title: "Game Not Found" };

  return {
    title: `${game.name} — From Boards to Beakers`,
    description: game.desc,
  };
}

export default async function GamePage({ params }: PageProps) {
  const { id } = await params;
  const game = GAMES.find((g) => String(g.id) === id);

  if (!game) notFound();

  return (
    <>
      <Navbar />
      <GameDetail game={game} />
    </>
  );
}
