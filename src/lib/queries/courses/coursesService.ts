import { api, authApi } from "@/lib/axios";

export const coursesService = {
  getCourses: async () => {
    const res = await api.get("course/v1/courselist");
    return res?.data?.courses;
  },
};
