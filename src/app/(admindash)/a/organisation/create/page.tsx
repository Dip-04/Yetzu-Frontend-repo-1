"use client";

import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AdminAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    email: '',
    billingCycle: 'monthly',
    location: '',
    description: '',
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.type || !formData.email.trim()) {
      toast.error('Name, type, and email are required');
      return;
    }

    try {
      setIsSubmitting(true);
      await AdminAPI.createOrganization({
        name: formData.name.trim(),
        type: formData.type,
        email: formData.email.trim(),
        status: 'active',
        billingCycle: formData.billingCycle,
      });
      toast.success('Organization created successfully');
      router.push('/a/organisation');
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create organization');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col pb-24">
      <div className="w-full px-6 py-5 flex items-center justify-between border-b border-gray-100 bg-white">
        <Link href="/a/organisation" className="flex items-center gap-2 text-slate-800 font-bold hover:text-blue-600 transition-colors">
          <ChevronLeft className="w-5 h-5" />
          <span className="text-lg">Create Organisation</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 w-full bg-[#fcfcfc] py-8 px-4">
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
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-800">Type *</label>
                <select value={formData.type} onChange={(e) => updateFormData('type', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-500 appearance-none">
                  <option value="" disabled>Select type</option>
                  <option value="institution">Institution</option>
                  <option value="cohort">Cohort</option>
                  <option value="corporate">Corporate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-800">Email Address *</label>
                <input
                  type="email"
                  placeholder="admin@organization.com"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-800">Billing Cycle</label>
                <select value={formData.billingCycle} onChange={(e) => updateFormData('billingCycle', e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white text-gray-500 appearance-none">
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-800">Location</label>
                <input
                  type="text"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => updateFormData('location', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-semibold text-slate-800">Description</label>
                <textarea
                  placeholder="Brief description of the organization..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-gray-400 resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="fixed bottom-0 right-0 md:left-[260px] left-0 bg-white border-t border-gray-100 p-4 md:px-8 z-50">
        <div className="max-w-4xl mx-auto flex justify-end items-center w-full gap-3">
          <Link href="/a/organisation" className="px-5 py-2.5 bg-white border border-gray-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors">
            Cancel
          </Link>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#0A0A0A] hover:bg-gray-800 text-white rounded-xl text-sm font-bold transition-colors disabled:opacity-60"
          >
            {isSubmitting ? 'Creating...' : 'Create Organization'}
          </button>
        </div>
      </div>
    </div>
  );
}