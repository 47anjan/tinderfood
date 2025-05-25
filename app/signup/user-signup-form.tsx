/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  ChefHat,
  Heart,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Zod schema matching your Mongoose schema
const userSchema = z
  .object({
    // Basic Information
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be less than 30 characters")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      ),
    email: z
      .string()
      .email("Invalid email format")
      .transform((str) => str.toLowerCase()),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),

    // Profile Information
    avatar: z.string().optional(),
    bio: z.string().max(500, "Bio must be 500 characters or less").optional(),
    location: z.object({
      city: z.string().optional(),
      country: z.string().optional(),
    }),
    cookingLevel: z.enum([
      "beginner",
      "intermediate",
      "advanced",
      "professional",
    ]),
    dietaryRestrictions: z.array(z.string()),
    favoriteFoods: z.array(z.string()),
    cuisinePreferences: z.array(z.string()),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Add debounce hook
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function UserSignupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isStepValid, setIsStepValid] = useState(false);

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar:
        "https://cdn.vectorstock.com/i/500p/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg",
      bio: "",
      location: {
        city: "",
        country: "",
      },
      cookingLevel: "beginner",
      dietaryRestrictions: [],
      favoriteFoods: [],
      cuisinePreferences: [],
    },
    mode: "onBlur", // Changed from "onChange" to "onBlur"
  });

  // Watch form values with debouncing
  const watchedValues = form.watch();
  const debouncedValues = useDebounce(watchedValues, 300);

  // Memoize step validation fields
  type FieldNames =
    | "name"
    | "username"
    | "email"
    | "password"
    | "confirmPassword"
    | "avatar"
    | "bio"
    | "cookingLevel"
    | "location.city"
    | "location.country"
    | "dietaryRestrictions"
    | "favoriteFoods"
    | "cuisinePreferences";

  const stepValidationFields: Record<number, FieldNames[]> = useMemo(
    () => ({
      1: ["name", "username", "email", "password", "confirmPassword"],
      2: ["bio", "location.city", "location.country"],
      3: ["cookingLevel", "dietaryRestrictions"],
      4: ["favoriteFoods", "cuisinePreferences"],
    }),
    []
  );

  const validateStep = useCallback(
    async (step: number) => {
      const fieldsToValidate: FieldNames[] =
        stepValidationFields[step as keyof typeof stepValidationFields] || [];

      if (fieldsToValidate.length === 0) return true;

      const result = await form.trigger(fieldsToValidate, {
        shouldFocus: false,
      });
      return result;
    },
    [form, stepValidationFields]
  );

  // Optimized validation effect
  useEffect(() => {
    let isMounted = true;

    const checkStepValidity = async () => {
      try {
        const valid = await validateStep(currentStep);
        if (isMounted) {
          setIsStepValid(valid);
        }
      } catch (error) {
        console.error("Validation error:", error);
        if (isMounted) {
          setIsStepValid(false);
        }
      }
    };

    checkStepValidity();

    return () => {
      isMounted = false;
    };
  }, [debouncedValues, currentStep, validateStep]);

  const cookingLevels = [
    {
      value: "beginner",
      label: "🌱 Beginner",
      desc: "Just starting my culinary journey",
    },
    {
      value: "intermediate",
      label: "👨‍🍳 Intermediate",
      desc: "Comfortable with basic techniques",
    },
    { value: "advanced", label: "🎯 Advanced", desc: "Skilled home cook" },
    {
      value: "professional",
      label: "⭐ Professional",
      desc: "Industry experience",
    },
  ];

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Paleo",
    "Low-Carb",
    "Low-Sodium",
    "Nut-Free",
    "Halal",
    "Kosher",
    "Raw Food",
  ];

  const cuisineOptions = [
    "Italian",
    "Chinese",
    "Mexican",
    "Indian",
    "Japanese",
    "French",
    "Thai",
    "Mediterranean",
    "American",
    "Korean",
    "Spanish",
    "Greek",
    "Middle Eastern",
    "Vietnamese",
    "German",
    "Turkish",
    "Brazilian",
    "Moroccan",
  ];

  const foodOptions = [
    "Pizza",
    "Pasta",
    "Sushi",
    "Tacos",
    "Burgers",
    "Salads",
    "Seafood",
    "Steak",
    "Chicken",
    "Vegetables",
    "Desserts",
    "Soups",
    "Sandwiches",
    "Rice Dishes",
    "Noodles",
    "BBQ",
    "Spicy Food",
    "Comfort Food",
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Japan",
    "South Korea",
    "China",
    "India",
    "Brazil",
    "Mexico",
    "Argentina",
    "Netherlands",
    "Sweden",
    "Norway",
  ];

  const nextStep = async () => {
    const valid = await validateStep(currentStep);
    if (valid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step
                ? "bg-orange-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {step === 1 && <User size={16} />}
            {step === 2 && <MapPin size={16} />}
            {step === 3 && <ChefHat size={16} />}
            {step === 4 && <Heart size={16} />}
          </div>
          {step < 4 && (
            <div
              className={`w-12 h-1 mx-2 ${
                currentStep > step ? "bg-orange-600" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Create Your Account
        </h2>
        <p className="text-gray-600">{"Let's start with the basics"}</p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Choose a unique username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Create a secure password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Profile Information
        </h2>
        <p className="text-gray-600">Tell us a bit about yourself</p>
      </div>

      <div className="space-y-4">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself..."
                  className="resize-none"
                  rows={4}
                  maxLength={500}
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between items-center">
                <FormMessage />
                <span className="text-sm text-gray-500">
                  {field.value?.length || 0}/500
                </span>
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="location.city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Your city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country (Optional)</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Cooking Profile
        </h2>
        <p className="text-gray-600">
          Help us understand your cooking experience
        </p>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="cookingLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cooking Level</FormLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {cookingLevels.map((level) => (
                  <div
                    key={level.value}
                    onClick={() => field.onChange(level.value)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      field.value === level.value
                        ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <div className="font-medium text-gray-800">
                      {level.label}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {level.desc}
                    </div>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietaryRestrictions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Restrictions (Optional)</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {dietaryOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      const currentValues = field.value || [];
                      const newValues = currentValues.includes(option)
                        ? currentValues.filter(
                            (item: string) => item !== option
                          )
                        : [...currentValues, option];
                      field.onChange(newValues);
                    }}
                    className={`p-2 text-sm border rounded-lg cursor-pointer transition-all ${
                      (field.value || []).includes(option)
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {option}
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Food Preferences
        </h2>
        <p className="text-gray-600">What do you love to eat and cook?</p>
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="favoriteFoods"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Favorite Foods (Optional)</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {foodOptions.map((food) => (
                  <div
                    key={food}
                    onClick={() => {
                      const currentValues = field.value || [];
                      const newValues = currentValues.includes(food)
                        ? currentValues.filter((item: string) => item !== food)
                        : [...currentValues, food];
                      field.onChange(newValues);
                    }}
                    className={`p-2 text-sm border rounded-lg cursor-pointer transition-all ${
                      (field.value || []).includes(food)
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {food}
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cuisinePreferences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuisine Preferences (Optional)</FormLabel>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {cuisineOptions.map((cuisine) => (
                  <div
                    key={cuisine}
                    onClick={() => {
                      const currentValues = field.value || [];
                      const newValues = currentValues.includes(cuisine)
                        ? currentValues.filter(
                            (item: string) => item !== cuisine
                          )
                        : [...currentValues, cuisine];
                      field.onChange(newValues);
                    }}
                    className={`p-2 text-sm border rounded-lg cursor-pointer transition-all ${
                      (field.value || []).includes(cuisine)
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {cuisine}
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );

  return (
    <>
      {renderStepIndicator()}

      <Form {...form}>
        <div className="space-y-6">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ChevronLeft size={20} className="mr-1 cursor-pointer" />
              Back
            </Button>

            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={!isStepValid}
                className="flex border border-orange-600 cursor-pointer items-center"
              >
                Next
                <ChevronRight size={20} className="ml-1" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={form.handleSubmit(onSubmit)}
                className="bg-orange-600  hover:bg-orange-700 text-white"
              >
                Create Account
              </Button>
            )}
          </div>
        </div>
      </Form>
    </>
  );
}
