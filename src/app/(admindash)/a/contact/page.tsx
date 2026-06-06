"use client";

import React, { useState } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import ContactTable from './components/ContactTable';
import ContactDetailsModal from './components/ContactDetailsModal';

export default function ContactPage() {
  const [selectedContact, setSelectedContact] = useState<any | null>(null);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="pb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[24px] font-semibold text-[#0A0A0A]" style={{ fontFamily: "'Inter', sans-serif", lineHeight: "36px", letterSpacing: "0.0703125px" }}>Form Submissions</h1>
            <p className="text-sm text-gray-500 mt-1">
              Review and reply to all user-submitted requests from contact and post publication support forms.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Table - includes its own search/filter toolbar */}
      <div className="flex-1 pb-8">
        <ContactTable onViewClick={(contact) => setSelectedContact(contact)} />
      </div>

      {/* Panel Overlay */}
      {selectedContact && (
        <>
          <div 
            className="fixed inset-0 bg-[#021165]/40 backdrop-blur-sm z-[60] transition-opacity"
            onClick={() => setSelectedContact(null)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-full max-w-[500px] bg-white z-[70] shadow-2xl animate-in slide-in-from-right duration-500">
            <ContactDetailsModal 
              isOpen={true}
              contactData={selectedContact}
              onClose={() => setSelectedContact(null)}
            />
          </div>
        </>
      )}
    </div>
  );
}
