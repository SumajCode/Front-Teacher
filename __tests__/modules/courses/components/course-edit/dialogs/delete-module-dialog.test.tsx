import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { DeleteModuleDialog } from "@/modules/courses/components/course-edit/dialogs/delete-module-dialog"

describe("DeleteModuleDialog", () => {
  const onOpenChange = jest.fn()
  const onConfirm = jest.fn()

  beforeEach(() => {
    onOpenChange.mockClear()
    onConfirm.mockClear()
  })

  it("does not render when moduleId is null", () => {
    const { container } = render(
      <DeleteModuleDialog
        open={true}
        onOpenChange={onOpenChange}
        moduleId={null}
        onConfirm={onConfirm}
      />
    )
    expect(container.firstChild).toBeNull()
  })

  it("renders and handles cancel and confirm actions", () => {
    render(
      <DeleteModuleDialog
        open={true}
        onOpenChange={onOpenChange}
        moduleId="mod1"
        onConfirm={onConfirm}
      />
    )
    // Verify dialog title
    expect(screen.getByRole("heading", { name: /Eliminar módulo/i })).toBeInTheDocument()
    const cancelBtn = screen.getByRole("button", { name: /Cancelar/i })
    const deleteBtn = screen.getByRole("button", { name: /Eliminar módulo/i })
    fireEvent.click(cancelBtn)
    expect(onOpenChange).toHaveBeenCalledWith(false)
    fireEvent.click(deleteBtn)
    expect(onConfirm).toHaveBeenCalledWith("mod1")
  })
})
