import React from "react"
import { render, screen } from "@testing-library/react"
import { DetailsTab } from "@/modules/courses/components/course-edit/tabs/details-tab"

describe("DetailsTab", () => {
  it("renders default title and description inputs", () => {
    render(<DetailsTab />)
    expect(screen.getByText(/Detalles del curso/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Título del curso/i)).toHaveValue(
      "Desarrollo Web Completo"
    )
    // Verificar fragmento de la descripción por defecto
    const descField = screen.getByLabelText(/Descripción/i) as HTMLTextAreaElement
    expect(descField.value).toMatch(/desarrollo web desde cero/i)
  })
})
