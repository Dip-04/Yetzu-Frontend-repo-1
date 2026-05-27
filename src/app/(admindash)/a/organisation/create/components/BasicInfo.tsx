import React from 'react';

type BasicInfoProps = {
  formData?: {
    name: string;
    type: string;
    email: string;
    location: string;
    description: string;
  };
  onChange?: (field: string, value: string) => void;
};

export default function BasicInfo({ formData, onChange }: BasicInfoProps) {
  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden mt-4">
      <div className="p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-900">Organization Info</h2>
          <p className="text-sm text-gray-500">Basic details about the new organization.</p>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Organization Name *</label>
            <input 
              type="text" 
              placeholder="e.g. Acme Corp"
              value={formData?.name || ''}
              onChange={(e) => onChange?.('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Type *</label>
            <select value={formData?.type || ''} onChange={(e) => onChange?.('type', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-500 appearance-none">
              <option value="" disabled>Select type</option>
              <option value="university">University</option>
              <option value="corporate">Corporate</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Email Address *</label>
            <input 
              type="email" 
              placeholder="admin@organization.com"
              value={formData?.email || ''}
              onChange={(e) => onChange?.('email', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Location</label>
            <input 
              type="text" 
              placeholder="City, Country"
              value={formData?.location || ''}
              onChange={(e) => onChange?.('location', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-slate-800">Description</label>
            <textarea 
              placeholder="Brief description of the organization..."
              rows={4}
              value={formData?.description || ''}
              onChange={(e) => onChange?.('description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
