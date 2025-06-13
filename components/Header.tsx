"use client";

import { Soup } from "lucide-react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex top-0 w-full sticky text-slate-700 px-6 sm:px-10 md:px-[74px] h-16 sm:h-20 bg-white z-50 items-center justify-between">
      <Link className="font-bold text-[#f15700] text-3xl" href="/">
        Tinderfood
      </Link>
      <nav className="flex items-center gap-6 sm:gap-5 md:gap-10 lg:gap-16">
        <Link
          href="/cuisines?country=indian"
          className="flex group items-center gap-2"
        >
          <Soup
            size={20}
            className="transition-all group-focus:stroke-orange-600 group-hover:stroke-orange-600"
          />

          <span className="font-medium transition-all hidden sm:inline-block group-focus:text-orange-600 group-hover:text-orange-600">
            Cuisines
          </span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
