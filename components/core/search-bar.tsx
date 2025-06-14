"use client";

import { useState, useEffect } from "react";
import { Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import useSearchRecipeSuggestions from "@/hooks/useSearchRecipeSuggestions";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import Link from "next/link";

export const popularFoodSearches = [
  "tomato",
  "pasta",
  "burger",
  "tacos",
  "fried chicken",
  "chicken curry",
  "beef stew",
  "fried rice",
];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const data = useSearchRecipeSuggestions(searchQuery);
  const router = useRouter();

  const resetActiveIndex = () => setActiveIndex(-1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyUp = (event: any) => {
    if (data.state === "success") {
      const keyCode = event.keyCode;
      if (searchQuery === "") {
        resetActiveIndex();
        return;
      }

      if (keyCode === 13) {
        if (activeIndex !== -1) {
          router.push(`search/recipes?query=${data.data[activeIndex].title}`);
          resetActiveIndex();
        } else {
          router.push(`search/recipes?query=${searchQuery}`);
        }
      }

      if (data.data.length === 0) return;

      if (keyCode === 40) {
        //user down

        if (activeIndex === -1 || activeIndex === data.data?.length - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex((prev) => prev + 1);
        }
      } else if (keyCode === 38) {
        // user up
        if (activeIndex === -1 || activeIndex === 0) {
          setActiveIndex(data.data?.length - 1);
        } else {
          setActiveIndex((prev) => prev - 1);
        }
      }
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="relative  flex w-full max-w-md items-center">
        <Button
          variant="outline"
          className="relative h-11 w-full justify-start rounded-xl border-slate-200 bg-white px-4 text-sm text-slate-500 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md focus:border-orange-400 focus:ring-2 focus:ring-orange-100 md:pr-14"
          onClick={() => setOpen(true)}
        >
          <Search className="mr-3 h-4 w-4 text-slate-400" />
          <span className="hidden md:block font-medium">Search recipes...</span>
          <kbd className="pointer-events-none absolute right-2 top-2 hidden h-7 select-none items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2 font-mono text-xs font-medium text-slate-400 md:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      <CommandDialog
        className="border-slate-200  shadow-2xl backdrop-blur-sm"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="border-b border-slate-100 bg-white/95 backdrop-blur-sm">
          <CommandInput
            placeholder="Search for recipes, ingredients, or cuisines..."
            value={searchQuery}
            onValueChange={(e) => {
              setSearchQuery(e);
              resetActiveIndex();
            }}
            onKeyUp={handleKeyUp}
            className="h-16 text-base border-0 focus:ring-0 px-6 placeholder:text-slate-400"
          />
        </div>

        <CommandList className="bg-white/95 backdrop-blur-sm max-h-96 p-2">
          {data.state === "initial" || !searchQuery ? (
            <div className="flex flex-col justify-center  ">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 text-sm mb-2 text-slate-600 w-fit">
                <TrendingUp className="h-3 w-3" />
                Popular searches
              </div>
              {popularFoodSearches.map((item, index) => (
                <Link
                  href={`search/recipes?query=${item}`}
                  className={cn(
                    "flex group items-center gap-3 px-2 py-2 mx-1 rounded-lg transition-all duration-200  relative overflow-hidden cursor-pointer",
                    "text-slate-700 hover:bg-gradient-to-r hover:from-orange-500 hover:to-rose-500 hover:shadow-md hover:scale-[1.01] hover:translate-x-1 hover:text-white hover:border-orange-200 "
                  )}
                  key={item}
                  onClick={() => setOpen(false)}
                >
                  <div
                    className={cn(
                      "flex-shrink-0 p-1 rounded-md transition-all duration-200 group-hover:scale-110",
                      index === activeIndex
                        ? "bg-white/20"
                        : "bg-orange-50 group-hover:bg-orange-200 group-hover:shadow-sm"
                    )}
                  >
                    <Search
                      className={cn(
                        "h-4 w-4 transition-all duration-200 group-hover:rotate-12",
                        index === activeIndex
                          ? "text-white"
                          : "text-orange-500 group-hover:text-orange-600"
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "flex-1 font-medium text-sm line-clamp-1 transition-all duration-200",

                      "text-slate-700 group-hover:text-slate-900 group-hover:font-semibold"
                    )}
                  >
                    {item}
                  </span>
                </Link>
              ))}
            </div>
          ) : null}

          {data.state === "loading" ? (
            <div className="p-6">
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3">
                    <div className="h-4 w-4 bg-slate-200 rounded animate-pulse"></div>
                    <div
                      className={`h-4 bg-slate-200 rounded animate-pulse ${
                        i === 0
                          ? "w-48"
                          : i === 1
                          ? "w-36"
                          : i === 2
                          ? "w-52"
                          : i === 3
                          ? "w-40"
                          : "w-44"
                      }`}
                    ></div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {data.state === "error" ? (
            <div className="p-6 text-center">
              <div className="text-slate-500 text-sm">
                <p className="font-medium mb-1">Something went wrong</p>
                <p className="text-xs">{data.error.message}</p>
              </div>
            </div>
          ) : null}

          {data.state === "success" && searchQuery ? (
            <div className="space-y-1">
              {data?.data?.length > 0 ? (
                <>
                  <div className="px-3 py-2">
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Recipe Suggestions
                    </p>
                  </div>
                  {data.data.map((item, index) => (
                    <Link
                      href={`search/recipes?query=${item.title}`}
                      className={cn(
                        "flex items-center gap-3 px-2 py-2 mx-1 rounded-lg transition-all duration-200 group relative overflow-hidden cursor-pointer",
                        index === activeIndex
                          ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-lg transform scale-[1.02] translate-x-1"
                          : "text-slate-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 hover:shadow-md hover:scale-[1.01] hover:translate-x-1 hover:border-orange-200"
                      )}
                      key={item.id}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(-1)}
                    >
                      <div
                        className={cn(
                          "flex-shrink-0 p-1 rounded-md transition-all duration-200 group-hover:scale-110",
                          index === activeIndex
                            ? "bg-white/20"
                            : "bg-orange-50 group-hover:bg-orange-100 group-hover:shadow-sm"
                        )}
                      >
                        <Search
                          className={cn(
                            "h-4 w-4 transition-all duration-200 group-hover:rotate-12",
                            index === activeIndex
                              ? "text-white"
                              : "text-orange-500 group-hover:text-orange-600"
                          )}
                        />
                      </div>
                      <span
                        className={cn(
                          "flex-1 font-medium text-sm line-clamp-1 transition-all duration-200",
                          index === activeIndex
                            ? "text-white"
                            : "text-slate-700 group-hover:text-slate-900 group-hover:font-semibold"
                        )}
                      >
                        {item.title}
                      </span>

                      {/* Hover glow effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-rose-500/5 rounded-lg"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/10 to-transparent rounded-lg animate-pulse"></div>
                      </div>

                      {/* Active state overlay */}
                      {index === activeIndex && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-rose-400/20 rounded-lg pointer-events-none"></div>
                      )}

                      {/* Subtle border on hover */}
                      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-orange-200/50 transition-colors duration-200 pointer-events-none"></div>
                    </Link>
                  ))}
                </>
              ) : (
                <div className="p-6 text-center">
                  <Search className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-slate-600 mb-1">
                    No recipes found
                  </p>
                  <p className="text-xs text-slate-500">
                    Try searching with different keywords
                  </p>
                </div>
              )}
            </div>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}
