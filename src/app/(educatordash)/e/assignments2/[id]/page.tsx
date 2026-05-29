"use client";

import React, { use } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  Calendar, 
  Video, 
  Clock, 
  Users, 
  FileText, 
  Download, 
  Trash2, 
  Plus, 
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Eye,
  ChevronLeft
} from "lucide-react";

const SUBMISSIONS_DATA = [
  { name: "Pradhyumn Dhondi", id: "STU-2837", type: "Webinar", status: "Submitted", submittedOn: "19:45:23:55/28 May 2026", due: "15 Jan 2024", reviewStatus: "Submitted", docs: 1 },
  { name: "Pradhyumn Dhondi", id: "STU-2837", type: "Webinar", status: "Submitted", submittedOn: "19:45:23:55/28 May 2026", due: "15 Jan 2024", reviewStatus: "Submitted", docs: 1 },
  { name: "Pradhyumn Dhondi", id: "STU-2837", type: "Webinar", status: "Submitted", submittedOn: "19:45:23:55/28 May 2026", due: "15 Jan 2024", reviewStatus: "Submitted", docs: 1 },
  { name: "Pradhyumn Dhondi", id: "STU-2837", type: "Webinar", status: "Submitted", submittedOn: "19:45:23:55/28 May 2026", due: "15 Jan 2024", reviewStatus: "Submitted", docs: 1 },
  { name: "Pradhyumn Dhondi", id: "STU-2837", type: "Webinar", status: "Submitted", submittedOn: "19:45:23:55/28 May 2026", due: "15 Jan 2024", reviewStatus: "Submitted", docs: 1 },
];

export default function AssignmentDetail2Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const assignmentId = resolvedParams.id;

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 bg-[#FAFAFA] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/e/sessions" className="hover:text-gray-700">Sessions</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium">Assignment Title Goes Here</span>
      </div>

      {/* Top Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Assignment Info */}
        <div className="lg:col-span-2 bg-white rounded-[20px] border border-gray-200 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">Assignment Title Goes Here</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-3xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 bg-gray-50/50 p-6 rounded-[16px] border border-gray-100 divide-x divide-gray-200">
            <div className="flex flex-col items-center justify-center text-center">
              <Calendar className="w-6 h-6 text-gray-400 mb-2" />
              <div className="text-sm font-medium text-gray-900">23 Feb, 2026</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Video className="w-6 h-6 text-gray-400 mb-2" />
              <div className="text-sm font-medium text-gray-900">Webinar</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="w-6 h-6 text-gray-400 mb-2" />
              <div className="text-sm font-medium text-gray-900">120 min</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Users className="w-6 h-6 text-gray-400 mb-2" />
              <div className="text-sm font-medium text-gray-900">12 out of 30</div>
            </div>
          </div>
        </div>

        {/* Right Card: Assignment Resources */}
        <div className="lg:col-span-1 bg-white rounded-[20px] border border-gray-200 p-8 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-bold text-gray-900">Assignment Resources</h2>
            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">3</span>
          </div>

          <div className="flex-1 space-y-3 mb-6">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-[12px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <span className="text-[10px] font-bold">PDF</span>
                </div>
                <span className="text-sm font-medium text-gray-900">Pre-Session Reading.pdf</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-gray-700 transition-colors"><Download className="w-5 h-5" /></button>
                <button className="hover:text-red-600 text-red-400 transition-colors"><Trash2 className="w-5 h-5" /></button>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-[#0A0A0A] hover:bg-black text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Resource
          </button>
        </div>
      </div>

      {/* Student Submissions Section */}
      <div className="mt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-[22px] font-bold text-gray-900 tracking-tight">Student Submissions</h2>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowUpDown className="w-4 h-4" /> Sort
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Filter className="w-4 h-4" /> Filter
            </button>
            <div className="relative flex-1 md:w-[320px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by assignment, session or student" 
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400 bg-white shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-[20px] overflow-hidden bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">STUDENT NAME</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">STUDENT ID</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SESSION TYPE</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">STATUS</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">SUBMITTED ON</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">DUE DATE</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">REVIEW STATUS</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">DOCUMENTS</th>
                  <th className="px-6 py-4 font-medium tracking-wider text-[11px] uppercase">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SUBMISSIONS_DATA.map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-5 text-gray-900 font-medium">{item.name}</td>
                    <td className="px-6 py-5 text-blue-600 font-medium">{item.id}</td>
                    <td className="px-6 py-5">
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[13px] font-medium">{item.type}</span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.status}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-gray-900 font-medium">{item.submittedOn}</td>
                    <td className="px-6 py-5 text-gray-500">{item.due}</td>
                    <td className="px-6 py-5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {item.reviewStatus}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="p-1.5 border border-gray-200 rounded text-gray-400">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-[13px]">{item.docs} Attached</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4 text-gray-400">
                        <button className="hover:text-gray-600 transition-colors"><Eye className="w-4 h-4" /></button>
                        <button className="hover:text-gray-600 transition-colors"><Download className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-[#FAFAFA]">
            <div className="text-sm text-gray-500">Showing 1–5 of 30 Submissions</div>
            <div className="flex items-center gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#021165] text-white text-sm font-medium">
                1
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 text-sm font-medium">
                2
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
