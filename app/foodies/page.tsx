"use client";
import React, { useEffect, useState } from "react";
import { User as UserIcon, AlertCircle } from "lucide-react";

import ConnectionUser from "@/components/core/connection-user";

import { User } from "@/lib/types";
import { BASE_URL } from "@/lib/constants";
import Header from "@/components/home/Header";

const FoodiesPage = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/users`, {
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
        setUsers(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-rose-50/30">
        {/* Main Content */}
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

          {/* Loading State with Shimmer Effect */}
          {loading && (
            <div className="flex flex-col gap-6">
              {/* Loading Skeletons with Shimmer */}
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 border border-slate-100 overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar Skeleton */}
                      <div className="relative w-16 h-16 rounded-full bg-slate-200 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                      </div>

                      <div className="flex-1">
                        {/* Name Skeleton */}
                        <div className="relative h-5 bg-slate-200 rounded-md w-32 mb-2 overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                        {/* Username Skeleton */}
                        <div className="relative h-4 bg-slate-200 rounded-md w-24 mb-1 overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                        {/* Location Skeleton */}
                        <div className="relative h-3 bg-slate-200 rounded-md w-40 overflow-hidden">
                          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                        </div>
                      </div>
                    </div>

                    {/* Button Skeleton */}
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
              {/* Suggestions Grid */}
              <div className="flex flex-col gap-6">
                {users.map((user) => (
                  <ConnectionUser key={user._id} user={user} />
                ))}
              </div>

              {/* Empty State */}
              {users.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserIcon size={32} className="text-orange-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    No suggestions yet
                  </h3>
                  <p className="text-slate-600">
                    Check back later for new food friends to connect with!
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
