import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Filters } from "@/components/Filters";
import { GameGrid } from "@/components/GameGrid";
import { SubmitForm } from "@/components/SubmitForm";
import { Footer } from "@/components/Footer";

export default function Home({
  searchParams,
}: {
  searchParams: { [k: string]: string | string[] | undefined };
}) {
  return (
    <>
      <Nav />
      <Hero />
      <Stats />
      <main className="max-w-[1280px] mx-auto px-8 py-8">
        <div id="library">
          <Filters />
        </div>
        <GameGrid searchParams={searchParams} />
        <SubmitForm />
      </main>
      <Footer />
    </>
  );
}
