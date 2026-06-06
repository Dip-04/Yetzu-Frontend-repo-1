"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Session } from '../types';
import { Eye, Users, ChevronLeft, ChevronRight, Loader2, CheckCircle2, Circle, PlayCircle } from 'lucide-react';
import { shortenId } from '@/lib/utils/shortenId';

const hasActiveRescheduleRequest = (session: Session) =>
  (session.rescheduleRequests || []).some((request: any) =>
    !["approved", "accepted", "rejected", "cancelled", "completed"].includes(String(request.status || request.action || "pending").toLowerCase()),
  );

interface SessionsListProps {
  sessions: Session[];
  onViewDetails?: (session: Session) => void;
  loading?: boolean;
}

const ITEMS_PER_PAGE = 10;

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; icon?: React.ReactNode }> = {
    Ongoing: { bg: "bg-[#ECFDF5]", text: "text-[#007A55]" },
    Scheduled: { bg: "bg-[#EFF6FF]", text: "text-[#1447E6]" },
    Completed: { bg: "bg-[#F3F4F6]", text: "text-[#4A5565]" },
    Missed: { bg: "bg-[#FEF2F2]", text: "text-[#DC2626]" },
  };
  const c = config[status] || { bg: "bg-[#F3F4F6]", text: "text-[#717182]" };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded ${c.bg} ${c.text}`}
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", lineHeight: "16px", letterSpacing: "0.0644531px" }}
    >
      {status}
    </span>
  );
}

export default function SessionsList({ sessions, onViewDetails, loading: externalLoading }: SessionsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [internalLoading] = useState(false);

  const totalPages = Math.ceil(sessions.length / ITEMS_PER_PAGE);
  
  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sessions.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, sessions]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const loading = internalLoading || externalLoading;

  const gridCols = "grid-cols-[130px_1fr_110px_70px_130px_120px_90px]";
  const columns = [
    { key: "id", label: "Session ID" },
    { key: "title", label: "Session Title" },
    { key: "type", label: "Type" },
    { key: "students", label: "" },
    { key: "date", label: "Date" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  if (loading) {
    return (
      <div className="border border-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden bg-white">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">Loading sessions...</span>
        </div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="border border-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden bg-white">
        <div className="flex items-center justify-center py-12 text-[#717182] text-sm">
          No sessions found
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden bg-white">
      {/* Header */}
      <div
        className={`grid ${gridCols} gap-x-4 items-center bg-[#F8F9FA] border-b border-[rgba(0,0,0,0.1)]`}
        style={{ height: "45.5px" }}
      >
        {columns.map((col) => (
          <div key={col.key} className="flex items-center px-4 h-full">
            <span
              className="text-[14px] font-medium text-[#717182]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
            >
              {col.key === "students" ? (
                <Users size={14} className="mx-auto" />
              ) : (
                col.label
              )}
            </span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="divide-y divide-[rgba(0,0,0,0.1)]">
        {paginatedSessions.map((session, index) => (
          <div
            key={session.id}
            className={`grid ${gridCols} gap-x-4 items-center transition-colors hover:bg-gray-50 cursor-pointer`}
            style={{ height: "46px" }}
            onClick={() => onViewDetails?.(session)}
          >
            <div className="flex items-center px-4">
              <span
                className="text-[14px] font-medium text-[#0A0A0A]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
                title={session.id}
              >
                {shortenId(session.id)}
              </span>
            </div>
            <div className="flex items-center px-4">
              <span
                className="text-[14px] text-[#0A0A0A] truncate"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
              >
                {session.title}
                {hasActiveRescheduleRequest(session) && (
                  <span className="ml-2 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-600">
                    Reschedule Requested
                  </span>
                )}
              </span>
            </div>
            <div className="flex items-center px-4">
              <span
                className="text-[14px] text-[#717182]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
              >
                {session.type}
              </span>
            </div>
            <div className="flex items-center justify-center px-4">
              <span
                className="text-[14px] text-[#717182]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
              >
                {session.attendees}
              </span>
            </div>
            <div className="flex items-center px-4">
              <span
                className="text-[14px] text-[#717182]"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
              >
                {session.date}
              </span>
            </div>
            <div className="flex items-center px-4">
              <StatusBadge status={session.status} />
            </div>
            <div className="flex items-center px-4">
              <button
                onClick={(e) => { e.stopPropagation(); onViewDetails?.(session); }}
                className="flex items-center justify-center w-7 h-7 text-[#717182] hover:text-[#042BFD] hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Eye size={14} strokeWidth={1.8} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t border-[rgba(0,0,0,0.1)]">
        <span className="text-[12px] text-[#717182]" style={{ fontFamily: "'Inter', sans-serif" }}>
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, sessions.length)} of {sessions.length}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-8 h-8 border border-[rgba(0,0,0,0.1)] rounded opacity-30 cursor-not-allowed disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ opacity: currentPage === 1 ? 0.3 : 1, cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8L10 4" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`flex items-center justify-center w-8 h-8 border border-[rgba(0,0,0,0.1)] rounded text-[14px] font-medium ${
                currentPage === page
                  ? 'bg-[#F3F4F6] text-[#0A0A0A]'
                  : 'text-[#717182] hover:bg-gray-50'
              }`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-8 h-8 border border-[rgba(0,0,0,0.1)] rounded"
            style={{ opacity: currentPage === totalPages ? 0.3 : 1, cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 12L10 8L6 4" stroke="#0A0A0A" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
