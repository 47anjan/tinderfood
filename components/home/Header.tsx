import { Soup, Users } from "lucide-react";
import Link from "next/link";
import { SearchBar } from "../core/search-bar";
import { cn } from "@/lib/utils";
import HeaderAuth from "./HeaderAuth";
import NotificationBell from "../notifications/NotificationBell";

const Header = () => {
  return (
    <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-100/80 ">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.02] via-transparent to-rose-500/[0.02] pointer-events-none"></div>

      <div className="relative flex items-center justify-between h-16 sm:h-20 px-6 sm:px-10 md:px-[74px] text-slate-700">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            className="group relative font-bold text-2xl sm:text-3xl transition-all duration-300 "
            href="/"
          >
            <span className="bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
              Tinderfood
            </span>

            {/* Animated underline */}
            <div className="absolute will-change-transform -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-orange-500 to-rose-500 transition-all duration-300 group-hover:w-full rounded-full"></div>
          </Link>

          {/* Navigation */}
          <nav className="flex space-x-4 items-center">
            <Link
              href="/cuisines?country=indian"
              className={cn(
                "group relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 will-change-transform",
                "hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50  ",
                "focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-gradient-to-r focus:from-orange-50 focus:to-rose-50"
              )}
            >
              {/* Icon container */}
              <div className="relative p-1.5 rounded-lg bg-gradient-to-r from-orange-100 to-rose-100 group-hover:from-orange-200 group-hover:to-rose-200 transition-all will-change-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Soup
                  size={18}
                  className="text-orange-600 transition-all duration-300 group-hover:text-orange-700 group-focus:text-orange-700"
                />

                {/* Icon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>

              {/* Text */}
              <span className="font-medium transition-all duration-300 hidden sm:inline-block group-hover:text-orange-600 group-focus:text-orange-600 group-hover:font-semibold">
                Cuisines
              </span>
            </Link>

            <Link
              href="/foodies"
              className={cn(
                "group relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 will-change-transform",
                "hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50  ",
                "focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-gradient-to-r focus:from-orange-50 focus:to-rose-50"
              )}
            >
              {/* Icon container */}
              <div className="relative p-1.5 rounded-lg bg-gradient-to-r from-orange-100 to-rose-100 group-hover:from-orange-200 group-hover:to-rose-200 transition-all will-change-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Users
                  size={18}
                  className="text-orange-600 transition-all duration-300 group-hover:text-orange-700 group-focus:text-orange-700"
                />

                {/* Icon glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>

              {/* Text */}
              <span className="font-medium transition-all duration-300 hidden sm:inline-block group-hover:text-orange-600 group-focus:text-orange-600 group-hover:font-semibold">
                Foodies
              </span>
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar Container */}
          <div className="relative">
            {/* Subtle glow around search */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/5 to-rose-500/5 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

            <div className="relative">
              <SearchBar />
            </div>
          </div>

          {/* Login Button */}
          <HeaderAuth />
          <NotificationBell />
        </div>
      </div>

      {/* Bottom border gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
    </header>
  );
};

export default Header;
