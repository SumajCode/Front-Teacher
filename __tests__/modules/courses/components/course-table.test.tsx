import React from "react"
import { render, screen } from "@testing-library/react"
import { CourseTable } from "@/modules/courses/components/course-table"
import { Course } from "@/modules/courses/types"

describe("CourseTable", () => {
  const mockCourses: Course[] = [
    {
      id: "1",
      title: "Test Course",
      description: "Desc",
      image: "",
      status: "draft",
      students: 3,
      modules: 2,
      lastUpdated: new Date().toISOString(),
      color: "blue",
    },
  ]

  it("renders table headers and course data", () => {
    render(<CourseTable courses={mockCourses} />)
    expect(screen.getByText(/Título/i)).toBeInTheDocument()
    expect(screen.getByText(/Test Course/)).toBeInTheDocument()
    expect(screen.getByText(/Desc/)).toBeInTheDocument()
  })
})
