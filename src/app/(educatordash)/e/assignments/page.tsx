"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, CheckCircle2, Circle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { authApi } from "@/lib/axios";
import { asArray } from "@/lib/api";

type AssignmentItem = {
  id: string;
  title: string;
  description: string;
  sessionTitle: string;
  sessionType: string;
  dueDate: string;
  status: string;
  submittedCount: number;
  totalStudents: number;
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const normalizeStatus = (status: string) => {
  const s = status.toLowerCase();
  if (s === "completed" || s === "review done" || s === "reviewed") return "Completed";
  return "Active";
};

export default function AssignmentsPage() {
  const [activeTab, setActiveTab] = useState("Active");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await authApi.post("/api/educator/assignments/list", { status: "published" });
        const list = asArray(response.data);
        const mapped: AssignmentItem[] = list.map((item: any) => ({
          id: item.id || item._id || "",
          title: item.title || "Untitled",
          description: item.description || "",
          sessionTitle: item.session?.title || item.sessionTitle || "",
          sessionType: item.session?.sessionType || item.sessionType || "Webinar",
          dueDate: item.dueDate || "",
          status: normalizeStatus(item.status),
          submittedCount: item.submissionStats?.submitted || item.submissions?.length || 0,
          totalStudents: item.assignedStudents?.length || item.submissionStats?.total || 0,
        }));
        setAssignments(mapped);
      } catch {
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const filteredData = assignments.filter(item => {
    if (activeTab !== "All" && item.status !== activeTab) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.sessionTitle.toLowerCase().includes(q);
  });

  const activeCount = assignments.filter(a => a.status === "Active").length;
  const completedCount = assignments.filter(a => a.status === "Completed").length;

  const itemsPerPage = 8;
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 bg-[#FAFAFA] min-h-screen">
      <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Assignments</h1>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-gray-200">
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleTabChange("Active")}
            className={`flex items-center gap-2 pb-4 border-b-2 transition-colors -mb-[1px] ${activeTab === "Active" ? "border-blue-600 text-gray-900 font-medium" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
          >
            Active <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded-full font-medium">{activeCount}</span>
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
              placeholder="Search by assignment, session"
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 bg-white"
            />
          </div>
          <Link href="/e/assignments/create" className="flex items-center gap-2 bg-[#000520] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#031b9c] transition-all whitespace-nowrap shadow-sm">
            <Plus className="w-4 h-4" /> New Assignment
          </Link>
        </div>
      </div>

      <div className="border border-gray-200 rounded-[20px] overflow-hidden bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">ASSIGNMENT ID</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">ASSIGN DETAILS</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">LINKED SESSION</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SESSION TYPE</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">DUE DATE</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">STATUS</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SUBMISSIONS</th>
                    <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-blue-600 font-medium">{item.id.substring(0, 8)}...</td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-500 mt-1 truncate max-w-[200px]">{item.description.length > 60 ? item.description.slice(0, 60) + "..." : item.description}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium max-w-[200px] truncate">{item.sessionTitle}</td>
                      <td className="px-6 py-4">
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[13px] font-medium">{item.sessionType}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">{formatDate(item.dueDate)}</td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${
                          item.status === 'Completed' ? 'bg-green-50 border-green-200 text-green-700' : 'border-blue-200 text-blue-600'
                        }`}>
                          {item.status === 'Completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
                          {item.status}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.submittedCount} out of {item.totalStudents}</td>
                      <td className="px-6 py-4">
                        <Link href={`/e/assignments/${item.id}`} className="inline-flex items-center justify-center px-5 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {paginatedData.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                        No assignments found for this status.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-[#FAFAFA]">
              <div className="text-sm text-gray-500">
                Showing {totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}&ndash;{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} Assignments
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
          </>
        )}
      </div>
    </div>
  );
}
