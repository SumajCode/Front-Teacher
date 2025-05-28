import React from "react"
import { render, screen } from "@testing-library/react"
import { CourseEditPage } from "@/modules/courses/components/course-edit/course-edit-page"
import * as useModules from "@/modules/courses/hooks/use-course-modules"
import * as useStudents from "@/modules/courses/hooks/use-students"
import * as useGrades from "@/modules/courses/hooks/use-student-grades"
// Note: courses import removed because CourseEditPage handles non-existent IDs gracefully

describe("CourseEditPage", () => {
  beforeEach(() => {
    jest.spyOn(useModules, "useCourseModules").mockReturnValue({
      modules: [],
      setModules: jest.fn(),
      handleAddResource: jest.fn(),
      handleDeleteResource: jest.fn(),
    })
    jest.spyOn(useStudents, "useStudents").mockReturnValue({ students: [] })
    jest
      .spyOn(useGrades, "useStudentGrades")
      .mockReturnValue({ studentGrades: [] })
  })

  it("renders loading state when no course found", () => {
    // Render page with invalid courseId (not present in data)
    render(<CourseEditPage params={{ courseId: "invalid" }} />)
    expect(screen.getByText(/Cargando curso.../i)).toBeInTheDocument()
  })
})
