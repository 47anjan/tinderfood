"use client";

import { Menu } from "lucide-react";
import UserProfile from "../UserProfile";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-slate-200/80 backdrop-blur-md",
        "bg-white/95 "
      )}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/[0.01] via-transparent to-rose-500/[0.01] pointer-events-none" />

      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              type="button"
              className={cn(
                "p-2 rounded-lg transition-all duration-200 lg:hidden",
                "text-slate-600 hover:text-orange-600 hover:bg-orange-50",
                "focus:outline-none focus:ring-2 focus:ring-orange-300/50"
              )}
            >
              <Menu size={20} />
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-4">
            {/* Welcome message - hidden on mobile */}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-sm font-medium text-slate-700">
                Welcome back
              </span>
              <span className="text-xs text-slate-500">
                Ready to cook something amazing?
              </span>
            </div>

            {/* User profile */}
            <UserProfile className="ring-offset-white/95" />
          </div>
        </div>
      </div>

      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
    </header>
  );
}
