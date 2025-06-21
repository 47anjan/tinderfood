"use client";
import { User } from "@/lib/types";
import {
  User as UserIcon,
  MapPin,
  UserPlus,
  X,
  Check,
  Clock,
} from "lucide-react";
interface UserProps {
  user: User;
}

const Buttons = () => {
  return (
    <>
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg border border-green-200 cursor-not-allowed"
      >
        <Check size={16} />
        <span className="font-medium">Connected</span>
      </button>
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-orange-50 text-orange-600 rounded-lg border border-orange-200 cursor-not-allowed"
      >
        <Clock size={16} />
        <span className="font-medium">Pending</span>
      </button>
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-500 rounded-lg border border-gray-200 cursor-not-allowed"
      >
        <X size={16} />
        <span className="font-medium">Rejected</span>
      </button>
      <button className="group flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-lg hover:from-orange-600 hover:to-rose-600 transition-all duration-300 ">
        <UserPlus
          size={16}
          className="transition-transform group-hover:scale-110"
        />
        <span className="font-medium">Connect</span>
      </button>
      <button className="flex items-center gap-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
        <Check size={14} />
        Accept
      </button>
      <button className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
        <X size={14} />
        Reject
      </button>
    </>
  );
};

const ConnectionUser = ({ user }: UserProps) => {
  return (
    <div
      key={user._id}
      className="group relative bg-white rounded-2xl p-6 border border-slate-100 hover:border-orange-200 transition-all duration-300 "
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
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center ring-2 ring-orange-100 group-hover:ring-orange-200 transition-all duration-300">
                  <UserIcon size={24} className="text-orange-600" />
                </div>
              )}

              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg text-slate-800 group-hover:text-orange-600 transition-colors">
                {user.name}
              </h3>
              <p className="text-slate-500 text-sm">@{user.username}</p>

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
            <Buttons />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ConnectionUser;
