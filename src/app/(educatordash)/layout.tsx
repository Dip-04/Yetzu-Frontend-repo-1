"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import TrendingSection from "./components/TrendingSection";
import AssignmentsTable from "./components/AssignmentsTable";
import SchedulePanel from "./components/SchedulePanel";
import MySessions from "./components/MySessions";
import AssignmentsPage from "./components/AssignmentsPage";

export default function EducatorDashLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeView, setActiveView] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="min-h-screen bg-white">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="lg:pl-64">
          {activeView === "dashboard" && (
            <main className="p-4 sm:p-6 max-w-[1600px] mx-auto flex flex-col gap-4 sm:gap-6">
              <StatsGrid />

              <TrendingSection />

              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                <AssignmentsTable />
                <SchedulePanel />
              </div>
            </main>
          )}

          {activeView === "sessions" && <MySessions />}

          {activeView === "assignments" && <AssignmentsPage />}
        </div>
      </div>
    </div>
  );
}
