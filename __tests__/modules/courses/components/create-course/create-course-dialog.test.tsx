import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { CreateCourseDialog } from "@/modules/courses/components/create-course/create-course-dialog"

describe("CreateCourseDialog", () => {
  it("navigates through steps and submits form", async () => {
    const onOpenChange = jest.fn()
    render(<CreateCourseDialog open={true} onOpenChange={onOpenChange} />)

    // Step 1
    // Verify heading for basic information step
    expect(screen.getByRole("heading", { name: /Información básica/i })).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(/Título del curso/i), {
      target: { value: "Test" },
    })
    fireEvent.change(screen.getByLabelText(/Descripción/i), {
      target: { value: "Desc" },
    })
    fireEvent.click(screen.getByRole("button", { name: /Siguiente/i }))

    // Step 2
    await screen.findByText(/Imagen del curso/i)
    const file = new File(["dummy"], "test.png", { type: "image/png" })
    fireEvent.change(screen.getByLabelText(/Imagen de portada/i), {
      target: { files: [file] },
    })
    fireEvent.click(screen.getByRole("button", { name: /Crear curso/i }))

    // Submit
    await waitFor(() => {
      expect(onOpenChange).toHaveBeenCalledWith(false)
    })
  })
})
