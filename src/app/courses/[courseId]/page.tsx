import { CourseEditPage } from "@/modules/courses/components/course-edit/course-edit-page"

export default function CoursePage({
  params,
}: {
  params: { courseId: string }
}) {
  // console.log({ params: params.courseId })
  return <CourseEditPage courseId={params.courseId} />
}
