"use client";

import React, { useEffect, useState } from 'react';
import { Building2, CheckCircle, Users, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';
import dynamic from "next/dynamic";
import { AdminAPI, asArray } from '@/lib/api';

const AreaChart = dynamic(
  () => import("recharts").then((mod) => mod.AreaChart),
  { ssr: false }
);
const Area = dynamic(
  () => import("recharts").then((mod) => mod.Area),
  { ssr: false }
);
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

const statsData = [
  {
    title: 'Total Organisations',
    value: '47',
    change: '+8.2%',
    icon: Building2,
    color: '#6366F1',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    data: [
      { value: 20 }, { value: 25 }, { value: 30 }, { value: 28 },
      { value: 35 }, { value: 40 }, { value: 38 }, { value: 47 },
    ],
  },
  {
    title: 'Active Organisations',
    value: '42',
    change: '+4.1%',
    icon: CheckCircle,
    color: '#10B981',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    data: [
      { value: 30 }, { value: 32 }, { value: 35 }, { value: 33 },
      { value: 38 }, { value: 40 }, { value: 41 }, { value: 42 },
    ],
  },
  {
    title: 'Total Students (B2B)',
    value: '3,847',
    change: '+12.5%',
    icon: Users,
    color: '#0EA5E9',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
    data: [
      { value: 1200 }, { value: 1500 }, { value: 1800 }, { value: 2200 },
      { value: 2800 }, { value: 3100 }, { value: 3500 }, { value: 3847 },
    ],
  },
  {
    title: 'B2B Revenue',
    value: '$127,400',
    change: '+22.1%',
    icon: DollarSign,
    color: '#F59E0B',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    data: [
      { value: 40000 }, { value: 60000 }, { value: 55000 }, { value: 80000 },
      { value: 95000 }, { value: 110000 }, { value: 115000 }, { value: 127400 },
    ],
  }
];

const numberOf = (value: any) => Number(String(value || 0).replace(/[^0-9.-]/g, '')) || 0;

export default function StatCards() {
  const [stats, setStats] = useState(statsData);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await AdminAPI.getOrganizations({ page: 1, limit: 100 });
        const organizations = asArray(response);
        const totalOrganizations = organizations.length;
        const activeOrganizations = organizations.filter((org: any) => String(org.status || 'active').toLowerCase() === 'active').length;
        const totalStudents = organizations.reduce((sum: number, org: any) => sum + numberOf(org.students || org.totalStudents || org.studentCount || org.studentsCount), 0);
        const totalRevenue = organizations.reduce((sum: number, org: any) => sum + numberOf(org.revenue || org.revenueGenerated), 0);

        setStats((current) => current.map((item) => {
          if (item.title === 'Total Organisations') return { ...item, value: totalOrganizations.toLocaleString() };
          if (item.title === 'Active Organisations') return { ...item, value: activeOrganizations.toLocaleString() };
          if (item.title === 'Total Students (B2B)') return { ...item, value: totalStudents.toLocaleString() };
          if (item.title === 'B2B Revenue') return { ...item, value: `$${totalRevenue.toLocaleString()}` };
          return item;
        }));
      } catch (error) {
        console.error('Failed to fetch organization stats:', error);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {stats.map((item, i) => {
        const isPositive = item.change.startsWith("+");
        const Icon = item.icon;

        return (
          <div key={i} className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-500">
            <div className="p-6 pb-2">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${item.iconBg} ${item.iconColor} transition-transform group-hover:scale-110 duration-500`}>
                  <Icon size={24} />
                </div>
                <div
                  className={`flex items-center gap-1 text-[11px] font-bold rounded-full px-2.5 py-1 ${
                    isPositive
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  <span>{item.change}</span>
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {item.title}
                </span>
                <h2 className="font-bold text-3xl text-gray-900 tracking-tight">
                  {item.value}
                </h2>
              </div>
            </div>

            <div className="h-16 mt-auto overflow-hidden">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={item.data}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`grad-org-${i}`}
                      x1="0" y1="0"
                      x2="0" y2="1"
                    >
                      <stop offset="0%" stopColor={item.color} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={item.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="natural"
                    dataKey="value"
                    stroke={item.color}
                    strokeWidth={3}
                    fill={`url(#grad-org-${i})`}
                    dot={false}
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      })}
    </div>
  );
}
