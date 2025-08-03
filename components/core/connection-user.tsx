"use client";
import { User } from "@/lib/types";
import {
  User as UserIcon,
  MapPin,
  UserPlus,
  Clock,
  Loader2,
} from "lucide-react";
import UserConnectionDetails from "./user-connection-details-popup";
import { useState } from "react";
import { BASE_URL } from "@/lib/constants";
import { useAuth } from "@/contexts/auth-provider";
import { cn } from "@/lib/utils";

interface UserProps {
  user: User;
  isOnline: (userId: string) => string | undefined;
}

const ConnectionUser = ({ user, isOnline }: UserProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const { user: currentUser } = useAuth();

  const handleConnect = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${BASE_URL}/api/request/send/interested/${user._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const result = await response.json();

      console.error(result);

      setIsConnected(true);
    } catch (error) {
      console.error("Error sending connection request:", error);
      alert("Failed to send connection request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      key={user._id}
      className="group relative bg-white rounded-2xl px-6 py-4 border border-slate-100 hover:border-orange-200 transition-all duration-300 "
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] to-rose-500/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative">
        {/* Avatar and Basic Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className=" w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300">
                  <UserIcon size={24} className="text-orange-600" />
                </div>
              )}

              {/* Online indicator */}
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-5 h-5  rounded-full border-2 border-white",
                  isOnline(user._id) ? "bg-green-500" : "bg-gray-300"
                )}
              ></div>
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-base sm:text-lg text-slate-800 group-hover:text-orange-600 transition-colors">
                {user.name}
              </h3>
              <div className="text-slate-500 mt-0.5 text-sm flex items-center gap-1">
                <span className="hidden sm:block">Cooking level: </span>
                <span className="px-2 text-xs block rounded-full bg-gradient-to-br capitalize from-orange-100 to-rose-100 ">
                  {user.cookingLevel}
                </span>
              </div>

              {/* Location */}
              {user.location?.city && (
                <div className="flex items-center gap-1 mt-1">
                  <MapPin size={12} className="text-slate-400" />
                  <span className="text-xs text-slate-500">
                    {user.location.city}, {user.location.country}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Connection Action */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <UserConnectionDetails
              handleConnect={handleConnect}
              isLoading={isLoading}
              isConnected={isConnected}
              user={user}
            />
            <>
              {isConnected ? (
                <button
                  disabled
                  className="flex  items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg border border-orange-200 cursor-not-allowed"
                >
                  <Clock size={16} />
                  <span className="font-medium hidden sm:block">Pending</span>
                </button>
              ) : (
                <>
                  {currentUser?._id && (
                    <button
                      onClick={handleConnect}
                      disabled={isLoading}
                      className="group cursor-pointer flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg hover:from-orange-600 hover:to-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <UserPlus
                          size={16}
                          className="transition-transform group-hover:scale-110"
                        />
                      )}
                      <span className="font-medium hidden sm:block">
                        {isLoading ? "Connecting..." : "Connect"}
                      </span>
                    </button>
                  )}
                </>
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConnectionUser;
