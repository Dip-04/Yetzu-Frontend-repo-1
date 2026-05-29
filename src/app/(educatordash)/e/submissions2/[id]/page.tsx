"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Download, Send, File as FileIcon } from "lucide-react";

export default function SubmissionDetail2Page() {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Nikhil Kamath",
      date: "15 Jan 2025, 04:30 PM",
      text: "This is a sample comment provided for testing purposes to gather feedback. This is a sample comment provided for testing purposes to gather feedback. comment provided testing purposes.",
    },
  ]);

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    const newComment = {
      id: Date.now(),
      author: "Natalia Sam",
      date: new Date().toLocaleString('en-US', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }),
      text: commentText.trim(),
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-6 bg-[#FAFAFA] min-h-screen">
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/e/sessions" className="hover:text-gray-700 transition-colors">Sessions</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900 font-medium truncate">Webinar: Management of Acute Coronary Syndromes: Evidence-Based Updates</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Assignment Info Card */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
              <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-snug">
                Advanced Insights into Cardiac Arrhythmias
              </h1>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-600 text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
                OVERDUE: 26 FEB, 2026
              </span>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden shrink-0">
                <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[15px] font-semibold text-gray-900">Pradhyumn Dhondi</div>
                <div className="text-sm text-gray-500">#18374829</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">DESCRIPTION</h3>
              <p className="text-gray-700 text-[15px] leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>

          {/* Your Submissions Card */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Your Submissions</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="text-[11px] font-bold">PDF</span>
                  </div>
                  <span className="text-[15px] font-medium text-gray-900 truncate">Reviewed Article.pdf</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="text-[11px] font-bold">PDF</span>
                  </div>
                  <span className="text-[15px] font-medium text-gray-900 truncate">Reviewed Article.pdf</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Uploaded Assignment Card */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-lg font-bold text-gray-900">Uploaded Assignment</h2>
              <span className="bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full text-xs font-medium">3</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="text-[10px] font-bold">PDF</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate">Session Reading Material fo...</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-2">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="text-[10px] font-bold">PDF</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate">Reference Article.pdf</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-2">
                  <Download className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center justify-between p-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                    <span className="text-[10px] font-bold">PDF</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900 truncate">Insights into Coronary.pdf</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors shrink-0 ml-2">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Add Private Comment Card */}
          <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-sm flex flex-col h-[500px]">
            <h2 className="text-lg font-bold text-gray-900 mb-6 shrink-0">Add Private Comment</h2>
            
            <div className="flex-1 overflow-y-auto pr-2 -mr-2 space-y-4 mb-6 custom-scrollbar">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-[#F8FAFC] rounded-2xl p-5 border border-gray-100">
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-sm font-semibold text-gray-900 truncate">{comment.author}</span>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">{comment.date}</span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed italic">
                    {comment.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="shrink-0 space-y-4">
              <div className="relative">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                  placeholder="Enter here" 
                  className="w-full pl-4 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 bg-white shadow-sm transition-all"
                />
                <button 
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 disabled:opacity-50 transition-colors p-1"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[11px] text-gray-500 text-center">
                Private Comment are only visible to you and your mentor
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
