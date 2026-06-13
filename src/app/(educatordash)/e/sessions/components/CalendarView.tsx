"use client";

import React, { useState, useMemo, useRef } from 'react';
import { Session } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CalendarViewType = 'Day' | 'Week' | 'Month';

interface CalendarViewProps {
  sessions: Session[];
}

const HOUR_HEIGHT = 80;
const FIRST_HOUR = 7;
const LAST_HOUR = 20;

export default function CalendarView({ sessions }: CalendarViewProps) {
  const [viewType, setViewType] = useState<CalendarViewType>('Week');
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const today = new Date();

  const viewTypes: CalendarViewType[] = ['Day', 'Week', 'Month'];

  const getWeekDays = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    start.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      days.push(d);
    }
    return days;
  };

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days: Date[] = [];
    const startPadding = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;
    
    for (let i = startPadding - 1; i >= 0; i--) {
      const d = new Date(year, month, -i);
      days.push(d);
    }
    
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
    
    return days;
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatTime = (time: string) => {
    if (!time) return FIRST_HOUR;
    const [hourStr, ampm] = time.split(' ');
    let hour = parseInt(hourStr);
    if (ampm === 'PM' && hour !== 12) hour += 12;
    if (ampm === 'AM' && hour === 12) hour = 0;
    return isNaN(hour) ? FIRST_HOUR : hour;
  };

  const parseSessionTimes = (session: Session) => {
    const startHour = formatTime(session.startTime);
    const endHour = formatTime(session.endTime);
    const duration = endHour - startHour;
    return { startHour, duration: duration > 0 ? duration : 1 };
  };

  const formatDateHeader = () => {
    if (viewType === 'Day') {
      return currentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } else if (viewType === 'Week') {
      const days = getWeekDays(currentDate);
      const start = days[0];
      const end = days[6];
      if (start.getMonth() === end.getMonth()) {
        return `${start.toLocaleDateString('en-US', { month: 'long' })} ${start.getDate()} - ${end.getDate()}, ${start.getFullYear()}`;
      } else {
        return `${start.toLocaleDateString('en-US', { month: 'short' })} ${start.getDate()} - ${end.toLocaleDateString('en-US', { month: 'short' })} ${end.getDate()}, ${end.getFullYear()}`;
      }
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewType === 'Day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (viewType === 'Week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      if (!session.dateTime) return false;
      const sessionDate = new Date(session.dateTime);
      
      if (viewType === 'Day') {
        return sessionDate.toDateString() === currentDate.toDateString();
      } else if (viewType === 'Week') {
        const days = getWeekDays(currentDate);
        const endOfWeek = new Date(days[6]);
        endOfWeek.setHours(23, 59, 59, 999);
        return sessionDate >= days[0] && sessionDate <= endOfWeek;
      } else {
        return sessionDate.getMonth() === currentDate.getMonth() && 
               sessionDate.getFullYear() === currentDate.getFullYear();
      }
    });
  }, [sessions, viewType, currentDate]);

  // Organize sessions by hour for each day - for overlap handling
  const hours = Array.from({ length: LAST_HOUR - FIRST_HOUR + 1 }, (_, i) => FIRST_HOUR + i);

  const getSessionColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'webinar':
        return 'bg-blue-50 border-l-blue-500';
      case 'cohort':
        return 'bg-emerald-50 border-l-emerald-500';
      case 'workshop':
        return 'bg-violet-50 border-l-violet-500';
      case '1:1':
      case 'mentorship':
        return 'bg-amber-50 border-l-amber-500';
      default:
        return 'bg-blue-50 border-l-blue-500';
    }
  };

  const formatHourLabel = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  const renderSessionCard = (session: Session) => {
    const { startHour, duration } = parseSessionTimes(session);
    const top = (startHour - FIRST_HOUR) * HOUR_HEIGHT;
    const height = Math.max(duration * HOUR_HEIGHT - 4, 24);
    const colorClass = getSessionColor(session.type);
    
    return (
      <div
        key={session.id}
        className={`absolute left-1.5 right-1.5 ${colorClass} border-l-[3px] rounded-md p-1.5 z-10 overflow-hidden cursor-pointer hover:shadow-md hover:brightness-95 transition-all`}
        style={{ top, height }}
      >
        <div className="text-[11px] font-semibold text-gray-800 leading-tight truncate">{session.title}</div>
        <div className="text-[9px] text-gray-500 mt-0.5 truncate">{typeof session.educator === 'string' ? session.educator : "Educator"}</div>
        {height >= 50 && (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] text-gray-400">{session.startTime} - {session.endTime}</span>
            <span className="text-[9px] text-gray-400">·</span>
            <span className="text-[9px] text-gray-400">{session.attendees || 0} enrolled</span>
          </div>
        )}
      </div>
    );
  };

  const getDaySessions = (dayKey: string) => {
    return filteredSessions.filter(s => {
      if (!s.dateTime) return false;
      const d = new Date(s.dateTime);
      return d.toDateString() === dayKey;
    });
  };

  const renderDayView = () => {
    const dayKey = currentDate.toDateString();
    const daySessions = getDaySessions(dayKey);
    
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="flex border-b border-gray-100">
          <div className="shrink-0 w-14 py-3 text-center text-xs font-semibold text-gray-500 bg-gray-50">Time</div>
          <div className="flex-1 py-3 px-4 text-xs font-semibold text-gray-900 bg-gray-50">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <div className="relative" style={{ height: hours.length * HOUR_HEIGHT }}>
            {/* Hour grid lines */}
            {hours.map((hour, i) => (
              <div key={hour} className="absolute left-0 right-0 border-b border-gray-100" style={{ top: i * HOUR_HEIGHT }}>
                <span className="absolute -left-14 top-0 w-14 pr-2 pt-1 text-right text-[10px] text-gray-400">
                  {formatHourLabel(hour)}
                </span>
              </div>
            ))}
            {/* Session cards */}
            {daySessions.map(session => renderSessionCard(session))}
          </div>
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-[56px_repeat(7,1fr)] border-b border-gray-100">
          <div className="border-r border-gray-100 bg-gray-50"></div>
          {weekDays.map((day, idx) => {
            const isToday = day.toDateString() === today.toDateString();
            return (
              <div key={idx} className={`py-2.5 text-center border-r border-gray-100 last:border-r-0 ${isToday ? 'bg-blue-50' : 'bg-gray-50'}`}>
                <div className="text-[10px] text-gray-500 font-medium uppercase">{getDayName(day)}</div>
                <div className={`text-base font-bold leading-tight ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>{day.getDate()}</div>
              </div>
            );
          })}
        </div>
        
        <div ref={containerRef} className="relative overflow-y-auto" style={{ height: hours.length * HOUR_HEIGHT }}>
          {/* Hour grid rows */}
          {hours.map((hour, i) => (
            <div key={hour} className="absolute left-0 right-0 border-b border-gray-100" style={{ top: i * HOUR_HEIGHT, height: HOUR_HEIGHT }}>
              <span className="absolute left-0 top-0 w-14 pr-1 pt-1 text-right text-[10px] text-gray-400">
                {formatHourLabel(hour)}
              </span>
            </div>
          ))}
          {/* Day columns with session cards */}
          {weekDays.map((day, dayIdx) => {
            const dayKey = day.toDateString();
            const daySessions = getDaySessions(dayKey);
            return (
              <div key={dayKey} className="absolute top-0 bottom-0 border-r border-gray-100 last:border-r-0" style={{ left: `calc(56px + ${dayIdx} * (100% - 56px) / 7)`, width: `calc((100% - 56px) / 7)` }}>
                {daySessions.map(session => renderSessionCard(session))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthDays = getMonthDays(currentDate);
    const weeks: Date[][] = [];
    for (let i = 0; i < monthDays.length; i += 7) {
      weeks.push(monthDays.slice(i, i + 7));
    }
    
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-gray-100">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 bg-gray-50 border-r border-gray-100 last:border-r-0">
              {day}
            </div>
          ))}
        </div>
        
        <div className="max-h-[500px] overflow-y-auto">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="grid grid-cols-7 border-b border-gray-100 last:border-b-0">
              {week.map((day, dayIdx) => {
                const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                const isToday = day.toDateString() === today.toDateString();
                const daySessions = filteredSessions.filter(s => {
                  if (!s.dateTime) return false;
                  return new Date(s.dateTime).toDateString() === day.toDateString();
                });
                
                return (
                  <div 
                    key={dayIdx} 
                    className={`min-h-[100px] p-2 border-r border-gray-100 last:border-r-0 ${!isCurrentMonth ? 'bg-gray-50' : 'bg-white'}`}
                  >
                    <div className={`text-sm font-medium mb-1 ${!isCurrentMonth ? 'text-gray-400' : isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {daySessions.slice(0, 2).map(session => (
                        <div key={session.id} className={`p-1 text-[10px] truncate rounded ${getSessionColor(session.type).split(' ')[0]}`}>
                          <span className="font-medium">{session.title || session.type}</span>
                        </div>
                      ))}
                      {daySessions.length > 2 && (
                        <div className="text-[10px] text-gray-500">+{daySessions.length - 2} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-4 md:p-6 mt-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => navigateDate('prev')}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
            >
              <ChevronLeft size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => navigateDate('next')}
              className="p-1.5 hover:bg-white rounded-md transition-colors"
            >
              <ChevronRight size={18} className="text-gray-600" />
            </button>
          </div>
          <h3 className="font-semibold text-lg text-gray-900 min-w-[200px]">{formatDateHeader()}</h3>
          <button
            onClick={goToToday}
            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          {viewTypes.map(type => (
            <button
              key={type}
              onClick={() => setViewType(type)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                viewType === type
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {viewType === 'Day' && renderDayView()}
      {viewType === 'Week' && renderWeekView()}
      {viewType === 'Month' && renderMonthView()}
    </div>
  );
}