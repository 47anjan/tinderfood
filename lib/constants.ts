export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
export const AUTH_TOKEN_KEY = "token";
export const BASE_URL_FOOD = "https://api.spoonacular.com";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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

export const categories = [
  {
    id: "83644",
    name: "Pizza",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029856/PC_Creative%20refresh/3D_bau/banners_new/Pizza.png",
    label: "restaurants curated for pizza",
  },
  {
    id: "83649",
    name: "Biryani",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667625/PC_Creative%20refresh/Biryani_2.png",
    label: "restaurants curated for biryani",
  },
  {
    id: "83637",
    name: "Burger",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Burger.png",
    label: "restaurants curated for burger",
  },

  {
    id: "83670",
    name: "Roll",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Rolls.png",
    label: "restaurants curated for roll",
  },
  {
    id: "80464",
    name: "Noodles",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029855/PC_Creative%20refresh/3D_bau/banners_new/Noodles.png",
    label: "restaurant curated for noodles",
  },

  {
    id: "83647",
    name: "Chinese",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029848/PC_Creative%20refresh/3D_bau/banners_new/Chinese.png",
    label: "restaurant curated for chinese",
  },
  {
    id: "83667",
    name: "Sandwich",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029860/PC_Creative%20refresh/3D_bau/banners_new/Sandwich.png",
    label: "restaurants curated for sandwich",
  },
  {
    id: "83656",
    name: "Cakes",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029845/PC_Creative%20refresh/3D_bau/banners_new/Cakes.png",
    label: "restaurant curated for cakes",
  },

  {
    id: "83646",
    name: "Indian",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1675667626/PC_Creative%20refresh/South_Indian_4.png",
    label: "restaurants curated for south indian",
  },
  {
    id: "80480",
    name: "Pasta",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029854/PC_Creative%20refresh/3D_bau/banners_new/Pasta.png",
    label: "restaurant curated for pasta",
  },

  {
    id: "83674",
    name: "Shakes",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Shakes.png",
    label: "restaurant curated for shakes",
  },
  {
    id: "80439",
    name: "Veg",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029858/PC_Creative%20refresh/3D_bau/banners_new/Pure_Veg.png",
    label: "restaurants curated for veg",
  },

  {
    id: "80395",
    name: "Salad",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029859/PC_Creative%20refresh/3D_bau/banners_new/Salad.png",
    label: "restaurant curated for salad",
  },

  {
    id: "80358",
    name: "Pastry",
    image:
      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029847/PC_Creative%20refresh/3D_bau/banners_new/Pastry.png",
    label: "restaurant curated for Pastry",
  },
];

export const menus = [
  "Chicken",
  "Vegetarian",
  "Breakfast",
  "Lunch",
  "Dinner",
  "Pasta",
  "Quick Meals",
  "Spicy",
  "Pizza",
  "Beef",
  "Comfort Food",
  "Dessert",
  "Chocolate",
  "Baking",
  "Seafood",
  "Sushi",
  "Salad",
  "Vegan",
  "Gluten-Free",
  "BBQ",
  "Healthy",
  "Snacks",
];

export const cuisineOptions = [
  "Italian",
  "Chinese",
  "Mexican",
  "Indian",
  "Japanese",
  "French",
  "Thai",
  "American",
  "Korean",
  "Spanish",
];

export const cuisines = [
  { id: 1, label: "Italian", value: "italian" },
  { id: 2, label: "Chinese", value: "chinese" },
  { id: 3, label: "Indian", value: "indian" },
  { id: 4, label: "Mexican", value: "mexican" },
  { id: 5, label: "Japanese", value: "japanese" },
  { id: 6, label: "Korean", value: "korean" },
  { id: 7, label: "French", value: "french" },
  { id: 8, label: "Thai", value: "thai" },
  { id: 9, label: "Spanish", value: "spanish" },
  { id: 10, label: "American", value: "american" },
];
