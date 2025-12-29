export interface Assignment {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    status: string;
    // Add other fields as per the response
}

export type StudentAssignmentListResponse = Assignment[];
