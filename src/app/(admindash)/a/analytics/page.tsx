import Header from '@/app/(admindash)/a/analytics/components/Header';
import StatsCards from '@/app/(admindash)/a/analytics/components/StatsCards';
import UserGrowthChart from '@/app/(admindash)/a/analytics/components/UserGrowthChart';
import RevenueChart from '@/app/(admindash)/a/analytics/components/RevenueChart';
import StudentDistributionChart from '@/app/(admindash)/a/analytics/components/StudentDistributionChart';
import RevenueBreakdownChart from '@/app/(admindash)/a/analytics/components/RevenueBreakdownChart';
import AssignmentPerformanceChart from '@/app/(admindash)/a/analytics/components/AssignmentPerformanceChart';
import EducatorsContent from '@/app/(admindash)/a/analytics/components/EducatorsContent';
import FeatureUsageChart from '@/app/(admindash)/a/analytics/components/FeatureUsageChart';
import SectionLabel from '@/app/(admindash)/a/analytics/components/SectionLabel';

export default function AnalyticsPage() {
  return (
    <div className="overflow-x-hidden w-full flex flex-col gap-6">

        {/* Header */}
        <Header />

        {/* Stats Cards */}
        <StatsCards />

        {/* Growth & Revenue Section */}
        <SectionLabel title="Growth & Revenue" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          <UserGrowthChart />
          <RevenueChart />
        </div>

        {/* Student Distribution + Revenue Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
          <div className="col-span-1">
            <StudentDistributionChart />
          </div>
          <div className="col-span-1 lg:col-span-2">
            <RevenueBreakdownChart />
          </div>
        </div>

        {/* Learning Outcomes Section */}
        <SectionLabel title="Learning Outcomes" />
        <div className="w-full">
          <AssignmentPerformanceChart />
        </div>

        {/* Educators & Content Section */}
        <SectionLabel title="Educators & Content" />
        <div className="w-full">
          <EducatorsContent />
        </div>

        {/* Platform Insights Section */}
        <SectionLabel title="Platform Insights" />
        <div className="w-full">
          <FeatureUsageChart />
        </div>
    </div>
  );
}