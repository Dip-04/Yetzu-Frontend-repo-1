export interface Webinar {
    id: string; // or _id
    title: string;
    educatorName: string;
    description: string;
    scheduledDate: string; // ISO string?
    time: string;
    thumbnail?: string;
}

export interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    daysLeft: number;
    thumbnail?: string;
}

export interface SubmittedAssignment {
    id: string;
    title: string;
    uploadDate: string;
    status: "In-Review" | "Completed";
    remarks: string;
}

export interface StudentOverviewResponse {
    webinars: Webinar[];
    assignments: Assignment[];
    submittedAssignments: SubmittedAssignment[];
}
