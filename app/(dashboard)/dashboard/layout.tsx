"use client";

import type React from "react";

import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen ">
      {/* Mobile sidebar overlay */}
      {true && (
        <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden" />
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
