"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, ChefHat, Heart } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  cookingLevels,
  cuisineOptions,
  dietaryOptions,
  foodOptions,
} from "@/lib/constants";
import { useAuth } from "@/contexts/auth-provider";

// Cooking Preferences Schema
const cookingPreferencesSchema = z.object({
  cookingLevel: z.enum([
    "beginner",
    "intermediate",
    "advanced",
    "professional",
  ]),
  dietaryRestrictions: z.array(z.string()),
  cuisinePreferences: z.array(z.string()),
  favoriteFoods: z.array(z.string()),
});

type CookingPreferencesFormData = z.infer<typeof cookingPreferencesSchema>;

const CookingPreference = () => {
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CookingPreferencesFormData>({
    resolver: zodResolver(cookingPreferencesSchema),
    defaultValues: {
      cookingLevel: "beginner",
      dietaryRestrictions: [],
      cuisinePreferences: [],
      favoriteFoods: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      form.reset({
        cookingLevel: user.cookingLevel || "beginner",
        dietaryRestrictions: user.dietaryRestrictions || [],
        cuisinePreferences: user.cuisinePreferences || [],
        favoriteFoods: user.favoriteFoods || [],
      });
    }
  }, [user, form]);

  const onSubmit = async (data: CookingPreferencesFormData): Promise<void> => {
    setIsSubmitting(true);
    try {
      console.log("Cooking preferences updated:", data);
      alert("Cooking preferences updated successfully!");
    } catch (error) {
      console.error("Error updating cooking preferences:", error);
      alert("Failed to update cooking preferences. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const TagSelector = ({ options, value, onChange, colorClass }: any) => (
    <div className="flex flex-wrap gap-2">
      {options.map((option: string) => (
        <button
          key={option}
          type="button"
          onClick={() => {
            const currentValues = value || [];
            const newValues = currentValues.includes(option)
              ? currentValues.filter((item: string) => item !== option)
              : [...currentValues, option];
            onChange(newValues);
          }}
          className={`px-3 py-1 cursor-pointer text-sm rounded-full border transition-all ${
            (value || []).includes(option)
              ? `${colorClass} border-orange-600 border-2 text-orange-700`
              : "border-gray-300 text-gray-600 border-2 hover:border-gray-400"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Cooking preferences
          </h1>
          <p className="text-gray-600">Update your cooking preferences</p>
        </div>
        <div className="bg-white rounded-xl  border border-gray-100">
          {/* Header */}
          <div className="p-6 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <ChefHat size={20} className="text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Cooking Preferences
                </h2>
                <p className="text-sm text-gray-500">
                  Set your cooking level and preferences
                </p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 space-y-6"
            >
              {/* Cooking Level */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <ChefHat size={16} className="text-orange-600" />
                  <h3 className="font-medium text-gray-900">Cooking Level</h3>
                </div>

                <FormField
                  control={form.control}
                  name="cookingLevel"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {cookingLevels.map((level) => (
                          <button
                            key={level.value}
                            type="button"
                            onClick={() => field.onChange(level.value)}
                            className={`p-3
                               cursor-pointer border rounded-lg text-sm font-medium transition-all ${
                                 field.value === level.value
                                   ? "border-orange-600 border-2 bg-orange-50 text-orange-700"
                                   : "border-gray-200 border-2 text-gray-600 hover:border-gray-300"
                               }`}
                          >
                            {level.label}
                          </button>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preferences */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart size={16} className="text-orange-600" />
                  <h3 className="font-medium text-gray-900">
                    Food Preferences
                  </h3>
                </div>

                <FormField
                  control={form.control}
                  name="dietaryRestrictions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Dietary Restrictions
                      </FormLabel>
                      <TagSelector
                        options={dietaryOptions}
                        value={field.value}
                        onChange={field.onChange}
                        colorClass="bg-orange-50"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cuisinePreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Favorite Cuisines
                      </FormLabel>
                      <TagSelector
                        options={cuisineOptions}
                        value={field.value}
                        onChange={field.onChange}
                        colorClass="bg-orange-50"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="favoriteFoods"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Favorite Foods
                      </FormLabel>
                      <TagSelector
                        options={foodOptions}
                        value={field.value}
                        onChange={field.onChange}
                        colorClass="bg-orange-50"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-gray-50">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-[50px] cursor-pointer transition-all duration-200 bg-orange-600 hover:bg-orange-700 text-white disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Saving Preferences...
                    </>
                  ) : (
                    <>
                      <Save size={16} className="mr-2" />
                      Save Cooking Preferences
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default CookingPreference;
