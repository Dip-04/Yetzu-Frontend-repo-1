"use client";

import React from "react";
import { STATS_DATA } from "../constants";

const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 bg-white border border-gray-200 rounded-xl p-4 sm:p-6 gap-4 sm:gap-6 relative">
      {STATS_DATA.map((stat, index) => (
        <div key={stat.label} className="relative flex flex-col gap-2 sm:gap-4">
          <p className="text-xs sm:text-sm text-black font-normal">
            {stat.label}
          </p>
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900">
            {stat.value}
          </p>

          {/* Vertical Divider */}
          {index !== STATS_DATA.length - 1 && (
            <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 w-px h-16 bg-gray-200 translate-x-[20px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;
