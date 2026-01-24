"use client";

import React from "react";
import { TRENDING_SKILLS } from "../constants";
import { ChevronRight, ArrowRight } from "lucide-react";

const TrendingSection: React.FC = () => {
  return (
    <div className="relative group">
      {/* Container for scrollable cards */}
      <div className="flex overflow-x-auto gap-3 sm:gap-6 pb-2 no-scrollbar snap-x">
        {TRENDING_SKILLS.map((item) => (
          <div
            key={item.id}
            className="min-w-[260px] sm:min-w-[300px] md:min-w-[377px] bg-white border border-gray-200 rounded-xl overflow-hidden snap-center flex-shrink-0 hover:shadow-none transition-shadow duration-300"
          >
            {/* Gray placeholder area */}
            <div className="bg-gray-200 h-28 sm:h-40 w-full relative"></div>

            <div className="p-3 sm:p-4 flex flex-col gap-3 sm:gap-4">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-gray-500 leading-snug line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <button className="bg-[#042BFD] text-white text-[10px] sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-md shadow-blue-500/20 hover:bg-blue-700 transition-colors flex-shrink-0">
                  Join In
                </button>
              </div>

              <div className="flex items-center justify-between mt-1 sm:mt-2">
                <div className="flex items-center -space-x-2">
                  {item.images.slice(0, 3).map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="Participant"
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-white"
                    />
                  ))}
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 border border-white flex items-center justify-center text-[8px] sm:text-[10px] font-medium text-blue-800 z-10">
                    +4
                  </div>
                </div>

                <button className="flex items-center gap-1 text-[10px] sm:text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors">
                  Reschedule{" "}
                  <ChevronRight size={10} className="sm:w-3 sm:h-3 mt-0.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Scroll Arrow Button (Visual cue) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 hidden lg:flex items-center justify-center w-8 h-8 rounded-full bg-gray-800/80 text-white cursor-pointer hover:bg-gray-900 shadow-none">
        <ArrowRight size={16} />
      </div>
    </div>
  );
};

export default TrendingSection;
