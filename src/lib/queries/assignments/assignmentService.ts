import { authApi } from "@/lib/axios";
import { StudentAssignmentListResponse } from "./types";

export const assignmentService = {
    getStudentAssignments: async (userId: string) => {
        const res = await authApi.get("/assignment/studentList", {
            headers: {
                userid: userId,
            },
        });
        return res.data;
    },
};
