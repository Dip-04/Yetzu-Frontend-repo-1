"use client";

import useSession from "@/hooks/useSession";
import { User, Bell, Menu, Search, LogOut, Settings, LayoutDashboard, BookOpen, Users, HelpCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

interface DashNavbarProps {
    role: string | null;
    onMenuClick: () => void;
}

export default function DashNavbar({ role, onMenuClick }: DashNavbarProps) {
    const { user } = useSession();
    const pathname = usePathname();

    const getPageTitle = (path: string) => {
        if (path.includes("/overview")) return "Overview";
        if (path.includes("/webinars")) return "Webinar & Cohorts";
        if (path.includes("/settings")) return "Settings";
        if (path.includes("/courses")) return "My Courses";
        if (path.includes("/assignments")) return "Assignments";
        if (path.includes("/schedule")) return "Schedule";
        if (path.includes("/classes")) return "My Classes";
        if (path.includes("/students")) return "Students";
        return "Overview";
    };

    const title = getPageTitle(pathname || "");

    return (
        <nav className="bg-white border-b border-gray-200 h-20 fixed w-full top-0 z-40 lg:pl-64 transition-all duration-300">
            <div className="h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md"
                    >
                        <Menu className="h-6 w-6" />
                    </button>

                    {/* Page Title */}
                    <h1 className="text-3xl font-medium text-gray-800">{title}</h1>
                </div>

                <div className="flex items-center gap-6">
                    {/* Search */}
                    <div className="hidden md:block relative w-[400px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-12 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Help Button */}
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200">
                        <HelpCircle className="h-6 w-6" />
                    </button>

                    {/* Profile */}
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-right">
                            <p className="text-sm font-bold text-gray-900 leading-none">{user?.name || "User"}</p>
                            <p className="text-xs text-gray-500 mt-1">{user?.email || role || "user@example.com"}</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-cover bg-center border border-gray-200"
                            style={{ backgroundImage: `url(${`https://ui-avatars.com/api/?name=${user.name}`})` }}>
                            {/* Fallback if image fails or just use div bg */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
