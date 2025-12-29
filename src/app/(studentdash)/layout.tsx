"use client";

import DashLayout from "@/components/dashboard/DashLayout";

export default function StudentDashLayout({ children }: { children: React.ReactNode }) {
    return <DashLayout role="student">{children}</DashLayout>;
}
