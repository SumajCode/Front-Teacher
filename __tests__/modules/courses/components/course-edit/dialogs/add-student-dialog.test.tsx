import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { AddStudentDialog } from "@/modules/courses/components/course-edit/dialogs/add-student-dialog"

describe("AddStudentDialog", () => {
  it("renders and calls onOpenChange on cancel and add", () => {
    const onOpenChange = jest.fn()
    render(<AddStudentDialog open={true} onOpenChange={onOpenChange} />)
    // Verify dialog title
    expect(screen.getByRole("heading", { name: /Añadir estudiante/i })).toBeInTheDocument()
    const cancelButton = screen.getByRole("button", { name: /Cancelar/i })
    const addButton = screen.getByRole("button", { name: /Añadir estudiante/i })
    fireEvent.click(cancelButton)
    expect(onOpenChange).toHaveBeenCalledWith(false)
    fireEvent.click(addButton)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
