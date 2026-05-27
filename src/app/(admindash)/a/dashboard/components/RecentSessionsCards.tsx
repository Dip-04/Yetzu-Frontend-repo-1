"use client";

import React, { useMemo } from "react";
import { Session } from "@/app/(admindash)/types/SessionType";
import { Calendar, Users, Clock } from "lucide-react";

const vectorImages = [
  "/admin-dashboard/Vector (3).png",
  "/admin-dashboard/Vector (4).png",
  "/admin-dashboard/Vector (5).png",
];

interface RecentSessionsCardsProps {
  sessions: Session[];
  onSelect: (session: Session) => void;
}

const cardStyles = [
  { gradient: "bg-gradient-to-b from-[#E3DCFA] to-white" },
  { gradient: "bg-gradient-to-b from-[#DBF7F9] to-white" },
  { gradient: "bg-gradient-to-b from-[#FCF1DE] to-white" },
  { gradient: "bg-gradient-to-b from-[#DBF7F9] to-white" },
  { gradient: "bg-gradient-to-b from-[#E3DCFA] to-white" },
];

export default function RecentSessionsCards({ sessions, onSelect }: RecentSessionsCardsProps) {
  const shuffledImages = useMemo(() => {
    return sessions.map(() => vectorImages[Math.floor(Math.random() * vectorImages.length)]);
  }, [sessions]);

  if (!sessions || sessions.length === 0) {
    return (
      <div className="flex flex-wrap gap-[16px]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 min-w-[200px] h-[266px] bg-gray-50 rounded-[12px] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-[16px]">
      {sessions.slice(0, 5).map((session, index) => {
        const style = cardStyles[index % cardStyles.length];
        return (
          <div
            key={session.id}
            onClick={() => onSelect(session)}
            className="flex-1 min-w-[200px] h-[266px] flex flex-col rounded-[12px] cursor-pointer bg-white group overflow-hidden"
            style={{
              filter: "drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.02)) drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.08))",
            }}
          >
            {/* Top Area */}
            <div className={`w-full h-[70px] ${style.gradient} relative shrink-0`}>
              {/* Optional Texture Overlay */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay" />
              
              {/* Vector Image */}
              <div className="absolute left-4 top-4 w-12 h-12 flex items-center justify-center rounded-lg bg-white/50 backdrop-blur-sm border border-black/5 shadow-sm">
                <img src={shuffledImages[index]} alt="" className="w-8 h-8 object-contain" />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="w-full flex-grow flex flex-col justify-between p-4 bg-white rounded-b-[12px]">
              
              {/* Title Group */}
              <div className="flex flex-col gap-[14px]">
                <h3 className="text-[#0F141A] text-[14px] font-semibold leading-[120%] font-sans line-clamp-2">
                  {session.title}
                </h3>

                <div className="flex flex-col gap-[6px]">
                  {/* Date and Time Row */}
                  <div className="flex flex-row items-center gap-3">
                    <div className="flex flex-row items-center gap-1.5">
                      <Calendar size={12} className="text-[#868C98]" />
                      <span className="text-[#525866] text-[12px] font-normal leading-[120%] font-sans">
                        {session.date || "22 Feb, 2026"}
                      </span>
                    </div>

                    <div className="flex flex-row items-center gap-1.5">
                      <Clock size={12} className="text-[#647183]" />
                      <span className="text-[#525866] text-[12px] font-normal leading-[120%] font-sans">
                        {session.startTime}
                      </span>
                    </div>
                  </div>

                  {/* Enrollments container */}
                  <div className="flex flex-row items-center gap-1.5 mt-1">
                    <Users size={12} className="text-[#868C98]" />
                    <span className="text-[#525866] text-[12px] font-normal leading-[120%] font-sans">
                      {session.students} Students Enrolled
                    </span>
                  </div>
                </div>
              </div>

              {/* View Details Button */}
              <button 
                className="w-full h-[32px] border border-[#E6E6E6] rounded-[6px] flex items-center justify-center hover:bg-gray-50 transition-colors"
                onClick={(e) => { e.stopPropagation(); onSelect(session); }}
              >
                <span className="text-[#0F141A] text-[14px] font-medium leading-[20px] font-sans">
                  View Details
                </span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
