"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Check, Lock, Upload, Calendar as CalendarIcon, ChevronDown } from "lucide-react";

export default function CreateAssignmentPage() {
  const [step, setStep] = useState(1);

  const renderStepper = () => {
    return (
      <div className="w-full md:w-64 shrink-0 space-y-2">
        {/* Step 1 */}
        <button onClick={() => setStep(1)} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${step === 1 ? 'bg-gray-100/80' : 'hover:bg-gray-50'}`}>
          {step > 1 ? (
            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Check className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${step === 1 ? 'bg-green-50 text-green-600' : 'text-gray-400'}`}>
               {step === 1 ? <Check className="w-3.5 h-3.5" /> : "1"}
            </div>
          )}
          <span className={`text-[15px] ${step >= 1 ? 'text-gray-900 font-semibold' : 'text-gray-500 font-medium'}`}>Assignment Basics</span>
        </button>

        {/* Step 2 */}
        <button onClick={() => setStep(2)} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${step === 2 ? 'bg-gray-100/80' : 'hover:bg-gray-50'}`}>
          {step > 2 ? (
            <div className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <Check className="w-3.5 h-3.5" />
            </div>
          ) : (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[13px] font-bold ${step === 2 ? 'bg-gray-200 text-gray-900' : 'bg-transparent text-gray-400'}`}>
              2
            </div>
          )}
          <span className={`text-[15px] ${step >= 2 ? 'text-gray-900 font-semibold' : 'text-gray-500 font-medium'}`}>Submission Rules</span>
        </button>

        {/* Step 3 */}
        <button onClick={() => setStep(3)} className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${step === 3 ? 'bg-gray-100/80' : 'hover:bg-gray-50'}`}>
          {step === 3 ? (
             <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-900 text-[13px] font-bold">
               3
             </div>
          ) : (
             <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-50 text-gray-400">
               <Lock className="w-3.5 h-3.5" />
             </div>
          )}
          <span className={`text-[15px] ${step === 3 ? 'text-gray-900 font-semibold' : 'text-gray-400 font-medium'}`}>Review & Confirm</span>
        </button>
      </div>
    );
  };

  const renderStep1 = () => (
    <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700">Select Session *</label>
          <div className="relative">
            <select className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              <option value="" disabled selected>Select Session</option>
              <option>Career Strategy Session - PhD</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[13px] font-semibold text-gray-700">Assignment Title *</label>
          <input 
            type="text" 
            placeholder="E.g., Research Proposal Draft" 
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-gray-700">Assignment Type *</label>
        <div className="relative">
          <select className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option value="" disabled selected>Select Type</option>
            <option>Research</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-gray-700">Description *</label>
        <textarea 
          rows={5}
          placeholder="Enter assignment instructions and guidelines..." 
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 resize-none"
        ></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-[13px] font-semibold text-gray-700">Attachments</label>
        <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer bg-gray-50/50">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-3 shadow-sm">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-sm font-semibold text-gray-900 mb-1">Upload Files</p>
          <p className="text-[13px] text-gray-500">Drag and drop or browse to upload files</p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white border border-gray-200 rounded-[20px] p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-10">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900">Last Submission Allowed</h3>
          <p className="text-sm text-gray-500 mt-0.5">24-hour grace period</p>
        </div>
        <div className="w-11 h-6 bg-[#042BFD] rounded-full relative cursor-pointer shadow-inner">
          <div className="w-[18px] h-[18px] bg-white rounded-full absolute right-[3px] top-[3px] shadow-sm"></div>
        </div>
      </div>

      <div className="space-y-5">
        <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase">SCHEDULE</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Start Date <span className="text-red-500">*</span></label>
            <div className="relative">
              <input type="text" placeholder="DD-MM-YYYY" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Dead Line <span className="text-red-500">*</span></label>
            <div className="relative">
              <input type="text" placeholder="DD-MM-YYYY" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <CalendarIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Deadline Time <span className="text-red-500">*</span></label>
            <input type="text" placeholder="HH:MM AM/PM" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <h4 className="text-xs font-bold text-gray-400 tracking-widest uppercase">VISIBILITY</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Visible to</label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option>Entire Session</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[13px] font-semibold text-gray-700">Choose Students</label>
            <div className="relative">
              <select className="w-full appearance-none px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-400">
                <option>Select Students</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-gray-100">
        <div>
          <h3 className="text-[15px] font-semibold text-gray-900">Last Submission Allowed</h3>
          <p className="text-sm text-gray-500 mt-0.5">24-hour grace period</p>
        </div>
        <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer shadow-inner">
          <div className="w-[18px] h-[18px] bg-white rounded-full absolute left-[3px] top-[3px] shadow-sm"></div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-[20px] font-bold text-gray-900">Review & Confirm</h2>
        <p className="text-sm text-gray-500 mt-1">Review all details before creating the assignment.</p>
      </div>

      {/* Assignment Summary */}
      <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
        <div className="px-8 py-5 bg-gray-50/30 border-b border-gray-200">
          <h3 className="text-[15px] font-bold text-gray-900">Assignment Summary</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Session</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">Career Strategy Session – PhD Roadmap</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Title</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">Lotem Ipsum Dolor Self Amet Consectetur</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Type</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">Research</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Description</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium leading-relaxed">Lotem Ipsum Dolor Self Amet ConsecteturLotem Ipsum Dolor Self</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Uploaded Resources</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">3 Attachments</div>
          </div>
        </div>
      </div>

      {/* Submission Rules */}
      <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
        <div className="px-8 py-5 bg-gray-50/30 border-b border-gray-200">
          <h3 className="text-[15px] font-bold text-gray-900">Submission Rules</h3>
        </div>
        <div className="divide-y divide-gray-100">
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Start Date</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">19-04-2026</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">End Date</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">22-04-2026</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Deadline</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">12:00:00 AM</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Visibility</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">Entire Session</div>
          </div>
          <div className="flex flex-col md:flex-row py-5 px-8 gap-2 md:gap-0">
            <div className="w-1/3 text-[13px] text-gray-500">Laste Submission Allowed</div>
            <div className="w-2/3 text-[13px] text-gray-900 text-right md:text-right font-medium">Yes</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 bg-[#FAFAFA] min-h-screen relative pb-32">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
        <Link href="/e/assignments2" className="w-10 h-10 flex items-center justify-center border border-gray-200 bg-white rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">Create Assignment</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-14">
        {renderStepper()}
        
        <div className="flex-1 max-w-4xl">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-[#FAFAFA] p-6 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <button 
            onClick={() => setStep(prev => Math.max(1, prev - 1))}
            className={`flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl bg-white text-sm font-medium transition-colors shadow-sm ${step === 1 ? 'text-gray-300 cursor-not-allowed opacity-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
            disabled={step === 1}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          <div className="flex items-center gap-3">
            <button className="px-6 py-3 border border-gray-200 bg-white rounded-xl text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-colors">
              Save Draft
            </button>
            {step < 3 ? (
              <>
                <Link href="/e/assignments2" className="px-6 py-3 border border-gray-200 bg-white rounded-xl text-[13px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-sm transition-colors">
                  Cancel
                </Link>
                <button 
                  onClick={() => setStep(prev => Math.min(3, prev + 1))}
                  className="px-8 py-3 bg-[#0A0A0A] hover:bg-black text-white rounded-xl text-[13px] font-medium shadow-sm transition-colors"
                >
                  Next
                </button>
              </>
            ) : (
              <button 
                onClick={() => window.location.href = '/e/assignments2'}
                className="px-6 py-3 bg-[#0A0A0A] hover:bg-black text-white rounded-xl text-[13px] font-medium shadow-sm transition-colors tracking-wide"
              >
                Create Assignment
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}