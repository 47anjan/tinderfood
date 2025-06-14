"use client";
import { SearchRecipe } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Props {
  recipe: SearchRecipe;
}

const CuisineCard = ({ recipe }: Props) => {
  const [imageError, setImageError] = useState(false);

  // Demo fallback image - a food placeholder
  const demoImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='312' height='208' viewBox='0 0 312 208'%3E%3Crect width='312' height='208' fill='%23f8fafc'/%3E%3Cg transform='translate(156 104)'%3E%3Ccircle cx='0' cy='0' r='32' fill='%23e2e8f0'/%3E%3Cpath d='M-20-8h40v4h-40z' fill='%23cbd5e1'/%3E%3Cpath d='M-16-4h32v2h-32z' fill='%23cbd5e1'/%3E%3Cpath d='M-12 0h24v2h-24z' fill='%23cbd5e1'/%3E%3Cpath d='M-8 4h16v2h-16z' fill='%23cbd5e1'/%3E%3C/g%3E%3Ctext x='156' y='130' text-anchor='middle' font-family='system-ui' font-size='12' fill='%2364748b'%3ERecipe Image%3C/text%3E%3C/svg%3E";
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className={cn(
        "group relative block rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02]",
        "bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10",
        "hover:border-orange-200/50 hover:bg-white/90 transform-gpu"
      )}
    >
      {/* Image container with enhanced overlay effects */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageError ? demoImage : recipe?.image}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 will-change-transform"
          width={312}
          height={208}
          alt={recipe.title}
          onError={() => setImageError(true)}
        />

        {/* Multiple gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Floating action indicators */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200">
            <Heart className="h-4 w-4 text-rose-500 hover:fill-rose-500 transition-all duration-200" />
          </div>
          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg">
            <Star className="h-4 w-4 text-orange-500" />
          </div>
        </div>

        {/* Recipe type badge */}
        <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
          <div className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
            <div className="flex items-center gap-1">
              <ChefHat className="h-3 w-3" />
              <span>Recipe</span>
            </div>
          </div>
        </div>

        {/* Recipe title overlay */}
        <div className="absolute bottom-4 left-4 right-4   transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <h3 className="text-white  leading-tight line-clamp-2 drop-shadow-lg">
            {recipe.title}
          </h3>
        </div>

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent transform skew-x-12"></div>
      </div>

      {/* Card bottom section with additional info */}
      <div className="p-4 bg-gradient-to-r from-white/95 to-white/90 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-nowrap text-slate-600 ">
              Ready to cook
            </span>
          </div>

          <div className="flex will-change-transform items-center gap-1 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs">View</span>
            <svg
              className="h-3 w-3  will-change-transform transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/20 to-rose-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
    </Link>
  );
};

export default CuisineCard;
