"use client";

import { cn } from "@/lib/utils";
import { X, User, Settings, ChefHat, Users, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar() {
  const navigation = [
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: User,
      description: "Manage your account",
    },
    {
      name: "Cooking Preference",
      href: "/dashboard/cooking-preference",
      icon: Settings,
      description: "Set your preferences",
    },
    {
      name: "Connections",
      href: "/dashboard/connections",
      icon: Users,
      description: "Manage your connections",
    },
    {
      name: "Saved Recipes",
      href: "/dashboard/save-recipes",
      icon: Heart,
      description: "Manage your recipes",
    },
  ];

  const pathname = usePathname();

  const isActiveLink = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 transform transition-all duration-300 ease-in-out lg:hidden",
          "bg-white/95 backdrop-blur-md border-r border-slate-200/80 shadow-xl",
          true ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-200/80">
          <Link href={"/"} className="flex items-center gap-3 ml-0 lg:ml-0">
            <div className="p-2 rounded-xl bg-gradient-to-br from-orange-100 to-rose-100 ">
              <ChefHat size={18} className="text-orange-600" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent leading-tight">
                TinderFood
              </h1>
              <span className="text-xs text-slate-500 leading-tight hidden sm:block">
                Dashboard
              </span>
            </div>
          </Link>

          <button
            type="button"
            className={cn(
              "p-2 rounded-lg ",
              "text-slate-500 hover:text-slate-700 hover:bg-slate-100",
              "focus:outline-none focus:ring-2 focus:ring-orange-300/50"
            )}
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mobile navigation */}
        <nav className="mt-6 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = isActiveLink(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-4 rounded-xl px-3 py-3 ",
                  isActive
                    ? "bg-gradient-to-r from-orange-50 to-rose-50 text-orange-600 shadow-sm border border-orange-200/50"
                    : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                )}
              >
                <div
                  className={cn(
                    "p-2 rounded-lg ",
                    isActive
                      ? "bg-gradient-to-br from-orange-100 to-rose-100 shadow-sm"
                      : "bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-rose-100"
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      "transition-colors duration-200",
                      isActive
                        ? "text-orange-600"
                        : "text-slate-600 group-hover:text-orange-600"
                    )}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{item.name}</span>
                  <span className="text-xs text-slate-500 group-hover:text-slate-600">
                    {item.description}
                  </span>
                </div>
                {isActive && (
                  <div className="absolute right-3 w-1 h-6 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex w-72 flex-col">
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col",
              "bg-white/80 backdrop-blur-md border-r border-slate-200/80"
            )}
          >
            <div className="flex flex-1 flex-col overflow-y-auto">
              {/* Desktop header */}
              <div
                className={cn(
                  "flex h-[65px] flex-shrink-0 items-center px-6",
                  "border-b border-slate-200/80 bg-gradient-to-r from-orange-500/[0.02] to-rose-500/[0.02]"
                )}
              >
                <Link
                  href={"/"}
                  className="flex items-center gap-3 ml-0 lg:ml-0"
                >
                  <div className="p-2 rounded-xl bg-gradient-to-br from-orange-100 to-rose-100 shadow-sm">
                    <ChefHat size={18} className="text-orange-600" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent leading-tight">
                      TinderFood
                    </h1>
                    <span className="text-xs text-slate-500 leading-tight hidden sm:block">
                      Dashboard
                    </span>
                  </div>
                </Link>
              </div>

              {/* Desktop navigation */}
              <nav className="flex-1 px-4 py-4 space-y-2">
                <div className="mb-6">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3">
                    Dashboard
                  </h3>
                </div>
                {navigation.map((item) => {
                  const isActive = isActiveLink(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group relative flex items-center gap-4 rounded-xl px-3 py-3 ",
                        isActive
                          ? "bg-gradient-to-r from-orange-50 to-rose-50 text-orange-600 shadow-sm border border-orange-200/50"
                          : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
                      )}
                    >
                      <div
                        className={cn(
                          "p-2.5 rounded-lg ",
                          isActive
                            ? "bg-gradient-to-br from-orange-100 to-rose-100 shadow-sm"
                            : "bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-rose-100"
                        )}
                      >
                        <Icon
                          size={18}
                          className={cn(
                            "transition-colors duration-200",
                            isActive
                              ? "text-orange-600"
                              : "text-slate-600 group-hover:text-orange-600"
                          )}
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm leading-tight">
                          {item.name}
                        </span>
                        <span className="text-xs text-slate-500 group-hover:text-slate-600 leading-tight">
                          {item.description}
                        </span>
                      </div>
                      {isActive && (
                        <div className="absolute right-3 w-1 h-8 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </nav>

              {/* Bottom section */}
              <div className="p-4 border-t border-slate-200/80 bg-gradient-to-r from-slate-50/50 to-transparent">
                <div className="text-xs text-slate-500 text-center">
                  Made with ❤️ for food lovers
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
