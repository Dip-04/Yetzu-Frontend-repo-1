import React, { useState } from 'react';
import { X, Mail, Send, Loader2 } from 'lucide-react';
import { useCreateContact } from "@/lib/queries/formService/useFormService";
import { toast } from "react-hot-toast";

interface ContactDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactData: any | null;
}

export default function ContactDetailsModal({ isOpen, onClose, contactData }: ContactDetailsModalProps) {
  const [replyMessage, setReplyMessage] = useState("");
  const [markResolved, setMarkResolved] = useState(true);
  const createContact = useCreateContact();

  if (!isOpen || !contactData) return null;

  const handleSendReply = async () => {
    if (!replyMessage.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    try {
      await createContact.mutateAsync({
        name: "Admin",
        email: contactData.email || "N/A",
        subject: contactData.subject ? `Re: ${contactData.subject}` : "Reply",
        mobile: contactData.mobile || "N/A",
        medical_school_affiliation: contactData.medical_school_affiliation || "N/A",
        description: replyMessage.trim(),
      });
      toast.success("Reply sent successfully");
      setReplyMessage("");
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || "Failed to send reply");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-xl">
        {/* Modal Header */}
        <div className="flex justify-between items-start p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Contact Query Details</h2>
            <p className="text-sm font-medium text-slate-600 mt-1">
              {contactData.name || contactData.user?.name || 'N/A'} - {contactData.email || contactData.user?.email || 'N/A'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:px-8 overflow-y-auto flex-1 custom-scrollbar">
          <div className="space-y-4">
            
            {/* Row 1: Inquiry Type & Submitted Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
                 <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">INQUIRY TYPE</p>
                 <p className="text-sm font-bold text-slate-800">{contactData.subject || contactData.inquiry || 'General'}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
                 <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">SUBMITTED</p>
                 <p className="text-sm font-bold text-slate-800">{contactData.createdAt || contactData.created_at || contactData.submittedDate ? new Date(contactData.createdAt || contactData.created_at).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>

            {/* Row 2: Phone & Institution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
                 <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                 <p className="text-sm font-bold text-slate-800">{contactData.mobile || contactData.user?.phone || 'N/A'}</p>
              </div>
              <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
                 <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Institution</p>
                 <p className="text-sm font-bold text-slate-800">{contactData.medical_school_affiliation || contactData.user?.institution || 'N/A'}</p>
              </div>
            </div>

            {/* Row 3: Message */}
            <div className="p-4 rounded-xl border border-gray-200 bg-[#FCFCFD]">
               <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">MESSAGE</p>
               <p className="text-sm text-slate-800 leading-relaxed font-medium">{contactData.description || contactData.message || 'No message'}</p>
            </div>

            {/* Reply Section */}
            <div className="pt-6 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">Reply</h3>
              
              <div className="flex items-center justify-end">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={markResolved}
                    onChange={(e) => setMarkResolved(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-bold text-slate-700">Mark as resolved</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-800">Reply Message</label>
                <textarea 
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply message..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-none font-medium"
                />
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end gap-3 items-center p-6 md:px-8 border-t border-gray-100">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-700 bg-white border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handleSendReply}
            disabled={createContact.isPending}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0F172B] hover:bg-blue-500 disabled:bg-slate-400 text-white rounded-xl text-sm font-bold transition-colors"
          >
            {createContact.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {createContact.isPending ? "Sending..." : "Send Reply"}
          </button>
        </div>
        
      </div>
    </div>
  );
}
