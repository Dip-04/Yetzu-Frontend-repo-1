"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, RefreshCw } from 'lucide-react';
import SessionsList from './components/SessionsList';
import CalendarView from './components/CalendarView';
import { Session } from './types';
import { EducatorAPI, asArray } from '@/lib/api';
import { shortenId } from '@/lib/utils/shortenId';

const getRescheduleRequests = (item: any) => asArray(item.rescheduleRequests || item.reschedule_requests || item.reschedules || item.requests);

const isActiveRescheduleRequest = (request: any) =>
  !["approved", "accepted", "rejected", "cancelled", "completed"].includes(
    String(request?.status || request?.action || "pending").toLowerCase()
  );

const hasActiveRescheduleRequests = (session: Session) =>
  (session.rescheduleRequests || []).some(isActiveRescheduleRequest);

export default function EducatorSessionsPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'All' | 'Upcoming' | 'Completed' | 'Missed'>('All');
    const [activeView, setActiveView] = useState<'Sessions List' | 'Calendar View'>('Sessions List');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [sessions, setSessions] = useState<Session[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    const handleViewDetails = (session: Session) => {
        router.push(`/e/sessions/${session.id}`);
    };

    useEffect(() => {
        const fetchSessions = async () => {
            setIsLoading(true);
            setError("");
            try {
                const [sessionsResult, requestsResult] = await Promise.allSettled([
                    EducatorAPI.getMySessions(),
                    EducatorAPI.getRescheduleRequests(),
                ]);

                if (sessionsResult.status === "rejected") {
                    throw sessionsResult.reason;
                }

                const response = sessionsResult.value;
                const requestList = requestsResult.status === "fulfilled" ? asArray(requestsResult.value) : [];
                const apiSessions = asArray(response).map((item: any, index: number) => {
                    const rawDate = item.date || item.scheduledDate || item.startDateTime || item.createdAt;
                    const dateTime = rawDate ? new Date(rawDate) : new Date();
                    const endDateTime = item.endDateTime ? new Date(item.endDateTime) : null;
                    
                    const now = new Date();
                    const isPast = endDateTime ? endDateTime < now : dateTime < now;
                    const isToday = dateTime.toDateString() === now.toDateString();
                    const computedStatus = isToday ? "Ongoing" : isPast ? "Completed" : "Scheduled";
                    
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
                    
                    const id = item.id || item._id || item.sessionId || String(index);
                    const sessionRequests = [
                        ...getRescheduleRequests(item),
                        ...requestList.filter((request: any) => {
                            const requestSessionId = String(request.sessionId || request.courseId || request.session?._id || request.course?._id || "");
                            return requestSessionId === String(id);
                        }),
                    ];

                    let sType = "Webinar";
                    if (item.type) {
                        if (typeof item.type === "object") {
                            sType = item.type.name || item.type.type || item.type.displayName || "Webinar";
                        } else {
                            sType = item.type;
                        }
                    } else if (item.sessionType) {
                        if (typeof item.sessionType === "object") {
                            sType = item.sessionType.name || item.sessionType.type || item.sessionType.displayName || "Webinar";
                        } else {
                            sType = item.sessionType;
                        }
                    }

                    const sTypeLower = String(sType || "").toLowerCase();
                    if (sTypeLower === "webinar") {
                        sType = "Webinar";
                    } else if (sTypeLower === "cohort") {
                        sType = "Cohort";
                    } else if (sTypeLower === "1:1" || sTypeLower === "1-1" || sTypeLower === "mentorship") {
                        sType = "1:1";
                    } else if (sTypeLower === "certification" || sTypeLower === "certification course") {
                        sType = "Certification Course";
                    }

                    return {
                        id,
                        title: item.title || item.sessionTitle || item.courseTitle || "Session",
                        type: sType,
                        attendees: studentsCount,
                        date: rawDate ? dateTime.toLocaleDateString() : "TBD",
                        dateTime,
                        startTime: item.startTime || item.time || dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                        endTime: item.endTime || "",
                        status: item.status === "Missed" ? "Missed" : computedStatus,
                        educator: item.educator || item.educatorName || "Educator",
                        assignments: asArray(item.assignments),
                        resources: asArray(item.resources || item.files || item.materials),
                        rescheduleRequests: sessionRequests,
                    };
                });
                setSessions(apiSessions as Session[]);
            } catch (fetchError: any) {
                console.error("Educator sessions fetch failed", fetchError);
                setSessions([]);
                setError(fetchError?.message || "Unable to load educator sessions.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchSessions();
    }, []);

    // Redirect to detail page automatically if URL query param sessionId is present
    useEffect(() => {
        if (sessions.length > 0 && typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const querySessionId = params.get("sessionId") || params.get("id");
            if (querySessionId) {
                router.push(`/e/sessions/${querySessionId}`);
            }
        }
    }, [sessions, router]);

    const filteredSessions = useMemo(() => {
        return sessions.filter(session => {
            if (activeTab === 'Upcoming' && session.status !== 'Scheduled' && session.status !== 'Ongoing') return false;
            if (activeTab === 'Completed' && session.status !== 'Completed') return false;
            if (activeTab === 'Missed' && session.status !== 'Missed') return false;

            if (searchQuery.trim() !== '') {
                const query = searchQuery.toLowerCase();
                const shortId = shortenId(session.id).toLowerCase();
                if (
                    !session.title.toLowerCase().includes(query) &&
                    !shortId.includes(query) &&
                    !session.id.toLowerCase().includes(query) &&
                    !session.educator.toLowerCase().includes(query)
                ) {
                    return false;
                }
            }
            return true;
        });
    }, [activeTab, searchQuery, sessions]);

    const tabs = [
        { name: 'All', count: sessions.length },
        { name: 'Upcoming', count: sessions.filter(s => s.status === 'Scheduled' || s.status === 'Ongoing').length },
        { name: 'Completed', count: sessions.filter(s => s.status === 'Completed').length },
        { name: 'Missed', count: sessions.filter(s => s.status === 'Missed').length },
    ];

    return (
        <div className="flex flex-col bg-white pb-8">
            {/* Header */}
            <div className="pb-6">
                <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Sessions</h1>
            </div>

            {/* Tab Navigation */}
            <div className="border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name as any)}
                                className={`relative flex items-center gap-1.5 pb-3.5 pt-0 text-[14px] font-medium transition-colors ${
                                    activeTab === tab.name
                                        ? "text-[#0A0D14]"
                                        : "text-[#525866] hover:text-[#0A0D14]"
                                }`}
                                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "20px", letterSpacing: "-0.006em" }}
                            >
                                {tab.name}
                                <span className={`inline-flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full text-[11px] font-medium uppercase ${
                                    activeTab === tab.name
                                        ? "bg-[#E6EAFF] text-[#042BFD]"
                                        : "bg-[#F3F4F6] text-[#717182]"
                                }`} style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", lineHeight: "12px", letterSpacing: "0.02em" }}>
                                    {tab.count}
                                </span>
                                {activeTab === tab.name && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#375DFB]" />}
                            </button>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="flex items-center">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white border border-[rgba(0,0,0,0.1)] rounded-lg w-[320px]" style={{ height: "39px" }}>
                            <Search className="text-[#717182] flex-shrink-0" size={14} strokeWidth={1.5} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search sessions, titles, or educators..."
                                className="flex-1 bg-transparent text-[14px] text-[#0A0A0A] placeholder-[rgba(10,10,10,0.5)] focus:outline-none"
                                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "17px", letterSpacing: "-0.150391px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* View Toggle */}
            <div className="py-4">
                <div className="flex items-center gap-1 p-1 bg-[#F8F9FA] rounded-lg border border-gray-200 inline-flex">
                    <button
                        onClick={() => setActiveView('Sessions List')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
                            activeView === 'Sessions List'
                                ? 'bg-white text-[#021165] shadow-sm border border-gray-200'
                                : 'text-[#525866] hover:text-[#0A0D14]'
                        }`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
                        </svg>
                        Sessions List
                    </button>
                    <button
                        onClick={() => setActiveView('Calendar View')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
                            activeView === 'Calendar View'
                                ? 'bg-white text-[#021165] shadow-sm border border-gray-200'
                                : 'text-[#525866] hover:text-[#0A0D14]'
                        }`}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                        Calendar View
                    </button>
                </div>
            </div>

            {/* Reschedule Notification Banner */}
            {sessions.filter(hasActiveRescheduleRequests).length > 0 && (
              <div className="mb-4 rounded-xl border border-orange-200 bg-orange-50 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <RefreshCw size={16} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {sessions.filter(hasActiveRescheduleRequests).length} Session{sessions.filter(hasActiveRescheduleRequests).length > 1 ? "s" : ""} with Reschedule Requests
                    </p>
                    <p className="text-xs text-gray-500">Click on a session to review and accept or reject requests.</p>
                  </div>
                </div>
                <div className="flex -space-x-1">
                  {sessions.filter(hasActiveRescheduleRequests).slice(0, 5).map((s) => (
                    <div key={s.id} className="w-7 h-7 rounded-full bg-white border border-orange-200 flex items-center justify-center text-[10px] font-bold text-orange-600" title={s.title}>
                      {s.title.charAt(0).toUpperCase()}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="flex-1 pb-8">
                {activeView === 'Sessions List' ? (
                    <SessionsList sessions={filteredSessions} onViewDetails={handleViewDetails} loading={isLoading} />
                ) : (
                    <>
                        {error ? (
                            <div className="mt-6 rounded-[20px] border border-red-200 bg-red-50 px-6 py-10 text-center">
                                <h3 className="text-lg font-semibold text-gray-900">Unable to load sessions</h3>
                                <p className="mt-2 text-sm text-red-600">{error}</p>
                            </div>
                        ) : (
                            <CalendarView sessions={filteredSessions} />
                        )}
                    </>
                )}

                {!isLoading && error && activeView === 'Sessions List' ? (
                    <div className="mt-6 rounded-[20px] border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-600">
                        {error}
                    </div>
                ) : null}
            </div>

        </div>
    );
}
