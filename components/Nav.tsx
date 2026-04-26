import Link from "next/link";
import Image from "next/image";

export function Nav() {
  return (
    <nav className="bg-white border-b border-ink-100 px-8 flex items-center justify-between h-[84px] sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-3 no-underline">
        <Image
          src="/logo.png"
          alt="From Boards to Beakers"
          width={48}
          height={48}
          priority
        />
        <span className="font-display font-extrabold text-[2.25rem] leading-none tracking-tight whitespace-nowrap hidden sm:inline">
          <span className="text-teal">From Boards </span>
          <span className="text-amber-mid">to Beakers</span>
        </span>
      </Link>
      <ul className="flex gap-6 items-center list-none">
        <li>
          <Link
            href="/#submit"
            className="font-display font-bold text-sm text-white bg-teal px-[18px] py-2 rounded-[20px] hover:bg-teal-dark transition-colors"
          >
            Submit a Game
          </Link>
        </li>
      </ul>
    </nav>
  );
}
