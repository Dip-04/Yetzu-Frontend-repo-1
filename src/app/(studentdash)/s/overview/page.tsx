"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Search, MoreHorizontal, CheckCircle, AlertCircle } from "lucide-react";
import useSession from "@/hooks/useSession";
import { useGetStudentOverview } from "@/lib/queries/dashboard/useDashboard";
import { Webinar, Assignment, SubmittedAssignment } from "@/lib/queries/dashboard/types";
import { useGetStudentAssignments } from "@/lib/queries/assignments/useAssignments";

export default function StudentDashboardPage() {
    const { user } = useSession();
    const { data: overviewData, isLoading } = useGetStudentOverview();
    const { data: assignmentsData, isLoading: assignmentsLoading } = useGetStudentAssignments();
    console.log(assignmentsData);
    const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");
    const [searchTerm, setSearchTerm] = useState("");

    // Fallback/Demo Data if API returns nothing (for UI development)
    const demoWebinars: Webinar[] = [
        {
            id: "1",
            title: "Title of webinar",
            educatorName: "Educator name",
            description: "Loren Ipsum meta description is display here Loren Ipsum ...",
            scheduledDate: "2025-11-23",
            time: "12:30 PM IST",
            thumbnail: "/images/Hero Section.png" // using existing asset as placeholder
        },
        {
            id: "2",
            title: "Title of webinar",
            educatorName: "Educator name",
            description: "Loren Ipsum meta description is display here Loren Ipsum ...",
            scheduledDate: "2025-11-23",
            time: "12:30 PM IST",
            thumbnail: "/images/Hero Section.png"
        },
        {
            id: "3",
            title: "Title of webinar",
            educatorName: "Educator name",
            description: "Loren Ipsum meta description is display here Loren Ipsum ...",
            scheduledDate: "2025-11-23",
            time: "12:30 PM IST",
            thumbnail: "/images/Hero Section.png"
        },
        {
            id: "4",
            title: "Title of webinar",
            educatorName: "Educator name",
            description: "Loren Ipsum meta description is display here Loren Ipsum ...",
            scheduledDate: "2025-11-23",
            time: "12:30 PM IST",
            thumbnail: "/images/Hero Section.png"
        }
    ];

    const demoAssignments: Assignment[] = [
        {
            id: "1",
            title: "Loren Ipsum",
            description: "Loren Ipsum meta description is display here Loren Ipsum meta...",
            dueDate: "12/12/2025",
            daysLeft: 2,
            thumbnail: "/images/Hero Section.png"
        },
        {
            id: "2",
            title: "Loren Ipsum",
            description: "Loren Ipsum meta description is display here Loren Ipsum meta...",
            dueDate: "12/12/2025",
            daysLeft: 2,
            thumbnail: "/images/Hero Section.png"
        },
        {
            id: "3",
            title: "Loren Ipsum",
            description: "Loren Ipsum meta description is display here Loren Ipsum meta...",
            dueDate: "12/12/2025",
            daysLeft: 2,
            thumbnail: "/images/Hero Section.png"
        }
    ];

    const demoSubmitted: SubmittedAssignment[] = Array(7).fill({
        id: "1",
        title: "Assignment",
        uploadDate: "12/12/2025",
        status: "In-Review",
        remarks: "Remarks"
    }).map((item, i) => ({ ...item, id: i.toString(), status: i > 2 ? "Completed" : "In-Review" }));

    const webinars = overviewData?.webinars || demoWebinars;
    const assignments = overviewData?.assignments || demoAssignments;
    const submittedAssignments = overviewData?.submittedAssignments || demoSubmitted;

    return (
        <div className="p-1 bg-[#F9FAFB] min-h-screen font-['Inter']">
            {/* Header */}
            <h1 className="text-4xl font-medium text-[#021165] mb-8">
                Welcome Back, {user?.name || "Joy"}!
            </h1>

            {/* Webinars Section */}
            <div className="mb-10">
                <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg w-fit">
                    <button
                        onClick={() => setActiveTab("Upcoming")}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "Upcoming"
                            ? "bg-white text-[#021165] shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Upcoming Webinars
                    </button>
                    <button
                        onClick={() => setActiveTab("Past")}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === "Past"
                            ? "bg-white text-[#021165] shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Past Webinars
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {webinars.map((webinar) => (
                        <div key={webinar.id} className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 flex flex-col gap-8">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-200">
                                    <Image
                                        src={webinar.thumbnail || "/images/placeholder.png"}
                                        alt={webinar.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">{webinar.title}</h3>
                                    <p className="text-gray-500 text-xs">{webinar.educatorName}</p>
                                </div>
                            </div>

                            <p className="text-gray-500 text-sm line-clamp-2">
                                {webinar.description}
                            </p>

                            <div className="mt-auto space-y-2">
                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                    <Calendar size={14} />
                                    <span>Scheduled : {webinar.scheduledDate}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-xs">
                                    <Clock size={14} />
                                    <span>Time: {webinar.time}</span>
                                </div>
                                <button className="w-full bg-[#042BFD] hover:bg-[#0325D7] text-white font-medium py-2.5 rounded-lg text-sm transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-5 rounded-[20px] shadow-sm border border-gray-100">
                {/* Assignments Section */}
                <div className="mb-10 ">
                    <h2 className="text-3xl font-bold text-[#021165] mb-6">Assignments</h2>

                    <p className="text-gray-500 mb-4">Due Assignments</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {assignments.map((assignment) => (
                            <div key={assignment.id} className="bg-white p-5 rounded-[20px] shadow-sm border border-gray-100 flex flex-col gap-6">
                                <div className="flex gap-4">
                                    <div className="w-[100px] h-[80px] rounded-lg overflow-hidden relative bg-gray-200 flex-shrink-0">
                                        <Image
                                            src={assignment.thumbnail || "/images/placeholder.png"}
                                            alt={assignment.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                        <h3 className="font-semibold text-gray-900 text-lg">{assignment.title}</h3>
                                        <p className="text-gray-500 text-xs mb-3 line-clamp-2">{assignment.description}</p>

                                    </div>
                                </div>
                                <div className="mt-auto flex justify-between items-center text-xs">
                                    <div className="flex items-center gap-1.5 text-gray-500">
                                        <Calendar size={14} />
                                        <span>Due date: {assignment.dueDate}</span>
                                    </div>
                                    <span className="text-red-500 font-medium">{assignment.daysLeft} days left</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submitted Assignments Section */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-gray-500">Submitted Assignments</p>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[240px]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-[#EBF0FF] text-left">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-semibold text-[#2F327D]">Assignment Title</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-[#2F327D]">Upload Date</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-[#2F327D]">Status</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-[#2F327D]">Remarks</th>
                                    <th className="px-6 py-4 text-sm font-semibold text-[#2F327D] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {submittedAssignments.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-3">
                                            <div className="w-4 h-4 border border-gray-300 rounded sm:mr-2"></div>
                                            {submission.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{submission.uploadDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${submission.status === "Completed"
                                                ? "bg-green-50 text-green-700 border-green-200"
                                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                                                }`}>
                                                {submission.status === "Completed" && <CheckCircle size={12} />}
                                                {submission.status === "In-Review" && <AlertCircle size={12} />}
                                                {submission.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{submission.remarks}</td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-gray-400 hover:text-gray-600">
                                                <MoreHorizontal size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
