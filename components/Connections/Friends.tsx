"use client";

import { User as UserIcon, AlertCircle } from "lucide-react";

import React, { useEffect } from "react";
import UserConnectionDetails from "../core/user-connection-popup";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { fetchConnections } from "@/store/slices/connectionSlice";

const Friends = () => {
  const {
    connections: users,
    loading,
    error,
  } = useAppSelector((state) => state.connections);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConnections());
  }, [dispatch]);

  const getCookingLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "advanced":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/30 to-rose-50/30">
      <main className="container mx-auto px-6 sm:px-10 md:px-[74px] py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-2">
            Friend Requests
          </h1>
          <p className="text-slate-600">People who want to connect with you</p>
        </div>

        {/* Loading State with Shimmer Effect */}
        {loading && (
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm overflow-hidden"
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
                      <div className="relative h-3 bg-slate-200 rounded-md w-20 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative h-10 w-24 bg-slate-200 rounded-xl overflow-hidden">
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
            <p className="text-slate-600 mb-4 text-center max-w-md">{error}</p>
          </div>
        )}

        {/* Success State - Users List */}
        {!loading && !error && users && (
          <>
            <div className="flex flex-col gap-6">
              {users?.map((user) => (
                <div
                  key={user._id}
                  className="bg-white rounded-2xl p-6 border border-slate-100 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-100"
                        />
                      </div>

                      <div className="flex-1">
                        {/* Name and Username */}
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800 text-lg">
                            {user.name}
                          </h3>
                          <span className="text-slate-500 text-sm">
                            @{user.username}
                          </span>
                        </div>

                        {/* Cooking Level Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getCookingLevelColor(
                              user.cookingLevel
                            )}`}
                          >
                            {user.cookingLevel.charAt(0).toUpperCase() +
                              user.cookingLevel.slice(1)}{" "}
                            Cook
                          </span>
                        </div>

                        {/* Request Message */}
                        <p className="text-slate-600 text-sm">{user.bio}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3">
                      <UserConnectionDetails user={user} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {users.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <UserIcon size={32} className="text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No pending requests
                </h3>
                <p className="text-slate-600 max-w-md mx-auto">
                  You&apos;re all caught up! New friend requests will appear
                  here when people want to connect with you.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Friends;
