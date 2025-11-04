export interface Course {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  benefits: string[];
  syllabus: string;
  duration: string;
  cost: number;
  outcomes: string[];
  certificate: string;
  educator: string;
  enrolledStudentIds: string[];
  enrolledCount: number;
  startDateTime: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CoursesResponse {
  courses: Course[];
}
