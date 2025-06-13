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
      <div className="max-w-[1036px] mx-auto px-4 py-8">
        <div className="flex flex-col justify-center items-center">
          <Image src="/empty.avif" width={271} height={256} alt="" />
          <h5 className="mt-6 font-semibold  text-[#535665]">
            Your daily points limit of 150 has been reached.
          </h5>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <section className="max-w-[1036px] mx-auto px-4 py-8">
        <div className="space-y-8">
          <header className="space-y-4 pb-6 border-b border-gray-100">
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {recipe.title}
              </h1>
            </div>

            <div className="flex flex-wrap gap-2">
              {recipe.cuisines?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {recipe.cuisines.map((item, i) => (
                    <Link
                      key={i}
                      className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-full hover:bg-gray-100 transition-colors"
                      href={`/search?query=${item.toLocaleLowerCase()}&type=recipes`}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </header>

          <div className="grid  gap-8">
            <div className="space-y-6">
              {/* Recipe Image */}
              <div className="mb-10">
                <div className="relative aspect-video overflow-hidden rounded-lg">
                  <Image
                    fill
                    src={recipe.image}
                    alt={recipe.title}
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>

              <div className="prose max-w-none p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <IoNutritionOutline className="w-6 h-6 text-primary" />
                  About This Recipe
                </h3>
                <div dangerouslySetInnerHTML={{ __html: recipe.summary }} />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Nutrition Facts */}
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <IoNutritionOutline className="w-6 h-6 text-primary" />
                  Nutrition Facts
                </h3>
                <div className="space-y-3">
                  {recipe.nutrition?.nutrients
                    .filter((n: { name: string }) =>
                      ["Calories", "Fat", "Protein", "Carbohydrates"].includes(
                        n.name
                      )
                    )
                    .map((nutrient: any) => (
                      <div
                        key={nutrient.name}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-600">{nutrient.name}</span>
                        <span className="font-medium">
                          {nutrient.amount.toFixed(0)}
                          {nutrient.unit.toLowerCase()}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Health Scores */}
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <IoNutritionOutline className="w-6 h-6 text-primary" />
                  Recipe Scores
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Health Score</p>
                      <p className="text-sm text-gray-500">
                        Based on nutritional balance
                      </p>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-bold text-xl">
                        {recipe.healthScore}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600">Spoonacular Score</p>
                      <p className="text-sm text-gray-500">
                        Overall recipe quality
                      </p>
                    </div>
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-xl">
                        {recipe.spoonacularScore.toFixed()}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-xl border border-gray-100 ">
                  <div className="flex items-center gap-3 mb-2">
                    <IoCashOutline className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold">Price/Serving</h3>
                  </div>
                  <p className="text-2xl font-medium">
                    ${(recipe.pricePerServing / 100).toFixed(2)}
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-100 ">
                  <div className="flex items-center gap-3 mb-2">
                    <IoTimeOutline className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold">Ready In</h3>
                  </div>
                  <p className="text-2xl font-medium">
                    {recipe.readyInMinutes}m
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-gray-100 ">
                  <div className="flex items-center gap-3 mb-2">
                    <IoHeartOutline className="w-6 h-6 text-red-600" />
                    <h3 className="font-semibold">Likes</h3>
                  </div>
                  <p className="text-2xl font-medium">
                    {recipe.aggregateLikes}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <IoListOutline className="w-6 h-6 text-primary" />
                    Ingredients
                  </h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {recipe.extendedIngredients?.map((ingredient, index) => (
                    <Link
                      key={index}
                      href={`/ingredients/${ingredient.id}?recipeId=${recipe.id}`}
                      className="group block bg-white p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-all  "
                    >
                      <div className="  mb-3">
                        <Image
                          width={500}
                          height={500}
                          src={`https://spoonacular.com/cdn/ingredients_250x250/${ingredient.image}`}
                          alt={ingredient.name}
                          className="object-contain h-[200px] w-full rounded-lg"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      <p className="text-sm font-medium text-center text-gray-700 group-hover:text-primary transition-colors">
                        {ingredient.original}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <IoListOutline className="w-6 h-6 text-primary" />
              Instructions
            </h2>
            <ol className="space-y-4">
              {recipe?.analyzedInstructions[0]?.steps.map(
                (instruction, index) => (
                  <li
                    key={index}
                    className="p-4 bg-white rounded-xl border border-gray-100 "
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-600 text-white font-bold flex items-center justify-center">
                        {instruction.number}
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {instruction.step}
                      </p>
                    </div>
                  </li>
                )
              )}
            </ol>
          </div>

          {/* Final Tip */}
          <div className="p-6 bg-teal-50 rounded-xl border border-teal-100">
            <p className="text-lg font-medium text-teal-800 flex items-center gap-2">
              <span className="text-2xl">🌟</span>
              Serve this recipe with your favorite sides or enjoy it plain!
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
export default RecipeInformation;
