"use client"
import { CourseEditPage } from "@/modules/courses/components/course-edit/course-edit-page"

export default function Page({ params }: { params: { courseId: string } }) {
  return <CourseEditPage params={params} />
}
