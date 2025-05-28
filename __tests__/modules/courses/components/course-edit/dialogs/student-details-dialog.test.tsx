import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { StudentDetailsDialog } from "@/modules/courses/components/course-edit/dialogs/student-details-dialog"
import type { Student, Module } from "@/modules/courses/types"

describe("StudentDetailsDialog", () => {
  const mockStudent: Student = {
    id: "s1",
    name: "Alice",
    email: "a@e.com",
    progress: 75,
    lastActive: "2025-05-26",
  }
  const mockModules: Module[] = [{ id: "m1", title: "Mod1", lessons: [] }]
  const onOpenChange = jest.fn()

  it("does not render when student is null", () => {
    const { container } = render(
      <StudentDetailsDialog
        open={true}
        onOpenChange={onOpenChange}
        student={null}
        modules={mockModules}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders student details and closes on button click", () => {
    render(
      <StudentDetailsDialog
        open={true}
        onOpenChange={onOpenChange}
        student={mockStudent}
        modules={mockModules}
      />
    )
    expect(screen.getByText(/Detalles del estudiante/i)).toBeInTheDocument()
    expect(screen.getByText(/Alice/i)).toBeInTheDocument()
    const closeBtn = screen.getByRole("button", { name: /Cerrar/i })
    fireEvent.click(closeBtn)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
