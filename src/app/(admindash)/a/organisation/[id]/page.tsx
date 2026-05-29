'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Edit2, Pause, MoreHorizontal } from 'lucide-react';
import { AdminAPI } from '@/lib/api';
import OverviewTab from './components/OverviewTab';
import StudentsTab from './components/StudentsTab';
import PermissionsTab from './components/PermissionsTab';
import SessionsTab from './components/SessionsTab';
import ProgressTab from './components/ProgressTab';
import BillingTab from './components/BillingTab';

export default function OrganizationProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [organizationId, setOrganizationId] = useState('');
  const [organization, setOrganization] = useState<any>(null);
  const [sessionsList, setSessionsList] = useState<any[]>([]);
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [invoicesList, setInvoicesList] = useState<any[]>([]);

  useEffect(() => {
    const loadOrganization = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        setOrganizationId(resolvedParams.id);
        const response = await AdminAPI.getOrganization(resolvedParams.id);
        const org = response?.data?.organization || response?.organization || response?.data || response;
        const allData = response?.data || response;
        setOrganization(org);
        setSessionsList(allData?.sessions || []);
        setStudentsList(allData?.students || []);
        setInvoicesList(allData?.invoices || []);
      } catch (error) {
        console.error('Failed to fetch organization:', error);
      }
    };

    loadOrganization();
  }, [params]);

  const status = String(organization?.status || 'active').toLowerCase();
  const displayStatus = status === 'suspended' ? 'Suspended' : status === 'inactive' ? 'Inactive' : 'Active';

  const handleSuspend = async () => {
    if (!organizationId) return;

    try {
      await AdminAPI.updateOrganization(organizationId, { status: 'suspended' });
      setOrganization((current: any) => ({ ...(current || {}), status: 'suspended' }));
    } catch (error) {
      console.error('Failed to suspend organization:', error);
    }
  };

  return (
    <div className="md:p-8 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link href="/a/organisation" className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            </Link>
            <h1 className="text-2xl font-medium text-[#021165] sm:text-3xl md:text-4xl">{organization?.name || organization?.organizationName || 'Organization'}</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#10B981]">
              {displayStatus}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 ml-9">
            <span>{organization?.type || organization?.organizationType || 'Institution'}</span>
            <span>•</span>
            <span>{organization?.studentCount || 0} students</span>
            <span>•</span>
            <span>{organizationId}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Edit2 className="w-4 h-4" />
            Edit Organisation
          </button>
          <button onClick={handleSuspend} className="flex items-center gap-2 px-4 py-2 border border-red-200 bg-red-50 rounded-lg text-sm font-semibold text-red-600 hover:bg-red-100 transition-colors shadow-sm">
            <Pause className="w-4 h-4" />
            Suspend
          </button>
          <button className="p-2 border border-gray-200 text-gray-500 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex w-full border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 min-w-max">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'students', label: 'Students', badge: String(organization?.studentCount || 0) },
            { id: 'permissions', label: 'Access & Permissions' },
            { id: 'sessions', label: 'Sessions', badge: String(organization?.sessionCount || 0) },
            { id: 'progress', label: 'Progress' },
            { id: 'billing', label: 'Billing' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                px-4 py-3 text-sm font-semibold transition-colors relative flex items-center gap-2
                ${activeTab === tab.id 
                  ? 'text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
                }
              `}
            >
              {tab.label}
              {tab.badge && (
                <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.id ? 'bg-gray-100 text-gray-800' : 'bg-gray-100 text-gray-500'}`}>
                  {tab.badge}
                </span>
              )}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full">
        {activeTab === 'overview' && <OverviewTab organization={organization} />}
        {activeTab === 'students' && <StudentsTab students={studentsList} />}
        {activeTab === 'permissions' && <PermissionsTab permissions={organization?.permissions} />}
        {activeTab === 'sessions' && <SessionsTab sessions={sessionsList} />}
        {activeTab === 'progress' && <ProgressTab students={studentsList} />}
        {activeTab === 'billing' && <BillingTab billingCycle={organization?.billingCycle} revenue={organization?.revenue} invoices={invoicesList} />}
      </div>
    </div>
  );
}
