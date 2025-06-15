/* eslint-disable @typescript-eslint/no-explicit-any */

import { Badge } from "@/components/ui/badge";
import { API_KEY, BASE_URL_FOOD } from "@/lib/constants";
import { IngredientDetails } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { cache } from "react";
import {
  IoNutritionOutline,
  IoPricetagOutline,
  IoScaleOutline,
  IoArrowBack,
  IoFlameOutline,
  IoLeafOutline,
} from "react-icons/io5";
import { LuChefHat } from "react-icons/lu";

const getIngredientInformation = cache(
  async (id: string): Promise<IngredientDetails> => {
    return fetch(
      `${BASE_URL_FOOD}/food/ingredients/${id}/information?amount=1&apiKey=${API_KEY}`
    ).then((res) => res.json());
  }
);

interface Params {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ recipeId?: string }>;
}

const NutritionItem = ({ nutrient }: { nutrient: any }) => {
  const unitIcons: { [key: string]: string } = {
    kcal: "🔥",
    g: "🟢",
    mg: "🟡",
    µg: "🔵",
    IU: "🟠",
  };

  return (
    <div className="group relative p-4 bg-gradient-to-r from-white/70 to-white/50 backdrop-blur-sm rounded-xl border border-white/40 hover:from-white/90 hover:to-white/70 hover:border-orange-200/50 hover:shadow hover:shadow-orange-500/10 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/20 to-rose-50/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-orange-100 to-rose-100 flex items-center justify-center border border-orange-200/50 shadow-sm">
            <span className="text-sm">{unitIcons[nutrient.unit] || "📌"}</span>
          </div>
          <span className="font-medium text-slate-700 group-hover:text-orange-700 transition-colors duration-300">
            {nutrient.name}
          </span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-slate-800">
            {nutrient.amount.toFixed(2)}
          </span>
          <span className="text-sm text-slate-500 ml-1">{nutrient.unit}</span>
        </div>
      </div>
    </div>
  );
};

const IngredientInformation = async ({ params, searchParams }: Params) => {
  const { id } = await params;
  const { recipeId } = await searchParams;

  const ingredient = await getIngredientInformation(id);

  const sortedNutrients = [...ingredient.nutrition.nutrients].sort((a, b) => {
    if (a.unit === "kcal" && b.unit !== "kcal") return -1;
    if (b.unit === "kcal" && a.unit !== "kcal") return 1;

    const convertToGrams = (nutrient: any) => {
      return nutrient.amount;
    };

    return convertToGrams(b) - convertToGrams(a);
  });

  const majorNutrients = sortedNutrients.filter((n) =>
    ["Calories", "Protein", "Fat", "Carbohydrates"].includes(n.name)
  );
  const vitaminsMinerals = sortedNutrients.filter(
    (n) => !["Calories", "Protein", "Fat", "Carbohydrates"].includes(n.name)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 via-white to-rose-50/30">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/3 via-transparent to-rose-500/3"></div>

      {/* Floating decorative elements */}
      <div className="absolute top-32 left-10 w-24 h-24 bg-gradient-to-r from-orange-200/15 to-rose-200/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-96 right-16 w-20 h-20 bg-gradient-to-r from-rose-200/20 to-orange-200/20 rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="absolute bottom-64 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-300/10 to-rose-300/10 rounded-full blur-lg animate-pulse delay-500"></div>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {/* Back Navigation */}
        {recipeId && (
          <div className="mb-8">
            <Link
              href={`/recipes/${recipeId}`}
              className="group inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm text-slate-600 hover:text-orange-600 rounded-full border border-white/50 hover:border-orange-200/50 shadow hover:shadow-orange-500/10 transition-all duration-300"
            >
              <IoArrowBack className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to recipe</span>
            </Link>
          </div>
        )}

        <div className="space-y-12">
          {/* Header Section */}
          <header className="space-y-6 pb-8 border-b border-gradient-to-r from-orange-200/30 to-rose-200/30 relative border-orange-200">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-300/40 to-transparent"></div>

            <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                  <div className="relative overflow-hidden rounded-2xl border border-white/50 shadow shadow-orange-500/10 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-rose-50/30"></div>
                    <div className="relative p-8 flex items-center justify-center">
                      {ingredient.image ? (
                        <Image
                          width={300}
                          height={300}
                          src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                          className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-105"
                          alt={ingredient.name}
                        />
                      ) : null}
                      <div
                        className={`${
                          ingredient.image ? "hidden" : "flex"
                        } flex-col items-center justify-center text-center`}
                      >
                        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-200 to-rose-200 flex items-center justify-center mb-4 shadow-lg">
                          <LuChefHat className="w-12 h-12 text-orange-600" />
                        </div>
                        <p className="text-slate-600 font-medium">
                          {ingredient.name}
                        </p>
                        <p className="text-sm text-slate-400 mt-1">
                          No image available
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Section */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent leading-tight capitalize mb-4">
                    {ingredient.name}
                  </h1>

                  {/* Category badges */}
                  <div className="flex flex-wrap gap-3">
                    {ingredient.categoryPath.map((item, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="group px-4 py-2 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm border-orange-200/50 hover:from-orange-100 hover:to-rose-100 hover:border-orange-300/50 transition-all duration-300 hover:shadow hover:shadow-orange-500/10"
                      >
                        <Link
                          href={`/search?query=${item}&type=ingredients`}
                          className="flex items-center gap-2 text-slate-700 group-hover:text-orange-700 transition-colors duration-300"
                        >
                          <LuChefHat className="w-4 h-4" />
                          <span className="capitalize font-medium">{item}</span>
                        </Link>
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="group relative p-6 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50/40 to-emerald-50/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200/50 shadow-sm">
                          <IoPricetagOutline className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-bold text-slate-800">
                          Estimated Cost
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-green-600">
                        ${(ingredient.estimatedCost.value / 100).toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-500 mt-1">per serving</p>
                    </div>
                  </div>

                  <div className="group relative p-6 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-sky-50/40 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-gradient-to-r from-blue-100 to-sky-100 rounded-xl border border-blue-200/50 shadow-sm">
                          <IoScaleOutline className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-bold text-slate-800">
                          Serving Size
                        </h3>
                      </div>
                      <p className="text-3xl font-bold text-blue-600">
                        {ingredient.nutrition.weightPerServing.amount}
                        <span className="text-xl ml-1">
                          {ingredient.nutrition.weightPerServing.unit}
                        </span>
                      </p>
                      <p className="text-sm text-slate-500 mt-1">
                        weight per serving
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Nutrition Section */}
          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-orange-100 to-rose-100 rounded-xl border border-orange-200/50 shadow">
                <IoNutritionOutline className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Nutritional Information
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Major Nutrients */}
              <div className="relative p-8 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow shadow-orange-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 to-rose-50/30 rounded-3xl"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-orange-100 to-rose-100 rounded-xl border border-orange-200/50">
                      <IoFlameOutline className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Major Nutrients
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {majorNutrients.map((nutrient) => (
                      <NutritionItem key={nutrient.name} nutrient={nutrient} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Vitamins & Minerals */}
              <div className="relative p-8 bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow shadow-orange-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-emerald-50/30 rounded-3xl"></div>

                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border border-green-200/50">
                      <IoLeafOutline className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800">
                      Vitamins & Minerals
                    </h3>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {vitaminsMinerals.map((nutrient) => (
                      <NutritionItem key={nutrient.name} nutrient={nutrient} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Fun Fact Section */}
          <div className="relative p-8 bg-gradient-to-br from-white/90 via-white/80 to-white/70 backdrop-blur-xl rounded-3xl border border-white/50 shadow">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-50/40 to-emerald-50/40 rounded-3xl"></div>

            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="text-4xl animate-bounce">🌿</div>
                <div>
                  <h3 className="text-xl font-bold text-teal-800 mb-2">
                    Did you know?
                  </h3>
                  <p className="text-lg text-teal-700 leading-relaxed">
                    This ingredient is packed with nutrients that can contribute
                    to a healthy and balanced diet!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientInformation;
