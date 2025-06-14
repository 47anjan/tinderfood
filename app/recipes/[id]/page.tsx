/* eslint-disable @typescript-eslint/no-explicit-any */

import Header from "@/components/home/Header";
import { API_KEY, BASE_URL_FOOD } from "@/lib/constants";
import { RecipeDetails } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";

import {
  IoTimeOutline,
  IoCashOutline,
  IoHeartOutline,
  IoNutritionOutline,
  IoListOutline,
  IoStarOutline,
  IoFlameOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

const getRecipeInformation = cache(
  async (id: string): Promise<RecipeDetails> => {
    return fetch(
      `${BASE_URL_FOOD}/recipes/${id}/information?includeNutrition=true&apiKey=${API_KEY}`
    ).then((res) => res.json());
  }
);

interface Params {
  params: {
    id: string;
  };
}

const RecipeInformation = async ({ params }: Params) => {
  const recipe = await getRecipeInformation(params.id);

  if (recipe && "code" in recipe && recipe.code === 402) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-rose-50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5"></div>

        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-orange-200/20 to-rose-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 right-16 w-32 h-32 bg-gradient-to-r from-rose-200/15 to-orange-200/15 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="relative max-w-[1036px] mx-auto px-4 py-16">
          <div className="flex flex-col justify-center items-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 p-6 rounded-full border border-orange-200/50 shadow">
                <IoFlameOutline className="h-16 w-16 text-orange-600" />
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/3 via-transparent to-rose-500/3"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 left-10 w-24 h-24 bg-gradient-to-r from-orange-200/15 to-rose-200/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-96 right-16 w-20 h-20 bg-gradient-to-r from-rose-200/20 to-orange-200/20 rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="absolute bottom-64 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-300/10 to-rose-300/10 rounded-full blur-lg animate-pulse delay-500"></div>

      <Header />

      <section className="relative max-w-[1036px] mx-auto px-4 py-8">
        <div className="space-y-12">
          {/* Enhanced Header */}
          <header className="space-y-6 pb-8 border-b border-gradient-to-r from-orange-200/30 to-rose-200/30 relative">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-300/40 to-transparent"></div>

            <div className="flex justify-between items-start gap-4">
              <div className="space-y-4 flex-1">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent leading-tight">
                  {recipe.title}
                </h1>

                {/* Quick stats bar */}
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border border-orange-200/50">
                    <IoTimeOutline className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-slate-700">
                      {recipe.readyInMinutes} min
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border border-rose-200/50">
                    <IoHeartOutline className="w-4 h-4 text-rose-500" />
                    <span className="font-medium text-slate-700">
                      {recipe.aggregateLikes} likes
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full border border-green-200/50">
                    <IoStarOutline className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-slate-700">
                      {recipe.healthScore}% healthy
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cuisine tags */}
            {recipe.cuisines?.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {recipe.cuisines.map((item, i) => (
                  <Link
                    key={i}
                    className="group px-4 py-2 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm text-slate-700 text-sm rounded-full border border-orange-200/50 hover:from-orange-100 hover:to-rose-100 hover:border-orange-300/50 transition-all duration-300 hover:shadow hover:shadow-orange-500/10"
                    href={`/search?query=${item.toLocaleLowerCase()}&type=recipes`}
                  >
                    <span className="group-hover:text-orange-700 transition-colors duration-300">
                      {item}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </header>

          <div className="grid gap-12">
            {/* Hero Section with Image and Summary */}
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Recipe Image */}
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/50 shadow shadow-orange-500/10">
                    <Image
                      fill
                      src={recipe.image}
                      alt={recipe.title}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-6">
                <div className="relative p-8 bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow shadow-orange-500/5">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-rose-50/30 rounded-3xl"></div>

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-orange-100 to-rose-100 rounded-xl border border-orange-200/50">
                        <IoNutritionOutline className="w-6 h-6 text-orange-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">
                        About This Recipe
                      </h3>
                    </div>

                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                      <div
                        dangerouslySetInnerHTML={{ __html: recipe.summary }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Nutrition & Scores Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Nutrition Facts */}
              <div className="relative p-8 bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow shadow-orange-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-3xl"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200/50">
                      <IoNutritionOutline className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Nutrition Facts
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {recipe.nutrition?.nutrients
                      .filter((n: { name: string }) =>
                        [
                          "Calories",
                          "Fat",
                          "Protein",
                          "Carbohydrates",
                        ].includes(n.name)
                      )
                      .map((nutrient: any) => (
                        <div
                          key={nutrient.name}
                          className="flex justify-between items-center p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-green-200/30"
                        >
                          <span className="text-slate-600 font-medium">
                            {nutrient.name}
                          </span>
                          <span className="font-bold text-green-700">
                            {nutrient.amount.toFixed(0)}
                            {nutrient.unit.toLowerCase()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Health Scores */}
              <div className="relative p-8 bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow shadow-orange-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-3xl"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200/50">
                      <IoStarOutline className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Recipe Scores
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-700 font-medium">
                          Health Score
                        </p>
                        <p className="text-sm text-slate-500">
                          Based on nutritional balance
                        </p>
                      </div>
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 flex items-center justify-center border-4 border-green-200/50 shadow">
                          <span className="text-green-600 font-bold text-xl">
                            {recipe.healthScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-700 font-medium">
                          Spoonacular Score
                        </p>
                        <p className="text-sm text-slate-500">
                          Overall recipe quality
                        </p>
                      </div>
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center border-4 border-blue-200/50 shadow-lg">
                          <span className="text-blue-600 font-bold text-xl">
                            {recipe.spoonacularScore.toFixed()}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="group relative p-6 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 to-emerald-50/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border border-green-200/50">
                      <IoCashOutline className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-bold text-slate-800">Price/Serving</h3>
                  </div>
                  <p className="text-3xl font-bold text-green-600">
                    ${(recipe.pricePerServing / 100).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="group relative p-6 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-sky-50/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-blue-100 to-sky-100 rounded-lg border border-blue-200/50">
                      <IoTimeOutline className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-800">Ready In</h3>
                  </div>
                  <p className="text-3xl font-bold text-blue-600">
                    {recipe.readyInMinutes}m
                  </p>
                </div>
              </div>

              <div className="group relative p-6 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/40 to-pink-50/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-rose-100 to-pink-100 rounded-lg border border-rose-200/50">
                      <IoHeartOutline className="w-6 h-6 text-rose-600" />
                    </div>
                    <h3 className="font-bold text-slate-800">Likes</h3>
                  </div>
                  <p className="text-3xl font-bold text-rose-600">
                    {recipe.aggregateLikes}
                  </p>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-orange-100 to-rose-100 rounded-xl border border-orange-200/50 shadow">
                  <IoListOutline className="w-8 h-8 text-orange-600" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Ingredients
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recipe.extendedIngredients?.map((ingredient, index) => (
                  <Link
                    key={index}
                    href={`/ingredients/${ingredient.id}?recipeId=${recipe.id}`}
                    className="group block relative transform transition-all duration-300 hover:scale-105"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>

                    <div className="relative p-4 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow group-hover:shadow group-hover:shadow-orange-500/10 transition-all duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-rose-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="relative">
                        <div className="mb-4 overflow-hidden rounded-xl">
                          <Image
                            width={200}
                            height={200}
                            src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                            alt={ingredient.name}
                            className="object-contain h-32 w-full transition-transform duration-300 "
                            sizes="(max-width: 768px) 50vw, 25vw"
                          />
                        </div>
                        <p className="text-sm font-medium text-center text-slate-700 group-hover:text-orange-700 transition-colors duration-300 leading-tight">
                          {ingredient.original}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl border border-blue-200/50 shadow">
                  <IoCheckmarkCircleOutline className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Instructions
                </h2>
              </div>

              <div className="space-y-6">
                {recipe?.analyzedInstructions[0]?.steps.map(
                  (instruction, index) => (
                    <div
                      key={index}
                      className="group relative transform transition-all duration-300 hover:scale-[1.02]"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg"></div>

                      <div className="relative p-6 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow group-hover:shadow transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative flex items-start gap-6">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-white font-bold flex items-center justify-center shadow">
                              {instruction.number}
                            </div>
                          </div>
                          <p className="text-slate-700 leading-relaxed text-lg flex-1 pt-2">
                            {instruction.step}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Final Tip */}
            <div className="relative p-8 bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-50/40 to-emerald-50/40 rounded-3xl"></div>

              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="text-4xl animate-pulse">🌟</div>
                  <p className="text-xl font-medium text-teal-800 leading-relaxed">
                    Serve this recipe with your favorite sides or enjoy it
                    plain!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeInformation;
