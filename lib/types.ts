export interface User {
  _id: string;
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
  createdAt: string;
}

export type Ingredient = {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  meta: string[];
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
};

export type Recipe = {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
  veryHealthy: boolean;
  cheap: boolean;
  veryPopular: boolean;
  sustainable: boolean;
  lowFodmap: boolean;
  weightWatcherSmartPoints: number;
  gaps: string;
  preparationMinutes: number;
  cookingMinutes: number;
  aggregateLikes: number;
  healthScore: number;
  creditsText: string;
  license: string;
  sourceName: string;
  pricePerServing: number;
  extendedIngredients: Ingredient[];
  id: number;
  title: string;
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  image: string;
  imageType: string;
  summary: string;
  cuisines: string[];
  dishTypes: string[];
  diets: string[];
  occasions: string[];
  instructions: string;
  originalId: null;
  spoonacularSourceUrl: string;
};

export type SearchRecipe = {
  id: number;
  title: string;
  image: string;
};

export type SearchIngredient = {
  id: number;
  name: string;
  image: string;
};

export type RecipeDetails = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nutrition: any;
  id: number;
  title: string;
  image: string;
  imageType: string;
  servings: number;
  readyInMinutes: number;
  license: string;
  sourceName: string;
  sourceUrl: string;
  spoonacularSourceUrl: string;
  healthScore: number;
  spoonacularScore: number;
  pricePerServing: number;
  analyzedInstructions: AnalyzedInstruction[];
  cheap: boolean;
  creditsText: string;
  cuisines: string[];
  dairyFree: boolean;
  diets: string[];
  gaps: string;
  glutenFree: boolean;
  instructions: string;
  ketogenic: boolean;
  lowFodmap: boolean;
  occasions: string[];
  sustainable: boolean;
  vegan: boolean;
  vegetarian: boolean;
  veryHealthy: boolean;
  veryPopular: boolean;
  whole30: boolean;
  weightWatcherSmartPoints: number;
  dishTypes: string[];
  extendedIngredients: ExtendedIngredient[];
  summary: string;
  aggregateLikes: number;
};

export type ExtendedIngredient = {
  aisle: string;
  amount: number;
  consitency: string;
  id: number;
  image: string;
  measures: {
    metric: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
    us: {
      amount: number;
      unitLong: string;
      unitShort: string;
    };
  };
  meta: string[];
  name: string;
  original: string;
  originalName: string;
  unit: string;
};

export type AnalyzedInstruction = {
  name: string;
  steps: RecipeStep[];
};

export type RecipeStep = {
  number: number;
  step: string;
  ingredients: RecipeIngredient[];
  equipment: RecipeEquipment[];
  length?: {
    number: number;
    unit: string;
  };
};

export type RecipeIngredient = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type RecipeEquipment = {
  id: number;
  name: string;
  localizedName: string;
  image: string;
};

export type IngredientDetails = {
  id: number;
  original: string;
  originalName: string;
  name: string;
  amount: number;
  unit: string;
  unitShort: string;
  unitLong: string;
  possibleUnits: string[];
  estimatedCost: {
    value: number;
    unit: string;
  };
  consistency: string;
  shoppingListUnits: string[];
  aisle: string;
  image: string;

  nutrition: {
    nutrients: {
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }[];
    properties: {
      name: string;
      amount: number;
      unit: string;
    }[];
    flavonoids: {
      name: string;
      amount: number;
      unit: string;
    }[];
    caloricBreakdown: {
      percentProtein: number;
      percentFat: number;
      percentCarbs: number;
    };
    weightPerServing: {
      amount: number;
      unit: string;
    };
  };
  categoryPath: string[];
};

export type SearchSuggestion = {
  id: number;
  title: string;
};

export type SearchIngredientSuggestion = {
  name: string;
  image: string;
};

interface UserRequestInfo {
  _id: string;
  name: string;
  username: string;
  email: string;
  cookingLevel: "beginner" | "intermediate" | "advanced" | string;
  avatar: string;
}

export interface UserRequestPending {
  _id: string;
  fromUserId: string;
  bio: string;
  toUserId: UserRequestInfo;
  status: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserRequestReceived {
  _id: string;
  fromUserId: UserRequestInfo;
  bio: string;
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserConnection {
  _id: string;
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
  createdAt: string;
}
