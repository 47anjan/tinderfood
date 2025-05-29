export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const AUTH_TOKEN_KEY = "token";

export const cookingLevels = [
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

export const dietaryOptions = [
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

export const cuisineOptions = [
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
];

export const foodOptions = [
  "Pizza",
  "Biryani",
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

export const countries = [
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
