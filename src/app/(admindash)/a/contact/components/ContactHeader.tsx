import React from 'react';
import { RefreshCw } from 'lucide-react';

export default function ContactHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#021165] tracking-tight">Form Submissions</h1>
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
