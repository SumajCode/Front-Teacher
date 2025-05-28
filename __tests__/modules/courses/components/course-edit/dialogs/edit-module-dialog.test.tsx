import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { EditModuleDialog } from "@/modules/courses/components/course-edit/dialogs/edit-module-dialog"

const mockModule = { id: "mod1", title: "Module 1" /* other fields */ } as any

describe("EditModuleDialog", () => {
  it("does not render when module is null", () => {
    const { container } = render(
      <EditModuleDialog open={true} onOpenChange={() => {}} module={null} />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders and handles save and cancel", () => {
    const onOpenChange = jest.fn()
    render(
      <EditModuleDialog
        open={true}
        onOpenChange={onOpenChange}
        module={mockModule}
      />
    )
    expect(screen.getByText(/Editar módulo/i)).toBeInTheDocument()
    fireEvent.change(screen.getByLabelText(/Título del módulo/i), {
      target: { value: "New Title" },
    })
    const cancelBtn = screen.getByRole("button", { name: /Cancelar/i })
    const saveBtn = screen.getByRole("button", { name: /Guardar cambios/i })
    fireEvent.click(cancelBtn)
    expect(onOpenChange).toHaveBeenCalledWith(false)
    fireEvent.click(saveBtn)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
