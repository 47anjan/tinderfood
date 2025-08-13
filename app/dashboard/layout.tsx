"use client";

import type React from "react";

import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { useAppSelector } from "@/store/hooks/hooks";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const isSidebarOpen = useAppSelector((store) => store.global.isSidebarOpen);

  return (
    <div className="flex h-screen ove">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div className="fixed backdrop-blur-[1px] inset-0 z-40 bg-gray-600/45 lg:hidden" />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
}

export default DashboardLayout;
