import { authApi } from "@/lib/axios";
import { StudentOverviewResponse } from "./types";

export const dashboardService = {
    getStudentOverview: async () => {
        const res = await authApi.get("/dashboard/studentOverview");
        return res.data;
    },
};
