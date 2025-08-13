"use client";

import React, { useState } from "react";
import { Users, UserPlus, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

import { Friends, Pending, Requests } from "@/components/connections";

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
