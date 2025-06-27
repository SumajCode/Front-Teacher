import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { AddModuleDialog } from "@/modules/courses/components/course-edit/dialogs/add-module-dialog"

describe("AddModuleDialog", () => {
  it("renders dialog and handles actions", () => {
    const onOpenChange = jest.fn()
    render(<AddModuleDialog open={true} onOpenChange={onOpenChange} />)
    expect(screen.getByText(/Añadir nuevo módulo/i)).toBeInTheDocument()
    const cancelBtn = screen.getByRole("button", { name: /Cancelar/i })
    const addBtn = screen.getByRole("button", { name: /Añadir módulo/i })
    expect(addBtn).toBeDisabled()
    fireEvent.change(
      screen.getByPlaceholderText(/Ej: Introducción a HTML y CSS/i),
      { target: { value: "Modulo 1" } }
    )
    expect(addBtn).not.toBeDisabled()
    fireEvent.click(cancelBtn)
    expect(onOpenChange).toHaveBeenCalledWith(false)
    fireEvent.click(addBtn)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
