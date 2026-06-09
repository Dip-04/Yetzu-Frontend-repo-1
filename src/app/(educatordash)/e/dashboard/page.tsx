import React from 'react';
import StatCards from './components/StatCards';
import FocusWeekly from './components/FocusWeekly';
import AssignmentsTable from './components/AssignmentsTable';

export default function EducatorDashboardPage() {
  return (
    <div className="pb-8">
      <div className="space-y-8">
        <StatCards />
        <FocusWeekly />
        <AssignmentsTable />
      </div>
    </div>
  );
}
