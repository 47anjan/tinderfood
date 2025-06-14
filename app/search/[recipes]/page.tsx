"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useInfiniteSearch from "@/hooks/useInfiniteSearch";
import { SearchRecipe } from "@/lib/types";

import { Search, AlertCircle, ChefHat, Sparkles, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";
import CuisineCard from "@/app/cuisines/_components/CuisineCard";

interface Params {
  searchParams: {
    query: string;
  };
}

const SearchPage = ({ searchParams }: Params) => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteSearch({
    query: searchParams.query,
  });

  const allResults = data?.pages.flatMap((page) => page.results) || [];

  // Error state with enhanced styling
  if ((data && "code" in data && data.code === 402) || isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-200/20 to-rose-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-32 h-32 bg-gradient-to-r from-rose-200/15 to-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="relative max-w-[1036px] mx-auto px-4 py-16">
          <div className="flex flex-col justify-center items-center">
            {/* Enhanced error icon */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 p-6 rounded-full border border-orange-200/50 shadow-xl">
                <AlertCircle className="h-16 w-16 text-orange-600" />
              </div>
            </div>

            <Image
              src="/empty.avif"
              width={271}
              height={256}
              alt="Daily limit reached"
              className="opacity-80 mb-6"
            />

            <div className="text-center max-w-md">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Daily Limit Reached
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                Your daily points limit of{" "}
                <span className="font-semibold text-orange-600">150</span> has
                been reached.
              </p>
              <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/50 rounded-xl">
                <p className="text-sm text-slate-600">
                  Come back tomorrow to continue your culinary journey!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No results state with enhanced styling
  if (allResults.length === 0 && !isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-32 left-16 w-24 h-24 bg-gradient-to-r from-orange-200/15 to-rose-200/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-20 h-20 bg-gradient-to-r from-rose-200/20 to-orange-200/20 rounded-full blur-xl animate-pulse delay-700"></div>

        <section
          style={{
            height: "calc(100vh - 80px)",
          }}
          className="relative max-w-[1036px] mx-auto px-4 py-8 flex flex-col justify-center items-center gap-10"
        >
          {/* Enhanced not found illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 to-slate-300/30 blur-2xl rounded-full transform scale-110"></div>
            <Image
              width={238}
              height={238}
              alt="search not found"
              src="/location_unserviceable.avif"
              className="relative opacity-90 drop-shadow-lg"
            />
          </div>

          <div className="text-center max-w-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-400/20 to-slate-500/20 blur-lg rounded-full"></div>
                <div className="relative bg-gradient-to-r from-slate-100 to-slate-200 p-3 rounded-full border border-slate-300/50 shadow-md">
                  <Search className="h-6 w-6 text-slate-600" />
                </div>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
                No Recipes Found
              </span>
            </h2>

            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              We couldn&apos;t find any recipes matching{" "}
              <span className="font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg">
                &quot;{searchParams.query}&quot;
              </span>
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/50 rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center gap-2 mb-3">
                <Coffee className="h-5 w-5 text-orange-500" />
                <span className="font-medium text-slate-700">
                  Try searching for:
                </span>
              </div>
              <div className="text-sm text-slate-600 space-y-1">
                <p>
                  • Popular ingredients like &quot;chicken&quot; or
                  &quot;pasta&quot;
                </p>
                <p>
                  • Cuisine types like &quot;Italian&quot; or
                  &quot;Mexican&quot;
                </p>
                <p>
                  • Cooking methods like &quot;grilled&quot; or
                  &quot;baked&quot;
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-200/20 to-rose-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-60 right-16 w-24 h-24 bg-gradient-to-r from-rose-200/15 to-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-300/10 to-rose-300/10 rounded-full blur-lg animate-pulse delay-500"></div>

      <section className="relative max-w-[1036px] mx-auto px-4 py-8">
        {/* Search results header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-lg rounded-full"></div>
              <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 p-3 rounded-full border border-orange-200/50 shadow-md">
                <Search className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <Sparkles className="h-5 w-5 text-orange-500 animate-pulse" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              Search Results
            </span>
          </h1>

          {!isLoading && allResults.length > 0 && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/50 rounded-full px-4 py-2">
              <ChefHat className="h-4 w-4 text-orange-500" />
              <span className="text-slate-700">
                Found{" "}
                <span className="font-semibold text-orange-600">
                  {allResults.length}
                </span>{" "}
                recipes for{" "}
                <span className="font-semibold text-slate-800">
                  &quot;{searchParams.query}&quot;
                </span>
              </span>
            </div>
          )}
        </div>

        {/* Results grid */}
        <div className="mt-8 gap-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <>
              {Array(8)
                .fill("")
                .map((_, index) => (
                  <div key={index} className="group">
                    <div className="relative">
                      {/* Enhanced skeleton with shimmer effect */}
                      <Skeleton className="w-full rounded-2xl h-[280px] bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Skeleton className="h-4 bg-slate-200 rounded mb-2" />
                        <Skeleton className="h-3 bg-slate-200 rounded w-3/4" />
                      </div>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <>
              {allResults.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-fadeIn"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  <div className="transform transition-all duration-300 hover:scale-105">
                    <CuisineCard recipe={recipe as SearchRecipe} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Enhanced Load More button */}
        {hasNextPage && (
          <div className="flex justify-center mt-20">
            <div className="relative group">
              {/* Button glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "relative px-8 py-4 h-14 text-base font-medium rounded-2xl transition-all duration-300",
                  "bg-white/80 backdrop-blur-sm border-2 border-orange-200 text-orange-600 shadow-sm",
                  "hover:bg-gradient-to-r hover:from-orange-500 hover:to-rose-500 hover:text-white  ",
                  "focus:ring-2 focus:ring-orange-300 focus:ring-offset-2",
                  "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-orange-600",
                  "w-full max-w-72 mx-auto"
                )}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                <div className="flex items-center gap-3">
                  {isFetchingNextPage ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading More Results...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                      <span>Load More Results</span>
                      <Sparkles className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  )}
                </div>
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
