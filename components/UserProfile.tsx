"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut, Users, Heart } from "lucide-react";

import { cn } from "@/lib/utils";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-provider";

interface UserProfileProps {
  className?: string;
}

function UserProfile({ className }: UserProfileProps) {
  const { user, loading, logout } = useAuth();

  return loading ? (
    <div className="h-11 w-11 animate-pulse rounded-full bg-gradient-to-br from-orange-100 to-rose-100" />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "group relative cursor-pointer flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300",
            "bg-white/80 backdrop-blur-sm border border-slate-200/60",
            "hover:bg-gradient-to-br hover:from-orange-50 hover:to-rose-50 hover:border-orange-200/80 hover:shadow-md",
            "focus:outline-none focus:ring-2 focus:ring-orange-300/50 focus:ring-offset-2 focus:ring-offset-white",
            "active:scale-95",
            className
          )}
        >
          <Avatar className="h-9 w-9 transition-transform duration-300 group-hover:scale-105">
            <AvatarImage src={user?.avatar} alt="User avatar" />
            <AvatarFallback className="bg-gradient-to-br from-orange-200 to-rose-200 text-orange-700 text-sm font-semibold border-0">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className={cn(
          "w-64 bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xl rounded-xl p-2",
          "animate-in slide-in-from-top-2 duration-200"
        )}
        align="end"
        sideOffset={12}
      >
        <DropdownMenuLabel className="px-4 py-3 text-sm">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt="User avatar" />
              <AvatarFallback className="bg-gradient-to-br from-orange-200 to-rose-200 text-orange-700 text-xs font-semibold">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 leading-tight">
                {user?.name || "User"}
              </span>
              <span className="text-xs text-slate-500 leading-tight">
                {user?.email || "user@example.com"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2" />

        <DropdownMenuItem
          className={cn(
            "group mx-1 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
            "hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 focus:bg-gradient-to-r focus:from-orange-50 focus:to-rose-50"
          )}
          asChild
        >
          <Link
            className="flex items-center gap-3 text-sm text-slate-700 hover:text-orange-600 focus:text-orange-600"
            href="/dashboard/profile"
          >
            <div className="flex items-center justify-center w-5 h-5">
              <User
                size={16}
                className="transition-colors duration-200 group-hover:text-orange-600"
              />
            </div>
            <span className="font-medium">Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            "group mx-1 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
            "hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 focus:bg-gradient-to-r focus:from-orange-50 focus:to-rose-50"
          )}
          asChild
        >
          <Link
            className="flex items-center gap-3 text-sm text-slate-700 hover:text-orange-600 focus:text-orange-600"
            href="/dashboard/cooking-preference"
          >
            <div className="flex items-center justify-center w-5 h-5">
              <Settings
                size={16}
                className="transition-colors duration-200 group-hover:text-orange-600"
              />
            </div>
            <span className="font-medium">Cooking Preferences</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn(
            "group mx-1 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
            "hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 focus:bg-gradient-to-r focus:from-orange-50 focus:to-rose-50"
          )}
          asChild
        >
          <Link
            className="flex items-center gap-3 text-sm text-slate-700 hover:text-orange-600 focus:text-orange-600"
            href="/dashboard/connections"
          >
            <div className="flex items-center justify-center w-5 h-5">
              <Users
                size={16}
                className="transition-colors duration-200 group-hover:text-orange-600"
              />
            </div>
            <span className="font-medium">Connections</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(
            "group mx-1 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
            "hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 focus:bg-gradient-to-r focus:from-orange-50 focus:to-rose-50"
          )}
          asChild
        >
          <Link
            className="flex items-center gap-3 text-sm text-slate-700 hover:text-orange-600 focus:text-orange-600"
            href="/dashboard/save-recipes"
          >
            <div className="flex items-center justify-center w-5 h-5">
              <Heart
                size={16}
                className="transition-colors duration-200 group-hover:text-orange-600"
              />
            </div>
            <span className="font-medium">Saved Recipes</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gradient-to-r from-transparent via-slate-200 to-transparent my-2" />

        <DropdownMenuItem
          className={cn(
            "group mx-1 px-3 py-2.5 rounded-lg transition-all duration-200 cursor-pointer",
            "hover:bg-red-50 focus:bg-red-50"
          )}
          asChild
        >
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 text-left text-sm text-slate-700 hover:text-red-600 focus:text-red-600"
          >
            <div className="flex items-center justify-center w-5 h-5">
              <LogOut
                size={16}
                className="transition-colors duration-200 group-hover:text-red-600"
              />
            </div>
            <span className="font-medium">Sign Out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
