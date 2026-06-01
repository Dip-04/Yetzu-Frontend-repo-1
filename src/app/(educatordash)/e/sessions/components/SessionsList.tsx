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

  if (loading) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-2 md:p-6 mt-6">
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          <span className="ml-2 text-sm text-gray-500">Loading sessions...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-2 md:p-6 mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="text-sm text-gray-500 border-b border-gray-100">
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Session ID</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Session Title</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Type</th>
              <th className="font-semibold py-4 px-4 text-center whitespace-nowrap">
                <Users size={16} className="mx-auto" />
              </th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Date</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Status</th>
              <th className="font-semibold py-4 px-4 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No sessions found
                </td>
              </tr>
            ) : (
              paginatedSessions.map((session, index) => (
                <tr
                  key={session.id}
                  className={`border-b border-gray-50 text-sm hover:bg-gray-50 transition-colors ${
                    index === paginatedSessions.length - 1 ? 'border-none' : ''
                  }`}
                >
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap" title={session.id}>{shortenId(session.id)}</td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span>{session.title}</span>
                      {hasActiveRescheduleRequest(session) ? (
                        <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-orange-600">
                          Reschedule Requested
                        </span>
                      ) : null}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">{session.type}</td>
                  <td className="py-4 px-4 text-center text-gray-600 whitespace-nowrap">{session.attendees}</td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">{session.date}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    {session.status === 'Ongoing' && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                        <PlayCircle className="w-3.5 h-3.5" />
                        Ongoing
                      </div>
                    )}
                    {session.status === 'Scheduled' && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium">
                        <Circle className="w-3.5 h-3.5" />
                        Scheduled
                      </div>
                    )}
                    {session.status === 'Completed' && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed
                      </div>
                    )}
                    {session.status === 'Missed' && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs font-medium">
                        <Circle className="w-3.5 h-3.5" />
                        Missed
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-center gap-4">
                      <Link
                        href={`/e/assignments/create?sessionId=${session.id}&hideFiles=true`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        title="Create Assignment"
                      >
                        <Eye size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {sessions.length > 0 && (
        <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
          <span>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, sessions.length)} of {sessions.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-xl font-medium transition-colors ${
                  currentPage === page 
                    ? 'bg-[#111827] text-white' 
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
