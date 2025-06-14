import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="pt-6 px-4 sm:px-10 md:px-[74px] w-full">
      <div className="relative isolate group">
        {/* Background Image with Enhanced Effects */}
        <div className="relative overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="/food.webp"
            width={1600}
            height={900}
            alt="Delicious food spread showcasing various cuisines"
            className="h-[300px] sm:h-[400px] md:h-[500px] w-full object-cover transition-transform will-change-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/10 rounded-3xl"></div>
        </div>

        {/* Content Container */}
        <div className="absolute inset-0 flex items-center justify-center flex-col text-center px-4 sm:px-8 md:px-12 rounded-3xl">
          {/* Main Content */}
          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full text-white text-xs font-medium shadow-lg">
              <Sparkles className="h-3 w-3 text-orange-300" />
              <span>Thousands of Recipes Available</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
              <span className="block">Discover Your</span>
              <span className="block text-orange-300">Next Favorite Meal</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed">
              Explore thousands of recipes tailored to your taste and lifestyle.
            </p>
            <p className="text-sm sm:text-base text-white/75 mb-8 max-w-xl mx-auto">
              From comfort classics to exotic adventures.
            </p>

            {/* CTA Button */}
            <Link
              href="/cuisines?country=indian"
              className={cn(
                "group relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold rounded-full shadow-xl transition-all duration-200",
                "hover:from-orange-400 hover:to-rose-400 hover:shadow-2xl hover:scale-105",
                "focus:outline-none focus:ring-2 focus:ring-white/30",
                "active:scale-95 will-change-transform"
              )}
            >
              <span className="relative z-10">Try New Cuisines</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6 mt-6 text-white/70 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                <span>1M+ recipes</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                <span>Updated daily</span>
              </div>
              <div className="w-px h-3 bg-white/30"></div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                <span>All skill levels</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
