import React, { useState } from "react";
import { X, Send, Loader2, User, Calendar } from "lucide-react";

interface Ticket {
  id: string;
  _id?: string;
  subject: string;
  description?: string;
  status: string;
  priority: string;
  createdAt?: string;
  created_at?: string;
  userName?: string;
  from?: string;
  comment?: string;
}

interface TicketModalProps {
  ticket: Ticket | null;
  onClose: () => void;
  onResolve?: (ticketId: string, comment?: string) => void | Promise<void>;
}

export default function TicketModal({ ticket, onClose, onResolve }: TicketModalProps) {
  const [comment, setComment] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  if (!ticket) return null;

  const ticketId = ticket.id || ticket._id || "";

  const handleResolve = async () => {
    if (!onResolve || !ticketId) return;
    setIsUpdating(true);
    try {
      await onResolve(ticketId, comment);
      onClose();
    } catch (error) {
      console.error("Failed to resolve ticket:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col border-l border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-xs font-semibold text-gray-500 mb-2">Ticket</div>
        <h2 className="text-xl font-bold text-gray-900 pr-8">{ticket.subject}</h2>
        <p className="text-sm text-gray-500 mt-1">{ticket.userName || ticket.from || "N/A"}</p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {/* Status & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status</div>
            <div className="text-sm font-bold text-gray-900 capitalize">{ticket.status}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Priority</div>
            <div className="text-sm font-bold text-gray-900 capitalize">{ticket.priority}</div>
          </div>
        </div>

        {/* Description */}
        {ticket.description && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description</div>
            <p className="text-sm text-gray-900 leading-relaxed font-medium">{ticket.description}</p>
          </div>
        )}

        {/* User Info */}
        {(ticket.userName || ticket.from) && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">From</div>
            <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
              <User size={14} className="text-gray-400" />
              {ticket.userName || ticket.from}
            </div>
          </div>
        )}

        {/* Date */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Created</div>
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Calendar size={14} className="text-gray-400" />
            {new Date(ticket.createdAt || ticket.created_at || "").toLocaleString()}
          </div>
        </div>

        {/* Comment (if resolved) */}
        {ticket.comment && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Resolution Comment</div>
            <p className="text-sm text-gray-900 leading-relaxed font-medium">{ticket.comment}</p>
          </div>
        )}

        {/* Resolve Section */}
        {onResolve && ticket.status !== "resolved" && ticket.status !== "closed" && (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
            <h3 className="text-sm font-bold text-gray-900">Resolve Ticket</h3>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment about the resolution..."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-none font-medium"
            />
            <div className="flex justify-end">
              <button
                onClick={handleResolve}
                disabled={isUpdating}
                className="flex items-center gap-2 px-4 py-2 bg-[#0F172B] hover:bg-blue-500 disabled:bg-slate-400 text-white rounded-lg text-sm font-bold transition-colors"
              >
                {isUpdating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                {isUpdating ? "Resolving..." : "Resolve Ticket"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
