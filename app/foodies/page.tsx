"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { User as UserIcon, AlertCircle } from "lucide-react";

import ConnectionUser from "@/components/core/connection-user";
import UserFilters from "../../components/home/UserFilters";

import { User } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";
import Header from "@/components/home/Header";
import { useAuth } from "@/contexts/auth-provider";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSocket } from "@/contexts/socket-provider";

interface Filters {
  search: string;
  cookingLevel: string;
  country: string;
}

const FoodiesPage = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Filter states
  const [filters, setFilters] = useState<Filters>({
    search: "",
    cookingLevel: "",
    country: "",
  });

  // Applied filters (used for API calls)
  const [appliedFilters, setAppliedFilters] = useState<Filters>({
    search: "",
    cookingLevel: "",
    country: "",
  });

  const { onlineUsers } = useSocket();
  const isOnline = (userId: string) => onlineUsers.find((id) => id === userId);
  const { user } = useAuth();

  const observerRef = useRef<HTMLDivElement | null>(null);
  const pageRef = useRef(1);

  // Reset page when filters change
  const resetPagination = () => {
    pageRef.current = 1;
    setHasMore(true);
  };

  const buildApiUrl = (pageNum: number, currentFilters: Filters) => {
    const params = new URLSearchParams({
      page: pageNum.toString(),
      limit: "10",
    });

    if (currentFilters.search.trim()) {
      params.append("search", currentFilters.search.trim());
    }
    if (currentFilters.cookingLevel) {
      params.append("cookingLevel", currentFilters.cookingLevel);
    }
    if (currentFilters.country.trim()) {
      params.append("country", currentFilters.country.trim());
    }

    return `${BASE_URL}/api/users?${params.toString()}`;
  };

  const fetchUsers = useCallback(
    async (
      pageNum: number,
      isInitial: boolean = false,
      filtersToUse: Filters = appliedFilters
    ) => {
      if (loadingMore && !isInitial) return;

      try {
        if (isInitial) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const response = await fetch(buildApiUrl(pageNum, filtersToUse), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch users: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();

        if (result.length === 0) {
          setHasMore(false);
        } else {
          setUsers((prevUsers) =>
            isInitial ? result : [...(prevUsers || []), ...result]
          );
        }

        if (isInitial) {
          setLoading(false);
        } else {
          setLoadingMore(false);
        }
      } catch (err) {
        setLoading(false);
        setLoadingMore(false);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Error fetching users:", err);
      }
    },
    [loadingMore, appliedFilters]
  );

  // Apply filters and fetch new data
  const handleApplyFilters = () => {
    setAppliedFilters(filters);
    resetPagination();
    setUsers(null);
    setError(null);
    fetchUsers(1, true, filters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const emptyFilters = { search: "", cookingLevel: "", country: "" };
    setFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    resetPagination();
    setUsers(null);
    setError(null);
    fetchUsers(1, true, emptyFilters);
  };

  // Remove individual filter
  const handleRemoveFilter = (filterKey: keyof Filters) => {
    const newFilters = { ...appliedFilters, [filterKey]: "" };
    setFilters(newFilters);
    setAppliedFilters(newFilters);
    resetPagination();
    setUsers(null);
    setError(null);
    fetchUsers(1, true, newFilters);
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const target = observerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loadingMore && !loading) {
            const nextPage = pageRef.current + 1;
            pageRef.current = nextPage;
            fetchUsers(nextPage, false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "20px",
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [fetchUsers, hasMore, loadingMore, loading]);

  useEffect(() => {
    fetchUsers(1, true);
  }, []);

  if (!user?._id) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-rose-50/30">
          <main className="max-w-6xl mx-auto px-6 sm:px-10 md:px-[74px] py-8">
            <div className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
                Discover Food Friends
              </h1>
              <p className="text-slate-600 text-lg">
                Connect with fellow food enthusiasts who share your culinary
                interests
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
              <div className="mb-4">
                <AlertCircle size={36} className="text-gray-500" />
              </div>
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                You&apos;re not logged in
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Please log in to access this page.
              </p>
              <Link
                href="/login"
                className={cn(
                  "group relative h-11 flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300",
                  "bg-slate-50 hover:bg-gradient-to-r hover:from-orange-50 hover:to-rose-50 border border-slate-200/80",
                  "focus:outline-none focus:ring-2 focus:ring-orange-200 focus:bg-gradient-to-r focus:from-orange-50 focus:to-rose-50",
                  "hover:border-orange-200/60"
                )}
              >
                <UserIcon
                  size={16}
                  className="text-slate-600 transition-colors duration-300 group-hover:text-orange-600"
                />
                <span className="text-sm hidden font-medium text-slate-700 transition-colors duration-300 group-hover:text-orange-600 sm:inline-block">
                  Login
                </span>
              </Link>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-rose-50/30">
        <main className="max-w-6xl mx-auto px-6 sm:px-10 md:px-[74px] py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
              Discover Food Friends
            </h1>
            <p className="text-slate-600 text-lg">
              Connect with fellow food enthusiasts who share your culinary
              interests
            </p>
          </div>

          {/* Search and Filter Controls */}
          <UserFilters
            filters={filters}
            appliedFilters={appliedFilters}
            onFiltersChange={handleFiltersChange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            onRemoveFilter={handleRemoveFilter}
          />

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-100 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full bg-slate-200 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                      </div>
                      <div className="flex-1">
                        <div className="relative h-5 bg-slate-200 rounded-md w-32 mb-2 overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                        <div className="relative h-4 bg-slate-200 rounded-md w-24 mb-1 overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                        <div className="relative h-3 bg-slate-200 rounded-md w-40 overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="relative h-9 w-24 bg-slate-200 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                      </div>
                      <div className="relative h-9 w-24 bg-slate-200 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle size={32} className="text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Something went wrong
              </h3>
              <p className="text-slate-600 mb-4 text-center max-w-md">
                {error}
              </p>
            </div>
          )}

          {/* Success State - Users List */}
          {!loading && !error && users && (
            <>
              <div className="flex flex-col gap-6">
                {users.map((user) => (
                  <ConnectionUser
                    isOnline={isOnline}
                    key={user._id}
                    user={user}
                  />
                ))}
              </div>

              {/* Loading More Indicator */}
              {loadingMore && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
                </div>
              )}

              {/* Infinite Scroll Trigger */}
              {hasMore && !loadingMore && (
                <div
                  ref={observerRef}
                  className="h-10 flex items-center justify-center"
                >
                  <div className="text-slate-400 text-sm">Loading more...</div>
                </div>
              )}

              {/* End of Results */}
              {!hasMore && users.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-slate-500 text-sm">
                    You&apos;ve reached the end of the list
                  </p>
                </div>
              )}

              {/* Empty State */}
              {users.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserIcon size={32} className="text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    No users found
                  </h3>
                  <p className="text-slate-600">
                    Try adjusting your search or filter criteria to find more
                    food friends!
                  </p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </>
  );
};

export default FoodiesPage;
