import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex h-[84px] items-center justify-between border-b-[1.5px] border-gray-200 bg-white/95 px-6 backdrop-blur-sm">
      <a href="/" className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="From Boards to Beakers logo"
          width={38}
          height={38}
          className="rounded-lg"
        />
        <span className="font-display text-lg font-black leading-tight">
          <span className="text-teal-600">From Boards</span>{" "}
          <span className="text-amber-300">to Beakers</span>
        </span>
      </a>

      <ul className="flex items-center gap-4">
        <li>
          <a
            href="#submit"
            className="rounded-[20px] bg-teal-600 px-5 py-2 font-display text-sm font-bold text-white transition-colors hover:bg-teal-800"
          >
            Submit a Game
          </a>
        </li>
      </ul>
    </nav>
  );
}
