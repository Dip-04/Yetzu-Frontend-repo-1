import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function ContactHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Form Submissions</h1>
        <p className="text-sm text-gray-500 font-medium mt-1">
          Review and reply to all user-submitted requests from contact and post publication support forms.
        </p>
      </div>
      
      <button 
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
      >
        <RefreshCw className="w-4 h-4" />
        Refresh
      </button>
    </div>
  );
}
