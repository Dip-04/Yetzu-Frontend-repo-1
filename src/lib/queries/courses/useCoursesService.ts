import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { coursesService } from "./coursesService";
import { Course, CoursesResponse } from "./types";

const { getCourses } = coursesService;

const useGetCourses = (): UseQueryResult<Course[], unknown> => {
  return useQuery<Course[]>({
    queryKey: ["getCourses"],
    queryFn: getCourses,
    refetchInterval: false,
  });
};

export { useGetCourses };
