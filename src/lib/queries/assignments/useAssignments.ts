import { useQuery } from "@tanstack/react-query";
import { assignmentService } from "./assignmentService";
import { StudentAssignmentListResponse } from "./types";
import useSession from "@/hooks/useSession";

export const useGetStudentAssignments = () => {
    const { user } = useSession();
    const userId = user?.id || "";

    return useQuery<StudentAssignmentListResponse>({
        queryKey: ["studentAssignments", userId],
        queryFn: () => assignmentService.getStudentAssignments(userId),
        enabled: !!userId

    });
};
