"use client";

import DashLayout from "@/components/dashboard/DashLayout";

export default function AdminDashLayout({ children }: { children: React.ReactNode }) {
    return <DashLayout role="admin">{children}</DashLayout>;
}
