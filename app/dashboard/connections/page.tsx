"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  Clock,
  AlertCircle,
  User as UserIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { fetchConnections } from "@/store/slices/connectionSlice";
import UserConnectionDetails from "@/components/core/user-connection-popup";
import ButtonCancelRequest from "@/components/connections/ButtonCancelRequest";

import { BASE_URL } from "@/lib/constants";
import { UserRequestPending, UserRequestReceived } from "@/lib/types";
import RequestActionButtons from "@/components/connections/RequestActionButtons";

const ConnectionsPage = () => {
  const [activeTab, setActiveTab] = useState("friends");

  const tabs = [
    {
      id: "friends",
      name: "Friends",
      description: "Your connections",
      icon: Users,
    },
    {
      id: "requests",
      name: "Requests",
      description: "Incoming requests",
      icon: UserPlus,
    },
    {
      id: "pending",
      name: "Pending",
      description: "Sent requests",
      icon: Clock,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Connections</h1>
        <p className="text-slate-600">Manage your professional network</p>
      </div>

      <nav className="flex gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "group relative cursor-pointer  flex items-center gap-4 rounded-xl px-3 py-3 flex-1 text-left",
                isActive
                  ? "bg-gradient-to-r from-orange-50 to-rose-50 text-orange-600  border border-orange-200/50"
                  : "text-slate-700 hover:bg-slate-50 hover:text-orange-600"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg",
                  isActive
                    ? "bg-gradient-to-br from-orange-100 to-rose-100 "
                    : "bg-slate-100 group-hover:bg-gradient-to-br group-hover:from-orange-100 group-hover:to-rose-100"
                )}
              >
                <Icon
                  size={18}
                  className={cn(
                    "transition-colors duration-200",
                    isActive
                      ? "text-orange-600"
                      : "text-slate-600 group-hover:text-orange-600"
                  )}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm">{tab.name}</span>
                <span className="text-xs text-slate-500 group-hover:text-slate-600">
                  {tab.description}
                </span>
              </div>
              {isActive && (
                <div className="absolute right-3 w-1 h-6 bg-gradient-to-b from-orange-500 to-rose-500 rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-8  bg-white rounded-xl border border-slate-200">
        {activeTab === "friends" && (
          <div>
            <Friends />
          </div>
        )}
        {activeTab === "requests" && (
          <div>
            <Requests />
          </div>
        )}
        {activeTab === "pending" && (
          <div>
            <Pending />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConnectionsPage;

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

const Pending = () => {
  const [requests, setRequests] = useState<UserRequestPending[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/user/requests/pending`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch requests: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        setRequests(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, []);
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
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
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 font-medium shadow-lg ">
              Try Again
            </button>
          </div>
        )}

        {/* Success State - Requests List */}
        {!loading && !error && requests && (
          <>
            <div className="flex flex-col gap-6">
              {requests?.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-2xl p-6 border border-slate-100 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={req.toUserId.avatar}
                          alt={req.toUserId.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-100"
                        />
                      </div>

                      <div className="flex-1">
                        {/* Name and Username */}
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800 text-lg">
                            {req.toUserId.name}
                          </h3>
                          <span className="text-slate-500 text-sm">
                            @{req.toUserId.username}
                          </span>
                        </div>

                        {/* Cooking Level Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getCookingLevelColor(
                              req.toUserId.cookingLevel
                            )}`}
                          >
                            {req.toUserId.cookingLevel.charAt(0).toUpperCase() +
                              req.toUserId.cookingLevel.slice(1)}{" "}
                            Cook
                          </span>
                          <span className="text-slate-400 text-xs">
                            • {formatTimeAgo(req.createdAt)}
                          </span>
                        </div>

                        {/* Request Message */}
                        <p className="text-slate-600 text-sm">
                          {req.toUserId.bio}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <ButtonCancelRequest requestId={req._id} />
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {requests.length === 0 && (
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

const Requests = () => {
  const [requests, setRequests] = useState<UserRequestReceived[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getRequests = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/api/user/requests/received`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch requests: ${response.status} ${response.statusText}`
          );
        }

        const result = await response.json();
        setRequests(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        console.error("Error fetching requests:", err);
      } finally {
        setLoading(false);
      }
    };

    getRequests();
  }, []);
  const getCookingLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
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

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
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
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 font-medium shadow-lg ">
              Try Again
            </button>
          </div>
        )}

        {/* Success State - Requests List */}
        {!loading && !error && requests && (
          <>
            <div className="flex flex-col gap-6">
              {requests.map((req) => (
                <div
                  key={req._id}
                  className="bg-white rounded-2xl p-6 border border-slate-100 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="relative">
                        <img
                          src={req.fromUserId.avatar}
                          alt={req.fromUserId.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-100"
                        />
                      </div>

                      <div className="flex-1">
                        {/* Name and Username */}
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-slate-800 text-lg">
                            {req.fromUserId.name}
                          </h3>
                          <span className="text-slate-500 text-sm">
                            @{req.fromUserId.username}
                          </span>
                        </div>

                        {/* Cooking Level Badge */}
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getCookingLevelColor(
                              req.fromUserId.cookingLevel
                            )}`}
                          >
                            {req.fromUserId.cookingLevel
                              .charAt(0)
                              .toUpperCase() +
                              req.fromUserId.cookingLevel.slice(1)}{" "}
                            Cook
                          </span>
                          <span className="text-slate-400 text-xs">
                            • {formatTimeAgo(req.createdAt)}
                          </span>
                        </div>

                        {/* Request Message */}
                        <p className="text-slate-600 text-sm">
                          {req.fromUserId.bio}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <RequestActionButtons requestId={req._id} />
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {requests.length === 0 && (
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
