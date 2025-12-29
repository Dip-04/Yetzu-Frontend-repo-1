"use client";

import DashLayout from "@/components/dashboard/DashLayout";

export default function EducatorDashLayout({ children }: { children: React.ReactNode }) {
    return <DashLayout role="educator">{children}</DashLayout>;
}
