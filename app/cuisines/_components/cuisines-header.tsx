"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cuisines } from "@/lib/constants";
import { useSearchParams, useRouter } from "next/navigation";
import { Globe, ChefHat, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const CuisinesHeader = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const country = searchParams.get("country");

  const isExist = cuisines.some((item) => item.value === country);

  if (!country || !isExist) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <div className="relative mb-6">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-3xl rounded-full"></div>

          {/* Icon container */}
          <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 p-4 rounded-full border border-orange-200/50 shadow-lg">
            <AlertCircle className="h-12 w-12 text-orange-600" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
          Cuisine Not Found
        </h2>

        <p className="text-lg text-slate-600 max-w-md leading-relaxed">
          We&apos;re sorry, but we don&apos;t have information about cuisines
          from{" "}
          <span className="font-semibold text-orange-600 capitalize">
            {country}
          </span>
          .
        </p>

        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/50 rounded-xl">
          <p className="text-sm text-slate-600">
            Try exploring our available cuisines using the selector above
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-rose-500/5 rounded-2xl -m-4"></div>

      <div className="relative flex items-center gap-6 flex-col sm:flex-row justify-between p-4">
        {/* Left section - Title */}
        <div className="flex items-center gap-4">
          {/* Cuisine icon */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-rose-500/20 blur-lg rounded-full"></div>
            <div className="relative bg-gradient-to-r from-orange-100 to-rose-100 p-3 rounded-full border border-orange-200/50 shadow-md">
              <ChefHat className="h-6 w-6 text-orange-600" />
            </div>
          </div>

          {/* Title */}
          <div>
            <h2 className="font-bold text-2xl sm:text-3xl text-slate-800 capitalize flex items-center gap-2">
              <span className="bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                {country}
              </span>
              <span className="text-slate-700">Cuisines</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Discover authentic flavors and traditional recipes
            </p>
          </div>
        </div>

        {/* Right section - Select dropdown */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/10 to-rose-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          <div className="relative group">
            <Select
              onValueChange={(value) => {
                router.push(`/cuisines?country=${value}`);
              }}
              defaultValue={country}
            >
              <SelectTrigger
                className={cn(
                  "w-[240px] h-12 bg-white/80 backdrop-blur-sm border-2 border-slate-200 rounded-xl shadow-sm",
                  "hover:border-orange-300 hover:shadow-md hover:bg-white/90",
                  "focus:border-orange-400 focus:ring-2 focus:ring-orange-100 focus:shadow-lg",
                  "transition-all duration-200 group"
                )}
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-orange-500 transition-transform duration-200 group-hover:rotate-12" />
                  <SelectValue
                    placeholder="Select a Cuisine"
                    className="font-medium"
                  />
                </div>
              </SelectTrigger>

              <SelectContent className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-xl">
                <SelectGroup>
                  <SelectLabel className="flex items-center gap-2 px-3 py-2 text-slate-600 font-medium">
                    <ChefHat className="h-4 w-4 text-orange-500" />
                    Available Cuisines
                  </SelectLabel>

                  {cuisines.map((cuisine) => (
                    <SelectItem
                      key={cuisine.id}
                      value={cuisine.value}
                      className={cn(
                        "cursor-pointer px-3 py-2.5 mx-1 rounded-lg transition-all duration-200",
                        "hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 hover:text-orange-700",
                        "focus:bg-gradient-to-r focus:from-orange-100 focus:to-rose-100 focus:text-orange-800",
                        "data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-orange-500 data-[state=checked]:to-rose-500 data-[state=checked]:text-white"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                        <span className="font-medium capitalize">
                          {cuisine.label}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-orange-300/50 to-transparent"></div>
    </div>
  );
};

export default CuisinesHeader;
