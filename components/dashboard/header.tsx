"use client";

import { Menu } from "lucide-react";
import UserProfile from "../UserProfile";

export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-600 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="ml-4 lg:ml-0">
              <h1 className="font-fredoka text-xl font-semibold text-gray-900">
                TinderFood
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
}
