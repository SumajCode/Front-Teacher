import React from "react"
import { render, screen } from "@testing-library/react"
import { CourseGrid } from "@/modules/courses/components/course-grid"
import { Course } from "@/modules/courses/types"

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Test Course",
    description: "Test Description",
    image: "",
    status: "published",
    students: 10,
    modules: 5,
  },
]

describe("CourseGrid", () => {
  it("renders a list of courses", () => {
    render(<CourseGrid courses={mockCourses} />)
    expect(screen.getByText(/Test Course/)).toBeInTheDocument()
    expect(screen.getByText(/Test Description/)).toBeInTheDocument()
  })
})
