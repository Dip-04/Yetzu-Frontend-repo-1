"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { ChevronRight, Download, Send, FileText, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { authApi } from "@/lib/axios";
import { EducatorAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

type CommentView = {
  id: string;
  author: string;
  date: string;
  text: string;
};

const formatDate = (value?: string) => {
  if (!value) return "-";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

const formatDateTime = (value?: string) => {
  if (!value) return "Just now";
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

const isOverdue = (dueDate?: string) => {
  if (!dueDate) return false;
  const d = new Date(dueDate);
  return !Number.isNaN(d.getTime()) && d.getTime() < Date.now();
};

export default function SubmissionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const submissionId = unwrappedParams.id;
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<CommentView[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await authApi.get(`/api/educator/assignments/submissions/${submissionId}`);
        const result = response?.data?.data || response?.data || response;
        setData(result);

        const existingComments = result.assignment?.comments || result.comments || [];
        const mapped: CommentView[] = (Array.isArray(existingComments) ? existingComments : []).map((c: any, i: number) => ({
          id: c.id || c._id || String(i),
          author: c.author || c.name || "Mentor",
          date: formatDateTime(c.createdAt || c.updatedAt || c.date),
          text: c.text || c.comment || "",
        }));
        setComments(mapped);
      } catch (err: any) {
        setError(err?.message || "Failed to load submission");
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [submissionId]);

  const handleAddComment = async () => {
    if (!commentText.trim() || !data) return;
    try {
      await EducatorAPI.addFeedback({ assignmentId: data.assignmentId, text: commentText });
      const newComment: CommentView = {
        id: crypto.randomUUID(),
        author: "You",
        date: formatDateTime(new Date().toISOString()),
        text: commentText,
      };
      setComments(prev => [...prev, newComment]);
      setCommentText("");
      toast.success("Feedback added.");
    } catch {
      toast.error("Failed to add feedback.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] p-6 flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading submission...</span>
        </div>
      </div>
    );
  }

  if (!data || error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-lg text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
            <AlertCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load submission</h2>
          <p className="text-sm text-gray-500">{error || "Submission not found."}</p>
        </div>
      </div>
    );
  }

  const assignment = data.assignment || data;
  const student = data.student || {};
  const session = data.session || {};
  const sessionTitle = session.title || data.sessionTitle || assignment?.session?.title || "Session";
  const assignmentTitle = assignment.title || data.assignmentTitle || "Assignment";
  const studentName = student.name || data.studentName || "Student";
  const description = assignment.description || data.assignmentDescription || "No description provided.";
  const dueDate = assignment.dueDate || data.dueDate || "";
  const submittedDocUrl = data.submitted_url || data.fileUrl || "";
  const submittedDocName = data.submitted_doc?.split("/").pop() || "Submission file";
  const resources = assignment.documentUrl
    ? [{ id: "resource-1", name: assignment.documentPath?.split("/").pop() || "Resource", url: assignment.documentUrl }]
    : [];
  const status = (data.status || "").toLowerCase();
  const needsReview = status === "submitted";
  const reviewDone = status === "reviewed" || status === "review done";

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 bg-[#FAFAFA] min-h-screen">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/e/sessions" className="hover:text-gray-700 transition-colors">Sessions</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate">{sessionTitle}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-snug">{assignmentTitle}</h1>
              {isOverdue(dueDate) && (
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
                  OVERDUE: {formatDate(dueDate)}
                </span>
              )}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0 relative">
                <Image src={`https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=random`} alt={studentName} fill className="object-cover" />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-gray-900">{studentName}</div>
                <div className="text-sm text-gray-500">{student.email || ""}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">DESCRIPTION</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed">{description}</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Student Submissions</h2>
            {submittedDocUrl ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <span className="text-[11px] font-bold">{submittedDocName.split(".").pop()?.toUpperCase() || "FILE"}</span>
                    </div>
                    <span className="text-[15px] font-medium text-gray-900 truncate">{submittedDocName}</span>
                  </div>
                  <a href={submittedDocUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No submission file available.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-bold text-gray-900">Uploaded Assignment</h2>
              <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">{resources.length}</span>
            </div>
            {resources.length === 0 ? (
              <p className="text-sm text-gray-500">No resources uploaded.</p>
            ) : (
              <div className="space-y-3">
                {resources.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                        <FileText className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-medium text-gray-900 truncate">{r.name}</span>
                    </div>
                    <a href={r.url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-2">
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-sm flex flex-col h-[500px]">
            <h2 className="text-lg font-bold text-gray-900 mb-6 shrink-0">Add Private Comment</h2>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 mb-6 custom-scrollbar">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">{comment.author}</span>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">{comment.date}</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed italic">{comment.text}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-sm text-gray-400 text-center pt-4">No comments yet.</p>
              )}
            </div>

            <div className="shrink-0 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder="Enter here"
                  className="w-full pl-4 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 bg-white shadow-sm transition-all"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors p-1"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 text-center">
                Private Comment are only visible to you and your mentor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
