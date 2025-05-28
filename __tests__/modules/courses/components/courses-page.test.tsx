import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { CoursesPage } from "@/modules/courses/components/courses-page"
import * as hooks from "@/modules/courses/hooks/use-course-filters"
import { courses } from "@/modules/courses/data/courses"

describe("CoursesPage", () => {
  beforeEach(() => {
    jest.spyOn(hooks, "useCourseFilters").mockReturnValue({
      searchQuery: "",
      setSearchQuery: jest.fn(),
      sortBy: "",
      setSortBy: jest.fn(),
      filteredCourses: courses,
    })
  })

  it("renders title and create button", () => {
    render(<CoursesPage />)
    expect(screen.getByText(/Mis Cursos/i)).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /Crear curso/i })
    ).toBeInTheDocument()
  })

  it("toggles view modes", () => {
    render(<CoursesPage />)
    const gridButton = screen.getByRole("button", {
      name: /Vista de cuadrícula/i,
    })
    const tableButton = screen.getByRole("button", { name: /Vista de tabla/i })
    fireEvent.click(tableButton)
    expect(tableButton).toHaveClass("bg-blue-600")
    fireEvent.click(gridButton)
    expect(gridButton).toHaveClass("bg-blue-600")
  })
})
