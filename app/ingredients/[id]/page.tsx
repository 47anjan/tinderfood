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
  params: {
    id: string;
  };
  searchParams: { recipeId: string };
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
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <div className="flex items-center gap-3">
        <span className="text-gray-400">
          {unitIcons[nutrient.unit] || "📌"}
        </span>
        <span className="font-medium text-gray-700">{nutrient.name}</span>
      </div>
      <div className="text-gray-500">
        {nutrient.amount.toFixed(2)}{" "}
        <span className="text-sm">{nutrient.unit}</span>
      </div>
    </div>
  );
};

const IngredientInformation = async ({ params, searchParams }: Params) => {
  const ingredient = await getIngredientInformation(params.id);

  const sortedNutrients = [...ingredient.nutrition.nutrients].sort((a, b) => {
    if (a.unit === "kcal" && b.unit !== "kcal") return -1;
    if (b.unit === "kcal" && a.unit !== "kcal") return 1;
    // if (a.unit === "IU") return 1;
    // if (b.unit === "IU") return -1;

    const convertToGrams = (nutrient: any) => {
      // if (nutrient.unit === "mg") return nutrient.amount / 1000;
      // if (nutrient.unit === "µg") return nutrient.amount / 1000000;
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {searchParams.recipeId ? (
        <div className="mb-6">
          <Link
            href={`/recipes/${searchParams.recipeId}`}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            ← Back to the recipe
          </Link>
        </div>
      ) : null}

      <div className="grid md:grid-cols-[300px_1fr] gap-8">
        <div className="space-y-4">
          <div className="relative aspect-square rounded-xl overflow-hidden ">
            <Image
              fill
              src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
              className="object-contain"
              alt={ingredient.name}
              placeholder="blur"
              blurDataURL="/placeholder-ingredient.png"
            />
          </div>
        </div>

        <div className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold capitalize mb-2">
              {ingredient.name}
            </h1>
            <div className="flex flex-wrap gap-2">
              {ingredient.categoryPath.map((item, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="capitalize hover:bg-gray-50"
                >
                  <Link
                    href={`/search?query=${item}&type=ingredients`}
                    className="flex items-center gap-1"
                  >
                    <LuChefHat className="w-4 h-4" /> {item}
                  </Link>
                </Badge>
              ))}
            </div>
          </header>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <IoPricetagOutline className="w-6 h-6 text-primary" />
                <h3 className="font-semibold">Estimated Cost</h3>
              </div>
              <p className="text-2xl font-medium">
                ${(ingredient.estimatedCost.value / 100).toFixed(2)}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <IoScaleOutline className="w-6 h-6 text-primary" />
                <h3 className="font-semibold">Serving Size</h3>
              </div>
              <p className="text-2xl font-medium">
                {ingredient.nutrition.weightPerServing.amount}
                {ingredient.nutrition.weightPerServing.unit}
              </p>
            </div>
          </div>

          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <IoNutritionOutline className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Nutritional Information</h2>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h3 className="font-semibold mb-4 text-lg">Major Nutrients</h3>
              {majorNutrients.map((nutrient) => (
                <NutritionItem key={nutrient.name} nutrient={nutrient} />
              ))}

              <h3 className="font-semibold mb-4 mt-6 text-lg">
                Vitamins & Minerals
              </h3>
              {vitaminsMinerals.map((nutrient) => (
                <NutritionItem key={nutrient.name} nutrient={nutrient} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IngredientInformation;
