export interface User {
  name: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  location: {
    city?: string;
    country?: string;
  };
  cookingLevel: "beginner" | "intermediate" | "advanced" | "professional";
  dietaryRestrictions: string[];
  favoriteFoods: string[];
  cuisinePreferences: string[];
}
