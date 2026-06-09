"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Calendar,
  Video,
  Clock,
  Users,
  FileText,
  Download,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  CheckCircle2,
  Eye,
  ChevronLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { EducatorAPI, asArray } from "@/lib/api";

type SubmissionRow = {
  id: string;
  studentName: string;
  studentId: string;
  sessionType: string;
  status: string;
  submittedOn: string;
  dueDate: string;
  reviewStatus: string;
  docs: number;
  fileUrl?: string;
};

type Resource = {
  id: string;
  name: string;
  url?: string;
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString("en-GB", {
    day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
};

const toDownloadUrl = (value?: string) => {
  if (!value) return undefined;
  const url = String(value);
  if (/^https?:\/\//i.test(url)) return url;
  return `https://rvleyzlrzxdkgfyqrvzy.supabase.co/storage/v1/object/public/${url.replace(/^\/+/, "")}`;
};

export default function AssignmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const assignmentId = resolvedParams.id;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await EducatorAPI.getAssignmentById(assignmentId);
        const payload = response?.data ?? response;
        const base = payload?.assignment ?? payload?.data ?? payload;
        setData(base);
      } catch (err: any) {
        setError(err?.message || "Failed to load assignment");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [assignmentId]);

  if (loading) {
    return (
      <div className="p-6 md:p-8 min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading assignment...</span>
        </div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div className="p-6 md:p-8 min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-lg text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load assignment</h2>
          <p className="text-sm text-gray-500">{error || "Assignment not found."}</p>
        </div>
      </div>
    );
  }

  const title = data.title || "Assignment";
  const description = data.description || "No description provided.";
  const sessionTitle = data.session?.title || data.sessionTitle || "Session";
  const sessionType = data.session?.sessionType || data.sessionType || "Webinar";
  const dueDate = data.dueDate || "";
  const resources: Resource[] = [
    ...(data.documentUrl ? [{
      id: "resource-primary",
      name: data.documentPath?.split("/").pop() || "Resource",
      url: toDownloadUrl(data.documentUrl),
    }] : []),
    ...asArray(data.resources || data.files || data.attachments).map((r: any, i: number) => ({
      id: String(r.id || r._id || i),
      name: r.name || r.title || "Resource",
      url: toDownloadUrl(r.url || r.fileUrl || r.documentUrl || r.path),
    })),
  ];
  const submissions: SubmissionRow[] = asArray(data.submissions || data.submittedFiles || data.documents).map((s: any, i: number) => {
    const fileUrl = toDownloadUrl(s.submitted_url || s.fileUrl || s.documentUrl || s.url || s.submitted_doc || s.documentPath || s.path);
    const docsCount = s.submitted_url || s.fileUrl || s.documentUrl || s.url || s.submitted_doc || s.documentPath || s.path ? 1 : 0;
    return {
      id: String(s.id || s._id || i),
      studentName: s.studentName || s.student?.name || "Student",
      studentId: s.studentId || s.student?.id || s.student?.userId || "-",
      sessionType: data.session?.sessionType || data.sessionType || "Webinar",
      status: s.status === "reviewed" || s.status === "review done" ? "Reviewed" : "Submitted",
      submittedOn: formatDateTime(s.submittedAt || s.submissionDate || s.createdAt),
      dueDate: formatDate(data.dueDate),
      reviewStatus: s.status === "reviewed" || s.status === "review done" ? "Reviewed" : "Pending",
      docs: docsCount,
      fileUrl,
    };
  });
  const submissionStats = data.submissionStats || { total: submissions.length, submitted: submissions.filter((s: SubmissionRow) => s.status !== "Pending").length };
  const totalStudents = data.assignedStudents?.length || submissionStats.total || 0;
  const submittedCount = submissionStats.submitted || submissions.length;

  return (
    <div className="p-6 md:p-8 space-y-6 bg-[#FAFAFA] min-h-screen">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <Link href="/e/sessions" className="hover:text-gray-700">Sessions</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate">{title}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[20px] border border-gray-200 p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{title}</h1>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-3xl">{description}</p>
          </div>
          <div className="grid grid-cols-4 gap-4 bg-gray-50/50 p-6 rounded-[16px] border border-gray-100 divide-x divide-gray-200">
            <div className="flex flex-col items-center justify-center text-center">
              <Calendar className="w-6 h-6 text-gray-400 mb-2" />
              <div className="text-sm font-medium text-gray-900">{formatDate(dueDate)}</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Video className="w-6 h-6 text-gray-400 mb-2" />
              <div className="text-sm font-medium text-gray-900">{sessionType}</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Clock className="w-6 h-6 text-gray-400 mb-2" />
              <div className="text-sm font-medium text-gray-900">N/A</div>
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              <Users className="w-6 h-6 text-gray-400 mb-2" />
              <div className="text-sm font-medium text-gray-900">{submittedCount} out of {totalStudents}</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 bg-white rounded-[20px] border border-gray-200 p-8 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-lg font-bold text-gray-900">Assignment Resources</h2>
            <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">{resources.length}</span>
          </div>
          <div className="flex-1 space-y-3 mb-6">
            {resources.length === 0 ? (
              <p className="text-sm text-gray-500">No resources uploaded.</p>
            ) : (
              resources.map((r) => (
                <div key={r.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-[12px]">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <span className="text-[10px] font-bold">PDF</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 truncate">{r.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 shrink-0 ml-2">
                    {r.url && (
                      <a href={r.url} target="_blank" rel="noreferrer" className="hover:text-gray-700 transition-colors">
                        <Download className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          <button className="w-full py-4 bg-[#0A0A0A] hover:bg-black text-white rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Resource
          </button>
        </div>
      </div>

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
          {submissions.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500">No submissions yet.</div>
          ) : (
            <>
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
                    {submissions.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-5 text-gray-900 font-medium">{item.studentName}</td>
                        <td className="px-6 py-5 text-blue-600 font-medium">{item.studentId.substring(0, 8)}...</td>
                        <td className="px-6 py-5">
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-[13px] font-medium">{item.sessionType}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {item.status}
                          </div>
                        </td>
                        <td className="px-6 py-5 text-gray-900 font-medium">{item.submittedOn}</td>
                        <td className="px-6 py-5 text-gray-500">{item.dueDate}</td>
                        <td className="px-6 py-5">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-medium ${
                            item.reviewStatus === "Reviewed"
                              ? "border-green-200 bg-green-50 text-green-700"
                              : "border-yellow-200 bg-yellow-50 text-yellow-700"
                          }`}>
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
                            {item.fileUrl && (
                              <a href={item.fileUrl} target="_blank" rel="noreferrer" className="hover:text-gray-600 transition-colors" title="View">
                                <Eye className="w-4 h-4" />
                              </a>
                            )}
                            {item.fileUrl && (
                              <a href={item.fileUrl} download target="_blank" rel="noreferrer" className="hover:text-gray-600 transition-colors" title="Download">
                                <Download className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-[#FAFAFA]">
                <div className="text-sm text-gray-500">Showing 1&ndash;{submissions.length} of {submissions.length} Submissions</div>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 bg-white hover:bg-gray-50 disabled:opacity-50" disabled>
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#021165] text-white text-sm font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 bg-white hover:bg-gray-50" disabled>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
