import { PublicSessionsAPI, asArray } from "@/lib/api";

const mapSessionToCourse = (item: any): any => {
  // If item contains a nested session object, merge it or use it as the base
  const session = item?.session ? item.session : item;
  const educator = item?.educator ? item.educator : session?.educator;

  const rawDate = session.date || session.scheduledDate || session.startDateTime || session.createdAt;
  return {
    _id: session.id || session._id || session.sessionId,
    title: session.title || session.name || session.sessionTitle || "Session",
    subtitle: session.subtitle || session.shortDescription || "",
    description: session.description || session.longDescription || "",
    thumbnail: session.thumbnail || session.image || session.banner || "",
    benefits: session.benefits || [],
    syllabus: session.syllabus || [],
    duration: session.duration || session.durationInHours || "",
    cost: typeof session.finalPrice === "number" ? session.finalPrice : (session.price || session.cost || 0),
    pricingType: session.pricingType || "free",
    finalPrice: typeof session.finalPrice === "number" ? session.finalPrice : (session.price || session.cost || 0),
    outcomes: session.outcomes || session.learningOutcomes || [],
    certificate: session.certificate || "",
    educator: typeof educator === "string" ? educator : (educator?.name || session.educatorName || session.mentorName || "Educator"),
    educatorId: session.educatorId || educator?.id || "",
    educatorRating: educator?.rating || 4.8,
    educatorQualification: educator?.qualification || "",
    enrolledStudentIds: session.students || session.enrolledStudentIds || [],
    enrolledCount: typeof session.studentsCount === "number" ? session.studentsCount : (typeof session.students === "number" ? session.students : (Array.isArray(session.students) ? session.students.length : 0)),
    startDateTime: rawDate || session.startDateTime || "",
    sessionType: session.sessionType || session.type || "",
    category: session.category || "",
    mode: session.mode || "",
    scheduleDate: session.scheduleDate || "",
    startTime: session.startTime || "",
    endTime: session.endTime || "",
    capacity: session.capacity || 0,
    sessionLink: session.sessionLink || "",
    status: session.status || "",
    isActive: session.isActive != null ? session.isActive : true,
    createdAt: session.createdAt || rawDate || "",
    updatedAt: session.updatedAt || "",
    __v: session.__v || 0,
  };
};

export const coursesService = {
  getCourses: async (_params?: { search?: string; minCost?: number; maxCost?: number }) => {
    try {
      const res = await PublicSessionsAPI.getAll();
      const list = asArray(res?.sessions || res?.data || res);
      return list.map(mapSessionToCourse);
    } catch {
      return [];
    }
  },
  getCourseById: async (id: string) => {
    try {
      const res = await PublicSessionsAPI.getById(id);
      const item = res?.session || res?.data || res;
      return item ? mapSessionToCourse(item) : null;
    } catch {
      return null;
    }
  },
};
