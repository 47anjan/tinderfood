"use client";

import { useAuth } from "@/contexts/auth-provider";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Link from "next/link";
import UserProfile from "../UserProfile";

const HeaderAuth = () => {
  const { user, loading } = useAuth();

  return (
    <>
      {loading ? (
        <div className="size-11 bg-gradient-to-r from-orange-50 to-rose-50 border border-slate-200/80 rounded-full animate-pulse"></div>
      ) : (
        <>
          {!user ? (
            <Link
              href="/login"
              className={cn(
                "group relative h-11 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",

                "bg-slate-50  hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 border border-slate-200/80",
                "focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-gradient-to-r focus:from-orange-50 focus:to-rose-50",
                "hover:border-orange-200/60 "
              )}
            >
              <User
                size={16}
                className="text-slate-600 transition-colors duration-300 group-hover:text-orange-600"
              />
              <span className="text-sm hidden  font-medium text-slate-700 transition-colors duration-300 group-hover:text-orange-600  sm:inline-block">
                Login
              </span>
            </Link>
          ) : (
            <UserProfile />
          )}
        </>
      )}
    </>
  );
};
export default HeaderAuth;
