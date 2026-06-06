import React, { useState } from "react";
import { Eye, Loader2 } from "lucide-react";

interface Ticket {
  id: string;
  _id?: string;
  subject: string;
  status: string;
  priority: string;
  createdAt?: string;
  created_at?: string;
  userName?: string;
  from?: string;
}

interface TicketTableProps {
  tickets: Ticket[];
  onView: (ticket: Ticket) => void;
  onResolve?: (ticketId: string, comment?: string) => void | Promise<void>;
  onStatusChange?: (ticketId: string, newStatus: string) => void | Promise<void>;
  showActions?: boolean;
  isAdmin?: boolean;
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string }> = {
    open: { bg: "bg-[#EFF6FF]", text: "text-[#2563EB]" },
    in_review: { bg: "bg-[#FFFBEB]", text: "text-[#D97706]" },
    resolved: { bg: "bg-[#ECFDF5]", text: "text-[#059669]" },
    closed: { bg: "bg-[#ECFDF5]", text: "text-[#059669]" },
    rejected: { bg: "bg-[#FEF2F2]", text: "text-[#DC2626]" },
  };
  const c = config[status.toLowerCase()] || { bg: "bg-[#F3F4F6]", text: "text-[#717182]" };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded ${c.bg} ${c.text}`}
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", lineHeight: "16px", letterSpacing: "0.0644531px" }}
    >
      {status === "in_review" ? "In Review" : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const config: Record<string, { bg: string; text: string }> = {
    high: { bg: "bg-[#FEF2F2]", text: "text-[#DC2626]" },
    medium: { bg: "bg-[#FFFBEB]", text: "text-[#D97706]" },
    low: { bg: "bg-[#ECFDF5]", text: "text-[#059669]" },
  };
  const c = config[priority.toLowerCase()] || { bg: "bg-[#F3F4F6]", text: "text-[#717182]" };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded ${c.bg} ${c.text}`}
      style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "11px", lineHeight: "16px", letterSpacing: "0.0644531px" }}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
}

const STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "in_review", label: "In Review" },
  { value: "resolved", label: "Resolved" },
  { value: "rejected", label: "Rejected" },
];

export default function TicketTable({ tickets, onView, onResolve, onStatusChange, showActions = false, isAdmin = false }: TicketTableProps) {
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const gridCols = "grid-cols-[1fr_1fr_100px_120px_130px_100px]";
  const columns = [
    { key: "subject", label: "Subject" },
    { key: "from", label: "From" },
    { key: "priority", label: "Priority" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
    { key: "actions", label: "Actions" },
  ];

  const getDate = (ticket: Ticket) => {
    const dateStr = ticket.createdAt || ticket.created_at;
    return dateStr ? new Date(dateStr).toLocaleDateString() : "N/A";
  };

  const handleStatusChange = async (ticketId: string, newStatus: string) => {
    if (!onStatusChange) return;
    setUpdatingId(ticketId);
    try {
      await onStatusChange(ticketId, newStatus);
    } finally {
      setUpdatingId(null);
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="border border-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden bg-white">
        <div className="flex items-center justify-center py-12 text-[#717182] text-sm">
          No tickets found
        </div>
      </div>
    );
  }

  return (
    <div className="border border-[rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden bg-white">
      <div
        className={`grid ${gridCols} items-center bg-[#F8F9FA] border-b border-[rgba(0,0,0,0.1)]`}
        style={{ height: "45.5px" }}
      >
        {columns.map((col) => (
          <div key={col.key} className="flex items-center px-4 h-full">
            <span
              className="text-[14px] font-medium text-[#717182]"
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
            >
              {col.label}
            </span>
          </div>
        ))}
      </div>

      <div className="divide-y divide-[rgba(0,0,0,0.1)]">
        {tickets.map((ticket: Ticket) => {
          const ticketId = ticket.id || ticket._id || "";
          const isUpdating = updatingId === ticketId;
          return (
            <div
              key={ticketId}
              className={`grid ${gridCols} items-center transition-colors hover:bg-gray-50 cursor-pointer`}
              style={{ height: "46px" }}
              onClick={() => onView(ticket)}
            >
              <div className="flex items-center px-4">
                <span
                  className="text-[14px] text-[#0A0A0A] truncate"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
                >
                  {ticket.subject}
                </span>
              </div>
              <div className="flex items-center px-4">
                <span
                  className="text-[14px] text-[#717182] truncate"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
                >
                  {ticket.userName || ticket.from || "N/A"}
                </span>
              </div>
              <div className="flex items-center px-4">
                <PriorityBadge priority={ticket.priority} />
              </div>
              <div className="flex items-center px-4" onClick={(e) => e.stopPropagation()}>
                {isAdmin ? (
                  <div className="relative">
                    <select
                      value={ticket.status}
                      onChange={(e) => handleStatusChange(ticketId, e.target.value)}
                      disabled={isUpdating}
                      className="appearance-none px-2 py-0.5 rounded text-[11px] font-medium border border-[rgba(0,0,0,0.1)] bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 cursor-pointer disabled:opacity-50"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor:
                          ticket.status === "resolved" || ticket.status === "closed" ? "#ECFDF5" :
                          ticket.status === "open" ? "#EFF6FF" :
                          ticket.status === "in_review" ? "#FFFBEB" :
                          ticket.status === "rejected" ? "#FEF2F2" : "#F3F4F6",
                        color:
                          ticket.status === "resolved" || ticket.status === "closed" ? "#059669" :
                          ticket.status === "open" ? "#2563EB" :
                          ticket.status === "in_review" ? "#D97706" :
                          ticket.status === "rejected" ? "#DC2626" : "#4B5563",
                      }}
                    >
                      {STATUS_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                    {isUpdating && <Loader2 size={14} className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-gray-500" />}
                  </div>
                ) : (
                  <StatusBadge status={ticket.status} />
                )}
              </div>
              <div className="flex items-center px-4">
                <span
                  className="text-[14px] text-[#717182]"
                  style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: "14px", lineHeight: "21px", letterSpacing: "-0.150391px" }}
                >
                  {getDate(ticket)}
                </span>
              </div>
              <div className="flex items-center px-4">
                <button
                  onClick={(e) => { e.stopPropagation(); onView(ticket); }}
                  className="flex items-center justify-center w-7 h-7 text-[#717182] hover:text-[#042BFD] hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye size={14} strokeWidth={1.8} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
