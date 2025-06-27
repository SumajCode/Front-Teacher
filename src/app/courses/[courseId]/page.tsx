import { CourseEditPage } from "@/modules/courses/components/course-edit/course-edit-page"


export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>
}) {
  const resolvedParams = await params
  return (
    <>
      
      <CourseEditPage courseId={resolvedParams.courseId} />
    </>
  )
}
