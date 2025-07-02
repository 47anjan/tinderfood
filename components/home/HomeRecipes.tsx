"use client";

import React, { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import { Button } from "@/components/ui/button";
import { menus } from "@/lib/constants";
import Image from "next/image";
import useInfiniteSearch from "@/hooks/useInfiniteSearch";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { ChefHat, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ButtonSaveRecipe from "../core/button-save-recipe";

const HomeRecipes = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(menus[0]);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Demo fallback image - a food placeholder
  const demoImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23f8fafc'/%3E%3Cg transform='translate(200 100)'%3E%3Ccircle cx='0' cy='0' r='40' fill='%23e2e8f0'/%3E%3Cpath d='M-25-10h50v5h-50z' fill='%23cbd5e1'/%3E%3Cpath d='M-20-5h40v3h-40z' fill='%23cbd5e1'/%3E%3Cpath d='M-15 0h30v3h-30z' fill='%23cbd5e1'/%3E%3Cpath d='M-10 5h20v3h-20z' fill='%23cbd5e1'/%3E%3C/g%3E%3Ctext x='200' y='130' text-anchor='middle' font-family='system-ui' font-size='14' fill='%2364748b'%3ERecipe Image%3C/text%3E%3C/svg%3E";

  const handleImageError = (recipeId: string) => {
    setImageErrors((prev) => ({ ...prev, [recipeId]: true }));
  };

  const {
    isFetchingNextPage,
    fetchNextPage,
    isError,
    isLoading,
    data,
    hasNextPage,
  } = useInfiniteSearch({
    query: selectedCategory,
  });

  const allRecipes = data?.pages.flatMap((page) => page.results) || [];

  if ((data && "code" in data && data.code === 402) || isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
        <div className="max-w-[1036px] mx-auto px-4 py-16">
          <div className="flex flex-col justify-center items-center">
            {/* Enhanced error state */}
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
                  Come back tomorrow for more delicious recipes!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
      {/* Hero section with floating elements */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-200/20 to-rose-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-16 w-32 h-32 bg-gradient-to-r from-rose-200/15 to-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-gradient-to-r from-orange-300/10 to-rose-300/10 rounded-full blur-lg animate-pulse delay-500"></div>

        <main className="relative max-w-[1400px] mx-auto pb-16 px-4">
          {/* Header section */}
          <div className="pt-8 pb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-lg rounded-full"></div>
                <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 p-3 rounded-full border border-orange-200/50 shadow-md">
                  <ChefHat className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-orange-500 animate-pulse" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                Discover
              </span>
              <span className="text-slate-700"> Amazing Recipes</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of delicious recipes from around
              the world
            </p>
          </div>

          <section className="mt-6">
            {/* Enhanced category filter with better spacing */}
            <div className="mb-12">
              <CategoryFilter
                categories={menus}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>

            {/* Recipe grid with enhanced styling */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                  {allRecipes.map((recipe, index) => (
                    <article className="relative group" key={recipe.id}>
                      <Link
                        href={`/recipes/${recipe.id}`}
                        className={cn(
                          "group relative block rounded-2xl overflow-hidden transition-all duration-500 ",
                          "bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10",
                          "hover:border-orange-200/50 hover:bg-white/90"
                        )}
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        {/* Image container with overlay effects */}
                        <div className="relative h-[200px] overflow-hidden">
                          {recipe.image && (
                            <>
                              <img
                                src={
                                  imageErrors[recipe.id]
                                    ? demoImage
                                    : recipe?.image
                                }
                                loading="lazy"
                                className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-110"
                                width={400}
                                height={200}
                                alt={recipe.title}
                                onError={() => handleImageError(`${recipe.id}`)}
                              />

                              {/* Gradient overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </>
                          )}
                        </div>

                        {/* Content section */}
                        <div className="p-6">
                          <h4 className="text-lg font-semibold text-slate-800 line-clamp-2 leading-6 group-hover:text-orange-600 transition-colors duration-300">
                            {recipe.title}
                          </h4>

                          {/* Hover indicator */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 will-change-transform transition-transform duration-300 origin-left"></div>
                        </div>
                      </Link>
                      {/* Floating action indicators */}
                      <div className="absolute opacity-0 transform translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 top-4 z-10 right-4">
                        <ButtonSaveRecipe recipe={recipe} />
                      </div>
                    </article>
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
                      "relative px-8 py-4 h-14 text-base font-medium rounded-2xl transition-all cursor-pointer  duration-300",
                      "bg-white/80 backdrop-blur-sm border-2 border-orange-200 text-orange-600 shadow-sm",
                      "hover:bg-gradient-to-r hover:from-orange-500 hover:to-rose-500 hover:text-white  ",
                      "focus:ring-2 focus:ring-orange-300 focus:ring-offset-2",
                      "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/80 disabled:hover:text-orange-600"
                    )}
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                  >
                    <div className="flex items-center gap-3">
                      {isFetchingNextPage ? (
                        <>
                          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          <span>Loading More Recipes...</span>
                        </>
                      ) : (
                        <>
                          <ChefHat className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />
                          <span>Load More Delicious Recipes</span>
                          <Sparkles className="h-4 w-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default HomeRecipes;
