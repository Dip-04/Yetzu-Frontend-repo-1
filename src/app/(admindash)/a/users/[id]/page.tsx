"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  MoreHorizontal,
  Mail,
  Calendar,
  BookOpen,
  FileText,
  Award,
  AlertCircle,
  Clock,
  Download,
  ChevronUp,
  File,
  CheckCircle2,
  RefreshCw,
  Send
} from "lucide-react";
import { AdminAPI } from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

// Helper components
const Badge = ({ children, colorClass }: { children: React.ReactNode, colorClass: string }) => (
  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
    {children}
  </span>
);

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const userId = resolvedParams.id;
  
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await AdminAPI.getUserById(userId);
        const data = response?.data || response;
        if (!data || !data.id) {
          throw new Error(data?.message || "User not found");
        }
        setUserData(data);
      } catch (err: any) {
        console.error("Error fetching user:", err);
        setError(err?.response?.data?.message || err?.message || "Failed to load user");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        {error || "User not found"}
      </div>
    );
  }

  const u = userData;
  const s = u.summary || {};
  const initials = u.name ? u.name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase() : "U";

  // Data for Engagement Overview Chart
  // We'll mock it if not present, but try to use api data if available
  const chartData = u.engagementOverview?.series ? 
    u.engagementOverview.labels?.map((label: string, i: number) => ({
      name: label.split(' ')[0], // just month
      sessions: u.engagementOverview.series[0]?.data?.[i] || 0,
      usage: u.engagementOverview.series[1]?.data?.[i] || 0,
    })) || [] : [
    { name: 'Oct', sessions: 2, usage: 3 },
    { name: 'Nov', sessions: 3, usage: 4 },
    { name: 'Dec', sessions: 4, usage: 6 },
    { name: 'Jan', sessions: 6, usage: 5 },
    { name: 'Feb', sessions: 7, usage: 8 },
    { name: 'Mar', sessions: 3, usage: 4 },
  ];

  const programs = u.programsAndSessions || [
    { programName: "Research Methods Batch 12", type: "Cohort", educatorName: "Dr. Sarah Chen", sessionCount: 10, sessionsAttended: 8, attendance: 80, status: "Active" },
    { programName: "Academic Writing Fundamentals", type: "Webinar", educatorName: "Prof. James Wilson", sessionCount: 14, sessionsAttended: 12, attendance: 86, status: "Active" },
    { programName: "Publication Ethics", type: "1:1", educatorName: "Dr. Anita Roy", sessionCount: 5, sessionsAttended: 4, attendance: 80, status: "Completed" }
  ];

  const assignments = u.assignmentsAndDocuments || [
    { title: "Literature Review Paper", version: "v2", relatedSessionTitle: "Research Methods Batch 12", type: "PDF", status: "In Review", lastUpdated: "2 days ago", reviewer: "Dr. Sarah Chen", dueDate: "Apr 21, 2026" },
    { title: "Research Proposal Draft", version: null, relatedSessionTitle: "Research Methods Batch 12", type: "DOC", status: "Pending", lastUpdated: "5 days ago", reviewer: "Dr. Sarah Chen", dueDate: "Apr 28, 2026" },
    { title: "Academic Writing Essay", version: "v3", relatedSessionTitle: "Academic Writing Fundamer", type: "DOC", status: "Completed", lastUpdated: "1 week ago", reviewer: "Prof. James Wilson", dueDate: "Mar 30, 2026" },
    { title: "Publication Ethics Case Study", version: null, relatedSessionTitle: "Publication Ethics", type: "PDF", status: "Completed", lastUpdated: "4 months ago", reviewer: "Dr. Anita Roy", dueDate: "Nov 25, 2025" }
  ];

  const payments = u.billingAndPayments?.transactions || [
    { orderId: "INV-2601", plan: "Research Methods Batch 12", amount: 299, status: "Paid", method: "****4242", methodType: "visa", date: "Jan 12, 2026" },
    { orderId: "INV-2602", plan: "Academic Writing Fundamentals", amount: 199, status: "Paid", method: "****4242", methodType: "visa", date: "Dec 8, 2025" },
    { orderId: "INV-2603", plan: "Publication Ethics (1:1)", amount: 499, status: "Paid", method: "****7788", methodType: "mastercard", date: "Oct 30, 2025" },
    { orderId: "INV-2604", plan: "Premium Membership - Q1", amount: 149, status: "Paid", method: "****4242", methodType: "visa", date: "Jan 1, 2026" },
    { orderId: "INV-2605", plan: "Study Material Bundle", amount: 94, status: "Paid", method: "UPI", methodType: "upi", date: "Mar 1, 2026" }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/a/users" className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
          <ChevronLeft className="w-4 h-4" />
          Back to User Management
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-medium">{u.name}</span>
      </div>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-semibold">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-semibold text-gray-900">{u.name}</h1>
                <Badge colorClass="bg-green-100 text-green-700 border border-green-200">
                  {String(u.status || 'Active').charAt(0).toUpperCase() + String(u.status || 'Active').slice(1)}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Mail className="w-4 h-4" />
                {u.email}
              </div>
            </div>
          </div>
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 text-gray-500">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        <hr className="my-5 border-gray-100" />

        <div className="flex items-center divide-x divide-gray-200 text-sm">
          <div className="pr-6">
            <span className="text-gray-500">Joined: </span>
            <span className="font-medium text-gray-900">{u.joinedLabel || "Jan 12, 2026"}</span>
          </div>
          <div className="px-6">
            <span className="text-gray-500">Last Active: </span>
            <span className="font-medium text-gray-900">{u.lastActiveLabel || "2 hours ago"}</span>
          </div>
          <div className="px-6">
            <span className="text-gray-500">Total Spend: </span>
            <span className="font-medium text-gray-900 text-blue-600">{s.totalSpendLabel || "$1,240"}</span>
          </div>
          <div className="pl-6">
            <span className="text-gray-500">Active Programs: </span>
            <span className="font-medium text-gray-900">{s.activePrograms ?? 2}</span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-0.5">Sessions Attended</div>
            <div className="text-2xl font-semibold text-gray-900">{s.sessionsAttended ?? 24}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-0.5">Active Enrollments</div>
            <div className="text-2xl font-semibold text-gray-900">{s.activeEnrollments ?? 2}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-0.5">Assignment Completion</div>
            <div className="text-2xl font-semibold text-gray-900">{s.assignmentCompletion ?? "78%"}</div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-[20px] p-5 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-0.5">Certificates Earned</div>
            <div className="text-2xl font-semibold text-gray-900">{s.certificatesEarned ?? 3}</div>
          </div>
        </div>
      </div>

      {/* Middle Section: Chart + 3 Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Engagement Overview</h2>
            <p className="text-sm text-gray-500">Sessions attended & platform usage – last 6 months</p>
          </div>
          <div className="flex-1 min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend 
                  iconType="circle" 
                  iconSize={8} 
                  wrapperStyle={{ fontSize: '12px', color: '#6B7280', paddingTop: '20px' }}
                />
                <Line type="monotone" name="Sessions Attended" dataKey="sessions" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3, fill: '#3B82F6' }} activeDot={{ r: 5 }} />
                <Line type="monotone" name="Usage Hours" dataKey="usage" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3, fill: '#8B5CF6' }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Active Cohort</h3>
                <p className="text-xs text-gray-500">Dr. Sarah Chen</p>
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900 mb-2">Research Methods Batch 12</div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Next: Apr 22, 2026 – 3:00 PM IST
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm relative">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Pending Assignments</h3>
                  <p className="text-xs text-orange-500">Requires attention</p>
                </div>
              </div>
              <span className="text-3xl font-semibold text-orange-500">{s.pendingAssignments ?? 3}</span>
            </div>
            <div className="text-xs text-gray-600 mt-4">
              Next due: <span className="font-medium text-gray-900">Apr 21, 2026 – Literature Review</span>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-5 shadow-sm flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">Upcoming Deadlines</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Literature Review</span>
                <span className="text-gray-400">Apr 21, 2026</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Research Proposal Draf</span>
                <span className="text-gray-400">Apr 28, 2026</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">Data Analysis Repor</span>
                <span className="text-gray-400">May 5, 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs & Sessions Section */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Programs & Sessions</h2>
            <Badge colorClass="bg-blue-50 text-blue-700">3</Badge>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-50">
              <Calendar className="w-4 h-4" /> Assign Session
            </button>
            <ChevronUp className="w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Program Name</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Educator</th>
                <th className="px-5 py-4 font-medium">Sessions</th>
                <th className="px-5 py-4 font-medium">Attendance</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {programs.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <div className="font-medium text-gray-900">{p.programName || p.title}</div>
                    <div className="text-xs text-gray-500 mt-1">Started {p.startDate || "Jan 15, 2026"}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      <BookOpen className="w-3.5 h-3.5" /> {p.type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{p.educatorName || p.educator?.name}</td>
                  <td className="px-5 py-4 text-gray-600">{p.sessionsAttended || p.sessions}/{p.sessionCount || 10}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${p.attendance || 80}%` }}></div>
                      </div>
                      <span className="text-xs font-medium text-green-600">{p.attendance || 80}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <Badge colorClass={p.status === "Active" ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-100 text-gray-600 border border-gray-200"}>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600"><FileText className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignments & Documents Section */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Assignments & Documents</h2>
            <Badge colorClass="bg-orange-50 text-orange-600 border border-orange-100">3 pending</Badge>
          </div>
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Assignment</th>
                <th className="px-5 py-4 font-medium">Related Session</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Last Updated</th>
                <th className="px-5 py-4 font-medium">Reviewer</th>
                <th className="px-5 py-4 font-medium w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {assignments.map((a: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${a.type === 'PDF' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                        <File className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 flex items-center gap-2">
                          {a.title}
                          {a.version && <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded font-medium">{a.version}</span>}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Due {a.dueDate}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{a.relatedSessionTitle}</td>
                  <td className="px-5 py-4">
                    <Badge colorClass="bg-gray-100 text-gray-600">{a.type}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge colorClass={
                      a.status === 'Completed' ? "bg-green-50 text-green-700" :
                      a.status === 'In Review' ? "bg-yellow-50 text-yellow-700" :
                      "bg-gray-100 text-gray-600"
                    }>
                      {a.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-gray-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {a.lastUpdated}
                  </td>
                  <td className="px-5 py-4 text-gray-600">{a.reviewer}</td>
                  <td className="px-5 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600"><Download className="w-4 h-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 text-center border-t border-gray-100">
            <button className="text-blue-600 text-sm font-medium hover:underline">View All 5 Assignments</button>
          </div>
        </div>
      </div>

      {/* Payments & Billing Section */}
      <div className="bg-white border border-gray-200 rounded-[20px] shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Payments & Billing</h2>
            <Badge colorClass="bg-green-50 text-green-700 border border-green-100">Active</Badge>
          </div>
          <ChevronUp className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Total Paid</div>
              <div className="text-lg font-semibold text-blue-600">{s.totalSpendLabel || "$1,240"}</div>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Last Payment</div>
              <div className="text-sm font-semibold text-gray-900">{u.billingAndPayments?.lastPaymentDate || "Mar 1, 2026"}</div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Invoice ID</th>
                <th className="px-5 py-4 font-medium">Plan / Service</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Method</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {payments.map((p: any, i: number) => (
                <tr key={i} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4 text-blue-600 font-medium">{p.orderId}</td>
                  <td className="px-5 py-4 text-gray-900">{p.plan}</td>
                  <td className="px-5 py-4 font-semibold text-gray-900">${p.amount}</td>
                  <td className="px-5 py-4">
                    <Badge colorClass="bg-green-50 text-green-700">{p.status}</Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.methodType === 'visa' ? 'bg-blue-900 text-white' : p.methodType === 'mastercard' ? 'bg-orange-500 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        {p.methodType ? p.methodType.toUpperCase() : "CARD"}
                      </div>
                      <span className="text-gray-600">{p.method}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500">{p.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3 text-gray-400">
                      <button className="hover:text-gray-600"><Send className="w-4 h-4" /></button>
                      <button className="hover:text-gray-600"><Download className="w-4 h-4" /></button>
                      <button className="hover:text-gray-600"><RefreshCw className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
