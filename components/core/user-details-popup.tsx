"use client";

import { User } from "@/lib/types";
import {
  User as UserIcon,
  MapPin,
  UserPlus,
  Eye,
  X,
  ChefHat,
  Heart,
  Leaf,
} from "lucide-react";
import { useState } from "react";

const UserDetailPopup = ({
  user,
  isOpen,
  onClose,
}: {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  const getCookingLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-orange-100 text-orange-700";
      case "professional":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 rounded-t-2xl z-20">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">User Profile</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 cursor-pointer rounded-full transition-colors"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* User Header */}
          <div className="flex items-start gap-6 mb-6">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-orange-100"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center ring-4 ring-orange-100">
                  <UserIcon size={32} className="text-orange-600" />
                </div>
              )}

              {/* Online indicator */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-3 border-white"></div>
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-800 mb-1">
                {user.name}
              </h3>
              <p className="text-slate-600 mb-2">@{user.username}</p>

              {/* Location */}
              {user.location?.city && (
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={16} className="text-slate-400" />
                  <span className="text-slate-600">
                    {user.location.city}, {user.location.country}
                  </span>
                </div>
              )}

              {/* Member since */}
              <p className="text-sm text-slate-500">
                Member since {formatDate(user.createdAt)}
              </p>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-800 mb-2">About</h4>
              <p className="text-slate-600 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Cooking Level */}
          <div className="mb-6">
            <h4 className="font-semibold text-slate-800 mb-3">
              Cooking Experience
            </h4>
            <div className="flex items-center gap-3">
              <ChefHat size={20} className="text-slate-400" />
              <span
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${getCookingLevelColor(
                  user.cookingLevel
                )}`}
              >
                {user.cookingLevel}
              </span>
            </div>
          </div>

          {/* Dietary Restrictions */}
          {user.dietaryRestrictions?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Leaf size={18} className="text-green-500" />
                Dietary Preferences
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.dietaryRestrictions.map((restriction, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 capitalize bg-green-50 text-green-700 rounded-full text-sm font-medium"
                  >
                    {restriction}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Favorite Foods */}
          {user.favoriteFoods?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <Heart size={18} className="text-rose-500" />
                Favorite Foods
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.favoriteFoods.map((food, index) => (
                  <span
                    key={index}
                    className="px-3 capitalize py-1.5 bg-rose-50 text-rose-700 rounded-full text-sm font-medium"
                  >
                    {food}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cuisine Preferences */}
          {user.cuisinePreferences?.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-slate-800 mb-3">
                Preferred Cuisines
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.cuisinePreferences.map((cuisine, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 capitalize bg-orange-50 text-orange-700 rounded-full text-sm font-medium"
                  >
                    {cuisine}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-100">
            <button className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-rose-500 text-white rounded-xl hover:from-orange-600 hover:to-rose-600 transition-all duration-300 font-medium">
              <UserPlus size={18} />
              Connect
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2.5 cursor-pointer border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDetails = ({ user }: { user: User }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleViewClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button
        onClick={handleViewClick}
        className="group cursor-pointer flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:border-orange-300 hover:bg-orange-50 transition-all duration-300"
      >
        <Eye size={16} className="transition-transform group-hover:scale-110" />
        <span className="font-medium">View</span>
      </button>
      <UserDetailPopup
        isOpen={showPopup}
        user={user}
        onClose={handleClosePopup}
      />
    </>
  );
};

export default UserDetails;
