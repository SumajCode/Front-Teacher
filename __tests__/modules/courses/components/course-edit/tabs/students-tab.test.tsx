import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { StudentsTab } from "@/modules/courses/components/course-edit/tabs/students-tab"
import type { Student } from "@/modules/courses/types"

describe("StudentsTab", () => {
  const mockStudents: Student[] = [
    {
      id: "s1",
      name: "Alice",
      email: "a@example.com",
      progress: 50,
      lastActive: "2025-05-26",
    },
  ]
  const onAddStudent = jest.fn()
  const onViewStudentDetails = jest.fn()

  beforeEach(() => jest.clearAllMocks())

  it("renders student table and calls onAddStudent", () => {
    render(
      <StudentsTab
        students={mockStudents}
        onAddStudent={onAddStudent}
        onViewStudentDetails={onViewStudentDetails}
      />
    )
    expect(screen.getByText(/Estudiantes del curso/i)).toBeInTheDocument()
    expect(screen.getByText(/Alice/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole("button", { name: /Añadir estudiante/i }))
    expect(onAddStudent).toHaveBeenCalled()
  })

  it("calls onViewStudentDetails when details button clicked", () => {
    render(
      <StudentsTab
        students={mockStudents}
        onAddStudent={onAddStudent}
        onViewStudentDetails={onViewStudentDetails}
      />
    )
    fireEvent.click(screen.getByRole("button", { name: /Ver detalles/i }))
    expect(onViewStudentDetails).toHaveBeenCalledWith(mockStudents[0])
  })
})
