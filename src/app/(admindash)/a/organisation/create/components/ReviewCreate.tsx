import React from 'react';
import { AlertCircle } from 'lucide-react';

type ReviewCreateProps = {
  formData?: {
    name: string;
    type: string;
    email: string;
    emailDomain?: string;
    location?: string;
    description?: string;
  };
  adminData?: {
    name: string;
    email: string;
    mobileNo: string;
    roleTitle: string;
  };
  students?: Array<{ name: string; email: string; mobileNo: string }>;
  importMethod?: 'manual' | 'csv';
  permissions?: Record<string, boolean>;
  billingData?: {
    model: string;
    basePrice: number;
    currency: string;
    billingCycle: string;
    paymentMethod: string;
  };
  errors?: string[];
};

export default function ReviewCreate({ formData, adminData, students, importMethod, permissions, billingData, errors }: ReviewCreateProps) {
  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="py-5 border-b border-gray-100 last:border-0 relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider">{title}</h3>
        <button className="text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors">Edit</button>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const Row = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center">
      <span className="text-sm font-medium text-gray-500">{label}</span>
      <span className="text-sm font-bold text-slate-800">{value}</span>
    </div>
  );

  const enabledPermissions = permissions ? Object.entries(permissions).filter(([, v]) => v).map(([k]) => k.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())) : [];

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 pb-4">
        {errors && errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 mb-6">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-bold text-red-700">Please fix the following errors:</p>
              <ul className="list-disc list-inside text-sm text-red-600 space-y-0.5">
                {errors.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </div>
          </div>
        )}
        <div className="space-y-1 mb-6">
          <h2 className="text-xl font-bold text-slate-900">Review & Create</h2>
          <p className="text-sm text-gray-500">Review everything before finalizing.</p>
        </div>

        <Section title="Basic & Org Details">
          <Row label="Organization Name" value={formData?.name || 'N/A'} />
          <Row label="Admin Email" value={formData?.email || 'N/A'} />
          <Row label="Type" value={formData?.type || 'N/A'} />
          <Row label="Location" value={formData?.location || 'N/A'} />
        </Section>

        <Section title="Admin Contact">
          <Row label="Name" value={adminData?.name || 'N/A'} />
          <Row label="Email" value={adminData?.email || 'N/A'} />
          <Row label="Phone" value={adminData?.mobileNo || 'N/A'} />
          <Row label="Role" value={adminData?.roleTitle || 'N/A'} />
        </Section>

        <Section title="Student Import">
          <Row label="Method" value={importMethod === 'csv' ? 'CSV Upload' : students && students.length > 0 ? `Manual (${students.length} students)` : 'Skip - None added'} />
          {students && students.length > 0 && (
            <div className="text-sm text-gray-600 font-medium">
              {students.map((s, i) => <div key={i}>{i + 1}. {s.name} ({s.email})</div>)}
            </div>
          )}
        </Section>

        <Section title="Access & Permissions">
          <Row label="Features" value={enabledPermissions.length > 0 ? enabledPermissions.join(', ') : 'None enabled'} />
        </Section>

        <Section title="Billing Information">
          <Row label="Plan" value={billingData?.model ? (billingData.model.charAt(0).toUpperCase() + billingData.model.slice(1).replace('_', ' ')) : 'N/A'} />
          <Row label="Billing Cycle" value={billingData?.billingCycle ? (billingData.billingCycle.charAt(0).toUpperCase() + billingData.billingCycle.slice(1)) : 'N/A'} />
          <Row label="Payment Method" value={billingData?.paymentMethod ? (billingData.paymentMethod.charAt(0).toUpperCase() + billingData.paymentMethod.slice(1)) : 'N/A'} />
        </Section>
      </div>

      <div className="bg-[#FAFAFA] p-8 border-t border-gray-100 flex items-center justify-center">
        <span className="text-2xl font-bold text-slate-900">₹{(billingData?.basePrice || 0).toLocaleString()}<span className="text-sm text-gray-500 font-semibold">/{billingData?.billingCycle || 'month'}</span></span>
      </div>
    </div>
  );
}
