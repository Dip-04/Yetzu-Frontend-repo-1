"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import OverViewStats from "./components/OverViewStats";
import RevenueChart from "./components/RevenueChart";
import RecentSessionsCards from "./components/RecentSessionsCards";
import LiveActivityFeed from "./components/LiveActivityFeed";
import AlertIssues from "./components/AlertIssues";
import SupportTickets from "./components/SupportTickets";
import SessionDetailsPanel from "../../components/SessionDetailsPanel";
import { Session } from "@/app/(admindash)/types/SessionType";
import { AdminAPI, asArray } from "@/lib/api";

export default function AdminDashboardPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await AdminAPI.getSessions({ page: 1, limit: 5 });
        setSessions(asArray(response).map((item: any, index: number) => {
          const rawDate = item.date || item.scheduledDate || item.startDateTime || item.createdAt;
          const status = item.status || item.Status || "Scheduled";
          
          let studentsCount = 0;
          const stu = item.students;
          if (typeof stu === 'number' && !isNaN(stu)) {
            studentsCount = stu;
          } else if (Array.isArray(stu)) {
            studentsCount = stu.length;
          } else if (typeof item.attendees === 'number' && !isNaN(item.attendees)) {
            studentsCount = item.attendees;
          } else if (typeof item.enrolledCount === 'number' && !isNaN(item.enrolledCount)) {
            studentsCount = item.enrolledCount;
          }
          
          return {
            id: item.sessionCode || item.id || item._id || `SESSION-${index + 1}`,
            title: item.title || item.sessionType || "Session",
            type: item.sessionType || item.type || "Webinar",
            educator: item.educator?.name || item.educatorName || item.mentorName || "Educator",
            students: studentsCount,
            attendees: studentsCount,
            date: rawDate ? new Date(rawDate).toLocaleDateString() : "TBD",
            dateTime: rawDate || undefined,
            startTime: item.startTime || "09:00 AM",
            endTime: item.endTime || "10:00 AM",
            status: status === "Upcoming" || status === "upcoming" ? "Scheduled" : status,
          };
        }) as Session[]);
      } catch {
        setSessions([]);
      }
    };
    fetchSessions();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Overview</h1>
          <p className="text-sm text-gray-500 font-medium mt-1">Monitor your platform's performance and key metrics</p>
        </div>
      </div>

      {/* --- STATS SECTION (KPI Cards) --- */}
      <OverViewStats />

      {/* --- RECENT SESSIONS CARDS SECTION --- */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-bold text-gray-900 tracking-tight">Recent Sessions</h2>
           <Link href="/a/sessions" className="text-xs font-bold text-[#042BFD] uppercase tracking-widest hover:underline">View Schedule</Link>
        </div>
        <RecentSessionsCards sessions={sessions} onSelect={setSelectedSession} />
      </div>

      {/* --- REVENUE SECTION --- */}
      <RevenueChart />

      {/* --- ACTIVITY & ALERTS SECTION --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <LiveActivityFeed />
        <AlertIssues />
      </div>

      {/* --- TICKETS SECTION --- */}
      <SupportTickets />

      {/* --- DETAILS PANEL OVERLAY --- */}
      {selectedSession && (
        <>
          <div 
            className="fixed inset-0 bg-[#021165]/40 backdrop-blur-sm z-[60] transition-opacity" 
            onClick={() => setSelectedSession(null)} 
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-500">
            <SessionDetailsPanel 
              session={selectedSession} 
              onClose={() => setSelectedSession(null)} 
            />
          </div>
        </>
      )}
      
      <div className="pb-10" />
    </div>
  );
}
