"use client"
import React, { useState } from 'react';
import OrganizationHeader from './components/OrganizationHeader';
import StatCards from './components/StatCards';
import OrganizationGrowthChart from './components/OrganizationGrowthChart';
import AlertsAndIssues from './components/AlertsAndIssues';
import TopOrganizationsTable from './components/TopOrganizationsTable';

export type TimeRange = '1M' | '3M' | '6M' | '1Y' | 'All';

export default function OrganizationPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');

  return (
    <div className="flex flex-col gap-6">
      <OrganizationHeader />
      
      <StatCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <OrganizationGrowthChart timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        </div>
        <AlertsAndIssues />
      </div>
      
      <TopOrganizationsTable timeRange={timeRange} />
      
      <div className="pb-10" />
    </div>
  );
}
