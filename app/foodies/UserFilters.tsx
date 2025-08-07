import React, { useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Filters {
  search: string;
  cookingLevel: string;
  country: string;
}

interface UserFiltersProps {
  filters: Filters;
  appliedFilters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  onRemoveFilter: (filterKey: keyof Filters) => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  filters,
  appliedFilters,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
  onRemoveFilter,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  // Handle individual filter changes
  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    handleFilterChange("search", value);
  };

  // Apply filters and close panel
  const handleApplyFilters = () => {
    onApplyFilters();
    setShowFilters(false);
  };

  // Clear filters and close panel
  const handleClearFilters = () => {
    onClearFilters();
    setShowFilters(false);
  };

  // Count active filters
  const activeFiltersCount = Object.values(appliedFilters).filter(
    (value) => value && value.toString().trim() !== ""
  ).length;

  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          placeholder="Search by name or username..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-white"
        />
      </div>

      {/* Filter Toggle and Apply Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            "flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg border transition-colors",
            showFilters
              ? "bg-orange-50 border-orange-200 text-orange-700"
              : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
          )}
        >
          <Filter size={18} />
          <span className="font-medium">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform",
              showFilters ? "rotate-180" : "rotate-0"
            )}
          />
        </button>

        <button
          onClick={handleApplyFilters}
          className="px-6 py-2 cursor-pointer bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
        >
          Search
        </button>

        {activeFiltersCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-800 cursor-pointer transition-colors"
          >
            <X size={16} />
            <span className="text-sm">Clear all</span>
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cooking Level Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Cooking Level
              </label>
              <select
                value={filters.cookingLevel}
                onChange={(e) =>
                  handleFilterChange("cookingLevel", e.target.value)
                }
                className="w-full cursor-pointer px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-white"
              >
                <option value="">All levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
            </div>

            {/* Country Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Country
              </label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 bg-white"
              >
                <option value="">All countries</option>
                <option value="united states">United States</option>
                <option value="india">India</option>
                <option value="bangladesh">Bangladesh</option>
                <option value="indonesia">Indonesia</option>
              </select>
            </div>
          </div>

          {/* Filter Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setShowFilters(false)}
              className="px-4 py-2 cursor-pointer text-slate-600 hover:text-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 cursor-pointer text-slate-600 hover:text-slate-800 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleApplyFilters}
              className="px-6 cursor-pointer py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {appliedFilters.search && (
            <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              <span>Search: &quot;{appliedFilters.search}&quot;</span>
              <button
                onClick={() => onRemoveFilter("search")}
                className="hover:text-orange-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {appliedFilters.cookingLevel && (
            <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              <span>Level: {appliedFilters.cookingLevel}</span>
              <button
                onClick={() => onRemoveFilter("cookingLevel")}
                className="hover:text-orange-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          )}
          {appliedFilters.country && (
            <div className="flex items-center gap-2 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
              <span>Country: {appliedFilters.country}</span>
              <button
                onClick={() => onRemoveFilter("country")}
                className="hover:text-orange-600 cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserFilters;
