"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Bookmark,
  ChefHat,
  Sparkles,
  Coffee,
  Trash2,
} from "lucide-react";

import { useEffect, useState } from "react";
import { BASE_URL } from "@/lib/constants";

interface SavedRecipe {
  _id: string;
  id: string;
  title: string;
  image: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const SavedRecipesPage = () => {
  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/api/user/favoriteRecipes`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch saved recipes");
        }
        const data = await response.json();
        setSavedRecipes(data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleRemoveRecipe = async (recipeId: string) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/favorite/recipe/remove/${recipeId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      await response.json();

      const data = savedRecipes.filter((rec) => rec.id !== recipeId);

      setSavedRecipes(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5"></div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-200/20 to-rose-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-32 h-32 bg-gradient-to-r from-rose-200/15 to-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="relative max-w-[1036px] mx-auto px-4 py-16">
          <div className="flex flex-col justify-center items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gradient-to-r from-red-100 to-orange-100 p-6 rounded-full border border-red-200/50 shadow-xl">
                <Heart className="h-16 w-16 text-red-600" />
              </div>
            </div>

            <div className="text-center max-w-md">
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                Unable to Load Saved Recipes
              </h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                We&apos;re having trouble loading your saved recipes. Please try
                again later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (savedRecipes.length === 0 && !isLoading) {
    return (
      <>
        <div className="min-h-screen relative bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
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
            {/* Empty state illustration */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200/30 to-slate-300/30 blur-2xl rounded-full transform scale-110"></div>
              <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 p-8 rounded-full border border-orange-200/50 shadow-xl">
                <Bookmark className="h-20 w-20 text-orange-600" />
              </div>
            </div>

            <div className="text-center max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                <span className="bg-gradient-to-r from-slate-600 to-slate-800 bg-clip-text text-transparent">
                  No Saved Recipes Yet
                </span>
              </h2>

              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Start building your personal recipe collection by saving your
                favorite dishes.
              </p>

              <div className="bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/50 rounded-2xl p-6 max-w-md mx-auto">
                <div className="flex items-center gap-2 mb-3">
                  <Coffee className="h-5 w-5 text-orange-500" />
                  <span className="font-medium text-slate-700">
                    How to save recipes:
                  </span>
                </div>
                <div className="text-sm text-slate-600 space-y-1">
                  <p>• Browse through our recipe collection</p>
                  <p>• Click the heart icon on recipes you love</p>
                  <p>• Access them anytime from this page</p>
                </div>
              </div>

              <Button
                className="mt-6 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600"
                onClick={() => (window.location.href = "/search")}
              >
                Discover Recipes
              </Button>
            </div>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-200/20 to-rose-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 right-16 w-24 h-24 bg-gradient-to-r from-rose-200/15 to-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-300/10 to-rose-300/10 rounded-full blur-lg animate-pulse delay-500"></div>

        <section className="relative max-w-[1036px] mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-rose-500/20 blur-lg rounded-full"></div>
                <div className="relative bg-gradient-to-r from-red-100 to-rose-100 p-3 rounded-full border border-red-200/50 shadow-md">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <Sparkles className="h-5 w-5 text-orange-500 animate-pulse" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              <span className="bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                Your Saved Recipes
              </span>
            </h1>

            {!isLoading && savedRecipes.length > 0 && (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-50 to-rose-50 border border-red-200/50 rounded-full px-4 py-2">
                <ChefHat className="h-4 w-4 text-red-500" />
                <span className="text-slate-700">
                  <span className="font-semibold text-red-600">
                    {savedRecipes.length}
                  </span>{" "}
                  saved recipe{savedRecipes.length !== 1 ? "s" : ""}
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
                {savedRecipes.map((recipe, index) => (
                  <div
                    key={recipe._id}
                    className="animate-fadeIn group relative"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="transform transition-all duration-300 hover:scale-105">
                      {/* Remove button */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveRecipe(recipe.id);
                        }}
                        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg"
                        title="Remove from saved recipes"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Recipe Card */}
                      <div className="relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200/50">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <Image
                            src={recipe.image}
                            alt={recipe.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2 mb-2">
                            {recipe.title}
                          </h3>
                          <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Heart className="h-3 w-3 fill-red-500 text-red-500" />
                            <span>Saved</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Action buttons */}
          {!isLoading && savedRecipes.length > 0 && (
            <div className="flex justify-center mt-16 gap-4">
              <Button
                variant="outline"
                className="px-6 py-3 border-orange-200 text-orange-600 hover:bg-orange-50"
                onClick={() => (window.location.href = "/search")}
              >
                Discover More Recipes
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default SavedRecipesPage;
