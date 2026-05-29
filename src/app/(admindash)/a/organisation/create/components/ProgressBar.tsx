import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
}

const steps = [
  'Basic Info',
  'Admin Details',
  'Student Import',
  'Permissions',
  'Billing Details',
  'Review'
];

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={stepNumber} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors duration-300 ${
                  isCompleted
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isActive
                      ? 'bg-blue-600 text-white shadow-md ring-4 ring-blue-50'
                      : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : stepNumber}
              </div>
              <span
                className={`text-[11px] font-semibold text-center mt-1 uppercase tracking-wider ${
                  isActive || isCompleted ? 'text-slate-800' : 'text-gray-400'
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}

        <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-200 -z-0" />

        <div
          className="absolute top-4 h-[2px] bg-blue-600 -z-0 transition-all duration-300"
          style={{ width: `${(Math.max(0, currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}
