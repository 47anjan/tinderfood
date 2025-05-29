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

import { cn } from "@/lib/utils";

import Link from "next/link";
import { useAuth } from "@/contexts/auth-provider";

interface UserProfileProps {
  className?: string;
}

function UserProfile({ className }: UserProfileProps) {
  const { user, loading, logout } = useAuth();

  return loading ? (
    <div className="h-10 w-10 animate-pulse rounded-full bg-orange-200" />
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            "border border-orange-200 bg-white transition-all duration-200",
            "hover:border-orange-300 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1",
            className
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.avatar} alt="User avatar" />
            <AvatarFallback className="bg-orange-200 text-orange-700 text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-white border border-gray-200 shadow-lg rounded-lg p-1"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-3 py-2 text-sm font-medium text-gray-900">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-100 my-1" />

        <DropdownMenuItem
          className="px-3 py-2 rounded-md transition-colors duration-150"
          asChild
        >
          <Link
            className="flex items-center text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 cursor-pointer"
            href="/dashboard/profile"
          >
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="px-3 py-2 rounded-md transition-colors duration-150"
          asChild
        >
          <Link
            className="flex items-center text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 cursor-pointer"
            href="/dashboard/cooking-preference"
          >
            Cooking Preferences
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-100 my-1" />

        <DropdownMenuItem
          className="px-3 py-2 rounded-md transition-colors duration-150"
          asChild
        >
          <button
            onClick={logout}
            className="w-full text-left text-sm text-gray-700 hover:text-orange-600 hover:bg-orange-50 cursor-pointer"
          >
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserProfile;
