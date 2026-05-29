"use client";

import React, { useState } from "react";
import { Search, CheckCircle2, Circle, ChevronLeft, ChevronRight, Eye, Download, Clock } from "lucide-react";
import Link from "next/link";

const SUBMISSIONS_DATA = [
  { id: "ASIGN-2024", session: "Thesis Chapter 3 - Literature I...", student: "Pradhyumn Dhondi", type: "Webinar", due: "15 Jan 2024", status: "Submitted", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "Research Paper Draft - Social", student: "Pradhyumn Dhondi", type: "Cohort", due: "15 Jan 2024", status: "Pending", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "Career Strategy Session - PhD", student: "Pradhyumn Dhondi", type: "Mentorship", due: "15 Jan 2024", status: "Review Done", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "Academic Writing Masterclass", student: "Pradhyumn Dhondi", type: "Cohort", due: "15 Jan 2024", status: "Pending", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "MBA Application Essay - Busir...", student: "Pradhyumn Dhondi", type: "Mentorship", due: "15 Jan 2024", status: "Pending", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "Thesis Chapter 3 - Literature I...", student: "Pradhyumn Dhondi", type: "Webinar", due: "15 Jan 2024", status: "Review Done", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "Literature Survey - Climate Ch...", student: "Pradhyumn Dhondi", type: "Webinar", due: "15 Jan 2024", status: "Review Done", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "PhD Guidance Session - Disse...", student: "Pradhyumn Dhondi", type: "Mentorship", due: "15 Jan 2024", status: "Submitted", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "Statistics for Research - SPSS", student: "Pradhyumn Dhondi", type: "Webinar", due: "15 Jan 2024", status: "Review Done", subDate: "22 Jan 2024" },
  { id: "ASIGN-2024", session: "Thesis Chapter 3 - Literature I...", student: "Pradhyumn Dhondi", type: "Webinar", due: "15 Jan 2024", status: "Pending", subDate: "22 Jan 2024" },
];

export default function Submissions2Page() {
  const [activeTab, setActiveTab] = useState("Pending");
  const [currentPage, setCurrentPage] = useState(1);

  const pendingCount = SUBMISSIONS_DATA.filter(item => item.status === "Pending" || item.status === "Submitted").length;
  const completedCount = SUBMISSIONS_DATA.filter(item => item.status === "Review Done").length;

  const filteredData = SUBMISSIONS_DATA.filter(item => {
    if (activeTab === "Pending") return item.status === "Pending" || item.status === "Submitted";
    if (activeTab === "Completed") return item.status === "Review Done";
    return true;
  });

  const itemsPerPage = 8;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to page 1 on tab change
  };

  const renderStatusBadge = (status: string) => {
    if (status === "Submitted") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-[13px] font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {status}
        </div>
      );
    }
    if (status === "Pending") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-yellow-200 bg-yellow-50 text-yellow-700 text-[13px] font-medium">
          <Clock className="w-3.5 h-3.5" />
          {status}
        </div>
      );
    }
    if (status === "Review Done") {
      return (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-[13px] font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          {status}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 bg-[#FAFAFA] min-h-screen">
      <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Submissions</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleTabChange("Pending")}
            className={`flex items-center gap-2 pb-4 border-b-2 transition-colors -mb-[1px] ${activeTab === "Pending" ? "border-blue-600 text-gray-900 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Pending <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">{pendingCount}</span>
          </button>
          <button 
            onClick={() => handleTabChange("Completed")}
            className={`flex items-center gap-2 pb-4 border-b-2 transition-colors -mb-[1px] ${activeTab === "Completed" ? "border-blue-600 text-gray-900 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Completed <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full font-medium">{completedCount}</span>
          </button>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto pb-3">
          <div className="relative w-full md:w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by assignment, session or student" 
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 bg-white"
            />
          </div>
        </div>
      </div>

      <div className="border border-gray-200 rounded-[20px] overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">ASSIGNMENT ID</th>
                <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SESSION</th>
                <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">STUDENT NAME</th>
                <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SESSION TYPE</th>
                <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">DUE DATE</th>
                <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">STATUS</th>
                <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SUBMISSION DATE</th>
                <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5 text-blue-600 font-medium">{item.id}</td>
                  <td className="px-6 py-5 text-gray-900 font-medium">{item.session}</td>
                  <td className="px-6 py-5 text-gray-900 font-medium">{item.student}</td>
                  <td className="px-6 py-5">
                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[13px] font-medium">{item.type}</span>
                  </td>
                  <td className="px-6 py-5 text-gray-500">{item.due}</td>
                  <td className="px-6 py-5">
                    {renderStatusBadge(item.status)}
                  </td>
                  <td className="px-6 py-5 text-gray-600">{item.subDate}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4 text-gray-400">
                      <Link href={`/e/submissions2/dummy-id-${i}`} className="hover:text-gray-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </Link>
                      {item.status !== "Pending" && (
                        <button className="hover:text-gray-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No submissions found for this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-[#FAFAFA]">
          <div className="text-sm text-gray-500">
            Showing {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} submissions
          </div>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button 
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page 
                    ? "bg-[#021165] text-white" 
                    : "border border-gray-200 text-gray-600 bg-white hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}